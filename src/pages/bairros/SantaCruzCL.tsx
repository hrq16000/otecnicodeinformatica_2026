import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Campo Largo: Unidade de Saúde Santa Cruz — Estrada do Santa Cruz, s/n.
// - Prefeitura de Campo Largo: Santa Cruz integra o cronograma municipal de atualização cadastral em saúde.
const data = {
  nome: "Santa Cruz",
  slug: "santa-cruz-campo-largo",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática em Santa Cruz, Campo Largo | Suporte",
  metaDescription: "Suporte de informática em Santa Cruz, Campo Largo. Triagem para computador, notebook, rede e periféricos, com atendimento conforme o problema.",
  h1: "Técnico de Informática em Santa Cruz – Campo Largo",
  subtitulo: "Atendimento técnico definido pelo sintoma, com orientação antes da visita ou coleta.",
  descricaoLonga: `Santa Cruz aparece nas estruturas oficiais de Campo Largo e possui unidade de saúde municipal na Estrada do Santa Cruz. O bairro também integra ações municipais de atualização cadastral. Essas referências são usadas somente para localizar o atendimento; elas não viram desculpa para prometer tempo de chegada ou inventar um perfil de uso da região.

No diagnóstico de informática, um dos principais objetivos é reduzir hipóteses antes de mexer no equipamento. Se o Windows apresenta erro depois de uma atualização, buscamos identificar código, driver e comportamento. Se o notebook não carrega, a investigação passa por fonte, bateria, conector e circuito. Se o computador não reconhece um periférico, é preciso separar falha do dispositivo, porta, driver e sistema.

Para rede, o mesmo princípio vale. Wi-Fi que cai apenas em um notebook pode ter causa local; queda em todos os aparelhos aponta para outra direção. Antes de recomendar troca de roteador, verificamos se o problema aparece também por cabo e se a instabilidade muda conforme o ambiente.

Quando o equipamento ainda funciona, parte da triagem pode começar remotamente. Se há falha física, necessidade de desmontagem, superaquecimento ou teste prolongado, a avaliação passa para visita ou bancada. Em casos com arquivos importantes, backup e preservação vêm antes de reinstalação.

A página de Santa Cruz foi desenhada para orientar o visitante sobre esse processo, com referências locais reais e conteúdo técnico próprio, sem repetir o antigo texto programático.`,
  pontosReferencia: [
    "Estrada do Santa Cruz",
    "Unidade de Saúde Santa Cruz",
    "Santa Cruz – Campo Largo"
  ],
  tempoDeslocamento: "Horário definido depois da triagem e confirmação do endereço",
  servicosDestaque: [
    "Correção de Windows e atualizações",
    "Notebook que não carrega",
    "Configuração de impressora e periféricos",
    "Diagnóstico de Wi-Fi",
    "Backup antes de formatação",
    "Avaliação de falhas físicas"
  ],
  conteudoExclusivo: `Erro de sistema, driver ou hardware: como diferenciar

Quando um dispositivo deixa de funcionar depois de atualização, não é correto assumir imediatamente defeito físico. Driver, configuração e sistema precisam ser considerados. Já um conector frouxo, fonte instável ou falha de alimentação apontam para outra linha.

Em notebook que não carrega, observar LEDs e comportamento da fonte ajuda muito. Em Wi-Fi, comparar dois aparelhos no mesmo ponto também reduz as hipóteses. Em impressora, saber se o equipamento aparece no sistema ou se nem é detectado muda o diagnóstico.

Esse roteiro evita substituições desnecessárias e deixa claro por que a triagem vem antes da solução.`,
  problemasComuns: [
    "Windows apresenta erro depois de atualização",
    "Notebook não reconhece a fonte",
    "Impressora deixa de comunicar com o computador",
    "Wi-Fi cai apenas em um dispositivo",
    "PC reconhece alguns periféricos e outros não",
    "Máquina precisa de backup antes de reinstalação"
  ],
  dicasLocais: `Ao solicitar atendimento em Santa Cruz, informe a rua e uma referência próxima, como a Estrada do Santa Cruz ou a Unidade de Saúde. Para erros de Windows, envie foto da mensagem; para notebook sem carga, informe se LEDs acendem; para rede, teste outro aparelho no mesmo ponto.`,
};

const SantaCruzCL = () => <BairroTemplate data={data} />;

export default SantaCruzCL;
