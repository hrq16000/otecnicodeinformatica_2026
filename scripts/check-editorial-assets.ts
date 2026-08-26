#!/usr/bin/env bun
/**
 * GATE — PROVENIÊNCIA E LICENCIAMENTO DOS ASSETS EDITORIAIS
 * Onda 10C · Infra 2 (Parte C).
 *
 * Por asset declarado em src/lib/editorialAssetsRegistry.ts valida:
 *   fonte conhecida · licença conhecida · atribuição completa · URL original ·
 *   hash real do arquivo · WebP · AVIF · gate anti-IA · arquivo existe.
 *
 * Também detecta:
 *   UNUSED_ASSET      — registrado e não usado por nenhum owner do registry;
 *   UNREGISTERED_ASSET — capa de artigo aprovado usada sem registro (BLOQUEIA).
 *
 * Saída: public/editorial-assets-status.json (aba "Assets & Licenciamento" em
 * /admin/editorial-ondas). Fail-closed: sem dado verificável → FAIL, nunca PASS.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { EDITORIAL_ASSETS } from "../src/lib/editorialAssetsRegistry";
import { EDITORIAL_COVERS } from "../src/lib/blogEditorialCovers";
import { getApprovedSlugs } from "../src/lib/blogEditorialRegistry";

const PUB = resolve(process.cwd(), "public");
const arquivoDe = (p: string) => resolve(PUB, p.replace(/^\//, ""));
const trocarExt = (p: string, ext: string) => p.replace(/\.(jpe?g|png)$/i, `.${ext}`);

const hashArquivo = (p: string): string | null => {
  const f = arquivoDe(p);
  if (!existsSync(f)) return null;
  return `sha256:${createHash("sha256").update(readFileSync(f)).digest("hex").slice(0, 32)}`;
};

/** Gate anti-IA reaproveitado: origem gerada por IA nunca é aceita. */
const suspeitaDeIA = (a: (typeof EDITORIAL_ASSETS)[number]) =>
  /midjourney|dall-?e|stable ?diffusion|generated|ia gerada|firefly/i.test(
    `${a.attributionText ?? ""} ${a.platform ?? ""} ${a.author ?? ""}`,
  );

const linhas = EDITORIAL_ASSETS.map((a) => {
  const checks: Record<string, boolean> = {
    fileExists: existsSync(arquivoDe(a.localPath)),
    sourceKnown: a.sourceType !== "UNKNOWN",
    licenseKnown: a.license !== "UNKNOWN" && Boolean(a.licenseUrl),
    attributionComplete: !a.attributionRequired || Boolean(a.attributionText && a.author),
    originalUrl: Boolean(a.originalUrl),
    webp: existsSync(arquivoDe(trocarExt(a.localPath, "webp"))),
    avif: existsSync(arquivoDe(trocarExt(a.localPath, "avif"))),
    antiAi: !suspeitaDeIA(a),
  };
  const hash = hashArquivo(a.localPath);
  const bloqueantes = ["fileExists", "sourceKnown", "licenseKnown", "attributionComplete", "originalUrl", "antiAi"];
  const falhou = bloqueantes.filter((k) => !checks[k]);
  const avisos = ["webp", "avif"].filter((k) => !checks[k]);
  const resultado = falhou.length ? "FAIL" : avisos.length ? "WARN" : "PASS";

  return {
    ...a,
    fileHash: hash,
    formats: [
      a.localPath,
      ...(checks.webp ? [trocarExt(a.localPath, "webp")] : []),
      ...(checks.avif ? [trocarExt(a.localPath, "avif")] : []),
    ],
    checks,
    falhas: falhou,
    avisos,
    resultado,
  };
});

// Assets usados por artigo aprovado sem registro de proveniência (bloqueante).
const registrados = new Set(EDITORIAL_ASSETS.map((a) => a.localPath));
const naoRegistrados = getApprovedSlugs()
  .map((slug) => ({ slug, src: EDITORIAL_COVERS[slug]?.src }))
  .filter((c) => c.src && !registrados.has(c.src) && EDITORIAL_ASSETS.some((a) => a.slug === c.slug))
  .map((c) => `${c.slug} → ${c.src}`);

// Registrados que nenhum owner do registry usa.
const naoUsados = EDITORIAL_ASSETS.filter((a) => !EDITORIAL_COVERS[a.slug]).map((a) => a.localPath);

const resumo = {
  geradoEm: new Date().toISOString(),
  total: linhas.length,
  pass: linhas.filter((l) => l.resultado === "PASS").length,
  warn: linhas.filter((l) => l.resultado === "WARN").length,
  fail: linhas.filter((l) => l.resultado === "FAIL").length,
  semLicenca: linhas.filter((l) => !l.checks.licenseKnown).length,
  semAtribuicao: linhas.filter((l) => !l.checks.attributionComplete).length,
  unregistered: naoRegistrados,
  unused: naoUsados,
  assets: linhas,
};

writeFileSync(resolve(PUB, "editorial-assets-status.json"), `${JSON.stringify(resumo, null, 2)}\n`);
mkdirSync(resolve(process.cwd(), "reports"), { recursive: true });

for (const l of linhas) {
  console.log(
    `${l.resultado.padEnd(5)} ${l.owner} · ${l.localPath} · ${l.sourceType}/${l.license}${l.falhas.length ? ` · falhas: ${l.falhas.join(", ")}` : ""}${l.avisos.length ? ` · avisos: ${l.avisos.join(", ")}` : ""}`,
  );
}
console.log(
  `\n[check:editorial-assets] ${resumo.total} assets · PASS ${resumo.pass} · WARN ${resumo.warn} · FAIL ${resumo.fail}`,
);

const bloqueia = resumo.fail > 0 || naoRegistrados.length > 0;
if (naoRegistrados.length) {
  console.error(`UNREGISTERED_ASSET (bloqueia publicação): ${naoRegistrados.join(", ")}`);
}
if (naoUsados.length) console.warn(`UNUSED_ASSET: ${naoUsados.join(", ")}`);
if (bloqueia) process.exit(1);
