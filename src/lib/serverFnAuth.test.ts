import { beforeEach, describe, expect, it, vi } from "vitest";

const { sdkLoaded, getSession } = vi.hoisted(() => ({
  sdkLoaded: vi.fn(),
  getSession: vi.fn(),
}));

vi.mock("@/integrations/supabase/client", () => {
  sdkLoaded();
  return { supabase: { auth: { getSession } } };
});

async function loadMiddleware() {
  const { attachSessionAuth } = await import("./serverFnAuth");
  const client = attachSessionAuth.options.client!;
  const next = vi.fn().mockResolvedValue({ result: "ok" });
  return {
    next,
    invoke: () => client({ next } as Parameters<typeof client>[0]),
  };
}

describe("autenticação das server functions sob demanda", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    getSession.mockReset();
  });

  it("não inicializa o SDK nem lê a sessão ao importar o middleware", async () => {
    await loadMiddleware();
    expect(sdkLoaded).not.toHaveBeenCalled();
    expect(getSession).not.toHaveBeenCalled();
  });

  it("carrega o SDK e permite chamada anônima sem Authorization", async () => {
    getSession.mockResolvedValue({ data: { session: null } });
    const { invoke, next } = await loadMiddleware();
    await expect(invoke()).resolves.toEqual({ result: "ok" });
    expect(sdkLoaded).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith({ headers: {} });
  });

  it("encaminha o token da sessão antes de executar a chamada", async () => {
    getSession.mockResolvedValue({
      data: { session: { access_token: "session-a" } },
    });
    const { invoke, next } = await loadMiddleware();
    await invoke();
    expect(next).toHaveBeenCalledWith({
      headers: { Authorization: "Bearer session-a" },
    });
  });

  it("relê a sessão após refresh e logout, sem reutilizar token antigo", async () => {
    getSession
      .mockResolvedValueOnce({
        data: { session: { access_token: "session-a" } },
      })
      .mockResolvedValueOnce({
        data: { session: { access_token: "session-b" } },
      })
      .mockResolvedValueOnce({ data: { session: null } });
    const { invoke, next } = await loadMiddleware();
    await invoke();
    await invoke();
    await invoke();
    expect(next).toHaveBeenNthCalledWith(1, {
      headers: { Authorization: "Bearer session-a" },
    });
    expect(next).toHaveBeenNthCalledWith(2, {
      headers: { Authorization: "Bearer session-b" },
    });
    expect(next).toHaveBeenNthCalledWith(3, { headers: {} });
    expect(getSession).toHaveBeenCalledTimes(3);
  });

  it("propaga erro de sessão sem executar a chamada sem autenticação", async () => {
    getSession.mockRejectedValue(new Error("session unavailable"));
    const { invoke, next } = await loadMiddleware();
    await expect(invoke()).rejects.toThrow("session unavailable");
    expect(next).not.toHaveBeenCalled();
  });
});
