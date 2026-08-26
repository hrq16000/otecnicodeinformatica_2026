import { test, expect, type APIRequestContext } from "@playwright/test";

/**
 * GATE E2E — Onda 10C / Lote 3 (clusters 7 e 8: armazenamento não detectado
 * e áudio sem funcionar).
 *
 * Valida no HTML SSR (sem JavaScript) os satélites publicados:
 *  1. rota responde 200 e é indexável;
 *  2. H1 único e conteúdo editorial presente no HTML bruto;
 *  3. tabela diagnóstica e seção "Quando chamar um técnico";
 *  4. FAQPage único + Article/TechArticle com parse válido;
 *  5. links internos declarados existem (sem 404) e sem WhatsApp direto;
 *  6. interlinking dos dois clusters;
 *  7. REGRA DE SEGURANÇA: CHKDSK nunca é recomendação padrão para disco
 *     suspeito de falha física.
 */

const SATELITES = [
  {
    path: "/blog/hd-nao-e-reconhecido-na-bios-o-que-fazer",
    h1: "não é reconhecido na BIOS",
  },
  {
    path: "/blog/ssd-nvme-nao-aparece-no-gerenciador-de-discos",
    h1: "SSD aparece na BIOS",
  },
  {
    path: "/blog/disco-com-setores-defeituosos-smart-o-que-fazer",
    h1: "Setores defeituosos",
  },
  {
    path: "/blog/computador-sem-som-o-que-verificar",
    h1: "Computador sem som",
  },
  {
    path: "/blog/fone-de-ouvido-nao-e-reconhecido-no-pc",
    h1: "Fone de ouvido não é reconhecido",
  },
  {
    path: "/blog/servico-de-audio-do-windows-nao-esta-em-execucao",
    h1: "Serviço de áudio do Windows",
  },
];

const html = async (request: APIRequestContext, path: string) => {
  const res = await request.get(path);
  expect(res.status(), `${path} deve responder 200`).toBe(200);
  return res.text();
};

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

for (const { path, h1 } of SATELITES) {
  test.describe(`satélite 10C/L3 — ${path}`, () => {
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

      const texto = page.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<[^>]+>/g, " ");
      expect(texto).toContain("Resposta curta");
      expect(texto).toContain("Quando chamar um técnico");
      expect(page, `sem tabela diagnóstica em ${path}`).toMatch(/<table[\s\S]*?<\/table>/i);
      expect(texto.replace(/\s+/g, " ").split(" ").length).toBeGreaterThan(700);
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

test("cluster de armazenamento interliga BIOS ↔ Gerenciamento de Disco", async ({ request }) => {
  const bios = await html(request, "/blog/hd-nao-e-reconhecido-na-bios-o-que-fazer");
  expect(bios).toContain("/blog/ssd-nvme-nao-aparece-no-gerenciador-de-discos");

  const windows = await html(request, "/blog/ssd-nvme-nao-aparece-no-gerenciador-de-discos");
  expect(windows).toContain("/blog/hd-nao-e-reconhecido-na-bios-o-que-fazer");
});

test("cluster de áudio interliga pilar ↔ satélites", async ({ request }) => {
  const pilar = await html(request, "/blog/computador-sem-som-o-que-verificar");
  expect(pilar).toContain("/blog/servico-de-audio-do-windows-nao-esta-em-execucao");
  expect(pilar).toContain("/blog/fone-de-ouvido-nao-e-reconhecido-no-pc");

  const servico = await html(request, "/blog/servico-de-audio-do-windows-nao-esta-em-execucao");
  expect(servico).toContain("/blog/computador-sem-som-o-que-verificar");
});

test("CHKDSK nunca é recomendação padrão para disco suspeito de falha física", async ({
  request,
}) => {
  const page = await html(request, "/blog/disco-com-setores-defeituosos-smart-o-que-fazer");
  const texto = page
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");

  // A ressalva de segurança precisa estar no HTML servido, não só no cliente.
  expect(texto).toMatch(/CHKDSK não é/i);
  expect(texto).toContain("imagem bit a bit");
  expect(texto.toLowerCase()).toContain("copiar");

  // Nenhuma outra página do lote pode transformar CHKDSK em passo padrão.
  for (const { path } of SATELITES) {
    const outra = await html(request, path);
    const corpo = outra.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    if (path.includes("setores-defeituosos")) continue;
    expect(corpo, `CHKDSK sugerido sem ressalva em ${path}`).not.toMatch(/rode o chkdsk/i);
  }
});
