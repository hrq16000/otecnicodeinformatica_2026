import assert from "node:assert/strict";
import { JSDOM } from "jsdom";

const origin = "https://otecnicodeinformatica.com.br";
const norm = (s) => s.replace(/\s+/g, " ").trim();
const hasType = (n, t) => [n["@type"]].flat().includes(t);

/** Leitor puro: apenas HTML fornecido, sem recursos externos nem execução JS. */
export function inspectEditorialHtml(html, item) {
  const dom = new JSDOM(html);
  try {
    const doc = dom.window.document;
    const url = origin + "/blog/" + item.slug;
    const one = (selector) => {
      const nodes = doc.querySelectorAll(selector);
      assert.equal(nodes.length, 1, selector + " deve ser único");
      return nodes[0];
    };
    assert.equal(one('link[rel="canonical"]').href, url);
    const h1 = norm(one("h1").textContent);
    const title = one("head title").textContent.trim();
    const description = one('meta[name="description"]').content.trim();
    assert.ok(title && description && h1, "metadados e H1 não vazios");
    const robots = one('meta[name="robots"]').content;
    assert.ok(robots.trim(), "robots não vazio");
    const noindex = /(?:^|[\s,])(noindex|none)(?:$|[\s,])/i.test(robots);
    assert.equal(noindex, !item.approved, "indexabilidade preservada");
    const googlebot = doc.querySelector('meta[name="googlebot"]')?.content;
    if (googlebot) assert.equal(/(?:^|[\s,])(noindex|none)(?:$|[\s,])/i.test(googlebot), noindex, "googlebot coerente");
    const nodes = [...doc.querySelectorAll('script[type="application/ld+json"]')]
      .flatMap((el) => { const j = JSON.parse(el.textContent); return j["@graph"] ?? (Array.isArray(j) ? j : [j]); });
    const exactType = (type, expected) => {
      const matches = nodes.filter((n) => hasType(n, type));
      assert.equal(matches.length, expected, type + ": quantidade esperada");
      return matches[0];
    };
    const breadcrumb = exactType("BreadcrumbList", 1);
    assert.equal(breadcrumb["@id"], url + "#breadcrumb");
    const article = exactType("Article", item.approved ? 1 : 0);
    const faq = exactType("FAQPage", item.approved ? 1 : 0);
    const visible = [...doc.querySelectorAll("[data-faq-visivel] details")].map((el) => ({
      q: norm(el.querySelector("summary span").textContent),
      a: norm(el.querySelector("div").textContent),
    }));
    assert.equal(visible.length, 5, "cinco FAQs visíveis");
    assert.equal(new Set(visible.map((f) => f.q)).size, 5, "perguntas distintas");
    if (item.approved) {
      assert.equal(article["@id"], url + "#article");
      assert.equal(article.datePublished?.slice(0, 10), item.date, "data original");
      assert.equal(article.dateModified?.slice(0, 10), item.reviewedAt, "data da revisão material");
      assert.equal(faq["@id"], url + "#faq");
      assert.deepEqual(faq.mainEntity.map((n) => ({ q: norm(n.name), a: norm(n.acceptedAnswer.text) })), visible);
    }
    // Retornar os conteúdos completos impede que a hidratação altere FAQ e
    // schema juntos sem que o comparador perceba.
    return { title, description, h1, canonical: url, robots, googlebot,
      noindex, schemas: nodes, faqCount: visible.length, visibleFaq: visible };
  } finally {
    dom.window.close();
  }
}
