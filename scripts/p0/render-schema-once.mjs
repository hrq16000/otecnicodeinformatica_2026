/**
 * Renderiza UMA rota via SSR em processo Node NOVO (isolate frio) e imprime o
 * relatório semântico de schema — Onda 10C · Infra 2 (Parte D).
 *
 * Um processo por render é essencial: o cache de módulos nasce vazio e todo
 * React.lazy realmente suspende, reproduzindo o cenário do antigo P0
 * SSR_JSONLD_INTERMITENTE.
 *
 * Saída: uma linha JSON com fingerprint, tipos, FAQ (visível × schema),
 * breadcrumb (visível × schema) e o nó de artigo.
 */
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { relatorioDeSchema } from "../lib/schema-fingerprint.mjs";

const url = process.argv[2];
if (!url) {
  console.error("uso: node scripts/p0/render-schema-once.mjs <caminho>");
  process.exit(2);
}

const bundle = pathToFileURL(resolve(process.cwd(), "dist/server/index.mjs")).href;
const mod = await import(bundle);
const handler = mod.default ?? mod;
const fetchFn = handler.fetch ?? handler;

const res = await fetchFn(new Request(`http://localhost${url}`), {}, {
  waitUntil() {},
  passThroughOnException() {},
});
const html = await res.text();
const r = relatorioDeSchema(html);

console.log(
  JSON.stringify({
    url,
    status: res.status,
    fingerprint: r.fingerprint,
    blocos: r.blocos,
    nos: r.nos,
    tipos: r.tipos,
    faqVisivel: r.faqVisivel,
    faqSchema: r.faqSchema,
    breadcrumbVisivel: r.breadcrumbVisivel,
    breadcrumbSchema: r.breadcrumbSchema,
    artigo: r.artigo
      ? {
          tipo: r.artigo["@type"],
          headline: r.artigo.headline ?? null,
          mainEntityOfPage: r.artigo.mainEntityOfPage ?? null,
          publisher: r.artigo.publisher?.name ?? r.artigo.publisher ?? null,
          author: r.artigo.author?.name ?? r.artigo.author ?? null,
          dateModified: r.artigo.dateModified ?? null,
          image: r.artigo.image ?? null,
        }
      : null,
  }),
);
