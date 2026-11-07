import { describe, expect, it } from "vitest";
import { calcularCotacaoNacional, type EntradaCotacaoNacional } from "./cotacaoNacional";
import {
  condicoesAceitasPeloClienteNacional,
  type CondicoesVinculadasNacional,
  type ConsentimentoCotacaoNacional,
} from "./integridadeCotacaoNacional";
import { CONTRATACAO_NACIONAL_ATIVA } from "./contratacaoDiretaNacional";

const agora = "2026-11-07T12:00:00.000Z";
const parametros: EntradaCotacaoNacional = {
  modalidade: "padrao",
  horasAdicionaisAprovadas: 1,
  distanciaIdaMetros: 5000,
  estacionamento: { tipo: "reembolso_aprovado", valorCentavos: 1500 },
};
const condicoes: CondicoesVinculadasNacional = {
  solicitacaoId: "pedido_00000001",
  clienteId: "cliente_0001",
  tecnicoId: "tecnico_0001",
  servicoId: "formatacao",
  escopo: "Formatação do computador e instalação de drivers",
  revisao: 3,
  validadeAteUtc: "2026-11-08T12:00:00.000Z",
  parametros,
  valores: calcularCotacaoNacional(parametros),
};
const consentimento: ConsentimentoCotacaoNacional = {
  condicoes,
  clienteAutenticadoId: condicoes.clienteId,
  verificadoNoServidor: true,
  aceitoEmUtc: "2026-11-07T11:00:00.000Z",
};

const avaliar = (atual: CondicoesVinculadasNacional | null, aceito = consentimento, instante = agora, vigente = true) =>
  condicoesAceitasPeloClienteNacional(atual, aceito, instante, vigente);

describe("rodada 16 — cotacao e condicoes autorizadas (nao publicado)", () => {
  it("aceita apenas a proposta completa e preserva a flag de ativacao desligada", () => {
    expect(CONTRATACAO_NACIONAL_ATIVA).toBe(false);
    expect(avaliar(condicoes)).toBe(true);
    expect(condicoes.valores.aptaParaPagamento).toBe(false);
  });

  it("bloqueia mudanca de preco, modalidade e taxa sem novo consentimento", () => {
    expect(avaliar({ ...condicoes, valores: { ...condicoes.valores, totalClienteCentavos: 1 } })).toBe(false);
    const novaEntrada: EntradaCotacaoNacional = { ...parametros, modalidade: "especial" };
    expect(avaliar({ ...condicoes, parametros: novaEntrada, valores: calcularCotacaoNacional(novaEntrada) })).toBe(false);
    expect(avaliar({ ...condicoes, valores: { ...condicoes.valores, taxaFixaPlataformaCentavos: 0 } })).toBe(false);
  });

  it("bloqueia alteracao de servico, escopo, profissional, titular ou revisao", () => {
    expect(avaliar({ ...condicoes, servicoId: "instalacao" })).toBe(false);
    expect(avaliar({ ...condicoes, escopo: "Outra tarefa" })).toBe(false);
    expect(avaliar({ ...condicoes, tecnicoId: "tecnico_0002" })).toBe(false);
    expect(avaliar({ ...condicoes, clienteId: "cliente_0002" })).toBe(false);
    expect(avaliar({ ...condicoes, revisao: 4 })).toBe(false);
  });

  it("bloqueia mudanca de deslocamento, estacionamento e horas mesmo com valores iguais", () => {
    expect(avaliar({ ...condicoes, parametros: { ...parametros, distanciaIdaMetros: 5001 } })).toBe(false);
    expect(avaliar({ ...condicoes, parametros: { ...parametros, horasAdicionaisAprovadas: 2 } })).toBe(false);
    expect(avaliar({ ...condicoes, parametros: { ...parametros, estacionamento: { tipo: "vaga_fornecida_pelo_cliente" } } })).toBe(false);
  });

  it("exige identidade, prova de aceite e horario confiaveis", () => {
    expect(avaliar(null)).toBe(false);
    expect(condicoesAceitasPeloClienteNacional(condicoes, null, agora)).toBe(false);
    expect(avaliar(condicoes, { ...consentimento, clienteAutenticadoId: "cliente_0002" })).toBe(false);
    expect(avaliar(condicoes, { ...consentimento, verificadoNoServidor: false } as unknown as ConsentimentoCotacaoNacional)).toBe(false);
    expect(avaliar(condicoes, { ...consentimento, aceitoEmUtc: "2099-01-01T00:00:00.000Z" })).toBe(false);
    expect(avaliar(condicoes, consentimento, "hora-invalida")).toBe(false);
  });

  it("nega proposta vencida e permite somente replay integro de um aceite ja efetivado", () => {
    const depois = "2026-11-09T12:00:00.000Z";
    expect(avaliar(condicoes, consentimento, depois)).toBe(false);
    expect(avaliar(condicoes, consentimento, depois, false)).toBe(true);
    expect(avaliar({ ...condicoes, tecnicoId: "tecnico_0002" }, consentimento, depois, false)).toBe(false);
  });

  it("nega datas, revisoes e estruturas corrompidas mesmo quando a prova combina", () => {
    const corrupcao = [
      { ...condicoes, revisao: 0 },
      { ...condicoes, validadeAteUtc: "2026-02-30T00:00:00.000Z" },
      { ...condicoes, escopo: " " },
      { ...condicoes, parametros: { ...parametros, horasAdicionaisAprovadas: Number.NaN } },
      { ...condicoes, valores: { ...condicoes.valores, totalTecnicoCentavos: Number.NaN } },
    ];
    for (const atual of corrupcao) expect(avaliar(atual)).toBe(false);
  });

  it("aceita nova revisao somente com novo consentimento do mesmo cliente", () => {
    const mudanca = { ...condicoes, revisao: 4, escopo: "Formatação e backup" };
    expect(avaliar(mudanca)).toBe(false);
    expect(avaliar(mudanca, { ...consentimento, condicoes: mudanca })).toBe(true);
  });
});
