import { describe, expect, it } from "vitest";

import { canonicalAliasRedirect, canonicalHostRedirect } from "../server";

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


describe("SSR 301 para aliases canonicos", () => {
  it("envia slug de servico antigo para a owner com 301, sem perder query", () => {
    const response = canonicalAliasRedirect(
      new Request("https://otecnicodeinformatica.com.br/servicos/formatacao-computador?utm_source=bing"),
    );
    expect(response?.status).toBe(301);
    expect(response?.headers.get("location")).toBe(
      "https://otecnicodeinformatica.com.br/servicos/formatacao?utm_source=bing",
    );
  });

  it("unifica www e slug antigo em um unico redirecionamento", () => {
    const response = canonicalAliasRedirect(
      new Request("http://www.otecnicodeinformatica.com.br/privacidade?ref=menu"),
    );
    expect(response?.status).toBe(301);
    expect(response?.headers.get("location")).toBe(
      "https://otecnicodeinformatica.com.br/politica-de-privacidade?ref=menu",
    );
  });

  it("preserva a origem de preview/localhost em testes locais", () => {
    const response = canonicalAliasRedirect(
      new Request("http://localhost:4173/servicos/remocao-virus"),
    );
    expect(response?.status).toBe(301);
    expect(response?.headers.get("location")).toBe(
      "http://localhost:4173/servicos/remocao-de-virus",
    );
  });

  it("aplica a matriz editorial sem inventar novo destino", () => {
    const response = canonicalAliasRedirect(
      new Request("https://otecnicodeinformatica.com.br/blog/tela-azul-windows-como-resolver"),
    );
    expect(response?.status).toBe(301);
    expect(response?.headers.get("location")).toBe(
      "https://otecnicodeinformatica.com.br/blog/como-resolver-tela-azul-windows",
    );
  });

  it("nao altera paginas canonicas, rotas desconhecidas nem POST", () => {
    expect(canonicalAliasRedirect(new Request("https://otecnicodeinformatica.com.br/servicos/formatacao"))).toBeNull();
    expect(canonicalAliasRedirect(new Request("https://otecnicodeinformatica.com.br/rota-inexistente"))).toBeNull();
    expect(canonicalAliasRedirect(new Request("https://otecnicodeinformatica.com.br/servicos/remocao-virus", { method: "POST" }))).toBeNull();
  });
});
