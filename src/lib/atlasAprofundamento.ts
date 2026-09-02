/**
 * ============================================================================
 * ATLAS — APROFUNDAMENTO DOS NOVE TEMAS (Fase 5)
 * ============================================================================
 * Reestruturação dos nove temas do hub /guia-tecnico-informatica em uma
 * sequência editorial fixa, renderizada no SSR dentro do card de cada tema:
 *
 *   contexto → sinais → verificar com segurança → o que não fazer →
 *   quando pausar → reparar / substituir / escalar → próximos passos
 *
 * Por que módulo separado de `atlasInformatica.ts`: os gates
 * (`scripts/check-atlas-hub.mjs`, `src/__tests__/atlas-informatica.test.ts`)
 * fazem parse por regex do módulo do Atlas, contando `id:`/`titulo:`,
 * `veredito:` e `to:`. Manter o texto longo aqui preserva esses contratos.
 *
 * Regras herdadas (não negociáveis):
 *  - nenhuma URL nova é criada aqui; todo destino já existe no portal;
 *  - nenhum preço, prazo, avaliação ou estatística inventada;
 *  - nunca recomendar desativação permanente de proteção de segurança;
 *  - texto autoral; fonte primária é referenciada, nunca copiada.
 */

export interface AtlasCaminho {
  /** "Reparar" | "Substituir" | "Escalar" — rótulo curto do desfecho. */
  rotulo: string;
  texto: string;
}

export interface AtlasProximoPasso {
  rotulo: string;
  to: string;
  contexto: string;
}

export interface AtlasAprofundamento {
  /** Igual ao id do tema em ATLAS_TEMAS. */
  temaId: string;
  /** Uma frase que resume a posição técnica do bloco. */
  chamada: string;
  contexto: string[];
  sinais: string[];
  verificar: string[];
  naoFazer: string[];
  pausar: string[];
  caminhos: AtlasCaminho[];
  proximosPassos: AtlasProximoPasso[];
}

export const ATLAS_APROFUNDAMENTO: AtlasAprofundamento[] = [
  {
    temaId: "fundamentos",
    chamada:
      "Quase todo chamado começa com uma pergunta de fundamento mal respondida: onde o problema mora — no equipamento, no sistema ou no ambiente.",
    contexto: [
      "Um computador é uma pilha de camadas que dependem umas das outras: alimentação elétrica, hardware, firmware, sistema operacional, programas e rede. Quando algo falha, o sintoma aparece na camada de cima — a tela — mesmo que a causa esteja três níveis abaixo. É por isso que a mesma queixa (\"está travando\") pode terminar em limpeza de inicialização ou em troca de fonte.",
      "Dominar o fundamento não transforma ninguém em técnico; muda a qualidade da informação. Quem sabe descrever em que camada o comportamento aparece encurta o diagnóstico, evita procedimento desnecessário e consegue avaliar se a proposta que recebeu faz sentido.",
    ],
    sinais: [
      "A queixa muda de forma conforme o dia: às vezes lento, às vezes travando, às vezes desligando.",
      "O problema aparece em um programa específico e some nos demais — indício de software, não de peça.",
      "Vários equipamentos da casa ou do escritório apresentam a mesma falha ao mesmo tempo — indício de rede ou energia.",
      "O comportamento surgiu logo depois de uma mudança concreta: atualização, instalação, queda de energia, mudança de lugar.",
    ],
    verificar: [
      "Anote quando começou e o que mudou antes. Essa única linha resolve mais diagnóstico do que qualquer aplicativo.",
      "Confira o espaço livre no disco do sistema: partição de sistema no limite produz lentidão e falha de atualização.",
      "Teste em outra tomada, sem filtro de linha antigo, e observe se o comportamento muda.",
      "Desconecte periféricos, cartões e monitores externos e repita o teste — reduz variáveis sem risco.",
      "Verifique se a falha é do equipamento ou do ambiente testando outro aparelho na mesma rede ou na mesma tomada.",
    ],
    naoFazer: [
      "Instalar otimizadores ou \"limpadores\" baixados por anúncio: eles adicionam variáveis em vez de remover.",
      "Manter dois antivírus ativos ao mesmo tempo — um passa a enxergar o outro como ameaça.",
      "Aplicar tutorial de linha de comando sem entender o que cada instrução faz no seu caso.",
      "Trocar peça por suposição antes de ter identificado a camada em que a falha aparece.",
    ],
    pausar: [
      "Cheiro de queimado, estalo elétrico ou aquecimento anormal na fonte ou no carregador.",
      "Ruído mecânico vindo do disco.",
      "Arquivos importantes sem cópia conferida em outra mídia.",
    ],
    caminhos: [
      {
        rotulo: "Reparar",
        texto:
          "Quando o comportamento é de software e o hardware responde normalmente, o caminho é ajuste: limpar inicialização, corrigir atualização, remover programa indesejado.",
      },
      {
        rotulo: "Substituir",
        texto:
          "Quando a limitação é estrutural — disco mecânico, memória no teto da placa —, nenhum ajuste de sistema entrega o resultado esperado.",
      },
      {
        rotulo: "Escalar",
        texto:
          "Quando o sintoma cruza camadas (liga, mas não dá imagem; funciona só na tomada) a investigação precisa de medição em bancada.",
      },
    ],
    proximosPassos: [
      {
        rotulo: "Entrar pelo sintoma",
        to: "/problemas",
        contexto: "Descrição em linguagem comum, sem precisar do nome técnico da falha.",
      },
      {
        rotulo: "Glossário técnico",
        to: "/glossario",
        contexto: "Os termos que aparecem em orçamento e em mensagem de erro, explicados.",
      },
      {
        rotulo: "Como funciona o atendimento",
        to: "/como-funciona",
        contexto: "Triagem, modalidade, aprovação e execução — nessa ordem.",
      },
    ],
  },
  {
    temaId: "windows-inicializacao",
    chamada:
      "O estágio em que a partida trava é o dado mais valioso do diagnóstico — e é observável sem abrir o equipamento.",
    contexto: [
      "A inicialização tem estágios distintos: energia, POST do firmware (BIOS/UEFI), seleção do dispositivo de boot, carregamento do gerenciador de inicialização e, por fim, o carregamento do Windows. Cada estágio falha com uma assinatura própria: sem imagem, logo travado, mensagem de dispositivo não encontrado, reinício em laço, tela azul, área de trabalho lenta.",
      "Boa parte das formatações desnecessárias nasce de pular essa leitura. Quando a falha ocorre antes do gerenciador de inicialização, reinstalar o sistema não é a resposta — o sistema nem chegou a ser lido.",
    ],
    sinais: [
      "Logo do fabricante travado ou reinício antes de qualquer tela do Windows.",
      "Mensagem de dispositivo de inicialização não encontrado ou entrada direta na BIOS/UEFI.",
      "Tela azul com código que se repete sempre igual (aponta driver ou componente específico) ou muda a cada vez (aponta memória ou energia).",
      "Reparo automático em laço, ou o sistema sobe apenas em modo de segurança.",
    ],
    verificar: [
      "Observe em que estágio a partida para e anote a mensagem exata — a mensagem literal vale mais que a descrição aproximada.",
      "Remova pendrives, cartões e HDs externos: mídia externa muda a ordem de inicialização.",
      "Confira se o disco do sistema ainda aparece listado na tela de firmware — se sumiu, o assunto é hardware.",
      "Se o sistema sobe em modo de segurança, o hardware básico está funcionando e a suspeita se concentra em driver ou serviço.",
    ],
    naoFazer: [
      "Alterar parâmetros do firmware às cegas, especialmente desativar proteções de inicialização em caráter permanente.",
      "Executar comandos de reparo de partição sem antes ter cópia dos dados: reescrita de estrutura pode fechar a porta da recuperação.",
      "Repetir o desligamento forçado dezenas de vezes na esperança de que a próxima tentativa suba.",
      "Aceitar formatação como primeiro passo quando a falha ocorre antes de o Windows carregar.",
    ],
    pausar: [
      "O disco não aparece mais na tela de firmware.",
      "Cada nova tentativa de iniciar demora mais ou vem acompanhada de ruído.",
      "Há arquivos importantes sem backup — copie antes de qualquer reparo de sistema.",
    ],
    caminhos: [
      {
        rotulo: "Reparar",
        texto:
          "Falha de gerenciador de inicialização, atualização interrompida ou driver recente costuma ser corrigível preservando programas e arquivos.",
      },
      {
        rotulo: "Substituir",
        texto:
          "Disco que some da lista, que não é lido de forma consistente ou que apresenta contadores S.M.A.R.T. em crescimento precisa sair antes do reparo do sistema.",
      },
      {
        rotulo: "Escalar",
        texto:
          "Sem imagem, sem POST ou com desligamento no primeiro segundo, a investigação sai do sistema e vai para energia e placa — bancada.",
      },
    ],
    proximosPassos: [
      {
        rotulo: "Windows não inicia",
        to: "/problemas/windows-nao-inicia",
        contexto: "O pilar do tema, com a leitura estágio a estágio da partida.",
      },
      {
        rotulo: "Roteiro de falha de inicialização",
        to: "/ferramentas/roteiro-falha-de-inicializacao",
        contexto: "Checklist na ordem correta, sem procedimento destrutivo.",
      },
      {
        rotulo: "Formatar ou reparar",
        to: "/decisoes/formatar-ou-reparar",
        contexto: "O critério que separa o caso de software do caso de hardware.",
      },
      {
        rotulo: "UEFI no glossário",
        to: "/glossario/uefi",
        contexto: "O que o firmware faz antes de o sistema existir.",
      },
    ],
  },
  {
    temaId: "hardware-upgrades",
    chamada:
      "Upgrade só entrega ganho quando corrige o gargalo real; comprar peça pelo sintoma é a forma mais comum de gastar sem resolver.",
    contexto: [
      "Desempenho é sempre limitado pelo componente mais lento em relação ao uso. Uma máquina com processador razoável e disco mecânico é lenta em tudo desde o primeiro segundo; uma máquina com SSD e pouca memória é rápida até o momento em que muitos programas competem pela RAM. São gargalos distintos e produzem sintomas distintos.",
      "Temperatura é o terceiro eixo, e o mais silencioso: um equipamento que inicia rápido e piora depois de alguns minutos costuma estar reduzindo a própria frequência para não superaquecer. Nesse caso, nem disco nem memória mudam o quadro.",
    ],
    sinais: [
      "Lentidão presente desde a inicialização, com o indicador de disco constantemente ocupado — aponta armazenamento.",
      "Máquina responsiva sozinha, que trava ao abrir muitas abas ou vários programas — aponta memória.",
      "Bom desempenho nos primeiros minutos, queda progressiva, ventoinha acelerada — aponta temperatura.",
      "Travamentos aleatórios com telas azuis de códigos variados — aponta memória instável ou alimentação.",
    ],
    verificar: [
      "Observe o comportamento em duas janelas de tempo: os primeiros dois minutos e depois de meia hora de uso real.",
      "Anote quantos programas iniciam junto com o sistema e qual deles mantém o disco ocupado.",
      "Confira o modelo do equipamento e quanto de memória a placa aceita antes de considerar qualquer compra.",
      "Verifique se as saídas de ar estão desobstruídas e se o ruído da ventoinha aumenta sob carga.",
    ],
    naoFazer: [
      "Comprar módulo de memória sem confirmar padrão, capacidade máxima e número de slots livres.",
      "Somar mais memória para resolver lentidão que existe desde o boot com disco mecânico.",
      "Abrir notebook em garantia para trocar peça sem checar a política do fabricante.",
      "Usar o equipamento apoiado em superfície macia, que fecha a entrada de ar.",
    ],
    pausar: [
      "Ruído mecânico no disco ou travamentos de leitura: dados primeiro, upgrade depois.",
      "Desligamento repentino sob carga, que costuma ser proteção térmica ou fonte degradada.",
      "Marca de aquecimento, deformação de bateria ou cheiro de queimado.",
    ],
    caminhos: [
      {
        rotulo: "Reparar",
        texto:
          "Limpeza interna e troca de pasta térmica resolvem o caso térmico; recolocar contatos e substituir cabo interno resolve parte das falhas intermitentes.",
      },
      {
        rotulo: "Substituir",
        texto:
          "Disco mecânico em máquina que continuará em uso, memória abaixo do necessário para o uso real, bateria que não sustenta carga: peça trocada com ganho previsível.",
      },
      {
        rotulo: "Escalar",
        texto:
          "Quando a soma de peças se aproxima do valor de um equipamento equivalente, a conversa deixa de ser técnica e vira decisão de investimento.",
      },
    ],
    proximosPassos: [
      {
        rotulo: "Computador lento",
        to: "/problemas/computador-lento",
        contexto: "Como separar disco, memória e temperatura pelo padrão do sintoma.",
      },
      {
        rotulo: "SSD ou mais memória",
        to: "/decisoes/ssd-ou-memoria-ram",
        contexto: "O critério que decide qual upgrade entrega ganho no seu caso.",
      },
      {
        rotulo: "Trocar o componente ou reparar",
        to: "/decisoes/trocar-componente-ou-reparar",
        contexto: "Quando insistir no reparo passa a custar mais que substituir a peça.",
      },
      {
        rotulo: "Upgrade de SSD e memória",
        to: "/servicos/upgrade-ssd-ram",
        contexto: "Avaliação de compatibilidade e migração do sistema.",
      },
    ],
  },
  {
    temaId: "redes-wifi",
    chamada:
      "Rede é o único tema do Atlas em que o problema quase nunca está dentro do computador — está entre ele e o resto do mundo.",
    contexto: [
      "Uma conexão doméstica tem pelo menos quatro trechos: o enlace do provedor, o roteador, o meio (cabo ou Wi-Fi) e o dispositivo. Wi-Fi é rádio: paredes, espelhos, caixas metálicas, distância e concorrência de canal degradam o sinal sem que nada tenha \"quebrado\". Por isso a mesma casa pode ter internet excelente na sala e inutilizável no quarto dos fundos.",
      "Trocar de plano é a reação mais comum e a que menos resolve, porque o gargalo raramente está na velocidade contratada — está na propagação e na quantidade de dispositivos disputando o mesmo rádio.",
    ],
    sinais: [
      "A lentidão depende do cômodo ou da posição da pessoa: propagação de sinal.",
      "Só um dispositivo é afetado, os demais navegam bem: adaptador, driver ou configuração do aparelho.",
      "Todos os dispositivos caem ao mesmo tempo, em horários parecidos: roteador ou enlace do provedor.",
      "A conexão por cabo funciona bem e só o Wi-Fi falha: meio, não provedor.",
      "Impressora de rede some periodicamente: endereço que mudou, não defeito de impressora.",
    ],
    verificar: [
      "Compare o mesmo teste em dois pontos da casa e com dois dispositivos — isola meio e aparelho.",
      "Teste com cabo, quando possível: separa o problema de rádio do problema de provedor em um passo.",
      "Observe se as quedas coincidem com horários de pico ou com o uso de outro equipamento.",
      "Confira a posição do roteador: alto, arejado, longe de metal, espelho e caixa d'água.",
      "Reinicie o roteador uma vez e anote se a melhora dura minutos, horas ou dias — a duração indica a causa.",
    ],
    naoFazer: [
      "Abrir a rede ou remover a senha para \"testar\" — isso não diagnostica nada e expõe todos os dispositivos.",
      "Instalar repetidor antes de corrigir a posição do roteador: repetidor amplifica também o problema.",
      "Trocar de plano sem antes medir por cabo.",
      "Alterar em massa parâmetros avançados do roteador sem registrar a configuração anterior.",
    ],
    pausar: [
      "O roteador reinicia sozinho, esquenta de forma anormal ou apresenta LEDs de falha persistentes.",
      "A instabilidade começou junto com uma obra elétrica ou queda de energia.",
      "A rede é de escritório e envolve equipamentos compartilhados, servidor ou ponto de venda.",
    ],
    caminhos: [
      {
        rotulo: "Reparar",
        texto:
          "Reposicionamento, escolha de canal, separação de faixas e ajuste de endereçamento resolvem a maior parte dos casos domésticos, sem comprar nada.",
      },
      {
        rotulo: "Substituir",
        texto:
          "Roteador antigo, com faixa única ou sem capacidade para o número real de dispositivos, é limitação de projeto — nenhuma configuração compensa.",
      },
      {
        rotulo: "Escalar",
        texto:
          "Ambientes com vários cômodos, laje, alvenaria pesada ou uso profissional pedem levantamento no local e cabeamento planejado.",
      },
    ],
    proximosPassos: [
      {
        rotulo: "Wi-Fi instável",
        to: "/problemas/wifi-instavel",
        contexto: "O pilar do tema, com a separação entre provedor, roteador e ambiente.",
      },
      {
        rotulo: "Roteiro de Wi-Fi instável",
        to: "/ferramentas/roteiro-wifi-instavel",
        contexto: "Sequência de testes que isola o trecho responsável.",
      },
      {
        rotulo: "Impressora não imprime",
        to: "/problemas/impressora-nao-imprime",
        contexto: "O caso de rede mais frequente em escritório.",
      },
      {
        rotulo: "DNS no glossário",
        to: "/glossario/dns",
        contexto: "Por que \"a internet caiu\" às vezes é só a tradução de nomes falhando.",
      },
    ],
  },
  {
    temaId: "seguranca-privacidade",
    chamada:
      "Segurança doméstica se resolve com poucas medidas bem feitas — e se perde ao desligar proteção para fazer um programa funcionar.",
    contexto: [
      "A maior parte dos incidentes que chegam à bancada não envolve invasão sofisticada: envolve download de instalador falso, extensão de navegador instalada sem atenção, senha reutilizada em vários serviços e sistema sem atualização. O vetor é comportamento e superfície exposta, não falta de um produto caro.",
      "Órgãos públicos de referência — CISA nos Estados Unidos, CERT.br no Brasil, NIST em orientação técnica — convergem em um mesmo conjunto básico: manter software atualizado, usar autenticação em duas etapas, ter backup testado e desconfiar de canal não solicitado. Nenhuma dessas medidas exige conhecimento avançado.",
    ],
    sinais: [
      "Página inicial ou mecanismo de busca do navegador mudou sozinho.",
      "Anúncios aparecem fora do navegador, ou abas abrem sem ação do usuário.",
      "Programas desconhecidos na lista de inicialização e lentidão que começou após uma instalação.",
      "Contato de banco ou serviço pedindo código, acesso remoto ou confirmação urgente por telefone.",
      "Arquivos renomeados em massa ou inacessíveis com pedido de pagamento — cenário de ransomware.",
    ],
    verificar: [
      "Revise a lista de extensões do navegador e remova o que você não reconhece ou não usa.",
      "Confira a lista de programas instalados e a de inicialização automática, por data de instalação.",
      "Verifique se o sistema e o navegador estão com atualizações aplicadas.",
      "Ative verificação em duas etapas nas contas de e-mail e banco — o e-mail é a chave que recupera todas as outras.",
      "Confirme que existe uma cópia dos arquivos importantes fora do computador.",
    ],
    naoFazer: [
      "Desativar antivírus, firewall ou proteções do sistema em caráter permanente para instalar um programa.",
      "Instalar dois antivírus, ou trocar o do sistema por um \"otimizador\" oferecido em anúncio.",
      "Fornecer código recebido por SMS ou aplicativo a quem ligou — nenhuma instituição legítima pede isso.",
      "Conceder acesso remoto a contato não solicitado.",
      "Pagar resgate em caso de ransomware: pagamento não garante devolução e financia a próxima campanha.",
    ],
    pausar: [
      "Suspeita de acesso indevido a conta bancária: pare, use outro dispositivo e acione a instituição.",
      "Arquivos criptografados por ransomware: desconecte da rede e não sobrescreva nada.",
      "Cobrança ou movimentação desconhecida associada ao equipamento.",
    ],
    caminhos: [
      {
        rotulo: "Reparar",
        texto:
          "Sequestro de navegador, adware e programas indesejados costumam sair com limpeza dirigida, preservando arquivos e configurações legítimas.",
      },
      {
        rotulo: "Substituir",
        texto:
          "Sistema comprometido de forma persistente, com reinfecção após limpeza, justifica reinstalação limpa — depois de copiar e verificar os dados.",
      },
      {
        rotulo: "Escalar",
        texto:
          "Ransomware, suspeita de vazamento de dados de clientes ou ambiente com vários equipamentos exigem tratamento com contenção antes de qualquer limpeza.",
      },
    ],
    proximosPassos: [
      {
        rotulo: "Remoção de vírus e malware",
        to: "/servicos/remocao-de-virus",
        contexto: "Escopo da limpeza dirigida e o que ela não cobre.",
      },
      {
        rotulo: "Segurança dos dados",
        to: "/seguranca-dos-dados",
        contexto: "Como os seus arquivos são tratados durante um atendimento.",
      },
      {
        rotulo: "BitLocker no glossário",
        to: "/glossario/bitlocker",
        contexto: "Criptografia de disco e a chave de recuperação que ninguém guarda.",
      },
      {
        rotulo: "Backup antes da manutenção",
        to: "/decisoes/backup-antes-da-manutencao",
        contexto: "O que copiar antes de autorizar qualquer procedimento.",
      },
    ],
  },
  {
    temaId: "dados-backup",
    chamada:
      "Neste tema a ordem das operações é o próprio diagnóstico: copiar primeiro, investigar depois — nunca o contrário.",
    contexto: [
      "Dados têm uma característica que nenhum outro item do computador tem: não são substituíveis. Uma placa quebrada se compra; um arquivo perdido, não. Por isso o tema inverte a lógica dos demais: em qualquer suspeita de falha de armazenamento, a prioridade deixa de ser consertar e passa a ser preservar.",
      "Cada nova tentativa de ligar um disco em falha, cada varredura, cada instalação, escreve algo. Em disco mecânico com problema físico, isso agrava o dano; em disco lógico com arquivos apagados, sobrescreve o que ainda poderia ser lido. É por isso que o intervalo entre perceber o problema e parar de usar o equipamento é o fator que mais influencia o resultado.",
    ],
    sinais: [
      "Clique repetido, arranhado ou ruído rítmico vindo do disco.",
      "Congelamentos longos ao abrir pastas, seguidos de volta ao normal.",
      "Pastas que aparecem vazias, arquivos que somem ou partição que deixa de ser reconhecida.",
      "Alerta S.M.A.R.T. do sistema ou contador de setores realocados em crescimento.",
      "Cópia de arquivos que começa rápido e trava em um arquivo específico.",
    ],
    verificar: [
      "Pare de usar o equipamento assim que houver ruído mecânico — essa é a verificação mais importante do tema.",
      "Liste o que realmente importa: documentos, fotos, projetos, contabilidade. Nem tudo precisa ser copiado com a mesma urgência.",
      "Faça a cópia para outra mídia e abra os arquivos na cópia; backup que ninguém abriu não é backup.",
      "Anote se o problema começou depois de queda de energia, queda física ou desligamento forçado.",
    ],
    naoFazer: [
      "Rodar utilitário de correção de disco em unidade com ruído: correção escreve, e escrever agrava.",
      "Abrir o disco fora de ambiente adequado — a exposição contamina os pratos de forma irreversível.",
      "Congelar, bater ou aquecer o disco: receitas de fórum que costumam encerrar a chance de recuperação.",
      "Instalar programas de recuperação no mesmo disco de onde os arquivos serão recuperados.",
    ],
    pausar: [
      "Qualquer ruído mecânico: desligue e não religue para \"conferir\".",
      "Disco que aparece e some da lista de unidades.",
      "Arquivos críticos sem cópia — nesse ponto, nenhuma tentativa caseira compensa o risco.",
    ],
    caminhos: [
      {
        rotulo: "Reparar",
        texto:
          "Falha lógica — partição corrompida, tabela danificada, exclusão acidental — costuma permitir leitura com o disco preservado.",
      },
      {
        rotulo: "Substituir",
        texto:
          "Disco com dano físico não volta a ser confiável. Depois da tentativa de leitura, ele sai do equipamento; a mídia nova é que recebe os dados.",
      },
      {
        rotulo: "Escalar",
        texto:
          "Ruído mecânico, disco não reconhecido ou dados de operação profissional: a leitura é feita em etapas, em bancada, sem tentativa adicional em casa.",
      },
    ],
    proximosPassos: [
      {
        rotulo: "HD fazendo barulho",
        to: "/problemas/hd-fazendo-barulho",
        contexto: "O sintoma que muda a prioridade de conserto para preservação.",
      },
      {
        rotulo: "Verificador de backup",
        to: "/ferramentas/verificador-de-backup",
        contexto: "Como confirmar que a cópia realmente abre antes de confiar nela.",
      },
      {
        rotulo: "HD com ruído: o que fazer",
        to: "/decisoes/hd-com-ruido",
        contexto: "A ordem correta das decisões quando o disco já está falhando.",
      },
      {
        rotulo: "Recuperação de dados",
        to: "/servicos/recuperacao-de-dados",
        contexto: "Avaliação em etapas, priorizando o que ainda pode ser lido.",
      },
    ],
  },
  {
    temaId: "manutencao-preventiva",
    chamada:
      "Manutenção preventiva não é limpeza estética: é a diferença entre trocar pasta térmica e trocar placa.",
    contexto: [
      "Componentes eletrônicos envelhecem por temperatura e por variação elétrica. Poeira acumulada reduz a troca de calor; pasta térmica ressecada deixa de conduzir; fonte degradada entrega tensão instável. Nada disso quebra de uma vez — degrada, e a degradação aparece primeiro como perda de desempenho, depois como desligamento e só no fim como dano permanente.",
      "É o único tema em que agir antes do sintoma custa menos que agir depois. A janela em que o equipamento \"ainda funciona, mas esquenta\" é exatamente a janela em que a intervenção é barata.",
    ],
    sinais: [
      "Ventoinha em rotação alta constante, mesmo com o equipamento ocioso.",
      "Desempenho que cai depois de alguns minutos e volta ao normal após o desligamento.",
      "Desligamento repentino sob carga, sem tela de erro.",
      "Base do notebook ou lateral do gabinete perceptivelmente quente.",
      "Ruído novo: chiado, raspagem ou vibração que antes não existia.",
    ],
    verificar: [
      "Confira se as entradas e saídas de ar estão desobstruídas e se o equipamento está sobre superfície rígida.",
      "Observe se o desligamento acontece sempre sob a mesma carga — jogo, edição, videoconferência.",
      "Anote há quanto tempo o equipamento não recebe limpeza interna.",
      "Verifique se a instalação elétrica tem aterramento e se o equipamento compartilha filtro de linha antigo com outros aparelhos.",
    ],
    naoFazer: [
      "Usar ar comprimido de alta pressão travando a ventoinha: pode danificar o rolamento.",
      "Aplicar pasta térmica em excesso ou reaproveitar a antiga.",
      "Aspirar o interior com aspirador doméstico — a eletricidade estática é risco real.",
      "Adiar a limpeza porque \"ainda está funcionando\": esse é justamente o momento em que ela é barata.",
      "Religar um equipamento que exalou cheiro de queimado.",
    ],
    pausar: [
      "Cheiro de queimado, faísca ou estalo: desligue da tomada e não religue.",
      "Bateria inchada, deformando a carcaça ou o touchpad.",
      "Contato com líquido — corrosão avança por dias mesmo com o aparelho aparentando normalidade.",
    ],
    caminhos: [
      {
        rotulo: "Reparar",
        texto:
          "Limpeza interna, troca de pasta térmica, substituição de ventoinha e revisão de cabeamento devolvem o comportamento térmico de projeto.",
      },
      {
        rotulo: "Substituir",
        texto:
          "Fonte degradada, bateria que não sustenta carga e ventoinha com rolamento gasto são peças de desgaste: substituir é o procedimento correto, não o último recurso.",
      },
      {
        rotulo: "Escalar",
        texto:
          "Sinal de dano elétrico, líquido ou corrosão pede avaliação em bancada antes de qualquer nova tentativa de ligar.",
      },
    ],
    proximosPassos: [
      {
        rotulo: "Computador esquentando",
        to: "/problemas/computador-esquentando",
        contexto: "Como medir, o que a limpeza resolve e o que é limite de projeto.",
      },
      {
        rotulo: "Computador desliga sozinho",
        to: "/problemas/computador-desliga-sozinho",
        contexto: "Proteção térmica e fonte degradada se manifestam de formas diferentes.",
      },
      {
        rotulo: "Manutenção de computador",
        to: "/servicos/manutencao-de-computador",
        contexto: "Escopo da revisão preventiva e o que fica registrado no orçamento.",
      },
      {
        rotulo: "Thermal throttling no glossário",
        to: "/glossario/thermal-throttling",
        contexto: "Por que a máquina fica lenta em vez de desligar.",
      },
    ],
  },
  {
    temaId: "informatica-empresas",
    chamada:
      "Em ambiente com vários equipamentos, o custo relevante não é o do reparo: é o das horas em que a operação fica parada.",
    contexto: [
      "Um escritório é um sistema: rede, compartilhamento de arquivos, impressão, contas de e-mail, sistema de gestão e, cada vez mais, serviços na nuvem. Uma falha isolada em um posto tem impacto pequeno; uma falha compartilhada — rede, servidor de arquivos, autenticação — para todo mundo ao mesmo tempo.",
      "Por isso a lógica muda de reativa para preventiva: padronizar equipamento, manter inventário, ter cópia dos dados críticos e saber de antemão quem faz o quê quando algo cai vale mais do que qualquer intervenção rápida depois do problema.",
    ],
    sinais: [
      "A mesma falha aparece em vários postos ao mesmo tempo.",
      "Arquivos compartilhados abrindo lentos ou travando ao salvar.",
      "Impressora de rede que some periodicamente para alguns usuários.",
      "Equipamentos com idades, sistemas e configurações muito diferentes entre si.",
      "Ninguém sabe dizer onde está a cópia dos dados críticos — ou quando ela foi testada pela última vez.",
    ],
    verificar: [
      "Levante quantos equipamentos existem, quais sistemas rodam e quais são críticos para faturar.",
      "Confirme onde ficam os dados que a empresa não pode perder e quando a última restauração foi testada.",
      "Documente a rede: quem é o roteador, o que é fixo, o que é dinâmico e o que é compartilhado.",
      "Verifique se as contas de e-mail têm verificação em duas etapas — o e-mail corporativo é o alvo mais explorado.",
    ],
    naoFazer: [
      "Tratar backup como tarefa de alguém em particular, sem verificação periódica.",
      "Compartilhar uma única conta administrativa entre todos os usuários.",
      "Manter equipamentos sem atualização por medo de parar a operação — a parada não planejada custa mais.",
      "Trocar equipamento por equipamento sem padronização, criando um parque impossível de manter.",
    ],
    pausar: [
      "Suspeita de ransomware ou acesso indevido: isole o equipamento da rede antes de qualquer limpeza.",
      "Falha em servidor ou em armazenamento compartilhado que atende toda a operação.",
      "Perda de acesso a conta de e-mail corporativa ou a sistema de gestão.",
    ],
    caminhos: [
      {
        rotulo: "Reparar",
        texto:
          "Falha em posto isolado, impressão, perfil de usuário ou configuração de rede resolve-se no local, sem parar a operação.",
      },
      {
        rotulo: "Substituir",
        texto:
          "Equipamento fora de suporte, com peça indisponível ou incompatível com o sistema exigido pela operação, sai do parque de forma planejada.",
      },
      {
        rotulo: "Escalar",
        texto:
          "Incidente que afeta dados de clientes, autenticação ou continuidade do faturamento exige contenção antes de tentativa de correção.",
      },
    ],
    proximosPassos: [
      {
        rotulo: "Empresa de TI em Curitiba",
        to: "/empresa-de-ti-curitiba",
        contexto: "Como o atendimento a ambientes com vários equipamentos é organizado.",
      },
      {
        rotulo: "Todos os serviços",
        to: "/servicos",
        contexto: "Escopo por tipo de intervenção, com o que está incluído.",
      },
      {
        rotulo: "Atendimento remoto",
        to: "/atendimento-remoto",
        contexto: "O que dá para resolver sem deslocamento e o que não dá.",
      },
    ],
  },
  {
    temaId: "decisoes-compra-reparo",
    chamada:
      "A pergunta útil não é \"vale a pena consertar?\", e sim \"o que este reparo compra em tempo de uso e em risco evitado?\".",
    contexto: [
      "Toda decisão entre reparar, trocar peça e trocar equipamento envolve quatro variáveis observáveis: o custo do reparo, o valor de um equipamento equivalente, o tempo de uso adicional esperado e o risco de reincidência. Quando as três primeiras são conhecidas, a decisão deixa de ser palpite.",
      "Existe ainda um custo invisível que costuma decidir o caso: o custo de repetir. Duas intervenções sucessivas no mesmo sintoma custam mais do que um diagnóstico feito uma vez, e cada tentativa adicional em equipamento com falha física aumenta o risco de perder dados.",
    ],
    sinais: [
      "O mesmo sintoma voltou depois de uma intervenção recente.",
      "A peça necessária não está disponível ou depende de importação com prazo indefinido.",
      "A placa não suporta mais memória, ou o processador limita o uso pretendido.",
      "O equipamento acumula mais de uma falha simultânea — tela, bateria, teclado, armazenamento.",
      "A soma dos reparos se aproxima do valor de um equipamento equivalente.",
    ],
    verificar: [
      "Escreva o que o equipamento precisa fazer nos próximos dois anos — o uso pretendido define o critério.",
      "Levante o custo estimado do reparo completo, não só da peça mais óbvia.",
      "Compare com o valor de um equipamento equivalente, considerando a migração dos seus dados.",
      "Considere a idade e a disponibilidade de peças do modelo específico, não da categoria.",
      "Confirme que há backup antes de autorizar qualquer intervenção.",
    ],
    naoFazer: [
      "Autorizar reparo por etapas sem escopo, descobrindo o custo total só no fim.",
      "Decidir por \"é antigo\" ou \"é novo\": idade sozinha não é critério técnico.",
      "Trocar de equipamento antes de garantir a migração dos dados.",
      "Comprar peça usada de origem desconhecida para componente crítico de energia.",
    ],
    pausar: [
      "Existe dado importante sem cópia — resolva isso antes de qualquer decisão sobre a peça.",
      "O orçamento não deixa claro o que é peça e o que é mão de obra.",
      "Há suspeita de dano elétrico que possa se estender a outros componentes.",
    ],
    caminhos: [
      {
        rotulo: "Reparar",
        texto:
          "Falha única, peça disponível, equipamento adequado ao uso pretendido e sem histórico de reincidência: o reparo compra tempo de uso com previsibilidade.",
      },
      {
        rotulo: "Substituir",
        texto:
          "Falhas múltiplas, peça indisponível ou limite de plataforma: substituir componente ou equipamento evita pagar duas vezes pelo mesmo problema.",
      },
      {
        rotulo: "Escalar",
        texto:
          "Quando a decisão depende de medição — consumo, tensão, comportamento sob carga — o orçamento honesto só existe depois da avaliação.",
      },
    ],
    proximosPassos: [
      {
        rotulo: "Trocar o componente ou reparar",
        to: "/decisoes/trocar-componente-ou-reparar",
        contexto: "A matriz de decisão completa, com sinais dos dois lados.",
      },
      {
        rotulo: "Consertar ou substituir o equipamento",
        to: "/decisoes/consertar-ou-substituir",
        contexto: "Quando a conversa deixa de ser sobre a peça e passa a ser sobre a máquina.",
      },
      {
        rotulo: "Quando não compensa",
        to: "/quando-nao-compensa",
        contexto: "Os casos em que a resposta honesta é não contratar o serviço.",
      },
      {
        rotulo: "Preços e políticas",
        to: "/precos-e-politicas",
        contexto: "Valores de referência e regras de aprovação, sempre visíveis.",
      },
    ],
  },
];

export const aprofundamentoDoTema = (temaId: string): AtlasAprofundamento | undefined =>
  ATLAS_APROFUNDAMENTO.find((a) => a.temaId === temaId);

/** Todos os destinos internos declarados no aprofundamento (gates e testes). */
export function aprofundamentoTodosOsLinks(): string[] {
  return [...new Set(ATLAS_APROFUNDAMENTO.flatMap((a) => a.proximosPassos.map((p) => p.to)))];
}
