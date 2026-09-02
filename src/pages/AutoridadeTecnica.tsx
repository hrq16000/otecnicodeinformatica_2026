import { useEffect } from "react";
import { Link } from "@/lib/router-compat";
import {
  AlertTriangle,
  ArrowRight,
  BookOpenText,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import { SITE_BASE_URL, whatsappLink } from "@/lib/siteConfig";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import {
  AUTORIDADE_REVISADO_EM,
  CLUSTERS_AUTORIDADE,
  LIMITES_DECLARADOS,
  METODO_EDITORIAL,
} from "@/lib/autoridadeTecnica";

const PATH = "/autoridade-tecnica";
const TITLE = "Autoridade técnica: como produzimos o conteúdo de informática";
const DESCRIPTION =
  "Método editorial, clusters técnicos e fontes primárias oficiais (Microsoft, CISA, CERT.br, NIST, Wi-Fi Alliance) que sustentam cada guia de informática do portal.";

const WA_MESSAGE =
  "Olá! Vim da página de autoridade técnica do portal e quero descrever meu problema para a triagem.";

const AutoridadeTecnica = () => {
  useEffect(() => {
    trackPageView(PATH, TITLE);
  }, []);

  const pageUrl = `${SITE_BASE_URL}${PATH}`;
  const waHref = whatsappLink(WA_MESSAGE);
  const cta = (location: string) => () => trackCTAClick("whatsapp", `autoridade-${location}`);

  // CollectionPage + ItemList espelhando exatamente os clusters renderizados.
  useJsonLdSlot(
    SCHEMA_SLOTS.webPage,
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${SITE_BASE_URL}/#website` },
      dateModified: AUTORIDADE_REVISADO_EM,
      about: CLUSTERS_AUTORIDADE.map((c) => ({ "@type": "Thing", name: c.titulo })),
      citation: CLUSTERS_AUTORIDADE.flatMap((c) =>
        c.fontes.map((f) => ({
          "@type": "CreativeWork",
          name: f.titulo,
          url: f.url,
        })),
      ),
      mainEntity: {
        "@type": "ItemList",
        "@id": `${pageUrl}#clusters`,
        itemListElement: CLUSTERS_AUTORIDADE.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.titulo,
          description: c.fundamento,
          url: `${pageUrl}#cluster-${c.id}`,
        })),
      },
    },
    SLOT_PRIORITY.page,
  );

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Autoridade técnica", path: PATH },
        ]}
      />
      <Header />
      <Breadcrumbs items={[{ label: "Autoridade técnica" }]} />

      <section className="bg-[hsl(var(--hero-bg))] text-white">
        <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12 md:py-14">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent-on-dark sm:mb-3 sm:text-sm">
            Referência técnica · método, clusters e fontes
          </p>
          <h1 className="mb-3 text-[1.7rem] font-bold leading-[1.12] sm:mb-4 sm:text-3xl md:text-4xl">
            Autoridade técnica: como este conteúdo é produzido
          </h1>
          <p className="mb-4 max-w-3xl text-[0.95rem] leading-relaxed opacity-95 sm:mb-6 sm:text-base">
            Esta página existe para que qualquer pessoa possa auditar o conteúdo do portal antes de
            confiar nele. Aqui estão o método editorial que seguimos, os cinco clusters técnicos que
            organizam todo o material, as fontes primárias oficiais que sustentam cada cluster e —
            igualmente importante — os limites do que afirmamos.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="outline" className="min-h-12 border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <Link to="/guia-tecnico-informatica">
                <BookOpenText className="mr-2 h-5 w-5" /> Ir para o Atlas de Informática
              </Link>
            </Button>
            <Button asChild size="lg" className="min-h-12">
              <a href={waHref} onClick={cta("hero")} data-cta-location="autoridade_hero">
                <MessageCircle className="mr-2 h-5 w-5" /> Descrever meu problema
              </a>
            </Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto max-w-4xl px-4 py-10 sm:py-12">
        <nav aria-label="Clusters técnicos" className="mb-10 rounded-xl border border-border bg-card p-5">
          <h2 className="font-heading text-lg font-bold text-foreground">Clusters técnicos do portal</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {CLUSTERS_AUTORIDADE.map((c) => (
              <li key={c.id}>
                <a
                  href={`#cluster-${c.id}`}
                  className="inline-flex min-h-10 items-center rounded-full border border-border bg-secondary/50 px-4 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                >
                  {c.titulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-labelledby="metodo" className="mb-12">
          <h2 id="metodo" className="mb-4 scroll-mt-24 font-heading text-2xl font-bold text-foreground">
            Método editorial
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {METODO_EDITORIAL.map((m) => (
              <article key={m.titulo} className="rounded-xl border border-border bg-card p-5">
                <h3 className="flex items-start gap-2 font-heading text-base font-bold text-foreground">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  {m.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {CLUSTERS_AUTORIDADE.map((c) => (
          <section key={c.id} className="mb-12" aria-labelledby={`cluster-${c.id}`}>
            <h2
              id={`cluster-${c.id}`}
              className="mb-3 scroll-mt-24 font-heading text-2xl font-bold text-foreground"
            >
              {c.titulo}
            </h2>
            <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{c.fundamento}</p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading text-base font-bold text-foreground">Sintomas associados</h3>
                <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {c.sintomas.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span aria-hidden="true" className="text-accent">
                        •
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading text-base font-bold text-foreground">Verificação segura</h3>
                <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {c.verificacao.map((v) => (
                    <li key={v} className="flex gap-2">
                      <span aria-hidden="true" className="text-accent">
                        •
                      </span>
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-destructive/40 bg-destructive/5 p-5">
              <h3 className="flex items-center gap-2 font-heading text-base font-bold text-foreground">
                <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden="true" />
                Quando parar
              </h3>
              <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
                {c.quandoParar.map((q) => (
                  <li key={q} className="flex gap-2">
                    <span aria-hidden="true" className="text-destructive">
                      •
                    </span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 rounded-xl border border-accent/40 bg-accent/5 p-5">
              <h3 className="font-heading text-base font-bold text-foreground">Decisão informada</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.decisao}</p>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 font-heading text-base font-bold text-foreground">
                  <Wrench className="h-5 w-5 text-accent" aria-hidden="true" /> Ferramentas e checklists
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {c.ferramentas.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="font-semibold text-accent underline-offset-4 hover:underline"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <h3 className="mt-4 font-heading text-base font-bold text-foreground">Aprofundar</h3>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {c.aprofundar.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="font-semibold text-accent underline-offset-4 hover:underline"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-base font-bold text-foreground">
                  Serviços relacionados
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {c.servicos.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="inline-flex items-center gap-1 font-semibold text-accent underline-offset-4 hover:underline"
                      >
                        {l.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <h3 className="mt-4 font-heading text-base font-bold text-foreground">
                  Fontes primárias
                </h3>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {c.fontes.map((f) => (
                    <li key={f.url}>
                      <a
                        href={f.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-1 font-semibold text-foreground underline-offset-4 hover:text-accent hover:underline"
                      >
                        {f.titulo} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                      <span className="block text-xs">{f.nota}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}

        <section aria-labelledby="limites" className="mb-12 rounded-xl border border-border bg-secondary/40 p-6">
          <h2 id="limites" className="scroll-mt-24 font-heading text-xl font-bold text-foreground">
            Limites declarados
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
            {LIMITES_DECLARADOS.map((l) => (
              <li key={l} className="flex gap-2">
                <span aria-hidden="true" className="text-accent">
                  •
                </span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Conteúdo original revisado na bancada · última revisão editorial em{" "}
            {AUTORIDADE_REVISADO_EM.split("-").reverse().join("/")}.
          </p>
        </section>

        <section aria-labelledby="proximo" className="rounded-xl border border-accent/40 bg-accent/5 p-6">
          <h2 id="proximo" className="font-heading text-xl font-bold text-foreground">
            Próximo passo
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Se você chegou aqui para estudar, siga pelo{" "}
            <Link to="/guia-tecnico-informatica" className="font-bold text-accent underline-offset-4 hover:underline">
              Atlas de Informática
            </Link>{" "}
            ou pelo{" "}
            <Link to="/glossario" className="font-bold text-accent underline-offset-4 hover:underline">
              glossário técnico
            </Link>
            . Se já sabe o que está acontecendo, os{" "}
            <Link to="/decisoes" className="font-bold text-accent underline-offset-4 hover:underline">
              guias de decisão
            </Link>{" "}
            comparam os caminhos possíveis antes de qualquer gasto.
          </p>
          <div className="mt-4">
            <Button asChild size="lg" className="min-h-12">
              <a href={waHref} onClick={cta("rodape")} data-cta-location="autoridade_rodape">
                <MessageCircle className="mr-2 h-5 w-5" /> Descrever meu problema no WhatsApp
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AutoridadeTecnica;
