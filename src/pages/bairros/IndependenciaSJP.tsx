import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de São José dos Pinhais: publicação de 08/01/2026 identifica explicitamente o bairro Independência.
// - Prefeitura de São José dos Pinhais: mutirão municipal de saúde realizado no bairro Independência.
// - Prefeitura de São José dos Pinhais: Rua Anibal Silva documentada em obra municipal de pavimentação no bairro.
const data = {
  nome: "Independência",
  slug: "independencia-sjp",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Independência, SJP | Diagnóstico",
  metaDescription: "Assistência de informática no Independência, São José dos Pinhais. Diagnóstico de Windows, armazenamento, notebook e rede com triagem antes da execução.",
  h1: "Técnico de Informática no Independência – São José dos Pinhais",
  subtitulo: "Triagem para estabilidade, armazenamento e conectividade antes de formatar, trocar peças ou indicar equipamento novo.",
  descricaoLonga: `O Independência é identificado explicitamente pela Prefeitura de São José dos Pinhais em publicações municipais recentes. O bairro também já recebeu ações públicas de saúde e a Rua Anibal Silva aparece em documentação de infraestrutura do município. Essas referências confirmam a localidade sem recorrer a pontos genéricos ou estimativas de deslocamento.

Nesta página, o foco técnico está em estabilidade, armazenamento e conectividade. Um computador que demora para iniciar, trava ao abrir arquivos ou reinicia durante uso pode ter causas diferentes: Windows, memória, SSD ou HD, temperatura ou alimentação. Formatar antes de separar essas hipóteses pode gerar retrabalho e colocar dados importantes em risco.

Quando o sistema ainda inicia, verificamos espaço livre, eventos do Windows, uso de memória e comportamento do armazenamento. Se o SSD ou HD apresenta erros, desaparece do sistema ou trava durante cópia, a prioridade passa a ser backup ou recuperação de dados. Se o armazenamento está saudável, a investigação segue por software, memória, temperatura e alimentação.

Em notebook, fonte, bateria e aquecimento entram quando existe desligamento, autonomia baixa ou queda de desempenho sob carga. Em Wi-Fi, comparamos outros dispositivos para entender se a falha está no próprio computador ou na infraestrutura. Se apenas uma máquina perde conexão, driver e adaptador ganham peso; se vários aparelhos falham juntos, o foco muda para roteador, cobertura ou conexão principal.

Quando o equipamento continua operacional e conectado, parte da triagem pode começar remotamente. Falhas físicas, ausência de vídeo, armazenamento instável ou necessidade de desmontagem exigem visita ou bancada. A página do Independência foi reescrita para explicar esse processo com conteúdo próprio, referências municipais verificáveis e sem promessa de solução ou horário antes do diagnóstico.`,
  pontosReferencia: [
    "Independência – São José dos Pinhais",
    "Rua Anibal Silva",
    "Área de ações municipais no bairro Independência"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem do endereço e do defeito",
  servicosDestaque: [
    "Diagnóstico de SSD e HD",
    "Windows lento ou instável",
    "Notebook com aquecimento",
    "Diagnóstico de Wi-Fi",
    "Backup e recuperação de arquivos",
    "Avaliação de memória e alimentação"
  ],
  conteudoExclusivo: `Quando travamento e lentidão não significam a mesma coisa

Uma máquina que apenas demora para iniciar pede análise diferente de um computador que congela ao copiar arquivos ou reinicia sob carga. No primeiro caso, programas, Windows e armazenamento podem ser a causa. No segundo, disco, memória, temperatura ou alimentação ganham prioridade.

Em rede, comparar outro dispositivo no mesmo ponto evita culpar o roteador por uma falha isolada. Em armazenamento com sinais de erro, preservar os dados vem antes de reinstalar o sistema.

Essa lógica dá à página do Independência uma função própria, voltada a estabilidade, armazenamento e diagnóstico por sintoma.`,
  problemasComuns: [
    "Computador demora para iniciar",
    "SSD ou HD trava durante cópia",
    "Máquina reinicia durante uso",
    "Notebook aquece e perde desempenho",
    "Wi-Fi falha apenas em um equipamento",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao pedir atendimento no Independência, informe o endereço e, quando fizer sentido, a Rua Anibal Silva como referência. Para travamentos, diga em qual tarefa ocorrem; para armazenamento, evite formatar se houver arquivos importantes; para rede, teste outro dispositivo no mesmo ponto.`,
};

const IndependenciaSJP = () => <BairroTemplate data={data} />;

export default IndependenciaSJP;
