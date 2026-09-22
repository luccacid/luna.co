"use client";

/**
 * <SiteNav> — navegação fixa no topo + menu mobile em tela cheia.
 *
 * No desktop mostra os links (com scrollspy: a seção ativa ganha um ponto
 * ember sob o link) e o CTA. No mobile, esconde os links e revela um botão
 * "hambúrguer" que abre um overlay full-screen — semântica de diálogo
 * (role="dialog", foco gerenciado, Escape fecha). A barra ganha uma borda
 * quando a página é rolada, e o scroll (overflow + Lenis) é travado enquanto
 * o menu está aberto.
 */
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { lockScroll } from "@/lib/scroll-lock";
import { LunaLockup, LunaSymbol } from "./luna-symbol";
import { useActiveSection } from "./use-active-section";
import { useT } from "@/lib/i18n";
import { LangSwitch } from "./lang-switch";

import { SECTION_IDS } from "@/lib/sections";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false); // borda aparece ao rolar
  const [open, setOpen] = useState(false); // menu mobile aberto
  const active = useActiveSection(SECTION_IDS); // seção em vista (scrollspy)
  const t = useT();

  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Observa o scroll para alternar a borda da barra.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava a rolagem do fundo (overflow + Lenis) enquanto o menu está aberto.
  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  // Diálogo acessível: foco entra no botão fechar ao abrir, Escape fecha e
  // devolve o foco ao hambúrguer. Enquanto aberto, o resto da página fica
  // `inert` — contém o foco no diálogo sem precisar de focus-trap manual
  // (WCAG 2.1.2). ponytail: inert nativo cobre todos os browsers atuais.
  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
    const main = document.querySelector("main");
    // Copia o nó para uma variável local: o cleanup não deve ler navRef.current
    // (pode ter mudado até lá) — usa a referência capturada na execução do efeito.
    const nav = navRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    nav?.toggleAttribute("inert", true);
    main?.toggleAttribute("inert", true);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      nav?.toggleAttribute("inert", false);
      main?.toggleAttribute("inert", false);
    };
  }, [open]);

  return (
    <>
      <nav
        ref={navRef}
        aria-label={t.nav.main}
        className={cn(
          "glass sticky top-0 z-nav border-b transition-colors duration-300",
          scrolled ? "border-line" : "border-transparent"
        )}
      >
        <div className="rail flex h-[66px] items-center justify-between">
          <a href="#top" aria-label={t.nav.home}>
            <LunaLockup />
          </a>

          {/* Links — só desktop. O ponto ember marca a seção ativa. */}
          <div className="hidden items-center gap-8 font-mono text-[13px] tracking-[0.04em] text-muted-foreground md:flex">
            {t.nav.links.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative transition-colors hover:text-ink",
                    isActive && "text-ink"
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      "absolute -bottom-2 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-ember transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  />
                </a>
              );
            })}
          </div>

          {/* Idioma + CTA. O seletor aparece a partir de sm para não competir
              com o hambúrguer nas telas mais estreitas (no mobile ele vive no
              rodapé do menu). */}
          <div className="flex items-center gap-3">
            <LangSwitch className="hidden sm:inline-flex" />
            <a
              href="#contato"
              className="hidden items-center gap-2 rounded-[10px] bg-ink px-[18px] py-[9px] font-mono text-[12px] font-medium tracking-[0.04em] text-paper transition-transform duration-200 hover:-translate-y-0.5 sm:inline-flex"
            >
              {t.nav.cta}
            </a>

          {/* Botão hambúrguer — só mobile */}
          <button
            ref={burgerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t.nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 items-center justify-center text-ink md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          </div>
        </div>
      </nav>

      {/* Overlay do menu mobile (visibilidade controlada por `open`) */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.menu}
        className={cn(
          "on-dark fixed inset-0 z-mobile-menu flex flex-col bg-dark text-paper transition-[opacity,visibility] duration-500 md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <div className="starfield pointer-events-none absolute inset-0 opacity-60" />
        {/* Eclipse ambiente no canto inferior direito */}
        <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-16 opacity-[0.12]">
          <div className="h-64 w-64">
            <LunaSymbol tone="paper" title="" />
          </div>
        </div>

        {/* Cabeçalho do overlay: wordmark + botão fechar */}
        <div className="rail relative z-10 flex h-[66px] items-center justify-between">
          <span className="wordmark text-[17px]">luna&amp;co</span>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.nav.closeMenu}
            className="flex h-10 w-10 items-center justify-center"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Links grandes; entram escalonados quando o menu abre */}
        <nav aria-label={t.nav.menu} className="rail relative z-10 flex flex-1 flex-col justify-center gap-2">
          {t.nav.links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-baseline justify-between border-b border-[#2a2a2a] py-5 font-mono text-[clamp(34px,11vw,56px)] font-medium tracking-[-0.01em] transition-[transform,opacity] duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
            >
              {l.label}
              <span className="font-sans text-[12px] tracking-[0.2em] text-[#8a8a8a]">0{i + 1}</span>
            </a>
          ))}
        </nav>

        {/* Idioma + CTA de contato no rodapé do overlay */}
        <div className="rail relative z-10 flex flex-col items-center gap-5 pb-10">
          <LangSwitch tone="paper" />
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="inline-flex w-full items-center justify-center rounded-full bg-paper py-4 font-mono text-[14px] tracking-[0.04em] text-ink"
          >
            contact@lunaco.tech
          </a>
        </div>
      </div>
    </>
  );
}
