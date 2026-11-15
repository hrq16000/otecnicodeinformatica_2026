import { test, expect } from "@playwright/test";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { SITE_URL } from "./site-env";

// Amostras fixas: não derivar o esperado da mesma implementação que gera o HTML.
const APPROVED = [
  "erro-no-bootable-device-como-resolver",
  "como-remover-virus-windows-iniciantes",
  "teclado-de-notebook-nao-funciona-o-que-verificar",
  "computador-nao-conecta-na-internet-por-cabo",
  "arquivo-corrompido-nao-abre-o-que-fazer",
] as const;
const DRAFTS = ["como-detectar-invasao-rede", "como-configurar-rede-linux-netplan"] as const;

const urlFor = (slug: string) => `${SITE_URL}/blog/${slug}`;
const BASE = process.env.E2E_BASE_URL ?? "http://localhost:4173";
const readDist = (path: string) => readFileSync(resolve("dist", path), "utf8");

type JsonNode = Record<string, unknown>;

function nodes(value: unknown): JsonNode[] {
  if (Array.isArray(value)) return value.flatMap(nodes);
  if (!value || typeof value !== "object") return [];
  const obj = value as JsonNode;
  return [obj, ...Object.values(obj).flatMap(nodes)];
}

function hasType(node: JsonNode, type: string): boolean {
  return node["@type"] === type || (Array.isArray(node["@type"]) && node["@type"].includes(type));
}

function checkRobotsAndCanonical(html: string, canonicalUrl: string, approved: boolean) {
  expect(SITE_URL, "defina VITE_SITE_DOMAIN para validar o domínio canônico").not.toBe("");
  const canon = [...html.matchAll(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi)];
  expect(canon).toHaveLength(1);
  expect(canon[0][0].match(/\bhref=["']([^"']+)["']/i)?.[1]).toBe(canonicalUrl);

  const robots = [...html.matchAll(/<meta\b[^>]*\bname=["']robots["'][^>]*>/gi)];
  expect(robots).toHaveLength(1);
  const directives = (robots[0][0].match(/\bcontent=["']([^"']+)["']/i)?.[1] ?? "")
    .toLowerCase().split(",").map((directive) => directive.trim());
  expect(directives).toContain("follow");
  expect(directives).not.toContain("nofollow");
  expect(directives).not.toContain(approved ? "noindex" : "index");
  if (!approved) expect(directives).toContain("noindex");
  expect(directives).not.toContain("none");
}

function checkArticle(html: string, slug: string, approved: boolean) {
  checkRobotsAndCanonical(html, urlFor(slug), approved);

  const jsonLd = [...html.matchAll(/<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .flatMap(([, raw]) => nodes(JSON.parse(raw)));
  expect(jsonLd.some((node) => hasType(node, "BreadcrumbList"))).toBe(true);

  const articles = jsonLd.filter((node) => ["BlogPosting", "Article", "TechArticle"].some((type) => hasType(node, type)));
  expect(articles).toHaveLength(approved ? 1 : 0);
  if (approved) {
    expect(articles[0].url).toBe(urlFor(slug));
    expect(articles[0].author).toMatchObject({ "@type": "Organization", url: SITE_URL });
    expect(articles[0].publisher).toMatchObject({ "@type": "Organization", url: SITE_URL });
  }
}

test.describe("Contrato editorial: aprovados entram, rascunhos permanecem fora", () => {
  test("hub /blog indexável com canônica própria após liberação do lote", () => {
    checkRobotsAndCanonical(readDist("blog/index.html"), `${SITE_URL}/blog`, true);
  });

  for (const [approved, slugs] of [[true, APPROVED], [false, DRAFTS]] as const) {
    for (const slug of slugs) {
      test(`snapshot /blog/${slug}: ${approved ? "aprovado" : "não aprovado"}`, () => {
        checkArticle(readDist(`blog/${slug}/index.html`), slug, approved);
      });
    }
  }

  test("sitemaps publicam a amostra aprovada e excluem os rascunhos", () => {
    const dir = resolve("public");
    const files = readdirSync(dir).filter((file) => /^sitemap.*\.xml$/.test(file));
    expect(files).toContain("sitemap-editorial.xml");
    const locs = (xml: string) => [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map(([, url]) => url);
    expect(locs(readFileSync(resolve(dir, "sitemap.xml"), "utf8"))).toContain(`${SITE_URL}/sitemap-editorial.xml`);
    const editorial = locs(readFileSync(resolve(dir, "sitemap-editorial.xml"), "utf8"));
    const all = files.flatMap((file) => locs(readFileSync(resolve(dir, file), "utf8")));
    const paths = all.map((url) => new URL(url, SITE_URL).pathname.replace(/\/$/, ""));
    for (const slug of APPROVED) expect(editorial).toContain(urlFor(slug));
    for (const slug of DRAFTS) expect(paths).not.toContain(`/blog/${slug}`);
  });

  test("HTML servido mantém o contrato para um artigo aprovado e um rascunho", async ({ request }) => {
    for (const [slug, approved] of [[APPROVED[4], true], [DRAFTS[0], false]] as const) {
      const response = await request.get(`${BASE}/blog/${slug}`);
      expect(response.status()).toBe(200);
      checkArticle(await response.text(), slug, approved);
    }
  });
});
