import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { blogPostsContentBase } from "@/data/blogPostsContent";
import { blogSupplementalPosts } from "@/data/blogSupplementalPosts";
import { BlogPostFAQ } from "@/components/BlogPostFAQ";
import { getArticleSources } from "@/lib/blogEditorialSources";
import { isEditorialApproved } from "@/lib/blogEditorialRegistry";

const jsonLd = vi.hoisted(() => ({ slot: vi.fn() }));
vi.mock("@/lib/jsonLdSlots", () => ({ SCHEMA_SLOTS: { faq: "faq" }, SLOT_PRIORITY: { page: 10 }, useJsonLdSlot: jsonLd.slot }));
vi.mock("@/lib/router-compat", () => ({ Link: ({ to, children }: { to: string; children: ReactNode }) => <a href={to}>{children}</a> }));

describe("Diagnóstico de SSID ausente", () => {
  const slug = "rede-wifi-nao-aparece-na-lista-o-que-verificar";
  const post = blogPostsContentBase[slug];
  it("preserva data, aprovação e versão canônica", () => {
    expect(post.date).toBe("2026-09-03");
    expect(isEditorialApproved(slug)).toBe(true);
    expect(blogSupplementalPosts[slug]).toBeUndefined();
  });
  it("exibe fontes e distingue detecção, banda e autenticação", () => {
    const html = renderToStaticMarkup(post.content);
    const sources = getArticleSources(slug);
    expect(sources).toHaveLength(3);
    for (const source of sources) expect(html).toContain(source.url);
    for (const text of ["mesmo local", "6 GHz", "DFS", "não prova defeito físico"]) expect(html).toContain(text);
    expect(html).toContain("Não faz o rádio voltar a detectar uma banda incompatível");
  });
  it("emite somente as cinco perguntas e respostas visíveis no FAQPage", () => {
    const html = renderToStaticMarkup(<BlogPostFAQ slug={slug} category={post.category} />);
    const schema = jsonLd.slot.mock.calls.at(-1)?.[1];
    expect(schema?.["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(5);
    for (const item of schema.mainEntity) {
      expect(html).toContain(item.name);
      expect(html).toContain(item.acceptedAnswer.text);
    }
  });
});
