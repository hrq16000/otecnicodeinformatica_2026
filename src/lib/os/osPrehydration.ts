/**
 * Buffer pré-hidratação da Ordem de Serviço.
 *
 * O HTML da rota /ordem-de-servico é servido por SSR, mas os inputs são
 * controlados por React: quem digita (ou troca de aba) antes da hidratação
 * tem o valor sobrescrito quando o React assume o DOM. Este script captura a
 * intenção do usuário antes disso; a página reaplica tudo no primeiro efeito
 * após montar, sem depender de espera artificial.
 */
export const OS_PREHYDRATION_SCRIPT = `
(function () {
  var ROTAS = ['/ordem-de-servico', '/status-da-ordem-de-servico'];
  var estado = { campos: {}, radios: {}, aceites: {}, aba: null };
  window.__osPre = estado;
  function ativo() {
    if (document.documentElement.dataset.hydrated === '1') return false;
    var p = location.pathname.replace(/\\/$/, '');
    return ROTAS.indexOf(p) !== -1;
  }
  document.addEventListener('input', function (e) {
    if (!ativo()) return;
    var t = e.target;
    if (!t || !t.id || t.id.indexOf('os-') !== 0) return;
    estado.campos[t.id] = t.value;
  }, true);
  document.addEventListener('click', function (e) {
    if (!ativo()) return;
    var t = e.target && e.target.closest
      ? e.target.closest('[data-os-tab],[id^="aceite-"],#liga-sim,#liga-nao')
      : null;
    if (!t) return;
    if (t.hasAttribute('data-os-tab')) estado.aba = t.getAttribute('data-os-tab');
    else if (t.id === 'liga-sim' || t.id === 'liga-nao') estado.radios.liga = t.id === 'liga-sim' ? 'sim' : 'nao';
    else estado.aceites[t.id.replace('aceite-', '')] = true;
  }, true);
})();
`;

export interface OsIntencaoPreHidratacao {
  campos: Record<string, string>;
  radios: { liga?: "sim" | "nao" };
  aceites: Record<string, boolean>;
  aba: "abrir" | "consultar" | null;
}

/** Lê e limpa a intenção capturada antes da hidratação (só no cliente). */
export const consumirIntencaoOs = (): OsIntencaoPreHidratacao | null => {
  if (typeof window === "undefined") return null;
  const bruto = (window as unknown as { __osPre?: OsIntencaoPreHidratacao }).__osPre;
  if (!bruto) return null;
  const copia: OsIntencaoPreHidratacao = {
    campos: { ...(bruto.campos ?? {}) },
    radios: { ...(bruto.radios ?? {}) },
    aceites: { ...(bruto.aceites ?? {}) },
    aba: bruto.aba ?? null,
  };
  bruto.campos = {};
  bruto.radios = {};
  bruto.aceites = {};
  bruto.aba = null;
  return copia;
};

/** Aba pedida por deep link (?aba=consultar ou #consultar). */
export const abaPorDeepLink = (): "abrir" | "consultar" | null => {
  if (typeof window === "undefined") return null;
  const url = new URL(window.location.href);
  const valor = (url.searchParams.get("aba") ?? url.hash.replace("#", "")).toLowerCase();
  return valor === "consultar" || valor === "abrir" ? valor : null;
};
