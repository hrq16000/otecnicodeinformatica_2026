/**
 * Micro-Rodada Enriquecimento 1 — conteúdo autoral adicional para páginas
 * EXISTENTES que estavam superficiais.
 *
 * Regras desta rodada:
 *  - nenhuma URL nova, nenhuma mudança de intenção, canonical, robots ou index;
 *  - nada aqui é template: cada página tem títulos, tabela e blocos próprios;
 *  - páginas em coorte de observação (Local 2, Discovery 1, National 9B) ficam
 *    intocadas e NÃO aparecem neste mapa.
 */
import type { EnriquecimentoConteudo } from "./enriquecimento";

export const ENRIQUECIMENTO_1: Record<string, EnriquecimentoConteudo> = {
  /* ------------------------------------------------------------------ */
  /* PROBLEMA — arquivos apagados                                        */
  /* ------------------------------------------------------------------ */
  "/problemas/arquivos-apagados": {
    respostaRapida:
      "Arquivo apagado normalmente continua gravado no disco até que outro dado ocupe o mesmo espaço. Por isso o que mais define a chance de recuperação não é o programa usado, e sim quanto o equipamento foi usado depois da perda. Se os arquivos são importantes, o passo certo é parar de gravar naquela unidade — inclusive parar de instalar o programa de recuperação nela.",
    tabelaDiagnostica: {
      titulo: "Como a situação muda o caminho da recuperação",
      linhas: [
        {
          sintoma: "Apagou por engano e percebeu na hora",
          causa: "Exclusão lógica: a tabela de arquivos foi atualizada, o conteúdo continua no disco",
          verificar: "Lixeira, histórico de versões do Windows, pasta de sincronização em nuvem e backup existente antes de qualquer varredura",
        },
        {
          sintoma: "Sumiu depois de formatar ou reinstalar o sistema",
          causa: "Partição recriada; parte dos dados pode ter sido sobrescrita pelo próprio sistema novo",
          verificar: "Se o equipamento continuou em uso após a formatação — cada hora de uso reduz o que é recuperável",
        },
        {
          sintoma: "Pen drive ou cartão pede formatação ao conectar",
          causa: "Estrutura de arquivos corrompida, não perda de conteúdo",
          verificar: "Não aceitar a formatação sugerida; testar em outra porta e outro computador antes de qualquer ação",
        },
        {
          sintoma: "Disco lento, travando ou com barulho antes do sumiço",
          causa: "Falha física em curso — setores defeituosos ou mecânica comprometida",
          verificar: "Desligar o equipamento; leitura de SMART (autodiagnóstico do disco) só em bancada, com a unidade em modo leitura",
        },
        {
          sintoma: "Arquivos renomeados com extensão estranha e bilhete de resgate",
          causa: "Ransomware: os arquivos não foram apagados, foram cifrados",
          verificar: "Isolar o equipamento da rede antes de qualquer outra coisa e preservar as cópias cifradas",
        },
      ],
    },
    blocos: [
      {
        id: "urgencia-dados",
        titulo: "Qual é a urgência real do seu caso",
        intro:
          "Nem toda perda de arquivo é emergência, e tratar tudo como emergência atrapalha a decisão. O critério aqui é técnico: existe risco de o dado desaparecer para sempre nas próximas horas de uso?",
        itens: [
          {
            titulo: "Alta — pare de usar agora",
            desc: "Disco com ruído, travamentos ao ler pastas, sumiço após queda ou pico de energia, ou suspeita de ransomware. Cada nova gravação pode sobrescrever exatamente o setor que ainda guarda o arquivo. Desligue pelo botão e não ligue de novo até a avaliação.",
          },
          {
            titulo: "Média — não formate, mas dá para organizar",
            desc: "Exclusão acidental em máquina saudável, com uso leve depois. A chance é boa se o equipamento não for usado para downloads, atualizações e instalação de programas enquanto isso.",
          },
          {
            titulo: "Baixa — provavelmente há cópia",
            desc: "Arquivos que ficam em conta de e-mail, drive corporativo ou pasta sincronizada. Antes de falar em recuperação, vale conferir histórico de versões e a lixeira do próprio serviço, que guarda exclusões por um período.",
          },
        ],
      },
      {
        id: "logico-x-fisico",
        titulo: "Perda lógica e falha física exigem trabalhos diferentes",
        itens: [
          {
            titulo: "Perda lógica",
            desc: "A unidade funciona, é reconhecida e responde. Aqui o trabalho é de leitura e reconstrução de estrutura, feito com a unidade em modo somente leitura para não alterar nada. É a situação com melhor prognóstico.",
          },
          {
            titulo: "Falha física",
            desc: "A unidade não é reconhecida, esquenta demais, faz barulho repetitivo ou trava a leitura. Software de recuperação não ajuda e ainda pode agravar, porque insiste em ler uma peça que está se degradando. O caminho passa por avaliação de hardware e, dependendo do caso, por serviço especializado com sala limpa — que não realizamos internamente e é informado com clareza no laudo.",
          },
          {
            titulo: "Como diferenciar sem abrir nada",
            desc: "Conecte a unidade e observe: se o sistema reconhece, mostra o tamanho correto e navega em pastas mesmo devagar, o quadro tende a ser lógico. Se some da lista, aparece com tamanho errado ou trava o computador ao conectar, trate como falha física e pare.",
          },
        ],
      },
      {
        id: "expectativa-recuperacao",
        titulo: "O que esperar do resultado",
        itens: [
          {
            titulo: "Recuperação não é garantia",
            desc: "Qualquer promessa de 100% antes de avaliar a unidade é comercial, não técnica. O que se pode dizer com honestidade é o quanto ainda é legível e quais tipos de arquivo estão íntegros.",
          },
          {
            titulo: "Nome e pasta podem se perder mesmo com o arquivo íntegro",
            desc: "Quando a tabela de arquivos foi destruída, o conteúdo volta, mas com nome genérico e sem a organização original. Fotos e documentos costumam voltar; a estrutura de pastas nem sempre.",
          },
          {
            titulo: "Recuperado é copiado para outra mídia",
            desc: "Nunca se grava o resultado na mesma unidade de origem. É preciso ter um destino disponível — HD externo ou pen drive com espaço suficiente — para receber o que for recuperado.",
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* PROBLEMA — Wi-Fi instável                                           */
  /* ------------------------------------------------------------------ */
  "/problemas/wifi-instavel": {
    respostaRapida:
      "Wi-Fi que cai ou fica lento em parte do imóvel quase sempre é problema de cobertura ou de interferência, não de velocidade contratada. O teste que separa tudo é simples: se por cabo a conexão vai bem e sem fio não, o plano está entregando e a distribuição do sinal é que precisa ser corrigida.",
    tabelaDiagnostica: {
      titulo: "Sintoma, causa provável e o teste que confirma",
      linhas: [
        {
          sintoma: "Rápido perto do roteador, lento em um cômodo",
          causa: "Atenuação por parede, laje, espelho ou eletrodoméstico no caminho",
          verificar: "Medir a mesma velocidade nos dois pontos, com o mesmo aparelho e na mesma faixa de frequência",
        },
        {
          sintoma: "Conectado, mas nada abre",
          causa: "Falha entre roteador e provedor: DNS, IP não atribuído ou modem em modo incorreto",
          verificar: "Abrir um site pelo endereço IP e testar outro DNS; se o cabo também não navega, a falha é da entrada",
        },
        {
          sintoma: "Queda diária em horário parecido",
          causa: "Interferência de rede vizinha, reinício programado do roteador ou congestionamento do canal",
          verificar: "Anotar horários por três dias e comparar com o uso da vizinhança e com o horário de reinício do equipamento",
        },
        {
          sintoma: "Celular vai bem, notebook não",
          causa: "Adaptador antigo, driver desatualizado ou economia de energia desligando a placa de rede",
          verificar: "Testar o notebook por cabo e desativar a suspensão do adaptador de rede nas opções de energia",
        },
        {
          sintoma: "Piorou depois de instalar repetidor",
          causa: "Repetidor colocado onde o sinal já é fraco: repete sinal ruim e divide a banda",
          verificar: "Desligar o repetidor por um dia e comparar; se melhorar, o ponto de instalação está errado",
        },
      ],
    },
    blocos: [
      {
        id: "wifi-x-internet",
        titulo: "Wi-Fi lento não é a mesma coisa que internet lenta",
        intro:
          "Essa distinção resolve boa parte dos chamados antes mesmo da visita, porque muda quem precisa agir: você, o técnico ou o provedor.",
        itens: [
          {
            titulo: "Internet lenta",
            desc: "A queda aparece também com cabo ligado direto no modem, em qualquer aparelho e em qualquer cômodo. Aqui o assunto é com o provedor: link, atenuação óptica ou perfil de velocidade.",
          },
          {
            titulo: "Wi-Fi lento",
            desc: "Por cabo a velocidade é normal e sem fio não. O problema está na distribuição: posição do roteador, faixa usada, canal, quantidade de dispositivos ou obstáculos físicos.",
          },
          {
            titulo: "Aparelho lento",
            desc: "Só um dispositivo reclama enquanto os outros vão bem. Nesse caso a rede está saudável e a investigação vai para driver, adaptador ou processos consumindo banda naquele equipamento.",
          },
        ],
      },
      {
        id: "glossario-rede",
        titulo: "Três termos que aparecem em qualquer diagnóstico de rede",
        itens: [
          {
            titulo: "2,4 GHz e 5 GHz",
            desc: "Faixas de frequência do Wi-Fi. A de 2,4 GHz alcança mais longe e atravessa melhor paredes, mas é mais congestionada e mais lenta. A de 5 GHz é bem mais rápida e limpa, porém perde força com distância e obstáculo. Aparelho parado longe do roteador costuma trabalhar melhor em 2,4 GHz; notebook na mesma sala rende muito mais em 5 GHz.",
          },
          {
            titulo: "Canal",
            desc: "Subdivisão de cada faixa. Em prédio, dezenas de redes disputam os mesmos canais de 2,4 GHz e o resultado é lentidão com sinal cheio na tela. Redistribuir o canal costuma ser gratuito e resolver casos que pareciam exigir troca de plano.",
          },
          {
            titulo: "Mesh",
            desc: "Conjunto de pontos que se comportam como uma rede única, permitindo o aparelho trocar de ponto sem cair a conexão. É diferente de repetidor, que cria um salto extra. Mesh também depende de bom posicionamento e rende bem mais quando os pontos são ligados por cabo.",
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* PROBLEMA — Windows não inicia / 0xc0000428                          */
  /* ------------------------------------------------------------------ */
  "/problemas/windows-nao-inicia": {
    respostaRapida:
      "Na foto, o computador liga e chega ao Ambiente de Recuperação: portanto, o sintoma correto é “Windows não inicia”, não “PC não liga”. O código 0xc0000428 significa que o Windows não conseguiu validar o hash ou a assinatura de uma imagem carregada no boot; isso direciona a investigação para arquivo crítico, catálogo, driver, BCD/EFI e integridade da unidade, sem justificar formatação imediata.",
    tabelaDiagnostica: {
      titulo: "O que cada tela de inicialização realmente informa",
      colunas: { sintoma: "Mensagem ou estágio", causa: "O que já é possível concluir", verificar: "Próxima verificação segura", acao: "Quando interromper" },
      linhas: [
        {
          sintoma: "0xc0000428 — assinatura digital não pôde ser verificada",
          causa: "O gerenciador de boot rejeitou uma imagem cujo hash não foi localizado nos catálogos; arquivo corrompido, catálogo incoerente ou driver crítico incompatível são hipóteses, não conclusões",
          verificar: "Fotografar o caminho do arquivo citado, registrar a alteração anterior e abrir o WinRE pelo F1",
          acao: "Não manter a verificação de assinatura desativada; se a unidade está instável, preservar dados primeiro",
        },
        {
          sintoma: "Preparando Reparo Automático em ciclo",
          causa: "O Windows detectou falha de partida e o reparo automático não eliminou a causa",
          verificar: "Reparo de Inicialização uma vez; depois correlacionar com atualização, restauração e logs, em vez de repetir o ciclo",
          acao: "Parar se cada tentativa demora mais, se a unidade desaparece ou se há ruído anormal",
        },
        {
          sintoma: "No bootable device / dispositivo de inicialização ausente",
          causa: "O firmware não encontrou uma entrada inicializável; pode ser reconhecimento da unidade, ordem de boot ou partição EFI",
          verificar: "Confirmar no UEFI se o SSD/HD e o Windows Boot Manager aparecem, sem mudar modos por tentativa",
          acao: "Se a unidade some entre reinícios, não insistir nem reinstalar",
        },
        {
          sintoma: "Tela preta com cursor",
          causa: "A inicialização avançou além do firmware; shell, perfil, atualização e vídeo passam a ser mais relevantes que a assinatura do boot",
          verificar: "Configurações de Inicialização, Modo de Segurança e log de boot, quando disponíveis",
          acao: "Se surgirem erros de leitura ou travamentos, mudar a prioridade para a unidade e os dados",
        },
        {
          sintoma: "WinRE pede chave de recuperação",
          causa: "O volume está protegido pelo BitLocker e a ferramenta precisa desbloqueá-lo; isso não indica defeito",
          verificar: "Conta Microsoft, conta corporativa, impressão ou arquivo onde a chave foi salva; conferir o identificador exibido",
          acao: "Não apagar TPM, não formatar e não prosseguir sem a chave correspondente",
        },
        {
          sintoma: "Reinício antes da tela de login",
          causa: "Atualização, driver, memória e leitura da unidade continuam possíveis; o ciclo sozinho não separa software de hardware",
          verificar: "Momento do reinício, alteração recente, teste de memória e saúde/leitura da unidade",
          acao: "Interromper reinícios forçados repetidos e qualquer teste destrutivo",
        },
      ],
    },
    blocos: [
      {
        id: "significado-0xc0000428",
        titulo: "O significado técnico de 0xc0000428, sem alarmismo",
        intro: "A referência de códigos da Microsoft associa 0xC0000428 a STATUS_INVALID_IMAGE_HASH. É uma informação sobre validação no carregamento, não um diagnóstico completo do equipamento.",
        itens: [
          { titulo: "“Imagem” não quer dizer foto", desc: "No vocabulário do Windows, imagem é um arquivo executável carregado pelo sistema, como o gerenciador de boot, um componente do Windows ou um driver. O arquivo citado na tela é uma evidência mais específica que o texto genérico do erro." },
          { titulo: "Hash e assinatura cumprem papéis relacionados", desc: "O hash identifica o conteúdo exato do arquivo; a assinatura e os catálogos permitem verificar origem e integridade. Se o arquivo mudou, foi corrompido ou não corresponde ao catálogo esperado, a validação pode falhar." },
          { titulo: "Não é prova automática de malware", desc: "Adulteração é uma possibilidade prevista pelo status, mas atualização incompleta, corrupção e driver inadequado também produzem incompatibilidade. A conclusão depende do arquivo, da linha do tempo e da integridade do disco." },
          { titulo: "Também não condena o SSD", desc: "Uma unidade defeituosa pode corromper ou deixar de ler o arquivo, porém o código não contém um teste de saúde do armazenamento. Reconhecimento, SMART e comportamento de leitura precisam ser avaliados separadamente." },
        ],
      },
      {
        id: "camadas-inicializacao-windows",
        titulo: "Mapa das entidades envolvidas na partida do Windows",
        intro: "Localizar a camada que falhou impede que ferramentas corretas sejam aplicadas no alvo errado.",
        itens: [
          { titulo: "Firmware UEFI e Secure Boot", desc: "O UEFI reconhece os dispositivos e escolhe uma entrada de boot. O Secure Boot verifica componentes assinados no início da cadeia. Se a unidade nem aparece no firmware, ainda não é um problema de arquivo do Windows." },
          { titulo: "Partição EFI e Windows Boot Manager", desc: "Em instalações UEFI, uma partição pequena e separada guarda os arquivos de inicialização. O Windows Boot Manager lê a configuração BCD e encaminha a carga para a instalação correta." },
          { titulo: "BCD — Boot Configuration Data", desc: "O BCD descreve instalações, carregadores e parâmetros de partida. Entrada ausente ou apontando para volume errado pode impedir o boot mesmo quando os arquivos pessoais continuam intactos." },
          { titulo: "Kernel e drivers críticos de boot", desc: "Depois do gerenciador, o Windows carrega o kernel e drivers essenciais, inclusive os de armazenamento. Um componente inválido nessa fase pode gerar 0xc0000428 antes de existir tela de login ou acesso remoto." },
        ],
      },
      {
        id: "ordem-recuperacao-sem-formatar",
        titulo: "Ordem de recuperação que reduz risco e retrabalho",
        intro: "A sequência abaixo usa primeiro as opções reversíveis do Ambiente de Recuperação e preserva as ações avançadas para quando o diagnóstico já identificou o alvo.",
        itens: [
          { titulo: "1. Registrar a evidência e retirar mídia externa", desc: "Guarde foto do código e do arquivo citado, anote a última alteração e remova pendrives, cartões e HDs externos. Confirme apenas se a unidade interna aparece no UEFI e se a entrada Windows Boot Manager existe." },
          { titulo: "2. Preparar acesso ao BitLocker", desc: "Localize a chave antes de depender do volume. Ela pode estar na conta Microsoft, na organização que administra o aparelho, impressa ou em arquivo. O identificador da tela precisa corresponder à chave recuperada." },
          { titulo: "3. Usar Reparo de Inicialização", desc: "A ferramenta oficial procura problemas como arquivos de sistema danificados e BCD corrompido. Execute-a uma vez e registre o resultado; repetir sem mudança não acrescenta diagnóstico." },
          { titulo: "4. Reverter a mudança relacionada", desc: "Se o erro nasceu após atualização, use Desinstalar Atualizações. Se existe ponto anterior, a Restauração do Sistema devolve arquivos e configurações do sistema sem tratar documentos pessoais como alvo." },
          { titulo: "5. Isolar driver sem tornar o PC inseguro", desc: "Modo de Segurança, log de boot e a opção temporária para desabilitar imposição de assinatura ajudam a confirmar um driver. Se o sistema abrir, remova ou substitua o componente por uma versão oficial; não transforme o bypass em configuração permanente." },
          { titulo: "6. Só então reparar offline", desc: "Verificação offline dos arquivos do Windows e reconstrução do boot entram depois de identificar a instalação e a partição de sistema. Se o armazenamento está falhando, essa etapa espera pela cópia ou clonagem." },
        ],
      },
      {
        id: "ferramentas-avancadas-winre",
        titulo: "Por que comandos de internet podem piorar o boot",
        intro: "SFC e BCDBoot são ferramentas legítimas da Microsoft, mas dependem de contexto. O risco não está no nome do comando; está em aplicá-lo a letras e partições presumidas.",
        itens: [
          { titulo: "As letras mudam dentro do WinRE", desc: "A instalação que aparece como C: no uso normal pode receber outra letra na recuperação. Antes de SFC offline ou cópia de arquivos de boot, é necessário localizar a pasta Windows real e validar o volume." },
          { titulo: "BCDBoot precisa de origem e destino corretos", desc: "A ferramenta copia arquivos de inicialização de uma instalação do Windows para a partição de sistema e cria ou repara a loja BCD. Escolher o destino errado pode criar uma segunda entrada ou tornar outro sistema inacessível." },
          { titulo: "Bootrec não é receita universal para UEFI", desc: "Tutoriais antigos focam MBR/BIOS e misturam procedimentos com instalações UEFI/GPT. O esquema de partições e o modo de firmware precisam ser identificados antes de decidir qual ferramenta faz sentido." },
          { titulo: "DiskPart é inventário antes de ser alteração", desc: "Listar discos e volumes ajuda a mapear o cenário; clean, format e mudanças de partição são destrutivos. Nenhuma correção de 0xc0000428 começa apagando a estrutura que ainda contém o sistema e os dados." },
        ],
      },
      {
        id: "dados-bitlocker-e-disco",
        titulo: "Dados, BitLocker e saúde do armazenamento vêm antes do reparo",
        itens: [
          { titulo: "BitLocker protege contra acesso não autorizado", desc: "A criptografia é uma barreira deliberada, não uma falha do Windows. Sem a chave correta, um volume saudável pode continuar ilegível fora da instalação original; limpar TPM ou reinstalar não recria essa chave." },
          { titulo: "SMART ajuda, mas não encerra o diagnóstico", desc: "Indicadores do SSD ou HD, falhas de entrada e saída e tempo de resposta formam um conjunto. Um painel sem alerta não garante leitura perfeita, e um alerta não autoriza submeter a unidade a varredura intensa antes de preservar os arquivos." },
          { titulo: "Clonar e reparar têm objetivos diferentes", desc: "Clonagem tenta preservar o máximo legível em outra mídia; reparo altera estruturas para voltar a iniciar. Quando há risco físico, a cópia vem primeiro porque uma tentativa de correção pode consumir as últimas leituras úteis." },
          { titulo: "Formatação é uma decisão posterior", desc: "Reinstalar pode ser adequado quando a unidade está saudável, os dados estão conferidos e os reparos não são viáveis. Não é ferramenta diagnóstica e não corrige memória, firmware, cabo ou armazenamento defeituoso." },
        ],
        fecho: { antes: "Se o objetivo principal é preservar os arquivos antes de mexer no sistema, veja também ", to: "/problemas/arquivos-apagados", anchor: "como a prioridade muda quando existe risco para os dados", depois: "." },
      },
      {
        id: "secure-boot-2026-windows-10",
        titulo: "Contexto de 2026: certificados do Secure Boot e fim do Windows 10",
        intro: "Duas mudanças atuais merecem contexto, mas nenhuma deve ser usada como explicação automática para o 0xc0000428 da foto.",
        itens: [
          { titulo: "Certificados de 2011 começaram a expirar em 2026", desc: "A Microsoft está distribuindo certificados atualizados do Secure Boot. Segundo a orientação oficial, um dispositivo que ainda não recebeu as novas chaves continua iniciando e recebendo atualizações comuns; a expiração, sozinha, não prova a causa deste erro." },
          { titulo: "Desativar Secure Boot não é a correção padrão", desc: "A proteção reduz o risco de componentes não confiáveis antes do Windows. Alterá-la pode mudar o sintoma, mas também diminui a segurança e apaga uma pista do diagnóstico. A configuração original deve ser registrada e preservada." },
          { titulo: "Suporte comum ao Windows 10 terminou em 14/10/2025", desc: "Depois de recuperar a inicialização, uma máquina com Windows 10 precisa de decisão separada sobre Windows 11, ESU ou substituição. O fim de suporte afeta atualizações de segurança; não transforma automaticamente todo erro de boot em problema de versão." },
          { titulo: "Recuperar primeiro, atualizar com o sistema estável", desc: "Troca de versão, firmware e chaves de segurança não devem ser misturados a uma recuperação de dados em curso. Primeiro estabiliza-se o boot e confirma-se o backup; depois se planeja a atualização compatível com o hardware." },
        ],
      },
      {
        id: "cenarios-0xc0000428",
        titulo: "Os cenários em que o 0xc0000428 aparece — e o que cada um sugere",
        intro:
          "O código é o mesmo, mas o histórico das últimas horas muda completamente a hipótese mais provável. Antes de qualquer comando, vale reconstruir o que aconteceu imediatamente antes da primeira falha de inicialização.",
        itens: [
          {
            titulo: "Logo após uma atualização do Windows",
            desc: "Atualização interrompida por queda de energia, desligamento forçado ou disco cheio pode deixar um componente meio gravado. A imagem existe, mas o conteúdo não corresponde mais ao catálogo esperado. É o cenário com melhor prognóstico: Restauração do Sistema para um ponto anterior e desinstalação da atualização problemática pelo WinRE costumam resolver sem tocar nos dados.",
          },
          {
            titulo: "Depois de clonar o disco para um SSD novo",
            desc: "Clonagens feitas com a partição EFI incompleta, com alinhamento diferente ou com o disco de destino menor produzem um boot que aponta para arquivos que não estão exatamente onde o BCD indica. Aqui a correção é reconstruir os arquivos de inicialização na partição EFI correta — não reinstalar o Windows nem apagar o disco de origem, que ainda é a cópia de segurança.",
          },
          {
            titulo: "Depois de trocar HD por SSD ou mexer no UEFI",
            desc: "Mudança de modo do controlador (AHCI/RAID/Intel RST), alternância entre UEFI e Legacy/CSM ou reset das configurações de fábrica podem deixar o firmware carregando um caminho de boot antigo. A verificação começa no próprio UEFI, conferindo se o Windows Boot Manager aparece na lista, antes de qualquer comando dentro do WinRE.",
          },
          {
            titulo: "Depois de instalar driver, antivírus ou 'otimizador'",
            desc: "Drivers não assinados, ferramentas que alteram o boot e programas de ajuste agressivo podem inserir uma imagem que o Windows recusa a carregar. O caminho do arquivo exibido na tela normalmente aponta para o culpado; a remoção é feita pelo Modo de Segurança ou pelo prompt do WinRE, não desligando permanentemente a verificação de assinatura.",
          },
          {
            titulo: "Sem nenhuma alteração recente",
            desc: "Quando ninguém mexeu em nada, corrupção espontânea é rara e o armazenamento passa a ser o principal suspeito. Setores que deixaram de ser lidos corretamente entregam um arquivo diferente do original — mesmo código na tela, causa física. Nesse cenário a ordem se inverte: copiar os dados primeiro, reparar depois.",
          },
        ],
      },
      {
        id: "desktop-notebook-e-escalonamento",
        titulo: "Desktop, notebook e o momento de parar de tentar",
        itens: [
          {
            titulo: "No desktop, a variável extra é conexão",
            desc: "Cabo SATA solto, porta M.2 mal encaixada, fonte entregando tensão instável e bateria da placa descarregada fazem o firmware perder a entrada de boot entre um reinício e outro. Um sintoma que muda a cada partida aponta mais para contato elétrico do que para arquivo corrompido.",
          },
          {
            titulo: "No notebook, a variável extra é o próprio SSD",
            desc: "Modelos com SSD soldado, criptografia ativa de fábrica e firmware travado pelo fabricante limitam o que pode ser feito sem bancada. Insistir em comandos de reparo com um NVMe que já apresenta falhas de leitura reduz a chance de recuperar arquivos depois.",
          },
          {
            titulo: "Sinais de que o caso deixou de ser software",
            desc: "A unidade desaparece do UEFI de forma intermitente, o WinRE congela ao listar volumes, cada tentativa demora mais que a anterior, há cheiro de queimado ou ruído anormal. Qualquer um desses sinais interrompe o roteiro de comandos e transforma o caso em preservação de dados.",
          },
          {
            titulo: "Quando faz sentido chamar a assistência",
            desc: "Arquivos sem backup, volume com BitLocker sem chave em mãos, equipamento de trabalho que não pode ficar parado por tentativa e erro, ou duas tentativas de reparo já feitas sem mudança no sintoma. Levar o histórico do que já foi tentado encurta o diagnóstico e evita repetir passos de risco.",
          },
        ],
        fecho: {
          antes: "Se o quadro evoluiu para tela azul recorrente depois de voltar a iniciar, vale acompanhar também ",
          to: "/problemas/tela-azul",
          anchor: "o que os códigos de parada indicam quando o sistema já carrega",
          depois: ".",
        },
      },
    ],
    tabelaExtra: {
      titulo: "Ferramentas de reparo do boot: o que cada uma faz e qual é o risco",
      colunas: {
        sintoma: "Ferramenta",
        causa: "Para que serve de verdade",
        verificar: "Pré-requisito antes de usar",
        acao: "Risco e limite",
      },
      linhas: [
        {
          sintoma: "Reparo de Inicialização (WinRE)",
          causa: "Tentativa automática de corrigir os problemas mais comuns de partida, sem intervenção manual",
          verificar: "Executar uma única vez e ler o relatório gerado antes de repetir",
          acao: "Baixo risco; repetir em ciclo apenas mascara a causa e atrasa a preservação dos dados",
        },
        {
          sintoma: "Restauração do Sistema / desinstalar atualização",
          causa: "Voltar arquivos de sistema e configurações a um estado anterior à alteração que quebrou o boot",
          verificar: "Existir ponto de restauração ou atualização recente listada; documentos pessoais não são afetados",
          acao: "Baixo risco; programas instalados depois do ponto escolhido podem precisar de reinstalação",
        },
        {
          sintoma: "sfc /scannow (com /offbootdir e /offwindir no WinRE)",
          causa: "Verificar e substituir arquivos protegidos do Windows que estejam corrompidos",
          verificar: "Identificar corretamente a letra do volume do Windows dentro do WinRE, que muda em relação ao sistema em uso",
          acao: "Baixo risco de dados; sem efeito quando a origem é falha de leitura do disco",
        },
        {
          sintoma: "DISM /RestoreHealth",
          causa: "Reparar a imagem de componentes que abastece o SFC quando os próprios arquivos de origem estão danificados",
          verificar: "Executar depois do SFC e apontar para uma origem íntegra quando o sistema não a encontra",
          acao: "Demorado; em disco instável, a leitura intensa pode agravar uma falha física em curso",
        },
        {
          sintoma: "bootrec /scanos, /rebuildbcd e bcdboot",
          causa: "Reconstruir as entradas de inicialização e recriar os arquivos de boot na partição EFI",
          verificar: "Confirmar antes que o volume do Windows é legível e que a partição de sistema correta foi identificada",
          acao: "Altera a estrutura de boot: com a partição errada, o sistema pode deixar de aparecer — anotar o estado atual antes",
        },
        {
          sintoma: "bcdedit (nointegritychecks / testsigning)",
          causa: "Suspender temporariamente a exigência de assinatura para isolar qual componente está sendo recusado",
          verificar: "Usar apenas como teste de diagnóstico, com data e comando registrados",
          acao: "Reduz uma proteção real; manter desativado é decisão de segurança, não correção — reverter assim que o componente for identificado",
        },
        {
          sintoma: "chkdsk /f /r",
          causa: "Corrigir estruturas do sistema de arquivos e remapear setores com problema de leitura",
          verificar: "Só depois de confirmar que existe cópia dos arquivos importantes",
          acao: "Alto risco em disco doente: a varredura intensa pode inviabilizar leituras que ainda funcionavam",
        },
        {
          sintoma: "DiskPart clean / format / reinstalação",
          causa: "Recriar a estrutura do disco e instalar o sistema do zero",
          verificar: "Backup conferido, arquivo por arquivo, e diagnóstico já concluído",
          acao: "Destrutivo e irreversível; nunca é passo de diagnóstico para 0xc0000428",
        },
      ],
    },

    fontes: [
      { titulo: "Microsoft — códigos NTSTATUS (0xC0000428 / STATUS_INVALID_IMAGE_HASH)", url: "https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-erref/596a1078-e883-4972-9bbc-49e60bebca55", nota: "Definição oficial do código exibido na tela." },
      { titulo: "Microsoft Support — Windows Recovery Environment", url: "https://support.microsoft.com/en-us/windows/experience/backup-recovery/windows-recovery-environment", nota: "Ferramentas disponíveis no WinRE e observação sobre BitLocker." },
      { titulo: "Microsoft Support — Startup Repair", url: "https://support.microsoft.com/en-us/windows/experience/startup-boot/startup-repair", nota: "Escopo e acesso ao Reparo de Inicialização." },
      { titulo: "Microsoft Support — Windows Startup Settings", url: "https://support.microsoft.com/en-us/windows/experience/startup-boot/windows-startup-settings", nota: "Modo de Segurança, log de boot e desativação temporária da imposição de assinatura." },
      { titulo: "Microsoft Support — System Restore", url: "https://support.microsoft.com/en-us/windows/experience/backup-recovery/system-restore", nota: "Restauração de arquivos e configurações do sistema para um ponto anterior." },
      { titulo: "Microsoft Support — localizar a chave de recuperação do BitLocker", url: "https://support.microsoft.com/en-us/windows/security/encryption/find-your-bitlocker-recovery-key", nota: "Locais oficiais em que a chave pode estar armazenada." },
      { titulo: "Microsoft Learn — BCDBoot Command-Line Options", url: "https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/bcdboot-command-line-options-techref-di", nota: "Finalidade da ferramenta de criação e reparo dos arquivos de boot." },
      { titulo: "Microsoft Learn — System File Checker (SFC)", url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/sfc", nota: "Referência oficial da verificação de arquivos protegidos do sistema." },
      { titulo: "Microsoft Learn — solução avançada de problemas de inicialização", url: "https://learn.microsoft.com/en-us/troubleshoot/windows-client/performance/windows-boot-issues-troubleshooting", nota: "Fluxo técnico por fases do processo de boot." },
      { titulo: "Microsoft Support — expiração e atualização de certificados do Secure Boot", url: "https://support.microsoft.com/en-us/servicing/os/secure-boot/2026/02/when-secure-boot-certificates-expire-on-windows-devices", nota: "Contexto oficial para dispositivos em 2026." },
      { titulo: "Microsoft Support — fim do suporte ao Windows 10", url: "https://support.microsoft.com/en-us/windows/deployment/updates-lifecycle/windows-10-support-has-ended-on-october-14-2025", nota: "Ciclo de suporte após a recuperação do equipamento." },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* SOLUÇÃO — backup                                                    */
  /* ------------------------------------------------------------------ */
  "/solucoes/backup": {
    respostaRapida:
      "Backup só conta como backup quando existe em mais de um lugar e já foi restaurado pelo menos uma vez em teste. Cópia na mesma máquina protege contra apagamento acidental, mas não contra roubo, queima da fonte, ransomware ou falha do próprio disco — que são justamente os casos em que o arquivo faz falta.",
    blocos: [
      {
        id: "backup-resolve",
        titulo: "O que o backup protege e o que ele não protege",
        itens: [
          {
            titulo: "Protege contra perda por falha e por engano",
            desc: "Disco que morre, sistema que não inicia, arquivo sobrescrito, notebook furtado, formatação feita às pressas. Nesses casos a restauração devolve o trabalho sem depender de recuperação de dados.",
          },
          {
            titulo: "Protege contra ransomware — se estiver desconectado",
            desc: "Programas de sequestro de arquivos cifram tudo que a máquina enxerga, inclusive o HD externo plugado no momento. Uma cópia que fica fora do alcance da máquina é a diferença entre incidente e prejuízo.",
          },
          {
            titulo: "Não substitui diagnóstico nem manutenção",
            desc: "Backup não conserta equipamento lento, não corrige superaquecimento e não impede a próxima falha. Ele reduz a consequência, não a causa.",
          },
          {
            titulo: "Não cobre o que nunca foi incluído",
            desc: "A falha mais comum não é a cópia falhar, é a pasta certa nunca ter entrado na rotina: e-mails locais, favoritos, arquivos de sistemas de gestão, banco de dados e áreas de trabalho de outros usuários do computador.",
          },
        ],
      },
      {
        id: "backup-321",
        titulo: "A regra 3-2-1 aplicada a um caso doméstico e a um escritório",
        intro:
          "A referência clássica é manter três cópias, em dois tipos de mídia diferentes, sendo uma fora do local. Na prática ela se traduz de formas bem distintas conforme o volume e a criticidade.",
        itens: [
          {
            titulo: "Casa: fotos, documentos e trabalho pessoal",
            desc: "Arquivo original no computador, cópia automática em nuvem para o que muda todo dia e um HD externo atualizado periodicamente e guardado desconectado. Volume é pequeno; o risco maior é acumular anos sem nunca verificar se a cópia abre.",
          },
          {
            titulo: "Escritório: sistema de gestão e arquivos compartilhados",
            desc: "Além da cópia diária, é preciso definir quanto tempo de trabalho a empresa aceita perder e em quanto tempo precisa voltar a operar. Essas duas respostas definem a frequência da rotina e se ela pode ser só em nuvem ou também local, para restaurar rápido sem depender de link de internet.",
          },
          {
            titulo: "Versionamento importa mais do que espaço",
            desc: "Guardar apenas a última cópia significa que um arquivo corrompido ou cifrado ontem sobrescreveu a versão boa. Manter versões anteriores por alguns dias resolve o cenário mais desagradável: descobrir o problema depois da sincronização.",
          },
        ],
      },
      {
        id: "backup-teste",
        titulo: "O teste de restauração é a parte que quase ninguém faz",
        itens: [
          {
            titulo: "Restaure um arquivo aleatório por mês",
            desc: "Abrir um documento antigo direto da cópia mostra em segundos se a rotina está viva. Rotina que dá erro há semanas normalmente só é descoberta no dia da emergência.",
          },
          {
            titulo: "Confira a data, não o ícone verde",
            desc: "Programas de backup mostram estado de sucesso mesmo quando a pasta monitorada foi movida ou renomeada. A data do último arquivo salvo é a informação confiável.",
          },
          {
            titulo: "Backup antes de formatar é conferido, não presumido",
            desc: "Na nossa rotina de formatação, a cópia é validada abrindo amostras antes de qualquer apagamento. É essa conferência que separa uma reinstalação tranquila de uma perda definitiva.",
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* SOLUÇÃO — SSD                                                       */
  /* ------------------------------------------------------------------ */
  "/solucoes/ssd": {
    respostaRapida:
      "Trocar HD por SSD é o upgrade que mais muda a sensação de uso em máquina antiga: inicialização, abertura de programas e resposta do sistema deixam de esperar uma peça mecânica. Mas SSD não corrige superaquecimento, defeito de placa-mãe, memória insuficiente para o uso nem infecção — se o sintoma é travamento aleatório ou desligamento, o diagnóstico vem antes da peça.",
    blocos: [
      {
        id: "sata-x-nvme",
        titulo: "SSD SATA e SSD NVMe: qual faz diferença no seu caso",
        intro:
          "Os dois são SSD e os dois eliminam o gargalo mecânico. A diferença está na via de comunicação com a placa-mãe — e nem toda máquina aceita a mais rápida.",
        itens: [
          {
            titulo: "SSD SATA",
            desc: "Usa a mesma conexão do HD tradicional, no formato 2,5 polegadas. Compatível com praticamente qualquer desktop ou notebook das últimas duas décadas. É o salto que resolve o problema de lentidão na maioria dos casos: sai de milissegundos de espera mecânica para resposta imediata.",
          },
          {
            titulo: "SSD NVMe",
            desc: "Encaixa direto na placa-mãe, em um conector M.2, e conversa pelas linhas PCIe. Entrega taxas muito maiores em transferência de arquivos grandes. Exige que a placa tenha o conector no padrão certo — existem slots M.2 que só aceitam SATA.",
          },
          {
            titulo: "Na prática do dia a dia",
            desc: "Para ligar o computador, abrir navegador, pacote de escritório e sistemas de gestão, a diferença percebida entre SATA e NVMe é pequena. Ela aparece em edição de vídeo, cópia de arquivos muito grandes e cargas de trabalho pesadas. Pagar por NVMe em uma máquina que só usa escritório raramente se justifica.",
          },
        ],
      },
      {
        id: "ssd-expectativa",
        titulo: "O que muda e o que continua igual depois da troca",
        itens: [
          {
            titulo: "Muda: tempo de inicialização e de abrir programas",
            desc: "É onde o disco mecânico consumia mais tempo. Máquina que levava minutos para ficar utilizável passa a estar pronta em segundos.",
          },
          {
            titulo: "Muda pouco: desempenho em jogos e edição pesada",
            desc: "Carregamento fica mais rápido, mas quadros por segundo dependem de processador, memória e placa de vídeo. SSD não é upgrade de desempenho gráfico.",
          },
          {
            titulo: "Não muda: falta de memória RAM",
            desc: "Se a máquina trava com muitas abas e programas abertos, o gargalo é memória. Com pouca RAM o sistema recorre ao disco como apoio — o SSD suaviza, mas o correto é medir o uso real de memória antes de escolher a peça.",
          },
          {
            titulo: "Não muda: defeito de hardware",
            desc: "Desligamento sozinho, tela azul recorrente, travamento com barulho de cooler acelerado. Esses sintomas apontam para alimentação, temperatura ou memória, e trocar o disco só adia o diagnóstico.",
          },
        ],
      },
      {
        id: "ssd-decisao",
        titulo: "Quando o upgrade compensa e quando é melhor não investir",
        itens: [
          {
            titulo: "Compensa",
            desc: "Equipamento com processador ainda adequado ao uso, tela e teclado em bom estado, bateria funcional e disco mecânico como único gargalo. É a situação em que uma peça de custo controlado devolve anos de uso.",
          },
          {
            titulo: "Merece conversa antes",
            desc: "Máquina que já apresenta outros sinais — dobradiça quebrada, carcaça trincada, superaquecimento constante. O SSD vai funcionar, mas o equipamento pode parar por outro motivo logo depois. O laudo mostra o conjunto para a decisão ser consciente.",
          },
          {
            titulo: "Vale considerar substituição",
            desc: "Quando o custo somado de disco, memória e reparo se aproxima do valor de um equipamento em melhor estado, e o uso exige desempenho que a plataforma antiga não entrega. Aqui não existe regra fechada: idade, disponibilidade de peça e importância do equipamento pesam junto.",
          },
          {
            titulo: "A migração preserva o sistema quando é seguro",
            desc: "Na maioria dos casos o sistema é clonado para o SSD e você reencontra tudo como estava. Se o sistema de origem já está corrompido ou infectado, clonar leva o problema junto — nesse cenário indicamos instalação limpa com restauração dos seus arquivos.",
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* EQUIPAMENTO — notebook                                              */
  /* ------------------------------------------------------------------ */
  "/equipamentos/notebook": {
    respostaRapida:
      "No notebook, o mesmo sintoma muda de causa conforme o que acontece nos primeiros segundos depois do botão de ligar. Existe LED aceso? Tem ruído de ventoinha? Aparece o logotipo do fabricante? Essas três respostas já separam falha de alimentação, falha de inicialização e falha de imagem — que exigem trabalhos completamente diferentes.",
    tabelaDiagnostica: {
      titulo: "Do sintoma observado à hipótese técnica",
      linhas: [
        {
          sintoma: "Nenhum LED, nenhum som ao pressionar o botão",
          causa: "Alimentação: carregador, conector de energia ou circuito de carga",
          verificar: "LED do carregador, outro carregador compatível e se o aparelho reage sem a bateria, apenas na tomada",
        },
        {
          sintoma: "Liga, ventoinha gira, tela permanece preta",
          causa: "Memória mal encaixada, falha de vídeo ou tela/cabo flat",
          verificar: "Conectar um monitor externo: se a imagem aparece nele, o problema está na tela ou no cabo, não na placa de vídeo",
        },
        {
          sintoma: "Desliga sozinho depois de alguns minutos",
          causa: "Dissipação comprometida — pasta térmica ressecada ou cooler obstruído",
          verificar: "Se acontece mais rápido em uso pesado e se a saída de ar está quente com pouco fluxo",
        },
        {
          sintoma: "Lentidão constante, disco em uso 100%",
          causa: "Disco mecânico no fim da vida útil ou memória insuficiente para o uso atual",
          verificar: "Tempo para ficar utilizável após ligar e se a lentidão persiste com poucos programas abertos",
        },
        {
          sintoma: "Bateria dura minutos ou não carrega",
          causa: "Célula degradada, carregador subdimensionado ou controle de carga",
          verificar: "Se funciona normalmente ligado na tomada e se o percentual salta de forma irregular",
        },
      ],
    },
    blocos: [
      {
        id: "notebook-verificar",
        titulo: "Verificações seguras que você pode fazer antes de acionar suporte",
        intro:
          "Nada aqui exige abrir o equipamento. São checagens que reduzem o tempo de diagnóstico e, em alguns casos, resolvem sozinhas.",
        itens: [
          {
            titulo: "Descarregue a energia residual",
            desc: "Desligue, retire o carregador e, quando a bateria for removível, retire também. Segure o botão de ligar por cerca de vinte segundos, recoloque e tente novamente. Resolve travamentos em que o aparelho parece morto.",
          },
          {
            titulo: "Teste com monitor externo",
            desc: "Ligue um monitor ou televisão pela saída de vídeo. É o teste que separa tela quebrada de falha de placa em poucos minutos.",
          },
          {
            titulo: "Observe a temperatura e o fluxo de ar",
            desc: "Coloque a mão perto da saída de ar em uso normal. Ar muito quente saindo fraco indica dissipador entupido. Notebook sobre cama ou sofá tapa a entrada de ar e provoca desligamento.",
          },
          {
            titulo: "Anote a mensagem de erro exata",
            desc: "Códigos de tela azul, avisos de ausência de dispositivo de inicialização ou beeps na ligação são pistas objetivas. Uma foto da tela vale mais que a descrição de memória.",
          },
        ],
      },
      {
        id: "notebook-upgrade",
        titulo: "Upgrades que realmente mudam o uso do notebook",
        itens: [
          {
            titulo: "SSD",
            desc: "O maior ganho percebido em máquina com disco mecânico. Muda inicialização e abertura de programas — não muda desempenho gráfico nem corrige superaquecimento.",
          },
          {
            titulo: "Memória RAM",
            desc: "Resolve travamento com muitas abas e programas simultâneos. Depende do que a placa aceita e de quantos encaixes existem; em vários modelos finos a memória é soldada e não permite ampliação.",
          },
          {
            titulo: "Limpeza com troca de pasta térmica",
            desc: "Manutenção, não upgrade — mas em máquina que desliga sozinha devolve estabilidade e evita perda de desempenho por redução automática de velocidade do processador quando ele esquenta demais.",
          },
          {
            titulo: "Processador e placa de vídeo",
            desc: "Em notebook, na prática, não são substituíveis: são soldados ou dependem de plataforma específica. Quando o gargalo é esse, a conversa passa a ser sobre substituição do equipamento, não upgrade.",
          },
        ],
      },
      {
        id: "notebook-reparar",
        titulo: "Reparar ou substituir: o que pesa na conta",
        intro:
          "Não existe regra fixa por idade. O que decide é a relação entre custo do reparo viável, estado geral e o quanto o equipamento ainda atende ao uso.",
        itens: [
          {
            titulo: "Custo da peça e disponibilidade",
            desc: "Tela, teclado e bateria de modelos populares costumam ter reposição acessível. Peças de linhas descontinuadas podem custar mais que o equipamento vale e demorar para chegar.",
          },
          {
            titulo: "Estado da estrutura",
            desc: "Dobradiça quebrada, carcaça trincada e conector de energia frouxo tendem a voltar. Um reparo isolado em máquina com estrutura comprometida costuma render pouco tempo de tranquilidade.",
          },
          {
            titulo: "Risco de recorrência",
            desc: "Reparo em placa após líquido derramado ou curto tem prognóstico diferente de troca de peça padrão. Isso é dito no laudo antes de qualquer aprovação, não depois.",
          },
          {
            titulo: "Importância dos dados",
            desc: "Mesmo quando o reparo não compensa, quase sempre vale recuperar o conteúdo do disco antes de descartar ou dar o equipamento como perda.",
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* EQUIPAMENTO — roteador                                              */
  /* ------------------------------------------------------------------ */
  "/equipamentos/roteador": {
    respostaRapida:
      "O roteador é responsável por distribuir a internet, não por trazê-la. Quando ele falha, o sintoma aparece como queda intermitente, lentidão apenas sem fio ou aparelhos que conectam e não navegam. Antes de trocar o equipamento, vale confirmar se o que chega ao imóvel está saudável: com cabo direto no modem, a conexão se comporta bem?",
    tabelaDiagnostica: {
      titulo: "Comportamento do equipamento e o que ele indica",
      linhas: [
        {
          sintoma: "Precisa reiniciar o roteador todo dia",
          causa: "Superaquecimento, fonte enfraquecida ou memória do equipamento saturada",
          verificar: "Temperatura da carcaça, ventilação ao redor e há quanto tempo o aparelho está em serviço contínuo",
        },
        {
          sintoma: "Sinal cheio, navegação lenta",
          causa: "Canal congestionado ou muitos dispositivos disputando a mesma faixa",
          verificar: "Comparar a velocidade em 5 GHz e em 2,4 GHz no mesmo ponto e contar quantos aparelhos estão conectados",
        },
        {
          sintoma: "Luz de internet apagada ou vermelha",
          causa: "Falha na entrada do provedor ou no cabo entre modem e roteador",
          verificar: "Encaixe dos conectores e se o modem sozinho, por cabo, navega normalmente",
        },
        {
          sintoma: "Rede some e volta sozinha",
          causa: "Fonte de alimentação instável ou conflito de endereços na rede",
          verificar: "Se a queda coincide com uso de eletrodoméstico pesado e se há mais de um equipamento distribuindo endereços",
        },
        {
          sintoma: "Só um cômodo sem sinal",
          causa: "Cobertura, não defeito do equipamento",
          verificar: "Distância, paredes e se há caixa metálica, espelho grande ou quadro elétrico no caminho",
        },
      ],
    },
    blocos: [
      {
        id: "roteador-operadora",
        titulo: "Equipamento da operadora e roteador próprio: quando cada um basta",
        itens: [
          {
            titulo: "O combo da operadora resolve",
            desc: "Imóvel compacto, poucos aparelhos, uso doméstico comum. Nessas condições o equipamento entregue na instalação costuma dar conta, e trocar por outro não traz ganho real.",
          },
          {
            titulo: "Vale acrescentar equipamento próprio",
            desc: "Imóvel com laje, sobrado, muitas paredes ou grande quantidade de dispositivos simultâneos. Aqui o ganho vem de distribuir o sinal em mais de um ponto — preferencialmente ligado por cabo — e não de comprar um roteador único mais caro.",
          },
          {
            titulo: "Cuidado com equipamento duplicado",
            desc: "Manter o roteador da operadora ativo junto com outro distribuindo endereços cria duas redes concorrentes no mesmo espaço. É causa frequente de queda intermitente depois de uma compra bem-intencionada.",
          },
        ],
      },
      {
        id: "roteador-fim-de-vida",
        titulo: "Sinais de que o equipamento chegou ao limite",
        intro:
          "Roteador não avisa que está velho: ele passa a apresentar comportamentos que costumam ser confundidos com problema de internet.",
        itens: [
          {
            titulo: "Só estabiliza depois de reiniciar",
            desc: "Quando o reinício diário virou rotina, normalmente há degradação de fonte ou aquecimento. Substituir a fonte pode resolver casos assim, e é mais barato que trocar tudo.",
          },
          {
            titulo: "Não oferece a faixa de 5 GHz",
            desc: "Equipamentos antigos operam só em 2,4 GHz. Em prédio, essa faixa costuma estar tomada pelas redes vizinhas, e o limite deixa de ser do imóvel para ser do aparelho.",
          },
          {
            titulo: "Sem atualização de firmware disponível",
            desc: "Firmware é o programa interno do roteador. Modelo sem atualização há anos acumula falhas conhecidas de segurança e não recebe correção — motivo técnico legítimo para substituição.",
          },
          {
            titulo: "Cai quando muitos aparelhos conectam",
            desc: "Modelos de entrada têm limite prático bem abaixo do anunciado. Casa com TVs, celulares, câmeras e assistentes chega nesse teto sem perceber.",
          },
        ],
      },
    ],
  },
};

/** Busca o enriquecimento por caminho canônico da página. */
import { ENRIQUECIMENTO_4A, mesclarEnriquecimento } from "./enriquecimentoAtp4a";
import { ENRIQUECIMENTO_4B } from "./enriquecimentoAtp4b";

/**
 * Enriquecimento aplicável a uma página: base da Rodada 1 combinada com os
 * blocos das Rodadas 4A e 4B (ATP). Nada é sobrescrito — apenas somado.
 */
export const enriquecimentoDe = (path: string) =>
  mesclarEnriquecimento(
    mesclarEnriquecimento(ENRIQUECIMENTO_1[path], ENRIQUECIMENTO_4A[path]),
    ENRIQUECIMENTO_4B[path],
  );
