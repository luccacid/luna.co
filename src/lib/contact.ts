/**
 * Canais de contato — o que estava faltando: o site não tinha nenhuma forma
 * de captura além de um `mailto:`, e nenhuma medição.
 *
 * Os três canais abaixo são ligados por variável de ambiente (ver
 * `.env.example`). Enquanto a variável não existir, o componente simplesmente
 * não é renderizado — nada de botão de WhatsApp com número inventado nem de
 * formulário que engole o envio em silêncio.
 *
 * As leituras usam `process.env.NEXT_PUBLIC_*` por extenso porque é assim que
 * o Next substitui o valor no build (com `output: "export"` não há runtime).
 */
export const EMAIL = "contact@lunaco.tech";

/** Número com DDI e sem símbolos, ex.: "5511999999999". */
export const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "";

/** Endpoint que recebe o POST do formulário (Formspree, Web3Forms…). */
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

/** Domínio registrado no Plausible — vazio desliga o script de analytics. */
export const ANALYTICS_DOMAIN = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN ?? "";

export const whatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
