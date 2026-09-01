import { useEffect } from "react";
import { Link } from "@/lib/router-compat";
import { ArrowRight, BookOpenText, ListChecks, MessageCircle, ShieldCheck } from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import { SITE_BASE_URL, whatsappLink } from "@/lib/siteConfig";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { FERRAMENTAS_REVISADO_EM, FERRAMENTAS_TECNICAS } from "@/lib/ferramentasTecnicas";
import { RISCO_BADGE_CLASSES } from "@/pages/biblioteca/riscoBadge";

const PATH = "/ferramentas";
const TITLE = "Checklists e Ferramentas Técnicas | O Técnico de Informática";
const DESCRIPTION =
  "5 roteiros seguros e gratuitos: computador lento, antes de formatar, falha de inicialização, verificação de backup e SSD ou RAM. Sem cadastro, direto ao ponto.";

const WA_MESSAGE =
  "Olá! Segui um dos checklists do portal e quero enviar minhas observações para a triagem.";

const FerramentasHub = () => {
  useEffect(() => {
    trackPageView(PATH, TITLE);
  }, []);

  const hubUrl = `${SITE_BASE_URL}${PATH}`;

  // CollectionPage com ItemList espelhando os cards visíveis (nome + resumo).
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
      dateModified: FERRAMENTAS_REVISADO_EM,
      mainEntity: {
        "@type": "ItemList",
        name: "Ferramentas e checklists técnicos",
        numberOfItems: FERRAMENTAS_TECNICAS.length,
        itemListElement: FERRAMENTAS_TECNICAS.map((f, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: f.nome,
          url: `${SITE_BASE_URL}/ferramentas/${f.slug}`,
        })),
      },
    },
    SLOT_PRIORITY.page,
  );

  const waHref = whatsappLink(WA_MESSAGE);
  const cta = (location: string) => () => trackCTAClick("whatsapp", `ferramentas-${location}`);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Ferramentas e checklists", path: PATH },
        ]}
      />
      <Header />
      <Breadcrumbs items={[{ label: "Ferramentas e checklists" }]} />

      <section className="bg-[hsl(var(--hero-bg))] text-white">
        <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12 md:py-14">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent-on-dark sm:mb-3 sm:text-sm">
            Biblioteca técnica · observar antes de gastar
          </p>
          <h1 className="mb-3 text-[1.7rem] font-bold leading-[1.12] sm:mb-4 sm:text-3xl md:text-4xl">
            Ferramentas e checklists técnicos
          </h1>
          <p className="mb-4 max-w-3xl text-[0.95rem] leading-relaxed opacity-95 sm:mb-6 sm:text-base">
            Cinco roteiros que organizam a observação do problema — na ordem certa e sem passos
            arriscados. Cada um funciona por completo nesta página, sem cadastro e sem instalar
            nada: você observa, anota e chega à triagem com informação que encurta o diagnóstico
            em dias.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="min-h-12">
              <a href={waHref} onClick={cta("hero")} data-cta-location="ferramentas_hero">
                <MessageCircle className="mr-2 h-5 w-5" /> Enviar minhas observações
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-h-12 border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <Link to="/glossario">
                <BookOpenText className="mr-2 h-5 w-5" /> Consultar o glossário
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto max-w-4xl px-4 py-10 sm:py-12">
        <section aria-labelledby="lista-ferramentas" className="mb-12">
          <h2 id="lista-ferramentas" className="mb-4 font-heading text-2xl font-bold text-foreground">
            Escolha o roteiro pelo seu momento
          </h2>
          <div className="space-y-4">
            {FERRAMENTAS_TECNICAS.map((f) => (
              <article
                key={f.slug}
                className="group relative rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/50 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-accent">
                      <Link to={`/ferramentas/${f.slug}`} className="after:absolute after:inset-0 outline-none">
                        {f.nome}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.resumo}</p>
                    <p className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className={`inline-flex items-center rounded-full border px-3 py-1 font-semibold ${RISCO_BADGE_CLASSES[f.risco]}`}>
                        {f.risco}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <ListChecks className="h-3.5 w-3.5" aria-hidden="true" /> {f.passos.length} passos
                      </span>
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="contrato" className="mb-12 rounded-xl border border-accent/40 bg-accent/5 p-6">
          <h2 id="contrato" className="flex items-center gap-2 font-heading text-xl font-bold text-foreground">
            <ShieldCheck className="h-5 w-5 text-accent" aria-hidden="true" /> O contrato destas ferramentas
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>
              <strong className="text-foreground">Orientativas, nunca absolutas:</strong> elas apontam a
              direção mais provável — o diagnóstico definitivo exige o equipamento em mãos.
            </li>
            <li>
              <strong className="text-foreground">Só passos seguros:</strong> nenhum roteiro pede para
              abrir equipamento, apagar dados ou desativar proteções.
            </li>
            <li>
              <strong className="text-foreground">Cada uma sabe quando parar:</strong> todo roteiro lista
              os sinais que transformam observação em risco — e nesses pontos a instrução é uma só:
              pare.
            </li>
            <li>
              <strong className="text-foreground">Sem cadastro e sem coleta:</strong> o progresso marcado
              fica somente no seu navegador, nesta sessão.
            </li>
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            Roteiros revisados na bancada em {FERRAMENTAS_REVISADO_EM.split("-").reverse().join("/")}. Base
            conceitual nas trilhas do{" "}
            <Link to="/guia-tecnico-informatica" className="font-bold text-accent underline-offset-4 hover:underline">
              Atlas de Informática
            </Link>{" "}
            e nos diagnósticos do hub de{" "}
            <Link to="/problemas" className="font-bold text-accent underline-offset-4 hover:underline">
              problemas
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="cta-ferramentas" className="rounded-xl border border-border bg-card p-6 text-center">
          <h2 id="cta-ferramentas" className="font-heading text-xl font-bold text-foreground">
            Terminou um roteiro? Suas observações valem ouro
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Envie o que você observou — qual passo revelou o padrão, onde o roteiro apontou — e a
            triagem já começa com dias de vantagem.
          </p>
          <Button asChild size="lg" className="mt-4 min-h-12">
            <a href={waHref} onClick={cta("final")} data-cta-location="ferramentas_final">
              <MessageCircle className="mr-2 h-5 w-5" /> Falar com o técnico
            </a>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FerramentasHub;
