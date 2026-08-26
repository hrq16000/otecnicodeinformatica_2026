import { describe, expect, it } from "vitest";
import {
  compararBuilds,
  compararSnapshots,
  snapshotDeRender,
} from "../lib/editorial-schema-diff.mjs";

const render = (over = {}) => ({
  url: "/blog/impressora-offline-como-resolver",
  fingerprint: "aaaa1111bbbb2222",
  nos: 6,
  tipos: ["Article", "BreadcrumbList", "FAQPage", "TechArticle"],
  faqVisivel: ["Por que a impressora fica offline?"],
  faqSchema: [{ q: "Por que a impressora fica offline?", a: "Porque o Windows perdeu a comunicação." }],
  breadcrumbVisivel: ["Início", "Blog", "Impressora offline"],
  breadcrumbSchema: [
    { name: "Início", item: "https://x/" },
    { name: "Blog", item: "https://x/blog" },
    { name: "Impressora offline", item: "https://x/blog/impressora-offline-como-resolver" },
  ],
  artigo: {
    tipo: "TechArticle",
    headline: "Impressora offline",
    author: "Equipe",
    publisher: "O Técnico de Informática",
    image: "/blog/x.jpg",
    dateModified: "2026-08-26",
    mainEntityOfPage: "https://x/blog/impressora-offline-como-resolver",
  },
  ...over,
});

const snap = (over = {}) => snapshotDeRender(render(over), { buildSha: "abc", owner: "o", lote: "10C/2" });

describe("diff de schema entre builds", () => {
  it("Caso A — fingerprints iguais → UNCHANGED", () => {
    const r = compararSnapshots(snap(), snap());
    expect(r.estado).toBe("UNCHANGED");
    expect(r.regressoes).toHaveLength(0);
  });

  it("Caso B — FAQPage removido → SCHEMA_REGRESSION", () => {
    const b = snap({
      fingerprint: "cccc3333",
      tipos: ["Article", "BreadcrumbList", "TechArticle"],
      faqSchema: [],
    });
    const r = compararSnapshots(snap(), b);
    expect(r.estado).toBe("SCHEMA_REGRESSION");
    expect(r.regressoes.join(" ")).toMatch(/FAQ visível perdeu FAQPage/);
  });

  it("Caso C — FAQ legítima adicionada → EXPECTED_CHANGE com diff dedicado", () => {
    const perguntaNova = "A impressora some da rede toda hora?";
    const b = snap({
      fingerprint: "dddd4444",
      faqVisivel: [...render().faqVisivel, perguntaNova],
      faqSchema: [...render().faqSchema, { q: perguntaNova, a: "Costuma ser IP dinâmico do roteador." }],
    });
    const r = compararSnapshots(snap(), b);
    expect(r.estado).toBe("EXPECTED_CHANGE");
    expect(r.faq.addedQuestions).toEqual([perguntaNova]);
    expect(r.faq.removedQuestions).toHaveLength(0);
  });

  it("Caso D — só mudou a ordem das chaves → UNCHANGED (sem falso positivo)", () => {
    const desordenado = render();
    const reordenado = {
      ...render(),
      artigo: Object.fromEntries(Object.entries(render().artigo).reverse()),
      tipos: [...render().tipos].reverse(),
    };
    const r = compararSnapshots(
      snapshotDeRender(desordenado, { buildSha: "a" }),
      snapshotDeRender(reordenado, { buildSha: "b" }),
    );
    expect(r.estado).toBe("UNCHANGED");
  });

  it("BreadcrumbList removido é regressão", () => {
    const b = snap({ fingerprint: "z", tipos: ["Article", "FAQPage", "TechArticle"], breadcrumbSchema: [] });
    const r = compararSnapshots(snap(), b);
    expect(r.estado).toBe("SCHEMA_REGRESSION");
    expect(r.regressoes.join(" ")).toMatch(/BreadcrumbList desapareceu/);
  });

  it("mudança de publisher é regressão e aparece no diff de artigo", () => {
    const b = snap({ fingerprint: "y", artigo: { ...render().artigo, publisher: "Outra Marca" } });
    const r = compararSnapshots(snap(), b);
    expect(r.estado).toBe("SCHEMA_REGRESSION");
    expect(r.artigo.mudancas.some((m) => m.campo === "publisher")).toBe(true);
  });

  it("snapshot ausente → UNKNOWN", () => {
    expect(compararSnapshots(null, snap()).estado).toBe("UNKNOWN");
  });

  it("compararBuilds percorre a união de URLs", () => {
    const a = { "/a": snap() };
    const b = { "/a": snap(), "/b": snap() };
    const linhas = compararBuilds(a, b);
    expect(linhas.map((l) => l.url)).toEqual(["/a", "/b"]);
    expect(linhas[1].estado).toBe("UNKNOWN");
  });
});
