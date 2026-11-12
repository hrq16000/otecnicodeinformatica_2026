import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de São José dos Pinhais: Unidade de Saúde Braga integra a rede municipal.
// - Escola Municipal Pedro Moro Redeschi — Rua Joinville, 2678, Vila Braga.
// - Escola Municipal Madre Paulina — Rua Campo Largo, 920, Braga.
const data = {
  nome: "Braga",
  slug: "braga",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Braga, SJP | Suporte",
  metaDescription: "Suporte de informática no Braga, São José dos Pinhais. Diagnóstico de PC, rede, Windows e periféricos com triagem antes da execução.",
  h1: "Técnico de Informática no Braga – São José dos Pinhais",
  subtitulo: "Diagnóstico de inicialização, tela azul e estabilidade antes de formatar ou trocar componentes.",
  descricaoLonga: `O Braga possui referências municipais claras em São José dos Pinhais. A Unidade de Saúde Braga integra a rede pública, a Escola Municipal Pedro Moro Redeschi fica na Rua Joinville e a Escola Municipal Madre Paulina na Rua Campo Largo. Essas referências servem para confirmar a localização sem criar promessas de deslocamento.

Nesta página, o foco técnico passa a ser inicialização e estabilidade do computador. Tela azul, reparo automático, reinicialização em ciclo e máquina que liga sem chegar ao Windows são sintomas que precisam ser separados antes de qualquer reinstalação. A causa pode estar no sistema, memória, armazenamento, temperatura ou alimentação.

Se o Windows ainda abre, coletamos códigos de erro, eventos, estado do SSD ou HD e uso de memória. Se a máquina cai em reparo automático ou deixa de reconhecer o disco, o armazenamento merece atenção antes de formatar. Em tela azul, uma foto do código e a informação sobre o que aconteceu imediatamente antes da falha ajudam a direcionar os testes.

Quando o computador reinicia sob carga, fonte e temperatura entram na investigação. Se liga sem vídeo, memória, vídeo e alimentação passam à frente do sistema operacional. Arquivos importantes são considerados antes de testes destrutivos ou reinstalação.

A triagem remota faz sentido quando a máquina ainda inicia e permite coletar dados. Casos sem vídeo, sem energia ou com armazenamento instável exigem visita ou bancada. A página do Braga foi reescrita para responder a falhas de inicialização e estabilidade, com uma intenção diferente das páginas de rede e periféricos.`,
  pontosReferencia: [
    "Unidade de Saúde Braga",
    "Rua Joinville",
    "Escola Municipal Pedro Moro Redeschi",
    "Rua Campo Largo",
    "Escola Municipal Madre Paulina"
  ],
  tempoDeslocamento: "Agenda definida após triagem do problema e do endereço",
  tituloSecaoPrincipal: "Diagnóstico de boot e estabilidade no Braga",
  tituloSecaoContexto: "Tela azul, reparo automático e boot: sinais que mudam a investigação",
  triagemResumo: "No Braga, a triagem registra o código da tela azul, o comportamento durante o boot e se o armazenamento continua reconhecido. Isso ajuda a separar driver e sistema de memória, disco, temperatura e alimentação antes de qualquer formatação.",
  faqTitulo: "Dúvidas sobre inicialização e tela azul no Braga",
  faqsCustom: [
    { question: "Tela azul no Braga significa que preciso formatar?", answer: "Não. O código pode apontar para driver, memória, armazenamento ou outro componente. A formatação só entra depois de separar essas hipóteses." },
    { question: "Reparo automático recorrente pode ser problema no SSD ou HD?", answer: "Pode. Se o armazenamento está instável, o Windows pode falhar ao iniciar. O estado do disco é verificado antes de reinstalar o sistema." },
    { question: "Se o PC liga mas não mostra imagem, ainda é problema de Windows?", answer: "Normalmente a investigação começa antes do Windows: memória, vídeo, alimentação e outros sinais físicos precisam ser testados." },
    { question: "O diagnóstico de tela azul pode começar remotamente?", answer: "Se o Windows ainda inicia e permite coletar o código e os eventos, sim. Sem vídeo, sem energia ou com disco instável, a avaliação física é mais adequada." },
  ],
  servicosDestaque: [
    "Diagnóstico de tela azul",
    "Windows em reparo automático",
    "PC que reinicia ou não inicia",
    "Teste de SSD e HD",
    "Teste de memória",
    "Backup antes de reinstalação"
  ],
  conteudoExclusivo: `Tela azul e reparo automático não significam a mesma causa

Um código de tela azul pode apontar para driver, memória ou hardware. Reparo automático recorrente pode surgir por falha no sistema ou por armazenamento instável. Já um computador que liga sem vídeo precisa de uma linha de testes física.

Por isso, o atendimento no Braga começa registrando o sintoma exato e o momento em que ele aparece. Se houver dados importantes, o estado do armazenamento é verificado antes de reinstalar o Windows.

Essa separação reduz tentativas e dá à página do Braga uma função editorial própria voltada a inicialização e estabilidade.`,
  problemasComuns: [
    "Windows entra em reparo automático",
    "Tela azul com código recorrente",
    "Computador reinicia antes de abrir o sistema",
    "PC liga sem apresentar imagem",
    "SSD ou HD deixa de ser reconhecido",
    "Arquivos importantes antes de reinstalação"
  ],
  dicasLocais: `Ao pedir atendimento no Braga, informe o endereço e uma referência como a Unidade de Saúde Braga, Rua Joinville ou Rua Campo Largo. Para tela azul, envie foto do código; para reparo automático, diga se o disco aparece na BIOS; e, se houver arquivos importantes, evite formatar antes da triagem.`,
};

const Braga = () => <BairroTemplate data={data} />;

export default Braga;
