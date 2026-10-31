import { test, expect } from "@playwright/test";
import { SITE_URL } from "./site-env";

const BASE = process.env.E2E_BASE_URL ?? "http://localhost:8080";

test.describe("SEO — sitemap & robots", () => {
  test("landings transacionais mantêm noindex no HTML SSR", async ({ request }) => {
    for (const path of ["/empresas", "/assistencia-tecnica-curitiba"]) {
      const res = await request.get(`${BASE}${path}`);
      expect(res.ok(), path).toBeTruthy();
      const html = await res.text();
      const tag = html.match(/<meta\b[^>]*name=["']robots["'][^>]*>/i)?.[0] ?? "";
      expect(tag, `robots ausente em ${path}`).toMatch(/noindex/i);
      expect(tag, `follow ausente em ${path}`).toMatch(/follow/i);
    }
  });
  test("atendimento remoto entrega uma unica metadescricao ja no SSR", async ({ request }) => {
    for (let run = 0; run < 3; run++) {
      const res = await request.get(`${BASE}/atendimento-remoto`);
      expect(res.ok()).toBeTruthy();
      const html = await res.text();
      const tags = html.match(/<meta\b[^>]*\bname=["']description["'][^>]*>/gi) ?? [];
      expect(tags, `metadescricao ausente/duplicada na resposta SSR ${run + 1}`).toHaveLength(1);
      expect(tags[0]).toContain("Suporte remoto de informática em Curitiba");
    }
  });
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
    // Esta rota declara noindex; o sitemap deve listar só proprietários indexáveis.
    expect(body).not.toContain(`${SITE_URL}/assistencia-tecnica-curitiba`);
    // Este caminho é alias com canonical para a página fundida de políticas.
    expect(body).toContain(`${SITE_URL}/precos-e-politicas`);
    expect(body).not.toContain(`${SITE_URL}/termos-e-condicoes`);
    expect(body).toContain(`${SITE_URL}/`);
  });

  test("/assistencia-tecnica-curitiba canonical self-references", async ({ page }) => {
    await page.goto(`${BASE}/assistencia-tecnica-curitiba`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(800);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toContain("/assistencia-tecnica-curitiba");
  });
});
