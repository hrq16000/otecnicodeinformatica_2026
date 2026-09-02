/**
 * FASE 2 — fontes primárias por página de sintoma (/problemas/<slug>).
 *
 * Só entram referências oficiais com URL conferida (HTTP 200 em 2026-09-02)
 * que sustentam uma afirmação concreta da página. Sintoma sem fonte oficial
 * aplicável fica de fora — nada é preenchido para satisfazer gate.
 */
import type { FontePrimaria } from "@/lib/enriquecimento";

const MS_TROUBLESHOOT: FontePrimaria = {
  titulo: "Solução de problemas do Windows (Microsoft Learn)",
  url: "https://learn.microsoft.com/pt-br/troubleshoot/windows-client/",
  nota: "Central oficial de diagnóstico do Windows.",
};
const MS_SUPORTE: FontePrimaria = {
  titulo: "Suporte oficial do Windows",
  url: "https://support.microsoft.com/pt-br/windows",
  nota: "Procedimentos de usuário mantidos pela Microsoft.",
};
const MS_STOP_ERROR: FontePrimaria = {
  titulo: "Solucionar erros de parada (tela azul)",
  url: "https://learn.microsoft.com/pt-br/troubleshoot/windows-client/performance/stop-error-or-blue-screen-error-troubleshooting",
  nota: "Fluxo oficial de análise de tela azul.",
};
const MS_BUGCHECK: FontePrimaria = {
  titulo: "Referência de códigos de verificação de bug",
  url: "https://learn.microsoft.com/pt-br/windows-hardware/drivers/debugger/bug-check-code-reference2",
  nota: "Significado oficial de cada código de BSOD.",
};
const MS_BITLOCKER: FontePrimaria = {
  titulo: "Documentação do BitLocker",
  url: "https://learn.microsoft.com/pt-br/windows/security/operating-system-security/data-protection/bitlocker/",
  nota: "Criptografia e chave de recuperação antes de mover o disco.",
};
const NIST_88: FontePrimaria = {
  titulo: "NIST SP 800-88 Rev. 1 — Media Sanitization",
  url: "https://csrc.nist.gov/pubs/sp/800/88/r1/final",
  nota: "Referência sobre o que realmente apaga dados em uma mídia.",
};
const NIST_34: FontePrimaria = {
  titulo: "NIST SP 800-34 Rev. 1 — Contingency Planning",
  url: "https://csrc.nist.gov/pubs/sp/800/34/r1/final",
  nota: "Base para política de cópia e restauração testada.",
};
const CARTILHA: FontePrimaria = {
  titulo: "Cartilha de Segurança para Internet (CERT.br)",
  url: "https://cartilha.cert.br/",
  nota: "Referência brasileira de proteção de dados e contas.",
};

export const FONTES_PROBLEMA: Record<string, FontePrimaria[]> = {
  "tela-azul": [MS_BUGCHECK, MS_STOP_ERROR, MS_TROUBLESHOOT],
  "arquivos-apagados": [NIST_88, NIST_34, CARTILHA],
  "notebook-nao-carrega": [MS_SUPORTE, MS_TROUBLESHOOT],
  "computador-desliga-sozinho": [MS_TROUBLESHOOT, MS_STOP_ERROR],
  "computador-nao-da-imagem": [MS_TROUBLESHOOT, MS_SUPORTE],
  "impressora-nao-imprime": [MS_SUPORTE, MS_TROUBLESHOOT],
  "teclado-notebook-nao-funciona": [MS_SUPORTE, MS_TROUBLESHOOT],
  "cheiro-de-queimado": [MS_SUPORTE],
  "notebook-molhado": [MS_SUPORTE],
  "windows-nao-inicia": [MS_TROUBLESHOOT, MS_BITLOCKER],
  "hd-fazendo-barulho": [NIST_88, MS_BITLOCKER],
  "computador-lento": [MS_TROUBLESHOOT, MS_SUPORTE],
  "computador-esquentando": [MS_TROUBLESHOOT],
  "wifi-instavel": [CARTILHA],
};

export const getFontesProblema = (slug?: string | null): FontePrimaria[] =>
  (slug && FONTES_PROBLEMA[slug]) || [];
