import { describe, expect, it } from "vitest";
import { canonicalFor, resolveLocal } from "../localIndexPolicy";
import {
  SERVICO_CAMPO_LARGO_PATHS,
  TODAS_PAGINAS_LOCAIS,
  servicoLocal,
} from "../servicoCuritibaBlocos";

const CAMPO_LARGO_PROMOVIDAS = [
  "/servicos/conserto-notebook/campo-largo",
];

const normalizar = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const ngramas = (texto: string, n = 5) => {
  const tokens = normalizar(texto).split(" ").filter(Boolean);
  const set = new Set<string>();
  for (let i = 0; i + n <= tokens.length; i += 1) {
    set.add(tokens.slice(i, i + n).join(" "));
  }
  return set;
};

const jaccard = (a: Set<string>, b: Set<string>) => {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const item of a) if (b.has(item)) inter += 1;
  return inter / (a.size + b.size - inter);
};

const corpo = (path: string) => {
  const pagina = TODAS_PAGINAS_LOCAIS.find((p) => p.path === path);
  if (!pagina) throw new Error(`conteúdo ausente: ${path}`);
  return [
    ...(pagina.intro ?? []),
    ...pagina.blocos.flatMap((b) => b.paragrafos),
  ].join(" ");
};

describe("fila 30 — serviço × Campo Largo", () => {
  it("declara somente conserto de notebook nesta rodada", () => {
    expect(SERVICO_CAMPO_LARGO_PATHS).toEqual(CAMPO_LARGO_PROMOVIDAS);
  });

  it("promove a página para index, canonical self e sitemap", () => {
    const path = CAMPO_LARGO_PROMOVIDAS[0];
    const d = resolveLocal(path);
    const pagina = TODAS_PAGINAS_LOCAIS.find((p) => p.path === path)!;
    expect(d.indexability).toBe("index");
    expect(canonicalFor(path)).toBe(path);
    expect(d.sitemap).toBe(true);
    expect(d.parent).toBe(pagina.parent);
  });

  it("resolve Campo Largo no conteúdo autoral", () => {
    const pagina = servicoLocal("conserto-notebook", "campo-largo");
    expect(pagina).not.toBeNull();
    expect(pagina?.cidadeSlug).toBe("campo-largo");
    expect(pagina?.cidadeNome).toBe("Campo Largo");
  });

  it("mantém outra combinação de Campo Largo na regra padrão canonicalized", () => {
    const path = "/servicos/conserto-pc/campo-largo";
    const d = resolveLocal(path);
    expect(d.indexability).toBe("canonicalized");
    expect(d.sitemap).toBe(false);
    expect(canonicalFor(path)).toBe("/servicos/conserto-pc");
  });

  it("mantém conserto de notebook de Campo Largo distinto das outras cidades", () => {
    const alvo = CAMPO_LARGO_PROMOVIDAS[0];
    for (const outra of [
      "/servicos/conserto-notebook/curitiba",
      "/servicos/conserto-notebook/sao-jose-dos-pinhais",
      "/servicos/conserto-notebook/araucaria",
    ]) {
      expect(jaccard(ngramas(corpo(alvo)), ngramas(corpo(outra)))).toBeLessThan(0.45);
    }
  });

  it("aponta para o serviço-pai e para a landing da cidade", () => {
    const pagina = TODAS_PAGINAS_LOCAIS.find((p) => p.path === CAMPO_LARGO_PROMOVIDAS[0])!;
    expect(pagina.interlinks).toContain(pagina.parent);
    expect(pagina.interlinks).toContain("/tecnico-informatica-campo-largo");
  });
});
