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

describe("Atlas de Informática — guias de decisão", () => {
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
});
