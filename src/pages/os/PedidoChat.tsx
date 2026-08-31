import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, MessagesSquare } from "lucide-react";
import { ChatOs, type AnexoEnviado, type ChatMensagem } from "@/components/os/ChatOs";
import {
  abrirConversaOs,
  enviarMensagemOs,
  lerConversaOs,
  prepararUploadOs,
} from "@/lib/os/chatOs.functions";

const CHAVE_LOCAL = "os_chat_token";

type Conversa = {
  thread: { id: string; protocolo: string | null; assunto: string | null; status: string; abertaEm: string };
  os: {
    protocolo: string;
    status: string;
    modalidade: string | null;
    equipamento: string | null;
    previsaoConclusao: string | null;
    observacoesPublicas: string | null;
    etapas: { titulo: string; em: string | null; detalhe: string | null }[];
  } | null;
  mensagens: ChatMensagem[];
};

/**
 * Acompanhamento do pedido com chat direto (sem código de verificação).
 * O acesso é provado com protocolo + celular cadastrado na OS; o servidor
 * devolve uma chave opaca que fica só neste navegador.
 */
const PedidoChat = () => {
  const [token, setToken] = useState<string | null>(null);
  const [conversa, setConversa] = useState<Conversa | null>(null);
  const [protocolo, setProtocolo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [carregando, setCarregando] = useState(false);

  const carregar = useCallback(async (t: string) => {
    setCarregando(true);
    const r = await lerConversaOs({ data: { token: t } });
    setCarregando(false);
    if (!r.ok) {
      localStorage.removeItem(CHAVE_LOCAL);
      setToken(null);
      setConversa(null);
      toast.error(r.mensagem);
      return;
    }
    setConversa({ thread: r.thread, os: r.os, mensagens: r.mensagens as ChatMensagem[] });
  }, []);

  useEffect(() => {
    const url = new URLSearchParams(window.location.search).get("acesso");
    const salvo = url || localStorage.getItem(CHAVE_LOCAL);
    if (salvo) {
      setToken(salvo);
      localStorage.setItem(CHAVE_LOCAL, salvo);
      void carregar(salvo);
    }
  }, [carregar]);

  const abrir = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    const r = await abrirConversaOs({ data: { protocolo, telefone } });
    setCarregando(false);
    if (!r.ok) {
      toast.error(r.mensagem);
      return;
    }
    localStorage.setItem(CHAVE_LOCAL, r.token);
    setToken(r.token);
    await carregar(r.token);
  };

  const sair = () => {
    localStorage.removeItem(CHAVE_LOCAL);
    setToken(null);
    setConversa(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Acompanhar pedido e falar com o técnico | O Técnico de Informática</title>
        <meta
          name="description"
          content="Acompanhe seu pedido de conserto, envie fotos do equipamento e converse direto com a equipe técnica."
        />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <Header />
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-2 flex items-center gap-2 text-3xl font-bold text-foreground">
          <MessagesSquare className="h-7 w-7 text-accent" /> Acompanhar meu pedido
        </h1>
        <p className="mb-8 text-muted-foreground">
          Converse com a equipe e envie fotos do equipamento pelo próprio site — sem depender de código de confirmação.
        </p>

        {!token || !conversa ? (
          <Card className="p-6">
            <form onSubmit={abrir} className="space-y-4">
              <div>
                <Label htmlFor="protocolo">Código do pedido</Label>
                <Input
                  id="protocolo"
                  value={protocolo}
                  onChange={(e) => setProtocolo(e.target.value)}
                  placeholder="OS-CWB-20260101-001"
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefone">Celular cadastrado</Label>
                <Input
                  id="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(41) 99999-9999"
                  inputMode="tel"
                  required
                />
              </div>
              <Button type="submit" disabled={carregando} className="w-full">
                {carregando ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Abrir conversa do pedido
              </Button>
            </form>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">Pedido</p>
                  <p className="text-lg font-semibold text-foreground">{conversa.thread.protocolo ?? "—"}</p>
                  {conversa.os && (
                    <p className="text-sm text-muted-foreground">
                      {conversa.os.equipamento ?? "Equipamento"} · situação: {conversa.os.status}
                    </p>
                  )}
                </div>
                <Button variant="ghost" onClick={sair}>
                  Sair deste pedido
                </Button>
              </div>
              {conversa.os?.observacoesPublicas && (
                <p className="mt-3 rounded-md bg-secondary p-3 text-sm">{conversa.os.observacoesPublicas}</p>
              )}
              {conversa.os?.etapas?.length ? (
                <ol className="mt-4 space-y-1 text-sm text-muted-foreground">
                  {conversa.os.etapas.map((et, i) => (
                    <li key={`${et.titulo}-${i}`}>
                      • {et.titulo}
                      {et.em ? ` — ${new Date(et.em).toLocaleDateString("pt-BR")}` : ""}
                    </li>
                  ))}
                </ol>
              ) : null}
            </Card>

            <Card className="p-5">
              <ChatOs
                mensagens={conversa.mensagens}
                lado="client"
                desabilitado={conversa.thread.status === "arquivada"}
                prepararUpload={async (mimeType, sizeBytes) => {
                  const r = await prepararUploadOs({ data: { token, mimeType, sizeBytes } });
                  if (!r.ok) throw new Error(r.mensagem);
                  return { path: r.path, signedUrl: r.signedUrl, token: r.token };
                }}
                enviar={async (texto: string, anexos: AnexoEnviado[]) => {
                  const r = await enviarMensagemOs({ data: { token, texto, anexos } });
                  if (!r.ok) throw new Error(r.mensagem);
                  setConversa({ thread: r.thread, os: r.os, mensagens: r.mensagens as ChatMensagem[] });
                }}
              />
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PedidoChat;
