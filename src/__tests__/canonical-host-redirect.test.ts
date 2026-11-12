import { describe, expect, it } from "vitest";

import { canonicalHostRedirect, legacyAliasRedirect } from "../server";

describe("canonical host redirect", () => {
  it("redireciona http do host canônico para https preservando path e query", () => {
    const response = canonicalHostRedirect(
      new Request("http://otecnicodeinformatica.com.br/blog/teste?utm_source=gsc"),
    );

    expect(response?.status).toBe(308);
    expect(response?.headers.get("location")).toBe(
      "https://otecnicodeinformatica.com.br/blog/teste?utm_source=gsc",
    );
  });

  it("redireciona www para o host canônico sem www", () => {
    const response = canonicalHostRedirect(
      new Request("https://www.otecnicodeinformatica.com.br/servicos?x=1"),
    );

    expect(response?.status).toBe(308);
    expect(response?.headers.get("location")).toBe(
      "https://otecnicodeinformatica.com.br/servicos?x=1",
    );
  });

  it("não redireciona a URL canônica", () => {
    const response = canonicalHostRedirect(
      new Request("https://otecnicodeinformatica.com.br/problemas/computador-lento"),
    );

    expect(response).toBeNull();
  });

  it("não interfere em preview ou localhost", () => {
    expect(
      canonicalHostRedirect(new Request("https://preview.exemplo.dev/teste")),
    ).toBeNull();
    expect(
      canonicalHostRedirect(new Request("http://localhost:3000/teste")),
    ).toBeNull();
  });
});

describe("redirect de aliases no SSR", () => {
  it.each(["GET", "HEAD"])("retorna 301 para %s com a query original", (method) => {
    const response = legacyAliasRedirect(
      new Request("https://otecnicodeinformatica.com.br/privacidade/?utm_source=gsc", { method }),
    );

    expect(response?.status).toBe(301);
    expect(response?.headers.get("location")).toBe(
      "https://otecnicodeinformatica.com.br/politica-de-privacidade?utm_source=gsc",
    );
  });

  it("deixa a rota canônica e POST passarem para o handler", () => {
    expect(legacyAliasRedirect(new Request("https://otecnicodeinformatica.com.br/politica-de-privacidade"))).toBeNull();
    expect(legacyAliasRedirect(new Request("https://otecnicodeinformatica.com.br/privacidade", { method: "POST" }))).toBeNull();
  });
});
