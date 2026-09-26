/**
 * GOVERNANÇA DOS ARTIGOS PROGRAMÁTICOS HERDADOS
 *
 * Fonte única da decisão editorial para o estoque em
 * src/data/blogProgrammaticPosts.tsx.
 *
 * Regra:
 * - redirect: intenção já coberta por URL canônica mais forte; não promover.
 * - review: intenção potencialmente útil, mas exige reescrita/revisão antes
 *   de qualquer aprovação para indexação.
 *
 * Nada aqui, sozinho, torna uma URL indexável.
 */

export type ProgrammaticRedirectDecision = {
  slug: string;
  status: "redirect";
  target: string;
  rationale: string;
};

export type ProgrammaticReviewDecision = {
  slug: string;
  status: "review";
  rationale: string;
};

export type ProgrammaticEditorialDecision =
  | ProgrammaticRedirectDecision
  | ProgrammaticReviewDecision;

export const PROGRAMMATIC_EDITORIAL_GOVERNANCE: ProgrammaticEditorialDecision[] = [
  {
    slug: "pc-nao-liga-o-que-fazer",
    status: "review",
    rationale:
      "Intenção de desktop sem energia pode merecer guia próprio, mas o texto atual contém procedimentos arriscados e conclusões excessivas; permanece noindex até reescrita.",
  },
  {
    slug: "tela-azul-windows-como-resolver",
    status: "redirect",
    target: "/blog/como-resolver-tela-azul-windows",
    rationale: "Mesma intenção do guia canônico de tela azul já revisado e indexável.",
  },
  {
    slug: "notebook-superaquecendo-solucoes",
    status: "redirect",
    target: "/blog/notebook-superaquecendo-o-que-fazer",
    rationale: "Mesma intenção do guia canônico de superaquecimento de notebook.",
  },
  {
    slug: "wifi-caindo-toda-hora",
    status: "review",
    rationale:
      "Instabilidade de Wi-Fi pode sustentar uma intenção própria, mas o texto atual usa absolutos técnicos e recomendações genéricas; exige reescrita antes de indexação.",
  },
  {
    slug: "pc-muito-lento-como-acelerar",
    status: "redirect",
    target: "/blog/computador-lento-causas-solucoes",
    rationale: "Mesma intenção do guia canônico de computador lento.",
  },
  {
    slug: "como-remover-virus-sem-formatar",
    status: "redirect",
    target: "/blog/como-remover-virus-windows-iniciantes",
    rationale: "Mesma intenção de remoção segura de malware sem formatação.",
  },
  {
    slug: "windows-nao-atualiza-erros",
    status: "redirect",
    target: "/blog/windows-update-nao-funciona-o-que-verificar",
    rationale: "Mesma intenção do cluster canônico de falhas do Windows Update.",
  },
  {
    slug: "impressora-nao-imprime-solucoes",
    status: "redirect",
    target: "/problemas/impressora-nao-imprime",
    rationale: "A página de sintoma já é a owner canônica da intenção 'impressora não imprime'.",
  },
  {
    slug: "ssd-vs-hd-vale-a-pena-upgrade",
    status: "redirect",
    target: "/blog/quando-trocar-hd-por-ssd",
    rationale: "A decisão de migrar de HD para SSD já possui guia canônico revisado.",
  },
  {
    slug: "como-fazer-backup-na-nuvem",
    status: "review",
    rationale:
      "Procedimento de backup pessoal em nuvem pode ser independente do comparativo nuvem vs HD externo, mas precisa ser reescrito com restauração, versionamento e fontes primárias.",
  },
  {
    slug: "como-recuperar-arquivos-apagados",
    status: "review",
    rationale:
      "Pode sustentar intenção procedural própria, desde que seja reescrito com prioridade a não sobrescrever a mídia e critérios claros de parada.",
  },
  {
    slug: "como-aumentar-velocidade-internet",
    status: "redirect",
    target: "/blog/internet-lenta-provedor-ou-roteador",
    rationale: "A intenção ampla de internet lenta já tem owner canônica baseada em diagnóstico por camadas.",
  },
  {
    slug: "como-saber-se-pc-tem-virus",
    status: "redirect",
    target: "/blog/como-saber-se-pc-tem-virus-malware",
    rationale: "Variação de slug da mesma intenção de identificar sinais de malware.",
  },
  {
    slug: "como-clonar-hd-para-ssd-passo-a-passo",
    status: "redirect",
    target: "/blog/como-clonar-hd-para-ssd",
    rationale: "Variação de slug da mesma intenção de clonagem HD para SSD.",
  },
  {
    slug: "como-instalar-windows-11-do-zero-2026",
    status: "redirect",
    target: "/blog/como-instalar-windows-11-do-zero",
    rationale: "Variação datada da mesma intenção de instalação limpa do Windows 11.",
  },
  {
    slug: "como-trocar-pasta-termica",
    status: "redirect",
    target: "/blog/como-trocar-pasta-termica-notebook",
    rationale: "O guia canônico já cobre o procedimento com critérios de segurança e documentação do fabricante.",
  },
  {
    slug: "diferenca-windows-10-vs-11",
    status: "review",
    rationale:
      "Comparativo pode ser útil em 2026, mas precisa ser alinhado ao fim do suporte do Windows 10 e separado da decisão 'atualizar para Windows 11'.",
  },
  {
    slug: "melhores-antivirus-gratuitos-2026",
    status: "redirect",
    target: "/blog/como-escolher-um-bom-antivirus",
    rationale: "Lista anual envelhece e canibaliza o guia evergreen de escolha de antivírus.",
  },
];

export const PROGRAMMATIC_REDIRECTS = PROGRAMMATIC_EDITORIAL_GOVERNANCE.filter(
  (d): d is ProgrammaticRedirectDecision => d.status === "redirect",
);

export const PROGRAMMATIC_REVIEW = PROGRAMMATIC_EDITORIAL_GOVERNANCE.filter(
  (d): d is ProgrammaticReviewDecision => d.status === "review",
);
