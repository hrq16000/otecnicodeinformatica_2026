# Contratos dos schemas editoriais — 08/11/2026

Continuação da issue #397 / PR #398. Nenhuma nova URL, revisão de conteúdo repetida ou mudança comercial.

## Evidência remota

Consultados check-runs e Actions runs do commit 89216750197e2c477555e4654f0d6424d98fcf9c: nenhuma execução registrada na resposta da API. Isso não equivale a CI aprovado; não se atribuiu uma causa não demonstrada à ausência de execução.

## Lacuna corrigida no diagnóstico

O gate local anterior comparava tipos de schemas, mas retornava apenas título/canonical/robots resumido para confrontar SSR e DOM. Uma alteração simultânea de FAQ visível e FAQPage poderia continuar passando, desde que os tipos fossem iguais.

Extraído um leitor puro de HTML, sem executar scripts nem carregar recursos externos, que agora inclui no resultado o conteúdo completo dos schemas, descrição, H1 e FAQ visível. O gate passa a exigir:

- Canonical, título, descrição, H1 e robots únicos e não vazios.
- Googlebot coerente com a diretiva robots.
- Um único Article e FAQPage para aprovados, ausentes para rascunho.
- BreadcrumbList único e com ID da URL correta.
- Data original e dateModified da revisão material esperadas para cada aprovado.
- Cinco perguntas distintas e todas as respostas em paridade com FAQPage.
- Igualdade completa desses sinais entre o HTML SSR e o DOM após JavaScript.

## Validação real

- Oito testes Node com fixtures locais: aprovados. Casos negativos cobrem duplicação, canonical errado, revisão antiga, robots ausente/conflitante, FAQ divergente, alteração conjunta após JS e promoção indevida de rascunho.
- 19/19 testes editoriais offline: aprovados.
- Lote completo: cinco guias aprovados no diagnóstico local, com dez renders frios, cinco DOMs Chromium e endereço inexistente 404.
- Skill lovable-seo-check aplicada e comparador Python executado nas novas capturas. Persistem apenas links adicionados pelo aviso de privacidade e noindex intencional no Windows 11. Não são tratados como prova de indexação ou falha de publicação.
- Diff sem erros de whitespace.

O Chromium local precisou ser reinstalado para repetir o diagnóstico; o download foi concluído pelo instalador oficial. Usado o bundle já compilado da produção local: só arquivos de testes/diagnóstico/workflow mudaram nesta rodada. Nenhum novo build de aplicação foi necessário ou declarado.

O workflow editorial recebeu a execução dos oito contratos de HTML, sem secrets e sem substituir os gates globais. Não foram repetidos os acessos bloqueados ao backend nem executados verify global ou a suíte unitária ampla. Resultado remoto desse workflow continua pendente.

## Limites

Sem merge, deploy, mudança de DNS ou promoção do Windows 11. As capturas são do worker local com interceptação de assets, não do domínio publicado. Os requisitos globais continuam bloqueantes. PRs #384 e #400 preservados.
