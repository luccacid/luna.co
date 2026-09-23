import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`, process.env.NEXT_PUBLIC_SITE_URL ?? "https://lunaco.tech").href;
const read = (file) => readFileSync(new URL(`../out/${file}`, import.meta.url), "utf8");

const html = read("index.html");
assert([root, root.slice(0, -1)].some((url) => html.includes(`rel="canonical" href="${url}"`)), "canonical incorreta");
assert(html.includes(`property="og:image" content="${root}og.png"`), "imagem social incorreta");
assert(read("robots.txt").includes(`Sitemap: ${root}sitemap.xml`), "robots incorreto");
assert(read("sitemap.xml").includes(`<loc>${root}</loc>`), "sitemap incorreto");

console.log(`Export validado: ${root}`);
