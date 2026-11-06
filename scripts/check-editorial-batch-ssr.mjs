/**
 * Valida o lote editorial no bundle real, sem depender de vite preview.
 * Não publica e não substitui verify/build/deploy:check.
 * Dois processos frios por rota + DOM Chromium com assets locais do build.
 */
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve, relative, extname } from "node:path";
import { JSDOM } from "jsdom";
import { chromium } from "playwright";

const run = promisify(execFile);
const origin = "https://otecnicodeinformatica.com.br";
const out = resolve("reports/editorial-batch-ssr");
const assets = resolve("dist/client");
const cases = [
  { slug: "windows-11-vale-a-pena-atualizar", approved: false, date: "2026-01-15" },
  { slug: "disco-com-setores-defeituosos-smart-o-que-fazer", approved: true, date: "2026-08-26" },
  { slug: "como-migrar-arquivos-para-um-computador-novo", approved: true, date: "2026-09-03" },
  { slug: "rede-wifi-nao-aparece-na-lista-o-que-verificar", approved: true, date: "2026-09-03" },
  { slug: "como-configurar-2fa-em-tudo", approved: true, date: "2026-04-20" },
];
const norm = (s) => s.replace(/\s+/g, " ").trim();
function inspect(html, item) {
  const doc = new JSDOM(html).window.document;
  const url = origin + "/blog/" + item.slug;
  assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1, "canonical único");
  assert.equal(doc.querySelector('link[rel="canonical"]').href, url);
  assert.equal(doc.querySelectorAll("h1").length, 1, "H1 único");
  assert.ok(doc.title.trim(), "título presente");
  assert.ok(doc.querySelector('meta[name="description"]')?.content.trim(), "descrição presente");
  const noindex = /noindex/i.test(doc.querySelector('meta[name="robots"]')?.content ?? "");
  assert.equal(noindex, !item.approved, "indexabilidade preservada");
  const nodes = [...doc.querySelectorAll('script[type="application/ld+json"]')]
    .flatMap((el) => { const j = JSON.parse(el.textContent); return j["@graph"] ?? (Array.isArray(j) ? j : [j]); });
  const hasType = (n, t) => [n["@type"]].flat().includes(t);
  assert.ok(nodes.some((n) => hasType(n, "BreadcrumbList")), "breadcrumb SSR");
  const article = nodes.find((n) => hasType(n, "Article"));
  const faq = nodes.find((n) => hasType(n, "FAQPage"));
  const visible = [...doc.querySelectorAll("[data-faq-visivel] details")].map((el) => ({
    q: norm(el.querySelector("summary span").textContent),
    a: norm(el.querySelector("div").textContent),
  }));
  assert.equal(visible.length, 5, "cinco FAQs visíveis");
  if (item.approved) {
    assert.equal(article?.["@id"], url + "#article");
    assert.ok(article.datePublished.startsWith(item.date), "data original");
    assert.equal(faq?.["@id"], url + "#faq");
    assert.deepEqual(faq.mainEntity.map((n) => ({ q: norm(n.name), a: norm(n.acceptedAnswer.text) })), visible);
  } else {
    assert.equal(article, undefined, "rascunho não emite Article");
    assert.equal(faq, undefined, "rascunho não emite FAQPage");
  }
  return { title: doc.title, canonical: url, noindex, schemas: nodes.map((n) => n["@type"]), faqCount: visible.length };
}

await mkdir(out, { recursive: true });
// Ausência do browser ou do bundle é erro, não aprovação vazia.
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const item of cases) {
    const path = "/blog/" + item.slug;
    const rawPath = resolve(out, item.slug + ".raw.html");
    const first = JSON.parse((await run("node", ["scripts/p0/render-jsonld-once.mjs", path, rawPath], { maxBuffer: 1e8 })).stdout);
    const second = JSON.parse((await run("node", ["scripts/p0/render-jsonld-once.mjs", path], { maxBuffer: 1e8 })).stdout);
    assert.equal(first.status, 200, path);
    assert.equal(second.status, 200, path);
    assert.equal(first.fp, second.fp, "tipos/IDs estáveis em dois processos frios");
    const raw = await readFile(rawPath, "utf8");
    const before = inspect(raw, item);
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.route("**/*", async (route) => {
      const url = new URL(route.request().url());
      if (url.origin !== origin) return route.abort();
      if (route.request().isNavigationRequest() && url.pathname === path)
        return route.fulfill({ status: 200, contentType: "text/html", body: raw });
      const file = resolve(assets, "." + decodeURIComponent(url.pathname));
      if (relative(assets, file).startsWith("..")) return route.abort();
      const types = { ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".json": "application/json" };
      try { return await route.fulfill({ status: 200, contentType: types[extname(file)] ?? "application/octet-stream", body: await readFile(file) }); }
      catch { return route.fulfill({ status: 404, body: "Not found" }); }
    });
    await page.goto(origin + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    const rendered = await page.content();
    await writeFile(resolve(out, item.slug + ".rendered.html"), rendered);
    const after = inspect(rendered, item);
    assert.deepEqual(after, before, "sinais/schema preservados após JavaScript");
    assert.deepEqual(errors, [], "sem erros de execução no browser");
    results.push({ slug: item.slug, status: first.status, xRobotsTag: first.xRobotsTag, coldRenders: 2, ...after });
    console.log("OK " + path + " | SSR frio + DOM | FAQ=" + after.faqCount);
    await page.close();
  }
  const missing = JSON.parse((await run("node", ["scripts/p0/render-jsonld-once.mjs", "/blog/editorial-inexistente-auditoria-20261106"], { maxBuffer: 1e8 })).stdout);
  assert.equal(missing.status, 404, "rota desconhecida deve retornar 404");
  assert.ok(!missing.tipos.includes("Article"), "404 não pode emitir Article");
  await writeFile(resolve(out, "summary.json"), JSON.stringify({ scope: "local worker bundle + intercepted browser; not deployed", results, missingStatus: missing.status }, null, 2) + "\n");
} finally {
  await browser.close();
}
