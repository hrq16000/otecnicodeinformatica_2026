import { useEffect } from "react";
import { Link } from "@/lib/router-compat";
import { ArrowRight, MessageCircle, Network } from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import { SITE_BASE_URL, whatsappLink } from "@/lib/siteConfig";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { ENTIDADES, ENTIDADES_REVISADO_EM } from "@/lib/entidades";

const PATH = "/entidades";
const TITLE = "Entidades Técnicas do Portal | Mapa de Conteúdo Conectado";
const DESCRIPTION =
  "Windows, SSD, memória RAM, Wi-Fi, backup, erro 0xc0000428 e computador lento: cada entidade reúne definição, problemas, ferramentas, decisões, artigos e serviços.";

const EntidadesHub = () => {
  useEffect(() => {
    trackPageView(PATH, TITLE);
  }, []);

  const url = `${SITE_BASE_URL}${PATH}`;

  useJsonLdSlot(
    SCHEMA_SLOTS.webPage,
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${url}#webpage`,
      url,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${SITE_BASE_URL}/#website` },
      dateModified: ENTIDADES_REVISADO_EM,
      mainEntity: {
        "@type": "DefinedTermSet",
        "@id": `${url}#entidades`,
        name: "Taxonomia de entidades técnicas",
        description: DESCRIPTION,
        hasDefinedTerm: ENTIDADES.map((e) => ({
          "@type": "DefinedTerm",
          name: e.nome,
          description: e.resumo,
          termCode: e.slug,
          url: `${SITE_BASE_URL}/entidades/${e.slug}`,
        })),
      },
    },
    SLOT_PRIORITY.page,
  );

  const waHref = whatsappLink(
    "Olá! Vi o mapa de entidades técnicas do portal e quero descrever o meu caso para a triagem.",
  );

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Entidades técnicas", path: PATH },
        ]}
      />
      <Header />
      <Breadcrumbs items={[{ label: "Entidades técnicas" }]} />

      <main className="container mx-auto max-w-5xl px-4 py-8 sm:py-10">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Biblioteca técnica · taxonomia do portal
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            Entidades técnicas do portal
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Uma entidade é o nó que conecta tudo o que o portal publica sobre um assunto: a
            definição técnica, os problemas em que ela aparece, as ferramentas de verificação, as
            decisões que ela impõe, os artigos aprofundados, as fontes primárias e — quando faz
            sentido — o serviço e as cidades onde ele existe de fato.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Use este mapa para atravessar o conteúdo por assunto em vez de por página.
          </p>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-2" aria-label="Entidades disponíveis">
          {ENTIDADES.map((e) => (
            <article
              key={e.slug}
              className="flex h-full flex-col rounded-xl border border-border bg-card p-5 md:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h2 className="font-heading text-lg font-bold text-foreground">
                  <Link
                    to={`/entidades/${e.slug}`}
                    className="hover:text-accent hover:underline underline-offset-4"
                  >
                    {e.nome}
                  </Link>
                </h2>
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-muted-foreground">
                  <Network className="h-3 w-3" aria-hidden="true" />
                  {e.tipo}
                </span>
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{e.resumo}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                {e.problemas.length} problemas · {e.ferramentas.length} ferramentas ·{" "}
                {e.decisoes.length} decisões · {e.artigos.length} artigos
              </p>
              <Link
                to={`/entidades/${e.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 font-heading text-sm font-bold text-accent hover:underline"
              >
                Explorar a entidade <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-xl border border-border bg-secondary/30 p-5" aria-labelledby="como-usar">
          <h2 id="como-usar" className="font-heading text-xl font-bold text-foreground">
            Como esta taxonomia se conecta ao resto do portal
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            As entidades não substituem nenhuma página: elas organizam o que já existe. O{" "}
            <Link to="/guia-tecnico-informatica" className="font-bold text-accent underline-offset-4 hover:underline">
              guia técnico
            </Link>{" "}
            traz as trilhas de leitura, o{" "}
            <Link to="/glossario" className="font-bold text-accent underline-offset-4 hover:underline">
              glossário
            </Link>{" "}
            define os termos isolados, as{" "}
            <Link to="/ferramentas" className="font-bold text-accent underline-offset-4 hover:underline">
              ferramentas
            </Link>{" "}
            executam verificação e os{" "}
            <Link to="/decisoes" className="font-bold text-accent underline-offset-4 hover:underline">
              guias de decisão
            </Link>{" "}
            fecham a escolha antes do orçamento.
          </p>
        </section>

        <section className="mt-10 rounded-xl border border-border bg-card p-6 text-center" aria-labelledby="cta-entidades">
          <h2 id="cta-entidades" className="font-heading text-xl font-bold text-foreground">
            Não sabe em qual entidade o seu caso se encaixa?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Descreva o sintoma do seu jeito. A triagem técnica traduz e devolve o próximo passo,
            com clareza de valores antes de qualquer compromisso.
          </p>
          <Button asChild size="lg" className="mt-4 min-h-12">
            <a
              href={waHref}
              onClick={() => trackCTAClick("whatsapp", "entidades-hub-final")}
              data-cta-location="entidades_hub_final"
            >
              <MessageCircle className="mr-2 h-5 w-5" /> Descrever pelo WhatsApp
            </a>
          </Button>
        </section>

        <p className="mt-8 text-xs text-muted-foreground">
          Taxonomia revisada em {ENTIDADES_REVISADO_EM.split("-").reverse().join("/")}. Conteúdo
          original do portal, com fontes primárias citadas em cada entidade.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default EntidadesHub;
