/**
 * <Hero> — abertura da marca.
 *
 * É o lockup oficial em escala máxima: símbolo do eclipse, wordmark "luna&co",
 * uma divisória fina e o slogan. Este é o único lugar onde a identidade é
 * declarada literalmente; tudo abaixo é interpretação. Ocupa a altura total da
 * viewport (`min-h-[100svh]`) com o EclipseField em parallax ao fundo.
 *
 * Cliente por causa do dicionário de idioma (useT); o parallax continua
 * isolado no EclipseField.
 */
"use client";

import { ArrowDown } from "lucide-react";
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
      className="on-dark relative flex min-h-[100svh] flex-col overflow-hidden bg-dark text-paper"
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
      <div className="rail relative z-10 flex flex-1 flex-col items-center justify-center py-28 text-center">
        {/* Símbolo do eclipse (animado) */}
        <div className="mb-10 h-20 w-[150px] animate-fade-up sm:h-24 sm:w-[180px]">
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
        <span className="mt-7 block h-px w-[min(440px,68vw)] origin-center scale-x-0 animate-[grow_0.9s_0.5s_both] bg-paper/30" />

        {/* Slogan (texto real permitido) */}
        <p className="mt-7 animate-fade-up font-mono text-[clamp(11px,2.2vw,16px)] uppercase tracking-tagline text-[#bdbdbd] [animation-delay:320ms]">
          {t.hero.tagline}
        </p>
      </div>

      {/* Indicação de scroll, fixada na base do hero. "00 / NN" = início:
          o SectionHud assume a contagem ao entrar no conteúdo. */}
      <div className="rail relative z-10 flex items-center justify-between pb-9 font-mono text-[11px] uppercase tracking-[0.3em] text-[#8a8a8a]">
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
