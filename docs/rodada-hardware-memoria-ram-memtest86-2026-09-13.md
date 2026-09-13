# Rodada editorial — Hardware: memória RAM e Memtest86+

Data: 2026-09-13  
Issue: #26  
Rota preservada: `/blog/testar-memoria-ram-memtest86`

## Objetivo

Aprofundar o guia aprovado de teste de memória RAM para que o leitor consiga detectar instabilidade e isolar módulo, slot e configuração sem transformar um resultado de software em condenação automática de peça.

## Arquivos editoriais analisados

- `src/data/blogPostsContent.tsx`
- `src/components/BlogPostFAQ.tsx`
- `src/lib/blogEditorialRegistry.ts`
- `src/lib/blogEditorialSources.ts`

## Inconsistências encontradas

- O texto dizia que um único erro era, por si só, “defeito”, sem separar módulo, slot, configuração, controladora, processador e placa-mãe.
- O resultado sem erros era apresentado como quase conclusivo, sem delimitar falhas intermitentes e condições não reproduzidas.
- A recomendação de quantidade fixa de passagens não priorizava registro e controle de variáveis.
- O guia não possuía fontes técnicas visíveis nem FAQ específica, usando a FAQ comercial genérica.
- O resumo prometia indicar qual módulo trocar antes do isolamento técnico.

## Correções realizadas

- Reescrita da resposta curta para distinguir detecção de instabilidade de identificação da peça.
- Preparação segura com backup, registro do firmware, linha de base sem XMP/EXPO e identificação de módulos e slots.
- Protocolo cruzado: cada módulo no mesmo slot de referência e módulo aprovado nos demais slots.
- Interpretação separada para falha por módulo, slot, combinação, perfil e aquecimento.
- Limites explícitos de um teste sem erros e critérios para interromper a manipulação.
- Cinco perguntas técnicas específicas, sem preço ou promessa, com `FAQPage` em paridade com o conteúdo visível.
- Fontes oficiais visíveis do projeto Memtest86+.
- CTA mantido somente após orientação, limites e fontes.
- Datas de revisão e checagem atualizadas para 2026-09-13.

## Fontes consultadas

- Memtest86+ — README and troubleshooting: `https://memtest.org/readme`
- Memtest86+ — The Open-Source Memory Testing Tool: `https://memtest.org/`

As fontes sustentam o caráter independente do testador, a compatibilidade BIOS/UEFI, a distinção entre Memtest86+ e MemTest86 e o limite de atribuir todo erro exclusivamente ao módulo de RAM.

## Validações

| Validação | Resultado |
|---|---|
| `npm ci` | Aprovado; 1.028 pacotes instalados pelo lockfile. |
| `npm run build` | Aprovado após disponibilizar `bun` somente no ambiente transitório. Build cliente e servidor gerado; servidor em `dist/server/index.mjs`. |
| `node scripts/prerender-blog.mjs` | Aprovado; 78 artigos e a página inicial renderizados. |
| `node scripts/validate-jsonld-static.mjs dist/client` | Aprovado; 79 HTMLs, 631 blocos JSON-LD e zero erro. |
| Inspeção do HTML do guia | Aprovada; um `FAQPage`, cinco `Question`, fonte visível e canonical correto. |
| `npm run report:problem-intent` | Aprovado; pré-requisito ausente em clone limpo foi regenerado somente em `reports/`. |
| `npm run verify` | Aprovado; 36/36 passos e 863/863 testes. |
| `git diff --check` | Aprovado. |
| URLs, slug e canonical | Preservados; nenhuma rota pública alterada. |
| `npm run deploy:check` | Bloqueado no ambiente local. O pipeline tentou capturar 328 rotas sem servidor em `localhost:8080`; a etapa GEO então interpretou `dist/client` como parte das URLs e parou em 7/37. |
| `npm run preview` | Bloqueado pelo runtime local: `uv_interface_addresses returned Unknown system error 1`. |

## Dívidas herdadas observadas

- O gate de promoção registrou 40 pendências editoriais anteriores, sem nova promoção fora da política.
- O SEO reportou 48 avisos já existentes de comprimento de título ou descrição, sem erro bloqueante.
- O projeto ainda registra 26 imagens de IA herdadas em baseline e 133 imagens sem variante WebP/AVIF; nenhuma nova imagem foi criada nesta rodada.
- O `npm ci` não instala o peer `@testing-library/dom`, necessário a uma suíte; ele foi disponibilizado apenas no ambiente transitório, sem alteração de `package.json` ou lockfile.
- O gate de decisões depende de `reports/problem-intent-map.json`, ausente em clone limpo; o relatório foi regenerado antes da validação final.

## Conclusão editorial

O guia passou a tratar o teste de memória como coleta de evidência e isolamento controlado. Não promete confirmar sozinho uma peça defeituosa, não recomenda compra antes da investigação e mantém o serviço como opção posterior aos limites de diagnóstico doméstico.
