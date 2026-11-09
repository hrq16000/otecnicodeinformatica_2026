import { expect, test } from "@playwright/test";

/**
 * Rodada 32: em Lighthouse mobile, chunks secundários de chatbot/toasts eram
 * baixados aos ~310ms embora a primeira pintura ocorresse só após 4 segundos.
 * A triagem WhatsApp obrigatória NÃO faz parte deste adiamento.
 */
const BASE = process.env.E2E_BASE_URL ?? "http://localhost:8080";

test("home não baixa o chatbot secundário na primeira pintura; teclado pode antecipá-lo", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const loads: string[] = [];
  page.on("request", (request) => {
    if (/\/assets\/WhatsAppChatbot-[^/]+\.js(?:\?|$)/.test(request.url())) {
      loads.push(request.url());
    }
  });

  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  // As rotas são servidas por SSR; não depender de carregamento de fontes.
  await expect(page.locator("h1").first()).toBeVisible();
  await page.waitForTimeout(1100);
  expect(loads).toEqual([]);

  await page.keyboard.press("Tab");
  await expect.poll(() => loads.length, { timeout: 15000 }).toBeGreaterThan(0);
});
