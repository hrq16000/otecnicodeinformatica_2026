-- Views públicas passam a ser a única porta de entrada pública (definer + barrier)
ALTER VIEW public.partners_public SET (security_invoker = false, security_barrier = true);
ALTER VIEW public.reviews_public  SET (security_invoker = false, security_barrier = true);

GRANT SELECT ON public.partners_public TO anon, authenticated;
GRANT SELECT ON public.reviews_public  TO anon, authenticated;

-- Nenhuma leitura direta das tabelas base por visitantes
DROP POLICY IF EXISTS "Public can read active partners" ON public.partners;
DROP POLICY IF EXISTS "Public can read verified published reviews" ON public.reviews;

REVOKE SELECT ON public.partners FROM anon;
REVOKE SELECT ON public.reviews  FROM anon;

-- Logado: linhas limitadas pelas policies de dono/admin (não há mais leitura pública)
GRANT SELECT ON public.partners TO authenticated;
GRANT SELECT ON public.reviews  TO authenticated;

COMMENT ON VIEW public.partners_public IS
  'Vitrine publica de parceiros ativos. Executa como owner (security definer) e expoe apenas colunas publicas; documento, documento_tipo, notas_admin, plano_expira_em, status, user_id e aceite_termos_em nunca saem daqui.';
COMMENT ON VIEW public.reviews_public IS
  'Vitrine publica de avaliacoes verificadas e publicadas. Nao expoe client_phone, origin_path, origin_protocol, service_closed_at nem authorized_publication.';
