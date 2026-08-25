import { readFileSync } from "node:fs";
import { test, expect } from "@playwright/test";

/**
 * GATE E2E — PAINÉIS ADMINISTRATIVOS.
 *
 * O snapshot do Search Console é injetado por mock (`/index-status.json`), o
 * que torna o teste determinístico e independente de API externa:
 *  1. `/admin/indexacao` precisa acusar bloqueio por robots, conflito de
 *     canonical e rotas rastreadas sem indexação;
 *  2. a exportação CSV precisa baixar arquivo não vazio e com cabeçalho real;
 *  3. a exportação PDF precisa abrir a janela de impressão do relatório;
 *  4. `/admin/bairros` precisa exportar a malha em CSV.
 */

const SNAPSHOT = {
  geradoEm: new Date().toISOString(),
  site: "https://otecnicodeinformatica.com.br",
  disponivel: true,
  rotas: [
    {
      path: "/servicos/formatacao",
      url: "https://otecnicodeinformatica.com.br/servicos/formatacao",
      cluster: "servicos",
      impressoes28d: 120,
      cliques28d: 8,
      posicao28d: 14.2,
      google: {
        status: "INDEXED",
        coverageState: "Submitted and indexed",
        robotsTxtState: "ALLOWED",
        ultimoCrawl: new Date().toISOString(),
        canonicalGoogle: "https://otecnicodeinformatica.com.br/servicos/formatacao",
      },
    },
    {
      path: "/bloqueada-teste",
      url: "https://otecnicodeinformatica.com.br/bloqueada-teste",
      cluster: "teste",
      impressoes28d: "NO_DATA",
      cliques28d: "NO_DATA",
      google: { status: "CRAWLED_NOT_INDEXED", coverageState: "Blocked by robots.txt", robotsTxtState: "BLOCKED" },
    },
    {
      path: "/canonical-conflito-teste",
      url: "https://otecnicodeinformatica.com.br/canonical-conflito-teste",
      cluster: "teste",
      impressoes28d: 3,
      cliques28d: 0,
      google: {
        status: "DISCOVERED_NOT_INDEXED",
        robotsTxtState: "ALLOWED",
        canonicalGoogle: "https://otecnicodeinformatica.com.br/",
      },
    },
  ],
  bing: { webmasterTools: "VERIFIED", sitemapDeclaradoNoRobots: true },
  indexnow: null,
};

test.describe("painéis /admin", () => {
  test.setTimeout(120_000);

  test("indexação: alertas críticos e exportações", async ({ page }) => {
    await page.route("**/index-status.json", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(SNAPSHOT) }),
    );
    // Snapshots opcionais ausentes: o painel precisa seguir sem eles.
    for (const arquivo of ["rich-results-monitor.json", "ssr-diff-status.json", "observacao-2-cohorts.json"]) {
      await page.route(`**/${arquivo}`, (route) => route.fulfill({ status: 404, body: "" }));
    }

    await page.goto("/admin/indexacao");

    await page.waitForSelector('html[data-hydrated="1"]', { timeout: 30000 }).catch(() => undefined);
    const alertas = page.getByTestId("alertas-criticos");
    await expect(alertas).toBeVisible({ timeout: 20000 });
    await expect(page.getByTestId("alerta-robots-blocked")).toContainText("/bloqueada-teste");
    await expect(page.getByTestId("alerta-canonical-conflito")).toContainText("/canonical-conflito-teste");
    await expect(page.getByTestId("alerta-nao-indexadas")).toContainText("2");

    // CSV: arquivo real, não vazio e com as colunas esperadas.
    const download = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("button", { name: /Exportar CSV/i }).click(),
    ]).then(([d]) => d);
    expect(download.suggestedFilename()).toMatch(/^indexacao-por-url-.*\.csv$/);
    const caminho = await download.path();
    expect(caminho, "download sem arquivo em disco").toBeTruthy();
    const conteudo = readFileSync(caminho as string, "utf8");
    expect(conteudo.length).toBeGreaterThan(50);
    expect(conteudo.split("\n")[0]).toContain("path");
    expect(conteudo).toContain("/bloqueada-teste");

    // PDF: a exportação abre a janela de impressão com o relatório clonado.
    const popup = await Promise.all([
      page.context().waitForEvent("page"),
      page.getByRole("button", { name: /Exportar PDF/i }).click(),
    ]).then(([p]) => p);
    await expect.poll(() => popup.title()).toContain("Indexação");
    await popup.close();
  });

  test("bairros: exportação CSV da malha", async ({ page }) => {
    await page.goto("/admin/bairros");
    await expect(page.getByRole("heading", { name: /Malha de bairros/i })).toBeVisible({ timeout: 20000 });
    // O botão só funciona depois da hidratação: clicar antes deixa o teste
    // esperando um download que nunca acontece.
    await page.waitForSelector('html[data-hydrated="1"]', { timeout: 30000 });
    await expect
      .poll(() => page.locator("tbody tr").count(), { timeout: 20000 })
      .toBeGreaterThan(10);

    const download = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("button", { name: /Exportar CSV/i }).click(),
    ]).then(([d]) => d);
    expect(download.suggestedFilename()).toMatch(/^malha-bairros-.*\.csv$/);
    const conteudo = readFileSync((await download.path()) as string, "utf8");
    expect(conteudo.split("\n")[0]).toContain("contentStatus");
    expect(conteudo.split("\n").length).toBeGreaterThan(10);
  });
});
