import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Users, X, ArrowUpRight } from "lucide-react";
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

// Convite comunitário separado do atendimento comercial e do programa anual de perfis.
const COMUNIDADE_URL = "https://chat.whatsapp.com/KUki7iAKg2f5ahsGfn4Su5";
const CONVITE_DISPENSADO_ATE = "oti:convite-comunidade:dispensado-ate";
const SETE_DIAS_MS = 7 * 24 * 60 * 60 * 1000;

const HomeSections = lazy(() =>
  import("@/components/home/HomeSections").then((m) => ({ default: m.HomeSections })),
);
const Footer = lazy(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));

// ONDA 4T/5J — placeholder de carregamento com shimmer (nunca espaço em branco).
const SectionFallback = ({ height = "480px" }: { height?: string }) => (
  <SkeletonSection height={height} />
);

const Index = () => {
  const [mostrarConvite, setMostrarConvite] = useState(false);

  const dispensarConvite = useCallback(() => {
    setMostrarConvite(false);
    try {
      window.localStorage.setItem(CONVITE_DISPENSADO_ATE, String(Date.now() + SETE_DIAS_MS));
    } catch {
      // A navegação segue normal quando o armazenamento estiver indisponível.
    }
  }, []);

  useEffect(() => {
    let dispensadoAte = 0;
    try {
      dispensadoAte = Number(window.localStorage.getItem(CONVITE_DISPENSADO_ATE)) || 0;
    } catch {
      // Navegação privada ou armazenamento bloqueado: convite continua opcional.
    }
    if (dispensadoAte > Date.now()) return;

    // Não competir com o carregamento da primeira dobra nem interromper a triagem.
    const temporizador = window.setTimeout(() => setMostrarConvite(true), 14000);
    return () => window.clearTimeout(temporizador);
  }, []);

  useEffect(() => {
    if (!mostrarConvite) return;
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") dispensarConvite();
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [mostrarConvite, dispensarConvite]);

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
        {/* Convite institucional separado do funil de atendimento ao cliente. */}
        <section
          aria-labelledby="comunidade-tecnicos-title"
          className="border-y border-border bg-card py-12 md:py-16"
        >
          <div className="container mx-auto">
            <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-background p-6 shadow-sm md:p-10">
              <p className="text-sm font-bold uppercase tracking-wider text-accent">
                Para profissionais de tecnologia
              </p>
              <h2
                id="comunidade-tecnicos-title"
                className="mt-3 max-w-3xl font-heading text-2xl font-bold text-foreground md:text-4xl"
              >
                É técnico de informática? Faça parte da comunidade nacional.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
                Converse com outros profissionais, compartilhe conhecimento e fortaleça sua
                independência. A comunidade é um espaço de colaboração para quem atua em
                informática e tecnologia em diferentes regiões do Brasil.
              </p>
              <ul className="mt-6 grid gap-3 text-sm text-foreground sm:grid-cols-3">
                <li className="rounded-xl border border-border p-4">Troca de experiências e soluções técnicas</li>
                <li className="rounded-xl border border-border p-4">Contato com profissionais de outras regiões</li>
                <li className="rounded-xl border border-border p-4">Valorização e autonomia no trabalho</li>
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={COMUNIDADE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-6 text-center font-bold text-accent-foreground transition-opacity hover:opacity-90"
                >
                  Quero entrar na comunidade
                </a>
                <Link
                  to="/profissionais/cadastro"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-6 text-center font-bold text-foreground transition-colors hover:border-accent"
                >
                  Conhecer o cadastro profissional
                </Link>
              </div>
              <p className="mt-5 max-w-3xl text-xs leading-relaxed text-muted-foreground">
                Participar do grupo não significa ter perfil aprovado, receber solicitações ou
                garantir trabalhos. O cadastro de perfil profissional é uma modalidade separada,
                sujeita a análise e às condições próprias informadas no formulário.
              </p>
            </div>
          </div>
        </section>

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

      {/* Aviso não modal: pode ser ignorado, fechado por teclado e não bloqueia o funil. */}
      {mostrarConvite && (
        <aside
          aria-labelledby="convite-comunidade-popup-titulo"
          data-testid="convite-comunidade-tecnicos"
          className="fixed bottom-3 left-3 z-40 max-h-[min(55vh,320px)] w-[min(360px,calc(100vw-1.5rem))] overflow-y-auto rounded-2xl border border-border bg-card p-5 shadow-2xl sm:bottom-6 sm:left-6"
        >
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/10 via-transparent to-primary/10" aria-hidden="true" />
          <div className="relative">
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <Users className="h-5 w-5" aria-hidden="true" />
              </span>
              <button
                type="button"
                onClick={dispensarConvite}
                aria-label="Fechar convite da comunidade de técnicos"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-accent">
              Para quem é técnico
            </p>
            <h2 id="convite-comunidade-popup-titulo" className="mt-1 font-heading text-xl font-bold leading-tight text-foreground">
              Sua experiência tem valor. Conecte-se a outros técnicos.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Troque conhecimento e fortaleça sua autonomia na comunidade nacional de técnicos.
            </p>
            <a
              href={COMUNIDADE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dispensarConvite}
              className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 text-center text-sm font-bold text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Participar da comunidade
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Entrada no grupo não garante serviços ou cadastro aprovado.
            </p>
          </div>
        </aside>
      )}

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
