import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

/**
 * Testes NEGATIVOS da infraestrutura de testes (Micro-Rodada Qualidade 1.1).
 * Rodam em ambiente `node` (padrão do projeto unit).
 */
describe("isolamento de runners", () => {
  it("o ambiente padrão é Node — sem DOM disponível", () => {
    expect(typeof window).toBe("undefined");
    expect(typeof document).toBe("undefined");
  });

  it("Vitest NÃO coleta specs do Playwright (e2e/ está no exclude)", () => {
    const cfg = readFileSync("vitest.config.ts", "utf8");
    expect(cfg).toContain('"e2e/**"');
    expect(cfg).toContain('"playwright/**"');
    // nenhum include do Vitest aponta para e2e
    expect(cfg).not.toMatch(/include:\s*\[[^\]]*e2e\//);
  });

  it("Playwright NÃO coleta testes unitários (testDir restrito a e2e)", () => {
    const cfg = readFileSync("playwright.config.ts", "utf8");
    expect(cfg).toMatch(/testDir:\s*"e2e"/);
    expect(cfg).not.toMatch(/testDir:\s*"src"/);
  });

  it("suíte vazia é falha: passWithNoTests desligado em todos os projetos", () => {
    const cfg = readFileSync("vitest.config.ts", "utf8");
    const ocorrencias = cfg.match(/passWithNoTests:\s*false/g) ?? [];
    expect(ocorrencias.length).toBeGreaterThanOrEqual(4);
    expect(cfg).not.toMatch(/passWithNoTests:\s*true/);
  });
});
