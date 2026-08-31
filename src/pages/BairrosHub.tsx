import { useEffect } from "react";
import { Link } from "@/lib/router-compat";
import { MapPin, MessageCircle, ArrowRight, Wrench } from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { FastHeader } from "@/components/FastHeader";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig, whatsappLink, absoluteUrl } from "@/lib/siteConfig";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import { REGIOES_MALHA, RESUMO_MALHA } from "@/lib/bairrosMalha";
import { CIDADES, SERVICOS_CANONICOS } from "@/lib/cidadesData";

const PATH = "/bairros";
const TITULO = "Bairros atendidos em Curitiba e Região Metropolitana";
const DESCRICAO =
  "Cobertura de assistência técnica de informática por bairro em Curitiba e cidades da região metropolitana: escolha a sua região e fale com um técnico pelo WhatsApp.";

const BairrosHub = () => {
  useEffect(() => {
    trackPageView(PATH, TITULO);
  }, []);

  const waHref = whatsappLink("Olá! Quero saber se vocês atendem no meu bairro.");

  useJsonLdSlot(
    SCHEMA_SLOTS.webPage,
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${absoluteUrl(PATH)}#webpage`,
      name: TITULO,
      description: DESCRICAO,
      url: absoluteUrl(PATH),
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${siteConfig.baseUrl}/#website` },
      publisher: { "@id": `${siteConfig.baseUrl}/#organization` },
    },
    SLOT_PRIORITY.page,
  );

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={`${TITULO} — ${siteConfig.brandName}`}
        description={DESCRICAO}
        path={PATH}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Bairros atendidos", path: PATH },
        ]}
      />
      <FastHeader />
      <main className="pt-[var(--site-header-height)]">
        <Breadcrumbs items={[{ label: "Bairros atendidos" }]} />

        <section className="border-b border-border/60 bg-secondary/40">
          <div className="container mx-auto py-12 md:py-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
              <MapPin className="h-4 w-4" />
              {RESUMO_MALHA.total} localidades mapeadas
            </span>
            <h1 className="mt-5 max-w-3xl text-3xl font-heading font-bold leading-tight text-foreground md:text-5xl">
              Bairros atendidos em Curitiba e Região Metropolitana
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Organizamos a cobertura por região para você chegar rápido à página certa. Se o seu
              bairro não estiver na lista, mande mensagem mesmo assim: a maior parte dos casos é
              resolvida por suporte remoto ou por coleta e entrega.
            </p>
            <div className="mt-8">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="bairros_hub_hero"
                data-wa-source="whatsapp_cta"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-accent px-7 text-base font-bold text-accent-foreground shadow-[0_14px_34px_-10px_hsl(var(--accent)/0.6)] motion-surface"
                onClick={() => trackCTAClick("whatsapp", "bairros_hub_hero")}
              >
                <MessageCircle className="h-5 w-5" />
                Confirmar atendimento no meu bairro
              </a>
            </div>
          </div>
        </section>

        <section className="container mx-auto py-12 md:py-16">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {REGIOES_MALHA.map((regiao) => (
              <article
                key={regiao.id}
                className="rounded-2xl border border-border/60 bg-card p-6 motion-surface"
              >
                <h2 className="text-lg font-heading font-bold text-foreground">{regiao.nome}</h2>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                  {regiao.bairros.length} localidades
                </p>
                <ul className="mt-4 space-y-2">
                  {regiao.bairros.map((b) => (
                    <li key={b.slug}>
                      <Link
                        to={b.path}
                        className="text-sm text-muted-foreground underline-offset-4 hover:text-accent hover:underline"
                      >
                        {b.nome}
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-border/60 bg-muted/25 py-12 md:py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-5xl">
              <div className="max-w-3xl">
                <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Malha de descoberta</span>
                <h2 className="mt-2 text-2xl font-heading font-bold text-foreground md:text-3xl">
                  Encontre a cidade e o serviço certos
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  A página do seu bairro explica a cobertura local. Para entender o atendimento completo,
                  conectamos cada região às páginas próprias de cidade e aos serviços que realmente resolvem
                  os problemas mais comuns — sem criar páginas vazias só para ocupar espaço no mapa.
                </p>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Object.values(CIDADES).map((cidade) => (
                  <Link
                    key={cidade.slug}
                    to={`/tecnico-informatica-${cidade.slug}`}
                    className="group rounded-2xl border border-border bg-background p-5 transition-all hover:-translate-y-0.5 hover:border-accent/45 hover:shadow-md"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-foreground group-hover:text-accent">{cidade.cidade}</span>
                      <ArrowRight className="h-4 w-4 text-accent" aria-hidden="true" />
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{cidade.subtitulo}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-border bg-background p-5 md:p-6">
                <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
                  <Wrench className="h-5 w-5 text-accent" aria-hidden="true" />
                  Serviços disponíveis em todas as regiões
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {SERVICOS_CANONICOS.map((servico) => (
                    <Link
                      key={servico.to}
                      to={servico.to}
                      className="rounded-full border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-accent/45 hover:text-accent"
                    >
                      {servico.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BairrosHub;
