import { createFileRoute, notFound } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

/**
 * Uma definição do TanStack para todos os bairros com implementação curada.
 * Mantém o componente, o conteúdo, PageSEO, canonical e JsonLdSsrSink originais.
 * Os quatro aliases com 301 permanecem como arquivos de rota específicos.
 * Slugs desconhecidos devolvem 404 em SSR e no cliente, nunca soft-404.
 */
function BairroDinamico() {
  const { slug } = Route.useParams();
  const Page = legacyRouteElements[`/bairros/${slug}`];
  if (!Page) throw notFound();
  return <Page />;
}

export const Route = createFileRoute("/bairros_/$slug")({
  component: BairroDinamico,
});
