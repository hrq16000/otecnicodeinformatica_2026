/**
 * Estados objetivos da ordem de serviço.
 *
 * A página pública mostra apenas o que é verdade operacional: onde a OS está,
 * o prazo estimado daquela etapa e o próximo passo. Nada de status vago
 * ("em andamento") nem promessa que a operação não controla.
 */

export type OsStatusId =
  | "recebida"
  | "em_triagem"
  | "em_laboratorio"
  | "aguardando_aprovacao"
  | "em_reparo"
  | "pronta"
  | "entregue"
  | "cancelada";

export interface OsStatusInfo {
  id: OsStatusId;
  label: string;
  descricao: string;
  /** O que acontece a seguir, do ponto de vista do cliente. */
  proximoPasso: string;
  prazoEstimado: string;
  /** Ordem na linha do tempo; `cancelada` fica fora do fluxo. */
  ordem: number;
  final: boolean;
}

export const OS_STATUS: OsStatusInfo[] = [
  {
    id: "recebida",
    label: "Recebida",
    descricao: "A solicitação foi registrada e entrou na fila de triagem.",
    proximoPasso: "Confirmamos a coleta ou a visita pelo WhatsApp.",
    prazoEstimado: "Até 1 dia útil",
    ordem: 1,
    final: false,
  },
  {
    id: "em_triagem",
    label: "Em triagem",
    descricao: "Conferência do equipamento, dos acessórios e do defeito relatado.",
    proximoPasso: "Seguimos para o diagnóstico em bancada.",
    prazoEstimado: "1 dia útil",
    ordem: 2,
    final: false,
  },
  {
    id: "em_laboratorio",
    label: "Em laboratório",
    descricao: "Equipamento em bancada para diagnóstico técnico.",
    proximoPasso: "Enviamos o orçamento com o valor final antes de qualquer execução.",
    prazoEstimado: "2 a 10 dias úteis, conforme fila",
    ordem: 3,
    final: false,
  },
  {
    id: "aguardando_aprovacao",
    label: "Aguardando sua aprovação",
    descricao: "Diagnóstico concluído e orçamento enviado.",
    proximoPasso: "O reparo só começa depois da sua aprovação no WhatsApp.",
    prazoEstimado: "Depende da sua resposta",
    ordem: 4,
    final: false,
  },
  {
    id: "em_reparo",
    label: "Em reparo",
    descricao: "Orçamento aprovado e serviço em execução.",
    proximoPasso: "Avisamos assim que os testes finais forem concluídos.",
    prazoEstimado: "15 a 45 dias após a aprovação",
    ordem: 5,
    final: false,
  },
  {
    id: "pronta",
    label: "Pronta para entrega",
    descricao: "Serviço concluído e testado.",
    proximoPasso: "Combinamos a entrega ou a retirada pelo WhatsApp.",
    prazoEstimado: "Entrega em até 3 dias úteis",
    ordem: 6,
    final: false,
  },
  {
    id: "entregue",
    label: "Entregue",
    descricao: "Equipamento devolvido ao cliente.",
    proximoPasso: "A garantia da mão de obra corre a partir da data de entrega.",
    prazoEstimado: "—",
    ordem: 7,
    final: true,
  },
  {
    id: "cancelada",
    label: "Cancelada",
    descricao: "Atendimento encerrado sem execução do reparo.",
    proximoPasso: "Se quiser retomar, é só abrir uma nova OS.",
    prazoEstimado: "—",
    ordem: 99,
    final: true,
  },
];

const ALIASES: Record<string, OsStatusId> = {
  aberta: "recebida",
  nova: "recebida",
  recebido: "recebida",
  triagem: "em_triagem",
  diagnostico: "em_laboratorio",
  "diagnóstico": "em_laboratorio",
  laboratorio: "em_laboratorio",
  "laboratório": "em_laboratorio",
  orcamento: "aguardando_aprovacao",
  "orçamento": "aguardando_aprovacao",
  aguardando: "aguardando_aprovacao",
  reparo: "em_reparo",
  execucao: "em_reparo",
  "execução": "em_reparo",
  concluida: "pronta",
  "concluída": "pronta",
  finalizada: "pronta",
  entrega: "entregue",
  cancelado: "cancelada",
};

/** Normaliza qualquer rótulo salvo no banco para um estado conhecido. */
export function normalizarStatusOs(valor: string | null | undefined): OsStatusInfo {
  const chave = (valor ?? "").trim().toLowerCase().replace(/[\s-]+/g, "_");
  const direto = OS_STATUS.find((s) => s.id === chave);
  if (direto) return direto;
  const alias = ALIASES[chave] ?? ALIASES[chave.replace(/_/g, "")];
  return OS_STATUS.find((s) => s.id === alias) ?? OS_STATUS[0]!;
}

/** Etapas na ordem do fluxo, marcando concluídas / atual / futuras. */
export function linhaDoTempoOs(statusAtual: OsStatusInfo) {
  return OS_STATUS.filter((s) => s.id !== "cancelada").map((etapa) => ({
    ...etapa,
    estado:
      statusAtual.id === "cancelada"
        ? ("futura" as const)
        : etapa.ordem < statusAtual.ordem
          ? ("concluida" as const)
          : etapa.ordem === statusAtual.ordem
            ? ("atual" as const)
            : ("futura" as const),
  }));
}

export const OS_STATUS_OPTIONS = OS_STATUS.map((s) => ({ value: s.id, label: s.label }));
