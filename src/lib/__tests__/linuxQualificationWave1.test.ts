import { describe, expect, it } from "vitest";
import { getArticleSources, getTechnicalReviewStatus } from "@/lib/blogEditorialSources";
import { atlasPonteDoArtigo } from "@/lib/atlasPontesArtigos";
import { isEditorialApproved } from "@/lib/blogEditorialRegistry";

const slugs = [
  "comandos-linux-essenciais-iniciantes",
  "como-gerenciar-pacotes-apt-dnf-linux",
  "como-configurar-ssh-seguro-linux",
  "como-usar-rsync-backup-linux",
];

describe("onda Linux 1 — qualificação fail-closed", () => {
  it("tem fontes e ponte Atlas, mas permanece pendente e noindex editorial", () => {
    for (const slug of slugs) {
      expect(getArticleSources(slug).length).toBeGreaterThan(0);
      expect(getTechnicalReviewStatus(slug)).toBe("pending");
      expect(atlasPonteDoArtigo(slug)).not.toBeNull();
      expect(isEditorialApproved(slug)).toBe(false);
    }
  });
});
