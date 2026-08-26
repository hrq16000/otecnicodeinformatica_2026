/**
 * ALERTAS EDITORIAIS EDGE-TRIGGERED (Onda 10C · Infra 2 — Parte A).
 *
 * Regras:
 *  • alerta SOMENTE em transição real de estado (edge-triggered);
 *  • dedupe por (url, previousState→currentState): o mesmo estado repetido em
 *    coletas seguintes NÃO gera novo alerta;
 *  • `PUBLISHED` é estado INTERNO do pipeline editorial e é classificado como
 *    EDITORIAL_EVENT — nunca é apresentado como resposta do Search Console;
 *  • ausência de webhook não derruba o monitor: o alerta fica persistido em
 *    public/editorial-waves-alerts.json e aparece no painel.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

export const ARQUIVO_ALERTAS = resolve(process.cwd(), "public/editorial-waves-alerts.json");
export const ARQUIVO_STATUS = resolve(process.cwd(), "public/editorial-waves-status.json");

/** Estados internos do pipeline editorial (não vêm do Google). */
export const ESTADOS_INTERNOS = ["DRAFT", "APPROVED", "PUBLISHED"];

/** Estados normalizados de busca (evidência do Search Console). */
export const ESTADOS_BUSCA = [
  "NO_DATA",
  "AWAITING_CRAWL",
  "DISCOVERED",
  "CRAWLED",
  "INDEXED",
  "CRAWLED_NOT_INDEXED",
  "CANONICAL_CONFLICT",
  "BLOCKED",
  "UNKNOWN",
];

const SEVERIDADE = {
  PUBLISHED: "INFO",
  DISCOVERED: "INFO",
  CRAWLED: "INFO",
  AWAITING_CRAWL: "INFO",
  INDEXED: "SUCCESS",
  CRAWLED_NOT_INDEXED: "WARNING",
  STALE: "WARNING",
  CANONICAL_CONFLICT: "ERROR",
  BLOCKED: "ERROR",
};

export const severidadeDe = (estado) => SEVERIDADE[estado] ?? "INFO";

/**
 * Normaliza a resposta do URL Inspection em um estado de busca.
 * Nunca inventa: sem credencial/erro → UNKNOWN; sem dado → NO_DATA.
 */
export function normalizarEstadoBusca(g, { emSitemap } = {}) {
  if (!g || g.status === "UNKNOWN") return "UNKNOWN";
  const cobertura = String(g.coverageState ?? "").toLowerCase();
  const robots = String(g.robotsTxtState ?? "").toUpperCase();
  const indexing = String(g.indexingState ?? "").toUpperCase();

  if (robots === "DISALLOWED" || indexing === "BLOCKED_BY_META_TAG" || indexing === "BLOCKED_BY_HTTP_HEADER")
    return "BLOCKED";
  if (
    g.canonicalGoogle &&
    g.canonicalDeclarado &&
    String(g.canonicalGoogle).replace(/\/$/, "") !== String(g.canonicalDeclarado).replace(/\/$/, "")
  )
    return "CANONICAL_CONFLICT";
  if (g.verdict === "PASS") return "INDEXED";
  if (cobertura.includes("crawled")) return "CRAWLED_NOT_INDEXED";
  if (cobertura.includes("discovered")) return "DISCOVERED";
  if (g.ultimoCrawl) return "CRAWLED";
  if (cobertura.includes("unknown to google")) return emSitemap ? "AWAITING_CRAWL" : "NO_DATA";
  return "NO_DATA";
}

export function lerAlertas() {
  if (!existsSync(ARQUIVO_ALERTAS)) return { geradoEm: null, estado: {}, alertas: [] };
  try {
    const j = JSON.parse(readFileSync(ARQUIVO_ALERTAS, "utf8"));
    return { geradoEm: j.geradoEm ?? null, estado: j.estado ?? {}, alertas: j.alertas ?? [] };
  } catch {
    return { geradoEm: null, estado: {}, alertas: [] };
  }
}

/**
 * Calcula os alertas novos a partir do estado persistido.
 * @returns { alertasNovos, estado } — estado já atualizado para persistir.
 */
export function calcularTransicoes(anterior, observacoes, agora) {
  const estado = { ...anterior.estado };
  const alertasNovos = [];

  for (const o of observacoes) {
    const prev = estado[o.url] ?? {
      url: o.url,
      previousState: null,
      currentState: null,
      internalState: null,
      observedAt: null,
      lastAlertedTransition: null,
      contentHash: null,
    };

    const empurrar = (fonte, de, para) => {
      const transicao = `${fonte}:${de ?? "∅"}→${para}`;
      if (de === para) return; // não é borda
      if (prev.lastAlertedTransition === transicao) return; // dedupe
      if (fonte === "GSC" && (para === "NO_DATA" || para === "UNKNOWN") && de === null) return;
      alertasNovos.push({
        url: o.url,
        lote: o.lote,
        owner: o.ownerId,
        source: fonte === "GSC" ? "GSC" : fonte === "EDITORIAL" ? "EDITORIAL" : "TECHNICAL",
        eventType: fonte === "EDITORIAL" ? "EDITORIAL_EVENT" : "GSC_EVENT",
        previousState: de,
        currentState: para,
        severity: severidadeDe(para),
        observedAt: agora,
        contentHash: o.contentHash ?? null,
      });
      prev.lastAlertedTransition = transicao;
    };

    // Evento interno (pipeline editorial) — nunca atribuído ao Google.
    if (prev.internalState !== o.internalState) {
      empurrar("EDITORIAL", prev.internalState, o.internalState);
      prev.internalState = o.internalState;
    }
    // Evidência do Google.
    if (o.searchState !== "UNKNOWN") {
      empurrar("GSC", prev.currentState, o.searchState);
      prev.previousState = prev.currentState;
      prev.currentState = o.searchState;
    }

    prev.observedAt = agora;
    prev.contentHash = o.contentHash ?? prev.contentHash;
    estado[o.url] = prev;
  }

  return { alertasNovos, estado };
}

/** Envia ao webhook configurado; ausência ou falha nunca derruba o monitor. */
export async function despacharWebhook(alertas) {
  const url =
    process.env.EDITORIAL_ALERT_WEBHOOK ??
    process.env.ALERT_WEBHOOK_URL ??
    process.env.SLACK_WEBHOOK_URL ??
    null;
  if (!url || alertas.length === 0) return { enviado: false, motivo: url ? "sem alertas" : "sem webhook" };
  const texto = alertas
    .map((a) => `[${a.severity}] ${a.source} ${a.url}: ${a.previousState ?? "∅"} → ${a.currentState}`)
    .join("\n");
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: `Ondas editoriais — mudanças de estado\n${texto}`, alertas }),
    });
    return { enviado: r.ok, http: r.status };
  } catch (e) {
    return { enviado: false, motivo: String(e).slice(0, 200) };
  }
}

export function persistirAlertas(registro) {
  writeFileSync(ARQUIVO_ALERTAS, `${JSON.stringify(registro, null, 2)}\n`);
}
