/**
 * Renderiza UMA rota via SSR em um processo Node novo.
 *
 * Um processo por render é o ponto central: o cache de módulos nasce vazio,
 * portanto todo `React.lazy` da rota realmente SUSPENDE — exatamente o cenário
 * de "isolate frio" em que o P0 SSR_JSONLD_INTERMITENTE se manifestava e que
 * nenhum teste in-process consegue reproduzir (o segundo render do mesmo
 * processo já está quente).
 *
 * Imprime, em uma linha JSON: status, número de blocos JSON-LD, @types, @ids e
 * uma impressão digital estável do conjunto (fp) para comparação entre runs.
 */
import { createHash } from "node:crypto";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const url = process.argv[2];
if (!url) {
  console.error("uso: node scripts/p0/render-jsonld-once.mjs <caminho>");
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

const blocos = [
  ...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
].map((m) => m[1]);

const tipos = [];
const ids = [];
for (const bloco of blocos) {
  try {
    const json = JSON.parse(bloco);
    const nos = Array.isArray(json) ? json : (json["@graph"] ?? [json]);
    for (const no of nos) {
      const t = no["@type"];
      (Array.isArray(t) ? t : [t]).forEach((x) => x && tipos.push(x));
      if (no["@id"]) ids.push(no["@id"]);
    }
  } catch {
    tipos.push("PARSE_ERROR");
  }
}

const tiposUnicos = [...new Set(tipos)].sort();
const idsUnicos = [...new Set(ids)].sort();
const fp = createHash("sha256")
  .update(JSON.stringify([tiposUnicos, idsUnicos]))
  .digest("hex")
  .slice(0, 12);

console.log(
  JSON.stringify({ url, status: res.status, count: blocos.length, tipos: tiposUnicos, ids: idsUnicos, fp }),
);
