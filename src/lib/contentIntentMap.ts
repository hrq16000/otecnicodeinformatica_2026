/**
 * RODADA 8E — MAPA DE INTENÇÃO EDITORIAL (fonte única do cluster piloto)
 * ---------------------------------------------------------------------
 * Volume de busca ≠ intenção comercial. Cada URL do cluster declara aqui:
 *   • a intenção que ela serve (e só ela);
 *   • o pai de serviço, de problema e local quando existirem;
 *   • as URLs com as quais NÃO pode disputar a mesma consulta.
 *
 * Regras:
 *   1. Uma intenção por URL. "como formatar notebook" (informacional),
 *      "quanto custa formatar" (comercial) e "/servicos/formatacao"
 *      (comercial local) nunca compartilham página.
 *   2. Nenhuma rota aqui pode ser gerada de forma combinatória — esta
 *      rodada é editorial, não programática.
 *   3. O gate `check:content-intent` lê este arquivo; ele é a verdade.
 */

export const CONTENT_INTENTS = [
  "informational",
  "diagnostic",
  "commercial",
  "local_commercial",
] as const;
export type ContentIntent = (typeof CONTENT_INTENTS)[number];

export const CONTENT_INTENT_LABEL: Record<ContentIntent, string> = {
  informational: "Informacional (aprender a fazer / entender)",
  diagnostic: "Diagnóstica (descobrir a causa)",
  commercial: "Comercial (avaliar contratação, preço e escopo)",
  local_commercial: "Comercial local (contratar aqui)",
};

export type ContentNode = {
  /** Caminho canônico interno, sem query e sem barra final. */
  url: string;
  intent: ContentIntent;
  /** Tema principal — usado para detectar sobreposição. */
  topic: string;
  /** Consultas-alvo declaradas (referência humana, não usadas em runtime). */
  queries: string[];
  serviceParent?: string;
  problemParent?: string;
  localParent?: string;
  /** URLs que este nó deve linkar (ponte de intenção). */
  bridgesTo: string[];
  /** URLs próximas que NÃO podem virar cópia desta. */
  doNotDuplicate: string[];
  /** true quando a rota é nova nesta rodada; false quando é reaproveitada. */
  novaNestaRodada: boolean;
  justificativa: string;
};

/**
 * CLUSTER PILOTO — FORMATAÇÃO / LENTIDÃO / DIAGNÓSTICO.
 * Quatro URLs: duas editoriais (uma reaproveitada, uma nova) e duas já
 * existentes reaproveitadas como destino comercial e diagnóstico.
 */
export const PILOT_CLUSTER_ID = "formatacao-lentidao-diagnostico";

export const CONTENT_INTENT_MAP: ContentNode[] = [
  // ── Rodada 8E — cluster piloto formatação / lentidão / diagnóstico.
  {
    url: "/blog/como-formatar-pc-sem-perder-arquivos",
    intent: "informational",
    topic: "formatacao-diy",
    queries: ["como formatar notebook", "como formatar o pc", "formatar notebook"],
    serviceParent: "/servicos/formatacao",
    problemParent: "/problemas/computador-lento",
    bridgesTo: [
      "/blog/quanto-custa-formatar-um-computador",
      "/problemas/computador-lento",
      "/diagnostico-tecnico",
      "/servicos/formatacao",
    ],
    doNotDuplicate: ["/servicos/formatacao", "/blog/como-instalar-windows-11-do-zero"],
    novaNestaRodada: false,
    justificativa:
      "Rota já existente, reescrita como guia autoral. Concentra a demanda informacional de maior volume sem prometer contratação e sem repetir cidade.",
  },
  {
    url: "/blog/quanto-custa-formatar-um-computador",
    intent: "commercial",
    topic: "formatacao-custo",
    queries: ["quanto custa formatar um computador", "preço formatação de notebook"],
    serviceParent: "/servicos/formatacao",
    bridgesTo: ["/servicos/formatacao", "/precos-e-politicas", "/diagnostico-tecnico"],
    doNotDuplicate: ["/blog/como-formatar-pc-sem-perder-arquivos", "/precos-e-politicas"],
    novaNestaRodada: true,
    justificativa:
      "Intenção de avaliação de custo, próxima da contratação, sem passo a passo de instalação. Usa exclusivamente a tabela comercial do projeto.",
  },
  {
    url: "/servicos/formatacao",
    intent: "local_commercial",
    topic: "formatacao-servico",
    queries: ["formatação de computador", "serviço de formatação"],
    localParent: "/tecnico-informatica-curitiba",
    bridgesTo: [
      "/blog/como-formatar-pc-sem-perder-arquivos",
      "/blog/quanto-custa-formatar-um-computador",
      "/diagnostico-tecnico",
    ],
    doNotDuplicate: ["/blog/como-formatar-pc-sem-perder-arquivos"],
    novaNestaRodada: false,
    justificativa:
      "Página de serviço já existente e canônica para contratação. Nesta rodada apenas recebe links de saída para os guias.",
  },
  {
    url: "/problemas/computador-lento",
    intent: "diagnostic",
    topic: "lentidao-diagnostico",
    queries: ["computador lento", "formatar resolve lentidão"],
    serviceParent: "/servicos/formatacao",
    bridgesTo: ["/blog/como-formatar-pc-sem-perder-arquivos", "/diagnostico-tecnico"],
    doNotDuplicate: ["/blog/windows-11-lento-como-resolver"],
    novaNestaRodada: false,
    justificativa:
      "Permanece diagnóstica (política de intenção inalterada). Ganha apenas um link explicativo para o guia de formatação.",
  },

  // ── Rodada 9B — pilares nacionais de autoridade editorial em informática.
  {
    url: "/blog/o-que-e-informatica",
    intent: "informational",
    topic: "informatica-definicao",
    queries: [
      "o que é informática",
      "o que significa informática",
      "o que informática faz",
      "informática é ciência",
    ],
    serviceParent: "/servicos",
    bridgesTo: ["/blog/informatica-basica", "/blog/como-aprender-informatica", "/blog"],
    doNotDuplicate: ["/blog/informatica-basica", "/blog/como-aprender-informatica"],
    novaNestaRodada: true,
    justificativa:
      "Pilar nacional DEFINITION. Responde de forma completa o que é informática, sem promessa de atendimento nacional e sem localização forçada.",
  },
  {
    url: "/blog/informatica-basica",
    intent: "informational",
    topic: "informatica-basica",
    queries: [
      "informática básica",
      "informática básica o que é",
      "informática básica curso",
      "informática básica para concurso",
    ],
    serviceParent: "/servicos",
    bridgesTo: ["/blog/o-que-e-informatica", "/blog/como-aprender-informatica", "/blog"],
    doNotDuplicate: ["/blog/o-que-e-informatica", "/blog/como-aprender-informatica"],
    novaNestaRodada: true,
    justificativa:
      "Pilar nacional DEFINITION/LEARNING. Explica o que se aprende em informática básica e para quem serve, sem competir com páginas de serviço local.",
  },
  {
    url: "/blog/como-aprender-informatica",
    intent: "informational",
    topic: "aprender-informatica",
    queries: [
      "como aprender informática",
      "como estudar informática",
      "informática para iniciantes",
      "qual curso de informática fazer",
    ],
    serviceParent: "/servicos",
    bridgesTo: ["/blog/o-que-e-informatica", "/blog/informatica-basica", "/blog"],
    doNotDuplicate: ["/blog/o-que-e-informatica", "/blog/informatica-basica"],
    novaNestaRodada: true,
    justificativa:
      "Pilar nacional LEARNING/COURSE. Oferece roteiro prático para aprender informática do zero, mantendo separação entre conteúdo educacional nacional e comercial local.",
  },
  // ── ONDA 10C — satélites de lentidão extrema e tela azul.
  {
    url: "/blog/limpar-arquivos-temporarios-windows",
    intent: "informational",
    topic: "limpeza de arquivos temporários e espaço livre no disco do sistema",
    queries: [
      "como limpar arquivos temporarios do windows",
      "liberar espaco no disco c",
      "sensor de armazenamento windows 11",
    ],
    serviceParent: "/servicos/manutencao-de-computador",
    problemParent: "/blog/computador-lento-causas-solucoes",
    bridgesTo: [
      "/blog/computador-lento-causas-solucoes",
      "/blog/quando-trocar-hd-por-ssd",
      "/servicos/manutencao-de-computador",
    ],
    doNotDuplicate: ["/blog/computador-lento-causas-solucoes"],
    novaNestaRodada: true,
    justificativa:
      "Satélite de execução: trata apenas espaço livre e limpeza segura. A triagem completa de lentidão permanece no pilar.",
  },
  {
    url: "/blog/memoria-ram-insuficiente-sintomas",
    intent: "diagnostic",
    topic: "identificação de falta de memória RAM e critério de upgrade",
    queries: [
      "sintomas de memoria ram insuficiente",
      "quanto de ram preciso windows 11",
      "como saber se preciso aumentar a memoria",
    ],
    serviceParent: "/servicos/upgrade-ssd-ram",
    problemParent: "/blog/computador-lento-causas-solucoes",
    bridgesTo: [
      "/blog/testar-memoria-ram-memtest86",
      "/blog/quando-trocar-hd-por-ssd",
      "/servicos/upgrade-ssd-ram",
    ],
    doNotDuplicate: ["/blog/testar-memoria-ram-memtest86"],
    novaNestaRodada: true,
    justificativa:
      "Satélite diagnóstico: separa falta de memória de gargalo de disco e define compatibilidade. O teste de defeito fica no satélite do Memtest86+.",
  },
  {
    url: "/blog/codigos-de-erro-tela-azul-windows",
    intent: "diagnostic",
    topic: "leitura e interpretação dos códigos de parada da tela azul",
    queries: [
      "codigos de erro tela azul windows",
      "memory management tela azul",
      "irql not less or equal o que significa",
    ],
    serviceParent: "/diagnostico-tecnico",
    problemParent: "/blog/como-resolver-tela-azul-windows",
    bridgesTo: [
      "/blog/como-resolver-tela-azul-windows",
      "/blog/testar-memoria-ram-memtest86",
      "/diagnostico-tecnico",
    ],
    doNotDuplicate: ["/blog/como-resolver-tela-azul-windows"],
    novaNestaRodada: true,
    justificativa:
      "Satélite de referência: catálogo dos códigos e do que cada um sugere. A sequência de eliminação permanece no pilar da tela azul.",
  },
  {
    url: "/blog/testar-memoria-ram-memtest86",
    intent: "informational",
    topic: "teste de memória RAM fora do sistema operacional",
    queries: [
      "como testar memoria ram",
      "memtest86 passo a passo",
      "quantas passagens memtest",
    ],
    serviceParent: "/diagnostico-tecnico",
    problemParent: "/blog/como-resolver-tela-azul-windows",
    bridgesTo: [
      "/blog/codigos-de-erro-tela-azul-windows",
      "/blog/memoria-ram-insuficiente-sintomas",
      "/servicos/upgrade-ssd-ram",
    ],
    doNotDuplicate: ["/blog/memoria-ram-insuficiente-sintomas"],
    novaNestaRodada: true,
    justificativa:
      "Satélite de procedimento: apenas o teste e a leitura do resultado. O critério de quantidade de memória fica no satélite de sintomas.",
  },
  // ── ONDA 9C — cluster "computador entra direto na BIOS".
  {
    url: "/blog/computador-entra-direto-na-bios",
    intent: "diagnostic",
    topic: "computador para na tela de configuração da BIOS",
    queries: [
      "computador entra direto na bios",
      "pc volta para bios",
      "pc abre a bios e nao inicia windows",
    ],
    serviceParent: "/servicos/manutencao-de-computador",
    problemParent: "/diagnostico-tecnico",
    bridgesTo: [
      "/blog/erro-no-bootable-device-como-resolver",
      "/blog/troquei-o-ssd-e-o-pc-so-abre-a-bios",
      "/diagnostico-tecnico",
      "/servicos/manutencao-de-computador",
    ],
    doNotDuplicate: [
      "/blog/erro-no-bootable-device-como-resolver",
      "/blog/troquei-o-ssd-e-o-pc-so-abre-a-bios",
      "/blog/notebook-nao-liga-o-que-fazer",
    ],
    novaNestaRodada: true,
    justificativa:
      "Pilar diagnóstico do cluster: cobre a triagem entre as quatro causas (detecção, modo de boot, CMOS, Fast Boot) e distribui para os satélites. Não repete o reparo por comando nem o cenário de disco novo.",
  },
  {
    url: "/blog/erro-no-bootable-device-como-resolver",
    intent: "informational",
    topic: "reparo do carregador de inicialização do Windows",
    queries: [
      "no bootable device",
      "boot device not found como resolver",
      "bootrec rebuildbcd",
    ],
    serviceParent: "/diagnostico-tecnico",
    problemParent: "/blog/computador-entra-direto-na-bios",
    bridgesTo: [
      "/blog/computador-entra-direto-na-bios",
      "/blog/como-instalar-windows-11-do-zero",
      "/blog/como-clonar-hd-para-ssd",
      "/diagnostico-tecnico",
    ],
    doNotDuplicate: [
      "/blog/computador-entra-direto-na-bios",
      "/blog/como-instalar-windows-11-do-zero",
    ],
    novaNestaRodada: true,
    justificativa:
      "Satélite de execução: só trata o cenário em que o disco é detectado e o carregador falhou. A triagem de causas fica no pilar; a criação da mídia fica no guia de instalação.",
  },
  {
    url: "/blog/troquei-o-ssd-e-o-pc-so-abre-a-bios",
    intent: "informational",
    topic: "disco novo instalado sem sistema operacional",
    queries: [
      "troquei o ssd e o pc nao liga o windows",
      "ssd novo so abre a bios",
      "configurar m.2 na bios",
    ],
    serviceParent: "/servicos/upgrade-ssd-ram",
    problemParent: "/blog/computador-entra-direto-na-bios",
    bridgesTo: [
      "/blog/computador-entra-direto-na-bios",
      "/blog/como-fazer-upgrade-ssd-nvme",
      "/blog/como-instalar-windows-11-do-zero",
      "/servicos/upgrade-ssd-ram",
    ],
    doNotDuplicate: [
      "/blog/computador-entra-direto-na-bios",
      "/blog/erro-no-bootable-device-como-resolver",
      "/blog/como-fazer-upgrade-ssd-nvme",
    ],
    novaNestaRodada: true,
    justificativa:
      "Satélite de cenário pós-upgrade: explica por que disco novo para no Setup e como configurar o slot M.2. Compatibilidade de compra permanece no guia de NVMe; reparo de carregador permanece no satélite de boot.",
  },
  {
    url: "/blog/botao-power-nao-funciona-jump-start-placa-mae",
    intent: "diagnostic",
    topic: "isolamento do botão de partida frontal pelo conector da placa-mãe",
    queries: [
      "botao power do pc nao funciona",
      "ligar pc pela placa mae sem botao",
      "pino power sw placa mae",
    ],
    serviceParent: "/servicos/manutencao-de-computador",
    problemParent: "/blog/notebook-nao-liga-o-que-fazer",
    bridgesTo: [
      "/blog/como-testar-fonte-de-alimentacao-pc",
      "/blog/como-diagnosticar-placa-mae-defeituosa",
      "/servicos/manutencao-de-computador",
    ],
    doNotDuplicate: ["/blog/como-diagnosticar-placa-mae-defeituosa"],
    novaNestaRodada: true,
    justificativa:
      "Satélite diagnóstico restrito ao acionamento de partida: elimina o botão frontal antes de investigar fonte ou placa, que permanecem nos artigos próprios.",
  },
  {
    url: "/blog/curto-circuito-placa-mae-como-identificar",
    intent: "diagnostic",
    topic: "identificação de curto de alimentação e isolamento por bancada mínima",
    queries: [
      "pc liga e desliga na hora",
      "curto circuito placa mae sintomas",
      "capacitor estufado placa mae",
    ],
    serviceParent: "/diagnostico-tecnico",
    problemParent: "/blog/como-diagnosticar-placa-mae-defeituosa",
    bridgesTo: [
      "/blog/como-testar-fonte-de-alimentacao-pc",
      "/blog/como-diagnosticar-placa-mae-defeituosa",
      "/diagnostico-tecnico",
    ],
    doNotDuplicate: ["/blog/como-diagnosticar-placa-mae-defeituosa"],
    novaNestaRodada: true,
    justificativa:
      "Satélite do padrão liga-e-desliga imediato: método de isolamento por remoção, sem repetir o diagnóstico geral de placa-mãe.",
  },
  {
    url: "/blog/bios-corrompida-reset-cmos-atualizacao",
    intent: "informational",
    topic: "reset de CMOS e recuperação de firmware da placa-mãe",
    queries: [
      "como resetar a bios",
      "bios corrompida o que fazer",
      "tirar bateria da placa mae reset",
    ],
    serviceParent: "/servicos/manutencao-de-computador",
    problemParent: "/blog/computador-entra-direto-na-bios",
    bridgesTo: [
      "/blog/computador-entra-direto-na-bios",
      "/blog/curto-circuito-placa-mae-como-identificar",
      "/diagnostico-tecnico",
    ],
    doNotDuplicate: ["/blog/computador-entra-direto-na-bios"],
    novaNestaRodada: true,
    justificativa:
      "Satélite de procedimento: separa perda de configuração (CMOS) de firmware corrompido. A configuração de boot permanece no pilar da BIOS.",
  },
  // ── Onda 11C — guias técnicos profundos (manutenção, periféricos e backup).
  {
    url: "/blog/manutencao-preventiva-de-computador-guia-completo",
    intent: "informational",
    topic: "rotina de manutenção preventiva por frequência",
    queries: [
      "manutencao preventiva de computador",
      "com que frequencia fazer manutencao no pc",
      "checklist de manutencao de computador",
    ],
    serviceParent: "/servicos/manutencao-de-computador",
    problemParent: "/problemas/computador-lento",
    bridgesTo: [
      "/blog/como-limpar-notebook-por-dentro",
      "/blog/como-testar-restauracao-de-backup",
      "/servicos/manutencao-de-computador",
    ],
    doNotDuplicate: [
      "/blog/como-limpar-notebook-por-dentro",
      "/blog/como-trocar-pasta-termica-notebook",
    ],
    novaNestaRodada: true,
    justificativa:
      "Pilar de cadência: define o que verificar e quando. Os procedimentos manuais (limpeza e pasta térmica) permanecem nos artigos próprios.",
  },
  {
    url: "/blog/dispositivo-usb-nao-reconhecido-o-que-fazer",
    intent: "diagnostic",
    topic: "isolamento de falha em periférico USB",
    queries: [
      "dispositivo usb nao reconhecido",
      "porta usb nao funciona",
      "pendrive nao aparece no computador",
    ],
    serviceParent: "/servicos/manutencao-de-computador",
    bridgesTo: [
      "/blog/webcam-usb-nao-e-detectada",
      "/blog/como-testar-fonte-de-alimentacao-pc",
      "/diagnostico-tecnico",
    ],
    doNotDuplicate: ["/blog/webcam-usb-nao-e-detectada"],
    novaNestaRodada: true,
    justificativa:
      "Diagnóstico genérico de conexão USB (porta, cabo, alimentação). O caso específico de webcam continua com página própria e não é repetido aqui.",
  },
  {
    url: "/blog/como-testar-restauracao-de-backup",
    intent: "informational",
    topic: "verificação e teste de restauração de cópias",
    queries: [
      "como testar backup",
      "teste de restauracao de backup",
      "meu backup funciona mesmo",
    ],
    serviceParent: "/servicos/backup-para-empresas",
    bridgesTo: [
      "/decisoes/nuvem-ou-hd-externo",
      "/decisoes/backup-antes-da-manutencao",
      "/servicos/backup-para-empresas",
    ],
    doNotDuplicate: [
      "/blog/backup-nuvem-empresas-qual-escolher",
      "/decisoes/nuvem-ou-hd-externo",
    ],
    novaNestaRodada: true,
    justificativa:
      "Tema não coberto: a escolha de destino já existe em outra URL; aqui o objeto é a prova de que a cópia restaura.",
  },
  // ── Onda 11D — térmica, mídia removível e versionamento de arquivos.
  {
    url: "/blog/como-monitorar-temperatura-do-computador",
    intent: "diagnostic",
    topic: "medição e interpretação de temperatura por componente",
    queries: [
      "como monitorar temperatura do pc",
      "temperatura normal do processador",
      "pc fica lento quando esquenta",
    ],
    serviceParent: "/servicos/manutencao-de-computador",
    problemParent: "/problemas/computador-lento",
    bridgesTo: [
      "/blog/manutencao-preventiva-de-computador-guia-completo",
      "/blog/notebook-superaquecendo-o-que-fazer",
      "/diagnostico-tecnico",
    ],
    doNotDuplicate: [
      "/blog/notebook-superaquecendo-o-que-fazer",
      "/blog/como-trocar-pasta-termica-notebook",
    ],
    novaNestaRodada: true,
    justificativa:
      "Objeto é o método de medição e a leitura da tendência térmica. O sintoma de superaquecimento e os procedimentos manuais permanecem nas URLs próprias.",
  },
  {
    url: "/blog/pendrive-somente-leitura-protegido-contra-gravacao",
    intent: "diagnostic",
    topic: "mídia removível em estado somente leitura",
    queries: [
      "pendrive protegido contra gravacao",
      "pendrive somente leitura",
      "cartao de memoria nao deixa gravar",
    ],
    serviceParent: "/servicos/recuperacao-de-dados",
    bridgesTo: [
      "/blog/dispositivo-usb-nao-reconhecido-o-que-fazer",
      "/blog/como-testar-restauracao-de-backup",
      "/diagnostico-tecnico",
    ],
    doNotDuplicate: ["/blog/dispositivo-usb-nao-reconhecido-o-que-fazer"],
    novaNestaRodada: true,
    justificativa:
      "Caso específico em que a mídia é reconhecida mas recusa escrita. O guia geral trata do dispositivo que nem aparece e não é repetido aqui.",
  },
  {
    url: "/blog/historico-de-arquivos-windows-como-configurar",
    intent: "informational",
    topic: "configuração de versionamento nativo de arquivos",
    queries: [
      "historico de arquivos windows",
      "versoes anteriores de arquivo windows",
      "como configurar backup no windows",
    ],
    serviceParent: "/servicos/backup-para-empresas",
    bridgesTo: [
      "/blog/como-testar-restauracao-de-backup",
      "/decisoes/backup-antes-da-manutencao",
      "/servicos/backup-para-empresas",
    ],
    doNotDuplicate: [
      "/blog/como-testar-restauracao-de-backup",
      "/blog/backup-como-proteger-seus-arquivos",
    ],
    novaNestaRodada: true,
    justificativa:
      "Objeto é a configuração do recurso nativo de versões. A prova de restauração e a estratégia geral de cópias continuam em URLs próprias.",
  },
  // ── Onda 11E — vídeo, energia de notebook e migração de arquivos.
  {
    url: "/blog/monitor-sem-sinal-o-que-verificar",
    intent: "diagnostic",
    topic: "ausência de sinal de vídeo entre computador e monitor",
    queries: [
      "monitor sem sinal",
      "pc liga mas nao aparece imagem",
      "no signal no monitor",
    ],
    serviceParent: "/servicos/manutencao-de-computador",
    bridgesTo: [
      "/blog/como-diagnosticar-placa-mae-defeituosa",
      "/blog/como-testar-fonte-de-alimentacao-pc",
      "/diagnostico-tecnico",
    ],
    doNotDuplicate: [
      "/blog/notebook-nao-liga-o-que-fazer",
      "/blog/computador-entra-direto-na-bios",
    ],
    novaNestaRodada: true,
    justificativa:
      "Objeto é o caminho do vídeo com o equipamento energizado. Falta total de energia e parada na BIOS continuam nas URLs próprias.",
  },
  {
    url: "/blog/bateria-de-notebook-nao-carrega-o-que-verificar",
    intent: "diagnostic",
    topic: "falha de carga e capacidade real da bateria de notebook",
    queries: [
      "bateria de notebook nao carrega",
      "conectado nao carregando",
      "notebook nao reconhece a bateria",
    ],
    serviceParent: "/servicos/manutencao-de-computador",
    bridgesTo: [
      "/blog/como-monitorar-temperatura-do-computador",
      "/blog/notebook-superaquecendo-o-que-fazer",
      "/decisoes/backup-antes-da-manutencao",
    ],
    doNotDuplicate: [
      "/blog/notebook-nao-liga-o-que-fazer",
      "/blog/notebook-superaquecendo-o-que-fazer",
    ],
    novaNestaRodada: true,
    justificativa:
      "Trata do equipamento que funciona na tomada mas não carrega. O notebook que não dá sinal de vida permanece em URL separada.",
  },
  {
    url: "/blog/como-migrar-arquivos-para-um-computador-novo",
    intent: "informational",
    topic: "transferência única de dados na troca de equipamento",
    queries: [
      "migrar arquivos para computador novo",
      "transferir arquivos entre computadores",
      "trocar de pc sem perder arquivos",
    ],
    serviceParent: "/servicos/backup-para-empresas",
    bridgesTo: [
      "/blog/historico-de-arquivos-windows-como-configurar",
      "/blog/como-testar-restauracao-de-backup",
      "/decisoes/nuvem-ou-hd-externo",
    ],
    doNotDuplicate: [
      "/blog/backup-como-proteger-seus-arquivos",
      "/blog/como-formatar-pc-sem-perder-arquivos",
    ],
    novaNestaRodada: true,
    justificativa:
      "Evento pontual de troca de máquina, com inventário e conferência. Rotina contínua de cópia e reinstalação do sistema seguem em URLs próprias.",
  },
];

/** Nó do mapa por URL canônica (sem barra final). */
export function contentNode(url: string): ContentNode | undefined {
  const p = (url || "").replace(/\/+$/, "") || "/";
  return CONTENT_INTENT_MAP.find((n) => n.url === p);
}

/** URLs editoriais do cluster piloto (as que vivem em /blog). */
export const PILOT_EDITORIAL_URLS = CONTENT_INTENT_MAP.filter((n) => n.url.startsWith("/blog/")).map(
  (n) => n.url,
);

/**
 * Intenção declarada de uma rota editorial. Sem declaração, devolve
 * `undefined` — nunca chuta "commercial" para inflar relatório.
 */
export function declaredIntent(url: string): ContentIntent | undefined {
  return contentNode(url)?.intent;
}
