-- Rodada 19 — CONSULTA SOMENTE LEITURA / REVISÃO MANUAL.
-- Não é migration nem executada pelo ChatGPT; não cria roles nem GRANT.
-- Mostra evidência de configuração, mas não testa políticas aplicadas
-- nem substitui testes com usuários/roles reais e duas conexões concorrentes.
-- Se tabela ainda não existe, não haverá linhas para ela.
SELECT
  n.nspname AS schema_nome,
  c.relname AS tabela,
  c.relrowsecurity AS rls_ligado,
  c.relforcerowsecurity AS rls_forcado,
  r.rolname AS papel,
  CASE WHEN r.oid IS NULL THEN NULL
    ELSE has_schema_privilege(r.oid, n.oid, 'USAGE') END AS pode_usar_schema,
  CASE WHEN r.oid IS NULL THEN NULL
    ELSE has_table_privilege(r.oid, c.oid, 'SELECT') END AS pode_consultar,
  CASE WHEN r.oid IS NULL THEN NULL
    ELSE has_table_privilege(r.oid, c.oid, 'INSERT') END AS pode_inserir,
  CASE WHEN r.oid IS NULL THEN NULL
    ELSE has_table_privilege(r.oid, c.oid, 'UPDATE') END AS pode_atualizar,
  CASE WHEN r.oid IS NULL THEN NULL
    ELSE has_table_privilege(r.oid, c.oid, 'DELETE') END AS pode_excluir
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
CROSS JOIN (VALUES ('anon'), ('authenticated')) AS papeis(nome)
LEFT JOIN pg_roles r ON r.rolname = papeis.nome
WHERE n.nspname = 'national_ops'
  AND c.relkind IN ('r', 'p')
  AND c.relname IN (
    'solicitacoes_autorizacao',
    'autorizacoes_cotacao',
    'autorizacoes_auditoria'
  )
ORDER BY c.relname, papeis.nome;

-- CRITÉRIOS (se e somente se o esquema estiver instalado):
-- 1) Se não há linha por tabela, NÃO declarar pronto; migração não aplicada.
-- 2) RLS ligado e forçado.
-- 3) anon/authenticated sem USAGE/SELECT/INSERT/UPDATE/DELETE.
-- 4) Testar com sessão real que um cliente não acesse outro.
-- 5) Papel de backend deve ter policies próprias revisadas, sem BYPASSRLS.
-- 6) Consentimento+evento devem ter rollback completo em queda/timeout.
