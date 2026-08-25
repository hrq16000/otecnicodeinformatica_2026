/**
 * GATE — determinismo estrutural do JSON-LD em SSR (P0 SSR_JSONLD_INTERMITENTE).
 *
 * Causa raiz corrigida: as páginas legadas são `React.lazy`. Em isolate frio o
 * chunk não está no cache de módulos, o subtree suspende e o React (Fizz) segue
 * renderizando os IRMÃOS, adiando a página para outra tarefa de stream. Um sink
 * de JSON-LD irmão — no `__root` ou ao lado da página — era emitido antes de a
 * rota registrar seus slots: o HTML saía só com Organization + WebSite. Em
 * isolate quente nada suspendia e o mesmo commit servia o conjunto completo.
 * A correção compõe o sink DENTRO do módulo resolvido da página
 * (`comSinkDeJsonLd` em src/legacyRouteElements.tsx).
 *
 * Este gate reexecuta o cenário frio: N renders, cada um em processo Node novo.
 * FALHA se qualquer rota apresentar mais de uma variante de conjunto JSON-LD
 * ou ficar abaixo do mínimo esperado de blocos.
 *
 * Fail-closed: sem `dist/server/index.mjs`, o gate falha (não "passa vazio").
 *
 * Uso: npm run check:jsonld-ssr   (requer build prévio)
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { existsSync } from "node:fs";

const run = promisify(execFile);

/** Rotas-amostra: uma por família de renderização (home estática, problema,
 *  serviço, editorial fora do mapa legado, bairro local). */
const ROTAS = [
  { url: "/", minBlocos: 5 },
  { url: "/problemas/computador-lento", minBlocos: 4 },
  { url: "/servicos/upgrade-ssd-ram", minBlocos: 5 },
  { url: "/blog/como-resolver-tela-azul-windows", minBlocos: 5 },
  { url: "/bairros/boqueirao", minBlocos: 4 },
];

const N = Number(process.env.N ?? 12);
const CONCORRENCIA = 6;

if (!existsSync("dist/server/index.mjs")) {
  console.error("[check:jsonld-ssr] FALHA fail-closed: dist/server/index.mjs ausente. Rode o build antes.");
  process.exit(1);
}

let falhou = false;

for (const { url, minBlocos } of ROTAS) {
  const resultados = [];
  for (let i = 0; i < N; i += CONCORRENCIA) {
    const lote = Array.from({ length: Math.min(CONCORRENCIA, N - i) }, () =>
      run("node", ["scripts/p0/render-jsonld-once.mjs", url], { maxBuffer: 1e8 })
        .then((r) => JSON.parse(r.stdout))
        .catch((e) => ({ erro: String(e).slice(0, 200) })),
    );
    resultados.push(...(await Promise.all(lote)));
  }

  const erros = resultados.filter((r) => r.erro);
  const variantes = new Set(resultados.map((r) => r.fp ?? "ERRO"));
  const contagens = resultados.map((r) => r.count ?? -1);
  const min = Math.min(...contagens);
  const max = Math.max(...contagens);

  const ok = erros.length === 0 && variantes.size === 1 && min >= minBlocos;
  if (!ok) falhou = true;

  console.log(
    `${ok ? "OK  " : "FALHA"} ${url} | runs=${resultados.length} | variantes=${variantes.size} | blocos=${min}..${max} (min exigido ${minBlocos})${erros.length ? ` | erros=${erros.length}: ${erros[0].erro}` : ""}`,
  );
}

if (falhou) {
  console.error(
    "\n[check:jsonld-ssr] FALHA: JSON-LD não determinístico em isolate frio.\n" +
      "Provável regressão: algum sink de JSON-LD voltou a ser irmão de um ponto de suspensão\n" +
      "(React.lazy) em vez de ser composto dentro do módulo da página. Ver comentário em\n" +
      "src/legacyRouteElements.tsx.",
  );
  process.exit(1);
}

console.log("\n[check:jsonld-ssr] OK: JSON-LD estruturalmente determinístico em isolates frios.");
