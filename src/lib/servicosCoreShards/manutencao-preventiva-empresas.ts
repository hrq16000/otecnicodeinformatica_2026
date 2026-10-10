// Extraído do catálogo de serviços para carregar somente os dados desta rota.
// Manter em paridade editorial com SERVICOS_CORE["manutencao-preventiva-empresas"].
import type { ServicoLandingData } from "@/components/servico/ServicoLandingLayout";
import { PROCESSOS } from "@/lib/servicosProcessos";

const data: ServicoLandingData = {
    path: "manutencao-preventiva-empresas",
    trackingKey: "manutencao-preventiva-empresas",
    metaTitle: "Manutenção Preventiva de Computadores em Curitiba | Empresas",
    metaDescription:
      "Manutenção preventiva de computadores para empresas em Curitiba: inventário, inspeção, armazenamento, atualizações e relatório de riscos priorizado.",
    serviceName: "Manutenção Preventiva de Computadores para Empresas",
    serviceDescription:
      "Rotina planejada de inspeção, limpeza quando indicada, verificação de armazenamento, memória, atualizações e riscos das estações de trabalho de empresas em Curitiba e região.",
    eyebrow: "Empresas em Curitiba",
    h1: "Manutenção preventiva de computadores para empresas",
    h1Accent: "menos paradas, decisões planejadas",
    intro:
      "Máquina que trava no meio do expediente raramente falha do nada: quase sempre houve disco no limite, memória insuficiente, temperatura alta ou atualização pendente por meses. A manutenção preventiva empresarial organiza essa rotina — inventário das estações, inspeção, verificação de armazenamento e refrigeração, atualizações e um relatório com prioridades. Ela reduz riscos previsíveis, mas não elimina falhas inesperadas nem substitui backup, segurança e renovação de equipamentos. Descreva o ambiente pela triagem para avaliarmos o escopo.",
    whatsappMessage: "Olá! Quero avaliar manutenção preventiva dos computadores da minha empresa em Curitiba.",
    incluso: [
      { title: "Inventário básico", desc: "Registro das estações: modelo, configuração, idade estimada e uso principal de cada máquina." },
      { title: "Inspeção do equipamento", desc: "Verificação física e funcional: ruídos, ventilação, conectores, fonte, cabos e sinais de desgaste." },
      { title: "Armazenamento e espaço livre", desc: "Leitura da saúde de HD e SSD dentro das ferramentas disponíveis e checagem do espaço disponível." },
      { title: "Memória e desempenho", desc: "Avaliação do consumo real de memória e do que trava a rotina do usuário durante o expediente." },
      { title: "Limpeza quando indicada", desc: "Limpeza interna e reaplicação de pasta térmica apenas nos equipamentos em que a inspeção justificar." },
      { title: "Sistema e atualizações", desc: "Estado do Windows, atualizações pendentes, inicialização e programas desnecessários acumulados." },
      { title: "Conferência do backup existente", desc: "Verificação de qual cópia existe hoje, onde está e se alguém já testou uma restauração." },
      { title: "Relatório com prioridades", desc: "Lista de riscos encontrados, ordenada por urgência, com recomendação clara para cada item." },
    ],
    sinais: [
      "Estações travando ou reiniciando durante o expediente",
      "Computadores com disco quase cheio e sistema lento",
      "Equipamentos esquentando, com ventoinha barulhenta ou desligando sozinhos",
      "Windows sem atualização há muitos meses",
      "Máquinas com HD mecânico antigo em uso diário",
      "Ninguém sabe quantos computadores existem nem qual a configuração de cada um",
      "Backup que ninguém conferiu ou restaurou desde que foi criado",
      "Falhas que sempre voltam no mesmo equipamento",
    ],
    processo: PROCESSOS["manutencao-preventiva-empresas"],
    fatoresValor: [
      { title: "Quantidade de estações", desc: "Número de computadores inspecionados e usuários envolvidos no atendimento." },
      { title: "Condição atual dos equipamentos", desc: "Máquinas sem manutenção há anos exigem mais tempo do que um parque já organizado." },
      { title: "Escopo escolhido", desc: "Somente inspeção e relatório, ou inspeção com limpeza, ajustes e correções aplicadas." },
      { title: "Janela de atendimento", desc: "Realizar em horário de menor movimento pode exigir agendamento específico, conforme disponibilidade." },
      { title: "Deslocamento", desc: "Atendimento presencial considera a localização em Curitiba e região metropolitana." },
      { title: "Recorrência", desc: "Rotina periódica combinada altera o planejamento em relação a um atendimento avulso." },
    ],
    atendimento: {
      residencial:
        "Profissionais liberais e home office que dependem de um único computador também usam a rotina preventiva, em escala menor: inspeção, armazenamento, temperatura e conferência do backup.",
      empresarial:
        "Escritórios, comércios e pequenas empresas de Curitiba e região: inventário das estações, inspeção, ajustes e relatório de riscos, em atendimento avulso ou recorrente conforme o escopo definido.",
    },
    faqs: [
      { question: "Com que frequência a manutenção deve ser feita?", answer: "Depende do ambiente. Escritório limpo e com máquinas novas costuma trabalhar bem com revisões semestrais; ambiente com poeira, uso pesado ou equipamentos antigos pede intervalos mais curtos. A frequência é definida após a primeira inspeção, não por regra fixa." },
      { question: "A manutenção preventiva evita todos os defeitos?", answer: "Não. Ela reduz riscos previsíveis — disco no limite, superaquecimento, atualização pendente, desgaste visível — mas não elimina falhas inesperadas nem substitui backup, segurança e renovação de equipamentos. Componente eletrônico pode falhar sem aviso." },
      { question: "O serviço pode ser feito fora do horário comercial?", answer: "Pode ser agendado fora do horário de maior movimento conforme a disponibilidade da agenda. Não mantemos plantão nem equipe em turno noturno, então esse formato é combinado caso a caso antes da execução." },
      { question: "É necessário parar todos os computadores?", answer: "Não. Trabalhamos por lotes, começando pelas máquinas menos críticas, para que a operação continue. Cada equipamento fica indisponível apenas durante a própria inspeção." },
      { question: "Limpeza está sempre incluída?", answer: "Não. A limpeza interna é executada quando a inspeção indica necessidade — poeira acumulada, temperatura alta, ventoinha ruidosa. Abrir equipamento sem motivo não melhora nada e ainda gera risco desnecessário." },
      { question: "As peças trocadas durante a preventiva estão incluídas?", answer: "Não. Memória, SSD, fonte, ventoinha e demais componentes são tratados à parte. Quando a inspeção indica troca, informamos o motivo e o custo antes, e nada é substituído sem a sua autorização." },
      { question: "É fornecido relatório?", answer: "Sim. Entregamos a lista dos equipamentos inspecionados com os riscos encontrados e as recomendações em ordem de prioridade, para que a empresa decida o que fazer agora e o que pode esperar." },
      { question: "Pode ser feita em atendimento recorrente?", answer: "Sim. O acompanhamento periódico é definido na contratação, com escopo e intervalo combinados. Não trabalhamos com contrato de suporte ilimitado nem com prazos de resposta garantidos fora do que foi acordado." },
      { question: "A manutenção preventiva melhora o desempenho?", answer: "Melhora quando o problema é software acumulado, disco cheio ou superaquecimento. Quando a limitação é hardware — HD mecânico, memória insuficiente, processador antigo — o ganho real vem de upgrade, e explicamos isso no relatório em vez de prometer resultado." },
      { question: "Vocês cuidam do backup durante a preventiva?", answer: "Conferimos o que existe hoje e apontamos as falhas do processo. Estruturar cópias, definir retenção e testar restauração é escopo da página de backup para empresas, contratado à parte." },
    ],
    relacionados: [
      { label: "Suporte técnico empresarial", to: "/servicos/suporte-tecnico-empresarial" },
      { label: "Backup para empresas", to: "/servicos/backup-para-empresas" },
      { label: "Redes e Wi-Fi", to: "/servicos/redes-e-wifi" },
      { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
      { label: "Upgrade de SSD e RAM", to: "/servicos/upgrade-ssd-ram" },
      { label: "Empresa de TI em Curitiba", to: "/empresa-de-ti-curitiba" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
    ],
    blocoLocal: [
      {
        titulo: "Por que preventiva empresarial não é a mesma coisa que consertar quando quebra",
        paragrafos: [
          "Reparo é reativo: alguém abre chamado porque a máquina parou, o técnico diagnostica e resolve aquele equipamento. Preventiva é planejada: olhamos o conjunto antes de qualquer falha, procurando os sinais que antecedem parada — disco chegando ao limite, temperatura fora do normal, atualização travada, memória insuficiente para o que o usuário realmente executa.",
          "A diferença aparece no custo da interrupção. Um HD que falha no meio do fechamento do mês para o setor inteiro e ainda coloca arquivos em risco. O mesmo disco, identificado com antecedência pela leitura de saúde, vira uma troca agendada em horário combinado, com dados migrados sem correria.",
          "Por isso a preventiva não substitui a manutenção corretiva de um equipamento específico, e a página de manutenção de computador continua sendo o caminho quando a máquina já apresenta defeito. Uma organiza a rotina; a outra resolve o problema que já existe.",
        ],
      },
      {
        titulo: "O que o inventário e o relatório entregam na prática",
        paragrafos: [
          "O inventário é o começo de tudo e costuma ser o que a empresa mais sente falta: quantas máquinas existem, qual a configuração de cada uma, quem usa, há quanto tempo estão em serviço e quais ainda rodam HD mecânico. Sem esse mapa, toda decisão de investimento vira palpite e toda compra de emergência sai mais cara.",
          "Com o inventário em mãos, a inspeção ganha objetivo. Verificamos espaço livre e saúde do armazenamento dentro do que as ferramentas disponíveis conseguem ler, consumo de memória no uso real, temperatura e ventilação, estado da inicialização, programas acumulados que ninguém usa mais e atualizações pendentes do sistema.",
          "O resultado vira um relatório curto e priorizado: o que representa risco imediato de parada ou de perda de arquivo, o que deve ser resolvido nos próximos meses e o que apenas merece acompanhamento. Nada de lista genérica — cada item cita o equipamento e o motivo técnico.",
          "Esse documento é também a base da conversa sobre renovação. Quando o custo de manter uma máquina antiga se aproxima do valor de substituí-la, dizemos com clareza, incluindo o cenário de migração dos dados e dos programas de trabalho.",
        ],
      },
      {
        titulo: "Limites honestos da manutenção preventiva",
        paragrafos: [
          "Manutenção preventiva reduz riscos, mas não elimina falhas inesperadas nem substitui backup, segurança e renovação de equipamentos. Fonte, placa, memória e disco podem falhar sem qualquer sinal anterior, e nenhuma inspeção prevê queda de energia, dano por líquido ou erro de usuário.",
          "Também não prometemos ganho garantido de desempenho, vida útil específica para nenhum componente nem prevenção de todos os incidentes. O que entregamos é redução de causa previsível e informação suficiente para a empresa decidir com antecedência.",
          "Ficam fora do escopo: administração de servidores e ambientes que não conseguimos suportar, licenciamento de softwares corporativos, monitoramento contínuo sem contratação específica e atendimento em regime ininterrupto. Quando a demanda passa da nossa capacidade operacional, dizemos isso na avaliação em vez de aceitar o serviço.",
        ],
      },
    ],
    linksLocais: [
      { label: "Empresa de TI em Curitiba", to: "/empresa-de-ti-curitiba" },
      { label: "Atendimento técnico em Curitiba", to: "/tecnico-informatica-curitiba" },
      { label: "Atendimento remoto", to: "/atendimento-remoto" },
      { label: "Como funciona o atendimento", to: "/como-funciona" },
    ],
    dateModified: "2026-08-06",
  };

export default data;
