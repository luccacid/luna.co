/**
 * Seções de conteúdo da landing.
 *
 * Reúne os blocos exportados e usados em `page.tsx`: Statement, TrustBar,
 * Services, About, Process, FinalCta e SiteFooter. Cada seção é uma função
 * isolada (responsabilidade única) para manter o arquivo navegável.
 *
 * Princípios de design aplicados aqui:
 *   - tipografia editorial em mono, layouts assimétricos;
 *   - o eclipse como motivo recorrente (não só logo);
 *   - nada de "tudo em cards" — Serviços é um índice, stats são inline.
 */
"use client";

import { ArrowUpRight, MessageCircle, Plus } from "lucide-react";
import { useT } from "@/lib/i18n";
import { LunaSymbol, LunaWordmark } from "./luna-symbol";
import { Reveal } from "./reveal";
import { PartnersEclipse } from "./partners-eclipse";
import { Magnetic } from "./magnetic";
import { CopyEmail } from "./copy-email";
import { ContactForm } from "./contact-form";
import { EMAIL, WHATSAPP, whatsappUrl } from "@/lib/contact";

/* ================================================================== */
/*  Compartilhado: rótulo de seção ("kicker")                          */
/* ================================================================== */
/** Pequeno rótulo em mono com um "+" antes — usado no topo de cada seção.
 *  Exportado porque `sections-sell.tsx` usa o mesmo rótulo; antes havia uma
 *  segunda cópia lá, com um comentário justificando a duplicação.
 *  Cinzas calibrados para AA em 12px: #6b6b6b (5.1:1 sobre papel) e
 *  #8a8a8a (5.3:1 sobre #141414). */
export function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.28em] ${
        dark ? "text-[#8a8a8a]" : "text-[#6b6b6b]"
      }`}
    >
      <Plus className="h-3 w-3" strokeWidth={2} aria-hidden />
      {children}
    </span>
  );
}

/* ================================================================== */
/*  Statement — tipografia editorial gigante, a "voz" da marca         */
/* ================================================================== */
export function Statement() {
  const t = useT();
  return (
    <section id="manifesto" tabIndex={-1} className="relative bg-paper py-28 md:py-40">
      <div className="rail">
        <Reveal className="mb-12">
          <Kicker>{t.statement.kicker}</Kicker>
        </Reveal>

        {/* Frase grande, com um trecho cinza que pulsa de opacidade */}
        <Reveal delay={80}>
          <h2 className="max-w-[20ch] font-mono text-[clamp(30px,6.5vw,84px)] font-medium leading-[1.04] tracking-[-0.02em] text-ink">
            {t.statement.lead1}{" "}
            {/* #8a8a8a: 3.3:1 — passa AA para texto grande (o #bcbcbc reprovava) */}
            <span className="text-[#8a8a8a] [animation:pulse-dim_5s_ease-in-out_infinite]">
              {t.statement.leadAccent}
            </span>{" "}
            {t.statement.lead2}
          </h2>
        </Reveal>

        {/* Parágrafo de apoio + link com sublinhado que "varre" no hover */}
        <Reveal
          delay={160}
          className="mt-14 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-start md:justify-between"
        >
          <p className="max-w-[460px] text-[16px] text-muted-foreground">
            {t.statement.body}
          </p>
          <a
            href="#contato"
            className="group inline-flex shrink-0 items-center gap-3 font-mono text-[14px] tracking-[0.04em] text-ink"
          >
            <span className="relative">
              {t.statement.cta}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
            </span>
            {/* Botão circular com efeito magnético */}
            <Magnetic strength={0.5}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </Magnetic>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  TrustBar — faixa marquee infinita (sem caixas)                     */
/* ================================================================== */


/**
 * Um "grupo" do marquee. A lista chega repetida 2× para que um único grupo
 * fique mais largo que viewports comuns; como a faixa usa dois grupos
 * idênticos e anima `translateX(-50%)`, o grupo 2 cai exatamente onde o grupo 1
 * começou — loop contínuo, sem buraco.
 */
function MarqueeGroup({ seq }: { seq: readonly string[] }) {
  return (
    <div aria-hidden className="flex shrink-0 items-center">
      {seq.map((w, i) => (
        <span
          key={i}
          className="flex items-center font-mono text-[13px] tracking-[0.18em] text-[#6b6b6b]"
        >
          <span>{w}</span>
          {/* Bolinha separadora — margens simétricas para espaçamento uniforme */}
          <span className="mx-9 inline-block h-[3px] w-[3px] rounded-full bg-ink/25" />
        </span>
      ))}
    </div>
  );
}

export function TrustBar() {
  const { marquee } = useT();
  const seq = [...marquee, ...marquee];
  return (
    <div aria-hidden className="marquee-mask overflow-hidden border-y border-line bg-paper py-7">
      <div className="marquee-track">
        <MarqueeGroup seq={seq} />
        <MarqueeGroup seq={seq} />
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Services — índice editorial, linhas full-width, invert no hover    */
/* ================================================================== */
export function Services() {
  const t = useT();
  const SERVICES = t.services.items;
  return (
    <section id="servicos" className="py-28">
      <div className="rail">
        <Reveal className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Kicker>{t.services.kicker}</Kicker>
            <h2 className="mt-5 font-mono text-[clamp(34px,5vw,56px)] font-medium leading-[1.02] tracking-[-0.02em] text-ink">
              {t.services.title}
            </h2>
          </div>
          <p className="max-w-[360px] text-[16px] text-muted-foreground">
            {t.services.intro}
          </p>
        </Reveal>

        {/* O índice — linhas, não cards */}
        <div className="border-t border-line">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <a
                href="#contato"
                aria-label={s.title}
                className="group relative block border-b border-line"
              >
                {/* Camada de tinta que "sobe" preenchendo a linha no hover */}
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100" />

                <div className="relative grid grid-cols-12 items-center gap-4 px-1 py-8 md:py-10">
                  {/* Numeração */}
                  <span className="col-span-2 font-mono text-[13px] text-[#6b6b6b] transition-colors duration-300 group-hover:text-[#aaa] group-focus-visible:text-[#aaa] md:col-span-1">
                    0{i + 1}
                  </span>

                  {/* Título (desliza e inverte de cor sobre a tinta).
                      É um <span>, não <h3>: heading dentro de <a> é HTML
                      inválido e inflaria o nome acessível do link — o título
                      vai no aria-label do <a>. */}
                  <span className="col-span-10 block font-mono text-[clamp(24px,3.4vw,40px)] font-medium tracking-[-0.01em] text-ink transition-all duration-300 group-hover:translate-x-2 group-hover:text-paper group-focus-visible:translate-x-2 group-focus-visible:text-paper md:col-span-5">
                    {s.title}
                  </span>

                  {/* Descrição + tags */}
                  <p className="col-span-9 col-start-3 text-[14px] text-muted-foreground transition-colors duration-300 group-hover:text-[#b3b3b3] group-focus-visible:text-[#b3b3b3] md:col-span-4 md:col-start-7">
                    {s.body}
                    <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-[#6b6b6b] transition-colors duration-300 group-hover:text-[#b3b3b3] group-focus-visible:text-[#b3b3b3]">
                      {s.tags}
                    </span>
                  </p>

                  {/* Seta (gira 45° no hover) */}
                  <span className="col-span-12 hidden justify-end md:col-span-1 md:flex">
                    <ArrowUpRight
                      aria-hidden
                      className="h-7 w-7 text-ink transition-all duration-300 group-hover:rotate-45 group-hover:text-paper group-focus-visible:rotate-45 group-focus-visible:text-paper"
                      strokeWidth={1.4}
                    />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  About — eclipse interativo + estatísticas inline                   */
/* ================================================================== */
export function About() {
  const t = useT();
  return (
    <section id="sobre" className="on-dark bg-dark py-28 text-paper">
      <div className="rail">
        <Reveal className="mb-16 max-w-[640px]">
          <Kicker dark>{t.about.kicker}</Kicker>
          <h2 className="mt-5 font-mono text-[clamp(30px,4.4vw,52px)] font-medium leading-[1.06] tracking-[-0.02em]">
            {t.about.title1}
            <br />
            {/* #6b6b6b: 3.45:1 — passa AA para texto grande sobre #141414 */}
            <span className="text-[#6b6b6b]">{t.about.title2}</span>
          </h2>
          <p className="mt-5 max-w-[460px] text-[16px] text-[#aaa]">
            {t.about.body}
          </p>
        </Reveal>

        {/* As três luas interativas */}
        <Reveal delay={120}>
          <PartnersEclipse />
        </Reveal>

        {/* O que o cliente leva — afirmações, não números.
            ponytail: aqui havia uma faixa "01 / 100% / R$ / +" em corpo 56px.
            "R$" e "+" não são métricas; era uma faixa de indicadores sem
            indicador, justo no site de quem vende dados. Ficaram só as
            afirmações, que são verdadeiras e já sustentavam a seção. */}
        <Reveal delay={160}>
          <ul className="mt-20 grid gap-x-10 gap-y-4 border-t border-[#2a2a2a] pt-10 sm:grid-cols-2">
            {t.about.stats.map((label) => (
              <li key={label} className="flex items-baseline gap-3 font-mono text-[14px] text-[#ccc]">
                <span aria-hidden className="mt-[2px] h-[5px] w-[5px] shrink-0 rounded-full bg-ember-bright" />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Process — fases da lua: a luz viaja da nova → cheia                */
/* ================================================================== */
/** Quantidade de etapas — o conteúdo vem do dicionário. */
const STEP_COUNT = 4;

/**
 * Mini-lua de cada etapa. A opacidade cresce a cada passo (0.28 → 0.92),
 * representando o eclipse "se enchendo de luz" ao longo do processo.
 */
function MoonPhase({ step }: { step: number }) {
  const op = 0.28 + (step / (STEP_COUNT - 1)) * 0.64;
  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9">
      <circle cx="24" cy="24" r="22" fill="none" stroke="#1a1a1a" strokeOpacity="0.18" />
      <circle cx="24" cy="24" r="22" fill="#1a1a1a" style={{ opacity: op }} />
    </svg>
  );
}

export function Process() {
  const t = useT();
  const STEPS = t.process.steps;
  return (
    <section id="processo" className="py-28">
      <div className="rail">
        <Reveal className="mb-16">
          <Kicker>{t.process.kicker}</Kicker>
          <h2 className="mt-5 font-mono text-[clamp(34px,5vw,56px)] font-medium leading-[1.02] tracking-[-0.02em] text-ink">
            {t.process.title}
          </h2>
        </Reveal>

        <div className="relative grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Filete que conecta as etapas em telas grandes */}
          <span className="absolute left-0 right-0 top-[18px] hidden h-px bg-line lg:block" />

          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 110} className="relative pr-8">
              {/* O `bg-paper` cobre o filete atrás da lua, para ele "nascer" da etapa */}
              <div className="relative mb-6 flex items-center gap-4 bg-paper lg:pr-4">
                <MoonPhase step={i} />
                <span className="font-mono text-[13px] text-[#6b6b6b]">0{i + 1}</span>
              </div>
              {/* h3 (não h4): mantém a hierarquia de headings sem saltos */}
              <h3 className="mb-2 font-mono text-[20px] font-medium tracking-[-0.01em] text-ink">
                {s.title}
              </h3>
              <p className="max-w-[220px] text-[14px] text-muted-foreground">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FinalCta — full-bleed, eclipse gigante ao fundo                    */
/* ================================================================== */
export function FinalCta() {
  const t = useT();
  return (
    <section id="contato" className="on-dark relative overflow-hidden bg-dark py-32 text-paper">
      <div className="starfield pointer-events-none absolute inset-0 [animation:twinkle_11s_ease-in-out_infinite]" />

      {/* Eclipse gigante, cortado, "vazando" pela base — respirando em opacidade */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[40%] left-1/2 -translate-x-1/2 opacity-[0.5]"
      >
        <svg viewBox="0 0 600 300" className="w-[140vw] max-w-[1400px]">
          <g style={{ opacity: 0.06 }}>
            <circle cx="230" cy="150" r="150" fill="#fafafa" className="[animation:breathe_8s_ease-in-out_infinite]" />
          </g>
          <g style={{ opacity: 0.045 }}>
            <circle cx="300" cy="150" r="150" fill="#fafafa" className="[animation:breathe_8s_ease-in-out_infinite] [animation-delay:1.3s]" />
          </g>
          <g style={{ opacity: 0.03 }}>
            <circle cx="370" cy="150" r="150" fill="#fafafa" className="[animation:breathe_8s_ease-in-out_infinite] [animation-delay:2.6s]" />
          </g>
        </svg>
      </div>

      <div className="rail relative z-10 text-center">
        <Reveal>
          <div className="mx-auto mb-8 h-12 w-[88px]">
            <LunaSymbol tone="paper" animated />
          </div>
          <h2 className="mx-auto max-w-[16ch] font-mono text-[clamp(30px,5vw,60px)] font-medium leading-[1.02] tracking-[-0.02em]">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[440px] text-[16px] text-[#aaa]">
            {t.cta.body}
          </p>

          {/* Pill de contato (mailto) + botão copiar — duas rotas, zero atrito */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.35}>
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-3 rounded-full border border-[#3a3a3a] py-3.5 pl-7 pr-3.5 font-mono text-[14px] tracking-[0.04em] text-paper transition-colors duration-300 hover:border-paper"
              >
                {EMAIL}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </Magnetic>
            <CopyEmail email={EMAIL} />
            {/* WhatsApp: em B2B brasileiro é o canal que o comprador usa no
                meio do expediente. Só aparece com o número configurado. */}
            {WHATSAPP && (
              <a
                href={whatsappUrl(t.cta.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#3a3a3a] px-5 py-3 font-mono text-[13px] tracking-[0.04em] text-[#aaa] transition-colors duration-300 hover:border-paper hover:text-paper"
              >
                <MessageCircle aria-hidden className="h-4 w-4" />
                {t.cta.whatsapp}
              </a>
            )}
          </div>

          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Footer                                                             */
/* ================================================================== */
export function SiteFooter() {
  const t = useT();
  return (
    <footer className="on-dark border-t border-[#262626] bg-dark py-16 text-[#888]">
      <div className="rail">
        {/* Wordmark gigante como elemento gráfico — o "&" é o próprio símbolo */}
        <div className="mb-14">
          <LunaWordmark
            tone="paper"
            className="text-[clamp(40px,9vw,110px)] leading-none text-paper"
          />
        </div>

        <div className="flex flex-wrap items-start justify-between gap-10 border-t border-[#262626] pt-10">
          <p className="max-w-[280px] text-[14px] text-[#888]">
            {t.footer.blurb}
          </p>

          {/* Colunas de links (rótulos placeholder) */}
          <div className="flex flex-wrap gap-x-16 gap-y-8 font-mono text-[13px]">
            <div>
              <p className="mb-3.5 font-medium tracking-[0.04em] text-[#ccc]">
                {t.footer.navTitle}
              </p>
              {t.nav.links.slice(0, 3).map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="mb-2.5 block text-[#888] transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <div>
              <p className="mb-3.5 font-medium tracking-[0.04em] text-[#ccc]">
                {t.footer.contactTitle}
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="mb-2.5 block text-[#888] transition-colors hover:text-white"
              >
                {EMAIL}
              </a>
              {WHATSAPP && (
                <a
                  href={whatsappUrl(t.cta.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-2.5 block text-[#888] transition-colors hover:text-white"
                >
                  {t.cta.whatsapp}
                </a>
              )}
              <a href="#top" className="mb-2.5 block text-[#888] transition-colors hover:text-white">
                lunaco.tech
              </a>
            </div>
          </div>
        </div>

        {/* Linha final: copyright + fase da lua real de hoje + assinatura.
            #8a8a8a no lugar de #666: 12px precisa de 4.5:1 sobre #141414. */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-[#262626] pt-6 font-mono text-[12px] tracking-[0.04em] text-[#8a8a8a]">
          <span>© 2026 luna&amp;co</span>
          <span>BUILDING DIGITAL SYSTEMS</span>
        </div>
      </div>
    </footer>
  );
}
