/**
 * PONTES PÁGINA → BIBLIOTECA TÉCNICA (Fase 3) — glossário e ferramentas.
 *
 * Mesmo contrato das pontes do Atlas (atlasPonteServicos.ts):
 *  - fail-closed: página sem ponte declarada não renderiza nada;
 *  - texto próprio por página (nunca template repetido);
 *  - bloco aditivo e educativo — não altera preço, escopo nem CTA;
 *  - só entra vínculo REAL: a ferramenta/termo precisa ajudar exatamente na
 *    decisão daquela página. O gate check:biblioteca valida os slugs.
 */
import { ferramentaPorSlug, type FerramentaTecnica } from "@/lib/ferramentasTecnicas";
import { termoPorSlug, type TermoGlossario } from "@/lib/glossarioTecnico";

export interface BibliotecaPonteDef {
  /** Por que esta ferramenta/termo ajuda ANTES de decidir — texto próprio. */
  intro: string;
  /** Slugs de /ferramentas/<slug>. */
  ferramentas?: string[];
  /** Slugs de /glossario/<slug>. */
  termos?: string[];
}

/**
 * Chaves: slug do serviço (mesmo usado em ServicoCore/atlasPonteServicos) ou
 * `problema:<slug>` para os pilares autorais de /problemas.
 */
export const BIBLIOTECA_PONTES: Record<string, BibliotecaPonteDef> = {
  // ── Pilares de problemas (páginas autorais) ────────────────────────────
  "problema:computador-lento": {
    intro:
      "Antes de decidir entre limpeza, SSD ou memória, vale registrar QUANDO a lentidão aparece. O checklist abaixo organiza essa observação em sete passos seguros — e os termos explicam o que cada medição significa.",
    ferramentas: ["checklist-computador-lento"],
    termos: ["memoria-ram", "ssd"],
  },
  "problema:notebook-nao-liga": {
    intro:
      "Se o notebook dá algum sinal mas não chega ao sistema, anotar em que ponto a partida para é a informação que mais encurta o diagnóstico. O roteiro abaixo mostra o que observar sem abrir o equipamento.",
    ferramentas: ["roteiro-falha-de-inicializacao"],
    termos: ["bios", "uefi"],
  },

  // ── Serviços canônicos (mesmos slugs de ServicoCore) ───────────────────
  formatacao: {
    intro:
      "Formatação apaga tudo por definição — e quase todo prejuízo vem de pular a conferência do backup. O checklist abaixo lista o que copiar, testar e anotar ANTES de autorizar qualquer reinstalação.",
    ferramentas: ["checklist-antes-de-formatar"],
    termos: ["imagem-do-sistema"],
  },
  "upgrade-ssd-ram": {
    intro:
      "Disco e memória resolvem lentidões diferentes. A orientação abaixo cruza os sintomas observáveis para indicar qual upgrade tende a valer no SEU caso — e os termos explicam a diferença entre SSD comum e NVMe.",
    ferramentas: ["ssd-ou-ram"],
    termos: ["nvme", "memoria-ram"],
  },
  "recuperacao-de-dados": {
    intro:
      "Em suspeita de perda de dados, cada tentativa por conta própria reduz a chance de recuperação. Entenda o que acontece no processo e por que a leitura S.M.A.R.T. define o caminho antes de qualquer varredura.",
    ferramentas: ["verificador-de-backup"],
    termos: ["recuperacao-de-dados", "smart"],
  },
  "backup-para-empresas": {
    intro:
      "Backup que nunca foi testado é promessa, não cópia. O verificador abaixo confere a rotina em cinco perguntas objetivas — e o glossário explica por que o incremental muda o custo e o tempo da rotina.",
    ferramentas: ["verificador-de-backup"],
    termos: ["backup-incremental"],
  },
  "redes-e-wifi": {
    intro:
      "Wi-Fi que conecta mas não navega raramente é problema de sinal. Antes de trocar equipamento, vale entender os dois mecanismos que mais confundem o diagnóstico de rede doméstica.",
    termos: ["dns", "nat"],
  },
  "remocao-de-virus": {
    intro:
      "Parte das infecções altera a resolução de nomes para redirecionar a navegação — o sintoma parece 'internet lenta', mas a causa é outra. Entender o mecanismo ajuda a reconhecer a reincidência cedo.",
    termos: ["dns", "bitlocker"],
  },
};

export interface BibliotecaPonteResolvida {
  intro: string;
  ferramentas: FerramentaTecnica[];
  termos: TermoGlossario[];
}

/** Resolve a ponte de uma chave; slugs inexistentes são descartados (fail-closed). */
export const bibliotecaPonteDe = (chave: string): BibliotecaPonteResolvida | null => {
  const def = BIBLIOTECA_PONTES[chave];
  if (!def) return null;
  const ferramentas = (def.ferramentas ?? [])
    .map((s) => ferramentaPorSlug(s))
    .filter((f): f is FerramentaTecnica => Boolean(f));
  const termos = (def.termos ?? [])
    .map((s) => termoPorSlug(s))
    .filter((t): t is TermoGlossario => Boolean(t));
  if (ferramentas.length === 0 && termos.length === 0) return null;
  return { intro: def.intro, ferramentas, termos };
};
