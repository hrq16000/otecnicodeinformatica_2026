import { describe, expect, it } from "vitest";
import { DISCOVERY_PILLAR_LINKS, DISCOVERY_PILLAR_PATHS } from "../discoveryPillars";

const ESPERADAS = [
  "/diagnostico-tecnico",
  "/equipamentos-atendidos",
  "/areas-atendidas",
  "/coleta-e-entrega",
];

describe("pilares prioritários de descoberta", () => {
  it("mantém exatamente as quatro URLs inspecionadas no GSC", () => {
    expect([...DISCOVERY_PILLAR_PATHS].sort()).toEqual([...ESPERADAS].sort());
  });

  it("não repete paths e mantém texto de âncora descritivo", () => {
    expect(new Set(DISCOVERY_PILLAR_PATHS).size).toBe(DISCOVERY_PILLAR_PATHS.length);
    for (const item of DISCOVERY_PILLAR_LINKS) {
      expect(item.title.trim().length).toBeGreaterThan(5);
      expect(item.description.trim().length).toBeGreaterThan(30);
      expect(item.to.startsWith("/")).toBe(true);
    }
  });
});
