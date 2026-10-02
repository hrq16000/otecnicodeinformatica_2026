import { describe, expect, it } from "vitest";
import { canonicalFor, resolveLocal } from "../localIndexPolicy";
import {
  SERVICO_ARAUCARIA_PATHS,
  TODAS_PAGINAS_LOCAIS,
  servicoLocal,
} from "../servicoCuritibaBlocos";

const ARAUCARIA_PROMOVIDAS = [
  "/servicos/conserto-notebook/araucaria",
  "/servicos/conserto-pc/araucaria",
  "/servicos/conserto-tv/araucaria",
  "/servicos/conserto-celular/araucaria",
  "/servicos/upgrade-ssd/araucaria",
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

describe("fila 16–20 — serviço × Araucária", () => {
  it("declara somente as cinco páginas autorais desta rodada", () => {
    expect(SERVICO_ARAUCARIA_PATHS.sort()).toEqual([...ARAUCARIA_PROMOVIDAS].sort());
  });

  it("promove as cinco páginas para index, canonical self e sitemap", () => {
    for (const path of ARAUCARIA_PROMOVIDAS) {
      const d = resolveLocal(path);
      const pagina = TODAS_PAGINAS_LOCAIS.find((p) => p.path === path)!;
      expect(d.indexability).toBe("index");
      expect(canonicalFor(path)).toBe(path);
      expect(d.sitemap).toBe(true);
      expect(d.parent).toBe(pagina.parent);
    }
  });

  it("resolve a cidade correta no conteúdo autoral", () => {
    for (const path of ARAUCARIA_PROMOVIDAS) {
      const slug = path.split("/")[2];
      const pagina = servicoLocal(slug, "araucaria");
      expect(pagina).not.toBeNull();
      expect(pagina?.cidadeSlug).toBe("araucaria");
      expect(pagina?.cidadeNome).toBe("Araucária");
    }
  });

  it("mantém uma combinação de Araucária fora da fila na regra padrão", () => {
    const d = resolveLocal("/servicos/pc-gamer/araucaria");
    expect(d.indexability).toBe("noindex");
    expect(d.sitemap).toBe(false);
    expect(canonicalFor("/servicos/pc-gamer/araucaria")).toBe("/servicos/pc-gamer/araucaria");
  });

  it("mantém similaridade autoral entre as cinco abaixo do teto de segurança", () => {
    for (let i = 0; i < ARAUCARIA_PROMOVIDAS.length; i += 1) {
      for (let j = i + 1; j < ARAUCARIA_PROMOVIDAS.length; j += 1) {
        expect(
          jaccard(
            ngramas(corpo(ARAUCARIA_PROMOVIDAS[i])),
            ngramas(corpo(ARAUCARIA_PROMOVIDAS[j])),
          ),
        ).toBeLessThan(0.45);
      }
    }
  });

  it("aponta para o serviço-pai e para a landing de Araucária", () => {
    for (const path of ARAUCARIA_PROMOVIDAS) {
      const pagina = TODAS_PAGINAS_LOCAIS.find((p) => p.path === path)!;
      expect(pagina.interlinks).toContain(pagina.parent);
      expect(pagina.interlinks).toContain("/tecnico-informatica-araucaria");
    }
  });
});
