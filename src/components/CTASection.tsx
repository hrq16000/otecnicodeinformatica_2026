import { Building2, LifeBuoy, MapPin, MessageCircle, Search, UserSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";
import { WHATSAPP_NUMBER as WA_NUMBER } from "@/lib/siteConfig";

const WHATSAPP_NUMBER = WA_NUMBER;

type CtaIntent = "problem" | "guide" | "service" | "business" | "location" | "professional";

const CTA_CONTENT: Record<
  CtaIntent,
  {
    eyebrow: string;
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
    message: string;
    icon: typeof LifeBuoy;
  }
> = {
  problem: {
    eyebrow: "Triagem por sintoma",
    title: "Conte o que está acontecendo",
    description: "Você não precisa saber o nome do defeito. Descreva os sinais e a triagem indica o próximo passo.",
    primaryLabel: "Diagnosticar meu problema",
    secondaryLabel: "Descrever sem escolher serviço",
    message: "Olá! Quero descrever um problema e entender o próximo passo.",
    icon: LifeBuoy,
  },
  guide: {
    eyebrow: "Depois da leitura",
    title: "Precisa avaliar o seu caso?",
    description: "Use o guia como referência e conte o que acontece no seu equipamento para receber uma orientação de modalidade.",
    primaryLabel: "Ver o próximo passo",
    secondaryLabel: "Pedir orientação técnica",
    message: "Olá! Li um guia do portal e quero explicar o que acontece no meu equipamento.",
    icon: Search,
  },
  service: {
    eyebrow: "Avaliação técnica",
    title: "Já encontrou o serviço adequado?",
    description: "Informe o equipamento e o sintoma. A modalidade, o escopo e as condições são apresentados antes da execução.",
    primaryLabel: "Solicitar avaliação técnica",
    secondaryLabel: "Ainda não sei qual serviço escolher",
    message: "Olá! Quero solicitar uma avaliação técnica e explicar o problema.",
    icon: MessageCircle,
  },
  business: {
    eyebrow: "Atendimento empresarial",
    title: "O que está afetando a operação?",
    description: "Comece pelo impacto na equipe. Depois organizamos equipamentos, prioridade e modalidade de atendimento.",
    primaryLabel: "Organizar atendimento empresarial",
    secondaryLabel: "Descrever a situação da empresa",
    message: "Olá! Preciso organizar um atendimento técnico para a minha empresa.",
    icon: Building2,
  },
  location: {
    eyebrow: "Atendimento local",
    title: "Quer confirmar a cobertura para sua região?",
    description: "Informe sua localização e o tipo de problema para verificar disponibilidade, modalidade e eventual deslocamento.",
    primaryLabel: "Ver disponibilidade na região",
    secondaryLabel: "Explicar o problema primeiro",
    message: "Olá! Quero verificar a modalidade e a disponibilidade de atendimento na minha região.",
    icon: MapPin,
  },
  professional: {
    eyebrow: "Rede de parceiros",
    title: "Procura uma especialidade na sua cidade?",
    description: "Consulte profissionais independentes por localização e área de atuação, com status e informações do perfil.",
    primaryLabel: "Encontrar um especialista",
    secondaryLabel: "Explicar o que preciso",
    message: "Olá! Quero encontrar um profissional para o meu tipo de necessidade.",
    icon: UserSearch,
  },
};

export const CTASection = ({
  intent = "problem",
  subject,
}: {
  intent?: CtaIntent;
  subject?: string;
}) => {
  const content = CTA_CONTENT[intent];
  const Icon = content.icon;
  const message = subject ? `${content.message} Contexto: ${subject}.` : content.message;
  const location = `final_cta_${intent}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  
  const openChatbot = () => {
    trackCTAClick("chatbot", `${location}_secondary`);
    window.dispatchEvent(
      new CustomEvent("wa-funnel:open", {
        detail: { location: `${location}_secondary`, message },
      }),
    );
  };

  return (
    <section className="border-y border-border bg-muted py-10 md:py-14">
      <div className="container mx-auto">
        <div className="mx-auto grid max-w-5xl gap-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
              <Icon className="h-4 w-4" aria-hidden="true" />
              {content.eyebrow}
            </p>
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              {content.title}
            </h2>
            <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-muted-foreground">
              {content.description}
            </p>
            {subject && (
              <p className="mt-3 text-sm font-medium text-foreground">Contexto: {subject}</p>
            )}
          </div>

          <div className="flex w-full flex-col gap-3 md:w-80">
            <Button variant="heroWhatsapp" size="lg" className="w-full" asChild>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location={location}
                data-wa-source="whatsapp_cta"
                onClick={() => trackCTAClick("whatsapp", location)}
              >
                <MessageCircle className="h-5 w-5" />
                {content.primaryLabel}
              </a>
            </Button>

            <Button variant="outline" size="lg" className="w-full" onClick={openChatbot}>
              {content.secondaryLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
