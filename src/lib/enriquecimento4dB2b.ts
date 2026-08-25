/**
 * ─────────────────────────────────────────────────────────────
 * RODADA 4D — AUTORIDADE B2B / SUPORTE DE TI PARA EMPRESAS
 * Curitiba + São José dos Pinhais · SEM novas URLs
 *
 * Seis owners empresariais JÁ EXISTENTES recebem conteúdo autoral
 * exclusivo, cada um respondendo a UMA intenção empresarial distinta.
 *
 * Regras auditadas por src/lib/__tests__/enriquecimento4d.test.ts:
 *   1. Nenhuma URL nova; todo owner é caminho já publicado.
 *   2. Uma intenção primária por owner, sem sobreposição.
 *   3. Similaridade Jaccard entre owners < 0,40 (gate anti-doorway).
 *   4. Nada de SLA, mensalidade, prazo garantido ou técnico dedicado
 *      (gate npm run check:recurring-language).
 *   5. FAQ visível — não entra em JSON-LD FAQPage.
 * ─────────────────────────────────────────────────────────────
 */
import type { EnriquecimentoConteudo } from "@/lib/enriquecimento";

export const OWNERS_4D = [
  "/empresa-de-ti-curitiba",
  "/empresas",
  "/servicos/suporte-tecnico-empresarial",
  "/servicos/manutencao-preventiva-empresas",
  "/servicos/backup-para-empresas",
  "/servicos/suporte-home-office",
] as const;

export type Owner4d = (typeof OWNERS_4D)[number];

export interface Intencao4d {
  /** Intenção primária — única entre os owners. */
  primaria: string;
  /** Intenções que esta página NÃO deve tentar responder. */
  evitar: string[];
  /** Owner real que responde cada intenção evitada (mesma ordem). */
  encaminharPara: Owner4d[];
}

export const INTENCOES_4D: Record<Owner4d, Intencao4d> = {
  "/empresa-de-ti-curitiba": {
    primaria:
      "Empresa sem TI interna procurando quem assuma a triagem e a priorização dos chamados do parque em Curitiba e São José dos Pinhais",
    evitar: [
      "comparação entre atendimento remoto e presencial",
      "como pedir nota fiscal e faturar para o CNPJ",
    ],
    encaminharPara: ["/servicos/suporte-tecnico-empresarial", "/empresas"],
  },
  "/empresas": {
    primaria:
      "Responsável administrativo querendo entender contratação, emissão de nota fiscal de serviço e composição do valor cobrado do CNPJ",
    evitar: [
      "rotina de cópia e teste de restauração de arquivos",
      "preparo de estação para colaborador fora do escritório",
    ],
    encaminharPara: ["/servicos/backup-para-empresas", "/servicos/suporte-home-office"],
  },
  "/servicos/suporte-tecnico-empresarial": {
    primaria:
      "Chamado empresarial aberto agora: decidir se o atendimento resolve por acesso remoto, exige deslocamento ao escritório ou recolhimento para bancada",
    evitar: [
      "planejamento de trocas e vida útil do parque de máquinas",
      "triagem de quem responde pela operação da empresa",
    ],
    encaminharPara: [
      "/servicos/manutencao-preventiva-empresas",
      "/empresa-de-ti-curitiba",
    ],
  },
  "/servicos/manutencao-preventiva-empresas": {
    primaria:
      "Empresa que quer reduzir paradas repetidas planejando limpeza, substituição de peças de desgaste e renovação por idade do equipamento",
    evitar: [
      "urgência de máquina parada no meio do expediente",
      "cópia de dados críticos e retenção de versões",
    ],
    encaminharPara: [
      "/servicos/suporte-tecnico-empresarial",
      "/servicos/backup-para-empresas",
    ],
  },
  "/servicos/backup-para-empresas": {
    primaria:
      "Proteção de arquivos de trabalho do CNPJ: onde a cópia fica, com que frequência roda e como provar que a restauração funciona",
    evitar: [
      "escolha entre visita técnica e acesso remoto",
      "condições comerciais e emissão de documento fiscal",
    ],
    encaminharPara: ["/servicos/suporte-tecnico-empresarial", "/empresas"],
  },
  "/servicos/suporte-home-office": {
    primaria:
      "Preparar, entregar e dar suporte à estação de um colaborador que trabalha fora do escritório, incluindo contas e acesso aos sistemas da empresa",
    evitar: [
      "manutenção programada de parque presencial",
      "governança dos chamados de toda a operação",
    ],
    encaminharPara: [
      "/servicos/manutencao-preventiva-empresas",
      "/empresa-de-ti-curitiba",
    ],
  },
};

/** FAQ visível (não entra em JSON-LD) — perguntas reais de compra B2B. */
export interface Faq4d {
  pergunta: string;
  resposta: string;
}

export const FAQ_4D: Record<Owner4d, Faq4d[]> = {
  "/empresa-de-ti-curitiba": [
    {
      pergunta: "Vocês assumem a TI de quem nunca teve um responsável interno?",
      resposta:
        "Sim. Começamos levantando o que existe hoje: quantas estações, quais sistemas de terceiros a operação usa, quem tem senha de administrador e onde os arquivos ficam. Esse levantamento vira uma lista de pendências ordenada por impacto, e você decide o que entra primeiro.",
    },
    {
      pergunta: "Atendem em São José dos Pinhais além de Curitiba?",
      resposta:
        "Sim, São José dos Pinhais faz parte da área presencial junto com Curitiba e cidades vizinhas da região metropolitana. O deslocamento é informado antes do aceite, conforme a distância da base.",
    },
    {
      pergunta: "Quem abre chamado dentro da empresa?",
      resposta:
        "Você define um ou dois interlocutores. Isso evita pedidos duplicados vindos de pessoas diferentes sobre o mesmo problema e mantém o histórico do parque coerente.",
    },
  ],
  "/empresas": [
    {
      pergunta: "Emitem nota fiscal de serviço para o CNPJ?",
      resposta:
        "Sim. A nota fiscal de serviço é emitida para o CNPJ informado no aceite, com a descrição do que foi executado. Peças, quando existem, aparecem discriminadas separadamente da mão de obra.",
    },
    {
      pergunta: "Como o valor é formado?",
      resposta:
        "O valor considera a mão de obra técnica, a modalidade escolhida, o deslocamento quando há visita e as peças efetivamente aplicadas. Nada é executado antes de você aprovar essa composição por escrito.",
    },
    {
      pergunta: "Existe contratação recorrente?",
      resposta:
        "O atendimento é avulso por padrão. Empresas que preferem previsibilidade combinam uma frequência de visitas, sempre com escopo descrito e aprovado a cada ciclo — não há pacote fechado vendido antecipadamente.",
    },
  ],
  "/servicos/suporte-tecnico-empresarial": [
    {
      pergunta: "Quando o chamado resolve por acesso remoto?",
      resposta:
        "Quando a máquina liga, entra no sistema operacional e alcança a internet. Erro de aplicativo, impressora que sumiu do sistema, perfil de usuário e configuração de acesso costumam se resolver sem deslocamento.",
    },
    {
      pergunta: "E se a máquina nem liga?",
      resposta:
        "Sem sistema operacional acessível, o acesso remoto não existe. Nesse caso é visita ao escritório ou recolhimento para bancada, dependendo do que a inspeção inicial mostrar.",
    },
    {
      pergunta: "O técnico mexe no sistema do nosso fornecedor?",
      resposta:
        "Atuamos na camada de estação, rede e acesso. O funcionamento interno de ERP, sistema contábil ou plataforma mantida por terceiros continua com o fornecedor; registramos por escrito o que foi constatado para você repassar a ele.",
    },
  ],
  "/servicos/manutencao-preventiva-empresas": [
    {
      pergunta: "Com que frequência a preventiva faz sentido?",
      resposta:
        "Depende do ambiente. Escritório com pouca poeira e máquinas novas tolera intervalos longos; ambiente com serragem, fritura, tinta ou circulação intensa de pessoas exige janelas mais curtas porque o acúmulo em dissipador é mais rápido.",
    },
    {
      pergunta: "Preventiva evita qualquer parada?",
      resposta:
        "Não. Ela reduz falhas previsíveis ligadas a desgaste e sujeira, e antecipa a troca de componentes que já demonstram sinais de fim de vida. Defeito eletrônico súbito continua possível em qualquer parque.",
    },
    {
      pergunta: "A preventiva pode ser feita fora do expediente?",
      resposta:
        "Sim, quando a empresa disponibiliza acesso ao local e alguém responsável presente. A janela é combinada previamente, considerando disponibilidade de agenda.",
    },
  ],
  "/servicos/backup-para-empresas": [
    {
      pergunta: "Backup em nuvem substitui cópia local?",
      resposta:
        "Um não anula o outro. A cópia local devolve volumes grandes rapidamente; a cópia externa protege contra incêndio, furto e criptografia por ransomware que alcance a rede inteira. Ambientes críticos mantêm as duas.",
    },
    {
      pergunta: "Como sabemos que o backup realmente funciona?",
      resposta:
        "Restaurando. Sem um teste de restauração periódico, você só tem a suposição de que a cópia existe. Registramos data, arquivo escolhido e tempo gasto para devolver o conteúdo.",
    },
    {
      pergunta: "Vocês têm acesso ao conteúdo dos arquivos?",
      resposta:
        "O acesso é limitado ao necessário para configurar e verificar a rotina, sempre com autorização registrada da empresa. Credenciais permanecem sob custódia de quem responde pela operação.",
    },
  ],
  "/servicos/suporte-home-office": [
    {
      pergunta: "Preparam a máquina antes de entregar ao colaborador?",
      resposta:
        "Sim. Sistema atualizado, contas separadas por pessoa, aplicativos de trabalho instalados, pastas sincronizadas e uma verificação de que o acesso aos sistemas da empresa funciona antes da entrega.",
    },
    {
      pergunta: "Atendem colaborador que mora fora da região?",
      resposta:
        "Remotamente sim, desde que a máquina ligue e alcance a internet. Intervenção física fora de Curitiba e região metropolitana precisa de combinação específica caso a caso.",
    },
    {
      pergunta: "Quem paga o atendimento: a empresa ou o colaborador?",
      resposta:
        "Quem contrata é a empresa, e o aceite do escopo vem de quem responde pelo CNPJ. O colaborador participa apenas descrevendo o que está acontecendo na estação dele.",
    },
  ],
};

/**
 * Mensagens de WhatsApp pré-preenchidas por owner e cidade.
 * Nenhum número aparece no texto — o funil global injeta o destino.
 */
export const CIDADES_4D = ["Curitiba", "São José dos Pinhais"] as const;
export type Cidade4d = (typeof CIDADES_4D)[number];

const ABERTURA_4D: Record<Owner4d, string> = {
  "/empresa-de-ti-curitiba":
    "Somos uma empresa sem TI interna e queremos organizar a triagem dos chamados",
  "/empresas":
    "Queremos entender contratação, nota fiscal e composição de valor para o nosso CNPJ",
  "/servicos/suporte-tecnico-empresarial":
    "Temos um chamado empresarial aberto e precisamos definir remoto, visita ou bancada",
  "/servicos/manutencao-preventiva-empresas":
    "Queremos planejar manutenção preventiva do parque de máquinas da empresa",
  "/servicos/backup-para-empresas":
    "Queremos revisar a rotina de backup e o teste de restauração dos arquivos da empresa",
  "/servicos/suporte-home-office":
    "Precisamos preparar e dar suporte à estação de um colaborador em home office",
};

export function mensagemWhatsapp4d(path: string, cidade: Cidade4d = "Curitiba"): string | null {
  const abertura = ABERTURA_4D[path as Owner4d];
  if (!abertura) return null;
  const slug = path.replace(/^\//, "").replace(/\//g, "-");
  return `Olá! ${abertura}. Estamos em ${cidade}.\n\n_[cat=empresa · owner=${slug} · cidade=${cidade
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]+/g, "-")}]_`;
}

export const ENRIQUECIMENTO_4D: Record<Owner4d, EnriquecimentoConteudo> = {
  "/empresa-de-ti-curitiba": {
    respostaRapida:
      "Empresa sem departamento interno costuma perder tempo decidindo quem cuida do quê. A triagem resolve isso antes da parte técnica: identificamos quem responde pela operação, quantas estações existem, quais fornecedores externos mantêm sistemas próprios e onde ficam os arquivos que a equipe usa todo dia. Com esse mapa, cada pedido que chega recebe uma classificação de impacto — quantas pessoas pararam, se há alternativa temporária, se a demanda é da camada de estação ou do fornecedor do sistema. Isso não cria prioridade automática nem promessa de prazo: cria ordem de decisão, para que ninguém gaste uma manhã tentando resolver por conta o que já era responsabilidade contratual de terceiro.",
    tabelaExtra: {
      titulo: "Triagem: de quem é a demanda antes de acionar o técnico",
      colunas: {
        sintoma: "Pedido que chega",
        causa: "Camada responsável",
        verificar: "Levantar antes",
        acao: "Encaminhamento",
      },
      linhas: [
        {
          sintoma: "Sistema de gestão apresenta erro na tela",
          causa: "Fornecedor do software",
          verificar: "O erro aparece em outras estações e em outro navegador",
          acao: "Abrir chamado no fornecedor com o print e o horário",
        },
        {
          sintoma: "Uma estação isolada não abre nada",
          causa: "Camada de estação",
          verificar: "Se liga, se chega à área de trabalho, se enxerga a rede",
          acao: "Chamado técnico com a máquina identificada",
        },
        {
          sintoma: "Escritório inteiro sem internet",
          causa: "Operadora ou equipamento de borda",
          verificar: "Luzes do modem e se o cabo do provedor está ativo",
          acao: "Acionar a operadora antes de deslocar técnico",
        },
        {
          sintoma: "Colaborador novo sem acesso",
          causa: "Cadastro e permissão",
          verificar: "Quem autoriza a criação da conta e em quais sistemas",
          acao: "Autorização escrita do responsável, depois execução",
        },
        {
          sintoma: "Impressora somem da lista das máquinas",
          causa: "Camada de rede local",
          verificar: "Se o equipamento tem endereço fixo na rede",
          acao: "Ajuste de endereçamento junto ao técnico",
        },
        {
          sintoma: "Arquivo antigo desapareceu da pasta compartilhada",
          causa: "Governança de arquivo",
          verificar: "Quem tinha permissão de escrita naquela pasta",
          acao: "Verificar histórico antes de qualquer recuperação",
        },
        {
          sintoma: "Senha de administrador ninguém sabe",
          causa: "Custódia de credencial",
          verificar: "Quem instalou o parque e o que ficou documentado",
          acao: "Reconstituir custódia com autorização do sócio responsável",
        },
      ],
    },
    blocos: [
      {
        id: "b2b-governanca",
        titulo: "O que a empresa precisa decidir antes do primeiro chamado",
        intro:
          "Quatro definições evitam retrabalho e discussão sobre autorização depois que o técnico já está no local.",
        itens: [
          {
            titulo: "Interlocutor único",
            desc: "Uma ou duas pessoas concentram os pedidos. Sem isso, três funcionários relatam o mesmo travamento como se fossem ocorrências distintas.",
          },
          {
            titulo: "Quem autoriza gasto",
            desc: "Nomear quem pode aprovar peça e mão de obra encurta a espera entre diagnóstico pronto e execução liberada.",
          },
          {
            titulo: "Inventário mínimo",
            desc: "Identificação por etiqueta, modelo e setor de cada máquina. Sem identificação, o histórico de reincidência não se sustenta.",
          },
          {
            titulo: "Fronteira com fornecedores",
            desc: "Listar quais sistemas são mantidos por terceiros deixa claro onde a nossa atuação termina e a do fornecedor começa.",
          },
        ],
      },
      {
        id: "b2b-cobertura-metropolitana",
        titulo: "Curitiba e São José dos Pinhais na prática",
        intro:
          "Empresa com filial nas duas cidades organiza a agenda de forma diferente de quem tem endereço único.",
        itens: [
          {
            titulo: "Sede em Curitiba, operação em SJP",
            desc: "Vale concentrar demandas presenciais da filial numa mesma janela, em vez de deslocar por chamado isolado.",
          },
          {
            titulo: "Deslocamento informado antes",
            desc: "A distância da base entra no valor e aparece no aceite. Você aprova o total, não descobre depois.",
          },
          {
            titulo: "Máquina crítica identificada",
            desc: "Saber qual equipamento trava o faturamento muda a ordem do atendimento quando duas unidades pedem visita no mesmo dia.",
          },
        ],
      },
    ],
  },

  "/empresas": {
    respostaRapida:
      "A dúvida mais frequente de quem administra o financeiro não é técnica: é como o gasto entra na contabilidade. Trabalhamos com nota fiscal de serviço emitida para o CNPJ informado no aceite, com descrição do que foi executado e separação explícita entre mão de obra e peça aplicada. O orçamento sai antes da execução, em texto, contendo modalidade escolhida, deslocamento quando existe visita e componentes previstos. Se durante a execução aparecer algo fora do combinado, o trabalho para e volta para aprovação. Não há cobrança de adesão, nem valor debitado automaticamente todo mês: cada atendimento tem seu próprio aceite, e o histórico de aceites fica disponível para conferência do contador.",
    tabelaExtra: {
      titulo: "Como cada item aparece no orçamento e na nota",
      colunas: {
        sintoma: "Item cobrado",
        causa: "O que ele cobre",
        verificar: "Quando incide",
        acao: "Documento",
      },
      linhas: [
        {
          sintoma: "Mão de obra técnica",
          causa: "Tempo do profissional no diagnóstico e na execução",
          verificar: "Em todo atendimento concluído",
          acao: "Descrito na nota fiscal de serviço",
        },
        {
          sintoma: "Deslocamento",
          causa: "Trajeto até o endereço da empresa",
          verificar: "Somente em visita presencial",
          acao: "Informado no orçamento antes do aceite",
        },
        {
          sintoma: "Peça aplicada",
          causa: "Componente físico substituído",
          verificar: "Quando o diagnóstico indica troca aprovada",
          acao: "Discriminada em separado da mão de obra",
        },
        {
          sintoma: "Diária técnica",
          causa: "Permanência prolongada para volume grande de estações",
          verificar: "Em mutirões combinados previamente",
          acao: "Valor acordado no aceite específico",
        },
        {
          sintoma: "Retorno na garantia",
          causa: "Revisão do mesmo serviço já executado",
          verificar: "Dentro do prazo e do escopo registrado",
          acao: "Sem nova cobrança de mão de obra do item coberto",
        },
        {
          sintoma: "Serviço fora do escopo aprovado",
          causa: "Demanda descoberta durante a execução",
          verificar: "Sempre que o achado extrapola o combinado",
          acao: "Novo orçamento, nova aprovação por escrito",
        },
      ],
    },
    blocos: [
      {
        id: "b2b-comercial",
        titulo: "Perguntas do administrativo respondidas sem rodeio",
        itens: [
          {
            titulo: "Precisa de contrato assinado?",
            desc: "Para atendimento avulso, o aceite escrito do orçamento basta. Empresas com política interna de compras recebem o documento no formato que o jurídico pedir.",
          },
          {
            titulo: "Aceita empenho ou portal de fornecedor?",
            desc: "Cadastro em portal é possível; o prazo de faturamento segue a rotina da sua área de compras, combinada antes da execução.",
          },
          {
            titulo: "Como fica a garantia?",
            desc: "A garantia cobre o serviço executado e a peça aplicada, dentro do escopo descrito. Falha em componente diferente do intervencionado é novo atendimento.",
          },
          {
            titulo: "Quem assina o aceite?",
            desc: "Quem responde pelo CNPJ ou pessoa formalmente indicada por ele. Colaborador sem alçada pode relatar o problema, mas não autoriza gasto.",
          },
        ],
      },
      {
        id: "b2b-valorizacao",
        titulo: "Por que não trabalhamos com o menor preço",
        intro:
          "Transparência sobre a política comercial evita negociação improdutiva dos dois lados.",
        itens: [
          {
            titulo: "Diária mínima de referência",
            desc: "Não atuamos abaixo de R$ 200 por diária profissional. Abaixo disso, o atendimento deixa de comportar ferramenta, deslocamento e responsabilidade técnica.",
          },
          {
            titulo: "Diagnóstico não é palpite",
            desc: "Tempo gasto em medição e teste também é trabalho. Cobrar por ele é o que permite recusar troca desnecessária de peça.",
          },
          {
            titulo: "Recusa registrada",
            desc: "Quando o conserto não compensa diante do valor do equipamento, dizemos isso por escrito em vez de empurrar serviço.",
          },
        ],
      },
    ],
  },

  "/servicos/suporte-tecnico-empresarial": {
    respostaRapida:
      "A primeira decisão de qualquer chamado corporativo é a modalidade, e ela não é preferência: é consequência do estado da máquina. Se o equipamento liga, entra na área de trabalho e alcança a internet, o acesso remoto costuma bastar — perfil de usuário, aplicativo que parou de abrir, impressora que sumiu da lista, credencial expirada. Se o equipamento não inicializa, mostra tela preta, reinicia sozinho ou depende de cabo, tomada e switch, é presença física: visita ao escritório para intervenções rápidas ou recolhimento para bancada quando o serviço exige desmontagem, medição em componente e tempo de observação. Descrever o estado inicial com precisão evita deslocar alguém para algo que se resolvia por conexão remota em minutos.",
    tabelaExtra: {
      titulo: "Remoto, visita ou bancada: como o chamado é classificado",
      colunas: {
        sintoma: "Situação relatada",
        causa: "Restrição técnica",
        verificar: "Confirmação rápida",
        acao: "Modalidade indicada",
      },
      linhas: [
        {
          sintoma: "Aplicativo de trabalho não abre em uma estação",
          causa: "Camada de software acessível pela rede",
          verificar: "A máquina navega na internet normalmente",
          acao: "Acesso remoto",
        },
        {
          sintoma: "Estação liga mas trava ao entrar no perfil",
          causa: "Perfil corrompido, ainda alcançável",
          verificar: "Se outro usuário local consegue entrar",
          acao: "Acesso remoto na conta alternativa",
        },
        {
          sintoma: "Tela preta com ventoinha girando",
          causa: "Sem sistema operacional carregado",
          verificar: "Se há imagem em outro monitor ou saída de vídeo",
          acao: "Visita para inspeção inicial",
        },
        {
          sintoma: "Cabo de rede solto, ponto sem link",
          causa: "Camada física do cabeamento",
          verificar: "Luz da porta no switch e na placa",
          acao: "Visita ao escritório",
        },
        {
          sintoma: "Reinício aleatório sob carga",
          causa: "Exige observação prolongada e medição",
          verificar: "Se acontece também fora do horário de pico",
          acao: "Bancada, com prazo de observação",
        },
        {
          sintoma: "Notebook com dobradiça ou conector danificado",
          causa: "Serviço mecânico com desmontagem",
          verificar: "Se o dano impede fechar ou carregar",
          acao: "Bancada",
        },
        {
          sintoma: "Impressora de rede fora do ar para todos",
          causa: "Endereçamento ou fila do equipamento",
          verificar: "Se o painel da impressora acusa erro",
          acao: "Remoto primeiro; visita se persistir",
        },
      ],
    },
    blocos: [
      {
        id: "b2b-modalidade-limites",
        titulo: "Limites honestos de cada modalidade",
        itens: [
          {
            titulo: "Remoto não vê hardware",
            desc: "Conexão remota inspeciona configuração e registro do sistema. Ela não mede tensão, não escuta ruído de ventoinha nem enxerga capacitor estufado.",
          },
          {
            titulo: "Visita tem janela",
            desc: "No escritório o técnico trabalha com o equipamento em uso e com pessoas ao redor. Serviços que exigem horas de teste rendem mais na bancada.",
          },
          {
            titulo: "Bancada implica ausência",
            desc: "O equipamento sai da operação por um período. Vale planejar máquina reserva antes de autorizar o recolhimento.",
          },
        ],
      },
      {
        id: "b2b-informacao-util",
        titulo: "O que informar ao abrir o chamado",
        intro:
          "Cinco dados encurtam a triagem e reduzem a chance de deslocamento desnecessário.",
        itens: [
          {
            titulo: "Identificação da máquina",
            desc: "Etiqueta, setor ou nome de rede. 'O computador da recepção' funciona; 'o computador' não.",
          },
          {
            titulo: "Desde quando",
            desc: "Começou hoje, piorou na semana ou já era intermitente há meses muda completamente a hipótese inicial.",
          },
          {
            titulo: "O que mudou antes",
            desc: "Atualização instalada, troca de tomada, mudança de sala, queda de energia ou instalação de aplicativo novo.",
          },
          {
            titulo: "Quantos afetados",
            desc: "Uma pessoa, um setor ou o escritório inteiro. Isso separa problema de estação de problema de rede.",
          },
          {
            titulo: "O que já tentaram",
            desc: "Reinício, troca de cabo, outro usuário. Repetir o que já falhou é tempo cobrado sem resultado novo.",
          },
        ],
      },
    ],
  },

  "/servicos/manutencao-preventiva-empresas": {
    respostaRapida:
      "Preventiva empresarial não é limpeza superficial: é intervenção programada em cima de desgaste previsível. Pasta térmica ressecada eleva temperatura e derruba desempenho antes de qualquer travamento aparecer; poeira compactada em dissipador transforma ventoinha em aquecedor; fonte antiga perde estabilidade e provoca reinícios que parecem defeito de software. Em paralelo, o parque envelhece de forma desigual — máquinas compradas no mesmo lote chegam juntas ao fim de vida útil e podem quebrar em sequência. Planejar substituição por idade e por criticidade distribui o investimento ao longo do ano, em vez de concentrar compras emergenciais no pior momento. O objetivo é reduzir falha previsível, não prometer parque imune.",
    tabelaExtra: {
      titulo: "Desgaste programado: o que inspecionar e quando renovar",
      colunas: {
        sintoma: "Componente",
        causa: "Tipo de desgaste",
        verificar: "Sinal observável",
        acao: "Decisão preventiva",
      },
      linhas: [
        {
          sintoma: "Pasta térmica do processador",
          causa: "Ressecamento por ciclo térmico",
          verificar: "Temperatura alta com uso leve",
          acao: "Reaplicação periódica na janela programada",
        },
        {
          sintoma: "Ventoinha e dissipador",
          causa: "Acúmulo de poeira e desgaste de rolamento",
          verificar: "Ruído crescente e ar quente saindo fraco",
          acao: "Limpeza no ciclo; troca quando há folga no eixo",
        },
        {
          sintoma: "Fonte de alimentação",
          causa: "Envelhecimento de capacitores",
          verificar: "Reinício sob carga e cheiro característico",
          acao: "Substituição preventiva em máquinas antigas críticas",
        },
        {
          sintoma: "Disco mecânico em uso contínuo",
          causa: "Fadiga mecânica de partes móveis",
          verificar: "Contadores de saúde e lentidão progressiva",
          acao: "Planejar migração antes da falha",
        },
        {
          sintoma: "Bateria de notebook corporativo",
          causa: "Perda de capacidade por ciclos",
          verificar: "Autonomia muito abaixo da original",
          acao: "Troca programada por lote de aquisição",
        },
        {
          sintoma: "Cabeamento e conectores de rede",
          causa: "Esforço mecânico e mau contato",
          verificar: "Queda intermitente em um único ponto",
          acao: "Recrimpagem ou substituição do lance",
        },
        {
          sintoma: "Nobreak do setor crítico",
          causa: "Bateria com vida útil vencida",
          verificar: "Autonomia de segundos em teste de queda",
          acao: "Substituição do banco de bateria",
        },
      ],
    },
    blocos: [
      {
        id: "b2b-ciclo-parque",
        titulo: "Como montar um ciclo de manutenção que a operação suporta",
        intro:
          "A janela precisa caber na rotina da empresa, senão a preventiva é adiada indefinidamente.",
        itens: [
          {
            titulo: "Divida o parque em lotes",
            desc: "Atender tudo no mesmo dia paralisa o escritório. Lotes por setor mantêm a operação rodando enquanto uma fração é revisada.",
          },
          {
            titulo: "Classifique por criticidade",
            desc: "A máquina do faturamento e a do caixa merecem inspeção mais frequente que uma estação de consulta ocasional.",
          },
          {
            titulo: "Registre o que foi encontrado",
            desc: "Histórico por etiqueta revela reincidência. Três intervenções no mesmo equipamento em um ano é sinal de substituição, não de nova limpeza.",
          },
          {
            titulo: "Considere o ambiente",
            desc: "Marcenaria, cozinha industrial e oficina exigem intervalos menores que escritório fechado com ar-condicionado.",
          },
        ],
      },
      {
        id: "b2b-renovacao",
        titulo: "Quando renovar em vez de insistir no conserto",
        itens: [
          {
            titulo: "Custo acumulado supera o valor",
            desc: "Somar as intervenções do último ano e comparar com o preço de reposição costuma encerrar a dúvida rapidamente.",
          },
          {
            titulo: "Peça sem reposição no mercado",
            desc: "Modelos descontinuados dependem de componente usado, o que aumenta a chance de nova parada.",
          },
          {
            titulo: "Desempenho abaixo da tarefa",
            desc: "Máquina saudável mas insuficiente para o software atual não melhora com limpeza; melhora com upgrade ou troca.",
          },
        ],
      },
    ],
  },

  "/servicos/backup-para-empresas": {
    respostaRapida:
      "Backup empresarial se resume a três perguntas que quase nenhuma pequena empresa responde com segurança: onde a cópia está, com que frequência ela roda e quando foi a última vez que alguém restaurou algo de verdade. Cópia que mora no mesmo disco do arquivo original não é backup — some junto na primeira falha física ou criptografia por ransomware. Sincronização de nuvem também não substitui histórico: se o arquivo for corrompido ou apagado, a sincronização propaga o estrago para todas as máquinas em segundos. O que protege operação é a combinação de destino separado, retenção com versões anteriores e teste de restauração registrado. Sem o teste, o que existe é expectativa, não proteção.",
    tabelaExtra: {
      titulo: "Falhas comuns de cópia e o que elas deixam desprotegido",
      colunas: {
        sintoma: "Arranjo encontrado",
        causa: "Falsa sensação de segurança",
        verificar: "Como testar",
        acao: "Correção sugerida",
      },
      linhas: [
        {
          sintoma: "Pasta copiada para outra pasta do mesmo disco",
          causa: "Um único ponto de falha físico",
          verificar: "Retirar o disco e tentar acessar a cópia",
          acao: "Destino externo separado do original",
        },
        {
          sintoma: "HD externo permanentemente conectado",
          causa: "Ransomware alcança a unidade montada",
          verificar: "Se a unidade aparece sempre no explorador",
          acao: "Desconexão entre ciclos ou destino inacessível ao usuário",
        },
        {
          sintoma: "Sincronização de nuvem sem versionamento",
          causa: "Erro se propaga para todas as máquinas",
          verificar: "Se é possível recuperar a versão de ontem",
          acao: "Ativar histórico de versões e retenção",
        },
        {
          sintoma: "Cópia manual feita quando alguém lembra",
          causa: "Intervalo real desconhecido",
          verificar: "Data de modificação do último arquivo copiado",
          acao: "Rotina automática com frequência definida",
        },
        {
          sintoma: "Backup só da pasta de documentos",
          causa: "Banco de dados do sistema fica de fora",
          verificar: "Onde o sistema de gestão grava os dados",
          acao: "Incluir diretório do banco e configurações",
        },
        {
          sintoma: "Ninguém confere se a rotina rodou",
          causa: "Falha silenciosa por semanas",
          verificar: "Registro de execução e tamanho do último conjunto",
          acao: "Conferência periódica com responsável nomeado",
        },
        {
          sintoma: "Restauração nunca testada",
          causa: "Cópia possivelmente ilegível",
          verificar: "Restaurar um arquivo real e abrir o conteúdo",
          acao: "Teste registrado com data e tempo gasto",
        },
      ],
    },
    blocos: [
      {
        id: "b2b-desenho-copia",
        titulo: "Desenho mínimo de proteção para pequena empresa",
        intro:
          "Não é preciso estrutura corporativa cara: é preciso separação de destino e disciplina de conferência.",
        itens: [
          {
            titulo: "Duas cópias, destinos diferentes",
            desc: "Uma próxima, para devolver volume grande rápido; outra fora do prédio, para sobreviver a incêndio, furto e criptografia.",
          },
          {
            titulo: "Retenção com versões",
            desc: "Guardar apenas a última cópia significa perder o arquivo bom quando o estrago é descoberto dias depois.",
          },
          {
            titulo: "Responsável nomeado",
            desc: "Alguém precisa olhar o registro de execução. Rotina sem dono falha em silêncio até o dia da emergência.",
          },
          {
            titulo: "Teste de restauração",
            desc: "Escolher um arquivo aleatório, restaurar e abrir. Anotar data e duração — esse número vira sua expectativa real de retomada.",
          },
        ],
      },
      {
        id: "b2b-dados-limites",
        titulo: "O que backup não resolve",
        itens: [
          {
            titulo: "Não substitui recuperação de dados",
            desc: "Disco já falhado sem cópia é outro serviço, com avaliação em laboratório e resultado incerto por natureza.",
          },
          {
            titulo: "Não garante conformidade",
            desc: "Ter cópia é requisito operacional; adequação regulatória depende de política interna, contratos e tratamento dado pela própria empresa.",
          },
          {
            titulo: "Não protege credencial vazada",
            desc: "Se a senha do administrador circula por bilhete na mesa, o problema é custódia de acesso, não frequência de cópia.",
          },
        ],
      },
    ],
  },

  "/servicos/suporte-home-office": {
    respostaRapida:
      "Colaborador remoto começa a produzir no dia em que a estação chega pronta — e trava por dias quando chega crua. O preparo envolve sistema atualizado, conta individual separada da conta de administrador, aplicativos de trabalho instalados, pastas de trabalho sincronizadas, impressora doméstica reconhecida quando necessário e uma verificação real de que o acesso aos sistemas da empresa abre antes da entrega. Depois disso, o suporte cotidiano é quase todo remoto: videochamada que congela por causa do enlace doméstico, VPN que cai, câmera não reconhecida, atualização que reiniciou no meio do expediente. O gargalo mais comum não é a máquina, é o enlace de internet residencial e o posicionamento do roteador dentro da casa.",
    tabelaExtra: {
      titulo: "Entrega e rotina da estação remota",
      colunas: {
        sintoma: "Momento",
        causa: "Risco típico",
        verificar: "Checagem antes de liberar",
        acao: "Responsável",
      },
      linhas: [
        {
          sintoma: "Preparo da máquina nova",
          causa: "Entregar sem aplicativo de trabalho",
          verificar: "Abrir cada sistema usado pela função",
          acao: "Técnico, com lista fornecida pela empresa",
        },
        {
          sintoma: "Criação de contas",
          causa: "Colaborador usando conta de administrador",
          verificar: "Perfil comum criado e testado",
          acao: "Autorização registrada da empresa",
        },
        {
          sintoma: "Acesso remoto aos sistemas",
          causa: "VPN ou credencial não testada",
          verificar: "Login concluído a partir da rede doméstica",
          acao: "Teste conjunto antes da entrega",
        },
        {
          sintoma: "Sincronização de arquivos",
          causa: "Trabalho salvo só na área de trabalho local",
          verificar: "Pasta sincronizada e espelhada",
          acao: "Configuração na preparação",
        },
        {
          sintoma: "Chamada de vídeo instável",
          causa: "Enlace doméstico ou Wi-Fi fraco no cômodo",
          verificar: "Teste com cabo e com o roteador próximo",
          acao: "Orientação ao colaborador; provedor se persistir",
        },
        {
          sintoma: "Desligamento do colaborador",
          causa: "Máquina volta com dados e contas ativas",
          verificar: "Inventário de retorno e arquivos preservados",
          acao: "Higienização e reentrega para o próximo",
        },
      ],
    },
    blocos: [
      {
        id: "b2b-onboarding",
        titulo: "Roteiro de entrega para quem contrata a distância",
        intro:
          "Sequência que evita o colaborador estrear a semana sem conseguir trabalhar.",
        itens: [
          {
            titulo: "Lista de aplicativos por função",
            desc: "Vendas, financeiro e produção usam programas distintos. Preparar sem essa lista gera dois atendimentos em vez de um.",
          },
          {
            titulo: "Credenciais no dia certo",
            desc: "Conta criada com antecedência e senha entregue diretamente à pessoa, nunca por grupo de mensagens da equipe.",
          },
          {
            titulo: "Documento de posse",
            desc: "Registrar número de série e acessórios entregues resolve discussão futura sobre devolução.",
          },
          {
            titulo: "Primeiro contato de suporte",
            desc: "O colaborador precisa saber a quem recorrer antes de improvisar reinstalação por conta própria.",
          },
        ],
      },
      {
        id: "b2b-enlace-domestico",
        titulo: "A casa do colaborador faz parte do problema",
        itens: [
          {
            titulo: "Distância até o roteador",
            desc: "Parede de concreto e cômodo nos fundos derrubam o sinal mais do que a maioria imagina. Cabo resolve o que troca de máquina não resolve.",
          },
          {
            titulo: "Concorrência de banda",
            desc: "Streaming e jogos de outros moradores disputam o mesmo enlace no horário comercial.",
          },
          {
            titulo: "Equipamento do provedor",
            desc: "Modem antigo fornecido pela operadora costuma limitar mais que o plano contratado. A troca é pedida à operadora, não à empresa.",
          },
        ],
      },
    ],
  },
};

/** Conteúdo 4D de um caminho, ou null (fail-closed) quando não é owner. */
export const enriquecimento4d = (path: string): EnriquecimentoConteudo | null =>
  ENRIQUECIMENTO_4D[path as Owner4d] ?? null;

export const faq4d = (path: string): Faq4d[] | null => FAQ_4D[path as Owner4d] ?? null;

export const intencao4d = (path: string): Intencao4d | null =>
  INTENCOES_4D[path as Owner4d] ?? null;

export const isOwner4d = (path: string): path is Owner4d =>
  (OWNERS_4D as readonly string[]).includes(path);
