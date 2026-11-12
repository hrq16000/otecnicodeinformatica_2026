# Micro-rodada CTR GSC 22–24 — 2026-10-03

## Base

- `main` no início: `943cbf4ec3838358f2dcc92df1f093bd2954810c`
- Branch: `seo/ctr-gsc-snippets-22-24-20261003`
- Escopo: somente metadata de três páginas estáveis e já indexáveis.
- Sem alteração de URL, slug, canonical, robots, sitemap, schema, index policy, conteúdo técnico, CTA ou política comercial.
- Páginas CTR 1–21 permanecem congeladas até nova janela pós-mudança.

## Critério de seleção

O recorte curto 2026-09-03 → 2026-09-30 está dominado por páginas alteradas em 25–30/09. Para não reotimizar conteúdo sem janela pós-mudança suficiente, esta rodada usou um recorte histórico mais longo:

- GSC: `sc-domain:otecnicodeinformatica.com.br`
- tipo: `web`
- janela: **2026-07-01 a 2026-09-29**
- dados consolidados até: **2026-09-29**

Foram explicitamente evitadas:
- páginas CTR 1–21;
- páginas locais recém-enriquecidas;
- `/problemas/wifi-instavel` e `/problemas/arquivos-apagados` (refinadas em 29/09);
- `/problemas/notebook-nao-liga` (refinada em 29/09);
- `/problemas/computador-desliga-sozinho` (refinada em 25–28/09 e com PR antiga #232 ainda aberta);
- páginas com override editorial de 30/09–01/10.

## Evidência GSC

| # | Página | Impressões | Cliques | Posição média |
|---|---|---:|---:|---:|
| 22 | `/equipamentos/desktop` | 3 | 0 | 6,33 |
| 23 | `/equipamentos/impressora` | 3 | 0 | 7,67 |
| 24 | `/glossario` | 2 | 0 | 8,00 |

Consultas por `query` filtradas por cada página retornaram 0 linhas. Nenhuma keyword foi inventada.

## Estabilidade da fonte

- `src/lib/clusterEquipamentos.ts`: sem alteração desde 12/08/2026.
- `src/pages/biblioteca/GlossarioHub.tsx`: sem alteração desde 01/09/2026.
- `ClusterEquipamentoPage` usa diretamente `metaTitle` e `metaDescription` de `clusterEquipamentos.ts`.
- `GlossarioHub` usa diretamente as constantes `TITLE` e `DESCRIPTION` no `PageSEO`.

## Alterações

### 22. Desktop

**Antes**
- Title: `Desktop com problema: falhas e upgrades | O Técnico de Informática`
- Description: `PC que não liga, reinicia sozinho, faz barulho ou ficou lento. Entenda o que cada sintoma indica no desktop, o que checar antes e qual atendimento resolve.`

**Depois**
- Title: `PC ou desktop com problema? Falhas comuns e o que verificar`
- Description: `PC não liga, reinicia, faz barulho ou ficou lento? Veja como separar fonte, memória, armazenamento, vídeo e aquecimento antes de trocar peças por tentativa.`

### 23. Impressora

**Antes**
- Title: `Impressora com problema: instalação e rede | O Técnico de Informática`
- Description: `Impressora que some da rede, não imprime, imprime falhado ou não conecta no Wi-Fi. Veja causas reais, o que checar antes e qual atendimento resolve.`

**Depois**
- Title: `Impressora não imprime ou some da rede? O que verificar`
- Description: `Impressora offline, sem Wi-Fi, sumindo da rede ou imprimindo com falhas? Veja como separar conexão, fila, driver, IP e defeito físico antes de reinstalar tudo.`

### 24. Glossário

**Antes**
- Title: `Glossário Técnico de Informática | O Técnico de Informática`
- Description: `15 termos técnicos explicados sem jargão: BSOD, SMART, TPM, BitLocker, UEFI, DNS, NVMe e mais — com o que é seguro verificar e o que não fazer em cada um.`

**Depois**
- Title: `Glossário de informática: BIOS, UEFI, NVMe, BitLocker e mais`
- Description: `Entenda termos de informática e suporte técnico em linguagem direta: BIOS, UEFI, NVMe, BitLocker, DNS, SMART e BSOD, com verificações seguras e limites.`

## Guardrails

- Nenhum preço, prazo, SLA, disponibilidade ou cobertura foi alterado.
- Nenhuma afirmação sobre a rede nacional de parceiros foi introduzida nesta conversa.
- Nenhuma página local foi tocada.
- Nenhum conteúdo foi removido.
- Nenhuma promoção de indexação foi feita.
