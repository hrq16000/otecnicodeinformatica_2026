#!/usr/bin/env node
/**
 * Inspecao offline de exportacao autorizada de profissionais.
 * NUNCA persiste, publica, envia ou escreve registros em base de dados.
 * Entrada: JSON com array de objetos (ou { registros: [...] }).
 * Saida: APENAS contagens anonimas; nomes, IDs, telefones e contatos nunca sao impressos.
 *
 * Exemplo: node scripts/inspect-partner-export.mjs /caminho/privado/export.json
 * O arquivo de exportacao nao deve ser commitado no Git.
 */
import { readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_BYTES = 5 * 1024 * 1024;
const MAX_ROWS = 50_000;
const BLOCKED = new Set(['banido', 'banida', 'suspenso', 'suspensa', 'bloqueado', 'bloqueada', 'excluido', 'excluida', 'inativo', 'inativa', 'deleted', 'banned', 'suspended']);
const normalize = (value) => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const itCategory = /\b(informatica|computadores?|notebooks?|laptops?|hardware|software|redes? (?:de )?(?:computadores?|wifi|wi-fi)|wifi|wi-fi|impressoras?|tecnologia da informacao|suporte (?:tecnico|ti)|assistencia (?:tecnica )?(?:de )?(?:computadores?|notebooks?))\b/;

export function inspectPartnerExport(records) {
  if (!Array.isArray(records) || records.length > MAX_ROWS) throw new Error('A exportacao deve conter um array com no maximo 50000 registros.');
  const summary = {
    total: records.length,
    candidatos_para_revisao: 0,
    outras_categorias_ou_sem_categoria: 0,
    bloqueados: 0,
    duplicados_na_origem: 0,
    incompletos: 0,
    status_desconhecido: 0,
    nenhuma_importacao_executada: true,
  };
  const seen = new Set();
  for (const r of records) {
    if (!r || typeof r !== 'object' || Array.isArray(r)) { summary.incompletos++; continue; }
    const id = String(r.source_id ?? r.id ?? '').trim();
    // Sem ID estavel de origem nao ha como assegurar idempotencia.
    if (!id || id.length > 120) { summary.incompletos++; continue; }
    if (seen.has(id)) { summary.duplicados_na_origem++; continue; }
    seen.add(id);
    const status = normalize(r.status);
    if (BLOCKED.has(status)) { summary.bloqueados++; continue; }
    if (!['ativo', 'ativa', 'active', 'published', 'publicado', 'publicada'].includes(status)) {
      summary.status_desconhecido++;
      continue;
    }
    const categoria = normalize(r.categoria ?? r.category);
    if (!itCategory.test(categoria)) { summary.outras_categorias_ou_sem_categoria++; continue; }
    const nome = String(r.nome_profissional ?? r.nome ?? r.name ?? '').trim();
    const cidade = String(r.cidade ?? r.city ?? '').trim();
    const uf = String(r.estado ?? r.uf ?? '').trim().toUpperCase();
    if (!nome || !cidade || !/^[A-Z]{2}$/.test(uf)) { summary.incompletos++; continue; }
    // Candidato NAO equivale a aprovado: faltam titularidade e base legal.
    summary.candidatos_para_revisao++;
  }
  return summary;
}

function main() {
  const file = process.argv[2];
  if (!file || process.argv.length !== 3) throw new Error('Informe um arquivo JSON privado de exportacao autorizada.');
  const p = resolve(file);
  if (statSync(p).size > MAX_BYTES) throw new Error('Exportacao excede o limite de 5 MiB desta rodada.');
  const parsed = JSON.parse(readFileSync(p, 'utf8'));
  process.stdout.write(JSON.stringify(inspectPartnerExport(Array.isArray(parsed) ? parsed : parsed?.registros), null, 2) + '\n');
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  try { main(); }
  catch {
    // Falha generica: jamais registrar conteudo de exportacoes com PII.
    process.stderr.write('Falha ao analisar a exportacao. Confira formato, tamanho e campos obrigatorios.\n');
    process.exitCode = 1;
  }
}
