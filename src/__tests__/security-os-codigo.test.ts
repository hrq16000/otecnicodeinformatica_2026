import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * TESTES DE SEGURANÇA — códigos de verificação de O.S. (SECURITY.md §1).
 *
 * Garantem, de forma automatizada e sem depender de rede, que o código de
 * 6 dígitos nunca é persistido em texto puro: só hash salgado vai ao banco,
 * o valor legível só existe na resposta da emissão sob demanda, e toda
 * emissão gera linha de auditoria administrativa.
 */

const ler = (p: string) => readFileSync(resolve(process.cwd(), p), "utf8");

const FONTE_EDGE = "supabase/functions/os-codigo/index.ts";
const ARQUIVOS_VIGIADOS = [
  FONTE_EDGE,
  "src/pages/admin/AdminOsAudit.tsx",
  "src/integrations/supabase/types.ts",
];

const PROIBIDOS = [/code_plain/i, /codigo_texto/i, /plain_?code/i, /codigo_em_texto/i];

describe("os_verification_codes — código nunca em texto puro", () => {
  it.each(ARQUIVOS_VIGIADOS)("%s não referencia coluna/campo de código legível", (arquivo) => {
    const conteudo = ler(arquivo);
    for (const padrao of PROIBIDOS) {
      expect(padrao.test(conteudo), `${arquivo} contém ${padrao}`).toBe(false);
    }
  });

  it("persiste apenas o hash salgado com o id da linha", () => {
    const src = ler(FONTE_EDGE);
    expect(src).toMatch(/hashCode\s*=\s*\(id: string, codigo: string\)\s*=>\s*sha256\(`code:\$\{id\}:\$\{codigo\}`\)/);
    // O update de emissão grava code_hash, e nada mais relacionado ao valor.
    expect(src).toMatch(/code_hash: await hashCode\(id, codigo\)/);
    expect(src).not.toMatch(/insert\([^)]*codigo[^)]*\)/s);
  });

  it("nunca registra o código em log", () => {
    const src = ler(FONTE_EDGE);
    const logs = src.match(/console\.(log|error|warn|info)\(([^)]*)\)/g) ?? [];
    for (const linha of logs) {
      expect(/\bcodigo\b/.test(linha), `log expõe o código: ${linha}`).toBe(false);
    }
  });

  it("emite o código apenas para admin autenticado e devolve uma única vez", () => {
    const src = ler(FONTE_EDGE);
    expect(src).toMatch(/const admin = await requireAdmin\(req\);/);
    expect(src).toMatch(/if \(!admin\) return json\(\{ error: "unauthorized" \}, 401\)/);
    // A única resposta que devolve `codigo` é a da ação issue.
    expect(src.match(/codigo,/g)?.length ?? 0).toBe(1);
  });

  it("apaga o hash ao consumir o código", () => {
    expect(ler(FONTE_EDGE)).toMatch(/consumed_at: new Date\(\)\.toISOString\(\), code_hash: null/);
  });

  it("registra auditoria administrativa da emissão sem vazar o código", () => {
    const src = ler(FONTE_EDGE);
    const bloco = src.slice(src.indexOf('from("admin_audit_log")'), src.indexOf("return json({\n      ok: true,"));
    expect(bloco).toContain("actor_id: admin.id");
    expect(bloco).toContain("actor_email: admin.email");
    expect(bloco).toContain('action: "issue_code"');
    expect(bloco).toContain("issuedAt: emitidoEm");
    expect(/\bcodigo\b/.test(bloco), "auditoria não pode conter o código").toBe(false);
  });
});
