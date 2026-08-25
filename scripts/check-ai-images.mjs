#!/usr/bin/env node
/**
 * GATE — NENHUMA IMAGEM GERADA POR IA E NENHUM PLACEHOLDER PUBLICADO.
 *
 * Regra absoluta do projeto: fotografias precisam ser reais e licenciadas.
 * Este gate varre TODAS as imagens entregues (public/ e src/assets/) e falha
 * quando encontra:
 *
 *   1. nome de arquivo com assinatura de IA ou de placeholder
 *      (midjourney, dall-e, stable-diffusion, sdxl, firefly, ia-, ai-gen,
 *       placeholder, lorem, mock, dummy…);
 *   2. metadados embutidos com assinatura de IA (EXIF/XMP/PNG tEXt:
 *      "Software: Midjourney", "parameters" do Stable Diffusion, credenciais
 *      C2PA de conteúdo gerado — `c2pa.created` + `digitalSourceType`
 *      `trainedAlgorithmicMedia`);
 *   3. arquivo pequeno demais para ser fotografia real (< 8 KB), o sintoma
 *      clássico de placeholder deixado para trás.
 *
 * Também prepara a conversão responsiva: reporta (sem bloquear) cada foto
 * raster sem par `.webp`/`.avif` ao lado, em reports/ai-images.json.
 *
 * Uso: node scripts/check-ai-images.mjs [--json]
 */
import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, extname, basename } from "node:path";

const DIRS = ["public", "src/assets"];
const RASTER = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const MIN_BYTES = 8_000;

/** Assinaturas de IA/placeholder no nome do arquivo. */
const NOME_PROIBIDO =
  /(midjourney|dall[-_ ]?e|stable[-_ ]?diffusion|sdxl|firefly|leonardo[-_ ]?ai|ideogram|flux[-_ ]?dev|ai[-_ ]?gen|ai[-_ ]?generated|generated[-_ ]?ai|\bia-gerad|placeholder|lorem|mockup?[-_]|dummy)/i;

/** Assinaturas de IA dentro dos metadados binários. */
const META_PROIBIDA = [
  /Midjourney/i,
  /DALL[·\-\u00b7 ]?E/i,
  /Stable ?Diffusion/i,
  /NovelAI/i,
  /Adobe Firefly/i,
  /Ideogram/i,
  /trainedAlgorithmicMedia/i,
  /compositeWithTrainedAlgorithmicMedia/i,
  /openai\.com\/dall/i,
];

/** Ícones, favicons e derivadas responsivas não são fotografia: fora da regra de tamanho. */
const NAO_E_FOTO = /(favicon|icon|logo|sprite|manifest|og-|placeholder\.svg)/i;
const DERIVADA_RESPONSIVA = /-\d{2,4}\.(webp|avif|jpg|png)$/i;

/**
 * BASELINE (dívida herdada): arquivos que JÁ estavam publicados com assinatura
 * de IA quando o gate foi criado. Estão registrados para substituição por
 * fotografia real — o gate falha para QUALQUER arquivo novo fora desta lista.
 */
const BASELINE = new Set(
  existsSync("config/ai-images-baseline.json")
    ? JSON.parse(readFileSync("config/ai-images-baseline.json", "utf8")).legado ?? []
    : [],
);

function walk(dir) {
  if (!existsSync(dir)) return [];
  let out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const s = statSync(p);
    if (s.isDirectory()) out = out.concat(walk(p));
    else if (RASTER.has(extname(p).toLowerCase())) out.push(p);
  }
  return out;
}

/** Lê apenas os primeiros/últimos blocos: metadados vivem nas bordas do arquivo. */
function trechosDeMetadados(file, size) {
  const buf = readFileSync(file);
  const head = buf.subarray(0, Math.min(size, 96_000)).toString("latin1");
  const tail = buf.subarray(Math.max(0, size - 32_000)).toString("latin1");
  return head + "\n" + tail;
}

const falhas = [];
const legado = [];
const semVariante = [];
let analisadas = 0;

const todos = DIRS.flatMap(walk);
const porBase = new Set(todos.map((f) => f.replace(/\.[a-z0-9]+$/i, "") + extname(f).toLowerCase()));

for (const file of todos) {
  analisadas += 1;
  const size = statSync(file).size;
  const ext = extname(file).toLowerCase();

  const registrar = (motivo) => {
    if (BASELINE.has(file)) legado.push(`${file} — ${motivo}`);
    else falhas.push(`${file} — ${motivo}`);
  };

  if (NOME_PROIBIDO.test(basename(file))) {
    registrar("nome com assinatura de IA/placeholder");
    continue;
  }
  const ehFoto = !NAO_E_FOTO.test(file) && !DERIVADA_RESPONSIVA.test(file);
  if (ehFoto && size < MIN_BYTES) {
    registrar(`${size} bytes: pequeno demais para fotografia real (mín. ${MIN_BYTES})`);
    continue;
  }
  const meta = trechosDeMetadados(file, size);
  const hit = META_PROIBIDA.find((re) => re.test(meta));
  if (hit) {
    registrar(`metadado com assinatura de IA (${hit.source})`);
    continue;
  }

  // Preparação responsiva (não bloqueia): variantes modernas ausentes.
  if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
    const base = file.slice(0, -ext.length);
    const faltando = [".webp", ".avif"].filter((v) => !porBase.has(base + v));
    if (faltando.length) semVariante.push({ file, faltando });
  }
}

mkdirSync("reports", { recursive: true });
writeFileSync(
  "reports/ai-images.json",
  JSON.stringify(
    {
      geradoEm: new Date().toISOString(),
      analisadas,
      violacoes: falhas,
      legadoConhecido: legado,
      responsivo: { semVariante: semVariante.length, itens: semVariante.slice(0, 200) },
    },
    null,
    2,
  ),
);

if (falhas.length > 0) {
  console.error("✖ check:ai-images — imagem gerada por IA ou placeholder detectada:");
  for (const f of falhas) console.error(" - " + f);
  console.error("\nRegra do projeto: apenas fotografia real com licença compatível.");
  process.exit(1);
}

if (legado.length) {
  console.warn(
    `[check:ai-images] ${legado.length} arquivo(s) de IA HERDADOS aguardando substituição ` +
      "por fotografia real (config/ai-images-baseline.json).",
  );
}

console.log(
  `✔ check:ai-images — ${analisadas} imagem(ns) sem assinatura de IA/placeholder. ` +
    `${semVariante.length} sem variante WebP/AVIF (relatório em reports/ai-images.json).`,
);
