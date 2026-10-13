import type { ServicoLandingData } from "@/components/servico/ServicoLandingLayout";
import { PROCESSOS } from "@/lib/servicosProcessos";

const LINKS_BASE = [
  { label: "Preços e políticas", to: "/precos-e-politicas" },
  { label: "Como funciona", to: "/como-funciona" },
  { label: "Dúvidas frequentes", to: "/faq" },
];

const data: ServicoLandingData = {
    path: "upgrade-ssd-ram",
    trackingKey: "upgrade-ssd-ram",
    metaTitle: "Upgrade de SSD e RAM em Curitiba | SATA, NVMe e Memória",
    metaDescription:
      "Upgrade de SSD e RAM em Curitiba com avaliação de SATA/NVMe, memória compatível, clonagem ou instalação limpa e backup antes da migração.",
    serviceName: "Upgrade de SSD e Memória RAM",
    serviceDescription:
      "Instalação de SSD e ampliação de RAM com avaliação de compatibilidade, clonagem do sistema e backup, para ganho real de desempenho em Curitiba e região.",
    eyebrow: "Desempenho em Curitiba",
    h1: "Upgrade de SSD e memória RAM em Curitiba",
    h1Accent: "ganho real de desempenho",
    intro:
      "SSD e memória resolvem gargalos diferentes. Antes de indicar peça, verificamos se a lentidão vem de armazenamento, falta de RAM, temperatura ou software e confirmamos compatibilidade SATA/NVMe, slots e limite de memória. Clonagem ou instalação limpa é decidida pelo estado do sistema e do disco de origem. Envie o modelo e o sintoma pelo WhatsApp para avaliação.",
    whatsappMessage: "Olá! Quero fazer upgrade de SSD e/ou memória. Podem avaliar meu equipamento?",
    incluso: [
      { title: "Avaliação de compatibilidade", desc: "Checamos o que o seu equipamento suporta antes de indicar peças." },
      { title: "Instalação de SSD", desc: "SATA ou NVMe conforme o suporte da máquina." },
      { title: "Ampliação de memória", desc: "Dimensionamos a RAM ideal para o seu uso." },
      { title: "Clonagem do sistema", desc: "Quando possível, migramos o Windows sem reinstalar tudo." },
      { title: "Backup preventivo", desc: "Recomendamos backup antes de qualquer migração." },
      { title: "Teste de desempenho", desc: "Validamos o ganho e a estabilidade após o upgrade." },
    ],
    sinais: [
      "Computador demora muito para ligar e abrir programas",
      "Disco (HD) sempre em uso elevado, travando o sistema",
      "Falta de espaço em disco",
      "Trava ao usar várias abas ou aplicativos ao mesmo tempo",
      "Ainda usa HD mecânico (não SSD)",
      "Pouca memória RAM para o uso atual",
    ],
    processo: PROCESSOS["upgrade-ssd-ram"],
    fatoresValor: [
      { title: "Capacidade das peças", desc: "Tamanho do SSD e quantidade de RAM impactam diretamente no valor." },
      { title: "Tipo de SSD", desc: "SATA e NVMe têm preços e compatibilidades diferentes." },
      { title: "Clonagem ou reinstalação", desc: "Migrar o sistema ou reinstalar do zero muda o tempo de serviço." },
      { title: "Volume de dados", desc: "Backup e transferência de muitos arquivos somam tempo." },
      { title: "Compatibilidade do equipamento", desc: "Máquinas antigas podem ter limites de suporte." },
      { title: "Deslocamento", desc: "Atendimento em domicílio considera a localização em Curitiba e região." },
    ],
    atendimento: {
      residencial:
        "Upgrade de notebook e desktop de uso pessoal em Curitiba e região, com avaliação de compatibilidade e clonagem do sistema sempre que possível.",
      empresarial:
        "Padronização e upgrade de SSD e memória no parque de máquinas de empresas, melhorando o desempenho das estações sem trocar todo o equipamento.",
    },
    faqs: [
      { question: "SSD deixa qualquer computador rápido?", answer: "Não é uma regra universal. O SSD elimina a espera do disco e muda muito a inicialização e a abertura de programas, mas quem limita a máquina pode ser o processador, a placa ou a quantidade de memória. Avaliamos a configuração antes de indicar a peça e dizemos quando o ganho será pequeno." },
      { question: "Quantos gigabytes de memória eu preciso?", answer: "Depende do uso e do que a placa aceita. Navegação, textos e vídeo pedem menos do que edição, planilhas grandes, máquinas virtuais ou muitas abas simultâneas. Verificamos o padrão suportado, o limite reconhecido pelo equipamento e dimensionamos junto com você, sem empurrar capacidade que não será aproveitada." },
      { question: "É possível manter meus arquivos?", answer: "Na maioria dos casos, sim. Quando o disco de origem é lido sem erro, o conteúdo é migrado por clonagem ou por cópia e restauração. Mesmo assim, recomendamos backup antes: qualquer trabalho sobre disco tem risco, e disco já em falha pode interromper a cópia." },
      { question: "Clonagem é sempre recomendada?", answer: "Não. A clonagem é confortável quando o sistema atual está saudável, porque preserva programas e configurações. Se o sistema já apresentava travamento, infecção ou anos de acúmulo, clonar leva o mesmo problema para dentro do SSD — nesse cenário a instalação limpa entrega um resultado melhor." },
      { question: "Notebook aceita qualquer SSD?", answer: "Não. É preciso confirmar o formato aceito pelo modelo (SATA 2,5 polegadas, M.2 SATA ou M.2 NVMe), se existe slot livre e se a placa reconhece o padrão. Também existem notebooks com armazenamento ou memória soldados, que limitam ou impedem o upgrade — isso é verificado antes de indicar qualquer peça." },
      { question: "A peça está incluída?", answer: "Não. Peças e componentes são informados separadamente da mão de obra, sempre com aprovação antes da compra. Você também pode fornecer o SSD ou a memória que já possui; nesse caso conferimos a compatibilidade antes de instalar." },
      { question: "Vale a pena fazer upgrade em computador antigo?", answer: "Às vezes, sim; às vezes, não. Em máquinas com plataforma muito defasada, o SSD melhora a resposta, mas o restante continua limitando o desempenho. Quando o valor do upgrade se aproxima do valor de um equipamento adequado, dizemos isso abertamente, e o critério está detalhado na página sobre quando não compensa reparar." },
      { question: "O upgrade de SSD ou memória tem garantia?", answer: "A mão de obra segue as condições publicadas na página de preços e políticas, e a peça segue a garantia do fornecedor ou fabricante. Não existe garantia universal para qualquer falha futura do equipamento." },
    ],
    relacionados: [
      { label: "Computador lento: investigar o sintoma", to: "/problemas/computador-lento" },
      { label: "Manutenção de notebook", to: "/servicos/manutencao-de-notebook" },
      { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
      { label: "Formatação", to: "/servicos/formatacao" },
      { label: "Montagem de PC", to: "/servicos/montagem-de-pc" },
      { label: "Manutenção de PC gamer", to: "/servicos/pc-gamer" },
      { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
      { label: "Quando não compensa reparar", to: "/quando-nao-compensa" },
      ...LINKS_BASE,
    ],
    blocoLocal: [
      {
        titulo: "Quando o SSD ajuda e quando a memória ajuda",
        paragrafos: [
          "O SSD entra em cena quando a máquina passa o tempo esperando o disco: demora para chegar à área de trabalho, programas que levam segundos para abrir, indicador de disco constantemente saturado. Esse é o cenário clássico de quem ainda usa HD mecânico, e é onde a mudança aparece já no primeiro uso.",
          "A memória resolve outro incômodo: o engasgo em multitarefa. Quando falta espaço, o sistema passa a usar o disco como apoio e tudo trava junto — muitas abas, planilha grande aberta ao lado de reunião, edição de imagem, máquina virtual. Ampliar memória não acelera o que já cabia; evita a parada quando não cabe mais.",
          "Nenhuma das duas peças corrige superaquecimento, fonte perdendo capacidade, disco com setores defeituosos ou sistema comprometido. Se o computador desliga sozinho, esquenta demais ou reinicia em uso pesado, o caminho começa pelo diagnóstico de hardware, não pela loja de peças.",
        ],
      },
      {
        titulo: "HD, SSD SATA e NVMe: o que muda na prática",
        paragrafos: [
          "O HD mecânico depende de partes móveis, e é por isso que domina a lista de gargalos em máquinas antigas: qualquer tarefa que exija muitos acessos pequenos ao disco fica presa esperando. O SSD elimina esse tempo de espera, e é daí que vem a sensação de máquina nova na inicialização, na abertura de programas e na resposta do sistema.",
          "Entre SSD SATA e NVMe existe diferença de barramento, mas o impacto percebido no uso comum é bem menor do que o salto de HD para SSD. Por isso não prometemos número de segundos nem multiplicador de velocidade: indicamos o que o equipamento aceita e o que muda de fato no seu tipo de uso.",
          "Capacidade também entra na conversa. Armazenamento quase cheio degrada a resposta mesmo em SSD, então dimensionamos o tamanho considerando o volume atual de arquivos e o que você pretende guardar, em vez de escolher pelo menor valor da prateleira.",
        ],
      },
      {
        titulo: "Compatibilidade, memória soldada e peças",
        paragrafos: [
          "Nenhuma peça é indicada sem olhar o equipamento. Verificamos qual conexão o modelo aceita (SATA 2,5 polegadas, M.2 SATA ou M.2 NVMe), se há slot livre, o tipo e a frequência da memória suportada, o limite total reconhecido pela placa e se o sistema instalado aproveita o que será colocado.",
          "Existem equipamentos com memória soldada à placa e notebooks finos com um único slot ocupado. Nesses casos o upgrade pode ser parcial ou simplesmente não existir, e é melhor saber disso antes de comprar peça. Também há placas que reconhecem um limite menor do que o anunciado pelo módulo — confirmamos o comportamento real do modelo.",
          "Peças são informadas separadamente da mão de obra e a garantia do componente segue o fornecedor. Você pode fornecer o SSD ou a memória que já possui — nesse caso conferimos a compatibilidade antes de instalar. Não trabalhamos com preço fixo de componente, porque modelo, capacidade e disponibilidade mudam o valor.",
        ],
      },
      {
        titulo: "Clonagem ou instalação limpa?",
        paragrafos: [
          "A clonagem mantém sistema, programas e arquivos como estavam e é a opção mais confortável quando o ambiente atual está saudável. Ela exige que o disco de origem seja lido sem erro: disco em falha pode interromper a cópia no meio do caminho.",
          "A instalação limpa é preferível quando o sistema já apresentava travamento, infecção ou anos de acúmulo — levar esse problema para dentro do SSD apenas deixa o mesmo desconforto mais rápido. Nos dois caminhos, a recomendação é ter uma cópia dos arquivos antes: upgrade é procedimento controlado, mas qualquer trabalho sobre disco tem risco.",
          "O disco antigo costuma ser devolvido a você, e ele pode continuar útil como armazenamento secundário quando estiver saudável. Se a avaliação indicar desgaste, avisamos: manter arquivos importantes em disco com sinal de falha é adiar um problema maior.",
        ],
      },
      {
        titulo: "Quando o upgrade não compensa",
        paragrafos: [
          "Há situações em que preferimos dizer não: plataforma antiga demais para aproveitar o SSD, placa com limite de memória muito baixo, equipamento com defeito estrutural, ou soma de peças que se aproxima do valor de um aparelho adequado ao seu uso. Nessas horas o upgrade só adia a troca e consome dinheiro no meio do caminho.",
          "Também não indicamos upgrade como cura para um sintoma ainda não investigado. Quando a queixa é lentidão, a ordem correta é entender a origem — o caminho está descrito na página sobre computador lento — e só então decidir entre peça, limpeza, reinstalação ou reparo.",
        ],
      },
    ],
    linksLocais: [
      { label: "Atendimento técnico em Curitiba", to: "/tecnico-informatica-curitiba" },
      { label: "Instalação limpa do sistema", to: "/servicos/formatacao" },
      { label: "Técnico no seu endereço", to: "/atendimento-domicilio" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
    ],
    dateModified: "2026-09-28",
  };

export default data;
