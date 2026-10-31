import { describe, expect, it } from "vitest";
import {
  avaliarTransicaoContratacaoNacional,
  CONTRATACAO_NACIONAL_ATIVA,
  LIMITE_SOLICITACOES_DIARIO_NACIONAL,
  verificarLimiteSolicitacoesNacional,
  type SolicitacaoNacionalRegistrada,
} from "./contratacaoDiretaNacional";

const anterior: SolicitacaoNacionalRegistrada[] = [
  { solicitacaoId: "pedido-a", clienteId: "cliente-1", dataCivil: "2026-10-31", servicoId: "computador" },
  { solicitacaoId: "pedido-b", clienteId: "cliente-1", dataCivil: "2026-10-31", servicoId: "rede" },
];
const nova = {
  solicitacaoId: "pedido-c",
  clienteId: "cliente-1",
  dataCivil: "2026-10-31",
  servicoId: "impressora",
};
describe("limite diário — proposta nacional", () => {
  it("mantém integração de produção desativada", () => {
    expect(CONTRATACAO_NACIONAL_ATIVA).toBe(false);
    expect(LIMITE_SOLICITACOES_DIARIO_NACIONAL).toBe(3);
  });

  it("permite somente três serviços distintos por cliente e dia", () => {
    expect(verificarLimiteSolicitacoesNacional(anterior, nova)).toEqual({
      permitido: true, motivo: "nova_solicitacao", totalNoDia: 2,
    });
    expect(verificarLimiteSolicitacoesNacional([...anterior, nova], { ...nova, solicitacaoId: "pedido-d", servicoId: "monitor" })).toEqual({
      permitido: false, motivo: "limite_diario", totalNoDia: 3,
    });
    expect(verificarLimiteSolicitacoesNacional(anterior, { ...nova, servicoId: "computador" })).toEqual({
      permitido: false, motivo: "servico_repetido", totalNoDia: 2,
    });
  });

  it("repetição com o mesmo ID é idempotente sem gastar nova vaga", () => {
    expect(verificarLimiteSolicitacoesNacional([...anterior, nova], nova)).toEqual({
      permitido: true, motivo: "repeticao_idempotente", totalNoDia: 3,
    });
    expect(verificarLimiteSolicitacoesNacional(anterior, { ...anterior[0], servicoId: "outro" })).toEqual({
      permitido: false, motivo: "id_em_conflito", totalNoDia: 2,
    });
    expect(verificarLimiteSolicitacoesNacional([anterior[0], anterior[0]], nova)).toThrow();
  });

  it("contagens são isoladas por usuário e data civil", () => {
    expect(verificarLimiteSolicitacoesNacional([...anterior, nova], { ...nova, solicitacaoId: "pedido-d", clienteId: "cliente-2" })).toMatchObject({
      permitido: true, totalNoDia: 0,
    });
    expect(verificarLimiteSolicitacoesNacional([...anterior, nova], { ...nova, solicitacaoId: "pedido-d", dataCivil: "2026-11-01" })).toMatchObject({
      permitido: true, totalNoDia: 0,
    });
  });

  it("bloqueia campos inválidos e datas impossíveis", () => {
    for (const dataCivil of ["2026-02-30", "2026-13-01", "2026-2-01", "invalida"]) {
      expect(() => verificarLimiteSolicitacoesNacional([], { ...nova, dataCivil })).toThrow();
    }
    expect(() => verificarLimiteSolicitacoesNacional([], { ...nova, clienteId: "" })).toThrow();
    expect(() => verificarLimiteSolicitacoesNacional([], { ...nova, servicoId: "" })).toThrow();
    expect(() => verificarLimiteSolicitacoesNacional([], { ...nova, solicitacaoId: "" })).toThrow();
  });

  it("não altera o histórico recebido", () => {
    const copia = JSON.stringify(anterior);
    verificarLimiteSolicitacoesNacional(anterior, nova);
    expect(JSON.stringify(anterior)).toBe(copia);
  });
});

describe("estado da contratação direta — sem confirmação falsa de pagamento", () => {
  it("permite apenas a evolução contratual já definida", () => {
    expect(avaliarTransicaoContratacaoNacional("rascunho", "cotacao_aceita")).toEqual({
      liberado: true, status: "transicao_de_dominio",
    });
    expect(avaliarTransicaoContratacaoNacional("cotacao_aceita", "aguardando_pagamento").liberado).toBe(true);
    expect(avaliarTransicaoContratacaoNacional("pagamento_confirmado", "aceito_diretamente_pelo_tecnico").liberado).toBe(true);
    expect(avaliarTransicaoContratacaoNacional("aceito_diretamente_pelo_tecnico", "em_execucao").liberado).toBe(true);
    expect(avaliarTransicaoContratacaoNacional("em_execucao", "concluido").liberado).toBe(true);
  });

  it("nunca permite marcar pago apenas por clique, print, Pix enviado ou dados de cliente", () => {
    expect(avaliarTransicaoContratacaoNacional("aguardando_pagamento", "pagamento_confirmado")).toEqual({
      liberado: false, status: "integracao_pagamento_pendente",
    });
    expect(avaliarTransicaoContratacaoNacional("rascunho", "pagamento_confirmado").liberado).toBe(false);
    expect(avaliarTransicaoContratacaoNacional("aguardando_pagamento", "em_execucao").liberado).toBe(false);
    expect(avaliarTransicaoContratacaoNacional("cancelado", "reembolsado")).toEqual({
      liberado: false, status: "reembolso_exige_integracao",
    });
  });

  it("não reabre concluídos ou retorna a estados anteriores", () => {
    expect(avaliarTransicaoContratacaoNacional("concluido", "em_execucao").liberado).toBe(false);
    expect(avaliarTransicaoContratacaoNacional("aguardando_pagamento", "cotacao_aceita").liberado).toBe(false);
    expect(avaliarTransicaoContratacaoNacional("cancelado", "rascunho").liberado).toBe(false);
  });
});
