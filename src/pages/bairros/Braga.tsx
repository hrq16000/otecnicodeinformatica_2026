import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de São José dos Pinhais: Unidade de Saúde Braga integra a rede municipal.
// - Escola Municipal Pedro Moro Redeschi — Rua Joinville, 2678, Vila Braga.
// - Escola Municipal Madre Paulina — Rua Campo Largo, 920, Braga.
const data = {
  nome: "Braga",
  slug: "braga",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Braga, SJP | Suporte",
  metaDescription: "Suporte de informática no Braga, São José dos Pinhais. Diagnóstico de PC, rede, Windows e periféricos com triagem antes da execução.",
  h1: "Técnico de Informática no Braga – São José dos Pinhais",
  subtitulo: "Triagem para computador, rede e periféricos com foco em continuidade de uso e redução de retrabalho.",
  descricaoLonga: `O Braga possui referências municipais claras em São José dos Pinhais. A rede pública mantém a Unidade de Saúde Braga, a Escola Municipal Pedro Moro Redeschi na Rua Joinville e a Escola Municipal Madre Paulina na Rua Campo Largo. Essas referências permitem localizar o atendimento com base em dados públicos verificáveis.

Nesta página, o foco técnico está em continuidade de uso, rede e periféricos. Um computador pode ligar normalmente e ainda assim ficar praticamente parado quando perde acesso à internet, impressora, arquivos compartilhados ou aplicativos importantes. Por isso, a triagem começa pela função que deixou de funcionar.

Se o Windows ainda inicia, verificamos eventos, drivers, atualizações, uso de memória e comunicação com dispositivos. Em impressoras, testamos fila, conexão e disponibilidade em outro computador. Em rede, comparamos outras estações antes de atribuir a falha ao roteador.

Quando o PC não liga, perde vídeo ou reinicia sob carga, o diagnóstico muda para alimentação, memória, temperatura e hardware. Se o armazenamento apresenta erros, backup e preservação de dados entram antes de reinstalação. Em notebook, bateria e fonte também são consideradas quando há perda de desempenho.

Parte das falhas de software e configuração pode começar remotamente quando a máquina continua operacional. Falhas físicas, desmontagem e testes prolongados exigem visita ou bancada. A página do Braga foi reescrita para explicar essa diferença com conteúdo próprio e sem prometer solução ou prazo antes do diagnóstico.`,
  pontosReferencia: [
    "Unidade de Saúde Braga",
    "Rua Joinville",
    "Escola Municipal Pedro Moro Redeschi",
    "Rua Campo Largo",
    "Escola Municipal Madre Paulina"
  ],
  tempoDeslocamento: "Agenda definida após triagem do problema e do endereço",
  servicosDestaque: [
    "Correção de Windows e drivers",
    "Configuração de rede",
    "Impressora e periféricos",
    "Diagnóstico de PC sem vídeo",
    "Backup antes de reinstalação",
    "Avaliação de SSD e memória"
  ],
  conteudoExclusivo: `Quando a máquina liga, mas a rotina para

Perder acesso à rede, à impressora ou a um programa pode ser tão crítico quanto uma falha física. O primeiro passo é saber se o problema atinge apenas uma estação ou várias.

Se apenas um computador falha, driver, adaptador e configuração ganham peso. Se várias máquinas perdem acesso juntas, a investigação passa para infraestrutura. Em Windows, formatação só entra quando existe justificativa e backup resolvido.

Essa abordagem dá à página do Braga uma função própria voltada a continuidade de uso, rede e periféricos.`,
  problemasComuns: [
    "Computador perde acesso à rede",
    "Impressora fica offline",
    "Windows apresenta erro de driver",
    "PC liga sem imagem",
    "SSD apresenta lentidão",
    "Arquivos importantes precisam de backup"
  ],
  dicasLocais: `Ao pedir atendimento no Braga, informe o endereço e uma referência como a Unidade de Saúde Braga, Rua Joinville ou Rua Campo Largo. Para rede, diga se outros equipamentos apresentam a mesma falha; para impressora, teste outro computador; para Windows, envie a mensagem de erro.`,
};

const Braga = () => <BairroTemplate data={data} />;

export default Braga;
