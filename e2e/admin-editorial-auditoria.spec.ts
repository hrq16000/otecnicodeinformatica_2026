import { expect, test } from "@playwright/test";

/**
 * E2E — painel /admin/editorial-ondas com sessão admin simulada.
 *
 * Cobre: execução sob demanda da auditoria (com rate-limit/dedupe),
 * exportação CSV/JSON, aba de Diffs e histórico navegável.
 * Todos os artefatos são mockados via page.route (mesmo padrão de
 * e2e/admin-paineis.spec.ts) — nenhum dado real é lido.
 */

const ok = (body: unknown) => ({
  status: 200,
  contentType: "application/json",
  body: JSON.stringify(body),
});

const AUDITORIA = {
  wave: "10C",
  geradoEm: "2026-09-01T10:00:00.000Z",
  veredito: "ATENCAO",
  execucao: { responsavel: "ci-bot", origem: "ci", commit: "abc1234def", jobUrl: null },
  kpis: {
    indexacao: { estado: "OK", cobertura: 62 },
    indexnow: { estado: "OK", enviadas: 12 },
    schema: { estado: "ATENCAO", divergencias: 3 },
  },
};

const HISTORICO = {
  geradoEm: "2026-09-01T10:05:00.000Z",
  total: 2,
  motivo: null,
  execucoes: [
    {
      arquivo: "20260901T100000Z.json",
      artefato: "/editorial/10c/history/20260901T100000Z.json",
      wave: "10C",
      geradoEm: "2026-09-01T10:00:00.000Z",
      veredito: "ATENCAO",
      responsavel: "ci-bot",
      origem: "ci",
      commit: "abc1234def",
      jobUrl: "https://example.test/run/1",
      estados: { indexacao: "OK", schema: "ATENCAO" },
    },
    {
      arquivo: "20260831T100000Z.json",
      artefato: "/editorial/10c/history/20260831T100000Z.json",
      wave: "10C",
      geradoEm: "2026-08-31T10:00:00.000Z",
      veredito: "SAUDAVEL",
      responsavel: "maintainer",
      origem: "manual",
      commit: null,
      jobUrl: null,
      estados: { indexacao: "OK", schema: "OK" },
    },
  ],
};

test.beforeEach(async ({ page }) => {
  await page.route("**/editorial-audit-10c.json", (r) => r.fulfill(ok(AUDITORIA)));
  await page.route("**/editorial-audit-delta.json", (r) =>
    r.fulfill(ok({ estado: "BASELINE", geradoEm: AUDITORIA.geradoEm, mudancas: [] })),
  );
  await page.route("**/editorial-audit-history.json", (r) => r.fulfill(ok(HISTORICO)));
  await page.route("**/editorial/10c/history/*.json", (r) => r.fulfill(ok(AUDITORIA)));
  await page.route("**/editorial-*.json", (r) =>
    r.fulfill(ok({ geradoEm: AUDITORIA.geradoEm, disponivel: false, lotes: [], rotas: [], alertas: [] })),
  );
});

test("auditoria sob demanda, exportações, histórico e diffs no painel admin", async ({ page }) => {
  await page.goto("/admin/editorial-ondas");

  // Aba de auditoria: execução sob demanda.
  await page.getByRole("button", { name: "Auditoria (KPIs)" }).click();
  const botao = page.getByTestId("auditoria-sob-demanda");
  await expect(botao).toBeVisible();
  await botao.click();
  await expect(botao).toHaveText(/Executar auditoria agora/, { timeout: 15_000 });

  // Repetir a MESMA execução (mesmo payload) é bloqueado por dedupe.
  await botao.click();
  await expect(page.getByTestId("auditoria-bloqueio")).toBeVisible();

  // Exportações CSV e JSON dos KPIs disparam download.
  for (const rotulo of ["KPIs CSV", "KPIs JSON"]) {
    const download = page.waitForEvent("download");
    await page.getByRole("button", { name: rotulo }).click();
    expect((await download).suggestedFilename()).toMatch(/\.(csv|json)$/);
  }

  // Histórico navegável.
  await page.getByRole("button", { name: "Histórico de execuções" }).click();
  const historico = page.getByTestId("historico-auditoria");
  await expect(historico).toBeVisible();
  await expect(historico.getByText("ci-bot")).toBeVisible();
  await expect(historico.getByRole("link", { name: "JSON" }).first()).toHaveAttribute(
    "href",
    /\/editorial\/10c\/history\//,
  );
  await historico.getByRole("button", { name: "Ver KPIs" }).first().click();
  await expect(page.getByTestId("historico-detalhe")).toBeVisible();

  // Aba de diffs renderiza sem erro.
  await page.getByRole("button", { name: /^Diffs/ }).click();
  await expect(page.getByRole("button", { name: /^Diffs/ })).toBeVisible();
});
