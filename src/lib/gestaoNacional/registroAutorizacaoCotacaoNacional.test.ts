import { describe, expect, it } from "vitest";
import { calcularCotacaoNacional, type EntradaCotacaoNacional } from "./cotacaoNacional";
import { CONTRATACAO_NACIONAL_ATIVA } from "./contratacaoDiretaNacional";
import type { CondicoesVinculadasNacional, ConsentimentoCotacaoNacional } from "./integridadeCotacaoNacional";
import {
  registrarAutorizacaoCotacaoNacional,
  type ArmazenamentoAutorizacaoCotacaoNacional,
  type ClienteAutorizacaoAutenticado,
  type EventoAutorizacaoCotacaoNacional,
  type PedidoAutorizacaoCotacaoNacional,
  type ReferenciaAutorizacaoPelaChave,
  type TransacaoAutorizacaoCotacaoNacional,
} from "./registroAutorizacaoCotacaoNacional";

const agora = "2026-11-07T12:00:00.000Z";
const parametros: EntradaCotacaoNacional = {
  modalidade: "padrao", horasAdicionaisAprovadas: 0,
  distanciaIdaMetros: 1000, estacionamento: { tipo: "vaga_fornecida_pelo_cliente" },
};
const condicoes: CondicoesVinculadasNacional = {
  solicitacaoId: "pedido_00000001", clienteId: "cliente_0001", tecnicoId: "tecnico_0001",
  servicoId: "formatacao", escopo: "Formatação do computador", revisao: 1,
  validadeAteUtc: "2026-11-08T00:00:00.000Z",
  parametros, valores: calcularCotacaoNacional(parametros),
};
const entrada = (chaveIdempotencia = "chave_00000001", revisaoVisualizada = 1) => ({
  solicitacaoId: condicoes.solicitacaoId,
  chaveIdempotencia,
  revisaoVisualizada,
  confirmouIntegralmente: true,
});
const copia = <T>(valor: T): T => structuredClone(valor);
const identidade: ClienteAutorizacaoAutenticado = {
  clienteId: condicoes.clienteId, autenticadoNoServidor: true,
};

function criarMock({
  cliente = identidade,
  pedido = { solicitacaoId: condicoes.solicitacaoId, estado: "rascunho" as const,
    condicoesAtuais: condicoes, consentimentoAtual: null, chaveAutorizacaoAtual: null },
  dataUtc = agora,
  usosAnteriores = [],
  falhaAuditoria = false,
}: {
  cliente?: ClienteAutorizacaoAutenticado | null;
  pedido?: PedidoAutorizacaoCotacaoNacional | null;
  dataUtc?: string;
  usosAnteriores?: ReferenciaAutorizacaoPelaChave[];
  falhaAuditoria?: boolean;
} = {}) {
  let registro = copia(pedido);
  const usos = copia(usosAnteriores);
  const eventos: EventoAutorizacaoCotacaoNacional[] = [];
  const chamadas: string[] = [];
  let fila = Promise.resolve();

  const armazenamento: ArmazenamentoAutorizacaoCotacaoNacional = {
    async emContextoAutenticado(executar) {
      return executar({
        async resolverClienteNoServidor() {
          chamadas.push("sessao");
          return cliente;
        },
        async transacaoExclusiva<T>(
          clienteId: string, solicitacaoId: string, chave: string,
          executarTx: (tx: TransacaoAutorizacaoCotacaoNacional) => Promise<T>,
        ): Promise<T> {
          chamadas.push("lock");
          const anterior = fila;
          let liberar!: () => void;
          fila = new Promise<void>((resolve) => { liberar = resolve; });
          await anterior;

          // Test double: só materializa o estado e os eventos após o sucesso.
          let pendente = registro ? copia(registro) : null;
          let novoEvento: EventoAutorizacaoCotacaoNacional | null = null;
          let novoUso: ReferenciaAutorizacaoPelaChave | null = null;
          try {
            const tx: TransacaoAutorizacaoCotacaoNacional = {
              async instanteUtcServidor() {
                chamadas.push("relogio");
                return dataUtc;
              },
              async buscarPedido(id) {
                chamadas.push("pedido");
                return pendente?.solicitacaoId === id ? copia(pendente) : null;
              },
              async buscarUsoChaveCliente(id) {
                chamadas.push("chave");
                return copia(usos.find((r) => r.clienteId === clienteId && r.chaveIdempotencia === id) ?? null);
              },
              async gravarConsentimentoEAuditoria(consentimento, chaveIdempotencia, evento) {
                chamadas.push("gravacao");
                if (!pendente || pendente.estado !== "rascunho" ||
                    pendente.condicoesAtuais.revisao !== consentimento.condicoes.revisao ||
                    pendente.condicoesAtuais.clienteId !== clienteId ||
                    pendente.solicitacaoId !== solicitacaoId ||
                    chaveIdempotencia !== chave ||
                    usos.some((r) => r.clienteId === clienteId && r.chaveIdempotencia === chave)) {
                  throw new Error("Conflito de gravação.");
                }
                if (falhaAuditoria) throw new Error("Falha de auditoria.");
                pendente = {
                  ...pendente, estado: "cotacao_aceita",
                  consentimentoAtual: copia(consentimento),
                  chaveAutorizacaoAtual: chaveIdempotencia,
                };
                novoEvento = copia(evento);
                novoUso = { solicitacaoId, clienteId, revisao: consentimento.condicoes.revisao,
                  chaveIdempotencia };
              },
            };
            const resultado = await executarTx(tx);
            if (novoEvento && novoUso) {
              registro = pendente;
              eventos.push(novoEvento);
              usos.push(novoUso);
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
    armazenamento, eventos, usos, chamadas,
    get pedido() { return registro; },
  };
}

describe("rodada 17 — autorização transacional auditável (adaptador mock)", () => {
  it("registra consentimento explícito e auditoria sem ativar modalidade", async () => {
    const mock = criarMock();
    expect(CONTRATACAO_NACIONAL_ATIVA).toBe(false);
    expect(await registrarAutorizacaoCotacaoNacional(mock.armazenamento, entrada()))
      .toEqual({ autorizada: true, estado: "nova", revisao: 1 });
    expect(mock.pedido?.estado).toBe("cotacao_aceita");
    expect(mock.pedido?.consentimentoAtual?.clienteAutenticadoId).toBe(condicoes.clienteId);
    expect(mock.eventos).toEqual([{
      tipo: "cotacao_aceita_cliente", solicitacaoId: condicoes.solicitacaoId,
      clienteId: condicoes.clienteId, revisao: 1, instanteUtc: agora,
      chaveIdempotencia: "chave_00000001",
    }]);
    expect(JSON.stringify(mock.eventos)).not.toMatch(/whatsapp|cpf|telefone|endereco/i);
  });

  it("exige confirmação explícita antes de iniciar qualquer contexto ou transação", async () => {
    const mock = criarMock();
    expect(await registrarAutorizacaoCotacaoNacional(mock.armazenamento, {
      ...entrada(), confirmouIntegralmente: false,
    })).toEqual({ autorizada: false, estado: "confirmacao_necessaria" });
    expect(mock.chamadas).toEqual([]);
  });

  it("bloqueia sessão ausente, inválida e outro cliente", async () => {
    for (const cliente of [null, { ...identidade, autenticadoNoServidor: false },
      { ...identidade, clienteId: "cliente_0002" }]) {
      const mock = criarMock({ cliente: cliente as ClienteAutorizacaoAutenticado | null });
      expect((await registrarAutorizacaoCotacaoNacional(mock.armazenamento, entrada())).autorizada)
        .toBe(false);
      expect(mock.eventos).toHaveLength(0);
    }
  });

  it("bloqueia pedido inexistente e revisão diferente da exibida", async () => {
    const ausente = criarMock({ pedido: null });
    expect(await registrarAutorizacaoCotacaoNacional(ausente.armazenamento, entrada()))
      .toMatchObject({ autorizada: false, estado: "nao_autorizado" });
    const revisao = criarMock();
    expect(await registrarAutorizacaoCotacaoNacional(revisao.armazenamento, entrada("chave_00000001", 2)))
      .toMatchObject({ autorizada: false, estado: "revisao_divergente" });
  });

  it("bloqueia cotação expirada, total corrompido e data inválida", async () => {
    const alteracoes = [
      { ...condicoes, validadeAteUtc: "2026-11-07T11:00:00.000Z" },
      { ...condicoes, valores: { ...condicoes.valores, totalClienteCentavos: 123 } },
      { ...condicoes, validadeAteUtc: "2026-02-30T00:00:00.000Z" },
    ];
    for (const atual of alteracoes) {
      const mock = criarMock({ pedido: { solicitacaoId: condicoes.solicitacaoId,
        estado: "rascunho", condicoesAtuais: atual, consentimentoAtual: null, chaveAutorizacaoAtual: null } });
      expect(await registrarAutorizacaoCotacaoNacional(mock.armazenamento, entrada()))
        .toMatchObject({ autorizada: false, estado: "cotacao_indisponivel" });
      expect(mock.eventos).toHaveLength(0);
    }
  });

  it("aceita duas requisições concorrentes com UMA autorização e UMA auditoria", async () => {
    const mock = criarMock();
    const [primeira, repetida] = await Promise.all([
      registrarAutorizacaoCotacaoNacional(mock.armazenamento, entrada()),
      registrarAutorizacaoCotacaoNacional(mock.armazenamento, entrada()),
    ]);
    expect(primeira).toEqual({ autorizada: true, estado: "nova", revisao: 1 });
    expect(repetida).toEqual({ autorizada: true, estado: "idempotente", revisao: 1 });
    expect(mock.eventos).toHaveLength(1);
    expect(mock.chamadas.filter((c) => c === "gravacao")).toHaveLength(1);
  });

  it("repetição de autorização concluída é segura após expiração da cotação", async () => {
    const mock = criarMock({ dataUtc: "2026-11-09T00:00:00.000Z" });
    // Persistido anteriormente: a mesma revisão e as mesmas condições.
    const consentimento: ConsentimentoCotacaoNacional = {
      condicoes, clienteAutenticadoId: condicoes.clienteId,
      verificadoNoServidor: true, aceitoEmUtc: agora,
    };
    const aceito = criarMock({
      dataUtc: "2026-11-09T00:00:00.000Z",
      pedido: { solicitacaoId: condicoes.solicitacaoId, estado: "cotacao_aceita",
        condicoesAtuais: condicoes, consentimentoAtual: consentimento,
        chaveAutorizacaoAtual: "chave_00000001" },
      usosAnteriores: [{ solicitacaoId: condicoes.solicitacaoId, clienteId: condicoes.clienteId,
        revisao: 1, chaveIdempotencia: "chave_00000001" }],
    });
    expect(await registrarAutorizacaoCotacaoNacional(aceito.armazenamento, entrada()))
      .toEqual({ autorizada: true, estado: "idempotente", revisao: 1 });
    expect(aceito.eventos).toHaveLength(0);
    expect(mock.eventos).toHaveLength(0);
  });

  it("nega segunda chave para revisão já autorizada", async () => {
    const mock = criarMock();
    await registrarAutorizacaoCotacaoNacional(mock.armazenamento, entrada());
    expect(await registrarAutorizacaoCotacaoNacional(mock.armazenamento, entrada("chave_00000002")))
      .toMatchObject({ autorizada: false, estado: "ja_autorizada" });
    expect(mock.eventos).toHaveLength(1);
  });

  it("impede reutilizar chave global entre pedidos e revisões", async () => {
    const mock = criarMock({
      usosAnteriores: [{ solicitacaoId: "pedido_00000002", clienteId: condicoes.clienteId,
        revisao: 1, chaveIdempotencia: "chave_00000001" }],
    });
    expect(await registrarAutorizacaoCotacaoNacional(mock.armazenamento, entrada()))
      .toMatchObject({ autorizada: false, estado: "chave_em_conflito" });
    expect(mock.eventos).toHaveLength(0);
  });

  it("bloqueia pedido cancelado, já em pagamento e estado sem aceite", async () => {
    for (const estado of ["cancelado", "pagamento_confirmado", "aguardando_pagamento"] as const) {
      const mock = criarMock({ pedido: { solicitacaoId: condicoes.solicitacaoId,
        estado, condicoesAtuais: condicoes, consentimentoAtual: null, chaveAutorizacaoAtual: null } });
      expect(await registrarAutorizacaoCotacaoNacional(mock.armazenamento, entrada()))
        .toMatchObject({ autorizada: false, estado: "estado_invalido" });
    }
  });

  it("falha de auditoria desfaz simultaneamente estado, consentimento e chave", async () => {
    const mock = criarMock({ falhaAuditoria: true });
    await expect(registrarAutorizacaoCotacaoNacional(mock.armazenamento, entrada()))
      .rejects.toThrow(/auditoria/i);
    expect(mock.pedido?.estado).toBe("rascunho");
    expect(mock.pedido?.consentimentoAtual).toBeNull();
    expect(mock.eventos).toHaveLength(0);
    expect(mock.usos).toHaveLength(0);
  });

  it("nova revisão exige novo aceite e nova chave, preservando o histórico anterior", async () => {
    const anterior: ConsentimentoCotacaoNacional = {
      condicoes, clienteAutenticadoId: condicoes.clienteId,
      verificadoNoServidor: true, aceitoEmUtc: agora,
    };
    const nova = { ...condicoes, revisao: 2, escopo: "Formatação e backup" };
    const mock = criarMock({
      pedido: { solicitacaoId: condicoes.solicitacaoId, estado: "rascunho",
        condicoesAtuais: nova, consentimentoAtual: anterior,
        chaveAutorizacaoAtual: "chave_00000001" },
      usosAnteriores: [{ solicitacaoId: condicoes.solicitacaoId,
        clienteId: condicoes.clienteId, revisao: 1, chaveIdempotencia: "chave_00000001" }],
    });
    expect(await registrarAutorizacaoCotacaoNacional(mock.armazenamento, entrada("chave_00000001", 2)))
      .toMatchObject({ autorizada: false, estado: "chave_em_conflito" });
    expect(await registrarAutorizacaoCotacaoNacional(mock.armazenamento, entrada("chave_00000002", 2)))
      .toEqual({ autorizada: true, estado: "nova", revisao: 2 });
    expect(mock.usos).toHaveLength(2);
    expect(mock.eventos).toHaveLength(1);
  });

  it("rejeita entradas incompletas ou forjadas", async () => {
    const mock = criarMock();
    for (const invalida of [
      { ...entrada(), solicitacaoId: "?" },
      { ...entrada(), chaveIdempotencia: "x" },
      { ...entrada(), revisaoVisualizada: 0 },
      { ...entrada(), revisaoVisualizada: 1.5 },
      { ...entrada(), confirmouIntegralmente: "true" },
    ]) {
      await expect(registrarAutorizacaoCotacaoNacional(
        mock.armazenamento, invalida as ReturnType<typeof entrada>,
      )).rejects.toThrow(/inválida/);
    }
    expect(mock.eventos).toHaveLength(0);
  });
});
