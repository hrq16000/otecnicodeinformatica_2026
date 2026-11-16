import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Camera,
  Clock3,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import { commercialConfig } from "@/lib/config/commercial";
import { abrirTriagemWhatsApp, eutBridgeConfig } from "@/lib/config/eutBridge";

type DadosTriagem = {
  nome: string;
  cidade: string;
  bairro: string;
  equipamento: string;
  modelo: string;
  problema: string;
  inicio: string;
  tentativas: string;
  urgencia: string;
  modalidade: string;
};

const DADOS_INICIAIS: DadosTriagem = {
  nome: "",
  cidade: "",
  bairro: "",
  equipamento: "",
  modelo: "",
  problema: "",
  inicio: "",
  tentativas: "",
  urgencia: "Hoje, se houver disponibilidade",
  modalidade: "A definir na triagem",
};

const fieldClass =
  "mt-1.5 min-h-11 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20";

/**
 * Entrada comercial do ecossistema:
 * - cadastro e busca passam ao Encontre um Técnico;
 * - triagem local monta mensagem somente no dispositivo do visitante;
 * - sem upload, banco ou coleta silenciosa de dados.
 * Fotos são anexadas pelo próprio cliente na conversa do WhatsApp.
 */
export const RedeETriagemSection = () => {
  const [dados, setDados] = useState<DadosTriagem>(DADOS_INICIAIS);

  const alterar = (campo: keyof DadosTriagem, valor: string) =>
    setDados((anterior) => ({ ...anterior, [campo]: valor }));

  const abrirTriagem = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const mensagem = [
      "Olá! Vim pelo portal O Técnico de Informática e preciso de triagem.",
      "",
      "*SOLICITAÇÃO DE ATENDIMENTO*",
      `Nome: ${dados.nome.trim()}`,
      `Cidade: ${dados.cidade.trim()}`,
      `Bairro/região: ${dados.bairro.trim() || "Não informado"}`,
      `Equipamento: ${dados.equipamento}`,
      `Marca/modelo: ${dados.modelo.trim() || "Não informado"}`,
      `O que está acontecendo: ${dados.problema.trim()}`,
      `Quando começou: ${dados.inicio.trim() || "Não informado"}`,
      `O que já tentei: ${dados.tentativas.trim() || "Não informado"}`,
      `Urgência: ${dados.urgencia}`,
      `Modalidade: ${dados.modalidade}`,
      "",
      "Posso enviar fotos do equipamento e de eventuais mensagens de erro por aqui.",
      "Gostaria de saber as opções de atendimento e o orçamento antes de confirmar.",
    ].join("\n");

    // Nunca registrar nome, bairro, modelo ou descrição em analytics.
    if (typeof window === "undefined") return;
    if (window.gtag) {
      window.gtag("event", "home_triagem_rede", {
        event_category: "engagement",
        click_location: "home_triagem_whatsapp",
        page_path: window.location.pathname,
      });
    }
    window.location.assign(abrirTriagemWhatsApp(mensagem));
  };

  return (
    <section
      id="encontre-tecnico-perto"
      className="relative isolate overflow-hidden border-y border-white/10 bg-[#092332] py-14 text-white md:py-20"
      aria-labelledby="eut-bridge-heading"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl animate-breathe"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-36 left-1/4 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl animate-breathe"
        style={{ animationDelay: "1.5s" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-cover bg-center opacity-25 lg:block"
        style={{ backgroundImage: "url('/fotos/estacao-trabalho-desktop.webp')" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#092332] via-[#092332]/95 to-[#092332]/55"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-cyan-100">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Soluções locais + rede nacional
          </p>
          <h2
            id="eut-bridge-heading"
            className="mt-5 max-w-3xl font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl"
          >
            Precisa de ajuda? <span className="bg-gradient-to-r from-cyan-200 to-emerald-300 bg-clip-text text-transparent">Encontre quem resolve perto de você.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            Descreva o defeito, compare o caminho mais adequado e converse diretamente com o profissional.
            Se você é técnico, entre na rede e apresente seus serviços na sua região.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <a
            href={eutBridgeConfig.tecnicos}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-cyan-200/25 bg-white/10 p-6 shadow-xl backdrop-blur-sm transition-[background-color,border-color,box-shadow,transform] duration-300 hover:border-cyan-200/70 hover:bg-white/15 hover:shadow-cyan-900/20 motion-safe:hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
            data-cta-location="home_eut_cliente"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-300/20 text-cyan-100">
              <Wrench className="h-6 w-6 motion-safe:transition-transform motion-safe:duration-500 group-hover:rotate-[-8deg]" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-heading text-xl font-bold md:text-2xl">Sou cliente. Preciso de um técnico.</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Encontre profissionais por cidade e especialidade. Atendimento presencial ou remoto conforme disponibilidade.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 font-semibold text-cyan-200">
              Encontre um técnico perto de você
              <ArrowRight className="h-5 w-5 motion-safe:transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </a>

          <a
            href={eutBridgeConfig.cadastro}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-emerald-200/25 bg-white/10 p-6 shadow-xl backdrop-blur-sm transition-[background-color,border-color,box-shadow,transform] duration-300 hover:border-emerald-200/70 hover:bg-white/15 hover:shadow-emerald-900/20 motion-safe:hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
            data-cta-location="home_eut_tecnico"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-300/20 text-emerald-100">
              <Users className="h-6 w-6 motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-110" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-heading text-xl font-bold md:text-2xl">Sou técnico. Quero atender mais clientes.</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Cadastre seu perfil, informe as especialidades e a região atendida. O cliente fala com você diretamente.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 font-semibold text-emerald-200">
              Cadastre-se e atenda clientes perto de você
              <ArrowRight className="h-5 w-5 motion-safe:transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </a>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-white/20 bg-white/5 px-5 py-4">
          <p className="font-heading text-lg font-bold text-white">
            Atendimento técnico a partir de{" "}
            <span className="text-2xl text-emerald-200">{commercialConfig.networkServiceFromLabel}</span>
          </p>
          <p className="max-w-2xl text-xs leading-relaxed text-white/75">
            Referência inicial para horário comercial, sujeita à disponibilidade, localidade, tipo de serviço e orçamento.
            Preço e condições negociados livremente e diretamente com o técnico, sem intermediação da execução.
            O valor do atendimento não é a tarifa de acesso ao contato da plataforma.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-cyan-200">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Ajuda rápida
            </p>
            <h3 className="mt-3 font-heading text-2xl font-bold">Quero um técnico rápido. Por onde começo?</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Preencha a triagem ao lado: o WhatsApp abrirá com os detalhes organizados para avaliação.
              Não há confirmação automática de visita nem promessa de resposta imediata.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-white/85">
              <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" /> Cidade e bairro para avaliar deslocamento.</li>
              <li className="flex gap-2"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" /> Urgência e possibilidade de agendamento.</li>
              <li className="flex gap-2"><Camera className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" /> Fotos do equipamento e do erro no chat.</li>
              <li className="flex gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" /> Orçamento e autorização antes de executar.</li>
            </ul>
            <a
              href={eutBridgeConfig.tecnicosCuritiba}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/25 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Procurar técnico em Curitiba
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <form
            onSubmit={abrirTriagem}
            className="rounded-3xl border border-white/20 bg-card p-5 text-foreground shadow-2xl sm:p-7"
            aria-labelledby="home-triagem-titulo"
          >
            <h3 id="home-triagem-titulo" className="font-heading text-xl font-bold sm:text-2xl">
              Conte o que aconteceu com seu equipamento
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Só as informações necessárias para iniciar a conversa. Nenhum dado é enviado antes de você abrir o WhatsApp.
            </p>

            <div className="mt-5 grid gap-x-4 gap-y-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold">
                Seu nome <span className="text-accent" aria-hidden="true">*</span>
                <input className={fieldClass} type="text" autoComplete="name" required maxLength={80} value={dados.nome} onChange={(e) => alterar("nome", e.target.value)} placeholder="Como podemos chamar você?" />
              </label>
              <label className="block text-sm font-semibold">
                Cidade <span className="text-accent" aria-hidden="true">*</span>
                <input className={fieldClass} type="text" autoComplete="address-level2" required maxLength={80} value={dados.cidade} onChange={(e) => alterar("cidade", e.target.value)} placeholder="Ex.: Curitiba" />
              </label>
              <label className="block text-sm font-semibold">
                Bairro ou região
                <input className={fieldClass} type="text" autoComplete="address-level3" maxLength={80} value={dados.bairro} onChange={(e) => alterar("bairro", e.target.value)} placeholder="Ex.: Boqueirão" />
              </label>
              <label className="block text-sm font-semibold">
                Equipamento <span className="text-accent" aria-hidden="true">*</span>
                <select className={fieldClass} required value={dados.equipamento} onChange={(e) => alterar("equipamento", e.target.value)}>
                  <option value="" disabled>Selecione o tipo</option>
                  <option>Notebook</option>
                  <option>Computador desktop</option>
                  <option>All in One</option>
                  <option>Roteador / Wi-Fi</option>
                  <option>Impressora</option>
                  <option>Rede ou servidor de empresa</option>
                  <option>Outro equipamento</option>
                </select>
              </label>
              <label className="block text-sm font-semibold sm:col-span-2">
                Marca e modelo (se souber)
                <input className={fieldClass} type="text" maxLength={100} value={dados.modelo} onChange={(e) => alterar("modelo", e.target.value)} placeholder="Ex.: Dell Inspiron, Lenovo Ideapad, TP-Link..." />
              </label>
              <label className="block text-sm font-semibold sm:col-span-2">
                O que está acontecendo? <span className="text-accent" aria-hidden="true">*</span>
                <textarea className={fieldClass + " min-h-28 resize-y"} required maxLength={600} value={dados.problema} onChange={(e) => alterar("problema", e.target.value)} placeholder="Descreva os sintomas, mensagens de erro e o que deixou de funcionar." />
              </label>
              <label className="block text-sm font-semibold">
                Quando começou?
                <input className={fieldClass} type="text" maxLength={100} value={dados.inicio} onChange={(e) => alterar("inicio", e.target.value)} placeholder="Hoje, há uma semana..." />
              </label>
              <label className="block text-sm font-semibold">
                Urgência
                <select className={fieldClass} value={dados.urgencia} onChange={(e) => alterar("urgencia", e.target.value)}>
                  <option>Hoje, se houver disponibilidade</option>
                  <option>Nos próximos dias</option>
                  <option>Posso agendar</option>
                </select>
              </label>
              <label className="block text-sm font-semibold">
                Preferência de atendimento
                <select className={fieldClass} value={dados.modalidade} onChange={(e) => alterar("modalidade", e.target.value)}>
                  <option>A definir na triagem</option>
                  <option>Presencial</option>
                  <option>Remoto</option>
                  <option>Coleta / bancada</option>
                </select>
              </label>
              <label className="block text-sm font-semibold">
                O que você já tentou?
                <input className={fieldClass} type="text" maxLength={200} value={dados.tentativas} onChange={(e) => alterar("tentativas", e.target.value)} placeholder="Reiniciar, trocar cabo..." />
              </label>
            </div>

            <div className="mt-5 flex gap-3 rounded-xl border border-dashed border-accent/35 bg-accent/5 p-4">
              <Camera className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Tem fotos ou vídeo?</strong> Depois de abrir a conversa, anexe imagens do equipamento e da tela de erro diretamente no WhatsApp. Não envie senhas, documentos ou dados sensíveis.
              </p>
            </div>
            <button
              type="submit"
              data-cta-location="home_triagem_whatsapp"
              className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-accent px-5 py-3 text-center font-heading text-base font-bold text-accent-foreground shadow-lg transition-[box-shadow,transform] duration-300 hover:shadow-[0_14px_32px_-12px_hsl(var(--accent)/0.65)] motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Ajuda, quero um técnico rápido
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
              Você revisa a mensagem antes de enviar. Disponibilidade e orçamento são confirmados na conversa.
            </p>
          </form>
        </div>

        <nav className="mt-8 flex flex-wrap gap-3 text-sm text-white/80" aria-label="Informações antes de solicitar atendimento">
          <a href="/problemas/notebook-nao-liga" className="underline decoration-white/30 underline-offset-4 hover:text-white">Notebook não liga?</a>
          <a href="/problemas/wifi-instavel" className="underline decoration-white/30 underline-offset-4 hover:text-white">Wi-Fi caindo?</a>
          <a href="/tecnico-informatica-curitiba" className="underline decoration-white/30 underline-offset-4 hover:text-white">Técnico de informática em Curitiba</a>
          <a href="/diagnostico-60s" className="underline decoration-white/30 underline-offset-4 hover:text-white">Diagnóstico em 60 segundos</a>
        </nav>
      </div>
    </section>
  );
};

export default RedeETriagemSection;
