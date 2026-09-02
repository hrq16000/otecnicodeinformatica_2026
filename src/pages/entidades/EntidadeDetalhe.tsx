import { useEffect } from "react";
import { Link, useLocation, useParams } from "@/lib/router-compat";
import { ArrowRight, MapPin, MessageCircle, Network } from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import NotFound from "@/pages/NotFound";
import { FontesPrimarias } from "@/components/BlocosEnriquecimento";
import { LIMITES_ENTIDADE } from "@/lib/entidades";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import { SITE_BASE_URL, whatsappLink } from "@/lib/siteConfig";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import {
  ENTIDADES_REVISADO_EM,
  entidadePorSlug,
  type LinkEntidade,
} from "@/lib/entidades";

const metaDescription = (texto: string) => {
  if (texto.length <= 158) return texto;
  const corte = texto.slice(0, 155);
  return `${corte.slice(0, corte.lastIndexOf(" "))}…`;
};

const BlocoLinks = ({
  id,
  titulo,
  descricao,
  itens,
}: {
  id: string;
  titulo: string;
  descricao: string;
  itens: LinkEntidade[];
}) =>
  itens.length > 0 ? (
    <section className="mt-10" aria-labelledby={id}>
      <h2 id={id} className="mb-1 font-heading text-2xl font-bold text-foreground">
        {titulo}
      </h2>
      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{descricao}</p>
      <div className="space-y-3">
        {itens.map((l) => (
          <Link
            key={`${id}-${l.to}`}
            to={l.to}
            className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/50"
          >
            <span>
              <span className="block font-heading text-sm font-bold text-foreground group-hover:text-accent">
                {l.rotulo}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                {l.contexto}
              </span>
            </span>
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  ) : null;

const EntidadeDetalhe = () => {
  const params = useParams<{ slug?: string }>();
  const { pathname } = useLocation();
  const slug = params.slug ?? pathname.replace(/^\/entidades\//, "").replace(/\/$/, "");
  const entidade = entidadePorSlug(slug);

  const path = `/entidades/${slug}`;
  const title = entidade ? `${entidade.nome}: mapa técnico completo | Entidades` : "";
  const description = entidade ? metaDescription(entidade.resumo) : "";
  const url = `${SITE_BASE_URL}${path}`;

  useEffect(() => {
    if (entidade) trackPageView(path, title);
  }, [path, title, entidade]);

  useJsonLdSlot(
    SCHEMA_SLOTS.webPage,
    entidade
      ? {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: title,
          description,
          inLanguage: "pt-BR",
          isPartOf: { "@id": `${SITE_BASE_URL}/#website` },
          dateModified: ENTIDADES_REVISADO_EM,
          mainEntity: {
            "@type": "DefinedTerm",
            "@id": `${url}#entidade`,
            name: entidade.nome,
            alternateName: entidade.tambemChamada,
            description: entidade.resumo,
            termCode: entidade.slug,
            url,
            inDefinedTermSet: {
              "@type": "DefinedTermSet",
              "@id": `${SITE_BASE_URL}/entidades#entidades`,
              name: "Taxonomia de entidades técnicas",
            },
          },
          significantLink: [
            ...entidade.problemas,
            ...entidade.artigos,
            ...entidade.servicos,
          ].map((l) => `${SITE_BASE_URL}${l.to}`),
          citation: entidade.fontes.map((f) => ({
            "@type": "CreativeWork",
            name: f.titulo,
            url: f.url,
          })),
        }
      : null,
    SLOT_PRIORITY.page,
  );

  if (!entidade) return <NotFound />;

  const waHref = whatsappLink(
    `Olá! Li a página sobre ${entidade.nome} no portal e quero descrever o meu caso para a triagem.`,
  );
  const relacionadas = entidade.relacionadas
    .map((s) => entidadePorSlug(s))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={title}
        description={description}
        path={path}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Entidades técnicas", path: "/entidades" },
          { name: entidade.nome, path },
        ]}
      />
      <Header />
      <Breadcrumbs
        items={[{ label: "Entidades técnicas", href: "/entidades" }, { label: entidade.nome }]}
      />

      <main className="container mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Entidade técnica · {entidade.tipo}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            {entidade.nome}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Também chamada de: {entidade.tambemChamada.join(", ")}.
          </p>
        </header>

        <section className="mt-6 rounded-xl border border-accent/40 bg-accent/5 p-5" aria-labelledby="resumo">
          <h2 id="resumo" className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
            <Network className="h-5 w-5 text-accent" aria-hidden="true" /> Em uma frase
          </h2>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">{entidade.resumo}</p>
        </section>

        <section className="mt-10" aria-labelledby="definicao">
          <h2 id="definicao" className="mb-3 font-heading text-2xl font-bold text-foreground">
            Definição
          </h2>
          {entidade.definicao.map((p) => (
            <p key={p.slice(0, 40)} className="mb-4 text-base leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </section>

        <BlocoLinks
          id="problemas"
          titulo="Problemas relacionados"
          descricao="Onde esta entidade aparece como causa, sintoma ou consequência."
          itens={entidade.problemas}
        />
        <BlocoLinks
          id="ferramentas"
          titulo="Ferramentas e checklists"
          descricao="Verificações seguras antes de qualquer troca de peça ou contratação."
          itens={entidade.ferramentas}
        />
        <BlocoLinks
          id="decisoes"
          titulo="Decisões que esta entidade impõe"
          descricao="Guias com o critério técnico dos dois lados da escolha."
          itens={entidade.decisoes}
        />
        <BlocoLinks
          id="artigos"
          titulo="Artigos e guias aprofundados"
          descricao="Conteúdo passo a passo produzido e revisado pelo portal."
          itens={entidade.artigos}
        />
        <BlocoLinks
          id="servicos"
          titulo="Serviços relacionados"
          descricao="Execução com escopo e valor apresentados antes de qualquer intervenção."
          itens={entidade.servicos}
        />

        <section className="mt-10" aria-labelledby="cidades">
          <h2 id="cidades" className="mb-1 font-heading text-2xl font-bold text-foreground">
            Cidades relevantes
          </h2>
          <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
            Atendimento presencial mediante disponibilidade; a modalidade é definida na triagem.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {entidade.cidades.map((c) => (
              <li key={c.to}>
                <Link
                  to={c.to}
                  className="flex min-h-11 items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {c.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {relacionadas.length > 0 ? (
          <section className="mt-10" aria-labelledby="relacionadas">
            <h2 id="relacionadas" className="mb-3 font-heading text-xl font-bold text-foreground">
              Entidades relacionadas
            </h2>
            <ul className="flex flex-wrap gap-2">
              {relacionadas.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={`/entidades/${r.slug}`}
                    className="inline-flex min-h-10 items-center rounded-full border border-border bg-secondary/50 px-4 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {r.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {LIMITES_ENTIDADE[entidade.slug] ? (
          <section
            className="mt-12 rounded-xl border border-destructive/30 bg-destructive/5 p-6"
            aria-labelledby="limite-entidade"
          >
            <h2 id="limite-entidade" className="font-heading text-lg font-bold text-foreground">
              Até onde ir sozinho — e quando parar
            </h2>
            <ul className="mt-3 space-y-2">
              {LIMITES_ENTIDADE[entidade.slug].map((item) => (
                <li key={item} className="text-sm leading-relaxed text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <FontesPrimarias fontes={entidade.fontes} />

        <section className="mt-12 rounded-xl border border-border bg-card p-6 text-center" aria-labelledby="cta-entidade">
          <h2 id="cta-entidade" className="font-heading text-xl font-bold text-foreground">
            Reconheceu o seu caso aqui?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Descreva o sintoma do seu jeito — a triagem técnica traduz e devolve o próximo passo,
            com clareza de valores antes de qualquer compromisso.
          </p>
          <Button asChild size="lg" className="mt-4 min-h-12">
            <a
              href={waHref}
              onClick={() => trackCTAClick("whatsapp", `entidade-${slug}-final`)}
              data-cta-location={`entidade_${slug}_final`}
            >
              <MessageCircle className="mr-2 h-5 w-5" /> Descrever pelo WhatsApp
            </a>
          </Button>
        </section>

        <p className="mt-8 text-xs text-muted-foreground">
          Entidade revisada em {ENTIDADES_REVISADO_EM.split("-").reverse().join("/")}. Voltar ao{" "}
          <Link to="/entidades" className="font-bold text-accent underline-offset-4 hover:underline">
            mapa de entidades
          </Link>{" "}
          ou ao{" "}
          <Link
            to="/guia-tecnico-informatica"
            className="font-bold text-accent underline-offset-4 hover:underline"
          >
            guia técnico
          </Link>
          .
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default EntidadeDetalhe;
