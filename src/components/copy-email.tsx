"use client";

/**
 * <CopyEmail> — botão "copiar e-mail" com confirmação visual e anunciada
 * (aria-live). Complementa o mailto do CTA: quem não tem cliente de e-mail
 * configurado copia o endereço em um clique, sem atrito.
 */
import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Evita setState após unmount se o usuário navegar com o timer no ar.
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard indisponível (permissão/contexto): cai no mailto.
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-[#3a3a3a] px-5 py-3 font-mono text-[13px] tracking-[0.04em] text-[#aaa] transition-colors duration-300 hover:border-paper hover:text-paper"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copiado" : "Copiar e-mail"}
      {/* Anúncio para leitores de tela, fora do fluxo visual */}
      <span aria-live="polite" className="sr-only">
        {copied ? "E-mail copiado para a área de transferência" : ""}
      </span>
    </button>
  );
}
