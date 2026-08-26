# Onda 11F — enriquecimento nacional e malha semântica

- `NEW_URLS = 0`
- `NEW_ARTICLES = 0`
- `NEW_SLUGS = 0`
- Commit anterior preservado: `e68f600b`
- Novo commit: `5e6b0993`

## Entrega

O hub de Windows Update recebeu uma camada de diagnóstico por estágio, com interpretação para busca, download e rollback e ligação contextual ao artigo de reversão. A malha existente de impressora/spooler, áudio e webcam já possui owners e links contextuais; o teste dedicado cobre esses caminhos sem criar páginas.

## Segurança editorial

Sem formatação como primeira solução, sem apagar dados, sem desativar proteções do Windows e sem instruções elétricas perigosas. Nenhuma página congelada da 11B, 11D ou 11E foi reescrita.

## Validação

`git diff --check` passou. O Playwright foi preparado para validar H1, conteúdo principal e canonical dos owners da onda; CI permanece fora do escopo.
