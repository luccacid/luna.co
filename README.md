# luna&co — Landing

Landing page da **luna&co** (_Building Digital Systems_). Mesmo stack do projeto
Said Care, com a identidade visual da luna&co (`../luna&co`): monocromática,
eclipse por opacidade, wordmark em mono.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS 3.4** com tokens monocromáticos (`src/app/globals.css`)
- **lucide-react** (ícones) · `cn()` com `clsx` + `tailwind-merge`
- Fontes de **sistema** (mono + sans), sem dependência de Google Fonts —
  conforme a especificação da marca.

## Rodar

```powershell
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
```

## Identidade

- **Eclipse** = 3 círculos da mesma cor, opacidades **1 > 2 > 3**
  (`0.92 / 0.55 / 0.28`) — hierarquia sem mudar de cor (spec oficial).
- Tinta `#1a1a1a` · papel `#fafafa` · texto secundário `#666`.
- O símbolo é usado como **sistema de layout**, não só logo: parallax no hero,
  eclipse interativo, fases da lua no processo, indicador de scroll em lua.

## Estrutura

| Arquivo | Papel |
|---|---|
| `src/app/page.tsx` | Composição das seções |
| `src/components/hero.tsx` | Lockup da marca em escala (símbolo + wordmark + slogan) |
| `src/components/eclipse-field.tsx` | Eclipse ambiente com parallax do ponteiro |
| `src/components/partners-eclipse.tsx` | 3 luas interativas (hover acende por opacidade) |
| `src/components/scroll-moon.tsx` | Progresso de leitura em forma de lua (nova → cheia) |
| `src/components/magnetic.tsx` | Wrapper "magnético" p/ microinterações |
| `src/components/sections.tsx` | Statement, Trust (marquee), Serviços, Sobre, Processo, CTA, Footer |
| `src/components/reveal.tsx` | Scroll-reveal via IntersectionObserver |

## Conteúdo

Por requisito, os **únicos textos reais** são o nome **luna&co** e o slogan
**Building Digital Systems**. Todo o resto é _Lorem Ipsum_.

## Animações (jogo de opacidade)

`fade-up` escalonado · wordmark letra-a-letra · `breathe` (luas respiram em
opacidade) · `twinkle` (starfield) · `pulse-dim` (palavras editoriais) ·
`eclipse` (símbolo) · `orbit` (anéis) · `marquee` · botões magnéticos ·
scroll-moon. Tudo respeita `prefers-reduced-motion`.
