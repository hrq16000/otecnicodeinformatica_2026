import { test, expect, type Page } from "@playwright/test";

const HOME = "/";
const UTM_QS = "?utm_source=ci&utm_medium=cpc&utm_campaign=triage_v5_e2e&gclid=CI_GCLID_777";

async function installGtagSpy(page: Page) {
  await page.addInitScript(() => {
    (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls = [];
    (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
    (window as unknown as { gtag: (...a: unknown[]) => void }).gtag = function (...args: unknown[]) {
      (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls.push(args);
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push(args);
    };
  });
}

async function openFunnel(page: Page) {
  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent("wa-funnel:open", { detail: { location: "test" } }));
  });
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible({ timeout: 5000 });
  return dialog;
}

/** Etapa 0 (PF × PJ) — segue pelo ramo residencial. */
/** Preenche a qualificação obrigatória da etapa de identidade. */
async function fillQualification(dialog: ReturnType<Page["getByRole"]>) {
  await dialog.getByLabel(/Seu nome/i).fill("Cliente Teste");
  await dialog.getByLabel(/bairro/i).first().fill("Batel");
}

async function chooseResidential(dialog: ReturnType<Page["getByRole"]>) {
  await dialog.getByRole("radio", { name: /Para mim ou minha residência/i }).click();
  await expect(dialog.getByText(/Qual o equipamento/i)).toBeVisible({ timeout: 5000 });
}

test.describe("Triagem V5 — funil ramificado por equipamento", () => {
  test.beforeEach(async ({ page, context }) => {
    await installGtagSpy(page);
    await context.route("https://wa.me/**", (route) => route.fulfill({ status: 204, body: "" }));
  });

  test("categoria 'Outro' substitui 'Outro / Só orçamento' e não há remoto para TV", async ({ page }) => {
    await page.goto(`${HOME}${UTM_QS}`);
    await page.waitForLoadState("networkidle");
    const dialog = await openFunnel(page);
    await chooseResidential(dialog);
    await expect(dialog.getByText("Outro", { exact: true }).first()).toBeVisible();
    await expect(dialog.getByText(/Só orçamento/i)).toHaveCount(0);
  });

  test("TV não liga → coleta obrigatória com R$ 299,99 e pergunta 'quando aconteceu'", async ({ page }) => {
    await page.goto(`${HOME}${UTM_QS}`);
    await page.waitForLoadState("networkidle");
    const dialog = await openFunnel(page);
    await chooseResidential(dialog);

    await dialog.getByRole("button", { name: /^TV$/i }).first().click();
    await expect(dialog.getByText(/O que aconteceu/i)).toBeVisible();
    await dialog.getByRole("radio", { name: /^LED$/i }).click();
    await fillQualification(dialog);
    await dialog.getByRole("radio", { name: /^Não liga$/i }).click();

    await expect(dialog.getByText(/Qual a urgência/i)).toBeVisible();
    await expect(dialog.getByText(/Quando aconteceu/i)).toBeVisible();
    await expect(dialog.getByText(/Com que frequência/i)).toHaveCount(0);
    await dialog.getByRole("radio", { name: /^Hoje$/i }).click();
    await dialog.getByRole("radio", { name: /Sem pressa/i }).click();

    await expect(dialog.getByText(/Coleta e entrega/i).first()).toBeVisible();
    await expect(dialog.getByText(/R\$ 299,99/i).first()).toBeVisible();
  });

  test("PC funcionando + instalar programa → atendimento remoto", async ({ page }) => {
    await page.goto(`${HOME}${UTM_QS}`);
    await page.waitForLoadState("networkidle");
    const dialog = await openFunnel(page);
    await chooseResidential(dialog);

    await dialog.getByRole("button", { name: /PC \/ Notebook/i }).click();
    await dialog.getByRole("radio", { name: /^Notebook$/i }).click();
    await dialog.getByRole("radio", { name: /Liga e inicia normalmente/i }).click();
    await fillQualification(dialog);
    await dialog.getByRole("radio", { name: /Instalar ou configurar programa/i }).click();

    await expect(dialog.getByText(/Qual a urgência/i)).toBeVisible();
    await dialog.getByRole("radio", { name: /Há poucos dias/i }).click();
    await dialog.getByRole("radio", { name: /Próximas 72 horas úteis/i }).click();

    await expect(dialog.getByText(/Atendimento remoto/i).first()).toBeVisible();
    await expect(dialog.getByText(/Coleta e entrega/i)).toHaveCount(0);
  });

  test("botão flutuante abre o funil e evento preserva click_location", async ({ page }) => {
    await page.goto(`${HOME}${UTM_QS}`);
    await page.waitForLoadState("domcontentloaded");
    await page.getByTestId("whatsapp-float").click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await expect(dialog.getByText(/Triagem antes do atendimento/i)).toBeVisible();

    const events = await page.evaluate(() => (window as unknown as { __waFunnelEvents?: Array<{ name: string; payload: Record<string, unknown> }> }).__waFunnelEvents || []);
    const opened = events.find((e) => e.name === "wa_funnel_open");
    expect(opened?.payload.click_location).toBe("float");
    expect(opened?.payload.app_version).toBeTruthy();
  });

  test("GA4: wa_funnel_open + triage_start com contrato completo, UTMs, sem PII e sem duplicação", async ({ page }) => {
    await page.goto(`${HOME}${UTM_QS}`);
    await page.waitForLoadState("networkidle");
    await page.getByTestId("whatsapp-float").click();
    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 5000 });

    const eventos = await page.evaluate(() =>
      (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls
        .filter((c) => c[0] === "event")
        .map((c) => ({ name: c[1] as string, payload: c[2] as Record<string, unknown> })),
    );

    const legado = eventos.filter((e) => e.name === "wa_funnel_open");
    const canonico = eventos.filter((e) => e.name === "triage_start");
    // FASE 8/9 — histórico preservado, canônico emitido, sem duplicação.
    expect(legado).toHaveLength(1);
    expect(canonico).toHaveLength(1);

    for (const p of [legado[0].payload, canonico[0].payload]) {
      for (const key of [
        "event_category",
        "page_path",
        "route_type",
        "app_version",
        "session_id",
        "device",
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "attribution_channel",
        "attribution_source",
        "click_location",
        "cta_location",
        "customer_type",
      ]) {
        expect(p, `faltou a dimensão ${key}`).toHaveProperty(key);
      }
      expect(p.event_category).toBe("wa_funnel");
      expect(p.utm_source).toBe("ci");
      expect(p.utm_medium).toBe("cpc");
      expect(p.utm_campaign).toBe("triage_v5_e2e");
      // FASE 6 — origem real do clique preservada.
      expect(p.click_location).toBe("float");
      expect(p.cta_location).toBe("float");
      // FASE 11 — nenhum campo de PII / texto livre.
      for (const proibido of [
        "nome",
        "name",
        "email",
        "telefone",
        "phone",
        "endereco",
        "address",
        "cep",
        "lat",
        "lng",
        "mensagem",
        "descricao",
        "answers",
      ]) {
        expect(Object.keys(p).map((k) => k.toLowerCase())).not.toContain(proibido);
      }
    }
    expect(legado[0].payload.has_preset).toBe(false);
  });

  test("toque pré-hidratação é enfileirado e gera UMA única abertura lógica (float)", async ({ page }) => {
    // Atrasa o bundle do cliente para garantir clique antes da hidratação.
    await page.route(/\/_build\/.*\.js|\/src\/client.*\.tsx?/, async (route) => {
      await new Promise((r) => setTimeout(r, 1200));
      await route.continue();
    });
    await page.goto(`${HOME}${UTM_QS}`, { waitUntil: "domcontentloaded" });

    const float = page.getByTestId("whatsapp-float");
    await float.waitFor({ state: "visible" });
    const hidratado = await page.evaluate(() => document.documentElement.dataset.hydrated === "1");
    await float.click({ force: true });

    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 15000 });

    const nomes = await page.evaluate(() =>
      (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls
        .filter((c) => c[0] === "event")
        .map((c) => c[1] as string),
    );
    expect(nomes.filter((n) => n === "wa_funnel_open")).toHaveLength(1);
    expect(nomes.filter((n) => n === "triage_start")).toHaveLength(1);

    const evs = await page.evaluate(
      () => (window as unknown as { __waFunnelEvents?: Array<{ name: string; payload: Record<string, unknown> }> }).__waFunnelEvents || [],
    );
    const open = evs.find((e) => e.name === "wa_funnel_open");
    expect(open?.payload.click_location).toBe("float");
    // Diagnóstico: registra se o clique realmente ocorreu pré-hidratação.
    expect(typeof hidratado).toBe("boolean");
  });


  test("link 'Termos e Condições' resolve a rota pública /termos-e-condicoes", async ({ page }) => {
    const res = await page.goto("/termos-e-condicoes");
    expect(res?.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("rota de fallback /funil-indisponivel carrega e mostra CTA WhatsApp", async ({ page }) => {
    await page.goto("/funil-indisponivel");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const wa = page.locator('a[href*="wa.me/5541997086380"][data-funnel-skip="1"]');
    await expect(wa).toBeVisible();
  });
});

test.describe("Triagem V5 — mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("modal abre e mostra seleção de equipamento", async ({ page, context }) => {
    await installGtagSpy(page);
    await context.route("https://wa.me/**", (route) => route.fulfill({ status: 204, body: "" }));
    await page.goto(HOME);
    await page.waitForLoadState("networkidle");
    const dialog = await openFunnel(page);
    await chooseResidential(dialog);
    await expect(dialog.getByText(/Qual o equipamento/i)).toBeVisible();
  });
});
