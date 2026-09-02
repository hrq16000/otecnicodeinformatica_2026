#!/usr/bin/env node
/**
 * AUDITORIA E-E-A-T POR URL DO SITEMAP DINÂMICO (motor único).
 *
 * Reaproveita:
 *   - `scripts/audit-trust-claims.mjs` (via src/data/trustClaimsAudit.json) para
 *     a classificação de afirmações;
 *   - `scripts/lib/curated-urls.mjs` (sitemap curado = URLs indexáveis reais);
 *   - `scripts/lib/ssr-harness.mjs` para o HTML SSR real de cada rota.
 *
 * Avalia, por URL:
 *   técnico   → title, description, canonical, JSON-LD;
 *   editorial → fontes primárias, limite/segurança, ligação com
 *               ferramenta/decisão/serviço/entidade, densidade mínima;
 *   confiança → afirmações CONDICIONAL / REMOVIDA / PENDENTE herdadas do ledger.
 *
 * Saída: src/data/auditoriaConteudo.json (painéis /admin/afirmacoes e /admin/seo).
 *
 * Fail-closed: sem SSR disponível, NADA é reescrito e o status vira
 * PENDENTE_SSR — nunca "OK" por ausência de evidência.
 *
 * Uso: node scripts/audit-conteudo-urls.mjs [--check] [--familia=guia]
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { CURATED_PATHS } from "./lib/curated-urls.mjs";
import { prepararSsr, htmlDaRota, ssrBloqueado, resumo } from "./lib/ssr-harness.mjs";

const ROOT = process.cwd();
const OUT = join(ROOT, "src", "data", "auditoriaConteudo.json");
const CLAIMS = join(ROOT, "src", "data", "trustClaimsAudit.json");

const FONTES_PRIMARIAS = [
  "learn.microsoft.com",
  "support.microsoft.com",
  "docs.microsoft.com",
  "cisa.gov",
  "cert.br",
  "nist.gov",
  "kernel.org",
  "iso.org",
  "intel.com",
  "amd.com",
];

const MARCADORES_LIMITE = [
  "quando parar",
  "quando procurar",
  "não prossiga",
  "nao prossiga",
  "pare imediatamente",
  "risco de perda",
  "limite seguro",
  "não recomendamos",
  "nao recomendamos",
  "interrompa",
  "evite continuar",
];

/** Famílias de conteúdo: define o critério editorial aplicado a cada URL. */
const FAMILIAS = [
  { id: "guia-tecnico", titulo: "Guia técnico (Atlas)", teste: (p) => p.startsWith("/guia-tecnico-informatica") },
  { id: "decisao", titulo: "Guia de decisão", teste: (p) => p.startsWith("/decisoes/") },
  { id: "ferramenta", titulo: "Ferramenta / checklist", teste: (p) => p.startsWith("/ferramentas") },
  { id: "glossario", titulo: "Glossário", teste: (p) => p.startsWith("/glossario") },
  { id: "entidade", titulo: "Entidade", teste: (p) => p.startsWith("/entidades") },
  { id: "problema", titulo: "Problema / sintoma", teste: (p) => p.startsWith("/problemas") },
  { id: "pilar", titulo: "Pilar editorial", teste: (p) => p.startsWith("/blog") || p.startsWith("/biblioteca") },
  { id: "servico", titulo: "Página comercial (serviço)", teste: (p) => p.startsWith("/servicos") },
  { id: "cidade", titulo: "Página local (cidade/bairro)", teste: (p) => /^\/(tecnico-informatica-|bairros?\/|assistencia)/.test(p) },
  { id: "institucional", titulo: "Institucional", teste: () => true },
];

/** Famílias em que o padrão editorial exige fontes, limite e ligações. */
const FAMILIAS_EDITORIAIS = new Set(["guia-tecnico", "decisao", "pilar", "problema", "glossario", "ferramenta", "entidade"]);

function familiaDe(path) {
  return FAMILIAS.find((f) => f.teste(path));
}

function texto(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function jsonLdTipos(html) {
  const tipos = new Set();
  const re = /<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      const parsed = JSON.parse(m[1]);
      const lista = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of lista) {
        for (const no of item?.["@graph"] ?? [item]) {
          if (no?.["@type"]) tipos.add(String(Array.isArray(no["@type"]) ? no["@type"][0] : no["@type"]));
        }
      }
    } catch {
      tipos.add("INVALIDO");
    }
  }
  return [...tipos].sort();
}

function meta(html, attr, valor) {
  const re = new RegExp(`<meta[^>]+${attr}=["']${valor}["'][^>]*content=["']([^"']*)["']`, "i");
  const alt = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*${attr}=["']${valor}["']`, "i");
  return (html.match(re)?.[1] ?? html.match(alt)?.[1] ?? "").trim();
}

function auditarHtml(path, html, familia) {
  const corpo = texto(html);
  const tecnicos = [];
  const editoriais = [];

  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim();
  const description = meta(html, "name", "description");
  const canonical = (html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1] ?? "").trim();
  const tipos = jsonLdTipos(html);
  const palavras = corpo.split(" ").filter(Boolean).length;

  if (!title) tecnicos.push("sem title");
  else if (title.length < 25 || title.length > 70) tecnicos.push(`title com ${title.length} caracteres`);
  if (!description) tecnicos.push("sem meta description");
  else if (description.length < 70 || description.length > 165) tecnicos.push(`description com ${description.length} caracteres`);
  if (!canonical) tecnicos.push("sem canonical");
  if (!tipos.length) tecnicos.push("sem JSON-LD");
  if (tipos.includes("INVALIDO")) tecnicos.push("JSON-LD inválido");

  const comFontes = FONTES_PRIMARIAS.some((d) => html.includes(d));
  const comLimite = MARCADORES_LIMITE.some((t) => corpo.includes(t));
  const ligacoes = {
    ferramenta: /href="\/ferramentas/.test(html),
    decisao: /href="\/decisoes\//.test(html),
    servico: /href="\/servicos\//.test(html),
    entidade: /href="\/entidades/.test(html),
    problema: /href="\/problemas/.test(html),
  };
  const totalLigacoes = Object.values(ligacoes).filter(Boolean).length;

  if (FAMILIAS_EDITORIAIS.has(familia.id)) {
    if (!comFontes) editoriais.push("sem fonte primária citada");
    if (!comLimite) editoriais.push("sem bloco de limite/quando parar");
    if (totalLigacoes < 2) editoriais.push("ligação semântica insuficiente (<2 destinos)");
    if (palavras < 350) editoriais.push(`escopo técnico curto (${palavras} palavras)`);
  } else if (palavras < 200) {
    editoriais.push(`conteúdo raso (${palavras} palavras)`);
  }

  return {
    path,
    familia: familia.id,
    familiaTitulo: familia.titulo,
    title,
    description,
    canonical,
    jsonLd: tipos,
    palavras,
    fontesPrimarias: comFontes,
    limiteSeguranca: comLimite,
    ligacoes,
    alertasTecnicos: tecnicos,
    alertasEditoriais: editoriais,
  };
}

function statusDe(linha, claims) {
  if (linha.ssr === "PENDENTE_SSR") return "PENDENTE_SSR";
  if (claims.REMOVIDA || claims.PENDENTE) return "PENDENTE_REVISAO";
  if (linha.alertasTecnicos.length) return "ALERTA_TECNICO";
  if (linha.alertasEditoriais.length) return "ALERTA_EDITORIAL";
  return "OK";
}

async function main() {
  const modoCheck = process.argv.includes("--check");
  const filtro = process.argv.find((a) => a.startsWith("--familia="))?.split("=")[1];

  if (modoCheck) {
    if (!existsSync(OUT)) {
      console.error("✗ src/data/auditoriaConteudo.json ausente. Rode: npm run report:auditoria-conteudo");
      process.exit(1);
    }
    const atual = JSON.parse(readFileSync(OUT, "utf8"));
    const faltando = CURATED_PATHS.filter((p) => !atual.urls?.some((u) => u.path === p));
    if (faltando.length) {
      console.error(`✗ ${faltando.length} URLs curadas fora da auditoria (ex.: ${faltando.slice(0, 3).join(", ")}).`);
      console.error("  Rode: npm run report:auditoria-conteudo");
      process.exit(1);
    }
    console.log(`✓ Auditoria de conteúdo em dia (${atual.urls.length} URLs, gerada em ${atual.geradoEm}).`);
    return;
  }

  const claimsPorUrl = new Map();
  if (existsSync(CLAIMS)) {
    for (const u of JSON.parse(readFileSync(CLAIMS, "utf8")).urls ?? []) {
      claimsPorUrl.set(u.path, u.porClasse ?? {});
    }
  }

  const alvo = filtro ? CURATED_PATHS.filter((p) => familiaDe(p).id === filtro) : CURATED_PATHS;
  await prepararSsr(alvo);

  if (ssrBloqueado()) {
    console.error("✗ SSR indisponível (UNKNOWN_SSR_UNAVAILABLE). Nada foi reescrito — suba o servidor e repita.");
    process.exit(1);
  }

  const urls = [];
  for (const path of alvo) {
    const familia = familiaDe(path);
    const html = htmlDaRota(path);
    const claims = claimsPorUrl.get(path) ?? {};
    if (!html) {
      urls.push({
        path,
        familia: familia.id,
        familiaTitulo: familia.titulo,
        ssr: "PENDENTE_SSR",
        alertasTecnicos: ["rota não renderizada pelo SSR"],
        alertasEditoriais: [],
        jsonLd: [],
        claims,
        status: "PENDENTE_SSR",
      });
      continue;
    }
    const linha = { ...auditarHtml(path, html, familia), ssr: "OK", claims };
    linha.status = statusDe(linha, claims);
    urls.push(linha);
  }

  const familias = new Map();
  for (const u of urls) {
    const f = familias.get(u.familia) ?? {
      id: u.familia,
      titulo: u.familiaTitulo,
      urls: 0,
      ok: 0,
      alertaTecnico: 0,
      alertaEditorial: 0,
      pendenteRevisao: 0,
      pendenteSsr: 0,
      semFonte: 0,
      semLimite: 0,
      condicionais: 0,
    };
    f.urls += 1;
    if (u.status === "OK") f.ok += 1;
    if (u.status === "ALERTA_TECNICO") f.alertaTecnico += 1;
    if (u.status === "ALERTA_EDITORIAL") f.alertaEditorial += 1;
    if (u.status === "PENDENTE_REVISAO") f.pendenteRevisao += 1;
    if (u.status === "PENDENTE_SSR") f.pendenteSsr += 1;
    if (u.ssr === "OK" && !u.fontesPrimarias && FAMILIAS_EDITORIAIS.has(u.familia)) f.semFonte += 1;
    if (u.ssr === "OK" && !u.limiteSeguranca && FAMILIAS_EDITORIAIS.has(u.familia)) f.semLimite += 1;
    f.condicionais += u.claims?.CONDICIONAL ?? 0;
    familias.set(u.familia, f);
  }

  const relatorio = {
    geradoEm: new Date().toISOString(),
    fonte: "sitemap curado (scripts/lib/curated-urls.mjs) + SSR real",
    ssr: resumo(),
    total: urls.length,
    porStatus: urls.reduce((acc, u) => ({ ...acc, [u.status]: (acc[u.status] ?? 0) + 1 }), {}),
    familias: [...familias.values()].sort((a, b) => b.urls - a.urls),
    urls: urls.sort((a, b) => a.path.localeCompare(b.path)),
  };

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, `${JSON.stringify(relatorio, null, 2)}\n`);
  const s = relatorio.porStatus;
  console.log(
    `✓ src/data/auditoriaConteudo.json — ${urls.length} URLs · OK ${s.OK ?? 0} · ` +
      `editorial ${s.ALERTA_EDITORIAL ?? 0} · técnico ${s.ALERTA_TECNICO ?? 0} · ` +
      `revisão ${s.PENDENTE_REVISAO ?? 0} · SSR pendente ${s.PENDENTE_SSR ?? 0}`,
  );
}

main();
