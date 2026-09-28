import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de São José dos Pinhais: a UBS CAIC atende as regiões de Costeira, Barro Preto, Del Rey, Arujá e São Francisco.
// - Secretaria Municipal de Cultura: São Francisco recebe atividades descentralizadas na Escola Municipal Emílio de Menezes.
const data = {
  nome: "São Francisco",
  slug: "sao-francisco",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática em São Francisco, SJP | Diagnóstico",
  metaDescription: "Assistência de informática em São Francisco, São José dos Pinhais. Diagnóstico de notebook, armazenamento, backup e Wi-Fi antes do reparo.",
  h1: "Técnico de Informática em São Francisco – São José dos Pinhais",
  subtitulo: "Diagnóstico de notebook, armazenamento e conectividade antes de formatar ou substituir componentes.",
  descricaoLonga: `São Francisco aparece de forma explícita nas estruturas municipais de São José dos Pinhais. A Prefeitura inclui a região na abrangência da UBS CAIC, e a Secretaria de Cultura utiliza a Escola Municipal Emílio de Menezes como polo descentralizado de atividades. Essas referências dão base real à página sem depender de descrições genéricas do bairro.

Nesta rota, o foco técnico está em notebook, armazenamento e preservação de dados. Uma máquina que demora para iniciar, trava ao abrir arquivos ou perde desempenho conforme aquece pode ter causas diferentes: Windows, SSD ou HD, memória, temperatura ou energia. Antes de formatar, é importante separar essas hipóteses.

Quando o sistema ainda inicia, verificamos espaço livre, eventos, uso de memória e comportamento do armazenamento. Se o disco apresenta erros, desaparece do sistema ou trava durante cópia, a prioridade pode passar para backup ou recuperação de dados.

Em notebook, fonte, bateria e temperatura entram quando há desligamento, autonomia baixa ou queda de desempenho sob carga. Em Wi-Fi, comparamos outros dispositivos para saber se a falha está no notebook ou na infraestrutura.

Se o equipamento está operacional e conectado, parte da triagem pode começar remotamente. Falhas físicas, armazenamento instável ou necessidade de desmontagem exigem visita ou bancada. A página de São Francisco foi reescrita para oferecer orientação técnica própria, sem associar automaticamente lentidão a formatação ou upgrade.`,
  pontosReferencia: [
    "São Francisco – São José dos Pinhais",
    "Área atendida pela UBS CAIC",
    "Escola Municipal Emílio de Menezes",
    "Polo descentralizado da Escola da Cultura"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem do equipamento e do endereço",
  servicosDestaque: [
    "Diagnóstico de notebook lento",
    "Análise de SSD e HD",
    "Backup e recuperação de arquivos",
    "Avaliação de bateria e temperatura",
    "Diagnóstico de Wi-Fi",
    "Correção de Windows"
  ],
  conteudoExclusivo: `Lentidão contínua e lentidão sob carga apontam para causas diferentes

Se a máquina já inicia lenta, armazenamento, memória e programas carregados com o Windows ganham prioridade. Se o desempenho piora apenas depois de alguns minutos, temperatura e alimentação precisam ser consideradas.

Quando o disco mostra sinais de falha, preservar os arquivos vem antes de reinstalar. Em Wi-Fi, comparar outro aparelho ajuda a separar notebook de infraestrutura.

Essa lógica dá à página de São Francisco uma intenção própria voltada a notebook, armazenamento e dados.`,
  problemasComuns: [
    "Notebook demora para iniciar",
    "SSD ou HD apresenta erros",
    "Máquina perde desempenho quando aquece",
    "Bateria perde autonomia rapidamente",
    "Wi-Fi falha apenas no notebook",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao pedir atendimento em São Francisco, informe o endereço e uma referência local confiável. Para lentidão, diga se começa ao ligar ou depois de algum tempo; para armazenamento, evite formatar quando houver arquivos importantes; para Wi-Fi, teste outro dispositivo no mesmo ponto.`,
};

const SaoFrancisco = () => <BairroTemplate data={data} />;

export default SaoFrancisco;
