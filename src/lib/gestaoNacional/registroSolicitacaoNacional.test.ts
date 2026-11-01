import { describe, expect, it } from "vitest";
import {
  registrarSolicitacaoDiretaNacional,
  type ArmazenamentoRegistroSolicitacaoNacional,
  type ClienteNacionalAutenticado,
  type SolicitacaoNacionalComChave,
  type TransacaoRegistroSolicitacaoNacional,
} from "./registroSolicitacaoNacional";
import { CONTRATACAO_NACIONAL_ATIVA } from "./contratacaoDiretaNacional";

const cliente: ClienteNacionalAutenticado = {
  clienteId: "cliente_0001", autenticadoNoServidor: true,
};
const entrada = (servicoId: string, chaveIdempotencia: string) => ({ servicoId, chaveIdempotencia });

function criarMock({
  identidade = cliente,
  dataInicial = "2026-10-31",
  catalogados = ["computador", "rede", "impressora", "monitor"],
  falhaAuditoria = false,
}: {
  identidade?: ClienteNacionalAutenticado | null;
  dataInicial?: string;
  catalogados?: string[];
  falhaAuditoria?: boolean;
} = {}) {
  let diaAtual = dataInicial;
  let sequencia = 0;
  let gerarIdSubstituto: string | null = null;
  const registros: SolicitacaoNacionalComChave[] = [];
  const eventos: string[] = [];
  const chamadas: string[] = [];
  let fila = Promise.resolve();

  const armazenamento: ArmazenamentoRegistroSolicitacaoNacional = {
    async emContextoAutenticado(executar) {
      return executar({
        async resolverClienteNoServidor() {
          chamadas.push("identidade");
          return identidade;
        },
        async dataCivilDoServidor() {
          chamadas.push("data");
          return diaAtual;
        },
        async transacaoExclusivaClienteDia<T>(clienteId: string, dataCivil: string, fn: (tx: TransacaoRegistroSolicitacaoNacional) => Promise<T>): Promise<T> {
          const anterior = fila;
          let liberar!: () => void;
          fila = new Promise<void>((resolve) => { liberar = resolve; });
          await anterior;
          let proximo: SolicitacaoNacionalComChave | null = null;
          try {
            const tx: TransacaoRegistroSolicitacaoNacional = {
              async buscarPelaChaveDoCliente(chave) {
                return registros.find((r) => r.clienteId === clienteId && r.chaveIdempotencia === chave) ?? null;
              },
              async listarDoClienteNoDia() {
                return registros.filter((r) => r.clienteId === clienteId && r.dataCivil === dataCivil);
              },
              async servicoCatalogadoEPermitido(servicoId) {
                return catalogados.includes(servicoId);
              },
              async gerarSolicitacaoIdServidor() {
                return gerarIdSubstituto ?? `pedido_${String(++sequencia).padStart(8, "0")}`;
              },
              async gravarSolicitacaoEAuditoria(registro) {
                chamadas.push("gravacao");
                if (falhaAuditoria) throw new Error("Falha de auditoria, rollback obrigatorio");
                if (registros.some((r) => r.solicitacaoId === registro.solicitacaoId ||
                  (r.clienteId === registro.clienteId && r.chaveIdempotencia === registro.chaveIdempotencia))) {
                  throw new Error("Restricao unica violada.");
                }
                if (registros.some((r) => r.clienteId === clienteId && r.dataCivil === dataCivil && r.servicoId === registro.servicoId)) {
                  throw new Error("Servico ja criado no dia.");
                }
                proximo = { ...registro };
              },
            };
            const resultado = await fn(tx);
            if (proximo !== null) {
              registros.push(proximo);
              eventos.push(proximo.solicitacaoId);
            }
            return resultado;
          } finally {
            liberar();
          }
        },
      });
    },
  };
  return {
    armazenamento, registros, eventos, chamadas,
    trocarDia(dia: string) { diaAtual = dia; },
    substituirIdGerado(id: string) { gerarIdSubstituto = id; },
  };
}

describe("registro nacional de solicitacao — contrato isolado de backend", () => {
  it("mantem funcionalidade desligada e grava pedido e auditoria do cliente logado", async () => {
    expect(CONTRATACAO_NACIONAL_ATIVA).toBe(false);
    const mock = criarMock();
    const r = await registrarSolicitacaoDiretaNacional(mock.armazenamento, entrada("computador", "chave_00000001"));
    expect(r).toEqual({ registrada: true, estado: "nova", solicitacaoId: "pedido_00000001", totalNoDia: 1 });
    expect(mock.registros).toEqual([{
      solicitacaoId: "pedido_00000001",
      chaveIdempotencia: "chave_00000001",
      clienteId: cliente.clienteId,
      dataCivil: "2026-10-31",
      servicoId: "computador",
    }]);
    expect(mock.eventos).toEqual(["pedido_00000001"]);
    expect(JSON.stringify(mock.registros)).not.toMatch(/cpf|telefone|whatsapp|endereco/i);
  });

  it("sem identidade validada nao consulta catalogo, historico nem grava", async () => {
    for (const identidade of [
      null,
      { ...cliente, autenticadoNoServidor: false },
      { ...cliente, clienteId: "?" },
    ]) {
      const mock = criarMock({ identidade: identidade as ClienteNacionalAutenticado | null });
      expect(await registrarSolicitacaoDiretaNacional(mock.armazenamento, entrada("computador", "chave_00000001")))
        .toEqual({ registrada: false, estado: "nao_autenticado", solicitacaoId: null });
      expect(mock.chamadas).toEqual(["identidade"]);
      expect(mock.registros).toHaveLength(0);
    }
  });

  it("repeticao com a mesma chave nao consome outra cota nem cria outro registro", async () => {
    const mock = criarMock();
    const primeiro = await registrarSolicitacaoDiretaNacional(mock.armazenamento, entrada("computador", "chave_00000001"));
    const segundo = await registrarSolicitacaoDiretaNacional(mock.armazenamento, entrada("computador", "chave_00000001"));
    expect(segundo).toEqual({
      registrada: true, estado: "idempotente",
      solicitacaoId: primeiro.registrada ? primeiro.solicitacaoId : "", totalNoDia: 1,
    });
    expect(mock.registros).toHaveLength(1);
    expect(mock.eventos).toHaveLength(1);
  });

  it("chave reaproveitada para outro servico ou dia e bloqueada", async () => {
    const mock = criarMock();
    await registrarSolicitacaoDiretaNacional(mock.armazenamento, entrada("computador", "chave_00000001"));
    expect(await registrarSolicitacaoDiretaNacional(mock.armazenamento, entrada("rede", "chave_00000001")))
      .toEqual({ registrada: false, estado: "id_em_conflito", solicitacaoId: null });
    mock.trocarDia("2026-11-01");
    expect(await registrarSolicitacaoDiretaNacional(mock.armazenamento, entrada("computador", "chave_00000001")))
      .toEqual({ registrada: false, estado: "id_em_conflito", solicitacaoId: null });
    expect(mock.registros).toHaveLength(1);
  });

  it("limita a tres servicos diferentes no mesmo dia", async () => {
    const mock = criarMock();
    for (const [indice, servico] of ["computador", "rede", "impressora"].entries()) {
      expect(await registrarSolicitacaoDiretaNacional(mock.armazenamento, entrada(servico, `chave_0000000${indice}`)))
        .toMatchObject({ registrada: true, estado: "nova", totalNoDia: indice + 1 });
    }
    expect(await registrarSolicitacaoDiretaNacional(mock.armazenamento, entrada("monitor", "chave_00000004")))
      .toEqual({ registrada: false, estado: "limite_diario", solicitacaoId: null });
    expect(mock.registros).toHaveLength(3);
  });

  it("bloqueia servico repetido, nao catalogado e IDs adulterados", async () => {
    const mock = criarMock();
    await registrarSolicitacaoDiretaNacional(mock.armazenamento, entrada("computador", "chave_00000001"));
    expect(await registrarSolicitacaoDiretaNacional(mock.armazenamento, entrada("computador", "chave_00000002")))
      .toEqual({ registrada: false, estado: "servico_repetido", solicitacaoId: null });
    expect(await registrarSolicitacaoDiretaNacional(mock.armazenamento, entrada("inexistente", "chave_00000003")))
      .toEqual({ registrada: false, estado: "servico_nao_permitido", solicitacaoId: null });
    mock.substituirIdGerado("pedido_00000001");
    await expect(registrarSolicitacaoDiretaNacional(mock.armazenamento, entrada("rede", "chave_00000004")))
      .rejects.toThrow(/nao e unico/);
    expect(mock.registros).toHaveLength(1);
  });

  it("duas requisicoes simultaneas da mesma chave produzem somente uma solicitacao", async () => {
    const mock = criarMock();
    const [a, b] = await Promise.all([
      registrarSolicitacaoDiretaNacional(mock.armazenamento, entrada("computador", "chave_00000001")),
      registrarSolicitacaoDiretaNacional(mock.armazenamento, entrada("computador", "chave_00000001")),
    ]);
    expect([a.estado, b.estado]).toEqual(["nova", "idempotente"]);
    expect(mock.registros).toHaveLength(1);
    expect(mock.eventos).toHaveLength(1);
  });

  it("duas chaves simultaneas para o mesmo servico nao ultrapassam limite", async () => {
    const mock = criarMock();
    const [a, b] = await Promise.all([
      registrarSolicitacaoDiretaNacional(mock.armazenamento, entrada("computador", "chave_00000001")),
      registrarSolicitacaoDiretaNacional(mock.armazenamento, entrada("computador", "chave_00000002")),
    ]);
    expect([a.estado, b.estado]).toEqual(["nova", "servico_repetido"]);
    expect(mock.registros).toHaveLength(1);
  });

  it("falha de auditoria impede gravacao parcial", async () => {
    const mock = criarMock({ falhaAuditoria: true });
    await expect(registrarSolicitacaoDiretaNacional(mock.armazenamento, entrada("computador", "chave_00000001")))
      .rejects.toThrow(/auditoria/);
    expect(mock.registros).toHaveLength(0);
    expect(mock.eventos).toHaveLength(0);
  });

  it("bloqueia data civil, token e IDs de servico invalidos", async () => {
    const mock = criarMock({ dataInicial: "2026-02-30" });
    await expect(registrarSolicitacaoDiretaNacional(mock.armazenamento, entrada("computador", "chave_00000001")))
      .rejects.toThrow(/Data civil/);
    const ok = criarMock();
    await expect(registrarSolicitacaoDiretaNacional(ok.armazenamento, entrada("computador", "curta")))
      .rejects.toThrow(/invalido/);
    await expect(registrarSolicitacaoDiretaNacional(ok.armazenamento, entrada("Servico com espaco", "chave_00000001")))
      .rejects.toThrow(/invalido/);
    expect(ok.chamadas).toHaveLength(0);
  });
});
