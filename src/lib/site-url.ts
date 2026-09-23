/**
 * URLs absolutas do site — o mesmo código serve dois hosts:
 * lunaco.tech (raiz) e GitHub Pages (sob /luna.co), via NEXT_PUBLIC_BASE_PATH.
 */
import { langPath, type Lang } from "./langs";

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const siteRoot = new URL(`${basePath}/`, process.env.NEXT_PUBLIC_SITE_URL ?? "https://lunaco.tech");

/** URL de um arquivo em /public (og.png, favicon.svg…). */
export const assetUrl = (name: string) => new URL(name, siteRoot).toString();

/** URL canônica da página de um idioma: "/" para PT, "/en/" e "/es/" nos demais. */
export const pageUrl = (lang: Lang) => new URL(`.${langPath(lang)}/`, siteRoot).toString();
