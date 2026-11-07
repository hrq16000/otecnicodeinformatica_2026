/**
 * Rodada 20 — verifica texto da proposta de DDL, SEM executar SQL.
 * Não comprova integridade real: exige teste com banco PostgreSQL/roles reais.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
const sql = readFileSync(
  new URL("../../../docs/nacional/persistencia-autorizacao-proposta.sql", import.meta.url),
  "utf8",
);

describe("SQL proposto — autorização vinculada ao cliente", () => {
  it("é proposta documental, não migration", () => {
    expect(sql).toMatch(/NÃO É MIGRATION\. NÃO EXECUTAR/i);
  });
  it("solicitação possui chave composta de pedido e titular", () => {
    expect(sql).toMatch(/CONSTRAINT solicitacao_identidade_unica UNIQUE \(\s*solicitacao_id,\s*cliente_id\s*\)/i);
  });
  it("autorização não pode referenciar pedido de cliente diferente", () => {
    expect(sql).toMatch(/CONSTRAINT autorizacao_titular_fkey\s+FOREIGN KEY \(\s*solicitacao_id,\s*cliente_id\s*\)\s+REFERENCES national_ops\.solicitacoes_autorizacao \(\s*solicitacao_id,\s*cliente_id\s*\)/i);
    expect(sql).toMatch(/UNIQUE \(\s*cliente_id,\s*chave_idempotencia\s*\)/i);
    expect(sql).toMatch(/UNIQUE \(\s*solicitacao_id,\s*revisao\s*\)/i);
  });
  it("auditoria exige autorização da mesma solicitação, cliente e revisão", () => {
    expect(sql).toMatch(/CONSTRAINT autorizacao_auditoria_vinculo_unique\s+UNIQUE \(\s*solicitacao_id,\s*cliente_id,\s*revisao\s*\)/i);
    expect(sql).toMatch(/CONSTRAINT auditoria_autorizacao_fkey\s+FOREIGN KEY \(\s*solicitacao_id,\s*cliente_id,\s*revisao\s*\)\s+REFERENCES national_ops\.autorizacoes_cotacao \(\s*solicitacao_id,\s*cliente_id,\s*revisao\s*\)/i);
  });
  it("DDL não libera acesso público nem desliga RLS", () => {
    const statements = sql.split("\n").filter(line => !line.trim().startsWith("--")).join("\n");
    expect(statements).not.toMatch(/GRANT\s+.+\s+TO\s+(PUBLIC|anon|authenticated)|DISABLE\s+ROW\s+LEVEL\s+SECURITY|BYPASSRLS/i);
    for (const tabela of ["solicitacoes_autorizacao", "autorizacoes_cotacao", "autorizacoes_auditoria"]) {
      expect(statements).toContain("ALTER TABLE national_ops." + tabela + " FORCE ROW LEVEL SECURITY;");
      expect(statements).toContain("REVOKE ALL ON national_ops." + tabela + " FROM PUBLIC;");
    }
  });
});
