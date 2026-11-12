import { describe, expect, it } from "vitest";
import { canonicalFor, resolveLocal } from "../localIndexPolicy";
import {
  SERVICO_CAMPO_LARGO_PATHS,
  TODAS_PAGINAS_LOCAIS,
  servicoLocal,
} from "../servicoCuritibaBlocos";

const CAMPO_LARGO_PROMOVIDAS = [
  "/servicos/conserto-notebook/campo-largo",
  "/servicos/conserto-pc/campo-largo",
  "/servicos/conserto-tv/campo-largo",
  "/servicos/conserto-celular/campo-largo",
  "/servicos/upgrade-ssd/campo-largo",
  "/servicos/backup-recuperacao/campo-largo",
  "/servicos/suporte-empresas/campo-largo",
  "/servicos/atendimento-remoto/campo-largo",
  "/servicos/montagem-de-pc/campo-largo",
  "/servicos/pc-gamer/campo-largo",
  "/servicos/suporte-home-office/campo-largo",
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

describe("filas 30–40 — serviço × Campo Largo", () => {
  it("declara exatamente as onze páginas autorais aprovadas", () => {
    expect([...SERVICO_CAMPO_LARGO_PATHS].sort()).toEqual([...CAMPO_LARGO_PROMOVIDAS].sort());
  });

  it("promove as onze páginas para index, canonical self e sitemap", () => {
    for (const path of CAMPO_LARGO_PROMOVIDAS) {
      const d = resolveLocal(path);
      const pagina = TODAS_PAGINAS_LOCAIS.find((p) => p.path === path)!;
      expect(d.indexability).toBe("index");
      expect(canonicalFor(path)).toBe(path);
      expect(d.sitemap).toBe(true);
      expect(d.parent).toBe(pagina.parent);
    }
  });

  it("resolve Campo Largo no conteúdo autoral", () => {
    for (const path of CAMPO_LARGO_PROMOVIDAS) {
      const slug = path.split("/")[2];
      const pagina = servicoLocal(slug, "campo-largo");
      expect(pagina).not.toBeNull();
      expect(pagina?.cidadeSlug).toBe("campo-largo");
      expect(pagina?.cidadeNome).toBe("Campo Largo");
    }
  });

  it("mantém combinação de Campo Largo fora da fila na regra padrão canonicalized", () => {
    const path = "/servicos/suporte-tecnico-empresarial/campo-largo";
    const d = resolveLocal(path);
    expect(d.indexability).toBe("canonicalized");
    expect(d.sitemap).toBe(false);
    expect(canonicalFor(path)).toBe("/servicos/suporte-tecnico-empresarial");
  });

  it("mantém similaridade autoral de Campo Largo abaixo do teto", () => {
    for (let i = 0; i < CAMPO_LARGO_PROMOVIDAS.length; i += 1) {
      for (let j = i + 1; j < CAMPO_LARGO_PROMOVIDAS.length; j += 1) {
        expect(
          jaccard(
            ngramas(corpo(CAMPO_LARGO_PROMOVIDAS[i])),
            ngramas(corpo(CAMPO_LARGO_PROMOVIDAS[j])),
          ),
        ).toBeLessThan(0.45);
      }
    }
  });

  it("aponta para o serviço-pai e para a landing da cidade", () => {
    for (const path of CAMPO_LARGO_PROMOVIDAS) {
      const pagina = TODAS_PAGINAS_LOCAIS.find((p) => p.path === path)!;
      expect(pagina.interlinks).toContain(pagina.parent);
      expect(pagina.interlinks).toContain("/tecnico-informatica-campo-largo");
    }
  });
});
