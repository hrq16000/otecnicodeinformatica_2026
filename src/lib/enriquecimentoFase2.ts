/**
 * FASE 2 — BIBLIOTECA NACIONAL DE DECISÃO E DIAGNÓSTICO.
 *
 * Camada de enriquecimento aditiva para artigos do blog que a auditoria
 * (`src/data/auditoriaConteudo.json`) apontou sem:
 *   • fonte primária citada de forma visível;
 *   • bloco explícito de limite / quando parar;
 *   • ligação semântica suficiente (mínimo 2 destinos internos).
 *
 * Regras inegociáveis desta camada:
 *   • NÃO cria URL nova, não altera canonical, robots nem indexabilidade;
 *   • toda fonte tem URL real conferida (HTTP 200) em 2026-09-02 e sustenta
 *     uma afirmação concreta do pilar — nada presumido;
 *   • todo link interno aponta para rota que já existe no sitemap curado;
 *   • nenhum preço, prazo, avaliação ou promessa entra aqui;
 *   • nunca recomendamos desativar proteção de segurança de forma permanente.
 */
import type { FontePrimaria } from "@/lib/enriquecimento";

export const FASE2_REVISADO_EM = "2026-09-02";

export type LinkFase2 = { to: string; anchor: string; nota: string };

export type PilarFase2 = {
  id: string;
  titulo: string;
  /** Frase autoral que abre o bloco — muda por pilar, de propósito. */
  intro: string;
  /** Até onde o próprio usuário pode ir com segurança. */
  ateOndeIr: string[];
  /** Onde parar — usa marcadores explícitos de limite. */
  quandoParar: string[];
  fontes: FontePrimaria[];
  links: LinkFase2[];
  /** Slugs de /blog/<slug> que recebem este bloco. */
  slugs: string[];
};

const F = {
  troubleshoot: {
    titulo: "Solução de problemas do Windows (documentação oficial)",
    url: "https://learn.microsoft.com/pt-br/troubleshoot/windows-client/",
    nota: "Central de diagnóstico da Microsoft para clientes Windows.",
  },
  bugCheck: {
    titulo: "Referência de códigos de verificação de bug (BSOD)",
    url: "https://learn.microsoft.com/pt-br/windows-hardware/drivers/debugger/bug-check-code-reference2",
    nota: "Lista oficial do significado de cada código de tela azul.",
  },
  stopError: {
    titulo: "Solucionar erros de parada (tela azul)",
    url: "https://learn.microsoft.com/pt-br/troubleshoot/windows-client/performance/stop-error-or-blue-screen-error-troubleshooting",
    nota: "Procedimento oficial de coleta e leitura de despejo de memória.",
  },
  uefiLegacy: {
    titulo: "Inicializar em modo UEFI ou BIOS legado",
    url: "https://learn.microsoft.com/pt-br/windows-hardware/manufacture/desktop/boot-to-uefi-mode-or-legacy-bios-mode",
    nota: "Define a diferença entre UEFI e legado e como identificar o modo.",
  },
  bootSeguro: {
    titulo: "Como o Windows protege o processo de inicialização",
    url: "https://learn.microsoft.com/pt-br/windows/security/operating-system-security/system-security/secure-the-windows-10-boot-process",
    nota: "Explica Secure Boot e por que desativá-lo não é solução permanente.",
  },
  win11Req: {
    titulo: "Requisitos do Windows 11",
    url: "https://learn.microsoft.com/pt-br/windows/whats-new/windows-11-requirements",
    nota: "Requisitos mínimos oficiais, incluindo firmware e TPM.",
  },
  tpm: {
    titulo: "Visão geral do TPM",
    url: "https://learn.microsoft.com/pt-br/windows/security/hardware-security/tpm/trusted-platform-module-overview",
    nota: "O que o módulo de plataforma confiável faz e onde é exigido.",
  },
  update: {
    titulo: "Solucionar problemas do Windows Update",
    url: "https://learn.microsoft.com/pt-br/troubleshoot/windows-client/installing-updates-features-roles/windows-update-issues-troubleshooting",
    nota: "Fluxo oficial para atualização travada ou com erro.",
  },
  updateDeploy: {
    titulo: "Solução de problemas de atualização (implantação)",
    url: "https://learn.microsoft.com/pt-br/windows/deployment/update/windows-update-troubleshooting",
    nota: "Detalha componentes do Windows Update e cache de pacotes.",
  },
  bitlocker: {
    titulo: "Documentação do BitLocker",
    url: "https://learn.microsoft.com/pt-br/windows/security/operating-system-security/data-protection/bitlocker/",
    nota: "Criptografia de disco e recuperação de chave antes de mexer no disco.",
  },
  storage: {
    titulo: "Armazenamento no Windows Server",
    url: "https://learn.microsoft.com/pt-br/windows-server/storage/storage-spaces/overview",
    nota: "Conceitos oficiais de pool, resiliência e falha de disco.",
  },
  nist88: {
    titulo: "NIST SP 800-88 Rev. 1 — Guidelines for Media Sanitization",
    url: "https://csrc.nist.gov/pubs/sp/800/88/r1/final",
    nota: "Referência para descarte e limpeza segura de mídia de armazenamento.",
  },
  nist34: {
    titulo: "NIST SP 800-34 Rev. 1 — Contingency Planning Guide",
    url: "https://csrc.nist.gov/pubs/sp/800/34/r1/final",
    nota: "Base para política de backup, cópia externa e teste de restauração.",
  },
  cisaRansom: {
    titulo: "CISA — StopRansomware",
    url: "https://www.cisa.gov/stopransomware",
    nota: "Orientação oficial de prevenção e resposta a ransomware.",
  },
  cisaSecure: {
    titulo: "CISA — Secure Our World",
    url: "https://www.cisa.gov/secure-our-world",
    nota: "Práticas básicas de proteção de contas e dispositivos.",
  },
  cartilha: {
    titulo: "Cartilha de Segurança para Internet (CERT.br)",
    url: "https://cartilha.cert.br/",
    nota: "Referência brasileira sobre golpes, senhas e proteção de rede.",
  },
  certbr: {
    titulo: "CERT.br",
    url: "https://www.cert.br/",
    nota: "Centro nacional de tratamento de incidentes de segurança.",
  },
  wifi: {
    titulo: "Wi-Fi Alliance — tecnologias Wi-Fi",
    url: "https://www.wi-fi.org/discover-wi-fi",
    nota: "Definições oficiais de faixas, gerações e certificação Wi-Fi.",
  },
  suporteWin: {
    titulo: "Suporte oficial do Windows",
    url: "https://support.microsoft.com/pt-br/windows",
    nota: "Procedimentos de usuário mantidos pela Microsoft.",
  },
} satisfies Record<string, FontePrimaria>;

export const PILARES_FASE2: PilarFase2[] = [
  {
    id: "inicializacao",
    titulo: "Limites e fontes: inicialização, BIOS/UEFI e boot",
    intro:
      "Falha que aparece antes do Windows terminar de carregar quase nunca se resolve reinstalando o sistema por tentativa. O caminho seguro é identificar em que etapa a inicialização para — firmware, seleção de disco ou carregamento do sistema — e só então decidir.",
    ateOndeIr: [
      "Confirmar em que modo o equipamento inicializa (UEFI ou legado) e se o disco correto aparece na lista de boot.",
      "Anotar a mensagem exata da tela e em que momento ela aparece: isso separa problema de firmware de problema de sistema.",
      "Desconectar dispositivos USB e cartões antes de repetir o teste, para eliminar boot por mídia externa.",
    ],
    quandoParar: [
      "Não prossiga com atualização de BIOS/UEFI se o equipamento desliga sozinho ou a energia é instável: interrupção no meio do processo pode inutilizar a placa.",
      "Não recomendamos desativar Secure Boot como solução definitiva — é redução permanente de proteção para contornar um sintoma.",
      "Se o disco não aparece no firmware, pare: há risco de perda de dados em tentativas repetidas de reparo automático.",
    ],
    fontes: [F.uefiLegacy, F.bootSeguro, F.troubleshoot],
    links: [
      { to: "/problemas/windows-nao-inicia", anchor: "Windows não inicia", nota: "sintoma-pai deste cluster" },
      { to: "/ferramentas/roteiro-falha-de-inicializacao", anchor: "roteiro de falha de inicialização", nota: "checklist sem abrir o equipamento" },
      { to: "/decisoes/formatar-ou-reparar", anchor: "formatar ou reparar", nota: "decisão antes de autorizar serviço" },
      { to: "/glossario/uefi", anchor: "UEFI", nota: "definição do termo" },
      { to: "/servicos/formatacao", anchor: "formatação com preservação de dados", nota: "quando o reparo local não resolve" },
    ],
    slugs: [
      "bios-corrompida-reset-cmos-atualizacao",
      "boot-uefi-ou-legacy-como-identificar",
      "computador-entra-direto-na-bios",
      "erro-no-bootable-device-como-resolver",
      "hd-nao-e-reconhecido-na-bios-o-que-fazer",
      "ordem-de-boot-na-bios-como-configurar",
      "troquei-o-ssd-e-o-pc-so-abre-a-bios",
      "windows-reparo-automatico-em-loop",
    ],
  },
  {
    id: "estabilidade",
    titulo: "Limites e fontes: tela azul e travamentos",
    intro:
      "Tela azul é sintoma, não diagnóstico. O código exibido indica a família da falha (driver, memória, disco, energia) e existe documentação oficial listando o significado de cada um — é por ali que a investigação começa.",
    ateOndeIr: [
      "Registrar o código exato (por exemplo, o texto após STOP) e em que situação ele aparece: ao ligar, sob carga ou de forma aleatória.",
      "Verificar se a falha começou depois de uma atualização, de um driver novo ou de uma troca de peça.",
      "Testar com o equipamento frio e depois de uso prolongado — falha só sob temperatura muda a hipótese.",
    ],
    quandoParar: [
      "Interrompa o uso normal se as telas azuis vierem acompanhadas de ruído de disco ou de arquivos que somem: há risco de perda de dados a cada reinício.",
      "Não recomendamos desinstalar antivírus ou desativar proteção de memória para 'testar' — a proteção não é a causa provável e a exposição é real.",
      "Se a tela azul ocorre já na inicialização e impede o acesso ao sistema, pare de repetir reinícios e trate como falha de inicialização.",
    ],
    fontes: [F.bugCheck, F.stopError, F.troubleshoot],
    links: [
      { to: "/problemas/tela-azul", anchor: "tela azul", nota: "página de sintoma" },
      { to: "/glossario/bsod", anchor: "BSOD", nota: "definição técnica" },
      { to: "/entidades/windows", anchor: "entidade Windows", nota: "mapa de conteúdo relacionado" },
      { to: "/decisoes/backup-antes-da-manutencao", anchor: "backup antes da manutenção", nota: "primeiro passo antes de qualquer reparo" },
      { to: "/servicos/manutencao-de-computador", anchor: "manutenção de computador", nota: "quando o diagnóstico exige bancada" },
    ],
    slugs: [
      "codigos-de-erro-tela-azul-windows",
      "como-resolver-tela-azul-windows",
      "testar-memoria-ram-memtest86",
    ],
  },
  {
    id: "armazenamento",
    titulo: "Limites e fontes: disco, SSD e dados",
    intro:
      "Disco em degradação não avisa duas vezes. Quando aparecem setores defeituosos, lentidão intermitente ou ruído mecânico, cada hora ligado reduz a chance de cópia completa — a ordem correta é copiar primeiro e investigar depois.",
    ateOndeIr: [
      "Consultar o estado S.M.A.R.T. e anotar contadores de setor realocado e de erro pendente.",
      "Copiar imediatamente os arquivos insubstituíveis para outra mídia antes de qualquer teste de superfície.",
      "Conferir se o disco está criptografado e se a chave de recuperação está acessível antes de mover a unidade de máquina.",
    ],
    quandoParar: [
      "Pare imediatamente se houver clique, arranhado ou desligamento do disco durante a cópia: continuar ligado reduz a chance de recuperação.",
      "Não prossiga com verificação de superfície ou reparticionamento em disco que já apresenta falha — é o cenário clássico de perda definitiva.",
      "Não recomendamos abrir o disco fora de ambiente adequado; tentativa caseira costuma encerrar a possibilidade de recuperação.",
    ],
    fontes: [F.storage, F.bitlocker, F.nist88],
    links: [
      { to: "/problemas/hd-fazendo-barulho", anchor: "HD fazendo barulho", nota: "sintoma de urgência" },
      { to: "/decisoes/hd-com-ruido", anchor: "guia de decisão sobre HD com ruído", nota: "o que fazer nas primeiras horas" },
      { to: "/ferramentas/verificador-de-backup", anchor: "verificador de backup", nota: "checklist antes de mexer no disco" },
      { to: "/glossario/smart", anchor: "S.M.A.R.T.", nota: "como ler o indicador" },
      { to: "/servicos/recuperacao-de-dados", anchor: "recuperação de dados", nota: "tentativa técnica, sem garantia de resultado" },
    ],
    slugs: [
      "como-clonar-hd-para-ssd",
      "como-instalar-segundo-ssd-notebook",
      "como-recuperar-dados-hd-com-defeito",
      "disco-com-setores-defeituosos-smart-o-que-fazer",
      "quando-trocar-hd-por-ssd",
      "ssd-nvme-nao-aparece-no-gerenciador-de-discos",
      "como-fazer-upgrade-ssd-nvme",
    ],
  },
  {
    id: "desempenho",
    titulo: "Limites e fontes: desempenho, memória e lentidão",
    intro:
      "Lentidão tem causas concorrentes: disco no fim da vida, memória insuficiente para o uso real, temperatura alta e software em excesso na inicialização. Trocar peça antes de identificar qual delas pesa é o caminho mais caro.",
    ateOndeIr: [
      "Observar quando a lentidão aparece: ao ligar, ao abrir muitos programas ou depois de minutos de uso — cada padrão aponta para uma causa diferente.",
      "Verificar o uso de disco, memória e CPU em repouso e sob a carga real do dia a dia.",
      "Revisar o que inicia junto com o sistema antes de considerar qualquer upgrade.",
    ],
    quandoParar: [
      "Interrompa a investigação por software se o equipamento também desliga sozinho ou esquenta demais: aí o problema não é desempenho, é hardware.",
      "Não recomendamos 'otimizadores' que prometem ganho automático — costumam remover componentes do sistema e criar falha nova.",
      "Se a lentidão volta poucos dias depois de cada formatação, pare de formatar: o padrão indica causa física.",
    ],
    fontes: [F.troubleshoot, F.suporteWin],
    links: [
      { to: "/problemas/computador-lento", anchor: "computador lento", nota: "sintoma-pai" },
      { to: "/ferramentas/checklist-computador-lento", anchor: "checklist de computador lento", nota: "verificação guiada" },
      { to: "/decisoes/ssd-ou-memoria-ram", anchor: "SSD ou memória RAM", nota: "onde investir primeiro" },
      { to: "/entidades/computador-lento", anchor: "entidade computador lento", nota: "mapa do tema" },
      { to: "/servicos/upgrade-ssd-ram", anchor: "upgrade de SSD e memória", nota: "execução com diagnóstico prévio" },
    ],
    slugs: [
      "computador-lento-causas-solucoes",
      "memoria-ram-insuficiente-sintomas",
      "windows-11-lento-como-resolver",
      "limpar-arquivos-temporarios-windows",
    ],
  },
  {
    id: "windows-atualizacoes",
    titulo: "Limites e fontes: Windows, atualizações e instalação",
    intro:
      "Atualização travada raramente é 'defeito do Windows': costuma ser espaço em disco, cache de pacotes corrompido, requisito de firmware não atendido ou driver incompatível. A documentação oficial descreve os componentes envolvidos e a ordem de verificação.",
    ateOndeIr: [
      "Conferir espaço livre no disco do sistema e se há energia estável durante o processo.",
      "Anotar o código de erro exibido pelo Windows Update — ele direciona o procedimento correto.",
      "Verificar requisitos de firmware e TPM antes de tentar migrar de versão principal.",
    ],
    quandoParar: [
      "Não prossiga desligando o computador no meio de 'desfazendo alterações': há risco de perda de dados e de sistema não inicializável.",
      "Não recomendamos remover manualmente pastas de sistema para 'liberar' a atualização sem antes ter backup verificado.",
      "Se o equipamento não atende aos requisitos oficiais, pare a tentativa de atualização e trate como decisão de troca ou permanência.",
    ],
    fontes: [F.update, F.updateDeploy, F.win11Req, F.tpm],
    links: [
      { to: "/decisoes/atualizar-para-windows-11", anchor: "atualizar para o Windows 11", nota: "decisão com requisitos reais" },
      { to: "/entidades/windows", anchor: "entidade Windows", nota: "conteúdo conectado" },
      { to: "/problemas/windows-nao-inicia", anchor: "Windows não inicia", nota: "quando a atualização quebra o boot" },
      { to: "/ferramentas/checklist-antes-de-formatar", anchor: "checklist antes de formatar", nota: "o que salvar antes" },
      { to: "/servicos/formatacao", anchor: "formatação e reinstalação", nota: "execução com preservação de dados" },
    ],
    slugs: [
      "como-instalar-windows-11-do-zero",
      "windows-update-nao-funciona-o-que-verificar",
      "windows-update-travado-desfazendo-alteracoes",
      "limpar-cache-do-windows-update-softwaredistribution",
      "como-formatar-pc-sem-perder-arquivos",
      "quanto-custa-formatar-um-computador",
    ],
  },
  {
    id: "redes",
    titulo: "Limites e fontes: rede, Wi-Fi e internet",
    intro:
      "Wi-Fi instável e internet lenta são problemas diferentes com sintomas parecidos. Separar o que é enlace sem fio, o que é roteador e o que é serviço do provedor evita trocar equipamento sem necessidade.",
    ateOndeIr: [
      "Comparar o comportamento por cabo e por Wi-Fi no mesmo momento: isso isola rede local de serviço contratado.",
      "Verificar em qual faixa o dispositivo está conectado e quantas paredes existem entre ele e o roteador.",
      "Listar os dispositivos conectados e observar se a queda coincide com horário de uso pesado.",
    ],
    quandoParar: [
      "Não recomendamos deixar a rede sem senha ou com criptografia antiga para 'facilitar' a conexão — é exposição permanente da rede doméstica.",
      "Interrompa a troca de equipamentos se o problema ocorre também por cabo em todos os dispositivos: o caso é do provedor.",
      "Se aparecerem dispositivos desconhecidos na rede, pare de investigar desempenho e trate como incidente de segurança.",
    ],
    fontes: [F.wifi, F.cartilha, F.certbr],
    links: [
      { to: "/problemas/wifi-instavel", anchor: "Wi-Fi instável", nota: "sintoma-pai" },
      { to: "/ferramentas/roteiro-wifi-instavel", anchor: "roteiro de Wi-Fi instável", nota: "sequência de testes" },
      { to: "/entidades/wifi", anchor: "entidade Wi-Fi", nota: "mapa do tema" },
      { to: "/glossario/dns", anchor: "DNS", nota: "termo citado no diagnóstico" },
      { to: "/servicos/redes-e-wifi", anchor: "redes e Wi-Fi", nota: "ajuste presencial quando o caso é de cobertura" },
    ],
    slugs: [
      "como-conectar-wifi-tv-nao-conecta",
      "como-configurar-roteador-wifi-iniciantes",
      "como-melhorar-sinal-wifi-em-casa",
      "como-saber-quem-esta-usando-meu-wifi",
      "internet-lenta-provedor-ou-roteador",
    ],
  },
  {
    id: "seguranca-backup",
    titulo: "Limites e fontes: segurança, vírus e backup",
    intro:
      "Prevenção e resposta a incidente são etapas distintas. Backup testado é o que separa um transtorno de uma perda definitiva — e existe referência pública, tanto brasileira quanto internacional, para orientar a política mínima.",
    ateOndeIr: [
      "Manter pelo menos uma cópia fora do equipamento e verificar periodicamente se ela restaura de verdade.",
      "Revisar contas com acesso ao computador e ativar verificação em duas etapas nos serviços críticos.",
      "Registrar o que mudou pouco antes do problema: instalação, anexo aberto, dispositivo conectado.",
    ],
    quandoParar: [
      "Se houver suspeita de ransomware, pare de usar o equipamento e não pague resgate: desconecte da rede e preserve as evidências.",
      "Não recomendamos desativar antivírus ou controle de conta de usuário de forma permanente para rodar um programa.",
      "Não prossiga com formatação enquanto não houver backup verificado — é o cenário mais comum de perda irreversível.",
    ],
    fontes: [F.cisaRansom, F.cisaSecure, F.cartilha, F.nist34],
    links: [
      { to: "/decisoes/backup-antes-da-manutencao", anchor: "backup antes da manutenção", nota: "o que copiar e em que ordem" },
      { to: "/decisoes/nuvem-ou-hd-externo", anchor: "nuvem ou HD externo", nota: "escolha de mídia" },
      { to: "/ferramentas/verificador-de-backup", anchor: "verificador de backup", nota: "teste de restauração" },
      { to: "/entidades/backup", anchor: "entidade backup", nota: "mapa do tema" },
      { to: "/servicos/remocao-de-virus", anchor: "remoção de vírus", nota: "quando o sistema já está comprometido" },
    ],
    slugs: [
      "backup-como-proteger-seus-arquivos",
      "backup-nuvem-empresas-qual-escolher",
      "como-escolher-um-bom-antivirus",
      "como-proteger-computador-golpes-internet",
      "como-remover-virus-windows-iniciantes",
      "como-saber-se-pc-tem-virus-malware",
      "ransomware-como-proteger-empresa",
      "organizacao-de-ti-para-pequenos-escritorios",
    ],
  },
  {
    id: "hardware-energia",
    titulo: "Limites e fontes: energia, temperatura e hardware",
    intro:
      "Equipamento que não liga, desliga sozinho ou esquenta demais exige critério antes de abrir. Alguns testes são seguros; outros expõem o usuário a risco elétrico e podem transformar um reparo simples em prejuízo.",
    ateOndeIr: [
      "Testar outra tomada e outro cabo/fonte compatível antes de qualquer conclusão sobre a placa.",
      "Observar sinais externos: LED, ventoinha, apito e se a tela chega a exibir algo.",
      "Verificar se a base de ventilação está obstruída e se o desligamento acontece sempre sob carga.",
    ],
    quandoParar: [
      "Se houver cheiro de queimado, estalo ou marca escura na placa, pare imediatamente e não tente ligar de novo.",
      "Não recomendamos ponte manual em conector de placa-mãe nem teste de fonte improvisado: há risco elétrico e de dano permanente.",
      "Em equipamento que sofreu contato com líquido, não prossiga ligando para 'ver se funciona' — secagem e limpeza vêm antes.",
    ],
    fontes: [F.troubleshoot, F.suporteWin],
    links: [
      { to: "/problemas/notebook-nao-liga", anchor: "notebook não liga", nota: "sintoma-pai" },
      { to: "/problemas/computador-esquentando", anchor: "computador esquentando", nota: "sintoma correlato" },
      { to: "/decisoes/consertar-ou-substituir", anchor: "consertar ou substituir", nota: "decisão de custo" },
      { to: "/glossario/thermal-throttling", anchor: "thermal throttling", nota: "por que o desempenho cai com calor" },
      { to: "/servicos/manutencao-de-notebook", anchor: "manutenção de notebook", nota: "limpeza e reparo em bancada" },
    ],
    slugs: [
      "botao-power-nao-funciona-jump-start-placa-mae",
      "como-diagnosticar-placa-mae-defeituosa",
      "como-limpar-notebook-por-dentro",
      "como-testar-fonte-de-alimentacao-pc",
      "como-trocar-pasta-termica-notebook",
      "como-trocar-tela-notebook-passo-a-passo",
      "curto-circuito-placa-mae-como-identificar",
      "notebook-nao-liga-o-que-fazer",
      "notebook-superaquecendo-o-que-fazer",
      "como-escolher-uma-workstation",
    ],
  },
  {
    id: "perifericos",
    titulo: "Limites e fontes: periféricos, áudio e impressão",
    intro:
      "Periférico que some da lista de dispositivos costuma ser driver, serviço do sistema ou porta — nessa ordem. Trocar o acessório antes de checar o sistema é o erro mais comum e o mais caro por unidade.",
    ateOndeIr: [
      "Testar o mesmo periférico em outra porta e, se possível, em outro computador.",
      "Verificar se o dispositivo aparece no gerenciador de dispositivos e com qual estado.",
      "Conferir permissões de aplicativo e serviços do sistema relacionados a áudio, câmera ou fila de impressão.",
    ],
    quandoParar: [
      "Não recomendamos instalar driver de origem desconhecida oferecido por site de busca — é vetor frequente de infecção.",
      "Interrompa a remoção manual de arquivos de fila de impressão se não houver backup e ponto de restauração.",
      "Se o periférico causa desligamento ou reinício ao ser conectado, pare de conectá-lo: pode haver falha elétrica na porta.",
    ],
    fontes: [F.suporteWin, F.troubleshoot],
    links: [
      { to: "/problemas/impressora-nao-imprime", anchor: "impressora não imprime", nota: "sintoma-pai de impressão" },
      { to: "/problemas/teclado-notebook-nao-funciona", anchor: "teclado do notebook não funciona", nota: "sintoma correlato" },
      { to: "/glossario/driver", anchor: "driver", nota: "definição do termo" },
      { to: "/entidades/windows", anchor: "entidade Windows", nota: "mapa do tema" },
      { to: "/servicos/manutencao-de-computador", anchor: "manutenção de computador", nota: "quando o problema é a porta ou a placa" },
    ],
    slugs: [
      "como-instalar-impressora-windows-passo-a-passo",
      "computador-sem-som-o-que-verificar",
      "fila-de-impressao-travada-spooler-windows",
      "fone-de-ouvido-nao-e-reconhecido-no-pc",
      "impressora-offline-como-resolver",
      "permissoes-de-camera-no-windows",
      "servico-de-audio-do-windows-nao-esta-em-execucao",
      "webcam-nao-funciona-o-que-verificar",
      "webcam-usb-nao-e-detectada",
    ],
  },
  {
    id: "fundamentos",
    titulo: "Limites e fontes: fundamentos de informática",
    intro:
      "Conteúdo introdutório também precisa de limite claro: saber o que cada componente faz ajuda a decidir, mas não substitui diagnóstico quando o equipamento já apresenta falha.",
    ateOndeIr: [
      "Aprender a identificar os componentes do próprio equipamento e o que cada um limita no uso real.",
      "Praticar organização de arquivos e rotina de cópia antes de qualquer experimento no sistema.",
      "Usar fontes oficiais para conferir procedimento antes de seguir tutorial de terceiros.",
    ],
    quandoParar: [
      "Não prossiga aplicando procedimento avançado em equipamento de trabalho sem backup verificado.",
      "Não recomendamos seguir tutorial que peça para desativar proteção do sistema como primeiro passo.",
      "Se o equipamento já apresenta falha física, pare o aprendizado prático nele e trate o defeito primeiro.",
    ],
    fontes: [F.suporteWin, F.cartilha],
    links: [
      { to: "/guia-tecnico-informatica", anchor: "guia técnico de informática", nota: "hub nacional de temas" },
      { to: "/glossario", anchor: "glossário técnico", nota: "termos usados no diagnóstico" },
      { to: "/ferramentas", anchor: "ferramentas e checklists", nota: "roteiros aplicáveis" },
      { to: "/entidades", anchor: "mapa de entidades", nota: "como os temas se conectam" },
      { to: "/problemas", anchor: "central de problemas", nota: "quando já existe sintoma" },
    ],
    slugs: ["como-aprender-informatica", "informatica-basica", "o-que-e-informatica"],
  },
];

const INDICE_FASE2 = new Map<string, PilarFase2>();
for (const pilar of PILARES_FASE2) {
  for (const slug of pilar.slugs) INDICE_FASE2.set(slug, pilar);
}

export function getEnriquecimentoFase2(slug?: string | null): PilarFase2 | null {
  if (!slug) return null;
  return INDICE_FASE2.get(slug) ?? null;
}

export const FASE2_SLUGS = [...INDICE_FASE2.keys()];
