import { describe, expect, it } from "vitest";
// módulo .mjs compartilhado pelos gates (sem tipos próprios)
import { readRouteUniverse } from "../../scripts/lib/tanstack-routes.mjs";
import {
  ATLAS_ETAPAS,
  ATLAS_GUIAS_DECISAO,
  ATLAS_TEMAS,
  atlasArtigosAprovados,
  atlasTodosOsLinks,
} from "@/lib/atlasInformatica";
import { isEditorialApproved } from "@/lib/blogEditorialRegistry";
import { EDITORIAL_HUB_SUMMARIES } from "@/lib/editorialHubSummaries";

/**
 * Integridade do Atlas de Informática (Fase 1).
 * O hub NÃO pode listar rascunho, rota inexistente ou trilha incompleta —
 * qualquer regressão aqui vira link órfão ou promessa editorial falsa.
 */

describe("Atlas de Informática — temas", () => {
  it("tem exatamente 9 temas com ids e títulos únicos", () => {
    expect(ATLAS_TEMAS).toHaveLength(9);
    const ids = ATLAS_TEMAS.map((t) => t.id);
    const titulos = ATLAS_TEMAS.map((t) => t.titulo);
    expect(new Set(ids).size).toBe(9);
    expect(new Set(titulos).size).toBe(9);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("cobre os 9 domínios pedidos na Fase 1", () => {
    const ids = new Set(ATLAS_TEMAS.map((t) => t.id));
    for (const esperado of [
      "fundamentos",
      "windows-inicializacao",
      "hardware-upgrades",
      "redes-wifi",
      "seguranca-privacidade",
      "dados-backup",
      "manutencao-preventiva",
      "informatica-empresas",
      "decisoes-compra-reparo",
    ]) {
      expect(ids.has(esperado), `tema ausente: ${esperado}`).toBe(true);
    }
  });

  it("cada trilha segue a ordem aprender → identificar → verificar → parar → resolver", () => {
    for (const tema of ATLAS_TEMAS) {
      expect(
        tema.trilha.map((p) => p.etapa),
        `trilha fora de ordem em ${tema.id}`,
      ).toEqual([...ATLAS_ETAPAS]);
      for (const passo of tema.trilha) {
        expect(passo.desc.length, `desc curta em ${tema.id}/${passo.etapa}`).toBeGreaterThan(40);
        expect(passo.to.startsWith("/"), `link não interno em ${tema.id}`).toBe(true);
        expect(passo.linkLabel.length).toBeGreaterThan(3);
      }
    }
  });

  it("resumos são próprios de cada tema (sem template repetido)", () => {
    const resumos = ATLAS_TEMAS.map((t) => t.resumo);
    expect(new Set(resumos).size).toBe(resumos.length);
    for (const r of resumos) expect(r.length).toBeGreaterThan(80);
  });
});

describe("Atlas de Informática — fail-closed editorial", () => {
  it("todo artigo listado está aprovado no registro editorial e tem resumo no hub", () => {
    for (const tema of ATLAS_TEMAS) {
      expect(tema.artigos.length, `tema sem artigos: ${tema.id}`).toBeGreaterThan(2);
      for (const slug of tema.artigos) {
        expect(isEditorialApproved(slug), `rascunho listado no Atlas: ${slug}`).toBe(true);
        expect(EDITORIAL_HUB_SUMMARIES[slug], `sem resumo de hub: ${slug}`).toBeDefined();
      }
      // O filtro de renderização não pode descartar nada silenciosamente.
      expect(atlasArtigosAprovados(tema)).toHaveLength(tema.artigos.length);
    }
  });
});

describe("Atlas de Informática — malha de links", () => {
  const universo = readRouteUniverse();

  it("todo destino declarado corresponde a uma rota real", () => {
    expect(universo.ok).toBe(true);
    for (const link of atlasTodosOsLinks()) {
      expect(universo.isKnownRoute(link), `rota inexistente no Atlas: ${link}`).toBe(true);
    }
  });

  it("nenhum link aponta para área privada ou âncora quebrada", () => {
    for (const link of atlasTodosOsLinks()) {
      expect(link.startsWith("/admin"), `link privado no Atlas: ${link}`).toBe(false);
      expect(link.includes("#"), `âncora em link de dados (usar apenas paths): ${link}`).toBe(false);
    }
  });
});

describe("Atlas de Informática — guias de decisão (Fase 2: independentes)", () => {
  it("cada guia responde uma pergunta com critério explícito e destino real", () => {
    const universo = readRouteUniverse();
    expect(ATLAS_GUIAS_DECISAO.length).toBeGreaterThanOrEqual(6);
    const perguntas = ATLAS_GUIAS_DECISAO.map((g) => g.pergunta);
    expect(new Set(perguntas).size).toBe(perguntas.length);
    for (const g of ATLAS_GUIAS_DECISAO) {
      expect(g.pergunta.endsWith("?")).toBe(true);
      expect(g.criterio.length, `critério raso: ${g.pergunta}`).toBeGreaterThan(60);
      expect(universo.isKnownRoute(g.to), `destino inexistente: ${g.to}`).toBe(true);
    }
  });

  it("tem âncora própria, sinais dos dois lados e risco só canônico", () => {
    const ids = ATLAS_GUIAS_DECISAO.map((g) => g.id);
    expect(new Set(ids).size).toBe(ids.length);
    const riscosCanonicos = new Set([
      "Seguro de fazer sozinho",
      "Exige atenção",
      "Parada obrigatória",
    ]);
    for (const g of ATLAS_GUIAS_DECISAO) {
      expect(g.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(g.sinais, `guia sem os dois lados: ${g.id}`).toHaveLength(2);
      const rotulos = g.sinais.map((l) => l.rotulo);
      expect(new Set(rotulos).size, `rótulos repetidos em ${g.id}`).toBe(2);
      for (const lado of g.sinais) {
        expect(lado.pontos.length, `lado raso em ${g.id}/${lado.rotulo}`).toBeGreaterThanOrEqual(3);
        for (const ponto of lado.pontos) expect(ponto.length).toBeGreaterThan(20);
      }
      if (g.risco !== undefined) {
        expect(riscosCanonicos.has(g.risco), `risco fora do vocabulário: ${g.risco}`).toBe(true);
      }
    }
    // O guia de disco com ruído é o caso de parada obrigatória por definição.
    const hd = ATLAS_GUIAS_DECISAO.find((g) => g.id === "hd-com-ruido");
    expect(hd?.risco).toBe("Parada obrigatória");
  });
});

describe("Atlas de Informática — Fase 2: vereditos e fontes primárias", () => {
  it("cada tema tem veredito próprio, substancial e sem número inventado", () => {
    const vereditos = ATLAS_TEMAS.map((t) => t.veredito);
    expect(new Set(vereditos).size).toBe(vereditos.length);
    for (const v of vereditos) {
      expect(v.length).toBeGreaterThan(80);
      // Sem estatística fabricada: nenhum percentual ou "9 em 10" no veredito.
      expect(v).not.toMatch(/\d+\s*%|\d+\s+em\s+\d+/);
    }
  });

  it("fontes primárias só em temas que dependem de política externa, com domínio permitido", () => {
    const dominiosPermitidos = new Set([
      "learn.microsoft.com",
      "support.microsoft.com",
      "www.cisa.gov",
      "cartilha.cert.br",
      "www.wi-fi.org",
      "csrc.nist.gov",
    ]);
    const temasComFonteEsperada = new Set([
      "windows-inicializacao",
      "redes-wifi",
      "seguranca-privacidade",
      "dados-backup",
      "informatica-empresas",
    ]);
    for (const tema of ATLAS_TEMAS) {
      if (!tema.fontes || tema.fontes.length === 0) {
        // Conhecimento estável fica sem fonte — mas nunca nos temas externos.
        expect(
          temasComFonteEsperada.has(tema.id),
          `tema dependente de política externa sem fonte: ${tema.id}`,
        ).toBe(false);
        continue;
      }
      expect(
        temasComFonteEsperada.has(tema.id),
        `fonte primária em tema de conhecimento estável: ${tema.id}`,
      ).toBe(true);
      for (const f of tema.fontes) {
        expect(f.url.startsWith("https://"), `fonte sem https em ${tema.id}`).toBe(true);
        const host = new URL(f.url).hostname;
        expect(dominiosPermitidos.has(host), `domínio fora do allowlist: ${host}`).toBe(true);
        expect(f.nota.length, `fonte sem nota de uso em ${tema.id}`).toBeGreaterThan(20);
        expect(f.titulo.length).toBeGreaterThan(10);
      }
    }
  });
});

describe("Atlas de Informática — pontes serviço → tema (Fase 2)", () => {
  it("toda ponte de serviço aponta para tema real com texto próprio", async () => {
    const { ATLAS_PONTES_SERVICO, atlasPonteDoServico } = await import("@/lib/atlasPonteServicos");
    const { SERVICOS_CORE } = await import("@/lib/servicosCore");
    const textos = Object.values(ATLAS_PONTES_SERVICO).map((p) => p.antesDeContratar);
    expect(new Set(textos).size, "texto de ponte repetido entre serviços").toBe(textos.length);
    for (const [slug, ponte] of Object.entries(ATLAS_PONTES_SERVICO)) {
      expect(SERVICOS_CORE[slug as keyof typeof SERVICOS_CORE], `serviço inexistente: ${slug}`).toBeDefined();
      const resolvida = atlasPonteDoServico(slug);
      expect(resolvida, `ponte não resolve: ${slug}`).not.toBeNull();
      expect(resolvida!.tema.id).toBe(ponte.temaId);
      expect(ponte.antesDeContratar.length, `texto raso: ${slug}`).toBeGreaterThan(120);
      expect(resolvida!.hubHref).toBe(`/guia-tecnico-informatica#tema-${ponte.temaId}`);
    }
    // Fail-closed: serviço sem ponte declarada não renderiza nada.
    expect(atlasPonteDoServico("montagem-de-pc")).toBeNull();
  });

  it("os pilares dedicados de /problemas têm ponte de volta para o Atlas", async () => {
    const { atlasPonteDoSintoma } = await import("@/lib/atlasPontes");
    for (const slug of ["computador-lento", "notebook-nao-liga"]) {
      const ponte = atlasPonteDoSintoma(slug);
      expect(ponte, `pilar sem ponte: ${slug}`).not.toBeNull();
      expect(ponte!.porQue.length).toBeGreaterThan(120);
    }
  });
});

describe("Atlas de Informática — pontes sintoma → tema", () => {
  it("cobre todos os clusters de /problemas com texto próprio e tema real", async () => {
    const { CLUSTER_PROBLEMAS } = await import("@/lib/clusterProblemas");
    const { ATLAS_PONTES, atlasPonteDoSintoma } = await import("@/lib/atlasPontes");
    for (const cluster of CLUSTER_PROBLEMAS) {
      const ponte = atlasPonteDoSintoma(cluster.slug);
      expect(ponte, `sintoma sem ponte no Atlas: ${cluster.slug}`).not.toBeNull();
      expect(ponte!.porQue.length).toBeGreaterThan(120);
      expect(ponte!.verificar, `tema sem etapa verificar: ${ponte!.tema.id}`).toBeDefined();
      expect(ponte!.parar, `tema sem etapa parar: ${ponte!.tema.id}`).toBeDefined();
    }
    const textos = Object.values(ATLAS_PONTES).map((p) => p.porQue);
    expect(new Set(textos).size, "texto de ponte repetido entre sintomas").toBe(textos.length);
  });
});
