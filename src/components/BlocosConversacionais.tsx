import { AlertTriangle, ShieldAlert, ShieldCheck } from "lucide-react";
import { Link } from "@/lib/router-compat";
import { GESTOR, hasPersonAuthority } from "@/lib/gestorResponsavel";
import { siteConfig } from "@/lib/siteConfig";
import {
  blocoConversacional,
  type AlertaRisco,
  type PerguntaConversacional,
} from "@/lib/intencaoConversacional";

/**
 * Blocos de intenção conversacional ("o que / como / por que / onde").
 *
 * A pergunta vira <h2> com o texto EXATO que a pessoa digita, e a primeira
 * frase da resposta é a extração direta para LLMs e trechos em destaque.
 * O JSON-LD FAQPage é emitido pela PÁGINA (um único FAQPage por URL),
 * mesclando estas perguntas com a FAQ já existente.
 */

const Alerta = ({ alerta }: { alerta: AlertaRisco }) => {
  const critico = alerta.nivel === "critico";
  const Icone = critico ? ShieldAlert : AlertTriangle;
  return (
    <div
      role="note"
      className={`mt-6 flex gap-3 rounded-xl border p-4 ${
        critico
          ? "border-destructive/50 bg-destructive/10"
          : "border-accent/50 bg-accent/10"
      }`}
    >
      <Icone
        className={`mt-0.5 h-5 w-5 flex-shrink-0 ${critico ? "text-destructive" : "text-accent"}`}
        aria-hidden="true"
      />
      <div>
        <p className="font-heading font-bold text-foreground">{alerta.titulo}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{alerta.texto}</p>
      </div>
    </div>
  );
};

const Pergunta = ({ p, idx }: { p: PerguntaConversacional; idx: number }) => {
  const id = `pergunta-${idx + 1}`;
  return (
    <article className="mt-10" aria-labelledby={id}>
      <h2 id={id} className="font-heading text-2xl font-bold leading-snug text-foreground">
        {p.pergunta}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">{p.resposta}</p>
      {p.detalhes ? (
        <>
          <h3 className="mt-5 font-heading text-lg font-bold text-foreground">
            {p.detalhes.titulo}
          </h3>
          <ul className="mt-2 space-y-2">
            {p.detalhes.itens.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </article>
  );
};

/** Caixa de autoria/revisão — E-E-A-T sem inventar credencial. */
export const CaixaRevisao = () => (
  <aside className="mt-10 rounded-xl border border-border bg-secondary/30 p-5" aria-label="Revisão técnica">
    <p className="flex items-center gap-2 font-heading font-bold text-foreground">
      <ShieldCheck className="h-5 w-5 text-accent" aria-hidden="true" />
      Revisado por responsável técnico
    </p>
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
      {hasPersonAuthority()
        ? `Conteúdo revisado por ${GESTOR.nome}, ${GESTOR.cargo} do ${siteConfig.brandName}.`
        : `Conteúdo revisado pela responsabilidade técnica do ${siteConfig.brandName}: ${GESTOR.cargo} institucional, com critério de diagnóstico antes de orçamento.`}{" "}
      <Link to="/gestor-responsavel" className="font-bold text-accent underline-offset-4 hover:underline">
        Ver quem responde tecnicamente
      </Link>
      .
    </p>
  </aside>
);

/**
 * Seção completa. `cta` é opcional e recebe o CTA já contextualizado da
 * página (sintoma pré-selecionado) — a conversão continua sendo regional,
 * enquanto o conteúdo acima é de abrangência nacional.
 */
export const BlocosConversacionais = ({
  path,
  cta,
}: {
  path: string;
  cta?: React.ReactNode;
}) => {
  const bloco = blocoConversacional(path);
  if (!bloco) return null;

  return (
    <section className="mt-14" aria-labelledby="intencao-conversacional" data-conversational-block>
      <h2
        id="intencao-conversacional"
        className="font-heading text-2xl font-bold text-foreground"
      >
        {bloco.titulo}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">{bloco.intro}</p>

      {bloco.perguntas.map((p, i) => (
        <Pergunta key={p.pergunta} p={p} idx={i} />
      ))}

      {bloco.alertas?.map((a) => (
        <Alerta key={a.titulo} alerta={a} />
      ))}

      {cta ? <div className="mt-8">{cta}</div> : null}

      <CaixaRevisao />
    </section>
  );
};

export default BlocosConversacionais;
