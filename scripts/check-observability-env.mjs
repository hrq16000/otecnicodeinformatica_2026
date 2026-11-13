#!/usr/bin/env node
/**
 * Validação da configuração opcional de observabilidade.
 *
 * Valida apenas os destinos informados:
 *   VITE_SENTRY_DSN    → https://<key>@<host>/<projeto>
 *   VITE_OTLP_ENDPOINT → URL http(s) sem barra final obrigatória
 *
 * Use --strict para exigir um destino ao validar uma instalação de telemetria.
 */
import { existsSync, readFileSync } from "node:fs";

const exigirDestino = process.argv.includes("--strict");

/** Lê .env do projeto sem sobrescrever o que já veio do ambiente. */
const fromEnvFile = (chave) => {
  for (const arquivo of [".env.production", ".env"]) {
    if (!existsSync(arquivo)) continue;
    const linha = readFileSync(arquivo, "utf8")
      .split("\n")
      .find((l) => l.trim().startsWith(`${chave}=`));
    if (linha) return linha.slice(linha.indexOf("=") + 1).trim().replace(/^["']|["']$/g, "");
  }
  return "";
};

const valor = (chave) => (process.env[chave] || fromEnvFile(chave) || "").trim();

const dsn = valor("VITE_SENTRY_DSN");
const otlp = valor("VITE_OTLP_ENDPOINT");
const erros = [];

if (dsn) {
  try {
    const u = new URL(dsn);
    if (!u.username || !u.pathname.replace(/^\//, "")) throw new Error("formato");
  } catch {
    erros.push(
      "VITE_SENTRY_DSN inválido — use o DSN completo do Sentry no formato https://<publicKey>@<host>/<idDoProjeto>.",
    );
  }
}
if (otlp && !/^https?:\/\/[^\s]+$/.test(otlp)) {
  erros.push(
    "VITE_OTLP_ENDPOINT inválido — informe a URL base do coletor OTLP (ex.: https://otlp.seu-coletor.com), sem o sufixo /v1/logs.",
  );
}
if (exigirDestino && !dsn && !otlp) {
  erros.push("Defina VITE_SENTRY_DSN ou VITE_OTLP_ENDPOINT para ativar a observabilidade.");
}

if (erros.length) {
  console.error("\n✖ Configuração de observabilidade incompleta ou inválida:");
  for (const e of erros) console.error(`  · ${e}`);
  process.exit(1);
}
console.log(
  `✔ Observabilidade: ${[dsn && "Sentry", otlp && "OTLP"].filter(Boolean).join(" + ") || "desligada"}.`,
);
