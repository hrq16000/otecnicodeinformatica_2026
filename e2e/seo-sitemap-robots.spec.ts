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
    const urls = [...body.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
    expect(urls).toContain(`${SITE_URL}/precos-e-politicas`);
    expect(urls).toContain(`${SITE_URL}/`);
    expect(urls).not.toContain(`${SITE_URL}/assistencia-tecnica-curitiba`);
    expect(urls).not.toContain(`${SITE_URL}/termos-e-condicoes`);
  });

  test("/assistencia-tecnica-curitiba canonical self-references", async ({ page }) => {
    await page.goto(`${BASE}/assistencia-tecnica-curitiba`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(800);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toContain("/assistencia-tecnica-curitiba");
  });
});
