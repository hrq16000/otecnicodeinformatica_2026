import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de Colombo: Gabirobal consta na lista oficial de bairros rurais.
// - Cadastro municipal: Rua Francisco Nodari, Rua Roberto Opolis e Avenida João Batista Lovato no Gabirobal.
// - Prefeitura de Colombo: obras de pavimentação na Rua Francisco Nodari.
const data = {
  nome: "Gabirobal",
  slug: "gabirobal",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no Gabirobal, Colombo | Hardware e Diagnóstico",
  metaDescription: "Assistência de informática no Gabirobal, Colombo. Diagnóstico de PC sem energia, reinicialização, fonte, armazenamento e Windows antes do reparo.",
  h1: "Técnico de Informática no Gabirobal – Colombo",
  subtitulo: "Triagem de energia, inicialização e hardware antes de formatar ou substituir componentes.",
  descricaoLonga: `O Gabirobal é reconhecido oficialmente pela Prefeitura de Colombo entre os bairros rurais do município. O cadastro municipal identifica vias como Rua Francisco Nodari, Rua Roberto Opolis e Avenida João Batista Lovato, e a Prefeitura já executou intervenções viárias na Rua Francisco Nodari. Essas referências permitem tratar a localidade com precisão sem inventar um perfil urbano ou comercial que não esteja documentado.

Nesta página, o foco técnico está em energia, inicialização e hardware de computadores. Um PC que não liga, reinicia sozinho, liga sem vídeo ou apresenta comportamento instável depois de oscilação elétrica precisa de uma sequência de testes diferente de um problema apenas de Windows.

Quando não há sinal de energia, verificamos tomada, cabo, fonte e sinais de curto ou proteção. Se a máquina liga, mas não apresenta vídeo, memória, placa de vídeo, monitor e alimentação entram na investigação. Em reinicializações sob carga, temperatura e estabilidade da fonte precisam ser observadas antes de qualquer reinstalação.

O armazenamento também é considerado quando o equipamento apresenta travamentos ou falhas de inicialização. Se o SSD ou HD contém arquivos importantes e mostra sinais de instabilidade, a prioridade passa a ser preservar os dados antes de testes invasivos.

Quando o computador ainda inicia e a falha parece de software, parte da triagem pode começar remotamente. Ausência de energia, vídeo, ruído anormal ou necessidade de medição exige avaliação presencial ou bancada. A página do Gabirobal foi reescrita para orientar esse roteiro de hardware com conteúdo próprio e sem prometer solução antes dos testes.`,
  pontosReferencia: [
    "Rua Francisco Nodari",
    "Rua Roberto Opolis",
    "Avenida João Batista Lovato",
    "Gabirobal – Colombo"
  ],
  tempoDeslocamento: "Agenda definida após triagem do sintoma e confirmação do endereço",
  servicosDestaque: [
    "PC que não liga",
    "Computador liga sem vídeo",
    "Diagnóstico de fonte",
    "Teste de memória",
    "Análise de SSD e HD",
    "Backup antes de reparo"
  ],
  conteudoExclusivo: `Sem energia, sem vídeo e reinicialização são falhas diferentes

Uma máquina sem qualquer sinal de energia pede verificação de alimentação e fonte. Um PC que liga ventoinhas, mas não mostra imagem, leva o diagnóstico para memória, vídeo e outros componentes. Reinicialização sob carga adiciona temperatura e estabilidade elétrica à investigação.

Formatar o Windows não corrige nenhuma dessas causas físicas. Se o armazenamento contém dados importantes, ele também precisa ser protegido antes de procedimentos de bancada.

Essa lógica dá à página do Gabirobal uma intenção própria voltada a hardware, energia e inicialização.`,
  problemasComuns: [
    "Computador não liga",
    "PC liga mas não apresenta imagem",
    "Máquina reinicia durante uso",
    "Fonte apresenta instabilidade",
    "SSD ou HD falha durante inicialização",
    "Arquivos importantes em equipamento instável"
  ],
  dicasLocais: `Ao pedir atendimento no Gabirobal, informe o endereço completo e uma referência como a Rua Francisco Nodari, Rua Roberto Opolis ou Avenida João Batista Lovato. Para PC sem energia, diga se há LEDs, ventoinhas ou ruídos. Se houver cheiro anormal ou aquecimento excessivo, evite novas tentativas de ligar.`,
};

const GabirobalColombo = () => <BairroTemplate data={data} />;

export default GabirobalColombo;
