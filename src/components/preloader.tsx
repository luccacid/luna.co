"use client";

/**
 * <Preloader> — intro de eclipse exibida na primeira carga.
 *
 * Uma cortina escura cobre a tela por ~600ms no total: o símbolo "sobe", a
 * barra se preenche e a cortina sai, revelando a página. Roda na primeira
 * visita da aba. Sob `prefers-reduced-motion`, vira apenas um piscar curto.
 *
 * ponytail: 600ms é o teto. Era 1,7s + trava de scroll por timer no <html> —
 * tempo cobrado do tráfego frio para mostrar um logo que já está no topo da
 * página. A trava agora vive com o componente e sai junto com ele.
 */
import { useEffect, useRef, useState } from "react";
import { LunaSymbol } from "./luna-symbol";
import { lockScroll } from "@/lib/scroll-lock";
import { makeSiblingsInert } from "@/lib/inert";

export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  // `leaving` dispara a animação de saída; `gone` remove o nó da árvore.
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Visitas subsequentes na mesma aba pulam a intro inteira — ninguém
    // precisa rever 2s de cortina a cada reload.
    let seen = false;
    try {
      seen = sessionStorage.getItem("luna-intro-seen") === "1";
      if (!seen) sessionStorage.setItem("luna-intro-seen", "1");
    } catch {
      // A intro continua mesmo se o armazenamento estiver bloqueado.
    }
    if (seen) {
      const frame = requestAnimationFrame(() => setGone(true));
      return () => cancelAnimationFrame(frame);
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Os prazos contam da NAVEGAÇÃO (performance.now()), não da hidratação:
    // em conexão lenta o JS chega tarde e um timer relativo à montagem
    // devolveria a cortina de 1,7s pela porta dos fundos. 600ms é teto.
    const since = performance.now();
    const hold = Math.max(0, (reduced ? 80 : 320) - since);
    const done = Math.max(0, (reduced ? 100 : 600) - since);

    // Trava a rolagem (overflow + Lenis) enquanto a intro está visível.
    lockScroll("preloader", true);
    const restoreInert = makeSiblingsInert(ref.current);
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      restoreInert();
      lockScroll("preloader", false);
    };

    const t1 = setTimeout(() => setLeaving(true), hold);
    const t2 = setTimeout(() => {
      setGone(true);
      release();
    }, done);

    // Limpa timers e restaura o scroll caso desmonte no meio.
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      release();
    };
  }, []);

  // Depois da saída, não renderiza mais nada.
  if (gone) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className={`preloader fixed inset-0 z-preloader flex flex-col items-center justify-center bg-dark transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        leaving ? "pointer-events-none -translate-y-full opacity-0" : "opacity-100"
      }`}
    >
      {/* Campo de estrelas de fundo */}
      <div className="starfield pointer-events-none absolute inset-0 opacity-50" />

      {/* Símbolo da marca subindo na entrada */}
      <div className="relative h-20 w-[150px] animate-[intro-rise_0.35s_cubic-bezier(0.16,1,0.3,1)_both]">
        <LunaSymbol tone="paper" animated />
      </div>

      {/* Barra de progresso que se preenche durante o `hold` */}
      <div className="relative mt-9 h-px w-[180px] overflow-hidden bg-white/12">
        <span className="absolute inset-y-0 left-0 w-full origin-left animate-[intro-bar_0.32s_ease-out_both] bg-paper/70" />
      </div>

    </div>
  );
}
