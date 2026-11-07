-- Rodada 18 — PROPOSTA ISOLADA. NÃO É MIGRATION. NÃO EXECUTAR.
-- Depende de aprovação jurídica, confirmação do banco oficial, backup e plano
-- de rollback. A modalidade nacional permanece desativada.
-- Esquema PRIVADO: o backend com credencial restrita opera as tabelas.
-- Nenhum GRANT para anon/authenticated e nenhuma função security definer pública.
-- IDs opacos nesta proposta são TEXT (domínio aceita IDs externos); adaptar
-- com FKs ao cadastro real somente após inspeção da modelagem oficial.
--
-- INVARIANTES: uma autorização por (solicitação,revisão), chave única por
-- (cliente,chave), snapshots JSONB imutáveis, auditoria na mesma transação,
-- SELECT FOR UPDATE sob dois locks advisory em ordem fixa + CAS de revisão.
-- Tabelas pensadas para caso de aplicação FUTURA com revisão jurídica da LGPD.
BEGIN;

CREATE SCHEMA IF NOT EXISTS national_ops;

CREATE TABLE national_ops.solicitacoes_autorizacao (
  solicitacao_id text PRIMARY KEY,
  cliente_id text NOT NULL,
  estado text NOT NULL DEFAULT 'rascunho' CHECK (estado IN (
    'rascunho','cotacao_aceita','aguardando_pagamento','pagamento_confirmado',
    'aceito_diretamente_pelo_tecnico','em_execucao','concluido','cancelado','reembolsado'
  )),
  revisao_atual integer NOT NULL CHECK (revisao_atual >= 1),
  condicoes_atuais jsonb NOT NULL CHECK (jsonb_typeof(condicoes_atuais) = 'object'),
  consentimento_atual jsonb CHECK (
    consentimento_atual IS NULL OR jsonb_typeof(consentimento_atual) = 'object'
  ),
  chave_autorizacao_atual text,
  CHECK ((consentimento_atual IS NULL) = (chave_autorizacao_atual IS NULL)),
  CONSTRAINT solicitacao_identidade_unica UNIQUE (solicitacao_id, cliente_id)
);

CREATE TABLE national_ops.autorizacoes_cotacao (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  solicitacao_id text NOT NULL,
  cliente_id text NOT NULL,
  revisao integer NOT NULL CHECK (revisao >= 1),
  chave_idempotencia text NOT NULL,
  consentimento jsonb NOT NULL CHECK (jsonb_typeof(consentimento) = 'object'),
  aceito_em timestamptz NOT NULL,
  CONSTRAINT autorizacao_titular_fkey
    FOREIGN KEY (solicitacao_id, cliente_id)
    REFERENCES national_ops.solicitacoes_autorizacao (solicitacao_id, cliente_id)
    ON DELETE RESTRICT,
  UNIQUE (solicitacao_id, revisao),
  UNIQUE (cliente_id, chave_idempotencia),
  CONSTRAINT autorizacao_auditoria_vinculo_unique
    UNIQUE (solicitacao_id, cliente_id, revisao)
);

CREATE TABLE national_ops.autorizacoes_auditoria (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  solicitacao_id text NOT NULL,
  cliente_id text NOT NULL,
  revisao integer NOT NULL CHECK (revisao >= 1),
  tipo text NOT NULL CHECK (tipo = 'cotacao_aceita_cliente'),
  instante_utc timestamptz NOT NULL,
  chave_idempotencia text NOT NULL,
  CONSTRAINT auditoria_autorizacao_fkey
    FOREIGN KEY (solicitacao_id, cliente_id, revisao)
    REFERENCES national_ops.autorizacoes_cotacao (solicitacao_id, cliente_id, revisao)
    ON DELETE RESTRICT,
  UNIQUE (solicitacao_id, revisao)
);

CREATE INDEX autorizacoes_cotacao_cliente_idx
  ON national_ops.autorizacoes_cotacao(cliente_id, aceito_em DESC);

ALTER TABLE national_ops.solicitacoes_autorizacao ENABLE ROW LEVEL SECURITY;
ALTER TABLE national_ops.autorizacoes_cotacao ENABLE ROW LEVEL SECURITY;
ALTER TABLE national_ops.autorizacoes_auditoria ENABLE ROW LEVEL SECURITY;
ALTER TABLE national_ops.solicitacoes_autorizacao FORCE ROW LEVEL SECURITY;
ALTER TABLE national_ops.autorizacoes_cotacao FORCE ROW LEVEL SECURITY;
ALTER TABLE national_ops.autorizacoes_auditoria FORCE ROW LEVEL SECURITY;

-- Não alterar privilégios do SCHEMA existente nesta proposta: isso pode
-- quebrar módulos anteriores. Validar grants atuais e criar uma role privada
-- específica em migration revisada, sem conceder acesso público.
-- Revogar apenas os NOVOS objetos. Jamais alterar permissões das outras
-- tabelas do schema, inclusive partner_validacoes da proposta anterior.
REVOKE ALL ON national_ops.solicitacoes_autorizacao FROM PUBLIC;
REVOKE ALL ON national_ops.autorizacoes_cotacao FROM PUBLIC;
REVOKE ALL ON national_ops.autorizacoes_auditoria FROM PUBLIC;
REVOKE ALL ON SEQUENCE national_ops.autorizacoes_cotacao_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE national_ops.autorizacoes_auditoria_id_seq FROM PUBLIC;
-- FORCE RLS sem policies bloqueia até o serviço privado normal.
-- Antes de ativar, definir e testar role/policies específicas de backend.
-- Não usar BYPASSRLS nem conceder acesso a anon/authenticated.
COMMIT;

-- Antes de uma migration real:
-- [ ] Banco oficial, permissões, FKs, titularidade e segurança confirmados
-- [ ] Schema privado não publicado pela API; não usar privilégio amplo
-- [ ] RLS/role restrito e política de acesso backend avaliadas
-- [ ] Locks e unicidade verificados com duas conexões PostgreSQL reais
-- [ ] Testes contra reuso de chave e consentimento entre clientes
-- [ ] Validar FKs compostas no banco real, inclusive cliente divergente
-- [ ] Conferir imutabilidade de snapshots e logs via políticas/permissões
-- [ ] Casos de atualização de revisão/versionamento imutável revisados
-- [ ] Auditoria append-only, retenção LGPD e regra de expurgo aprovadas
-- [ ] Crash, queda da conexão, deadlocks, rollback e recuperação testados
-- [ ] Sem integração de PSP, checkout, técnico, migração ou deploy automático
