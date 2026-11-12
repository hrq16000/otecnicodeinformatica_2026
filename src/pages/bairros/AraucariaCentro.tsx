import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Araucária: Centro de Saúde Araucária / NIS — Rua Guilherme da Motta Corrêa, 55, Centro.
// - Prefeitura de Araucária: CAPS, Hospital Infantil e outros equipamentos municipais no Centro.
// - Paço Municipal — Rua Pedro Druszcz, 111, Centro.
const data = {
  nome: "Centro de Araucária",
  slug: "centro-araucaria",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Centro de Araucária | Suporte",
  metaDescription: "Suporte de informática no Centro de Araucária. Diagnóstico de Windows, rede, impressora, notebook e arquivos com foco em continuidade de trabalho.",
  h1: "Técnico de Informática no Centro de Araucária",
  subtitulo: "Triagem para reduzir parada de computador, rede e periféricos sem recorrer a formatação automática.",
  descricaoLonga: `O Centro de Araucária concentra equipamentos municipais e possui referências públicas claras, como o Centro de Saúde Araucária na Rua Guilherme da Motta Corrêa e o Paço Municipal na Rua Pedro Druszcz. A região também reúne outros serviços públicos municipais. Essas referências tornam a localização objetiva sem precisar preencher a página com pontos genéricos.

Nesta rota, o foco técnico está em continuidade de trabalho. Computador que ainda liga mas perde acesso à internet, impressora, arquivos, aplicativo ou periférico pode interromper uma rotina mesmo sem apresentar defeito físico evidente. A triagem começa perguntando qual função parou e se o problema afeta apenas uma máquina ou várias.

Se o Windows continua operacional, verificamos eventos, atualizações, drivers, uso de memória, armazenamento e comunicação de rede. Em impressoras, testamos fila, driver, conexão e disponibilidade em outro computador. Em rede, comparamos outros dispositivos antes de culpar o roteador. Em aplicativos, buscamos diferenciar erro do sistema, do programa e do armazenamento.

Quando o equipamento não liga, perde vídeo ou apresenta falha física, o caso sai da linha de software e passa para diagnóstico presencial ou bancada. Quando há arquivos locais importantes, backup vem antes de reinstalação. Em notebook, fonte, bateria e temperatura também entram quando há desligamento ou perda de desempenho.

A página do Centro de Araucária foi reescrita para orientar a recuperação da função que realmente ficou indisponível. A referência central ajuda na logística; a solução é escolhida para reduzir retrabalho e preservar dados.`,
  pontosReferencia: [
    "Rua Guilherme da Motta Corrêa",
    "Centro de Saúde Araucária / NIS",
    "Rua Pedro Druszcz",
    "Paço Municipal",
    "Centro – Araucária"
  ],
  tempoDeslocamento: "Horário confirmado após triagem e endereço",
  servicosDestaque: [
    "Correção de Windows e aplicativos",
    "Impressora e periféricos",
    "Diagnóstico de rede",
    "Notebook com falha de desempenho",
    "Backup de arquivos",
    "Análise de SSD e memória"
  ],
  conteudoExclusivo: `O que parou de funcionar é mais importante que o nome do defeito

Quando uma máquina ainda liga, saber se o problema está no programa, na impressora, na internet ou nos arquivos reduz muito o tempo de diagnóstico. Em rede, comparar outras estações ajuda a separar falha local de infraestrutura. Em impressora, testar outro computador mostra se a causa está na máquina ou no dispositivo.

Formatação só entra quando há justificativa e backup resolvido. Se existe sinal de falha física, a linha de diagnóstico muda.

Essa abordagem dá à página do Centro uma função própria: recuperar continuidade de uso sem aplicar uma solução genérica para problemas diferentes.`,
  problemasComuns: [
    "Aplicativo importante deixa de abrir",
    "Impressora fica offline",
    "Computador perde acesso à rede",
    "Windows apresenta erro após atualização",
    "Notebook reinicia durante uso",
    "Arquivos importantes precisam de backup"
  ],
  dicasLocais: `Ao pedir atendimento no Centro de Araucária, envie rua, número e uma referência como o NIS ou o Paço Municipal. Diga qual função ficou indisponível e se outros computadores apresentam o mesmo problema. Isso ajuda a decidir entre suporte remoto, visita e bancada.`,
};

const AraucariaCentro = () => <BairroTemplate data={data} />;

export default AraucariaCentro;
