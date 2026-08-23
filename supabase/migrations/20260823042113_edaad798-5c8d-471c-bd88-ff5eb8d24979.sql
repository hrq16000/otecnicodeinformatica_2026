-- PARTNERS: grants por coluna alinhados à view pública partners_public
REVOKE SELECT ON public.partners FROM anon, authenticated;

GRANT SELECT (
  id, slug, nome_profissional, foto_url, cidade, estado, regioes_atendidas,
  especialidades, descricao, servicos, experiencia, certificacoes, horario,
  formas_atendimento, whatsapp, site_url, redes_sociais, created_at, updated_at
) ON public.partners TO anon;

-- authenticated precisa de leitura completa apenas via policies de dono/admin
GRANT SELECT ON public.partners TO authenticated;

COMMENT ON POLICY "Public can read active partners" ON public.partners IS
  'Leitura pública restrita a colunas publicas via GRANT por coluna (anon). Campos sensiveis (documento, documento_tipo, notas_admin, plano_expira_em, status, user_id, aceite_termos_em) nao sao selecionaveis por anon. Consumir sempre a view public.partners_public.';

-- REVIEWS: telefone do cliente e metadados de origem fora do alcance publico
REVOKE SELECT ON public.reviews FROM anon, authenticated;

GRANT SELECT (
  id, author_name, author_photo_url, rating, comment, service_slug, city,
  neighborhood, source, google_review_url, review_date, created_at,
  verified, published
) ON public.reviews TO anon;

GRANT SELECT (
  id, author_name, author_photo_url, rating, comment, service_slug, city,
  neighborhood, source, google_review_url, review_date, created_at,
  verified, published
) ON public.reviews TO authenticated;

COMMENT ON POLICY "Public can read verified published reviews" ON public.reviews IS
  'Leitura publica restrita por GRANT de coluna: client_phone, origin_path, origin_protocol, service_closed_at e authorized_publication nao sao selecionaveis por anon/authenticated. Admin le a tabela completa via service_role/painel.';
