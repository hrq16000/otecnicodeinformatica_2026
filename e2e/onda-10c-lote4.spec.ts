import { test, expect, type APIRequestContext } from "@playwright/test";

/**
 * GATE E2E — Onda 10C / Lote 4 (clusters 9 e 10: webcam não funciona e
 * Windows Update).
 *
 * Valida no HTML SSR (sem JavaScript):
 *  1. rota 200 e indexável;
 *  2. H1 único, resposta curta, tabela diagnóstica e "Quando chamar um técnico";
 *  3. FAQPage único + Article/TechArticle com parse válido;
 *  4. links internos declarados respondem e nenhum CTA direto de WhatsApp;
 *  5. interlinking pilar ↔ satélites nos dois clusters;
 *  6. REGRAS DE SEGURANÇA: nada de hack de registro para "liberar" câmera e
 *     nada de desativar serviços do Windows Update; o cache é tratado por
 *     renomeação reversível, nunca por exclusão como primeiro passo.
 */

const PAGINAS = [
  { path: "/blog/webcam-nao-funciona-o-que-verificar", h1: "Webcam não funciona" },
  { path: "/blog/permissoes-de-camera-no-windows", h1: "Permissões de câmera no Windows" },
  { path: "/blog/webcam-usb-nao-e-detectada", h1: "Webcam USB não é detectada" },
  {
    path: "/blog/windows-update-nao-funciona-o-que-verificar",
    h1: "Windows Update não funciona",
  },
  {
    path: "/blog/limpar-cache-do-windows-update-softwaredistribution",
    h1: "Cache do Windows Update",
  },
  { path: "/blog/windows-update-travado-desfazendo-alteracoes", h1: "Atualização travada" },
];

const html = async (request: APIRequestContext, path: string) => {
  const res = await request.get(path);
  expect(res.status(), `${path} deve responder 200`).toBe(200);
  return res.text();
};

const semTags = (page: string) =>
  page
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");

const tipos = (n: Record<string, unknown>): string[] => {
  const t = n["@type"];
  return Array.isArray(t) ? (t as string[]) : typeof t === "string" ? [t] : [];
};

const jsonLd = (page: string) =>
  [...page.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => {
      try {
        return JSON.parse(m[1] as string);
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .flatMap((n) => (Array.isArray(n) ? n : [n])) as Array<Record<string, unknown>>;

for (const { path, h1 } of PAGINAS) {
  test.describe(`10C/L4 — ${path}`, () => {
    test("SSR indexável, H1 único e conteúdo citável", async ({ request }) => {
      const page = await html(request, path);

      const h1s = [...page.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
        m[1].replace(/<[^>]+>/g, "").trim(),
      );
      expect(h1s.length, `H1 duplicado em ${path}`).toBe(1);
      expect(h1s[0]).toContain(h1);

      const robots = page.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)?.[1] ?? "";
      expect(robots, `robots de ${path}`).toMatch(/index/);
      expect(robots).not.toMatch(/noindex/);

      const texto = semTags(page);
      expect(texto).toContain("Resposta curta");
      expect(texto).toContain("Quando chamar um técnico");
      expect(page, `sem tabela diagnóstica em ${path}`).toMatch(/<table[\s\S]*?<\/table>/i);
      expect(texto.split(" ").length).toBeGreaterThan(700);
    });

    test("FAQPage único e Article válidos", async ({ request }) => {
      const page = await html(request, path);
      const nos = jsonLd(page);

      const faqs = nos.filter((n) => tipos(n).includes("FAQPage"));
      expect(faqs.length, `FAQPage ausente ou duplicado em ${path}`).toBe(1);
      const perguntas = (faqs[0].mainEntity as Array<Record<string, unknown>>) ?? [];
      expect(perguntas.length).toBeGreaterThanOrEqual(3);

      expect(
        nos.some((n) => tipos(n).includes("TechArticle") || tipos(n).includes("Article")),
        `sem Article/TechArticle em ${path}`,
      ).toBe(true);
    });

    test("links internos respondem e não há WhatsApp direto no editorial", async ({ request }) => {
      const page = await html(request, path);

      const artigo = page.match(/<article[\s\S]*?<\/article>/i)?.[0] ?? "";
      expect(artigo.length, `<article> não encontrado em ${path}`).toBeGreaterThan(0);
      expect(artigo, `link direto de WhatsApp no editorial de ${path}`).not.toMatch(/wa\.me\//);

      const hrefs = [...artigo.matchAll(/href="(\/[^"#?]*)"/g)]
        .map((m) => m[1])
        .filter((h) => !h.startsWith("/api"));
      const quebradas: string[] = [];
      for (const href of [...new Set(hrefs)].slice(0, 30)) {
        const res = await request.get(href);
        if (res.status() >= 400) quebradas.push(`${href} → ${res.status()}`);
      }
      expect(quebradas, `links quebrados em ${path}: ${quebradas.join(", ")}`).toEqual([]);
    });
  });
}

test("cluster de webcam interliga pilar ↔ satélites", async ({ request }) => {
  const pilar = await html(request, "/blog/webcam-nao-funciona-o-que-verificar");
  expect(pilar).toContain("/blog/permissoes-de-camera-no-windows");
  expect(pilar).toContain("/blog/webcam-usb-nao-e-detectada");

  const permissoes = await html(request, "/blog/permissoes-de-camera-no-windows");
  expect(permissoes).toContain("/blog/webcam-nao-funciona-o-que-verificar");
});

test("cluster de Windows Update interliga pilar ↔ satélites", async ({ request }) => {
  const pilar = await html(request, "/blog/windows-update-nao-funciona-o-que-verificar");
  expect(pilar).toContain("/blog/limpar-cache-do-windows-update-softwaredistribution");
  expect(pilar).toContain("/blog/windows-update-travado-desfazendo-alteracoes");

  const cache = await html(
    request,
    "/blog/limpar-cache-do-windows-update-softwaredistribution",
  );
  expect(cache).toContain("/blog/windows-update-nao-funciona-o-que-verificar");
});

test("nenhuma página do lote recomenda hack de registro ou desativar o Windows Update", async ({
  request,
}) => {
  for (const { path } of PAGINAS) {
    const texto = semTags(await html(request, path)).toLowerCase();
    expect(texto, `edição de registro sugerida em ${path}`).not.toMatch(
      /edite o registro|regedit/,
    );
    expect(texto, `desativação de serviço sugerida em ${path}`).not.toMatch(
      /desative o (serviço|windows update)/,
    );
  }
});

test("o cache do Update é tratado por renomeação reversível, não por exclusão", async ({
  request,
}) => {
  const texto = semTags(
    await html(request, "/blog/limpar-cache-do-windows-update-softwaredistribution"),
  );
  expect(texto.toLowerCase()).toContain("renomear");
  expect(texto).toMatch(/revers[íi]vel/i);
  expect(texto.toLowerCase()).not.toMatch(/apague a pasta softwaredistribution/);
});
