-- SEED DO AMBIENTE LOCAL
--
-- Executado por `supabase start --config supabase/config.local.toml`.
-- Objetivo: deixar a aplicação funcional offline, com um usuário
-- administrador de teste e as configurações mínimas do portal.
--
-- ATENÇÃO: este arquivo é EXCLUSIVO de desenvolvimento local. Nenhuma
-- credencial aqui existe em produção.

-- 1. Administrador de teste ---------------------------------------------
-- E-mail: admin@local.test · Senha: admin123456
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data
)
values (
  '00000000-0000-0000-0000-000000000000',
  '11111111-1111-1111-1111-111111111111',
  'authenticated', 'authenticated',
  'admin@local.test',
  crypt('admin123456', gen_salt('bf')),
  now(), now(), now(),
  '{"provider":"email","providers":["email"]}',
  '{"nome":"Admin Local"}'
)
on conflict (id) do nothing;

insert into auth.identities (
  id, user_id, provider_id, identity_data, provider, created_at, updated_at
)
values (
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  '{"sub":"11111111-1111-1111-1111-111111111111","email":"admin@local.test"}',
  'email', now(), now()
)
on conflict (id) do nothing;

-- 2. Papel de administrador ---------------------------------------------
-- Aplicado apenas quando a tabela de papéis existir no esquema migrado.
do $$
begin
  if to_regclass('public.user_roles') is not null then
    execute $sql$
      insert into public.user_roles (user_id, role)
      values ('11111111-1111-1111-1111-111111111111', 'admin')
      on conflict do nothing
    $sql$;
  end if;
end $$;

-- 3. Configurações iniciais do portal -----------------------------------
do $$
begin
  if to_regclass('public.site_settings') is not null then
    execute $sql$
      insert into public.site_settings (key, value)
      values
        ('ambiente', 'local'),
        ('indexacao_habilitada', 'false')
      on conflict (key) do nothing
    $sql$;
  end if;
end $$;
