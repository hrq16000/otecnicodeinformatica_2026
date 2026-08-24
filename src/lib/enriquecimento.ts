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
};

export type TabelaDiagnostica = {
  /** Título do H2 da tabela — varia por página, propositalmente. */
  titulo: string;
  linhas: LinhaDiagnostica[];
};

/** Bloco livre (decisão, comparação, urgência, glossário, expectativa real). */
export type BlocoTecnico = {
  id: string;
  titulo: string;
  /** Parágrafo curto de contexto, opcional. */
  intro?: string;
  itens: { titulo: string; desc: string }[];
};

/** Conjunto de campos de enriquecimento compartilhado pelos três clusters. */
export type EnriquecimentoConteudo = {
  /** Resposta direta e curta logo abaixo do H1. */
  respostaRapida?: string;
  tabelaDiagnostica?: TabelaDiagnostica;
  blocos?: BlocoTecnico[];
};
