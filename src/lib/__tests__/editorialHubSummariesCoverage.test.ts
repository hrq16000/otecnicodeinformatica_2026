import { describe, expect, it } from "vitest";
import { getApprovedSlugs } from "../blogEditorialRegistry";
import { EDITORIAL_HUB_SUMMARIES } from "../editorialHubSummaries";

describe("metadados do hub editorial aprovado", () => {
  it("mantém título legível, resumo e metadados em cada artigo aprovado", () => {
    const approved = getApprovedSlugs();
    expect(approved.length).toBeGreaterThan(100);
    for (const slug of approved) {
      const entry = EDITORIAL_HUB_SUMMARIES[slug];
      expect(entry, `sem resumo editorial: ${slug}`).toBeDefined();
      expect(entry?.title.trim().length, slug).toBeGreaterThan(10);
      expect(entry?.title, slug).not.toBe(slug);
      expect(entry?.excerpt.trim().length, slug).toBeGreaterThan(35);
      expect(entry?.category.trim().length, slug).toBeGreaterThan(1);
      expect(entry?.date, slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(entry?.readTime, slug).toMatch(/^\d+ min$/);
    }
  });
});
