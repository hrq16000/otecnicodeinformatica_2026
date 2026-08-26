// ─────────────────────────────────────────────────────────────
// REGISTRY DE PROVENIÊNCIA E LICENCIAMENTO DE ASSETS EDITORIAIS
// Onda 10C · Infra 2 — Parte C.
//
// Fonte única de "de onde veio esta imagem e sob qual licença". NÃO duplica
// dado: deriva do que já é declarado em
//   • src/lib/blogEditorialCovers.ts        (caminho, alt, dimensões);
//   • src/lib/blogEditorialRegistry.ts      (origem, licença, atribuição);
//   • src/lib/editorialWavesRegistry.ts     (onda, lote, owner).
//
// Fail-closed: atribuição que não puder ser interpretada vira sourceType
// UNKNOWN / license UNKNOWN — e o gate `npm run check:editorial-assets`
// bloqueia publicação editorial nova nesse estado.
//
// Hash real do arquivo, formatos derivados (webp/avif) e existência são
// resolvidos fora do runtime pelo gate, que grava
// public/editorial-assets-status.json (consumido por /admin/editorial-ondas).
// ─────────────────────────────────────────────────────────────

import { EDITORIAL_COVERS } from "@/lib/blogEditorialCovers";
import { getEditorialApproval } from "@/lib/blogEditorialRegistry";
import { EDITORIAL_WAVES, batchKey } from "@/lib/editorialWavesRegistry";

export type AssetSourceType =
  | "WIKIMEDIA"
  | "UNSPLASH"
  | "PEXELS"
  | "MANUFACTURER"
  | "OWNED"
  | "OTHER_LICENSED"
  | "UNKNOWN";

export interface EditorialAsset {
  /** Owner editorial (uma intenção = um owner). */
  owner: string;
  wave: string;
  batch: string;
  lote: string;
  slug: string;
  /** Caminho servido a partir de /public. */
  localPath: string;
  /** Página de origem do arquivo (não o CDN). */
  originalUrl: string | null;
  platform: string | null;
  title: string;
  author: string | null;
  license: string;
  licenseUrl: string | null;
  attributionRequired: boolean;
  attributionText: string | null;
  sourceType: AssetSourceType;
  width: number;
  height: number;
}

/** Mapa licença → URL canônica. Unsplash/Pexels NÃO são Creative Commons. */
const LICENSE_URLS: Record<string, string> = {
  "CC BY 2.0": "https://creativecommons.org/licenses/by/2.0/",
  "CC BY 3.0": "https://creativecommons.org/licenses/by/3.0/",
  "CC BY 4.0": "https://creativecommons.org/licenses/by/4.0/",
  "CC BY-SA 2.0": "https://creativecommons.org/licenses/by-sa/2.0/",
  "CC BY-SA 3.0": "https://creativecommons.org/licenses/by-sa/3.0/",
  "CC BY-SA 4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
  CC0: "https://creativecommons.org/publicdomain/zero/1.0/",
  "Public Domain": "https://creativecommons.org/publicdomain/mark/1.0/",
  "Licença Unsplash": "https://unsplash.com/license",
  "Licença Pexels": "https://www.pexels.com/license/",
};

/** Licenças que exigem crédito visível. */
const EXIGE_ATRIBUICAO = (licenca: string) => /^CC BY/i.test(licenca);

const SOURCE_POR_PLATAFORMA: Array<[RegExp, AssetSourceType]> = [
  [/wikimedia|wikipedia/i, "WIKIMEDIA"],
  [/unsplash/i, "UNSPLASH"],
  [/pexels/i, "PEXELS"],
  [/flickr/i, "OTHER_LICENSED"],
];

/** Interpreta "Foto: Autor (Plataforma), Licença — URL". */
function interpretarAtribuicao(texto: string | undefined) {
  if (!texto) return { author: null, platform: null, originalUrl: null };
  const author = texto.match(/Foto:\s*([^(,—]+)/)?.[1]?.trim() ?? null;
  const platform = texto.match(/\(([^)]+)\)/)?.[1]?.trim() ?? null;
  const originalUrl = texto.match(/https?:\/\/\S+/)?.[0] ?? null;
  return { author, platform, originalUrl };
}

function sourceTypeDe(origin: string | undefined, platform: string | null): AssetSourceType {
  if (origin === "owned") return "OWNED";
  for (const [re, tipo] of SOURCE_POR_PLATAFORMA) if (platform && re.test(platform)) return tipo;
  if (origin === "licensed") return "OTHER_LICENSED";
  return "UNKNOWN";
}

/** Assets declarados de todas as ondas do registry (sem hardcode de slug). */
export const EDITORIAL_ASSETS: EditorialAsset[] = EDITORIAL_WAVES.map((entrada) => {
  const cover = EDITORIAL_COVERS[entrada.slug];
  const aprovacao = getEditorialApproval(entrada.slug);
  const { author, platform, originalUrl } = interpretarAtribuicao(aprovacao?.imageAttribution);
  const license = aprovacao?.imageLicense ?? "UNKNOWN";
  const sourceType = sourceTypeDe(aprovacao?.imageOrigin, platform);

  return {
    owner: entrada.ownerId,
    wave: entrada.wave,
    batch: entrada.batch,
    lote: batchKey(entrada),
    slug: entrada.slug,
    localPath: cover?.src ?? `/blog/${entrada.slug}.jpg`,
    originalUrl,
    platform,
    title: cover?.alt ?? entrada.slug,
    author,
    license,
    licenseUrl: LICENSE_URLS[license] ?? null,
    attributionRequired: EXIGE_ATRIBUICAO(license),
    attributionText: aprovacao?.imageAttribution ?? null,
    sourceType,
    width: cover?.width ?? 0,
    height: cover?.height ?? 0,
  };
});

export const assetsPorOwner = (owner: string) =>
  EDITORIAL_ASSETS.filter((a) => a.owner === owner);

/** Caminhos locais declarados (para detectar asset usado sem registro). */
export const CAMINHOS_REGISTRADOS = new Set(EDITORIAL_ASSETS.map((a) => a.localPath));

export default EDITORIAL_ASSETS;
