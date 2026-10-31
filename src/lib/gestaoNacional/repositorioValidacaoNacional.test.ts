import { describe, expect, it } from "vitest";
import {
  persistirValidacaoNacional,
  type ArmazenamentoValidacaoNacional,
  type TransacaoValidacaoNacional,
} from "./repositorioValidacaoNacional";
import type {
  AtorValidadoNacional,
  RegistroValidacaoNacional,
  ResultadoAtualizacaoNacional,
} from "./validacaoAdministrativa";

const agora = new Date("2026-10-31T19:00:00Z");
const base: RegistroValidacaoNacional = {
  parceiroId: "partner-001", titularUserId: "user-001", revisao: 0,
  versaoTermosAceita: null, comunidadeWhatsapp: "pendente",
  habilitacaoNacional: "pendente", termosDaModalidadeAceitos: false,
  disponibilidade: "indisponivel", disponibilidadeExpiraEm: "",
  municipiosValidados: [], servicosValidados: [], distanciaIdaMetros: null,
  raioAtendimentoMetros: null,
};

const admin: AtorValidadoNacional = {
  papel: "administrador", userId: "admin-001", sessaoAutenticadaNoServidor: true,
};
const tecnico: AtorValidadoNacional = {
  papel: "profissional", userId: "user-001", sessaoAutenticadaNoServidor: true,
};

function criarMock(ator: AtorValidadoNacional | null, falhaAuditoria = false) {
  let registro = structuredClone(base);
  const auditoria: ResultadoAtualizacaoNacional["evento"][] = [];
  let fila = Promise.resolve();
  const backend: ArmazenamentoValidacaoNacional = {
    async transacaoExclusiva<T>(
      parceiroId: string,
      executar: (tx: TransacaoValidacaoNacional) => Promise<T>,
    ): Promise<T> {
      const anterior = fila;
      let liberar!: () => void;
      fila = new Promise<void>((resolve) => { liberar = resolve; });
      await anterior;
      let proximo: RegistroValidacaoNacional | null = null;
      let proximoEvento: ResultadoAtualizacaoNacional["evento"] | null = null;
      try {
        const tx: TransacaoValidacaoNacional = {
          async buscarRegistro(id) {
            return id === parceiroId && id === registro.parceiroId ? structuredClone(registro) : null;
          },
          async resolverAtorConfiavel() {
            return ator;
          },
          async gravarRevisaoEEvento(resultado, revisaoEsperada) {
            if (registro.revisao !== revisaoEsperada) throw new Error("Revisão alterada no banco.");
            if (falhaAuditoria) throw new Error("Falha ao persistir trilha de auditoria.");
            proximo = structuredClone(resultado.registro);
            proximoEvento = structuredClone(resultado.evento);
          },
        };
        const output = await executar(tx);
        // O commit ocorre somente após callback e auditoria bem-sucedidos.
        if (proximo && proximoEvento) {
          registro = proximo;
          auditoria.push(proximoEvento);
        }
        return output;
      } finally {
        liberar();
      }
    },
  };
  return {
    backend,
    get registro() { return registro; },
    get auditoria() { return auditoria; },
  };
}

describe("persistência de validação nacional: fronteira transacional sem DB real", () => {
  it("registra aceite do titular e auditoria em uma transação", async () => {
    const mock = criarMock(tecnico);
    const resultado = await persistirValidacaoNacional(mock.backend, {
      parceiroId: base.parceiroId, revisaoEsperada: 0,
      acao: { tipo: "aceitar_termos", versao: "v1" },
    }, agora);
    expect(resultado.registro.revisao).toBe(1);
    expect(mock.registro.versaoTermosAceita).toBe("v1");
    expect(mock.auditoria).toHaveLength(1);
    expect(mock.auditoria[0]).toMatchObject({ atorId: tecnico.userId, acao: "aceitar_termos" });
  });

  it("nega autoaprovação de comunidade e habilitação", async () => {
    const mock = criarMock(tecnico);
    await expect(persistirValidacaoNacional(mock.backend, {
      parceiroId: base.parceiroId, revisaoEsperada: 0,
      acao: { tipo: "confirmar_comunidade", confirmacao: "confirmada", referenciaEvidencia: "falsa" },
    }, agora)).rejects.toThrow();
    expect(mock.registro.revisao).toBe(0);
    expect(mock.auditoria).toHaveLength(0);
  });

  it("nega administrador não autenticado e sem registro", async () => {
    const mock = criarMock({ ...admin, sessaoAutenticadaNoServidor: false });
    await expect(persistirValidacaoNacional(mock.backend, {
      parceiroId: base.parceiroId, revisaoEsperada: 0,
      acao: { tipo: "confirmar_comunidade", confirmacao: "confirmada", referenciaEvidencia: "registro-01" },
    }, agora)).rejects.toThrow();
    expect(mock.auditoria).toHaveLength(0);
    const autorizado = criarMock(admin);
    await expect(persistirValidacaoNacional(autorizado.backend, {
      parceiroId: "parceiro-inesperado", revisaoEsperada: 0,
      acao: { tipo: "confirmar_comunidade", confirmacao: "confirmada", referenciaEvidencia: "registro-01" },
    }, agora)).rejects.toThrow();
  });

  it("serialização impede duas gravações com a mesma revisão", async () => {
    const mock = criarMock(tecnico);
    const comando = {
      parceiroId: base.parceiroId, revisaoEsperada: 0,
      acao: { tipo: "aceitar_termos" as const, versao: "v1" },
    };
    const resultados = await Promise.allSettled([
      persistirValidacaoNacional(mock.backend, comando, agora),
      persistirValidacaoNacional(mock.backend, comando, agora),
    ]);
    expect(resultados.map(x => x.status).sort()).toEqual(["fulfilled", "rejected"]);
    expect(mock.registro.revisao).toBe(1);
    expect(mock.auditoria).toHaveLength(1);
  });

  it("falha de auditoria não pode gravar estado sem evento", async () => {
    const mock = criarMock(admin, true);
    await expect(persistirValidacaoNacional(mock.backend, {
      parceiroId: base.parceiroId, revisaoEsperada: 0,
      acao: { tipo: "confirmar_comunidade", confirmacao: "confirmada", referenciaEvidencia: "registro-01" },
    }, agora)).rejects.toThrow(/auditoria/);
    expect(mock.registro.comunidadeWhatsapp).toBe("pendente");
    expect(mock.registro.revisao).toBe(0);
    expect(mock.auditoria).toHaveLength(0);
  });
});
