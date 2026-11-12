# Cobertura editorial GSC — marco de 100% operacional

Data de referência: 2026-10-01  
Propriedade: `sc-domain:otecnicodeinformatica.com.br`  
Janela GSC consolidada: `2026-04-01 → 2026-09-28`

## Objetivo deste documento

Registrar o fechamento da rodada de enriquecimento editorial orientada por GSC para evitar recomeçar auditorias já concluídas.

A definição de **100% operacional** usada aqui é:

- todas as páginas de blog com sinal real na janela GSC estão registradas como aprovadas;
- todas passaram por revisão técnica;
- todas estão fact-checkadas;
- páginas com lacuna editorial real receberam suplemento rico;
- páginas já fortes no conteúdo-base não foram reescritas apenas para inflar métrica;
- nenhuma query foi inventada;
- indexação final e ranking continuam sob decisão do Google.

## Resultado consolidado

- Páginas de blog com sinal no GSC: **60**
- Aprovadas no registry editorial: **60/60**
- Revisadas tecnicamente: **60/60**
- Fact-checkadas: **60/60**
- Com suplemento rico em `blogSupplementalPosts.tsx`: **53**
- Sem suplemento, mas já revisadas/fact-checkadas no conteúdo-base: **7**
- Lacunas editoriais reais restantes dentro do conjunto qualificado: **0**

## Páginas sem suplemento que NÃO são lacunas

Estas páginas permanecem sem uma entrada em `blogSupplementalPosts.tsx` porque o conteúdo-base já foi reescrito/revisado recentemente e não há justificativa editorial para duplicar a camada:

1. `como-conectar-wifi-tv-nao-conecta`
   - revisão/fact-check: 2026-09-29
   - GSC: 413 impressões, posição média ~9,19
   - conteúdo reorganizado por sintoma, com comparações controladas e fonte oficial.

2. `curto-circuito-placa-mae-como-identificar`
   - revisão/fact-check: 2026-09-29
   - GSC: 31 impressões, posição média ~7,94
   - conteúdo trata desligamento como sintoma, não prova; comparação controlada e critérios de parada.

3. `como-fazer-upgrade-ssd-nvme`
   - revisão/fact-check: 2026-09-29
   - GSC: 29 impressões, posição média ~8,28
   - fontes NVM Express e Microsoft; separa M.2, protocolo, clonagem, instalação limpa e BitLocker.

4. `como-testar-fonte-de-alimentacao-pc`
   - revisão/fact-check: 2026-09-29
   - GSC: 23 impressões, posição média ~7,61
   - remove teste energizado como checklist doméstico; prioriza substituição controlada e critérios de parada.

5. `windows-11-lento-como-resolver`
   - revisão/fact-check: 2026-09-29
   - GSC: 18 impressões, posição média 7
   - diagnóstico por contexto, sem limiares arbitrários; fontes oficiais Microsoft.

6. `webcam-usb-nao-e-detectada`
   - revisão/fact-check: 2026-09-29
   - GSC: 16 impressões, posição média ~9,31
   - separa enumeração, captura e permissão; teste cruzado e fonte Microsoft.

7. `como-proteger-computador-golpes-internet`
   - revisão/fact-check: 2026-09-12
   - GSC: 2 impressões, posição média 5,5
   - matriz de exposição, resposta proporcional e fontes CERT.br/Microsoft.

## Estado técnico da última rodada

Último merge editorial da missão:

- PR #331 — `SEO: aprofundar BIOS/UEFI pelo GSC`
- merge SHA: `667e4a1cd76507faa2d34c599985a77d37d5587a`

A última owner com query individual real ainda sem suplemento era:

- `/blog/como-configurar-bios-uefi-corretamente`
- query exposta: `uefi`
- 2 impressões
- posição média 58,5

Ela foi enriquecida com baseline, UEFI/Legacy, Secure Boot, TPM, BitLocker, armazenamento, firmware, rollback e critérios de parada.

## Regra daqui para frente

Não reabrir a missão como “auditar tudo do zero”.

Próximas rodadas devem partir do estado consolidado acima e focar em:

1. novas queries e novas páginas que apareçam no GSC;
2. páginas com crescimento de impressões sem cliques;
3. CTR, snippet, title e alinhamento de intenção;
4. interlinking e descoberta;
5. freshness quando existir mudança técnica relevante;
6. novas páginas somente quando houver intenção real e conteúdo original suficiente.

## Limite da afirmação de 100%

Este marco significa **100% das páginas de blog atualmente qualificadas por sinal real no GSC revisadas, aprovadas e fact-checkadas dentro da missão editorial**.

Não significa:

- garantia de 100% de inclusão no índice do Google;
- garantia de primeira posição;
- necessidade de converter toda página em suplemento;
- autorização para indexar conteúdo fraco, duplicado ou sem evidência.
