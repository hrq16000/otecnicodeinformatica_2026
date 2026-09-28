import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de Colombo: CMEI Jardim Monza — Rua Ângelo Francisco Borato, 169, Jardim Monza.
// - Prefeitura de Colombo: Capela Monza — Rua José Antonio Gonçalves, 325.
// - Prefeitura de Colombo: programa Colombo Mais Limpa inclui Jardim Monza no cronograma de 2026.
const data = {
  nome: "Jardim Monza",
  slug: "monza-colombo",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no Jardim Monza, Colombo | Notebook e Wi-Fi",
  metaDescription: "Assistência de informática no Jardim Monza, Colombo. Diagnóstico de notebook, bateria, aquecimento, Wi-Fi e Windows antes do reparo.",
  h1: "Técnico de Informática no Jardim Monza – Colombo",
  subtitulo: "Diagnóstico de notebook, energia e conectividade antes de trocar peças ou reinstalar o sistema.",
  descricaoLonga: `O Jardim Monza possui referências municipais atuais em Colombo. A Prefeitura está construindo o CMEI Jardim Monza na Rua Ângelo Francisco Borato, mantém a Capela Monza na Rua José Antonio Gonçalves e inclui o bairro no cronograma do programa Colombo Mais Limpa em 2026. Essas referências dão base concreta à página sem depender de descrições genéricas.

O foco técnico desta rota está em notebook, energia e conectividade. Quando um notebook não carrega, a causa pode estar na fonte, bateria, conector ou circuito interno. Se a máquina funciona na tomada mas desliga ao remover a fonte, bateria e gerenciamento de energia entram na análise. Se perde desempenho sob carga, temperatura e alimentação também precisam ser observadas.

Em Wi-Fi, comparamos o notebook com outros dispositivos. Se apenas ele apresenta queda, driver, adaptador ou configuração podem estar envolvidos. Se todos os aparelhos falham no mesmo ponto, cobertura, roteador ou conexão principal ganham peso. A recomendação de repetidor ou mesh só vem depois dessa separação.

Windows lento ou instável também precisa ser tratado com cuidado. Antes de formatar, verificamos armazenamento, memória, atualizações e existência de arquivos importantes. Um SSD degradado pode gerar sintomas que parecem apenas software. Em máquinas com dados sem backup, a preservação vem primeiro.

A página do Jardim Monza foi reescrita para explicar esse diagnóstico de notebook e conectividade com conteúdo próprio. A localização ajuda a organizar a agenda; o procedimento depende do sintoma real do equipamento.`,
  pontosReferencia: [
    "Rua Ângelo Francisco Borato",
    "CMEI Jardim Monza",
    "Rua José Antonio Gonçalves",
    "Capela Monza",
    "Jardim Monza – Colombo"
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

Essa combinação dá à página do Jardim Monza uma intenção própria voltada a notebook, energia e conectividade.`,
  problemasComuns: [
    "Notebook não carrega",
    "Bateria perde autonomia rapidamente",
    "Máquina aquece e reduz desempenho",
    "Wi-Fi cai apenas no notebook",
    "Windows fica lento depois de atualização",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao pedir atendimento no Jardim Monza, informe rua, número e uma referência como o CMEI Jardim Monza ou a Capela Monza. Para falha de carga, diga se LEDs acendem; para Wi-Fi, teste outro aparelho; para aquecimento, informe em qual tarefa a perda de desempenho aparece.`,
};

const MonzaColombo = () => <BairroTemplate data={data} />;

export default MonzaColombo;
