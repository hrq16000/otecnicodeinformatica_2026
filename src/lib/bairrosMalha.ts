/**
 * ============================================================================
 * MALHA PROGRAMÁTICA DE BAIRROS — taxonomia oficial + flag de enriquecimento
 * ============================================================================
 * Fonte única da cobertura territorial (Curitiba + Região Metropolitana).
 *
 * Regra de indexação (decidida com o dono do projeto):
 *   contentStatus === "RICH"    → página indexável (index, follow, sitemap)
 *   contentStatus === "SHALLOW" → página existe, responde 200, é linkada e
 *                                 navegável, mas nasce `noindex` e fora do
 *                                 sitemap até receber enriquecimento real
 *                                 (fotos locais, texto denso, FAQ).
 *
 * O status RICH nunca é escrito à mão aqui: ele é derivado de
 * `localIndexPolicy.json`, que continua sendo a fonte de verdade da
 * indexação local. Assim, promover um bairro é um ato único (política),
 * e a malha inteira se ajusta sozinha.
 */
import { BAIRROS_ANCORA_SLUGS, resolveLocal } from "./localIndexPolicy";

export type ContentStatus = "SHALLOW" | "RICH";

export type RegiaoMalhaId =
  | "centro"
  | "matriz-batel"
  | "norte"
  | "leste"
  | "sul"
  | "oeste-cic"
  | "metropolitana";

export interface BairroMalha {
  slug: string;
  nome: string;
  cidade: string;
  regiao: RegiaoMalhaId;
  regiaoNome: string;
  /** SHALLOW = template de conversão. RICH = conteúdo aprofundado + FAQ. */
  contentStatus: ContentStatus;
  path: string;
}

interface RegiaoRaw {
  id: RegiaoMalhaId;
  nome: string;
  cidadePadrao: string;
  /** Regiões vizinhas usadas na reciprocidade cruzada de links. */
  vizinhas: RegiaoMalhaId[];
  bairros: { nome: string; slug: string; cidade?: string; path?: string }[];
}

const REGIOES_RAW: RegiaoRaw[] = [
  {
    id: "centro",
    nome: "Centro e região central",
    cidadePadrao: "Curitiba",
    vizinhas: ["matriz-batel", "norte", "leste"],
    bairros: [
      { nome: "Centro", slug: "centro" },
      { nome: "Centro Cívico", slug: "centro-civico" },
      { nome: "São Francisco", slug: "sao-francisco" },
      { nome: "Alto da Glória", slug: "alto-da-gloria" },
      { nome: "Alto da XV", slug: "alto-da-xv" },
      { nome: "Rebouças", slug: "reboucas" },
      { nome: "Prado Velho", slug: "prado-velho" },
    ],
  },
  {
    id: "matriz-batel",
    nome: "Matriz / Batel",
    cidadePadrao: "Curitiba",
    vizinhas: ["centro", "sul", "oeste-cic"],
    bairros: [
      { nome: "Batel", slug: "batel" },
      { nome: "Água Verde", slug: "agua-verde" },
      { nome: "Bigorrilho", slug: "bigorrilho" },
      { nome: "Mercês", slug: "merces" },
      { nome: "Campina do Siqueira", slug: "campina-do-siqueira" },
      { nome: "Vila Izabel", slug: "vila-izabel" },
      { nome: "Seminário", slug: "seminario" },
    ],
  },
  {
    id: "norte",
    nome: "Norte",
    cidadePadrao: "Curitiba",
    vizinhas: ["centro", "leste", "metropolitana"],
    bairros: [
      { nome: "Juvevê", slug: "juveve" },
      { nome: "Cabral", slug: "cabral" },
      { nome: "Hugo Lange", slug: "hugo-lange" },
      { nome: "Jardim Social", slug: "jardim-social" },
      { nome: "Bacacheri", slug: "bacacheri" },
      { nome: "Bairro Alto", slug: "bairro-alto" },
      { nome: "Tingui", slug: "tingui" },
      { nome: "Atuba", slug: "atuba" },
      { nome: "Boa Vista", slug: "boa-vista" },
    ],
  },
  {
    id: "leste",
    nome: "Leste",
    cidadePadrao: "Curitiba",
    vizinhas: ["centro", "norte", "sul"],
    bairros: [
      { nome: "Cristo Rei", slug: "cristo-rei" },
      { nome: "Jardim das Américas", slug: "jardim-das-americas" },
      { nome: "Cajuru", slug: "cajuru" },
      { nome: "Capão da Imbuia", slug: "capao-da-imbuia" },
      { nome: "Uberaba", slug: "uberaba" },
      { nome: "Guabirotuba", slug: "guabirotuba" },
    ],
  },
  {
    id: "sul",
    nome: "Sul",
    cidadePadrao: "Curitiba",
    vizinhas: ["matriz-batel", "leste", "oeste-cic"],
    bairros: [
      { nome: "Portão", slug: "portao" },
      { nome: "Novo Mundo", slug: "novo-mundo" },
      { nome: "Fanny", slug: "fanny" },
      { nome: "Lindóia", slug: "lindoia" },
      { nome: "Pinheirinho", slug: "pinheirinho" },
      { nome: "Xaxim", slug: "xaxim" },
      { nome: "Boqueirão", slug: "boqueirao" },
      { nome: "Hauer", slug: "hauer" },
      { nome: "Sítio Cercado", slug: "sitio-cercado" },
    ],
  },
  {
    id: "oeste-cic",
    nome: "Oeste e CIC",
    cidadePadrao: "Curitiba",
    vizinhas: ["matriz-batel", "sul", "metropolitana"],
    bairros: [
      { nome: "Campo Comprido", slug: "campo-comprido" },
      { nome: "Cidade Industrial (CIC)", slug: "cic" },
      { nome: "Fazendinha", slug: "fazendinha" },
      { nome: "Santa Quitéria", slug: "santa-quiteria" },
      { nome: "Vista Alegre", slug: "vista-alegre" },
      { nome: "Santa Felicidade", slug: "santa-felicidade" },
      { nome: "Butiatuvinha", slug: "butiatuvinha" },
    ],
  },
  {
    id: "metropolitana",
    nome: "Região Metropolitana",
    cidadePadrao: "Região Metropolitana de Curitiba",
    vizinhas: ["norte", "oeste-cic", "leste"],
    bairros: [
      { nome: "São José dos Pinhais", slug: "sao-jose-dos-pinhais", cidade: "São José dos Pinhais" },
      { nome: "Pinhais", slug: "pinhais", path: "/tecnico-informatica-pinhais", cidade: "Pinhais" },
      { nome: "Colombo", slug: "colombo", path: "/tecnico-informatica-colombo", cidade: "Colombo" },
      { nome: "Araucária", slug: "araucaria", path: "/tecnico-informatica-araucaria", cidade: "Araucária" },
      { nome: "Campo Largo", slug: "campo-largo", path: "/tecnico-informatica-campo-largo", cidade: "Campo Largo" },
      { nome: "Almirante Tamandaré", slug: "almirante-tamandare", path: "/tecnico-informatica-almirante-tamandare", cidade: "Almirante Tamandaré" },
      { nome: "Fazenda Rio Grande", slug: "fazenda-rio-grande", path: "/tecnico-informatica-fazenda-rio-grande", cidade: "Fazenda Rio Grande" },
      { nome: "Piraquara", slug: "piraquara", path: "/tecnico-informatica-piraquara", cidade: "Piraquara" },
      { nome: "Quatro Barras", slug: "quatro-barras", path: "/tecnico-informatica-quatro-barras", cidade: "Quatro Barras" },
    ],
  },
];

/** RICH = a política central já declara a página como indexável. */
function statusDe(slug: string, path: string): ContentStatus {
  if (BAIRROS_ANCORA_SLUGS.includes(slug)) return "RICH";
  return resolveLocal(path).indexability === "index" ? "RICH" : "SHALLOW";
}

export interface RegiaoMalha {
  id: RegiaoMalhaId;
  nome: string;
  vizinhas: RegiaoMalhaId[];
  bairros: BairroMalha[];
}

export const REGIOES_MALHA: RegiaoMalha[] = REGIOES_RAW.map((regiao) => ({
  id: regiao.id,
  nome: regiao.nome,
  vizinhas: regiao.vizinhas,
  bairros: regiao.bairros.map((b) => {
    const path = b.path ?? `/bairros/${b.slug}`;
    return {
      slug: b.slug,
      nome: b.nome,
      cidade: b.cidade ?? regiao.cidadePadrao,
      regiao: regiao.id,
      regiaoNome: regiao.nome,
      contentStatus: statusDe(b.slug, path),
      path,
    };
  }),
}));

export const BAIRROS_MALHA: BairroMalha[] = REGIOES_MALHA.flatMap((r) => r.bairros);

export const BAIRROS_MALHA_SLUGS = BAIRROS_MALHA.map((b) => b.slug);

export function bairroMalha(slug: string): BairroMalha | undefined {
  return BAIRROS_MALHA.find((b) => b.slug === slug);
}

export function regiaoMalha(id: RegiaoMalhaId): RegiaoMalha | undefined {
  return REGIOES_MALHA.find((r) => r.id === id);
}

/** Regiões adjacentes de um bairro — usadas na reciprocidade cruzada. */
export function regioesVizinhas(bairro: BairroMalha): RegiaoMalha[] {
  const regiao = regiaoMalha(bairro.regiao);
  if (!regiao) return [];
  return regiao.vizinhas
    .map((id) => regiaoMalha(id))
    .filter((r): r is RegiaoMalha => Boolean(r));
}

/** Bairros da mesma região (exceto o próprio) — malha lateral. */
export function bairrosIrmaos(bairro: BairroMalha): BairroMalha[] {
  return regiaoMalha(bairro.regiao)?.bairros.filter((b) => b.slug !== bairro.slug) ?? [];
}

/** Serviços principais que cada página de bairro distribui em grade. */
export const SERVICOS_MALHA = [
  { slug: "formatacao", label: "Formatação com backup", to: "/servicos/formatacao" },
  { slug: "manutencao-notebook", label: "Manutenção de notebook", to: "/servicos/manutencao-notebook" },
  { slug: "recuperacao-dados", label: "Recuperação de dados", to: "/servicos/recuperacao-dados" },
  { slug: "conserto-placa", label: "Conserto de placa", to: "/servicos/conserto-placa" },
  { slug: "upgrade-ssd", label: "Upgrade de SSD e memória", to: "/servicos/upgrade-ssd" },
  { slug: "remocao-virus", label: "Remoção de vírus", to: "/servicos/remocao-virus" },
  { slug: "redes-wifi", label: "Redes e Wi-Fi", to: "/servicos/redes-wifi" },
  { slug: "suporte-remoto", label: "Suporte remoto", to: "/servicos/suporte-remoto" },
] as const;

/** Fila de enriquecimento: tudo que ainda está raso. */
export const FILA_ENRIQUECIMENTO = BAIRROS_MALHA.filter((b) => b.contentStatus === "SHALLOW");

export const RESUMO_MALHA = {
  total: BAIRROS_MALHA.length,
  rich: BAIRROS_MALHA.length - FILA_ENRIQUECIMENTO.length,
  shallow: FILA_ENRIQUECIMENTO.length,
};

export const tituloBairro = (b: BairroMalha) =>
  `Assistência Técnica e Conserto de PC no ${b.nome} — Atendimento Rápido`;

export const descricaoBairro = (b: BairroMalha) =>
  `Assistência técnica de informática no ${b.nome} (${b.cidade}): formatação com backup, manutenção de notebook, recuperação de dados, redes e suporte remoto. Diagnóstico antes de qualquer cobrança e atendimento pelo WhatsApp.`;

/** Resolve o bairro da malha a partir do path atual (contexto de conversão). */
export function bairroPorPath(path: string): BairroMalha | undefined {
  const limpo = path.replace(/\/+$/, "") || "/";
  return BAIRROS_MALHA.find((b) => b.path === limpo);
}

/**
 * Mensagem de WhatsApp com o contexto já resolvido pela rota: o usuário não
 * precisa digitar o bairro em que já está navegando.
 */
export function mensagemBairro(b: BairroMalha, servicoLabel?: string): string {
  return servicoLabel
    ? `Olá, preciso de ajuda com ${servicoLabel} no bairro ${b.nome} (${b.cidade}).`
    : `Olá, preciso de assistência técnica de informática no bairro ${b.nome} (${b.cidade}).`;
}
