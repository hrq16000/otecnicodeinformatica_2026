import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { blogPostsContentBase } from "@/data/blogPostsContent";
import { blogSupplementalPosts } from "@/data/blogSupplementalPosts";
import { BlogPostFAQ } from "@/components/BlogPostFAQ";
import { SMART_DISK_FAQ } from "@/lib/smartDiskFaq";
import { getArticleSources, getTechnicalReviewStatus } from "@/lib/blogEditorialSources";
import { isEditorialApproved } from "@/lib/blogEditorialRegistry";

const jsonLd = vi.hoisted(() => ({ slot: vi.fn() }));
vi.mock("@/lib/jsonLdSlots", () => ({ SCHEMA_SLOTS: { faq: "faq" }, SLOT_PRIORITY: { page: 10 }, useJsonLdSlot: jsonLd.slot }));
vi.mock("@/lib/router-compat", () => ({ Link: ({ to, children }: { to: string; children: ReactNode }) => <a href={to}>{children}</a> }));

describe("SMART e preservação de dados", () => {
  const slug = "disco-com-setores-defeituosos-smart-o-que-fazer";
  const post = blogPostsContentBase[slug];
  it("preserva data e aprovação existentes sem criar versão concorrente", () => {
    expect(post.date).toBe("2026-08-26");
    expect(blogSupplementalPosts[slug]).toBeUndefined();
    expect(isEditorialApproved(slug)).toBe(true);
  });
  it("substitui regras absolutas por limites e decisão segura", () => {
    const html = renderToStaticMarkup(post.content);
    expect(html).not.toMatch(/Acima de 90% planeje|Cada hora ligada|duas leituras separadas por alguns dias|zer[eao] a observação/);
    expect(html).toContain("Não espere dias");
    expect(html).toContain("não é automaticamente seguro");
    expect(html).toContain("não deve ser aplicado automaticamente");
    expect(html).toContain("/servicos/recuperacao-de-dados");
    expect(html.replace(/<[^>]*>/g, " ").split(/\s+/).length).toBeGreaterThan(700);
  });
  it("registra revisão material e fontes primárias visíveis", () => {
    expect(getTechnicalReviewStatus(slug)).toBe("reviewed");
    expect(getArticleSources(slug)).toHaveLength(6);
    const html = renderToStaticMarkup(post.content);
    for (const source of getArticleSources(slug)) expect(html).toContain(source.url);
  });
  it("mantém cinco FAQs em paridade com o schema registrado durante o render", () => {
    const html = renderToStaticMarkup(<BlogPostFAQ slug={slug} category={post.category} />);
    expect(SMART_DISK_FAQ).toHaveLength(5);
    for (const faq of SMART_DISK_FAQ) expect(html).toContain(faq.q);
    const schema = jsonLd.slot.mock.calls.at(-1)?.[1];
    expect(schema?.["@type"]).toBe("FAQPage");
    expect(schema.mainEntity.map((item: { name: string; acceptedAnswer: { text: string } }) => ({ q: item.name, a: item.acceptedAnswer.text }))).toEqual(SMART_DISK_FAQ);
  });
});
