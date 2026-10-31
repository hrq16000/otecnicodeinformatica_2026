/**
 * Rodada 7 — regras de autorização da validação nacional (DRAFT).
 *
 * Funções puras: NÃO autentica usuários, NÃO grava banco, NÃO cria endpoints,
 * NÃO confirma participação no WhatsApp e NÃO ativa disponibilidade real.
 * Atores, vínculos e estado anterior devem vir de backend autenticado,
 * consultados no mesmo contexto transacional que persiste a revisão.
 *
 * O profissional jamais pode validar comunidade, habilitação ou cobertura.
 * O administrador não pode aprovar seu próprio perfil.
 */
import type { ConfirmacaoOperacionalNacional } from "./parceiroExistenteAdapter";

export const DURACAO_MAXIMA_DISPONIBILIDADE_MS = 24 * 60 * 60 * 1000;

export interface RegistroValidacaoNacional extends ConfirmacaoOperacionalNacional {
  /** ID da conta titular derivado do vínculo autenticado com partners.user_id. */
  titularUserId: string | null;
  /** Revisão para atualização condicional (compare-and-swap obrigatório no banco). */
  revisao: number;
  /** Versão dos termos aceitos pelo próprio profissional. */
  versaoTermosAceita: string | null;
}

export interface AtorValidadoNacional {
  /** Esse papel e ID DEVEM vir da sessão/roles verificadas no backend. */
  papel: "administrador" | "profissional";
  userId: string;
  sessaoAutenticadaNoServidor: boolean;
}

export type AcaoValidacaoNacional =
  | { tipo: "confirmar_comunidade"; confirmacao: "confirmada" | "nao_confirmada"; referenciaEvidencia: string }
  | { tipo: "validar_habilitacao"; municipios: readonly string[]; servicos: readonly string[]; raioMetros: number; referenciaEvidencia: string }
  | { tipo: "suspender_habilitacao"; motivoInterno: string }
  | { tipo: "aceitar_termos"; versao: string }
  | { tipo: "alterar_disponibilidade"; disponibilidade: "disponivel" | "indisponivel"; expiraEm: string | null };

export interface ResultadoAtualizacaoNacional {
  registro: RegistroValidacaoNacional;
  evento: {
    parceiroId: string;
    atorId: string;
    acao: AcaoValidacaoNacional["tipo"];
    revisao: number;
    /** Referência interna de prova de comunidade/habilitação, jamais conteúdo do WhatsApp. */
    referenciaEvidencia?: string;
  };
}

function stringCurta(v: unknown, max = 160): v is string {
  return typeof v === "string" && v.trim().length > 0 && v.length <= max;
}

function listaValidada(lista: readonly string[]): boolean {
  if (!Array.isArray(lista) || lista.length === 0 || lista.length > 100) return false;
  const vistos = new Set<string>();
  for (const nome of lista) {
    if (!stringCurta(nome, 120)) return false;
    const chave = nome.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    if (vistos.has(chave)) return false;
    vistos.add(chave);
  }
  return true;
}

function expiraValidamente(expiraEm: string | null, agora: Date): boolean {
  if (typeof expiraEm !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(expiraEm)) {
    return false;
  }
  const fim = Date.parse(expiraEm);
  const duracao = fim - agora.getTime();
  return Number.isFinite(duracao) && duracao > 0 && duracao <= DURACAO_MAXIMA_DISPONIBILIDADE_MS;
}

/**
 * Retorna uma nova versão e metadados mínimos de auditoria. O adaptador real
 * precisará validar autenticação, provas e revisão no SERVIDOR, persistir de
 * modo atômico e nunca permitir escrita direta de campos privilegiados.
 */
export function aplicarValidacaoNacional(
  atual: RegistroValidacaoNacional,
  ator: AtorValidadoNacional,
  acao: AcaoValidacaoNacional,
  revisaoEsperada: number,
  agora: Date,
): ResultadoAtualizacaoNacional {
  if (!atual || !ator || !acao || !(agora instanceof Date) || !Number.isFinite(agora.getTime())) {
    throw new Error("Solicitação de alteração inválida.");
  }
  if (
    ator.sessaoAutenticadaNoServidor !== true ||
    !stringCurta(ator.userId) ||
    !stringCurta(atual.parceiroId) ||
    !Number.isSafeInteger(atual.revisao) ||
    atual.revisao < 0 ||
    !Number.isSafeInteger(revisaoEsperada) ||
    atual.revisao !== revisaoEsperada
  ) {
    throw new Error("Acesso não autorizado ou revisão de cadastro desatualizada.");
  }
  // Sem titular autenticado vinculado ao cadastro, nenhuma habilitação é liberada.
  if (!stringCurta(atual.titularUserId) && acao.tipo !== "suspender_habilitacao") {
    throw new Error("Cadastro sem titular autenticado: aprovação bloqueada.");
  }
  const administrador = ator.papel === "administrador";
  const titular = ator.papel === "profissional" && atual.titularUserId === ator.userId;
  const acaoAdmin = ["confirmar_comunidade", "validar_habilitacao", "suspender_habilitacao"].includes(acao.tipo);
  const acaoTitular = ["aceitar_termos", "alterar_disponibilidade"].includes(acao.tipo);
  if (
    (acaoAdmin && (!administrador || atual.titularUserId === ator.userId)) ||
    (acaoTitular && !titular) ||
    (!acaoAdmin && !acaoTitular)
  ) {
    throw new Error("Ação não permitida para este usuário.");
  }
  const proximo: RegistroValidacaoNacional = {
    ...atual,
    municipiosValidados: [...atual.municipiosValidados],
    servicosValidados: [...atual.servicosValidados],
  };

  switch (acao.tipo) {
    case "confirmar_comunidade": {
      if (!stringCurta(acao.referenciaEvidencia) ||
          !["confirmada", "nao_confirmada"].includes(acao.confirmacao)) {
        throw new Error("Validação da comunidade exige evidência administrativa.");
      }
      proximo.comunidadeWhatsapp = acao.confirmacao;
      if (acao.confirmacao !== "confirmada") {
        proximo.habilitacaoNacional = "suspensa";
        proximo.disponibilidade = "indisponivel";
        proximo.disponibilidadeExpiraEm = "";
      }
      break;
    }
    case "validar_habilitacao": {
      if (
        proximo.comunidadeWhatsapp !== "confirmada" ||
        proximo.termosDaModalidadeAceitos !== true ||
        !stringCurta(proximo.versaoTermosAceita) ||
        !stringCurta(acao.referenciaEvidencia) ||
        !listaValidada(acao.municipios) ||
        !listaValidada(acao.servicos) ||
        !Number.isSafeInteger(acao.raioMetros) ||
        acao.raioMetros <= 0
      ) {
        throw new Error("Habilitação exige comunidade, termos e cobertura validados.");
      }
      proximo.habilitacaoNacional = "validada";
      proximo.municipiosValidados = [...acao.municipios];
      proximo.servicosValidados = [...acao.servicos];
      proximo.raioAtendimentoMetros = acao.raioMetros;
      proximo.disponibilidade = "indisponivel";
      proximo.disponibilidadeExpiraEm = "";
      break;
    }
    case "suspender_habilitacao": {
      if (!stringCurta(acao.motivoInterno, 500)) {
        throw new Error("Suspensão exige justificativa interna.");
      }
      proximo.habilitacaoNacional = "suspensa";
      proximo.disponibilidade = "indisponivel";
      proximo.disponibilidadeExpiraEm = "";
      break;
    }
    case "aceitar_termos": {
      if (!stringCurta(acao.versao, 80)) throw new Error("Versão dos termos inválida.");
      proximo.termosDaModalidadeAceitos = true;
      proximo.versaoTermosAceita = acao.versao;
      // Alterar termos exige nova aprovação quando já estava habilitado.
      proximo.habilitacaoNacional = "pendente";
      proximo.disponibilidade = "indisponivel";
      proximo.disponibilidadeExpiraEm = "";
      break;
    }
    case "alterar_disponibilidade": {
      if (!["disponivel", "indisponivel"].includes(acao.disponibilidade)) {
        throw new Error("Disponibilidade inválida.");
      }
      if (acao.disponibilidade === "disponivel") {
        if (
          proximo.comunidadeWhatsapp !== "confirmada" ||
          proximo.habilitacaoNacional !== "validada" ||
          proximo.termosDaModalidadeAceitos !== true ||
          !expiraValidamente(acao.expiraEm, agora)
        ) {
          throw new Error("Profissional sem habilitação vigente ou prazo válido.");
        }
        proximo.disponibilidadeExpiraEm = acao.expiraEm!;
      } else {
        proximo.disponibilidadeExpiraEm = "";
      }
      proximo.disponibilidade = acao.disponibilidade;
      break;
    }
    default: {
      const impossivel: never = acao;
      throw new Error("Ação não reconhecida: " + JSON.stringify(impossivel));
    }
  }

  proximo.revisao += 1;
  return {
    registro: proximo,
    evento: {
      parceiroId: atual.parceiroId,
      atorId: ator.userId,
      acao: acao.tipo,
      revisao: proximo.revisao,
      ...(acao.tipo === "confirmar_comunidade" || acao.tipo === "validar_habilitacao"
        ? { referenciaEvidencia: acao.referenciaEvidencia }
        : {}),
    },
  };
}
