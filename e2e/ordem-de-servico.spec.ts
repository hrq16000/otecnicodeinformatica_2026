import { expect, test } from "@playwright/test";

/**
 * Cobertura da Ordem de Serviço:
 * modalidade automática, aceite de termos, código único, deep link do
 * WhatsApp e restauração do rascunho após recarregar.
 */

const preencherEstavel = async (
  page: import("@playwright/test").Page,
  equipamento: string,
  defeito: string,
) => {
  // O bundle da rota chega depois do SSR e remonta a árvore: só damos o
  // formulário por preenchido quando os valores sobrevivem à remontagem.
  await expect(async () => {
    await page.getByLabel("Seu nome").fill("Cliente Teste");
    await page.getByLabel("Equipamento", { exact: true }).fill(equipamento);
    await page.getByLabel("O que está acontecendo").fill(defeito);
    await page.waitForTimeout(2500);
    await expect(page.getByLabel("Equipamento", { exact: true })).toHaveValue(equipamento, {
      timeout: 2000,
    });
    await expect(page.getByLabel("O que está acontecendo")).toHaveValue(defeito, { timeout: 2000 });
  }).toPass({ timeout: 45_000 });
};

const preencher = preencherEstavel;

const aceitarTudo = async (page: import("@playwright/test").Page) => {
  // Cada aceite vive dentro de um item do acordeão: abrir, ler, marcar.
  const gatilhos = page.locator('[data-testid="os-termos"] button[data-state]');
  const total = await gatilhos.count();
  for (let i = 0; i < total; i += 1) {
    const gatilho = gatilhos.nth(i);
    if ((await gatilho.getAttribute("data-state")) === "closed") await gatilho.click();
  }
  const caixas = page.locator('[id^="aceite-"]');
  const quantidade = await caixas.count();
  for (let i = 0; i < quantidade; i += 1) {
    const caixa = caixas.nth(i);
    await caixa.scrollIntoViewIfNeeded();
    await caixa.click();
  }
};

test.beforeEach(async ({ page }) => {
  await page.goto("/ordem-de-servico");
  await page.evaluate(() => window.localStorage.removeItem("os_draft_v1"));
  await page.reload();
});

test("serviço rápido com equipamento ligando cai em visita técnica", async ({ page }) => {
  await preencher(page, "Notebook Dell", "Quero upgrade de memória e um SSD novo");
  await expect(page.getByTestId("os-modalidade")).toHaveAttribute("data-modalidade", "visita");
  await expect(page.getByTestId("os-modalidade")).toContainText("R$ 99,99");
});

test("TV e equipamento que não liga vão para laboratório", async ({ page }) => {
  await preencher(page, "TV Samsung 50", "Não liga, só acende o LED vermelho");
  await expect(page.getByTestId("os-modalidade")).toHaveAttribute("data-modalidade", "laboratorio");
  await expect(page.getByTestId("os-modalidade")).toContainText("R$ 299,99");
});

test("envio só libera após o aceite de todos os termos", async ({ page }) => {
  await preencher(page, "Notebook Dell", "Formatação e instalação do Windows");
  const enviar = page.getByRole("button", { name: /Enviar esta O.S no WhatsApp/i });
  await expect(enviar).toBeDisabled();
  await aceitarTudo(page);
  await expect(enviar).toBeEnabled();
});

test("gera código único no formato OS-OTI-AAAAMMDD-0000 e resumo com os aceites", async ({ page }) => {
  await preencher(page, "Notebook Dell", "Formatação e instalação do Windows");
  await aceitarTudo(page);
  await page.getByRole("button", { name: /Copiar resumo/i }).click();

  const documento = page.getByTestId("os-documento");
  await expect(documento).toBeVisible();
  await expect(documento).toContainText(/OS-OTI-\d{8}-\d{4}/);
  await expect(documento).toContainText("Condições aceitas");
  await expect(documento).toContainText("Modalidade:");
});

test("deep link do WhatsApp abre a triagem com a mensagem da O.S", async ({ page }) => {
  await page.addInitScript(() => {
    (window as unknown as { __waEvents: unknown[] }).__waEvents = [];
    window.addEventListener("wa-funnel:open", (e) => {
      (window as unknown as { __waEvents: unknown[] }).__waEvents.push(
        (e as CustomEvent<{ message?: string }>).detail?.message ?? "",
      );
    });
  });
  await page.reload();

  await preencher(page, "Notebook Dell", "Formatação e instalação do Windows");
  await aceitarTudo(page);
  await page.getByRole("button", { name: /Enviar esta O.S no WhatsApp/i }).click();

  const mensagens = await page.evaluate(
    () => (window as unknown as { __waEvents: string[] }).__waEvents,
  );
  expect(mensagens.length).toBeGreaterThan(0);
  const msg = mensagens[0]!;
  expect(msg).toMatch(/OS-OTI-\d{8}-\d{4}/);
  expect(msg).toContain("Modalidade:");
  expect(msg).toContain("Notebook Dell");
  expect(msg).toContain("Condições aceitas");
});

test("recarregar a página restaura o rascunho e o código já gerado", async ({ page }) => {
  await preencher(page, "Notebook Dell", "Formatação e instalação do Windows");
  await aceitarTudo(page);
  await page.getByRole("button", { name: /Copiar resumo/i }).click();
  const codigo = (await page.getByTestId("os-documento").innerText()).match(/OS-OTI-\d{8}-\d{4}/)?.[0];
  expect(codigo).toBeTruthy();

  await page.reload();

  await expect(page.getByLabel("Equipamento", { exact: true })).toHaveValue("Notebook Dell");
  await expect(page.getByLabel("O que está acontecendo")).toHaveValue(
    "Formatação e instalação do Windows",
  );
  await expect(page.getByTestId("os-documento")).toContainText(codigo!);
  await expect(page.getByRole("button", { name: /Enviar esta O.S no WhatsApp/i })).toBeEnabled();
});

test("consulta por código rejeita formato inválido", async ({ page }) => {
  await page.waitForTimeout(3000);
  await page.getByRole("tab", { name: /Consultar O.S/i }).click();
  await page.getByLabel("Código único da O.S").fill("1234");
  await page.getByRole("button", { name: /^Consultar$/ }).click();
  await expect(page.getByTestId("consulta-os-codigo")).toContainText("fora do formato esperado");
});
