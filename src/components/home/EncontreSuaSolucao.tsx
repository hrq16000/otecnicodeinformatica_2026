import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import {
  MODALIDADES,
  PROBLEMAS_EXPLORACAO,
  type EquipamentoOpcao,
  type ProblemaOpcao,
} from "@/lib/encontreSolucao";

const track = (loc: string, extra?: Record<string, string>) => {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "home_exploracao", {
    event_category: "engagement",
    click_location: loc,
    page_path: window.location.pathname,
    ...extra,
  });
};

const passoLabel = (n: number, texto: string) => (
  <span className="inline-flex items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] text-foreground">
      {n}
    </span>
    {texto}
  </span>
);

const opcaoClasses = (ativo: boolean) =>
  `w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
    ativo
      ? "border-accent bg-accent/[0.07] text-foreground"
      : "border-border bg-card text-muted-foreground hover:border-accent hover:text-foreground"
  }`;

/**
 * "Encontre sua solução" — exploração guiada em quatro passos:
 * problema → equipamento → solução → atendimento.
 *
 * Não cria URL nova: cada desfecho aponta para uma página já existente.
 * A modalidade sugerida é uma recomendação técnica, nunca uma promessa
 * de prazo ou de atendimento imediato.
 */
export const EncontreSuaSolucao = () => {
  const [problema, setProblema] = useState<ProblemaOpcao | null>(null);
  const [equipamento, setEquipamento] = useState<EquipamentoOpcao | null>(null);

  const solucao = equipamento?.solucao ?? null;
  const modalidade = solucao ? MODALIDADES[solucao.modalidade] : null;

  const escolherProblema = (p: ProblemaOpcao) => {
    setProblema(p);
    setEquipamento(null);
    track("exploracao_problema", { problema: p.id });
  };

  const escolherEquipamento = (e: EquipamentoOpcao) => {
    setEquipamento(e);
    track("exploracao_equipamento", { equipamento: e.id });
  };

  return (
    <section
      id="encontre-sua-solucao"
      className="border-b border-border bg-background py-12 md:py-16"
      aria-labelledby="encontre-h2"
    >
      <div className="container mx-auto">
        <header className="max-w-2xl">
          <h2
            id="encontre-h2"
            className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl"
          >
            Encontre sua solução
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Quatro passos, na mesma ordem em que o atendimento acontece: o que está acontecendo, em
            qual equipamento, o que costuma resolver e como o atendimento é feito.
          </p>
        </header>

        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          {/* 1 — problema */}
          <div className="rounded-2xl border border-border bg-secondary/40 p-4">
            {passoLabel(1, "O que aconteceu")}
            <ul className="mt-3 space-y-2">
              {PROBLEMAS_EXPLORACAO.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => escolherProblema(p)}
                    aria-pressed={problema?.id === p.id}
                    className={opcaoClasses(problema?.id === p.id)}
                  >
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 2 — equipamento */}
          <div className="rounded-2xl border border-border bg-secondary/40 p-4">
            {passoLabel(2, "Onde está o problema")}
            {problema ? (
              <>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {problema.descricao}
                </p>
                <ul className="mt-3 space-y-2">
                  {problema.equipamentos.map((e) => (
                    <li key={e.id}>
                      <button
                        type="button"
                        onClick={() => escolherEquipamento(e)}
                        aria-pressed={equipamento?.id === e.id}
                        className={opcaoClasses(equipamento?.id === e.id)}
                      >
                        {e.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Escolha ao lado o que está acontecendo para ver os equipamentos correspondentes.
              </p>
            )}
          </div>

          {/* 3 — solução */}
          <div className="rounded-2xl border border-border bg-card p-4">
            {passoLabel(3, "O que costuma resolver")}
            {solucao ? (
              <>
                <h3 className="mt-3 font-heading text-lg font-bold text-foreground">
                  {solucao.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {solucao.resumo}
                </p>
                <a
                  href={solucao.href}
                  onClick={() => track("exploracao_solucao", { destino: solucao.href })}
                  className="mt-4 inline-flex items-center gap-2 font-heading text-sm font-bold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Ler a página completa
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A solução aparece aqui depois que você indicar o equipamento.
              </p>
            )}
          </div>

          {/* 4 — atendimento */}
          <div className="rounded-2xl border border-border bg-card p-4">
            {passoLabel(4, "Como atendemos")}
            {modalidade ? (
              <>
                <h3 className="mt-3 inline-flex items-center gap-2 font-heading text-lg font-bold text-foreground">
                  <Check className="h-4 w-4 text-accent" aria-hidden="true" />
                  {modalidade.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {modalidade.motivo} A modalidade final é confirmada na triagem, conforme o caso.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href="/atendimento"
                    data-cta-location="exploracao_atendimento"
                    onClick={() => track("exploracao_atendimento", { modalidade: modalidade.id })}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 font-heading text-sm font-bold text-accent-foreground motion-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Solicitar atendimento
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href={modalidade.href}
                    onClick={() => track("exploracao_modalidade", { modalidade: modalidade.id })}
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Entender essa modalidade
                  </a>
                </div>
              </>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Indicamos aqui se o caso tende a acesso remoto, visita ou coleta para bancada.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EncontreSuaSolucao;
