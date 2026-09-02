import { useEffect } from "react";
import { Link, useLocation, useParams } from "@/lib/router-compat";
import { AlertTriangle, ArrowRight, CheckCircle2, MessageCircle, XCircle } from "lucide-react";
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
import { GLOSSARIO_REVISADO_EM, termoPorSlug } from "@/lib/glossarioTecnico";
import { RISCO_BADGE_CLASSES } from "@/pages/biblioteca/riscoBadge";

/** Trunca a description no limite de SEO sem cortar palavra. */
const metaDescription = (texto: string) => {
  if (texto.length <= 158) return texto;
  const corte = texto.slice(0, 155);
  return `${corte.slice(0, corte.lastIndexOf(" "))}…`;
};

const GlossarioTermo = () => {
  const params = useParams<{ termo?: string }>();
  const { pathname } = useLocation();
  const slug = params.termo ?? pathname.replace(/^\/glossario\//, "").replace(/\/$/, "");
  const termo = termoPorSlug(slug);

  const path = `/glossario/${slug}`;
  const title = termo ? `O que é ${termo.termo}? | Glossário Técnico` : "";
  const description = termo ? metaDescription(termo.resumo) : "";
  const url = `${SITE_BASE_URL}${path}`;

  useEffect(() => {
    if (termo) trackPageView(path, title);
  }, [path, title, termo]);

  // WebPage com DefinedTerm como entidade principal — nome e resumo idênticos
  // ao conteúdo visível (H1 + resposta rápida), nunca além dele.
  useJsonLdSlot(
    SCHEMA_SLOTS.webPage,
    termo
      ? {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: title,
          description,
          inLanguage: "pt-BR",
          isPartOf: { "@id": `${SITE_BASE_URL}/#website` },
          dateModified: GLOSSARIO_REVISADO_EM,
          mainEntity: {
            "@type": "DefinedTerm",
            name: termo.termo,
            description: termo.resumo,
            url,
            inDefinedTermSet: {
              "@type": "DefinedTermSet",
              "@id": `${SITE_BASE_URL}/glossario#termos`,
              name: "Glossário técnico de informática",
            },
          },
        }
      : null,
    SLOT_PRIORITY.page,
  );

  if (!termo) return <NotFound />;

  const waHref = whatsappLink(
    `Olá! Li sobre ${termo.termo} no glossário e quero descrever o meu caso para a triagem.`,
  );
  const cta = (location: string) => () => trackCTAClick("whatsapp", `glossario-${slug}-${location}`);

  const relacionados = termo.relacionados
    .map((s) => termoPorSlug(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={title}
        description={description}
        path={path}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Glossário técnico", path: "/glossario" },
          { name: termo.termo, path },
        ]}
      />
      <Header />
      <Breadcrumbs items={[{ label: "Glossário técnico", href: "/glossario" }, { label: termo.termo }]} />

      <main className="container mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Glossário técnico · {termo.categoria}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            {termo.termo}
          </h1>
          {termo.expansao ? (
            <p className="mt-1 text-sm text-muted-foreground">{termo.expansao}</p>
          ) : null}
          <p className="mt-4">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${RISCO_BADGE_CLASSES[termo.risco]}`}>
              <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" /> {termo.risco}
            </span>
          </p>
        </header>

        <section className="mt-6 rounded-xl border border-accent/40 bg-accent/5 p-5" aria-labelledby="resposta-rapida">
          <h2 id="resposta-rapida" className="font-heading text-lg font-bold text-foreground">
            Em uma frase
          </h2>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">{termo.resumo}</p>
        </section>

        <section className="mt-10" aria-labelledby="definicao">
          <h2 id="definicao" className="mb-3 font-heading text-2xl font-bold text-foreground">
            O que é {termo.termo}
          </h2>
          {termo.definicao.map((p) => (
            <p key={p.slice(0, 40)} className="mb-4 text-base leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </section>

        <section className="mt-10" aria-labelledby="por-que-importa">
          <h2 id="por-que-importa" className="mb-3 font-heading text-2xl font-bold text-foreground">
            Por que isso importa
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">{termo.porQueImporta}</p>
        </section>

        <section className="mt-10" aria-labelledby="sintomas">
          <h2 id="sintomas" className="mb-3 font-heading text-2xl font-bold text-foreground">
            Sintomas do dia a dia relacionados
          </h2>
          <ul className="space-y-2">
            {termo.sintomas.map((s) => (
              <li key={s} className="flex gap-2 text-base leading-relaxed text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <section className="rounded-xl border border-border bg-card p-5" aria-labelledby="verificacoes">
            <h2 id="verificacoes" className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
              <CheckCircle2 className="h-5 w-5 text-accent" aria-hidden="true" /> O que é seguro verificar
            </h2>
            <ul className="mt-3 space-y-2.5">
              {termo.verificacoesSeguras.map((v) => (
                <li key={v} className="text-sm leading-relaxed text-muted-foreground">
                  {v}
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-xl border border-destructive/30 bg-destructive/5 p-5" aria-labelledby="nao-fazer">
            <h2 id="nao-fazer" className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
              <XCircle className="h-5 w-5 text-destructive" aria-hidden="true" /> O que não fazer — e quando parar
            </h2>
            <ul className="mt-3 space-y-2.5">
              {termo.naoFazer.map((n) => (
                <li key={n} className="text-sm leading-relaxed text-muted-foreground">
                  {n}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p className="mt-4 rounded-xl border border-border bg-secondary/40 p-4 text-sm leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Sobre o nível de risco: </strong>
          {termo.riscoNota}
        </p>

        <section className="mt-10" aria-labelledby="onde-aparece">
          <h2 id="onde-aparece" className="mb-3 font-heading text-2xl font-bold text-foreground">
            Onde isso aparece no portal
          </h2>
          <div className="space-y-3">
            {termo.links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/50"
              >
                <span>
                  <span className="block font-heading text-sm font-bold text-foreground group-hover:text-accent">
                    {l.rotulo}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{l.contexto}</span>
                </span>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        {relacionados.length > 0 ? (
          <section className="mt-10" aria-labelledby="relacionados">
            <h2 id="relacionados" className="mb-3 font-heading text-xl font-bold text-foreground">
              Termos relacionados
            </h2>
            <ul className="flex flex-wrap gap-2">
              {relacionados.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={`/glossario/${r.slug}`}
                    className="inline-flex min-h-10 items-center rounded-full border border-border bg-secondary/50 px-4 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {r.termo}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <FontesPrimarias fontes={termo.fontes} />

        <section className="mt-12 rounded-xl border border-border bg-card p-6 text-center" aria-labelledby="cta-termo">
          <h2 id="cta-termo" className="font-heading text-xl font-bold text-foreground">
            Reconheceu o seu problema aqui?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Descreva o sintoma do seu jeito — a triagem técnica traduz e devolve o próximo passo,
            com clareza de valores antes de qualquer compromisso.
          </p>
          <Button asChild size="lg" className="mt-4 min-h-12">
            <a href={waHref} onClick={cta("final")} data-cta-location={`glossario_${slug}_final`}>
              <MessageCircle className="mr-2 h-5 w-5" /> Descrever pelo WhatsApp
            </a>
          </Button>
        </section>

        <p className="mt-8 text-xs text-muted-foreground">
          Conteúdo original do glossário técnico, revisado na bancada em{" "}
          {GLOSSARIO_REVISADO_EM.split("-").reverse().join("/")}. Voltar ao{" "}
          <Link to="/glossario" className="font-bold text-accent underline-offset-4 hover:underline">
            índice do glossário
          </Link>{" "}
          ou às{" "}
          <Link to="/ferramentas" className="font-bold text-accent underline-offset-4 hover:underline">
            ferramentas e checklists
          </Link>
          .
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default GlossarioTermo;
