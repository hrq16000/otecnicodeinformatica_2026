# Rodada de governança editorial SSR — 2026-10-09

## Objetivo

Alinhar a governança editorial ao runtime atual do TanStack Start, aprofundar três guias programáticos já aprovados e validar no HTML SSR os sinais que chegam a leitores e buscadores.

## Conteúdo revisado

- `pc-nao-liga-o-que-fazer`: diagnóstico por energia, POST, vídeo e inicialização, com limites para intervenções internas.
- `wifi-caindo-toda-hora`: registro de ocorrências, separação entre cobertura, roteador e provedor e mudanças reversíveis.
- `como-fazer-backup-na-nuvem`: retenção, proteção da conta, cópia independente e teste documentado de restauração.

Nenhuma rota, slug ou canonical foi alterado.

## Correções estruturais

- Inventário editorial único com a mesma precedência do runtime: base, suplementar e programático.
- Sobreposições suplementares aprovadas diferenciadas de colisões inesperadas.
- Governança separada em fase pré-build e fase pós-build com artefatos SSR obrigatórios.
- Gate pós-build incluído no `deploy:check`.
- Open Graph dos artigos passou a usar a capa editorial exclusiva também no `head` da rota SSR.
- Links para o pilar editorial restaurados em 18 artigos aprovados.
- FAQs incorporadas ao corpo deixaram de ser repetidas pelo componente genérico; o `FAQPage` agora é derivado das perguntas e respostas visíveis.
- Promoção para indexação e cluster editorial passaram a consumir o inventário completo, incluindo revisões suplementares.
- O inventário de intenção de `/problemas` passou a ser gerado antes do gate que o consome.

## Fontes editoriais

- Intel — Troubleshooting No Boot Issues for Intel® Boxed Desktop Processors.
- FCC e Wi-Fi Alliance — diagnóstico e arquitetura de redes domésticas.
- CISA e NIST — cópias de segurança, retenção e restauração.

As fontes são exibidas nos artigos correspondentes. Não foram adicionadas afirmações comerciais nem garantias de resultado.

## Validações

| Validação | Resultado |
|---|---|
| `npm run verify` | 37/37 gates aprovados |
| Testes unitários | 56 arquivos; 930 testes aprovados |
| `npm run build` | aprovado; 403 URLs no sitemap |
| Snapshots SSR | 485 HTMLs gerados |
| Governança editorial pós-build | 108/108 artigos indexáveis aprovados |
| `npm run deploy:check` | 38/38 gates aprovados |
| `git diff --check` | aprovado |

## Estado de publicação

Esta rodada prepara código e validações para revisão via PR. O domínio público não deve ser considerado atualizado até que o PR seja mesclado e o deploy conectado seja confirmado.
