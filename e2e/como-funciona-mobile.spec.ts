import { test, expect, devices } from "@playwright/test";

const BASE = process.env.E2E_BASE_URL || "http://localhost:8080";

// iPhone 13 exige WebKit; seus launch args nao aceitam flags Chromium.
test.use({ ...devices["iPhone 13"], launchOptions: { args: [] } });

test.describe("Como funciona mobile — triagem, CTAs e CLS", () => {
  test("funil real abre e fecha; processo e WhatsApp continuam acessiveis", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __cls: number }).__cls = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as PerformanceEntry[]) {
          const e = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
          if (!e.hadRecentInput && typeof e.value === "number") {
            (window as unknown as { __cls: number }).__cls += e.value;
          }
        }
      }).observe({ type: "layout-shift", buffered: true });
    });

    await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.locator('a[href^="tel:"]').count()).toBe(0);

    // Fluxo de abertura comercial vigente: botão flutuante -> triagem por etapas.
    const float = page.getByTestId("whatsapp-float");
    await expect(float).toBeVisible();
    await expect(float).toBeEnabled();
    await float.click();
    const modal = page.locator('[data-triage="1"][role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal.getByText(/Triagem antes do atendimento/i)).toBeVisible();
    await expect(modal.getByRole("radio", { name: /Para mim ou minha residência/i })).toBeVisible();
    // Se a triagem restaurou respostas, o fechamento solicita confirmação
    // para não perder o progresso. Aceitar o prompt nativo sem remover o gate.
    page.on("dialog", async (nativeDialog) => {
      expect(nativeDialog.type()).toBe("confirm");
      expect(nativeDialog.message()).toMatch(/Fechar a triagem/i);
      await nativeDialog.accept();
    });
    await modal.getByRole("button", { name: "Close" }).click();
    await expect(modal).toBeHidden();

    // A página própria de "Como funciona" conserva conteúdo, CTA e acesso à triagem.
    await page.goto(BASE + "/como-funciona", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const whatsappCta = page.getByRole("link", { name: /Chamar no WhatsApp/i }).first();
    await expect(whatsappCta).toBeVisible();
    await expect(whatsappCta).toBeEnabled();
    expect(await whatsappCta.getAttribute("href")).toContain("wa.me");
    await expect(page.getByTestId("whatsapp-float")).toBeVisible();
    expect(await page.locator('a[href^="tel:"]').count()).toBe(0);

    await page.waitForTimeout(800);
    const cls = await page.evaluate(
      () => (window as unknown as { __cls: number }).__cls || 0,
    );
    expect(cls, `CLS regrediu: ${cls}`).toBeLessThan(0.1);
  });
});
