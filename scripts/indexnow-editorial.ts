#!/usr/bin/env bun
// (Infra 3) Além de reports/indexnow/editorial-wave-status.json, publica uma
// cópia SANITIZADA em public/editorial-indexnow-status.json para o painel.
/**
 * INDEXNOW EDITORIAL — DIFF-BASED E IDEMPOTENTE (Onda 10C · Infra 2, Parte B).
 *
 * Nunca reenvia URL cujo conteúdo MATERIAL não mudou. Regra de elegibilidade:
 *
 *   currentContentHash != lastSubmittedHash   E   deploymentConfirmed = true
 *
 * `currentContentHash` é o fingerprint do conteúdo VISÍVEL + JSON-LD da página
 * renderizada localmente (scripts/lib/content-fingerprint.mjs). O deploy só é
 * considerado confirmado quando a URL pública serve conteúdo com o MESMO
 * fingerprint — ou seja, provamos que o hash que vamos anunciar já está no ar.
 *
 * IndexNow aceito NÃO significa indexado: o estado gravado é SUBMITTED.
 *
 * Uso:
 *   npm run indexnow:editorial -- --wave=10C --batch=2 --dry-run
 *   npm run indexnow:editorial -- --wave=10C --batch=2
 *
 * Estado persistido: reports/indexnow/editorial-wave-status.json
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
// @ts-expect-error — utilitário JS compartilhado (sem tipos).
import { fingerprintDeHtml } from "./lib/content-fingerprint.mjs";
import { EDITORIAL_WAVES, batchKey } from "../src/lib/editorialWavesRegistry";

const argv = process.argv.slice(2);
const arg = (n: string) => argv.find((a) => a.startsWith(`--${n}=`))?.split("=").slice(1).join("=");
const flag = (n: string) => argv.includes(`--${n}`);

const DRY = flag("dry-run");
const wave = arg("wave");
const batch = arg("batch");

const HOST = (process.env.INDEXNOW_HOST ?? process.env.VITE_SITE_DOMAIN ?? "otecnicodeinformatica.com.br")
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "");
const BASE = `https://${HOST}`;
const KEY = process.env.INDEXNOW_KEY ?? "f783ab585dfa9e6b017cb058009cccae";
const KEY_LOCATION = `${BASE}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";
const ARQUIVO = resolve(process.cwd(), "reports/indexnow/editorial-wave-status.json");

type Registro = {
  url: string;
  currentContentHash: string | null;
  lastSubmittedHash: string | null;
  lastSubmittedAt: string | null;
  lastResponse: string | null;
  deploySha: string | null;
  submissionState:
    | "NOT_CHANGED"
    | "PENDING_DEPLOY"
    | "READY"
    | "SUBMITTED"
    | "FAILED"
    | "RETRYABLE"
    | "FAILED_CONFIG";
  motivo?: string;
};

const alvos = EDITORIAL_WAVES.filter(
  (e) => (!wave || e.wave === wave) && (batch === undefined || e.batch === batch),
);
if (alvos.length === 0) {
  console.error(`[indexnow:editorial] nenhuma URL no registry para --wave=${wave} --batch=${batch}`);
  process.exit(1);
}

const anterior: { rotas: Record<string, Registro> } = existsSync(ARQUIVO)
  ? JSON.parse(readFileSync(ARQUIVO, "utf8"))
  : { rotas: {} };

// ── Render local (SSR real) para calcular o hash material.
let render: ((url: string) => Promise<string>) | null = null;
if (existsSync("dist/server/index.mjs")) {
  const mod: any = await import(pathToFileURL(resolve(process.cwd(), "dist/server/index.mjs")).href);
  const handler = mod.default ?? mod;
  const fetchFn = handler.fetch ?? handler;
  render = async (url) => {
    const res = await fetchFn(new Request(`http://localhost${url}`), {}, {
      waitUntil() {},
      passThroughOnException() {},
    });
    return res.text();
  };
}

const linhas: Registro[] = [];

for (const e of alvos) {
  const prev = anterior.rotas[e.url] ?? {
    url: e.url,
    currentContentHash: null,
    lastSubmittedHash: null,
    lastSubmittedAt: null,
    lastResponse: null,
    deploySha: null,
    submissionState: "PENDING_DEPLOY" as const,
  };

  if (!render) {
    linhas.push({
      ...prev,
      submissionState: "PENDING_DEPLOY",
      motivo: "dist/server/index.mjs ausente — build local exigido para calcular o hash",
    });
    continue;
  }

  const local = fingerprintDeHtml(await render(e.url));

  // Deploy gate: o mesmo hash precisa estar sendo SERVIDO publicamente.
  let remoto: string | null = null;
  let erroRemoto: string | null = null;
  try {
    const r = await fetch(`${BASE}${e.url}`, { headers: { "cache-control": "no-cache" } });
    remoto = r.ok ? fingerprintDeHtml(await r.text()) : null;
    if (!r.ok) erroRemoto = `HTTP ${r.status}`;
  } catch (err) {
    erroRemoto = String(err).slice(0, 160);
  }

  const deployConfirmado = remoto !== null && remoto === local;
  let estado: Registro["submissionState"];
  let motivo: string;

  if (prev.lastSubmittedHash === local) {
    estado = "NOT_CHANGED";
    motivo = "SKIP_ALREADY_SUBMITTED — hash idêntico ao último envio aceito";
  } else if (!deployConfirmado) {
    estado = "PENDING_DEPLOY";
    motivo = erroRemoto
      ? `deploy não confirmado (${erroRemoto})`
      : `deploy não confirmado (local ${local} ≠ público ${remoto})`;
  } else {
    estado = "READY";
    motivo = prev.lastSubmittedHash
      ? `CHANGED — ${prev.lastSubmittedHash} → ${local}`
      : "CHANGED — primeira submissão deste hash";
  }

  linhas.push({
    ...prev,
    url: e.url,
    currentContentHash: local,
    deploySha: remoto,
    submissionState: estado,
    motivo,
  });
}

const prontas = linhas.filter((l) => l.submissionState === "READY");

console.log(
  `[indexnow:editorial] lote ${wave ?? "*"}/${batch ?? "*"} · ${alvos.length} URL(s) · CHANGED=${prontas.length} UNCHANGED=${linhas.filter((l) => l.submissionState === "NOT_CHANGED").length} NOT_DEPLOYED=${linhas.filter((l) => l.submissionState === "PENDING_DEPLOY").length}${DRY ? " · DRY-RUN (nada enviado)" : ""}`,
);
for (const l of linhas) {
  console.log(
    `  · ${l.url}\n      hash=${l.currentContentHash ?? "—"} anterior=${l.lastSubmittedHash ?? "—"} público=${l.deploySha ?? "—"} → ${l.submissionState} (${l.motivo})`,
  );
}

if (!DRY && prontas.length > 0) {
  if (!KEY) {
    for (const l of prontas) {
      l.submissionState = "FAILED_CONFIG";
      l.motivo = "INDEXNOW_KEY ausente";
    }
  } else {
    const urlList = prontas.map((l) => `${BASE}${l.url}`);
    let status = 0;
    let erro: string | null = null;
    try {
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
      });
      status = r.status;
    } catch (err) {
      erro = String(err).slice(0, 200);
    }
    const agora = new Date().toISOString();
    for (const l of prontas) {
      if (status === 200 || status === 202) {
        // Aceito pelo endpoint ≠ indexado. Só aqui o hash é confirmado.
        l.submissionState = "SUBMITTED";
        l.lastSubmittedHash = l.currentContentHash;
        l.lastSubmittedAt = agora;
        l.lastResponse = `HTTP ${status}`;
        l.motivo = "aceito pelo endpoint (SUBMITTED ≠ INDEXED)";
      } else if (erro || status >= 500 || status === 429) {
        l.submissionState = "RETRYABLE";
        l.lastResponse = erro ?? `HTTP ${status}`;
        l.motivo = "falha transitória — lastSubmittedHash preservado";
      } else if (status === 403 || status === 422) {
        l.submissionState = "FAILED_CONFIG";
        l.lastResponse = `HTTP ${status}`;
        l.motivo = "erro de key/keyLocation";
      } else {
        l.submissionState = "FAILED";
        l.lastResponse = `HTTP ${status}`;
        l.motivo = "rejeitado pelo endpoint";
      }
    }
    console.log(`[indexnow:editorial] envio → HTTP ${status || erro} · ${urlList.length} URL(s)`);
  }
}

if (!DRY) {
  mkdirSync(resolve(process.cwd(), "reports/indexnow"), { recursive: true });
  const rotas = { ...anterior.rotas };
  for (const l of linhas) rotas[l.url] = l;
  writeFileSync(
    ARQUIVO,
    `${JSON.stringify({ geradoEm: new Date().toISOString(), host: HOST, rotas }, null, 2)}\n`,
  );
}

// ── Cópia pública sanitizada (painel /admin/editorial-ondas · Infra 3).
{
  const rotas = { ...anterior.rotas } as Record<string, Registro>;
  for (const l of linhas) rotas[l.url] = l;
  const porUrl = new Map(EDITORIAL_WAVES.map((e) => [e.url, e]));
  const publico = Object.values(rotas).map((r) => {
    const e = porUrl.get(r.url);
    return {
      url: r.url,
      wave: e?.wave ?? null,
      batch: e?.batch ?? null,
      lote: e ? batchKey(e) : null,
      owner: e?.ownerId ?? null,
      currentContentHash: r.currentContentHash,
      lastSubmittedHash: r.lastSubmittedHash,
      deploymentConfirmed: Boolean(r.deploySha && r.deploySha === r.currentContentHash),
      deploySha: r.deploySha,
      submissionState: r.submissionState,
      http: r.lastResponse,
      lastSubmittedAt: r.lastSubmittedAt,
      motivo: r.motivo ?? null,
      endpoint: "api.indexnow.org", // chave/keyLocation nunca são expostas
    };
  });
  writeFileSync(
    resolve(process.cwd(), "public/editorial-indexnow-status.json"),
    `${JSON.stringify({ geradoEm: new Date().toISOString(), host: HOST, rotas: publico }, null, 2)}\n`,
  );
}
