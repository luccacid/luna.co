"use client";

/**
 * <SmoothScroll> — habilita rolagem com inércia (Lenis) e navegação suave para
 * âncoras internas (`#secao`).
 *
 * Não renderiza nada (retorna `null`); só instala efeitos colaterais. Desligado
 * sob `prefers-reduced-motion`, caindo na rolagem nativa. Importante: o Lenis
 * mantém `window.scrollY` em sincronia, então a UI que depende do scroll (a nav
 * e o ScrollMoon) continua funcionando normalmente.
 */
import { useEffect } from "react";
import Lenis from "lenis";
import { lenisRef } from "@/lib/scroll-lock";

export function SmoothScroll() {
  useEffect(() => {
    // Respeita a preferência por menos movimento: não ativa o smooth scroll.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      // easeOutExpo — desaceleração suave ao fim da rolagem.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    // Registra a instância para o lockScroll (menu mobile/preloader).
    lenisRef.current = lenis;

    // Loop de animação do Lenis via requestAnimationFrame.
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Intercepta cliques em links de âncora para rolar suavemente até a seção.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      // getElementById não lança com ids "estranhos", diferente de querySelector.
      const target = document.getElementById(href.slice(1));
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target, { offset: -8 });
      // Mantém a URL compartilhável e leva o foco junto com a rolagem (a11y).
      history.pushState(null, "", href);
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    // Limpeza ao desmontar: cancela o loop, remove o listener e destrói o Lenis.
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  return null;
}
