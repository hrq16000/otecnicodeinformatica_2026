# Windows 11 — guia decisório reconstruído em 31/10/2026

Continuação da issue #397 e do PR #398. Conteúdo preparado para revisão/promoção editorial, sem merge ou deploy nesta rodada.

## Entrega

A entrada `windows-11-vale-a-pena-atualizar` foi reconstruída diretamente em `blogPostsContentBase`. Não foi criada versão suplementar concorrente, nem rota nova. A data original `2026-01-15`, slug e canonical foram preservados; a revisão material de 31/10 aparece no corpo e no manifesto de fontes.

O guia agora separa suporte, compatibilidade, dependências, desempenho, backup, BitLocker, atualização suportada, validação e retorno. Foram removidas a promessa de intervenção sem risco de perder dados, a vantagem genérica de apps Android e a referência ao fim do suporte do Windows 10 como evento futuro. O texto não oferece comandos destrutivos nem bypass como recomendação padrão.

Cinco perguntas técnicas foram registradas em `windows11MigrationFaq.ts`. O componente visível e a futura geração de FAQPage usam essa mesma lista, sem FAQ comercial genérica.

## Fontes verificadas em 31/10

- https://support.microsoft.com/pt-br/windows/deployment/updates-lifecycle/windows-10-support-has-ended-on-october-14-2025
- https://support.microsoft.com/pt-br/windows/experience/compatibility/windows-11-on-devices-that-don-t-meet-minimum-system-requirements
- https://support.microsoft.com/pt-br/windows/deployment/install-upgrade/upgrade-to-windows-11-faq
- https://support.microsoft.com/pt-br/windows/deployment/install-upgrade/ways-to-install-windows-11
- https://support.microsoft.com/pt-br/windows/deployment/install-upgrade/go-back-to-the-previous-version-of-windows

Também foi reutilizada a fonte oficial já registrada `ms-bitlocker-backup-key`. Nenhum prazo de ESU ou preço novo foi fixado no guia: o leitor é orientado a conferir o programa correspondente e sua elegibilidade.

## Validação executada

- Testes unitários: 50 arquivos, 889/889 aprovados, incluindo quatro testes específicos do guia.
- Leitor editorial/fontes: 7/7 aprovados.
- Gate de revisão técnica: aprovado.
- Gate de intenção: aprovado; as 47 pontes anteriores seguem válidas.
- Links internos: nenhum quebrado.
- Inventário de afirmações regenerado pelo comando oficial e `check:afirmacoes` aprovado; 272 classificações preservadas.
- Build direto Vite, cliente e SSR: aprovado.
- `git diff --check`: aprovado.

## Limites e publicação

O artigo continua **não aprovado para indexação**. Um teste garante que a revisão de conteúdo não o promova automaticamente. FAQPage permanece desligado enquanto essa aprovação não existir; o novo FAQ visível é testado sem emitir schema prematuramente. Nenhuma inclusão em sitemap foi feita.

Não foram declarados `verify`, `npm run build` com pre/postbuild, `deploy:check`, snapshots SSR ou acessibilidade global aprovados. Bun não está disponível localmente e os testes de integração remotos não foram reexecutados nesta rodada. Compilação SSR não comprova paridade de todos os schemas no HTML servido.

Faltam os requisitos de promoção editorial (incluindo capa/proveniência e ownership quando exigidos), revisão de Article/Breadcrumb/FAQPage no HTML SSR e gates globais sobre a base técnica atual. Até isso ocorrer, o PR deve permanecer rascunho e o domínio não deve ser apresentado como atualizado.

## Fila seguinte

Hardware/SMART → produtividade/migração de arquivos → redes/SSID ausente → segurança/lacunas reais de recuperação MFA. Não abrir rotas duplicadas para esses temas e não reescrever conteúdo já concluído sem uma lacuna demonstrada.
