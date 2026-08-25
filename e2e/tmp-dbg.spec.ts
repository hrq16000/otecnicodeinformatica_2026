import { test } from "@playwright/test";
test("dbg", async ({ page }) => {
  await page.goto("/servicos/formatacao?utm_source=google&utm_medium=cpc&utm_campaign=formatacao_cwb&gclid=Cj0TESTE123");
  await page.waitForSelector('html[data-hydrated="1"]');
  await page.waitForTimeout(1500);
  const hrefs = await page.locator('a[href*="wa.me"], a[href*="api.whatsapp.com"]').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute("href")));
  console.log("HREFS", JSON.stringify(hrefs.slice(0, 3), null, 1));
});
