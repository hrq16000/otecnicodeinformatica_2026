import { describe, expect, it } from "vitest";
import {
  calcularCotacaoNacional,
  calcularDeslocamentoCentavos,
  POLITICA_NACIONAL_PROPOSTA,
  type EntradaCotacaoNacional,
} from "./cotacaoNacional";

const base: EntradaCotacaoNacional = {
  modalidade: "padrao",
  horasAdicionaisAprovadas: 0,
  distanciaIdaMetros: 3000,
  estacionamento: { tipo: "vaga_fornecida_pelo_cliente" },
};

describe("cotação nacional — proposta isolada", () => {
  it("não ativa checkout ou pagamento", () => {
    expect(POLITICA_NACIONAL_PROPOSTA.status).toBe("rascunho_nao_publicado");
    expect(calcularCotacaoNacional(base).aptaParaPagamento).toBe(false);
  });

  it("padrão: R$ 159,99 = R$ 150,00 técnico + R$ 9,99 taxa incluída", () => {
    const q = calcularCotacaoNacional(base);
    expect(q.totalClienteCentavos).toBe(15999);
    expect(q.totalTecnicoCentavos).toBe(15000);
    expect(q.taxaFixaPlataformaCentavos).toBe(999);
    expect(q.deslocamentoCentavos).toBe(0);
  });

  it("especial: R$ 359,99 = R$ 330,00 técnico + R$ 29,99 taxa incluída", () => {
    const q = calcularCotacaoNacional({ ...base, modalidade: "especial" });
    expect(q.totalClienteCentavos).toBe(35999);
    expect(q.totalTecnicoCentavos).toBe(33000);
    expect(q.taxaFixaPlataformaCentavos).toBe(2999);
  });

  it("não reaplica a taxa fixa na segunda e terceira hora", () => {
    const q = calcularCotacaoNacional({ ...base, horasAdicionaisAprovadas: 2 });
    expect(q.adicionaisCentavos).toBe(13998);
    expect(q.totalClienteCentavos).toBe(29997);
    expect(q.totalTecnicoCentavos).toBe(28998);
    expect(q.taxaFixaPlataformaCentavos).toBe(999);
  });

  it("especial com horas adicionais também mantém taxa fixa", () => {
    const q = calcularCotacaoNacional({
      ...base,
      modalidade: "especial",
      horasAdicionaisAprovadas: 1,
    });
    expect(q.totalClienteCentavos).toBe(42998);
    expect(q.totalTecnicoCentavos).toBe(39999);
    expect(q.taxaFixaPlataformaCentavos).toBe(2999);
  });

  it("3 km de ida inclusos: isento; imediatamente acima cobra ida+volta", () => {
    expect(calcularDeslocamentoCentavos(0)).toBe(0);
    expect(calcularDeslocamentoCentavos(2999)).toBe(0);
    expect(calcularDeslocamentoCentavos(3000)).toBe(0);
    expect(calcularDeslocamentoCentavos(3001)).toBe(900);
    expect(calcularDeslocamentoCentavos(10000)).toBe(3000);
  });

  it("30 km inclusive a R$ 1,50/km; acima, R$ 2/km ida+volta", () => {
    expect(calcularDeslocamentoCentavos(30000)).toBe(9000);
    expect(calcularDeslocamentoCentavos(30001)).toBe(12000);
    expect(calcularDeslocamentoCentavos(31000)).toBe(12400);
  });

  it("deslocamento e estacionamento aprovados são integralmente repassados", () => {
    const q = calcularCotacaoNacional({
      ...base,
      distanciaIdaMetros: 10000,
      estacionamento: { tipo: "reembolso_aprovado", valorCentavos: 1250 },
    });
    expect(q.deslocamentoCentavos).toBe(3000);
    expect(q.estacionamentoCentavos).toBe(1250);
    expect(q.totalClienteCentavos).toBe(20249);
    expect(q.totalTecnicoCentavos).toBe(19250);
    expect(q.totalClienteCentavos - q.totalTecnicoCentavos).toBe(999);
  });

  it("permite atendimento de 5 minutos pelo valor da primeira hora", () => {
    // O cálculo não depende da duração efetiva abaixo da primeira hora.
    expect(calcularCotacaoNacional(base).totalClienteCentavos).toBe(15999);
  });

  it("rejeita horas fracionadas ou negativas sem autorização de bloco", () => {
    expect(() => calcularCotacaoNacional({ ...base, horasAdicionaisAprovadas: 0.5 })).toThrow();
    expect(() => calcularCotacaoNacional({ ...base, horasAdicionaisAprovadas: -1 })).toThrow();
  });

  it("rejeita distância e estacionamento inválidos, sem produzir preço", () => {
    expect(() => calcularCotacaoNacional({ ...base, distanciaIdaMetros: -1 })).toThrow();
    expect(() => calcularCotacaoNacional({ ...base, distanciaIdaMetros: 3000.5 })).toThrow();
    expect(() =>
      calcularCotacaoNacional({
        ...base,
        estacionamento: { tipo: "reembolso_aprovado", valorCentavos: -1 },
      }),
    ).toThrow();
    expect(() =>
      calcularCotacaoNacional({ ...base, estacionamento: undefined! }),
    ).toThrow();
  });

  it("rejeita modalidade desconhecida e totais inseguros", () => {
    expect(() =>
      calcularCotacaoNacional({ ...base, modalidade: "outro" as "padrao" }),
    ).toThrow();
    expect(() =>
      calcularCotacaoNacional({ ...base, horasAdicionaisAprovadas: Number.MAX_SAFE_INTEGER }),
    ).toThrow();
  });
});
