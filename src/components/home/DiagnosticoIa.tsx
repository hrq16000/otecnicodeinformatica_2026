import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sugerirServico, type DiagnosticoIa as Resultado } from "@/lib/diagnosticoIa.functions";

const MODALIDADE: Record<Resultado["modalidade"], string> = {
  remoto: "Atendimento remoto",
  domicilio: "Visita técnica",
  coleta: "Coleta para bancada",
};

export function DiagnosticoIa() {
  const sugerir = useServerFn(sugerirServico);
  const [descricao, setDescricao] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [res, setRes] = useState<Resultado | null>(null);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (descricao.trim().length < 10 || carregando) return;
    setCarregando(true);
    setErro(null);
    setRes(null);
    try {
      const r = await sugerir({ data: { descricao } });
      setRes(r);
      // Grava a descrição em /admin/funnel (best-effort, sem bloquear a tela).
      import("@/lib/funnelSubmission").then(({ recordSubmission, getSessionId }) =>
        recordSubmission({
          sessionId: getSessionId(),
          equipamento: "descricao_ia",
          sintoma: r.nome,
          ctaLocation: "home_diagnostico_ia",
          waMessage: `[Descrição do visitante]\n${descricao.trim().slice(0, 1200)}\n\n[Sugestão] ${r.nome} (${r.href})`,
        }),
      ).catch(() => {});
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível analisar agora.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section aria-labelledby="diag-ia-titulo" className="py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <h2 id="diag-ia-titulo" className="text-2xl font-semibold text-foreground md:text-3xl">
          Conte o que o computador está fazendo
        </h2>
        <p className="mt-2 text-muted-foreground">
          Descreva o sintoma com suas palavras. A análise automática indica o serviço mais provável — a confirmação vem no diagnóstico.
        </p>
        <form onSubmit={enviar} className="mt-6 space-y-3">
          <Textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            maxLength={1200}
            rows={4}
            placeholder="Ex.: meu notebook liga, mas a tela fica preta e a ventoinha faz barulho alto."
            aria-label="Descreva o problema"
          />
          <Button type="submit" disabled={carregando || descricao.trim().length < 10}>
            {carregando ? "Analisando…" : "Indicar serviço"}
          </Button>
        </form>
        {erro && <p role="alert" className="mt-4 text-destructive">{erro}</p>}
        {res && (
          <div className="mt-6 rounded-lg border border-border bg-card p-5" aria-live="polite">
            <p className="text-sm text-muted-foreground">Serviço mais adequado</p>
            <p className="text-xl font-semibold text-foreground">{res.nome}</p>
            <p className="mt-2 text-foreground">{res.motivo}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              <strong className="text-foreground">Antes de tudo, verifique:</strong> {res.verificacaoSegura}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Modalidade sugerida: {MODALIDADE[res.modalidade]}</p>
            <Button asChild variant="outline" className="mt-4">
              <Link to={res.href as "/"}>Ver o serviço</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
