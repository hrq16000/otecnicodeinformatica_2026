/**
 * FASE 4 — GUIAS DE DECISÃO INDEPENDENTES (/decisoes e /decisoes/<slug>).
 *
 * Cada guia responde UMA pergunta que decide orçamento. O conteúdo aqui é a
 * versão aprofundada dos cards de decisão do Atlas (ATLAS_GUIAS_DECISAO):
 * o card continua existindo no hub e passa a apontar para a página completa.
 *
 * Contrato editorial (herdado do Atlas e da Biblioteca):
 *  - texto autoral, sem cópia de fonte; fontes primárias citadas de forma
 *    visível apenas quando o guia depende de comportamento/política externa;
 *  - nenhum preço fora de precosConfig, nenhuma promessa de prazo, nenhum
 *    número inventado;
 *  - nunca recomendar desativação permanente de proteção de segurança;
 *  - todo link interno aponta para URL que já existe.
 */
import type { FontePrimaria } from "@/lib/enriquecimento";
import { ATLAS_GUIAS_DECISAO, type AtlasGuiaDecisao } from "@/lib/atlasInformatica";
import type { LinkContextual } from "@/lib/glossarioTecnico";

export const DECISOES_REVISADO_EM = "2026-09-01";

export type BlocoDecisao = { titulo: string; texto: string };

export type PerguntaDecisao = { pergunta: string; resposta: string };

export type GuiaDecisaoPagina = {
  /** Igual ao id do card em ATLAS_GUIAS_DECISAO (âncora #decisao-<id>). */
  slug: string;
  /** H1 da página — pergunta completa. */
  h1: string;
  /** Nome curto para breadcrumb e cards. */
  nomeCurto: string;
  /** 1–2 frases: hub e meta description. */
  resumo: string;
  /** Resposta direta logo abaixo do H1 — sem rodeio. */
  respostaDireta: string;
  /** Contexto autoral em parágrafos. */
  contexto: string[];
  /** Como decidir na prática — passos observáveis, sem abrir equipamento. */
  comoDecidir: BlocoDecisao[];
  /** O que costuma pesar no custo da decisão (sem valor inventado). */
  custo: string;
  /** Condições em que a decisão deixa de ser do usuário. */
  ondeParar: string[];
  perguntas: PerguntaDecisao[];
  links: LinkContextual[];
  fontes?: FontePrimaria[];
};

export const GUIAS_DECISAO: GuiaDecisaoPagina[] = [
  {
    slug: "formatar-ou-reparar",
    h1: "Formatar ou reparar: como decidir sem perder dados nem dinheiro",
    nomeCurto: "Formatar ou reparar",
    resumo:
      "Formatação resolve problema de software. Se a causa é disco, memória ou temperatura, o computador volta a falhar — este guia mostra como separar os dois casos antes de autorizar qualquer coisa.",
    respostaDireta:
      "Formate quando o sistema carrega e o problema é comportamento de software; repare (ou diagnostique antes) quando a falha aparece antes do Windows terminar de carregar, quando há ruído de disco, alerta S.M.A.R.T. ou quando a lentidão volta pouco depois de cada formatação.",
    contexto: [
      "Formatar é reinstalar o sistema do zero: apaga tudo que estiver no disco do sistema e devolve um Windows limpo. É um procedimento previsível e barato de executar, e por isso vira a primeira sugestão em muito atendimento — inclusive quando não resolve nada.",
      "O erro comum não é formatar: é formatar sem diagnóstico. Um disco mecânico com setores em falha continua com setores em falha depois da formatação; memória instável continua gerando travamento; um notebook que se desliga por temperatura continua se desligando. O cliente paga por um procedimento correto aplicado ao problema errado.",
      "O caminho honesto é inverter a ordem: primeiro identificar se o sintoma é de software ou de hardware; só então escolher entre reinstalar, substituir peça ou não fazer nada. Em boa parte dos casos que chegam como 'preciso formatar', a resposta técnica é outra.",
    ],
    comoDecidir: [
      {
        titulo: "1. Observe em que momento a falha aparece",
        texto:
          "Se a falha só acontece depois que a área de trabalho carregou, o campo provável é software. Se ela aparece antes disso — logo do fabricante travado, mensagem de dispositivo de inicialização não encontrado, reinício em laço — a formatação não é o ponto de partida.",
      },
      {
        titulo: "2. Verifique a saúde do disco antes de qualquer coisa",
        texto:
          "A leitura S.M.A.R.T. do disco é consulta, não intervenção: ela mostra contadores de setores realocados e erros de leitura. Disco com contador crescente não deve receber nenhuma escrita adicional — e formatar é escrita.",
      },
      {
        titulo: "3. Cheque se a lentidão é reincidente",
        texto:
          "Máquina que ficou boa por dias e voltou a arrastar tem causa estrutural: disco mecânico, memória insuficiente para o uso real ou temperatura. Reinstalar de novo só compra o mesmo intervalo curto.",
      },
      {
        titulo: "4. Só então decida — com o backup conferido",
        texto:
          "Formatação sem backup testado é a origem da maior parte das perdas de arquivo que chegam à bancada. Confira que os arquivos foram copiados E que abrem na cópia antes de autorizar a reinstalação.",
      },
    ],
    custo:
      "O custo real da decisão raramente está no procedimento: está em repeti-lo. Duas formatações em sequência custam mais que um diagnóstico feito uma vez. Os valores de referência de cada serviço ficam sempre visíveis na página de preços e políticas — nunca são combinados por telefone sem escopo.",
    ondeParar: [
      "Disco fazendo ruído mecânico (clique repetido, arranhado) — pare de usar o equipamento imediatamente.",
      "Alerta S.M.A.R.T. de falha iminente ou setores realocados crescendo.",
      "Arquivos importantes sem cópia conferida — não autorize formatação antes de resolver isso.",
      "Tela azul recorrente com códigos diferentes a cada ocorrência: costuma ser memória ou energia, não sistema.",
    ],
    perguntas: [
      {
        pergunta: "Formatar deixa o computador mais rápido de forma permanente?",
        resposta:
          "Só quando a lentidão era de software: acúmulo de programas em inicialização, infecção, atualização corrompida. Se o gargalo é disco mecânico ou memória insuficiente, o ganho dura pouco e a máquina volta ao mesmo estado.",
      },
      {
        pergunta: "Dá para formatar sem perder arquivos?",
        resposta:
          "Dá para preservar arquivos copiando-os antes para outra mídia e conferindo que abrem na cópia. Recursos de reinstalação que prometem manter arquivos existem, mas dependem de o disco estar saudável — não são backup.",
      },
      {
        pergunta: "E se eu já formatei e o problema continuou?",
        resposta:
          "É um sinal forte de causa física. A partir daí, o próximo passo é medir disco, memória e temperatura, e não repetir a reinstalação.",
      },
    ],
    links: [
      {
        rotulo: "Checklist antes de formatar",
        to: "/ferramentas/checklist-antes-de-formatar",
        contexto: "O que copiar, testar e anotar antes de autorizar a reinstalação.",
      },
      {
        rotulo: "Formatação e reinstalação",
        to: "/solucoes/formatacao",
        contexto: "Escopo, o que fica preservado e o que é apagado por definição.",
      },
      {
        rotulo: "Computador lento",
        to: "/problemas/computador-lento",
        contexto: "Se a queixa principal é lentidão, comece pelo diagnóstico do gargalo.",
      },
      {
        rotulo: "Atlas de informática",
        to: "/guia-tecnico-informatica",
        contexto: "Trilha completa de Windows e inicialização, do fundamento à solução.",
      },
    ],
    fontes: [
      {
        titulo: "Microsoft Learn — opções de recuperação no Windows",
        url: "https://support.microsoft.com/pt-br/windows/op%C3%A7%C3%B5es-de-recupera%C3%A7%C3%A3o-no-windows-31ce2444-7de3-818c-d626-e3b5a3024da5",
        nota: "Referência oficial sobre reinstalação, redefinição e recuperação do sistema.",
      },
    ],
  },
  {
    slug: "ssd-ou-memoria-ram",
    h1: "SSD ou mais memória RAM: qual upgrade resolve o seu caso",
    nomeCurto: "SSD ou RAM",
    resumo:
      "Lentidão desde a inicialização aponta para o disco; travamento só com muitos programas abertos aponta para a memória. Este guia separa os dois gargalos com sinais observáveis.",
    respostaDireta:
      "Se tudo é lento — ligar, abrir programa, salvar arquivo — o gargalo é o disco e o SSD é o upgrade certo. Se a máquina responde bem com pouca coisa aberta e engasga conforme você abre abas e programas, o gargalo é memória.",
    contexto: [
      "SSD e memória resolvem lentidões diferentes e não são intercambiáveis. Trocar memória em uma máquina com disco mecânico costuma render pouco; instalar SSD em uma máquina com memória no limite melhora a partida mas não o travamento sob carga.",
      "A confusão acontece porque o sintoma que o usuário relata é o mesmo — 'está lento'. A diferença aparece na observação: quando a lentidão se manifesta e com o quê.",
      "Em máquinas antigas, a resposta às vezes é ambos — e aí entra a pergunta de viabilidade: a soma dos dois upgrades ainda compensa nesse equipamento?",
    ],
    comoDecidir: [
      {
        titulo: "1. Cronometre a partida",
        texto:
          "Do botão liga até a área de trabalho utilizável. Partida longa com ruído contínuo de leitura é assinatura de disco mecânico saturado — não de memória.",
      },
      {
        titulo: "2. Observe o comportamento sob carga",
        texto:
          "Abra o que você realmente usa em um dia de trabalho. Se a máquina só piora quando muita coisa está aberta, e abas do navegador recarregam sozinhas ao voltar para elas, o indicativo é memória.",
      },
      {
        titulo: "3. Olhe o uso de disco e de memória durante o trabalho real",
        texto:
          "Disco em 100% de uso com poucos programas abertos indica gargalo de armazenamento. Memória constantemente perto do limite, com o disco tranquilo, indica o contrário.",
      },
      {
        titulo: "4. Confirme o que a máquina aceita",
        texto:
          "Nem toda placa aceita NVMe, e nem todo notebook tem slot livre de memória. A verificação do modelo e da capacidade máxima vem antes da compra da peça — não depois.",
      },
    ],
    custo:
      "Os dois upgrades têm mão de obra parecida; a diferença fica na peça. O que mais encarece a decisão é comprar a peça errada por diagnóstico apressado — peça correta em máquina que não a aproveita é dinheiro parado.",
    ondeParar: [
      "Notebook em garantia cuja abertura possa invalidá-la: confirme antes de qualquer intervenção.",
      "Suspeita de falha de disco (ruído, alerta S.M.A.R.T.): o assunto deixa de ser upgrade e passa a ser preservação de dados.",
      "Travamentos com tela azul recorrente: teste a memória existente antes de somar mais.",
    ],
    perguntas: [
      {
        pergunta: "Vale colocar SSD em notebook antigo?",
        resposta:
          "Costuma ser o upgrade de maior efeito percebido, desde que o restante do equipamento ainda atenda ao uso. Em máquinas muito limitadas de processador, o ganho existe mas é menor.",
      },
      {
        pergunta: "Mais memória deixa jogo ou edição mais rápidos?",
        resposta:
          "Só quando a memória era o limite. Se o gargalo é a placa de vídeo ou o processador, somar memória não muda o resultado.",
      },
      {
        pergunta: "Preciso reinstalar o Windows ao trocar para SSD?",
        resposta:
          "Não obrigatoriamente: existe clonagem do sistema atual. Reinstalar só faz sentido quando o sistema atual já apresentava problemas de software.",
      },
    ],
    links: [
      {
        rotulo: "SSD ou RAM — orientação passo a passo",
        to: "/ferramentas/ssd-ou-ram",
        contexto: "Cruza os sintomas observáveis e indica qual upgrade tende a valer no seu caso.",
      },
      {
        rotulo: "Upgrade de SSD e memória",
        to: "/servicos/upgrade-ssd-ram",
        contexto: "Escopo do serviço, o que é verificado antes e o que fica registrado.",
      },
      {
        rotulo: "Computador lento",
        to: "/problemas/computador-lento",
        contexto: "Diagnóstico do gargalo antes de comprar qualquer peça.",
      },
      {
        rotulo: "NVMe no glossário",
        to: "/glossario/nvme",
        contexto: "Diferença entre SSD comum e NVMe e o que a sua placa aceita.",
      },
    ],
    fontes: [
      {
        titulo: "Microsoft Learn — requisitos de memória e desempenho do Windows",
        url: "https://learn.microsoft.com/pt-br/windows/client-management/troubleshoot-windows-performance",
        nota: "Documentação oficial sobre medição de uso de memória e gargalos de desempenho.",
      },
      {
        titulo: "Intel — SSD versus HDD: diferenças de desempenho",
        url: "https://www.intel.com.br/content/www/br/pt/products/docs/memory-storage/solid-state-drives/ssd-vs-hdd.html",
        nota: "Material do fabricante sobre o impacto do armazenamento no tempo de resposta.",
      },
    ],
  },
  {
    slug: "consertar-ou-substituir",
    h1: "Consertar ou substituir: quando o reparo deixa de compensar",
    nomeCurto: "Consertar ou substituir",
    resumo:
      "Reparo que se aproxima do valor de um equipamento equivalente deixa de fazer sentido. Este guia mostra os critérios objetivos para decidir sem contar com achismo.",
    respostaDireta:
      "Conserte quando o defeito é isolado, a peça é substituível e o custo fica bem abaixo de um equipamento equivalente. Substitua quando a soma das peças se aproxima desse valor, quando a placa limita memória e processador para o uso pretendido, ou quando há falhas em série no mesmo equipamento.",
    contexto: [
      "A decisão entre consertar e trocar quase nunca é técnica pura: é econômica. Tecnicamente, quase tudo tem conserto. A pergunta certa é se o dinheiro do conserto compra mais tempo útil do que o mesmo dinheiro aplicado em outro equipamento.",
      "Um erro frequente é comparar o custo do reparo com o preço de um equipamento novo de configuração muito superior. A comparação honesta é com um equipamento equivalente ao que se tem — mesma faixa de uso, mesma capacidade.",
      "Também entra na conta o que já foi reparado antes. Um equipamento com histórico de falhas em componentes diferentes indica desgaste geral, não azar isolado.",
    ],
    comoDecidir: [
      {
        titulo: "1. Peça o orçamento com peças e mão de obra separadas",
        texto:
          "Sem essa separação não dá para avaliar nada. Peça também o que é troca obrigatória e o que é recomendação.",
      },
      {
        titulo: "2. Compare com equipamento equivalente, não com o topo de linha",
        texto:
          "Se o reparo passa de uma fração relevante do valor de um equipamento equivalente em bom estado, o reparo perdeu a vantagem.",
      },
      {
        titulo: "3. Verifique o teto da plataforma",
        texto:
          "Placa que não aceita mais memória, ou processador que já é o máximo do soquete, significa que o reparo devolve o equipamento ao mesmo limite de hoje.",
      },
      {
        titulo: "4. Conte o histórico recente",
        texto:
          "Duas ou três falhas em componentes distintos no mesmo ano são um padrão. Nesse caso o reparo é remendo, e o cálculo muda.",
      },
    ],
    custo:
      "Os valores de referência de diagnóstico e serviços ficam publicados na página de preços e políticas. O que não fazemos é aprovar reparo caro em equipamento sem futuro só porque ele é tecnicamente possível — dizer que não compensa faz parte do serviço.",
    ondeParar: [
      "Orçamento sem discriminação de peças e mão de obra: não aprove.",
      "Dano por líquido em placa com corrosão espalhada: a taxa de reincidência muda a conta.",
      "Equipamento cujo dado importa mais que o hardware: resolva a recuperação dos dados antes de decidir sobre a máquina.",
    ],
    perguntas: [
      {
        pergunta: "Existe uma regra fixa de porcentagem?",
        resposta:
          "Regras do tipo 'não passe de metade do valor' ajudam como referência, mas não substituem os outros critérios: teto da plataforma, histórico de falhas e importância dos dados pesam tanto quanto o percentual.",
      },
      {
        pergunta: "Vale reparar notebook com tela quebrada?",
        resposta:
          "Depende da faixa do equipamento: em modelos de entrada, o painel pode representar boa parte do valor da máquina; em modelos de trabalho, costuma compensar.",
      },
      {
        pergunta: "E se eu quiser só recuperar os arquivos?",
        resposta:
          "Isso é um serviço diferente do reparo e pode ser feito mesmo em equipamento que será descartado. A prioridade muda: preservar o disco vem antes de qualquer tentativa de fazer a máquina ligar.",
      },
    ],
    links: [
      {
        rotulo: "Quando o reparo não compensa",
        to: "/quando-nao-compensa",
        contexto: "Critérios publicados de recusa e de recomendação de substituição.",
      },
      {
        rotulo: "Preços e políticas",
        to: "/precos-e-politicas",
        contexto: "Valores de referência, garantia e o que está incluso em cada serviço.",
      },
      {
        rotulo: "Montagem de PC sob medida",
        to: "/servicos/montagem-de-pc",
        contexto: "Quando substituir é o caminho, dimensionar para o uso real evita gasto inútil.",
      },
    ],
    fontes: [
      {
        titulo: "Microsoft Learn — ciclo de vida e fim de suporte do Windows",
        url: "https://learn.microsoft.com/pt-br/lifecycle/faq/windows",
        nota: "Referência oficial para avaliar se o equipamento ainda recebe atualizações de segurança.",
      },
    ],
  },
  {
    slug: "remoto-ou-presencial",
    h1: "Atendimento remoto ou presencial: qual modalidade resolve o seu problema",
    nomeCurto: "Remoto ou presencial",
    resumo:
      "Remoto resolve o que é software em máquina que liga e conecta. Presencial é obrigatório quando a falha impede o sistema de carregar ou envolve peça, energia ou rede física.",
    respostaDireta:
      "Escolha remoto quando o computador liga, entra no sistema e tem internet estável — configuração, limpeza de software, e-mail, impressora em rede, dúvidas de uso. Escolha presencial quando a máquina não liga, não completa a inicialização, faz ruído, esquenta demais ou o problema é o cabeamento e o roteador.",
    contexto: [
      "A modalidade não é preferência: é consequência do sintoma. Um acesso remoto só existe se o sistema carregou e a rede está de pé — exatamente o que falta nos casos mais graves.",
      "Há também um recorte de segurança. Acesso remoto legítimo é combinado, tem início e fim, e o usuário vê a tela o tempo todo. Contato que chega sem ser solicitado pedindo instalação de programa de acesso é golpe — órgãos oficiais alertam sobre esse formato há anos.",
      "Quando o problema é físico, insistir no remoto custa tempo do cliente sem chance real de solução.",
    ],
    comoDecidir: [
      {
        titulo: "1. A máquina chega até a área de trabalho?",
        texto:
          "Se não chega, remoto está descartado para esse chamado. Se chega, siga para a próxima pergunta.",
      },
      {
        titulo: "2. A internet do equipamento é estável?",
        texto:
          "Conexão que cai no meio do atendimento transforma um procedimento simples em risco. Se a queixa é justamente a rede, o presencial tende a resolver mais rápido.",
      },
      {
        titulo: "3. O problema envolve peça, energia ou cabo?",
        texto:
          "Ruído, cheiro de queimado, desligamento sob carga, conector danificado, cabeamento: nada disso se resolve por software.",
      },
      {
        titulo: "4. Há dado sensível envolvido?",
        texto:
          "Em ambiente com dado sensível, vale combinar o escopo por escrito antes da sessão e acompanhar a tela durante todo o atendimento — em qualquer modalidade.",
      },
    ],
    custo:
      "Presencial soma deslocamento conforme a distância; remoto não. Isso não torna o remoto mais barato quando ele não resolve: o custo maior é o do atendimento que precisa ser refeito na modalidade certa.",
    ondeParar: [
      "Alguém entrou em contato sem você ter pedido e quer instalar um programa de acesso remoto: encerre o contato.",
      "Pedido de senha de banco, código recebido por SMS ou instalação de aplicativo bancário durante um suporte: nenhum atendimento legítimo precisa disso.",
      "Equipamento que não liga ou reinicia sozinho: não há sessão remota possível.",
    ],
    perguntas: [
      {
        pergunta: "O técnico vê tudo o que tenho no computador durante o remoto?",
        resposta:
          "Ele vê a tela que está sendo compartilhada, durante a sessão. Por isso feche o que for pessoal antes de começar e acompanhe a sessão do início ao fim.",
      },
      {
        pergunta: "Remoto serve para remoção de vírus?",
        resposta:
          "Em muitos casos sim, desde que o sistema carregue e a rede funcione. Infecção que impede o Windows de iniciar ou que derruba a conexão exige atendimento presencial.",
      },
      {
        pergunta: "Como sei que o acesso terminou?",
        resposta:
          "Peça o encerramento da sessão à sua frente e a desinstalação ou desconexão do programa usado. Isso deve ser combinado no início.",
      },
    ],
    links: [
      {
        rotulo: "Suporte remoto",
        to: "/atendimento-remoto",
        contexto: "Escopo do que é resolvido à distância e como a sessão é conduzida.",
      },
      {
        rotulo: "Como funciona o atendimento",
        to: "/como-funciona",
        contexto: "Etapas da triagem até a escolha da modalidade.",
      },
      {
        rotulo: "Remoção de vírus",
        to: "/servicos/remocao-de-virus",
        contexto: "Quando a infecção ainda permite atendimento remoto e quando não permite.",
      },
    ],
    fontes: [
      {
        titulo: "CISA — Avoiding Social Engineering and Phishing Attacks",
        url: "https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks",
        nota: "Orientação oficial sobre contatos não solicitados que pedem acesso ou dados.",
      },
      {
        titulo: "CERT.br — Cartilha de Segurança para Internet",
        url: "https://cartilha.cert.br/",
        nota: "Material de referência em português sobre golpes de suporte técnico falso.",
      },
    ],
  },
  {
    slug: "hd-com-ruido",
    h1: "HD fazendo ruído: continuar usando ou desligar agora?",
    nomeCurto: "HD fazendo ruído",
    resumo:
      "Ruído mecânico repetitivo em disco rígido é sinal de falha física em curso. Cada minuto ligado reduz a chance de recuperar os arquivos.",
    respostaDireta:
      "Desligue. Disco rígido que emite clique repetido, arranhado ou zumbido cíclico está falhando mecanicamente, e continuar usando — inclusive rodando programa de verificação — costuma piorar o quadro de forma irreversível.",
    contexto: [
      "Disco rígido mecânico grava dados em pratos que giram enquanto uma cabeça de leitura se move a poucos nanômetros da superfície. Quando essa mecânica sai de tolerância, o ruído aparece: o som repetitivo é a cabeça tentando reposicionar-se ciclicamente.",
      "Diferente de um defeito de software, esse quadro não se estabiliza. Ele progride com o uso, e cada tentativa de leitura pode transformar setores ainda íntegros em áreas inacessíveis.",
      "É por isso que a orientação técnica aqui é oposta ao instinto: não é hora de rodar utilitário de correção nem de copiar tudo com pressa. É hora de parar e avaliar a prioridade — hardware ou dados.",
    ],
    comoDecidir: [
      {
        titulo: "1. Identifique o tipo de ruído",
        texto:
          "Clique repetido em intervalos regulares, arranhado metálico ou zumbido que aumenta e diminui em ciclo apontam mecânica. Um leve ruído de leitura contínuo, sem ciclo, é normal em disco mecânico saudável.",
      },
      {
        titulo: "2. Desligue pelo botão de energia se o sistema não responder",
        texto:
          "Manter o equipamento ligado 'só mais um pouco' para tentar copiar é o que mais transforma recuperação possível em perda definitiva.",
      },
      {
        titulo: "3. Decida a prioridade antes de qualquer procedimento",
        texto:
          "Se os arquivos importam mais que o equipamento, o disco não deve ser formatado, verificado nem clonado por tentativa — ele deve ser avaliado para recuperação.",
      },
      {
        titulo: "4. Se os dados já estão em backup conferido, o caso é simples",
        texto:
          "Com cópia íntegra e testada, o disco passa a ser apenas uma peça a substituir, e a decisão vira consertar ou substituir o equipamento.",
      },
    ],
    custo:
      "Recuperação de dados é um serviço distinto de manutenção e o esforço varia com o estado físico da mídia — por isso a avaliação vem antes de qualquer valor fechado. Os critérios e as referências publicadas ficam na página de preços e políticas.",
    ondeParar: [
      "Não rode utilitários de verificação e correção de disco em mídia com ruído mecânico.",
      "Não abra o disco: os pratos não podem ser expostos ao ambiente comum.",
      "Não congele, não bata, não use os métodos caseiros que circulam na internet.",
      "Não reinstale o sistema por cima 'para ver se resolve'.",
    ],
    perguntas: [
      {
        pergunta: "SSD também faz ruído quando falha?",
        resposta:
          "Não. SSD não tem parte móvel; a falha nele é silenciosa e costuma aparecer como travamento de leitura, sumiço de arquivos ou disco que deixa de ser reconhecido.",
      },
      {
        pergunta: "O disco parou de fazer barulho, posso usar de novo?",
        resposta:
          "A intermitência é comum em falha mecânica e não indica recuperação. Trate o disco como comprometido até que a leitura S.M.A.R.T. e a avaliação técnica digam o contrário.",
      },
      {
        pergunta: "Consigo copiar os arquivos sozinho?",
        resposta:
          "Só quando o disco ainda está estável e sem ruído mecânico. Havendo ruído, cada tentativa consome a chance de recuperação profissional.",
      },
    ],
    links: [
      {
        rotulo: "HD fazendo barulho",
        to: "/problemas/hd-fazendo-barulho",
        contexto: "Sintomas, o que já indica falha física e o que fazer nas primeiras horas.",
      },
      {
        rotulo: "Recuperação de dados",
        to: "/servicos/recuperacao-de-dados",
        contexto: "Como a avaliação é feita e por que a mídia não deve receber escrita.",
      },
      {
        rotulo: "S.M.A.R.T. no glossário",
        to: "/glossario/smart",
        contexto: "O que os contadores mostram e o que eles não conseguem prever.",
      },
    ],
    fontes: [
      {
        titulo: "Documentação S.M.A.R.T. — monitoramento de falhas em discos (Microsoft Learn)",
        url: "https://learn.microsoft.com/pt-br/windows-hardware/drivers/storage/storage-device-management",
        nota: "Referência técnica sobre leitura de estado de saúde de dispositivos de armazenamento.",
      },
      {
        titulo: "CISA — Data Backup Options",
        url: "https://www.cisa.gov/sites/default/files/publications/data_backup_options.pdf",
        nota: "Orientação oficial sobre priorizar a cópia dos dados diante de falha iminente.",
      },
    ],
  },
  {
    slug: "backup-antes-da-manutencao",
    h1: "Backup antes da manutenção: o que copiar e como conferir",
    nomeCurto: "Backup antes da manutenção",
    resumo:
      "Toda manutenção que mexe em disco ou sistema tem risco de perda. Este guia mostra o que copiar, como testar a cópia e o que registrar antes de entregar o equipamento.",
    respostaDireta:
      "Sim, sempre — mesmo em serviço que 'não deveria' apagar nada. Copie arquivos pessoais, chaves e licenças, exporte o que vive dentro de programas (e-mail local, favoritos, senhas) e confirme abrindo os arquivos na cópia antes de autorizar qualquer procedimento.",
    contexto: [
      "Backup não é o mesmo que ter arquivos em outra pasta do mesmo disco. Se a mídia falhar, as duas cópias somem juntas. Backup é cópia em outra mídia — e, para dados críticos, em outro lugar físico.",
      "A maior parte das perdas que chegam à bancada não vem de má-fé nem de erro grosseiro: vem de cópia que nunca foi testada. O arquivo estava na lista, mas corrompido; a pasta foi copiada pela metade; o e-mail estava só no programa local, não no servidor.",
      "Backup conferido também protege o cliente na direção oposta: com a cópia validada, um imprevisto durante a manutenção deixa de ser catástrofe e vira contratempo.",
    ],
    comoDecidir: [
      {
        titulo: "1. Liste o que dói perder",
        texto:
          "Documentos, fotos, projetos, planilhas de trabalho, arquivos de sistemas usados pela empresa. O que não estiver nessa lista não será procurado depois.",
      },
      {
        titulo: "2. Inclua o que não está em pasta",
        texto:
          "E-mails em programa local, favoritos e senhas do navegador, licenças de software, chaves de autenticação, configurações exportáveis. É o que mais se perde.",
      },
      {
        titulo: "3. Copie para mídia separada",
        texto:
          "Disco externo, pendrive de capacidade suficiente ou nuvem. Nunca outra pasta do mesmo disco que será mexido.",
      },
      {
        titulo: "4. Teste abrindo os arquivos na cópia",
        texto:
          "Abra alguns arquivos de cada tipo diretamente da mídia de destino. Cópia que não abre não é backup.",
      },
      {
        titulo: "5. Registre o combinado por escrito",
        texto:
          "O que será feito, o que pode ser apagado e o que precisa ser preservado. Ordem de serviço com escopo escrito evita divergência depois.",
      },
    ],
    custo:
      "O backup preventivo custa tempo e mídia; a recuperação depois de uma perda custa muito mais e nem sempre é possível. Serviços de backup para empresa têm escopo e valores publicados nas páginas de serviço.",
    ondeParar: [
      "Disco com ruído mecânico ou alerta S.M.A.R.T.: não tente copiar por conta própria — a cópia é uma leitura intensa.",
      "Arquivos que não abrem na origem: o problema já existe antes do backup, e copiar não conserta.",
      "Volume criptografado sem a chave de recuperação em mãos: obtenha a chave antes de qualquer manutenção.",
    ],
    perguntas: [
      {
        pergunta: "Nuvem sincronizada já é backup?",
        resposta:
          "Ajuda, mas sincronização replica também o apagamento e a corrupção. Para dados críticos, mantenha uma cópia que não seja espelho automático.",
      },
      {
        pergunta: "Preciso de backup se o serviço é só limpeza física?",
        resposta:
          "Sim. Qualquer manipulação envolve desligamento, cabos e transporte — situações em que um disco já degradado costuma manifestar a falha.",
      },
      {
        pergunta: "Quanto tempo devo guardar a cópia?",
        resposta:
          "Ao menos até o equipamento voltar, ser usado por alguns dias e você confirmar que nada ficou para trás.",
      },
    ],
    links: [
      {
        rotulo: "Verificador de backup",
        to: "/ferramentas/verificador-de-backup",
        contexto: "Cinco perguntas objetivas que revelam se a rotina atual funciona de verdade.",
      },
      {
        rotulo: "Backup para empresas",
        to: "/servicos/backup-para-empresas",
        contexto: "Rotina testada, retenção e responsabilidade definida por escrito.",
      },
      {
        rotulo: "Backup incremental no glossário",
        to: "/glossario/backup-incremental",
        contexto: "Por que o tipo de backup muda o tempo e o custo da rotina.",
      },
    ],
    fontes: [
      {
        titulo: "CISA — Data Backup Options",
        url: "https://www.cisa.gov/sites/default/files/publications/data_backup_options.pdf",
        nota: "Documento oficial sobre tipos de cópia, mídia e verificação de restauração.",
      },
    ],
  },
];

export const guiaDecisaoPorSlug = (slug: string): GuiaDecisaoPagina | undefined =>
  GUIAS_DECISAO.find((g) => g.slug === slug);

/** Card do Atlas correspondente (critério + sinais + risco), quando existir. */
export const cardAtlasDoGuia = (slug: string): AtlasGuiaDecisao | undefined =>
  ATLAS_GUIAS_DECISAO.find((g) => g.id === slug);

/** Slugs com página independente — usado pelo hub do Atlas e pelos gates. */
export const GUIAS_DECISAO_SLUGS = GUIAS_DECISAO.map((g) => g.slug);

export const temPaginaDeDecisao = (id: string) => GUIAS_DECISAO_SLUGS.includes(id);
