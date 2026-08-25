import { expect, test } from "@playwright/test";

/**
 * RODADA 5A — consistência de Open Graph / Twitter Cards.
 *
 * Valida, por rota, que o HTML inicial (SSR, antes de qualquer hidratação) já
 * traz as tags sociais completas e que elas continuam idênticas depois da
 * hidratação — a divergência que a 4F corrigiu no `socialMeta` não pode voltar.
 */

const ROTAS = [
  "/",
  "/servicos/formatacao",
  "/problemas/computador-lento",
  "/tecnico-informatica-curitiba",
  "/empresa-de-ti-curitiba",
  "/blog/o-que-e-informatica",
];

const OBRIGATORIAS = {
  meta: ["description"],
  og: ["og:type", "og:title", "og:description", "og:url", "og:image"],
  twitter: ["twitter:card", "twitter:title", "twitter:description", "twitter:image"],
};

/** Lê as tags sociais direto do HTML servido, sem executar JavaScript. */
function lerDoHtml(html: string) {
  const tags = new Map<string, string>();
  for (const m of html.matchAll(/<meta[^>]+>/gi)) {
    const tag = m[0];
    const chave =
      /(?:property|name)=["']([^"']+)["']/i.exec(tag)?.[1] ?? null;
    const valor = /content=["']([^"']*)["']/i.exec(tag)?.[1] ?? null;
    if (chave && valor !== null && !tags.has(chave)) tags.set(chave, valor);
  }
  const titulo = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1]?.trim() ?? "";
  return { tags, titulo };
}

for (const rota of ROTAS) {
  test(`OG/Twitter consistentes em ${rota}`, async ({ page, request, baseURL }) => {
    const resposta = await request.get(rota);
    expect(resposta.status(), `${rota} deve responder 200`).toBe(200);
    const { tags: ssr, titulo: tituloSsr } = lerDoHtml(await resposta.text());

    for (const chave of [...OBRIGATORIAS.meta, ...OBRIGATORIAS.og, ...OBRIGATORIAS.twitter]) {
      expect(ssr.get(chave), `${rota}: ${chave} ausente no HTML inicial`).toBeTruthy();
    }

    // Coerência interna: título/descrição sociais espelham o título da página.
    expect(ssr.get("og:title")).toBe(tituloSsr);
    expect(ssr.get("twitter:title")).toBe(ssr.get("og:title"));
    expect(ssr.get("twitter:description")).toBe(ssr.get("og:description"));
    expect(ssr.get("og:description")).toBe(ssr.get("description"));
    expect(ssr.get("twitter:card")).toBe("summary_large_image");

    // Imagem e URL absolutas no domínio publicado (nunca relativas).
    const origem = new URL(baseURL ?? "http://localhost:8080").origin;
    for (const chave of ["og:url", "og:image", "twitter:image"]) {
      expect(ssr.get(chave), `${rota}: ${chave} deve ser absoluto`).toMatch(/^https?:\/\//);
    }
    expect(new URL(ssr.get("og:url") as string).pathname.replace(/\/$/, "") || "/").toBe(
      rota.replace(/\/$/, "") || "/",
    );
    expect(origem).toBeTruthy();

    // Depois da hidratação, o head não pode divergir do que o SSR entregou.
    await page.goto(rota, { waitUntil: "networkidle" });
    const pos = await page.evaluate(() => {
      const ler = (sel: string) =>
        document.querySelector<HTMLMetaElement>(sel)?.content ?? null;
      return {
        title: document.title,
        description: ler('meta[name="description"]'),
        ogTitle: ler('meta[property="og:title"]'),
        ogDescription: ler('meta[property="og:description"]'),
        ogImage: ler('meta[property="og:image"]'),
        ogUrl: ler('meta[property="og:url"]'),
        twTitle: ler('meta[name="twitter:title"]'),
        twImage: ler('meta[name="twitter:image"]'),
        twCard: ler('meta[name="twitter:card"]'),
      };
    });

    expect(pos.title).toBe(tituloSsr);
    expect(pos.description).toBe(ssr.get("description"));
    expect(pos.ogTitle).toBe(ssr.get("og:title"));
    expect(pos.ogDescription).toBe(ssr.get("og:description"));
    expect(pos.ogImage).toBe(ssr.get("og:image"));
    expect(pos.ogUrl).toBe(ssr.get("og:url"));
    expect(pos.twTitle).toBe(ssr.get("twitter:title"));
    expect(pos.twImage).toBe(ssr.get("twitter:image"));
    expect(pos.twCard).toBe("summary_large_image");
  });
}
