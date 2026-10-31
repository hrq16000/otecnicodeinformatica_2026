import { describe, expect, it } from "vitest";
import {
  aplicarValidacaoNacional,
  DURACAO_MAXIMA_DISPONIBILIDADE_MS,
  type AtorValidadoNacional,
  type RegistroValidacaoNacional,
} from "./validacaoAdministrativa";
import { adaptarParceiroExistenteParaNacional } from "./parceiroExistenteAdapter";

const agora = new Date("2026-10-31T19:00:00Z");
const administrador: AtorValidadoNacional = {
  papel: "administrador", userId: "admin-01", sessaoAutenticadaNoServidor: true,
};
const profissional: AtorValidadoNacional = {
  papel: "profissional", userId: "user-01", sessaoAutenticadaNoServidor: true,
};
const base: RegistroValidacaoNacional = {
  parceiroId: "parceiro-001",
  titularUserId: profissional.userId,
  revisao: 0,
  versaoTermosAceita: null,
  comunidadeWhatsapp: "pendente",
  habilitacaoNacional: "pendente",
  termosDaModalidadeAceitos: false,
  disponibilidade: "indisponivel",
  disponibilidadeExpiraEm: "",
  municipiosValidados: [],
  servicosValidados: [],
  distanciaIdaMetros: 2000,
  raioAtendimentoMetros: null,
};

const aprovacao = {
  tipo: "validar_habilitacao" as const,
  municipios: ["São José dos Pinhais"],
  servicos: ["manutencao-notebook"],
  raioMetros: 15000,
  referenciaEvidencia: "verificacao-interna-002",
};

function fluxoValidado() {
  const termos = aplicarValidacaoNacional(base, profissional,
    { tipo: "aceitar_termos", versao: "modalidade-nacional-v1" }, 0, agora).registro;
  const comunidade = aplicarValidacaoNacional(termos, administrador,
    { tipo: "confirmar_comunidade", confirmacao: "confirmada", referenciaEvidencia: "verificacao-interna-001" },
    1, agora).registro;
  return aplicarValidacaoNacional(comunidade, administrador, aprovacao, 2, agora).registro;
}

describe("validação nacional — separação de autoridades", () => {
  it("técnico pode aceitar termos, mas não aprovar a própria habilitação ou comunidade", () => {
    const t = aplicarValidacaoNacional(base, profissional,
      { tipo: "aceitar_termos", versao: "modalidade-nacional-v1" }, 0, agora);
    expect(t.registro.termosDaModalidadeAceitos).toBe(true);
    expect(t.registro.habilitacaoNacional).toBe("pendente");
    expect(() => aplicarValidacaoNacional(t.registro, profissional,
      { tipo: "confirmar_comunidade", confirmacao: "confirmada", referenciaEvidencia: "falsa" },
      1, agora)).toThrow(/não permitida/);
    expect(() => aplicarValidacaoNacional(t.registro, profissional, aprovacao, 1, agora)).toThrow();
  });

  it("admin separado confirma comunidade e valida habilitação com evidências", () => {
    const r = fluxoValidado();
    expect(r.comunidadeWhatsapp).toBe("confirmada");
    expect(r.habilitacaoNacional).toBe("validada");
    expect(r.disponibilidade).toBe("indisponivel");
    expect(r.municipiosValidados).toEqual(["São José dos Pinhais"]);
    expect(r.servicosValidados).toEqual(["manutencao-notebook"]);
    expect(r.revisao).toBe(3);
  });

  it("não habilita cadastro sem conta titular comprovada", () => {
    expect(() => aplicarValidacaoNacional(
      { ...base, titularUserId: null },
      administrador,
      { tipo: "confirmar_comunidade", confirmacao: "confirmada", referenciaEvidencia: "interna-01" },
      0,
      agora,
    )).toThrow(/sem titular/);
  });

  it("não permite autoaprovação de administrador que é titular do cadastro", () => {
    const r = fluxoValidado();
    expect(() => aplicarValidacaoNacional(r,
      { papel: "administrador", userId: r.titularUserId!, sessaoAutenticadaNoServidor: true },
      { tipo: "suspender_habilitacao", motivoInterno: "conflito" }, 3, agora)).toThrow(/não permitida/);
  });

  it("outra conta não pode atualizar disponibilidade do técnico", () => {
    const r = fluxoValidado();
    expect(() => aplicarValidacaoNacional(r,
      { papel: "profissional", userId: "outro-usuario", sessaoAutenticadaNoServidor: true },
      { tipo: "alterar_disponibilidade", disponibilidade: "disponivel", expiraEm: "2026-10-31T20:00:00Z" },
      3, agora)).toThrow(/não permitida/);
  });

  it("apenas titular pode declarar disponibilidade com vencimento, sem autoaprovação", () => {
    const r = fluxoValidado();
    const ativo = aplicarValidacaoNacional(r, profissional,
      { tipo: "alterar_disponibilidade", disponibilidade: "disponivel", expiraEm: "2026-10-31T20:00:00Z" },
      3, agora);
    expect(ativo.registro.disponibilidade).toBe("disponivel");
    expect(ativo.registro.habilitacaoNacional).toBe("validada");
    expect(ativo.evento).toEqual({
      parceiroId: base.parceiroId, atorId: profissional.userId,
      acao: "alterar_disponibilidade", revisao: 4,
    });
    const resultado = adaptarParceiroExistenteParaNacional(
      { id: base.parceiroId, status: "ativo", cidade: "São José dos Pinhais", estado: "PR" },
      ativo.registro,
      agora,
    );
    expect(resultado.elegivel).toBe(true);
    expect(Object.keys(ativo.evento)).toEqual(["parceiroId", "atorId", "acao", "revisao"]);
  });

  it("disponibilidade nunca é aceita com janela vencida ou maior que 24 horas", () => {
    const r = fluxoValidado();
    for (const expiraEm of ["2026-10-31T18:00:00Z", "invalida", "2026-11-03T19:00:00Z"]) {
      expect(() => aplicarValidacaoNacional(r, profissional,
        { tipo: "alterar_disponibilidade", disponibilidade: "disponivel", expiraEm }, 3, agora)).toThrow();
    }
    expect(DURACAO_MAXIMA_DISPONIBILIDADE_MS).toBe(86400000);
  });

  it("suspensão administrativa e saída da comunidade desligam disponibilidade", () => {
    const r = fluxoValidado();
    const on = aplicarValidacaoNacional(r, profissional,
      { tipo: "alterar_disponibilidade", disponibilidade: "disponivel", expiraEm: "2026-10-31T20:00:00Z" },
      3, agora).registro;
    const off = aplicarValidacaoNacional(on, administrador,
      { tipo: "suspender_habilitacao", motivoInterno: "verificacao pendente" }, 4, agora).registro;
    expect(off.habilitacaoNacional).toBe("suspensa");
    expect(off.disponibilidade).toBe("indisponivel");
    const saiu = aplicarValidacaoNacional(on, administrador,
      { tipo: "confirmar_comunidade", confirmacao: "nao_confirmada", referenciaEvidencia: "checagem-03" }, 4, agora).registro;
    expect(saiu.comunidadeWhatsapp).toBe("nao_confirmada");
    expect(saiu.disponibilidade).toBe("indisponivel");
  });

  it("nova versão de termos aceita pelo próprio técnico exige revalidação", () => {
    const r = fluxoValidado();
    const changed = aplicarValidacaoNacional(r, profissional,
      { tipo: "aceitar_termos", versao: "modalidade-nacional-v2" }, 3, agora);
    expect(changed.registro.habilitacaoNacional).toBe("pendente");
    expect(changed.registro.disponibilidade).toBe("indisponivel");
  });

  it("proíbe revisões antigas, papéis sem sessão confiável e evidências vazias", () => {
    const r = fluxoValidado();
    expect(() => aplicarValidacaoNacional(r, profissional,
      { tipo: "alterar_disponibilidade", disponibilidade: "indisponivel", expiraEm: null }, 2, agora))
      .toThrow(/revisão/);
    expect(() => aplicarValidacaoNacional(r,
      { ...administrador, sessaoAutenticadaNoServidor: false },
      { tipo: "suspender_habilitacao", motivoInterno: "teste" }, 3, agora))
      .toThrow();
    expect(() => aplicarValidacaoNacional(r, administrador,
      { tipo: "confirmar_comunidade", confirmacao: "confirmada", referenciaEvidencia: "" }, 3, agora))
      .toThrow();
  });

  it("não aceita cobertura duplicada, raio inválido nem habilitação sem termos", () => {
    const t = aplicarValidacaoNacional(base, profissional,
      { tipo: "aceitar_termos", versao: "v1" }, 0, agora).registro;
    expect(() => aplicarValidacaoNacional(t, administrador, aprovacao, 1, agora)).toThrow();
    const c = aplicarValidacaoNacional(t, administrador,
      { tipo: "confirmar_comunidade", confirmacao: "confirmada", referenciaEvidencia: "comunidade-01" },
      1, agora).registro;
    expect(() => aplicarValidacaoNacional(c, administrador,
      { ...aprovacao, municipios: ["Curitiba", "curitiba"] }, 2, agora)).toThrow();
    expect(() => aplicarValidacaoNacional(c, administrador,
      { ...aprovacao, raioMetros: -1 }, 2, agora)).toThrow();
  });

  it("não altera objeto fonte; alteração apenas por nova versão validada", () => {
    const anterior = JSON.stringify(base);
    const r = aplicarValidacaoNacional(base, profissional,
      { tipo: "aceitar_termos", versao: "v1" }, 0, agora);
    expect(JSON.stringify(base)).toBe(anterior);
    expect(r.registro).not.toBe(base);
  });
});
