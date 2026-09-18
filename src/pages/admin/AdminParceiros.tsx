import { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  adminListPartners,
  adminUpdatePartnerStatus,
  adminUpdateProgramSettings,
  PARTNER_STATUS,
  type AdminPartner,
  type PartnerStatus,
} from "@/lib/partnersAdminApi";
import { formatarPreco, getProgramSettings, type ProgramSettings } from "@/lib/partnersApi";

/**
 * REDE DE PARCEIROS — curadoria administrativa.
 *
 * Mostra apenas cadastros reais enviados pelo formulário público. O status
 * controla a visibilidade do perfil e a validade do plano anual; nenhuma
 * informação comercial é redigitada fora da configuração do programa.
 */

const TOM: Record<PartnerStatus, "default" | "secondary" | "outline" | "destructive"> = {
  iniciado: "secondary",
  aguardando_analise: "outline",
  aprovado: "default",
  ativo: "default",
  vencido: "destructive",
  suspenso: "destructive",
};

const umAnoAFrente = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
};

export default function AdminParceiros() {
  const [itens, setItens] = useState<AdminPartner[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<PartnerStatus | "todos">("todos");
  const [busca, setBusca] = useState("");
  const [rascunho, setRascunho] = useState<Record<string, { plano: string; notas: string }>>({});
  const [plano, setPlano] = useState<ProgramSettings | null>(null);
  const [salvandoPlano, setSalvandoPlano] = useState(false);

  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const [lista, settings] = await Promise.all([adminListPartners(), getProgramSettings()]);
      setItens(lista);
      setPlano(settings);
      setErro(null);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Falha ao carregar parceiros");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  const contagem = useMemo(
    () => PARTNER_STATUS.map((s) => ({ s, n: itens.filter((i) => i.status === s).length })),
    [itens],
  );

  const visiveis = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return itens.filter((i) => {
      if (filtro !== "todos" && i.status !== filtro) return false;
      if (!termo) return true;
      return [i.nome_profissional, i.cidade, i.estado, ...i.especialidades, ...i.servicos]
        .join(" ")
        .toLowerCase()
        .includes(termo);
    });
  }, [itens, filtro, busca]);

  const campos = (p: AdminPartner) =>
    rascunho[p.id] ?? { plano: p.plano_expira_em ?? "", notas: p.notas_admin ?? "" };

  const setCampo = (id: string, chave: "plano" | "notas", valor: string) =>
    setRascunho((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? { plano: "", notas: "" }), [chave]: valor },
    }));

  const aplicar = async (p: AdminPartner, status: PartnerStatus) => {
    const { plano: expira, notas } = campos(p);
    try {
      await adminUpdatePartnerStatus({
        partnerId: p.id,
        status,
        planoExpiraEm: expira || null,
        notasAdmin: notas.trim() || null,
      });
      toast.success(`Cadastro atualizado para “${status}”.`);
      await carregar();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Não foi possível atualizar.");
    }
  };

  const salvarPlano = async () => {
    if (!plano) return;
    setSalvandoPlano(true);
    try {
      await adminUpdateProgramSettings(plano);
      toast.success("Configuração do plano atualizada.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Não foi possível salvar o plano.");
    } finally {
      setSalvandoPlano(false);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <Helmet>
        <title>Rede de parceiros | Painel administrativo</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <header>
        <h1 className="text-2xl font-bold">Rede de parceiros</h1>
        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
          Cadastros reais enviados pelo formulário público. O perfil só aparece no portal quando o
          status é “ativo”; a data de validade controla o plano anual.
        </p>
      </header>

      <Card className="mt-6 p-4">
        <h2 className="text-lg font-semibold">Plano anual do programa</h2>
        {plano ? (
          <>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div>
                <Label htmlFor="preco">Valor anual (centavos)</Label>
                <Input
                  id="preco"
                  type="number"
                  min={0}
                  value={plano.preco_anual_centavos}
                  onChange={(e) =>
                    setPlano({ ...plano, preco_anual_centavos: Number(e.target.value) || 0 })
                  }
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Exibido como {formatarPreco(plano.preco_anual_centavos, plano.moeda)}
                </p>
              </div>
              <div>
                <Label htmlFor="moeda">Moeda</Label>
                <Input
                  id="moeda"
                  value={plano.moeda}
                  onChange={(e) => setPlano({ ...plano, moeda: e.target.value.toUpperCase() })}
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={plano.aceitando_cadastros}
                    onChange={(e) => setPlano({ ...plano, aceitando_cadastros: e.target.checked })}
                  />
                  Aceitando novos cadastros
                </label>
              </div>
            </div>
            <Textarea
              className="mt-3"
              rows={2}
              aria-label="Texto do plano"
              placeholder="Texto apresentado ao profissional sobre o que o plano inclui"
              value={plano.texto_plano ?? ""}
              onChange={(e) => setPlano({ ...plano, texto_plano: e.target.value })}
            />
            <Button className="mt-3" onClick={salvarPlano} disabled={salvandoPlano}>
              {salvandoPlano ? "Salvando…" : "Salvar configuração"}
            </Button>
          </>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            Configuração do programa indisponível no momento.
          </p>
        )}
      </Card>

      <section className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {contagem.map(({ s, n }) => (
          <Card key={s} className="p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              {s.replace(/_/g, " ")}
            </div>
            <div className="mt-1 text-2xl font-semibold">{n}</div>
          </Card>
        ))}
      </section>

      <section className="mt-6 flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant={filtro === "todos" ? "default" : "outline"}
          onClick={() => setFiltro("todos")}
        >
          Todos
        </Button>
        {PARTNER_STATUS.map((s) => (
          <Button
            key={s}
            size="sm"
            variant={filtro === s ? "default" : "outline"}
            onClick={() => setFiltro(s)}
          >
            {s.replace(/_/g, " ")}
          </Button>
        ))}
        <Input
          className="ml-auto w-full sm:w-72"
          aria-label="Buscar parceiro"
          placeholder="Buscar por nome, cidade ou especialidade"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </section>

      {erro && <p className="mt-4 text-sm text-destructive">{erro}</p>}
      {carregando && <p className="mt-4 text-sm text-muted-foreground">Carregando…</p>}
      {!carregando && !erro && visiveis.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">Nenhum cadastro nesse filtro.</p>
      )}

      <div className="mt-4 space-y-4">
        {visiveis.map((p) => {
          const c = campos(p);
          return (
            <Card key={p.id} className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{p.nome_profissional}</h3>
                    <Badge variant={TOM[p.status]}>{p.status.replace(/_/g, " ")}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {p.cidade}/{p.estado} · /profissional/{p.slug}
                  </p>
                  {p.especialidades.length > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {p.especialidades.join(" · ")}
                    </p>
                  )}
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <div>Cadastro: {new Date(p.created_at).toLocaleDateString("pt-BR")}</div>
                  {p.plano_expira_em && (
                    <div>
                      Plano até: {new Date(p.plano_expira_em).toLocaleDateString("pt-BR")}
                    </div>
                  )}
                </div>
              </div>

              {p.descricao && <p className="mt-3 text-sm">{p.descricao}</p>}

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor={`plano-${p.id}`}>Plano válido até</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`plano-${p.id}`}
                      type="date"
                      value={c.plano}
                      onChange={(e) => setCampo(p.id, "plano", e.target.value)}
                    />
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setCampo(p.id, "plano", umAnoAFrente())}
                    >
                      +1 ano
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor={`notas-${p.id}`}>Notas internas</Label>
                  <Input
                    id={`notas-${p.id}`}
                    value={c.notas}
                    placeholder="Registro da análise (não aparece no portal)"
                    onChange={(e) => setCampo(p.id, "notas", e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {PARTNER_STATUS.filter((s) => s !== p.status).map((s) => (
                  <Button key={s} size="sm" variant="outline" onClick={() => aplicar(p, s)}>
                    Marcar como {s.replace(/_/g, " ")}
                  </Button>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
