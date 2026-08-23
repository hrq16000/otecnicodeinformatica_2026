import { test } from "@playwright/test";
test("capture", async ({ page }) => {
  await page.addInitScript(() => {
    (window as any).__calls = [];
    (window as any).dataLayer = [];
    (window as any).gtag = (...a: unknown[]) => (window as any).__calls.push(a);
  });
  await page.goto("/?utm_source=ci&utm_medium=cpc&utm_campaign=triage_v5_e2e&gclid=CI_GCLID_777", { waitUntil: "domcontentloaded" });
  await page.getByTestId("whatsapp-float").click();
  await page.getByRole("dialog").waitFor();
  await page.waitForTimeout(800);
  const calls = await page.evaluate(() => (window as any).__calls);
  console.log("CAPTURE_JSON " + JSON.stringify(calls.filter((c: any[]) => c[0] === "event")));
});
