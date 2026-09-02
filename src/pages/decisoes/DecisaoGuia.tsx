import { useEffect } from "react";
import { Link, useLocation, useParams } from "@/lib/router-compat";
import { AlertTriangle, ArrowRight, CheckCircle2, MessageCircle, OctagonX } from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import NotFound from "@/pages/NotFound";
import { FontesPrimarias } from "@/components/BlocosEnriquecimento";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import { SITE_BASE_URL, whatsappLink } from "@/lib/siteConfig";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { DECISOES_REVISADO_EM, cardAtlasDoGuia, guiaDecisaoPorSlug } from "@/lib/guiasDecisao";
import { RISCO_BADGE_CLASSES } from "@/pages/biblioteca/riscoBadge";

const metaDescription = (texto: string) => {
  if (texto.length <= 158) return texto;
  const corte = texto.slice(0, 155);
  return `${corte.slice(0, corte.lastIndexOf(" "))}…`;
};

/**
 * Guia de decisão independente — /decisoes/<slug>.
 *
 * Todo o conteúdo (resposta direta, contexto, critérios, sinais dos dois
 * lados, condições de parada e perguntas) é renderizado no SSR e legível sem
 * JavaScript. O JSON-LD espelha exatamente o texto visível.
 */
const DecisaoGuia = () => {
  const params = useParams<{ slug?: string }>();
  const { pathname } = useLocation();
  const slug = params.slug ?? pathname.replace(/^\/decisoes\//, "").replace(/\/$/, "");
  const guia = guiaDecisaoPorSlug(slug);
  const card = cardAtlasDoGuia(slug);

  const path = `/decisoes/${slug}`;
  const title = guia ? `${card?.pergunta ?? guia.nomeCurto} | Guia de decisão` : "";
  const description = guia ? metaDescription(guia.resumo) : "";
  const url = `${SITE_BASE_URL}${path}`;

  useEffect(() => {
    if (guia) trackPageView(path, title);
  }, [path, title, guia]);

  useJsonLdSlot(
    SCHEMA_SLOTS.webPage,
    guia
      ? {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: title,
          description,
          inLanguage: "pt-BR",
          isPartOf: { "@id": `${SITE_BASE_URL}/#website` },
          dateModified: DECISOES_REVISADO_EM,
          mainEntity: {
            "@type": "FAQPage",
            mainEntity: guia.perguntas.map((p) => ({
              "@type": "Question",
              name: p.pergunta,
              acceptedAnswer: { "@type": "Answer", text: p.resposta },
            })),
          },
        }
      : null,
    SLOT_PRIORITY.page,
  );

  if (!guia) return <NotFound />;

  const waHref = whatsappLink(
    `Olá! Li o guia "${guia.nomeCurto}" do portal e quero ajuda para decidir o próximo passo.`,
  );
  const cta = (local: string) => () => trackCTAClick("whatsapp", `decisao-${slug}-${local}`);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={title}
        description={description}
        path={path}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Guias de decisão", path: "/decisoes" },
          { name: guia.nomeCurto, path },
        ]}
      />
      <Header />
      <Breadcrumbs items={[{ label: "Guias de decisão", href: "/decisoes" }, { label: guia.nomeCurto }]} />

      <main className="container mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Guia de decisão · critério técnico
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            {guia.h1}
          </h1>
          {card?.risco && (
            <p className="mt-4">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${RISCO_BADGE_CLASSES[card.risco]}`}
              >
                <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" /> {card.risco}
              </span>
            </p>
          )}
        </header>

        <section className="mt-6 rounded-xl border border-accent/40 bg-accent/5 p-5" aria-labelledby="resposta-direta">
          <h2 id="resposta-direta" className="font-heading text-base font-bold text-foreground">
            Resposta direta
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground">{guia.respostaDireta}</p>
        </section>

        <section className="mt-8" aria-labelledby="contexto">
          <h2 id="contexto" className="mb-3 font-heading text-xl font-bold text-foreground">
            Por que a decisão confunde
          </h2>
          {guia.contexto.map((p) => (
            <p key={p.slice(0, 40)} className="mb-3 text-sm leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </section>

        {card && (
          <section className="mt-8" aria-labelledby="sinais">
            <h2 id="sinais" className="mb-2 font-heading text-xl font-bold text-foreground">
              Sinais observáveis dos dois lados
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{card.criterio}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {card.sinais.map((lado) => (
                <div key={lado.rotulo} className="rounded-lg border border-border bg-card p-4">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wide text-accent">
                    {lado.rotulo}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {lado.pontos.map((ponto) => (
                      <li
                        key={ponto}
                        className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent" aria-hidden="true" />
                        {ponto}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-8" aria-labelledby="como-decidir">
          <h2 id="como-decidir" className="mb-3 font-heading text-xl font-bold text-foreground">
            Como decidir na prática
          </h2>
          <ol className="space-y-3">
            {guia.comoDecidir.map((b) => (
              <li key={b.titulo} className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-heading text-sm font-bold text-foreground">{b.titulo}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b.texto}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-8" aria-labelledby="custo">
          <h2 id="custo" className="mb-2 font-heading text-xl font-bold text-foreground">
            O que pesa no custo
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{guia.custo}</p>
        </section>

        <section className="mt-8 rounded-xl border border-destructive/30 bg-destructive/5 p-5" aria-labelledby="parar">
          <h2 id="parar" className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
            <OctagonX className="h-5 w-5 text-destructive" aria-hidden="true" /> Onde parar — e quando procurar apoio técnico
          </h2>
          <ul className="mt-3 space-y-2">
            {guia.ondeParar.map((p) => (
              <li key={p} className="text-sm leading-relaxed text-muted-foreground">
                {p}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8" aria-labelledby="perguntas">
          <h2 id="perguntas" className="mb-3 font-heading text-xl font-bold text-foreground">
            Perguntas frequentes
          </h2>
          <div className="space-y-4">
            {guia.perguntas.map((p) => (
              <div key={p.pergunta} className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-heading text-sm font-bold text-foreground">{p.pergunta}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.resposta}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10" aria-labelledby="proximos">
          <h2 id="proximos" className="mb-3 font-heading text-xl font-bold text-foreground">
            Próximos passos
          </h2>
          <div className="grid gap-3">
            {guia.links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="flex items-start justify-between gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent/60"
              >
                <span>
                  <span className="font-heading text-sm font-bold text-foreground">{l.rotulo}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{l.contexto}</span>
                </span>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <FontesPrimarias fontes={guia.fontes} />

        <section className="mt-12 rounded-xl border border-border bg-card p-6 text-center" aria-labelledby="cta-guia">
          <h2 id="cta-guia" className="font-heading text-xl font-bold text-foreground">
            Quer conferir a decisão com um técnico?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Descreva o que está acontecendo e o que você já observou. A triagem devolve o próximo
            passo com escopo e valores antes de qualquer compromisso.
          </p>
          <Button asChild size="lg" className="mt-4 min-h-12">
            <a href={waHref} onClick={cta("final")} data-cta-location={`decisao_${slug}_final`}>
              <MessageCircle className="mr-2 h-5 w-5" /> Descrever pelo WhatsApp
            </a>
          </Button>
        </section>

        <p className="mt-8 text-xs text-muted-foreground">
          Guia autoral revisado na bancada em {DECISOES_REVISADO_EM.split("-").reverse().join("/")}.
          Voltar aos{" "}
          <Link to="/decisoes" className="font-bold text-accent underline-offset-4 hover:underline">
            guias de decisão
          </Link>{" "}
          ou ao{" "}
          <Link
            to="/guia-tecnico-informatica"
            className="font-bold text-accent underline-offset-4 hover:underline"
          >
            Atlas de informática
          </Link>
          .
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default DecisaoGuia;
