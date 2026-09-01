# Relatório — Fase 3: Biblioteca Técnica Consultável

Data: 2026-08-28 · Base: Atlas publicado (Fase 2, commit 76369d1)

## O que foi entregue

### 1. Glossário técnico nacional (`/glossario`)
- 15 termos em `src/lib/glossarioTecnico.ts` (BSOD, UEFI, BIOS, S.M.A.R.T., SSD,
  NVMe, BitLocker, backup incremental, imagem do sistema, recuperação de dados,
  malware, ransomware, phishing, latência, pasta térmica), organizados por
  categoria (sistema, armazenamento, segurança, redes, hardware).
- Cada termo: definição direta, por que importa, sintomas relacionados,
  o que é seguro verificar sozinho, onde parar, e nível de risco visível.
- JSON-LD `DefinedTerm` + `DefinedTermSet` por página, com paridade visível.
- Hub com navegação por categoria e ponte para ferramentas e triagem.

### 2. Ferramentas e checklists (`/ferramentas`)
- 5 roteiros acionáveis em `src/lib/ferramentasTecnicas.ts`:
  `checklist-computador-lento`, `checklist-antes-de-formatar`,
  `roteiro-falha-de-inicializacao`, `verificador-de-backup`, `ssd-ou-ram`.
- Conteúdo 100% acessível sem JavaScript (SSR + espelho estático).
- Passos com nível de risco, critério de parada e fecho contextual para a
  triagem — sem promessa de SLA e sem preço fora de `precosConfig`.

### 3. Malha de interlinks aditiva
- `src/lib/bibliotecaPontes.ts` + `BibliotecaPonte.tsx`: pontes contextuais de
  problemas (8 clusters) e serviços para glossário/ferramentas, e de volta.
- Atlas (`/guia-tecnico-informatica`) ganhou a seção "Biblioteca técnica".
- Snapshot de interlinks atualizado (mudança de 1 âncora, revisada).

### 4. Rotas e infraestrutura
- 22 rotas novas registradas no TanStack Router (`glossario.tsx`,
  `glossario_.$termo.tsx`, `ferramentas.tsx`, `ferramentas_.$slug.tsx`).
- Sitemap curado: 22 URLs adicionadas (`scripts/lib/curated-urls.mjs`).
- Manifesto edge: 212 rotas exatas — slug desconhecido devolve 404 real na
  borda; no SPA, slug inválido renderiza a 404 própria (noindex, sem canonical).
- `RouteProgress.tsx` restaurado (regressão da migração) e tokens de motion
  legados removidos de `src/styles.css`.

### 5. Gate novo — `check:biblioteca`
- `scripts/check-biblioteca-tecnica.ts` no `prebuild`: unicidade de slugs,
  paridade de metadados, integridade dos destinos das pontes, proibição de
  desativação permanente de proteções e de promessas de prazo.

## Correções de qualidade desta rodada

| Item | Categoria | Correção |
|---|---|---|
| Tabelas diagnósticas roláveis sem acesso por teclado | A11y (axe `scrollable-region-focusable`) | `BlocosEnriquecimento.tsx`: região com `role="region"`, `tabIndex={0}` e anel de foco |
| Botões de alternância com contraste insuficiente no estado ativo | A11y (axe `color-contrast`) | `BlocosRedes4e.tsx` e `BlocosB2b4d.tsx`: estado ativo passou a `bg-accent text-accent-foreground` |
| Número fictício `5541999999999` no `public/external-authority.json` | Vazamento de contato | `report-external-authority.mjs` agora exclui arquivos de teste; relatório regenerado |
| Falsos positivos do gate de confiança (mesmo-dia/garantia/filial/CNPJ) | Governança | 7 exceções documentadas em `trust-claims-allowlist.json` + 3 no allow do copy — todas com justificativa real (pergunta de cliente, hedge explícito, CNPJ do cliente) |
| `check:nap` lia a primeira `"name"` crua do HTML (pegava pergunta de FAQ) | Ferramenta de gate | Checker passou a extrair o nome do nó LocalBusiness/Organization do JSON-LD |

## Validação

- **Vitest**: 851/851 testes verdes (46 arquivos).
- **Playwright a11y** (`a11y-rotas-publicas`, agora com 4 rotas da biblioteca):
  28/28 verdes em chromium + mobile.
- **Navegador real**: `/glossario`, `/glossario/bsod`, `/ferramentas`,
  `/ferramentas/checklist-computador-lento`, `/guia-tecnico-informatica` —
  status 200, H1 único, main único, zero erros de console.
- **Gates**: `validate:jsonld` (1440 blocos, 0 erros), `check:biblioteca`,
  `check:copy`, `check:canonical-contact` (0 violações),
  `check:nap --confirm` (6/6 páginas, 0 violações), manifesto edge íntegro.

## Pendências conhecidas (fora do escopo desta fase)

1. **LocalBusiness duplicado** em páginas serviço×cidade e institucionais
   (ex.: `/servicos/pc-gamer/curitiba/`): o schema da página emite um nó
   próprio além do institucional. Latente — só aparece em validação de
   snapshot completo; o CI atual não gera esses HTMLs no `dist/`.
2. **Regex de claims do `check:jsonld-p0`** marca "24 horas" da política de
   cancelamento da FAQ da home como claim de SLA. Falso positivo a tratar
   no próprio gate.
