/**
 * Torna tudo que não é o overlay `inert` (fora da ordem de tabulação e do
 * alcance do leitor de tela) e devolve a função que restaura o estado anterior.
 *
 * Usado pelo Preloader e pelo menu mobile — os dois únicos overlays modais do
 * site. Antes cada um tinha a sua cópia deste mesmo bloco.
 */
export function makeSiblingsInert(overlay: Element | null) {
  if (!overlay) return () => {};
  const saved = Array.from(document.body.children)
    .filter((el) => el !== overlay && !el.contains(overlay))
    .map((el) => ({ el: el as HTMLElement, inert: (el as HTMLElement).inert }));

  saved.forEach(({ el }) => {
    el.inert = true;
  });

  return () => {
    saved.forEach(({ el, inert }) => {
      el.inert = inert;
    });
  };
}
