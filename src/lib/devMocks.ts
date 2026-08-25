/**
 * MOCKS DE DESENVOLVIMENTO — ambiente 100% local, sem internet.
 *
 * Em `npm run dev:local` (ou qualquer build de desenvolvimento) nenhuma
 * integração de terceiros deve ser chamada de verdade: IndexNow, Search
 * Console, envio de mensagens, analytics externos. Em vez de travar
 * aguardando rede, simulamos sucesso e registramos no console.
 *
 * Regra: em produção este módulo é inerte (`isDevRuntime()` → false).
 */
export const isDevRuntime = (): boolean => {
  try {
    return Boolean(import.meta.env?.DEV) || import.meta.env?.MODE === "development";
  } catch {
    return false;
  }
};

/**
 * Executa `real` em produção; em desenvolvimento apenas loga e devolve
 * `mockResult`, mantendo a mesma assinatura de retorno.
 */
export async function withDevMock<T>(
  integração: string,
  payload: unknown,
  mockResult: T,
  real: () => Promise<T>,
): Promise<T> {
  if (isDevRuntime()) {
    console.log(`[dev-mock] ${integração} — chamada simulada`, payload);
    return mockResult;
  }
  return real();
}
