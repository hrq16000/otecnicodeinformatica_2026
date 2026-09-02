import { useEffect } from "react";
import { Link } from "@/lib/router-compat";
import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck, Wrench } from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { TrustStrip } from "@/components/TrustStrip";
import { PageTableOfContents } from "@/components/ui/PageTableOfContents";
import { RealImageSection } from "@/components/RealImageSection";
import { ServicosCorrelatos } from "@/components/informatica/ServicosCorrelatos";
import { ProximosPassos } from "@/components/informatica/ProximosPassos";
import { Button } from "@/components/ui/button";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";
import { SITE_BASE_URL, whatsappLink } from "@/lib/siteConfig";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { AtlasTrilhas } from "@/components/informatica/AtlasTrilhas";
import { ComoProduzimosConteudo } from "@/components/editorial/ComoProduzimosConteudo";
import { ATLAS_GUIAS_DECISAO, ATLAS_REVISADO_EM, ATLAS_TEMAS } from "@/lib/atlasInformatica";
import { temPaginaDeDecisao } from "@/lib/guiasDecisao";

const PATH = "/guia-tecnico-informatica";
const TITLE = "Atlas de Informática: guia técnico de PC e notebook";
const DESCRIPTION =
  "Atlas de Informática: trilhas de fundamentos, Windows, hardware, redes, segurança, backup e decisões de compra e reparo, com verificações seguras por tema.";

const WA_MESSAGE =
  "Olá! Vim do guia técnico de informática. Quero descrever meu problema para a triagem.";

/** Badge do nível de risco dos guias de decisão — tokens semânticos apenas. */
const RISCO_BADGE: Record<string, string> = {
  "Seguro de fazer sozinho": "border-border bg-secondary/60 text-muted-foreground",
  "Exige atenção": "border-accent/40 bg-accent/10 text-accent",
  "Parada obrigatória": "border-destructive/40 bg-destructive/10 text-destructive",
};

const FAMILIAS = [
  {
    titulo: "Energia",
    desc: "O equipamento não dá sinal, liga e desliga sozinho ou só funciona na tomada. Fonte, carregador, bateria e circuito de alimentação da placa entram na investigação.",
  },
  {
    titulo: "Imagem",
    desc: "Liga, faz barulho de ventoinha, mas a tela permanece apagada. Memória, vídeo, cabo interno, painel e BIOS separam o cenário de imagem do cenário de energia.",
  },
  {
    titulo: "Desempenho",
    desc: "Liga e funciona, mas demora demais, trava ou piora depois de alguns minutos. Armazenamento, memória, temperatura e software se manifestam de formas distintas.",
  },
  {
    titulo: "Sistema e software",
    desc: "Erros ao iniciar, telas azuis, programas indesejados, navegador sequestrado e atualizações travadas. Costuma resolver sem troca de peça.",
  },
  {
    titulo: "Armazenamento e dados",
    desc: "Ruído de disco, arquivos que somem, partição não reconhecida. Aqui a prioridade muda: preservar os dados vem antes de qualquer tentativa de conserto.",
  },
  {
    titulo: "Rede e conectividade",
    desc: "Só a internet está lenta, o Wi-Fi cai em cômodos específicos ou a impressora some da rede. A investigação sai do equipamento e vai para o ambiente.",
  },
];

const CHECKLIST = [
  "Anote quando o problema começou e o que mudou antes (atualização, queda de energia, instalação, líquido, queda física).",
  "Teste em outra tomada, de preferência aterrada, e sem filtro de linha antigo.",
  "Desconecte periféricos USB, cartões e monitores externos e tente novamente.",
  "Observe LEDs, ruídos, bipes e comportamento da ventoinha nos primeiros segundos.",
  "Verifique se a lentidão aparece logo ao ligar ou depois de alguns minutos de uso.",
  "Confira o espaço livre do disco do sistema e quantos programas iniciam junto com o Windows.",
  "Se houver suspeita de falha de disco, pare de usar o equipamento para não sobrescrever dados.",
  "Não instale otimizadores baixados por anúncio nem acumule dois antivírus ao mesmo tempo.",
];

/** Portas de estudo por pilar: cada uma começa em um fundamento e termina
 * em uma verificação ou decisão. São atalhos editoriais, não novas intenções
 * nem novas URLs. */
const PILARES_ESTUDO = [
  {
    id: "windows",
    titulo: "Windows e inicialização",
    resumo: "Entenda o caminho entre firmware, boot, atualização e reparo do sistema.",
    links: [
      ["Informática básica", "/blog/informatica-basica"],
      ["Windows não inicia", "/problemas/windows-nao-inicia"],
      ["Roteiro de falha de inicialização", "/ferramentas/roteiro-falha-de-inicializacao"],
    ],
  },
  {
    id: "seguranca",
    titulo: "Segurança e dados",
    resumo: "Proteja contas e arquivos antes de investigar vírus, golpes ou falhas de disco.",
    links: [
      ["Guia de backup", "/blog/backup-como-proteger-seus-arquivos"],
      ["Sinais de vírus e malware", "/blog/como-saber-se-pc-tem-virus-malware"],
      ["Recuperação de dados", "/blog/como-recuperar-dados-hd-com-defeito"],
    ],
  },
  {
    id: "hardware",
    titulo: "Hardware e desempenho",
    resumo: "Separe lentidão, memória, armazenamento e temperatura antes de comprar peças.",
    links: [
      ["Computador lento", "/blog/computador-lento-causas-solucoes"],
      ["SSD ou RAM", "/ferramentas/ssd-ou-ram"],
      ["Upgrade para SSD NVMe", "/blog/como-fazer-upgrade-ssd-nvme"],
    ],
  },
  {
    id: "redes",
    titulo: "Redes e Wi-Fi",
    resumo: "Compare equipamento, ambiente e provedor antes de trocar plano ou roteador.",
    links: [
      ["Como melhorar o Wi-Fi", "/blog/como-melhorar-sinal-wifi-em-casa"],
      ["Internet lenta: provedor ou roteador?", "/blog/internet-lenta-provedor-ou-roteador"],
      ["Configurar roteador", "/blog/como-configurar-roteador-wifi-iniciantes"],
    ],
  },
  {
    id: "produtividade",
    titulo: "Produtividade e rotina",
    resumo: "Organize a máquina e o ambiente de trabalho para reduzir falhas repetidas.",
    links: [
      ["Organização de TI para escritórios", "/blog/organizacao-de-ti-para-pequenos-escritorios"],
      ["Checklist de computador lento", "/ferramentas/checklist-computador-lento"],
      ["Escolha de workstation", "/blog/como-escolher-uma-workstation"],
    ],
  },
] as const;

const UPGRADES = [
  {
    titulo: "SSD no lugar do HD mecânico",
    desc: "É a intervenção de maior impacto perceptível quando o sistema ainda roda em disco mecânico: inicialização, abertura de programas e resposta geral mudam de patamar. Faz sentido em máquinas que continuarão em uso por mais tempo.",
  },
  {
    titulo: "Ampliação de memória RAM",
    desc: "Indicada quando o equipamento responde bem sozinho e trava ao abrir muitos programas ou abas. O ganho depende do limite suportado pela placa e do padrão de módulo aceito — isso é conferido antes de qualquer compra.",
  },
  {
    titulo: "Limpeza interna e troca de pasta térmica",
    desc: "Resolve a lentidão ligada ao aquecimento, quando o equipamento começa rápido e piora com o tempo de uso. Também reduz ruído de ventoinha e desligamentos repentinos por temperatura.",
  },
  {
    titulo: "Formatação com preservação de dados",
    desc: "Resolve o que é software: sistema corrompido, infecção persistente, acúmulo de instalações. Não corrige disco lento nem falta de memória, e por isso não deve ser o primeiro passo por padrão.",
  },
];

const FAQS = [
  {
    question: "Como sei se o problema é de hardware ou de software?",
    answer:
      "O padrão do sintoma ajuda. Falha que aparece antes do sistema carregar — sem imagem, bipes, desligamento imediato, não ligar — aponta para hardware. Problema que só ocorre depois da área de trabalho carregar, com erros, lentidão ou programas indesejados, aponta para software. A confirmação só vem com o equipamento avaliado.",
  },
  {
    question: "Vale a pena consertar um computador antigo?",
    answer:
      "Depende da relação entre o custo do reparo e o valor de um equipamento equivalente. Quando a soma de peças se aproxima desse valor, ou quando a placa não suporta mais memória e o processador limita o uso pretendido, explicamos o cenário e a alternativa, incluindo a migração dos seus dados.",
  },
  {
    question: "Formatar resolve lentidão?",
    answer:
      "Resolve quando a causa é software. Se o gargalo é HD mecânico, memória insuficiente ou aquecimento, a máquina volta a ficar lenta pouco tempo depois da formatação. Por isso a lentidão é investigada por família de causa antes de definir o procedimento.",
  },
  {
    question: "Meus arquivos correm risco durante a manutenção?",
    answer:
      "O procedimento é sempre combinado antes. Quando há suspeita de falha de disco, a prioridade é preservar os dados antes de qualquer tentativa de reparo. Em formatação, o backup é tratado como etapa obrigatória do serviço, e não como opcional.",
  },
  {
    question: "O atendimento pode ser feito sem sair de casa?",
    answer:
      "Boa parte dos casos de sistema, configuração e programa é resolvida por atendimento remoto. Rede, instalação e verificação inicial funcionam bem em domicílio. Falha física, troca de peça e recuperação de dados pedem bancada, com coleta e entrega quando necessário.",
  },
  {
    question: "Quanto tempo demora uma manutenção de computador ou notebook?",
    answer:
      "Depende da família da falha. Serviços de sistema, configuração e remoção de programas indesejados costumam ser resolvidos no mesmo atendimento. Reparo com troca de peça depende da disponibilidade do componente. Avaliação de disco com falha é o caso mais longo, porque a leitura é feita em etapas para não agravar o problema. O prazo estimado é informado na aprovação, antes da execução.",
  },
  {
    question: "Trocar HD por SSD faz diferença em um computador antigo?",
    answer:
      "Na maior parte dos casos de lentidão em máquina com disco mecânico, é a intervenção de maior impacto percebido: o tempo de inicialização e a abertura de programas caem de forma evidente. O SSD não resolve travamento por superaquecimento nem falta de memória, então a avaliação verifica o conjunto antes de recomendar apenas a troca.",
  },
  {
    question: "Notebook desligando sozinho é sempre superaquecimento?",
    answer:
      "Não. Desligamento repentino aparece em aquecimento, mas também em fonte ou carregador inadequado, bateria degradada, falha de alimentação da placa e até em erro de sistema. O que separa os cenários é o momento em que ocorre: sob esforço, logo ao ligar ou em qualquer situação. Essa informação é pedida já na triagem.",
  },
  {
    question: "Preciso levar o equipamento ou o atendimento pode ser em casa?",
    answer:
      "Sistema, configuração e programas normalmente são resolvidos por atendimento remoto. Rede, impressora e verificação inicial funcionam bem em domicílio. Falha física, troca de peça, microssoldagem e recuperação de dados exigem bancada, com coleta e entrega quando necessário. A modalidade é definida na triagem, não depois.",
  },
];


const CORRELATOS = [
  {
    to: "/servicos/manutencao-de-computador",
    titulo: "Manutenção de computador",
    desc: "Limpeza interna, troca de peças, correção de instabilidade e revisão completa do desktop.",
  },
  {
    to: "/servicos/manutencao-de-notebook",
    titulo: "Manutenção de notebook",
    desc: "Diagnóstico de energia, imagem, teclado, dobradiça, aquecimento e substituição de componentes.",
  },
  {
    to: "/servicos/upgrade-ssd-ram",
    titulo: "Upgrade de SSD e memória",
    desc: "Avaliação de compatibilidade, migração do sistema e ganho real de desempenho.",
  },
  {
    to: "/servicos/formatacao",
    titulo: "Formatação com backup",
    desc: "Reinstalação limpa do sistema, drivers e preservação dos seus arquivos.",
  },
  {
    to: "/servicos/remocao-de-virus",
    titulo: "Remoção de vírus e malware",
    desc: "Limpeza de programas indesejados, sequestro de navegador e proteção do ambiente.",
  },
  {
    to: "/servicos/recuperacao-de-dados",
    titulo: "Recuperação de dados",
    desc: "Avaliação de disco com falha, priorizando a preservação do que ainda pode ser lido.",
  },
];

const GuiaTecnicoInformatica = () => {
  const waHref = whatsappLink(WA_MESSAGE);

  useEffect(() => {
    trackPageView(PATH, TITLE);
  }, []);

  useJsonLdSlot(
    SCHEMA_SLOTS.faq,
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    SLOT_PRIORITY.page,
  );

  // CollectionPage do Atlas: substitui o WebPage padrão (mesmo slot, mesma
  // @id — prioridade de página vence a de componente, sem duplicar entidade).
  const atlasUrl = `${SITE_BASE_URL}${PATH}`;
  useJsonLdSlot(
    SCHEMA_SLOTS.webPage,
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${atlasUrl}#webpage`,
      url: atlasUrl,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${SITE_BASE_URL}/#website` },
      mainEntity: {
        "@type": "ItemList",
        name: "Temas do Atlas de Informática",
        numberOfItems: ATLAS_TEMAS.length,
        itemListElement: ATLAS_TEMAS.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t.titulo,
          url: `${atlasUrl}#tema-${t.id}`,
        })),
      },
    },
    SLOT_PRIORITY.page,
  );

  const cta = (location: string) => () => trackCTAClick("whatsapp", `guia-informatica-${location}`);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title={TITLE} description={DESCRIPTION} path={PATH} />
      <LocalBusinessJsonLd path={PATH} description={DESCRIPTION} />
      <Header />
      <Breadcrumbs items={[{ label: "Atlas de Informática" }]} />

      <section className="bg-[hsl(var(--hero-bg))] text-white">
        <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12 md:py-14">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent-on-dark sm:mb-3 sm:text-sm">
            Atlas de Informática · aprender antes de contratar
          </p>
          <h1 className="mb-3 text-[1.7rem] font-bold leading-[1.12] sm:mb-4 sm:text-3xl md:text-4xl">
            Atlas de Informática: aprenda, identifique e decida
          </h1>
          <p className="mb-4 text-[0.95rem] leading-relaxed opacity-95 sm:mb-6 sm:text-base">
            Este hub organiza o conhecimento técnico do portal em nove temas — de fundamentos a
            decisões de compra e reparo. Cada tema segue a mesma trilha: aprender o fundamento,
            identificar o sintoma, executar só verificações seguras, saber quando parar e escolher a
            solução adequada. O atendimento aparece por último, de propósito: entender vem antes de
            contratar.
          </p>
          <Button asChild size="lg" className="min-h-14">
            <a href={waHref} onClick={cta("hero")} data-cta-location="guia_hero">
              <MessageCircle className="mr-2 h-5 w-5" /> Descrever meu problema
            </a>
          </Button>
        </div>
      </section>

      <TrustStrip />

      <RealImageSection
        imageKey="bancadaTecnica"
        secondaryImageKey="diagnostico"
        layout="duo"
        caption="Bancada de diagnóstico de computadores e notebooks"
        secondaryCaption="Medição em placa durante a investigação de falha"
      />

      <main className="container mx-auto max-w-4xl px-4 py-12">
        <PageTableOfContents
          className="mb-12"
          items={[
            { id: "atlas", label: "Trilhas por tema" },
            { id: "pilares", label: "Pilares de estudo" },
            { id: "guias-decisao", label: "Guias de decisão" },
            { id: "familias", label: "As seis famílias de falha" },
            { id: "checklist", label: "Checklist antes de chamar o técnico" },
            { id: "biblioteca", label: "Biblioteca técnica: glossário e ferramentas" },
            { id: "upgrades", label: "O que realmente melhora o desempenho" },
            { id: "dados", label: "Dados, backup e recuperação" },
            { id: "rede", label: "Quando o problema é a rede" },
            { id: "empresas", label: "Ambientes com vários equipamentos" },
            { id: "diagnostico", label: "Como funciona o diagnóstico" },
            { id: "como-produzimos", label: "Como produzimos o conteúdo" },
            { id: "faq", label: "Perguntas frequentes" },
          ]}
        />

        <div className="mb-12">
          <AtlasTrilhas />
        </div>

        <section id="pilares" className="mb-12 scroll-mt-24" aria-labelledby="pilares-titulo">
          <h2 id="pilares-titulo" className="mb-3 text-2xl font-bold text-foreground">
            Pilares de estudo: por onde continuar
          </h2>
          <p className="mb-6 max-w-3xl text-muted-foreground">
            Se você não sabe qual página abrir primeiro, escolha o pilar que melhor descreve a
            dúvida. A sequência começa pelo fundamento, passa pelo sintoma e termina em uma
            verificação ou decisão — sem transformar conteúdo educativo em anúncio.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {PILARES_ESTUDO.map((pilar) => (
              <article key={pilar.id} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading text-base font-bold text-foreground">{pilar.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pilar.resumo}</p>
                <ol className="mt-4 space-y-2">
                  {pilar.links.map(([label, to], index) => (
                    <li key={to} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 min-w-5 text-xs font-bold text-accent">{index + 1}.</span>
                      <Link to={to} className="font-semibold text-accent hover:underline">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>

        <section id="guias-decisao" className="mb-12 scroll-mt-24" aria-labelledby="guias-decisao-titulo">
          <h2 id="guias-decisao-titulo" className="mb-3 text-2xl font-bold text-foreground">
            Guias de decisão
          </h2>
          <p className="mb-6 max-w-3xl text-muted-foreground">
            Perguntas que decidem orçamento. Cada guia é independente: tem critério técnico
            explícito, os sinais que puxam a decisão para cada lado e — quando o procedimento
            envolve risco real — o nível de risco declarado. O destino aprofunda a resposta,
            inclusive quando ela é não contratar serviço nenhum.
          </p>
          <div className="grid gap-4 lg:grid-cols-2">
            {ATLAS_GUIAS_DECISAO.map((g) => (
              <article
                key={g.id}
                id={`decisao-${g.id}`}
                aria-labelledby={`decisao-${g.id}-titulo`}
                className="flex h-full scroll-mt-24 flex-col rounded-xl border border-border bg-card p-5 md:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3
                    id={`decisao-${g.id}-titulo`}
                    className="font-heading text-base font-bold text-foreground md:text-lg"
                  >
                    {g.pergunta}
                  </h3>
                  {g.risco && (
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide ${RISCO_BADGE[g.risco]}`}
                    >
                      <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                      {g.risco}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.criterio}</p>
                <div className="mt-4 grid flex-1 gap-3 sm:grid-cols-2">
                  {g.sinais.map((lado) => (
                    <div key={lado.rotulo} className="rounded-lg border border-border bg-background p-4">
                      <p className="text-[0.65rem] font-bold uppercase tracking-wide text-accent">
                        {lado.rotulo}
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {lado.pontos.map((ponto) => (
                          <li
                            key={ponto}
                            className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                          >
                            <CheckCircle2
                              className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent"
                              aria-hidden="true"
                            />
                            {ponto}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {temPaginaDeDecisao(g.id) && (
                    <Link
                      to={`/decisoes/${g.id}`}
                      className="inline-flex items-center gap-1.5 font-heading text-sm font-bold text-accent hover:underline"
                    >
                      Guia completo desta decisão <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                  <Link
                    to={g.to}
                    className="inline-flex items-center gap-1.5 font-heading text-sm font-bold text-foreground hover:text-accent hover:underline"
                  >
                    {g.linkLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

              </article>
            ))}
          </div>
        </section>

        <section id="familias" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 text-2xl font-bold text-foreground">As seis famílias de falha</h2>
          <p className="mb-3 text-muted-foreground">
            Quase todo problema de informática doméstica ou de escritório cabe em uma destas seis
            famílias. Classificar corretamente evita o erro mais caro do setor: trocar peça por
            tentativa ou formatar por padrão, sem investigar o que de fato limita o equipamento.
          </p>
          <p className="mb-6 text-muted-foreground">
            A triagem no WhatsApp começa exatamente por aqui. Você descreve o comportamento, a
            família provável é identificada e só então a modalidade de atendimento é indicada —
            remoto, em domicílio ou com coleta para bancada.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {FAMILIAS.map((f) => (
              <div key={f.titulo} className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-2 flex items-center gap-2 font-heading text-base font-bold text-foreground">
                  <Wrench className="h-4 w-4 text-accent" /> {f.titulo}
                </h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-muted-foreground">
            Para os dois cenários mais buscados existem páginas dedicadas, com o detalhamento
            completo de sinais e testes:{" "}
            <Link to="/problemas/notebook-nao-liga" className="font-semibold text-accent hover:underline">
              notebook não liga
            </Link>{" "}
            e{" "}
            <Link to="/problemas/computador-lento" className="font-semibold text-accent hover:underline">
              computador lento
            </Link>
            .
          </p>
        </section>

        <section id="checklist" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Checklist antes de chamar o técnico
          </h2>
          <p className="mb-6 text-muted-foreground">
            Nenhum item abaixo exige abrir o equipamento. São observações externas que encurtam a
            triagem e, em alguns casos, resolvem o problema sem atendimento. Informações registradas
            aqui também ajudam a evitar substituição desnecessária de peça.
          </p>
          <ul className="space-y-3">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/5 p-6">
            <h3 className="mb-2 font-heading text-base font-bold text-foreground">
              O que evitar por conta própria
            </h3>
            <p className="text-sm text-muted-foreground">
              Abrir fonte, insistir em ligar equipamento que sofreu contato com líquido, forçar
              conectores e reinstalar o sistema com suspeita de disco falhando são as tentativas que
              mais transformam um reparo simples em recuperação de dados. Quando houver dúvida, o
              caminho mais barato é descrever o sintoma antes de intervir.
            </p>
          </div>
        </section>

        <section id="biblioteca" className="mb-12 scroll-mt-24" aria-labelledby="biblioteca-titulo">
          <h2 id="biblioteca-titulo" className="mb-4 text-2xl font-bold text-foreground">
            Biblioteca técnica: glossário e ferramentas
          </h2>
          <p className="mb-6 max-w-3xl text-muted-foreground">
            As trilhas ensinam a decidir; a biblioteca dá o vocabulário e os roteiros de observação.
            O glossário explica os quinze termos que aparecem em toda conversa técnica — sempre com o
            que é seguro verificar e onde parar. As ferramentas transformam sintomas vagos em
            anotações objetivas, sem cadastro e sem promessa de diagnóstico.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              to="/entidades"
              className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/50"
            >
              <h3 className="font-heading text-base font-bold text-foreground group-hover:text-accent">
                Entidades técnicas do portal
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Windows, SSD, memória RAM, Wi-Fi, backup, erro 0xc0000428 e computador lento: cada
                assunto reúne definição, problemas, ferramentas, decisões, artigos, fontes e onde
                existe atendimento presencial.
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 font-heading text-sm font-bold text-accent">
                Abrir o mapa de entidades <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
            <Link
              to="/glossario"
              className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/50"
            >
              <h3 className="font-heading text-base font-bold text-foreground group-hover:text-accent">
                Glossário técnico de informática
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                BSOD, SMART, TPM, BitLocker, UEFI, DNS, NVMe e mais dez termos, cada um com definição,
                sintomas relacionados, verificações seguras e o que não fazer.
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 font-heading text-sm font-bold text-accent">
                Abrir o glossário <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
            <Link
              to="/ferramentas"
              className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/50"
            >
              <h3 className="font-heading text-base font-bold text-foreground group-hover:text-accent">
                Ferramentas e checklists orientativos
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Computador lento, antes de formatar, falha de inicialização, verificação de backup e
                SSD ou RAM — roteiros seguros com condições claras de parada.
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 font-heading text-sm font-bold text-accent">
                Ver as ferramentas <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Três entradas diretas:{" "}
            <Link to="/ferramentas/checklist-antes-de-formatar" className="font-semibold text-accent hover:underline">
              checklist antes de formatar
            </Link>
            ,{" "}
            <Link to="/glossario/smart" className="font-semibold text-accent hover:underline">
              o que é S.M.A.R.T.
            </Link>{" "}
            e{" "}
            <Link to="/ferramentas/ssd-ou-ram" className="font-semibold text-accent hover:underline">
              SSD ou RAM
            </Link>
            .
          </p>
        </section>

        <RealImageSection
          imageKey="componentesSsd"
          caption="SSD e memória: as duas intervenções de maior impacto em máquinas antigas"
        />

        <section id="upgrades" className="mb-12 mt-12 scroll-mt-24">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            O que realmente melhora o desempenho
          </h2>
          <p className="mb-6 text-muted-foreground">
            Desempenho não melhora por acúmulo de procedimentos. Cada intervenção resolve um tipo de
            limitação, e aplicar a errada gera custo sem ganho perceptível. As quatro abaixo cobrem a
            maioria dos casos reais atendidos em Curitiba.
          </p>
          <div className="space-y-4">
            {UPGRADES.map((u) => (
              <div key={u.titulo} className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-2 font-heading text-base font-bold text-foreground">{u.titulo}</h3>
                <p className="text-sm text-muted-foreground">{u.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-muted-foreground">
            A compatibilidade é sempre conferida antes da compra de qualquer peça, e o valor é
            aprovado por você antes da execução. As condições estão descritas em{" "}
            <Link to="/precos-e-politicas" className="font-semibold text-accent hover:underline">
              preços e políticas
            </Link>
            .
          </p>
        </section>

        <section id="dados" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Dados, backup e recuperação</h2>
          <p className="mb-3 text-muted-foreground">
            Em qualquer atendimento de informática, os dados valem mais que o equipamento. Um
            notebook substituível custa uma fração do que custa perder anos de documentos, fotos e
            arquivos de trabalho — e essa é a perda que não se resolve com peça nova.
          </p>
          <p className="mb-3 text-muted-foreground">
            Quando há ruído metálico, travamentos de leitura, arquivos que somem ou partição que
            deixou de ser reconhecida, a orientação é parar de usar o equipamento imediatamente.
            Cada nova tentativa de inicialização pode sobrescrever justamente a área que ainda
            poderia ser lida.
          </p>
          <p className="mb-6 text-muted-foreground">
            Em formatação, o backup faz parte do serviço e é combinado antes de qualquer
            reinstalação. Em suspeita de falha física, o disco é avaliado primeiro, e só depois se
            discute conserto do restante da máquina.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/servicos/recuperacao-de-dados"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-accent hover:text-accent"
            >
              Recuperação de dados <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/seguranca-dos-dados"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-accent hover:text-accent"
            >
              Segurança dos dados <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <RealImageSection
          imageKey="redesWifi"
          secondaryImageKey="suporteRemoto"
          layout="duo"
          caption="Infraestrutura de rede: cabeamento, roteador e cobertura"
          secondaryCaption="Sessão de suporte remoto para problemas de sistema"
        />

        <section id="rede" className="mb-12 mt-12 scroll-mt-24">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Quando o problema é a rede</h2>
          <p className="mb-3 text-muted-foreground">
            Se o equipamento responde bem localmente e só a navegação está lenta, a investigação sai
            do computador. Nesses casos entram posicionamento do roteador, interferência de canal,
            paredes e lajes, quantidade de dispositivos conectados, qualidade do cabeamento e o
            próprio link contratado.
          </p>
          <p className="mb-6 text-muted-foreground">
            Trocar o computador não corrige cobertura de Wi-Fi, assim como trocar o roteador não
            corrige um disco em falha. Separar os dois cenários evita gasto no lugar errado — e é
            uma das confusões mais frequentes em atendimentos residenciais e de home office.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/servicos/redes-e-wifi"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-accent hover:text-accent"
            >
              Redes e Wi-Fi <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/servicos/suporte-home-office"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-accent hover:text-accent"
            >
              Suporte para home office <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section id="empresas" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Ambientes com vários equipamentos
          </h2>
          <p className="mb-3 text-muted-foreground">
            Em escritórios, consultórios e comércios, o problema raramente é um equipamento isolado:
            é a soma de máquinas em estágios diferentes de vida útil, backup não verificado, rede
            improvisada e ausência de padrão de manutenção. O impacto aparece como interrupção de
            atendimento, não como "computador com defeito".
          </p>
          <p className="mb-6 text-muted-foreground">
            Nesses casos o atendimento pode ser pontual ou recorrente, com inventário do que existe,
            prioridade do que trava a operação e um plano de manutenção preventiva. O escopo é
            definido antes, sem contrato obrigatório para começar.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/empresa-de-ti-curitiba"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-accent hover:text-accent"
            >
              Empresa de TI em Curitiba <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/servicos/suporte-tecnico-empresarial"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-accent hover:text-accent"
            >
              Suporte técnico empresarial <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section id="diagnostico" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Como funciona o diagnóstico</h2>
          <ol className="space-y-4">
            {[
              "Triagem no WhatsApp: você descreve o sintoma, quando começou e o que mudou antes. Isso indica a família provável da falha.",
              "Definição da modalidade: remoto para sistema e configuração, domicílio para rede e verificação inicial, bancada para falha física e dados.",
              "Avaliação técnica: o comportamento é reproduzido e os componentes são testados por eliminação, não por tentativa de troca.",
              "Aprovação: o que foi encontrado, o que será feito e o valor são apresentados antes da execução. Você decide se autoriza.",
              "Execução e entrega: o serviço é realizado, testado e devolvido com o que foi feito registrado, dentro da garantia aplicável ao procedimento.",
            ].map((passo, i) => (
              <li key={passo} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 font-bold text-accent">
                  {i + 1}
                </span>
                <span className="text-sm text-muted-foreground">{passo}</span>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/5 p-5">
            <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
            <p className="text-sm text-muted-foreground">
              Nenhum procedimento é executado sem aprovação prévia. Detalhes de garantia, peças e
              condições estão em{" "}
              <Link to="/precos-e-politicas" className="font-semibold text-accent hover:underline">
                preços e políticas
              </Link>{" "}
              e em{" "}
              <Link to="/como-funciona" className="font-semibold text-accent hover:underline">
                como funciona
              </Link>
              .
            </p>
          </div>
        </section>

        <div className="mb-12">
          <ComoProduzimosConteudo revisadoEm={ATLAS_REVISADO_EM} />
        </div>

        <ServicosCorrelatos
          titulo="Serviços que resolvem cada família de falha"
          intro="Cada página explica o escopo do serviço, o processo de atendimento e o que influencia o valor final."
          itens={CORRELATOS}
        />

        <section id="faq" className="mb-12 scroll-mt-24">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Perguntas frequentes</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.question} className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-2 font-heading text-base font-bold text-foreground">{f.question}</h3>
                <p className="text-sm text-muted-foreground">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <ProximosPassos
          waHref={waHref}
          onCta={cta("proximos-passos")}
          ctaLocation="guia_proximos_passos"
          atalhos={[
            { to: "/problemas/notebook-nao-liga", label: "Notebook não liga" },
            { to: "/problemas/computador-lento", label: "Computador lento" },
            { to: "/precos-e-politicas", label: "Preços e políticas" },
          ]}
        />



        <section className="rounded-xl bg-[hsl(var(--hero-bg))] p-8 text-center text-white">
          <h2 className="mb-3 text-2xl font-bold">Descreva o seu caso para a triagem</h2>
          <p className="mx-auto mb-6 max-w-2xl opacity-95">
            Conte o sintoma, quando começou e o que mudou antes. A triagem indica a família provável
            da falha, a modalidade de atendimento e o próximo passo do diagnóstico.
          </p>
          <Button asChild size="lg" className="min-h-14">
            <a href={waHref} onClick={cta("final")} data-cta-location="guia_final">
              <MessageCircle className="mr-2 h-5 w-5" /> Iniciar diagnóstico
            </a>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GuiaTecnicoInformatica;
