import { test, expect, type APIRequestContext } from "@playwright/test";

/**
 * MALHA INTERNA NO HTML BRUTO (SSR, antes da hidratação).
 *
 * Tudo aqui é lido por `request.get()` — nenhum JavaScript de cliente roda,
 * então o que passa é exatamente o que o crawler enxerga.
 *
 * Contrato:
 *  1. todo link interno do HTML servido tem `href` absoluto-de-raiz válido;
 *  2. nenhum link interno aponta para página com <meta name="robots" ... noindex>;
 *  3. nenhum link interno cai em redirect (3xx) nem em 4xx/5xx.
 */

const PAGINAS_SEMENTE = [
  "/",
  "/servicos",
  "/bairros",
  "/problemas",
  "/faq",
  "/tecnico-informatica-curitiba",
];

const IGNORAR = /^\/(admin|ads|api|lovable)\b/;

const ehInterno = (href: string) =>
  href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/#") && !IGNORAR.test(href);

const semAncora = (href: string) => href.split("#")[0] || "/";

const ehArquivo = (href: string) => /\.[a-z0-9]{2,5}$/i.test(href.split("?")[0]);

function extrairHrefs(html: string): string[] {
  const corpo = html.slice(html.indexOf("<body"));
  return [...corpo.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)].map((m) => m[1]);
}

const temNoindex = (html: string) =>
  /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html) ||
  /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["']/i.test(html);

async function coletarDestinos(request: APIRequestContext): Promise<Set<string>> {
  const destinos = new Set<string>();
  for (const semente of PAGINAS_SEMENTE) {
    const resposta = await request.get(semente);
    expect(resposta.status(), `semente indisponível: ${semente}`).toBe(200);
    const html = await resposta.text();
    const hrefs = extrairHrefs(html);

    // Nenhum href vazio, relativo ambíguo ou com template não resolvido.
    for (const href of hrefs) {
      expect(href.trim(), `href vazio em ${semente}`).not.toBe("");
      expect(href, `href com template não resolvido em ${semente}: ${href}`).not.toMatch(/\$\{|undefined|\[object/);
    }

    hrefs
      .filter(ehInterno)
      .map(semAncora)
      .filter((h) => !ehArquivo(h))
      .forEach((h) => destinos.add(h));
  }
  return destinos;
}

test.describe("malha interna no SSR", () => {
  test("links internos são válidos, indexáveis e sem redirect", async ({ request }) => {
    const destinos = await coletarDestinos(request);
    expect(destinos.size, "poucos destinos internos coletados no SSR").toBeGreaterThan(20);

    const quebrados: string[] = [];
    const redirecionados: string[] = [];
    const paraNoindex: string[] = [];

    for (const destino of destinos) {
      const resposta = await request.get(destino, { maxRedirects: 0 });
      const status = resposta.status();

      if (status >= 300 && status < 400) {
        redirecionados.push(`${destino} → ${status} ${resposta.headers()["location"] ?? ""}`);
        continue;
      }
      if (status !== 200) {
        quebrados.push(`${destino} (status ${status})`);
        continue;
      }
      // Exceção governada: o diretório `/bairros` é uma superfície de UX e
      // lista bairros ainda SHALLOW, que por política emitem noindex até serem
      // promovidos a RICH (gate `check:sitemap-rich`). Fora desse diretório,
      // link interno para noindex é defeito.
      if (destino.startsWith("/bairros/")) continue;
      if (temNoindex(await resposta.text())) paraNoindex.push(destino);
    }

    expect(quebrados, `links internos quebrados: ${quebrados.join(", ")}`).toEqual([]);
    expect(redirecionados, `links internos apontando para redirect: ${redirecionados.join(", ")}`).toEqual([]);
    expect(paraNoindex, `links internos apontando para noindex: ${paraNoindex.join(", ")}`).toEqual([]);
  });
});
