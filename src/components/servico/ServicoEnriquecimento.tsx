import {
  RespostaRapida,
  TabelaDiagnosticaBloco,
  BlocosTecnicos,
  FontesPrimarias,
} from "@/components/BlocosEnriquecimento";
import { ENRIQUECIMENTO_SERVICOS } from "@/lib/enriquecimentoServicos";
import { ENRIQUECIMENTO_4A, mesclarEnriquecimento } from "@/lib/enriquecimentoAtp4a";

/**
 * Mantém TODO o enriquecimento editorial (resposta direta, tabelas e fontes)
 * no SSR. O split evita avaliar os catálogos globais de serviço junto
 * do módulo principal de página no primeiro parse do navegador.
 */
export const ServicoEnriquecimento = ({
  slug,
  tipo,
}: {
  slug: string;
  tipo: "resposta" | "diagnostico";
}) => {
  const enriquecimento = mesclarEnriquecimento(
    ENRIQUECIMENTO_SERVICOS[slug],
    ENRIQUECIMENTO_4A[`/servicos/${slug}`],
  );

  if (tipo === "resposta") {
    if (!enriquecimento?.respostaRapida) return null;
    return (
      <section className="bg-background pt-10">
        <div className="container mx-auto max-w-3xl px-4">
          <RespostaRapida texto={enriquecimento.respostaRapida} />
        </div>
      </section>
    );
  }

  if (!(enriquecimento?.tabelaDiagnostica || enriquecimento?.tabelaExtra || enriquecimento?.blocos)) return null;
  return (
    <section className="bg-background pb-4">
      <div className="container mx-auto max-w-3xl px-4">
        {enriquecimento?.tabelaDiagnostica ? (
          <TabelaDiagnosticaBloco tabela={enriquecimento.tabelaDiagnostica} />
        ) : null}
        <BlocosTecnicos blocos={enriquecimento?.blocos} />
        {enriquecimento?.tabelaExtra ? (
          <TabelaDiagnosticaBloco tabela={enriquecimento.tabelaExtra} id="tabela-decisao" />
        ) : null}
        <FontesPrimarias fontes={enriquecimento?.fontes} />
      </div>
    </section>
  );
};
