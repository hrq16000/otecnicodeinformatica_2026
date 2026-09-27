import { describe, expect, it } from "vitest";
import { blogSupplementalPosts } from "@/data/blogSupplementalPosts";
import { getEditorialCover } from "@/lib/blogEditorialCovers";
import { getArticleSources, getTechnicalReviewStatus } from "@/lib/blogEditorialSources";
import { isEditorialApproved } from "@/lib/blogEditorialRegistry";
import { findEditorialEntry } from "@/lib/editorialWavesRegistry";
import { EDITORIAL_HUB_SUMMARIES } from "@/lib/editorialHubSummaries";

const SLUG = "ssd-nao-aparece-no-instalador-do-windows";

describe("guia suplementar SSD ausente no Windows Setup", () => {
  it("mantém conteúdo e metadados editoriais completos", () => {
    const post = blogSupplementalPosts[SLUG];
    expect(post).toBeTruthy();
    expect(post.title).toMatch(/SSD não aparece no instalador do Windows/i);
    expect(post.excerpt.length).toBeGreaterThan(100);
    expect(post.readTime).toBe("12 min");
    expect(post.content).toBeTruthy();
  });

  it("só entra no índice com aprovação, revisão, fontes e capa", () => {
    expect(isEditorialApproved(SLUG)).toBe(true);
    expect(getTechnicalReviewStatus(SLUG)).toBe("reviewed");
    expect(getArticleSources(SLUG).length).toBeGreaterThanOrEqual(4);
    expect(getEditorialCover(SLUG)?.src).toBe("/blog/ssd-nao-aparece-no-instalador-do-windows.svg");
  });

  it("possui owner editorial e resumo de descoberta", () => {
    const entry = findEditorialEntry("/blog/" + SLUG);
    expect(entry?.ownerId).toBe("ssd-ausente-windows-setup");
    expect(entry?.doNotDuplicate).toContain("/blog/ssd-nvme-nao-aparece-no-gerenciador-de-discos");
    expect(EDITORIAL_HUB_SUMMARIES[SLUG]?.category).toBe("Procedimentos Técnicos");
  });
});


describe("guia suplementar de instalação segura do Ubuntu", () => {
  const slug = "como-instalar-ubuntu-do-zero";

  it("substitui o conteúdo herdado por uma versão editorial completa", () => {
    const post = blogSupplementalPosts[slug];
    expect(post).toBeTruthy();
    expect(post.title).toMatch(/instalar Ubuntu do zero/i);
    expect(post.excerpt.length).toBeGreaterThan(120);
    expect(post.readTime).toBe("13 min");
    expect(post.content).toBeTruthy();
  });

  it("só entra no índice com aprovação, revisão, fontes e capa próprias", () => {
    expect(isEditorialApproved(slug)).toBe(true);
    expect(getTechnicalReviewStatus(slug)).toBe("reviewed");
    expect(getArticleSources(slug).length).toBeGreaterThanOrEqual(2);
    expect(getEditorialCover(slug)?.src).toBe("/blog/como-instalar-ubuntu-do-zero.svg");
  });

  it("tem owner, anti-canibalização e descoberta no hub", () => {
    const entry = findEditorialEntry("/blog/" + slug);
    expect(entry?.ownerId).toBe("ubuntu-instalacao-segura-desktop");
    expect(entry?.doNotDuplicate).toContain("/blog/como-instalar-linux-dual-boot-windows");
    expect(EDITORIAL_HUB_SUMMARIES[slug]?.category).toBe("Linux");
  });
});
