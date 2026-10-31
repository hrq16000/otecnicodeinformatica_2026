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

### Rodada 3 — filtro e rodízio puros (NÃO integrados a cadastro)

O protótipo interno `src/lib/gestaoNacional/rodizioRegional.ts`, acompanhado de `rodizioRegional.test.ts`, foi adicionado à mesma PR, sem tocar nas rotas em produção. Ele é **exclusivamente uma função pura de apresentação**: não busca contatos reais, não registra membros do WhatsApp, não contrata, não dispara mensagens, não cobra e não confirma solicitações.

- Considera elegível somente o técnico cujo **vínculo à comunidade tenha sido confirmado separadamente**, cadastro da plataforma validado, habilitação aprovada e disponibilidade atual explícita. **222 membros no print ≠ 222 elegíveis**.
- Filtra por UF, município exato, especialidade de atendimento e raio aceito, exigindo distância interna conhecida. A função trabalha sem nome, telefone ou endereço pessoal.
- Retorna apenas ID interno e um **cursor de continuidade**; entre elegíveis, alterna por identificador estável, nunca por preço, impulso comercial, proximidade preferencial ou intervenção manual.
- O cursor necessita de armazenamento privado com atualização **atômica por região + serviço**; auditoria de exibição, expiração/recusa, duplo aceite e autorização de acesso permanecem para uma camada de backend futura. Sem isso, a função é apenas um algoritmo e **não é rodízio operacional funcional**.
- Nenhuma base de técnicos foi criada ou importada. Não cadastrar usuários fictícios ou transformar nomes de capturas em perfis sem consentimento e verificação.

### Rodada 4 — fluxo de contratação e prévia de conteúdo isolados

**Código entregue, sem ativação:**
- `src/lib/gestaoNacional/contratacaoDiretaNacional.ts` e teste: limite **3 solicitações por cliente por data civil**, somente **serviços distintos**, verificação de idempotência, bloqueio de ID reaproveitado para outro pedido e rejeição de registros inválidos.
- Cancelamentos no mesmo dia **continuam consumindo o limite** como política conservadora provisória; eventual exceção depende de definição de suporte, regras antifraude e direito do consumidor.
- O limite **não deve** ser implementado contando apenas em memória/frontend: precisa de autenticação, fuso de referência oficialmente definido, persistência transacional, índice único (cliente + data + serviço/solicitação) e auditoria de concorrência antes de ser acionado em produção.
- Máquina declarativa de estados: rascunho → cotação aceita → aguardando pagamento; confirmação de pagamento **sempre bloqueada por ausência de integração segura**. Não existe checkout nem pagamento validado neste código. Reembolso igualmente bloqueado até integração.
- `src/components/gestaoNacional/PreviaAtendimentoNacional.tsx`: componente de **prévia não importado por nenhuma rota**, com comunicação para cliente e profissional, taxas incluídas e link de ingresso no grupo exclusivamente para técnicos. A cópia apresenta explicitamente o status de proposta, sem prometer abrangência.

**Integrações ainda necessárias antes de publicação:**
1. Revisão contratual e de direito concorrencial sobre a alegação de não intermediação, cobrança/repasse, oferta comercial e responsabilidade pela contratação direta.
2. Cadastro e validação real dos prestadores, participação confirmada na comunidade, disponibilidade consentida por cidade/UF, identidade e proteção de dados.
3. Persistência segura/atômica do cursor de rodízio por região e serviço; identificação e limitação transacional do cliente; registro de aceite do técnico.
4. Provedor de pagamento oficial com autenticação de webhook, assinatura validada, valores e moedas conferidos com cotação imutável, idempotência, conciliação, reembolsos, tributação/documentos fiscais e tratamento de chargeback.
5. Política de cancelamento, indisponibilidade, devolução, privacidade, adequação às normas consumeristas; testes de ponta a ponta, gates e observação real do deploy.

**Condição de publicação:** nenhuma rota pública, botão de compra, cobrança, cadastro ou preço vigente será alterado pela PR enquanto o fluxo inteiro não estiver validado. Pode-se dividir a publicação em PRs independentes posteriormente; aprovação de código puro não equivale a lançamento operacional.

### Rodada 5 — avanço de integração transacional (ainda não operacional)
- `src/lib/gestaoNacional/rodizioTransacional.ts` e teste: interface explícita para executar a **apresentação do próximo profissional dentro de uma transação exclusiva** por UF/município/serviço, consultar o cursor e gravar o registro com chave de idempotência. Em testes com armazenamento simulado e lock, dois pedidos simultâneos alternam A/B sem colisão; retries do mesmo pedido não consomem a próxima posição.
- Antes de ler ou avançar a fila, o backend deve comprovar **solicitação autenticada, valor pago, pagamento conciliado e escopo regional correspondente**; na ausência da verificação o retorno é `nao_autorizado` e o cursor permanece inalterado. Não aceitar clique, print de PIX ou confirmação do navegador.
- A fonte de profissionais deve ser lida **dentro da transação**, com confirmação atual de vínculo à comunidade, cadastro validado, capacitação e disponibilidade. O registro devolve apenas ID interno, não contato ou oferta de serviço ao profissional.
- **Sem banco real, autenticação, lock efetivo entre instâncias ou índice único global de solicitação.** O adapter de persistência de produção ainda é obrigatório e deve garantir atomicidade, rollback e autorização. Sem ele não há rodízio funcional nem canal de contratação ativo.
- `src/components/gestaoNacional/PreviaAtendimentoNacional.tsx` passou a ler os preços de `POLITICA_NACIONAL_PROPOSTA`, eliminando cópias manuais na prévia. O componente continua sem rota, sem CTA de cobrança e sem SEO público.
- Uma apresentação de perfil não é despacho, mensagem automática, contratação, pagamento ou confirmação de disponibilidade para atender. É necessário definir consentimento, expiração da exibição, indisponibilidade entre consulta e contratação, e auditoria.
- O resultado da revisão jurídica da cobrança e dos repasses permanece requisito anterior à habilitação pública; a classificação de “não intermediadora” é funcional, não uma conclusão jurídica presumida.

### Rodada 6 — reaproveitamento do cadastro existente (sem cadastro duplicado)

**Inspeção real do repositório:** a plataforma já possui `src/lib/partnersApi.ts`, `src/lib/partnersAdminApi.ts`, `src/pages/profissionais/CadastroParceiro.tsx`, `src/pages/profissionais/AreaParceiro.tsx`, `src/pages/admin/AdminParceiros.tsx` e os tipos existentes de `partners`/`partners_public`. O formulário já permite identidade profissional, município, UF, serviços e especialidades; o painel já registra aprovação administrativa. Porém, o cadastro existente é um **programa de perfis com plano anual**; `status=ativo` não comprova participação no grupo, competência validada para esta modalidade, disponibilidade ou cobertura para visita.

**Ponte codificada:** `src/lib/gestaoNacional/parceiroExistenteAdapter.ts` e `.test.ts` reutilizam somente `id/status/cidade/estado` do tipo administrativo existente; exigem confirmação **separada e atual** de grupo WhatsApp, habilitação nacional, aceite de termos da modalidade, municípios e serviços validados e disponibilidade com expiração. Nada é inferido do contador do grupo, de serviços em texto livre, de cidade/UF não normalizadas ou do plano anual. A ponte devolve apenas ID interno e os campos necessários ao filtro; nenhum telefone, documento ou endereço privado.

**Limite exato:** é uma transformação pura sobre dados já autorizados. O cadastro existente não foi modificado, e **não existe confirmação nacional persistida, painel de validação nacional nem integração real com a fila**. Antes de conectar essa ponte ao cadastro vivo, o backend precisa guardar atestações administrativas verificáveis (sem confiar em dados fornecidos pelo cliente), consentimento e disponibilidade com prazo de expiração, controles de acesso e trilha de auditoria. O programa anual de perfis não deve ser automaticamente imposto aos novos profissionais da modalidade nacional nem cancelado/alterado sem política comercial própria.

**Próxima dependência:** definir modo de registro das confirmações complementares, com autoridade do administrador e permissão de atualização de disponibilidade pelo próprio profissional (sem permitir autoaprovação da comunidade ou da habilitação), respeitando LGPD. Nenhuma nova tabela ou migração foi aplicada nesta rodada.

### Rodada 7 — controle de validação administrativa (somente domínio, ainda sem banco)

Arquivos adicionados: `src/lib/gestaoNacional/validacaoAdministrativa.ts` e `validacaoAdministrativa.test.ts`, ambos isolados das rotas e do cadastro em produção.

- **Administração autenticada:** exclusivamente valida a participação na comunidade (evidência interna), habilita a modalidade nacional mediante aceite de termos e cobertura/serviços comprovados, ou suspende um profissional. Não pode aprovar o próprio perfil. Perfil sem titular autenticado vinculado não pode ser habilitado.
- **Profissional autenticado titular:** exclusivamente aceita uma versão de termos e define sua disponibilidade, com expiração. Não pode confirmar a própria comunidade, aprovar habilitação, criar municípios/serviços validados ou alterar o raio certificado.
- **Desabilitação imediata da disponibilidade:** ao retirar confirmação da comunidade, suspender habilitação ou aceitar nova versão dos termos (que exige renovação da habilitação).
- **Sem disponibilidade permanente:** janela de disponibilidade expira, com teto técnico **provisório de 24h** (não é promessa de atendimento ou SLA; confirmar parâmetro antes da operação). A avaliação de elegibilidade continua exigindo confirmação atual e distância confiável.
- **Concorrência e auditoria:** aplicação pura exige revisão esperada e produz metadados de evento sem CPF/telefone. O futuro backend precisa de `UPDATE ... WHERE revisao = revisaoEsperada` atômico, trilha de auditoria imutável e transação única. Um teste em memória **não** substitui essas garantias.
- **Fronteira de confiança:** papel de administrador, titularidade (`partners.user_id`), sessão autenticada e evidências da comunidade devem ser obtidos de fonte confiável do servidor, nunca de campos do formulário ou credenciais no browser. Limitar acesso por titular e administrador com verificações de permissão no banco/servidor. Não confiar exclusivamente na indicação de role enviada pelo cliente.
- **Dados pessoais:** nenhuma lista do grupo é importada; não há coleta de nomes/telefones dos 222 membros por screenshots. Um vínculo confirmado é uma atestação auditável, não uma suposição baseada no contador de membros.

**Status:** sem novas rotas, sem endpoint, sem migração SQL, sem leitura/gravação de banco nem permissão nova. O produto ainda não pode receber chamados ou declarar 222 técnicos disponíveis. Falta decidir e implementar armazenamento seguro de atestações nacionais usando IDs do cadastro existente, sem acoplar taxa por chamado ao plano anual legado. Revisão jurídica, fiscal, proteção de dados e validações de CI continuam pendentes.

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
