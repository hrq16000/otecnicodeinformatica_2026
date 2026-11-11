import test from 'node:test';
import assert from 'node:assert/strict';
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { inspectPartnerExport } from './inspect-partner-export.mjs';

const rec = (id, categoria, status = 'ativo', extra = {}) => ({
  id, categoria, status, nome: 'Profissional de teste', cidade: 'Curitiba', estado: 'PR', ...extra
});

test('contagens estritas: categoria, deduplicacao, banimento e registros incompletos', () => {
  const counts = inspectPartnerExport([
    rec('001', 'Manutenção de computadores'),
    rec('002', 'Jardinagem'),
    rec('003', 'Suporte técnico de informática', 'suspenso'),
    rec('004', 'Notebook', 'ativo', { cidade: '' }),
    rec('001', 'Redes Wi-Fi'),
    rec('005', 'Redes Wi-Fi'),
    rec('006', 'Impressoras', 'pendente'),
    rec('007', 'Ar condicionado'),
  ]);
  assert.deepEqual(counts, {
    total: 8, candidatos_para_revisao: 2,
    outras_categorias_ou_sem_categoria: 2, bloqueados: 1,
    duplicados_na_origem: 1, incompletos: 1, status_desconhecido: 1,
    nenhuma_importacao_executada: true,
  });
});

test('recusa input invalido sem executar qualquer escrita', () => {
  assert.throws(() => inspectPartnerExport({ registros: [] }), /array/);
  assert.throws(() => inspectPartnerExport(Array(50_001).fill({})), /50000/);
});

test('CLI produz somente resumo agregado, nunca PII da exportacao', () => {
  const dir = mkdtempSync(join(tmpdir(), 'partner-dryrun-'));
  try {
    const json = join(dir, 'private.json');
    writeFileSync(json, JSON.stringify([
      rec('contato-privado-123', 'Informática', 'ativo',
        { nome: 'Pessoa privada', whatsapp: '41999999999' })
    ]));
    const output = execFileSync(process.execPath, [
      fileURLToPath(new URL('./inspect-partner-export.mjs', import.meta.url)), json
    ], { encoding: 'utf8' });
    assert.equal(JSON.parse(output).candidatos_para_revisao, 1);
    for (const secret of ['Pessoa privada', '41999999999', 'contato-privado-123']) {
      assert.equal(output.includes(secret), false);
    }
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
