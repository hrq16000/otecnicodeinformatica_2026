import { expect, test } from "@playwright/test";

test("busca sob demanda preserva primeiro clique, foco e Ctrl+K", async ({
  page,
}) => {
  await page.goto("/");
  await page.waitForFunction(
    () => document.documentElement.dataset.hydrated === "1",
  );

  const input = page.getByPlaceholder(
    "Descreva o problema ou busque um guia...",
  );
  await expect(input).toHaveCount(0);

  await page.getByRole("button", { name: "Buscar no portal" }).click();
  await expect(input).toBeVisible();
  await expect(input).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(input).toHaveCount(0);

  await page.keyboard.press("Control+k");
  await expect(input).toBeVisible();
  await page.keyboard.press("Control+k");
  await expect(input).toHaveCount(0);
});
