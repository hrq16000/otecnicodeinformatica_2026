#!/usr/bin/env node
/**
 * DOSSIÊ CONSOLIDADO POR URL — Rodada 4B (pós-deploy).
 *
 * Junta, por owner, as evidências já coletadas pelos coletores oficiais:
 *   smoke público (reports/smoke-4b.json), diff SSR/JSON-LD (reports/ssr-diff.json),
 *   rich results (public/rich-results-monitor.json), indexação GSC
 *   (public/index-status.json), IndexNow (public/indexnow-status.json) e
 *   fingerprint/lastmod (config/content-fingerprints.json).
 *
 * Saída: reports/dossies-4b/<slug>.html + .pdf (um arquivo por URL).
 * Nenhum dado é inventado: campo ausente aparece como "—".
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { OWNERS_4B } from "./lib/owners-4b.mjs";

const ler = (p) => {
  try {
    return JSON.parse(readFileSync(resolve(p), "utf8"));
  } catch {
    return null;
  }
};

const smoke = ler("reports/smoke-4b.json") ?? { resultados: [] };
const ssr = ler("reports/ssr-diff.json") ?? {};
const rich = ler("public/rich-results-monitor.json") ?? {};
const idx = ler("public/index-status.json") ?? {};
const inow = ler("public/indexnow-status.json") ?? {};
const fps = (ler("config/content-fingerprints.json") ?? {}).rotas ?? {};

const lista = (o) => (Array.isArray(o) ? o : (o?.resultados ?? o?.urls ?? o?.rotas ?? []));
const acharPor = (colecao, path) =>
  lista(colecao).find((r) => (r.path ?? r.url ?? "").replace(/^https?:\/\/[^/]+/, "") === path) ??
  null;

const esc = (s) =>
  String(s ?? "—").replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c]);

const OUT = resolve("reports/dossies-4b");
mkdirSync(OUT, { recursive: true });

const paginas = [];
for (const { cluster, path } of OWNERS_4B) {
  const s = acharPor(smoke, path) ?? {};
  const d = acharPor(ssr, path) ?? {};
  const r = acharPor(rich, path) ?? {};
  const g = acharPor(idx, path) ?? {};
  const n = acharPor(inow, path) ?? {};
  const f = fps[path] ?? {};
  const slug = path.replace(/^\//, "").replace(/\//g, "_");

  const linhas = [
    ["Cluster", cluster],
    ["URL", s.url ?? `https://otecnicodeinformatica.com.br${path}`],
    ["Deployment ID", s.deploymentId],
    ["HTTP", s.status],
    ["Robots", s.robots],
    ["Canonical", s.canonical],
    ["H1 (qtd)", s.h1],
    ["H1 (texto)", s.h1Texto],
    ["Resposta rápida", s.respostaRapida === undefined ? "—" : s.respostaRapida ? "sim" : "não"],
    [
      "Tabela diagnóstica",
      s.tabelaDiagnostica === undefined ? "—" : s.tabelaDiagnostica ? "sim" : "não",
    ],
    ["Palavras", s.palavras],
    ["Links internos", s.linksInternos],
    ["JSON-LD (blocos)", s.jsonld?.blocos],
    ["JSON-LD (tipos)", s.jsonld?.tipos?.join(", ")],
    ["JSON-LD inválidos", s.jsonld?.invalidos],
    ["Veredito smoke", s.veredito],
    ["Diff SSR/JSON-LD", d.estado],
    ["Diff — JSON-LD perdido", (d.perdas ?? []).join(", ")],
    ["Diff — JSON-LD ganho", (d.ganhos ?? []).join(", ")],
    ["Diff — palavras (base → atual)", d.palavrasBaseline ? `${d.palavrasBaseline} → ${d.palavrasAtual}` : undefined],
    ["Rich results declarados", (r.declarados ?? []).join(", ")],
    ["Rich results Google", r.googleVerdict ?? r.googleStatus],
    ["Rich results reconhecidos", (r.google ?? []).join(", ")],
    ["Rich results — alerta", r.alerta],
    ["Fingerprint (hash)", f.hash],
    ["Lastmod", f.lastmod],
    ["Origem do lastmod", f.origem],
    ["IndexNow — enviada em", n.enviadaEm],
    [
      "IndexNow — resultados",
      (n.resultados ?? []).map((x) => `${x.endpoint} HTTP ${x.status} (${x.classe})`).join(" · "),
    ],
    ["GSC — estado", g.google?.status],
    ["GSC — lastCrawlTime", g.google?.ultimoCrawl],
    ["GSC — cobertura", g.google?.coverageState],
    ["GSC — verdict", g.google?.verdict],
    ["GSC — impressões 28d", g.impressoes28d],
    ["GSC — cliques 28d", g.cliques28d],
    ["GSC — posição 28d", g.posicao28d],
  ];

  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<title>Dossiê 4B — ${esc(path)}</title>
<style>
 body{font:12px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;color:#111;margin:28px}
 h1{font-size:17px;margin:0 0 2px} .sub{color:#555;font-size:11px;margin-bottom:14px}
 table{border-collapse:collapse;width:100%} td{border-top:1px solid #ddd;padding:5px 7px;vertical-align:top}
 td:first-child{width:210px;color:#444;font-weight:600;background:#fafafa}
 code{font:11px ui-monospace,monospace;word-break:break-all}
 footer{margin-top:16px;color:#777;font-size:10px}
</style></head><body>
<h1>Dossiê consolidado — Rodada 4B</h1>
<div class="sub">${esc(path)} · gerado em ${new Date().toISOString()} · base ${esc(smoke.base)}</div>
<table>${linhas.map(([k, v]) => `<tr><td>${esc(k)}</td><td><code>${esc(v)}</code></td></tr>`).join("")}</table>
<footer>Fontes: reports/smoke-4b.json · reports/ssr-diff.json · public/rich-results-monitor.json ·
public/index-status.json · public/indexnow-status.json · config/content-fingerprints.json.
Campos "—" significam ausência de dado coletado, nunca valor presumido.</footer>
</body></html>`;

  const arquivo = resolve(OUT, `${slug}.html`);
  writeFileSync(arquivo, html, "utf8");
  paginas.push({ path, slug, arquivo });
}

// PDF por URL (Playwright já é dependência de teste do projeto).
let pdfs = 0;
try {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const p of paginas) {
    await page.goto(`file://${p.arquivo}`, { waitUntil: "load" });
    await page.pdf({
      path: resolve(OUT, `${p.slug}.pdf`),
      format: "A4",
      printBackground: true,
      margin: { top: "12mm", bottom: "12mm", left: "10mm", right: "10mm" },
    });
    pdfs++;
  }
  await browser.close();
} catch (e) {
  console.warn(`[dossie] PDF indisponível (${e.message}). HTMLs gerados mesmo assim.`);
}

console.log(`✓ dossiês 4B: ${paginas.length} HTML · ${pdfs} PDF em reports/dossies-4b/`);
for (const p of paginas) {
  console.log(`  · ${p.path} → ${p.slug}.pdf${existsSync(resolve(OUT, `${p.slug}.pdf`)) ? "" : " (ausente)"}`);
}
