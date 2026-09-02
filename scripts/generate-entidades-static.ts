/**
 * Gera scripts/lib/entidades-static.mjs a partir de src/lib/entidades.ts.
 * O espelho alimenta o prerender pré-hidratação (crawlers sem JS).
 * Rode: bun scripts/generate-entidades-static.ts
 */
import { writeFileSync } from "node:fs";
import { ENTIDADES } from "../src/lib/entidades";

const TITLE_HUB = "Entidades Técnicas do Portal | Mapa de Conteúdo Conectado";
const DESC_HUB =
  "Windows, SSD, memória RAM, Wi-Fi, backup, erro 0xc0000428 e computador lento: cada entidade reúne definição, problemas, ferramentas, decisões, artigos e serviços.";

const metaDescription = (texto: string) => {
  if (texto.length <= 158) return texto;
  const corte = texto.slice(0, 155);
  return `${corte.slice(0, corte.lastIndexOf(" "))}…`;
};

const rotas = [
  {
    path: "/entidades",
    title: TITLE_HUB,
    description: DESC_HUB,
    h1: "Entidades técnicas do portal",
  },
  ...ENTIDADES.map((e) => ({
    path: `/entidades/${e.slug}`,
    title: `${e.nome}: mapa técnico completo | Entidades`,
    description: metaDescription(e.resumo),
    h1: e.nome,
  })),
];

const conteudo = `// GERADO por scripts/generate-entidades-static.ts — não editar à mão.
// Fonte de verdade: src/lib/entidades.ts
export const ENTIDADES_ROUTES = ${JSON.stringify(rotas, null, 2)};
`;

writeFileSync(new URL("./lib/entidades-static.mjs", import.meta.url), conteudo);
console.log(`entidades-static.mjs gerado com ${rotas.length} rotas.`);
