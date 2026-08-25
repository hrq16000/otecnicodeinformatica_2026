/**
 * Fonte de verdade dos owners da Rodada 4A (cluster ATP → URL canônica).
 * Módulo puro: pode ser importado por smoke, relatórios e gates sem efeito colateral.
 */
export const OWNERS_4A = [
  { cluster: "A — superaquecimento / desliga sozinho", path: "/problemas/computador-esquentando" },
  { cluster: "B — SSD × HD", path: "/solucoes/ssd" },
  { cluster: "C — RAM ou SSD", path: "/servicos/upgrade-ssd-ram" },
  { cluster: "D — recuperar dados / HD com barulho", path: "/problemas/hd-fazendo-barulho" },
  { cluster: "E — formatar PC / Windows", path: "/servicos/formatacao" },
  { cluster: "F — vírus / malware", path: "/servicos/remocao-de-virus" },
];
