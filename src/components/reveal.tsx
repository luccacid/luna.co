"use client";

/**
 * <Reveal> — revela o conteúdo quando ele entra na viewport (scroll-reveal).
 *
 * O conteúdo começa visível para sobreviver sem JavaScript. Quando observado,
 * `.is-visible` aplica a entrada; sob reduced-motion a animação é neutralizada.
 */
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** Atraso (ms) aplicado via transition-delay — usado para escalonar listas. */
  delay?: number;
  /** Tag HTML de saída (permite usar section/li/header sem perder semântica). */
  as?: "div" | "section" | "li" | "header";
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          // Revela só uma vez: depois de visível, paramos de observar.
          observer.disconnect();
        }
      },
      // Dispara com 15% visível e um respiro de -8% na base, para revelar
      // pouco antes de o elemento chegar totalmente à tela.
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // Callback ref tipado como HTMLElement: aceito por todas as tags da
      // união (contravariância de parâmetro) — dispensa @ts-expect-error.
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={cn("reveal", shown && "is-visible", className)}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
