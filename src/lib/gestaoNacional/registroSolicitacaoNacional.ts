/**
 * Rodada 15 — registro de interesse do cliente autenticado, em transacao.
 *
 * Somente contrato para adaptador server-side: NAO cria rota, banco, demanda,
 * despacho, pagamento nem habilita a modalidade nacional. Nao aceita clienteId,
 * dataCivil ou solicitacaoId vindos do navegador. A chave de idempotencia pode
 * vir do cliente, mas o servidor deve limitar abuso e autenticar a sessao.
 *
 * Backend real: lock por (cliente, dia), UNIQUE global no ID de solicitacao e
 * UNIQUE global em (cliente, chave de idempotencia), indice por
 * (cliente, dia, servico). Insercao e auditoria no MESMO COMMIT. Sem esses
 * requisitos o algoritmo puro nao protege contra corridas entre instancias.
 */
import {
  dataCivilValida,
  verificarLimiteSolicitacoesNacional,
  type SolicitacaoNacionalRegistrada,
} from "./contratacaoDiretaNacional";

export interface ClienteNacionalAutenticado {
  clienteId: string;
  autenticadoNoServidor: true;
}

export interface SolicitacaoNacionalComChave extends SolicitacaoNacionalRegistrada {
  chaveIdempotencia: string;
}

export interface TransacaoRegistroSolicitacaoNacional {
  /** Busca global por chave do cliente, nao apenas pelos pedidos de hoje. */
  buscarPelaChaveDoCliente(chaveIdempotencia: string): Promise<SolicitacaoNacionalComChave | null>;
  /** Retorna TODAS as solicitacoes do titular no dia, inclusive canceladas. */
  listarDoClienteNoDia(): Promise<readonly SolicitacaoNacionalRegistrada[]>;
  /** Valida ID do catalogo e permissao do servico no backend. */
  servicoCatalogadoEPermitido(servicoId: string): Promise<boolean>;
  /** Id opaco novo, emitido pelo servidor; obrigatoria unicidade no banco. */
  gerarSolicitacaoIdServidor(): Promise<string>;
  /** INSERT de pedido e evento de auditoria na mesma transacao/rollback. */
  gravarSolicitacaoEAuditoria(registro: SolicitacaoNacionalComChave): Promise<void>;
}

export interface ContextoRegistroSolicitacaoNacional {
  resolverClienteNoServidor(): Promise<ClienteNacionalAutenticado | null>;
  /** Data civil definida pelo backend segundo fuso operacional documentado. */
  dataCivilDoServidor(): Promise<string>;
  /** Lock por cliente/dia e indices unicos compartilhados entre instancias. */
  transacaoExclusivaClienteDia<T>(
    clienteId: string,
    dataCivil: string,
    executar: (tx: TransacaoRegistroSolicitacaoNacional) => Promise<T>,
  ): Promise<T>;
}

export interface ArmazenamentoRegistroSolicitacaoNacional {
  /** Contexto por requisicao autenticada; nunca sessao mutavel em singleton. */
  emContextoAutenticado<T>(
    executar: (contexto: ContextoRegistroSolicitacaoNacional) => Promise<T>,
  ): Promise<T>;
}

export type ResultadoRegistroSolicitacaoNacional =
  | { registrada: true; estado: "nova" | "idempotente"; solicitacaoId: string; totalNoDia: number }
  | { registrada: false; estado: "nao_autenticado" | "id_em_conflito" | "servico_nao_permitido" | "servico_repetido" | "limite_diario"; solicitacaoId: null };

function idInternoValido(valor: unknown): valor is string {
  return typeof valor === "string" && /^[A-Za-z0-9_-]{8,128}$/.test(valor);
}
function clienteValido(valor: unknown): valor is string {
  return typeof valor === "string" && /^[A-Za-z0-9_-]{5,128}$/.test(valor);
}
function servicoValido(valor: unknown): valor is string {
  return typeof valor === "string" && /^[a-z0-9][a-z0-9_-]{1,99}$/.test(valor);
}

export async function registrarSolicitacaoDiretaNacional(
  armazenamento: ArmazenamentoRegistroSolicitacaoNacional,
  entrada: { servicoId: string; chaveIdempotencia: string },
): Promise<ResultadoRegistroSolicitacaoNacional> {
  if (
    !armazenamento ||
    typeof armazenamento.emContextoAutenticado !== "function" ||
    !entrada ||
    !servicoValido(entrada.servicoId) ||
    !idInternoValido(entrada.chaveIdempotencia)
  ) throw new RangeError("Solicitacao nacional com entrada ou armazenamento invalido.");

  return armazenamento.emContextoAutenticado(async (contexto) => {
    const cliente = await contexto.resolverClienteNoServidor();
    if (!cliente || cliente.autenticadoNoServidor !== true || !clienteValido(cliente.clienteId)) {
      return { registrada: false, estado: "nao_autenticado", solicitacaoId: null };
    }
    const dataCivil = await contexto.dataCivilDoServidor();
    if (!dataCivilValida(dataCivil)) throw new RangeError("Data civil de servidor invalida.");

    return contexto.transacaoExclusivaClienteDia(cliente.clienteId, dataCivil, async (tx) => {
      const historico = await tx.listarDoClienteNoDia();
      if (!Array.isArray(historico) || historico.some(
        (r) => r.clienteId !== cliente.clienteId || r.dataCivil !== dataCivil,
      )) throw new Error("Historico diario do cliente inconsistente.");

      const jaRegistrada = await tx.buscarPelaChaveDoCliente(entrada.chaveIdempotencia);
      if (jaRegistrada) {
        // Chave idempotente nao autoriza troca de servico, titular nem dia.
        if (
          jaRegistrada.clienteId !== cliente.clienteId ||
          jaRegistrada.chaveIdempotencia !== entrada.chaveIdempotencia ||
          jaRegistrada.dataCivil !== dataCivil ||
          jaRegistrada.servicoId !== entrada.servicoId ||
          !historico.some((r) => r.solicitacaoId === jaRegistrada.solicitacaoId)
        ) return { registrada: false, estado: "id_em_conflito", solicitacaoId: null };
        // Verificacao de integridade e idempotencia pelo algoritmo ja existente.
        const replay = verificarLimiteSolicitacoesNacional(historico, jaRegistrada);
        if (!replay.permitido || replay.motivo !== "repeticao_idempotente") {
          throw new Error("Chave idempotente sem registro consistente.");
        }
        return {
          registrada: true, estado: "idempotente",
          solicitacaoId: jaRegistrada.solicitacaoId, totalNoDia: replay.totalNoDia,
        };
      }

      if (!(await tx.servicoCatalogadoEPermitido(entrada.servicoId))) {
        return { registrada: false, estado: "servico_nao_permitido", solicitacaoId: null };
      }
      const solicitacaoId = await tx.gerarSolicitacaoIdServidor();
      if (!idInternoValido(solicitacaoId)) throw new Error("ID interno de solicitacao invalido.");
      const registro: SolicitacaoNacionalComChave = {
        clienteId: cliente.clienteId,
        dataCivil,
        servicoId: entrada.servicoId,
        solicitacaoId,
        chaveIdempotencia: entrada.chaveIdempotencia,
      };
      const limite = verificarLimiteSolicitacoesNacional(historico, registro);
      if (!limite.permitido) {
        return {
          registrada: false,
          estado: limite.motivo === "limite_diario" ? "limite_diario"
            : limite.motivo === "servico_repetido" ? "servico_repetido" : "id_em_conflito",
          solicitacaoId: null,
        };
      }
      await tx.gravarSolicitacaoEAuditoria(registro);
      return { registrada: true, estado: "nova", solicitacaoId, totalNoDia: limite.totalNoDia + 1 };
    });
  });
}
