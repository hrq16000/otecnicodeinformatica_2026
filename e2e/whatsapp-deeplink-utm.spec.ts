import { test, expect } from "@playwright/test";
import { abrirTriagemPorAncora, avancarAteWhatsApp, instalarCapturaWa } from "./utils/triagem";

/**
 * GATE E2E — DEEP LINK DO WHATSAPP COM ORIGEM DE CAMPANHA.
 *
 * Entrada simulada de anúncio (`utm_*` + `gclid`) e checagem do link final:
 *  · a atribuição da sessão sobrevive até o clique;
 *  · o `text=` traz o contexto da triagem (equipamento/serviço, localidade);
 *  · nada de PII escapa na URL — sem e-mail, CPF ou telefone.
 */

const ENTRADA =
  "/?utm_source=google&utm_medium=cpc&utm_campaign=formatacao_cwb&gclid=Cj0TESTE123#triagem";

const PII = [/[\w.+-]+@[\w-]+\.[\w.]{2,}/, /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/];

test.describe("deep link do WhatsApp — UTM e payload", () => {
  test.setTimeout(150_000);

  test("mensagem final carrega contexto e atribuição, sem PII", async ({ page }) => {
    await instalarCapturaWa(page);
    await abrirTriagemPorAncora(page, ENTRADA);

    const href = await avancarAteWhatsApp(page, "Cliente Teste", "Batel");
    test.skip(!href, "canal de WhatsApp desligado neste ambiente (fail-closed)");

    const url = new URL(href);
    expect(url.hostname).toMatch(/wa\.me|api\.whatsapp\.com/);

    const texto = url.searchParams.get("text") ?? "";
    expect(texto.length, "mensagem vazia").toBeGreaterThan(20);
    // Localidade escolhida na triagem chega ao atendimento.
    expect(texto).toMatch(/Batel/i);

    // Atribuição: a origem paga capturada na entrada não é sobrescrita pelo CTA.
    const params = url.searchParams;
    expect(params.get("utm_source")).toBe("google");
    expect(params.get("utm_campaign")).toBe("formatacao_cwb");
    expect(params.get("gclid")).toBe("Cj0TESTE123");

    // Escudo anti-PII na URL inteira (mensagem + parâmetros).
    for (const re of PII) {
      expect(re.test(decodeURIComponent(href)), `PII no deep link: ${href}`).toBe(false);
    }
  });
});
