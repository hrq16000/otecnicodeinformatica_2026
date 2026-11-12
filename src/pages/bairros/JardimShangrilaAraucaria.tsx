import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Araucária: UBSF Shangri-Lá atende a região de Shangri-Lá I e II.
// - Prefeitura de Araucária: referência histórica da UBSF Shangrilá — Rua Mato Grosso, 1150.
const data = {
  nome: "Jardim Shangri-Lá",
  slug: "jardim-shangrila-araucaria",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Jardim Shangri-Lá, Araucária | Suporte",
  metaDescription: "Suporte de informática no Jardim Shangri-Lá, Araucária. Diagnóstico de Wi-Fi, periféricos, notebook e PC com triagem antes da execução.",
  h1: "Técnico de Informática no Jardim Shangri-Lá – Araucária",
  subtitulo: "Atendimento técnico com foco em rede, periféricos e falhas que aparecem depois de atualizações.",
  descricaoLonga: `O Jardim Shangri-Lá é reconhecido na organização municipal de Araucária. Documentos atuais da Prefeitura mantêm a UBS Shangri-Lá como referência de atendimento para Shangri-Lá I e II, e registros municipais identificam a unidade na Rua Mato Grosso. Essas referências dão base local suficiente para a página sem precisar inventar pontos comerciais ou características do bairro.

No suporte técnico, esta rota prioriza problemas de conectividade e periféricos. Wi-Fi instável pode ser causado por cobertura, roteador, adaptador, driver ou configuração. Antes de indicar repetidor, mesh ou troca de equipamento, comparamos outros dispositivos e testamos se a falha também aparece por cabo.

Impressora, webcam, áudio e dispositivos USB também podem parar depois de atualização sem que exista defeito físico. Se o sistema reconhece o dispositivo, a investigação segue por driver, fila, configuração e comunicação. Se não reconhece em nenhuma porta ou em outro computador, o diagnóstico muda.

Em notebook, travamentos ou queda de desempenho podem estar ligados a temperatura, memória ou armazenamento. A reinstalação do Windows só entra quando existe motivo técnico e quando os arquivos importantes já foram considerados. Se a máquina continua conectada e utilizável, parte da triagem pode começar remotamente; falhas físicas e desmontagem exigem presença ou bancada.

A página do Jardim Shangri-Lá foi criada para ter função própria: orientar rede e periféricos com referências locais verificáveis, sem repetir o mesmo conteúdo usado em outros bairros.`,
  pontosReferencia: [
    "UBSF Shangri-Lá",
    "Rua Mato Grosso",
    "Shangri-Lá I",
    "Shangri-Lá II",
    "Jardim Shangri-Lá – Araucária"
  ],
  tempoDeslocamento: "Agenda definida após triagem do problema e localização",
  servicosDestaque: [
    "Diagnóstico de Wi-Fi",
    "Impressora e periféricos",
    "Correção de drivers",
    "Notebook com travamentos",
    "Configuração de rede",
    "Backup antes de reinstalação"
  ],
  conteudoExclusivo: `Wi-Fi ruim não significa automaticamente roteador ruim

Se apenas um notebook perde sinal, o problema pode estar no adaptador ou driver. Se todos os dispositivos ficam lentos em um ponto específico, cobertura e posicionamento entram no diagnóstico. Se a conexão por cabo também cai, a hipótese muda novamente.

O mesmo raciocínio vale para impressoras e periféricos: primeiro identificamos se o sistema enxerga o equipamento, depois separamos software, comunicação e hardware.

Essa lógica evita comprar equipamento sem necessidade e dá ao Jardim Shangri-Lá uma página tecnicamente distinta das demais.`,
  problemasComuns: [
    "Wi-Fi cai apenas em alguns dispositivos",
    "Impressora aparece offline",
    "Webcam ou áudio para após atualização",
    "Notebook trava durante uso",
    "Driver desaparece ou fica com erro",
    "Rede funciona por cabo mas falha no Wi-Fi"
  ],
  dicasLocais: `Ao solicitar atendimento no Jardim Shangri-Lá, informe o endereço e uma referência como a UBSF Shangri-Lá ou a Rua Mato Grosso. Para rede, teste outro aparelho no mesmo ponto. Para periféricos, teste outra porta quando possível e envie foto da mensagem de erro.`,
};

const JardimShangrilaAraucaria = () => <BairroTemplate data={data} />;

export default JardimShangrilaAraucaria;
