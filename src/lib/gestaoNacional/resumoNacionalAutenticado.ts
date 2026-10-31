/**
 * Rodada 10 — leitura de resumo nacional SOMENTE a partir de backend autenticado.
 *
 * Não exportar diretamente como endpoint nem chamar do navegador.
 * Não possui fallback para partners_public, dados mockados ou sessão do cliente.
 * Falha fechada quando não há identidade validada e vínculo no banco.
 */
import type { RegistroValidacaoNacional } from "./validacaoAdministrativa";
import type { ResumoNacionalTitular } from "./areaNacionalFeatureGate";

export type EstadoResumoNacional =
  | { estado: "nao_autenticado" | "sem_cadastro" | "nao_inscrito"; resumo: null }
  | { estado: "pronto"; resumo: ResumoNacionalTitular };

export interface IdentidadeNacionalConfiavel {
  userId: string;
  autenticadaNoServidor: true;
}

export interface ContextoLeituraNacional {
  /** Resolver sessão validada em backend (NUNCA confiar em ID recebido por query). */
  identidadeAutenticada(): Promise<IdentidadeNacionalConfiavel | null>;
  /** Filtra por partners.user_id, sob RLS ou permissão server-side equivalente. */
  parceiroDoUsuario(userId: string): Promise<{ id: string; userId: string } | null>;
  /** Só consultável por backend autenticado, usando parceiro resolvido acima. */
  validacaoDoParceiro(parceiroId: string): Promise<RegistroValidacaoNacional | null>;
}

export interface RepositorioLeituraNacional {
  /**
   * Executa sob identidade confiável vinculada à requisição, nunca em singleton
   * com session mutable compartilhada entre usuários.
   */
  emContextoAutenticado<T>(executar: (tx: ContextoLeituraNacional) => Promise<T>): Promise<T>;
}

function identificadorConfiavel(id: unknown): id is string {
  return typeof id === "string" && /^[A-Za-z0-9_-]{5,128}$/.test(id);
}

/** Projeção mínima; não inclui nome, telefone, documentos, evidência ou endereço. */
function projetarResumo(registro: RegistroValidacaoNacional): ResumoNacionalTitular {
  return {
    comunidade:
      registro.comunidadeWhatsapp === "confirmada" ? "confirmada"
        : registro.comunidadeWhatsapp === "nao_confirmada" ? "nao_confirmada" : "pendente",
    habilitacao:
      registro.habilitacaoNacional === "validada" ? "validada"
        : registro.habilitacaoNacional === "suspensa" ? "suspensa" : "pendente",
    termos: registro.termosDaModalidadeAceitos === true ? "aceitos" : "pendente",
    disponibilidade:
      registro.disponibilidade === "disponivel" ? "disponivel"
        : registro.disponibilidade === "ocupado" ? "ocupado" : "indisponivel",
    disponibilidadeExpiraEm:
      typeof registro.disponibilidadeExpiraEm === "string" &&
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(registro.disponibilidadeExpiraEm)
        ? registro.disponibilidadeExpiraEm : null,
  };
}

/**
 * Não aceita parceiroId ou userId de fora: identidade e vínculo são resolvidos
 * do lado do servidor, pela consulta do próprio titular.
 * O caller deve transformar erros de autorização em respostas HTTP genéricas
 * sem revelar dados da linha de outros usuários.
 */
export async function lerResumoNacionalDoTitular(
  repositorio: RepositorioLeituraNacional,
): Promise<EstadoResumoNacional> {
  if (!repositorio || typeof repositorio.emContextoAutenticado !== "function") {
    throw new TypeError("Repositório de leitura autenticada não configurado.");
  }

  return repositorio.emContextoAutenticado(async (tx) => {
    const identidade = await tx.identidadeAutenticada();
    if (
      !identidade ||
      identidade.autenticadaNoServidor !== true ||
      !identificadorConfiavel(identidade.userId)
    ) return { estado: "nao_autenticado", resumo: null };

    const parceiro = await tx.parceiroDoUsuario(identidade.userId);
    if (!parceiro) return { estado: "sem_cadastro", resumo: null };
    if (
      !identificadorConfiavel(parceiro.id) ||
      parceiro.userId !== identidade.userId
    ) throw new Error("Vínculo do profissional inconsistente.");

    const registro = await tx.validacaoDoParceiro(parceiro.id);
    if (!registro) return { estado: "nao_inscrito", resumo: null };
    if (
      registro.parceiroId !== parceiro.id ||
      registro.titularUserId !== identidade.userId
    ) throw new Error("Registro nacional não pertence ao titular autenticado.");

    return { estado: "pronto", resumo: projetarResumo(registro) };
  });
}
