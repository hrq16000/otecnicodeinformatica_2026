# Metodologia de evidências da rede de parceiros

## Objetivo e escopo

Esta metodologia orienta a produção de indicadores verificáveis sobre o programa de parceiros mantido pelo portal **O Técnico de Informática**. Ela não demonstra, por si só, quantos profissionais estão cadastrados ou ativos.

Os registros do programa deste portal não devem ser somados nem apresentados como o total de uma rede mais ampla, comunidade ou operação de outros portais. Uma afirmação sobre esses universos exige fonte própria, autorização de uso e método de deduplicação documentado.

Esta rodada define o método; não consultou o banco de produção, não extraiu uma fotografia de dados e não apurou contagens.

## O que os registros permitem distinguir

O código administrativo do portal define estados distintos para os registros de parceiros: iniciado, aguardando análise, aprovado, ativo, vencido e suspenso. A lista pública consulta uma visão própria do banco, destinada aos perfis ativos. Os critérios e o esquema vigentes devem ser confirmados antes de cada extração.

- candidatura recebida não equivale a parceiro aprovado ou ativo;
- aprovação não equivale a perfil publicado;
- perfil ativo/publicado não equivale a profissional disponível para qualquer serviço ou localidade;
- os perfis ativos do portal não representam o total de participantes de outras redes ou comunidades;
- os dados da candidatura e a lista pública têm finalidades e campos diferentes.

## Indicadores e regras de apuração

| Indicador | Regra |
| --- | --- |
| Candidaturas recebidas | Contar registros de candidatura no intervalo de criação, informando datas de início e fim e fuso horário. Não chamar de pessoas únicas. |
| Candidaturas por estado | Contar registros por estado no instante da extração. Não tratar o estado atual como histórico de conversão. |
| Perfis ativos publicados | Contar apenas registros que satisfaçam os critérios correntes de publicação pública. Identificar como perfis ativos do portal, com data da consulta. |
| Profissionais únicos | Deduplicar em ambiente restrito usando identificadores apropriados e regras documentadas. Não inferir unicidade a partir de nome, cidade ou número de linhas. |
| Distribuição por localidade ou especialidade | Usar somente registros elegíveis ao indicador declarado, normalizar categorias e omitir agregados com grupos pequenos que possam permitir identificação. |
| Conversão, tempo de resposta ou conclusão de serviço | Publicar apenas se existirem eventos e marcas de tempo adequados para cada etapa. Não inferir fluxo de orçamento, atendimento ou serviço concluído a partir do estado da candidatura ou do perfil. |

Toda extração deve registrar internamente: objetivo, fonte/tabela ou visão, filtros, definição da unidade contada, janela temporal, data/hora da extração, regra de deduplicação, tratamento de registros incompletos, responsável pela revisão e hash ou referência imutável do artefato agregado. O registro de auditoria não deve armazenar cópias desnecessárias de dados pessoais.

## Privacidade e publicação

- A extração deve usar a menor quantidade de dados necessária. Campos de documento, telefone/WhatsApp, notas administrativas e identificadores de conta não entram em relatórios públicos.
- Deduplicação que dependa de dado pessoal deve ocorrer apenas em ambiente autorizado, com acesso restrito; publicar somente resultados agregados revisados.
- Não publicar registros linha a linha, IDs internos, capturas de tela do painel, mensagens, documentos ou combinações de atributos que identifiquem uma pessoa.
- Aplicar supressão de células pequenas e revisão contextual antes de divulgar cortes por cidade, especialidade ou período. Se houver risco razoável de reidentificação, ampliar o agrupamento ou não publicar o recorte.
- Uma afirmação pública sobre quantidade deve informar exatamente o universo contado, a data de referência e a fonte interna responsável, sem sugerir cobertura, disponibilidade, qualidade ou resultado não medido.

## Requisitos para afirmar um total

Antes de publicar qualquer número, a revisão precisa responder “sim” a todos os itens:

1. A fonte é autorizada e corresponde ao universo descrito?
2. O indicador tem unidade, filtros, janela temporal e estados definidos?
3. Duplicidades, registros incompletos e mudanças de estado foram tratados?
4. O resultado foi reproduzido por uma segunda revisão?
5. A publicação contém apenas agregados e passou por revisão de privacidade?
6. O texto deixa claro que perfis ativos do portal são uma medida específica e datada?

Sem esses requisitos, não publicar número nem estimativa. Não converter alegações informais de tamanho de rede em contagens verificadas.

## Limitações atuais

O código e as migrações do portal descrevem cadastro, aprovação e publicação de perfis. Essa estrutura, isoladamente, não comprova eventos de solicitação de orçamento, resposta do parceiro, aceite do cliente, execução ou conclusão de serviço. Indicadores dessas etapas dependem de uma fonte operacional adequada e de definições adicionais, antes de qualquer apuração.

A existência de uma configuração comercial própria do portal também não define preço, gratuidade ou condições de adesão de uma comunidade ou de outros portais. Afirmações comerciais devem continuar vinculadas à configuração oficial vigente deste portal.

## Referências de implementação

- `src/lib/partnersApi.ts`: consulta de perfis por meio da visão pública `partners_public`.
- `src/lib/partnersAdminApi.ts`: estados e operações administrativas de parceiros.
- `src/pages/profissionais/CadastroParceiro.tsx`: fluxo de candidatura; a página é destinada a cadastro e não serve como contagem de adesões.
- Migrações Supabase que definem `partners`, políticas de acesso e a visão pública `partners_public`: consultar o histórico vigente antes da extração.
- `docs/eeat-governance.md` e `config/trust-claims-ledger.json`: governança de provas e afirmações públicas.

Essas referências ajudam a entender o modelo técnico. Não substituem uma consulta autorizada ao conjunto de dados, nem constituem evidência de uma contagem atual.
