import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { PageSEO } from "@/components/PageSEO";
import { Link } from "@/lib/router-compat";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { AnimatedSection } from "@/components/AnimatedSection";
import { FloatingParticles } from "@/components/FloatingParticles";
import { trackPageView } from "@/lib/analytics";
import { getApprovedSlugs } from "@/lib/blogEditorialRegistry";
import { getEditorialCover } from "@/lib/blogEditorialCovers";
import { EDITORIAL_HUB_SUMMARIES } from "@/lib/editorialHubSummaries";

import {
  BookOpen, ShieldCheck, FileSearch, Wrench, MessageCircle,
  ArrowRight, CheckCircle2, Clock, Laptop, Wifi, HardDrive,
  ShieldAlert, MonitorCog, GraduationCap, ArrowUpRight,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// HUB EDITORIAL FAIL-CLOSED
// A listagem exibe SOMENTE artigos com aprovação editorial válida
// (registro em src/lib/blogEditorialRegistry.ts). O registro inicia
// vazio, então o hub apresenta um estado editorial honesto e permanece
// noindex enquanto houver menos de 3 artigos aprovados.
// ─────────────────────────────────────────────────────────────

const MIN_APPROVED_TO_INDEX = 3;

const EDITORIAL_POLICY = [
  "Conteúdos só são liberados após revisão editorial.",
  "A autoria precisa ser identificada antes da publicação.",
  "As fontes são verificadas quando necessárias.",
  "As datas só são atualizadas após mudança material no conteúdo.",
  "Toda imagem precisa ter origem conhecida (própria, licenciada ou gerada).",
  "Correções podem ser solicitadas pela página de contato.",
  "Conteúdo patrocinado, quando houver, será claramente identificado.",
  "Exemplos didáticos nunca serão apresentados como casos reais.",
  "Avaliações e resultados não serão inventados.",
];

const AUTHORITY_COMMITMENTS = [
  "A pauta nasce de uma dúvida real; texto de terceiros não é copiado nem reescrito.",
  "Afirmações que dependem de sistema, versão ou fabricante exigem fonte primária atual.",
  "Todo procedimento informa o limite: o que testar, o que evitar e quando parar.",
  "Uma página só é publicada quando acrescenta uma resposta própria, não outra URL para a mesma intenção.",
];

const INSTITUTIONAL_LINKS = [
  { to: "/guia-tecnico-informatica", label: "Atlas de Informática", icon: BookOpen, desc: "Trilhas por tema: aprenda o fundamento, identifique o sintoma e decida com segurança." },
  { to: "/servicos", label: "Serviços de informática", icon: Wrench, desc: "Formatação, manutenção, SSD, vírus, redes e mais." },
  { to: "/diagnostico-tecnico", label: "Diagnóstico técnico", icon: FileSearch, desc: "Entenda o problema antes de decidir o reparo." },
  { to: "/sobre", label: "Sobre", icon: ShieldCheck, desc: "Quem somos e como trabalhamos em Curitiba." },
  { to: "/contato", label: "Contato", icon: MessageCircle, desc: "Fale conosco ou solicite uma correção editorial." },
];

/** Pilares nacionais de fundamentos (Rodada 9B) — exibidos só se aprovados. */
const FUNDAMENTOS = [
  { slug: "o-que-e-informatica", label: "O que é informática", desc: "Definição, escopo e diferença para computação e TI." },
  { slug: "informatica-basica", label: "Informática básica", desc: "O que se aprende no primeiro nível e por onde começar." },
  { slug: "como-aprender-informatica", label: "Como aprender informática", desc: "Roteiro de estudo em quatro fases, com cronograma." },
];

// Vereditos que já estão sustentados por guias aprovados. Não são uma lista
// de "dicas rápidas": cada card leva ao contexto, aos limites do teste e ao
// momento de parar. Se um guia perder aprovação, ele sai daqui também.
const TECHNICAL_VERDICTS = [
  {
    slug: "limpar-arquivos-temporarios-windows",
    verdict: "Limpador de registro não é manutenção e não substitui diagnóstico.",
    context: "Espaço livre e arquivos temporários são verificações válidas; programas de " +
      "“faxina” não são uma resposta para toda lentidão.",
  },
  {
    slug: "limpar-cache-do-windows-update-softwaredistribution",
    verdict: "Limpar cache do Update só ajuda em cenários específicos.",
    context: "Quando o erro está na instalação ou em um driver, apagar arquivos de download não corrige a causa.",
  },
  {
    slug: "disco-com-setores-defeituosos-smart-o-que-fazer",
    verdict: "CHKDSK não é a resposta padrão para disco com sinais de falha.",
    context: "Com dados importantes, a prioridade é copiar e preservar antes de escrever ou reparar a unidade.",
  },
  {
    slug: "backup-nuvem-empresas-qual-escolher",
    verdict: "Pasta sincronizada não é backup por si só.",
    context: "A proteção real depende de versões recuperáveis, cópia independente e teste de restauração.",
  },
  {
    slug: "como-escolher-um-bom-antivirus",
    verdict: "Comprar antivírus não compensa hábitos e sistema desatualizados.",
    context: "A decisão começa pela proteção já disponível, atualizações e pelo risco que a máquina enfrenta.",
  },
] as const;

/**
 * Portas de entrada editoriais. A ideia vem da boa navegação por temas de
 * portais de dicas, mas cada rota aponta para material técnico próprio,
 * revisado e mantido no domínio do portal.
 */
const EDITORIAL_STARTS = [
  {
    title: "Windows e desempenho",
    description: "Inicialização, atualizações, lentidão e decisões antes de formatar.",
    to: "/problemas/windows-nao-inicia",
    label: "Resolver um problema no Windows",
    icon: MonitorCog,
  },
  {
    title: "Segurança e arquivos",
    description: "Backup, vírus, privacidade e o que fazer antes de perder dados.",
    to: "/blog/backup-como-proteger-seus-arquivos",
    label: "Proteger meus arquivos",
    icon: ShieldAlert,
  },
  {
    title: "Notebook e hardware",
    description: "Aquecimento, SSD, memória, tela e sinais que merecem atenção.",
    to: "/blog/notebook-superaquecendo-o-que-fazer",
    label: "Cuidar do notebook",
    icon: Laptop,
  },
  {
    title: "Wi-Fi e rede em casa",
    description: "Cobertura, quedas de sinal e ajustes que fazem sentido testar.",
    to: "/blog/como-melhorar-sinal-wifi-em-casa",
    label: "Melhorar o Wi-Fi",
    icon: Wifi,
  },
  {
    title: "Dados e recuperação",
    description: "Como agir quando o disco falha, um arquivo some ou o equipamento dá sinais.",
    to: "/blog/como-recuperar-dados-hd-com-defeito",
    label: "Entender recuperação de dados",
    icon: HardDrive,
  },
  {
    title: "Aprender informática",
    description: "Fundamentos para usar computador, programas e internet com mais autonomia.",
    to: "/blog/informatica-basica",
    label: "Começar do básico",
    icon: GraduationCap,
  },
] as const;

const Blog = () => {
  const approvedSlugs = getApprovedSlugs();
  const hasApproved = approvedSlugs.length > 0;
  // Fail-closed: hub permanece noindex enquanto não houver massa editorial aprovada.
  const noindex = approvedSlugs.length < MIN_APPROVED_TO_INDEX;

  const [activeCategory, setActiveCategory] = useState("Todos");
  // Metadados leves e estáveis: aparecem já no SSR, sem importar o corpo
  // React completo de cada artigo no hub.
  const summaries = EDITORIAL_HUB_SUMMARIES;

  useEffect(() => {
    trackPageView("/blog", "Blog - Hub editorial");
  }, []);

  const categories = [
    "Todos",
    ...Array.from(new Set(approvedSlugs.map((slug) => summaries[slug]?.category).filter(Boolean))).sort(),
  ];
  const visibleSlugs = approvedSlugs.filter((slug) =>
    activeCategory === "Todos" || summaries[slug]?.category === activeCategory,
  );
  const visibleVerdicts = TECHNICAL_VERDICTS.filter(({ slug }) => approvedSlugs.includes(slug));


  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Guias de Informática | O Técnico de Informática"
        description="Guias sobre manutenção, segurança, computadores, notebooks, redes e cuidados com dados, publicados após revisão editorial."
        path="/blog"
        noindex={noindex}
        breadcrumbs={[{ name: "Início", path: "/" }, { name: "Guias", path: "/blog" }]}
      />

      <JsonLdSchema />
      <Header />
      <Breadcrumbs items={[{ label: "Guias" }]} />

      <main>
        {/* ═══════════ HERO ═══════════ */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 premium-gradient" />
          <FloatingParticles count={20} />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-16 left-[10%] w-[500px] h-[500px] rounded-full bg-accent/[0.07] blur-[120px] animate-breathe" />
            <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] rounded-full bg-primary/[0.06] blur-[100px] animate-breathe" style={{ animationDelay: "2.5s" }} />
          </div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: "32px 32px" }} />

          <div className="container mx-auto relative z-10 pt-14 pb-20 md:pt-20 md:pb-24 px-4">
            <AnimatedSection animation="fade-up">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium text-white/90 mb-6 border border-white/15">
                  <BookOpen className="h-4 w-4 text-accent" />
                  <span>Guias técnicos</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-5">
                  Central de conhecimento em informática
                </h1>
                <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                  Explicações práticas para entender, prevenir e resolver problemas de computador,
                  notebook, Windows, Wi-Fi e dados — sem transformar toda dúvida em venda.
                </p>
                <div className="glow-separator max-w-[200px] mx-auto mt-6" />
                <div className="mt-7 grid grid-cols-3 gap-3 text-left text-white/80 sm:max-w-xl sm:mx-auto">
                  <span className="rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-xs leading-relaxed">
                    <strong className="block text-base text-white">{approvedSlugs.length}+</strong>
                    guias revisados
                  </span>
                  <span className="rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-xs leading-relaxed">
                    <strong className="block text-base text-white">6</strong>
                    caminhos para começar
                  </span>
                  <span className="rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-xs leading-relaxed">
                    <strong className="block text-base text-white">1º</strong>
                    orientação, depois serviço
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
              <path d="M0 60L48 52C96 44 192 28 288 22C384 16 480 20 576 28C672 36 768 48 864 50C960 52 1056 44 1152 36C1248 28 1344 20 1392 16L1440 12V60H0Z" className="fill-background" />
            </svg>
          </div>
        </section>

        {/* ═══════════ PORTAS DE ENTRADA EDITORIAIS ═══════════ */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            {!hasApproved ? (
              <AnimatedSection>
                <div className="max-w-2xl mx-auto text-center rounded-2xl border border-border bg-card p-8 md:p-12 shadow-sm">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mb-6">
                    <Clock className="h-7 w-7 text-accent" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                    Conteúdos técnicos em revisão editorial
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Estamos revisando autoria, fontes, imagens e atualização dos materiais
                    antes de liberar novos guias. Assim que os primeiros conteúdos passarem
                    pela revisão, eles aparecerão aqui.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Enquanto isso, você pode ir direto ao que resolve o seu problema:
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 mt-6">
                    <Link
                      to="/servicos"
                      className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold px-5 py-3 rounded-xl hover:opacity-90 transition-opacity"
                    >
                      Ver serviços <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/diagnostico-tecnico"
                      className="inline-flex items-center gap-2 border border-border text-foreground font-semibold px-5 py-3 rounded-xl hover:border-accent/40 transition-colors"
                    >
                      Diagnóstico técnico
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ) : (
              <AnimatedSection>
                <div className="max-w-6xl mx-auto">
                  <div className="max-w-3xl mb-9">
                    <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Por onde começar</span>
                    <h2 className="mt-2 text-2xl md:text-3xl font-heading font-bold text-foreground">
                      Escolha o assunto, não o serviço
                    </h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      O portal foi organizado para você encontrar uma explicação útil primeiro. Se a
                      situação exigir diagnóstico presencial, o próximo passo aparece com clareza no próprio guia.
                    </p>
                  </div>

                  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {EDITORIAL_STARTS.map(({ title, description, to, label, icon: Icon }) => (
                      <li key={to}>
                        <Link
                          to={to}
                          className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent/45 hover:shadow-md"
                        >
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <span className="mt-5 text-lg font-semibold text-foreground group-hover:text-accent">{title}</span>
                          <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</span>
                          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                            {label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <section className="mt-10 rounded-2xl border border-accent/25 bg-accent/[0.04] p-6 md:p-8" aria-labelledby="compromisso-autoridade">
                    <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Autoridade que se pode conferir</span>
                    <h2 id="compromisso-autoridade" className="mt-2 text-xl font-heading font-bold text-foreground md:text-2xl">
                      Antes de publicar, a resposta precisa ser útil e segura
                    </h2>
                    <ul className="mt-5 grid gap-3 md:grid-cols-2">
                      {AUTHORITY_COMMITMENTS.map((commitment) => (
                        <li key={commitment} className="flex gap-3 rounded-xl border border-border bg-background p-4 text-sm leading-relaxed text-foreground/90">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" aria-hidden="true" />
                          {commitment}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {visibleVerdicts.length > 0 && (
                    <section className="my-12 rounded-2xl border border-accent/25 bg-accent/[0.04] p-6 md:p-8" aria-labelledby="vereditos-tecnicos">
                      <div className="max-w-3xl">
                        <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Vereditos técnicos</span>
                        <h2 id="vereditos-tecnicos" className="mt-2 text-xl md:text-2xl font-heading font-bold text-foreground">
                          Nem toda dica de internet merece ser seguida
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          Aqui, o procedimento vem com condição, limite e risco. Abra o guia antes de alterar o sistema ou o equipamento.
                        </p>
                      </div>
                      <ul className="mt-6 grid gap-3 md:grid-cols-2">
                        {visibleVerdicts.map(({ slug, verdict, context }) => {
                          const summary = summaries[slug];
                          if (!summary) return null;

                          return (
                            <li key={slug}>
                              <Link
                                to={`/blog/${slug}`}
                                className="group block h-full rounded-xl border border-border bg-background p-5 transition-colors hover:border-accent/45"
                              >
                                <span className="text-sm font-semibold text-foreground group-hover:text-accent">{verdict}</span>
                                <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{context}</span>
                                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                                  Ler a análise: {summary.title} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  )}

                  {/* Fundamentos: porta de entrada dos três pilares nacionais (9B). */}
                  {FUNDAMENTOS.some((f) => approvedSlugs.includes(f.slug)) && (
                    <div className="my-12 rounded-2xl border border-border bg-muted/30 p-6 md:p-8">
                      <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground">
                        Fundamentos de informática
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Comece por aqui se você quer entender a área antes de resolver um problema específico.
                      </p>
                      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                        {FUNDAMENTOS.filter((f) => approvedSlugs.includes(f.slug)).map((f) => (
                          <li key={f.slug}>
                            <Link
                              to={`/blog/${f.slug}`}
                              className="block h-full rounded-xl border border-border p-4 hover:border-accent/40 transition-colors"
                            >
                              <span className="block font-semibold text-foreground">{f.label}</span>
                              <span className="mt-1 block text-sm text-muted-foreground">{f.desc}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                      <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Acervo revisado</span>
                      <h2 className="mt-2 text-2xl md:text-3xl font-heading font-bold text-foreground">
                        Guias publicados
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Filtre por tema para encontrar respostas sem percorrer o portal inteiro.
                      </p>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {visibleSlugs.length} {visibleSlugs.length === 1 ? "guia" : "guias"}
                    </p>
                  </div>
                  <div className="mb-7 flex flex-wrap gap-2" role="group" aria-label="Filtrar guias por assunto">
                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        aria-pressed={activeCategory === category}
                        className={`rounded-full border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                          activeCategory === category
                            ? "border-accent bg-accent text-accent-foreground"
                            : "border-border bg-background text-foreground hover:border-accent/45 hover:text-accent"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {visibleSlugs.map((slug) => {
                      const meta = summaries[slug];
                      const cover = getEditorialCover(slug);
                      return (
                        <li key={slug}>
                          <Link
                            to={`/blog/${slug}`}
                            className="block h-full rounded-xl border border-border bg-card overflow-hidden hover:border-accent/40 transition-colors"
                          >
                            {cover && (
                              <img
                                src={cover.src}
                                alt={cover.alt}
                                width={1200}
                                height={630}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-40 object-cover"
                              />
                            )}
                            <span className="block p-5">
                              {meta?.category && (
                                <span className="mb-3 inline-flex rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                                  {meta.category}
                                </span>
                              )}
                              <span className="block text-foreground font-semibold">
                                {meta?.title ?? slug}
                              </span>
                              {meta?.excerpt && (
                                <span className="block text-sm text-muted-foreground mt-2 leading-relaxed">
                                  {meta.excerpt}
                                </span>
                              )}
                              {meta?.readTime && (
                                <span className="mt-3 block text-xs font-medium text-muted-foreground">
                                  {meta.readTime} de leitura
                                </span>
                              )}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  {visibleSlugs.length === 0 && (
                    <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                      Os resumos deste tema ainda estão carregando. Selecione “Todos” para ver o acervo completo.
                    </p>
                  )}
                </div>
              </AnimatedSection>
            )}

          </div>
        </section>

        <section className="border-y border-border bg-accent/[0.04] py-14">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="mx-auto grid max-w-5xl gap-6 rounded-2xl border border-accent/20 bg-background p-6 md:grid-cols-[1.4fr_0.8fr] md:p-8">
                <div>
                  <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Orientação antes do orçamento</span>
                  <h2 className="mt-2 text-2xl font-heading font-bold text-foreground">Quando a leitura do guia não é suficiente</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    Ruído no disco, cheiro de queimado, tela com falhas físicas, BitLocker sem chave ou
                    dados importantes em risco pedem parada segura. Nesses casos, a triagem ajuda a decidir
                    o que não fazer antes de qualquer reparo.
                  </p>
                </div>
                <div className="flex items-center md:justify-end">
                  <Link
                    to="/diagnostico-tecnico"
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-center font-semibold text-accent-foreground transition-opacity hover:opacity-90 md:w-auto"
                  >
                    Fazer triagem técnica <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══════════ POLÍTICA EDITORIAL ═══════════ */}
        <section className="py-14 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3 flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-accent" />
                  Política editorial
                </h2>
                <p className="text-muted-foreground mb-8">
                  Estas são as regras que guiam a publicação dos nossos guias técnicos.
                </p>
                <ul className="space-y-3">
                  {EDITORIAL_POLICY.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground mt-8">
                  Encontrou algo que precisa de correção? Fale conosco pela{" "}
                  <Link to="/contato" className="text-accent font-medium hover:underline">
                    página de contato
                  </Link>
                  .
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══════════ LINKS INSTITUCIONAIS ═══════════ */}
        <section className="py-14 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-6 text-center">
                  Continue por aqui
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {INSTITUTIONAL_LINKS.map(({ to, label, icon: Icon, desc }) => (
                    <Link
                      key={to}
                      to={to}
                      className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 hover:border-accent/40 hover:shadow-md transition-all"
                    >
                      <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-accent/10 flex-shrink-0">
                        <Icon className="h-5 w-5 text-accent" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold text-foreground group-hover:text-accent transition-colors">
                          {label}
                        </span>
                        <span className="block text-sm text-muted-foreground mt-0.5">{desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-14 bg-background border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-4">
                Como estes guias são escritos
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Cada guia parte de um caso que aparece de verdade no atendimento em Curitiba e
                  região: computador que fica lento com o tempo, notebook que desliga sozinho, Wi-Fi
                  que cai no fundo da casa, arquivo apagado por engano. O texto começa pelo sintoma
                  descrito com as palavras do dia a dia e só depois entra na causa técnica, porque é
                  assim que a dúvida chega.
                </p>
                <p>
                  Os passos sugeridos são sempre os seguros de fazer sozinho — verificar cabo,
                  liberar espaço, conferir atualização, observar temperatura e ruído. Procedimentos
                  que podem agravar o defeito ou colocar dados em risco, como abrir equipamento na
                  garantia, insistir em disco com ruído mecânico ou usar programas de recuperação
                  sobre a mesma unidade, ficam explicitamente marcados como parada obrigatória.
                </p>
                <p>
                  Nenhum guia informa preço de reparo sem diagnóstico. Valores só existem depois da
                  avaliação técnica do equipamento, e é isso que os textos repetem: identificar a
                  causa, apresentar o custo, obter aprovação e só então executar. Quando o conserto
                  não compensa, a orientação também aparece — inclusive quando a conclusão é não
                  contratar serviço nenhum.
                </p>
                <p>
                  A autoria é institucional e identificada, a data de revisão só muda com alteração
                  material e afirmações dependentes de versão ou fabricante citam fonte primária —
                  Microsoft, CISA, CERT.br e documentação oficial. Os critérios completos, os níveis
                  de risco e as trilhas por tema estão no{" "}
                  <Link to="/guia-tecnico-informatica" className="text-accent font-medium hover:underline">
                    Atlas de Informática
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
