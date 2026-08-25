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
export const TermosOs = ({ blocos, aceitos, onToggle }: Props) => (
  <Accordion
    type="multiple"
    defaultValue={blocos.map((b) => b.id)}
    className="divide-y divide-border rounded-xl border border-border bg-card"
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
          <label
            className="mt-4 flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-background/60 p-3 transition-colors hover:bg-background"
            htmlFor={`aceite-${bloco.id}`}
          >
            <Checkbox
              id={`aceite-${bloco.id}`}
              checked={Boolean(aceitos[bloco.id])}
              onCheckedChange={(v) => onToggle(bloco.id, v === true)}
              className="mt-0.5"
            />
            <span className="text-sm leading-snug text-foreground">{bloco.aceite}</span>
          </label>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export default TermosOs;
