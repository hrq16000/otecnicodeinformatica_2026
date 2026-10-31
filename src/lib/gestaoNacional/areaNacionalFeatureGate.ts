/**
 * Flag de isolamento: a modalidade nacional não pode ser habilitada apenas
 * com um build verde. Exige backend validado, migração, política e testes.
 *
 * Separar esta flag da UI evita criar uma rota pública e não altera o
 * programa anual de profissionais já existente.
 */
export const AREA_NACIONAL_INTEGRADA = false as const;

export type ResumoNacionalTitular = {
  comunidade: "pendente" | "confirmada" | "nao_confirmada";
  habilitacao: "pendente" | "validada" | "suspensa";
  termos: "pendente" | "aceitos";
  disponibilidade: "indisponivel" | "ocupado" | "disponivel";
  /** ISO UTC do servidor, ou null quando indisponível. */
  disponibilidadeExpiraEm: string | null;
};

export type SituacaoPainelNacional =
  | "nao_integrado"
  | "aguardando_verificacao"
  | "suspenso"
  | "habilitado_indisponivel"
  | "habilitado_disponivel";

/**
 * Somente apresentação. O cliente jamais usa este resumo para conceder
 * autorização, escolher técnico ou confirmar pagamento.
 */
export function situacaoPainelNacional(
  registro: ResumoNacionalTitular | null,
  backendDisponivel: boolean,
  agora: Date,
): SituacaoPainelNacional {
  if (!backendDisponivel || !AREA_NACIONAL_INTEGRADA) return "nao_integrado";
  if (!(agora instanceof Date) || !Number.isFinite(agora.getTime())) {
    throw new RangeError("Relógio de referência inválido.");
  }
  if (registro === null) return "aguardando_verificacao";
  if (
    registro.habilitacao === "suspensa" ||
    registro.comunidade === "nao_confirmada"
  ) return "suspenso";
  if (
    registro.habilitacao !== "validada" ||
    registro.comunidade !== "confirmada" ||
    registro.termos !== "aceitos"
  ) return "aguardando_verificacao";
  if (registro.disponibilidade === "disponivel") {
    const fim = registro.disponibilidadeExpiraEm;
    if (
      typeof fim === "string" &&
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(fim) &&
      Number.isFinite(Date.parse(fim)) &&
      Date.parse(fim) > agora.getTime()
    ) return "habilitado_disponivel";
  }
  return "habilitado_indisponivel";
}
