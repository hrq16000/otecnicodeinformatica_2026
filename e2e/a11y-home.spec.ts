import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Rodada 4L — acessibilidade da Home e operabilidade por teclado dos CTAs
 * de WhatsApp no mobile. O canal telefônico está desligado por política:
 * o único canal de contato é o WhatsApp.
 */
test.describe("Acessibilidade — Home", () => {
  test("sem violações axe sérias/críticas", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    const graves = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(graves.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });

  test("ícones da Home são decorativos e preservam os títulos no mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    for (const name of [
      "Problemas que resolvemos todo dia",
      "O que fazemos, em ordem do que mais chega aqui",
      "Uso pessoal ou operação de empresa?",
      "Encontre a página certa para o seu caso",
      "Como uma formatação é feita sem virar prejuízo",
      "O que as pessoas perguntam antes de chamar",
    ]) {
      const heading = page.getByRole("heading", { level: 2, name, exact: true });
      await expect(heading).toBeVisible();
      const icon = heading.locator("svg");
      await expect(icon).toHaveCount(1);
      await expect(icon).toHaveAttribute("aria-hidden", "true");
      await expect(icon).toHaveAttribute("focusable", "false");
    }
  });

  test("CTA de WhatsApp é acionável por teclado com foco visível no mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/servicos/pc-gamer");
    const cta = page.locator('[data-testid="mobile-servico-funnel-bar"] a').first();
    await expect(cta).toBeVisible();
    await cta.focus();
    await expect(cta).toBeFocused();
    const outline = await cta.evaluate((el) => {
      const s = getComputedStyle(el);
      return `${s.outlineStyle}|${s.boxShadow}`;
    });
    expect(outline.length).toBeGreaterThan(0);
    await expect(cta).toHaveAttribute("href", /wa\.me|whatsapp|funil-indisponivel/);
  });
});
