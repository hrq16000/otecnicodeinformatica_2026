import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { blogPostsContentBase } from "@/data/blogPostsContent";
import { blogSupplementalPosts } from "@/data/blogSupplementalPosts";
import { BlogPostFAQ } from "@/components/BlogPostFAQ";
import { MFA_RECOVERY_FAQ } from "@/lib/mfaRecoveryFaq";
import { getArticleSources } from "@/lib/blogEditorialSources";
import { isEditorialApproved } from "@/lib/blogEditorialRegistry";

const jsonLd = vi.hoisted(() => ({ slot: vi.fn() }));
vi.mock("@/lib/jsonLdSlots", () => ({ SCHEMA_SLOTS: { faq: "faq" }, SLOT_PRIORITY: { page: 10 }, useJsonLdSlot: jsonLd.slot }));
vi.mock("@/lib/router-compat", () => ({ Link: ({ to, children }: { to: string; children: ReactNode }) => <a href={to}>{children}</a> }));

describe("MFA e recuperação de acesso", () => {
  const slug = "como-configurar-2fa-em-tudo";
  const post = blogPostsContentBase[slug];
  it("mantém data e aprovação existentes, sem URL concorrente", () => {
    expect(post.date).toBe("2026-04-20");
    expect(isEditorialApproved(slug)).toBe(true);
    expect(blogSupplementalPosts[slug]).toBeUndefined();
  });
  it("separa recuperação, restauração e contenção sem prometer desbloqueio", () => {
    const html = renderToStaticMarkup(post.content);
    for (const text of ["não contorna essa proteção", "credenciais de contas de trabalho ou escola não são restauradas", "Revogação de sessões é uma medida separada", "sem encerrar a sessão confiável", "não garantir recuperação"]) expect(html).toContain(text);
    expect(html).not.toContain("Saia da conta e entre de novo");
    expect(html).toContain("/blog/como-proteger-computador-golpes-internet");
  });
  it("renderiza as seis fontes cadastradas", () => {
    const html = renderToStaticMarkup(post.content);
    expect(getArticleSources(slug)).toHaveLength(6);
    for (const source of getArticleSources(slug)) expect(html).toContain(source.url.replace(/&/g, "&amp;"));
  });
  it("mantém cinco FAQs visíveis iguais ao objeto FAQPage registrado", () => {
    const html = renderToStaticMarkup(<BlogPostFAQ slug={slug} category={post.category} />);
    expect(MFA_RECOVERY_FAQ).toHaveLength(5);
    for (const faq of MFA_RECOVERY_FAQ) {
      expect(html).toContain(faq.q);
      expect(html).toContain(faq.a);
    }
    const schema = jsonLd.slot.mock.calls.at(-1)?.[1];
    expect(schema?.["@type"]).toBe("FAQPage");
    expect(schema.mainEntity.map((item: { name: string; acceptedAnswer: { text: string } }) => ({ q: item.name, a: item.acceptedAnswer.text }))).toEqual(MFA_RECOVERY_FAQ);
  });
});
