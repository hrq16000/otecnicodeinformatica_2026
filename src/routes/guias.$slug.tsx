import { createFileRoute, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BRAND_NAME, absoluteUrl } from "@/lib/siteConfig";
import { obterPaginaEditorial } from "@/lib/paginasEditoriais.functions";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";

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

type PerguntaFrequente = { pergunta: string; resposta: string };

function textoPlano(texto: string) {
  return texto
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`>#-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Extrai somente FAQs que também aparecem visivelmente no Markdown. */
function extrairPerguntasFrequentes(texto: string): PerguntaFrequente[] {
  const inicio = texto.search(/^## Perguntas frequentes\s*$/m);
  if (inicio < 0) return [];

  const trecho = texto.slice(inicio).replace(/^## Perguntas frequentes\s*$/m, "");
  const proximaSecao = trecho.search(/^##\s+/m);
  const secao = proximaSecao >= 0 ? trecho.slice(0, proximaSecao) : trecho;
  const perguntas: PerguntaFrequente[] = [];
  const padrao = /^###\s+(.+)\n+([\s\S]*?)(?=^###\s+|(?![\s\S]))/gm;

  for (const correspondencia of secao.matchAll(padrao)) {
    const pergunta = textoPlano(correspondencia[1] ?? "");
    const resposta = textoPlano(correspondencia[2] ?? "");
    if (pergunta && resposta) perguntas.push({ pergunta, resposta });
  }
  return perguntas;
}

/** Markdown sem HTML bruto; links externos abrem com proteção de origem. */
function Corpo({ texto }: { texto: string }) {
  return (
    <ReactMarkdown
      components={{
        h2: ({ children }) => <h2 className="text-xl font-semibold mt-8 mb-3">{children}</h2>,
        h3: ({ children }) => <h3 className="text-lg font-semibold mt-6 mb-2">{children}</h3>,
        p: ({ children }) => <p className="my-4 leading-relaxed text-muted-foreground">{children}</p>,
        ul: ({ children }) => <ul className="list-disc pl-5 space-y-1 my-4 text-muted-foreground">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1 my-4 text-muted-foreground">{children}</ol>,
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        a: ({ href, children }) => {
          const externo = href?.startsWith("http");
          return (
            <a
              href={href}
              className="text-primary underline underline-offset-4 hover:no-underline"
              rel={externo ? "noopener noreferrer" : undefined}
              target={externo ? "_blank" : undefined}
            >
              {children}
            </a>
          );
        },
        code: ({ children }) => (
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
            {children}
          </code>
        ),
        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
      }}
    >
      {texto}
    </ReactMarkdown>
  );
}

function PaginaIntencao() {
  const { pagina } = Route.useLoaderData();
  const url = absoluteUrl(`/guias/${pagina.slug}`);
  const perguntasFrequentes = extrairPerguntasFrequentes(pagina.conteudo);

  useJsonLdSlot(
    SCHEMA_SLOTS.article,
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      headline: pagina.titulo,
      description: pagina.meta_description,
      dateModified: pagina.updated_at,
      inLanguage: "pt-BR",
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      author: { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: BRAND_NAME },
      publisher: { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: BRAND_NAME },
    },
    SLOT_PRIORITY.page,
  );
  useJsonLdSlot(
    SCHEMA_SLOTS.breadcrumb,
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: pagina.titulo, item: url },
      ],
    },
    SLOT_PRIORITY.page,
  );
  useJsonLdSlot(
    SCHEMA_SLOTS.faq,
    perguntasFrequentes.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: perguntasFrequentes.map(({ pergunta, resposta }) => ({
            "@type": "Question",
            name: pergunta,
            acceptedAnswer: { "@type": "Answer", text: resposta },
          })),
        }
      : null,
    SLOT_PRIORITY.page,
  );

  const dataAtualizacao = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(pagina.updated_at));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-3xl">
        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
          {pagina.tipo === "sintoma" ? "Sintoma" : pagina.tipo === "cidade" ? "Cidade" : "Solução"}
        </p>
        <h1 className="text-3xl font-bold leading-tight mb-4">{pagina.titulo}</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Atualizado em <time dateTime={pagina.updated_at}>{dataAtualizacao}</time>
        </p>
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
