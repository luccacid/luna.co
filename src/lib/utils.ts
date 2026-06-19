/**
 * Utilitários compartilhados.
 *
 * Mantemos este arquivo enxuto de propósito: ele só expõe o `cn`, usado em
 * praticamente todos os componentes para compor classes do Tailwind.
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Une classes condicionais (`clsx`) e resolve conflitos do Tailwind
 * (`tailwind-merge`) — ex.: `cn("px-2", isLarge && "px-4")` resulta em `px-4`,
 * sem as duas classes brigando. É o padrão recomendado pelo shadcn/ui.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
