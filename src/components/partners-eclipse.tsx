"use client";

/**
 * <PartnersEclipse> — três luas sobrepostas, interativas, na seção "Sobre".
 *
 * Passar o mouse (ou focar) em um item da lista acende a lua correspondente em
 * luz cheia e apaga as outras — a ideia de "partes que formam um sistema" vira
 * algo que se sente, não só se lê. É novamente um jogo de opacidade.
 *
 * Obs.: os textos são placeholders (Lorem/Dolor/Consectetur) por requisito.
 */
import { useState } from "react";
import { cn } from "@/lib/utils";

/** Itens do eclipse. `cx` posiciona cada lua no eixo X do SVG. */
const PARTNERS = [
  { name: "Lorem", role: "Ipsum", cx: 230 },
  { name: "Dolor", role: "Amet", cx: 300 },
  { name: "Consectetur", role: "Elit", cx: 370 },
] as const;

/** Opacidades de repouso — o eclipse canônico (1 > 2 > 3). */
const REST = [0.92, 0.55, 0.28];

export function PartnersEclipse() {
  // Índice do item ativo (com hover/foco); `null` = estado de repouso.
  const [active, setActive] = useState<number | null>(null);

  /** Opacidade de cada lua conforme o item ativo. */
  const opacityFor = (i: number) => {
    if (active === null) return REST[i]; // repouso → hierarquia padrão
    return active === i ? 0.95 : 0.14; // ativo aceso, demais apagados
  };

  return (
    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
      {/* Lista de nomes — o índice interativo */}
      <ul className="order-2 md:order-1">
        {PARTNERS.map((p, i) => (
          <li key={p.name}>
            <button
              type="button"
              // Mouse e teclado controlam o mesmo estado (acessível).
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className={cn(
                "group flex w-full items-baseline justify-between border-b border-[#2a2a2a] py-6 text-left transition-colors duration-300",
                active === i ? "border-paper/40" : "hover:border-[#3d3d3d]"
              )}
            >
              <span className="flex items-baseline gap-5">
                {/* #8a8a8a: 5.3:1 sobre #141414 — o antigo #666 reprovava em AA */}
                <span className="font-mono text-[13px] text-[#8a8a8a]">0{i + 1}</span>
                <span
                  className={cn(
                    "font-mono text-[clamp(28px,4vw,44px)] font-medium tracking-[-0.01em] transition-colors duration-300",
                    active === i ? "text-white" : "text-[#888]"
                  )}
                >
                  {p.name}
                </span>
              </span>
              <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#8a8a8a]">
                {p.role}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* O eclipse interativo */}
      <div className="order-1 flex justify-center md:order-2">
        {/* Decorativo: o estado interativo é transmitido pela lista de botões. */}
        <svg aria-hidden viewBox="0 0 600 600" className="w-full max-w-[420px]">
          {/* Anel orbital pontilhado */}
          <g style={{ transformOrigin: "300px 300px", willChange: "transform" }} className="[animation:orbit_60s_linear_infinite]">
            <circle
              cx="300"
              cy="300"
              r="250"
              fill="none"
              stroke="#fafafa"
              strokeOpacity="0.08"
              strokeDasharray="1 12"
            />
          </g>
          {/* As três luas — opacidade controlada pelo item ativo, com transição suave */}
          {PARTNERS.map((p, i) => (
            <circle
              key={p.name}
              cx={p.cx}
              cy="300"
              r="120"
              fill="#fafafa"
              style={{
                opacity: opacityFor(i),
                transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
