import type { MetadataRoute } from "next";
import { pageUrl } from "@/lib/site-url";
import { LANGS } from "@/lib/langs";
import { getDict } from "@/lib/dicts";

export const dynamic = "force-static";

/** Uma entrada por idioma, cada uma apontando para as irmãs via `alternates`. */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(LANGS.map((l) => [getDict(l).htmlLang, pageUrl(l)]));
  return LANGS.map((lang) => ({
    url: pageUrl(lang),
    alternates: { languages },
  }));
}
