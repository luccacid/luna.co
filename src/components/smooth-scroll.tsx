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
import type Lenis from "lenis";
import { lenisRef, syncScrollLock } from "@/lib/scroll-lock";

export function SmoothScroll() {
  useEffect(() => {
    // Respeita a preferência por menos movimento: não ativa o smooth scroll.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // `cancelled` cobre o caso de o efeito ser limpo antes do import resolver.
    let cancelled = false;
    let lenis: Lenis | null = null;
    let onClick: ((e: MouseEvent) => void) | null = null;

    // Import dinâmico: o Lenis sai do bundle inicial e só carrega quando o
    // smooth scroll é de fato ativado (não sob reduced-motion).
    (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.1,
        // easeOutExpo — desaceleração suave ao fim da rolagem.
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // Scheduler interno do Lenis: cede ao browser quando ocioso, em vez de
        // um requestAnimationFrame nosso rodando a 60fps a página inteira.
        autoRaf: true,
      });
      // Registra a instância para o lockScroll (menu mobile/preloader).
      lenisRef.current = lenis;
      syncScrollLock();

      // Intercepta cliques em links de âncora para rolar suavemente até a seção.
      onClick = (e: MouseEvent) => {
        const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
        if (!anchor) return;
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;

        // getElementById não lança com ids "estranhos", diferente de querySelector.
        const target = document.getElementById(href.slice(1));
        if (!target) return;

        e.preventDefault();
        lenis!.scrollTo(target, { offset: -8 });
        // Mantém a URL compartilhável e leva o foco junto com a rolagem (a11y).
        history.pushState(null, "", href);
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        // Remove o tabindex ao perder o foco — não polui o DOM nem deixa a
        // seção num estado focável inesperado.
        target.addEventListener("blur", () => target.removeAttribute("tabindex"), {
          once: true,
        });
      };
      document.addEventListener("click", onClick);
    })();

    // Limpeza ao desmontar: remove o listener e destrói o Lenis (que para o
    // próprio rAF interno). O flag `cancelled` evita criar o Lenis se o import
    // resolver depois do unmount.
    return () => {
      cancelled = true;
      if (onClick) document.removeEventListener("click", onClick);
      if (lenis) {
        lenisRef.current = null;
        lenis.destroy();
      }
    };
  }, []);

  return null;
}
