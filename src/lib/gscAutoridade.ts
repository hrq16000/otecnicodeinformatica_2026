/**
 * AUTORIDADE REAL POR URL E POR TERMO — comparação com o baseline.
 *
 * Fonte A: `src/data/gscSnapshot.json` (período corrente, dados reais do
 * Search Console). Fonte B: `src/data/gscBaseline.json` (marco congelado).
 *
 * Fail-closed: sem snapshot `ok`, tudo retorna vazio e a tela mostra
 * "sem dados" — nenhum número é estimado, projetado ou inventado.
 */
import baselineJson from "@/data/gscBaseline.json";
import { gscDisponivel, gscSnapshot, type GscPagina } from "@/lib/gscSnapshot";

interface BaselinePagina {
  url: string;
  cliques: number;
  impressoes: number;
  posicao: number | null;
}
interface BaselineConsulta {
  termo: string;
  cliques: number;
  impressoes: number;
  posicao: number;
}
interface Baseline {
  congeladoEm: string;
  periodo: { inicio: string; fim: string } | null;
  totais: { cliques: number; impressoes: number; posicao: number | null } | null;
  paginas: BaselinePagina[];
  consultasTop: BaselineConsulta[];
}

export const gscBaseline = baselineJson as unknown as Baseline;

const caminhoDe = (url: string): string => {
  try {
    const p = url.startsWith("http") ? new URL(url).pathname : url;
    const limpo = p.split("?")[0].split("#")[0];
    return limpo.length > 1 ? limpo.replace(/\/+$/, "") : "/";
  } catch {
    return url;
  }
};

const posicaoPonderada = (p: GscPagina): number | null => {
  const total = p.consultas.reduce((a, c) => a + c.impressoes, 0);
  if (!total) return null;
  return Number((p.consultas.reduce((a, c) => a + c.posicao * c.impressoes, 0) / total).toFixed(1));
};

export interface AutoridadeUrl {
  caminho: string;
  impressoes: number;
  cliques: number;
  posicao: number | null;
  /** Marco anterior; `null` quando a URL não aparecia no baseline. */
  baseImpressoes: number | null;
  baseCliques: number | null;
  basePosicao: number | null;
  deltaImpressoes: number | null;
  /** Posição menor é melhor: delta negativo = subiu. */
  deltaPosicao: number | null;
  novidade: boolean;
  consultaPrincipal: string | null;
}

/** Autoridade real por URL, ordenada por impressões no período corrente. */
export function autoridadePorUrl(): AutoridadeUrl[] {
  if (!gscDisponivel) return [];
  const base = new Map(gscBaseline.paginas.map((p) => [caminhoDe(p.url), p]));
  return gscSnapshot.paginas
    .map((p) => {
      const caminho = caminhoDe(p.url ?? p.caminho);
      const b = base.get(caminho) ?? null;
      const posicao = posicaoPonderada(p);
      const principal = [...p.consultas].sort((a, c) => c.impressoes - a.impressoes)[0] ?? null;
      return {
        caminho,
        impressoes: p.impressoes,
        cliques: p.cliques,
        posicao,
        baseImpressoes: b?.impressoes ?? null,
        baseCliques: b?.cliques ?? null,
        basePosicao: b?.posicao ?? null,
        deltaImpressoes: b ? p.impressoes - b.impressoes : null,
        deltaPosicao: b && b.posicao !== null && posicao !== null ? Number((posicao - b.posicao).toFixed(1)) : null,
        novidade: !b,
        consultaPrincipal: principal?.termo ?? null,
      };
    })
    .sort((a, b) => b.impressoes - a.impressoes);
}

export interface AutoridadeTermo {
  termo: string;
  impressoes: number;
  cliques: number;
  posicao: number;
  baseImpressoes: number | null;
  basePosicao: number | null;
  deltaImpressoes: number | null;
  deltaPosicao: number | null;
  novidade: boolean;
  /** URL do portal que mais aparece para o termo (link para conferência). */
  caminho: string | null;
}

/** Autoridade real por termo buscado, com a página correspondente. */
export function autoridadePorTermo(limite = 40): AutoridadeTermo[] {
  if (!gscDisponivel) return [];
  const base = new Map(gscBaseline.consultasTop.map((c) => [c.termo, c]));

  // Melhor página por termo: a com mais impressões para aquele termo.
  const melhorPagina = new Map<string, { caminho: string; impressoes: number }>();
  for (const p of gscSnapshot.paginas) {
    const caminho = caminhoDe(p.url ?? p.caminho);
    for (const c of p.consultas) {
      const atual = melhorPagina.get(c.termo);
      if (!atual || c.impressoes > atual.impressoes) melhorPagina.set(c.termo, { caminho, impressoes: c.impressoes });
    }
  }

  return (gscSnapshot.consultasTop ?? [])
    .map((c) => {
      const b = base.get(c.termo) ?? null;
      return {
        termo: c.termo,
        impressoes: c.impressoes,
        cliques: c.cliques,
        posicao: c.posicao,
        baseImpressoes: b?.impressoes ?? null,
        basePosicao: b?.posicao ?? null,
        deltaImpressoes: b ? c.impressoes - b.impressoes : null,
        deltaPosicao: b ? Number((c.posicao - b.posicao).toFixed(1)) : null,
        novidade: !b,
        caminho: melhorPagina.get(c.termo)?.caminho ?? null,
      };
    })
    .sort((a, b) => b.impressoes - a.impressoes)
    .slice(0, limite);
}

export interface ResumoAutoridade {
  disponivel: boolean;
  periodo: { inicio: string; fim: string } | null;
  basePeriodo: { inicio: string; fim: string } | null;
  impressoes: number;
  baseImpressoes: number;
  cliques: number;
  baseCliques: number;
  urlsComDados: number;
  urlsNovas: number;
  urlsEmAlta: number;
  urlsEmQueda: number;
  termosNovos: number;
}

export function resumoAutoridade(): ResumoAutoridade {
  const urls = autoridadePorUrl();
  const termos = autoridadePorTermo(1000);
  return {
    disponivel: gscDisponivel,
    periodo: gscSnapshot.periodo,
    basePeriodo: gscBaseline.periodo,
    impressoes: gscSnapshot.totais?.impressoes ?? 0,
    baseImpressoes: gscBaseline.totais?.impressoes ?? 0,
    cliques: gscSnapshot.totais?.cliques ?? 0,
    baseCliques: gscBaseline.totais?.cliques ?? 0,
    urlsComDados: urls.length,
    urlsNovas: urls.filter((u) => u.novidade).length,
    urlsEmAlta: urls.filter((u) => (u.deltaImpressoes ?? 0) > 0).length,
    urlsEmQueda: urls.filter((u) => (u.deltaImpressoes ?? 0) < 0).length,
    termosNovos: termos.filter((t) => t.novidade).length,
  };
}
