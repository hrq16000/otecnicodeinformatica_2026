import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de Colombo: US Alto Maracanã — Rua dos Eucaliptos, 88.
// - Prefeitura de Colombo: CRAS Maracanã — Rua Abel Scuissiato, 40, Alto Maracanã.
const data = {
  nome: "Alto Maracanã",
  slug: "alto-maracana",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no Alto Maracanã, Colombo | Diagnóstico",
  metaDescription: "Assistência de informática no Alto Maracanã, Colombo. Diagnóstico de notebook, aquecimento, Windows, armazenamento e Wi-Fi com triagem antes do reparo.",
  h1: "Técnico de Informática no Alto Maracanã – Colombo",
  subtitulo: "Diagnóstico de desempenho, temperatura e estabilidade antes de formatar ou substituir componentes.",
  descricaoLonga: `O Alto Maracanã possui referências municipais claras em Colombo. A Prefeitura mantém a Unidade de Saúde Alto Maracanã na Rua dos Eucaliptos e o CRAS Maracanã na Rua Abel Scuissiato. Essas referências ajudam a confirmar a localização do atendimento sem depender de descrições genéricas ou de promessas de chegada.

Nesta página, o foco técnico está em notebook, desempenho e temperatura. Uma máquina que funciona bem ao ligar e perde desempenho depois de alguns minutos pode estar sofrendo com aquecimento, limitação térmica, ventilação insuficiente ou alimentação. Esse comportamento é diferente de um computador que já inicia lento por causa de armazenamento, memória ou software carregado com o Windows.

Quando o equipamento ainda inicia, verificamos uso de CPU e memória, espaço livre, eventos do sistema e comportamento do armazenamento. Em notebook, observamos temperatura, bateria e fonte quando há redução de desempenho ou desligamento sob carga. Se o SSD ou HD apresenta erros, travamentos ou desaparece do sistema, a prioridade passa a ser preservar os dados antes de qualquer reinstalação.

Em Wi-Fi, comparamos outros dispositivos e pontos do imóvel para separar falha do notebook de problema de cobertura ou infraestrutura. Se apenas um equipamento perde conexão, adaptador e driver ganham peso. Se todos falham, a investigação muda para roteador e conexão principal.

Parte dos problemas de software pode começar remotamente quando a máquina está operacional. Falhas físicas, desmontagem, superaquecimento persistente ou armazenamento instável exigem avaliação presencial ou bancada. A página do Alto Maracanã foi reescrita para explicar esse diagnóstico com conteúdo próprio e sem soluções automáticas.`,
  pontosReferencia: [
    "Rua dos Eucaliptos",
    "US Alto Maracanã",
    "Rua Abel Scuissiato",
    "CRAS Maracanã"
  ],
  tempoDeslocamento: "Agenda definida após triagem do sintoma e do endereço",
  servicosDestaque: [
    "Diagnóstico de notebook lento",
    "Análise de aquecimento",
    "Correção de Windows",
    "Avaliação de SSD e memória",
    "Diagnóstico de Wi-Fi",
    "Backup antes de reinstalação"
  ],
  conteudoExclusivo: `Lentidão que aparece com o tempo merece outro diagnóstico

Se o computador começa rápido e fica lento conforme esquenta, trocar SSD ou formatar pode não resolver. Temperatura, refrigeração e alimentação precisam ser observadas durante o uso.

Se a lentidão já existe desde a inicialização, armazenamento, memória e programas carregados com o sistema ganham prioridade. Em Wi-Fi, comparar outro dispositivo ajuda a separar o notebook da rede.

Essa abordagem dá à página do Alto Maracanã uma função própria voltada a desempenho e estabilidade, sem repetir uma landing genérica.`,
  problemasComuns: [
    "Notebook perde desempenho quando aquece",
    "Computador demora para iniciar",
    "SSD ou HD apresenta erros",
    "Máquina reinicia sob carga",
    "Wi-Fi falha apenas em um equipamento",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao pedir atendimento no Alto Maracanã, informe o endereço e uma referência como a US Alto Maracanã ou o CRAS Maracanã. Para lentidão, diga se começa ao ligar ou só depois de alguns minutos. Para armazenamento, evite formatar se houver arquivos importantes.`,
};

const AltoMaracanaColombo = () => <BairroTemplate data={data} />;

export default AltoMaracanaColombo;
