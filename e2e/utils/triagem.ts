import { expect, type Page } from "@playwright/test";

/**
 * Utilitários compartilhados de triagem para as suítes E2E.
 *
 * Mesma mecânica já validada em `triagem-deeplink-mensagem.spec.ts`, extraída
 * aqui para que novas suítes (tracking e deep link com UTM) não dupliquem a
 * navegação do funil nem divirjam do comportamento real do app.
 */

export const TRIAGEM = '[role="dialog"][data-triage="1"]';

/** Abre a triagem por âncora, tolerando hidratação tardia do funil. */
export async function abrirTriagemPorAncora(page: Page, url: string) {
  const dialog = page.locator(TRIAGEM);
  const hash = `#${url.split("#")[1] ?? "triagem"}`;
  for (let tentativa = 0; tentativa < 3; tentativa += 1) {
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle").catch(() => undefined);

    const aceitar = page.getByRole("button", { name: /Aceitar tudo/i });
    if (await aceitar.count()) await aceitar.first().click().catch(() => undefined);

    if (!(await dialog.isVisible().catch(() => false))) {
      await page.waitForTimeout(1500);
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

/** Captura toda URL de WhatsApp emitida (window.open ou clique em âncora). */
export async function instalarCapturaWa(page: Page) {
  await page.addInitScript(() => {
    const alvo = window as unknown as { __waUrlsCapturadas?: string[] };
    alvo.__waUrlsCapturadas = [];
    const registrar = (url: string) => {
      if (url.includes("wa.me") || url.includes("api.whatsapp.com")) alvo.__waUrlsCapturadas!.push(url);
    };
    Object.defineProperty(window, "open", {
      configurable: true,
      get: () => (url?: string | URL) => {
        registrar(String(url ?? ""));
        return null;
      },
      set: () => undefined,
    });
    document.addEventListener(
      "click",
      (e) => {
        const a = (e.target as HTMLElement | null)?.closest?.("a") as HTMLAnchorElement | null;
        const href = a?.getAttribute("href") ?? "";
        if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
          registrar(href);
          e.preventDefault();
        }
      },
      true,
    );
  });
}

export const urlsWaCapturadas = (page: Page): Promise<string[]> =>
  page.evaluate(() => (window as unknown as { __waUrlsCapturadas?: string[] }).__waUrlsCapturadas ?? []);

/**
 * Avança a triagem até produzir a URL final do WhatsApp, escolhendo a primeira
 * opção de cada campo obrigatório em branco e aceitando os termos.
 */

/** Preenche a triagem PF pelas etapas conhecidas (mesma sequência já validada). */
export async function preencherTriagemPf(page: Page, nome = "Cliente Teste", bairro = "Batel") {
  const dialog = page.locator(TRIAGEM);
  await expect(dialog).toBeVisible({ timeout: 25000 });
  const tentar = async (fn: () => Promise<void>) => {
    await fn().catch(() => undefined);
    await page.waitForTimeout(250);
  };
  await tentar(() => dialog.getByRole("radio", { name: /Para mim ou minha residência/i }).click());
  await tentar(() => dialog.getByRole("button", { name: /PC \/ Notebook/i }).click());
  await tentar(() => dialog.getByRole("radio", { name: /^Notebook$/i }).click());
  await tentar(() => dialog.getByRole("radio", { name: /Liga e inicia normalmente/i }).click());
  await tentar(() => dialog.getByLabel(/Seu nome/i).fill(nome));
  await tentar(() => dialog.getByLabel(/bairro/i).first().fill(bairro));
  await tentar(() => dialog.getByRole("radio", { name: /Instalar ou configurar programa/i }).click());
  await tentar(() => dialog.getByRole("radio", { name: /Há poucos dias/i }).click());
  await tentar(() => dialog.getByRole("radio", { name: /Próximas 72 horas úteis/i }).click());
  return dialog;
}

export async function avancarAteWhatsApp(page: Page): Promise<string> {
  const dialog = page.locator(TRIAGEM);
  for (let i = 0; i < 14; i += 1) {
    const capturadas = await urlsWaCapturadas(page);
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
  const finais = await urlsWaCapturadas(page);
  return finais.length ? finais[finais.length - 1] : "";
}
