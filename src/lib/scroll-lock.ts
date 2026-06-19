/**
 * Ponto único de acesso à instância do Lenis + trava de scroll.
 *
 * Antes, SiteNav e Preloader manipulavam `body.style.overflow` por conta
 * própria — mas o Lenis intercepta o wheel e rola programaticamente, então a
 * trava ficava fora de sincronia com o smooth scroll. Aqui travamos os dois
 * juntos: overflow (fallback nativo) + `lenis.stop()/start()`.
 */
import type Lenis from "lenis";

/** Registrado pelo <SmoothScroll> ao montar; `null` quando inativo. */
export const lenisRef: { current: Lenis | null } = { current: null };

export function lockScroll(locked: boolean) {
  document.body.style.overflow = locked ? "hidden" : "";
  if (locked) lenisRef.current?.stop();
  else lenisRef.current?.start();
}
