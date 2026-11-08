import { expect, test } from "@playwright/test";

/**
 * Os LHRs mobile identificaram 174 KB da foto EXCLUSIVA do desktop
 * baixados indevidamente ao lado do LCP WebP mobile.
 *
 * Cobertura real da seleção da <picture> no Chromium: sem bypass de rede,
 * fonte escolhida conferida depois de carregar a home.
 */
const BASE = process.env.E2E_BASE_URL ?? "http://localhost:8080";

test.describe("home — fotografia decorativa específica por viewport", () => {
  test("mobile não requisita a fotografia exclusiva do desktop", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const desktopRequests: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("/fotos/estacao-trabalho.jpg")) {
        desktopRequests.push(request.url());
      }
    });

    await page.goto(`${BASE}/`, { waitUntil: "load" });
    const photo = page.locator("picture[data-desktop-hero] img");
    await expect(photo).toHaveCount(1);
    const selected = await photo.evaluate((img: HTMLImageElement) => img.currentSrc);
    expect(selected).toContain("data:image/svg+xml");
    expect(desktopRequests).toEqual([]);

    // A foto LCP móvel mantém o WebP descobrível.
    const mobile = page.locator('picture source[srcset="/fotos/bancada-tecnica-768.webp"]');
    await expect(mobile).toHaveCount(1);
  });

  test("desktop mantém a fotografia original visível", async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto(`${BASE}/`, { waitUntil: "load" });

    const photo = page.locator("picture[data-desktop-hero]");
    await expect(photo).toBeVisible();
    const selected = await photo.locator("img").evaluate((img: HTMLImageElement) => img.currentSrc);
    expect(new URL(selected).pathname).toBe("/fotos/estacao-trabalho.jpg");
  });
});
