# Rodada editorial — Hardware: upgrade SSD/NVMe

Data da revisão: 2026-09-07  
Issue: #15  
Rota preservada: `/blog/como-fazer-upgrade-ssd-nvme`

## Objetivo

Aprofundar o guia existente para reduzir compras incompatíveis e intervenções com risco aos dados. A revisão mantém a utilidade autônoma antes da ponte comercial e não altera slug, URL ou canonical.

## Alterações editoriais

- explicação explícita de que M.2 é formato físico e não sinônimo de NVMe;
- checklist pré-compra de interface, chave, comprimento, suporte de boot, capacidade, compartilhamento de portas e dissipação;
- sequência de preservação com cópia independente e verificação da chave BitLocker antes de abrir o equipamento;
- distinção entre backup e clonagem;
- critérios mais seguros para escolher clonagem ou instalação limpa;
- orientação para não alterar modos de armazenamento no firmware por tentativa;
- cinco perguntas técnicas próprias, sem preço, prazo ou promessa comercial;
- ponte para diagnóstico e serviço mantida somente no final.

## Fontes primárias consultadas

- NVM Express, *Frequently Asked Questions*: distinção entre formato M.2 e interfaces SATA/PCIe.
- NVM Express, *NVM Express Base Specification*: relação entre NVMe, PCI Express e diferentes formatos.
- Microsoft Support, *Back up your BitLocker recovery key*: cópia e disponibilidade da chave de recuperação.
- Microsoft Learn, *Initialize new disks*: reconhecimento, seleção e inicialização de unidade nova no Gerenciamento de Disco.

As fontes foram registradas em `src/lib/blogEditorialSources.ts` com data de acesso e afirmações sustentadas.

## Arquivos editoriais alterados

- `src/data/blogPostsContent.tsx`
- `src/components/BlogPostFAQ.tsx`
- `src/lib/blogEditorialRegistry.ts`
- `src/lib/blogEditorialSources.ts`

## Validação

- `npm run build`: aprovado.
- `npm run report:problem-intent`: aprovado; 202 páginas inventariadas, nenhuma URL duplicada entre fontes.
- `npm run verify`: aprovado em segunda execução, 35/35 gates e 860/860 testes. A primeira execução teve um timeout transitório no teste remoto `security-definer-privileges`, sem falha editorial; a repetição passou.
- `npm run ssr:with-server -- npm run deploy:check`: aprovado, 37/37 gates.
- SSR: 328 páginas materializadas.
- JSON-LD: 247 HTMLs, 1.666 blocos válidos e zero erro.
- FAQ: 1.519 perguntas em 270 `FAQPage`, com paridade 1:1 entre conteúdo visível e dados estruturados.
- Links internos: nenhum link quebrado.
- Órfãs indexáveis: zero.
- `git diff --check`: aprovado.

## Limites e publicação

- Nenhuma marca ou modelo de SSD foi recomendado.
- Nenhum ganho percentual foi prometido.
- Nenhuma rota, slug ou canonical foi alterado.
- Build e gates não comprovam atualização do domínio público; a publicação deve ser confirmada após o merge no ambiente conectado.
