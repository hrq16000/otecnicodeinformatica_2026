import { createFileRoute, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { absoluteUrl } from "@/lib/siteConfig";
import { obterPaginaEditorial } from "@/lib/paginasEditoriais.functions";

/**
 * Páginas por sintoma e solução criadas em /admin/paginas.
 * O conteúdo é carregado no servidor (SSR), com título, descrição e robots
 * próprios. Fail-closed: sem "indexável" marcado, a página fica fora das buscas.
 */
export const Route = createFileRoute("/guias/$slug")({
  loader: async ({ params }) => {
    const pagina = await obterPaginaEditorial({ data: { slug: params.slug } });
    if (!pagina) throw notFound();
    return { pagina };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Página indisponível" },
          { name: "robots", content: "noindex, follow" },
        ],
      };
    }
    const { pagina } = loaderData;
    const url = absoluteUrl(`/guias/${params.slug}`);
    return {
      meta: [
        { title: pagina.titulo },
        { name: "description", content: pagina.meta_description },
        {
          name: "robots",
          content: pagina.indexavel ? "index, follow" : "noindex, follow",
        },
        ...(pagina.palavras_chave?.length
          ? [{ name: "keywords", content: pagina.palavras_chave.join(", ") }]
          : []),
        { property: "og:type", content: "article" },
        { property: "og:title", content: pagina.titulo },
        { property: "og:description", content: pagina.meta_description },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: pagina.titulo },
        { name: "twitter:description", content: pagina.meta_description },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: PaginaAusente,
  errorComponent: PaginaAusente,
  component: PaginaIntencao,
});

function PaginaAusente() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-2xl">
        <h1 className="text-2xl font-bold mb-2">Conteúdo não encontrado</h1>
        <p className="text-muted-foreground">
          Esta página não existe ou ainda não foi publicada.
        </p>
      </main>
      <Footer />
    </div>
  );
}

/** Renderiza títulos (## ), itens (- ) e parágrafos do conteúdo autoral. */
function Corpo({ texto }: { texto: string }) {
  const blocos = texto.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return (
    <>
      {blocos.map((bloco, i) => {
        if (bloco.startsWith("## ")) {
          return (
            <h2 key={i} className="text-xl font-semibold mt-8 mb-3">
              {bloco.slice(3)}
            </h2>
          );
        }
        const linhas = bloco.split("\n");
        if (linhas.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="list-disc pl-5 space-y-1 my-4 text-muted-foreground">
              {linhas.map((l, j) => (
                <li key={j}>{l.slice(2)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="my-4 leading-relaxed text-muted-foreground">
            {bloco}
          </p>
        );
      })}
    </>
  );
}

function PaginaIntencao() {
  const { pagina } = Route.useLoaderData();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-3xl">
        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
          {pagina.tipo === "sintoma" ? "Sintoma" : pagina.tipo === "cidade" ? "Cidade" : "Solução"}
        </p>
        <h1 className="text-3xl font-bold leading-tight mb-4">{pagina.titulo}</h1>
        {pagina.resumo && (
          <p className="text-base rounded-xl border border-border bg-card p-4 mb-6">
            {pagina.resumo}
          </p>
        )}
        <article>
          <Corpo texto={pagina.conteudo} />
        </article>
      </main>
      <Footer />
    </div>
  );
}
