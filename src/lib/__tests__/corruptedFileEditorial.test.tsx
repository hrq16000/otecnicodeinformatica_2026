import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { blogSupplementalPosts } from "@/data/blogSupplementalPosts";
import { BlogPostFAQ } from "@/components/BlogPostFAQ";
import { getArticleSources } from "@/lib/blogEditorialSources";
import { getEditorialApproval } from "@/lib/blogEditorialRegistry";
import { buildArticleToc } from "@/lib/articleToc";

const jsonLd = vi.hoisted(() => ({ slot: vi.fn() }));
vi.mock("@/lib/jsonLdSlots", () => ({
  SCHEMA_SLOTS: { faq: "faq" }, SLOT_PRIORITY: { page: 10 }, useJsonLdSlot: jsonLd.slot,
}));

describe("Arquivo corrompido: preservar, recuperar e conferir", () => {
  const slug = "arquivo-corrompido-nao-abre-o-que-fazer";
  const post = blogSupplementalPosts[slug];
  it("preserva data original exibida e aprovação", () => {
    expect(post.date).toBe("2026-10-01");
    expect(getEditorialApproval(slug)).toMatchObject({
      status: "approved", approvedAt: "2026-09-03", reviewedAt: "2026-11-13",
    });
  });
  it("interrompe tentativa em mídia instável e verifica o resultado", () => {
    const html = renderToStaticMarkup(post.content);
    expect(html.indexOf("interrompa os testes")).toBeGreaterThan(0);
    expect(html.indexOf("interrompa os testes")).toBeLessThan(html.indexOf("cópia de trabalho"));
    for (const phrase of ["terceiro arquivo", "Restaurar para...", "Feche e reabra", "não confirma que todas", "Abrir e Reparar", "Não habilite macros"]) {
      expect(html).toContain(phrase);
    }
    expect(html).not.toContain("<h2>Perguntas frequentes</h2>");
  });
  it("renderiza três ícones decorativos sem alterar os títulos e as âncoras", () => {
    const { content, headings } = buildArticleToc(post.content);
    const html = renderToStaticMarkup(content);
    const icons = html.match(/<svg\b[^>]*data-editorial-icon="arquivo-[^"]+"[^>]*>/g) ?? [];
    expect(icons).toHaveLength(3);
    for (const tag of icons) {
      expect(tag).toContain('aria-hidden="true"');
      expect(tag).toContain('focusable="false"');
    }
    expect(headings).toEqual(expect.arrayContaining([
      { level: 2, text: "Arquivo corrompido ou aplicativo incompatível?", id: "arquivo-corrompido-ou-aplicativo-incompativel" },
      { level: 2, text: "1. Preserve a cópia original antes de qualquer tentativa", id: "1-preserve-a-copia-original-antes-de-qualquer-tentativa" },
      { level: 2, text: "12. Quando parar de tentar sozinho", id: "12-quando-parar-de-tentar-sozinho" },
    ]));
  });
  it("renderiza cinco referências oficiais", () => {
    const html = renderToStaticMarkup(post.content);
    const sources = getArticleSources(slug);
    expect(sources).toHaveLength(5);
    for (const source of sources) expect(html).toContain(source.url.replace(/&/g, "&amp;"));
  });
  it("mantém as cinco FAQs em paridade com FAQPage", () => {
    const html = renderToStaticMarkup(<BlogPostFAQ slug={slug} category={post.category} />);
    const schema = jsonLd.slot.mock.calls.at(-1)?.[1];
    expect(schema?.["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(5);
    for (const question of schema.mainEntity) {
      expect(html).toContain(question.name);
      expect(html).toContain(question.acceptedAnswer.text);
    }
  });
});
