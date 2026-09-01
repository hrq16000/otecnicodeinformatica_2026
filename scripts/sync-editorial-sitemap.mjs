/**
 * SINCRONIZAÇÃO AUTOMÁTICA DO SITEMAP EDITORIAL
 * ============================================================================
 * Fonte da verdade: `APPROVED_EDITORIAL_CONTENT` em
 * `src/lib/blogEditorialRegistry.ts`.
 *
 * Todo slug aprovado no registro precisa existir em
 * `scripts/lib/editorial-wave.mjs` (consumido por `generate-sitemaps.mjs`).
 * Este script fecha essa lacuna sem edição manual: quando um lote é aprovado,
 * ele acrescenta a entrada correspondente na onda editorial.
 *
 * Fail-closed:
 *   • capa obrigatória em `public/blog/<slug>.jpg` (ou .png/.webp) — sem capa
 *     real o slug NÃO entra no sitemap e o script falha;
 *   • pilar/apoio derivados por heurística de tema e sempre apontando para
 *     rotas existentes na própria onda ou nos serviços canônicos;
 *   • uso `--check` no CI: não escreve, apenas falha se houver divergência.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { EDITORIAL_WAVE_SLUGS } from "./lib/editorial-wave.mjs";

const CHECK_ONLY = process.argv.includes("--check");
const WAVE_FILE = resolve("scripts/lib/editorial-wave.mjs");
const REGISTRY = resolve("src/lib/blogEditorialRegistry.ts");

/** Heurística de pilar por tema do slug (primeiro match vence). */
const PILARES = [
  [/virus|malware|ransom/, "/servicos/remocao-de-virus", "Remoção de vírus e malware"],
  [/ssd|hd |hd-|nvme|memoria|ram/, "/servicos/upgrade-ssd-ram", "Upgrade de SSD e memória"],
  [/wifi|wi-fi|rede|roteador|internet/, "/servicos/redes-e-wifi", "Redes e Wi-Fi"],
  [/dados|backup|arquivo|recupera/, "/servicos/recuperacao-de-dados", "Recuperação de dados"],
  [/notebook|bateria|teclado|tela/, "/servicos/manutencao-de-notebook", "Manutenção de notebook"],
  [/format|windows|instala|update|boot|bios|uefi|bsod|erro/, "/diagnostico-tecnico", "Diagnóstico técnico"],
];
const PILAR_PADRAO = ["/servicos/manutencao-de-computador", "Manutenção de computador"];

function pilarPara(slug) {
  for (const [re, path, label] of PILARES) if (re.test(slug)) return [path, label];
  return PILAR_PADRAO;
}

function capaPara(slug) {
  for (const ext of ["jpg", "webp", "png"]) {
    if (existsSync(resolve(`public/blog/${slug}.${ext}`))) return `/blog/${slug}.${ext}`;
  }
  return null;
}

function slugsAprovados() {
  const src = readFileSync(REGISTRY, "utf8");
  const aprovados = new Set();
  // Cada aprovação válida declara slug + status: "approved" no mesmo bloco.
  const blocos = src.split(/\{\s*\n/);
  for (const bloco of blocos) {
    const slug = bloco.match(/slug:\s*"([a-z0-9-]+)"/)?.[1];
    if (!slug) continue;
    if (/status:\s*"approved"/.test(bloco)) aprovados.add(slug);
  }
  // A primeira onda usa FIRST_WAVE_SLUGS mapeado para status approved.
  const first = src.match(/FIRST_WAVE_SLUGS\s*(?::[^=]+)?=\s*\[([\s\S]*?)\]/)?.[1] ?? "";
  for (const m of first.matchAll(/"([a-z0-9-]+)"/g)) aprovados.add(m[1]);
  return [...aprovados];
}

const aprovados = slugsAprovados();
const faltantes = aprovados.filter((s) => !EDITORIAL_WAVE_SLUGS.includes(s));

if (faltantes.length === 0) {
  console.log(`sitemap editorial: em dia (${EDITORIAL_WAVE_SLUGS.length} artigos indexáveis)`);
  process.exit(0);
}

if (CHECK_ONLY) {
  console.error(`sitemap editorial: ${faltantes.length} slug(s) aprovados fora da onda: ${faltantes.join(", ")}`);
  console.error("Rode `npm run sync:editorial-sitemap` para sincronizar.");
  process.exit(1);
}

const semCapa = faltantes.filter((s) => !capaPara(s));
const entram = faltantes.filter((s) => capaPara(s));
const hoje = new Date().toISOString().slice(0, 10);

if (entram.length > 0) {
  const fonte = readFileSync(WAVE_FILE, "utf8");
  const marcador = "];\n\n\nexport const EDITORIAL_WAVE_SLUGS";
  const alvo = fonte.includes(marcador) ? marcador : "];\n\nexport const EDITORIAL_WAVE_SLUGS";
  if (!fonte.includes(alvo)) {
    console.error("sitemap editorial: não encontrei o fim de EDITORIAL_WAVE para sincronizar.");
    process.exit(1);
  }
  const blocos = entram
    .map((slug, i) => {
      const [pilar, pilarLabel] = pilarPara(slug);
      const apoioSlug = entram[(i + 1) % entram.length] === slug ? EDITORIAL_WAVE_SLUGS[0] : entram[(i + 1) % entram.length];
      return `  {
    slug: ${JSON.stringify(slug)},
    approvedAt: ${JSON.stringify(hoje)},
    pilar: ${JSON.stringify(pilar)},
    pilarLabel: ${JSON.stringify(pilarLabel)},
    apoio: ${JSON.stringify(`/blog/${apoioSlug}`)},
    apoioLabel: "Conteúdo relacionado",
    cover: ${JSON.stringify(capaPara(slug))},
  },\n`;
    })
    .join("");
  writeFileSync(WAVE_FILE, fonte.replace(alvo, `${blocos}${alvo}`));
  console.log(`sitemap editorial: ${entram.length} slug(s) sincronizados — ${entram.join(", ")}`);
}

if (semCapa.length > 0) {
  console.error(`sitemap editorial: ${semCapa.length} slug(s) aprovados SEM capa real em public/blog: ${semCapa.join(", ")}`);
  console.error("Fail-closed: publique a imagem licenciada antes de indexar.");
  process.exit(1);
}
