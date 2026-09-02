CREATE TABLE public.trust_claim_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_key text NOT NULL UNIQUE,
  arquivo text NOT NULL,
  linha integer,
  familia text,
  classificacao text,
  status_revisao text NOT NULL DEFAULT 'pendente',
  observacao text,
  evidencia text,
  revisado_por uuid REFERENCES auth.users(id),
  revisado_em timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT trust_claim_reviews_status_chk CHECK (status_revisao IN ('pendente','em_revisao','revisado','aceito','remover'))
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.trust_claim_reviews TO authenticated;
GRANT ALL ON public.trust_claim_reviews TO service_role;
ALTER TABLE public.trust_claim_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins gerenciam revisoes de afirmacoes"
  ON public.trust_claim_reviews FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

CREATE TABLE public.depoimentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente text NOT NULL,
  cidade text,
  servico text,
  texto text NOT NULL,
  consentimento boolean NOT NULL DEFAULT false,
  consentimento_origem text,
  prova_url text,
  data_atendimento date,
  status text NOT NULL DEFAULT 'rascunho',
  motivo_rejeicao text,
  aprovado_por uuid REFERENCES auth.users(id),
  aprovado_em timestamptz,
  criado_por uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT depoimentos_status_chk CHECK (status IN ('rascunho','pendente','aprovado','rejeitado','arquivado')),
  CONSTRAINT depoimentos_consentimento_chk CHECK (status <> 'aprovado' OR consentimento = true)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.depoimentos TO authenticated;
GRANT ALL ON public.depoimentos TO service_role;
ALTER TABLE public.depoimentos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins gerenciam depoimentos"
  ON public.depoimentos FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

CREATE TABLE public.depoimentos_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  depoimento_id uuid NOT NULL REFERENCES public.depoimentos(id) ON DELETE CASCADE,
  acao text NOT NULL,
  de_status text,
  para_status text,
  motivo text,
  actor_id uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.depoimentos_audit TO authenticated;
GRANT ALL ON public.depoimentos_audit TO service_role;
ALTER TABLE public.depoimentos_audit ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins leem auditoria de depoimentos"
  ON public.depoimentos_audit FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

CREATE POLICY "Admins registram auditoria de depoimentos"
  ON public.depoimentos_audit FOR INSERT TO authenticated
  WITH CHECK (actor_id = auth.uid() AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

CREATE TRIGGER trust_claim_reviews_updated_at BEFORE UPDATE ON public.trust_claim_reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER depoimentos_updated_at BEFORE UPDATE ON public.depoimentos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();