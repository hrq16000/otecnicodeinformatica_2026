import { describe, expect, it } from "vitest";
import {
  ENRIQUECIMENTO_4E,
  FAQ_4E,
  INTENCOES_4E,
  OWNERS_4E,
  MODALIDADE_4E,
  mensagemWhatsapp4e,
  enriquecimento4e,
  faq4e,
  intencao4e,
} from "../enriquecimento4eRedes";

const textoDoOwner = (path: string): string => {
  const c = ENRIQUECIMENTO_4E[path as (typeof OWNERS_4E)[number]];
  const partes: string[] = [c.respostaRapida ?? ""];
  for (const t of [c.tabelaDiagnostica, c.tabelaExtra]) {
    if (!t) continue;
    partes.push(t.titulo);
    for (const l of t.linhas) partes.push(l.sintoma, l.causa, l.verificar, l.acao ?? "");
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

describe("Rodada 4E — redes, Wi-Fi e suporte remoto", () => {
  it("no máximo 6 owners, todos com intenção primária declarada", () => {
    expect(OWNERS_4E.length).toBeLessThanOrEqual(6);
    expect(OWNERS_4E.length).toBeGreaterThanOrEqual(4);
    for (const path of OWNERS_4E) {
      expect(INTENCOES_4E[path].primary.length).toBeGreaterThan(40);
      expect(INTENCOES_4E[path].secondary.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("não cria URL nova nem página geolocalizada (anti-doorway)", () => {
    for (const path of OWNERS_4E) {
      expect(path.startsWith("/")).toBe(true);
      expect(path.includes("//")).toBe(false);
      expect(path).not.toMatch(/(wifi|roteador|internet|rede)[a-z-]*-(curitiba|sjp|sao-jose)/);
    }
  });

  it("cada owner tem resposta rápida longa, tabela própria e dois blocos", () => {
    for (const path of OWNERS_4E) {
      const c = ENRIQUECIMENTO_4E[path];
      expect((c.respostaRapida ?? "").length).toBeGreaterThan(500);
      expect(c.tabelaDiagnostica?.linhas.length ?? 0).toBeGreaterThanOrEqual(4);
      expect(c.blocos?.length ?? 0).toBeGreaterThanOrEqual(2);
      expect(c.fontes?.length ?? 0).toBeGreaterThanOrEqual(1);
    }
  });

  it("títulos de tabela e de bloco não se repetem entre owners", () => {
    const titulos: string[] = [];
    for (const path of OWNERS_4E) {
      const c = ENRIQUECIMENTO_4E[path];
      if (c.tabelaDiagnostica) titulos.push(c.tabelaDiagnostica.titulo);
      if (c.tabelaExtra) titulos.push(c.tabelaExtra.titulo);
      for (const b of c.blocos ?? []) titulos.push(b.titulo);
    }
    expect(new Set(titulos).size).toBe(titulos.length);
  });

  it("gate anti-doorway: similaridade entre owners abaixo de 0,40", () => {
    const vetores = OWNERS_4E.map((p) => [p, tokens(textoDoOwner(p))] as const);
    for (let i = 0; i < vetores.length; i += 1) {
      for (let j = i + 1; j < vetores.length; j += 1) {
        const score = jaccard(vetores[i][1], vetores[j][1]);
        expect(score, `${vetores[i][0]} × ${vetores[j][0]} = ${score.toFixed(3)}`).toBeLessThan(0.4);
      }
    }
  });

  it("uma intenção por owner e todo OWNED_ELSEWHERE aponta para outra rota", () => {
    const primarias = OWNERS_4E.map((p) => INTENCOES_4E[p].primary);
    expect(new Set(primarias).size).toBe(primarias.length);
    for (const path of OWNERS_4E) {
      for (const d of INTENCOES_4E[path].ownedElsewhere) {
        expect(d.owner).not.toBe(path);
        expect(d.owner.startsWith("/")).toBe(true);
      }
    }
  });

  it("internet lenta × Wi-Fi lento e sem internet × não conecta estão separados", () => {
    expect(INTENCOES_4E["/solucoes/diagnostico"].primary).toMatch(/internet lenta/i);
    expect(INTENCOES_4E["/problemas/wifi-instavel"].primary).toMatch(/n[ãa]o conecta/i);
    expect(INTENCOES_4E["/servicos/redes-e-wifi"].primary).toMatch(/sem internet/i);
    // Cada owner declara explicitamente que a intenção vizinha é de outro.
    const vizinhos = INTENCOES_4E["/problemas/wifi-instavel"].ownedElsewhere.map((d) => d.owner);
    expect(vizinhos).toContain("/solucoes/diagnostico");
  });

  it("remoto × presencial tem decisão explícita com motivo", () => {
    const tabela = ENRIQUECIMENTO_4E["/atendimento-remoto"].tabelaDiagnostica;
    expect(tabela?.linhas.length ?? 0).toBeGreaterThanOrEqual(6);
    for (const l of tabela?.linhas ?? []) {
      expect(l.acao && l.acao.length > 10).toBe(true);
    }
  });

  it("nenhuma recomendação insegura", () => {
    const proibidos = [
      /desativar\s+(o\s+)?(firewall|antiv)/i,
      /rede\s+aberta\s+resolve/i,
      /desligue\s+a\s+senha/i,
      /\bWEP\b/,
      /desativar\s+a\s+prote[çc][ãa]o/i,
      /mesh\s+sempre\s+resolve/i,
      /resolvemos\s+hardware\s+remotamente/i,
    ];
    for (const path of OWNERS_4E) {
      const texto = `${textoDoOwner(path)} ${FAQ_4E[path].map((f) => `${f.pergunta} ${f.resposta}`).join(" ")}`;
      for (const rx of proibidos) {
        expect(rx.test(texto), `${path} viola ${rx}`).toBe(false);
      }
    }
  });

  it("FAQ visível é única por owner e sem pergunta repetida", () => {
    const perguntas: string[] = [];
    for (const path of OWNERS_4E) {
      expect(FAQ_4E[path].length).toBeGreaterThanOrEqual(4);
      for (const f of FAQ_4E[path]) {
        expect(f.resposta.length).toBeGreaterThan(80);
        perguntas.push(f.pergunta);
      }
    }
    expect(new Set(perguntas).size).toBe(perguntas.length);
  });

  it("links internos: 2 a 5 por owner, sem autolink", () => {
    for (const path of OWNERS_4E) {
      const fechos = (ENRIQUECIMENTO_4E[path].blocos ?? []).flatMap((b) => (b.fecho ? [b.fecho.to] : []));
      const externos = INTENCOES_4E[path].ownedElsewhere.map((d) => d.owner);
      const total = new Set([...fechos, ...externos]);
      expect(total.size).toBeGreaterThanOrEqual(2);
      expect(total.size).toBeLessThanOrEqual(5);
      expect(total.has(path)).toBe(false);
    }
  });

  it("fail-closed e sem PII na mensagem do funil", () => {
    expect(mensagemWhatsapp4e("/rota-inexistente")).toBeNull();
    expect(enriquecimento4e("/rota-inexistente")).toBeNull();
    expect(faq4e("/rota-inexistente")).toBeNull();
    expect(intencao4e("/rota-inexistente")).toBeNull();
    for (const path of OWNERS_4E) {
      const msg = mensagemWhatsapp4e(path, "São José dos Pinhais") ?? "";
      expect(msg).toContain("São José dos Pinhais");
      expect(msg).toContain(`modalidade=${MODALIDADE_4E[path]}`);
      expect(msg).not.toMatch(/\d{8,}/);
    }
  });
});
