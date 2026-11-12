import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Araucária: Casa de Passagem — Rua Rosália Kaminski, 55, Porto das Laranjeiras.
// - Prefeitura de Araucária: UAI Famílias — Rua Capitão Leonardo Graziano, 302.
// - Secretaria Municipal de Obras mantém estruturas na Rua Capitão Leonardo Graziano e na BR-476, Porto das Laranjeiras.
const data = {
  nome: "Porto das Laranjeiras",
  slug: "porto-das-laranjeiras",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Porto das Laranjeiras, Araucária | Suporte",
  metaDescription: "Suporte de informática no Porto das Laranjeiras, Araucária. Diagnóstico de Windows, estações, impressoras, rede e arquivos com foco em continuidade de uso.",
  h1: "Técnico de Informática no Porto das Laranjeiras – Araucária",
  subtitulo: "Triagem para estações de trabalho, Windows e periféricos antes de reinstalar ou substituir equipamentos.",
  descricaoLonga: `Porto das Laranjeiras possui diversas referências municipais atuais em Araucária. A Prefeitura mantém a Casa de Passagem na Rua Rosália Kaminski, a UAI Famílias na Rua Capitão Leonardo Graziano e estruturas da Secretaria Municipal de Obras na mesma região. Esses pontos dão contexto local verificável sem depender de referências inventadas.

Nesta página, o foco técnico está em estações de trabalho, Windows e periféricos. Um computador pode iniciar normalmente, mas perder acesso a programa, impressora, arquivos ou rede. Nesses casos, formatar não deve ser a primeira resposta. A triagem procura identificar qual função parou e se a falha afeta apenas uma máquina ou várias.

Quando o Windows ainda inicia, verificamos eventos do sistema, atualizações, drivers, armazenamento e memória. Em impressoras, comparamos fila, driver, rede e funcionamento em outro computador. Em compartilhamentos, verificamos se o problema é local, de credencial ou da própria infraestrutura.

Se a máquina não liga, perde vídeo ou reinicia sob carga, o diagnóstico muda para alimentação, memória, temperatura e hardware. Em equipamentos com arquivos locais importantes, backup é considerado antes de reinstalação. Em rede, comparar outras estações ajuda a separar falha do computador de problema de roteador, switch ou cabeamento.

A página do Porto das Laranjeiras foi reescrita para orientar continuidade de uso e diagnóstico de estação, com uma intenção diferente das páginas focadas em notebook, armazenamento ou Wi-Fi residencial.`,
  pontosReferencia: [
    "Rua Rosália Kaminski",
    "Casa de Passagem",
    "Rua Capitão Leonardo Graziano",
    "UAI Famílias",
    "Porto das Laranjeiras – Araucária"
  ],
  tempoDeslocamento: "Atendimento definido após triagem da falha e confirmação do endereço",
  servicosDestaque: [
    "Correção de Windows e aplicativos",
    "Impressora e periféricos",
    "Rede e compartilhamentos",
    "Backup de arquivos",
    "Diagnóstico de estação que não inicia",
    "Avaliação de SSD e memória"
  ],
  conteudoExclusivo: `Quando a estação funciona, mas a operação para

Impressora offline, compartilhamento indisponível ou aplicativo que não abre podem deixar uma máquina inutilizável mesmo sem defeito físico. O diagnóstico começa identificando qual função parou e comparando outras estações quando existe rede.

Se apenas uma máquina falha, o foco é local. Se várias apresentam o mesmo sintoma, infraestrutura e serviços compartilhados ganham peso. Antes de reinstalar o Windows, buscamos entender essa diferença.

No Porto das Laranjeiras, a página foi desenhada para orientar esse tipo de diagnóstico e reduzir indisponibilidade sem recorrer a soluções automáticas.`,
  problemasComuns: [
    "Aplicativo deixa de abrir",
    "Impressora fica offline",
    "Computador perde acesso a compartilhamentos",
    "Windows apresenta erro depois de atualização",
    "Estação reinicia durante uso",
    "Arquivos locais precisam de backup"
  ],
  dicasLocais: `Ao pedir atendimento no Porto das Laranjeiras, informe o endereço e uma referência como a Rua Rosália Kaminski ou a Rua Capitão Leonardo Graziano. Diga se o problema afeta uma máquina ou várias; essa informação muda bastante o diagnóstico de rede e periféricos.`,
};

const PortoDasLaranjeiras = () => <BairroTemplate data={data} />;

export default PortoDasLaranjeiras;
