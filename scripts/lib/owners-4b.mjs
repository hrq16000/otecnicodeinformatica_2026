/**
 * Fonte de verdade dos owners da Rodada 4B (cluster ATP → URL canônica).
 * Módulo puro: pode ser importado por smoke, relatórios e gates sem efeito colateral.
 *
 * Nenhuma URL nova foi criada nesta rodada. O cluster F ("liga mas trava no
 * boot do Windows" com intenção de reinstalação por assistência) permanece
 * atendido pelo owner CONGELADO da 4A (/servicos/formatacao) e por isso não
 * aparece aqui — a 4B trata a decisão entre versões em /solucoes/formatacao.
 */
export const OWNERS_4B = [
  { cluster: "A — notebook/PC não liga", path: "/problemas/notebook-nao-liga" },
  { cluster: "B — liga mas não dá imagem", path: "/problemas/computador-nao-da-imagem" },
  { cluster: "C — lento / travando", path: "/problemas/computador-lento" },
  { cluster: "D — backup", path: "/solucoes/backup" },
  { cluster: "E — Windows 10 × Windows 11 / formatar", path: "/solucoes/formatacao" },
];

/** Owners congelados: enriquecidos na 4A e intocados nesta rodada. */
export const OWNERS_4A_FROZEN = [
  "/problemas/computador-esquentando",
  "/solucoes/ssd",
  "/servicos/upgrade-ssd-ram",
  "/problemas/hd-fazendo-barulho",
  "/servicos/formatacao",
  "/servicos/remocao-de-virus",
];
