# Rodada CI — Node 22 e consolidação E2E observacional

Data: 10 de outubro de 2026

Issue: #377

Base editorial: PR #376

## Motivo

O conteúdo e os gates editoriais da PR #376 foram aprovados, mas o job de
build remoto usava Node 20. As versões instaladas de TanStack Start e
Supabase exigem Node 22 ou superior. O build estático terminava, porém o
servidor SSR do `deploy:check` falhava ao inicializar o cliente realtime por
ausência de WebSocket nativo no runtime antigo.

Quando o build bloqueava os shards E2E, o consolidador observacional tentava
mesclar uma pasta sem blobs e criava uma segunda falha sem relação com o
conteúdo.

## Correções

- workflows que ainda declaravam Node 20 passaram a usar Node 22.12.0;
- o runtime ficou alinhado ao requisito das dependências já presentes no
  `package-lock.json`;
- o consolidador E2E verifica se existem relatórios blob antes da mesclagem;
- na ausência de blobs, ele gera inventário explicativo e aviso observacional;
- os shards, o E2E direcionado, o build, o SSR e os demais gates continuam
  bloqueantes nos pontos onde já eram bloqueantes;
- nenhum limite editorial, SEO, acessibilidade ou desempenho foi reduzido.

## Escopo preservado

Não houve alteração de conteúdo público, URL, slug, canonical, robots,
indexabilidade, sitemap, preço, garantia ou CTA.

## Validação local

- todos os arquivos YAML dos workflows foram parseados com sucesso;
- o caminho sem blobs do relatório E2E foi reproduzido e gerou o inventário
  esperado;
- `git diff --check` aprovado;
- confirmação completa do SSR e dos demais gates permanece a cargo do CI do
  próprio PR, que fornece o runtime Node 22.12.0 real.

## Passivo não mascarado

O workflow separado `performance-servicos` já usa Node 22.12.0 e detectou
Total Blocking Time acima do orçamento em uma rota de serviço. Essa falha é
real, independente desta correção de runtime, e permanece bloqueante para uma
rodada específica de desempenho.
