import type { FontePrimaria } from "@/lib/enriquecimento";

/**
 * FASE 3 — BIBLIOTECA TÉCNICA · GLOSSÁRIO NACIONAL
 *
 * Fonte única dos termos do glossário (/glossario e /glossario/<termo>).
 * Regras editoriais (herdam a governança do Atlas):
 *  - Conteúdo original, sem cópia de fontes; fontes primárias citadas de
 *    forma visível com rel="noopener nofollow".
 *  - Nenhum número inventado, nenhuma promessa de resultado.
 *  - "O que é seguro verificar" nunca inclui abrir equipamento em garantia,
 *    zerar BIOS/UEFI sem registro, nem desativar proteções permanentemente.
 *  - Cada termo tem UMA intenção: definicional. Diagnóstico fica em
 *    /problemas, execução comercial em /servicos, decisão no Atlas.
 *  - Links internos só quando o vínculo é real (gate check:biblioteca valida
 *    todos os destinos no SSR).
 */

export type RiscoNivel = "Seguro de fazer sozinho" | "Exige atenção" | "Parada obrigatória";

export type LinkContextual = {
  rotulo: string;
  to: string;
  /** Frase curta que justifica o vínculo — vira texto visível na página. */
  contexto: string;
};

export type CategoriaGlossario =
  | "Sistema e inicialização"
  | "Armazenamento e dados"
  | "Segurança"
  | "Redes"
  | "Hardware e desempenho";

export type TermoGlossario = {
  slug: string;
  termo: string;
  /** Expansão da sigla ou nome completo, quando existir. */
  expansao?: string;
  categoria: CategoriaGlossario;
  /** 1–2 frases: aparece no hub e alimenta a meta description. */
  resumo: string;
  /** O que é — parágrafos autorais. */
  definicao: string[];
  /** Por que importa para quem usa o computador no dia a dia. */
  porQueImporta: string;
  /** Sintomas do dia a dia relacionados ao termo. */
  sintomas: string[];
  /** Verificações que não colocam dados nem garantia em risco. */
  verificacoesSeguras: string[];
  /** O que NÃO fazer — limites explícitos. */
  naoFazer: string[];
  /** Nível de risco de mexer por conta própria no que este termo envolve. */
  risco: RiscoNivel;
  riscoNota: string;
  /** Pontes reais para Atlas, problemas, serviços e ferramentas. */
  links: LinkContextual[];
  /** Slugs de outros termos do glossário. */
  relacionados: string[];
  fontes: FontePrimaria[];
};

export const GLOSSARIO_REVISADO_EM = "2026-09-02";

export const TERMOS_GLOSSARIO: TermoGlossario[] = [
  // ── SISTEMA E INICIALIZAÇÃO ────────────────────────────────────────────────
  {
    slug: "bsod",
    termo: "BSOD (tela azul)",
    expansao: "Blue Screen of Death — tela azul de erro crítico do Windows",
    categoria: "Sistema e inicialização",
    resumo:
      "Tela azul que o Windows exibe quando um erro crítico impede o sistema de continuar. O código de parada indica a família do problema, não a peça exata.",
    definicao: [
      "BSOD é a tela azul que o Windows mostra quando encontra um erro grave o suficiente para não conseguir continuar funcionando com segurança. O sistema interrompe tudo, grava um registro do estado da memória (dump) e reinicia. Não é um defeito em si: é o mecanismo de proteção que impede que um erro corrompa seus arquivos.",
      "Cada tela azul traz um código de parada (stop code), como CRITICAL_PROCESS_DIED ou MEMORY_MANAGEMENT. Esse código aponta a família do problema — driver, memória, disco, energia — mas não identifica sozinho a peça defeituosa. Duas telas azuis com o mesmo código podem ter causas completamente diferentes.",
    ],
    porQueImporta:
      "Uma tela azul isolada depois de uma atualização pode ser irrelevante. Telas azuis repetidas são o sistema avisando que algo estrutural está errado — e continuar usando o equipamento sem investigar pode transformar um problema de driver em perda de arquivos.",
    sintomas: [
      "Tela azul aparece durante jogos ou programas pesados, mas não no uso leve.",
      "O computador reinicia sozinho e o Windows menciona 'recuperação de um erro'.",
      "A tela azul sempre exibe o mesmo código de parada.",
      "Depois da tela azul, o Windows demora muito mais para iniciar.",
    ],
    verificacoesSeguras: [
      "Anotar (ou fotografar) o código de parada exato — ele orienta toda a investigação.",
      "Observar se a tela azul acontece em situação repetível: mesmo programa, mesmo horário, mesmo periférico conectado.",
      "Desconectar periféricos USB não essenciais e observar se o padrão muda.",
      "Verificar no Windows Update se há atualização de driver pendente — sem instalar nada de sites de terceiros.",
    ],
    naoFazer: [
      "Não instalar 'reparadores de tela azul' ou otimizadores baixados de anúncios — a maioria agrava o problema ou instala adware.",
      "Não formatar de imediato: se a causa for hardware (RAM, disco, superaquecimento), a formatação só adia o sintoma.",
      "Não desativar o arquivo de paginação nem 'reiniciar forçado' repetidas vezes para 'passar' da tela — cada travamento em disco com problema aumenta o risco para os dados.",
    ],
    risco: "Exige atenção",
    riscoNota:
      "Anotar o código e observar o padrão é seguro. A investigação profunda (dump, teste de memória, saúde do disco) deve vir antes de qualquer reinstalação.",
    links: [
      {
        rotulo: "Tela azul: diagnóstico completo do sintoma",
        to: "/problemas/tela-azul",
        contexto: "Página diagnóstica com padrões por código de parada e quando parar.",
      },
      {
        rotulo: "Roteiro de falha de inicialização",
        to: "/ferramentas/roteiro-falha-de-inicializacao",
        contexto: "Checklist seguro para quando o Windows não volta depois da tela azul.",
      },
      {
        rotulo: "Atlas: Windows e sistema",
        to: "/guia-tecnico-informatica",
        contexto: "Trilha de fundamentos do sistema no Atlas de Informática.",
      },
    ],
    relacionados: ["memoria-ram", "smart", "uefi"],
    fontes: [
      {
        titulo: "Microsoft Learn — Bug Check Code Reference",
        url: "https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-code-reference2",
        nota: "referência oficial dos códigos de parada do Windows",
      },
    ],
  },
  {
    slug: "uefi",
    termo: "UEFI",
    expansao: "Unified Extensible Firmware Interface",
    categoria: "Sistema e inicialização",
    resumo:
      "Firmware moderno que liga o hardware e entrega o controle ao sistema operacional. Substituiu o BIOS tradicional e habilita Secure Boot, discos GPT e inicialização rápida.",
    definicao: [
      "UEFI é o programa gravado na placa-mãe que executa antes de qualquer sistema operacional. Quando você aperta o botão de ligar, é o UEFI que testa o hardware básico, localiza o disco de inicialização e entrega o controle ao Windows ou Linux.",
      "Ele substituiu o BIOS tradicional na maioria dos equipamentos fabricados na última década, trazendo suporte a discos grandes (particionamento GPT), inicialização mais rápida e o Secure Boot — que impede programas não assinados de carregarem antes do sistema.",
    ],
    porQueImporta:
      "Configurações erradas no UEFI impedem o computador de iniciar mesmo com hardware perfeito. Também é nele que se habilita o TPM e o Secure Boot exigidos pelo Windows 11 — e onde uma mudança de modo de disco (AHCI/RAID) feita sem critério pode deixar o Windows sem enxergar o próprio disco.",
    sintomas: [
      "Computador liga, mostra o logotipo do fabricante e informa 'no bootable device'.",
      "Windows 11 recusado na atualização por falta de Secure Boot ou TPM.",
      "Depois de trocar a bateria da placa ou de uma queda de energia, data e hora zeradas e o sistema não inicia.",
      "Equipamento entra direto na tela de configuração em vez de carregar o Windows.",
    ],
    verificacoesSeguras: [
      "Consultar a tecla de acesso à configuração no manual do fabricante (geralmente F2, F10 ou Del) e apenas OBSERVAR a ordem de inicialização, sem salvar mudanças.",
      "Conferir se o disco aparece listado na tela de informações do firmware — se não aparece, o problema é físico ou de conexão, não de Windows.",
      "Verificar data e hora do firmware: zeradas indicam bateria da placa esgotada.",
    ],
    naoFazer: [
      "Não atualizar o firmware por conta própria em notebook fora da tomada ou sem motivo específico — atualização interrompida pode inutilizar a placa.",
      "Não alternar o modo do disco (AHCI/RAID/IDE) com o sistema já instalado: o Windows pode parar de iniciar.",
      "Não desativar o Secure Boot permanentemente para 'resolver' um erro de inicialização sem entender a causa.",
    ],
    risco: "Exige atenção",
    riscoNota:
      "Observar telas de configuração é seguro. Alterar ordem de boot, modo de disco ou atualizar firmware exige registro do estado anterior e critério técnico.",
    links: [
      {
        rotulo: "Windows não inicia: diagnóstico do sintoma",
        to: "/problemas/windows-nao-inicia",
        contexto: "O caminho diagnóstico quando o firmware liga mas o sistema não carrega.",
      },
      {
        rotulo: "Roteiro de falha de inicialização",
        to: "/ferramentas/roteiro-falha-de-inicializacao",
        contexto: "Sequência segura para separar falha de firmware, disco e sistema.",
      },
      {
        rotulo: "Atlas de Informática",
        to: "/guia-tecnico-informatica",
        contexto: "Fundamentos de inicialização explicados na trilha do Atlas.",
      },
    ],
    relacionados: ["bios", "tpm", "bitlocker"],
    fontes: [
      {
        titulo: "UEFI Forum — Specifications",
        url: "https://uefi.org/specifications",
        nota: "especificação oficial mantida pelo UEFI Forum",
      },
    ],
  },
  {
    slug: "bios",
    termo: "BIOS",
    expansao: "Basic Input/Output System",
    categoria: "Sistema e inicialização",
    resumo:
      "Firmware clássico das placas-mãe: testa o hardware ao ligar e inicia o sistema. Hoje o termo é usado no dia a dia para qualquer tela de configuração de firmware, mesmo UEFI.",
    definicao: [
      "BIOS é o firmware original dos PCs: um programa pequeno gravado em um chip da placa-mãe que executa o teste inicial de hardware (POST), configura componentes básicos e procura um disco para iniciar o sistema operacional.",
      "Em equipamentos modernos o BIOS clássico foi substituído pelo UEFI, mas o nome ficou: quando um técnico fala 'entrar no BIOS', normalmente se refere à tela de configuração do firmware — seja ela BIOS legado ou UEFI. Os bipes de erro ao ligar e a contagem de memória são heranças diretas do POST do BIOS.",
    ],
    porQueImporta:
      "O comportamento do computador nos primeiros segundos — bipes, LEDs, logotipo, mensagens — é a informação mais valiosa para separar defeito de hardware de problema de sistema. Entender o papel do BIOS/firmware evita formatações inúteis quando o problema nem chega ao Windows.",
    sintomas: [
      "Computador liga, emite bipes e não mostra imagem.",
      "Equipamento entra sozinho na tela de configuração toda vez que liga.",
      "Mensagem 'CMOS checksum error' ou data/hora sempre erradas.",
      "Ventoinhas giram, LEDs acendem, mas nada aparece na tela.",
    ],
    verificacoesSeguras: [
      "Contar o padrão de bipes (se houver) e anotar — cada fabricante documenta o significado no manual da placa.",
      "Observar até onde o equipamento chega: logotipo? tela de configuração? mensagem de erro? Isso delimita a investigação.",
      "Conferir se teclado e monitor estão em portas que funcionam (testar outra porta/cabo).",
    ],
    naoFazer: [
      "Não fazer 'clear CMOS' com jumper ou remoção de bateria sem fotografar as configurações antes — perfis de disco e boot personalizados se perdem.",
      "Não atualizar o BIOS como tentativa genérica de conserto: só quando o fabricante indica correção para o sintoma específico.",
      "Não abrir notebook em garantia para chegar à bateria do CMOS.",
    ],
    risco: "Exige atenção",
    riscoNota:
      "Observar bipes e telas é seguro. Reset de CMOS, troca de bateria da placa e atualização de firmware pedem registro prévio e cuidado com garantia.",
    links: [
      {
        rotulo: "Notebook não liga: diagnóstico do sintoma",
        to: "/problemas/notebook-nao-liga",
        contexto: "Quando o problema acontece antes do sistema, a investigação começa pelo firmware.",
      },
      {
        rotulo: "Computador não dá imagem",
        to: "/problemas/computador-nao-da-imagem",
        contexto: "Padrões de POST sem vídeo e o que cada um indica.",
      },
      {
        rotulo: "Roteiro de falha de inicialização",
        to: "/ferramentas/roteiro-falha-de-inicializacao",
        contexto: "Passo a passo seguro do botão de ligar até o Windows.",
      },
    ],
    relacionados: ["uefi", "memoria-ram", "bsod"],
    fontes: [
      {
        titulo: "UEFI Forum — Specifications",
        url: "https://uefi.org/specifications",
        nota: "documenta a transição do BIOS legado para o UEFI",
      },
    ],
  },
  {
    slug: "imagem-do-sistema",
    termo: "Imagem do sistema",
    categoria: "Sistema e inicialização",
    resumo:
      "Cópia completa do disco — sistema, programas, configurações e arquivos — que permite restaurar o computador inteiro ao estado do momento da captura.",
    definicao: [
      "Imagem do sistema é uma fotografia completa do disco em um momento específico: sistema operacional, programas instalados, configurações e arquivos, tudo em um único pacote restaurável. Diferente do backup de arquivos, que salva apenas documentos, a imagem permite voltar o computador inteiro ao estado exato do dia da captura.",
      "É o recurso ideal antes de mudanças arriscadas — troca de disco, atualização grande do sistema, formatação — porque garante um caminho de volta. A restauração, porém, é tudo-ou-nada: volta o disco inteiro, sobrescrevendo o que existir.",
    ],
    porQueImporta:
      "Quem tem uma imagem recente transforma um desastre (disco morto, atualização que quebrou o sistema, ransomware) em uma tarde de restauração. Quem não tem depende de reinstalar tudo do zero e torcer para o backup de arquivos estar completo.",
    sintomas: [
      "Você adia a formatação porque 'reinstalar tudo' levaria dias.",
      "Trocar o HD por SSD parece arriscado porque o sistema tem programas difíceis de reinstalar.",
      "Depois de uma atualização, o sistema ficou instável e não há ponto de retorno.",
    ],
    verificacoesSeguras: [
      "Verificar se existe imagem ou backup recente ANTES de qualquer manutenção — e testar se o destino (HD externo) está legível.",
      "Conferir o espaço necessário: a imagem ocupa aproximadamente o espaço usado do disco, não o total.",
      "Manter a imagem em disco externo separado, nunca no mesmo disco que ela protege.",
    ],
    naoFazer: [
      "Não confiar em uma imagem que nunca foi testada — imagem corrompida descoberta na hora da restauração não vale nada.",
      "Não guardar a única cópia da imagem no próprio computador.",
      "Não confundir ponto de restauração do Windows (só configurações do sistema) com imagem completa.",
    ],
    risco: "Seguro de fazer sozinho",
    riscoNota:
      "Criar uma imagem é seguro e não altera o sistema. A restauração é que sobrescreve tudo — nesse ponto, na dúvida, pare e peça orientação.",
    links: [
      {
        rotulo: "Checklist antes de formatar",
        to: "/ferramentas/checklist-antes-de-formatar",
        contexto: "A imagem do sistema é o item mais importante do checklist pré-formatação.",
      },
      {
        rotulo: "Backup e recuperação: solução completa",
        to: "/solucoes/backup",
        contexto: "Como estruturar rotina de backup que inclui imagem do sistema.",
      },
      {
        rotulo: "Verificador orientativo de backup",
        to: "/ferramentas/verificador-de-backup",
        contexto: "Roteiro para descobrir se o seu backup atual cobriria uma perda total.",
      },
    ],
    relacionados: ["backup-incremental", "recuperacao-de-dados", "ssd"],
    fontes: [
      {
        titulo: "Suporte oficial do Windows",
        url: "https://support.microsoft.com/pt-br/windows",
        nota: "busque por 'backup e restauração' para a documentação da versão instalada",
      },
    ],
  },

  // ── ARMAZENAMENTO E DADOS ─────────────────────────────────────────────────
  {
    slug: "smart",
    termo: "S.M.A.R.T.",
    expansao: "Self-Monitoring, Analysis and Reporting Technology",
    categoria: "Armazenamento e dados",
    resumo:
      "Sistema de automonitoramento embutido em HDs e SSDs que registra indicadores de desgaste e erros — o histórico médico do disco, legível por ferramentas de diagnóstico.",
    definicao: [
      "S.M.A.R.T. é o sistema de automonitoramento embutido em praticamente todo HD e SSD: o próprio disco registra, de forma contínua, indicadores como setores realocados, erros de leitura, horas de uso, temperatura e — nos SSDs — percentual de vida útil consumida.",
      "Esses atributos são lidos por ferramentas de diagnóstico e funcionam como o histórico médico do disco. Um disco pode 'funcionar' e ao mesmo tempo acumular setores realocados semana após semana — sinal claro de degradação em andamento, invisível no uso normal.",
    ],
    porQueImporta:
      "O S.M.A.R.T. é frequentemente o único aviso antes de uma falha de disco. Interpretá-lo cedo é a diferença entre migrar os dados com calma e pagar recuperação de dados de emergência. Atenção: S.M.A.R.T. 'OK' não é garantia — falhas súbitas de controladora acontecem sem aviso.",
    sintomas: [
      "Arquivos que demoram a abrir ou aparecem corrompidos sem motivo.",
      "HD fazendo cliques ou ruídos repetitivos.",
      "Sistema congela em acessos ao disco e volta sozinho.",
      "Aviso do Windows sobre 'problema de disco detectado'.",
    ],
    verificacoesSeguras: [
      "Ler os atributos com ferramenta idônea (smartmontools/CrystalDiskInfo) — a leitura é passiva e não desgasta o disco.",
      "Anotar os valores de setores realocados/pendentes e comparar após alguns dias: crescimento é o sinal mais grave.",
      "Se houver dados importantes e qualquer atributo crítico alterado, copiar o essencial AGORA, antes de qualquer outro teste.",
    ],
    naoFazer: [
      "Não rodar desfragmentação, chkdsk /r ou testes de superfície completos em disco com S.M.A.R.T. degradado e dados importantes ainda não copiados — o esforço extra pode ser o empurrão final.",
      "Não ignorar cliques audíveis porque 'ainda está funcionando'.",
      "Não confiar em 'reparadores de setores' que prometem restaurar o disco: setores realocados são permanentes por projeto.",
    ],
    risco: "Parada obrigatória",
    riscoNota:
      "Ler o S.M.A.R.T. é seguro. Mas se os atributos indicam degradação e há dados importantes, TODO teste adicional vira risco: primeiro copia-se o que importa, depois se diagnostica.",
    links: [
      {
        rotulo: "HD fazendo barulho: diagnóstico do sintoma",
        to: "/problemas/hd-fazendo-barulho",
        contexto: "O sintoma sonoro que costuma acompanhar S.M.A.R.T. degradado.",
      },
      {
        rotulo: "Recuperação de dados: serviço",
        to: "/servicos/recuperacao-de-dados",
        contexto: "Quando o disco já falhou, o caminho profissional para tentar reaver arquivos.",
      },
      {
        rotulo: "Verificador orientativo de backup",
        to: "/ferramentas/verificador-de-backup",
        contexto: "Disco degradado sem backup é a combinação mais perigosa — confira a sua.",
      },
    ],
    relacionados: ["ssd", "recuperacao-de-dados", "backup-incremental"],
    fontes: [
      {
        titulo: "smartmontools — documentação oficial",
        url: "https://www.smartmontools.org/",
        nota: "ferramenta de referência para leitura de atributos S.M.A.R.T.",
      },
    ],
  },
  {
    slug: "ssd",
    termo: "SSD",
    expansao: "Solid State Drive — unidade de estado sólido",
    categoria: "Armazenamento e dados",
    resumo:
      "Armazenamento em chips de memória flash, sem partes móveis. É o upgrade com maior impacto perceptível em computadores que ainda usam HD mecânico.",
    definicao: [
      "SSD é a unidade de armazenamento que guarda dados em chips de memória flash, sem discos giratórios nem braços mecânicos. Sem partes móveis, o tempo de acesso a qualquer dado é praticamente instantâneo — por isso a troca de HD por SSD é o upgrade de maior impacto perceptível em um computador antigo.",
      "SSDs têm desgaste próprio: cada célula de memória suporta um número finito de gravações, e o controlador distribui o desgaste automaticamente. O S.M.A.R.T. dos SSDs expõe o percentual de vida útil consumida. Na prática, um SSD de uso doméstico costuma durar mais que o resto do computador — mas quando falha, tende a falhar de forma súbita, sem os avisos sonoros de um HD.",
    ],
    porQueImporta:
      "Se o seu computador demora minutos para ligar e trava ao abrir programas, a causa mais comum em máquinas com HD é o próprio HD. Entender o que o SSD resolve (tempo de acesso) e o que ele não resolve (falta de RAM, superaquecimento) evita comprar upgrade errado.",
    sintomas: [
      "Windows demora vários minutos para ficar utilizável após ligar.",
      "Disco fixo em 100% de uso no Gerenciador de Tarefas com o sistema recém-iniciado.",
      "Programas 'congelam' ao abrir arquivos, com o cursor girando.",
    ],
    verificacoesSeguras: [
      "Abrir o Gerenciador de Tarefas (Ctrl+Shift+Esc) e observar a coluna 'Disco' na aba Processos: 100% constante com HD indica gargalo de armazenamento.",
      "Conferir na aba Desempenho se o disco do sistema é HD ou SSD.",
      "Verificar o S.M.A.R.T. do disco atual antes de decidir clonagem: disco degradado pede migração urgente, não agendável.",
    ],
    naoFazer: [
      "Não comprar SSD esperando resolver travamentos causados por pouca RAM ou superaquecimento — são gargalos diferentes.",
      "Não clonar um disco com setores defeituosos sem avaliação: a clonagem pode travar ou copiar corrupção.",
      "Não descartar o HD antigo sem apagamento seguro se ele contém dados pessoais.",
    ],
    risco: "Exige atenção",
    riscoNota:
      "Diagnosticar o gargalo é seguro. A troca física em notebook envolve abrir o equipamento — em máquina na garantia, isso é decisão a registrar antes.",
    links: [
      {
        rotulo: "Upgrade SSD e RAM: serviço",
        to: "/servicos/upgrade-ssd-ram",
        contexto: "Execução do upgrade com clonagem e verificação do disco de origem.",
      },
      {
        rotulo: "SSD ou RAM: orientação inicial",
        to: "/ferramentas/ssd-ou-ram",
        contexto: "Roteiro para identificar qual gargalo limita o SEU computador.",
      },
      {
        rotulo: "Computador lento: diagnóstico do sintoma",
        to: "/problemas/computador-lento",
        contexto: "A lentidão tem várias causas — o disco é só uma delas.",
      },
    ],
    relacionados: ["nvme", "memoria-ram", "smart"],
    fontes: [
      {
        titulo: "NVM Express — organização oficial",
        url: "https://nvmexpress.org/",
        nota: "especificações da interface usada pelos SSDs modernos",
      },
    ],
  },
  {
    slug: "nvme",
    termo: "NVMe",
    expansao: "Non-Volatile Memory Express",
    categoria: "Armazenamento e dados",
    resumo:
      "Protocolo de comunicação criado para SSDs conectados direto ao barramento PCIe — várias vezes mais rápido que o SATA herdado dos HDs mecânicos.",
    definicao: [
      "NVMe é o protocolo de comunicação projetado especificamente para SSDs. Enquanto o SATA foi criado na era dos discos mecânicos e limita qualquer SSD a cerca de 550 MB/s, o NVMe conversa com o SSD diretamente pelo barramento PCIe, multiplicando a velocidade de transferência e reduzindo a latência.",
      "Na prática, SSDs NVMe usam o formato M.2 (uma 'régua' parafusada na placa-mãe). Atenção à pegadinha: existe SSD M.2 SATA — mesmo encaixe físico, velocidade de SATA. O formato do conector não garante o protocolo, e nem toda porta M.2 aceita os dois tipos.",
    ],
    porQueImporta:
      "Para uso comum — navegar, escritório, estudar — a diferença entre SSD SATA e NVMe é pouco perceptível: o salto gigante é sair do HD. NVMe faz diferença real em edição de vídeo, jogos com carregamento pesado e transferência de arquivos grandes. Saber disso evita pagar mais por um ganho que seu uso não percebe.",
    sintomas: [
      "Dúvida na compra: o notebook aceita NVMe ou só M.2 SATA?",
      "SSD novo 'lento': instalado em porta M.2 que opera em modo SATA.",
      "SSD NVMe esquentando e reduzindo velocidade em transferências longas (throttling térmico do controlador).",
    ],
    verificacoesSeguras: [
      "Consultar o manual do equipamento (ou a página oficial de especificações) para confirmar quais protocolos cada slot M.2 aceita.",
      "No Gerenciador de Dispositivos, a categoria 'Controladores de armazenamento' revela se o disco atual opera em NVMe.",
      "Antes de comprar, conferir o comprimento do módulo suportado (2280 é o mais comum).",
    ],
    naoFazer: [
      "Não forçar um módulo M.2 em slot incompatível — os chanhos (keys) diferentes existem por razão elétrica.",
      "Não comprar pelo número de marketing (velocidade sequencial) esperando que o computador 'fique 7x mais rápido' no uso comum.",
    ],
    risco: "Seguro de fazer sozinho",
    riscoNota:
      "A verificação de compatibilidade é leitura de manual e telas do sistema. A instalação física segue as mesmas ressalvas de garantia do upgrade de SSD.",
    links: [
      {
        rotulo: "Upgrade SSD e RAM: serviço",
        to: "/servicos/upgrade-ssd-ram",
        contexto: "Escolha do módulo certo para o slot certo, com clonagem inclusa.",
      },
      {
        rotulo: "Montagem de PC: serviço",
        to: "/servicos/montagem-de-pc",
        contexto: "Em montagens novas, o NVMe é o padrão de projeto.",
      },
      {
        rotulo: "Atlas de Informática",
        to: "/guia-tecnico-informatica",
        contexto: "Trilha de hardware e upgrades no Atlas.",
      },
    ],
    relacionados: ["ssd", "thermal-throttling", "memoria-ram"],
    fontes: [
      {
        titulo: "NVM Express — especificações oficiais",
        url: "https://nvmexpress.org/specifications/",
        nota: "especificação mantida pelo consórcio NVM Express",
      },
    ],
  },
  {
    slug: "backup-incremental",
    termo: "Backup incremental",
    categoria: "Armazenamento e dados",
    resumo:
      "Estratégia que copia apenas o que mudou desde o último backup — rápida e econômica em espaço, mas dependente da integridade da cadeia completa de cópias.",
    definicao: [
      "Backup incremental é a estratégia em que, depois de uma primeira cópia completa, cada backup seguinte grava apenas os arquivos que mudaram desde o último backup. O resultado: backups diários rápidos e pouco espaço consumido, mesmo protegendo muitos dados.",
      "O preço dessa eficiência é a dependência em cadeia: restaurar exige o backup completo inicial mais todos os incrementais seguintes, íntegros e em ordem. Um elo corrompido no meio da cadeia compromete tudo o que veio depois. Por isso rotinas sérias intercalam novos backups completos periodicamente e testam restaurações.",
    ],
    porQueImporta:
      "A pergunta que importa não é 'você faz backup?', e sim 'você já testou restaurar?'. Backup incremental sem teste periódico de restauração é uma promessa não verificada — e ransomware moderno procura e criptografa justamente os backups conectados ao computador.",
    sintomas: [
      "O backup 'está configurado' mas ninguém sabe quando foi a última execução bem-sucedida.",
      "Todos os backups vivem no mesmo HD externo permanentemente conectado.",
      "A restauração nunca foi testada — nem de um único arquivo.",
    ],
    verificacoesSeguras: [
      "Abrir o histórico da ferramenta de backup e confirmar a data da última execução SEM erros.",
      "Testar a restauração de um arquivo pequeno em pasta separada — teste inofensivo que valida a cadeia.",
      "Aplicar a regra 3-2-1 como referência: 3 cópias, 2 mídias diferentes, 1 fora do local (nuvem ou disco guardado em outro endereço).",
    ],
    naoFazer: [
      "Não manter a única cópia de backup permanentemente conectada ao computador — ransomware criptografa unidades montadas.",
      "Não interromper a cadeia incremental apagando cópias intermediárias 'para liberar espaço'.",
      "Não considerar sincronização de nuvem (que replica exclusões e arquivos criptografados) como backup completo.",
    ],
    risco: "Seguro de fazer sozinho",
    riscoNota:
      "Conferir histórico e restaurar um arquivo de teste não oferece risco. Reestruturar a rotina inteira em ambiente com dados críticos merece acompanhamento.",
    links: [
      {
        rotulo: "Verificador orientativo de backup",
        to: "/ferramentas/verificador-de-backup",
        contexto: "Roteiro em 6 passos para saber se o seu backup cobriria uma perda real.",
      },
      {
        rotulo: "Backup e recuperação: solução",
        to: "/solucoes/backup",
        contexto: "Estruturação completa de rotina de backup doméstica e de escritório.",
      },
      {
        rotulo: "Backup para empresas: serviço",
        to: "/servicos/backup-para-empresas",
        contexto: "Rotinas com verificação periódica para dados de negócio.",
      },
    ],
    relacionados: ["imagem-do-sistema", "recuperacao-de-dados", "bitlocker"],
    fontes: [
      {
        titulo: "CERT.br — Cartilha de Segurança para Internet",
        url: "https://cartilha.cert.br/",
        nota: "fascículo sobre backup e proteção de dados",
      },
      {
        titulo: "StopRansomware (CISA)",
        url: "https://www.stopransomware.gov/",
        nota: "orientação oficial sobre backups como defesa contra ransomware",
      },
    ],
  },
  {
    slug: "recuperacao-de-dados",
    termo: "Recuperação de dados",
    categoria: "Armazenamento e dados",
    resumo:
      "Conjunto de técnicas para reaver arquivos de discos falhos, formatados ou corrompidos. A primeira regra é contraintuitiva: parar de usar o disco imediatamente.",
    definicao: [
      "Recuperação de dados é o conjunto de técnicas para reaver arquivos que se tornaram inacessíveis — por exclusão acidental, formatação, corrupção lógica ou falha física do disco. O que é possível recuperar depende diretamente do que aconteceu com o disco DEPOIS do incidente.",
      "Quando um arquivo é apagado, o espaço dele é marcado como livre, mas o conteúdo continua lá até ser sobrescrito. Por isso a primeira regra é contraintuitiva: pare de usar o disco imediatamente. Cada minuto de uso — navegação, downloads, até o próprio Windows gravando arquivos temporários — pode sobrescrever exatamente o que você quer de volta.",
      "Falha física (cliques, disco não reconhecido) é outra categoria: aí a recuperação exige ferramentas e ambiente adequados, e tentativas caseiras costumam reduzir as chances de forma permanente.",
    ],
    porQueImporta:
      "A diferença entre recuperar 100% e recuperar nada frequentemente está nas primeiras decisões após o incidente. Instalar um 'programa de recuperação' no próprio disco afetado — o erro mais comum — sobrescreve dados no ato da instalação.",
    sintomas: [
      "Arquivos ou pastas sumiram após queda de energia ou remoção incorreta do dispositivo.",
      "Cartão de memória ou pendrive 'pede formatação' ao conectar.",
      "HD externo caiu e agora não é reconhecido ou faz ruídos.",
      "Formatação executada no disco errado.",
    ],
    verificacoesSeguras: [
      "Parar de usar o disco afetado — desligar o computador se o disco afetado for o do sistema.",
      "Conferir lixeira, versões anteriores e a lixeira da nuvem (se a pasta era sincronizada) A PARTIR DE OUTRO dispositivo.",
      "Anotar exatamente o que aconteceu e o que já foi tentado — essa cronologia orienta o técnico e evita repetir ações destrutivas.",
    ],
    naoFazer: [
      "Não instalar programas de recuperação no próprio disco afetado.",
      "Não abrir HD com falha física fora de ambiente adequado — poeira em contato com os pratos é dano irreversível.",
      "Não congelar o HD, trocar placa lógica por conta própria, nem insistir em religar disco que faz cliques.",
      "Não formatar 'para ver se volta a funcionar' antes de decidir sobre os dados.",
    ],
    risco: "Parada obrigatória",
    riscoNota:
      "Neste tema, fazer MENOS é fazer melhor: quanto menos o disco for usado após o incidente, maiores as chances. Na dúvida, desligue e busque orientação.",
    links: [
      {
        rotulo: "Recuperação de dados: serviço",
        to: "/servicos/recuperacao-de-dados",
        contexto: "Avaliação profissional do cenário antes de qualquer tentativa.",
      },
      {
        rotulo: "Arquivos apagados: diagnóstico do sintoma",
        to: "/problemas/arquivos-apagados",
        contexto: "Primeiros passos seguros logo após a perda.",
      },
      {
        rotulo: "HD fazendo barulho",
        to: "/problemas/hd-fazendo-barulho",
        contexto: "Cliques e ruídos indicam falha física — categoria de parada imediata.",
      },
    ],
    relacionados: ["smart", "backup-incremental", "imagem-do-sistema"],
    fontes: [
      {
        titulo: "smartmontools — documentação oficial",
        url: "https://www.smartmontools.org/",
        nota: "leitura de saúde do disco antes de decidir o caminho de recuperação",
      },
    ],
  },

  // ── SEGURANÇA ─────────────────────────────────────────────────────────────
  {
    slug: "tpm",
    termo: "TPM",
    expansao: "Trusted Platform Module",
    categoria: "Segurança",
    resumo:
      "Chip (ou firmware) de segurança que guarda chaves criptográficas fora do alcance do sistema operacional. Requisito do Windows 11 e base do BitLocker.",
    definicao: [
      "TPM é um módulo de segurança — um chip dedicado na placa-mãe ou uma função do processador (fTPM) — que gera e guarda chaves criptográficas em uma área isolada, fora do alcance do sistema operacional. Nem o Windows, nem programas, nem malware têm acesso direto ao conteúdo.",
      "É a fundação de recursos como o BitLocker (que guarda no TPM a chave que destrava o disco), o Windows Hello e a verificação de integridade da inicialização. O Windows 11 exige TPM na versão 2.0 — em muitos computadores compatíveis ele existe, mas vem desativado no UEFI.",
    ],
    porQueImporta:
      "Se o Windows 11 recusa a instalação por 'TPM 2.0 ausente', frequentemente a solução é ativar o módulo no firmware, não trocar de computador. E se o seu disco usa BitLocker, o TPM é o motivo de ele destravar sozinho no seu computador — e de virar um cofre lacrado em qualquer outro.",
    sintomas: [
      "Instalação do Windows 11 bloqueada por falta de TPM 2.0.",
      "BitLocker pedindo a chave de recuperação após atualização de firmware ou troca de peça.",
      "Mensagens sobre 'atestado de integridade' em ambientes corporativos.",
    ],
    verificacoesSeguras: [
      "Executar tpm.msc (Win+R) e conferir se o TPM está presente, pronto e em qual versão.",
      "Em 'Segurança do Windows → Segurança do dispositivo', verificar o processador de segurança.",
      "ANTES de ativar/atualizar TPM ou firmware: confirmar que a chave de recuperação do BitLocker está salva em local acessível fora do computador.",
    ],
    naoFazer: [
      "Não limpar (clear) o TPM sem ter a chave de recuperação do BitLocker em mãos — a limpeza descarta as chaves e o disco criptografado fica inacessível.",
      "Não atualizar firmware com disco criptografado sem suspender o BitLocker antes, quando o fabricante assim orienta.",
    ],
    risco: "Exige atenção",
    riscoNota:
      "Consultar o estado do TPM é seguro. Qualquer operação que altere o módulo (ativar, limpar, atualizar) exige a chave de recuperação salva ANTES.",
    links: [
      {
        rotulo: "Segurança dos dados no atendimento",
        to: "/seguranca-dos-dados",
        contexto: "Como equipamentos criptografados são tratados no atendimento técnico.",
      },
      {
        rotulo: "Remoção de vírus: serviço",
        to: "/servicos/remocao-de-virus",
        contexto: "Limpeza que preserva as proteções do sistema em vez de desativá-las.",
      },
      {
        rotulo: "Atlas de Informática",
        to: "/guia-tecnico-informatica",
        contexto: "Trilha de segurança no Atlas: proteção em camadas.",
      },
    ],
    relacionados: ["bitlocker", "uefi", "bios"],
    fontes: [
      {
        titulo: "Microsoft Learn — Visão geral do TPM",
        url: "https://learn.microsoft.com/pt-br/windows/security/hardware-security/tpm/trusted-platform-module-overview",
        nota: "documentação oficial do Windows sobre o módulo",
      },
      {
        titulo: "Trusted Computing Group — TPM 2.0 Library",
        url: "https://trustedcomputinggroup.org/resource/tpm-library-specification/",
        nota: "especificação mantida pelo consórcio criador do padrão",
      },
    ],
  },
  {
    slug: "bitlocker",
    termo: "BitLocker",
    categoria: "Segurança",
    resumo:
      "Criptografia de disco completo do Windows. Protege os dados se o equipamento for perdido ou roubado — e exige a chave de recuperação guardada em local seguro.",
    definicao: [
      "BitLocker é o recurso do Windows que criptografa o disco inteiro: sem a chave correta, o conteúdo é ilegível mesmo que alguém remova o disco e o conecte em outro computador. Em equipamentos com TPM, o destravamento é transparente — o usuário nem percebe que o disco é criptografado.",
      "A contrapartida é a chave de recuperação: uma sequência numérica de 48 dígitos gerada na ativação. Ela é exigida quando algo muda no ambiente de inicialização — atualização de firmware, troca de placa, alteração de configuração de boot. Sem ela, nesses momentos, os dados ficam inacessíveis por projeto: não existe 'quebra' do BitLocker, e é exatamente isso que o torna eficaz.",
      "Em muitos notebooks recentes, a 'criptografia de dispositivo' (a variante doméstica do BitLocker) vem ativada de fábrica — muita gente tem disco criptografado sem saber.",
    ],
    porQueImporta:
      "A tela azul pedindo a chave de recuperação virou um dos incidentes mais comuns pós-atualização de firmware. Quem tem a chave salva resolve em dois minutos; quem não tem pode perder o acesso a tudo. Saber ONDE está a sua chave é tão importante quanto o backup.",
    sintomas: [
      "Tela azul do BitLocker pedindo chave de recuperação de 48 dígitos ao ligar.",
      "Disco de notebook antigo ilegível ao ser conectado em outro computador.",
      "Aviso 'a criptografia de dispositivo está ativada' nas configurações do Windows.",
    ],
    verificacoesSeguras: [
      "Conferir agora se a criptografia está ativa: Configurações → Privacidade e segurança → Criptografia de dispositivo (ou Painel de Controle → BitLocker).",
      "Localizar a chave de recuperação na conta Microsoft (aka.ms/myrecoverykey) e confirmar que ela abre — antes de precisar dela.",
      "Imprimir ou salvar a chave em local seguro FORA do próprio computador criptografado.",
    ],
    naoFazer: [
      "Não formatar imediatamente ao ver a tela de recuperação — a chave provavelmente está na conta Microsoft vinculada.",
      "Não desativar a criptografia 'para evitar problemas' em notebook que sai de casa: a proteção existe exatamente para perda e roubo.",
      "Não atualizar firmware/BIOS em disco criptografado sem ter a chave em mãos.",
    ],
    risco: "Exige atenção",
    riscoNota:
      "Verificar o estado e salvar a chave é seguro e recomendado a todos. Suspender/desativar a criptografia é decisão que merece registro do motivo.",
    links: [
      {
        rotulo: "Segurança dos dados no atendimento",
        to: "/seguranca-dos-dados",
        contexto: "Política de manuseio de equipamentos criptografados na bancada.",
      },
      {
        rotulo: "Checklist antes de formatar",
        to: "/ferramentas/checklist-antes-de-formatar",
        contexto: "Disco criptografado muda a ordem dos passos pré-formatação.",
      },
      {
        rotulo: "Windows não inicia: diagnóstico",
        to: "/problemas/windows-nao-inicia",
        contexto: "A tela de recuperação do BitLocker é um dos cenários mapeados.",
      },
    ],
    relacionados: ["tpm", "uefi", "backup-incremental"],
    fontes: [
      {
        titulo: "Microsoft Learn — BitLocker",
        url: "https://learn.microsoft.com/pt-br/windows/security/operating-system-security/data-protection/bitlocker/",
        nota: "documentação oficial do recurso",
      },
      {
        titulo: "Suporte oficial do Windows",
        url: "https://support.microsoft.com/pt-br/windows",
        nota: "busque 'chave de recuperação do BitLocker' para o passo a passo da sua versão",
      },
    ],
  },

  // ── REDES ─────────────────────────────────────────────────────────────────
  {
    slug: "dns",
    termo: "DNS",
    expansao: "Domain Name System",
    categoria: "Redes",
    resumo:
      "A 'agenda telefônica' da internet: traduz nomes como exemplo.com.br em endereços IP. Quando o DNS falha, o Wi-Fi conecta mas nenhum site abre.",
    definicao: [
      "DNS é o sistema que traduz nomes amigáveis (como otecnicodeinformatica.com.br) nos endereços IP numéricos que os equipamentos realmente usam para se comunicar. Cada vez que você abre um site, uma consulta DNS acontece antes de qualquer conteúdo carregar.",
      "Essa tradução é feita por servidores DNS — normalmente os do provedor de internet, definidos automaticamente pelo roteador. Quando esses servidores ficam lentos ou fora do ar, surge o sintoma clássico: o Wi-Fi mostra 'conectado', aplicativos como WhatsApp podem até funcionar, mas os sites 'não abrem' ou exibem erros como DNS_PROBE_FINISHED_NXDOMAIN.",
      "O DNS também é alvo de golpes: roteadores com senha de fábrica podem ter o DNS sequestrado para redirecionar bancos e lojas a páginas falsas — por isso alterações de DNS que você não fez são sinal de alerta sério.",
    ],
    porQueImporta:
      "Separar 'sem internet' de 'sem DNS' economiza horas de diagnóstico: se o sinal está bom e a conexão ativa, mas nomes não resolvem, o problema não é o Wi-Fi — é a tradução. E DNS alterado sem o seu conhecimento é indício de roteador comprometido.",
    sintomas: [
      "Wi-Fi conectado, mas 'nenhum site abre' — ou abre só depois de muitas tentativas.",
      "Erro DNS_PROBE_FINISHED_NXDOMAIN ou 'servidor DNS não está respondendo'.",
      "Sites de banco com aparência estranha ou avisos de certificado — possível sequestro de DNS.",
      "Internet 'lenta para começar a carregar', mas rápida depois que a página abre.",
    ],
    verificacoesSeguras: [
      "Testar o mesmo site no 4G do celular: se abre no 4G e não no Wi-Fi, a suspeita recai sobre a rede local ou o DNS do provedor.",
      "Reiniciar o roteador (desligar 30 segundos) — resolve degradações temporárias sem alterar configuração.",
      "Executar o diagnóstico de rede do próprio Windows, que identifica falha de resolução DNS explicitamente.",
    ],
    naoFazer: [
      "Não instalar 'otimizadores de internet' ou VPNs gratuitas para 'consertar DNS' — vários sequestram a navegação.",
      "Não ignorar avisos de certificado em sites de banco 'só desta vez' — é exatamente assim que o sequestro de DNS captura senhas.",
      "Não deixar o roteador com a senha administrativa de fábrica.",
    ],
    risco: "Seguro de fazer sozinho",
    riscoNota:
      "Os testes listados são de observação. Trocar o DNS do sistema é reversível, mas mexer no DNS do ROTEADOR sem registro do valor anterior já derrubou muita rede doméstica.",
    links: [
      {
        rotulo: "Wi-Fi instável: diagnóstico do sintoma",
        to: "/problemas/wifi-instavel",
        contexto: "Quando o problema é o sinal e não a resolução de nomes.",
      },
      {
        rotulo: "Redes e Wi-Fi: serviço",
        to: "/servicos/redes-e-wifi",
        contexto: "Configuração de roteador com DNS íntegro e senha administrativa própria.",
      },
      {
        rotulo: "Atlas de Informática",
        to: "/guia-tecnico-informatica",
        contexto: "Trilha de redes do Atlas: do modem ao dispositivo.",
      },
    ],
    relacionados: ["nat", "bitlocker"],
    fontes: [
      {
        titulo: "CERT.br — Cartilha de Segurança para Internet",
        url: "https://cartilha.cert.br/",
        nota: "riscos de DNS alterado e segurança de roteadores domésticos",
      },
      {
        titulo: "ICANN",
        url: "https://www.icann.org/",
        nota: "organização que coordena o sistema global de nomes",
      },
    ],
  },
  {
    slug: "nat",
    termo: "NAT",
    expansao: "Network Address Translation — tradução de endereços de rede",
    categoria: "Redes",
    resumo:
      "Técnica que permite a todos os dispositivos da casa compartilharem um único endereço público de internet — feita pelo roteador, invisível no uso normal.",
    definicao: [
      "NAT é a técnica que o roteador usa para permitir que todos os dispositivos da casa — celulares, computadores, TV, câmeras — compartilhem um único endereço IP público. Internamente, cada aparelho tem um endereço privado (como 192.168.0.x); ao sair para a internet, o roteador 'traduz' tudo para o endereço público e distribui as respostas de volta a quem pediu.",
      "É por causa do NAT que dispositivos da rede interna não são diretamente acessíveis da internet — um efeito colateral de proteção. É também por causa dele que alguns cenários exigem configuração extra: jogos online reclamando de 'NAT estrito', câmeras que precisam ser vistas de fora, acesso remoto ao computador de casa.",
      "Nas operadoras brasileiras é comum o CGNAT (NAT de operadora): seu roteador recebe um endereço que já é privado na rede da operadora. Nesse cenário, abrir portas no roteador não tem efeito — a limitação está um nível acima.",
    ],
    porQueImporta:
      "Entender o NAT evita duas armadilhas: brigar com configurações de porta quando o problema é CGNAT da operadora (só ela resolve), e o oposto — expor câmeras e dispositivos à internet via DMZ ou 'abrir tudo', transformando a rede de casa em alvo.",
    sintomas: [
      "Jogo online acusa 'NAT estrito' ou 'tipo de NAT: restrito'.",
      "Câmera ou DVR inacessível de fora de casa mesmo com porta 'aberta' no roteador.",
      "Aplicações de acesso remoto só funcionam com o celular na mesma rede.",
    ],
    verificacoesSeguras: [
      "Comparar o IP que o roteador recebe da operadora (página de status do roteador) com o IP público visto pela internet: se forem diferentes, há CGNAT.",
      "Preferir soluções que não exigem abrir portas (acesso via nuvem do fabricante, VPN pessoal como serviço) antes de mexer no roteador.",
      "Registrar (foto/print) qualquer configuração do roteador antes de alterá-la.",
    ],
    naoFazer: [
      "Não colocar computador ou DVR em DMZ como 'solução rápida' — isso expõe o dispositivo inteiro à internet.",
      "Não abrir faixas largas de portas sem saber exatamente qual serviço precisa de qual porta.",
      "Não contratar 'IP fixo' sem confirmar que o problema é realmente CGNAT.",
    ],
    risco: "Exige atenção",
    riscoNota:
      "Diagnosticar é seguro. Alterar regras de NAT/portas mexe na fronteira entre sua rede e a internet — cada abertura deve ter motivo, escopo e registro.",
    links: [
      {
        rotulo: "Redes e Wi-Fi: serviço",
        to: "/servicos/redes-e-wifi",
        contexto: "Configuração de roteador com regras mínimas e seguras.",
      },
      {
        rotulo: "Wi-Fi instável: diagnóstico",
        to: "/problemas/wifi-instavel",
        contexto: "Sintomas de rede local que não têm relação com NAT.",
      },
      {
        rotulo: "Suporte home office: serviço",
        to: "/servicos/suporte-home-office",
        contexto: "Acesso remoto seguro sem exposição desnecessária da rede.",
      },
    ],
    relacionados: ["dns"],
    fontes: [
      {
        titulo: "RFC 2663 — IP Network Address Translator Terminology",
        url: "https://www.rfc-editor.org/rfc/rfc2663",
        nota: "definição formal do NAT publicada pelo IETF",
      },
    ],
  },

  // ── HARDWARE E DESEMPENHO ─────────────────────────────────────────────────
  {
    slug: "memoria-ram",
    termo: "Memória RAM",
    expansao: "Random Access Memory",
    categoria: "Hardware e desempenho",
    resumo:
      "Memória de trabalho do computador: guarda o que está em uso agora. Quando falta, o sistema recorre ao disco e tudo trava; quando falha, gera erros aleatórios e telas azuis.",
    definicao: [
      "RAM é a memória de trabalho do computador: tudo o que está aberto agora — sistema, navegador, planilhas — vive nela enquanto é usado. Ela é volátil: desligou, esvaziou. Não confunda com armazenamento (HD/SSD), que guarda os arquivos permanentemente.",
      "Quando a RAM enche, o sistema improvisa usando o disco como extensão (paginação) — e como até o SSD mais rápido é ordens de magnitude mais lento que a RAM, o computador 'afunda': trocar de aba demora, programas congelam, o disco vai a 100%.",
      "RAM com defeito físico é outro problema, mais traiçoeiro: erros aleatórios, telas azuis com códigos variados (MEMORY_MANAGEMENT é o clássico), arquivos que corrompem ao salvar. Por ser intermitente, é das falhas mais confundidas com 'problema de Windows'.",
    ],
    porQueImporta:
      "Saber se a lentidão vem de RAM cheia (upgrade resolve), de disco lento (SSD resolve) ou de RAM defeituosa (troca resolve) é a diferença entre investir certo e gastar errado. Os três têm sintomas parecidos à distância e assinaturas diferentes de perto.",
    sintomas: [
      "Lentidão que piora conforme mais abas e programas abrem, e melhora ao reiniciar.",
      "Memória acima de 90% no Gerenciador de Tarefas durante o uso normal.",
      "Telas azuis com códigos variados, principalmente MEMORY_MANAGEMENT.",
      "Computador não liga após instalação de módulo novo (incompatibilidade ou mau encaixe).",
    ],
    verificacoesSeguras: [
      "Abrir o Gerenciador de Tarefas → Desempenho → Memória e observar o uso no momento em que a lentidão aparece.",
      "Executar o Diagnóstico de Memória do Windows (mdsched.exe) — ferramenta nativa e não destrutiva.",
      "Antes de comprar módulo: conferir tipo (DDR4/DDR5), frequência e máximo suportado no manual do equipamento.",
    ],
    naoFazer: [
      "Não comprar mais RAM para resolver lentidão sem antes conferir se a RAM está de fato saturada — se o uso está em 50%, o gargalo é outro.",
      "Não instalar 'limpadores de RAM' — o gerenciamento automático do sistema é mais eficiente.",
      "Não misturar módulos de especificações diferentes esperando estabilidade.",
    ],
    risco: "Exige atenção",
    riscoNota:
      "Observar o uso e rodar o diagnóstico nativo é seguro. Instalação física em notebook envolve abrir o equipamento — atenção à garantia.",
    links: [
      {
        rotulo: "SSD ou RAM: orientação inicial",
        to: "/ferramentas/ssd-ou-ram",
        contexto: "Roteiro observável para identificar o gargalo antes de comprar.",
      },
      {
        rotulo: "Computador lento: diagnóstico",
        to: "/problemas/computador-lento",
        contexto: "A investigação completa do sintoma, causa a causa.",
      },
      {
        rotulo: "Upgrade SSD e RAM: serviço",
        to: "/servicos/upgrade-ssd-ram",
        contexto: "Escolha do módulo compatível e instalação com teste.",
      },
    ],
    relacionados: ["ssd", "bsod", "thermal-throttling"],
    fontes: [
      {
        titulo: "MemTest86 — documentação oficial",
        url: "https://www.memtest86.com/",
        nota: "ferramenta de referência para teste aprofundado de memória",
      },
    ],
  },
  {
    slug: "thermal-throttling",
    termo: "Thermal throttling",
    expansao: "Redução de desempenho por temperatura",
    categoria: "Hardware e desempenho",
    resumo:
      "Autodefesa do processador: ao atingir o limite térmico, ele reduz a velocidade para não se danificar. O computador fica lento em vez de queimar — e a causa costuma ser poeira ou pasta térmica ressecada.",
    definicao: [
      "Thermal throttling é o mecanismo de autodefesa dos processadores: ao se aproximar do limite térmico de projeto, o chip reduz automaticamente a própria velocidade para gerar menos calor. É intencional e protege o hardware — o efeito colateral é o computador ficar visivelmente mais lento exatamente nas tarefas pesadas.",
      "Em notebooks com anos de uso, as causas dominantes são acúmulo de poeira no radiador e pasta térmica ressecada entre o processador e o dissipador. O sintoma tem assinatura própria: desempenho normal nos primeiros minutos, queda perceptível depois que o equipamento esquenta, ventoinha em rotação máxima constante.",
      "Se a temperatura continua subindo mesmo com o throttling, o equipamento desliga sozinho — o estágio seguinte da proteção. Desligamentos térmicos repetidos são o aviso final antes de dano permanente.",
    ],
    porQueImporta:
      "Muita 'lentidão de PC velho' é na verdade throttling — e se resolve com limpeza e pasta térmica, não com formatação nem upgrade. Identificar a assinatura térmica evita gastar em SSD ou RAM quando o problema é poeira.",
    sintomas: [
      "Desempenho bom ao ligar, degradando após minutos de uso pesado.",
      "Ventoinha em barulho máximo constante; ar quente saindo forte (ou quase não saindo).",
      "Jogos que começam fluidos e 'derretem' depois de meia hora.",
      "Desligamentos súbitos durante tarefas pesadas.",
    ],
    verificacoesSeguras: [
      "Observar o padrão temporal: lentidão que aparece com o aquecimento e some após esfriar é assinatura térmica.",
      "Conferir se as saídas de ar estão obstruídas (cama, sofá, almofada) e usar o equipamento sobre superfície rígida.",
      "Remover poeira externa das grades com pincel macio — SEM abrir o equipamento.",
    ],
    naoFazer: [
      "Não usar aspirador ou soprar ar comprimido de forma agressiva nas ventoinhas — girar a ventoinha forçadamente pode danificá-la.",
      "Não abrir notebook em garantia para trocar pasta térmica.",
      "Não desativar as proteções térmicas em configurações avançadas 'para ganhar desempenho' — elas são o que separa lentidão de dano permanente.",
    ],
    risco: "Exige atenção",
    riscoNota:
      "Observação e limpeza externa são seguras. Limpeza interna com troca de pasta térmica envolve desmontagem — o ponto onde a garantia e a habilidade contam.",
    links: [
      {
        rotulo: "Computador esquentando: diagnóstico",
        to: "/problemas/computador-esquentando",
        contexto: "Investigação completa do superaquecimento, sinal a sinal.",
      },
      {
        rotulo: "Computador desliga sozinho",
        to: "/problemas/computador-desliga-sozinho",
        contexto: "O estágio seguinte do problema térmico não tratado.",
      },
      {
        rotulo: "Checklist de computador lento",
        to: "/ferramentas/checklist-computador-lento",
        contexto: "O padrão térmico é uma das causas verificadas no checklist.",
      },
    ],
    relacionados: ["memoria-ram", "ssd", "bsod"],
    fontes: [
      {
        titulo: "Intel — recursos sobre temperatura de CPU",
        url: "https://www.intel.com/content/www/us/en/gaming/resources/cpu-temperature.html",
        nota: "orientação do fabricante sobre faixas de temperatura e throttling",
      },
    ],
  },
  // ── ONDA 11B ──────────────────────────────────────────────────────────────
  {
    slug: "secure-boot",
    termo: "Secure Boot",
    expansao: "Inicialização Segura — verificação de assinatura no firmware UEFI",
    categoria: "Segurança",
    resumo:
      "Recurso do firmware UEFI que só permite iniciar componentes assinados digitalmente. Bloqueia código malicioso que tentaria carregar antes do sistema operacional.",
    definicao: [
      "Secure Boot é uma verificação feita pelo firmware UEFI no instante em que o computador liga: antes de entregar o controle ao sistema operacional, ele confere se o gerenciador de inicialização e os drivers de baixo nível têm assinatura digital reconhecida. Sem assinatura válida, a inicialização é interrompida.",
      "A proteção existe porque código carregado antes do Windows roda com privilégio máximo e ficaria invisível para o antivírus, que só começa a trabalhar depois. É a camada que fecha essa janela — e é também por isso que o Windows 11 a lista entre os requisitos oficiais.",
      "Na prática do dia a dia, o Secure Boot aparece em três situações: ao tentar iniciar por um pendrive de instalação não assinado, ao instalar outro sistema operacional junto com o Windows e ao migrar de versão de sistema, quando o requisito precisa estar habilitado.",
    ],
    porQueImporta:
      "Desligar o Secure Boot é a 'solução' mais recomendada em fóruns e uma das mais perigosas quando vira permanente: a máquina passa a aceitar qualquer componente de inicialização, inclusive um comprometido. Além disso, em disco com BitLocker, mudar essa configuração pode disparar o pedido de chave de recuperação.",
    sintomas: [
      "Pendrive de instalação não aparece na ordem de inicialização.",
      "Mensagem de violação de segurança de inicialização (security violation) ao ligar.",
      "Verificação de requisitos do Windows 11 acusa inicialização segura desabilitada.",
      "Pedido inesperado de chave de recuperação do BitLocker depois de mexer no firmware.",
    ],
    verificacoesSeguras: [
      "Consultar o estado atual em Informações do Sistema do Windows, no item 'Estado da Inicialização Segura' — é leitura, não alteração.",
      "Anotar a configuração atual do firmware antes de qualquer mudança, incluindo o modo de inicialização (UEFI ou legado).",
      "Verificar se o disco está criptografado e ter a chave de recuperação em mãos ANTES de alterar qualquer opção de firmware.",
      "Preferir mídia de instalação oficial, que já é assinada e dispensa desativar a verificação.",
    ],
    naoFazer: [
      "Não deixar o Secure Boot desligado depois de uma instalação: reative assim que o procedimento terminar.",
      "Não alterar opções de firmware com disco criptografado e sem a chave de recuperação salva em outro lugar.",
      "Não seguir tutoriais que mandam limpar as chaves de segurança do firmware para 'resolver mais rápido' — isso pode impedir a máquina de iniciar.",
    ],
    risco: "Exige atenção",
    riscoNota:
      "Consultar o estado é seguro. Alterar a configuração mexe na cadeia de inicialização e, em disco criptografado, pode bloquear o acesso aos dados sem a chave de recuperação.",
    links: [
      {
        rotulo: "Atualizar para o Windows 11",
        to: "/decisoes/atualizar-para-windows-11",
        contexto: "Onde este requisito de firmware decide se a migração é possível.",
      },
      {
        rotulo: "Roteiro de falha de inicialização",
        to: "/ferramentas/roteiro-falha-de-inicializacao",
        contexto: "Checklist para quando a máquina para antes do Windows carregar.",
      },
      {
        rotulo: "Windows não inicia",
        to: "/problemas/windows-nao-inicia",
        contexto: "Diagnóstico do sintoma quando a interrupção acontece na partida.",
      },
    ],
    relacionados: ["uefi", "tpm", "bitlocker"],
    fontes: [
      {
        titulo: "Microsoft Learn — Secure Boot",
        url: "https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/oem-secure-boot",
        nota: "documentação oficial do funcionamento da inicialização segura",
      },
    ],
  },
  {
    slug: "driver",
    termo: "Driver",
    expansao: "Controlador de dispositivo",
    categoria: "Sistema e inicialização",
    resumo:
      "Software que traduz as ordens do sistema operacional para uma peça específica de hardware. Driver com defeito é uma das causas mais comuns de tela azul e travamento.",
    definicao: [
      "Driver é o programa que ensina o sistema operacional a conversar com uma peça: placa de vídeo, chipset, rede sem fio, impressora, controladora de disco. Sem ele, o Windows reconhece que existe um dispositivo, mas não sabe usar os recursos dele.",
      "Diferente de um programa comum, boa parte dos drivers roda em modo privilegiado — no mesmo nível do núcleo do sistema. É por isso que um driver instável não fecha 'só ele': derruba o sistema inteiro em tela azul, com um código de parada que muitas vezes aponta o arquivo responsável.",
      "Drivers chegam por três caminhos: junto com o Windows, pelo Windows Update e pelo site do fabricante do equipamento. Esses são os três caminhos legítimos — e são os únicos que recomendamos.",
    ],
    porQueImporta:
      "A maior parte dos 'atualizadores de driver' distribuídos em anúncios instala versões genéricas, desatualizadas ou adware. O prejuízo típico é uma máquina que funcionava razoavelmente passar a apresentar tela azul depois de uma 'otimização' — e o cliente pagar por um problema que foi criado.",
    sintomas: [
      "Tela azul que cita um arquivo .sys no código de parada.",
      "Placa de vídeo com artefatos, piscadas ou reinício do driver durante jogos.",
      "Wi-Fi que cai só neste computador, enquanto os outros aparelhos seguem conectados.",
      "Periférico que funcionava e parou depois de uma atualização de sistema.",
    ],
    verificacoesSeguras: [
      "Abrir o Gerenciador de Dispositivos e procurar itens com aviso — a marcação indica dispositivo sem driver adequado.",
      "Verificar atualizações pelo Windows Update, que entrega versões validadas pela Microsoft.",
      "Baixar drivers apenas no site do fabricante do equipamento, usando o modelo exato.",
      "Anotar a data e a versão do driver antes de atualizar, para saber a qual estado voltar.",
    ],
    naoFazer: [
      "Não instalar 'atualizadores automáticos de driver' baixados de anúncios ou agregadores.",
      "Não instalar driver de modelo diferente 'porque é parecido' — a incompatibilidade pode impedir a inicialização.",
      "Não atualizar vários drivers de uma vez: se surgir instabilidade, não haverá como saber qual causou.",
    ],
    risco: "Exige atenção",
    riscoNota:
      "Consultar o Gerenciador de Dispositivos e usar o Windows Update é seguro. Instalar driver de origem duvidosa em modo privilegiado é uma das formas mais rápidas de tornar um sistema instável.",
    links: [
      {
        rotulo: "Tela azul: diagnóstico do sintoma",
        to: "/problemas/tela-azul",
        contexto: "Como ler o código de parada que aponta o driver envolvido.",
      },
      {
        rotulo: "BSOD no glossário",
        to: "/glossario/bsod",
        contexto: "O mecanismo de proteção que interrompe o sistema quando o driver falha.",
      },
      {
        rotulo: "Formatar ou reparar",
        to: "/decisoes/formatar-ou-reparar",
        contexto: "Quando o problema de driver justifica reinstalar e quando não justifica.",
      },
    ],
    relacionados: ["bsod", "secure-boot", "memoria-ram"],
    fontes: [
      {
        titulo: "Microsoft Learn — What is a driver?",
        url: "https://learn.microsoft.com/en-us/windows-hardware/drivers/gettingstarted/what-is-a-driver-",
        nota: "definição oficial de driver e do nível de privilégio em que executa",
      },
    ],
  },
  {
    slug: "particao",
    termo: "Partição",
    categoria: "Armazenamento e dados",
    resumo:
      "Divisão lógica de um disco físico em áreas independentes. Entender as partições evita apagar a área de recuperação ou o carregador de inicialização por engano.",
    definicao: [
      "Partição é uma divisão lógica do disco: o hardware é um só, mas o sistema enxerga áreas separadas, cada uma com sistema de arquivos e finalidade próprios. Em um disco de Windows moderno convivem, no mínimo, a partição do sistema, uma partição de inicialização exigida pelo UEFI e uma área reservada.",
      "É comum ver um disco com 'C:' e 'D:' e concluir que existem dois discos. Muitas vezes é o mesmo disco físico particionado — o que significa que uma falha de hardware leva as duas letras junto. Guardar o backup em outra partição do mesmo disco não protege de nada.",
      "O esquema de particionamento (GPT ou MBR) também importa: ele precisa ser compatível com o modo de inicialização do firmware. Disco MBR em máquina configurada para UEFI puro não inicia — e esse é um dos motivos silenciosos de falha de partida depois de uma troca de disco.",
    ],
    porQueImporta:
      "Boa parte das perdas de dados evitáveis acontece durante um redimensionamento ou uma reinstalação: alguém apaga a partição errada, remove a área de recuperação do fabricante ou o carregador de inicialização. Saber o que cada área faz é o que separa uma operação rotineira de um prejuízo.",
    sintomas: [
      "O disco tem menos espaço disponível do que a capacidade anunciada, com áreas 'reservadas' visíveis.",
      "Aparecem partições sem letra no Gerenciamento de Disco.",
      "Depois de trocar de disco, a máquina não inicia mesmo com o sistema copiado.",
      "Pedido de chave de recuperação após alteração da estrutura do disco.",
    ],
    verificacoesSeguras: [
      "Abrir o Gerenciamento de Disco do Windows apenas para visualizar o mapa das partições — sem alterar nada.",
      "Anotar tamanhos, letras e rótulos antes de qualquer operação de disco.",
      "Confirmar se o backup está em outro disco físico, e não em outra partição do mesmo disco.",
      "Verificar se há criptografia ativa e ter a chave de recuperação salva fora da máquina.",
    ],
    naoFazer: [
      "Não apagar partições sem letra: normalmente são inicialização, recuperação ou área do fabricante.",
      "Não redimensionar partições de disco com alerta S.M.A.R.T. ou ruído — a operação exige leitura e escrita intensas.",
      "Não converter o esquema de particionamento sem backup conferido: a conversão mal executada torna o disco não inicializável.",
    ],
    risco: "Exige atenção",
    riscoNota:
      "Visualizar o mapa de partições é seguro. Qualquer alteração de estrutura mexe diretamente na área que contém os dados e deve ser feita com backup conferido.",
    links: [
      {
        rotulo: "Checklist antes de formatar",
        to: "/ferramentas/checklist-antes-de-formatar",
        contexto: "O que mapear no disco antes de reinstalar o sistema.",
      },
      {
        rotulo: "Imagem do sistema no glossário",
        to: "/glossario/imagem-do-sistema",
        contexto: "A cópia que preserva a estrutura inteira do disco, e não só arquivos.",
      },
      {
        rotulo: "Recuperação de dados",
        to: "/servicos/recuperacao-de-dados",
        contexto: "Quando a partição some ou deixa de ser reconhecida pelo sistema.",
      },
    ],
    relacionados: ["uefi", "imagem-do-sistema", "recuperacao-de-dados"],
    fontes: [
      {
        titulo: "Microsoft Learn — UEFI/GPT-based hard drive partitions",
        url: "https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/configure-uefigpt-based-hard-drive-partitions",
        nota: "layout oficial de partições exigido por instalações UEFI",
      },
    ],
  },
];


/** Ordem fixa das categorias no hub. */
export const CATEGORIAS_GLOSSARIO: CategoriaGlossario[] = [
  "Sistema e inicialização",
  "Armazenamento e dados",
  "Segurança",
  "Redes",
  "Hardware e desempenho",
];

export const termoPorSlug = (slug: string): TermoGlossario | undefined =>
  TERMOS_GLOSSARIO.find((t) => t.slug === slug);

export const termosDaCategoria = (categoria: CategoriaGlossario): TermoGlossario[] =>
  TERMOS_GLOSSARIO.filter((t) => t.categoria === categoria);
