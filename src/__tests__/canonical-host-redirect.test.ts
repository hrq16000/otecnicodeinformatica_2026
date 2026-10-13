import { describe, expect, it } from "vitest";

import { canonicalHostRedirect, canonicalPathRedirect } from "../server";

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


describe("canonical path redirect", () => {
  it("redireciona alias da matriz para o destino canônico", () => {
    const response = canonicalPathRedirect(
      new Request("http://localhost:4321/servicos/formatacao-computador"),
    );

    expect(response?.status).toBe(301);
    expect(response?.headers.get("location")).toBe(
      "http://localhost:4321/servicos/formatacao",
    );
  });

  it("preserva query string ao consolidar alias", () => {
    const response = canonicalPathRedirect(
      new Request("https://otecnicodeinformatica.com.br/privacidade?utm_source=antigo"),
    );

    expect(response?.headers.get("location")).toBe(
      "https://otecnicodeinformatica.com.br/politica-de-privacidade?utm_source=antigo",
    );
  });

  it("aceita barra final no alias sem criar loop", () => {
    const response = canonicalPathRedirect(
      new Request("https://otecnicodeinformatica.com.br/termos/"),
    );

    expect(response?.headers.get("location")).toBe(
      "https://otecnicodeinformatica.com.br/precos-e-politicas",
    );
  });

  it("não redireciona rota que já é canônica", () => {
    expect(
      canonicalPathRedirect(
        new Request("https://otecnicodeinformatica.com.br/servicos/formatacao"),
      ),
    ).toBeNull();
  });
});
