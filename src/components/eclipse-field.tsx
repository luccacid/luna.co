"use client";

/**
 * <EclipseField> — peça central do hero: três luas sobrepostas que fazem
 * parallax na direção do ponteiro (com amortecimento) enquanto um anel orbita
 * lentamente. A marca É o fundo do hero, não um logo solto numa caixa.
 *
 * Duas camadas de movimento:
 *   - parallax por ponteiro (JS, abaixo) — dorme quando converge e pausa
 *     quando o hero sai da viewport (zero rAF desperdiçado);
 *   - convergência por scroll (CSS scroll-driven, classes .eclipse-left/right
 *     no globals.css): as luas laterais deslizam rumo ao centro conforme a
 *     rolagem — o eclipse "acontece" sob o dedo do usuário.
 *
 * Renderizado só em telas md+ (escondido no mobile). Sob `prefers-reduced-motion`
 * ambos os movimentos são desativados.
 */
import { useEffect, useRef } from "react";

export function EclipseField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Acessibilidade: sem parallax quando o usuário pede menos movimento.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0; // alvo X (para onde queremos ir)
    let ty = 0; // alvo Y
    let cx = 0; // posição atual X (interpolada)
    let cy = 0; // posição atual Y
    let inView = true; // lido dentro de onMove para evitar trabalho fora da view

    // A cada frame, aproxima a posição atual do alvo (damping de 6%). Quando
    // converge (< 0.1px), o loop dorme até o próximo pointermove.
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      const settled = Math.abs(tx - cx) < 0.1 && Math.abs(ty - cy) < 0.1;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf && inView) raf = requestAnimationFrame(tick);
    };

    // Converte a posição do ponteiro em um deslocamento de no máx. ±20px.
    const onMove = (e: PointerEvent) => {
      // Hero fora da viewport → nada a fazer (sem cálculo nem rAF).
      if (!inView) return;
      const { innerWidth: w, innerHeight: h } = window;
      tx = (e.clientX / w - 0.5) * 40;
      ty = (e.clientY / h - 0.5) * 40;
      wake();
    };

    // Sem frames quando o hero está fora da viewport.
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (!inView && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else {
        wake();
      }
    });
    io.observe(el);

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-[-12%] top-1/2 z-0 hidden -translate-y-1/2 md:block"
    >
      {/* will-change só no nó que de fato recebe style.transform a cada frame */}
      <div ref={ref} className="will-change-transform">
        <svg viewBox="0 0 600 600" className="h-[120vh] max-h-[820px] w-auto">
          {/* Anel fino que orbita o conjunto — o satélite é o único ponto
              de cor (ember) da identidade */}
          <g
            className="origin-center [animation:orbit_48s_linear_infinite]"
            style={{ transformOrigin: "300px 300px", willChange: "transform" }}
          >
            <circle
              cx="300"
              cy="300"
              r="260"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.06"
              strokeDasharray="2 10"
            />
            <circle cx="300" cy="40" r="3" fill="var(--ember-bright)" fillOpacity="0.55" />
          </g>

          {/* O eclipse — três luas (papel), opacidades decrescentes (1 > 2 > 3).
              Cada <g> fixa a opacidade-base e o <circle> interno "respira"
              (keyframe `breathe`) por cima. As luas laterais (.eclipse-left/
              .eclipse-right) convergem para o centro via scroll-timeline. */}
          <g className="eclipse-left" style={{ opacity: 0.12 }}>
            <circle
              cx="230"
              cy="300"
              r="150"
              fill="#fafafa"
              className="[animation:breathe_7s_ease-in-out_infinite]"
            />
          </g>
          <g style={{ opacity: 0.08 }}>
            <circle
              cx="320"
              cy="300"
              r="150"
              fill="#fafafa"
              className="[animation:breathe_7s_ease-in-out_infinite] [animation-delay:1.2s]"
            />
          </g>
          <g className="eclipse-right" style={{ opacity: 0.06 }}>
            <circle
              cx="410"
              cy="300"
              r="150"
              fill="#fafafa"
              className="[animation:breathe_7s_ease-in-out_infinite] [animation-delay:2.4s]"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
