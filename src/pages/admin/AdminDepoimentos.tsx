import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * DEPOIMENTOS REAIS — /admin/depoimentos.
 *
 * Regra editorial (AGENTS.md §8/§9): nenhum depoimento é inventado e nada é
 * exibido no portal sem (1) consentimento confirmado do cliente e (2)
 * aprovação editorial explícita. Cada transição de status é registrada em
 * `depoimentos_audit` com autor e motivo.
 */

type Status = "rascunho" | "pendente" | "aprovado" | "rejeitado" | "arquivado";

const STATUS: Status[] = ["rascunho", "pendente", "aprovado", "rejeitado", "arquivado"];

const TOM: Record<Status, "default" | "secondary" | "outline" | "destructive"> = {
  rascunho: "secondary",
  pendente: "outline",
  aprovado: "default",
  rejeitado: "destructive",
  arquivado: "secondary",
};

interface Depoimento {
  id: string;
  cliente: string;
  cidade: string | null;
  servico: string | null;
  texto: string;
  consentimento: boolean;
  consentimento_origem: string | null;
  prova_url: string | null;
  data_atendimento: string | null;
  status: Status;
  motivo_rejeicao: string | null;
  aprovado_em: string | null;
  created_at: string;
}

const VAZIO = {
  cliente: "",
  cidade: "",
  servico: "",
  texto: "",
  consentimento: false,
  consentimento_origem: "",
  prova_url: "",
  data_atendimento: "",
};

export default function AdminDepoimentos() {
  const [itens, setItens] = useState<Depoimento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<Status | "todos">("todos");
  const [busca, setBusca] = useState("");
  const [form, setForm] = useState({ ...VAZIO });
  const [salvando, setSalvando] = useState(false);

  const carregar = useCallback(async () => {
    setCarregando(true);
    const { data, error } = await supabase
      .from("depoimentos")
      .select("*")
      .order("created_at", { ascending: false });
    setCarregando(false);
    if (error) {
      setErro(error.message);
      return;
    }
    setErro(null);
    setItens((data ?? []) as Depoimento[]);
  }, []);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  async function registrarAuditoria(id: string, acao: string, de: Status | null, para: Status | null, motivo?: string) {
    const { data: sessao } = await supabase.auth.getUser();
    await supabase.from("depoimentos_audit").insert({
      depoimento_id: id,
      acao,
      de_status: de,
      para_status: para,
      motivo: motivo ?? null,
      actor_id: sessao.user?.id ?? null,
    });
  }

  async function criar() {
    if (!form.cliente.trim() || !form.texto.trim()) {
      toast.error("Cliente e texto do depoimento são obrigatórios.");
      return;
    }
    setSalvando(true);
    const { data: sessao } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("depoimentos")
      .insert({
        cliente: form.cliente.trim(),
        cidade: form.cidade.trim() || null,
        servico: form.servico.trim() || null,
        texto: form.texto.trim(),
        consentimento: form.consentimento,
        consentimento_origem: form.consentimento_origem.trim() || null,
        prova_url: form.prova_url.trim() || null,
        data_atendimento: form.data_atendimento || null,
        status: "rascunho",
        criado_por: sessao.user?.id ?? null,
      })
      .select()
      .single();
    setSalvando(false);
    if (error || !data) {
      toast.error(`Falha ao cadastrar: ${error?.message}`);
      return;
    }
    await registrarAuditoria(data.id, "criado", null, "rascunho");
    toast.success("Depoimento cadastrado como rascunho.");
    setForm({ ...VAZIO });
    void carregar();
  }

  async function mudarStatus(item: Depoimento, para: Status) {
    if (para === "aprovado" && !item.consentimento) {
      toast.error("Sem consentimento confirmado o depoimento não pode ser aprovado.");
      return;
    }
    let motivo: string | undefined;
    if (para === "rejeitado") {
      motivo = window.prompt("Motivo da rejeição (obrigatório):")?.trim() || undefined;
      if (!motivo) return;
    }
    const { data: sessao } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("depoimentos")
      .update({
        status: para,
        motivo_rejeicao: para === "rejeitado" ? (motivo ?? null) : null,
        aprovado_por: para === "aprovado" ? (sessao.user?.id ?? null) : null,
        aprovado_em: para === "aprovado" ? new Date().toISOString() : null,
      })
      .eq("id", item.id);
    if (error) {
      toast.error(`Falha na transição: ${error.message}`);
      return;
    }
    await registrarAuditoria(item.id, "transicao", item.status, para, motivo);
    toast.success(`Status atualizado para ${para}.`);
    void carregar();
  }

  async function alternarConsentimento(item: Depoimento) {
    if (item.status === "aprovado" && item.consentimento) {
      toast.error("Retire a aprovação antes de remover o consentimento.");
      return;
    }
    const { error } = await supabase
      .from("depoimentos")
      .update({ consentimento: !item.consentimento })
      .eq("id", item.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    await registrarAuditoria(item.id, item.consentimento ? "consentimento_removido" : "consentimento_confirmado", item.status, item.status);
    void carregar();
  }

  const lista = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return itens.filter((i) => {
      if (filtro !== "todos" && i.status !== filtro) return false;
      if (!termo) return true;
      return [i.cliente, i.cidade, i.servico, i.texto].some((v) => (v ?? "").toLowerCase().includes(termo));
    });
  }, [itens, filtro, busca]);

  const contagem = useMemo(
    () => STATUS.map((s) => ({ s, n: itens.filter((i) => i.status === s).length })),
    [itens],
  );

  return (
    <main className="container mx-auto px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Depoimentos de clientes</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Só entram depoimentos reais, com consentimento confirmado e aprovação editorial. Nada é publicado
          automaticamente e nenhuma avaliação é criada aqui — a exibição pública exige aprovação explícita e
          continua sujeita aos gates de confiança.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {contagem.map(({ s, n }) => (
          <Card key={s} className="p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">{s}</div>
            <div className="mt-1 text-2xl font-semibold">{n}</div>
          </Card>
        ))}
      </section>

      <Card className="mt-6 p-4">
        <h2 className="text-lg font-semibold">Novo depoimento</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Input
            aria-label="Cliente"
            placeholder="Nome ou identificador autorizado"
            value={form.cliente}
            onChange={(e) => setForm({ ...form, cliente: e.target.value })}
          />
          <Input
            aria-label="Cidade"
            placeholder="Cidade (opcional)"
            value={form.cidade}
            onChange={(e) => setForm({ ...form, cidade: e.target.value })}
          />
          <Input
            aria-label="Serviço"
            placeholder="Serviço relacionado"
            value={form.servico}
            onChange={(e) => setForm({ ...form, servico: e.target.value })}
          />
          <Input
            aria-label="Data do atendimento"
            type="date"
            value={form.data_atendimento}
            onChange={(e) => setForm({ ...form, data_atendimento: e.target.value })}
          />
          <Input
            aria-label="Origem do consentimento"
            placeholder="Origem do consentimento (ex.: WhatsApp, e-mail, OS assinada)"
            value={form.consentimento_origem}
            onChange={(e) => setForm({ ...form, consentimento_origem: e.target.value })}
          />
          <Input
            aria-label="Prova associada"
            placeholder="Prova associada (link interno da OS, print arquivado…)"
            value={form.prova_url}
            onChange={(e) => setForm({ ...form, prova_url: e.target.value })}
          />
        </div>
        <Textarea
          aria-label="Texto do depoimento"
          className="mt-3"
          rows={3}
          placeholder="Texto literal do depoimento, como o cliente escreveu"
          value={form.texto}
          onChange={(e) => setForm({ ...form, texto: e.target.value })}
        />
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.consentimento}
            onChange={(e) => setForm({ ...form, consentimento: e.target.checked })}
          />
          Consentimento de uso confirmado pelo cliente
        </label>
        <Button className="mt-3" onClick={criar} disabled={salvando}>
          {salvando ? "Salvando…" : "Cadastrar como rascunho"}
        </Button>
      </Card>

      <section className="mt-6 flex flex-wrap items-center gap-2">
        <Button size="sm" variant={filtro === "todos" ? "default" : "outline"} onClick={() => setFiltro("todos")}>
          Todos
        </Button>
        {STATUS.map((s) => (
          <Button key={s} size="sm" variant={filtro === s ? "default" : "outline"} onClick={() => setFiltro(s)}>
            {s}
          </Button>
        ))}
        <Input
          className="w-full max-w-xs"
          placeholder="Buscar cliente, cidade, serviço ou texto"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </section>

      {erro && (
        <p className="mt-4 text-sm text-destructive">
          Não foi possível carregar: {erro} (é necessário estar autenticado como admin).
        </p>
      )}

      {carregando ? (
        <div role="status" aria-live="polite" className="mt-6 text-sm text-muted-foreground">
          Carregando depoimentos…
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {lista.map((i) => (
            <li key={i.id}>
              <Card className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={TOM[i.status]}>{i.status}</Badge>
                  <Badge variant={i.consentimento ? "default" : "destructive"}>
                    {i.consentimento ? "consentimento OK" : "sem consentimento"}
                  </Badge>
                  <span className="text-sm font-medium">{i.cliente}</span>
                  {i.cidade && <span className="text-xs text-muted-foreground">{i.cidade}</span>}
                  {i.servico && <span className="text-xs text-muted-foreground">· {i.servico}</span>}
                </div>
                <p className="mt-2 text-sm">{i.texto}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {i.consentimento_origem && <>Consentimento via {i.consentimento_origem}. </>}
                  {i.prova_url && <>Prova: {i.prova_url}. </>}
                  {i.data_atendimento && <>Atendimento em {i.data_atendimento}. </>}
                  {i.aprovado_em && <>Aprovado em {new Date(i.aprovado_em).toLocaleDateString("pt-BR")}. </>}
                  {i.motivo_rejeicao && <>Rejeitado: {i.motivo_rejeicao}.</>}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => alternarConsentimento(i)}>
                    {i.consentimento ? "Remover consentimento" : "Confirmar consentimento"}
                  </Button>
                  {i.status !== "pendente" && (
                    <Button size="sm" variant="outline" onClick={() => mudarStatus(i, "pendente")}>
                      Enviar para revisão
                    </Button>
                  )}
                  {i.status !== "aprovado" && (
                    <Button size="sm" onClick={() => mudarStatus(i, "aprovado")} disabled={!i.consentimento}>
                      Aprovar
                    </Button>
                  )}
                  {i.status !== "rejeitado" && (
                    <Button size="sm" variant="destructive" onClick={() => mudarStatus(i, "rejeitado")}>
                      Rejeitar
                    </Button>
                  )}
                  {i.status !== "arquivado" && (
                    <Button size="sm" variant="ghost" onClick={() => mudarStatus(i, "arquivado")}>
                      Arquivar
                    </Button>
                  )}
                </div>
              </Card>
            </li>
          ))}
          {lista.length === 0 && (
            <li className="text-sm text-muted-foreground">
              Nenhum depoimento neste filtro. Cadastre apenas depoimentos reais, com consentimento registrado.
            </li>
          )}
        </ul>
      )}
    </main>
  );
}
