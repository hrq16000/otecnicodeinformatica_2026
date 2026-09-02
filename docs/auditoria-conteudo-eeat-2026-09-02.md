# Auditoria E-E-A-T — pilares, guias de decisão e Guia Técnico (2026-09-02)

Critério: `config/trust-claims-ledger.json` + `scripts/audit-trust-claims.mjs` +
`scripts/audit-conteudo-urls.mjs`, os mesmos que alimentam `/admin/afirmacoes`.
Base: `src/data/trustClaimsAudit.json` e `src/data/auditoriaConteudo.json`
(233 rotas renderizadas em SSR).

## Resumo

Nenhuma afirmação PENDENTE nos três grupos. O risco real está na
**assimetria editorial** entre eles e em lacunas pontuais de fonte primária.

| Grupo | Afirmações a revisar | Fonte primária | Autoria/revisão visível |
| --- | --- | --- | --- |
| Artigos-pilar (`/blog/*`, 64 URLs) | 6 focos | só `/blog` (índice) sem fonte | ausente |
| Guias de decisão (`/decisoes/*`, 10 URLs) | 1 (COMPROVADA) | 100% | ausente |
| Guia Técnico / Atlas | 0 | 5 de 8 temas citavam fonte | presente |

## 1. Artigos-pilar

Pontos de revisão:

- `src/data/blogPostsContent.tsx:2012` — "Equipe especializada desde 1999"
  divergia da fonte única (`FOUNDING_YEAR`, `src/lib/config/eeat.ts:23`).
  **Corrigido nesta rodada**: o ano hardcoded saiu; o texto passou a
  afirmar apenas execução por técnico próprio e garantia conforme o serviço.
- `blogPostsContent.tsx:2259` — ancoragem temporal ("desde 2025") sobre bug de
  terceiro; revisar a cada atualização da KB da Microsoft.
- Blocos repetidos de cidades (`:6231, 6346, 6554, 6669, 6784`) e de suporte
  Linux (`:6903 … :7743`): conferir se o qualificador condicional acompanha
  todas as instâncias, não só a primeira.
- 8 ocorrências de "notificação à ANPD em até 48h" são prazo legal, não
  promessa do portal — falso-positivo do regex; registrar a exceção na família
  `prazo-prometido`.
- CFTV concentra 3 afirmações comerciais com preço fixo (R$ 1.350) no mesmo
  artigo: candidato a data explícita de última revisão de preço.

Alertas técnicos: title longo em
`/blog/erro-no-bootable-device-como-resolver` (87) e
`/blog/windows-update-travado-desfazendo-alteracoes` (78); description longa em
`/blog/impressora-offline-como-resolver` (173).

Oportunidade principal: nenhum artigo do blog exibe `ComoProduzimosConteudo`
(usado só no Atlas e no hub de Problemas) — maior lacuna de autoria visível.

## 2. Guias de decisão

- Única afirmação detectada: `src/lib/guiasDecisao.ts:860` (garantia,
  COMPROVADA, ancorada em `commercial.ts`). Sem ação.
- Fonte primária e limite de segurança: 100% das 10 URLs.
- Lacuna estrutural: `ligacoes.entidade` é `false` nas 10 páginas e
  `ligacoes.decisao` é `false` em 7 — os guias não se costuram entre si nem com
  `/entidades/*`. `ligacoes.ferramenta` falta em `hd-com-ruido` e
  `trocar-componente-ou-reparar`; `ligacoes.problema` falta em
  `atualizar-para-windows-11`, `backup-antes-da-manutencao` e
  `nuvem-ou-hd-externo`.
- Sem bloco de autoria/revisão visível.

## 3. Guia Técnico / Atlas

- Zero afirmações de risco.
- Três temas não citavam fonte própria: `fundamentos`, `hardware-upgrades` e
  `manutencao-preventiva`. **Corrigido nesta rodada** em
  `src/lib/atlasInformatica.ts` (Microsoft Support/Learn, CERT.br, NVM Express,
  JEDEC e NIST SP 800-88), levando o Atlas a 8/8 temas com fonte declarada.
- `/guia-tecnico-informatica` é a única URL com interligação completa
  (ferramenta, decisão, serviço, entidade e problema) — modelo a espelhar.

## Fila recomendada (próxima rodada)

1. Renderizar `ComoProduzimosConteudo` nos artigos-pilar e nos guias de decisão.
2. Criar as pontes `/decisoes/* → /entidades/*` e entre guias.
3. Encurtar os 3 titles/descriptions fora do limite.
4. Registrar a exceção ANPD na família `prazo-prometido` do ledger.

## Evidência de indexação usada nesta auditoria

`src/data/gscSnapshot.json` (gerado por `scripts/report-gsc-snapshot.mjs`,
propriedade `sc-domain:otecnicodeinformatica.com.br`, 2026-08-02 → 2026-08-30):
4 cliques, 730 impressões, 48 páginas com dados. Inspeção de URL: `/`,
`/guia-tecnico-informatica`, `/problemas`, `/servicos/manutencao-de-computador`
e `/blog/o-que-e-informatica` indexadas com canônico coerente;
`/decisoes/consertar-ou-substituir`, `/entidades` e `/glossario` ainda
desconhecidas pelo Google — reforçam a prioridade 1 e 2 acima.
