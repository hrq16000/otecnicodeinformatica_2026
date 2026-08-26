/**
 * CAMADA ÚNICA DE ENTREGA DE ALERTAS EDITORIAIS (Onda 10C · Infra 3 — Parte A).
 *
 *   normalized event → routing rules → Slack → E-mail → delivery result → audit log
 *
 * Princípios:
 *  • NÃO existe segundo monitor: consome os eventos edge-triggered já
 *    deduplicados por scripts/lib/editorial-alerts.mjs;
 *  • Slack e e-mail são INDEPENDENTES — configurar um não afeta o outro, e
 *    a ausência de ambos nunca derruba o monitor (DELIVERY_DISABLED);
 *  • idempotência da ENTREGA por (eventId, channel): retry não duplica envio;
 *  • retry apenas para falhas transitórias (timeout, 429, 5xx);
 *    erro de configuração vira FAILED_CONFIG, sem retry contínuo;
 *  • nenhum segredo é persistido no audit log.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

export const ARQUIVO_ENTREGA = resolve(process.cwd(), "reports/editorial/alert-delivery.json");

/** Severidade por estado (inclui estados técnicos fora do GSC). */
const SEVERIDADE = {
  INDEXED: "SUCCESS",
  PUBLISHED: "INFO",
  AWAITING_CRAWL: "INFO",
  DISCOVERED: "INFO",
  CRAWLED: "INFO",
  DRAFT: "INFO",
  APPROVED: "INFO",
  NO_DATA: "INFO",
  UNKNOWN: "INFO",
  CRAWLED_NOT_INDEXED: "WARNING",
  STALE: "WARNING",
  CANONICAL_CONFLICT: "ERROR",
  BLOCKED: "ERROR",
  NOINDEX_UNEXPECTED: "ERROR",
  INDEXNOW_FAILED: "ERROR",
};

export const severidadeDeEstado = (estado) => SEVERIDADE[estado] ?? "INFO";

const listaEnv = (nome, padrao) => {
  const v = (process.env[nome] ?? "").trim();
  if (!v) return padrao;
  return v
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);
};

/**
 * Configuração de canais. Slack e e-mail são independentes: cada um só é
 * `enabled` quando a própria credencial existir.
 */
export function lerConfiguracao(env = process.env) {
  const slackUrl = env.EDITORIAL_SLACK_WEBHOOK_URL ?? env.SLACK_WEBHOOK_URL ?? null;
  const emailKey = env.RESEND_API_KEY ?? null;
  const emailTo = env.EDITORIAL_ALERT_EMAIL_TO ?? env.ALERT_EMAIL_TO ?? null;
  const emailFrom =
    env.EDITORIAL_ALERT_EMAIL_FROM ??
    env.ALERT_EMAIL_FROM ??
    (env.VITE_SITE_DOMAIN ? `alertas@${String(env.VITE_SITE_DOMAIN).replace(/^https?:\/\//, "")}` : null);

  return {
    slack: {
      enabled: Boolean(slackUrl),
      webhookUrl: slackUrl,
      severities: listaEnv("EDITORIAL_SLACK_SEVERITIES", ["SUCCESS", "WARNING", "ERROR"]),
      status: slackUrl ? "CONFIGURED" : "NOT_CONFIGURED",
    },
    email: {
      enabled: Boolean(emailKey && emailTo && emailFrom),
      apiKey: emailKey,
      to: emailTo,
      from: emailFrom,
      provider: "resend",
      severities: listaEnv("EDITORIAL_EMAIL_SEVERITIES", ["SUCCESS", "ERROR"]),
      status: emailKey && emailTo && emailFrom ? "CONFIGURED" : "NOT_CONFIGURED",
    },
  };
}

/** Identificador estável da transição (base da idempotência de entrega). */
export const eventId = (e) =>
  createHash("sha256")
    .update(`${e.url}|${e.source}|${e.previousState ?? "∅"}→${e.currentState}`)
    .digest("hex")
    .slice(0, 16);

/** Normaliza um alerta do monitor no evento de entrega. */
export function normalizarEvento(a) {
  const severity = a.severity ?? severidadeDeEstado(a.currentState);
  return {
    id: eventId(a),
    url: a.url,
    lote: a.lote ?? null,
    owner: a.owner ?? a.ownerId ?? null,
    source: a.source ?? "TECHNICAL",
    eventType: a.eventType ?? "GSC_EVENT",
    previousState: a.previousState ?? null,
    currentState: a.currentState,
    severity,
    observedAt: a.observedAt ?? new Date().toISOString(),
    lastCrawl: a.lastCrawl ?? null,
    painelUrl: a.painelUrl ?? null,
  };
}

/** Payload compacto do Slack (sem segredo, sem PII). */
export function mensagemSlack(e, { painel } = {}) {
  return [
    `[Onda ${String(e.lote ?? "—").replace("/", " · Lote ")}]`,
    "",
    e.currentState,
    e.url,
    "",
    `Antes: ${e.previousState ?? "∅"}`,
    `Agora: ${e.currentState}`,
    `Fonte: ${e.source}`,
    `Crawl: ${e.lastCrawl ?? "—"}`,
    `Observado: ${e.observedAt}`,
    "",
    `Abrir no painel: ${painel ?? e.painelUrl ?? "/admin/editorial-ondas"}`,
  ].join("\n");
}

export const assuntoEmail = (e) =>
  `[${e.severity}] ${e.currentState} · ${e.url} (${e.lote ?? "—"})`;

/** Classifica a falha para decidir retry. */
export function classificarFalha({ status, erro }) {
  if (erro) return "RETRYABLE";
  if (status === 429 || status >= 500) return "RETRYABLE";
  if (status === 401 || status === 403 || status === 404 || status === 422) return "FAILED_CONFIG";
  if (status >= 400) return "FAILED";
  return "DELIVERED";
}

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

/** Executa `fn` com retry apenas em falha transitória (máx. 3 tentativas). */
export async function comRetry(fn, { tentativas = 3, esperaMs = 250 } = {}) {
  let ultima = null;
  for (let i = 1; i <= tentativas; i += 1) {
    const r = await fn(i);
    ultima = { ...r, tentativas: i };
    const classe = classificarFalha(r);
    if (classe !== "RETRYABLE") return { ...ultima, classe };
    if (i < tentativas) await dormir(esperaMs * i);
  }
  return { ...ultima, classe: "RETRYABLE" };
}

/** Adapter Slack (Incoming Webhook). */
export const slackAdapter = (fetchImpl = fetch) => ({
  canal: "slack",
  async enviar(evento, cfg) {
    const r = await fetchImpl(cfg.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: mensagemSlack(evento) }),
    }).catch((e) => ({ ok: false, status: 0, erro: String(e).slice(0, 200) }));
    return { status: r.status ?? 0, erro: r.erro ?? null };
  },
});

/** Adapter de e-mail (Resend — provedor transacional já adotado no projeto). */
export const emailAdapter = (fetchImpl = fetch) => ({
  canal: "email",
  async enviar(evento, cfg) {
    const r = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: cfg.from,
        to: String(cfg.to).split(",").map((s) => s.trim()),
        subject: assuntoEmail(evento),
        text: mensagemSlack(evento),
      }),
    }).catch((e) => ({ ok: false, status: 0, erro: String(e).slice(0, 200) }));
    return { status: r.status ?? 0, erro: r.erro ?? null };
  },
});

export function lerAuditoria(arquivo = ARQUIVO_ENTREGA) {
  if (!existsSync(arquivo)) return { geradoEm: null, entregas: {}, historico: [] };
  try {
    const j = JSON.parse(readFileSync(arquivo, "utf8"));
    return { geradoEm: j.geradoEm ?? null, entregas: j.entregas ?? {}, historico: j.historico ?? [] };
  } catch {
    return { geradoEm: null, entregas: {}, historico: [] };
  }
}

export function persistirAuditoria(registro, arquivo = ARQUIVO_ENTREGA) {
  mkdirSync(dirname(arquivo), { recursive: true });
  writeFileSync(arquivo, `${JSON.stringify(registro, null, 2)}\n`);
}

/**
 * Entrega os eventos nos canais habilitados.
 *
 * @param {Array} alertas eventos edge-triggered JÁ deduplicados
 * @param {object} opts { config, auditoria, adapters, dryRun }
 * @returns {{resultados: Array, entregas: object, resumo: object}}
 */
export async function entregarAlertas(alertas, opts = {}) {
  const config = opts.config ?? lerConfiguracao();
  const auditoria = opts.auditoria ?? lerAuditoria();
  const adapters = opts.adapters ?? { slack: slackAdapter(), email: emailAdapter() };
  const dryRun = Boolean(opts.dryRun);
  const agora = opts.agora ?? new Date().toISOString();

  const entregas = { ...auditoria.entregas };
  const resultados = [];
  const eventos = alertas.map(normalizarEvento);

  const canaisAtivos = ["slack", "email"].filter((c) => config[c]?.enabled);
  if (canaisAtivos.length === 0) {
    return {
      resultados: eventos.map((e) => ({
        eventId: e.id,
        url: e.url,
        channel: null,
        state: "DELIVERY_DISABLED",
      })),
      entregas,
      resumo: {
        estado: "DELIVERY_DISABLED",
        slack: config.slack.status,
        email: config.email.status,
        enviados: 0,
        ignorados: eventos.length,
      },
    };
  }

  for (const evento of eventos) {
    for (const canal of canaisAtivos) {
      const cfg = config[canal];
      const chave = `${evento.id}:${canal}`;

      if (!cfg.severities.includes(evento.severity)) {
        resultados.push({ eventId: evento.id, url: evento.url, channel: canal, state: "FILTERED_SEVERITY" });
        continue;
      }
      if (entregas[chave]?.deliveredAt) {
        resultados.push({ eventId: evento.id, url: evento.url, channel: canal, state: "ALREADY_DELIVERED" });
        continue;
      }
      if (entregas[chave]?.state === "FAILED_CONFIG") {
        resultados.push({ eventId: evento.id, url: evento.url, channel: canal, state: "FAILED_CONFIG" });
        continue;
      }
      if (dryRun) {
        resultados.push({
          eventId: evento.id,
          url: evento.url,
          channel: canal,
          state: "DRY_RUN",
          preview: mensagemSlack(evento).slice(0, 400),
        });
        continue;
      }

      const attemptedAt = agora;
      const r = await comRetry(() => adapters[canal].enviar(evento, cfg));
      const state =
        r.classe === "DELIVERED" ? "DELIVERED" : r.classe === "RETRYABLE" ? "RETRYABLE" : r.classe;

      entregas[chave] = {
        eventId: evento.id,
        url: evento.url,
        channel: canal,
        severity: evento.severity,
        attemptedAt,
        deliveredAt: state === "DELIVERED" ? agora : (entregas[chave]?.deliveredAt ?? null),
        attempts: r.tentativas,
        response: r.erro ? `ERR ${r.erro}` : `HTTP ${r.status}`,
        state,
      };
      resultados.push({ eventId: evento.id, url: evento.url, channel: canal, state, attempts: r.tentativas });
    }
  }

  const enviados = resultados.filter((r) => r.state === "DELIVERED").length;
  return {
    resultados,
    entregas,
    resumo: {
      estado: dryRun ? "DRY_RUN" : "ACTIVE",
      slack: config.slack.status,
      email: config.email.status,
      enviados,
      ignorados: resultados.length - enviados,
    },
  };
}
