/**
 * Rodada 14 — fronteira transacional para aceite DIRETO do profissional.
 *
 * Contrato isolado: nao cria API, rota, fila, mensageria, acionamento, pagamento
 * ou acesso ao banco. O operador da plataforma nao aceita em nome do tecnico.
 * Nenhum valor, papel ou identificador do profissional vem do navegador.
 * Exige adaptador backend autenticado e transacao/lock real ANTES de habilitar.
 */
import type { EstadoContratacaoNacional } from "./contratacaoDiretaNacional";
import {
  condicoesAceitasPeloClienteNacional,
  type CondicoesVinculadasNacional,
  type ConsentimentoCotacaoNacional,
} from "./integridadeCotacaoNacional";

export interface ProfissionalAceiteAutenticado {
  papel: "profissional";
  userId: string;
  parceiroId: string;
  sessaoAutenticadaNoServidor: true;
  vinculoComParceiroValidadoNoServidor: true;
}

export interface RegistroAceiteNacional {
  solicitacaoId: string;
  estado: EstadoContratacaoNacional;
  /** ID interno do profissional previamente apresentado na consulta autenticada. */
  tecnicoApresentadoId: string;
  /** So preenchido apos aceite gravado no servidor. */
  tecnicoAceitouId: string | null;
  /** Conferidos no backend, nunca derivados da tela ou do print de Pix. */
  pagamentoConciliado: boolean;
  /** Proposta atual e aceite imutavel recuperados da persistencia autoritativa. */
  condicoesAtuais: CondicoesVinculadasNacional;
  consentimentoCliente: ConsentimentoCotacaoNacional | null;
}

export interface TransacaoAceiteDiretoNacional {
  /** Identidade e papel derivados da sessao validada pelo servidor. */
  resolverProfissionalAutenticado(): Promise<ProfissionalAceiteAutenticado | null>;
  /** Hora UTC gerada no servidor, nunca informada pelo navegador. */
  instanteUtcServidor(): Promise<string>;
  /** Busca pelo ID sob lock e valida titularidade/escopo em banco. */
  buscarSolicitacao(solicitacaoId: string): Promise<RegistroAceiteNacional | null>;
  /**
   * Consulta autoritativa e atual de comunidade, cadastro, habilitacao,
   * termos, municipio, servico e disponibilidade nao expirada.
   * Precisa evitar corrida entre suspensao e aceite no banco real.
   */
  profissionalContinuaElegivel(solicitacaoId: string, parceiroId: string): Promise<boolean>;
  /**
   * CAS pagamento_confirmado -> aceito_diretamente_pelo_tecnico + auditoria
   * em uma so transacao. Falha de log deve causar rollback de tudo.
   */
  gravarAceiteComAuditoria(solicitacaoId: string, parceiroId: string, atorId: string): Promise<void>;
}

export interface ArmazenamentoAceiteDiretoNacional {
  /** Lock transacional global por solicitacao, inclusive entre instancias. */
  transacaoExclusiva<T>(
    solicitacaoId: string,
    executar: (tx: TransacaoAceiteDiretoNacional) => Promise<T>,
  ): Promise<T>;
}

export type ResultadoAceiteDiretoNacional =
  | { aceito: false; estado: "nao_autorizado" | "solicitacao_indisponivel" | "aguardando_confirmacao" | "profissional_inelegivel" }
  | { aceito: true; estado: "aceito_diretamente"; repeticao: boolean };

function idSeguro(id: unknown): id is string {
  return typeof id === "string" && /^[A-Za-z0-9_-]{8,128}$/.test(id);
}

/**
 * Executar exclusivamente em controlador server-side. O backend DEVE verificar
 * pagamento real conciliado e aceite/condicoes do cliente sob a transacao, alem
 * de conferir que o tecnico logado e o apresentado sao a mesma pessoa.
 * Este codigo nao valida webhooks nem substitui RLS/indices/contrato.
 */
export async function registrarAceiteDiretoNacional(
  armazenamento: ArmazenamentoAceiteDiretoNacional,
  solicitacaoId: string,
): Promise<ResultadoAceiteDiretoNacional> {
  if (!armazenamento || typeof armazenamento.transacaoExclusiva !== "function" || !idSeguro(solicitacaoId)) {
    throw new RangeError("Solicitacao ou armazenamento de aceite invalido.");
  }

  return armazenamento.transacaoExclusiva(solicitacaoId, async (tx) => {
    const ator = await tx.resolverProfissionalAutenticado();
    if (
      !ator ||
      ator.papel !== "profissional" ||
      ator.sessaoAutenticadaNoServidor !== true ||
      ator.vinculoComParceiroValidadoNoServidor !== true ||
      !idSeguro(ator.userId) ||
      !idSeguro(ator.parceiroId)
    ) return { aceito: false, estado: "nao_autorizado" };

    const pedido = await tx.buscarSolicitacao(solicitacaoId);
    if (!pedido || pedido.solicitacaoId !== solicitacaoId) {
      return { aceito: false, estado: "solicitacao_indisponivel" };
    }
    if (pedido.tecnicoApresentadoId !== ator.parceiroId) {
      return { aceito: false, estado: "nao_autorizado" };
    }
    const repeticao = pedido.estado === "aceito_diretamente_pelo_tecnico";
    const agora = await tx.instanteUtcServidor();
    if (
      !pedido.condicoesAtuais ||
      pedido.condicoesAtuais.solicitacaoId !== solicitacaoId ||
      pedido.condicoesAtuais.tecnicoId !== ator.parceiroId ||
      !condicoesAceitasPeloClienteNacional(
        pedido.condicoesAtuais, pedido.consentimentoCliente, agora, !repeticao,
      )
    ) return { aceito: false, estado: "aguardando_confirmacao" };

    if (repeticao) {
      if (pedido.tecnicoAceitouId !== ator.parceiroId || pedido.pagamentoConciliado !== true) {
        return { aceito: false, estado: "nao_autorizado" };
      }
      return { aceito: true, estado: "aceito_diretamente", repeticao: true };
    }
    if (
      pedido.estado !== "pagamento_confirmado" ||
      pedido.tecnicoAceitouId !== null ||
      pedido.pagamentoConciliado !== true ||
      pedido.consentimentoCliente === null
    ) return { aceito: false, estado: "aguardando_confirmacao" };

    if (!(await tx.profissionalContinuaElegivel(solicitacaoId, ator.parceiroId))) {
      return { aceito: false, estado: "profissional_inelegivel" };
    }
    await tx.gravarAceiteComAuditoria(solicitacaoId, ator.parceiroId, ator.userId);
    return { aceito: true, estado: "aceito_diretamente", repeticao: false };
  });
}
