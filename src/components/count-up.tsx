"use client";

/**
 * <CountUp> — anima um número de 0 até `value` quando ele entra na viewport.
 * Usado nas estatísticas (ex.: 0 → 100%). Sob `prefers-reduced-motion`, mostra
 * o valor final direto, sem contagem.
 */
import { useEffect, useRef, useState } from "react";

export function CountUp({
  value,
  suffix = "",
  duration = 1200,
}: {
  /** Valor final da contagem. */
  value: number;
  /** Texto fixo após o número (ex.: "%", "/7"). */
  suffix?: string;
  /** Duração da animação em ms. */
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  // Garante que a contagem rode uma única vez (mesmo que reentre na tela).
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Permite re-animar quando `value`/`duration` mudam (deps do efeito).
    done.current = false;

    // Acessibilidade: sem movimento → vai direto ao valor final.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }

    // Guardamos o id do frame para cancelar no cleanup — sem isso o loop
    // sobrevive ao unmount e chama setState em componente desmontado.
    let rafId = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // easeOutExpo: rápido no início, desacelera no fim.
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setN(Math.round(eased * value));
          if (t < 1) rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
      },
      // Começa quando metade do elemento está visível.
      { threshold: 0.5 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [value, duration]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}
