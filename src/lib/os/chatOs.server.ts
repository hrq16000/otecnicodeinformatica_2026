/**
 * CHAT INTERNO DA ORDEM DE SERVIÇO — camada de servidor.
 *
 * Regras de segurança desta camada:
 *  - o cliente NÃO depende de código de verificação por WhatsApp: ele prova
 *    posse do pedido informando protocolo + celular cadastrado na OS e recebe
 *    uma chave de acesso opaca (32 bytes) guardada apenas como hash;
 *  - o navegador do cliente nunca fala com o banco: toda leitura/escrita passa
 *    por server functions que validam a chave antes de qualquer consulta;
 *  - o admin usa sessão autenticada + papel `admin` (has_role), nunca a chave;
 *  - anexos ficam em bucket privado (`os-chat`) e só saem por URL assinada
 *    de curta duração.
 */
import { createHash, randomBytes } from "node:crypto";

export const BUCKET_CHAT = "os-chat";
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
export const MIMES_PERMITIDOS = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
] as const;
const EXTENSAO: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
  "image/heif": "heif",
  "application/pdf": "pdf",
};

export type AutorMensagem = "client" | "admin" | "system";

export type MensagemChat = {
  id: string;
  autor: AutorMensagem;
  autorLabel: string | null;
  texto: string;
  criadaEm: string;
  lidaEm: string | null;
  anexos: { id: string; url: string | null; mime: string; nome: string | null; tamanho: number }[];
};

export type AnexoPendente = {
  path: string;
  mimeType: string;
  sizeBytes: number;
  nomeOriginal?: string;
};

export const sha256 = (valor: string) => createHash("sha256").update(valor).digest("hex");

/** Normaliza celular brasileiro para 11 dígitos (DDD + 9). */
export function normalizarCelular(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("55") && d.length > 11) d = d.slice(2);
  if (d.length !== 11) return null;
  if (d[2] !== "9") return null;
  return d;
}

export const gerarTokenAcesso = () => randomBytes(32).toString("base64url");

export const hashToken = (token: string) => sha256(`os-chat:${token}`);

export const hashTelefone = (telefone: string) => sha256(`tel:${telefone}`);

async function admin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

/** Erro de negócio com mensagem pronta para o usuário final. */
export class ChatOsErro extends Error {
  constructor(
    public readonly codigo: string,
    mensagem: string,
  ) {
    super(mensagem);
  }
}

const asRecord = (v: unknown) => (v && typeof v === "object" ? (v as Record<string, unknown>) : {});

/* ------------------------------------------------------------------ */
/* Abertura / resolução de conversa                                     */
/* ------------------------------------------------------------------ */

/**
 * Abre (ou reaproveita) a conversa de um pedido a partir de protocolo +
 * celular. Nunca cria thread duplicada para a mesma OS: o índice único
 * garante uma conversa por pedido e aqui devolvemos a existente.
 */
export async function abrirConversa(protocoloBruto: string, telefoneBruto: string) {
  const protocolo = protocoloBruto.trim().toUpperCase();
  const telefone = normalizarCelular(telefoneBruto);
  if (!/^OS-[A-Z]{2,4}-\d{8}-\d{3,5}$/.test(protocolo)) {
    throw new ChatOsErro("protocolo_invalido", "Confira o código do pedido (formato OS-XXX-00000000-000).");
  }
  if (!telefone) {
    throw new ChatOsErro("telefone_invalido", "Informe o celular com DDD, no formato (41) 99999-9999.");
  }

  const db = await admin();
  const { data: os, error } = await db
    .from("ordens_servico")
    .select("id, protocolo, telefone, equipamento")
    .eq("protocolo", protocolo)
    .maybeSingle();

  if (error) {
    console.error("[os-chat] falha ao localizar OS:", error.message);
    throw new ChatOsErro("indisponivel", "Não foi possível abrir a conversa agora. Tente novamente em instantes.");
  }
  // Resposta genérica: não confirmamos existência de pedido para quem erra o par.
  if (!os || normalizarCelular(os.telefone) !== telefone) {
    throw new ChatOsErro(
      "nao_confere",
      "Não encontramos um pedido com esse código para esse celular. Confira os dados ou fale com o atendimento.",
    );
  }

  const { data: existente } = await db
    .from("os_threads")
    .select("id, access_token_hash")
    .eq("os_id", os.id)
    .maybeSingle();

  const token = gerarTokenAcesso();
  const tokenHash = hashToken(token);

  if (existente) {
    // Rotaciona a chave a cada abertura autenticada por protocolo + celular.
    const { error: upErr } = await db
      .from("os_threads")
      .update({ access_token_hash: tokenHash })
      .eq("id", existente.id);
    if (upErr) {
      console.error("[os-chat] falha ao rotacionar chave:", upErr.message);
      throw new ChatOsErro("indisponivel", "Não foi possível abrir a conversa agora.");
    }
    return { token, threadId: existente.id, protocolo };
  }

  const { data: criada, error: insErr } = await db
    .from("os_threads")
    .insert({
      os_id: os.id,
      protocolo: os.protocolo,
      telefone_hash: hashTelefone(telefone),
      access_token_hash: tokenHash,
      assunto: os.equipamento ?? null,
      last_message_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (insErr || !criada) {
    console.error("[os-chat] falha ao criar conversa:", insErr?.message);
    throw new ChatOsErro("indisponivel", "Não foi possível abrir a conversa agora.");
  }

  await db.from("os_messages").insert({
    thread_id: criada.id,
    author_type: "system",
    author_label: "Sistema",
    body: `Conversa aberta para o pedido ${os.protocolo}. Envie fotos e detalhes por aqui — respondemos nesta mesma tela.`,
  });

  return { token, threadId: criada.id, protocolo: os.protocolo };
}

async function threadPorToken(token: string) {
  const db = await admin();
  const { data, error } = await db
    .from("os_threads")
    .select("id, os_id, protocolo, status, assunto, unread_client, unread_admin, last_message_at, created_at")
    .eq("access_token_hash", hashToken(token))
    .maybeSingle();
  if (error) {
    console.error("[os-chat] falha ao resolver token:", error.message);
    throw new ChatOsErro("indisponivel", "Não foi possível carregar a conversa agora.");
  }
  if (!data) throw new ChatOsErro("sem_acesso", "Este link de acompanhamento não é mais válido. Abra o pedido novamente.");
  return data;
}

/* ------------------------------------------------------------------ */
/* Leitura de mensagens                                                 */
/* ------------------------------------------------------------------ */

async function montarMensagens(threadId: string): Promise<MensagemChat[]> {
  const db = await admin();
  const [{ data: msgs }, { data: anexos }] = await Promise.all([
    db
      .from("os_messages")
      .select("id, author_type, author_label, body, created_at, read_at")
      .eq("thread_id", threadId)
      .order("created_at", { ascending: true })
      .limit(500),
    db
      .from("os_attachments")
      .select("id, message_id, storage_path, mime_type, size_bytes, nome_original")
      .eq("thread_id", threadId)
      .limit(500),
  ]);

  const paths = (anexos ?? []).map((a) => a.storage_path);
  const assinadas = new Map<string, string>();
  if (paths.length) {
    const { data: signed } = await db.storage.from(BUCKET_CHAT).createSignedUrls(paths, 600);
    (signed ?? []).forEach((s) => {
      if (s.path && s.signedUrl) assinadas.set(s.path, s.signedUrl);
    });
  }

  return (msgs ?? []).map((m) => ({
    id: m.id,
    autor: m.author_type as AutorMensagem,
    autorLabel: m.author_label,
    texto: m.body ?? "",
    criadaEm: m.created_at,
    lidaEm: m.read_at,
    anexos: (anexos ?? [])
      .filter((a) => a.message_id === m.id)
      .map((a) => ({
        id: a.id,
        url: assinadas.get(a.storage_path) ?? null,
        mime: a.mime_type,
        nome: a.nome_original,
        tamanho: a.size_bytes,
      })),
  }));
}

export async function lerConversaCliente(token: string) {
  const thread = await threadPorToken(token);
  const db = await admin();
  await db.from("os_threads").update({ unread_client: 0 }).eq("id", thread.id);

  let os: Record<string, unknown> | null = null;
  if (thread.os_id) {
    const { data } = await db
      .from("ordens_servico")
      .select("protocolo, status, modalidade, equipamento, previsao_conclusao, observacoes_publicas, etapas, updated_at")
      .eq("id", thread.os_id)
      .maybeSingle();
    os = data as Record<string, unknown> | null;
  }

  return {
    thread: {
      id: thread.id,
      protocolo: thread.protocolo,
      assunto: thread.assunto,
      status: thread.status,
      abertaEm: thread.created_at,
    },
    os,
    mensagens: await montarMensagens(thread.id),
  };
}

/* ------------------------------------------------------------------ */
/* Upload de anexos                                                     */
/* ------------------------------------------------------------------ */

function validarArquivo(mimeType: string, sizeBytes: number) {
  if (!(MIMES_PERMITIDOS as readonly string[]).includes(mimeType)) {
    throw new ChatOsErro("mime_invalido", "Envie apenas fotos (JPG, PNG, WEBP, HEIC) ou PDF.");
  }
  if (!Number.isFinite(sizeBytes) || sizeBytes <= 0 || sizeBytes > MAX_UPLOAD_BYTES) {
    throw new ChatOsErro("arquivo_grande", "Cada arquivo precisa ter até 8 MB.");
  }
}

async function criarUpload(threadId: string, mimeType: string, sizeBytes: number) {
  validarArquivo(mimeType, sizeBytes);
  const db = await admin();
  const nome = `${Date.now().toString(36)}-${randomBytes(6).toString("hex")}.${EXTENSAO[mimeType] ?? "bin"}`;
  const path = `${threadId}/${nome}`;
  const { data, error } = await db.storage.from(BUCKET_CHAT).createSignedUploadUrl(path);
  if (error || !data) {
    console.error("[os-chat] falha ao preparar upload:", error?.message);
    throw new ChatOsErro("upload_indisponivel", "Não foi possível preparar o envio do arquivo. Tente novamente.");
  }
  return { path, signedUrl: data.signedUrl, token: data.token };
}

export async function prepararUploadCliente(token: string, mimeType: string, sizeBytes: number) {
  const thread = await threadPorToken(token);
  return criarUpload(thread.id, mimeType, sizeBytes);
}

export async function prepararUploadAdmin(threadId: string, mimeType: string, sizeBytes: number) {
  return criarUpload(threadId, mimeType, sizeBytes);
}

/* ------------------------------------------------------------------ */
/* Escrita de mensagens                                                 */
/* ------------------------------------------------------------------ */

async function gravarMensagem(opts: {
  threadId: string;
  autor: AutorMensagem;
  autorId?: string | null;
  autorLabel?: string | null;
  texto: string;
  anexos: AnexoPendente[];
}) {
  const db = await admin();
  const texto = opts.texto.trim().slice(0, 4000);
  if (!texto && opts.anexos.length === 0) {
    throw new ChatOsErro("mensagem_vazia", "Escreva uma mensagem ou anexe uma foto.");
  }
  if (opts.anexos.length > 6) {
    throw new ChatOsErro("muitos_anexos", "Envie no máximo 6 arquivos por mensagem.");
  }
  for (const a of opts.anexos) validarArquivo(a.mimeType, a.sizeBytes);
  for (const a of opts.anexos) {
    if (!a.path.startsWith(`${opts.threadId}/`)) {
      throw new ChatOsErro("anexo_invalido", "Anexo fora da conversa.");
    }
  }

  const { data: msg, error } = await db
    .from("os_messages")
    .insert({
      thread_id: opts.threadId,
      author_type: opts.autor,
      author_id: opts.autorId ?? null,
      author_label: opts.autorLabel ?? null,
      body: texto,
    })
    .select("id")
    .single();

  if (error || !msg) {
    console.error("[os-chat] falha ao gravar mensagem:", error?.message);
    throw new ChatOsErro("indisponivel", "Não foi possível enviar sua mensagem agora.");
  }

  if (opts.anexos.length) {
    const { error: anexoErr } = await db.from("os_attachments").insert(
      opts.anexos.map((a) => ({
        thread_id: opts.threadId,
        message_id: msg.id,
        storage_path: a.path,
        mime_type: a.mimeType,
        size_bytes: Math.round(a.sizeBytes),
        nome_original: a.nomeOriginal?.slice(0, 160) ?? null,
        uploaded_by: opts.autor,
      })),
    );
    if (anexoErr) console.error("[os-chat] anexo não registrado:", anexoErr.message);
  }

  const { data: atual } = await db
    .from("os_threads")
    .select("unread_admin, unread_client")
    .eq("id", opts.threadId)
    .maybeSingle();

  await db
    .from("os_threads")
    .update({
      last_message_at: new Date().toISOString(),
      unread_admin: opts.autor === "client" ? (atual?.unread_admin ?? 0) + 1 : 0,
      unread_client: opts.autor === "admin" ? (atual?.unread_client ?? 0) + 1 : (atual?.unread_client ?? 0),
    })
    .eq("id", opts.threadId);

  return msg.id;
}

export async function enviarMensagemCliente(token: string, texto: string, anexos: AnexoPendente[]) {
  const thread = await threadPorToken(token);
  if (thread.status === "arquivada") {
    throw new ChatOsErro("conversa_encerrada", "Esta conversa foi encerrada. Fale com o atendimento para reabrir.");
  }
  await gravarMensagem({ threadId: thread.id, autor: "client", texto, anexos });
  return lerConversaCliente(token);
}

/* ------------------------------------------------------------------ */
/* Lado administrativo                                                  */
/* ------------------------------------------------------------------ */

export async function listarConversasAdmin(busca: string) {
  const db = await admin();
  let query = db
    .from("os_threads")
    .select("id, protocolo, assunto, status, unread_admin, last_message_at, created_at")
    .order("last_message_at", { ascending: false, nullsFirst: false })
    .limit(100);
  const termo = busca.trim().toUpperCase();
  if (termo) query = query.ilike("protocolo", `%${termo}%`);
  const { data, error } = await query;
  if (error) {
    console.error("[os-chat] falha ao listar conversas:", error.message);
    throw new ChatOsErro("indisponivel", "Não foi possível carregar as conversas.");
  }
  return data ?? [];
}

export async function lerConversaAdmin(threadId: string) {
  const db = await admin();
  const { data: thread, error } = await db
    .from("os_threads")
    .select("id, os_id, protocolo, assunto, status, created_at")
    .eq("id", threadId)
    .maybeSingle();
  if (error || !thread) throw new ChatOsErro("nao_encontrada", "Conversa não encontrada.");

  await db.from("os_threads").update({ unread_admin: 0 }).eq("id", threadId);

  let os: Record<string, unknown> | null = null;
  if (thread.os_id) {
    const { data } = await db
      .from("ordens_servico")
      .select(
        "protocolo, cliente_nome, telefone, equipamento, marca_modelo, modalidade, status, etapas, previsao_conclusao, observacoes_publicas, created_at, updated_at",
      )
      .eq("id", thread.os_id)
      .maybeSingle();
    os = data as Record<string, unknown> | null;
  }

  return { thread, os, mensagens: await montarMensagens(threadId) };
}

export async function responderAdmin(opts: {
  threadId: string;
  texto: string;
  anexos: AnexoPendente[];
  autorId: string;
  autorLabel: string | null;
}) {
  await gravarMensagem({
    threadId: opts.threadId,
    autor: "admin",
    autorId: opts.autorId,
    autorLabel: opts.autorLabel ?? "Equipe técnica",
    texto: opts.texto,
    anexos: opts.anexos,
  });
  return lerConversaAdmin(opts.threadId);
}

export async function marcarLidaAdmin(threadId: string) {
  const db = await admin();
  await db.from("os_threads").update({ unread_admin: 0 }).eq("id", threadId);
  await db
    .from("os_messages")
    .update({ read_at: new Date().toISOString() })
    .eq("thread_id", threadId)
    .eq("author_type", "client")
    .is("read_at", null);
  return { ok: true as const };
}

export async function atualizarStatusConversaAdmin(threadId: string, status: string) {
  if (!["aberta", "resolvida", "arquivada"].includes(status)) {
    throw new ChatOsErro("status_invalido", "Situação inválida para a conversa.");
  }
  const db = await admin();
  await db.from("os_threads").update({ status }).eq("id", threadId);
  await db.from("os_messages").insert({
    thread_id: threadId,
    author_type: "system",
    author_label: "Sistema",
    body: `Situação da conversa alterada para “${status}”.`,
  });
  return { ok: true as const };
}

/* ------------------------------------------------------------------ */
/* Histórico completo da OS (trilha auditável)                          */
/* ------------------------------------------------------------------ */

export type EventoHistorico = {
  em: string;
  tipo: "os" | "etapa" | "mensagem" | "anexo";
  titulo: string;
  detalhe?: string;
};

export async function historicoOsAdmin(protocoloBruto: string) {
  const protocolo = protocoloBruto.trim().toUpperCase();
  const db = await admin();
  const { data: os } = await db
    .from("ordens_servico")
    .select(
      "id, protocolo, cliente_nome, equipamento, marca_modelo, modalidade, status, etapas, fotos, observacoes_publicas, created_at, updated_at",
    )
    .eq("protocolo", protocolo)
    .maybeSingle();
  if (!os) throw new ChatOsErro("nao_encontrada", "Nenhuma OS com esse código.");

  const eventos: EventoHistorico[] = [
    { em: os.created_at, tipo: "os", titulo: `Pedido ${os.protocolo} registrado`, detalhe: os.equipamento ?? undefined },
  ];

  const etapas = Array.isArray(os.etapas) ? os.etapas : [];
  for (const etapaBruta of etapas) {
    const etapa = asRecord(etapaBruta);
    const em = typeof etapa.em === "string" ? etapa.em : typeof etapa.data === "string" ? etapa.data : null;
    if (!em) continue;
    eventos.push({
      em,
      tipo: "etapa",
      titulo: String(etapa.titulo ?? etapa.status ?? "Etapa atualizada"),
      detalhe: typeof etapa.detalhe === "string" ? etapa.detalhe : undefined,
    });
  }

  const { data: thread } = await db
    .from("os_threads")
    .select("id, status, created_at")
    .eq("os_id", os.id)
    .maybeSingle();

  let mensagens: MensagemChat[] = [];
  if (thread) {
    mensagens = await montarMensagens(thread.id);
    for (const m of mensagens) {
      eventos.push({
        em: m.criadaEm,
        tipo: m.anexos.length ? "anexo" : "mensagem",
        titulo:
          m.autor === "client" ? "Mensagem do cliente" : m.autor === "admin" ? "Resposta da equipe" : "Evento do sistema",
        detalhe: [m.texto, m.anexos.length ? `${m.anexos.length} anexo(s)` : ""].filter(Boolean).join(" · "),
      });
    }
  }

  eventos.sort((a, b) => new Date(a.em).getTime() - new Date(b.em).getTime());

  return {
    os: {
      protocolo: os.protocolo,
      clienteNome: os.cliente_nome,
      equipamento: os.equipamento,
      marcaModelo: os.marca_modelo,
      modalidade: os.modalidade,
      status: os.status,
      observacoesPublicas: os.observacoes_publicas,
      criadaEm: os.created_at,
      atualizadaEm: os.updated_at,
      fotosCount: Array.isArray(os.fotos) ? os.fotos.length : 0,
    },
    threadId: thread?.id ?? null,
    mensagens,
    eventos,
  };
}
