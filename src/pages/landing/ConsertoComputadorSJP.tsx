import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { PageSEO } from "@/components/PageSEO";
import { useJsonLdSlot, SCHEMA_SLOTS, SLOT_PRIORITY } from "@/lib/jsonLdSlots";
import { siteConfig, whatsappLink, BRAND_NAME, BRAND_LOGO_PATH } from "@/lib/siteConfig";
import { brandConfig } from "@/lib/config";
import { MessageCircle, Cpu, Monitor, Wrench, ShieldCheck, Clock, MapPin, CheckCircle2 } from "lucide-react";

const PATH = "/landing/conserto-computador-sao-jose-dos-pinhais";
const CITY = "São José dos Pinhais";
const UF = "PR";

const WA_MESSAGE = `Olá! Vim pela landing de ${CITY} e preciso de diagnóstico físico para meu computador ou notebook.`;

const track = (location: string) =>
  import("@/lib/analytics").then(({ trackCTAClick }) => trackCTAClick("whatsapp", location));

/**
 * Ilustração vetorial abstrata de hardware genérico.
 * Sem logotipos ou identidade visual de fabricantes de terceiros.
 */
const HardwareIllustration = () => (
  <svg
    viewBox="0 0 400 260"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto"
    aria-label="Ilustração abstrata de placa de circuito e componentes de hardware"
  >
    <rect x="20" y="40" width="360" height="180" rx="12" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" />
    <rect x="45" y="65" width="120" height="120" rx="8" fill="hsl(var(--muted))" opacity="0.4" />
    <rect x="70" y="90" width="70" height="70" rx="6" fill="hsl(var(--primary))" opacity="0.15" />
    <circle cx="105" cy="125" r="18" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.6" />
    <circle cx="105" cy="125" r="8" fill="hsl(var(--primary))" opacity="0.5" />
    <rect x="200" y="70" width="140" height="24" rx="4" fill="hsl(var(--muted))" opacity="0.5" />
    <rect x="200" y="110" width="100" height="24" rx="4" fill="hsl(var(--muted))" opacity="0.5" />
    <rect x="200" y="150" width="130" height="24" rx="4" fill="hsl(var(--muted))" opacity="0.5" />
    <path d="M170 125 H260" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />
    <path d="M170 170 H230" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />
    <rect x="60" y="200" width="40" height="8" rx="2" fill="hsl(var(--accent))" opacity="0.5" />
    <rect x="115" y="200" width="40" height="8" rx="2" fill="hsl(var(--accent))" opacity="0.5" />
    <rect x="170" y="200" width="40" height="8" rx="2" fill="hsl(var(--accent))" opacity="0.5" />
    <rect x="225" y="200" width="40" height="8" rx="2" fill="hsl(var(--accent))" opacity="0.5" />
    <circle cx="340" cy="190" r="14" fill="hsl(var(--primary))" opacity="0.12" />
    <circle cx="340" cy="190" r="6" fill="hsl(var(--primary))" opacity="0.5" />
  </svg>
);

const Header = () => {
  const waUrl = whatsappLink(WA_MESSAGE);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/85 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 h-[var(--site-header-space)] flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
          <img
            src={BRAND_LOGO_PATH}
            alt={brandConfig.logoAlt}
            width="140"
            height="36"
            className="h-8 w-auto brightness-0 invert"
            loading="eager"
            decoding="async"
          />
        </a>
        <Button
          variant="whatsapp"
          size="sm"
          asChild
          onClick={() => track("landing_header")}
          className="gap-2"
        >
          <a href={waUrl} target="_blank" rel="noopener noreferrer" aria-label="Continuar no WhatsApp">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Continuar no WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </Button>
      </div>
    </header>
  );
};

const Hero = () => {
  const waUrl = whatsappLink(WA_MESSAGE);
  return (
    <section className="relative overflow-hidden pt-[calc(var(--site-header-space)+2.5rem)] pb-16 md:pt-[calc(var(--site-header-space)+4rem)] md:pb-24">
      <div className="absolute inset-0 premium-gradient" />
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-[420px] h-[420px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[360px] h-[360px] rounded-full bg-accent/10 blur-[100px]" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="max-w-2xl animate-fade-in">
            <p className="text-sm md:text-base font-medium text-primary mb-3 tracking-wide uppercase">
              Laboratório técnico local
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
              Conserto rápido e físico de computadores e notebooks em {CITY}.
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
              Laboratório próprio equipado para troca de peças, formatação e upgrades.
              Traga sua máquina ou solicitamos a coleta em {CITY}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="heroCta"
                size="xl"
                asChild
                onClick={() => track("landing_hero_primary")}
                className="w-full sm:w-auto"
              >
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Solicitar diagnóstico
                </a>
              </Button>
              <Button
                variant="outline"
                size="xl"
                asChild
                className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 hover:text-white"
              >
                <a href="#servicos">Ver serviços</a>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                Diagnóstico em bancada
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                Orçamento antes do reparo
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                Peças de qualidade
              </li>
            </ul>
          </div>
          <div className="relative animate-fade-in" style={{ animationDelay: "150ms" }}>
            <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/10 bg-card/50 p-6 shadow-2xl shadow-black/40">
              <HardwareIllustration />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const services = [
  {
    icon: Cpu,
    title: "Upgrade de SSD e Memória RAM",
    description:
      "Aumente a velocidade do seu equipamento com instalação física de SSD e expansão de memória, compatível com notebooks e desktops.",
  },
  {
    icon: Monitor,
    title: "Troca de Telas e Teclados Físicos",
    description:
      "Substituição de telas quebradas, teclados com falhas e touchpads danificados. Trabalho manual em bancada com peças novas.",
  },
  {
    icon: Wrench,
    title: "Limpeza Interna e Troca de Pasta Térmica",
    description:
      "Manutenção física preventiva que reduz superaquecimento: remoção de poeira, troca de pasta térmica e reaplicação de dissipador.",
  },
  {
    icon: ShieldCheck,
    title: "Formatação e Restauração Física de Sistema",
    description:
      "Reinstalação do sistema operacional, recuperação de acesso e configuração do equipamento após reparo físico ou troca de disco.",
  },
];

const Services = () => (
  <section id="servicos" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Serviços de reparo físico
        </h2>
        <p className="text-muted-foreground">
          Soluções executadas no próprio laboratório, sem envio da máquina para terceiros.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, idx) => (
          <div
            key={service.title}
            className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
            style={{ animationDelay: `${idx * 75}ms` }}
          >
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/20">
              <service.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const differentials = [
  {
    icon: MapPin,
    title: "Laboratório próprio",
    description: "Seu equipamento não sai da nossa estrutura. O reparo físico é feito localmente em bancada técnica.",
  },
  {
    icon: ShieldCheck,
    title: "Peças de alta qualidade",
    description: "Usamos componentes compatíveis e confiáveis, com garantia do serviço e da peça aplicada.",
  },
  {
    icon: Clock,
    title: "Atendimento local e físico",
    description: "Atendemos pessoalmente em {CITY}. Você traz o equipamento ou combinamos a coleta na região.",
  },
  {
    icon: CheckCircle2,
    title: "Diagnóstico preciso em bancada",
    description: "Identificamos o defeito real antes de qualquer proposta. Nada de trocar peças sem necessidade.",
  },
];

const Differentials = () => (
  <section className="py-16 md:py-24 bg-muted/30">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Por que escolher nossa oficina?
        </h2>
        <p className="text-muted-foreground">
          Transparência no diagnóstico e execução técnica direta do reparo físico.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {differentials.map((item, idx) => (
          <div
            key={item.title}
            className="rounded-xl bg-background border border-border p-6 transition-all duration-300 hover:border-primary/30"
            style={{ animationDelay: `${idx * 75}ms` }}
          >
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3 text-primary">
              <item.icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.description.replace("{CITY}", CITY)}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => {
  const waUrl = whatsappLink(WA_MESSAGE);
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
          <div>
            <img
              src={BRAND_LOGO_PATH}
              alt={brandConfig.logoAlt}
              width="160"
              height="40"
              className="h-9 w-auto mb-4 brightness-0 invert"
              loading="lazy"
              decoding="async"
            />
            <p className="text-sm text-muted-foreground max-w-sm">
              Oficina independente de reparo físico de computadores e notebooks em {CITY}, {UF}.
              Atendimento local com diagnóstico em bancada.
            </p>
          </div>
          <div className="md:text-right">
            <Button
              variant="whatsapp"
              size="lg"
              asChild
              onClick={() => track("landing_footer")}
              className="gap-2"
            >
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Continuar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-muted/30 p-4 text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Aviso legal:</strong> Somos uma oficina independente de reparo físico de hardware.
          Não possuímos vínculo, patrocínio ou afiliação com fabricantes de software ou hardware.
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {BRAND_NAME}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export const ConsertoComputadorSJP = () => {
  const pageUrl = `${siteConfig.baseUrl}${PATH}`;

  const serviceSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      url: pageUrl,
      name: `Conserto de computadores e notebooks em ${CITY}`,
      description: `Reparo físico de hardware, troca de peças, upgrade SSD/RAM e manutenção de notebooks em ${CITY}, ${UF}.`,
      provider: { "@id": `${siteConfig.baseUrl}/#localbusiness` },
      areaServed: {
        "@type": "City",
        name: CITY,
        containedInPlace: { "@type": "State", name: "Paraná" },
      },
      serviceType: "ComputerRepairService",
    }),
    [pageUrl]
  );
  useJsonLdSlot(SCHEMA_SLOTS.service, serviceSchema, SLOT_PRIORITY.page);

  return (
    <div className="landing-dark min-h-screen bg-background">
      <PageSEO
        title={`Conserto de Computador e Notebook em ${CITY} | ${BRAND_NAME}`}
        description={`Reparo físico de computadores e notebooks em ${CITY}, ${UF}. Troca de peças, upgrade SSD, limpeza interna e diagnóstico em bancada.`}
        path={PATH}
        ogType="website"
      />
      <Header />
      <main>
        <Hero />
        <Services />
        <Differentials />
      </main>
      <Footer />
    </div>
  );
};

export default ConsertoComputadorSJP;
