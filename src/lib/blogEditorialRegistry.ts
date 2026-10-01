// ─────────────────────────────────────────────────────────────
// REGISTRO EDITORIAL FAIL-CLOSED — fonte única de aprovação de conteúdo.
//
// Regra inegociável: um artigo só é indexável / publicável se possuir
// um registro EXPLÍCITO e TIPADO de aprovação. Sem registro válido, o
// artigo é tratado como rascunho (draft): noindex, fora do sitemap,
// fora da listagem pública e sem schema de autoria pessoal.
//
// A aprovação NÃO pode depender de: categoria, data, presença de
// conteúdo, presença de imagem, slug, origem (manual/programática)
// ou tema. Depende exclusivamente deste registro.
//
// Estado inicial: ZERO artigos aprovados.
// ─────────────────────────────────────────────────────────────

import { siteConfig } from "@/lib/siteConfig";

export type EditorialStatus = "draft" | "in_review" | "approved" | "archived";

export type EditorialAuthorType = "organization" | "person";

export type EditorialImageOrigin = "owned" | "licensed" | "generated" | "unknown";

export interface EditorialApproval {
  slug: string;
  status: EditorialStatus;
  authorType: EditorialAuthorType;
  /** Identificador do autor aprovado (ex.: "org:tecnico-em-curitiba"). */
  authorId: string;
  /** Data ISO da revisão editorial (opcional até revisão material). */
  reviewedAt?: string;
  /** Data ISO real da aprovação — obrigatória para status approved. */
  approvedAt?: string;
  imageOrigin: EditorialImageOrigin;
  imageLicense?: string;
  imageAttribution?: string;
  notes?: string;
}

// Autoria institucional temporária. Enquanto não houver autor pessoal
// real e verificado, a autoria é a própria entidade oficial.
// Todos os dados vêm de siteConfig — nunca duplicar manualmente.
// Usamos getters para não ler siteConfig durante a avaliação do módulo
// (evita dependência circular no SSR).
export const INSTITUTIONAL_AUTHOR = {
  id: "org:tecnico-em-curitiba",
  type: "organization" as EditorialAuthorType,
  get name() {
    return siteConfig.brandName;
  },
  get url() {
    return siteConfig.baseUrl;
  },
} as const;

// Publisher institucional oficial (alinhado à entidade da marca).
export const EDITORIAL_PUBLISHER = {
  get name() {
    return siteConfig.brandName;
  },
  get url() {
    return siteConfig.baseUrl;
  },
  get logo() {
    return `${siteConfig.baseUrl}/logo.png`;
  },
} as const;

// ─────────────────────────────────────────────────────────────
// PRIMEIRA ONDA EDITORIAL INDEXÁVEL (Rodada 4H).
//
// Cada item abaixo só entrou após: revisão técnica concluída e
// fact-check registrado (src/lib/blogEditorialSources.ts), capa
// própria com origem declarada (src/lib/blogEditorialCovers.ts) e
// aprovação editorial datada. Artigos fora deste Map permanecem
// noindex, follow, fora do sitemap e fora da listagem pública.
//
// Espelho de build/gates: scripts/lib/editorial-wave.mjs.
// ─────────────────────────────────────────────────────────────
const FIRST_WAVE_APPROVED_AT = "2026-08-06";

// Rodada 3F — liberação controlada: os dois guias que disputavam a mesma
// intenção das novas páginas de sintoma (/problemas/notebook-nao-liga e
// /problemas/computador-lento) voltaram para revisão (noindex, follow) e
// o guia de superaquecimento entrou no lugar, apoiando manutenção de
// notebook. Limite da onda: 6 artigos.
// Rodada 3O — onda educacional empresarial: dois conteúdos já existentes no
// acervo (nenhuma rota nova) promovidos após revisão técnica, capa própria e
// interlinking de entrada. Limite total de artigos indexáveis: 7.
const FIRST_WAVE_SLUGS = [
  "quando-trocar-hd-por-ssd",
  "como-saber-se-pc-tem-virus-malware",
  "backup-como-proteger-seus-arquivos",
  "como-melhorar-sinal-wifi-em-casa",
  "notebook-superaquecendo-o-que-fazer",
  "organizacao-de-ti-para-pequenos-escritorios",
  "como-escolher-uma-workstation",
] as const;


// Rodada 4X — promoção do guia de instalação limpa do Windows 11, o último
// piloto sem sobreposição de intenção com as páginas de sintoma. Capa é
// FOTOGRAFIA REAL licenciada (Creative Commons), nunca imagem de IA.
// Limite total de artigos indexáveis: 8.
const WAVE_4X: EditorialApproval[] = [
  {
    slug: "como-instalar-windows-11-do-zero",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-07-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY 2.0",
    imageAttribution:
      "Foto: Shixart1985 (Wikimedia Commons), CC BY 2.0 — https://commons.wikimedia.org/w/index.php?curid=194512723",
    notes:
      "Revisão técnica concluída e fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada (Openverse/Wikimedia Commons), sem IA.",
  },
];

// Rodada 4Y — reforma de dois guias herdados de alta intenção técnica, sem
// sobreposição com /problemas/*: tela azul (BSOD) e troca de tela de notebook.
// Ambas as capas são FOTOGRAFIAS REAIS licenciadas (Creative Commons).
// Limite total de artigos indexáveis: 10.
const WAVE_4Y: EditorialApproval[] = [
  {
    slug: "como-resolver-tela-azul-windows",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY 4.0",
    imageAttribution:
      "Foto: QueenBarenziah (Wikimedia Commons), CC BY 4.0 — https://commons.wikimedia.org/w/index.php?curid=130534314",
    notes:
      "Revisão técnica concluída e fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "como-trocar-tela-notebook-passo-a-passo",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-29",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC0 1.0",
    imageAttribution:
      "Foto: Gregory Karastergios (Wikimedia Commons), CC0 1.0 — https://commons.wikimedia.org/w/index.php?curid=113932150",
    notes:
      "Revisão técnica concluída e fact-check registrado em blogEditorialSources.ts; capa é fotografia real de domínio público (CC0), sem IA.",
  },
];

// Rodada 4Z — os dois guias herdados de maior intenção comercial do acervo.
// Capas trocadas por FOTOGRAFIAS REAIS licenciadas (Wikimedia Commons).
// Limite total de artigos indexáveis: 12.
const WAVE_4Z: EditorialApproval[] = [
  {
    slug: "notebook-nao-liga-o-que-fazer",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY 3.0",
    imageAttribution:
      "Foto: Rider Adil (Wikimedia Commons), CC BY 3.0 — https://commons.wikimedia.org/wiki/File:Laptop_hardware.jpg",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 11 impressões, 0 cliques e posição média ~10,91 entre 2026-04-01 e 2026-09-27. A versão suplementar passa a sobrepor editorialmente o texto monolítico antigo, preservando a mesma URL. Triagem separada em sem energia, sem POST, sem vídeo e sem boot, com carregador/bateria/placa tratados como hipóteses, procedimentos de reset condicionados ao fabricante, batteryreport apenas quando o Windows inicia e critérios de parada explícitos. Queries individuais não foram expostas pelo GSC e nenhuma foi inventada.",
  },
  {
    slug: "computador-lento-causas-solucoes",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY 4.0",
    imageAttribution:
      "Foto: Mk2010 (Wikimedia Commons), CC BY 4.0 — https://commons.wikimedia.org/wiki/File:Actuator_arm_assembly_of_a_hard_disk_drive.jpg",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 1 impressão, 0 cliques e posição média 9 entre 2026-04-01 e 2026-09-27. URL Inspection: PASS, Submitted and indexed, ALLOWED, INDEXING_ALLOWED, SUCCESSFUL e rastreada como MOBILE. A nova owner suplementar organiza a lentidão por contexto e evidência, evita formatar ou trocar hardware por palpite e registra fontes oficiais Microsoft. Queries individuais não foram expostas pelo GSC e nenhuma foi inventada.",
  },
];

// Rodada 5A — dois procedimentos técnicos herdados REESCRITOS do zero:
// o texto-modelo programático e a marca de origem foram removidos.
// Capas são FOTOGRAFIAS REAIS licenciadas (Wikimedia Commons), sem IA.
// Limite total de artigos indexáveis: 14.
const WAVE_5A: EditorialApproval[] = [
  {
    slug: "como-recuperar-dados-hd-com-defeito",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 2.0",
    imageAttribution:
      "Foto: Brian Wong (Wikimedia Commons), CC BY-SA 2.0 — https://commons.wikimedia.org/wiki/File:Toshiba_Laptop_Hard_Drive.jpg",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 6 impressões, 0 cliques e posição média 17 entre 2026-04-01 e 2026-09-27. A query real “conserto de hd” foi tratada separando recuperação de dados de reutilização do hardware. A versão suplementar passa a sobrepor editorialmente o texto monolítico antigo, remove diagnóstico mecânico só por ruído, separa exclusão lógica/erros de I/O/falha física e prioriza imagem/cópia antes de reparo quando a unidade está instável.",
  },
  {
    slug: "como-fazer-upgrade-ssd-nvme",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-29",
    approvedAt: "2026-09-07",
    imageOrigin: "licensed",
    imageLicense: "CC0 1.0",
    imageAttribution:
      "Foto: User5515 (Wikimedia Commons), CC0 1.0 — https://commons.wikimedia.org/wiki/File:256GB_2230_NVME_SSD_%2B_256GB_NGFF_SSD.jpg",
    notes:
      "Revisão material em 2026-09-07; fact-check e fontes primárias registrados em blogEditorialSources.ts; capa é fotografia real de domínio público (CC0), sem IA.",
  },
];

// Rodada 5B — cluster de redes Wi-Fi doméstica: dois guias herdados
// reescritos do zero, com intenções distintas entre si e do guia de
// cobertura já indexado. Capas são FOTOGRAFIAS REAIS licenciadas.
// Limite total de artigos indexáveis: 16.
const WAVE_5B: EditorialApproval[] = [
  {
    slug: "como-configurar-roteador-wifi-iniciantes",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY 4.0",
    imageAttribution:
      "Foto: Hayden Schiff (Wikimedia Commons), CC BY 4.0 — https://commons.wikimedia.org/wiki/File:TP-Link_TL-WR740N_router_HS5.jpg",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 14 impressões, 0 cliques e posição média ~34,43 entre 2026-04-01 e 2026-09-27. O conteúdo suplementar preserva a URL e responde às queries reais de configurar/usar roteador e Wi‑Fi, organizando WAN, LAN/DHCP, SSID/segurança, administração e validação sem depender de painel ou IP universal.",
  },
  {
    slug: "como-saber-quem-esta-usando-meu-wifi",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-28",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: Mrbeastmodeallday (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:Home_wifi.jpg",
    notes:
      "Reescrita integral na Onda 5B; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
];

// ── ONDA 5C — cluster de segurança: escolha de antivírus e golpes on-line,
// reescritos do zero com intenções distintas entre si. Capas são
// FOTOGRAFIAS REAIS licenciadas (Wikimedia Commons), sem IA.
// Limite total de artigos indexáveis: 18.
const WAVE_5C: EditorialApproval[] = [
  {
    slug: "como-escolher-um-bom-antivirus",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-06",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: BrayLockBoy (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:MEMZ_Trojan_running_on_Samsung_N130,_13_December_2019.jpg",
    notes:
      "Reescrita integral na Onda 5C; revisão material com fontes oficiais e FAQ técnico concluída em 2026-09-06; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "como-proteger-computador-golpes-internet",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-12",
    approvedAt: "2026-09-12",
    imageOrigin: "licensed",
    imageLicense: "CC0 1.0",
    imageAttribution:
      "Foto: Packer1028 (Wikimedia Commons), CC0 1.0 — https://commons.wikimedia.org/wiki/File:Computer_virus_scam.jpg",
    notes:
      "Reescrita integral na Onda 5C e aprofundada em 2026-09-12; matriz de exposição, resposta proporcional, fontes oficiais visíveis e FAQ técnico; capa é fotografia real de domínio público (CC0), sem IA.",
  },
];

/**
 * ── Onda 5D — manutenção física de notebook (limpeza interna e pasta térmica).
 */
const WAVE_5D: EditorialApproval[] = [
  {
    slug: "como-limpar-notebook-por-dentro",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 3.0",
    imageAttribution:
      "Foto: DMahalko / Dale Mahalko (Wikimedia Commons), CC BY-SA 3.0 — https://commons.wikimedia.org/wiki/File:Laptop_overheating_due_to_dust-clogged_internal_heatsinks_in_2.5_year_old_laptop.jpg",
    notes:
      "Reescrita integral na Onda 5D; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "como-trocar-pasta-termica-notebook",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 3.0",
    imageAttribution:
      "Foto: Jyothis (Wikimedia Commons), CC BY-SA 3.0 — https://commons.wikimedia.org/wiki/File:Thermal_compound_Applied.JPG",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 24 impressões, 0 cliques e posição média ~17,33 entre 2026-04-01 e 2026-09-27. Queries reais de troca de pasta térmica foram incorporadas. A versão suplementar passa a sobrepor editorialmente o texto monolítico antigo, com diagnóstico antes da desmontagem, manual/OEM, isolamento da bateria, preservação de pads, reaplicação após remoção do dissipador, sem quantidade universal para notebook, validação antes/depois e critérios de parada.",
  },
];

/**
 * ── Onda 5E — armazenamento (clonagem de disco e segundo SSD).
 */
const WAVE_5E: EditorialApproval[] = [
  {
    slug: "como-clonar-hd-para-ssd",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-29",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 3.0",
    imageAttribution:
      "Foto: Wikimedia Commons, licença livre — https://commons.wikimedia.org/wiki/File:Maxtor_HDD_and_Intel_SSD_20100117.jpg",
    notes:
      "Revisão material em 2026-09-29 guiada pelo GSC; aprofunda decisão entre clonar/reinstalar/preservar dados, SSD menor, partições de boot, BitLocker, validação pós-clone e critérios de parada. Fact-check registrado em blogEditorialSources.ts; capa real licenciada, sem IA.",
  },
  {
    slug: "como-instalar-segundo-ssd-notebook",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-29",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 2.0",
    imageAttribution:
      "Foto: Deviantart (Wikimedia Commons), CC BY-SA 2.0 — https://commons.wikimedia.org/wiki/File:WesterDigital-Black-NVMe-SSD.jpg",
    notes:
      "Revisão material em 2026-09-29 guiada pelo GSC: 7 impressões, 0 cliques e posição média ~8,43 entre 2026-04-01 e 2026-09-27. A versão suplementar passa a sobrepor editorialmente a versão monolítica antiga, preservando a mesma URL. Conteúdo novo cobre compatibilidade real de segundo slot, M.2 SATA × NVMe, montagem segura, inicialização no Windows, uso como dados versus migração, falhas de detecção, BitLocker, validação e critérios de parada. Queries individuais não foram expostas pelo GSC e nenhuma foi inventada.",
  },
];

/**
 * ── Onda 5F — continuidade empresarial (ransomware e backup em nuvem).
 */
const WAVE_5F: EditorialApproval[] = [
  {
    slug: "ransomware-como-proteger-empresa",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "Public domain",
    imageAttribution:
      "Foto: Wikimedia Commons, domínio público — https://commons.wikimedia.org/wiki/File:2017_Petya_cyberattack_screenshot.jpg",
    notes:
      "Reescrita integral na Onda 5F; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "backup-nuvem-empresas-qual-escolher",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 3.0",
    imageAttribution:
      "Foto: BalticServers.com (Wikimedia Commons), CC BY-SA 3.0 — https://commons.wikimedia.org/wiki/File:BalticServers_data_center.jpg",
    notes:
      "Reescrita integral na Onda 5F; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
];

const WAVE_5G: EditorialApproval[] = [
  {
    slug: "como-instalar-impressora-windows-passo-a-passo",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 3.0",
    imageAttribution: "Foto: Somebody in the WWW (Wikimedia Commons), CC BY-SA 3.0 — https://commons.wikimedia.org/wiki/File:Epson-inkjet-printer.jpg",
    notes:
      "Reescrita integral na Onda 5G; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "como-conectar-wifi-tv-nao-conecta",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-29",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution: "Foto: Suyash Dwivedi (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:LG_Smart_TV_WIFI_%2B_IR_Remote_04.jpg",
    notes:
      "Revisão material em 2026-09-29 guiada pelo GSC; diagnóstico reorganizado por sintoma, comparações controladas, compatibilidade do modelo, cabo como teste não conclusivo, reset por último e FAQ de decisão. Fact-check registrado em blogEditorialSources.ts; capa real licenciada, sem IA.",
  },
];

const WAVE_5H: EditorialApproval[] = [
  {
    slug: "como-testar-fonte-de-alimentacao-pc",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-29",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "Public domain",
    imageAttribution: "Foto: Alan Liefting (Wikimedia Commons), domínio público — https://commons.wikimedia.org/wiki/File:ATX_power_supply_interior.jpg",
    notes:
      "Reescrita integral na Onda 5H; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "como-diagnosticar-placa-mae-defeituosa",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-29",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 2.5",
    imageAttribution: "Foto: Darkone (Wikimedia Commons), CC BY-SA 2.5 — https://commons.wikimedia.org/wiki/File:ASRock_K7VT4A_Pro_Mainboard.jpg",
    notes:
      "Revisão material em 2026-09-29 guiada pelo GSC: 58 impressões, 0 cliques e posição média ~9,88 entre 2026-04-01 e 2026-09-27. Conteúdo expandido para separar alimentação, POST, memória, vídeo, firmware e falhas parciais; inclui matriz de sintomas, configuração mínima com limites, validação pós-reparo, critérios de parada e fontes técnicas visíveis. Queries individuais não foram expostas pelo GSC e nenhuma foi inventada.",
  },
];

const WAVE_5I: EditorialApproval[] = [
  {
    slug: "windows-11-lento-como-resolver",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-29",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: Laurabatanero (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:Working_on_my_laptop.jpg",
    notes:
      "Reescrita integral na Onda 5I; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "como-remover-virus-windows-iniciantes",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: BrayLockBoy (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:MEMZ_Trojan_running_on_Samsung_N130,_13_December_2019.jpg",
    notes:
      "Reescrita integral na Onda 5I; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
];


// Rodada 8E — cluster piloto de aquisição orgânica (formatação/lentidão).
// Uma URL informacional reaproveitada e reescrita + uma URL comercial nova.
// As duas capas são FOTOGRAFIAS REAIS licenciadas (Wikimedia Commons).
// Limite total de artigos indexáveis: 32.
const WAVE_8E: EditorialApproval[] = [
  {
    slug: "como-formatar-pc-sem-perder-arquivos",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: "2026-08-14",
    imageOrigin: "licensed",
    imageLicense: "CC BY 2.0",
    imageAttribution:
      "Foto: Hamed Saber (Wikimedia Commons), CC BY 2.0 — https://commons.wikimedia.org/wiki/File:VAIO_TZ_laptop_hard_disk.jpg",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 109 impressões, 1 clique e posição média ~9,53 entre 2026-04-01 e 2026-09-27. A versão suplementar passa a sobrepor editorialmente o texto monolítico antigo, preservando a mesma URL. Esclarece formatação versus preservação, separa backup, Redefinir este PC, reparo/reinstalação e instalação limpa, e reforça BitLocker, ativação, mídia oficial, identificação do disco e critérios de parada. Queries individuais não foram expostas pelo GSC e nenhuma foi inventada.",
  },
  {
    slug: "quanto-custa-formatar-um-computador",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: "2026-08-14",
    imageOrigin: "licensed",
    imageLicense: "Domínio público (obra do governo federal dos EUA)",
    imageAttribution:
      "Foto: Airman 1st Class Jordyn Fetter, U.S. Air Force (Wikimedia Commons), domínio público — https://commons.wikimedia.org/wiki/File:Replacing_hardware_160210-F-KR223-021.jpg",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 1 impressão, 0 cliques e posição média 11 entre 2026-04-01 e 2026-09-27. URL Inspection: PASS, Submitted and indexed, ALLOWED, INDEXING_ALLOWED, SUCCESSFUL e rastreada como MOBILE. A owner suplementar usa diretamente MODALIDADES de src/lib/precosConfig.ts para manter os valores sincronizados, amplia escopo/backup/licença/BitLocker e registra fontes oficiais Microsoft. Queries individuais não foram expostas pelo GSC e nenhuma foi inventada.",
  },
];


// Rodada 9B — três pilares nacionais de autoridade editorial em informática.
// Conteúdos novos, escritos do zero, sem sobreposição com páginas de sintoma
// ou serviços locais. Escopo nacional, educacional, autoria institucional.
// Limite total de artigos indexáveis: 35.
const WAVE_9B: EditorialApproval[] = [
  {
    slug: "o-que-e-informatica",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: "2026-08-15",
    imageOrigin: "licensed",
    imageLicense: "CC BY 2.0",
    imageAttribution:
      "Foto: 褒忠國中 雲端網 (Wikimedia Commons), CC BY 2.0 — https://commons.wikimedia.org/wiki/File:Acer_desktop_computers_in_computer_classroom_of_Baozhong_Junior_High_School_20121009.jpg",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 78 impressões, 0 cliques e posição média ~64,68 entre 2026-04-01 e 2026-09-27. Queries reais incluem 'informatica', 'informática', 'o que e informatica', 'o que significa informatica', 'o que estuda a informática' e 'area de informatica'. A versão suplementar preserva a URL e transforma o pilar em definição ampla e estruturada, separando informática, TI e as principais disciplinas de computing conforme ACM/IEEE.",
  },
  {
    slug: "informatica-basica",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: "2026-08-15",
    imageOrigin: "licensed",
    imageLicense: "CC BY 2.0",
    imageAttribution:
      "Foto: woodleywonderworks (Wikimedia Commons), CC BY 2.0 — https://commons.wikimedia.org/wiki/File:Student_on_computer.jpg",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 55 impressões, 0 cliques e posição média ~49,36 entre 2026-04-01 e 2026-09-27. Queries reais como “conhecimento basico informatica”, “informatica basica”, “informatica basica conteúdo”, “informatica basica resumo” e “noções básicas de informática” foram incorporadas. A versão suplementar passa a sobrepor editorialmente o texto monolítico antigo, com mapa de competências, checklist prático, arquivos/pastas, produtividade, nuvem/backup, segurança e separação explícita entre básico e avançado.",
  },
  {
    slug: "como-aprender-informatica",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: "2026-08-15",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 2.0",
    imageAttribution:
      "Foto: Michael Surran (Wikimedia Commons), CC BY-SA 2.0 — https://commons.wikimedia.org/wiki/File:Students_working_on_class_assignment_in_computer_lab.jpg",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 21 impressões, 0 cliques e posição média ~49,10 entre 2026-04-01 e 2026-09-27. Queries reais incluem aprender informática passo a passo/do zero/sozinho e informática para iniciantes. A versão suplementar preserva a URL e transforma o pilar em roteiro por competências e projetos, com arquivos, Windows, internet, produtividade, nuvem/backup, segurança, hardware, redes e diagnóstico.",
  },
];

/**
 * ── Onda 9C — cluster "computador entra direto na BIOS" (pilar + 2 satélites).
 * Conteúdo diagnóstico nacional, sem cidade no slug. Capas são FOTOGRAFIAS
 * REAIS licenciadas (Wikimedia Commons), sem IA.
 * Limite total de artigos indexáveis: 38.
 */
const WAVE_9C: EditorialApproval[] = [
  {
    slug: "computador-entra-direto-na-bios",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-29",
    approvedAt: "2026-08-25",
    imageOrigin: "licensed",
    imageLicense: "CC BY 2.0",
    imageAttribution:
      "Foto: Paul Schultz (Wikimedia Commons), CC BY 2.0 — https://commons.wikimedia.org/wiki/File:BIOS_Setup_First_Time.jpg",
    notes:
      "Revisão material em 2026-09-29 guiada pelo GSC: 12 impressões, 0 cliques e posição média ~13,08 entre 2026-04-01 e 2026-09-27. A versão suplementar passa a sobrepor editorialmente o texto monolítico antigo, preservando a mesma URL. Diagnóstico reorganizado em detecção do disco, entrada Windows Boot Manager, UEFI/Legacy, estrutura de boot, retenção de configurações, BitLocker e critérios de parada; a única query individual exposta pelo GSC foi tratada sem desviar a intenção principal.",
  },
  {
    slug: "erro-no-bootable-device-como-resolver",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-10-01",
    approvedAt: "2026-08-25",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 2.5",
    imageAttribution:
      "Foto: Thomas Rosenau (Wikimedia Commons), CC BY-SA 2.5 — https://commons.wikimedia.org/wiki/File:Serial_ATA_hard_disk_connected.jpg",
    notes:
      "Revisão material em 2026-10-01 guiada pelo GSC: 5 impressões, 0 cliques e posição média ~38,8 entre 2026-04-01 e 2026-09-28. Queries reais cobrem 'no boot device found', 'no bootable device como resolver' e 'no bootable device please restart'. A versão suplementar preserva a URL e reorganiza o diagnóstico em detecção do disco, entrada de boot, UEFI/Legacy, WinRE, BCDBoot e proteção BitLocker, sem formatação destrutiva por tentativa.",
  },
  {
    slug: "troquei-o-ssd-e-o-pc-so-abre-a-bios",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: "2026-08-25",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: Ilya Plekhanov (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:Samsung_960_EVO_in_M.2_slot_02.jpg",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 89 impressões, 1 clique e posição média ~9,20 entre 2026-04-01 e 2026-09-27. A versão suplementar passa a sobrepor editorialmente o texto monolítico antigo, preservando a mesma URL. Diagnóstico reorganizado em detecção física, cenário do SSD, Windows Boot Manager, UEFI/Legacy, controlador e estrutura de boot, com BitLocker, preservação do disco antigo e fontes oficiais visíveis. Queries individuais não foram expostas pelo GSC e nenhuma foi inventada.",
  },
];

const WAVE_10C: EditorialApproval[] = [
  {
    slug: "limpar-arquivos-temporarios-windows",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-25",
    approvedAt: "2026-08-25",
    imageOrigin: "licensed",
    imageLicense: "CC0",
    imageAttribution:
      "Foto: Bdortiz1076 (Wikimedia Commons), CC0 — https://commons.wikimedia.org/wiki/File:Hitachi_2.5%22_HDD_and_ADATA_XM13_20120402.jpg",
    notes:
      "Satélite escrito do zero na Onda 10C; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "memoria-ram-insuficiente-sintomas",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: "2026-08-25",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: D-Kuru (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:DDR_4_SO-DIMM_RAM_slot_PNr%C2%B00837.jpg",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 4 impressões, 0 cliques e posição média ~24 entre 2026-04-01 e 2026-09-27. A única query individual exposta foi 'memoria insuficiente' (2 impressões, posição média 40,5). A versão suplementar passa a sobrepor editorialmente o texto anterior, preservando a URL; diferencia uso alto/cache de pressão real, commit/pagefile, vazamento, paginação, gargalo de disco e defeito físico, sem impor quantidade universal de RAM.",
  },
  {
    slug: "codigos-de-erro-tela-azul-windows",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-29",
    approvedAt: "2026-08-25",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: JIP (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:Blue_Screen_Of_Death_at_Urheilupuisto_metro_station.jpg",
    notes:
      "Revisão material em 2026-09-29 guiada pelo GSC: 6 impressões, 0 cliques e posição média ~7,17 entre 2026-04-01 e 2026-09-27. A versão suplementar passa a sobrepor editorialmente o texto monolítico antigo, preservando a mesma URL. Stop codes deixam de ser tratados como diagnóstico determinístico; entram parâmetros, dump, contexto, recorrência, WHEA, critérios de parada e fontes Microsoft visíveis. Queries individuais não foram expostas pelo GSC e nenhuma foi inventada.",
  },
  {
    slug: "testar-memoria-ram-memtest86",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-10-01",
    approvedAt: "2026-09-13",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: Fastily (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:Memtest86%2B_2019-08-09.jpg",
    notes:
      "Revisão material em 2026-10-01 guiada pelo GSC: 3 impressões, 0 cliques e posição média ~23,67 entre 2026-04-01 e 2026-09-28. A única query individual exposta foi 'teste de memoria ram'. A versão suplementar preserva a URL e aprofunda execução, interpretação, linha de base sem XMP/EXPO, isolamento módulo/slot, limites de teste sem erros e distinção entre capacidade insuficiente e defeito de memória.",
  },
];

const WAVE_10D: EditorialApproval[] = [
  {
    slug: "botao-power-nao-funciona-jump-start-placa-mae",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-29",
    approvedAt: "2026-08-26",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: Hans Haase (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:JPANEL_MB_IMG_1121.JPG",
    notes:
      "Revisão material em 2026-09-29 guiada pelo GSC: 8 impressões, 0 cliques e posição média ~10,88 entre 2026-04-01 e 2026-09-27. A versão suplementar passa a sobrepor editorialmente o texto monolítico antigo, preservando a mesma URL. O teste PWR_SW foi reenquadrado como isolamento do circuito do botão, com pinout pelo manual, interpretação não determinística, separação entre sem energia e sem POST, exclusão de notebooks/all-in-one e critérios de parada. Queries individuais não foram expostas pelo GSC e nenhuma foi inventada.",
  },
  {
    slug: "curto-circuito-placa-mae-como-identificar",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-29",
    approvedAt: "2026-08-26",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 3.0",
    imageAttribution:
      "Foto: Gms (Wikimedia Commons), CC BY-SA 3.0 — https://commons.wikimedia.org/wiki/File:Motherboard_defective_capacitors.jpg",
    notes:
      "Satélite escrito do zero na Onda 10D; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "bios-corrompida-reset-cmos-atualizacao",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: "2026-08-26",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 2.0",
    imageAttribution:
      "Foto: Kent Madsen (Wikimedia Commons), CC BY-SA 2.0 — https://commons.wikimedia.org/wiki/File:CMOS_Battery,_Motherboard.jpg",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 11 impressões, 0 cliques e posição média 27 entre 2026-04-01 e 2026-09-27. As únicas queries individuais expostas foram 'bios corrompida' e 'reparar bios'. A versão suplementar preserva a mesma URL e separa reset de CMOS/configuração, atualização e recuperação real de firmware; exige procedimento específico do fabricante/modelo, alimentação estável e preparação da chave BitLocker.",
  },
];

const WAVE_10E: EditorialApproval[] = [
  {
    slug: "internet-lenta-provedor-ou-roteador",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-08",
    approvedAt: "2026-09-08",
    imageOrigin: "licensed",
    imageLicense: "CC BY 4.0",
    imageAttribution:
      "Foto: VulcanSphere (Wikimedia Commons), CC BY 4.0 — https://commons.wikimedia.org/wiki/File:ARRIS_CM820B_DOCSIS_Cable_Modem.jpg",
    notes:
      "Revisão material em 2026-09-08; protocolo de medição e fontes oficiais registrados em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "impressora-offline-como-resolver",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-10-01",
    approvedAt: "2026-08-26",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 2.0",
    imageAttribution:
      "Foto: Cheon Fong Liew (Wikimedia Commons), CC BY-SA 2.0 — https://commons.wikimedia.org/wiki/File:Dell_Color_Laser_Network_Printer_1320cn_ports.jpg",
    notes:
      "Revisão material em 2026-10-01 guiada pelo GSC: 5 impressões, 0 cliques e posição média ~47,8 entre 2026-04-01 e 2026-09-28. Queries reais: 'como tirar impressora do offline' e 'porque a impressora fica offline'. A versão suplementar preserva a URL e aprofunda energia, USB/rede, IP/porta, fila, driver e seleção da impressora correta sem duplicar o guia de spooler.",
  },
  {
    slug: "fila-de-impressao-travada-spooler-windows",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: "2026-08-26",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: Solomon203 (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:Sharp_MX-M465_of_Aurora_Office_Equipment_20161029.jpg",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 9 impressões, 0 cliques e posição média ~45,56 entre 2026-04-01 e 2026-09-27. Queries reais incluem reinício por CMD, spooler que não inicia/parando sozinho e trabalhos presos. A versão suplementar preserva a mesma URL e separa fila, serviço, driver, offline e conectividade, com limpeza manual limitada à pasta de trabalhos e fontes Microsoft visíveis.",
  },
];

const WAVE_10F: EditorialApproval[] = [
  {
    slug: "hd-nao-e-reconhecido-na-bios-o-que-fazer",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: "2026-08-26",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 3.0",
    imageAttribution:
      "Foto: Dsimic (Wikimedia Commons), CC BY-SA 3.0 — https://commons.wikimedia.org/wiki/File:2.5-inch_SATA_drive_on_top_of_a_3.5-inch_SATA_drive,_close-up_of_data_and_power_connectors.jpg",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 68 impressões, 0 cliques e posição média ~25,94 entre 2026-04-01 e 2026-09-27. Queries reais como “computador nao reconhece hd”, “pc não reconhece hd”, “ssd nao reconhecido” e “bios não reconhece ssd” foram incorporadas. A versão suplementar passa a sobrepor editorialmente o texto monolítico antigo, separando BIOS/UEFI de Windows, SATA de M.2/NVMe, boot de estado do volume e preservação de dados antes de operações destrutivas.",
  },
  {
    slug: "ssd-nvme-nao-aparece-no-gerenciador-de-discos",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-26",
    approvedAt: "2026-08-26",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: Ilya Plekhanov (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:Samsung_960_EVO_in_M.2_slot_01.jpg",
    notes:
      "Satélite escrito do zero na Onda 10C (Lote 3); fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "disco-com-setores-defeituosos-smart-o-que-fazer",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-26",
    approvedAt: "2026-08-26",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 3.0",
    imageAttribution:
      "Foto: Matthew Field (Wikimedia Commons), CC BY-SA 3.0 — https://commons.wikimedia.org/wiki/File:Hard_disk_head_on_platter.jpg",
    notes:
      "Satélite escrito do zero na Onda 10C (Lote 3); regra de segurança explícita contra CHKDSK em mídia suspeita de falha física; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "computador-sem-som-o-que-verificar",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: "2026-08-26",
    imageOrigin: "licensed",
    imageLicense: "Public Domain",
    imageAttribution:
      "Foto: Shaddack (Wikimedia Commons), domínio público — https://commons.wikimedia.org/wiki/File:Photo-audiojacks.jpg",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 4 impressões, 0 cliques e posição média 49 entre 2026-04-01 e 2026-09-28. Queries reais 'sem som' e 'testar som pc' orientam a versão suplementar, que preserva a URL e separa saída, mixer, detecção, conexão física, driver e serviço de áudio, com interlinks para fone e Windows Audio.",
  },
  {
    slug: "fone-de-ouvido-nao-e-reconhecido-no-pc",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: "2026-08-26",
    imageOrigin: "licensed",
    imageLicense: "CC0",
    imageAttribution:
      "Foto: Em3rgent0rdr (Wikimedia Commons), CC0 — https://commons.wikimedia.org/wiki/File:Phone-connectors-labeled.jpg",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 40 impressões, 0 cliques e posição média ~25,08 entre 2026-04-01 e 2026-09-27. Queries reais de P2, entrada frontal, notebook e PC não reconhecendo fone foram incorporadas. A versão suplementar passa a sobrepor editorialmente o texto monolítico antigo, separando P2/USB/Bluetooth, detecção/reprodução, painel frontal/driver e áudio/microfone-permissões.",
  },
  {
    slug: "servico-de-audio-do-windows-nao-esta-em-execucao",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: "2026-08-26",
    imageOrigin: "licensed",
    imageLicense: "CC BY 2.0",
    imageAttribution:
      "Foto: bengt-re (Wikimedia Commons), CC BY 2.0 — https://commons.wikimedia.org/wiki/File:GIGABYTE_GS-GC330UD_(8357750354).jpg",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 5 impressões, 0 cliques e posição média ~22,4 entre 2026-04-01 e 2026-09-27. As únicas queries expostas foram 'audio.exe', 'o windows não pode encontrar audio.exe' e 'windows não pode encontrar audio.exe'. A versão suplementar passa a sobrepor editorialmente o texto anterior, preservando a mesma URL; separa Windows Audio, detecção/driver, reprodução e referência quebrada a executável, com fontes Microsoft e sem recomendar EXE/DLL avulso.",
  },
];

const WAVE_10G: EditorialApproval[] = [
  {
    slug: "webcam-nao-funciona-o-que-verificar",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-26",
    approvedAt: "2026-08-26",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 3.0",
    imageAttribution:
      "Foto: Sushiflinger (Wikimedia Commons), CC BY-SA 3.0 — https://commons.wikimedia.org/wiki/File:Webcam_On_Laptop.JPG",
    notes:
      "Pilar do cluster de webcam, escrito do zero na Onda 10C (Lote 4); fact-check registrado em blogEditorialSources.ts; capa é imagem real licenciada, sem IA.",
  },
  {
    slug: "permissoes-de-camera-no-windows",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: "2026-08-26",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: Santeri Viinamäki (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:Tape_over_laptop_webcam.jpg",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 4 impressões, 0 cliques e posição média ~8,75 entre 2026-04-01 e 2026-09-27. A versão suplementar passa a sobrepor editorialmente o texto monolítico antigo, preservando a mesma URL. A investigação separa acesso do dispositivo, apps da Store, apps desktop, navegador/site e seleção da câmera no aplicativo, com fonte Microsoft visível e sem inventar queries individuais.",
  },
  {
    slug: "webcam-usb-nao-e-detectada",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-29",
    approvedAt: "2026-08-26",
    imageOrigin: "licensed",
    imageLicense: "CC0",
    imageAttribution:
      "Foto: WrS.tm.pl (Wikimedia Commons), CC0 — https://commons.wikimedia.org/wiki/File:USB_webcam_for_PC.jpg",
    notes:
      "Satélite de webcam USB, escrito do zero na Onda 10C (Lote 4); fact-check registrado em blogEditorialSources.ts; capa é imagem real licenciada, sem IA.",
  },
  {
    slug: "windows-update-nao-funciona-o-que-verificar",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-26",
    approvedAt: "2026-08-26",
    imageOrigin: "licensed",
    imageLicense: "Public Domain",
    imageAttribution:
      "Foto: Dion Dresschers (Wikimedia Commons), domínio público — https://commons.wikimedia.org/wiki/File:Cc0-windows-update_dion_dresschers.png",
    notes:
      "Pilar do cluster de Windows Update, escrito do zero na Onda 10C (Lote 4); nenhum procedimento de desativação de serviço é recomendado; fact-check registrado em blogEditorialSources.ts; capa é imagem real licenciada, sem IA.",
  },
  {
    slug: "limpar-cache-do-windows-update-softwaredistribution",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-10-01",
    approvedAt: "2026-08-26",
    imageOrigin: "licensed",
    imageLicense: "Public Domain",
    imageAttribution:
      "Foto: Wikipedian5122024 (Wikimedia Commons), domínio público — https://commons.wikimedia.org/wiki/File:Windows_10-11_update_screen_notice.png",
    notes:
      "Revisão material em 2026-10-01 guiada pelo GSC: 6 impressões, 0 cliques e posição média ~54,33 entre 2026-04-01 e 2026-09-28. A única query individual exposta foi 'software distribution'. A versão suplementar preserva a URL e aprofunda função do cache, triagem prévia, renomeação reversível, serviços, limites de formatação/reset e separação entre cache, DISM/SFC e falhas específicas do Windows Update.",
  },
  {
    slug: "windows-update-travado-desfazendo-alteracoes",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: "2026-08-26",
    imageOrigin: "licensed",
    imageLicense: "Public Domain",
    imageAttribution:
      "Foto: PantheraLeo1359531 (Wikimedia Commons), domínio público — https://commons.wikimedia.org/wiki/File:Windows_Update_%E2%80%93_VirtualBox_Windows_11_24H2_(Version_10.0.26100.1742)_04_02_2025_18_22_13crop.png",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 8 impressões, 0 cliques e posição média 12 entre 2026-04-01 e 2026-09-27. A query real “desfazendo alterações feitas no computador” foi incorporada à resposta. A versão suplementar passa a sobrepor editorialmente o texto monolítico antigo, preservando a mesma URL; remove heurísticas determinísticas de tempo/LED/ventoinha, prioriza histórico/KB/código e solucionador oficial, e usa Windows RE/BitLocker quando o sistema não volta a iniciar.",
  },
];

// ─────────────────────────────────────────────────────────────
// Onda 11A — Lote 4: BIOS, UEFI e inicialização do Windows.
// Aprovação manual autorizada pelo responsável em 2026-08-31
// (config/onda-11-liberacao.json). Capas são fotografias/capturas reais
// licenciadas no Wikimedia Commons — nenhuma imagem de IA.
// ─────────────────────────────────────────────────────────────
const WAVE_11A: EditorialApproval[] = [
  {
    slug: "boot-uefi-ou-legacy-como-identificar",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-29",
    approvedAt: "2026-08-31",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Captura: Paowee (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:Lenovo_ThinkPad_T470_UEFI_BIOS_1.75_setup_-_boot_menu_selection.JPG",
    notes:
      "Revisão material em 2026-09-29 guiada pelo GSC: 49 impressões, 0 cliques e posição média ~9,49; resposta direta para boot mode UEFI/Legacy, matriz UEFI/Legacy/CSM/Secure Boot, migração MBR→GPT com limites, BitLocker, critérios de parada e fontes Microsoft visíveis. Queries reais expostas pelo GSC foram incorporadas sem extrapolar demanda.",
  },
  {
    slug: "ordem-de-boot-na-bios-como-configurar",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-31",
    approvedAt: "2026-08-31",
    imageOrigin: "licensed",
    imageLicense: "CC BY 2.0",
    imageAttribution:
      "Foto: Paul Schultz (Wikimedia Commons), CC BY 2.0 — https://commons.wikimedia.org/wiki/File:BIOS_Setup_First_Time.jpg",
    notes:
      "Satélite de configuração de prioridade de inicialização, escrito do zero na Onda 11A (Lote 4); orientação de anotar a configuração original antes de alterar; capa é imagem real licenciada, sem IA.",
  },
  {
    slug: "windows-reparo-automatico-em-loop",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-10",
    approvedAt: "2026-09-10",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Captura: Armchair (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:Windows_Recovery_Environment.png",
    notes:
      "Satélite de laço de reparo automático, escrito do zero na Onda 11A (Lote 4) e aprofundado em 2026-09-10; sequência segura no Windows RE, backup e chave BitLocker priorizados, com comandos avançados limitados a volumes identificados; capa é imagem real licenciada, sem IA.",
  },
];

const WAVE_11C: EditorialApproval[] = [
  {
    slug: "manutencao-preventiva-de-computador-guia-completo",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-03",
    approvedAt: "2026-09-03",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 3.0",
    imageAttribution:
      "Foto: McZusatz (Wikimedia Commons), CC BY-SA 3.0 — https://commons.wikimedia.org/wiki/File:Dusty_computer_cooling_fan.JPG",
    notes:
      "Pilar do cluster de manutenção preventiva, escrito do zero na Onda 11C; calendário próprio por frequência e pontes para limpeza, pasta térmica e teste de backup; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "dispositivo-usb-nao-reconhecido-o-que-fazer",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-10-01",
    approvedAt: "2026-09-03",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 3.0",
    imageAttribution:
      "Foto: Zephyris (Wikimedia Commons), CC BY-SA 3.0 — https://commons.wikimedia.org/wiki/File:Male_and_Female_USB_Connectors.jpg",
    notes:
      "Revisão material em 2026-10-01 guiada pelo GSC: 2 impressões, 0 cliques e posição média ~44,5 entre 2026-04-01 e 2026-09-28. Queries reais: 'dispositivo usb não reconhecido' e 'usb não reconhecido'. A versão suplementar preserva a URL e aprofunda porta, cabo, alimentação, enumeração, códigos do Gerenciador de Dispositivos e driver sem canibalizar webcam ou proteção contra gravação.",
  },
  {
    slug: "como-testar-restauracao-de-backup",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-09",
    approvedAt: "2026-09-09",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: Santeri Viinamäki (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:DVD,_USB_flash_drive_and_external_hard_drive.jpg",
    notes:
      "Pilar do cluster de produtividade e continuidade, revisado materialmente em 2026-09-09; define evidência, níveis de teste e critérios de aprovação sem transformar periodicidade em regra universal. Fontes primárias no manifesto; capa real licenciada, sem IA.",
  },
];

// ── Onda 11D — guias técnicos profundos (térmica, mídia removível e versões).
const WAVE_11D: EditorialApproval[] = [
  {
    slug: "como-monitorar-temperatura-do-computador",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-03",
    approvedAt: "2026-09-03",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: Siarhei Besarab (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:ThinkPad_X220_CPU_cooling_system_(fan_and_heatsink_assembly).jpg",
    notes:
      "Guia de medição térmica escrito do zero na Onda 11D: método de leitura em repouso e sob carga, leitura de throttling e comparação com o próprio histórico; não repete o roteiro de superaquecimento nem os procedimentos de limpeza e pasta térmica. Capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "pendrive-somente-leitura-protegido-contra-gravacao",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-10-01",
    approvedAt: "2026-09-03",
    imageOrigin: "licensed",
    imageLicense: "Free Art License 1.3",
    imageAttribution:
      "Foto: smial (Wikimedia Commons), Free Art License 1.3 — https://commons.wikimedia.org/wiki/File:USB_stick_with_write_protection_IMGP7832_wp.jpg",
    notes:
      "Revisão material em 2026-10-01 guiada pelo GSC: 2 impressões, 0 cliques e posição média ~24,5 entre 2026-04-01 e 2026-09-28. A única query individual exposta foi 'usb protegido contra gravação'. A versão suplementar preserva a URL e aprofunda trava física, atributos readonly, política, sistema de arquivos, falha de controlador, cópia prévia dos dados e critérios de parada, com fontes Microsoft visíveis.",
  },
  {
    slug: "historico-de-arquivos-windows-como-configurar",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-03",
    approvedAt: "2026-09-03",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: Sam Frazier (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:External_portable_hard_drive.jpg",
    notes:
      "Procedimento de versionamento nativo do Windows, escrito do zero na Onda 11D: escopo real do recurso, dimensionamento do destino, retenção e diferença entre versionar e sincronizar. O teste de restauração permanece no artigo próprio. Capa é fotografia real licenciada, sem IA.",
  },
];

// ── Onda 11E — vídeo, energia de notebook e migração de arquivos.
const WAVE_11E: EditorialApproval[] = [
  {
    slug: "monitor-sem-sinal-o-que-verificar",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-03",
    approvedAt: "2026-09-03",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: Kannan Shanmugam (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:HDMI_Cable.JPG",
    notes:
      "Diagnóstico de ausência de sinal de vídeo escrito do zero na Onda 11E: separa monitor vivo, caminho do vídeo e computador que não inicia, com sequência de eliminação própria. Não repete o roteiro de notebook que não liga nem o de placa-mãe. Capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "bateria-de-notebook-nao-carrega-o-que-verificar",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-03",
    approvedAt: "2026-09-03",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 2.0",
    imageAttribution:
      "Foto: Intel Free Press (Wikimedia Commons), CC BY-SA 2.0 — https://commons.wikimedia.org/wiki/File:Laptop_PC_Battery_Removed.jpg",
    notes:
      "Diagnóstico de falha de carga escrito do zero na Onda 11E: distingue fonte, conector, limite de carga do fabricante e bateria em fim de vida, com critério de parada por segurança. Tema não coberto pelos artigos de notebook existentes. Capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "como-migrar-arquivos-para-um-computador-novo",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-03",
    approvedAt: "2026-09-03",
    imageOrigin: "licensed",
    imageLicense: "CC BY 4.0",
    imageAttribution:
      "Foto: Augkun-ane (Wikimedia Commons), CC BY 4.0 — https://commons.wikimedia.org/wiki/File:WD_Blue_Hard_Disk_Drive_connected_to_Laptop_via_USB-C.jpg",
    notes:
      "Procedimento de migração escrito do zero na Onda 11E: inventário, escolha de método, conferência e descarte seguro do equipamento antigo. Não canibaliza os artigos de backup, que tratam de rotina contínua. Capa é fotografia real licenciada, sem IA.",
  },
];

// ── Onda 11F — teclado de notebook, desligamento repentino e rede cabeada.
const WAVE_11F: EditorialApproval[] = [
  {
    slug: "teclado-de-notebook-nao-funciona-o-que-verificar",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-03",
    approvedAt: "2026-09-03",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: Gugalcrom123 (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:HP_laptop_keyboard.jpg",
    notes:
      "Diagnóstico de teclado interno escrito do zero na Onda 11F: separa teclado inteiro parado, teclas mortas, layout errado e dano por líquido, com teste do teclado externo como divisor. Não repete o roteiro de notebook que não liga nem o de USB não reconhecido. Capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "computador-desliga-sozinho-o-que-verificar",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-03",
    approvedAt: "2026-09-03",
    imageOrigin: "licensed",
    imageLicense: "CC BY 2.0",
    imageAttribution:
      "Foto: Giulia Ciappa (Wikimedia Commons), CC BY 2.0 — https://commons.wikimedia.org/wiki/File:Dust_in_a_the_computer_power_supply.jpg",
    notes:
      "Diagnóstico de desligamento repentino escrito do zero na Onda 11F: usa o padrão temporal para separar proteção térmica, fonte, rede elétrica e memória. Tela azul e superaquecimento de notebook continuam nas URLs próprias. Capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "computador-nao-conecta-na-internet-por-cabo",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-14",
    approvedAt: "2026-09-14",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: Pittigrilli / Zinnmann (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:RJ-45_Ethernet_socket_on_Lenovo_T410_Laptop.jpg",
    notes:
      "Revisão material do segundo ciclo em 2026-09-14: diagnóstico por enlace, DHCP/endereço, gateway, DNS e saída externa; comandos somente de leitura antes de qualquer redefinição; comparação Wi-Fi × Ethernet tratada como evidência, não prova absoluta. Não canibaliza os artigos de Wi-Fi nem o de internet lenta. Capa é fotografia real licenciada, sem IA.",
  },
];

// ── Onda 11G — ruído de ventoinha, rede Wi-Fi ausente e arquivo corrompido.
const WAVE_11G: EditorialApproval[] = [
  {
    slug: "ventoinha-do-computador-fazendo-barulho-o-que-verificar",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-03",
    approvedAt: "2026-09-03",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: Hannes Grobe (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:CPU-cooler-14_hg.jpg",
    notes:
      "Diagnóstico de ruído escrito do zero na Onda 11G: separa tipo de som (chiado, estalo, zumbido, rangido), origem provável e rotação exigida por temperatura. Não repete a limpeza interna nem o superaquecimento de notebook. Capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "rede-wifi-nao-aparece-na-lista-o-que-verificar",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-03",
    approvedAt: "2026-09-03",
    imageOrigin: "licensed",
    imageLicense: "CC BY 4.0",
    imageAttribution:
      "Foto: Hayden Schiff (Wikimedia Commons), CC BY 4.0 — https://commons.wikimedia.org/wiki/File:TP-Link_TL-WR740N_router_HS2.jpg",
    notes:
      "Diagnóstico de rede invisível escrito do zero na Onda 11G: separa adaptador desligado, banda de 5 GHz, SSID oculto e rede fora do ar. Cobertura fraca e velocidade continuam em URLs próprias. Capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "arquivo-corrompido-nao-abre-o-que-fazer",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-10-01",
    approvedAt: "2026-09-03",
    imageOrigin: "licensed",
    imageLicense: "CC BY 4.0",
    imageAttribution:
      "Foto: Mk2010 (Wikimedia Commons), CC BY 4.0 — https://commons.wikimedia.org/wiki/File:Hard_disk_drive_platter,_Samsung_MP0402H.jpg",
    notes:
      "Revisão material em 2026-10-01 guiada pelo GSC: query real 'arquivo corrompido' com 1 impressão e posição 38 entre 2026-04-01 e 2026-09-28. A versão suplementar preserva a URL e aprofunda preservação da cópia original, incompatibilidade versus corrupção, versões anteriores/backup, limite do CHKDSK e critérios para migrar o caso para recuperação de dados.",
  },
];


// ── Onda 11H — promoção controlada noindex → index (2026-09-25).
// Cinco artigos herdados foram reescritos materialmente, revisados contra
// fontes primárias e receberam capas vetoriais originais da própria marca.
const WAVE_11H: EditorialApproval[] = [
  {
    slug: "como-configurar-2fa-em-tudo",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-25",
    approvedAt: "2026-09-25",
    imageOrigin: "owned",
    imageLicense: "Todos os direitos reservados",
    imageAttribution:
      "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/como-configurar-2fa-em-tudo",
    notes:
      "Reescrita completa com CISA e NIST: diferencia MFA/2FA, resistência a phishing, recuperação e critérios de parada. Capa vetorial própria, sem IA e sem terceiros.",
  },
  {
    slug: "como-proteger-rede-wifi-empresa",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-25",
    approvedAt: "2026-09-25",
    imageOrigin: "owned",
    imageLicense: "Todos os direitos reservados",
    imageAttribution:
      "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/como-proteger-rede-wifi-empresa",
    notes:
      "Reescrita completa com Wi-Fi Alliance e CISA: criptografia, segmentação, gestão, firmware e limites operacionais. Capa vetorial própria, sem IA.",
  },
  {
    slug: "como-configurar-firewall-pfsense",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-25",
    approvedAt: "2026-09-25",
    imageOrigin: "owned",
    imageLicense: "Todos os direitos reservados",
    imageAttribution:
      "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/como-configurar-firewall-pfsense",
    notes:
      "Reescrita completa com documentação oficial Netgate: interfaces, regras, NAT, VLANs, administração, backup e recuperação sem defaults frágeis de versão. Capa vetorial própria, sem IA.",
  },
  {
    slug: "como-configurar-active-directory",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-25",
    approvedAt: "2026-09-25",
    imageOrigin: "owned",
    imageLicense: "Todos os direitos reservados",
    imageAttribution:
      "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/como-configurar-active-directory",
    notes:
      "Reescrita completa com Microsoft Learn: AD DS, DNS, segurança, redundância, GPO, backup e critérios de parada. Capa vetorial própria, sem IA.",
  },
  {
    slug: "como-deixar-celular-android-mais-rapido",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-25",
    approvedAt: "2026-09-25",
    imageOrigin: "owned",
    imageLicense: "Todos os direitos reservados",
    imageAttribution:
      "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/como-deixar-celular-android-mais-rapido",
    notes:
      "Artigo ampliado e realinhado com a ajuda oficial do Android/Google: armazenamento, apps, cache, temperatura, reset e limite do hardware, sem aceleradores milagrosos. Capa vetorial própria, sem IA.",
  },
];

// ── Onda 11I — segunda promoção controlada noindex → index (2026-09-25).
const WAVE_11I: EditorialApproval[] = [
  {
    slug: "como-configurar-repetidor-wifi", status: "approved", authorType: "organization", authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-25", approvedAt: "2026-09-25", imageOrigin: "owned", imageLicense: "Todos os direitos reservados",
    imageAttribution: "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/como-configurar-repetidor-wifi",
    notes: "Reescrita material com documentação de fabricante e Wi‑Fi Alliance: posicionamento, WPS, bandas, validação e limites do repetidor sem credenciais genéricas nem promessa de perda fixa de velocidade.",
  },
  {
    slug: "trocar-windows-por-linux-vale-a-pena", status: "approved", authorType: "organization", authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-25", approvedAt: "2026-09-25", imageOrigin: "owned", imageLicense: "Todos os direitos reservados",
    imageAttribution: "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/trocar-windows-por-linux-vale-a-pena",
    notes: "Reescrita orientada por compatibilidade e teste live com documentação Ubuntu e requisitos Microsoft; remove generalizações de memória, software, jogos e telemetria.",
  },
  {
    slug: "erros-comuns-upgrade-computador", status: "approved", authorType: "organization", authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-25", approvedAt: "2026-09-25", imageOrigin: "owned", imageLicense: "Todos os direitos reservados",
    imageAttribution: "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/erros-comuns-upgrade-computador",
    notes: "Reescrita completa com documentação de memória, SSD/NVMe, requisitos do Windows e BitLocker; acrescenta compatibilidade, backup, firmware, energia e validação pós-upgrade.",
  },
  {
    slug: "como-configurar-vpn-empresarial", status: "approved", authorType: "organization", authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-25", approvedAt: "2026-09-25", imageOrigin: "owned", imageLicense: "Todos os direitos reservados",
    imageAttribution: "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/como-configurar-vpn-empresarial",
    notes: "Reescrita defensiva com WireGuard/OpenVPN/CISA/Netgate: identidade individual, MFA, rotas, segmentação, DNS, logs, revogação e recuperação, sem scripts copiar-e-colar frágeis.",
  },
  {
    slug: "como-recuperar-conta-hackeada", status: "approved", authorType: "organization", authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-25", approvedAt: "2026-09-25", imageOrigin: "owned", imageLicense: "Todos os direitos reservados",
    imageAttribution: "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/como-recuperar-conta-hackeada",
    notes: "Reescrita baseada em fluxos oficiais Google/Microsoft e CISA: recuperação, sessões, fatores, dispositivo, evidências e limites de suporte; remove estatísticas e promessas sem fonte.",
  },
];

// ── Onda 11J — Windows, backup e conectividade qualificados (2026-09-25).
const WAVE_11J: EditorialApproval[] = [
  {
    slug: "como-deixar-windows-11-mais-rapido-iniciantes", status: "approved", authorType: "organization", authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-25", approvedAt: "2026-09-25", imageOrigin: "licensed", imageLicense: "CC BY-SA 4.0",
    imageAttribution: "Foto: Laurabatanero (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:Working_on_my_laptop.jpg",
    notes: "Reescrita com Microsoft Support: diagnóstico por CPU/memória/disco, inicialização, armazenamento e atualização; remove porcentagens mágicas, otimizadores e promessa local.",
  },
  {
    slug: "como-fazer-backup-fotos-windows-iniciantes", status: "approved", authorType: "organization", authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-25", approvedAt: "2026-09-25", imageOrigin: "licensed", imageLicense: "CC BY-SA 4.0",
    imageAttribution: "Foto: Sam Frazier (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:External_portable_hard_drive.jpg",
    notes: "Reescrita com Microsoft/CISA/NIST: inventário, cópia externa, Histórico de Arquivos, nuvem, verificação e restauração; distingue sincronização de backup.",
  },
  {
    slug: "como-atualizar-windows-corretamente", status: "approved", authorType: "organization", authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-25", approvedAt: "2026-09-25", imageOrigin: "licensed", imageLicense: "Public Domain",
    imageAttribution: "Foto: Dion Dresschers (Wikimedia Commons), domínio público — https://commons.wikimedia.org/wiki/File:Cc0-windows-update_dion_dresschers.png",
    notes: "Reescrita com Microsoft Support: preparação, Windows Update, Obter Ajuda, validação e critérios de parada; remove cronômetros universais e desligamento forçado como receita.",
  },
  {
    slug: "como-recuperar-arquivos-apagados-windows", status: "approved", authorType: "organization", authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-25", approvedAt: "2026-09-25", imageOrigin: "licensed", imageLicense: "CC BY-SA 4.0",
    imageAttribution: "Foto: Santeri Viinamäki (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:DVD,_USB_flash_drive_and_external_hard_drive.jpg",
    notes: "Reescrita com Microsoft Support: Lixeira, backup, Windows File Recovery, destino separado, redução de gravações e limites de SSD/falha física.",
  },
  {
    slug: "como-fazer-teste-velocidade-internet", status: "approved", authorType: "organization", authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-25", approvedAt: "2026-09-25", imageOrigin: "licensed", imageLicense: "CC BY 4.0",
    imageAttribution: "Foto: VulcanSphere (Wikimedia Commons), CC BY 4.0 — https://commons.wikimedia.org/wiki/File:ARRIS_CM820B_DOCSIS_Cable_Modem.jpg",
    notes: "Reescrita com FCC: referência cabeada, múltiplas medições, download/upload/latência/jitter/perda; remove regra absoluta sobre Wi‑Fi e percentuais regulatórios antigos.",
  },
];


// ── Onda 11K — credenciais, organização do Windows e segurança Wi-Fi.
const WAVE_11K: EditorialApproval[] = [
  {
    slug: "como-resetar-senha-windows",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-25",
    approvedAt: "2026-09-25",
    imageOrigin: "owned",
    imageLicense: "Todos os direitos reservados",
    imageAttribution: "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/como-resetar-senha-windows",
    notes: "Reescrita completa com Microsoft Support: recuperação oficial por tipo de credencial, BitLocker, contas corporativas e remoção explícita de bypass de autenticação.",
  },
  {
    slug: "como-organizar-arquivos-windows-iniciantes",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-25",
    approvedAt: "2026-09-25",
    imageOrigin: "owned",
    imageLicense: "Todos os direitos reservados",
    imageAttribution: "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/como-organizar-arquivos-windows-iniciantes",
    notes: "Reescrita completa com Microsoft Support: Explorador, pesquisa, Acesso Rápido, OneDrive, backup e segurança antes de movimentação em massa.",
  },
  {
    slug: "como-trocar-senha-wifi",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-25",
    approvedAt: "2026-09-25",
    imageOrigin: "owned",
    imageLicense: "Todos os direitos reservados",
    imageAttribution: "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/como-trocar-senha-wifi",
    notes: "Reescrita completa com orientação oficial de segurança: painel legítimo, senhas separadas, WPA2/WPA3, firmware, validação e critérios para não resetar roteador gerenciado.",
  },
];


const WAVE_11L: EditorialApproval[] = [
  {
    slug: "como-configurar-bios-uefi-corretamente", status: "approved", authorType: "organization", authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-25", approvedAt: "2026-09-25", imageOrigin: "owned", imageLicense: "Todos os direitos reservados",
    imageAttribution: "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/como-configurar-bios-uefi-corretamente",
    notes: "Reescrita com Microsoft Support: UEFI, Secure Boot, TPM, BitLocker, armazenamento e perfis de memória tratados por diagnóstico e rollback.",
  },
  {
    slug: "como-configurar-servidor-de-arquivos", status: "approved", authorType: "organization", authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-25", approvedAt: "2026-09-25", imageOrigin: "owned", imageLicense: "Todos os direitos reservados",
    imageAttribution: "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/como-configurar-servidor-de-arquivos",
    notes: "Reescrita com Microsoft Learn e Samba: identidade, SMB autenticado, segmentação, backup testado e acesso remoto sem expor 445.",
  },
  {
    slug: "como-configurar-firewall-ufw-linux", status: "approved", authorType: "organization", authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-25", approvedAt: "2026-09-25", imageOrigin: "owned", imageLicense: "Todos os direitos reservados",
    imageAttribution: "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/como-configurar-firewall-ufw-linux",
    notes: "Reescrita com Ubuntu Server: regras por necessidade, preservação de SSH, dry-run, origem, perfis, logs e critérios de parada.",
  },
];


const WAVE_11M: EditorialApproval[] = [
  {
    slug: "como-fazer-backup-na-nuvem",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-26",
    approvedAt: "2026-09-26",
    imageOrigin: "owned",
    imageLicense: "Todos os direitos reservados",
    imageAttribution:
      "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/como-fazer-backup-na-nuvem",
    notes:
      "Intenção independente qualificada no fechamento do estoque programático: distingue sincronização de backup, exige cópia independente e restauração testada, com revisão técnica CISA/NIST. Capa vetorial própria, sem terceiros e sem dados pessoais.",
  },
];


const WAVE_11N: EditorialApproval[] = [
  {
    slug: "wifi-caindo-toda-hora",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-26",
    approvedAt: "2026-09-26",
    imageOrigin: "owned",
    imageLicense: "Todos os direitos reservados",
    imageAttribution:
      "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/wifi-caindo-toda-hora",
    notes:
      "Intenção independente de instabilidade Wi-Fi qualificada após reescrita e revisão material: separa dispositivo, WLAN, roteador/modem e provedor, evita canal/limite universal e usa FCC/Wi-Fi Alliance como fontes primárias. Capa vetorial própria, sem terceiros e sem dados pessoais.",
  },
];


const WAVE_11O: EditorialApproval[] = [
  {
    slug: "pc-nao-liga-o-que-fazer",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-26",
    approvedAt: "2026-09-26",
    imageOrigin: "owned",
    imageLicense: "Todos os direitos reservados",
    imageAttribution:
      "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/pc-nao-liga-o-que-fazer",
    notes:
      "Owner editorial para desktop que não liga/sem energia ou liga sem POST: separa alimentação, POST/vídeo e boot antes de qualquer troca de peça. Revisão material remove ponte em fonte, reset de CMOS genérico e diagnóstico por tentativa. Capa vetorial própria, sem terceiros e sem dados pessoais.",
  },
];


const WAVE_11P: EditorialApproval[] = [
  {
    slug: "ssd-nao-aparece-no-instalador-do-windows",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-26",
    approvedAt: "2026-09-26",
    imageOrigin: "owned",
    imageLicense: "Todos os direitos reservados",
    imageAttribution:
      "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/ssd-nao-aparece-no-instalador-do-windows",
    notes:
      "Guia original para Windows Setup: separa firmware, controlador/driver, compatibilidade M.2/NVMe e mídia oficial; protege dados e BitLocker antes de qualquer ação destrutiva. Capa vetorial própria, sem terceiros e sem dados pessoais.",
  },
];


const WAVE_11Q: EditorialApproval[] = [
  {
    slug: "como-instalar-ubuntu-do-zero",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-26",
    approvedAt: "2026-09-26",
    imageOrigin: "owned",
    imageLicense: "Todos os direitos reservados",
    imageAttribution:
      "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/como-instalar-ubuntu-do-zero",
    notes:
      "Reescrita material baseada na documentação oficial Ubuntu: backup, mídia bootável, escolha de disco, dual boot, BitLocker, criptografia, atualização e critérios de parada. Capa vetorial própria, sem terceiros e sem dados pessoais.",
  },
];


const WAVE_11R: EditorialApproval[] = [
  {
    slug: "como-usar-rsync-backup-linux",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-27",
    approvedAt: "2026-09-27",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: Sam Frazier (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:External_portable_hard_drive.jpg",
    notes:
      "Owner específico de rsync revisado e fact-checked em 2026-09-27. Capa reutiliza de forma controlada fotografia real licenciada já versionada no acervo; conteúdo separa sincronização de backup, protege contra --delete e exige teste de restauração.",
  },
];


const WAVE_11S: EditorialApproval[] = [
  {
    slug: "como-configurar-ssh-seguro-linux",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-27",
    approvedAt: "2026-09-27",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 3.0",
    imageAttribution:
      "Foto: BalticServers.com (Wikimedia Commons), CC BY-SA 3.0 — https://commons.wikimedia.org/wiki/File:BalticServers_data_center.jpg",
    notes:
      "Owner específico de OpenSSH revisado e fact-checked em 2026-09-27. Capa reutiliza fotografia real licenciada já versionada no acervo; conteúdo prioriza chave testada, configuração efetiva, sshd -t, segunda sessão e rollback, sem tratar porta customizada ou fail2ban como núcleo da segurança.",
  },
];


const WAVE_11T: EditorialApproval[] = [
  {
    slug: "como-gerenciar-pacotes-apt-dnf-linux",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-27",
    approvedAt: "2026-09-27",
    imageOrigin: "owned",
    imageLicense: "Todos os direitos reservados",
    imageAttribution:
      "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/como-instalar-ubuntu-do-zero",
    notes:
      "Owner específico de gerenciamento de pacotes revisado e fact-checked em 2026-09-27. Capa reutiliza arte editorial própria já versionada; conteúdo separa APT de DNF/DNF5, exige identificação da distribuição, revisão da transação e não contorna assinatura.",
  },
];


const WAVE_11U: EditorialApproval[] = [
  {
    slug: "comandos-linux-essenciais-iniciantes",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-27",
    approvedAt: "2026-09-27",
    imageOrigin: "owned",
    imageLicense: "Todos os direitos reservados",
    imageAttribution:
      "Arte editorial original: O Técnico de Informática — https://otecnicodeinformatica.com.br/blog/como-instalar-ubuntu-do-zero",
    notes:
      "Owner de fundamentos do terminal Linux revisado e fact-checked em 2026-09-27. Capa reutiliza arte editorial própria já versionada; conteúdo substitui lista promocional por laboratório seguro, leitura de caminhos, arquivos, pipes, permissões, processos e critérios explícitos para operações destrutivas.",
  },
];


const WAVE_11V: EditorialApproval[] = [
  {
    slug: "como-saber-se-pc-tem-virus-malware",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: FIRST_WAVE_APPROVED_AT,
    imageOrigin: "generated",
    imageLicense: "Ativo gerado sob encomenda para uso próprio da marca",
    imageAttribution: "O Técnico de Informática",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 7 impressões, 0 cliques e posição média ~24,43 entre 2026-04-01 e 2026-09-27. A única query individual exposta foi 'como saber se o notebook esta com virus' (1 impressão, posição 40). A versão suplementar passa a sobrepor editorialmente o conteúdo-base, preservando a mesma URL; separa sintoma de evidência, navegador de sistema, malware de comprometimento de conta e falso suporte, adiciona matriz de decisão, contenção para ransomware/acesso remoto e critérios de parada, sem inventar queries.",
  },
];



const WAVE_11W: EditorialApproval[] = [
  {
    slug: "notebook-superaquecendo-o-que-fazer",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-09-30",
    approvedAt: FIRST_WAVE_APPROVED_AT,
    imageOrigin: "generated",
    imageLicense: "Ativo gerado sob encomenda para uso próprio da marca",
    imageAttribution: "O Técnico de Informática",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 4 impressões, 0 cliques e posição média ~50,75 entre 2026-04-01 e 2026-09-28. A única query individual exposta foi 'notebook superaquecendo' (4 impressões). A versão suplementar preserva a URL e mantém intenção específica de notebook, separando carga, ventilação, throttling, ventoinha, poeira, interface térmica e bateria estufada, sem temperatura ou prazo universal de pasta térmica.",
  },
];


export const APPROVED_EDITORIAL_CONTENT = new Map<string, EditorialApproval>([

  ...FIRST_WAVE_SLUGS.map((slug) => [
    slug,
    {
      slug,
      status: "approved" as EditorialStatus,
      authorType: "organization" as EditorialAuthorType,
      authorId: INSTITUTIONAL_AUTHOR.id,
      reviewedAt: FIRST_WAVE_APPROVED_AT,
      approvedAt: FIRST_WAVE_APPROVED_AT,
      imageOrigin: "generated" as EditorialImageOrigin,
      imageLicense: "Ativo gerado sob encomenda para uso próprio da marca",
      imageAttribution: "O Técnico de Informática",
      notes:
        "Revisão técnica concluída e fact-check registrado em blogEditorialSources.ts; capa própria conforme briefing.",
    },
  ] as [string, EditorialApproval]),

  ...WAVE_4X.map((a) => [a.slug, a] as [string, EditorialApproval]),

  ...WAVE_4Y.map((a) => [a.slug, a] as [string, EditorialApproval]),

  ...WAVE_4Z.map((a) => [a.slug, a] as [string, EditorialApproval]),

  ...WAVE_5A.map((a) => [a.slug, a] as [string, EditorialApproval]),

  ...WAVE_5B.map((a) => [a.slug, a] as [string, EditorialApproval]),

  ...WAVE_5C.map((a) => [a.slug, a] as [string, EditorialApproval]),

  ...WAVE_5D.map((a) => [a.slug, a] as [string, EditorialApproval]),

  ...WAVE_5E.map((a) => [a.slug, a] as [string, EditorialApproval]),

  ...WAVE_5F.map((a) => [a.slug, a] as [string, EditorialApproval]),

  ...WAVE_5G.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_5H.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_5I.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_8E.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_9B.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_9C.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_10C.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_10D.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_10E.map((a) => [a.slug, a] as [string, EditorialApproval]),


  ...WAVE_10F.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_10G.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_11A.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_11C.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_11D.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_11E.map((a) => [a.slug, a] as [string, EditorialApproval]),  ...WAVE_11F.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_11G.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_11H.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_11I.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_11J.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_11K.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_11L.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_11M.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_11N.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_11O.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_11P.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_11Q.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_11R.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_11S.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_11T.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_11U.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_11V.map((a) => [a.slug, a] as [string, EditorialApproval]),
  ...WAVE_11W.map((a) => [a.slug, a] as [string, EditorialApproval]),

]);


// ─────────────────────────────────────────────────────────────
// FILA DE REVISÃO EDITORIAL (in_review) — separada dos aprovados.
//
// Os oito conteúdos-piloto foram reescritos com profundidade, mas
// NÃO estão aprovados: seguem noindex, fora do sitemap e fora da
// listagem pública. Esta fila é apenas um registro de trabalho.
// Ela NÃO influencia isEditorialApproved() — a única fonte de
// indexabilidade continua sendo APPROVED_EDITORIAL_CONTENT.
//
// Regras para cada item aqui:
//   status: "in_review"
//   authorType: "organization" (autoria institucional; sem pessoa)
//   authorId: entidade oficial (INSTITUTIONAL_AUTHOR.id)
//   imageOrigin: "unknown" (nenhuma imagem aprovada)
//   approvedAt: AUSENTE
//   reviewedAt: AUSENTE (não houve revisão material concluída)
// ─────────────────────────────────────────────────────────────
// Fila-piloto: artigos ainda em revisão (noindex, fora do sitemap).
// Os slugs promovidos na primeira onda (FIRST_WAVE_SLUGS) saíram desta fila.
// Fila de revisão editorial. Vazia quando todos os candidatos-piloto já
// foram promovidos (Onda 4Z promoveu os dois últimos). Um slug nunca pode
// estar simultaneamente na fila e aprovado em uma onda.
export const EDITORIAL_PILOT_SLUGS = [] as const;


export const EDITORIAL_REVIEW_QUEUE = new Map<string, EditorialApproval>(
  EDITORIAL_PILOT_SLUGS.map((slug) => [
    slug,
    {
      slug,
      status: "in_review" as EditorialStatus,
      authorType: "organization" as EditorialAuthorType,
      authorId: INSTITUTIONAL_AUTHOR.id,
      imageOrigin: "unknown" as EditorialImageOrigin,
      // Rascunho em revisao — sem data de aprovacao e sem data de revisao material.
    },
  ]),
);

const ISO_DATE = /^\d{4}-\d{2}-\d{2}(?:[T ].*)?$/;

/**
 * Validação fail-closed. Retorna true SOMENTE quando todos os
 * requisitos explícitos estão presentes e coerentes.
 */
function isValidApproval(a: EditorialApproval | undefined): a is EditorialApproval {
  if (!a) return false;
  if (a.status !== "approved") return false;
  if (a.authorType !== "organization" && a.authorType !== "person") return false;
  if (!a.authorId || a.authorId.trim() === "") return false;
  if (!a.imageOrigin || a.imageOrigin === "unknown") return false;
  if (!a.approvedAt || !ISO_DATE.test(a.approvedAt)) return false;
  // Rejeita datas de aprovação no futuro (proteção anti-build-date).
  const ts = new Date(a.approvedAt).getTime();
  if (Number.isNaN(ts) || ts > Date.now()) return false;
  return true;
}

/** Status editorial de um slug. Padrão fail-closed: "draft". */
export function getEditorialStatus(slug: string): EditorialStatus {
  const entry = APPROVED_EDITORIAL_CONTENT.get(slug);
  return entry?.status ?? "draft";
}

/** Registro editorial bruto de um slug (se existir). */
export function getEditorialApproval(slug: string): EditorialApproval | undefined {
  return APPROVED_EDITORIAL_CONTENT.get(slug);
}

/** Verdadeiro apenas se o slug tem aprovação editorial válida e completa. */
export function isEditorialApproved(slug: string): boolean {
  return isValidApproval(APPROVED_EDITORIAL_CONTENT.get(slug));
}

/** Lista de slugs efetivamente aprovados (validados). Vazia nesta fase. */
export function getApprovedSlugs(): string[] {
  return [...APPROVED_EDITORIAL_CONTENT.values()]
    .filter(isValidApproval)
    .map((a) => a.slug);
}

export default APPROVED_EDITORIAL_CONTENT;
