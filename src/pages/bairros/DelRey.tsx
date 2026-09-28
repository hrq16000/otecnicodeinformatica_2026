import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de São José dos Pinhais: Del Rey aparece no mapa oficial do município.
// - Secretaria Municipal de Cultura: Del Rey integra os polos descentralizados da Escola da Cultura em 2026.
const data = {
  nome: "Del Rey",
  slug: "del-rey",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Del Rey, SJP | Diagnóstico",
  metaDescription: "Assistência de informática no Del Rey, São José dos Pinhais. Diagnóstico de notebook, armazenamento, Windows e Wi-Fi com triagem antes do reparo.",
  h1: "Técnico de Informática no Del Rey – São José dos Pinhais",
  subtitulo: "Diagnóstico de notebook e armazenamento antes de formatar, trocar peças ou recomendar upgrade.",
  descricaoLonga: `Del Rey aparece no mapa oficial de bairros de São José dos Pinhais e também integra a programação descentralizada da Secretaria Municipal de Cultura em 2026. Essas referências confirmam a localidade e permitem manter a página ancorada em informação pública verificável.

Nesta página, o foco técnico está em notebook, armazenamento e desempenho. Uma máquina que demora para iniciar, perde desempenho com o tempo ou trava durante cópia de arquivos pode ter causas diferentes: Windows, SSD ou HD, memória, temperatura ou energia. Antes de formatar, é preciso separar essas hipóteses.

Quando o sistema ainda inicia, verificamos espaço livre, uso de memória, eventos do Windows e comportamento do armazenamento. Se o SSD ou HD apresenta erros, desaparece ou trava durante leitura e escrita, a prioridade pode mudar para backup ou recuperação de dados.

Em notebook, fonte, bateria e temperatura entram quando há desligamento ou perda de desempenho sob carga. Em Wi-Fi, comparamos outros aparelhos para descobrir se a falha está no notebook ou na infraestrutura.

Se a máquina continua operacional, parte da triagem pode começar remotamente. Falhas físicas, armazenamento instável ou necessidade de desmontagem exigem atendimento presencial ou bancada. A página do Del Rey foi reescrita para explicar esse diagnóstico com conteúdo próprio e sem tratar formatação ou upgrade como solução automática.`,
  pontosReferencia: [
    "Del Rey – São José dos Pinhais",
    "Polo descentralizado da Escola da Cultura no Del Rey"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem do equipamento e do endereço",
  servicosDestaque: [
    "Diagnóstico de SSD e HD",
    "Notebook com lentidão",
    "Análise de bateria e temperatura",
    "Correção de Windows",
    "Diagnóstico de Wi-Fi",
    "Backup e recuperação de arquivos"
  ],
  conteudoExclusivo: `Lentidão não significa automaticamente falta de SSD

Se o computador está lento, primeiro verificamos se o armazenamento é realmente o gargalo. Memória insuficiente, temperatura alta e programas em segundo plano podem produzir sintomas parecidos.

Quando o disco apresenta erros, preservar os arquivos vem antes de reinstalar o sistema. Em notebook que perde desempenho sob carga, temperatura e energia precisam ser consideradas.

Essa lógica dá à página do Del Rey uma intenção própria voltada a desempenho, armazenamento e notebook, evitando uma landing genérica.

Também diferenciamos lentidão contínua de lentidão que aparece apenas após alguns minutos. Quando o problema piora conforme a máquina aquece, temperatura e refrigeração entram na investigação. Quando a lentidão está presente desde a inicialização, armazenamento, memória e programas carregados com o Windows ganham prioridade. Essa distinção ajuda a evitar troca de SSD ou formatação sem evidência de que essas ações realmente resolverão a causa.`,
  problemasComuns: [
    "Notebook demora para iniciar",
    "SSD ou HD apresenta erros",
    "Máquina perde desempenho quando aquece",
    "Windows fica instável",
    "Wi-Fi falha apenas no notebook",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao pedir atendimento no Del Rey, informe o endereço e uma referência local confiável. Para lentidão, diga se começa ao ligar ou depois de algum tempo; para armazenamento, evite formatar quando houver arquivos importantes; para Wi-Fi, teste outro dispositivo no mesmo ponto.`,
};

const DelRey = () => <BairroTemplate data={data} />;

export default DelRey;
