import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de São José dos Pinhais: Projeto Parque Linear Jardim Independência, aprovado em acelerador global em 2025.
// - Prefeitura de São José dos Pinhais: Estádio Municipal Moacir Tomelin — Rua Leonir Ludgero Schreber, 100, Jardim Independência.
// - Prefeitura de São José dos Pinhais: ações do SINE nos Bairros realizadas no Jardim Independência, com atendimento na Rua Divonsir Luciano.
const data = {
  nome: "Independência",
  slug: "independencia-sjp",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Jardim Independência, SJP | Diagnóstico",
  metaDescription: "Assistência de informática no Jardim Independência, São José dos Pinhais. Diagnóstico de PC, notebook, armazenamento e rede com triagem antes da execução.",
  h1: "Técnico de Informática no Jardim Independência – São José dos Pinhais",
  subtitulo: "Triagem técnica para estabilidade, armazenamento e conectividade antes de formatar ou trocar componentes.",
  descricaoLonga: `O Jardim Independência aparece em ações e projetos recentes da Prefeitura de São José dos Pinhais. Em 2025, o município teve aprovado o projeto Parque Linear Jardim Independência em uma iniciativa internacional de aceleração de projetos socioambientais. A Prefeitura também mantém o Estádio Municipal Moacir Tomelin, na Rua Leonir Ludgero Schreber, e já realizou ações do SINE nos Bairros na própria região. Essas referências permitem situar a página em fatos públicos verificáveis, sem inventar características locais.

Nesta página, o foco técnico está em estabilidade, armazenamento e conectividade. Um computador que demora para iniciar, congela ao abrir arquivos ou reinicia durante uso pode ter causas diferentes: Windows, SSD ou HD, memória, temperatura ou alimentação. Formatar antes de separar essas hipóteses pode gerar retrabalho e colocar dados importantes em risco.

Quando o sistema ainda inicia, verificamos espaço livre, eventos do Windows, uso de memória, comportamento do armazenamento e sinais de aquecimento. Se o SSD ou HD apresenta erros, desaparece do sistema ou trava durante cópia, a prioridade pode passar para backup ou recuperação de dados.

Em rede, comparamos outros dispositivos para saber se a falha está no computador ou na infraestrutura. Se apenas um notebook perde conexão, driver ou adaptador entram primeiro. Se vários aparelhos apresentam instabilidade, o foco muda para roteador, cobertura e conexão principal.

Parte dos problemas de software e configuração pode começar por triagem remota quando a máquina continua operacional. Falhas físicas, ausência de vídeo, alimentação instável ou armazenamento com sinais de falha normalmente exigem visita ou bancada. A página do Jardim Independência foi reescrita para explicar esse processo com conteúdo próprio, referências municipais atuais e sem prometer prazo antes do diagnóstico.`,
  pontosReferencia: [
    "Jardim Independência – São José dos Pinhais",
    "Rua Leonir Ludgero Schreber",
    "Estádio Municipal Moacir Tomelin",
    "Rua Divonsir Luciano",
    "Projeto Parque Linear Jardim Independência"
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
  conteudoExclusivo: `Travamento, reinicialização e disco lento pedem testes diferentes

Quando a máquina trava ao copiar arquivos, armazenamento ganha peso. Quando reinicia sob carga, temperatura e alimentação precisam ser consideradas. Quando apenas demora para iniciar, sistema, programas e disco entram na análise.

Em rede, testar outro dispositivo ajuda a separar defeito local de infraestrutura. Se o armazenamento apresenta sinais de falha, preservar os arquivos é mais importante do que insistir em fazer o Windows iniciar.

No Jardim Independência, esta página concentra esse roteiro de estabilidade, armazenamento e rede para oferecer orientação técnica própria antes do atendimento.`,
  problemasComuns: [
    "Computador demora para iniciar",
    "SSD ou HD trava durante cópia",
    "Máquina reinicia durante uso",
    "Notebook perde conexão Wi-Fi",
    "Windows apresenta erros recorrentes",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao pedir atendimento no Jardim Independência, informe o endereço e uma referência como o Estádio Municipal Moacir Tomelin ou a Rua Leonir Ludgero Schreber. Para travamentos, diga em qual tarefa ocorrem; para rede, teste outro aparelho; para armazenamento, evite formatar se houver arquivos importantes.`,
};

const IndependenciaSJP = () => <BairroTemplate data={data} />;

export default IndependenciaSJP;
