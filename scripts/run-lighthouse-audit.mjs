#!/usr/bin/env node
/**
 * Lighthouse direto (pacote atualizado e auditado) no lugar do antigo
 * @lhci/cli e seu grafo Puppeteer vulneravel. Mantem as mesmas URLs,
 * emulacao, numero de execucoes e assertions dos lighthouserc*.json.
 * Modo --smoke so exercita uma rota/execucao para validar a ferramenta.
 */
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { spawn } from "node:child_process";
import { existsSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const configArg = process.argv.find(a => a.startsWith("--config="));
if (!configArg) throw new Error("Informe --config=lighthouserc.json");
const smoke = process.argv.includes("--smoke");
const configFile = configArg.slice("--config=".length);
const config = JSON.parse(readFileSync(configFile, "utf8")).ci;
const collect = config?.collect;
if (!collect?.url?.length || !collect.startServerCommand)
  throw new Error("Lighthouse: URLs e startServerCommand obrigatorios");
const urls = smoke ? collect.url.slice(0, 1) : collect.url;
const runs = smoke ? 1 : collect.numberOfRuns ?? 1;
const settings = collect.settings ?? {};
const assertions = config.assert?.assertions ?? {};
const output = config.upload?.outputDir ?? ".lighthouseci";
mkdirSync(output, { recursive: true });

const server = spawn(collect.startServerCommand, {
  shell: true,
  detached: process.platform !== "win32",
  stdio: "inherit",
  env: { ...process.env },
});
let chrome;
let stopped = false;
function stop() {
  if (stopped) return;
  stopped = true;
  if (chrome) void chrome.kill().catch(() => {});
  try {
    if (process.platform !== "win32") process.kill(-server.pid, "SIGTERM");
    else server.kill("SIGTERM");
  } catch { /* process already exited */ }
}
process.once("SIGINT", () => { stop(); process.exit(130); });
process.once("SIGTERM", () => { stop(); process.exit(143); });
process.once("exit", stop);
async function waitReady() {
  const deadline = Date.now() + 120000;
  while (Date.now() < deadline) {
    if (server.exitCode != null) throw new Error("Servidor de audit saiu antes da prontidao");
    try {
      const res = await fetch(urls[0], { signal: AbortSignal.timeout(2500) });
      if (res.status < 500) return;
    } catch { /* server starting */ }
    await new Promise(r => setTimeout(r, 800));
  }
  throw new Error("Lighthouse: servidor nao ficou pronto em 120s");
}
const problems = [];
const metric = (r, key) => key.startsWith("categories:")
  ? r.categories?.[key.slice("categories:".length)]?.score
  : (r.audits?.[key]?.numericValue ?? r.audits?.[key]?.score);
function assess(r, url, iteration) {
  for (const [name, assertion] of Object.entries(assertions)) {
    const [severity, rule] = Array.isArray(assertion) ? assertion : [assertion, {}];
    if (severity === "off") continue;
    const val = metric(r, name);
    const issue = val == null ? "auditoria ausente"
      : (rule.minScore != null && val < rule.minScore)
        ? String(val) + " < " + rule.minScore
      : (rule.maxNumericValue != null && val > rule.maxNumericValue)
        ? String(Math.round(val)) + " > " + rule.maxNumericValue
      : null;
    if (!issue) continue;
    const entry = url + " run=" + iteration + " " + name + ": " + issue;
    if (severity === "error") problems.push(entry);
    else console.warn("[Lighthouse warn]", entry);
  }
}
try {
  await waitReady();
  chrome = await launch({
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage"],
    logLevel: "error",
    ...(process.env.CHROME_PATH ? { chromePath: process.env.CHROME_PATH } : {}),
  });
  let seq = 0;
  for (const url of urls) {
    for (let attempt = 1; attempt <= runs; attempt++) {
      const result = await lighthouse(url, {
        port: chrome.port,
        output: "json",
        logLevel: "error",
        formFactor: settings.formFactor ?? (settings.preset === "desktop" ? "desktop" : "mobile"),
        ...(settings.preset === "desktop" ? { preset: "desktop" } : {}),
        ...(settings.screenEmulation ? { screenEmulation: settings.screenEmulation } : {}),
        ...(settings.throttling ? { throttling: settings.throttling } : {}),
      });
      if (!result?.lhr?.audits) throw new Error("Lighthouse nao retornou relatorio para " + url);
      const filename = path.join(output, "lhr-" + Date.now() + "-" + seq++ + ".json");
      writeFileSync(filename, JSON.stringify(result.lhr));
      console.log("[Lighthouse]", url, attempt + "/" + runs,
        "perf=" + (result.lhr.categories?.performance?.score ?? "n/a"), filename);
      if (!smoke) assess(result.lhr, url, attempt);
    }
  }
  if (problems.length) throw new Error("Lighthouse: " + problems.length +
    " assertions bloqueantes:\n" + problems.slice(0, 60).join("\n"));
  console.log("[Lighthouse] validacao concluida: " + urls.length + " URL(s), " +
    runs + " execucao(oes) cada.");
} finally {
  stop();
}
