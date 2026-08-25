import { useEffect, useMemo, useState } from "react";
import { Link } from "@/lib/router-compat";
import { PageSEO } from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TermosCtaLink } from "@/components/TermosCtaLink";
import { TermosOs } from "@/components/os/TermosOs";
import { LocalidadeInput } from "@/components/funnel/LocalidadeInput";
import { geoSuggestion, subscribeGeo } from "@/lib/geoContext";
import { trackCTAClick } from "@/lib/analytics";
import { toast } from "sonner";
import {
  decidirModalidadeOs,
  gerarCodigoOs,
  montarMensagemOs,
  termosDaModalidade,
} from "@/lib/os/modalidadeOs";
import { findOsRecord, isValidOsNumero, normalizeOsNumero, saveOsRecord } from "@/lib/osRegistry";

interface OsForm {
  nome: string;
  local: string;
  equipamento: string;
  marcaModelo: string;
  acessorios: string;
  problema: string;
  liga: "sim" | "nao";
}

const OrdemDeServico = () => {
  const [form, setForm] = useState<OsForm>(() => ({
    nome: "",
    local: geoSuggestion(),
    equipamento: "",
    marcaModelo: "",
    acessorios: "",
    problema: "",
    liga: "sim",
  }));
  const [aceitos, setAceitos] = useState<Record<string, boolean>>({});
  const [codigo, setCodigo] = useState<string | null>(null);

  // Consulta por código único
  const [consulta, setConsulta] = useState("");
  const [resultado, setResultado] = useState<
    { estado: "invalido" | "nao-encontrado" } | { estado: "ok"; protocolo: string; criadoEm: number } | null
  >(null);

  useEffect(() => {
    const unsubscribe = subscribeGeo(() => {
      const sugestao = geoSuggestion();
      if (!sugestao) return;
      setForm((p) => (p.local.trim() ? p : { ...p, local: sugestao }));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const set = (k: keyof OsForm) => (v: string) => setForm((p) => ({ ...p, [k]: v } as OsForm));

  const decisao = useMemo(
    () =>
      decidirModalidadeOs({
        equipamento: form.equipamento,
        problema: form.problema,
        liga: form.liga === "sim",
      }),
    [form.equipamento, form.problema, form.liga],
  );

  const blocos = useMemo(() => termosDaModalidade(decisao.modalidade.id), [decisao.modalidade.id]);
  const todosAceitos = blocos.every((b) => aceitos[b.id]);

  const camposOk =
    form.nome.trim().length >= 2 &&
    form.equipamento.trim().length >= 2 &&
    form.problema.trim().length >= 8;
  const pronta = camposOk && todosAceitos;

  const mensagem = (cod: string) =>
    montarMensagemOs({
      codigo: cod,
      nome: form.nome.trim(),
      local: form.local.trim(),
      equipamento: form.equipamento.trim(),
      marcaModelo: form.marcaModelo.trim(),
      acessorios: form.acessorios.trim(),
      problema: form.problema.trim(),
      liga: form.liga === "sim",
      decisao,
      aceites: blocos.map((b) => b.aceite),
    });

  const garantirCodigo = () => {
    if (codigo) return codigo;
    const novo = gerarCodigoOs();
    setCodigo(novo);
    saveOsRecord({
      protocolo: novo,
      criadoEm: Date.now(),
      servico: form.equipamento.trim() || "Atendimento técnico",
      modelo: form.marcaModelo.trim() || undefined,
      cidade: form.local.trim() || undefined,
      modalidade: decisao.modalidade.titulo,
    });
    return novo;
  };

  const enviar = () => {
    if (!pronta) return;
    const cod = garantirCodigo();
    trackCTAClick("whatsapp", "ordem-de-servico");
    window.dispatchEvent(
      new CustomEvent("wa-funnel:open", {
        detail: { location: "ordem-de-servico", message: mensagem(cod) },
      }),
    );
  };

  const copiar = async () => {
    if (!pronta) return;
    const cod = garantirCodigo();
    try {
      await navigator.clipboard.writeText(mensagem(cod));
      toast.success("Ordem copiada — cole no WhatsApp.");
    } catch {
      toast.error("Não foi possível copiar. Selecione o texto do resumo abaixo.");
    }
  };

  const consultar = () => {
    const alvo = normalizeOsNumero(consulta);
    if (!isValidOsNumero(alvo)) {
      setResultado({ estado: "invalido" });
      return;
    }
    const found = findOsRecord(alvo);
    setResultado(
      found ? { estado: "ok", protocolo: found.protocolo, criadoEm: found.criadoEm } : { estado: "nao-encontrado" },
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Ordem de serviço | O Técnico de Informática"
        description="Abra uma ordem de serviço com modalidade, condições e código único, ou consulte o andamento de uma OS já aberta."
        path="/ordem-de-servico"
        noindex
      />
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Ordem de serviço
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Abra uma nova OS com as condições já alinhadas ou consulte uma existente pelo código único.
        </p>

        <Tabs defaultValue="abrir" className="mt-8">
          <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:inline-grid">
            <TabsTrigger value="abrir">Abrir O.S</TabsTrigger>
            <TabsTrigger value="consultar">Consultar O.S</TabsTrigger>
          </TabsList>

          {/* ── ABRIR ─────────────────────────────────────────── */}
          <TabsContent value="abrir" className="mt-8 space-y-8">
            <section className="grid gap-5">
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="os-nome">Seu nome</Label>
                  <Input
                    id="os-nome"
                    value={form.nome}
                    onChange={(e) => set("nome")(e.target.value)}
                    placeholder="Como podemos te chamar?"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="os-local">Bairro e cidade</Label>
                  <LocalidadeInput
                    id="os-local"
                    value={form.local}
                    onChange={set("local")}
                    placeholder="Ex.: Batel, Curitiba"
                  />
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="os-equip">Equipamento</Label>
                  <Input
                    id="os-equip"
                    value={form.equipamento}
                    onChange={(e) => set("equipamento")(e.target.value)}
                    placeholder="Notebook, PC, TV, monitor..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="os-modelo">Marca e modelo</Label>
                  <Input
                    id="os-modelo"
                    value={form.marcaModelo}
                    onChange={(e) => set("marcaModelo")(e.target.value)}
                    placeholder="Ex.: Dell Inspiron 15"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="os-problema">O que está acontecendo</Label>
                <Textarea
                  id="os-problema"
                  rows={4}
                  value={form.problema}
                  onChange={(e) => set("problema")(e.target.value)}
                  placeholder="Descreva o defeito, quando começou e o que já foi tentado."
                />
              </div>

              <fieldset className="grid gap-3">
                <legend className="text-sm font-medium text-foreground">
                  O equipamento liga e funciona?
                </legend>
                <RadioGroup
                  value={form.liga}
                  onValueChange={(v) => setForm((p) => ({ ...p, liga: v as "sim" | "nao" }))}
                  className="flex flex-wrap gap-4"
                >
                  <label className="flex cursor-pointer items-center gap-2 text-sm" htmlFor="liga-sim">
                    <RadioGroupItem id="liga-sim" value="sim" /> Sim, liga normalmente
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-sm" htmlFor="liga-nao">
                    <RadioGroupItem id="liga-nao" value="nao" /> Não liga ou não funciona
                  </label>
                </RadioGroup>
              </fieldset>

              <div className="grid gap-2">
                <Label htmlFor="os-acess">Acessórios entregues (opcional)</Label>
                <Input
                  id="os-acess"
                  value={form.acessorios}
                  onChange={(e) => set("acessorios")(e.target.value)}
                  placeholder="Fonte, cabo, controle, mouse..."
                />
              </div>
            </section>

            {/* Modalidade decidida automaticamente */}
            <section
              className="rounded-xl border border-accent/40 bg-accent/5 p-5"
              data-testid="os-modalidade"
              data-modalidade={decisao.modalidade.id}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                Modalidade definida pelo caso
              </p>
              <h2 className="mt-1 font-heading text-xl font-semibold text-foreground">
                {decisao.modalidade.titulo}
              </h2>
              <p className="mt-1 text-lg font-bold text-foreground">
                {decisao.modalidade.valorLabel}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  — {decisao.modalidade.valorNota}
                </span>
              </p>
              <p className="mt-3 text-sm text-foreground/80">{decisao.motivo}</p>
              <p className="mt-2 text-sm text-muted-foreground">{decisao.modalidade.escopo}</p>
              <p className="mt-2 text-sm text-muted-foreground">{decisao.modalidade.prazo}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {decisao.modalidade.itens.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent" aria-hidden="true">▸</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <div>
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  Termos e condições desta OS
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Leia cada bloco e marque o aceite. Sem todos os aceites a ordem não é gerada.
                </p>
              </div>
              <TermosOs
                blocos={blocos}
                aceitos={aceitos}
                onToggle={(id, v) => setAceitos((p) => ({ ...p, [id]: v }))}
              />
              <TermosCtaLink />
            </section>

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={enviar} disabled={!pronta} data-cta-location="ordem-de-servico">
                Enviar esta O.S no WhatsApp
              </Button>
              <Button variant="outline" onClick={copiar} disabled={!pronta}>
                Copiar resumo
              </Button>
              {!pronta ? (
                <p className="text-sm text-muted-foreground" role="status">
                  {camposOk
                    ? "Marque todos os aceites para liberar o envio."
                    : "Preencha nome, equipamento e a descrição do problema."}
                </p>
              ) : null}
            </div>

            {codigo ? (
              <section className="rounded-xl border border-border bg-card p-6" data-testid="os-documento">
                <h2 className="font-heading text-lg font-semibold text-foreground">
                  Código único: {codigo}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Guarde este código — ele identifica sua OS na consulta de status.
                </p>
                <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/80">
                  {mensagem(codigo)}
                </pre>
              </section>
            ) : null}
          </TabsContent>

          {/* ── CONSULTAR ─────────────────────────────────────── */}
          <TabsContent value="consultar" className="mt-8 space-y-5">
            <div className="grid gap-2">
              <Label htmlFor="os-consulta">Código único da O.S</Label>
              <div className="flex flex-wrap gap-3">
                <Input
                  id="os-consulta"
                  value={consulta}
                  onChange={(e) => setConsulta(e.target.value)}
                  placeholder="OS-OTI-20260825-1234"
                  className="max-w-xs"
                />
                <Button onClick={consultar}>Consultar</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                O código aparece no resumo gerado na abertura da OS.
              </p>
            </div>

            {resultado?.estado === "invalido" ? (
              <p className="rounded-lg border border-border bg-card p-4 text-sm text-foreground/80" role="status">
                Código fora do formato esperado (OS-OTI-AAAAMMDD-0000). Confira e tente de novo.
              </p>
            ) : null}
            {resultado?.estado === "nao-encontrado" ? (
              <p className="rounded-lg border border-border bg-card p-4 text-sm text-foreground/80" role="status">
                Não encontramos esse código neste navegador. A consulta completa fica em{" "}
                <Link to="/status-da-ordem-de-servico" className="underline">
                  status da ordem de serviço
                </Link>
                , onde também é possível consultar pelo celular do cadastro.
              </p>
            ) : null}
            {resultado?.estado === "ok" ? (
              <div className="rounded-xl border border-border bg-card p-5" data-testid="os-consulta-ok">
                <p className="font-heading text-lg font-semibold text-foreground">
                  OS {resultado.protocolo} localizada
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Aberta em {new Date(resultado.criadoEm).toLocaleString("pt-BR")}.
                </p>
                <Link
                  to="/status-da-ordem-de-servico"
                  className="mt-4 inline-flex text-sm font-medium text-accent underline"
                >
                  Ver linha do tempo completa
                </Link>
              </div>
            ) : null}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default OrdemDeServico;
