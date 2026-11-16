import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { BlogPostFAQ } from "@/components/BlogPostFAQ";
import { blogPostsContentBase } from "@/data/blogPostsContent";
import { extractEmbeddedFaq } from "@/lib/articleEmbeddedFaq";
import { isEditorialApproved } from "@/lib/blogEditorialRegistry";
import { getArticleSources } from "@/lib/blogEditorialSources";

const jsonLd = vi.hoisted(() => ({ slot: vi.fn() }));
vi.mock("@/lib/jsonLdSlots", () => ({
  SCHEMA_SLOTS: { faq: "faq" }, SLOT_PRIORITY: { page: 10 }, useJsonLdSlot: jsonLd.slot,
}));
vi.mock("@/lib/router-compat", () => ({
  Link: ({ to, children }: { to: string; children: ReactNode }) => <a href={to}>{children}</a>,
}));

describe("Recuperação da Conta Google no guia de 2FA", () => {
  const slug = "como-configurar-2fa-em-tudo";
  const post = blogPostsContentBase[slug];

  it("preserva a aprovação e exibe o fluxo oficial com referências", () => {
    expect(isEditorialApproved(slug)).toBe(true);
    const html = renderToStaticMarkup(post.content);
    expect(html).toContain("https://accounts.google.com/signin/recovery");
    expect(html).toContain("preserve essa sessão");
    expect(html).toContain("Não há garantia de recuperar o acesso");
    const google = getArticleSources(slug).filter(({ url }) => url.startsWith("https://support.google.com/"));
    expect(google).toHaveLength(4);
    for (const source of google) expect(html).toContain(source.url);
  });

  it("gera quatro FAQs estruturadas a partir das respostas visíveis sem duplicar o bloco", () => {
    const items = extractEmbeddedFaq(post.content);
    const article = renderToStaticMarkup(post.content);
    expect(items).toHaveLength(4);
    expect(renderToStaticMarkup(<BlogPostFAQ slug={slug} category={post.category} embeddedItems={items} />)).toBe("");
    const schema = jsonLd.slot.mock.calls.at(-1)?.[1];
    expect(schema?.["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toEqual(items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })));
    for (const item of items) {
      expect(article).toContain(item.q);
      expect(article).toContain(item.a);
    }
  });
});
