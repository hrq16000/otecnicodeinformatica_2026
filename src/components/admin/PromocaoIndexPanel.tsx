import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

/**
 * FILA DE PROMOÇÃO noindex → index — widget de /admin/seo.
 *
 * Fonte única: `public/promocao-index.json`, escrito por
 * `npm run report:promocao-index`. Leitura apenas: a promoção continua
 * sendo feita por código, através do registro editorial fail-closed.
 */

interface Item {
  url: string;
  titulo: string;
  categoria: string;
  classe: "PRONTA" | "QUASE" | "LONGE";
  palavras: number;
  secoes: number;
  similaridadeMax: number;
  bloqueios: string[];
}

interface Relatorio {
  geradoEm: string;
  criterios: { minPalavras: number; maxJaccardCorpo: number; maxJaccardIntencao: number };
  totalArtigos: number;
  aprovados: number;
  foraDoIndice: number;
  prontas: number;
  quase: number;
  longe: number;
  proximaOnda: string[];
  itens: Item[];
}

const COR: Record<Item["classe"], string> = {
  PRONTA: "bg-emerald-500/15 text-emerald-500",
  QUASE: "bg-amber-500/15 text-amber-500",
  LONGE: "bg-muted text-muted-foreground",
};

export function PromocaoIndexPanel() {
  const [dados, setDados] = useState<Relatorio | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [limite, setLimite] = useState(20);

  useEffect(() => {
    let vivo = true;
    fetch("/promocao-index.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((j) => vivo && setDados(j))
      .catch((e) => vivo && setErro(String(e)));
    return () => {
      vivo = false;
    };
  }, []);

  if (erro || !dados) {
    return (
      <Card className="p-4">
        <h2 className="text-sm font-semibold">Fila de promoção (noindex → index)</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Não verificado. Rode <code>npm run report:promocao-index</code> para gerar o inventário.
        </p>
      </Card>
    );
  }

  const visiveis = dados.itens.slice(0, limite);

  return (
    <Card className="p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold">Fila de promoção (noindex → index)</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {dados.foraDoIndice} artigos fora do índice · gerado em{" "}
            {new Date(dados.geradoEm).toLocaleString("pt-BR")} · mínimo {dados.criterios.minPalavras} palavras
            próprias e similaridade ≤ {dados.criterios.maxJaccardCorpo}
          </p>
        </div>
        <div className="flex gap-2">
          <Badge className={COR.PRONTA}>PRONTA {dados.prontas}</Badge>
          <Badge className={COR.QUASE}>QUASE {dados.quase}</Badge>
          <Badge className={COR.LONGE}>LONGE {dados.longe}</Badge>
        </div>
      </div>

      {dados.proximaOnda.length > 0 && (
        <div className="mt-3 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3">
          <p className="text-xs font-semibold text-emerald-500">Onda sugerida (até 8 URLs)</p>
          <ul className="mt-1 space-y-0.5">
            {dados.proximaOnda.map((u) => (
              <li key={u} className="text-xs">
                <a className="underline" href={u}>
                  {u}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-muted-foreground">
            <tr>
              <th className="py-1 pr-3">URL</th>
              <th className="py-1 pr-3">Classe</th>
              <th className="py-1 pr-3">Palavras</th>
              <th className="py-1 pr-3">Seções</th>
              <th className="py-1 pr-3">Sim.</th>
              <th className="py-1">O que falta</th>
            </tr>
          </thead>
          <tbody>
            {visiveis.map((i) => (
              <tr key={i.url} className="border-t border-border/50 align-top">
                <td className="py-1 pr-3">
                  <a className="underline" href={i.url}>
                    {i.url}
                  </a>
                </td>
                <td className="py-1 pr-3">
                  <Badge className={COR[i.classe]}>{i.classe}</Badge>
                </td>
                <td className="py-1 pr-3">{i.palavras}</td>
                <td className="py-1 pr-3">{i.secoes}</td>
                <td className="py-1 pr-3">{i.similaridadeMax}</td>
                <td className="py-1 text-muted-foreground">{i.bloqueios.join(" · ") || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {limite < dados.itens.length && (
        <button
          type="button"
          className="mt-3 rounded-md border px-3 py-1 text-xs"
          onClick={() => setLimite((l) => l + 30)}
        >
          Mostrar mais ({dados.itens.length - limite} restantes)
        </button>
      )}
    </Card>
  );
}

export default PromocaoIndexPanel;
