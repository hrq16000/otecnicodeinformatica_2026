-- PROPOSTA DE DDL PARA REVISÃO — NÃO EXECUTAR NESTA RODADA.
-- Este arquivo em docs/ NÃO é uma migration e não altera banco algum.
--
-- Motivo: supabase/config.toml identifica um projeto NÃO presente na
-- conexão Supabase atual. Aplicar somente ao ambiente oficial confirmado,
-- por uma migration gerada com CLI e após revisar constraints, RLS,
-- direitos de privacidade, backup e rollback.
--
-- PostgreSQL portátil: validação nacional é 1:1 com public.partners,
-- preservando o cadastro e o plano anual. Esquema PRIVADO não exposto
-- pela API. Sem chave de serviço em frontend e sem acesso público.
--
-- O serviço de backend autenticado terá que:
-- 1. Conferir identidade e papel por fonte confiável (não JWT user_metadata).
-- 2. SELECT ... FOR UPDATE na linha da validação.
-- 3. Validar titularidade pelo partners.user_id e regras do domínio.
-- 4. UPDATE ... WHERE revisao = :anterior RETURNING revisao.
-- 5. INSERT de auditoria e COMMIT na MESMA transação; falha -> ROLLBACK.
-- Não expor tabelas ou funções privilegiadas ao navegador.

BEGIN;

CREATE SCHEMA IF NOT EXISTS national_ops;
REVOKE ALL ON SCHEMA national_ops FROM PUBLIC, anon, authenticated;

CREATE TABLE national_ops.partner_validacoes (
  parceiro_id uuid PRIMARY KEY REFERENCES public.partners(id) ON DELETE CASCADE,
  comunidade_status text NOT NULL DEFAULT 'pendente'
    CHECK (comunidade_status IN ('pendente','confirmada','nao_confirmada')),
  habilitacao_status text NOT NULL DEFAULT 'pendente'
    CHECK (habilitacao_status IN ('pendente','validada','suspensa')),
  termos_aceitos boolean NOT NULL DEFAULT false,
  versao_termos text,
  disponibilidade text NOT NULL DEFAULT 'indisponivel'
    CHECK (disponibilidade IN ('disponivel','indisponivel','ocupado')),
  disponibilidade_expira_em timestamptz,
  municipios_validados text[] NOT NULL DEFAULT '{}'::text[],
  servicos_validados text[] NOT NULL DEFAULT '{}'::text[],
  raio_atendimento_metros integer CHECK (raio_atendimento_metros > 0),
  revisao integer NOT NULL DEFAULT 0 CHECK (revisao >= 0),
  criado_em timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT nacional_disponivel_exige_aprovacao CHECK (
    disponibilidade <> 'disponivel' OR (
      comunidade_status = 'confirmada'
      AND habilitacao_status = 'validada'
      AND termos_aceitos
      AND versao_termos IS NOT NULL
      AND disponibilidade_expira_em IS NOT NULL
      AND cardinality(municipios_validados) > 0
      AND cardinality(servicos_validados) > 0
      AND raio_atendimento_metros > 0
    )
  )
);

CREATE TABLE national_ops.partner_validacoes_auditoria (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  parceiro_id uuid NOT NULL REFERENCES public.partners(id) ON DELETE CASCADE,
  ator_user_id uuid NOT NULL,
  acao text NOT NULL CHECK (
    acao IN ('confirmar_comunidade','validar_habilitacao','suspender_habilitacao','aceitar_termos','alterar_disponibilidade')
  ),
  revisao integer NOT NULL CHECK (revisao > 0),
  -- Referência a prova protegida, NUNCA print, telefone ou conversa WhatsApp.
  referencia_evidencia text,
  ocorrido_em timestamptz NOT NULL DEFAULT now(),
  UNIQUE (parceiro_id, revisao)
);

CREATE INDEX partner_validacoes_disponibilidade_idx
  ON national_ops.partner_validacoes (habilitacao_status, disponibilidade, disponibilidade_expira_em);

CREATE INDEX partner_validacoes_auditoria_parceiro_idx
  ON national_ops.partner_validacoes_auditoria (parceiro_id, ocorrido_em DESC);

ALTER TABLE national_ops.partner_validacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE national_ops.partner_validacoes_auditoria ENABLE ROW LEVEL SECURITY;
ALTER TABLE national_ops.partner_validacoes FORCE ROW LEVEL SECURITY;
ALTER TABLE national_ops.partner_validacoes_auditoria FORCE ROW LEVEL SECURITY;

REVOKE ALL ON national_ops.partner_validacoes FROM PUBLIC, anon, authenticated;
REVOKE ALL ON national_ops.partner_validacoes_auditoria FROM PUBLIC, anon, authenticated;
REVOKE ALL ON SEQUENCE national_ops.partner_validacoes_auditoria_id_seq FROM PUBLIC, anon, authenticated;

-- SEM POLÍTICAS PERMISSIVAS: nenhum SELECT/UPDATE/INSERT direto pelo usuário.
-- Os grants e a autenticação de um backend privado serão definidos após
-- escolher hospedagem e rotina de acesso. NÃO adicionar "TO authenticated
-- USING(true)" nem funções security definer públicas para contornar RLS.

COMMIT;

-- CRITÉRIOS DE ACEITAÇÃO ANTES DE APLICAR:
-- [ ] Projeto oficial confere exatamente com supabase/config.toml e backup.
-- [ ] Migração gerada pela CLI e revisada com DB diff; sem tocar public.partners.
-- [ ] Acesso anon/authenticated aos dados sensíveis retorna permission denied.
-- [ ] Usuário pode atualizar SOMENTE disponibilidade por backend autorizado;
--     administrador NÃO pode aprovar seu próprio perfil.
-- [ ] Falha de audit log reverte a alteração no banco e preserva revisão.
-- [ ] Registros iniciam pendentes; membros WhatsApp NÃO são importados.
-- [ ] Privacidade, retenção e deleção documentadas; advisors executados.
-- [ ] CI, build, segurança, SEO existentes e planos comerciais sem regressão.
