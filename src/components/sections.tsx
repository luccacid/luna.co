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
 * Textos de corpo são placeholders (Lorem Ipsum) por requisito.
 */
import { ArrowUpRight, Plus } from "lucide-react";
import { LunaSymbol, LunaWordmark } from "./luna-symbol";
import { Reveal } from "./reveal";
import { PartnersEclipse } from "./partners-eclipse";
import { Magnetic } from "./magnetic";
import { CountUp } from "./count-up";
import { CopyEmail } from "./copy-email";
import { MoonToday } from "./moon-today";

/* ================================================================== */
/*  Compartilhado: rótulo de seção ("kicker")                          */
/* ================================================================== */
/** Pequeno rótulo em mono com um "+" antes — usado no topo de cada seção.
 *  Cinzas calibrados para AA em 12px: #6b6b6b (5.1:1 sobre papel) e
 *  #8a8a8a (5.3:1 sobre #141414). */
function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
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
  return (
    <section id="manifesto" tabIndex={-1} className="relative bg-paper py-28 md:py-40">
      <div className="rail">
        <Reveal className="mb-12">
          <Kicker>Lorem ipsum</Kicker>
        </Reveal>

        {/* Frase grande, com um trecho cinza que pulsa de opacidade */}
        <Reveal delay={80}>
          <p className="max-w-[20ch] font-mono text-[clamp(30px,6.5vw,84px)] font-medium leading-[1.04] tracking-[-0.02em] text-ink">
            Lorem ipsum dolor{" "}
            {/* #8a8a8a: 3.3:1 — passa AA para texto grande (o #bcbcbc reprovava) */}
            <span className="text-[#8a8a8a] [animation:pulse-dim_5s_ease-in-out_infinite]">
              sit amet consectetur
            </span>{" "}
            adipiscing elit.
          </p>
        </Reveal>

        {/* Parágrafo de apoio + link com sublinhado que "varre" no hover */}
        <Reveal
          delay={160}
          className="mt-14 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-start md:justify-between"
        >
          <p className="max-w-[460px] text-[16px] text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam.
          </p>
          <a
            href="#contato"
            className="group inline-flex shrink-0 items-center gap-3 font-mono text-[14px] tracking-[0.04em] text-ink"
          >
            <span className="relative">
              Lorem ipsum dolor
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
const MARQUEE_WORDS = ["LOREM", "IPSUM", "DOLOR", "SIT AMET", "CONSECTETUR", "ADIPISCING", "ELIT"];

/**
 * Sequência expandida do marquee, computada UMA vez no carregamento do módulo
 * (não a cada render de cada grupo). A lista é repetida 2× para que um único
 * grupo fique mais largo que viewports comuns; como a faixa usa dois grupos
 * idênticos e anima `translateX(-50%)`, o grupo 2 cai exatamente onde o grupo 1
 * começou — loop contínuo, sem buraco.
 */
const MARQUEE_SEQ = Array.from({ length: 2 }).flatMap(() => MARQUEE_WORDS);

/** Um "grupo" do marquee — renderiza a sequência pré-computada. */
function MarqueeGroup() {
  const seq = MARQUEE_SEQ;
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
  return (
    <div aria-hidden className="marquee-mask overflow-hidden border-y border-line bg-paper py-7">
      <div className="marquee-track">
        <MarqueeGroup />
        <MarqueeGroup />
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Services — índice editorial, linhas full-width, invert no hover    */
/* ================================================================== */
const SERVICES = [
  {
    title: "Lorem ipsum dolor",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    tags: "Lorem · Ipsum · Dolor",
  },
  {
    title: "Consectetur elit",
    body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    tags: "Amet · Sit · Elit",
  },
  {
    title: "Tempor incididunt",
    body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
    tags: "Magna · Aliqua · Veniam",
  },
  {
    title: "Officia deserunt",
    body: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.",
    tags: "Cloud · Nisi · Anim",
  },
];

export function Services() {
  return (
    <section id="servicos" className="py-28">
      <div className="rail">
        <Reveal className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Kicker>Lorem ipsum</Kicker>
            <h2 className="mt-5 font-mono text-[clamp(34px,5vw,56px)] font-medium leading-[1.02] tracking-[-0.02em] text-ink">
              Lorem ipsum
            </h2>
          </div>
          <p className="max-w-[360px] text-[16px] text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
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
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />

                <div className="relative grid grid-cols-12 items-center gap-4 px-1 py-8 md:py-10">
                  {/* Numeração */}
                  <span className="col-span-2 font-mono text-[13px] text-[#6b6b6b] transition-colors duration-300 group-hover:text-[#888] md:col-span-1">
                    0{i + 1}
                  </span>

                  {/* Título (desliza e inverte de cor sobre a tinta).
                      É um <span>, não <h3>: heading dentro de <a> é HTML
                      inválido e inflaria o nome acessível do link — o título
                      vai no aria-label do <a>. */}
                  <span className="col-span-10 block font-mono text-[clamp(24px,3.4vw,40px)] font-medium tracking-[-0.01em] text-ink transition-all duration-300 group-hover:translate-x-2 group-hover:text-paper md:col-span-5">
                    {s.title}
                  </span>

                  {/* Descrição + tags */}
                  <p className="col-span-9 col-start-3 text-[14px] text-muted-foreground transition-colors duration-300 group-hover:text-[#b3b3b3] md:col-span-4 md:col-start-7">
                    {s.body}
                    <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-[#bbb] transition-colors duration-300 group-hover:text-[#777]">
                      {s.tags}
                    </span>
                  </p>

                  {/* Seta (gira 45° no hover) */}
                  <span className="col-span-12 hidden justify-end md:col-span-1 md:flex">
                    <ArrowUpRight
                      aria-hidden
                      className="h-7 w-7 text-ink transition-all duration-300 group-hover:rotate-45 group-hover:text-paper"
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
/**
 * Estatísticas. Quando `count` existe, o número é animado (CountUp); caso
 * contrário usa-se o texto fixo `n` (ex.: símbolos "01", "∞").
 */
const STATS: { n?: string; count?: number; suffix?: string; l: string }[] = [
  { n: "01", l: "Lorem" },
  { count: 100, suffix: "%", l: "Ipsum dolor" },
  { n: "∞", l: "Sit amet" },
  { count: 24, suffix: "/7", l: "Consectetur" },
];

export function About() {
  return (
    <section id="sobre" className="on-dark bg-dark py-28 text-paper">
      <div className="rail">
        <Reveal className="mb-16 max-w-[640px]">
          <Kicker dark>Lorem ipsum</Kicker>
          <h2 className="mt-5 font-mono text-[clamp(30px,4.4vw,52px)] font-medium leading-[1.06] tracking-[-0.02em]">
            Lorem ipsum dolor sit,
            <br />
            {/* #6b6b6b: 3.45:1 — passa AA para texto grande sobre #141414 */}
            <span className="text-[#6b6b6b]">amet consectetur.</span>
          </h2>
          <p className="mt-5 max-w-[460px] text-[16px] text-[#aaa]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna.
          </p>
        </Reveal>

        {/* As três luas interativas */}
        <Reveal delay={120}>
          <PartnersEclipse />
        </Reveal>

        {/* Estatísticas inline — separadas por filete, sem caixas.
            <dl> de term/description: cada estatística é um par rótulo (<dt>)
            + valor (<dd>). As classes de grid/filete migram para o <dl> para
            o visual ficar idêntico ao layout anterior. */}
        <Reveal delay={160}>
          <dl className="mt-20 grid grid-cols-2 divide-x divide-[#2a2a2a] border-t border-[#2a2a2a] md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.l} className="px-6 py-8 first:pl-0">
                <dd className="font-mono text-[clamp(36px,5vw,56px)] font-medium leading-none text-white">
                  {s.count !== undefined ? (
                    <CountUp value={s.count} suffix={s.suffix} />
                  ) : (
                    s.n
                  )}
                </dd>
                <dt className="mt-3 font-mono text-[12px] uppercase tracking-[0.18em] text-[#888]">
                  {s.l}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Process — fases da lua: a luz viaja da nova → cheia                */
/* ================================================================== */
const STEPS = [
  { title: "Lorem", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { title: "Ipsum", body: "Sed do eiusmod tempor incididunt ut labore et dolore." },
  { title: "Dolor", body: "Ut enim ad minim veniam, quis nostrud exercitation." },
  { title: "Amet", body: "Duis aute irure dolor in reprehenderit in voluptate velit." },
];

/**
 * Mini-lua de cada etapa. A opacidade cresce a cada passo (0.28 → 0.92),
 * representando o eclipse "se enchendo de luz" ao longo do processo.
 */
function MoonPhase({ step }: { step: number }) {
  const op = 0.28 + (step / (STEPS.length - 1)) * 0.64;
  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9">
      <circle cx="24" cy="24" r="22" fill="none" stroke="#1a1a1a" strokeOpacity="0.18" />
      <circle cx="24" cy="24" r="22" fill="#1a1a1a" style={{ opacity: op }} />
    </svg>
  );
}

export function Process() {
  return (
    <section id="processo" className="py-28">
      <div className="rail">
        <Reveal className="mb-16">
          <Kicker>Dolor sit amet</Kicker>
          <h2 className="mt-5 font-mono text-[clamp(34px,5vw,56px)] font-medium leading-[1.02] tracking-[-0.02em] text-ink">
            Lorem ipsum
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
            Lorem ipsum dolor sit amet?
          </h2>
          <p className="mx-auto mt-5 max-w-[440px] text-[16px] text-[#aaa]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>

          {/* Pill de contato (mailto) + botão copiar — duas rotas, zero atrito */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.35}>
              <a
                href="mailto:lorem@ipsum.co"
                className="group inline-flex items-center gap-3 rounded-full border border-[#3a3a3a] py-3.5 pl-7 pr-3.5 font-mono text-[14px] tracking-[0.04em] text-paper transition-colors duration-300 hover:border-paper"
              >
                lorem@ipsum.co
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </Magnetic>
            <CopyEmail email="lorem@ipsum.co" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Footer                                                             */
/* ================================================================== */
export function SiteFooter() {
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor.
          </p>

          {/* Colunas de links (rótulos placeholder) */}
          <div className="flex flex-wrap gap-x-16 gap-y-8 font-mono text-[13px]">
            <div>
              <p className="mb-3.5 font-medium tracking-[0.04em] text-[#ccc]">LOREM</p>
              {[
                { href: "#sobre", label: "Ipsum" },
                { href: "#servicos", label: "Dolor" },
                { href: "#processo", label: "Amet" },
              ].map((l) => (
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
              <p className="mb-3.5 font-medium tracking-[0.04em] text-[#ccc]">DOLOR</p>
              <a
                href="mailto:lorem@ipsum.co"
                className="mb-2.5 block text-[#888] transition-colors hover:text-white"
              >
                lorem@ipsum.co
              </a>
              <a href="#top" className="mb-2.5 block text-[#888] transition-colors hover:text-white">
                ipsum.co
              </a>
            </div>
          </div>
        </div>

        {/* Linha final: copyright + fase da lua real de hoje + assinatura.
            #8a8a8a no lugar de #666: 12px precisa de 4.5:1 sobre #141414. */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-[#262626] pt-6 font-mono text-[12px] tracking-[0.04em] text-[#8a8a8a]">
          <span>© 2026 luna&amp;co</span>
          <MoonToday />
          <span>LOREM · IPSUM · DOLOR</span>
        </div>
      </div>
    </footer>
  );
}
