import { describe, expect, it } from "vitest";
import {
  proximoTecnicoRegional,
  tecnicoElegivelParaConsulta,
  type ConsultaRodizioRegional,
  type TecnicoElegibilidadeNacional,
} from "./rodizioRegional";

const consulta: ConsultaRodizioRegional = {
  uf: "PR",
  municipio: "São José dos Pinhais",
  servico: "reparos-computadores",
  ultimoApresentadoId: null,
};

function tecnico(id: string, ajustes: Partial<TecnicoElegibilidadeNacional> = {}): TecnicoElegibilidadeNacional {
  return {
    id,
    comunidadeWhatsapp: "confirmada",
    cadastroPlataforma: "validado",
    habilitacao: "habilitado",
    disponibilidade: "disponivel",
    uf: "PR",
    municipiosAtendidos: ["São José dos Pinhais"],
    servicosHabilitados: ["reparos-computadores"],
    distanciaIdaMetros: 3000,
    raioAtendimentoMetros: 10000,
    ...ajustes,
  };
}

describe("elegibilidade — cadastro duplo e disponibilidade real", () => {
  it("exige comunidade confirmada E cadastro validado E habilitação", () => {
    expect(tecnicoElegivelParaConsulta(tecnico("a"), consulta)).toBe(true);
    expect(tecnicoElegivelParaConsulta(tecnico("b", { comunidadeWhatsapp: "pendente" }), consulta)).toBe(false);
    expect(tecnicoElegivelParaConsulta(tecnico("b", { comunidadeWhatsapp: "nao_confirmada" }), consulta)).toBe(false);
    expect(tecnicoElegivelParaConsulta(tecnico("b", { cadastroPlataforma: "pendente" }), consulta)).toBe(false);
    expect(tecnicoElegivelParaConsulta(tecnico("b", { cadastroPlataforma: "suspenso" }), consulta)).toBe(false);
    expect(tecnicoElegivelParaConsulta(tecnico("b", { habilitacao: "pendente" }), consulta)).toBe(false);
    expect(tecnicoElegivelParaConsulta(tecnico("b", { habilitacao: "suspenso" }), consulta)).toBe(false);
  });

  it("não mostra técnicos ocupados ou indisponíveis", () => {
    expect(tecnicoElegivelParaConsulta(tecnico("b", { disponibilidade: "ocupado" }), consulta)).toBe(false);
    expect(tecnicoElegivelParaConsulta(tecnico("b", { disponibilidade: "indisponivel" }), consulta)).toBe(false);
  });

  it("faz comparação exata de UF, cidade e serviço, tolerando acentos", () => {
    expect(tecnicoElegivelParaConsulta(tecnico("a"), { ...consulta, uf: "pr", municipio: "sao jose dos pinhais" })).toBe(true);
    expect(tecnicoElegivelParaConsulta(tecnico("a"), { ...consulta, municipio: "Curitiba" })).toBe(false);
    expect(tecnicoElegivelParaConsulta(tecnico("a"), { ...consulta, municipio: "São José" })).toBe(false);
    expect(tecnicoElegivelParaConsulta(tecnico("a"), { ...consulta, uf: "SC" })).toBe(false);
    expect(tecnicoElegivelParaConsulta(tecnico("a"), { ...consulta, servico: "redes" })).toBe(false);
  });

  it("não supõe raio/rota de atendimento desconhecido", () => {
    expect(tecnicoElegivelParaConsulta(tecnico("a", { distanciaIdaMetros: null }), consulta)).toBe(false);
    expect(tecnicoElegivelParaConsulta(tecnico("a", { raioAtendimentoMetros: null }), consulta)).toBe(false);
    expect(tecnicoElegivelParaConsulta(tecnico("a", { distanciaIdaMetros: 10001 }), consulta)).toBe(false);
    expect(tecnicoElegivelParaConsulta(tecnico("a", { distanciaIdaMetros: 10000 }), consulta)).toBe(true);
    expect(tecnicoElegivelParaConsulta(tecnico("a", { distanciaIdaMetros: -1 }), consulta)).toBe(false);
  });

  it("não confunde pertencimento ao grupo com profissional habilitado", () => {
    const grupoApenas = tecnico("membro", { cadastroPlataforma: "pendente" });
    expect(proximoTecnicoRegional([grupoApenas], consulta)).toEqual({
      disponivel: false, tecnicoId: null, proximoCursorId: null, quantidadeElegiveis: 0,
    });
  });
});

describe("rodízio determinístico de EXIBIÇÃO, sem acionamento", () => {
  const lista = [tecnico("c"), tecnico("a"), tecnico("b")];

  it("percorre A → B → C → A independentemente da ordem do cadastro", () => {
    const ids: string[] = [];
    let ultimo: string | null = null;
    for (let i = 0; i < 4; i++) {
      const proximo = proximoTecnicoRegional(lista, { ...consulta, ultimoApresentadoId: ultimo });
      expect(proximo.disponivel).toBe(true);
      ids.push(proximo.tecnicoId!);
      ultimo = proximo.proximoCursorId;
    }
    expect(ids).toEqual(["a", "b", "c", "a"]);
    expect(proximoTecnicoRegional([...lista].reverse(), { ...consulta, ultimoApresentadoId: "a" }).tecnicoId).toBe("b");
  });

  it("pula indisponíveis e suspensos sem favorecer por preço ou distância", () => {
    const r = proximoTecnicoRegional(
      [tecnico("a", { disponibilidade: "ocupado" }), tecnico("b"), tecnico("c", { cadastroPlataforma: "suspenso" })],
      consulta,
    );
    expect(r).toMatchObject({ disponivel: true, tecnicoId: "b", quantidadeElegiveis: 1 });
  });

  it("não reinicia no primeiro se o último saiu do conjunto", () => {
    expect(proximoTecnicoRegional([tecnico("a"), tecnico("c")], { ...consulta, ultimoApresentadoId: "b" }).tecnicoId).toBe("c");
    expect(proximoTecnicoRegional([tecnico("a"), tecnico("c")], { ...consulta, ultimoApresentadoId: "z" }).tecnicoId).toBe("a");
  });

  it("sem candidato elegível devolve indisponibilidade explícita", () => {
    expect(proximoTecnicoRegional([], consulta)).toEqual({
      disponivel: false, tecnicoId: null, proximoCursorId: null, quantidadeElegiveis: 0,
    });
  });

  it("não admite IDs duplicados, vazios ou consulta incompleta", () => {
    expect(() => proximoTecnicoRegional([tecnico("a"), tecnico("a")], consulta)).toThrow();
    expect(() => proximoTecnicoRegional([tecnico("")], consulta)).toThrow();
    expect(() => proximoTecnicoRegional(lista, { ...consulta, servico: "" })).toThrow();
    expect(() => proximoTecnicoRegional(lista, { ...consulta, uf: "??" })).toThrow();
  });

  it("não expõe endereço, telefone ou nome no resultado", () => {
    const r = proximoTecnicoRegional(lista, consulta);
    expect(Object.keys(r).sort()).toEqual(["disponivel", "proximoCursorId", "quantidadeElegiveis", "tecnicoId"].sort());
    expect(JSON.stringify(r)).not.toMatch(/whatsapp|telefone|endereco|nome/i);
  });

  it("não modifica o cadastro ou a ordem original", () => {
    const original = lista.map((t) => t.id);
    proximoTecnicoRegional(lista, consulta);
    expect(lista.map((t) => t.id)).toEqual(original);
  });
});
