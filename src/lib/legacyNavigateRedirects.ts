/** Aliases legados que exigem redirecionamento interno no roteador.
 * Extraídos do catálogo de páginas para não forçar seu carregamento no shell.
 * Reexportados por legacyRouteElements para manter os consumidores existentes.
 */
export const legacyNavigateRedirects: Record<string, string> = {
  "/patrocinadores": "/anuncie",
  "/admin": "/admin/funnel",
  "/index": "/",
};
