// ─────────────────────────────────────────────────────────────
// MICRO-RODADA LOCAL 2 — LOTE 4 DE BAIRROS ÂNCORA.
// 4 rotas JÁ EXISTENTES em /bairros/* que ainda rodavam com o
// BairroTemplate genérico (mesmo texto com topônimo trocado e promessa
// de "atendimento em 30-60 min"). Nenhuma rota nova.
// Proibido nesta camada: unidade/oficina no bairro, profissional fixo,
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
    metaTitle: "Técnico de informática no Boqueirão | PC, notebook e Wi-Fi",
    metaDescription:
      "Técnico de informática no Boqueirão, Curitiba: diagnóstico de PC e notebook, Wi-Fi, impressora, backup e formatação. Triagem antes de trocar peça.",
    h1: "Técnico de informática no Boqueirão – Curitiba",
    subtitulo:
      "Triagem para PC, notebook, rede e impressora com diagnóstico antes de formatar, trocar peça ou deslocar o equipamento.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Boqueirão, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "O Boqueirão é um bairro oficialmente atendido pela Regional Boqueirão de Curitiba, junto com Alto Boqueirão, Hauer e Xaxim. A Rua da Cidadania do Boqueirão fica na Avenida Marechal Floriano Peixoto, 8.430, na Praça Nossa Senhora do Carmo, integrada à estrutura do Terminal do Carmo. Essas referências públicas são usadas aqui apenas para localizar a cobertura; são marcos geográficos, não endereços de atendimento da marca no bairro.",
      "A página parte de uma regra simples: bairro define onde o atendimento pode acontecer, mas não define a causa do defeito. Um computador lento pode estar limitado por armazenamento, memória, temperatura ou software; uma impressora offline pode ter falha de comunicação sem qualquer defeito mecânico; e um Wi-Fi instável pode ser cobertura, canal, roteador, dispositivo ou conexão do provedor. Por isso, a primeira etapa é descrever o sintoma e separar essas hipóteses antes de sugerir formatação, compra ou troca de peça.",
    ],
    contextoLocal: [
      "Quando o computador está lento, a verificação começa pelo comportamento real da máquina. Se o sistema demora para iniciar e o uso de disco permanece alto, armazenamento entra na investigação. Se a lentidão aparece principalmente com navegador, planilhas ou videochamadas abertas ao mesmo tempo, memória precisa ser medida. Se o desempenho cai depois de alguns minutos e a ventoinha acelera, temperatura passa a ser uma hipótese. Essas causas podem produzir a mesma sensação de lentidão, mas pedem decisões diferentes.",
      "Em impressoras de rede, reinstalar o driver repetidamente não resolve uma configuração instável. Primeiro verificamos se a própria impressora conclui um teste interno, se continua conectada ao roteador, qual endereço de rede recebeu e se o computador aponta para a porta correta. Quando o equipamento funciona sozinho, mas some dos computadores, a investigação fica concentrada em comunicação, fila, porta e driver — não em troca de impressora.",
      "No Wi-Fi, o teste compara pontos e dispositivos. Se só um notebook perde conexão enquanto celular e televisão continuam normais, adaptador, driver e configuração de energia desse computador ganham prioridade. Se vários aparelhos falham no mesmo trecho do imóvel, posição do roteador, obstáculos, banda utilizada e distribuição do sinal passam a ser mais relevantes. Repetidor, mesh ou novo roteador só entram depois dessa separação.",
      "Formatação é tratada como decisão de manutenção, não como resposta automática. Antes de reinstalar Windows, conferimos arquivos, contas, chaves e o estado do armazenamento. Se houver indício de falha física no disco, insistir em reinstalação pode aumentar o risco para os dados. Nessa situação, a prioridade muda para preservação e diagnóstico do dispositivo.",
    ],
    logisticaLocal: [
      "Para atendimento no Boqueirão, o endereço completo é confirmado antes do agendamento. Referências como Avenida Marechal Floriano Peixoto, Praça Nossa Senhora do Carmo e Terminal do Carmo ajudam a desambiguar o ponto de atendimento, mas a modalidade é definida pelo defeito: suporte remoto quando a máquina liga e mantém conexão, visita quando o problema depende do ambiente e bancada quando exige desmontagem ou teste prolongado.",
      "Equipamentos com falha de energia, ausência de vídeo, superaquecimento, conector danificado ou armazenamento suspeito normalmente precisam de inspeção física. Já problemas de navegador, configuração, conta, parte das falhas de impressão e alguns erros do Windows podem começar remotamente. A triagem evita levar um desktop ou notebook para bancada quando o problema está na rede do local — e evita tentar resolver remotamente um defeito que exige medição física.",
      "Não há promessa fixa de chegada ou de conclusão associada ao bairro. Agenda, deslocamento e prazo são informados depois da triagem, conforme endereço, modalidade, complexidade e eventual necessidade de peça.",
    ],
    operacaoLocal: [
      "Descrever sintoma, equipamento e o que continua funcionando normalmente",
      "Separar software, armazenamento, memória, temperatura, rede e periféricos antes de indicar solução",
      "Conferir backup e estado do armazenamento antes de qualquer reinstalação",
      "Informar modalidade, escopo e valor antes da execução",
    ],
    atendimentoLocal: [
      "Computador ou notebook lento, travando ou demorando para iniciar",
      "Impressora offline, fila presa ou perda de comunicação na rede",
      "Wi-Fi instável, baixa cobertura ou dispositivo que perde conexão",
      "Windows, drivers, contas e programas com erro de configuração",
    ],
    coletaBancada: [
      "Notebook com superaquecimento, desligamentos ou necessidade de desmontagem",
      "SSD, HD, memória, fonte ou outro componente que exija teste físico",
      "Falhas intermitentes que precisam de medição e teste prolongado",
    ],
    publicoAtendido: [
      "Residências com PC ou notebook de uso diário",
      "Home office que depende de rede, webcam, áudio e periféricos",
      "Pequenos negócios que utilizam computador, impressora e Wi-Fi no atendimento",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-computador",
      "/servicos/manutencao-de-notebook",
      "/servicos/formatacao",
      "/servicos/redes-e-wifi",
      "/servicos/upgrade-ssd-ram",
    ],
    problemasRelacionados: [
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como separar armazenamento, memória, software e temperatura antes de comprar peça." },
      { to: "/problemas/impressora-nao-imprime", label: "Impressora não imprime", desc: "O que conferir em fila, porta, endereço de rede e comunicação antes de reinstalar tudo." },
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável", desc: "Como diferenciar falha do dispositivo, cobertura ruim e problema no roteador ou no link." },
      { to: "/problemas/computador-esquentando", label: "Computador esquentando", desc: "Sinais que justificam inspeção de ventilação, poeira, ventoinha e temperatura." },
    ],
    faqLocal: [
      { question: "Vocês atendem o Boqueirão, em Curitiba?", answer: "Sim, mediante disponibilidade e confirmação do endereço. O atendimento pode começar remotamente, ocorrer no local ou seguir por coleta para bancada, conforme o tipo de falha identificado na triagem." },
      { question: "Minha impressora está offline. Preciso trocar a impressora?", answer: "Não necessariamente. Se ela imprime o teste próprio, verificamos primeiro comunicação de rede, endereço, porta configurada, fila e driver. A troca só faz sentido quando o diagnóstico aponta defeito do equipamento." },
      { question: "Meu computador está lento. Formatar resolve?", answer: "Depende da causa. Armazenamento degradado, pouca memória e superaquecimento podem continuar causando lentidão depois da formatação. Por isso medimos o comportamento do equipamento antes de decidir pela reinstalação." },
      { question: "Dá para verificar o Wi-Fi sem comprar repetidor?", answer: "Sim. Primeiro comparamos outros aparelhos e pontos do imóvel, verificamos posição do roteador e identificamos se a falha é cobertura, dispositivo ou conexão principal. Equipamento adicional só é indicado quando o teste sustenta essa necessidade." },
      { question: "Quais referências ajudam a localizar o atendimento no Boqueirão?", answer: "O endereço completo é o principal dado. Como referências públicas do bairro, a Rua da Cidadania do Boqueirão, a Avenida Marechal Floriano Peixoto, a Praça Nossa Senhora do Carmo e o Terminal do Carmo ajudam a confirmar a região." },
    ],
  },

  // ── CAJURU (Curitiba) ───────────────────────────────────────
  cajuru: {
    slug: "cajuru",
    nome: "Cajuru",
    nomeLocativo: "no Cajuru",
    cidade: "Curitiba",
    areaName: "Cajuru, Curitiba",
    metaTitle: "Técnico de informática no Cajuru | Notebook, PC, SSD e backup",
    metaDescription:
      "Técnico de informática no Cajuru, Curitiba: diagnóstico de notebook e PC, SSD, memória, backup, Windows e Wi‑Fi. Triagem antes de formatar ou trocar peça.",
    h1: "Técnico de informática no Cajuru – Curitiba",
    subtitulo:
      "Diagnóstico de notebook, computador e rede para separar armazenamento, memória, sistema e conectividade antes de formatar ou fazer upgrade.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no Cajuru, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "O Cajuru integra a Regional Cajuru de Curitiba, ao lado de Capão da Imbuia, Guabirotuba, Jardim das Américas, Uberaba e Tarumã. A Rua da Cidadania do Cajuru fica na Avenida Prefeito Maurício Fruet, 2150, referência pública usada aqui apenas para situar a cobertura — não representa oficina ou unidade física da marca.",
      "Nesta página, o foco é preservar arquivos e diagnosticar a causa real da lentidão antes de decidir por formatação ou upgrade. Notebook lento, Windows instável, armazenamento quase cheio e Wi‑Fi irregular podem parecer o mesmo problema para quem usa a máquina, mas exigem testes diferentes.",
    ],
    contextoLocal: [
      "Quando o notebook trava ao abrir navegador, editor de texto e videochamada ao mesmo tempo, medimos memória, armazenamento e carga de programas. Pouca RAM, HD mecânico saturado, SSD degradado ou excesso de inicialização podem produzir sintomas parecidos; a decisão entre limpeza, SSD e memória só vem depois dessa separação.",
      "Antes de clonar ou substituir o armazenamento, verificamos a saúde do disco de origem e se existe backup utilizável. Se houver erro de leitura, lentidão extrema ou travamento durante cópia, a prioridade muda para preservar os dados antes de insistir em clonagem ou reinstalação.",
      "Quando aparecem pop-ups, páginas abrindo sozinhas ou extensões desconhecidas, o diagnóstico inclui navegador, programas instalados e contas sincronizadas. Remover apenas a extensão local pode não resolver se ela retornar pela sincronização da conta.",
      "Em Wi‑Fi, comparamos outros dispositivos. Se só o notebook falha, adaptador, driver e configuração de energia entram primeiro. Se vários aparelhos apresentam a mesma queda, roteador, cobertura, banda e conexão principal passam a ser investigados.",
    ],
    logisticaLocal: [
      "O endereço completo é confirmado antes do atendimento. Como referência pública, a Rua da Cidadania Cajuru fica na Avenida Prefeito Maurício Fruet, 2150, sede da Administração Regional.",
      "Configuração, navegador, contas e parte dos erros do Windows podem começar remotamente. Rede do imóvel, periféricos no ambiente e equipamentos que precisam ser testados juntos normalmente pedem visita. Falhas físicas, desmontagem e testes prolongados seguem para bancada.",
      "Não há promessa fixa de chegada ou conclusão vinculada ao bairro. Agenda, modalidade e prazo são definidos após a triagem conforme endereço, complexidade e eventual necessidade de peça.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp registrando equipamento, sintoma e arquivos que precisam ser preservados",
      "Medição de armazenamento e memória antes de indicar upgrade",
      "Conferência de backup antes de formatação, clonagem ou intervenção em disco",
      "Escopo, modalidade e valor informados antes da execução",
    ],
    atendimentoLocal: [
      "Notebook ou PC lento, travando ou reiniciando",
      "Windows, navegador, contas e programas com erro",
      "Wi‑Fi com queda ou falha em um dispositivo específico",
      "Preparação de backup antes de formatação ou migração",
    ],
    coletaBancada: [
      "Instalação de SSD e memória com avaliação do disco de origem",
      "Notebook com superaquecimento, conector, teclado ou tela danificada",
      "Tentativa de recuperação de dados em armazenamento com falha",
    ],
    publicoAtendido: [
      "Usuários de notebook para estudo, trabalho e uso diário",
      "Home office dependente de arquivos, navegador e videochamada",
      "Famílias com computador compartilhado e dados sem cópia recente",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-notebook",
      "/servicos/manutencao-de-computador",
      "/servicos/upgrade-ssd-ram",
      "/servicos/formatacao",
      "/servicos/redes-e-wifi",
      "/servicos/remocao-de-virus",
    ],
    problemasRelacionados: [
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como separar armazenamento, memória, software e temperatura antes de fazer upgrade." },
      { to: "/problemas/arquivos-apagados", label: "Arquivos apagados", desc: "O que evitar antes de tentar recuperar documentos importantes." },
      { to: "/problemas/computador-esquentando", label: "Computador esquentando", desc: "Sinais que justificam inspeção de ventilação, poeira e ventoinha." },
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável", desc: "Como distinguir falha de dispositivo, cobertura ruim e problema no roteador ou no link." },
    ],
    faqLocal: [
      { question: "Meu notebook trava quando abro muitas abas. Preciso de mais memória?", answer: "Pode ser memória, mas também pode ser armazenamento lento ou excesso de programas em segundo plano. Medimos esses pontos antes de indicar upgrade." },
      { question: "Vale colocar SSD sem formatar?", answer: "Quando o sistema e o disco de origem estão íntegros, a clonagem pode preservar programas e configurações. Se houver erro de leitura ou corrupção, a prioridade passa a ser backup e avaliação da mídia." },
      { question: "Os anúncios voltam depois da limpeza. Por quê?", answer: "Uma extensão pode retornar pela sincronização da conta ou existir junto com outro programa instalado. Por isso a limpeza precisa revisar navegador, programas e sincronização, não apenas remover o que aparece na tela." },
      { question: "O atendimento pode começar remotamente?", answer: "Sim, quando o equipamento liga e mantém conexão. Configuração, navegador e parte dos erros do Windows podem ser triados remotamente; falhas físicas e problemas que dependem do ambiente exigem visita ou bancada." },
      { question: "Qual referência ajuda a localizar o atendimento no Cajuru?", answer: "O endereço completo é sempre o principal dado. Como referência pública, a Rua da Cidadania Cajuru fica na Avenida Prefeito Maurício Fruet, 2150." },
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
