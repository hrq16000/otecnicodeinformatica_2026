# Ambiente local (sem nuvem, sem internet)

Este guia sobe o portal inteiro na sua máquina: banco, Auth, Storage, Realtime
e Edge Functions. Nenhuma integração externa é chamada de verdade — em
desenvolvimento elas são simuladas com `console.log` (ver `src/lib/devMocks.ts`).

## 1. Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) rodando
- Node.js 20+
- Supabase CLI: `npm i -g supabase` (ou `npx supabase`)

## 2. Subir o backend local

```bash
supabase start --config supabase/config.local.toml
```

O CLI aplica tudo que está em `supabase/migrations/` e depois executa
`supabase/seed.sql`, que cria o administrador de teste:

- e-mail: `admin@local.test`
- senha: `admin123456`

Serviços expostos:

| Serviço      | URL                      |
|--------------|--------------------------|
| API          | http://127.0.0.1:54321   |
| Postgres     | postgres://postgres:postgres@127.0.0.1:54322/postgres |
| Studio       | http://127.0.0.1:54323   |
| Inbucket     | http://127.0.0.1:54324   |

## 3. Configurar variáveis

```bash
cp .env.local.example .env.local
```

Os valores já apontam para `http://127.0.0.1:54321` com a `anon key` padrão do
Supabase local. As chaves de analytics, Ads e observabilidade ficam vazias
de propósito (fail-closed).

## 4. Rodar o frontend

```bash
npm install
npm run dev:local
```

O app fica em http://localhost:8080.

## 5. Edge Functions

Em outro terminal:

```bash
npm run functions:serve
```

## 6. Parar tudo

```bash
supabase stop
```

## Notas

- `supabase/config.toml` é gerenciado pela plataforma; **não edite**. A
  configuração local vive em `supabase/config.local.toml`.
- Novas migrações: `supabase migration new <nome>` e reaplique com
  `supabase db reset --config supabase/config.local.toml`.
- Chamadas a IndexNow, Search Console, envio de mensagens e analytics são
  interceptadas em desenvolvimento e apenas registradas no console.
