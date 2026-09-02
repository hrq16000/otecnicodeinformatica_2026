import { creditFor } from "@/lib/imageCredits";

/**
 * Crédito e link de licença visíveis, exigidos pelo gate check:image-credits.
 * Sempre renderizado dentro de um <figcaption>.
 */
export const FotoCredito = ({ src, legenda }: { src: string; legenda?: string }) => {
  const c = creditFor(src);
  return (
    <figcaption className="p-3 text-xs text-muted-foreground text-center italic">
      {legenda ? <span>{legenda} — </span> : null}
      {c.creditText} —{" "}
      <a href={c.licenseUrl} rel="nofollow noopener" target="_blank" className="underline">
        {c.license}
      </a>
    </figcaption>
  );
};
