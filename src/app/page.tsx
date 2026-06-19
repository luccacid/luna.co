/**
 * Página inicial (rota `/`).
 *
 * Apenas compõe, na ordem de leitura, as seções definidas em `components`.
 * Toda a lógica/estilo mora nos componentes filhos — aqui ficamos só com a
 * "tabela de conteúdo" da landing, fácil de ler e reordenar.
 *
 * Ordem narrativa — a página é um ciclo lunar:
 *   noite (Hero) → dia (Statement → TrustBar → Services → Process, tudo em
 *   papel) → eclipse de volta à noite (About → FinalCta → Footer, escuros).
 *   O mergulho no escuro acontece UMA vez, com mais drama; as mini-luas do
 *   Process (que enchem de luz a cada passo) são o prenúncio da transição.
 */
import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { ScrollMoon } from "@/components/scroll-moon";
import { SectionHud } from "@/components/section-hud";
import {
  Statement,
  TrustBar,
  Services,
  About,
  Process,
  FinalCta,
  SiteFooter,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      {/* Navegação fixa + HUD de capítulos (esq.) + progresso de leitura (dir.) */}
      <SiteNav />
      <SectionHud />
      <ScrollMoon />

      <main>
        <Hero />
        <Statement />
        <TrustBar />
        <Services />
        <Process />
        <About />
        <FinalCta />
      </main>

      <SiteFooter />
    </>
  );
}
