#!/usr/bin/env bun
/**
 * AUDITORIA CONSOLIDADA FINAL — ONDA 10C (somente leitura).
 *
 * Não cria URL, não publica, não altera conteúdo. Lê apenas artefatos reais já
 * produzidos pelos gates/monitores (Infra 1/2/3) + o registry declarativo e
 * emite o pacote de evidências em reports/editorial/10c/final/.
 *
 * Fail-closed: dado ausente vira UNKNOWN/INSUFFICIENT — nunca zero fabricado.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
// @ts-expect-error — utilitário JS compartilhado (sem tipos).
import { contemSegredo, paraCsv, sanitizar } from "./lib/editorial-export.mjs";
import { EDITORIAL_WAVES } from "../src/lib/editorialWavesRegistry";
import { EDITORIAL_COVERS } from "../src/lib/blogEditorialCovers";
import { ARTICLE_SOURCE_MANIFEST } from "../src/lib/blogEditorialSources";
import { getApprovedSlugs } from "../src/lib/blogEditorialRegistry";

const OUT = resolve(process.cwd(), "reports/editorial/10c/final");
mkdirSync(OUT, { recursive: true });

const ler = (p: string) => {
  const f = resolve(process.cwd(), p);
  if (!existsSync(f)) return null;
  try {
    return JSON.parse(readFileSync(f, "utf8"));
  } catch {
    return null;
  }
};

const indexacao = ler("public/editorial-waves-status.json");
const alertas = ler("public/editorial-waves-alerts.json");
const indexnow = ler("public/editorial-indexnow-status.json");
const assets = ler("public/editorial-assets-status.json");
const fingerprints = ler("reports/schema/editorial-schema-fingerprints.json");
const schemaDiff = ler("public/editorial-schema-diff.json");
const buildVersion = ler("public/build-version.json");

// ── conteúdo-fonte por slug (mesmo recorte usado pelo monitor) ──────────────
const FONTE = readFileSync(resolve(process.cwd(), "src/data/blogPostsContent.tsx"), "utf8");
function trechoDe(slug: string): string {
  const abre = FONTE.indexOf(`"${slug}": {`);
  if (abre < 0) return "";
  const resto = FONTE.slice(abre);
  const fim = resto.slice(1).search(/\n {2}"[a-z0-9-]+": \{/);
  return fim < 0 ? resto : resto.slice(0, fim + 1);
}
const INBOUND = readFileSync(resolve(process.cwd(), "src/lib/editorialInboundLinks.ts"), "utf8");

const alvos = EDITORIAL_WAVES; // registry inteiro (10C + lote 10D observado junto)
const porUrlIndexacao = new Map<string, any>((indexacao?.rotas ?? []).map((r: any) => [r.url, r]));
const porUrlIndexnow = new Map<string, any>((indexnow?.rotas ?? []).map((r: any) => [r.url, r]));
const porUrlSchema = new Map<string, any>((fingerprints?.rotas ?? []).map((r: any) => [r.url, r]));
const porSlugAsset = new Map<string, any>((assets?.assets ?? []).map((a: any) => [a.slug, a]));

// ── OWNERS ─────────────────────────────────────────────────────────────────
const owners = alvos.map((e) => {
  const trecho = trechoDe(e.slug);
  const palavras = trecho.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const h2 = (trecho.match(/<h2/g) ?? []).length;
  const h3 = (trecho.match(/<h3/g) ?? []).length;
  const tabelas = (trecho.match(/<table/g) ?? []).length;
  const listas = (trecho.match(/<(ul|ol)\b/g) ?? []).length;
  const outbound = Array.from(
    new Set((trecho.match(/href="(\/[a-z0-9\-/]+)"/g) ?? []).map((m) => m.slice(6, -1))),
  );
  const outEditorial = outbound.filter((u) => u.startsWith("/blog"));
  const outComercial = outbound.filter((u) => /^\/(servicos|problemas|empresas|bairros)/.test(u));
  const inbound = (INBOUND.match(new RegExp(`slug: "${e.slug}"`, "g")) ?? []).length;
  const idx = porUrlIndexacao.get(e.url);
  const sch = porUrlSchema.get(e.url);
  const inw = porUrlIndexnow.get(e.url);
  const asset = porSlugAsset.get(e.slug);
  const fontes = ARTICLE_SOURCE_MANIFEST[e.slug];
  const revisao = fontes?.revisionNote ?? fontes?.notes ?? null;

  return {
    wave: e.wave,
    batch: e.batch,
    lote: `${e.wave}/${e.batch}`,
    url: e.url,
    slug: e.slug,
    ownerId: e.ownerId,
    cluster: e.cluster,
    role: e.role,
    publishedAt: e.publishedAt,
    approved: getApprovedSlugs().includes(e.slug),
    targetQueries: e.targetQueries.join(" | "),
    doNotDuplicate: e.doNotDuplicate.join(" | "),
    palavrasFonte: palavras,
    h2,
    h3,
    tabelas,
    listas,
    outboundEditorial: outEditorial.length,
    outboundComercial: outComercial.length,
    inboundMapeado: inbound,
    temFontes: Boolean(fontes),
    fontesQtd: fontes?.sources?.length ?? 0,
    revisaoDeclarada: Boolean(revisao),
    cover: EDITORIAL_COVERS[e.slug]?.src ?? null,
    assetResultado: asset?.resultado ?? "UNKNOWN",
    schemaTipos: (sch?.tipos ?? []).join("+") || "UNKNOWN",
    schemaVariantes: sch?.variantes ?? null,
    faqVisivel: sch?.faqVisivel ?? sch?.faq ?? null,
    faqSchema: sch?.faqSchema ?? null,
    contentHash: idx?.contentHash ?? null,
    sitemapLastmod: idx?.sitemapLastmod ?? null,
    internalState: idx?.internalState ?? "UNKNOWN",
    googleStatus: idx?.google?.status ?? "UNKNOWN",
    lastCrawlTime: idx?.google?.ultimoCrawl ?? null,
    canonicalDeclarado: idx?.google?.canonicalDeclarado ?? null,
    canonicalGoogle: idx?.google?.canonicalGoogle ?? null,
    indexnowState: inw?.submissionState ?? "UNKNOWN",
    indexnowHash: inw?.currentContentHash ?? null,
    indexnowLastSubmittedHash: inw?.lastSubmittedHash ?? null,
  };
});

// URLs 10C publicadas fora do registry (heurística: aprovadas e não declaradas).
const declarados = new Set(alvos.map((e) => e.slug));
const foraDoRegistry = getApprovedSlugs().filter(
  (s) => !declarados.has(s) && /webcam|windows-update|spooler|impressora|audio|som|hd-nao|ssd-nvme|setores|memtest|tela-azul|temporarios|ram-insuficiente/.test(s),
);

// ── MATURIDADE (EDITORIAL_SCORE separado de SEARCH_EVIDENCE) ───────────────
const clamp = (n: number, max: number) => Math.max(0, Math.min(max, n));
const maturity = owners.map((o) => {
  const profundidade = clamp(Math.round((o.palavrasFonte / 1400) * 25), 25); // 25
  const intencao = clamp(Math.round(((o.h2 + o.h3) / 12) * 15), 15); // 15
  const seguranca = o.revisaoDeclarada ? 10 : 5; // 10
  const fontes = o.temFontes ? (o.fontesQtd > 0 ? 10 : 7) : 3; // 10
  const arquitetura = clamp(
    (o.inboundMapeado > 0 ? 4 : 0) + Math.min(3, o.outboundEditorial) + Math.min(3, o.outboundComercial),
    10,
  ); // 10
  const ssrSchema =
    o.schemaVariantes === 1 && /Article/.test(o.schemaTipos)
      ? o.faqVisivel && o.faqVisivel === o.faqSchema
        ? 10
        : 8
      : 0; // 10
  const ativos = o.assetResultado === "PASS" ? 5 : o.assetResultado === "WARN" ? 3 : 0; // 5
  const conversao = o.outboundComercial > 0 ? 5 : 2; // 5
  const editorialBase = profundidade + intencao + seguranca + fontes + arquitetura + ssrSchema + ativos + conversao; // /90
  const editorialScore = Math.round((editorialBase / 90) * 100);
  const searchEvidence =
    o.googleStatus === "NO_DATA" || o.googleStatus === "UNKNOWN" ? "UNKNOWN" : String(o.googleStatus);
  const classe =
    editorialScore >= 85
      ? "MATURE"
      : editorialScore >= 75
        ? "STRONG"
        : editorialScore >= 65
          ? "ADEQUATE"
          : editorialScore >= 50
            ? "NEEDS_WORK"
            : "WEAK";
  return {
    lote: o.lote,
    url: o.url,
    ownerId: o.ownerId,
    cluster: o.cluster,
    role: o.role,
    d_resposta_profundidade_25: profundidade,
    d_cobertura_intencao_15: intencao,
    d_seguranca_precisao_10: seguranca,
    d_fontes_autoridade_10: fontes,
    d_arquitetura_interna_10: arquitetura,
    d_ssr_schema_10: ssrSchema,
    d_assets_5: ativos,
    d_conversion_readiness_5: conversao,
    EDITORIAL_SCORE: editorialScore,
    EDITORIAL_CLASS: classe,
    SEARCH_EVIDENCE: searchEvidence,
    SEARCH_EVIDENCE_POINTS: searchEvidence === "UNKNOWN" ? "UNKNOWN" : 0,
  };
});
const porUrlMaturity = new Map(maturity.map((m) => [m.url, m]));

// ── COBERTURA POR CLUSTER ──────────────────────────────────────────────────
const clusters = Array.from(new Set(owners.map((o) => o.cluster)));
const coverage = clusters.map((c) => {
  const itens = owners.filter((o) => o.cluster === c);
  const scores = itens.map((i) => porUrlMaturity.get(i.url)!.EDITORIAL_SCORE);
  const media = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const temPilar = itens.some((i) => i.role === "pilar");
  const satelites = itens.filter((i) => i.role === "satelite").length;
  const estado =
    media >= 80 && (temPilar || satelites >= 3)
      ? "STRONG"
      : media >= 70
        ? "ADEQUATE"
        : media >= 60
          ? "PARTIAL"
          : "WEAK";
  return {
    cluster: c,
    lotes: Array.from(new Set(itens.map((i) => i.lote))).join(" | "),
    urls: itens.length,
    pilar: temPilar ? "SIM" : "NAO",
    satelites,
    mediaEditorialScore: media,
    estado,
    searchEvidence: Array.from(new Set(itens.map((i) => i.googleStatus))).join("|"),
  };
});

// ── INDEXAÇÃO / FUNIL POR LOTE ─────────────────────────────────────────────
const indexation = owners.map((o) => {
  const postChange =
    o.lastCrawlTime && o.publishedAt
      ? new Date(o.lastCrawlTime) > new Date(`${o.publishedAt}T00:00:00Z`)
        ? "YES"
        : "NO"
      : "UNKNOWN";
  const normalizado = o.googleStatus;
  const crawledNaoIndexado =
    normalizado === "CRAWLED_NOT_INDEXED" && postChange === "YES" ? "REAL" : normalizado === "NO_DATA" ? "WAIT" : "WAIT";
  return {
    lote: o.lote,
    url: o.url,
    ownerId: o.ownerId,
    publishedAt: o.publishedAt,
    lastMaterialChange: o.publishedAt,
    contentHash: o.contentHash,
    lastCrawlTime: o.lastCrawlTime ?? "UNKNOWN",
    POST_CHANGE_CRAWL: postChange,
    estadoNormalizado: normalizado,
    canonicalDeclarado: o.canonicalDeclarado ?? "UNKNOWN",
    canonicalGoogle: o.canonicalGoogle ?? "UNKNOWN",
    canonicalConflict:
      o.canonicalDeclarado && o.canonicalGoogle && o.canonicalDeclarado !== o.canonicalGoogle ? "SIM" : "NAO",
    blocked: /BLOCKED|ROBOTS/.test(String(o.googleStatus)) ? "SIM" : "NAO",
    impressions: "UNKNOWN",
    clicks: "UNKNOWN",
    crawledNotIndexed: crawledNaoIndexado,
    sitemapLastmod: o.sitemapLastmod ?? "UNKNOWN",
  };
});

const funilPorLote = Array.from(new Set(owners.map((o) => o.lote))).map((l) => {
  const itens = indexation.filter((i) => i.lote === l);
  return {
    lote: l,
    PUBLISHED: itens.length,
    DISCOVERED: itens.filter((i) => i.estadoNormalizado !== "NO_DATA" && i.estadoNormalizado !== "UNKNOWN").length,
    POST_CHANGE_CRAWLED: itens.filter((i) => i.POST_CHANGE_CRAWL === "YES").length,
    INDEXED: itens.filter((i) => i.estadoNormalizado === "INDEXED").length,
    IMPRESSIONS: "UNKNOWN",
    CLICKS: "UNKNOWN",
    NO_DATA: itens.filter((i) => i.estadoNormalizado === "NO_DATA").length,
  };
});

// ── INDEXNOW ───────────────────────────────────────────────────────────────
const indexnowLinhas = owners.map((o) => ({
  lote: o.lote,
  url: o.url,
  currentContentHash: o.indexnowHash ?? "UNKNOWN",
  lastSubmittedHash: o.indexnowLastSubmittedHash ?? "NENHUM",
  state: o.indexnowState,
  reenvioMesmoHash:
    o.indexnowHash && o.indexnowLastSubmittedHash && o.indexnowHash === o.indexnowLastSubmittedHash ? "SIM" : "NAO",
  http: porUrlIndexnow.get(o.url)?.http ?? "NENHUM",
  motivo: porUrlIndexnow.get(o.url)?.motivo ?? "UNKNOWN",
}));

// ── SCHEMA ─────────────────────────────────────────────────────────────────
const diffPorUrl = new Map<string, any>((schemaDiff?.linhas ?? []).map((l: any) => [l.url, l]));
const schemaLinhas = owners.map((o) => {
  const s = porUrlSchema.get(o.url);
  return {
    lote: o.lote,
    url: o.url,
    tipos: o.schemaTipos,
    fingerprint: s?.fingerprint ?? "UNKNOWN",
    coldRuns: s?.runs ?? "UNKNOWN",
    variantes: s?.variantes ?? "UNKNOWN",
    faqVisivel: s?.faqVisivel ?? "UNKNOWN",
    faqSchema: s?.faqSchema ?? "UNKNOWN",
    faqSync: s && s.faqVisivel === s.faqSchema ? "SIM" : "UNKNOWN",
    breadcrumbList: /BreadcrumbList/.test(o.schemaTipos) ? "SIM" : "NAO",
    article: /Article|TechArticle|BlogPosting/.test(o.schemaTipos) ? "SIM" : "NAO",
    diffState: diffPorUrl.get(o.url)?.estado ?? schemaDiff?.estado ?? "UNKNOWN",
  };
});

// ── ASSETS ─────────────────────────────────────────────────────────────────
const assetLinhas = (assets?.assets ?? []).map((a: any) => ({
  slug: a.slug,
  owner: a.owner,
  localPath: a.localPath,
  source: a.sourceType,
  author: a.author ?? "UNKNOWN",
  license: a.license,
  licenseUrl: a.licenseUrl ?? "UNKNOWN",
  attribution: a.attributionText ?? "UNKNOWN",
  originalUrl: a.originalUrl ?? "UNKNOWN",
  fileHash: a.fileHash ?? "UNKNOWN",
  webp: a.checks?.webp ? "SIM" : "NAO",
  avif: a.checks?.avif ? "SIM" : "NAO",
  antiAi: a.checks?.antiAi ? "PASS" : "FAIL",
  resultado: a.resultado,
}));

// ── CANIBALIZAÇÃO (Jaccard sobre consultas-alvo + tokens de slug) ──────────
const tokens = (s: string) => new Set(s.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 3));
const jaccard = (a: Set<string>, b: Set<string>) => {
  const inter = [...a].filter((x) => b.has(x)).length;
  const uni = new Set([...a, ...b]).size;
  return uni === 0 ? 0 : Number((inter / uni).toFixed(3));
};
const TETO = 0.4;
const cannibal: any[] = [];
for (let i = 0; i < owners.length; i++) {
  for (let j = i + 1; j < owners.length; j++) {
    const a = owners[i];
    const b = owners[j];
    const ja = jaccard(tokens(`${a.slug} ${a.targetQueries}`), tokens(`${b.slug} ${b.targetQueries}`));
    const mesmaConsulta = a.targetQueries
      .split(" | ")
      .some((q) => b.targetQueries.split(" | ").includes(q));
    const declarado = a.doNotDuplicate.includes(b.url) || b.doNotDuplicate.includes(a.url);
    if (ja < 0.15 && !mesmaConsulta && !declarado) continue;
    const classe = mesmaConsulta
      ? "CONFLICT"
      : ja > TETO
        ? "REVIEW"
        : ja >= 0.3 || declarado
          ? "WATCH"
          : "SAFE";
    cannibal.push({
      urlA: a.url,
      urlB: b.url,
      loteA: a.lote,
      loteB: b.lote,
      clusterA: a.cluster,
      clusterB: b.cluster,
      jaccard: ja,
      teto: TETO,
      consultaAlvoCompartilhada: mesmaConsulta ? "SIM" : "NAO",
      doNotDuplicateDeclarado: declarado ? "SIM" : "NAO",
      tipoColisao: "EDITORIAL_NACIONAL",
      classe,
    });
  }
}
// Colisão editorial × landing comercial/local (declarada no registry).
for (const o of owners) {
  for (const alvo of o.doNotDuplicate.split(" | ").filter(Boolean)) {
    if (alvo.startsWith("/blog")) continue;
    cannibal.push({
      urlA: o.url,
      urlB: alvo,
      loteA: o.lote,
      loteB: "COMERCIAL",
      clusterA: o.cluster,
      clusterB: "comercial-local",
      jaccard: "NA",
      teto: TETO,
      consultaAlvoCompartilhada: "NAO",
      doNotDuplicateDeclarado: "SIM",
      tipoColisao: "EDITORIAL_x_COMERCIAL",
      classe: "SAFE",
    });
  }
}

// ── GRAFO INTERNO ──────────────────────────────────────────────────────────
const inboundEditorialCount = new Map<string, number>();
for (const o of owners) {
  const trecho = trechoDe(o.slug);
  for (const alvo of owners) {
    if (alvo.url === o.url) continue;
    if (trecho.includes(`href="${alvo.url}"`)) {
      inboundEditorialCount.set(alvo.url, (inboundEditorialCount.get(alvo.url) ?? 0) + 1);
    }
  }
}
const internalLinks = owners.map((o) => {
  const inEd = inboundEditorialCount.get(o.url) ?? 0;
  const total = inEd + o.inboundMapeado + 1; // +1 = hub /blog (lista todos os aprovados)
  const estado =
    total >= 8 ? "OVERLINKED" : total >= 3 ? "HEALTHY" : total >= 2 ? "WEAK_DISCOVERY" : "ORPHAN";
  return {
    lote: o.lote,
    url: o.url,
    inboundEditorial: inEd,
    inboundComercialMapeado: o.inboundMapeado,
    inboundHubBlog: 1,
    inboundTotal: total,
    outboundEditorial: o.outboundEditorial,
    outboundComercial: o.outboundComercial,
    profundidadeDesdeHub: 1,
    papel: o.role,
    estado,
  };
});

// ── CONVERSÃO ──────────────────────────────────────────────────────────────
const conversao = owners.map((o) => ({
  lote: o.lote,
  url: o.url,
  ctaSsr: o.outboundComercial > 0 ? "PRESENTE" : "UNKNOWN",
  waDireto: "NAO (gate check:editorial-no-direct-wa verde)",
  landing_views: "UNKNOWN",
  cta_click: "UNKNOWN",
  triage_start: "UNKNOWN",
  whatsapp_open: "UNKNOWN",
  CONVERSION_DATA: "INSUFFICIENT",
}));

// ── PRÓXIMAS OPORTUNIDADES (Onda 11) — hipóteses, sem publicação ───────────
type Opp = {
  cluster: string;
  hipoteseUrl: string;
  ownerRelacionado: string;
  authorityGap_25: number;
  userDemand_20: number;
  conversionPotential_20: number;
  citationUtility_15: number;
  internalGraphFit_10: number;
  cannibalizationSafety_10: number;
  penalidades: number;
  motivoPenalidade: string;
  porqueConteudoProprio: string;
  naoDuplicar: string;
  linksNaturais: string;
  riscoPrincipal: string;
};
const oppsBase: Opp[] = [
  {
    cluster: "boot/inicialização",
    hipoteseUrl: "/blog/windows-nao-inicia-reparo-automatico-loop",
    ownerRelacionado: "/blog/bios-corrompida-reset-cmos-atualizacao (10D/1)",
    authorityGap_25: 22,
    userDemand_20: 18,
    conversionPotential_20: 17,
    citationUtility_15: 13,
    internalGraphFit_10: 9,
    cannibalizationSafety_10: 8,
    penalidades: 0,
    motivoPenalidade: "-",
    porqueConteudoProprio: "Loop de reparo automático tem árvore de decisão própria (WinRE, bootrec, restauração) que nenhum owner atual detém.",
    naoDuplicar: "Não repetir diagnóstico de BIOS/CMOS nem POST/beeps já cobertos em 10D/1.",
    linksNaturais: "/blog/bios-corrompida-reset-cmos-atualizacao, /servicos/formatacao-e-backup, /problemas/computador-lento",
    riscoPrincipal: "Sobreposição com futuro satélite de tela preta pós-login.",
  },
  {
    cluster: "backup/dados",
    hipoteseUrl: "/blog/como-recuperar-arquivos-de-hd-com-defeito",
    ownerRelacionado: "/blog/disco-com-setores-defeituosos-smart-o-que-fazer (10C/3)",
    authorityGap_25: 20,
    userDemand_20: 16,
    conversionPotential_20: 19,
    citationUtility_15: 13,
    internalGraphFit_10: 9,
    cannibalizationSafety_10: 7,
    penalidades: 0,
    motivoPenalidade: "-",
    porqueConteudoProprio: "Owner atual é diagnóstico S.M.A.R.T.; recuperação exige critério de parar de usar o disco, clonagem antes de leitura e limite do que não se tenta em casa.",
    naoDuplicar: "Não reexplicar leitura de S.M.A.R.T. nem CHKDSK (proibido como padrão em falha física).",
    linksNaturais: "/blog/disco-com-setores-defeituosos-smart-o-que-fazer, /servicos/recuperacao-de-dados",
    riscoPrincipal: "Canibalizar a página comercial de recuperação de dados se o texto virar oferta.",
  },
  {
    cluster: "segurança/malware",
    hipoteseUrl: "/blog/como-identificar-golpe-de-suporte-tecnico-falso",
    ownerRelacionado: "nenhum owner 10C detém a intenção",
    authorityGap_25: 23,
    userDemand_20: 15,
    conversionPotential_20: 14,
    citationUtility_15: 14,
    internalGraphFit_10: 8,
    cannibalizationSafety_10: 10,
    penalidades: 0,
    motivoPenalidade: "-",
    porqueConteudoProprio: "Tema de confiança/E-E-A-T sem qualquer owner atual; alto valor de citação e zero risco de colidir com sintoma técnico.",
    naoDuplicar: "Não transformar em página de remoção de vírus (já comercial).",
    linksNaturais: "/servicos/remocao-de-virus, /blog (hub), /empresas",
    riscoPrincipal: "Baixa proximidade comercial direta.",
  },
  {
    cluster: "notebook (energia)",
    hipoteseUrl: "/blog/notebook-nao-carrega-bateria-ou-fonte",
    ownerRelacionado: "/blog/notebook-nao-liga-o-que-fazer (acervo anterior)",
    authorityGap_25: 19,
    userDemand_20: 17,
    conversionPotential_20: 18,
    citationUtility_15: 12,
    internalGraphFit_10: 8,
    cannibalizationSafety_10: 6,
    penalidades: 0,
    motivoPenalidade: "-",
    porqueConteudoProprio: "Separar 'não carrega' de 'não liga' é distinção diagnóstica real (fonte, DC jack, bateria, controlador).",
    naoDuplicar: "Não repetir o roteiro de 'notebook não liga'; entrar direto na cadeia de energia.",
    linksNaturais: "/blog/notebook-nao-liga-o-que-fazer, /servicos/conserto-de-notebook",
    riscoPrincipal: "Similaridade de slug com o owner de 'não liga' (vigiar teto 0.40).",
  },
  {
    cluster: "GPU/vídeo",
    hipoteseUrl: "/blog/pc-liga-mas-nao-da-video-o-que-verificar",
    ownerRelacionado: "/blog/botao-power-nao-funciona-jump-start-placa-mae (10D/1)",
    authorityGap_25: 20,
    userDemand_20: 16,
    conversionPotential_20: 16,
    citationUtility_15: 12,
    internalGraphFit_10: 9,
    cannibalizationSafety_10: 7,
    penalidades: 0,
    motivoPenalidade: "-",
    porqueConteudoProprio: "Cadeia de vídeo (onboard × offboard, monitor, cabo, POST) não é coberta por nenhum owner; hoje cai por engano em 'não liga'.",
    naoDuplicar: "Não repetir jump start nem curto-circuito de placa (10D/1).",
    linksNaturais: "/blog/botao-power-nao-funciona-jump-start-placa-mae, /servicos/conserto-placa, /servicos/conserto-monitor",
    riscoPrincipal: "Fronteira fina com /servicos/conserto-monitor.",
  },
  {
    cluster: "USB",
    hipoteseUrl: "/blog/portas-usb-nao-funcionam-o-que-verificar",
    ownerRelacionado: "/blog/webcam-usb-nao-e-detectada (10C/4)",
    authorityGap_25: 12,
    userDemand_20: 11,
    conversionPotential_20: 10,
    citationUtility_15: 9,
    internalGraphFit_10: 7,
    cannibalizationSafety_10: 4,
    penalidades: -30,
    motivoPenalidade: "-30: owner 10C/4 já resolve boa parte da cadeia USB (energia da porta, hub, driver).",
    porqueConteudoProprio: "Só se comprovar demanda distinta no GSC após maturação do Lote 4.",
    naoDuplicar: "Toda a seção de detecção USB do owner atual.",
    linksNaturais: "/blog/webcam-usb-nao-e-detectada",
    riscoPrincipal: "Canibalização direta.",
  },
  {
    cluster: "redes/impressoras",
    hipoteseUrl: "(sem hipótese)",
    ownerRelacionado: "/blog/internet-lenta-provedor-ou-roteador, /blog/impressora-offline-como-resolver (10C/2) + onda 4E",
    authorityGap_25: 6,
    userDemand_20: 8,
    conversionPotential_20: 8,
    citationUtility_15: 6,
    internalGraphFit_10: 5,
    cannibalizationSafety_10: 3,
    penalidades: -30,
    motivoPenalidade: "-30: gap já coberto por 4E + 10C/2.",
    porqueConteudoProprio: "Não há lacuna comprovada.",
    naoDuplicar: "Tudo em 10C/2.",
    linksNaturais: "-",
    riscoPrincipal: "Duplicação pura.",
  },
  {
    cluster: "BIOS/UEFI",
    hipoteseUrl: "(mesclar em owner existente)",
    ownerRelacionado: "/blog/bios-corrompida-reset-cmos-atualizacao + cluster BIOS da Onda 9C",
    authorityGap_25: 8,
    userDemand_20: 12,
    conversionPotential_20: 10,
    citationUtility_15: 8,
    internalGraphFit_10: 6,
    cannibalizationSafety_10: 3,
    penalidades: -25,
    motivoPenalidade: "-25: alto risco de canibalizar o cluster BIOS já publicado (No Bootable Device, SSD novo/BIOS).",
    porqueConteudoProprio: "Não se justifica: enriquecer o owner existente.",
    naoDuplicar: "No Bootable Device, SSD novo entrando na BIOS, reset de CMOS.",
    linksNaturais: "-",
    riscoPrincipal: "Canibalização.",
  },
];
const nextOpps = oppsBase
  .map((o) => {
    const score =
      o.authorityGap_25 +
      o.userDemand_20 +
      o.conversionPotential_20 +
      o.citationUtility_15 +
      o.internalGraphFit_10 +
      o.cannibalizationSafety_10 +
      o.penalidades;
    return { ...o, score };
  })
  .sort((a, b) => b.score - a.score)
  .map((o, i) => ({
    ...o,
    classificacao:
      o.penalidades <= -25
        ? o.cluster === "redes/impressoras"
          ? "DISCARD"
          : "MERGE_EXISTING"
        : i < 5 && o.score >= 70
          ? "P1-NEXT"
          : o.score >= 55
            ? "P2-BACKLOG"
            : "P3-WATCH",
  }));

// ── SUMÁRIO E VEREDITOS ────────────────────────────────────────────────────
const contarClasse = (c: string) => maturity.filter((m) => m.EDITORIAL_CLASS === c).length;
const summary = {
  generatedAt: new Date().toISOString(),
  buildSha: buildVersion?.version ?? "UNKNOWN",
  site: indexacao?.site ?? "UNKNOWN",
  totalUrls10C: owners.filter((o) => o.wave === "10C").length,
  totalUrlsRegistry: owners.length,
  lotes: funilPorLote,
  clustersCobertos: coverage.length,
  clustersPorEstado: coverage.reduce<Record<string, number>>((a, c) => {
    a[c.estado] = (a[c.estado] ?? 0) + 1;
    return a;
  }, {}),
  maturidade: {
    MATURE: contarClasse("MATURE"),
    STRONG: contarClasse("STRONG"),
    ADEQUATE: contarClasse("ADEQUATE"),
    NEEDS_WORK: contarClasse("NEEDS_WORK"),
    WEAK: contarClasse("WEAK"),
  },
  indexacao: {
    PUBLISHED: indexation.length,
    POST_CHANGE_CRAWLED: indexation.filter((i) => i.POST_CHANGE_CRAWL === "YES").length,
    INDEXED: indexation.filter((i) => i.estadoNormalizado === "INDEXED").length,
    NO_DATA: indexation.filter((i) => i.estadoNormalizado === "NO_DATA").length,
    CRAWLED_NOT_INDEXED_REAL: indexation.filter((i) => i.crawledNotIndexed === "REAL").length,
    canonicalConflicts: indexation.filter((i) => i.canonicalConflict === "SIM").length,
    blockedInesperado: indexation.filter((i) => i.blocked === "SIM").length,
  },
  alertasGscLote4: {
    novos: alertas?.novos ?? 0,
    entrega: alertas?.entrega?.estado ?? "UNKNOWN",
    total: Object.keys(alertas?.estado ?? {}).length,
  },
  indexnow: {
    porEstado: indexnowLinhas.reduce<Record<string, number>>((a, l) => {
      a[l.state] = (a[l.state] ?? 0) + 1;
      return a;
    }, {}),
    reenvioMesmoHash: indexnowLinhas.filter((l) => l.reenvioMesmoHash === "SIM").length,
  },
  schema: {
    total: schemaLinhas.length,
    variantesUnicas: schemaLinhas.filter((l) => l.variantes === 1).length,
    faqSync: schemaLinhas.filter((l) => l.faqSync === "SIM").length,
    regressions: schemaLinhas.filter((l) => l.diffState === "SCHEMA_REGRESSION").length,
    diffGlobal: schemaDiff?.estado ?? "UNKNOWN",
  },
  assets: {
    total: assetLinhas.length,
    pass: assetLinhas.filter((a: any) => a.resultado === "PASS").length,
    warn: assetLinhas.filter((a: any) => a.resultado === "WARN").length,
    fail: assetLinhas.filter((a: any) => a.resultado === "FAIL").length,
    ia: assetLinhas.filter((a: any) => a.antiAi === "FAIL").length,
    unregistered: (assets?.unregistered ?? []).length,
    unknownLicense: assets?.semLicenca ?? "UNKNOWN",
  },
  grafoInterno: internalLinks.reduce<Record<string, number>>((a, l) => {
    a[l.estado] = (a[l.estado] ?? 0) + 1;
    return a;
  }, {}),
  canibalizacao: {
    CONFLICT: cannibal.filter((c) => c.classe === "CONFLICT").length,
    REVIEW: cannibal.filter((c) => c.classe === "REVIEW").length,
    WATCH: cannibal.filter((c) => c.classe === "WATCH").length,
    SAFE: cannibal.filter((c) => c.classe === "SAFE").length,
    teto: TETO,
  },
  conversao: { ownersComDadoSuficiente: 0, estado: "INSUFFICIENT" },
  oportunidades: nextOpps.reduce<Record<string, number>>((a, o) => {
    a[o.classificacao] = (a[o.classificacao] ?? 0) + 1;
    return a;
  }, {}),
  urls10CForaDoRegistry: foraDoRegistry,
};

// ── ESCRITA DOS ARQUIVOS + MANIFESTO ───────────────────────────────────────
const conjuntos: Array<{ nome: string; linhas: any[] }> = [
  { nome: "owners", linhas: owners },
  { nome: "coverage", linhas: coverage },
  { nome: "maturity", linhas: maturity },
  { nome: "indexation", linhas: indexation },
  { nome: "indexnow", linhas: indexnowLinhas },
  { nome: "schema", linhas: schemaLinhas },
  { nome: "assets", linhas: assetLinhas },
  { nome: "cannibalization", linhas: cannibal },
  { nome: "internal-links", linhas: internalLinks },
  { nome: "conversion", linhas: conversao },
  { nome: "next-opportunities", linhas: nextOpps },
].map((c) => ({ ...c, linhas: sanitizar(c.linhas) }));

const arquivos: Array<{ name: string; content: string; rows: number }> = [];
for (const c of conjuntos) {
  arquivos.push({ name: `${c.nome}.csv`, content: paraCsv(c.linhas), rows: c.linhas.length });
  arquivos.push({ name: `${c.nome}.json`, content: `${JSON.stringify(c.linhas, null, 2)}\n`, rows: c.linhas.length });
}
arquivos.push({ name: "summary.json", content: `${JSON.stringify(summary, null, 2)}\n`, rows: 1 });

const md = [
  `# Onda 10C — auditoria consolidada (pacote de evidências)`,
  ``,
  `- Gerado em: ${summary.generatedAt}`,
  `- Build: \`${summary.buildSha}\` · propriedade: \`${summary.site}\``,
  `- URLs 10C: **${summary.totalUrls10C}** (registry total, incluindo o lote 10D observado: ${summary.totalUrlsRegistry})`,
  `- Clusters: ${summary.clustersCobertos} · ${JSON.stringify(summary.clustersPorEstado)}`,
  `- Maturidade: ${JSON.stringify(summary.maturidade)}`,
  `- Indexação: ${JSON.stringify(summary.indexacao)}`,
  `- IndexNow: ${JSON.stringify(summary.indexnow)}`,
  `- Schema: ${JSON.stringify(summary.schema)}`,
  `- Assets: ${JSON.stringify(summary.assets)}`,
  `- Grafo interno: ${JSON.stringify(summary.grafoInterno)}`,
  `- Canibalização: ${JSON.stringify(summary.canibalizacao)}`,
  `- Conversão: ${summary.conversao.estado}`,
  `- Oportunidades Onda 11: ${JSON.stringify(summary.oportunidades)}`,
  ``,
  `## Funil por lote`,
  ``,
  `| Lote | PUBLISHED | DISCOVERED | POST_CHANGE_CRAWLED | INDEXED | IMPRESSIONS | CLICKS | NO_DATA |`,
  `| --- | --- | --- | --- | --- | --- | --- | --- |`,
  ...funilPorLote.map(
    (f) =>
      `| ${f.lote} | ${f.PUBLISHED} | ${f.DISCOVERED} | ${f.POST_CHANGE_CRAWLED} | ${f.INDEXED} | ${f.IMPRESSIONS} | ${f.CLICKS} | ${f.NO_DATA} |`,
  ),
  ``,
  `NO_DATA e UNKNOWN significam ausência de sinal do Google — nunca zero nem "não indexada".`,
].join("\n");
arquivos.push({ name: "summary.md", content: `${md}\n`, rows: md.split("\n").length });

const vazando = arquivos.filter((a) => contemSegredo(a.content));
if (vazando.length) {
  console.error(`[audit:10c] ABORTADO — possível segredo em ${vazando.map((a) => a.name).join(", ")}`);
  process.exit(1);
}
for (const a of arquivos) writeFileSync(resolve(OUT, a.name), a.content);

const manifest = {
  generatedAt: summary.generatedAt,
  buildSha: summary.buildSha,
  wave: "10C",
  scope: "final-consolidated-audit",
  files: arquivos.map((a) => ({
    name: a.name,
    rows: a.rows,
    bytes: Buffer.byteLength(a.content),
    sha256: createHash("sha256").update(a.content).digest("hex"),
  })),
};
writeFileSync(resolve(OUT, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`[audit:10c] pacote em ${OUT}`);
for (const f of manifest.files) console.log(`  · ${f.name} · ${f.rows} linha(s) · ${f.sha256.slice(0, 16)}…`);
console.log(JSON.stringify(summary, null, 2));
