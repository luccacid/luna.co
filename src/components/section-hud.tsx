"use client";

/**
 * <SectionHud> — contador de "capítulos" fixo no canto inferior esquerdo,
 * espelhando o ScrollMoon à direita. Fecha a promessa do "00 / 05" do hero:
 * a página inteira passa a ter senso de posição.
 *
 * `mix-blend-difference` + texto papel = legível sobre qualquer fundo
 * (escuro vira claro, claro vira escuro) sem lógica de tema.
 * Rótulos são placeholders por requisito do projeto.
 */
import { cn } from "@/lib/utils";
import { useActiveSection } from "./use-active-section";

const SECTIONS = [
  { id: "manifesto", label: "Sit" },
  { id: "servicos", label: "Lorem" },
  { id: "processo", label: "Dolor" },
  { id: "sobre", label: "Ipsum" },
  { id: "contato", label: "Amet" },
] as const;

const IDS = SECTIONS.map((s) => s.id);

export function SectionHud() {
  const active = useActiveSection(IDS);
  const idx = SECTIONS.findIndex((s) => s.id === active);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed bottom-6 left-6 z-nav hidden items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-paper mix-blend-difference transition-opacity duration-500 md:flex",
        // Some no hero (nenhuma seção ativa) e reaparece ao entrar no conteúdo.
        idx === -1 ? "opacity-0" : "opacity-100"
      )}
    >
      <span>{idx === -1 ? "00" : `0${idx + 1}`} / 05</span>
      <span className="opacity-60">{idx === -1 ? "" : SECTIONS[idx].label}</span>
    </div>
  );
}
