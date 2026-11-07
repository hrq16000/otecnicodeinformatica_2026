#!/usr/bin/env node
/**
 * Verificação bloqueante do HTML que o TanStack Start realmente entrega.
 * A arquitetura SSR não possui index.html na raiz como a SPA antiga.
 */
const base = process.env.SSR_BASE_URL || "http://127.0.0.1:8080";
const response = await fetch(base + "/", { redirect: "manual", signal: AbortSignal.timeout(20000) });
if (response.status !== 200) throw new Error("Home SSR respondeu HTTP " + response.status);
if (!(response.headers.get("content-type") ?? "").includes("text/html"))
  throw new Error("Home SSR não serviu HTML");
const html = await response.text();
const check = (label, pattern) => {
  if (!pattern.test(html)) throw new Error("SEO SSR: falta " + label);
};
check("<title>", /<title[^>]*>[^<]{8,}<\/title>/i);
check("description", /<meta[^>]+name=["']description["'][^>]+content=["'][^"']{70,}["']/i);
const h1 = (html.match(/<h1\b/gi) || []).length;
if (h1 !== 1) throw new Error("Home SSR deve ter exatamente um H1; encontrou " + h1);
const canonicals = [...html.matchAll(/<link[^>]+rel=["']canonical["'][^>]*>/gi)];
if (canonicals.length !== 1) throw new Error("Home SSR: esperado um canonical, recebeu " + canonicals.length);
const robots = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)?.[1];
if (robots && /noindex/i.test(robots) && process.env.VITE_SITE_INDEXING_ENABLED === "true")
  throw new Error("Home SSR está noindex em ambiente com indexabilidade ativa");
console.log("SEO SSR real: título, descrição, H1, canonical e robots validados.");
