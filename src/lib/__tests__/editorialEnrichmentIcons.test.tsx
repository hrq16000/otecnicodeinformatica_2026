import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { EnriquecimentoFase2 } from "@/components/editorial/EnriquecimentoFase2";

vi.mock("@/lib/enriquecimentoFase2", () => ({
  FASE2_REVISADO_EM: "2026-11-14",
  getLinksEspecificosFase2: () => [],
  getEnriquecimentoFase2: () => ({
    id: "hardware",
    titulo: "Diagnóstico seguro",
    intro: "Confira antes de desmontar.",
    ateOndeIr: ["Faça uma verificação por vez."],
    quandoParar: ["Pare diante de sinais de dano."],
    fontes: [],
    links: [],
  }),
}));

describe("Ícones no enriquecimento editorial", () => {
  it("renderiza no servidor com os quatro títulos em texto", () => {
    const html = renderToStaticMarkup(<EnriquecimentoFase2 slug="guia-de-teste" />);
    const headings = [...html.matchAll(/<h3[^>]*>(.*?)<\/h3>/g)].map(([, value]) => value);
    expect(headings).toHaveLength(4);
    const labels = ["Até onde ir sozinho","Quando parar","Fontes primárias consultadas","Continue pelo caminho certo"];
    headings.forEach((heading, index) => {
      expect(heading).toContain("<svg");
      expect(heading).toContain('aria-hidden="true"');
      expect(heading).toContain('focusable="false"');
      expect(heading).toContain(labels[index]);
    });
  });
});
