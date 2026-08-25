import { describe, expect, it } from "vitest";
import {
  ENRIQUECIMENTO_4D,
  FAQ_4D,
  INTENCOES_4D,
  OWNERS_4D,
  mensagemWhatsapp4d,
  enriquecimento4d,
} from "../enriquecimento4dB2b";

const textoDoOwner = (path: string): string => {
  const c = ENRIQUECIMENTO_4D[path as (typeof OWNERS_4D)[number]];
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

describe("Rodada 4D — owners B2B", () => {
  it("tem exatamente 6 owners, todos com intenção primária declarada", () => {
    expect(OWNERS_4D).toHaveLength(6);
    for (const path of OWNERS_4D) {
      expect(INTENCOES_4D[path].primaria.length).toBeGreaterThan(40);
    }
  });

  it("não cria URL nova: todo owner é caminho já publicado", () => {
    for (const path of OWNERS_4D) {
      expect(path.startsWith("/")).toBe(true);
      expect(path.includes("//")).toBe(false);
    }
  });

  it("cada owner tem resposta rápida, tabela própria e ao menos dois blocos", () => {
    for (const path of OWNERS_4D) {
      const c = ENRIQUECIMENTO_4D[path];
      expect((c.respostaRapida ?? "").length).toBeGreaterThan(400);
      expect(c.tabelaExtra?.linhas.length ?? 0).toBeGreaterThanOrEqual(6);
      expect(c.blocos?.length ?? 0).toBeGreaterThanOrEqual(2);
    }
  });

  it("títulos de tabela e de bloco não se repetem entre owners", () => {
    const titulos: string[] = [];
    for (const path of OWNERS_4D) {
      const c = ENRIQUECIMENTO_4D[path];
      if (c.tabelaExtra) titulos.push(c.tabelaExtra.titulo);
      for (const b of c.blocos ?? []) titulos.push(b.titulo);
    }
    expect(new Set(titulos).size).toBe(titulos.length);
  });

  it("gate anti-doorway: similaridade entre owners abaixo de 0,40", () => {
    const vetores = OWNERS_4D.map((p) => [p, tokens(textoDoOwner(p))] as const);
    for (let i = 0; i < vetores.length; i += 1) {
      for (let j = i + 1; j < vetores.length; j += 1) {
        const score = jaccard(vetores[i][1], vetores[j][1]);
        expect(score, `${vetores[i][0]} × ${vetores[j][0]} = ${score.toFixed(3)}`).toBeLessThan(0.4);
      }
    }
  });

  it("intenções primárias são únicas e cada evitada aponta para outro owner", () => {
    const primarias = OWNERS_4D.map((p) => INTENCOES_4D[p].primaria);
    expect(new Set(primarias).size).toBe(primarias.length);
    for (const path of OWNERS_4D) {
      const intencao = INTENCOES_4D[path];
      expect(intencao.encaminharPara).toHaveLength(intencao.evitar.length);
      for (const destino of intencao.encaminharPara) {
        expect(destino).not.toBe(path);
        expect(OWNERS_4D).toContain(destino);
      }
    }
  });

  it("FAQ B2B existe, é única por owner e não repete perguntas", () => {
    const perguntas: string[] = [];
    for (const path of OWNERS_4D) {
      expect(FAQ_4D[path].length).toBeGreaterThanOrEqual(3);
      for (const f of FAQ_4D[path]) {
        expect(f.resposta.length).toBeGreaterThan(80);
        perguntas.push(f.pergunta);
      }
    }
    expect(new Set(perguntas).size).toBe(perguntas.length);
  });

  it("verdade comercial: sem SLA, mensalidade, prazo ou técnico dedicado", () => {
    const proibidos = [
      /mensalidad/i,
      /\bSLA\b/,
      /por\s+m[êe]s/i,
      /t[ée]cnico\s+dedicado/i,
      /prazo\s+garantido/i,
      /fidelidade/i,
      /monitoramento\s+24/i,
      /atendimento\s+imediato/i,
    ];
    for (const path of OWNERS_4D) {
      const texto = `${textoDoOwner(path)} ${FAQ_4D[path].map((f) => `${f.pergunta} ${f.resposta}`).join(" ")}`;
      for (const rx of proibidos) {
        expect(rx.test(texto), `${path} viola ${rx}`).toBe(false);
      }
    }
  });

  it("mensagem de WhatsApp é fail-closed e nunca expõe telefone", () => {
    expect(mensagemWhatsapp4d("/rota-inexistente")).toBeNull();
    expect(enriquecimento4d("/rota-inexistente")).toBeNull();
    for (const path of OWNERS_4D) {
      const msg = mensagemWhatsapp4d(path, "São José dos Pinhais") ?? "";
      expect(msg).toContain("São José dos Pinhais");
      expect(msg).not.toMatch(/\d{8,}/);
    }
  });
});
