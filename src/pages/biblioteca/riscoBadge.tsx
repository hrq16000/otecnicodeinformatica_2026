import type { RiscoNivel } from "@/lib/glossarioTecnico";

/**
 * Badges de nível de risco da Biblioteca Técnica — mesmos três níveis
 * canônicos do Atlas (src/pages/GuiaTecnicoInformatica.tsx), com tokens
 * semânticos apenas (nunca cor hardcoded).
 */
export const RISCO_BADGE_CLASSES: Record<RiscoNivel, string> = {
  "Seguro de fazer sozinho": "border-border bg-secondary/60 text-muted-foreground",
  "Exige atenção": "border-accent/40 bg-accent/10 text-accent",
  "Parada obrigatória": "border-destructive/40 bg-destructive/10 text-destructive",
};
