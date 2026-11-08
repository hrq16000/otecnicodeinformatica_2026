import { test } from "node:test";
import assert from "node:assert/strict";
import { inspectEditorialHtml } from "./editorial-html-signals.mjs";

const item = { slug: "amostra", approved: true, date: "2026-01-01", reviewedAt: "2026-11-01" };
const url = "https://otecnicodeinformatica.com.br/blog/amostra";
function fixture({ dateModified = item.reviewedAt, answer = "Resposta", duplicate = false, robots = "index, follow", canonical = url, googlebot = robots, omitRobots = false, draft = false } = {}) {
  const questions = Array.from({ length: 5 }, (_, i) => ({ q: "Pergunta " + i, a: answer + " " + i }));
  const article = { "@type": ["Article", "BlogPosting"], "@id": url + "#article", datePublished: item.date, dateModified };
  const nodes = [{ "@type": "BreadcrumbList", "@id": url + "#breadcrumb" }];
  if (!draft) nodes.push(article, { "@type": "FAQPage", "@id": url + "#faq", mainEntity: questions.map((f) => ({ name: f.q, acceptedAnswer: { text: f.a } })) });
  if (duplicate) nodes.push(article);
  return '<html><head><title>Guia</title><meta name="description" content="Descrição"><link rel="canonical" href="' + canonical + '">' +
    (omitRobots ? "" : '<meta name="robots" content="' + robots + '">') +
    '<meta name="googlebot" content="' + googlebot + '"></head><body><h1>Guia</h1>' +
    '<section data-faq-visivel>' + questions.map((f) => '<details><summary><span>' + f.q + '</span></summary><div>' + f.a + '</div></details>').join("") + '</section>' +
    '<script type="application/ld+json">' + JSON.stringify({ "@graph": nodes }) + '</script></body></html>';
}
test("aceita HTML coerente de artigo aprovado", () => assert.equal(inspectEditorialHtml(fixture(), item).faqCount, 5));
test("rejeita schema Article duplicado", () => assert.throws(() => inspectEditorialHtml(fixture({ duplicate: true }), item), /Article: quantidade/));
test("rejeita dataModified que não corresponde à revisão", () => assert.throws(() => inspectEditorialHtml(fixture({ dateModified: "2026-01-01" }), item), /revisão material/));
test("rejeita canonical de outra página", () => assert.throws(() => inspectEditorialHtml(fixture({ canonical: url + "-outra" }), item)));
test("rejeita robots ausente ou conflitante com googlebot", () => {
  assert.throws(() => inspectEditorialHtml(fixture({ omitRobots: true }), item), /deve ser único/);
  assert.throws(() => inspectEditorialHtml(fixture({ googlebot: "noindex" }), item), /googlebot coerente/);
});
test("rejeita FAQ divergente do texto visível", () => {
  const html = fixture().replace('"text":"Resposta 0"', '"text":"Resposta alterada"');
  assert.throws(() => inspectEditorialHtml(html, item));
});
test("detecta alteração conjunta do conteúdo e FAQ após JavaScript", () => {
  const raw = inspectEditorialHtml(fixture(), item);
  const rendered = inspectEditorialHtml(fixture({ answer: "Nova resposta" }), item);
  assert.throws(() => assert.deepEqual(rendered, raw));
});
test("rascunho permanece noindex, sem Article/FAQPage", () => {
  const draft = { ...item, approved: false };
  assert.equal(inspectEditorialHtml(fixture({ draft: true, robots: "noindex, follow" }), draft).noindex, true);
  assert.throws(() => inspectEditorialHtml(fixture({ robots: "noindex, follow" }), draft), /Article: quantidade/);
});
