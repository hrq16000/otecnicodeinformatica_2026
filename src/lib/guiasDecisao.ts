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
      {
        rotulo: "Notebook não liga: diagnóstico do sintoma",
        to: "/problemas/notebook-nao-liga",
        contexto: "Antes de decidir entre consertar e trocar, é preciso saber o que falhou.",
      },
      {
        rotulo: "Checklist de computador lento",
        to: "/ferramentas/checklist-computador-lento",
        contexto: "Quando o motivo da troca é desempenho, este roteiro separa causa de sintoma.",
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
      {
        rotulo: "Computador lento: sintoma e causas",
        to: "/problemas/computador-lento",
        contexto: "Boa parte dos casos de lentidão é resolvível à distância — este é o ponto de partida.",
      },
      {
        rotulo: "Roteiro de Wi-Fi instável",
        to: "/ferramentas/roteiro-wifi-instavel",
        contexto: "Problema de rede define sozinho se o atendimento precisa ser presencial.",
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
  // ── ONDA 11B ──────────────────────────────────────────────────────────────
  {
    slug: "atualizar-para-windows-11",
    h1: "Atualizar para o Windows 11 ou permanecer no sistema atual?",
    nomeCurto: "Atualizar para o Windows 11",
    resumo:
      "A migração depende de dois fatos verificáveis — requisitos oficiais atendidos e programas essenciais suportados — e de um backup conferido. Este guia mostra como checar os três antes de iniciar.",
    respostaDireta:
      "Atualize quando a verificação oficial de requisitos passa sem alerta, os programas de que você depende têm versão suportada e existe backup testado; permaneça (e planeje a substituição do equipamento) quando o firmware, o processador ou um driver crítico não atendem — forçar a instalação em máquina fora de requisito troca um incômodo por um sistema sem atualização de segurança garantida.",
    contexto: [
      "A pergunta chega quase sempre pelo lado errado: 'o Windows 11 é melhor?'. Do ponto de vista de quem usa o computador para trabalhar, a pergunta útil é outra — o que muda no meu dia a dia e o que pode parar de funcionar. Sistema operacional não é upgrade de desempenho: é base sobre a qual seus programas rodam.",
      "Os requisitos do Windows 11 incluem recursos de firmware que muitos computadores anteriores a 2018 simplesmente não têm habilitados ou não possuem. Em parte dos casos, o recurso existe e está desligado na configuração do firmware; em outra parte, o processador está fora da lista suportada pela Microsoft. São situações diferentes, com desfechos diferentes.",
      "Há ainda o fator que ninguém verifica antes e todo mundo descobre depois: periférico antigo sem driver publicado e sistema de gestão homologado só para a versão anterior. Em ambiente de empresa, esse é o item que decide o cronograma — não o sistema em si.",
    ],
    comoDecidir: [
      {
        titulo: "1. Rode a verificação oficial de requisitos",
        texto:
          "A Microsoft publica a verificação de compatibilidade e a lista de processadores suportados. Ela responde de forma objetiva se o bloqueio é de firmware (recurso desligado, que às vezes se resolve na configuração) ou de processador — que não se resolve por software.",
      },
      {
        titulo: "2. Liste os programas dos quais você não pode abrir mão",
        texto:
          "Sistema da empresa, emissor fiscal, software de máquina, plugin de áudio, scanner antigo. Para cada um, confirme na página do próprio fabricante se há versão suportada. Um item sem resposta clara já é motivo para adiar a migração daquela máquina.",
      },
      {
        titulo: "3. Confira a saúde do disco antes de qualquer migração",
        texto:
          "Atualização de sistema é uma operação intensa de leitura e escrita. Em disco com contadores S.M.A.R.T. deteriorando, é justamente durante esse processo que a falha aparece — com o sistema no meio do caminho.",
      },
      {
        titulo: "4. Faça o backup e teste a restauração antes de iniciar",
        texto:
          "Copiar não basta: abra alguns arquivos na cópia e confirme que estão íntegros. A migração costuma correr bem; o backup existe para o caso em que não corre, e nesse caso ele precisa funcionar de primeira.",
      },
    ],
    custo:
      "A atualização em si não tem custo de licença para quem já tem o sistema anterior ativado. O custo real aparece em três lugares: tempo de indisponibilidade da máquina, eventual substituição de periférico sem driver e, quando o equipamento está fora de requisito, a decisão de trocar de máquina. Valores de serviço ficam sempre visíveis na página de preços e políticas.",
    ondeParar: [
      "Disco com alerta S.M.A.R.T. ou ruído mecânico — resolva o armazenamento antes de pensar em migrar.",
      "Programa essencial sem versão suportada confirmada pelo fabricante.",
      "Máquina de produção sem janela de indisponibilidade combinada — migração no meio do expediente vira prejuízo.",
      "Contornos que desabilitam verificação de requisitos em máquina de trabalho: o sistema fica em condição não suportada, sem garantia de receber atualização.",
    ],
    perguntas: [
      {
        pergunta: "Meu computador não atende aos requisitos. Posso instalar mesmo assim?",
        resposta:
          "Existem contornos divulgados, e a própria Microsoft avisa que máquinas fora de requisito podem não receber atualizações. Para uso de trabalho, isso é um risco de segurança que não compensa: a alternativa correta é manter o sistema suportado enquanto planeja a substituição do equipamento.",
      },
      {
        pergunta: "A atualização apaga meus arquivos?",
        resposta:
          "A atualização preserva arquivos e programas no fluxo normal. Isso não substitui backup: qualquer interrupção de energia, falha de disco ou incompatibilidade no meio do processo pode exigir reinstalação limpa.",
      },
      {
        pergunta: "O Windows 11 deixa o computador mais rápido?",
        resposta:
          "Não é um upgrade de desempenho. Máquina lenta por disco mecânico ou memória insuficiente continua lenta — o ganho perceptível vem do hardware, não da versão do sistema.",
      },
    ],
    links: [
      {
        rotulo: "Checklist antes de formatar",
        to: "/ferramentas/checklist-antes-de-formatar",
        contexto: "A mesma preparação vale para migração de sistema: inventário, cópia e teste.",
      },
      {
        rotulo: "TPM no glossário",
        to: "/glossario/tpm",
        contexto: "O requisito de firmware que mais bloqueia migração em máquinas anteriores.",
      },
      {
        rotulo: "Secure Boot no glossário",
        to: "/glossario/secure-boot",
        contexto: "O outro item de firmware exigido — e por que desligá-lo não é solução.",
      },
      {
        rotulo: "Formatação e reinstalação",
        to: "/solucoes/formatacao",
        contexto: "Quando a migração limpa é preferível à atualização por cima.",
      },
    ],
    fontes: [
      {
        titulo: "Microsoft — Requisitos de sistema do Windows 11",
        url: "https://www.microsoft.com/pt-br/windows/windows-11-specifications",
        nota: "Requisitos oficiais, incluindo TPM 2.0 e inicialização segura.",
      },
      {
        titulo: "Microsoft Learn — Windows 11 processor requirements",
        url: "https://learn.microsoft.com/en-us/windows-hardware/design/minimum/supported/windows-11-supported-intel-processors",
        nota: "Lista oficial de processadores suportados.",
      },
    ],
  },
  {
    slug: "nuvem-ou-hd-externo",
    h1: "Backup na nuvem ou em HD externo: qual protege o que você tem?",
    nomeCurto: "Nuvem ou HD externo",
    resumo:
      "Nuvem e mídia externa protegem de riscos diferentes: uma cobre o que acontece no local, a outra cobre o que acontece na conta. Este guia mostra como combinar as duas sem gastar demais.",
    respostaDireta:
      "Use nuvem para o que muda todo dia e precisa de cópia automática; use mídia externa desconectada para o acervo grande e para ter uma cópia fora do alcance de qualquer invasão de conta. Quem só tem um dos dois está descoberto de um lado — e a escolha entre eles só é excludente quando o orçamento não permite os dois.",
    contexto: [
      "A discussão costuma ser apresentada como disputa de tecnologia, e não é. Backup se avalia por cenário de perda: incêndio, furto, falha do disco, apagamento acidental, ransomware, erro de sincronização. Cada meio cobre bem alguns desses cenários e mal os outros.",
      "Sincronização automática de arquivos, sozinha, não é backup. Se um arquivo é apagado ou criptografado no computador, a alteração se propaga para a cópia sincronizada. O que salva nesse caso é versionamento com histórico ou uma cópia que estava desconectada no momento do incidente.",
      "A prática recomendada há décadas por órgãos de segurança é ter mais de uma cópia, em mais de um tipo de mídia, com pelo menos uma fora do local. Nuvem e HD externo, juntos, atendem isso com custo baixo para uso doméstico e para escritórios pequenos.",
    ],
    comoDecidir: [
      {
        titulo: "1. Separe o que muda todo dia do que nunca muda",
        texto:
          "Documentos de trabalho, planilhas e projetos em andamento mudam diariamente e pedem cópia automática — terreno da nuvem. Fotos antigas, vídeos e acervos fechados não mudam mais: ocupam muito espaço e cabem melhor em mídia externa.",
      },
      {
        titulo: "2. Estime o volume e a sua conexão",
        texto:
          "Subir centenas de gigabytes em conexão doméstica com upload limitado leva um tempo que inviabiliza a primeira carga. Nesse caso, a cópia inicial vai para mídia externa e a nuvem cobre apenas a pasta de trabalho ativa.",
      },
      {
        titulo: "3. Verifique se existe histórico de versões",
        texto:
          "Pergunte do serviço que você já usa: ele guarda versões anteriores e por quanto tempo? Sem histórico, um apagamento ou uma criptografia por ransomware se propaga para a cópia — e a nuvem deixa de ser proteção.",
      },
      {
        titulo: "4. Garanta uma cópia desconectada",
        texto:
          "Um disco externo que fica permanentemente ligado ao computador está exposto ao mesmo incidente que o computador. Conectar, copiar e desconectar é o que transforma essa mídia em rede de segurança real.",
      },
      {
        titulo: "5. Teste a restauração, não só a cópia",
        texto:
          "Escolha três arquivos que importam de verdade, restaure-os a partir de cada meio e abra. Backup só existe quando a restauração foi comprovada pelo menos uma vez.",
      },
    ],
    custo:
      "O custo da nuvem é recorrente e cresce com o volume; o da mídia externa é único, mas inclui a substituição periódica do disco, que também se desgasta. Comparar apenas o preço mensal engana: a conta honesta considera quantos anos de assinatura equivalem a um disco novo e quanto vale poder restaurar de dois lugares diferentes.",
    ondeParar: [
      "Suspeita de ransomware em andamento: não conecte o disco de backup ao computador afetado.",
      "Disco externo com ruído mecânico ou que some do sistema — trate-o como mídia comprometida e não confie mais nele.",
      "Cópia única em um só lugar, sem histórico de versões: essa configuração não protege contra apagamento e criptografia.",
      "Arquivos críticos de empresa sem responsável definido pela rotina: backup sem dono não é executado.",
    ],
    perguntas: [
      {
        pergunta: "Sincronizar meus arquivos na nuvem já é backup?",
        resposta:
          "Só se o serviço mantiver histórico de versões e lixeira com prazo. Sincronização pura replica o que acontece no computador, inclusive o apagamento e a criptografia por ransomware.",
      },
      {
        pergunta: "Quantas cópias eu realmente preciso ter?",
        resposta:
          "A referência prática usada por órgãos de segurança é mais de uma cópia, em tipos de mídia diferentes, com uma delas fora do local. Para uso doméstico, nuvem para a pasta ativa e disco externo desconectado para o acervo já atendem.",
      },
      {
        pergunta: "Pendrive serve como backup?",
        resposta:
          "Serve como transporte, não como cópia de segurança de longo prazo. São mídias pequenas, fáceis de perder e com desgaste imprevisível — a chance de o pendrive falhar junto com a necessidade é alta.",
      },
    ],
    links: [
      {
        rotulo: "Verificador de backup",
        to: "/ferramentas/verificador-de-backup",
        contexto: "Cinco perguntas que revelam se a rotina atual protege de verdade.",
      },
      {
        rotulo: "Backup incremental no glossário",
        to: "/glossario/backup-incremental",
        contexto: "Como o tipo de cópia muda o tempo e o espaço necessários.",
      },
      {
        rotulo: "Segurança dos dados",
        to: "/seguranca-dos-dados",
        contexto: "O que fazemos com os seus arquivos durante um atendimento.",
      },
      {
        rotulo: "Backup para empresas",
        to: "/servicos/backup-para-empresas",
        contexto: "Rotina com retenção definida e responsabilidade por escrito.",
      },
    ],
    fontes: [
      {
        titulo: "CISA — Data Backup Options",
        url: "https://www.cisa.gov/sites/default/files/publications/data_backup_options.pdf",
        nota: "Documento oficial sobre tipos de mídia, cópia fora do local e teste de restauração.",
      },
      {
        titulo: "CERT.br — Cartilha de Segurança para Internet",
        url: "https://cartilha.cert.br/",
        nota: "Referência brasileira sobre cópias de segurança e boas práticas domésticas.",
      },
    ],
  },
  {
    slug: "montar-ou-comprar-pronto",
    h1: "Montar o PC ou comprar pronto: quando cada caminho compensa",
    nomeCurto: "Montar ou comprar pronto",
    resumo:
      "Montar compensa quando há requisito específico de desempenho, silêncio ou expansão. Para uso de escritório, comprar pronto costuma vencer em garantia única e simplicidade.",
    respostaDireta:
      "Monte quando existe um requisito nomeável — placa de vídeo, memória expansível, fonte dimensionada, refrigeração silenciosa — e você quer escolher cada peça; compre pronto quando o uso é genérico de produtividade, quando a compra é por empresa que precisa de nota e suporte único, ou quando ninguém vai acompanhar garantia peça a peça.",
    contexto: [
      "A conta de 'sai mais barato montar' nem sempre fecha. Máquinas prontas de entrada usam volume de compra para preços que a montagem avulsa não alcança. A vantagem da montagem aparece do meio para cima, quando o pronto embute componentes que você trocaria de qualquer forma.",
      "O ponto que quase ninguém coloca na planilha é a garantia. No pronto, existe um responsável só; na montagem, cada peça tem prazo e canal próprios — o que é excelente para quem quer trocar só o que falhou, e ruim para quem não quer administrar isso.",
      "Há também o item invisível: fonte de alimentação. É a peça mais sacrificada em máquina pronta de entrada e a que mais causa dano quando falha mal. Em montagem, é justamente onde vale gastar bem.",
    ],
    comoDecidir: [
      {
        titulo: "1. Nomeie o requisito real do uso",
        texto:
          "Edição de vídeo, CAD, jogos, virtualização e captura de áudio têm exigências específicas de processador, memória e placa de vídeo. Se o uso é navegador, planilha e reunião, não existe requisito que justifique montagem — e o pronto resolve.",
      },
      {
        titulo: "2. Pense em expansão dos próximos anos",
        texto:
          "Placa com slots livres de memória e espaço para mais um disco prolonga a vida útil da máquina. Muitos prontos compactos vêm com memória soldada ou um único slot — o que fecha a porta de qualquer upgrade futuro.",
      },
      {
        titulo: "3. Decida quem vai administrar a garantia",
        texto:
          "Se a resposta for 'ninguém quer se preocupar com isso', o pronto tem vantagem objetiva: um contato, um prazo. Em empresa, considere também exigência de nota fiscal única e contrato de suporte.",
      },
      {
        titulo: "4. Some tudo, inclusive o que não é peça",
        texto:
          "Comparação honesta inclui fonte de qualidade, sistema operacional licenciado, gabinete com fluxo de ar adequado e o tempo de quem vai montar e testar. Sem esses itens, a planilha da montagem fica artificialmente baixa.",
      },
    ],
    custo:
      "Não existe valor fixo: depende inteiramente das peças escolhidas e do momento do mercado. O que sustentamos é o critério — dimensionar para o uso real em vez de vender potência que não será usada, e nunca economizar na fonte. Os valores dos serviços de montagem e configuração ficam visíveis na página de preços e políticas.",
    ondeParar: [
      "Orçamento de montagem que não discrimina modelo de fonte e de placa-mãe: sem isso não há comparação possível.",
      "Máquina pronta com memória soldada quando o plano é expandir depois.",
      "Compra pressionada por promoção sem que o requisito de uso tenha sido definido.",
      "Reaproveitamento de fonte antiga em configuração mais exigente — é a origem clássica de desligamento sob carga.",
    ],
    perguntas: [
      {
        pergunta: "Montar é sempre mais barato?",
        resposta:
          "Não. Na faixa de entrada, o volume de compra do fabricante costuma ganhar. A montagem tende a compensar quando existe requisito específico e quando você aproveitaria peças que já tem.",
      },
      {
        pergunta: "Dá para aproveitar peças do computador antigo?",
        resposta:
          "Disco, gabinete e às vezes memória sim, dependendo da geração. Fonte antiga é o item que menos vale reaproveitar em configuração mais exigente — o risco recai sobre as peças novas.",
      },
      {
        pergunta: "E a garantia de uma máquina montada?",
        resposta:
          "Cada componente mantém a garantia do próprio fabricante, e a montagem/configuração tem a garantia do serviço. É mais granular: troca-se apenas a peça que falhou, mas alguém precisa acompanhar prazos e canais.",
      },
    ],
    links: [
      {
        rotulo: "Montagem de PC sob medida",
        to: "/servicos/montagem-de-pc",
        contexto: "Como dimensionamos a configuração a partir do uso declarado.",
      },
      {
        rotulo: "PC gamer",
        to: "/servicos/pc-gamer",
        contexto: "Quando o requisito é placa de vídeo, refrigeração e fonte dimensionada.",
      },
      {
        rotulo: "Consertar ou substituir",
        to: "/decisoes/consertar-ou-substituir",
        contexto: "Antes de montar, verifique se o equipamento atual ainda compensa.",
      },
      {
        rotulo: "Memória RAM no glossário",
        to: "/glossario/memoria-ram",
        contexto: "Capacidade, canais e por que o slot livre importa na escolha da placa.",
      },
    ],
    fontes: [
      {
        titulo: "Intel — Guia de temperatura e refrigeração de processadores",
        url: "https://www.intel.com/content/www/us/en/gaming/resources/cpu-temperature.html",
        nota: "Orientação do fabricante sobre dissipação e limites térmicos na escolha da refrigeração.",
      },
    ],
  },
  // ── FASE 5 ──────────────────────────────────────────────────────────────
  {
    slug: "trocar-componente-ou-reparar",
    h1: "Trocar o componente inteiro ou tentar reparar: como decidir peça a peça",
    nomeCurto: "Trocar componente ou reparar",
    resumo:
      "Nem toda peça vale reparo, e nem todo defeito exige troca. Este guia separa peça de desgaste de falha isolada e mostra o que observar antes de autorizar qualquer intervenção.",
    respostaDireta:
      "Troque o componente quando ele for peça de desgaste (bateria, ventoinha, pasta térmica, disco com setores realocados), quando o mesmo sintoma já voltou depois de um reparo ou quando a peça de reposição confiável custa menos que a tentativa. Repare quando a falha é a primeira, tem causa identificada na avaliação e o componente ainda atende ao uso pretendido.",
    contexto: [
      "Dentro de um computador convivem duas famílias de componentes com expectativas de vida muito diferentes. Peças de desgaste — bateria, ventoinha, pasta térmica, disco mecânico — degradam por uso e por tempo; elas são projetadas para serem substituídas, e reparo nelas costuma comprar semanas, não anos. Componentes duráveis — placa-mãe, processador, memória, gabinete — não têm desgaste previsível: quando falham, há um evento por trás (surto elétrico, calor acumulado, líquido, choque mecânico).",
      "Essa distinção resolve boa parte da dúvida antes mesmo de abrir o equipamento. A pergunta útil deixa de ser \"dá para consertar?\" — quase sempre dá — e passa a ser \"quanto tempo de uso confiável este reparo compra, e a que risco?\".",
      "Há ainda o custo de repetir. Duas intervenções sucessivas no mesmo componente custam mais que a substituição feita de uma vez, e cada nova tentativa em equipamento com falha física aumenta o risco de perder dados. Quando o mesmo sintoma reaparece, o dado relevante não é o preço da peça: é o histórico.",
    ],
    comoDecidir: [
      {
        titulo: "1. Classifique a peça: desgaste ou durável",
        texto:
          "Bateria, ventoinha, pasta térmica, disco mecânico e cabo flat são consumíveis com vida útil. Placa-mãe, processador, memória e fonte são duráveis: quando falham, existe uma causa a investigar antes de simplesmente substituir — senão a peça nova encontra o mesmo ambiente que matou a anterior.",
      },
      {
        titulo: "2. Verifique se é a primeira ocorrência",
        texto:
          "Primeira falha, com causa identificada e escopo fechado, favorece reparo. Reincidência no mesmo componente indica causa não resolvida: nesse caso, trocar a peça sem tratar a causa apenas adia o próximo chamado.",
      },
      {
        titulo: "3. Confirme disponibilidade e procedência da peça",
        texto:
          "Peça sem procedência clara em função crítica de energia — fonte, carregador, bateria — é risco para o resto do equipamento. Se a alternativa disponível é essa, a decisão muda de figura mesmo quando o reparo seria tecnicamente possível.",
      },
      {
        titulo: "4. Some o conjunto, não a peça isolada",
        texto:
          "Se o mesmo equipamento acumula tela, bateria, teclado e armazenamento comprometidos, a soma das trocas deixa de ser decisão de componente e vira decisão de equipamento. Nesse ponto, o guia correto é o de consertar ou substituir a máquina.",
      },
      {
        titulo: "5. Garanta o backup antes de autorizar",
        texto:
          "Qualquer intervenção que envolva armazenamento — reparo ou troca — começa pela cópia dos dados conferida em outra mídia. Essa etapa não é opcional e não depende de qual caminho for escolhido.",
      },
    ],
    custo:
      "O que costuma pesar na conta não é a peça: é a mão de obra repetida e o tempo com o equipamento parado. Reparo em componente de desgaste tende a exigir retorno; substituição bem indicada resolve uma vez. Os valores de referência de cada serviço e a regra de aprovação antes da execução ficam sempre visíveis na página de preços e políticas — peça e mão de obra são discriminadas separadamente no orçamento.",
    ondeParar: [
      "Cheiro de queimado, marca de arco elétrico ou componente visivelmente estufado: não religue e não substitua a peça sem avaliar a causa.",
      "Bateria inchada deformando a carcaça — manuseio inadequado é risco de incêndio.",
      "Disco com ruído mecânico: preserve os dados antes de qualquer decisão sobre a peça.",
      "Equipamento em garantia do fabricante: abrir pode encerrar a cobertura.",
      "Orçamento que não separa o que é peça e o que é mão de obra.",
    ],
    perguntas: [
      {
        pergunta: "Trocar a peça é sempre mais caro que reparar?",
        resposta:
          "Não. Em peças de desgaste a substituição costuma sair mais barata no total, porque o reparo exige retorno em pouco tempo. O preço da peça isolada engana: o que conta é o custo por tempo de uso confiável obtido.",
      },
      {
        pergunta: "Posso trocar só a peça defeituosa e manter o resto?",
        resposta:
          "Na maior parte dos casos sim, desde que a peça nova seja compatível com a plataforma e a causa da falha tenha sido tratada. Em falha de origem elétrica, substituir apenas o componente queimado sem verificar a alimentação costuma repetir o problema.",
      },
      {
        pergunta: "Como sei se a placa-mãe ainda vale investimento?",
        resposta:
          "Pelo que ela permite daqui para frente: quanto de memória aceita, que tipo de armazenamento suporta e se o processador atende ao uso pretendido. Placa que já está no teto da própria plataforma limita qualquer upgrade futuro.",
      },
      {
        pergunta: "Peça usada resolve?",
        resposta:
          "Pode resolver em componentes não críticos e com procedência verificável. Em fonte, carregador e bateria a recomendação é outra: o risco recai sobre o equipamento inteiro e sobre a segurança de quem usa.",
      },
    ],
    links: [
      {
        rotulo: "Consertar ou substituir o equipamento",
        to: "/decisoes/consertar-ou-substituir",
        contexto: "Quando a soma das peças deixa de compensar e a decisão passa a ser da máquina.",
      },
      {
        rotulo: "SSD ou mais memória RAM",
        to: "/decisoes/ssd-ou-memoria-ram",
        contexto: "Se a motivação é desempenho e não defeito, comece pelo gargalo real.",
      },
      {
        rotulo: "Backup antes da manutenção",
        to: "/decisoes/backup-antes-da-manutencao",
        contexto: "O que copiar e conferir antes de autorizar reparo ou troca.",
      },
      {
        rotulo: "Computador esquentando",
        to: "/problemas/computador-esquentando",
        contexto: "O sintoma que mais gera troca desnecessária de componente durável.",
      },
      {
        rotulo: "Quando não compensa",
        to: "/quando-nao-compensa",
        contexto: "Os casos em que a resposta honesta é não executar o serviço.",
      },
      {
        rotulo: "Atlas de informática",
        to: "/guia-tecnico-informatica",
        contexto: "Trilha completa de decisões de compra e reparo, do fundamento à execução.",
      },
    ],
    fontes: [
      {
        titulo: "NIST SP 800-88 — sanitização de mídia",
        url: "https://csrc.nist.gov/pubs/sp/800/88/r1/final",
        nota: "Referência oficial sobre descarte e reaproveitamento seguro de mídias substituídas.",
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
