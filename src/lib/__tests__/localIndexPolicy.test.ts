import { describe, expect, it } from "vitest";
import {
  BAIRROS_ANCORA_SLUGS,
  LOTE_LOCAL_1,
  LOTE_LOCAL_5,
  canonicalFor,
  declaredEntities,
  isNoindex,
  resolveLocal,
} from "@/lib/localIndexPolicy";
import { SERVICOS_CORE } from "@/lib/servicosCore";

const TOP10_SERVICO_CIDADE_PROMOVIDAS = [
  "/servicos/conserto-tv/curitiba",
  "/servicos/conserto-celular/curitiba",
  "/servicos/suporte-empresas/curitiba",
  "/servicos/atendimento-remoto/curitiba",
  "/servicos/conserto-tv/sao-jose-dos-pinhais",
  "/servicos/conserto-celular/sao-jose-dos-pinhais",
  "/servicos/upgrade-ssd/sao-jose-dos-pinhais",
  "/servicos/suporte-empresas/sao-jose-dos-pinhais",
  "/servicos/atendimento-remoto/sao-jose-dos-pinhais",
  "/servicos/montagem-de-pc/sao-jose-dos-pinhais",
];

const FILA_11_20_SERVICO_CIDADE = [
  "/servicos/pc-gamer/sao-jose-dos-pinhais",
  "/servicos/suporte-home-office/sao-jose-dos-pinhais",
  "/servicos/suporte-tecnico-empresarial/sao-jose-dos-pinhais",
  "/servicos/manutencao-preventiva-empresas/sao-jose-dos-pinhais",
  "/servicos/backup-para-empresas/sao-jose-dos-pinhais",
  "/servicos/conserto-notebook/araucaria",
  "/servicos/conserto-pc/araucaria",
  "/servicos/conserto-tv/araucaria",
  "/servicos/conserto-celular/araucaria",
  "/servicos/upgrade-ssd/araucaria",
];

const FILA_21_30_SERVICO_CIDADE = [
  "/servicos/backup-recuperacao/araucaria",
  "/servicos/suporte-empresas/araucaria",
  "/servicos/atendimento-remoto/araucaria",
  "/servicos/montagem-de-pc/araucaria",
  "/servicos/pc-gamer/araucaria",
  "/servicos/suporte-home-office/araucaria",
  "/servicos/suporte-tecnico-empresarial/araucaria",
  "/servicos/manutencao-preventiva-empresas/araucaria",
  "/servicos/backup-para-empresas/araucaria",
  "/servicos/conserto-notebook/campo-largo",
];

const FILA_31_40_SERVICO_CIDADE = [
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

describe("localIndexPolicy — regra de ouro", () => {
  it("nunca coloca no sitemap uma entidade não indexável", () => {
    for (const d of declaredEntities()) {
      if (d.indexability !== "index") expect(d.sitemap).toBe(false);
    }
  });

  it("mantém canonical autorreferente em toda entidade indexável", () => {
    for (const d of declaredEntities()) {
      if (d.indexability === "index") expect(d.canonical).toBe(d.path);
    }
  });
});


describe("localIndexPolicy — promoção top 10 service × cidade", () => {
  it("promove exatamente as 10 URLs validadas para index + canonical self + sitemap", () => {
    for (const path of TOP10_SERVICO_CIDADE_PROMOVIDAS) {
      const d = resolveLocal(path);
      expect(d.family).toBe("SERVICO_CIDADE");
      expect(d.indexability).toBe("index");
      expect(canonicalFor(path)).toBe(path);
      expect(d.sitemap).toBe(true);
      expect(d.tier).toBe("SERVICO_CIDADE_COM_INTENCAO_LOCAL");
    }
  });

  it("mantém as 10 URLs da primeira promoção estáveis", () => {
    for (const path of TOP10_SERVICO_CIDADE_PROMOVIDAS) {
      const d = resolveLocal(path);
      expect(d.indexability).toBe("index");
      expect(canonicalFor(path)).toBe(path);
      expect(d.sitemap).toBe(true);
    }
  });

  it("mantém a fila 11–20 estável", () => {
    for (const path of FILA_11_20_SERVICO_CIDADE) {
      const d = resolveLocal(path);
      expect(d.family).toBe("SERVICO_CIDADE");
      expect(d.indexability).toBe("index");
      expect(canonicalFor(path)).toBe(path);
      expect(d.sitemap).toBe(true);
      expect(d.tier).toBe("SERVICO_CIDADE_COM_INTENCAO_LOCAL");
    }
  });

  it("mantém a fila 21–30 estável", () => {
    for (const path of FILA_21_30_SERVICO_CIDADE) {
      const d = resolveLocal(path);
      expect(d.family).toBe("SERVICO_CIDADE");
      expect(d.indexability).toBe("index");
      expect(canonicalFor(path)).toBe(path);
      expect(d.sitemap).toBe(true);
      expect(d.tier).toBe("SERVICO_CIDADE_COM_INTENCAO_LOCAL");
    }
  });

  it("promove a fila 31–40 e totaliza 57 SERVICO_CIDADE explícitas", () => {
    for (const path of FILA_31_40_SERVICO_CIDADE) {
      const d = resolveLocal(path);
      expect(d.family).toBe("SERVICO_CIDADE");
      expect(d.indexability).toBe("index");
      expect(canonicalFor(path)).toBe(path);
      expect(d.sitemap).toBe(true);
      expect(d.tier).toBe("SERVICO_CIDADE_COM_INTENCAO_LOCAL");
    }
    expect(declaredEntities().filter((d) => d.family === "SERVICO_CIDADE")).toHaveLength(57);
  });

  it("mantém outra combinação da família no estado fail-closed anterior", () => {
    const path = "/servicos/redes-wifi/araucaria";
    const d = resolveLocal(path);
    expect(d.indexability).toBe("noindex");
    expect(d.sitemap).toBe(false);
    expect(canonicalFor(path)).toBe(path);
  });
});

describe("localIndexPolicy — Lote Local 1", () => {
  it("declara exatamente 12 URLs", () => {
    expect(LOTE_LOCAL_1).toHaveLength(12);
  });

  it("indexa as duas cidades com operação real", () => {
    expect(isNoindex("/tecnico-informatica-curitiba")).toBe(false);
    expect(isNoindex("/tecnico-informatica-sao-jose-pinhais")).toBe(false);
  });

  it("indexa somente os bairros âncora declarados na política", () => {
    expect(BAIRROS_ANCORA_SLUGS.slice(0, 5)).toEqual(["cic", "batel", "agua-verde", "centro", "portao"]);
    expect(BAIRROS_ANCORA_SLUGS).toContain("santa-felicidade");
    expect(BAIRROS_ANCORA_SLUGS).toContain("guatupe");
    for (const slug of BAIRROS_ANCORA_SLUGS) {
      expect(isNoindex(`/bairros/${slug}`)).toBe(false);
      expect(resolveLocal(`/bairros/${slug}`).sitemap).toBe(true);
    }
    // Xaxim foi promovido na Micro-Rodada Local 1 (conteúdo próprio).
    expect(isNoindex("/bairros/xaxim")).toBe(false);
    expect(resolveLocal("/bairros/xaxim").sitemap).toBe(true);
  });

  it("mantém o Lote Local 5 sincronizado com indexabilidade e sitemap", () => {
    expect(LOTE_LOCAL_5).toHaveLength(10);
    for (const path of LOTE_LOCAL_5) {
      expect(isNoindex(path)).toBe(false);
      expect(resolveLocal(path).sitemap).toBe(true);
    }
  });

  it("canonicaliza serviço × cidade sem intenção local para o serviço-pai real", () => {
    const d = resolveLocal("/servicos/manutencao-preventiva/curitiba");
    expect(d.indexability).toBe("canonicalized");
    expect(d.sitemap).toBe(false);
  });

  it("promove serviço × Curitiba com intenção local própria (Rodada 5C)", () => {
    for (const path of [
      "/servicos/conserto-notebook/curitiba",
      "/servicos/conserto-pc/curitiba",
      "/servicos/redes-wifi/curitiba",
      "/servicos/backup-recuperacao/curitiba",
      "/servicos/formatacao-computador/curitiba",
      "/servicos/remocao-virus/curitiba",
      "/servicos/upgrade-ssd/curitiba",
    ]) {
      const d = resolveLocal(path);
      expect(d.indexability).toBe("index");
      expect(canonicalFor(path)).toBe(path);
      expect(d.sitemap).toBe(true);
    }
  });
});


describe("localIndexPolicy — owner local do suporte empresarial", () => {
  it("mantém Curitiba na página filha e fora da intenção principal do pai", () => {
    const childPath = "/servicos/suporte-tecnico-empresarial/curitiba";
    const child = resolveLocal(childPath);
    const parent = SERVICOS_CORE["suporte-tecnico-empresarial"];

    expect(child.indexability).toBe("index");
    expect(child.canonical).toBe(childPath);
    expect(child.sitemap).toBe(true);

    expect(parent.metaTitle.toLowerCase()).not.toContain("curitiba");
    expect(parent.h1.toLowerCase()).not.toContain("curitiba");
    expect(
      parent.relacionados.some((link) => link.to === childPath),
    ).toBe(true);
  });
});


describe("localIndexPolicy — owner local do conserto de notebook", () => {
  it("mantém Curitiba na página filha e fora da intenção principal do pai", () => {
    const childPath = "/servicos/conserto-notebook/curitiba";
    const child = resolveLocal(childPath);
    const parent = SERVICOS_CORE["manutencao-de-notebook"];

    expect(child.indexability).toBe("index");
    expect(child.canonical).toBe(childPath);
    expect(child.sitemap).toBe(true);

    expect(parent.metaTitle.toLowerCase()).not.toContain("curitiba");
    expect(parent.h1.toLowerCase()).not.toContain("curitiba");
    expect(
      parent.relacionados.some((link) => link.to === childPath),
    ).toBe(true);
  });
});

describe("localIndexPolicy — clusters bloqueados", () => {
  it("mantém /arrumar-pc e /cftv fora do índice", () => {
    expect(isNoindex("/arrumar-pc/sao-paulo")).toBe(true);
    expect(isNoindex("/cftv/curitiba")).toBe(true);
  });

  it("mantém /assistencia-tecnica-curitiba noindex enquanto sobrepõe a landing da cidade", () => {
    expect(isNoindex("/assistencia-tecnica-curitiba")).toBe(true);
  });

  it("normaliza barra final", () => {
    expect(resolveLocal("/bairros/batel/").path).toBe("/bairros/batel");
  });
});
