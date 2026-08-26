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

export type EditorialWaveId = "10C" | "10D";

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

export const EDITORIAL_WAVES: EditorialWaveEntry[] = [
  ...WAVE_10C_BATCH_0,
  ...WAVE_10D_BATCH_1,
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
