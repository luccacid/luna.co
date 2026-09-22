"use client";

/**
 * <SkipLink> — atalho de teclado que pula a navegação e vai direto ao
 * conteúdo. Só aparece quando recebe foco. Cliente porque o rótulo vem do
 * dicionário de idioma.
 */
import { useT } from "@/lib/i18n";

export function SkipLink() {
  return (
    <a
      href="#manifesto"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-[13px] focus:text-paper"
    >
      {useT().nav.skip}
    </a>
  );
}
