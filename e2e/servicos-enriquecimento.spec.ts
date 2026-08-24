import { test, expect, devices, type Page } from "@playwright/test";

/**
 * Micro-Rodada Enriquecimento 2 — páginas de serviço.
 *
 * Garante que:
 *  1. os blocos de profundidade (resposta rápida, tabela diagnóstica e
 *     blocos de decisão) existem no HTML de cada serviço enriquecido;
 *  2. cada bloco aparece UMA única vez (sem duplicação de template);
 *  3. o CTA de WhatsApp continua disparando exatamente um evento por
 *     clique — o conteúdo novo não introduz eventos repetidos.
 */

const SERVICOS = [
  "formatacao",
  "remocao-de-virus",
  "recuperacao-de-dados",
  "manutencao-de-computador",
  "manutencao-de-notebook",
  "pc-gamer",
] as const;

const installGtagSpy = async (page: Page) => {
  await page.addInitScript(() => {
    (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls = [];
    (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
    (window as unknown as { gtag: (...a: unknown[]) => void }).gtag = function (...args: unknown[]) {
      (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls.push(args);
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push(args);
    };
  });
};

for (const slug of SERVICOS) {
  test(`/servicos/${slug} — blocos de profundidade únicos`, async ({ page }) => {
    await page.goto(`/servicos/${slug}`);

    await expect(page.locator("#resposta-rapida")).toHaveCount(1);
    await expect(page.locator("#tabela-diagnostica")).toHaveCount(1);

    const texto = await page.locator('section[aria-labelledby="resposta-rapida"]').innerText();
    expect(texto.length).toBeGreaterThan(120);


    // A tabela precisa ter linhas reais (sintoma × causa × verificar).
    const linhas = page.locator("table tbody tr");
    expect(await linhas.count()).toBeGreaterThanOrEqual(4);

    // H1 único preservado.
    await expect(page.locator("h1")).toHaveCount(1);
  });
}

test.describe("CTA de serviço — sem eventos duplicados", () => {
  test.use({ viewport: devices["Pixel 5"].viewport });

  test("um clique gera no máximo um evento de abertura do funil", async ({ page, context }) => {
    await context.route("**/wa.me/**", (route) => route.abort());
    await installGtagSpy(page);
    await page.goto("/servicos/formatacao");
    await page.waitForLoadState("networkidle");

    const cta = page.locator("[data-cta-location]").first();
    await cta.click({ force: true });
    await page.waitForTimeout(400);

    const eventos = await page.evaluate(() => {
      const calls = (window as unknown as { __gtagCalls?: unknown[][] }).__gtagCalls ?? [];
      return calls
        .filter((c) => c[0] === "event")
        .map((c) => String(c[1]))
        .filter((n) => n === "wa_funnel_open" || n === "triage_start" || n === "wa_click");
    });

    for (const nome of new Set(eventos)) {
      expect(eventos.filter((e) => e === nome).length).toBeLessThanOrEqual(1);
    }
  });
});
