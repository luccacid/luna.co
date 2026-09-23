/**
 * Verifica o export estático antes do deploy.
 *
 * O bug que este script existe para pegar: basePath. O site sobe em dois
 * hosts (lunaco.tech na raiz, GitHub Pages sob /luna.co) e é fácil publicar
 * com canonical, OG ou sitemap apontando para o host errado — sem nenhum erro
 * de build. Agora também confere que as três páginas de idioma saíram.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL(
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`,
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lunaco.tech",
).href;

const read = (file) => readFileSync(new URL(`../out/${file}`, import.meta.url), "utf8");

const PAGES = [
  { file: "index.html", url: root, lang: "pt-BR" },
  { file: "en/index.html", url: `${root}en/`, lang: "en" },
  { file: "es/index.html", url: `${root}es/`, lang: "es" },
];

for (const { file, url, lang } of PAGES) {
  const html = read(file);
  // O Next emite o atributo como `hrefLang`; em HTML o nome é case-insensitive,
  // então comparamos em minúsculas em vez de depender da grafia do framework.
  const lower = html.toLowerCase();
  assert(html.includes(`<html lang="${lang}"`), `${file}: <html lang> incorreto`);
  assert(html.includes(`rel="canonical" href="${url}"`), `${file}: canonical incorreta`);
  assert(html.includes(`property="og:image" content="${root}og.png"`), `${file}: imagem social incorreta`);
  // hreflang: cada página aponta para as três versões + x-default.
  for (const other of PAGES) {
    assert(
      lower.includes(`hreflang="${other.lang.toLowerCase()}" href="${other.url.toLowerCase()}"`),
      `${file}: falta hreflang para ${other.lang}`,
    );
  }
  assert(lower.includes(`hreflang="x-default" href="${root.toLowerCase()}"`), `${file}: falta x-default`);
}

// A copy de cada idioma tem de estar no HTML — é isso que torna /en e /es
// indexáveis. Se voltar a ser trocada no cliente, estas linhas falham.
assert(read("index.html").includes("Quanto tempo leva um projeto?"), "PT não pré-renderizado");
assert(read("en/index.html").includes("How long does a project take?"), "EN não pré-renderizado");
assert(read("es/index.html").includes("¿Cuánto tarda un proyecto?"), "ES não pré-renderizado");

assert(read("robots.txt").includes(`Sitemap: ${root}sitemap.xml`), "robots incorreto");
for (const { url } of PAGES) {
  assert(read("sitemap.xml").includes(`<loc>${url}</loc>`), `sitemap sem ${url}`);
}

console.log(`Export validado: ${PAGES.length} idiomas em ${root}`);
