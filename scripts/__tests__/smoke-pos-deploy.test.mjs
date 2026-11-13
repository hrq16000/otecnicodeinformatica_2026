import { test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const script = new URL("../smoke-pos-deploy.mjs", import.meta.url).pathname;

async function smokeWith(overrides = {}) {
  let base = "";
  const server = createServer((req, res) => {
    const path = req.url.split("?")[0];
    const headers = { "content-type": "text/html; charset=utf-8" };
    if (path === "/build-version.json") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ version: "testsha", buildTime: "2026-11-13T00:00:00Z" }));
      return;
    }
    if (path === "/robots.txt") {
      res.writeHead(200, { "content-type": "text/plain" });
      res.end(overrides.robots ?? `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap-index.xml\n`);
      return;
    }
    if (path === "/sitemap-index.xml") {
      res.writeHead(200, { "content-type": "application/xml" });
      res.end(overrides.sitemap ?? `<sitemapindex><sitemap><loc>${base}/sitemap-main.xml</loc></sitemap><sitemap><loc>${base}/sitemap-servicos.xml</loc></sitemap></sitemapindex>`);
      return;
    }
    if (path === "/sitemap-main.xml" || path === "/sitemap-servicos.xml") {
      res.writeHead(200, { "content-type": "application/xml" });
      res.end(`<urlset><url><loc>${base}/</loc></url></urlset>`);
      return;
    }
    if (overrides.xRobots && path === "/solucoes/backup") {
      headers["x-robots-tag"] = "noindex, nofollow";
    }
    const meta = overrides.badRobots && path === "/solucoes/backup"
      ? '<meta name="robots" content="noindex, follow">'
      : '<meta name="robots" content="index, follow">';
    const canonical = overrides.badCanonical && path === "/solucoes/ssd"
      ? `${base}/outra-rota`
      : `${base}${path}`;
    res.writeHead(200, headers);
    res.end(`${meta}<link rel="canonical" href="${canonical}"><script>__APP_VERSION__ = "testsha"</script>Resposta rápida tabela-diagnostica`);
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
  try {
    const { stdout, stderr } = await run(process.execPath, [script, `--base=${base}`], { timeout: 5000 });
    return { ok: true, output: stdout + stderr };
  } catch (error) {
    return { ok: false, output: (error.stdout ?? "") + (error.stderr ?? "") };
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

test("aceita HTML SSR indexável e sitemaps corretos", async () => {
  const result = await smokeWith();
  assert.equal(result.ok, true, result.output);
});

for (const [name, change, expected] of [
  ["X-Robots-Tag noindex", { xRobots: true }, "FAIL_X_ROBOTS_NOINDEX"],
  ["meta robots noindex", { badRobots: true }, "FAIL_META_ROBOTS"],
  ["canonical externo à rota", { badCanonical: true }, "FAIL_CANONICAL"],
  ["robots.txt bloqueando todo o site", { robots: "User-agent: *\nDisallow: /\n" }, "FAIL_ROBOTS_CRAWL"],
  ["fallback HTML no sitemap", { sitemap: "<html>Fallback</html>" }, "FAIL_INDEX_XML"],
]) {
  test(`bloqueia ${name}`, async () => {
    const result = await smokeWith(change);
    assert.equal(result.ok, false, result.output);
    assert.match(result.output, new RegExp(expected));
  });
}
