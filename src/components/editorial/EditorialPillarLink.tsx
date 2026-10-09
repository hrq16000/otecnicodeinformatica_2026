import { Link } from "@/lib/router-compat";
import { ArrowRight, BookOpen } from "lucide-react";

type EditorialPillar = { to: string; label: string };

/**
 * Complemento fail-closed para artigos aprovados que ainda não pertencem ao
 * mapa comercial legado de `editorialClusters`. Mantém uma saída editorial
 * explícita antes do CTA e espelha o pilar aprovado na onda de publicação.
 */
const EDITORIAL_PILLARS: Record<string, EditorialPillar> = {
  "computador-entra-direto-na-bios": { to: "/servicos/manutencao-de-computador", label: "Manutenção e conserto de computador" },
  "botao-power-nao-funciona-jump-start-placa-mae": { to: "/servicos/manutencao-de-computador", label: "Conserto de computador" },
  "bios-corrompida-reset-cmos-atualizacao": { to: "/blog/computador-entra-direto-na-bios", label: "Computador entra direto na BIOS" },
  "limpar-cache-do-windows-update-softwaredistribution": { to: "/servicos/manutencao-de-computador", label: "Manutenção de computador" },
  "windows-reparo-automatico-em-loop": { to: "/servicos/manutencao-de-computador", label: "Manutenção de computador" },
  "historico-de-arquivos-windows-como-configurar": { to: "/servicos/backup-para-empresas", label: "Backup para empresas" },
  "como-configurar-2fa-em-tudo": { to: "/seguranca-dos-dados", label: "Segurança dos dados" },
  "trocar-windows-por-linux-vale-a-pena": { to: "/guia-tecnico-informatica", label: "Guia do técnico de informática" },
  "como-recuperar-conta-hackeada": { to: "/seguranca-dos-dados", label: "Segurança dos dados" },
  "como-fazer-backup-fotos-windows-iniciantes": { to: "/seguranca-dos-dados", label: "Segurança dos dados" },
  "como-atualizar-windows-corretamente": { to: "/guia-tecnico-informatica", label: "Guia do técnico de informática" },
  "como-organizar-arquivos-windows-iniciantes": { to: "/guia-tecnico-informatica", label: "Guia do técnico de informática" },
  "como-configurar-bios-uefi-corretamente": { to: "/guia-tecnico-informatica", label: "Guia do técnico de informática" },
  "como-configurar-servidor-de-arquivos": { to: "/empresa-de-ti-curitiba", label: "TI para empresas" },
  "como-configurar-firewall-ufw-linux": { to: "/seguranca-dos-dados", label: "Segurança dos dados" },
  "como-fazer-backup-na-nuvem": { to: "/seguranca-dos-dados", label: "Segurança dos dados" },
  "como-instalar-ubuntu-do-zero": { to: "/guia-tecnico-informatica", label: "Guia do técnico de informática" },
  "como-gerenciar-pacotes-apt-dnf-linux": { to: "/blog/comandos-linux-essenciais-iniciantes", label: "Comandos Linux para iniciantes" },
};

export function EditorialPillarLink({ slug }: { slug: string }) {
  const pilar = EDITORIAL_PILLARS[slug];
  if (!pilar) return null;

  return (
    <aside className="not-prose mt-8 rounded-xl border border-border bg-muted/25 p-5" aria-label="Próxima leitura recomendada">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent">
        <BookOpen className="h-4 w-4" aria-hidden="true" />
        Continue no portal
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Consulte o pilar relacionado para conectar este procedimento a decisões, limites e próximos passos.
      </p>
      <Link to={pilar.to} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
        {pilar.label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </aside>
  );
}
