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

    await page.goto(BASE + "/como-funciona", { waitUntil: "domcontentloaded" });

    // Hidratação básica do hero antes do fallback
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Regra do projeto: sem links tel:
    const telCount = await page.locator('a[href^="tel:"]').count();
    expect(telCount).toBe(0);

    // CTAs canônicos da própria página /como-funciona.
    const heroCta = page.getByRole("link", { name: /chamar no whatsapp/i }).first();
    await expect(heroCta).toBeVisible();
    await expect(heroCta).toBeEnabled();
    expect(await heroCta.getAttribute("href")).toContain("wa.me");

    const stepCta = page.getByRole("link", { name: /iniciar atendimento agora/i }).first();
    await stepCta.scrollIntoViewIfNeeded();
    await expect(stepCta).toBeVisible();
    await expect(stepCta).toBeEnabled();
    expect(await stepCta.getAttribute("href")).toContain("wa.me");

    // Botão global de WhatsApp permanece visível e clicável.
    const sticky = page.getByTestId("whatsapp-float");
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
