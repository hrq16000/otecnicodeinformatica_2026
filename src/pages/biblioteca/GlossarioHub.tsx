import { useEffect } from "react";
import { Link } from "@/lib/router-compat";
import { ArrowRight, BookOpenText, MessageCircle, Wrench } from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import { SITE_BASE_URL, whatsappLink } from "@/lib/siteConfig";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import {
  CATEGORIAS_GLOSSARIO,
  GLOSSARIO_REVISADO_EM,
  TERMOS_GLOSSARIO,
  termosDaCategoria,
} from "@/lib/glossarioTecnico";
import { RISCO_BADGE_CLASSES } from "@/pages/biblioteca/riscoBadge";

const PATH = "/glossario";
const TITLE = "Glossário Técnico de Informática | O Técnico de Informática";
const DESCRIPTION =
  "15 termos técnicos explicados sem jargão: BSOD, SMART, TPM, BitLocker, UEFI, DNS, NVMe e mais — com o que é seguro verificar e o que não fazer em cada um.";

const WA_MESSAGE =
  "Olá! Estava lendo o glossário técnico do portal e quero descrever meu problema para a triagem.";

/** Âncora estável por categoria (usada no índice e no ItemList). */
const anchorCategoria = (categoria: string) =>
  categoria
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const GlossarioHub = () => {
  useEffect(() => {
    trackPageView(PATH, TITLE);
  }, []);

  const hubUrl = `${SITE_BASE_URL}${PATH}`;

  // CollectionPage + DefinedTermSet: cada DefinedTerm espelha o card visível
  // (mesmo nome, mesmo resumo) — paridade JSON-LD × conteúdo garantida.
  useJsonLdSlot(
    SCHEMA_SLOTS.webPage,
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${hubUrl}#webpage`,
      url: hubUrl,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${SITE_BASE_URL}/#website` },
      dateModified: GLOSSARIO_REVISADO_EM,
      mainEntity: {
        "@type": "DefinedTermSet",
        "@id": `${hubUrl}#termos`,
        name: "Glossário técnico de informática",
        hasDefinedTerm: TERMOS_GLOSSARIO.map((t) => ({
          "@type": "DefinedTerm",
          name: t.termo,
          description: t.resumo,
          url: `${SITE_BASE_URL}/glossario/${t.slug}`,
          inDefinedTermSet: { "@id": `${hubUrl}#termos` },
        })),
      },
    },
    SLOT_PRIORITY.page,
  );

  const waHref = whatsappLink(WA_MESSAGE);
  const cta = (location: string) => () => trackCTAClick("whatsapp", `glossario-${location}`);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Glossário técnico", path: PATH },
        ]}
      />
      <Header />
      <Breadcrumbs items={[{ label: "Glossário técnico" }]} />

      <section className="bg-[hsl(var(--hero-bg))] text-white">
        <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12 md:py-14">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent-on-dark sm:mb-3 sm:text-sm">
            Biblioteca técnica · entender antes de decidir
          </p>
          <h1 className="mb-3 text-[1.7rem] font-bold leading-[1.12] sm:mb-4 sm:text-3xl md:text-4xl">
            Glossário técnico de informática
          </h1>
          <p className="mb-4 max-w-3xl text-[0.95rem] leading-relaxed opacity-95 sm:mb-6 sm:text-base">
            Quinze termos que aparecem em toda conversa técnica — de BSOD a NVMe — explicados em
            linguagem direta. Cada termo traz a definição, por que importa no dia a dia, os
            sintomas relacionados, o que é seguro verificar por conta própria e, principalmente,
            onde parar. Nenhum cadastro, nenhuma promessa: só o conhecimento que encurta o
            diagnóstico.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="min-h-12">
              <a href={waHref} onClick={cta("hero")} data-cta-location="glossario_hero">
                <MessageCircle className="mr-2 h-5 w-5" /> Descrever meu problema
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-h-12 border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <Link to="/ferramentas">
                <Wrench className="mr-2 h-5 w-5" /> Ver checklists e ferramentas
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto max-w-4xl px-4 py-10 sm:py-12">
        <nav aria-label="Categorias do glossário" className="mb-10 rounded-xl border border-border bg-card p-5">
          <h2 className="font-heading text-lg font-bold text-foreground">Navegue por categoria</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {CATEGORIAS_GLOSSARIO.map((c) => (
              <li key={c}>
                <a
                  href={`#${anchorCategoria(c)}`}
                  className="inline-flex min-h-10 items-center rounded-full border border-border bg-secondary/50 px-4 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                >
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {CATEGORIAS_GLOSSARIO.map((categoria) => {
          const termos = termosDaCategoria(categoria);
          if (termos.length === 0) return null;
          const anchor = anchorCategoria(categoria);
          return (
            <section key={categoria} className="mb-12" aria-labelledby={anchor}>
              <h2 id={anchor} className="mb-4 scroll-mt-24 font-heading text-2xl font-bold text-foreground">
                {categoria}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {termos.map((t) => (
                  <article key={t.slug} className="flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/50">
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      <Link
                        to={`/glossario/${t.slug}`}
                        className="after:absolute after:inset-0 relative outline-none focus-visible:text-accent"
                      >
                        {t.termo}
                      </Link>
                    </h3>
                    {t.expansao ? (
                      <p className="mt-0.5 text-xs text-muted-foreground">{t.expansao}</p>
                    ) : null}
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{t.resumo}</p>
                    <p className="mt-3">
                      <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${RISCO_BADGE_CLASSES[t.risco]}`}>
                        {t.risco}
                      </span>
                    </p>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        <section aria-labelledby="como-usar" className="mb-12 rounded-xl border border-accent/40 bg-accent/5 p-6">
          <h2 id="como-usar" className="font-heading text-xl font-bold text-foreground">
            Como este glossário se conecta ao resto do portal
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            O glossário explica o <strong className="text-foreground">conceito</strong>; as páginas de{" "}
            <Link to="/problemas" className="font-bold text-accent underline-offset-4 hover:underline">
              problemas
            </Link>{" "}
            investigam o <strong className="text-foreground">sintoma</strong>; as{" "}
            <Link to="/ferramentas" className="font-bold text-accent underline-offset-4 hover:underline">
              ferramentas
            </Link>{" "}
            organizam a <strong className="text-foreground">observação</strong>; e o{" "}
            <Link to="/guia-tecnico-informatica" className="font-bold text-accent underline-offset-4 hover:underline">
              Atlas de Informática
            </Link>{" "}
            reúne as trilhas de decisão. Cada termo aponta para os três quando o vínculo é real —
            nunca por preenchimento.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Conteúdo original revisado na bancada · última revisão editorial em{" "}
            {GLOSSARIO_REVISADO_EM.split("-").reverse().join("/")}. Fontes primárias citadas em
            cada termo.
          </p>
        </section>

        <section aria-labelledby="cta-final" className="rounded-xl border border-border bg-card p-6 text-center">
          <h2 id="cta-final" className="font-heading text-xl font-bold text-foreground">
            O termo explicou, mas o problema continua?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Descreva o sintoma como ele aparece — sem precisar de termo técnico nenhum. A triagem
            traduz e devolve o próximo passo com clareza de valores antes de qualquer visita.
          </p>
          <Button asChild size="lg" className="mt-4 min-h-12">
            <a href={waHref} onClick={cta("final")} data-cta-location="glossario_final">
              <MessageCircle className="mr-2 h-5 w-5" /> Falar com o técnico
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GlossarioHub;
