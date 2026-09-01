import { useEffect } from "react";
import { Link } from "@/lib/router-compat";
import { ArrowRight, MessageCircle, Scale } from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import { SITE_BASE_URL, whatsappLink } from "@/lib/siteConfig";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { DECISOES_REVISADO_EM, GUIAS_DECISAO, cardAtlasDoGuia } from "@/lib/guiasDecisao";
import { RISCO_BADGE_CLASSES } from "@/pages/biblioteca/riscoBadge";

const PATH = "/decisoes";
const TITLE = "Guias de Decisão Técnica | O Técnico de Informática";
const DESCRIPTION =
  "Formatar ou reparar, SSD ou RAM, consertar ou substituir, remoto ou presencial: seis guias com critério técnico e sinais observáveis dos dois lados da decisão.";

const DecisoesHub = () => {
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
      dateModified: DECISOES_REVISADO_EM,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: GUIAS_DECISAO.length,
        itemListElement: GUIAS_DECISAO.map((g, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: g.h1,
          description: g.resumo,
          url: `${SITE_BASE_URL}/decisoes/${g.slug}`,
        })),
      },
    },
    SLOT_PRIORITY.page,
  );

  const waHref = whatsappLink(
    "Olá! Li os guias de decisão do portal e quero ajuda para decidir o próximo passo do meu equipamento.",
  );

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Guias de decisão", path: PATH },
        ]}
      />
      <Header />
      <Breadcrumbs items={[{ label: "Guias de decisão" }]} />

      <main className="container mx-auto max-w-5xl px-4 py-8 sm:py-10">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Biblioteca técnica · decisão antes do orçamento
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            Guias de decisão técnica
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Cada guia responde uma única pergunta que decide orçamento — com o critério técnico
            explícito, os sinais que puxam a decisão para cada lado e o ponto em que a decisão
            deixa de ser do usuário. Inclusive quando a resposta é não contratar serviço nenhum.
          </p>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-2" aria-label="Guias de decisão disponíveis">
          {GUIAS_DECISAO.map((g) => {
            const card = cardAtlasDoGuia(g.slug);
            return (
              <article
                key={g.slug}
                className="flex h-full flex-col rounded-xl border border-border bg-card p-5 md:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h2 className="font-heading text-lg font-bold text-foreground">
                    <Link
                      to={`/decisoes/${g.slug}`}
                      className="hover:text-accent hover:underline underline-offset-4"
                    >
                      {card?.pergunta ?? g.nomeCurto}
                    </Link>
                  </h2>
                  {card?.risco && (
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide ${RISCO_BADGE_CLASSES[card.risco]}`}
                    >
                      <Scale className="h-3 w-3" aria-hidden="true" />
                      {card.risco}
                    </span>
                  )}
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{g.resumo}</p>
                <Link
                  to={`/decisoes/${g.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 font-heading text-sm font-bold text-accent hover:underline"
                >
                  Ler o guia completo <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </section>

        <section className="mt-10 rounded-xl border border-border bg-card p-6" aria-labelledby="contexto-atlas">
          <h2 id="contexto-atlas" className="font-heading text-xl font-bold text-foreground">
            Onde estes guias se encaixam
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            A decisão vem depois do diagnóstico. Se você ainda não sabe qual é o problema, comece
            pelo{" "}
            <Link to="/problemas" className="font-bold text-accent underline-offset-4 hover:underline">
              hub de sintomas
            </Link>{" "}
            ou pelo{" "}
            <Link
              to="/guia-tecnico-informatica"
              className="font-bold text-accent underline-offset-4 hover:underline"
            >
              Atlas de informática
            </Link>
            . Para organizar as observações antes de decidir, use as{" "}
            <Link to="/ferramentas" className="font-bold text-accent underline-offset-4 hover:underline">
              ferramentas e checklists
            </Link>{" "}
            e o{" "}
            <Link to="/glossario" className="font-bold text-accent underline-offset-4 hover:underline">
              glossário técnico
            </Link>
            .
          </p>
        </section>

        <section className="mt-10 rounded-xl border border-border bg-card p-6 text-center" aria-labelledby="cta-decisoes">
          <h2 id="cta-decisoes" className="font-heading text-xl font-bold text-foreground">
            Ainda em dúvida sobre o seu caso?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Descreva o sintoma do seu jeito. A triagem técnica devolve o próximo passo e a
            modalidade adequada, com clareza de valores antes de qualquer compromisso.
          </p>
          <Button asChild size="lg" className="mt-4 min-h-12">
            <a
              href={waHref}
              onClick={() => trackCTAClick("whatsapp", "decisoes-hub-final")}
              data-cta-location="decisoes_hub_final"
            >
              <MessageCircle className="mr-2 h-5 w-5" /> Descrever pelo WhatsApp
            </a>
          </Button>
        </section>

        <p className="mt-8 text-xs text-muted-foreground">
          Curadoria revisada na bancada em {DECISOES_REVISADO_EM.split("-").reverse().join("/")}.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default DecisoesHub;
