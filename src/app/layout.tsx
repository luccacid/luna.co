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
import { MoonCursor } from "@/components/moon-cursor";

/**
 * Metadados da página. Por requisito do projeto, os únicos textos reais são o
 * nome "luna&co" e o slogan "Building Digital Systems".
 */
export const metadata: Metadata = {
  // Origem real do deploy (GitHub Pages). basePath /luna.co é aplicado pelo
  // Next ao montar URLs absolutas de OG/canonical. Trocar por domínio próprio
  // quando houver.
  metadataBase: new URL("https://luccacid.github.io/luna.co"),
  title: "luna&co — Building Digital Systems",
  description:
    "luna&co — a digital systems studio. Building Digital Systems.",
  // basePath não é aplicado a metadata.icons no export estático — prefixo
  // manual p/ não dar 404 em /luna.co. ponytail: remover o /luna.co ao migrar
  // para domínio próprio. SVG cobre browsers modernos; .ico = fallback legado;
  // apple-touch = ícone de home screen no iOS.
  icons: {
    icon: [
      { url: "/luna.co/favicon.svg", type: "image/svg+xml" },
      { url: "/luna.co/favicon.ico", sizes: "32x32" },
    ],
    apple: "/luna.co/apple-touch-icon.png",
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
              url: "https://luccacid.github.io/luna.co/",
              logo: "https://luccacid.github.io/luna.co/favicon.svg",
              description: "Building Digital Systems",
            }),
          }}
        />
        {/* Atalho de teclado: pula a nav direto para o conteúdo */}
        <a
          href="#manifesto"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-[13px] focus:text-paper"
        >
          Pular para o conteúdo
        </a>
        <Preloader />
        <SmoothScroll />
        <MoonCursor />
        {/* Grão decorativo: fixo, sem captura de clique (pointer-events: none) */}
        <div className="grain" aria-hidden />
        {children}
      </body>
    </html>
  );
}
