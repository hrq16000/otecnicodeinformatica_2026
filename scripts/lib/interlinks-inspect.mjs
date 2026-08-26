/**
 * Inspeção compartilhada de src/lib/interlinksGerados.ts.
 *
 * Usada pelo gate fail-fast (`check:interlinks-quality`) e pelo relatório de QA
 * (`report:interlinks-qa`). Lê apenas artefatos do repositório — sem rede.
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = process.cwd();
const ARQUIVO = resolve(ROOT, "src/lib/interlinksGerados.ts");
const DIRETORIO_BAIRROS = resolve(ROOT, "src/lib/bairrosDirectory.ts");

/** slug → nome oficial de exibição, extraído de bairrosDirectory.ts. */
export function nomesDeBairro() {
  const mapa = new Map();
  if (!existsSync(DIRETORIO_BAIRROS)) return mapa;
  const src = readFileSync(DIRETORIO_BAIRROS, "utf8");
  for (const m of src.matchAll(/slug:\s*"([^"]+)",\s*nome:\s*"([^"]+)",\s*cidade:\s*"([^"]+)"/g)) {
    mapa.set(m[1], { nome: m[2], cidade: m[3] });
  }
  return mapa;
}

/** Lê o objeto gerado sem executar TypeScript: o corpo é JSON puro. */
export function lerInterlinks() {
  const src = readFileSync(ARQUIVO, "utf8");
  const inicio = src.indexOf("= {", src.indexOf("INTERLINKS_GERADOS"));
  const fim = src.lastIndexOf("};");
  if (inicio === -1 || fim === -1) throw new Error("interlinksGerados.ts em formato inesperado");
  return JSON.parse(src.slice(inicio + 2, fim + 1));
}

const SLUG_CRU = /\b[a-z0-9]+(?:-[a-z0-9]+)+\b/;

/**
 * Analisa todos os links gerados e devolve erros, avisos e métricas.
 * Erro bloqueia o build; aviso apenas aparece no relatório.
 */
export function analisarInterlinks() {
  const dados = lerInterlinks();
  const bairros = nomesDeBairro();
  const erros = [];
  const avisos = [];
  const amostraBairros = [];
  const amostraServicos = [];

  let total = 0;
  const porContexto = { servico: 0, problema: 0, bairro: 0 };
  const paginas = Object.keys(dados);

  for (const [origem, links] of Object.entries(dados)) {
    const destinos = new Set();
    for (const link of links) {
      total++;
      porContexto[link.contexto] = (porContexto[link.contexto] ?? 0) + 1;

      if (!link.href?.startsWith("/")) {
        erros.push({ origem, regra: "HREF_INVALIDO", detalhe: link.href ?? "(vazio)" });
      }
      if (link.href === origem) erros.push({ origem, regra: "AUTOLINK", detalhe: link.href });
      if (destinos.has(link.href)) erros.push({ origem, regra: "DESTINO_DUPLICADO", detalhe: link.href });
      destinos.add(link.href);
      if (!link.anchor || link.anchor.trim().length < 8) {
        erros.push({ origem, regra: "ANCORA_VAZIA", detalhe: link.href });
        continue;
      }

      if (link.contexto === "bairro") {
        const slug = link.href.replace("/bairros/", "");
        const oficial = bairros.get(slug);
        if (!oficial) {
          erros.push({ origem, regra: "BAIRRO_DESCONHECIDO", detalhe: `${slug} não está em bairrosDirectory.ts` });
          continue;
        }
        if (!link.anchor.includes(oficial.nome)) {
          erros.push({
            origem,
            regra: "NOME_OFICIAL_AUSENTE",
            detalhe: `"${link.anchor}" não contém o nome oficial "${oficial.nome}"`,
          });
        }
        // Slug cru vazando na âncora (ex.: "atendimento em sitio-cercado").
        const semNome = link.anchor.replace(oficial.nome, "");
        if (semNome.includes(slug) || SLUG_CRU.test(semNome)) {
          erros.push({
            origem,
            regra: "SLUG_CRU",
            detalhe: `"${link.anchor}" expõe slug em vez do nome de exibição`,
          });
        }
        amostraBairros.push({ origem, href: link.href, anchor: link.anchor, nomeOficial: oficial.nome });
      } else {
        if (SLUG_CRU.test(link.anchor.toLowerCase().replace(/[^a-z0-9\s-]/g, ""))) {
          const suspeito = link.anchor.toLowerCase().match(SLUG_CRU)?.[0];
          // Palavras compostas legítimas ("placa-mãe") não têm forma de rota.
          if (suspeito && link.href.includes(suspeito)) {
            erros.push({ origem, regra: "SLUG_CRU", detalhe: `"${link.anchor}" repete o slug da rota ${link.href}` });
          }
        }
        if (link.contexto === "servico") {
          amostraServicos.push({ origem, href: link.href, anchor: link.anchor });
        }
      }
    }

    if (!links.some((l) => l.contexto === "servico")) {
      erros.push({ origem, regra: "SEM_SERVICO", detalhe: "página sem link de serviço" });
    }
    if (!links.some((l) => l.contexto === "bairro")) {
      avisos.push({ origem, regra: "SEM_BAIRRO", detalhe: "página sem link local" });
    }
  }

  // Âncora repetida em todo o site (canibalização de anchor text).
  const ancoras = new Map();
  for (const links of Object.values(dados)) {
    for (const l of links) ancoras.set(l.anchor, (ancoras.get(l.anchor) ?? 0) + 1);
  }
  for (const [anchor, n] of ancoras) {
    if (n > 1) avisos.push({ origem: "—", regra: "ANCORA_REPETIDA", detalhe: `"${anchor}" usada ${n}×` });
  }

  return {
    geradoEm: new Date().toISOString(),
    paginas: paginas.length,
    total,
    porContexto,
    cobertura: {
      comServico: paginas.filter((p) => dados[p].some((l) => l.contexto === "servico")).length,
      comProblema: paginas.filter((p) => dados[p].some((l) => l.contexto === "problema")).length,
      comBairro: paginas.filter((p) => dados[p].some((l) => l.contexto === "bairro")).length,
    },
    erros,
    avisos,
    amostraBairros,
    amostraServicos,
  };
}
