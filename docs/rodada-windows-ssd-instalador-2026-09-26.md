# Rodada Windows — SSD ausente no instalador

**Data:** 26 de setembro de 2026  
**Issue:** [#68 — Editorial: SSD não aparece no instalador do Windows](https://github.com/hrq16000/otecnicodeinformatica_2026/issues/68)

## Objetivo

Publicar um guia original para a intenção específica “SSD aparece no firmware,
mas não aparece na seleção de disco do instalador do Windows”, sem conflitar
com o conteúdo sobre SSD ausente no Gerenciamento de Disco depois que o Windows
já iniciou.

## Entrega editorial

- Nova URL: `/blog/ssd-nao-aparece-no-instalador-do-windows`.
- Diagnóstico começa pela confirmação no BIOS/UEFI.
- O carregamento do driver oficial de armazenamento é apresentado antes de
  qualquer mudança de modo SATA/VMD/RST/RAID.
- `diskpart` é usado primeiro apenas para leitura e identificação.
- Limites explícitos protegem dados e instalações existentes, inclusive quando
  há BitLocker.
- Serviço relacionado aparece somente no fim, depois do caminho autônomo.
- Cinco perguntas visíveis em paridade com `FAQPage`.
- Capa real licenciada, com variantes JPG, WebP e AVIF.

## Fontes primárias

- Microsoft Learn — Install a Boot-Start Driver:
  https://learn.microsoft.com/windows-hardware/drivers/install/installing-a-boot-start-driver
- Microsoft Support — Find your BitLocker recovery key:
  https://support.microsoft.com/windows/find-your-bitlocker-recovery-key-6b71ad27-0b89-ea08-f143-056f5ab347d6
- Microsoft Support — Create installation media for Windows:
  https://support.microsoft.com/windows/create-installation-media-for-windows-99a58364-8c02-206f-aa6f-40c3b507420d
- NVM Express — FAQ:
  https://nvmexpress.org/education/faqs/

## Integrações

- Registro editorial, fontes, capa, onda e interlinks atualizados.
- Entidade SSD conectada ao novo guia.
- Sitemap editorial e arquivos `llms.txt` regenerados pelo build.
- Dados estruturados `BlogPosting`, `TechArticle`, `BreadcrumbList` e
  `FAQPage` presentes no SSR.
- Nenhum slug ou canonical existente foi alterado.

## Validações

| Validação | Resultado |
| --- | --- |
| `npm run verify` | aprovado — 36/36 passos e 872 testes |
| `npm run build` | aprovado — cliente e SSR gerados |
| `npm run deploy:check` | aprovado — 37/37 passos |
| JSON-LD | aprovado — 279 HTMLs, 1.892 blocos, zero erro |
| Paridade FAQ | aprovado — 1.657 perguntas em 302 blocos, paridade 1:1 |
| Ativos editoriais | aprovado — 62/62 |
| Links, órfãs, rotas e anti-canibalização | aprovados |
| `npm run test:a11y` | bloqueado pelo ambiente: executável Chromium do Playwright ausente |
| `git diff --check` | aprovado |

O bloqueio de acessibilidade é de infraestrutura local: as 52 tentativas
falharam antes de abrir a página, ao iniciar o Chromium inexistente. Não houve
falha de regra de acessibilidade atribuída à aplicação.

## Publicação

O código só deve ser mesclado após os checks relevantes do PR. O domínio
público ainda servia o build `08ad9da`, de 26 de setembro de 2026 às 05:11:51Z,
na verificação desta rodada; portanto, build local e GitHub não são apresentados
como deploy público.
