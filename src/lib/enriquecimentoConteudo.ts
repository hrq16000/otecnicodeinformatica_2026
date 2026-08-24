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

/**
 * Enriquecimento aplicável a uma página: base da Rodada 1 combinada com os
 * blocos da Rodada 4A (ATP). Nada é sobrescrito — apenas somado.
 */
export const enriquecimentoDe = (path: string) =>
  mesclarEnriquecimento(ENRIQUECIMENTO_1[path], ENRIQUECIMENTO_4A[path]);
