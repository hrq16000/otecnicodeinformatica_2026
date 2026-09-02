/**
 * ============================================================================
 * AUTORIDADE TÉCNICA NACIONAL — fonte única de /autoridade-tecnica
 * ============================================================================
 * A página reúne, em um só lugar, COMO o conteúdo técnico do portal é
 * produzido, QUAIS clusters temáticos existem e QUAIS fontes primárias
 * sustentam cada um deles.
 *
 * Regras não negociáveis:
 *  - Todo `to` aponta para rota que já existe (validado por check:internal-links
 *    e pelos testes de rota). Nada aqui cria URL nova.
 *  - Fonte primária é sempre link externo oficial (fabricante, órgão ou norma).
 *    Nunca copiamos texto da fonte: referenciamos.
 *  - Nenhuma afirmação de volume, avaliação, certificação ou resultado.
 *  - Cada cluster segue a mesma estrutura editorial do padrão de qualidade
 *    adotado no portal: fundamento → sintomas → verificação segura → quando
 *    parar → decisão → ferramenta → serviço.
 */
import { ATLAS_REVISADO_EM } from "@/lib/atlasInformatica";

export const AUTORIDADE_REVISADO_EM = ATLAS_REVISADO_EM;

export interface LinkAutoridade {
  label: string;
  to: string;
}

export interface FonteOficial {
  titulo: string;
  url: string;
  nota: string;
}

export interface ClusterAutoridade {
  /** Âncora estável: #cluster-<id>. Também usada no ItemList do JSON-LD. */
  id: string;
  titulo: string;
  /** Fundamento técnico do cluster — o que a pessoa precisa entender antes. */
  fundamento: string;
  /** Sintomas típicos que levam alguém a este cluster. */
  sintomas: string[];
  /** Verificações que não colocam dados nem hardware em risco. */
  verificacao: string[];
  /** Critérios objetivos de parada — quando insistir piora o caso. */
  quandoParar: string[];
  /** A decisão que o cluster ajuda a tomar. */
  decisao: string;
  /** Ferramentas/checklists do próprio portal. */
  ferramentas: LinkAutoridade[];
  /** Aprofundamento: trilha do Atlas, sintomas e guias de decisão. */
  aprofundar: LinkAutoridade[];
  /** Serviço canônico correspondente (a ponte comercial, sempre por último). */
  servicos: LinkAutoridade[];
  /** Fontes primárias que sustentam o cluster. */
  fontes: FonteOficial[];
}

export const CLUSTERS_AUTORIDADE: ClusterAutoridade[] = [
  {
    id: "windows-inicializacao",
    titulo: "Windows e inicialização",
    fundamento:
      "Entre apertar o botão e ver a área de trabalho existem fases distintas: firmware (BIOS/UEFI), seleção do dispositivo de boot, carregamento do gerenciador de inicialização, carga do kernel e, só então, o logon. Cada fase falha de um jeito diferente, e é a fase — não a mensagem na tela — que define o reparo. Um erro exibido antes do logotipo do Windows raramente tem a mesma origem de um travamento que acontece depois dele.",
    sintomas: [
      "Mensagem de erro com código antes de o Windows carregar (por exemplo, falhas de assinatura digital ou de arquivo de boot ausente)",
      "Reparo automático em loop, sem nunca concluir",
      "O computador liga, mostra o logotipo do fabricante e volta a reiniciar",
      "Depois de uma atualização interrompida, o sistema não passa da tela de carregamento",
    ],
    verificacao: [
      "Anote a mensagem exata e em que momento ela aparece — antes ou depois do logotipo do Windows.",
      "Remova pendrives, cartões e HDs externos: o firmware pode estar tentando iniciar pelo dispositivo errado.",
      "Confira no firmware se o disco do sistema continua sendo reconhecido e se a ordem de boot está coerente.",
      "Verifique se o modo de inicialização (UEFI ou Legacy) é o mesmo com que o sistema foi instalado.",
    ],
    quandoParar: [
      "Quando a solução encontrada em fórum pede para desativar permanentemente Secure Boot, verificação de assinatura ou antivírus — isso troca um problema por um risco.",
      "Quando há arquivos importantes sem cópia: antes de qualquer reinstalação, os dados vêm primeiro.",
      "Quando o disco emite ruído, some da lista do firmware ou reaparece de forma intermitente.",
    ],
    decisao:
      "A decisão real é reparar o sistema no lugar ou reinstalar. Reparo faz sentido quando a falha é pontual e o disco está saudável; reinstalação faz sentido quando a base do sistema está corrompida — e só depois que os dados estiverem preservados.",
    ferramentas: [
      { label: "Roteiro de falha de inicialização", to: "/ferramentas/roteiro-falha-de-inicializacao" },
      { label: "Checklist antes de formatar", to: "/ferramentas/checklist-antes-de-formatar" },
    ],
    aprofundar: [
      { label: "Atlas — Windows e inicialização", to: "/guia-tecnico-informatica#tema-windows-inicializacao" },
      { label: "Windows não inicia", to: "/problemas/windows-nao-inicia" },
      { label: "Tela azul", to: "/problemas/tela-azul" },
      { label: "Decisão: formatar ou reparar", to: "/decisoes/formatar-ou-reparar" },
      { label: "Glossário: UEFI", to: "/glossario/uefi" },
      { label: "Glossário: Secure Boot", to: "/glossario/secure-boot" },
    ],
    servicos: [
      { label: "Formatação com preservação de dados", to: "/servicos/formatacao" },
      { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
    ],
    fontes: [
      {
        titulo: "Microsoft Learn — solução avançada de problemas de inicialização",
        url: "https://learn.microsoft.com/en-us/troubleshoot/windows-client/performance/windows-boot-issues-troubleshooting",
        nota: "Fases oficiais do processo de boot usadas para localizar a falha.",
      },
      {
        titulo: "Microsoft Learn — Secure Boot",
        url: "https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/oem-secure-boot",
        nota: "Referência de por que a verificação de assinatura existe e o que ela protege.",
      },
    ],
  },
  {
    id: "seguranca-malware",
    titulo: "Segurança e malware",
    fundamento:
      "Infecção não é sinônimo de vírus clássico. O que mais aparece hoje são adware e sequestro de navegador (incômodos, mas reversíveis), roubo de credencial (silencioso e grave) e ransomware (que criptografa arquivos e transforma o caso em incidente de dados). O tratamento correto depende dessa classificação — e não da urgência que a tela mostra.",
    sintomas: [
      "Página inicial e mecanismo de busca do navegador trocados sem autorização",
      "Anúncios e abas abrindo sozinhos, inclusive fora do navegador",
      "Arquivos com extensão alterada e um aviso de resgate",
      "Lentidão que começa junto com o sistema, mesmo sem programas abertos",
      "Aviso de login em conta a partir de local desconhecido",
    ],
    verificacao: [
      "Verifique a lista de extensões do navegador e remova o que você não instalou conscientemente.",
      "Confira quais programas iniciam com o Windows e o que foi instalado nos últimos dias.",
      "Faça a varredura com a proteção nativa atualizada, sem acumular dois antivírus ativos ao mesmo tempo.",
      "Troque as senhas críticas a partir de outro dispositivo confiável, e não do equipamento suspeito.",
    ],
    quandoParar: [
      "Diante de suspeita de ransomware: desconecte da rede, não pague, não renomeie arquivos e preserve o estado do equipamento.",
      "Quando o problema envolve acesso a conta bancária ou corporativa — a prioridade passa a ser contenção e troca de credenciais.",
      "Antes de instalar qualquer 'otimizador' vindo de anúncio: essa é a origem mais comum de reinfecção.",
    ],
    decisao:
      "A decisão é entre limpeza dirigida e reinstalação limpa. Adware e sequestro de navegador costumam sair com remoção dirigida; comprometimento de credenciais ou de componentes do sistema pede reinstalação e revisão dos acessos.",
    ferramentas: [
      { label: "Verificador de backup", to: "/ferramentas/verificador-de-backup" },
      { label: "Checklist antes de formatar", to: "/ferramentas/checklist-antes-de-formatar" },
    ],
    aprofundar: [
      { label: "Atlas — Segurança e privacidade", to: "/guia-tecnico-informatica#tema-seguranca-privacidade" },
      { label: "Como saber se o PC tem vírus", to: "/blog/como-saber-se-pc-tem-virus-malware" },
      { label: "Segurança dos dados", to: "/seguranca-dos-dados" },
      { label: "Glossário: BitLocker", to: "/glossario/bitlocker" },
    ],
    servicos: [
      { label: "Remoção de vírus e malware", to: "/servicos/remocao-de-virus" },
      { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
    ],
    fontes: [
      {
        titulo: "CISA — StopRansomware Guide",
        url: "https://www.cisa.gov/stopransomware/ransomware-guide",
        nota: "Base oficial do passo de parada obrigatória em suspeita de ransomware.",
      },
      {
        titulo: "CERT.br — Cartilha de Segurança para a Internet",
        url: "https://cartilha.cert.br/",
        nota: "Referência nacional de boas práticas para usuário final e pequenas empresas.",
      },
      {
        titulo: "Microsoft Learn — Microsoft Defender Antivírus",
        url: "https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-antivirus-windows",
        nota: "Documenta o comportamento da proteção nativa e por que não empilhar antivírus.",
      },
    ],
  },
  {
    id: "hardware-desempenho",
    titulo: "Hardware e desempenho",
    fundamento:
      "Lentidão quase nunca é uma coisa só. Existem quatro gargalos independentes: armazenamento (disco mecânico ou SSD saturado), memória (RAM insuficiente para o uso real), temperatura (redução automática de desempenho por calor) e software (excesso de processos na inicialização). Cada gargalo tem uma assinatura observável diferente — e trocar a peça errada não devolve desempenho nenhum.",
    sintomas: [
      "Demora para ligar e para abrir qualquer programa, desde o primeiro minuto",
      "Travamentos só quando há muitos programas ou muitas abas abertas",
      "Desempenho normal nos primeiros minutos e queda progressiva depois",
      "Ruído de clique no disco, travamentos de leitura ou alerta de integridade",
    ],
    verificacao: [
      "Observe quando a lentidão aparece: desde o boot, sob carga ou só depois de aquecer.",
      "Confira o espaço livre do disco do sistema e a quantidade de programas que iniciam junto com o Windows.",
      "Acompanhe o uso de disco, memória e CPU no gerenciador de tarefas durante o momento de lentidão.",
      "Verifique a temperatura e se as saídas de ar estão obstruídas antes de concluir que é falta de peça.",
    ],
    quandoParar: [
      "Ao primeiro sinal de falha de disco (ruído, alerta de integridade, travamento de leitura): pare e priorize a cópia dos dados.",
      "Quando há cheiro de queimado, desligamento súbito ou marca de aquecimento visível.",
      "Antes de comprar peça por indicação de fórum, sem ter identificado qual gargalo é o real.",
    ],
    decisao:
      "A decisão é qual upgrade resolve — ou se compensa reparar. Disco lento pede SSD; travamento sob multitarefa pede memória; queda por calor pede manutenção térmica. E, em equipamentos antigos, o custo do reparo precisa ser comparado ao de substituir.",
    ferramentas: [
      { label: "Checklist de computador lento", to: "/ferramentas/checklist-computador-lento" },
      { label: "SSD ou RAM: qual resolve?", to: "/ferramentas/ssd-ou-ram" },
    ],
    aprofundar: [
      { label: "Atlas — Hardware e upgrades", to: "/guia-tecnico-informatica#tema-hardware-upgrades" },
      { label: "Computador lento", to: "/problemas/computador-lento" },
      { label: "Computador esquentando", to: "/problemas/computador-esquentando" },
      { label: "Decisão: trocar componente ou reparar", to: "/decisoes/trocar-componente-ou-reparar" },
      { label: "Glossário: thermal throttling", to: "/glossario/thermal-throttling" },
    ],
    servicos: [
      { label: "Upgrade de SSD e memória", to: "/servicos/upgrade-ssd-ram" },
      { label: "Manutenção de notebook", to: "/servicos/manutencao-de-notebook" },
    ],
    fontes: [
      {
        titulo: "NVM Express — especificação oficial",
        url: "https://nvmexpress.org/specifications/",
        nota: "Base técnica da diferença real entre interfaces de armazenamento.",
      },
      {
        titulo: "Microsoft Learn — ferramentas de desempenho do Windows",
        url: "https://learn.microsoft.com/en-us/windows-hardware/test/wpt/",
        nota: "Documentação oficial de medição de desempenho, no lugar de achismo.",
      },
    ],
  },
  {
    id: "redes-wifi",
    titulo: "Redes e Wi-Fi",
    fundamento:
      "Wi-Fi instável e internet lenta são problemas diferentes. O Wi-Fi é o trecho entre o aparelho e o roteador — sofre com distância, parede, canal congestionado e faixa de frequência. A internet é o trecho do provedor para fora. Testar o mesmo problema no cabo e no celular separa os dois em poucos minutos e evita trocar equipamento à toa.",
    sintomas: [
      "Sinal cai em cômodos específicos, mas funciona ao lado do roteador",
      "Velocidade boa no cabo e ruim no Wi-Fi (ou o contrário)",
      "Quedas em horários determinados do dia",
      "A impressora ou o serviço de rede some da lista sem ninguém mexer",
    ],
    verificacao: [
      "Teste o mesmo serviço em dois aparelhos e, se possível, com cabo — isso separa aparelho, roteador e provedor.",
      "Compare o comportamento nas faixas de 2,4 GHz e 5 GHz: alcance e interferência são diferentes.",
      "Verifique se o roteador está em local aberto, longe de metal, micro-ondas e caixa de energia.",
      "Confira quais dispositivos estão conectados e se a rede usa proteção atual (WPA2 ou WPA3).",
    ],
    quandoParar: [
      "Antes de alterar configurações avançadas do roteador sem anotar os valores atuais.",
      "Quando a instabilidade acompanha reclamação de vizinhança ou obra na rua — o problema pode estar fora do imóvel.",
      "Quando há suspeita de acesso não autorizado à rede: a prioridade passa a ser trocar credenciais, não ajustar canal.",
    ],
    decisao:
      "A decisão é ajustar, reposicionar ou ampliar. Ajuste de canal e posição resolve boa parte dos casos; ampliação (repetidor, malha ou ponto cabeado) só faz sentido depois de confirmar que o problema é de cobertura, e não do provedor.",
    ferramentas: [{ label: "Roteiro de Wi-Fi instável", to: "/ferramentas/roteiro-wifi-instavel" }],
    aprofundar: [
      { label: "Atlas — Redes e Wi-Fi", to: "/guia-tecnico-informatica#tema-redes-wifi" },
      { label: "Wi-Fi instável", to: "/problemas/wifi-instavel" },
      { label: "Internet lenta: provedor ou roteador?", to: "/blog/internet-lenta-provedor-ou-roteador" },
      { label: "Glossário: DNS", to: "/glossario/dns" },
    ],
    servicos: [
      { label: "Redes e Wi-Fi", to: "/servicos/redes-e-wifi" },
      { label: "Suporte para home office", to: "/servicos/suporte-home-office" },
    ],
    fontes: [
      {
        titulo: "Wi-Fi Alliance — segurança de redes Wi-Fi",
        url: "https://www.wi-fi.org/discover-wi-fi/security",
        nota: "Padrões oficiais WPA2 e WPA3 citados na verificação de rede.",
      },
      {
        titulo: "Anatel — qualidade dos serviços de banda larga",
        url: "https://www.gov.br/anatel/pt-br/consumidor",
        nota: "Referência nacional quando a falha está no serviço do provedor.",
      },
    ],
  },
  {
    id: "produtividade-empresas",
    titulo: "Produtividade e manutenção empresarial",
    fundamento:
      "Em ambiente com vários equipamentos, o custo não está no reparo isolado: está na parada. Isso muda a lógica — inventário, padronização de máquinas, backup testado e um plano de substituição previsível valem mais do que qualquer intervenção heroica depois que a operação já parou.",
    sintomas: [
      "Cada máquina do escritório tem uma configuração e um problema diferente",
      "O backup existe, mas nunca foi restaurado para valer",
      "Uma falha em um computador interrompe o trabalho de várias pessoas",
      "Ninguém sabe quem é responsável administrativo por cada sistema contratado",
    ],
    verificacao: [
      "Liste os equipamentos, a idade de cada um e qual função depende de qual máquina.",
      "Teste uma restauração real de backup — cópia que nunca foi restaurada é hipótese, não garantia.",
      "Verifique se existe usuário administrador separado do usuário do dia a dia.",
      "Anote responsáveis, e-mails de recuperação e onde ficam as licenças de cada sistema.",
    ],
    quandoParar: [
      "Antes de alterar configurações de servidor, firewall ou contas administrativas sem janela combinada.",
      "Quando a intervenção pode parar mais de um posto de trabalho no horário de operação.",
      "Quando há dado sensível envolvido e nenhuma cópia verificada.",
    ],
    decisao:
      "A decisão é entre reagir a chamados e manter uma rotina preventiva. Manutenção preventiva é avaliada caso a caso, conforme número de equipamentos e criticidade — não existe plano padronizado publicado.",
    ferramentas: [
      { label: "Verificador de backup", to: "/ferramentas/verificador-de-backup" },
      { label: "Decisão: nuvem ou HD externo", to: "/decisoes/nuvem-ou-hd-externo" },
    ],
    aprofundar: [
      { label: "Atlas — Informática para empresas", to: "/guia-tecnico-informatica#tema-informatica-empresas" },
      { label: "Soluções para empresas", to: "/empresas" },
      { label: "Organização de TI para pequenos escritórios", to: "/blog/organizacao-de-ti-para-pequenos-escritorios" },
      { label: "Decisão: backup antes da manutenção", to: "/decisoes/backup-antes-da-manutencao" },
    ],
    servicos: [
      { label: "Suporte técnico empresarial", to: "/servicos/suporte-tecnico-empresarial" },
      { label: "Backup e proteção de dados", to: "/solucoes/backup" },
    ],
    fontes: [
      {
        titulo: "NIST SP 800-34 Rev. 1 — planejamento de contingência",
        url: "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
        nota: "Referência de continuidade aplicada a ambientes com vários equipamentos.",
      },
      {
        titulo: "CERT.br — fascículos da Cartilha (Backup)",
        url: "https://cartilha.cert.br/fasciculos/",
        nota: "Fundamento de cópia de segurança e teste de restauração.",
      },
    ],
  },
];

/** Método editorial declarado — cada etapa é verificável no próprio conteúdo. */
export const METODO_EDITORIAL: { titulo: string; desc: string }[] = [
  {
    titulo: "Fundamento antes do procedimento",
    desc: "Nenhuma página começa por 'faça isto'. Primeiro explicamos o mecanismo — por que a falha acontece — para que a decisão seja sua, e não um passo copiado.",
  },
  {
    titulo: "Verificação segura, com limite declarado",
    desc: "Só publicamos verificações que não colocam dados nem hardware em risco. Onde o risco começa, o texto diz para parar em vez de continuar orientando.",
  },
  {
    titulo: "Fonte primária referenciada, nunca copiada",
    desc: "Comportamento de sistema e política de segurança são apoiados em documentação oficial de fabricante e em órgãos como CISA, CERT.br e NIST. Citamos e linkamos; não reproduzimos o texto da fonte.",
  },
  {
    titulo: "Sem prova comercial não verificável",
    desc: "Não publicamos avaliação, depoimento, percentual de sucesso, volume de clientes ou certificação sem evidência auditável. Quando não há prova, o bloco simplesmente não existe.",
  },
  {
    titulo: "Revisão técnica na bancada",
    desc: "O conteúdo é revisado por quem executa o reparo. Quando a experiência prática contradiz o senso comum da internet, o texto assume a posição da bancada e explica o porquê.",
  },
];

/** Limites explícitos — o que este portal NÃO afirma ser. */
export const LIMITES_DECLARADOS: string[] = [
  "Não somos órgão certificador nem fabricante: as normas e documentações citadas pertencem às suas respectivas instituições.",
  "Cobertura operacional própria é Curitiba e Região Metropolitana; o conteúdo técnico é nacional, o atendimento presencial não.",
  "Prazos, valores e garantia dependem do serviço executado e são informados antes da autorização.",
  "Nenhum conteúdo aqui substitui diagnóstico presencial quando há dado crítico ou suspeita de falha física.",
];
