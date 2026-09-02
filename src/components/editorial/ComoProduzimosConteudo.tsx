import { Link } from "@/lib/router-compat";
import { AlertTriangle, BookOpenCheck, CalendarCheck2, Landmark, ShieldCheck } from "lucide-react";
import { BRAND_NAME } from "@/lib/siteConfig";

/**
 * "Como este portal produz conteúdo técnico" — bloco institucional de
 * transparência editorial (Fase 1 do Atlas).
 *
 * Regras herdadas do registro editorial fail-closed:
 *  - autoria institucional identificada (sem autor fictício);
 *  - data de revisão só muda com alteração material;
 *  - fonte primária obrigatória para afirmação dependente de versão/fabricante;
 *  - nível de risco explícito em todo procedimento;
 *  - nunca orientar a desativar permanentemente proteções do sistema.
 */

/** Fontes primárias usadas na revisão dos guias técnicos. */
const FONTES_PRIMARIAS = [
  { nome: "Microsoft Support e Microsoft Learn", uso: "comportamento do Windows, atualizações e ferramentas oficiais" },
  { nome: "CISA (stopransomware.gov)", uso: "prevenção e resposta a ransomware" },
  { nome: "CERT.br / NIC.br", uso: "segurança e boas práticas de internet no Brasil" },
  { nome: "Documentação de fabricantes", uso: "firmware, drivers e especificações de hardware" },
];

const NIVEIS_DE_RISCO = [
  {
    nivel: "Seguro de fazer sozinho",
    desc: "Observações externas e verificações reversíveis: cabos, espaço em disco, atualizações, temperatura, ruído.",
  },
  {
    nivel: "Exige atenção",
    desc: "Procedimentos reversíveis mas com pré-requisito — como alterar ordem de boot só depois de anotar a configuração original.",
  },
  {
    nivel: "Parada obrigatória",
    desc: "Disco com ruído, cheiro de queimado, contato com líquido, dados sem cópia: continuar tentando agrava a perda.",
  },
];

interface Props {
  /** Data ISO da última revisão material da curadoria exibida na página. */
  revisadoEm: string;
  /** "completo" para o Atlas; "compacto" para hubs menores. */
  variant?: "completo" | "compacto";
}

const formatarData = (iso: string) => {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
};

export const ComoProduzimosConteudo = ({ revisadoEm, variant = "completo" }: Props) => {
  if (variant === "compacto") {
    return (
      <aside
        aria-label="Como este conteúdo é produzido"
        className="rounded-xl border border-border bg-secondary/40 p-5"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          <ShieldCheck className="mr-1.5 inline h-4 w-4 text-accent" aria-hidden="true" />
          Conteúdo de autoria institucional de {BRAND_NAME}, com revisão técnica registrada
          (última revisão material da curadoria: {formatarData(revisadoEm)}) e fontes primárias —
          Microsoft, CISA, CERT.br e fabricantes — citadas quando a afirmação depende de versão ou
          política. Procedimentos indicam o nível de risco e o momento de parar.{" "}
          <Link
            to="/guia-tecnico-informatica"
            className="font-semibold text-accent underline-offset-2 hover:underline"
          >
            Veja como o conteúdo é produzido no Atlas de Informática
          </Link>
          .
        </p>
      </aside>
    );
  }

  return (
    <section
      id="como-produzimos"
      className="scroll-mt-24"
      aria-labelledby="como-produzimos-titulo"
    >
      <h2
        id="como-produzimos-titulo"
        className="mb-4 flex items-center gap-3 text-2xl font-bold text-foreground"
      >
        <BookOpenCheck className="h-6 w-6 text-accent" aria-hidden="true" />
        Como este portal produz conteúdo técnico
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="flex items-center gap-2 font-heading text-base font-bold text-foreground">
            <Landmark className="h-4 w-4 text-accent" aria-hidden="true" />
            Autoria e revisão
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            A autoria é institucional e identificada: {BRAND_NAME} responde pelo que publica. Nenhum
            guia entra no ar sem revisão técnica registrada, e um conteúdo só é listado nas trilhas
            deste Atlas depois de aprovado no registro editorial — rascunho não aparece aqui.
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <CalendarCheck2 className="h-4 w-4 text-accent" aria-hidden="true" />
            Última revisão material desta curadoria: {formatarData(revisadoEm)}. Datas só mudam com
            alteração material, nunca para simular atualização.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-heading text-base font-bold text-foreground">Fontes primárias</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Afirmação ligada a versão, política, firmware ou suporte exige fonte primária com data
            de consulta. As referências recorrentes são:
          </p>
          <ul className="mt-2 space-y-1.5">
            {FONTES_PRIMARIAS.map((f) => (
              <li key={f.nome} className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{f.nome}</span> — {f.uso}.
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-card p-5">
        <h3 className="font-heading text-base font-bold text-foreground">
          Nível de risco declarado em todo procedimento
        </h3>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {NIVEIS_DE_RISCO.map((n) => (
            <div key={n.nivel} className="rounded-lg border border-border bg-background p-4">
              <p className="font-heading text-sm font-bold text-foreground">{n.nivel}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{n.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-5">
        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Aviso de segurança:</span> nenhum guia
          deste portal orienta a desativar permanentemente Secure Boot, antivírus ou outras
          proteções do sistema. Comandos de terminal e procedimentos físicos têm o risco sinalizado
          no próprio texto, e conteúdo sem fonte primária fica restrito a conhecimento estável, com
          esse limite declarado. Encontrou algo a corrigir? Use a{" "}
          <Link to="/contato" className="font-semibold text-accent underline-offset-2 hover:underline">
            página de contato
          </Link>
          . O método completo, os clusters técnicos e as fontes primárias de cada tema estão
          reunidos na{" "}
          <Link
            to="/autoridade-tecnica"
            className="font-semibold text-accent underline-offset-2 hover:underline"
          >
            página de autoridade técnica
          </Link>
          .
        </p>
      </div>
    </section>
  );
};
