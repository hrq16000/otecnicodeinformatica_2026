import { describe, expect, it } from "vitest";
import { ENRIQUECIMENTO_4C, INTENCOES_4C, OWNERS_4C } from "../enriquecimento4cLocal";

const textoDoOwner = (path: string): string => {
  const c = ENRIQUECIMENTO_4C[path];
  const partes: string[] = [c.respostaRapida ?? ""];
  if (c.tabelaExtra) {
    partes.push(c.tabelaExtra.titulo);
    for (const l of c.tabelaExtra.linhas) partes.push(l.sintoma, l.causa, l.verificar, l.acao ?? "");
  }
  for (const b of c.blocos ?? []) {
    partes.push(b.titulo, b.intro ?? "");
    for (const i of b.itens) partes.push(i.titulo, i.desc);
  }
  return partes.join(" ");
};

const tokens = (t: string) =>
  new Set(
    t
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 3),
  );

const jaccard = (a: Set<string>, b: Set<string>) => {
  let inter = 0;
  for (const w of a) if (b.has(w)) inter += 1;
  return inter / (a.size + b.size - inter);
};

describe("Rodada 4C — owners comerciais locais", () => {
  it("tem exatamente 6 owners, todos com intenção declarada", () => {
    expect(OWNERS_4C).toHaveLength(6);
    for (const path of OWNERS_4C) {
      expect(INTENCOES_4C[path]).toBeDefined();
      expect(INTENCOES_4C[path].primaria.length).toBeGreaterThan(20);
    }
  });

  it("não cria URL nova: todo owner é um caminho já existente do site", () => {
    for (const path of OWNERS_4C) {
      expect(path.startsWith("/")).toBe(true);
      expect(path.includes("//")).toBe(false);
    }
  });

  it("cada owner tem resposta rápida, tabela própria e ao menos dois blocos", () => {
    for (const path of OWNERS_4C) {
      const c = ENRIQUECIMENTO_4C[path];
      expect((c.respostaRapida ?? "").length).toBeGreaterThan(300);
      expect(c.tabelaExtra?.linhas.length ?? 0).toBeGreaterThanOrEqual(6);
      expect(c.blocos?.length ?? 0).toBeGreaterThanOrEqual(2);
    }
  });

  it("títulos de tabela e de bloco não se repetem entre owners (sem template)", () => {
    const titulos: string[] = [];
    for (const path of OWNERS_4C) {
      const c = ENRIQUECIMENTO_4C[path];
      if (c.tabelaExtra) titulos.push(c.tabelaExtra.titulo);
      for (const b of c.blocos ?? []) titulos.push(b.titulo);
    }
    expect(new Set(titulos).size).toBe(titulos.length);
  });

  it("gate anti-doorway: similaridade entre owners abaixo de 0,40", () => {
    const vetores = OWNERS_4C.map((p) => [p, tokens(textoDoOwner(p))] as const);
    for (let i = 0; i < vetores.length; i += 1) {
      for (let j = i + 1; j < vetores.length; j += 1) {
        const score = jaccard(vetores[i][1], vetores[j][1]);
        expect(
          score,
          `${vetores[i][0]} × ${vetores[j][0]} = ${score.toFixed(3)}`,
        ).toBeLessThan(0.4);
      }
    }
  });

  it("cada intenção evitada é encaminhada a um owner real e diferente", () => {
    for (const path of OWNERS_4C) {
      const intencao = INTENCOES_4C[path];
      expect(intencao.encaminharPara).toHaveLength(intencao.evitar.length);
      for (const destino of intencao.encaminharPara) {
        expect(destino).not.toBe(path);
        expect(OWNERS_4C).toContain(destino);
      }
    }
  });

  it("intenções primárias são únicas entre os owners", () => {
    const primarias = OWNERS_4C.map((p) => INTENCOES_4C[p].primaria);
    expect(new Set(primarias).size).toBe(primarias.length);
  });
});
