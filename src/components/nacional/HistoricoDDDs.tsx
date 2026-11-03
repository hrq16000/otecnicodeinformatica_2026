import { DDD_SOMENTE_HISTORICO, REGIOES_COMUNIDADE } from "@/lib/nacional/comunidadePublica";

/** Apenas dados agregados; sem nomes, telefones ou conteúdo de mensagens. */
export default function HistoricoDDDs() {
  return (
    <section className="container mx-auto max-w-6xl pb-14" aria-labelledby="historico-ddds">
      <div className="rounded-2xl border border-border bg-muted/30 p-5 md:p-8">
        <h2 id="historico-ddds" className="font-heading text-xl font-bold text-foreground md:text-2xl">
          Regiões recentes e histórico da comunidade
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-muted-foreground">
          As 11 capturas de 03/11/2026 mostram {REGIOES_COMUNIDADE.length} áreas de DDD distintas.
          O arquivo de conversas cita ainda {DDD_SOMENTE_HISTORICO.length} DDDs não presentes nas capturas.
          O administrador confirmou que os pedidos de entrada foram aceitos. Mesmo assim,
          os números citados no histórico não comprovam presença atual individual,
          por isso os DDDs só encontrados no histórico ficam separados dos pontos observados nas capturas.
        </p>
        <h3 className="mt-6 text-sm font-bold text-foreground">
          DDDs adicionais mencionados no histórico
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {DDD_SOMENTE_HISTORICO.map((r) => (
            <li key={r.ddd} className="rounded-full border border-border bg-background px-3 py-2 text-xs text-muted-foreground">
              DDD {r.ddd} · {r.uf} · região de {r.poloReferencia}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
          Regiões são referências da numeração telefônica segundo a Anatel; não representam
          endereços atuais ou oferta confirmada de serviço.
        </p>
      </div>
    </section>
  );
}
