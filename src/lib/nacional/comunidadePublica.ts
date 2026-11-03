/**
 * Dados PÚBLICOS, agregados e sem PII da comunidade profissional.
 * Inserir uma região apenas depois de conferir evidência em prints/conversas.
 * DDD = área de numeração, NÃO cidade atual, cadastro aprovado ou agenda aberta.
 * Não armazenar nome, número completo, mensagem ou imagem do grupo neste arquivo.
 */
export type RegiaoComunidade = {
  ddd: string;
  uf: string;
  estado: string;
  cidadeReferencia: string;
  latitude: number;
  longitude: number;
  /** Data de conferência do DDD em evidência privada, nunca URL da prova. */
  revisadoEm: string;
};

// Populado somente após análise dos anexos do responsável.
// Lista vazia é intencional: impede inventar cobertura antes das provas.
export const REGIOES_COMUNIDADE: readonly RegiaoComunidade[] = [];

export const COMUNIDADE_RESUMO = {
  membrosInformadosMaisDe: 400,
  atualizadoEm: "03/11/2026",
  grupoWhatsApp: "https://chat.whatsapp.com/KUki7iAKg2f5ahsGfn4Su5",
} as const;

export const normalizarRegiao = (value?: string) =>
  (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/^br-/, "");

const SIGLAS: Record<string, string> = {
  acre: "ac", alagoas: "al", amapa: "ap", amazonas: "am",
  bahia: "ba", ceara: "ce", "distrito federal": "df",
  "espirito santo": "es", goias: "go", maranhao: "ma",
  "mato grosso": "mt", "mato grosso do sul": "ms",
  "minas gerais": "mg", para: "pa", paraiba: "pb",
  parana: "pr", pernambuco: "pe", piaui: "pi",
  "rio de janeiro": "rj", "rio grande do norte": "rn",
  "rio grande do sul": "rs", rondonia: "ro", roraima: "rr",
  "santa catarina": "sc", "sao paulo": "sp",
  sergipe: "se", tocantins: "to",
};

export function ufDaRegiao(region?: string): string | null {
  const normalized = normalizarRegiao(region);
  if (/^[a-z]{2}$/.test(normalized)) return normalized.toUpperCase();
  return SIGLAS[normalized]?.toUpperCase() ?? null;
}

/** Prova somente indício de membro por UF/DDD, jamais disponibilidade. */
export function regioesPorUf(region?: string): RegiaoComunidade[] {
  const uf = ufDaRegiao(region);
  if (!uf) return [];
  return REGIOES_COMUNIDADE.filter((r) => r.uf === uf);
}

/** Um DDD só deve aparecer uma vez, mesmo com múltiplos prints do mesmo grupo. */
export function regioesPublicaveis(): RegiaoComunidade[] {
  const seen = new Set<string>();
  return REGIOES_COMUNIDADE.filter((r) => {
    const key = r.ddd;
    if (!/^\d{2}$/.test(key) || seen.has(key) || !/^[A-Z]{2}$/.test(r.uf)) return false;
    if (!Number.isFinite(r.latitude) || !Number.isFinite(r.longitude)) return false;
    seen.add(key);
    return true;
  });
}
