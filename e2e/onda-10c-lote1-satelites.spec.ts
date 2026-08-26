import { test, expect, type APIRequestContext } from "@playwright/test";

/**
 * GATE E2E — Onda 10C / Lote 1 (clusters 3 e 4).
 *
 * Valida no HTML SSR (sem JavaScript) os três satélites publicados:
 *  1. rota responde 200 e é indexável;
 *  2. H1 único e conteúdo editorial presente no HTML bruto;
 *  3. tabela diagnóstica e seção "Quando chamar um técnico";
 *  4. FAQPage único + Article/TechArticle com parse válido;
 *  5. links internos declarados existem (sem 404) e sem link direto de WhatsApp.
 */

const SATELITES = [
  {
    path: "/blog/botao-power-nao-funciona-jump-start-placa-mae",
    h1: "Botão power não funciona",
  },
  {
    path: "/blog/curto-circuito-placa-mae-como-identificar",
    h1: "Curto-circuito na placa-mãe",
  },
  {
    path: "/blog/bios-corrompida-reset-cmos-atualizacao",
    h1: "BIOS corrompida",
  },
];

const html = async (request: APIRequestContext, path: string) => {
  const res = await request.get(path);
  expect(res.status(), `${path} deve responder 200`).toBe(200);
  return res.text();
};

const tipos = (n: Record<string, unknown>): string[] => {
  const t = n["@type"];
  return Array.isArray(t) ? (t as string[]) : typeof t === "string" ? [t] : [];
};

const jsonLd = (page: string) =>
  [...page.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => {
      try {
        return JSON.parse(m[1] as string);
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .flatMap((n) => (Array.isArray(n) ? n : [n])) as Array<Record<string, unknown>>;

for (const { path, h1 } of SATELITES) {
  test.describe(`satélite 10C — ${path}`, () => {
    test("SSR indexável, H1 único e conteúdo citável", async ({ request }) => {
      const page = await html(request, path);

      const h1s = [...page.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
        m[1].replace(/<[^>]+>/g, "").trim(),
      );
      expect(h1s.length, `H1 duplicado em ${path}`).toBe(1);
      expect(h1s[0]).toContain(h1);

      const robots = page.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)?.[1] ?? "";
      expect(robots, `robots de ${path}`).toMatch(/index/);
      expect(robots).not.toMatch(/noindex/);

      const texto = page.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<[^>]+>/g, " ");
      expect(texto).toContain("Resposta curta");
      expect(texto).toContain("Quando chamar um técnico");
      expect(page, `sem tabela diagnóstica em ${path}`).toMatch(/<table[\s\S]*?<\/table>/i);
      expect(texto.replace(/\s+/g, " ").split(" ").length).toBeGreaterThan(700);
    });

    test("FAQPage único e Article válidos", async ({ request }) => {
      const page = await html(request, path);
      const nos = jsonLd(page);

      const faqs = nos.filter((n) => tipos(n).includes("FAQPage"));
      expect(faqs.length, `FAQPage ausente ou duplicado em ${path}`).toBe(1);
      const perguntas = (faqs[0].mainEntity as Array<Record<string, unknown>>) ?? [];
      expect(perguntas.length).toBeGreaterThanOrEqual(3);

      expect(
        nos.some((n) => tipos(n).includes("TechArticle") || tipos(n).includes("Article")),
        `sem Article/TechArticle em ${path}`,
      ).toBe(true);
    });

    test("links internos respondem e não há WhatsApp direto no editorial", async ({ request }) => {
      const page = await html(request, path);

      // O corpo editorial não pode conter link direto de WhatsApp: a conversa
      // sempre passa pelo funil. CTAs globais de layout ficam fora do <article>.
      const artigo = page.match(/<article[\s\S]*?<\/article>/i)?.[0] ?? "";
      expect(artigo.length, `<article> não encontrado em ${path}`).toBeGreaterThan(0);
      expect(artigo, `link direto de WhatsApp no editorial de ${path}`).not.toMatch(/wa\.me\//);

      const hrefs = [...artigo.matchAll(/href="(\/[^"#?]*)"/g)]
        .map((m) => m[1])
        .filter((h) => !h.startsWith("/api"));
      const quebradas: string[] = [];
      for (const href of [...new Set(hrefs)].slice(0, 30)) {
        const res = await request.get(href);
        if (res.status() >= 400) quebradas.push(`${href} → ${res.status()}`);
      }
      expect(quebradas, `links quebrados em ${path}: ${quebradas.join(", ")}`).toEqual([]);
    });
  });
}
