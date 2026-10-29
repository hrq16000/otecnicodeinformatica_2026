import { lazy, Suspense, useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { FastHeader } from "@/components/FastHeader";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { HeroTriagem } from "@/components/home/HeroTriagem";
import { ContextosBento } from "@/components/home/ContextosBento";
import { FaixaFotografica } from "@/components/home/FaixaFotografica";
import { HomeFaqSsr } from "@/components/home/HomeFaqSsr";
import { EncontreSuaSolucao } from "@/components/home/EncontreSuaSolucao";
import { DiagnosticoIa } from "@/components/home/DiagnosticoIa";
import { CondicoesAtendimento } from "@/components/home/CondicoesAtendimento";


import { TrustStrip } from "@/components/TrustStrip";

import { LazyOnVisible } from "@/components/LazyOnVisible";
import { SkeletonSection } from "@/components/SkeletonSection";
import { siteConfig } from "@/lib/siteConfig";
import { Link } from "@/lib/router-compat";
import { DISCOVERY_PILLAR_LINKS } from "@/lib/discoveryPillars";

const HomeSections = lazy(() =>
  import("@/components/home/HomeSections").then((m) => ({ default: m.HomeSections })),
);
const Footer = lazy(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));

// ONDA 4T/5J — placeholder de carregamento com shimmer (nunca espaço em branco).
const SectionFallback = ({ height = "480px" }: { height?: string }) => (
  <SkeletonSection height={height} />
);

const Index = () => {
  // Metadados da home agora saem no HTML do SSR (PageSEO em JSX), não em efeito.
  useEffect(() => {
    // ONDA 5M — pré-carrega os chunks abaixo da dobra em tempo ocioso.
    // Sem isso, o bloco lazy só baixa quando já está visível e a troca
    // esqueleto → conteúdo real acontece na tela (CLS alto e intermitente).
    const prefetch = () => {
      void import("@/components/home/HomeSections");
      void import("@/components/Footer");
    };
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
      .requestIdleCallback;
    const idleId = ric ? ric(prefetch) : window.setTimeout(prefetch, 1200);

    const id = window.setTimeout(() => {
      import("@/lib/analytics").then(({ trackPageView }) => trackPageView("/", "Home"));
    }, 1800);
    return () => {
      window.clearTimeout(id);
      const cic = (window as unknown as { cancelIdleCallback?: (h: number) => void })
        .cancelIdleCallback;
      if (ric && cic) cic(idleId);
      else window.clearTimeout(idleId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title={siteConfig.homeTitle} description={siteConfig.homeDescription} path="/" />
      <JsonLdSchema />
      <FastHeader />
      <div aria-hidden="true" className="h-[var(--site-header-space)]" />
      <main>
        <HeroTriagem />
        <TrustStrip />

        {/* Links SSR de primeiro nível para pilares ainda desconhecidos pelo Google.
            Mantidos fora de lazy/Suspense para existirem no HTML inicial. */}
        <section className="border-y border-border/60 bg-secondary/50 py-6" aria-labelledby="home-discovery-title">
          <div className="container mx-auto">
            <div className="mx-auto max-w-6xl">
              <h2 id="home-discovery-title" className="mb-4 text-center text-lg font-bold text-foreground md:text-xl">
                Encontre rápido a informação certa para o atendimento
              </h2>
              <nav aria-label="Páginas essenciais do atendimento" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {DISCOVERY_PILLAR_LINKS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="rounded-xl border border-border bg-background p-4 transition-colors hover:border-accent/40 hover:bg-accent/5"
                  >
                    <span className="block font-semibold text-primary">{item.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </section>

        <ContextosBento />
        <EncontreSuaSolucao />
        <DiagnosticoIa />
        <CondicoesAtendimento />
        <FaixaFotografica />
        {/* FAQ no HTML servido: paridade obrigatória com o FAQPage JSON-LD. */}
        <HomeFaqSsr />




        <LazyOnVisible
          minHeight="900px"
          rootMargin="900px 0px"
          placeholder={<SectionFallback height="900px" />}
        >
          <Suspense fallback={<SectionFallback height="900px" />}>
            <HomeSections />
          </Suspense>
        </LazyOnVisible>
      </main>

      <LazyOnVisible
        minHeight="400px"
        rootMargin="600px 0px"
        placeholder={<SectionFallback height="400px" />}
      >
        <Suspense fallback={<SectionFallback height="400px" />}>
          <Footer />
        </Suspense>
      </LazyOnVisible>
    </div>
  );
};

export default Index;
