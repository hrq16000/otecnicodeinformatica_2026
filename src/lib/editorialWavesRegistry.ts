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

export const EDITORIAL_WAVES: EditorialWaveEntry[] = [
  ...WAVE_10C_BATCH_0,
  ...WAVE_10D_BATCH_1,
  ...WAVE_10C_BATCH_3,
  ...WAVE_10C_BATCH_4,
  ...WAVE_11A_BATCH_4,
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
