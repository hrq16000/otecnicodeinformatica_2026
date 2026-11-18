import { test, expect, type APIRequestContext } from "@playwright/test";
import { EDITORIAL_WAVES } from "../src/lib/editorialWavesRegistry";

/**
 * E2E AMPLIADO — Onda 10C · Infra 1.
 *
 * Percorre TODAS as URLs declaradas em src/lib/editorialWavesRegistry.ts
 * (não só o Lote 1) e valida, no HTML SSR:
 *   1. rota 200 e indexável (robots sem noindex) + canonical absoluto;
 *   2. H1 único e title/description presentes e não vazios;
 *   3. JSON-LD com Article/TechArticle parseável e FAQPage no máximo uma vez;
 *   4. navegação: breadcrumb e link de volta para o blog;
 *   5. CTA de conversão presente e sem link direto de wa.me no corpo editorial.
 */

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
    .flatMap((n) => (Array.isArray(n) ? n : [n]))
    .flatMap((n) => (Array.isArray((n as { "@graph"?: unknown[] })["@graph"]) ? (n as { "@graph": unknown[] })["@graph"] : [n])) as Array<
    Record<string, unknown>
  >;

const tipos = (nodes: Array<Record<string, unknown>>) =>
  nodes.flatMap((n) => (Array.isArray(n["@type"]) ? (n["@type"] as string[]) : [String(n["@type"] ?? "")]));

for (const entrada of EDITORIAL_WAVES) {
  test.describe(`onda ${entrada.wave}/${entrada.batch} — ${entrada.url}`, () => {
    test("SEO SSR: indexável, canonical, H1 único e metadados", async ({ request }) => {
      const page = await html(request, entrada.url);

      const robots = page.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)?.[1] ?? "index";
      expect(robots).not.toMatch(/noindex/);

      const canonical = page.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] ?? "";
      expect(canonical, `canonical de ${entrada.url}`).toContain(entrada.url);
      expect(canonical).toMatch(/^https:\/\//);

      const h1s = [...page.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
      expect(h1s.length, `H1 duplicado em ${entrada.url}`).toBe(1);

      const title = page.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
      expect(title.length).toBeGreaterThan(15);
      const desc = page.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? "";
      expect(desc.length).toBeGreaterThan(50);
    });

    test("JSON-LD: artigo válido e FAQPage no máximo uma vez", async ({ request }) => {
      const nodes = jsonLd(await html(request, entrada.url));
      const t = tipos(nodes);
      expect(t.some((x) => /Article/.test(x)), `Article ausente em ${entrada.url}`).toBe(true);
      expect(t.filter((x) => x === "FAQPage").length).toBeLessThanOrEqual(1);
    });

    test("navegação e CTA de conversão no HTML SSR", async ({ request }) => {
      const page = await html(request, entrada.url);

      expect(page).toContain('href="/blog');
      const temBreadcrumb =
        /BreadcrumbList/.test(page) || /aria-label="[^"]*(breadcrumb|navega)/i.test(page);
      expect(temBreadcrumb, `breadcrumb ausente em ${entrada.url}`).toBe(true);

      // O cabeçalho global já usa WhatsApp direto. Na área editorial,
      // a ponte contextual precisa manter rastreamento, mensagem e segurança.
      const corpoEditorial = page.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
      expect(corpoEditorial, `corpo editorial ausente em ${entrada.url}`).not.toBe("");

      const linksWhatsApp = [...corpoEditorial.matchAll(/<a\b[^>]*>/gi)]
        .map(([tag]) => tag)
        .filter((tag) => /href="https:\/\/wa\.me\//i.test(tag));
      for (const tag of linksWhatsApp) {
        expect(tag, `WhatsApp fora do CTA contextual em ${entrada.url}`)
          .toMatch(/data-cta-location="final_cta_guide"/i);
        expect(tag).toMatch(/data-wa-source="whatsapp_cta"/i);
        expect(tag).toMatch(/href="https:\/\/wa\.me\/[0-9]+\?text=[^"]+"/i);
        expect(tag).toMatch(/rel="[^"]*\bnoopener\b[^"]*\bnoreferrer\b[^"]*"/i);
      }
      const temCta = /data-cta|\/diagnostico-tecnico|\/contato|funil/i.test(corpoEditorial);
      expect(temCta, `CTA de conversão ausente em ${entrada.url}`).toBe(true);
    });
  });
}
