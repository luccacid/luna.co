/**
 * Acesso aos dicionários — usado só por código de servidor (layout/página).
 *
 * Os três imports são estáticos, mas nenhum deles chega ao cliente: o layout
 * é server component e serializa apenas o dicionário escolhido.
 */
import type { Lang } from "../langs";
import { pt, type Dict } from "./pt";
import { en } from "./en";
import { es } from "./es";

const DICTS: Record<Lang, Dict> = { pt, en, es };

export function getDict(lang: Lang): Dict {
  return DICTS[lang];
}

export type { Dict };
