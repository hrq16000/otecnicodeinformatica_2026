/**
 * Rodada 17 — contrato de consentimento explícito do cliente, sem backend ativo.
 *
 * O navegador informa apenas o ID opaco do pedido, a revisão visualizada,
 * uma chave idempotente e a confirmação explícita. Identidade, instante UTC,
 * cotação atual, autorização anterior e gravação de auditoria vêm do servidor.
 *
 * O adaptador real DEVE: verificar sessão e CSRF, carregar proposta imutável
 * (qualquer modificação incrementa revisão), serializar transações entre
 * instâncias, impor UNIQUE(cliente,chave) e UNIQUE(pedido,revisão) para aceite,
 * persistir consentimento+mudança de estado+auditoria em UM commit e preservar
 * consentimentos históricos. Não fornece endpoint, pagamento ou despacho.
 */
import type { EstadoContratacaoNacional } from "./contratacaoDiretaNacional";
import {
  condicoesAceitasPeloClienteNacional,
  type CondicoesVinculadasNacional,
  type ConsentimentoCotacaoNacional,
} from "./integridadeCotacaoNacional";

export interface ClienteAutorizacaoAutenticado {
  clienteId: string;
  autenticadoNoServidor: true;
}

export interface PedidoAutorizacaoCotacaoNacional {
  solicitacaoId: string;
  estado: EstadoContratacaoNacional;
  condicoesAtuais: CondicoesVinculadasNacional;
  /** Último aceite; os anteriores devem permanecer em histórico imutável. */
  consentimentoAtual: ConsentimentoCotacaoNacional | null;
  chaveAutorizacaoAtual: string | null;
}

export interface ReferenciaAutorizacaoPelaChave {
  solicitacaoId: string;
  clienteId: string;
  revisao: number;
  chaveIdempotencia: string;
}

export interface EventoAutorizacaoCotacaoNacional {
  tipo: "cotacao_aceita_cliente";
  solicitacaoId: string;
  clienteId: string;
  revisao: number;
  instanteUtc: string;
  chaveIdempotencia: string;
}

export interface TransacaoAutorizacaoCotacaoNacional {
  instanteUtcServidor(): Promise<string>;
  buscarPedido(solicitacaoId: string): Promise<PedidoAutorizacaoCotacaoNacional | null>;
  /** Busca global em TODAS as revisões e solicitações do cliente. */
  buscarUsoChaveCliente(chaveIdempotencia: string): Promise<ReferenciaAutorizacaoPelaChave | null>;
  /** Persistir aceite, estado, chave e auditoria de forma atômica e com CAS. */
  gravarConsentimentoEAuditoria(
    consentimento: ConsentimentoCotacaoNacional,
    chaveIdempotencia: string,
    evento: EventoAutorizacaoCotacaoNacional,
  ): Promise<void>;
}

export interface ContextoAutorizacaoCotacaoNacional {
  resolverClienteNoServidor(): Promise<ClienteAutorizacaoAutenticado | null>;
  /** Lock/serialização global por cliente+chave+pedido em ordem determinística. */
  transacaoExclusiva<T>(
    clienteId: string,
    solicitacaoId: string,
    chaveIdempotencia: string,
    executar: (tx: TransacaoAutorizacaoCotacaoNacional) => Promise<T>,
  ): Promise<T>;
}

export interface ArmazenamentoAutorizacaoCotacaoNacional {
  emContextoAutenticado<T>(
    executar: (ctx: ContextoAutorizacaoCotacaoNacional) => Promise<T>,
  ): Promise<T>;
}

export type ResultadoAutorizacaoCotacaoNacional =
  | { autorizada: true; estado: "nova" | "idempotente"; revisao: number }
  | { autorizada: false; estado:
      "confirmacao_necessaria" | "nao_autorizado" | "revisao_divergente" |
      "cotacao_indisponivel" | "estado_invalido" | "ja_autorizada" |
      "chave_em_conflito" | "registro_inconsistente" };

function idSeguro(valor: unknown): valor is string {
  return typeof valor === "string" && /^[A-Za-z0-9_-]{8,128}$/.test(valor);
}

function clienteSeguro(valor: unknown): valor is string {
  return typeof valor === "string" && /^[A-Za-z0-9_-]{5,128}$/.test(valor);
}

/** A confirmação é um ato explícito; a sessão é a prova de identidade. */
export async function registrarAutorizacaoCotacaoNacional(
  armazenamento: ArmazenamentoAutorizacaoCotacaoNacional,
  entrada: {
    solicitacaoId: string;
    revisaoVisualizada: number;
    chaveIdempotencia: string;
    confirmouIntegralmente: boolean;
  },
): Promise<ResultadoAutorizacaoCotacaoNacional> {
  if (!armazenamento || typeof armazenamento.emContextoAutenticado !== "function" ||
      !entrada || !idSeguro(entrada.solicitacaoId) ||
      !idSeguro(entrada.chaveIdempotencia) ||
      !Number.isSafeInteger(entrada.revisaoVisualizada) ||
      entrada.revisaoVisualizada < 1 ||
      typeof entrada.confirmouIntegralmente !== "boolean") {
    throw new RangeError("Entrada de autorização nacional inválida.");
  }

  if (entrada.confirmouIntegralmente !== true) {
    return { autorizada: false, estado: "confirmacao_necessaria" };
  }

  return armazenamento.emContextoAutenticado(async (ctx) => {
    const cliente = await ctx.resolverClienteNoServidor();
    if (!cliente || cliente.autenticadoNoServidor !== true || !clienteSeguro(cliente.clienteId)) {
      return { autorizada: false, estado: "nao_autorizado" };
    }

    return ctx.transacaoExclusiva(
      cliente.clienteId,
      entrada.solicitacaoId,
      entrada.chaveIdempotencia,
      async (tx) => {
        const pedido = await tx.buscarPedido(entrada.solicitacaoId);
        if (!pedido || pedido.solicitacaoId !== entrada.solicitacaoId ||
            !pedido.condicoesAtuais ||
            pedido.condicoesAtuais.solicitacaoId !== entrada.solicitacaoId ||
            pedido.condicoesAtuais.clienteId !== cliente.clienteId) {
          return { autorizada: false, estado: "nao_autorizado" };
        }

        const atual = pedido.condicoesAtuais;
        if (atual.revisao !== entrada.revisaoVisualizada) {
          return { autorizada: false, estado: "revisao_divergente" };
        }

        const existente = pedido.consentimentoAtual;
        if ((existente === null) !== (pedido.chaveAutorizacaoAtual === null)) {
          return { autorizada: false, estado: "registro_inconsistente" };
        }

        const usoChave = await tx.buscarUsoChaveCliente(entrada.chaveIdempotencia);
        if (usoChave && (
          usoChave.clienteId !== cliente.clienteId ||
          usoChave.solicitacaoId !== entrada.solicitacaoId ||
          usoChave.revisao !== entrada.revisaoVisualizada ||
          usoChave.chaveIdempotencia !== entrada.chaveIdempotencia
        )) return { autorizada: false, estado: "chave_em_conflito" };

        // Apenas a repetição do MESMO registro concluído dispensa a validade.
        if (existente && pedido.chaveAutorizacaoAtual === entrada.chaveIdempotencia &&
            usoChave && usoChave.revisao === atual.revisao) {
          const agora = await tx.instanteUtcServidor();
          if ((pedido.estado === "cotacao_aceita" || pedido.estado === "aguardando_pagamento") &&
              condicoesAceitasPeloClienteNacional(atual, existente, agora, false)) {
            return { autorizada: true, estado: "idempotente", revisao: atual.revisao };
          }
          return { autorizada: false, estado: "registro_inconsistente" };
        }

        if (usoChave) return { autorizada: false, estado: "chave_em_conflito" };
        if (existente && existente.condicoes.revisao === atual.revisao) {
          return { autorizada: false, estado: "ja_autorizada" };
        }
        if (pedido.estado !== "rascunho") {
          return { autorizada: false, estado: "estado_invalido" };
        }

        const agora = await tx.instanteUtcServidor();
        const consentimento: ConsentimentoCotacaoNacional = {
          condicoes: atual,
          clienteAutenticadoId: cliente.clienteId,
          verificadoNoServidor: true,
          aceitoEmUtc: agora,
        };
        if (!condicoesAceitasPeloClienteNacional(atual, consentimento, agora)) {
          return { autorizada: false, estado: "cotacao_indisponivel" };
        }

        const evento: EventoAutorizacaoCotacaoNacional = {
          tipo: "cotacao_aceita_cliente",
          solicitacaoId: pedido.solicitacaoId,
          clienteId: cliente.clienteId,
          revisao: atual.revisao,
          instanteUtc: agora,
          chaveIdempotencia: entrada.chaveIdempotencia,
        };
        await tx.gravarConsentimentoEAuditoria(consentimento, entrada.chaveIdempotencia, evento);
        return { autorizada: true, estado: "nova", revisao: atual.revisao };
      },
    );
  });
}
