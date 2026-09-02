import type { FontePrimaria } from "@/lib/enriquecimento";

/**
 * TAXONOMIA DE ENTIDADES (Rodada de entidades conectadas)
 *
 * Fonte única das entidades do portal (/entidades e /entidades/<slug>).
 * Uma entidade NÃO é uma página comercial nem um artigo: é o nó semântico que
 * conecta definição, problemas, ferramentas, decisões, artigos, fontes,
 * serviços e cidades já existentes no portal.
 *
 * Regras (herdam AGENTS.md):
 *  - Nenhuma URL nova de conteúdo é criada aqui além do hub e das entidades;
 *    todos os destinos precisam existir no manifesto curado (gate
 *    scripts/check-entidades.mjs valida cada link no SSR).
 *  - Conteúdo original; fontes primárias citadas, nunca copiadas.
 *  - Sem números inventados, sem promessa de prazo ou resultado.
 *  - Intenção única: a página de entidade é DEFINICIONAL e de navegação;
 *    diagnóstico fica em /problemas, execução comercial em /servicos.
 */

export const ENTIDADES_REVISADO_EM = "2026-09-02";

export type LinkEntidade = {
  rotulo: string;
  to: string;
  /** Frase curta que justifica o vínculo — vira texto visível na página. */
  contexto: string;
};

export type TipoEntidade =
  | "Sistema"
  | "Componente"
  | "Rede"
  | "Prática"
  | "Código de erro"
  | "Sintoma"
  | "Local"
  | "Serviço";

export type Entidade = {
  slug: string;
  nome: string;
  tipo: TipoEntidade;
  /** Nomes alternativos com que as pessoas chamam a entidade. */
  tambemChamada: string[];
  /** 1–2 frases: aparece no hub e alimenta a meta description. */
  resumo: string;
  /** Definição autoral — parágrafos. */
  definicao: string[];
  /** Problemas, sintomas e desafios associados (páginas reais). */
  problemas: LinkEntidade[];
  /** Ferramentas e checklists de diagnóstico. */
  ferramentas: LinkEntidade[];
  /** Guias de decisão vinculados. */
  decisoes: LinkEntidade[];
  /** Artigos e guias aprofundados. */
  artigos: LinkEntidade[];
  /** Serviços do portal relacionados à entidade. */
  servicos: LinkEntidade[];
  /** Cidades onde o atendimento presencial é aplicável. */
  cidades: LinkEntidade[];
  /** Outras entidades desta taxonomia (slugs). */
  relacionadas: string[];
  fontes: FontePrimaria[];
};

/** Cidades de cobertura operacional própria — reaproveitadas pelas entidades. */
const CIDADES_BASE: LinkEntidade[] = [
  {
    rotulo: "Curitiba",
    to: "/tecnico-informatica-curitiba",
    contexto: "Base principal de atendimento, com visita, coleta ou bancada conforme o caso.",
  },
  {
    rotulo: "São José dos Pinhais",
    to: "/tecnico-informatica-sao-jose-pinhais",
    contexto: "Atendimento presencial mediante disponibilidade de agenda e deslocamento.",
  },
  {
    rotulo: "Pinhais",
    to: "/tecnico-informatica-pinhais",
    contexto: "Cobertura na região metropolitana leste, com coleta quando o reparo é de bancada.",
  },
  {
    rotulo: "Colombo",
    to: "/tecnico-informatica-colombo",
    contexto: "Atendimento residencial e de pequenas empresas conforme disponibilidade.",
  },
  {
    rotulo: "Araucária",
    to: "/tecnico-informatica-araucaria",
    contexto: "Região metropolitana sul; modalidade definida na triagem.",
  },
  {
    rotulo: "Campo Largo",
    to: "/tecnico-informatica-campo-largo",
    contexto: "Cobertura oeste, normalmente com coleta para serviços de bancada.",
  },
];

export const ENTIDADES: Entidade[] = [
  {
    slug: "windows",
    nome: "Windows",
    tipo: "Sistema",
    tambemChamada: ["Windows 10", "Windows 11", "sistema operacional"],
    resumo:
      "Sistema operacional que intermedia hardware, drivers e programas. A maioria das falhas atribuídas ao computador é, na prática, falha de sistema, driver ou atualização.",
    definicao: [
      "Windows é o sistema operacional que organiza o acesso dos programas ao processador, à memória, ao disco e aos dispositivos. Entre o hardware e o que você vê na tela existem camadas — firmware, gerenciador de inicialização, kernel, drivers e serviços — e uma falha em qualquer uma delas aparece para o usuário como \"o computador parou de funcionar\".",
      "Distinguir essas camadas é o que separa um reparo de sistema de uma troca de peça desnecessária. Quando o equipamento liga, mostra logotipo e trava, o hardware básico está respondendo: o problema está na inicialização do sistema. Quando nem imagem existe, o Windows sequer entrou em cena.",
      "Nesta taxonomia, Windows é a entidade que reúne inicialização, atualização, drivers, contas e proteção do sistema. Códigos de parada, telas azuis e loops de reparo automático são manifestações dessa entidade, não entidades independentes.",
    ],
    problemas: [
      {
        rotulo: "Windows não inicia",
        to: "/problemas/windows-nao-inicia",
        contexto: "Falha entre o firmware e o carregamento do sistema, incluindo códigos de boot.",
      },
      {
        rotulo: "Tela azul",
        to: "/problemas/tela-azul",
        contexto: "Interrupção crítica do kernel: o código de parada indica a família da causa.",
      },
      {
        rotulo: "Computador lento",
        to: "/problemas/computador-lento",
        contexto: "Lentidão por software, serviços e atualização é o sintoma mais comum do sistema.",
      },
    ],
    ferramentas: [
      {
        rotulo: "Roteiro de falha de inicialização",
        to: "/ferramentas/roteiro-falha-de-inicializacao",
        contexto: "Sequência segura de verificação quando o sistema não chega à área de trabalho.",
      },
      {
        rotulo: "Checklist antes de formatar",
        to: "/ferramentas/checklist-antes-de-formatar",
        contexto: "O que precisa estar salvo e verificado antes de reinstalar o sistema.",
      },
    ],
    decisoes: [
      {
        rotulo: "Formatar ou reparar",
        to: "/decisoes/formatar-ou-reparar",
        contexto: "Critério objetivo entre reparo do sistema atual e reinstalação limpa.",
      },
      {
        rotulo: "Atualizar para o Windows 11",
        to: "/decisoes/atualizar-para-windows-11",
        contexto: "Requisitos reais, ganho esperado e quando adiar a atualização.",
      },
    ],
    artigos: [
      {
        rotulo: "Como instalar o Windows 11 do zero",
        to: "/blog/como-instalar-windows-11-do-zero",
        contexto: "Instalação limpa com preparo de mídia e cuidados com dados.",
      },
      {
        rotulo: "Windows Update não funciona",
        to: "/blog/windows-update-nao-funciona-o-que-verificar",
        contexto: "Verificações de atualização antes de qualquer intervenção mais profunda.",
      },
      {
        rotulo: "Reparo automático em loop",
        to: "/blog/windows-reparo-automatico-em-loop",
        contexto: "O que o loop indica e onde ele deixa de ser resolvível pelo usuário.",
      },
    ],
    servicos: [
      {
        rotulo: "Formatação com backup",
        to: "/servicos/formatacao",
        contexto: "Reinstalação do sistema com preservação combinada de dados.",
      },
      {
        rotulo: "Manutenção de computador",
        to: "/servicos/manutencao-de-computador",
        contexto: "Diagnóstico completo quando a falha não se resolve no sistema.",
      },
    ],
    cidades: CIDADES_BASE,
    relacionadas: ["erro-0xc0000428", "computador-lento", "backup", "servico"],
    fontes: [
      {
        titulo: "Microsoft Learn — Windows client documentation",
        url: "https://learn.microsoft.com/pt-br/windows/",
        nota: "Documentação oficial de inicialização, atualização e recuperação.",
      },
      {
        titulo: "Microsoft Support — Opções de recuperação no Windows",
        url: "https://support.microsoft.com/pt-br/windows/op%C3%A7%C3%B5es-de-recupera%C3%A7%C3%A3o-no-windows-31ce2444-7de3-818c-d626-e3b5a3024da5",
      },
    ],
  },
  {
    slug: "ssd",
    nome: "SSD",
    tipo: "Componente",
    tambemChamada: ["disco de estado sólido", "NVMe", "M.2", "SATA SSD"],
    resumo:
      "Armazenamento em memória flash, sem partes móveis. É o componente com maior impacto perceptível em máquinas que ainda usam HD mecânico.",
    definicao: [
      "SSD é o dispositivo de armazenamento que grava dados em chips de memória flash. Sem cabeçote nem disco girando, o tempo de acesso cai de milissegundos para microssegundos — é isso que faz o sistema abrir, salvar e alternar entre programas sem a espera típica do HD.",
      "Existem dois formatos que costumam ser confundidos: o SSD SATA, que usa o mesmo cabo do HD antigo, e o SSD NVMe, encaixado direto na placa-mãe via PCIe. O ganho entre HD e SSD SATA é sempre grande; entre SATA e NVMe, só aparece em cargas pesadas de leitura e escrita.",
      "Como entidade, SSD concentra as decisões de upgrade, clonagem, reconhecimento do disco pelo sistema e substituição de HD com desgaste — sem se confundir com a entidade Backup, que trata da cópia dos dados, não do meio onde eles ficam.",
    ],
    problemas: [
      {
        rotulo: "Computador lento",
        to: "/problemas/computador-lento",
        contexto: "Quando a lentidão é de disco, o upgrade resolve; quando é de sistema, não.",
      },
      {
        rotulo: "HD fazendo barulho",
        to: "/problemas/hd-fazendo-barulho",
        contexto: "Ruído mecânico é um dos gatilhos legítimos para migrar para SSD.",
      },
    ],
    ferramentas: [
      {
        rotulo: "SSD ou RAM: o que resolve primeiro",
        to: "/ferramentas/ssd-ou-ram",
        contexto: "Comparação prática dos sinais que apontam disco em vez de memória.",
      },
      {
        rotulo: "Checklist de computador lento",
        to: "/ferramentas/checklist-computador-lento",
        contexto: "Verificações antes de comprar qualquer peça.",
      },
    ],
    decisoes: [
      {
        rotulo: "SSD ou memória RAM",
        to: "/decisoes/ssd-ou-memoria-ram",
        contexto: "Onde investir primeiro conforme o sintoma observado.",
      },
      {
        rotulo: "Trocar componente ou reparar",
        to: "/decisoes/trocar-componente-ou-reparar",
        contexto: "Quando substituir o disco compensa mais que insistir no reparo.",
      },
    ],
    artigos: [
      {
        rotulo: "Quando trocar HD por SSD",
        to: "/blog/quando-trocar-hd-por-ssd",
        contexto: "Sinais objetivos de que o disco atual é o gargalo.",
      },
      {
        rotulo: "Como clonar HD para SSD",
        to: "/blog/como-clonar-hd-para-ssd",
        contexto: "Migração preservando o sistema já instalado.",
      },
      {
        rotulo: "SSD NVMe não aparece no gerenciador de discos",
        to: "/blog/ssd-nvme-nao-aparece-no-gerenciador-de-discos",
        contexto: "Reconhecimento do disco novo pelo firmware e pelo sistema.",
      },
    ],
    servicos: [
      {
        rotulo: "Upgrade de SSD e RAM",
        to: "/servicos/upgrade-ssd-ram",
        contexto: "Instalação, migração e verificação do disco novo.",
      },
      {
        rotulo: "Recuperação de dados",
        to: "/servicos/recuperacao-de-dados",
        contexto: "Tentativa de recuperação quando o disco antigo já falhou.",
      },
    ],
    cidades: CIDADES_BASE,
    relacionadas: ["memoria-ram", "computador-lento", "backup", "servico"],
    fontes: [
      {
        titulo: "NIST SP 800-88 — Guidelines for Media Sanitization",
        url: "https://csrc.nist.gov/pubs/sp/800/88/r1/final",
        nota: "Referência para descarte e sanitização do disco substituído.",
      },
      {
        titulo: "Microsoft Learn — Gerenciamento de discos",
        url: "https://learn.microsoft.com/pt-br/windows-server/storage/disk-management/overview-of-disk-management",
      },
    ],
  },
  {
    slug: "memoria-ram",
    nome: "Memória RAM",
    tipo: "Componente",
    tambemChamada: ["RAM", "memória", "DDR4", "DDR5"],
    resumo:
      "Memória volátil onde o sistema mantém o que está em uso. Quantidade insuficiente causa travamentos sob carga; módulos com defeito causam falhas intermitentes e telas azuis.",
    definicao: [
      "A memória RAM guarda temporariamente o que está sendo executado. Quando ela acaba, o Windows passa a usar o disco como extensão — e é aí que abas do navegador demoram a responder e programas travam ao alternar entre janelas, mesmo com processador ocioso.",
      "Falha de módulo é diferente de falta de capacidade. Pouca RAM produz lentidão previsível sob carga; módulo defeituoso produz erro imprevisível: travamento aleatório, corrupção de arquivo, tela azul com códigos que mudam a cada ocorrência.",
      "Como entidade, Memória RAM cobre tanto o upgrade de capacidade quanto o teste de integridade dos módulos, e conversa diretamente com as entidades Computador lento e Windows.",
    ],
    problemas: [
      {
        rotulo: "Computador lento",
        to: "/problemas/computador-lento",
        contexto: "Travamento sob carga com disco saudável costuma ser limite de memória.",
      },
      {
        rotulo: "Tela azul",
        to: "/problemas/tela-azul",
        contexto: "Códigos de parada variáveis são um sinal clássico de memória instável.",
      },
    ],
    ferramentas: [
      {
        rotulo: "SSD ou RAM: o que resolve primeiro",
        to: "/ferramentas/ssd-ou-ram",
        contexto: "Distingue gargalo de disco de gargalo de memória antes da compra.",
      },
      {
        rotulo: "Checklist de computador lento",
        to: "/ferramentas/checklist-computador-lento",
        contexto: "Leitura do uso de memória antes de concluir que falta capacidade.",
      },
    ],
    decisoes: [
      {
        rotulo: "SSD ou memória RAM",
        to: "/decisoes/ssd-ou-memoria-ram",
        contexto: "Critério de prioridade quando o orçamento cobre só um upgrade.",
      },
    ],
    artigos: [
      {
        rotulo: "Memória RAM insuficiente: sintomas",
        to: "/blog/memoria-ram-insuficiente-sintomas",
        contexto: "Como reconhecer falta de capacidade sem depender de suposição.",
      },
      {
        rotulo: "Testar memória RAM com Memtest86+",
        to: "/blog/testar-memoria-ram-memtest86",
        contexto: "Teste de integridade dos módulos antes de trocar qualquer peça.",
      },
    ],
    servicos: [
      {
        rotulo: "Upgrade de SSD e RAM",
        to: "/servicos/upgrade-ssd-ram",
        contexto: "Verificação de compatibilidade, instalação e teste após o upgrade.",
      },
      {
        rotulo: "Manutenção de notebook",
        to: "/servicos/manutencao-de-notebook",
        contexto: "Acesso aos slots em notebooks exige desmontagem parcial.",
      },
    ],
    cidades: CIDADES_BASE,
    relacionadas: ["ssd", "computador-lento", "windows", "servico"],
    fontes: [
      {
        titulo: "Microsoft Learn — Bug Check Code Reference",
        url: "https://learn.microsoft.com/pt-br/windows-hardware/drivers/debugger/bug-check-code-reference2",
        nota: "Referência oficial dos códigos de parada, incluindo falhas de memória.",
      },
      {
        titulo: "Memtest86+ — documentação do projeto",
        url: "https://www.memtest.org/",
      },
    ],
  },
  {
    slug: "wifi",
    nome: "Wi-Fi",
    tipo: "Rede",
    tambemChamada: ["rede sem fio", "wireless", "roteador"],
    resumo:
      "Rede local sem fio entre o equipamento e o roteador. Instabilidade quase sempre é de meio físico, canal ou configuração — e não do provedor de internet.",
    definicao: [
      "Wi-Fi é o trecho sem fio da rede: do dispositivo até o roteador. O que a maioria chama de \"internet caindo\" costuma ser esse trecho, e não o link contratado — a diferença aparece quando o cabo funciona e o sem fio não.",
      "Três variáveis explicam a maior parte dos casos: distância e obstáculos entre dispositivo e roteador, disputa de canal com redes vizinhas, e configuração do próprio roteador (banda, potência, DHCP e DNS). Cada uma tem verificação própria e nenhuma exige troca imediata de equipamento.",
      "Como entidade, Wi-Fi conecta o diagnóstico doméstico ao ambiente empresarial, onde o mesmo sintoma tem causas de projeto de rede — cobertura, número de pontos e segmentação.",
    ],
    problemas: [
      {
        rotulo: "Wi-Fi instável",
        to: "/problemas/wifi-instavel",
        contexto: "Queda intermitente, lentidão por horário e perda de sinal em cômodos.",
      },
    ],
    ferramentas: [
      {
        rotulo: "Roteiro de Wi-Fi instável",
        to: "/ferramentas/roteiro-wifi-instavel",
        contexto: "Sequência de testes que isola dispositivo, roteador e link.",
      },
    ],
    decisoes: [
      {
        rotulo: "Remoto ou presencial",
        to: "/decisoes/remoto-ou-presencial",
        contexto: "Configuração resolve remoto; cobertura e cabeamento exigem visita.",
      },
    ],
    artigos: [
      {
        rotulo: "Como melhorar o sinal de Wi-Fi em casa",
        to: "/blog/como-melhorar-sinal-wifi-em-casa",
        contexto: "Posicionamento, banda e obstáculos antes de comprar repetidor.",
      },
      {
        rotulo: "Configurar roteador Wi-Fi para iniciantes",
        to: "/blog/como-configurar-roteador-wifi-iniciantes",
        contexto: "Configuração básica segura, incluindo senha e rede de visitantes.",
      },
      {
        rotulo: "Quem está usando meu Wi-Fi",
        to: "/blog/como-saber-quem-esta-usando-meu-wifi",
        contexto: "Verificação de dispositivos conectados sem desativar proteções.",
      },
    ],
    servicos: [
      {
        rotulo: "Redes e Wi-Fi",
        to: "/servicos/redes-e-wifi",
        contexto: "Diagnóstico de cobertura, canal e configuração do roteador.",
      },
      {
        rotulo: "Suporte técnico empresarial",
        to: "/servicos/suporte-tecnico-empresarial",
        contexto: "Rede corporativa com múltiplos pontos e usuários simultâneos.",
      },
    ],
    cidades: CIDADES_BASE,
    relacionadas: ["windows", "servico", "cidade"],
    fontes: [
      {
        titulo: "CERT.br — Cartilha de Segurança: redes",
        url: "https://cartilha.cert.br/redes/",
        nota: "Boas práticas de segurança em redes domésticas sem fio.",
      },
      {
        titulo: "Anatel — Uso de radiofrequência em redes sem fio",
        url: "https://www.gov.br/anatel/pt-br",
      },
    ],
  },
  {
    slug: "backup",
    nome: "Backup",
    tipo: "Prática",
    tambemChamada: ["cópia de segurança", "backup em nuvem", "imagem do sistema"],
    resumo:
      "Cópia independente dos dados, verificada e restaurável. Backup que nunca foi testado ainda não é backup: é uma expectativa.",
    definicao: [
      "Backup é a cópia dos dados mantida em um meio separado do original, de forma que a perda do equipamento não implique perda da informação. A definição exige independência: arquivo copiado para outra pasta do mesmo disco não protege contra falha desse disco.",
      "Existe diferença prática entre backup de arquivos e imagem do sistema. O primeiro devolve documentos, fotos e projetos; o segundo devolve o computador inteiro no estado em que estava, com programas e configurações. Manutenções que envolvem formatação ou troca de disco pedem, no mínimo, o primeiro.",
      "Como entidade, Backup atravessa quase todas as outras: aparece antes de formatar, antes de trocar disco, depois de suspeita de malware e como último recurso quando a recuperação de dados é a única saída — sempre como tentativa, nunca com resultado garantido.",
    ],
    problemas: [
      {
        rotulo: "Arquivos apagados",
        to: "/problemas/arquivos-apagados",
        contexto: "O que fazer, e o que parar de fazer, quando o arquivo já sumiu.",
      },
      {
        rotulo: "HD fazendo barulho",
        to: "/problemas/hd-fazendo-barulho",
        contexto: "Ruído mecânico é o momento em que o backup deixa de ser opcional.",
      },
    ],
    ferramentas: [
      {
        rotulo: "Verificador de backup",
        to: "/ferramentas/verificador-de-backup",
        contexto: "Confere se a cópia existe, está completa e pode ser restaurada.",
      },
      {
        rotulo: "Checklist antes de formatar",
        to: "/ferramentas/checklist-antes-de-formatar",
        contexto: "O que salvar antes de qualquer reinstalação de sistema.",
      },
    ],
    decisoes: [
      {
        rotulo: "Backup antes da manutenção",
        to: "/decisoes/backup-antes-da-manutencao",
        contexto: "Quando a manutenção só deve começar depois da cópia verificada.",
      },
      {
        rotulo: "Nuvem ou HD externo",
        to: "/decisoes/nuvem-ou-hd-externo",
        contexto: "Comparação honesta entre os dois meios, com limites de cada um.",
      },
    ],
    artigos: [
      {
        rotulo: "Backup: como proteger seus arquivos",
        to: "/blog/backup-como-proteger-seus-arquivos",
        contexto: "Rotina mínima para uso doméstico e home office.",
      },
      {
        rotulo: "Backup em nuvem para empresas",
        to: "/blog/backup-nuvem-empresas-qual-escolher",
        contexto: "Critérios de escolha em ambiente com vários usuários.",
      },
      {
        rotulo: "Recuperar dados de HD com defeito",
        to: "/blog/como-recuperar-dados-hd-com-defeito",
        contexto: "O que é tentativa de recuperação e por que não há garantia.",
      },
    ],
    servicos: [
      {
        rotulo: "Recuperação de dados",
        to: "/servicos/recuperacao-de-dados",
        contexto: "Tentativa de recuperação quando não existe cópia anterior.",
      },
      {
        rotulo: "Backup para empresas",
        to: "/servicos/backup-para-empresas",
        contexto: "Rotina de cópia e verificação em ambiente corporativo.",
      },
    ],
    cidades: CIDADES_BASE,
    relacionadas: ["ssd", "windows", "computador-lento", "servico"],
    fontes: [
      {
        titulo: "CISA — Data Backup Options",
        url: "https://www.cisa.gov/sites/default/files/publications/data_backup_options.pdf",
        nota: "Orientação oficial sobre meios de backup e verificação de restauração.",
      },
      {
        titulo: "CERT.br — Cartilha de Segurança: cópias de segurança",
        url: "https://cartilha.cert.br/",
      },
    ],
  },
  {
    slug: "erro-0xc0000428",
    nome: "Erro 0xc0000428",
    tipo: "Código de erro",
    tambemChamada: ["0xc0000428", "assinatura digital inválida", "STATUS_INVALID_IMAGE_HASH"],
    resumo:
      "Código exibido quando o Windows não valida a assinatura digital de um arquivo de inicialização. O sistema para por segurança, antes de carregar algo que não confere.",
    definicao: [
      "O código 0xc0000428 aparece na tela de recuperação quando o gerenciador de inicialização encontra um arquivo cuja assinatura digital não bate com o esperado. Não é um defeito de peça: é uma verificação de integridade fazendo o que deveria — interrompendo o boot.",
      "As origens mais comuns são atualização interrompida, driver não assinado instalado recentemente, alteração no gerenciador de inicialização e clonagem de disco feita pela metade. O mesmo código, portanto, pode ter causas diferentes, e o histórico do que mudou antes da falha vale mais que qualquer palpite.",
      "Este é um caso em que a orientação segura tem limite explícito: desativar permanentemente a verificação de assinatura ou o Secure Boot resolve a tela e deixa o computador exposto. Não recomendamos esse caminho — a entidade existe justamente para separar contorno temporário de correção real.",
    ],
    problemas: [
      {
        rotulo: "Windows não inicia",
        to: "/problemas/windows-nao-inicia",
        contexto: "Página de diagnóstico onde este código é tratado em contexto.",
      },
      {
        rotulo: "Tela azul",
        to: "/problemas/tela-azul",
        contexto: "Diferencia interrupção de boot de interrupção do kernel já carregado.",
      },
    ],
    ferramentas: [
      {
        rotulo: "Roteiro de falha de inicialização",
        to: "/ferramentas/roteiro-falha-de-inicializacao",
        contexto: "Ordem de verificação sem desativar proteções do sistema.",
      },
    ],
    decisoes: [
      {
        rotulo: "Formatar ou reparar",
        to: "/decisoes/formatar-ou-reparar",
        contexto: "Quando o reparo de inicialização deixa de compensar.",
      },
      {
        rotulo: "Backup antes da manutenção",
        to: "/decisoes/backup-antes-da-manutencao",
        contexto: "O disco costuma estar íntegro: dá tempo de copiar antes de intervir.",
      },
    ],
    artigos: [
      {
        rotulo: "Códigos de erro de tela azul",
        to: "/blog/codigos-de-erro-tela-azul-windows",
        contexto: "Como ler um código de parada e o que ele delimita.",
      },
      {
        rotulo: "Reparo automático em loop",
        to: "/blog/windows-reparo-automatico-em-loop",
        contexto: "Sintoma vizinho, com sobreposição de causas de inicialização.",
      },
      {
        rotulo: "Boot UEFI ou Legacy: como identificar",
        to: "/blog/boot-uefi-ou-legacy-como-identificar",
        contexto: "Modo de boot errado após clonagem é causa recorrente.",
      },
    ],
    servicos: [
      {
        rotulo: "Formatação com backup",
        to: "/servicos/formatacao",
        contexto: "Reinstalação limpa quando o reparo de boot não se sustenta.",
      },
      {
        rotulo: "Manutenção de computador",
        to: "/servicos/manutencao-de-computador",
        contexto: "Diagnóstico presencial ou por coleta conforme o caso.",
      },
    ],
    cidades: CIDADES_BASE,
    relacionadas: ["windows", "backup", "ssd"],
    fontes: [
      {
        titulo: "Microsoft Learn — Boot and UEFI",
        url: "https://learn.microsoft.com/pt-br/windows-hardware/drivers/bringup/boot-and-uefi",
        nota: "Referência de inicialização segura e validação de imagem.",
      },
      {
        titulo: "Microsoft Support — Ambiente de Recuperação do Windows",
        url: "https://support.microsoft.com/pt-br/windows/op%C3%A7%C3%B5es-de-recupera%C3%A7%C3%A3o-no-windows-31ce2444-7de3-818c-d626-e3b5a3024da5",
      },
    ],
  },
  {
    slug: "computador-lento",
    nome: "Computador lento",
    tipo: "Sintoma",
    tambemChamada: ["PC lento", "notebook lento", "travando"],
    resumo:
      "Sintoma com pelo menos quatro famílias de causa: disco, memória, temperatura e software. Tratar como uma coisa só é o que gera troca de peça sem ganho.",
    definicao: [
      "\"Está lento\" descreve percepção, não causa. A mesma frase cobre o computador que demora a ligar, o que trava ao abrir muitas abas, o que fica bom por dez minutos e piora depois, e o que ficou lento de um dia para o outro — e cada um desses padrões aponta para um lugar diferente.",
      "Demora no ligar e ao abrir programas sugere disco. Travamento com muitos programas abertos sugere memória. Piora progressiva ao longo do uso sugere temperatura e limitação térmica. Piora repentina sugere software: atualização, programa novo, extensão ou infecção.",
      "Por isso esta entidade é ponto de entrada, não de chegada: ela distribui o caso para as entidades SSD, Memória RAM, Windows e Backup conforme o padrão observado.",
    ],
    problemas: [
      {
        rotulo: "Computador lento",
        to: "/problemas/computador-lento",
        contexto: "Página de diagnóstico com as famílias de causa separadas.",
      },
      {
        rotulo: "Computador esquentando",
        to: "/problemas/computador-esquentando",
        contexto: "Quando a lentidão só aparece depois de alguns minutos de uso.",
      },
    ],
    ferramentas: [
      {
        rotulo: "Checklist de computador lento",
        to: "/ferramentas/checklist-computador-lento",
        contexto: "Verificações na ordem certa, sem custo e sem risco.",
      },
      {
        rotulo: "SSD ou RAM: o que resolve primeiro",
        to: "/ferramentas/ssd-ou-ram",
        contexto: "Traduz o padrão observado em prioridade de upgrade.",
      },
    ],
    decisoes: [
      {
        rotulo: "SSD ou memória RAM",
        to: "/decisoes/ssd-ou-memoria-ram",
        contexto: "Decisão de upgrade com base em sinal, não em suposição.",
      },
      {
        rotulo: "Consertar ou substituir",
        to: "/decisoes/consertar-ou-substituir",
        contexto: "Quando a idade do equipamento muda a conta.",
      },
    ],
    artigos: [
      {
        rotulo: "Computador lento: causas e soluções",
        to: "/blog/computador-lento-causas-solucoes",
        contexto: "Panorama das causas com verificação correspondente.",
      },
      {
        rotulo: "Windows 11 lento: como resolver",
        to: "/blog/windows-11-lento-como-resolver",
        contexto: "Ajustes específicos do sistema atual.",
      },
      {
        rotulo: "Limpar arquivos temporários do Windows",
        to: "/blog/limpar-arquivos-temporarios-windows",
        contexto: "Ganho real e limite dessa limpeza.",
      },
    ],
    servicos: [
      {
        rotulo: "Manutenção de computador",
        to: "/servicos/manutencao-de-computador",
        contexto: "Diagnóstico que identifica a família de causa antes de propor peça.",
      },
      {
        rotulo: "Remoção de vírus",
        to: "/servicos/remocao-de-virus",
        contexto: "Quando a piora repentina tem origem em software malicioso.",
      },
    ],
    cidades: CIDADES_BASE,
    relacionadas: ["ssd", "memoria-ram", "windows", "servico"],
    fontes: [
      {
        titulo: "Microsoft Support — Dicas para melhorar o desempenho do PC",
        url: "https://support.microsoft.com/pt-br/windows/dicas-para-melhorar-o-desempenho-do-pc-no-windows-b3b3ef5b-5953-fb6a-2528-4bbed82fba96",
      },
      {
        titulo: "CERT.br — Cartilha de Segurança",
        url: "https://cartilha.cert.br/",
        nota: "Referência para o recorte de lentidão causada por código malicioso.",
      },
    ],
  },
  {
    slug: "cidade",
    nome: "Cidade",
    tipo: "Local",
    tambemChamada: ["cobertura", "região atendida", "atendimento local"],
    resumo:
      "Entidade que delimita onde existe atendimento presencial próprio e onde o conteúdo técnico vale por si, sem cobertura operacional.",
    definicao: [
      "Cidade, nesta taxonomia, não é palavra-chave: é a delimitação honesta da cobertura. O portal mantém operação presencial em Curitiba e em cidades da região metropolitana, e conteúdo técnico de alcance nacional que não depende de deslocamento.",
      "A modalidade de atendimento muda com a distância e com o tipo de falha. Problema de sistema e configuração costuma ser resolvido por acesso remoto em qualquer lugar; falha de hardware exige visita, coleta ou bancada, e isso só se aplica dentro da área com cobertura real.",
      "Por isso cada página de cidade descreve deslocamento, modalidade e disponibilidade em vez de prometer prazo. Onde não há operação própria, o portal informa em vez de simular presença.",
    ],
    problemas: [
      {
        rotulo: "Índice de problemas",
        to: "/problemas",
        contexto: "Os sintomas atendidos são os mesmos em toda a área de cobertura.",
      },
    ],
    ferramentas: [
      {
        rotulo: "Checklist de computador lento",
        to: "/ferramentas/checklist-computador-lento",
        contexto: "Verificação que o usuário pode fazer antes de agendar visita.",
      },
    ],
    decisoes: [
      {
        rotulo: "Remoto ou presencial",
        to: "/decisoes/remoto-ou-presencial",
        contexto: "Decide se o deslocamento é necessário no seu caso.",
      },
    ],
    artigos: [
      {
        rotulo: "Guia técnico de informática",
        to: "/guia-tecnico-informatica",
        contexto: "Conteúdo técnico que não depende de localidade.",
      },
      {
        rotulo: "Autoridade técnica",
        to: "/autoridade-tecnica",
        contexto: "Como o portal produz e revisa o conteúdo publicado.",
      },
    ],
    servicos: [
      {
        rotulo: "Todos os serviços",
        to: "/servicos",
        contexto: "Escopo dos serviços disponíveis na área de cobertura.",
      },
      {
        rotulo: "Suporte para home office",
        to: "/servicos/suporte-home-office",
        contexto: "Atendimento que frequentemente dispensa deslocamento.",
      },
    ],
    cidades: CIDADES_BASE,
    relacionadas: ["servico", "wifi"],
    fontes: [
      {
        titulo: "IBGE — Região Metropolitana de Curitiba",
        url: "https://cidades.ibge.gov.br/brasil/pr/curitiba/panorama",
        nota: "Delimitação oficial dos municípios citados na cobertura.",
      },
    ],
  },
  {
    slug: "servico",
    nome: "Serviço",
    tipo: "Serviço",
    tambemChamada: ["atendimento técnico", "ordem de serviço", "modalidade"],
    resumo:
      "Entidade que descreve como um problema vira atendimento: triagem, modalidade, escopo aprovado e execução — com valores apresentados antes de qualquer intervenção.",
    definicao: [
      "Serviço é a ponte entre o conteúdo técnico e a execução. O caminho começa na triagem, em que o sintoma é descrito pelo cliente e traduzido em hipótese técnica; segue para a definição da modalidade — remoto, visita, coleta ou bancada — e só então para o escopo e o valor.",
      "Mão de obra e peça são itens distintos, e nenhum é executado sem aprovação. Quando a avaliação indica que o reparo não compensa, isso é dito: recomendar substituição ou não fazer nada também é resultado legítimo de uma avaliação técnica.",
      "Garantia existe conforme o serviço executado, delimitada ao que foi feito — não ao equipamento inteiro. Prazos são informados após a avaliação, porque dependem de peça, disponibilidade e modalidade.",
    ],
    problemas: [
      {
        rotulo: "Índice de problemas",
        to: "/problemas",
        contexto: "Cada sintoma indica quais serviços fazem sentido avaliar.",
      },
      {
        rotulo: "Notebook não liga",
        to: "/problemas/notebook-nao-liga",
        contexto: "Exemplo de caso que sempre exige presencial ou coleta.",
      },
    ],
    ferramentas: [
      {
        rotulo: "Checklist antes de formatar",
        to: "/ferramentas/checklist-antes-de-formatar",
        contexto: "O que o cliente prepara antes de entregar o equipamento.",
      },
      {
        rotulo: "Verificador de backup",
        to: "/ferramentas/verificador-de-backup",
        contexto: "Pré-requisito de qualquer serviço que mexa no disco.",
      },
    ],
    decisoes: [
      {
        rotulo: "Remoto ou presencial",
        to: "/decisoes/remoto-ou-presencial",
        contexto: "Define a modalidade antes do agendamento.",
      },
      {
        rotulo: "Consertar ou substituir",
        to: "/decisoes/consertar-ou-substituir",
        contexto: "Critério para não contratar reparo que não compensa.",
      },
    ],
    artigos: [
      {
        rotulo: "Guia técnico de informática",
        to: "/guia-tecnico-informatica",
        contexto: "Base técnica para decidir antes de contratar.",
      },
      {
        rotulo: "Guias de decisão",
        to: "/decisoes",
        contexto: "Índice das decisões que antecedem o orçamento.",
      },
    ],
    servicos: [
      {
        rotulo: "Todos os serviços",
        to: "/servicos",
        contexto: "Escopo, modalidade e limites de cada serviço.",
      },
      {
        rotulo: "Manutenção de notebook",
        to: "/servicos/manutencao-de-notebook",
        contexto: "Serviço com maior proporção de coleta e bancada.",
      },
      {
        rotulo: "Suporte técnico empresarial",
        to: "/servicos/suporte-tecnico-empresarial",
        contexto: "Atendimento recorrente para ambientes com vários equipamentos.",
      },
    ],
    cidades: CIDADES_BASE,
    relacionadas: ["cidade", "windows", "backup", "computador-lento"],
    fontes: [
      {
        titulo: "Código de Defesa do Consumidor — Lei 8.078/1990",
        url: "https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm",
        nota: "Base legal de orçamento prévio e garantia de serviço.",
      },
    ],
  },
];

export const ENTIDADE_SLUGS = ENTIDADES.map((e) => e.slug);

export const entidadePorSlug = (slug: string): Entidade | undefined =>
  ENTIDADES.find((e) => e.slug === slug);

/** Todos os links internos declarados por uma entidade (usado pelo gate). */
export const linksDaEntidade = (e: Entidade): string[] => [
  ...e.problemas,
  ...e.ferramentas,
  ...e.decisoes,
  ...e.artigos,
  ...e.servicos,
  ...e.cidades,
].map((l) => l.to);

/**
 * FASE 2 — limite operacional por entidade. Texto autoral, específico e
 * conservador: define até onde a verificação do próprio usuário é segura e
 * em que ponto continuar aumenta o risco de perda de dados ou de dano.
 */
export const LIMITES_ENTIDADE: Record<string, string[]> = {
  windows: [
    "Verificação segura: observar mensagens de erro, código exibido e o que mudou antes da falha.",
    "Quando parar: se a falha impede o sistema de carregar, não repita reinícios nem reparo automático em sequência — cada tentativa mexe em arquivos de sistema e reduz a chance de recuperação simples.",
    "Não recomendamos desativar proteção de sistema, Secure Boot ou antivírus de forma permanente para contornar erro.",
  ],
  ssd: [
    "Verificação segura: consultar o estado S.M.A.R.T. e conferir se a unidade é reconhecida pelo firmware e pelo sistema.",
    "Quando parar: unidade que some durante o uso, trava o sistema ou apresenta erro de leitura pede cópia imediata dos dados — não prossiga com teste de superfície nem reparticionamento.",
    "Interrompa qualquer clonagem se ela falhar duas vezes no mesmo ponto: há risco de perda de dados.",
  ],
  "memoria-ram": [
    "Verificação segura: observar o consumo real de memória no uso do dia a dia e registrar quando o travamento acontece.",
    "Quando parar: se o computador reinicia sozinho ou exibe tela azul durante o teste de memória, interrompa o teste e trate como falha de hardware.",
    "Não recomendamos alterar tensão ou perfil de memória no firmware para 'estabilizar' o sistema.",
  ],
  wifi: [
    "Verificação segura: comparar cabo e Wi-Fi no mesmo momento, conferir faixa de conexão e listar dispositivos conectados.",
    "Quando parar: se aparecerem dispositivos desconhecidos na rede, pare de investigar desempenho e trate o caso como incidente de segurança.",
    "Não recomendamos remover a senha da rede ou voltar para criptografia antiga para melhorar a conexão.",
  ],
  backup: [
    "Verificação segura: confirmar o que está sendo copiado, com que frequência e se a restauração realmente funciona.",
    "Quando parar: não prossiga com formatação, upgrade ou reparo enquanto a restauração de teste não tiver sido feita — é o cenário mais comum de perda irreversível.",
    "Se o disco de origem já apresenta falha, pare de rodar backup completo repetido e priorize copiar os arquivos insubstituíveis.",
  ],
  "erro-0xc0000428": [
    "Verificação segura: anotar o arquivo citado na tela e se a falha começou após atualização, troca de disco ou clonagem.",
    "Quando parar: não prossiga desativando verificação de assinatura de driver como solução definitiva — é redução permanente de proteção.",
    "Se o disco de sistema estiver criptografado e a chave de recuperação não estiver acessível, interrompa: mover ou reparar a unidade pode tornar os dados inacessíveis.",
  ],
  "computador-lento": [
    "Verificação segura: identificar quando a lentidão aparece e observar disco, memória e temperatura sob a carga real de uso.",
    "Quando parar: se o equipamento também desliga sozinho, esquenta demais ou faz ruído, pare de tratar como lentidão de software.",
    "Não recomendamos programas 'otimizadores' que prometem ganho automático — costumam remover componentes do sistema.",
  ],
  cidade: [
    "Verificação segura: confirmar a modalidade de atendimento aplicável ao caso e ao endereço antes de agendar.",
    "Quando parar: em caso de cheiro de queimado, contato com líquido ou fumaça, pare imediatamente de ligar o equipamento e trate como urgência.",
    "Atendimento presencial depende de disponibilidade real — não prometemos horário sem confirmação.",
  ],
  servico: [
    "Verificação segura: exigir orçamento com escopo escrito antes da execução, separando peça de mão de obra.",
    "Quando parar: não autorize procedimento em equipamento com dados críticos antes de ter backup verificado.",
    "Se o diagnóstico ainda não foi concluído, não recomendamos autorizar troca de peça 'por tentativa'.",
  ],
};
