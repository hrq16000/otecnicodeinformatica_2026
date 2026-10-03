import { describe, expect, it } from "vitest";
import { canonicalFor, resolveLocal } from "../localIndexPolicy";
import {
  SERVICO_PINHAIS_PATHS,
  TODAS_PAGINAS_LOCAIS,
  servicoLocal,
} from "../servicoCuritibaBlocos";

const PINHAIS_PROMOVIDAS = [
  "/servicos/conserto-tv/pinhais",
  "/servicos/suporte-tecnico-empresarial/pinhais",
  "/servicos/backup-recuperacao/pinhais",
  "/servicos/pc-gamer/pinhais",
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

describe("micro-lote GSC Pinhais 1–4", () => {
  it("declara exatamente as quatro páginas autorais aprovadas", () => {
    expect([...SERVICO_PINHAIS_PATHS].sort()).toEqual([...PINHAIS_PROMOVIDAS].sort());
  });

  it("mantém piso editorial de 550 palavras autorais", () => {
    for (const path of PINHAIS_PROMOVIDAS) {
      const palavras = normalizar(corpo(path)).split(" ").filter(Boolean).length;
      expect(palavras).toBeGreaterThanOrEqual(550);
    }
  });

  it("promove as quatro páginas para index, canonical self e sitemap", () => {
    for (const path of PINHAIS_PROMOVIDAS) {
      const d = resolveLocal(path);
      const pagina = TODAS_PAGINAS_LOCAIS.find((p) => p.path === path)!;
      expect(d.indexability).toBe("index");
      expect(canonicalFor(path)).toBe(path);
      expect(d.sitemap).toBe(true);
      expect(d.parent).toBe(pagina.parent);
    }
  });

  it("resolve Pinhais no conteúdo autoral", () => {
    for (const path of PINHAIS_PROMOVIDAS) {
      const slug = path.split("/")[2];
      const pagina = servicoLocal(slug, "pinhais");
      expect(pagina).not.toBeNull();
      expect(pagina?.cidadeSlug).toBe("pinhais");
      expect(pagina?.cidadeNome).toBe("Pinhais");
    }
  });

  it("mantém combinação de Pinhais fora do micro-lote noindex e fora do sitemap", () => {
    const path = "/servicos/conserto-celular/pinhais";
    const d = resolveLocal(path);
    expect(d.indexability).toBe("noindex");
    expect(d.sitemap).toBe(false);
    expect(canonicalFor(path)).toBe(path);
  });

  it("mantém cada nova página abaixo do teto de similaridade contra todo o corpus", () => {
    for (const path of PINHAIS_PROMOVIDAS) {
      for (const outra of TODAS_PAGINAS_LOCAIS) {
        if (outra.path === path) continue;
        expect(jaccard(ngramas(corpo(path)), ngramas(corpo(outra.path)))).toBeLessThan(0.45);
      }
    }
  });

  it("aponta para o serviço-pai e para a landing de Pinhais", () => {
    for (const path of PINHAIS_PROMOVIDAS) {
      const pagina = TODAS_PAGINAS_LOCAIS.find((p) => p.path === path)!;
      expect(pagina.interlinks).toContain(pagina.parent);
      expect(pagina.interlinks).toContain("/tecnico-informatica-pinhais");
    }
  });
});
