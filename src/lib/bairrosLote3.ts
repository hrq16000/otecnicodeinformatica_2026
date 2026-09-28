// ─────────────────────────────────────────────────────────────
// MICRO-RODADA LOCAL 1 — LOTE 3 DE BAIRROS ÂNCORA.
// 4 rotas JÁ EXISTENTES em /bairros/* que estavam com conteúdo raso
// (template com topônimo trocado e promessa de tempo de deslocamento).
// Nenhuma rota nova. Conteúdo autoral por bairro.
// Proibido nesta camada: unidade/oficina no bairro, técnico residente,
// endereço, tempo de chegada, distância em km, volume de clientes,
// avaliação local, SLA ou parceiro exclusivo.
// A indexabilidade é decidida em src/lib/localIndexPolicy.json.
// ─────────────────────────────────────────────────────────────
import type { BairroLocalData } from "@/lib/bairrosData";

export const BAIRROS_LOTE_3: Record<string, BairroLocalData> = {
  // ── XAXIM (Curitiba) ────────────────────────────────────────
  xaxim: {
    slug: "xaxim",
    nome: "Xaxim",
    nomeLocativo: "no Xaxim",
    cidade: "Curitiba",
    areaName: "Xaxim, Curitiba",
    metaTitle: "Informática no Xaxim: notebook, PC e Wi-Fi | Curitiba",
    metaDescription:
      "Atendimento de informática no Xaxim, em Curitiba: notebook lento, PC que trava, formatação com backup e Wi-Fi que não cobre a casa. Triagem pelo WhatsApp.",
    h1: "Atendimento de informática no Xaxim – Curitiba",
    subtitulo:
      "Bairro de casas e sobrados onde a maior parte dos chamados começa com uma máquina de uso diário que ficou lenta — e nem sempre precisa de peça nova.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Xaxim, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "O Xaxim é uma região majoritariamente residencial de Curitiba, com casas, sobrados e prédios baixos, e é isso que define o perfil dos chamados que chegam daqui. Quase sempre existe um único computador que sustenta tudo ao mesmo tempo: trabalho de quem ficou em home office, tarefa escolar, acesso bancário e streaming. Quando essa máquina fica lenta ou trava, a casa inteira sente, e a pressa costuma levar a decisões ruins — comprar peça sem diagnóstico, reinstalar sistema sem backup ou aceitar orçamento por telefone.",
      "Por isso, o atendimento aqui começa por conversa e não por deslocamento. Na triagem pelo WhatsApp descrevemos junto o que a máquina faz, há quanto tempo, se o problema aparece só em um programa ou o tempo todo, e se o equipamento já foi aberto antes. Muita coisa nesse perfil de chamado é resolvida remotamente; o que sobra vira visita ou coleta, com a avaliação sempre antes do valor.",
    ],
    contextoLocal: [
      "O caso mais frequente no bairro é o computador de mesa ou notebook com cinco anos ou mais, disco mecânico e sistema nunca reinstalado. Nessa combinação, a lentidão não é sintoma de vírus na maioria das vezes: é o disco não dando conta das leituras que o Windows atual exige. A verificação começa pela saúde do armazenamento e pelo consumo de memória em uso real, porque trocar por SSD sem antes confirmar isso é gastar dinheiro no palpite de outra pessoa.",
      "O segundo bloco de chamados é de rede. Casa com laje, cômodos nos fundos e edícula faz o sinal cair justamente onde alguém trabalha ou estuda. Antes de indicar repetidor, medimos onde o sinal enfraquece de fato e verificamos se o roteador do provedor está em um canto sem circulação, atrás da TV ou dentro de armário. Em boa parte dos casos, mudar o ponto e ajustar a configuração já muda a experiência sem compra de equipamento.",
      "Aparece também, com regularidade, o notebook que desliga sozinho depois de alguns minutos ligado. Em máquina usada em casa, com tapete, cama ou sofá bloqueando a entrada de ar, o superaquecimento tem causa mecânica: dissipador saturado e pasta térmica ressecada. Esse caso é de bancada, não de reinstalação de sistema.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp separando problema de disco, de sistema e de rede",
      "Teste remoto quando a máquina liga e conecta à internet",
      "Diagnóstico antes do valor; execução somente após sua aprovação",
      "Backup conferido antes de qualquer formatação",
    ],
    atendimentoLocal: [
      "Computador lento em uso doméstico, com avaliação de disco e memória",
      "Configuração de roteador e ajuste de cobertura de Wi-Fi na casa",
      "Formatação com salvamento de arquivos e reinstalação de programas essenciais",
      "Remoção de pop-ups, extensões e programas indesejados no navegador",
    ],
    coletaBancada: [
      "Notebook que desliga por superaquecimento e precisa de limpeza interna",
      "Troca de SSD ou de memória em desktop antigo",
      "Tela, dobradiça ou teclado de notebook com dano físico",
    ],
    publicoAtendido: [
      "Famílias com um computador compartilhado por vários usuários",
      "Home office montado em quarto ou sala de casa",
      "Estudantes com notebook de uso diário",
    ],
    servicosPrioritarios: [
      "/servicos/upgrade-ssd-ram",
      "/servicos/formatacao",
      "/servicos/manutencao-de-notebook",
      "/servicos/redes-e-wifi",
    ],
    problemasRelacionados: [
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como separar lentidão de disco, de memória e de software antes de comprar peça." },
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável", desc: "O que testar quando o sinal cai só em parte da casa." },
      { to: "/problemas/computador-esquentando", label: "Computador esquentando", desc: "Sinais de superaquecimento que indicam limpeza interna e troca de pasta térmica." },
    ],
    faqLocal: [
      { question: "Meu PC no Xaxim ficou lento. Preciso trocar de computador?", answer: "Na maior parte dos casos, não. Antes disso verificamos a saúde do disco, o uso de memória e o estado do sistema. Máquina com disco mecânico costuma responder muito melhor após troca por SSD, e isso é decidido na avaliação, não por telefone." },
      { question: "Dá para resolver sem visita?", answer: "Se o computador liga e conecta à internet, boa parte dos casos de sistema, lentidão por software, configuração e navegador se resolve por acesso remoto. Problema físico — tela, fonte, superaquecimento, disco com falha — precisa de visita ou coleta." },
      { question: "Vocês fazem backup antes de formatar?", answer: "Sim, e conferimos o backup antes de apagar qualquer coisa. Se o disco estiver com falha de leitura, avisamos antes, porque nesse cenário a cópia pode ser parcial e a decisão muda." },
      { question: "O Wi-Fi não chega nos fundos da casa. Vocês resolvem?", answer: "Avaliamos onde o sinal cai, a posição do roteador e o tipo de construção. A indicação pode ser mudança de ponto, ajuste de configuração, repetidor ou cabeamento — só recomendamos equipamento quando o teste mostra que é necessário." },
      { question: "Quanto custa o atendimento no Xaxim?", answer: "A partir de R$ 99,99 quando aplicável. O valor final depende do equipamento, da modalidade, da complexidade e de peças, e é sempre informado e aprovado por você antes da execução." },
    ],
  },

  // ── SÍTIO CERCADO (Curitiba) ────────────────────────────────
  "sitio-cercado": {
    slug: "sitio-cercado",
    nome: "Sítio Cercado",
    nomeLocativo: "no Sítio Cercado",
    cidade: "Curitiba",
    areaName: "Sítio Cercado, Curitiba",
    metaTitle: "Técnico de informática no Sítio Cercado | PC, notebook e backup",
    metaDescription:
      "Técnico de informática no Sítio Cercado, Curitiba: diagnóstico de PC e notebook, impressora, backup, Windows e Wi‑Fi. Triagem antes da execução.",
    h1: "Técnico de informática no Sítio Cercado – Curitiba",
    subtitulo:
      "Diagnóstico de computador, notebook, rede e periféricos com preservação de dados antes de formatar, trocar peça ou alterar o ambiente.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no Sítio Cercado, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "O Sítio Cercado integra a Regional Bairro Novo de Curitiba, junto com Ganchinho e Umbará. A Administração Regional funciona na Rua da Cidadania Bairro Novo, na Rua Tijucas do Sul, 1700, no próprio Sítio Cercado. Essa referência pública serve para situar a cobertura e não representa oficina ou unidade física da marca.",
      "Nesta página, o foco é separar problema de sistema, armazenamento, rede e periféricos antes de qualquer intervenção. Computador de uso diário que não imprime, notebook lento e arquivos que sumiram podem interromper a rotina pelo mesmo sintoma aparente, mas exigem sequências de diagnóstico diferentes.",
    ],
    contextoLocal: [
      "Quando a impressora deixa de responder, verificamos se o próprio equipamento conclui um teste interno, qual endereço recebeu, qual porta está configurada no computador e se a fila está presa. Quando vários computadores perdem a mesma impressora, rede e comunicação ganham prioridade sobre troca de hardware.",
      "Em Windows lento ou instável, medimos armazenamento, memória, temperatura e programas de inicialização antes de recomendar formatação. Se o disco apresenta erro de leitura ou travamento durante cópia, insistir em reinstalação pode aumentar o risco para os dados.",
      "Quando arquivos foram apagados ou desapareceram após uma falha, a orientação técnica muda: reduzir o uso do armazenamento evita novas gravações sobre os dados. A possibilidade de recuperação depende do tipo de mídia, do que aconteceu depois e do estado físico do dispositivo; não há garantia de resultado.",
      "Em Wi‑Fi, comparamos outros aparelhos antes de alterar o roteador. Se apenas um computador perde conexão, adaptador e driver desse equipamento entram primeiro. Se vários dispositivos falham no mesmo ponto, cobertura, posição do roteador, banda e conexão principal passam a ser investigados.",
    ],
    logisticaLocal: [
      "O endereço completo é confirmado antes do atendimento. Como referência pública, a Rua da Cidadania Bairro Novo fica na Rua Tijucas do Sul, 1700, no Sítio Cercado.",
      "Configuração, navegador, contas e parte dos erros do Windows podem começar remotamente. Rede do local, impressora e dispositivos que precisam ser testados no ambiente normalmente pedem visita. Falhas físicas, desmontagem e tentativas de recuperação de dados seguem para bancada.",
      "Não existe promessa fixa de chegada ou conclusão vinculada ao bairro. Agenda, modalidade e prazo são definidos após a triagem conforme endereço, impacto da falha, complexidade e eventual necessidade de peça.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp registrando equipamento, sintoma e arquivos importantes",
      "Separação entre software, armazenamento, rede, periféricos e falha física",
      "Conferência de backup antes de formatação ou intervenção em disco",
      "Escopo, modalidade e valor informados antes da execução",
    ],
    atendimentoLocal: [
      "Computador ou notebook lento, travando ou reiniciando",
      "Impressora e scanner sem comunicação",
      "Windows, navegador, contas e programas com erro",
      "Wi‑Fi com queda ou falha em um dispositivo específico",
    ],
    coletaBancada: [
      "SSD, HD, memória, fonte ou outro componente que exija teste físico",
      "Notebook com falha de energia, aquecimento, tela ou conector",
      "Tentativa de recuperação de dados em armazenamento com falha",
    ],
    publicoAtendido: [
      "Residências com computador ou notebook de uso diário",
      "Home office dependente de arquivos, internet e periféricos",
      "Pequenos negócios com computador, impressora e dados de operação",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-computador",
      "/servicos/manutencao-de-notebook",
      "/servicos/redes-e-wifi",
      "/servicos/formatacao",
      "/servicos/recuperacao-de-dados",
      "/servicos/suporte-tecnico-empresarial",
    ],
    problemasRelacionados: [
      { to: "/problemas/impressora-nao-imprime", label: "Impressora não imprime", desc: "O que verificar em fila, porta, driver e rede antes de substituir equipamento." },
      { to: "/problemas/arquivos-apagados", label: "Arquivos apagados", desc: "O que evitar antes de tentar recuperar documentos importantes." },
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como separar armazenamento, memória, software e temperatura antes de fazer upgrade." },
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável", desc: "Como distinguir falha de dispositivo, cobertura ruim e problema no roteador ou no link." },
    ],
    faqLocal: [
      { question: "A impressora sumiu de todos os computadores. Pode ser rede?", answer: "Sim. Quando vários computadores perdem o mesmo dispositivo, verificamos endereço, porta, fila e comunicação de rede antes de concluir por falha física." },
      { question: "Apaguei arquivos importantes. Ainda dá para recuperar?", answer: "Pode haver tentativa de recuperação, mas não existe garantia. Evite novas gravações no armazenamento e faça a avaliação antes de instalar programas ou copiar arquivos para o mesmo disco." },
      { question: "Meu computador está lento. Formatar resolve?", answer: "Depende da causa. Armazenamento degradado, pouca memória e superaquecimento podem continuar causando lentidão depois da formatação. Por isso medimos o equipamento antes de decidir pela reinstalação." },
      { question: "O atendimento pode começar remotamente?", answer: "Sim, quando o equipamento liga e mantém conexão. Configuração, navegador e parte dos erros do Windows podem ser triados remotamente; rede do ambiente e falhas físicas exigem visita ou bancada." },
      { question: "Qual referência ajuda a localizar o atendimento no Sítio Cercado?", answer: "O endereço completo é sempre o principal dado. Como referência pública, a Rua da Cidadania Bairro Novo fica na Rua Tijucas do Sul, 1700, no Sítio Cercado." },
    ],
  },

  // ── AVIAÇÃO (São José dos Pinhais) ──────────────────────────
  aviacao: {
    slug: "aviacao",
    nome: "Aviação",
    nomeLocativo: "no bairro Aviação",
    cidade: "São José dos Pinhais",
    areaName: "Aviação, São José dos Pinhais",
    metaTitle: "Técnico de informática no Aviação | PC, notebook, rede e backup",
    metaDescription:
      "Técnico de informática no bairro Aviação, São José dos Pinhais: diagnóstico de PC e notebook, rede, impressora, backup e Windows. Triagem antes da execução.",
    h1: "Técnico de informática no bairro Aviação – São José dos Pinhais",
    subtitulo:
      "Diagnóstico de computador, notebook e rede para reduzir indisponibilidade sem formatar ou trocar equipamento antes de identificar a causa.",
    whatsappMessage:
      "Olá! Preciso de suporte de informática no bairro Aviação, em São José dos Pinhais. Pode me orientar?",
    introducaoLocal: [
      "O bairro Aviação aparece em registros oficiais do município, inclusive em equipamentos e eventos públicos. Entre as referências locais está a Rua Prudentópolis, onde a Prefeitura mantém espaço para prática esportiva; a Capela Divino Espírito Santo também aparece em legislação municipal vinculada ao bairro. Essas referências servem apenas para situar a cobertura e não representam oficina ou unidade física da marca.",
      "Nesta página, o foco é continuidade: identificar qual função parou — sistema, arquivo, rede, impressão ou periférico — antes de escolher entre acesso remoto, visita e bancada. Isso evita transformar um problema de configuração em formatação desnecessária.",
    ],
    contextoLocal: [
      "Quando uma estação deixa de acessar sistema, pasta compartilhada ou impressora, verificamos credenciais, rede, serviço, endereço e permissões antes de reinstalar o sistema. Em ambiente de trabalho, preservar configuração existente costuma ser mais importante do que 'começar do zero'.",
      "Em impressora de rede, verificamos teste interno, endereço recebido, porta configurada e fila. Quando vários computadores perdem o mesmo dispositivo, rede e comunicação ganham prioridade sobre troca de hardware.",
      "Em Wi‑Fi, comparamos outros aparelhos. Se apenas um notebook falha, adaptador, driver e configuração de energia entram primeiro. Se vários dispositivos sofrem a mesma queda, roteador, cobertura, cabeamento e conexão principal passam a ser investigados.",
      "Backup é conferido antes de formatação, migração ou intervenção em armazenamento. Se o disco apresenta erro de leitura ou travamento durante cópia, a prioridade passa a ser preservar os dados antes de insistir no uso.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp começando pela função que ficou indisponível",
      "Separação entre software, rede, periféricos, armazenamento e falha física",
      "Conferência de backup antes de reinstalação ou intervenção em disco",
      "Escopo, modalidade e valor informados antes da execução",
    ],
    atendimentoLocal: [
      "Estação de trabalho que não acessa sistema, pasta ou impressora de rede",
      "Notebook ou PC lento, travando ou reiniciando",
      "Wi‑Fi com queda ou falha em um dispositivo específico",
      "Windows, drivers, contas e programas com erro",
    ],
    coletaBancada: [
      "SSD, HD, memória, fonte ou outro componente que exija teste físico",
      "Notebook com falha de energia, aquecimento, tela ou conector",
      "Tentativa de recuperação de dados em armazenamento com falha",
    ],
    publicoAtendido: [
      "Pequenos negócios e profissionais com poucas estações",
      "Home office dependente de rede e periféricos",
      "Residências com computador ou notebook de uso diário",
    ],
    servicosPrioritarios: [
      "/servicos/suporte-tecnico-empresarial",
      "/servicos/manutencao-de-computador",
      "/servicos/manutencao-de-notebook",
      "/servicos/redes-e-wifi",
      "/servicos/recuperacao-de-dados",
    ],
    problemasRelacionados: [
      { to: "/problemas/windows-nao-inicia", label: "Windows não inicia", desc: "Como separar inicialização do sistema, armazenamento e ausência de vídeo antes de formatar." },
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável", desc: "Como distinguir falha de dispositivo, cobertura ruim e problema no roteador ou no link." },
      { to: "/problemas/impressora-nao-imprime", label: "Impressora não imprime", desc: "O que verificar em fila, porta, driver e rede antes de substituir equipamento." },
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como separar armazenamento, memória, software e temperatura antes de fazer upgrade." },
    ],
    faqLocal: [
      { question: "Vocês atendem empresas no bairro Aviação?", answer: "Sim, mediante disponibilidade, com suporte a estações, impressoras e rede local. O escopo é definido após a triagem e antes da execução." },
      { question: "Uma máquina parou de acessar a impressora. Precisa formatar?", answer: "Não é o primeiro passo. Verificamos rede, endereço, porta, driver e fila antes de considerar reinstalação do sistema." },
      { question: "Dá para começar remotamente?", answer: "Sim, quando a máquina liga e mantém conexão. Configuração, credenciais e parte das falhas de software podem ser triadas remotamente; problemas físicos e de ambiente exigem visita ou bancada." },
      { question: "Como o backup é tratado antes de uma manutenção?", answer: "Confirmamos o que precisa ser preservado, onde está a cópia e se ela pode ser acessada. Se o armazenamento apresenta sinais de falha, preservar os dados passa a ser a prioridade." },
      { question: "Qual referência ajuda a localizar o bairro Aviação?", answer: "O endereço completo é sempre o principal dado. A Prefeitura registra equipamentos e eventos no bairro, inclusive na Rua Prudentópolis, que ajuda a situar a região." },
    ],
  },

  // ── OURO FINO (São José dos Pinhais) ────────────────────────
  "ouro-fino-sjp": {
    slug: "ouro-fino-sjp",
    nome: "Ouro Fino",
    nomeLocativo: "no Ouro Fino",
    cidade: "São José dos Pinhais",
    areaName: "Ouro Fino, São José dos Pinhais",
    metaTitle: "Técnico de informática no Ouro Fino | Notebook, PC, backup e Wi‑Fi",
    metaDescription:
      "Técnico de informática no Ouro Fino, São José dos Pinhais: diagnóstico de notebook e PC, backup, SSD, Wi‑Fi e Windows. Triagem antes da execução.",
    h1: "Técnico de informática no Ouro Fino – São José dos Pinhais",
    subtitulo:
      "Diagnóstico de notebook, computador e rede com prioridade para preservar dados antes de formatar, clonar armazenamento ou trocar peça.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Ouro Fino, em São José dos Pinhais. Pode me orientar?",
    introducaoLocal: [
      "Ouro Fino é reconhecido oficialmente como bairro de São José dos Pinhais. O município mantém no bairro a Superintendência de Atendimento e Defesa Civil, na Rua Porto Alegre, 138, e registra equipamentos públicos como a Escola Municipal Ana Maria Moro Dissenha, na Rua Planalto, 354. Essas referências servem para situar a cobertura e não representam oficina ou unidade física da marca.",
      "Nesta página, o foco é preservar dados e identificar a causa do defeito antes de escolher entre ajuste, upgrade, formatação ou bancada. Notebook que não liga, computador lento e armazenamento com erro exigem ordens de diagnóstico diferentes.",
    ],
    contextoLocal: [
      "Quando o notebook não liga ou liga e apaga, fonte, bateria, conector, placa e proteção elétrica precisam ser separados por teste. Não é possível concluir a causa com segurança apenas pelo sintoma relatado.",
      "Em computador lento, medimos armazenamento, memória, temperatura e carga de programas. Se o disco apresenta erro de leitura, ruído ou travamento durante cópia, a prioridade passa a ser preservar os arquivos antes de insistir em clonagem ou reinstalação.",
      "Em Wi‑Fi, comparamos outros dispositivos e pontos do imóvel. Se apenas um computador perde conexão, adaptador e driver desse equipamento entram primeiro. Se vários aparelhos falham no mesmo trecho, posição do roteador, cobertura, banda e conexão principal passam a ser investigados.",
      "Avisos que pedem pagamento para desbloquear o computador, instalar um programa ou informar senha devem ser tratados como suspeitos até verificação. A orientação é não pagar, não fornecer credenciais e não instalar software indicado pela própria mensagem.",
    ],
    logisticaLocal: [
      "O endereço completo é confirmado antes do atendimento. Como referências públicas, a Rua Porto Alegre e a Escola Municipal Ana Maria Moro Dissenha ajudam a situar a região do Ouro Fino.",
      "Configuração, navegador, contas e parte dos erros do Windows podem começar remotamente. Rede do imóvel e periféricos que precisam ser testados no ambiente normalmente pedem visita. Falhas físicas, desmontagem e tentativa de recuperação de dados seguem para bancada.",
      "Não existe promessa fixa de chegada ou conclusão vinculada ao bairro. Agenda, modalidade e prazo são definidos após a triagem conforme endereço, complexidade e eventual necessidade de peça.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp registrando equipamento, sintoma e arquivos importantes",
      "Prioridade para preservação de dados quando há suspeita de falha de armazenamento",
      "Medição de armazenamento, memória e temperatura antes de indicar upgrade",
      "Escopo, modalidade e valor informados antes da execução",
    ],
    atendimentoLocal: [
      "Notebook ou PC que não liga, trava ou reinicia",
      "Windows, navegador, contas e programas com erro",
      "Wi‑Fi com queda ou falha em um dispositivo específico",
      "Preparação de backup antes de formatação ou migração",
    ],
    coletaBancada: [
      "SSD, HD, memória, fonte, bateria ou conector que exijam teste físico",
      "Notebook com aquecimento, tela, teclado ou falha de energia",
      "Tentativa de recuperação de dados em armazenamento com falha",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-notebook",
      "/servicos/manutencao-de-computador",
      "/servicos/recuperacao-de-dados",
      "/servicos/upgrade-ssd-ram",
      "/servicos/redes-e-wifi",
      "/servicos/formatacao",
    ],
    problemasRelacionados: [
      { to: "/problemas/notebook-nao-liga", label: "Notebook não liga", desc: "Como separar fonte, bateria, conector e placa antes de decidir pelo reparo." },
      { to: "/problemas/hd-fazendo-barulho", label: "HD fazendo barulho", desc: "Quando desligar o equipamento e priorizar os dados é mais importante que reparar o sistema." },
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como separar armazenamento, memória, software e temperatura antes de fazer upgrade." },
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável", desc: "Como distinguir falha de dispositivo, cobertura ruim e problema no roteador ou no link." },
    ],
    faqLocal: [
      { question: "Meu notebook não liga. Dá para saber a causa pelo WhatsApp?", answer: "A triagem ajuda a separar sinais, mas fonte, bateria, conector e placa precisam de teste físico para diagnóstico confiável quando o equipamento não energiza." },
      { question: "Meu HD está fazendo barulho. Posso tentar formatar?", answer: "Não é recomendado. Se houver ruído mecânico ou erro de leitura, desligar o equipamento e avaliar a mídia reduz o risco de novas gravações e de piora do dano." },
      { question: "O Wi‑Fi cai só no notebook. Preciso trocar o roteador?", answer: "Não é a primeira hipótese se os demais aparelhos continuam conectados. Nesse caso verificamos adaptador, driver e configuração do próprio notebook antes de alterar o roteador." },
      { question: "O atendimento pode começar remotamente?", answer: "Sim, quando o equipamento liga e mantém conexão. Configuração, navegador e parte dos erros do Windows podem ser triados remotamente; falhas físicas e problemas que dependem do ambiente exigem visita ou bancada." },
      { question: "Quais referências públicas existem no Ouro Fino?", answer: "O município registra o bairro Ouro Fino e mantém nele a Superintendência de Atendimento e Defesa Civil, na Rua Porto Alegre, além de equipamentos públicos como a Escola Municipal Ana Maria Moro Dissenha." },
    ],
  },
};
