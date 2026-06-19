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
  // TODO: trocar pelo domínio definitivo quando houver — necessário para
  // URLs absolutas de OG/Twitter card.
  metadataBase: new URL("https://luna-co.example.com"),
  title: "luna&co — Building Digital Systems",
  description: "luna&co — Building Digital Systems.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "luna&co — Building Digital Systems",
    description: "luna&co — Building Digital Systems.",
    type: "website",
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
