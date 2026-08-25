import { test, expect, type Page } from "@playwright/test";

/**
 * GATE E2E — TRACKING DO FUNIL + ESCUDO ANTI-PII.
 *
 * Cobre dois contratos simultâneos:
 *  1. o toque no CTA de WhatsApp emite `wa_funnel_open` e `triage_start`
 *     exatamente uma vez cada (nada de disparo duplicado por buffer de
 *     pré-hidratação nem por reinício do gtag no consentimento);
 *  2. NENHUM payload medido — nem o que vai para a camada de dados nem o que
 *     sai na rede para GA4/GTM — carrega dado pessoal: sem e-mail, sem CPF,
 *     sem telefone, sem nome digitado, sem texto livre da triagem.
 *
 * A leitura é feita na `dataLayer` (o próprio index.html define o stub do
 * gtag, então sobrescrevê-lo seria perdido) e, em paralelo, na rede — toda
 * requisição para domínios de medição é interceptada e inspecionada.
 */

const NOME_DIGITADO = "Fulano De Tal";
const PII = [
  { rotulo: "e-mail", re: /[\w.+-]+@[\w-]+\.[\w.]{2,}/ },
  { rotulo: "CPF", re: /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/ },
  // Telefone só conta como PII quando vem formatado como número brasileiro
  // (com separador ou parênteses); sequências longas de dígitos em IDs de
  // medição não são telefone e gerariam falso vermelho.
  { rotulo: "telefone", re: /(?:\+55\s?)?\(\d{2}\)\s?9?\d{4}[-\s]?\d{4}|\b\d{2}\s9?\d{4}-\d{4}\b/ },
  { rotulo: "nome digitado", re: new RegExp(NOME_DIGITADO, "i") },
];

// Só endpoints de medição próprios: requisições de anúncio (doubleclick) não
// carregam payload do site e seus IDs numéricos gerariam falso positivo.
const DOMINIOS_MEDICAO = /(google-analytics\.com|analytics\.google\.com|googletagmanager\.com)/;

interface Espionagem {
  eventos: string[];
  payloads: string[];
}

async function instalarEspiaoDataLayer(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as { __gtagCalls: unknown[][]; dataLayer: unknown[] };
    w.__gtagCalls = [];
    const layer: unknown[] = [];
    const push = layer.push.bind(layer);
    layer.push = (...items: unknown[]) => {
      // O stub do gtag empurra `arguments` (array-like), não um array.
      for (const item of items) w.__gtagCalls.push(Array.from(item as ArrayLike<unknown>));
      return push(...items);
    };
    w.dataLayer = layer;
  });
}

async function lerDataLayer(page: Page): Promise<Espionagem> {
  return page.evaluate(() => {
    const chamadas = (window as unknown as { __gtagCalls?: unknown[][] }).__gtagCalls ?? [];
    return {
      eventos: chamadas.filter((c) => c[0] === "event").map((c) => String(c[1])),
      payloads: chamadas.map((c) => JSON.stringify(c)),
    };
  });
}

/** Coleta as URLs/corpos enviados aos endpoints de medição, sem deixá-los sair. */
function interceptarRede(page: Page): string[] {
  const capturado: string[] = [];
  page.route(DOMINIOS_MEDICAO, async (route) => {
    const req = route.request();
    capturado.push(req.url());
    const corpo = req.postData();
    if (corpo) capturado.push(corpo);
    await route.fulfill({ status: 204, body: "" });
  });
  return capturado;
}

function assertSemPii(amostras: string[], contexto: string) {
  for (const amostra of amostras) {
    for (const { rotulo, re } of PII) {
      expect(re.test(amostra), `${contexto} vazou ${rotulo}: ${amostra.slice(0, 300)}`).toBe(false);
    }
  }
}

test.describe("tracking do funil — contrato de eventos e anti-PII", () => {
  test.setTimeout(120_000);

  test("wa_funnel_open e triage_start disparam uma única vez, sem PII", async ({ page }) => {
    const rede = interceptarRede(page);
    await instalarEspiaoDataLayer(page);

    await page.goto("/");
    await page.waitForLoadState("networkidle").catch(() => undefined);
    const aceitar = page.getByRole("button", { name: /Aceitar tudo/i });
    if (await aceitar.count()) await aceitar.first().click().catch(() => undefined);

    const float = page.getByTestId("whatsapp-float");
    await expect(float).toBeVisible({ timeout: 20000 });
    await float.click();
    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(800);

    const { eventos, payloads } = await lerDataLayer(page);
    expect(eventos.filter((e) => e === "wa_funnel_open"), `eventos: ${eventos.join(",")}`).toHaveLength(1);
    expect(eventos.filter((e) => e === "triage_start")).toHaveLength(1);

    assertSemPii(payloads, "camada de dados");
    assertSemPii(rede, "requisição de medição");
  });

  test("nada do que é digitado na triagem entra na medição", async ({ page }) => {
    const rede = interceptarRede(page);
    await instalarEspiaoDataLayer(page);

    await page.goto("/#triagem", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle").catch(() => undefined);
    const aceitar = page.getByRole("button", { name: /Aceitar tudo/i });
    if (await aceitar.count()) await aceitar.first().click().catch(() => undefined);

    const dialog = page.locator('[role="dialog"][data-triage="1"]');
    if (!(await dialog.isVisible().catch(() => false))) {
      await page.evaluate(() => {
        window.location.hash = "";
        window.location.hash = "#triagem";
      });
    }
    await expect(dialog).toBeVisible({ timeout: 25000 });

    const campoNome = dialog.getByLabel(/Seu nome/i).first();
    if (await campoNome.count()) await campoNome.fill(NOME_DIGITADO);
    const campoBairro = dialog.getByLabel(/bairro/i).first();
    if (await campoBairro.count()) await campoBairro.fill("Batel");
    await page.waitForTimeout(800);

    const { payloads } = await lerDataLayer(page);
    assertSemPii(payloads, "camada de dados após digitação");
    assertSemPii(rede, "requisição de medição após digitação");
  });
});
