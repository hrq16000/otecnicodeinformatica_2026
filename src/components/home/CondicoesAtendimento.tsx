import { commercialConfig } from "@/lib/config/commercial";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Transparência de condições na Home.
 *
 * Todo o texto de política vem de `src/lib/config/commercial.ts` — nada é
 * redigitado aqui. Sem prazo prometido, sem garantia genérica, sem número
 * de telefone visível.
 */
const ITENS: { titulo: string; texto: string }[] = [
  { titulo: "Aprovação antes da execução", texto: commercialConfig.policies.preAprovacao },
  { titulo: "Visita técnica", texto: commercialConfig.policies.visita },
  { titulo: "Coleta e entrega", texto: commercialConfig.policies.coleta },
  { titulo: "Prazos", texto: commercialConfig.policies.prazos },
  { titulo: "Garantia", texto: commercialConfig.policies.garantia },
  { titulo: "Formas de pagamento", texto: commercialConfig.policies.pagamentos },
];

export const CondicoesAtendimento = () => (
  <section
    className="border-b border-border bg-secondary/40 py-12 md:py-16"
    aria-labelledby="condicoes-h2"
  >
    <div className="container mx-auto">
      <header className="max-w-2xl">
        <h2
          id="condicoes-h2"
          className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl"
        >
          Condições combinadas antes, não depois
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Atendimento em {siteConfig.primaryCity} e São José dos Pinhais; demais municípios da Região
          Metropolitana conforme a modalidade. Diagnóstico a partir de {siteConfig.minPriceLabel}.
        </p>
      </header>

      <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ITENS.map((item) => (
          <div key={item.titulo} className="rounded-2xl border border-border bg-card p-5">
            <dt className="font-heading text-sm font-bold text-foreground">{item.titulo}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.texto}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {commercialConfig.pricingDisclaimer}{" "}
        <a
          href="/precos-e-politicas"
          className="font-semibold text-accent underline underline-offset-2"
        >
          Ver preços e políticas
        </a>
        .
      </p>
    </div>
  </section>
);

export default CondicoesAtendimento;
