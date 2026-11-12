import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Regra institucional do projeto: nenhuma imagem nova gerada por IA.
// Verifica o texto publicado pelo hub sem carregar a árvore React.
describe("política pública das imagens editoriais", () => {
  it("exige origem comprovada e reprova imagens geradas por IA", () => {
    const blog = readFileSync(new URL("../../src/pages/Blog.tsx", import.meta.url), "utf8");
    const match = blog.match(/const EDITORIAL_POLICY = \[([\s\S]*?)\];/);

    expect(match, "A política pública deve existir").not.toBeNull();
    const policy = match[1];
    expect(policy).toContain("imagens próprias ou licenciadas");
    expect(policy).toContain("imagens geradas por IA não são aprovadas");
    expect(policy).not.toContain("própria, licenciada ou gerada");
  });
});
