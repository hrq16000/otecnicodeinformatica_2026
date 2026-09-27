import { describe, expect, it } from "vitest";
import { getArticleSources, getTechnicalReviewStatus } from "@/lib/blogEditorialSources";
import { atlasPonteDoArtigo } from "@/lib/atlasPontesArtigos";
import { isEditorialApproved } from "@/lib/blogEditorialRegistry";

const pendingSlugs = [
  "comandos-linux-essenciais-iniciantes",
];

const reviewedButNoindex = [
  "como-gerenciar-pacotes-apt-dnf-linux",
  "como-configurar-ssh-seguro-linux",
  "como-usar-rsync-backup-linux",
];

describe("onda Linux 1 — qualificação fail-closed", () => {
  it("mantém o owner ainda não reescrito pendente e noindex", () => {
    for (const slug of pendingSlugs) {
      expect(getArticleSources(slug).length).toBeGreaterThan(0);
      expect(getTechnicalReviewStatus(slug)).toBe("pending");
      expect(atlasPonteDoArtigo(slug)).not.toBeNull();
      expect(isEditorialApproved(slug)).toBe(false);
    }
  });

  it("permite concluir revisão sem promover antes da capa e aprovação", () => {
    for (const slug of reviewedButNoindex) {
      expect(getArticleSources(slug).length).toBeGreaterThan(0);
      expect(getTechnicalReviewStatus(slug)).toBe("reviewed");
      expect(atlasPonteDoArtigo(slug)).not.toBeNull();
      expect(isEditorialApproved(slug)).toBe(false);
    }
  });
});
