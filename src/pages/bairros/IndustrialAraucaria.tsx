import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Araucária: UBS Industrial — Rua Andorinha, 151, Jardim Industrial.
// - Documentos municipais identificam a região como área industrial de Araucária.
const data = {
  nome: "Jardim Industrial",
  slug: "industrial-araucaria",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Jardim Industrial, Araucária | Suporte",
  metaDescription: "Suporte de informática no Jardim Industrial, Araucária. Diagnóstico de PCs, notebooks, rede e periféricos com foco em continuidade de operação.",
  h1: "Técnico de Informática no Jardim Industrial – Araucária",
  subtitulo: "Triagem técnica para reduzir parada de equipamento, com suporte remoto, visita ou bancada conforme o defeito.",
  descricaoLonga: `O Jardim Industrial é reconhecido nas estruturas municipais de Araucária e conta com a UBS Industrial na Rua Andorinha. A própria documentação da Prefeitura identifica a região como área industrial do município. Essas referências dão base concreta à página e evitam depender de descrições genéricas.

Em ambientes onde o computador é parte de uma rotina de trabalho, o diagnóstico precisa começar pelo impacto da falha. Um PC que não acessa a rede exige abordagem diferente de uma máquina que liga, mas não abre o sistema. Uma impressora que deixa de responder pode ter problema de comunicação, driver ou fila; um computador que reinicia sob carga pode apontar para temperatura, alimentação ou hardware.

Quando a máquina ainda está operacional, a triagem remota pode ajudar a verificar eventos do Windows, uso de recursos, drivers, conectividade e comportamento da rede. Se há falha física, ausência de vídeo, superaquecimento ou necessidade de abertura, o atendimento passa para visita ou bancada.

Em rede, o objetivo é separar falha do computador, do switch ou roteador, do cabeamento e da conexão principal. Em estações com arquivos locais importantes, backup e sincronização entram antes de reinstalação. Em upgrades, SSD e memória só são indicados quando o gargalo é confirmado.

A página do Jardim Industrial foi reescrita para ter uma intenção própria: reduzir indisponibilidade e orientar diagnóstico de rede, estação e periféricos, sem repetir a mesma copy usada em bairros residenciais.`,
  pontosReferencia: [
    "Rua Andorinha",
    "UBS Industrial",
    "Jardim Industrial – Araucária"
  ],
  tempoDeslocamento: "Atendimento definido após triagem da falha e do endereço",
  servicosDestaque: [
    "Diagnóstico de estação que não inicia",
    "Configuração e análise de rede",
    "Impressora e periféricos",
    "Correção de Windows",
    "Backup antes de manutenção",
    "Avaliação de SSD e memória"
  ],
  conteudoExclusivo: `Quando a prioridade é reduzir a parada

Em uma estação usada durante o expediente, o primeiro passo é saber o que ficou indisponível: sistema, rede, programa, impressora ou o próprio equipamento. Essa informação determina a sequência de testes.

Se a rede falha apenas em um computador, adaptador e configuração entram primeiro. Se várias máquinas falham juntas, a investigação muda para infraestrutura. Se o Windows ainda abre, é possível coletar informações antes de reinstalar. Se não há vídeo ou energia, o caminho é físico.

Essa lógica reduz tentativa e erro e dá à página do Jardim Industrial uma função técnica específica.`,
  problemasComuns: [
    "Computador não conecta à rede",
    "Estação reinicia durante uso",
    "Impressora deixa de comunicar",
    "Windows inicia com erro",
    "SSD apresenta lentidão",
    "Arquivos locais precisam ser preservados"
  ],
  dicasLocais: `Ao pedir atendimento no Jardim Industrial, informe o endereço e uma referência como a UBS Industrial ou a Rua Andorinha. Diga qual atividade ficou parada e se outros computadores apresentam o mesmo problema. Em falha de rede, essa comparação ajuda a separar defeito local de infraestrutura.`,
};

const IndustrialAraucaria = () => <BairroTemplate data={data} />;

export default IndustrialAraucaria;
