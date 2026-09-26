import { describe, expect, it } from "vitest";
import { PROGRAMMATIC_POST_SLUGS } from "@/data/blogProgrammaticPosts";
import {
  PROGRAMMATIC_EDITORIAL_GOVERNANCE,
  PROGRAMMATIC_REDIRECTS,
  PROGRAMMATIC_REVIEW,
} from "@/lib/blogProgrammaticGovernance";
import { REDIRECT_MATRIX, resolveRedirect } from "@/lib/redirectMatrix";

describe("governança do estoque programático", () => {
  it("classifica exatamente todo artigo programático herdado", () => {
    const posts = [...PROGRAMMATIC_POST_SLUGS].sort();
    const governed = PROGRAMMATIC_EDITORIAL_GOVERNANCE.map((d) => d.slug).sort();

    expect(governed).toEqual(posts);
    expect(new Set(governed).size).toBe(governed.length);
  });

  it("consolida 14 duplicatas e mantém 4 intenções em revisão", () => {
    expect(PROGRAMMATIC_REDIRECTS).toHaveLength(14);
    expect(PROGRAMMATIC_REVIEW).toHaveLength(4);
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

  it("não redireciona as cinco intenções que ainda precisam de qualificação", () => {
    for (const decision of PROGRAMMATIC_REVIEW) {
      expect(resolveRedirect(`/blog/${decision.slug}`)).toBeNull();
    }
  });

  it("nunca redireciona um alias programático para outro alias programático", () => {
    const aliases = new Set(PROGRAMMATIC_POST_SLUGS.map((slug) => `/blog/${slug}`));
    for (const decision of PROGRAMMATIC_REDIRECTS) {
      expect(aliases.has(decision.target)).toBe(false);
    }
  });
});
