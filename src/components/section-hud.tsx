"use client";

/**
 * <SectionHud> — contador de "capítulos" fixo no canto inferior esquerdo,
 * espelhando o ScrollMoon à direita. Fecha a promessa do "00 / NN" do hero:
 * a página inteira passa a ter senso de posição.
 *
 * `mix-blend-difference` + texto papel = legível sobre qualquer fundo
 * (escuro vira claro, claro vira escuro) sem lógica de tema.
 */
import { cn } from "@/lib/utils";
import { useActiveSection } from "./use-active-section";
import { useT } from "@/lib/i18n";
import { SECTION_IDS as IDS, SECTION_TOTAL } from "@/lib/sections";

export function SectionHud() {
  const t = useT();
  const active = useActiveSection(IDS);
  const idx = active ? IDS.indexOf(active) : -1;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed bottom-6 left-6 z-nav hidden items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-paper mix-blend-difference transition-opacity duration-500 md:flex",
        // Some no hero (nenhuma seção ativa) e reaparece ao entrar no conteúdo.
        idx === -1 ? "opacity-0" : "opacity-100"
      )}
    >
      <span>
        {idx === -1 ? "00" : String(idx + 1).padStart(2, "0")} / {SECTION_TOTAL}
      </span>
      <span className="opacity-60">{idx === -1 ? "" : t.hud[idx]}</span>
    </div>
  );
}
