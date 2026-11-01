# Hardware — SMART e preservação de dados — 01/11/2026

Continuação da issue #397 e do PR #398. Guia existente: `/blog/disco-com-setores-defeituosos-smart-o-que-fazer`.

## Entrega editorial

Revisão diretamente na fonte base canônica, sem sombra suplementar. Data original de publicação, aprovação anterior, URL, canonical, capa e indexabilidade foram preservados; a data da revisão material foi atualizada para 2026-11-01.

Removidas regras excessivamente absolutas: aguardar dias diante de falha ativa; corte universal de 90% para SSD; ruído como diagnóstico definitivo; imagem bit a bit como obrigação de tentativa doméstica; expectativa de zerar contador CRC após corrigir o enlace.

O guia diferencia telemetria, defeito físico, problema lógico e comunicação. Começa pelo valor dos dados e pelo risco da leitura, explica os limites de CHKDSK e de clonagem, exige identificação de origem/destino e mantém o serviço somente ao final. Não fornece receita destrutiva para uma unidade desconhecida.

## Fontes

Seis referências primárias visíveis no artigo: Seagate SMART error, Seagate interpretação de SMART, documentação Seagate/openSeaChest, Microsoft Learn CHKDSK, manual GNU ddrescue e Seagate ruído em discos.

Consultadas em 01/11/2026 para esta revisão:

- https://www.seagate.com/support/kb/my-system-reported-a-smart-error-on-the-drive-184619en/
- https://www.seagate.com/em/en/support/kb/how-do-i-interpret-smart-diagnostic-utilities-results-203971en/
- https://github.com/Seagate/openSeaChest/wiki/Drive-Health-and-SMART
- https://learn.microsoft.com/pt-br/windows-server/administration/windows-commands/chkdsk
- https://www.gnu.org/software/ddrescue/manual/ddrescue_manual.html

GNU e o artigo de interpretação Seagate apresentaram falha na abertura direta; seu conteúdo foi conferido pela busca no domínio primário. O host github.com foi classificado por se tratar da documentação publicada pela própria Seagate no repositório openSeaChest; essa classificação não transforma qualquer repositório em fonte confiável.

## FAQ e dados estruturados

As cinco FAQs foram movidas para `smartDiskFaq.ts`. Essa lista é usada pelo componente visível e pela geração de FAQPage. Um teste renderiza o componente e compara todas as perguntas/respostas com o objeto de schema registrado durante o render. A aprovação existente permanece ativa; nenhuma nova URL foi promovida.

Esse teste comprova paridade no componente, não substitui inspeção do HTML SSR completo. Article, BreadcrumbList, FAQPage e lastmod ainda devem ser conferidos na validação global sobre a base técnica atual antes de publicação.

## Validação

- Testes específicos do guia: 4/4.
- Testes unitários: 51 arquivos, 893/893.
- Leitor editorial: 7/7. O teste das três referências Seagate anteriores foi delimitado aos três artigos que ele pretende proteger, sem proibir a inclusão de novas fontes legítimas.
- Gates de revisão técnica, intenção, links internos, confiança e cluster editorial: aprovados.
- `check:afirmacoes`: aprovado, 272 ocorrências; geração pelo comando oficial não produziu mudança no inventário.
- Build direto Vite cliente e SSR: aprovado.
- `git diff --check`: aprovado.

Não foram declarados verify completo, build com todos os pre/postbuilds, deploy:check, E2E ou acessibilidade global aprovados. Sem merge ou deploy nesta rodada. Um relatório Lighthouse não rastreado já existente foi preservado e não faz parte do commit.

## Próximo

Produtividade: migração de arquivos para computador novo, com inventário, validação da cópia e preservação da origem. Windows 11 continua com requisitos de promoção editorial pendentes; não deve ser apresentado como publicado.
