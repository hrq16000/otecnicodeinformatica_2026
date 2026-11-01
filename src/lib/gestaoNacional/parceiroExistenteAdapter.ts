/**
 * Rodada 6 — ponte de leitura do cadastro de parceiros JÁ EXISTENTE.
 *
 * Não consulta banco, não cria cadastro, não migra CPF/telefone, não escreve
 * dados e não modifica o plano anual já oferecido. Recebe SOMENTE recorte
 * administrativo previamente autorizado e prova nacional obtida no servidor.
 * O frontend / partners_public NUNCA deve emitir essa prova.
 *
 * "aprovado" e "ativo" no programa legado não significam elegibilidade:
 * precisa de validação SEPARADA da modalidade nacional, do vínculo com a
 * comunidade, da disponibilidade e das áreas/serviços confirmados.
 * O preço/plano anual do diretório NÃO se confunde com as taxas por chamado.
 */
import type { AdminPartner } from "@/lib/partnersAdminApi";
import type { TecnicoElegibilidadeNacional } from "./rodizioRegional";
import { DURACAO_MAXIMA_DISPONIBILIDADE_MS } from "./validacaoAdministrativa";

export type CadastroParceiroExistente = Pick<
  AdminPartner,
  "id" | "status" | "cidade" | "estado"
>;

/**
 * Informações que ainda NÃO existem no cadastro legado.
 * Futuro backend autenticado deve obter somente de registros verificados,
 * com trilha de auditoria, autorização e expiração; nunca do navegador.
 */
export interface ConfirmacaoOperacionalNacional {
  parceiroId: string;
  comunidadeWhatsapp: "confirmada" | "pendente" | "nao_confirmada";
  habilitacaoNacional: "validada" | "pendente" | "suspensa";
  termosDaModalidadeAceitos: boolean;
  disponibilidade: "disponivel" | "ocupado" | "indisponivel";
  /** Expiração da disponibilidade confirmada, UTC. */
  disponibilidadeExpiraEm: string;
  /** Municípios validados; não confiar automaticamente em texto de perfil. */
  municipiosValidados: readonly string[];
  /** Identificadores aprovados do catálogo, nunca serviços livres do perfil. */
  servicosValidados: readonly string[];
  distanciaIdaMetros: number | null;
  raioAtendimentoMetros: number | null;
}

export type ResultadoPonteCadastroNacional =
  | { elegivel: true; tecnico: TecnicoElegibilidadeNacional; motivo: null }
  | {
      elegivel: false;
      tecnico: null;
      motivo:
        | "parceiro_pendente"
        | "confirmacao_ausente"
        | "vinculo_invalido"
        | "comunidade_nao_confirmada"
        | "modalidade_nao_validada"
        | "indisponivel"
        | "disponibilidade_expirada"
        | "cobertura_nao_validada";
    };

const UFS = new Set<string>([
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT",
  "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO",
  "RR", "SC", "SP", "SE", "TO",
] as const);

const ESTADOS: Readonly<Record<string, string>> = {
  acre: "AC", alagoas: "AL", amapa: "AP", amazonas: "AM", bahia: "BA",
  ceara: "CE", "distrito federal": "DF", "espirito santo": "ES",
  goias: "GO", maranhao: "MA", "mato grosso": "MT",
  "mato grosso do sul": "MS", "minas gerais": "MG", para: "PA",
  paraiba: "PB", parana: "PR", pernambuco: "PE", piaui: "PI",
  "rio de janeiro": "RJ", "rio grande do norte": "RN",
  "rio grande do sul": "RS", rondonia: "RO", roraima: "RR",
  "santa catarina": "SC", "sao paulo": "SP", sergipe: "SE",
  tocantins: "TO",
};

function chave(valor: string): string {
  return valor.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function normalizarEstadoCadastro(estado: string): string | null {
  if (typeof estado !== "string") return null;
  const uf = estado.trim().toUpperCase();
  if (UFS.has(uf)) return uf;
  return ESTADOS[chave(estado)] ?? null;
}

function unicoNaoVazio(lista: readonly string[]): boolean {
  if (!Array.isArray(lista) || lista.length === 0 || lista.length > 100) return false;
  const unicos = new Set<string>();
  for (const item of lista) {
    if (typeof item !== "string" || !item.trim() || item.length > 150) return false;
    const normalizado = chave(item);
    if (unicos.has(normalizado)) return false;
    unicos.add(normalizado);
  }
  return true;
}

function metrosOk(valor: number | null): valor is number {
  return typeof valor === "number" && Number.isSafeInteger(valor) && valor >= 0;
}

function validadeDisponibilidadeOk(valor: string, agora: Date): boolean {
  if (typeof valor !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(valor)) return false;
  const fim = Date.parse(valor);
  const tempoRestante = fim - agora.getTime();
  // Evita disponibilidade indefinida por data inválida/anômala ou escrita fora do fluxo validado.
  return Number.isFinite(tempoRestante) && tempoRestante > 0 && tempoRestante <= DURACAO_MAXIMA_DISPONIBILIDADE_MS;
}

const negar = (motivo: Exclude<ResultadoPonteCadastroNacional, { elegivel: true }>["motivo"]): ResultadoPonteCadastroNacional =>
  ({ elegivel: false, tecnico: null, motivo });

/**
 * Não cria "técnicos ativos" de um print nem de registros públicos.
 * A disponibilidade só é aceita se houver confirmação complementar válida.
 * A função é pura; NÃO deve ser chamada com prova fornecida por clientes.
 */
export function adaptarParceiroExistenteParaNacional(
  parceiro: CadastroParceiroExistente | null,
  confirmacao: ConfirmacaoOperacionalNacional | null,
  agora: Date,
): ResultadoPonteCadastroNacional {
  if (!(agora instanceof Date) || !Number.isFinite(agora.getTime())) {
    throw new RangeError("Relógio de referência inválido.");
  }
  if (!parceiro || !["aprovado", "ativo"].includes(parceiro.status) || !parceiro.id?.trim()) {
    return negar("parceiro_pendente");
  }
  if (!confirmacao) return negar("confirmacao_ausente");
  if (confirmacao.parceiroId !== parceiro.id) return negar("vinculo_invalido");
  if (confirmacao.comunidadeWhatsapp !== "confirmada") return negar("comunidade_nao_confirmada");
  if (confirmacao.habilitacaoNacional !== "validada" || confirmacao.termosDaModalidadeAceitos !== true) {
    return negar("modalidade_nao_validada");
  }
  if (confirmacao.disponibilidade !== "disponivel") return negar("indisponivel");
  if (!validadeDisponibilidadeOk(confirmacao.disponibilidadeExpiraEm, agora)) {
    return negar("disponibilidade_expirada");
  }

  const uf = normalizarEstadoCadastro(parceiro.estado);
  if (
    !uf ||
    typeof parceiro.cidade !== "string" || !parceiro.cidade.trim() ||
    !unicoNaoVazio(confirmacao.municipiosValidados) ||
    !unicoNaoVazio(confirmacao.servicosValidados) ||
    !metrosOk(confirmacao.distanciaIdaMetros) ||
    !metrosOk(confirmacao.raioAtendimentoMetros) ||
    confirmacao.distanciaIdaMetros > confirmacao.raioAtendimentoMetros
  ) return negar("cobertura_nao_validada");

  return {
    elegivel: true,
    motivo: null,
    tecnico: {
      id: parceiro.id,
      comunidadeWhatsapp: "confirmada",
      cadastroPlataforma: "validado",
      habilitacao: "habilitado",
      disponibilidade: "disponivel",
      uf,
      municipiosAtendidos: [...confirmacao.municipiosValidados],
      servicosHabilitados: [...confirmacao.servicosValidados],
      distanciaIdaMetros: confirmacao.distanciaIdaMetros,
      raioAtendimentoMetros: confirmacao.raioAtendimentoMetros,
    },
  };
}
