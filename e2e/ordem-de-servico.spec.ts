import { expect, test } from "@playwright/test";

/**
 * Cobertura da Ordem de Serviço:
 * modalidade automática, aceite de termos, código único, deep link do
 * WhatsApp e restauração do rascunho após recarregar.
 */

const preencher = async (
  page: import("@playwright/test").Page,
  equipamento: string,
  defeito: string,
) => {
  // O buffer de pré-hidratação garante que o que é digitado antes do React
  // assumir o DOM seja reaplicado: preencher direto tem de bastar.
  await page.getByLabel("Seu nome").fill("Cliente Teste");
  await page.getByLabel("Equipamento", { exact: true }).fill(equipamento);
  await page.getByLabel("O que está acontecendo").fill(defeito);
  await expect(page.getByLabel("Equipamento", { exact: true })).toHaveValue(equipamento);
  await expect(page.getByLabel("O que está acontecendo")).toHaveValue(defeito);
};

const aceitarTudo = async (page: import("@playwright/test").Page) => {
  // O acordeão só reage com o React ativo, e a lista de blocos muda junto com
  // a modalidade: esperamos o sinal real de hidratação (nunca tempo fixo) e
  // reavaliamos a lista a cada passo, até não restar bloco fechado nem aceite.
  await page.locator('html[data-hydrated="1"]').waitFor({ state: "attached" });
  const termos = page.getByTestId("os-termos");
  await expect(termos.locator("button[data-state]").first()).toBeVisible();

  await expect(async () => {
    const fechados = termos.locator('button[data-state="closed"]');
    const total = await fechados.count();
    for (let i = 0; i < total; i += 1) await fechados.first().click();
    await expect(termos.locator('button[data-state="closed"]')).toHaveCount(0, { timeout: 2000 });
  }).toPass({ timeout: 20_000 });

  await expect(async () => {
    const pendentes = page.locator('[id^="aceite-"][data-state="unchecked"]');
    const total = await pendentes.count();
    for (let i = 0; i < total; i += 1) {
      const caixa = pendentes.first();
      await caixa.scrollIntoViewIfNeeded();
      await caixa.click();
    }
    await expect(page.locator('[id^="aceite-"][data-state="unchecked"]')).toHaveCount(0, {
      timeout: 2000,
    });
  }).toPass({ timeout: 20_000 });
};

test.beforeEach(async ({ page }) => {
  await page.goto("/ordem-de-servico");
  await page.evaluate(() => {
    window.localStorage.removeItem("os_draft_v1");
    // O banner de consentimento cobre o rodapé no viewport mobile: registramos
    // uma escolha prévia para testar a O.S., não o banner.
    window.localStorage.setItem(
      "lgpd_consent_v2",
      JSON.stringify({ analytics: false, ads: false, version: "2026-08-08", at: Date.now() }),
    );
  });
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
  await page.getByRole("tab", { name: /Consultar O.S/i }).click();
  await page.getByLabel("Código único da O.S").fill("1234");
  await page.getByRole("button", { name: /^Consultar$/ }).click();
  await expect(page.getByTestId("consulta-os-codigo")).toContainText("fora do formato esperado");
});
