// ─────────────────────────────────────────────────────────────
// CIDADES ÂNCORA — conteúdo local próprio, útil e não duplicado.
// Sem rating inventado, sem endereço físico falso, sem equipe fixa
// por cidade, sem tempo de chegada garantido, sem "melhor da cidade".
// Rota canônica existente: /tecnico-informatica-<slug> (self-referente).
// ─────────────────────────────────────────────────────────────

export interface CidadeFaq {
  question: string;
  answer: string;
}

export interface CidadeData {
  /** Slug final da rota /tecnico-informatica-<slug> */
  slug: string;
  cidade: string;
  /** Nome usado no areaServed do schema */
  areaName: string;
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  /** Conteúdo visível */
  eyebrow: string;
  h1: string;
  h1Accent: string;
  subtitulo: string;
  /** Mensagem pré-preenchida do WhatsApp */
  whatsappMessage: string;
  /** Proposta local (2-3 parágrafos, distintos por cidade) */
  proposta: string[];
  /** Perfil local resumido em bullets */
  perfilLocal: string[];
  /** Contexto técnico da cidade — parágrafos autorais, sem promessa nova */
  contextoLocal?: string[];
  /** Logística e acesso reais da localidade (conteúdo autoral) */
  logisticaLocal?: string[];
  /** Bairros âncora indexáveis ligados à cidade — somente rotas aprovadas pela policy. */
  bairrosIndexaveis?: { label: string; to: string; desc: string }[];
  /** Quando chamar um técnico — exemplos práticos */
  quandoChamar: { title: string; desc: string }[];
  /** FAQ local — mínimo 5 por cidade, conteúdo distinto */
  faqs: CidadeFaq[];
}

// 8 serviços canônicos — links compartilhados (sem páginas serviço×cidade).
export const SERVICOS_CANONICOS: { label: string; to: string; desc: string }[] = [
  { label: "Formatação", to: "/servicos/formatacao", desc: "Reinstalação limpa do Windows com backup e programas essenciais." },
  { label: "Manutenção de notebook", to: "/servicos/manutencao-de-notebook", desc: "Limpeza interna, troca de tela, teclado, bateria e reparo de hardware." },
  { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador", desc: "Diagnóstico e reparo de desktops que travam, reiniciam ou não ligam." },
  { label: "Upgrade SSD e RAM", to: "/servicos/upgrade-ssd-ram", desc: "Troca por SSD e mais memória para acelerar a máquina." },
  { label: "Remoção de vírus", to: "/servicos/remocao-de-virus", desc: "Limpeza de malware, pop-ups e sequestro de navegador." },
  { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados", desc: "Tentativa de recuperar arquivos de HD, SSD e pendrive (sem garantia)." },
  { label: "Redes e Wi-Fi", to: "/servicos/redes-e-wifi", desc: "Configuração de roteador, repetidores e rede estável em casa ou empresa." },
  { label: "Suporte empresarial", to: "/servicos/suporte-tecnico-empresarial", desc: "Suporte pontual ou recorrente para estações, servidores e rede." },
];

// Modalidades de atendimento — links compartilhados para as páginas próprias.
export const MODALIDADES_ATENDIMENTO: { label: string; to: string; desc: string }[] = [
  { label: "Atendimento em domicílio", to: "/atendimento-domicilio", desc: "Avaliação e reparo no local, quando o problema permite atendimento presencial." },
  { label: "Suporte remoto", to: "/atendimento-remoto", desc: "Configurações, sistemas e orientações resolvidos à distância, sem deslocamento." },
  { label: "Coleta e entrega", to: "/coleta-e-entrega", desc: "Retirada agendada quando o serviço precisa de bancada, com devolução ao final." },
  { label: "Diagnóstico técnico", to: "/diagnostico-tecnico", desc: "Etapa de avaliação para identificar a causa antes de informar qualquer valor." },
];

// Bairros curados de Curitiba — a landing de Curitiba é a página-mãe deles.
export const CURITIBA_BAIRROS: { label: string; to: string; desc: string }[] = [
  { label: "CIC (Cidade Industrial)", to: "/bairros/cic", desc: "Atendimento de informática na CIC para PC, notebook, rede e diagnóstico por sintoma." },
  { label: "Batel", to: "/bairros/batel", desc: "Notebook, periféricos, rede e diagnóstico de conectividade com foco no uso real do equipamento." },
  { label: "Água Verde", to: "/bairros/agua-verde", desc: "PC, notebook, Wi-Fi, SSD e backup com diagnóstico antes do reparo." },
  { label: "Centro", to: "/bairros/centro", desc: "Impressão, rede, manutenção e continuidade de uso com diagnóstico antes da intervenção." },
  { label: "Portão", to: "/bairros/portao", desc: "PC, notebook, rede e periféricos com triagem técnica antes do reparo." },
  { label: "Santa Felicidade", to: "/bairros/santa-felicidade", desc: "Wi-Fi, notebook e PC com foco em cobertura, dados e diagnóstico técnico." },
  { label: "Boa Vista", to: "/bairros/boa-vista", desc: "Computador, notebook, backup, impressão e rede com diagnóstico por sintoma." },
  { label: "Bigorrilho", to: "/bairros/bigorrilho", desc: "Notebook, dock, monitor e Wi-Fi com diagnóstico de desempenho e conectividade." },
  { label: "Cabral", to: "/bairros/cabral", desc: "PC, notebook, backup, certificado digital, impressão e rede." },
  { label: "Xaxim", to: "/bairros/xaxim", desc: "Diagnóstico de PC doméstico, armazenamento, formatação e Wi-Fi." },
  { label: "Sítio Cercado", to: "/bairros/sitio-cercado", desc: "PC, notebook, impressora, backup e rede com triagem técnica por sintoma." },
  { label: "Boqueirão", to: "/bairros/boqueirao", desc: "PC, notebook, Wi-Fi, impressora e manutenção com triagem por sintoma." },
  { label: "Cajuru", to: "/bairros/cajuru", desc: "Notebook, SSD, memória, Windows e Wi-Fi com diagnóstico antes de troca ou reinstalação." },
  { label: "Pinheirinho", to: "/bairros/pinheirinho", desc: "Wi-Fi, PC, notebook, armazenamento e preservação de dados." },
  { label: "Rebouças", to: "/bairros/reboucas", desc: "Notebook, impressora e rede com diagnóstico antes da intervenção." },
  { label: "Hauer", to: "/bairros/hauer", desc: "PC doméstico, upgrade, notebook e Wi-Fi com triagem técnica." },
  { label: "Novo Mundo", to: "/bairros/novo-mundo", desc: "Windows, dados, notebook e rede doméstica com foco em continuidade." },
  { label: "Bacacheri", to: "/bairros/bacacheri", desc: "Notebook, Wi-Fi e home office com diagnóstico de desempenho e conectividade." },
  { label: "Juvevê", to: "/bairros/juveve", desc: "Periféricos, notebook e rede com diagnóstico orientado pelo sintoma." },
  { label: "Mercês", to: "/bairros/merces", desc: "Backup, notebook, Wi-Fi e preservação de arquivos." },
  { label: "Tingui", to: "/bairros/tingui", desc: "Desempenho sob carga, Wi-Fi e preservação de dados com diagnóstico próprio." },
];

// Processo comum (não é conteúdo SEO exclusivo; é institucional).
export const PROCESSO_ATENDIMENTO = [
  { step: "1", title: "Triagem", desc: "Você descreve o problema pelo WhatsApp e recebe as primeiras orientações." },
  { step: "2", title: "Avaliação", desc: "Diagnóstico técnico do equipamento para entender a real causa." },
  { step: "3", title: "Orientação", desc: "Explicamos o que foi encontrado em linguagem clara, sem empurrar peça." },
  { step: "4", title: "Valor do atendimento", desc: "Valor apresentado e aprovado por você antes de qualquer serviço." },
  { step: "5", title: "Execução", desc: "Serviço realizado com peças e procedimentos adequados." },
];

export const CIDADES: Record<string, CidadeData> = {
  // ── CURITIBA ────────────────────────────────────────────────
  curitiba: {
    slug: "curitiba",
    cidade: "Curitiba",
    areaName: "Curitiba",
    metaTitle: "Técnico de Informática em Curitiba | PC e Notebook",
    metaDescription:
      "Atendimento técnico em Curitiba para computador, notebook, formatação, SSD, vírus, recuperação de dados, Wi-Fi e suporte para empresas.",
    eyebrow: "Atendimento em Curitiba",
    h1: "Técnico de informática em Curitiba para",
    h1Accent: "PC e notebook",
    subtitulo:
      "Atendimento técnico em informática na capital paranaense, com triagem por WhatsApp, valor transparente e garantia sobre o serviço realizado.",
    whatsappMessage: "Olá! Preciso de um técnico de informática em Curitiba. Pode me orientar?",
    proposta: [
      "Curitiba concentra muita gente que depende do computador todos os dias: home office, faculdade, profissionais liberais e empresas de todos os portes. Quando o notebook trava, o PC fica lento ou o Wi-Fi cai no meio de uma reunião, a rotina para. Nosso foco é resolver isso com clareza, sem termos técnicos confusos e sem cobrança surpresa.",
      "Atendemos residências e empresas em Curitiba com atendimento a domicílio ou por coleta e entrega, conforme o tipo de problema. Casos simples costumam ser resolvidos na primeira visita; reparos de bancada (placa, tela de notebook, recuperação de dados) seguem para a oficina com o seu acompanhamento.",
      "Trabalhamos com diagnóstico primeiro, valor do atendimento depois. Você entende o que está acontecendo com o equipamento antes de aprovar qualquer coisa — e decide com calma.",
    ],
    contextoLocal: [
      "Curitiba tem um parque de equipamentos muito diverso: bairros de perfil corporativo com frota de notebooks e docks, regiões residenciais com desktops antigos ainda em uso diário e áreas industriais onde o computador é parte da linha de produção. Por isso a triagem começa sempre pelo uso real do equipamento, e não pela marca ou pela idade dele — a mesma lentidão significa coisas diferentes em uma estação de trabalho de edição e em um PC doméstico usado para navegação e boletos.",
      "O inverno curitibano, mais úmido e frio, também aparece nos chamados: máquinas guardadas em ambientes sem ventilação, condensação em equipamentos trazidos de fora e fontes antigas que passam a falhar quando a carga aumenta. Nada disso é diagnosticado por telefone. A avaliação técnica identifica a causa antes de qualquer reparo, e o valor só é informado depois dela.",
    ],
    logisticaLocal: [
      "Curitiba é atendida por roteiro: a cidade é grande o suficiente para que ir e voltar entre bairros distantes consuma mais tempo do que o próprio serviço. Por isso a triagem por WhatsApp já define região, tipo de acesso e modalidade antes de qualquer deslocamento, e chamados próximos são agrupados na mesma janela. Isso mantém o custo de deslocamento previsível e evita a promessa de horário que a cidade não permite cumprir.",
      "A escolha entre remoto, visita e coleta segue um critério simples e informado antes: se a máquina liga e conecta, boa parte dos casos de sistema, configuração e rede se resolve remotamente, sem depender de rota. Se o problema é físico — tela, fonte, teclado, armazenamento, placa — a bancada é mais segura e mais barata que tentar reparo improvisado no local, e a coleta com devolução no endereço evita que o cliente precise transportar o equipamento.",
      "Todo atendimento em Curitiba termina com um resumo escrito pelo WhatsApp: o que foi encontrado, o que foi feito, o que foi substituído e o que ainda merece atenção no equipamento. Esse registro serve de histórico para a próxima manutenção e evita que o mesmo diagnóstico precise ser refeito do zero meses depois.",
    ],
    perfilLocal: [
      "Alta demanda por suporte a home office e estudo remoto",
      "Empresas e escritórios que não podem ficar parados",
      "Máquinas antigas que ganham fôlego com SSD e mais memória",
      "Redes Wi-Fi instáveis em apartamentos e casas grandes",
    ],
    quandoChamar: [
      { title: "Notebook travando", desc: "Esquenta, congela ou desliga sozinho durante o uso." },
      { title: "Computador lento", desc: "Demora para abrir programas e navegar mesmo em tarefas simples." },
      { title: "Empresa parada", desc: "Estação de trabalho ou rede fora do ar afetando o time." },
      { title: "Arquivos em risco", desc: "HD com barulho, sistema que não abre ou exclusão acidental." },
      { title: "Wi-Fi instável", desc: "Sinal que cai, oscila ou não cobre todos os cômodos." },
      { title: "Sistema corrompido", desc: "Windows com erro, tela azul ou que não inicia." },
    ],
    faqs: [
      { question: "Vocês atendem em toda Curitiba?", answer: "Atendemos Curitiba com atendimento a domicílio ou por coleta e entrega, combinando horário pelo WhatsApp. A logística é definida conforme o bairro e o tipo de serviço." },
      { question: "Quanto custa o atendimento em Curitiba?", answer: "O diagnóstico/visita começa a partir de R$ 99,99 quando aplicável. O valor final depende do equipamento, do deslocamento, da urgência, da complexidade e de eventuais peças. Nada é executado sem sua aprovação." },
      { question: "Dá para resolver conforme a disponibilidade da agenda?", answer: "Muitos casos simples são resolvidos na primeira visita. Reparos que exigem bancada ou peças específicas podem levar mais tempo, e você é avisado do prazo antes de aprovar." },
      { question: "Atendem empresas e escritórios em Curitiba?", answer: "Sim. Fazemos suporte pontual ou recorrente para estações de trabalho, servidores locais e rede, sob consulta, para reduzir paradas no dia a dia." },
      { question: "Vocês recuperam arquivos apagados?", answer: "Fazemos a tentativa de recuperação de dados de HD, SSD e pendrive. Recuperação não é garantida — depende do estado físico e lógico da mídia — e isso é dito com transparência antes de começar." },
      { question: "Como faço o primeiro contato?", answer: "Pelo WhatsApp. Você descreve o problema, recebe as primeiras orientações e, se fizer sentido, combinamos a avaliação do equipamento." },
    ],
  },

  // ── SÃO JOSÉ DOS PINHAIS ────────────────────────────────────
  "sao-jose-pinhais": {
    slug: "sao-jose-pinhais",
    cidade: "São José dos Pinhais",
    areaName: "São José dos Pinhais",
    metaTitle: "Técnico em São José dos Pinhais para Notebook e PC",
    metaDescription:
      "Técnico de informática em São José dos Pinhais: formatação, conserto de notebook e PC, upgrade de SSD, redes e suporte a empresas.",
    eyebrow: "Atendimento em São José dos Pinhais",
    h1: "Técnico em São José dos Pinhais para notebook, PC e informática",
    h1Accent: "para casa e empresa",
    subtitulo:
      "Suporte técnico em informática em São José dos Pinhais, com triagem por WhatsApp, valor do atendimento claro e garantia sobre o serviço.",
    whatsappMessage: "Olá! Preciso de um técnico de informática em São José dos Pinhais. Pode me orientar?",
    proposta: [
      "São José dos Pinhais tem um perfil que mistura forte presença industrial e comercial com bairros residenciais em crescimento. Isso significa demanda tanto de famílias que precisam do computador de casa funcionando quanto de empresas que dependem de estações e rede estáveis para trabalhar.",
      "Atendemos a cidade com atendimento a domicílio ou por coleta e entrega. Para o dia a dia residencial, resolvemos lentidão, vírus, formatação e Wi-Fi; para o lado empresarial, damos suporte a estações, backup e rede, de forma pontual ou recorrente sob consulta.",
      "Nossa postura é sempre a mesma: primeiro entender o problema, depois avaliar o valor. Você aprova antes de qualquer execução e sabe exatamente o que será feito.",
    ],
    contextoLocal: [
      "São José dos Pinhais tem forte presença industrial e logística ao lado de bairros residenciais em expansão, e isso se reflete nos chamados: de um lado, computadores de escritório e estações ligadas a operações que não podem parar; de outro, famílias com notebook único para trabalho e estudo. A distância entre distritos da cidade é relevante, então a triagem define antes se o caso é remoto, de visita ou de coleta, evitando deslocamento sem necessidade.",
      "Também é comum na região o atendimento a pequenos comércios e prestadores que dependem de impressora, leitor e rede funcionando juntos. Nesses casos, o diagnóstico não olha só o computador: verifica cabeamento, alimentação elétrica do ponto e configuração da rede, porque tratar apenas o sintoma visível costuma fazer o problema voltar em poucos dias.",
    ],
    logisticaLocal: [
      "São José dos Pinhais tem uma geografia de atendimento particular: um núcleo urbano denso, distritos afastados e uma faixa industrial forte ligada à cadeia automotiva. O tempo de deslocamento varia muito conforme o ponto, então o endereço completo é confirmado ainda na triagem e a janela de horário é combinada considerando o trânsito das rodovias de acesso, especialmente no fim da tarde.",
      "O perfil de chamado também é misto. Nas empresas predominam estação de trabalho parada, rede instável entre setores e necessidade de rotina de backup que ninguém revisa há meses. Nas residências, notebook de estudo e trabalho remoto, disco cheio e Wi-Fi que não cobre a casa inteira. Para os dois casos, a modalidade é definida pelo sintoma: coleta com devolução quando exige bancada, visita quando o problema é de infraestrutura no ambiente.",
      "Para empresas de São José dos Pinhais, chamados repetidos no mesmo equipamento são tratados como um caso só: se o sintoma retorna dentro da garantia de 90 dias da mão de obra e se refere ao mesmo defeito, o retorno não é cobrado novamente. Essa regra é dita antes, não descoberta depois.",
    ],
    perfilLocal: [
      "Bairros residenciais em expansão com muitos home offices",
      "Comércios e empresas que precisam de rede e estações confiáveis",
      "Equipamentos que pedem upgrade de SSD e memória",
      "Necessidade frequente de backup e organização de dados",
    ],
    bairrosIndexaveis: [
      { label: "Afonso Pena", to: "/bairros/afonso-pena", desc: "atendimento de informática no Afonso Pena, SJP, com foco em PC, notebook, rede e diagnóstico por sintoma" },
      { label: "Cruzeiro", to: "/bairros/cruzeiro", desc: "atendimento de informática no Cruzeiro, SJP, com foco em PC, notebook, periféricos e conectividade" },
      { label: "Costeira", to: "/bairros/costeira", desc: "atendimento de informática na Costeira, SJP, com foco em notebook, Windows, armazenamento e Wi-Fi" },
      { label: "Guatupê", to: "/bairros/guatupe", desc: "atendimento de informática no Guatupê, SJP, com foco em PC, notebook, rede e preservação de dados" },
      { label: "Aviação", to: "/bairros/aviacao", desc: "suporte de informática no bairro Aviação com foco em continuidade de uso, rede e diagnóstico técnico" },
      { label: "Ouro Fino", to: "/bairros/ouro-fino-sjp", desc: "conserto de notebook e PC no Ouro Fino com foco em diagnóstico e preservação de dados" },
      { label: "Cidade Jardim", to: "/bairros/cidade-jardim-sjp", desc: "atendimento de informática no Cidade Jardim com foco em notebook, PC, rede e periféricos" },
      { label: "Parque da Fonte", to: "/bairros/parque-da-fonte", desc: "atendimento de informática no Parque da Fonte (notebook, PC e Wi-Fi)" },
      { label: "Rio Pequeno", to: "/bairros/rio-pequeno-sjp", desc: "atendimento de informática no Rio Pequeno (dados, PC e notebook)" },
      { label: "Quississana", to: "/bairros/quississana-sjp", desc: "atendimento de informática no Quississana (Wi-Fi, notebook e PC)" },
      { label: "Pedro Moro", to: "/bairros/pedro-moro-sjp", desc: "atendimento de informática no Pedro Moro (PC, impressora e rede)" },
      { label: "Ipê", to: "/bairros/ipe-sjp", desc: "suporte de informática no Ipê com foco em dados, periféricos, notebook e conectividade" },
      { label: "Borda do Campo", to: "/bairros/borda-do-campo-sjp", desc: "diagnóstico de informática na Borda do Campo com foco em remoto versus presencial, rede e hardware" },
      { label: "Academia", to: "/bairros/academia-sjp", desc: "diagnóstico de informática no Academia com foco em notebook, Windows, armazenamento e backup" },
      { label: "Colônia Murici", to: "/bairros/colonia-murici-sjp", desc: "suporte de informática na Colônia Murici com foco em remoto, visita, bancada e conectividade" },
      { label: "Jardim Itália", to: "/bairros/italia-sjp", desc: "diagnóstico de informática no Jardim Itália com foco em Windows, periféricos, rede e continuidade de uso" },
      { label: "Campo Largo da Roseira", to: "/bairros/campo-largo-roseira-sjp", desc: "diagnóstico de informática em Campo Largo da Roseira com foco em estabilidade, armazenamento, rede e preservação de dados" },
      { label: "Boneca do Iguaçu", to: "/bairros/boneca-do-iguacu-sjp", desc: "suporte de informática na Boneca do Iguaçu com foco em Windows, periféricos, notebook e conectividade" },
      { label: "São Marcos", to: "/bairros/sao-marcos", desc: "diagnóstico de informática em São Marcos com foco em estabilidade, armazenamento, rede e preservação de dados" },
      { label: "Aristocrata", to: "/bairros/aristocrata", desc: "suporte de informática no Aristocrata com foco em notebook, sistema, periféricos e Wi-Fi" },
      { label: "Barro Preto", to: "/bairros/barro-preto", desc: "diagnóstico de informática no Barro Preto com foco em armazenamento, estabilidade e backup" },
      { label: "São Domingos", to: "/bairros/sao-domingos", desc: "suporte de informática em São Domingos com foco em conectividade, rede e triagem remota" },
      { label: "São Cristóvão", to: "/bairros/sao-cristovao", desc: "suporte de informática em São Cristóvão com foco em Windows, rede, periféricos e continuidade de uso" },
      { label: "Del Rey", to: "/bairros/del-rey", desc: "diagnóstico de informática no Del Rey com foco em notebook, armazenamento, desempenho e Wi-Fi" },
      { label: "Braga", to: "/bairros/braga", desc: "suporte de informática no Braga com foco em continuidade de uso, rede, periféricos e Windows" },
      { label: "São Francisco", to: "/bairros/sao-francisco", desc: "diagnóstico de informática em São Francisco com foco em notebook, armazenamento, backup e Wi-Fi" },
    ],
    quandoChamar: [
      { title: "Notebook travando", desc: "Trava ou reinicia durante o trabalho ou estudo." },
      { title: "Computador lento", desc: "PC do escritório ou de casa arrastando nas tarefas do dia." },
      { title: "Empresa parada", desc: "Rede fora do ar ou máquina crítica sem funcionar." },
      { title: "Arquivos em risco", desc: "Dados importantes de trabalho sem backup adequado." },
      { title: "Wi-Fi instável", desc: "Sinal fraco em pontos da casa, comércio ou galpão." },
      { title: "Sistema corrompido", desc: "Windows travado, com erros ou que não inicializa." },
    ],
    faqs: [
      { question: "O atendimento em São José dos Pinhais é a domicílio?", answer: "Sim, atendemos a domicílio ou por coleta e entrega, com horário combinado pelo WhatsApp. A escolha depende do tipo de serviço — casos de bancada seguem para a oficina." },
      { question: "Vocês dão suporte para empresas na cidade?", answer: "Sim. Fazemos suporte a estações de trabalho, servidores locais e rede, de forma pontual ou recorrente sob consulta, pensando em reduzir paradas." },
      { question: "Qual o valor do diagnóstico?", answer: "A partir de R$ 99,99 quando aplicável. O valor final depende do equipamento, deslocamento, urgência, complexidade e peças. Você aprova o valor antes da execução." },
      { question: "Atendem tanto notebook quanto desktop?", answer: "Sim, atendemos notebooks e desktops: formatação, remoção de vírus, upgrade de SSD/RAM, reparo de hardware, redes e recuperação de dados." },
      { question: "Recuperação de dados tem garantia?", answer: "Não. Recuperação de dados é sempre uma tentativa, pois depende do estado da mídia. Somos transparentes sobre as chances antes de iniciar." },
    ],
  },

  // ── PINHAIS ─────────────────────────────────────────────────
  pinhais: {
    slug: "pinhais",
    cidade: "Pinhais",
    areaName: "Pinhais",
    metaTitle: "Técnico de informática em Pinhais | PC, notebook e Wi‑Fi",
    metaDescription:
      "Técnico de informática em Pinhais: diagnóstico de PC e notebook, Wi‑Fi, impressora, SSD, backup e Windows. Triagem antes de formatar ou trocar peça.",
    eyebrow: "Atendimento de informática em Pinhais",
    h1: "Técnico de informática em Pinhais",
    h1Accent: "diagnóstico antes de trocar peça",
    subtitulo:
      "Suporte para PC, notebook, rede e periféricos com triagem para separar software, hardware e conectividade antes de definir remoto, visita ou bancada.",
    whatsappMessage: "Olá! Preciso de um técnico de informática em Pinhais. Pode me orientar?",
    proposta: [
      "O atendimento em Pinhais começa pelo sintoma e pelo que ainda funciona. Computador lento, notebook que aquece, impressora offline e Wi‑Fi que cai podem interromper a mesma rotina, mas exigem testes diferentes. A triagem serve para reduzir hipóteses antes de formatar, comprar peça ou deslocar o equipamento.",
      "Em PC e notebook, verificamos armazenamento, memória, temperatura, Windows e periféricos antes de indicar upgrade ou reinstalação. Em rede, comparamos dispositivos e pontos do imóvel para separar cobertura, roteador, adaptador e conexão do provedor. Quando há arquivos importantes, backup e estado do armazenamento vêm antes de qualquer intervenção invasiva.",
      "A modalidade é definida depois dessa separação. Configuração e parte das falhas de software podem começar remotamente; problemas que dependem do ambiente pedem visita; desmontagem, falha física e testes prolongados seguem para bancada. Escopo e valor são apresentados antes da execução.",
    ],
    contextoLocal: [
      "Para confirmar a região do atendimento, usamos o endereço completo e referências públicas de Pinhais. O atendimento municipal da Prefeitura aparece no Centro, com pontos na Rua Renato Nunes Ribas e na Avenida Camilo di Lellis. O Parque das Águas, no eixo da Rodovia João Leopoldo Jacomel com a Estrada Ecológica, é outra referência pública útil para situar endereços na cidade. Essas referências geográficas públicas não são locais de prestação do serviço pela marca.",
      "Na rede Wi‑Fi, a localização do defeito importa mais que o nome do bairro. Se apenas um notebook perde conexão enquanto celular e TV continuam normais, adaptador, driver e configuração desse equipamento entram primeiro. Se vários aparelhos falham no mesmo ponto, posição do roteador, obstáculos, banda e distribuição do sinal passam a ser investigados.",
      "Em computador lento, o teste muda conforme o comportamento. Disco em uso constante, pouca memória, temperatura alta e excesso de programas podem produzir sensação semelhante de lentidão. Medir essas camadas antes de trocar SSD, adicionar RAM ou formatar evita gasto por tentativa.",
    ],
    logisticaLocal: [
      "O endereço completo é confirmado antes do agendamento. Referências como o Centro de Pinhais, a Avenida Camilo di Lellis, a Rodovia João Leopoldo Jacomel e o Parque das Águas ajudam a desambiguar a localização, mas não definem prazo de chegada.",
      "Suporte remoto faz sentido quando o equipamento liga, mantém conexão e o problema está em sistema, configuração, conta, navegador ou parte dos periféricos. Visita é mais adequada quando o defeito depende da rede, da impressora ou de outros elementos do ambiente. Bancada entra quando há desmontagem, falha física, armazenamento suspeito ou necessidade de teste prolongado.",
      "Agenda, deslocamento e prazo são informados depois da triagem, conforme endereço, modalidade, complexidade e eventual necessidade de peça.",
    ],
    perfilLocal: [
      "Triagem entre software, hardware e conectividade antes de indicar solução",
      "Diagnóstico de Wi‑Fi comparando dispositivos e pontos do ambiente",
      "Backup e estado do armazenamento antes de formatação ou migração",
      "Atendimento remoto, visita ou bancada definidos conforme o defeito",
    ],
    bairrosIndexaveis: [
      { label: "Emiliano Perneta", to: "/bairros/emiliano-perneta", desc: "Triagem por sintoma e modalidade para PC, notebook e rede." },
      { label: "Maria Antonieta", to: "/bairros/maria-antonieta", desc: "Suporte por equipamento, endereço e necessidade de remoto, visita ou bancada." },
      { label: "Vargem Grande", to: "/bairros/vargem-grande", desc: "Diagnóstico de inicialização, armazenamento, desempenho e rede." },
      { label: "Estância Pinhais", to: "/bairros/estancia-pinhais", desc: "Atendimento com decisão entre suporte remoto, visita e bancada." },
      { label: "Alto Tarumã", to: "/bairros/alto-taruma", desc: "Roteiro técnico para alimentação, vídeo, desempenho e Wi‑Fi." },
      { label: "Jardim Cláudia", to: "/bairros/jardim-claudia", desc: "Diagnóstico de tela azul, aquecimento, rede e preservação de dados." },
      { label: "Atuba", to: "/bairros/atuba-pinhais", desc: "Reinicialização, carga, periféricos e conectividade." },
      { label: "Jardim Amélia", to: "/bairros/jardim-amelia", desc: "Desempenho, armazenamento e Wi‑Fi com diagnóstico antes de upgrade." },
      { label: "Jardim Karla", to: "/bairros/jardim-karla-pinhais", desc: "Bateria, temperatura, drivers e rede em notebook e PC." },
      { label: "Pineville", to: "/bairros/pineville", desc: "Suporte para notebook, computador, rede e periféricos." },
      { label: "Weissópolis", to: "/bairros/weissopolis", desc: "Travamentos, armazenamento, Wi‑Fi e periféricos." },
      { label: "Centro de Pinhais", to: "/bairros/centro-pinhais", desc: "Dados, impressão e conectividade com diagnóstico por sintoma." },
      { label: "Parque das Nascentes", to: "/bairros/parque-nascentes-pinhais", desc: "Rede, desempenho, armazenamento e proteção de arquivos." },
      { label: "Vila Amélia", to: "/bairros/vila-amelia-pinhais", desc: "Carregamento, armazenamento e preservação de dados." },
    ],
    quandoChamar: [
      { title: "PC ou notebook lento", desc: "Demora para iniciar, trava ou perde desempenho durante o uso." },
      { title: "Wi‑Fi instável", desc: "Queda, baixa cobertura ou falha concentrada em um dispositivo." },
      { title: "Impressora offline", desc: "Fila, porta, driver ou comunicação de rede precisam ser separados." },
      { title: "Windows com erro", desc: "Atualização, driver, inicialização ou configuração impedindo o uso normal." },
      { title: "Arquivos em risco", desc: "SSD ou HD com erro, travamento durante cópia ou ausência de backup." },
      { title: "Falha física", desc: "Equipamento não liga, aquece, perde vídeo ou apresenta conector danificado." },
    ],
    faqs: [
      { question: "Vocês atendem Pinhais?", answer: "Sim, mediante disponibilidade e confirmação do endereço. A triagem define se o caso pode começar remotamente, precisa de visita ou deve seguir para bancada." },
      { question: "Meu computador está lento. Precisa formatar?", answer: "Não necessariamente. Primeiro verificamos armazenamento, memória, temperatura e carga de programas. Se o gargalo for físico, formatar não corrige a causa." },
      { question: "O Wi‑Fi cai só no notebook. Preciso trocar o roteador?", answer: "Não é a primeira hipótese se os outros aparelhos continuam conectados. Nesse cenário verificamos adaptador, driver e configuração do notebook antes de alterar o roteador." },
      { question: "A impressora está offline. É defeito da impressora?", answer: "Pode ser, mas primeiro verificamos se ela conclui teste próprio, qual endereço de rede recebeu, a porta configurada no computador, fila e driver. Comunicação ruim pode parecer defeito físico." },
      { question: "Como o valor do atendimento é definido?", answer: "O valor depende da modalidade, do escopo diagnosticado, do endereço e de eventual necessidade de peça. A proposta é apresentada antes da execução; preços e políticas gerais ficam na página própria do portal." },
      { question: "Quais referências ajudam a localizar o atendimento em Pinhais?", answer: "O endereço completo é o principal dado. Como referências públicas, o Centro de Pinhais, a Avenida Camilo di Lellis, a Rodovia João Leopoldo Jacomel e o Parque das Águas ajudam a confirmar a região." },
    ],
  },

  // ── COLOMBO ─────────────────────────────────────────────────
  colombo: {
    slug: "colombo",
    cidade: "Colombo",
    areaName: "Colombo",
    metaTitle: "Técnico em Colombo para Notebook, PC e Informática",
    metaDescription:
      "Técnico de informática em Colombo: formatação, conserto de notebook e PC, upgrade de SSD, remoção de vírus, redes e suporte empresarial.",
    eyebrow: "Atendimento em Colombo",
    h1: "Técnico em Colombo para notebook, PC e informática",
    h1Accent: "sem enrolação",
    subtitulo:
      "Suporte técnico em informática em Colombo, com triagem por WhatsApp, valor transparente e garantia sobre o serviço realizado.",
    whatsappMessage: "Olá! Preciso de um técnico de informática em Colombo. Pode me orientar?",
    proposta: [
      "Colombo é uma das cidades mais populosas da região metropolitana de Curitiba, com bairros residenciais extensos. Boa parte dos moradores trabalha ou estuda usando o computador, então lentidão, vírus e sistema travado atrapalham diretamente a rotina.",
      "Atendemos Colombo com atendimento a domicílio ou por coleta e entrega. Os problemas mais comuns — formatação, remoção de vírus, upgrade de SSD, reparo de notebook e Wi-Fi — costumam ser tratados de forma direta; casos de bancada seguem para a oficina.",
      "Sem promessa de valor fechado por telefone: primeiro avaliamos o equipamento, depois apresentamos o valor do atendimento para você decidir.",
    ],
    contextoLocal: [
      "Colombo tem grande extensão territorial e bairros com perfil bem distinto entre si, do comércio mais adensado próximo à divisa com Curitiba às regiões residenciais mais afastadas. Isso torna a definição da modalidade de atendimento parte do diagnóstico: casos de software e configuração costumam ser resolvidos remotamente, enquanto defeitos de hardware pedem avaliação presencial ou coleta para bancada.",
      "Entre os equipamentos, aparecem com frequência desktops de uso familiar prolongado e notebooks que passaram por reparos anteriores mal executados — parafusos faltando, pasta térmica ressecada, dobradiça forçada. Nesses casos, o diagnóstico documenta o estado encontrado antes de propor qualquer serviço, para que a garantia de 90 dias cubra exatamente o defeito tratado.",
    ],
    logisticaLocal: [
      "Colombo se estende por uma área grande e com relevo irregular, e a diferença de tempo entre atender perto da divisa com Curitiba e atender em um bairro mais afastado é considerável. O endereço e o ponto de referência são confirmados na triagem justamente para dimensionar deslocamento com honestidade, em vez de prometer uma janela curta que não se sustenta.",
      "O padrão de chamado da cidade tem forte presença residencial e de pequeno comércio: computador de família com anos de uso, notebook único que atende estudo e trabalho, roteador do provedor instalado na entrada da casa e cobertura de sinal ruim nos fundos. Nesses cenários, upgrade para SSD, limpeza interna com revisão térmica e reorganização da rede costumam entregar mais resultado por real investido do que a substituição do equipamento.",
      "Em Colombo, quando o chamado é em bairro mais afastado, o custo de deslocamento é calculado e informado antes do agendamento, com a quilometragem considerada de forma transparente. Se a avaliação remota indicar que o problema não exige presença física, o cliente é orientado a não pagar por uma visita desnecessária.",
    ],
    perfilLocal: [
      "Bairros residenciais extensos e população em crescimento",
      "Muitos moradores em home office e estudo remoto",
      "Demanda por formatação, limpeza de vírus e upgrade",
      "Redes Wi-Fi que precisam cobrir casas maiores",
    ],
    quandoChamar: [
      { title: "Notebook travando", desc: "Trava ou aquece durante o trabalho e o estudo." },
      { title: "Computador lento", desc: "Máquina arrastando mesmo em tarefas básicas." },
      { title: "Empresa parada", desc: "Comércio ou escritório com equipamento fora do ar." },
      { title: "Arquivos em risco", desc: "Documentos e fotos sem backup e HD com sintomas." },
      { title: "Wi-Fi instável", desc: "Sinal fraco em cômodos distantes do roteador." },
      { title: "Sistema corrompido", desc: "Windows com falhas, lento ou que não abre." },
    ],
    faqs: [
      { question: "Vocês atendem a domicílio em Colombo?", answer: "Sim, com atendimento a domicílio ou por coleta e entrega. O horário é combinado pelo WhatsApp e a logística depende do bairro e do tipo de serviço." },
      { question: "Qual o valor do diagnóstico em Colombo?", answer: "A partir de R$ 99,99 quando aplicável. O valor final depende do equipamento, deslocamento, urgência, complexidade e peças. Você aprova o valor antes da execução." },
      { question: "Atendem empresas e comércios em Colombo?", answer: "Sim. Fazemos suporte a estações de trabalho, rede e backup, de forma pontual ou recorrente sob consulta." },
      { question: "Dá para deixar o computador antigo mais rápido?", answer: "Na maioria dos casos, sim — a troca por SSD e o aumento de memória trazem ganho perceptível. Não prometemos porcentagem fixa; o resultado depende do hardware." },
      { question: "Vocês recuperam arquivos perdidos?", answer: "Fazemos a tentativa de recuperação de dados. Não há garantia, pois depende do estado da mídia, e explicamos as chances antes de iniciar." },
    ],
  },

  // ── ARAUCÁRIA ───────────────────────────────────────────────
  araucaria: {
    slug: "araucaria",
    cidade: "Araucária",
    areaName: "Araucária",
    metaTitle: "Técnico em Araucária para Notebook, PC e Empresas",
    metaDescription:
      "Técnico de informática em Araucária: formatação, conserto de notebook e PC, upgrade de SSD, redes e suporte empresarial.",
    eyebrow: "Atendimento em Araucária",
    h1: "Técnico em Araucária para notebook, PC e informática",
    h1Accent: "para residências e empresas",
    subtitulo:
      "Assistência técnica em informática em Araucária, com triagem por WhatsApp, diagnóstico honesto e valor aprovado por você.",
    whatsappMessage: "Olá! Preciso de um técnico de informática em Araucária. Pode me orientar?",
    proposta: [
      "Araucária tem forte perfil industrial e empresarial, ao lado de bairros residenciais consolidados. Isso gera dois tipos de demanda bem distintos: o computador de casa que precisa voltar a funcionar e o ambiente de trabalho que não pode parar.",
      "Atendemos a cidade com atendimento a domicílio ou por coleta e entrega para uso residencial, e com suporte a estações, rede e backup para empresas — pontual ou recorrente, sob consulta. Formatação, upgrade de SSD, remoção de vírus e redes são os pedidos mais frequentes.",
      "Em todos os casos, seguimos a mesma lógica: diagnóstico primeiro, valor do atendimento depois, execução só com sua aprovação.",
    ],
    contextoLocal: [
      "Araucária concentra atividade industrial e logística relevante, e boa parte dos chamados vem de escritórios ligados a essas operações: estações que precisam de disponibilidade, impressoras compartilhadas e rede local que não pode oscilar. O foco da avaliação nesses ambientes é reduzir tempo de parada — identificar se o caso resolve em ajuste, em troca de peça ou se exige substituição planejada do equipamento.",
      "Na frente residencial, a demanda é mais próxima da média regional: formatação com backup, upgrade de SSD e memória, remoção de malware e configuração de rede doméstica. Como a cidade está fora do núcleo de Curitiba, a triagem por WhatsApp é ainda mais importante para definir a modalidade certa antes de qualquer deslocamento.",
    ],
    logisticaLocal: [
      "Araucária tem peso industrial acentuado e uma parte residencial que cresceu em torno dele. Para chamados em área industrial, o acesso costuma exigir cadastro prévio, identificação na portaria e, em alguns casos, autorização de segurança do trabalho — informações que pedimos antes de sair, porque são elas que determinam se a visita será produtiva.",
      "Nessas plantas, o computador raramente está isolado: ele conversa com sistema de gestão, leitor, impressora térmica ou equipamento de medição. Formatar sem mapear essas integrações costuma criar um problema maior que o original. A avaliação registra o que está conectado, o que precisa continuar funcionando e o que pode parar durante o serviço, e a execução é agendada preferencialmente fora do turno de produção. Na parte residencial, o padrão volta ao usual: SSD, limpeza, sistema e rede doméstica.",
      "Em ambiente industrial de Araucária, equipamentos ligados a processos críticos só são desligados com autorização do responsável pela área, e a janela de intervenção é acordada por escrito. Quando o risco de parada é alto, priorizamos diagnóstico não invasivo e execução programada em vez de intervenção imediata.",
    ],
    perfilLocal: [
      "Presença industrial e empresarial relevante",
      "Bairros residenciais com demanda de suporte doméstico",
      "Empresas que precisam de rede estável e backup",
      "Máquinas que pedem upgrade de SSD e memória",
    ],
    bairrosIndexaveis: [
      { label: "Jardim Iguaçu", to: "/bairros/jardim-iguacu-araucaria", desc: "diagnóstico de informática no Jardim Iguaçu com foco em armazenamento, dados e conectividade" },
      { label: "Jardim Shangri-Lá", to: "/bairros/jardim-shangrila-araucaria", desc: "suporte de informática no Jardim Shangri-Lá com foco em rede, periféricos e drivers" },
      { label: "Vila Nova", to: "/bairros/vila-nova-araucaria", desc: "diagnóstico de informática na Vila Nova com foco em continuidade de uso, sistema, rede e arquivos" },
      { label: "Jardim Industrial", to: "/bairros/industrial-araucaria", desc: "suporte de informática no Jardim Industrial com foco em estações, rede e diagnóstico técnico" },
      { label: "Jardim Califórnia", to: "/bairros/california-araucaria", desc: "diagnóstico de informática no Jardim Califórnia com foco em notebook, bateria, fonte e Wi-Fi" },
      { label: "São Miguel", to: "/bairros/sao-miguel-araucaria", desc: "suporte de informática em São Miguel com foco em inicialização, armazenamento e estabilidade" },
      { label: "Capela Velha", to: "/bairros/capela-velha", desc: "diagnóstico de informática na Capela Velha com foco em Windows, backup e conectividade" },
      { label: "Chapada", to: "/bairros/chapada", desc: "suporte de informática na Chapada com foco em estabilidade, rede e diagnóstico antes de upgrade" },
      { label: "Thomaz Coelho", to: "/bairros/thomaz-coelho", desc: "diagnóstico de informática no Thomaz Coelho com foco em estações, rede e continuidade de uso" },
      { label: "Estação", to: "/bairros/estacao-araucaria", desc: "suporte de informática no Estação com foco em Windows, periféricos e continuidade de uso" },
      { label: "Guajuvira", to: "/bairros/guajuvira", desc: "diagnóstico de informática no Guajuvira com foco em conectividade e decisão entre remoto, visita e bancada" },
      { label: "Barigui", to: "/bairros/barigui-araucaria", desc: "suporte de informática no Barigui com foco em armazenamento, backup e estabilidade" },
      { label: "Boqueirão", to: "/bairros/boqueirao-araucaria", desc: "diagnóstico de informática no Boqueirão com foco em energia, vídeo e falhas físicas" },
      { label: "Centro de Araucária", to: "/bairros/centro-araucaria", desc: "suporte de informática no Centro de Araucária com foco em rede, periféricos e diagnóstico por sintoma" },
      { label: "Costeira", to: "/bairros/costeira-araucaria", desc: "diagnóstico de informática na Costeira com foco em notebook, bateria, temperatura e Wi-Fi" },
      { label: "Fazenda Velha", to: "/bairros/fazenda-velha-araucaria", desc: "suporte de informática na Fazenda Velha com foco em Windows, aplicativos, rede e arquivos" },
      { label: "Sabiá", to: "/bairros/sabia", desc: "diagnóstico de informática no Sabiá com foco em SSD, HD, backup e preservação de dados" },
      { label: "Passaúna", to: "/bairros/passauna", desc: "suporte de informática no Passaúna com foco em Wi-Fi, rede e definição remoto versus presencial" },
      { label: "Campina da Barra", to: "/bairros/campina-da-barra", desc: "diagnóstico de informática na Campina da Barra com foco em notebook, bateria, fonte e aquecimento" },
      { label: "Tindiquera", to: "/bairros/tindiquera", desc: "suporte de informática no Tindiquera com foco em Wi-Fi, rede cabeada e drivers" },
      { label: "Porto das Laranjeiras", to: "/bairros/porto-das-laranjeiras", desc: "diagnóstico de informática no Porto das Laranjeiras com foco em estações, Windows e periféricos" },
    ],
    quandoChamar: [
      { title: "Notebook travando", desc: "Congela ou reinicia durante o uso." },
      { title: "Computador lento", desc: "Desktop de casa ou do trabalho arrastando." },
      { title: "Empresa parada", desc: "Estação crítica ou rede fora do ar." },
      { title: "Arquivos em risco", desc: "Dados de trabalho sem backup e HD com sintomas." },
      { title: "Wi-Fi instável", desc: "Cobertura fraca em casa, escritório ou galpão." },
      { title: "Sistema corrompido", desc: "Windows com erro, lento ou que não inicia." },
    ],
    faqs: [
      { question: "Vocês atendem empresas em Araucária?", answer: "Sim. Por causa do forte perfil empresarial da cidade, oferecemos suporte a estações de trabalho, servidores locais, rede e backup, de forma pontual ou recorrente sob consulta." },
      { question: "O atendimento residencial é a domicílio?", answer: "Sim, a domicílio ou por coleta e entrega, com horário combinado pelo WhatsApp. Casos de bancada seguem para a oficina com seu acompanhamento." },
      { question: "Quanto custa o diagnóstico?", answer: "A partir de R$ 99,99 quando aplicável. O valor final depende do equipamento, deslocamento, urgência, complexidade e peças, sempre aprovado por você antes." },
      { question: "Fazem upgrade e formatação?", answer: "Sim, são serviços frequentes: troca por SSD, aumento de memória e formatação com backup e programas essenciais." },
      { question: "Recuperação de dados é garantida?", answer: "Não. É sempre uma tentativa, pois depende do estado físico e lógico da mídia. Explicamos as chances com transparência antes de começar." },
    ],
  },

  // ── CAMPO LARGO ─────────────────────────────────────────────
  "campo-largo": {
    slug: "campo-largo",
    cidade: "Campo Largo",
    areaName: "Campo Largo",
    metaTitle: "Técnico em Campo Largo para Notebook, PC e Redes",
    metaDescription:
      "Técnico de informática em Campo Largo: formatação, conserto de notebook e PC, upgrade de SSD, remoção de vírus, redes e suporte empresarial.",
    eyebrow: "Atendimento em Campo Largo",
    h1: "Técnico em Campo Largo para notebook, PC e informática",
    h1Accent: "com valor do atendimento claro",
    subtitulo:
      "Suporte técnico em informática em Campo Largo, com triagem por WhatsApp, diagnóstico honesto e garantia sobre o serviço realizado.",
    whatsappMessage: "Olá! Preciso de um técnico de informática em Campo Largo. Pode me orientar?",
    proposta: [
      "Campo Largo tem território amplo, com áreas urbanas, comércio local e regiões mais afastadas. Esse espalhamento torna o atendimento planejado ainda mais importante: combinamos tudo antes pelo WhatsApp para organizar visita ou coleta sem desperdício de tempo.",
      "Atendemos residências e comércios da cidade com atendimento a domicílio ou por coleta e entrega. Formatação, remoção de vírus, upgrade de SSD, reparo de notebook e Wi-Fi instável estão entre os serviços mais pedidos, e reparos de bancada seguem para a oficina.",
      "Como em toda a região, o método é o mesmo: entender o problema primeiro, avaliar o valor depois e executar apenas com a sua aprovação.",
    ],
    contextoLocal: [
      "Campo Largo tem centro urbano definido e áreas afastadas de perfil rural, o que torna o planejamento do atendimento parte do serviço. Muitos chamados chegam de casas e pequenos negócios com internet via rádio ou fibra recente, onde a instabilidade percebida como 'computador ruim' na verdade vem do enlace ou da instalação interna da rede.",
      "Entre os equipamentos atendidos, predominam desktops e notebooks de uso doméstico com vários anos de serviço, além de impressoras multifuncionais. Para esses casos, o roteiro é o mesmo aplicado no restante da região: cópia dos arquivos importantes antes de qualquer intervenção, diagnóstico para identificar a causa e valor informado só depois — com coleta sem custo quando o reparo exige bancada.",
    ],
    logisticaLocal: [
      "Campo Largo é a mais distante entre as cidades atendidas, e isso muda a forma de trabalhar. O deslocamento é informado separadamente e aprovado antes, e sempre que o caso permite priorizamos resolver por acesso remoto, sem custo de viagem para o cliente. Quando a visita é necessária, o agendamento tende a ser em bloco, para que uma única ida cubra tudo o que puder ser resolvido no endereço.",
      "O perfil predominante é de residências e pequenos negócios com equipamentos que precisam durar: computador de escritório com anos de uso, notebook compartilhado pela família e rede simples com um roteador só. Para esse cenário, a recomendação técnica costuma ir na direção da manutenção preventiva — limpeza periódica, controle de temperatura, backup automatizado e substituição planejada de disco antes da falha, que é sempre mais barata que a recuperação depois dela.",
      "Como a distância encarece o retorno, em Campo Largo a avaliação procura resolver o conjunto de pendências em uma única ida: além do defeito relatado, verificamos temperatura, armazenamento, estado da fonte e situação do backup, e informamos o que ainda pode falhar em curto prazo para que a decisão seja tomada de uma vez.",
    ],
    perfilLocal: [
      "Território amplo, com áreas urbanas e mais afastadas",
      "Comércio local e usuários residenciais",
      "Demanda por formatação, upgrade e limpeza de vírus",
      "Redes Wi-Fi que precisam cobrir casas e pontos comerciais",
    ],
    bairrosIndexaveis: [
      { label: "Bateias", to: "/bairros/bateias", desc: "diagnóstico de informática em Bateias com foco em desempenho, inicialização, rede e preservação de dados" },
      { label: "Santa Cruz", to: "/bairros/santa-cruz-campo-largo", desc: "suporte de informática em Santa Cruz com foco em Windows, drivers, periféricos e conectividade" },
      { label: "Três Córregos", to: "/bairros/tres-corregos", desc: "diagnóstico de informática em Três Córregos com foco em inicialização, armazenamento e recuperação de dados" },
      { label: "Botiatuva", to: "/bairros/botiatuva", desc: "diagnóstico de informática no Botiatuva com foco em energia, inicialização, armazenamento e Wi-Fi" },
      { label: "Rondinha", to: "/bairros/rondinha", desc: "suporte de informática no Rondinha com foco em tela azul, armazenamento, dados e conectividade" },
      { label: "São Silvestre", to: "/bairros/sao-silvestre", desc: "diagnóstico de informática em São Silvestre com foco em desempenho, upgrade e preservação de dados" },
      { label: "Itaqui", to: "/bairros/itaqui", desc: "suporte de informática no Itaqui com foco em rede, inicialização e preservação de arquivos" },
      { label: "Vila Solene", to: "/bairros/vila-solene", desc: "diagnóstico de informática na Vila Solene com foco em Windows, periféricos, notebook e conectividade" },
      { label: "Centro de Campo Largo", to: "/bairros/centro-campo-largo", desc: "suporte de informática no Centro de Campo Largo com foco em Windows, rede, periféricos e continuidade de uso" },
      { label: "Ferraria", to: "/bairros/ferraria", desc: "diagnóstico de informática na Ferraria com foco em conectividade, notebook e escolha entre remoto, visita e bancada" },
      { label: "São Marcos", to: "/bairros/sao-marcos-campo-largo", desc: "diagnóstico de informática em São Marcos de Campo Largo com foco em estabilidade, armazenamento, memória e preservação de dados" },
      { label: "Timbotuva", to: "/bairros/timbotuva-cl", desc: "suporte de informática no Timbotuva com foco em conectividade, triagem remota, notebook e preservação de arquivos" },
    ],
    quandoChamar: [
      { title: "Notebook travando", desc: "Trava, aquece ou desliga durante o uso." },
      { title: "Computador lento", desc: "Máquina arrastando nas tarefas do dia a dia." },
      { title: "Comércio parado", desc: "PC da loja ou do escritório sem funcionar." },
      { title: "Arquivos em risco", desc: "Documentos importantes sem cópia de segurança." },
      { title: "Wi-Fi instável", desc: "Sinal fraco em partes da casa ou do comércio." },
      { title: "Sistema corrompido", desc: "Windows com erro, lento ou que não inicia." },
    ],
    faqs: [
      { question: "Vocês atendem em Campo Largo mesmo em regiões mais afastadas?", answer: "Combinamos tudo antes pelo WhatsApp para avaliar a melhor forma: atendimento a domicílio ou coleta e entrega. Não prometemos tempo fixo de chegada porque depende da localização e da agenda." },
      { question: "Qual o valor da visita técnica?", answer: "A partir de R$ 99,99 quando aplicável. O valor final depende do equipamento, deslocamento, urgência, complexidade e peças, e é aprovado por você antes da execução." },
      { question: "Fazem formatação e upgrade de SSD?", answer: "Sim, são serviços muito pedidos: formatação com backup e a troca por SSD com aumento de memória, que aceleram máquinas antigas." },
      { question: "Atendem comércios e escritórios?", answer: "Sim. Damos suporte a computadores, impressoras de rede e Wi-Fi de lojas e escritórios, de forma pontual ou recorrente sob consulta." },
      { question: "Recuperam arquivos de HD com defeito?", answer: "Fazemos a tentativa de recuperação de dados. Não há garantia, pois depende do estado da mídia, e informamos as chances antes de iniciar." },
    ],
  },
};

export const CIDADE_LIST = Object.values(CIDADES);
