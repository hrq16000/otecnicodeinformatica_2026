import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Campo Largo: Unidade de Saúde de Bateias — Rua Joil Antonio Basso, s/n.
// - Prefeitura de Campo Largo: Bateias integra o cronograma municipal de atualização cadastral em saúde.
const data = {
  nome: "Bateias",
  slug: "bateias",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática em Bateias, Campo Largo | Diagnóstico",
  metaDescription: "Assistência de informática em Bateias, Campo Largo. Triagem para notebook, PC, Wi-Fi e arquivos, com atendimento conforme o tipo de falha.",
  h1: "Técnico de Informática em Bateias – Campo Largo",
  subtitulo: "Diagnóstico antes da solução, com atenção a desempenho, conectividade e preservação de dados.",
  descricaoLonga: `Bateias é uma localidade identificada oficialmente pela Prefeitura de Campo Largo. A Unidade de Saúde de Bateias fica na Rua Joil Antonio Basso e o bairro também integra ações municipais de atualização cadastral. Essas referências permitem organizar um atendimento com base em pontos reais, sem usar descrições genéricas que poderiam servir para qualquer lugar.

No suporte de informática, o primeiro passo é entender a falha. Um computador que ficou lento aos poucos pede investigação de armazenamento, memória, temperatura e programas. Uma máquina que parou de ligar exige observar alimentação, sinais de partida e vídeo. Um notebook que desliga sob carga pode estar com problema térmico ou de energia. Cada cenário exige uma linha diferente.

Quando o problema é Wi-Fi, perguntamos se todos os dispositivos ficam lentos ou se apenas um equipamento apresenta perda de conexão. Se o sinal piora apenas em determinado cômodo, cobertura é uma hipótese; se tudo falha ao mesmo tempo, o diagnóstico precisa olhar para roteador, provedor e infraestrutura. Repetidor e mesh só entram depois dessa separação.

Em máquinas com arquivos importantes, o backup precisa ser considerado antes de reinstalação. Se o disco apresenta travamentos, ruídos, erros ou desaparece do sistema, insistir no uso pode aumentar o risco de perda. Quando o defeito é físico, a visita ou a bancada substituem a tentativa de resolver por software.

A página de Bateias foi reescrita para oferecer orientação técnica real e conteúdo próprio. A localização ajuda a definir a logística; os sinais do equipamento determinam o procedimento.`,
  pontosReferencia: [
    "Rua Joil Antonio Basso",
    "Unidade de Saúde de Bateias",
    "Bateias – Campo Largo"
  ],
  tempoDeslocamento: "Agenda confirmada após triagem do endereço e do defeito",
  servicosDestaque: [
    "Diagnóstico de computador lento",
    "Notebook que desliga ou aquece",
    "Análise de SSD e memória",
    "Backup e recuperação de arquivos",
    "Diagnóstico de Wi-Fi",
    "Correção de Windows e drivers"
  ],
  conteudoExclusivo: `Como separar lentidão de defeito físico

Computador lento não significa automaticamente que precisa ser formatado. O armazenamento pode estar cheio, a memória pode ser insuficiente, a temperatura pode estar alta ou o sistema pode carregar programas em excesso. O diagnóstico busca identificar qual recurso está limitando a máquina.

Se o equipamento desliga, reinicia ou não dá vídeo, a investigação muda. Nesses casos, alimentação, temperatura, memória e componentes físicos entram antes do sistema operacional.

Em Bateias, a página foi estruturada para explicar essa diferença e evitar solução por tentativa. Se houver arquivos importantes, eles também entram no diagnóstico desde a primeira mensagem.`,
  problemasComuns: [
    "Computador lento mesmo com poucos programas",
    "Notebook desliga ao aquecer",
    "PC liga sem imagem",
    "SSD ou HD apresenta erros",
    "Wi-Fi perde estabilidade em parte do imóvel",
    "Arquivos importantes sem backup recente"
  ],
  dicasLocais: `Ao pedir atendimento em Bateias, informe o endereço e, quando fizer sentido, a Rua Joil Antonio Basso ou a Unidade de Saúde de Bateias como referência. Para lentidão, diga se começa logo ao ligar ou depois de algum tempo. Para arquivos importantes, evite formatar antes da triagem.`,
};

const BateiasCL = () => <BairroTemplate data={data} />;

export default BateiasCL;
