CREATE TABLE public.dns_records (
  id uuid primary key default gen_random_uuid(),
  hostname text not null,
  tipo text not null default 'A',
  valor_esperado text not null,
  principal boolean not null default false,
  observacao text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (hostname, tipo, valor_esperado)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.dns_records TO authenticated;
GRANT ALL ON public.dns_records TO service_role;

ALTER TABLE public.dns_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins gerenciam registros DNS"
ON public.dns_records FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_dns_records_updated_at
BEFORE UPDATE ON public.dns_records
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.dns_records (hostname, tipo, valor_esperado, principal, observacao) VALUES
  ('otecnicodeinformatica.com.br', 'A', '185.158.133.1', true, 'Domínio canônico'),
  ('www.otecnicodeinformatica.com.br', 'A', '185.158.133.1', false, 'Redireciona para o domínio canônico');