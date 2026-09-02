import { useState } from "react";
import { MessageCircle, Wifi } from "lucide-react";
import {
  RespostaRapida,
  TabelaDiagnosticaBloco,
  BlocosTecnicos,
  FontesPrimarias,
} from "@/components/BlocosEnriquecimento";
import {
  CIDADES_4E,
  MODALIDADE_4E,
  type Cidade4e,
  type Owner4e,
  enriquecimento4e,
  faq4e,
  mensagemWhatsapp4e,
} from "@/lib/enriquecimento4eRedes";
import { whatsappLinkComContexto } from "@/lib/waContextLink";
import { trackWaClick } from "@/lib/funnelAnalytics";

/**
 * Rodada 4E — blocos de rede, Wi-Fi e suporte remoto em owners existentes.
 *
 * Fail-closed: caminho fora de OWNERS_4E não renderiza nada. Nenhuma URL nova
 * é criada e nenhum CTA extra é adicionado — o botão daqui é o mesmo funil
 * global, apenas com contexto de owner, modalidade e cidade.
 *
 * A FAQ é VISÍVEL e não entra em JSON-LD FAQPage: o schema das páginas
 * continua sendo emitido exclusivamente pelos layouts.
 */
export const BlocosRedes4e = ({
  path,
  // Rodada 4F/GEO: quando a página hospedeira já renderiza "Fontes técnicas
  // consultadas" (mesclando as fontes deste bloco), o bloco não repete o H2.
  comFontes = true,
}: { path: string; comFontes?: boolean }) => {
  const conteudo = enriquecimento4e(path);
  const faqs = faq4e(path);
  const [cidade, setCidade] = useState<Cidade4e>("Curitiba");

  if (!conteudo) return null;

  const modalidade = MODALIDADE_4E[path as Owner4e];
  const servico = path.replace(/^\//, "").replace(/\//g, "-");
  const message = mensagemWhatsapp4e(path, cidade) ?? undefined;

  // href real (acessibilidade + fallback sem JS) já com utm_source/utm_campaign.
  const href = whatsappLinkComContexto(message, {
    medium: "cta_inline",
    servico,
    posicao: "bloco_redes_4e",
    etapa: "triagem",
  });

  const abrirFunil = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackWaClick("redes_4e", {
      route: path,
      cta_position: "bloco_redes_4e",
      segmento: "redes",
      modalidade,
      cidade,
      utm_campaign: servico,
      utm_source: "site",
    });
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("wa-funnel:open", {
          detail: { location: `redes_4e:${path}`, message },
        }),
      );
    }
  };

  return (
    <section
      className="container mx-auto max-w-4xl px-4 py-12"
      data-bloco-4e={path}
      aria-label="Conteúdo técnico de rede desta página"
    >
      {conteudo.respostaRapida ? (
        // Rodada 4F: título e id próprios do bloco de rede. Três owners 4E
        // (/atendimento-remoto, /equipamentos/roteador, /problemas/wifi-instavel)
        // já traziam um bloco "Resposta rápida" anterior e passaram a repetir o
        // mesmo H2 na mesma rota — regressão detectada pelo gate check:geo.
        <RespostaRapida
          texto={conteudo.respostaRapida}
          titulo="Resposta rápida sobre rede e conexão"
          id="resposta-rapida-rede"
        />
      ) : null}

      {conteudo.tabelaDiagnostica ? (
        <TabelaDiagnosticaBloco tabela={conteudo.tabelaDiagnostica} id="tabela-rede-4e" />
      ) : null}

      <BlocosTecnicos blocos={conteudo.blocos} />

      {conteudo.tabelaExtra ? (
        <TabelaDiagnosticaBloco tabela={conteudo.tabelaExtra} id="tabela-rede-4e-extra" />
      ) : null}

      {comFontes ? <FontesPrimarias fontes={conteudo.fontes} /> : null}

      {faqs?.length ? (
        <div className="mt-10">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Perguntas frequentes sobre rede e atendimento
          </h2>
          <div className="mt-4 space-y-4">
            {faqs.map((f) => (
              <article key={f.pergunta} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading font-bold text-foreground">{f.pergunta}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.resposta}</p>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-10 rounded-xl border border-border bg-secondary p-6">
        <div className="flex items-start gap-3">
          <Wifi className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
          <div className="w-full">
            <h2 className="font-heading text-xl font-bold text-foreground">
              Descrever o que está acontecendo com a sua rede
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A mensagem já vai com o contexto desta página, a modalidade sugerida
              {modalidade === "remoto"
                ? " (começar remoto)"
                : modalidade === "presencial"
                  ? " (atendimento no local)"
                  : " (remoto ou visita, conforme o sintoma)"}{" "}
              e a cidade escolhida. Escopo e valor são apresentados antes de qualquer execução.
            </p>

            <fieldset className="mt-4">
              <legend className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Cidade do atendimento
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {CIDADES_4E.map((c) => (
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

            <a
              href={href}
              data-cta-location="redes_4e"
              onClick={abrirFunil}
              className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-bold text-accent-foreground motion-surface"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Explicar o problema de rede
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlocosRedes4e;
