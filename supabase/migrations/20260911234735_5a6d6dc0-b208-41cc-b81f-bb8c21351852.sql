CREATE OR REPLACE FUNCTION public.get_my_partner()
RETURNS TABLE (
  id uuid,
  slug text,
  nome_profissional text,
  foto_url text,
  cidade text,
  estado text,
  regioes_atendidas text[],
  especialidades text[],
  descricao text,
  servicos text[],
  experiencia text,
  certificacoes text[],
  horario text,
  formas_atendimento text[],
  whatsapp text,
  site_url text,
  status public.partner_status,
  plano_expira_em date
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.id, p.slug, p.nome_profissional, p.foto_url, p.cidade, p.estado,
         p.regioes_atendidas, p.especialidades, p.descricao, p.servicos, p.experiencia,
         p.certificacoes, p.horario, p.formas_atendimento, p.whatsapp, p.site_url,
         p.status, p.plano_expira_em
  FROM public.partners p
  WHERE p.user_id = auth.uid()
  ORDER BY p.created_at DESC
  LIMIT 1
$$;

REVOKE ALL ON FUNCTION public.get_my_partner() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_my_partner() TO authenticated;

CREATE OR REPLACE FUNCTION public.get_my_partner_photos()
RETURNS TABLE (id uuid, url text, legenda text, ordem smallint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT f.id, f.url, f.legenda, f.ordem
  FROM public.partner_photos f
  JOIN public.partners p ON p.id = f.partner_id
  WHERE p.user_id = auth.uid()
  ORDER BY f.ordem
$$;

REVOKE ALL ON FUNCTION public.get_my_partner_photos() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_my_partner_photos() TO authenticated;