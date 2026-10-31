# Proposta operacional — Plataforma nacional de gestão para atendimentos diretos

> **Status: minuta de implementação (31/10/2026). NÃO é tabela ativa, não habilita pagamentos e não autoriza divulgar cobertura nacional irrestrita.**
> Issue de acompanhamento: #399. A publicação depende da política operacional confirmada, da revisão jurídica e dos gates do repositório.
> A nova modalidade de **solicitação direta a técnico cadastrado** não substitui automaticamente as regras locais existentes. Não é um serviço de acionamento, despacho manual ou intermediação operacional pela gestão. O enquadramento jurídico dependerá do funcionamento real de oferta, contratação, pagamento e repasse.

## 1. Posicionamento
A plataforma oferece **infraestrutura de cadastro, consulta, transparência de condições, ordem impessoal de exibição e gestão tecnológica**. O **cliente solicita e contrata diretamente com o profissional** elegível e disponível, sem operador da plataforma escolher um prestador, negociar preços por ele, intermediar a execução ou realizar acionamento manual. A ordem de apresentação é um **rodízio transparente, sem leilão ou favorecimento**, preservando autonomia de aceite e recusa. Se a plataforma passar a capturar o pagamento integral, realizar oferta exclusiva automática ou garantir execução, a caracterização de não intermediação precisa de revisão jurídica e de representação fiel ao consumidor.

**Evidência recebida em 31/10/2026:** captura do grupo WhatsApp "Grupo dos Técnicos informática" com **222 membros**. Isso comprova apenas o contador de membros exibido naquele momento; **não confirma 222 profissionais cadastrados, verificados, com disponibilidade ou cobertura nacional em municípios específicos**. A publicação de nomes, fotos, telefones ou cidade de qualquer participante depende de confirmação e base legal apropriada.

**Comunidade fornecida pelo responsável:** https://chat.whatsapp.com/KUki7iAKg2f5ahsGfn4Su5?s=cl&p=a&iam=2 — link de participação **para profissionais**, sujeito às regras de entrada e à validação posterior no portal. Não divulgar como canal de atendimento de clientes.

Nunca usar:
- "Preço mínimo fixado por consenso entre mais de 5 mil técnicos" sem revisão especializada de direito concorrencial.
- "Não lucramos", "100% do Brasil", "todos os técnicos disponíveis", "atendimento garantido em 24 h", quantidade de membros/cobertura ou repasse integral sem lastro e regras de contabilização.
- Nome/foto/telefone/conversa particular de grupo sem autorização e tratamento adequado de dados.

Redação preferível: **"Rede de profissionais de informática com participação em comunidade e cadastro na plataforma. O cliente contrata o profissional diretamente, com valores de referência da modalidade apresentados previamente. A disponibilidade é confirmada por localidade e profissional; a plataforma organiza informações e regras, sem operação de despacho manual."**

É proibido usar "mais de 200 técnicos habilitados/disponíveis" com base apenas na quantidade de participantes do grupo. Pode-se referir à **comunidade com 222 membros na captura de 31/10/2026**, com data e contexto, depois de aprovação para divulgação. Alegação de "mais de 5 mil técnicos em consenso de preço" exige revisão concorrencial e prova independente.

## 2. Condições propostas para a modalidade nacional

| Componente | Cliente | Prestador | Plataforma |
| --- | --- | --- | --- |
| Serviço padrão até 1 hora | R$ 159,99 (total de mão de obra + operação) | R$ 150,00 | R$ 9,99 de operação **incluídos** |
| Hora adicional aprovada antes do pagamento | R$ 69,99 por hora adicional | Previsão de repasse integral de R$ 69,99, conforme taxa fixa por solicitação e contrato final | R$ 0,00 de taxa adicional |
| Serviço urgente/especial (menos de 24h), fora do horário comercial, fim de semana ou feriado, até 1h | R$ 359,99 | R$ 330,00 líquidos sobre o serviço | R$ 29,99 de gestão **fixos, incluídos**, cobrados ao cliente |
| Deslocamento até 3 km do técnico ao cliente | R$ 0,00 | Sem repasse | R$ 0,00 |
| Deslocamento >3 até 30 km (distância de ida) | R$ 1,50/km de **ida + volta** | Repasse integral | R$ 0,00 |
| Deslocamento >30 km (distância de ida) | R$ 2,00/km de **ida + volta** | Repasse integral | R$ 0,00 |
| Estacionamento | Vaga provida ou custo informado e assumido pelo cliente | Ressarcimento integral se pago pelo prestador | R$ 0,00 |

A qualificação de urgente/especial **não soma dois adicionais** quando mais de uma condição estiver presente. A taxa de gestão é **uma única vez por solicitação**, no valor da modalidade (R$ 9,99 ou R$ 29,99) — não reaplicar a cada hora ou km. Nenhuma cobrança deve ser calculada ou capturada antes de determinar preço, duração, endereço, raio e política de estacionamento.

**Pendências que afetam o valor exato:** o patamar quilométrico incide sobre o percurso completo ou apenas o trecho além do limite? Como ficam 30,01 km, arredondamento e cobrança de km fracionário? O contrato precisa confirmar o repasse de R$ 69,99 da hora extra, se uma hora extra parcial é cobrada de forma integral ou proporcional e a regra de arredondamento de tempo. O serviço especial foi especificado como **R$ 359,99** com taxa fixa de R$ 29,99, sem preço inferior nesta modalidade. Qual é o regime de reembolso caso não haja técnico disponível? Essas regras precisam de aceite antes de ativar cálculo automático.

### Rodada 2 — implementação isolada, NÃO habilitada

O motor em `src/lib/gestaoNacional/cotacaoNacional.ts` implementa uma **interpretação provisória** dos parâmetros comerciais, com testes de fronteira em `cotacaoNacional.test.ts`. Não é consumido por rotas, não cria links de pagamento e retorna `aptaParaPagamento: false`. Os parâmetros locais atuais não foram modificados.

**Regras codificadas para validação:** (1) distância de ida em metros inteiros; até 3.000 m, zero; acima de 3.000 m até 30.000 m, R$ 1,50/km para o percurso integral de ida e volta; acima de 30.000 m, R$ 2,00/km no percurso integral; (2) arredondamento do deslocamento ao centavo mais próximo; (3) horas adicionais inteiras **já aprovadas**; (4) repasse integral da hora adicional ao profissional, sujeita a confirmação contratual; (5) valor de estacionamento conhecido previamente ou vaga fornecida; (6) taxa fixa uma vez, sem aplicação sobre km, vaga ou hora adicional.

**ATENÇÃO:** a mudança de faixa gera salto de cobrança em 3.001 m e 30.001 m (não é tarifa progressiva). Antes de qualquer oferta ao público, a gestão deve validar expressamente se deseja tarifar todo o percurso ou apenas o excedente, além de definir condições de horas fracionárias, conversão de distâncias, estacionamento sem previsão exata, tributos e cancelamentos. Reprovar ou modificar a regra se não coincidir com a operação real.

### Exemplos apenas explicativos, não orçamentos
- Padrão, sem deslocamento e sem estacionamento: cliente **R$ 159,99**; profissional **R$ 150,00**; plataforma **R$ 9,99**.
- Especial no teto, sem deslocamento e sem estacionamento: cliente **R$ 359,99**; profissional **R$ 330,00**; plataforma **R$ 29,99**.
- Estacionamento não depende de a visita ter durado 5 minutos ou 5 horas: o cliente disponibiliza a vaga ou assume o custo, comunicado antes.

## 3. Contrato de experiência para o cliente

Texto-base para futura página COMERCIAL exclusiva (não para guias educativos):

> **Contrate diretamente um técnico cadastrado, com as condições visíveis antes de pagar.** Para até uma hora de atendimento padrão, o total é R$ 159,99, sendo R$ 150,00 destinados ao profissional e R$ 9,99 de taxa fixa de gestão da plataforma. Para urgência ou horário especial, o total é R$ 359,99, sendo R$ 330,00 ao profissional e R$ 29,99 à plataforma. Horas adicionais, deslocamento e estacionamento são informados antes da contratação. A plataforma permite consultar os profissionais cadastrados e disponíveis, exibidos em rodízio imparcial. A contratação do serviço é feita diretamente com o técnico; a plataforma não realiza acionamento manual nem intervém na execução. O atendimento apenas se torna válido depois da confirmação real de pagamento pelo canal previsto.

Regras visíveis antes do aceite:
1. O orçamento apresenta mão de obra, tempo reservado, adicional por hora, quilometragem ida/volta, eventual estacionamento, taxa da plataforma e total.
2. O cliente pode solicitar no máximo **3 chamados por dia, para serviços distintos**, com mecanismos de prevenção a abuso e suporte.
3. Pagamento adiantado apenas em canal oficial. **Link gerado não é pagamento confirmado.**
4. Serviço fora do escopo, peça, tempo ou custo adicional requer **novo orçamento e autorização expressa**; não se negocia mudança informal do valor no local.
5. Se não houver técnico elegível ou o atendimento não puder ocorrer, a plataforma comunica a indisponibilidade e aplica política de reembolso/cancelamento publicada e legalmente revisada.
6. Não há promessa de atendimento em todas as cidades, nem garantia de prazo especial antes da confirmação da disponibilidade.

## 4. Contrato de experiência para o técnico

Texto-base futuro para área de adesão:

> **Sua contratação é direta com o cliente e sua remuneração é transparente.** Para atendimento padrão de até uma hora, o valor da solicitação é R$ 159,99: R$ 150,00 da primeira hora ao técnico, R$ 9,99 de taxa fixa de gestão tecnológica cobrada do cliente. Para atendimento especial, R$ 359,99: R$ 330,00 destinados ao técnico, R$ 29,99 à plataforma. Quilometragem e estacionamento são integralmente destinados ao profissional. O técnico vê escopo, duração, localidade, remuneração e condições antes de aceitar a contratação diretamente com o cliente. Sem leilão, comissão variável por serviço ou acionamento por operador.

Regras:
- Para integrar a modalidade, é obrigatório **participar da comunidade WhatsApp** e **concluir cadastro/validação na plataforma**. O grupo isoladamente **não** habilita atuação, não prova localização ou disponibilidade. Link de adesão: https://chat.whatsapp.com/KUki7iAKg2f5ahsGfn4Su5?s=cl&p=a&iam=2.
- Profissionais fora da comunidade ou sem cadastro validado **não** aparecem como elegíveis no rodízio. Caso exista serviço com profissional externo, tratar em modalidade e condições contratuais separadas; **nunca** apresentá-lo como membro da rede.
- Aceite/recusa registrados; posição da fila e motivos de inelegibilidade auditáveis e protegidos; sem privilégios comerciais ocultos.
- A definição de recebedor do pagamento, split/repasses, documentos fiscais, taxas do cartão e datas de liberação precisa constar em contrato; **não implantar cobrança centralizada** presumindo que isso preserve automaticamente a condição de não intermediadora.
- Divergências, materiais, horas ou deslocamentos extras devem gerar novo orçamento registrado e aceite do cliente; a plataforma não negocia em nome do técnico e não autoriza cobranças informais no local.

## 5. Rodízio de visibilidade tipo ponto de táxi — sem central de acionamento

`requested → available_professionals_shown → terms_confirmed → client_approved → payment_pending → payment_confirmed → direct_hire_accepted → in_progress → completed → reconciled`

**Regra de produto:** o sistema pode apresentar o próximo perfil elegível da região em ordem rotativa, mas **não** haverá operador escolhendo, ofertando manualmente, negociando ou acionando o profissional em nome do cliente. A confirmação decorre da contratação e do aceite direto. A eventual entrega automática/exclusiva de uma solicitação ao próximo técnico muda o desenho funcional e precisa ser descrita como tal, sem alegações enganosas de inexistência de intermediação.

Ramos alternativos: `expired`, `payment_failed`, `declined`, `technician_unavailable`, `cancelled`, `refunded`, `disputed`.

- `payment_confirmed` só por confirmação autenticada do provedor (webhook idempotente com reconciliação), nunca por retorno da tela, print de PIX ou clique no link.
- Para cada região/categoria: filtrar **membro da comunidade + cadastro validado**, habilitação, serviço compatível, raio e disponibilidade; **exibir** o próximo elegível por rodízio determinístico, sem favoritismo e com prazo de resposta transparente.
- Recusa ou indisponibilidade devolve a disponibilidade à fila e permite exibir o próximo profissional, preservando auditoria. Não há lances, concorrência pelo menor preço ou prioridade comercial paga.
- Idempotência de pedidos, cotação imutável após aceite, limite de três solicitações distintas por dia por cliente autenticado/antifraude e transações atômicas para impedir dois aceites à mesma contratação.
- Se não houver profissional validado e disponível, **não** cobrar nem afirmar atendimento confirmado. Se já houver pagamento capturado, definir cancelamento/reembolso conforme direito aplicável, sem condicionar o direito do cliente à expressão contratual "não intermediamos".
- Proteger localização exata do técnico: distância e área de cobertura são suficientes para cotação; endereço pessoal não aparece no portal público.

## 6. Evidências para expansão regional e SEO

Classificar cada entrada antes de qualquer afirmação pública:
`membro_comunidade` → `cadastro_validado` → `habilitado` → `disponivel` → `atendimento_real_comprovado`.

- Captura de 31/10/2026 registra **222 membros no grupo**; o contador não distingue profissionais ativos, cadastrados na plataforma, cidades, estados ou serviços concluídos. Prints posteriores com cidade/UF declaradas continuam exigindo cadastro e validação independente antes de virar cobertura comercial.
- Obter UF, município de atuação, categorias de serviço, raio, status do cadastro, aceite e autorização de uso de nome/imagem. Nunca publicar telefone, conversas e dados pessoais extraídos do print sem base legal.
- Sem páginas municipais geradas em massa: apenas cidades comprovadas, com conteúdo próprio, demanda e governança de indexação prevista em `AGENTS.md`.
- Medir pedidos, pagamento confirmado, alocação, aceites, cancelamentos, reembolsos e satisfação comprovada por região, sem fabricar métricas.

## 7. Barreiras antes de publicar

1. **Conflitos em produção**: os módulos atuais `src/lib/config/commercial.ts` e `src/lib/politicaComercial.ts` contêm R$ 99,99, pagamento após execução, formas de pagamento distintas e cobertura local. `src/lib/precosConfig.ts` + `scripts/check-politica-atendimento.mjs` protegem outras regras. Não alterar isoladamente, sob pena de contradição.
2. **Consumidor e papel da plataforma**: documentar claramente quem presta o serviço, quem contrata, quem recebe o PIX/cartão, qual é a responsabilidade pelo atendimento e pela taxa de gestão. A expressão "não intermediamos" não pode conflitar com o funcionamento real de seleção, contratação e pagamentos.  orçamento prévio discriminado e consentimento de alterações; política de cancelamento e arrependimento conforme CDC (arts. 40, 46 e 49) com revisão jurídica.
3. **Concorrência**: consultar assessoria jurídica quanto a tabelamento de preços entre prestadores independentes, transparência, cadastro e exclusividade. Preços cobrados pela própria plataforma em seu contrato de serviço precisam ser definidos como oferta **da plataforma**, não acordo horizontal de preço entre concorrentes.
4. **Privacidade e segurança**: LGPD, prova do aceite, recibo, antifraude, trilha de auditoria, proteção dos contatos e localização dos profissionais.
5. **Financeiro/tributário**: quem é vendedor/prestador contratante, emissão de documentos fiscais, taxas do cartão, chargebacks, split de pagamentos e reconciliação da promessa de repasse.
6. **Publicação**: issue → PR → gates → merge → ambiente de deploy confirmado. A PR #384 de SEO é independente; sem mudança em DNS, slugs, canonical ou sitemap nesta proposta.

## 8. Lista mínima de testes da futura implementação

- Distâncias: 0; 3; 3,01; 30; 30,01; 60 km; sem saltos indevidos ou regra não aprovada.
- Tempo: 5 minutos; 1 hora; 1h01; 2 horas; 5 horas; adicionais expressamente aceitos.
- Padrão x especial: taxas incluídas corretas, limite máximo aplicável e uma única classificação por pedido.
- Estacionamento: vaga cedida, custo antecipadamente conhecido, sem vaga e sem custo definido (impede checkout).
- Cobrança: falha no PIX, link não pago, webhook duplicado, chargeback, reembolso, falta de técnico.
- Rodízio de exibição: igual oportunidade, elegibilidade em dois fatores (grupo + cadastro), indisponibilidade, recusa, múltiplas solicitações simultâneas, cliente excedendo três solicitações; não criar acionamento operacional por engano.
- Provas e indexação: sem cidades ou números não validados, SSR e gates sem regressão.

**Próxima rodada:** parametrizar o motor de cotação isoladamente depois da confirmação das ambiguidades de cálculo e revisão da estrutura contratual.
