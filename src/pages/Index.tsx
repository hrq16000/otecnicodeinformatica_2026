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

// Consultas presentes no snapshot histórico real do Search Console (11/08–08/09/2026).
// As frases foram revisadas para leitura natural; não representam volumes atuais.
const BUSCAS_REAIS = [
  {
    pergunta: "Computador não reconhece HD ou SSD?",
    orientacao: "Se a unidade desapareceu, confira se ela aparece nas informações do sistema. Uma falha de conexão, energia ou da própria unidade exige diagnósticos diferentes.",
    cuidado: "Com arquivos importantes, evite inicializar, formatar ou gravar novos dados.",
    href: "/blog/hd-nao-e-reconhecido-na-bios-o-que-fazer",
  },
  {
    pergunta: "PC desliga sozinho?",
    orientacao: "Observe se o desligamento acontece ao ligar, durante jogos ou após alguns minutos. Temperatura, fonte e alimentação são hipóteses, não um diagnóstico fechado.",
    cuidado: "Se houver cheiro de queimado ou aquecimento excessivo, desligue e não insista.",
    href: "/problemas/computador-desliga-sozinho",
  },
  {
    pergunta: "Impressora não quer imprimir?",
    orientacao: "Confira papel, conexão e mensagens de erro. No Windows, verifique também se há trabalhos presos na fila antes de reinstalar qualquer coisa.",
    cuidado: "Não force mecanismos ou retire peças para tentar destravar o equipamento.",
    href: "/problemas/impressora-nao-imprime",
  },
  {
    pergunta: "Notebook superaquecendo?",
    orientacao: "Use uma superfície firme, observe as saídas de ar e note quando o ventilador acelera. Poeira, carga de trabalho e refrigeração podem contribuir.",
    cuidado: "Desligamentos por temperatura merecem avaliação antes de continuar exigindo o aparelho.",
    href: "/blog/notebook-superaquecendo-o-que-fazer",
  },
  {
    pergunta: "Precisa de conserto de notebook em Curitiba?",
    orientacao: "Tela, carregamento, teclado e lentidão pedem verificações distintas. Entenda as etapas do diagnóstico antes de autorizar troca de peças.",
    cuidado: "O serviço e o orçamento dependem da falha confirmada e da disponibilidade.",
    href: "/servicos/manutencao-de-notebook",
  },
  {
    pergunta: "Sua empresa precisa de suporte técnico em Curitiba?",
    orientacao: "Se estações, sistema, rede ou impressão pararam, registre o que foi afetado e quando começou. Essa informação ajuda a definir a prioridade técnica.",
    cuidado: "Atendimento, modalidade e prazo são confirmados na triagem.",
    href: "/servicos/suporte-tecnico-empresarial",
  },
] as const;

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
        {/* Intenções já observadas no Search Console: respostas úteis e rotas existentes, sem páginas duplicadas. */}
        <section className="border-b border-border bg-secondary/30 py-12 md:py-16" aria-labelledby="buscas-reais-titulo">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Central de informações</p>
              <h2 id="buscas-reais-titulo" className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Pesquisou um problema no Google? Comece por aqui.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Identifique sinais, faça apenas verificações seguras e consulte a explicação completa
                antes de decidir se precisa de atendimento técnico.
              </p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {BUSCAS_REAIS.map((item) => (
                <article key={item.href} className="flex flex-col rounded-2xl border border-border bg-card p-5">
                  <h3 className="font-heading text-lg font-bold text-foreground">{item.pergunta}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.orientacao}</p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">{item.cuidado}</p>
                  <Link
                    to={item.href}
                    className="mt-auto inline-flex min-h-11 items-center pt-4 font-heading text-sm font-bold text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Entender o problema e as opções
                    <span aria-hidden="true" className="ml-2">→</span>
                  </Link>
                </article>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 rounded-2xl border border-accent/30 bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-relaxed text-foreground">
                Não encontrou seu caso? Descreva o sintoma com suas palavras para iniciar a triagem.
              </p>
              <Link
                to="/atendimento"
                data-cta-location="home_buscas_reais_atendimento"
                className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-accent px-5 text-sm font-bold text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Solicitar atendimento
              </Link>
            </div>
          </div>
        </section>

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
