/**
 * Micro-Rodada Enriquecimento 1 — blocos opcionais de aprofundamento técnico.
 *
 * Estes campos são OPCIONAIS e não alteram intenção, canonical, robots nem
 * indexabilidade de nenhuma página. Servem para páginas já existentes que
 * estavam superficiais ganharem resposta direta, tabela diagnóstica e blocos
 * de decisão — sem criar URLs novas e sem template idêntico entre irmãs
 * (cada página escolhe quais blocos usa e com que títulos).
 */

/** Linha de uma tabela diagnóstica: sintoma → causa provável → o que verificar. */
export type LinhaDiagnostica = {
  sintoma: string;
  causa: string;
  verificar: string;
  /** Coluna opcional de decisão (Enriquecimento 4A): o que fazer a seguir. */
  acao?: string;
};

export type TabelaDiagnostica = {
  /** Título do H2 da tabela — varia por página, propositalmente. */
  titulo: string;
  /** Rótulos próprios das colunas; caem no padrão quando ausentes. */
  colunas?: { sintoma?: string; causa?: string; verificar?: string; acao?: string };
  linhas: LinhaDiagnostica[];
};

/** Frase de continuidade com um único link contextual, ao fim de um bloco. */
export type FechoContextual = {
  antes: string;
  to: string;
  anchor: string;
  depois: string;
};

/** Bloco livre (decisão, comparação, urgência, glossário, expectativa real). */
export type BlocoTecnico = {
  id: string;
  titulo: string;
  /** Parágrafo curto de contexto, opcional. */
  intro?: string;
  itens: { titulo: string; desc: string }[];
  /** Link interno contextual em texto corrido — não é bloco de "veja também". */
  fecho?: FechoContextual;
};

/** Fonte primária citada de forma visível (fabricante, órgão técnico). */
export type FontePrimaria = { titulo: string; url: string; nota?: string };

/** Conjunto de campos de enriquecimento compartilhado pelos três clusters. */
export type EnriquecimentoConteudo = {
  /** Resposta direta e curta logo abaixo do H1. */
  respostaRapida?: string;
  tabelaDiagnostica?: TabelaDiagnostica;
  blocos?: BlocoTecnico[];
  /** Tabela adicional (Enriquecimento 4A) sem substituir a existente. */
  tabelaExtra?: TabelaDiagnostica;
  fontes?: FontePrimaria[];
};

