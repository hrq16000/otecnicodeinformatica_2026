import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Link } from "@/lib/router-compat";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import {
  deletePartnerPhoto,
  getMyPartner,
  getMyPartnerPhotos,
  resolvePhotoUrl,
  updateMyPartner,
  uploadPartnerPhoto,
  type MyPartner,
  type PartnerPhoto,
} from "@/lib/partnersApi";
import { ImagePlus, LogOut, ShieldCheck, Trash2 } from "lucide-react";
import type { Session } from "@supabase/supabase-js";

const ESPECIALIDADES = [
  "Manutenção de computador",
  "Manutenção de notebook",
  "Formatação e sistemas",
  "Redes e Wi-Fi",
  "Recuperação de dados",
  "Conserto de placa eletrônica",
  "Conserto de TV",
  "Conserto de monitor",
  "Impressoras",
  "CFTV e câmeras",
  "Suporte para empresas",
];

const FORMAS = [
  "Atendimento a domicílio",
  "Bancada / laboratório",
  "Atendimento remoto",
  "Coleta e entrega",
];

const STATUS_TEXTO: Record<string, string> = {
  iniciado: "Cadastro iniciado — ainda não enviado para análise.",
  aguardando_analise: "Em análise. Enquanto isso o perfil não aparece na rede.",
  aprovado: "Aprovado. A publicação é liberada assim que o plano é confirmado.",
  ativo: "Ativo e visível na rede de profissionais.",
  vencido: "Plano vencido — o perfil saiu do ar até a renovação.",
  suspenso: "Perfil suspenso. Fale com a administração pelo WhatsApp do portal.",
};

const inputClass =
  "mt-1 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring";

const toggle = (lista: string[], valor: string) =>
  lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor];

type FotoExibida = PartnerPhoto & { preview: string | null };

/**
 * ÁREA DO PROFISSIONAL PARCEIRO.
 * O parceiro entra com a própria conta, edita o que é dele e envia fotos de
 * trabalhos reais. Situação do cadastro, plano e notas administrativas são
 * apenas leitura — quem decide isso é a análise, não o próprio parceiro.
 */
const AreaParceiro = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [carregandoSessao, setCarregandoSessao] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setCarregandoSessao(false);
    });
    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCarregandoSessao(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Área do profissional parceiro | Perfil e portfólio"
        description="Espaço do profissional parceiro para editar o próprio perfil público e publicar fotos de trabalhos reais."
        path="/parceiro"
        noindex
      />
      <Header />

      <main className="container mx-auto py-12 md:py-16">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Área do profissional parceiro
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Aqui você mantém seu perfil público atualizado e mostra fotos de trabalhos reais. Só você
          edita o que é seu.
        </p>

        {carregandoSessao ? (
          <p className="mt-10 text-muted-foreground">Verificando acesso…</p>
        ) : session ? (
          <PainelParceiro email={session.user.email ?? ""} />
        ) : (
          <FormularioAcesso />
        )}
      </main>

      <Footer />
    </div>
  );
};

/** Entrada e criação de conta por e-mail e senha. */
const FormularioAcesso = () => {
  const [modo, setModo] = useState<"entrar" | "criar">("entrar");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [aviso, setAviso] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    setErro(null);
    setAviso(null);
    setEnviando(true);

    if (modo === "entrar") {
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
      setEnviando(false);
      if (error) setErro("E-mail ou senha não conferem.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: { emailRedirectTo: `${window.location.origin}/parceiro` },
    });
    setEnviando(false);
    if (error) {
      setErro("Não foi possível criar a conta agora. Verifique o e-mail e tente novamente.");
      return;
    }
    setAviso("Conta criada. Se pedirmos confirmação, verifique seu e-mail antes de entrar.");
  };

  return (
    <div className="mt-10 max-w-md rounded-2xl border border-border bg-card p-6">
      <h2 className="font-heading text-xl font-bold text-foreground">
        {modo === "entrar" ? "Entrar na sua área" : "Criar conta de parceiro"}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Use o mesmo e-mail em todas as etapas: é ele que liga a conta ao seu cadastro.
      </p>

      <form onSubmit={enviar} className="mt-5 space-y-4">
        <label className="block text-sm font-semibold text-foreground">
          E-mail
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block text-sm font-semibold text-foreground">
          Senha
          <input
            required
            type="password"
            minLength={8}
            autoComplete={modo === "entrar" ? "current-password" : "new-password"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={inputClass}
          />
        </label>

        {erro && (
          <p role="alert" className="text-sm font-semibold text-destructive">
            {erro}
          </p>
        )}
        {aviso && <p className="text-sm text-muted-foreground">{aviso}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-accent px-6 font-heading font-bold text-accent-foreground disabled:opacity-60"
        >
          {enviando ? "Enviando…" : modo === "entrar" ? "Entrar" : "Criar conta"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setModo(modo === "entrar" ? "criar" : "entrar")}
        className="mt-4 text-sm font-bold text-accent"
      >
        {modo === "entrar" ? "Ainda não tenho conta" : "Já tenho conta"}
      </button>
    </div>
  );
};

/** Painel do parceiro autenticado: perfil e portfólio. */
const PainelParceiro = ({ email }: { email: string }) => {
  const [estado, setEstado] = useState<"carregando" | "sem-cadastro" | "ok">("carregando");
  const [parceiro, setParceiro] = useState<MyPartner | null>(null);
  const [fotos, setFotos] = useState<FotoExibida[]>([]);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const [form, setForm] = useState({
    descricao: "",
    experiencia: "",
    horario: "",
    whatsapp: "",
    site_url: "",
    servicos: "",
    regioes_atendidas: "",
  });
  const [especialidades, setEspecialidades] = useState<string[]>([]);
  const [formas, setFormas] = useState<string[]>([]);

  const carregarFotos = useCallback(async () => {
    const lista = await getMyPartnerPhotos();
    const comPreview = await Promise.all(
      lista.map(async (f) => ({ ...f, preview: await resolvePhotoUrl(f.url) })),
    );
    setFotos(comPreview);
  }, []);

  useEffect(() => {
    let ativo = true;
    void getMyPartner().then(async (p) => {
      if (!ativo) return;
      if (!p) {
        setEstado("sem-cadastro");
        return;
      }
      setParceiro(p);
      setForm({
        descricao: p.descricao ?? "",
        experiencia: p.experiencia ?? "",
        horario: p.horario ?? "",
        whatsapp: p.whatsapp ?? "",
        site_url: p.site_url ?? "",
        servicos: (p.servicos ?? []).join("\n"),
        regioes_atendidas: (p.regioes_atendidas ?? []).join(", "),
      });
      setEspecialidades(p.especialidades ?? []);
      setFormas(p.formas_atendimento ?? []);
      setEstado("ok");
      await carregarFotos();
    });
    return () => {
      ativo = false;
    };
  }, [carregarFotos]);

  const campo = (k: keyof typeof form) => ({
    value: form[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value.slice(0, 4000) })),
  });

  const salvar = async (e: FormEvent) => {
    e.preventDefault();
    if (!parceiro) return;
    setSalvando(true);
    setErro(null);
    setMensagem(null);

    const { error } = await updateMyPartner(parceiro.id, {
      descricao: form.descricao.trim(),
      experiencia: form.experiencia.trim(),
      horario: form.horario.trim(),
      whatsapp: form.whatsapp,
      site_url: form.site_url,
      servicos: form.servicos.split("\n").map((s) => s.trim()).filter(Boolean),
      especialidades,
      regioes_atendidas: form.regioes_atendidas.split(",").map((s) => s.trim()).filter(Boolean),
      formas_atendimento: formas,
    });

    setSalvando(false);
    if (error) {
      setErro("Não foi possível salvar agora. Revise os campos e tente novamente.");
      return;
    }
    setMensagem("Perfil atualizado.");
  };

  const enviarFoto = async (arquivo: File, legenda: string) => {
    if (!parceiro) return;
    setErro(null);
    const { error } = await uploadPartnerPhoto(parceiro.id, arquivo, legenda);
    if (error) {
      setErro("A foto não pôde ser enviada. Use JPG, PNG ou WebP com até 5 MB.");
      return;
    }
    await carregarFotos();
  };

  const removerFoto = async (foto: FotoExibida) => {
    await deletePartnerPhoto(foto);
    await carregarFotos();
  };

  if (estado === "carregando") {
    return <p className="mt-10 text-muted-foreground">Carregando seu cadastro…</p>;
  }

  if (estado === "sem-cadastro") {
    return (
      <div className="mt-10 max-w-2xl rounded-2xl border border-border bg-card p-8">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Nenhum cadastro ligado a esta conta
        </h2>
        <p className="mt-3 text-muted-foreground">
          Você está autenticado como {email}, mas ainda não existe um cadastro de profissional
          vinculado. Preencha o cadastro sem sair desta conta — assim ele já nasce ligado a você.
        </p>
        <Link
          to="/profissionais/cadastro"
          className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-accent px-6 font-heading font-bold text-accent-foreground"
        >
          Preencher meu cadastro
        </Link>
        <BotaoSair />
      </div>
    );
  }

  const p = parceiro!;

  return (
    <div className="mt-10 space-y-10">
      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">{p.nome_profissional}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {p.cidade} — {p.estado}
            </p>
            <p className="mt-3 inline-flex items-start gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {STATUS_TEXTO[p.status] ?? "Situação do cadastro em avaliação."}
            </p>
            {p.plano_expira_em && (
              <p className="mt-1 text-sm text-muted-foreground">
                Plano válido até {new Date(`${p.plano_expira_em}T00:00:00`).toLocaleDateString("pt-BR")}.
              </p>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            {p.status === "ativo" && (
              <Link to={`/profissional/${p.slug}`} className="text-sm font-bold text-accent">
                Ver meu perfil público
              </Link>
            )}
            <BotaoSair />
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-heading text-2xl font-bold text-foreground">Dados do perfil</h2>
        <form onSubmit={salvar} className="mt-5 max-w-3xl space-y-6">
          <label className="block text-sm font-semibold text-foreground">
            Sobre o seu trabalho
            <textarea rows={5} maxLength={4000} className={`${inputClass} py-3`} {...campo("descricao")} />
          </label>

          <label className="block text-sm font-semibold text-foreground">
            Experiência (tempo de atuação, formação, certificações)
            <textarea rows={4} maxLength={2000} className={`${inputClass} py-3`} {...campo("experiencia")} />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-foreground">
              Horário de atendimento
              <input maxLength={200} className={inputClass} {...campo("horario")} />
            </label>
            <label className="block text-sm font-semibold text-foreground">
              WhatsApp (com DDD)
              <input inputMode="tel" maxLength={20} className={inputClass} {...campo("whatsapp")} />
            </label>
            <label className="block text-sm font-semibold text-foreground sm:col-span-2">
              Site ou rede social (opcional)
              <input type="url" maxLength={300} className={inputClass} {...campo("site_url")} />
            </label>
          </div>

          <label className="block text-sm font-semibold text-foreground">
            Serviços que você executa (um por linha)
            <textarea rows={5} maxLength={2000} className={`${inputClass} py-3`} {...campo("servicos")} />
          </label>

          <label className="block text-sm font-semibold text-foreground">
            Bairros ou cidades atendidas (separe por vírgula)
            <input maxLength={500} className={inputClass} {...campo("regioes_atendidas")} />
          </label>

          <fieldset>
            <legend className="text-sm font-semibold text-foreground">Especialidades</legend>
            <ul className="mt-3 flex flex-wrap gap-2">
              {ESPECIALIDADES.map((e) => (
                <li key={e}>
                  <button
                    type="button"
                    onClick={() => setEspecialidades((l) => toggle(l, e))}
                    aria-pressed={especialidades.includes(e)}
                    className={`min-h-11 rounded-full border px-4 text-sm ${
                      especialidades.includes(e)
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-card text-foreground"
                    }`}
                  >
                    {e}
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-foreground">Formas de atendimento</legend>
            <ul className="mt-3 flex flex-wrap gap-2">
              {FORMAS.map((f) => (
                <li key={f}>
                  <button
                    type="button"
                    onClick={() => setFormas((l) => toggle(l, f))}
                    aria-pressed={formas.includes(f)}
                    className={`min-h-11 rounded-full border px-4 text-sm ${
                      formas.includes(f)
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-card text-foreground"
                    }`}
                  >
                    {f}
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>

          {erro && (
            <p role="alert" className="text-sm font-semibold text-destructive">
              {erro}
            </p>
          )}
          {mensagem && (
            <p role="status" className="text-sm font-semibold text-accent">
              {mensagem}
            </p>
          )}

          <button
            type="submit"
            disabled={salvando}
            className="inline-flex min-h-12 items-center rounded-xl bg-accent px-6 font-heading font-bold text-accent-foreground disabled:opacity-60"
          >
            {salvando ? "Salvando…" : "Salvar alterações"}
          </button>
        </form>
      </section>

      <PortfolioParceiro fotos={fotos} onEnviar={enviarFoto} onRemover={removerFoto} />
    </div>
  );
};

/** Portfólio: fotos reais de trabalhos executados pelo parceiro. */
const PortfolioParceiro = ({
  fotos,
  onEnviar,
  onRemover,
}: {
  fotos: FotoExibida[];
  onEnviar: (arquivo: File, legenda: string) => Promise<void>;
  onRemover: (foto: FotoExibida) => Promise<void>;
}) => {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [legenda, setLegenda] = useState("");
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    if (!arquivo) return;
    setEnviando(true);
    await onEnviar(arquivo, legenda);
    setEnviando(false);
    setArquivo(null);
    setLegenda("");
  };

  return (
    <section>
      <h2 className="font-heading text-2xl font-bold text-foreground">Trabalhos realizados</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Envie apenas fotos de serviços que você mesmo executou. Nada de imagem de catálogo ou de
        terceiros — o valor do portfólio está em ser real.
      </p>

      <form onSubmit={enviar} className="mt-5 max-w-3xl space-y-4 rounded-2xl border border-border bg-card p-6">
        <label className="block text-sm font-semibold text-foreground">
          Foto (JPG, PNG ou WebP, até 5 MB)
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => setArquivo(e.target.files?.[0] ?? null)}
            className="mt-2 block w-full text-sm text-muted-foreground"
          />
        </label>
        <label className="block text-sm font-semibold text-foreground">
          Legenda (o que foi feito)
          <input
            maxLength={160}
            value={legenda}
            onChange={(e) => setLegenda(e.target.value)}
            className={inputClass}
          />
        </label>
        <button
          type="submit"
          disabled={!arquivo || enviando}
          className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-accent px-6 font-heading font-bold text-accent-foreground disabled:opacity-60"
        >
          <ImagePlus className="h-5 w-5" aria-hidden="true" />
          {enviando ? "Enviando…" : "Adicionar ao portfólio"}
        </button>
      </form>

      {fotos.length > 0 && (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fotos.map((f) => (
            <li key={f.id} className="overflow-hidden rounded-xl border border-border bg-card">
              {f.preview && (
                <img src={f.preview} alt={f.legenda ?? "Trabalho realizado"} loading="lazy" className="h-44 w-full object-cover" />
              )}
              <div className="flex items-start justify-between gap-3 p-3">
                <p className="text-xs text-muted-foreground">{f.legenda ?? "Sem legenda"}</p>
                <button
                  type="button"
                  onClick={() => void onRemover(f)}
                  aria-label="Remover foto do portfólio"
                  className="shrink-0 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

const BotaoSair = () => (
  <button
    type="button"
    onClick={() => void supabase.auth.signOut()}
    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground"
  >
    <LogOut className="h-4 w-4" aria-hidden="true" />
    Sair da conta
  </button>
);

export default AreaParceiro;
