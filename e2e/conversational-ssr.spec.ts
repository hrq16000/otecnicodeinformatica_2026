import { test, expect, type APIRequestContext } from "@playwright/test";

/**
 * GATE E2E — blocos de intenção conversacional no HTML SSR.
 *
 *  1. As perguntas "o que / como / por que / onde" chegam no HTML bruto
 *     (sem JavaScript) como <h2>, para indexação e extração por LLMs.
 *  2. A página é indexável (robots index, follow).
 *  3. FAQPage e TechArticle fazem parse e o FAQPage é ÚNICO por URL.
 *  4. Toda âncora interna gerada na seção responde 200 (sem link órfão/404).
 */

const ROTAS = [
  "/problemas/tela-azul",
  "/problemas/computador-desliga-sozinho",
  "/problemas/computador-esquentando",
  "/problemas/wifi-instavel",
];

const html = async (request: APIRequestContext, path: string) => {
  const res = await request.get(path);
  expect(res.status(), `${path} deve responder 200`).toBe(200);
  return res.text();
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

for (const rota of ROTAS) {
  test.describe(`intenção conversacional — ${rota}`, () => {
    test("perguntas em <h2> no HTML servido e página indexável", async ({ request }) => {
      const page = await html(request, rota);

      expect(page, "seção conversacional ausente no SSR").toContain("data-conversational-block");

      const h2 = [...page.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) =>
        m[1].replace(/<[^>]+>/g, "").trim(),
      );
      const perguntas = h2.filter((t) => t.endsWith("?"));
      expect(perguntas.length, `nenhuma pergunta em <h2> em ${rota}`).toBeGreaterThanOrEqual(4);
      for (const inicio of ["O que", "Como", "Por que", "Onde"]) {
        expect(
          perguntas.some((p) => p.startsWith(inicio)),
          `falta pergunta iniciada por "${inicio}" em ${rota}`,
        ).toBe(true);
      }

      const robots = page.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)?.[1] ?? "";
      expect(robots, `robots de ${rota}`).toMatch(/index/);
      expect(robots).not.toMatch(/noindex/);
      expect(robots).toMatch(/follow/);

      const revisao = page.replace(/<[^>]+>/g, " ");
      expect(revisao).toContain("Revisado por responsável técnico");
    });

    test("FAQPage único e TechArticle válidos", async ({ request }) => {
      const page = await html(request, rota);
      const nos = jsonLd(page);

      const faqs = nos.filter((n) => n["@type"] === "FAQPage");
      expect(faqs.length, `FAQPage duplicado em ${rota}`).toBe(1);

      const perguntas = (faqs[0].mainEntity as Array<Record<string, never>>) ?? [];
      expect(perguntas.length).toBeGreaterThan(3);
      const texto = page.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<[^>]+>/g, " ");
      for (const q of perguntas) {
        const nome = String((q as Record<string, unknown>).name ?? "");
        expect(texto.includes(nome), `pergunta sem conteúdo visível: ${nome}`).toBe(true);
      }

      expect(
        nos.some((n) => n["@type"] === "TechArticle" || n["@type"] === "Article"),
        `sem TechArticle em ${rota}`,
      ).toBe(true);
    });

    test("âncoras internas da página não retornam 404", async ({ request }) => {
      const page = await html(request, rota);
      const hrefs = [...page.matchAll(/href="(\/[^"#?]*)"/g)]
        .map((m) => m[1])
        .filter((h) => !h.startsWith("/api"));
      const unicas = [...new Set(hrefs)].slice(0, 40);

      const quebradas: string[] = [];
      for (const href of unicas) {
        const res = await request.get(href);
        if (res.status() >= 400) quebradas.push(`${href} → ${res.status()}`);
      }
      expect(quebradas, `links quebrados em ${rota}: ${quebradas.join(", ")}`).toEqual([]);
    });
  });
}
