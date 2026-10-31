/**
 * Rodada 8 — fronteira para persistência segura da validação nacional.
 *
 * Nada é gravado na modalidade atual. O adaptador de banco será separado
 * da aplicação, permitindo PostgreSQL próprio sem depender de um frontend
 * específico. Nenhuma sessão/role pode ser enviada pelo navegador.
 */
import {
  aplicarValidacaoNacional,
  type AcaoValidacaoNacional,
  type AtorValidadoNacional,
  type RegistroValidacaoNacional,
  type ResultadoAtualizacaoNacional,
} from "./validacaoAdministrativa";

export interface TransacaoValidacaoNacional {
  /** Retorno do banco na mesma transação e sob lock do parceiro. */
  buscarRegistro(parceiroId: string): Promise<RegistroValidacaoNacional | null>;
  /**
   * Resolve a identidade e privilégios a partir da sessão autenticada no
   * backend. O cliente NÃO controla papel, userId ou titularUserId.
   */
  resolverAtorConfiavel(): Promise<AtorValidadoNacional | null>;
  /**
   * Comparação de revisão e persistência de registro + auditoria na MESMA
   * transação. Sem sucesso do INSERT de auditoria, rollback completo.
   */
  gravarRevisaoEEvento(
    resultado: ResultadoAtualizacaoNacional,
    revisaoEsperada: number,
  ): Promise<void>;
}

export interface ArmazenamentoValidacaoNacional {
  /**
   * Serializa operações por parceiro de forma transacional entre instâncias.
   * Não implementar com Map, localStorage ou lock apenas em memória.
   */
  transacaoExclusiva<T>(
    parceiroId: string,
    executar: (tx: TransacaoValidacaoNacional) => Promise<T>,
  ): Promise<T>;
}

export interface ComandoValidacaoNacional {
  parceiroId: string;
  revisaoEsperada: number;
  acao: AcaoValidacaoNacional;
}

/**
 * Executar somente em controlador server-side. O horário vem do servidor.
 * Falha fechada para ausência de registro, identidade ou revisão concorrente.
 */
export async function persistirValidacaoNacional(
  armazenamento: ArmazenamentoValidacaoNacional,
  comando: ComandoValidacaoNacional,
  agora: Date,
): Promise<ResultadoAtualizacaoNacional> {
  if (
    !armazenamento ||
    typeof armazenamento.transacaoExclusiva !== "function" ||
    !comando ||
    typeof comando.parceiroId !== "string" ||
    !/^[a-zA-Z0-9_-]{5,128}$/.test(comando.parceiroId) ||
    !Number.isSafeInteger(comando.revisaoEsperada) ||
    comando.revisaoEsperada < 0 ||
    !(agora instanceof Date) ||
    !Number.isFinite(agora.getTime())
  ) {
    throw new Error("Comando de persistência inválido.");
  }

  return armazenamento.transacaoExclusiva(comando.parceiroId, async (tx) => {
    const registro = await tx.buscarRegistro(comando.parceiroId);
    if (!registro || registro.parceiroId !== comando.parceiroId) {
      throw new Error("Cadastro não habilitado na modalidade nacional.");
    }
    const ator = await tx.resolverAtorConfiavel();
    if (!ator || ator.sessaoAutenticadaNoServidor !== true) {
      throw new Error("Sessão do operador não autenticada no servidor.");
    }
    const resultado = aplicarValidacaoNacional(
      registro,
      ator,
      comando.acao,
      comando.revisaoEsperada,
      agora,
    );
    await tx.gravarRevisaoEEvento(resultado, comando.revisaoEsperada);
    return resultado;
  });
}
