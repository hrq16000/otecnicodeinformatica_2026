import { MobileServicoFunnelBar } from "@/components/servico/MobileServicoFunnelBar";
import { copyCtaMobile } from "@/lib/experimentosCtaMobile";
import { getSessionId } from "@/lib/funnelSubmission";
import { whatsappLinkComContexto } from "@/lib/waContextLink";

interface DeferredMobileServicoFunnelProps {
  path: string;
  trackingKey: string;
  serviceName: string;
  whatsappMessage: string;
  processo: { title: string }[];
  ctaLabel?: string;
  onClick: (variant: string) => void;
}

/**
 * Ilha móvel de conversão. O módulo próprio impede que experimento, sessão e
 * atribuição participem da hidratação crítica do hero.
 */
export const DeferredMobileServicoFunnel = ({
  path,
  trackingKey,
  serviceName,
  whatsappMessage,
  processo,
  ctaLabel,
  onClick,
}: DeferredMobileServicoFunnelProps) => {
  const sessionId = typeof window !== "undefined" ? getSessionId() : "";
  const cta = copyCtaMobile(path, sessionId, serviceName);
  const href = whatsappLinkComContexto(whatsappMessage, {
    medium: "cta_mobile",
    servico: trackingKey,
    posicao: "mobile_sticky",
    variante: cta.id,
    etapa: "triagem",
  });
  const etapasDoServico = processo.map((item) => item.title.split(" ").slice(0, 2).join(" "));
  const etapas =
    etapasDoServico.length >= 4
      ? etapasDoServico.slice(0, 4)
      : ["Triagem", "Diagnóstico", "Aprovação", "Execução"];

  return (
    <MobileServicoFunnelBar
      href={href}
      servicoLabel={serviceName}
      etapas={etapas}
      ctaLabel={ctaLabel ?? cta.ctaLabel}
      apoio={cta.apoio}
      variante={cta.id}
      location={`${trackingKey}_mobile_sticky`}
      onClick={() => onClick(cta.id)}
    />
  );
};

export default DeferredMobileServicoFunnel;
