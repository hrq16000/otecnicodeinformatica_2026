/**
 * Prévia protegida da modalidade nacional na ÁREA AUTENTICADA do parceiro.
 * Sem formulário de escrita, API, checkout ou contato de cliente.
 * Só deverá ser montada quando a feature flag e o backend estiverem prontos.
 */
import {
  situacaoPainelNacional,
  type ResumoNacionalTitular,
  type SituacaoPainelNacional,
} from "@/lib/gestaoNacional/areaNacionalFeatureGate";

const ROTULOS: Record<SituacaoPainelNacional, string> = {
  nao_integrado: "Em preparação — indisponível",
  aguardando_verificacao: "Aguardando validação da modalidade",
  suspenso: "Participação suspensa",
  habilitado_indisponivel: "Validado, mas indisponível",
  habilitado_disponivel: "Disponibilidade confirmada",
};

export function PainelModalidadeNacional({
  resumo,
  backendDisponivel,
}: {
  resumo: ResumoNacionalTitular | null;
  backendDisponivel: boolean;
}) {
  const situacao = situacaoPainelNacional(resumo, backendDisponivel, new Date());
  const pronta = situacao !== "nao_integrado";

  return (
    <section
      aria-labelledby="modalidade-nacional-titulo"
      className="rounded-2xl border border-border bg-card p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Modalidade adicional — não altera seu perfil atual
          </p>
          <h2 id="modalidade-nacional-titulo" className="mt-1 font-heading text-xl font-bold text-foreground">
            Atendimento nacional entre cliente e técnico
          </h2>
        </div>
        <span
          role="status"
          className="rounded-full border border-border px-3 py-1.5 text-sm font-semibold text-foreground"
        >
          {ROTULOS[situacao]}
        </span>
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        A modalidade nacional exige confirmação de participação na comunidade,
        aprovação separada do cadastro, aceite dos termos e disponibilidade atualizada.
        O plano anual do perfil profissional permanece independente.
      </p>

      {!pronta ? (
        <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4 text-sm">
          <p className="font-semibold text-foreground">Ainda não habilitada neste portal.</p>
          <p className="mt-1 text-muted-foreground">
            O cadastro atual continua funcionando normalmente. Não há recebimento
            de solicitações, alteração de disponibilidade nacional nem cobrança
            por esta interface enquanto o sistema seguro não for ativado.
          </p>
        </div>
      ) : (
        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border p-3">
            <dt className="text-xs text-muted-foreground">Comunidade de técnicos</dt>
            <dd className="mt-1 font-semibold text-foreground">
              {resumo?.comunidade === "confirmada" ? "Confirmada" : "Verificação pendente"}
            </dd>
          </div>
          <div className="rounded-xl border border-border p-3">
            <dt className="text-xs text-muted-foreground">Habilitação nacional</dt>
            <dd className="mt-1 font-semibold text-foreground">
              {resumo?.habilitacao === "validada" ? "Validada" : resumo?.habilitacao === "suspensa" ? "Suspensa" : "Pendente"}
            </dd>
          </div>
          <div className="rounded-xl border border-border p-3">
            <dt className="text-xs text-muted-foreground">Termos da modalidade</dt>
            <dd className="mt-1 font-semibold text-foreground">
              {resumo?.termos === "aceitos" ? "Aceitos" : "Ainda não aceitos"}
            </dd>
          </div>
          <div className="rounded-xl border border-border p-3">
            <dt className="text-xs text-muted-foreground">Disponibilidade</dt>
            <dd className="mt-1 font-semibold text-foreground">
              {situacao === "habilitado_disponivel" ? "Disponível" : "Indisponível"}
            </dd>
          </div>
        </dl>
      )}

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Pertencer à comunidade ou ter um perfil publicado não garante habilitação,
        encaminhamento de solicitações ou cobertura na sua cidade.
      </p>
    </section>
  );
}
