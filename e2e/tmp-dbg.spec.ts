import { test } from "@playwright/test";
import { abrirTriagemPorAncora, avancarAteWhatsApp, instalarCapturaWa, preencherTriagemPf } from "./utils/triagem";
test("dbg", async ({ page }) => {
  test.setTimeout(150000);
  await instalarCapturaWa(page);
  await abrirTriagemPorAncora(page, "/?utm_source=google&utm_medium=cpc&utm_campaign=formatacao_cwb&gclid=Cj0TESTE123#triagem");
  await preencherTriagemPf(page);
  console.log("HREF:", (await avancarAteWhatsApp(page)).slice(0, 500));
});
