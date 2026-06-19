/**
 * Configuração do PostCSS.
 *
 * Pipeline padrão do Tailwind: o plugin `tailwindcss` gera os utilitários e o
 * `autoprefixer` adiciona os prefixos de fornecedor (-webkit-, etc.).
 */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
