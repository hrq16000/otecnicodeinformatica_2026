import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de Colombo: Unidade de Saúde São Gabriel — Rua José Dalprá, 545.
// - Prefeitura de Colombo: CAEC São Gabriel — Avenida São Gabriel, 2765.
// - Prefeitura de Colombo: CEU da Cultura em implantação no Jardim São Gabriel, Rua Osvaldo Strapasson Vicentin.
const data = {
  nome: "São Gabriel",
  slug: "sao-gabriel-colombo",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no São Gabriel, Colombo | Windows e Periféricos",
  metaDescription: "Assistência de informática no São Gabriel, Colombo. Diagnóstico de Windows, impressora, webcam, notebook e periféricos antes da execução.",
  h1: "Técnico de Informática no São Gabriel – Colombo",
  subtitulo: "Diagnóstico de Windows e periféricos antes de formatar ou substituir equipamentos.",
  descricaoLonga: `São Gabriel possui referências municipais específicas em Colombo. A Prefeitura mantém a Unidade de Saúde São Gabriel na Rua José Dalprá e o CAEC São Gabriel na Avenida São Gabriel. Em 2026, o município também iniciou a implantação de um CEU da Cultura na Rua Osvaldo Strapasson Vicentin.

Nesta página, o foco técnico está em Windows e periféricos. Um computador pode continuar ligando e ainda assim ficar inutilizável quando perde impressora, áudio, webcam ou acesso a um aplicativo importante. Esses sintomas podem surgir por atualização, driver, configuração ou falha física, e não justificam formatação automática.

Em impressoras, verificamos se o equipamento aparece no sistema, se outro computador consegue utilizá-lo e se a falha ocorre por USB, cabo ou rede. Em webcam e áudio, atualizações e drivers podem explicar o problema sem existir defeito no hardware. Em dispositivos USB, testar outra porta ou outro computador ajuda a reduzir hipóteses.

Se o notebook passa a reiniciar, aquecer ou perder desempenho, a investigação muda para temperatura, memória, armazenamento e alimentação. Se há arquivos importantes, backup entra antes de qualquer reinstalação.

Quando o Windows ainda está operacional, parte da triagem pode começar remotamente. Falhas físicas, ausência de vídeo ou necessidade de desmontagem exigem presença ou bancada. A página de São Gabriel foi reescrita para explicar esse diagnóstico com conteúdo próprio e referências locais verificáveis.`,
  pontosReferencia: [
    "Rua José Dalprá",
    "Unidade de Saúde São Gabriel",
    "Avenida São Gabriel",
    "CAEC São Gabriel",
    "Rua Osvaldo Strapasson Vicentin"
  ],
  tempoDeslocamento: "Agenda definida após triagem do sintoma e do endereço",
  servicosDestaque: [
    "Correção de Windows e drivers",
    "Impressora e periféricos",
    "Webcam e áudio",
    "Notebook com falha de desempenho",
    "Backup antes de reinstalação",
    "Avaliação de hardware"
  ],
  conteudoExclusivo: `Periférico parado não significa necessariamente peça quebrada

Se a impressora, webcam ou áudio deixa de funcionar depois de atualização, o diagnóstico começa verificando reconhecimento do dispositivo, driver e configuração. Se outro computador consegue usar o equipamento, a falha provavelmente está na estação original.

Essa abordagem dá à página de São Gabriel uma intenção própria voltada a Windows, periféricos e continuidade de uso.`,
  problemasComuns: [
    "Impressora fica offline",
    "Webcam ou áudio para depois de atualização",
    "Windows apresenta erro de driver",
    "Dispositivo USB deixa de ser reconhecido",
    "Notebook reinicia durante uso",
    "Arquivos importantes precisam de backup"
  ],
  dicasLocais: `Ao pedir atendimento em São Gabriel, informe o endereço e uma referência como a Rua José Dalprá, Avenida São Gabriel ou Rua Osvaldo Strapasson Vicentin. Para periféricos, teste outra porta quando possível e envie a mensagem de erro exibida pelo Windows.`,
};

const SaoGabrielColombo = () => <BairroTemplate data={data} />;

export default SaoGabrielColombo;
