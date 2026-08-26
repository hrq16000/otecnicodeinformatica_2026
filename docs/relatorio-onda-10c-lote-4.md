# Onda 10C — Lote 4 (Clusters 9 e 10)

**Data:** 2026-08-26 · **Estado:** `10C_LOTE_4 = CLOSED` · **Próximo passo:** observação; nenhum cluster novo sem aprovação.

## Fase 0 — monitor do Lote 3

`npm run monitor:editorial-waves` executado antes da produção. As 6 URLs do Lote 3 estão
registradas com estado interno `PUBLISHED` e estado de busca `NO_DATA` (publicação recente).
Nenhum alerta de severidade acima de INFO. Sem evidência de indexação, nada foi alterado nas
páginas do Lote 3.

## Escopo

- Cluster 9 — **Webcam não funciona**.
- Cluster 10 — **Windows Update**.

## Auditoria de owners (antes de criar URL)

| Tema candidato | Owner já existente | Decisão |
| --- | --- | --- |
| Webcam (qualquer intenção) | — nenhum owner no acervo | **3 novas URLs** |
| Privacidade/permissões do Windows | menções esporádicas em artigos gerais | **Nova URL** (satélite dedicado) |
| Windows Update (qualquer intenção) | — nenhum owner no acervo | **3 novas URLs** |
| Tela azul após atualização | `/blog/como-resolver-tela-azul-windows` | Mantido — apenas referenciado |
| Limpeza de temporários | `/blog/limpar-arquivos-temporarios-windows` | Mantido — cache do Update é outro objeto |

## URLs publicadas

| URL | Papel | Consultas-alvo declaradas |
| --- | --- | --- |
| `/blog/webcam-nao-funciona-o-que-verificar` | pilar (cluster 9) | webcam não funciona · câmera do notebook não funciona · windows não encontra webcam |
| `/blog/permissoes-de-camera-no-windows` | satélite | permissões de câmera windows · câmera bloqueada pelo sistema · aplicativo não acessa a câmera |
| `/blog/webcam-usb-nao-e-detectada` | satélite | webcam usb não detectada · dispositivo desconhecido ao conectar câmera · driver de webcam usb |
| `/blog/windows-update-nao-funciona-o-que-verificar` | pilar (cluster 10) | windows update não funciona · windows não atualiza · erro no windows update |
| `/blog/limpar-cache-do-windows-update-softwaredistribution` | satélite | limpar cache do windows update · pasta softwaredistribution · reparar componentes do windows update |
| `/blog/windows-update-travado-desfazendo-alteracoes` | satélite | atualização do windows travada · desfazendo alterações windows · download em 0% |

Todas com resposta curta, tabela diagnóstica, seção "Quando chamar um técnico", FAQ própria
(5–6 perguntas), interlinking interno e CTA apenas pela triagem central (sem `wa.me` no editorial).

## Regras de segurança publicadas

1. **Nada de hack de registro** para "liberar" câmera bloqueada. Permissão é decisão de
   privacidade e se resolve nas quatro camadas do próprio sistema (dispositivo, aplicativos,
   aplicativo individual e programas de área de trabalho) e nas permissões por site.
2. **Nada de desativar serviços do Windows Update**, inclusive o serviço de reparo do Update.
   Desativar esconde o sintoma e remove correções de segurança.
3. **Cache do Update é tratado por renomeação reversível**, com os serviços parados — nunca por
   exclusão como primeiro passo. Scripts prontos de reset de origem desconhecida são recusados.
4. **Não reiniciar durante a fase de instalação**; desligamento forçado só após horas sem
   qualquer atividade, com ressalva explícita de risco.

Os testes `nenhuma página do lote recomenda hack de registro ou desativar o Windows Update` e
`o cache do Update é tratado por renomeação reversível, não por exclusão` travam essas regras no
HTML servido.

## Imagens

Seis capas de fotografia real, licenciadas, do Wikimedia Commons (zero IA), com variantes
WebP/AVIF e proveniência registrada:

| Slug | Autor | Licença |
| --- | --- | --- |
| webcam-nao-funciona-o-que-verificar | Sushiflinger | CC BY-SA 3.0 |
| permissoes-de-camera-no-windows | Santeri Viinamäki | CC BY-SA 4.0 |
| webcam-usb-nao-e-detectada | WrS.tm.pl | CC0 |
| windows-update-nao-funciona-o-que-verificar | Dion Dresschers | Domínio público |
| limpar-cache-do-windows-update-softwaredistribution | Wikipedian5122024 | Domínio público |
| windows-update-travado-desfazendo-alteracoes | PantheraLeo1359531 | Domínio público |

## Arquivos tocados

`src/data/blogPostsContent.tsx` · `src/lib/blogEditorialRegistry.ts` (bloco `WAVE_10G`) ·
`src/lib/blogEditorialSources.ts` · `src/lib/blogEditorialCovers.ts` ·
`src/lib/editorialWavesRegistry.ts` (`WAVE_10C_BATCH_4`) · `scripts/lib/editorial-wave.mjs` ·
`src/components/BlogPostFAQ.tsx` · `src/lib/editorialInboundLinks.ts` ·
`scripts/fetch-editorial-cover-4x.mjs` · `e2e/onda-10c-lote4.spec.ts` ·
sitemaps e `public/llms.txt` regerados.

## Validação

| Gate | Resultado |
| --- | --- |
| `monitor:editorial-waves` (Fase 0) | ✔ Lote 3 PUBLISHED / NO_DATA, sem alerta acima de INFO |
| `check:editorial-cannibalization` (6 candidatos, pré-publicação) | ✔ sem colisão (teto 0.40) |
| `check:editorial-assets` | 22 assets · PASS 22 · FAIL 0 |
| `check:editorial-governance` | ✔ 60 aprovados em paridade, sem data futura, sitemap 182 URLs |
| `check:editorial-technical-review` | ✔ aprovado |
| `check:editorial-no-direct-wa` | ✔ 0 violações |
| `check:editorial-export-secrets` | ✔ 7 artefatos sem segredo |
| `tsgo --noEmit` | ✔ sem erros |
| `e2e/onda-10c-lote4.spec.ts` | 44/44 |
| `e2e/onda-10c-infra.spec.ts` (registry completo) | 88/88 |

## Correções colaterais

- Link interno `/servicos/backup-de-dados` (inexistente) substituído por
  `/servicos/backup-para-empresas` em todo o conteúdo editorial.
- Datas dos Lotes 3 e 4 normalizadas para 2026-08-26 (o gate rejeita data futura).

## Observação

Sem novas rotas fora de `/blog`. Nenhuma página existente foi removida ou reescrita.
Avanço para novos clusters permanece bloqueado até aprovação explícita.
