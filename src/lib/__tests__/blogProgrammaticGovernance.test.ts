import { describe, expect, it } from "vitest";
import { PROGRAMMATIC_POST_SLUGS } from "@/data/blogProgrammaticPosts";
import {
  PROGRAMMATIC_EDITORIAL_GOVERNANCE,
  PROGRAMMATIC_REDIRECTS,
  PROGRAMMATIC_REVIEW,
  PROGRAMMATIC_PROMOTED,
} from "@/lib/blogProgrammaticGovernance";
import { REDIRECT_MATRIX, resolveRedirect } from "@/lib/redirectMatrix";
import { getArticleSources, getTechnicalReviewStatus } from "@/lib/blogEditorialSources";

describe("governança do estoque programático", () => {
  it("classifica exatamente todo artigo programático herdado", () => {
    const posts = [...PROGRAMMATIC_POST_SLUGS].sort();
    const governed = PROGRAMMATIC_EDITORIAL_GOVERNANCE.map((d) => d.slug).sort();

    expect(governed).toEqual(posts);
    expect(new Set(governed).size).toBe(governed.length);
  });

  it("consolida 15 duplicatas, promove 1 intenção e mantém 2 em revisão", () => {
    expect(PROGRAMMATIC_REDIRECTS).toHaveLength(15);
    expect(PROGRAMMATIC_PROMOTED).toHaveLength(1);
    expect(PROGRAMMATIC_REVIEW).toHaveLength(2);
  });

  it("materializa toda consolidação editorial na matriz única de redirects", () => {
    for (const decision of PROGRAMMATIC_REDIRECTS) {
      const from = `/blog/${decision.slug}`;
      expect(resolveRedirect(from)).toBe(decision.target);
      expect(
        REDIRECT_MATRIX.some(
          (r) =>
            r.from === from &&
            r.to === decision.target &&
            r.motivo === "consolidacao-editorial",
        ),
      ).toBe(true);
    }
  });

  it("não redireciona as intenções que ainda precisam de qualificação", () => {
    for (const decision of PROGRAMMATIC_REVIEW) {
      expect(resolveRedirect(`/blog/${decision.slug}`)).toBeNull();
    }
  });

  it("mantém as intenções independentes restantes tecnicamente revisadas", () => {
    for (const decision of PROGRAMMATIC_REVIEW) {
      expect(getTechnicalReviewStatus(decision.slug)).toBe("reviewed");
      if (decision.slug !== "pc-nao-liga-o-que-fazer") {
        expect(getArticleSources(decision.slug).length).toBeGreaterThan(0);
      }
    }
  });

  it("registra a promoção editorial do backup na nuvem sem redirect", () => {
    expect(PROGRAMMATIC_PROMOTED.map((d) => d.slug)).toEqual(["como-fazer-backup-na-nuvem"]);
    expect(resolveRedirect("/blog/como-fazer-backup-na-nuvem")).toBeNull();
  });

  it("nunca redireciona um alias programático para outro alias programático", () => {
    const aliases = new Set(PROGRAMMATIC_POST_SLUGS.map((slug) => `/blog/${slug}`));
    for (const decision of PROGRAMMATIC_REDIRECTS) {
      expect(aliases.has(decision.target)).toBe(false);
    }
  });
});
