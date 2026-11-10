import { ArrowRight, Building2, Home, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { Link } from "@/lib/router-compat";
import {
  CAPITAIS_BRASIL,
  LOCALIDADES_PARCEIRAS_INFORMADAS,
  TOTAL_LOCALIDADES_INFORMADAS,
} from "@/lib/coberturaNacionalData";

type Props = {
  onSolicitar: (cidade?: string, uf?: string) => void;
};

/**
 * Uma seção nacional dentro da página-mãe existente, sem gerar páginas
 * artificiais por cidade ou afirmar filiais / profissionais verificados.
 * Todo pedido entra no funil oficial antes do redirecionamento WhatsApp.
 */
export function CoberturaNacionalParceiros({ onSolicitar }: Props) {
  return (
    <section
      id="cobertura-nacional"
      aria-labelledby="cobertura-nacional-titulo"
      className="border-t border-border/60 bg-secondary/30 py-12 md:py-16"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Cobertura nacional sob consulta
          </p>
          <h2 id="cobertura-nacional-titulo" className="mt-5 text-3xl font-heading font-bold text-foreground md:text-4xl">
            Atendimento domiciliar em Curitiba e consulta de profissionais em todo o Brasil
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Em Curitiba e região, conheça nossas modalidades de atendimento no local.
            Para as demais capitais e cidades informadas por parceiros, consulte a
            disponibilidade de um profissional de informática na sua região antes
            de combinar qualquer visita. A contratação é negociada diretamente
            entre cliente e técnico independente.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onSolicitar()}
              data-cta-location="areas_nacional_hero"
              data-wa-funnel="required"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Consultar atendimento na minha cidade
            </button>
            <Link
              to="/atendimento-domicilio"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <Home className="h-5 w-5" aria-hidden="true" />
              Atendimento domiciliar em Curitiba
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-background p-5">
            <span className="text-3xl font-bold text-primary">{CAPITAIS_BRASIL.length}</span>
            <p className="mt-1 text-sm text-muted-foreground">Capitais disponíveis para consulta de viabilidade, sem promessa de agenda.</p>
          </div>
          <div className="rounded-xl border border-border bg-background p-5">
            <span className="text-3xl font-bold text-primary">{TOTAL_LOCALIDADES_INFORMADAS}</span>
            <p className="mt-1 text-sm text-muted-foreground">Cidades com referência de parceiros informada, ainda sujeitas a confirmação.</p>
          </div>
          <div className="rounded-xl border border-border bg-background p-5">
            <span className="inline-flex items-center gap-2 text-lg font-bold text-primary">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              Negociação direta
            </span>
            <p className="mt-2 text-sm text-muted-foreground">A plataforma não promete despacho, atendimento imediato nem equipe própria em cada município.</p>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-heading font-bold text-foreground">Consulte atendimento nas capitais brasileiras</h3>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Selecione uma capital para iniciar a triagem. A lista representa regiões de consulta,
            não confirma que já exista um técnico cadastrado e disponível em todas elas.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CAPITAIS_BRASIL.map((item) => (
              <li key={item.uf}>
                <button
                  type="button"
                  onClick={() => onSolicitar(item.cidade, item.uf)}
                  data-wa-funnel="required"
                  data-cta-location={`areas_capital_${item.uf.toLowerCase()}`}
                  aria-label={`Verificar técnico em ${item.cidade}, ${item.uf}`}
                  className="flex min-h-14 w-full items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left transition-colors hover:border-accent/50 hover:bg-accent/5"
                >
                  <span className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span className="font-medium text-foreground">{item.cidade}</span>
                  </span>
                  <span className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    {item.uf}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-heading font-bold text-foreground">Cidades informadas pela rede de parceiros</h3>
          <p className="mt-2 max-w-4xl text-muted-foreground">
            As localidades abaixo foram informadas como referência de atuação de parceiros.
            Elas não equivalem automaticamente a cadastro validado, disponibilidade em tempo real,
            atendimento garantido ou endereço de estabelecimento. Abra um estado e consulte a cidade desejada.
          </p>
          <div className="mt-6 grid items-start gap-4 md:grid-cols-2">
            {LOCALIDADES_PARCEIRAS_INFORMADAS.map((grupo) => (
              <details key={grupo.uf} className="group rounded-xl border border-border bg-background p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                  <span className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-accent" aria-hidden="true" />
                    {grupo.estado} ({grupo.uf})
                  </span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                    {grupo.cidades.length} {grupo.cidades.length === 1 ? "cidade" : "cidades"}
                  </span>
                </summary>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {grupo.cidades.map((cidade) => (
                    <li key={cidade}>
                      <button
                        type="button"
                        onClick={() => onSolicitar(cidade, grupo.uf)}
                        data-wa-funnel="required"
                        data-cta-location={`areas_parceiro_${grupo.uf.toLowerCase()}`}
                        aria-label={`Consultar atendimento em ${cidade}, ${grupo.uf}`}
                        className="inline-flex min-h-10 items-center rounded-full border border-accent/30 bg-accent/5 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent/15"
                      >
                        {cidade}
                      </button>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>

        <p className="mt-8 rounded-xl border border-border bg-background p-5 text-sm leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Como funciona:</strong> informe sua cidade, equipamento e
          problema na triagem. Primeiro verificamos se há possibilidade de atendimento presencial
          ou remoto. Antes de qualquer serviço, confirme condições, deslocamento, agenda e
          valores com o profissional. Nenhum telefone particular de parceiro é divulgado nesta lista.
        </p>
      </div>
    </section>
  );
}
