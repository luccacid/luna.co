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
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Preloader } from "@/components/preloader";
import { LangProvider } from "@/lib/i18n";
import { SkipLink } from "@/components/skip-link";

/**
 * Metadados da página. Por requisito do projeto, os únicos textos reais são o
 * nome "luna&co" e o slogan "Building Digital Systems".
 */
/**
 * Origem canônica do site. Domínio próprio (Hostinger) por padrão; o CI do
 * GitHub Pages sobrescreve via env para manter OG/canonical corretos lá.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lunaco.tech";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "luna&co — Building Digital Systems",
  description:
    "luna&co — a digital systems studio. Building Digital Systems.",
  // basePath não é aplicado a metadata.icons no export estático — prefixo manual.
  // SVG cobre browsers modernos; .ico = fallback legado; apple-touch = iOS.
  icons: {
    icon: [
      { url: `${BASE_PATH}/favicon.svg`, type: "image/svg+xml" },
      { url: `${BASE_PATH}/favicon.ico`, sizes: "32x32" },
    ],
    apple: `${BASE_PATH}/apple-touch-icon.png`,
  },
  alternates: { canonical: "/" },
  openGraph: {
    title: "luna&co — Building Digital Systems",
    description: "luna&co — Building Digital Systems.",
    type: "website",
    url: "/",
    siteName: "luna&co",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "luna&co — Building Digital Systems" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "luna&co — Building Digital Systems",
    description: "luna&co — Building Digital Systems.",
    images: ["/og.png"],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // `lang="pt-BR"` para acessibilidade/leitores de tela.
    // GeistMono.variable injeta --font-geist-mono (consumida em globals.css).
    <html lang="pt-BR" className={GeistMono.variable}>
      <body className="font-sans">
        {/* Organization JSON-LD — âncora de entidade/Knowledge Panel. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "luna&co",
              url: `${SITE_URL}/`,
              logo: `${SITE_URL}${BASE_PATH}/favicon.svg`,
              description: "Building Digital Systems",
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
