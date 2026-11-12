import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de São José dos Pinhais: UBS Borda do Campo integra a rede municipal de saúde.
// - Centro de Esporte e Lazer Borda do Campo — Roberto Cichella, Rua Manoel Tibúrcio Machado, 637.
// - Consulta pública municipal de 2025 realizada no Centro Roberto Cichella, em Borda do Campo.
// - Estádio Municipal da Borda do Campo — Rua Julia da Costa, 314.
const data = {
  nome: "Borda do Campo",
  slug: "borda-do-campo-sjp",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática na Borda do Campo, SJP | Diagnóstico",
  metaDescription: "Assistência de informática na Borda do Campo, São José dos Pinhais. Triagem para PC, notebook, rede e dados com visita ou bancada conforme o defeito.",
  h1: "Técnico de Informática na Borda do Campo – São José dos Pinhais",
  subtitulo: "Diagnóstico técnico antes do deslocamento, com definição entre suporte remoto, visita e bancada.",
  descricaoLonga: `A Borda do Campo é uma localidade reconhecida nas estruturas municipais de São José dos Pinhais. A rede pública mantém UBS Borda do Campo e a Prefeitura utiliza o Centro de Esporte e Lazer Roberto Cichella, na Rua Manoel Tibúrcio Machado, como equipamento da região. Em 2025, esse mesmo espaço recebeu consulta pública municipal. Outro ponto identificado pela Prefeitura é o Estádio Municipal da Borda do Campo, na Rua Julia da Costa.

Essas referências ajudam a confirmar a localização antes do atendimento, mas não determinam o diagnóstico. Computador que não liga precisa ser analisado por sinais de energia, vídeo, memória e alimentação. Notebook que desliga ou perde desempenho pode exigir medição de temperatura e testes sob carga. Em ambos os casos, reinstalar o Windows sem investigar a causa pode apenas mascarar o problema.

Quando a falha é de rede, o primeiro passo é comparar dispositivos. Se apenas um computador perde conexão, driver, adaptador ou configuração entram na análise. Se todos os aparelhos apresentam instabilidade, a investigação muda para roteador, conexão principal e cobertura interna. A recomendação de repetidor ou mesh vem depois dessa separação.

Para equipamentos com dados importantes, backup ou recuperação podem ter prioridade. Se o armazenamento apresenta ruído, erros ou desaparece do sistema, insistir no uso pode reduzir a chance de preservar arquivos. Se a máquina ainda inicia e o problema está em software ou configuração, parte da triagem pode começar remotamente. Falhas físicas, abertura de equipamento e testes prolongados são tratados presencialmente ou em bancada.

A página da Borda do Campo foi reescrita para ter uma função própria: orientar a triagem, explicar decisões técnicas e usar referências locais verificáveis, sem repetir a antiga copy genérica usada também no Ipê.`,
  pontosReferencia: [
    "UBS Borda do Campo",
    "Rua Manoel Tibúrcio Machado",
    "Centro de Esporte e Lazer Roberto Cichella",
    "Rua Julia da Costa",
    "Estádio Municipal da Borda do Campo"
  ],
  tempoDeslocamento: "Atendimento programado após triagem e confirmação do endereço",
  servicosDestaque: [
    "Diagnóstico de computador que não liga",
    "Notebook com aquecimento ou desligamento",
    "Análise de rede e Wi-Fi",
    "Backup e recuperação de arquivos",
    "Correção de Windows",
    "Avaliação de SSD e memória"
  ],
  conteudoExclusivo: `Quando vale tentar remoto e quando a máquina precisa ser examinada

Se o computador ainda inicia e o defeito está em programa, driver, impressora ou configuração, a triagem remota pode resolver ou pelo menos reduzir as hipóteses. Se não há vídeo, há falha de energia, aquecimento severo ou comportamento físico anormal, o equipamento precisa ser examinado.

Em rede, a comparação entre aparelhos evita diagnósticos errados. Em armazenamento, sinais de falha mudam a prioridade para os dados. Em notebook que desliga, temperatura e alimentação precisam ser observadas antes de qualquer reinstalação.

Na Borda do Campo, a página deixa claro esse limite entre o que pode ser feito à distância e o que exige presença física.`,
  problemasComuns: [
    "Computador não liga ou liga sem vídeo",
    "Notebook desliga durante uso",
    "Wi-Fi falha em um ou vários aparelhos",
    "SSD ou HD apresenta erros",
    "Windows inicia com falhas",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao pedir atendimento na Borda do Campo, informe rua, número e uma referência como a UBS Borda do Campo, o Centro Roberto Cichella ou a Rua Julia da Costa. Para computador sem vídeo, informe se ventoinhas e LEDs ligam; para rede, teste outro aparelho; para armazenamento, evite formatar se houver arquivos importantes.`,
};

const BordaDoCampoSJP = () => <BairroTemplate data={data} />;

export default BordaDoCampoSJP;
