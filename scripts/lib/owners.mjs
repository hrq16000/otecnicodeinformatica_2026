/**
 * Resolvedor de owners por rodada de enriquecimento.
 *
 * Uso: `--rodada=4a`, `--rodada=4b` ou `--rodada=todos` (padrão nos relatórios
 * de indexação, para observar o acervo completo sem perder a 4A de vista).
 */
import { OWNERS_4A } from "./owners-4a.mjs";
import { OWNERS_4B } from "./owners-4b.mjs";

export const OWNERS_POR_RODADA = {
  "4a": OWNERS_4A,
  "4b": OWNERS_4B,
  todos: [...OWNERS_4A, ...OWNERS_4B],
};

/** Lê `--rodada=` do argv (ou usa o padrão) e devolve { rodada, owners }. */
export function resolverOwners(argv = process.argv, padrao = "todos") {
  const bruto = (argv.find((a) => a.startsWith("--rodada=")) ?? `--rodada=${padrao}`)
    .split("=")[1]
    .toLowerCase();
  const owners = OWNERS_POR_RODADA[bruto];
  if (!owners) {
    throw new Error(`rodada desconhecida: ${bruto} (use 4a, 4b ou todos)`);
  }
  return { rodada: bruto, owners };
}
