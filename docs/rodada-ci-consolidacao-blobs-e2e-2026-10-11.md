# Rodada CI — consolidação recursiva dos blobs E2E

Data: 11 de outubro de 2026

Issue: #379

Base: PR #370

## Problema confirmado

Os artefatos `playwright-blob-*` existiam, mas cada ZIP de relatório era
baixado dentro de uma subpasta por navegador e shard, por exemplo:

```text
all-blob-reports/chromium-3/report-3.zip
```

O `playwright merge-reports` recebeu `all-blob-reports` e procurou relatórios
somente nesse nível. Por isso encerrou com `No report files found`, criando uma
falha secundária no job observacional apesar dos artefatos válidos.

## Correção

- os ZIPs são localizados recursivamente;
- hard links com nomes únicos são reunidos em `playwright-blob-flat`, sem
  duplicar os artefatos grandes no disco do runner;
- HTML, JSON e inventário usam a pasta plana;
- se nenhum blob existir, o job registra um inventário explicativo e não cria
  uma falha sem relação com o gate bloqueante anterior.

## Escopo preservado

- nenhum resultado original de shard é convertido em sucesso;
- nenhum threshold de desempenho, segurança, editorial ou acessibilidade foi
  alterado;
- conteúdo, URL, canonical, sitemap e indexabilidade não foram modificados.

## Validação

- estrutura real de um artefato da execução `38117650843` inspecionada;
- preparação recursiva reproduzida localmente;
- caminho com blobs e caminho sem blobs validados;
- YAML parseado;
- `git diff --check` aprovado.
