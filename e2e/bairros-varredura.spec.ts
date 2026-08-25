import { test, expect } from "@playwright/test";
import { BAIRROS_MALHA } from "../src/lib/bairrosMalha";

/**
 * VARREDURA DE ROTAS /bairros/$slug — fail-closed antes do deploy.
 *
 * Cada bairro da malha precisa responder 200 no SSR, sem soft-404 e com
 * canonical self-referente. Também confere a coerência entre `contentStatus`
 * e a diretiva de robots (SHALLOW → noindex, RICH → index).
 */

const temNoindex = (html: string) =>
  /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html) ||
  /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["']/i.test(html);

test.describe("varredura de bairros", () => {
  test("todas as rotas de bairro respondem 200 e são coerentes", async ({ request, baseURL }) => {
    expect(BAIRROS_MALHA.length, "malha de bairros vazia").toBeGreaterThan(10);

    const falhas: string[] = [];

    for (const bairro of BAIRROS_MALHA) {
      const path = bairro.path ?? `/bairros/${bairro.slug}`;
      const resposta = await request.get(path, { maxRedirects: 0 });
      if (resposta.status() !== 200) {
        falhas.push(`${path} → status ${resposta.status()}`);
        continue;
      }
      const html = await resposta.text();

      if (/<h1[^>]*>\s*404/i.test(html) || /data-testid="not-found"/.test(html)) {
        falhas.push(`${path} → soft-404`);
        continue;
      }

      const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1];
      if (!canonical || !canonical.endsWith(path)) {
        falhas.push(`${path} → canonical inesperado (${canonical ?? "ausente"})`);
      }

      const noindex = temNoindex(html);
      if (bairro.contentStatus === "SHALLOW" && !noindex) falhas.push(`${path} → SHALLOW sem noindex`);
      if (bairro.contentStatus === "RICH" && noindex) falhas.push(`${path} → RICH com noindex`);
    }

    expect(falhas, `bairros com problema (base ${baseURL}): ${falhas.join(" | ")}`).toEqual([]);
  });
});
