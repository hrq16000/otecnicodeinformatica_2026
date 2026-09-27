import { describe, expect, it } from "vitest";
import { getArticleSources, getTechnicalReviewStatus } from "@/lib/blogEditorialSources";
import { atlasPonteDoArtigo } from "@/lib/atlasPontesArtigos";
import { isEditorialApproved } from "@/lib/blogEditorialRegistry";

const qualifiedSlugs = [
  "comandos-linux-essenciais-iniciantes",
  "como-gerenciar-pacotes-apt-dnf-linux",
  "como-configurar-ssh-seguro-linux",
  "como-usar-rsync-backup-linux",
];

describe("onda Linux 1 — coorte encerrada com promoção controlada", () => {
  it("mantém os quatro owners revisados, com fontes, Atlas e aprovação editorial", () => {
    for (const slug of qualifiedSlugs) {
      expect(getArticleSources(slug).length).toBeGreaterThan(0);
      expect(getTechnicalReviewStatus(slug)).toBe("reviewed");
      expect(atlasPonteDoArtigo(slug)).not.toBeNull();
      expect(isEditorialApproved(slug)).toBe(true);
    }
  });
});
