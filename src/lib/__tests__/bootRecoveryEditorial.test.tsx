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

describe("No bootable device: versão editorial efetiva", () => {
  const slug = "erro-no-bootable-device-como-resolver";
  const post = blogSupplementalPosts[slug];
  it("mantém data e aprovação existentes", () => {
    expect(post.date).toBe("2026-10-01");
    expect(isEditorialApproved(slug)).toBe(true);
  });
  it("limita o exemplo a inventário sem comandos de escrita", () => {
    const html = renderToStaticMarkup(post.content);
    expect(html).toContain("diskpart\nlist disk\nlist volume\nexit");
    expect(html).toContain("não cria a entrada de boot na NVRAM");
    expect(html).toContain("não prova de que ele seja a EFI");
    expect(html).not.toMatch(/select disk 0|assign letter=|<h2>Perguntas frequentes<\/h2>/);
  });
  it("renderiza oito referências primárias", () => {
    const html = renderToStaticMarkup(post.content);
    const sources = getArticleSources(slug);
    expect(sources).toHaveLength(8);
    for (const source of sources) expect(html).toContain(source.url.replace(/&/g, "&amp;"));
  });
  it("exibe as cinco respostas prudentes registradas no FAQPage", () => {
    const html = renderToStaticMarkup(<BlogPostFAQ slug={slug} category={post.category} />);
    const schema = jsonLd.slot.mock.calls.at(-1)?.[1];
    expect(schema?.["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(5);
    for (const question of schema.mainEntity) {
      expect(html).toContain(question.name);
      expect(html).toContain(question.acceptedAnswer.text);
    }
    expect(html).not.toContain("confirma a partição de sistema EFI");
  });
});
