const REGIONAIS: { nome: string; bairros: string[] }[] = [
  { nome: "Centro e região central", bairros: ["Centro"] },
  { nome: "Matriz / Batel", bairros: ["Batel", "Água Verde", "Bigorrilho"] },
  { nome: "Norte", bairros: ["Cabral", "Boa Vista"] },
  { nome: "Leste", bairros: ["Cajuru"] },
  { nome: "Sul", bairros: ["Portão", "Pinheirinho", "Xaxim", "Boqueirão", "Sítio Cercado"] },
  { nome: "Oeste e CIC", bairros: ["Cidade Industrial (CIC)", "Santa Felicidade"] },
];

const COM_PAGINA: Record<string, string> = {
  Centro: "/bairros/centro",
  Batel: "/bairros/batel",
  "Água Verde": "/bairros/agua-verde",
  Portão: "/bairros/portao",
  "Cidade Industrial (CIC)": "/bairros/cic",
  "Santa Felicidade": "/bairros/santa-felicidade",
  "Boa Vista": "/bairros/boa-vista",
  Bigorrilho: "/bairros/bigorrilho",
  Cabral: "/bairros/cabral",
  Cajuru: "/bairros/cajuru",
  Boqueirão: "/bairros/boqueirao",
  Pinheirinho: "/bairros/pinheirinho",
  Xaxim: "/bairros/xaxim",
  "Sítio Cercado": "/bairros/sitio-cercado",
};

const REGIAO = [
  "São José dos Pinhais",
  "Pinhais",
  "Colombo",
  "Araucária",
  "Campo Largo",
  "Almirante Tamandaré",
  "Fazenda Rio Grande",
  "Piraquara",
  "Quatro Barras",
];

/**
 * Cobertura por regiões e bairros de Curitiba + Região Metropolitana.
 * Modelo Service Area Business: nenhum endereço, CEP ou unidade física.
 */
export const RegioesCuritibaSection = () => (
  <section className="border-y border-border bg-secondary py-14 md:py-18" aria-labelledby="regioes-title">
    <div className="container mx-auto">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-accent">Cobertura</span>
        <h2 id="regioes-title" className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Bairros de Curitiba com guia local próprio
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Cada bairro listado abaixo possui página própria, com contexto de atendimento e links de continuidade.
          A cobertura nas demais regiões é confirmada pela triagem.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {REGIONAIS.map((r) => (
          <div key={r.nome} className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-heading text-base font-bold text-foreground">{r.nome}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {r.bairros.map((b) => {
                const href = COM_PAGINA[b];
                return (
                  <li key={b}>
                    <a
                      href={href}
                      className="inline-block rounded-full border border-accent/40 bg-background px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      {b}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-border bg-card p-5">
        <h3 className="font-heading text-base font-bold text-foreground">Região Metropolitana</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {REGIAO.map((c) => (
            <li key={c}>
              <span className="inline-block rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                {c}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          Não encontrou seu bairro? A cobertura é por área de atendimento — confirme a disponibilidade na triagem.{" "}
          <a href="/areas-atendidas" className="font-semibold text-foreground underline underline-offset-4 hover:text-accent">
            Ver todas as áreas atendidas
          </a>
        </p>
      </div>
    </div>
  </section>
);

export default RegioesCuritibaSection;
