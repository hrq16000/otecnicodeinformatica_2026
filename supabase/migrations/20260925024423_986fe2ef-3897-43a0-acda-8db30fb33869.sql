-- 1) consent_events: substitui WITH CHECK (true) por predicado real,
--    mantendo o registro anônimo de consentimento funcionando.
DROP POLICY IF EXISTS "anyone can record consent" ON public.consent_events;
CREATE POLICY "anyone can record consent"
  ON public.consent_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    session_id IS NOT NULL
    AND length(session_id) BETWEEN 8 AND 128
    AND length(coalesce(path, '')) <= 512
    AND length(coalesce(policy_version, '')) <= 64
  );

-- 2) click_events: substitui WITH CHECK (true) por predicado real,
--    mantendo a telemetria anônima funcionando.
DROP POLICY IF EXISTS "anyone can insert click events" ON public.click_events;
CREATE POLICY "anyone can insert click events"
  ON public.click_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    event_type IS NOT NULL
    AND length(event_type) BETWEEN 2 AND 64
    AND length(coalesce(path, '')) <= 512
    AND length(coalesce(session_id, '')) <= 128
  );

-- 3) partner_program_settings: leitura pública apenas do registro único
--    de configuração (id = true), em vez de USING (true).
DROP POLICY IF EXISTS "Anyone can read program settings" ON public.partner_program_settings;
CREATE POLICY "Anyone can read program settings"
  ON public.partner_program_settings
  FOR SELECT
  TO anon, authenticated
  USING (id = true);

-- 4) storage.objects (bucket parceiros): a leitura pública passa a exigir que
--    o arquivo esteja publicado no perfil de um parceiro ativo (registrado em
--    partner_photos), em vez de qualquer arquivo na pasta de um parceiro ativo.
DROP POLICY IF EXISTS "Fotos de parceiros de perfis ativos" ON storage.objects;
CREATE POLICY "Fotos de parceiros de perfis ativos"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (
    bucket_id = 'parceiros'
    AND EXISTS (
      SELECT 1
      FROM public.partners p
      JOIN public.partner_photos f ON f.partner_id = p.id
      WHERE p.status = 'ativo'::public.partner_status
        AND (storage.foldername(objects.name))[1] = p.id::text
        AND f.url = objects.name
    )
  );