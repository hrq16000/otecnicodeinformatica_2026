/**
 * BUSCA POR CÓDIGO DE ERRO
 *
 * Quem digita `0xc0000428` não está descrevendo um sintoma: está citando uma
 * ENTIDADE exata. Esse tipo de consulta não pode depender de fuzzy match de
 * palavras — ela resolve direto na página que trata o código.
 *
 * Normalização aceita: `0xc0000428`, `0xC0000428`, `c0000428`, `erro c0000428`,
 * `codigo de erro 0X C0000428` e variações com pontuação.
 *
 * Regra fail-safe: só existe entrada aqui para rota que já existe no portal.
 */

export type CodigoErro = {
  /** Código canônico, minúsculo e sem prefixo (`c0000428`). */
  codigo: string;
  /** Rótulo exibido na sugestão. */
  label: string;
  /** Rota existente que trata o código. */
  href: string;
  /** Termos correlatos que também devem cair nesta página. */
  correlatos: string[];
};

export const CODIGOS_ERRO: CodigoErro[] = [
  {
    codigo: "c0000428",
    label: "Erro 0xc0000428 — assinatura digital do arquivo de inicialização",
    href: "/problemas/windows-nao-inicia",
    correlatos: [
      "assinatura digital",
      "assinatura digital invalida",
      "status invalid image hash",
      "secure boot",
      "bootloader",
      "windows nao inicia",
      "erro de boot",
      "reparo de inicializacao",
      "bcdedit",
      "bootrec",
    ],
  },
  {
    codigo: "0000007b",
    label: "Erro 0x0000007B — INACCESSIBLE_BOOT_DEVICE",
    href: "/problemas/erro-0x0000007b-curitiba",
    correlatos: ["inaccessible boot device", "modo ahci", "troquei ssd e nao inicia", "erro de boot"],
  },
  {
    codigo: "c000021a",
    label: "Erro 0xc000021a — processo crítico do Windows falhou",
    href: "/problemas/erro-0xc000021a-curitiba",
    correlatos: ["processo critico", "winlogon", "tela azul apos atualizacao"],
  },
  {
    codigo: "c00000e",
    label: "Erro 0xc00000e — dispositivo de inicialização não encontrado",
    href: "/problemas/erro-0xc00000e-curitiba",
    correlatos: ["boot device not found", "no bootable device", "bcd corrompido"],
  },
  {
    codigo: "c000000e",
    label: "Erro 0xc000000e — dispositivo de inicialização não encontrado",
    href: "/problemas/erro-0xc00000e-curitiba",
    correlatos: ["boot device not found", "bcd corrompido"],
  },
  {
    codigo: "80070005",
    label: "Erro 0x80070005 — acesso negado no Windows Update",
    href: "/problemas/erro-0x80070005-curitiba",
    correlatos: ["acesso negado", "permissao negada", "windows update falhou"],
  },
  {
    codigo: "80004005",
    label: "Erro 0x80004005 — falha não especificada",
    href: "/problemas/erro-0x80004005-curitiba",
    correlatos: ["erro nao especificado", "falha ao instalar atualizacao"],
  },
  {
    codigo: "800f081f",
    label: "Erro 0x800f081f — arquivos de origem não encontrados",
    href: "/problemas/erro-0x800f081f-curitiba",
    correlatos: ["net framework", "arquivos de origem", "dism"],
  },
  {
    codigo: "80240034",
    label: "Erro 0x80240034 — download da atualização falhou",
    href: "/problemas/erro-0x80240034-curitiba",
    correlatos: ["download da atualizacao", "windows update travado"],
  },
  {
    codigo: "80070057",
    label: "Erro 0x80070057 — parâmetro incorreto",
    href: "/problemas/erro-0x80070057-curitiba",
    correlatos: ["parametro incorreto", "particao reservada"],
  },
  {
    codigo: "80300024",
    label: "Erro 0x80300024 — falha ao instalar o Windows na partição",
    href: "/problemas/erro-ao-instalar-windows-curitiba",
    correlatos: ["instalacao do windows", "particao", "nao consegue instalar"],
  },
  {
    codigo: "c1900101",
    label: "Erro 0xc1900101 — atualização do Windows 11 revertida",
    href: "/problemas/erro-atualizacao-windows-11-curitiba",
    correlatos: ["driver incompativel", "atualizacao revertida", "windows 11"],
  },
  {
    codigo: "80070643",
    label: "Erro 0x80070643 — falha na instalação da atualização",
    href: "/problemas/windows-travando-na-atualizacao-curitiba",
    correlatos: ["atualizacao travada", "winre", "particao de recuperacao"],
  },
  {
    codigo: "a00f4244",
    label: "Erro 0xa00f4244 — câmera não encontrada",
    href: "/problemas/notebook-sem-webcam-curitiba",
    correlatos: ["webcam nao funciona", "camera nao encontrada"],
  },
];

const PORCODIGO = new Map(CODIGOS_ERRO.map((c) => [c.codigo, c]));

const semAcento = (v: string) =>
  v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

/** Reduz qualquer grafia do código a sua forma canônica (`c0000428`). */
export function normalizarCodigo(bruto: string): string {
  return bruto.replace(/[^0-9a-zA-Z]/g, "").toLowerCase().replace(/^0x/, "");
}

/**
 * Extrai um código de erro da consulta digitada, tolerando `0x`, espaços,
 * maiúsculas e ruído em volta ("erro 0X C0000428 no boot").
 */
export function extrairCodigoDaConsulta(consulta: string): CodigoErro | null {
  const q = semAcento(consulta);
  const candidatos = new Set<string>();

  for (const m of q.matchAll(/0\s*x\s*([0-9a-f]{6,8})/g)) candidatos.add(m[1]);
  for (const m of q.matchAll(/\b([0-9a-f]{7,8})\b/g)) candidatos.add(m[1]);
  for (const m of q.matchAll(/\b(0x[0-9a-f]{6,8})\b/g)) candidatos.add(normalizarCodigo(m[1]));

  for (const bruto of candidatos) {
    const c = normalizarCodigo(bruto);
    const hit = PORCODIGO.get(c) ?? PORCODIGO.get(c.replace(/^0+/, ""));
    if (hit) return hit;
  }

  // Consulta parcial: "c00004" ainda deve sugerir o código completo.
  const parcial = [...candidatos].concat(q.replace(/[^0-9a-f]/g, ""));
  for (const p of parcial) {
    if (p.length < 5) continue;
    const hit = CODIGOS_ERRO.find((c) => c.codigo.startsWith(p) || p.startsWith(c.codigo));
    if (hit) return hit;
  }
  return null;
}

/** Termo correlato (sem código explícito) que indica a mesma página. */
export function correlatoParaCodigo(consulta: string): CodigoErro | null {
  const q = semAcento(consulta).replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  if (q.length < 4) return null;
  for (const c of CODIGOS_ERRO) {
    if (c.correlatos.some((t) => q.includes(t))) return c;
  }
  return null;
}

/** Sugestões de autocomplete para códigos enquanto o visitante digita. */
export function sugerirCodigos(consulta: string, limite = 4): CodigoErro[] {
  const q = semAcento(consulta).replace(/[^0-9a-fx]/g, "");
  if (q.length < 2) return [];
  const alvo = q.replace(/^0x/, "");
  return CODIGOS_ERRO.filter((c) => c.codigo.includes(alvo) || alvo.includes(c.codigo)).slice(0, limite);
}
