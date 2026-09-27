import { describe, expect, it } from "vitest";
import { blogSupplementalPosts } from "@/data/blogSupplementalPosts";
import { getEditorialCover } from "@/lib/blogEditorialCovers";
import { getArticleSources, getTechnicalReviewStatus } from "@/lib/blogEditorialSources";
import { isEditorialApproved } from "@/lib/blogEditorialRegistry";
import { findEditorialEntry } from "@/lib/editorialWavesRegistry";
import { EDITORIAL_HUB_SUMMARIES } from "@/lib/editorialHubSummaries";
import { contentNode } from "@/lib/contentIntentMap";

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


describe("guia suplementar de rsync para backup no Linux", () => {
  const slug = "como-usar-rsync-backup-linux";

  it("substitui o texto-modelo por conteúdo específico e seguro", () => {
    const post = blogSupplementalPosts[slug];
    expect(post).toBeTruthy();
    expect(post.title).toMatch(/rsync/i);
    expect(post.excerpt).toMatch(/sincroniza|sincronização/i);
    expect(post.readTime).toBe("13 min");
    expect(post.content).toBeTruthy();
  });

  it("só entra no índice após revisão, fonte e capa licenciada", () => {
    expect(getTechnicalReviewStatus(slug)).toBe("reviewed");
    expect(getArticleSources(slug).length).toBeGreaterThanOrEqual(1);
    expect(isEditorialApproved(slug)).toBe(true);
    expect(getEditorialCover(slug)?.src).toBe("/blog/historico-de-arquivos-windows-como-configurar.jpg");
  });

  it("tem owner distinto da estratégia geral de backup", () => {
    const node = contentNode("/blog/" + slug);
    const entry = findEditorialEntry("/blog/" + slug);
    expect(node?.intent).toBe("informational");
    expect(node?.doNotDuplicate).toContain("/blog/backup-como-proteger-seus-arquivos");
    expect(entry?.ownerId).toBe("rsync-copia-sincronizacao-backup");
    expect(EDITORIAL_HUB_SUMMARIES[slug]?.category).toBe("Linux");
  });
});


describe("guia suplementar de SSH seguro no Linux", () => {
  const slug = "como-configurar-ssh-seguro-linux";

  it("substitui a receita genérica por configuração reversível", () => {
    const post = blogSupplementalPosts[slug];
    expect(post).toBeTruthy();
    expect(post.title).toMatch(/SSH/i);
    expect(post.excerpt).toMatch(/chave|lockout/i);
    expect(post.readTime).toBe("13 min");
    expect(post.content).toBeTruthy();
  });

  it("só entra no índice após revisão, fontes e capa licenciada", () => {
    expect(getTechnicalReviewStatus(slug)).toBe("reviewed");
    expect(getArticleSources(slug).length).toBeGreaterThanOrEqual(2);
    expect(isEditorialApproved(slug)).toBe(true);
    expect(getEditorialCover(slug)?.src).toBe("/blog/backup-nuvem-empresas-qual-escolher.jpg");
  });

  it("separa SSH de firewall e MFA", () => {
    const node = contentNode("/blog/" + slug);
    const entry = findEditorialEntry("/blog/" + slug);
    expect(node?.intent).toBe("informational");
    expect(node?.doNotDuplicate).toContain("/blog/como-configurar-firewall-ufw-linux");
    expect(entry?.ownerId).toBe("openssh-chaves-validacao-rollback");
    expect(EDITORIAL_HUB_SUMMARIES[slug]?.category).toBe("Linux");
  });
});


describe("guia suplementar de APT e DNF no Linux", () => {
  const slug = "como-gerenciar-pacotes-apt-dnf-linux";

  it("substitui a receita genérica por transações revisáveis", () => {
    const post = blogSupplementalPosts[slug];
    expect(post).toBeTruthy();
    expect(post.title).toMatch(/APT e DNF/i);
    expect(post.excerpt).toMatch(/distribuiç|transaç/i);
    expect(post.readTime).toBe("13 min");
    expect(post.content).toBeTruthy();
  });

  it("só entra no índice após revisão, fontes e capa própria", () => {
    expect(getTechnicalReviewStatus(slug)).toBe("reviewed");
    expect(getArticleSources(slug).length).toBeGreaterThanOrEqual(2);
    expect(isEditorialApproved(slug)).toBe(true);
    expect(getEditorialCover(slug)?.src).toBe("/blog/como-instalar-ubuntu-do-zero.svg");
  });

  it("separa pacotes de shell básico e instalação do sistema", () => {
    const node = contentNode("/blog/" + slug);
    const entry = findEditorialEntry("/blog/" + slug);
    expect(node?.intent).toBe("informational");
    expect(node?.doNotDuplicate).toContain("/blog/comandos-linux-essenciais-iniciantes");
    expect(entry?.ownerId).toBe("linux-pacotes-apt-dnf");
    expect(EDITORIAL_HUB_SUMMARIES[slug]?.category).toBe("Linux");
  });
});


describe("guia suplementar de comandos Linux para iniciantes", () => {
  const slug = "comandos-linux-essenciais-iniciantes";

  it("substitui lista promocional por trilha segura de terminal", () => {
    const post = blogSupplementalPosts[slug];
    expect(post).toBeTruthy();
    expect(post.title).toMatch(/Comandos Linux/i);
    expect(post.excerpt).toMatch(/sudo|operaç|efeito/i);
    expect(post.readTime).toBe("12 min");
    expect(post.content).toBeTruthy();
  });

  it("conclui revisão técnica mas continua fail-closed", () => {
    expect(getTechnicalReviewStatus(slug)).toBe("reviewed");
    expect(getArticleSources(slug).length).toBeGreaterThanOrEqual(1);
    expect(isEditorialApproved(slug)).toBe(false);
    expect(getEditorialCover(slug)).toBeUndefined();
  });

  it("separa fundamentos do shell de pacotes e SSH", () => {
    const node = contentNode("/blog/" + slug);
    expect(node?.intent).toBe("informational");
    expect(node?.doNotDuplicate).toContain("/blog/como-gerenciar-pacotes-apt-dnf-linux");
    expect(EDITORIAL_HUB_SUMMARIES[slug]?.category).toBe("Linux");
  });
});
