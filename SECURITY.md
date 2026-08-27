# Política e decisões de segurança

Este documento registra as decisões de segurança em vigor no projeto **O Técnico
de Informática**. Ele é curto de propósito: descreve apenas o que precisa ser
respeitado por qualquer alteração futura, com os gates automáticos que impedem
regressão.

## 1. Códigos de verificação de O.S. nunca em texto puro

**Decisão.** A coluna `code_plain` da tabela `os_verification_codes` foi
removida. O código de 6 dígitos:

- é gerado **sob demanda**, por administrador autenticado, na ação
  `action=issue` da função `os-codigo`;
- é devolvido **uma única vez** na resposta HTTP dessa chamada e exibido apenas
  em memória no painel `/admin/os-audit`;
- é persistido somente como hash SHA-256 salgado com o `id` da linha
  (`code:<id>:<codigo>`) na coluna `code_hash`;
- é apagado (`code_hash = null`) assim que consumido na verificação.

**Proibido.** Reintroduzir qualquer coluna/campo/log/estado que guarde o código
legível (`code_plain`, `codigo_texto`, `plainCode`, etc.), inclusive em
`console.log`.

**Gates.**
- `npm run check:security-regressions` — varredura estática do repositório.
- `src/__tests__/security-os-codigo.test.ts` — testes automatizados do fluxo.

## 2. Funções `SECURITY DEFINER` administrativas só no contexto de servidor

**Decisão.** Funções `SECURITY DEFINER` de escrita administrativa (hoje
`public.admin_link_os_lead`) tiveram o `EXECUTE` revogado de `public`, `anon` e
`authenticated`. Só `service_role` executa, ou seja, apenas código de servidor
com a chave de serviço (funções internas do backend), nunca o navegador de um
usuário logado.

**Proibido.** `GRANT EXECUTE ... TO authenticated` (ou `anon`/`public`) em
funções definer que escrevem dados ou decidem privilégio. Verificações de papel
legíveis pelo usuário (`public.has_role`) continuam disponíveis para
`authenticated` — elas são somente leitura e escopadas.

**Gates.**
- `src/__tests__/security-definer-privileges.integration.test.ts` — chamada real
  com a chave publicável/sessão de usuário precisa falhar com permissão negada.
- `.github/workflows/security-recurring.yml` — reexecução periódica e a cada
  merge; o build falha se qualquer um dos `internal_id` já corrigidos reaparecer.

## 3. Registro de auditoria administrativa

Toda emissão de código sob demanda grava uma linha em `public.admin_audit_log`
com área `os_verification`, ação `issue_code`, alvo (id da linha), carimbo de
tempo e identificador do administrador que agiu (`actor_id` e `actor_email`).
O código em si **não** entra no log.

## 4. Achados corrigidos e monitorados

| internal_id | decisão |
| --- | --- |
| `os_verification_codes_plaintext_code` | corrigido — seção 1 |
| `SUPA_authenticated_security_definer_function_executable` | corrigido — seção 2 |

Reaparecimento de qualquer um destes bloqueia o pipeline.

## 5. Como reportar uma vulnerabilidade

Contato exclusivo pelo WhatsApp comercial publicado no site. Não abra issue
pública com detalhes exploráveis.
