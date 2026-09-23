/**
 * <Hero> — abertura da marca.
 *
 * É o lockup oficial em escala máxima: símbolo do eclipse, wordmark "luna&co",
 * uma divisória fina e o slogan. Este é o único lugar onde a identidade é
 * declarada literalmente; tudo abaixo é interpretação. Ocupa a altura total da
 * viewport abaixo da navegação, com o EclipseField em parallax ao fundo.
 *
 * Cliente por causa do dicionário de idioma (useT); o parallax continua
 * isolado no EclipseField.
 */
"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { EclipseField } from "./eclipse-field";
import { LunaSymbol } from "./luna-symbol";
import { useT } from "@/lib/i18n";
import { SECTION_TOTAL } from "@/lib/sections";

export function Hero() {
  const t = useT();
  return (
    <section
      id="top"
      aria-label="Hero"
      className="on-dark relative flex min-h-[calc(100svh-66px)] flex-col overflow-hidden bg-dark text-paper"
    >
      {/* Estrelas piscando (twinkle) + eclipse com parallax ao fundo */}
      <div className="starfield pointer-events-none absolute inset-0 [animation:twinkle_9s_ease-in-out_infinite]" />
      <EclipseField />

      {/* Rótulos verticais nas margens (só em telas grandes) — decorativos,
          escondidos da AT (duplicam a marca e quebram a ordem de leitura). */}
      <span aria-hidden className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 -rotate-90 font-mono text-[11px] uppercase tracking-tagline text-[#5a5a5a] lg:block">
        {t.hero.railLeft}
      </span>
      <span aria-hidden className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 font-mono text-[11px] uppercase tracking-tagline text-[#5a5a5a] lg:block">
        {t.hero.railRight}
      </span>

      {/* Lockup centralizado */}
      <div className="rail relative z-10 flex flex-1 flex-col items-center justify-center py-10 text-center sm:py-14">
        {/* Símbolo do eclipse (animado) */}
        <div className="mb-7 h-14 w-[110px] animate-fade-up sm:mb-9 sm:h-20 sm:w-[150px]">
          <LunaSymbol tone="paper" animated />
        </div>

        {/* Wordmark gigante — cada letra entra em cascata; o "&" é o próprio
            símbolo do eclipse (lockup proprietário). `aria-label` garante a
            leitura correta; os <span> ficam aria-hidden. */}
        <h1
          aria-label="luna&co"
          className="wordmark flex items-center text-[clamp(56px,15vw,180px)] leading-[0.9] text-white"
        >
          {"luna&co".split("").map((ch, i) => (
            <span
              key={i}
              aria-hidden
              className="inline-block animate-fade-up"
              // Atraso crescente por letra → efeito de cascata.
              style={{ animationDelay: `${120 + i * 70}ms` }}
            >
              {ch === "&" ? (
                <span className="mx-[0.06em] inline-block h-[0.55em] w-[1.05em] translate-y-[0.04em]">
                  <LunaSymbol tone="paper" title="" />
                </span>
              ) : (
                ch
              )}
            </span>
          ))}
        </h1>

        {/* Divisória que "cresce" horizontalmente na entrada */}
        <span className="mt-6 block h-px w-[min(440px,68vw)] origin-center scale-x-0 animate-[grow_0.9s_0.5s_both] bg-paper/30" />

        {/* Slogan (texto real permitido) */}
        <p className="mt-6 animate-fade-up font-mono text-[clamp(11px,2.2vw,16px)] uppercase tracking-tagline text-[#bdbdbd] [animation-delay:320ms]">
          {t.hero.tagline}
        </p>
        <p className="mt-6 max-w-[580px] animate-fade-up text-[clamp(15px,2vw,19px)] leading-relaxed text-[#d4d4d4] [animation-delay:420ms]">
          {t.hero.value}
        </p>
        <a
          href="#contato"
          className="mt-7 inline-flex animate-fade-up items-center gap-3 rounded-full bg-paper px-6 py-3 font-mono text-[13px] font-medium text-ink transition-transform duration-200 hover:-translate-y-0.5 [animation-delay:520ms]"
        >
          {t.nav.cta}
          <ArrowUpRight aria-hidden className="h-4 w-4" />
        </a>
      </div>

      {/* Indicação de scroll, fixada na base do hero. "00 / NN" = início:
          o SectionHud assume a contagem ao entrar no conteúdo. */}
      <div className="rail relative z-10 flex items-center justify-between pb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-[#8a8a8a]">
        <span className="hidden sm:inline">{t.hero.railLeft}</span>
        <a
          href="#manifesto"
          className="mx-auto inline-flex items-center gap-2 transition-colors hover:text-paper sm:mx-0"
        >
          <ArrowDown aria-hidden className="h-3.5 w-3.5 motion-safe:animate-bounce" />
          {t.hero.scroll}
        </a>
        <span className="hidden sm:inline">00 / {SECTION_TOTAL}</span>
      </div>
    </section>
  );
}
