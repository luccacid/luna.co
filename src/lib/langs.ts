/**
 * Idiomas do site e o mapeamento idioma → caminho.
 *
 * Arquivo próprio (sem "use client", sem importar dicionário) porque tanto o
 * roteamento no servidor quanto o seletor no cliente precisam disto — e um
 * import circular entre `dicts/` e `i18n.tsx` seria o preço de juntar.
 */
export const LANGS = ["pt", "en", "es"] as const;
export type Lang = (typeof LANGS)[number];

/** Idioma servido na raiz (sem prefixo) — o indexado como canônico do site. */
export const DEFAULT_LANG: Lang = "pt";

/** Segmento de URL do idioma: "" para o padrão, "/en" e "/es" para os demais. */
export function langPath(lang: Lang) {
  return lang === DEFAULT_LANG ? "" : `/${lang}`;
}

/** Converte o catch-all opcional da rota (`undefined | ["en"]`) em idioma. */
export function toLang(segments?: string[]): Lang {
  const first = segments?.[0];
  return (LANGS as readonly string[]).includes(first ?? "") ? (first as Lang) : DEFAULT_LANG;
}
