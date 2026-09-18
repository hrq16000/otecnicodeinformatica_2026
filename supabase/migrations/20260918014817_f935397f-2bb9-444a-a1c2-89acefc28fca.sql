ALTER TABLE public.paginas_editoriais DROP CONSTRAINT IF EXISTS paginas_editoriais_tipo_check;
ALTER TABLE public.paginas_editoriais
  ADD CONSTRAINT paginas_editoriais_tipo_check
  CHECK (tipo IN ('sintoma','solucao','cidade'));