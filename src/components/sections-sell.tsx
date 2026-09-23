"use client";

/**
 * Seções de prova e objeção: Cases, Stack, Pricing e Faq.
 *
 * Moram fora de `sections.tsx` só para aquele arquivo continuar navegável —
 * a linguagem visual é a mesma (índice editorial, filetes, zero cards).
 */
import { Reveal } from "./reveal";
import { Kicker } from "./sections";
import { useT } from "@/lib/i18n";

/* ================================================================== */
/*  Cases — setor / desafio / o que construímos                        */
/* ================================================================== */
export function Cases() {
  const t = useT();
  return (
    <section id="cases" className="bg-paper py-28">
      <div className="rail">
        <Reveal className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Kicker>{t.cases.kicker}</Kicker>
            <h2 className="mt-5 font-mono text-[clamp(34px,5vw,56px)] font-medium leading-[1.02] tracking-[-0.02em] text-ink">
              {t.cases.title}
            </h2>
          </div>
          <p className="max-w-[360px] text-[16px] text-muted-foreground">{t.cases.intro}</p>
        </Reveal>

        <div className="border-t border-line">
          {t.cases.items.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <article className="grid grid-cols-12 gap-x-4 gap-y-5 border-b border-line py-10">
                <div className="col-span-12 md:col-span-4">
                  <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-[#6b6b6b]">
                    {c.sector}
                  </p>
                  <h3 className="mt-3 max-w-[14ch] font-mono text-[clamp(22px,2.6vw,30px)] font-medium leading-[1.12] tracking-[-0.01em] text-ink">
                    {c.title}
                  </h3>
                </div>

                {/* Desafio e solução lado a lado: a leitura é "de onde" → "para onde" */}
                <dl className="col-span-12 grid gap-x-10 gap-y-5 md:col-span-8 md:grid-cols-2">
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#6b6b6b]">
                      {t.cases.challengeLabel}
                    </dt>
                    <dd className="mt-2 text-[15px] text-muted-foreground">{c.challenge}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#6b6b6b]">
                      {t.cases.builtLabel}
                    </dt>
                    <dd className="mt-2 text-[15px] text-ink">{c.built}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Stack — faixa discreta, sem logos                                  */
/* ================================================================== */
export function Stack() {
  const t = useT();
  return (
    <section className="border-b border-line bg-paper pb-20">
      <div className="rail">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Kicker>{t.stack.kicker}</Kicker>
            <h2 className="mt-4 font-mono text-[22px] font-medium tracking-[-0.01em] text-ink">
              {t.stack.title}
            </h2>
            <p className="mt-3 max-w-[420px] text-[15px] text-muted-foreground">{t.stack.intro}</p>
          </div>
          {/* Lista, não grade de logos: nomes em mono pesam menos e não envelhecem */}
          <ul className="flex max-w-[460px] flex-wrap gap-x-3 gap-y-2.5 md:justify-end">
            {t.stack.items.map((it) => (
              <li
                key={it}
                className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[12px] tracking-[0.04em] text-[#555]"
              >
                {it}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Pricing — como o preço é formado (sem número inventado)            */
/* ================================================================== */
export function Pricing() {
  const t = useT();
  return (
    <section id="investimento" className="on-dark bg-dark py-28 text-paper">
      <div className="rail">
        <Reveal className="mb-14 max-w-[620px]">
          <Kicker dark>{t.pricing.kicker}</Kicker>
          <h2 className="mt-5 font-mono text-[clamp(30px,4.4vw,52px)] font-medium leading-[1.06] tracking-[-0.02em]">
            {t.pricing.title}
          </h2>
          <p className="mt-5 text-[16px] text-[#aaa]">{t.pricing.intro}</p>
        </Reveal>

        <dl className="grid gap-x-10 gap-y-10 border-t border-[#2a2a2a] pt-10 sm:grid-cols-2">
          {t.pricing.items.map((it, i) => (
            <Reveal key={it.title} delay={i * 70}>
              <dt className="flex items-baseline gap-4 font-mono text-[19px] font-medium tracking-[-0.01em] text-white">
                <span className="text-[13px] text-[#8a8a8a]">0{i + 1}</span>
                {it.title}
              </dt>
              <dd className="mt-3 max-w-[380px] pl-[38px] text-[15px] text-[#aaa]">{it.body}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Faq — <details> nativo: abre sem JS e é acessível de graça         */
/* ================================================================== */
export function Faq() {
  const t = useT();
  return (
    <section id="faq" className="bg-paper py-28">
      <div className="rail">
        <Reveal className="mb-14">
          <Kicker>{t.faq.kicker}</Kicker>
          <h2 className="mt-5 font-mono text-[clamp(34px,5vw,56px)] font-medium leading-[1.02] tracking-[-0.02em] text-ink">
            {t.faq.title}
          </h2>
        </Reveal>

        <div className="border-t border-line">
          {t.faq.items.map((f, i) => (
            <Reveal key={f.q} delay={i * 50}>
              {/* `group` + `open:` cuidam do estado visual — nada de useState */}
              <details className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-baseline gap-5 py-6 marker:content-none">
                  <span className="font-mono text-[13px] text-[#6b6b6b]">0{i + 1}</span>
                  <span className="flex-1 font-mono text-[clamp(17px,2vw,22px)] font-medium tracking-[-0.01em] text-ink">
                    {f.q}
                  </span>
                  {/* "+" que vira "−" ao abrir, por rotação */}
                  <span
                    aria-hidden
                    className="relative mt-1 h-3 w-3 shrink-0 text-ink transition-transform duration-300 group-open:rotate-45"
                  >
                    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-opacity duration-300" />
                  </span>
                </summary>
                <p className="max-w-[62ch] pb-7 pl-[46px] text-[15px] leading-[1.65] text-muted-foreground">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
