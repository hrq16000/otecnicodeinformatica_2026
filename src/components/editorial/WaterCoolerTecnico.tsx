import {
  ArrowUpRight,
  Building2,
  Coffee,
  Gauge,
  HardDrive,
  Network,
  Printer,
  Router,
  ShieldCheck,
  ThermometerSun,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Link } from "@/lib/router-compat";

type Variant = "home" | "servicos" | "empresas";

type Insight = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  text: string;
  action: string;
  href: string;
};

type VariantData = {
  kicker: string;
  title: string;
  intro: string;
  photo: string;
  photoAlt: string;
  photoTitle: string;
  photoText: string;
  insights: Insight[];
};

const DATA: Record<Variant, VariantData> = {
  home: {
    kicker: "Water cooler técnico",
    title: "Pequenos sinais que mudam o diagnóstico",
    intro:
      "Antes de escolher um serviço, vale observar o padrão. Esses detalhes ajudam a separar sintoma, causa provável e próximo passo sem transformar a página em um manual técnico.",
    photo: "/fotos/bancada-tecnica.jpg",
    photoAlt: "Bancada técnica com equipamentos de informática em manutenção",
    photoTitle: "O detalhe que parece pequeno costuma economizar tentativa",
    photoText:
      "Quando começou, em quais equipamentos acontece e o que muda quando você troca de rede, tomada ou aplicação: três respostas simples já melhoram muito a triagem.",
    insights: [
      {
        icon: Router,
        eyebrow: "Rede",
        title: "Wi-Fi ruim só em um cômodo?",
        text:
          "Compare o mesmo aparelho perto do roteador antes de reiniciar tudo. Se o sinal melhora, cobertura e interferência entram na frente da hipótese de falha geral da internet.",
        action: "Ver redes e Wi-Fi",
        href: "/servicos/redes-e-wifi",
      },
      {
        icon: Gauge,
        eyebrow: "Desempenho",
        title: "A lentidão começou de repente?",
        text:
          "Observe se trava no boot, ao abrir programas ou apenas no navegador. Esse recorte ajuda a separar sistema, armazenamento e aplicativo antes de pensar em troca de peça.",
        action: "Ver manutenção de computador",
        href: "/servicos/manutencao-de-computador",
      },
      {
        icon: ThermometerSun,
        eyebrow: "Notebook",
        title: "Esquenta e desliga quando é exigido?",
        text:
          "Evite insistir em jogos, renderização ou carga pesada até avaliar ventilação. O momento do aquecimento e do desligamento já fornece uma pista útil para a triagem.",
        action: "Ver manutenção de notebook",
        href: "/servicos/manutencao-de-notebook",
      },
      {
        icon: HardDrive,
        eyebrow: "Dados",
        title: "Arquivo sumiu ou o disco começou a falhar?",
        text:
          "Reduza gravações no mesmo dispositivo. Instalar programas, copiar grandes volumes ou formatar pode diminuir as chances de recuperação do conteúdo ainda existente.",
        action: "Ver recuperação de dados",
        href: "/servicos/recuperacao-de-dados",
      },
    ],
  },
  servicos: {
    kicker: "Water cooler de bancada",
    title: "Antes de escolher o serviço, faça este corte rápido",
    intro:
      "O nome do serviço vem depois do sintoma. Estes atalhos evitam comprar peça cedo demais, formatar sem necessidade ou tratar uma falha compartilhada como se fosse isolada.",
    photo: "/fotos/bancada-tecnica-mobile.webp",
    photoAlt: "Notebook e ferramentas sobre bancada técnica",
    photoTitle: "Diagnóstico bom começa eliminando hipóteses baratas",
    photoText:
      "Energia, cabo, rede, temperatura, espaço livre e momento da falha são verificações simples. Elas ajudam a decidir se o caso tende a software, hardware, rede ou armazenamento.",
    insights: [
      {
        icon: Wrench,
        eyebrow: "Antes de formatar",
        title: "O Windows está ruim — mas o disco está saudável?",
        text:
          "Formatação corrige software; não corrige armazenamento degradado. Se houver travamentos, ruídos ou erros de leitura, vale avaliar o disco antes de reinstalar o sistema.",
        action: "Ver formatação",
        href: "/servicos/formatacao",
      },
      {
        icon: Gauge,
        eyebrow: "Antes do upgrade",
        title: "SSD e RAM ajudam, mas precisam atacar o gargalo certo",
        text:
          "Se o processador já está no limite, a máquina superaquece ou o problema aparece só em um aplicativo, trocar memória ou armazenamento pode não resolver a causa principal.",
        action: "Ver upgrade SSD e RAM",
        href: "/servicos/upgrade-ssd-ram",
      },
      {
        icon: Network,
        eyebrow: "Antes do roteador novo",
        title: "A falha acontece em todos os aparelhos?",
        text:
          "Quando só um dispositivo cai, o diagnóstico muda. Quando vários falham no mesmo ponto da casa ou empresa, cobertura, interferência e infraestrutura ganham peso.",
        action: "Ver redes e Wi-Fi",
        href: "/servicos/redes-e-wifi",
      },
      {
        icon: ShieldCheck,
        eyebrow: "Antes de apagar",
        title: "Dados importantes mudam a ordem das ações",
        text:
          "Se há arquivos únicos no equipamento, preserve o original antes de reparos destrutivos. A estratégia de recuperação deve vir antes da reinstalação ou formatação.",
        action: "Ver recuperação de dados",
        href: "/servicos/recuperacao-de-dados",
      },
    ],
  },
  empresas: {
    kicker: "Water cooler da operação",
    title: "Perguntas que encurtam a triagem empresarial",
    intro:
      "Em ambiente de trabalho, o impacto e a simultaneidade importam tanto quanto o equipamento. Um minuto de contexto ajuda a priorizar sem transformar todo incidente em emergência.",
    photo: "/fotos/estacao-trabalho-desktop.webp",
    photoAlt: "Estação de trabalho preparada para atendimento empresarial",
    photoTitle: "Primeiro delimite o alcance do incidente",
    photoText:
      "Uma estação, um setor ou a empresa inteira? Saber quantas pessoas foram afetadas e o que mudou pouco antes do problema é a forma mais rápida de organizar a investigação.",
    insights: [
      {
        icon: Building2,
        eyebrow: "Impacto",
        title: "Uma máquina ou várias pessoas pararam?",
        text:
          "Se apenas uma estação falhou, a investigação tende a começar localmente. Se várias pessoas foram afetadas ao mesmo tempo, rede, autenticação e serviços compartilhados sobem de prioridade.",
        action: "Ver suporte empresarial",
        href: "/servicos/suporte-tecnico-empresarial",
      },
      {
        icon: Network,
        eyebrow: "Infraestrutura",
        title: "O problema começou depois de mudança física?",
        text:
          "Troca de sala, roteador, switch, cabeamento ou posição das estações pode alterar cobertura e conectividade. Registrar a mudança evita investigar o ambiente antigo.",
        action: "Ver redes e Wi-Fi",
        href: "/servicos/redes-e-wifi",
      },
      {
        icon: Printer,
        eyebrow: "Periféricos",
        title: "A impressora sumiu para todo mundo ou só para um PC?",
        text:
          "Essa diferença separa configuração local de um problema de rede, fila, endereço ou compartilhamento. É uma informação simples e muito útil antes do acesso remoto.",
        action: "Ver suporte empresarial",
        href: "/servicos/suporte-tecnico-empresarial",
      },
      {
        icon: ShieldCheck,
        eyebrow: "Continuidade",
        title: "O backup existe — mas a restauração já foi testada?",
        text:
          "Ter arquivos copiados não é o mesmo que saber recuperá-los. Uma rotina de backup precisa considerar também retenção, acesso e teste de restauração.",
        action: "Ver backup para empresas",
        href: "/servicos/backup-para-empresas",
      },
    ],
  },
};

export const WaterCoolerTecnico = ({ variant }: { variant: Variant }) => {
  const data = DATA[variant];
  const headingId = `water-cooler-${variant}`;

  return (
    <section
      className="relative overflow-hidden border-y border-border bg-[linear-gradient(135deg,hsl(var(--secondary)/0.82),hsl(var(--background)),hsl(var(--accent)/0.06))] py-12 md:py-16"
      aria-labelledby={headingId}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,hsl(var(--accent)/0.10),transparent_34%),radial-gradient(circle_at_85%_80%,hsl(var(--primary)/0.08),transparent_30%)]"
      />
      <div className="container relative mx-auto">
        <div className="mx-auto max-w-6xl">
          <header className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-background/85 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent shadow-sm backdrop-blur-sm">
              <Coffee className="h-4 w-4" aria-hidden="true" />
              {data.kicker}
            </p>
            <h2
              id={headingId}
              className="mt-4 font-heading text-2xl font-bold tracking-tight text-foreground md:text-4xl"
            >
              {data.title}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {data.intro}
            </p>
          </header>

          <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.5fr]">
            <FadeIn className="h-full">
              <div className="relative h-full min-h-[320px] overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-lg)]">
                <img
                  src={data.photo}
                  alt={data.photoAlt}
                  width={960}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-bg)/0.94)] via-[hsl(var(--hero-bg)/0.48)] to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                  <p className="font-heading text-xl font-bold md:text-2xl">{data.photoTitle}</p>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
                    {data.photoText}
                  </p>
                </div>
              </div>
            </FadeIn>

            <div className="grid gap-4 sm:grid-cols-2">
              {data.insights.map(({ icon: Icon, eyebrow, title, text, action, href }, index) => (
                <FadeIn key={title} index={index} className="h-full">
                  <article className="group flex h-full flex-col rounded-2xl border border-border bg-card/95 p-5 shadow-sm motion-surface hover:border-accent/50 hover:shadow-[var(--shadow-md)] md:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                        {eyebrow}
                      </span>
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-bold leading-snug text-foreground">
                      {title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                    <Link
                      to={href}
                      className="mt-5 inline-flex min-h-11 items-center gap-2 font-heading text-sm font-bold text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {action}
                      <ArrowUpRight
                        className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaterCoolerTecnico;
