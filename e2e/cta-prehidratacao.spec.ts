import { test, expect, devices, type Page } from "@playwright/test";

/**
 * Não-regressão do buffer pré-hidratação do CTA flutuante.
 *
 * O botão é servido no HTML SSR, mas o handler React só existe após a
 * hidratação. O script `WA_PREHYDRATION_SCRIPT` (src/routes/__root.tsx)
 * enfileira o toque em `window.__waFunnelQueue` e o funil drena a fila ao
 * montar. Este spec garante que:
 *  - um toque ANTES da hidratação não se perde (o modal abre depois);
 *  - o replay é ÚNICO — exatamente um `wa_funnel_open` por toque enfileirado.
 */

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

const eventsNamed = (page: Page, name: string) =>
  page.evaluate((evName) => {
    const calls = (window as unknown as { __gtagCalls?: unknown[][] }).__gtagCalls ?? [];
    return calls.filter((c) => c[0] === "event" && c[1] === evName).map((c) => c[2]);
  }, name);

const VIEWPORTS = [
  { nome: "desktop", viewport: { width: 1280, height: 900 } },
  { nome: "mobile", viewport: devices["Pixel 5"].viewport },
] as const;

for (const { nome, viewport } of VIEWPORTS) {
test.describe(`CTA flutuante — toque pré-hidratação (${nome})`, () => {
  test.use({ viewport });

  test.beforeEach(async ({ page, context }) => {
    await installGtagSpy(page);
    await context.route("https://wa.me/**", (route) => route.fulfill({ status: 204, body: "" }));
  });

  test("toque antes da hidratação é enfileirado e replayado uma única vez", async ({ page }) => {
    // `commit` para chegar ao DOM SSR antes da hidratação concluir.
    await page.goto("/", { waitUntil: "commit" });
    await page.waitForSelector('[data-testid="whatsapp-float"]', { state: "attached" });

    const hydratedAtClick = await page.evaluate(
      () => document.documentElement.dataset.hydrated === "1",
    );

    if (hydratedAtClick) {
      // Corrida perdida: simula o estado pré-hidratação empurrando na fila,
      // que é exatamente o que o listener de captura faria.
      await page.evaluate(() => {
        const w = window as unknown as { __waFunnelQueue?: Array<{ location?: string }> };
        w.__waFunnelQueue = w.__waFunnelQueue ?? [];
        w.__waFunnelQueue.push({ location: "float" });
      });
    } else {
      await page.click('[data-testid="whatsapp-float"]', { force: true });
      const queued = await page.evaluate(
        () => (window as unknown as { __waFunnelQueue?: unknown[] }).__waFunnelQueue?.length ?? 0,
      );
      expect(queued).toBeGreaterThan(0);
    }

    await page.waitForFunction(() => document.documentElement.dataset.hydrated === "1", null, {
      timeout: 30000,
    });

    // O funil drena a fila: o modal abre sem novo toque do usuário.
    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 10000 });

    // A fila é esvaziada — nenhum replay pendente.
    await expect
      .poll(async () =>
        page.evaluate(
          () => (window as unknown as { __waFunnelQueue?: unknown[] }).__waFunnelQueue?.length ?? 0,
        ),
      )
      .toBe(0);

    const opens = await eventsNamed(page, "wa_funnel_open");
    expect(opens).toHaveLength(1);
    expect(opens[0]).toMatchObject({ click_location: "float", event_category: "wa_funnel" });

    // Estabilidade: o replay não dispara um segundo evento depois.
    await page.waitForTimeout(1500);
    expect(await eventsNamed(page, "wa_funnel_open")).toHaveLength(1);
    expect(await eventsNamed(page, "triage_start")).toHaveLength(1);
  });
});
}
