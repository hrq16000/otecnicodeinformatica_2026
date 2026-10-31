import { describe, expect, it } from "vitest";
import {
  apresentarProximoTecnicoNacional,
  escopoRodizioNacional,
  type ConsultaApresentacaoNacional,
  type RegistroApresentacaoNacional,
  type RepositorioRodizioNacional,
  type TransacaoRodizioNacional,
} from "./rodizioTransacional";
import type { TecnicoElegibilidadeNacional } from "./rodizioRegional";

const consultaBase: ConsultaApresentacaoNacional = {
  solicitacaoId: "pedido_00000001",
  uf: "PR",
  municipio: "São José dos Pinhais",
  servico: "reparos-computadores",
};

function tecnico(id: string, situacao: "disponivel" | "ocupado" = "disponivel"): TecnicoElegibilidadeNacional {
  return {
    id,
    comunidadeWhatsapp: "confirmada",
    cadastroPlataforma: "validado",
    habilitacao: "habilitado",
    disponibilidade: situacao,
    uf: "PR",
    municipiosAtendidos: ["São José dos Pinhais"],
    servicosHabilitados: ["reparos-computadores"],
    distanciaIdaMetros: 2000,
    raioAtendimentoMetros: 10000,
  };
}

/** Somente mock de teste: backend real precisa de transação/índices no banco. */
function repositorioEmMemoria(
  candidatos: TecnicoElegibilidadeNacional[],
): RepositorioRodizioNacional & { registros: RegistroApresentacaoNacional[]; posicoes: Map<string, string> } {
  const registros: RegistroApresentacaoNacional[] = [];
  const posicoes = new Map<string, string>();
  let fila = Promise.resolve();
  return {
    registros,
    posicoes,
    async emTransacaoExclusiva<T>(escopo: string, executar: (tx: TransacaoRodizioNacional) => Promise<T>): Promise<T> {
      const anterior = fila;
      let liberar!: () => void;
      fila = new Promise<void>((resolve) => { liberar = resolve; });
      await anterior;
      try {
        const tx: TransacaoRodizioNacional = {
          async buscarPorSolicitacao(id) {
            return registros.find((r) => r.solicitacaoId === id) ?? null;
          },
          async consultarUltimoApresentado() {
            return posicoes.get(escopo) ?? null;
          },
          async listarProfissionaisElegiveis() {
            return candidatos;
          },
          async confirmarApresentacao(registro) {
            // Registro e cursor atomicamente atualizados no mock sob lock.
            registros.push(registro);
            posicoes.set(escopo, registro.tecnicoId);
          },
        };
        return await executar(tx);
      } finally {
        liberar();
      }
    },
  };
}

describe("rodízio transacional de EXIBIÇÃO — contrato sem backend", () => {
  it("normaliza UF/cidade/serviço em escopo único", () => {
    expect(escopoRodizioNacional(consultaBase)).toBe("PR|sao jose dos pinhais|reparos-computadores");
    expect(escopoRodizioNacional({ ...consultaBase, municipio: "sao jose dos pinhais", uf: "pr" }))
      .toBe("PR|sao jose dos pinhais|reparos-computadores");
    expect(() => escopoRodizioNacional({ ...consultaBase, uf: "XX|" })).toThrow();
  });

  it("não avança a fila sem candidatos realmente elegíveis", async () => {
    const repo = repositorioEmMemoria([tecnico("a", "ocupado")]);
    const r = await apresentarProximoTecnicoNacional(repo, consultaBase);
    expect(r).toEqual({ estado: "sem_profissional", tecnicoId: null, repeticao: false });
    expect(repo.registros).toHaveLength(0);
    expect(repo.posicoes.size).toBe(0);
  });

  it("apresenta por rodízio e retorna mesma escolha em retries idempotentes", async () => {
    const repo = repositorioEmMemoria([tecnico("c"), tecnico("b"), tecnico("a")]);
    const a = await apresentarProximoTecnicoNacional(repo, consultaBase);
    const repetido = await apresentarProximoTecnicoNacional(repo, consultaBase);
    const b = await apresentarProximoTecnicoNacional(repo, { ...consultaBase, solicitacaoId: "pedido_00000002" });
    const c = await apresentarProximoTecnicoNacional(repo, { ...consultaBase, solicitacaoId: "pedido_00000003" });
    const proximo = await apresentarProximoTecnicoNacional(repo, { ...consultaBase, solicitacaoId: "pedido_00000004" });
    expect([a.tecnicoId, b.tecnicoId, c.tecnicoId, proximo.tecnicoId]).toEqual(["a", "b", "c", "a"]);
    expect(repetido).toEqual({ estado: "apresentado", tecnicoId: "a", repeticao: true });
    expect(repo.registros).toHaveLength(4);
  });

  it("duas solicitações simultâneas não escolhem o mesmo próximo técnico no mock com lock", async () => {
    const repo = repositorioEmMemoria([tecnico("a"), tecnico("b")]);
    const [a, b] = await Promise.all([
      apresentarProximoTecnicoNacional(repo, consultaBase),
      apresentarProximoTecnicoNacional(repo, { ...consultaBase, solicitacaoId: "pedido_00000002" }),
    ]);
    expect([a.tecnicoId, b.tecnicoId]).toEqual(["a", "b"]);
    expect(repo.registros).toHaveLength(2);
  });

  it("duas chamadas simultâneas do mesmo pedido fazem um único avanço", async () => {
    const repo = repositorioEmMemoria([tecnico("a"), tecnico("b")]);
    const [primeira, segunda] = await Promise.all([
      apresentarProximoTecnicoNacional(repo, consultaBase),
      apresentarProximoTecnicoNacional(repo, consultaBase),
    ]);
    expect(primeira.tecnicoId).toBe("a");
    expect(segunda).toEqual({ estado: "apresentado", tecnicoId: "a", repeticao: true });
    expect(repo.registros).toHaveLength(1);
  });

  it("recusa reutilização do mesmo ID para outra região ou outro serviço", async () => {
    const repo = repositorioEmMemoria([tecnico("a")]);
    await apresentarProximoTecnicoNacional(repo, consultaBase);
    await expect(apresentarProximoTecnicoNacional(repo, { ...consultaBase, municipio: "Curitiba" }))
      .rejects.toThrow(/outro escopo/);
  });

  it("rejeita chaves ausentes ou cliente sem repositório validado", async () => {
    const repo = repositorioEmMemoria([tecnico("a")]);
    await expect(apresentarProximoTecnicoNacional(repo, { ...consultaBase, solicitacaoId: "" }))
      .rejects.toThrow();
    await expect(apresentarProximoTecnicoNacional(null as unknown as RepositorioRodizioNacional, consultaBase))
      .rejects.toThrow();
  });
});
