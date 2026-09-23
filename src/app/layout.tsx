/**
 * Layout raiz da aplicação (App Router do Next.js).
 *
 * Define `<html>`/`<body>`, os metadados de SEO/compartilhamento e injeta o
 * "chrome" global que precisa existir em qualquer página:
 *   - Preloader   → intro de eclipse na primeira carga
 *   - SmoothScroll → rolagem com inércia (Lenis)
 *   - .grain       → camada de grão (ruído) sobre tudo, para textura
 */
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Preloader } from "@/components/preloader";
import { LangProvider } from "@/lib/i18n";
import { SkipLink } from "@/components/skip-link";
import { assetUrl, basePath, siteRoot } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: siteRoot,
  title: "luna&co — Sistemas sob medida para operações",
  description:
    "Sistemas internos, dados e automação para operações que cresceram além da planilha. Escopo e prazo definidos, código no repositório do cliente.",
  // basePath não é aplicado a metadata.icons no export estático — prefixo manual.
  // SVG cobre browsers modernos; .ico = fallback legado; apple-touch = iOS.
  icons: {
    icon: [
      { url: `${basePath}/favicon.svg`, type: "image/svg+xml" },
      { url: `${basePath}/favicon.ico`, sizes: "32x32" },
    ],
    apple: `${basePath}/apple-touch-icon.png`,
  },
  alternates: { canonical: siteRoot.href },
  openGraph: {
    title: "luna&co — Sistemas sob medida para operações",
    description: "Sistemas internos, dados e automação para operações que cresceram além da planilha.",
    type: "website",
    url: siteRoot.href,
    siteName: "luna&co",
    images: [
      { url: assetUrl("og.png"), width: 1200, height: 630, alt: "luna&co — Building Digital Systems" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "luna&co — Sistemas sob medida para operações",
    description: "Sistemas internos, dados e automação para operações que cresceram além da planilha.",
    images: [assetUrl("og.png")],
  },
};

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

// Trava o scroll antes da hidratação e oculta a intro já vista na mesma aba.
const introLockScript = `(() => {
  let seen = false;
  try { seen = sessionStorage.getItem("luna-intro-seen") === "1"; } catch {}
  if (seen) {
    document.documentElement.classList.add("intro-seen");
  } else {
    document.documentElement.dataset.introStarted = String(performance.now());
    document.documentElement.classList.add("intro-pending");
    setTimeout(() => document.documentElement.classList.remove("intro-pending"),
      matchMedia("(prefers-reduced-motion: reduce)").matches ? 100 : 1700);
  }
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // `lang="pt-BR"` para acessibilidade/leitores de tela.
    // GeistMono.variable injeta --font-geist-mono (consumida em globals.css).
    <html lang="pt-BR" className={GeistMono.variable} suppressHydrationWarning>
      <body className="font-sans">
        <Script id="intro-lock" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: introLockScript }} />
        <noscript><style>{".preloader{display:none!important}"}</style></noscript>
        {/* Organization JSON-LD — âncora de entidade/Knowledge Panel. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "luna&co",
              url: siteRoot.href,
              logo: assetUrl("favicon.svg"),
              description: "Sistemas sob medida para operações que cresceram além da planilha.",
            }),
          }}
        />
        <LangProvider>
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
