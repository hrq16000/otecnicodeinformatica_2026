import { test } from "@playwright/test";
import { abrirTriagemPorAncora, preencherTriagemPf, TRIAGEM } from "./utils/triagem";
test("dbg", async ({ page }) => {
  test.setTimeout(120000);
  await abrirTriagemPorAncora(page, "/#triagem");
  await preencherTriagemPf(page);
  const d = page.locator(TRIAGEM);
  console.log("CHECKED-antes", await d.locator('[role="radio"][aria-checked="true"]').allInnerTexts());
  const n = await d.locator('[role="radiogroup"]').count();
  for (let g = 0; g < n; g++) {
    const grupo = d.locator('[role="radiogroup"]').nth(g);
    const has = await grupo.locator('[role="radio"][aria-checked="true"]').count();
    if (!has) await grupo.locator('[role="radio"]').first().click({ force: true });
    await page.waitForTimeout(200);
  }
  console.log("CHECKED-depois", await d.locator('[role="radio"][aria-checked="true"]').allInnerTexts());
  await d.getByRole("button", { name: /Continuar/i }).click({ force: true });
  await page.waitForTimeout(1500);
  console.log("ETAPA", (await d.innerText()).match(/Etapa \d de \d/)?.[0]);
});
