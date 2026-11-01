import { describe, expect, it } from "vitest";
import {
  registrarAceiteDiretoNacional,
  type ArmazenamentoAceiteDiretoNacional,
  type ProfissionalAceiteAutenticado,
  type RegistroAceiteNacional,
  type TransacaoAceiteDiretoNacional,
} from "./aceiteDiretoNacional";
import { CONTRATACAO_NACIONAL_ATIVA } from "./contratacaoDiretaNacional";

const solicitacaoId = "pedido_00000001";
const ator: ProfissionalAceiteAutenticado = {
  papel: "profissional",
  userId: "usuario_0001",
  parceiroId: "tecnico_0001",
  sessaoAutenticadaNoServidor: true,
  vinculoComParceiroValidadoNoServidor: true,
};
const inicial: RegistroAceiteNacional = {
  solicitacaoId,
  estado: "pagamento_confirmado",
  tecnicoApresentadoId: ator.parceiroId,
  tecnicoAceitouId: null,
  pagamentoConciliado: true,
  autorizacaoClienteConfirmada: true,
  cotacaoVigente: true,
};

function criarMock({
  identidade = ator,
  pedido = inicial,
  elegivel = true,
  falhaAuditoria = false,
}: {
  identidade?: ProfissionalAceiteAutenticado | null;
  pedido?: RegistroAceiteNacional | null;
  elegivel?: boolean;
  falhaAuditoria?: boolean;
} = {}) {
  let registro = pedido === null ? null : { ...pedido };
  let fila = Promise.resolve();
  const eventos: { solicitacaoId: string; parceiroId: string; atorId: string }[] = [];
  const chamadas: string[] = [];

  const armazenamento: ArmazenamentoAceiteDiretoNacional = {
    async transacaoExclusiva<T>(chave: string, executar: (tx: TransacaoAceiteDiretoNacional) => Promise<T>): Promise<T> {
      const anterior = fila;
      let liberar!: () => void;
      fila = new Promise<void>((resolve) => { liberar = resolve; });
      await anterior;
      let novaVersao: RegistroAceiteNacional | null = null;
      let novoEvento: (typeof eventos)[number] | null = null;
      try {
        const tx: TransacaoAceiteDiretoNacional = {
          async resolverProfissionalAutenticado() {
            chamadas.push("autenticacao");
            return identidade;
          },
          async buscarSolicitacao(id) {
            chamadas.push("solicitacao");
            return id === chave && id === registro?.solicitacaoId ? { ...registro } : null;
          },
          async profissionalContinuaElegivel() {
            chamadas.push("elegibilidade");
            return elegivel;
          },
          async gravarAceiteComAuditoria(id, parceiroId, atorId) {
            chamadas.push("gravacao");
            if (!registro || registro.estado !== "pagamento_confirmado" || registro.tecnicoApresentadoId !== parceiroId) {
              throw new Error("Estado alterado antes do aceite.");
            }
            if (falhaAuditoria) throw new Error("Auditoria transacional falhou.");
            novaVersao = {
              ...registro,
              estado: "aceito_diretamente_pelo_tecnico",
              tecnicoAceitouId: parceiroId,
            };
            novoEvento = { solicitacaoId: id, parceiroId, atorId };
          },
        };
        const resultado = await executar(tx);
        // Test double: estado e log sao confirmados juntos APOS a transacao.
        if (novaVersao && novoEvento) {
          registro = novaVersao;
          eventos.push(novoEvento);
        }
        return resultado;
      } finally {
        liberar();
      }
    },
  };

  return {
    armazenamento,
    chamadas,
    eventos,
    get registro() { return registro; },
  };
}

describe("aceite DIRETO nacional - somente contrato backend nao publicado", () => {
  it("mantem modalidade desligada e registra apenas aceite do titular autenticado", async () => {
    expect(CONTRATACAO_NACIONAL_ATIVA).toBe(false);
    const mock = criarMock();
    expect(await registrarAceiteDiretoNacional(mock.armazenamento, solicitacaoId))
      .toEqual({ aceito: true, estado: "aceito_diretamente", repeticao: false });
    expect(mock.registro?.estado).toBe("aceito_diretamente_pelo_tecnico");
    expect(mock.registro?.tecnicoAceitouId).toBe(ator.parceiroId);
    expect(mock.eventos).toEqual([{ solicitacaoId, parceiroId: ator.parceiroId, atorId: ator.userId }]);
    expect(JSON.stringify(mock.eventos)).not.toMatch(/whatsapp|telefone|cpf|endereco/i);
  });

  it("nega operador, sessao ausente e identidade sem vinculo antes de consultar pedido", async () => {
    for (const identidade of [
      null,
      { ...ator, sessaoAutenticadaNoServidor: false },
      { ...ator, vinculoComParceiroValidadoNoServidor: false },
      { ...ator, papel: "administrador" },
      { ...ator, parceiroId: "?" },
    ]) {
      const mock = criarMock({ identidade: identidade as ProfissionalAceiteAutenticado | null });
      expect(await registrarAceiteDiretoNacional(mock.armazenamento, solicitacaoId))
        .toEqual({ aceito: false, estado: "nao_autorizado" });
      expect(mock.chamadas).toEqual(["autenticacao"]);
      expect(mock.eventos).toHaveLength(0);
    }
  });

  it("nao permite outro tecnico aceitar pedido apresentado a profissional diferente", async () => {
    const mock = criarMock({ identidade: { ...ator, parceiroId: "tecnico_0002" } });
    expect(await registrarAceiteDiretoNacional(mock.armazenamento, solicitacaoId))
      .toEqual({ aceito: false, estado: "nao_autorizado" });
    expect(mock.chamadas).not.toContain("elegibilidade");
    expect(mock.eventos).toHaveLength(0);
  });

  it("nega pedido ausente, ID reaproveitado e falta de pagamento/aceite do cliente", async () => {
    for (const pedido of [
      null,
      { ...inicial, solicitacaoId: "pedido_00000002" },
    ]) {
      const mock = criarMock({ pedido });
      expect(await registrarAceiteDiretoNacional(mock.armazenamento, solicitacaoId))
        .toMatchObject({ aceito: false, estado: "solicitacao_indisponivel" });
    }
    for (const pedido of [
      { ...inicial, estado: "aguardando_pagamento" as const },
      { ...inicial, estado: "cancelado" as const },
      { ...inicial, pagamentoConciliado: false },
      { ...inicial, autorizacaoClienteConfirmada: false },
      { ...inicial, cotacaoVigente: false },
      { ...inicial, tecnicoAceitouId: "outro_tecnico" },
    ]) {
      const mock = criarMock({ pedido });
      expect(await registrarAceiteDiretoNacional(mock.armazenamento, solicitacaoId))
        .toEqual({ aceito: false, estado: "aguardando_confirmacao" });
      expect(mock.eventos).toHaveLength(0);
    }
  });

  it("nova suspensao ou indisponibilidade impede aceite sem disparar acao", async () => {
    const mock = criarMock({ elegivel: false });
    expect(await registrarAceiteDiretoNacional(mock.armazenamento, solicitacaoId))
      .toEqual({ aceito: false, estado: "profissional_inelegivel" });
    expect(mock.chamadas).not.toContain("gravacao");
    expect(mock.eventos).toHaveLength(0);
  });

  it("concorrencia e repeticao nao geram dois aceites ou duas auditorias", async () => {
    const mock = criarMock();
    const [primeiro, segundo] = await Promise.all([
      registrarAceiteDiretoNacional(mock.armazenamento, solicitacaoId),
      registrarAceiteDiretoNacional(mock.armazenamento, solicitacaoId),
    ]);
    expect(primeiro).toEqual({ aceito: true, estado: "aceito_diretamente", repeticao: false });
    expect(segundo).toEqual({ aceito: true, estado: "aceito_diretamente", repeticao: true });
    expect(mock.eventos).toHaveLength(1);
    expect(mock.chamadas.filter((c) => c === "gravacao")).toHaveLength(1);
  });

  it("falha de auditoria deve reverter todo aceite", async () => {
    const mock = criarMock({ falhaAuditoria: true });
    await expect(registrarAceiteDiretoNacional(mock.armazenamento, solicitacaoId))
      .rejects.toThrow(/Auditoria/);
    expect(mock.registro?.estado).toBe("pagamento_confirmado");
    expect(mock.eventos).toHaveLength(0);
  });

  it("rejeita identificadores e backend invalidos", async () => {
    const mock = criarMock();
    await expect(registrarAceiteDiretoNacional(mock.armazenamento, "pedido"))
      .rejects.toThrow(/invalido/);
    await expect(registrarAceiteDiretoNacional(null as unknown as ArmazenamentoAceiteDiretoNacional, solicitacaoId))
      .rejects.toThrow(/invalido/);
  });
});
