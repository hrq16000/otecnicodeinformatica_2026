#!/usr/bin/env node
/**
 * LEDGER DE INDEXAÇÃO E DESEMPENHO — Google Search Console + Bing Webmaster.
 *
 * Consolida, por URL e por segmento (artigo, cidade, serviço, problema, ...):
 *   - impressões, cliques, CTR e posição média (GSC, janela de 28 dias)
 *   - variação contra a janela anterior de 28 dias (crescimento comprovado)
 *   - consultas por URL e consultas por segmento
 *   - cobertura de indexação por URL (URL Inspection, somente leitura)
 *   - métricas equivalentes do Bing Webmaster Tools quando a chave existe
 *
 * FAIL-CLOSED: sem credencial, o campo vira UNKNOWN e `disponivel: false`.
 * Ausência de dado NUNCA vira zero e o script nunca afirma indexação real.
 *
 * Uso:
 *   node scripts/report-indexacao-ledger.mjs                 # coleta + relatório
 *   node scripts/report-indexacao-ledger.mjs --inspecionar=40  # inspeciona 40 URLs
 *   node scripts/report-indexacao-ledger.mjs --inspecionar=all
 *   node scripts/report-indexacao-ledger.mjs --alert         # sai 1 em regressão
 *
 * Saídas:
 *   public/indexacao-ledger.json   (consumido por /admin/seo → aba Indexação)
 *   reports/indexacao-ledger.md
 *   reports/indexacao-historico.json (série temporal, append idempotente por dia)
 *   reports/indexacao-inspecao.json  (cache de URL Inspection, TTL 7 dias)
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { ACTIVE_SITEMAPS } from "./lib/curated-urls.mjs";
import { resolveSite, inspectUrl, searchAnalytics, dayOffset } from "./lib/gsc-client.mjs";
import {
  bingDisponivel,
  bingTrafficStats,
  bingPageStats,
  bingQueryStats,
  bingCrawlStats,
} from "./lib/bing-client.mjs";

const ALERT = process.argv.includes("--alert");
const argInspecionar = process.argv.find((a) => a.startsWith("--inspecionar="));
const INSPECIONAR = argInspecionar ? argInspecionar.split("=")[1] : "0";
const BASE = (process.env.VITE_SITE_DOMAIN ?? "https://otecnicodeinformatica.com.br").replace(/\/$/, "");
const LEDGER = "public/indexacao-ledger.json";
const HISTORICO = "reports/indexacao-historico.json";
const CACHE_INSPECAO = "reports/indexacao-inspecao.json";
const TTL_INSPECAO_DIAS = 7;

const gscDisponivel = Boolean(process.env.LOVABLE_API_KEY && process.env.GOOGLE_SEARCH_CONSOLE_API_KEY);

mkdirSync("reports", { recursive: true });

/** Segmento editorial/comercial de cada URL curada. */
function segmentoDe(path, sitemap) {
  if (path.startsWith("/blog")) return "artigo";
  if (path.startsWith("/glossario") || path.startsWith("/ferramentas") || path.startsWith("/entidades"))
    return "biblioteca";
  if (path.startsWith("/decisoes")) return "guia";
  if (path.startsWith("/problemas")) return "problema";
  if (path.startsWith("/solucoes")) return "solucao";
  if (path.startsWith("/equipamentos")) return "equipamento";
  if (sitemap.includes("bairros") || path.startsWith("/bairros")) return "bairro";
  if (sitemap.includes("regioes") || /^\/tecnico-informatica-/.test(path)) return "cidade";
  if (path.startsWith("/servicos") || sitemap.includes("servicos")) return "servico";
  return "pilar";
}

const urls = ACTIVE_SITEMAPS.flatMap(([sitemap, entradas]) =>
  entradas.map((e) => ({
    path: e.path,
    url: `${BASE}${e.path === "/" ? "/" : e.path}`,
    sitemap,
    segmento: segmentoDe(e.path, sitemap),
  })),
);

const janela = {
  atual: { inicio: dayOffset(-30), fim: dayOffset(-3) },
  anterior: { inicio: dayOffset(-58), fim: dayOffset(-31) },
};

const vazio = () => ({ impressoes: null, cliques: null, ctr: null, posicao: null });

async function coletarGsc() {
  if (!gscDisponivel) {
    return {
      disponivel: false,
      motivo: "Credenciais ausentes (LOVABLE_API_KEY + GOOGLE_SEARCH_CONSOLE_API_KEY).",
      site: null,
      porPagina: new Map(),
      porPaginaAnterior: new Map(),
      consultasPorPagina: new Map(),
      consultasTop: [],
    };
  }
  const site = await resolveSite(BASE + "/");
  const query = (inicio, fim, dimensions, rowLimit = 5000) =>
    searchAnalytics(site, { startDate: inicio, endDate: fim, dimensions, rowLimit, type: "web" });

  const [paginas, paginasAnteriores, consultas, paginaConsulta] = await Promise.all([
    query(janela.atual.inicio, janela.atual.fim, ["page"]),
    query(janela.anterior.inicio, janela.anterior.fim, ["page"]),
    query(janela.atual.inicio, janela.atual.fim, ["query"], 200),
    query(janela.atual.inicio, janela.atual.fim, ["page", "query"], 5000),
  ]);

  const mapear = (linhas) =>
    new Map(
      linhas.map((r) => [
        new URL(r.keys[0]).pathname.replace(/\/$/, "") || "/",
        {
          impressoes: r.impressions ?? 0,
          cliques: r.clicks ?? 0,
          ctr: r.ctr != null ? Number((r.ctr * 100).toFixed(2)) : null,
          posicao: r.position != null ? Number(r.position.toFixed(1)) : null,
        },
      ]),
    );

  const consultasPorPagina = new Map();
  for (const r of paginaConsulta) {
    const p = new URL(r.keys[0]).pathname.replace(/\/$/, "") || "/";
    const lista = consultasPorPagina.get(p) ?? [];
    lista.push({
      consulta: r.keys[1],
      impressoes: r.impressions ?? 0,
      cliques: r.clicks ?? 0,
      posicao: r.position != null ? Number(r.position.toFixed(1)) : null,
    });
    consultasPorPagina.set(p, lista);
  }
  for (const [p, lista] of consultasPorPagina) {
    lista.sort((a, b) => b.impressoes - a.impressoes);
    consultasPorPagina.set(p, lista.slice(0, 10));
  }

  return {
    disponivel: true,
    motivo: null,
    site,
    porPagina: mapear(paginas),
    porPaginaAnterior: mapear(paginasAnteriores),
    consultasPorPagina,
    consultasTop: consultas.slice(0, 50).map((r) => ({
      consulta: r.keys[0],
      impressoes: r.impressions ?? 0,
      cliques: r.clicks ?? 0,
      posicao: r.position != null ? Number(r.position.toFixed(1)) : null,
    })),
  };
}

function lerCacheInspecao() {
  if (!existsSync(CACHE_INSPECAO)) return new Map();
  try {
    const json = JSON.parse(readFileSync(CACHE_INSPECAO, "utf8"));
    const limite = Date.now() - TTL_INSPECAO_DIAS * 86400000;
    return new Map(
      (json.itens ?? [])
        .filter((i) => new Date(i.lidoEm).getTime() >= limite)
        .map((i) => [i.path, i]),
    );
  } catch {
    return new Map();
  }
}

async function coletarInspecao(site, cache) {
  if (!gscDisponivel || INSPECIONAR === "0") return cache;
  const limite = INSPECIONAR === "all" ? urls.length : Number(INSPECIONAR) || 0;
  const pendentes = urls.filter((u) => !cache.has(u.path)).slice(0, limite);
  for (const u of pendentes) {
    try {
      const estado = await inspectUrl(site, u.url);
      cache.set(u.path, { path: u.path, lidoEm: new Date().toISOString(), ...estado });
    } catch (e) {
      cache.set(u.path, {
        path: u.path,
        lidoEm: new Date().toISOString(),
        verdict: "ERROR",
        coverageState: "unknown",
        erro: e.message,
      });
    }
  }
  writeFileSync(
    CACHE_INSPECAO,
    JSON.stringify({ atualizadoEm: new Date().toISOString(), itens: [...cache.values()] }, null, 2),
  );
  return cache;
}

async function coletarBing() {
  if (!bingDisponivel()) {
    return {
      disponivel: false,
      motivo: "BING_WEBMASTER_API_KEY ausente — métricas do Bing ficam UNKNOWN.",
    };
  }
  try {
    const [trafego, paginas, consultas, crawl] = await Promise.all([
      bingTrafficStats(),
      bingPageStats(),
      bingQueryStats(),
      bingCrawlStats(),
    ]);
    const totais = trafego.reduce(
      (acc, d) => ({ cliques: acc.cliques + d.cliques, impressoes: acc.impressoes + d.impressoes }),
      { cliques: 0, impressoes: 0 },
    );
    const porPath = paginas
      .map((p) => {
        try {
          return { path: new URL(p.url).pathname.replace(/\/$/, "") || "/", ...p };
        } catch {
          return null;
        }
      })
      .filter(Boolean);
    return {
      disponivel: true,
      motivo: null,
      totais,
      dias: trafego.length,
      crawl,
      topPaginas: porPath.sort((a, b) => b.impressoes - a.impressoes).slice(0, 30),
      topConsultas: consultas.sort((a, b) => b.impressoes - a.impressoes).slice(0, 30),
      porPath: new Map(porPath.map((p) => [p.path, p])),
    };
  } catch (e) {
    return { disponivel: false, motivo: `Falha na API do Bing: ${e.message}` };
  }
}

const gscDados = await coletarGsc();
const cacheInspecao = await coletarInspecao(gscDados.site, lerCacheInspecao());
const bingDados = await coletarBing();

const linhas = urls.map((u) => {
  const atual = gscDados.disponivel ? (gscDados.porPagina.get(u.path) ?? { impressoes: 0, cliques: 0, ctr: 0, posicao: null }) : vazio();
  const anterior = gscDados.disponivel
    ? (gscDados.porPaginaAnterior.get(u.path) ?? { impressoes: 0, cliques: 0, ctr: 0, posicao: null })
    : vazio();
  const inspecao = cacheInspecao.get(u.path) ?? null;
  const bingPagina = bingDados.disponivel ? (bingDados.porPath?.get(u.path) ?? null) : null;
  return {
    path: u.path,
    sitemap: u.sitemap,
    segmento: u.segmento,
    google: {
      disponivel: gscDados.disponivel,
      ...atual,
      deltaImpressoes: gscDados.disponivel ? atual.impressoes - anterior.impressoes : null,
      deltaCliques: gscDados.disponivel ? atual.cliques - anterior.cliques : null,
      cobertura: inspecao?.coverageState ?? "UNKNOWN",
      verdict: inspecao?.verdict ?? "UNKNOWN",
      ultimoRastreio: inspecao?.lastCrawlTime ?? null,
      canonicalGoogle: inspecao?.googleCanonical ?? null,
    },
    bing: bingDados.disponivel
      ? { disponivel: true, impressoes: bingPagina?.impressoes ?? 0, cliques: bingPagina?.cliques ?? 0 }
      : { disponivel: false, impressoes: null, cliques: null },
    consultas: gscDados.consultasPorPagina.get(u.path) ?? [],
  };
});

function agregar(chave) {
  const grupos = new Map();
  for (const l of linhas) {
    const g = grupos.get(l[chave]) ?? {
      nome: l[chave],
      urls: 0,
      impressoes: 0,
      cliques: 0,
      deltaImpressoes: 0,
      comImpressao: 0,
      indexadas: 0,
      inspecionadas: 0,
      consultas: new Map(),
    };
    g.urls += 1;
    if (l.google.disponivel) {
      g.impressoes += l.google.impressoes ?? 0;
      g.cliques += l.google.cliques ?? 0;
      g.deltaImpressoes += l.google.deltaImpressoes ?? 0;
      if ((l.google.impressoes ?? 0) > 0) g.comImpressao += 1;
    }
    if (l.google.verdict !== "UNKNOWN") {
      g.inspecionadas += 1;
      if (l.google.verdict === "PASS") g.indexadas += 1;
    }
    for (const c of l.consultas) {
      g.consultas.set(c.consulta, (g.consultas.get(c.consulta) ?? 0) + c.impressoes);
    }
    grupos.set(l[chave], g);
  }
  return [...grupos.values()]
    .map((g) => ({
      ...g,
      consultas: [...g.consultas.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([consulta, impressoes]) => ({ consulta, impressoes })),
    }))
    .sort((a, b) => b.impressoes - a.impressoes);
}

const segmentos = agregar("segmento");
const totalUrls = linhas.length;
const inspecionadas = linhas.filter((l) => l.google.verdict !== "UNKNOWN").length;
const indexadas = linhas.filter((l) => l.google.verdict === "PASS").length;
const comImpressao = gscDados.disponivel ? linhas.filter((l) => (l.google.impressoes ?? 0) > 0).length : null;
const semImpressao = gscDados.disponivel ? linhas.filter((l) => (l.google.impressoes ?? 0) === 0) : [];
const rastreadasNaoIndexadas = linhas.filter((l) =>
  /crawled|discovered/i.test(l.google.cobertura ?? ""),
);

const totaisGoogle = gscDados.disponivel
  ? linhas.reduce(
      (acc, l) => ({
        impressoes: acc.impressoes + (l.google.impressoes ?? 0),
        cliques: acc.cliques + (l.google.cliques ?? 0),
        deltaImpressoes: acc.deltaImpressoes + (l.google.deltaImpressoes ?? 0),
        deltaCliques: acc.deltaCliques + (l.google.deltaCliques ?? 0),
      }),
      { impressoes: 0, cliques: 0, deltaImpressoes: 0, deltaCliques: 0 },
    )
  : { impressoes: null, cliques: null, deltaImpressoes: null, deltaCliques: null };

const alertas = [];
if (!gscDados.disponivel) alertas.push({ nivel: "config", mensagem: gscDados.motivo });
if (!bingDados.disponivel) alertas.push({ nivel: "config", mensagem: bingDados.motivo });
if (gscDados.disponivel && totaisGoogle.deltaImpressoes < 0)
  alertas.push({
    nivel: "regressao",
    mensagem: `Impressões caíram ${Math.abs(totaisGoogle.deltaImpressoes)} contra a janela anterior.`,
  });
if (gscDados.disponivel && semImpressao.length)
  alertas.push({
    nivel: "atencao",
    mensagem: `${semImpressao.length} URL(s) curadas sem nenhuma impressão em 28 dias.`,
  });
for (const l of rastreadasNaoIndexadas)
  alertas.push({ nivel: "cobertura", mensagem: `${l.path}: ${l.google.cobertura}` });

const ledger = {
  geradoEm: new Date().toISOString(),
  base: BASE,
  janela,
  fontes: {
    google: {
      disponivel: gscDados.disponivel,
      propriedade: gscDados.site,
      motivo: gscDados.motivo,
    },
    bing: {
      disponivel: bingDados.disponivel,
      motivo: bingDados.motivo ?? null,
      crawl: bingDados.crawl ?? null,
      totais: bingDados.totais ?? null,
    },
  },
  cobertura: {
    urlsCuradas: totalUrls,
    inspecionadas,
    indexadas,
    percentualInspecionado: Number(((inspecionadas / totalUrls) * 100).toFixed(1)),
    percentualIndexadoEntreInspecionadas: inspecionadas
      ? Number(((indexadas / inspecionadas) * 100).toFixed(1))
      : null,
    comImpressao,
    rastreadasNaoIndexadas: rastreadasNaoIndexadas.map((l) => l.path),
  },
  totaisGoogle,
  segmentos: segmentos.map(({ consultas, ...s }) => ({ ...s, consultas })),
  consultasTopGoogle: gscDados.consultasTop,
  consultasTopBing: bingDados.topConsultas ?? [],
  paginasTopBing: bingDados.topPaginas ?? [],
  alertas,
  urls: linhas,
  limitacoes:
    "Indexação real depende do Google e do Bing. Este ledger mede cobertura técnica curada, estado lido via URL Inspection (somente leitura) e desempenho observado — nunca garante 100% de indexação.",
};

writeFileSync(LEDGER, JSON.stringify(ledger, null, 2));

// Série temporal (uma entrada por dia, idempotente).
const hoje = new Date().toISOString().slice(0, 10);
const historico = existsSync(HISTORICO) ? JSON.parse(readFileSync(HISTORICO, "utf8")) : { pontos: [] };
historico.pontos = [
  ...historico.pontos.filter((p) => p.data !== hoje),
  {
    data: hoje,
    urlsCuradas: totalUrls,
    inspecionadas,
    indexadas,
    comImpressao,
    impressoesGoogle: totaisGoogle.impressoes,
    cliquesGoogle: totaisGoogle.cliques,
    impressoesBing: bingDados.totais?.impressoes ?? null,
    cliquesBing: bingDados.totais?.cliques ?? null,
  },
].sort((a, b) => a.data.localeCompare(b.data));
writeFileSync(HISTORICO, JSON.stringify(historico, null, 2));

const md = [
  "# Ledger de indexação e desempenho",
  "",
  `Gerado em ${ledger.geradoEm} · janela ${janela.atual.inicio} → ${janela.atual.fim}`,
  "",
  `- Google: ${gscDados.disponivel ? `conectado (${gscDados.site})` : `INDISPONÍVEL — ${gscDados.motivo}`}`,
  `- Bing: ${bingDados.disponivel ? "conectado" : `INDISPONÍVEL — ${bingDados.motivo}`}`,
  `- URLs curadas: ${totalUrls} · inspecionadas: ${inspecionadas} · indexadas (PASS): ${indexadas}`,
  `- Impressões Google: ${totaisGoogle.impressoes ?? "UNKNOWN"} (Δ ${totaisGoogle.deltaImpressoes ?? "UNKNOWN"}) · cliques: ${totaisGoogle.cliques ?? "UNKNOWN"}`,
  "",
  "## Segmentos",
  "",
  "| Segmento | URLs | Impressões | Cliques | Δ impressões | Com impressão |",
  "| --- | ---: | ---: | ---: | ---: | ---: |",
  ...segmentos.map(
    (s) => `| ${s.nome} | ${s.urls} | ${s.impressoes} | ${s.cliques} | ${s.deltaImpressoes} | ${s.comImpressao} |`,
  ),
  "",
  "## Alertas",
  "",
  ...(alertas.length ? alertas.map((a) => `- [${a.nivel}] ${a.mensagem}`) : ["- nenhum"]),
  "",
  `> ${ledger.limitacoes}`,
  "",
].join("\n");
writeFileSync("reports/indexacao-ledger.md", md);

console.log(
  `[indexacao-ledger] ${totalUrls} URL(s) · Google ${gscDados.disponivel ? "ON" : "OFF"} · Bing ${bingDados.disponivel ? "ON" : "OFF"} · inspecionadas ${inspecionadas} · alertas ${alertas.length}`,
);
console.log(`  → ${LEDGER} · reports/indexacao-ledger.md · ${HISTORICO}`);

if (ALERT) {
  const bloqueantes = alertas.filter((a) => a.nivel === "regressao" || a.nivel === "cobertura");
  if (bloqueantes.length) {
    console.error(`\n✖ ${bloqueantes.length} alerta(s) bloqueante(s).`);
    process.exit(1);
  }
}
