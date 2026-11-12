# Base para explicar publicamente como funciona a rede

## Resultado da conferência

**Ainda não publicar nem substituir a página pública nesta rodada.** A revisão encontrou dois modelos descritos de forma diferente:

- `src/pages/ComoFunciona.tsx` apresenta o atendimento como serviço realizado por um técnico do portal, descreve triagem, diagnóstico, aprovação e execução e afirma cobertura ampla na Região Metropolitana de Curitiba.
- `src/lib/partnersApi.ts` e `src/lib/partnersAdminApi.ts` implementam consulta de perfis públicos ativos, candidaturas e estados administrativos. O fluxo revisado não registra encaminhamento de solicitação a um grupo, retorno de orçamento do parceiro, repasse da proposta ao cliente nem aceite/recusa.
- A configuração de `partner_program_settings` inclui preço anual configurável para o programa de perfis. Isso precisa ser reconciliado com qualquer afirmação pública de participação gratuita ou ausência de cobrança.
- As regras comerciais do atendimento individual estão centralizadas em `src/lib/config/commercial.ts` e `src/lib/politicaComercial.ts`; não se deve transferi-las automaticamente para a rede independente.

A lacuna é de correspondência entre operação relatada e fluxo que o portal documenta/implementa. Não é evidência de que o processo relatado pelo responsável não ocorra fora do site.

## Fluxo relatado pelo responsável do projeto

O responsável descreveu o seguinte procedimento operacional para a rede de parcerias:

1. O cliente apresenta a necessidade, a localidade e a especialidade solicitada.
2. A solicitação é consultada junto a parceiros compatíveis.
3. Um profissional interessado informa sua própria cotação ou orçamento.
4. O portal repassa a proposta ao cliente.
5. O cliente decide livremente aceitar ou recusar.
6. Se houver aceite, cliente e profissional combinam o agendamento e o atendimento.

Este registro preserva o relato do responsável para orientar a revisão editorial; não o trata como evento auditado, especificação de software ou prova de volume, cobertura, resposta ou conclusão. Cada profissional atua de forma independente; preços, condições e agenda podem variar. Não há confirmação nesta rodada sobre se todo o fluxo acima ocorre no domínio deste portal ou somente em canais externos.

## Rascunho público condicionado

O texto abaixo só pode migrar para uma página pública depois de o responsável confirmar que esse fluxo se aplica ao portal O Técnico de Informática e de a implementação/canal real ser conferido:

> Você informa o que precisa, a cidade e a especialidade. Consultamos parceiros compatíveis; se um profissional tiver disponibilidade e interesse, ele prepara a própria proposta. Repassamos as condições para você decidir se aceita. O agendamento acontece após o aceite e a confirmação entre as partes. Os profissionais são independentes; disponibilidade, preço e condições variam conforme o caso. Consultar a rede não garante que haverá uma proposta ou atendimento.

Não incluir números de parceiros, cidades cobertas, prazo de resposta, taxa de sucesso, “melhores profissionais”, preços ou afirmação de ausência de cobrança sem fonte e aprovação próprias.

## Condições para liberar a página

Antes de atualizar `/como-funciona` ou criar outra rota:

1. Confirmar se o fluxo relatado pertence a este portal, a outro canal ou a mais de um produto; este repositório deve continuar isolado das outras marcas.
2. Revisar e reconciliar o texto atual da página, o modelo comercial individual e a configuração do programa de parceiros, especialmente cobrança/adesão e quem contrata o serviço.
3. Verificar o canal operacional real (formulário, WhatsApp ou grupo privado) e quais etapas ficam registradas; não publicar etapas digitais que o site não executa.
4. Definir como documentar solicitação, retorno, proposta, aceite/recusa, agendamento e resultado sem expor conversas ou dados pessoais.
5. Substituir alegações de cobertura ampla por linguagem condicional alinhada às evidências regionais de `docs/criterios-evidencia-cobertura-regional.md`.
6. Revisar claims, rotas, metadados e requisitos de publicação nos gates existentes. Não alterar preço nem indexação nesta rodada.

## Referências

- `src/pages/ComoFunciona.tsx` — conteúdo público atual.
- `src/lib/partnersApi.ts` e `src/lib/partnersAdminApi.ts` — perfis, candidaturas e estados do programa.
- `src/lib/config/commercial.ts` e `src/lib/politicaComercial.ts` — regras comerciais do atendimento individual.
- `docs/modelo-operacional-rede-parceiros.md` — limites de comunicação e alegações pendentes.
- `docs/metodologia-evidencias-rede-parceiros.md` — método para evidências.
- `docs/criterios-evidencia-cobertura-regional.md` — critérios regionais.
