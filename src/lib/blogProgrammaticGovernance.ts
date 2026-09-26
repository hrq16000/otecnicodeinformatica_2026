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

export type ProgrammaticPromotedDecision = {
  slug: string;
  status: "promoted";
  rationale: string;
};

export type ProgrammaticEditorialDecision =
  | ProgrammaticRedirectDecision
  | ProgrammaticReviewDecision
  | ProgrammaticPromotedDecision;

export const PROGRAMMATIC_EDITORIAL_GOVERNANCE: ProgrammaticEditorialDecision[] = [
  {
    slug: "pc-nao-liga-o-que-fazer",
    status: "review",
    rationale:
      "Intenção de desktop sem energia é distinta das páginas de vídeo/boot. O texto já foi reescrito com diagnóstico seguro e sem ponte em fonte; passou por revisão técnica formal; permanece noindex até receber asset editorial próprio com proveniência.",
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
    status: "promoted",
    rationale:
      "Instabilidade de Wi-Fi sustenta intenção própria de isolamento dispositivo × WLAN × roteador × provedor. O texto foi reescrito, revisado com fontes FCC/Wi-Fi Alliance, recebeu capa vetorial própria e foi promovido de forma controlada ao índice.",
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
    status: "promoted",
    rationale:
      "Procedimento de backup pessoal em nuvem é independente do comparativo nuvem vs HD externo. O texto foi reescrito, revisado com CISA/NIST, recebeu capa vetorial própria com procedência registrada e foi promovido de forma controlada ao índice.",
  },
  {
    slug: "como-recuperar-arquivos-apagados",
    status: "redirect",
    target: "/blog/como-recuperar-arquivos-apagados-windows",
    rationale:
      "O acervo já possui guia aprovado com a mesma intenção, fontes Microsoft e capa licenciada. A URL herdada vira alias para concentrar autoridade na owner canônica.",
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
    status: "redirect",
    target: "/decisoes/atualizar-para-windows-11",
    rationale:
      "A intenção real é decidir se deve migrar. O guia de decisão já cobre requisitos, compatibilidade, backup e riscos, evitando uma segunda owner concorrente.",
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

export const PROGRAMMATIC_PROMOTED = PROGRAMMATIC_EDITORIAL_GOVERNANCE.filter(
  (d): d is ProgrammaticPromotedDecision => d.status === "promoted",
);
