/**
 * Configuração do Tailwind CSS.
 *
 * Estende o tema com a paleta monocromática da luna&co, as famílias de fonte
 * (mono/sans de sistema), os raios/sombras e — importante — as animações de
 * ENTRADA (fade-up, scale-in, drift). As animações que rodam via valor
 * arbitrário (eclipse, breathe, twinkle, marquee, orbit, etc.) têm seus
 * keyframes declarados no globals.css.
 */
import type { Config } from "tailwindcss";

const config: Config = {
  // Tema claro/escuro por classe (não usado hoje, mas pronto para um toggle).
  darkMode: ["class"],
  // Onde o Tailwind procura classes para gerar o CSS final.
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta neutra da marca (eclipse por opacidade, não por matiz).
        ink: "#1a1a1a",
        paper: "#fafafa",
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
        // Sistema de superfícies dirigido por variáveis CSS (globals.css).
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        // Voz técnica/wordmark — mono de sistema (sem Google Fonts, por spec).
        mono: ["var(--font-mono)", "SF Mono", "Consolas", "Courier New", "monospace"],
        sans: ["var(--font-sans)", "Helvetica Neue", "Arial", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        soft: "0 1px 2px -1px rgb(0 0 0 / 0.06), 0 2px 6px -2px rgb(0 0 0 / 0.08)",
        "soft-lg": "0 24px 60px -34px rgb(0 0 0 / 0.35)",
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
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        // Movimento-assinatura: a luz viaja da lua nova → cheia.
        eclipse: {
          "0%": { opacity: "0.28" },
          "50%": { opacity: "0.92" },
          "100%": { opacity: "0.28" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "scale-in": "scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both",
        drift: "drift 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
