"use client";

/**
 * <MoonCursor> — uma pequena lua que segue o ponteiro com inércia e "enche"
 * (escala) sobre elementos clicáveis. O cursor nativo permanece visível
 * (nunca `cursor: none`) — isto é ornamento, não substituição.
 *
 * `mix-blend-difference` faz o disco se adaptar a qualquer fundo. Desligado
 * em telas de toque e sob `prefers-reduced-motion`. O loop de rAF dorme
 * quando a posição converge e acorda no próximo pointermove.
 */
import { useEffect, useRef } from "react";

export function MoonCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let raf = 0;
    let tx = -100, ty = -100; // alvo (posição do ponteiro)
    let cx = -100, cy = -100; // posição atual (interpolada)
    let scale = 1, targetScale = 1;

    const tick = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      scale += (targetScale - scale) * 0.18;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${scale})`;
      // Convergiu? Dorme até o próximo movimento (economia de bateria).
      const settled =
        Math.abs(tx - cx) < 0.1 &&
        Math.abs(ty - cy) < 0.1 &&
        Math.abs(targetScale - scale) < 0.01;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = "1";
      // Lua cheia sobre interativos; lua pequena no resto.
      targetScale = (e.target as HTMLElement)?.closest?.("a, button") ? 2.6 : 1;
      wake();
    };

    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[110] h-3 w-3 rounded-full bg-paper opacity-0 mix-blend-difference transition-opacity duration-300"
    />
  );
}
