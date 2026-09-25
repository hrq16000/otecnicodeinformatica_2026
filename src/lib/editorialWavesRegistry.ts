// ─────────────────────────────────────────────────────────────
// REGISTRY DECLARATIVO DE ONDAS/LOTES EDITORIAIS — Onda 10C · Infra 1.
//
// Fonte ÚNICA de "o que está em observação" por onda e lote. Não decide
// indexabilidade (isso continua sendo APPROVED_EDITORIAL_CONTENT em
// blogEditorialRegistry.ts) e não cria URL: apenas declara, para cada URL
// já publicada, a intenção que ela detém e os metadados de monitoramento.
//
// Consumido por:
//   • scripts/monitor-editorial-waves.ts        (GSC / URL Inspection)
//   • scripts/check-editorial-cannibalization.ts (gate pré-publicação)
//   • /admin/editorial-ondas                     (painel consolidado)
//   • e2e/onda-10c-infra.spec.ts                 (SEO + navegação + CTA)
//
// Fail-closed: campos sem fonte verificável ficam ausentes — nunca são
// preenchidos com estimativa. `contentHash`, `sitemapLastmod` e
// `indexNowSentAt` são resolvidos em build pelo monitor, a partir de
// artefatos reais (código-fonte, sitemap e registro do IndexNow).
// ─────────────────────────────────────────────────────────────

export type EditorialWaveId = "10C" | "10D" | "11A";

export interface EditorialWaveEntry {
  /** Onda editorial (ex.: "10C"). */
  wave: EditorialWaveId;
  /** Lote dentro da onda (ex.: "1"). */
  batch: string;
  /** Caminho canônico interno, sem barra final. */
  url: string;
  /** Slug do artigo em blogPostsContent / blogEditorialRegistry. */
  slug: string;
  /** Dono declarado da intenção (uma intenção = um owner). */
  ownerId: string;
  /** Cluster temático a que o conteúdo pertence. */
  cluster: string;
  /** Papel dentro do cluster. */
  role: "pilar" | "satelite";
  /** Data ISO real de publicação/aprovação. */
  publishedAt: string;
  /** Consultas-alvo declaradas (base do gate anti-canibalização). */
  targetQueries: string[];
  /** URLs próximas que não podem disputar a mesma consulta. */
  doNotDuplicate: string[];
}

/** Onda 10C — satélites de manutenção/diagnóstico (lote 0, já observado). */
const WAVE_10C_BATCH_0: EditorialWaveEntry[] = [
  {
    wave: "10C",
    batch: "0",
    url: "/blog/limpar-arquivos-temporarios-windows",
    slug: "limpar-arquivos-temporarios-windows",
    ownerId: "temporarios-windows",
    cluster: "pc-lento",
    role: "satelite",
    publishedAt: "2026-08-25",
    targetQueries: [
      "limpar arquivos temporarios windows",
      "pasta temp windows pode apagar",
      "liberar espaco em disco windows",
    ],
    doNotDuplicate: ["/blog/windows-11-lento-como-resolver", "/problemas/computador-lento"],
  },
  {
    wave: "10C",
    batch: "0",
    url: "/blog/memoria-ram-insuficiente-sintomas",
    slug: "memoria-ram-insuficiente-sintomas",
    ownerId: "ram-insuficiente-sintomas",
    cluster: "pc-lento",
    role: "satelite",
    publishedAt: "2026-08-25",
    targetQueries: [
      "sintomas de memoria ram insuficiente",
      "quanta memoria ram preciso",
      "pc travando por falta de memoria",
    ],
    doNotDuplicate: ["/blog/testar-memoria-ram-memtest86", "/servicos/upgrade-ssd-ram"],
  },
  {
    wave: "10C",
    batch: "0",
    url: "/blog/codigos-de-erro-tela-azul-windows",
    slug: "codigos-de-erro-tela-azul-windows",
    ownerId: "bsod-codigos-de-erro",
    cluster: "tela-azul",
    role: "satelite",
    publishedAt: "2026-08-25",
    targetQueries: [
      "codigos de erro tela azul windows",
      "significado stop code windows",
      "tabela de erros bsod",
    ],
    doNotDuplicate: ["/blog/testar-memoria-ram-memtest86"],
  },
  {
    wave: "10C",
    batch: "0",
    url: "/blog/testar-memoria-ram-memtest86",
    slug: "testar-memoria-ram-memtest86",
    ownerId: "memtest86-teste-de-ram",
    cluster: "tela-azul",
    role: "satelite",
    publishedAt: "2026-08-25",
    targetQueries: [
      "como testar memoria ram memtest86",
      "memtest86 quantas passagens",
      "teste de memoria ram pendrive",
    ],
    doNotDuplicate: [
      "/blog/memoria-ram-insuficiente-sintomas",
      "/blog/codigos-de-erro-tela-azul-windows",
    ],
  },
];

/** Onda 10D — Lote 1 dos clusters 3 e 4 (PC não liga · liga e desliga). */
const WAVE_10D_BATCH_1: EditorialWaveEntry[] = [
  {
    wave: "10D",
    batch: "1",
    url: "/blog/botao-power-nao-funciona-jump-start-placa-mae",
    slug: "botao-power-nao-funciona-jump-start-placa-mae",
    ownerId: "botao-power-jump-start",
    cluster: "pc-nao-liga",
    role: "satelite",
    publishedAt: "2026-08-26",
    targetQueries: [
      "botao power nao funciona",
      "jump start placa mae pwr_sw",
      "ligar pc sem botao de energia",
    ],
    doNotDuplicate: [
      "/blog/como-testar-fonte-de-alimentacao-pc",
      "/blog/como-diagnosticar-placa-mae-defeituosa",
    ],
  },
  {
    wave: "10D",
    batch: "1",
    url: "/blog/curto-circuito-placa-mae-como-identificar",
    slug: "curto-circuito-placa-mae-como-identificar",
    ownerId: "curto-circuito-placa-mae",
    cluster: "liga-e-desliga",
    role: "satelite",
    publishedAt: "2026-08-26",
    targetQueries: [
      "curto circuito na placa mae como identificar",
      "pc liga e desliga na hora",
      "teste de bancada minima placa mae",
    ],
    doNotDuplicate: [
      "/blog/como-diagnosticar-placa-mae-defeituosa",
      "/blog/botao-power-nao-funciona-jump-start-placa-mae",
    ],
  },
  {
    wave: "10D",
    batch: "1",
    url: "/blog/bios-corrompida-reset-cmos-atualizacao",
    slug: "bios-corrompida-reset-cmos-atualizacao",
    ownerId: "bios-corrompida-reset-cmos",
    cluster: "liga-e-desliga",
    role: "satelite",
    publishedAt: "2026-08-26",
    targetQueries: [
      "bios corrompida o que fazer",
      "reset de cmos jumper bateria",
      "atualizacao de bios deu errado",
    ],
    doNotDuplicate: [
      "/blog/computador-entra-direto-na-bios",
      "/blog/erro-no-bootable-device-como-resolver",
      "/blog/troquei-o-ssd-e-o-pc-so-abre-a-bios",
    ],
  },
  // ── Onda 10C — Lote 2: internet/Wi-Fi (triagem) e impressoras.
  {
    wave: "10C",
    batch: "2",
    url: "/blog/internet-lenta-provedor-ou-roteador",
    slug: "internet-lenta-provedor-ou-roteador",
    ownerId: "internet-lenta-triagem-origem",
    cluster: "internet-wifi",
    role: "satelite",
    publishedAt: "2026-08-26",
    targetQueries: [
      "internet lenta e o provedor ou o roteador",
      "como saber se a internet lenta e do provedor",
      "teste de internet lenta por cabo",
    ],
    doNotDuplicate: [
      "/blog/como-melhorar-sinal-wifi-em-casa",
      "/blog/wifi-lento-como-melhorar",
      "/problemas/wifi-instavel",
    ],
  },
  {
    wave: "10C",
    batch: "2",
    url: "/blog/impressora-offline-como-resolver",
    slug: "impressora-offline-como-resolver",
    ownerId: "impressora-offline",
    cluster: "impressoras",
    role: "satelite",
    publishedAt: "2026-08-26",
    targetQueries: [
      "impressora offline como resolver",
      "impressora aparece offline no windows",
      "impressora nao responde na rede",
    ],
    doNotDuplicate: [
      "/blog/como-instalar-impressora-windows-passo-a-passo",
      "/blog/fila-de-impressao-travada-spooler-windows",
    ],
  },
  {
    wave: "10C",
    batch: "2",
    url: "/blog/fila-de-impressao-travada-spooler-windows",
    slug: "fila-de-impressao-travada-spooler-windows",
    ownerId: "fila-impressao-spooler",
    cluster: "impressoras",
    role: "satelite",
    publishedAt: "2026-08-26",
    targetQueries: [
      "fila de impressao travada",
      "limpar fila de impressao windows",
      "reiniciar spooler de impressao",
    ],
    doNotDuplicate: [
      "/blog/impressora-offline-como-resolver",
      "/blog/como-instalar-impressora-windows-passo-a-passo",
    ],
  },
];

/** Onda 10C — Lote 3: armazenamento não detectado (7) e áudio sem som (8). */
const WAVE_10C_BATCH_3: EditorialWaveEntry[] = [
  {
    wave: "10C",
    batch: "3",
    url: "/blog/hd-nao-e-reconhecido-na-bios-o-que-fazer",
    slug: "hd-nao-e-reconhecido-na-bios-o-que-fazer",
    ownerId: "disco-nao-detectado-bios",
    cluster: "armazenamento-nao-detectado",
    role: "pilar",
    publishedAt: "2026-08-26",
    targetQueries: [
      "hd nao e reconhecido na bios",
      "disco nao aparece no setup",
      "pc nao detecta hd sata",
    ],
    doNotDuplicate: [
      "/blog/ssd-nvme-nao-aparece-no-gerenciador-de-discos",
      "/blog/troquei-o-ssd-e-o-pc-so-abre-a-bios",
      "/blog/erro-no-bootable-device-como-resolver",
    ],
  },
  {
    wave: "10C",
    batch: "3",
    url: "/blog/ssd-nvme-nao-aparece-no-gerenciador-de-discos",
    slug: "ssd-nvme-nao-aparece-no-gerenciador-de-discos",
    ownerId: "disco-sem-inicializacao-windows",
    cluster: "armazenamento-nao-detectado",
    role: "satelite",
    publishedAt: "2026-08-26",
    targetQueries: [
      "ssd nao aparece no windows",
      "disco novo nao aparece no explorador",
      "inicializar disco gerenciamento de disco",
    ],
    doNotDuplicate: [
      "/blog/hd-nao-e-reconhecido-na-bios-o-que-fazer",
      "/blog/como-fazer-upgrade-ssd-nvme",
    ],
  },
  {
    wave: "10C",
    batch: "3",
    url: "/blog/disco-com-setores-defeituosos-smart-o-que-fazer",
    slug: "disco-com-setores-defeituosos-smart-o-que-fazer",
    ownerId: "smart-setores-defeituosos",
    cluster: "armazenamento-nao-detectado",
    role: "satelite",
    publishedAt: "2026-08-26",
    targetQueries: [
      "setores defeituosos no hd",
      "smart com erro o que significa",
      "disco com falha iminente",
    ],
    doNotDuplicate: [
      "/blog/como-recuperar-dados-hd-com-defeito",
      "/problemas/hd-fazendo-barulho",
      "/blog/quando-trocar-hd-por-ssd",
    ],
  },
  {
    wave: "10C",
    batch: "3",
    url: "/blog/computador-sem-som-o-que-verificar",
    slug: "computador-sem-som-o-que-verificar",
    ownerId: "computador-sem-som",
    cluster: "audio",
    role: "pilar",
    publishedAt: "2026-08-26",
    targetQueries: [
      "computador sem som",
      "pc nao emite som",
      "nenhum dispositivo de saida de audio",
    ],
    doNotDuplicate: [
      "/blog/fone-de-ouvido-nao-e-reconhecido-no-pc",
      "/blog/servico-de-audio-do-windows-nao-esta-em-execucao",
    ],
  },
  {
    wave: "10C",
    batch: "3",
    url: "/blog/fone-de-ouvido-nao-e-reconhecido-no-pc",
    slug: "fone-de-ouvido-nao-e-reconhecido-no-pc",
    ownerId: "fone-nao-reconhecido",
    cluster: "audio",
    role: "satelite",
    publishedAt: "2026-08-26",
    targetQueries: [
      "fone de ouvido nao e reconhecido",
      "pc nao detecta fone na entrada frontal",
      "microfone do headset nao funciona",
    ],
    doNotDuplicate: ["/blog/computador-sem-som-o-que-verificar"],
  },
  {
    wave: "10C",
    batch: "3",
    url: "/blog/servico-de-audio-do-windows-nao-esta-em-execucao",
    slug: "servico-de-audio-do-windows-nao-esta-em-execucao",
    ownerId: "servico-de-audio-windows",
    cluster: "audio",
    role: "satelite",
    publishedAt: "2026-08-26",
    targetQueries: [
      "servico de audio do windows nao esta em execucao",
      "reiniciar servico de audio",
      "driver de audio realtek nao instala",
    ],
    doNotDuplicate: ["/blog/computador-sem-som-o-que-verificar"],
  },
];

/** Onda 10C — Lote 4: webcam (9) e Windows Update (10). */
const WAVE_10C_BATCH_4: EditorialWaveEntry[] = [
  {
    wave: "10C",
    batch: "4",
    url: "/blog/webcam-nao-funciona-o-que-verificar",
    slug: "webcam-nao-funciona-o-que-verificar",
    ownerId: "webcam-nao-funciona",
    cluster: "webcam",
    role: "pilar",
    publishedAt: "2026-08-26",
    targetQueries: [
      "webcam nao funciona",
      "camera do notebook nao funciona",
      "windows nao encontra webcam",
    ],
    doNotDuplicate: [
      "/blog/permissoes-de-camera-no-windows",
      "/blog/webcam-usb-nao-e-detectada",
    ],
  },
  {
    wave: "10C",
    batch: "4",
    url: "/blog/permissoes-de-camera-no-windows",
    slug: "permissoes-de-camera-no-windows",
    ownerId: "permissoes-camera-windows",
    cluster: "webcam",
    role: "satelite",
    publishedAt: "2026-08-26",
    targetQueries: [
      "permissoes de camera windows",
      "camera bloqueada pelo sistema",
      "aplicativo nao acessa a camera",
    ],
    doNotDuplicate: ["/blog/webcam-nao-funciona-o-que-verificar"],
  },
  {
    wave: "10C",
    batch: "4",
    url: "/blog/webcam-usb-nao-e-detectada",
    slug: "webcam-usb-nao-e-detectada",
    ownerId: "webcam-usb-nao-detectada",
    cluster: "webcam",
    role: "satelite",
    publishedAt: "2026-08-26",
    targetQueries: [
      "webcam usb nao detectada",
      "dispositivo desconhecido ao conectar camera",
      "driver de webcam usb",
    ],
    doNotDuplicate: ["/blog/webcam-nao-funciona-o-que-verificar"],
  },
  {
    wave: "10C",
    batch: "4",
    url: "/blog/windows-update-nao-funciona-o-que-verificar",
    slug: "windows-update-nao-funciona-o-que-verificar",
    ownerId: "windows-update-nao-funciona",
    cluster: "windows-update",
    role: "pilar",
    publishedAt: "2026-08-26",
    targetQueries: [
      "windows update nao funciona",
      "windows nao atualiza",
      "erro no windows update",
    ],
    doNotDuplicate: [
      "/blog/limpar-cache-do-windows-update-softwaredistribution",
      "/blog/windows-update-travado-desfazendo-alteracoes",
    ],
  },
  {
    wave: "10C",
    batch: "4",
    url: "/blog/limpar-cache-do-windows-update-softwaredistribution",
    slug: "limpar-cache-do-windows-update-softwaredistribution",
    ownerId: "cache-windows-update",
    cluster: "windows-update",
    role: "satelite",
    publishedAt: "2026-08-26",
    targetQueries: [
      "limpar cache do windows update",
      "pasta softwaredistribution",
      "reparar componentes do windows update",
    ],
    doNotDuplicate: ["/blog/windows-update-nao-funciona-o-que-verificar"],
  },
  {
    wave: "10C",
    batch: "4",
    url: "/blog/windows-update-travado-desfazendo-alteracoes",
    slug: "windows-update-travado-desfazendo-alteracoes",
    ownerId: "update-travado-reversao",
    cluster: "windows-update",
    role: "satelite",
    publishedAt: "2026-08-26",
    targetQueries: [
      "atualizacao do windows travada",
      "desfazendo alteracoes windows",
      "download de atualizacao em 0 por cento",
    ],
    doNotDuplicate: ["/blog/windows-update-nao-funciona-o-que-verificar"],
  },
];

/**
 * Onda 11A — Lote 4: BIOS, UEFI e inicialização do Windows.
 *
 * RASCUNHO GOVERNADO: as três URLs abaixo só entram no ar (indexáveis, no
 * sitemap e na listagem) quando `npm run check:onda-11-gate` aprovar — ou
 * seja, quando toda a Onda 10C tiver veredito PUBLISHED no ledger. Sem
 * aprovação em `blogEditorialRegistry.ts` elas permanecem noindex,
 * follow e fora de todos os sitemaps (fail-closed).
 */
const WAVE_11A_BATCH_4: EditorialWaveEntry[] = [
  {
    wave: "11A",
    batch: "4",
    url: "/blog/boot-uefi-ou-legacy-como-identificar",
    slug: "boot-uefi-ou-legacy-como-identificar",
    ownerId: "modo-boot-uefi-legacy",
    cluster: "bios-uefi",
    role: "pilar",
    publishedAt: "2026-08-31",
    targetQueries: [
      "uefi ou legacy como saber",
      "modo de inicializacao do windows",
      "gpt ou mbr qual usar",
    ],
    doNotDuplicate: [
      "/blog/bios-corrompida-reset-cmos-atualizacao",
      "/blog/troquei-o-ssd-e-o-pc-so-abre-a-bios",
      "/blog/ordem-de-boot-na-bios-como-configurar",
    ],
  },
  {
    wave: "11A",
    batch: "4",
    url: "/blog/ordem-de-boot-na-bios-como-configurar",
    slug: "ordem-de-boot-na-bios-como-configurar",
    ownerId: "ordem-de-boot",
    cluster: "bios-uefi",
    role: "satelite",
    publishedAt: "2026-08-31",
    targetQueries: [
      "ordem de boot na bios",
      "pendrive nao aparece no boot",
      "menu de boot tecla",
    ],
    doNotDuplicate: ["/blog/boot-uefi-ou-legacy-como-identificar"],
  },
  {
    wave: "11A",
    batch: "4",
    url: "/blog/windows-reparo-automatico-em-loop",
    slug: "windows-reparo-automatico-em-loop",
    ownerId: "reparo-automatico-loop",
    cluster: "inicializacao-windows",
    role: "satelite",
    publishedAt: "2026-08-31",
    targetQueries: [
      "reparo automatico em loop",
      "preparando reparo automatico nao sai",
      "o pc nao iniciou corretamente",
    ],
    doNotDuplicate: [
      "/problemas/windows-nao-inicia",
      "/blog/windows-update-travado-desfazendo-alteracoes",
    ],
  },
];

export const WAVE_11C_BATCH_1: EditorialWaveEntry[] = [
  {
    wave: "11A",
    batch: "5",
    url: "/blog/manutencao-preventiva-de-computador-guia-completo",
    slug: "manutencao-preventiva-de-computador-guia-completo",
    ownerId: "manutencao-preventiva-de-computador-guia-completo",
    cluster: "manutencao-preventiva",
    role: "pilar",
    publishedAt: "2026-09-03",
    targetQueries: ["manutencao preventiva de computador", "com que frequencia fazer manutencao no pc", "checklist manutencao computador"],
    doNotDuplicate: ["/servicos/manutencao-de-computador", "/blog/como-limpar-notebook-por-dentro"],
  },
  {
    wave: "11A",
    batch: "5",
    url: "/blog/dispositivo-usb-nao-reconhecido-o-que-fazer",
    slug: "dispositivo-usb-nao-reconhecido-o-que-fazer",
    ownerId: "dispositivo-usb-nao-reconhecido-o-que-fazer",
    cluster: "perifericos-usb",
    role: "pilar",
    publishedAt: "2026-09-03",
    targetQueries: ["dispositivo usb nao reconhecido", "pendrive nao aparece no pc", "porta usb nao funciona"],
    doNotDuplicate: ["/blog/webcam-usb-nao-e-detectada"],
  },
  {
    wave: "11A",
    batch: "5",
    url: "/blog/como-testar-restauracao-de-backup",
    slug: "como-testar-restauracao-de-backup",
    ownerId: "como-testar-restauracao-de-backup",
    cluster: "dados-backup",
    role: "pilar",
    publishedAt: "2026-09-03",
    targetQueries: ["como testar backup", "restaurar backup teste", "backup nao funcionou"],
    doNotDuplicate: ["/blog/backup-nuvem-empresas-qual-escolher", "/decisoes/nuvem-ou-hd-externo"],
  },
];

export const WAVE_11D_BATCH_1: EditorialWaveEntry[] = [
  {
    wave: "11A",
    batch: "6",
    url: "/blog/como-monitorar-temperatura-do-computador",
    slug: "como-monitorar-temperatura-do-computador",
    ownerId: "como-monitorar-temperatura-do-computador",
    cluster: "manutencao-preventiva",
    role: "satelite",
    publishedAt: "2026-09-03",
    targetQueries: ["como monitorar temperatura do pc", "temperatura normal do processador", "pc perde desempenho quando esquenta"],
    doNotDuplicate: ["/blog/notebook-superaquecendo-o-que-fazer", "/blog/como-trocar-pasta-termica-notebook"],
  },
  {
    wave: "11A",
    batch: "6",
    url: "/blog/pendrive-somente-leitura-protegido-contra-gravacao",
    slug: "pendrive-somente-leitura-protegido-contra-gravacao",
    ownerId: "pendrive-somente-leitura-protegido-contra-gravacao",
    cluster: "perifericos-usb",
    role: "satelite",
    publishedAt: "2026-09-03",
    targetQueries: ["pendrive protegido contra gravacao", "pendrive somente leitura", "cartao de memoria nao grava"],
    doNotDuplicate: ["/blog/dispositivo-usb-nao-reconhecido-o-que-fazer"],
  },
  {
    wave: "11A",
    batch: "6",
    url: "/blog/historico-de-arquivos-windows-como-configurar",
    slug: "historico-de-arquivos-windows-como-configurar",
    ownerId: "historico-de-arquivos-windows-como-configurar",
    cluster: "dados-backup",
    role: "satelite",
    publishedAt: "2026-09-03",
    targetQueries: ["historico de arquivos windows", "versoes anteriores de arquivo windows", "como configurar backup do windows"],
    doNotDuplicate: ["/blog/como-testar-restauracao-de-backup", "/blog/backup-como-proteger-seus-arquivos"],
  },
];

export const WAVE_11E_BATCH_1: EditorialWaveEntry[] = [
  {
    wave: "11A",
    batch: "7",
    url: "/blog/monitor-sem-sinal-o-que-verificar",
    slug: "monitor-sem-sinal-o-que-verificar",
    ownerId: "monitor-sem-sinal-o-que-verificar",
    cluster: "video-e-exibicao",
    role: "satelite",
    publishedAt: "2026-09-03",
    targetQueries: ["monitor sem sinal", "pc liga mas nao aparece imagem", "no signal monitor o que fazer"],
    doNotDuplicate: ["/blog/notebook-nao-liga-o-que-fazer", "/blog/como-diagnosticar-placa-mae-defeituosa"],
  },
  {
    wave: "11A",
    batch: "7",
    url: "/blog/bateria-de-notebook-nao-carrega-o-que-verificar",
    slug: "bateria-de-notebook-nao-carrega-o-que-verificar",
    ownerId: "bateria-de-notebook-nao-carrega-o-que-verificar",
    cluster: "manutencao-preventiva",
    role: "satelite",
    publishedAt: "2026-09-03",
    targetQueries: ["bateria de notebook nao carrega", "conectado nao carregando", "notebook nao reconhece bateria"],
    doNotDuplicate: ["/blog/notebook-nao-liga-o-que-fazer", "/blog/notebook-superaquecendo-o-que-fazer"],
  },
  {
    wave: "11A",
    batch: "7",
    url: "/blog/como-migrar-arquivos-para-um-computador-novo",
    slug: "como-migrar-arquivos-para-um-computador-novo",
    ownerId: "como-migrar-arquivos-para-um-computador-novo",
    cluster: "dados-backup",
    role: "satelite",
    publishedAt: "2026-09-03",
    targetQueries: ["migrar arquivos para pc novo", "transferir arquivos entre computadores", "trocar de computador sem perder arquivos"],
    doNotDuplicate: ["/blog/como-testar-restauracao-de-backup", "/blog/historico-de-arquivos-windows-como-configurar"],
  },
];

export const WAVE_11F_BATCH_1: EditorialWaveEntry[] = [
  {
    wave: "11A",
    batch: "8",
    url: "/blog/teclado-de-notebook-nao-funciona-o-que-verificar",
    slug: "teclado-de-notebook-nao-funciona-o-que-verificar",
    ownerId: "teclado-de-notebook-nao-funciona-o-que-verificar",
    cluster: "perifericos-usb",
    role: "satelite",
    publishedAt: "2026-09-03",
    targetQueries: ["teclado do notebook nao funciona", "teclas do notebook nao respondem", "teclado digitando letra errada"],
    doNotDuplicate: ["/blog/dispositivo-usb-nao-reconhecido-o-que-fazer", "/blog/notebook-nao-liga-o-que-fazer"],
  },
  {
    wave: "11A",
    batch: "8",
    url: "/blog/computador-desliga-sozinho-o-que-verificar",
    slug: "computador-desliga-sozinho-o-que-verificar",
    ownerId: "computador-desliga-sozinho-o-que-verificar",
    cluster: "liga-e-desliga",
    role: "satelite",
    publishedAt: "2026-09-03",
    targetQueries: ["computador desliga sozinho", "pc desliga do nada", "notebook desliga sozinho jogando"],
    doNotDuplicate: ["/blog/notebook-superaquecendo-o-que-fazer", "/blog/codigos-de-erro-tela-azul-windows"],
  },
  {
    wave: "11A",
    batch: "8",
    url: "/blog/computador-nao-conecta-na-internet-por-cabo",
    slug: "computador-nao-conecta-na-internet-por-cabo",
    ownerId: "computador-nao-conecta-na-internet-por-cabo",
    cluster: "internet-wifi",
    role: "satelite",
    publishedAt: "2026-09-03",
    targetQueries: ["cabo de rede conectado sem internet", "pc nao conecta na internet por cabo", "cabo de rede desconectado windows"],
    doNotDuplicate: ["/blog/internet-lenta-provedor-ou-roteador", "/blog/como-melhorar-sinal-wifi-em-casa"],
  },
];

export const WAVE_11G_BATCH_1: EditorialWaveEntry[] = [
  {
    wave: "11A",
    batch: "8",
    url: "/blog/ventoinha-do-computador-fazendo-barulho-o-que-verificar",
    slug: "ventoinha-do-computador-fazendo-barulho-o-que-verificar",
    ownerId: "ventoinha-do-computador-fazendo-barulho-o-que-verificar",
    cluster: "liga-e-desliga",
    role: "satelite",
    publishedAt: "2026-09-03",
    targetQueries: ["ventoinha do pc fazendo barulho", "cooler do notebook barulhento", "ventoinha acelerando sozinha"],
    doNotDuplicate: ["/blog/notebook-superaquecendo-o-que-fazer", "/blog/como-limpar-notebook-por-dentro"],
  },
  {
    wave: "11A",
    batch: "8",
    url: "/blog/rede-wifi-nao-aparece-na-lista-o-que-verificar",
    slug: "rede-wifi-nao-aparece-na-lista-o-que-verificar",
    ownerId: "rede-wifi-nao-aparece-na-lista-o-que-verificar",
    cluster: "internet-wifi",
    role: "satelite",
    publishedAt: "2026-09-03",
    targetQueries: ["rede wifi nao aparece", "notebook nao encontra rede wifi", "wifi 5ghz nao aparece"],
    doNotDuplicate: ["/blog/wifi-lento-como-melhorar", "/blog/como-configurar-repetidor-wifi"],
  },
  {
    wave: "11A",
    batch: "8",
    url: "/blog/arquivo-corrompido-nao-abre-o-que-fazer",
    slug: "arquivo-corrompido-nao-abre-o-que-fazer",
    ownerId: "arquivo-corrompido-nao-abre-o-que-fazer",
    cluster: "dados-backup",
    role: "satelite",
    publishedAt: "2026-09-03",
    targetQueries: ["arquivo corrompido nao abre", "documento word corrompido", "recuperar arquivo danificado"],
    doNotDuplicate: ["/blog/como-recuperar-dados-hd-com-defeito", "/blog/como-testar-restauracao-de-backup"],
  },
];


/** Onda 11H — promoção de acervo herdado após reescrita e fact-check. */
export const WAVE_11H_BATCH_1: EditorialWaveEntry[] = [
  {
    wave: "11A",
    batch: "9",
    url: "/blog/como-configurar-2fa-em-tudo",
    slug: "como-configurar-2fa-em-tudo",
    ownerId: "mfa-2fa-contas-criticas",
    cluster: "seguranca-identidade",
    role: "pilar",
    publishedAt: "2026-09-25",
    targetQueries: ["como configurar 2fa", "autenticacao de dois fatores", "mfa como ativar"],
    doNotDuplicate: ["/blog/como-proteger-computador-golpes-internet"],
  },
  {
    wave: "11A",
    batch: "9",
    url: "/blog/como-proteger-rede-wifi-empresa",
    slug: "como-proteger-rede-wifi-empresa",
    ownerId: "wifi-empresa-seguranca",
    cluster: "internet-wifi",
    role: "pilar",
    publishedAt: "2026-09-25",
    targetQueries: ["como proteger wifi da empresa", "seguranca wifi empresarial", "wpa3 empresa"],
    doNotDuplicate: ["/blog/como-configurar-roteador-wifi-iniciantes", "/blog/como-melhorar-sinal-wifi-em-casa"],
  },
  {
    wave: "11A",
    batch: "9",
    url: "/blog/como-configurar-firewall-pfsense",
    slug: "como-configurar-firewall-pfsense",
    ownerId: "pfsense-firewall-configuracao",
    cluster: "internet-wifi",
    role: "satelite",
    publishedAt: "2026-09-25",
    targetQueries: ["como configurar pfsense", "regras firewall pfsense", "pfsense backup configuracao"],
    doNotDuplicate: ["/blog/como-proteger-rede-wifi-empresa"],
  },
  {
    wave: "11A",
    batch: "9",
    url: "/blog/como-configurar-active-directory",
    slug: "como-configurar-active-directory",
    ownerId: "active-directory-planejamento",
    cluster: "informatica-empresas",
    role: "pilar",
    publishedAt: "2026-09-25",
    targetQueries: ["como configurar active directory", "active directory dns", "planejar ad ds"],
    doNotDuplicate: ["/blog/organizacao-de-ti-para-pequenos-escritorios"],
  },
  {
    wave: "11A",
    batch: "9",
    url: "/blog/como-deixar-celular-android-mais-rapido",
    slug: "como-deixar-celular-android-mais-rapido",
    ownerId: "android-lento-diagnostico",
    cluster: "fundamentos",
    role: "satelite",
    publishedAt: "2026-09-25",
    targetQueries: ["celular android lento", "como deixar android mais rapido", "celular lento o que fazer"],
    doNotDuplicate: ["/diagnostico-tecnico"],
  },
];

/** Onda 11I — segunda promoção de acervo herdado qualificado. */
export const WAVE_11I_BATCH_1: EditorialWaveEntry[] = [
  {
    wave: "11A", batch: "10", url: "/blog/como-configurar-repetidor-wifi", slug: "como-configurar-repetidor-wifi",
    ownerId: "repetidor-wifi-configuracao", cluster: "internet-wifi", role: "satelite", publishedAt: "2026-09-25",
    targetQueries: ["como configurar repetidor wifi", "onde colocar repetidor wifi", "repetidor wifi vale a pena"],
    doNotDuplicate: ["/blog/como-melhorar-sinal-wifi-em-casa", "/blog/rede-wifi-nao-aparece-na-lista-o-que-verificar"],
  },
  {
    wave: "11A", batch: "10", url: "/blog/trocar-windows-por-linux-vale-a-pena", slug: "trocar-windows-por-linux-vale-a-pena",
    ownerId: "windows-linux-migracao", cluster: "fundamentos", role: "pilar", publishedAt: "2026-09-25",
    targetQueries: ["trocar windows por linux vale a pena", "migrar windows para linux", "linux em pc antigo"],
    doNotDuplicate: ["/decisoes/atualizar-para-windows-11", "/blog/como-instalar-windows-11-do-zero"],
  },
  {
    wave: "11A", batch: "10", url: "/blog/erros-comuns-upgrade-computador", slug: "erros-comuns-upgrade-computador",
    ownerId: "upgrade-compatibilidade-hardware", cluster: "hardware-upgrade", role: "satelite", publishedAt: "2026-09-25",
    targetQueries: ["erros upgrade pc", "como saber se memoria ram e compativel", "ssd m2 sata nvme compatibilidade"],
    doNotDuplicate: ["/servicos/upgrade-ssd-ram", "/decisoes/ssd-ou-memoria-ram"],
  },
  {
    wave: "11A", batch: "10", url: "/blog/como-configurar-vpn-empresarial", slug: "como-configurar-vpn-empresarial",
    ownerId: "vpn-empresarial-acesso-remoto", cluster: "informatica-empresas", role: "pilar", publishedAt: "2026-09-25",
    targetQueries: ["como configurar vpn empresarial", "vpn acesso remoto empresa", "wireguard empresa"],
    doNotDuplicate: ["/blog/como-configurar-firewall-pfsense", "/blog/como-proteger-rede-wifi-empresa"],
  },
  {
    wave: "11A", batch: "10", url: "/blog/como-recuperar-conta-hackeada", slug: "como-recuperar-conta-hackeada",
    ownerId: "conta-comprometida-recuperacao", cluster: "seguranca-identidade", role: "pilar", publishedAt: "2026-09-25",
    targetQueries: ["como recuperar conta hackeada", "conta invadida o que fazer", "recuperar conta comprometida"],
    doNotDuplicate: ["/blog/como-configurar-2fa-em-tudo", "/blog/como-proteger-computador-golpes-internet"],
  },
];

/** Onda 11J — Windows, backup e conectividade qualificados. */
export const WAVE_11J_BATCH_1: EditorialWaveEntry[] = [
  {
    wave: "11A", batch: "11", url: "/blog/como-deixar-windows-11-mais-rapido-iniciantes", slug: "como-deixar-windows-11-mais-rapido-iniciantes",
    ownerId: "windows-11-desempenho-diagnostico", cluster: "lentidao", role: "satelite", publishedAt: "2026-09-25",
    targetQueries: ["como deixar windows 11 mais rapido", "windows 11 lento", "pc windows 11 travando"],
    doNotDuplicate: ["/blog/windows-11-lento-como-resolver", "/problemas/computador-lento"],
  },
  {
    wave: "11A", batch: "11", url: "/blog/como-fazer-backup-fotos-windows-iniciantes", slug: "como-fazer-backup-fotos-windows-iniciantes",
    ownerId: "backup-fotos-windows", cluster: "dados-backup", role: "satelite", publishedAt: "2026-09-25",
    targetQueries: ["como fazer backup de fotos no windows", "backup fotos hd externo", "proteger fotos no pc"],
    doNotDuplicate: ["/blog/backup-como-proteger-seus-arquivos", "/blog/historico-de-arquivos-windows-como-configurar"],
  },
  {
    wave: "11A", batch: "11", url: "/blog/como-atualizar-windows-corretamente", slug: "como-atualizar-windows-corretamente",
    ownerId: "windows-update-manutencao-segura", cluster: "windows-update", role: "satelite", publishedAt: "2026-09-25",
    targetQueries: ["como atualizar windows 11", "atualizar windows corretamente", "windows update guia"],
    doNotDuplicate: ["/blog/windows-update-nao-funciona-o-que-verificar", "/blog/windows-update-travado-desfazendo-alteracoes"],
  },
  {
    wave: "11A", batch: "11", url: "/blog/como-recuperar-arquivos-apagados-windows", slug: "como-recuperar-arquivos-apagados-windows",
    ownerId: "arquivos-apagados-windows-recuperacao", cluster: "dados-backup", role: "satelite", publishedAt: "2026-09-25",
    targetQueries: ["recuperar arquivos apagados windows", "windows file recovery", "arquivo apagado lixeira vazia"],
    doNotDuplicate: ["/servicos/recuperacao-de-dados", "/blog/como-recuperar-dados-hd-com-defeito"],
  },
  {
    wave: "11A", batch: "11", url: "/blog/como-fazer-teste-velocidade-internet", slug: "como-fazer-teste-velocidade-internet",
    ownerId: "teste-velocidade-internet-diagnostico", cluster: "internet-wifi", role: "satelite", publishedAt: "2026-09-25",
    targetQueries: ["como testar velocidade da internet", "teste internet por cabo e wifi", "latencia jitter perda pacotes"],
    doNotDuplicate: ["/blog/internet-lenta-provedor-ou-roteador", "/blog/como-melhorar-sinal-wifi-em-casa"],
  },
];


/** Onda 11K — credenciais, organização e segurança Wi-Fi. */
export const WAVE_11K_BATCH_1: EditorialWaveEntry[] = [
  {
    wave: "11A", batch: "12", url: "/blog/como-resetar-senha-windows", slug: "como-resetar-senha-windows",
    ownerId: "windows-recuperacao-credencial-oficial", cluster: "sistemas-operacionais", role: "satelite", publishedAt: "2026-09-25",
    targetQueries: ["esqueci senha windows", "resetar senha windows conta microsoft", "redefinir senha conta local windows"],
    doNotDuplicate: ["/blog/como-recuperar-conta-hackeada", "/seguranca-dos-dados"],
  },
  {
    wave: "11A", batch: "12", url: "/blog/como-organizar-arquivos-windows-iniciantes", slug: "como-organizar-arquivos-windows-iniciantes",
    ownerId: "windows-organizacao-arquivos", cluster: "dados-backup", role: "satelite", publishedAt: "2026-09-25",
    targetQueries: ["como organizar arquivos windows 11", "organizar pastas no windows", "como achar arquivos windows"],
    doNotDuplicate: ["/blog/como-fazer-backup-fotos-windows-iniciantes", "/blog/como-migrar-arquivos-para-um-computador-novo"],
  },
  {
    wave: "11A", batch: "12", url: "/blog/como-trocar-senha-wifi", slug: "como-trocar-senha-wifi",
    ownerId: "wifi-alterar-credencial-seguranca", cluster: "internet-wifi", role: "satelite", publishedAt: "2026-09-25",
    targetQueries: ["como trocar senha wifi", "mudar senha do roteador wifi", "alterar senha rede wifi"],
    doNotDuplicate: ["/blog/como-proteger-rede-wifi-empresa", "/blog/como-configurar-roteador-wifi-iniciantes"],
  },
];


/** Onda 11L — firmware, servidor de arquivos e firewall Linux. */
export const WAVE_11L_BATCH_1: EditorialWaveEntry[] = [
  {
    wave: "11A", batch: "13", url: "/blog/como-configurar-bios-uefi-corretamente", slug: "como-configurar-bios-uefi-corretamente",
    ownerId: "bios-uefi-configuracao-segura", cluster: "sistemas-operacionais", role: "satelite", publishedAt: "2026-09-25",
    targetQueries: ["como configurar bios uefi", "secure boot tpm bios", "configurar uefi sem perder boot"],
    doNotDuplicate: ["/blog/boot-uefi-ou-legacy-como-identificar", "/blog/ordem-de-boot-na-bios-como-configurar", "/blog/bios-corrompida-reset-cmos-atualizacao"],
  },
  {
    wave: "11A", batch: "13", url: "/blog/como-configurar-servidor-de-arquivos", slug: "como-configurar-servidor-de-arquivos",
    ownerId: "servidor-arquivos-smb-samba", cluster: "informatica-empresas", role: "pilar", publishedAt: "2026-09-25",
    targetQueries: ["como configurar servidor de arquivos", "servidor smb windows", "samba servidor de arquivos"],
    doNotDuplicate: ["/blog/como-configurar-active-directory", "/blog/organizacao-de-ti-para-pequenos-escritorios", "/servicos/backup-para-empresas"],
  },
  {
    wave: "11A", batch: "13", url: "/blog/como-configurar-firewall-ufw-linux", slug: "como-configurar-firewall-ufw-linux",
    ownerId: "ufw-firewall-host-ubuntu", cluster: "internet-wifi", role: "satelite", publishedAt: "2026-09-25",
    targetQueries: ["como configurar ufw", "ufw ubuntu firewall", "permitir ssh ufw"],
    doNotDuplicate: ["/blog/como-configurar-firewall-pfsense", "/blog/como-configurar-vpn-empresarial"],
  },
];

export const EDITORIAL_WAVES: EditorialWaveEntry[] = [
  ...WAVE_10C_BATCH_0,
  ...WAVE_10D_BATCH_1,
  ...WAVE_10C_BATCH_3,
  ...WAVE_10C_BATCH_4,
  ...WAVE_11A_BATCH_4,
  ...WAVE_11C_BATCH_1,
  ...WAVE_11D_BATCH_1,
  ...WAVE_11E_BATCH_1,
  ...WAVE_11F_BATCH_1,
  ...WAVE_11G_BATCH_1,
  ...WAVE_11H_BATCH_1,
  ...WAVE_11I_BATCH_1,
  ...WAVE_11J_BATCH_1,
  ...WAVE_11K_BATCH_1,
  ...WAVE_11L_BATCH_1,
];

/** URLs monitoradas (ordem estável, sem duplicatas). */
export const MONITORED_EDITORIAL_URLS: string[] = [
  ...new Set(EDITORIAL_WAVES.map((e) => e.url)),
];

export const entriesByWave = (wave: EditorialWaveId): EditorialWaveEntry[] =>
  EDITORIAL_WAVES.filter((e) => e.wave === wave);

export const entriesByBatch = (wave: EditorialWaveId, batch: string): EditorialWaveEntry[] =>
  EDITORIAL_WAVES.filter((e) => e.wave === wave && e.batch === batch);

export const findEditorialEntry = (url: string): EditorialWaveEntry | undefined =>
  EDITORIAL_WAVES.find((e) => e.url === url.replace(/\/$/, ""));

/** Chave "onda/lote" usada em relatórios e no painel. */
export const batchKey = (e: Pick<EditorialWaveEntry, "wave" | "batch">) => `${e.wave}/${e.batch}`;

/** Lotes distintos, em ordem de aparição. */
export const editorialBatches = (): string[] => [...new Set(EDITORIAL_WAVES.map(batchKey))];
