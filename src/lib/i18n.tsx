"use client";

/**
 * Acesso ao dicionário no cliente.
 *
 * O idioma agora é a ROTA (`/`, `/en`, `/es`), não um estado: o layout de
 * servidor escolhe o dicionário e o entrega por contexto. Isso troca o store
 * com localStorage + detecção de navegador por três HTMLs pré-renderizados —
 * cada um indexável, cada um carregando só a sua própria copy.
 */
import { createContext, useContext } from "react";
import type { Dict } from "./dicts/pt";

const DictContext = createContext<Dict | null>(null);

export function LangProvider({ dict, children }: { dict: Dict; children: React.ReactNode }) {
  return <DictContext.Provider value={dict}>{children}</DictContext.Provider>;
}

/** Dicionário do idioma da rota atual. */
export function useT(): Dict {
  const dict = useContext(DictContext);
  if (!dict) throw new Error("useT() fora do <LangProvider>");
  return dict;
}
