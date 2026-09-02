/**
 * GATE — Taxonomia de entidades (/entidades).
 *
 * Valida, sem depender de servidor:
 *  1. Cada entidade tem todos os campos estruturados preenchidos.
 *  2. Todo link interno declarado existe no manifesto curado de URLs.
 *  3. Slugs da taxonomia batem com ENTIDADES_SLUGS do manifesto (sitemap).
 *  4. O espelho estático (scripts/lib/entidades-static.mjs) está em paridade.
 *  5. Entidades relacionadas apontam para slugs existentes (malha bidirecional
 *     não é exigida, mas o destino precisa existir).
 *  6. Fontes primárias são externas e https.
 *
 * Rode: bun scripts/check-entidades.ts
 */
import { ENTIDADES, ENTIDADE_SLUGS, linksDaEntidade } from "../src/lib/entidades";
import { CURATED_PATHS, ENTIDADES_SLUGS } from "./lib/curated-urls.mjs";
// @ts-expect-error — módulo gerado sem tipos
import { ENTIDADES_ROUTES } from "./lib/entidades-static.mjs";

const erros: string[] = [];
const curadas = new Set<string>(CURATED_PATHS as string[]);

for (const e of ENTIDADES) {
  const campos: Array<[string, unknown[]]> = [
    ["definicao", e.definicao],
    ["problemas", e.problemas],
    ["ferramentas", e.ferramentas],
    ["decisoes", e.decisoes],
    ["artigos", e.artigos],
    ["servicos", e.servicos],
    ["cidades", e.cidades],
    ["fontes", e.fontes],
    ["tambemChamada", e.tambemChamada],
  ];
  for (const [nome, valor] of campos) {
    if (!Array.isArray(valor) || valor.length === 0) {
      erros.push(`[${e.slug}] campo obrigatório vazio: ${nome}`);
    }
  }
  if (!e.resumo || e.resumo.length < 60) {
    erros.push(`[${e.slug}] resumo ausente ou curto demais`);
  }

  for (const to of linksDaEntidade(e)) {
    if (!curadas.has(to)) {
      erros.push(`[${e.slug}] link interno fora do manifesto curado: ${to}`);
    }
  }

  for (const rel of e.relacionadas) {
    if (!ENTIDADE_SLUGS.includes(rel)) {
      erros.push(`[${e.slug}] entidade relacionada inexistente: ${rel}`);
    }
  }

  for (const f of e.fontes) {
    if (!/^https:\/\//.test(f.url)) {
      erros.push(`[${e.slug}] fonte sem https: ${f.url}`);
    }
  }
}

const doManifesto = [...ENTIDADES_SLUGS].sort().join(",");
const doCodigo = [...ENTIDADE_SLUGS].sort().join(",");
if (doManifesto !== doCodigo) {
  erros.push(
    `slugs divergentes entre src/lib/entidades.ts (${doCodigo}) e scripts/lib/curated-urls.mjs (${doManifesto})`,
  );
}

const esperadas = new Set(["/entidades", ...ENTIDADE_SLUGS.map((s) => `/entidades/${s}`)]);
const espelhadas = new Set<string>(
  (ENTIDADES_ROUTES as Array<{ path: string }>).map((r) => r.path),
);
for (const p of esperadas) {
  if (!espelhadas.has(p)) {
    erros.push(`espelho estático sem a rota ${p} — rode bun scripts/generate-entidades-static.ts`);
  }
}
for (const p of espelhadas) {
  if (!esperadas.has(p)) erros.push(`espelho estático com rota inesperada: ${p}`);
}

if (erros.length > 0) {
  console.error("check:entidades FALHOU\n" + erros.map((e) => ` - ${e}`).join("\n"));
  process.exit(1);
}

console.log(
  `check:entidades OK — ${ENTIDADES.length} entidades, ${ENTIDADES.reduce((n, e) => n + linksDaEntidade(e).length, 0)} links internos validados.`,
);
