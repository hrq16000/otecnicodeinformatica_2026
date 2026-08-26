/**
 * DIFF SEMÂNTICO DE SCHEMA ENTRE BUILDS (Onda 10C · Infra 3 — Parte C).
 *
 * Compara SNAPSHOTS normalizados (nunca DOM/HTML bruto) produzidos a partir do
 * fingerprint semântico da Infra 2. Reordenação de chaves JSON nunca gera
 * diferença: o fingerprint já é calculado sobre o grafo ordenado.
 *
 * Classificação:
 *   UNCHANGED         fingerprint idêntico
 *   EXPECTED_CHANGE   mudança sem perda de contrato (ex.: FAQ nova, texto)
 *   SCHEMA_REGRESSION perda de tipo obrigatório, FAQ visível sem FAQPage,
 *                     breadcrumb sumido, publisher trocado, JSON inválido
 *   UNKNOWN           falta um dos lados
 */

/** Tipos cuja ausência superveniente é regressão. */
export const TIPOS_CRITICOS = ["BreadcrumbList", "TechArticle", "Article", "BlogPosting"];

const arr = (v) => (Array.isArray(v) ? v : []);
const norm = (s) =>
  String(s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Snapshot mínimo e estável de uma rota (sem campos sensíveis). */
export function snapshotDeRender(render, { buildSha, owner, lote }) {
  return {
    buildSha,
    url: render.url,
    owner: owner ?? null,
    lote: lote ?? null,
    fingerprint: render.fingerprint ?? null,
    types: arr(render.tipos),
    nodes: render.nos ?? arr(render.tipos).length,
    faqQuestions: (render.faqSchema ?? []).map((q) => q.q),
    faqVisibleQuestions: arr(render.faqVisivel),
    faqAnswers: Object.fromEntries((render.faqSchema ?? []).map((q) => [norm(q.q), norm(q.a)])),
    breadcrumbItems: (render.breadcrumbSchema ?? []).map((i) => ({ name: i.name, item: i.item })),
    breadcrumbVisible: arr(render.breadcrumbVisivel),
    articleFields: render.artigo ?? null,
    parseError: arr(render.tipos).includes("PARSE_ERROR"),
  };
}

const diffLista = (a, b) => ({
  added: b.filter((x) => !a.includes(x)),
  removed: a.filter((x) => !b.includes(x)),
});

/** Diff dedicado de FAQPage. */
export function diffFaq(a, b) {
  const qa = a.faqQuestions ?? [];
  const qb = b.faqQuestions ?? [];
  const { added, removed } = diffLista(qa.map(norm), qb.map(norm));
  const changedAnswers = [];
  for (const q of qa.map(norm)) {
    if (!qb.map(norm).includes(q)) continue;
    if ((a.faqAnswers?.[q] ?? "") !== (b.faqAnswers?.[q] ?? "")) changedAnswers.push(q);
  }
  const visiveis = (b.faqVisibleQuestions ?? []).map(norm);
  const noSchema = qb.map(norm);
  return {
    countA: qa.length,
    countB: qb.length,
    addedQuestions: qb.filter((q) => added.includes(norm(q))),
    removedQuestions: qa.filter((q) => removed.includes(norm(q))),
    changedAnswers,
    hiddenInSchema: (b.faqVisibleQuestions ?? []).filter((q) => !noSchema.includes(norm(q))),
    visibleWithoutSchema: qb.filter((q) => visiveis.length > 0 && !visiveis.includes(norm(q))),
  };
}

/** Diff dedicado de BreadcrumbList (schema × UI). */
export function diffBreadcrumb(a, b) {
  const na = (a.breadcrumbItems ?? []).map((i) => i.name);
  const nb = (b.breadcrumbItems ?? []).map((i) => i.name);
  const urlsMudadas = (a.breadcrumbItems ?? [])
    .map((i, idx) => ({ nome: i.name, de: i.item, para: b.breadcrumbItems?.[idx]?.item ?? null }))
    .filter((x) => x.de !== x.para);
  const ordemAlterada =
    na.length === nb.length && na.join("|") !== nb.join("|") && na.slice().sort().join("|") === nb.slice().sort().join("|");
  const divergeUi =
    (b.breadcrumbVisible ?? []).length > 0 &&
    (b.breadcrumbVisible ?? []).map(norm).join("|") !== nb.map(norm).join("|");
  return {
    countA: na.length,
    countB: nb.length,
    ...diffLista(na, nb),
    urlsMudadas,
    ordemAlterada,
    divergeUi,
  };
}

/** Diff semântico do nó Article/TechArticle. */
export function diffArtigo(a, b) {
  const campos = ["tipo", "headline", "author", "publisher", "image", "dateModified", "mainEntityOfPage"];
  const mudancas = [];
  for (const c of campos) {
    const va = JSON.stringify(a.articleFields?.[c] ?? null);
    const vb = JSON.stringify(b.articleFields?.[c] ?? null);
    if (va !== vb) mudancas.push({ campo: c, de: a.articleFields?.[c] ?? null, para: b.articleFields?.[c] ?? null });
  }
  return { presenteA: Boolean(a.articleFields), presenteB: Boolean(b.articleFields), mudancas };
}

/** Comparação completa entre dois snapshots da MESMA URL. */
export function compararSnapshots(a, b) {
  if (!a || !b) return { estado: "UNKNOWN", motivo: "snapshot ausente em um dos builds" };

  const tipos = diffLista(a.types ?? [], b.types ?? []);
  const faq = diffFaq(a, b);
  const breadcrumb = diffBreadcrumb(a, b);
  const artigo = diffArtigo(a, b);

  const regressoes = [];
  if (b.parseError) regressoes.push("JSON-LD inválido no build B");
  for (const t of TIPOS_CRITICOS) {
    if ((a.types ?? []).includes(t) && !(b.types ?? []).includes(t)) regressoes.push(`${t} desapareceu`);
  }
  if ((b.faqVisibleQuestions ?? []).length > 0 && !(b.types ?? []).includes("FAQPage"))
    regressoes.push("FAQ visível perdeu FAQPage");
  if (faq.hiddenInSchema.length) regressoes.push(`FAQ visível fora do schema: ${faq.hiddenInSchema.length}`);
  if (breadcrumb.divergeUi) regressoes.push("BreadcrumbList diverge do breadcrumb visível");
  if (artigo.presenteA && !artigo.presenteB) regressoes.push("nó de artigo desapareceu");
  const publisher = artigo.mudancas.find((m) => m.campo === "publisher");
  if (publisher) regressoes.push("publisher mudou de entidade");
  const mainEntity = artigo.mudancas.find((m) => m.campo === "mainEntityOfPage");
  if (mainEntity) regressoes.push("mainEntityOfPage/canonical divergiu");

  const estado =
    a.fingerprint && a.fingerprint === b.fingerprint
      ? "UNCHANGED"
      : regressoes.length
        ? "SCHEMA_REGRESSION"
        : "EXPECTED_CHANGE";

  return {
    estado,
    fingerprintA: a.fingerprint,
    fingerprintB: b.fingerprint,
    nodes: { de: a.nodes ?? 0, para: b.nodes ?? 0 },
    tipos,
    faq,
    breadcrumb,
    artigo,
    regressoes,
  };
}

/** Diff de um build inteiro (mapa url → snapshot). */
export function compararBuilds(buildA, buildB) {
  const urls = [...new Set([...Object.keys(buildA ?? {}), ...Object.keys(buildB ?? {})])].sort();
  return urls.map((url) => ({ url, ...compararSnapshots(buildA?.[url], buildB?.[url]) }));
}
