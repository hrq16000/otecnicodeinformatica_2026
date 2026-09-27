import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Pinhais: USF Vila Amélia — Rua Arthur Bernardes, 342, Jardim Amélia.
// - Prefeitura de Pinhais: o nome Vila Amélia permanece em uso na estrutura municipal de saúde.
const data = {
  nome: "Vila Amélia",
  slug: "vila-amelia-pinhais",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática na Vila Amélia, Pinhais | Diagnóstico",
  metaDescription: "Assistência de informática na Vila Amélia, Pinhais. Triagem para notebook, computador, Windows, Wi-Fi e backup antes da execução.",
  h1: "Técnico de Informática na Vila Amélia – Pinhais",
  subtitulo: "Diagnóstico antes da solução, com cuidado especial para dados, armazenamento e falhas de notebook.",
  descricaoLonga: `A nomenclatura Vila Amélia continua presente na estrutura municipal de Pinhais: a Prefeitura mantém a USF Vila Amélia, localizada na Rua Arthur Bernardes, no Jardim Amélia. A página preserva a rota histórica “Vila Amélia”, mas evita inventar fronteiras ou tratar a denominação como se fosse necessariamente uma divisão administrativa independente do Jardim Amélia.

No atendimento técnico, o foco desta página está em problemas em que preservar dados e separar falha física de falha de sistema faz diferença. Notebook que demora para iniciar pode estar com armazenamento degradado, excesso de programas ou atualização mal concluída. Máquina que não carrega pode ter problema na fonte, bateria, conector ou circuito. Computador que congela ao copiar arquivos pode exigir atenção ao disco antes de qualquer formatação.

Por isso, a triagem pergunta primeiro o que está acontecendo e o que não pode ser perdido. Se o equipamento ainda funciona, podemos verificar espaço livre, saúde do armazenamento, memória e erros do sistema antes de decidir por reinstalação. Se existe suspeita de falha física, evitamos insistir em procedimentos que aumentem o risco de perda de dados.

Em rede Wi-Fi, o diagnóstico também separa cobertura de configuração. Se apenas um equipamento perde conexão, o problema pode estar nele. Se todos falham no mesmo ponto do imóvel, a análise passa para roteador, obstáculos e posicionamento. Repetidor ou mesh só fazem sentido depois dessa leitura.

Quando o caso pode começar por acesso remoto, isso é informado. Quando precisa de abertura, medição ou teste prolongado, indicamos visita ou bancada. A página da Vila Amélia fica, assim, diferente das antigas landings genéricas: reconhece a particularidade da nomenclatura local e oferece um roteiro técnico próprio.`,
  pontosReferencia: [
    "Rua Arthur Bernardes",
    "USF Vila Amélia",
    "Jardim Amélia – Pinhais"
  ],
  tempoDeslocamento: "Atendimento combinado depois da triagem e da confirmação do endereço",
  servicosDestaque: [
    "Diagnóstico de notebook que não carrega",
    "Análise de HD e SSD com erros",
    "Backup e preservação de arquivos",
    "Correção de Windows lento ou instável",
    "Configuração de Wi-Fi",
    "Avaliação de memória e armazenamento"
  ],
  conteudoExclusivo: `Quando o dado é mais importante que a formatação

Em muitos chamados, o computador pode ser substituído; os arquivos, não. Por isso, quando a máquina apresenta travamentos, lentidão extrema ou falhas no disco, perguntamos primeiro o que precisa ser preservado. Se o armazenamento dá sinais de instabilidade, insistir em reinstalações ou testes pesados pode piorar o cenário.

Em notebook que não carrega, a investigação também precisa ser segmentada. Fonte, bateria, conector e placa produzem sintomas parecidos, mas exigem procedimentos diferentes. Trocar bateria sem testar alimentação pode não resolver.

A página da Vila Amélia concentra essa orientação justamente para não ser uma cópia do Jardim Amélia ou de outro bairro. A referência local ajuda a organizar a logística; a parte técnica explica como reduzir risco antes do reparo.`,
  problemasComuns: [
    "Notebook reconhece a fonte, mas não completa a carga",
    "Computador trava durante cópia de arquivos",
    "HD ou SSD desaparece de forma intermitente",
    "Windows fica lento depois de atualização",
    "Wi-Fi falha apenas em um equipamento",
    "Arquivos importantes sem cópia recente"
  ],
  dicasLocais: `Ao pedir atendimento na Vila Amélia, informe o endereço e, se fizer sentido para sua localização, a Rua Arthur Bernardes ou a USF Vila Amélia como referência. Para falhas de disco, evite continuar gravando arquivos; para notebook que não carrega, informe se o LED da fonte e do equipamento acendem. Esses detalhes ajudam a escolher o procedimento correto antes da visita.`,
};

const VilaAmeliaPinhais = () => <BairroTemplate data={data} />;

export default VilaAmeliaPinhais;
