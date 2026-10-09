import { test, expect } from "@playwright/test";
import { SITE_URL } from "./site-env";

const BASE = process.env.E2E_BASE_URL ?? "http://localhost:8080";

test.describe("SEO — sitemap & robots", () => {
  test("robots.txt allows core routes", async ({ request }) => {
    const res = await request.get(`${BASE}/robots.txt`);
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toMatch(/User-agent:\s*\*/i);
    expect(body).not.toMatch(/^Disallow:\s*\/\s*$/m);
  });

  test("sitemap-main.xml contains canonical routes", async ({ request }) => {
    const res = await request.get(`${BASE}/sitemap-main.xml`);
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toContain(`${SITE_URL}/precos-e-politicas`);
    expect(body).toContain(`${SITE_URL}/como-funciona`);
    expect(body).toContain(`${SITE_URL}/`);
    // Rotas deliberadamente noindex/aliases nunca entram no sitemap canônico.
    expect(body).not.toContain(`${SITE_URL}/assistencia-tecnica-curitiba`);
    expect(body).not.toContain(`${SITE_URL}/termos-e-condicoes`);
  });

  test("/assistencia-tecnica-curitiba remains noindex with a self canonical", async ({ page }) => {
    await page.goto(`${BASE}/assistencia-tecnica-curitiba`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(800);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    const robots = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(canonical).toContain("/assistencia-tecnica-curitiba");
    expect(robots || "").toMatch(/noindex/i);
  });
});
