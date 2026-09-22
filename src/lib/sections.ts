/**
 * Âncoras das seções, na ordem em que aparecem na página.
 *
 * Fonte única: o scrollspy da nav, o HUD de capítulos e o contador do hero
 * derivam daqui — antes cada um tinha a sua própria lista e o total "05"
 * escrito na mão. Os rótulos por idioma ficam em `t.hud`, na mesma ordem.
 */
export const SECTION_IDS = [
  "manifesto",
  "servicos",
  "cases",
  "processo",
  "investimento",
  "sobre",
  "faq",
  "contato",
];

/** Total formatado com dois dígitos ("08") — usado no HUD e no hero. */
export const SECTION_TOTAL = String(SECTION_IDS.length).padStart(2, "0");
