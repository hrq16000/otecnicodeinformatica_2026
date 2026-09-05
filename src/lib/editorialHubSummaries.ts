/**
 * Índice leve do hub editorial. Mantém título, resumo e tema no HTML inicial
 * de /blog sem transferir o corpo completo de cada artigo para a página-hub.
 * Atualizar junto de blogPostsContent.tsx e do registro editorial.
 */
export type EditorialHubSummary = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
};

const rows: Array<EditorialHubSummary & { slug: string }> = [
  {
    "slug": "organizacao-de-ti-para-pequenos-escritorios",
    "title": "Organização de TI para pequenos escritórios: o guia prático",
    "excerpt": "Como organizar equipamentos, arquivos, acessos e rotina de manutenção em um escritório pequeno, sem contratar estrutura de TI que não cabe no negócio.",
    "date": "2026-08-06",
    "readTime": "10 min",
    "category": "Empresas"
  },
  {
    "slug": "como-escolher-uma-workstation",
    "title": "Como escolher uma workstation: checklist de requisitos",
    "excerpt": "Checklist prático para dimensionar uma estação de trabalho profissional: o que levantar antes de comprar peça.",
    "date": "2026-08-06",
    "readTime": "11 min",
    "category": "Hardware"
  },
  {
    "slug": "computador-lento-causas-solucoes",
    "title": "Computador lento: causas possíveis e como decidir o próximo passo",
    "excerpt": "Entenda por que um computador fica lento, o que dá para verificar com segurança e quando formatar, fazer upgrade ou buscar manutenção realmente faz diferença.",
    "date": "2026-04-06",
    "readTime": "11 min",
    "category": "Manutenção"
  },
  {
    "slug": "como-saber-se-pc-tem-virus-malware",
    "title": "Como saber se o computador está com vírus ou malware",
    "excerpt": "Pop-ups, navegador alterado, lentidão repentina ou arquivos bloqueados? Veja os sinais de infecção.",
    "date": "2026-04-05",
    "readTime": "10 min",
    "category": "Segurança"
  },
  {
    "slug": "notebook-nao-liga-o-que-fazer",
    "title": "Notebook não liga: o que verificar antes da assistência",
    "excerpt": "Veja verificações seguras para um notebook que não liga, liga sem imagem ou desliga sozinho e saiba quando interromper os testes.",
    "date": "2026-04-04",
    "readTime": "10 min",
    "category": "Manutenção"
  },
  {
    "slug": "como-escolher-um-bom-antivirus",
    "title": "Como escolher um antivírus: o que muda de verdade na proteção",
    "excerpt": "Critérios técnicos para escolher a proteção do Windows: o que o antivírus do sistema já cobre, quando um pago faz diferença, o que é só marketing e como reconhecer falso antivírus.",
    "date": "2026-08-12",
    "readTime": "11 min",
    "category": "Segurança"
  },
  {
    "slug": "quando-trocar-hd-por-ssd",
    "title": "Vale a pena trocar o HD por SSD? Como avaliar o upgrade",
    "excerpt": "O SSD acelera a inicialização e a abertura de programas, mas não resolve tudo. Veja o que muda.",
    "date": "2024-01-05",
    "readTime": "9 min",
    "category": "Hardware"
  },
  {
    "slug": "backup-como-proteger-seus-arquivos",
    "title": "Como evitar perder arquivos: guia de backup preventivo",
    "excerpt": "Backup não é copiar arquivos para outra pasta do mesmo disco. Entenda cópias local, externa e em nuvem.",
    "date": "2024-01-02",
    "readTime": "9 min",
    "category": "Segurança"
  },
  {
    "slug": "notebook-superaquecendo-o-que-fazer",
    "title": "Notebook superaquecendo: sinais, prevenção e o que fazer",
    "excerpt": "Aquecimento normal ou comportamento de risco? Veja o que observar no superaquecimento, o que fazer com segurança e os sinais que pedem desligar o equipamento.",
    "date": "2023-12-28",
    "readTime": "9 min",
    "category": "Manutenção"
  },
  {
    "slug": "como-proteger-computador-golpes-internet",
    "title": "Como se proteger de golpes na internet: o que checar antes de clicar",
    "excerpt": "Phishing, sites clonados, falso suporte técnico e extensões maliciosas: como reconhecer cada padrão, o que verificar antes de clicar e o que fazer nas primeiras horas depois de cair em um golpe.",
    "date": "2026-08-12",
    "readTime": "12 min",
    "category": "Segurança"
  },
  {
    "slug": "windows-11-lento-como-resolver",
    "title": "Windows 11 lento: como descobrir a causa antes de sair otimizando",
    "excerpt": "Lentidão no Windows 11 quase nunca tem uma causa única. Como ler os sinais, separar limite de hardware de software mal configurado e decidir entre ajuste, upgrade e reinstalação.",
    "date": "2026-08-12",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "ransomware-como-proteger-empresa",
    "title": "Ransomware em pequenas empresas: como o ataque entra e o que realmente segura o prejuízo",
    "excerpt": "Por onde o ransomware entra numa empresa pequena, por que o backup comum costuma ser criptografado junto, o que fazer nas primeiras horas e quais medidas realmente reduzem o risco.",
    "date": "2026-08-12",
    "readTime": "12 min",
    "category": "Segurança"
  },
  {
    "slug": "backup-nuvem-empresas-qual-escolher",
    "title": "Backup em nuvem para empresas: o que diferencia sincronização de backup de verdade",
    "excerpt": "Por que pasta sincronizada não é backup, quais critérios comparar antes de contratar, como estruturar cópias em camadas e o teste que revela se a rotina realmente funciona.",
    "date": "2026-08-12",
    "readTime": "11 min",
    "category": "Segurança"
  },
  {
    "slug": "como-trocar-pasta-termica-notebook",
    "title": "Troca de pasta térmica no notebook: quando faz sentido e como não errar",
    "excerpt": "O que a pasta térmica faz, como saber se ela é mesmo a causa do aquecimento, a sequência correta de remoção e aperto do dissipador e os erros que danificam a placa.",
    "date": "2026-08-12",
    "readTime": "11 min",
    "category": "Manutenção"
  },
  {
    "slug": "como-clonar-hd-para-ssd",
    "title": "Clonar HD para SSD: quando clonar, quando reinstalar e onde o processo falha",
    "excerpt": "A diferença real entre clonar e reinstalar, como saber se o disco de origem aguenta a clonagem, os pontos em que o processo trava e o que conferir antes de apagar o disco antigo.",
    "date": "2026-08-12",
    "readTime": "11 min",
    "category": "Manutenção"
  },
  {
    "slug": "como-testar-fonte-de-alimentacao-pc",
    "title": "Testar a fonte do PC: o que o teste prova, o que ele não prova e quando trocar",
    "excerpt": "Como separar defeito de fonte de defeito de placa antes de comprar peça: o que cada teste mede, por que fonte que liga pode estar ruim e quais sinais fecham a decisão de troca.",
    "date": "2026-08-12",
    "readTime": "10 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-limpar-notebook-por-dentro",
    "title": "Limpeza interna de notebook: o que muda de verdade e onde estão os riscos",
    "excerpt": "Como a poeira compromete a refrigeração de um notebook, o que dá para verificar sem abrir o equipamento, o que a limpeza interna resolve, o que ela não resolve e quais erros custam caro na bancada.",
    "date": "2026-08-12",
    "readTime": "11 min",
    "category": "Manutenção"
  },
  {
    "slug": "como-diagnosticar-placa-mae-defeituosa",
    "title": "Placa-mãe defeituosa: como confirmar antes de trocar a peça errada",
    "excerpt": "Inspeção visual, teste mínimo e eliminação sistemática para distinguir falha de placa-mãe de falha de memória, fonte ou refrigeração — e quando reparo eletrônico ainda faz sentido.",
    "date": "2026-08-12",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-instalar-segundo-ssd-notebook",
    "title": "Segundo SSD no notebook: quando cabe, quando não cabe e o que muda",
    "excerpt": "Como descobrir se o notebook aceita um segundo disco, a diferença entre slot M.2 livre e caddy no lugar do leitor óptico, os limites de cada caminho e o que fazer depois da instalação.",
    "date": "2026-08-12",
    "readTime": "10 min",
    "category": "Manutenção"
  },
  {
    "slug": "como-fazer-upgrade-ssd-nvme",
    "title": "Upgrade para SSD NVMe: quando compensa e como é feito",
    "excerpt": "Como saber se a sua placa aceita NVMe, o que muda de verdade no uso diário e quais são as etapas do serviço feito em bancada.",
    "date": "2026-04-20",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-recuperar-dados-hd-com-defeito",
    "title": "Recuperação de dados de HD com defeito: o que é possível",
    "excerpt": "Como diferenciar falha lógica de falha mecânica, o que fazer nos primeiros minutos e por que insistir em ligar o disco reduz a chance de recuperar.",
    "date": "2026-04-20",
    "readTime": "12 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-trocar-tela-notebook-passo-a-passo",
    "title": "Como Trocar a Tela do Notebook: Passo a Passo Profissional",
    "excerpt": "Guia técnico para identificar a tela correta, desmontar com segurança e instalar a nova sem danificar o flat cable.",
    "date": "2026-04-20",
    "readTime": "10 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-instalar-windows-11-do-zero",
    "title": "Como preparar uma instalação limpa do Windows 11",
    "excerpt": "Entenda backup, requisitos, mídia oficial, licença, drivers e riscos antes de fazer uma instalação limpa do Windows 11.",
    "date": "2026-04-20",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-resolver-tela-azul-windows",
    "title": "Como Resolver Tela Azul do Windows (BSOD): Diagnóstico e Solução",
    "excerpt": "Análise de códigos de erro, dump de memória, drivers problemáticos e procedimento profissional de correção.",
    "date": "2026-04-20",
    "readTime": "10 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-instalar-impressora-windows-passo-a-passo",
    "title": "Instalar impressora no Windows: por que ela some da rede e como deixar a instalação estável",
    "excerpt": "O que muda entre instalar por cabo e instalar em rede, por que a impressora desaparece depois de reiniciar o roteador e como fixar o endereço para a instalação parar de se perder.",
    "date": "2026-08-12",
    "readTime": "11 min",
    "category": "Redes"
  },
  {
    "slug": "como-remover-virus-windows-iniciantes",
    "title": "Remover vírus e adware do Windows: o que funciona, o que só disfarça",
    "excerpt": "Como reconhecer infecção de verdade, limpar sem quebrar o sistema, entender por que o problema volta e saber a hora em que remoção deixa de ser a resposta certa.",
    "date": "2026-08-12",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-melhorar-sinal-wifi-em-casa",
    "title": "Wi-Fi caindo ou com sinal fraco: como diagnosticar",
    "excerpt": "Wi-Fi que cai, fica lento ou não chega em alguns cômodos? Veja como separar problema da rede local e falha da operadora.",
    "date": "2026-04-29",
    "readTime": "9 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-configurar-roteador-wifi-iniciantes",
    "title": "Como configurar um roteador Wi-Fi do zero, sem complicação",
    "excerpt": "Ordem correta das etapas, o que mudar na primeira configuração e os ajustes que evitam a maior parte dos problemas de sinal depois.",
    "date": "2026-04-22",
    "readTime": "11 min",
    "category": "Redes e Wi-Fi"
  },
  {
    "slug": "como-saber-quem-esta-usando-meu-wifi",
    "title": "Como saber quem está usando o seu Wi-Fi (e o que fazer)",
    "excerpt": "Como listar os dispositivos conectados, identificar cada um pelo nome e pelo endereço físico e retomar o controle da rede sem quebrar o que funciona.",
    "date": "2026-04-22",
    "readTime": "10 min",
    "category": "Redes e Wi-Fi"
  },
  {
    "slug": "como-conectar-wifi-tv-nao-conecta",
    "title": "Smart TV não conecta no Wi-Fi: como separar problema de rede de defeito da TV",
    "excerpt": "Como descobrir se a Smart TV não conecta por causa da rede, da faixa de 5 GHz, do isolamento do roteador ou de falha no módulo Wi-Fi do aparelho — e o que fazer em cada caso.",
    "date": "2026-08-12",
    "readTime": "11 min",
    "category": "Redes"
  },
  {
    "slug": "como-formatar-pc-sem-perder-arquivos",
    "title": "Como formatar o PC ou notebook sem perder arquivos",
    "excerpt": "O que decidir antes de formatar: quando a reinstalação resolve, quando não resolve, como preservar arquivos, contas e licenças, e a diferença entre redefinir o sistema e instalar do zero.",
    "date": "2026-08-14",
    "readTime": "12 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "quanto-custa-formatar-um-computador",
    "title": "Quanto custa formatar um computador?",
    "excerpt": "O que entra no valor de uma formatação: tempo técnico, modalidade de atendimento, backup, licença e peças. Os valores praticados aqui e o que não está incluso.",
    "date": "2026-08-14",
    "readTime": "8 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "o-que-e-informatica",
    "title": "O que é informática? Definição completa em português",
    "excerpt": "Entenda o que é informática, para que serve, onde é aplicada e qual a diferença entre informática, computação e TI. Guia nacional em português.",
    "date": "2026-08-15",
    "readTime": "10 min",
    "category": "Fundamentos"
  },
  {
    "slug": "informatica-basica",
    "title": "Informática Básica: O Que É, O Que Ensina e Por Onde Começar",
    "excerpt": "Saiba o que é informática básica, o que se aprende, para que serve e como estudar do zero. Conteúdo nacional em português, sem filler.",
    "date": "2026-08-15",
    "readTime": "12 min",
    "category": "Fundamentos"
  },
  {
    "slug": "como-aprender-informatica",
    "title": "Como Aprender Informática do Zero: Guia Prático para Iniciantes",
    "excerpt": "Descubra como aprender informática do zero, em casa, para concurso ou trabalho. Roteiro prático, recursos gratuitos e dicas de estudo.",
    "date": "2026-08-15",
    "readTime": "13 min",
    "category": "Fundamentos"
  },
  {
    "slug": "computador-entra-direto-na-bios",
    "title": "Meu computador entra direto na BIOS: guia de diagnóstico e solução",
    "excerpt": "Por que o PC abre a tela de configuração em vez do Windows: disco não detectado, conflito UEFI/Legacy (CSM), bateria CMOS e Fast Boot. Diagnóstico em ordem.",
    "date": "2026-08-25",
    "readTime": "14 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "erro-no-bootable-device-como-resolver",
    "title": "Erro \"No Bootable Device\": como verificar sem formatar",
    "excerpt": "Como conferir detecção, ordem de boot, BitLocker e partição EFI antes de reparar a inicialização do Windows ou pensar em formatar.",
    "date": "2026-08-25",
    "readTime": "12 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "troquei-o-ssd-e-o-pc-so-abre-a-bios",
    "title": "Troquei o HD/SSD e o PC só abre a BIOS: o que fazer",
    "excerpt": "Disco novo vem vazio: sem sistema instalado, o computador para no Setup. Como confirmar a detecção do M.2, resolver conflito de portas e instalar o Windows do zero.",
    "date": "2026-08-25",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "limpar-arquivos-temporarios-windows",
    "title": "Como limpar arquivos temporários e liberar espaço no Windows",
    "excerpt": "Onde o Windows guarda arquivos temporários, quanto isso realmente pesa no desempenho e como limpar com segurança — sem programas de faxina e sem apagar o que faz falta.",
    "date": "2026-08-25",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "memoria-ram-insuficiente-sintomas",
    "title": "Memória RAM insuficiente: sintomas, como confirmar e quando fazer upgrade",
    "excerpt": "Como distinguir falta de memória de disco lento ou vírus, ler o Gerenciador de Tarefas sem se enganar e decidir se o upgrade de RAM resolve o seu caso.",
    "date": "2026-08-25",
    "readTime": "12 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "codigos-de-erro-tela-azul-windows",
    "title": "Códigos de erro da tela azul: como ler e o que cada um indica",
    "excerpt": "O que significam MEMORY_MANAGEMENT, IRQL_NOT_LESS_OR_EQUAL, CRITICAL_PROCESS_DIED e outros códigos — e como usá-los para separar defeito de driver, memória ou disco.",
    "date": "2026-08-25",
    "readTime": "13 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "testar-memoria-ram-memtest86",
    "title": "Como testar a memória RAM com Memtest86+ (passo a passo)",
    "excerpt": "Quando testar a memória, como criar a mídia de inicialização, quantas passagens fazer e como interpretar erros para saber qual módulo trocar.",
    "date": "2026-08-25",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "botao-power-nao-funciona-jump-start-placa-mae",
    "title": "Botão power não funciona: como ligar o PC pelo conector da placa-mãe",
    "excerpt": "Como separar defeito do botão frontal de falha de fonte ou placa, e como acionar a partida pelo conector do painel frontal para confirmar o diagnóstico.",
    "date": "2026-08-26",
    "readTime": "9 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "curto-circuito-placa-mae-como-identificar",
    "title": "Curto-circuito na placa-mãe: como identificar e isolar o problema",
    "excerpt": "Como reconhecer um curto de alimentação, isolar componente por componente com o teste fora do gabinete e saber quando o reparo deixa de ser viável.",
    "date": "2026-08-26",
    "readTime": "10 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "bios-corrompida-reset-cmos-atualizacao",
    "title": "BIOS corrompida: reset de CMOS e recuperação de firmware",
    "excerpt": "Quando o reset de CMOS resolve, como fazer pelo jumper ou pela bateria e o que muda quando o firmware realmente corrompeu durante uma atualização.",
    "date": "2026-08-26",
    "readTime": "10 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "internet-lenta-provedor-ou-roteador",
    "title": "Internet lenta: é o provedor ou o seu roteador?",
    "excerpt": "Como separar, com dois testes objetivos, a lentidão que vem da operadora da lentidão que nasce dentro de casa — e o que fazer em cada caso.",
    "date": "2026-08-26",
    "readTime": "9 min",
    "category": "Redes e Wi-Fi"
  },
  {
    "slug": "impressora-offline-como-resolver",
    "title": "Impressora offline: por que aparece assim e como resolver",
    "excerpt": "O que o status offline significa no Windows e como separar endereço de rede perdido, fila pausada e falha de conexão antes de reinstalar.",
    "date": "2026-08-26",
    "readTime": "9 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "fila-de-impressao-travada-spooler-windows",
    "title": "Fila de impressão travada: como destravar o spooler do Windows",
    "excerpt": "O que é o serviço de spooler, por que a fila trava com documentos presos em \"excluindo\" e o procedimento correto para limpar sem reinstalar a impressora.",
    "date": "2026-08-26",
    "readTime": "8 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "hd-nao-e-reconhecido-na-bios-o-que-fazer",
    "title": "HD ou SSD não é reconhecido na BIOS: o que verificar antes de trocar",
    "excerpt": "Quando o disco some do Setup, o problema quase nunca é o Windows. Sequência de verificação por energia, cabo, porta e detecção — e o que NÃO fazer quando há dados importantes.",
    "date": "2026-08-26",
    "readTime": "10 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "ssd-nvme-nao-aparece-no-gerenciador-de-discos",
    "title": "SSD aparece na BIOS mas não no Windows: como inicializar o disco",
    "excerpt": "Disco novo chega sem inicialização, sem partição e sem letra. O que fazer no Gerenciamento de Disco, como escolher GPT ou MBR e o cuidado antes de mexer em disco com dados.",
    "date": "2026-08-26",
    "readTime": "9 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "disco-com-setores-defeituosos-smart-o-que-fazer",
    "title": "Setores defeituosos e SMART com alerta: o que fazer (e o que não fazer)",
    "excerpt": "Como ler os indicadores SMART, por que CHKDSK não é a resposta padrão para disco suspeito de falha física e qual é a ordem correta: copiar primeiro, investigar depois.",
    "date": "2026-08-26",
    "readTime": "10 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "computador-sem-som-o-que-verificar",
    "title": "Computador sem som: sequência de verificação do alto-falante ao driver",
    "excerpt": "Do volume e do dispositivo de saída errado até driver e conector: como isolar a causa do silêncio no Windows sem reinstalar o sistema.",
    "date": "2026-08-26",
    "readTime": "9 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "fone-de-ouvido-nao-e-reconhecido-no-pc",
    "title": "Fone de ouvido não é reconhecido no PC: entrada frontal, detecção e microfone",
    "excerpt": "Por que o fone toca na entrada de trás e não na da frente, o que é detecção de conector, a diferença entre P2 combo e duas entradas e como resolver o microfone mudo.",
    "date": "2026-08-26",
    "readTime": "8 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "servico-de-audio-do-windows-nao-esta-em-execucao",
    "title": "Serviço de áudio do Windows não está em execução: como reativar",
    "excerpt": "O que são os serviços Windows Audio e Audio Endpoint Builder, como reiniciá-los na ordem correta, quando reinstalar o driver e como distinguir falha de serviço de falha de hardware.",
    "date": "2026-08-26",
    "readTime": "8 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "webcam-nao-funciona-o-que-verificar",
    "title": "Webcam não funciona: como separar privacidade, aplicativo, driver e hardware",
    "excerpt": "Cinco perguntas isolam a causa quando a câmera não funciona: ela existe no sistema, o Windows libera, o aplicativo tem permissão, o driver está sadio ou o módulo falhou.",
    "date": "2026-08-26",
    "readTime": "10 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "permissoes-de-camera-no-windows",
    "title": "Permissões de câmera no Windows: quando é o sistema que bloqueia e quando é o aplicativo",
    "excerpt": "Acesso global, acesso por aplicativo, programas de área de trabalho e permissão de site no navegador são camadas diferentes. Entender qual está fechada resolve a maioria dos casos de câmera bloqueada.",
    "date": "2026-08-26",
    "readTime": "8 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "webcam-usb-nao-e-detectada",
    "title": "Webcam USB não é detectada: porta, cabo, alimentação e driver",
    "excerpt": "Roteiro de eliminação para webcam externa que o Windows não enxerga: teste de porta, hub sem alimentação, cabo, dispositivo desconhecido no Gerenciador e teste cruzado em outro computador.",
    "date": "2026-08-26",
    "readTime": "8 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "windows-update-nao-funciona-o-que-verificar",
    "title": "Windows Update não funciona: como descobrir em qual estágio a atualização falha",
    "excerpt": "Verificação, download, preparação, instalação e reinicialização são estágios distintos. Identificar onde a atualização para elimina metade dos procedimentos inúteis.",
    "date": "2026-08-26",
    "readTime": "11 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "limpar-cache-do-windows-update-softwaredistribution",
    "title": "Cache do Windows Update: o que é a SoftwareDistribution e como tratá-la sem risco",
    "excerpt": "A pasta guarda downloads e histórico do Update. Renomear é reversível, apagar não é. Quando o procedimento ajuda, o que ele custa e por que não é solução universal.",
    "date": "2026-08-26",
    "readTime": "9 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "windows-update-travado-desfazendo-alteracoes",
    "title": "Windows Update travado ou \"desfazendo alterações\"",
    "excerpt": "Como distinguir interface parada de processo realmente parado, por que o Windows reverte uma atualização e o que fazer antes de desligar a máquina no botão.",
    "date": "2026-08-26",
    "readTime": "9 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "boot-uefi-ou-legacy-como-identificar",
    "title": "UEFI ou Legacy: como identificar o modo de inicialização do seu PC",
    "excerpt": "Como descobrir em qual modo o Windows foi instalado, por que GPT e MBR importam e o que muda ao alternar entre UEFI e Legacy sem preparar o disco.",
    "date": "2026-08-31",
    "readTime": "9 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "ordem-de-boot-na-bios-como-configurar",
    "title": "Ordem de boot na BIOS: como configurar sem quebrar a inicialização",
    "excerpt": "Para que serve a prioridade de inicialização, quando usar o menu de boot temporário e por que Fast Boot e portas USB atrapalham o reconhecimento do pendrive.",
    "date": "2026-08-31",
    "readTime": "8 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "windows-reparo-automatico-em-loop",
    "title": "Reparo automático em laço: o que fazer quando o Windows não sai dessa tela",
    "excerpt": "Por que o Windows entra em reparo automático repetido, o que observar antes de tentar qualquer comando e em que ponto a prioridade passa a ser salvar os arquivos.",
    "date": "2026-08-31",
    "readTime": "10 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "manutencao-preventiva-de-computador-guia-completo",
    "title": "Manutenção preventiva de computador: o guia completo",
    "excerpt": "O que realmente precisa ser verificado, com que frequência e em que ordem — do calor e da poeira ao estado do armazenamento — sem trocar peça por precaução.",
    "date": "2026-09-03",
    "readTime": "12 min",
    "category": "Manutenção"
  },
  {
    "slug": "dispositivo-usb-nao-reconhecido-o-que-fazer",
    "title": "Dispositivo USB não reconhecido: como descobrir a causa",
    "excerpt": "Como separar defeito do aparelho, da porta, do cabo, da alimentação e do driver — em uma sequência de testes que não exige abrir o computador.",
    "date": "2026-09-03",
    "readTime": "11 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "como-testar-restauracao-de-backup",
    "title": "Como testar se o backup realmente funciona",
    "excerpt": "Cópia nunca restaurada é suposição. O roteiro de teste de restauração, o que registrar e os erros que só aparecem no dia em que o arquivo faz falta.",
    "date": "2026-09-03",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-monitorar-temperatura-do-computador",
    "title": "Como monitorar a temperatura do computador (e quando ela é problema)",
    "excerpt": "Quais temperaturas medir, o que é normal sob carga, como reconhecer throttling e em que ponto o calor deixa de ser característica e vira defeito.",
    "date": "2026-09-03",
    "readTime": "11 min",
    "category": "Manutenção"
  },
  {
    "slug": "pendrive-somente-leitura-protegido-contra-gravacao",
    "title": "Pendrive somente leitura: por que aparece \"protegido contra gravação\"",
    "excerpt": "Como separar trava física, política do sistema, sistema de arquivos danificado e memória em fim de vida — e por que copiar os arquivos vem antes de qualquer tentativa de conserto.",
    "date": "2026-09-03",
    "readTime": "10 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "historico-de-arquivos-windows-como-configurar",
    "title": "Histórico de Arquivos do Windows: como configurar versões de verdade",
    "excerpt": "O recurso nativo que guarda versões anteriores dos seus arquivos: o que ele cobre, o que ele não cobre e como configurá-lo sem confundir versionamento com backup completo.",
    "date": "2026-09-03",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "monitor-sem-sinal-o-que-verificar",
    "title": "Monitor sem sinal: o que verificar antes de trocar de peça",
    "excerpt": "\"Sem sinal\" na tela não quer dizer monitor queimado. A sequência para separar cabo, entrada errada, saída de vídeo e computador que nem chegou a iniciar.",
    "date": "2026-09-03",
    "readTime": "10 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "bateria-de-notebook-nao-carrega-o-que-verificar",
    "title": "Bateria de notebook não carrega: o que verificar antes de comprar outra",
    "excerpt": "\"Conectado, não carregando\" tem mais de uma causa. Como separar fonte, conector, bateria em fim de vida e limite de carga configurado — sem trocar peça no escuro.",
    "date": "2026-09-03",
    "readTime": "11 min",
    "category": "Manutenção"
  },
  {
    "slug": "como-migrar-arquivos-para-um-computador-novo",
    "title": "Como migrar arquivos para um computador novo sem perder nada",
    "excerpt": "Inventário, método de transferência, conferência e só então o descarte do equipamento antigo. O roteiro que evita a descoberta tardia de que faltou alguma coisa.",
    "date": "2026-09-03",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "teclado-de-notebook-nao-funciona-o-que-verificar",
    "title": "Teclado de notebook não funciona: o que verificar antes de trocar",
    "excerpt": "Teclas mortas, teclado inteiro parado ou caracteres trocados são problemas diferentes. Como separar sujeira, configuração, cabo flat e dano por líquido antes de comprar peça.",
    "date": "2026-09-03",
    "readTime": "10 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "computador-desliga-sozinho-o-que-verificar",
    "title": "Computador desliga sozinho: o que verificar antes de trocar peça",
    "excerpt": "Desligamento repentino tem causas bem distintas: temperatura, fonte, energia elétrica e memória. Como identificar qual delas é a sua sem sair trocando componentes.",
    "date": "2026-09-03",
    "readTime": "11 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "computador-nao-conecta-na-internet-por-cabo",
    "title": "Computador não conecta na internet por cabo: o que verificar",
    "excerpt": "Cabo ligado e nada de internet. Como separar cabo rompido, porta do roteador, placa de rede e falha do provedor — com testes na ordem certa.",
    "date": "2026-09-03",
    "readTime": "10 min",
    "category": "Redes"
  },
  {
    "slug": "ventoinha-do-computador-fazendo-barulho-o-que-verificar",
    "title": "Ventoinha fazendo barulho: o que o som indica antes de trocar peça",
    "excerpt": "Chiado, estalo, zumbido grave ou rangido são ruídos com causas diferentes. Como usar o tipo de som e o momento em que ele aparece para descobrir a origem sem trocar componente à toa.",
    "date": "2026-09-03",
    "readTime": "10 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "rede-wifi-nao-aparece-na-lista-o-que-verificar",
    "title": "Rede Wi-Fi não aparece na lista: o que verificar antes de trocar o roteador",
    "excerpt": "Sumir da lista é diferente de conectar e não navegar. Como separar adaptador desligado, banda de 5 GHz, rede oculta e roteador fora do ar em poucos testes.",
    "date": "2026-09-03",
    "readTime": "10 min",
    "category": "Redes"
  },
  {
    "slug": "arquivo-corrompido-nao-abre-o-que-fazer",
    "title": "Arquivo corrompido não abre: o que fazer sem piorar o caso",
    "excerpt": "Antes de tentar qualquer reparo, preserve o original. Como separar arquivo realmente danificado de programa incompatível e quando o caso vira recuperação de dados.",
    "date": "2026-09-03",
    "readTime": "11 min",
    "category": "Dados"
  },
];

export const EDITORIAL_HUB_SUMMARIES: Record<string, EditorialHubSummary> = Object.fromEntries(
  rows.map(({ slug, ...summary }) => [slug, summary]),
);
