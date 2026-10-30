# Fechamento de fontes MSI e Seagate — 29/10/2026

Continuação da issue #397 e do PR #398. Sem merge ou deploy nesta rodada.

## Resultado

Revisão das sete URLs anteriormente bloqueadas concluída. As seis classificações anteriores foram mantidas e o host exato `download-2.msi.com` foi classificado após inspeção local do documento. Não foi utilizado wildcard nem removida a checagem de domínio.

## Evidência do manual MSI

URL: https://download-2.msi.com/archive/mnu_exe/mb/H610TI-S03_H610TI-S01.pdf

- download oficial: 10.596.391 bytes;
- 250 páginas, PDF 1.4, sem criptografia e sem JavaScript segundo `pdfinfo`;
- SHA-256: `a19d98fb54cb6e166cd548fef0becd16633ddbd8fcf3f5f66a9d305e6bfa2789`;
- seção JFP1: página impressa 17, página física 19 do PDF;
- texto extraído por Poppler e página renderizada e inspecionada visualmente;
- diagrama identifica Power Switch, Reset Switch, Power LED, HDD LED e pino reservado; os sinais de polaridade estão nos LEDs;
- evidência sustenta as afirmações já cadastradas, sem generalizar o pinout para outro modelo.

O uso da skill de PDF permitiu conferir o diagrama, não apenas a ocorrência textual de JFP1.

## Seagate

Substituídas apenas as referências externas regionais por suas versões globais oficiais. As URLs públicas do portal não foram alteradas. Datas de acesso atualizadas para 2026-10-29.

Todos os três destinos responderam HTTP 200 por curl com acompanhamento de redirects:

- https://www.seagate.com/support/kb/the-bios-does-not-detect-or-recognize-the-ata-sata-hard-drive-168595en/
- https://www.seagate.com/support/kb/the-bios-does-not-detect-or-recognize-the-solid-state-drive-005707en/
- https://www.seagate.com/support/kb/what-should-i-do-for-a-noisy-disk-drive-193731en/

O navegador de pesquisa apresentou intermitência de redirects inclusive no artigo global sobre SSD; o download direto retornou HTTP 200 e confirmou o corpo do artigo. A checagem é evidência desta data, não promessa de disponibilidade futura de serviço externo.

## Validação

- `check:editorial-technical-review`: aprovado;
- `check:content-intent`: aprovado;
- testes do leitor e fontes: 7/7 aprovados;
- testes unitários: 49 arquivos, 885/885 aprovados;
- `git diff --check`: aprovado.

Não houve alteração de artigos, FAQs, JSON-LD, preços, canonicals ou indexabilidade nesta micro-rodada. O build completo e `deploy:check` não foram reexecutados; os resultados globais anteriores não foram apresentados como aprovação deste conjunto.

## Próximas etapas

Recuperar ou reconstruir o guia Windows 11 e executar a validação global sobre a base técnica atual antes de considerar merge ou publicação. As 47 pontes corrigidas na rodada anterior continuam cobertas pelo teste do catálogo real.
