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

/**
 * DDDs observados nas 9 capturas encaminhadas em 03/11/2026.
 * Cada cidade é um POLO DE REFERÊNCIA da área DDD, nunca domicílio de membro.
 * O lote é deduplicado por DDD, não mede profissionais disponíveis.
 */
const DDD_CAPTURAS_20261103: readonly (readonly [string, string, string, string, number, number])[] = [
  [
    "11",
    "SP",
    "São Paulo",
    "São Paulo",
    -23.5505,
    -46.6333
  ],
  [
    "12",
    "SP",
    "São Paulo",
    "São José dos Campos",
    -23.1896,
    -45.8841
  ],
  [
    "13",
    "SP",
    "São Paulo",
    "Santos",
    -23.9608,
    -46.3336
  ],
  [
    "14",
    "SP",
    "São Paulo",
    "Bauru",
    -22.3246,
    -49.0871
  ],
  [
    "16",
    "SP",
    "São Paulo",
    "Ribeirão Preto",
    -21.1704,
    -47.8103
  ],
  [
    "17",
    "SP",
    "São Paulo",
    "São José do Rio Preto",
    -20.8197,
    -49.3794
  ],
  [
    "18",
    "SP",
    "São Paulo",
    "Presidente Prudente",
    -22.1256,
    -51.3889
  ],
  [
    "21",
    "RJ",
    "Rio de Janeiro",
    "Rio de Janeiro",
    -22.9068,
    -43.1729
  ],
  [
    "22",
    "RJ",
    "Rio de Janeiro",
    "Campos dos Goytacazes",
    -21.761,
    -41.318
  ],
  [
    "27",
    "ES",
    "Espírito Santo",
    "Vitória",
    -20.3155,
    -40.3128
  ],
  [
    "31",
    "MG",
    "Minas Gerais",
    "Belo Horizonte",
    -19.9167,
    -43.9345
  ],
  [
    "33",
    "MG",
    "Minas Gerais",
    "Governador Valadares",
    -18.855,
    -41.955
  ],
  [
    "34",
    "MG",
    "Minas Gerais",
    "Uberlândia",
    -18.9186,
    -48.2772
  ],
  [
    "35",
    "MG",
    "Minas Gerais",
    "Poços de Caldas",
    -21.787,
    -46.562
  ],
  [
    "37",
    "MG",
    "Minas Gerais",
    "Divinópolis",
    -20.1435,
    -44.891
  ],
  [
    "41",
    "PR",
    "Paraná",
    "Curitiba",
    -25.4284,
    -49.2733
  ],
  [
    "42",
    "PR",
    "Paraná",
    "Ponta Grossa",
    -25.095,
    -50.1619
  ],
  [
    "47",
    "SC",
    "Santa Catarina",
    "Joinville",
    -26.3044,
    -48.8464
  ],
  [
    "48",
    "SC",
    "Santa Catarina",
    "Florianópolis",
    -27.5954,
    -48.548
  ],
  [
    "51",
    "RS",
    "Rio Grande do Sul",
    "Porto Alegre",
    -30.0346,
    -51.2177
  ],
  [
    "61",
    "DF",
    "Distrito Federal",
    "Brasília",
    -15.7939,
    -47.8828
  ],
  [
    "62",
    "GO",
    "Goiás",
    "Goiânia",
    -16.6869,
    -49.2648
  ],
  [
    "66",
    "MT",
    "Mato Grosso",
    "Rondonópolis",
    -16.47,
    -54.635
  ],
  [
    "71",
    "BA",
    "Bahia",
    "Salvador",
    -12.9714,
    -38.5014
  ],
  [
    "73",
    "BA",
    "Bahia",
    "Ilhéus",
    -14.7889,
    -39.0489
  ],
  [
    "75",
    "BA",
    "Bahia",
    "Feira de Santana",
    -12.266,
    -38.9663
  ],
  [
    "77",
    "BA",
    "Bahia",
    "Vitória da Conquista",
    -14.8619,
    -40.844
  ],
  [
    "81",
    "PE",
    "Pernambuco",
    "Recife",
    -8.0476,
    -34.877
  ],
  [
    "84",
    "RN",
    "Rio Grande do Norte",
    "Natal",
    -5.7945,
    -35.211
  ],
  [
    "85",
    "CE",
    "Ceará",
    "Fortaleza",
    -3.7319,
    -38.5267
  ],
  [
    "88",
    "CE",
    "Ceará",
    "Juazeiro do Norte",
    -7.2131,
    -39.3153
  ],
  [
    "89",
    "PI",
    "Piauí",
    "Picos",
    -7.076,
    -41.467
  ],
  [
    "91",
    "PA",
    "Pará",
    "Belém",
    -1.4558,
    -48.4902
  ],
  [
    "94",
    "PA",
    "Pará",
    "Marabá",
    -5.381,
    -49.132
  ],
  [
    "98",
    "MA",
    "Maranhão",
    "São Luís",
    -2.5297,
    -44.3028
  ]
];

export const REGIOES_COMUNIDADE: readonly RegiaoComunidade[] = DDD_CAPTURAS_20261103.map(
  ([ddd, uf, estado, cidadeReferencia, latitude, longitude]) => ({
    ddd, uf, estado, cidadeReferencia, latitude, longitude, revisadoEm: "03/11/2026",
  }),
);

/**
 * DDDs adicionais encontrados no ZIP de conversas (até 03/11/2026).
 * O histórico inclui solicitações de entrada: isto NÃO comprova participação
 * efetiva, cadastro, validação, localização nem disponibilidade.
 * Exibir apenas em seção de HISTÓRICO, nunca como cobertura ou prova social.
 */
export const DDD_SOMENTE_HISTORICO: readonly {
  ddd: string;
  uf: string;
  poloReferencia: string;
}[] = [
  {
    "ddd": "15",
    "uf": "SP",
    "poloReferencia": "Sorocaba"
  },
  {
    "ddd": "19",
    "uf": "SP",
    "poloReferencia": "Campinas"
  },
  {
    "ddd": "24",
    "uf": "RJ",
    "poloReferencia": "Volta Redonda"
  },
  {
    "ddd": "28",
    "uf": "ES",
    "poloReferencia": "Cachoeiro de Itapemirim"
  },
  {
    "ddd": "32",
    "uf": "MG",
    "poloReferencia": "Juiz de Fora"
  },
  {
    "ddd": "44",
    "uf": "PR",
    "poloReferencia": "Maringá"
  },
  {
    "ddd": "45",
    "uf": "PR",
    "poloReferencia": "Cascavel"
  },
  {
    "ddd": "54",
    "uf": "RS",
    "poloReferencia": "Caxias do Sul"
  },
  {
    "ddd": "55",
    "uf": "RS",
    "poloReferencia": "Santa Maria"
  },
  {
    "ddd": "63",
    "uf": "TO",
    "poloReferencia": "Palmas"
  },
  {
    "ddd": "65",
    "uf": "MT",
    "poloReferencia": "Cuiabá"
  },
  {
    "ddd": "67",
    "uf": "MS",
    "poloReferencia": "Campo Grande"
  },
  {
    "ddd": "69",
    "uf": "RO",
    "poloReferencia": "Porto Velho"
  },
  {
    "ddd": "79",
    "uf": "SE",
    "poloReferencia": "Aracaju"
  },
  {
    "ddd": "86",
    "uf": "PI",
    "poloReferencia": "Teresina"
  },
  {
    "ddd": "87",
    "uf": "PE",
    "poloReferencia": "Petrolina"
  },
  {
    "ddd": "92",
    "uf": "AM",
    "poloReferencia": "Manaus"
  }
];

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
