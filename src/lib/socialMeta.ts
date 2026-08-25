/**
 * Rodada 4F — geração automática e consistente de Open Graph / Twitter Cards.
 *
 * Uma única fonte decide `<title>`, `description`, `og:*` e `twitter:*`, de
 * modo que o HTML entregue pelo SSR e o head aplicado depois da hidratação
 * digam exatamente a mesma coisa. Antes disso, rotas montavam o título com
 * sufixo de marca mas passavam o título "cru" para o og:title — divergência
 * apontada pelo gate check:geo.
 *
 * As janelas seguem o mesmo contrato do gate:
 *   · title: 25–70 caracteres
 *   · description: 70–165 caracteres
 */

export const TITLE_MAX = 70;
export const DESCRIPTION_MAX = 165;

/** Corta no limite sem quebrar palavra e sem deixar pontuação órfã. */
export function encurtar(texto: string, limite: number): string {
  const limpo = texto.replace(/\s+/g, " ").trim();
  if (limpo.length <= limite) return limpo;
  const corte = limpo.slice(0, limite - 1);
  const espaco = corte.lastIndexOf(" ");
  return `${(espaco > limite * 0.6 ? corte.slice(0, espaco) : corte).replace(/[\s,;:.–-]+$/, "")}…`;
}

/**
 * Monta o título final: usa o sufixo de marca só quando ele cabe na janela,
 * caso contrário mantém o título da página (que já carrega o tema).
 */
export function tituloComMarca(titulo: string, sufixo: string): string {
  const completo = `${titulo} | ${sufixo}`;
  if (completo.length <= TITLE_MAX) return completo;
  return encurtar(titulo, TITLE_MAX);
}

export interface MetaSocialEntrada {
  titulo: string;
  descricao: string;
  url: string;
  imagem: string;
  /** "article" em posts editoriais, "website" no resto. */
  tipo?: "website" | "article";
  siteName?: string;
  sufixoMarca?: string;
}

export interface MetaTag {
  [chave: string]: string;
}

/**
 * Devolve o array de meta tags pronto para o `head()` da rota, com título,
 * description, Open Graph e Twitter Card sempre coerentes entre si.
 */
export function metaSocial({
  titulo,
  descricao,
  url,
  imagem,
  tipo = "website",
  siteName = "O Técnico de Informática",
  sufixoMarca = siteName,
}: MetaSocialEntrada): MetaTag[] {
  const tituloFinal = tituloComMarca(titulo, sufixoMarca);
  const descricaoFinal = encurtar(descricao, DESCRIPTION_MAX);

  return [
    { title: tituloFinal },
    { name: "description", content: descricaoFinal },
    { property: "og:type", content: tipo },
    { property: "og:title", content: tituloFinal },
    { property: "og:description", content: descricaoFinal },
    { property: "og:url", content: url },
    { property: "og:site_name", content: siteName },
    { property: "og:locale", content: "pt_BR" },
    { property: "og:image", content: imagem },
    { property: "og:image:secure_url", content: imagem },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: tituloFinal },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: tituloFinal },
    { name: "twitter:description", content: descricaoFinal },
    { name: "twitter:image", content: imagem },
    { name: "twitter:image:alt", content: tituloFinal },
  ];
}
