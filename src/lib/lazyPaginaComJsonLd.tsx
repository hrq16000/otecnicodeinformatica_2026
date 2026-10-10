import { lazy, type ComponentType } from "react";
import { JsonLdSsrSink } from "@/lib/jsonLdSsr";

/** Equivalente à composição de lazyPagina em legacyRouteElements, sem importar
 * o registro de centenas de rotas nas páginas comerciais prioritárias.
 * O sink fica no mesmo segmento resolvido da página, inclusive em SSR frio.
 */
export const lazyPaginaComJsonLd = (
  carregar: () => Promise<{ default: ComponentType<any> }>,
) => lazy(() => carregar().then(({ default: Pagina }) => {
  const PaginaComJsonLd = (props: any) => (
    <>
      <Pagina {...props} />
      <JsonLdSsrSink />
    </>
  );
  PaginaComJsonLd.displayName = `comSinkDeJsonLd(${Pagina.displayName ?? Pagina.name ?? "Pagina"})`;
  return { default: PaginaComJsonLd };
}));
