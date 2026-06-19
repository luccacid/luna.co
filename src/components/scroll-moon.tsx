"use client";

/**
 * <ScrollMoon> — indicador de progresso de leitura no formato da marca.
 *
 * Uma lua fixa no canto inferior direito ganha luz por OPACIDADE conforme a
 * página é rolada (lua nova no topo → lua cheia no fim), e um anel desenha o
 * progresso. Também serve de atalho "voltar ao topo". É puro jogo de opacidade,
 * fiel à identidade do eclipse. Renderizado em papel + mix-blend-difference
 * para permanecer legível sobre as seções claras E escuras.
 */
import { useEffect, useRef } from "react";

export function ScrollMoon() {
  const litRef = useRef<SVGCircleElement>(null); // disco que acende
  const ringRef = useRef<SVGCircleElement>(null); // anel de progresso
  const labelRef = useRef<HTMLSpanElement>(null); // porcentagem

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      // Progresso 0–1 (protegido contra divisão por zero em páginas curtas).
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

      // Opacidade do disco: 0.12 (lua nova) → 1 (lua cheia).
      if (litRef.current) litRef.current.style.opacity = `${0.12 + p * 0.88}`;
      // Anel: 132 = comprimento do traço (2πr ≈ 2·π·21). Esvazia conforme avança.
      if (ringRef.current) ringRef.current.style.strokeDashoffset = `${(1 - p) * 132}`;
      if (labelRef.current) labelRef.current.textContent = `${Math.round(p * 100)}`;

      raf = 0;
    };

    // Atualiza no máximo uma vez por frame (throttle via rAF).
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update(); // estado inicial
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    // mix-blend-difference + traço papel: o indicador se adapta a qualquer
    // fundo (era invisível sobre as seções escuras com traço tinta).
    <a
      href="#top"
      aria-label="Voltar ao topo"
      className="fixed bottom-6 right-6 z-50 hidden h-12 w-12 items-center justify-center mix-blend-difference md:flex"
    >
      {/* Trilho + anel de progresso (girado -90° para começar no topo) */}
      <svg viewBox="0 0 48 48" className="h-12 w-12 -rotate-90">
        <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeOpacity="0.14" />
        <circle
          ref={ringRef}
          cx="24"
          cy="24"
          r="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="132"
          strokeDashoffset="132"
          className="text-paper transition-[stroke-dashoffset] duration-150"
        />
      </svg>

      {/* Disco da lua que clareia por opacidade */}
      <svg viewBox="0 0 48 48" className="absolute h-7 w-7">
        <circle ref={litRef} cx="24" cy="24" r="14" fill="#fafafa" style={{ opacity: 0.12 }} />
      </svg>

      {/* Porcentagem de leitura */}
      <span
        ref={labelRef}
        className="absolute -bottom-4 font-mono text-[9px] tracking-[0.15em] text-paper/80"
      >
        0
      </span>
    </a>
  );
}
