import { describe, expect, it } from "vitest";
import {
  AREA_NACIONAL_INTEGRADA,
  classificarResumoNacional,
  situacaoPainelNacional,
  type ResumoNacionalTitular,
} from "./areaNacionalFeatureGate";

const agora = new Date("2026-10-31T20:00:00Z");
const validado: ResumoNacionalTitular = {
  comunidade: "confirmada",
  habilitacao: "validada",
  termos: "aceitos",
  disponibilidade: "disponivel",
  disponibilidadeExpiraEm: "2026-10-31T21:00:00Z",
};

describe("painel nacional no perfil existente — isolado por feature flag", () => {
  it("modalidade permanece desligada mesmo que o navegador informe backend=true", () => {
    expect(AREA_NACIONAL_INTEGRADA).toBe(false);
    expect(situacaoPainelNacional(validado, true, agora)).toBe("nao_integrado");
    expect(situacaoPainelNacional(validado, false, agora)).toBe("nao_integrado");
    expect(situacaoPainelNacional(null, true, agora)).toBe("nao_integrado");
  });

  it("sem prova não considera parceiro habilitado", () => {
    expect(classificarResumoNacional(null, agora)).toBe("aguardando_verificacao");
    expect(classificarResumoNacional({ ...validado, habilitacao: "pendente" }, agora))
      .toBe("aguardando_verificacao");
    expect(classificarResumoNacional({ ...validado, comunidade: "pendente" }, agora))
      .toBe("aguardando_verificacao");
    expect(classificarResumoNacional({ ...validado, termos: "pendente" }, agora))
      .toBe("aguardando_verificacao");
  });

  it("suspensão e comunidade não confirmada são tratadas como suspensão", () => {
    expect(classificarResumoNacional({ ...validado, habilitacao: "suspensa" }, agora))
      .toBe("suspenso");
    expect(classificarResumoNacional({ ...validado, comunidade: "nao_confirmada" }, agora))
      .toBe("suspenso");
  });

  it("disponibilidade expirada não aparece como disponível", () => {
    expect(classificarResumoNacional({ ...validado, disponibilidadeExpiraEm: "2026-10-31T20:00:00Z" }, agora))
      .toBe("habilitado_indisponivel");
    expect(classificarResumoNacional({ ...validado, disponibilidadeExpiraEm: null }, agora))
      .toBe("habilitado_indisponivel");
    expect(classificarResumoNacional({ ...validado, disponibilidadeExpiraEm: "dados-manipulados" }, agora))
      .toBe("habilitado_indisponivel");
    expect(classificarResumoNacional({ ...validado, disponibilidade: "ocupado" }, agora))
      .toBe("habilitado_indisponivel");
  });

  it("mostra disponibilidade somente em prévia com registro validado e prazo vigente", () => {
    expect(classificarResumoNacional(validado, agora)).toBe("habilitado_disponivel");
  });

  it("rejeita relógio inválido na função interna", () => {
    expect(() => classificarResumoNacional(validado, new Date("invalido"))).toThrow();
  });
});
