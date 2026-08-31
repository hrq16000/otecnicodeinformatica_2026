CREATE TABLE public.os_threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  os_id uuid REFERENCES public.ordens_servico(id) ON DELETE CASCADE,
  protocolo text,
  telefone_hash text NOT NULL,
  access_token_hash text NOT NULL UNIQUE,
  assunto text,
  status text NOT NULL DEFAULT 'aberta',
  last_message_at timestamp with time zone,
  unread_admin integer NOT NULL DEFAULT 0,
  unread_client integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX os_threads_os_id_unico ON public.os_threads (os_id) WHERE os_id IS NOT NULL;
CREATE INDEX os_threads_telefone_hash_idx ON public.os_threads (telefone_hash);
CREATE INDEX os_threads_last_message_idx ON public.os_threads (last_message_at DESC NULLS LAST);

GRANT SELECT, INSERT, UPDATE ON public.os_threads TO authenticated;
GRANT ALL ON public.os_threads TO service_role;
ALTER TABLE public.os_threads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins leem conversas" ON public.os_threads FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins criam conversas" ON public.os_threads FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins atualizam conversas" ON public.os_threads FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.os_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL REFERENCES public.os_threads(id) ON DELETE CASCADE,
  author_type text NOT NULL CHECK (author_type IN ('client','admin','system')),
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  author_label text,
  body text NOT NULL DEFAULT '',
  read_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX os_messages_thread_idx ON public.os_messages (thread_id, created_at);

GRANT SELECT, INSERT, UPDATE ON public.os_messages TO authenticated;
GRANT ALL ON public.os_messages TO service_role;
ALTER TABLE public.os_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins leem mensagens" ON public.os_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins escrevem mensagens" ON public.os_messages FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins atualizam mensagens" ON public.os_messages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.os_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL REFERENCES public.os_threads(id) ON DELETE CASCADE,
  message_id uuid REFERENCES public.os_messages(id) ON DELETE CASCADE,
  storage_path text NOT NULL,
  mime_type text NOT NULL,
  size_bytes integer NOT NULL,
  nome_original text,
  uploaded_by text NOT NULL DEFAULT 'client',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX os_attachments_thread_idx ON public.os_attachments (thread_id, created_at);
CREATE INDEX os_attachments_message_idx ON public.os_attachments (message_id);

GRANT SELECT, INSERT ON public.os_attachments TO authenticated;
GRANT ALL ON public.os_attachments TO service_role;
ALTER TABLE public.os_attachments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins leem anexos" ON public.os_attachments FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins criam anexos" ON public.os_attachments FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_os_threads_updated_at BEFORE UPDATE ON public.os_threads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();