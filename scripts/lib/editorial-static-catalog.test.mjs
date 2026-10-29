import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { readArticleCatalog, readStringArray } from "./editorial-static-catalog.mjs";

test("resolve a mesma precedência da página, sem validar pontes da versão substituída", () => {
  const catalog = readArticleCatalog([
    { name: "base", source: `const base = { "guia": { title: "Antigo", content: <Link to="/antigo" /> } };` },
    { name: "extra", source: `const extra = { "guia": { title: "Novo", content: <><a href="/novo" /><Link to={"/outro"} /></> } };` },
  ]);
  assert.equal(catalog.get("guia").title, "Novo");
  assert.deepEqual([...catalog.get("guia").links], ["/novo", "/outro"]);
  assert.equal(catalog.get("guia").links.has("/antigo"), false);
  assert.equal(catalog.get("guia").links.has("/ausente"), false);
});

test("comentários, texto e metadados não contam como links do corpo", () => {
  const catalog = readArticleCatalog([{ name: "posts", source: `const posts = { "guia": {
    title: 'href="/titulo"', related: <a href="/metadata" />,
    content: <>{/* <Link to="/comentario" /> */}<p>{'href="/texto"'}</p></>
  } };` }]);
  assert.equal(catalog.get("guia").links.size, 0);
});

test("reconhece definições programáticas e sua precedência", () => {
  const catalog = readArticleCatalog([
    { name: "base", source: `const base = { "guia": { title: "Base", content: <p /> } };` },
    { name: "defs", definitions: true, source: `const defs = [{ slug: "guia", title: "Final", sections: [{ list: ['<a href="/destino">Leia</a>'] }] }];` },
  ]);
  assert.equal(catalog.get("guia").title, "Final");
  assert.equal(catalog.get("guia").links.has("/destino"), true);
});

test("lê a allowlist canônica sem aceitar hosts não cadastrados", () => {
  const hosts = new Set(readStringArray(`export const ALLOWED_SOURCE_HOSTS = ["support.microsoft.com", "memtest.org"] as const;`, "ALLOWED_SOURCE_HOSTS"));
  assert.equal(hosts.has("memtest.org"), true);
  assert.equal(hosts.has("evil.memtest.org"), false);
  assert.equal(hosts.has("memtest.org.evil.example"), false);
});

test("falha fechado em declarações ausentes, dinâmicas ou malformadas", () => {
  assert.throws(() => readStringArray("const other = [];", "ALLOWED_SOURCE_HOSTS"), /ausente/);
  assert.throws(() => readStringArray("const hosts = getHosts();", "hosts"), /literal/);
  assert.throws(() => readArticleCatalog([{ name: "posts", source: "const posts = {" }]), /inválida/);
});

test("todas as pontes declaradas existem no corpo vencedor do catálogo real", () => {
  const read = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), "utf8");
  const catalog = readArticleCatalog([
    { name: "blogPostsContentBase", source: read("src/data/blogPostsContent.tsx") },
    { name: "blogSupplementalPosts", source: read("src/data/blogSupplementalPosts.tsx") },
    { name: "defs", definitions: true, source: read("src/data/blogProgrammaticPosts.tsx") },
  ]);
  const nodes = [...read("src/lib/contentIntentMap.ts").matchAll(/url:\s*"(\/blog\/[^\"]+)"[\s\S]*?bridgesTo:\s*\[([\s\S]*?)\]/g)];
  assert.ok(nodes.length >= 30, "O mapa não pode desaparecer silenciosamente");
  for (const [, url, destinations] of nodes) {
    const article = catalog.get(url.slice("/blog/".length));
    assert.ok(article, `${url}: artigo ausente`);
    for (const [, destination] of destinations.matchAll(/"([^"]+)"/g)) {
      assert.ok(article.links.has(destination), `${url}: ponte ausente ${destination}`);
    }
  }
});
