/**
 * Layout raiz — vive sob `[[...lang]]` (catch-all opcional) para que o idioma
 * venha da ROTA e não de estado no cliente:
 *
 *   /      → PT (canônico)      /en → EN      /es → ES
 *
 * Como é o único segmento na raiz, este arquivo é o root layout: pode ler
 * `params` e, com isso, emitir `<html lang>`, canonical e hreflang corretos
 * por idioma — coisa que um layout estático não consegue.
 */
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { GeistMono } from "geist/font/mono";
import "../globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Preloader } from "@/components/preloader";
import { LangProvider } from "@/lib/i18n";
import { SkipLink } from "@/components/skip-link";
import { assetUrl, basePath, pageUrl } from "@/lib/site-url";
import { getDict } from "@/lib/dicts";
import { LANGS, toLang } from "@/lib/langs";
import { ANALYTICS_DOMAIN } from "@/lib/contact";

type Params = { lang?: string[] };

/** As três páginas do export estático: raiz (PT), /en e /es. */
export function generateStaticParams(): Params[] {
  return [{ lang: [] }, { lang: ["en"] }, { lang: ["es"] }];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const lang = toLang((await params).lang);
  const t = getDict(lang);
  const url = pageUrl(lang);

  return {
    metadataBase: new URL(url),
    title: t.meta.title,
    description: t.meta.description,
    // basePath não é aplicado a metadata.icons no export estático — prefixo manual.
    // SVG cobre browsers modernos; .ico = fallback legado; apple-touch = iOS.
    icons: {
      icon: [
        { url: `${basePath}/favicon.svg`, type: "image/svg+xml" },
        { url: `${basePath}/favicon.ico`, sizes: "32x32" },
      ],
      apple: `${basePath}/apple-touch-icon.png`,
    },
    alternates: {
      canonical: url,
      // hreflang: diz ao buscador que as três páginas são a mesma, em idiomas
      // diferentes — sem isso elas competem entre si por conteúdo duplicado.
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [getDict(l).htmlLang, pageUrl(l)])),
        "x-default": pageUrl("pt"),
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      type: "website",
      url,
      siteName: "luna&co",
      locale: t.htmlLang,
      images: [{ url: assetUrl("og.png"), width: 1200, height: 630, alt: "luna&co — Building Digital Systems" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: [assetUrl("og.png")],
    },
  };
}

/**
 * Cor da barra do navegador conforme o tema do sistema (claro/escuro),
 * espelhando a paleta papel/escuro da marca.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#141414" },
  ],
};

// Só marca "a intro já rodou nesta aba" antes da hidratação, para quem recarrega
// não ver a cortina piscar. Não trava scroll e não depende de timer.
const introSeenScript = `try{if(sessionStorage.getItem("luna-intro-seen")==="1")document.documentElement.classList.add("intro-seen")}catch{}`;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const lang = toLang((await params).lang);
  const dict = getDict(lang);

  return (
    // GeistMono.variable injeta --font-geist-mono (consumida em globals.css).
    <html lang={dict.htmlLang} className={GeistMono.variable}>
      <body className="font-sans">
        <Script id="intro-seen" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: introSeenScript }} />
        <noscript><style>{".preloader{display:none!important}"}</style></noscript>
        {/* Organization JSON-LD — âncora de entidade/Knowledge Panel. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "luna&co",
              url: pageUrl("pt"),
              logo: assetUrl("favicon.svg"),
              email: "contact@lunaco.tech",
              description: dict.meta.description,
            }),
          }}
        />
        {/* Analytics sem cookie (Plausible). Sem domínio configurado, nada é
            carregado — mas sem isto não há como saber se a página converte. */}
        {ANALYTICS_DOMAIN && (
          <Script
            defer
            data-domain={ANALYTICS_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
        <LangProvider dict={dict}>
          <SkipLink />
          <Preloader />
          <SmoothScroll />
          {/* Grão decorativo: fixo, sem captura de clique (pointer-events: none) */}
          <div className="grain" aria-hidden />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
