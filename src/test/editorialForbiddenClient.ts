// Não é um mock que devolve sucesso: qualquer dependência do backend invalida
// este diagnóstico local antes de criar um cliente ou ler suas credenciais.
throw new Error("EDITORIAL_BACKEND_IMPORT_FORBIDDEN");
export const supabase: never = undefined as never;
