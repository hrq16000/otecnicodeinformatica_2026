CREATE TABLE public.paginas_editoriais (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  tipo text NOT NULL DEFAULT 'sintoma' CHECK (tipo IN ('sintoma','solucao')),
  titulo text NOT NULL,
  meta_description text NOT NULL DEFAULT '',
  palavras_chave text[] NOT NULL DEFAULT '{}',
  resumo text NOT NULL DEFAULT '',
  conteudo text NOT NULL DEFAULT '',
  publicado boolean NOT NULL DEFAULT false,
  indexavel boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.paginas_editoriais TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.paginas_editoriais TO authenticated;
GRANT ALL ON public.paginas_editoriais TO service_role;

ALTER TABLE public.paginas_editoriais ENABLE ROW LEVEL SECURITY;

CREATE POLICY "paginas publicadas sao publicas"
ON public.paginas_editoriais FOR SELECT
TO anon, authenticated
USING (publicado = true);

CREATE POLICY "admin le todas as paginas"
ON public.paginas_editoriais FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admin cria paginas"
ON public.paginas_editoriais FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admin edita paginas"
ON public.paginas_editoriais FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admin exclui paginas"
ON public.paginas_editoriais FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER paginas_editoriais_updated_at
BEFORE UPDATE ON public.paginas_editoriais
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();