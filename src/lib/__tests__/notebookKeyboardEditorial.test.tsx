import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { blogPostsContentBase } from "@/data/blogPostsContent";
import { BlogPostFAQ } from "@/components/BlogPostFAQ";
import { getArticleSources } from "@/lib/blogEditorialSources";
import { getEditorialApproval } from "@/lib/blogEditorialRegistry";

const jsonLd = vi.hoisted(() => ({ slot: vi.fn() }));
vi.mock("@/lib/jsonLdSlots", () => ({
  SCHEMA_SLOTS: { faq: "faq" }, SLOT_PRIORITY: { page: 10 }, useJsonLdSlot: jsonLd.slot,
}));
vi.mock("@/lib/router-compat", () => ({
  Link: ({ to, children }: { to: string; children: ReactNode }) => <a href={to}>{children}</a>,
}));

describe("Teclado de notebook: diagnóstico sem desmontagem", () => {
  const slug = "teclado-de-notebook-nao-funciona-o-que-verificar";
  const post = blogPostsContentBase[slug];
  it("mantém publicação e aprovação e registra a revisão", () => {
    expect(post.date).toBe("2026-09-03");
    expect(getEditorialApproval(slug)).toMatchObject({
      status: "approved", approvedAt: "2026-09-03", reviewedAt: "2026-11-11",
    });
  });
  it("trata líquido antes dos testes e limita as inferências", () => {
    const html = renderToStaticMarkup(post.content);
    expect(html.indexOf("Caiu líquido? Pare antes de testar")).toBeGreaterThan(0);
    expect(html.indexOf("Caiu líquido? Pare antes de testar")).toBeLessThan(html.indexOf("O que o sintoma ajuda a separar"));
    for (const phrase of [
      "Não volte a ligar nem coloque para carregar", "não abra o gabinete para soltar a bateria interna",
      "ABNT2 se ele corresponder ao teclado físico", "Teclas de Filtro", "sem hub",
      "Isso não separa teclado, cabo, conector", "não testa o teclado físico",
      "não exclui falha intermitente",
    ]) expect(html).toContain(phrase);
  });
  it("exibe as seis fontes oficiais", () => {
    const html = renderToStaticMarkup(post.content);
    const sources = getArticleSources(slug);
    expect(sources).toHaveLength(6);
    for (const source of sources) expect(html).toContain(source.url);
  });
  it("espelha cinco FAQs técnicas visíveis no FAQPage", () => {
    const html = renderToStaticMarkup(<BlogPostFAQ slug={slug} category={post.category} />);
    const schema = jsonLd.slot.mock.calls.at(-1)?.[1];
    expect(schema?.["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(5);
    for (const question of schema.mainEntity) {
      expect(html).toContain(question.name);
      expect(html).toContain(question.acceptedAnswer.text);
    }
    expect(html).not.toMatch(/Quanto custa|R\$|WhatsApp/);
  });
});
