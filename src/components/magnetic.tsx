"use client";

/**
 * <Magnetic> — efeito "magnético": o elemento filho é atraído na direção do
 * ponteiro enquanto o mouse passa por cima, criando uma microinteração premium
 * nos botões circulares.
 *
 * Desligado em telas de toque (pointer grosso) e sob `prefers-reduced-motion`,
 * onde o efeito só atrapalharia.
 */
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Magnetic({
  children,
  strength = 0.4,
  className,
}: {
  children: ReactNode;
  /** Intensidade da atração (0–1). 0.4 = desloca 40% da distância ao centro. */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Habilitado só em mouse fino sem preferência por menos movimento. As media
  // conditions não mudam durante a sessão → avaliamos UMA vez na montagem, em
  // vez de duas chamadas a matchMedia a cada pointermove.
  const enabledRef = useRef(false);

  useEffect(() => {
    enabledRef.current =
      window.matchMedia("(hover: hover)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // A cada movimento, desloca o elemento proporcionalmente à distância entre o
  // ponteiro e o centro do próprio elemento.
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !enabledRef.current) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  // Ao sair, volta suavemente à posição original (a transição faz o easing).
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn(
        "inline-flex transition-transform duration-300 ease-out will-change-transform",
        className
      )}
    >
      {children}
    </span>
  );
}
