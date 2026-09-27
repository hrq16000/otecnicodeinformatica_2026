import { describe, expect, it } from "vitest";
import { getArticleSources, getTechnicalReviewStatus } from "@/lib/blogEditorialSources";
import { atlasPonteDoArtigo } from "@/lib/atlasPontesArtigos";
import { isEditorialApproved } from "@/lib/blogEditorialRegistry";

const reviewedButNoindex = [
  "comandos-linux-essenciais-iniciantes",
  "como-gerenciar-pacotes-apt-dnf-linux",
];

describe("onda Linux 1 — qualificação fail-closed", () => {
  it("fecha revisão técnica da coorte sem promover automaticamente", () => {
    for (const slug of reviewedButNoindex) {
      expect(getArticleSources(slug).length).toBeGreaterThan(0);
      expect(getTechnicalReviewStatus(slug)).toBe("reviewed");
      expect(atlasPonteDoArtigo(slug)).not.toBeNull();
      expect(isEditorialApproved(slug)).toBe(false);
    }
  });
});
