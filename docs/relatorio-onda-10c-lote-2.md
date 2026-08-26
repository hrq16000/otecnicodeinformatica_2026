# Onda 10C — Lote 2 (Clusters 5 e 6: Internet/Wi-Fi e Impressoras)

Data de execução: 2026-08-26
Status: **concluído — PARADO antes do Lote 3**

## 1. Missão

Ampliar autoridade nacional nos clusters de **internet/Wi-Fi** e **impressoras**,
publicando apenas URLs cuja intenção não seja atendida por página existente.
Conteúdo original, imagens reais licenciadas, zero IA.

## 2. Auditoria de donos (antes de escrever)

| Intenção candidata | Dono existente | Veredito |
| --- | --- | --- |
| Melhorar cobertura/posição do Wi-Fi | `/blog/como-melhorar-sinal-wifi-em-casa` | **Rejeitado** (canibalização) |
| Roteador lento / troca de aparelho | cobertura da Onda 4E (`src/lib/enriquecimento4eRedes.ts`) | **Rejeitado** |
| DNS / Cloudflare | cobertura 4E | **Rejeitado** |
| Instalar driver de impressora | `/blog/como-instalar-impressora-windows-passo-a-passo` | **Rejeitado** |
| **Triagem: a lentidão é do provedor ou da rede interna?** | nenhum | **Aprovado** |
| **Impressora aparece offline mesmo ligada** | nenhum | **Aprovado** |
| **Fila de impressão travada / spooler** | nenhum | **Aprovado** |

Como previsto, o cluster de internet gerou **1 URL nova** (triagem de origem) e o
cluster de impressoras gerou **2 URLs novas** — o ganho líquido do lote está mesmo
em impressoras.

## 3. URLs publicadas

| URL | Intenção principal | Palavras | Capa (licença) |
| --- | --- | --- | --- |
| `/blog/internet-lenta-provedor-ou-roteador` | Diagnóstica — origem da lentidão | ~1.900 | ARRIS CM820B, CC BY 4.0 |
| `/blog/impressora-offline-como-resolver` | Corretiva — comunicação/IP | ~1.850 | Dell 1320cn ports, CC BY-SA 2.0 |
| `/blog/fila-de-impressao-travada-spooler-windows` | Procedimental — spooler | ~1.800 | Sharp MX-M465, CC BY-SA 4.0 |

Cada artigo traz: resposta curta citável, tabela diagnóstica (sintoma → causa
provável → teste → decisão), passo a passo, seção "Quando chamar um técnico",
FAQ com 5 perguntas e interlinking contextual.

## 4. Gate anti-canibalização

`scripts/check-editorial-cannibalization.ts` foi executado contra todo o acervo
indexável (`scripts/lib/editorial-wave.mjs` + `CONTENT_INTENT_MAP`).
Sobreposição Jaccard máxima dos três aprovados: **abaixo do teto de 0,40**.
Os quatro candidatos rejeitados acima foram bloqueados pelo próprio gate.

## 5. Correções de infraestrutura descobertas neste lote

1. **FAQPage não existia no SSR.** `BlogPostFAQ` injetava o `<script>` via
   `useEffect`, invisível para crawlers em todo o blog. O schema passou a ser
   construído durante o render e registrado em `SCHEMA_SLOTS.faq`
   (fail-closed mantido: apenas conteúdo aprovado emite FAQPage).
2. **Link interno quebrado (404).** `/servicos/conserto-de-computador` não existe;
   as referências em conteúdo, `contentIntentMap`, `editorialInboundLinks` e
   `editorial-wave.mjs` foram apontadas para `/servicos/manutencao-de-computador`.
3. **Chave duplicada** em `editorialInboundLinks.ts` unificada.

## 6. Gates e vereditos

| Gate | Resultado |
| --- | --- |
| `check:editorial-governance` | ✅ (sitemap curado, sem datas futuras) |
| `check:ai-images` | ✅ (nenhuma assinatura de IA nas capas novas) |
| `check:jsonld-ssr` | ✅ determinístico em isolates frios |
| `check:editorial-cannibalization` | ✅ abaixo de 0,40 |
| Build + SSR | ✅ |
| E2E `onda-10c-lote2-satelites.spec.ts` + Lote 1 | ✅ 40/40 |

## 7. Sitemap

`public/sitemap-editorial.xml`: 49 URLs (46 anteriores + 3 novas).
`public/llms.txt` regenerado.

## 8. Próximo passo

Aguardando aprovação para iniciar o **Lote 3**. Recomenda-se observar a
indexação das 3 URLs no painel `/admin/editorial-ondas` por pelo menos
14 dias antes de expandir.
