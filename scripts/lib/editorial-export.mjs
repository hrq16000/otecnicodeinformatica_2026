/**
 * PACOTE DE EVIDÊNCIAS POR ONDA/LOTE (Onda 10C · Infra 3 — Parte D).
 *
 * Funções puras de montagem das linhas exportáveis + serialização CSV/JSON e
 * manifesto com SHA-256. Nenhum segredo entra no pacote: chaves de IndexNow,
 * webhooks e credenciais são explicitamente removidos.
 */
import { createHash } from "node:crypto";

/** Chaves proibidas em qualquer export (gate de vazamento). */
export const CHAVES_PROIBIDAS = [
  "key",
  "apiKey",
  "api_key",
  "webhook",
  "webhookUrl",
  "token",
  "secret",
  "authorization",
  "password",
  "keyLocation",
];

export const PADROES_SEGREDO = [
  /hooks\.slack\.com\/services\/[A-Za-z0-9/_-]+/i,
  /\bre_[A-Za-z0-9]{12,}\b/,
  /\bsb_secret_[A-Za-z0-9_-]+/,
  /\bBearer\s+[A-Za-z0-9._-]{16,}/i,
  /\b[a-f0-9]{32}\.txt\b/i,
];

/** Remove recursivamente chaves sensíveis. */
export function sanitizar(valor) {
  if (Array.isArray(valor)) return valor.map(sanitizar);
  if (valor && typeof valor === "object") {
    const saida = {};
    for (const [k, v] of Object.entries(valor)) {
      if (CHAVES_PROIBIDAS.some((p) => k.toLowerCase() === p.toLowerCase())) continue;
      saida[k] = sanitizar(v);
    }
    return saida;
  }
  return valor;
}

/** Verifica se um texto serializado contém padrão de segredo. */
export const contemSegredo = (texto) => PADROES_SEGREDO.some((re) => re.test(texto));

const celula = (v) => {
  const t = v === null || v === undefined ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
  return /[",;\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
};

export function paraCsv(linhas) {
  if (!linhas.length) return "";
  const colunas = [...new Set(linhas.flatMap((l) => Object.keys(l)))];
  return `${[colunas.join(";"), ...linhas.map((l) => colunas.map((c) => celula(l[c])).join(";"))].join("\n")}\n`;
}

export const sha256 = (texto) => createHash("sha256").update(texto).digest("hex");

// ── Montagem das linhas por domínio de evidência ────────────────────────────

export function linhasIndexNow(estado, alvos) {
  return alvos.map((e) => {
    const r = estado?.rotas?.[e.url] ?? {};
    return {
      wave: e.wave,
      batch: e.batch,
      url: e.url,
      contentHash: r.currentContentHash ?? null,
      lastSubmittedHash: r.lastSubmittedHash ?? null,
      deployment: r.deploySha ? "CONFIRMED" : "UNCONFIRMED",
      state: r.submissionState ?? "PENDING_DEPLOY",
      http: r.lastResponse ?? null,
      submittedAt: r.lastSubmittedAt ?? null,
      endpoints: "api.indexnow.org",
      motivo: r.motivo ?? null,
    };
  });
}

export function linhasAssets(status, alvos) {
  const owners = new Set(alvos.map((e) => e.ownerId));
  return (status?.assets ?? [])
    .filter((a) => owners.size === 0 || owners.has(a.owner))
    .map((a) => ({
      owner: a.owner,
      asset: a.slug,
      localPath: a.localPath,
      originalUrl: a.originalUrl,
      platform: a.platform ?? a.sourceType,
      author: a.author,
      license: a.license,
      licenseUrl: a.licenseUrl,
      attribution: a.attributionText,
      fileHash: a.fileHash,
      webp: (a.formats ?? []).some((f) => f.endsWith(".webp")),
      avif: (a.formats ?? []).some((f) => f.endsWith(".avif")),
      aiGate: a.resultado === "FAIL" && (a.falhas ?? []).some((f) => /IA|AI/i.test(f)) ? "FAIL" : "PASS",
      result: a.resultado,
    }));
}

export function linhasSchema(fingerprints, snapshots, diffs, alvos) {
  const porUrl = new Map((fingerprints?.rotas ?? []).map((r) => [r.url, r]));
  const diffPorUrl = new Map((diffs ?? []).map((d) => [d.url, d]));
  const ultimo = snapshots?.builds?.[0];
  return alvos.map((e) => {
    const f = porUrl.get(e.url) ?? {};
    const s = ultimo?.rotas?.[e.url] ?? {};
    return {
      owner: e.ownerId,
      url: e.url,
      buildSha: ultimo?.buildSha ?? null,
      fingerprint: f.fingerprint ?? s.fingerprint ?? null,
      schemaTypes: (f.tipos ?? s.types ?? []).join("|"),
      faqCount: f.faqSchema ?? (s.faqQuestions ?? []).length,
      breadcrumbCount: f.breadcrumb ?? (s.breadcrumbItems ?? []).length,
      variants: f.variantes ?? null,
      deterministic: f.variantes === 1 ? "SIM" : f.variantes ? "NAO" : "UNKNOWN",
      regressionState: diffPorUrl.get(e.url)?.estado ?? "UNKNOWN",
    };
  });
}

export function linhasIndexacao(status, alvos) {
  const porUrl = new Map((status?.rotas ?? []).map((r) => [r.url, r]));
  return alvos.map((e) => {
    const r = porUrl.get(e.url);
    const g = r?.google ?? {};
    return {
      url: e.url,
      wave: e.wave,
      batch: e.batch,
      editorialStatus: r?.internalState ?? "UNKNOWN",
      searchStatus: g.status ?? "UNKNOWN",
      lastCrawl: g.ultimoCrawl ?? "NO_DATA",
      indexed: g.status === "INDEXED" ? "SIM" : g.status === "UNKNOWN" ? "UNKNOWN" : "NAO",
      impressions: "NO_DATA",
      clicks: "NO_DATA",
      canonical: g.canonicalGoogle ?? g.canonicalDeclarado ?? "NO_DATA",
      observedAt: status?.geradoEm ?? null,
    };
  });
}

/** Manifesto com hash SHA-256 e contagem de linhas por arquivo. */
export function montarManifest({ wave, batch, buildSha, arquivos }) {
  return {
    wave,
    batch: batch ?? null,
    generatedAt: new Date().toISOString(),
    buildSha: buildSha ?? null,
    files: arquivos.map((a) => ({ name: a.name, sha256: sha256(a.content), rows: a.rows })),
  };
}
