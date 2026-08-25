import { createFileRoute } from "@tanstack/react-router";
import BlogPostPage from "@/pages/BlogPost";
import { JsonLdSsrSink } from "@/lib/jsonLdSsr";
import { SITE_BASE_URL } from "@/lib/siteConfig";
import { isEditorialApproved } from "@/lib/blogEditorialRegistry";
import { withOgVersion } from "@/lib/ogCacheBust";

/**
 * Única rota que não passa pelo mapa de `legacyRouteElements`, portanto compõe
 * o sink de JSON-LD explicitamente. O sink precisa ser irmão da página DENTRO
 * do componente da rota (nunca no `__root`): o subtree da rota pode suspender
 * em isolate frio e o React emitiria o sink antes de os slots serem
 * registrados. Ver a explicação completa em src/legacyRouteElements.tsx.
 */
function BlogPost() {
  return (
    <>
      <BlogPostPage />
      <JsonLdSsrSink />
    </>
  );
}

export const Route = createFileRoute("/blog_/$slug")({
  component: BlogPost,
  loader: async ({ params }) => {
    const [{ blogPostsContentBase }, { programmaticPosts }] = await Promise.all([
      import("@/data/blogPostsContent"),
      import("@/data/blogProgrammaticPosts"),
    ]);
    const posts = { ...blogPostsContentBase, ...programmaticPosts };
    const post = posts[params.slug] ?? null;
    if (!post) return { post: null };
    return {
      post: {
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        category: post.category,
      },
    };
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    if (!post) return {};

    const slug = params.slug;
    const approved = isEditorialApproved(slug);
    const canonicalUrl = `${SITE_BASE_URL}/blog/${slug}`;
    const heroImage = `${SITE_BASE_URL}/og-image.png`;
    const heroImageOg = withOgVersion(heroImage);

    // Rodada 4F: título, description, OG e Twitter saem todos de metaSocial(),
    // garantindo que og:title nunca divirja do <title> renderizado no SSR.
    const meta: Array<Record<string, string>> = [
      ...metaSocial({
        titulo: post.title,
        descricao: post.excerpt,
        url: canonicalUrl,
        imagem: heroImageOg,
        tipo: approved ? "article" : "website",
        sufixoMarca: "Blog | O Técnico de Informática",
      }),
      {
        name: "robots",
        content: approved
          ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
          : "noindex, follow",
      },
      {
        name: "googlebot",
        content: approved
          ? "index, follow, max-image-preview:large, max-snippet:-1"
          : "noindex, follow",
      },
    ];


    if (approved) {
      meta.push(
        { property: "article:published_time", content: `${post.date}T08:00:00-03:00` },
        { property: "article:section", content: post.category },
        { property: "article:tag", content: post.category },
        { property: "article:author", content: "O Técnico de Informática" },
        { property: "article:publisher", content: SITE_BASE_URL }
      );
    }

    return {
      meta,
      links: [{ rel: "canonical", href: canonicalUrl }],
    };
  },
});
