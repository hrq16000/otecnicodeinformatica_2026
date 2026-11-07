import { test, expect } from "@playwright/test";

// Exercitar a experiência mobile real em Chromium e no projeto mobile,
// sem sobrescrever o navegador do projeto com um preset de WebKit.
test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

test.describe("Como funciona — contato, funil e estabilidade mobile", () => {
  test("CTA visível abre a triagem obrigatória e preserva CLS", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __cls: number }).__cls = 0;
      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as PerformanceEntry[]) {
            const shift = entry as PerformanceEntry & {
              hadRecentInput?: boolean;
              value?: number;
            };
            if (!shift.hadRecentInput && typeof shift.value === "number") {
              (window as unknown as { __cls: number }).__cls += shift.value;
            }
          }
        }).observe({ type: "layout-shift", buffered: true });
      } catch {
        // Navegadores sem LayoutShift API: o teste mantém os gates de CTA.
      }
    });

    const response = await page.goto("/como-funciona", { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.locator('a[href^="tel:"]').count()).toBe(0);

    // Página atual: CTAs são links "Chamar no WhatsApp", não um botão
    // "Prefiro agendar" nem uma timeline com IDs removidos do produto.
    const cta = page.getByRole("link", { name: /Chamar no WhatsApp/i }).first();
    await expect(cta).toBeVisible();
    await expect(cta).toBeEnabled();
    expect(await cta.getAttribute("href")).toMatch(/^https:\/\/wa\.me\//);

    // O listener global intercepta o contato e exige triagem antes do WhatsApp.
    await cta.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 15000 });
    await expect(dialog.getByText(/Triagem antes do atendimento/i)).toBeVisible();

    // A jornada não pode ter layout instável, inclusive após abrir o modal.
    await page.waitForTimeout(800);
    const cls = await page.evaluate(
      () => (window as unknown as { __cls: number }).__cls || 0,
    );
    expect(cls, `CLS regrediu: ${cls}`).toBeLessThan(0.1);
  });
});
