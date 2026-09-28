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
    metaTitle: "Informática no Pinheirinho: Wi-Fi, PC e formatação | Curitiba",
    metaDescription:
      "Pinheirinho, em Curitiba: Wi-Fi que não cobre a casa, computador antigo lento, remoção de malware e formatação com backup. Avaliação antes de indicar peça ou equipamento.",
    h1: "Atendimento de informática no Pinheirinho – Curitiba",
    subtitulo:
      "Boa parte dos chamados do bairro começa pela rede: sinal que não chega em todos os cômodos e conexão que cai justamente durante a videochamada.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Pinheirinho, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "No Pinheirinho, uma parte grande dos atendimentos residenciais não começa no computador: começa na rede. Casa térrea com puxado nos fundos, sobrado com laje entre os andares e edícula usada como quarto ou escritório criam pontos onde o Wi-Fi simplesmente não chega com qualidade. O morador percebe o problema como 'internet ruim' e liga para o provedor, quando na maioria das vezes o link está entregando o contratado e a falha está na distribuição do sinal dentro do imóvel.",
      "Por isso, quando o relato é de conexão instável, a triagem pelo WhatsApp já separa link de cobertura. Medimos onde o sinal cai, verificamos onde o roteador está instalado e testamos se o problema aparece também com cabo. Só depois disso falamos em repetidor, mesh ou cabeamento — e frequentemente a solução começa por mudar o roteador de lugar, sem compra nenhuma.",
    ],
    contextoLocal: [
      "O roteador entregue pelo provedor costuma ficar onde o cabo entrou, e não onde o sinal é usado: atrás da TV, dentro de armário, em um canto da sala ou junto ao medidor. Nessa condição, o alcance cai antes mesmo de o sinal atravessar a primeira parede. Reposicionar o equipamento, separar as redes de 2,4 GHz e 5 GHz e ajustar o canal resolve boa parte dos relatos de queda sem gasto adicional.",
      "Quando o imóvel realmente não pode ser coberto por um único ponto, a indicação é feita com base no teste, não no catálogo: repetidor funciona bem em uma extensão curta e com bom sinal de origem; laje e distância maior pedem cabo até um segundo ponto ou sistema mesh. Instalar repetidor em local onde o sinal já chega fraco só replica o problema com nome novo.",
      "Do lado dos computadores, o perfil predominante é a máquina de uso doméstico com vários anos, disco mecânico e sistema nunca reinstalado, muitas vezes com programas indesejados acumulados. A ordem de trabalho é verificar a saúde do disco antes de qualquer formatação — se houver falha de leitura, a cópia dos arquivos pode ser parcial e isso precisa ser dito antes, não depois.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp separando link do provedor de cobertura interna",
      "Teste de sinal nos pontos onde o problema aparece, antes de indicar equipamento",
      "Verificação da saúde do disco antes de formatar",
      "Valor informado e aprovado por você antes da execução",
    ],
    atendimentoLocal: [
      "Configuração de roteador, canais e separação de redes 2,4 GHz e 5 GHz",
      "Avaliação de cobertura e indicação de repetidor, mesh ou cabeamento",
      "Formatação com backup conferido e reinstalação do essencial",
      "Remoção de programas indesejados, pop-ups e extensões no navegador",
    ],
    coletaBancada: [
      "Troca de SSD ou memória em desktop de uso doméstico",
      "Limpeza interna e troca de pasta térmica em máquina que desliga por temperatura",
      "Testes prolongados em equipamento com falha intermitente",
    ],
    publicoAtendido: [
      "Famílias em casas e sobrados com cômodos distantes do roteador",
      "Quem trabalha ou estuda por videochamada em cômodo dos fundos",
      "Usuários de computador doméstico antigo que ficou lento",
    ],
    servicosPrioritarios: [
      "/servicos/redes-e-wifi",
      "/servicos/manutencao-de-computador",
      "/servicos/formatacao",
      "/servicos/remocao-de-virus",
    ],
    problemasRelacionados: [
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável", desc: "Como separar problema de link do provedor de problema de cobertura dentro do imóvel." },
      { to: "/problemas/hd-fazendo-barulho", label: "HD fazendo barulho", desc: "Sinal de disco em degradação que muda a ordem do atendimento." },
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Quando a lentidão é disco, quando é memória e quando é só sistema sobrecarregado." },
    ],
    faqLocal: [
      { question: "O Wi-Fi não chega nos fundos da casa. Preciso trocar de plano?", answer: "Na maioria das vezes, não. Antes disso testamos se o link entrega o contratado junto ao roteador e onde exatamente o sinal cai. Quando o link está bom, o caso é de distribuição interna, e trocar de plano não muda nada." },
      { question: "Repetidor resolve?", answer: "Depende de onde ele for instalado. Repetidor precisa de sinal bom no ponto de instalação para funcionar; colocado onde já chega fraco, ele apenas repete um sinal ruim. Por isso a indicação vem depois do teste de cobertura." },
      { question: "Vocês configuram o roteador do provedor?", answer: "Sim. Ajustamos canal, separação de redes, senha e posicionamento do equipamento existente. Quando a estrutura do imóvel não permite cobertura com um único ponto, explicamos as opções e o que cada uma exige." },
      { question: "Meu computador é antigo. Vale formatar?", answer: "Vale quando o disco está saudável e o hardware ainda atende ao uso. Se o disco apresentar falha de leitura, avisamos antes, porque nesse caso a prioridade passa a ser salvar os arquivos e a decisão sobre o equipamento muda." },
      { question: "Qual o valor do atendimento no Pinheirinho?", answer: "A partir de R$ 99,99 quando aplicável. O valor final depende do equipamento, da modalidade, da complexidade e de eventuais peças, sempre aprovado por você antes." },
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
