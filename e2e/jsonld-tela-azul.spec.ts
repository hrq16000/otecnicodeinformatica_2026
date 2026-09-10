import { expect, test } from "@playwright/test";

/**
 * Garante que /blog/como-resolver-tela-azul-windows emite JSON-LD válido e
 * SEM duplicidade de schema no HTML servido pelo SSR (não hidratado).
 *
 * Regras verificadas:
 *   · todo bloco application/ld+json é JSON válido;
 *   · não existe @type de página/artigo repetido (BlogPosting, Article,
 *     TechArticle, FAQPage, WebPage, BreadcrumbList);
 *   · o artigo declara pelo menos um tipo de artigo e um FAQPage próprio.
 */

const URL_ARTIGO = "/blog/como-resolver-tela-azul-windows";
const TIPOS_UNICOS = ["BlogPosting", "Article", "TechArticle", "FAQPage", "WebPage", "BreadcrumbList"];

function coletarTipos(no: unknown, acc: string[] = []): string[] {
  if (Array.isArray(no)) {
    for (const item of no) coletarTipos(item, acc);
    return acc;
  }
  if (no && typeof no === "object") {
    const obj = no as Record<string, unknown>;
    const tipo = obj["@type"];
    if (typeof tipo === "string") acc.push(tipo);
    if (Array.isArray(tipo)) for (const t of tipo) if (typeof t === "string") acc.push(t);
    if (Array.isArray(obj["@graph"])) coletarTipos(obj["@graph"], acc);
  }
  return acc;
}

test("tela azul: JSON-LD único e válido no HTML SSR", async ({ request, baseURL }) => {
  const res = await request.get(new URL(URL_ARTIGO, baseURL ?? "http://localhost:8080").toString());
  expect(res.status(), "artigo precisa responder 200").toBe(200);

  const html = await res.text();
  const blocos = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map(
    (m) => m[1],
  );
  expect(blocos.length, "o artigo precisa emitir JSON-LD no SSR").toBeGreaterThan(0);

  const tipos: string[] = [];
  for (const bruto of blocos) {
    let parsed: unknown;
    expect(() => {
      parsed = JSON.parse(bruto);
    }, "todo bloco JSON-LD precisa ser JSON válido").not.toThrow();
    coletarTipos(parsed, tipos);
  }

  for (const tipo of TIPOS_UNICOS) {
    const ocorrencias = tipos.filter((t) => t === tipo).length;
    expect(ocorrencias, `schema ${tipo} duplicado no HTML SSR`).toBeLessThanOrEqual(1);
  }

  const temArtigo = tipos.some((t) => ["BlogPosting", "Article", "TechArticle"].includes(t));
  expect(temArtigo, "o artigo precisa declarar um tipo de artigo").toBe(true);
  expect(tipos).toContain("FAQPage");
});
