/**
 * Configuração do Next.js — export estático para GitHub Pages.
 *
 * - output: "export" gera HTML estático em ./out.
 * - basePath/assetPrefix: site de projeto servido em /<repo>/.
 * - images.unoptimized: GitHub Pages não roda o otimizador do Next.
 *
 * ponytail: headers() removido — não funciona com output:"export" (os
 * headers de segurança teriam de vir do servidor; GitHub Pages não os
 * configura). Trocar basePath se migrar para domínio próprio.
 */
import type { NextConfig } from "next";

const repo = "luna.co";

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  images: { unoptimized: true },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
