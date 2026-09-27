import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de São José dos Pinhais: UBS Campo Largo da Roseira — Rua Antonio Singer, s/n.
// - Secretaria Municipal de Educação: Escola Municipal Clodoaldo Naumann — Rua Antônio Singer, 7460.
// - Secretaria Municipal de Educação: CMEI Professora Maria da Piedade de Souza Cortes — Rua Francisco Honório Claudino, 129.
// - Prefeitura/IBGE reconhecem Campo Largo da Roseira como distrito administrativo do município.
const data = {
  nome: "Campo Largo da Roseira",
  slug: "campo-largo-roseira-sjp",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática em Campo Largo da Roseira, SJP | Diagnóstico",
  metaDescription: "Assistência de informática em Campo Largo da Roseira, São José dos Pinhais. Diagnóstico de PC, notebook, armazenamento e rede com triagem antes da execução.",
  h1: "Técnico de Informática em Campo Largo da Roseira – São José dos Pinhais",
  subtitulo: "Triagem técnica para armazenamento, estabilidade e conectividade antes de formatar ou trocar componentes.",
  descricaoLonga: `Campo Largo da Roseira possui identidade administrativa própria dentro de São José dos Pinhais. A Prefeitura mantém a UBS Campo Largo da Roseira na Rua Antonio Singer, enquanto a rede municipal de educação registra a Escola Municipal Clodoaldo Naumann na mesma via e o CMEI Professora Maria da Piedade de Souza Cortes na Rua Francisco Honório Claudino. O município também reconhece Campo Largo da Roseira como distrito administrativo.

Nesta página, o foco técnico está em estabilidade, armazenamento e conectividade. Um computador que demora para iniciar, congela ao abrir arquivos ou reinicia durante uso pode ter causas diferentes: Windows, SSD ou HD, memória, temperatura ou alimentação. Formatar antes de separar essas hipóteses pode gerar retrabalho e colocar dados importantes em risco.

Quando a máquina ainda inicia, verificamos espaço livre, eventos do sistema, uso de memória, comportamento do armazenamento e sinais de aquecimento. Se o SSD ou HD apresenta erros, desaparece do sistema ou trava durante cópia, a prioridade pode passar para backup ou recuperação de dados antes de qualquer reinstalação.

Em rede, comparamos outros dispositivos para entender se a falha está no computador ou na infraestrutura. Se apenas um notebook perde conexão, driver ou adaptador entram primeiro. Se vários aparelhos apresentam instabilidade, o foco muda para roteador, cobertura ou conexão principal.

Parte dos problemas de software e configuração pode começar por triagem remota quando o equipamento está operacional e conectado. Falhas físicas, ausência de vídeo, alimentação ou armazenamento instável normalmente exigem visita ou bancada. A página de Campo Largo da Roseira foi reescrita para explicar essa decisão com conteúdo próprio, referências municipais verificáveis e sem promessas de prazo antes do diagnóstico.`,
  pontosReferencia: [
    "Rua Antonio Singer",
    "UBS Campo Largo da Roseira",
    "Escola Municipal Clodoaldo Naumann",
    "Rua Francisco Honório Claudino",
    "CMEI Professora Maria da Piedade de Souza Cortes"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem do endereço e do defeito",
  servicosDestaque: [
    "Diagnóstico de SSD e HD",
    "Computador que reinicia ou trava",
    "Correção de Windows",
    "Backup e recuperação de arquivos",
    "Diagnóstico de Wi-Fi e rede",
    "Avaliação de memória e temperatura"
  ],
  conteudoExclusivo: `Travamento, reinicialização e disco lento não são o mesmo problema

Quando uma máquina trava ao copiar arquivos, armazenamento ganha peso. Quando reinicia sob carga, temperatura e alimentação precisam ser consideradas. Quando apenas demora para iniciar, sistema, programas e disco entram na análise.

Em rede, testar outro dispositivo ajuda a separar defeito local de infraestrutura. Em armazenamento com sinais de falha, preservar os arquivos é mais importante do que insistir em fazer o Windows iniciar.

Em Campo Largo da Roseira, esta página concentra esse roteiro de estabilidade e armazenamento para oferecer uma orientação técnica própria antes do atendimento.`,
  problemasComuns: [
    "Computador demora para iniciar",
    "SSD ou HD trava durante cópia",
    "Máquina reinicia durante uso",
    "Notebook perde conexão Wi-Fi",
    "Windows apresenta erros recorrentes",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao pedir atendimento em Campo Largo da Roseira, informe o endereço e uma referência como a UBS, a Escola Clodoaldo Naumann ou a Rua Antonio Singer. Para travamentos, diga em qual tarefa ocorrem; para rede, teste outro aparelho; para armazenamento, evite formatar se houver arquivos importantes.`,
};

const CampoLargoSJP = () => <BairroTemplate data={data} />;

export default CampoLargoSJP;
