"use client";

/**
 * <MoonToday> — a fase da lua REAL de hoje, calculada no cliente.
 * A marca "viva", sincronizada com o céu. Vive na linha final do footer.
 */
import { useEffect, useState } from "react";

/** Fase lunar 0..1 (0 = nova, 0.5 = cheia). Ciclo sinódico ≈ 29,53 dias. */
function moonPhase(date = new Date()) {
  const synodic = 29.530588853;
  const ref = Date.UTC(2000, 0, 6, 18, 14); // lua nova de referência
  const days = (date.getTime() - ref) / 86400000;
  return (((days % synodic) + synodic) % synodic) / synodic;
}

export function MoonToday() {
  // Calculado só no cliente (useEffect) para não divergir do HTML do servidor.
  const [phase, setPhase] = useState<number | null>(null);
  useEffect(() => setPhase(moonPhase()), []);

  // Antes da hidratação (SSR/primeiro paint) renderizamos um placeholder
  // invisível com a MESMA estrutura/dimensões — assim a linha do footer não
  // sofre reflow (CLS) quando a fase real entra. `&nbsp;` reserva a altura.
  if (phase === null) {
    return (
      <span
        aria-hidden
        className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8a8a8a] opacity-0"
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
          <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeOpacity="0.3" />
        </svg>
        {" "}
      </span>
    );
  }
  // Fração iluminada: 0 na lua nova, 1 na cheia.
  const lit = (1 - Math.cos(phase * 2 * Math.PI)) / 2;

  return (
    <span className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8a8a8a]">
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
        <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeOpacity="0.3" />
        {/* Fiel à identidade: a fase é representada por OPACIDADE, não por recorte */}
        <circle cx="8" cy="8" r="7" fill="currentColor" style={{ opacity: 0.15 + lit * 0.85 }} />
      </svg>
      lua {Math.round(lit * 100)}% iluminada
    </span>
  );
}
