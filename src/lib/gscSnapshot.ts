/**
 * SNAPSHOT DO GOOGLE SEARCH CONSOLE — leitura tipada.
 *
 * Fonte: `src/data/gscSnapshot.json`, gerado por
 * `node scripts/report-gsc-snapshot.mjs --inspect` (dados reais da
 * propriedade verificada). Fail-closed: quando `status !== "ok"`,
 * as telas mostram "sem dados" em vez de estimar qualquer número.
 */
import snapshotJson from "@/data/gscSnapshot.json";

export interface GscConsulta {
  termo: string;
  cliques: number;
  impressoes: number;
  posicao: number;
}

export interface GscPagina {
  url: string;
  caminho: string;
  cliques: number;
  impressoes: number;
  posicaoMedia: number | null;
  consultas: GscConsulta[];
}

export interface GscInspecao {
  caminho: string;
  veredito: string;
  cobertura?: string | null;
  robots?: string | null;
  busca?: string | null;
  canonicoGoogle?: string | null;
  canonicoDeclarado?: string | null;
  ultimoRastreio?: string | null;
  erro?: string;
}

export interface GscSitemap {
  path: string;
  ultimoEnvio: string | null;
  ultimoDownload: string | null;
  erros: number;
  avisos: number;
  urlsEnviadas: number;
  pendente: boolean;
}

export interface GscSnapshot {
  status: "ok" | "indisponivel";
  motivo?: string;
  geradoEm: string | null;
  propriedade: { siteUrl: string; dominio: string } | null;
  periodo: { inicio: string; fim: string } | null;
  totais: { cliques: number; impressoes: number; ctr: number; posicao: number | null } | null;
  paginas: GscPagina[];
  inspecoes: GscInspecao[];
  sitemaps: GscSitemap[];
  limitacoes?: string;
}

export const gscSnapshot = snapshotJson as unknown as GscSnapshot;

export const gscDisponivel = gscSnapshot.status === "ok" && gscSnapshot.paginas.length > 0;

function normalizar(caminho: string): string {
  if (!caminho) return "/";
  const semDominio = caminho.startsWith("http") ? new URL(caminho).pathname : caminho;
  const limpo = semDominio.split("?")[0].split("#")[0];
  return limpo.length > 1 ? limpo.replace(/\/+$/, "") : "/";
}

const porCaminho = new Map<string, GscPagina>();
for (const p of gscSnapshot.paginas) porCaminho.set(normalizar(p.caminho), p);

const inspecaoPorCaminho = new Map<string, GscInspecao>();
for (const i of gscSnapshot.inspecoes) inspecaoPorCaminho.set(normalizar(i.caminho), i);

/** Desempenho real (28 dias) de uma URL, ou null quando o Google não reportou linhas. */
export function desempenhoDaUrl(caminho: string): GscPagina | null {
  return porCaminho.get(normalizar(caminho)) ?? null;
}

/** Inspeção de indexação da URL, quando ela foi inspecionada no último snapshot. */
export function inspecaoDaUrl(caminho: string): GscInspecao | null {
  return inspecaoPorCaminho.get(normalizar(caminho)) ?? null;
}

export type StatusIndexacao = "indexada" | "desconhecida" | "com-impressoes" | "sem-dados";

/**
 * Classificação conservadora:
 * - `indexada`: inspeção com veredito PASS;
 * - `desconhecida`: inspeção indica que o Google não conhece a URL;
 * - `com-impressoes`: sem inspeção, mas com impressões reais (logo, está no índice);
 * - `sem-dados`: nada reportado no período (não prova ausência de indexação).
 */
export function statusIndexacao(caminho: string): StatusIndexacao {
  const insp = inspecaoDaUrl(caminho);
  if (insp?.veredito === "PASS") return "indexada";
  if (insp && insp.cobertura?.toLowerCase().includes("unknown")) return "desconhecida";
  const perf = desempenhoDaUrl(caminho);
  if (perf && perf.impressoes > 0) return "com-impressoes";
  return "sem-dados";
}

export const ROTULO_INDEXACAO: Record<StatusIndexacao, string> = {
  indexada: "Indexada (inspeção)",
  desconhecida: "Desconhecida pelo Google",
  "com-impressoes": "Aparece na busca",
  "sem-dados": "Sem dados no período",
};

/** Páginas ordenadas por impressões, para rankings do admin. */
export function topPaginas(limite = 20): GscPagina[] {
  return gscSnapshot.paginas.slice(0, limite);
}
