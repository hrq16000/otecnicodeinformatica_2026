import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Campo Largo: US Amadeu Mazzo — Rua João Stukas, 3237, Botiatuva.
// - Prefeitura de Campo Largo: Centro de Eventos Prefeito Emídio Pianaro Júnior — Botiatuva.
const data = {
  nome: "Botiatuva",
  slug: "botiatuva",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática no Botiatuva, Campo Largo | Diagnóstico",
  metaDescription: "Assistência de informática no Botiatuva, Campo Largo. Triagem para PC, notebook, Wi-Fi e arquivos, com atendimento conforme o tipo de falha.",
  h1: "Técnico de Informática no Botiatuva – Campo Largo",
  subtitulo: "Triagem antes da execução, diagnóstico por sintoma e atendimento remoto, presencial ou em bancada conforme o caso.",
  descricaoLonga: `O Botiatuva possui referências públicas fáceis de confirmar. A Unidade de Saúde Amadeu Mazzo fica na Rua João Stukas, nº 3237, e a Prefeitura também identifica o Centro de Eventos Prefeito Emídio Pianaro Júnior no bairro. Essas referências ajudam a localizar o chamado com precisão sem usar expressões vagas como “perto do Centro”.

Na assistência de informática, a localização organiza a visita; o defeito define o diagnóstico. Um computador que não liga depois de uma queda de energia precisa de uma sequência diferente de uma máquina que ficou lenta gradualmente. Em um caso, alimentação e componentes entram primeiro. No outro, armazenamento, memória, temperatura e processos do sistema precisam ser analisados antes de qualquer recomendação de upgrade.

Em notebook, falha de carregamento pode estar na fonte, no conector, na bateria ou no circuito interno. Formatar não resolve esse tipo de problema. Em Wi-Fi, a pergunta principal é se todos os dispositivos ficam lentos ou se apenas um equipamento apresenta instabilidade. Essa diferença evita trocar roteador quando o problema está no notebook ou instalar repetidor quando a conexão principal já chega degradada.

Quando o computador ainda inicia, parte da triagem pode começar remotamente. Quando há falha física, aquecimento, conector danificado, ausência de vídeo ou necessidade de desmontagem, a visita ou a bancada tende a ser mais adequada. Se existem arquivos importantes, a preservação dos dados entra antes de formatação, troca de disco ou reinstalação.

A página do Botiatuva foi reescrita para orientar esse processo com referências reais do bairro e uma lógica técnica própria. Não presume “demanda constante”, não promete chegada em minutos e não indica solução antes de saber o que realmente falhou.`,
  pontosReferencia: [
    "Rua João Stukas",
    "US Amadeu Mazzo",
    "Centro de Eventos Prefeito Emídio Pianaro Júnior",
    "Botiatuva – Campo Largo"
  ],
  tempoDeslocamento: "Horário confirmado depois da triagem e da localização",
  servicosDestaque: [
    "Diagnóstico de computador que não liga",
    "Notebook com falha de carregamento",
    "Análise de SSD, HD e memória",
    "Configuração e diagnóstico de Wi-Fi",
    "Backup antes de formatação",
    "Correção de Windows e periféricos"
  ],
  conteudoExclusivo: `Energia, inicialização e desempenho: problemas que pedem diagnósticos diferentes

Quando a máquina parou de ligar de repente, perguntamos o que aconteceu antes: houve desligamento, oscilação elétrica, mudança de tomada ou troca de componente? Se ela liga mas não mostra imagem, a investigação muda para memória, vídeo e alimentação. Se inicia normalmente e só depois fica lenta, a análise passa para temperatura, armazenamento e carga de software.

Essa separação evita o erro de tratar tudo como “Windows corrompido”. Também evita trocar peça por tentativa. Em casos com arquivos importantes, o estado do disco precisa ser observado antes de qualquer reinstalação.

Para quem está no Botiatuva, uma referência como Rua João Stukas, US Amadeu Mazzo ou Centro de Eventos ajuda a organizar a logística. O procedimento técnico, porém, continua sendo determinado pelos sintomas.`,
  problemasComuns: [
    "Computador não liga depois de desligamento ou oscilação",
    "Notebook reconhece a fonte mas não carrega corretamente",
    "PC liga sem apresentar imagem",
    "Máquina perde desempenho conforme aquece",
    "Wi-Fi fica lento em apenas alguns dispositivos",
    "HD ou SSD apresenta erros e arquivos importantes"
  ],
  dicasLocais: `Ao pedir atendimento no Botiatuva, envie rua, número e uma referência próxima, como a US Amadeu Mazzo ou o Centro de Eventos. Informe se o defeito começou após queda de energia, atualização, troca de componente ou movimentação do equipamento. Se houver arquivos importantes sem backup, diga isso na primeira mensagem.`,
};

const BotiatuvaCL = () => <BairroTemplate data={data} />;

export default BotiatuvaCL;
