import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de Colombo: US Sede — Rua José Leal Fontoura, 475, Colombo Centro.
// - Prefeitura de Colombo: Secretaria Municipal de Saúde — Rua Francisco Camargo, 238, Centro.
// - Prefeitura de Colombo: CAEC Sede — Rua Venâncio Trevisan, Centro.
const data = {
  nome: "Centro de Colombo",
  slug: "centro-colombo",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no Centro de Colombo | Suporte",
  metaDescription: "Suporte de informática no Centro de Colombo. Diagnóstico de Windows, impressora, rede, aplicativos e notebook com triagem antes da execução.",
  h1: "Técnico de Informática no Centro de Colombo",
  subtitulo: "Triagem para recuperar a função do computador, da rede ou dos periféricos sem reinstalação desnecessária.",
  descricaoLonga: `O Centro de Colombo concentra equipamentos municipais com endereços públicos bem definidos. A Unidade de Saúde Sede funciona na Rua José Leal Fontoura, a Secretaria Municipal de Saúde está na Rua Francisco Camargo e o CAEC Sede utiliza endereço na Rua Venâncio Trevisan. Essas referências permitem localizar o atendimento com precisão sem depender de descrições genéricas.

Nesta página, o foco técnico está em continuidade de uso. Um computador pode continuar ligando e ainda assim interromper uma rotina quando perde acesso à impressora, ao scanner, à rede, ao e-mail ou a um aplicativo importante. Por isso, a primeira pergunta é qual função deixou de funcionar e se o problema afeta uma única máquina ou mais equipamentos.

Quando o Windows ainda inicia, verificamos eventos, drivers, atualizações, uso de memória e comunicação com periféricos. Em impressoras, comparamos fila, conexão e funcionamento em outro computador. Em rede, testamos outros dispositivos antes de atribuir a falha ao roteador ou à conexão principal.

Se o equipamento não liga, perde vídeo ou reinicia sob carga, a linha de diagnóstico muda para alimentação, memória, temperatura e hardware. Em notebook, fonte e bateria entram quando há desligamento ou perda de desempenho. Se existem arquivos locais importantes, backup vem antes de reinstalação.

Problemas de software e configuração podem começar remotamente quando a máquina está operacional. Falhas físicas, desmontagem e testes prolongados exigem visita ou bancada. A página do Centro de Colombo foi reescrita para orientar a recuperação da função principal do equipamento com o menor retrabalho possível.`,
  pontosReferencia: [
    "Rua José Leal Fontoura",
    "US Sede",
    "Rua Francisco Camargo",
    "Secretaria Municipal de Saúde",
    "Rua Venâncio Trevisan",
    "CAEC Sede"
  ],
  tempoDeslocamento: "Agenda definida após triagem do problema e do endereço",
  servicosDestaque: [
    "Correção de Windows e aplicativos",
    "Impressora e periféricos",
    "Diagnóstico de rede",
    "Notebook com falha de desempenho",
    "Backup antes de reinstalação",
    "Avaliação de hardware"
  ],
  conteudoExclusivo: `A função interrompida ajuda a escolher o primeiro teste

Se a impressora para, a investigação começa por comunicação e driver. Se o problema é um aplicativo, verificamos o sistema e o próprio programa. Se vários computadores perdem rede juntos, a infraestrutura ganha prioridade.

Formatação só entra quando existe justificativa técnica e backup resolvido. Quando a máquina não liga, o caminho deixa de ser software.

Essa abordagem dá à página do Centro de Colombo uma função própria voltada a continuidade de uso e redução de retrabalho.`,
  problemasComuns: [
    "Aplicativo importante deixa de abrir",
    "Impressora fica offline",
    "Computador perde acesso à rede",
    "Windows apresenta erro após atualização",
    "Notebook reinicia durante uso",
    "Arquivos locais precisam de backup"
  ],
  dicasLocais: `Ao solicitar atendimento no Centro de Colombo, informe rua, número e uma referência como a US Sede, a Secretaria Municipal de Saúde ou o CAEC Sede. Diga qual atividade ficou interrompida e se outros computadores apresentam o mesmo problema.`,
};

const CentroColombo = () => <BairroTemplate data={data} />;

export default CentroColombo;
