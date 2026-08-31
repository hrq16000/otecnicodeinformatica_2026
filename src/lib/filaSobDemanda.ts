/**
 * FILA DE EXECUÇÃO SOB DEMANDA (painéis internos).
 *
 * Complementa o rate-limit/dedupe de `rateLimitSobDemanda.ts` com:
 *  • concorrência 1 por chave (mesmo payload nunca roda duas vezes em paralelo);
 *  • enfileiramento de chaves distintas, preservando a ordem de pedido;
 *  • timeout duro, para que um artefato lento não trave o painel.
 *
 * Puramente client-side e sem estado global persistido: reiniciar a aba limpa a fila.
 */

export class TimeoutSobDemanda extends Error {
  constructor(public readonly ms: number) {
    super(`Execução excedeu ${Math.round(ms / 1000)}s e foi cancelada.`);
    this.name = "TimeoutSobDemanda";
  }
}

export const TIMEOUT_PADRAO_MS = 20_000;

const emAndamento = new Map<string, Promise<unknown>>();
let cauda: Promise<unknown> = Promise.resolve();

/** Chaves atualmente em execução (para exibir estado na UI). */
export const chavesAtivas = (): string[] => [...emAndamento.keys()];

const comTimeout = <T,>(tarefa: (sinal: AbortSignal) => Promise<T>, ms: number): Promise<T> => {
  const controlador = new AbortController();
  return new Promise<T>((resolver, rejeitar) => {
    const id = setTimeout(() => {
      controlador.abort();
      rejeitar(new TimeoutSobDemanda(ms));
    }, ms);
    tarefa(controlador.signal).then(
      (v) => {
        clearTimeout(id);
        resolver(v);
      },
      (e) => {
        clearTimeout(id);
        rejeitar(e as Error);
      },
    );
  });
};

/**
 * Enfileira `tarefa` sob `chave`. Se a mesma chave já estiver rodando, devolve
 * a promessa em andamento em vez de disparar uma segunda execução.
 */
export function enfileirar<T>(
  chave: string,
  tarefa: (sinal: AbortSignal) => Promise<T>,
  timeoutMs: number = TIMEOUT_PADRAO_MS,
): Promise<T> {
  const existente = emAndamento.get(chave);
  if (existente) return existente as Promise<T>;

  const execucao = cauda
    .catch(() => undefined)
    .then(() => comTimeout(tarefa, timeoutMs))
    .finally(() => {
      emAndamento.delete(chave);
    });

  emAndamento.set(chave, execucao);
  cauda = execucao.catch(() => undefined);
  return execucao;
}
