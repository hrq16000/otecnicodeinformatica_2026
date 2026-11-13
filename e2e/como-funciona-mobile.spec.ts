import { test, expect, devices } from "@playwright/test";

const BASE = process.env.E2E_BASE_URL || "http://localhost:8080";

test.use({ ...devices["iPhone 13"] });

test.describe("Home mobile — triagem, WhatsApp e CLS", () => {
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
    await expect(page.locator("html")).toHaveAttribute("data-hydrated", "1");

    // Hidratação básica do hero antes do fallback
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Regra do projeto: sem links tel:
    const telCount = await page.locator('a[href^="tel:"]').count();
    expect(telCount).toBe(0);

    // O redesign usa triagem na home e o botão flutuante abre o funil.
    await expect(page.getByRole("search")).toBeVisible();
    await expect(page.getByRole("button", { name: /diagnosticar meu problema/i })).toBeEnabled();
    const floating = page.getByTestId("whatsapp-float");
    await expect(floating).toBeVisible();
    await floating.click();
    const modal = page.getByRole("dialog").filter({ hasText: /Triagem antes do atendimento/i });
    await expect(modal).toBeVisible();

    await expect(modal.getByText(/Triagem antes do atendimento/i)).toBeVisible();
    await modal.getByRole("radio", { name: /Para mim ou minha residência/i }).click();
    await expect(modal.getByText(/Qual o equipamento/i)).toBeVisible();

    // Fecha modal
    await modal.getByRole("button", { name: /fechar|close/i }).click();
    await expect(modal).toBeHidden();

    const policies = page.getByRole("link", { name: "Ver preços e políticas", exact: true });
    await policies.scrollIntoViewIfNeeded();
    await expect(policies).toHaveAttribute("href", "/precos-e-politicas");
    await expect(floating).toBeVisible();
    await expect(floating).toBeEnabled();

    // CLS abaixo do limite aceitável após interações
    await page.waitForTimeout(800);
    const cls = await page.evaluate(
      () => (window as unknown as { __cls: number }).__cls || 0,
    );
    expect(cls, `CLS regrediu: ${cls}`).toBeLessThan(0.1);
  });
});
