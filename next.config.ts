/**
 * Configuração do Next.js — export estático (./out).
 *
 * - Hostinger (domínio próprio): basePath vazio, sobe ./out em public_html.
 * - GitHub Pages (/luna.co/): CI define NEXT_PUBLIC_BASE_PATH=/luna.co.
 * - images.unoptimized: não há otimizador do Next em host estático.
 *
 * ponytail: headers() continua fora — com output:"export" quem serve headers
 * é o Apache da Hostinger (ver public/.htaccess).
 */
import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  // Cada rota vira <rota>/index.html — resolve em qualquer host estático
  // (Apache da Hostinger incluso), sem depender de clean URLs do servidor.
  trailingSlash: true,
  ...(basePath && { basePath, assetPrefix: `${basePath}/` }),
  images: { unoptimized: true },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
