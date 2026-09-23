"use client";

/**
 * <ContactForm> — captura de lead no site estático.
 *
 * Só existe se `NEXT_PUBLIC_FORM_ENDPOINT` estiver configurado: um formulário
 * que posta para lugar nenhum é pior que nenhum formulário — falha em silêncio
 * e some com o lead.
 *
 * A validação é a nativa do browser (`required`, `type="email"`): sem
 * biblioteca de formulário para quatro campos. O campo `website` é honeypot —
 * invisível para gente, irresistível para robô.
 */
import { useState } from "react";
import { useT } from "@/lib/i18n";
import { FORM_ENDPOINT } from "@/lib/contact";

type State = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const t = useT();
  const [state, setState] = useState<State>("idle");

  if (!FORM_ENDPOINT) return null;

  const f = t.cta.form;
  const field =
    "w-full rounded-[10px] border border-[#3a3a3a] bg-transparent px-4 py-3 font-sans text-[15px] text-paper placeholder:text-[#777] focus:border-paper focus:outline-none";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data.website) return; // honeypot preenchido: robô, descarta em silêncio

    setState("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("ok");
      form.reset();
    } catch {
      // Falhou: o e-mail e o WhatsApp continuam acima como saída.
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-16 max-w-[560px] text-left">
      <p className="mb-6 text-center font-mono text-[13px] uppercase tracking-[0.18em] text-[#8a8a8a]">
        {f.title}
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">{f.name}</span>
          <input name="name" required autoComplete="name" placeholder={f.name} className={field} />
        </label>
        <label className="block">
          <span className="sr-only">{f.company}</span>
          <input name="company" autoComplete="organization" placeholder={f.company} className={field} />
        </label>
      </div>

      <label className="mt-3 block">
        <span className="sr-only">{f.email}</span>
        <input name="email" type="email" required autoComplete="email" placeholder={f.email} className={field} />
      </label>

      <label className="mt-3 block">
        <span className="sr-only">{f.message}</span>
        <textarea name="message" required rows={4} placeholder={f.message} className={`${field} resize-y`} />
      </label>

      {/* Honeypot: fora da tela e fora da ordem de tabulação. */}
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-px w-px opacity-0"
      />

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-4 w-full rounded-full bg-paper py-3.5 font-mono text-[14px] font-medium tracking-[0.04em] text-ink transition-opacity duration-200 hover:opacity-90 disabled:opacity-60"
      >
        {state === "sending" ? f.sending : f.submit}
      </button>

      {/* Resultado anunciado por leitor de tela e visível para todo mundo. */}
      <p
        aria-live="polite"
        className={`mt-3 min-h-[1.5em] text-center font-mono text-[13px] ${
          state === "error" ? "text-ember-bright" : "text-[#aaa]"
        }`}
      >
        {state === "ok" ? f.ok : state === "error" ? f.error : ""}
      </p>
    </form>
  );
}
