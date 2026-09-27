import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Araucária: UBS Tupy — Rua Prímula, 1830, Campina da Barra.
// - Plano Municipal de Saúde registra a região de Campina da Barra na cobertura da UBS Tupy.
const data = {
  nome: "Campina da Barra",
  slug: "campina-da-barra",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática na Campina da Barra, Araucária | Notebook",
  metaDescription: "Assistência de informática na Campina da Barra, Araucária. Diagnóstico de notebook, bateria, fonte, aquecimento e Windows com triagem antes do reparo.",
  h1: "Técnico de Informática na Campina da Barra – Araucária",
  subtitulo: "Diagnóstico de notebook e energia antes de trocar bateria, fonte ou formatar.",
  descricaoLonga: `A Campina da Barra possui referência municipal clara em Araucária. A Prefeitura registra a UBS Tupy na Rua Prímula, e documentos do município vinculam a unidade à região da Campina da Barra. Isso permite situar a página com base em uma referência pública real, sem depender de descrições genéricas.

O foco técnico desta rota está em notebook, energia e temperatura. Quando um notebook não carrega, a causa pode estar na fonte, bateria, conector ou circuito interno. Trocar bateria por tentativa pode não resolver se o problema estiver no carregador ou na entrada de energia. Da mesma forma, uma máquina que desliga sob carga pode estar sofrendo com temperatura elevada, alimentação instável ou outro componente.

Antes de recomendar peça, observamos sinais simples: LEDs, comportamento da fonte, autonomia fora da tomada, carregamento intermitente e mudança de desempenho quando o equipamento aquece. Se o Windows ainda inicia, também verificamos uso de memória, armazenamento e temperatura para separar gargalo de software de falha física.

Quando existem arquivos importantes, o backup é considerado antes de qualquer reinstalação. Se o SSD ou HD apresenta travamentos, erros ou desaparece do sistema, a prioridade pode mudar para preservação dos dados. Em casos de falha de energia ou conector, a avaliação presencial ou em bancada costuma ser mais adequada.

A página da Campina da Barra foi reescrita para explicar esse processo de diagnóstico de notebook e energia com conteúdo próprio. A referência do bairro organiza a logística; a solução é escolhida depois de identificar o componente ou sistema realmente envolvido.`,
  pontosReferencia: [
    "Rua Prímula",
    "UBS Tupy",
    "Campina da Barra – Araucária"
  ],
  tempoDeslocamento: "Atendimento combinado após triagem do notebook e do endereço",
  servicosDestaque: [
    "Notebook que não carrega",
    "Diagnóstico de bateria e fonte",
    "Conector de energia",
    "Análise de aquecimento",
    "Correção de Windows",
    "Backup antes de reparo"
  ],
  conteudoExclusivo: `Bateria, fonte e conector precisam ser separados no diagnóstico

Um notebook que não carrega pode mostrar o mesmo sintoma em falhas diferentes. Se a fonte está instável, trocar a bateria não resolve. Se o conector tem mau contato, a alimentação pode interromper mesmo com carregador bom. Se o equipamento perde desempenho sob carga, temperatura também entra no diagnóstico.

Observar LEDs, autonomia e comportamento na tomada reduz bastante as hipóteses antes de desmontar. Quando há dados importantes, eles também precisam ser considerados antes de qualquer reinstalação.

Na Campina da Barra, esta página tem foco específico em notebook e energia para não repetir o conteúdo das demais localidades.`,
  problemasComuns: [
    "Notebook não carrega",
    "Bateria dura poucos minutos",
    "Conector de energia apresenta mau contato",
    "Máquina aquece e reduz desempenho",
    "Notebook desliga sob carga",
    "Windows precisa de reparo sem perder arquivos"
  ],
  dicasLocais: `Ao pedir atendimento na Campina da Barra, informe a rua e uma referência como a UBS Tupy ou a Rua Prímula. Para falha de carga, diga se LEDs acendem e se outra fonte já foi testada. Para aquecimento, informe em qual tarefa o problema aparece.`,
};

const CampinaDaBarra = () => <BairroTemplate data={data} />;

export default CampinaDaBarra;
