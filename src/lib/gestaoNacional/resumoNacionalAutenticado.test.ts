import { describe, expect, it } from "vitest";
import {
  lerResumoNacionalDoTitular,
  type RepositorioLeituraNacional,
  type IdentidadeNacionalConfiavel,
} from "./resumoNacionalAutenticado";
import type { RegistroValidacaoNacional } from "./validacaoAdministrativa";

const userId = "usuario_0001";
const parceiroId = "parceiro_0001";
const validacao: RegistroValidacaoNacional = {
  parceiroId,
  titularUserId: userId,
  revisao: 4,
  versaoTermosAceita: "v1",
  comunidadeWhatsapp: "confirmada",
  habilitacaoNacional: "validada",
  termosDaModalidadeAceitos: true,
  disponibilidade: "disponivel",
  disponibilidadeExpiraEm: "2026-11-01T01:00:00Z",
  municipiosValidados: ["Curitiba"],
  servicosValidados: ["reparos-computadores"],
  distanciaIdaMetros: 2000,
  raioAtendimentoMetros: 12000,
};

function mock(
  identidade: IdentidadeNacionalConfiavel | null = { userId, autenticadaNoServidor: true },
  parceiro: { id: string; userId: string } | null = { id: parceiroId, userId },
  registro: RegistroValidacaoNacional | null = validacao,
): RepositorioLeituraNacional & { calls: string[] } {
  const calls: string[] = [];
  return {
    calls,
    async emContextoAutenticado(executar) {
      return executar({
        async identidadeAutenticada() {
          calls.push("identidade");
          return identidade;
        },
        async parceiroDoUsuario(id) {
          calls.push("parceiro:" + id);
          return parceiro;
        },
        async validacaoDoParceiro(id) {
          calls.push("validacao:" + id);
          return registro;
        },
      });
    },
  };
}

describe("leitura segura da modalidade nacional — contrato não publicado", () => {
  it("nenhuma leitura de cadastro ou validação sem identidade de servidor", async () => {
    const repo = mock(null);
    expect(await lerResumoNacionalDoTitular(repo)).toEqual({
      estado: "nao_autenticado", resumo: null,
    });
    expect(repo.calls).toEqual(["identidade"]);
  });

  it("usuário autenticado sem perfil não acessa validações", async () => {
    const repo = mock({ userId, autenticadaNoServidor: true }, null);
    expect(await lerResumoNacionalDoTitular(repo)).toEqual({
      estado: "sem_cadastro", resumo: null,
    });
    expect(repo.calls).toEqual(["identidade", "parceiro:" + userId]);
  });

  it("sem confirmação nacional devolve estado não inscrito, nunca status inventado", async () => {
    const repo = mock(undefined, undefined, null);
    expect(await lerResumoNacionalDoTitular(repo)).toEqual({
      estado: "nao_inscrito", resumo: null,
    });
  });

  it("perfil de outra conta bloqueia consulta da validação privada", async () => {
    const repo = mock(undefined, { id: parceiroId, userId: "outro_usuario" });
    await expect(lerResumoNacionalDoTitular(repo)).rejects.toThrow(/Vínculo/);
    expect(repo.calls).toEqual(["identidade", "parceiro:" + userId]);
  });

  it("registro nacional de titular diferente não retorna dados", async () => {
    const repo = mock(undefined, undefined, { ...validacao, titularUserId: "outro_usuario" });
    await expect(lerResumoNacionalDoTitular(repo)).rejects.toThrow(/não pertence/);
  });

  it("retorna apenas cinco campos seguros; nunca vaza dados de cadastro ou prova", async () => {
    const repo = mock();
    const r = await lerResumoNacionalDoTitular(repo);
    expect(r).toEqual({
      estado: "pronto",
      resumo: {
        comunidade: "confirmada",
        habilitacao: "validada",
        termos: "aceitos",
        disponibilidade: "disponivel",
        disponibilidadeExpiraEm: "2026-11-01T01:00:00Z",
      },
    });
    expect(repo.calls).toEqual([
      "identidade", "parceiro:" + userId, "validacao:" + parceiroId,
    ]);
    const corpo = JSON.stringify(r);
    expect(corpo).not.toContain(parceiroId);
    expect(corpo).not.toContain(userId);
    expect(corpo).not.toContain("documento");
    expect(corpo).not.toContain("whatsapp");
    expect(corpo).not.toContain("Curitiba");
  });

  it("valores desconhecidos falham fechados como pendentes e indisponíveis", async () => {
    const registro = {
      ...validacao,
      comunidadeWhatsapp: "desconhecido",
      habilitacaoNacional: "desconhecido",
      disponibilidade: "desconhecido",
      disponibilidadeExpiraEm: "invalida",
    } as unknown as RegistroValidacaoNacional;
    expect(await lerResumoNacionalDoTitular(mock(undefined, undefined, registro))).toEqual({
      estado: "pronto",
      resumo: {
        comunidade: "pendente", habilitacao: "pendente", termos: "aceitos",
        disponibilidade: "indisponivel", disponibilidadeExpiraEm: null,
      },
    });
  });

  it("não aceita repositório ausente e não possui caminho de leitura anônima", async () => {
    await expect(lerResumoNacionalDoTitular(null as unknown as RepositorioLeituraNacional))
      .rejects.toThrow(/não configurado/);
  });
});
