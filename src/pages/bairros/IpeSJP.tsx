import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de São José dos Pinhais: UBS Ipê integra a rede municipal de saúde.
// - Secretaria Municipal de Educação: CMEI A Baba do Passarinho — Rua Laerte Fenelon, 1001.
// - Escola Municipal Irmã Maria Eufrásia Torres — Rua Pedro Ribaski, 186.
// - Escola Municipal Nossa Senhora Aparecida — Rua Antenor dos Santos, 208.
const data = {
  nome: "Ipê",
  slug: "ipe-sjp",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Ipê, São José dos Pinhais | Suporte",
  metaDescription: "Suporte de informática no Ipê, São José dos Pinhais. Diagnóstico de notebook, PC, impressora, Wi-Fi e arquivos com triagem antes da execução.",
  h1: "Técnico de Informática no Ipê – São José dos Pinhais",
  subtitulo: "Atendimento técnico organizado por sintoma, com cuidado especial para arquivos, periféricos e conectividade.",
  descricaoLonga: `O Ipê aparece de forma clara nas estruturas municipais de São José dos Pinhais. A rede pública mantém UBS Ipê, e a Secretaria de Educação registra equipamentos como o CMEI A Baba do Passarinho, na Rua Laerte Fenelon, a Escola Municipal Irmã Maria Eufrásia Torres, na Rua Pedro Ribaski, e a Escola Nossa Senhora Aparecida, na Rua Antenor dos Santos. Essas referências ajudam a confirmar a localização do chamado sem recorrer a pontos genéricos.

No atendimento técnico, uma das prioridades é preservar o que está dentro do equipamento. Computador com documentos, fotos ou arquivos de estudo não deve ser formatado antes de avaliar backup e estado do armazenamento. Se o HD ou SSD apresenta travamentos, erros ou desaparece de forma intermitente, continuar gravando dados pode piorar o cenário.

Quando o problema é periférico, a triagem procura separar software e hardware. Impressora que aparece offline pode ter falha de rede, driver, fila ou comunicação. Webcam, áudio e dispositivos USB podem parar depois de atualização sem que o componente esteja fisicamente danificado. Testar porta, outro computador ou outro cabo pode reduzir bastante as hipóteses.

Em notebook que não carrega, fonte, bateria, conector e circuito interno precisam ser analisados separadamente. Em Wi-Fi, comparamos outros aparelhos e pontos do imóvel antes de recomendar qualquer equipamento novo. Se o computador ainda está utilizável, parte dessas verificações pode começar remotamente; se exige abertura, medição ou teste prolongado, o atendimento passa para visita ou bancada.

A página do Ipê foi construída para responder a essas decisões com conteúdo próprio. A geografia organiza o atendimento; os sintomas do equipamento determinam a solução.`,
  pontosReferencia: [
    "UBS Ipê",
    "Rua Laerte Fenelon",
    "CMEI A Baba do Passarinho",
    "Rua Pedro Ribaski",
    "Escola Municipal Irmã Maria Eufrásia Torres",
    "Rua Antenor dos Santos",
    "Escola Municipal Nossa Senhora Aparecida"
  ],
  tempoDeslocamento: "Agenda confirmada após triagem e localização",
  servicosDestaque: [
    "Backup e preservação de arquivos",
    "Diagnóstico de HD e SSD",
    "Impressora e periféricos",
    "Notebook que não carrega",
    "Configuração de Wi-Fi",
    "Correção de Windows e drivers"
  ],
  conteudoExclusivo: `Periférico parado nem sempre significa peça quebrada

Impressora, webcam, áudio e dispositivos USB podem deixar de funcionar por driver, configuração, porta ou atualização. Antes de substituir hardware, verificamos se o sistema reconhece o dispositivo, se outra porta funciona e se o problema aparece em outro computador.

Para arquivos, a prioridade é diferente: quando o armazenamento mostra sinais de falha, preservar os dados vem antes de tentar “fazer voltar”. Em notebook sem carga, observar LEDs, fonte e comportamento da bateria ajuda a reduzir hipóteses.

No Ipê, essa combinação de preservação de dados e diagnóstico de periféricos dá à página uma função própria, diferente das demais rotas locais.`,
  problemasComuns: [
    "HD ou SSD apresenta erros e arquivos importantes",
    "Impressora fica offline ou não é reconhecida",
    "Webcam ou áudio para após atualização",
    "Notebook reconhece a fonte mas não carrega",
    "Wi-Fi falha apenas em um equipamento",
    "Windows apresenta erros de driver"
  ],
  dicasLocais: `Ao pedir atendimento no Ipê, envie rua, número e uma referência próxima, como a UBS Ipê, Rua Laerte Fenelon, Rua Pedro Ribaski ou Rua Antenor dos Santos. Para periféricos, teste outra porta quando possível; para arquivos importantes, evite formatar; para notebook sem carga, informe se os LEDs acendem.`,
};

const IpeSJP = () => <BairroTemplate data={data} />;

export default IpeSJP;
