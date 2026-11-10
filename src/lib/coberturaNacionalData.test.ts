import { describe, expect, it } from "vitest";
import {
  CAPITAIS_BRASIL,
  LOCALIDADES_PARCEIRAS_INFORMADAS,
  TOTAL_LOCALIDADES_INFORMADAS,
} from "./coberturaNacionalData";

describe("cobertura nacional informada", () => {
  it("lista 27 capitais, cada UF uma vez, sem deduzir cobertura confirmada", () => {
    expect(CAPITAIS_BRASIL).toHaveLength(27);
    expect(new Set(CAPITAIS_BRASIL.map((item) => item.uf)).size).toBe(27);
    expect(CAPITAIS_BRASIL.find((item) => item.uf === "PR")?.cidade).toBe("Curitiba");
  });

  it("preserva as 79 localidades em 22 estados sem duplicidade por UF", () => {
    expect(LOCALIDADES_PARCEIRAS_INFORMADAS).toHaveLength(22);
    expect(TOTAL_LOCALIDADES_INFORMADAS).toBe(79);
    expect(new Set(LOCALIDADES_PARCEIRAS_INFORMADAS.map((g) => g.uf)).size).toBe(22);
    for (const grupo of LOCALIDADES_PARCEIRAS_INFORMADAS) {
      expect(new Set(grupo.cidades).size).toBe(grupo.cidades.length);
      expect(grupo.cidades.every((cidade) => cidade.length > 1)).toBe(true);
    }
  });

  it("retém cidades sensíveis à acentuação e à grafia", () => {
    const get = (uf: string) => LOCALIDADES_PARCEIRAS_INFORMADAS.find((g) => g.uf === uf)?.cidades;
    expect(get("BA")).toContain("Conceição do Coité");
    expect(get("PR")).toContain("Marechal Cândido Rondon");
    expect(get("RJ")).toContain("Campos dos Goytacazes");
    expect(get("SP")).toContain("Presidente Venceslau");
  });
});
