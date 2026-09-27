import { describe, expect, it } from "vitest";
import { getArticleSources, getTechnicalReviewStatus } from "@/lib/blogEditorialSources";
import { atlasPonteDoArtigo } from "@/lib/atlasPontesArtigos";
import { isEditorialApproved } from "@/lib/blogEditorialRegistry";

const pendingSlugs = [
  "comandos-linux-essenciais-iniciantes",
  "como-gerenciar-pacotes-apt-dnf-linux",
  "como-configurar-ssh-seguro-linux",
];

const reviewedButNoindex = "como-usar-rsync-backup-linux";

describe("onda Linux 1 — qualificação fail-closed", () => {
  it("mantém os três owners ainda não reescritos pendentes e noindex", () => {
    for (const slug of pendingSlugs) {
      expect(getArticleSources(slug).length).toBeGreaterThan(0);
      expect(getTechnicalReviewStatus(slug)).toBe("pending");
      expect(atlasPonteDoArtigo(slug)).not.toBeNull();
      expect(isEditorialApproved(slug)).toBe(false);
    }
  });

  it("permite concluir revisão do rsync sem promover antes da capa e aprovação", () => {
    expect(getArticleSources(reviewedButNoindex).length).toBeGreaterThan(0);
    expect(getTechnicalReviewStatus(reviewedButNoindex)).toBe("reviewed");
    expect(atlasPonteDoArtigo(reviewedButNoindex)).not.toBeNull();
    expect(isEditorialApproved(reviewedButNoindex)).toBe(false);
  });
});
