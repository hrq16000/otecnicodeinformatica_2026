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

describe("Ethernet: isolar a falha antes de alterar a rede", () => {
  const slug = "computador-nao-conecta-na-internet-por-cabo";
  const post = blogPostsContentBase[slug];
  it("preserva a data e a aprovação", () => {
    expect(post.date).toBe("2026-09-14");
    expect(getEditorialApproval(slug)).toMatchObject({
      status: "approved", approvedAt: "2026-09-14", reviewedAt: "2026-11-12",
    });
  });
  it("isola o caminho e distingue os limites de cada sinal", () => {
    const html = renderToStaticMarkup(post.content);
    for (const phrase of [
      "pause os dados móveis", "não desligue interfaces", "cabo curto ligado diretamente",
      "se DHCP está habilitado", "não diz se o IPv6 funciona", "não comprova que o navegador usa o mesmo DNS",
      "nem desative o firewall", "apenas ao suporte autorizado", "último recurso do lado do computador",
    ]) expect(html).toContain(phrase);
  });
  it("exibe cinco fontes oficiais", () => {
    const html = renderToStaticMarkup(post.content);
    const sources = getArticleSources(slug);
    expect(sources).toHaveLength(5);
    for (const source of sources) expect(html).toContain(source.url);
  });
  it("espelha as cinco FAQs técnicas em FAQPage", () => {
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
