import { readFileSync } from "node:fs";
import { test, expect } from "@playwright/test";

/**
 * VARREDURA DE ROTAS /bairros/$slug — fail-closed antes do deploy.
 *
 * As rotas são descobertas no HTML SSR do hub `/bairros` (nada de importar
 * módulos da aplicação: o spec roda em Node puro e precisa ver o mesmo que o
 * crawler vê). Cada bairro precisa responder 200, sem soft-404, com canonical
 * self-referente e com robots coerente com o sitemap curado:
 *   · presente em sitemap-bairros.xml  → precisa ser indexável;
 *   · ausente do sitemap (SHALLOW)     → precisa emitir noindex.
 */

const temNoindex = (html: string) =>
  /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html) ||
  /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["']/i.test(html);

const sitemapPaths = new Set(
  [...readFileSync("public/sitemap-bairros.xml", "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    new URL(m[1].trim()).pathname.replace(/\/$/, ""),
  ),
);

test.describe("varredura de bairros", () => {
  test("todas as rotas de bairro respondem 200 e são coerentes", async ({ request, baseURL }) => {
    const hub = await request.get("/bairros");
    expect(hub.status(), "hub /bairros indisponível").toBe(200);
    const html = await hub.text();

    const paths = [
      ...new Set(
        [...html.matchAll(/href=["'](\/bairros\/[a-z0-9-]+)["']/gi)].map((m) => m[1].replace(/\/$/, "")),
      ),
    ];
    expect(paths.length, "nenhum bairro linkado no hub").toBeGreaterThan(10);

    const falhas: string[] = [];

    for (const path of paths) {
      const resposta = await request.get(path, { maxRedirects: 0 });
      if (resposta.status() !== 200) {
        falhas.push(`${path} → status ${resposta.status()}`);
        continue;
      }
      const pagina = await resposta.text();

      if (/<h1[^>]*>\s*404/i.test(pagina) || /data-testid="not-found"/.test(pagina)) {
        falhas.push(`${path} → soft-404`);
        continue;
      }

      const canonical = pagina.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1];
      if (!canonical || new URL(canonical).pathname.replace(/\/$/, "") !== path) {
        falhas.push(`${path} → canonical inesperado (${canonical ?? "ausente"})`);
      }

      const noindex = temNoindex(pagina);
      const noSitemap = sitemapPaths.has(path);
      if (noSitemap && noindex) falhas.push(`${path} → está no sitemap mas emite noindex`);
      if (!noSitemap && !noindex) falhas.push(`${path} → fora do sitemap e sem noindex`);
    }

    expect(falhas, `bairros com problema (base ${baseURL}): ${falhas.join(" | ")}`).toEqual([]);
  });
});
