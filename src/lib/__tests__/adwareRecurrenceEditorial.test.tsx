import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { blogSupplementalPosts } from "@/data/blogSupplementalPosts";
import { BlogPostFAQ } from "@/components/BlogPostFAQ";
import { getArticleSources } from "@/lib/blogEditorialSources";
import { isEditorialApproved } from "@/lib/blogEditorialRegistry";

const jsonLd = vi.hoisted(() => ({ slot: vi.fn() }));
vi.mock("@/lib/jsonLdSlots", () => ({
  SCHEMA_SLOTS: { faq: "faq" }, SLOT_PRIORITY: { page: 10 }, useJsonLdSlot: jsonLd.slot,
}));
vi.mock("@/lib/router-compat", () => ({
  Link: ({ to, children }: { to: string; children: ReactNode }) => <a href={to}>{children}</a>,
}));

describe("Adware recorrente: triagem e contenção", () => {
  const slug = "como-remover-virus-windows-iniciantes";
  const post = blogSupplementalPosts[slug];
  it("preserva data exibida e aprovação existente", () => {
    expect(post.date).toBe("2026-10-01");
    expect(isEditorialApproved(slug)).toBe(true);
  });
  it("diferencia sinais, políticas e atividade de conta", () => {
    const html = renderToStaticMarkup(post.content);
    for (const phrase of [
      "perfil temporário sem login", "Sincronização é hipótese", "chrome://policy",
      "edge://policy", "isole o computador da rede", "Histórico de proteção",
      "Trocar a senha não substitui conferir sessões",
    ]) expect(html).toContain(phrase);
    expect(html).not.toContain("<h2>Perguntas frequentes</h2>");
  });
  it("exibe oito referências primárias", () => {
    const html = renderToStaticMarkup(post.content);
    const sources = getArticleSources(slug);
    expect(sources).toHaveLength(8);
    for (const source of sources) expect(html).toContain(source.url.replace(/&/g, "&amp;"));
  });
  it("exibe as cinco respostas do FAQPage sem FAQ comercial genérica", () => {
    const html = renderToStaticMarkup(<BlogPostFAQ slug={slug} category={post.category} />);
    const schema = jsonLd.slot.mock.calls.at(-1)?.[1];
    expect(schema?.["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(5);
    for (const q of schema.mainEntity) {
      expect(html).toContain(q.name);
      expect(html).toContain(q.acceptedAnswer.text);
    }
    expect(html).not.toMatch(/Quanto custa|R\$|WhatsApp/);
  });
});
