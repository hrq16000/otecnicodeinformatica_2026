import { test, expect } from '@playwright/test';

const owners = [
  '/blog/windows-update-nao-funciona-o-que-verificar',
  '/blog/windows-update-travado-desfazendo-alteracoes',
  '/blog/impressora-offline-como-resolver',
  '/blog/fila-de-impressao-travada-spooler-windows',
  '/blog/computador-sem-som-o-que-verificar',
  '/blog/webcam-nao-funciona-o-que-verificar',
  '/blog/webcam-usb-nao-e-detectada',
];

test.describe('Onda 11F — malha editorial', () => {
  for (const route of owners) {
    test(`${route} existe e renderiza conteúdo principal`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    });
  }
});
