/**
 * RATE-LIMIT + DEDUPLICAÇÃO POR ROTA E PAYLOAD.
 *
 * Usado nas execuções sob demanda dos painéis internos (auditoria 10C etc.).
 * A chave combina rota + payload normalizado, então:
 *  • repetir a MESMA execução dentro da janela de dedupe é bloqueado;
 *  • variar o payload não burla o teto: existe também um limite de execuções
 *    por rota dentro da janela de rate-limit.
 *
 * Estado em sessionStorage (fail-open silencioso quando indisponível).
 */

export interface PoliticaSobDemanda {
  /** Janela de deduplicação para payload idêntico (ms). */
  janelaDedupeMs: number;
  /** Janela do rate-limit por rota (ms). */
  janelaRotaMs: number;
  /** Máximo de execuções na rota dentro da janela, com qualquer payload. */
  maxPorRota: number;
}

export const POLITICA_PADRAO: PoliticaSobDemanda = {
  janelaDedupeMs: 60_000,
  janelaRotaMs: 300_000,
  maxPorRota: 6,
};

export type ResultadoSobDemanda =
  | { permitido: true; motivo: null; esperarMs: 0 }
  | { permitido: false; motivo: "DEDUPE" | "RATE_LIMIT"; esperarMs: number; mensagem: string };

const CHAVE = "sob-demanda:v1";

type Registro = { rota: string; fingerprint: string; em: number };

const ler = (): Registro[] => {
  try {
    const bruto = sessionStorage.getItem(CHAVE);
    return bruto ? (JSON.parse(bruto) as Registro[]) : [];
  } catch {
    return [];
  }
};

const gravar = (registros: Registro[]) => {
  try {
    sessionStorage.setItem(CHAVE, JSON.stringify(registros.slice(-100)));
  } catch {
    /* ambiente sem storage: política vira fail-open */
  }
};

/** Fingerprint estável do payload (chaves ordenadas). */
export function fingerprintPayload(payload: unknown): string {
  const normalizar = (v: unknown): unknown => {
    if (Array.isArray(v)) return v.map(normalizar);
    if (v && typeof v === "object") {
      return Object.fromEntries(
        Object.entries(v as Record<string, unknown>)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([k, val]) => [k, normalizar(val)]),
      );
    }
    return v;
  };
  return JSON.stringify(normalizar(payload) ?? null);
}

const segundos = (ms: number) => Math.max(1, Math.ceil(ms / 1000));

/**
 * Avalia e, quando permitido, registra a execução.
 * `agora` é injetável para teste determinístico.
 */
export function permitirExecucao(
  rota: string,
  payload: unknown,
  politica: PoliticaSobDemanda = POLITICA_PADRAO,
  agora: number = Date.now(),
): ResultadoSobDemanda {
  const fingerprint = fingerprintPayload(payload);
  const registros = ler().filter((r) => agora - r.em < Math.max(politica.janelaDedupeMs, politica.janelaRotaMs));

  const duplicado = registros.find(
    (r) => r.rota === rota && r.fingerprint === fingerprint && agora - r.em < politica.janelaDedupeMs,
  );
  if (duplicado) {
    const esperarMs = politica.janelaDedupeMs - (agora - duplicado.em);
    gravar(registros);
    return {
      permitido: false,
      motivo: "DEDUPE",
      esperarMs,
      mensagem: `Mesma execução já rodada há pouco. Aguarde ${segundos(esperarMs)}s para repetir com o mesmo filtro.`,
    };
  }

  const naRota = registros.filter((r) => r.rota === rota && agora - r.em < politica.janelaRotaMs);
  if (naRota.length >= politica.maxPorRota) {
    const maisAntigo = Math.min(...naRota.map((r) => r.em));
    const esperarMs = politica.janelaRotaMs - (agora - maisAntigo);
    gravar(registros);
    return {
      permitido: false,
      motivo: "RATE_LIMIT",
      esperarMs,
      mensagem: `Limite de ${politica.maxPorRota} execuções por ${segundos(politica.janelaRotaMs)}s atingido nesta rota. Aguarde ${segundos(esperarMs)}s.`,
    };
  }

  gravar([...registros, { rota, fingerprint, em: agora }]);
  return { permitido: true, motivo: null, esperarMs: 0 };
}
