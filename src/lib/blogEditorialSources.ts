// ─────────────────────────────────────────────────────────────
// MANIFESTO DE FONTES EDITORIAIS — PROMPT 32 (revisão técnica).
//
// Fonte única e tipada das referências primárias consultadas para os
// oito conteúdos-piloto. Regras inegociáveis:
//
//   • Uma fonte só é cadastrada se foi REALMENTE consultada, a URL foi
//     confirmada e ela sustenta uma afirmação concreta do texto.
//   • Nenhuma fonte inventada, presumida ou reescrita por IA.
//   • Apenas domínios oficiais / padrões / pesquisa primária.
//   • `factChecked` NÃO é preenchido automaticamente. Enquanto a
//     revisão material não for concluída, permanece `false`.
//   • Este manifesto NÃO aprova nem indexa artigo algum. A única fonte
//     de indexabilidade continua sendo APPROVED_EDITORIAL_CONTENT
//     (vazio) em blogEditorialRegistry.ts.
//
// `accessedAt` é a data real da consulta às fontes (não a data de build
// e não uma data de aprovação editorial).
// ─────────────────────────────────────────────────────────────

export type SourceType = "official" | "standard" | "primary_research";

/** Status técnico separado do status editorial. Nunca torna um artigo aprovado. */
export type TechnicalReviewStatus = "pending" | "reviewed" | "blocked";

export interface EditorialSource {
  id: string;
  title: string;
  publisher: string;
  url: string;
  /** Data ISO real da consulta. */
  accessedAt: string;
  sourceType: SourceType;
  /** Afirmações do texto que esta fonte sustenta. */
  supports: string[];
}

export interface ArticleSourceManifest {
  slug: string;
  /** IDs de EditorialSource que sustentam o artigo. */
  sources: string[];
  /** Estado da revisão técnica (estrutural + material). */
  technicalReview: TechnicalReviewStatus;
  /** true SOMENTE quando toda afirmação material foi verificada. */
  factChecked: boolean;
  /** Data ISO da checagem — apenas se realmente executada e concluída. */
  factCheckedAt?: string;
  /**
   * true quando o artigo se sustenta exclusivamente em conhecimento técnico
   * estável (sem afirmação instável/dependente de versão ou fabricante) e,
   * por isso, pode ficar "reviewed" sem fontes visíveis. Justificado em notes.
   */
  stableKnowledge?: boolean;
  notes?: string;
}


// Domínios permitidos para fontes primárias/oficiais. Qualquer URL fora
// desta lista é rejeitada pelo gate a menos que reclassificada.
export const ALLOWED_SOURCE_HOSTS = [
  "microsoft.com",
  "learn.microsoft.com",
  "support.microsoft.com",
  "www.microsoft.com",
  "cisa.gov",
  "www.cisa.gov",
  "cert.br",
  "cartilha.cert.br",
  "nist.gov",
  "www.nist.gov",
  "csrc.nist.gov",
  "wi-fi.org",
  "www.wi-fi.org",
  "support.google.com",
  "nvmexpress.org",
  "www.nvmexpress.org",
  "fcc.gov",
  "www.fcc.gov",
] as const;

// ─────────────────────────────────────────────────────────────
// FONTES CONSULTADAS (URLs confirmadas em 2026-07-12).
// ─────────────────────────────────────────────────────────────
export const EDITORIAL_SOURCES: Record<string, EditorialSource> = {
  "ms-outlook-add-account": {
    id: "ms-outlook-add-account",
    title: "Add an email account to Outlook for Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/en-us/outlook/getstarted/add-an-email-account-to-outlook-for-windows",
    accessedAt: "2026-09-11",
    sourceType: "official",
    supports: ["Adição de contas e configuração avançada de e-mail no Outlook."],
  },
  "ms-m365-admin-roles": {
    id: "ms-m365-admin-roles",
    title: "About administrator roles in the Microsoft 365 admin center",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide",
    accessedAt: "2026-09-11",
    sourceType: "official",
    supports: ["Funções administrativas e uso de MFA para administradores no Microsoft 365."],
  },
  "ms-win11-requirements": {
    id: "ms-win11-requirements",
    title: "Windows 11 requirements",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/windows/whats-new/windows-11-requirements",
    accessedAt: "2026-07-12",
    sourceType: "official",
    supports: [
      "Requisitos mínimos de hardware para instalar ou atualizar para o Windows 11.",
    ],
  },
  "ms-win11-installation-media": {
    id: "ms-win11-installation-media",
    title: "Create installation media for Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/en-us/windows/create-installation-media-for-windows-99a58364-8c02-206f-aa6f-40c3b507420d",
    accessedAt: "2026-07-12",
    sourceType: "official",
    supports: [
      "Uso de mídia oficial de instalação para instalação limpa ou reinstalação do Windows.",
    ],
  },
  "ms-win11-activation": {
    id: "ms-win11-activation",
    title: "Activate Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/en-us/windows/activate-windows-c39005d4-95ee-b91e-b399-2820fda32227",
    accessedAt: "2026-07-12",
    sourceType: "official",
    supports: [
      "A ativação do Windows depende de uma licença digital ou chave de produto legítima vinculada ao dispositivo ou conta Microsoft.",
    ],
  },
  "ms-bitlocker-recovery": {
    id: "ms-bitlocker-recovery",
    title: "Finding your BitLocker recovery key in Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/en-us/windows/finding-your-bitlocker-recovery-key-in-windows-6b71ad27-0b89-ea08-f143-056f5ab347d6",
    accessedAt: "2026-07-12",
    sourceType: "official",
    supports: [
      "Discos protegidos por BitLocker podem exigir a chave de recuperação; sem ela é possível perder o acesso aos dados.",
    ],
  },
  "ms-bitlocker-backup-key": {
    id: "ms-bitlocker-backup-key",
    title: "Back up your BitLocker recovery key",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/en-us/windows/security/encryption/back-up-your-bitlocker-recovery-key",
    accessedAt: "2026-09-07",
    sourceType: "official",
    supports: [
      "A chave de recuperação do BitLocker deve ser confirmada e copiada para um local acessível antes de alterações de hardware ou firmware.",
    ],
  },
  "ms-initialize-new-disks": {
    id: "ms-initialize-new-disks",
    title: "Initialize new disks",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/windows-server/storage/disk-management/initialize-new-disks",
    accessedAt: "2026-09-07",
    sourceType: "official",
    supports: [
      "Um disco novo pode precisar ser colocado online e inicializado no Gerenciamento de Disco antes da criação de um volume.",
      "A seleção do disco correto e do estilo de partição precede a criação do volume.",
    ],
  },
  "nvme-official-faq": {
    id: "nvme-official-faq",
    title: "Frequently Asked Questions",
    publisher: "NVM Express",
    url: "https://nvmexpress.org/education/faqs/",
    accessedAt: "2026-09-07",
    sourceType: "standard",
    supports: [
      "M.2 descreve um formato físico que pode transportar SATA ou PCIe; o formato sozinho não confirma compatibilidade NVMe.",
    ],
  },
  "nvme-base-specification-overview": {
    id: "nvme-base-specification-overview",
    title: "NVM Express Base Specification",
    publisher: "NVM Express",
    url: "https://nvmexpress.org/specification/nvm-express-base-specification/",
    accessedAt: "2026-09-07",
    sourceType: "standard",
    supports: [
      "NVMe foi projetado para armazenamento de estado sólido sobre PCI Express e é usado em vários formatos, inclusive M.2.",
    ],
  },
  "ms-bcdboot": {
    id: "ms-bcdboot",
    title: "BCDBoot command-line options",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/bcdboot-command-line-options-techref-di",
    accessedAt: "2026-09-02",
    sourceType: "official",
    supports: [
      "O BCDBoot configura ou repara o ambiente de inicialização copiando arquivos de boot da instalação do Windows para a partição de sistema.",
      "Os parâmetros de origem, destino e tipo de firmware precisam corresponder à instalação que será reparada.",
    ],
  },
  "ms-windows-recovery-environment": {
    id: "ms-windows-recovery-environment",
    title: "Windows recovery environment",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/en-us/windows/experience/backup-recovery/windows-recovery-environment",
    accessedAt: "2026-09-10",
    sourceType: "official",
    supports: [
      "O Windows RE reúne ferramentas de recuperação como Reparo de Inicialização, Configurações de Inicialização, Desinstalar Atualizações e Prompt de Comando.",
      "Algumas ferramentas do ambiente de recuperação exigem a chave BitLocker quando o dispositivo está criptografado.",
    ],
  },
  "ms-recovery-options-windows": {
    id: "ms-recovery-options-windows",
    title: "Recovery options in Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/en-us/windows/experience/backup-recovery/recovery-options-in-windows",
    accessedAt: "2026-09-10",
    sourceType: "official",
    supports: [
      "As opções de recuperação devem ser tentadas da menos disruptiva para a mais disruptiva.",
      "Algumas opções de recuperação podem causar perda de dados; arquivos importantes devem ser copiados antes de prosseguir.",
      "A desinstalação de atualização, a restauração e a reinstalação têm efeitos e limites diferentes.",
    ],
  },
  "ms-tech-support-scams": {
    id: "ms-tech-support-scams",
    title: "Protect yourself from tech support scams",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/en-us/office/protect-yourself-from-tech-support-scams",
    accessedAt: "2026-09-12",
    sourceType: "official",
    supports: [
      "Golpes de falso suporte técnico usam táticas de intimidação; não ligar para números exibidos em alertas.",
    ],
  },
  "ms-phishing-protection": {
    id: "ms-phishing-protection",
    title: "Protect yourself from phishing",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/en-us/security/protect-yourself-from-phishing",
    accessedAt: "2026-09-12",
    sourceType: "official",
    supports: [
      "Mensagens de phishing podem usar urgência, ameaças, domínios semelhantes e links ou anexos inesperados.",
      "Ao suspeitar, o acesso deve ser feito por endereço ou canal oficial, sem usar o link da mensagem.",
      "Após exposição de credenciais, deve-se registrar o incidente, trocar senhas reutilizadas, ativar autenticação multifator e avisar a instituição envolvida.",
    ],
  },
  "ms-windows-security-overview": {
    id: "ms-windows-security-overview",
    title: "Windows Security app overview",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/en-us/windows/security/windows-security/windows-security-app-overview",
    accessedAt: "2026-09-06",
    sourceType: "official",
    supports: [
      "O Windows Security inclui o Microsoft Defender Antivirus no Windows 10 e no Windows 11.",
      "Quando outro antivírus compatível está instalado e ativo, o Microsoft Defender Antivirus deixa de atuar como antivírus principal e volta a ser ativado se o produto for removido.",
    ],
  },
  "ms-controlled-folder-access": {
    id: "ms-controlled-folder-access",
    title: "Virus and threat protection in the Windows Security app",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/en-us/windows/security/threat-malware-protection/virus-and-threat-protection-in-the-windows-security-app",
    accessedAt: "2026-09-06",
    sourceType: "official",
    supports: [
      "O acesso controlado a pastas verifica aplicativos e bloqueia os não autorizados ou não confiáveis de alterar arquivos em pastas protegidas.",
      "Aplicativos legítimos bloqueados podem ser permitidos explicitamente pelo usuário.",
    ],
  },
  "cisa-upskill-checklist": {
    id: "cisa-upskill-checklist",
    title: "Project Upskill Checklist",
    publisher: "CISA",
    url: "https://www.cisa.gov/resources-tools/resources/project-upskill-checklist",
    accessedAt: "2026-09-06",
    sourceType: "official",
    supports: [
      "A proteção antimalware fornecida pelo sistema deve permanecer habilitada e atualizada.",
      "Atualizações, senhas fortes e autenticação multifator continuam necessárias além do antivírus.",
    ],
  },

  "certbr-golpes": {
    id: "certbr-golpes",
    title: "Cartilha de Segurança para Internet — Golpes",
    publisher: "CERT.br / NIC.br",
    url: "https://cartilha.cert.br/fasciculos/",
    accessedAt: "2026-09-12",
    sourceType: "official",
    supports: [
      "Como identificar sinais de golpes e fraudes on-line e como agir ao suspeitar de um golpe.",
    ],
  },
  "cisa-stop-ransomware": {
    id: "cisa-stop-ransomware",
    title: "#StopRansomware Guide",
    publisher: "CISA",
    url: "https://www.cisa.gov/stopransomware/ransomware-guide",
    accessedAt: "2026-09-09",
    sourceType: "official",
    supports: [
      "Boas práticas para prevenir, conter e responder a incidentes de ransomware; não pagar resgate como primeira reação.",
    ],
  },
  "cisa-backup": {
    id: "cisa-backup",
    title: "Back Up Business Data",
    publisher: "CISA",
    url: "https://www.cisa.gov/audiences/small-and-medium-businesses/secure-your-business/back-up-business-data",
    accessedAt: "2026-09-09",
    sourceType: "official",
    supports: [
      "Backup como proteção contra perda de dados por falhas, exclusão acidental e ataques.",
    ],
  },
  "nist-sp-800-34": {
    id: "nist-sp-800-34",
    title: "SP 800-34 Rev. 1 — Contingency Planning Guide for Federal Information Systems",
    publisher: "NIST (CSRC)",
    url: "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
    accessedAt: "2026-09-09",
    sourceType: "standard",
    supports: [
      "Planejamento de contingência e restauração de dados; a restauração precisa ser testada, não apenas configurada.",
    ],
  },
  "wifi-alliance-security": {
    id: "wifi-alliance-security",
    title: "Wi-Fi Security | Wi-Fi Alliance",
    publisher: "Wi-Fi Alliance",
    url: "https://www.wi-fi.org/discover-wi-fi/security",
    accessedAt: "2026-08-16",
    sourceType: "official",
    supports: [
      "WPA3 é o padrão de segurança atual para redes Wi-Fi; WPA2 permanece como base mínima aceitável.",
    ],
  },
  "ms-optimize-drives": {
    id: "ms-optimize-drives",
    title: "Desfragmentar e otimizar unidades no Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/windows/desfragmentar-o-computador-com-windows-10-048aefac-7f1f-4632-d48a-9700c4ec702a",
    accessedAt: "2026-08-16",
    sourceType: "official",
    supports: [
      "O Windows trata discos mecânicos e unidades de estado sólido de formas diferentes na otimização de unidades.",
    ],
  },
  "wifi-alliance-home": {
    id: "wifi-alliance-home",
    title: "Wi-Fi Alliance connects and expands home Wi-Fi",
    publisher: "Wi-Fi Alliance",
    url: "https://www.wi-fi.org/news-events/newsroom/wi-fi-alliance-connects-and-expands-home-wi-fi",
    accessedAt: "2026-07-12",
    sourceType: "official",
    supports: [
      "Redes residenciais com múltiplos pontos (EasyMesh) para melhorar cobertura em ambientes maiores.",
    ],
  },
  "fcc-home-network-tips": {
    id: "fcc-home-network-tips",
    title: "Home Network Tips",
    publisher: "Federal Communications Commission",
    url: "https://www.fcc.gov/home-network-tips",
    accessedAt: "2026-09-08",
    sourceType: "official",
    supports: [
      "Testes de velocidade registram download e upload, mas o resultado dentro de casa também depende da rede Wi-Fi, da posição do roteador e dos dispositivos conectados.",
      "Comparar medições e observar a rede doméstica ajuda a separar entrega de banda larga de limitações locais.",
    ],
  },
  "fcc-speed-test-app-faq": {
    id: "fcc-speed-test-app-faq",
    title: "FCC Mobile Speed Test App — Frequently Asked Questions",
    publisher: "Federal Communications Commission",
    url: "https://www.fcc.gov/BroadbandData/speed-test-app-faq",
    accessedAt: "2026-09-08",
    sourceType: "official",
    supports: [
      "Uma medição de conexão pode registrar download, upload, latência, jitter e perda de pacotes; esses indicadores descrevem aspectos diferentes da experiência.",
      "Resultados isolados não bastam para caracterizar de forma confiável o comportamento recorrente da conexão.",
    ],
  },
  "android-acelerar-dispositivo": {
    id: "android-acelerar-dispositivo",
    title: "Acelerar um dispositivo Android lento",
    publisher: "Ajuda do Android",
    url: "https://support.google.com/android/answer/7667018?hl=pt-BR",
    accessedAt: "2026-08-31",
    sourceType: "official",
    supports: [
      "Pouco espaço de armazenamento pode afetar o funcionamento do dispositivo; atualização e identificação de aplicativo problemático são etapas de diagnóstico.",
    ],
  },
  "android-arquivar-apps": {
    id: "android-arquivar-apps",
    title: "Arquive apps não usadas no Android",
    publisher: "Ajuda do Android",
    url: "https://support.google.com/android/answer/15523443?hl=pt",
    accessedAt: "2026-08-31",
    sourceType: "official",
    supports: [
      "Arquivar aplicativos não usados libera espaço sem apagar os dados pessoais mantidos no dispositivo, quando o recurso está disponível.",
    ],
  },
  "android-cache-google-app": {
    id: "android-cache-google-app",
    title: "O Google app não exibe os resultados da pesquisa",
    publisher: "Ajuda da Pesquisa Google",
    url: "https://support.google.com/websearch/answer/6385818?co=GENIE.Platform%3DAndroid&hl=pt-br",
    accessedAt: "2026-08-31",
    sourceType: "official",
    supports: [
      "Limpar cache remove dados temporários; limpar dados remove configurações e dados do aplicativo.",
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// MANIFESTO POR ARTIGO — fechamento técnico (PROMPT 33).
//
// Estado desta rodada:
//   • Os dois desalinhamentos críticos (notebook / Windows 11) foram
//     resolvidos no conteúdo e realinhados ao slug. Ambos saíram de
//     "blocked".
//   • Fact-check material concluído para os oito pilotos: cada afirmação
//     instável foi confirmada por fonte primária ou qualificada no texto.
//   • Resultado: 8 "reviewed", 0 "pending", 0 "blocked".
//   • Artigos sem fonte visível se sustentam em conhecimento técnico
//     estável (stableKnowledge:true), justificado em notes.
//   • factCheckedAt é a data interna real da checagem. NÃO altera
//     dateModified público e NÃO aprova nem indexa o artigo. A única
//     fonte de indexabilidade continua sendo APPROVED_EDITORIAL_CONTENT
//     (vazio) em blogEditorialRegistry.ts.
// ─────────────────────────────────────────────────────────────
export const ARTICLE_SOURCE_MANIFEST: Record<string, ArticleSourceManifest> = {
  "como-deixar-celular-android-mais-rapido": {
    slug: "como-deixar-celular-android-mais-rapido",
    sources: ["android-acelerar-dispositivo", "android-arquivar-apps", "android-cache-google-app"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-31",
    notes:
      "Revisão do Ciclo 2: removidas promessas de aceleração, frequência fixa de reinício e alteração de opções de desenvolvedor. O texto diferencia cache de dados, armazenamento de memória RAM e limita procedimentos potencialmente destrutivos.",
  },
  "como-escolher-um-bom-antivirus": {
    slug: "como-escolher-um-bom-antivirus",
    sources: [
      "ms-windows-security-overview",
      "ms-controlled-folder-access",
      "cisa-upskill-checklist",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-06",
    notes:
      "Revisão material em 2026-09-06: funcionamento da proteção nativa, convivência com produto de terceiros e acesso controlado a pastas foram conferidos em documentação oficial; removidas promessas amplas de cobertura e afirmações absolutas sobre dois antivírus. Sem ranking de fabricante, indicação comercial ou promessa de detecção total.",
  },
  "como-proteger-computador-golpes-internet": {
    slug: "como-proteger-computador-golpes-internet",
    sources: ["certbr-golpes", "ms-phishing-protection", "ms-tech-support-scams"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-12",
    notes:
      "Revisão aprofundada em 2026-09-12: resposta proporcional a mensagem, clique, credencial, acesso remoto e fraude financeira; preservação de evidências e canais oficiais priorizados. Fontes primárias visíveis, sem aplicativo de terceiros, estatística ou promessa de recuperação de valores.",
  },
  "como-configurar-roteador-wifi-iniciantes": {
    slug: "como-configurar-roteador-wifi-iniciantes",
    sources: ["wifi-alliance-security", "wifi-alliance-home"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-12",
    stableKnowledge: true,
    notes:
      "Reescrito na Onda 5B. Sem velocidade prometida, sem marca de equipamento recomendada e sem passo dependente de painel específico de fabricante. Recomendações de canal (1/6/11 em 2,4 GHz) e de padrão de segurança (WPA3/WPA2-AES, WPS desligado) são conhecimento técnico estável.",
  },
  "como-saber-quem-esta-usando-meu-wifi": {
    slug: "como-saber-quem-esta-usando-meu-wifi",
    sources: ["wifi-alliance-security"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-12",
    stableKnowledge: true,
    notes:
      "Reescrito na Onda 5B. Explicita que endereço MAC aleatório por rede torna nomes desconhecidos inconclusivos e que filtro de MAC não é medida de segurança. Sem indicação de aplicativo de terceiros e sem promessa de detecção de invasão.",
  },
  "como-fazer-upgrade-ssd-nvme": {
    slug: "como-fazer-upgrade-ssd-nvme",
    sources: [
      "nvme-official-faq",
      "nvme-base-specification-overview",
      "ms-bitlocker-backup-key",
      "ms-initialize-new-disks",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-07",
    notes:
      "Revisado em 2026-09-07 com fontes primárias visíveis. Sem promessa de ganho percentual, sem número instável de fabricante e sem indicação de modelo comercial. Compatibilidade tratada como verificação de formato, interface, dimensões e suporte do equipamento; preservação dos dados e chave BitLocker antecedem a intervenção.",
  },
  "como-recuperar-dados-hd-com-defeito": {
    slug: "como-recuperar-dados-hd-com-defeito",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-12",
    stableKnowledge: true,
    notes:
      "Reescrito na Onda 5A: removido o texto-modelo herdado e a marca de origem. Declara explicitamente que recuperação de dados não tem garantia de sucesso; separa falha lógica de falha física; encaminha casos mecânicos a laboratório especializado. Sem taxa de sucesso, sem prazo e sem preço prometido.",
  },
  "notebook-nao-liga-o-que-fazer": {
    slug: "notebook-nao-liga-o-que-fazer",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-07-12",
    stableKnowledge: true,
    notes:
      "Desalinhamento resolvido: title/H1/introdução/estrutura focados exclusivamente em notebook; desktop aparece só como menção contextual curta, fora de title e H1. Conteúdo baseado em conhecimento técnico estável de triagem segura, sem afirmação específica de fabricante, sem número instável e sem procedimento perigoso. Não afirma causa única sem diagnóstico. Sem fonte visível por depender de conhecimento estável.",
  },
  "computador-lento-causas-solucoes": {
    slug: "computador-lento-causas-solucoes",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-07-12",
    stableKnowledge: true,
    notes:
      "Fact-check concluído: formatação não é solução universal, SSD não resolve todo gargalo, memória sem número mínimo universal e malware tratado como possibilidade (não diagnóstico). Sem percentuais de ganho e sem métrica do Gerenciador de Tarefas como diagnóstico definitivo. Conhecimento técnico estável, sem afirmação instável — sem fonte visível.",
  },
  "como-instalar-windows-11-do-zero": {
    slug: "como-instalar-windows-11-do-zero",
    sources: [
      "ms-win11-requirements",
      "ms-win11-installation-media",
      "ms-win11-activation",
      "ms-bitlocker-recovery",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-07-12",
    notes:
      "Desalinhamento resolvido: title/H1/introdução/estrutura realinhados à instalação limpa do Windows 11 (guia de preparação e decisão segura). Afirmações materiais (requisitos, mídia oficial, ativação/licença, BitLocker/chave de recuperação) sustentadas por fontes oficiais Microsoft. Sem ativador, crack, bypass de requisitos, imagem modificada ou download de terceiros. Publisher: Microsoft.",
  },
  "quando-trocar-hd-por-ssd": {
    slug: "quando-trocar-hd-por-ssd",
    sources: ["ms-optimize-drives", "ms-bitlocker-recovery"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-07-12",
    stableKnowledge: true,
    notes:
      "Fact-check concluído: compatibilidade física e lógica (SATA/NVMe e espaço) tratada como verificação, clonagem pode carregar problemas existentes, sem promessa de velocidade, sem 'fica como novo' e sem compatibilidade universal. Conhecimento técnico estável; nenhum número de desempenho promocional — sem fonte visível.",
  },
  "notebook-superaquecendo-o-que-fazer": {
    slug: "notebook-superaquecendo-o-que-fazer",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-07-12",
    stableKnowledge: true,
    notes:
      "Fact-check concluído: sem temperatura universal de risco e sem intervalo universal para pasta térmica; alertas de segurança presentes (bateria estufada, cheiro, desligamentos) com orientação de parar o uso; foco em notebook. Conhecimento técnico estável — sem fonte visível.",
  },
  "backup-como-proteger-seus-arquivos": {
    slug: "backup-como-proteger-seus-arquivos",
    sources: ["cisa-backup", "nist-sp-800-34", "cisa-stop-ransomware"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-07-12",
    notes:
      "Fact-check concluído: sincronização não equivale sempre a backup, cópia no mesmo disco não protege contra falha do disco, sem garantia de recuperação e estratégia de múltiplas cópias apresentada como referência (não regra única). Restauração precisa ser testada. Fontes CISA/NIST.",
  },
  "manutencao-preventiva-computador-guia": {
    slug: "manutencao-preventiva-computador-guia",
    sources: ["cisa-backup", "nist-sp-800-34", "cisa-stop-ransomware"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-11",
    stableKnowledge: true,
    notes:
      "Reescrita material: removeu percentuais e intervalos universais sem evidência; separa rotina preventiva de diagnóstico, reforça restauração testada e define limites para sinais térmicos, elétricos e mecânicos. Fontes CISA/NIST para continuidade e cópias de segurança.",
  },
  "erros-comuns-upgrade-computador": {
    slug: "erros-comuns-upgrade-computador",
    sources: ["ms-win11-requirements", "cisa-backup"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-11",
    stableKnowledge: true,
    notes:
      "Revisão material: removeu recomendação universal de reinstalação e alegações de potência, priorizando manual, formato, protocolo, energia, espaço e preservação de dados.",
  },
  "quando-trocar-computador-ou-reparar": {
    slug: "quando-trocar-computador-ou-reparar",
    sources: ["ms-win11-requirements", "cisa-backup"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-11",
    stableKnowledge: true,
    notes:
      "Reescrita material: removeu faixas fixas de idade, preço e percentual, além de exemplos de custo. A decisão passou a exigir uso real, falha identificada, suporte, compatibilidade e backup testado.",
  },
  "seguranca-digital-empresas-guia-2024": {
    slug: "seguranca-digital-empresas-guia-2024",
    sources: ["cisa-upskill-checklist", "cisa-backup", "cisa-stop-ransomware"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-11",
    stableKnowledge: true,
    notes:
      "Reescrita material: retirou comparação não comprovada sobre vulnerabilidade de PMEs e recomendações de marcas. Estruturou inventário, acesso mínimo, autenticação, atualização, backup testado e resposta inicial a incidente.",
  },
  "windows-11-vale-a-pena-atualizar": {
    slug: "windows-11-vale-a-pena-atualizar",
    sources: ["ms-win11-requirements", "ms-win11-installation-media"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-11",
    notes: "Reescrita material: removeu alegações de desempenho e compatibilidade genéricas; exige requisitos oficiais, backup testado e verificação de software e periféricos.",
  },
  "office-365-guia-completo-empresas": {
    slug: "office-365-guia-completo-empresas",
    sources: ["ms-m365-admin-roles", "cisa-backup"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-11",
    notes: "Reescrita material: retirou planos, preços e quotas; prioriza identidade, permissões, continuidade e restauração.",
  },
  "office-365-vs-office-tradicional": {
    slug: "office-365-vs-office-tradicional",
    sources: ["ms-m365-admin-roles", "cisa-backup"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-11",
    notes: "Comparação reescrita sem recursos e condições fixas; decisão por colaboração, administração e continuidade.",
  },
  "configurar-email-outlook-office-365": {
    slug: "configurar-email-outlook-office-365",
    sources: ["ms-outlook-add-account", "ms-m365-admin-roles"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-11",
    notes: "Procedimento reescrito com conta individual, MFA, teste e limite para dados de configuração.",
  },
  "como-saber-se-pc-tem-virus-malware": {
    slug: "como-saber-se-pc-tem-virus-malware",
    sources: ["certbr-golpes", "cisa-stop-ransomware", "ms-tech-support-scams"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-07-12",
    notes:
      "Fact-check concluído: sintomas não confirmam infecção, contenção segura (desconectar da rede, não pagar resgate), troca de senha em dispositivo confiável, sem ferramenta desconhecida e sem prometer remoção ou preservação integral. Golpe de falso suporte tratado. Fontes CERT.br/CISA/Microsoft.",
  },
  "como-melhorar-sinal-wifi-em-casa": {
    slug: "como-melhorar-sinal-wifi-em-casa",
    sources: ["wifi-alliance-home"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-07-12",
    notes:
      "Fact-check concluído: diferencia sinal e internet, dispositivo e rede, operadora e Wi-Fi local; sem canal/frequência/potência universais; foco residencial. Cobertura com múltiplos pontos (mesh) sustentada pela Wi-Fi Alliance.",
  },
  "organizacao-de-ti-para-pequenos-escritorios": {
    slug: "organizacao-de-ti-para-pequenos-escritorios",
    sources: ["cisa-backup", "nist-sp-800-34"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-06",
    notes:
      "Revisão concluída (Rodada 3O): conteúdo organizacional, sem consultoria de conformidade, sem SLA, sem promessa de continuidade e sem orientação para armazenar senhas junto ao inventário. Limite entre camada de máquina e sistemas de terceiros explicitado. Estratégia de cópias apresentada como referência, com teste de restauração obrigatório — sustentada por CISA/NIST.",
  },
  "como-escolher-uma-workstation": {
    slug: "como-escolher-uma-workstation",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-06",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Rodada 3O): critérios de levantamento de requisitos, sem configuração universal, sem benchmark, sem promessa de desempenho, sem nome de software no slug/H1/title e sem selo de homologação não publicado pelo fabricante. Conhecimento técnico estável — sem fonte visível.",
  },
  "como-resolver-tela-azul-windows": {
    slug: "como-resolver-tela-azul-windows",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-12",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Rodada 4Y): interpretação do código de parada como pista e não como diagnóstico fechado, ordem segura de verificação (alterações recentes, memória, disco, energia), aviso explícito de risco de perda de dados quando o disco está envolvido e nenhuma promessa de correção definitiva. Conhecimento técnico estável — sem fonte visível.",
  },
  "como-trocar-tela-notebook-passo-a-passo": {
    slug: "como-trocar-tela-notebook-passo-a-passo",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-12",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Rodada 4Y): identificação da tela pelo código do painel, distinção entre defeito de painel e de cabo/placa de vídeo, alerta de risco em telas coladas e touch, sem indicação de peça específica, sem preço de peça e sem promessa de compatibilidade universal. Conhecimento técnico estável — sem fonte visível.",
  },
  "como-limpar-notebook-por-dentro": {
    slug: "como-limpar-notebook-por-dentro",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-12",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 5D): distinção entre obstrução de aletas, rolamento gasto e lentidão lógica; alerta de desconexão da bateria interna antes de qualquer manuseio; recusa explícita de ar comprimido externo e aspirador; sem promessa numérica de queda de temperatura, sem indicação de marca e com aviso de garantia de fábrica. Conhecimento técnico estável — sem fonte visível.",
  },
  "como-trocar-pasta-termica-notebook": {
    slug: "como-trocar-pasta-termica-notebook",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-12",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 5D): critério para separar interface térmica de obstrução, ordem alternada de soltura/aperto do dissipador, preservação de almofadas térmicas, preferência por composto não condutivo, sem marca, sem quantidade em medida absoluta e sem promessa de resultado. Conhecimento técnico estável — sem fonte visível.",
  },
  "como-clonar-hd-para-ssd": {
    slug: "como-clonar-hd-para-ssd",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-12",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 5E): critério entre clonar e reinstalar, alerta de leitura integral em disco com setores defeituosos, exigência de backup independente, cópia de todas as partições e primeiro boot com disco único. Sem indicação de marca de software e sem promessa de ganho numérico. Conhecimento técnico estável — sem fonte visível.",
  },
  "como-instalar-segundo-ssd-notebook": {
    slug: "como-instalar-segundo-ssd-notebook",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-12",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 5E): verificação de slot M.2 livre, comprimento e chaveamento antes da compra; limites reais do caddy no lugar do leitor óptico; desconexão da bateria interna; inicialização do disco após a montagem. Sem marca e sem promessa de ganho de desempenho. Conhecimento técnico estável — sem fonte visível.",
  },
  "ransomware-como-proteger-empresa": {
    slug: "ransomware-como-proteger-empresa",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-12",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 5F): vetores de entrada em empresa pequena, motivo de o backup conectado ser criptografado junto, ordem de contenção nas primeiras horas e recomendação de não pagar resgate sem prometer recuperação. Sem marca de ferramenta e sem estatística não verificável. Conhecimento técnico estável — sem fonte visível.",
  },
  "backup-nuvem-empresas-qual-escolher": {
    slug: "backup-nuvem-empresas-qual-escolher",
    sources: ["cisa-backup", "nist-sp-800-34", "cisa-stop-ransomware"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-12",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 5F): distinção entre sincronização e backup, critérios de comparação (retenção, granularidade, escopo, imutabilidade, tempo de restauração), camadas de cópia e teste mensal de restauração. Reescrito sem citar marcas nem planos comerciais. Conhecimento técnico estável — sem fonte visível.",
  },
  "como-instalar-impressora-windows-passo-a-passo": {
    slug: "como-instalar-impressora-windows-passo-a-passo",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-12",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 5G): diferença entre instalação por cabo e por endereço de rede, causa real do sumiço (empréstimo de endereço), reserva no roteador, driver oficial, isolamento de clientes, rede de visitantes e limite de escopo (sem reparo mecânico/eletrônico). Sem marca comercial e sem promessa. Conhecimento técnico estável — sem fonte visível.",
  },
  "como-conectar-wifi-tv-nao-conecta": {
    slug: "como-conectar-wifi-tv-nao-conecta",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-12",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 5G): teste comparativo com celular no mesmo ponto, limitação de 2,4 GHz em TVs, isolamento de clientes/rede de visitantes, congestionamento de canal em prédio e critério para suspeitar do módulo Wi-Fi do aparelho. Sem estatística inventada e sem promessa de reparo. Conhecimento técnico estável — sem fonte visível.",
  },
  "como-testar-fonte-de-alimentacao-pc": {
    slug: "como-testar-fonte-de-alimentacao-pc",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-12",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 5H): modos de falha da fonte (não liga, tensão fora de faixa, queda sob carga, ruído), segurança com capacitores carregados, limite do teste de acionamento, medição em repouso × sob carga e substituição controlada como cruzamento. Sem marca comercial e sem promessa. Conhecimento técnico estável — sem fonte visível.",
  },
  "como-diagnosticar-placa-mae-defeituosa": {
    slug: "como-diagnosticar-placa-mae-defeituosa",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-12",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 5H): inspeção visual, montagem mínima, isolamento de módulo × slot, descarte prévio da fonte, leitura de códigos de estágio pelo manual do modelo e critério econômico entre reparo eletrônico e substituição de plataforma. Sem tabela genérica de bips e sem promessa de reparo. Conhecimento técnico estável — sem fonte visível.",
  },
  "windows-11-lento-como-resolver": {
    slug: "windows-11-lento-como-resolver",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-12",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 5I): classificação da lentidão por sintoma, leitura de saturação de disco/memória/CPU, limite de hardware (armazenamento mecânico e pouca RAM), throttling térmico, ajustes de software com efeito real e critério para reinstalação com backup verificado. Sem marca comercial e sem promessa de ganho percentual. Conhecimento técnico estável — sem fonte visível.",
  },
  "como-remover-virus-windows-iniciantes": {
    slug: "como-remover-virus-windows-iniciantes",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-12",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 5I): distinção entre adware/sequestro de navegador e malware, contenção antes da limpeza, ordem de remoção em camadas, causas de reinfecção (persistência, sincronização de perfil, origem ativa), proibição de pagamento de resgate e critério de reinstalação. Sem indicação de marca de ferramenta. Conhecimento técnico estável — sem fonte visível.",
  },
  "como-formatar-pc-sem-perder-arquivos": {
    slug: "como-formatar-pc-sem-perder-arquivos",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-14",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 8E): critério de quando reinstalar resolve e quando não resolve, backup verificado (abrir o arquivo no destino) como pré-requisito, chave de criptografia antes de qualquer formatação, diferença entre redefinir, reinstalar por cima e instalação limpa, vínculo de licença e ordem de drivers. Sem promessa de prazo, sem marca comercial e sem passo comercial disfarçado de tutorial. Conhecimento técnico estável — sem fonte visível.",
  },
  "quanto-custa-formatar-um-computador": {
    slug: "quanto-custa-formatar-um-computador",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-14",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 8E): todos os valores citados vêm da fonte única src/lib/precosConfig.ts (visita avulsa a partir de R$ 99,99 a cada 30 minutos, pacote de 2 horas R$ 279,99 e mínimo pré-aprovado de R$ 299,99 com coleta e entrega). Peças e licenças declaradas como não inclusas. Nenhum valor estimado, nenhuma média de mercado inventada e nenhuma comparação com concorrente.",
  },
  "computador-entra-direto-na-bios": {
    slug: "computador-entra-direto-na-bios",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-25",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 9C): papel do POST, ordem de verificação entre detecção do disco, modo de boot (UEFI/CSM), bateria CMOS e Fast Boot; comportamento de slots M.2 compartilhados com portas SATA; critério de parada quando há suspeita de falha física. Sem marca comercial, sem preço e sem promessa de resultado. Conhecimento técnico estável — sem fonte visível.",
  },
  "erro-no-bootable-device-como-resolver": {
    slug: "erro-no-bootable-device-como-resolver",
    sources: ["ms-bcdboot", "ms-bitlocker-recovery"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-02",
    notes:
      "Revisão material em 2026-09-02: removeu conclusões absolutas sobre saúde do disco e integridade da EFI, inseriu a verificação do BitLocker antes do prompt, explicou o limite de /scanos e retirou o bloco copiável de criação/formatação de partição EFI. BCDBoot e recuperação do BitLocker sustentados por fontes oficiais Microsoft visíveis.",
  },
  "troquei-o-ssd-e-o-pc-so-abre-a-bios": {
    slug: "troquei-o-ssd-e-o-pc-so-abre-a-bios",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-25",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 9C): disco novo sem tabela de partições, compatibilidade de chave/slot M.2 (SATA × NVMe), conflito de linhas PCIe e portas SATA, controlador em AHCI, instalação com apenas o disco novo conectado e critério entre instalar do zero e clonar. Conhecimento técnico estável — sem fonte visível.",
  },
  "limpar-arquivos-temporarios-windows": {
    slug: "limpar-arquivos-temporarios-windows",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-25",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 10C): papel do espaço livre no arquivo de paginação e na escrita em SSD, escopo real do Sensor de Armazenamento e da Limpeza de Disco, efeito de remover Windows.old e por que limpadores de registro e desfragmentação de SSD não são recomendados. Conhecimento técnico estável — sem fonte visível.",
  },
  "memoria-ram-insuficiente-sintomas": {
    slug: "memoria-ram-insuficiente-sintomas",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-25",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 10C): leitura correta dos campos Em uso, Confirmado e Em cache no Gerenciador de Tarefas, distinção entre falta de memória e gargalo de disco, critérios de compatibilidade (tipo, formato, slots, limite da placa, memória soldada) e ganho de dual channel. Conhecimento técnico estável — sem fonte visível.",
  },
  "codigos-de-erro-tela-azul-windows": {
    slug: "codigos-de-erro-tela-azul-windows",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-25",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 10C): significado das categorias MEMORY_MANAGEMENT, IRQL_NOT_LESS_OR_EQUAL, PAGE_FAULT_IN_NONPAGED_AREA, CRITICAL_PROCESS_DIED, DPC_WATCHDOG_VIOLATION, SYSTEM_SERVICE_EXCEPTION, INACCESSIBLE_BOOT_DEVICE e WHEA_UNCORRECTABLE_ERROR; localização dos registros em Visualizador de Eventos e minidumps. Sem promessa de resultado. Conhecimento técnico estável — sem fonte visível.",
  },
  "testar-memoria-ram-memtest86": {
    slug: "testar-memoria-ram-memtest86",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-25",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 10C): motivo de testar fora do sistema operacional, criação da mídia inicializável, número de passagens, critério de que um único erro já caracteriza defeito, isolamento entre módulo e slot e influência de perfis XMP/EXPO. Conhecimento técnico estável — sem fonte visível.",
  },
  "botao-power-nao-funciona-jump-start-placa-mae": {
    slug: "botao-power-nao-funciona-jump-start-placa-mae",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-26",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 10D): função do bloco F_PANEL/JFP1, ausência de polaridade no par PWR_SW, procedimento de encosto momentâneo entre os pinos, uso do par de reset como contorno e limites do teste em notebooks e all-in-one. Alertas de segurança sobre não abrir a fonte e sobre garantia. Conhecimento técnico estável — sem fonte visível.",
  },
  "curto-circuito-placa-mae-como-identificar": {
    slug: "curto-circuito-placa-mae-como-identificar",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-26",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 10D): atuação da proteção OCP/SCP da fonte no padrão de partida abortada, teste de bancada mínima fora do gabinete, isolamento incremental de periféricos, espaçadores metálicos como causa frequente e inviabilidade econômica do reparo em nível de componente. Conhecimento técnico estável — sem fonte visível.",
  },
  "bios-corrompida-reset-cmos-atualizacao": {
    slug: "bios-corrompida-reset-cmos-atualizacao",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-26",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 10D): distinção entre memória CMOS e firmware gravado em chip, vida útil típica da bateria CR2032, procedimento por jumper CLR_CMOS e por remoção de bateria, recursos de recuperação por USB e chip duplo e risco de chave de recuperação em disco criptografado. Conhecimento técnico estável — sem fonte visível.",
  },
  // ── Onda 10C — Lote 2 (internet/Wi-Fi e impressoras).
  "internet-lenta-provedor-ou-roteador": {
    slug: "internet-lenta-provedor-ou-roteador",
    sources: [
      "fcc-home-network-tips",
      "fcc-speed-test-app-faq",
      "wifi-alliance-home",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-08",
    notes:
      "Revisão material em 2026-09-08 com fontes oficiais visíveis: protocolo de triagem por cabo × Wi-Fi perto × Wi-Fi longe, validação do limite físico do enlace, leitura separada de download, upload, latência, jitter e perda e critérios objetivos para registrar o chamado. Sem estatística inventada, limiar universal ou promessa de velocidade.",
  },
  "impressora-offline-como-resolver": {
    slug: "impressora-offline-como-resolver",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-26",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 10C, Lote 2): significado real do status offline, empréstimo de endereço com prazo, conferência entre página de configuração do aparelho e porta cadastrada, reserva no roteador, isolamento de clientes/rede de visitantes e distinção frente a falha mecânica. Sem marca comercial e sem promessa. Conhecimento técnico estável — sem fonte visível.",
  },
  "fila-de-impressao-travada-spooler-windows": {
    slug: "fila-de-impressao-travada-spooler-windows",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-26",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 10C, Lote 2): papel do serviço de spooler, causa dos trabalhos corrompidos, procedimento de parada do serviço e limpeza da pasta de trabalhos, ressalva de ambiente gerenciado e critério para suspeitar do driver. Sem marca comercial e sem promessa. Conhecimento técnico estável — sem fonte visível.",
  },
  "hd-nao-e-reconhecido-na-bios-o-que-fazer": {
    slug: "hd-nao-e-reconhecido-na-bios-o-que-fazer",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-26",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 10C, Lote 3): separação entre alimentação, enlace de dados e defeito da mídia; reassentamento, troca de cabo e porta, compartilhamento de faixas entre M.2 e SATA e ressalva explícita de não escrever em disco com ruído ou dados sem cópia. Sem marca comercial e sem promessa. Conhecimento técnico estável — sem fonte visível.",
  },
  "ssd-nvme-nao-aparece-no-gerenciador-de-discos": {
    slug: "ssd-nvme-nao-aparece-no-gerenciador-de-discos",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-26",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 10C, Lote 3): estados reais do Gerenciamento de Disco (não inicializado, não alocado, sem letra, RAW, off-line), escolha entre GPT e MBR, modos do slot M.2 e alerta de que formatar destrói dados recuperáveis. Sem marca comercial e sem promessa. Conhecimento técnico estável — sem fonte visível.",
  },
  "disco-com-setores-defeituosos-smart-o-que-fazer": {
    slug: "disco-com-setores-defeituosos-smart-o-que-fazer",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-26",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 10C, Lote 3): leitura de contadores SMART por tendência, ordem copiar → investigar → substituir, imagem bit a bit e regra explícita de que CHKDSK não é recomendação padrão em mídia com ruído, SMART crítico, desconexões ou dados importantes. Sem marca comercial e sem promessa. Conhecimento técnico estável — sem fonte visível.",
  },
  "computador-sem-som-o-que-verificar": {
    slug: "computador-sem-som-o-que-verificar",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-26",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 10C, Lote 3): ordem de verificação de saída padrão, mixer por aplicativo, conector físico, serviço de áudio e driver; distinção entre falha de software e hardware. Sem marca comercial e sem promessa. Conhecimento técnico estável — sem fonte visível.",
  },
  "fone-de-ouvido-nao-e-reconhecido-no-pc": {
    slug: "fone-de-ouvido-nao-e-reconhecido-no-pc",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-26",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 10C, Lote 3): detecção de conector, cabo interno do painel frontal, diferença entre plugue combinado e entradas separadas, perfis Bluetooth estéreo e de comunicação e permissões de microfone. Sem marca comercial e sem promessa. Conhecimento técnico estável — sem fonte visível.",
  },
  "servico-de-audio-do-windows-nao-esta-em-execucao": {
    slug: "servico-de-audio-do-windows-nao-esta-em-execucao",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-26",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 10C, Lote 3): cadeia Windows Audio e Construtor de Ponto de Extremidade, ordem de reinício, dependências de RPC e agendador multimídia, ressalva de máquina gerenciada por política e critério para reinstalar driver oficial. Sem marca comercial e sem promessa. Conhecimento técnico estável — sem fonte visível.",
  },
  "webcam-nao-funciona-o-que-verificar": {
    slug: "webcam-nao-funciona-o-que-verificar",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-26",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 10C, Lote 4): cadeia sensor→conexão→driver→permissão→aplicativo, teste cruzado pelo aplicativo Câmera, ressalva de que obturador, tecla de função e opção de Setup não são universais e critério para suspeitar de cabo/módulo. Sem marca comercial e sem promessa. Conhecimento técnico estável — sem fonte visível.",
  },
  "permissoes-de-camera-no-windows": {
    slug: "permissoes-de-camera-no-windows",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-26",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 10C, Lote 4): quatro camadas independentes de permissão (dispositivo, aplicativos, aplicativo individual e aplicativos de área de trabalho), permissão por site no navegador, impacto de privacidade explicado e ressalva de máquina gerenciada por política. Sem marca comercial e sem promessa. Conhecimento técnico estável — sem fonte visível.",
  },
  "webcam-usb-nao-e-detectada": {
    slug: "webcam-usb-nao-e-detectada",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-26",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 10C, Lote 4): eliminação por porta/hub/cabo, consumo e banda em USB 2 e 3, leitura do Gerenciador de Dispositivos, teste cruzado em outro computador e recusa explícita de agregadores de driver. Sem marca comercial e sem promessa. Conhecimento técnico estável — sem fonte visível.",
  },
  "windows-update-nao-funciona-o-que-verificar": {
    slug: "windows-update-nao-funciona-o-que-verificar",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-26",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 10C, Lote 4): estágios de verificação, download, preparação, instalação e reversão; triagem antes de comandos; diferença entre verificação de arquivos do sistema e reparo da imagem de componentes; proibição de desabilitar serviços do Update. Sem marca comercial e sem promessa. Conhecimento técnico estável — sem fonte visível.",
  },
  "limpar-cache-do-windows-update-softwaredistribution": {
    slug: "limpar-cache-do-windows-update-softwaredistribution",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-26",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 10C, Lote 4): função da pasta, procedimento reversível por renomeação, custo real (histórico e novo download), casos em que o tratamento não ajuda e recusa de scripts de reset de terceiros. Sem marca comercial e sem promessa. Conhecimento técnico estável — sem fonte visível.",
  },
  "windows-update-travado-desfazendo-alteracoes": {
    slug: "windows-update-travado-desfazendo-alteracoes",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-26",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 10C, Lote 4): distinção entre interface parada e processo parado, reversão como mecanismo de proteção, causas comuns, códigos de erro sem causa única e critério de parada com criptografia de disco. Sem marca comercial e sem promessa. Conhecimento técnico estável — sem fonte visível.",
  },
  "boot-uefi-ou-legacy-como-identificar": {
    slug: "boot-uefi-ou-legacy-como-identificar",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-31",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 11A, Lote 4): identificação do modo de inicialização por msinfo32, diskpart e Gerenciamento de Disco; relação entre GPT/UEFI e MBR/Legacy; ressalva de que trocar o modo sem converter a partição impede o boot. Sem marca comercial e sem promessa. Conhecimento técnico estável — sem fonte visível.",
  },
  "ordem-de-boot-na-bios-como-configurar": {
    slug: "ordem-de-boot-na-bios-como-configurar",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-31",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 11A, Lote 4): diferença entre menu temporário de boot e alteração permanente da prioridade, efeito de Secure Boot e CSM, e recomendação explícita de anotar a configuração original antes de alterar. Sem marca comercial e sem promessa. Conhecimento técnico estável — sem fonte visível.",
  },
  "windows-reparo-automatico-em-loop": {
    slug: "windows-reparo-automatico-em-loop",
    sources: [
      "ms-windows-recovery-environment",
      "ms-recovery-options-windows",
      "ms-bitlocker-recovery",
      "ms-bcdboot",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-10",
    notes:
      "Revisão aprofundada em 2026-09-10: sequência do Windows RE da opção menos disruptiva à mais disruptiva, backup e chave BitLocker antes de intervenção, limites explícitos para comandos de boot e critérios de parada diante de possível falha física. Fontes Microsoft visíveis, sem promessa de resultado.",
  },
  "manutencao-preventiva-de-computador-guia-completo": {
    slug: "manutencao-preventiva-de-computador-guia-completo",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-03",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 11C): calendário de verificação por frequência, prioridade ao armazenamento e ao teste de restauração, proibição de troca de pasta térmica por rotina e ressalva sobre garantia ao abrir o equipamento. Sem marca comercial, sem promessa de prazo. Conhecimento técnico estável — sem fonte visível.",
  },
  "dispositivo-usb-nao-reconhecido-o-que-fazer": {
    slug: "dispositivo-usb-nao-reconhecido-o-que-fazer",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-03",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 11C): sequência de isolamento porta/cabo/dispositivo/alimentação, explicação da enumeração USB, alerta contra desinstalar controladores em série e parada obrigatória em disco externo com dados sem cópia. Conhecimento técnico estável — sem fonte visível.",
  },
  "como-testar-restauracao-de-backup": {
    slug: "como-testar-restauracao-de-backup",
    sources: ["cisa-backup", "nist-sp-800-34", "cisa-stop-ransomware"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-09",
    notes:
      "Revisão material em 2026-09-09 com fontes primárias visíveis: escopo e critérios de aprovação definidos antes do teste, restauração em destino separado, amostragem representativa, registro de ponto e tempo de recuperação e cadência orientada a impacto e mudanças. Sem produto, fornecedor ou frequência universal.",
  },
  "como-monitorar-temperatura-do-computador": {
    slug: "como-monitorar-temperatura-do-computador",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-03",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 11D): método de medição em repouso e sob carga com registro da temperatura ambiente, leitura de redução de frequência por calor, causas físicas mais frequentes e proibição de desativar proteção térmica. Sem número absoluto apresentado como limite universal. Conhecimento técnico estável — sem fonte visível.",
  },
  "pendrive-somente-leitura-protegido-contra-gravacao": {
    slug: "pendrive-somente-leitura-protegido-contra-gravacao",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-03",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 11D): quatro origens do estado somente leitura, sequência de isolamento com cópia dos dados antes de qualquer correção, limite real da formatação e parada obrigatória diante de sinais de falha de controlador. Sem indicar utilitário de terceiros. Conhecimento técnico estável — sem fonte visível.",
  },
  "historico-de-arquivos-windows-como-configurar": {
    slug: "historico-de-arquivos-windows-como-configurar",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-03",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 11D): escopo real do versionamento nativo (pastas de usuário, não sistema), destino em disco físico separado, dimensionamento e retenção, diferença entre versionar e sincronizar e teste de restauração como etapa final. Conhecimento técnico estável — sem fonte visível.",
  },
  "monitor-sem-sinal-o-que-verificar": {
    slug: "monitor-sem-sinal-o-que-verificar",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-03",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 11E): separação entre monitor vivo (exibe o próprio menu), caminho do vídeo e computador que não inicia; sequência de eliminação com entrada, cabo, saída dedicada versus integrada e teste cruzado; alerta de carga residual na fonte do monitor. Conhecimento técnico estável — sem fonte visível.",
  },
  "bateria-de-notebook-nao-carrega-o-que-verificar": {
    slug: "bateria-de-notebook-nao-carrega-o-que-verificar",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-03",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 11E): quatro cenários distintos de falha de carga, verificação de fonte e conector antes da bateria, leitura da capacidade atual contra a de projeto, limite de carga do fabricante como comportamento normal e parada obrigatória diante de célula estufada. Sem indicar marca de bateria. Conhecimento técnico estável — sem fonte visível.",
  },
  "como-migrar-arquivos-para-um-computador-novo": {
    slug: "como-migrar-arquivos-para-um-computador-novo",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-03",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 11E): inventário do que costuma ficar de fora, comparação objetiva entre métodos de transferência, conferência por quantidade e tamanho antes do descarte, retenção temporária do equipamento antigo e limpeza completa da unidade antes de venda ou doação. Conhecimento técnico estável — sem fonte visível.",
  },
  "teclado-de-notebook-nao-funciona-o-que-verificar": {
    slug: "teclado-de-notebook-nao-funciona-o-que-verificar",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-03",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 11F): teste do teclado externo como divisor entre hardware interno e sistema, quatro sintomas com causas distintas, verificação de layout antes de suspeitar de peça, conduta específica para derramamento de líquido e limite claro de desmontagem. Conhecimento técnico estável — sem fonte visível.",
  },
  "computador-desliga-sozinho-o-que-verificar": {
    slug: "computador-desliga-sozinho-o-que-verificar",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-03",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 11F): distinção entre travamento e corte de energia, leitura do padrão temporal, eliminação do ponto elétrico antes da fonte, medição de temperatura comparada e proibição de desativar proteção térmica. Conhecimento técnico estável — sem fonte visível.",
  },
  "computador-nao-conecta-na-internet-por-cabo": {
    slug: "computador-nao-conecta-na-internet-por-cabo",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-03",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 11F): separação entre ausência de enlace e ausência de navegação pela leitura das luzes, teste cruzado de cabo, porta e equipamento, uso do Wi-Fi do mesmo roteador para isolar o provedor e limite para cabeamento estruturado. Conhecimento técnico estável — sem fonte visível.",
  },
  "ventoinha-do-computador-fazendo-barulho-o-que-verificar": {
    slug: "ventoinha-do-computador-fazendo-barulho-o-que-verificar",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-03",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 11G): classificação do ruído por tipo de som, relação entre rotação e temperatura, verificação de obstrução e fixação antes de trocar peça, e proibição de travar ou desconectar ventoinha para silenciar. Conhecimento técnico estável — sem fonte visível.",
  },
  "rede-wifi-nao-aparece-na-lista-o-que-verificar": {
    slug: "rede-wifi-nao-aparece-na-lista-o-que-verificar",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-03",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 11G): separação entre nenhuma rede visível e uma rede específica invisível, papel da banda de 5 GHz e do canal, SSID oculto, teste cruzado com outro dispositivo e limite entre configuração e defeito de adaptador. Conhecimento técnico estável — sem fonte visível.",
  },
  "arquivo-corrompido-nao-abre-o-que-fazer": {
    slug: "arquivo-corrompido-nao-abre-o-que-fazer",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-03",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Onda 11G): trabalho sempre sobre cópia, distinção entre arquivo corrompido e programa incompatível, leitura de sinais de mídia em falha, recuperação por versões anteriores e limite claro para tentativa em disco com defeito. Conhecimento técnico estável — sem fonte visível.",
  },
};



/** Retorna a fonte tipada por id (ou undefined). */
export function getSource(id: string): EditorialSource | undefined {
  return EDITORIAL_SOURCES[id];
}

/** Fontes resolvidas de um artigo, na ordem declarada. */
export function getArticleSources(slug: string): EditorialSource[] {
  const manifest = ARTICLE_SOURCE_MANIFEST[slug];
  if (!manifest) return [];
  return manifest.sources
    .map((id) => EDITORIAL_SOURCES[id])
    .filter((s): s is EditorialSource => Boolean(s));
}

/** Status técnico de um slug (padrão: "pending"). */
export function getTechnicalReviewStatus(slug: string): TechnicalReviewStatus {
  return ARTICLE_SOURCE_MANIFEST[slug]?.technicalReview ?? "pending";
}

export default ARTICLE_SOURCE_MANIFEST;
