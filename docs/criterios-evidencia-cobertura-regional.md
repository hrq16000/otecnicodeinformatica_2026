# Critérios de evidência para cobertura por cidade e região

## Objetivo e escopo

Este documento define como avaliar evidências de atuação regional no portal **O Técnico de Informática**. Ele orienta registros internos e decisões editoriais; não declara cobertura atual em nenhuma cidade.

A presença de um município em uma lista, uma região informada por profissional ou uma busca realizada não prova, isoladamente, que haja atendimento confirmado. A disponibilidade muda e deve ser validada para cada solicitação, especialidade e período.

## Níveis internos de evidência

Usar níveis distintos. Eles descrevem o que foi observado; não são selo de qualidade nem promessa ao cliente.

| Nível | Evidência exigida | O que permite afirmar internamente | O que não permite afirmar |
| --- | --- | --- | --- |
| A — serviço concluído | Registro verificável de uma solicitação, aceite e conclusão na localidade; revisão de que a prova se refere ao serviço alegado | Houve ao menos um atendimento concluído, naquele período e escopo | Atendimento contínuo, cobertura atual ou volume maior do que o comprovado |
| B — profissional confirmado | Identidade profissional validada por processo autorizado, especialidade compatível e confirmação recente de que atende aquela localidade | Há profissional identificado que declarou e confirmou atuação naquela localidade/especialidade | Que aceitou uma solicitação, respondeu a orçamento ou realizou serviço |
| C — resposta ou proposta | Registro datado de retorno ou proposta para uma solicitação real, com cidade e especialidade correspondentes | Houve resposta/proposta para aquela solicitação e período | Que a proposta foi aceita ou o serviço concluído |
| D — localidade consultável | A localidade pode ser consultada ou informada como área possível, sem confirmação de parceiro ativo ou evento operacional | A rede pode ser consultada para aquela região | Que exista profissional disponível, cobertura garantida ou atendimento local confirmado |

Quando mais de um nível existir, registrar cada evento e sua data separadamente. Não promover uma região a nível A por ter evidência B ou C. Não agregar níveis em um único número de “cidades atendidas”.

## Registro mínimo da evidência

Para cada evidência regional, manter em ambiente autorizado:

- identificador interno aleatório do caso ou registro, não dado pessoal em texto livre;
- município/UF e especialidade normalizados, com escopo geográfico preciso;
- nível e evento observado;
- data do evento e data da última confirmação;
- referência restrita da fonte, tipo de prova e pessoa revisora;
- critério aplicado, ressalvas e próxima data de revisão definida pelo responsável;
- estado: válida para o propósito, vencida para o propósito, contestada ou insuficiente.

A referência operacional deve permanecer em ambiente controlado, com acesso limitado. Não copiar conversa, telefone, documento, endereço residencial, nome de cliente ou dados do profissional para documentação pública. Se a prova original for uma mensagem ou proposta, registrar apenas o mínimo necessário para auditoria; seguir a política de retenção aplicável.

## Validade e atualização

Não existe uma validade universal adequada a todo tipo de evidência. Cada afirmação tem uma janela apropriada ao seu significado:

- conclusão de serviço comprova um evento histórico, não disponibilidade atual;
- confirmação de profissional deve ser renovada antes de afirmar disponibilidade regional presente;
- proposta/resposta vale para a solicitação específica a que se refere;
- localidade consultável permanece apenas uma possibilidade até haver confirmação operacional.

Quem aprova o registro deve definir e anotar a janela de revisão conforme a frequência de mudança do dado. Ao vencer essa janela, a evidência deixa de sustentar afirmações atuais até ser revalidada. Não apagar o evento histórico; atualizar seu estado de validade.

## Critérios de linguagem

Usar redação proporcional ao nível e sempre indicar tempo e escopo quando houver afirmação:

- **A:** “Há registro de atendimento concluído em [município/UF] em [período].” Só usar em conteúdo público após revisão da prova, autorização e privacidade.
- **B:** “Foi confirmado profissional com atuação declarada em [município/UF] para [especialidade], sujeito à disponibilidade no momento da solicitação.”
- **C:** “Foi recebida resposta/proposta para uma solicitação em [município/UF] em [período].” Não sugerir aceite ou conclusão.
- **D:** não usar como prova pública de cobertura; informar apenas que a disponibilidade será consultada, se o fluxo real permitir.

Evitar “atendemos em”, “cobertura garantida”, “equipe local”, “filial” ou “sempre disponível” salvo prova específica que sustente exatamente a alegação e revisão jurídica/editorial apropriada. Profissionais independentes não devem ser descritos como empregados do portal.

## Páginas locais e publicação

Uma evidência regional não torna automaticamente necessária ou elegível uma página de cidade × serviço. Antes de propor uma página:

1. confirmar demanda real com fonte disponível e período definido;
2. verificar que a página oferece informação original e útil específica à localidade, além do nome da cidade;
3. validar evidência compatível com cada alegação regional e com o serviço tratado;
4. garantir que o conteúdo não prometa disponibilidade ou qualidade não medida;
5. aplicar os gates de conteúdo, interlinks, indexação, canonical e sitemap já existentes.

Se esses requisitos não forem atendidos, não publicar como página local indexável. Manter páginas fracas fora do índice, conforme a governança do portal. Evidência B, C ou D não substitui evidência de demanda nem conteúdo local substancial.

## Limites de agregação e privacidade

- Contar cidades, especialidades ou ocorrências somente com definição explícita da unidade, janela e nível mínimo.
- Não somar cidades distintas se os registros descrevem raio, região metropolitana ou áreas sobrepostas sem regra de normalização.
- Não publicar cortes pequenos que permitam identificar profissional ou cliente; generalizar ou suprimir o recorte.
- Não divulgar mapas de pontos, endereços, telefones, conversas, documentos, IDs internos ou contagens brutas linha a linha.
- Claims públicos de quantidade devem seguir a metodologia de evidências e a fotografia do programa de parceiros; os universos do portal não equivalem a uma rede comunitária mais ampla.

## Base técnica e limites atuais

A API pública do portal consulta perfis por meio da visão `partners_public`; a API administrativa expõe estados de cadastro e campos de localidade/especialidade. Isso descreve o sistema de perfis. Não comprova por si só solicitações encaminhadas, respostas, propostas aceitas, serviços concluídos ou disponibilidade atual.

Referências relacionadas:

- `src/lib/partnersApi.ts`
- `src/lib/partnersAdminApi.ts`
- `docs/metodologia-evidencias-rede-parceiros.md`
- `docs/fotografia-contagens-parceiros.md`
- `docs/eeat-governance.md`

Nenhuma cidade, região ou especialidade é certificada por este documento. A apuração de cobertura atual depende de registros operacionais autorizados e revisados.
