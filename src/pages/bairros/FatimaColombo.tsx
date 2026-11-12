import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de Colombo: Escola Municipal Nossa Senhora de Fátima — Rua São Pedro, 1161.
// - Prefeitura de Colombo: Centro POP / acolhimento social — Rua São Pedro, 840, Jardim Fátima.
// - Hospital de Olhos do Paraná — Rua São Pedro, 880, Fátima.
const data = {
  nome: "Fátima",
  slug: "fatima-colombo",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no Fátima, Colombo | Notebook e Suporte",
  metaDescription: "Assistência de informática no Fátima, Colombo. Diagnóstico de notebook, bateria, fonte, aquecimento e Windows com triagem antes do reparo.",
  h1: "Técnico de Informática no Fátima – Colombo",
  subtitulo: "Diagnóstico de notebook, energia e temperatura antes de trocar bateria, fonte ou formatar.",
  descricaoLonga: `O bairro Fátima possui referências municipais específicas em Colombo. A Prefeitura mantém a Escola Municipal Nossa Senhora de Fátima na Rua São Pedro, e a mesma via concentra outros equipamentos e serviços públicos da região. Essas referências permitem situar o atendimento sem recorrer a descrições genéricas do bairro.

Nesta página, o foco técnico está em notebook, energia e temperatura. Um equipamento que não carrega pode ter problema na fonte, bateria, conector ou circuito interno. Uma máquina que funciona bem fria e perde desempenho depois de algum tempo pode estar limitada por temperatura. Esses sintomas pedem testes diferentes e não justificam formatação automática.

Quando o notebook ainda inicia, verificamos autonomia, comportamento da fonte, temperatura, uso de memória e armazenamento. Se a bateria descarrega muito rápido, observamos se o problema ocorre apenas fora da tomada ou também durante uso conectado. Se há aquecimento, avaliamos quando aparece e se acompanha queda de desempenho ou desligamento.

O Windows também pode influenciar alguns sintomas, mas não deve ser tratado como culpado antes de excluir falhas físicas. Quando existem arquivos importantes, backup vem antes de reinstalação ou troca de armazenamento.

Se a máquina está operacional e conectada, parte da triagem pode começar remotamente. Falha de carga, conector, aquecimento persistente ou necessidade de desmontagem exigem visita ou bancada. A página do Fátima foi reescrita para orientar esse diagnóstico com conteúdo próprio e sem prometer solução antes dos testes.`,
  pontosReferencia: [
    "Rua São Pedro",
    "Escola Municipal Nossa Senhora de Fátima",
    "Centro POP",
    "Hospital de Olhos do Paraná – Colombo"
  ],
  tempoDeslocamento: "Agenda definida após triagem do notebook e do endereço",
  servicosDestaque: [
    "Notebook que não carrega",
    "Diagnóstico de bateria e fonte",
    "Análise de aquecimento",
    "Correção de Windows",
    "Backup antes de reparo",
    "Avaliação de SSD e memória"
  ],
  conteudoExclusivo: `Bateria, fonte e temperatura podem produzir sintomas parecidos

Quando o notebook não carrega, trocar bateria sem testar a alimentação pode não resolver. Fonte, conector e circuito interno também entram na análise.

Se a máquina perde desempenho apenas depois de aquecer, a causa pode estar na refrigeração. Se já inicia lenta, armazenamento e memória ganham prioridade.

Essa abordagem dá à página do Fátima uma intenção própria voltada a notebook, energia e temperatura.`,
  problemasComuns: [
    "Notebook não carrega",
    "Bateria perde autonomia rapidamente",
    "Conector de energia falha",
    "Máquina aquece e perde desempenho",
    "Windows apresenta instabilidade",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao pedir atendimento no Fátima, informe o endereço e uma referência como a Rua São Pedro. Para falha de carga, diga se os LEDs acendem; para aquecimento, informe em qual tarefa o problema aparece; para arquivos importantes, avise antes de qualquer reinstalação.`,
};

const FatimaColombo = () => <BairroTemplate data={data} />;

export default FatimaColombo;
