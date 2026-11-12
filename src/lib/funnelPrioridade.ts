export type Prioridade = "alta" | "media" | "baixa" | "sem prioridade";

/** Lê a prioridade gravada pela análise automática na mensagem do chamado. */
export function prioridadeDe(waMessage: string | null | undefined): Prioridade {
  const m = /\[Urg[êe]ncia\]\s*(alta|media|média|baixa)/i.exec(waMessage ?? "");
  if (!m) return "sem prioridade";
  const v = m[1].toLowerCase();
  return v === "média" ? "media" : (v as Prioridade);
}

/** Texto que o visitante escreveu na caixa de problema, se houver. */
export function descricaoDe(waMessage: string | null | undefined): string {
  const m = /\[Descrição do visitante\]\n([\s\S]*?)(\n\n\[|$)/.exec(waMessage ?? "");
  return m ? m[1].trim() : "";
}
