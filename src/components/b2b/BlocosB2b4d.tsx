import { useState } from "react";
import { Building2, MessageCircle } from "lucide-react";
import {
  RespostaRapida,
  TabelaDiagnosticaBloco,
  BlocosTecnicos,
} from "@/components/BlocosEnriquecimento";
import ReviewsGrid from "@/components/ReviewsGrid";
import {
  CIDADES_4D,
  type Cidade4d,
  enriquecimento4d,
  faq4d,
  mensagemWhatsapp4d,
} from "@/lib/enriquecimento4dB2b";
import { trackWaClick } from "@/lib/funnelAnalytics";

/**
 * Rodada 4D — blocos de autoridade B2B em owners empresariais existentes.
 *
 * Fail-closed: caminho fora de OWNERS_4D não renderiza nada, o que impede
 * que a seção vire template repetido (regra anti-doorway).
 *
 * A FAQ aqui é VISÍVEL e propositalmente não entra em JSON-LD FAQPage —
 * o schema das páginas de serviço continua sendo emitido só pelo layout.
 *
 * Nenhum número de telefone é exposto: o CTA dispara o funil global, que
 * injeta o destino canônico do WhatsApp.
 */
export const BlocosB2b4d = ({ path }: { path: string }) => {
  const conteudo = enriquecimento4d(path);
  const faqs = faq4d(path);
  const [cidade, setCidade] = useState<Cidade4d>("Curitiba");

  if (!conteudo) return null;

  const abrirFunil = () => {
    const message = mensagemWhatsapp4d(path, cidade) ?? undefined;
    trackWaClick("b2b_4d", {
      route: path,
      cta_position: "bloco_b2b_4d",
      segmento: "empresa",
      cidade,
    });
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("wa-funnel:open", {
          detail: { location: `b2b_4d:${path}`, message },
        }),
      );
    }
  };

  return (
    <section
      className="container mx-auto max-w-4xl px-4 py-12"
      data-bloco-4d={path}
      aria-label="Conteúdo empresarial desta página"
    >
      {conteudo.respostaRapida ? <RespostaRapida texto={conteudo.respostaRapida} /> : null}

      {conteudo.tabelaExtra ? (
        <TabelaDiagnosticaBloco tabela={conteudo.tabelaExtra} id="tabela-b2b-4d" />
      ) : null}

      <BlocosTecnicos blocos={conteudo.blocos} />

      {faqs?.length ? (
        <div className="mt-10">
          <h2 className="mb-5 font-heading text-2xl font-bold text-foreground md:text-3xl">
            Dúvidas de quem contrata pelo CNPJ
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.pergunta} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground">{f.pergunta}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.resposta}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-10 rounded-xl border border-border bg-secondary p-6">
        <div className="flex items-start gap-3">
          <Building2 className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
          <div className="w-full">
            <h2 className="font-heading text-xl font-bold text-foreground">
              Falar sobre o atendimento da sua empresa
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A mensagem já vai preenchida com o contexto desta página e com a cidade escolhida.
              Escopo e valor são apresentados antes de qualquer execução.
            </p>

            <fieldset className="mt-4">
              <legend className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Cidade da operação
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {CIDADES_4D.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCidade(c)}
                    aria-pressed={cidade === c}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      cidade === c
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </fieldset>

            <button
              type="button"
              onClick={abrirFunil}
              className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-bold text-accent-foreground motion-surface"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Descrever a demanda da empresa
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <ReviewsGrid
          filter={{ city: cidade }}
          limit={3}
          showAverage
          title="Atendimentos verificados"
          whatsappCta={false}
        />
      </div>
    </section>
  );
};

export default BlocosB2b4d;
