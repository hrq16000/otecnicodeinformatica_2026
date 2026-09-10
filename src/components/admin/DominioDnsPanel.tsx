import { useCallback, useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { checarPropagacaoDns, type ChecagemDns } from "@/lib/dns.functions";

/**
 * DOMÍNIOS E DNS — /admin/seo.
 *
 * Cadastro dos hosts (domínio, subdomínios) com o registro esperado e leitura
 * de propagação em tempo real por resolvedores públicos. Nada é presumido:
 * resolvedor sem resposta aparece como "desconhecido".
 */

type Registro = {
  id: string;
  hostname: string;
  tipo: string;
  valor_esperado: string;
  principal: boolean;
  observacao: string | null;
};

const TIPOS = ["A", "AAAA", "CNAME", "TXT"];

function StatusBadge({ checagem }: { checagem?: ChecagemDns }) {
  if (!checagem) return <Badge variant="outline">não verificado</Badge>;
  if (checagem.propagacao === 100) return <Badge className="bg-emerald-600">propagado 100%</Badge>;
  if (checagem.propagacao > 0) return <Badge className="bg-amber-600">propagando {checagem.propagacao}%</Badge>;
  return <Badge variant="destructive">não encontrado</Badge>;
}

export function DominioDnsPanel() {
  const checar = useServerFn(checarPropagacaoDns);
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [checagens, setChecagens] = useState<Record<string, ChecagemDns>>({});
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [auto, setAuto] = useState(false);
  const [novo, setNovo] = useState({ hostname: "", tipo: "A", valor_esperado: "185.158.133.1", observacao: "" });

  const carregar = useCallback(async () => {
    const { data, error } = await supabase
      .from("dns_records")
      .select("id, hostname, tipo, valor_esperado, principal, observacao")
      .order("principal", { ascending: false })
      .order("hostname");
    if (error) {
      setErro(error.message);
      return;
    }
    setErro(null);
    setRegistros((data ?? []) as Registro[]);
  }, []);

  const verificar = useCallback(
    async (lista: Registro[]) => {
      if (lista.length === 0) return;
      setCarregando(true);
      try {
        const resultados = await Promise.all(
          lista.map(async (registro) => {
            try {
              const resultado = await checar({
                data: {
                  hostname: registro.hostname,
                  tipo: registro.tipo,
                  valorEsperado: registro.valor_esperado,
                },
              });
              return [registro.id, resultado] as const;
            } catch {
              return null;
            }
          }),
        );
        setChecagens((atual) => {
          const proximo = { ...atual };
          for (const item of resultados) if (item) proximo[item[0]] = item[1];
          return proximo;
        });
      } finally {
        setCarregando(false);
      }
    },
    [checar],
  );

  useEffect(() => {
    void carregar();
  }, [carregar]);

  useEffect(() => {
    if (registros.length > 0) void verificar(registros);
  }, [registros, verificar]);

  useEffect(() => {
    if (!auto) return;
    const timer = setInterval(() => void verificar(registros), 30000);
    return () => clearInterval(timer);
  }, [auto, registros, verificar]);

  async function adicionar() {
    const hostname = novo.hostname.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    if (!hostname) return;
    const { error } = await supabase.from("dns_records").insert({
      hostname,
      tipo: novo.tipo,
      valor_esperado: novo.valor_esperado.trim(),
      observacao: novo.observacao.trim() || null,
    });
    if (error) {
      setErro(error.message);
      return;
    }
    setNovo({ hostname: "", tipo: "A", valor_esperado: "185.158.133.1", observacao: "" });
    await carregar();
  }

  async function remover(id: string) {
    const { error } = await supabase.from("dns_records").delete().eq("id", id);
    if (error) {
      setErro(error.message);
      return;
    }
    await carregar();
  }

  return (
    <Card className="p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold">Domínios e DNS</h2>
          <p className="text-sm text-muted-foreground">
            Cadastre o domínio, os subdomínios e o registro esperado. A propagação é lida ao vivo em três resolvedores públicos.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setAuto((v) => !v)}>
            {auto ? "Auto (30s): ligado" : "Auto (30s): desligado"}
          </Button>
          <Button size="sm" onClick={() => void verificar(registros)} disabled={carregando}>
            {carregando ? "Verificando…" : "Verificar agora"}
          </Button>
        </div>
      </div>

      {erro && <p className="mt-3 text-sm text-destructive">{erro}</p>}

      <div className="mt-4 grid gap-2 sm:grid-cols-5">
        <Input
          placeholder="host (ex.: blog.seudominio.com.br)"
          value={novo.hostname}
          onChange={(e) => setNovo({ ...novo, hostname: e.target.value })}
          className="sm:col-span-2"
        />
        <select
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          value={novo.tipo}
          onChange={(e) => setNovo({ ...novo, tipo: e.target.value })}
        >
          {TIPOS.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
        <Input
          placeholder="valor esperado"
          value={novo.valor_esperado}
          onChange={(e) => setNovo({ ...novo, valor_esperado: e.target.value })}
        />
        <Button onClick={() => void adicionar()}>Cadastrar</Button>
      </div>

      <div className="mt-5 space-y-3">
        {registros.length === 0 && (
          <p className="text-sm text-muted-foreground">Nenhum host cadastrado ainda.</p>
        )}
        {registros.map((registro) => {
          const checagem = checagens[registro.id];
          return (
            <div key={registro.id} className="rounded-lg border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">{registro.hostname}</span>
                  <Badge variant="outline">{registro.tipo}</Badge>
                  {registro.principal && <Badge variant="secondary">principal</Badge>}
                  <StatusBadge checagem={checagem} />
                </div>
                <Button variant="ghost" size="sm" onClick={() => void remover(registro.id)}>
                  Remover
                </Button>
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                Esperado: <code>{registro.valor_esperado}</code>
                {registro.observacao ? ` · ${registro.observacao}` : ""}
              </p>

              {checagem && (
                <div className="mt-2 grid gap-1 text-xs">
                  {checagem.resolvers.map((item) => (
                    <div key={item.resolver} className="flex flex-wrap items-center gap-2">
                      <span className="w-24 text-muted-foreground">{item.resolver}</span>
                      <span className={item.confere ? "text-emerald-600" : "text-muted-foreground"}>
                        {item.status === "DESCONHECIDO"
                          ? `sem resposta${item.erro ? ` (${item.erro})` : ""}`
                          : item.valores.length > 0
                            ? item.valores.join(", ")
                            : "nenhum registro"}
                      </span>
                    </div>
                  ))}
                  <div className="mt-1 text-muted-foreground">
                    Site:{" "}
                    {checagem.http.status === null
                      ? `sem resposta${checagem.http.erro ? ` (${checagem.http.erro})` : ""}`
                      : `HTTP ${checagem.http.status}${checagem.http.redirectPara ? ` → ${checagem.http.redirectPara}` : ""}`}
                    {" · "}
                    verificado às {new Date(checagem.checadoEm).toLocaleTimeString("pt-BR")}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Registro A do domínio deve apontar para 185.158.133.1. Alterações no provedor de DNS podem levar minutos (às vezes horas) até
        aparecerem em todos os resolvedores.
      </p>
    </Card>
  );
}
