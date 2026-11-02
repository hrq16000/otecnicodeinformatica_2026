import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { blogPostsContentBase } from "@/data/blogPostsContent";
import { blogSupplementalPosts } from "@/data/blogSupplementalPosts";
import { BlogPostFAQ } from "@/components/BlogPostFAQ";
import { FILE_MIGRATION_FAQ } from "@/lib/fileMigrationFaq";
import { getArticleSources, getTechnicalReviewStatus } from "@/lib/blogEditorialSources";
import { isEditorialApproved } from "@/lib/blogEditorialRegistry";

const jsonLd = vi.hoisted(() => ({ slot: vi.fn() }));
vi.mock("@/lib/jsonLdSlots", () => ({ SCHEMA_SLOTS: { faq: "faq" }, SLOT_PRIORITY: { page: 10 }, useJsonLdSlot: jsonLd.slot }));
vi.mock("@/lib/router-compat", () => ({ Link: ({ to, children }: { to: string; children: ReactNode }) => <a href={to}>{children}</a> }));

describe("Migração de arquivos com critérios de aceite", () => {
  const slug = "como-migrar-arquivos-para-um-computador-novo";
  const post = blogPostsContentBase[slug];
  it("preserva data e aprovação sem duplicar conteúdo", () => {
    expect(post.date).toBe("2026-09-03");
    expect(isEditorialApproved(slug)).toBe(true);
    expect(blogSupplementalPosts[slug]).toBeUndefined();
  });
  it("não promete perda zero nem aceita contagem como prova de integridade", () => {
    const html = renderToStaticMarkup(post.content);
    expect(post.title).not.toContain("sem perder nada");
    for (const text of ["não provam igualdade", "somente online", "não equivale a instalá-lo", "não atende a padrões", "Get-FileHash", "SHA256", "Use copiar, não recortar", "cópia independente recuperável"]) expect(html).toContain(text);
    expect(html).not.toContain("uma ou duas semanas custa nada");
    expect(html.replace(/<[^>]*>/g, " ").split(/\s+/).length).toBeGreaterThan(900);
  });
  it("exibe todas as seis fontes consultadas", () => {
    expect(getTechnicalReviewStatus(slug)).toBe("reviewed");
    expect(getArticleSources(slug)).toHaveLength(6);
    const html = renderToStaticMarkup(post.content);
    for (const source of getArticleSources(slug)) expect(html).toContain(source.url.replace(/&/g, "&amp;"));
  });
  it("sincroniza perguntas visíveis e FAQPage", () => {
    const html = renderToStaticMarkup(<BlogPostFAQ slug={slug} category={post.category} />);
    expect(FILE_MIGRATION_FAQ).toHaveLength(5);
    for (const faq of FILE_MIGRATION_FAQ) expect(html).toContain(faq.q);
    const schema = jsonLd.slot.mock.calls.at(-1)?.[1];
    expect(schema?.["@type"]).toBe("FAQPage");
    expect(schema.mainEntity.map((item: { name: string; acceptedAnswer: { text: string } }) => ({ q: item.name, a: item.acceptedAnswer.text }))).toEqual(FILE_MIGRATION_FAQ);
  });
});
