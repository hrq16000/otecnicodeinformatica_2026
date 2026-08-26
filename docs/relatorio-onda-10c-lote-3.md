# Onda 10C — Lote 3 (Clusters 7 e 8)

**Data:** 2026-08-26 · **Estado:** `10C_LOTE_3 = CLOSED` · **Próximo passo:** aguardar aprovação antes do Lote 4.

## Escopo

- Cluster 7 — **HD/SSD não detectado** (armazenamento).
- Cluster 8 — **Áudio/som não funciona**.

## Auditoria de owners (antes de criar URL)

| Tema candidato | Owner já existente | Decisão |
| --- | --- | --- |
| Recuperação de dados de disco com defeito | `/blog/como-recuperar-dados-hd-com-defeito` | Mantido — não duplicado |
| Ruído mecânico de disco | `/problemas/hd-fazendo-barulho` | Mantido — apenas referenciado |
| Compatibilidade e ganho de NVMe | `/blog/como-fazer-upgrade-ssd-nvme` | Mantido |
| Disco novo que para no Setup | `/blog/troquei-o-ssd-e-o-pc-so-abre-a-bios` | Mantido |
| Sistema não inicia com disco visível | `/blog/erro-no-bootable-device-como-resolver` | Mantido |
| Disco não enumerado na BIOS | — | **Nova URL** (pilar do cluster 7) |
| Disco visível na BIOS e ausente no Windows | — | **Nova URL** |
| SMART e setores defeituosos | — | **Nova URL** |
| Áudio (qualquer intenção) | — nenhum owner no acervo | **3 novas URLs** (cluster 8) |

## URLs publicadas

| URL | Papel | Consultas-alvo declaradas |
| --- | --- | --- |
| `/blog/hd-nao-e-reconhecido-na-bios-o-que-fazer` | pilar (cluster 7) | hd não é reconhecido na bios · disco não aparece no setup · pc não detecta hd sata |
| `/blog/ssd-nvme-nao-aparece-no-gerenciador-de-discos` | satélite | ssd não aparece no windows · disco novo não aparece no explorador · inicializar disco |
| `/blog/disco-com-setores-defeituosos-smart-o-que-fazer` | satélite | setores defeituosos no hd · smart com erro · disco com falha iminente |
| `/blog/computador-sem-som-o-que-verificar` | pilar (cluster 8) | computador sem som · pc não emite som · nenhum dispositivo de saída de áudio |
| `/blog/fone-de-ouvido-nao-e-reconhecido-no-pc` | satélite | fone não é reconhecido · pc não detecta fone na entrada frontal · microfone do headset |
| `/blog/servico-de-audio-do-windows-nao-esta-em-execucao` | satélite | serviço de áudio não está em execução · reiniciar serviço de áudio · driver de áudio |

Todas com: resposta curta, tabela diagnóstica, seção "Quando chamar um técnico", FAQ própria (5 perguntas), interlinking interno e CTA apenas pela triagem central (sem `wa.me` no editorial).

## Regra de segurança de armazenamento (obrigatória)

CHKDSK **não** é recomendação padrão para disco suspeito de falha física. Em mídia com ruído,
SMART crítico, desconexões ou dados sem cópia, a ordem publicada é: parar de usar → copiar o
essencial → imagem bit a bit → investigar → substituir. O texto declara explicitamente quando o
CHKDSK cabe (disco saudável com corrupção lógica) e quando fica fora. O teste E2E
`CHKDSK nunca é recomendação padrão…` valida essa ressalva no HTML servido e impede que os demais
artigos do lote transformem o utilitário em passo padrão.

## Imagens

Seis capas de fotografia real, licenciadas, baixadas do Wikimedia Commons (zero IA), com
variantes WebP/AVIF e proveniência registrada:

| Slug | Autor | Licença |
| --- | --- | --- |
| hd-nao-e-reconhecido-na-bios-o-que-fazer | Dsimic | CC BY-SA 3.0 |
| ssd-nvme-nao-aparece-no-gerenciador-de-discos | Ilya Plekhanov | CC BY-SA 4.0 |
| disco-com-setores-defeituosos-smart-o-que-fazer | Matthew Field | CC BY-SA 3.0 |
| computador-sem-som-o-que-verificar | Shaddack | Domínio público |
| fone-de-ouvido-nao-e-reconhecido-no-pc | Em3rgent0rdr | CC0 |
| servico-de-audio-do-windows-nao-esta-em-execucao | bengt-re | CC BY 2.0 |

## Arquivos tocados

`src/data/blogPostsContent.tsx` · `src/lib/blogEditorialRegistry.ts` (bloco `WAVE_10F`) ·
`src/lib/blogEditorialSources.ts` · `src/lib/blogEditorialCovers.ts` ·
`src/lib/editorialWavesRegistry.ts` (`WAVE_10C_BATCH_3`) · `scripts/lib/editorial-wave.mjs` ·
`src/components/BlogPostFAQ.tsx` · `src/lib/editorialInboundLinks.ts` ·
`scripts/fetch-editorial-cover-4x.mjs` · `e2e/onda-10c-lote3-satelites.spec.ts` ·
sitemaps e `public/llms.txt` regerados.

## Validação

| Gate | Resultado |
| --- | --- |
| `check:editorial-cannibalization` (6 candidatos, pré-publicação) | ✔ sem colisão (teto 0.40) |
| `check:editorial-assets` | 16 assets · PASS 16 · FAIL 0 |
| `check:editorial-technical-review` | ✔ aprovado |
| `check:editorial-no-direct-wa` | ✔ 0 violações |
| `tsgo --noEmit` | ✔ sem erros |
| `e2e/onda-10c-lote3-satelites.spec.ts` | 42/42 |
| `e2e/onda-10c-infra.spec.ts` (registry completo) | 64/64 |

## Observação

Sem novas rotas fora de `/blog`. Nenhuma página existente foi removida ou reescrita; o Lote 4
permanece bloqueado até aprovação explícita.
