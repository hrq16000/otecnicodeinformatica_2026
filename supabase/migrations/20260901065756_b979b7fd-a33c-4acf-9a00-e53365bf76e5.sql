CREATE TABLE public.seo_overrides (
  id uuid primary key default gen_random_uuid(),
  path text not null unique,
  title text,
  description text,
  jsonld jsonb,
  canonical text,
  noindex boolean not null default false,
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

CREATE TABLE public.seo_overrides_audit (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  campo text not null,
  valor_anterior text,
  valor_novo text,
  changed_by uuid references auth.users(id),
  changed_at timestamptz not null default now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.seo_overrides TO authenticated;
GRANT ALL ON public.seo_overrides TO service_role;
GRANT SELECT, INSERT ON public.seo_overrides_audit TO authenticated;
GRANT ALL ON public.seo_overrides_audit TO service_role;

ALTER TABLE public.seo_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_overrides_audit ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins gerenciam overrides de SEO"
  ON public.seo_overrides FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins leem auditoria de SEO"
  ON public.seo_overrides_audit FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins registram auditoria de SEO"
  ON public.seo_overrides_audit FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') AND changed_by = auth.uid());

CREATE TRIGGER seo_overrides_updated_at
  BEFORE UPDATE ON public.seo_overrides
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();