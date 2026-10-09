import { test, expect, devices } from "@playwright/test";

const BASE = process.env.E2E_BASE_URL || "http://localhost:8080";

test.use({ ...devices["Pixel 7"] });

test.describe("Como Funciona + modais — CTAs e CLS", () => {
  test("CTAs WhatsApp permanecem clicáveis e sem links tel:", async ({ page }) => {
    // Coletor de CLS via PerformanceObserver
    await page.addInitScript(() => {
      (window as unknown as { __cls: number }).__cls = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as PerformanceEntry[]) {
          const e = entry as PerformanceEntry & {
            hadRecentInput?: boolean;
            value?: number;
          };
          if (!e.hadRecentInput && typeof e.value === "number") {
            (window as unknown as { __cls: number }).__cls += e.value;
          }
        }
      }).observe({ type: "layout-shift", buffered: true });
    });

    await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });

    // Hidratação básica do hero antes do fallback
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Regra do projeto: sem links tel:
    const telCount = await page.locator('a[href^="tel:"]').count();
    expect(telCount).toBe(0);

    // Fluxo atual da home: o bloco abaixo da dobra é lazy por visibilidade.
    // Primeiro aproximamos o placeholder do viewport; então validamos o CTA real.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const triagemCta = page.locator('[data-cta-location="fluxo_atendimento_cta"]');
    await expect(triagemCta).toBeVisible({ timeout: 20_000 });
    await expect(triagemCta).toBeEnabled();
    expect(await triagemCta.getAttribute("href")).toContain("wa.me");

    // O link para o processo detalhado permanece navegável.
    const processo = page.getByRole("link", { name: /ver o processo em detalhe/i });
    await expect(processo).toBeVisible();
    expect(await processo.getAttribute("href")).toContain("/como-funciona");

    // Sticky WhatsApp mobile permanece visível e clicável
    const sticky = page.locator('[data-cta-location="hero_sticky_mobile"]');
    await expect(sticky).toBeVisible();
    await expect(sticky).toBeEnabled();

    // CLS abaixo do limite aceitável após interações
    await page.waitForTimeout(800);
    const cls = await page.evaluate(
      () => (window as unknown as { __cls: number }).__cls || 0,
    );
    expect(cls, `CLS regrediu: ${cls}`).toBeLessThan(0.1);
  });
});
