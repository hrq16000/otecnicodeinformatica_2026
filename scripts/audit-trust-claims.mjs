#!/usr/bin/env node
/**
 * AUDITORIA DE AFIRMAÇÕES DE CONFIANÇA (E-E-A-T)
 *
 * Diferente de `check-trust-claims.mjs` (que BLOQUEIA claims proibidos), este
 * script INVENTARIA e CLASSIFICA todas as afirmações de confiança do copy
 * público em quatro categorias:
 *
 *   COMPROVADA  → há evidência clara e verificável registrada no ledger
 *   INSTITUCIONAL → afirmação genérica/institucional, sem promessa específica
 *   CONDICIONAL → válida sob condição, que precisa estar explícita no texto
 *   REMOVIDA    → retirada do conteúdo até existir evidência
 *
 * Fonte da classificação: config/trust-claims-ledger.json (curado à mão).
 * Fail-closed: qualquer ocorrência sem entrada correspondente no ledger é
 * reportada como PENDENTE e, com --require, derruba o build.
 *
 * Uso:
 *   node scripts/audit-trust-claims.mjs            # relatório
 *   node scripts/audit-trust-claims.mjs --require  # falha se houver pendente
 *   node scripts/audit-trust-claims.mjs --json
 *   node scripts/audit-trust-claims.mjs --markdown docs/auditoria-trust-claims.md
 */
import { readFileSync, readdirSync, statSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join, relative, dirname } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const LEDGER_PATH = join(ROOT, "config", "trust-claims-ledger.json");

/** Famílias de afirmação auditadas. Cada uma descreve um risco de E-E-A-T. */
export const FAMILIAS = [
  {
    id: "volume-atendimentos",
    exigePrimeiraPessoa: true,
    titulo: "Volume de clientes, empresas ou atendimentos",
    risco: "Prova comercial sem registro verificável.",
    re: /(atendemos|j[áa]\s+(atendemos|instalamos|realizamos))[^.<»"'`]{0,40}\b(v[áa]rias?|dezenas|centenas|milhares|milhões)\b|\b(centenas|milhares)\s+de\s+(clientes|empresas|im[óo]veis|atendimentos)/i,
  },
  {
    id: "todos-os-portes",
    exigePrimeiraPessoa: true,
    titulo: "Cobertura empresarial irrestrita",
    risco: "“Todos os portes / todas as marcas / todos os modelos” não é sustentável.",
    re: /\b(de\s+todos\s+os\s+portes|todas\s+as\s+marcas|todos\s+os\s+modelos|qualquer\s+(marca|modelo|defeito|problema))\b/i,
  },
  {
    id: "experiencia-tempo",
    titulo: "Tempo de experiência / atuação",
    risco: "Anos de mercado divergentes entre páginas e sem fonte única.",
    re: /(\+\s?\d{1,2}\s*anos|mais\s+de\s+\d{1,2}\s+anos)\s+(de\s+)?(experi[êe]ncia|mercado|atua[çc][ãa]o|protegendo)|experi[êe]ncia\s+comprovada|desde\s+(19|20)\d{2}/i,
  },
  {
    id: "identificacao-tecnico",
    titulo: "Identificação do técnico",
    risco: "Compromisso operacional; precisa ser cumprido em todo atendimento.",
    re: /(t[ée]cnico|profissional)\s+identificad[oa]/i,
  },
  {
    id: "garantia",
    titulo: "Garantia",
    risco: "Prazo ou abrangência divergente da política comercial central.",
    re: /garantia\s+(em\s+todos|de\s+\d|real|por\s+escrito|conforme|do\s+servi[çc]o|de\s+1\s+ano)/i,
  },
  {
    id: "superlativo-mercado",
    exigePrimeiraPessoa: true,
    titulo: "Superlativo ou liderança de mercado",
    risco: "Comparação de mercado não auditável.",
    re: /(melhor\s+(de|em|da)\s|mais\s+recomendad|l[íi]der\s+(em|no|de)\s|n[ºo]\s*1\b|refer[êe]ncia\s+(nacional|em\s+curitiba)|incompar[áa]vel)/i,
  },
  {
    id: "depoimento",
    titulo: "Depoimento, avaliação ou estrela",
    risco: "Prova social só pode existir se for verificável e atribuível.",
    re: /(testimonial|depoimento|aggregateRating|ratingValue|reviewCount)\s*[:=]/,
  },
  {
    id: "estatistica",
    exigePrimeiraPessoa: true,
    titulo: "Estatística ou percentual atribuído",
    risco: "Percentual sem fonte primária citável.",
    re: /\b\d{1,3}\s?%\s+(a\s+menos|menos|das?|dos?|de\s+redu|de\s+satisfa|de\s+sucesso|menor)/i,
  },
  {
    id: "contrato-recorrente",
    exigePrimeiraPessoa: true,
    titulo: "Contrato, mensalidade ou desconto recorrente",
    risco: "Oferta comercial que o negócio não pratica de forma padronizada.",
    re: /(contratos?\s+de\s+manuten[çc][ãa]o\s+(mensa|preventiva)|mensalidade|desconto\s+progressivo|plano\s+mensal)/i,
  },
  {
    id: "prazo-prometido",
    titulo: "Prazo de atendimento prometido",
    risco: "Prazo fixo sem controle de agenda, trânsito e peça.",
    re: /\b(em\s+at[ée]\s+\d{1,2}\s*(h|horas|min|minutos)\b|no\s+mesmo\s+dia\b|atendimento\s+imediato|ainda\s+hoje)\b/i,
  },
];

/** Marcadores de 1ª pessoa: só auditamos o que o portal afirma sobre si. */
const PRIMEIRA_PESSOA =
  /\b(n[óo]s|nosso|nossa|nossos|nossas|atendemos|oferecemos|trabalhamos|fazemos|garantimos|entregamos|realizamos|instalamos|somos|temos|cobramos|nosso\s+time|nossa\s+equipe|o\s+t[ée]cnico\s+de\s+inform[áa]tica)\b/i;

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const valorDe = (n) => {
  const i = args.indexOf(n);
  return i >= 0 ? args[i + 1] : null;
};

const ledger = existsSync(LEDGER_PATH)
  ? JSON.parse(readFileSync(LEDGER_PATH, "utf8"))
  : { entradas: [] };

const CLASSES = ["COMPROVADA", "INSTITUCIONAL", "CONDICIONAL", "REMOVIDA"];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "__tests__") continue;
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(entry) && !/\.test\.tsx?$/.test(entry)) out.push(p);
  }
  return out;
}

/** Entrada do ledger que cobre esta ocorrência (família + escopo de arquivo). */
function classificar(familiaId, arquivo) {
  return (
    ledger.entradas.find(
      (e) =>
        e.familia === familiaId &&
        (e.arquivos || []).some((a) => arquivo === a || arquivo.startsWith(a)),
    ) || null
  );
}

const ocorrencias = [];
for (const file of walk(SRC)) {
  const rel = relative(ROOT, file);
  const linhas = readFileSync(file, "utf8").split("\n");
  linhas.forEach((linha, i) => {
    if (/^\s*(\/\/|\*|\/\*)/.test(linha)) return; // comentários de governança
    for (const fam of FAMILIAS) {
      const m = linha.match(fam.re);
      if (!m) continue;
      if (fam.exigePrimeiraPessoa && !PRIMEIRA_PESSOA.test(linha)) continue;
      const entrada = classificar(fam.id, rel);
      ocorrencias.push({
        familia: fam.id,
        familiaTitulo: fam.titulo,
        risco: fam.risco,
        arquivo: rel,
        linha: i + 1,
        trecho: linha.trim().slice(0, 180),
        classificacao: entrada?.classificacao ?? "PENDENTE",
        criterio: entrada?.criterio ?? null,
        evidencia: entrada?.evidencia ?? null,
        acao: entrada?.acao ?? null,
      });
    }
  });
}

const pendentes = ocorrencias.filter((o) => o.classificacao === "PENDENTE");
const invalidas = ledger.entradas.filter((e) => !CLASSES.includes(e.classificacao));
const porClasse = Object.fromEntries(
  [...CLASSES, "PENDENTE"].map((c) => [c, ocorrencias.filter((o) => o.classificacao === c).length]),
);

function markdown() {
  const l = [];
  l.push("# Auditoria de afirmações de confiança (E-E-A-T)");
  l.push("");
  l.push("> Gerado por `npm run audit:trust-claims`. Não editar à mão.");
  l.push("> A classificação vem de `config/trust-claims-ledger.json`.");
  l.push("");
  l.push(`Total de ocorrências: **${ocorrencias.length}**`);
  l.push("");
  l.push("| Classificação | Ocorrências |");
  l.push("| --- | --- |");
  for (const c of [...CLASSES, "PENDENTE"]) l.push(`| ${c} | ${porClasse[c]} |`);
  l.push("");
  for (const fam of FAMILIAS) {
    const itens = ocorrencias.filter((o) => o.familia === fam.id);
    if (!itens.length) continue;
    l.push(`## ${fam.titulo} (\`${fam.id}\`)`);
    l.push("");
    l.push(`Risco: ${fam.risco}`);
    l.push("");
    l.push("| Localização | Classificação | Critério / evidência | Trecho |");
    l.push("| --- | --- | --- | --- |");
    for (const o of itens) {
      const just = [o.criterio, o.evidencia].filter(Boolean).join(" — ") || "—";
      l.push(
        `| \`${o.arquivo}:${o.linha}\` | ${o.classificacao} | ${just.replace(/\|/g, "/")} | ${o.trecho
          .replace(/\|/g, "/")
          .slice(0, 110)} |`,
      );
    }
    l.push("");
  }
  return l.join("\n");
}

const destinoMd = valorDe("--markdown");
if (destinoMd) {
  mkdirSync(dirname(join(ROOT, destinoMd)), { recursive: true });
  writeFileSync(join(ROOT, destinoMd), `${markdown()}\n`);
}

if (flag("--json")) {
  console.log(JSON.stringify({ total: ocorrencias.length, porClasse, ocorrencias }, null, 2));
} else {
  console.log("\n── auditoria de afirmações de confiança ──");
  console.log(`  ocorrências: ${ocorrencias.length}`);
  for (const c of [...CLASSES, "PENDENTE"]) console.log(`  ${c.padEnd(14)} ${porClasse[c]}`);
  if (destinoMd) console.log(`  relatório: ${destinoMd}`);
  for (const e of invalidas) console.error(`  ✗ classificação inválida no ledger: ${e.id}`);
  if (pendentes.length) {
    console.error(`\n  ${pendentes.length} afirmação(ões) sem classificação no ledger:`);
    for (const o of pendentes.slice(0, 40)) {
      console.error(`    ${o.arquivo}:${o.linha}  [${o.familia}] ${o.trecho.slice(0, 120)}`);
    }
    if (pendentes.length > 40) console.error(`    … +${pendentes.length - 40}`);
    console.error(`\n  Classifique em config/trust-claims-ledger.json ou remova o claim.`);
  } else if (!invalidas.length) {
    console.log("\n✓ toda afirmação de confiança está classificada com critério e evidência.");
  }
}

const falhou = invalidas.length > 0 || (flag("--require") && pendentes.length > 0);
process.exit(falhou ? 1 : 0);
