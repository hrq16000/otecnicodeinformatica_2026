/**
 * Rodada 16 — vínculo entre a proposta vigente e as condições aceitas.
 * Contrato isolado para adaptação server-side; NÃO habilita atendimento,
 * pagamento, endpoints, banco, acionamento ou publicidade nacional.
 *
 * O backend deve guardar a proposta imutável e o consentimento autenticado,
 * incrementar a revisão em QUALQUER alteração, e revalidar tudo sob o mesmo
 * lock da solicitação antes de emitir cobrança ou permitir aceite do técnico.
 */
import {
  calcularCotacaoNacional,
  type EntradaCotacaoNacional,
  type CotacaoNacional,
} from "./cotacaoNacional";

export interface CondicoesVinculadasNacional {
  solicitacaoId: string;
  clienteId: string;
  tecnicoId: string;
  servicoId: string;
  /** Texto exato apresentado ao cliente, sem dados pessoais. */
  escopo: string;
  revisao: number;
  validadeAteUtc: string;
  parametros: EntradaCotacaoNacional;
  valores: CotacaoNacional;
}

export interface ConsentimentoCotacaoNacional {
  /** Documento imutável persistido com a prova de aceite. */
  condicoes: CondicoesVinculadasNacional;
  /** Identidade verificada no backend no MOMENTO da aceitação. */
  clienteAutenticadoId: string;
  verificadoNoServidor: true;
  aceitoEmUtc: string;
}

function idSeguro(valor: unknown): valor is string {
  return typeof valor === "string" && /^[a-zA-Z0-9_-]{8,128}$/.test(valor);
}

function instanteUtc(valor: unknown): number | null {
  if (typeof valor !== "string") return null;
  const data = new Date(valor);
  if (!Number.isFinite(data.getTime()) || data.toISOString() !== valor) return null;
  return data.getTime();
}

function parametrosIguais(a: EntradaCotacaoNacional, b: EntradaCotacaoNacional): boolean {
  return a.modalidade === b.modalidade &&
    a.horasAdicionaisAprovadas === b.horasAdicionaisAprovadas &&
    a.distanciaIdaMetros === b.distanciaIdaMetros &&
    a.estacionamento.tipo === b.estacionamento.tipo &&
    (a.estacionamento.tipo !== "reembolso_aprovado" ||
      (b.estacionamento.tipo === "reembolso_aprovado" &&
        a.estacionamento.valorCentavos === b.estacionamento.valorCentavos));
}

function valoresIguais(a: CotacaoNacional, b: CotacaoNacional): boolean {
  return a.modalidade === b.modalidade &&
    a.primeiraHoraCentavos === b.primeiraHoraCentavos &&
    a.adicionaisCentavos === b.adicionaisCentavos &&
    a.deslocamentoCentavos === b.deslocamentoCentavos &&
    a.estacionamentoCentavos === b.estacionamentoCentavos &&
    a.taxaFixaPlataformaCentavos === b.taxaFixaPlataformaCentavos &&
    a.totalClienteCentavos === b.totalClienteCentavos &&
    a.totalTecnicoCentavos === b.totalTecnicoCentavos &&
    a.aptaParaPagamento === false &&
    b.aptaParaPagamento === false;
}

function condicoesValidas(valor: unknown): valor is CondicoesVinculadasNacional {
  try {
    if (!valor || typeof valor !== "object") return false;
    const c = valor as CondicoesVinculadasNacional;
    if (!idSeguro(c.solicitacaoId) || !idSeguro(c.clienteId) ||
        !idSeguro(c.tecnicoId) || !idSeguro(c.servicoId) ||
        typeof c.escopo !== "string" || c.escopo.trim().length === 0 ||
        c.escopo.length > 2000 || !Number.isSafeInteger(c.revisao) ||
        c.revisao < 1 || instanteUtc(c.validadeAteUtc) === null ||
        !c.parametros || !c.valores) return false;
    return valoresIguais(calcularCotacaoNacional(c.parametros), c.valores);
  } catch {
    return false;
  }
}

function condicoesIguais(a: CondicoesVinculadasNacional, b: CondicoesVinculadasNacional): boolean {
  return a.solicitacaoId === b.solicitacaoId &&
    a.clienteId === b.clienteId &&
    a.tecnicoId === b.tecnicoId &&
    a.servicoId === b.servicoId &&
    a.escopo === b.escopo &&
    a.revisao === b.revisao &&
    a.validadeAteUtc === b.validadeAteUtc &&
    parametrosIguais(a.parametros, b.parametros) &&
    valoresIguais(a.valores, b.valores);
}

/**
 * Rejeita proposta divergente, vencida ou sem prova de aceite do cliente.
 * O único argumento que pode sair do navegador é a revisão solicitada;
 * ambas as estruturas devem ser CONSULTADAS no backend, nunca montadas
 * a partir de JSON enviado pelo usuário. O relógio vem do servidor.
 *
 * Para retry de aceite já persistido, a validade pode ter vencido; nesse
 * caso ainda é obrigatório verificar igualdade da proposta imutável.
 */
export function condicoesAceitasPeloClienteNacional(
  atual: CondicoesVinculadasNacional | null,
  consentimento: ConsentimentoCotacaoNacional | null,
  agoraUtc: string,
  exigirCotacaoVigente = true,
): boolean {
  const agora = instanteUtc(agoraUtc);
  if (agora === null || !condicoesValidas(atual) || !consentimento ||
      consentimento.verificadoNoServidor !== true ||
      !condicoesValidas(consentimento.condicoes) ||
      !idSeguro(consentimento.clienteAutenticadoId)) return false;

  const aceitoEm = instanteUtc(consentimento.aceitoEmUtc);
  const expiraEm = instanteUtc(atual.validadeAteUtc);
  if (aceitoEm === null || expiraEm === null || aceitoEm > agora ||
      aceitoEm >= expiraEm ||
      (exigirCotacaoVigente && agora >= expiraEm)) return false;

  return consentimento.clienteAutenticadoId === atual.clienteId &&
    condicoesIguais(atual, consentimento.condicoes);
}
