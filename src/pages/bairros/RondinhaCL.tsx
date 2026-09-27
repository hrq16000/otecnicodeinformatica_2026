import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Campo Largo: Unidade de Saúde Jardim Rondinha — Estrada Sereia, s/n, Rondinha.
// - Prefeitura de Campo Largo: ações municipais de atualização cadastral realizadas na unidade do Rondinha.
const data = {
  nome: "Rondinha",
  slug: "rondinha",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática no Rondinha, Campo Largo | Suporte",
  metaDescription: "Suporte de informática no Rondinha, Campo Largo. Diagnóstico de notebook, PC, rede e arquivos, com atendimento definido após triagem.",
  h1: "Técnico de Informática no Rondinha – Campo Largo",
  subtitulo: "Atendimento organizado pelo sintoma e pelo endereço, com orientação antes de qualquer intervenção.",
  descricaoLonga: `O Rondinha aparece de forma explícita nas estruturas municipais de Campo Largo. A Unidade de Saúde Jardim Rondinha fica na Estrada Sereia, endereço utilizado também em ações recentes da Prefeitura. Essa referência permite situar o chamado sem recorrer a descrições genéricas do bairro.

No suporte técnico, começamos pelo que o equipamento faz — ou deixou de fazer. Um computador que inicia, mas apresenta tela azul, precisa ter código de erro e histórico avaliados. Um notebook que trava somente em tarefas pesadas pode estar limitado por temperatura, memória ou armazenamento. Uma máquina que não reconhece um SSD ou HD exige cautela extra quando existem arquivos importantes.

Para problemas de sistema, a triagem pode ser remota se o computador ainda estiver utilizável. Isso ajuda a verificar espaço, atualizações, drivers e eventos do Windows antes de qualquer decisão de formatação. Se o equipamento não inicia, apresenta ruído de disco, falha de alimentação ou precisa de abertura, o caso passa para atendimento físico.

Em redes, tentamos separar cobertura, roteador, provedor e dispositivo. Se o Wi-Fi falha apenas em um equipamento, driver e adaptador entram no diagnóstico. Se todos os aparelhos apresentam lentidão, o problema pode estar em outro ponto da rede. A compra de repetidor ou mesh só faz sentido depois de entender esse cenário.

No Rondinha, a página passa a funcionar como uma orientação técnica própria: explica o que observar, quais riscos evitar e como decidir a modalidade do atendimento. A referência local ajuda na agenda; o diagnóstico continua sendo guiado por evidências do equipamento.`,
  pontosReferencia: [
    "Estrada Sereia",
    "Unidade de Saúde Jardim Rondinha",
    "Rondinha – Campo Largo"
  ],
  tempoDeslocamento: "Atendimento combinado após confirmar sintoma e endereço",
  servicosDestaque: [
    "Diagnóstico de tela azul e travamentos",
    "Notebook com queda de desempenho",
    "Análise de SSD e HD",
    "Backup e recuperação de arquivos",
    "Configuração de rede e Wi-Fi",
    "Correção de Windows e drivers"
  ],
  conteudoExclusivo: `Quando preservar o dado vem antes de tentar consertar

Se o computador apresenta erros de armazenamento, ruído, travamento ao copiar arquivos ou desaparecimento do disco, o objetivo inicial não é “fazer voltar a funcionar a qualquer custo”. Primeiro é preciso avaliar o risco para os dados. Reinstalar o sistema ou insistir em testes pesados pode piorar a situação em um disco instável.

Em tela azul, uma foto do código ajuda muito. Em notebook que perde desempenho, informar qual programa estava em uso pode indicar se a falha aparece sob carga. Em rede, comparar dois dispositivos no mesmo ponto ajuda a separar Wi-Fi de defeito no computador.

Essas perguntas tornam o atendimento no Rondinha mais eficiente e evitam procedimentos genéricos. A página foi construída para explicar exatamente esse raciocínio.`,
  problemasComuns: [
    "Tela azul com código recorrente",
    "Computador trava ao copiar ou abrir arquivos",
    "SSD ou HD some de forma intermitente",
    "Notebook perde desempenho sob carga",
    "Wi-Fi falha apenas em um equipamento",
    "Windows apresenta erros após atualização"
  ],
  dicasLocais: `Ao solicitar atendimento no Rondinha, informe o endereço e uma referência como a Estrada Sereia ou a Unidade de Saúde Jardim Rondinha. Para erro de armazenamento, evite continuar gravando arquivos. Para tela azul, tire foto do código. Para Wi-Fi, teste outro aparelho no mesmo ponto antes de iniciar a triagem.`,
};

const RondinhaCL = () => <BairroTemplate data={data} />;

export default RondinhaCL;
