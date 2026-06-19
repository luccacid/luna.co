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

/**
 * Contador de travas ativas. Reference-counted porque dois donos (Preloader e
 * SiteNav) podem travar ao mesmo tempo — com um booleano, o primeiro a soltar
 * destravaria a página enquanto o outro ainda precisava dela travada. O scroll
 * fica preso enquanto o contador > 0.
 */
let lockCount = 0;

export function lockScroll(locked: boolean) {
  lockCount = Math.max(0, lockCount + (locked ? 1 : -1));
  const isLocked = lockCount > 0;
  document.body.style.overflow = isLocked ? "hidden" : "";
  if (isLocked) lenisRef.current?.stop();
  else lenisRef.current?.start();
}
