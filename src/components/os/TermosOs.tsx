import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import type { BlocoTermos } from "@/lib/os/modalidadeOs";

interface Props {
  blocos: BlocoTermos[];
  aceitos: Record<string, boolean>;
  onToggle: (id: string, valor: boolean) => void;
}

/**
 * Termos da OS: texto integral visível (accordions abertos por padrão),
 * tipografia legível e aceite explícito por bloco.
 */
export const TermosOs = ({ blocos, aceitos, onToggle }: Props) => {
  // A modalidade pode mudar enquanto o formulário é preenchido e trocar os
  // blocos: o acordeão é controlado e reabre os blocos vigentes, para o texto
  // nunca sumir nem o aceite ficar inacessível.
  const ids = blocos.map((b) => b.id);
  const [abertos, setAbertos] = useState<string[]>(ids);
  const chave = ids.join("|");
  useEffect(() => {
    setAbertos(chave ? chave.split("|") : []);
  }, [chave]);

  return (
  <Accordion
    type="multiple"
    value={abertos}
    onValueChange={setAbertos}
    className="divide-y divide-border rounded-xl border border-border bg-card"
    data-testid="os-termos"
  >
    {blocos.map((bloco) => (
      <AccordionItem key={bloco.id} value={bloco.id} className="border-0 px-4">
        <AccordionTrigger className="text-left text-base font-semibold text-foreground">
          {bloco.titulo}
        </AccordionTrigger>
        <AccordionContent className="pb-5">
          <div className="space-y-3 text-[0.95rem] leading-relaxed text-foreground/80">
            {bloco.paragrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {/* Sem <label htmlFor>: o Checkbox é um button e o label duplicaria
              o toggle, cancelando o próprio clique. */}
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-border bg-background/60 p-3 transition-colors hover:bg-background">
            <Checkbox
              id={`aceite-${bloco.id}`}
              checked={Boolean(aceitos[bloco.id])}
              onCheckedChange={(v) => onToggle(bloco.id, v === true)}
              className="mt-0.5"
              aria-labelledby={`aceite-texto-${bloco.id}`}
            />
            <span
              id={`aceite-texto-${bloco.id}`}
              className="cursor-pointer text-sm leading-snug text-foreground"
              onClick={() => onToggle(bloco.id, !aceitos[bloco.id])}
            >
              {bloco.aceite}
            </span>
          </div>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
  );
};

export default TermosOs;
