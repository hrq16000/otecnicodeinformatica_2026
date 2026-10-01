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
  "man.openbsd.org",
  "dnf5.readthedocs.io",
  "documentation.ubuntu.com",
  "samba.org",
  "rsync.samba.org",
  "www.samba.org",
  "www.wireguard.com",
  "wireguard.com",
  "openvpn.net",
  "www.kingston.com",
  "edc.intel.com",
  "intel.com",
  "www.intel.com",
  "nsa.gov",
  "www.nsa.gov",
  "www.dell.com",
  "support.hp.com",
  "acm.org",
  "www.acm.org",
  "ccecc.acm.org",
  "csed.acm.org",
] as const;

// ─────────────────────────────────────────────────────────────
// FONTES CONSULTADAS (URLs confirmadas em 2026-07-12).
// ─────────────────────────────────────────────────────────────
export const EDITORIAL_SOURCES: Record<string, EditorialSource> = {
  "acm-computing-curricula-2020": {
    id: "acm-computing-curricula-2020",
    title: "Computing Curricula 2020 (CC2020)",
    publisher: "Association for Computing Machinery / IEEE Computer Society",
    url: "https://www.acm.org/binaries/content/assets/education/curricula-recommendations/cc2020.pdf",
    accessedAt: "2026-09-30",
    sourceType: "standard",
    supports: [
      "Computing é tratado como um campo amplo com múltiplas disciplinas e especializações, incluindo ciência da computação, engenharia de computação, sistemas de informação, tecnologia da informação e engenharia de software.",
      "As disciplinas de computing compartilham fundamentos, mas diferem em foco, competências e aplicações.",
    ],
  },
  "acm-computing-subdisciplines-2026": {
    id: "acm-computing-subdisciplines-2026",
    title: "The Sub-Disciplines of Computing",
    publisher: "ACM Committee for Computing Education in Community Colleges",
    url: "https://ccecc.acm.org/guidance",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "A ACM categoriza computing em disciplinas como Computer Science, Computer Engineering, Software Engineering, Information Systems e Information Technology.",
      "As descrições disciplinares ajudam a diferenciar fundamentos/algoritmos, integração hardware-software, desenvolvimento de software, sistemas organizacionais e infraestrutura/tecnologia da informação.",
    ],
  },
  "acm-cs2023-vision-2026": {
    id: "acm-cs2023-vision-2026",
    title: "CS2023 Vision Statement",
    publisher: "ACM / IEEE-CS / AAAI",
    url: "https://csed.acm.org/vision-statement/",
    accessedAt: "2026-09-30",
    sourceType: "standard",
    supports: [
      "Ciência da Computação é apresentada como disciplina fundamental de computing voltada ao uso de computadores para resolver problemas de forma sistemática.",
      "Competências práticas e disposições profissionais complementam conhecimento conceitual em currículos modernos de computação.",
    ],
  },

  "ms-print-spooler-service-2026": {
    id: "ms-print-spooler-service-2026",
    title: "Corrigir o problema do serviço de spooler de impressão não estar executando erros no Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/windows/hardware/printer/fix-print-spooler-service-not-running-errors-in-windows",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "O Spooler de Impressão gerencia trabalhos de impressão no Windows; quando falha, documentos podem ficar presos na fila e a impressora pode deixar de responder.",
      "A Microsoft orienta reiniciar o serviço e revisar drivers conflitantes ou desatualizados quando o spooler apresenta falhas recorrentes.",
    ],
  },
  "ms-print-job-stuck-queue-2026": {
    id: "ms-print-job-stuck-queue-2026",
    title: "Corrigir o trabalho de impressão travado em erros de fila no Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/windows/hardware/printer/fix-print-job-stuck-in-queue-errors-in-windows",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "A Microsoft orienta primeiro cancelar trabalhos pela fila e reiniciar o Spooler de Impressão.",
      "Quando o cancelamento não limpa a fila, o procedimento oficial é parar o spooler, excluir os arquivos de trabalhos em C:\\Windows\\System32\\spool\\PRINTERS e iniciar o serviço novamente.",
    ],
  },
  "ms-printer-connection-printing-2026": {
    id: "ms-printer-connection-printing-2026",
    title: "Corrigir problemas de conexão e impressão de impressora no Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/windows/hardware/printer/fix-printer-connection-and-printing-problems-in-windows",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "O roteiro oficial separa atualização de driver, limpeza/redefinição do spooler e problemas de status offline, sustentando o diagnóstico por camadas.",
      "A Microsoft recomenda usar o driver mais recente apropriado para a impressora antes de concluir que a fila é a causa de toda falha de impressão.",
    ],
  },

  "dell-bios-recovery-2026": {
    id: "dell-bios-recovery-2026",
    title: "Recuperar o BIOS em um computador ou tablet Dell após uma falha de inicialização ou POST",
    publisher: "Dell Support",
    url: "https://www.dell.com/support/kbdoc/pt-br/000132453/recuperar-o-bios-em-um-computador-ou-tablet-dell-ap%C3%B3s-uma-falha-de-inicializa%C3%A7%C3%A3o-ou-post",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "A Dell documenta mecanismos próprios de recuperação de BIOS por imagem no disco e por USB em equipamentos compatíveis, confirmando que recuperação de firmware é específica do fabricante/modelo.",
      "O procedimento oficial exige alimentação adequada e orienta não desligar o equipamento durante a recuperação.",
    ],
  },
  "hp-bios-recovery-2026": {
    id: "hp-bios-recovery-2026",
    title: "HP Notebook – Recuperar o BIOS (Basic Input/Output System)",
    publisher: "HP Support",
    url: "https://support.hp.com/br-pt/document/ish_4120903-4029041-16",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "A HP documenta recuperação de BIOS por combinação de teclas ou unidade de recuperação em modelos compatíveis e ressalva que o recurso não é universal.",
      "A recuperação depende do suporte do equipamento e do procedimento específico do fabricante, não de uma sequência genérica aplicável a qualquer placa.",
    ],
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
  "ms-windows-setup-boot-start-driver": {
    id: "ms-windows-setup-boot-start-driver",
    title: "Install a boot-start driver",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/windows-hardware/drivers/install/installing-a-boot-start-driver",
    accessedAt: "2026-09-26",
    sourceType: "official",
    supports: [
      "O Windows depende de drivers de inicialização para acessar dispositivos necessários ao carregamento do sistema.",
      "Quando o driver necessário não está incluído no Windows, deve ser usado um pacote fornecido pelo fabricante do dispositivo.",
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
  "intel-atx3-dc-regulation": {
    id: "intel-atx3-dc-regulation",
    title: "ATX Version 3 Multi Rail Desktop Platform Power Supply Design Guide — DC Voltage Regulation",
    publisher: "Intel",
    url: "https://edc.intel.com/content/www/us/en/design/ipla/software-development-platforms/client/platforms/alder-lake-desktop/atx-version-3-0-multi-rail-desktop-platform-power-supply-design-guide/2.1a/dc-voltage-regulation-required/",
    accessedAt: "2026-09-29",
    sourceType: "standard",
    supports: [
      "O guia ATX define faixas de regulação das saídas DC e exige conformidade nas condições especificadas de linha, carga e ambiente.",
      "Uma leitura isolada em repouso não representa, por si só, o comportamento da fonte em todas as condições de carga.",
    ],
  },
  "intel-atx3-short-circuit-protection": {
    id: "intel-atx3-short-circuit-protection",
    title: "ATX Version 3 Multi Rail Desktop Platform Power Supply Design Guide — Short Circuit Protection",
    publisher: "Intel",
    url: "https://edc.intel.com/content/www/us/en/design/ipla/software-development-platforms/client/platforms/alder-lake-desktop/atx-version-3-0-multi-rail-desktop-platform-power-supply-design-guide/2.1/short-circuit-protection-scp-required/",
    accessedAt: "2026-09-29",
    sourceType: "standard",
    supports: [
      "O guia ATX exige proteção contra curto-circuito nas principais saídas da fonte.",
      "O desligamento por proteção é compatível com condição anormal de saída, mas não identifica sozinho qual componente do sistema originou a falha.",
    ],
  },

  "ms-camera-privacy-windows-2026": {
    id: "ms-camera-privacy-windows-2026",
    title: "Gerenciar permissões de aplicativo para uma câmera no Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/windows/privacy/manage-app-permissions-for-a-camera-in-windows",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "O Windows 11 separa acesso à câmera do dispositivo, acesso para aplicativos da Microsoft Store e acesso para aplicativos de área de trabalho.",
      "Aplicativos de área de trabalho podem não aparecer com controle individual; o acesso deles é governado pela chave específica para apps de desktop.",
      "Quando a configuração de acesso à câmera não pode ser alterada, um administrador do dispositivo pode precisar modificar a política.",
    ],
  },

  "ms-camera-troubleshooting-windows": {
    id: "ms-camera-troubleshooting-windows",
    title: "Camera doesn't work in Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/en-us/windows/hardware/camera/camera-doesn-t-work-in-windows",
    accessedAt: "2026-09-29",
    sourceType: "official",
    supports: [
      "Para webcam externa, a Microsoft orienta conferir conexão USB, testar outra porta e testar a câmera em outro dispositivo para separar falha da câmera de falha do computador.",
      "O Gerenciador de Dispositivos é usado para localizar a câmera e verificar alterações de hardware quando ela não aparece.",
      "Muitas webcams USB são compatíveis com UVC e podem usar o driver USB Video Device incluído no Windows, com a ressalva de que recursos específicos do fabricante podem não funcionar com o driver genérico.",
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
  "ms-win11-pro-workstations-2026": {
    id: "ms-win11-pro-workstations-2026",
    title: "Windows 11 Pro para Estações de Trabalho",
    publisher: "Microsoft",
    url: "https://www.microsoft.com/pt-br/windows/business/windows-11-pro-workstations",
    accessedAt: "2026-10-01",
    sourceType: "official",
    supports: [
      "A Microsoft posiciona o Windows 11 Pro para Estações de Trabalho para cargas de trabalho exigentes e recursos avançados de processamento.",
      "A edição inclui recursos voltados a armazenamento resiliente e compartilhamento acelerado de arquivos em hardware compatível, sem transformar a edição do sistema operacional em substituto para dimensionamento de hardware.",
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

  "certbr-fasciculos-seguranca-2026": {
    id: "certbr-fasciculos-seguranca-2026",
    title: "Fascículos — Cartilha de Segurança para Internet",
    publisher: "CERT.br / NIC.br",
    url: "https://cartilha.cert.br/fasciculos/",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "O CERT.br publica orientações para autenticação forte, incluindo segunda etapa de verificação.",
      "A Cartilha recomenda backups para reduzir o risco de perda de dados e reúne orientações sobre golpes e proteção de computadores.",
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
  "gnu-ddrescue-manual-2026": {
    id: "gnu-ddrescue-manual-2026",
    title: "GNU ddrescue Manual",
    publisher: "GNU Project",
    url: "https://www.gnu.org/software/ddrescue/manual/ddrescue_manual.html",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "O GNU ddrescue copia primeiro as partes legíveis de uma mídia com falhas e usa mapfile para registrar o progresso e retomar o resgate.",
      "O manual orienta fazer uma cópia da unidade com falha e tentar reparar a cópia, não o original, e alerta para não reparar sistema de arquivos diretamente em uma unidade com erros de I/O.",
    ],
  },
  "ms-audio-services-windows-2026": {
    id: "ms-audio-services-windows-2026",
    title: "Corrigir problemas de som ou áudio no Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/windows/hardware/audio/fix-sound-or-audio-problems-in-windows",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "O roteiro oficial da Microsoft inclui reiniciar Windows Audio, Windows Audio Endpoint Builder e Remote Procedure Call (RPC) quando a falha está na camada de serviços de áudio.",
      "O reinício dos serviços é uma etapa de diagnóstico, não uma conclusão universal; se o áudio não volta, a investigação continua por dispositivo, saída, driver e outras camadas.",
    ],
  },

  "ms-audio-output-undetected-2026": {
    id: "ms-audio-output-undetected-2026",
    title: "Corrigir dispositivo de saída de áudio ausente ou não detectado no Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/windows/hardware/audio/fix-missing-or-undetected-audio-output-device-in-windows",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "A Microsoft diferencia dispositivo de saída ausente de problemas de reprodução e orienta verificar Gerenciador de Dispositivos, habilitação e alterações de hardware.",
      "Quando o driver de áudio está ausente ou incompatível, a Microsoft recomenda usar o driver mais recente do fabricante do PC ou dispositivo.",
    ],
  },
  "ms-audio-headphones-no-sound-2026": {
    id: "ms-audio-headphones-no-sound-2026",
    title: "Corrigir problemas de áudio quando nenhum som é reproduzido por alto-falantes ou fones de ouvido no Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/windows/hardware/audio/fix-audio-issues-when-no-sound-plays-from-speakers-or-headphones-in-windows",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "Quando o dispositivo existe mas não reproduz som, a Microsoft orienta confirmar a saída selecionada, volume e dispositivo padrão antes de etapas mais invasivas.",
      "A página separa ausência de reprodução de ausência de detecção, sustentando a árvore de diagnóstico por camadas.",
    ],
  },
  "ms-microphone-problems-2026": {
    id: "ms-microphone-problems-2026",
    title: "Corrigir problemas do microfone",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/windows/hardware/drivers/fix-microphone-problems",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "A Microsoft orienta confirmar o dispositivo de entrada e as permissões de microfone quando o áudio do headset funciona mas a captura não.",
      "As permissões de microfone para aplicativos e aplicativos de desktop são camadas separadas da detecção física do headset.",
    ],
  },

  "seagate-bios-sata-not-detected-2026": {
    id: "seagate-bios-sata-not-detected-2026",
    title: "O BIOS não detecta ou reconhece o disco rígido ATA/SATA",
    publisher: "Seagate Support",
    url: "https://www.seagate.com/pt/pt/support/kb/the-bios-does-not-detect-or-recognize-the-ata-sata-hard-drive-168595en/",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "A ausência de um HD SATA no BIOS pode envolver porta desabilitada, cabo, alimentação e a própria unidade; o diagnóstico deve isolar essas camadas.",
      "A Seagate orienta verificar habilitação da porta e conexões antes de concluir falha da unidade.",
    ],
  },
  "seagate-bios-ssd-not-detected-2026": {
    id: "seagate-bios-ssd-not-detected-2026",
    title: "O BIOS não detecta ou reconhece a unidade de estado sólido",
    publisher: "Seagate Support",
    url: "https://www.seagate.com/pt/pt/support/kb/the-bios-does-not-detect-or-recognize-the-solid-state-drive-005707en/",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "A ausência de um SSD SATA no BIOS pode envolver porta/configuração, conexão e falha da unidade.",
      "Detecção no firmware deve ser resolvida antes de tratar estados de volume no sistema operacional.",
    ],
  },

  "seagate-noisy-drive-2026": {
    id: "seagate-noisy-drive-2026",
    title: "O que eu devo fazer quando o disco rígido faz barulho?",
    publisher: "Seagate Support",
    url: "https://www.seagate.com/br/pt/support/kb/what-should-i-do-for-a-noisy-disk-drive-193731en/",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "Discos rígidos podem produzir vibrações e cliques durante leitura, gravação e verificações internas; som isolado não identifica uma falha mecânica específica.",
      "A Seagate orienta usar ferramenta de diagnóstico quando há preocupação com ruído, em vez de classificar o tipo de defeito apenas pelo som.",
    ],
  },

  "intel-processor-temperature-2026": {
    id: "intel-processor-temperature-2026",
    title: "Information about Temperature for Intel Processors",
    publisher: "Intel Support",
    url: "https://www.intel.com/content/www/us/en/support/articles/000005597/processors.html",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "Limites térmicos e mecanismos de proteção variam por processador e projeto; não existe uma faixa típica universal aplicável a todo notebook.",
      "Processadores podem reduzir potência/frequência e desligar para proteção quando limites térmicos são atingidos.",
    ],
  },
  "hp-notebook-overheating-2026": {
    id: "hp-notebook-overheating-2026",
    title: "Notebooks HP - Reduza o calor dentro do laptop para evitar superaquecimento no Windows",
    publisher: "HP Support",
    url: "https://support.hp.com/br-pt/document/ish_3936214-3919514-16",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "Superfícies macias podem bloquear entradas de ar; fabricantes orientam superfície plana e rígida e limpeza das aberturas externas.",
      "Ventoinha alta, lentidão, reinícios e travamentos podem acompanhar superaquecimento, mas devem ser interpretados junto do fluxo de ar e da carga.",
    ],
  },
  "dell-laptop-battery-swelling-2026": {
    id: "dell-laptop-battery-swelling-2026",
    title: "Dell Laptop Battery - Frequently Asked Questions",
    publisher: "Dell Support",
    url: "https://www.dell.com/support/kbdoc/en-us/000175212/dell-laptop-battery-frequently-asked-questions",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "Baterias de notebook podem inchar; sinais incluem carcaça separando, trackpad/teclado elevados e instabilidade sobre superfície plana.",
      "Bateria inchada deve ser tratada como condição que exige ação, não como mero sintoma térmico a ser ignorado.",
    ],
  },

  "intel-thermal-paste-2026": {
    id: "intel-thermal-paste-2026",
    title: "How to Apply Thermal Paste and How It Works",
    publisher: "Intel",
    url: "https://www.intel.com/content/www/us/en/gaming/resources/how-to-apply-thermal-paste.html",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "O material térmico preenche imperfeições microscópicas entre processador e solução de refrigeração para melhorar a transferência de calor.",
      "A Intel orienta consultar as instruções do cooler e do material, evitar adicionar pasta sobre material pré-aplicado e reaplicar quando o cooler é removido.",
    ],
  },
  "amd-thermal-interface-2026": {
    id: "amd-thermal-interface-2026",
    title: "Instruções para instalação e Informações de Garantia para processadores AMD",
    publisher: "AMD",
    url: "https://www.amd.com/pt/resources/support-articles/faqs/CPU-200.html",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "A AMD exige solução térmica adequada e material de interface térmica compatível.",
      "Quando a solução térmica é removida após a instalação, a AMD orienta limpar e aplicar novo material de interface antes da reinstalação.",
    ],
  },

  "hp-computer-no-power-2026": {
    id: "hp-computer-no-power-2026",
    title: "HP PCs - Computer does not turn on, start, or boot",
    publisher: "HP Support",
    url: "https://support.hp.com/us-en/document/ish_3974055-3873564-16",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "A HP separa problemas de ausência de energia, ausência de vídeo e falha de inicialização e orienta remover periféricos antes de aprofundar o diagnóstico.",
      "A HP documenta um hard reset com energia externa removida em cenários compatíveis, reforçando que o procedimento depende do equipamento e deve seguir suporte oficial.",
    ],
  },
  "dell-laptop-no-power-2026": {
    id: "dell-laptop-no-power-2026",
    title: "Solucionar problemas de energia em um notebook Dell",
    publisher: "Dell Technologies Support",
    url: "https://www.dell.com/support/kbdoc/pt-br/000124389/solucionar-problemas-de-energia-em-um-notebook-dell",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "A Dell trata ausência de energia como cenário distinto de ausência de POST e de vídeo e usa diagnósticos específicos do fabricante quando suportados.",
      "A Dell orienta consultar o manual do modelo e procedimentos oficiais antes de desmontagem ou substituição de componentes.",
    ],
  },
  "ms-powercfg-batteryreport": {
    id: "ms-powercfg-batteryreport",
    title: "Opções de linha de comando powercfg",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/pt-br/windows-hardware/design/device-experiences/powercfg-command-line-options",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "O comando powercfg /batteryreport gera um relatório HTML com características de uso da bateria ao longo do tempo de vida do sistema.",
      "O relatório de bateria fornece contexto de uso quando o Windows ainda inicia; ele não é um teste elétrico do hardware.",
    ],
  },

  "msi-front-panel-power-test-2026": {
    id: "msi-front-panel-power-test-2026",
    title: "O que fazer quando o PC não inicia ou não dá vídeo",
    publisher: "MSI Support",
    url: "https://br.msi.com/support/technical_details/MB_Boot_No_Display",
    accessedAt: "2026-09-29",
    sourceType: "official",
    supports: [
      "A MSI orienta confirmar o Power Switch no header frontal e, quando o cabo frontal é suspeito, remover esse cabo e acionar diretamente o par Power Switch como teste de diagnóstico.",
      "O teste de painel frontal é apenas uma etapa de uma sequência maior que também verifica compatibilidade e hardware, portanto não valida sozinho todos os componentes.",
    ],
  },
  "msi-jfp1-front-panel-manual": {
    id: "msi-jfp1-front-panel-manual",
    title: "JFP1: Front Panel Connectors",
    publisher: "MSI",
    url: "https://download-2.msi.com/archive/mnu_exe/mb/H610TI-S03_H610TI-S01.pdf",
    accessedAt: "2026-09-29",
    sourceType: "official",
    supports: [
      "O header JFP1 do manual separa Power Switch, Reset Switch, Power LED e HDD LED.",
      "O manual marca polaridade para LEDs e mostra Power Switch/Reset Switch como pares de chave, reforçando que o pinout deve ser consultado no modelo específico.",
    ],
  },

  "ms-bug-check-code-reference": {
    id: "ms-bug-check-code-reference",
    title: "Bug check code reference",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-code-reference2",
    accessedAt: "2026-09-29",
    sourceType: "official",
    supports: [
      "A referência da Microsoft lista os códigos de bug check e orienta usar o WinDbg/!analyze para obter informações e parâmetros do stop code.",
      "Um arquivo de despejo pode conter mais contexto sobre o estado da memória no momento da falha do que o texto exibido na tela.",
    ],
  },
  "ms-blue-screen-data": {
    id: "ms-blue-screen-data",
    title: "Analyze bug check (stop code error) data",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/blue-screen-data",
    accessedAt: "2026-09-29",
    sourceType: "official",
    supports: [
      "Cada bug check possui quatro parâmetros associados que podem acrescentar contexto específico ao código.",
      "Os parâmetros podem ser obtidos no log do sistema ou a partir do arquivo de despejo e analisados com ferramentas de depuração.",
    ],
  },
  "ms-memory-manager-performance-2026": {
    id: "ms-memory-manager-performance-2026",
    title: "Performance Tuning for Cache and Memory Manager Subsystems",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/windows-server/administration/performance-tuning/subsystem/cache-memory-management/",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "O Windows usa memória para cache de arquivos e páginas em standby podem continuar disponíveis para reutilização, portanto cache alto não equivale automaticamente a falta de RAM.",
      "A investigação de pressão de memória deve considerar memória disponível e consumo real, não apenas a porcentagem total ocupada.",
    ],
  },
  "ms-page-file-introduction-2026": {
    id: "ms-page-file-introduction-2026",
    title: "Introduction to the page file",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/troubleshoot/windows-client/performance/introduction-to-the-page-file",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "A carga de memória confirmada (commit charge) é comparada ao limite de confirmação do sistema; ao atingir o limite, processos podem deixar de obter memória e ocorrer travamentos ou outras falhas.",
      "Arquivos de paginação gerenciados pelo sistema podem crescer quando necessário e quando há espaço disponível, sustentando a recomendação de não desativar o pagefile por regra genérica.",
    ],
  },
  "ms-computer-memory-overview-2026": {
    id: "ms-computer-memory-overview-2026",
    title: "Tudo sobre memória de computador",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/windows/experience/compatibility/all-about-computer-memory",
    accessedAt: "2026-09-30",
    sourceType: "official",
    supports: [
      "RAM mantém dados ativos acessíveis mais rapidamente que o armazenamento e maior capacidade permite manter mais trabalho simultâneo sem a mesma pressão de desempenho.",
      "A necessidade de RAM depende do tipo de uso; valores mínimos ou recomendações gerais não substituem a medição da carga real e a compatibilidade do equipamento.",
    ],
  },

  "ms-small-memory-dump": {
    id: "ms-small-memory-dump",
    title: "Small Memory Dump",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/small-memory-dump",
    accessedAt: "2026-09-29",
    sourceType: "official",
    supports: [
      "Pequenos despejos podem incluir a mensagem de bug check, parâmetros, pilha do kernel e lista de drivers carregados.",
      "Quando esse tipo de dump é gerado, os arquivos são mantidos no diretório %SystemRoot%\\Minidump.",
    ],
  },
  "ms-whea-hardware-errors": {
    id: "ms-whea-hardware-errors",
    title: "Hardware Errors and Error Sources",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/windows-hardware/drivers/whea/hardware-errors-and-error-sources",
    accessedAt: "2026-09-29",
    sourceType: "official",
    supports: [
      "A WHEA recebe e representa condições de erro de hardware reportadas por diferentes fontes da plataforma.",
      "As fontes podem incluir processador, cache/memória, chipset, barramentos de E/S e dispositivos, portanto um erro WHEA não identifica sozinho uma peça específica.",
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
  "ms-windows-update-cache-2026": {
    id: "ms-windows-update-cache-2026",
    title: "Solucionar problemas de atualização do Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/windows/deployment/updates-lifecycle/troubleshoot-problems-updating-windows",
    accessedAt: "2026-10-01",
    sourceType: "official",
    supports: [
      "A Microsoft orienta começar por diagnóstico básico e pelo solucionador do Windows Update antes de avançar para procedimentos manuais.",
      "O guia oficial inclui limpeza do cache do Windows Update como etapa específica quando arquivos temporários corrompidos podem estar causando erros.",
      "A limpeza do cache não substitui investigação de conectividade, espaço, hardware externo ou outros fatores que impedem a atualização.",
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
  "ms-diskpart-attributes-disk-2026": {
    id: "ms-diskpart-attributes-disk-2026",
    title: "attributes disk",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/pt-br/windows-server/administration/windows-commands/attributes-disk",
    accessedAt: "2026-10-01",
    sourceType: "official",
    supports: [
      "O DiskPart pode exibir, definir e limpar o atributo readonly do disco selecionado.",
      "O disco precisa ser selecionado antes de executar attributes disk, por isso a identificação correta do alvo faz parte do procedimento seguro.",
    ],
  },
  "ms-diskpart-attributes-volume-2026": {
    id: "ms-diskpart-attributes-volume-2026",
    title: "attributes volume",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/pt-br/windows-server/administration/windows-commands/attributes-volume",
    accessedAt: "2026-10-01",
    sourceType: "official",
    supports: [
      "O DiskPart também expõe e altera atributos do volume selecionado, incluindo readonly.",
      "Atributos de disco e de volume são escopos diferentes e não devem ser tratados como prova de falha física.",
    ],
  },
  "ms-chkdsk-2026": {
    id: "ms-chkdsk-2026",
    title: "chkdsk",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/pt-br/windows-server/administration/windows-commands/chkdsk",
    accessedAt: "2026-10-01",
    sourceType: "official",
    supports: [
      "O CHKDSK verifica o sistema de arquivos e metadados do volume; parâmetros como /f e /r fazem reparos específicos.",
      "CHKDSK atua sobre a estrutura lógica do volume e não substitui diagnóstico de trava física, política ou falha do controlador da mídia.",
    ],
  },

  "ms-usb-not-recognized-2026": {
    id: "ms-usb-not-recognized-2026",
    title: "Corrigir problemas com a USB-C no Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/windows/hardware/usb/fix-usb-c-problems-in-windows",
    accessedAt: "2026-10-01",
    sourceType: "official",
    supports: [
      "A Microsoft relaciona a mensagem de dispositivo USB não reconhecido a problema reportado pelo dispositivo ou a falha de driver e orienta consultar o código no Gerenciador de Dispositivos.",
      "O estado e o código do dispositivo ajudam a distinguir reconhecimento/driver de outras falhas do caminho USB.",
    ],
  },
  "ms-device-manager-error-codes-2026": {
    id: "ms-device-manager-error-codes-2026",
    title: "Códigos de erro no Gerenciador de Dispositivos no Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/pt-br/windows/hardware/drivers/error-codes-in-device-manager-in-windows",
    accessedAt: "2026-10-01",
    sourceType: "official",
    supports: [
      "O Gerenciador de Dispositivos expõe códigos de erro no status do dispositivo e diferentes códigos possuem causas e resoluções distintas.",
      "Atualização ou reinstalação de driver é apropriada para códigos específicos, não como explicação universal para qualquer falha USB.",
    ],
  },
  "ms-usb-enumeration-unknown-device-2026": {
    id: "ms-usb-enumeration-unknown-device-2026",
    title: "Case Study - Troubleshooting an Unknown USB Device",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/windows-hardware/drivers/usbcon/case-study--troubleshooting-an-unknown-usb-device-by-using-etw-and-netmon",
    accessedAt: "2026-10-01",
    sourceType: "official",
    supports: [
      "Falhas durante a enumeração USB podem fazer o hub reportar a chegada do dispositivo, mas o Windows marcá-lo como desconhecido.",
      "Falhas de reset de porta, atribuição de endereço ou leitura/validação de descritores podem impedir a enumeração antes da identificação normal do dispositivo.",
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

  "ms-msinfo32-2026": {
    id: "ms-msinfo32-2026",
    title: "msinfo32",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/pt-br/windows-server/administration/windows-commands/msinfo32",
    accessedAt: "2026-09-29",
    sourceType: "official",
    supports: [
      "O msinfo32 abre Informações do Sistema e reúne informações de hardware, componentes e ambiente de software do computador.",
      "A ferramenta pode ser usada como ponto de verificação do modo em que o Windows foi inicializado.",
    ],
  },
  "ms-boot-uefi-legacy-2026": {
    id: "ms-boot-uefi-legacy-2026",
    title: "Inicializar no modo UEFI ou no modo BIOS herdado",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/pt-br/windows-hardware/manufacture/desktop/boot-to-uefi-mode-or-legacy-bios-mode?view=windows-11",
    accessedAt: "2026-09-29",
    sourceType: "official",
    supports: [
      "Depois que o Windows é instalado, o dispositivo normalmente continua inicializando no mesmo modo usado durante a instalação.",
      "Para instalações novas e suportadas, a documentação recomenda o modo UEFI mais recente.",
    ],
  },
  "ms-mbr2gpt-2026": {
    id: "ms-mbr2gpt-2026",
    title: "MBR2GPT",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/pt-br/windows/deployment/mbr-to-gpt",
    accessedAt: "2026-09-29",
    sourceType: "official",
    supports: [
      "O MBR2GPT valida o layout e pode converter o disco do sistema de MBR para GPT em cenários suportados sem usar a reformatação como etapa obrigatória.",
      "Depois da conversão para GPT, o firmware precisa ser configurado para inicializar em UEFI.",
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


  "ubuntu-desktop-install-2604": {
    id: "ubuntu-desktop-install-2604",
    title: "Install Ubuntu Desktop",
    publisher: "Ubuntu",
    url: "https://ubuntu.com/desktop/docs/en/26.04/tutorial/install-ubuntu-desktop/",
    accessedAt: "2026-09-26",
    sourceType: "official",
    supports: [
      "O instalador diferencia apagar o disco, instalação ao lado e particionamento manual.",
      "BitLocker pode impedir uma instalação segura ao lado do Windows enquanto a instalação permanece criptografada.",
      "A criptografia por senha exige que a credencial seja guardada fora do sistema.",
      "Após a instalação, o Ubuntu recomenda aplicar atualizações do sistema.",
    ],
  },
  "ubuntu-bootable-usb-current": {
    id: "ubuntu-bootable-usb-current",
    title: "Create a bootable USB stick",
    publisher: "Ubuntu Desktop documentation",
    url: "https://documentation.ubuntu.com/desktop/en/latest/how-to/create-a-bootable-usb-stick/",
    accessedAt: "2026-09-26",
    sourceType: "official",
    supports: [
      "A imagem precisa ser gravada no pendrive; copiar o arquivo ISO não cria a mídia de instalação.",
      "A criação da mídia apaga o conteúdo do pendrive e exige seleção cuidadosa do dispositivo correto.",
      "O procedimento oficial documenta ferramentas gráficas e também alerta para o risco do dd quando o destino é informado incorretamente.",
    ],
  },
  "ubuntu-cli-beginners-2026": {
    id: "ubuntu-cli-beginners-2026",
    title: "The Linux command line for beginners",
    publisher: "Ubuntu",
    url: "https://ubuntu.com/tutorials/command-line-for-beginners",
    accessedAt: "2026-09-27",
    sourceType: "official",
    supports: [
      "Navegação por caminhos absolutos e relativos, arquivos, diretórios, pipes, redirecionamento e comandos básicos.",
      "Uso pedagógico do terminal por iniciantes com atenção ao efeito de operações que alteram ou removem dados.",
    ],
  },
  "ubuntu-package-management-2026": {
    id: "ubuntu-package-management-2026",
    title: "Install and manage packages",
    publisher: "Ubuntu Server documentation",
    url: "https://ubuntu.com/server/docs/how-to/software/package-management/",
    accessedAt: "2026-09-27",
    sourceType: "official",
    supports: [
      "Uso de APT para atualizar índice, pesquisar, instalar, remover e atualizar pacotes em Ubuntu.",
      "Diferença operacional entre upgrade e full-upgrade e necessidade de revisar mudanças propostas.",
      "APT é voltado ao uso interativo; apt-get é indicado pela documentação para scripts não interativos.",
    ],
  },
  "dnf5-command-reference-2026": {
    id: "dnf5-command-reference-2026",
    title: "DNF5 Package Management Utility",
    publisher: "DNF5 documentation",
    url: "https://dnf5.readthedocs.io/en/latest/dnf5.8.html",
    accessedAt: "2026-09-27",
    sourceType: "official",
    supports: [
      "DNF5 gerencia pacotes em distribuições RPM e oferece busca, informações, instalação, remoção e atualização.",
      "A transação é resolvida a partir dos repositórios configurados e precisa ser revisada antes de confirmação.",
    ],
  },
  "ubuntu-openssh-server-2026": {
    id: "ubuntu-openssh-server-2026",
    title: "OpenSSH server",
    publisher: "Ubuntu Server documentation",
    url: "https://ubuntu.com/server/docs/how-to/security/openssh-server/",
    accessedAt: "2026-09-27",
    sourceType: "official",
    supports: [
      "Instalação do OpenSSH Server no Ubuntu e administração do serviço ssh.",
      "Uso do arquivo principal e de snippets em sshd_config.d para configuração do servidor.",
      "Validação da configuração antes de aplicar mudanças e uso de autenticação por chave.",
    ],
  },
  "openssh-sshd-config-2026": {
    id: "openssh-sshd-config-2026",
    title: "sshd_config(5)",
    publisher: "OpenBSD manual pages / OpenSSH",
    url: "https://man.openbsd.org/sshd_config",
    accessedAt: "2026-09-27",
    sourceType: "official",
    supports: [
      "Semântica das diretivas PubkeyAuthentication, PasswordAuthentication, PermitRootLogin, AllowUsers e AllowGroups.",
      "Composição da configuração do daemon OpenSSH e opções de autenticação, usuários, forwarding e timeouts.",
    ],
  },
  "rsync-manpage-2026": {
    id: "rsync-manpage-2026",
    title: "rsync(1) manpage",
    publisher: "rsync / Samba",
    url: "https://rsync.samba.org/ftp/rsync/rsync.1",
    accessedAt: "2026-09-27",
    sourceType: "official",
    supports: [
      "Sintaxe e cópia local/remota, incluindo a diferença causada pela barra final no caminho de origem.",
      "Modo archive e opções de inspeção como --dry-run/-n e --itemize-changes/-i.",
      "Comportamento destrutivo de --delete e recomendação explícita do manual para ensaiar com --dry-run antes de excluir.",
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
  "comandos-linux-essenciais-iniciantes": {
    slug: "comandos-linux-essenciais-iniciantes",
    sources: ["ubuntu-cli-beginners-2026"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-27",
    notes:
      "Reescrita material concluída: remove contagem promocional e receitas destrutivas sem contexto; organiza navegação, arquivos, busca, pipes, permissões, processos e rede com laboratório seguro, man/--help e critérios de parada. rm -rf, kill -9, chmod 777 e sudo deixam de ser recomendações padrão. Promovido em 2026-09-27 após capa própria/proveniência, ownership e gates editoriais.",
  },
  "como-gerenciar-pacotes-apt-dnf-linux": {
    slug: "como-gerenciar-pacotes-apt-dnf-linux",
    sources: ["ubuntu-package-management-2026", "dnf5-command-reference-2026"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-27",
    notes:
      "Reescrita material concluída: separa APT de DNF/DNF5, remove repositórios fictícios e confirmações -y indiscriminadas, diferencia apt de apt-get em automação, trata full-upgrade/autoremove como transações a revisar e proíbe contornar assinatura. Promovido em 2026-09-27 após capa própria/proveniência, ownership e gates editoriais.",
  },
  "como-configurar-ssh-seguro-linux": {
    slug: "como-configurar-ssh-seguro-linux",
    sources: ["ubuntu-openssh-server-2026", "openssh-sshd-config-2026"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-27",
    notes:
      "Reescrita material concluída: remove estatísticas de bots, promessa de porta customizada, receita genérica de fail2ban/MFA e parâmetros arbitrários; prioriza chave testada em segunda sessão, configuração efetiva, sshd -t, reload com rollback e critérios explícitos de parada. Promovido em 2026-09-27 após capa licenciada/proveniência, ownership e gates editoriais.",
  },
  "como-usar-rsync-backup-linux": {
    slug: "como-usar-rsync-backup-linux",
    sources: ["rsync-manpage-2026"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-27",
    notes:
      "Reescrita material concluída: rsync é tratado como cópia/sincronização e não como backup por si só; barra final, --dry-run e --delete seguem a manpage oficial; automação só entra após validação manual e o texto exige retenção independente e teste de restauração. Promovido em 2026-09-27 após capa licenciada/proveniência, ownership e gates editoriais.",
  },

  "informatica-basica": {
    slug: "informatica-basica",
    sources: [
      "ms-file-explorer-windows",
      "ms-find-files-windows",
      "ms-onedrive-folder-backup",
      "certbr-fasciculos-seguranca-2026",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 55 impressões, 0 cliques e posição média ~49,36 entre 2026-04-01 e 2026-09-27. Queries reais incluem 'conhecimento basico informatica' (17 impressões), 'informatica basica', 'informatica basica conteudo', 'informatica basica resumo', 'noções básicas de informática' e variações. A versão suplementar substitui editorialmente o texto monolítico antigo com mapa de competências, checklist prático, separação entre básico e avançado, organização de arquivos, produtividade, nuvem/backup e segurança. Fontes Microsoft e CERT.br ficam visíveis.",
  },

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
  "o-que-e-informatica": {
    slug: "o-que-e-informatica",
    sources: [
      "acm-computing-curricula-2020",
      "acm-computing-subdisciplines-2026",
      "acm-cs2023-vision-2026",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 78 impressões, 0 cliques e posição média ~64,68 entre 2026-04-01 e 2026-09-27; as consultas expostas incluem 'informatica', 'informática', 'o que e informatica', 'o que significa informatica', 'o que estuda a informática', 'area de informatica' e variações ortográficas. A versão suplementar transforma o pilar em definição ampla e estruturada, separando informática do uso cotidiano, TI, Ciência da Computação, Engenharia de Computação, Sistemas de Informação e Engenharia de Software, com exemplos, áreas e aplicações. Nenhuma equivalência disciplinar foi inventada; a taxonomia é ancorada em ACM/IEEE.",
  },

  "como-aprender-informatica": {
    slug: "como-aprender-informatica",
    sources: [
      "ms-file-explorer-windows",
      "ms-find-files-windows",
      "ms-onedrive-folder-backup",
      "ms-windows-security-overview",
      "cisa-backup",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 21 impressões, 0 cliques e posição média ~49,10 entre 2026-04-01 e 2026-09-27. Queries reais incluem 'aprender informática passo a passo', 'como aprender informática', 'como aprender informática do zero', 'como aprender informática sozinho', 'informática para iniciantes' e consultas de dicas. A versão suplementar substitui a abordagem genérica por uma trilha baseada em competências e projetos: arquivos/pastas, Windows, internet/e-mail, documentos, planilhas, nuvem/backup, segurança, hardware, rede e diagnóstico. Fontes Microsoft e CISA sustentam arquivos, pesquisa, sincronização/backup e proteção; nenhum prazo universal ou promessa de profissionalização foi inventado.",
  },

  "como-configurar-roteador-wifi-iniciantes": {
    slug: "como-configurar-roteador-wifi-iniciantes",
    sources: [
      "wifi-alliance-security",
      "wifi-alliance-home",
      "cisa-secure-wifi-networks",
      "nsa-router-hygiene-2026",
      "fcc-home-network-tips",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 14 impressões, 0 cliques e posição média ~34,43 entre 2026-04-01 e 2026-09-27. Queries reais incluem 'como configurar o wi fi', 'como criar uma rede wi fi com roteador', variações de 'como usar roteador', 'configuração de wi-fi', 'configuração do modem' e 'roteador wifi como configurar'. A versão suplementar organiza configuração por camadas (provedor/WAN, LAN/DHCP, Wi‑Fi e administração), separa gateway/roteador/ponto de acesso, evita IPs e painéis universais, reduz risco de duplo NAT e ancora segurança/firmware/cobertura em Wi‑Fi Alliance, CISA, NSA e FCC.",
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
    factCheckedAt: "2026-09-29",
    notes:
      "Revisão material em 2026-09-29 guiada pelo GSC: separa formato M.2 de protocolo/interface, substitui promessas subjetivas por uma matriz de decisão, remove alegações internas de bancada, explicita clonagem versus instalação limpa, preservação de dados, BitLocker, validação pós-instalação e critérios de parada. Mantém as fontes primárias NVM Express e Microsoft já verificadas.",
  },
  "como-recuperar-dados-hd-com-defeito": {
    slug: "como-recuperar-dados-hd-com-defeito",
    sources: [
      "ms-windows-file-recovery",
      "gnu-ddrescue-manual-2026",
      "seagate-noisy-drive-2026",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 6 impressões, 0 cliques e posição média 17 entre 2026-04-01 e 2026-09-27. A query exposta 'conserto de hd' foi tratada distinguindo recuperar dados de voltar a confiar na unidade. A versão suplementar substitui editorialmente o texto monolítico antigo, remove diagnóstico de falha mecânica apenas por clique/ruído, separa exclusão lógica de erros de I/O e falha física, prioriza origem/destino separados e imagem antes de reparo quando a mídia está instável, e reforça que recuperação não tem garantia de sucesso.",
  },

  "notebook-nao-liga-o-que-fazer": {
    slug: "notebook-nao-liga-o-que-fazer",
    sources: [
      "hp-computer-no-power-2026",
      "dell-laptop-no-power-2026",
      "ms-powercfg-batteryreport",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 11 impressões, 0 cliques e posição média ~10,91 entre 2026-04-01 e 2026-09-27. A versão suplementar substitui editorialmente o texto monolítico antigo, preservando a mesma URL. A triagem passa a separar sem energia, sem POST, sem vídeo e sem boot; remove carregador/bateria/placa como conclusões automáticas; condiciona reset elétrico e códigos de diagnóstico ao fabricante/modelo; adiciona batteryreport apenas quando o Windows ainda inicia e reforça critérios de parada para líquido, bateria deformada, cheiro e calor anormal. Queries individuais não foram expostas pelo GSC e nenhuma foi inventada.",
  },

  "computador-lento-causas-solucoes": {
    slug: "computador-lento-causas-solucoes",
    sources: [
      "ms-pc-performance",
      "ms-startup-apps",
      "ms-windows-security-overview",
      "ms-optimize-drives",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 1 impressão, 0 cliques e posição média 9 entre 2026-04-01 e 2026-09-27. A versão suplementar passa a sobrepor editorialmente o conteúdo-base, preservando a mesma URL. O diagnóstico separa lentidão de inicialização, carga, aplicativo e armazenamento; trata Gerenciador de Tarefas como sinal e não diagnóstico; remove formatação, SSD, RAM e malware como respostas automáticas; inclui matriz de decisão, critérios de parada e fontes oficiais Microsoft. Queries individuais não foram expostas pelo GSC e nenhuma foi inventada.",
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
    sources: [
      "intel-processor-temperature-2026",
      "hp-notebook-overheating-2026",
      "dell-laptop-battery-swelling-2026",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 4 impressões, 0 cliques e posição média ~50,75 entre 2026-04-01 e 2026-09-28. A única query individual exposta foi 'notebook superaquecendo' (4 impressões), tratada diretamente sem inventar variações. A versão suplementar separa carga normal, ventilação bloqueada, throttling, ventoinha, poeira, interface térmica e sinais de segurança como desligamentos e bateria estufada; evita temperatura e intervalo de pasta universais. Fontes Intel, HP e Dell ficam visíveis.",
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
    sources: [
      "ms-windows-security-overview",
      "ms-controlled-folder-access",
      "certbr-golpes",
      "cisa-stop-ransomware",
      "ms-tech-support-scams",
      "ms-phishing-protection",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 7 impressões, 0 cliques e posição média ~24,43 entre 2026-04-01 e 2026-09-27. A única query individual exposta foi 'como saber se o notebook esta com virus' (1 impressão, posição 40), tratada diretamente sem inventar variações. A versão suplementar separa sintoma de evidência, navegador de sistema, malware de comprometimento de conta e golpe de falso suporte, confirma a proteção ativa antes de recomendar qualquer ferramenta, prioriza contenção em ransomware/acesso remoto e evita promessas de detecção ou remoção total. Fontes oficiais Microsoft, CISA e CERT.br ficam visíveis.",
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
    sources: [
      "ms-win11-pro-workstations-2026",
      "nvme-official-faq",
      "ms-computer-memory-overview-2026",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-10-01",
    notes:
      "Revisão material em 2026-10-01 guiada pelo GSC: 2 impressões, 0 cliques e posição média ~30,5 entre 2026-04-01 e 2026-09-28. A única query individual exposta foi 'o que é workstation' (1 impressão, posição 57). A versão suplementar define workstation sem reduzir o conceito a 'PC caro', organiza seleção por carga real, software, CPU, GPU, RAM, armazenamento, rede, expansão, suporte e continuidade, sem configuração universal, benchmark inventado ou recomendação comercial. Fontes oficiais Microsoft/NVM Express e documentação de memória já registrada ficam visíveis; nenhuma query adicional foi inventada.",
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
    factCheckedAt: "2026-09-29",
    stableKnowledge: true,
    notes:
      "Revisão material em 2026-09-29 guiada pelo GSC: remove preços, marcas, prazos artificiais de teste, promessa de diagnóstico em minutos, alegações de laboratório/garantia e procedimentos genéricos sem relação com tela. Reorganiza o conteúdo em diagnóstico do sintoma, compatibilidade do painel, desenergização, cabo/conector, teste antes do fechamento, critérios de parada e validação pós-troca. Conhecimento técnico estável — sem fonte visível.",
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
    sources: [
      "intel-thermal-paste-2026",
      "amd-thermal-interface-2026",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 24 impressões, 0 cliques e posição média ~17,33 entre 2026-04-01 e 2026-09-27. Queries reais incluem 'como trocar a pasta termica do notebook', 'como trocar pasta termica', 'troca da pasta termica', 'troca de pasta térmica' e variações. A versão suplementar substitui editorialmente o texto monolítico antigo e reforça diagnóstico antes da desmontagem, manual do modelo, isolamento de bateria, preservação de thermal pads, reaplicação após remoção do dissipador, ausência de quantidade universal para notebook, validação antes/depois sob a mesma carga e critérios de parada.",
  },

  "como-clonar-hd-para-ssd": {
    slug: "como-clonar-hd-para-ssd",
    sources: ["ms-bitlocker-backup-key", "ms-bcdboot"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-29",
    notes:
      "Revisão material em 2026-09-29 guiada pelo GSC: 52 impressões, 0 cliques e posição média ~7,92 entre 2026-04-01 e 2026-09-27. O conteúdo passa a separar clonar, reinstalar e primeiro preservar dados; corrige a simplificação de SSD menor, trata partições de boot e BitLocker, valida o primeiro boot antes de apagar a origem e adiciona critérios de parada para HD instável. Queries individuais não foram expostas pelo GSC e nenhuma foi inventada. BitLocker e BCDBoot são ancorados em documentação oficial Microsoft.",
  },
  "como-instalar-segundo-ssd-notebook": {
    slug: "como-instalar-segundo-ssd-notebook",
    sources: [
      "ms-initialize-new-disks",
      "nvme-official-faq",
      "kingston-ssd-faq",
      "ms-bitlocker-backup-key",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-29",
    notes:
      "Revisão material em 2026-09-29 guiada pelo GSC: 7 impressões, 0 cliques e posição média ~8,43 entre 2026-04-01 e 2026-09-27. A versão suplementar substitui editorialmente a versão monolítica antiga, preservando a mesma URL. O artigo separa formato M.2 de protocolo SATA/NVMe, exige confirmação do segundo slot no modelo exato, orienta montagem reversível, diferencia disco de dados de migração do Windows, explica inicialização segura no Gerenciamento de Disco e adiciona critérios de parada. Queries individuais não foram expostas pelo GSC e nenhuma foi inventada. Compatibilidade M.2/NVMe, inicialização de disco e BitLocker são ancorados em fontes oficiais/primárias.",
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
    sources: ["fcc-home-network-tips"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-29",
    notes:
      "Revisão material em 2026-09-29 guiada pelo GSC: 257 impressões, 0 cliques e posição média ~9,22 na janela assentada até 2026-09-27. O texto deixa de tratar banda, cabo ou reset como respostas automáticas; separa descoberta, autenticação, acesso à internet, quedas e descoberta local. Comparação no mesmo ponto e influência da rede doméstica são ancoradas na orientação oficial da FCC. Queries individuais não foram expostas pelo GSC e nenhuma foi inventada.",
  },
  "como-testar-fonte-de-alimentacao-pc": {
    slug: "como-testar-fonte-de-alimentacao-pc",
    sources: ["intel-atx3-dc-regulation", "intel-atx3-short-circuit-protection"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-29",
    notes:
      "Revisão material em 2026-09-29 guiada pelo GSC: remove o teste energizado como checklist doméstico, separa sintoma de diagnóstico, explica os limites do acionamento e da leitura em repouso, prioriza substituição controlada e critérios de parada e ancora regulação/proteção em documentação oficial do guia ATX da Intel.",
  },
  "como-diagnosticar-placa-mae-defeituosa": {
    slug: "como-diagnosticar-placa-mae-defeituosa",
    sources: [
      "intel-atx3-dc-regulation",
      "intel-atx3-short-circuit-protection",
      "memtest86plus-readme",
      "memtest86plus-official",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-29",
    notes:
      "Revisão material em 2026-09-29 guiada pelo GSC: 58 impressões, 0 cliques e posição média ~9,88 entre 2026-04-01 e 2026-09-27. O artigo agora trata placa-mãe como diagnóstico por exclusão documentada, separa alimentação, POST, memória, vídeo, firmware e falhas parciais, explicita os limites de configuração mínima, LEDs/códigos e testes de memória e inclui critérios claros de parada. Queries individuais não foram expostas pelo GSC e nenhuma foi inventada. Regulação/proteção da fonte é ancorada no guia ATX da Intel e os limites diagnósticos dos testes de memória na documentação oficial do Memtest86+.",
  },

  "windows-11-lento-como-resolver": {
    slug: "windows-11-lento-como-resolver",
    sources: ["ms-pc-performance", "ms-startup-apps"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-29",
    notes:
      "Revisão material em 2026-09-29 guiada pelo GSC: remove limiares arbitrários de RAM e disco, separa saturação observada de causa diagnosticada, trata temperatura como hipótese verificável, elimina alegações internas de bancada e inclui critérios de parada. Diagnóstico de desempenho e aplicativos de inicialização ancorados em documentação oficial Microsoft.",
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
    sources: [
      "ms-recovery-options-windows",
      "ms-bitlocker-backup-key",
      "ms-win11-installation-media",
      "ms-win11-activation",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 109 impressões, 1 clique e posição média ~9,53 entre 2026-04-01 e 2026-09-27. A versão suplementar substitui editorialmente o texto monolítico antigo e esclarece que formatar/apagar uma partição não preserva os dados nela: preservação depende de backup verificado ou de opções específicas de recuperação. Separa Redefinir este PC > Manter meus arquivos, reparo/reinstalação e instalação limpa; reforça BitLocker, ativação, mídia oficial, identificação do disco e parada diante de falha física. Queries individuais não foram expostas pelo GSC e nenhuma foi inventada.",
  },

  "quanto-custa-formatar-um-computador": {
    slug: "quanto-custa-formatar-um-computador",
    sources: [
      "ms-win11-installation-media",
      "ms-win11-activation",
      "ms-bitlocker-recovery",
      "ms-onedrive-folder-backup",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 1 impressão, 0 cliques e posição média 11 entre 2026-04-01 e 2026-09-27. A nova owner suplementar preserva a fonte única de preços em src/lib/precosConfig.ts e importa MODALIDADES diretamente, sem duplicar valores em conteúdo. Diferencia mão de obra, backup, BitLocker, licença, peças e instalação por mídia oficial; remove comparação com média de mercado e trata formatação como decisão de escopo, não solução universal. Queries individuais não foram expostas pelo GSC e nenhuma foi inventada.",
  },
  "computador-entra-direto-na-bios": {
    slug: "computador-entra-direto-na-bios",
    sources: [
      "ms-boot-uefi-legacy-2026",
      "ms-bcdboot",
      "ms-bitlocker-backup-key",
      "ms-secure-boot-windows11-2026",
      "nvme-official-faq",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-29",
    notes:
      "Revisão material em 2026-09-29 guiada pelo GSC: 12 impressões, 0 cliques e posição média ~13,08 entre 2026-04-01 e 2026-09-27. A versão suplementar substitui editorialmente o texto monolítico antigo, preservando a mesma URL. Remove absolutos como 'entrou na BIOS = não encontrou sistema', lista fechada de quatro causas, regras universais de GPT/MBR, Secure Boot/Fast Boot e vida útil de CMOS; reorganiza a investigação em detecção física do disco, entrada de boot, UEFI/Legacy, estrutura do carregador, retenção de configuração e preservação de dados. A única query individual exposta foi 'como entrar na bios com o pc ligado', tratada em seção própria via Inicialização Avançada sem desviar a intenção principal. Fontes Microsoft/NVM Express sustentam firmware, BCDBoot, BitLocker, Secure Boot e M.2/NVMe.",
  },

  "erro-no-bootable-device-como-resolver": {
    slug: "erro-no-bootable-device-como-resolver",
    sources: [
      "ms-bcdboot",
      "ms-bitlocker-recovery",
      "ms-bitlocker-backup-key",
      "ms-windows-recovery-environment",
      "ms-recovery-options-windows",
      "ms-boot-uefi-legacy-2026",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-10-01",
    notes:
      "Revisão material em 2026-10-01 guiada pelo GSC: 5 impressões, 0 cliques e posição média ~38,8 entre 2026-04-01 e 2026-09-28. Queries reais expostas: 'no boot device found', 'no bootable device como resolver', 'no bootable device found' e 'no bootable device please restart'. A versão suplementar organiza o diagnóstico em detecção física do disco, Windows Boot Manager, UEFI/Legacy, WinRE e BCDBoot, reforça BitLocker antes de alterações e evita formatar/recriar EFI por tentativa. Fontes Microsoft visíveis; nenhuma query inventada.",
  },
  "troquei-o-ssd-e-o-pc-so-abre-a-bios": {
    slug: "troquei-o-ssd-e-o-pc-so-abre-a-bios",
    sources: [
      "nvme-official-faq",
      "ms-initialize-new-disks",
      "ms-boot-uefi-legacy-2026",
      "ms-bcdboot",
      "ms-bitlocker-backup-key",
      "ms-win11-installation-media",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 89 impressões, 1 clique e posição média ~9,20 entre 2026-04-01 e 2026-09-27. A versão suplementar substitui editorialmente o texto monolítico antigo e reorganiza o diagnóstico em detecção física do SSD, tipo de cenário (novo/clonado/reaproveitado/segundo disco), Windows Boot Manager, UEFI/Legacy, controlador e estrutura de boot. Remove a ideia de que SSD novo precisa ser preparado manualmente antes da instalação, evita toggles de AHCI/RAID/VMD/CSM por tentativa, reforça BitLocker e preservação do disco antigo e usa fontes oficiais NVM Express/Microsoft visíveis. Queries individuais não foram expostas pelo GSC e nenhuma foi inventada.",
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
    sources: [
      "ms-memory-manager-performance-2026",
      "ms-page-file-introduction-2026",
      "ms-computer-memory-overview-2026",
      "memtest86plus-official",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 4 impressões, 0 cliques e posição média ~24 entre 2026-04-01 e 2026-09-27. A única query individual exposta foi 'memoria insuficiente' (2 impressões, posição média 40,5); nenhuma variação foi inventada. A versão suplementar separa uso alto, cache, memória disponível, commit/pagefile, vazamento de processo, paginação, gargalo de disco e defeito físico; remove regras universais de quantidade de RAM e exige compatibilidade antes de upgrade. Fontes Microsoft e Memtest86+ ficam visíveis.",
  },
  "codigos-de-erro-tela-azul-windows": {
    slug: "codigos-de-erro-tela-azul-windows",
    sources: [
      "ms-bug-check-code-reference",
      "ms-blue-screen-data",
      "ms-small-memory-dump",
      "ms-whea-hardware-errors",
      "memtest86plus-readme",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-29",
    notes:
      "Revisão material em 2026-09-29 guiada pelo GSC: 6 impressões, 0 cliques e posição média ~7,17 entre 2026-04-01 e 2026-09-27. A versão suplementar substitui editorialmente o texto monolítico antigo e remove inferências determinísticas como stop code = peça, arquivo .sys = culpado e códigos variáveis = RAM/fonte/temperatura. Passa a usar stop code, parâmetros, contexto, dumps e recorrência como evidências complementares; WHEA é tratado como arquitetura de erro de hardware, não diagnóstico de uma peça específica. Queries individuais não foram expostas pelo GSC e nenhuma foi inventada. Fontes Microsoft visíveis sustentam bug checks, parâmetros, minidumps e WHEA.",
  },

  "testar-memoria-ram-memtest86": {
    slug: "testar-memoria-ram-memtest86",
    sources: ["memtest86plus-readme", "memtest86plus-official"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-10-01",
    notes:
      "Revisão material em 2026-10-01 guiada pelo GSC: 3 impressões, 0 cliques e posição média ~23,67 entre 2026-04-01 e 2026-09-28. A única query individual exposta foi 'teste de memoria ram' (1 impressão, posição 57). A versão suplementar aprofunda execução e interpretação do Memtest86+, reforça linha de base sem XMP/EXPO, isolamento cruzado módulo/slot, diferença entre detectar instabilidade e identificar a peça, limites de um teste sem erros e distinção entre RAM insuficiente e RAM defeituosa. Fontes oficiais Memtest86+ mantidas visíveis; nenhuma query adicional foi inventada.",
  },
  "botao-power-nao-funciona-jump-start-placa-mae": {
    slug: "botao-power-nao-funciona-jump-start-placa-mae",
    sources: [
      "msi-front-panel-power-test-2026",
      "msi-jfp1-front-panel-manual",
      "intel-atx3-dc-regulation",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-29",
    notes:
      "Revisão material em 2026-09-29 guiada pelo GSC: 8 impressões, 0 cliques e posição média ~10,88 entre 2026-04-01 e 2026-09-27. A versão suplementar substitui editorialmente o texto monolítico antigo, preservando a mesma URL. O acionamento direto do PWR_SW passa a ser tratado como teste de isolamento de botão/cabo, não como prova de fonte ou placa saudáveis; o pinout depende do manual do modelo, laptops/all-in-one são excluídos do procedimento genérico e foram adicionados critérios de parada. Queries individuais não foram expostas pelo GSC e nenhuma foi inventada. O teste do header e o papel do JFP1 são ancorados em documentação oficial MSI; limites de validação da fonte são coerentes com o guia ATX da Intel.",
  },

  "curto-circuito-placa-mae-como-identificar": {
    slug: "curto-circuito-placa-mae-como-identificar",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-29",
    stableKnowledge: true,
    notes:
      "Revisão material em 2026-09-29: o desligamento imediato passa a ser tratado como sintoma, não prova de curto; o roteiro separa fonte, cabeamento, montagem, periféricos e placa por comparação controlada, inclui segurança de cabos modulares, limites do teste de continuidade, critérios de parada e remove generalizações de frequência e custo. Conhecimento técnico estável — sem fonte visível.",
  },
  "bios-corrompida-reset-cmos-atualizacao": {
    slug: "bios-corrompida-reset-cmos-atualizacao",
    sources: [
      "dell-bios-recovery-2026",
      "hp-bios-recovery-2026",
      "ms-bitlocker-backup-key",
      "ms-bitlocker-recovery",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 11 impressões, 0 cliques e posição média 27 entre 2026-04-01 e 2026-09-27. As únicas queries individuais expostas foram 'bios corrompida' (3 impressões) e 'reparar bios' (2); o restante ficou suprimido pelo GSC e nenhuma query foi inventada. A versão suplementar separa configuração/CMOS, atualização e recuperação de firmware; trata ausência de POST como sintoma, exige procedimento do fabricante/modelo e alimentação estável, e reforça a chave BitLocker antes de alterações de firmware. Fontes oficiais Dell, HP e Microsoft ficam visíveis.",
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
    sources: [
      "ms-printer-connection-printing-2026",
      "ms-print-job-stuck-queue-2026",
      "ms-print-spooler-service-2026",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-10-01",
    notes:
      "Revisão material em 2026-10-01 guiada pelo GSC: 5 impressões, 0 cliques e posição média ~47,8 entre 2026-04-01 e 2026-09-28. Queries reais expostas: 'como tirar impressora do offline' e 'porque a impressora fica offline'. A versão suplementar separa energia/USB/rede de fila/spooler, compara IP real com porta cadastrada, trata DHCP/reserva, isolamento de clientes, filas duplicadas, driver e impressora padrão sem canibalizar o guia específico de spooler. Fontes Microsoft visíveis; nenhuma query inventada.",
  },
  "fila-de-impressao-travada-spooler-windows": {
    slug: "fila-de-impressao-travada-spooler-windows",
    sources: [
      "ms-print-spooler-service-2026",
      "ms-print-job-stuck-queue-2026",
      "ms-printer-connection-printing-2026",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 9 impressões, 0 cliques e posição média ~45,56 entre 2026-04-01 e 2026-09-27. Queries reais incluem 'enviando dados para o spool', 'reiniciar spooler de impressão', 'reiniciar spooler de impressão cmd', 'spooler de impressão não inicia' e 'spooler de impressão parando sozinho'. A versão suplementar separa trabalho preso, serviço parado, falha recorrente de driver/componente, status offline e conectividade; limita a limpeza manual à pasta PRINTERS com o serviço parado e não recomenda DLL/driver de terceiros. Fontes Microsoft visíveis.",
  },
  "hd-nao-e-reconhecido-na-bios-o-que-fazer": {
    slug: "hd-nao-e-reconhecido-na-bios-o-que-fazer",
    sources: [
      "seagate-bios-sata-not-detected-2026",
      "seagate-bios-ssd-not-detected-2026",
      "ms-initialize-new-disks",
      "nvme-official-faq",
      "seagate-noisy-drive-2026",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 68 impressões, 0 cliques e posição média ~25,94 entre 2026-04-01 e 2026-09-27. Queries reais incluem 'computador nao reconhece hd' (17 impressões), 'pc não reconhece hd' (14), 'ssd nao reconhecido', 'bios não reconhece ssd' e variações. A versão suplementar substitui editorialmente o texto monolítico antigo, separa BIOS/UEFI de Windows, SATA de M.2/NVMe, detecção de boot de estado do volume e reforça preservação de dados antes de inicialização/formatação. Fontes Seagate, Microsoft e NVM Express ficam visíveis.",
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
    sources: [
      "ms-audio-services-windows-2026",
      "ms-audio-output-undetected-2026",
      "ms-audio-headphones-no-sound-2026",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 4 impressões, 0 cliques e posição média 49 entre 2026-04-01 e 2026-09-28. As queries expostas foram 'sem som' (3 impressões) e 'testar som pc' (1). A versão suplementar organiza diagnóstico por saída, mixer, detecção, conexão física, driver e serviço; separa P2/USB/Bluetooth/HDMI e interliga os guias específicos de fone e Windows Audio. Fontes Microsoft visíveis.",
  },
  "fone-de-ouvido-nao-e-reconhecido-no-pc": {
    slug: "fone-de-ouvido-nao-e-reconhecido-no-pc",
    sources: [
      "ms-audio-output-undetected-2026",
      "ms-audio-headphones-no-sound-2026",
      "ms-microphone-problems-2026",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 40 impressões, 0 cliques e posição média ~25,08 entre 2026-04-01 e 2026-09-27. Queries reais incluem 'fone de ouvido não funciona no notebook', 'meu fone de ouvido não funciona no pc', 'pc não reconhece fone', 'entrada frontal fone de ouvido não funciona' e 'como saber se a entrada p2 esta funcionando'. A versão suplementar substitui editorialmente o texto monolítico antigo, separando P2, USB e Bluetooth, ausência de detecção de ausência de som, painel frontal de driver e áudio de microfone/permissões. Fontes Microsoft ficam visíveis.",
  },

  "servico-de-audio-do-windows-nao-esta-em-execucao": {
    slug: "servico-de-audio-do-windows-nao-esta-em-execucao",
    sources: [
      "ms-audio-services-windows-2026",
      "ms-audio-output-undetected-2026",
      "ms-audio-headphones-no-sound-2026",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 5 impressões, 0 cliques e posição média ~22,4 entre 2026-04-01 e 2026-09-27. As únicas queries individuais expostas foram 'audio.exe', 'o windows não pode encontrar audio.exe' e 'windows não pode encontrar audio.exe'. A versão suplementar separa serviço Windows Audio parado de dispositivo/driver ausente, dispositivo detectado sem reprodução e referência quebrada a um executável chamado audio.exe; não recomenda baixar EXE ou DLL avulso. Fontes oficiais Microsoft ficam visíveis e sustentam serviços, detecção e reprodução.",
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
    sources: [
      "ms-camera-privacy-windows-2026",
      "ms-camera-troubleshooting-windows",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 4 impressões, 0 cliques e posição média ~8,75 entre 2026-04-01 e 2026-09-27. A versão suplementar substitui editorialmente o texto monolítico antigo, preservando a mesma URL. A investigação passa a separar acesso do dispositivo, apps da Microsoft Store, apps de desktop, permissão do navegador/site e seleção da câmera no app. Queries individuais não foram expostas pelo GSC e nenhuma foi inventada. Fontes Microsoft visíveis sustentam a hierarquia de permissões, exceções de apps desktop, política administrativa e retorno para detecção/driver quando a câmera também falha no app Câmera.",
  },

  "webcam-usb-nao-e-detectada": {
    slug: "webcam-usb-nao-e-detectada",
    sources: ["ms-camera-troubleshooting-windows"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-29",
    notes:
      "Revisão material em 2026-09-29 guiada pelo GSC: separa ausência de enumeração de falha de captura/permissão, elimina conclusões determinísticas sobre porta, hub e USB 2/3, adiciona teste cruzado, critérios de parada e uso condicional do driver UVC. Fonte oficial Microsoft visível.",
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
    sources: [
      "ms-windows-update-cache-2026",
      "ms-windows-update-troubleshoot",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-10-01",
    notes:
      "Revisão material em 2026-10-01 guiada pelo GSC: 6 impressões, 0 cliques e posição média ~54,33 entre 2026-04-01 e 2026-09-28. A única query individual exposta foi 'software distribution' (1 impressão, posição 46). A versão suplementar explica função e limites da pasta, prioriza solucionador/triagem antes do reset, prefere renomeação reversível em vez de exclusão, separa cache de DISM/SFC/driver/espaço e recusa scripts genéricos de reset. Fontes Microsoft visíveis; nenhuma query adicional foi inventada.",
  },
  "windows-update-travado-desfazendo-alteracoes": {
    slug: "windows-update-travado-desfazendo-alteracoes",
    sources: [
      "ms-windows-update-troubleshoot",
      "ms-windows-recovery-environment",
      "ms-recovery-options-windows",
      "ms-bitlocker-recovery",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-30",
    notes:
      "Revisão material em 2026-09-30 guiada pelo GSC: 8 impressões, 0 cliques e posição média 12 entre 2026-04-01 e 2026-09-27. A query exposta 'desfazendo alterações feitas no computador' foi incorporada diretamente ao título/resposta. A versão suplementar substitui editorialmente o texto monolítico antigo, removendo tempo/LED/ventoinha como critérios determinísticos, priorizando backup, histórico/KB/código, solucionador oficial do Windows Update, hardware externo não essencial e, quando o Windows não inicia, Windows RE/Desinstalar Atualizações com chave BitLocker. Limpeza de cache deixa de ser primeira reação e formatação fica como opção posterior, não automática.",
  },

  "boot-uefi-ou-legacy-como-identificar": {
    slug: "boot-uefi-ou-legacy-como-identificar",
    sources: [
      "ms-msinfo32-2026",
      "ms-boot-uefi-legacy-2026",
      "ms-mbr2gpt-2026",
      "ms-secure-boot-windows11-2026",
      "ms-bitlocker-backup-key",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-29",
    notes:
      "Revisão material em 2026-09-29 guiada pelo GSC: 49 impressões, 0 cliques e posição média ~9,49 entre 2026-04-01 e 2026-09-27. O conteúdo responde diretamente a boot mode UEFI/Legacy, separa firmware, CSM, GPT/MBR e Secure Boot, explica os riscos de alternar o modo após a instalação e trata MBR2GPT e BitLocker com critérios de parada. Queries expostas incluem variações de 'boot mode uefi ou legacy'; nenhuma consulta além das retornadas pelo GSC foi inventada. Fontes Microsoft visíveis sustentam identificação, boot mode, conversão e segurança.",
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
    sources: [
      "ms-usb-not-recognized-2026",
      "ms-device-manager-error-codes-2026",
      "ms-usb-enumeration-unknown-device-2026",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-10-01",
    notes:
      "Revisão material em 2026-10-01 guiada pelo GSC: 2 impressões, 0 cliques e posição média ~44,5 entre 2026-04-01 e 2026-09-28. Queries reais expostas: 'dispositivo usb não reconhecido' e 'usb não reconhecido'. A versão suplementar aprofunda isolamento por porta/cabo/dispositivo/alimentação, enumeração USB, códigos do Gerenciador de Dispositivos, limites de reinstalação de driver e proteção de dados em armazenamento externo. Fontes Microsoft visíveis; nenhuma query inventada.",
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
    sources: [
      "ms-diskpart-attributes-disk-2026",
      "ms-diskpart-attributes-volume-2026",
      "ms-chkdsk-2026",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-10-01",
    notes:
      "Revisão material em 2026-10-01 guiada pelo GSC: 2 impressões, 0 cliques e posição média ~24,5 entre 2026-04-01 e 2026-09-28. A única query individual exposta foi 'usb protegido contra gravação' (1 impressão, posição 34). A versão suplementar separa trava física, atributo readonly de disco/volume, política, corrupção lógica e possível falha de controlador; prioriza cópia dos dados, usa DiskPart apenas no alvo identificado e limita CHKDSK ao sistema de arquivos. Fontes Microsoft visíveis; nenhuma query adicional foi inventada.",
  },
  "historico-de-arquivos-windows-como-configurar": {
    slug: "historico-de-arquivos-windows-como-configurar",
    sources: [
      "ms-file-history",
      "ms-onedrive-folder-backup",
      "cisa-backup",
      "nist-sp-800-34",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-10-01",
    notes:
      "Revisão material em 2026-10-01 guiada pelo GSC: 1 impressão, 0 cliques e posição 10 entre 2026-04-01 e 2026-09-28. O GSC não expôs queries individuais para a URL e nenhuma consulta foi inventada. A versão suplementar aprofunda configuração, destino separado, escopo, capacidade, retenção, restauração de teste, diferença entre Histórico de Arquivos e sincronização, papel complementar do OneDrive e limites do recurso como única estratégia de backup. Fontes Microsoft, CISA e NIST ficam visíveis.",
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
    sources: [
      "ms-file-history",
      "ms-windows-file-recovery",
      "ms-onedrive-folder-backup",
      "ms-chkdsk-2026",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-10-01",
    notes:
      "Revisão material em 2026-10-01 guiada pelo GSC: 1 impressão, 0 cliques e posição 38 entre 2026-04-01 e 2026-09-28 para a query real 'arquivo corrompido'. A versão suplementar preserva o original, diferencia corrupção de incompatibilidade/download incompleto, prioriza versões anteriores/backup, limita CHKDSK ao sistema de arquivos, separa recuperação de arquivo apagado de reparo de documento e define quando vários arquivos falhando indicam problema de armazenamento. Fontes Microsoft visíveis; nenhuma query adicional foi inventada.",
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

  "ssd-nao-aparece-no-instalador-do-windows": {
    slug: "ssd-nao-aparece-no-instalador-do-windows",
    sources: [
      "ms-win11-installation-media",
      "ms-windows-setup-boot-start-driver",
      "ms-bitlocker-backup-key",
      "nvme-official-faq",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-26",
    notes:
      "Revisão material concluída com documentação oficial Microsoft e NVM Express: firmware separado do Windows Setup, driver de armazenamento do fabricante, cautela com VMD/RST/RAID/AHCI, compatibilidade M.2/NVMe, mídia oficial, BitLocker e limite destrutivo do DiskPart.",
  },

  "como-instalar-ubuntu-do-zero": {
    slug: "como-instalar-ubuntu-do-zero",
    sources: ["ubuntu-desktop-install-2604", "ubuntu-bootable-usb-current"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-09-26",
    notes:
      "Reescrita material com documentação oficial Ubuntu 26.04 e documentação corrente de mídia bootável: prioriza backup, seleção correta do disco, diferença entre apagar/dual boot/manual, alerta de BitLocker, proteção da senha de criptografia, mídia oficial e atualização pós-instalação. Sem comando destrutivo apresentado como rotina e sem promessa de compatibilidade universal.",
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
