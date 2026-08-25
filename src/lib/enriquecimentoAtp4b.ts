/**
 * Rodada 4B — ATP: "não liga", "liga sem imagem", "lento/travando", backup,
 * Windows 10 × 11 e formatação, usando EXCLUSIVAMENTE URLs já existentes.
 *
 * Regras desta rodada (idênticas às da 4A):
 *  - nenhuma URL nova, nenhum artigo novo, nenhum bairro novo;
 *  - canonical, robots e indexabilidade permanecem exatamente como estavam;
 *  - um owner por intenção — cluster sem owner adequado vira GAP_NO_OWNER no
 *    relatório e nada é inventado;
 *  - owners congelados da 4A (/problemas/computador-esquentando, /solucoes/ssd,
 *    /servicos/upgrade-ssd-ram, /problemas/hd-fazendo-barulho,
 *    /servicos/formatacao, /servicos/remocao-de-virus) NÃO aparecem aqui;
 *  - nada de template: cada owner tem tabela, decisão e limites próprios.
 *
 * A chave é o caminho completo da página.
 */
import type { EnriquecimentoConteudo } from "./enriquecimento";

export const ENRIQUECIMENTO_4B: Record<string, EnriquecimentoConteudo> = {
  /* ------------------------------------------------------------------ */
  /* CLUSTER A — notebook/PC não liga                                    */
  /* ------------------------------------------------------------------ */
  "/problemas/notebook-nao-liga": {
    respostaRapida:
      "Antes de qualquer conserto, separe três situações que parecem iguais: sem nenhum sinal de energia, com LED aceso e tela apagada, ou ligando e desligando em segundos. A primeira aponta para alimentação (tomada, carregador, conector, circuito de entrada); a segunda para memória, vídeo ou inicialização; a terceira para proteção do próprio equipamento, que costuma piorar a cada nova tentativa. Se houve líquido, queda, cheiro de queimado ou bateria estufada, pare de tentar ligar — insistir transforma um reparo simples em perda de placa ou de dados.",
    tabelaExtra: {
      titulo: "Do sintoma ao teste seguro: o que cada comportamento realmente indica",
      colunas: { sintoma: "O que acontece ao apertar o botão", causa: "Faixa provável de causa", verificar: "Teste seguro em casa", acao: "Próximo passo" },
      linhas: [
        {
          sintoma: "Nada acontece: sem LED, sem ruído, sem vibração",
          causa: "Alimentação: tomada, carregador, conector de energia ou circuito de entrada da placa",
          verificar: "Outra tomada na parede, sem filtro nem extensão, observando se algum LED acende ao conectar o carregador",
          acao: "LED acende em outra tomada: era a rede elétrica. Continua morto: diagnóstico de alimentação em bancada",
        },
        {
          sintoma: "LED do carregador acende, mas o notebook não reage",
          causa: "Carregador entrega tensão, mas o equipamento não fecha o circuito de partida",
          verificar: "Desconecte tudo (pendrive, HDMI, doca, mouse) e tente novamente só com o carregador",
          acao: "Se voltar sem periférico, havia curto no acessório. Se não, é falha interna de partida",
        },
        {
          sintoma: "Liga, aparece o logo do fabricante e para ali",
          causa: "POST executou: a falha está depois — armazenamento, BIOS ou sistema",
          verificar: "Aguarde dois minutos completos antes de concluir. Muita máquina só parece travada",
          acao: "Se nunca passa do logo, o disco costuma ser o suspeito principal. Priorize os dados antes de qualquer reinstalação",
        },
        {
          sintoma: "Liga por 2 a 5 segundos e desliga sozinho",
          causa: "Proteção contra curto, sobrecorrente ou temperatura — o equipamento se desliga para não danificar mais",
          verificar: "Repare se o desligamento é sempre no mesmo tempo. Ciclo idêntico indica proteção, não bateria",
          acao: "Pare de repetir o ciclo. Cada tentativa mantém o componente em curto energizado",
        },
        {
          sintoma: "Faz bipes ou pisca o LED em sequência repetida",
          causa: "Código de diagnóstico do fabricante: a placa está viva e apontando a área da falha",
          verificar: "Conte as piscadas/bipes e o intervalo entre eles, e anote o modelo exato",
          acao: "Esse padrão encurta muito o diagnóstico — informe-o no primeiro contato",
        },
        {
          sintoma: "Só liga com o carregador; sem ele, apaga na hora",
          causa: "Bateria sem retenção de carga ou circuito de carga interrompido",
          verificar: "Verifique se a carcaça está empenada ou o touchpad alto — sinal de bateria estufada",
          acao: "Estufada: desligue e não recarregue. Íntegra: avaliação de bateria e circuito de carga",
        },
      ],
    },
    blocos: [
      {
        id: "4b-nao-liga-arvore",
        titulo: "Ordem correta dos testes (e por que a ordem importa)",
        intro:
          "Quase todo diagnóstico caseiro erra por começar pelo mais invasivo. A sequência abaixo vai do mais barato e reversível para o mais arriscado, e para em qualquer ponto que devolva sinal de vida.",
        itens: [
          {
            titulo: "1. Fonte de energia externa",
            desc: "Tomada direta na parede, sem filtro de linha nem extensão. Filtro queimado é causa comum e passa despercebido porque a luzinha dele continua acesa.",
          },
          {
            titulo: "2. Carregador e conector",
            desc: "Cabo íntegro em toda a extensão, ponta sem folga no encaixe e sem esquentar de forma anormal. Carregador de outro modelo com tensão diferente pode não acionar a partida — e pode danificar.",
          },
          {
            titulo: "3. Remoção de periféricos",
            desc: "Pendrive, HD externo, HDMI, doca e adaptadores saem todos. Um único acessório em curto impede a partida sem dar qualquer mensagem.",
          },
          {
            titulo: "4. Descarga residual",
            desc: "Com tudo desconectado, mantenha o botão de energia pressionado por 20 segundos. Isso descarrega o circuito e resolve travas de partida em uma parcela real dos casos.",
          },
          {
            titulo: "5. Pare por aqui",
            desc: "Abrir a máquina, remover memória ou trocar peça por tentativa não é teste — é aposta. Sem instrumento de medição, o passo seguinte pertence à bancada.",
          },
        ],
        fecho: {
          antes: "Quando esses quatro testes não devolvem sinal, o caminho é o ",
          to: "/servicos/manutencao-de-notebook",
          anchor: "diagnóstico de notebook em bancada",
          depois: " — com medição de alimentação antes de qualquer troca de componente.",
        },
      },
      {
        id: "4b-nao-liga-dados",
        titulo: "Equipamento morto não significa dados perdidos",
        intro:
          "A confusão mais cara desse cluster é tratar 'não liga' como 'perdi tudo'. Na maioria das falhas de alimentação, o armazenamento está intacto — o que faltou foi energia para o resto da placa.",
        itens: [
          {
            titulo: "Falha de energia: dados quase sempre íntegros",
            desc: "Conector, carregador, bateria e circuito de entrada não tocam no conteúdo do disco. O SSD ou HD pode ser lido em outro equipamento antes mesmo do reparo.",
          },
          {
            titulo: "Falha de disco: prioridade muda de ordem",
            desc: "Se a máquina liga mas trava no logo, ou fica em ciclo de reparo automático, o disco entra como suspeito. Aqui a cópia dos dados vem antes de qualquer tentativa de reinstalar sistema.",
          },
          {
            titulo: "Líquido: relógio contra você",
            desc: "Corrosão avança mesmo com o equipamento desligado. Cada tentativa de ligar acelera a perda e pode atingir a controladora do armazenamento.",
          },
          {
            titulo: "O que pedir explicitamente",
            desc: "Peça que a cópia dos dados seja feita antes de qualquer formatação, e que o técnico confirme a leitura da cópia — cópia não verificada não é backup.",
          },
        ],
        fecho: {
          antes: "Se os arquivos são a prioridade e o equipamento não liga, comece pela ",
          to: "/servicos/recuperacao-de-dados",
          anchor: "recuperação de dados",
          depois: ", e só depois decida o reparo da máquina.",
        },
      },
    ],
    fontes: [
      {
        titulo: "Microsoft — solução de problemas de inicialização do Windows",
        url: "https://support.microsoft.com/pt-br/windows/op%C3%A7%C3%B5es-de-inicializa%C3%A7%C3%A3o-avan%C3%A7adas-incluindo-modo-de-seguran%C3%A7a-b90e7808-80b5-a291-d4b8-1a1af602b617",
        nota: "Referência para a etapa em que a máquina liga mas o sistema não carrega.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* CLUSTER B — liga mas não dá imagem                                  */
  /* ------------------------------------------------------------------ */
  "/problemas/computador-nao-da-imagem": {
    respostaRapida:
      "Computador que liga sem imagem quase sempre já passou pela parte elétrica: há energia, ventoinha girando e LED aceso. O que falta é o vídeo chegar à tela. Antes de trocar placa ou monitor, confirme três coisas na ordem: se o monitor está na entrada correta, se o cabo e a saída usada são os mesmos da placa que realmente processa vídeo e se a máquina emite algum código de bipe ou piscada. Uma parcela grande dos casos é entrada errada, cabo rompido ou vídeo ligado na saída da placa-mãe quando existe placa dedicada.",
    tabelaExtra: {
      titulo: "Sem imagem: separar tela, cabo, saída de vídeo e inicialização",
      colunas: { sintoma: "O que você observa", causa: "Onde o sinal se perde", verificar: "Como confirmar", acao: "Decisão" },
      linhas: [
        {
          sintoma: "Tela totalmente preta, monitor exibindo 'sem sinal'",
          causa: "O monitor está vivo e não recebe vídeo: cabo, saída errada ou placa sem saída",
          verificar: "Troque de entrada no monitor e teste outro cabo; em desktop com placa dedicada, use a saída da placa, não a da placa-mãe",
          acao: "Voltou a imagem: era cabo/entrada. Continuou: investigação de vídeo e memória",
        },
        {
          sintoma: "Tela preta sem nenhuma mensagem do monitor",
          causa: "Monitor sem energia, retroiluminação apagada ou desktop sem POST",
          verificar: "Com o cabo de vídeo desconectado, o monitor deve mostrar o aviso de ausência de sinal — se não mostra, o problema é o monitor",
          acao: "Monitor mudo: teste em outro equipamento antes de culpar o computador",
        },
        {
          sintoma: "Notebook escuro, mas com imagem em TV/monitor externo",
          causa: "Vídeo funciona: tela, cabo flat ou retroiluminação do painel",
          verificar: "Em ambiente muito claro, incline a tela e procure imagem fraca — se existe, é retroiluminação, não painel",
          acao: "Reparo focado em tela/flat, sem mexer na placa de vídeo",
        },
        {
          sintoma: "Aparece o logo e depois a tela apaga",
          causa: "O vídeo inicial funciona; a falha vem quando o sistema assume o driver",
          verificar: "Tente iniciar em modo de segurança — se lá a imagem se mantém, é driver ou perfil de vídeo",
          acao: "Correção de driver/sistema, sem troca de hardware",
        },
        {
          sintoma: "Desktop liga, ventoinha gira, mas nada aparece e há bipes",
          causa: "POST interrompido — memória mal encaixada, placa de vídeo mal encaixada ou defeito",
          verificar: "Anote a sequência de bipes; ela indica a área de acordo com o fabricante da placa-mãe",
          acao: "Reassentamento e teste de memória em bancada, com peça de referência",
        },
        {
          sintoma: "Imagem aparece e some de forma intermitente",
          causa: "Mau contato no conector, cabo em fim de vida ou aquecimento do vídeo",
          verificar: "Verifique se a falha acompanha o movimento da tampa (notebook) ou o tempo de uso (aquecimento)",
          acao: "Movimento: flat/dobradiça. Tempo: avaliação térmica antes de trocar peça",
        },
      ],
    },
    blocos: [
      {
        id: "4b-sem-imagem-monitor",
        titulo: "Como provar que o problema não é o monitor",
        intro:
          "Trocar o monitor por suposição é comum e caro. Existem testes simples que separam o display do resto sem abrir nada.",
        itens: [
          {
            titulo: "Teste do cabo desconectado",
            desc: "Monitor ligado, cabo de vídeo fora. Ele precisa mostrar logo, menu ou aviso de ausência de sinal. Se a tela permanece morta, o defeito é do próprio monitor.",
          },
          {
            titulo: "Teste da lanterna (notebook e monitor)",
            desc: "No escuro, aponte uma luz forte para a tela. Enxergar a imagem apagada significa que o vídeo chega e apenas a retroiluminação falhou — reparo bem mais barato que troca de painel.",
          },
          {
            titulo: "Teste da segunda saída",
            desc: "Ligue em outra saída (HDMI, DisplayPort, VGA) ou em uma TV. Imagem em uma saída e não na outra aponta conector ou cabo, não a placa inteira.",
          },
          {
            titulo: "Teste cruzado",
            desc: "Se possível, use o monitor em outro computador e o computador em outro monitor. Dois testes cruzados eliminam a dúvida sem custo.",
          },
        ],
        fecho: {
          antes: "Quando o resultado aponta o display, o caminho é o ",
          to: "/servicos/conserto-monitor",
          anchor: "conserto de monitor",
          depois: " — com a ressalva de que painel trincado normalmente não compensa reparo.",
        },
      },
      {
        id: "4b-sem-imagem-limites",
        titulo: "O que não fazer enquanto não há imagem",
        itens: [
          {
            titulo: "Não force atualização de BIOS às cegas",
            desc: "Sem imagem você não confirma o modelo nem o andamento do processo. Uma atualização interrompida transforma falha de vídeo em placa inutilizada.",
          },
          {
            titulo: "Não troque peça por tentativa",
            desc: "Comprar memória ou placa de vídeo por suposição é a forma mais cara de diagnosticar. Bancada testa com peça de referência antes de indicar compra.",
          },
          {
            titulo: "Não limpe contatos com material abrasivo",
            desc: "Borracha e lixa arrancam o banho de contato dos módulos. A limpeza correta usa produto próprio e não deixa resíduo.",
          },
          {
            titulo: "Não repita o ciclo liga/desliga",
            desc: "Se a máquina não completa o POST, insistir só mantém energizado um componente possivelmente em curto.",
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* CLUSTER C — computador lento / travando                             */
  /* ------------------------------------------------------------------ */
  "/problemas/computador-lento": {
    respostaRapida:
      "Lentidão não é diagnóstico: é o resultado visível de quatro famílias de causa bem diferentes — disco, memória, temperatura e software. O atalho para descobrir qual delas é a sua está no Gerenciador de tarefas, aba Desempenho: disco em 100% com pouca leitura real aponta HD mecânico ou disco em fim de vida; memória perto do limite com uso de disco alto aponta falta de RAM; queda de desempenho que só aparece depois de alguns minutos aponta temperatura; e uso alto de CPU parado, com a máquina fria, aponta software. Formatar antes desse teste resolve por acaso — e a lentidão volta.",
    tabelaExtra: {
      titulo: "Quatro famílias de lentidão e o teste que separa cada uma",
      colunas: { sintoma: "Como a lentidão se manifesta", causa: "Família provável", verificar: "Medida objetiva", acao: "O que resolve de fato" },
      linhas: [
        {
          sintoma: "Demora enorme para ligar e para abrir qualquer programa, mas depois de aberto funciona",
          causa: "Armazenamento — HD mecânico ou SSD saturado",
          verificar: "Gerenciador de tarefas → Desempenho: disco em 100% com taxa de transferência baixa",
          acao: "Migração para SSD com clonagem; é o upgrade de maior impacto percebido",
        },
        {
          sintoma: "Trava quando há muitas abas e programas abertos ao mesmo tempo",
          causa: "Memória insuficiente para a carga real de uso",
          verificar: "Memória acima de 85% em uso normal, com disco subindo junto (paginação)",
          acao: "Ampliação de memória compatível com a placa; verificar o limite do modelo antes de comprar",
        },
        {
          sintoma: "Começa rápido e degrada sempre depois dos mesmos minutos",
          causa: "Temperatura — redução automática de frequência para proteger o processador",
          verificar: "A queda acompanha o aquecimento e desaparece após alguns minutos parado",
          acao: "Limpeza interna com medição térmica antes e depois; pasta térmica só quando o radiador estiver livre",
        },
        {
          sintoma: "Uso de CPU alto com a máquina parada e fria",
          causa: "Software — inicialização carregada, indexação, atualização em curso ou programa indesejado",
          verificar: "Aba Inicializar e processos em repouso por alguns minutos, sem nada aberto",
          acao: "Higiene de inicialização e verificação de ameaças antes de considerar formatação",
        },
        {
          sintoma: "Trava por completo, com o ponteiro parado, e volta sozinho depois de segundos",
          causa: "Disco com setores problemáticos ou memória instável",
          verificar: "Registro de eventos com erros de disco; teste de memória em bancada",
          acao: "Backup imediato antes de qualquer teste destrutivo — congelamento repetido antecede perda de dados",
        },
        {
          sintoma: "Só o navegador está lento; o restante responde bem",
          causa: "Extensões, excesso de abas ou perfil corrompido — não é o computador",
          verificar: "Teste em janela anônima e com extensões desativadas",
          acao: "Limpeza de perfil e extensões; trocar hardware aqui não muda nada",
        },
      ],
    },
    blocos: [
      {
        id: "4b-lento-formatar",
        titulo: "Formatar resolve lentidão? Depende da família de causa",
        intro:
          "Formatação é uma ferramenta legítima, mas atua sobre uma família apenas. Aplicá-la nas outras três dá alívio temporário e devolve o problema em semanas.",
        itens: [
          {
            titulo: "Resolve: causa de software",
            desc: "Sistema com anos de instalação acumulada, drivers conflitantes, programa indesejado persistente. Aqui a reinstalação limpa devolve desempenho de forma consistente.",
          },
          {
            titulo: "Alivia por pouco tempo: disco em fim de vida",
            desc: "Sistema novo grava menos e a máquina parece melhor por algumas semanas. À medida que o disco volta a ser exigido, a lentidão retorna igual.",
          },
          {
            titulo: "Não resolve: falta de memória",
            desc: "A carga de uso continua a mesma depois da formatação. Se o gargalo é RAM, o sintoma reaparece assim que você reabre a rotina habitual de trabalho.",
          },
          {
            titulo: "Não resolve: aquecimento",
            desc: "Redução de frequência é física, não lógica. Nenhum sistema operacional novo desobstrui radiador ou recupera ventoinha desgastada.",
          },
        ],
        fecho: {
          antes: "Quando o teste aponta mesmo software, a ",
          to: "/servicos/formatacao",
          anchor: "formatação com backup",
          depois: " é feita com cópia verificada antes e reinstalação dos drivers do modelo.",
        },
      },
      {
        id: "4b-lento-expectativa",
        titulo: "Ganho realista de cada intervenção",
        intro:
          "Nenhuma dessas medidas transforma um equipamento antigo em novo. Vale saber o que esperar antes de gastar.",
        itens: [
          {
            titulo: "HD mecânico → SSD",
            desc: "É a mudança mais perceptível em máquina antiga: inicialização e abertura de programas deixam de ser o gargalo. Não aumenta capacidade de processamento nem ajuda em jogo pesado.",
          },
          {
            titulo: "Ampliação de memória",
            desc: "Resolve travamento por multitarefa. Não deixa o sistema mais rápido quando a memória já sobra — nesse caso o dinheiro rende mais em disco.",
          },
          {
            titulo: "Limpeza e pasta térmica",
            desc: "Recupera o desempenho que a máquina já teve e reduz ruído. Não entrega desempenho acima do projeto original do equipamento.",
          },
          {
            titulo: "Reinstalação do sistema",
            desc: "Elimina o acúmulo de software. Se o hardware é o limite, o ganho é modesto e temporário — por isso o teste vem antes.",
          },
        ],
        fecho: {
          antes: "A avaliação que mede disco, memória e temperatura antes de indicar peça faz parte da ",
          to: "/servicos/manutencao-de-computador",
          anchor: "manutenção de computador",
          depois: ", com laudo do que foi medido.",
        },
      },
    ],
    fontes: [
      {
        titulo: "Microsoft — dicas para melhorar o desempenho do PC no Windows",
        url: "https://support.microsoft.com/pt-br/windows/dicas-para-melhorar-o-desempenho-do-pc-no-windows-b3b3ef5b-5953-fb6a-2528-4bbed82fba96",
        nota: "Referência oficial para a etapa de software (inicialização, atualizações e recursos visuais).",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* CLUSTER D — backup                                                  */
  /* ------------------------------------------------------------------ */
  "/solucoes/backup": {
    tabelaExtra: {
      titulo: "O que cada tipo de backup protege — e contra o que ele não protege",
      colunas: { sintoma: "Cenário de perda", causa: "Cópia que salva", verificar: "Como confirmar que está funcionando", acao: "Falha comum" },
      linhas: [
        {
          sintoma: "Apagou uma pasta por engano ontem",
          causa: "Qualquer cópia com histórico de versões",
          verificar: "Abra o histórico e restaure um arquivo específico de uma data anterior",
          acao: "Sincronização sem versionamento replica a exclusão e não devolve nada",
        },
        {
          sintoma: "SSD ou HD parou de ser reconhecido",
          causa: "Cópia em mídia física separada ou em nuvem",
          verificar: "Desconecte o disco de origem e confirme que os arquivos abrem a partir da cópia",
          acao: "Backup na segunda partição do mesmo disco morre junto com o disco",
        },
        {
          sintoma: "Ransomware criptografou os arquivos da rede",
          causa: "Cópia offline (desconectada) ou versionada e imutável",
          verificar: "Confirme que existe uma cópia que o computador infectado não consegue escrever",
          acao: "HD externo sempre plugado é criptografado junto com a máquina",
        },
        {
          sintoma: "Furto, incêndio ou alagamento no imóvel",
          causa: "Cópia fora do local — nuvem ou mídia guardada em outro endereço",
          verificar: "Pergunte-se onde estão fisicamente as duas cópias; se a resposta é o mesmo cômodo, não há cópia externa",
          acao: "Duas cópias na mesma mesa contam como uma só",
        },
        {
          sintoma: "Sistema não inicia mais e o trabalho precisa continuar hoje",
          causa: "Imagem do sistema, além da cópia de arquivos",
          verificar: "Teste a restauração da imagem em outro disco antes de precisar dela",
          acao: "Cópia só de documentos exige reinstalar tudo e reconfigurar do zero",
        },
        {
          sintoma: "Descobriu que o arquivo estava corrompido há três meses",
          causa: "Retenção longa com múltiplas versões",
          verificar: "Verifique por quanto tempo as versões antigas são mantidas antes de expirar",
          acao: "Retenção de 7 dias não cobre corrupção descoberta tarde",
        },
      ],
    },
    blocos: [
      {
        id: "4b-backup-teste",
        titulo: "Backup que nunca foi restaurado não é backup",
        intro:
          "A falha mais frequente não é a ausência de cópia: é a cópia que existia, aparecia como concluída e não abriu na hora da perda. Testar restauração é a única forma de saber.",
        itens: [
          {
            titulo: "Teste de arquivo único, mensal",
            desc: "Restaure um documento qualquer de uma data antiga em uma pasta separada e abra o arquivo. Leva dois minutos e detecta a maior parte das falhas silenciosas.",
          },
          {
            titulo: "Teste de pasta inteira, semestral",
            desc: "Restaure uma pasta com muitos arquivos e compare a quantidade e o tamanho. Cópia truncada por falta de espaço aparece exatamente aqui.",
          },
          {
            titulo: "Teste de imagem do sistema, anual",
            desc: "Se você depende de imagem para voltar rápido ao trabalho, ela precisa ser restaurada uma vez em disco de teste. Imagem nunca restaurada é uma promessa, não uma garantia.",
          },
          {
            titulo: "Alerta de falha ativado",
            desc: "Configure a notificação de erro da ferramenta usada. Rotina que falha em silêncio é a origem clássica do 'eu tinha backup'.",
          },
        ],
      },
      {
        id: "4b-backup-erros",
        titulo: "Erros que anulam uma rotina bem-intencionada",
        itens: [
          {
            titulo: "Confundir sincronização com backup",
            desc: "Pasta sincronizada replica tudo — inclusive a exclusão e a criptografia por ransomware. Ela só vira proteção quando há histórico de versões com retenção suficiente.",
          },
          {
            titulo: "Guardar a cópia no mesmo disco",
            desc: "Segunda partição não protege contra falha física, que é justamente o cenário mais comum de perda total.",
          },
          {
            titulo: "Manter o HD externo sempre conectado",
            desc: "Conveniente para a rotina automática e péssimo contra ransomware. Onde houver dado crítico, mantenha ao menos uma cópia desconectada.",
          },
          {
            titulo: "Nunca verificar o espaço livre",
            desc: "Destino cheio interrompe a rotina e muitas ferramentas seguem exibindo a última execução bem-sucedida por semanas.",
          },
        ],
        fecho: {
          antes: "Quando a perda já aconteceu e não existe cópia utilizável, o caminho deixa de ser backup e passa a ser ",
          to: "/servicos/recuperacao-de-dados",
          anchor: "recuperação de dados",
          depois: " — e aí o que mais importa é parar de gravar na unidade afetada.",
        },
      },
    ],
    fontes: [
      {
        titulo: "CISA — orientações sobre proteção de dados e ransomware (StopRansomware)",
        url: "https://www.cisa.gov/stopransomware",
        nota: "Base da recomendação de cópia offline/imutável contra criptografia maliciosa.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* CLUSTER E — Windows 10 × Windows 11 (owner: solução formatação)     */
  /* ------------------------------------------------------------------ */
  "/solucoes/formatacao": {
    respostaRapida:
      "Formatar é reinstalar o sistema do zero, e a decisão só é boa depois de duas confirmações: que a causa do problema é mesmo software e que existe cópia verificada dos dados. A dúvida entre continuar no Windows 10 e migrar para o Windows 11 entra aqui porque o momento natural de mudar de versão é justamente a reinstalação — mas ela depende dos requisitos do equipamento, e não da vontade. Máquina sem compatibilidade continua melhor em uma instalação limpa da versão que já roda do que forçada para outra.",
    tabelaExtra: {
      titulo: "Windows 10 ou Windows 11 na hora de reinstalar: o que decide",
      colunas: { sintoma: "Situação do equipamento", causa: "Fator determinante", verificar: "Como confirmar", acao: "Decisão recomendada" },
      linhas: [
        {
          sintoma: "Máquina recente, com requisitos atendidos",
          causa: "Compatibilidade completa de processador, TPM e inicialização segura",
          verificar: "A própria verificação de requisitos do fabricante/sistema aponta compatível",
          acao: "Instalação limpa do Windows 11, com drivers do modelo aplicados depois",
        },
        {
          sintoma: "Equipamento antigo, sem requisito de segurança atendido",
          causa: "Hardware fora da lista suportada",
          verificar: "Verificação de requisitos aponta incompatível, normalmente por processador ou TPM",
          acao: "Instalação limpa da versão suportada pelo equipamento — forçar migração cria máquina sem atualização confiável",
        },
        {
          sintoma: "Software de trabalho antigo e essencial",
          causa: "Dependência de aplicação legada, periférico ou driver descontinuado",
          verificar: "Consulte o fabricante do software/periférico sobre suporte à versão nova antes de decidir",
          acao: "Manter a versão compatível; migrar sem checar quebra a operação no dia seguinte",
        },
        {
          sintoma: "Lentidão que motivou a formatação",
          causa: "A versão do Windows raramente é a causa do desempenho ruim",
          verificar: "Meça disco, memória e temperatura antes; a família de causa define o ganho real",
          acao: "Resolva o gargalo de hardware junto com a reinstalação, ou a lentidão volta na versão nova",
        },
        {
          sintoma: "Programas e arquivos precisam ser preservados",
          causa: "Diferença entre atualização in-place e instalação limpa",
          verificar: "Atualização preserva o ambiente; instalação limpa exige reinstalar programas e reconfigurar tudo",
          acao: "Combine antes o que será preservado — evita a surpresa de reconfigurar impressora, e-mail e sistemas",
        },
      ],
    },
    blocos: [
      {
        id: "4b-formatacao-antes",
        titulo: "O que precisa estar resolvido antes de apertar 'formatar'",
        intro:
          "Formatação é irreversível para o que estava no disco. A checagem abaixo evita a maioria dos arrependimentos que aparecem no dia seguinte.",
        itens: [
          {
            titulo: "Cópia verificada, não apenas feita",
            desc: "Abrir alguns arquivos a partir da cópia é o único teste que vale. Backup marcado como concluído e nunca aberto falha justamente quando é necessário.",
          },
          {
            titulo: "Senhas e licenças em mãos",
            desc: "Contas de e-mail, chaves de programas pagos, sistemas de trabalho e acesso ao roteador. Recuperar isso depois costuma demorar mais que a própria reinstalação.",
          },
          {
            titulo: "Dados fora das pastas óbvias",
            desc: "Área de trabalho, downloads, favoritos do navegador, assinaturas de e-mail, certificados digitais e pastas de programas específicos ficam fora de 'Documentos' e são esquecidos.",
          },
          {
            titulo: "Drivers do modelo separados",
            desc: "Rede, vídeo e chipset baixados antes. Formatar sem driver de rede deixa a máquina isolada exatamente quando você precisa baixar o driver de rede.",
          },
        ],
      },
      {
        id: "4b-formatacao-quando-nao",
        titulo: "Quando formatar é a decisão errada",
        itens: [
          {
            titulo: "Disco sob suspeita",
            desc: "Travamentos, ruído ou erros de leitura pedem cópia dos dados primeiro. Formatar um disco em falha grava por horas na unidade mais frágil e pode inviabilizar a recuperação.",
          },
          {
            titulo: "Problema que também acontece fora do sistema",
            desc: "Falha que aparece na BIOS, em pendrive de instalação ou em modo de segurança não é do sistema instalado — é hardware.",
          },
          {
            titulo: "Ainda existem dados sem cópia",
            desc: "Não há reversão. Enquanto houver arquivo importante só na máquina, a reinstalação espera.",
          },
          {
            titulo: "Dúvida entre versões sem verificar requisitos",
            desc: "Decidir a versão no meio da instalação leva a improviso. A verificação de compatibilidade é rápida e evita máquina fora de suporte.",
          },
        ],
        fecho: {
          antes: "Quando a causa confirmada é software e os dados estão salvos, a execução é a mesma descrita em ",
          to: "/servicos/formatacao",
          anchor: "formatação de computador",
          depois: ", com backup verificado e drivers do modelo reinstalados.",
        },
      },
    ],
    fontes: [
      {
        titulo: "Microsoft — requisitos de sistema do Windows 11",
        url: "https://www.microsoft.com/pt-br/windows/windows-11-specifications",
        nota: "Fonte dos critérios de compatibilidade citados na decisão entre versões.",
      },
    ],
  },
};

/**
 * Owners desta rodada, exportados para gates e testes que verificam que
 * nenhuma URL nova foi criada e que os owners da 4A seguem congelados.
 */
export const OWNERS_4B_PATHS = Object.keys(ENRIQUECIMENTO_4B);
