import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de São José dos Pinhais: Escola Municipal Professora Angelina Luciano de Macedo — Rua Herbert de Souza, 17, Academia.
// - Prefeitura de São José dos Pinhais: Academia integra a área atendida pela Subprefeitura Murici.
const data = {
  nome: "Academia",
  slug: "academia-sjp",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Academia, São José dos Pinhais | Diagnóstico",
  metaDescription: "Assistência de informática no Academia, São José dos Pinhais. Diagnóstico de notebook, Windows, armazenamento e backup com triagem antes da execução.",
  h1: "Técnico de Informática no Academia – São José dos Pinhais",
  subtitulo: "Triagem técnica para notebook, Windows e arquivos antes de formatar ou trocar componentes.",
  descricaoLonga: `Academia aparece de forma clara nas estruturas municipais de São José dos Pinhais. A Prefeitura registra a Escola Municipal Professora Angelina Luciano de Macedo na Rua Herbert de Souza, e a localidade também integra a área atendida pela Subprefeitura Murici. Essas referências ajudam a confirmar o endereço sem recorrer a pontos genéricos ou promessas de deslocamento.

Nesta página, o foco técnico está em notebook, Windows e preservação de arquivos. Um computador que ficou lento pode estar com excesso de programas, pouca memória, armazenamento degradado ou temperatura elevada. Um notebook que entra em reparo automático ou apresenta tela azul pode ter problema de sistema, driver, SSD ou memória. Formatar antes de identificar a causa pode gerar retrabalho e colocar dados em risco.

Quando a máquina ainda inicia, verificamos espaço livre, saúde aparente do armazenamento, eventos do sistema, atualizações e uso de memória. Se existem documentos, fotos ou arquivos de trabalho sem cópia recente, o backup entra antes de reinstalação. Se o SSD ou HD apresenta travamentos, erros ou desaparece do sistema, a prioridade pode mudar para preservar os dados.

Em notebook, fonte, bateria e temperatura também são avaliadas quando há desligamento ou queda de desempenho. Se o defeito é de software e o equipamento continua utilizável, parte da triagem pode começar remotamente. Falhas físicas, ausência de vídeo, conector ou necessidade de desmontagem exigem visita ou bancada.

A página do Academia foi reescrita para explicar esse processo com conteúdo próprio e referências locais verificáveis. A localização organiza o atendimento; o diagnóstico é definido pelos sintomas e pelos testes, não por uma solução automática.`,
  pontosReferencia: [
    "Rua Herbert de Souza",
    "Escola Municipal Professora Angelina Luciano de Macedo",
    "Academia – São José dos Pinhais",
    "Área atendida pela Subprefeitura Murici"
  ],
  tempoDeslocamento: "Horário confirmado após triagem e localização",
  servicosDestaque: [
    "Diagnóstico de notebook lento",
    "Correção de Windows e tela azul",
    "Análise de SSD e HD",
    "Backup antes de formatação",
    "Teste de memória",
    "Avaliação de bateria e fonte"
  ],
  conteudoExclusivo: `Quando a lentidão não deve terminar em formatação automática

Lentidão pode vir de software, armazenamento, memória ou temperatura. Antes de reinstalar o Windows, verificamos qual recurso está limitando a máquina e se o disco apresenta sinais de falha.

Se há arquivos importantes, a preservação vem primeiro. Em tela azul, uma foto do código de erro ajuda a separar driver, sistema e hardware. Em notebook que desliga, temperatura e alimentação precisam ser consideradas.

No Academia, esta página concentra a orientação em notebook, Windows e backup para manter uma intenção técnica própria e útil antes do contato.`,
  problemasComuns: [
    "Notebook fica lento depois de algum tempo",
    "Windows entra em reparo automático",
    "Tela azul aparece de forma recorrente",
    "SSD ou HD apresenta erros",
    "Notebook desliga durante uso",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao solicitar atendimento no Academia, informe a rua, o número e uma referência como a Escola Professora Angelina Luciano de Macedo ou a Rua Herbert de Souza. Para tela azul, envie foto do código; para lentidão, diga quando ela começa; se houver arquivos importantes, avise antes de qualquer formatação.`,
};

const AcademiaSJP = () => <BairroTemplate data={data} />;

export default AcademiaSJP;
