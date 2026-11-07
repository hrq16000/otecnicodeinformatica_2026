import { describe, expect, it } from "vitest";
import { calcularCotacaoNacional } from "./cotacaoNacional";
import { registrarAutorizacaoCotacaoNacional } from "./registroAutorizacaoCotacaoNacional";
import {
  criarAdaptadorPostgresAutorizacaoNacional,
  type PoolPgNacional,
  type ConexaoPgNacional,
  type ConsultaPgNacional,
} from "./adaptadorPostgresAutorizacaoNacional";

const solicitacaoId = "pedido_00000001";
const clienteId = "cliente_0001";
const chave = "chave_00000001";
const instante = "2026-11-07T12:00:00.000Z";
const parametros = {
  modalidade: "padrao" as const, horasAdicionaisAprovadas: 0,
  distanciaIdaMetros: 1000, estacionamento: { tipo: "vaga_fornecida_pelo_cliente" as const },
};
const condicoes = {
  solicitacaoId, clienteId, tecnicoId: "tecnico_0001",
  servicoId: "formatacao", escopo: "Formatar o computador", revisao: 1,
  validadeAteUtc: "2026-11-08T12:00:00.000Z",
  parametros, valores: calcularCotacaoNacional(parametros),
};
const entrada = (chaveIdempotencia = chave) => ({
  solicitacaoId, chaveIdempotencia, revisaoVisualizada: 1, confirmouIntegralmente: true,
});
type RegistroDb = {
  solicitacao_id: string;
  cliente_id: string;
  estado: string;
  revisao_atual: number;
  condicoes_atuais: typeof condicoes;
  consentimento_atual: unknown;
  chave_autorizacao_atual: string | null;
};
type Uso = {
  solicitacao_id: string;
  cliente_id: string;
  revisao: number;
  chave_idempotencia: string;
};
const clone = <T>(v: T): T => structuredClone(v);

function bancoSimulado({
  falhaAuditoria = false, erroConectar = false, falhaCas = false,
  negarLeitura = false, devolverClienteIncorreto = false,
}: {
  falhaAuditoria?: boolean;
  erroConectar?: boolean;
  falhaCas?: boolean;
  negarLeitura?: boolean;
  devolverClienteIncorreto?: boolean;
} = {}) {
  let registro: RegistroDb = {
    solicitacao_id: solicitacaoId, cliente_id: clienteId, estado: "rascunho",
    revisao_atual: 1, condicoes_atuais: clone(condicoes),
    consentimento_atual: null, chave_autorizacao_atual: null,
  };
  const usos: Uso[] = [];
  const logs: string[] = [];
  const consultas: { sql: string; parametros: readonly unknown[] }[] = [];
  let liberadas = 0;
  let connAtivas = 0;
  const pool: PoolPgNacional = {
    async connect() {
      if (erroConectar) throw new Error("Pool não disponível.");
      connAtivas++;
      let pendente = clone(registro);
      let novosUsos = clone(usos);
      let pendenteAuditoria = 0;
      const c: ConexaoPgNacional = {
        async query<T>(sql: string, params: readonly unknown[] = []): Promise<ConsultaPgNacional<T>> {
          logs.push(sql);
          consultas.push({ sql, parametros: [...params] });
          if (sql === "BEGIN") {
            pendente = clone(registro);
            novosUsos = clone(usos);
          } else if (sql === "COMMIT") {
            registro = pendente;
            usos.splice(0, usos.length, ...novosUsos);
          } else if (sql === "ROLLBACK") {
            pendenteAuditoria = 0;
          } else if (sql.includes("FROM national_ops.solicitacoes_autorizacao")) {
            if (negarLeitura) throw new Error("permission denied for relation solicitacoes_autorizacao");
            const row = pendente.solicitacao_id === params[0] && pendente.cliente_id === params[1] ?
              [{
                solicitacao_id: pendente.solicitacao_id,
                cliente_id: devolverClienteIncorreto ? "cliente_0002" : pendente.cliente_id,
                estado: pendente.estado,
                condicoes_atuais: clone(pendente.condicoes_atuais),
                consentimento_atual: clone(pendente.consentimento_atual),
                chave_autorizacao_atual: pendente.chave_autorizacao_atual,
              }] : [];
            return { rows: row as T[], rowCount: row.length };
          } else if (sql.includes("FROM national_ops.autorizacoes_cotacao")) {
            const achados = novosUsos.filter(u => u.cliente_id === params[0] && u.chave_idempotencia === params[1]);
            return { rows: clone(achados) as T[], rowCount: achados.length };
          } else if (sql.startsWith("UPDATE national_ops.solicitacoes_autorizacao")) {
            if (falhaCas || pendente.estado !== "rascunho" ||
                pendente.solicitacao_id !== params[0] || pendente.cliente_id !== params[1] ||
                pendente.revisao_atual !== params[2] ||
                JSON.stringify(pendente.condicoes_atuais) !== params[5]) {
              return { rows: [], rowCount: 0 };
            }
            pendente.estado = "cotacao_aceita";
            pendente.consentimento_atual = JSON.parse(params[3] as string);
            pendente.chave_autorizacao_atual = params[4] as string;
            return { rows: [{ solicitacao_id: solicitacaoId }] as T[], rowCount: 1 };
          } else if (sql.startsWith("INSERT INTO national_ops.autorizacoes_cotacao ")) {
            if (novosUsos.some(u => (u.cliente_id === params[1] && u.chave_idempotencia === params[3]) ||
                (u.solicitacao_id === params[0] && u.revisao === params[2]))) {
              throw new Error("UNIQUE violation");
            }
            novosUsos.push({ solicitacao_id: params[0] as string,
              cliente_id: params[1] as string,
              revisao: params[2] as number,
              chave_idempotencia: params[3] as string });
          } else if (sql.startsWith("INSERT INTO national_ops.autorizacoes_auditoria ")) {
            if (falhaAuditoria) throw new Error("Auditoria indisponível.");
            pendenteAuditoria++;
          }
          return { rows: [], rowCount: 0 };
        },
        release() { liberadas++; connAtivas--; },
      };
      return c;
    },
  };
  return {
    pool, logs, consultas, usos,
    get registro() { return registro; },
    get liberadas() { return liberadas; },
    get connAtivas() { return connAtivas; },
  };
}

function montar(mock: ReturnType<typeof bancoSimulado>, dono = clienteId) {
  return criarAdaptadorPostgresAutorizacaoNacional(mock.pool, {
    async resolverClienteAutenticado() {
      return { clienteId: dono, autenticadoNoServidor: true };
    },
  }, { utcAgora: () => instante });
}

describe("rodada 18 — adaptador PostgreSQL não conectado", () => {
  it("executa BEGIN, locks, SELECT FOR UPDATE, CAS, dois INSERTs e COMMIT parametrizados", async () => {
    const mock = bancoSimulado();
    const resultado = await registrarAutorizacaoCotacaoNacional(montar(mock), entrada());
    expect(resultado).toEqual({ autorizada: true, estado: "nova", revisao: 1 });
    expect(mock.registro.estado).toBe("cotacao_aceita");
    expect(mock.usos).toHaveLength(1);
    expect(mock.logs[0]).toBe("BEGIN");
    expect(mock.logs.filter(s => s.includes("pg_advisory_xact_lock"))).toHaveLength(2);
    expect(mock.logs.some(s => s.includes("FOR UPDATE"))).toBe(true);
    expect(mock.logs.some(s => s.includes("revisao_atual = $3") && s.includes("condicoes_atuais = $6::jsonb"))).toBe(true);
    expect(mock.logs.filter(s => s.startsWith("INSERT INTO national_ops."))).toHaveLength(2);
    expect(mock.logs.at(-1)).toBe("COMMIT");
    expect(mock.logs.every(s => !s.includes(chave))).toBe(true);
    expect(mock.liberadas).toBe(1);
  });

  it("retry mantém uma única autorização e não faz novos INSERTs", async () => {
    const mock = bancoSimulado();
    const adapter = montar(mock);
    await registrarAutorizacaoCotacaoNacional(adapter, entrada());
    const repeticao = await registrarAutorizacaoCotacaoNacional(adapter, entrada());
    expect(repeticao).toEqual({ autorizada: true, estado: "idempotente", revisao: 1 });
    expect(mock.usos).toHaveLength(1);
    expect(mock.logs.filter(s => s.startsWith("INSERT INTO national_ops."))).toHaveLength(2);
    expect(mock.liberadas).toBe(2);
  });

  it("falha de auditoria dá ROLLBACK completo e libera a conexão", async () => {
    const mock = bancoSimulado({ falhaAuditoria: true });
    await expect(registrarAutorizacaoCotacaoNacional(montar(mock), entrada()))
      .rejects.toThrow(/Auditoria/);
    expect(mock.registro.estado).toBe("rascunho");
    expect(mock.usos).toHaveLength(0);
    expect(mock.logs.at(-1)).toBe("ROLLBACK");
    expect(mock.liberadas).toBe(1);
    expect(mock.connAtivas).toBe(0);
  });

  it("CAS rejeita proposta divergente e dá ROLLBACK", async () => {
    const mock = bancoSimulado({ falhaCas: true });
    await expect(registrarAutorizacaoCotacaoNacional(montar(mock), entrada()))
      .rejects.toThrow(/Conflito transacional/);
    expect(mock.registro.estado).toBe("rascunho");
    expect(mock.logs.at(-1)).toBe("ROLLBACK");
  });

  it("não lê outro titular nem altera pedidos, e não conecta sem confirmação", async () => {
    const mock = bancoSimulado();
    expect(await registrarAutorizacaoCotacaoNacional(montar(mock, "cliente_0002"), entrada()))
      .toMatchObject({ autorizada: false, estado: "nao_autorizado" });
    const consulta = mock.consultas.find(c => c.sql.includes("FROM national_ops.solicitacoes_autorizacao"));
    expect(consulta?.sql).toContain("cliente_id = $2");
    expect(consulta?.parametros).toEqual([solicitacaoId, "cliente_0002"]);
    expect(mock.logs.some(s => s.startsWith("UPDATE ") || s.startsWith("INSERT "))).toBe(false);
    expect(mock.registro.estado).toBe("rascunho");
    const consultasAntes = mock.consultas.length;
    expect(await registrarAutorizacaoCotacaoNacional(montar(mock), {
      ...entrada(), confirmouIntegralmente: false,
    })).toMatchObject({ autorizada: false, estado: "confirmacao_necessaria" });
    expect(mock.consultas).toHaveLength(consultasAntes);
    expect(mock.liberadas).toBe(1);
  });

  it("falha fechada se a camada de consultas retorna outro cliente por engano", async () => {
    const mock = bancoSimulado({ devolverClienteIncorreto: true });
    expect(await registrarAutorizacaoCotacaoNacional(montar(mock), entrada()))
      .toMatchObject({ autorizada: false, estado: "nao_autorizado" });
    expect(mock.logs.some(s => s.startsWith("UPDATE ") || s.startsWith("INSERT "))).toBe(false);
    expect(mock.registro.estado).toBe("rascunho");
    expect(mock.liberadas).toBe(1);
  });

  it("permissão negada pelo PostgreSQL aborta a operação e não persiste", async () => {
    const mock = bancoSimulado({ negarLeitura: true });
    await expect(registrarAutorizacaoCotacaoNacional(montar(mock), entrada()))
      .rejects.toThrow(/permission denied/);
    expect(mock.logs.at(-1)).toBe("ROLLBACK");
    expect(mock.logs.some(s => s.startsWith("UPDATE ") || s.startsWith("INSERT "))).toBe(false);
    expect(mock.registro.estado).toBe("rascunho");
    expect(mock.liberadas).toBe(1);
    expect(mock.connAtivas).toBe(0);
  });

  it("falha de conexão não aciona outras operações", async () => {
    const mock = bancoSimulado({ erroConectar: true });
    await expect(registrarAutorizacaoCotacaoNacional(montar(mock), entrada()))
      .rejects.toThrow(/Pool não disponível/);
    expect(mock.logs).toHaveLength(0);
    expect(mock.registro.estado).toBe("rascunho");
  });

  it("valida dependências e nunca aceita pool ausente", () => {
    expect(() => criarAdaptadorPostgresAutorizacaoNacional(
      null as unknown as PoolPgNacional,
      { resolverClienteAutenticado: async () => null }, { utcAgora: () => instante },
    )).toThrow(/inválidas/);
  });
});
