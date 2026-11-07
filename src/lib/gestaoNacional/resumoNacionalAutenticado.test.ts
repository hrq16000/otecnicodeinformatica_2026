import { describe, expect, it } from "vitest";
import {
  lerResumoNacionalDoTitular,
  type RepositorioLeituraNacional,
  type IdentidadeNacionalConfiavel,
} from "./resumoNacionalAutenticado";
import type { RegistroValidacaoNacional } from "./validacaoAdministrativa";

/** Relógio controlado em testes: nenhuma dependência da hora do CI. */
const agora = new Date("2026-10-31T20:00:00Z");
const ler = (repo: RepositorioLeituraNacional) => lerResumoNacionalDoTitular(repo, agora);

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
    expect(await ler(repo)).toEqual({
      estado: "nao_autenticado", resumo: null,
    });
    expect(repo.calls).toEqual(["identidade"]);
  });

  it("usuário autenticado sem perfil não acessa validações", async () => {
    const repo = mock({ userId, autenticadaNoServidor: true }, null);
    expect(await ler(repo)).toEqual({
      estado: "sem_cadastro", resumo: null,
    });
    expect(repo.calls).toEqual(["identidade", "parceiro:" + userId]);
  });

  it("sem confirmação nacional devolve estado não inscrito, nunca status inventado", async () => {
    const repo = mock(undefined, undefined, null);
    expect(await ler(repo)).toEqual({
      estado: "nao_inscrito", resumo: null,
    });
  });

  it("perfil de outra conta bloqueia consulta da validação privada", async () => {
    const repo = mock(undefined, { id: parceiroId, userId: "outro_usuario" });
    await expect(ler(repo)).rejects.toThrow(/Vínculo/);
    expect(repo.calls).toEqual(["identidade", "parceiro:" + userId]);
  });

  it("registro nacional de titular diferente não retorna dados", async () => {
    const repo = mock(undefined, undefined, { ...validacao, titularUserId: "outro_usuario" });
    await expect(ler(repo)).rejects.toThrow(/não pertence/);
  });

  it("retorna apenas cinco campos seguros; nunca vaza dados de cadastro ou prova", async () => {
    const repo = mock();
    const r = await ler(repo);
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
    expect(await ler(mock(undefined, undefined, registro))).toEqual({
      estado: "pronto",
      resumo: {
        comunidade: "pendente", habilitacao: "pendente", termos: "aceitos",
        disponibilidade: "indisponivel", disponibilidadeExpiraEm: null,
      },
    });
  });

  it("backend também rebaixa disponibilidade expirada, manipulada ou além de 24h", async () => {
    for (const vencimento of [
      "2026-10-31T19:59:59Z",
      "2026-10-31T20:00:00Z",
      "2026-11-01T20:00:00.001Z",
      "2099-01-01T00:00:00Z",
      "inválida",
    ]) {
      const resultado = await ler(mock(undefined, undefined, {
        ...validacao, disponibilidadeExpiraEm: vencimento,
      }));
      expect(resultado).toMatchObject({
        estado: "pronto",
        resumo: { disponibilidade: "indisponivel", disponibilidadeExpiraEm: null },
      });
    }
  });

  it("aceita a borda exata de 24h, somente com comunidade e habilitação validadas", async () => {
    const ate24h = { ...validacao, disponibilidadeExpiraEm: "2026-11-01T20:00:00Z" };
    expect(await ler(mock(undefined, undefined, ate24h))).toMatchObject({
      estado: "pronto",
      resumo: { disponibilidade: "disponivel", disponibilidadeExpiraEm: ate24h.disponibilidadeExpiraEm },
    });
    expect(await ler(mock(undefined, undefined, { ...ate24h, habilitacaoNacional: "suspensa" }))).toMatchObject({
      estado: "pronto",
      resumo: { disponibilidade: "indisponivel", disponibilidadeExpiraEm: null },
    });
    expect(await ler(mock(undefined, undefined, { ...ate24h, comunidadeWhatsapp: "pendente" }))).toMatchObject({
      estado: "pronto",
      resumo: { disponibilidade: "indisponivel", disponibilidadeExpiraEm: null },
    });
  });

  it("rejeita relógio de servidor inválido em vez de marcar disponibilidade", async () => {
    await expect(lerResumoNacionalDoTitular(mock(), new Date("inválida"))).rejects.toThrow(/Relógio/);
  });

  it("não aceita repositório ausente e não possui caminho de leitura anônima", async () => {
    await expect(ler(null as unknown as RepositorioLeituraNacional))
      .rejects.toThrow(/não configurado/);
  });
});
