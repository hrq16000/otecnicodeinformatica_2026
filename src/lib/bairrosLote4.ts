// ─────────────────────────────────────────────────────────────
// MICRO-RODADA LOCAL 2 — LOTE 4 DE BAIRROS ÂNCORA.
// 4 rotas JÁ EXISTENTES em /bairros/* que ainda rodavam com o
// BairroTemplate genérico (mesmo texto com topônimo trocado e promessa
// de "atendimento em 30-60 min"). Nenhuma rota nova.
// Proibido nesta camada: unidade/oficina no bairro, técnico residente,
// endereço, tempo de chegada, distância em km, volume de clientes,
// avaliação local, SLA ou parceiro exclusivo.
// A indexabilidade é decidida em src/lib/localIndexPolicy.json.
// ─────────────────────────────────────────────────────────────
import type { BairroLocalData } from "@/lib/bairrosData";

export const BAIRROS_LOTE_4: Record<string, BairroLocalData> = {
  // ── BOQUEIRÃO (Curitiba) ────────────────────────────────────
  boqueirao: {
    slug: "boqueirao",
    nome: "Boqueirão",
    nomeLocativo: "no Boqueirão",
    cidade: "Curitiba",
    areaName: "Boqueirão, Curitiba",
    metaTitle: "Informática no Boqueirão: PC, notebook e impressora | Curitiba",
    metaDescription:
      "Atendimento de informática no Boqueirão, em Curitiba: computador travando, notebook lento, impressora que sumiu da rede e formatação com backup conferido. Triagem pelo WhatsApp.",
    h1: "Atendimento de informática no Boqueirão – Curitiba",
    subtitulo:
      "Bairro residencial extenso e com muito comércio de rua: aqui o primeiro passo é decidir entre remoto, visita e coleta antes de mover qualquer equipamento.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Boqueirão, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "O Boqueirão é uma das maiores regiões residenciais de Curitiba e mistura, no mesmo quarteirão, casa de família e comércio de rua. Isso faz com que dois tipos de chamado bem diferentes cheguem pelo mesmo canal: o computador de casa que começou a travar e a máquina de balcão que precisa voltar a imprimir hoje. Quem atende no Boqueirão precisa separar essas duas urgências logo na primeira mensagem, porque a decisão certa muda completamente — em uma o objetivo é não perder arquivo, na outra é reduzir o tempo parado.",
      "Por isso o atendimento começa por triagem escrita no WhatsApp: você descreve o que o equipamento faz, desde quando, se acontece o tempo todo ou só em um programa, e se alguém já mexeu antes. A partir daí definimos a modalidade plausível — acesso remoto quando a máquina liga e conecta, visita quando o problema depende do ambiente (rede, impressora, cabeamento) e coleta quando o caso é físico e precisa de bancada. O diagnóstico vem antes do valor, e a execução só acontece depois da sua aprovação.",
    ],
    contextoLocal: [
      "No comércio da região, o chamado mais repetido não é defeito de hardware: é impressora que sumiu da rede depois de uma atualização do Windows ou de troca de roteador. Quando a impressora está em IP dinâmico, qualquer reinício do roteador muda o endereço e todos os computadores perdem o dispositivo ao mesmo tempo. A correção definitiva é fixar o endereço e reinstalar o driver correto uma vez, em vez de reinstalar a impressora toda semana.",
      "Nas residências, o padrão é o desktop com cinco anos ou mais que ficou lento de forma progressiva. Antes de falar em peça nova, olhamos a saúde do disco, o consumo de memória em uso real e quantos programas sobem junto com o sistema. Disco mecânico com setores em degradação dá exatamente o mesmo sintoma que 'excesso de vírus' — e o tratamento é outro. Reinstalar sistema em disco doente só adia o problema e coloca seus arquivos em risco.",
      "Também aparece bastante o notebook usado no sofá ou na cama, com as entradas de ar tampadas, que desliga sozinho depois de alguns minutos. Nesse caso não adianta formatar: é limpeza interna, troca de pasta térmica e verificação da ventoinha, serviço de bancada com teste de temperatura sob carga antes da devolução.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp separando problema de disco, de sistema, de rede e de impressão",
      "Teste remoto sempre que a máquina liga e mantém conexão",
      "Diagnóstico antes do valor; execução somente após sua aprovação",
      "Backup conferido antes de qualquer formatação",
    ],
    atendimentoLocal: [
      "Computador de casa travando ou demorando para abrir programas",
      "Impressora que saiu da rede e não é mais reconhecida pelos PCs",
      "Formatação com salvamento dos arquivos e reinstalação do essencial",
      "Configuração de roteador e ajuste de cobertura de Wi-Fi",
    ],
    coletaBancada: [
      "Notebook que desliga por superaquecimento e precisa de limpeza interna",
      "Troca de SSD, memória ou fonte em desktop antigo",
      "Falhas intermitentes que exigem teste prolongado fora do local",
    ],
    publicoAtendido: [
      "Famílias com um computador compartilhado por adultos e estudantes",
      "Pequeno comércio de rua com PC de balcão e impressora",
      "Home office montado em cômodo da casa",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-computador",
      "/servicos/formatacao",
      "/servicos/upgrade-ssd-ram",
      "/servicos/redes-e-wifi",
    ],
    problemasRelacionados: [
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como distinguir lentidão de disco, de memória e de software antes de comprar peça." },
      { to: "/problemas/impressora-nao-imprime", label: "Impressora não imprime", desc: "O que verificar quando a impressora some da rede ou para de responder." },
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável", desc: "O que testar quando a conexão cai só em parte da casa ou da loja." },
    ],
    faqLocal: [
      { question: "Vocês atendem o comércio do Boqueirão?", answer: "Sim. Damos suporte ao PC do balcão, à impressora e à rede local de pequenos comércios, com foco em reduzir o tempo de parada. A prioridade é combinada na triagem, porque em loja o critério é voltar a operar." },
      { question: "Minha impressora sumiu da rede depois de uma atualização. Tem solução?", answer: "Tem, e normalmente sem trocar equipamento. Verificamos se o endereço da impressora mudou, fixamos a configuração e reinstalamos o driver adequado ao sistema em uso, para que a perda não se repita a cada reinício do roteador." },
      { question: "O atendimento pode ser feito sem visita?", answer: "Quando o computador liga e conecta à internet, boa parte dos casos de sistema, lentidão por software, configuração e navegador é resolvida por acesso remoto. Problema físico — fonte, tela, superaquecimento, disco com falha — precisa de visita ou coleta." },
      { question: "Preciso levar o equipamento até alguém?", answer: "Não necessariamente. Conforme o caso, o serviço acontece por acesso remoto, no endereço onde o equipamento está ou por coleta, com retirada e devolução combinadas por escrito antes." },
      { question: "Quanto custa o atendimento no Boqueirão?", answer: "A partir de R$ 99,99 quando aplicável. O valor final depende do equipamento, da modalidade, da complexidade e de eventuais peças, e é sempre informado e aprovado por você antes da execução." },
    ],
  },

  // ── CAJURU (Curitiba) ───────────────────────────────────────
  cajuru: {
    slug: "cajuru",
    nome: "Cajuru",
    nomeLocativo: "no Cajuru",
    cidade: "Curitiba",
    areaName: "Cajuru, Curitiba",
    metaTitle: "Técnico de informática no Cajuru | Notebook e estudo | Curitiba",
    metaDescription:
      "Cajuru, em Curitiba: notebook de estudo lento, formatação com backup, upgrade de SSD e memória, remoção de malware. Diagnóstico antes do valor, triagem pelo WhatsApp.",
    h1: "Técnico de informática no Cajuru – Curitiba",
    subtitulo:
      "Muitos chamados daqui envolvem notebook usado para estudo e trabalho ao mesmo tempo — máquina que não pode ficar dias parada e nem perder arquivo.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no Cajuru, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "No Cajuru, o equipamento que mais chega para avaliação é o notebook que faz tudo: aula, trabalho, prova, entrega de arquivo com prazo. Isso muda a ordem do atendimento. Antes de discutir peça ou reinstalação, a primeira pergunta é sempre o que não pode ser perdido e quando a máquina precisa estar de volta, porque um serviço bem feito no prazo errado atrapalha tanto quanto um serviço mal feito.",
      "A partir dessa resposta, a triagem pelo WhatsApp separa o que dá para tratar por acesso remoto no mesmo dia, o que exige visita ao endereço onde o notebook está e o que precisa ir para bancada. Em qualquer um dos caminhos, o diagnóstico vem antes do valor, o backup é conferido antes de formatar e você aprova o serviço sabendo o que será feito.",
    ],
    contextoLocal: [
      "O caso clássico do bairro é o notebook de entrada, com pouca memória e disco mecânico, que atende bem por dois ou três anos e depois passa a travar assim que o navegador abre várias abas junto com um editor de texto ou uma videochamada. Não é defeito: é limite de hardware somado a sistema sobrecarregado. Medimos o uso real de memória e a resposta do disco antes de recomendar qualquer compra, porque em parte dos casos o ganho vem de limpeza de inicialização e reinstalação limpa, sem gasto com peça.",
      "Quando a compra se justifica, o upgrade mais eficaz nesse perfil é SSD com clonagem do sistema e ampliação de memória, nessa ordem. O SSD resolve a espera de abertura e o travamento por leitura; a memória resolve o travamento por excesso de aplicativos abertos. Fazer os dois sem medir é gastar mais do que o necessário.",
      "O terceiro grupo de chamados é de navegador sequestrado: página inicial trocada, extensões que ninguém instalou conscientemente e anúncios abrindo sozinhos. Nesse cenário, a limpeza é feita com verificação das contas usadas para sincronizar o navegador — sem isso, a extensão volta na próxima sincronização e o problema parece 'nunca resolvido'.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp começando por prazo e pelos arquivos que não podem ser perdidos",
      "Medição de disco e memória antes de indicar upgrade",
      "Backup conferido antes de qualquer reinstalação de sistema",
      "Valor informado e aprovado por você antes da execução",
    ],
    atendimentoLocal: [
      "Notebook lento em uso de estudo e trabalho simultâneos",
      "Formatação com preservação de arquivos e reinstalação de programas essenciais",
      "Limpeza de navegador, extensões e programas indesejados",
      "Configuração de conta, sincronização e armazenamento em nuvem",
    ],
    coletaBancada: [
      "Instalação de SSD com clonagem do sistema e ampliação de memória",
      "Limpeza interna com troca de pasta térmica em notebook que aquece",
      "Teclado, dobradiça ou conector de energia com dano físico",
    ],
    publicoAtendido: [
      "Estudantes com um único notebook para aula e trabalho",
      "Profissionais que alternam home office e atividade presencial",
      "Famílias com computador compartilhado e arquivos importantes sem backup",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-notebook",
      "/servicos/upgrade-ssd-ram",
      "/servicos/formatacao",
      "/servicos/remocao-de-virus",
    ],
    problemasRelacionados: [
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "O que medir antes de decidir entre limpeza de sistema, SSD ou mais memória." },
      { to: "/problemas/arquivos-apagados", label: "Arquivos apagados", desc: "O que fazer antes de tentar recuperar documentos de estudo e trabalho." },
      { to: "/problemas/computador-esquentando", label: "Computador esquentando", desc: "Quando o aquecimento indica limpeza interna e troca de pasta térmica." },
    ],
    faqLocal: [
      { question: "Meu notebook trava quando abro muitas abas. É vírus?", answer: "Nem sempre. Esse sintoma costuma vir de memória insuficiente ou disco lento, não de infecção. Medimos o uso real de memória e a resposta do disco para dizer se o caso é ajuste de sistema, SSD, memória ou combinação." },
      { question: "Preciso do notebook para estudar. Fico sem ele quanto tempo?", answer: "Depende do serviço. Casos de sistema resolvidos por acesso remoto não tiram a máquina de você. Quando é bancada — SSD, limpeza interna, teclado —, combinamos retirada e devolução antes de começar, para você se organizar." },
      { question: "Vale mais comprar outro notebook ou fazer upgrade?", answer: "Isso se decide com a avaliação. Máquina com placa e tela em bom estado costuma responder muito bem a SSD e memória. Quando o custo do reparo se aproxima do valor de um equipamento equivalente, dizemos isso com clareza em vez de empurrar serviço." },
      { question: "Os anúncios voltam depois da limpeza. Por quê?", answer: "Geralmente porque a extensão está salva na conta usada para sincronizar o navegador e retorna no próximo login. Por isso a limpeza inclui revisar a sincronização, e não só desinstalar o que está visível na máquina." },
      { question: "Como peço um orçamento?", answer: "Pelo WhatsApp, descrevendo o equipamento e o sintoma. A partir daí indicamos a modalidade plausível e o que precisa ser verificado. O valor só é fechado depois do diagnóstico." },
    ],
  },

  // ── PINHEIRINHO (Curitiba) ──────────────────────────────────
  pinheirinho: {
    slug: "pinheirinho",
    nome: "Pinheirinho",
    nomeLocativo: "no Pinheirinho",
    cidade: "Curitiba",
    areaName: "Pinheirinho, Curitiba",
    metaTitle: "Técnico de informática no Pinheirinho | Wi‑Fi, PC e notebook",
    metaDescription:
      "Técnico de informática no Pinheirinho, Curitiba: diagnóstico de Wi‑Fi, PC e notebook, SSD, backup e formatação. Triagem antes de indicar equipamento.",
    h1: "Técnico de informática no Pinheirinho – Curitiba",
    subtitulo:
      "Diagnóstico de rede, computador e notebook para separar cobertura, configuração e falha física antes de comprar equipamento ou formatar.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Pinheirinho, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "Pinheirinho integra a Regional Pinheirinho de Curitiba, junto com Capão Raso, Fanny, Lindóia e Novo Mundo. A Rua da Cidadania Pinheirinho funciona anexa ao Terminal Pinheirinho, na Avenida Winston Churchill, 2033. Essas referências públicas são usadas apenas para situar a cobertura; não representam oficina ou unidade da marca.",
      "Nesta página, o bairro organiza a localização do atendimento. A causa do problema continua sendo definida pelos testes: Wi‑Fi fraco, notebook lento, computador travando e arquivos em risco exigem sequências de diagnóstico diferentes.",
    ],
    contextoLocal: [
      "Em Wi‑Fi, o primeiro passo é comparar o desempenho junto ao roteador e no ponto onde a falha aparece. Se vários aparelhos perdem qualidade no mesmo lugar, cobertura, obstáculos, banda utilizada e posicionamento do roteador entram na investigação. Se apenas um dispositivo falha, adaptador, driver e configuração desse equipamento ganham prioridade.",
      "Repetidor, mesh e segundo ponto cabeado resolvem cenários diferentes. Repetidor precisa receber sinal utilizável para retransmitir; mesh depende de posicionamento adequado entre os nós; cabeamento reduz a dependência do rádio quando existe caminho viável. A indicação vem depois do teste, não antes.",
      "Em computador ou notebook lento, armazenamento, memória, temperatura e software são avaliados separadamente. HD ou SSD degradado, pouca RAM, excesso de inicialização e superaquecimento podem produzir sintomas parecidos. Formatar sem identificar o gargalo pode mascarar a causa e aumentar o risco para os arquivos.",
      "Quando há ruído, erro de leitura, travamento durante cópia ou outro sinal de armazenamento suspeito, a prioridade muda para preservação de dados. Antes de reinstalar sistema ou insistir em testes pesados, verificamos o estado da mídia e a possibilidade de backup.",
    ],
    logisticaLocal: [
      "Como referência pública, a Rua da Cidadania e o Terminal Pinheirinho ficam na Avenida Winston Churchill, 2033, no Capão Raso, atendendo a Regional Pinheirinho. O endereço completo do cliente continua sendo necessário para confirmar o ponto de atendimento.",
      "Configuração, navegador, contas, parte dos erros do Windows e algumas falhas de impressão podem começar remotamente. Rede do imóvel, posição do roteador, cabeamento e dispositivos que precisam ser testados no ambiente normalmente exigem visita. Falhas físicas, desmontagem e testes prolongados seguem para bancada.",
      "Não existe promessa fixa de chegada vinculada ao bairro. Agenda, deslocamento e prazo são definidos após a triagem conforme endereço, modalidade, complexidade e eventual necessidade de peça.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp para separar link, cobertura, dispositivo e falha física",
      "Teste de sinal antes de indicar repetidor, mesh ou novo roteador",
      "Verificação do armazenamento antes de formatação ou clonagem",
      "Escopo, modalidade e valor informados antes da execução",
    ],
    atendimentoLocal: [
      "Wi‑Fi com baixa cobertura, queda ou desempenho irregular",
      "Computador ou notebook lento, travando ou reiniciando",
      "Windows, drivers e programas com falha de configuração",
      "Impressora e periféricos sem comunicação",
    ],
    coletaBancada: [
      "SSD, HD, memória, fonte ou outro componente que exija teste físico",
      "Notebook com superaquecimento, conector, teclado ou tela danificada",
      "Falhas intermitentes que exigem medição e teste prolongado",
    ],
    publicoAtendido: [
      "Residências com múltiplos dispositivos conectados à mesma rede",
      "Home office dependente de Wi‑Fi, webcam, áudio e periféricos",
      "Usuários de PC ou notebook que precisam preservar arquivos antes da manutenção",
    ],
    servicosPrioritarios: [
      "/servicos/redes-e-wifi",
      "/servicos/manutencao-de-computador",
      "/servicos/manutencao-de-notebook",
      "/servicos/upgrade-ssd-ram",
      "/servicos/formatacao",
    ],
    problemasRelacionados: [
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável", desc: "Como separar falha do dispositivo, cobertura ruim e problema no roteador ou no link." },
      { to: "/problemas/hd-fazendo-barulho", label: "HD fazendo barulho", desc: "Quando um sinal físico muda a prioridade para preservação dos dados." },
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como distinguir armazenamento, memória, software e temperatura antes de fazer upgrade." },
      { to: "/problemas/computador-esquentando", label: "Computador esquentando", desc: "Sinais que justificam inspeção de ventilação, poeira, ventoinha e temperatura." },
    ],
    faqLocal: [
      { question: "O Wi‑Fi não chega bem a um cômodo. Preciso trocar de plano?", answer: "Não necessariamente. Primeiro comparamos o desempenho junto ao roteador e no ponto de uso. Quando o link está normal perto do roteador e piora apenas com distância ou obstáculos, o problema é de distribuição do sinal, não de velocidade contratada." },
      { question: "Repetidor ou mesh: qual faz mais sentido?", answer: "Depende da medição. Repetidor exige sinal utilizável no ponto onde será instalado; mesh precisa de bom posicionamento entre os nós; cabeamento pode ser mais previsível quando existe caminho físico. A escolha vem depois do teste." },
      { question: "Meu computador é antigo. Vale formatar?", answer: "Só depois de verificar armazenamento, memória e temperatura. Se o disco estiver degradado, a prioridade passa a ser backup e avaliação da mídia; formatar não corrige uma falha física." },
      { question: "O atendimento pode começar remotamente?", answer: "Sim, quando a máquina liga e mantém conexão. Configuração, navegador, contas e parte dos erros do Windows podem ser triados remotamente; problemas de cobertura e falhas físicas exigem visita ou bancada." },
      { question: "Qual referência ajuda a localizar o atendimento no Pinheirinho?", answer: "O endereço completo é sempre o principal dado. Como referências públicas da regional, a Rua da Cidadania Pinheirinho e o Terminal Pinheirinho, na Avenida Winston Churchill, ajudam a confirmar a região." },
    ],
  },

  // ── CIDADE JARDIM (São José dos Pinhais) ────────────────────
  "cidade-jardim-sjp": {
    slug: "cidade-jardim-sjp",
    nome: "Cidade Jardim",
    nomeLocativo: "no Cidade Jardim",
    cidade: "São José dos Pinhais",
    areaName: "Cidade Jardim, São José dos Pinhais",
    metaTitle: "Técnico de informática no Cidade Jardim | São José dos Pinhais",
    metaDescription:
      "Cidade Jardim, em São José dos Pinhais: suporte a home office, conserto de notebook, formatação com backup e apoio ao PC de MEI e pequenos escritórios.",
    h1: "Técnico de informática no Cidade Jardim – São José dos Pinhais",
    subtitulo:
      "Atendimento para quem trabalha de casa em São José dos Pinhais: a máquina precisa voltar a funcionar sem interromper reunião, sistema ou entrega.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no Cidade Jardim, em São José dos Pinhais. Pode me orientar?",
    introducaoLocal: [
      "No Cidade Jardim, o chamado típico de informática nasce dentro de uma rotina de home office ou de um pequeno negócio operado de casa. É comum haver um notebook principal, uma impressora compartilhada e vários dispositivos disputando a mesma rede; por isso uma falha que parece “do computador” pode estar no Wi-Fi, no periférico ou em uma configuração que mudou depois de atualização.",
      "A triagem começa reconstruindo essa rotina: qual aplicativo precisa abrir, onde os arquivos estão salvos, se a impressora depende da rede e se existe outro equipamento para contingência. Esse mapa evita reinstalar o Windows por reflexo e ajuda a escolher entre suporte remoto, visita e bancada. Quando há risco para documentos de trabalho, a cópia dos dados vem antes de qualquer alteração no sistema.",
    ],
    contextoLocal: [
      "O sintoma mais comum nesse perfil é o computador que fica lento no meio do expediente, com áudio picotado e travamento em videochamada. Nem sempre a causa está na máquina: memória insuficiente para o navegador com muitas abas, antivírus duplicado consumindo processamento e Wi-Fi disputado com o restante da casa produzem exatamente o mesmo relato. A avaliação verifica os três antes de sugerir qualquer compra.",
      "O segundo grupo é de arquivo e continuidade. Muita gente trabalha com documentos salvos apenas na área de trabalho, sem cópia nenhuma. Antes de qualquer reinstalação, organizamos onde os arquivos estão, conferimos o backup e só então mexemos no sistema. Em máquina de trabalho, ficar sem os documentos é pior do que continuar lento por mais um dia.",
      "Também aparecem casos de periférico e sistema de terceiros: impressora fiscal, leitor, aplicativo de gestão ou certificado digital que deixou de ser reconhecido depois de uma atualização. Aqui o cuidado é não reinstalar o sistema por reflexo — muitas vezes o que se perdeu foi driver, permissão ou configuração, e formatar significaria refazer toda a instalação do software de trabalho sem necessidade.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp priorizando o que precisa voltar a funcionar primeiro",
      "Combinação prévia de horário para não interromper reunião ou expediente",
      "Backup e localização dos arquivos de trabalho conferidos antes de mexer no sistema",
      "Diagnóstico antes do valor; execução somente após sua aprovação",
    ],
    atendimentoLocal: [
      "Computador de home office lento ou travando em videochamada",
      "Reinstalação de sistema com preservação dos arquivos de trabalho",
      "Suporte a impressora, periférico e acesso a sistema de gestão",
      "Ajuste de rede para separar o uso de trabalho do uso doméstico",
    ],
    coletaBancada: [
      "Notebook de trabalho com falha física em tela, teclado ou conector de energia",
      "Instalação de SSD e memória com clonagem do sistema em uso",
      "Tentativa de recuperação de dados em disco com falha de leitura",
    ],
    publicoAtendido: [
      "Autônomos e MEI com escritório dentro de casa",
      "Pequenos escritórios com poucas estações de trabalho",
      "Famílias que dividem a mesma rede entre trabalho e lazer",
    ],
    servicosPrioritarios: [
      "/servicos/suporte-tecnico-empresarial",
      "/servicos/manutencao-de-notebook",
      "/servicos/recuperacao-de-dados",
      "/servicos/redes-e-wifi",
    ],
    problemasRelacionados: [
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "O que verificar quando a queda de desempenho aparece no meio do expediente." },
      { to: "/problemas/notebook-nao-carrega", label: "Notebook não carrega", desc: "Como identificar se o problema é fonte, conector ou bateria antes de comprar peça." },
      { to: "/problemas/windows-nao-inicia", label: "Windows não inicia", desc: "O que tentar antes de reinstalar o sistema em máquina de trabalho." },
    ],
    faqLocal: [
      { question: "Vocês atendem quem trabalha em casa no Cidade Jardim?", answer: "Sim, e esse é um dos perfis mais frequentes por aqui. O atendimento é organizado em torno do que precisa voltar a funcionar primeiro, com horário combinado antes para não atropelar reunião ou expediente." },
      { question: "Atendem MEI e pequenos escritórios?", answer: "Atendemos. O suporte cobre estações de trabalho, impressora, periférico e acesso a sistema de gestão, com registro do que foi verificado e executado em cada máquina." },
      { question: "Meu notebook precisa ir para bancada?", answer: "Só quando o caso é físico — tela, teclado, conector de energia, instalação de SSD, superaquecimento. Problemas de sistema, configuração e desempenho por software costumam ser resolvidos remotamente ou no próprio endereço." },
      { question: "Como fica o backup dos arquivos de trabalho?", answer: "Antes de qualquer reinstalação, localizamos os arquivos, fazemos a cópia e conferimos se ela está íntegra. Se o disco apresentar falha de leitura, avisamos antes de continuar, porque nesse cenário a cópia pode ser parcial." },
      { question: "Vocês fazem diagnóstico antes de cobrar o serviço?", answer: "Sim. O diagnóstico define o que será feito e o valor é informado antes da execução. Nada é executado sem a sua aprovação, e peças, quando necessárias, são apresentadas separadamente da mão de obra." },
    ],
  },
};
