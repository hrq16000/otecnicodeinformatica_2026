# Produtividade — migração de arquivos — 02/11/2026

Continuação da issue #397 e do PR #398. Revisão da URL existente `/blog/como-migrar-arquivos-para-um-computador-novo`, sem nova rota nem promoção editorial.

## Entrega

Removida a promessa de migrar “sem perder nada”. O roteiro passa a exigir inventário, cópia sem recorte, registro de lotes/erros, testes de trabalho e backup independente antes de autorizar o apagamento da origem. Quantidade e tamanho são triagem, não prova de integridade. Incluído exemplo somente de leitura com Get-FileHash/SHA-256 e limites explícitos: não certifica a completude do inventário nem repara corrupção anterior; não fazer leituras extras em disco com sinais de falha.

OneDrive explicado com itens somente online, conta correta, download e teste offline; exclusão sincronizada não é limpeza local. Aplicativos, licenças, correio e bancos ativos exigem migração própria. Limpeza doméstica do Windows não é apresentada como sanitização certificada. Serviço permanece no fim, após a utilidade educativa.

Data original 2026-09-03, slug, canonical, capa e aprovação anterior preservados. Apenas reviewedAt foi atualizado para a revisão material de 2026-11-02. Nenhum preço ou fluxo comercial foi alterado. PR #400 e a base #384 não foram modificados.

## Fontes consultadas

Seis fontes Microsoft visíveis e cadastradas no manifesto, consultadas em 02/11/2026:

- https://support.microsoft.com/pt-br/windows/experience/backup-recovery/move-your-files-to-a-new-windows-pc-using-an-external-storage-device
- https://support.microsoft.com/pt-br/onedrive/windows/move-files-to-a-new-windows-pc-using-onedrive
- https://support.microsoft.com/pt-br/onedrive/save-disk-space-with-onedrive-files-on-demand-for-windows
- https://support.microsoft.com/pt-br/windows/experience/backup-recovery/back-up-and-restore-with-windows-backup
- https://learn.microsoft.com/pt-br/powershell/module/microsoft.powershell.utility/get-filehash?view=powershell-7.5
- https://support.microsoft.com/pt-br/windows/experience/backup-recovery/reset-your-pc

## Dados estruturados e revisão React

As cinco FAQs técnicas usam uma única lista em fileMigrationFaq.ts. Teste de renderização compara perguntas/respostas visíveis com o FAQPage registrado pelo componente. Article e BreadcrumbList existentes não foram reimplementados. A revisão React manteve import direto, conteúdo estático e ausência de novos efeitos, fetches ou dependências. Não houve reestruturação da aplicação.

## Validação

- Testes do guia: 4/4.
- Testes unitários: 52 arquivos, 897/897.
- Leitor editorial: 7/7.
- Gates de intenção, revisão técnica, links internos e confiança: aprovados.
- Inventário de afirmações regenerado pelo comando oficial e conferido: 272 ocorrências, sem alteração do arquivo.
- Build direto `npx vite build` cliente e SSR: aprovado.
- `git diff --check`: aprovado.

Preview iniciado e consultado localmente: HTTP 500 antes da renderização da página. Erro observado: ERR_MODULE_NOT_FOUND para dist/server/server.js, importado pelo plugin de preview do TanStack. É a mesma incompatibilidade já registrada nas rodadas anteriores. Portanto, paridade do componente está testada, mas não se declara JSON-LD validado no HTML SSR servido. Não foram executados verify global, pre/postbuild completo, deploy:check, E2E ou teste global de acessibilidade. Nenhum gate foi relaxado; sem merge e sem deploy.

Os dois arquivos Lighthouse não rastreados já presentes foram preservados e excluídos do commit.

## Próximo passo

Redes: diagnóstico de Wi-Fi que não aparece na lista, mantendo separação entre ausência do SSID, adaptador, bandas/canais e indisponibilidade da internet. Segurança permanece na fila para lacunas de recuperação MFA. A publicação deste lote continua dependente da base técnica e dos gates globais, não apenas da redação.
