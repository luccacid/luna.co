"use client";

/**
 * <Preloader> — intro de eclipse exibida na primeira carga.
 *
 * Uma cortina escura cobre a tela: o símbolo "sobe", uma barra de progresso se
 * preenche e o slogan aparece; em seguida a cortina sobe (translate-y) e revela
 * a página. Roda uma vez por carregamento. Sob `prefers-reduced-motion`, vira
 * apenas um piscar curto. O scroll fica travado enquanto a cortina está no ar.
 */
import { useEffect, useState } from "react";
import { LunaSymbol } from "./luna-symbol";
import { lockScroll } from "@/lib/scroll-lock";

export function Preloader() {
  // `leaving` dispara a animação de saída; `gone` remove o nó da árvore.
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Visitas subsequentes na mesma aba pulam a intro inteira — ninguém
    // precisa rever 2s de cortina a cada reload.
    if (sessionStorage.getItem("luna-intro-seen")) {
      setGone(true);
      return;
    }
    sessionStorage.setItem("luna-intro-seen", "1");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Tempo que a cortina permanece antes de sair (curto sob reduced-motion).
    const hold = reduced ? 200 : 1500;

    // Trava a rolagem (overflow + Lenis) enquanto a intro está visível.
    lockScroll(true);

    const t1 = setTimeout(() => setLeaving(true), hold);
    const t2 = setTimeout(() => {
      setGone(true);
      lockScroll(false);
    }, hold + 750); // +750ms = duração da animação de saída

    // Limpa timers e restaura o scroll caso desmonte no meio.
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      lockScroll(false);
    };
  }, []);

  // Depois da saída, não renderiza mais nada.
  if (gone) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[120] flex flex-col items-center justify-center bg-[#141414] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        leaving ? "pointer-events-none -translate-y-full opacity-0" : "opacity-100"
      }`}
    >
      {/* Campo de estrelas de fundo */}
      <div className="starfield pointer-events-none absolute inset-0 opacity-50" />

      {/* Símbolo da marca subindo na entrada */}
      <div className="relative h-20 w-[150px] animate-[intro-rise_0.9s_cubic-bezier(0.16,1,0.3,1)_both]">
        <LunaSymbol tone="paper" animated />
      </div>

      {/* Barra de progresso que se preenche durante o `hold` */}
      <div className="relative mt-9 h-px w-[180px] overflow-hidden bg-white/12">
        <span className="absolute inset-y-0 left-0 w-full origin-left animate-[intro-bar_1.5s_ease-out_both] bg-paper/70" />
      </div>

      {/* Slogan (um dos dois únicos textos reais do projeto) */}
      <p className="relative mt-5 animate-[fade-up_0.6s_0.3s_both] font-mono text-[10px] uppercase tracking-tagline text-[#8a8a8a]">
        Building Digital Systems
      </p>
    </div>
  );
}
