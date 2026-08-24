import { test, expect, type Page } from "@playwright/test";

/**
 * Alerta contínuo de regressão (Enriquecimento 4A, item 11):
 * detectar precocemente DUPLICIDADE de `wa_funnel_open` e `triage_start`
 * em cada cenário de Consent Mode.
 *
 * O risco real é o banner de consentimento reinicializar o gtag e o buffer
 * de pré-hidratação reenviar o mesmo toque. Por isso cada cenário abre o
 * funil uma única vez e exige exatamente um disparo de cada evento.
 */

const CONSENT_KEY = "lgpd_consent_v2";

type Cenario = { nome: string; consentimento: null | { analytics: boolean; ads: boolean } };

const CENARIOS: Cenario[] = [
  { nome: "sem decisão (banner visível)", consentimento: null },
  { nome: "aceitou análise e anúncios", consentimento: { analytics: true, ads: true } },
  { nome: "recusou tudo", consentimento: { analytics: false, ads: false } },
];

async function installGtagSpy(page: Page) {
  await page.addInitScript(() => {
    (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls = [];
    (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
    (window as unknown as { gtag: (...a: unknown[]) => void }).gtag = function (...args: unknown[]) {
      (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls.push(args);
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push(args);
    };
  });
}

const nomesDeEvento = (page: Page) =>
  page.evaluate(() =>
    ((window as unknown as { __gtagCalls?: unknown[][] }).__gtagCalls ?? [])
      .filter((c) => c[0] === "event")
      .map((c) => String(c[1])),
  );

for (const cenario of CENARIOS) {
  test(`sem duplicidade de eventos do funil — ${cenario.nome}`, async ({ page, context }) => {
    await installGtagSpy(page);
    if (cenario.consentimento) {
      await page.addInitScript(
        ([key, valor]) => localStorage.setItem(key as string, valor as string),
        [CONSENT_KEY, JSON.stringify(cenario.consentimento)] as const,
      );
    }
    await context.route("https://wa.me/**", (route) => route.fulfill({ status: 204, body: "" }));

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent("wa-funnel:open", { detail: { location: "test" } }));
    });
    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 5000 });
    await page.waitForTimeout(500);

    const nomes = await nomesDeEvento(page);
    expect(nomes.filter((n) => n === "wa_funnel_open")).toHaveLength(1);
    expect(nomes.filter((n) => n === "triage_start")).toHaveLength(1);
  });
}
