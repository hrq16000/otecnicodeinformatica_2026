-- Volta às views com permissões do próprio consultante (sem SECURITY DEFINER)
ALTER VIEW public.partners_public SET (security_invoker = true);
ALTER VIEW public.reviews_public  SET (security_invoker = true);

-- PARTNERS: leitura pública de linhas ativas, colunas limitadas por GRANT
CREATE POLICY "Public can read active partners"
  ON public.partners FOR SELECT TO anon, authenticated
  USING (status = 'ativo'::partner_status);

REVOKE SELECT ON public.partners FROM anon, authenticated;

GRANT SELECT (
  id, slug, nome_profissional, foto_url, cidade, estado, regioes_atendidas,
  especialidades, descricao, servicos, experiencia, certificacoes, horario,
  formas_atendimento, whatsapp, site_url, redes_sociais, created_at, updated_at,
  status
) ON public.partners TO anon, authenticated;

COMMENT ON POLICY "Public can read active partners" ON public.partners IS
  'Linhas: apenas parceiros ativos. Colunas: limitadas por GRANT por coluna — documento, documento_tipo, notas_admin, plano_expira_em, user_id e aceite_termos_em nao sao selecionaveis por anon nem authenticated. Admin usa a funcao admin_list_partners.';

-- REVIEWS: publico so via linhas verificadas/publicadas; colunas sensiveis so para admin
CREATE POLICY "Public can read verified published reviews"
  ON public.reviews FOR SELECT TO anon
  USING (verified = true AND published = true);

REVOKE SELECT ON public.reviews FROM anon;

GRANT SELECT (
  id, author_name, author_photo_url, rating, comment, service_slug, city,
  neighborhood, source, google_review_url, review_date, created_at,
  verified, published
) ON public.reviews TO anon;

-- authenticated so alcanca linhas via policies de admin
GRANT SELECT ON public.reviews TO authenticated;

COMMENT ON POLICY "Public can read verified published reviews" ON public.reviews IS
  'Somente anon, apenas linhas verificadas e publicadas, e apenas colunas publicas via GRANT por coluna: client_phone, origin_path, origin_protocol, service_closed_at e authorized_publication ficam fora.';
