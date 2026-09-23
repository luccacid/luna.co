/**
 * Configuração do Tailwind CSS.
 *
 * Só o que a página usa. O tema saiu enxuto de propósito: a paleta completa
 * do shadcn (card/primary/secondary/accent/input/ring), o `darkMode: "class"`
 * "pronto para um toggle" que nunca veio e os raios/sombras sem uso foram
 * removidos — eram tokens que ninguém referenciava.
 *
 * As animações de ENTRADA ficam aqui; as que rodam por valor arbitrário
 * (eclipse, breathe, twinkle, marquee, orbit…) têm keyframes no globals.css.
 */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Camadas de empilhamento nomeadas — substituem z-index arbitrários
      // espalhados pelos componentes (nav/hud < grão < menu mobile < preloader).
      zIndex: {
        nav: "50",
        grain: "60",
        "mobile-menu": "70",
        preloader: "120",
      },
      colors: {
        // Paleta neutra da marca (eclipse por opacidade, não por matiz).
        ink: "#1a1a1a",
        paper: "#fafafa",
        // Superfícies escuras das seções (hero/about/footer/overlays).
        dark: "var(--dark)",
        // Filete claro: 12 usos de `border-line` que, sem esta entrada, o
        // Tailwind não gerava — as divisórias só apareciam por causa da regra
        // global `* { @apply border-border }`.
        line: "var(--line)",
        // Acento "ember" — a cor da lua em eclipse total. Regra de uso:
        // só em estados vivos (seção ativa, seleção, ponto orbital) — <1% da página.
        ember: {
          DEFAULT: "#c2410c", // sobre papel (4.6:1, passa AA)
          bright: "#ea580c", // sobre fundo escuro
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        // Voz técnica/wordmark — mono de sistema (sem Google Fonts, por spec).
        mono: ["var(--font-mono)", "SF Mono", "Consolas", "Courier New", "monospace"],
        sans: ["var(--font-sans)", "Helvetica Neue", "Arial", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        // Espaçamentos canônicos: wordmark e tagline da marca.
        wordmark: "0.18em",
        tagline: "0.4em",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
