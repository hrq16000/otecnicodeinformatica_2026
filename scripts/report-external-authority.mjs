#!/usr/bin/env node
/**
 * RODADA 5C — Autoridade externa.
 *
 * 1. Varre os links externos citados no conteúdo (fontes e referências dos owners).
 * 2. Verifica o estado HTTP de cada um (HEAD, com fallback GET), sem crawler agressivo.
 * 3. Escreve o snapshot em reports/external-authority-baseline.json, combinando
 *    a evidência da 5B (config/external-authority.json) com a proveniência das fontes.
 *
 * Não cria conteúdo, não envia outreach e não dispara IndexNow.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const CONFIG = JSON.parse(readFileSync(join(ROOT, "config/external-authority.json"), "utf8"));
const SAIDA = join(ROOT, "reports/external-authority-baseline.json");

const IGNORAR = /(localhost|127\.0\.0\.1|example\.com|schema\.org|w3\.org|otecnicodeinformatica\.com\.br)/i;
const LIMITE_CONCORRENCIA = 6;
const TIMEOUT_MS = 12_000;

function arquivos(dir, acc = []) {
  for (const nome of readdirSync(dir)) {
    if (nome === "node_modules" || nome.startsWith(".")) continue;
    const caminho = join(dir, nome);
    const info = statSync(caminho);
    if (info.isDirectory()) {
      // Fixtures e testes usam números/URLs fictícios — nunca entram no
      // relatório público de autoridade externa.
      if (nome === "__tests__" || nome === "test") continue;
      arquivos(caminho, acc);
    } else if (/\.(test|spec)\.(ts|tsx)$/.test(nome)) continue;
    else if (/\.(ts|tsx|json|md)$/.test(nome)) acc.push(caminho);
  }
  return acc;
}

function coletarLinks() {
  const mapa = new Map();
  for (const caminho of arquivos(join(ROOT, "src"))) {
    const conteudo = readFileSync(caminho, "utf8");
    for (const match of conteudo.matchAll(/https?:\/\/[^\s"'`)<>\\]+/g)) {
      const url = match[0].replace(/[.,;)]+$/, "");
      if (IGNORAR.test(url) || url.includes("${") || url.includes("$(")) continue;
      const registro = mapa.get(url) ?? { url, origens: new Set() };
      registro.origens.add(caminho.replace(`${ROOT}/`, ""));
      mapa.set(url, registro);
    }
  }
  return [...mapa.values()].map((r) => ({ url: r.url, origens: [...r.origens].sort() }));
}

async function verificar(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const opcoes = {
    signal: controller.signal,
    redirect: "follow",
    headers: { "user-agent": "Mozilla/5.0 (compatible; otecnicodeinformatica-link-audit/1.0)" },
  };
  try {
    let resposta = await fetch(url, { ...opcoes, method: "HEAD" });
    if (resposta.status === 405 || resposta.status === 501) {
      resposta = await fetch(url, { ...opcoes, method: "GET" });
    }
    return {
      status: resposta.status,
      finalUrl: resposta.url,
      redirecionado: resposta.url !== url,
      estado: resposta.ok ? "OK" : resposta.status === 404 ? "QUEBRADO" : "ATENCAO",
    };
  } catch (erro) {
    return {
      status: null,
      finalUrl: null,
      redirecionado: false,
      estado: erro?.name === "AbortError" ? "TIMEOUT" : "FALHA",
      erro: String(erro?.message ?? erro).slice(0, 160),
    };
  } finally {
    clearTimeout(timer);
  }
}

async function emLotes(itens, tarefa) {
  const saida = [];
  for (let i = 0; i < itens.length; i += LIMITE_CONCORRENCIA) {
    const lote = itens.slice(i, i + LIMITE_CONCORRENCIA);
    saida.push(...(await Promise.all(lote.map(tarefa))));
  }
  return saida;
}

const offline = process.argv.includes("--offline");
const links = coletarLinks();

const verificados = offline
  ? links.map((l) => ({ ...l, estado: "NAO_VERIFICADO", status: null }))
  : await emLotes(links, async (l) => ({ ...l, ...(await verificar(l.url)) }));

const porDominio = new Map();
for (const link of verificados) {
  let host;
  try {
    host = new URL(link.url).hostname.replace(/^www\./, "");
  } catch {
    continue;
  }
  const atual = porDominio.get(host) ?? { referring_domain: host, links: 0, quebrados: 0 };
  atual.links += 1;
  if (link.estado === "QUEBRADO") atual.quebrados += 1;
  porDominio.set(host, atual);
}

const agora = new Date().toISOString();
const snapshot = {
  gerado_em: agora,
  modo: offline ? "offline" : "online",
  identidade: CONFIG.identidadeCanonica,
  backlinks_5b: CONFIG.backlinks,
  perfis: CONFIG.perfis,
  same_as: CONFIG.sameAs,
  mencoes_sem_link: CONFIG.mencoesSemLink,
  parceiros: CONFIG.parceiros,
  diretorios: CONFIG.diretorios,
  baseline_busca_marca: CONFIG.baselineBuscaDeMarca,
  fontes_citadas: verificados.map((l) => ({
    source_url: l.url,
    target_url: null,
    publisher: (() => {
      try {
        return new URL(l.url).hostname.replace(/^www\./, "");
      } catch {
        return null;
      }
    })(),
    type: "referencia_editorial",
    status: l.status,
    estado: l.estado,
    redirecionado: l.redirecionado ?? false,
    final_url: l.finalUrl ?? null,
    origens: l.origens,
    last_seen: agora,
  })),
  dominios: [...porDominio.values()].sort((a, b) => b.links - a.links),
  resumo: {
    links_verificados: verificados.length,
    ok: verificados.filter((l) => l.estado === "OK").length,
    atencao: verificados.filter((l) => l.estado === "ATENCAO").length,
    quebrados: verificados.filter((l) => l.estado === "QUEBRADO").length,
    timeout: verificados.filter((l) => l.estado === "TIMEOUT" || l.estado === "FALHA").length,
    perfis_manual_required: CONFIG.perfis.filter((p) => p.estado === "MANUAL_REQUIRED").length,
    p1_pendentes: CONFIG.perfis.filter((p) => p.prioridade === "P1" && p.estado !== "OK").length,
    mencoes_sem_link: CONFIG.mencoesSemLink.length,
    referring_domains_5b: CONFIG.backlinks.referringDomains,
  },
};

mkdirSync(join(ROOT, "reports"), { recursive: true });
writeFileSync(SAIDA, `${JSON.stringify(snapshot, null, 2)}\n`);
// Cópia pública consumida pelo painel /admin/indexacao.
mkdirSync(join(ROOT, "public"), { recursive: true });
writeFileSync(join(ROOT, "public/external-authority.json"), `${JSON.stringify(snapshot, null, 2)}\n`);

const { resumo } = snapshot;
console.log(
  `[autoridade] ${resumo.links_verificados} link(s) externo(s) · OK ${resumo.ok} · atenção ${resumo.atencao} · quebrados ${resumo.quebrados} · falhas ${resumo.timeout}`,
);
console.log(`[autoridade] snapshot em reports/external-authority-baseline.json`);

if (resumo.quebrados > 0) {
  console.log("[autoridade] links quebrados (corrigir apenas a URL, sem reescrever texto):");
  for (const l of verificados.filter((x) => x.estado === "QUEBRADO")) {
    console.log(`  - ${l.url} ← ${l.origens.join(", ")}`);
  }
}
