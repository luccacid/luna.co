/**
 * Símbolo da marca (o "eclipse") e o lockup símbolo + wordmark.
 *
 * Conceito: três círculos da MESMA cor, com opacidades decrescentes
 * (1 > 2 > 3 → 0.92 / 0.55 / 0.28). A sobreposição cria o eclipse — hierarquia
 * sem mudar de cor. É a peça de identidade reutilizada em toda a página.
 *
 * Componente de servidor (sem estado/efeitos): só desenha SVG.
 */
import { cn } from "@/lib/utils";

/** Tons disponíveis: tinta (sobre fundo claro) ou papel (sobre fundo escuro). */
type Tone = "ink" | "paper";

/** Mapeamento do tom para a cor sólida usada nos círculos. */
const FILL: Record<Tone, string> = {
  ink: "#1a1a1a",
  paper: "#fafafa",
};

/**
 * Desenha o símbolo de três luas.
 *
 * @param tone     Cor base (ink/paper).
 * @param animated Quando `true`, toca o movimento-assinatura: a luz "viaja"
 *                 da lua nova → cheia, escalonada entre os três círculos
 *                 (keyframe `eclipse`, definido no globals.css).
 * @param className Classes extras para dimensionar o SVG via container.
 * @param title    Rótulo acessível (aria-label). String vazia = decorativo
 *                 (aria-hidden) — usado quando o símbolo vive dentro de um
 *                 elemento que já tem rótulo próprio (ex.: LunaWordmark).
 */
export function LunaSymbol({
  tone = "ink",
  animated = false,
  className,
  title = "luna&co",
}: {
  tone?: Tone;
  animated?: boolean;
  className?: string;
  title?: string;
}) {
  const fill = FILL[tone];

  // Classe de animação reaproveitada pelos três círculos (só muda o delay).
  const eclipseAnim = "animate-[eclipse_4.2s_ease-in-out_infinite]";

  return (
    <svg
      viewBox="0 0 220 120"
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={cn("h-full w-auto", className)}
    >
      {/* Lua da frente — mais densa (opacidade 0.92) */}
      <circle
        cx="60"
        cy="60"
        r="55"
        fill={fill}
        opacity="0.92"
        className={animated ? eclipseAnim : ""}
      />
      {/* Lua do meio — opacidade 0.55, atrasada 0.5s para escalonar a luz */}
      <circle
        cx="110"
        cy="60"
        r="55"
        fill={fill}
        opacity="0.55"
        className={animated ? `${eclipseAnim} [animation-delay:0.5s]` : ""}
      />
      {/* Lua do fundo — mais clara (0.28), atrasada 1s */}
      <circle
        cx="160"
        cy="60"
        r="55"
        fill={fill}
        opacity="0.28"
        className={animated ? `${eclipseAnim} [animation-delay:1s]` : ""}
      />
    </svg>
  );
}

/**
 * Wordmark com o eclipse no lugar do "&": "luna ◐◑◒ co".
 *
 * Funde o símbolo e o nome num lockup proprietário — usado nas aplicações
 * grandes (footer; o hero tem variante própria com cascata). Leitores de tela
 * continuam lendo "luna&co" via texto sr-only.
 */
export function LunaWordmark({
  tone = "ink",
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <span className={cn("wordmark inline-flex items-baseline", className)}>
      <span className="sr-only">luna&amp;co</span>
      <span aria-hidden className="inline-flex items-center">
        <span>luna</span>
        {/* O símbolo ocupa o slot do ampersand (~0.55em de altura) */}
        <span className="mx-[0.08em] inline-block h-[0.55em] w-[1.05em]">
          <LunaSymbol tone={tone} title="" />
        </span>
        <span>co</span>
      </span>
    </span>
  );
}

/**
 * Lockup horizontal: símbolo + wordmark "luna&co". Usado na navegação e no
 * rodapé, onde a marca aparece em tamanho reduzido.
 */
export function LunaLockup({
  tone = "ink",
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span className="block h-[18px]">
        <LunaSymbol tone={tone} />
      </span>
      <span className="wordmark text-[17px]">luna&amp;co</span>
    </span>
  );
}
