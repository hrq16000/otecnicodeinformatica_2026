/**
 * Rodízio de EXIBIÇÃO com armazenamento transacional injetado.
 *
 * NÃO é despacho/acionamento, não entrega lead ao técnico nem realiza pagamento.
 * Nenhum adaptador de banco, rota ou cadastro real é criado aqui.
 * Implementar com lock/transaction reais e isolamento entre clientes no backend
 * antes de expor publicamente. NÃO utilizar localStorage, cache local ou
 * memória de processo como mecanismo de produção.
 */
import {
  proximoTecnicoRegional,
  type ConsultaRodizioRegional,
  type TecnicoElegibilidadeNacional,
} from "./rodizioRegional";

export interface RegistroApresentacaoNacional {
  /** Chave de idempotência criada e validada no servidor. */
  solicitacaoId: string;
  /** UF/município/serviço canônicos associados à solicitação. */
  escopo: string;
  /** ID interno; não é contato público nem aceite do profissional. */
  tecnicoId: string;
}

export interface TransacaoRodizioNacional {
  /** Read no mesmo lock/transação, não de cache eventual. */
  buscarPorSolicitacao(solicitacaoId: string): Promise<RegistroApresentacaoNacional | null>;
  consultarUltimoApresentado(): Promise<string | null>;
  listarProfissionaisElegiveis(): Promise<readonly TecnicoElegibilidadeNacional[]>;
  /** Persistência de registro + cursor deve ser atomicamente confirmada. */
  confirmarApresentacao(registro: RegistroApresentacaoNacional): Promise<void>;
}

export interface RepositorioRodizioNacional {
  /**
   * Lock exclusivo por escopo; todos os writers do rodízio precisam respeitar
   * o mesmo lock. Único solicitacaoId globalmente, inclusive entre escopos.
   * Um commit falho deve provocar rollback de cursor + apresentação.
   */
  emTransacaoExclusiva<T>(
    escopo: string,
    executar: (tx: TransacaoRodizioNacional) => Promise<T>,
  ): Promise<T>;
}

export interface ConsultaApresentacaoNacional {
  solicitacaoId: string;
  uf: string;
  municipio: string;
  servico: string;
}

export type ApresentacaoNacional =
  | { estado: "sem_profissional"; tecnicoId: null; repeticao: false }
  | { estado: "apresentado"; tecnicoId: string; repeticao: boolean };

function validarChave(v: string): string {
  if (typeof v !== "string" || !/^[a-zA-Z0-9_-]{8,128}$/.test(v)) {
    throw new RangeError("Identificador de solicitação interno inválido.");
  }
  return v;
}

export function escopoRodizioNacional(consulta: Omit<ConsultaApresentacaoNacional, "solicitacaoId">): string {
  if (!consulta) throw new RangeError("Consulta regional ausente.");
  const uf = typeof consulta.uf === "string" ? consulta.uf.trim().toUpperCase() : "";
  const municipio = typeof consulta.municipio === "string"
    ? consulta.municipio.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    : "";
  const servico = typeof consulta.servico === "string"
    ? consulta.servico.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    : "";
  if (!/^[A-Z]{2}$/.test(uf) || !municipio || !servico) {
    throw new RangeError("UF, município e serviço são obrigatórios.");
  }
  if (municipio.length > 100 || servico.length > 100 || /[|\n\r]/.test(municipio + servico)) {
    throw new RangeError("Escopo regional inválido.");
  }
  return [uf, municipio, servico].join("|");
}

/**
 * Função destinada EXCLUSIVAMENTE a um controlador autenticado no servidor.
 * Repositório deve garantir exclusividade e unicidade; nunca aceitar solicitacaoId
 * gerado no frontend sem validação de titularidade e autorização.
 */
export async function apresentarProximoTecnicoNacional(
  repositorio: RepositorioRodizioNacional,
  consulta: ConsultaApresentacaoNacional,
): Promise<ApresentacaoNacional> {
  if (!repositorio || typeof repositorio.emTransacaoExclusiva !== "function") {
    throw new TypeError("Repositório transacional obrigatório.");
  }
  validarChave(consulta?.solicitacaoId);
  const escopo = escopoRodizioNacional(consulta);
  return repositorio.emTransacaoExclusiva(escopo, async (tx) => {
    const anterior = await tx.buscarPorSolicitacao(consulta.solicitacaoId);
    if (anterior) {
      if (anterior.escopo !== escopo) {
        throw new Error("Tentativa de reutilizar a solicitação em outro escopo.");
      }
      return { estado: "apresentado", tecnicoId: anterior.tecnicoId, repeticao: true };
    }
    const ultimoApresentadoId = await tx.consultarUltimoApresentado();
    const candidatos = await tx.listarProfissionaisElegiveis();
    const parametro: ConsultaRodizioRegional = {
      uf: consulta.uf, municipio: consulta.municipio,
      servico: consulta.servico, ultimoApresentadoId,
    };
    const resultado = proximoTecnicoRegional(candidatos, parametro);
    if (!resultado.disponivel) {
      return { estado: "sem_profissional", tecnicoId: null, repeticao: false };
    }
    const registro: RegistroApresentacaoNacional = {
      solicitacaoId: consulta.solicitacaoId,
      escopo,
      tecnicoId: resultado.tecnicoId,
    };
    await tx.confirmarApresentacao(registro);
    return { estado: "apresentado", tecnicoId: resultado.tecnicoId, repeticao: false };
  });
}
