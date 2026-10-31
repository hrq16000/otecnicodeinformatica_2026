import { describe, expect, it } from "vitest";
import {
  adaptarParceiroExistenteParaNacional,
  normalizarEstadoCadastro,
  type CadastroParceiroExistente,
  type ConfirmacaoOperacionalNacional,
} from "./parceiroExistenteAdapter";
import { tecnicoElegivelParaConsulta } from "./rodizioRegional";

const agora = new Date("2026-10-31T19:00:00Z");
const parceiro: CadastroParceiroExistente = {
  id: "profissional-0001",
  status: "aprovado",
  cidade: "São José dos Pinhais",
  estado: "PR",
};
const confirmacao: ConfirmacaoOperacionalNacional = {
  parceiroId: parceiro.id,
  comunidadeWhatsapp: "confirmada",
  habilitacaoNacional: "validada",
  termosDaModalidadeAceitos: true,
  disponibilidade: "disponivel",
  disponibilidadeExpiraEm: "2026-10-31T20:00:00Z",
  municipiosValidados: ["São José dos Pinhais"],
  servicosValidados: ["reparos-computadores"],
  distanciaIdaMetros: 5000,
  raioAtendimentoMetros: 15000,
};

const adaptar = (
  variacaoParceiro: Partial<CadastroParceiroExistente> = {},
  variacaoConfirmacao: Partial<ConfirmacaoOperacionalNacional> | null = {},
) => adaptarParceiroExistenteParaNacional(
  { ...parceiro, ...variacaoParceiro },
  variacaoConfirmacao === null ? null : { ...confirmacao, ...variacaoConfirmacao },
  agora,
);

describe("reuso do cadastro existente sem transformar membro em técnico disponível", () => {
  it("normaliza siglas e estados brasileiros sem inventar UF", () => {
    expect(normalizarEstadoCadastro(" PR ")).toBe("PR");
    expect(normalizarEstadoCadastro("Paraná")).toBe("PR");
    expect(normalizarEstadoCadastro("São Paulo")).toBe("SP");
    expect(normalizarEstadoCadastro("Minas Gerais")).toBe("MG");
    expect(normalizarEstadoCadastro("estado não cadastrado")).toBeNull();
  });

  it("não habilita parceiro apenas pelo status aprovado/ativo", () => {
    expect(adaptar({}, null)).toEqual({
      elegivel: false, tecnico: null, motivo: "confirmacao_ausente",
    });
    expect(adaptar({ status: "ativo" }, null).elegivel).toBe(false);
  });

  it("rejeita cadastro ainda pendente, vencido e suspenso", () => {
    for (const status of ["iniciado", "aguardando_analise", "vencido", "suspenso"] as const) {
      expect(adaptar({ status }).elegivel).toBe(false);
    }
  });

  it("exige vínculo da confirmação ao ID estável do cadastro existente", () => {
    expect(adaptar({}, { parceiroId: "outro" })).toEqual({
      elegivel: false, tecnico: null, motivo: "vinculo_invalido",
    });
  });

  it("exige confirmação da comunidade e habilitação nacional SEPARADAS", () => {
    expect(adaptar({}, { comunidadeWhatsapp: "pendente" }).motivo).toBe("comunidade_nao_confirmada");
    expect(adaptar({}, { habilitacaoNacional: "pendente" }).motivo).toBe("modalidade_nao_validada");
    expect(adaptar({}, { termosDaModalidadeAceitos: false }).motivo).toBe("modalidade_nao_validada");
  });

  it("disponibilidade precisa estar atual, não pode vir do status legado", () => {
    expect(adaptar({}, { disponibilidade: "ocupado" }).motivo).toBe("indisponivel");
    expect(adaptar({}, { disponibilidadeExpiraEm: "2026-10-31T18:00:00Z" }).motivo).toBe("disponibilidade_expirada");
    expect(adaptar({}, { disponibilidadeExpiraEm: "nao-e-data" }).motivo).toBe("disponibilidade_expirada");
  });

  it("não infere municípios e especialidades da inscrição livre do parceiro", () => {
    expect(adaptar({}, { municipiosValidados: [] }).motivo).toBe("cobertura_nao_validada");
    expect(adaptar({}, { servicosValidados: [] }).motivo).toBe("cobertura_nao_validada");
    expect(adaptar({ estado: "cidade inventada" }).motivo).toBe("cobertura_nao_validada");
    expect(adaptar({}, { distanciaIdaMetros: null }).motivo).toBe("cobertura_nao_validada");
    expect(adaptar({}, { distanciaIdaMetros: 15001 }).motivo).toBe("cobertura_nao_validada");
  });

  it("adapta o registro APENAS com prova completa e limitada a uma região/serviço", () => {
    const r = adaptar();
    expect(r.elegivel).toBe(true);
    if (!r.elegivel) throw new Error("Teste requer parceiro validado.");
    expect(r.tecnico.id).toBe(parceiro.id);
    expect(r.tecnico.uf).toBe("PR");
    expect(tecnicoElegivelParaConsulta(r.tecnico, {
      uf: "PR", municipio: "São José dos Pinhais", servico: "reparos-computadores",
    })).toBe(true);
    expect(tecnicoElegivelParaConsulta(r.tecnico, {
      uf: "SP", municipio: "São Paulo", servico: "reparos-computadores",
    })).toBe(false);
    expect(Object.keys(r.tecnico).join("|")).not.toMatch(/cpf|documento|telefone|email|endereco|nome|contato/i);
  });

  it("mantém separação da assinatura anual: não altera status nem cadastro fonte", () => {
    const before = JSON.stringify([parceiro, confirmacao]);
    const r = adaptar({ status: "aprovado" });
    expect(r.elegivel).toBe(true);
    expect(JSON.stringify([parceiro, confirmacao])).toBe(before);
  });

  it("falha com relógio desconhecido ou adulterado", () => {
    expect(() => adaptarParceiroExistenteParaNacional(parceiro, confirmacao, new Date("invalido"))).toThrow();
  });
});
