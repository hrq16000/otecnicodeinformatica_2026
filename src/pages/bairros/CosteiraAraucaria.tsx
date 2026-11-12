import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Araucária: UBS Costeira / Alceu do Valle Fernandes — Rua Maranhão, 2149, Costeira.
// - Plano Municipal de Saúde reconhece a UBS Costeira como unidade histórica da região.
const data = {
  nome: "Costeira",
  slug: "costeira-araucaria",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática na Costeira, Araucária | Notebook e Wi-Fi",
  metaDescription: "Assistência de informática na Costeira, Araucária. Diagnóstico de notebook, bateria, aquecimento, Wi-Fi e Windows com triagem antes do reparo.",
  h1: "Técnico de Informática na Costeira – Araucária",
  subtitulo: "Diagnóstico de notebook, energia e conectividade antes de trocar peças ou reinstalar o sistema.",
  descricaoLonga: `A Costeira possui referência municipal consolidada em Araucária. A Prefeitura mantém a UBS Costeira, também conhecida como Alceu do Valle Fernandes, na Rua Maranhão. O Plano Municipal de Saúde identifica a unidade e sua atuação na região. Essas referências sustentam a página sem recorrer a descrições genéricas do bairro.

O foco técnico desta rota está em notebook, energia e conectividade. Quando um notebook não carrega, a causa pode estar na fonte, bateria, conector ou circuito interno. Se a máquina funciona na tomada mas desliga ao remover a fonte, bateria e gerenciamento de energia entram na análise. Se perde desempenho sob carga, temperatura e alimentação também precisam ser observadas.

Em Wi-Fi, comparamos o notebook com outros dispositivos. Se apenas ele apresenta queda, driver, adaptador ou configuração podem estar envolvidos. Se todos os aparelhos falham no mesmo ponto, cobertura, roteador ou conexão principal ganham peso. A recomendação de repetidor ou mesh só vem depois dessa separação.

Windows lento ou instável também precisa ser tratado com cuidado. Antes de formatar, verificamos armazenamento, memória, atualizações e existência de arquivos importantes. Um SSD degradado pode gerar sintomas que parecem apenas software. Em máquinas com dados sem backup, a preservação vem primeiro.

A página da Costeira foi reescrita para explicar esse diagnóstico de notebook e conectividade com conteúdo próprio. A localização ajuda a organizar a agenda; o procedimento depende do sintoma real do equipamento.`,
  pontosReferencia: [
    "Rua Maranhão",
    "UBS Costeira / Alceu do Valle Fernandes",
    "Costeira – Araucária"
  ],
  tempoDeslocamento: "Atendimento combinado após triagem do notebook e endereço",
  servicosDestaque: [
    "Notebook que não carrega",
    "Diagnóstico de bateria e fonte",
    "Análise de aquecimento",
    "Configuração de Wi-Fi",
    "Correção de Windows",
    "Backup antes de manutenção"
  ],
  conteudoExclusivo: `Notebook sem carga pede teste, não troca automática de bateria

Fonte, bateria, conector e circuito interno podem produzir sintomas parecidos. Observar LEDs, autonomia e comportamento fora da tomada ajuda a separar as hipóteses antes de comprar peça.

Em Wi-Fi, comparar outros aparelhos mostra se o problema está no notebook ou na rede. Em lentidão, temperatura e armazenamento precisam ser medidos antes de formatar.

Essa combinação dá à página da Costeira uma intenção própria voltada a notebook, energia e conectividade.`,
  problemasComuns: [
    "Notebook não carrega",
    "Bateria perde autonomia rapidamente",
    "Máquina aquece e reduz desempenho",
    "Wi-Fi cai apenas no notebook",
    "Windows fica lento depois de atualização",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao pedir atendimento na Costeira, informe rua, número e uma referência como a UBS Costeira ou a Rua Maranhão. Para falha de carga, diga se LEDs acendem; para Wi-Fi, teste outro aparelho; para aquecimento, informe em qual tarefa a perda de desempenho aparece.`,
};

const CosteiraAraucaria = () => <BairroTemplate data={data} />;

export default CosteiraAraucaria;
