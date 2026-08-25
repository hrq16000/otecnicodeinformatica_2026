import { useEffect } from "react";
import { Link } from "@/lib/router-compat";
import { MapPin, MessageCircle, ArrowRight, ShieldCheck, Truck, Home } from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { FastHeader } from "@/components/FastHeader";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig, whatsappLink, absoluteUrl } from "@/lib/siteConfig";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import {
  SERVICOS_MALHA,
  bairrosIrmaos,
  descricaoBairro,
  mensagemBairro,
  regioesVizinhas,
  tituloBairro,
  type BairroMalha,
} from "@/lib/bairrosMalha";

const CTA_CLASS =
  "inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-accent px-7 text-base font-bold text-accent-foreground shadow-[0_14px_34px_-10px_hsl(var(--accent)/0.6)] motion-surface hover:shadow-[0_18px_40px_-12px_hsl(var(--accent)/0.55)]";

const MODALIDADES = [
  {
    icon: Home,
    titulo: "Atendimento no local",
    texto:
      "Vamos até a sua casa ou escritório quando o problema pode ser resolvido no ambiente do equipamento — configuração, rede, instalação e diagnósticos rápidos.",
  },
  {
    icon: Truck,
    titulo: "Coleta e entrega",
    texto:
      "Quando o serviço exige bancada (reparo de placa, recuperação de dados, limpeza interna profunda), combinamos a retirada e devolvemos o equipamento pronto.",
  },
  {
    icon: ShieldCheck,
    titulo: "Suporte remoto",
    texto:
      "Problemas de software, lentidão e configuração costumam ser resolvidos por acesso remoto, com sua autorização e acompanhamento na tela.",
  },
];

/**
 * Template de cobertura territorial (malha programática).
 *
 * SHALLOW: página útil e navegável, com CTA e distribuição de links, mas
 * `noindex` — não entra no índice enquanto não receber conteúdo próprio.
 * RICH: mesma base, indexável (a política central já promoveu o bairro).
 */
export const BairroMalhaLayout = ({ bairro }: { bairro: BairroMalha }) => {
  const path = bairro.path;
  const titulo = tituloBairro(bairro);
  const descricao = descricaoBairro(bairro);
  const waHref = whatsappLink(
    `Olá! Preciso de assistência técnica de informática no ${bairro.nome} (${bairro.cidade}).`,
  );

  useEffect(() => {
    trackPageView(path, titulo);
  }, [path, titulo]);

  const irmaos = bairrosIrmaos(bairro);
  const vizinhas = regioesVizinhas(bairro);

  useJsonLdSlot(
    SCHEMA_SLOTS.localBusiness,
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ComputerRepairService"],
      "@id": `${absoluteUrl(path)}#localbusiness`,
      name: `${siteConfig.brandName} — ${bairro.nome}`,
      description: descricao,
      url: absoluteUrl(path),
      telephone: siteConfig.phoneE164,
      address: {
        "@type": "PostalAddress",
        addressLocality: bairro.cidade,
        addressRegion: siteConfig.region,
        addressCountry: siteConfig.country,
      },
      areaServed: {
        "@type": "Place",
        name: `${bairro.nome}, ${bairro.cidade}`,
        containedInPlace: { "@type": "State", name: "Paraná" },
      },
      priceRange: "$$",
    },
    SLOT_PRIORITY.page,
  );

  useJsonLdSlot(
    SCHEMA_SLOTS.webPage,
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${absoluteUrl(path)}#webpage`,
      name: titulo,
      description: descricao,
      url: absoluteUrl(path),
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${siteConfig.baseUrl}/#website` },
      about: { "@type": "Place", name: `${bairro.nome}, ${bairro.cidade}` },
      publisher: { "@id": `${siteConfig.baseUrl}/#organization` },
    },
    SLOT_PRIORITY.page,
  );

  // Service com areaServed exato — um único nó por página (slot deduplica).
  useJsonLdSlot(
    SCHEMA_SLOTS.service,
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${absoluteUrl(path)}#service`,
      name: `Assistência técnica de informática no ${bairro.nome}`,
      serviceType: "Assistência técnica de informática",
      description: descricao,
      url: absoluteUrl(path),
      provider: { "@id": `${absoluteUrl(path)}#localbusiness` },
      areaServed: {
        "@type": "Place",
        name: `${bairro.nome}, ${bairro.cidade} - ${siteConfig.region}`,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `Serviços atendidos no ${bairro.nome}`,
        itemListElement: SERVICOS_MALHA.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.label, url: absoluteUrl(s.to) },
        })),
      },
    },
    SLOT_PRIORITY.page,
  );

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={titulo}
        description={descricao}
        path={path}
        noindex={bairro.contentStatus === "SHALLOW"}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Bairros atendidos", path: "/bairros" },
          { name: bairro.regiaoNome, path: `/bairros#${bairro.regiao}` },
          { name: bairro.nome, path },
        ]}
      />

      <FastHeader />
      <main className="pt-[var(--site-header-height)]">
        <Breadcrumbs
          items={[
            { label: "Bairros atendidos", href: "/bairros" },
            { label: bairro.regiaoNome, href: `/bairros#${bairro.regiao}` },
            { label: bairro.nome },
          ]}
        />


        <section className="border-b border-border/60 bg-secondary/40">
          <div className="container mx-auto py-12 md:py-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
              <MapPin className="h-4 w-4" />
              {bairro.nome} • {bairro.cidade}
            </span>
            <h1 className="mt-5 max-w-3xl text-3xl font-heading font-bold leading-tight text-foreground md:text-5xl">
              Assistência técnica de informática no {bairro.nome}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Computador lento, notebook que não liga, tela azul, Wi-Fi caindo ou arquivo
              importante que sumiu: descreva o sintoma pelo WhatsApp que a gente identifica o
              caminho mais provável, a modalidade de atendimento e o custo antes de qualquer
              serviço.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="bairro_malha_hero"
                data-wa-source="whatsapp_cta"
                data-city={bairro.cidade}
                data-neighborhood={bairro.nome}
                className={CTA_CLASS}
                onClick={() => trackCTAClick("whatsapp", "bairro_malha_hero")}
              >
                <MessageCircle className="h-5 w-5" />
                Falar com um técnico agora
              </a>
              {/* A triagem abre já com o bairro da rota preenchido. */}
              <a
                href="#triagem"
                data-cta-location="bairro_malha_urgente"
                data-neighborhood={bairro.nome}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg border border-accent/40 bg-card px-7 text-base font-bold text-foreground motion-surface hover:border-accent"
                onClick={() => trackCTAClick("whatsapp", "bairro_malha_urgente")}
              >
                Preciso de ajuda urgente
              </a>
            </div>
          </div>
        </section>

        <section className="container mx-auto py-12 md:py-16">
          <h2 className="text-2xl font-heading font-bold text-foreground md:text-3xl">
            Serviços que atendemos no {bairro.nome}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICOS_MALHA.map((servico) => (
              <div
                key={servico.slug}
                className="group rounded-xl border border-border/60 bg-card p-5 motion-surface hover:border-accent/50"
              >
                <Link to={servico.to} className="block">
                  <span className="text-base font-semibold text-foreground">{servico.label}</span>
                  <ArrowRight className="mt-3 h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
                </Link>
                {/* Deep link com serviço + bairro já no texto da mensagem. */}
                <a
                  href={whatsappLink(mensagemBairro(bairro, servico.label))}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta-location={`bairro_malha_servico_${servico.slug}`}
                  data-wa-source="whatsapp_cta"
                  data-city={bairro.cidade}
                  data-neighborhood={bairro.nome}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent underline-offset-4 hover:underline"
                  onClick={() => trackCTAClick("whatsapp", `bairro_malha_servico_${servico.slug}`)}
                >
                  <MessageCircle className="h-4 w-4" />
                  Pedir no WhatsApp
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-border/60 bg-secondary/30">
          <div className="container mx-auto py-12 md:py-16">
            <h2 className="text-2xl font-heading font-bold text-foreground md:text-3xl">
              Como o atendimento funciona nesta região
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {MODALIDADES.map((m) => (
                <div key={m.titulo} className="rounded-xl border border-border/60 bg-card p-6">
                  <m.icon className="h-6 w-6 text-accent" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{m.titulo}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{m.texto}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
              A modalidade depende do problema, não do seu conhecimento técnico. Você descreve o
              que está acontecendo e nós indicamos se o caso se resolve remotamente, no local ou
              em bancada — sempre com o custo informado antes da confirmação.
            </p>
          </div>
        </section>

        {irmaos.length > 0 && (
          <section className="container mx-auto py-12">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Outros bairros da região {bairro.regiaoNome}
            </h2>
            <ul className="mt-5 flex flex-wrap gap-3">
              {irmaos.map((b) => (
                <li key={b.slug}>
                  <Link
                    to={b.path}
                    className="inline-flex rounded-lg border border-border/60 bg-card px-4 py-2 text-sm font-medium text-foreground motion-surface hover:border-accent/50"
                  >
                    {b.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {vizinhas.length > 0 && (
          <section className="container mx-auto pb-16">
            <h2 className="text-2xl font-heading font-bold text-foreground">Regiões vizinhas</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {vizinhas.map((regiao) => (
                <div key={regiao.id} className="rounded-xl border border-border/60 bg-card p-5">
                  <h3 className="text-base font-semibold text-foreground">{regiao.nome}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {regiao.bairros.slice(0, 4).map((b) => (
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
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Veja a cobertura completa em{" "}
              <Link to="/bairros" className="font-semibold text-accent underline-offset-4 hover:underline">
                bairros atendidos
              </Link>
              .
            </p>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};
