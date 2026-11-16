import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function OrderResponseChart({ rows }: { rows: { key: string; responseMs: number | null; responseCount: number }[] }) {
  const data = rows.filter(row => row.responseMs !== null).map(row => ({ name: row.key, horas: (row.responseMs ?? 0) / 3600000, ordens: row.responseCount }));
  if (!data.length) return <p className="py-3 text-sm text-muted-foreground">Nenhuma primeira resposta registrada neste período.</p>;
  return <div className="h-80 w-full min-w-0" role="img" aria-label="Tempo médio da primeira resposta em horas por sintoma e bairro">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 12, right: 16, bottom: 20, left: 0 }}>
        <CartesianGrid stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
        <YAxis unit=" h" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
        <Tooltip formatter={(value: number) => [`${value.toLocaleString("pt-BR", { maximumFractionDigits: 2 })} h`, "Primeira resposta"]} />
        <Bar dataKey="horas" fill="hsl(var(--primary))" maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  </div>;
}