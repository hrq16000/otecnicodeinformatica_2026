# Rodada 5B — Autoridade externa, entidade e descoberta

CONTENT em FREEZE: nenhuma URL nova, nenhum artigo novo.

## 1. Auditoria off-page (Semrush)

- 187 backlinks / 108 domínios referenciadores.
- Authority Score 2/100.
- Perfil dominado por diretórios automáticos e agregadores de baixa qualidade.
- Âncoras concentradas em URL nua e nome da marca — sem âncoras editoriais temáticas.

Conclusão: não há sinal editorial legítimo ainda. A prioridade não é volume de links,
e sim citações consistentes de entidade (NAP sem telefone visível) e menções editoriais.

## 2. Descoberta (Search Console, 30 dias)

- 198 impressões · 4 cliques.
- Consultas emergentes de cauda longa: notebook, wi-fi, vírus.
- Portas de entrada: home e cluster de Wi-Fi no blog.

## 3. Gate anti-imagem de IA

- `scripts/check-ai-images.mjs`: detecta assinaturas de IA em metadados
  (Midjourney, DALL·E, GPT-4o/C2PA `trainedAlgorithmicMedia`), padrões de nome
  e arquivos suspeitos (<8 KB).
- `config/ai-images-baseline.json`: 26 imagens herdadas registradas como dívida
  técnica — o build passa, mas qualquer imagem nova com assinatura de IA falha.
- Registrado como `npm run check:ai-images` e no job de CI, após o gate de
  privacidade de fotos.

## 4. Triagem: deep link, persistência e mensagem do WhatsApp

- `#agendamento` e `#triagem` abrem o modal já na etapa correta.
- Após recarregar, o estado persistido (`triage_state`) devolve serviço, sintoma,
  equipamento e localidade, e o modal reabre adiante da primeira etapa.
- Mensagem final montada com serviço, sintoma, bairro, rota de origem e UTM;
  fallback pergunta o bairro quando a geolocalização é negada.

### Cobertura E2E — `e2e/triagem-deeplink-mensagem.spec.ts` (5/5 verde)

1. `#agendamento` abre na etapa inicial.
2. `#triagem` abre na etapa inicial.
3. Recarregar preserva equipamento, sintoma e localidade.
4. Mensagem final contém serviço, sintoma, localidade e origem.
5. Fallback de bairro sem geo/IP mantém a mensagem completa.

A captura da URL final é feita por `window.open` e por interceptação de clique em
âncora `wa.me`, o que evita navegação externa no teste e mantém o contrato sem PII.

## 5. Próximo passo por evidência

Aguardar novo ciclo do Search Console antes de qualquer expansão de conteúdo;
substituir progressivamente as 26 imagens do baseline por fotografia real licenciada.
