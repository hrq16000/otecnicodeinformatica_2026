#!/usr/bin/env bun
/**
 * GATE — BIBLIOTECA TÉCNICA (Fase 3): glossário + ferramentas orientativas.
 *
 * Bloqueia o build quando a biblioteca diverge das fontes de verdade:
 *   1. Paridade de slugs: scripts/lib/curated-urls.mjs ↔ src/lib/*.ts.
 *   2. Paridade do espelho estático (scripts/lib/biblioteca-static.mjs) com o
 *      título/descrição que PageSEO emite em runtime (mesmo truncamento).
 *   3. Todos os links internos (termos, ferramentas e pontes) apontam para
 *      rotas que EXISTEM no registro de rotas — nenhum destino inventado.
 *   4. Contrato editorial de segurança: todo termo tem "o que não fazer",
 *      fonte primária e ponte real; toda ferramenta tem aviso de segurança,
 *      condições de parada, interpretações (estado de conclusão) e fontes.
 *   5. Pontes página→biblioteca só referenciam slugs reais (fail-closed).
 *
 * Uso: bun scripts/check-biblioteca-tecnica.ts
 */
import { readFileSync } from "node:fs";
import { TERMOS_GLOSSARIO, CATEGORIAS_GLOSSARIO } from "../src/lib/glossarioTecnico";
import { FERRAMENTAS_TECNICAS } from "../src/lib/ferramentasTecnicas";
import { BIBLIOTECA_PONTES } from "../src/lib/bibliotecaPontes";

const erros: string[] = [];
const err = (msg: string) => erros.push(msg);

// ── fontes auxiliares ──────────────────────────────────────────────────────
const { GLOSSARIO_SLUGS, FERRAMENTAS_SLUGS } = await import("./lib/curated-urls.mjs");
const { BIBLIOTECA_ROUTES } = await import("./lib/biblioteca-static.mjs");

// ── 1. paridade de slugs com o manifesto curado ────────────────────────────
const tsGlossario = TERMOS_GLOSSARIO.map((t) => t.slug);
const tsFerramentas = FERRAMENTAS_TECNICAS.map((f) => f.slug);

for (const s of GLOSSARIO_SLUGS as string[]) {
  if (!tsGlossario.includes(s)) err(`curated-urls: termo "${s}" não existe em glossarioTecnico.ts`);
}
for (const s of tsGlossario) {
  if (!(GLOSSARIO_SLUGS as string[]).includes(s)) err(`glossarioTecnico: termo "${s}" fora de curated-urls.mjs (sitemap)`);
}
for (const s of FERRAMENTAS_SLUGS as string[]) {
  if (!tsFerramentas.includes(s)) err(`curated-urls: ferramenta "${s}" não existe em ferramentasTecnicas.ts`);
}
for (const s of tsFerramentas) {
  if (!(FERRAMENTAS_SLUGS as string[]).includes(s)) err(`ferramentasTecnicas: ferramenta "${s}" fora de curated-urls.mjs (sitemap)`);
}
const dupGloss = tsGlossario.filter((s, i) => tsGlossario.indexOf(s) !== i);
const dupFerr = tsFerramentas.filter((s, i) => tsFerramentas.indexOf(s) !== i);
for (const d of dupGloss) err(`glossário: slug duplicado "${d}"`);
for (const d of dupFerr) err(`ferramentas: slug duplicado "${d}"`);

// ── 2. paridade do espelho estático (título/descrição do prerender) ────────
const metaDescription = (texto: string) => {
  if (texto.length <= 158) return texto;
  const corte = texto.slice(0, 155);
  return `${corte.slice(0, corte.lastIndexOf(" "))}…`;
};
const estatico = new Map(
  (BIBLIOTECA_ROUTES as { path: string; title: string; description: string }[]).map((r) => [r.path, r]),
);
const conferir = (path: string, title: string, description: string) => {
  const m = estatico.get(path);
  if (!m) return err(`biblioteca-static: rota ausente do espelho — ${path}`);
  if (m.title !== title) err(`biblioteca-static ${path}: title divergente do runtime ("${m.title}" ≠ "${title}")`);
  if (m.description !== description) err(`biblioteca-static ${path}: description divergente do runtime`);
};
for (const t of TERMOS_GLOSSARIO) {
  conferir(`/glossario/${t.slug}`, `O que é ${t.termo}? | Glossário Técnico`, metaDescription(t.resumo));
}
for (const f of FERRAMENTAS_TECNICAS) {
  conferir(`/ferramentas/${f.slug}`, `${f.nome} | Ferramenta gratuita`, metaDescription(f.resumo));
}
if (!estatico.has("/glossario")) err("biblioteca-static: hub /glossario ausente");
if (!estatico.has("/ferramentas")) err("biblioteca-static: hub /ferramentas ausente");
if (estatico.size !== tsGlossario.length + tsFerramentas.length + 2) {
  err(`biblioteca-static: ${estatico.size} rota(s) no espelho (esperado ${tsGlossario.length + tsFerramentas.length + 2})`);
}

// ── 3. todo link interno aponta para rota registrada ───────────────────────
const legacy = readFileSync("src/legacyRouteElements.tsx", "utf8");
const padroes = [...legacy.matchAll(/"(\/[^"\n]*)":\s/g)].map((m) => m[1]);
const regexRotas = padroes.map(
  (p) =>
    new RegExp(
      `^${p
        .split("/")
        .map((seg) => (seg.startsWith(":") ? "[^/]+" : seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
        .join("/")}$`,
    ),
);
const rotaExiste = (to: string) => {
  const semAncora = to.split("#")[0];
  if (semAncora === "") return true; // âncora na própria página
  return regexRotas.some((re) => re.test(semAncora));
};
const validarLinks = (origem: string, links: { to: string; rotulo: string; contexto: string }[]) => {
  if (links.length === 0) err(`${origem}: sem nenhuma ponte interna (links vazio)`);
  for (const l of links) {
    if (!rotaExiste(l.to)) err(`${origem}: link para rota inexistente — ${l.to}`);
    if (!l.contexto?.trim()) err(`${origem}: link ${l.to} sem frase de contexto`);
  }
};
for (const t of TERMOS_GLOSSARIO) {
  validarLinks(`glossário/${t.slug}`, t.links);
  for (const r of t.relacionados) {
    if (!tsGlossario.includes(r)) err(`glossário/${t.slug}: relacionado "${r}" não existe`);
    if (r === t.slug) err(`glossário/${t.slug}: relacionado aponta para si mesmo`);
  }
}
for (const f of FERRAMENTAS_TECNICAS) {
  validarLinks(`ferramenta/${f.slug}`, f.links);
  for (const s of f.termos) {
    if (!tsGlossario.includes(s)) err(`ferramenta/${f.slug}: termo citado "${s}" não existe no glossário`);
  }
  for (const i of f.interpretacoes) {
    if (i.to && !rotaExiste(i.to)) err(`ferramenta/${f.slug}: interpretação com rota inexistente — ${i.to}`);
  }
}

// ── 4. contrato editorial de segurança ─────────────────────────────────────
for (const t of TERMOS_GLOSSARIO) {
  if (t.definicao.length === 0) err(`glossário/${t.slug}: sem definição`);
  if (t.naoFazer.length === 0) err(`glossário/${t.slug}: sem "o que não fazer"`);
  if (t.verificacoesSeguras.length === 0) err(`glossário/${t.slug}: sem verificações seguras`);
  if (t.fontes.length === 0) err(`glossário/${t.slug}: sem fonte primária`);
  if (!t.riscoNota?.trim()) err(`glossário/${t.slug}: sem nota de risco`);
  if (!CATEGORIAS_GLOSSARIO.includes(t.categoria)) err(`glossário/${t.slug}: categoria desconhecida`);
  for (const f of t.fontes) {
    if (!/^https:\/\//.test(f.url)) err(`glossário/${t.slug}: fonte sem https — ${f.url}`);
  }
}
const PROIBIDO = /desative (o antivírus|as proteções|o windows defender) permanentemente|garantimos a recuperação|100% de chance/i;
for (const f of FERRAMENTAS_TECNICAS) {
  if (!f.avisoSeguranca?.trim()) err(`ferramenta/${f.slug}: sem aviso de segurança`);
  if (f.quandoParar.length === 0) err(`ferramenta/${f.slug}: sem condições de parada (estado de erro)`);
  if (f.interpretacoes.length < 2) err(`ferramenta/${f.slug}: menos de 2 interpretações (estado de conclusão)`);
  if (f.passos.length < 3) err(`ferramenta/${f.slug}: menos de 3 passos`);
  if (!f.conclusao?.trim()) err(`ferramenta/${f.slug}: sem conclusão`);
  if (!f.limites?.trim()) err(`ferramenta/${f.slug}: sem declaração de limites`);
  if (f.fontes.length === 0) err(`ferramenta/${f.slug}: sem fonte primária`);
  const texto = JSON.stringify(f);
  if (PROIBIDO.test(texto)) err(`ferramenta/${f.slug}: texto viola o contrato de segurança (promessa/desativação)`);
}

// ── 5. pontes página → biblioteca (fail-closed) ────────────────────────────
for (const [chave, def] of Object.entries(BIBLIOTECA_PONTES)) {
  if (!def.intro?.trim()) err(`ponte ${chave}: sem texto próprio`);
  for (const s of def.ferramentas ?? []) {
    if (!tsFerramentas.includes(s)) err(`ponte ${chave}: ferramenta inexistente — ${s}`);
  }
  for (const s of def.termos ?? []) {
    if (!tsGlossario.includes(s)) err(`ponte ${chave}: termo inexistente — ${s}`);
  }
  if ((def.ferramentas ?? []).length + (def.termos ?? []).length === 0) {
    err(`ponte ${chave}: declarada mas vazia`);
  }
}
const introsPonte = Object.values(BIBLIOTECA_PONTES).map((p) => p.intro);
for (const dup of introsPonte.filter((i, n) => introsPonte.indexOf(i) !== n)) {
  err(`pontes: texto de introdução repetido entre páginas — "${dup.slice(0, 60)}…"`);
}

// ── 6. guias de decisão independentes (Fase 4) ─────────────────────────────
const { DECISOES_SLUGS } = await import("./lib/curated-urls.mjs");
const tsDecisoes = GUIAS_DECISAO.map((g) => g.slug);
for (const s of DECISOES_SLUGS as string[]) {
  if (!tsDecisoes.includes(s)) err(`decisões: slug curado "${s}" sem guia em guiasDecisao.ts`);
}
for (const s of tsDecisoes) {
  if (!(DECISOES_SLUGS as string[]).includes(s)) err(`decisões: guia "${s}" fora do sitemap curado`);
}
const PRAZO = /\b(em até \d+\s*(h|horas|minutos)|no mesmo dia|garantimos o prazo)\b/i;
for (const g of GUIAS_DECISAO) {
  if (!cardAtlasDoGuia(g.slug)) err(`decisão/${g.slug}: sem card correspondente no Atlas`);
  if (!g.respostaDireta?.trim()) err(`decisão/${g.slug}: sem resposta direta`);
  if (g.comoDecidir.length < 3) err(`decisão/${g.slug}: menos de 3 critérios de decisão`);
  if (g.ondeParar.length === 0) err(`decisão/${g.slug}: sem condições de parada`);
  if (g.perguntas.length < 2) err(`decisão/${g.slug}: menos de 2 perguntas frequentes`);
  if ((g.fontes ?? []).length === 0) err(`decisão/${g.slug}: sem fonte primária`);
  for (const f of g.fontes ?? []) {
    if (!/^https:\/\//.test(f.url)) err(`decisão/${g.slug}: fonte sem https — ${f.url}`);
  }
  validarLinks(`decisão/${g.slug}`, g.links);
  const texto = JSON.stringify(g);
  if (PROIBIDO.test(texto)) err(`decisão/${g.slug}: viola o contrato de segurança`);
  if (PRAZO.test(texto)) err(`decisão/${g.slug}: promessa de prazo no texto`);
}
const respostas = GUIAS_DECISAO.map((g) => g.respostaDireta);
for (const dup of respostas.filter((r, n) => respostas.indexOf(r) !== n)) {
  err(`decisões: resposta direta repetida entre guias — "${dup.slice(0, 60)}…"`);
}

// ── resultado ──────────────────────────────────────────────────────────────
console.log(
  `Biblioteca técnica: ${TERMOS_GLOSSARIO.length} termo(s) · ${FERRAMENTAS_TECNICAS.length} ferramenta(s) · ${GUIAS_DECISAO.length} guia(s) de decisão · ${Object.keys(BIBLIOTECA_PONTES).length} ponte(s) · ${estatico.size} rota(s) no espelho estático.`,
);

if (erros.length) {
  console.error(`\n✖ BLOQUEADO: ${erros.length} problema(s) na biblioteca técnica:`);
  for (const e of erros.slice(0, 50)) console.error(`  - ${e}`);
  if (erros.length > 50) console.error(`  … e mais ${erros.length - 50}.`);
  process.exit(1);
}
console.log("✔ Biblioteca técnica íntegra: slugs, espelho estático, links, contrato editorial e pontes.");
