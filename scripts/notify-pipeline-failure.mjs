#!/usr/bin/env node
/**
 * NOTIFICAÇÃO DE FALHA DE PIPELINE (segurança e gates).
 *
 * Dispara Slack e/ou e-mail quando um job do CI falha após merge, incluindo:
 *   • workflow, job, commit e ator;
 *   • internal_id(s) monitorados FOUND, quando o relatório de segurança existir;
 *   • link direto para a execução do job.
 *
 * Fail-soft: sem webhook/credencial configurada apenas registra no log e sai 0 —
 * a notificação nunca deve mascarar o motivo real da falha do build.
 *
 * Uso: node scripts/notify-pipeline-failure.mjs --contexto "Security recurring"
 */
import { existsSync, readFileSync } from "node:fs";

const arg = (nome) => {
  const i = process.argv.indexOf(`--${nome}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
};

const contexto = arg("contexto") ?? process.env.GITHUB_JOB ?? "pipeline";
const repo = process.env.GITHUB_REPOSITORY ?? "projeto";
const sha = (process.env.GITHUB_SHA ?? "local").slice(0, 7);
const ator = process.env.GITHUB_ACTOR ?? "UNKNOWN";
const workflow = process.env.GITHUB_WORKFLOW ?? contexto;
const ref = process.env.GITHUB_REF_NAME ?? "UNKNOWN";
const jobUrl =
  process.env.GITHUB_SERVER_URL && process.env.GITHUB_RUN_ID
    ? `${process.env.GITHUB_SERVER_URL}/${repo}/actions/runs/${process.env.GITHUB_RUN_ID}`
    : null;

// Findings monitorados, quando o relatório de segurança já foi gerado.
let findings = [];
const SUMMARY = "reports/security-scan-summary.json";
if (existsSync(SUMMARY)) {
  try {
    findings = JSON.parse(readFileSync(SUMMARY, "utf8")).found ?? [];
  } catch {
    findings = [];
  }
}

const linhasFindings = findings.length
  ? findings.map((f) => `• \`${f.internal_id}\` — ${f.status} — ${f.description}`)
  : ["Nenhum internal_id monitorado FOUND — falha veio de gate/teste do job."];

const titulo = `Falha no pipeline "${workflow}" (${contexto}) — ${repo}@${sha}`;
const corpo = [
  `Branch/ref: ${ref}`,
  `Responsável pelo push: ${ator}`,
  "",
  ...linhasFindings,
  "",
  jobUrl ? `Job: ${jobUrl}` : "Job: execução local (sem URL).",
].join("\n");

console.error(`[notify] ${titulo}\n${corpo}`);

let entregou = false;

const webhook = process.env.SLACK_WEBHOOK_URL ?? process.env.PIPELINE_ALERT_SLACK_WEBHOOK;
if (webhook) {
  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `:rotating_light: ${titulo}`,
        blocks: [
          {
            type: "section",
            text: { type: "mrkdwn", text: `:rotating_light: *${titulo}*\n${corpo}` },
          },
        ],
      }),
    });
    entregou = res.ok;
    if (!res.ok) console.warn(`[notify] Slack respondeu ${res.status}`);
  } catch (e) {
    console.warn(`[notify] Slack indisponível: ${e.message}`);
  }
} else {
  console.warn("[notify] SLACK_WEBHOOK_URL ausente — Slack pulado.");
}

const email = process.env.PIPELINE_ALERT_EMAIL_TO;
const resendKey = process.env.RESEND_API_KEY;
const remetente = process.env.PIPELINE_ALERT_EMAIL_FROM;
if (email && resendKey && remetente) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: remetente,
        to: email.split(",").map((e) => e.trim()),
        subject: titulo,
        text: corpo,
      }),
    });
    entregou = entregou || res.ok;
    if (!res.ok) console.warn(`[notify] Resend respondeu ${res.status}`);
  } catch (e) {
    console.warn(`[notify] Resend indisponível: ${e.message}`);
  }
} else if (email) {
  console.warn("[notify] E-mail configurado sem RESEND_API_KEY/FROM — envio pulado.");
}

console.log(entregou ? "[notify] alerta entregue." : "[notify] nenhum canal entregue (fail-soft).");
