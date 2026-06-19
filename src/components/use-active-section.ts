"use client";

/**
 * useActiveSection — devolve o id da seção que ocupa a faixa central da
 * viewport (scrollspy). Usado pela nav (link ativo) e pelo SectionHud.
 *
 * O rootMargin recorta a "janela de ativação" para uma banda entre 35% e 45%
 * da altura da tela — fina o bastante para que duas seções não disputem o
 * estado ativo durante a rolagem.
 */
import { useEffect, useState } from "react";

export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  // String estável: o efeito só reroda se a LISTA mudar, não a identidade do array.
  const key = ids.join(",");

  useEffect(() => {
    const order = key.split(",");
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Nenhuma seção na banda (ex.: usuário voltou ao hero) → null.
        setActive(order.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    for (const id of order) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [key]);

  return active;
}
