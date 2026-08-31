/**
 * Server functions do chat interno da OS.
 * Wrapper fino: toda a lógica vive em `chatOs.server.ts`.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const anexoSchema = z.object({
  path: z.string().min(3).max(300),
  mimeType: z.string().min(3).max(120),
  sizeBytes: z.number().int().positive(),
  nomeOriginal: z.string().max(200).optional(),
});

const tokenSchema = z.string().min(20).max(200);

export const abrirConversaOs = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ protocolo: z.string().min(6).max(40), telefone: z.string().min(8).max(24) }).parse(d),
  )
  .handler(async ({ data }) => {
    const m = await import("./chatOs.server");
    try {
      return { ok: true as const, ...(await m.abrirConversa(data.protocolo, data.telefone)) };
    } catch (e) {
      if (e instanceof m.ChatOsErro) return { ok: false as const, codigo: e.codigo, mensagem: e.message };
      throw e;
    }
  });

export const lerConversaOs = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ token: tokenSchema }).parse(d))
  .handler(async ({ data }) => {
    const m = await import("./chatOs.server");
    try {
      return { ok: true as const, ...(await m.lerConversaCliente(data.token)) };
    } catch (e) {
      if (e instanceof m.ChatOsErro) return { ok: false as const, codigo: e.codigo, mensagem: e.message };
      throw e;
    }
  });

export const prepararUploadOs = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ token: tokenSchema, mimeType: z.string().max(120), sizeBytes: z.number().int().positive() }).parse(d),
  )
  .handler(async ({ data }) => {
    const m = await import("./chatOs.server");
    try {
      return { ok: true as const, ...(await m.prepararUploadCliente(data.token, data.mimeType, data.sizeBytes)) };
    } catch (e) {
      if (e instanceof m.ChatOsErro) return { ok: false as const, codigo: e.codigo, mensagem: e.message };
      throw e;
    }
  });

export const enviarMensagemOs = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z
      .object({
        token: tokenSchema,
        texto: z.string().max(4000).default(""),
        anexos: z.array(anexoSchema).max(6).default([]),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const m = await import("./chatOs.server");
    try {
      return { ok: true as const, ...(await m.enviarMensagemCliente(data.token, data.texto, data.anexos)) };
    } catch (e) {
      if (e instanceof m.ChatOsErro) return { ok: false as const, codigo: e.codigo, mensagem: e.message };
      throw e;
    }
  });

export const listarConversasOsAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ busca: z.string().max(60).default("") }).parse(d))
  .handler(async ({ data, context }) => {
    const m = await import("./chatOs.server");
    await m.garantirAdmin(context.supabase as never, context.userId);
    return { conversas: await m.listarConversasAdmin(data.busca) };
  });

export const lerConversaOsAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ threadId: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const m = await import("./chatOs.server");
    await m.garantirAdmin(context.supabase as never, context.userId);
    return m.lerConversaAdmin(data.threadId);
  });

export const responderConversaOsAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z
      .object({
        threadId: z.string().uuid(),
        texto: z.string().max(4000).default(""),
        anexos: z.array(anexoSchema).max(6).default([]),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const m = await import("./chatOs.server");
    await m.garantirAdmin(context.supabase as never, context.userId);
    return m.responderAdmin({
      threadId: data.threadId,
      texto: data.texto,
      anexos: data.anexos,
      autorId: context.userId,
      autorLabel: (context.claims?.email as string | undefined) ?? "Equipe técnica",
    });
  });

export const prepararUploadOsAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z
      .object({ threadId: z.string().uuid(), mimeType: z.string().max(120), sizeBytes: z.number().int().positive() })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const m = await import("./chatOs.server");
    await m.garantirAdmin(context.supabase as never, context.userId);
    return m.prepararUploadAdmin(data.threadId, data.mimeType, data.sizeBytes);
  });

export const marcarConversaLidaAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ threadId: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const m = await import("./chatOs.server");
    await m.garantirAdmin(context.supabase as never, context.userId);
    return m.marcarLidaAdmin(data.threadId);
  });

export const atualizarStatusConversaAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ threadId: z.string().uuid(), status: z.enum(["aberta", "resolvida", "arquivada"]) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const m = await import("./chatOs.server");
    await m.garantirAdmin(context.supabase as never, context.userId);
    return m.atualizarStatusConversaAdmin(data.threadId, data.status);
  });

export const historicoOsAdminFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ protocolo: z.string().min(6).max(40) }).parse(d))
  .handler(async ({ data, context }) => {
    const m = await import("./chatOs.server");
    await m.garantirAdmin(context.supabase as never, context.userId);
    try {
      return { ok: true as const, ...(await m.historicoOsAdmin(data.protocolo)) };
    } catch (e) {
      if (e instanceof m.ChatOsErro) return { ok: false as const, codigo: e.codigo, mensagem: e.message };
      throw e;
    }
  });
