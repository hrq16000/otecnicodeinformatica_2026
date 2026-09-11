DROP POLICY IF EXISTS "Public can submit partner application" ON public.partners;
CREATE POLICY "Public can submit partner application"
  ON public.partners FOR INSERT TO anon, authenticated
  WITH CHECK (
    status = 'aguardando_analise'
    AND plano_expira_em IS NULL
    AND notas_admin IS NULL
    AND (user_id IS NULL OR user_id = auth.uid())
    AND length(nome_profissional) BETWEEN 2 AND 120
    AND length(slug) BETWEEN 2 AND 120
    AND length(cidade) BETWEEN 2 AND 80
    AND length(estado) BETWEEN 2 AND 40
    AND (descricao IS NULL OR length(descricao) <= 4000)
    AND (experiencia IS NULL OR length(experiencia) <= 2000)
    AND (whatsapp IS NULL OR length(whatsapp) <= 20)
    AND (documento IS NULL OR length(documento) <= 20)
    AND array_length(especialidades, 1) IS DISTINCT FROM 0
  );

DROP POLICY IF EXISTS "Fotos de parceiros legiveis" ON storage.objects;
CREATE POLICY "Fotos de parceiros legiveis"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'parceiros');

DROP POLICY IF EXISTS "Parceiro envia fotos na propria pasta" ON storage.objects;
CREATE POLICY "Parceiro envia fotos na propria pasta"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'parceiros'
    AND EXISTS (
      SELECT 1 FROM public.partners p
      WHERE p.user_id = auth.uid() AND p.id::text = (storage.foldername(name))[1]
    )
  );

DROP POLICY IF EXISTS "Parceiro atualiza fotos da propria pasta" ON storage.objects;
CREATE POLICY "Parceiro atualiza fotos da propria pasta"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'parceiros'
    AND EXISTS (
      SELECT 1 FROM public.partners p
      WHERE p.user_id = auth.uid() AND p.id::text = (storage.foldername(name))[1]
    )
  );

DROP POLICY IF EXISTS "Parceiro remove fotos da propria pasta" ON storage.objects;
CREATE POLICY "Parceiro remove fotos da propria pasta"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'parceiros'
    AND EXISTS (
      SELECT 1 FROM public.partners p
      WHERE p.user_id = auth.uid() AND p.id::text = (storage.foldername(name))[1]
    )
  );

DROP POLICY IF EXISTS "Admin gerencia fotos de parceiros" ON storage.objects;
CREATE POLICY "Admin gerencia fotos de parceiros"
  ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'parceiros' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'parceiros' AND public.has_role(auth.uid(), 'admin'));