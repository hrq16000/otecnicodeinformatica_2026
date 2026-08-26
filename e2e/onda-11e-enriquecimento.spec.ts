import { test, expect } from '@playwright/test';

const owners = [
  '/blog/notebook-superaquecendo-o-que-fazer',
  '/blog/como-trocar-pasta-termica-notebook',
  '/blog/como-recuperar-dados-hd-com-defeito',
  '/problemas/pc-sem-imagem-curitiba',
  '/problemas/computador-desligando-apos-segundos-curitiba',
];

test.describe('Onda 11E — owners enriquecidos', () => {
  for (const route of owners) {
    test(`${route} mantém resposta editorial visível`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('main')).toContainText(/diagnóstico|diagnóstico/i);
    });
  }
});
