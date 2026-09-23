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
| `src/app/[[...lang]]/page.tsx` | Composição das seções |
| `src/app/[[...lang]]/layout.tsx` | Root layout: `<html lang>`, metadata e hreflang por idioma |
| `src/lib/dicts/{pt,en,es}.ts` | Copy de cada idioma (só o do idioma pedido vai para o cliente) |
| `src/components/contact-form.tsx` | Formulário de contato (ligado por env) |
| `src/components/hero.tsx` | Lockup da marca em escala (símbolo + wordmark + slogan) |
| `src/components/eclipse-field.tsx` | Eclipse ambiente com parallax do ponteiro |
| `src/components/partners-eclipse.tsx` | 3 luas interativas (hover acende por opacidade) |
| `src/components/scroll-moon.tsx` | Progresso de leitura em forma de lua (nova → cheia) |
| `src/components/magnetic.tsx` | Wrapper "magnético" p/ microinterações |
| `src/components/sections.tsx` | Statement, Trust (marquee), Serviços, Sobre, Processo, CTA, Footer |
| `src/components/reveal.tsx` | Scroll-reveal via IntersectionObserver |

## Conteúdo e idiomas

O idioma é a **rota**, não estado no cliente:

| URL | Idioma | Arquivo gerado |
|---|---|---|
| `/` | PT (canônico) | `out/index.html` |
| `/en/` | EN | `out/en/index.html` |
| `/es/` | ES | `out/es/index.html` |

A rota `[[...lang]]` (catch-all opcional) é o root layout, então cada página sai
com o seu próprio `<html lang>`, canonical, `hreflang` e OG. A copy fica em
`src/lib/dicts/{pt,en,es}.ts` — módulos de servidor: **só o dicionário do idioma
pedido** é serializado, os outros dois nunca entram no bundle do cliente. Os
componentes continuam lendo por `useT()`, agora via contexto.

O seletor PT | EN | ES são **links** (`next/link`), não botões.

## Variáveis de ambiente

Copie `.env.example` para `.env.local`. Cada recurso fica **invisível** enquanto
a variável estiver vazia — nada de botão com número falso ou formulário que
engole o envio.

| Variável | Liga |
|---|---|
| `NEXT_PUBLIC_WHATSAPP` | Botão de WhatsApp no CTA e no rodapé (número com DDI, só dígitos) |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Formulário de contato (Formspree, Web3Forms…) |
| `NEXT_PUBLIC_ANALYTICS_DOMAIN` | Script do Plausible (sem cookie) |
| `NEXT_PUBLIC_BASE_PATH` / `NEXT_PUBLIC_SITE_URL` | Host de destino do build (definidos pelo CI) |

No GitHub, configure os três primeiros como **repository variables** para o CI.

## Verificação

```powershell
npm run lint
npm run build
npm run check:export   # canonical, OG, hreflang, sitemap e copy dos 3 idiomas
```

`check:export` é o teste que segura o bug real deste projeto: o mesmo código sobe
em dois hosts (raiz e `/luna.co`) e é fácil publicar com canonical, imagem social
ou sitemap apontando para o host errado — sem nenhum erro de build.

## Deploy

- **Hostinger (lunaco.tech)**: o job `hostinger` do workflow faz lint → build →
  `check:export` → FTP para `public_html`. Fica desligado até existir a variável
  `DEPLOY_HOSTINGER=true` e os segredos `FTP_SERVER`, `FTP_USERNAME` e
  `FTP_PASSWORD`. Enquanto isso, o caminho manual continua: `npm run build` e
  suba o conteúdo de `out/`. O `.htaccess` (de `public/`) cuida de 404, cache,
  gzip, headers de segurança e redirect HTTPS/sem-www.
- **GitHub Pages**: o workflow define `NEXT_PUBLIC_BASE_PATH=/luna.co` e
  `NEXT_PUBLIC_SITE_URL`; sem essas variáveis o build sai pronto para a raiz
  do domínio próprio. Canonical, imagem social, robots e sitemap acompanham
  o destino de cada build.

## Animações (jogo de opacidade)

`fade-up` escalonado · wordmark letra-a-letra · `breathe` (luas respiram em
opacidade) · `twinkle` (starfield) · `pulse-dim` (palavras editoriais) ·
`eclipse` (símbolo) · `orbit` (anéis) · `marquee` · botões magnéticos ·
scroll-moon. Tudo respeita `prefers-reduced-motion`.
