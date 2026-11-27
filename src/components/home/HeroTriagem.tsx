import { useMemo, useState, type FormEvent } from "react";
import { ArrowRight, Building2, MessagesSquare, ScanSearch, Search, Wrench } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { brandConfig } from "@/lib/config";
import { CAMINHOS_ENTRADA } from "@/lib/homeContextos";
import { resolverBusca, sugerir } from "@/lib/buscaInteligente";


/**
 * Navegação interna não é lead: registramos apenas engajamento, sem tocar
 * em `generate_lead` nem nas conversões do Ads (isso é do funil WhatsApp).
 */
const track = (loc: string) => {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "home_navegacao", {
    event_category: "engagement",
    click_location: loc,
    page_path: window.location.pathname,
  });
};

/** Ícones vetoriais decorativos para os quatro caminhos de entrada da Home. */
const ICONES_CAMINHO = {
  problema: ScanSearch,
  servico: Wrench,
  empresa: Building2,
  profissional: MessagesSquare,
} as const;


/**
 * REDESIGN — primeira dobra orientada a problema.
 *
 * Em vez de "Técnico de Informática em Curitiba" seguido de uma grade de
 * serviços, a Home abre com a única pergunta que o visitante sabe responder:
 * o que está acontecendo. O catálogo aparece depois, como consequência.
 */
export const HeroTriagem = () => {
  const [consulta, setConsulta] = useState("");
  const sugestoes = useMemo(() => sugerir(consulta), [consulta]);

  /**
   * O botão "Diagnosticar meu problema" é o submit da caixa de pesquisa:
   * interpreta o que foi digitado (sinônimos, gírias e erros de digitação)
   * e leva ao cluster de problema/serviço correto. Sem confiança mínima,
   * cai na triagem geral — nunca em rota inexistente.
   */
  const enviar = (e: FormEvent) => {
    e.preventDefault();
    const { href, intencaoId, confianca } = resolverBusca(consulta);
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "home_busca_sintoma", {
        event_category: "engagement",
        click_location: "hero_triagem_busca",
        intencao: intencaoId ?? "sem_correspondencia",
        confianca,
        page_path: window.location.pathname,
      });
    }
    void track("hero_triagem_busca");
    window.location.assign(href);
  };


  return (
    <section
      className="relative overflow-hidden border-b border-border bg-background"
      aria-label={`${brandConfig.brandName} — comece pelo problema`}
    >
      {/* A bancada e a busca ficam lado a lado, sem sobrepor a fotografia ao texto. */}
      <div className="container mx-auto py-7 md:py-12">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)] lg:gap-12">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--categoria)/0.12)] px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-wider text-[hsl(var(--categoria))]">
              <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
              Central de soluções técnicas
            </p>

            <h1 className="mt-4 max-w-[19ch] font-heading text-3xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[clamp(2.8rem,4.1vw,3.75rem)]">
              Qual problema de tecnologia precisamos resolver hoje?
            </h1>

            <p className="mt-3 max-w-2xl text-base md:mt-5 leading-relaxed text-muted-foreground md:text-lg">
              Computadores, notebooks, redes, Wi-Fi, sistemas, dados e suporte para pessoas e
              empresas. Conte o que aconteceu com suas palavras — a parte técnica fica com a gente.
            </p>

            {/* Campo principal: "O que está acontecendo?" */}
            <form
              onSubmit={enviar}
              role="search"
              aria-label="Descreva o que está acontecendo"
              className="mt-6 min-w-0 md:mt-8"
            >
              <label
                htmlFor="triagem-sintoma"
                className="block font-heading text-sm font-semibold text-foreground"
              >
                O que está acontecendo?
              </label>
              <div className="motion-surface mt-2 flex flex-col gap-2 rounded-xl border border-border bg-card p-2 shadow-[var(--shadow-lg)] focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 sm:flex-row sm:items-center lg:flex-col lg:items-stretch xl:flex-row xl:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                  <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <input
                    id="triagem-sintoma"
                    value={consulta}
                    onChange={(e) => setConsulta(e.target.value)}
                    placeholder="Ex.: liga e desliga sozinho, Wi-Fi cai, perdi arquivos…"
                    autoComplete="off"
                    className="min-h-12 w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/80"
                  />
                </div>
                <button
                  type="submit"
                  data-cta-location="hero_triagem_busca"
                  className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-accent px-4 font-heading text-sm font-bold text-accent-foreground motion-surface hover:bg-accent/90 active:shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Diagnosticar meu problema
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <ul className="mt-3 flex flex-wrap gap-2 md:mt-4" aria-label="Sintomas mais frequentes">
                {sugestoes.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      onClick={() => track("hero_sintoma_chip")}
                      className="motion-surface inline-flex min-h-11 items-center rounded-full border border-border bg-card px-4 text-[13px] font-medium text-foreground hover:border-accent hover:bg-accent/5 hover:text-accent active:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </form>
          </div>

          {/* A foto licenciada existente fica em painel próprio; mobile mantém a busca primeiro. */}
          <figure className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card">
            <picture>
              <source media="(min-width: 1024px)" srcSet="/fotos/estacao-trabalho-desktop.webp" type="image/webp" />
              <source srcSet="/fotos/bancada-tecnica-mobile.webp" type="image/webp" />
              <img
                src="/fotos/bancada-tecnica.jpg"
                alt="Exemplo de ambiente de diagnóstico e manutenção de computadores"
                width={1024}
                height={735}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="aspect-[16/9] w-full object-cover object-[65%_center] lg:aspect-[4/3]"
              />
            </picture>
            <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border px-4 py-3 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Diagnóstico técnico começa pela causa.</span>
              <a href="/creditos-de-imagens" className="font-medium text-accent underline underline-offset-4">Créditos das imagens</a>
            </figcaption>
          </figure>
        </div>

        {/* Quatro caminhos de entrada, cada um com CTA contextual. */}
        <nav
          className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:mt-10 lg:grid-cols-4"
          aria-label="Por onde você quer começar"
        >
          {CAMINHOS_ENTRADA.map((c, index) => {
            const Icon = ICONES_CAMINHO[c.id as keyof typeof ICONES_CAMINHO] ?? Wrench;
            return (
              <a
                key={c.id}
                href={c.href}
                onClick={() => track(`hero_caminho_${c.id}`)}
                className={`group relative flex min-w-0 flex-col justify-between p-5 motion-surface hover:bg-accent/5 active:bg-accent/10 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${c.id === "problema" ? "bg-secondary" : "bg-card"}`}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span aria-hidden="true" className="font-heading text-xs font-semibold tracking-widest text-muted-foreground">0{index + 1}</span>
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent"
                      aria-hidden="true"
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.8} focusable="false" />
                    </span>
                  </div>
                  <h2 className="font-heading text-lg font-bold text-foreground">{c.titulo}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.descricao}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-bold text-accent">
                  {c.cta}
                  <ArrowRight
                    className="h-4 w-4 shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </a>
            );
          })}
        </nav>

        <p className="mt-6 text-sm text-muted-foreground">
          {siteConfig.primaryCity} e São José dos Pinhais • demais municípios da Região
          Metropolitana conforme a modalidade • atendimentos a partir de {siteConfig.minPriceLabel}
        </p>
      </div>
    </section>
  );
};

export default HeroTriagem;
