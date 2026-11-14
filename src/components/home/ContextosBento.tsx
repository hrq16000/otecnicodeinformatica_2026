import { ArrowUpRight, HardDrive, Laptop, MonitorCog, Router, Building2 } from "lucide-react";

const VISUAIS = {
  computadores: { Icon: Laptop, foto: "/fotos/bancada-tecnica-mobile.webp", alt: "Bancada técnica com notebook e ferramentas" },
  sistemas: { Icon: MonitorCog, foto: null, alt: "" },
  dados: { Icon: HardDrive, foto: null, alt: "" },
  redes: { Icon: Router, foto: null, alt: "" },
  empresas: { Icon: Building2, foto: "/fotos/estacao-trabalho-desktop.webp", alt: "Estação de trabalho para atendimento empresarial" },
} as const;

import { ALEM_DA_INFORMATICA, CONTEXTOS } from "@/lib/homeContextos";

const track = (loc: string) => {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "home_navegacao", {
    event_category: "engagement",
    click_location: loc,
    page_path: window.location.pathname,
  });
};

const PESO_CLASSES: Record<string, string> = {
  dominante: "md:col-span-4 md:row-span-2",
  medio: "md:col-span-2",
  compacto: "md:col-span-2",
};

/**
 * REDESIGN — navegação por CONTEXTO, em bento assimétrico.
 *
 * Informática ocupa o compartimento dominante; as demais verticais entram
 * numa faixa secundária, sem cards grandes, para não competir com o núcleo
 * da marca na primeira leitura.
 */
export const ContextosBento = () => (
  <section className="border-b border-border bg-secondary/40 py-12 md:py-16" aria-labelledby="contextos-h2">
    <div className="container mx-auto">
      <header className="max-w-2xl">
        <h2
          id="contextos-h2"
          className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl"
        >
          Escolha pelo contexto, não pelo nome técnico
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Cada bloco reúne os problemas que costumam aparecer juntos. Você entra pelo que está
          vivendo e encontra o escopo, os limites e o prazo do serviço correspondente.
        </p>
      </header>

      <div className="mt-8 grid gap-4 md:auto-rows-[minmax(0,1fr)] md:grid-cols-6">
        {CONTEXTOS.map((c) => {
          const visual = VISUAIS[c.id as keyof typeof VISUAIS];
          const Icon = visual?.Icon ?? Laptop;
          return (
          <a
            key={c.id}
            href={c.href}
            onClick={() => track(`contexto_${c.id}`)}
            className={`group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-[var(--shadow-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              PESO_CLASSES[c.peso] ?? "md:col-span-2"
            }`}
          >
            <div>
              <div className="relative mb-5 flex h-28 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-background to-accent/15 md:h-32">
                {visual?.foto ? (
                  <img
                    src={visual.foto}
                    alt={visual.alt}
                    width={640}
                    height={256}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover opacity-80"
                  />
                ) : (
                  <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,hsl(var(--accent)/0.13),transparent_58%)]" />
                )}
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-border/70 bg-background/90 shadow-sm backdrop-blur-sm">
                  <Icon className="h-7 w-7 text-primary" aria-hidden="true" strokeWidth={1.7} />
                </span>
              </div>
              <span className="font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-[hsl(var(--categoria))]">
                {c.rotulo}
              </span>
              <h3
                className={`mt-2 font-heading font-bold text-foreground ${
                  c.peso === "dominante" ? "text-2xl md:text-3xl" : "text-xl"
                }`}
              >
                {c.titulo}
              </h3>
              <p
                className={`mt-3 leading-relaxed text-muted-foreground ${
                  c.peso === "dominante" ? "text-base md:text-lg" : "text-sm"
                }`}
              >
                {c.descricao}
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-bold text-accent">
              {c.cta}
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </a>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-border p-5">
        <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Além da informática
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {ALEM_DA_INFORMATICA.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => track("alem_da_informatica")}
                className="inline-flex min-h-11 items-center rounded-full border border-border bg-background px-4 text-[13px] font-medium text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default ContextosBento;
