/**
 * Testes de regressão dos interlinks gerados.
 *
 * 1. Snapshot das âncoras de bairro — bloqueia vazamento de slug cru
 *    ("atendimento em sitio-cercado") e exige o nome oficial de
 *    src/lib/bairrosDirectory.ts.
 * 2. Precisão do roteamento de serviço — um sintoma nunca pode apontar para
 *    um serviço de vertical incompatível (ex.: notebook molhado → conserto de TV).
 */
import { describe, expect, it } from "vitest";
import { BAIRROS_DIRECTORY } from "@/lib/bairrosDirectory";
import { INTERLINKS_GERADOS } from "@/lib/interlinksGerados";

const NOME_POR_SLUG = new Map(BAIRROS_DIRECTORY.map((b) => [b.slug, b.nome]));
const paginas = Object.keys(INTERLINKS_GERADOS).sort();
const linksDe = (contexto: "servico" | "problema" | "bairro") =>
  paginas.flatMap((p) => INTERLINKS_GERADOS[p].filter((l) => l.contexto === contexto).map((l) => ({ ...l, origem: p })));

describe("interlinks de bairro", () => {
  it("mantém o snapshot das âncoras locais publicadas", () => {
    const mapa = linksDe("bairro").map((l) => `${l.origem} → ${l.href} :: ${l.anchor}`);
    expect(mapa).toMatchSnapshot();
  });

  it.each(linksDe("bairro"))("$origem usa o nome oficial do bairro em $href", (link) => {
    const slug = link.href.replace("/bairros/", "");
    const nome = NOME_POR_SLUG.get(slug);
    expect(nome, `slug ${slug} não existe em bairrosDirectory.ts`).toBeTruthy();
    expect(link.anchor).toContain(nome as string);
    // Slug cru não pode sobrar depois de remover o nome de exibição.
    expect(link.anchor.replace(nome as string, "")).not.toMatch(/\b[a-z0-9]+(?:-[a-z0-9]+)+\b/);
  });
});

describe("roteamento dos links de serviço", () => {
  const VERTICAIS_PROIBIDAS: Record<string, RegExp> = {
    "/problemas/notebook-molhado": /conserto-tv|manutencao-tv|conserto-celular/,
    "/problemas/impressora-nao-imprime": /conserto-tv|conserto-celular|redes-e-wifi/,
    "/problemas/teclado-notebook-nao-funciona": /conserto-tv|conserto-celular|impressora/,
  };

  it("nunca aponta um sintoma para uma vertical incompatível", () => {
    const violacoes = linksDe("servico").filter(
      (l) => VERTICAIS_PROIBIDAS[l.origem] && VERTICAIS_PROIBIDAS[l.origem].test(l.href),
    );
    expect(violacoes).toEqual([]);
  });

  it("dá a toda página pelo menos um serviço e nenhum autolink", () => {
    for (const pagina of paginas) {
      const links = INTERLINKS_GERADOS[pagina];
      expect(links.some((l) => l.contexto === "servico"), `${pagina} sem link de serviço`).toBe(true);
      expect(links.map((l) => l.href)).not.toContain(pagina);
    }
  });

  it("não repete destino dentro da mesma página", () => {
    for (const pagina of paginas) {
      const hrefs = INTERLINKS_GERADOS[pagina].map((l) => l.href);
      expect(new Set(hrefs).size).toBe(hrefs.length);
    }
  });

  it("mantém o snapshot das âncoras de serviço", () => {
    expect(linksDe("servico").map((l) => `${l.origem} → ${l.href} :: ${l.anchor}`)).toMatchSnapshot();
  });
});
