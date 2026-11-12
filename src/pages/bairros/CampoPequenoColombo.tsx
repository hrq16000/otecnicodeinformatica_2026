import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de Colombo: Campo Pequeno integra a área atendida pela USF Alexandre Nadolny.
// - Prefeitura de Colombo: nova USF Alexandre Nadolny em construção em 2026 para ampliar o atendimento da região.
// - Lista municipal de saúde: US São Domingos — Rua Ludovico Kachel, 147, Campo Pequeno.
const data = {
  nome: "Campo Pequeno",
  slug: "campo-pequeno",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no Campo Pequeno, Colombo | Suporte",
  metaDescription: "Suporte de informática no Campo Pequeno, Colombo. Diagnóstico de Windows, SSD, memória e estabilidade com triagem antes da execução.",
  h1: "Técnico de Informática no Campo Pequeno – Colombo",
  subtitulo: "Triagem para estabilidade, armazenamento e sistema antes de formatar ou indicar upgrade.",
  descricaoLonga: `O Campo Pequeno aparece de forma explícita nas estruturas municipais de Colombo. A região integra a área atendida pela USF Alexandre Nadolny, que recebeu ordem de serviço para nova unidade em 2026, e a lista municipal de saúde registra a US São Domingos na Rua Ludovico Kachel, dentro do Campo Pequeno. Essas referências dão base local objetiva para a página.

Nesta rota, o foco técnico está em estabilidade, armazenamento e Windows. Um computador que demora para iniciar, congela ao abrir arquivos ou reinicia durante uso pode ter causas diferentes: sistema, SSD ou HD, memória, temperatura ou alimentação. Formatar antes de separar essas hipóteses pode criar retrabalho e colocar dados importantes em risco.

Quando a máquina ainda inicia, verificamos espaço livre, eventos do Windows, uso de memória e comportamento do armazenamento. Se o SSD ou HD apresenta erros, some do sistema ou trava durante leitura e escrita, a prioridade pode mudar para backup ou recuperação de dados.

Se o disco está saudável, a investigação passa para memória, atualização, programas de inicialização e temperatura. Em notebook, fonte e bateria entram quando a estabilidade muda fora da tomada ou sob carga.

Quando o equipamento continua operacional, parte da triagem pode começar remotamente. Falhas físicas, armazenamento instável ou necessidade de desmontagem exigem visita ou bancada. A página do Campo Pequeno foi reescrita para explicar esse diagnóstico com conteúdo próprio e sem tratar formatação ou upgrade como respostas automáticas.`,
  pontosReferencia: [
    "Campo Pequeno – Colombo",
    "Área atendida pela USF Alexandre Nadolny",
    "Rua Ludovico Kachel",
    "US São Domingos"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem do equipamento e do endereço",
  servicosDestaque: [
    "Diagnóstico de SSD e HD",
    "Windows lento ou instável",
    "Teste de memória",
    "Computador que reinicia",
    "Backup e recuperação",
    "Notebook com perda de desempenho"
  ],
  conteudoExclusivo: `Lentidão, travamento e reinicialização não são o mesmo defeito

Se a máquina demora para iniciar, armazenamento e sistema ganham prioridade. Se trava ao copiar arquivos, o SSD ou HD merece atenção. Se reinicia sob carga, temperatura e alimentação precisam entrar no diagnóstico.

Quando há arquivos importantes e sinais de falha no disco, preservar os dados vem antes de reinstalar o Windows.

Essa abordagem dá à página do Campo Pequeno uma intenção própria voltada a estabilidade e armazenamento.`,
  problemasComuns: [
    "Computador demora para iniciar",
    "SSD ou HD trava durante cópia",
    "Máquina reinicia durante uso",
    "Windows entra em reparo automático",
    "Notebook perde desempenho sob carga",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao solicitar atendimento no Campo Pequeno, informe o endereço e uma referência local como a Rua Ludovico Kachel. Para travamentos, diga em qual tarefa aparecem; para armazenamento, evite formatar se houver arquivos importantes; para reinicialização, informe se ocorre sob carga.`,
};

const CampoPequenoColombo = () => <BairroTemplate data={data} />;

export default CampoPequenoColombo;
