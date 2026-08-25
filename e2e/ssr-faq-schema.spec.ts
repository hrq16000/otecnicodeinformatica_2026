import { test, expect, type APIRequestContext } from "@playwright/test";
import { SITE_URL } from "./site-env";

/**
 * GATE E2E — SSR, FAQPage e política de indexação.
 *
 * Tudo é lido no HTML bruto (sem hidratação), exatamente como o crawler vê:
 *  1. onde há FAQPage no JSON-LD, cada pergunta precisa existir no HTML
 *     visível (nada de structured data sem conteúdo correspondente);
 *  2. cada resposta declarada tem texto real (não vazio);
 *  3. amostra SHALLOW responde 200 com `noindex` e canonical self-referente.
 */

const ROTAS_FAQ = ["/servicos/formatacao", "/", "/tecnico-informatica-curitiba"];
const SHALLOW_CANDIDATOS = ["/bairros/xaxim", "/bairros/uberaba", "/bairros/bacacheri"];

const semTags = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, " ");

const blocosJsonLd = (html: string) =>
  [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => m[1])
    .filter(Boolean);

function perguntasFaq(html: string): Array<{ pergunta: string; resposta: string }> {
  const itens: Array<{ pergunta: string; resposta: string }> = [];
  for (const bruto of blocosJsonLd(html)) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(bruto as string);
    } catch {
      continue;
    }
    const nos = Array.isArray(parsed) ? parsed : [parsed];
    for (const no of nos as Array<Record<string, unknown>>) {
      if (no?.["@type"] !== "FAQPage") continue;
      for (const q of (no.mainEntity as Array<Record<string, never>>) ?? []) {
        itens.push({
          pergunta: String((q as Record<string, unknown>).name ?? ""),
          resposta: String(
            ((q as Record<string, Record<string, unknown>>).acceptedAnswer?.text as string) ?? "",
          ),
        });
      }
    }
  }
  return itens;
}

const html = async (request: APIRequestContext, path: string) => {
  const res = await request.get(path);
  expect(res.status(), `${path} deve responder 200`).toBe(200);
  return res.text();
};

test.describe("SSR — FAQPage espelha o conteúdo visível", () => {
  for (const rota of ROTAS_FAQ) {
    test(`FAQPage de ${rota} está sincronizado com o DOM servido`, async ({ request }) => {
      const pagina = await html(request, rota);
      const itens = perguntasFaq(pagina);
      test.skip(itens.length === 0, `${rota} não declara FAQPage`);

      const texto = semTags(pagina);
      const ausentes = itens
        .map((i) => i.pergunta)
        .filter((p) => p && !texto.includes(semTags(p).trim()));
      expect(ausentes, `perguntas sem conteúdo visível em ${rota}: ${ausentes.join(" | ")}`).toEqual([]);

      const respostasVazias = itens.filter((i) => i.resposta.trim().length < 10).map((i) => i.pergunta);
      expect(respostasVazias, `respostas vazias em ${rota}: ${respostasVazias.join(" | ")}`).toEqual([]);
    });
  }

  test("amostra SHALLOW mantém noindex e canonical próprio", async ({ request }) => {
    let avaliados = 0;
    for (const path of SHALLOW_CANDIDATOS) {
      const res = await request.get(path);
      if (res.status() !== 200) continue;
      const pagina = await res.text();
      const robots = pagina.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)?.[1] ?? "";
      if (!/noindex/i.test(robots)) continue;
      avaliados += 1;
      const canonical = pagina.match(/<link\s+rel="canonical"[^>]*href="([^"]+)"/i)?.[1] ?? "";
      expect(canonical).toBe(`${SITE_URL}${path}`);
    }
    expect(avaliados, "nenhuma amostra SHALLOW encontrada").toBeGreaterThan(0);
  });
});
