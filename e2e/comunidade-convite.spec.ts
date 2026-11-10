import { expect, test } from "@playwright/test";

// Convite público (não faz parte do fluxo de captação/triagem de clientes).
const CONVITE_OFICIAL =
  "https://chat.whatsapp.com/DVfSXlJR5YG16VtNtYcf5p?s=cl&p=a&iam=2";

test("banner e popup da comunidade usam o convite oficial sem bloquear a Home", async ({ page }) => {
  await page.clock.install();
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const banner = page.locator('section[aria-labelledby="comunidade-tecnicos-title"]');
  await expect(banner.getByRole("heading", { name: /faça parte da comunidade nacional/i })).toBeVisible();
  await expect(banner.getByRole("link", { name: /quero entrar na comunidade/i })).toHaveAttribute(
    "href",
    CONVITE_OFICIAL,
  );

  const popup = page.getByTestId("convite-comunidade-tecnicos");
  await expect(popup).toHaveCount(0);

  // Os timers avançam sem espera real de 14 segundos no CI.
  await page.clock.fastForward(15_000);
  await expect(popup).toBeVisible();
  await expect(popup.getByRole("link", { name: /participar da comunidade/i })).toHaveAttribute(
    "href",
    CONVITE_OFICIAL,
  );

  // Fechar o convite não oculta o banner nem o formulário de triagem.
  await popup.getByRole("button", { name: /fechar convite da comunidade/i }).click();
  await expect(popup).toHaveCount(0);
  await expect(banner).toBeVisible();
  await expect(page.getByRole("search", { name: /descreva o que está acontecendo/i })).toBeVisible();

  // Fechamento é persistente na mesma origem por sete dias.
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.clock.fastForward(15_000);
  await expect(popup).toHaveCount(0);
});
