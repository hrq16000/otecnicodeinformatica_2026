import { createFileRoute, notFound } from "@tanstack/react-router";
import ProcedimentoDetalhe from "@/pages/ProcedimentoDetalhe";
import { PROCEDIMENTOS } from "@/pages/ProcedimentosPlaca";
import { SITE_BASE_URL } from "@/lib/siteConfig";
import { metaSocial } from "@/lib/socialMeta";

export const Route = createFileRoute("/procedimentos_/$slug")({
  component: ProcedimentoDetalhe,
  loader: ({ params }) => {
    if (!PROCEDIMENTOS.some((p) => p.slug === params.slug)) throw notFound();
    return null;
  },
  head: ({ params }) => {
    const item = PROCEDIMENTOS.find((p) => p.slug === params.slug);
    if (!item) return { meta: [{ name: "robots", content: "noindex, follow" }] };
    const canonicalUrl = `${SITE_BASE_URL}/procedimentos/${params.slug}`;
    return {
      meta: [
        ...metaSocial({
          titulo: `${item.title}: indicações e avaliação técnica`,
          descricao: `${item.title} em placas eletrônicas: entenda quando avaliar esta técnica, quais sinais observar e por que o diagnóstico deve preceder qualquer intervenção.`,
          url: canonicalUrl,
          imagem: `${SITE_BASE_URL}/og-image.png`,
          sufixoMarca: "O Técnico de Informática",
        }),
        // Esta rota recebeu seu próprio conteúdo SSR, mas permanece noindex
        // até aprovação editorial verificável, sem index-on automático.
        { name: "robots", content: "noindex, follow" },
        { name: "googlebot", content: "noindex, follow" },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
    };
  },
});
