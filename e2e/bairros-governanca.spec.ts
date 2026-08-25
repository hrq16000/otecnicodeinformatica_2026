import { test, expect } from "@playwright/test";
import { SITE_URL } from "./site-env";

/**
 * Governança de SEO programático da malha de bairros.
 *
 * Contrato validado em SSR (sem depender de hidratação):
 *   RICH    → 200 · robots index · canonical self · JSON-LD íntegro
 *   SHALLOW → 200 · robots noindex · canonical self (nunca da home)
 *   sempre  → H1 próprio do bairro, breadcrumb único, uma única montagem lógica
 */

const RICH = "/bairros/agua-verde";
const SHALLOW_CANDIDATOS = ["/bairros/xaxim", "/bairros/uberaba", "/bairros/bacacheri"];

const htmlDe = async (request: import("@playwright/test").APIRequestContext, path: string) => {
  const res = await request.get(path);
  expect(res.status(), `${path} deve responder 200`).toBe(200);
  return res.text();
};

const metaRobots = (html: string) =>
  html.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)?.[1] ?? "";
const canonical = (html: string) =>
  html.match(/<link\s+rel="canonical"[^>]*href="([^"]+)"/i)?.[1] ?? "";

test.describe("malha de bairros — governança SSR", () => {
  test("bairro RICH é indexável com canonical próprio", async ({ request }) => {
    const html = await htmlDe(request, RICH);
    expect(metaRobots(html)).toMatch(/^index/i);
    expect(canonical(html)).toBe(`${SITE_URL}${RICH}`);
  });

  test("bairro SHALLOW responde 200 com noindex e canonical próprio", async ({ request }) => {
    let avaliados = 0;
    for (const path of SHALLOW_CANDIDATOS) {
      const res = await request.get(path);
      if (res.status() !== 200) continue;
      const html = await res.text();
      if (!/noindex/i.test(metaRobots(html))) continue;
      avaliados += 1;
      // Canonical aponta para a própria rota — nunca para a home.
      expect(canonical(html)).toBe(`${SITE_URL}${path}`);
      expect(canonical(html)).not.toBe(`${SITE_URL}/`);
    }
    expect(avaliados, "nenhum bairro SHALLOW encontrado para auditar").toBeGreaterThan(0);
  });

  test("JSON-LD é íntegro e o breadcrumb não duplica", async ({ request }) => {
    const html = await htmlDe(request, RICH);
    const blocos = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
      .map((m) => m[1])
      .filter(Boolean);
    expect(blocos.length, "página sem JSON-LD em SSR").toBeGreaterThan(0);

    const tipos: string[] = [];
    for (const bruto of blocos) {
      const parsed = JSON.parse(bruto as string);
      for (const no of Array.isArray(parsed) ? parsed : [parsed]) {
        if (no?.["@type"]) tipos.push(String(no["@type"]));
      }
    }
    expect(tipos.filter((t) => t === "BreadcrumbList").length).toBeLessThanOrEqual(1);
  });

  test("H1 é único e específico do bairro", async ({ page }) => {
    await page.goto(RICH);
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText(/Água Verde/i);
  });

  test("a rota monta uma única vez após a hidratação", async ({ page }) => {
    await page.goto(RICH);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  });
});
