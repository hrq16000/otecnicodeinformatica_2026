#!/usr/bin/env node
/**
 * GATE DE OBSERVABILIDADE EM PRODUÇÃO.
 *
 * Em build de produção (CI, NODE_ENV=production ou --strict) exige pelo menos
 * um sink configurado e, quando configurado, exige valor válido:
 *   VITE_SENTRY_DSN    → https://<key>@<host>/<projeto>
 *   VITE_OTLP_ENDPOINT → URL http(s) sem barra final obrigatória
 *
 * Em desenvolvimento apenas avisa: o sink é fail-closed por design e nada é
 * enviado sem env — o build local não pode quebrar por isso.
 *
 * Escape hatch consciente: OBSERVABILITY_OPTIONAL=true.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const STRICT =
  process.argv.includes("--strict") ||
  process.env.CI === "true" ||
  process.env.NODE_ENV === "production";

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
/**
 * Verifica o artefato Wrangler REAL gerado pelo Nitro/Cloudflare. So um arquivo
 * de deploy contendo observability.enabled=true e main valida o sink nativo.
 * Ausencia do artefato em CI/production reprova; nao confia em env ficticia.
 */
const workerLogs = () => {
  const root = path.resolve("dist");
  if (!existsSync(root)) return "";
  const stack = [{ dir: root, depth: 0 }];
  while (stack.length) {
    const { dir, depth } = stack.pop();
    for (const ent of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        if (depth < 4 && ent.name !== "client" && ent.name !== "assets") {
          stack.push({ dir: full, depth: depth + 1 });
        }
        continue;
      }
      if (!ent.isFile() || !/^wrangler\.(json|jsonc|toml)$/.test(ent.name)) continue;
      const source = readFileSync(full, "utf8");
      if (ent.name.endsWith(".toml")) {
        if (/\[observability\][\s\S]*?^enabled\s*=\s*true/m.test(source) &&
            /^main\s*=\s*["'][^"']+["']/m.test(source)) return full;
        continue;
      }
      // Wrangler JSONC pode ter comentarios; o generated JSON valido e a prova preferida.
      let cfg;
      try {
        cfg = JSON.parse(source);
      } catch {
        // Regex fechada so para JSONC Wrangler com campos citados explicitamente.
        if (/"main"\s*:\s*"[^"]+"/.test(source) &&
            /"observability"\s*:\s*\{[^}]*"enabled"\s*:\s*true/.test(source))
          return full;
        continue;
      }
      if (cfg?.main && (cfg.observability?.enabled === true || cfg.observability?.logs?.enabled === true))
        return full;
    }
  }
  return "";
};

const workerLogsConfig = workerLogs();

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
if (!dsn && !otlp && !workerLogsConfig) {
  const msg =
    "Nenhum sink confirmado: configure VITE_SENTRY_DSN / VITE_OTLP_ENDPOINT ou habilite Workers Logs no Wrangler gerado em dist/.";
  if (STRICT && process.env.OBSERVABILITY_OPTIONAL !== "true") erros.push(msg);
  else console.warn(`⚠ ${msg}`);
}

if (erros.length) {
  console.error("\n✖ Observabilidade não configurada para produção:");
  for (const e of erros) console.error(`  · ${e}`);
  console.error(
    "\nDefina as variáveis no ambiente de build (ou OBSERVABILITY_OPTIONAL=true para liberar conscientemente).",
  );
  process.exit(1);
}
console.log(
  `✔ Observabilidade: ${[dsn && "Sentry", otlp && "OTLP", workerLogsConfig && `Workers Logs (${path.relative(process.cwd(), workerLogsConfig)})`].filter(Boolean).join(" + ") || "desligada (dev)"}.`,
);
