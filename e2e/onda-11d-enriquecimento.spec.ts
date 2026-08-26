import { expect, test } from "@playwright/test";

const owners = [
  "/blog/computador-lento-causas-solucoes",
  "/blog/notebook-nao-liga-o-que-fazer",
  "/blog/como-resolver-tela-azul-windows",
  "/blog/ssd-nvme-nao-aparece-no-gerenciador-de-discos",
  "/blog/memoria-ram-insuficiente-sintomas",
];

for (const path of owners) {
  test(`owner 11D ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveTitle(/.+/);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toContainText(/diagnóstico|verificar|problema/i);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(path.replaceAll("/", "\\/")));
    await expect(page.locator("main a").first()).toBeVisible();
    await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
  });
}
