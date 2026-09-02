#!/usr/bin/env node
/**
 * RELATÓRIO DE AFIRMAÇÕES PARA O PAINEL /admin/afirmacoes.
 *
 * Reaproveita a classificação de `audit-trust-claims.mjs` (COMPROVADA,
 * INSTITUCIONAL, CONDICIONAL, REMOVIDA, PENDENTE) e cruza cada ocorrência com
 * a URL pública onde ela aparece, usando o mapa de rotas legado
 * (`src/legacyRouteElements.tsx`) e o sitemap curado
 * (`scripts/lib/curated-urls.mjs`).
 *
 * Saída: src/data/trustClaimsAudit.json (consumido pelo painel admin).
 * Fail-closed: se a auditoria falhar, o arquivo NÃO é reescrito.
 *
 * Uso: node scripts/report-trust-claims-panel.mjs [--check]
 *   --check  não escreve; falha se o arquivo estiver desatualizado/ausente.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { CURATED_PATHS } from "./lib/curated-urls.mjs";

const ROOT = process.cwd();
const OUT = join(ROOT, "src", "data", "trustClaimsAudit.json");
const ROUTES_FILE = join(ROOT, "src", "legacyRouteElements.tsx");
const TRECHO_MAX = 180;

function auditoria() {
  const raw = execFileSync(process.execPath, ["scripts/audit-trust-claims.mjs", "--json"], {
    cwd: ROOT,
    maxBuffer: 64 * 1024 * 1024,
    encoding: "utf8",
  });
  return JSON.parse(raw);
}

/** componente -> caminho do arquivo (normalizado para src/...). */
function mapaComponentes(src) {
  const mapa = new Map();
  const reLazy = /const\s+([A-Za-z0-9_]+)\s*=\s*lazy(?:Pagina)?\(\s*\(\)\s*=>\s*import\(\s*["']([^"']+)["']/g;
  const reStatic = /import\s+([A-Za-z0-9_]+)\s+from\s+["'](\.\/pages\/[^"']+)["']/g;
  for (const re of [reLazy, reStatic]) {
    let m;
    while ((m = re.exec(src))) {
      const p = m[2].replace(/^@\//, "src/").replace(/^\.\//, "src/");
      mapa.set(m[1], p);
    }
  }
  // Index é embrulhado por comSinkDeJsonLd a partir de IndexPage.
  if (mapa.has("IndexPage")) mapa.set("Index", mapa.get("IndexPage"));
  return mapa;
}

/** arquivo -> URLs públicas que o renderizam. */
function mapaArquivoUrls(src, componentes) {
  const out = new Map();
  const re = /"(\/[^"]*)":\s*\(\)\s*=>\s*<([A-Za-z0-9_]+)/g;
  let m;
  while ((m = re.exec(src))) {
    const [, url, comp] = m;
    const arquivo = componentes.get(comp);
    if (!arquivo) continue;
    const chaves = [arquivo, `${arquivo}.tsx`, `${arquivo}.ts`];
    for (const chave of chaves) {
      if (!out.has(chave)) out.set(chave, new Set());
      out.get(chave).add(url);
    }
  }
  return out;
}

function classesVazias() {
  return { COMPROVADA: 0, INSTITUCIONAL: 0, CONDICIONAL: 0, REMOVIDA: 0, PENDENTE: 0 };
}

function main() {
  const modoCheck = process.argv.includes("--check");
  const dados = auditoria();
  const src = readFileSync(ROUTES_FILE, "utf8");
  const componentes = mapaComponentes(src);
  const arquivoUrls = mapaArquivoUrls(src, componentes);
  const curadas = new Set(CURATED_PATHS);

  const familias = new Map();
  const porUrl = new Map();

  const ocorrencias = dados.ocorrencias.map((o) => {
    const urls = [...(arquivoUrls.get(o.arquivo) ?? [])].sort();
    const f = familias.get(o.familia) ?? {
      id: o.familia,
      titulo: o.familiaTitulo,
      risco: o.risco,
      total: 0,
    };
    f.total += 1;
    familias.set(o.familia, f);

    for (const url of urls) {
      const reg = porUrl.get(url) ?? {
        path: url,
        curada: curadas.has(url),
        total: 0,
        porClasse: classesVazias(),
      };
      reg.total += 1;
      reg.porClasse[o.classificacao] = (reg.porClasse[o.classificacao] ?? 0) + 1;
      porUrl.set(url, reg);
    }

    return {
      familia: o.familia,
      familiaTitulo: o.familiaTitulo,
      risco: o.risco,
      arquivo: o.arquivo,
      linha: o.linha,
      trecho: o.trecho.length > TRECHO_MAX ? `${o.trecho.slice(0, TRECHO_MAX)}…` : o.trecho,
      classificacao: o.classificacao,
      criterio: o.criterio ?? "",
      evidencia: o.evidencia ?? "",
      acao: o.acao ?? "",
      urls,
    };
  });

  // URLs curadas sem nenhuma afirmação mapeada continuam listadas (auditoria
  // do sitemap dinâmico exige cobertura completa, não apenas o que deu match).
  for (const path of curadas) {
    if (!porUrl.has(path)) {
      porUrl.set(path, { path, curada: true, total: 0, porClasse: classesVazias() });
    }
  }

  const relatorio = {
    geradoEm: new Date().toISOString().slice(0, 10),
    total: dados.total,
    porClasse: dados.porClasse,
    urlsCuradas: curadas.size,
    familias: [...familias.values()].sort((a, b) => b.total - a.total),
    urls: [...porUrl.values()].sort((a, b) => b.total - a.total || a.path.localeCompare(b.path)),
    ocorrencias,
  };

  const json = `${JSON.stringify(relatorio, null, 2)}\n`;

  if (modoCheck) {
    if (!existsSync(OUT)) {
      console.error("✗ src/data/trustClaimsAudit.json ausente. Rode: npm run report:afirmacoes");
      process.exit(1);
    }
    const atual = JSON.parse(readFileSync(OUT, "utf8"));
    const igual =
      atual.total === relatorio.total &&
      JSON.stringify(atual.porClasse) === JSON.stringify(relatorio.porClasse) &&
      atual.ocorrencias?.length === relatorio.ocorrencias.length;
    if (!igual) {
      console.error("✗ Relatório de afirmações desatualizado. Rode: npm run report:afirmacoes");
      process.exit(1);
    }
    console.log(`✓ Relatório de afirmações em dia (${relatorio.total} ocorrências).`);
    return;
  }

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, json);
  console.log(
    `✓ src/data/trustClaimsAudit.json — ${relatorio.total} afirmações, ` +
      `${relatorio.urls.length} URLs mapeadas (${curadas.size} curadas).`,
  );
}

main();
