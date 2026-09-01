# Atlas de Informática — Fase 2 (2026-09-01)

## Escopo e regra de ouro

Nenhuma URL criada, renomeada ou removida. Canonicals, sitemap, robots,
WhatsApp, preços, bairros e cidades intactos. Tudo é enriquecimento aditivo
sobre páginas existentes, com fail-closed em cada camada nova.

## O que foi feito

1. **Veredito da bancada por tema** (`src/lib/atlasInformatica.ts` +
   `AtlasTrilhas.tsx`): cada um dos nove temas ganhou um posicionamento
   técnico próprio (não-template), renderizado no SSR logo após o resumo.
   Regra: nenhum número inventado — teste bloqueia percentual ou "N em M".
2. **Fontes primárias visíveis por tema** — SOMENTE nos cinco temas cujo
   conteúdo depende de comportamento ou política externa:
   - Windows e inicialização → Microsoft Learn (boot) e Microsoft Support
     (Windows RE);
   - Redes e Wi-Fi → Wi-Fi Alliance (WPA2/WPA3) e CERT.br (Cartilha);
   - Segurança → CISA (ransomware guide), Microsoft Support (golpes de
     falso suporte) e CERT.br;
   - Dados e backup → CERT.br (fascículo Backup) e CISA (backup SMB);
   - Empresas → NIST SP 800-34 e CISA.
   Temas de conhecimento estável (fundamentos, hardware, preventiva,
   decisões) ficam sem fonte, com o limite declarado no bloco institucional
   — o teste bloqueia fonte nesses temas e exige fonte nos externos.
   Todas as URLs foram validadas por requisição real antes da publicação
   (CISA responde 403 a user-agents não navegador; 200 em navegador).
3. **Guias de decisão independentes** (`ATLAS_GUIAS_DECISAO`): os sete
   guias (formatar/reparar, SSD/RAM, consertar/substituir,
   remoto/presencial, HD com ruído, backup antes da manutenção,
   limpeza/pasta térmica) agora têm:
   - âncora própria `#decisao-<id>` (linkável de qualquer página);
   - sinais observáveis dos DOIS lados da decisão (≥3 por lado);
   - nível de risco do vocabulário canônico do bloco institucional
     ("Seguro de fazer sozinho" / "Exige atenção" / "Parada obrigatória"),
     exibido SOMENTE quando o guia envolve procedimento com risco real —
     consertar/substituir e remoto/presencial não exibem risco por serem
     decisões comerciais. HD com ruído é "Parada obrigatória" por definição
     (testado).
4. **Pontes de volta (ida e volta na malha)**:
   - `atlasPontes.ts` ganhou os dois pilares dedicados que estavam fora do
     cluster: `/problemas/computador-lento` e `/problemas/notebook-nao-liga`
     agora renderizam `AtlasPonteProblema` (tema, verificação segura e
     quando parar) antes dos próximos passos.
   - Novo `src/lib/atlasPonteServicos.ts` + `AtlasPonteServico.tsx`:
     seis serviços canônicos (upgrade-ssd-ram, recuperacao-de-dados,
     formatacao, remocao-de-virus, redes-e-wifi, backup-para-empresas)
     ganharam o bloco "Entenda antes de contratar" com texto próprio e
     links para a trilha do tema e para os guias de decisão. Fail-closed:
     serviço sem ponte curada não renderiza nada (testado com
     montagem-de-pc). O bloco é aditivo — não altera preço, escopo, ficha
     comercial nem CTA.

## Gates e testes ampliados

- `scripts/check-atlas-hub.mjs` agora valida no HTML servido (sem JS):
  9 vereditos únicos renderizados, âncora e pergunta de cada guia
  (`#decisao-<id>`), toda fonte primária https como `href` real e níveis
  de risco apenas do vocabulário canônico.
- `src/__tests__/atlas-informatica.test.ts` (14 testes): vereditos únicos
  e sem estatística fabricada; fontes com domínio em allowlist e só nos
  temas externos; guias com dois lados, âncora e risco canônico; pontes de
  serviço com texto próprio >120 chars e resolução fail-closed; pilares
  dedicados com ponte de volta.

## Fontes primárias — política aplicada

Nada foi copiado: as fontes são citadas como referência visível (rel
"noopener nofollow"), cada uma com nota de uso próprio. Nenhum guia orienta
a desativar proteções de forma permanente (aviso preservado no bloco
institucional).

## Registro honesto

- `lastmod` de `/guia-tecnico-informatica` permanece 2026-09-01 (mesma data
  da Fase 1 — a revisão material é do mesmo dia); as páginas de serviço e
  pilares tocados têm fingerprint automático
  (`config/content-fingerprints.json`) que atualiza o lastmod do sitemap
  quando o hash do conteúdo servido muda.
- Indexação não é afirmada; acompanhamento contínuo via GSC.
- Fila futura (Fase 3): expandir vereditos para as páginas de sintoma,
  avaliar âncoras de decisão no mega-menu e novos guias somente com
  intenção distinta comprovada.
