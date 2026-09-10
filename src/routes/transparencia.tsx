import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Painel público de transparência da triagem.
 *
 * Mostra o avanço diário das etapas do funil e os cliques em WhatsApp,
 * sempre agregados e sem qualquer dado pessoal. A função do banco aplica
 * supressão k=5: contagens menores que cinco não são divulgadas.
 *
 * Rota `noindex` — é um painel operacional, não conteúdo editorial.
 */
type Linha = { dia: string; etapa: string; eventos: number | null };

const ROTULOS: Record<string, string> = {
  whatsapp: "Cliques em WhatsApp",
  triagem: "Etapas da triagem",
  submit: "Triagens concluídas",
  view: "Visualizações do funil",
  outros: "Outros eventos",
};

function TransparenciaPage() {
  const [linhas, setLinhas] = useState<Linha[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;
    supabase
      .rpc("triagem_publica_diaria", { dias: 30 })
      .then(({ data, error }) => {
        if (!ativo) return;
        if (error) setErro(error.message);
        else setLinhas((data ?? []) as Linha[]);
      });
    return () => {
      ativo = false;
    };
  }, []);

  const dias = Array.from(new Set((linhas ?? []).map((l) => l.dia)));

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">Transparência da triagem</h1>
      <p className="mb-6 text-muted-foreground">
        Avanço diário das etapas da triagem e dos cliques em WhatsApp nos últimos 30 dias.
        Os números são agregados, sem nome, telefone, endereço ou qualquer identificação.
        Contagens menores que cinco no dia aparecem como “—” para preservar o anonimato.
      </p>

      {erro && (
        <p className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm">
          Não foi possível carregar os números agora: {erro}
        </p>
      )}
      {!linhas && !erro && <p className="text-sm text-muted-foreground">Carregando…</p>}
      {linhas && linhas.length === 0 && (
        <p className="text-sm text-muted-foreground">Ainda não há movimento registrado no período.</p>
      )}

      <div className="space-y-4">
        {dias.map((dia) => (
          <section key={dia} className="rounded-xl border border-border p-4">
            <h2 className="mb-2 text-lg font-semibold">
              {new Date(`${dia}T12:00:00`).toLocaleDateString("pt-BR")}
            </h2>
            <ul className="space-y-1 text-sm">
              {(linhas ?? [])
                .filter((l) => l.dia === dia)
                .map((l) => (
                  <li key={`${dia}-${l.etapa}`} className="flex justify-between gap-4">
                    <span>{ROTULOS[l.etapa] ?? l.etapa}</span>
                    <span className="font-medium tabular-nums">{l.eventos ?? "—"}</span>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}

export const Route = createFileRoute("/transparencia")({
  component: TransparenciaPage,
  head: () => ({
    meta: [
      { title: "Transparência da triagem | O Técnico de Informática" },
      {
        name: "description",
        content:
          "Números agregados do atendimento: avanço diário das etapas da triagem e cliques em WhatsApp, sem dados pessoais.",
      },
      { name: "robots", content: "noindex,follow" },
      { property: "og:title", content: "Transparência da triagem" },
      {
        property: "og:description",
        content: "Avanço diário das etapas da triagem e cliques em WhatsApp, sempre agregados.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});
