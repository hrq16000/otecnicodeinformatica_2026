import {
  RespostaRapida,
  TabelaDiagnosticaBloco,
  BlocosTecnicos,
} from "@/components/BlocosEnriquecimento";
import { enriquecimento4c } from "@/lib/enriquecimento4cLocal";

/**
 * Rodada 4C — blocos de autoridade comercial local.
 *
 * Fail-closed: se o caminho não tiver conteúdo autoral declarado em
 * src/lib/enriquecimento4cLocal.ts, nada é renderizado. Isso impede que a
 * seção vire template repetido entre páginas (regra anti-doorway).
 */
export const BlocosLocal4c = ({ path }: { path: string }) => {
  const conteudo = enriquecimento4c(path);
  if (!conteudo) return null;

  return (
    <section className="container mx-auto max-w-4xl px-4 py-12" data-bloco-4c={path}>
      {conteudo.respostaRapida ? <RespostaRapida texto={conteudo.respostaRapida} /> : null}
      {conteudo.tabelaExtra ? (
        <TabelaDiagnosticaBloco tabela={conteudo.tabelaExtra} id="tabela-decisao-4c" />
      ) : null}
      <BlocosTecnicos blocos={conteudo.blocos} />
    </section>
  );
};

export default BlocosLocal4c;
