import { describe, expect, it } from "vitest";
import { commercialConfig } from "@/lib/config/commercial";
import {
  REGIOES_COMUNIDADE,
  DDD_SOMENTE_HISTORICO,
  regioesPublicaveis,
  regioesPorUf,
  ufDaRegiao,
} from "./comunidadePublica";

describe("comunidade nacional", () => {
  it("converte nomes de estados e siglas retornados pelo IP", () => {
    expect(ufDaRegiao("Paraná")).toBe("PR");
    expect(ufDaRegiao("BR-SP")).toBe("SP");
    expect(ufDaRegiao("rio grande do sul")).toBe("RS");
    expect(ufDaRegiao("")).toBeNull();
  });

  it("não inventa profissionais quando não há DDD público confirmado", () => {
    expect(regioesPublicaveis().length).toBe(35);
    expect(DDD_SOMENTE_HISTORICO.length).toBe(17);
    const dddsConfirmados = new Set(REGIOES_COMUNIDADE.map((r) => r.ddd));
    expect(dddsConfirmados.size).toBe(35);
    expect(DDD_SOMENTE_HISTORICO.every((r) => !dddsConfirmados.has(r.ddd))).toBe(true);
    expect(new Set([...dddsConfirmados, ...DDD_SOMENTE_HISTORICO.map((r) => r.ddd)]).size).toBe(52);
    expect(regioesPorUf("SC").every((item) => item.uf === "SC")).toBe(true);
    expect(regioesPublicaveis().every((item) => /^\d{2}$/.test(item.ddd))).toBe(true);
  });

  it("inclui a taxa uma única vez no valor de referência e não cobra o técnico", () => {
    const p = commercialConfig.comunidadeNacional;
    expect(p.atendimentoProgramadoCentavos).toBe(p.repasseTecnicoCentavos + p.taxaClienteCentavos);
    expect(p.participacaoTecnicoCentavos).toBe(0);
  });
});
