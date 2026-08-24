/**
 * Micro-Rodada Enriquecimento 2 — profundidade técnica das páginas de
 * SERVIÇO já existentes.
 *
 * Regras desta rodada:
 *  - nenhuma URL nova, nenhuma mudança de canonical, robots ou indexabilidade;
 *  - cada página mantém o owner de intenção que já possuía;
 *  - nada aqui é template: títulos, tabelas e blocos são próprios de cada
 *    serviço e refletem a realidade técnica daquele procedimento;
 *  - nenhum preço novo é inventado — quando o valor aparece, vem da fonte
 *    única do projeto (precosConfig / siteConfig) e nunca é fechado aqui.
 *
 * A chave é o slug da página (`/servicos/<slug>`).
 */
import type { EnriquecimentoConteudo } from "./enriquecimento";

export const ENRIQUECIMENTO_SERVICOS: Record<string, EnriquecimentoConteudo> = {
  /* ------------------------------------------------------------------ */
  /* FORMATAÇÃO — owner: contratação/entendimento de reinstalação        */
  /* ------------------------------------------------------------------ */
  formatacao: {
    respostaRapida:
      "Formatar é reinstalar o sistema do zero. Resolve o que é software: Windows corrompido, atualização malsucedida, perfil quebrado, infecção persistente. Não corrige disco com setor defeituoso, memória com erro, superaquecimento nem fonte instável — nesses casos a máquina volta a falhar dias depois. Antes de formatar, o passo correto é separar falha de software de falha de hardware e garantir a cópia dos arquivos.",
    tabelaDiagnostica: {
      titulo: "Sintoma × a formatação ajuda?",
      linhas: [
        {
          sintoma: "Windows não inicia, trava no logo ou entra em reparo automático",
          causa: "Sistema de arquivos ou boot corrompido",
          verificar: "Se o disco é lido pela BIOS e se o SMART está limpo — disco falhando muda a prioridade para preservar dados",
        },
        {
          sintoma: "Computador lento em tudo, mesmo recém-ligado",
          causa: "Pode ser software acumulado, mas também HD mecânico, RAM insuficiente ou temperatura",
          verificar: "Tipo de armazenamento, memória total, temperatura em uso e tempo de resposta do disco",
        },
        {
          sintoma: "Pop-ups e página inicial que voltam sempre",
          causa: "Adware, extensão maliciosa ou tarefa agendada persistente",
          verificar: "Se a remoção dirigida resolve; formatar é o caminho quando o comprometimento é amplo",
        },
        {
          sintoma: "Erros aleatórios, telas azuis e travamentos sem padrão",
          causa: "Frequentemente memória, alimentação ou driver — não sistema",
          verificar: "Teste de memória, análise dos códigos de parada e comportamento com drivers limpos",
        },
        {
          sintoma: "Máquina será vendida, repassada ou trocará de usuário",
          causa: "Necessidade de sistema limpo e remoção de dados pessoais",
          verificar: "Contas conectadas, licenças próprias e o que precisa ser exportado antes",
        },
      ],
    },
    blocos: [
      {
        id: "antes-de-formatar",
        titulo: "O que conferir antes de autorizar a formatação",
        intro:
          "Esta lista existe porque quase todo prejuízo em formatação vem de algo não verificado antes, não do procedimento em si.",
        itens: [
          { titulo: "Onde estão os arquivos", desc: "Documentos, área de trabalho, downloads, fotos e pastas de programas de trabalho. O que estiver só na máquina precisa de cópia conferida antes." },
          { titulo: "Contas e senhas", desc: "E-mail, gerenciador de senhas e navegadores. Senha salva no navegador some com o perfil se não houver sincronização ativa." },
          { titulo: "Licenças próprias", desc: "Programas comprados à parte precisam de chave e instalador. Licença de fábrica do Windows costuma reativar sozinha pela chave gravada na placa." },
          { titulo: "Criptografia do disco", desc: "Se o BitLocker estiver ativo, a chave de recuperação precisa estar acessível — sem ela, o conteúdo não é lido nem em bancada." },
          { titulo: "Programas específicos", desc: "Sistemas de emissão fiscal, ponto, certificados digitais e periféricos exigem reconfiguração, não apenas reinstalação." },
        ],
      },
      {
        id: "formatar-x-restaurar",
        titulo: "Formatação, restauração de fábrica e reset: o que muda",
        itens: [
          { titulo: "Instalação limpa", desc: "Apaga a partição do sistema e recria tudo. É o caminho quando houve corrupção ampla ou infecção persistente." },
          { titulo: "Restauração do fabricante", desc: "Devolve o estado de fábrica, com o conjunto original de programas. Nem sempre resolve o problema que motivou o atendimento." },
          { titulo: "Redefinir mantendo arquivos", desc: "Reinstala o sistema preservando dados pessoais. Ajuda em corrupção leve e falha depois de infecção profunda." },
          { titulo: "Só reparar", desc: "Quando a falha é pontual — driver, atualização, componente do sistema — reparar é mais rápido e sem perda de configuração." },
        ],
      },
      {
        id: "expectativa-formatacao",
        titulo: "O que esperar depois — e o que não muda",
        itens: [
          { titulo: "Melhora previsível", desc: "Inicialização sem serviços acumulados, sistema íntegro, drivers corretos e comportamento consistente." },
          { titulo: "Não muda", desc: "Capacidade do processador, quantidade de memória e limite físico do disco continuam iguais depois de reinstalar." },
          { titulo: "Prazo", desc: "Depende do volume de dados a copiar e restaurar, do estado do disco e dos programas específicos a reconfigurar — não de uma promessa fixa." },
          { titulo: "Garantia", desc: "Cobre o serviço executado, conforme a página de preços e políticas. Não cobre nova infecção ou alterações feitas depois da entrega." },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* REMOÇÃO DE VÍRUS — owner: limpeza e segurança do sistema            */
  /* ------------------------------------------------------------------ */
  "remocao-de-virus": {
    respostaRapida:
      "Nem todo incômodo é vírus: boa parte dos casos é adware, extensão de navegador ou programa indesejado instalado junto com outro. A remoção dirigida resolve esses cenários preservando o sistema. Quando há comprometimento amplo, credencial vazada ou arquivos cifrados, remover a ameaça não é suficiente — é preciso tratar contas e dados. Nenhum serviço honesto promete 'computador 100% livre de vírus'.",
    tabelaDiagnostica: {
      titulo: "Que tipo de ameaça é a sua",
      linhas: [
        {
          sintoma: "Anúncios fora do navegador, abas abrindo sozinhas",
          causa: "Adware ou extensão maliciosa instalada com outro programa",
          verificar: "Extensões ativas, atalhos alterados, tarefas agendadas e programas instalados nos últimos dias",
        },
        {
          sintoma: "Barra de busca trocada, página inicial que volta sempre",
          causa: "Sequestro de navegador (PUP) com política aplicada ao perfil",
          verificar: "Políticas do navegador, perfis sincronizados e atalhos com parâmetro extra na linha de comando",
        },
        {
          sintoma: "Máquina lenta com uso alto de CPU ou rede em repouso",
          causa: "Minerador, bot ou processo indesejado em segundo plano",
          verificar: "Processos com consumo constante, conexões de saída e itens de inicialização",
        },
        {
          sintoma: "Arquivos renomeados e bilhete pedindo pagamento",
          causa: "Ransomware — arquivos cifrados, não apagados",
          verificar: "Isolar o equipamento da rede imediatamente e preservar as cópias cifradas antes de qualquer tentativa",
        },
        {
          sintoma: "Contas acessadas por terceiros, avisos de login estranho",
          causa: "Credenciais vazadas — o problema saiu do computador",
          verificar: "Trocar senhas de outro dispositivo confiável e ativar verificação em duas etapas",
        },
      ],
    },
    blocos: [
      {
        id: "limites-remocao",
        titulo: "O que a remoção resolve e o que ela não resolve",
        itens: [
          { titulo: "Resolve", desc: "Adware, sequestro de navegador, programas indesejados, itens de inicialização e tarefas agendadas maliciosas." },
          { titulo: "Resolve parcialmente", desc: "Infecção antiga e ampla: é possível limpar, mas quando componentes do sistema já foram alterados a reinstalação dá um resultado mais confiável." },
          { titulo: "Não resolve", desc: "Arquivos já cifrados por ransomware, senhas que já vazaram e cobranças feitas em contas comprometidas." },
          { titulo: "Não substitui", desc: "Backup. Sem cópia externa, qualquer incidente sério vira perda de dados independentemente da limpeza." },
        ],
      },
      {
        id: "depois-da-limpeza",
        titulo: "O que fazer depois que a máquina volta limpa",
        intro:
          "Recomendações públicas de segurança (CISA e Microsoft) convergem no mesmo ponto: limpar o equipamento sem tratar contas deixa a porta aberta.",
        itens: [
          { titulo: "Trocar senhas críticas", desc: "E-mail principal primeiro — é ele que recupera todas as outras contas." },
          { titulo: "Ativar verificação em duas etapas", desc: "Reduz o impacto de uma senha já vazada, que a limpeza não desfaz." },
          { titulo: "Revisar sessões ativas", desc: "Encerrar dispositivos conectados em e-mail, banco e redes sociais." },
          { titulo: "Manter atualização automática", desc: "Boa parte das infecções aproveita falha já corrigida por atualização pendente." },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* RECUPERAÇÃO DE DADOS — owner: preservação/recuperação               */
  /* ------------------------------------------------------------------ */
  "recuperacao-de-dados": {
    respostaRapida:
      "Recuperação de dados não tem resultado garantido — quem garante antes de abrir o caso está vendendo expectativa. O que define a chance é a causa (exclusão lógica, corrupção de estrutura ou falha física) e, sobretudo, o que foi feito depois da perda. Continuar usando a unidade é o que mais destrói dado recuperável. Em falha física, a decisão certa é desligar e não tentar programas em casa.",
    tabelaDiagnostica: {
      titulo: "Situação × primeiro passo correto",
      linhas: [
        {
          sintoma: "Apagou por engano, unidade funciona normalmente",
          causa: "Exclusão lógica — o conteúdo continua gravado até ser sobrescrito",
          verificar: "Parar de usar a unidade; não instalar nenhum programa de recuperação nela",
        },
        {
          sintoma: "Formatou ou reinstalou e percebeu depois",
          causa: "Estrutura recriada; parte pode já ter sido sobrescrita pelo sistema novo",
          verificar: "Quanto tempo a máquina ficou em uso depois — é isso que define o que sobrou",
        },
        {
          sintoma: "Disco clicando, girando e parando, não é reconhecido",
          causa: "Falha mecânica em HD",
          verificar: "Desligar imediatamente. Cada nova tentativa de ligar pode agravar o dano na superfície",
        },
        {
          sintoma: "SSD sumiu da BIOS de uma vez, sem aviso",
          causa: "Falha de controladora ou de firmware",
          verificar: "Não formatar e não rodar reparo automático; a leitura precisa ser feita em ambiente controlado",
        },
        {
          sintoma: "Pen drive/cartão pede formatação ao conectar",
          causa: "Tabela de arquivos corrompida, conteúdo geralmente intacto",
          verificar: "Recusar a formatação sugerida e testar em outro computador antes de qualquer ação",
        },
      ],
    },
    blocos: [
      {
        id: "pare-agora",
        titulo: "Sinais em que a orientação é parar imediatamente",
        intro: "Nestes casos, continuar tentando em casa costuma custar mais do que o próprio serviço.",
        itens: [
          { titulo: "Ruído mecânico", desc: "Cliques repetidos ou zumbido no HD indicam contato físico com a superfície — cada ligamento reduz o que é legível." },
          { titulo: "Cheiro de queimado ou contato com líquido", desc: "Alimentar a placa nessa condição pode transformar falha recuperável em perda definitiva." },
          { titulo: "Reparo automático em laço", desc: "Ferramentas de correção reescrevem estrutura e podem apagar o mapa do que ainda existia." },
          { titulo: "Arquivos cifrados", desc: "Em ransomware, preservar as cópias cifradas e isolar a máquina vem antes de qualquer tentativa de conserto." },
        ],
      },
      {
        id: "expectativa-dados",
        titulo: "Como o caso é conduzido e o que é possível prometer",
        itens: [
          { titulo: "Avaliação primeiro", desc: "Identificação do tipo de falha e verificação se a unidade sustenta leitura. Só depois se discute escopo e valor." },
          { titulo: "Leitura, nunca gravação", desc: "O trabalho é feito sobre imagem/cópia sempre que a unidade permite, para não alterar o original." },
          { titulo: "Resultado parcial é resultado comum", desc: "É frequente recuperar parte dos arquivos, com nomes ou estrutura de pastas perdidos. Isso não é falha do procedimento." },
          { titulo: "Sem garantia de sucesso", desc: "O que se garante é o método e a transparência do que foi encontrado — não a devolução integral dos dados." },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* MANUTENÇÃO DE COMPUTADOR — owner: manutenção preventiva/corretiva   */
  /* ------------------------------------------------------------------ */
  "manutencao-de-computador": {
    respostaRapida:
      "Manutenção de desktop cobre limpeza interna, revisão de ventilação, troca de pasta térmica, checagem de armazenamento, memória e alimentação. Ela reduz problemas causados por temperatura e poeira, mas não repara defeito elétrico de placa-mãe, não substitui ventoinha danificada e não compensa hardware insuficiente para o uso atual.",
    tabelaDiagnostica: {
      titulo: "Sintoma × a manutenção é o caminho?",
      linhas: [
        {
          sintoma: "Desliga sozinho sob esforço",
          causa: "Temperatura alta, ventilação obstruída ou fonte no limite",
          verificar: "Temperatura em carga, giro das ventoinhas, estado da pasta térmica e capacidade real da fonte",
        },
        {
          sintoma: "Barulho alto e constante",
          causa: "Poeira acumulada ou rolamento da ventoinha gasto",
          verificar: "Se o ruído some após limpeza; ventoinha gasta exige substituição, não limpeza",
        },
        {
          sintoma: "Travamentos e telas azuis",
          causa: "Memória, alimentação ou disco falhando",
          verificar: "Teste de memória, leitura de SMART e códigos de parada registrados",
        },
        {
          sintoma: "Lento em tudo, sem esquentar",
          causa: "Armazenamento mecânico ou memória insuficiente",
          verificar: "Tempo de resposta do disco e uso de memória em rotina normal",
        },
        {
          sintoma: "Não liga, sem imagem e sem sinal de POST",
          causa: "Fonte, placa-mãe ou alimentação — fora do escopo de manutenção preventiva",
          verificar: "Diagnóstico elétrico antes de qualquer limpeza",
        },
      ],
    },
    blocos: [
      {
        id: "preventiva-x-corretiva",
        titulo: "Preventiva e corretiva não são a mesma coisa",
        itens: [
          { titulo: "Preventiva", desc: "Feita com a máquina funcionando: limpeza, pasta térmica, revisão de fluxo de ar, atualização e verificação de saúde do disco." },
          { titulo: "Corretiva", desc: "Parte de uma falha existente. Começa por diagnóstico e só depois define a intervenção — que pode não ser limpeza." },
          { titulo: "Periodicidade", desc: "Depende do ambiente: máquina em local com poeira, pet ou pouca circulação de ar exige revisão mais frequente que um escritório fechado." },
          { titulo: "Peça é à parte", desc: "Ventoinha, fonte, pasta de melhor grau e componentes substituídos são material, não mão de obra, e são informados antes." },
        ],
      },
      {
        id: "residencial-empresa-desktop",
        titulo: "Desktop em casa e desktop em empresa exigem decisões diferentes",
        itens: [
          { titulo: "Em casa", desc: "Um equipamento, dados pessoais e a decisão gira em torno de custo-benefício do conserto contra a idade da máquina." },
          { titulo: "Na empresa", desc: "O critério é parada de operação: interessa reduzir risco de indisponibilidade e padronizar o parque, não só consertar a unidade." },
          { titulo: "Janela de atendimento", desc: "Em ambiente comercial, o horário de intervenção pesa tanto quanto o reparo." },
          { titulo: "Dados", desc: "Em ambos os casos a cópia vem antes de qualquer intervenção que envolva armazenamento." },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* MANUTENÇÃO DE NOTEBOOK — owner: manutenção de portáteis             */
  /* ------------------------------------------------------------------ */
  "manutencao-de-notebook": {
    respostaRapida:
      "Notebook não é desktop pequeno: dissipação apertada, bateria, dobradiça e conector de energia criam falhas que o desktop não tem. Limpeza e pasta térmica resolvem desligamento por temperatura e ruído por poeira, mas não corrigem dobradiça trincada, carcaça rompida, conector arrancado nem bateria estufada — esses casos são reparo com peça.",
    tabelaDiagnostica: {
      titulo: "Sintoma típico de portátil × o que verificar",
      linhas: [
        {
          sintoma: "Esquenta muito e desliga em tarefas pesadas",
          causa: "Saída de ar obstruída, pasta térmica ressecada, ventoinha suja",
          verificar: "Temperatura em carga, fluxo de ar real e apoio do notebook na superfície de uso",
        },
        {
          sintoma: "Só liga na tomada / carrega às vezes",
          causa: "Bateria no fim de vida ou conector de energia com mau contato",
          verificar: "Ciclos e saúde da bateria, folga do conector e integridade da fonte",
        },
        {
          sintoma: "Tampa frouxa, carcaça abrindo perto da tela",
          causa: "Dobradiça forçando o plástico — dano progressivo",
          verificar: "Parar de abrir e fechar até a avaliação; o rompimento costuma piorar rápido",
        },
        {
          sintoma: "Bateria inchada, touchpad estufado",
          causa: "Bateria comprometida — risco físico",
          verificar: "Desligar, desconectar da tomada e não continuar usando",
        },
        {
          sintoma: "Teclas falhando após líquido",
          causa: "Oxidação em curso",
          verificar: "Não ligar para 'testar'; ligar acelera a corrosão dos contatos",
        },
      ],
    },
    blocos: [
      {
        id: "limites-notebook",
        titulo: "O que a manutenção resolve e o que exige peça",
        itens: [
          { titulo: "Resolve com serviço", desc: "Poeira no dissipador, pasta térmica ressecada, sistema desorganizado, ventilação comprometida." },
          { titulo: "Exige peça", desc: "Bateria no fim de vida, ventoinha com rolamento gasto, dobradiça, conector de energia e teclado danificado." },
          { titulo: "Depende de avaliação", desc: "Falha intermitente de vídeo, oxidação e tela com defeito — o diagnóstico define se compensa reparar." },
          { titulo: "Não resolve", desc: "Falta de memória ou armazenamento lento para o uso atual: esse é caso de upgrade, não de manutenção." },
        ],
      },
      {
        id: "cuidados-notebook",
        titulo: "Hábitos que mudam a vida útil do portátil",
        intro: "São recomendações simples, mas são as que mais aparecem nos atendimentos que poderiam ter sido evitados.",
        itens: [
          { titulo: "Base rígida", desc: "Usar sobre cama, sofá ou almofada bloqueia a entrada de ar e leva ao desligamento por temperatura." },
          { titulo: "Cabo sem tensão", desc: "Puxar o carregador de lado é a origem mais comum de conector de energia danificado." },
          { titulo: "Abrir pelo centro", desc: "Abrir pelo canto concentra esforço na dobradiça e trinca a carcaça com o tempo." },
          { titulo: "Transporte desligado", desc: "Fechar em suspensão dentro da mochila mantém o equipamento aquecido sem ventilação." },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* PC GAMER — owner: desempenho/manutenção de máquinas de jogo         */
  /* ------------------------------------------------------------------ */
  "pc-gamer": {
    respostaRapida:
      "Queda de FPS quase nunca tem uma causa só. Antes de trocar peça, é preciso separar limitação térmica, gargalo entre processador e placa de vídeo, memória insuficiente, armazenamento lento e configuração do jogo. Manutenção resolve o que é temperatura e sujeira; ela não transforma uma placa de vídeo de entrada em placa de topo.",
    tabelaDiagnostica: {
      titulo: "Queda de desempenho × causa provável",
      linhas: [
        {
          sintoma: "FPS cai depois de alguns minutos de jogo",
          causa: "Limitação térmica (throttling) em CPU ou GPU",
          verificar: "Temperatura ao longo da sessão, fluxo de ar do gabinete e estado da pasta térmica",
        },
        {
          sintoma: "Travadas curtas com FPS médio alto",
          causa: "Gargalo de armazenamento ou memória, não de placa de vídeo",
          verificar: "Uso de memória durante a partida e se o jogo está em disco mecânico",
        },
        {
          sintoma: "Placa de vídeo em uso baixo e processador no máximo",
          causa: "Gargalo de CPU para aquele título ou resolução",
          verificar: "Uso simultâneo de CPU e GPU na mesma cena, antes de cogitar troca de peça",
        },
        {
          sintoma: "Desliga em cena pesada",
          causa: "Fonte no limite ou proteção térmica",
          verificar: "Capacidade real da fonte, conectores usados e temperatura no momento do desligamento",
        },
        {
          sintoma: "Artefatos na imagem, riscos e cores erradas",
          causa: "Falha em curso na placa de vídeo ou memória de vídeo",
          verificar: "Reprodução do defeito fora do jogo e comportamento com outra saída de vídeo",
        },
      ],
    },
    blocos: [
      {
        id: "onde-investir",
        titulo: "Onde o investimento costuma render mais",
        intro: "A ordem depende do diagnóstico. Estes são os padrões mais comuns na bancada, não uma regra universal.",
        itens: [
          { titulo: "Jogo em disco mecânico", desc: "Migrar para SSD altera carregamento e travadas de streaming de textura — não o FPS máximo." },
          { titulo: "Memória no limite", desc: "Quando a memória satura em partida, ampliar tende a render mais que trocar a placa de vídeo." },
          { titulo: "Temperatura alta", desc: "Limpeza, pasta térmica e fluxo de ar recuperam desempenho que o equipamento já tinha e perdeu." },
          { titulo: "Placa de vídeo", desc: "Faz diferença quando ela é realmente o componente saturado — e isso se comprova medindo, não presumindo." },
        ],
      },
      {
        id: "expectativa-gamer",
        titulo: "Resultado realista",
        itens: [
          { titulo: "O que costuma melhorar", desc: "Estabilidade de FPS, ruído, temperatura e tempo de carregamento." },
          { titulo: "O que não muda sozinho", desc: "Limite arquitetural do hardware atual e exigência crescente dos títulos novos." },
          { titulo: "Overclock", desc: "Não é aplicado como 'ganho fácil': depende de refrigeração, fonte e estabilidade comprovada em teste." },
          { titulo: "Peça é à parte", desc: "Componentes substituídos são material e entram no orçamento separados da mão de obra." },
        ],
      },
    ],
  },
};
