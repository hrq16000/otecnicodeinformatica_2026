/**
 * FINGERPRINT SEMÂNTICO DE SCHEMA (Onda 10C · Infra 2 — Parte D).
 *
 * Extrai o JSON-LD do HTML SERVIDO (SSR real, não pós-hidratação), normaliza
 * de forma determinística e devolve uma impressão digital estável.
 *
 * Normalização:
 *   • parse de cada bloco <script type="application/ld+json">;
 *   • @graph expandido em nós;
 *   • chaves de objeto ordenadas recursivamente;
 *   • arrays de nós ordenados por (@type, @id, name) — ordem de emissão de
 *     blocos não é semântica; arrays internos com ordem semântica
 *     (itemListElement, mainEntity, step) são PRESERVADOS na ordem original;
 *   • removidos apenas campos comprovadamente voláteis por build
 *     (nenhum hoje — a lista fica explícita e vazia por padrão).
 *
 * Nada é removido "para o teste passar": a lista de campos voláteis é
 * declarada aqui e revisada manualmente.
 */
import { createHash } from "node:crypto";

/** Campos legitimamente voláteis entre builds (não semânticos). */
export const CAMPOS_VOLATEIS = new Set([]);

/** Arrays cuja ordem É semântica e por isso nunca são reordenados. */
const ORDEM_SEMANTICA = new Set(["itemListElement", "mainEntity", "step", "itemListOrder"]);

export function extrairBlocosJsonLd(html) {
  return [
    ...String(html).matchAll(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].map((m) => m[1].trim());
}

export function parseNos(html) {
  const nos = [];
  for (const bruto of extrairBlocosJsonLd(html)) {
    let json;
    try {
      json = JSON.parse(bruto);
    } catch {
      nos.push({ "@type": "PARSE_ERROR" });
      continue;
    }
    const lista = Array.isArray(json) ? json : (json["@graph"] ?? [json]);
    for (const no of lista) if (no && typeof no === "object") nos.push(no);
  }
  return nos;
}

const ordenar = (valor, chavePai) => {
  if (Array.isArray(valor)) {
    const itens = valor.map((v) => ordenar(v, chavePai));
    if (ORDEM_SEMANTICA.has(chavePai)) return itens;
    return itens
      .map((v) => [JSON.stringify(v), v])
      .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
      .map(([, v]) => v);
  }
  if (valor && typeof valor === "object") {
    const saida = {};
    for (const k of Object.keys(valor).sort()) {
      if (CAMPOS_VOLATEIS.has(k)) continue;
      saida[k] = ordenar(valor[k], k);
    }
    return saida;
  }
  return valor;
};

/** Conjunto de nós normalizado e determinístico. */
export function normalizarGrafo(html) {
  const nos = parseNos(html).map((n) => ordenar(n, null));
  return nos
    .map((n) => [JSON.stringify(n), n])
    .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
    .map(([, n]) => n);
}

export function tiposDoGrafo(grafo) {
  const tipos = [];
  for (const no of grafo) {
    const t = no["@type"];
    for (const x of Array.isArray(t) ? t : [t]) if (x) tipos.push(x);
  }
  return [...new Set(tipos)].sort();
}

export function schemaFingerprint(html) {
  const grafo = normalizarGrafo(html);
  return {
    fingerprint: createHash("sha256").update(JSON.stringify(grafo)).digest("hex").slice(0, 16),
    blocos: extrairBlocosJsonLd(html).length,
    nos: grafo.length,
    tipos: tiposDoGrafo(grafo),
    grafo,
  };
}

const semTags = (s) =>
  s
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

/** Perguntas de FAQ VISÍVEIS no HTML (bloco <details><summary>). */
export function faqVisivel(html) {
  // Escopo: apenas a seção marcada com data-faq-visivel (o índice do artigo
  // também usa <details>/<summary> e não é FAQ).
  const secao = String(html).match(/<section[^>]*data-faq-visivel[^>]*>([\s\S]*?)<\/section>/i)?.[1];
  const alvo = secao ?? "";
  const perguntas = [];
  for (const m of alvo.matchAll(/<summary\b[^>]*>([\s\S]*?)<\/summary>/gi)) {
    const texto = semTags(m[1]).replace(/\s*\+$/, "").trim();
    if (texto) perguntas.push(texto);
  }
  return perguntas;
}


/** Perguntas declaradas no FAQPage do SSR. */
export function faqSchema(grafo) {
  const no = grafo.find((n) => {
    const t = n["@type"];
    return (Array.isArray(t) ? t : [t]).includes("FAQPage");
  });
  if (!no) return null;
  const entidades = Array.isArray(no.mainEntity) ? no.mainEntity : no.mainEntity ? [no.mainEntity] : [];
  return entidades.map((q) => ({
    q: String(q?.name ?? "").trim(),
    a: String(q?.acceptedAnswer?.text ?? "").trim(),
  }));
}

/** Itens do breadcrumb VISÍVEL (nav aria-label="Breadcrumb"). */
export function breadcrumbVisivel(html) {
  const nav = String(html).match(/<nav[^>]*aria-label=["']Breadcrumb["'][\s\S]*?<\/nav>/i)?.[0];
  if (!nav) return [];
  return [...nav.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
    .map((m) => semTags(m[1]))
    .filter(Boolean);
}

/** Itens do BreadcrumbList no SSR. */
export function breadcrumbSchema(grafo) {
  const no = grafo.find((n) => {
    const t = n["@type"];
    return (Array.isArray(t) ? t : [t]).includes("BreadcrumbList");
  });
  if (!no) return null;
  const itens = Array.isArray(no.itemListElement) ? no.itemListElement : [];
  return itens.map((i) => ({ name: String(i?.name ?? "").trim(), item: i?.item ?? null }));
}

/** Nó de artigo (Article/TechArticle/BlogPosting), quando existir. */
export function artigoDoGrafo(grafo) {
  return (
    grafo.find((n) => {
      const t = n["@type"];
      const lista = Array.isArray(t) ? t : [t];
      return lista.some((x) => ["Article", "TechArticle", "BlogPosting", "HowTo"].includes(x));
    }) ?? null
  );
}

/** Relatório completo de uma página, pronto para diff entre runs/builds. */
export function relatorioDeSchema(html) {
  const fp = schemaFingerprint(html);
  return {
    ...fp,
    faqVisivel: faqVisivel(html),
    faqSchema: faqSchema(fp.grafo),
    breadcrumbVisivel: breadcrumbVisivel(html),
    breadcrumbSchema: breadcrumbSchema(fp.grafo),
    artigo: artigoDoGrafo(fp.grafo),
  };
}
