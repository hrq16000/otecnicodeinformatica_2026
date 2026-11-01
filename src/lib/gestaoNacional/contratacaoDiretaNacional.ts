/**
 * Rodada 4 — regras puras da contratação direta nacional (NÃO publicadas).
 *
 * Não cria usuários, autenticação, pagamento, contrato, serviço nem webhook.
 * A solicitação e o aceite são diretamente entre cliente e técnico.
 * A plataforma apenas provê regras tecnológicas; a qualificação jurídica
 * depende da contratação, do recebimento do dinheiro e da prática real.
 *
 * Controle de 3 solicitações/dia exige backend com identidade autenticada,
 * data civil de referência, transação atômica e chave de idempotência.
 * Esta avaliação puramente em memória NÃO é proteção contra concorrência.
 */
export const LIMITE_SOLICITACOES_DIARIO_NACIONAL = 3 as const;
export const CONTRATACAO_NACIONAL_ATIVA = false as const;

export type EstadoContratacaoNacional =
  | "rascunho"
  | "cotacao_aceita"
  | "aguardando_pagamento"
  | "pagamento_confirmado"
  | "aceito_diretamente_pelo_tecnico"
  | "em_execucao"
  | "concluido"
  | "cancelado"
  | "reembolsado";

export interface SolicitacaoNacionalRegistrada {
  /** Identificador opaco, diferente de email/telefone/documento. */
  solicitacaoId: string;
  /** Identidade estável validada pelo servidor; nunca fornecida pelo frontend. */
  clienteId: string;
  /** Data civil calculada pela política de fuso do servidor (YYYY-MM-DD). */
  dataCivil: string;
  /** ID estável e catalogado de serviço; não é descrição livre do cliente. */
  servicoId: string;
}

export interface PedidoSolicitacaoNacional {
  clienteId: string;
  dataCivil: string;
  servicoId: string;
  /** Impede contagem dupla de retry autenticado. */
  solicitacaoId: string;
}

export type ResultadoLimiteNacional =
  | { permitido: true; motivo: "nova_solicitacao" | "repeticao_idempotente"; totalNoDia: number }
  | { permitido: false; motivo: "limite_diario" | "servico_repetido" | "id_em_conflito"; totalNoDia: number };

function campoValido(valor: unknown): valor is string {
  return typeof valor === "string" && valor.trim().length > 0 && valor.length <= 256;
}

export function dataCivilValida(valor: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) return false;
  const [ano, mes, dia] = valor.split("-").map(Number);
  if (ano < 2000 || ano > 2100) return false;
  const data = new Date(Date.UTC(ano, mes - 1, dia));
  return data.getUTCFullYear() === ano && data.getUTCMonth() + 1 === mes && data.getUTCDate() === dia;
}

function validarRegistro(pedido: PedidoSolicitacaoNacional): void {
  if (
    !pedido ||
    !campoValido(pedido.clienteId) ||
    !campoValido(pedido.servicoId) ||
    !campoValido(pedido.solicitacaoId) ||
    !campoValido(pedido.dataCivil) ||
    !dataCivilValida(pedido.dataCivil)
  ) {
    throw new RangeError("Identificadores ou data civil inválidos: solicitação bloqueada.");
  }
}

/**
 * Fail-closed: conta todas as solicitações do mesmo dia, inclusive canceladas.
 * Mudança dessa política exigirá decisão operacional e cobertura de testes.
 * Serviços devem ser distintos no dia. Identificadores são usados apenas
 * como entradas já autenticadas e sanitizadas pelo servidor.
 */
export function verificarLimiteSolicitacoesNacional(
  registros: readonly SolicitacaoNacionalRegistrada[],
  pedido: PedidoSolicitacaoNacional,
): ResultadoLimiteNacional {
  validarRegistro(pedido);
  if (!Array.isArray(registros)) throw new TypeError("Histórico de solicitações inválido.");
  // IDs devem ser únicos no banco; detectar inconsistência em vez de arriscar liberar.
  const ids = new Map<string, SolicitacaoNacionalRegistrada>();
  for (const registro of registros) {
    validarRegistro(registro);
    if (ids.has(registro.solicitacaoId)) {
      throw new Error("Histórico inconsistente: solicitações com mesmo ID.");
    }
    ids.set(registro.solicitacaoId, registro);
  }

  const existente = ids.get(pedido.solicitacaoId);
  if (existente) {
    const igual =
      existente.clienteId === pedido.clienteId &&
      existente.dataCivil === pedido.dataCivil &&
      existente.servicoId === pedido.servicoId;
    const totalNoDia = registros.filter(
      (r) => r.clienteId === pedido.clienteId && r.dataCivil === pedido.dataCivil,
    ).length;
    return igual
      ? { permitido: true, motivo: "repeticao_idempotente", totalNoDia }
      : { permitido: false, motivo: "id_em_conflito", totalNoDia };
  }

  const noDia = registros.filter(
    (r) => r.clienteId === pedido.clienteId && r.dataCivil === pedido.dataCivil,
  );
  const totalNoDia = noDia.length;
  if (totalNoDia >= LIMITE_SOLICITACOES_DIARIO_NACIONAL) {
    return { permitido: false, motivo: "limite_diario", totalNoDia };
  }
  if (noDia.some((r) => r.servicoId === pedido.servicoId)) {
    return { permitido: false, motivo: "servico_repetido", totalNoDia };
  }
  return { permitido: true, motivo: "nova_solicitacao", totalNoDia };
}

export type ResultadoTransicaoNacional =
  | { liberado: true; status: "transicao_de_dominio" }
  | {
      liberado: false;
      status: "transicao_invalida" | "integracao_pagamento_pendente" | "reembolso_exige_integracao" | "aceite_direto_exige_integracao";
    };

const TRANSICOES_SEM_PAGAMENTO: Readonly<Partial<Record<EstadoContratacaoNacional, readonly EstadoContratacaoNacional[]>>> = {
  rascunho: ["cotacao_aceita", "cancelado"],
  cotacao_aceita: ["aguardando_pagamento", "cancelado"],
  aguardando_pagamento: ["cancelado"],
  pagamento_confirmado: ["cancelado"],
  aceito_diretamente_pelo_tecnico: ["em_execucao", "cancelado"],
  em_execucao: ["concluido", "cancelado"],
};

/**
 * Planeja mudança de estado, mas NÃO a executa/persiste.
 * Confirmação real depende de webhook com assinatura validada, correspondência
 * de cotação/valor/moeda, idempotência e conciliação em backend transacional.
 */
export function avaliarTransicaoContratacaoNacional(
  atual: EstadoContratacaoNacional,
  proximo: EstadoContratacaoNacional,
): ResultadoTransicaoNacional {
  if (proximo === "pagamento_confirmado" && atual === "aguardando_pagamento") {
    return { liberado: false, status: "integracao_pagamento_pendente" };
  }
  if (proximo === "aceito_diretamente_pelo_tecnico" && atual === "pagamento_confirmado") {
    // Aceite exige profissional autenticado, pedido vinculado e persistencia auditavel.
    return { liberado: false, status: "aceite_direto_exige_integracao" };
  }
  if (proximo === "reembolsado" && atual === "cancelado") {
    return { liberado: false, status: "reembolso_exige_integracao" };
  }
  if (TRANSICOES_SEM_PAGAMENTO[atual]?.includes(proximo)) {
    return { liberado: true, status: "transicao_de_dominio" };
  }
  return { liberado: false, status: "transicao_invalida" };
}
