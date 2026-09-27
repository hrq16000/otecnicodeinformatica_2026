import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Secretaria Municipal de Educação: Escola Municipal Padre Pedro Fuss — Rua Londrina, 90, São Cristóvão.
// - Prefeitura de São José dos Pinhais: Centro de Qualificação e Capacitação — Avenida das Américas, 1500/1420, São Cristóvão.
const data = {
  nome: "São Cristóvão",
  slug: "sao-cristovao",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática em São Cristóvão, SJP | Suporte",
  metaDescription: "Suporte de informática em São Cristóvão, São José dos Pinhais. Diagnóstico de Windows, rede, periféricos e notebook com triagem antes da execução.",
  h1: "Técnico de Informática em São Cristóvão – São José dos Pinhais",
  subtitulo: "Triagem para Windows, rede e periféricos com foco em recuperar a função do equipamento sem retrabalho.",
  descricaoLonga: `São Cristóvão possui referências municipais claras em São José dos Pinhais. A rede pública mantém a Escola Municipal Padre Pedro Fuss na Rua Londrina, e o Centro de Qualificação e Capacitação funciona na Avenida das Américas. Essas referências permitem localizar o atendimento com base em informação oficial e atual.

Nesta página, o foco técnico está em Windows, rede e periféricos. Um computador pode continuar ligando e ainda assim ficar praticamente inutilizável se perde internet, impressora, áudio, webcam ou acesso a um aplicativo importante. Nesses casos, a triagem procura identificar qual função parou antes de qualquer reinstalação.

Quando o sistema ainda inicia, verificamos atualizações, drivers, eventos do Windows, uso de memória e comunicação com dispositivos. Em impressoras, comparamos conexão, fila e funcionamento em outro computador. Em rede, testamos outros aparelhos para separar falha local de infraestrutura.

Se o computador reinicia, não dá vídeo ou apresenta falha física, a linha de diagnóstico muda para alimentação, memória, temperatura e hardware. Em notebook, fonte e bateria também entram quando há desligamento ou queda de desempenho.

Quando existem arquivos importantes, backup vem antes de formatação. Se a máquina está operacional e conectada, parte da triagem pode começar remotamente; falhas físicas ou testes prolongados exigem visita ou bancada. A página de São Cristóvão foi reescrita para orientar esse processo com conteúdo próprio e sem promessa fixa de prazo.`,
  pontosReferencia: [
    "Rua Londrina",
    "Escola Municipal Padre Pedro Fuss",
    "Avenida das Américas",
    "Centro de Qualificação e Capacitação"
  ],
  tempoDeslocamento: "Agenda definida após triagem do problema e do endereço",
  servicosDestaque: [
    "Correção de Windows e drivers",
    "Impressora e periféricos",
    "Diagnóstico de rede",
    "Notebook com falha de desempenho",
    "Backup antes de reinstalação",
    "Avaliação de hardware"
  ],
  conteudoExclusivo: `Quando o computador liga, mas não entrega a função que você precisa

Uma máquina pode parecer “funcionando” e ainda assim impedir trabalho, estudo ou comunicação. Impressora offline, rede instável, áudio ausente ou aplicativo que não abre precisam ser investigados pela função que falhou.

Se o problema atinge apenas uma estação, o diagnóstico é local. Se várias máquinas falham juntas, a investigação passa para infraestrutura. Em Windows, reinstalação só entra quando há justificativa e backup resolvido.

Essa abordagem dá à página de São Cristóvão uma função própria, voltada a continuidade de uso, sistema e periféricos.`,
  problemasComuns: [
    "Windows inicia, mas aplicativo não abre",
    "Impressora fica offline",
    "Computador perde acesso à rede",
    "Webcam ou áudio para de funcionar",
    "Notebook reinicia durante uso",
    "Arquivos importantes precisam de backup"
  ],
  dicasLocais: `Ao pedir atendimento em São Cristóvão, informe o endereço e uma referência como a Rua Londrina ou Avenida das Américas. Para rede, diga se outros aparelhos falham; para periféricos, envie a mensagem de erro; para Windows, informe o que mudou antes do problema.`,
};

const SaoCristovao = () => <BairroTemplate data={data} />;

export default SaoCristovao;
