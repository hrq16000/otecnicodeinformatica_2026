#!/usr/bin/env node
/**
 * CLI DE ENTREGA DE ALERTAS EDITORIAIS (Onda 10C · Infra 3 — Parte A).
 *
 * Consome os alertas edge-triggered JÁ deduplicados em
 * public/editorial-waves-alerts.json e entrega em Slack e/ou e-mail.
 *
 *   npm run alerts:editorial                  # entrega pendências
 *   npm run alerts:editorial -- --dry-run     # mostra o que enviaria
 *   npm run alerts:editorial -- --test=slack  # evento sintético (URL fictícia)
 *   npm run alerts:editorial -- --test=email
 *
 * Nunca usa URL editorial real para simular estado do Search Console.
 * Ausência de credencial nunca é erro: vira NOT_CONFIGURED / DELIVERY_DISABLED.
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  entregarAlertas,
  lerAuditoria,
  lerConfiguracao,
  persistirAuditoria,
} from "./lib/editorial-alert-delivery.mjs";

const argv = process.argv.slice(2);
const arg = (n) => argv.find((a) => a.startsWith(`--${n}=`))?.split("=")[1];
const DRY = argv.includes("--dry-run");
const TESTE = arg("test");
const LIMITE = Number(arg("limite") ?? 25);

const config = lerConfiguracao();

let alertas = [];
if (TESTE) {
  if (!["slack", "email"].includes(TESTE)) {
    console.error(`[alerts:editorial] --test aceita slack|email (recebido: ${TESTE})`);
    process.exit(1);
  }
  // Evento SINTÉTICO: URL fictícia, jamais uma URL editorial publicada.
  alertas = [
    {
      url: "/__teste-de-canal-de-alerta",
      lote: "TESTE/0",
      owner: "canal-de-teste",
      source: "TECHNICAL",
      eventType: "TECHNICAL_EVENT",
      previousState: "NO_DATA",
      currentState: "INDEXED",
      severity: "SUCCESS",
      observedAt: new Date().toISOString(),
    },
  ];
  for (const c of ["slack", "email"]) if (c !== TESTE) config[c].enabled = false;
} else {
  const arquivo = resolve(process.cwd(), "public/editorial-waves-alerts.json");
  if (!existsSync(arquivo)) {
    console.log("[alerts:editorial] sem public/editorial-waves-alerts.json — rode monitor:editorial-waves.");
    process.exit(0);
  }
  alertas = (JSON.parse(readFileSync(arquivo, "utf8")).alertas ?? []).slice(0, LIMITE);
}

const auditoria = lerAuditoria();
const { resultados, entregas, resumo } = await entregarAlertas(alertas, {
  config,
  auditoria,
  dryRun: DRY,
});

if (!DRY) {
  persistirAuditoria({
    geradoEm: new Date().toISOString(),
    canais: { slack: config.slack.status, email: config.email.status },
    entregas,
    historico: [
      ...resultados.map((r) => ({ ...r, em: new Date().toISOString() })),
      ...auditoria.historico,
    ].slice(0, 500),
  });
}

console.log(
  `[alerts:editorial] ${resumo.estado} · slack=${resumo.slack} email=${resumo.email} · eventos=${alertas.length} entregues=${resumo.enviados} ignorados=${resumo.ignorados}`,
);
for (const r of resultados) console.log(`  · ${r.channel ?? "—"} ${r.state} ${r.url}`);

// Falha de canal externo NUNCA quebra o build/CI.
process.exit(0);
