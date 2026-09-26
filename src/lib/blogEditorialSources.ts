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
  "pages.nist.gov",
  "wi-fi.org",
  "www.wi-fi.org",
  "support.google.com",
  "nvmexpress.org",
  "www.nvmexpress.org",
  "fcc.gov",
  "www.fcc.gov",
  "memtest.org",
  "www.memtest.org",
  "docs.netgate.com",
  "www.tp-link.com",
  "ubuntu.com",
  "samba.org",
  "www.samba.org",
  "www.wireguard.com",
  "wireguard.com",
  "openvpn.net",
  "www.kingston.com",
  "nsa.gov",
  "www.nsa.gov",
] as const;

// ─────────────────────────────────────────────────────────────
// FONTES CONSULTADAS (URLs confirmadas em 2026-07-12).
// ─────────────────────────────────────────────────────────────
export const EDITORIAL_SOURCES: Record<string, EditorialSource> = {
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
  "memtest86plus-readme": {
    id: "memtest86plus-readme",
    title: "Memtest86+ — README and troubleshooting",
    publisher: "Memtest86+ Project",
    url: "https://memtest.org/readme",
    accessedAt: "2026-09-13",
    sourceType: "official",
    supports: [
      "O Memtest86+ é um testador independente do sistema operacional, compatível com inicialização BIOS e UEFI.",
      "Os erros observados durante o teste podem envolver memória, processador, caches ou placa-mãe; o programa não determina sozinho a peça causadora.",
    ],
  },
  "memtest86plus-official": {
    id: "memtest86plus-official",
    title: "Memtest86+ — The Open-Source Memory Testing Tool",
    publisher: "Memtest86+ Project",
    url: "https://memtest.org/",
    accessedAt: "2026-09-13",
    sourceType: "official",
    supports: [
      "O Memtest86+ é gratuito, de código aberto e executado de forma independente para testar memória em arquiteturas compatíveis.",
      "Memtest86+ e o produto MemTest86 da PassMark são projetos diferentes.",
    ],
  },
  "ms-fix-ethernet-windows": {
    id: "ms-fix-ethernet-windows",
    title: "Fix Ethernet connection problems in Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-ethernet-connection-problems-in-windows",
    accessedAt: "2026-09-14",
    sourceType: "official",
    supports: [
      "O diagnóstico deve começar pelo encaixe, por outro cabo e por outra porta; a Redefinição de Rede fica como etapa final.",
      "A Redefinição de Rede remove e reinstala adaptadores e pode exigir reconfiguração de VPNs e software de rede.",
    ],
  },
  "ms-ipconfig": {
    id: "ms-ipconfig",
    title: "ipconfig",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ipconfig",
    accessedAt: "2026-09-14",
    sourceType: "official",
    supports: [
      "Sem parâmetros modificadores, ipconfig exibe IPv4, IPv6, máscara e gateway; /all amplia os dados de configuração dos adaptadores.",
    ],
  },
  "ms-ping": {
    id: "ms-ping",
    title: "ping",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ping",
    accessedAt: "2026-09-14",
    sourceType: "official",
    supports: [
      "O comando ping envia solicitações ICMP Echo e ajuda a verificar conectividade IP; ausência de resposta também pode decorrer de filtragem.",
    ],
  },
  "ms-nslookup": {
    id: "ms-nslookup",
    title: "nslookup",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/nslookup",
    accessedAt: "2026-09-14",
    sourceType: "official",
    supports: [
      "O nslookup exibe informações usadas para diagnosticar a infraestrutura DNS e consulta o servidor padrão quando outro não é informado.",
    ],
  },
  "cisa-require-mfa": {
    id: "cisa-require-mfa",
    title: "Require Multifactor Authentication",
    publisher: "CISA",
    url: "https://www.cisa.gov/audiences/small-and-medium-businesses/secure-your-business/require-multifactor-authentication",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "MFA adiciona uma camada além da senha e deve ser exigida em contas críticas, especialmente acesso remoto e privilegiado.",
      "Métodos de MFA têm níveis diferentes de resistência; métodos resistentes a phishing devem ser priorizados quando disponíveis.",
      "SMS e e-mail são alternativas mais fracas quando métodos mais fortes não estão disponíveis.",
    ],
  },
  "nist-800-63b-authenticators": {
    id: "nist-800-63b-authenticators",
    title: "SP 800-63B — Authenticators",
    publisher: "NIST",
    url: "https://pages.nist.gov/800-63-4/sp800-63b/authenticators/",
    accessedAt: "2026-09-25",
    sourceType: "standard",
    supports: [
      "Autenticação resistente a phishing depende de mecanismos criptográficos vinculados à sessão/verificador.",
      "Códigos inseridos manualmente, como OTP, não são considerados resistentes a phishing porque podem ser retransmitidos por um impostor.",
    ],
  },
  "cisa-secure-wifi-networks": {
    id: "cisa-secure-wifi-networks",
    title: "A Guide to Securing Networks for Wi-Fi",
    publisher: "CISA",
    url: "https://www.cisa.gov/sites/default/files/publications/A_Guide_to_Securing_Networks_for_Wi-Fi.pdf",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "Redes Wi-Fi devem usar controles em camadas para reduzir ameaças sem fio.",
      "A segurança da WLAN depende de configuração, autenticação, criptografia, segmentação e gestão, não apenas do nome ou ocultação do SSID.",
    ],
  },
  "netgate-pfsense-docs": {
    id: "netgate-pfsense-docs",
    title: "pfSense Documentation",
    publisher: "Netgate",
    url: "https://docs.netgate.com/pfsense/en/latest/",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "A documentação oficial organiza pfSense em instalação, interfaces, firewall, NAT, VLANs, VPN, autenticação, logs e recuperação.",
    ],
  },
  "netgate-pfsense-firewall": {
    id: "netgate-pfsense-firewall",
    title: "Firewall",
    publisher: "Netgate",
    url: "https://docs.netgate.com/pfsense/en/latest/firewall/index.html",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "Regras de firewall controlam o tráfego permitido ou bloqueado e devem ser desenhadas conforme origem, destino, protocolo e intenção.",
    ],
  },
  "netgate-pfsense-backup": {
    id: "netgate-pfsense-backup",
    title: "Backup and Recovery",
    publisher: "Netgate",
    url: "https://docs.netgate.com/pfsense/en/latest/backup/index.html",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "A configuração do pfSense deve ser copiada com frequência, armazenada com segurança e ter processo de restauração conhecido.",
      "O arquivo de configuração concentra a maior parte do estado necessário para reconstrução do firewall.",
    ],
  },
  "ms-ad-ds-overview": {
    id: "ms-ad-ds-overview",
    title: "Active Directory Domain Services overview",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/active-directory-domain-services",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "AD DS organiza de forma hierárquica objetos de rede como usuários e computadores e disponibiliza esses dados a administradores e usuários autorizados.",
    ],
  },
  "ms-ad-ds-dns": {
    id: "ms-ad-ds-dns",
    title: "DNS and AD DS",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/dns-and-ad-ds",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "AD DS usa DNS para clientes localizarem controladores de domínio e para a comunicação entre controladores.",
      "Zonas DNS integradas ao Active Directory simplificam replicação de dados DNS no ambiente de domínio.",
    ],
  },
  "ms-ad-ds-security": {
    id: "ms-ad-ds-security",
    title: "Best practices for securing Active Directory",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/best-practices-for-securing-active-directory",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "Segurança de AD DS exige reduzir superfície de ataque, proteger controladores, aplicar privilégio mínimo, monitorar e planejar recuperação de comprometimento.",
    ],
  },

  "tplink-onemesh-wps": {
    id: "tplink-onemesh-wps",
    title: "Como configurar o extensor de alcance OneMesh através do botão WPS",
    publisher: "TP-Link Brasil",
    url: "https://www.tp-link.com/br/support/faq/2508/",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "Em modelos compatíveis, a configuração WPS começa com o extensor próximo ao roteador e exige acionar WPS nos dois equipamentos dentro da janela indicada.",
      "O procedimento depende de modelo e revisão de hardware; a página de suporte do produto deve ser consultada.",
    ],
  },
  "ubuntu-try-desktop": {
    id: "ubuntu-try-desktop",
    title: "Try Ubuntu Desktop",
    publisher: "Ubuntu",
    url: "https://ubuntu.com/desktop/docs/en/26.04/tutorial/try-ubuntu-desktop/",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "Ubuntu Desktop pode ser executado a partir de USB em modo de teste sem fazer alterações permanentes no computador.",
      "O modo de teste permite verificar o funcionamento do hardware antes da instalação.",
    ],
  },
  "ubuntu-install-desktop": {
    id: "ubuntu-install-desktop",
    title: "Install Ubuntu Desktop",
    publisher: "Ubuntu",
    url: "https://ubuntu.com/desktop/docs/en/26.04/tutorial/install-ubuntu-desktop/",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "A documentação recomenda backup dos dados antes da instalação e oferece instalação ao lado de outro sistema quando o cenário é compatível.",
      "BitLocker ativo pode impedir que o instalador manipule com segurança a instalação Windows no mesmo disco até que a situação seja tratada.",
    ],
  },
  "kingston-memory-support": {
    id: "kingston-memory-support",
    title: "Memória de Desktop/Notebook — Suporte",
    publisher: "Kingston Technology",
    url: "https://www.kingston.com/br/support/technical/products/desktop-notebook-memory",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "Compatibilidade de memória depende de plataforma, densidade dos chips, organização dos módulos e suporte de BIOS, não apenas da geração DDR.",
      "O fabricante recomenda consultar compatibilidade do sistema e atualizar BIOS quando necessário para suportar módulos mais novos.",
    ],
  },
  "kingston-ssd-faq": {
    id: "kingston-ssd-faq",
    title: "Perguntas frequentes sobre SSDs SATA, NVMe e M.2",
    publisher: "Kingston Technology",
    url: "https://www.kingston.com/br/ssd/ssd-faq",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "M.2 é um formato que pode transportar SATA ou PCIe; SSD M.2 SATA e M.2 PCIe/NVMe não são automaticamente intercambiáveis.",
      "Alguns slots M.2 compartilham lanes/portas e podem desabilitar outros dispositivos conforme a placa-mãe.",
    ],
  },
  "wireguard-quickstart": {
    id: "wireguard-quickstart",
    title: "WireGuard Quick Start",
    publisher: "WireGuard",
    url: "https://www.wireguard.com/quickstart/",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "WireGuard configura interfaces, pares, chaves, endpoints e AllowedIPs; AllowedIPs participa da associação/roteamento do tráfego entre peers.",
    ],
  },
  "openvpn-community-docs": {
    id: "openvpn-community-docs",
    title: "OpenVPN Community Documentation",
    publisher: "OpenVPN",
    url: "https://openvpn.net/community-docs/",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "A documentação oficial do projeto cobre configuração, roteamento, segurança, gerenciamento e troubleshooting do OpenVPN.",
    ],
  },
  "google-account-compromised": {
    id: "google-account-compromised",
    title: "Proteger uma Conta do Google invadida ou comprometida",
    publisher: "Google Account Help",
    url: "https://support.google.com/accounts/answer/6294825?hl=pt",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "Quando há atividade desconhecida, o Google orienta usar a recuperação oficial, revisar atividade e dispositivos e reforçar a segurança da conta.",
      "Se não for possível entrar, o fluxo oficial de recuperação deve ser usado para retomar o acesso.",
    ],
  },
  "microsoft-account-compromised": {
    id: "microsoft-account-compromised",
    title: "Como recuperar uma conta Microsoft invadida ou comprometida",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/accounts-billing/manage/how-to-recover-a-hacked-or-compromised-microsoft-account",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "A Microsoft orienta verificar malware antes de confiar uma nova senha ao dispositivo, alterar ou redefinir a senha e revisar configurações da conta.",
    ],
  },

  "ms-pc-performance": {
    id: "ms-pc-performance",
    title: "Dicas para melhorar o desempenho do PC no Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/windows/experience/performance-optimization/tips-to-improve-pc-performance-in-windows",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "Atualizações, espaço de armazenamento, aplicativos de inicialização e observação de recursos são etapas documentadas de diagnóstico de desempenho.",
      "Hardware antigo pode limitar o ganho obtido apenas com otimizações de software.",
    ],
  },
  "ms-startup-apps": {
    id: "ms-startup-apps",
    title: "Configurar aplicações de Arranque no Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/windows/experience/startup-boot/configure-startup-applications-in-windows",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "Aplicativos que iniciam automaticamente podem afetar tempo de inicialização e atividade do sistema.",
    ],
  },
  "ms-file-history": {
    id: "ms-file-history",
    title: "Fazer backup e restaurar com o Histórico de Arquivos",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/windows/experience/backup-recovery/backup-and-restore-with-file-history",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "O Histórico de Arquivos mantém cópias de arquivos pessoais e permite restaurar versões anteriores quando previamente configurado.",
    ],
  },
  "ms-windows-update-troubleshoot": {
    id: "ms-windows-update-troubleshoot",
    title: "Solução de problemas do Windows Update",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/windows/solu%C3%A7%C3%A3o-de-problemas-do-windows-update-19bc41ca-ad72-ae67-af3c-89ce169755dd",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "No Windows 11, a Microsoft orienta começar a investigação de falhas de atualização pelo solucionador do Windows Update no aplicativo Obter Ajuda.",
    ],
  },
  "ms-windows-file-recovery": {
    id: "ms-windows-file-recovery",
    title: "Recuperação de arquivos do Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/windows/experience/backup-recovery/windows-file-recovery",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "Windows File Recovery pode tentar recuperar arquivos apagados de armazenamento local quando não estão disponíveis na Lixeira ou em backup.",
      "Minimizar o uso do computador após a exclusão pode aumentar a chance de recuperação.",
    ],
  },

  "ms-password-reset-windows": {
    id: "ms-password-reset-windows",
    title: "Altere ou redefina a senha da sua conta Microsoft no Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/accounts-billing/security/change-or-reset-your-microsoft-account-password-in-windows",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "A recuperação de uma conta Microsoft pode ser iniciada pela tela de entrada do Windows ou pelo fluxo oficial de redefinição.",
      "Uma conta local pode oferecer Redefinir senha com perguntas de segurança configuradas anteriormente.",
      "O suporte da Microsoft não recupera nem contorna uma senha esquecida.",
    ],
  },
  "ms-local-password-reset-disk": {
    id: "ms-local-password-reset-disk",
    title: "Criar um disco de redefinição de senha para uma conta local no Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/windows/security/identity-signin/create-a-password-reset-disk-for-a-local-account-in-windows",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "O disco de redefinição é uma medida preventiva para contas locais e precisa ser criado enquanto a conta está acessível.",
    ],
  },
  "ms-file-explorer-windows": {
    id: "ms-file-explorer-windows",
    title: "Explorador de Arquivos no Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/windows/experience/fileexplorer/file-explorer-in-windows",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "O Explorador de Arquivos gerencia arquivos e pastas locais e de nuvem e permite fixar pastas no Acesso Rápido.",
    ],
  },
  "ms-find-files-windows": {
    id: "ms-find-files-windows",
    title: "Localizar seus arquivos e aplicativos no Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/windows/experience/storage-filemanagement/find-your-files-and-apps-in-windows",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "A Pesquisa do Windows e a pesquisa do Explorador podem localizar documentos no computador e no OneDrive.",
    ],
  },
  "ms-onedrive-folder-backup": {
    id: "ms-onedrive-folder-backup",
    title: "Fazer backup de suas pastas com o OneDrive",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-BR/onedrive/back-up-your-folders-with-onedrive",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "O OneDrive pode proteger e sincronizar pastas conhecidas do Windows, incluindo Área de Trabalho, Documentos e Imagens.",
      "Parar o backup de uma pasta exige decidir onde os arquivos permanecerão e pode exigir baixar itens somente online.",
    ],
  },
  "nsa-router-hygiene-2026": {
    id: "nsa-router-hygiene-2026",
    title: "Improve Router Hygiene to Protect Against Russian State-Sponsored Targeting",
    publisher: "National Security Agency",
    url: "https://www.nsa.gov/Press-Room/Press-Releases-Statements/Press-Release-View/Article/4541059/nsa-and-partners-release-guidance-on-improving-router-hygiene-to-protect-agains/",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "Roteadores devem usar senhas fortes e exclusivas e manter imagens de software/firmware atualizadas.",
    ],
  },

  "ms-secure-boot-windows11-2026": {
    id: "ms-secure-boot-windows11-2026",
    title: "Windows 11 and Secure Boot",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/en-us/windows/security/devicesecurity/windows-11-and-secure-boot",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "Secure Boot ajuda a impedir software malicioso no processo de inicialização.",
      "O Windows oferece acesso às Configurações de Firmware UEFI pela Inicialização avançada.",
      "A Microsoft recomenda reabilitar Secure Boot após uma desativação temporária necessária.",
    ],
  },
  "ms-enable-tpm2-2026": {
    id: "ms-enable-tpm2-2026",
    title: "Enable TPM 2.0 on your PC",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/en-us/windows/security/devicesecurity/enable-tpm-2-0-on-your-pc",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "TPM 2.0 é requisito do Windows 11 e pode aparecer no firmware com rótulos como Intel PTT ou AMD fTPM.",
      "A localização e o nome da configuração variam conforme fabricante e dispositivo.",
    ],
  },
  "ms-smb-overview-2026": {
    id: "ms-smb-overview-2026",
    title: "What is SMB File Sharing for Windows and Windows Server?",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/windows-server/storage/file-server/file-server-smb-overview",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "Windows cliente e Windows Server incluem componentes cliente e servidor SMB.",
      "Recursos de SMB variam conforme sistema e versão.",
    ],
  },
  "ms-smb-hardening-2026": {
    id: "ms-smb-hardening-2026",
    title: "SMB security hardening in Windows Server and Windows Client",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/windows-server/storage/file-server/smb-security-hardening",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: ["Versões recentes do Windows reforçam assinatura, autenticação e outros controles de segurança do SMB."],
  },
  "ms-smb-secure-traffic-2026": {
    id: "ms-smb-secure-traffic-2026",
    title: "Secure SMB Traffic in Windows Server",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/windows-server/storage/file-server/smb-secure-traffic",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: ["A Microsoft recomenda bloquear TCP 445 na borda da internet e usar segmentação como defesa em profundidade."],
  },
  "samba-smb-conf-current-2026": {
    id: "samba-smb-conf-current-2026",
    title: "smb.conf — Samba current documentation",
    publisher: "Samba",
    url: "https://www.samba.org/samba/docs/current/man-html/smb.conf.5",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "guest ok = yes permite acesso ao serviço sem senha e o padrão é guest ok = no.",
      "valid users limita quais usuários podem entrar no serviço.",
    ],
  },
  "ubuntu-ufw-firewall-2026": {
    id: "ubuntu-ufw-firewall-2026",
    title: "Firewall — Ubuntu Server documentation",
    publisher: "Ubuntu",
    url: "https://ubuntu.com/server/docs/how-to/security/firewalls/",
    accessedAt: "2026-09-25",
    sourceType: "official",
    supports: [
      "UFW é a ferramenta padrão do Ubuntu para firewall de host e começa desabilitada por padrão.",
      "A documentação cobre enable, allow, deny, status numbered, delete, regras por origem, --dry-run, perfis de aplicação e logging.",
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
  "pc-nao-liga-o-que-fazer": {
    slug: "pc-nao-liga-o-que-fazer",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-26",
    stableKnowledge: true,
    notes:
      "Revisão material concluída após reescrita: separa ausência de energia, POST/vídeo e boot; remove ponte com clipe na fonte, reset de CMOS como receita genérica, abrasivos e troca de peça por tentativa. Sem percentual de causa, sem diagnóstico fechado e com critérios claros de parada.",
  },
  "wifi-caindo-toda-hora": {
    slug: "wifi-caindo-toda-hora",
    sources: ["fcc-home-network-tips", "wifi-alliance-home"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-26",
    notes:
      "Revisão material concluída: separa dispositivo, WLAN, roteador/modem e provedor; remove limite universal de conexões e canal obrigatório. FCC sustenta a distinção entre desempenho da rede doméstica e banda larga; Wi-Fi Alliance sustenta cobertura com múltiplos pontos.",
  },
  "como-fazer-backup-na-nuvem": {
    slug: "como-fazer-backup-na-nuvem",
    sources: ["cisa-backup", "nist-sp-800-34"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-26",
    notes:
      "Revisão material concluída: remove franquias, preços e ranking de fornecedores; diferencia sincronização de backup, exige cópia independente e teste de restauração, e trata 3-2-1 como referência de redundância, não regra mágica.",
  },
  "como-recuperar-arquivos-apagados": {
    slug: "como-recuperar-arquivos-apagados",
    sources: ["ms-windows-file-recovery", "ms-file-history"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-26",
    notes:
      "Revisão material concluída: prioriza não sobrescrever a origem, procura versões/backups antes de varredura, exige destino diferente na recuperação e remove lista promocional de ferramentas e absolutos sobre TRIM/SSD.",
  },
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
    sources: ["memtest86plus-readme", "memtest86plus-official"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-13",
    notes:
      "Revisão aprofundada em 2026-09-13: separação entre detecção de erro e identificação da peça, linha de base sem XMP/EXPO, isolamento controlado entre módulo e slot, limites de um resultado sem erros e fontes oficiais visíveis do Memtest86+.",
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
    sources: ["ms-fix-ethernet-windows", "ms-ipconfig", "ms-ping", "ms-nslookup"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-14",
    notes:
      "Revisão material em 2026-09-14 com fontes Microsoft visíveis: separação de enlace, configuração DHCP/IP, gateway, DNS e acesso externo; observação por ipconfig, ping e nslookup antes de mudanças; Redefinição de Rede reservada ao fim e comparação Wi-Fi × Ethernet sem conclusão absoluta.",
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
  "como-configurar-2fa-em-tudo": {
    slug: "como-configurar-2fa-em-tudo",
    sources: ["cisa-require-mfa", "nist-800-63b-authenticators"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-25",
    notes:
      "Reescrita material completa em 2026-09-25: removidas estatísticas sem fonte, listas genéricas de produtos e promessas locais; diferencia 2FA de MFA, métodos resistentes a phishing, OTP, recuperação e ordem de implantação com base em CISA e NIST.",
  },
  "como-proteger-rede-wifi-empresa": {
    slug: "como-proteger-rede-wifi-empresa",
    sources: ["wifi-alliance-security", "cisa-secure-wifi-networks"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-25",
    notes:
      "Reescrita material completa em 2026-09-25: foco em criptografia, segmentação, administração, ciclo de firmware e validação; removidas métricas inventadas, marcas recomendadas e alegações locais não comprovadas.",
  },
  "como-configurar-firewall-pfsense": {
    slug: "como-configurar-firewall-pfsense",
    sources: ["netgate-pfsense-docs", "netgate-pfsense-firewall", "netgate-pfsense-backup"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-25",
    notes:
      "Reescrita material completa em 2026-09-25 contra a documentação atual da Netgate: removidos preços, senhas/defaults e prescrições de pacotes dependentes de versão; preservados planejamento, regras, NAT, VLANs, backup e recuperação.",
  },
  "como-configurar-active-directory": {
    slug: "como-configurar-active-directory",
    sources: ["ms-ad-ds-overview", "ms-ad-ds-dns", "ms-ad-ds-security"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-25",
    notes:
      "Reescrita material completa em 2026-09-25 com documentação Microsoft atual para Windows Server: AD DS, dependência de DNS, segurança, redundância, GPO, backup e critérios de parada.",
  },

  "como-configurar-repetidor-wifi": {
    slug: "como-configurar-repetidor-wifi",
    sources: ["tplink-onemesh-wps", "wifi-alliance-security"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-25",
    notes:
      "Reescrita completa em 2026-09-25: remove senha/endereço genéricos e regra falsa de perda exata de 50%; prioriza posição, manual do modelo, WPS compatível e validação antes/depois.",
  },
  "trocar-windows-por-linux-vale-a-pena": {
    slug: "trocar-windows-por-linux-vale-a-pena",
    sources: ["ubuntu-try-desktop", "ubuntu-install-desktop", "ms-win11-requirements"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-25",
    notes:
      "Reescrita material em 2026-09-25: remove generalizações sobre 2 GB, telemetria e compatibilidade de jogos; usa teste live, backup, BitLocker e requisitos atuais como critérios de decisão.",
  },
  "erros-comuns-upgrade-computador": {
    slug: "erros-comuns-upgrade-computador",
    sources: ["kingston-memory-support", "kingston-ssd-faq", "nvme-official-faq", "ms-win11-requirements", "ms-bitlocker-backup-key"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-25",
    notes:
      "Reescrita completa em 2026-09-25: corrige erros textuais e a recomendação absoluta de instalação limpa; adiciona compatibilidade real de RAM, M.2/SATA/NVMe, BIOS, GPU/fonte, backup e validação pós-upgrade.",
  },
  "como-configurar-vpn-empresarial": {
    slug: "como-configurar-vpn-empresarial",
    sources: ["wireguard-quickstart", "openvpn-community-docs", "cisa-require-mfa", "netgate-pfsense-docs"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-25",
    notes:
      "Reescrita material em 2026-09-25: substitui script/copiar-colar por arquitetura defensiva de acesso remoto, identidade individual, MFA, rotas, segmentação, DNS, logs, revogação e plano de recuperação.",
  },
  "como-recuperar-conta-hackeada": {
    slug: "como-recuperar-conta-hackeada",
    sources: ["google-account-compromised", "microsoft-account-compromised", "cisa-require-mfa", "ms-phishing-protection"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-25",
    notes:
      "Reescrita completa em 2026-09-25: remove estatísticas/valores sem fonte, stack comercial e alegações locais; foca recuperação oficial, sessão, recovery, MFA, dispositivo e preservação de evidências.",
  },

  "como-deixar-windows-11-mais-rapido-iniciantes": {
    slug: "como-deixar-windows-11-mais-rapido-iniciantes",
    sources: ["ms-pc-performance", "ms-startup-apps"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-25",
    notes:
      "Reescrita material: substitui receitas genéricas por diagnóstico por recurso, inicialização, armazenamento, atualização e limite de hardware; remove porcentagem mágica de espaço e alegação de atendimento local.",
  },
  "como-fazer-backup-fotos-windows-iniciantes": {
    slug: "como-fazer-backup-fotos-windows-iniciantes",
    sources: ["ms-file-history", "cisa-backup", "nist-sp-800-34"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-25",
    notes:
      "Reescrita material: diferencia cópia, sincronização, versionamento e restauração; adiciona inventário, verificação e critério de parada diante de mídia instável.",
  },
  "como-atualizar-windows-corretamente": {
    slug: "como-atualizar-windows-corretamente",
    sources: ["ms-windows-update-troubleshoot", "ms-pc-performance"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-25",
    notes:
      "Reescrita material: remove cronômetros universais e instrução de forçar desligamento; prioriza preparação, Windows Update, registro de erro, Obter Ajuda e validação pós-atualização.",
  },
  "como-recuperar-arquivos-apagados-windows": {
    slug: "como-recuperar-arquivos-apagados-windows",
    sources: ["ms-windows-file-recovery", "ms-file-history"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-25",
    notes:
      "Reescrita material: prioriza Lixeira/backup, reduz gravações na mídia, usa Windows File Recovery com destino separado e define limites para SSD e falha física.",
  },
  "como-fazer-teste-velocidade-internet": {
    slug: "como-fazer-teste-velocidade-internet",
    sources: ["fcc-home-network-tips", "fcc-speed-test-app-faq"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-25",
    notes:
      "Reescrita material: remove regra falsa de que Wi-Fi é sempre mais lento e percentuais regulatórios antigos; ensina referência cabeada, repetição de medições, latência, jitter e perda.",
  },

  "como-resetar-senha-windows": {
    slug: "como-resetar-senha-windows",
    sources: ["ms-password-reset-windows", "ms-local-password-reset-disk", "ms-bitlocker-recovery"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-25",
    notes:
      "Onda 11K: removido bypass por substituição de utilman.exe/cmd.exe; conteúdo agora diferencia PIN, conta Microsoft, conta local, conta corporativa e BitLocker e usa apenas recuperação oficial.",
  },
  "como-organizar-arquivos-windows-iniciantes": {
    slug: "como-organizar-arquivos-windows-iniciantes",
    sources: ["ms-file-explorer-windows", "ms-find-files-windows", "ms-onedrive-folder-backup"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-25",
    notes:
      "Onda 11K: reescrita material com estrutura de pastas, nomenclatura, pesquisa, Acesso Rápido, sincronização, backup e critérios de parada diante de falha de disco.",
  },
  "como-trocar-senha-wifi": {
    slug: "como-trocar-senha-wifi",
    sources: ["wifi-alliance-security", "nsa-router-hygiene-2026"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-25",
    notes:
      "Onda 11K: removidas credenciais e endereços genéricos, reset de fábrica como primeira opção e regra fixa de senha; adicionados painel oficial, separação de credenciais, WPA2/WPA3, firmware, validação e limites para roteador gerenciado.",
  },

  "como-configurar-bios-uefi-corretamente": {
    slug: "como-configurar-bios-uefi-corretamente",
    sources: ["ms-secure-boot-windows11-2026", "ms-enable-tpm2-2026", "ms-bitlocker-backup-key"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-25",
    notes: "Onda 11L: removidos absolutos sobre UEFI/AHCI/XMP e chaves de fabricante; adicionados baseline, BitLocker, Secure Boot, TPM, armazenamento, critérios de parada e decisão por objetivo.",
  },
  "como-configurar-servidor-de-arquivos": {
    slug: "como-configurar-servidor-de-arquivos",
    sources: ["ms-smb-overview-2026", "ms-smb-hardening-2026", "ms-smb-secure-traffic-2026", "samba-smb-conf-current-2026"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-25",
    notes: "Onda 11L: removidos senha em comando, guest share e números fixos de capacidade; conteúdo agora prioriza identidade, grupos, SMB autenticado, segmentação, backup e restauração.",
  },
  "como-configurar-firewall-ufw-linux": {
    slug: "como-configurar-firewall-ufw-linux",
    sources: ["ubuntu-ufw-firewall-2026"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-25",
    notes: "Onda 11L: removidas estatísticas e stack comercial sem fonte; reescrito em torno do UFW oficial, preservação de SSH, dry-run, origem, perfis, logs, rollback e limites de firewall de host.",
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
