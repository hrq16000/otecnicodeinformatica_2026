# Modelo operacional da rede de parceiros

**Status:** documento interno de governança.  
**Escopo:** O Técnico de Informática. Este arquivo não define o modelo de outras marcas ou portais.  
**Regra:** documentação operacional não substitui validação de implementação nem fontes comerciais do projeto.

## 1. Propósito

O portal aproxima pessoas que precisam de assistência técnica de profissionais com especialidade compatível. A atuação da plataforma e a relação entre cliente e profissional devem ser descritas com precisão, sem sugerir emprego, filial, disponibilidade permanente ou cobertura garantida quando isso não estiver comprovado.

A informática permanece o núcleo temático do portal. Outras categorias só devem ser apresentadas quando houver capacidade operacional comprovável e organização editorial própria; não transformar o portal em catálogo genérico.

## 2. Matriz do portal

| Portal | Propósito | Modelo documentado | Intermediação | Contato e negociação | Preço | Relação com profissionais | Evidência disponível |
| --- | --- | --- | --- | --- | --- | --- | --- |
| O Técnico de Informática | Assistência e informação técnica, com informática como núcleo | Atendimento sujeito à avaliação, aprovação prévia e condições comerciais configuradas; encaminhamento a parceiro só pode ser comunicado para o fluxo efetivamente implementado | A confirmar por fluxo e rota antes de cada afirmação pública | WhatsApp é o canal indicado no contrato do repositório; não presumir que toda negociação ocorra diretamente ou seja intermediada da mesma forma | Fonte única em `src/lib/config/commercial.ts` e `src/lib/politicaComercial.ts`; não transcrever valores em duplicidade | Não chamar parceiros de empregados, filiais ou representantes exclusivos sem base verificável | Governança de claims em `docs/eeat-governance.md`; políticas comerciais em `src/lib/config/commercial.ts` e `src/lib/politicaComercial.ts`; fluxo de encaminhamento e resultados da rede ainda precisam de inventário operacional |

Esta matriz descreve apenas o que pode ser governado neste repositório. Um mapa multiportal exige uma fonte central apropriada e inspeção individual de cada produto; não se deve inferir um modelo único para todo o ecossistema.

## 3. Princípios de comunicação

- O cliente pode decidir livremente se aceita uma proposta.
- Disponibilidade, preço, agenda, escopo e condições podem variar conforme o caso e o profissional.
- Só afirmar encaminhamento, resposta, orçamento ou atendimento concluído quando o evento correspondente tiver registro verificável.
- Não prometer que haverá profissional, proposta ou atendimento para toda região ou solicitação.
- Não publicar preços fora das fontes comerciais oficiais.
- Não afirmar gratuidade, ausência de taxa ou condição de participação para profissionais sem confirmar a política vigente deste portal. A configuração comercial existente deve ser conferida antes de qualquer texto público.
- Não publicar quantidade de parceiros, cobertura por município, avaliações, taxa de sucesso ou volume de atendimentos sem evidência aprovada e metodologia documentada.
- Experiência profissional, atividade de assistência, formação da rede e idade da marca/empresa são afirmações distintas; não atribuir a uma pessoa jurídica ou marca uma duração que não esteja comprovada.

## 4. Evidência e linguagem local

A disponibilidade regional é dinâmica. Até que exista evidência suficiente, usar linguagem condicional, por exemplo: **“Consultamos a disponibilidade compatível com a região e a especialidade solicitada.”** A frase só deve ser publicada se corresponder ao fluxo real do portal.

Para governança interna, registrar separadamente:

1. atendimento concluído com prova operacional;
2. parceiro identificado e com atividade confirmada na região;
3. resposta ou proposta recebida para solicitação naquela região;
4. região consultável na rede, sem confirmação de parceiro ativo ou atendimento.

Essas categorias são uma proposta de classificação interna; não são selo, garantia de cobertura ou promessa ao usuário. Devem ser validadas antes de orientar indexação local. Páginas por cidade e serviço continuam sujeitas às políticas editoriais e de indexação existentes: demanda real, conteúdo original, utilidade e evidência regional, sem combinação automática de localidades.

## 5. Alegações ainda não aprovadas para publicação

Os pontos abaixo não devem virar copy, metadata, schema, anúncio ou página indexável até que haja validação:

- total de profissionais parceiros, inclusive alegações arredondadas;
- distribuição por estado, cidade ou especialidade;
- número de grupos, cadastros, solicitações encaminhadas ou respostas;
- volume de propostas ou serviços concluídos;
- disponibilidade contínua em uma região;
- gratuidade ou custo de participação de profissionais;
- presença de profissionais de outras especialidades no fluxo deste portal;
- história de “três décadas” atribuída a pessoa, empresa ou marca específica;
- método de seleção, avaliação ou permanência na rede além do que estiver documentado e praticado.

A informação fornecida pelo responsável do projeto orienta a investigação, mas não é por si só um registro operacional auditável para fins de publicação.

## 6. Próximos registros necessários

Antes de aprovar claims públicos sobre a rede, preparar um snapshot interno agregado e sem dados pessoais desnecessários, contendo:

- data da extração, fontes e responsável pela coleta;
- definição do que conta como cadastro, parceiro ativo e duplicidade;
- total bruto, regras de deduplicação e total conservador;
- recorte temporal e critério de atividade;
- agregação geográfica e por especialidade, com limites contra reidentificação;
- evidência para solicitações, respostas, propostas e atendimentos, mantidos como eventos diferentes;
- revisão de acesso, retenção e privacidade antes de guardar ou compartilhar dados.

Não incluir telefones em massa, documentos, endereços residenciais ou conversas privadas neste repositório público. Relatórios detalhados devem permanecer em ambiente controlado; publicar apenas agregados aprovados.

## 7. Revisão e fontes de verdade

Revisar este documento quando o fluxo real ou a política comercial mudar. A implementação deve ser inspecionada antes de descrever telas, encaminhamentos ou mecanismos técnicos. Claims publicados continuam sujeitos ao ledger e aos gates de confiança do projeto.

Fontes internas relacionadas:

- `AGENTS.md` — limites de marca, publicação e validação;
- `docs/eeat-governance.md` — critérios para provas e claims;
- `src/lib/config/commercial.ts` e `src/lib/politicaComercial.ts` — regras comerciais;
- `config/trust-claims-ledger.json` — estado de claims aprovados, pendentes ou removidos.
