import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de Colombo: CMEI Monza — Rua Ângelo Francisco Borato, 169, Jardim Monza.
// - Prefeitura de Colombo: unidade do PEMSE instalada no Jardim Monza.
const data = {
  nome: "Jardim Monza",
  slug: "monza-colombo",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no Jardim Monza, Colombo | Suporte",
  metaDescription: "Assistência de informática no Jardim Monza, Colombo. Diagnóstico de Windows, impressora, Wi-Fi e notebook com triagem antes da execução.",
  h1: "Técnico de Informática no Jardim Monza – Colombo",
  subtitulo: "Triagem para Windows, periféricos e conectividade antes de formatar ou substituir equipamentos.",
  descricaoLonga: `O Jardim Monza possui referências municipais atuais em Colombo. A Prefeitura está implantando o CMEI Monza na Rua Ângelo Francisco Borato e mantém no bairro uma unidade do Programa Especializado em Medidas Socioeducativas. Essas referências confirmam a localidade e permitem trabalhar a página sem inventar contexto geográfico.

Nesta rota, o foco técnico está em Windows, periféricos e conectividade. Um computador pode continuar ligando e ainda assim ficar difícil de usar quando um aplicativo deixa de abrir, a impressora fica offline, o áudio some ou a rede perde estabilidade. Esses sintomas não significam automaticamente que a máquina precisa ser formatada.

Quando o sistema ainda inicia, verificamos eventos do Windows, atualizações, drivers, uso de memória e comunicação com dispositivos. Em impressoras, testamos fila, conexão e funcionamento em outro computador. Em webcam, áudio ou USB, observamos se o equipamento continua sendo reconhecido antes de considerar falha física.

Em rede, comparamos outros dispositivos e ambientes. Se apenas uma máquina perde conexão, driver ou adaptador ganham peso. Se todos os aparelhos falham juntos, o diagnóstico muda para roteador, cabeamento e conexão principal.

Em notebook, fonte, bateria, temperatura e armazenamento também entram quando há queda de desempenho. Se existem arquivos importantes, backup vem antes de reinstalação. A página do Jardim Monza foi reescrita para orientar esse processo com conteúdo próprio e sem tratar formatação como resposta padrão.`,
  pontosReferencia: [
    "Rua Ângelo Francisco Borato",
    "CMEI Monza",
    "Jardim Monza – Colombo",
    "Unidade do PEMSE no Jardim Monza"
  ],
  tempoDeslocamento: "Agenda definida após triagem do problema e do endereço",
  servicosDestaque: [
    "Correção de Windows e drivers",
    "Impressora e periféricos",
    "Diagnóstico de Wi-Fi",
    "Notebook com falha de desempenho",
    "Backup antes de reinstalação",
    "Avaliação de hardware"
  ],
  conteudoExclusivo: `Periférico parado não significa computador quebrado

Uma impressora, webcam ou dispositivo USB pode parar por driver, configuração, porta ou atualização. Antes de substituir hardware, verificamos se o sistema ainda reconhece o equipamento.

Em rede, comparar outro dispositivo no mesmo ponto ajuda a separar a estação da infraestrutura. Em Windows, reinstalação só entra quando existe motivo técnico e backup resolvido.

Essa abordagem dá à página do Jardim Monza uma função própria voltada a sistema, periféricos e conectividade.`,
  problemasComuns: [
    "Impressora fica offline",
    "Aplicativo deixa de abrir",
    "Webcam ou áudio para de funcionar",
    "Wi-Fi falha em apenas um computador",
    "Notebook perde desempenho",
    "Arquivos importantes precisam de backup"
  ],
  dicasLocais: `Ao solicitar atendimento no Jardim Monza, informe o endereço e uma referência como o CMEI Monza ou a Rua Ângelo Francisco Borato. Para periféricos, envie a mensagem de erro; para rede, teste outro aparelho; para Windows, informe o que mudou antes da falha.`,
};

const MonzaColombo = () => <BairroTemplate data={data} />;

export default MonzaColombo;
