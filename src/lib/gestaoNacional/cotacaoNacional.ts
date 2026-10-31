/**
 * Cotação da modalidade nacional — proposta NÃO ativada.
 *
 * Contratação direta entre cliente e técnico. Este módulo NÃO seleciona técnicos,
 * não aciona profissionais, não cria cobranças nem altera preços locais existentes.
 *
 * PREMISSAS A VALIDAR ANTES DE QUALQUER INTEGRAÇÃO:
 * - A faixa (> 3 km e > 30 km) é definida pela distância de IDA e sua tarifa
 *   incide na distância TOTAL de ida + volta, não só no excedente.
 * - Quilometragem informada em metros inteiros; arredondamento monetário ao
 *   centavo mais próximo. A transição de faixa pode causar salto de preço.
 * - Hora adicional é bloco INTEIRO expressamente aprovado. Tempo parcial
 *   depende de política própria, não calculada automaticamente aqui.
 * - Hora adicional é repassada integralmente ao técnico; taxa fixa por pedido.
 * - Estacionamento tem valor conhecido previamente ou vaga fornecida.
 *
 * Todos os valores monetários em centavos (BRL), nunca float em reais.
 */
export const POLITICA_NACIONAL_PROPOSTA = {
  status: "rascunho_nao_publicado",
  moeda: "BRL",
  padrao: {
    totalPrimeiraHoraCentavos: 15999,
    repassePrimeiraHoraCentavos: 15000,
    taxaFixaPlataformaCentavos: 999,
  },
  especial: {
    totalPrimeiraHoraCentavos: 35999,
    repassePrimeiraHoraCentavos: 33000,
    taxaFixaPlataformaCentavos: 2999,
  },
  horaAdicionalCentavos: 6999,
  deslocamentoGratuitoAteMetros: 3000,
  faixaSuperiorAcimaDeMetros: 30000,
  tarifaIntermediariaCentavosKm: 150,
  tarifaSuperiorCentavosKm: 200,
} as const;

export type ModalidadeNacional = "padrao" | "especial";

export type EstacionamentoNacional =
  | { tipo: "vaga_fornecida_pelo_cliente" }
  | { tipo: "reembolso_aprovado"; valorCentavos: number };

export interface EntradaCotacaoNacional {
  modalidade: ModalidadeNacional;
  /** Blocos completos de uma hora, previamente autorizados. */
  horasAdicionaisAprovadas: number;
  /** Distância só de ida, em metros inteiros, sem revelar endereço privado. */
  distanciaIdaMetros: number;
  estacionamento: EstacionamentoNacional;
}

export interface CotacaoNacional {
  modalidade: ModalidadeNacional;
  primeiraHoraCentavos: number;
  adicionaisCentavos: number;
  deslocamentoCentavos: number;
  estacionamentoCentavos: number;
  taxaFixaPlataformaCentavos: number;
  totalClienteCentavos: number;
  totalTecnicoCentavos: number;
  /** Segurança: nunca tratar esta cotação isolada como autorização de cobrança. */
  aptaParaPagamento: false;
}

function inteiroNaoNegativo(valor: number, campo: string): void {
  if (!Number.isSafeInteger(valor) || valor < 0) {
    throw new RangeError(`${campo} deve ser inteiro não negativo e seguro.`);
  }
}

function centavosSeguros(valor: bigint, campo: string): number {
  if (valor < 0n || valor > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new RangeError(`${campo} ultrapassa o limite monetário seguro.`);
  }
  return Number(valor);
}

/**
 * Regra de interpretação provisória: a tarifa é aplicada à ida+volta inteira
 * quando a distância de IDA ultrapassa o limiar. Pendente de aceite operacional.
 */
export function calcularDeslocamentoCentavos(distanciaIdaMetros: number): number {
  inteiroNaoNegativo(distanciaIdaMetros, "distanciaIdaMetros");
  const p = POLITICA_NACIONAL_PROPOSTA;
  if (distanciaIdaMetros <= p.deslocamentoGratuitoAteMetros) return 0;

  const tarifaCentavosKm =
    distanciaIdaMetros > p.faixaSuperiorAcimaDeMetros
      ? p.tarifaSuperiorCentavosKm
      : p.tarifaIntermediariaCentavosKm;

  // Metros -> quilômetros, percurso dobrado, arredondamento half-up em centavos.
  const numerador = BigInt(distanciaIdaMetros) * 2n * BigInt(tarifaCentavosKm);
  return centavosSeguros((numerador + 500n) / 1000n, "deslocamento");
}

export function calcularCotacaoNacional(entrada: EntradaCotacaoNacional): CotacaoNacional {
  if (!entrada || (entrada.modalidade !== "padrao" && entrada.modalidade !== "especial")) {
    throw new RangeError("Modalidade nacional inválida.");
  }
  inteiroNaoNegativo(entrada.horasAdicionaisAprovadas, "horasAdicionaisAprovadas");
  inteiroNaoNegativo(entrada.distanciaIdaMetros, "distanciaIdaMetros");

  const estacionamento = entrada.estacionamento;
  if (!estacionamento || !["vaga_fornecida_pelo_cliente", "reembolso_aprovado"].includes(estacionamento.tipo)) {
    throw new RangeError("Estacionamento precisa ser definido antes da cotação.");
  }
  if (estacionamento.tipo === "reembolso_aprovado") {
    inteiroNaoNegativo(estacionamento.valorCentavos, "estacionamento.valorCentavos");
  }

  const p = POLITICA_NACIONAL_PROPOSTA;
  const base = p[entrada.modalidade];
  const adicionais = BigInt(entrada.horasAdicionaisAprovadas) * BigInt(p.horaAdicionalCentavos);
  const deslocamentoCentavos = calcularDeslocamentoCentavos(entrada.distanciaIdaMetros);
  const estacionamentoCentavos =
    estacionamento.tipo === "reembolso_aprovado" ? estacionamento.valorCentavos : 0;

  const adicionaisCentavos = centavosSeguros(adicionais, "horas adicionais");
  const totalClienteCentavos = centavosSeguros(
    BigInt(base.totalPrimeiraHoraCentavos) +
      adicionais +
      BigInt(deslocamentoCentavos) +
      BigInt(estacionamentoCentavos),
    "total do cliente",
  );
  const totalTecnicoCentavos = centavosSeguros(
    BigInt(base.repassePrimeiraHoraCentavos) +
      adicionais +
      BigInt(deslocamentoCentavos) +
      BigInt(estacionamentoCentavos),
    "repasse ao técnico",
  );

  if (totalClienteCentavos !== totalTecnicoCentavos + base.taxaFixaPlataformaCentavos) {
    throw new Error("Inconsistência: total não corresponde a repasse + taxa fixa.");
  }

  return {
    modalidade: entrada.modalidade,
    primeiraHoraCentavos: base.totalPrimeiraHoraCentavos,
    adicionaisCentavos,
    deslocamentoCentavos,
    estacionamentoCentavos,
    taxaFixaPlataformaCentavos: base.taxaFixaPlataformaCentavos,
    totalClienteCentavos,
    totalTecnicoCentavos,
    aptaParaPagamento: false,
  };
}
