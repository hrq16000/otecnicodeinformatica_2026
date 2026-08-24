# Micro-Rodada Enriquecimento de Conteúdo 3 — Acervo editorial

Escopo: aprofundar artigos editoriais **já existentes e indexáveis**.
Nenhuma URL nova, nenhum artigo novo, nenhuma alteração de política de indexação.
Rodada 9C **não** foi iniciada.

## Fase 1 — Inventário editorial real

Universo auditado: `APPROVED_EDITORIAL_CONTENT` (`src/lib/blogEditorialRegistry.ts`) —
**35 artigos indexáveis** (FIRST_WAVE + ondas 4X a 5I, 8E e 9B).
Corpo dos textos em `src/data/blogPostsContent.tsx`.

## Fase 2 — FROZEN_URLS (excluídos por observação ativa)

| URL | Motivo |
| --- | --- |
| /blog/o-que-e-informatica | Pilar 9B em baseline |
| /blog/informatica-basica | Pilar 9B em baseline |
| /blog/como-aprender-informatica | Pilar 9B em baseline |
| /blog/como-resolver-tela-azul-windows | Coorte Discovery em observação |
| /blog/como-formatar-pc-sem-perder-arquivos | Cluster 1 (8E) em observação |
| /blog/quanto-custa-formatar-um-computador | Cluster 1 (8E) em observação |

## Fase 3–4 — Auditoria de qualidade

Métricas objetivas extraídas do código-fonte (palavras úteis, H2/H3, presença de
resposta rápida, tabela diagnóstica, fontes visíveis, links internos, blocos de
erros comuns e de limites). Déficit dominante no acervo não congelado:
ausência de resposta rápida, ausência de tabela causa→sintoma→teste,
ausência de árvore de decisão e de limites de segurança explícitos.

## Fase 5 — Seleção (6 artigos, maior déficit real)

| Slug | Palavras antes | Palavras depois | Déficit corrigido |
| --- | --- | --- | --- |
| como-saber-quem-esta-usando-meu-wifi | 687 | 1393 | resposta rápida, tabela, decisão, limites, fontes |
| backup-como-proteger-seus-arquivos | 747 | 1320 | resposta rápida, tabela de risco×cópia, decisão, limites |
| como-saber-se-pc-tem-virus-malware | 748 | 1299 | resposta rápida, tabela sintoma→causa→verificação, decisão |
| backup-nuvem-empresas-qual-escolher | 749 | 1318 | resposta rápida, tabela critério→pergunta→evidência, fontes |
| quando-trocar-hd-por-ssd | 751 | 1360 | resposta rápida, tabela de gargalo, decisão, fontes |
| como-configurar-roteador-wifi-iniciantes | 790 | 1411 | resposta rápida, tabela ajuste→motivo→verificação, fontes |

Intenções distintas entre si (redes/diagnóstico, redes/configuração, dados
domésticos, dados empresariais, segurança/diagnóstico, hardware/decisão) —
sem sobreposição declarada em `src/lib/contentIntentMap.ts`.

## Fases 7–31 — Enriquecimento material aplicado

Em cada um dos 6 artigos:

1. **Resposta rápida** (2–5 frases, logo após o parágrafo de abertura).
2. **Tabela diagnóstica** no eixo causa → sintoma → teste (variação por tema:
   risco→cópia, critério→evidência, ajuste→verificação).
3. **Árvore de decisão** em 5 passos, encerrando em ação verificável.
4. **Erros comuns** — 5 itens por artigo, específicos do tema.
5. **Limites de segurança** — o que o procedimento não garante, o que pode
   causar perda de dados e quando parar.
6. **Glossário curto** dos termos que o leitor encontra no painel/compra/contrato.
7. **Ponte comercial** para Curitiba / região metropolitana, uma por artigo,
   apontando para o serviço correspondente (sem preço no corpo editorial).

## Fases 32–51 — Governança, fontes e schema

- **Fontes primárias visíveis**: adicionadas ao manifesto
  `src/lib/blogEditorialSources.ts` duas fontes oficiais novas
  (`wifi-alliance-security`, `ms-optimize-drives`) e vinculadas aos 4 artigos
  que estavam com `sources: []`. Todos os hosts já constam de
  `ALLOWED_SOURCE_HOSTS`; nenhuma fonte inventada.
- **`EditorialReferences`** passa a renderizar bloco visível "Fontes e
  referências técnicas" nos 6 artigos.
- **FAQ**: nenhuma FAQ nova foi criada; a regra "FAQ visível = FAQPage" segue
  intacta (nenhum `FAQPage` adicionado).
- **Schema**: sem alteração de emissão. O artigo continua servido pelo sink
  único de JSON-LD do `__root`, com `BlogPosting/Article` condicionado ao
  registro editorial fail-closed.
- **TOC**: os novos H2 entram automaticamente em `buildArticleToc`, validado no
  HTML servido.

## Fases 52–63 — Validação

| Verificação | Resultado |
| --- | --- |
| `tsgo --noEmit` | sem erros |
| Vitest (suíte completa) | **719 testes, 36 arquivos — PASS** |
| `check:editorial-technical-review` | aprovado |
| `check:content-intent` | 7 URLs, 7 pares tema×intenção únicos, 0 sobreposição |
| `check:cannibalization` | 0 canibalização P0 (apenas 2 avisos pré-existentes) |
| SSR real (`/blog/quando-trocar-hd-por-ssd`) | Resposta rápida, Árvore de decisão, Erros comuns, Limites de segurança e Fontes presentes no HTML servido, com entradas no TOC |

## O que NÃO foi feito (por regra da rodada)

- Nenhum artigo novo e nenhuma URL nova.
- Nenhuma alteração nos pilares 9B, na coorte Discovery ou no Cluster 1 (8E).
- Nenhuma alteração nas páginas dos Enriquecimentos 1 e 2 nem da Local 2.
- Nenhuma página programática criada.
- Rodada 9C não iniciada.

## Próximo passo sugerido

Publicar e reobservar no Search Console. Só após evidência de clique/impressão
nos 6 artigos enriquecidos faz sentido decidir sobre a próxima onda editorial.
