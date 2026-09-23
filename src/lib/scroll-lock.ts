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

/** Cada dono libera apenas a própria trava. */
const locks = new Set<"preloader" | "menu">();

export function syncScrollLock() {
  const isLocked = locks.size > 0;
  document.body.style.overflow = isLocked ? "hidden" : "";
  if (isLocked) lenisRef.current?.stop();
  else lenisRef.current?.start();
}

export function lockScroll(owner: "preloader" | "menu", locked: boolean) {
  if (locked) locks.add(owner);
  else locks.delete(owner);
  syncScrollLock();
}
