import { useMemo, useState } from "react";
import { Link } from "@/lib/router-compat";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { exportarCsv } from "@/lib/exportarRelatorio";

import { registrarAuditoria } from "@/lib/adminAudit";
import {
  BAIRROS_MALHA,
  REGIOES_MALHA,
  RESUMO_MALHA,
  type BairroMalha,
  type ContentStatus,
} from "@/lib/bairrosMalha";

type Filtro = "TODOS" | ContentStatus;

/**
 * GOVERNANÇA DA MALHA GEOGRÁFICA — /admin/bairros
 *
 * Lista todas as rotas territoriais com o status de conteúdo vigente
 * (SHALLOW = noindex e fora do sitemap; RICH = indexável e no sitemap).
 *
 * A promoção é deliberada e em duas etapas (double opt-in): o painel apenas
 * registra o pedido auditado; a indexação só muda quando `localIndexPolicy`
 * é atualizada e publicada. Nada aqui altera robots em tempo de execução —
 * o comportamento fail-closed da política central é preservado.
 */
const AdminBairros = () => {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("TODOS");
  const [alvo, setAlvo] = useState<BairroMalha | null>(null);
  const [confirmacao, setConfirmacao] = useState("");
  const [enviando, setEnviando] = useState(false);

  const linhas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return BAIRROS_MALHA.filter((b) => {
      if (filtro !== "TODOS" && b.contentStatus !== filtro) return false;
      if (!termo) return true;
      return (
        b.nome.toLowerCase().includes(termo) ||
        b.slug.includes(termo) ||
        b.cidade.toLowerCase().includes(termo) ||
        b.regiaoNome.toLowerCase().includes(termo)
      );
    });
  }, [busca, filtro]);

  const confirmar = async () => {
    if (!alvo) return;
    setEnviando(true);
    await registrarAuditoria({
      area: "bairros",
      action: "solicitou_promocao_rich",
      target: alvo.path,
      details: {
        slug: alvo.slug,
        regiao: alvo.regiao,
        cidade: alvo.cidade,
        statusAtual: alvo.contentStatus,
      },
    });
    setEnviando(false);
    setAlvo(null);
    setConfirmacao("");
    toast.success("Pedido de promoção registrado", {
      description:
        "A página só passa a indexável depois da atualização da política central e do próximo deploy.",
    });
  };

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-heading text-2xl font-semibold text-foreground">Malha de bairros</h1>
      <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
        {RESUMO_MALHA.total} rotas territoriais ativas — {RESUMO_MALHA.rich} indexáveis (RICH) e{" "}
        {RESUMO_MALHA.shallow} rasas (SHALLOW, com <code>noindex</code> e fora do sitemap). Todas
        respondem 200 e distribuem links internos.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Filtrar por bairro, cidade ou região"
          className="max-w-xs"
          aria-label="Filtrar rotas de bairro"
        />
        {(["TODOS", "RICH", "SHALLOW"] as Filtro[]).map((f) => (
          <Button
            key={f}
            type="button"
            variant={filtro === f ? "default" : "outline"}
            size="sm"
            onClick={() => setFiltro(f)}
          >
            {f}
          </Button>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            exportarCsv(
              "malha-bairros",
              linhas.map((b) => ({
                nome: b.nome,
                slug: b.slug,
                cidade: b.cidade,
                regiao: b.regiaoNome,
                path: b.path,
                contentStatus: b.contentStatus,
              })),
            )
          }
        >
          Exportar CSV
        </Button>
      </div>


      <Card className="mt-6 overflow-x-auto p-0">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Bairro</th>
              <th className="px-4 py-3">Região</th>
              <th className="px-4 py-3">Cidade</th>
              <th className="px-4 py-3">Rota</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Ação</th>
            </tr>
          </thead>
          <tbody>
            {linhas.map((b) => (
              <tr key={b.path} className="border-t border-border/60">
                <td className="px-4 py-3 font-medium text-foreground">{b.nome}</td>
                <td className="px-4 py-3 text-muted-foreground">{b.regiaoNome}</td>
                <td className="px-4 py-3 text-muted-foreground">{b.cidade}</td>
                <td className="px-4 py-3">
                  <Link to={b.path} className="text-accent underline-offset-4 hover:underline">
                    {b.path}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      b.contentStatus === "RICH"
                        ? "rounded px-2 py-1 text-xs font-semibold bg-emerald-500/15 text-emerald-500"
                        : "rounded px-2 py-1 text-xs font-semibold bg-amber-500/15 text-amber-500"
                    }
                  >
                    {b.contentStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {b.contentStatus === "SHALLOW" ? (
                    <Button type="button" size="sm" variant="outline" onClick={() => setAlvo(b)}>
                      Promover para RICH
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">no sitemap</span>
                  )}
                </td>
              </tr>
            ))}
            {linhas.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  Nenhuma rota corresponde ao filtro.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {REGIOES_MALHA.map((r) => (
          <Card key={r.id} className="p-4">
            <h2 className="text-sm font-semibold text-foreground">{r.nome}</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {r.bairros.length} rotas ·{" "}
              {r.bairros.filter((b) => b.contentStatus === "RICH").length} indexáveis
            </p>
          </Card>
        ))}
      </section>

      <AlertDialog
        open={alvo !== null}
        onOpenChange={(aberto) => {
          if (!aberto) {
            setAlvo(null);
            setConfirmacao("");
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Promover {alvo?.nome} para RICH?</AlertDialogTitle>
            <AlertDialogDescription>
              Só promova quando a página já tiver conteúdo próprio (texto local denso, fotos reais
              e FAQ). Este passo registra o pedido auditado; a indexação efetiva depende da
              atualização da política central e do próximo deploy. Digite{" "}
              <strong>PROMOVER</strong> para confirmar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            value={confirmacao}
            onChange={(e) => setConfirmacao(e.target.value)}
            placeholder="PROMOVER"
            aria-label="Confirmação de promoção"
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              disabled={confirmacao.trim().toUpperCase() !== "PROMOVER" || enviando}
              onClick={(e) => {
                e.preventDefault();
                void confirmar();
              }}
            >
              Confirmar promoção
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default AdminBairros;
