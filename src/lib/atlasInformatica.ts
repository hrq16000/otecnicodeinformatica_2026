/**
 * ============================================================================
 * ATLAS DE INFORMÁTICA — FASES 1–2 (fonte única do hub /guia-tecnico-informatica)
 * ============================================================================
 * Nove temas nacionais, cada um com uma trilha editorial fixa de cinco etapas:
 *
 *   aprender → identificar → verificar → parar → resolver
 *
 * Fase 2 (2026-09-01) acrescenta, sem criar URL nova e sem alterar canonical:
 *  - veredito técnico da bancada por tema (posição honesta, sem número inventado);
 *  - fontes primárias visíveis SOMENTE nos temas cujo conteúdo depende de
 *    comportamento ou política externa (Microsoft, CISA, CERT.br, NIST,
 *    Wi-Fi Alliance) — temas de conhecimento estável ficam sem fonte, com o
 *    limite declarado no bloco institucional;
 *  - guias de decisão independentes: âncora própria (#decisao-<id>) e sinais
 *    observáveis dos dois lados da decisão.
 *
 * Regras não negociáveis:
 *  - TODO link aponta para URL que já existe (rota estática, /problemas/*,
 *    /solucoes/* ou /blog/<slug> APROVADO no registro editorial fail-closed).
 *  - Nenhum artigo é listado aqui sem aprovação em blogEditorialRegistry.ts;
 *    a renderização refiltra via isEditorialApproved() (fail-closed em dobro).
 *  - Nada aqui cria URL nova, promete prazo, inventa avaliação ou estatística.
 *  - Este módulo NÃO decide indexação de nada: é só malha de descoberta.
 *
 * Gates que dependem deste arquivo (parse por regex — manter literais simples;
 * veredito e fontes SEM aspas duplas internas; id de tema adjacente a titulo;
 * id de guia adjacente a pergunta):
 *  - scripts/check-atlas-hub.mjs        (SSR do hub: links, temas, JSON-LD)
 *  - src/__tests__/atlas-informatica.test.ts (integridade de dados e rotas)
 */
import { isEditorialApproved } from "@/lib/blogEditorialRegistry";
import { EDITORIAL_HUB_SUMMARIES } from "@/lib/editorialHubSummaries";

/** Data da última revisão material desta curadoria (Fase 2 do Atlas). */
export const ATLAS_REVISADO_EM = "2026-09-01";

export type AtlasEtapaId = "aprender" | "identificar" | "verificar" | "parar" | "resolver";

/** Ordem canônica da trilha — validada em teste. */
export const ATLAS_ETAPAS: readonly AtlasEtapaId[] = [
  "aprender",
  "identificar",
  "verificar",
  "parar",
  "resolver",
] as const;

export const ATLAS_ETAPA_LABEL: Record<AtlasEtapaId, string> = {
  aprender: "Aprender o fundamento",
  identificar: "Identificar o sintoma",
  verificar: "Verificações seguras",
  parar: "Quando parar",
  resolver: "Escolher a solução",
};

export interface AtlasEtapa {
  etapa: AtlasEtapaId;
  desc: string;
  to: string;
  linkLabel: string;
}

export interface AtlasLinkRef {
  to: string;
  label: string;
}

/** Fonte primária citada de forma visível no tema (Fase 2). */
export interface AtlasFonte {
  titulo: string;
  url: string;
  nota: string;
}

export interface AtlasTema {
  /** Também usado como âncora `#tema-<id>` e no ItemList do JSON-LD. */
  id: string;
  titulo: string;
  resumo: string;
  /** Veredito técnico da bancada (Fase 2) — posição honesta, sem número inventado. */
  veredito: string;
  trilha: AtlasEtapa[];
  /** Slugs de /blog aprovados — refiltrados por isEditorialApproved(). */
  artigos: string[];
  problemas: AtlasLinkRef[];
  servicos: AtlasLinkRef[];
  /** Fontes primárias SOMENTE quando o tema depende de comportamento/política externa. */
  fontes?: AtlasFonte[];
}

export const ATLAS_TEMAS: AtlasTema[] = [
  {
    id: "fundamentos",
    titulo: "Fundamentos de informática",
    resumo:
      "O que é informática, o que um iniciante precisa dominar primeiro e como o hardware, o sistema e a internet se relacionam. É a base para entender qualquer outro tema do Atlas.",
    veredito:
      "Boa parte dos chamados que chegam como defeito grave começa em fundamento ausente: espaço em disco esgotado, atualização interrompida, cabo intermitente. Dominar o básico não substitui o técnico — reduz o número de vezes em que ele é necessário.",
    trilha: [
      {
        etapa: "aprender",
        desc: "Comece pela definição e pelo escopo: o que a informática cobre e o que cada parte do computador faz.",
        to: "/blog/o-que-e-informatica",
        linkLabel: "O que é informática",
      },
      {
        etapa: "identificar",
        desc: "Quando algo não funciona, entre pelo sintoma em linguagem comum — sem precisar saber o nome técnico da falha.",
        to: "/problemas",
        linkLabel: "Hub de sintomas",
      },
      {
        etapa: "verificar",
        desc: "O primeiro nível da informática ensina as verificações que não colocam nada em risco: cabos, espaço em disco, atualizações.",
        to: "/blog/informatica-basica",
        linkLabel: "Informática básica",
      },
      {
        etapa: "parar",
        desc: "Se o comportamento envolve ruído de disco, cheiro de queimado ou dados importantes, pare e descreva o caso antes de tentar de novo.",
        to: "/diagnostico-tecnico",
        linkLabel: "Triagem técnica",
      },
      {
        etapa: "resolver",
        desc: "Entenda como um atendimento técnico funciona de ponta a ponta: triagem, modalidade, aprovação e execução.",
        to: "/como-funciona",
        linkLabel: "Como funciona o atendimento",
      },
    ],
    artigos: ["o-que-e-informatica", "informatica-basica", "como-aprender-informatica"],
    problemas: [{ to: "/problemas/computador-lento", label: "Computador ou notebook lento" }],
    servicos: [
      { to: "/como-funciona", label: "Como funciona o atendimento" },
      { to: "/servicos", label: "Todos os serviços" },
    ],
    fontes: [
      {
        titulo: "Microsoft Support — noções básicas de Windows e manutenção do PC",
        url: "https://support.microsoft.com/pt-br/windows",
        nota: "Documentação oficial usada como base dos conceitos de sistema citados na trilha.",
      },
      {
        titulo: "CERT.br — Cartilha de Segurança para Internet",
        url: "https://cartilha.cert.br/",
        nota: "Referência brasileira para os fundamentos de uso seguro citados no tema.",
      },
    ],
  },
  {
    id: "windows-inicializacao",
    titulo: "Windows e inicialização",
    resumo:
      "Boot, BIOS/UEFI, tela azul, reparo automático em laço e atualização que não conclui. O tema separa o que é software recuperável do que é sinal de falha física.",
    veredito:
      "O erro mais caro deste tema é formatar cedo demais. Quando a partida falha por disco em degradação, a reinstalação escreve por cima do que ainda podia ser lido: primeiro se prova em que estágio o boot trava — formatar é conclusão, nunca teste inicial.",
    trilha: [
      {
        etapa: "aprender",
        desc: "Entenda o caminho da inicialização: firmware, modo UEFI ou Legacy e onde o Windows entra nessa sequência.",
        to: "/blog/boot-uefi-ou-legacy-como-identificar",
        linkLabel: "UEFI ou Legacy",
      },
      {
        etapa: "identificar",
        desc: "O sintoma define o cenário: o sistema não carrega, reinicia sozinho ou para em uma tela de erro.",
        to: "/problemas/windows-nao-inicia",
        linkLabel: "Windows não inicia",
      },
      {
        etapa: "verificar",
        desc: "Veja o que tentar em ordem quando o Windows entra em reparo automático repetido — e o que cada tentativa prova.",
        to: "/blog/windows-reparo-automatico-em-loop",
        linkLabel: "Reparo automático em laço",
      },
      {
        etapa: "parar",
        desc: "Se o disco mostra setores defeituosos ou alerta SMART, o problema deixou de ser software: escrever nele agrava a perda.",
        to: "/blog/disco-com-setores-defeituosos-smart-o-que-fazer",
        linkLabel: "Setores defeituosos e SMART",
      },
      {
        etapa: "resolver",
        desc: "Quando a causa é sistema corrompido, a reinstalação com preservação de dados resolve — e o backup faz parte do serviço.",
        to: "/servicos/formatacao",
        linkLabel: "Formatação com backup",
      },
    ],
    artigos: [
      "como-resolver-tela-azul-windows",
      "codigos-de-erro-tela-azul-windows",
      "windows-reparo-automatico-em-loop",
      "windows-update-nao-funciona-o-que-verificar",
      "computador-entra-direto-na-bios",
      "como-instalar-windows-11-do-zero",
    ],
    problemas: [
      { to: "/problemas/windows-nao-inicia", label: "Windows não inicia" },
      { to: "/problemas/tela-azul", label: "Tela azul (BSOD)" },
    ],
    servicos: [
      { to: "/servicos/formatacao", label: "Formatação com backup" },
      { to: "/servicos/manutencao-de-computador", label: "Manutenção de computador" },
    ],
    fontes: [
      {
        titulo: "Microsoft Learn — solução avançada de problemas de boot",
        url: "https://learn.microsoft.com/en-us/troubleshoot/windows-client/performance/windows-boot-issues-troubleshooting",
        nota: "Fases oficiais do processo de inicialização usadas na trilha.",
      },
      {
        titulo: "Microsoft Support — Windows Recovery Environment",
        url: "https://support.microsoft.com/en-us/windows/experience/backup-recovery/windows-recovery-environment",
        nota: "Ferramentas oficiais de recuperação citadas nas verificações seguras.",
      },
    ],
  },
  {
    id: "hardware-upgrades",
    titulo: "Hardware e upgrades",
    resumo:
      "SSD, memória RAM, fonte e placa-mãe: qual intervenção resolve qual limitação, como confirmar antes de comprar peça e quando o upgrade não é a resposta.",
    veredito:
      "Peça nova não é diagnóstico. O upgrade certo nasce de gargalo confirmado — disco mecânico medido, memória saturada em uso real, temperatura registrada — e de compatibilidade conferida antes da compra. Trocar por tentativa é pagar duas vezes.",
    trilha: [
      {
        etapa: "aprender",
        desc: "O upgrade de maior impacto perceptível tem critério: entenda quando a troca de HD por SSD muda o uso e quando não muda.",
        to: "/blog/quando-trocar-hd-por-ssd",
        linkLabel: "HD ou SSD",
      },
      {
        etapa: "identificar",
        desc: "Lentidão tem famílias diferentes: logo ao ligar, com muitos programas abertos ou piorando com o tempo de uso.",
        to: "/problemas/computador-lento",
        linkLabel: "Computador lento",
      },
      {
        etapa: "verificar",
        desc: "Confirme se a memória é o gargalo observando os sintomas certos — antes de pagar por módulos que não resolvem.",
        to: "/blog/memoria-ram-insuficiente-sintomas",
        linkLabel: "RAM insuficiente",
      },
      {
        etapa: "parar",
        desc: "Quando a soma das peças se aproxima do valor de um equipamento equivalente, o reparo deixa de compensar — e isso é dito antes.",
        to: "/quando-nao-compensa",
        linkLabel: "Quando não compensa",
      },
      {
        etapa: "resolver",
        desc: "Compatibilidade conferida antes da compra, migração do sistema e teste: é o escopo do serviço de upgrade.",
        to: "/servicos/upgrade-ssd-ram",
        linkLabel: "Upgrade de SSD e memória",
      },
    ],
    artigos: [
      "quando-trocar-hd-por-ssd",
      "como-fazer-upgrade-ssd-nvme",
      "memoria-ram-insuficiente-sintomas",
      "testar-memoria-ram-memtest86",
      "como-clonar-hd-para-ssd",
      "como-diagnosticar-placa-mae-defeituosa",
    ],
    problemas: [
      { to: "/problemas/computador-lento", label: "Computador lento" },
      { to: "/problemas/notebook-nao-liga", label: "Notebook não liga" },
      { to: "/problemas/computador-nao-da-imagem", label: "Liga mas não dá imagem" },
    ],
    servicos: [
      { to: "/servicos/upgrade-ssd-ram", label: "Upgrade de SSD e memória" },
      { to: "/servicos/manutencao-de-computador", label: "Manutenção de computador" },
      { to: "/servicos/montagem-de-pc", label: "Montagem de PC sob medida" },
    ],
    fontes: [
      {
        titulo: "NVM Express — especificação e visão geral do NVMe",
        url: "https://nvmexpress.org/specifications/",
        nota: "Referência oficial do protocolo usado ao comparar SSD SATA e NVMe.",
      },
      {
        titulo: "JEDEC — padrões de memória DDR",
        url: "https://www.jedec.org/standards-documents/technology-focus-areas/main-memory-ddr3-ddr4-sdram",
        nota: "Padrão que define compatibilidade e nomenclatura das memórias citadas.",
      },
      {
        titulo: "Microsoft Learn — diagnóstico de desempenho no Windows",
        url: "https://learn.microsoft.com/en-us/troubleshoot/windows-client/performance/windows-based-computers-freeze-or-restart-unexpectedly",
        nota: "Base oficial para confirmar gargalo antes de trocar peça.",
      },
    ],
  },
  {
    id: "redes-wifi",
    titulo: "Redes e Wi-Fi",
    resumo:
      "Cobertura, quedas de sinal, internet lenta e dispositivos que somem da rede. O tema ensina a separar problema do provedor, do roteador e do ambiente físico.",
    veredito:
      "Boa parte dos problemas de rede não está no computador nem no provedor, e sim no caminho entre os dois: posição do roteador, canal congestionado, obstáculo físico. Medir com método antes de trocar equipamento evita gasto que não muda o sintoma.",
    trilha: [
      {
        etapa: "aprender",
        desc: "Configure o roteador do zero entendendo o que cada ajuste faz — nome de rede, senha, banda e posição.",
        to: "/blog/como-configurar-roteador-wifi-iniciantes",
        linkLabel: "Configurar o roteador",
      },
      {
        etapa: "identificar",
        desc: "Wi-Fi que cai, oscila ou não chega em cômodos específicos tem causas distintas de internet lenta em tudo.",
        to: "/problemas/wifi-instavel",
        linkLabel: "Wi-Fi instável",
      },
      {
        etapa: "verificar",
        desc: "Teste com método: cabo versus Wi-Fi, horário, quantidade de aparelhos — e descubra se o gargalo é o provedor ou o roteador.",
        to: "/blog/internet-lenta-provedor-ou-roteador",
        linkLabel: "Provedor ou roteador",
      },
      {
        etapa: "parar",
        desc: "Aparelho desconhecido conectado ou configuração que você não reconhece pede troca de senha e revisão — não convém adiar.",
        to: "/blog/como-saber-quem-esta-usando-meu-wifi",
        linkLabel: "Quem usa o seu Wi-Fi",
      },
      {
        etapa: "resolver",
        desc: "Cobertura, cabeamento e configuração profissional para casa e home office, com o ambiente avaliado no local.",
        to: "/servicos/redes-e-wifi",
        linkLabel: "Redes e Wi-Fi",
      },
    ],
    artigos: [
      "como-melhorar-sinal-wifi-em-casa",
      "como-configurar-roteador-wifi-iniciantes",
      "internet-lenta-provedor-ou-roteador",
      "como-saber-quem-esta-usando-meu-wifi",
      "como-conectar-wifi-tv-nao-conecta",
    ],
    problemas: [
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável" },
      { to: "/problemas/impressora-nao-imprime", label: "Impressora não imprime" },
    ],
    servicos: [
      { to: "/servicos/redes-e-wifi", label: "Redes e Wi-Fi" },
      { to: "/servicos/suporte-home-office", label: "Suporte para home office" },
    ],
    fontes: [
      {
        titulo: "Wi-Fi Alliance — segurança de redes Wi-Fi",
        url: "https://www.wi-fi.org/discover-wi-fi/security",
        nota: "Padrões oficiais de proteção de rede sem fio (WPA2 e WPA3).",
      },
      {
        titulo: "CERT.br — Cartilha de Segurança para Internet",
        url: "https://cartilha.cert.br/",
        nota: "Boas práticas brasileiras para redes domésticas e senhas.",
      },
    ],
  },
  {
    id: "seguranca-privacidade",
    titulo: "Segurança e privacidade",
    resumo:
      "Golpes, vírus, adware e sequestro de navegador: como reconhecer os sinais, o que a proteção já instalada cobre e o que fazer quando a máquina foi comprometida.",
    veredito:
      "Antivírus não compensa clique apressado. Os incidentes que chegam à bancada costumam começar em página falsa, anexo de cobrança ou instalador baixado por anúncio — e nenhum guia deste portal orienta a desativar proteções de forma permanente.",
    trilha: [
      {
        etapa: "aprender",
        desc: "A maior parte dos incidentes começa em um clique: aprenda o que checar antes de abrir links, anexos e cobranças.",
        to: "/blog/como-proteger-computador-golpes-internet",
        linkLabel: "Golpes na internet",
      },
      {
        etapa: "identificar",
        desc: "Pop-ups, navegador alterado, lentidão repentina e programas desconhecidos são os sinais típicos de infecção.",
        to: "/blog/como-saber-se-pc-tem-virus-malware",
        linkLabel: "Sinais de vírus e malware",
      },
      {
        etapa: "verificar",
        desc: "Veja o que a remoção séria envolve — e por que \"otimizadores\" baixados por anúncio costumam piorar o quadro.",
        to: "/blog/como-remover-virus-windows-iniciantes",
        linkLabel: "Remover vírus e adware",
      },
      {
        etapa: "parar",
        desc: "Arquivos cifrados ou pedido de resgate mudam tudo: desligue a máquina da rede e não negocie nem reinstale antes de avaliar.",
        to: "/blog/ransomware-como-proteger-empresa",
        linkLabel: "Ransomware",
      },
      {
        etapa: "resolver",
        desc: "Limpeza completa do sistema, remoção de programas indesejados e revisão da proteção ativa.",
        to: "/servicos/remocao-de-virus",
        linkLabel: "Remoção de vírus",
      },
    ],
    artigos: [
      "como-saber-se-pc-tem-virus-malware",
      "como-escolher-um-bom-antivirus",
      "como-proteger-computador-golpes-internet",
      "como-remover-virus-windows-iniciantes",
      "ransomware-como-proteger-empresa",
    ],
    problemas: [],
    servicos: [
      { to: "/servicos/remocao-de-virus", label: "Remoção de vírus" },
      { to: "/seguranca-dos-dados", label: "Segurança dos dados" },
    ],
    fontes: [
      {
        titulo: "CISA — guia oficial de resposta a ransomware",
        url: "https://www.cisa.gov/stopransomware/ransomware-guide",
        nota: "Sustenta o passo de parada obrigatória da trilha.",
      },
      {
        titulo: "Microsoft Support — golpes de falso suporte técnico",
        url: "https://support.microsoft.com/en-us/office/protect-yourself-from-tech-support-scams",
        nota: "Orientação do fabricante para reconhecer suporte falso.",
      },
    ],
  },
  {
    id: "dados-backup",
    titulo: "Dados e backup",
    resumo:
      "Os dados valem mais que o equipamento. O tema cobre backup que realmente restaura, sinais de disco em falha e a ordem certa de agir quando um arquivo some.",
    veredito:
      "Equipamento se substitui, dado não. Na dúvida entre salvar a máquina e salvar o arquivo, a bancada escolhe o arquivo: disco suspeito sai de operação primeiro e é lido de forma controlada depois. Backup nunca testado em restauração ainda é promessa, não cópia.",
    trilha: [
      {
        etapa: "aprender",
        desc: "Pasta sincronizada não é backup: entenda o que separa cópia recuperável de cópia que replica o erro.",
        to: "/blog/backup-como-proteger-seus-arquivos",
        linkLabel: "Guia de backup",
      },
      {
        etapa: "identificar",
        desc: "Ruído metálico, clique repetido e travamento de leitura são o alerta máximo de disco mecânico em falha.",
        to: "/problemas/hd-fazendo-barulho",
        linkLabel: "HD fazendo barulho",
      },
      {
        etapa: "verificar",
        desc: "Alerta SMART e setores defeituosos: o que o diagnóstico prova, o que não prova e por que CHKDSK não é resposta padrão.",
        to: "/blog/disco-com-setores-defeituosos-smart-o-que-fazer",
        linkLabel: "SMART e setores defeituosos",
      },
      {
        etapa: "parar",
        desc: "Arquivo apagado ou partição sumida: cada minuto de uso da unidade sobrescreve o que ainda poderia ser recuperado.",
        to: "/problemas/arquivos-apagados",
        linkLabel: "Arquivos apagados",
      },
      {
        etapa: "resolver",
        desc: "Avaliação de disco em etapas, priorizando a leitura do que ainda é recuperável antes de qualquer reparo.",
        to: "/servicos/recuperacao-de-dados",
        linkLabel: "Recuperação de dados",
      },
    ],
    artigos: [
      "backup-como-proteger-seus-arquivos",
      "como-recuperar-dados-hd-com-defeito",
      "disco-com-setores-defeituosos-smart-o-que-fazer",
      "hd-nao-e-reconhecido-na-bios-o-que-fazer",
      "ssd-nvme-nao-aparece-no-gerenciador-de-discos",
    ],
    problemas: [
      { to: "/problemas/arquivos-apagados", label: "Arquivos apagados" },
      { to: "/problemas/hd-fazendo-barulho", label: "HD fazendo barulho" },
    ],
    servicos: [
      { to: "/servicos/recuperacao-de-dados", label: "Recuperação de dados" },
      { to: "/solucoes/backup", label: "Solução de backup" },
    ],
    fontes: [
      {
        titulo: "CERT.br — fascículos da Cartilha (Backup)",
        url: "https://cartilha.cert.br/fasciculos/",
        nota: "Fundamentos de cópia de segurança pessoal e teste de restauração.",
      },
      {
        titulo: "CISA — backup de dados para pequenos negócios",
        url: "https://www.cisa.gov/audiences/small-and-medium-businesses/secure-your-business/back-up-business-data",
        nota: "Rotina e verificação de cópias recomendadas oficialmente.",
      },
    ],
  },
  {
    id: "manutencao-preventiva",
    titulo: "Manutenção preventiva",
    resumo:
      "Temperatura, poeira, pasta térmica e espaço em disco: o que envelhece um equipamento em silêncio e quais rotinas evitam a falha antes de ela interromper o uso.",
    veredito:
      "Quase todo desligamento térmico avisou antes: ventoinha mais alta, calor no teclado, lentidão em tarefa pesada. A limpeza com troca de pasta térmica custa uma fração do reparo de placa que se torna necessário quando o aviso é ignorado.",
    trilha: [
      {
        etapa: "aprender",
        desc: "Aquecimento normal e comportamento de risco são coisas diferentes: aprenda a ler os sinais do notebook.",
        to: "/blog/notebook-superaquecendo-o-que-fazer",
        linkLabel: "Notebook superaquecendo",
      },
      {
        etapa: "identificar",
        desc: "Equipamento que começa rápido e piora com o tempo de uso aponta para temperatura, não para software.",
        to: "/problemas/computador-esquentando",
        linkLabel: "Computador esquentando",
      },
      {
        etapa: "verificar",
        desc: "Espaço em disco e arquivos temporários são verificações seguras — desde que sem \"otimizadores\" milagrosos.",
        to: "/blog/limpar-arquivos-temporarios-windows",
        linkLabel: "Liberar espaço com segurança",
      },
      {
        etapa: "parar",
        desc: "Cheiro de queimado é parada imediata: desligue da tomada e não religue para \"testar de novo\".",
        to: "/problemas/cheiro-de-queimado",
        linkLabel: "Cheiro de queimado",
      },
      {
        etapa: "resolver",
        desc: "Limpeza interna, troca de pasta térmica e revisão geral, com o estado do equipamento registrado antes e depois.",
        to: "/servicos/manutencao-de-notebook",
        linkLabel: "Manutenção de notebook",
      },
    ],
    artigos: [
      "notebook-superaquecendo-o-que-fazer",
      "como-limpar-notebook-por-dentro",
      "como-trocar-pasta-termica-notebook",
      "limpar-arquivos-temporarios-windows",
      "windows-11-lento-como-resolver",
    ],
    problemas: [
      { to: "/problemas/computador-esquentando", label: "Computador esquentando" },
      { to: "/problemas/computador-desliga-sozinho", label: "Desliga sozinho" },
    ],
    servicos: [
      { to: "/servicos/manutencao-de-computador", label: "Manutenção de computador" },
      { to: "/servicos/manutencao-de-notebook", label: "Manutenção de notebook" },
    ],
  },
  {
    id: "informatica-empresas",
    titulo: "Informática para empresas",
    resumo:
      "Escritórios, consultórios e comércios não têm \"um computador com defeito\": têm operação parada. O tema trata de organização, backup verificado e suporte com prioridade.",
    veredito:
      "Na empresa o custo real não é o conserto, é a hora parada. Inventário do que existe, backup restaurável e prioridade para o que trava a operação resolvem mais que máquina nova — e são o ponto de partida de qualquer suporte recorrente.",
    trilha: [
      {
        etapa: "aprender",
        desc: "Organize equipamentos, acessos e rotina de manutenção sem contratar uma estrutura de TI que não cabe no negócio.",
        to: "/blog/organizacao-de-ti-para-pequenos-escritorios",
        linkLabel: "TI para pequenos escritórios",
      },
      {
        etapa: "identificar",
        desc: "Interrupções recorrentes, máquinas em estágios diferentes de vida útil e rede improvisada: o quadro típico de PME.",
        to: "/empresas",
        linkLabel: "Diagnóstico para empresas",
      },
      {
        etapa: "verificar",
        desc: "Sincronização não é backup corporativo: veja o que diferencia uma cópia que a empresa consegue restaurar.",
        to: "/blog/backup-nuvem-empresas-qual-escolher",
        linkLabel: "Backup em nuvem",
      },
      {
        etapa: "parar",
        desc: "Ransomware entra por e-mail e acesso remoto mal configurado. Se houver suspeita, isole a máquina e não pague nada antes de avaliar.",
        to: "/blog/ransomware-como-proteger-empresa",
        linkLabel: "Ransomware na empresa",
      },
      {
        etapa: "resolver",
        desc: "Atendimento pontual ou recorrente com inventário, prioridade do que trava a operação e plano preventivo.",
        to: "/servicos/suporte-tecnico-empresarial",
        linkLabel: "Suporte empresarial",
      },
    ],
    artigos: [
      "organizacao-de-ti-para-pequenos-escritorios",
      "backup-nuvem-empresas-qual-escolher",
      "ransomware-como-proteger-empresa",
      "como-escolher-uma-workstation",
    ],
    problemas: [],
    servicos: [
      { to: "/empresa-de-ti-curitiba", label: "Empresa de TI em Curitiba" },
      { to: "/servicos/suporte-tecnico-empresarial", label: "Suporte técnico empresarial" },
    ],
    fontes: [
      {
        titulo: "NIST SP 800-34 — planejamento de contingência",
        url: "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
        nota: "Referência de continuidade para ambientes com vários equipamentos.",
      },
      {
        titulo: "CISA — backup de dados corporativos",
        url: "https://www.cisa.gov/audiences/small-and-medium-businesses/secure-your-business/back-up-business-data",
        nota: "Base do critério de backup verificado antes do incidente.",
      },
    ],
  },
  {
    id: "decisoes-compra-reparo",
    titulo: "Decisões de compra e reparo",
    resumo:
      "Consertar, atualizar ou substituir? O tema reúne os critérios usados na bancada para decidir com número na mesa — incluindo quando a conclusão é não contratar serviço nenhum.",
    veredito:
      "A decisão honesta usa dois números: o custo total do reparo e o valor de um equipamento equivalente. Quando o primeiro se aproxima do segundo, isso é dito antes de executar — inclusive quando a conclusão é não contratar serviço nenhum.",
    trilha: [
      {
        etapa: "aprender",
        desc: "Antes de decidir formatar, entenda o que compõe o custo e o que a formatação resolve ou não resolve.",
        to: "/blog/quanto-custa-formatar-um-computador",
        linkLabel: "Quanto custa formatar",
      },
      {
        etapa: "identificar",
        desc: "A decisão muda conforme o sintoma: lentidão progressiva pede diagnóstico de causa, não troca imediata.",
        to: "/problemas/computador-lento",
        linkLabel: "Computador lento",
      },
      {
        etapa: "verificar",
        desc: "Se o caminho for reinstalar, saiba o que precisa ser preservado e em que ordem — antes de apagar qualquer coisa.",
        to: "/blog/como-formatar-pc-sem-perder-arquivos",
        linkLabel: "Formatar sem perder arquivos",
      },
      {
        etapa: "parar",
        desc: "Reparo que se aproxima do valor de um equipamento equivalente é sinal de parada: reavalie antes de aprovar.",
        to: "/quando-nao-compensa",
        linkLabel: "Quando não compensa",
      },
      {
        etapa: "resolver",
        desc: "Quando substituir é o caminho, uma máquina dimensionada para o uso real evita pagar por potência que não será usada.",
        to: "/servicos/montagem-de-pc",
        linkLabel: "Montagem sob medida",
      },
    ],
    artigos: [
      "quanto-custa-formatar-um-computador",
      "como-formatar-pc-sem-perder-arquivos",
      "como-escolher-uma-workstation",
      "quando-trocar-hd-por-ssd",
    ],
    problemas: [],
    servicos: [
      { to: "/quando-nao-compensa", label: "Quando o reparo não compensa" },
      { to: "/precos-e-politicas", label: "Preços e políticas" },
      { to: "/servicos/montagem-de-pc", label: "Montagem de PC sob medida" },
    ],
  },
];

/**
 * Guias de decisão independentes (Fase 2) — cada guia responde UMA pergunta,
 * tem âncora própria no hub (#decisao-<id>) e apresenta os sinais observáveis
 * dos DOIS lados da decisão. O nível de risco só aparece quando o guia
 * envolve procedimento com risco real (fail-closed: sem risco declarado,
 * nada é exibido).
 */
export interface AtlasLadoDecisao {
  rotulo: string;
  pontos: string[];
}

export type AtlasNivelRisco =
  | "Seguro de fazer sozinho"
  | "Exige atenção"
  | "Parada obrigatória";

export interface AtlasGuiaDecisao {
  /** Âncora própria no hub: #decisao-<id>. */
  id: string;
  pergunta: string;
  criterio: string;
  /** Os dois lados da decisão, com sinais observáveis de cada um. */
  sinais: [AtlasLadoDecisao, AtlasLadoDecisao];
  /** Nível canônico de risco — SOMENTE quando sustentado pelo procedimento. */
  risco?: AtlasNivelRisco;
  to: string;
  linkLabel: string;
}

export const ATLAS_GUIAS_DECISAO: AtlasGuiaDecisao[] = [
  {
    id: "formatar-ou-reparar",
    pergunta: "Formatar ou reparar?",
    criterio:
      "Formatação resolve o que é software. Se o gargalo é disco mecânico, memória ou temperatura, a máquina volta a ficar lenta — o diagnóstico vem antes do procedimento.",
    sinais: [
      {
        rotulo: "Aponta para formatar",
        pontos: [
          "Lentidão e erros que surgiram depois de instalação, atualização interrompida ou infecção",
          "O sistema carrega, mas programas falham, travam ou abrem sozinhos",
          "Disco e memória já testados, sem defeito físico encontrado",
        ],
      },
      {
        rotulo: "Aponta para diagnosticar antes",
        pontos: [
          "Ruído de disco, travamento de leitura ou alerta SMART",
          "A falha aparece antes de o Windows terminar de carregar",
          "A máquina volta a ficar lenta pouco depois de cada formatação",
        ],
      },
    ],
    risco: "Exige atenção",
    to: "/solucoes/formatacao",
    linkLabel: "Ver critérios de formatação",
  },
  {
    id: "ssd-ou-memoria-ram",
    pergunta: "SSD ou mais memória RAM?",
    criterio:
      "Lentidão geral desde a inicialização aponta para o disco; travamento só com muitos programas abertos aponta para a memória. São gargalos diferentes e upgrades diferentes.",
    sinais: [
      {
        rotulo: "Aponta para SSD",
        pontos: [
          "Demora grande para ligar e para abrir qualquer programa",
          "Ruído constante de leitura em disco mecânico",
          "Disco em 100% de uso mesmo com poucos programas abertos",
        ],
      },
      {
        rotulo: "Aponta para memória RAM",
        pontos: [
          "Responde bem com um programa e trava com vários abertos",
          "Abas do navegador recarregam sozinhas com frequência",
          "Uso de memória perto do limite durante o trabalho real",
        ],
      },
    ],
    risco: "Seguro de fazer sozinho",
    to: "/solucoes/ssd",
    linkLabel: "Comparar os dois upgrades",
  },
  {
    id: "consertar-ou-substituir",
    pergunta: "Consertar ou substituir?",
    criterio:
      "Quando a soma das peças se aproxima do valor de um equipamento equivalente — ou a placa limita memória e processador — o reparo deixa de compensar e nós dizemos isso.",
    sinais: [
      {
        rotulo: "Aponta para consertar",
        pontos: [
          "Custo do reparo bem abaixo do valor de um equipamento equivalente",
          "A placa ainda aceita memória e processador para o uso pretendido",
          "Defeito isolado em peça substituível, sem falhas em série",
        ],
      },
      {
        rotulo: "Aponta para substituir",
        pontos: [
          "Soma das peças se aproximando do valor de um equipamento novo equivalente",
          "Limite de upgrade da placa já atingido para o uso real",
          "Falhas seguidas em componentes diferentes do mesmo equipamento",
        ],
      },
    ],
    to: "/quando-nao-compensa",
    linkLabel: "Quando não compensa",
  },
  {
    id: "remoto-ou-presencial",
    pergunta: "Atendimento remoto ou presencial?",
    criterio:
      "Sistema, configuração e programas resolvem por acesso remoto. Rede e verificação inicial funcionam em domicílio. Falha física e dados pedem bancada.",
    sinais: [
      {
        rotulo: "Resolve por atendimento remoto",
        pontos: [
          "Sistema, configuração, programas e limpeza de software",
          "O equipamento liga e mantém conexão com a internet",
          "Você acompanha a tela durante toda a sessão",
        ],
      },
      {
        rotulo: "Pede presença ou bancada",
        pontos: [
          "Falha física, troca de peça e microssoldagem",
          "Rede, cabeamento e cobertura Wi-Fi no ambiente",
          "Recuperação de dados e suspeita de disco em falha",
        ],
      },
    ],
    to: "/atendimento-remoto",
    linkLabel: "Como decide a triagem",
  },
  {
    id: "hd-com-ruido",
    pergunta: "HD fazendo ruído: continuar usando?",
    criterio:
      "Não. Ruído metálico ou clique repetido indica falha mecânica em curso: cada nova inicialização pode sobrescrever a área que ainda seria recuperável.",
    sinais: [
      {
        rotulo: "Sinais de falha mecânica em curso",
        pontos: [
          "Clique repetido ou ruído metálico ao ligar",
          "Travamentos longos ao abrir pastas e arquivos",
          "Arquivos que somem ou partição que deixa de aparecer",
        ],
      },
      {
        rotulo: "O que fazer em vez de insistir",
        pontos: [
          "Desligar e não reiniciar para testar de novo",
          "Priorizar a cópia do que ainda é legível",
          "Avaliação controlada do disco antes de qualquer reparo",
        ],
      },
    ],
    risco: "Parada obrigatória",
    to: "/problemas/hd-fazendo-barulho",
    linkLabel: "O que fazer com o disco",
  },
  {
    id: "backup-antes-da-manutencao",
    pergunta: "Backup antes da manutenção?",
    criterio:
      "Sempre que houver dado que não pode ser perdido. Em formatação o backup é etapa obrigatória do serviço; em suspeita de disco em falha, é a primeira etapa.",
    sinais: [
      {
        rotulo: "Backup é obrigatório antes",
        pontos: [
          "Formatação e reinstalação do sistema",
          "Qualquer suspeita de disco em degradação",
          "Dado único que não existe em nenhum outro lugar",
        ],
      },
      {
        rotulo: "Como validar a cópia",
        pontos: [
          "Restaurar um arquivo de teste em outro equipamento",
          "Conferir se o que importa está mesmo dentro da cópia",
          "Manter uma cópia fora do equipamento que vai para a bancada",
        ],
      },
    ],
    risco: "Exige atenção",
    to: "/blog/backup-como-proteger-seus-arquivos",
    linkLabel: "Como fazer backup de verdade",
  },
  {
    id: "limpeza-ou-pasta-termica",
    pergunta: "Limpeza interna resolve ou precisa trocar a pasta térmica?",
    criterio:
      "Dissipador entupido responde à limpeza. Quando a temperatura sobe rápido mesmo com o cooler limpo, o problema é a interface térmica ressecada — e limpar sem trocar a pasta melhora por poucos dias.",
    sinais: [
      {
        rotulo: "Aponta para limpeza interna",
        pontos: [
          "Ventoinha alta constante e pouco fluxo na saída de ar",
          "Poeira visível nas grades de ventilação",
          "Aquecimento que melhora com o equipamento elevado da mesa",
        ],
      },
      {
        rotulo: "Aponta para troca da pasta térmica",
        pontos: [
          "Temperatura sobe rápido mesmo com o cooler limpo",
          "Desligamento sob carga poucos minutos depois de ligar",
          "Anos de uso sem nenhuma manutenção interna registrada",
        ],
      },
    ],
    risco: "Exige atenção",
    to: "/problemas/computador-esquentando",
    linkLabel: "Como medir antes de decidir",
  },
  // ── ONDA 11B ──────────────────────────────────────────────────────────────
  {
    id: "atualizar-para-windows-11",
    pergunta: "Atualizar para o Windows 11 ou permanecer no atual?",
    criterio:
      "A decisão depende de dois fatos verificáveis: se a máquina atende aos requisitos oficiais (incluindo TPM e Secure Boot) e se os programas de que você depende já rodam na versão nova. Sem esses dois, atualizar cria trabalho em vez de resolver.",
    sinais: [
      {
        rotulo: "Aponta para atualizar",
        pontos: [
          "A verificação oficial de requisitos passa sem alerta de hardware",
          "Os programas essenciais do seu dia a dia já têm versão suportada",
          "Backup completo conferido antes de iniciar a migração",
        ],
      },
      {
        rotulo: "Aponta para permanecer (e planejar)",
        pontos: [
          "Requisito de firmware ou de processador não atendido",
          "Sistema ou periférico crítico sem driver publicado pelo fabricante",
          "Disco já no limite ou com alerta de saúde — migrar em cima disso é risco",
        ],
      },
    ],
    risco: "Exige atenção",
    to: "/solucoes/formatacao",
    linkLabel: "Ver critérios de reinstalação",
  },
  {
    id: "nuvem-ou-hd-externo",
    pergunta: "Backup na nuvem ou em HD externo?",
    criterio:
      "Não é escolha entre duas tecnologias: é escolha entre riscos diferentes. Nuvem protege do que acontece no local; mídia externa protege do que acontece na conta. Quem só tem um dos dois está descoberto de um lado.",
    sinais: [
      {
        rotulo: "Aponta para nuvem",
        pontos: [
          "Arquivos que mudam todos os dias e precisam de cópia automática",
          "Risco maior de furto, incêndio ou perda física do equipamento",
          "Mais de um dispositivo com os mesmos arquivos",
        ],
      },
      {
        rotulo: "Aponta para mídia externa",
        pontos: [
          "Volume grande de arquivos estáticos (fotos, vídeos, acervos)",
          "Necessidade de cópia desconectada, fora do alcance de ransomware",
          "Conexão limitada ou instável para subir tudo",
        ],
      },
    ],
    risco: "Seguro de fazer sozinho",
    to: "/seguranca-dos-dados",
    linkLabel: "Como tratamos seus dados",
  },
  {
    id: "montar-ou-comprar-pronto",
    pergunta: "Montar o PC ou comprar pronto?",
    criterio:
      "Montar compensa quando existe requisito específico — placa de vídeo, silêncio, memória expansível, fonte dimensionada. Para uso genérico de escritório, comprar pronto costuma sair na frente em garantia única e prazo.",
    sinais: [
      {
        rotulo: "Aponta para montar",
        pontos: [
          "Uso com exigência definida: edição, CAD, jogos, virtualização",
          "Intenção de expandir memória e armazenamento nos próximos anos",
          "Necessidade de escolher fonte, refrigeração e nível de ruído",
        ],
      },
      {
        rotulo: "Aponta para comprar pronto",
        pontos: [
          "Uso de escritório, navegador e pacote de produtividade",
          "Preferência por garantia única do fabricante em vez de peça a peça",
          "Compra por conta de empresa que exige nota e suporte do fornecedor",
        ],
      },
    ],
    to: "/servicos/montagem-de-pc",
    linkLabel: "Montagem sob medida",
  },
  // ── FASE 5 ────────────────────────────────────────────────────────────────
  {
    id: "trocar-componente-ou-reparar",
    pergunta: "Trocar o componente inteiro ou tentar reparar?",
    criterio:
      "Peça de desgaste (bateria, ventoinha, pasta térmica, disco mecânico) é feita para ser substituída — insistir no reparo compra pouco tempo. Falha isolada em componente durável, com peça disponível e sem reincidência, ainda compensa reparar.",
    sinais: [
      {
        rotulo: "Aponta para trocar o componente",
        pontos: [
          "O mesmo sintoma voltou depois de uma intervenção recente no mesmo componente",
          "É peça de desgaste: bateria que não sustenta carga, ventoinha com rolamento gasto, disco com setores realocados crescendo",
          "O reparo depende de peça sem procedência clara para função crítica de energia",
        ],
      },
      {
        rotulo: "Aponta para reparar",
        pontos: [
          "Falha única, primeira ocorrência, com causa identificada na avaliação",
          "Componente durável e compatível com o uso pretendido nos próximos anos",
          "Peça original disponível e reparo com escopo fechado antes da execução",
        ],
      },
    ],
    risco: "Exige atenção",
    to: "/decisoes/trocar-componente-ou-reparar",
    linkLabel: "Ver a matriz de decisão",
  },
];



/** Artigos do tema com aprovação editorial válida (fail-closed em dobro). */
export function atlasArtigosAprovados(tema: AtlasTema) {
  return tema.artigos
    .filter((slug) => isEditorialApproved(slug) && EDITORIAL_HUB_SUMMARIES[slug])
    .map((slug) => ({ slug, ...EDITORIAL_HUB_SUMMARIES[slug] }));
}

/** Todos os destinos internos declarados pelo Atlas (para gates e testes). */
export function atlasTodosOsLinks(): string[] {
  const links = new Set<string>();
  for (const tema of ATLAS_TEMAS) {
    for (const e of tema.trilha) links.add(e.to);
    for (const p of tema.problemas) links.add(p.to);
    for (const s of tema.servicos) links.add(s.to);
    for (const slug of tema.artigos) links.add(`/blog/${slug}`);
  }
  for (const g of ATLAS_GUIAS_DECISAO) links.add(g.to);
  return [...links];
}
