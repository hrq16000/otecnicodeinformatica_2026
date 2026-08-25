/**
 * RODADA 5A — medição de leads por rota no nível do documento.
 *
 * Captura, com um único listener delegado (sem tocar em componente algum):
 *   · cliques/toques em qualquer link `wa.me` / `api.whatsapp.com` → WhatsApp;
 *   · toques em `tel:` — a política do site mantém telefone oculto, então esse
 *     caminho serve como sensor: se algo aparecer, medimos e o gate
 *     `check:phone-visibility` continua sendo a trava.
 *
 * Só usa o contexto de rota já padronizado no contrato de analytics
 * (`trackWaClick` / `trackCallClick`), portanto não carrega PII: nada de
 * número, nome, texto livre ou destino do WhatsApp é enviado.
 *
 * Idempotente: instalar duas vezes não duplica eventos.
 */

let instalado = false;

const ehWhatsapp = (href: string) => /(^|\/\/)(api\.whatsapp\.com|wa\.me)\b/i.test(href);

/** Rótulo estável e não sensível do ponto de origem do clique. */
function localDoClique(el: HTMLElement): string {
  const explicito = el.closest<HTMLElement>("[data-cta-location]")?.dataset.ctaLocation;
  if (explicito) return explicito;
  const secao = el.closest<HTMLElement>("section[id], [data-section]");
  const id = secao?.id || secao?.dataset.section;
  if (id) return `secao:${id}`;
  if (el.closest("footer")) return "rodape";
  if (el.closest("header")) return "cabecalho";
  return "conteudo";
}

export function installLeadTapTracking() {
  if (instalado || typeof document === "undefined") return;
  instalado = true;

  document.addEventListener(
    "click",
    (evento) => {
      const alvo = evento.target as HTMLElement | null;
      const link = alvo?.closest?.<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const isWa = ehWhatsapp(href);
      const isTel = href.startsWith("tel:");
      if (!isWa && !isTel) return;

      // Evita contagem dupla quando o próprio componente já instrumenta o CTA.
      if (link.dataset.leadTracked === "1") return;

      const location = localDoClique(link);
      void import("@/lib/funnelAnalytics").then(({ trackWaClick, trackCallClick }) => {
        if (isWa) trackWaClick(location, { captura: "delegada" });
        else trackCallClick(location, { captura: "delegada" });
      });
    },
    { capture: true, passive: true },
  );
}
