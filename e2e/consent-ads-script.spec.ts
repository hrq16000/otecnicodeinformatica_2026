import { expect, test } from "@playwright/test";

/**
 * Rodada 29 — segurança de consentimento e recursos de terceiros.
 * O HTML inicial não deve disparar AdSense antes do aceite explícito.
 * A rotina de carregamento após o aceite segue em consentStore.ts.
 */
const BASE = process.env.E2E_BASE_URL ?? "http://localhost:8080";

test("SSR mantém identificação AdSense sem injetar script pré-consentimento", async ({ request }) => {
  const response = await request.get(`${BASE}/`);
  expect(response.ok()).toBe(true);
  const html = await response.text();

  expect(html).toContain("google-adsense-account");
  expect(html).toContain("ca-pub-3762170279587706");

  // Somente o <script src> inicial é proibido. Isso não proíbe o script
  // dinâmico que consentStore.loadAdsScript injeta após o aceite.
  expect(html).not.toMatch(
    /<script\b[^>]*\bsrc=["'][^"']*pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/i,
  );
});
