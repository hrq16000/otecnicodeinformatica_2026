import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "@/lib/router-compat";
import {
  AlertTriangle,
  ArrowRight,
  CircleHelp,
  MessageCircle,
  OctagonX,
  ShieldCheck,
} from "lucide-react";
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
import { FERRAMENTAS_REVISADO_EM, ferramentaPorSlug } from "@/lib/ferramentasTecnicas";
import { termoPorSlug } from "@/lib/glossarioTecnico";
import { RISCO_BADGE_CLASSES } from "@/pages/biblioteca/riscoBadge";

const metaDescription = (texto: string) => {
  if (texto.length <= 158) return texto;
  const corte = texto.slice(0, 155);
  return `${corte.slice(0, corte.lastIndexOf(" "))}…`;
};

/**
 * Página de ferramenta/checklist — Fase 3 (Biblioteca Técnica).
 *
 * Contrato SSR: TODO o conteúdo (passos, interpretações, condições de parada,
 * avisos e conclusão) é texto renderizado no servidor, legível sem JavaScript.
 * O JavaScript apenas soma o progresso dos checkboxes por cima do texto —
 * os checkboxes em si são <input type="checkbox"> nativos, que funcionam
 * mesmo sem hidratação. Nada é coletado nem persistido.
 */
const FerramentaChecklist = () => {
  const params = useParams<{ slug?: string }>();
  const { pathname } = useLocation();
  const slug = params.slug ?? pathname.replace(/^\/ferramentas\//, "").replace(/\/$/, "");
  const ferramenta = ferramentaPorSlug(slug);

  const path = `/ferramentas/${slug}`;
  const title = ferramenta ? `${ferramenta.nome} | Ferramenta gratuita` : "";
  const description = ferramenta ? metaDescription(ferramenta.resumo) : "";
  const url = `${SITE_BASE_URL}${path}`;

  const [feitos, setFeitos] = useState<Record<string, boolean>>({});
  const concluidos = useMemo(() => Object.values(feitos).filter(Boolean).length, [feitos]);

  useEffect(() => {
    if (ferramenta) trackPageView(path, title);
  }, [path, title, ferramenta]);

  // HowTo espelhando exatamente os passos visíveis (mesmos títulos e textos).
  useJsonLdSlot(
    SCHEMA_SLOTS.webPage,
    ferramenta
      ? {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: title,
          description,
          inLanguage: "pt-BR",
          isPartOf: { "@id": `${SITE_BASE_URL}/#website` },
          dateModified: FERRAMENTAS_REVISADO_EM,
          mainEntity: {
            "@type": "HowTo",
            name: ferramenta.nome,
            description: ferramenta.objetivo,
            inLanguage: "pt-BR",
            step: ferramenta.passos.map((p, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: p.titulo,
              text: p.descricao,
              url: `${url}#passo-${p.id}`,
            })),
          },
        }
      : null,
    SLOT_PRIORITY.page,
  );

  if (!ferramenta) return <NotFound />;

  const waHref = whatsappLink(
    `Olá! Segui o roteiro "${ferramenta.nome}" do portal e quero enviar minhas observações para a triagem.`,
  );
  const cta = (location: string) => () => trackCTAClick("whatsapp", `ferramenta-${slug}-${location}`);

  const termos = ferramenta.termos
    .map((t) => termoPorSlug(t))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={title}
        description={description}
        path={path}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Ferramentas e checklists", path: "/ferramentas" },
          { name: ferramenta.nomeCurto, path },
        ]}
      />
      <Header />
      <Breadcrumbs
        items={[{ label: "Ferramentas e checklists", href: "/ferramentas" }, { label: ferramenta.nomeCurto }]}
      />

      <main className="container mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Ferramenta orientativa · sem cadastro
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            {ferramenta.nome}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">{ferramenta.resumo}</p>
          <p className="mt-4">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${RISCO_BADGE_CLASSES[ferramenta.risco]}`}>
              <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" /> {ferramenta.risco}
            </span>
          </p>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2" aria-label="Objetivo e limites da ferramenta">
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-heading text-base font-bold text-foreground">O que este roteiro faz</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ferramenta.objetivo}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-heading text-base font-bold text-foreground">O que ele não faz</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ferramenta.limites}</p>
          </div>
        </section>

        <p className="mt-4 flex gap-3 rounded-xl border border-accent/40 bg-accent/5 p-4 text-sm leading-relaxed text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
          <span>
            <strong className="text-foreground">Antes de começar: </strong>
            {ferramenta.avisoSeguranca}
          </span>
        </p>

        <section className="mt-10" aria-labelledby="passos">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <h2 id="passos" className="font-heading text-2xl font-bold text-foreground">
              O roteiro, passo a passo
            </h2>
            <p className="text-sm font-semibold text-accent" aria-live="polite">
              {concluidos} de {ferramenta.passos.length} marcados
            </p>
          </div>
          <ol className="space-y-4">
            {ferramenta.passos.map((p, i) => (
              <li
                key={p.id}
                id={`passo-${p.id}`}
                className="scroll-mt-24 rounded-xl border border-border bg-card p-5"
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id={`check-${p.id}`}
                    checked={Boolean(feitos[p.id])}
                    onChange={(e) => setFeitos((atual) => ({ ...atual, [p.id]: e.target.checked }))}
                    className="mt-1.5 h-5 w-5 shrink-0 accent-[hsl(var(--accent))]"
                    aria-describedby={`desc-${p.id}`}
                  />
                  <div>
                    <label htmlFor={`check-${p.id}`} className="cursor-pointer font-heading text-base font-bold text-foreground">
                      <span className="mr-2 text-accent">{i + 1}.</span>
                      {p.titulo}
                    </label>
                    <p id={`desc-${p.id}`} className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.descricao}
                    </p>
                    {p.alerta ? (
                      <p className="mt-3 flex gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm leading-relaxed text-muted-foreground">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
                        <span>
                          <strong className="text-destructive">Sinal de alerta: </strong>
                          {p.alerta}
                        </span>
                      </p>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12" aria-labelledby="interpretacao">
          <h2 id="interpretacao" className="mb-2 flex items-center gap-2 font-heading text-2xl font-bold text-foreground">
            <CircleHelp className="h-6 w-6 text-accent" aria-hidden="true" /> Como ler o que você observou
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            Encontre abaixo o padrão mais parecido com o seu. A leitura é probabilística — indica a
            direção mais comum, não um veredito.
          </p>
          <div className="space-y-4">
            {ferramenta.interpretacoes.map((it) => (
              <article key={it.cenario} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading text-base font-bold text-foreground">{it.cenario}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.leitura}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Próximo passo: </strong>
                  {it.to ? (
                    <>
                      <Link to={it.to} className="font-bold text-accent underline-offset-4 hover:underline">
                        {it.proximoPasso}
                      </Link>
                    </>
                  ) : (
                    it.proximoPasso
                  )}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-xl border border-destructive/30 bg-destructive/5 p-6" aria-labelledby="quando-parar">
          <h2 id="quando-parar" className="flex items-center gap-2 font-heading text-xl font-bold text-foreground">
            <OctagonX className="h-5 w-5 text-destructive" aria-hidden="true" /> Pare imediatamente se…
          </h2>
          <ul className="mt-3 space-y-2.5">
            {ferramenta.quandoParar.map((q) => (
              <li key={q} className="text-sm leading-relaxed text-muted-foreground">
                {q}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            Nesses cenários, continuar o roteiro pode agravar o problema ou colocar dados em risco.
            Descreva o que observou na triagem e aguarde orientação.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="conclusao">
          <h2 id="conclusao" className="mb-3 font-heading text-2xl font-bold text-foreground">
            Ao terminar
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">{ferramenta.conclusao}</p>
          <Button asChild size="lg" className="mt-4 min-h-12">
            <a href={waHref} onClick={cta("conclusao")} data-cta-location={`ferramenta_${slug}_conclusao`}>
              <MessageCircle className="mr-2 h-5 w-5" /> Enviar observações pelo WhatsApp
            </a>
          </Button>
        </section>

        <section className="mt-12" aria-labelledby="continue">
          <h2 id="continue" className="mb-3 font-heading text-xl font-bold text-foreground">
            Continue a investigação
          </h2>
          <div className="space-y-3">
            {ferramenta.links.map((l) => (
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

        {termos.length > 0 ? (
          <section className="mt-10" aria-labelledby="termos-citados">
            <h2 id="termos-citados" className="mb-3 font-heading text-xl font-bold text-foreground">
              Termos citados neste roteiro
            </h2>
            <ul className="flex flex-wrap gap-2">
              {termos.map((t) => (
                <li key={t.slug}>
                  <Link
                    to={`/glossario/${t.slug}`}
                    className="inline-flex min-h-10 items-center rounded-full border border-border bg-secondary/50 px-4 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {t.termo}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <FontesPrimarias fontes={ferramenta.fontes} />

        <p className="mt-8 text-xs text-muted-foreground">
          Roteiro orientativo revisado na bancada em{" "}
          {FERRAMENTAS_REVISADO_EM.split("-").reverse().join("/")}. Ele não substitui diagnóstico
          técnico nem garante resultado. Voltar ao{" "}
          <Link to="/ferramentas" className="font-bold text-accent underline-offset-4 hover:underline">
            índice de ferramentas
          </Link>
          .
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default FerramentaChecklist;
