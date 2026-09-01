/**
 * ============================================================================
 * ATLAS DE INFORMÁTICA — FASE 1 (fonte única do hub /guia-tecnico-informatica)
 * ============================================================================
 * Nove temas nacionais, cada um com uma trilha editorial fixa de cinco etapas:
 *
 *   aprender → identificar → verificar → parar → resolver
 *
 * Regras não negociáveis:
 *  - TODO link aponta para URL que já existe (rota estática, /problemas/*,
 *    /solucoes/* ou /blog/<slug> APROVADO no registro editorial fail-closed).
 *  - Nenhum artigo é listado aqui sem aprovação em blogEditorialRegistry.ts;
 *    a renderização refiltra via isEditorialApproved() (fail-closed em dobro).
 *  - Nada aqui cria URL nova, promete prazo, inventa avaliação ou estatística.
 *  - Este módulo NÃO decide indexação de nada: é só malha de descoberta.
 *
 * Gates que dependem deste arquivo (parse por regex — manter literais simples):
 *  - scripts/check-atlas-hub.mjs        (SSR do hub: links, temas, JSON-LD)
 *  - src/__tests__/atlas-informatica.test.ts (integridade de dados e rotas)
 */
import { isEditorialApproved } from "@/lib/blogEditorialRegistry";
import { EDITORIAL_HUB_SUMMARIES } from "@/lib/editorialHubSummaries";

/** Data da última revisão material desta curadoria (Fase 1 do Atlas). */
export const ATLAS_REVISADO_EM = "2026-09-01";

export type AtlasEtapaId = "aprender" | "identificar" | "verificar" | "parar" | "resolver";

/** Ordem canônica da trilha — validada em teste. */
export const ATLAS_ETAPAS: readonly AtlasEtapaId[] = [
  "aprender",
  "identificar",
  "verificar",
  "parar",
  "resolver",
] as const;

export const ATLAS_ETAPA_LABEL: Record<AtlasEtapaId, string> = {
  aprender: "Aprender o fundamento",
  identificar: "Identificar o sintoma",
  verificar: "Verificações seguras",
  parar: "Quando parar",
  resolver: "Escolher a solução",
};

export interface AtlasEtapa {
  etapa: AtlasEtapaId;
  desc: string;
  to: string;
  linkLabel: string;
}

export interface AtlasLinkRef {
  to: string;
  label: string;
}

export interface AtlasTema {
  /** Também usado como âncora `#tema-<id>` e no ItemList do JSON-LD. */
  id: string;
  titulo: string;
  resumo: string;
  trilha: AtlasEtapa[];
  /** Slugs de /blog aprovados — refiltrados por isEditorialApproved(). */
  artigos: string[];
  problemas: AtlasLinkRef[];
  servicos: AtlasLinkRef[];
}

export const ATLAS_TEMAS: AtlasTema[] = [
  {
    id: "fundamentos",
    titulo: "Fundamentos de informática",
    resumo:
      "O que é informática, o que um iniciante precisa dominar primeiro e como o hardware, o sistema e a internet se relacionam. É a base para entender qualquer outro tema do Atlas.",
    trilha: [
      {
        etapa: "aprender",
        desc: "Comece pela definição e pelo escopo: o que a informática cobre e o que cada parte do computador faz.",
        to: "/blog/o-que-e-informatica",
        linkLabel: "O que é informática",
      },
      {
        etapa: "identificar",
        desc: "Quando algo não funciona, entre pelo sintoma em linguagem comum — sem precisar saber o nome técnico da falha.",
        to: "/problemas",
        linkLabel: "Hub de sintomas",
      },
      {
        etapa: "verificar",
        desc: "O primeiro nível da informática ensina as verificações que não colocam nada em risco: cabos, espaço em disco, atualizações.",
        to: "/blog/informatica-basica",
        linkLabel: "Informática básica",
      },
      {
        etapa: "parar",
        desc: "Se o comportamento envolve ruído de disco, cheiro de queimado ou dados importantes, pare e descreva o caso antes de tentar de novo.",
        to: "/diagnostico-tecnico",
        linkLabel: "Triagem técnica",
      },
      {
        etapa: "resolver",
        desc: "Entenda como um atendimento técnico funciona de ponta a ponta: triagem, modalidade, aprovação e execução.",
        to: "/como-funciona",
        linkLabel: "Como funciona o atendimento",
      },
    ],
    artigos: ["o-que-e-informatica", "informatica-basica", "como-aprender-informatica"],
    problemas: [{ to: "/problemas/computador-lento", label: "Computador ou notebook lento" }],
    servicos: [
      { to: "/como-funciona", label: "Como funciona o atendimento" },
      { to: "/servicos", label: "Todos os serviços" },
    ],
  },
  {
    id: "windows-inicializacao",
    titulo: "Windows e inicialização",
    resumo:
      "Boot, BIOS/UEFI, tela azul, reparo automático em laço e atualização que não conclui. O tema separa o que é software recuperável do que é sinal de falha física.",
    trilha: [
      {
        etapa: "aprender",
        desc: "Entenda o caminho da inicialização: firmware, modo UEFI ou Legacy e onde o Windows entra nessa sequência.",
        to: "/blog/boot-uefi-ou-legacy-como-identificar",
        linkLabel: "UEFI ou Legacy",
      },
      {
        etapa: "identificar",
        desc: "O sintoma define o cenário: o sistema não carrega, reinicia sozinho ou para em uma tela de erro.",
        to: "/problemas/windows-nao-inicia",
        linkLabel: "Windows não inicia",
      },
      {
        etapa: "verificar",
        desc: "Veja o que tentar em ordem quando o Windows entra em reparo automático repetido — e o que cada tentativa prova.",
        to: "/blog/windows-reparo-automatico-em-loop",
        linkLabel: "Reparo automático em laço",
      },
      {
        etapa: "parar",
        desc: "Se o disco mostra setores defeituosos ou alerta SMART, o problema deixou de ser software: escrever nele agrava a perda.",
        to: "/blog/disco-com-setores-defeituosos-smart-o-que-fazer",
        linkLabel: "Setores defeituosos e SMART",
      },
      {
        etapa: "resolver",
        desc: "Quando a causa é sistema corrompido, a reinstalação com preservação de dados resolve — e o backup faz parte do serviço.",
        to: "/servicos/formatacao",
        linkLabel: "Formatação com backup",
      },
    ],
    artigos: [
      "como-resolver-tela-azul-windows",
      "codigos-de-erro-tela-azul-windows",
      "windows-reparo-automatico-em-loop",
      "windows-update-nao-funciona-o-que-verificar",
      "computador-entra-direto-na-bios",
      "como-instalar-windows-11-do-zero",
    ],
    problemas: [
      { to: "/problemas/windows-nao-inicia", label: "Windows não inicia" },
      { to: "/problemas/tela-azul", label: "Tela azul (BSOD)" },
    ],
    servicos: [
      { to: "/servicos/formatacao", label: "Formatação com backup" },
      { to: "/servicos/manutencao-de-computador", label: "Manutenção de computador" },
    ],
  },
  {
    id: "hardware-upgrades",
    titulo: "Hardware e upgrades",
    resumo:
      "SSD, memória RAM, fonte e placa-mãe: qual intervenção resolve qual limitação, como confirmar antes de comprar peça e quando o upgrade não é a resposta.",
    trilha: [
      {
        etapa: "aprender",
        desc: "O upgrade de maior impacto perceptível tem critério: entenda quando a troca de HD por SSD muda o uso e quando não muda.",
        to: "/blog/quando-trocar-hd-por-ssd",
        linkLabel: "HD ou SSD",
      },
      {
        etapa: "identificar",
        desc: "Lentidão tem famílias diferentes: logo ao ligar, com muitos programas abertos ou piorando com o tempo de uso.",
        to: "/problemas/computador-lento",
        linkLabel: "Computador lento",
      },
      {
        etapa: "verificar",
        desc: "Confirme se a memória é o gargalo observando os sintomas certos — antes de pagar por módulos que não resolvem.",
        to: "/blog/memoria-ram-insuficiente-sintomas",
        linkLabel: "RAM insuficiente",
      },
      {
        etapa: "parar",
        desc: "Quando a soma das peças se aproxima do valor de um equipamento equivalente, o reparo deixa de compensar — e isso é dito antes.",
        to: "/quando-nao-compensa",
        linkLabel: "Quando não compensa",
      },
      {
        etapa: "resolver",
        desc: "Compatibilidade conferida antes da compra, migração do sistema e teste: é o escopo do serviço de upgrade.",
        to: "/servicos/upgrade-ssd-ram",
        linkLabel: "Upgrade de SSD e memória",
      },
    ],
    artigos: [
      "quando-trocar-hd-por-ssd",
      "como-fazer-upgrade-ssd-nvme",
      "memoria-ram-insuficiente-sintomas",
      "testar-memoria-ram-memtest86",
      "como-clonar-hd-para-ssd",
      "como-diagnosticar-placa-mae-defeituosa",
    ],
    problemas: [
      { to: "/problemas/computador-lento", label: "Computador lento" },
      { to: "/problemas/notebook-nao-liga", label: "Notebook não liga" },
      { to: "/problemas/computador-nao-da-imagem", label: "Liga mas não dá imagem" },
    ],
    servicos: [
      { to: "/servicos/upgrade-ssd-ram", label: "Upgrade de SSD e memória" },
      { to: "/servicos/manutencao-de-computador", label: "Manutenção de computador" },
      { to: "/servicos/montagem-de-pc", label: "Montagem de PC sob medida" },
    ],
  },
  {
    id: "redes-wifi",
    titulo: "Redes e Wi-Fi",
    resumo:
      "Cobertura, quedas de sinal, internet lenta e dispositivos que somem da rede. O tema ensina a separar problema do provedor, do roteador e do ambiente físico.",
    trilha: [
      {
        etapa: "aprender",
        desc: "Configure o roteador do zero entendendo o que cada ajuste faz — nome de rede, senha, banda e posição.",
        to: "/blog/como-configurar-roteador-wifi-iniciantes",
        linkLabel: "Configurar o roteador",
      },
      {
        etapa: "identificar",
        desc: "Wi-Fi que cai, oscila ou não chega em cômodos específicos tem causas distintas de internet lenta em tudo.",
        to: "/problemas/wifi-instavel",
        linkLabel: "Wi-Fi instável",
      },
      {
        etapa: "verificar",
        desc: "Teste com método: cabo versus Wi-Fi, horário, quantidade de aparelhos — e descubra se o gargalo é o provedor ou o roteador.",
        to: "/blog/internet-lenta-provedor-ou-roteador",
        linkLabel: "Provedor ou roteador",
      },
      {
        etapa: "parar",
        desc: "Aparelho desconhecido conectado ou configuração que você não reconhece pede troca de senha e revisão — não convém adiar.",
        to: "/blog/como-saber-quem-esta-usando-meu-wifi",
        linkLabel: "Quem usa o seu Wi-Fi",
      },
      {
        etapa: "resolver",
        desc: "Cobertura, cabeamento e configuração profissional para casa e home office, com o ambiente avaliado no local.",
        to: "/servicos/redes-e-wifi",
        linkLabel: "Redes e Wi-Fi",
      },
    ],
    artigos: [
      "como-melhorar-sinal-wifi-em-casa",
      "como-configurar-roteador-wifi-iniciantes",
      "internet-lenta-provedor-ou-roteador",
      "como-saber-quem-esta-usando-meu-wifi",
      "como-conectar-wifi-tv-nao-conecta",
    ],
    problemas: [
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável" },
      { to: "/problemas/impressora-nao-imprime", label: "Impressora não imprime" },
    ],
    servicos: [
      { to: "/servicos/redes-e-wifi", label: "Redes e Wi-Fi" },
      { to: "/servicos/suporte-home-office", label: "Suporte para home office" },
    ],
  },
  {
    id: "seguranca-privacidade",
    titulo: "Segurança e privacidade",
    resumo:
      "Golpes, vírus, adware e sequestro de navegador: como reconhecer os sinais, o que a proteção já instalada cobre e o que fazer quando a máquina foi comprometida.",
    trilha: [
      {
        etapa: "aprender",
        desc: "A maior parte dos incidentes começa em um clique: aprenda o que checar antes de abrir links, anexos e cobranças.",
        to: "/blog/como-proteger-computador-golpes-internet",
        linkLabel: "Golpes na internet",
      },
      {
        etapa: "identificar",
        desc: "Pop-ups, navegador alterado, lentidão repentina e programas desconhecidos são os sinais típicos de infecção.",
        to: "/blog/como-saber-se-pc-tem-virus-malware",
        linkLabel: "Sinais de vírus e malware",
      },
      {
        etapa: "verificar",
        desc: "Veja o que a remoção séria envolve — e por que \"otimizadores\" baixados por anúncio costumam piorar o quadro.",
        to: "/blog/como-remover-virus-windows-iniciantes",
        linkLabel: "Remover vírus e adware",
      },
      {
        etapa: "parar",
        desc: "Arquivos cifrados ou pedido de resgate mudam tudo: desligue a máquina da rede e não negocie nem reinstale antes de avaliar.",
        to: "/blog/ransomware-como-proteger-empresa",
        linkLabel: "Ransomware",
      },
      {
        etapa: "resolver",
        desc: "Limpeza completa do sistema, remoção de programas indesejados e revisão da proteção ativa.",
        to: "/servicos/remocao-de-virus",
        linkLabel: "Remoção de vírus",
      },
    ],
    artigos: [
      "como-saber-se-pc-tem-virus-malware",
      "como-escolher-um-bom-antivirus",
      "como-proteger-computador-golpes-internet",
      "como-remover-virus-windows-iniciantes",
      "ransomware-como-proteger-empresa",
    ],
    problemas: [],
    servicos: [
      { to: "/servicos/remocao-de-virus", label: "Remoção de vírus" },
      { to: "/seguranca-dos-dados", label: "Segurança dos dados" },
    ],
  },
  {
    id: "dados-backup",
    titulo: "Dados e backup",
    resumo:
      "Os dados valem mais que o equipamento. O tema cobre backup que realmente restaura, sinais de disco em falha e a ordem certa de agir quando um arquivo some.",
    trilha: [
      {
        etapa: "aprender",
        desc: "Pasta sincronizada não é backup: entenda o que separa cópia recuperável de cópia que replica o erro.",
        to: "/blog/backup-como-proteger-seus-arquivos",
        linkLabel: "Guia de backup",
      },
      {
        etapa: "identificar",
        desc: "Ruído metálico, clique repetido e travamento de leitura são o alerta máximo de disco mecânico em falha.",
        to: "/problemas/hd-fazendo-barulho",
        linkLabel: "HD fazendo barulho",
      },
      {
        etapa: "verificar",
        desc: "Alerta SMART e setores defeituosos: o que o diagnóstico prova, o que não prova e por que CHKDSK não é resposta padrão.",
        to: "/blog/disco-com-setores-defeituosos-smart-o-que-fazer",
        linkLabel: "SMART e setores defeituosos",
      },
      {
        etapa: "parar",
        desc: "Arquivo apagado ou partição sumida: cada minuto de uso da unidade sobrescreve o que ainda poderia ser recuperado.",
        to: "/problemas/arquivos-apagados",
        linkLabel: "Arquivos apagados",
      },
      {
        etapa: "resolver",
        desc: "Avaliação de disco em etapas, priorizando a leitura do que ainda é recuperável antes de qualquer reparo.",
        to: "/servicos/recuperacao-de-dados",
        linkLabel: "Recuperação de dados",
      },
    ],
    artigos: [
      "backup-como-proteger-seus-arquivos",
      "como-recuperar-dados-hd-com-defeito",
      "disco-com-setores-defeituosos-smart-o-que-fazer",
      "hd-nao-e-reconhecido-na-bios-o-que-fazer",
      "ssd-nvme-nao-aparece-no-gerenciador-de-discos",
    ],
    problemas: [
      { to: "/problemas/arquivos-apagados", label: "Arquivos apagados" },
      { to: "/problemas/hd-fazendo-barulho", label: "HD fazendo barulho" },
    ],
    servicos: [
      { to: "/servicos/recuperacao-de-dados", label: "Recuperação de dados" },
      { to: "/solucoes/backup", label: "Solução de backup" },
    ],
  },
  {
    id: "manutencao-preventiva",
    titulo: "Manutenção preventiva",
    resumo:
      "Temperatura, poeira, pasta térmica e espaço em disco: o que envelhece um equipamento em silêncio e quais rotinas evitam a falha antes de ela interromper o uso.",
    trilha: [
      {
        etapa: "aprender",
        desc: "Aquecimento normal e comportamento de risco são coisas diferentes: aprenda a ler os sinais do notebook.",
        to: "/blog/notebook-superaquecendo-o-que-fazer",
        linkLabel: "Notebook superaquecendo",
      },
      {
        etapa: "identificar",
        desc: "Equipamento que começa rápido e piora com o tempo de uso aponta para temperatura, não para software.",
        to: "/problemas/computador-esquentando",
        linkLabel: "Computador esquentando",
      },
      {
        etapa: "verificar",
        desc: "Espaço em disco e arquivos temporários são verificações seguras — desde que sem \"otimizadores\" milagrosos.",
        to: "/blog/limpar-arquivos-temporarios-windows",
        linkLabel: "Liberar espaço com segurança",
      },
      {
        etapa: "parar",
        desc: "Cheiro de queimado é parada imediata: desligue da tomada e não religue para \"testar de novo\".",
        to: "/problemas/cheiro-de-queimado",
        linkLabel: "Cheiro de queimado",
      },
      {
        etapa: "resolver",
        desc: "Limpeza interna, troca de pasta térmica e revisão geral, com o estado do equipamento registrado antes e depois.",
        to: "/servicos/manutencao-de-notebook",
        linkLabel: "Manutenção de notebook",
      },
    ],
    artigos: [
      "notebook-superaquecendo-o-que-fazer",
      "como-limpar-notebook-por-dentro",
      "como-trocar-pasta-termica-notebook",
      "limpar-arquivos-temporarios-windows",
      "windows-11-lento-como-resolver",
    ],
    problemas: [
      { to: "/problemas/computador-esquentando", label: "Computador esquentando" },
      { to: "/problemas/computador-desliga-sozinho", label: "Desliga sozinho" },
    ],
    servicos: [
      { to: "/servicos/manutencao-de-computador", label: "Manutenção de computador" },
      { to: "/servicos/manutencao-de-notebook", label: "Manutenção de notebook" },
    ],
  },
  {
    id: "informatica-empresas",
    titulo: "Informática para empresas",
    resumo:
      "Escritórios, consultórios e comércios não têm \"um computador com defeito\": têm operação parada. O tema trata de organização, backup verificado e suporte com prioridade.",
    trilha: [
      {
        etapa: "aprender",
        desc: "Organize equipamentos, acessos e rotina de manutenção sem contratar uma estrutura de TI que não cabe no negócio.",
        to: "/blog/organizacao-de-ti-para-pequenos-escritorios",
        linkLabel: "TI para pequenos escritórios",
      },
      {
        etapa: "identificar",
        desc: "Interrupções recorrentes, máquinas em estágios diferentes de vida útil e rede improvisada: o quadro típico de PME.",
        to: "/empresas",
        linkLabel: "Diagnóstico para empresas",
      },
      {
        etapa: "verificar",
        desc: "Sincronização não é backup corporativo: veja o que diferencia uma cópia que a empresa consegue restaurar.",
        to: "/blog/backup-nuvem-empresas-qual-escolher",
        linkLabel: "Backup em nuvem",
      },
      {
        etapa: "parar",
        desc: "Ransomware entra por e-mail e acesso remoto mal configurado. Se houver suspeita, isole a máquina e não pague nada antes de avaliar.",
        to: "/blog/ransomware-como-proteger-empresa",
        linkLabel: "Ransomware na empresa",
      },
      {
        etapa: "resolver",
        desc: "Atendimento pontual ou recorrente com inventário, prioridade do que trava a operação e plano preventivo.",
        to: "/servicos/suporte-tecnico-empresarial",
        linkLabel: "Suporte empresarial",
      },
    ],
    artigos: [
      "organizacao-de-ti-para-pequenos-escritorios",
      "backup-nuvem-empresas-qual-escolher",
      "ransomware-como-proteger-empresa",
      "como-escolher-uma-workstation",
    ],
    problemas: [],
    servicos: [
      { to: "/empresa-de-ti-curitiba", label: "Empresa de TI em Curitiba" },
      { to: "/servicos/suporte-tecnico-empresarial", label: "Suporte técnico empresarial" },
    ],
  },
  {
    id: "decisoes-compra-reparo",
    titulo: "Decisões de compra e reparo",
    resumo:
      "Consertar, atualizar ou substituir? O tema reúne os critérios usados na bancada para decidir com número na mesa — incluindo quando a conclusão é não contratar serviço nenhum.",
    trilha: [
      {
        etapa: "aprender",
        desc: "Antes de decidir formatar, entenda o que compõe o custo e o que a formatação resolve ou não resolve.",
        to: "/blog/quanto-custa-formatar-um-computador",
        linkLabel: "Quanto custa formatar",
      },
      {
        etapa: "identificar",
        desc: "A decisão muda conforme o sintoma: lentidão progressiva pede diagnóstico de causa, não troca imediata.",
        to: "/problemas/computador-lento",
        linkLabel: "Computador lento",
      },
      {
        etapa: "verificar",
        desc: "Se o caminho for reinstalar, saiba o que precisa ser preservado e em que ordem — antes de apagar qualquer coisa.",
        to: "/blog/como-formatar-pc-sem-perder-arquivos",
        linkLabel: "Formatar sem perder arquivos",
      },
      {
        etapa: "parar",
        desc: "Reparo que se aproxima do valor de um equipamento equivalente é sinal de parada: reavalie antes de aprovar.",
        to: "/quando-nao-compensa",
        linkLabel: "Quando não compensa",
      },
      {
        etapa: "resolver",
        desc: "Quando substituir é o caminho, uma máquina dimensionada para o uso real evita pagar por potência que não será usada.",
        to: "/servicos/montagem-de-pc",
        linkLabel: "Montagem sob medida",
      },
    ],
    artigos: [
      "quanto-custa-formatar-um-computador",
      "como-formatar-pc-sem-perder-arquivos",
      "como-escolher-uma-workstation",
      "quando-trocar-hd-por-ssd",
    ],
    problemas: [],
    servicos: [
      { to: "/quando-nao-compensa", label: "Quando o reparo não compensa" },
      { to: "/precos-e-politicas", label: "Preços e políticas" },
      { to: "/servicos/montagem-de-pc", label: "Montagem de PC sob medida" },
    ],
  },
];

/** Guias de decisão — cada card responde UMA pergunta com critério explícito. */
export interface AtlasGuiaDecisao {
  pergunta: string;
  criterio: string;
  to: string;
  linkLabel: string;
}

export const ATLAS_GUIAS_DECISAO: AtlasGuiaDecisao[] = [
  {
    pergunta: "Formatar ou reparar?",
    criterio:
      "Formatação resolve o que é software. Se o gargalo é disco mecânico, memória ou temperatura, a máquina volta a ficar lenta — o diagnóstico vem antes do procedimento.",
    to: "/solucoes/formatacao",
    linkLabel: "Ver critérios de formatação",
  },
  {
    pergunta: "SSD ou mais memória RAM?",
    criterio:
      "Lentidão geral desde a inicialização aponta para o disco; travamento só com muitos programas abertos aponta para a memória. São gargalos diferentes e upgrades diferentes.",
    to: "/solucoes/ssd",
    linkLabel: "Comparar os dois upgrades",
  },
  {
    pergunta: "Consertar ou substituir?",
    criterio:
      "Quando a soma das peças se aproxima do valor de um equipamento equivalente — ou a placa limita memória e processador — o reparo deixa de compensar e nós dizemos isso.",
    to: "/quando-nao-compensa",
    linkLabel: "Quando não compensa",
  },
  {
    pergunta: "Atendimento remoto ou presencial?",
    criterio:
      "Sistema, configuração e programas resolvem por acesso remoto. Rede e verificação inicial funcionam em domicílio. Falha física e dados pedem bancada.",
    to: "/atendimento-remoto",
    linkLabel: "Como decide a triagem",
  },
  {
    pergunta: "HD fazendo ruído: continuar usando?",
    criterio:
      "Não. Ruído metálico ou clique repetido indica falha mecânica em curso: cada nova inicialização pode sobrescrever a área que ainda seria recuperável.",
    to: "/problemas/hd-fazendo-barulho",
    linkLabel: "O que fazer com o disco",
  },
  {
    pergunta: "Backup antes da manutenção?",
    criterio:
      "Sempre que houver dado que não pode ser perdido. Em formatação o backup é etapa obrigatória do serviço; em suspeita de disco em falha, é a primeira etapa.",
    to: "/blog/backup-como-proteger-seus-arquivos",
    linkLabel: "Como fazer backup de verdade",
  },
  {
    pergunta: "Limpeza interna resolve ou precisa trocar a pasta térmica?",
    criterio:
      "Dissipador entupido responde à limpeza. Quando a temperatura sobe rápido mesmo com o cooler limpo, o problema é a interface térmica ressecada — e limpar sem trocar a pasta melhora por poucos dias.",
    to: "/problemas/computador-esquentando",
    linkLabel: "Como medir antes de decidir",
  },
];

/** Artigos do tema com aprovação editorial válida (fail-closed em dobro). */
export function atlasArtigosAprovados(tema: AtlasTema) {
  return tema.artigos
    .filter((slug) => isEditorialApproved(slug) && EDITORIAL_HUB_SUMMARIES[slug])
    .map((slug) => ({ slug, ...EDITORIAL_HUB_SUMMARIES[slug] }));
}

/** Todos os destinos internos declarados pelo Atlas (para gates e testes). */
export function atlasTodosOsLinks(): string[] {
  const links = new Set<string>();
  for (const tema of ATLAS_TEMAS) {
    for (const e of tema.trilha) links.add(e.to);
    for (const p of tema.problemas) links.add(p.to);
    for (const s of tema.servicos) links.add(s.to);
    for (const slug of tema.artigos) links.add(`/blog/${slug}`);
  }
  for (const g of ATLAS_GUIAS_DECISAO) links.add(g.to);
  return [...links];
}
