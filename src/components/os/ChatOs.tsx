import { useEffect, useRef, useState } from "react";
import { Loader2, Paperclip, Send, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

export type ChatMensagem = {
  id: string;
  autor: "client" | "admin" | "system";
  autorLabel: string | null;
  texto: string;
  criadaEm: string;
  anexos: { id: string; url: string | null; mime: string; nome: string | null; tamanho: number }[];
};

export type AnexoEnviado = { path: string; mimeType: string; sizeBytes: number; nomeOriginal?: string };

const MIMES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif", "application/pdf"];
const MAX_BYTES = 8 * 1024 * 1024;

const hora = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

interface Props {
  mensagens: ChatMensagem[];
  /** Lado que está escrevendo: muda o alinhamento das bolhas. */
  lado: "client" | "admin";
  /** Prepara o upload no servidor e devolve URL assinada de escrita. */
  prepararUpload: (mimeType: string, sizeBytes: number) => Promise<{ path: string; signedUrl: string; token: string }>;
  enviar: (texto: string, anexos: AnexoEnviado[]) => Promise<void>;
  desabilitado?: boolean;
}

/**
 * Conversa da Ordem de Serviço (cliente e admin usam o mesmo componente).
 * Upload em duas etapas: o servidor assina a URL, o navegador envia o arquivo
 * direto para o bucket privado e só então a mensagem é gravada com o anexo.
 */
export const ChatOs = ({ mensagens, lado, prepararUpload, enviar, desabilitado }: Props) => {
  const [texto, setTexto] = useState("");
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [enviando, setEnviando] = useState(false);
  const fimRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fimRef.current?.scrollIntoView({ block: "end" });
  }, [mensagens.length]);

  const adicionar = (lista: FileList | null) => {
    if (!lista) return;
    const validos: File[] = [];
    for (const f of Array.from(lista)) {
      if (!MIMES.includes(f.type)) {
        toast.error(`${f.name}: envie fotos (JPG, PNG, WEBP, HEIC) ou PDF.`);
        continue;
      }
      if (f.size > MAX_BYTES) {
        toast.error(`${f.name}: cada arquivo precisa ter até 8 MB.`);
        continue;
      }
      validos.push(f);
    }
    setArquivos((a) => [...a, ...validos].slice(0, 6));
  };

  const submeter = async () => {
    if (desabilitado || enviando) return;
    if (!texto.trim() && arquivos.length === 0) {
      toast.error("Escreva uma mensagem ou anexe uma foto.");
      return;
    }
    setEnviando(true);
    try {
      const anexos: AnexoEnviado[] = [];
      for (const file of arquivos) {
        const alvo = await prepararUpload(file.type, file.size);
        const { error } = await supabase.storage.from("os-chat").uploadToSignedUrl(alvo.path, alvo.token, file);
        if (error) throw new Error(`Falha ao enviar ${file.name}: ${error.message}`);
        anexos.push({ path: alvo.path, mimeType: file.type, sizeBytes: file.size, nomeOriginal: file.name });
      }
      await enviar(texto, anexos);
      setTexto("");
      setArquivos([]);
      if (inputRef.current) inputRef.current.value = "";
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Não foi possível enviar agora.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="max-h-[26rem] space-y-3 overflow-y-auto rounded-lg border border-border bg-secondary/30 p-4">
        {mensagens.length === 0 && (
          <p className="text-sm text-muted-foreground">Nenhuma mensagem ainda. Envie fotos e detalhes do equipamento.</p>
        )}
        {mensagens.map((m) => {
          const meu = m.autor === lado;
          const sistema = m.autor === "system";
          return (
            <div key={m.id} className={`flex ${meu ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  sistema
                    ? "bg-muted text-muted-foreground"
                    : meu
                      ? "bg-accent text-accent-foreground"
                      : "bg-card text-card-foreground border border-border"
                }`}
              >
                <p className="mb-1 text-[11px] opacity-70">
                  {sistema ? "Sistema" : m.autor === "admin" ? (m.autorLabel ?? "Equipe técnica") : "Você"} ·{" "}
                  {hora(m.criadaEm)}
                </p>
                {m.texto && <p className="whitespace-pre-wrap break-words">{m.texto}</p>}
                {m.anexos.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {m.anexos.map((a) =>
                      a.url && a.mime.startsWith("image/") ? (
                        <a key={a.id} href={a.url} target="_blank" rel="noreferrer">
                          <img
                            src={a.url}
                            alt={a.nome ?? "Anexo enviado na conversa"}
                            loading="lazy"
                            className="h-24 w-24 rounded-md object-cover"
                          />
                        </a>
                      ) : (
                        <a
                          key={a.id}
                          href={a.url ?? "#"}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs underline underline-offset-2"
                        >
                          {a.nome ?? "arquivo"}
                        </a>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={fimRef} />
      </div>

      {arquivos.length > 0 && (
        <ul className="flex flex-wrap gap-2 text-xs">
          {arquivos.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1">
              {f.name}
              <button
                type="button"
                aria-label={`Remover ${f.name}`}
                onClick={() => setArquivos((a) => a.filter((_, idx) => idx !== i))}
              >
                <X className="h-3 w-3" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-end gap-2">
        <Textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Descreva o que está acontecendo ou responda ao cliente…"
          rows={3}
          maxLength={4000}
          disabled={desabilitado}
        />
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={MIMES.join(",")}
          className="hidden"
          onChange={(e) => adicionar(e.target.files)}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Anexar fotos"
          disabled={desabilitado || enviando}
          onClick={() => inputRef.current?.click()}
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        <Button type="button" onClick={submeter} disabled={desabilitado || enviando} aria-label="Enviar mensagem">
          {enviando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};
