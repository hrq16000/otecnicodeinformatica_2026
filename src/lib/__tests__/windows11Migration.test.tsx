import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { blogPostsContentBase } from "@/data/blogPostsContent";
import { blogSupplementalPosts } from "@/data/blogSupplementalPosts";
import { WINDOWS11_MIGRATION_FAQ } from "@/lib/windows11MigrationFaq";
import { getArticleSources, getTechnicalReviewStatus } from "@/lib/blogEditorialSources";
import { isEditorialApproved } from "@/lib/blogEditorialRegistry";
import { BlogPostFAQ } from "@/components/BlogPostFAQ";

const jsonLd = vi.hoisted(() => ({ slot: vi.fn() }));
vi.mock("@/lib/jsonLdSlots", () => ({
  SCHEMA_SLOTS: { faq: "faq" }, SLOT_PRIORITY: { page: 10 }, useJsonLdSlot: jsonLd.slot,
}));

vi.mock("@/lib/router-compat", () => ({
  Link: ({ to, children }: { to: string; children: ReactNode }) => <a href={to}>{children}</a>,
}));

describe("decisão de migração Windows 11", () => {
  const slug = "windows-11-vale-a-pena-atualizar";
  const post = blogPostsContentBase[slug];
  it("usa a fonte canônica e preserva a data original sem promoção automática", () => {
    expect(post.date).toBe("2026-01-15");
    expect(blogSupplementalPosts[slug]).toBeUndefined();
    expect(isEditorialApproved(slug)).toBe(false);
  });
  it("remove promessas e conteúdo desatualizado, mantendo critérios seguros", () => {
    const html = renderToStaticMarkup(post.content);
    expect(html).not.toMatch(/sem risco de perder dados|Integração com Android|perde suporte em outubro/);
    expect(html).toContain("14 de outubro de 2025");
    expect(html).toContain("BitLocker");
    expect(html).toContain("quando parar");
    expect(html).toContain("/blog/como-instalar-windows-11-do-zero");
    expect(html.replace(/<[^>]*>/g, " ").split(/\s+/).length).toBeGreaterThan(900);
  });
  it("tem seis fontes e cinco perguntas técnicas sem venda", () => {
    expect(getTechnicalReviewStatus(slug)).toBe("reviewed");
    expect(getArticleSources(slug)).toHaveLength(6);
    expect(WINDOWS11_MIGRATION_FAQ).toHaveLength(5);
    expect(new Set(WINDOWS11_MIGRATION_FAQ.map((faq) => faq.q)).size).toBe(5);
    expect(JSON.stringify(WINDOWS11_MIGRATION_FAQ)).not.toMatch(/R\$|WhatsApp|garantido/);
  });
  it("renderiza as cinco FAQs técnicas sem emitir schema antes da aprovação", () => {
    const html = renderToStaticMarkup(<BlogPostFAQ slug={slug} category={post.category} />);
    for (const faq of WINDOWS11_MIGRATION_FAQ) expect(html).toContain(faq.q);
    expect(html).not.toMatch(/Quanto custa|R\$|WhatsApp/);
    expect(jsonLd.slot).toHaveBeenLastCalledWith("faq", null, 10);
  });
});
