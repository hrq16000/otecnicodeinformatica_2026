import { HOME_FAQ } from "@/lib/homeFaq";

/**
 * FAQ da home renderizada no SSR, sem JavaScript de abertura.
 *
 * `<details>/<summary>` nativos entregam o comportamento acordeão com o texto
 * completo já presente no HTML servido — é isso que garante a paridade com o
 * FAQPage JSON-LD e evita o "structured data sem conteúdo visível". Também não
 * há hidratação nem mudança de layout no carregamento (CLS 0).
 */
export const HomeFaqSsr = () => (
  <section id="faq" className="py-14 md:py-18" aria-labelledby="faq-home-title">
    <div className="container mx-auto px-4">
      <p className="text-xs font-bold uppercase tracking-widest text-accent">Dúvidas frequentes</p>
      <h2 id="faq-home-title" className="mt-2 text-2xl font-black tracking-tight text-foreground md:text-3xl">
        O que as pessoas perguntam antes de chamar
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Respostas diretas sobre valor, modalidade de atendimento, prazo e garantia.
      </p>

      <div className="mx-auto mt-8 max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {HOME_FAQ.map((item, index) => (
          <details key={item.q} className="group px-5 py-4" open={index === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
              {item.q}
              <span className="text-accent transition-transform group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);
