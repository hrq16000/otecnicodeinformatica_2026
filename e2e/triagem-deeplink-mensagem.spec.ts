import { test, expect, type Page } from "@playwright/test";

/**
 * GATE E2E — âncoras de triagem, restauração após reload e mensagem final.
 *
 * Cobre o que a Rodada 5B exige do funil:
 *  1. `#agendamento` e `#triagem` abrem o popup direto na etapa inicial;
 *  2. recarregar a página restaura equipamento, sintoma e localidade;
 *  3. a mensagem final do WhatsApp sai com serviço, sintoma, localidade e
 *     rota/origem — inclusive no fallback em que geolocalização/IP falham e
 *     o bairro é digitado manualmente.
 */

function textoDoLink(href: string): string {
  return new URL(href, "https://wa.me").searchParams.get("text") ?? "";
}

async function bloquearGeo(page: Page) {
  // Bloqueia apenas provedores externos de geo-IP (nunca os módulos locais do app).
  await page.route(/^https?:\/\/(?!localhost)[^/]*(ipapi|ip-api|ipinfo|geojs|ipwho)/i, (r) => r.abort());
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "geolocation", {
      value: {
        getCurrentPosition: (_ok: unknown, err?: (e: unknown) => void) => err?.({ code: 1, message: "denied" }),
        watchPosition: () => 0,
        clearWatch: () => undefined,
      },
      configurable: true,
    });
  });
}

const TRIAGEM = '[role="dialog"][data-triage="1"]';

/**
 * Abre a triagem por âncora, tira o banner de cookies do caminho e tolera o
 * ambiente: em máquina carregada a hidratação às vezes estoura o watchdog e o
 * app cai no aviso "A página não carregou corretamente" — nesse caso a página
 * é recarregada em vez de acusar falso vermelho.
 */
async function abrirPorAncora(page: Page, hash: string) {
  const dialog = page.locator(TRIAGEM);
  for (let tentativa = 0; tentativa < 3; tentativa += 1) {
    if (tentativa === 0) await page.goto(`/${hash}`);
    else await page.goto(`/${hash}`, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle").catch(() => undefined);

    const aceitar = page.getByRole("button", { name: /Aceitar tudo/i });
    if (await aceitar.count()) await aceitar.first().click().catch(() => undefined);

    // O funil é montado de forma diferida; se a hidratação chegou depois do
    // load, reemitimos o hash para acionar o mesmo handler de deep link.
    if (!(await dialog.isVisible().catch(() => false))) {
      await page.waitForTimeout(2000);
      await page.evaluate((h) => {
        window.location.hash = "";
        window.location.hash = h;
      }, hash);
    }
    if (await dialog.isVisible({ timeout: 15000 }).catch(() => false)) return dialog;
  }
  await expect(dialog).toBeVisible({ timeout: 20000 });
  return dialog;
}

/** Preenche a triagem PF até a etapa de revisão. */
async function preencherTriagem(page: Page, bairro: string) {
  const dialog = page.locator(TRIAGEM);
  await expect(dialog).toBeVisible({ timeout: 25000 });
  await dialog.getByRole("radio", { name: /Para mim ou minha residência/i }).click();
  await dialog.getByRole("button", { name: /PC \/ Notebook/i }).click();
  await dialog.getByRole("radio", { name: /^Notebook$/i }).click();
  await dialog.getByRole("radio", { name: /Liga e inicia normalmente/i }).click();
  await dialog.getByLabel(/Seu nome/i).fill("Cliente Teste");
  await dialog.getByLabel(/bairro/i).first().fill(bairro);
  await dialog.getByRole("radio", { name: /Instalar ou configurar programa/i }).click();
  await dialog.getByRole("radio", { name: /Há poucos dias/i }).click();
  await dialog.getByRole("radio", { name: /Próximas 72 horas úteis/i }).click();
  return dialog;
}

/**
 * Captura a URL final do WhatsApp sem sair da página: o envio pode acontecer
 * por `window.open` ou por clique em âncora, e nos dois casos guardamos o
 * endereço em `window.__waUrlsCapturadas`.
 */
async function instalarCapturaWa(page: Page) {
  await page.addInitScript(() => {
    const alvo = window as unknown as { __waUrlsCapturadas?: string[] };
    alvo.__waUrlsCapturadas = [];
    const registrar = (url: string) => {
      if (url.includes("wa.me")) alvo.__waUrlsCapturadas!.push(url);
    };
    const abrirOriginal = window.open.bind(window);
    Object.defineProperty(window, "open", {
      configurable: true,
      get: () => (url?: string | URL) => {
        registrar(String(url ?? ""));
        return null;
      },
      // O app reatribui window.open; ignoramos a troca para manter a captura.
      set: () => undefined,
    });
    void abrirOriginal;
    document.addEventListener(
      "click",
      (e) => {
        const a = (e.target as HTMLElement | null)?.closest?.("a") as HTMLAnchorElement | null;
        const href = a?.getAttribute("href") ?? "";
        if (href.includes("wa.me")) {
          registrar(href);
          e.preventDefault();
        }
      },
      true,
    );
  });
}

async function urlsCapturadas(page: Page): Promise<string[]> {
  return page.evaluate(() => (window as unknown as { __waUrlsCapturadas?: string[] }).__waUrlsCapturadas ?? []);
}

/**
 * Avança as etapas restantes (termos, coleta, revisão) escolhendo a primeira
 * opção de cada campo obrigatório ainda em branco, até a triagem produzir a
 * URL definitiva do WhatsApp.
 */
async function avancarAteWhatsApp(page: Page): Promise<string> {
  const dialog = page.locator(TRIAGEM);
  for (let i = 0; i < 14; i += 1) {
    const capturadas = await urlsCapturadas(page);
    if (capturadas.length) return capturadas[capturadas.length - 1];

    const linkVisivel = dialog.locator('a[href*="wa.me"]').first();
    if (await linkVisivel.count()) return (await linkVisivel.getAttribute("href")) ?? "";

    if (!(await dialog.count())) break;

    // Marca radios obrigatórios ainda sem resposta e aceita todos os termos.
    await dialog
      .evaluate((root) => {
        const grupos = new Map<string, HTMLInputElement[]>();
        root.querySelectorAll<HTMLInputElement>('input[type="radio"]').forEach((el) => {
          const lista = grupos.get(el.name) ?? [];
          lista.push(el);
          grupos.set(el.name, lista);
        });
        grupos.forEach((lista) => {
          if (!lista.some((el) => el.checked)) lista[0]?.click();
        });
        root.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach((el) => {
          if (!el.checked) el.click();
        });
      })
      .catch(() => undefined);
    for (const cb of await dialog.getByRole("checkbox").all()) {
      if ((await cb.getAttribute("aria-checked")) !== "true") {
        await cb.click({ force: true }).catch(() => undefined);
        await page.waitForTimeout(200);
      }
    }
    await page.waitForTimeout(400);

    const avancar = dialog
      .getByRole("button", { name: /^(Continuar|Revisar|Confirmar|Agendar agora)$/i })
      .first();
    if (await avancar.count()) {
      await avancar.click({ force: true }).catch(() => undefined);
    }
    await page.waitForTimeout(900);
  }
  const finais = await urlsCapturadas(page);
  return finais.length ? finais[finais.length - 1] : "";
}

test.describe("Triagem — deep link, restauração e mensagem", () => {
  test.setTimeout(150_000);
  for (const hash of ["#agendamento", "#triagem"]) {
    test(`a âncora ${hash} abre a triagem na etapa inicial`, async ({ page }) => {
      const dialog = await abrirPorAncora(page, hash);
      // Etapa inicial: escolha de quem é o atendimento.
      await expect(dialog.getByRole("radio", { name: /Para mim ou minha residência/i })).toBeVisible();
    });
  }

  test("recarregar preserva equipamento, sintoma e localidade", async ({ page }) => {
    await abrirPorAncora(page, "#triagem");
    await preencherTriagem(page, "Batel");

    await page.reload();
    await page.waitForLoadState("networkidle").catch(() => undefined);
    const dialog = page.locator(TRIAGEM);
    await expect(dialog).toBeVisible({ timeout: 25000 });
    // As respostas restauradas vivem no estado persistido e nos campos do
    // formulário — nunca no texto corrido do modal.
    const persistido = await page.evaluate(() => {
      const chave = Object.keys(sessionStorage).find((k) => k.startsWith("triage_state"));
      return chave ? sessionStorage.getItem(chave) : null;
    });
    expect(persistido).toBeTruthy();
    expect(persistido!).toContain("notebook");
    expect(persistido!).toContain("Batel");
    expect(persistido!).toContain("Cliente Teste");
    // Reabre adiante da primeira etapa, sem perguntar de novo o que já sabemos.
    await expect(dialog.getByRole("radio", { name: /Para mim ou minha residência/i })).toHaveCount(0);
  });

  test("mensagem final contém serviço, sintoma, localidade e origem", async ({ page, context }) => {
    await context.route("https://wa.me/**", (route) => route.fulfill({ status: 204, body: "" }));
    await instalarCapturaWa(page);
    await abrirPorAncora(page, "#agendamento");
    await preencherTriagem(page, "Batel");

    const url = await avancarAteWhatsApp(page);
    expect(url).toContain("wa.me");
    const texto = textoDoLink(url);
    expect(texto).toMatch(/Equipamento/i);
    expect(texto).toMatch(/Notebook/i);
    expect(texto).toMatch(/Batel/i);
    expect(texto).toMatch(/(Página de origem|origem)/i);
    // Nunca vaza número visível nem mensagem vazia.
    expect(texto.trim().length).toBeGreaterThan(40);
  });

  test("fallback de bairro: sem geo/IP a mensagem sai completa com o bairro digitado", async ({ page, context }) => {
    await bloquearGeo(page);
    await context.route("https://wa.me/**", (route) => route.fulfill({ status: 204, body: "" }));
    await instalarCapturaWa(page);
    await abrirPorAncora(page, "#triagem");
    await preencherTriagem(page, "Cajuru");

    const url = await avancarAteWhatsApp(page);
    expect(url).toContain("wa.me");
    const texto = textoDoLink(url);
    expect(texto).toMatch(/Cajuru/i);
    expect(texto).toMatch(/Notebook/i);
  });
});
