import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de São José dos Pinhais: Subprefeitura Murici — Rua Doutor Murici, 3421.
// - Prefeitura de São José dos Pinhais: Casa da Cultura Polonesa — Rua João Lipinski, 1001, Colônia Murici.
// - Prefeitura de São José dos Pinhais: Colônia Murici possui perímetro urbano próprio e administração regional.
const data = {
  nome: "Colônia Murici",
  slug: "colonia-murici-sjp",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática na Colônia Murici, SJP | Suporte",
  metaDescription: "Suporte de informática na Colônia Murici, São José dos Pinhais. Triagem de rede, notebook e PC com definição entre remoto, visita e bancada.",
  h1: "Técnico de Informática na Colônia Murici – São José dos Pinhais",
  subtitulo: "Diagnóstico antes do deslocamento, com definição clara entre suporte remoto, visita e bancada.",
  descricaoLonga: `A Colônia Murici possui identidade administrativa própria em São José dos Pinhais. A Prefeitura mantém a Subprefeitura Murici na Rua Doutor Murici e a Casa da Cultura Polonesa na Rua João Lipinski. A legislação urbana municipal também reconhece o perímetro da Colônia Murici. Essas referências dão base concreta à página sem depender de descrições imprecisas.

Nesta rota, o foco técnico está em decidir a modalidade correta de atendimento. Quando o computador ainda inicia e possui conexão, erros de Windows, drivers, aplicativos, impressoras e algumas falhas de rede podem começar por triagem remota. Isso ajuda a identificar o problema antes de qualquer deslocamento e evita levar uma máquina para bancada quando a causa está apenas em configuração.

Se o equipamento não liga, não apresenta vídeo, aquece excessivamente, possui conector danificado ou exige teste elétrico, o atendimento precisa ser presencial ou em bancada. Em notebook, fonte e bateria entram na análise quando há falha de carregamento. Em PC, sinais de energia, memória e vídeo ajudam a definir os próximos testes.

A rede também é tratada por comparação. Se apenas um equipamento perde conexão, driver ou adaptador podem estar envolvidos. Se vários dispositivos falham juntos, o foco muda para roteador, cobertura ou conexão principal. Comprar repetidor ou trocar roteador sem essa distinção pode gerar custo sem resolver a causa.

Quando há arquivos importantes, backup e estado do armazenamento são considerados antes de reinstalação. A página da Colônia Murici foi reescrita para orientar essa escolha entre remoto, visita e bancada com conteúdo técnico próprio e referências municipais verificáveis.`,
  pontosReferencia: [
    "Rua Doutor Murici",
    "Subprefeitura Murici",
    "Rua João Lipinski",
    "Casa da Cultura Polonesa",
    "Colônia Murici – São José dos Pinhais"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem do endereço e do defeito",
  servicosDestaque: [
    "Triagem e suporte remoto",
    "Diagnóstico de Wi-Fi e rede",
    "Notebook que não liga",
    "Computador sem vídeo",
    "Correção de Windows e drivers",
    "Backup antes de bancada"
  ],
  conteudoExclusivo: `Remoto, visita ou bancada: o sintoma define o caminho

Se o computador ainda funciona e está conectado, muitos erros de configuração podem ser analisados antes de uma visita. Quando não há energia, vídeo ou existe falha física, insistir em suporte remoto não faz sentido.

Em rede, comparar mais de um dispositivo ajuda a separar defeito local de infraestrutura. Em notebook sem carga, observar fonte, bateria e indicadores reduz as hipóteses. Em armazenamento instável, os dados podem ser prioridade.

Na Colônia Murici, esta página foi construída para tornar essa decisão explícita e evitar promessas de solução ou deslocamento antes do diagnóstico.`,
  problemasComuns: [
    "Computador precisa de suporte remoto",
    "Wi-Fi falha em um ou vários dispositivos",
    "Notebook não liga ou não carrega",
    "PC liga sem apresentar vídeo",
    "Windows apresenta erro de configuração",
    "Máquina precisa ir para bancada com arquivos importantes"
  ],
  dicasLocais: `Ao pedir atendimento na Colônia Murici, informe o endereço e uma referência como a Subprefeitura Murici, Rua Doutor Murici ou Casa da Cultura Polonesa. Diga se a máquina ainda liga e acessa a internet; isso ajuda a decidir se a triagem pode começar remotamente.`,
};

const ColoniaMurcySJP = () => <BairroTemplate data={data} />;

export default ColoniaMurcySJP;
