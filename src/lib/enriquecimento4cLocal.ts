/**
 * Rodada 4C — Autoridade comercial local (Curitiba + São José dos Pinhais).
 *
 * Regras desta rodada:
 *  - NENHUMA URL nova. Só páginas comerciais que já existem e já são indexáveis.
 *  - Canonical, robots e sitemap permanecem exatamente como estavam.
 *  - Um owner por intenção comercial. Owners técnicos de /servicos/* e owners
 *    já congelados nas rodadas 4A/4B não aparecem aqui.
 *  - Nada de doorway: cada owner responde a uma DECISÃO diferente do cliente
 *    (quem contratar, onde consertar, onde é atendido, como é atendido) e usa
 *    vocabulário próprio. Similaridade entre owners é verificada em teste.
 *
 * A chave é o caminho completo da página.
 */
import type { EnriquecimentoConteudo } from "./enriquecimento";

/** Intenção declarada de cada owner, usada pelo gate anti-doorway. */
export type IntencaoOwner = {
  /** Decisão única que a página resolve. */
  primaria: string;
  /** Intenções que a página NÃO deve disputar (owner de outra URL). */
  evitar: string[];
  /** URL dona de cada intenção evitada, para interlinking correto. */
  encaminharPara: string[];
};

export const INTENCOES_4C: Record<string, IntencaoOwner> = {
  "/tecnico-informatica-curitiba": {
    primaria: "contratar um técnico de informática em Curitiba: o que exigir antes de aceitar o orçamento",
    evitar: ["conserto em bancada", "cobertura por bairro", "sessão remota"],
    encaminharPara: ["/assistencia-tecnica-curitiba", "/areas-atendidas", "/atendimento-remoto"],
  },
  "/assistencia-tecnica-curitiba": {
    primaria: "levar o equipamento para uma assistência técnica: ordem de serviço, prazo, peça e garantia",
    evitar: ["visita no endereço", "escolha de profissional", "cobertura por bairro"],
    encaminharPara: ["/atendimento-domicilio", "/tecnico-informatica-curitiba", "/areas-atendidas"],
  },
  "/tecnico-informatica-sao-jose-pinhais": {
    primaria: "atendimento técnico dentro de São José dos Pinhais: logística, deslocamento e janela de horário",
    evitar: ["conteúdo de Curitiba", "conserto em bancada", "sessão remota"],
    encaminharPara: ["/tecnico-informatica-curitiba", "/assistencia-tecnica-curitiba", "/atendimento-remoto"],
  },
  "/atendimento-domicilio": {
    primaria: "decidir se o caso resolve no endereço do cliente ou precisa ir para bancada",
    evitar: ["preço de peça", "cobertura por bairro", "escolha de profissional"],
    encaminharPara: ["/assistencia-tecnica-curitiba", "/areas-atendidas", "/tecnico-informatica-curitiba"],
  },
  "/areas-atendidas": {
    primaria: "saber se o endereço está na área atendida e como o deslocamento entra no orçamento",
    evitar: ["diagnóstico técnico", "ordem de serviço", "sessão remota"],
    encaminharPara: ["/tecnico-informatica-curitiba", "/assistencia-tecnica-curitiba", "/atendimento-remoto"],
  },
  "/atendimento-remoto": {
    primaria: "verificar se o problema é resolvível em sessão remota, sem ninguém sair do lugar",
    evitar: ["visita no endereço", "conserto em bancada", "cobertura por bairro"],
    encaminharPara: ["/atendimento-domicilio", "/assistencia-tecnica-curitiba", "/areas-atendidas"],
  },
};

export const ENRIQUECIMENTO_4C: Record<string, EnriquecimentoConteudo> = {
  /* ------------------------------------------------------------------ */
  /* OWNER 1 — escolher e contratar o profissional                       */
  /* ------------------------------------------------------------------ */
  "/tecnico-informatica-curitiba": {
    respostaRapida:
      "Contratar bem começa antes do conserto: peça diagnóstico descrito por escrito, valor separado entre mão de obra e peça, prazo declarado e garantia com escopo claro do que está coberto. Um profissional sério recusa fechar preço fechado por telefone quando o sintoma admite várias causas — ele fala em faixa e confirma depois de abrir ou testar. Desconfie de valor único para qualquer problema, de pressa para levar o equipamento sem registro e de promessa de recuperar dados sem avaliar o disco antes.",
    tabelaExtra: {
      titulo: "O que perguntar antes de autorizar o serviço em Curitiba",
      colunas: {
        sintoma: "Pergunta que você faz",
        causa: "Resposta que indica profissional preparado",
        verificar: "Sinal de alerta",
        acao: "Por que isso importa no seu bolso",
      },
      linhas: [
        {
          sintoma: "Como você chega ao diagnóstico?",
          causa: "Descreve testes concretos: fonte, memória, disco, temperatura, boot alternativo",
          verificar: "Responde só \"a gente vê na hora\" e já sugere formatar",
          acao: "Formatar sem testar hardware devolve o mesmo problema em semanas e você paga duas vezes",
        },
        {
          sintoma: "O valor inclui peça?",
          causa: "Separa mão de obra de peça e explica que a peça depende do modelo e da disponibilidade",
          verificar: "Preço único \"tudo incluso\" antes de saber a causa",
          acao: "Preço fechado às cegas embute risco: ou você paga a mais, ou a peça vira cobrança extra depois",
        },
        {
          sintoma: "Qual é o prazo real?",
          causa: "Distingue serviço de bancada rápido de caso que depende de peça encomendada",
          verificar: "Promete \"hoje mesmo\" para qualquer serviço",
          acao: "Prazo irreal costuma virar improviso: peça genérica, solda malfeita ou serviço pela metade",
        },
        {
          sintoma: "A garantia cobre o quê?",
          causa: "Delimita: cobre o serviço executado e a peça trocada, não falhas novas em outro componente",
          verificar: "Diz \"garantia total\" sem escrever o escopo",
          acao: "Garantia sem escopo escrito é a que mais gera discussão quando o equipamento volta",
        },
        {
          sintoma: "Meus dados ficam preservados?",
          causa: "Explica que backup é etapa cobrada e checada, não um extra automático",
          verificar: "Garante que \"não perde nada\" sem ver o estado do disco",
          acao: "Disco em degradação pode falhar durante a cópia; quem promete demais não avaliou o risco",
        },
        {
          sintoma: "Como fica registrado o que foi feito?",
          causa: "Entrega descrição do serviço, peças usadas e condição do equipamento na entrega",
          verificar: "Nada por escrito, só combinação verbal",
          acao: "Sem registro você não consegue acionar garantia nem comparar orçamentos futuros",
        },
      ],
    },
    blocos: [
      {
        id: "4c-cwb-orcamento",
        titulo: "Como um orçamento honesto é montado",
        intro:
          "Orçamento não é chute nem tabela única. Ele soma variáveis que existem de verdade e que você pode conferir uma a uma.",
        itens: [
          {
            titulo: "Tempo técnico",
            desc: "Quanto tempo o profissional fica dedicado ao seu equipamento, incluindo testes que não aparecem para o cliente, como rodar verificação de memória ou observar temperatura sob carga.",
          },
          {
            titulo: "Complexidade do procedimento",
            desc: "Trocar um SSD e reinstalar o sistema é diferente de desmontar um notebook inteiro para chegar ao cooler. O mesmo equipamento pode ter serviços simples e serviços demorados.",
          },
          {
            titulo: "Peça, quando houver",
            desc: "Peça tem custo próprio, procedência e garantia própria. Ela aparece separada porque você tem direito de decidir entre alternativas de preço e durabilidade diferentes.",
          },
          {
            titulo: "Risco assumido",
            desc: "Equipamento com histórico de líquido, queda ou reparo anterior malfeito exige cautela extra e às vezes recusa. Assumir risco silenciosamente é o que produz conflito depois.",
          },
        ],
        fecho: {
          antes: "Se o seu caso já indica bancada em vez de visita, vale entender antes como funciona a ",
          to: "/assistencia-tecnica-curitiba",
          anchor: "assistência técnica com ordem de serviço",
          depois: " e o que muda no prazo.",
        },
      },
      {
        id: "4c-cwb-quando-nao-vale",
        titulo: "Quando consertar não é a melhor decisão",
        intro:
          "Nem todo equipamento merece reparo. Ser avisado disso antes de gastar é parte do serviço, não perda de venda.",
        itens: [
          {
            titulo: "Custo perto do valor de mercado",
            desc: "Quando o reparo se aproxima do preço de um equipamento equivalente usado em bom estado, o conserto só faz sentido por motivo específico: dados, compatibilidade com um sistema antigo ou urgência.",
          },
          {
            titulo: "Placa com dano múltiplo",
            desc: "Oxidação espalhada, trilhas rompidas em vários pontos ou reparo anterior improvisado reduzem muito a previsibilidade. O reparo pode funcionar e voltar a falhar sem aviso.",
          },
          {
            titulo: "Limitação estrutural",
            desc: "Máquinas que não aceitam mais memória, não têm slot para SSD moderno ou já saíram do suporte do fabricante têm teto de desempenho. Investir nelas resolve pouco.",
          },
          {
            titulo: "Só os dados importam",
            desc: "Em vários casos o equipamento pode ser aposentado e o serviço real é extrair os arquivos com segurança. Isso é mais barato do que insistir num reparo que não se paga.",
          },
        ],
        fecho: {
          antes: "Antes de decidir, confirme se o seu endereço entra na ",
          to: "/areas-atendidas",
          anchor: "área atendida e em qual modalidade",
          depois: ", porque isso também muda o custo total.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* OWNER 2 — assistência técnica / bancada                             */
  /* ------------------------------------------------------------------ */
  "/assistencia-tecnica-curitiba": {
    respostaRapida:
      "Assistência técnica é o caminho quando o equipamento precisa ser aberto, testado com peça substituta ou ficar em observação por horas — coisas que não cabem numa visita. O fluxo correto é entrada com registro do estado do aparelho, avaliação, orçamento antes de qualquer intervenção, autorização sua e só então execução. Você deve receber prazo estimado, saber se depende de peça encomendada e retirar o equipamento com descrição do que foi feito.",
    tabelaExtra: {
      titulo: "Etapas da ordem de serviço: o que acontece em cada fase",
      colunas: {
        sintoma: "Etapa",
        causa: "O que é feito",
        verificar: "O que você recebe",
        acao: "Prazo típico dessa fase",
      },
      linhas: [
        {
          sintoma: "Entrada e registro",
          causa: "Conferência do estado externo, acessórios entregues e relato do sintoma como o cliente descreve",
          verificar: "Identificação da ordem de serviço e descrição do que entrou",
          acao: "No ato da entrega do equipamento",
        },
        {
          sintoma: "Avaliação técnica",
          causa: "Testes de bancada: alimentação, memória, armazenamento, temperatura e inicialização controlada",
          verificar: "Diagnóstico com a causa provável e o que ainda depende de peça para confirmar",
          acao: "Depende da fila e da natureza do defeito; intermitências exigem observação mais longa",
        },
        {
          sintoma: "Orçamento",
          causa: "Separação entre mão de obra e peça, com alternativas quando existem",
          verificar: "Valor, escopo e o que não está incluído",
          acao: "Enviado assim que a avaliação conclui",
        },
        {
          sintoma: "Autorização",
          causa: "Nada é executado antes do seu aceite; recusa não vira cobrança de serviço não feito",
          verificar: "Confirmação registrada do que foi autorizado",
          acao: "Aguarda a sua resposta — a fila só anda depois disso",
        },
        {
          sintoma: "Execução",
          causa: "Reparo, troca ou reinstalação conforme autorizado, com testes de verificação ao final",
          verificar: "Relato do procedimento e da peça aplicada, quando houver",
          acao: "Varia entre serviço direto e caso que aguarda peça de reposição",
        },
        {
          sintoma: "Entrega",
          causa: "Demonstração do equipamento funcionando e orientação de uso para não repetir o problema",
          verificar: "Descrição final do serviço e condições de garantia do que foi executado",
          acao: "Combinada com você, presencial ou com entrega quando aplicável",
        },
      ],
    },
    blocos: [
      {
        id: "4c-bancada-o-que-exige",
        titulo: "O que só a bancada resolve",
        intro:
          "Alguns defeitos não são diagnosticáveis na mesa da sala. Eles precisam de peça substituta, instrumento e tempo.",
        itens: [
          {
            titulo: "Falha intermitente",
            desc: "Equipamento que trava às vezes precisa rodar sob carga por horas para reproduzir o defeito. Uma visita de uma hora quase nunca captura esse comportamento.",
          },
          {
            titulo: "Suspeita de componente",
            desc: "Confirmar memória, fonte ou placa exige testar com peça sabidamente boa. Isso significa ter estoque de teste à mão, o que só existe na oficina.",
          },
          {
            titulo: "Limpeza interna profunda",
            desc: "Desmontagem completa, remoção de pasta térmica antiga e recolocação exigem bancada limpa, ferramenta correta e superfície estável — não é serviço para fazer em cima de um móvel do cliente.",
          },
          {
            titulo: "Disco em risco",
            desc: "Armazenamento com setores defeituosos precisa de cópia controlada, interrompível e monitorada. Tentar isso em visita rápida aumenta a chance de perder o que ainda era legível.",
          },
        ],
        fecho: {
          antes: "Casos que não exigem abertura costumam se resolver melhor com ",
          to: "/atendimento-domicilio",
          anchor: "atendimento no seu endereço",
          depois: ", sem tirar o equipamento de casa.",
        },
      },
      {
        id: "4c-bancada-pecas",
        titulo: "Peças: procedência, alternativa e o que a garantia cobre",
        itens: [
          {
            titulo: "Original, equivalente e recondicionada",
            desc: "As três existem no mercado e têm preço e durabilidade diferentes. Você deve saber qual está sendo proposta antes de autorizar, porque isso muda o valor e a expectativa de vida útil.",
          },
          {
            titulo: "Disponibilidade manda no prazo",
            desc: "Peça de modelo comum costuma ser rápida. Componente de linha antiga ou importada pode levar dias. Prazo honesto é aquele que menciona essa dependência em vez de escondê-la.",
          },
          {
            titulo: "Garantia da peça é separada",
            desc: "A garantia do serviço cobre a execução; a da peça segue o que o fornecedor oferece. São coisas distintas e devem estar descritas assim.",
          },
          {
            titulo: "Peça antiga fica disponível",
            desc: "Quando o componente substituído não precisa ser devolvido ao fornecedor, você pode pedir para ver ou levar a peça removida. É a forma mais simples de conferir que a troca aconteceu.",
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* OWNER 3 — São José dos Pinhais                                      */
  /* ------------------------------------------------------------------ */
  "/tecnico-informatica-sao-jose-pinhais": {
    respostaRapida:
      "Em São José dos Pinhais o que muda não é o defeito, é a logística. Distâncias maiores entre bairros, trechos com trânsito pesado em horário de turno das indústrias e áreas com ocupação mais espalhada fazem a janela de horário importar mais do que em bairro central. Por isso o combinado começa por três informações: bairro, tipo de equipamento e horário em que alguém pode receber. Com isso dá para dizer se o caso resolve numa passagem, se compensa remoto ou se o melhor é coleta.",
    tabelaExtra: {
      titulo: "Planejamento do atendimento em São José dos Pinhais",
      colunas: {
        sintoma: "Situação do chamado",
        causa: "Por que a logística pesa aqui",
        verificar: "Informação que você adianta",
        acao: "Encaminhamento provável",
      },
      linhas: [
        {
          sintoma: "Residência em bairro afastado do centro da cidade",
          causa: "Deslocamento maior consome parte da janela, então concentrar tudo numa passagem evita retorno",
          verificar: "Liste todos os pontos a resolver, inclusive impressora e Wi-Fi, não só o computador",
          acao: "Visita única com escopo ampliado, combinada por horário",
        },
        {
          sintoma: "Escritório ou comércio com expediente fixo",
          causa: "Parar o atendimento ao público custa mais caro que o serviço",
          verificar: "Informe o intervalo em que a máquina pode ficar indisponível",
          acao: "Agendamento fora do pico ou execução em etapas",
        },
        {
          sintoma: "Equipamento que não liga",
          causa: "Sem energia não há teste no local: a visita viraria só uma conferência",
          verificar: "Confirme se há qualquer LED, ruído ou reação ao carregador",
          acao: "Coleta para bancada, evitando visita improdutiva",
        },
        {
          sintoma: "Problema só de configuração ou sistema",
          causa: "Deslocar alguém por um ajuste que a sessão resolve encarece sem necessidade",
          verificar: "Verifique se o computador liga e tem internet estável",
          acao: "Sessão remota no mesmo dia, quando houver janela",
        },
        {
          sintoma: "Vários equipamentos no mesmo endereço",
          causa: "Uma ida atende todos; idas separadas multiplicam deslocamento",
          verificar: "Some quantas máquinas, impressoras e pontos de rede estão envolvidos",
          acao: "Atendimento agrupado com tempo reservado maior",
        },
        {
          sintoma: "Urgência com prazo de trabalho",
          causa: "Trânsito em horário de turno pode inviabilizar chegada rápida",
          verificar: "Diga qual é o prazo real e o que precisa estar funcionando primeiro",
          acao: "Solução provisória imediata e reparo definitivo agendado",
        },
      ],
    },
    blocos: [
      {
        id: "4c-sjp-preparo",
        titulo: "Como reduzir o tempo da visita em São José dos Pinhais",
        intro:
          "Metade do tempo perdido em atendimento não é técnico: é procurar senha, liberar espaço e descobrir onde fica o roteador.",
        itens: [
          {
            titulo: "Deixe o acesso pronto",
            desc: "Senha do computador, senha do Wi-Fi e, se houver, o login do provedor. Sem isso, boa parte da configuração de rede simplesmente não avança.",
          },
          {
            titulo: "Libere o entorno do equipamento",
            desc: "Desktop encostado na parede ou notebook em cima de pilha de papel atrasam qualquer serviço. Uma mesa livre economiza minutos que valem dinheiro.",
          },
          {
            titulo: "Reúna cabos e acessórios",
            desc: "Carregador, cabo de energia, cabo de rede e nota fiscal do equipamento, quando estiver em garantia de fábrica, mudam o encaminhamento do caso.",
          },
          {
            titulo: "Anote o comportamento exato",
            desc: "Quando começou, o que aparece na tela e se acontece sempre ou só em alguma situação. Relato preciso encurta o diagnóstico mais que qualquer ferramenta.",
          },
        ],
        fecho: {
          antes: "Se o problema for de sistema e a máquina ligar normalmente, avalie primeiro o ",
          to: "/atendimento-remoto",
          anchor: "suporte remoto",
          depois: ", que dispensa deslocamento.",
        },
      },
      {
        id: "4c-sjp-perfil",
        titulo: "Chamados que mais aparecem na cidade",
        intro:
          "O perfil de uso local puxa alguns pedidos com mais frequência que outros. Não é regra, é recorrência observada no dia a dia.",
        itens: [
          {
            titulo: "Home office em casa espalhada",
            desc: "Casa com laje, área externa e cômodos distantes derruba o sinal do roteador entregue pelo provedor. O problema aparece como internet ruim, mas é cobertura.",
          },
          {
            titulo: "Máquinas de comércio de bairro",
            desc: "Computador de balcão costuma ser antigo, ficar ligado o dia inteiro e acumular poeira. Aquecimento e lentidão vêm juntos nesses casos.",
          },
          {
            titulo: "Notebook de estudante e curso técnico",
            desc: "Equipamento carregado na mochila sofre com dobradiça, conector de energia e bateria antes de sofrer com software.",
          },
          {
            titulo: "Impressora compartilhada",
            desc: "Impressora que sai do ar depois de troca de roteador é caso clássico: o endereço mudou e ninguém reconfigurou os computadores.",
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* OWNER 4 — atendimento no endereço                                   */
  /* ------------------------------------------------------------------ */
  "/atendimento-domicilio": {
    respostaRapida:
      "A visita compensa quando o problema depende do ambiente: rede, impressora, cabeamento, configuração, instalação e orientação de uso. Ela deixa de compensar quando o equipamento precisa ser aberto, testado com peça substituta ou observado por horas — aí a visita vira só uma conferência e o serviço acontece na bancada mesmo. Descrever o sintoma com precisão antes de agendar é o que evita pagar deslocamento para ouvir que o caso segue para oficina.",
    tabelaExtra: {
      titulo: "Resolve no endereço ou vai para bancada?",
      colunas: {
        sintoma: "O que está acontecendo",
        causa: "Depende do ambiente ou do equipamento?",
        verificar: "Como confirmar antes de agendar",
        acao: "Modalidade indicada",
      },
      linhas: [
        {
          sintoma: "Internet cai em partes da casa",
          causa: "Ambiente: posição do roteador, paredes, interferência e distância",
          verificar: "Teste o sinal ao lado do roteador e no cômodo problemático",
          acao: "Visita — o diagnóstico só existe no local",
        },
        {
          sintoma: "Impressora sumiu da rede",
          causa: "Ambiente: endereço mudou depois de trocar roteador ou provedor",
          verificar: "Veja se a impressora imprime página de teste sozinha",
          acao: "Visita ou remoto, conforme o modelo da impressora",
        },
        {
          sintoma: "Computador liga e funciona, mas está lento",
          causa: "Equipamento, com boa chance de ser software",
          verificar: "Observe se a lentidão é constante ou só em programas pesados",
          acao: "Começa remoto; vira bancada se aparecer sinal de disco falhando",
        },
        {
          sintoma: "Máquina desliga sozinha sob esforço",
          causa: "Equipamento: térmico ou alimentação",
          verificar: "Note se acontece sempre depois do mesmo tempo de uso",
          acao: "Bancada — precisa de desmontagem e teste sob carga",
        },
        {
          sintoma: "Não dá vídeo, mas liga",
          causa: "Equipamento: memória, vídeo ou tela",
          verificar: "Teste um monitor externo, se houver",
          acao: "Bancada, salvo quando o monitor externo funciona e o caso vira só tela",
        },
        {
          sintoma: "Preciso instalar e configurar equipamento novo",
          causa: "Ambiente: pontos de energia, rede, transferência de arquivos e contas",
          verificar: "Liste tudo que precisa migrar do equipamento antigo",
          acao: "Visita — é o cenário em que ela mais rende",
        },
      ],
    },
    blocos: [
      {
        id: "4c-domicilio-limites",
        titulo: "Limites honestos da visita técnica",
        intro:
          "Dizer o que a visita não faz é o que impede frustração. Estes são os limites que valem para qualquer atendimento no endereço.",
        itens: [
          {
            titulo: "Não substitui bancada",
            desc: "Desmontagem completa, troca de pasta térmica bem-feita e reparo de placa exigem estrutura fixa. Fazer isso na casa do cliente aumenta risco de dano e não é oferecido.",
          },
          {
            titulo: "Depende do ambiente encontrado",
            desc: "Se não houver acesso ao roteador, senha do sistema ou espaço para trabalhar, parte do escopo fica bloqueada. Vale conferir isso antes de marcar.",
          },
          {
            titulo: "Tempo é finito",
            desc: "Cada visita tem janela combinada. Quando surgem três problemas novos durante o atendimento, o realista é priorizar o que trava o seu trabalho e agendar o resto.",
          },
          {
            titulo: "Peça geralmente não está na mochila",
            desc: "Componentes variam muito por modelo. Quando a causa exige peça específica, a visita fecha o diagnóstico e o reparo acontece depois, com valor definido.",
          },
        ],
        fecho: {
          antes: "Quando o caso migra de modalidade, o passo seguinte costuma ser a ",
          to: "/assistencia-tecnica-curitiba",
          anchor: "avaliação em bancada com ordem de serviço",
          depois: ".",
        },
      },
      {
        id: "4c-domicilio-preparo",
        titulo: "Preparo que aumenta o rendimento da visita",
        itens: [
          {
            titulo: "Alguém que conheça o uso",
            desc: "Quem usa a máquina no dia a dia sabe descrever quando o problema aparece. Sem essa pessoa presente, o diagnóstico fica adivinhando.",
          },
          {
            titulo: "Contas e senhas à mão",
            desc: "E-mail principal, conta do sistema e login do provedor. Recuperar acesso perdido durante a visita consome mais tempo que o próprio serviço.",
          },
          {
            titulo: "Arquivos importantes identificados",
            desc: "Saber onde estão as pastas que não podem sumir permite priorizar a cópia logo no início, antes de qualquer intervenção.",
          },
          {
            titulo: "Lista escrita do que incomoda",
            desc: "Anotar os incômodos com antecedência evita o clássico \"ah, e tem mais uma coisa\" quando o técnico já está indo embora.",
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* OWNER 5 — cobertura e deslocamento                                  */
  /* ------------------------------------------------------------------ */
  "/areas-atendidas": {
    respostaRapida:
      "A área atendida se organiza por distância e por modalidade, não por lista fechada de bairros. Endereços próximos da base costumam ser atendidos sem custo adicional de deslocamento dentro do raio de referência; acima disso entra um valor por quilômetro excedente, informado antes da confirmação. Suporte remoto não tem limite geográfico, e a coleta de equipamento é combinada caso a caso. Nenhum custo aparece depois: se houver deslocamento a cobrar, você sabe antes de aceitar.",
    tabelaExtra: {
      titulo: "Como distância e modalidade entram no combinado",
      colunas: {
        sintoma: "Onde está o endereço",
        causa: "O que isso muda no atendimento",
        verificar: "O que informar no primeiro contato",
        acao: "Como o custo é tratado",
      },
      linhas: [
        {
          sintoma: "Dentro do raio de referência da base",
          causa: "Deslocamento curto, mais facilidade de encaixe em janelas do mesmo dia",
          verificar: "Bairro e ponto de referência",
          acao: "Sem adicional de deslocamento conforme a modalidade combinada",
        },
        {
          sintoma: "Acima do raio de referência",
          causa: "Tempo de trajeto entra na conta e reduz a flexibilidade de horário",
          verificar: "Endereço aproximado, para calcular a distância antes",
          acao: "Valor por quilômetro excedente, informado e aceito antes de agendar",
        },
        {
          sintoma: "Cidade da região metropolitana",
          causa: "Viável, mas com janela mais rígida e agendamento com antecedência",
          verificar: "Cidade, bairro e horários possíveis",
          acao: "Combinado caso a caso, incluindo a opção de coleta",
        },
        {
          sintoma: "Fora da região atendida",
          causa: "Visita presencial deixa de fazer sentido econômico",
          verificar: "Se o equipamento liga e tem internet",
          acao: "Atendimento remoto, sem custo de deslocamento",
        },
        {
          sintoma: "Endereço comercial com restrição de acesso",
          causa: "Portaria, crachá e horário liberado afetam a duração real do atendimento",
          verificar: "Regras de acesso e nome de quem autoriza a entrada",
          acao: "Janela reservada maior, sem alterar o valor do serviço",
        },
        {
          sintoma: "Vários endereços da mesma pessoa ou empresa",
          causa: "Roteiro conjunto aproveita melhor o deslocamento",
          verificar: "Quantos pontos e a distância entre eles",
          acao: "Deslocamento calculado para o roteiro, não por visita isolada",
        },
      ],
    },
    blocos: [
      {
        id: "4c-cobertura-modalidade",
        titulo: "A modalidade certa depende mais do problema que do endereço",
        intro:
          "Estar perto não significa que a visita é a melhor opção, e estar longe não significa ficar sem atendimento.",
        itens: [
          {
            titulo: "Remoto: sem fronteira",
            desc: "Se o equipamento liga e tem conexão estável, a distância deixa de existir. É a modalidade mais rápida para problema de sistema, configuração e programa.",
          },
          {
            titulo: "Visita: quando o ambiente é o problema",
            desc: "Rede, cabeamento, impressora, instalação e migração de equipamento novo só se resolvem onde as coisas estão fisicamente ligadas.",
          },
          {
            titulo: "Coleta: quando o equipamento precisa sair",
            desc: "Combinada quando o caso exige bancada. A retirada e a devolução fazem parte do combinado e são acertadas antes, não depois.",
          },
          {
            titulo: "Mista: mais comum do que parece",
            desc: "Muitos casos começam remoto, confirmam que a causa é física e seguem para coleta. O que já foi feito na primeira etapa não se perde.",
          },
        ],
        fecho: {
          antes: "Para saber o que a sessão à distância consegue cobrir, veja os limites do ",
          to: "/atendimento-remoto",
          anchor: "suporte remoto",
          depois: ".",
        },
      },
      {
        id: "4c-cobertura-transparencia",
        titulo: "Regras de transparência sobre deslocamento",
        itens: [
          {
            titulo: "Valor antes, nunca depois",
            desc: "Se houver quilometragem excedente a cobrar, o valor é informado antes da confirmação. Nada é acrescentado ao final do atendimento.",
          },
          {
            titulo: "Deslocamento não é diagnóstico",
            desc: "Ir até o endereço e avaliar são coisas distintas. Quando o caso não puder ser resolvido no local, você fica sabendo o que foi verificado e qual é o próximo passo.",
          },
          {
            titulo: "Reagendamento sem penalidade em caso justificado",
            desc: "Imprevisto acontece dos dois lados. O que evita atrito é avisar cedo para liberar a janela para outro chamado.",
          },
          {
            titulo: "Cobertura declarada é cobertura real",
            desc: "Esta página não lista cidade onde não há operação. Onde a visita não é viável, a resposta é remoto ou coleta — não uma promessa que não se cumpre.",
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* OWNER 6 — suporte remoto                                            */
  /* ------------------------------------------------------------------ */
  "/atendimento-remoto": {
    respostaRapida:
      "A sessão remota exige três condições simultâneas: o equipamento liga, o sistema carrega e a conexão se mantém estável. Faltando qualquer uma, não há como abrir a sessão e o caso passa para presencial. Dentro dessas condições, o remoto resolve bem tudo que é software: sistema, drivers, programas, e-mail, contas, navegador, impressora já conectada e orientação de uso. O que ele nunca resolve é defeito físico — e a sessão serve, nesse caso, para confirmar isso rápido e sem deslocamento.",
    tabelaExtra: {
      titulo: "O que a sessão remota alcança e onde ela para",
      colunas: {
        sintoma: "Pedido do cliente",
        causa: "Alcance da sessão",
        verificar: "Pré-requisito específico",
        acao: "Se não der certo",
      },
      linhas: [
        {
          sintoma: "Erro do Windows ao iniciar programa",
          causa: "Totalmente tratável à distância",
          verificar: "Sistema carrega até a área de trabalho",
          acao: "Se nem chega à área de trabalho, o caso é presencial",
        },
        {
          sintoma: "Impressora parou de imprimir",
          causa: "Tratável quando a impressora está ligada e acessível pela rede",
          verificar: "A impressora imprime página de teste pelo próprio painel",
          acao: "Falha mecânica ou de conexão física exige visita",
        },
        {
          sintoma: "Computador lento",
          causa: "Diagnóstico inicial completo e resolução quando a causa é software",
          verificar: "Conexão estável o bastante para não cair no meio de uma limpeza",
          acao: "Sinal de disco em degradação encerra o remoto e indica bancada",
        },
        {
          sintoma: "Suspeita de vírus ou anúncio invasivo",
          causa: "Tratável: inicialização, navegador, extensões e tarefas agendadas",
          verificar: "Você consegue acompanhar a sessão do início ao fim",
          acao: "Sistema comprometido a ponto de bloquear ferramentas exige reinstalação",
        },
        {
          sintoma: "Configurar e-mail, contas e backup em nuvem",
          causa: "Cenário ideal para remoto — nenhum ganho em ir até o endereço",
          verificar: "Ter em mãos as credenciais das contas envolvidas",
          acao: "Sem acesso às contas, a sessão fica bloqueada e precisa ser remarcada",
        },
        {
          sintoma: "Tela apagada, ruído estranho ou cheiro de queimado",
          causa: "Fora do alcance: é falha física",
          verificar: "Nada a testar remotamente",
          acao: "Desligue o equipamento e trate como caso de bancada",
        },
      ],
    },
    blocos: [
      {
        id: "4c-remoto-seguranca",
        titulo: "Segurança da sessão: o que é aceitável pedir e o que não é",
        intro:
          "Acesso remoto é seguro quando tem começo, fim e testemunha. Estas regras valem sempre.",
        itens: [
          {
            titulo: "Você acompanha a tela inteira",
            desc: "Sessão legítima acontece com você olhando. Nada é feito com a tela desligada ou fora do seu campo de visão.",
          },
          {
            titulo: "Senha do computador, no momento do uso",
            desc: "Quando o serviço exige a senha local, ela é digitada na hora. Enviar senha antes por mensagem não é necessário e não deve ser feito.",
          },
          {
            titulo: "Credencial de banco nunca entra",
            desc: "Nenhum atendimento técnico precisa de senha de banco, código de autenticação em duas etapas ou acesso a aplicativo financeiro. Pedido assim é golpe, venha de onde vier.",
          },
          {
            titulo: "O acesso termina com a sessão",
            desc: "Ao encerrar, a conexão cai e o programa pode ser removido na sua frente. Você deve saber exatamente o que ficou instalado.",
          },
        ],
        fecho: {
          antes: "Quando a sessão revela causa física, o encaminhamento correto é a ",
          to: "/assistencia-tecnica-curitiba",
          anchor: "avaliação em bancada",
          depois: ", com o diagnóstico remoto já adiantado.",
        },
      },
      {
        id: "4c-remoto-preparo",
        titulo: "Como chegar preparado para a sessão",
        itens: [
          {
            titulo: "Conexão por cabo, se possível",
            desc: "Wi-Fi fraco derruba a sessão no meio de uma atualização, que é justamente o pior momento. Cabo evita reinício de todo o procedimento.",
          },
          {
            titulo: "Feche o que for confidencial",
            desc: "Documentos abertos, conversas e pastas pessoais aparecem na tela compartilhada. Fechar antes é a forma mais simples de preservar privacidade.",
          },
          {
            titulo: "Reserve tempo contínuo",
            desc: "Atualizações e reinicializações fazem parte. Sessão interrompida pela metade costuma deixar o sistema em estado pior que o inicial.",
          },
          {
            titulo: "Deixe o notebook na tomada",
            desc: "Bateria acabando no meio de uma reinstalação é causa evitável de problema. Energia ligada é pré-requisito prático.",
          },
        ],
        fecho: {
          antes: "Se o equipamento nem liga, o remoto está descartado — comece por entender a ",
          to: "/atendimento-domicilio",
          anchor: "avaliação no seu endereço",
          depois: ".",
        },
      },
    ],
  },
};

/** Owners da Rodada 4C, na ordem de publicação. */
export const OWNERS_4C = Object.keys(ENRIQUECIMENTO_4C);

export const enriquecimento4c = (path: string): EnriquecimentoConteudo | undefined =>
  ENRIQUECIMENTO_4C[path];
