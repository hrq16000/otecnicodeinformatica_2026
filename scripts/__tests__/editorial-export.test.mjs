import { describe, expect, it } from "vitest";
import {
  contemSegredo,
  linhasAssets,
  linhasIndexNow,
  linhasIndexacao,
  linhasSchema,
  montarManifest,
  paraCsv,
  sanitizar,
  sha256,
} from "../lib/editorial-export.mjs";

const alvos = [
  { wave: "10C", batch: "2", url: "/blog/impressora-offline-como-resolver", ownerId: "impressora-offline" },
  { wave: "10C", batch: "2", url: "/blog/fila-de-impressao-travada-spooler-windows", ownerId: "fila-impressao-spooler" },
];

const estadoIndexNow = {
  rotas: {
    "/blog/impressora-offline-como-resolver": {
      url: "/blog/impressora-offline-como-resolver",
      currentContentHash: "h1",
      lastSubmittedHash: "h1",
      deploySha: "h1",
      submissionState: "SUBMITTED",
      lastResponse: "HTTP 200",
      lastSubmittedAt: "2026-08-26T00:00:00.000Z",
      motivo: "aceito",
    },
    "/blog/fila-de-impressao-travada-spooler-windows": {
      url: "/blog/fila-de-impressao-travada-spooler-windows",
      currentContentHash: "h2",
      lastSubmittedHash: null,
      deploySha: null,
      submissionState: "PENDING_DEPLOY",
      lastResponse: null,
      lastSubmittedAt: null,
      motivo: "deploy não confirmado",
    },
  },
};

describe("export de evidências", () => {
  it("IndexNow: contagem e estados por lote", () => {
    const linhas = linhasIndexNow(estadoIndexNow, alvos);
    expect(linhas).toHaveLength(2);
    expect(linhas.map((l) => l.state)).toEqual(["SUBMITTED", "PENDING_DEPLOY"]);
    expect(linhas[0].deployment).toBe("CONFIRMED");
    expect(JSON.stringify(linhas)).not.toMatch(/keyLocation|"key"/);
  });

  it("filtro por lote não mistura outras waves", () => {
    const so1 = linhasIndexNow(estadoIndexNow, [alvos[0]]);
    expect(so1).toHaveLength(1);
    expect(so1[0].url).toBe(alvos[0].url);
  });

  it("Assets: campos de licença e formatos", () => {
    const linhas = linhasAssets(
      {
        assets: [
          {
            owner: "impressora-offline",
            slug: "impressora",
            localPath: "/blog/x.jpg",
            originalUrl: "https://commons.wikimedia.org/x",
            sourceType: "WIKIMEDIA",
            author: "Fulano",
            license: "CC BY-SA 4.0",
            licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
            attributionText: "Fulano, CC BY-SA 4.0",
            fileHash: "sha256:abc",
            formats: ["/blog/x.webp", "/blog/x.avif"],
            resultado: "PASS",
            falhas: [],
          },
          { owner: "outro-owner", slug: "z", localPath: "/z.jpg", formats: [], resultado: "PASS", falhas: [] },
        ],
      },
      alvos,
    );
    expect(linhas).toHaveLength(1);
    expect(linhas[0].webp).toBe(true);
    expect(linhas[0].avif).toBe(true);
    expect(linhas[0].aiGate).toBe("PASS");
  });

  it("Schema: usa fingerprint e estado de regressão", () => {
    const linhas = linhasSchema(
      { rotas: [{ url: alvos[0].url, fingerprint: "fp", tipos: ["TechArticle"], faqSchema: 3, breadcrumb: 3, variantes: 1 }] },
      { builds: [{ buildSha: "sha1", rotas: {} }] },
      [{ url: alvos[0].url, estado: "UNCHANGED" }],
      alvos,
    );
    expect(linhas[0].deterministic).toBe("SIM");
    expect(linhas[0].regressionState).toBe("UNCHANGED");
    expect(linhas[1].regressionState).toBe("UNKNOWN");
  });

  it("Indexação: NO_DATA permanece literal", () => {
    const linhas = linhasIndexacao(
      { geradoEm: "2026-08-26T00:00:00.000Z", rotas: [{ url: alvos[0].url, internalState: "PUBLISHED", google: { status: "NO_DATA" } }] },
      alvos,
    );
    expect(linhas[0].impressions).toBe("NO_DATA");
    expect(linhas[0].lastCrawl).toBe("NO_DATA");
    expect(linhas[0].indexed).toBe("NAO");
    expect(linhas[1].searchStatus).toBe("UNKNOWN");
  });

  it("CSV é parseável e tem o número correto de linhas", () => {
    const csv = paraCsv(linhasIndexNow(estadoIndexNow, alvos));
    const linhas = csv.trim().split("\n");
    expect(linhas).toHaveLength(3); // cabeçalho + 2
    expect(linhas[0].split(";")).toContain("contentHash");
  });

  it("sanitizar remove chaves sensíveis em profundidade", () => {
    const limpo = sanitizar({ url: "/a", key: "abc", nested: { webhookUrl: "https://hooks.slack.com/services/x", ok: 1 } });
    expect(JSON.stringify(limpo)).not.toMatch(/hooks\.slack\.com|abc/);
    expect(limpo.nested.ok).toBe(1);
  });

  it("detector de segredo reconhece webhook e chave Resend", () => {
    expect(contemSegredo("https://hooks.slack.com/services/T000/B000/xxxx")).toBe(true);
    expect(contemSegredo("re_abcdefghijklmno")).toBe(true);
    expect(contemSegredo("nenhum segredo aqui")).toBe(false);
  });

  it("manifest traz SHA-256 e row count corretos", () => {
    const arquivos = [{ name: "indexnow.csv", content: "a;b\n1;2\n", rows: 1 }];
    const m = montarManifest({ wave: "10C", batch: "2", buildSha: "sha", arquivos });
    expect(m.files[0].sha256).toBe(sha256("a;b\n1;2\n"));
    expect(m.files[0].sha256).toHaveLength(64);
    expect(m.files[0].rows).toBe(1);
  });
});
