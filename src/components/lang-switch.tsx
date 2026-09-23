"use client";

/**
 * <LangSwitch> — PT | EN | ES com a bandeira correspondente.
 *
 * São LINKS, não botões: o idioma é a rota (`/`, `/en`, `/es`), então trocar
 * de idioma é navegar. Ganha de graça o "abrir em nova aba", o botão voltar e
 * um destino que o buscador consegue seguir.
 *
 * `<a>` puro, e não `next/link`: o roteador do cliente tenta buscar segmentos
 * RSC que o export estático não gera (três 404 por página, só de prefetch) e
 * trocar de idioma tem de recarregar o documento para valerem o `<html lang>`
 * e a metadata daquele idioma. Navegação rara, recarga inteira, zero 404.
 *
 * Bandeiras em SVG inline (BR, Reino Unido, Espanha): três arquivos a menos
 * para carregar e nada de emoji, que o Windows não renderiza como bandeira.
 * São decorativas (aria-hidden) — quem anuncia o idioma é o texto do link.
 */
import { LANGS, langPath, type Lang } from "@/lib/langs";
import { basePath } from "@/lib/site-url";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LABEL: Record<Lang, string> = { pt: "PT", en: "EN", es: "ES" };

/** Nome do idioma por extenso, no próprio idioma — vai no aria-label. */
const NAME: Record<Lang, string> = { pt: "Português", en: "English", es: "Español" };

/** Código hreflang de cada idioma — usado no atributo `hrefLang` do link. */
const HREFLANG: Record<Lang, string> = { pt: "pt-BR", en: "en", es: "es" };

function Flag({ lang }: { lang: Lang }) {
  const common = "h-3 w-[18px] shrink-0 rounded-[1px]";
  if (lang === "pt") {
    return (
      <svg viewBox="0 0 28 20" className={common} aria-hidden>
        <rect width="28" height="20" fill="#009b3a" />
        <path d="M14 2 26 10 14 18 2 10Z" fill="#fedf00" />
        <circle cx="14" cy="10" r="4.4" fill="#002776" />
      </svg>
    );
  }
  if (lang === "en") {
    return (
      <svg viewBox="0 0 28 20" className={common} aria-hidden>
        <rect width="28" height="20" fill="#012169" />
        <path d="M0 0 28 20M28 0 0 20" stroke="#fff" strokeWidth="4" />
        <path d="M0 0 28 20M28 0 0 20" stroke="#c8102e" strokeWidth="2" />
        <path d="M14 0v20M0 10h28" stroke="#fff" strokeWidth="6.5" />
        <path d="M14 0v20M0 10h28" stroke="#c8102e" strokeWidth="4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 28 20" className={common} aria-hidden>
      <rect width="28" height="20" fill="#aa151b" />
      <rect y="5" width="28" height="10" fill="#f1bf00" />
    </svg>
  );
}

/** `tone` = cor do texto/moldura no contexto em que o grupo aparece. */
export function LangSwitch({
  tone = "ink",
  className,
}: {
  tone?: "ink" | "paper";
  className?: string;
}) {
  const t = useT();
  const dark = tone === "paper";

  return (
    <nav
      aria-label={t.nav.language}
      className={cn(
        "inline-flex items-center rounded-full border p-0.5 font-mono text-[12px] tracking-[0.08em]",
        dark ? "border-paper/20 text-paper" : "border-ink/15 text-ink",
        className,
      )}
    >
      {LANGS.map((l) => {
        const isCurrent = l === t.lang;
        return (
          <a
            key={l}
            // basePath na mão: sem next/link, ninguém prefixa por nós.
            href={`${basePath}${langPath(l)}/`}
            hrefLang={HREFLANG[l]}
            aria-label={NAME[l]}
            aria-current={isCurrent ? "true" : undefined}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-colors duration-200",
              isCurrent
                ? dark
                  ? "bg-paper text-ink"
                  : "bg-ink text-paper"
                : "opacity-55 hover:opacity-100",
            )}
          >
            <Flag lang={l} />
            {LABEL[l]}
          </a>
        );
      })}
    </nav>
  );
}
