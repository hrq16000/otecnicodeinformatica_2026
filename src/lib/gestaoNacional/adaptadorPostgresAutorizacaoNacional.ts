/**
 * Rodada 18 — adaptador PostgreSQL por injeção de dependências (NÃO conectado).
 *
 * Nenhum pool real, endpoint ou migration é instanciado aqui.
 * Uso FUTURO: apenas no backend, com pool restrito ao schema privado,
 * sessão autenticada por requisição, CSRF e esquema revisado/aplicado.
 * Lock por (cliente,chave) e depois por pedido; UNIQUEs no banco são essenciais.
 */
import type {
  ArmazenamentoAutorizacaoCotacaoNacional,
  ClienteAutorizacaoAutenticado,
  ContextoAutorizacaoCotacaoNacional,
  EventoAutorizacaoCotacaoNacional,
  PedidoAutorizacaoCotacaoNacional,
  ReferenciaAutorizacaoPelaChave,
  TransacaoAutorizacaoCotacaoNacional,
} from "./registroAutorizacaoCotacaoNacional";
import {
  condicoesAceitasPeloClienteNacional,
  type CondicoesVinculadasNacional,
  type ConsentimentoCotacaoNacional,
} from "./integridadeCotacaoNacional";
import type { EstadoContratacaoNacional } from "./contratacaoDiretaNacional";

export interface ConsultaPgNacional<T> {
  rows: T[];
  rowCount: number | null;
}
export interface ConexaoPgNacional {
  query<T>(sql: string, parametros?: readonly unknown[]): Promise<ConsultaPgNacional<T>>;
  release(): void;
}
export interface PoolPgNacional {
  connect(): Promise<ConexaoPgNacional>;
}
export interface IdentidadeRequestNacional {
  /** Sessão autenticada no backend, jamais client_id passado pelo navegador. */
  resolverClienteAutenticado(): Promise<ClienteAutorizacaoAutenticado | null>;
}
export interface RelogioServidorNacional {
  utcAgora(): string;
}

type PedidoRow = {
  solicitacao_id: string;
  estado: EstadoContratacaoNacional;
  condicoes_atuais: unknown;
  consentimento_atual: unknown;
  chave_autorizacao_atual: string | null;
};
type ChaveRow = {
  solicitacao_id: string;
  cliente_id: string;
  revisao: number;
  chave_idempotencia: string;
};

function jsonPrivado<T>(valor: unknown): T {
  // node-postgres parseia JSONB; compatível com adaptadores que retornam string.
  return (typeof valor === "string" ? JSON.parse(valor) : valor) as T;
}

/**
 * Só cria o contrato server-side. A instância não é exportada para telas
 * nem ligada a nenhuma rota enquanto a modalidade estiver desativada.
 */
export function criarAdaptadorPostgresAutorizacaoNacional(
  pool: PoolPgNacional,
  identidade: IdentidadeRequestNacional,
  relogio: RelogioServidorNacional,
): ArmazenamentoAutorizacaoCotacaoNacional {
  if (!pool || typeof pool.connect !== "function" ||
      !identidade || typeof identidade.resolverClienteAutenticado !== "function" ||
      !relogio || typeof relogio.utcAgora !== "function") {
    throw new TypeError("Dependências do adaptador PostgreSQL inválidas.");
  }

  return {
    async emContextoAutenticado<T>(
      executar: (ctx: ContextoAutorizacaoCotacaoNacional) => Promise<T>,
    ): Promise<T> {
      // Identidade congelada para a duração da requisição; nada de singleton.
      const cliente = await identidade.resolverClienteAutenticado();
      return executar({
        async resolverClienteNoServidor() {
          return cliente;
        },

        async transacaoExclusiva<R>(
          clienteId: string,
          solicitacaoId: string,
          chaveIdempotencia: string,
          fn: (tx: TransacaoAutorizacaoCotacaoNacional) => Promise<R>,
        ): Promise<R> {
          if (!cliente || cliente.autenticadoNoServidor !== true ||
              cliente.clienteId !== clienteId) {
            throw new Error("Sessão do cliente não autorizada.");
          }
          const conexao = await pool.connect();
          let iniciou = false;
          try {
            await conexao.query("BEGIN");
            iniciou = true;

            // Ordem determinística para duas chaves diferentes do mesmo pedido.
            // hashtextextended é uma trava, NÃO índice nem autorização.
            await conexao.query(
              "SELECT pg_advisory_xact_lock(hashtextextended($1::text, 0))",
              ["autorizacao:chave:" + clienteId + ":" + chaveIdempotencia],
            );
            await conexao.query(
              "SELECT pg_advisory_xact_lock(hashtextextended($1::text, 0))",
              ["autorizacao:pedido:" + solicitacaoId],
            );

            const transacao: TransacaoAutorizacaoCotacaoNacional = {
              async instanteUtcServidor() {
                return relogio.utcAgora();
              },
              async buscarPedido(id) {
                const retorno = await conexao.query<PedidoRow>(
                  "SELECT solicitacao_id, estado, condicoes_atuais, consentimento_atual, chave_autorizacao_atual " +
                  "FROM national_ops.solicitacoes_autorizacao " +
                  "WHERE solicitacao_id = $1 AND cliente_id = $2 FOR UPDATE",
                  [id, clienteId],
                );
                const row = retorno.rows[0];
                if (!row || retorno.rows.length !== 1) return null;
                return {
                  solicitacaoId: row.solicitacao_id,
                  estado: row.estado,
                  condicoesAtuais: jsonPrivado<CondicoesVinculadasNacional>(row.condicoes_atuais),
                  consentimentoAtual: row.consentimento_atual === null ? null :
                    jsonPrivado<ConsentimentoCotacaoNacional>(row.consentimento_atual),
                  chaveAutorizacaoAtual: row.chave_autorizacao_atual,
                } satisfies PedidoAutorizacaoCotacaoNacional;
              },
              async buscarUsoChaveCliente(chave) {
                const retorno = await conexao.query<ChaveRow>(
                  "SELECT solicitacao_id, cliente_id, revisao, chave_idempotencia " +
                  "FROM national_ops.autorizacoes_cotacao " +
                  "WHERE cliente_id = $1 AND chave_idempotencia = $2",
                  [clienteId, chave],
                );
                if (retorno.rows.length > 1) throw new Error("Histórico de chave inconsistente.");
                const row = retorno.rows[0];
                return row ? {
                  solicitacaoId: row.solicitacao_id,
                  clienteId: row.cliente_id,
                  revisao: row.revisao,
                  chaveIdempotencia: row.chave_idempotencia,
                } satisfies ReferenciaAutorizacaoPelaChave : null;
              },
              async gravarConsentimentoEAuditoria(
                consentimento: ConsentimentoCotacaoNacional,
                chave: string,
                evento: EventoAutorizacaoCotacaoNacional,
              ) {
                const c = consentimento.condicoes;
                if (!c || c.solicitacaoId !== solicitacaoId ||
                    c.clienteId !== clienteId || evento.solicitacaoId !== solicitacaoId ||
                    evento.clienteId !== clienteId || evento.revisao !== c.revisao ||
                    evento.instanteUtc !== consentimento.aceitoEmUtc ||
                    evento.chaveIdempotencia !== chave ||
                    evento.tipo !== "cotacao_aceita_cliente" ||
                    !condicoesAceitasPeloClienteNacional(c, consentimento, evento.instanteUtc)) {
                  throw new Error("Prova de autorização inconsistente.");
                }

                // CAS e snapshot exato: sem reusar consentimento em outro escopo.
                const alterado = await conexao.query<{ solicitacao_id: string }>(
                  "UPDATE national_ops.solicitacoes_autorizacao " +
                  "SET estado = 'cotacao_aceita', consentimento_atual = $4::jsonb, " +
                  "chave_autorizacao_atual = $5 " +
                  "WHERE solicitacao_id = $1 AND cliente_id = $2 AND revisao_atual = $3 " +
                  "AND condicoes_atuais = $6::jsonb AND estado = 'rascunho' " +
                  "RETURNING solicitacao_id",
                  [solicitacaoId, clienteId, c.revisao, JSON.stringify(consentimento),
                    chave, JSON.stringify(c)],
                );
                if (alterado.rowCount !== 1) {
                  throw new Error("Conflito transacional: proposta alterada.");
                }

                await conexao.query(
                  "INSERT INTO national_ops.autorizacoes_cotacao " +
                  "(solicitacao_id, cliente_id, revisao, chave_idempotencia, " +
                  "consentimento, aceito_em) VALUES ($1, $2, $3, $4, $5::jsonb, $6::timestamptz)",
                  [solicitacaoId, clienteId, c.revisao, chave,
                    JSON.stringify(consentimento), consentimento.aceitoEmUtc],
                );
                // Falha deste INSERT provoca rollback de UPDATE e autorização.
                await conexao.query(
                  "INSERT INTO national_ops.autorizacoes_auditoria " +
                  "(solicitacao_id, cliente_id, revisao, tipo, instante_utc, chave_idempotencia) " +
                  "VALUES ($1, $2, $3, $4, $5::timestamptz, $6)",
                  [evento.solicitacaoId, evento.clienteId, evento.revisao,
                    evento.tipo, evento.instanteUtc, evento.chaveIdempotencia],
                );
              },
            };

            const resultado = await fn(transacao);
            await conexao.query("COMMIT");
            iniciou = false;
            return resultado;
          } catch (erro) {
            if (iniciou) {
              try { await conexao.query("ROLLBACK"); } catch {
                // Preserva o erro original; conexão é liberada pelo finally.
              }
            }
            throw erro;
          } finally {
            conexao.release();
          }
        },
      });
    },
  };
}
