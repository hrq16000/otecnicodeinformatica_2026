import { describe, expect, it } from "vitest";
import {
  BLOG_SEARCH_INTENT_OVERRIDES,
  applyBlogSearchIntent,
} from "@/lib/blogSearchIntentOverrides";

describe("blogSearchIntentOverrides", () => {
  it("mantém owners distintas no cluster nacional de informática", () => {
    expect(BLOG_SEARCH_INTENT_OVERRIDES["o-que-e-informatica"].intent).toBe("definicao");
    expect(BLOG_SEARCH_INTENT_OVERRIDES["informatica-basica"].intent).toBe("fundamentos");
    expect(BLOG_SEARCH_INTENT_OVERRIDES["como-aprender-informatica"].intent).toBe("aprendizagem");

    const titles = [
      applyBlogSearchIntent("o-que-e-informatica", { title: "x", excerpt: "y" }).title,
      applyBlogSearchIntent("informatica-basica", { title: "x", excerpt: "y" }).title,
      applyBlogSearchIntent("como-aprender-informatica", {
        title: "Como Aprender Informática do Zero: Guia Prático para Iniciantes",
        excerpt: "y",
      }).title,
    ];

    expect(new Set(titles).size).toBe(3);
    expect(titles[0].toLowerCase()).toContain("o que é informática");
    expect(titles[1].toLowerCase()).toContain("informática básica");
    expect(titles[2].toLowerCase()).toContain("aprender informática");
  });

  it("alinha os excerpts às consultas observadas sem alterar slugs não curados", () => {
    const definition = applyBlogSearchIntent("o-que-e-informatica", {
      title: "original",
      excerpt: "original",
    });
    const basics = applyBlogSearchIntent("informatica-basica", {
      title: "original",
      excerpt: "original",
    });
    const learning = applyBlogSearchIntent("como-aprender-informatica", {
      title: "Como Aprender Informática do Zero: Guia Prático para Iniciantes",
      excerpt: "original",
    });
    const untouched = applyBlogSearchIntent("artigo-sem-override", {
      title: "original",
      excerpt: "original",
    });

    expect(definition.excerpt.toLowerCase()).toContain("o que significa informática");
    expect(basics.excerpt.toLowerCase()).toContain("conhecimentos");
    expect(basics.excerpt.toLowerCase()).toContain("noções");
    expect(learning.excerpt.toLowerCase()).toContain("roteiro passo a passo");
    expect(untouched).toEqual({ title: "original", excerpt: "original" });
  });
});
