import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - CNES/DataSUS: Unidade de Saúde da Família Águas Claras — Rua José de Paiva Vidal, 2800, bairro São Marcos, Campo Largo.
// - Cadastro atualizado em 2026, mantido pela Prefeitura Municipal de Campo Largo.
const data = {
  nome: "São Marcos",
  slug: "sao-marcos-campo-largo",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática em São Marcos, Campo Largo | Diagnóstico",
  metaDescription: "Assistência de informática em São Marcos, Campo Largo. Diagnóstico de SSD, HD, Windows, memória e notebook com triagem antes do reparo.",
  h1: "Técnico de Informática em São Marcos – Campo Largo",
  subtitulo: "Diagnóstico de estabilidade e armazenamento antes de formatar, trocar peças ou recomendar upgrade.",
  descricaoLonga: `São Marcos é uma localidade oficialmente identificada em Campo Largo e aparece em cadastro público atualizado do CNES. A Unidade de Saúde da Família Águas Claras está registrada na Rua José de Paiva Vidal, nº 2800, no bairro São Marcos, sob manutenção da Prefeitura Municipal de Campo Largo. Essa referência ajuda a confirmar a localização sem depender de pontos vagos.

Nesta página, o foco técnico está em estabilidade, armazenamento e desempenho. Um computador que demora para iniciar, congela ao abrir arquivos ou reinicia durante uso pode ter causas diferentes: Windows, SSD ou HD, memória, temperatura ou alimentação. Formatar antes de separar essas hipóteses pode gerar retrabalho e colocar arquivos em risco.

Quando o sistema ainda inicia, verificamos espaço livre, eventos do Windows, uso de memória e comportamento do armazenamento. Se o disco apresenta erros, desaparece do sistema ou trava durante cópia, a prioridade muda para backup ou recuperação de dados. Se o armazenamento está saudável, a investigação segue por software, memória, temperatura e alimentação.

Em notebook, fonte, bateria e aquecimento entram quando há desligamento, queda de desempenho ou instabilidade. Em rede, comparamos outros dispositivos para separar falha da estação de problema na infraestrutura.

Se a máquina está operacional e conectada, parte da triagem pode começar remotamente. Falhas físicas, armazenamento instável ou necessidade de desmontagem exigem visita ou bancada. A página de São Marcos foi reescrita para orientar esse processo com conteúdo próprio, referências reais e sem promessa fixa de chegada.`,
  pontosReferencia: [
    "Rua José de Paiva Vidal",
    "Unidade de Saúde da Família Águas Claras",
    "São Marcos – Campo Largo"
  ],
  tempoDeslocamento: "Agenda definida após triagem do equipamento e do endereço",
  tituloSecaoPrincipal: "Armazenamento e inicialização em São Marcos de Campo Largo",
  tituloSecaoContexto: "Disco lento, boot demorado e travamentos: como separar as causas",
  triagemResumo: "Em São Marcos de Campo Largo, a triagem começa pelo momento em que a falha aparece: durante o boot, ao abrir arquivos, ao copiar dados ou depois de algum tempo de uso. Isso ajuda a separar armazenamento, memória, sistema e temperatura sem partir direto para formatação.",
  faqTitulo: "Perguntas sobre boot e armazenamento em São Marcos de Campo Largo",
  faqsCustom: [
    { question: "Computador demora no boot: vocês testam o disco antes de formatar?", answer: "Sim. Verificamos sinais do SSD ou HD, espaço livre e comportamento do sistema. Formatação só entra depois de separar lentidão de software de possível falha física." },
    { question: "Travamento ao copiar arquivos pode indicar problema no armazenamento?", answer: "Pode. Quando a falha aparece durante leitura ou gravação, o armazenamento merece atenção e os dados importantes devem ser preservados antes de testes agressivos." },
    { question: "Como memória insuficiente se diferencia de disco lento?", answer: "Observamos uso de RAM, paginação e resposta do armazenamento durante a tarefa. Os dois gargalos podem parecer semelhantes, mas exigem soluções diferentes." },
    { question: "Quando o backup vira prioridade no atendimento?", answer: "Se o disco apresenta erros, some do sistema ou contém arquivos sem cópia recente, preservar os dados vem antes de reinstalar o sistema ou trocar componentes." },
  ],
  servicosDestaque: [
    "Diagnóstico de SSD e HD",
    "Windows lento ou instável",
    "Teste de memória",
    "Notebook com aquecimento",
    "Backup e recuperação de dados",
    "Avaliação de alimentação"
  ],
  conteudoExclusivo: `Travamento, reinicialização e disco lento precisam ser separados

Quando a máquina trava ao copiar arquivos, armazenamento ganha peso. Quando reinicia sob carga, temperatura e alimentação entram no diagnóstico. Quando apenas demora para iniciar, Windows, programas e disco precisam ser medidos antes de indicar qualquer troca.

Se o SSD ou HD apresenta sinais de falha, preservar os arquivos vem antes de reinstalar o sistema. Se o disco está saudável, a análise pode seguir por memória e software.

Essa lógica dá à página de São Marcos uma função própria voltada a estabilidade e armazenamento, evitando uma landing genérica.`,
  problemasComuns: [
    "Computador demora para iniciar",
    "SSD ou HD apresenta erros",
    "Máquina reinicia durante uso",
    "Notebook aquece e perde desempenho",
    "Windows apresenta falhas recorrentes",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao pedir atendimento em São Marcos, informe o endereço e uma referência como a Rua José de Paiva Vidal ou a Unidade de Saúde Águas Claras. Para travamentos, diga em qual tarefa ocorrem; para armazenamento, evite formatar se houver arquivos importantes; para reinicializações, informe se acontecem sob carga.`,
};

const SaoMarcosCampoLargo = () => <BairroTemplate data={data} />;

export default SaoMarcosCampoLargo;
