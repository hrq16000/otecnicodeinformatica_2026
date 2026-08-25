/**
 * Micro-Rodada Enriquecimento 4A — cobertura dos clusters de alta oportunidade
 * (AnswerThePublic) usando EXCLUSIVAMENTE URLs já existentes.
 *
 * Regras desta rodada:
 *  - nenhuma URL nova, nenhum artigo novo, nenhum bairro novo;
 *  - canonical, robots e indexabilidade permanecem exatamente como estavam;
 *  - um owner por intenção: quando não existe owner adequado, o cluster é
 *    registrado como GAP_NO_OWNER no relatório e nada é inventado;
 *  - nada de template: cada owner recebe blocos próprios, com tabela, árvore
 *    de decisão ou triagem conforme a natureza do problema;
 *  - páginas congeladas (pilares 9B, Cluster 1 de formatação no blog,
 *    Local 2, Discovery 1) não aparecem neste mapa.
 *
 * A chave é o caminho completo da página.
 */
import type { EnriquecimentoConteudo } from "./enriquecimento";

export const ENRIQUECIMENTO_4A: Record<string, EnriquecimentoConteudo> = {
  /* ------------------------------------------------------------------ */
  /* CLUSTER A — notebook superaquecendo / desligando sozinho            */
  /* ------------------------------------------------------------------ */
  "/problemas/computador-esquentando": {
    tabelaExtra: {
      titulo: "Aquecimento normal ou anormal: como diferenciar antes de trocar qualquer peça",
      colunas: { causa: "Hipótese", verificar: "Como diferenciar", acao: "Ação" },
      linhas: [
        {
          sintoma: "Notebook esquenta e a ventoinha acelera só em jogo, render ou videochamada longa",
          causa: "Comportamento esperado: carga alta gera calor e o arrefecimento responde",
          verificar: "Ao voltar para uso leve, o ruído cai em poucos minutos e o desempenho se mantém",
          acao: "Nenhuma intervenção. Vale apenas garantir apoio rígido e entrada de ar livre",
        },
        {
          sintoma: "Notebook superaquecendo mesmo parado, com a área de trabalho aberta",
          causa: "Processo em segundo plano ou radiador saturado de poeira e fiapo",
          verificar: "Gerenciador de tarefas em repouso: uso alto de CPU aponta software; uso baixo com carcaça quente aponta obstrução",
          acao: "Software: encerrar o processo. Sem processo: limpeza interna com medição antes e depois",
        },
        {
          sintoma: "Começa bem e fica lento sempre no mesmo ponto da tarefa",
          causa: "Thermal throttling — o processador reduz a frequência para não passar do limite térmico",
          verificar: "A queda de desempenho acompanha o aquecimento e some depois de alguns minutos parado",
          acao: "Avaliação térmica: caminho de ar, rotação real da ventoinha e estado da pasta térmica",
        },
        {
          sintoma: "Notebook desligando sozinho, sem aviso, geralmente sob carga",
          causa: "Desligamento de proteção por temperatura, ou alimentação instável",
          verificar: "Se desliga sempre quente e depois só volta a ligar frio, é térmico; se desliga frio também, investigue fonte e bateria",
          acao: "Parar de usar sob carga até o diagnóstico — desligamento abrupto corrompe arquivo aberto",
        },
        {
          sintoma: "Ar saindo morno e fraco com o cooler girando alto",
          causa: "Caminho obstruído entre a ventoinha e as aletas do radiador",
          verificar: "Fluxo fraco com ruído alto é obstrução; fluxo forte e quente é dissipação funcionando",
          acao: "Limpeza interna. Trocar pasta térmica sem desobstruir o radiador muda pouco",
        },
        {
          sintoma: "Ruído metálico, chiado ou trepidação vindo da ventoinha",
          causa: "Rolamento gasto ou pá empenada — a rotação real fica abaixo da nominal",
          verificar: "Rotação alta relatada pelo sistema com pouco ar de fato saindo, ou variação de ruído ao mudar a inclinação",
          acao: "Substituição da ventoinha. Continuar usando leva a parada total do cooler e desligamento por proteção",
        },
      ],
    },
    blocos: [
      {
        id: "pasta-termica-limites",
        titulo: "Quando a pasta térmica ajuda e quando ela não resolve",
        intro:
          "A troca de pasta térmica virou resposta automática para qualquer notebook quente, e é justamente por isso que decepciona tanto. Ela recompõe a condução entre o processador e o dissipador — só isso. Se o gargalo está em outro ponto do caminho do calor, a temperatura volta ao mesmo patamar em pouco tempo.",
        itens: [
          {
            titulo: "Ajuda de verdade",
            desc: "Equipamento com alguns anos de uso, radiador limpo, ventoinha girando na rotação correta e temperatura alta em carga moderada. Aqui o composto ressecado é mesmo o elo fraco e a queda de temperatura aparece na medição.",
          },
          {
            titulo: "Ajuda pouco",
            desc: "Radiador com manta de fiapo entre a ventoinha e as aletas. O calor até sai do processador, mas não encontra saída. Sem desobstruir, a pasta nova entrega poucos graus e o ganho evapora em semanas.",
          },
          {
            titulo: "Não resolve",
            desc: "Ventoinha com rolamento gasto, entrada de ar tapada pelo apoio, ambiente muito quente ou processo em segundo plano consumindo tudo. Nenhum desses cenários muda com composto novo — o problema não é de contato térmico.",
          },
          {
            titulo: "Como saber sem chutar",
            desc: "Medindo. Registramos temperatura e rotação em repouso e sob carga antes da manutenção, e repetimos o mesmo teste depois. Sem esse par de medidas, qualquer afirmação sobre 'baixou X graus' é opinião.",
          },
        ],
        fecho: {
          antes: "A limpeza interna, a medição térmica e a troca de pasta quando ela realmente se justifica fazem parte da ",
          to: "/servicos/manutencao-de-notebook",
          anchor: "manutenção de notebook",
          depois: " — o laudo informa o que foi medido, não apenas o que foi trocado.",
        },
      },
      {
        id: "parar-de-usar",
        titulo: "Quando desligar e parar de usar o equipamento",
        intro:
          "Calor alto sustentado não queima o computador na maioria dos casos — o sistema se protege antes. O que ele faz é encurtar a vida de bateria, capacitores e da própria unidade de armazenamento. Existem, porém, situações em que continuar usando é risco imediato.",
        itens: [
          {
            titulo: "Pare agora: cheiro de queimado ou marca escura",
            desc: "Odor de plástico ou verniz aquecido indica componente em sofrimento elétrico, não apenas térmico. Desligue na tomada e não religue para testar.",
          },
          {
            titulo: "Pare agora: bateria estufada",
            desc: "Base ou teclado empenados, touchpad alto ou tampa que não fecha direito. Bateria deformada aquecida é risco físico e não deve ser recarregada.",
          },
          {
            titulo: "Pare agora: ventoinha parada com máquina quente",
            desc: "Silêncio total sob carga com a carcaça queimando é o pior cenário. Cada minuto assim empurra o processador contra o desligamento de proteção.",
          },
          {
            titulo: "Pode usar com cuidado",
            desc: "Aquecimento apenas em tarefas pesadas, sem desligamento e sem ruído anormal. Reduza a carga, use superfície rígida e agende a limpeza — mas salve o trabalho com frequência enquanto isso.",
          },
        ],
        fecho: {
          antes: "Quando o quadro já evoluiu para queda de energia sem aviso, a investigação muda de rumo e passa a incluir fonte e bateria: reunimos esse caminho em ",
          to: "/problemas/computador-desliga-sozinho",
          anchor: "computador que desliga sozinho",
          depois: ".",
        },
      },
    ],
    fontes: [
      {
        titulo: "Intel — Temperatura do processador e o que é considerado normal",
        url: "https://www.intel.com.br/content/www/br/pt/support/articles/000005597/processors.html",
        nota: "Referência do fabricante sobre limites térmicos e redução automática de frequência.",
      },
      {
        titulo: "AMD — Monitoramento de temperatura e comportamento térmico dos processadores",
        url: "https://www.amd.com/en/support",
        nota: "Documentação de suporte sobre leitura de temperatura e proteção térmica.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* CLUSTER B — SSD × HD, vale a pena trocar                            */
  /* ------------------------------------------------------------------ */
  "/solucoes/ssd": {
    tabelaExtra: {
      titulo: "HD, SSD SATA e SSD NVMe: o que muda na prática",
      colunas: { sintoma: "Cenário de uso", causa: "Com HD mecânico", verificar: "Com SSD SATA", acao: "Com SSD NVMe" },
      linhas: [
        {
          sintoma: "Ligar o computador e chegar à área de trabalho utilizável",
          causa: "Minutos, com disco em uso alto por um bom tempo depois do logon",
          verificar: "Ganho enorme e imediato — é a diferença mais perceptível da troca",
          acao: "Ganho marginal sobre o SATA; a diferença aqui é pequena no dia a dia",
        },
        {
          sintoma: "Abrir navegador, pacote de escritório e programas do dia a dia",
          causa: "Espera visível a cada abertura, pior com vários programas juntos",
          verificar: "Abertura quase instantânea na maioria dos casos",
          acao: "Praticamente igual ao SATA na percepção do usuário",
        },
        {
          sintoma: "Copiar arquivos grandes, editar vídeo, trabalhar com bases pesadas",
          causa: "Gargalo claro, com queda de taxa em transferências longas",
          verificar: "Muito melhor, mas com teto de interface",
          acao: "Aqui sim o NVMe se paga: taxas várias vezes maiores em leitura sequencial",
        },
        {
          sintoma: "Rodar jogo pesado com processador e placa de vídeo modestos",
          causa: "Carregamento demorado e travadas ao carregar cenário",
          verificar: "Carregamento muito mais rápido; taxa de quadros continua limitada pelo restante",
          acao: "Mesmo caso do SATA — armazenamento não substitui processador nem placa de vídeo",
        },
        {
          sintoma: "Trabalhar com o equipamento na mochila, no transporte diário",
          causa: "Peça mecânica, sensível a impacto com o disco girando",
          verificar: "Sem partes móveis, tolera bem o transporte",
          acao: "Mesma vantagem mecânica, com consumo e aquecimento próprios do modelo",
        },
      ],
    },
    blocos: [
      {
        id: "m2-nao-e-nvme",
        titulo: "M.2 não é sinônimo de NVMe — e isso muda a compra",
        intro:
          "Esse é o mal-entendido mais caro do upgrade de armazenamento. M.2 é o formato físico do conector; NVMe é o protocolo de comunicação. Existe SSD M.2 que fala SATA e existe M.2 que fala NVMe, e as placas nem sempre aceitam os dois.",
        itens: [
          {
            titulo: "M.2 SATA",
            desc: "Mesmo desempenho do SSD de 2,5 polegadas, em outro formato. Vale quando a máquina tem o slot mas não suporta NVMe: continua sendo um salto gigante em relação ao HD.",
          },
          {
            titulo: "M.2 NVMe",
            desc: "Conversa direto pelas linhas PCI Express. Entrega taxas muito maiores em arquivos grandes, e diferença pequena em abrir programas do dia a dia.",
          },
          {
            titulo: "Como confirmar o que a máquina aceita",
            desc: "Não pelo formato do slot: fisicamente eles se parecem. A confirmação vem do manual do modelo ou da identificação da placa antes da compra — comprar o padrão errado significa peça que não é reconhecida.",
          },
          {
            titulo: "Notebook antigo com slot único de 2,5 polegadas",
            desc: "Sem M.2 disponível, o caminho é o SSD SATA convencional no lugar do HD. O ganho continua sendo o maior de todos os upgrades possíveis naquele equipamento.",
          },
        ],
      },
      {
        id: "clonagem-x-limpa",
        titulo: "Clonagem ou instalação limpa: qual escolher",
        intro:
          "As duas rotas terminam com o sistema no SSD, mas carregam heranças diferentes. A escolha depende do estado do sistema atual, não da preferência de quem executa.",
        itens: [
          {
            titulo: "Clonagem",
            desc: "Copia o sistema como está: programas, licenças ativadas, configurações e perfil de usuário. É a rota mais rápida e menos traumática quando o Windows atual está saudável.",
          },
          {
            titulo: "Instalação limpa",
            desc: "Recomeça do zero. É a escolha quando o sistema já apresenta erros, infecção persistente ou anos de acúmulo — clonar nesse caso apenas leva o problema para um disco mais rápido.",
          },
          {
            titulo: "O que precede as duas",
            desc: "Cópia verificada dos arquivos. Clonagem é procedimento com disco de origem em leitura, mas backup conferido é a única proteção contra imprevisto durante a migração.",
          },
          {
            titulo: "Detalhes que costumam morder",
            desc: "Criptografia de disco ativa (BitLocker) exige a chave de recuperação em mãos; contas de programas licenciados por máquina podem pedir reativação; e o HD antigo não deve ser apagado antes de a máquina rodar alguns dias no SSD.",
          },
        ],
        fecho: {
          antes: "Antes de migrar qualquer coisa, vale conferir se a cópia atual é realmente restaurável — o critério prático está em ",
          to: "/solucoes/backup",
          anchor: "como um backup é conferido",
          depois: ".",
        },
      },
      {
        id: "arvore-ssd",
        titulo: "Manter o HD, trocar por SSD ou investigar antes",
        intro:
          "Trocar por SSD vale a pena na maioria dos equipamentos ainda em uso, mas não em todos, e não sempre como primeira medida. Esta é a sequência de decisão que usamos em bancada.",
        itens: [
          {
            titulo: "Trocar por SSD",
            desc: "Máquina que ainda atende ao uso, mas demora para iniciar e para abrir programas, com HD mecânico e memória suficiente. É o caso mais comum e o de melhor retorno por real investido.",
          },
          {
            titulo: "Investigar antes",
            desc: "Lentidão que aparece em rajadas, travamentos aleatórios, tela azul, aquecimento alto ou ruído no disco. Aqui o SSD pode mascarar por pouco tempo um problema de memória, temperatura ou alimentação.",
          },
          {
            titulo: "Manter o HD por enquanto",
            desc: "Equipamento que já tem SSD como disco do sistema e usa o HD só como depósito de arquivos. Trocar o disco secundário muda pouco na percepção e custa mais por gigabyte.",
          },
          {
            titulo: "Reavaliar o conjunto",
            desc: "Máquina com memória no limite, processador muito antigo ou placa sem suporte ao sistema atual. O SSD ajuda, mas o gargalo principal está em outro lugar — e vale dimensionar isso antes de comprar peça.",
          },
        ],
        fecho: {
          antes: "Quando a dúvida é sobre a ordem dos upgrades, a comparação direta entre memória e armazenamento está em ",
          to: "/servicos/upgrade-ssd-ram",
          anchor: "upgrade de SSD e memória",
          depois: ".",
        },
      },
    ],
    fontes: [
      {
        titulo: "NVM Express — especificação e diferença entre NVMe e AHCI/SATA",
        url: "https://nvmexpress.org/about/",
        nota: "Entidade responsável pelo padrão NVMe.",
      },
      {
        titulo: "Microsoft Learn — BitLocker e chave de recuperação",
        url: "https://learn.microsoft.com/pt-br/windows/security/operating-system-security/data-protection/bitlocker/",
        nota: "Documentação oficial sobre criptografia de disco antes de migrar o sistema.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* CLUSTER C — RAM ou SSD primeiro                                     */
  /* ------------------------------------------------------------------ */
  "/servicos/upgrade-ssd-ram": {
    respostaRapida:
      "Não existe resposta única para “RAM ou SSD primeiro”: a ordem depende do sintoma. Se a máquina demora para ligar e para abrir qualquer programa, e ainda usa HD mecânico, o SSD vem primeiro. Se ela já tem SSD e trava quando há muitas abas e programas abertos ao mesmo tempo, o gargalo é memória. E quando há travamento aleatório, tela azul ou aquecimento alto, o passo certo é diagnosticar antes de comprar peça — upgrade não corrige defeito.",
    tabelaDiagnostica: {
      titulo: "Seu sintoma aponta para memória, armazenamento ou diagnóstico",
      colunas: { causa: "RAM pode ajudar", verificar: "SSD pode ajudar", acao: "Investigar antes" },
      linhas: [
        {
          sintoma: "Demora muito para iniciar e chegar à área de trabalho utilizável",
          causa: "Pouco — a memória influencia pouco no tempo de partida",
          verificar: "Muito. É o ganho mais visível da troca de HD por SSD",
          acao: "Se já houver SSD, verificar programas de inicialização e saúde da unidade",
        },
        {
          sintoma: "Trava com muitas abas do navegador abertas",
          causa: "Muito. Navegador moderno consome memória por aba e guia",
          verificar: "Pouco. O disco entra só quando a memória acaba e o sistema recorre à paginação",
          acao: "Conferir consumo real por processo antes de definir a quantidade de memória",
        },
        {
          sintoma: "Fica lento depois de horas de uso e melhora ao reiniciar",
          causa: "Provável. Memória no limite com paginação constante",
          verificar: "Ajuda a suavizar, porque a paginação fica mais rápida — mas não resolve a causa",
          acao: "Verificar vazamento de memória de algum programa específico",
        },
        {
          sintoma: "Armazenamento cheio, sem espaço livre",
          causa: "Não. Memória não substitui espaço em disco",
          verificar: "Sim, se a troca vier com mais capacidade — mas o passo zero é liberar espaço",
          acao: "Mapear o que ocupa a unidade antes de comprar capacidade maior",
        },
        {
          sintoma: "Programas de edição, planilhas grandes ou máquinas virtuais engasgando",
          causa: "Muito. Essa é a carga que mais se beneficia de memória",
          verificar: "Ajuda em leitura e gravação de arquivos grandes, especialmente com NVMe",
          acao: "Dimensionar pelo consumo observado na tarefa real, não por regra genérica",
        },
        {
          sintoma: "Travamentos aleatórios, tela azul ou reinício sem padrão",
          causa: "Não trate como upgrade: pode ser módulo de memória com erro",
          verificar: "Não. Trocar disco não corrige instabilidade de hardware",
          acao: "Teste de memória e leitura dos códigos de parada antes de qualquer compra",
        },
        {
          sintoma: "Máquina já com SSD e memória confortável, ainda lenta",
          causa: "Pouco provável",
          verificar: "Pouco provável",
          acao: "Investigar temperatura, processos em segundo plano, malware e saúde da unidade",
        },
      ],
    },
    blocos: [
      {
        id: "ordem-upgrade",
        titulo: "A ordem que usamos quando os dois upgrades cabem no orçamento",
        intro:
          "Quando dá para fazer os dois, a ordem ainda importa: começar pelo item errado atrasa a percepção de melhora e às vezes leva a comprar mais do que o necessário no segundo passo.",
        itens: [
          {
            titulo: "1. Confirmar o que a máquina tem hoje",
            desc: "Tipo de armazenamento, memória instalada, quantos slots existem e quantos estão livres. Em muitos notebooks parte da memória é soldada e só um slot é expansível — isso define o teto real do upgrade.",
          },
          {
            titulo: "2. Resolver o gargalo dominante",
            desc: "HD mecânico presente quase sempre é o gargalo dominante. Sem HD na jogada, o dominante costuma ser memória, e a evidência vem do consumo observado no uso real da pessoa.",
          },
          {
            titulo: "3. Reavaliar depois de alguns dias",
            desc: "Boa parte dos casos encerra no primeiro upgrade. Reavaliar antes de comprar a segunda peça evita gasto que não muda a experiência.",
          },
          {
            titulo: "Um cuidado com memória",
            desc: "Misturar módulos de velocidades e capacidades diferentes funciona, mas o conjunto costuma operar no menor denominador e pode perder o modo de canal duplo. Vale conferir o que já está instalado antes de escolher a peça nova.",
          },
        ],
        fecho: {
          antes: "Se a dúvida ainda é sobre o próprio SSD — SATA, NVMe, clonagem ou instalação limpa —, esse comparativo está em ",
          to: "/solucoes/ssd",
          anchor: "trocar HD por SSD",
          depois: ".",
        },
      },
      {
        id: "o-que-upgrade-nao-faz",
        titulo: "O que o upgrade não faz",
        intro:
          "Ampliar memória e trocar armazenamento resolve limite de capacidade. Não resolve defeito, e é honesto dizer isso antes da compra.",
        itens: [
          {
            titulo: "Não corrige superaquecimento",
            desc: "Máquina que reduz a velocidade por temperatura continua reduzindo com peça nova. O caminho é térmico, não de capacidade.",
          },
          {
            titulo: "Não resolve infecção",
            desc: "Sistema comprometido segue comprometido no disco novo se a migração for por clonagem. A limpeza ou a reinstalação vem antes.",
          },
          {
            titulo: "Não rejuvenesce processador",
            desc: "Em equipamento muito antigo, o SSD dá fôlego real ao dia a dia, mas tarefas que dependem de processamento continuam no mesmo patamar.",
          },
          {
            titulo: "Não garante o sistema mais novo",
            desc: "Requisitos de versão do Windows envolvem também recursos da placa e do processador. Vale confirmar a compatibilidade do modelo antes de planejar o upgrade em função disso.",
          },
        ],
        fecho: {
          antes: "Quando a lentidão persiste mesmo com memória e disco adequados, o roteiro de investigação está em ",
          to: "/problemas/computador-lento",
          anchor: "computador lento",
          depois: ".",
        },
      },
    ],
    fontes: [
      {
        titulo: "Microsoft Learn — memória, arquivo de paginação e uso de memória virtual",
        url: "https://learn.microsoft.com/pt-br/troubleshoot/windows-client/performance/introduction-to-the-page-file",
        nota: "Explicação oficial de como o Windows recorre ao disco quando a memória se esgota.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* CLUSTER D — recuperar dados de HD com defeito                       */
  /* ------------------------------------------------------------------ */
  "/problemas/hd-fazendo-barulho": {
    respostaRapida:
      "Quando o HD apresenta defeito, a prioridade deixa de ser consertar e passa a ser preservar. Falha lógica — unidade reconhecida, mas com estrutura de arquivos danificada — costuma ter bom prognóstico. Falha física — clique repetido, unidade não reconhecida, raspagem — piora a cada minuto ligado. Em qualquer dos dois casos, recuperação nunca é garantida, e insistir em ligar, formatar ou rodar utilitário de correção é o que mais destrói dados recuperáveis.",
    tabelaExtra: {
      titulo: "Risco por sintoma: o que dá para tentar com segurança e o que não dá",
      colunas: { causa: "Risco", verificar: "Dá para tentar algo seguro?", acao: "Próximo passo" },
      linhas: [
        {
          sintoma: "Clique repetido em ciclo regular",
          causa: "Crítico — falha mecânica em curso",
          verificar: "Não. Nenhum procedimento caseiro é seguro nesse estado",
          acao: "Desligar imediatamente e não religar. A avaliação é feita com a unidade em bancada",
        },
        {
          sintoma: "HD não reconhecido pelo PC, mas gira e não faz ruído",
          causa: "Alto — pode ser eletrônica, cabo, porta ou interface",
          verificar: "Sim, com limite: testar outro cabo e outra porta, uma vez, sem forçar repetições",
          acao: "Se continuar invisível, parar. Não inicializar nem atribuir letra à unidade",
        },
        {
          sintoma: "Reconhecido, mas o sistema pede para formatar ao conectar",
          causa: "Médio — estrutura de arquivos corrompida, conteúdo provavelmente intacto",
          verificar: "Sim: recusar a formatação sugerida e desconectar",
          acao: "Preservar como está. A leitura é feita em modo somente leitura, sem escrever na unidade",
        },
        {
          sintoma: "Alerta de SMART na inicialização ou aviso de disco em falha",
          causa: "Alto — a reserva de setores da unidade está se esgotando",
          verificar: "Sim, com pressa: copiar primeiro os arquivos insubstituíveis para outra mídia",
          acao: "Copiar por prioridade — documentos e fotos antes de programas — e planejar a substituição",
        },
        {
          sintoma: "Arquivos abrindo corrompidos ou pastas que somem e voltam",
          causa: "Alto — leitura instável, com setores falhando de forma intermitente",
          verificar: "Sim: copiar o que ainda abre, sem rodar varredura de correção",
          acao: "Cópia por blocos em bancada é mais segura do que continuar usando a máquina normalmente",
        },
        {
          sintoma: "Raspagem metálica, chiado agudo ou cheiro anormal",
          causa: "Crítico — possível contato entre cabeça e prato",
          verificar: "Não",
          acao: "Desligar na tomada. Cada tentativa reduz o que serviço de sala limpa poderia recuperar",
        },
      ],
    },
    blocos: [
      {
        id: "logico-fisico-hd",
        titulo: "Falha lógica e falha física pedem decisões opostas",
        intro:
          "Essa separação é a que mais muda o resultado, e ela pode ser feita observando o comportamento — sem abrir nada e sem instalar nenhum programa.",
        itens: [
          {
            titulo: "Sinais de falha lógica",
            desc: "A unidade é reconhecida, mostra a capacidade correta e responde, ainda que devagar. Pastas abrem, alguns arquivos falham, o sistema sugere corrigir. O conteúdo tende a estar lá; o índice é que está danificado.",
          },
          {
            titulo: "Sinais de falha física",
            desc: "Some da lista de unidades, aparece com tamanho errado, trava o computador ao conectar, esquenta demais ou faz ruído novo. Nenhum programa contorna isso, e a insistência acelera a degradação.",
          },
          {
            titulo: "Por que insistir piora",
            desc: "Toda tentativa de leitura movimenta o braço sobre uma superfície já comprometida e mantém o motor sob esforço. Em disco com setor falhando, a releitura repetida é exatamente o que transforma perda parcial em perda total.",
          },
          {
            titulo: "O que nunca fazer antes de preservar",
            desc: "Não formatar, não aceitar a inicialização proposta pelo sistema, não rodar utilitário de correção de disco e não instalar programa de recuperação na própria unidade afetada.",
          },
        ],
        fecho: {
          antes: "Quando o problema é exclusão acidental e não defeito da unidade, o caminho é outro e está descrito em ",
          to: "/problemas/arquivos-apagados",
          anchor: "arquivos apagados por engano",
          depois: ".",
        },
      },
      {
        id: "expectativa-hd",
        titulo: "Expectativa honesta sobre o resultado",
        intro:
          "Recuperação de dados é trabalho de probabilidade. Trabalhamos para maximizar a chance, e informamos o cenário antes de qualquer autorização.",
        itens: [
          {
            titulo: "Não há garantia de recuperação",
            desc: "Nenhum prestador sério garante resultado antes de avaliar, e mesmo depois da avaliação o retorno pode ser parcial: alguns arquivos íntegros, outros corrompidos, alguns sem o nome original.",
          },
          {
            titulo: "A avaliação vem antes da promessa",
            desc: "Primeiro identificamos se o caso é lógico ou físico e se a unidade suporta uma cópia integral. Só então existe uma expectativa concreta a comunicar.",
          },
          {
            titulo: "Casos que exigem sala limpa",
            desc: "Abertura de disco com falha mecânica precisa de ambiente controlado, que não realizamos internamente. Quando é esse o caso, dizemos com clareza no laudo em vez de tentar e piorar.",
          },
          {
            titulo: "Depois de recuperar, o passo seguinte",
            desc: "Dado recuperado que volta para a mesma unidade não está salvo. A entrega é sempre em outra mídia, e vale aproveitar para estruturar uma rotina de cópia que não dependa de sorte.",
          },
        ],
        fecho: {
          antes: "O procedimento de bancada, com clonagem antes de qualquer tentativa de leitura, é o descrito em ",
          to: "/servicos/recuperacao-de-dados",
          anchor: "recuperação de dados",
          depois: ", com atendimento em Curitiba e São José dos Pinhais.",
        },
      },
    ],
    fontes: [
      {
        titulo: "Backblaze — relatórios públicos de confiabilidade e falha de discos",
        url: "https://www.backblaze.com/cloud-storage/resources/hard-drive-test-data",
        nota: "Base pública de dados sobre taxas de falha em discos rígidos.",
      },
      {
        titulo: "Microsoft Learn — chkdsk e efeitos da verificação de disco",
        url: "https://learn.microsoft.com/pt-br/windows-server/administration/windows-commands/chkdsk",
        nota: "Documentação oficial da ferramenta que não deve ser usada em disco com falha mecânica.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* CLUSTER E — quando formatar (owner comercial)                       */
  /* ------------------------------------------------------------------ */
  "/servicos/formatacao": {
    blocos: [
      {
        id: "quando-nao-resolve",
        titulo: "Quando a formatação não resolve",
        intro:
          "Esta seção existe porque a maior frustração com formatação não é o procedimento — é formatar e a máquina voltar a falhar em poucos dias. Isso acontece quando a causa nunca foi o sistema.",
        itens: [
          {
            titulo: "Armazenamento em falha",
            desc: "Disco com setores defeituosos ou unidade de estado sólido no fim da vida faz o sistema novo apresentar erro logo nas primeiras semanas. A leitura de saúde da unidade precede a decisão.",
          },
          {
            titulo: "Memória com erro",
            desc: "Módulo instável produz travamento e tela azul independentemente do sistema instalado. O teste de memória separa isso em pouco tempo e evita uma formatação inútil.",
          },
          {
            titulo: "Problema térmico",
            desc: "Máquina que reduz a velocidade ou desliga por temperatura continua fazendo isso com sistema recém-instalado. Aqui o serviço correto é limpeza e avaliação térmica.",
          },
          {
            titulo: "Alimentação instável",
            desc: "Fonte degradada ou bateria comprometida causa desligamento e corrupção recorrente. Formatar limpa o efeito e mantém a causa.",
          },
          {
            titulo: "Expectativa de desempenho",
            desc: "Equipamento com HD mecânico volta a ser lento assim que o uso normal recomeça. Nesse caso o ganho real vem do armazenamento, não da reinstalação.",
          },
        ],
        fecho: {
          antes: "Quando o objetivo é desempenho e não estabilidade, o comparativo honesto de ganho está em ",
          to: "/solucoes/ssd",
          anchor: "trocar HD por SSD",
          depois: ".",
        },
      },
      {
        id: "checklist-pre-formatacao",
        titulo: "Checklist antes de autorizar",
        intro:
          "Conferimos estes pontos junto com o cliente antes de iniciar. É a etapa que evita praticamente todo prejuízo associado a uma reinstalação.",
        itens: [
          {
            titulo: "Cópia verificada, não apenas feita",
            desc: "Antes de qualquer coisa, os arquivos são copiados e conferidos abrindo amostras. Backup que ninguém testou é suposição, e formatação é irreversível.",
          },
          {
            titulo: "Criptografia de disco",
            desc: "Se o BitLocker estiver ativo, a chave de recuperação precisa estar acessível na conta Microsoft ou impressa. Sem ela, o conteúdo do disco não é legível nem por nós.",
          },
          {
            titulo: "Contas e licenças",
            desc: "Conta de e-mail configurada localmente, senhas salvas no navegador, autenticação em dois fatores vinculada ao aparelho e programas licenciados por máquina precisam ser mapeados antes, não depois.",
          },
          {
            titulo: "Drivers do modelo",
            desc: "Notebooks com placa de rede sem driver nativo ficam sem internet logo após a instalação. Separar os drivers do fabricante antes evita máquina entregue pela metade.",
          },
          {
            titulo: "O que fica e o que vai",
            desc: "Definimos com o cliente quais pastas retornam para a máquina, o que fica arquivado e o que não será restaurado — decisão registrada antes de o disco ser preparado.",
          },
        ],
        fecho: {
          antes: "Se ainda houver arquivos importantes fora de qualquer cópia, o critério de uma rotina que realmente restaura está em ",
          to: "/solucoes/backup",
          anchor: "backup conferido",
          depois: ".",
        },
      },
      {
        id: "reinstalacao-x-recuperacao",
        titulo: "Instalação limpa, recuperação do sistema e reparo dirigido",
        intro:
          "Nem todo caso precisa do procedimento mais radical. A escolha depende do quanto o sistema atual ainda é confiável.",
        itens: [
          {
            titulo: "Reparo dirigido",
            desc: "Quando a falha é localizada — um driver, um perfil de usuário, uma atualização malsucedida — o conserto pontual preserva programas e configurações e resolve em menos tempo.",
          },
          {
            titulo: "Recuperação do sistema",
            desc: "Recurso do próprio Windows que reinstala o sistema mantendo arquivos pessoais. Serve para corrupção moderada, e mesmo assim exige cópia prévia: o processo pode falhar no meio.",
          },
          {
            titulo: "Instalação limpa",
            desc: "Disco preparado do zero. É o caminho para comprometimento amplo, histórico longo de erros, troca de usuário do equipamento ou quando as tentativas anteriores já falharam.",
          },
          {
            titulo: "Como decidimos",
            desc: "Pelo diagnóstico, não pelo pedido. Se o quadro indicar hardware, informamos antes e a formatação simplesmente não é indicada naquele momento.",
          },
        ],
        fecho: {
          antes: "Quando a suspeita principal é infecção e não corrupção do sistema, a triagem apropriada está em ",
          to: "/servicos/remocao-de-virus",
          anchor: "remoção de vírus e malware",
          depois: ".",
        },
      },
    ],
    fontes: [
      {
        titulo: "Microsoft Learn — encontrar a chave de recuperação do BitLocker",
        url: "https://learn.microsoft.com/pt-br/windows/security/operating-system-security/data-protection/bitlocker/",
        nota: "Referência oficial sobre criptografia de disco antes de reinstalar o sistema.",
      },
      {
        titulo: "Microsoft — ciclo de vida e suporte das versões do Windows",
        url: "https://learn.microsoft.com/pt-br/lifecycle/products/",
        nota: "Fonte oficial para verificar até quando cada versão recebe atualizações.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* CLUSTER F — identificar e remover vírus                             */
  /* ------------------------------------------------------------------ */
  "/servicos/remocao-de-virus": {
    tabelaExtra: {
      titulo: "Triagem: o sintoma indica malware ou tem outra explicação",
      colunas: { causa: "Pode ser malware?", verificar: "Outras causas comuns", acao: "Próxima verificação" },
      linhas: [
        {
          sintoma: "Página inicial e buscador mudaram sozinhos",
          causa: "Provável — comportamento típico de adware ou extensão indesejada",
          verificar: "Instalação de programa gratuito com componente extra aceito sem perceber",
          acao: "Revisar extensões e programas instalados na mesma data da mudança",
        },
        {
          sintoma: "Pop-ups aparecem mesmo com o navegador fechado",
          causa: "Provável — indica programa residente, não apenas extensão",
          verificar: "Notificações de site autorizadas por engano também produzem alertas parecidos",
          acao: "Conferir permissões de notificação e tarefas agendadas antes de concluir infecção",
        },
        {
          sintoma: "PC lento e com uso alto de processador sem nada aberto",
          causa: "Possível — mineração indesejada consome exatamente assim",
          verificar: "Atualização em andamento, indexação de arquivos, antivírus varrendo ou sincronização de nuvem",
          acao: "Identificar o processo pelo nome e caminho no gerenciador de tarefas antes de agir",
        },
        {
          sintoma: "Arquivos renomeados com extensão estranha e bilhete de resgate",
          causa: "Sim — cenário de ransomware, o mais grave da lista",
          verificar: "Não há causa benigna equivalente",
          acao: "Desconectar da rede imediatamente, não pagar, não apagar os arquivos cifrados e preservar tudo",
        },
        {
          sintoma: "Contatos relatam mensagens que você não enviou",
          causa: "Possível — mas com frequência é conta comprometida, não a máquina",
          verificar: "Senha vazada e reaproveitada em outro serviço",
          acao: "Trocar senha de outro aparelho confiável e revisar sessões e dispositivos conectados",
        },
        {
          sintoma: "Antivírus desativado sozinho ou impossível de abrir",
          causa: "Forte indício — bloquear a defesa é comportamento comum de malware",
          verificar: "Dois antivírus instalados brigando entre si produzem sintoma parecido",
          acao: "Verificar quantas soluções de segurança existem instaladas antes de concluir",
        },
        {
          sintoma: "Máquina lenta, mas só ao abrir programas e arquivos",
          causa: "Pouco provável",
          verificar: "HD mecânico, disco cheio ou memória insuficiente",
          acao: "Avaliar armazenamento e memória — a limpeza de malware não mudaria isso",
        },
      ],
    },
    blocos: [
      {
        id: "vocabulario-malware",
        titulo: "Vírus, malware, adware e PUP não são a mesma coisa",
        intro:
          "A confusão de nomes atrapalha a decisão, porque cada categoria pede um trabalho diferente — e algumas nem chegam a ser código malicioso.",
        itens: [
          {
            titulo: "Malware",
            desc: "Termo guarda-chuva para qualquer programa com intenção maliciosa: vírus, cavalo de troia, spyware, ransomware. É a palavra correta para a maioria dos casos que atendemos.",
          },
          {
            titulo: "Vírus",
            desc: "Categoria específica que se replica anexando-se a outros arquivos. Hoje é minoria: o cenário atual é dominado por trojans e por engenharia social, em que a própria pessoa autoriza a instalação.",
          },
          {
            titulo: "Adware",
            desc: "Injeta anúncios, redireciona buscas e troca a página inicial. Raramente destrói dados, mas costuma vir acompanhado de coleta de navegação e abre porta para coisa pior.",
          },
          {
            titulo: "PUP (programa potencialmente indesejado)",
            desc: "Barra de ferramentas, otimizador e limpador que chegam junto com outro instalador. Tecnicamente foram autorizados, o que faz muitos antivírus não removerem sem confirmação.",
          },
        ],
        fecho: {
          antes: "Os sintomas em detalhe, com o que cada um costuma indicar, estão reunidos em ",
          to: "/blog/como-saber-se-pc-tem-virus-malware",
          anchor: "como saber se o PC está infectado",
          depois: ".",
        },
      },
      {
        id: "limpeza-x-reinstalacao",
        titulo: "Quando limpar e quando reinstalar é mais seguro",
        intro:
          "Limpeza dirigida preserva programas e configurações. Reinstalação recomeça do zero. A escolha é técnica e tem a ver com o grau de comprometimento, não com preferência.",
        itens: [
          {
            titulo: "Limpeza dirigida costuma bastar",
            desc: "Adware, extensão indesejada, PUP e infecção recente identificada com clareza. Removemos o que foi encontrado, revisamos inicialização e tarefas agendadas e verificamos o resultado.",
          },
          {
            titulo: "Reinstalação é mais segura",
            desc: "Comprometimento com privilégio de administrador, malware que retorna após remoção, antivírus desabilitado pelo próprio agente ou suspeita de acesso remoto. Nesses casos, confiar no sistema anterior é aposta.",
          },
          {
            titulo: "Ransomware é um caso à parte",
            desc: "Isolar da rede vem antes de tudo. Os arquivos cifrados são preservados como estão — pagar não é recomendado, e às vezes o material só se torna recuperável tempos depois. Nunca prometemos decifrar.",
          },
          {
            titulo: "O que nenhum serviço pode prometer",
            desc: "Nenhuma limpeza deixa uma máquina '100% livre de vírus' de forma permanente. O que se entrega é o sistema íntegro no momento da verificação, com os pontos de reinfecção fechados.",
          },
        ],
        fecho: {
          antes: "Quando o quadro indica reinstalação, o procedimento, o checklist prévio e o que ele não resolve estão em ",
          to: "/servicos/formatacao",
          anchor: "formatação com backup conferido",
          depois: ".",
        },
      },
      {
        id: "contas-depois",
        titulo: "Depois da limpeza: contas, senhas e backup com cautela",
        intro:
          "Máquina limpa e conta comprometida é meio serviço. Esta parte depende do cliente e orientamos ponto a ponto.",
        itens: [
          {
            titulo: "Trocar senhas de outro aparelho",
            desc: "Se houve captura de teclado, trocar a senha na máquina afetada entrega a nova senha junto. A troca é feita de um celular ou outro computador confiável.",
          },
          {
            titulo: "Revisar sessões e dispositivos",
            desc: "E-mail, banco e redes sociais listam sessões ativas. Encerrar todas e reativar a verificação em duas etapas fecha o acesso que ficou aberto.",
          },
          {
            titulo: "Backup com cautela",
            desc: "Cópia feita durante a infecção pode conter o agente. Restauramos dados, não executáveis, e conferimos os arquivos antes de devolvê-los ao sistema limpo.",
          },
          {
            titulo: "Fechar a porta de entrada",
            desc: "Quase todo caso começa em instalador de origem duvidosa, anexo inesperado ou programa 'ativado'. Sem mudar isso, a reinfecção é questão de semanas.",
          },
        ],
      },
    ],
    fontes: [
      {
        titulo: "CISA — orientações oficiais sobre ransomware (StopRansomware)",
        url: "https://www.cisa.gov/stopransomware",
        nota: "Agência de segurança cibernética dos EUA: o que fazer e o que não fazer em incidente de ransomware.",
      },
      {
        titulo: "Microsoft Learn — proteção contra malware no Windows e verificação offline",
        url: "https://learn.microsoft.com/pt-br/defender-endpoint/microsoft-defender-offline",
        nota: "Documentação oficial sobre varredura fora do sistema em execução.",
      },
    ],
  },
};

/** Combina o enriquecimento existente com o da rodada 4A, sem sobrescrever. */
export const mesclarEnriquecimento = (
  base: EnriquecimentoConteudo | undefined,
  extra: EnriquecimentoConteudo | undefined,
): EnriquecimentoConteudo | undefined => {
  if (!base) return extra;
  if (!extra) return base;
  return {
    respostaRapida: base.respostaRapida ?? extra.respostaRapida,
    tabelaDiagnostica: base.tabelaDiagnostica ?? extra.tabelaDiagnostica,
    tabelaExtra: base.tabelaExtra ?? extra.tabelaExtra,
    blocos: [...(base.blocos ?? []), ...(extra.blocos ?? [])],
    fontes: [...(base.fontes ?? []), ...(extra.fontes ?? [])],
  };
};
