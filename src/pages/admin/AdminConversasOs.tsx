import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Navigate } from "@/lib/router-compat";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, Search } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { ChatOs, type AnexoEnviado, type ChatMensagem } from "@/components/os/ChatOs";
import {
  atualizarStatusConversaAdmin,
  historicoOsAdminFn,
  lerConversaOsAdmin,
  listarConversasOsAdmin,
  prepararUploadOsAdmin,
  responderConversaOsAdmin,
} from "@/lib/os/chatOs.functions";

type Conversa = {
  id: string;
  protocolo: string | null;
  assunto: string | null;
  status: string;
  unread_admin: number;
  last_message_at: string | null;
};

type Evento = { em: string; tipo: string; titulo: string; detalhe?: string };

/**
 * Conversas por Ordem de Serviço: o time responde direto, sem código de
 * verificação, e vê a trilha completa (etapas + mensagens + anexos) do pedido.
 */
const AdminConversasOs = () => {
  const { loading, session, isAdmin } = useAdminAuth();
  const [conversas, setConversas] = useState<Conversa[]>([]);
  const [busca, setBusca] = useState("");
  const [ativa, setAtiva] = useState<string | null>(null);
  const [mensagens, setMensagens] = useState<ChatMensagem[]>([]);
  const [protocoloAtivo, setProtocoloAtivo] = useState<string | null>(null);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [carregando, setCarregando] = useState(false);

  const listar = useCallback(async (termo: string) => {
    setCarregando(true);
    try {
      const r = await listarConversasOsAdmin({ data: { busca: termo } });
      setConversas(r.conversas as Conversa[]);
    } catch {
      toast.error("Não foi possível carregar as conversas.");
    } finally {
      setCarregando(false);
    }
  }, []);

  const abrir = useCallback(async (threadId: string) => {
    setAtiva(threadId);
    try {
      const r = await lerConversaOsAdmin({ data: { threadId } });
      setMensagens(r.mensagens as ChatMensagem[]);
      setProtocoloAtivo(r.thread.protocolo ?? null);
      setEventos([]);
      if (r.thread.protocolo) {
        const h = await historicoOsAdminFn({ data: { protocolo: r.thread.protocolo } });
        if (h.ok) setEventos(h.eventos as Evento[]);
      }
    } catch {
      toast.error("Não foi possível abrir a conversa.");
    }
  }, []);

  useEffect(() => {
    if (isAdmin) void listar("");
  }, [isAdmin, listar]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }
  if (!session || !isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Conversas por OS | Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold text-foreground">Conversas por Ordem de Serviço</h1>

        <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
          <Card className="p-4">
            <form
              className="mb-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                void listar(busca);
              }}
            >
              <Input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar protocolo" />
              <Button type="submit" size="icon" aria-label="Buscar">
                <Search className="h-4 w-4" />
              </Button>
              <Button type="button" size="icon" variant="outline" aria-label="Recarregar" onClick={() => void listar(busca)}>
                <RefreshCw className={`h-4 w-4 ${carregando ? "animate-spin" : ""}`} />
              </Button>
            </form>
            <ul className="space-y-2">
              {conversas.length === 0 && <li className="text-sm text-muted-foreground">Nenhuma conversa aberta.</li>}
              {conversas.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => void abrir(c.id)}
                    className={`w-full rounded-md border p-3 text-left text-sm transition-colors ${
                      ativa === c.id ? "border-accent bg-secondary" : "border-border hover:bg-secondary/60"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2 font-medium">
                      {c.protocolo ?? "Sem protocolo"}
                      {c.unread_admin > 0 && <Badge>{c.unread_admin}</Badge>}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {c.assunto ?? "—"} · {c.status}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          <div className="space-y-6">
            {!ativa ? (
              <Card className="p-6 text-sm text-muted-foreground">Selecione uma conversa à esquerda.</Card>
            ) : (
              <>
                <Card className="p-5">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-foreground">{protocoloAtivo ?? "Conversa"}</p>
                    <div className="flex gap-2">
                      {(["resolvida", "arquivada", "aberta"] as const).map((s) => (
                        <Button
                          key={s}
                          size="sm"
                          variant="outline"
                          onClick={async () => {
                            await atualizarStatusConversaAdmin({ data: { threadId: ativa, status: s } });
                            toast.success(`Conversa marcada como ${s}.`);
                            void abrir(ativa);
                            void listar(busca);
                          }}
                        >
                          {s}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <ChatOs
                    mensagens={mensagens}
                    lado="admin"
                    prepararUpload={async (mimeType, sizeBytes) =>
                      prepararUploadOsAdmin({ data: { threadId: ativa, mimeType, sizeBytes } })
                    }
                    enviar={async (texto: string, anexos: AnexoEnviado[]) => {
                      const r = await responderConversaOsAdmin({ data: { threadId: ativa, texto, anexos } });
                      setMensagens(r.mensagens as ChatMensagem[]);
                      void listar(busca);
                    }}
                  />
                </Card>

                <Card className="p-5">
                  <h2 className="mb-3 text-lg font-semibold text-foreground">Histórico do pedido</h2>
                  {eventos.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Sem eventos registrados.</p>
                  ) : (
                    <ol className="space-y-2 text-sm">
                      {eventos.map((ev, i) => (
                        <li key={`${ev.em}-${i}`} className="border-l-2 border-border pl-3">
                          <span className="text-muted-foreground">
                            {new Date(ev.em).toLocaleString("pt-BR")} · {ev.tipo}
                          </span>
                          <p className="font-medium text-foreground">{ev.titulo}</p>
                          {ev.detalhe && <p className="text-muted-foreground">{ev.detalhe}</p>}
                        </li>
                      ))}
                    </ol>
                  )}
                </Card>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminConversasOs;
