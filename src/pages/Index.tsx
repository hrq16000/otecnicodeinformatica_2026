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

        {/* Encaminhamento institucional: catálogo nacional separado do funil
            de atendimento local. Links reais, presentes no HTML SSR. */}
        <section
          aria-labelledby="rede-nacional-title"
          className="border-y border-border/60 bg-secondary/40 py-9 md:py-12"
        >
          <div className="container mx-auto max-w-6xl">
            <p className="text-xs font-bold uppercase tracking-wider text-accent">
              Encontre um Técnico · Rede nacional de profissionais
            </p>
            <h2 id="rede-nacional-title" className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Procura um técnico perto de você? Ou quer ser encontrado por clientes?
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
              No Encontre um Técnico, clientes pesquisam profissionais cadastrados por
              especialidade e cidade. Os técnicos divulgam seus serviços e regiões de
              atendimento, com liberdade para negociar diretamente com cada cliente,
              sem leilão de menor preço.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="flex min-w-0 flex-col rounded-2xl border border-border bg-card p-5 md:p-6">
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Sou cliente: quero encontrar um técnico próximo
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  Pesquise por cidade, região e especialidade. Confira os perfis
                  disponíveis e faça sua solicitação pelo próprio portal.
                </p>
                <a
                  href="https://www.encontreumtecnico.com.br/tecnicos"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta-location="home_rede_nacional_buscar"
                  className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-4 py-3 text-center text-sm font-bold text-accent-foreground transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Encontrar técnicos perto de mim
                </a>
              </article>
              <article className="flex min-w-0 flex-col rounded-2xl border border-border bg-card p-5 md:p-6">
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Sou técnico: quero que clientes me encontrem
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  Cadastre-se gratuitamente, informe suas especialidades e cidades
                  atendidas e participe da busca de profissionais parceiros.
                </p>
                <a
                  href="https://www.encontreumtecnico.com.br/cadastro"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta-location="home_rede_nacional_cadastro"
                  className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl border border-accent/40 bg-background px-4 py-3 text-center text-sm font-bold text-accent transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Cadastrar meu perfil gratuitamente
                </a>
              </article>
            </div>
            <p className="mt-4 max-w-3xl text-xs leading-relaxed text-muted-foreground">
              O portal é um diretório de profissionais independentes. A exibição
              depende do cadastro e da região; não representa certificação técnica,
              garantia de disponibilidade ou de contratação.
            </p>
          </div>
        </section>

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
