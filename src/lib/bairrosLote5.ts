// ─────────────────────────────────────────────────────────────
// ONDA LOCAL 5 — bairros já existentes em Curitiba e São José dos Pinhais.
// Conteúdo autoral por bairro, sem inventar filial, endereço, SLA, distância,
// volume de clientes, avaliações ou tempo de chegada.
// Indexabilidade: src/lib/localIndexPolicy.json.
// ─────────────────────────────────────────────────────────────
import type { BairroLocalData } from "@/lib/bairrosData";

export const BAIRROS_LOTE_5: Record<string, BairroLocalData> = {
  reboucas: {
    slug: "reboucas",
    nome: "Rebouças",
    nomeLocativo: "no Rebouças",
    cidade: "Curitiba",
    areaName: "Rebouças, Curitiba",
    metaTitle: "Técnico de informática no Rebouças | PC, notebook e rede",
    metaDescription:
      "Atendimento de informática no Rebouças, Curitiba: notebook e PC, impressora, rede, formatação com backup e suporte a pequenos escritórios.",
    h1: "Técnico de informática no Rebouças – Curitiba",
    subtitulo:
      "Suporte para residências, home office e pequenos negócios, com triagem antes de decidir entre remoto, visita e bancada.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Rebouças, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "No Rebouças, o computador muitas vezes divide espaço com rotina de trabalho: notebook ligado a monitor externo, impressora compartilhada, navegador com sistemas de empresa e arquivos que não podem sumir no meio de uma reinstalação. Por isso a triagem começa entendendo o que precisa continuar funcionando e quais dados precisam ser preservados antes de qualquer intervenção.",
      "A partir do sintoma, separamos problema de sistema, armazenamento, periférico e rede. Quando a máquina liga e conecta, parte do diagnóstico pode ser feita remotamente; quando o defeito depende do ambiente, como Wi‑Fi ou impressora, a visita pode fazer mais sentido; falhas físicas e testes prolongados seguem para bancada.",
    ],
    contextoLocal: [
      "Em estações usadas para trabalho, lentidão nem sempre significa computador velho. Disco quase cheio, aplicativos iniciando com o Windows, sincronização em nuvem e memória pressionada podem produzir a mesma sensação. A avaliação mede esses pontos antes de sugerir SSD, memória ou reinstalação.",
      "Outro cenário comum é a impressora que funciona em um computador e desaparece em outro. O diagnóstico compara conexão USB ou rede, endereço do equipamento, fila de impressão e driver, evitando reinstalações repetidas sem descobrir a causa.",
    ],
    logisticaLocal: [
      "Quando há software de trabalho, certificado digital, VPN ou configuração de impressora, registramos o que existe antes de formatar. Essa etapa reduz o risco de devolver uma máquina rápida, mas sem o ambiente que a pessoa realmente precisa para trabalhar.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp separando sistema, hardware, rede e periféricos",
      "Preservação de arquivos e configurações importantes antes de reinstalar",
      "Diagnóstico antes de recomendar compra de SSD, memória ou equipamento novo",
      "Execução somente depois da aprovação do valor e do escopo",
    ],
    atendimentoLocal: [
      "Computador ou notebook lento em rotina de trabalho",
      "Impressora que some da rede ou para de responder",
      "Wi‑Fi instável em home office",
      "Formatação com backup conferido",
    ],
    coletaBancada: [
      "Notebook que não liga ou apresenta falha física",
      "Troca de SSD, memória, teclado ou tela",
      "Falha intermitente que exige teste prolongado",
    ],
    publicoAtendido: [
      "Quem trabalha de casa com notebook e periféricos",
      "Pequenos escritórios com poucos computadores",
      "Residências com computador compartilhado",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-notebook",
      "/servicos/manutencao-de-computador",
      "/servicos/redes-e-wifi",
      "/servicos/formatacao",
    ],
    problemasRelacionados: [
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como separar disco, memória e software antes de trocar peça." },
      { to: "/problemas/impressora-nao-imprime", label: "Impressora não imprime", desc: "Fila, rede, endereço e driver: a sequência de verificação." },
      { to: "/problemas/wifi-instavel", label: "Wi‑Fi instável", desc: "Como descobrir se a falha está no link, no roteador ou no ambiente." },
    ],
    faqLocal: [
      { question: "Vocês atendem home office no Rebouças?", answer: "Sim. A triagem considera notebook, monitor, impressora, VPN e rede porque o problema pode estar no conjunto, não apenas no computador." },
      { question: "Dá para resolver sem levar o computador?", answer: "Quando a máquina liga e mantém internet, vários problemas de sistema e configuração podem ser avaliados remotamente. Falha física ou dependente do ambiente pode exigir visita ou bancada." },
      { question: "Formatam sem apagar meus arquivos?", answer: "Antes de reinstalar, combinamos o que precisa ser preservado e conferimos a cópia possível dos dados. Formatação nunca deve começar sem essa etapa." },
      { question: "Como é definido o valor?", answer: "O valor depende do diagnóstico, da modalidade e de eventuais peças. O escopo é informado e aprovado antes da execução." },
    ],
  },

  hauer: {
    slug: "hauer",
    nome: "Hauer",
    nomeLocativo: "no Hauer",
    cidade: "Curitiba",
    areaName: "Hauer, Curitiba",
    metaTitle: "Técnico de informática no Hauer | PC, notebook e Wi‑Fi",
    metaDescription:
      "Informática no Hauer, Curitiba: manutenção de PC e notebook, Wi‑Fi, SSD, formatação com backup e remoção de programas indesejados.",
    h1: "Atendimento de informática no Hauer – Curitiba",
    subtitulo:
      "Diagnóstico para computadores de uso doméstico, home office e pequenos negócios, sem trocar peça por tentativa.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Hauer, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "No Hauer, uma máquina usada por vários anos pode apresentar lentidão, travamento e demora para iniciar ao mesmo tempo. Esses sintomas parecem um único defeito, mas podem vir de armazenamento degradado, memória insuficiente, excesso de programas na inicialização ou temperatura elevada. O diagnóstico separa essas causas antes de qualquer compra.",
      "Problemas de rede também exigem observar o ambiente. Quando o Wi‑Fi funciona perto do roteador e cai em outro cômodo, trocar o plano de internet raramente resolve sozinho. Primeiro verificamos sinal, posição do roteador, interferência e comportamento por cabo.",
    ],
    contextoLocal: [
      "Em desktop, fonte e disco merecem atenção quando há desligamento súbito ou congelamento. Em notebook, bateria, temperatura e conector de energia entram na mesma investigação. O objetivo é encontrar evidência antes de substituir componentes.",
      "Quando a lentidão é realmente causada por disco mecânico, um SSD pode trazer ganho grande sem exigir computador novo. Antes da migração, porém, verificamos saúde do disco de origem e espaço usado para saber se a clonagem é segura ou se uma instalação limpa é mais adequada.",
    ],
    logisticaLocal: [
      "Serviços de rede precisam ser avaliados onde o problema acontece. Já ajustes de Windows, navegador e programas podem começar remotamente quando a conexão está estável.",
    ],
    operacaoLocal: [
      "Triagem do padrão de lentidão, travamento ou desligamento",
      "Teste de rede antes de sugerir repetidor ou equipamento novo",
      "Verificação da saúde do armazenamento antes de migrar para SSD",
      "Valor e escopo aprovados antes da execução",
    ],
    atendimentoLocal: [
      "PC lento ou travando",
      "Wi‑Fi com cobertura irregular",
      "Remoção de programas indesejados",
      "Formatação com backup",
    ],
    coletaBancada: [
      "Upgrade de SSD e memória",
      "Limpeza interna de notebook",
      "Falhas de energia, placa ou armazenamento",
    ],
    publicoAtendido: [
      "Residências com desktop de uso prolongado",
      "Home office que depende de Wi‑Fi estável",
      "Pequenos negócios com computador de uso diário",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-computador",
      "/servicos/upgrade-ssd-ram",
      "/servicos/redes-e-wifi",
      "/servicos/formatacao",
    ],
    problemasRelacionados: [
      { to: "/problemas/computador-lento", label: "PC lento", desc: "O que medir antes de decidir entre software, SSD ou RAM." },
      { to: "/problemas/computador-desliga-sozinho", label: "PC desliga sozinho", desc: "Energia, temperatura e estabilidade: como separar as causas." },
      { to: "/problemas/wifi-instavel", label: "Wi‑Fi instável", desc: "Teste de link, sinal e cobertura antes de comprar repetidor." },
    ],
    faqLocal: [
      { question: "Computador lento no Hauer sempre precisa de SSD?", answer: "Não. SSD ajuda quando o armazenamento é o gargalo, mas memória, temperatura e software também podem causar lentidão. O diagnóstico vem antes da compra." },
      { question: "Vocês ajustam Wi‑Fi?", answer: "Sim. A avaliação verifica sinal, posicionamento, interferência e conexão por cabo antes de indicar troca de roteador, mesh ou repetidor." },
      { question: "É possível migrar para SSD sem perder o Windows?", answer: "Em muitos casos, sim, por clonagem. A decisão depende da saúde do disco antigo e do espaço utilizado." },
      { question: "Quando o equipamento precisa ir para bancada?", answer: "Quando há desmontagem, troca de componente, falha física ou necessidade de teste prolongado." },
    ],
  },

  "novo-mundo": {
    slug: "novo-mundo",
    nome: "Novo Mundo",
    nomeLocativo: "no Novo Mundo",
    cidade: "Curitiba",
    areaName: "Novo Mundo, Curitiba",
    metaTitle: "Informática no Novo Mundo | PC, notebook, backup e rede",
    metaDescription:
      "Atendimento de informática no Novo Mundo, Curitiba: PC e notebook, backup, Wi‑Fi, SSD, formatação e diagnóstico de falhas.",
    h1: "Técnico de informática no Novo Mundo – Curitiba",
    subtitulo:
      "Suporte para computador de casa, estudo e trabalho com foco em preservar dados e resolver a causa do problema.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Novo Mundo, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "No Novo Mundo, o mesmo computador pode concentrar documentos da família, arquivos de trabalho e contas pessoais. Quando o sistema fica lento ou deixa de iniciar, a prioridade técnica é descobrir o estado dos dados antes de formatar. Um reparo rápido que ignora o armazenamento pode transformar lentidão em perda de arquivo.",
      "Por isso a triagem pergunta o que mudou antes do defeito, se existem ruídos ou mensagens, se o equipamento ainda reconhece o disco e onde está o backup. Só depois definimos se o caso é software, armazenamento, memória, temperatura ou energia.",
    ],
    contextoLocal: [
      "Quando o Windows não inicia, há diferença entre máquina sem energia, máquina com vídeo mas sem sistema e erro de boot. Cada cenário pede testes diferentes e evita a sequência comum de 'formatar para ver se resolve'.",
      "Em rede doméstica, também é importante separar internet lenta de Wi‑Fi fraco. Um teste por cabo perto do roteador e medições simples de sinal ajudam a descobrir onde está a limitação.",
    ],
    logisticaLocal: [
      "Casos com risco de perda de dados podem exigir coleta para copiar ou testar o armazenamento com mais segurança. Configuração e software podem começar remotamente quando o sistema ainda funciona.",
    ],
    operacaoLocal: [
      "Checagem de dados e backup antes de reinstalar",
      "Separação entre falha de boot, vídeo e energia",
      "Teste de rede antes de sugerir equipamentos",
      "Aprovação do serviço antes da execução",
    ],
    atendimentoLocal: [
      "Windows lento ou que não inicia corretamente",
      "Wi‑Fi com sinal fraco em parte da casa",
      "Organização de backup e armazenamento",
      "Remoção de malware e programas indesejados",
    ],
    coletaBancada: [
      "Disco com falha ou arquivos em risco",
      "Upgrade de SSD e memória",
      "Notebook com problema físico de tela, teclado ou energia",
    ],
    publicoAtendido: [
      "Famílias com arquivos concentrados em um único computador",
      "Estudantes e profissionais em home office",
      "Pequenos negócios que precisam manter documentos e sistemas disponíveis",
    ],
    servicosPrioritarios: [
      "/servicos/recuperacao-de-dados",
      "/servicos/manutencao-de-computador",
      "/servicos/formatacao",
      "/servicos/redes-e-wifi",
    ],
    problemasRelacionados: [
      { to: "/problemas/windows-nao-inicia", label: "Windows não inicia", desc: "Como diferenciar boot, vídeo e energia." },
      { to: "/problemas/hd-fazendo-barulho", label: "HD fazendo barulho", desc: "Quando parar de usar e priorizar os dados." },
      { to: "/problemas/wifi-instavel", label: "Wi‑Fi instável", desc: "Como separar cobertura interna de falha do provedor." },
    ],
    faqLocal: [
      { question: "Se o Windows não inicia, precisa formatar?", answer: "Não necessariamente. Primeiro identificamos se o problema é boot, armazenamento, atualização ou outro componente. Formatação é uma das opções, não o primeiro teste." },
      { question: "Fazem backup antes do serviço?", answer: "Quando houver dados importantes e a mídia permitir leitura, a preservação é combinada antes de qualquer reinstalação." },
      { question: "Meu Wi‑Fi é ruim só em um cômodo. Troco o plano?", answer: "Não é a primeira medida. Se o link funciona perto do roteador, o problema pode ser cobertura ou interferência dentro do imóvel." },
      { question: "Quando é melhor trocar o computador?", answer: "Depois de comparar estado geral, possibilidade de upgrade e custo do reparo. Em algumas máquinas SSD e memória ainda trazem boa sobrevida; em outras, a substituição faz mais sentido." },
    ],
  },

  bacacheri: {
    slug: "bacacheri",
    nome: "Bacacheri",
    nomeLocativo: "no Bacacheri",
    cidade: "Curitiba",
    areaName: "Bacacheri, Curitiba",
    metaTitle: "Técnico de informática no Bacacheri | Notebook, Wi‑Fi e PC",
    metaDescription:
      "Técnico de informática no Bacacheri, Curitiba: notebook, PC, Wi‑Fi, SSD, backup e formatação com diagnóstico antes da troca de peças.",
    h1: "Técnico de informática no Bacacheri – Curitiba",
    subtitulo:
      "Atendimento para notebook, computador e rede com diagnóstico orientado pelo sintoma e pelo uso real do equipamento.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no Bacacheri, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "No Bacacheri, o cenário de suporte costuma misturar notebook de trabalho, computador familiar e rede sem fio atendendo vários dispositivos ao mesmo tempo. Quando tudo parece 'lento', é importante separar desempenho do computador de qualidade da conexão para não corrigir o problema errado.",
      "A triagem usa perguntas simples: a lentidão aparece offline? O disco fica em uso constante? O Wi‑Fi cai em todos os aparelhos ou só em um? O notebook esquenta antes de travar? Essas respostas direcionam o diagnóstico sem substituir componente por tentativa.",
    ],
    contextoLocal: [
      "Em notebooks, aquecimento e bateria degradada podem coexistir com lentidão de sistema. Limpeza interna só faz sentido quando há evidência de temperatura ou obstrução; formatação não corrige ventoinha, pasta térmica ou bateria.",
      "Na rede, testar outro dispositivo e comparar Wi‑Fi com cabo ajuda a descobrir se a falha está no computador, no roteador ou no link. Esse passo evita compra desnecessária de repetidor.",
    ],
    logisticaLocal: [
      "O atendimento remoto é útil quando o sistema liga e a rede está estável. Quando a causa depende de hardware ou do ambiente de Wi‑Fi, o diagnóstico precisa acontecer presencialmente ou em bancada.",
    ],
    operacaoLocal: [
      "Triagem separando desempenho, temperatura e conectividade",
      "Teste antes de indicar SSD, memória ou equipamento de rede",
      "Backup combinado antes de reinstalar",
      "Escopo e valor aprovados previamente",
    ],
    atendimentoLocal: [
      "Notebook lento ou aquecendo",
      "Computador familiar com muitos programas",
      "Wi‑Fi com quedas ou baixa cobertura",
      "Formatação e organização do sistema",
    ],
    coletaBancada: [
      "Limpeza interna e revisão térmica",
      "Troca de SSD, memória, tela ou teclado",
      "Diagnóstico de placa e energia",
    ],
    publicoAtendido: [
      "Home office com notebook e videoconferência",
      "Famílias com vários dispositivos na mesma rede",
      "Usuários de PC e notebook de uso diário",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-notebook",
      "/servicos/redes-e-wifi",
      "/servicos/upgrade-ssd-ram",
      "/servicos/formatacao",
    ],
    problemasRelacionados: [
      { to: "/problemas/computador-esquentando", label: "Computador esquentando", desc: "Temperatura, ventilação e carga: o que observar." },
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como localizar o gargalo antes de comprar peça." },
      { to: "/problemas/wifi-instavel", label: "Wi‑Fi instável", desc: "Diagnóstico por aparelho, cabo e cobertura." },
    ],
    faqLocal: [
      { question: "Notebook esquentando precisa formatar?", answer: "Não. Temperatura é investigada por ventilação, ventoinha, dissipador e carga. Formatação só é considerada se houver também problema de sistema." },
      { question: "SSD resolve qualquer lentidão?", answer: "Não. Ele resolve gargalo de armazenamento, mas memória, temperatura e software também podem limitar desempenho." },
      { question: "Atendem problema de Wi‑Fi no Bacacheri?", answer: "Sim. O diagnóstico compara dispositivos, sinal e conexão por cabo antes de recomendar equipamento novo." },
      { question: "Posso acompanhar a triagem pelo WhatsApp?", answer: "Sim. A primeira etapa é descrever equipamento, sintoma e quando começou; isso ajuda a definir a modalidade mais adequada." },
    ],
  },

  juveve: {
    slug: "juveve",
    nome: "Juvevê",
    nomeLocativo: "no Juvevê",
    cidade: "Curitiba",
    areaName: "Juvevê, Curitiba",
    metaTitle: "Técnico de informática no Juvevê | Home office e escritório",
    metaDescription:
      "Informática no Juvevê, Curitiba: notebook, PC, impressora, Wi‑Fi, backup e suporte para home office e pequenos escritórios.",
    h1: "Técnico de informática no Juvevê – Curitiba",
    subtitulo:
      "Suporte técnico para quem depende de notebook, impressora e rede no trabalho diário.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Juvevê, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "No Juvevê, um problema pequeno de tecnologia pode parar uma rotina inteira quando notebook, impressora, videochamada e arquivos em nuvem dependem uns dos outros. Por isso o atendimento começa mapeando a cadeia: qual equipamento falhou, o que ainda funciona e qual atividade precisa voltar primeiro.",
      "Esse mapa evita conclusões apressadas. Uma impressora offline pode ser rede; uma videochamada travando pode ser Wi‑Fi e não notebook; um sistema lento pode estar preso em armazenamento. Cada hipótese é testada antes da intervenção.",
    ],
    contextoLocal: [
      "Em home office, docks, monitores externos e adaptadores USB‑C também entram no diagnóstico. Tela piscando ou periférico que some pode ser cabo, alimentação, driver ou dock, e não necessariamente placa de vídeo.",
      "Para pequenos escritórios, backup e contas merecem atenção antes de formatar. Reinstalar sem registrar e‑mail, autenticação em duas etapas, VPN e licenças pode gerar mais parada do que o defeito original.",
    ],
    logisticaLocal: [
      "Quando o problema é de software e a máquina conecta, o suporte remoto pode reduzir a interrupção. Rede, impressora e hardware dependem do ambiente ou de bancada.",
    ],
    operacaoLocal: [
      "Mapeamento da rotina antes da intervenção",
      "Teste de periféricos e rede antes de culpar o computador",
      "Registro de acessos e backup antes de reinstalar",
      "Aprovação do escopo antes do serviço",
    ],
    atendimentoLocal: [
      "Notebook de home office lento",
      "Impressora em rede que para de responder",
      "Dock, monitor e periféricos com falha de detecção",
      "Wi‑Fi instável em reunião online",
    ],
    coletaBancada: [
      "Problema físico de notebook",
      "Troca de armazenamento ou memória",
      "Teste prolongado de hardware",
    ],
    publicoAtendido: [
      "Profissionais em home office",
      "Pequenos escritórios e consultórios",
      "Residências com vários periféricos conectados",
    ],
    servicosPrioritarios: [
      "/servicos/suporte-home-office",
      "/servicos/redes-e-wifi",
      "/servicos/manutencao-de-notebook",
      "/servicos/backup-para-empresas",
    ],
    problemasRelacionados: [
      { to: "/problemas/impressora-nao-imprime", label: "Impressora não imprime", desc: "Rede, fila e driver: onde procurar primeiro." },
      { to: "/problemas/wifi-instavel", label: "Wi‑Fi instável", desc: "Como testar a rede antes da reunião." },
      { to: "/problemas/computador-lento", label: "Notebook lento", desc: "Armazenamento, memória e inicialização." },
    ],
    faqLocal: [
      { question: "Dá para atender home office remotamente?", answer: "Quando o computador liga e a conexão está estável, vários ajustes de sistema, navegador, aplicativos e contas podem ser feitos remotamente." },
      { question: "Impressora offline é defeito da impressora?", answer: "Nem sempre. Endereço de rede, fila, driver e roteador podem causar o mesmo sintoma." },
      { question: "Vocês ajudam com monitor externo e dock?", answer: "Sim. O diagnóstico verifica cabo, alimentação, driver, porta e o próprio dock antes de concluir defeito do notebook." },
      { question: "Formatar pode apagar VPN e programas da empresa?", answer: "Pode. Por isso mapeamos o ambiente antes de reinstalar e combinamos o que precisa ser recuperado depois." },
    ],
  },

  merces: {
    slug: "merces",
    nome: "Mercês",
    nomeLocativo: "nas Mercês",
    cidade: "Curitiba",
    areaName: "Mercês, Curitiba",
    metaTitle: "Técnico de informática nas Mercês | Backup, notebook e Wi‑Fi",
    metaDescription:
      "Atendimento de informática nas Mercês, Curitiba: notebook, PC, backup, Wi‑Fi, SSD, formatação e diagnóstico de falhas.",
    h1: "Técnico de informática nas Mercês – Curitiba",
    subtitulo:
      "Suporte para computador, notebook e rede com prioridade à preservação dos dados e ao diagnóstico correto.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática nas Mercês, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "Nas Mercês, a decisão técnica mais importante em muitos atendimentos é simples: proteger os arquivos antes de acelerar o computador. Quando uma máquina antiga começa a travar, o disco pode estar apenas lento ou pode estar degradando; as duas situações parecem iguais para quem usa, mas exigem caminhos muito diferentes.",
      "A triagem pergunta onde estão documentos e fotos, se existe cópia em nuvem ou mídia externa, se o disco faz ruído e se o Windows ainda inicia. Com isso, definimos se a prioridade é backup, diagnóstico de armazenamento, ajuste de sistema ou upgrade.",
    ],
    contextoLocal: [
      "Em notebook, a bateria também pode influenciar a rotina mesmo quando o equipamento funciona ligado à tomada. Uma bateria inchada, por exemplo, não é apenas perda de autonomia e precisa de avaliação física.",
      "Na rede residencial, quedas em pontos específicos pedem medição de cobertura antes de qualquer compra. Repetidor mal posicionado pode aumentar a frustração sem melhorar a conexão.",
    ],
    logisticaLocal: [
      "Quando existe risco ao armazenamento, a máquina pode seguir para bancada para leitura e cópia com menos intervenções. Ajustes de sistema e organização de backup podem começar remotamente.",
    ],
    operacaoLocal: [
      "Prioridade aos dados antes de formatar ou trocar disco",
      "Avaliação de bateria e temperatura em notebook",
      "Teste de cobertura antes de mudar a rede",
      "Serviço executado somente após aprovação",
    ],
    atendimentoLocal: [
      "Computador lento com arquivos importantes",
      "Organização de backup",
      "Wi‑Fi irregular dentro da residência",
      "Limpeza de sistema e programas indesejados",
    ],
    coletaBancada: [
      "Disco com sinais de falha",
      "Bateria, teclado ou tela de notebook",
      "Upgrade de SSD e memória",
    ],
    publicoAtendido: [
      "Famílias com fotos e documentos no computador",
      "Profissionais que trabalham de notebook",
      "Usuários que querem organizar backup antes de trocar equipamento",
    ],
    servicosPrioritarios: [
      "/servicos/backup-para-empresas",
      "/servicos/recuperacao-de-dados",
      "/servicos/manutencao-de-notebook",
      "/servicos/redes-e-wifi",
    ],
    problemasRelacionados: [
      { to: "/problemas/hd-fazendo-barulho", label: "HD fazendo barulho", desc: "Sinais para interromper o uso e priorizar dados." },
      { to: "/problemas/arquivos-apagados", label: "Arquivos apagados", desc: "O que evitar antes de tentar recuperação." },
      { to: "/problemas/wifi-instavel", label: "Wi‑Fi instável", desc: "Cobertura, interferência e teste por cabo." },
    ],
    faqLocal: [
      { question: "Meu computador está lento e tem arquivos importantes. O que fazer primeiro?", answer: "Primeiro verifique a situação dos dados e do armazenamento. Se houver indício de falha, a prioridade é preservar o que ainda pode ser lido." },
      { question: "Vocês organizam backup?", answer: "Sim. O objetivo é definir o que precisa de cópia, onde ela fica e como conferir se a restauração funciona." },
      { question: "Bateria ruim de notebook é só perda de autonomia?", answer: "Nem sempre. Bateria deformada ou inchada exige avaliação física e não deve continuar pressionando a carcaça." },
      { question: "Repetidor é sempre a melhor solução para Wi‑Fi?", answer: "Não. A indicação depende de onde o sinal ainda é bom e da estrutura do ambiente." },
    ],
  },

  "parque-da-fonte": {
    slug: "parque-da-fonte",
    nome: "Parque da Fonte",
    nomeLocativo: "no Parque da Fonte",
    cidade: "São José dos Pinhais",
    areaName: "Parque da Fonte, São José dos Pinhais",
    metaTitle: "Técnico de informática no Parque da Fonte | SJP",
    metaDescription:
      "Informática no Parque da Fonte, São José dos Pinhais: notebook, PC, Wi‑Fi, SSD, backup e formatação com triagem pelo WhatsApp.",
    h1: "Técnico de informática no Parque da Fonte – São José dos Pinhais",
    subtitulo:
      "Atendimento para computador, notebook e rede com escolha da modalidade depois da triagem.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Parque da Fonte, em São José dos Pinhais. Pode me orientar?",
    introducaoLocal: [
      "No Parque da Fonte, o suporte de informática pode começar por um notebook de trabalho, um computador familiar ou pela rede que conecta todos os dispositivos da casa. Antes de deslocar equipamento, a triagem identifica se a causa está no sistema, no hardware ou no ambiente.",
      "Quando o computador liga e conecta, ajustes de software podem ser avaliados remotamente. Wi‑Fi, impressora e cabeamento precisam ser observados no local; troca de componentes e falhas físicas podem seguir para bancada.",
    ],
    contextoLocal: [
      "Para notebook lento, verificamos armazenamento, memória, temperatura e programas de inicialização antes de falar em upgrade. Isso diferencia uma máquina que precisa de SSD de outra que só precisa de organização do sistema.",
      "Na rede, comparar o desempenho perto do roteador e no ponto de uso ajuda a separar problema do provedor de problema de cobertura interna.",
    ],
    logisticaLocal: [
      "A modalidade é combinada de acordo com o sintoma: remoto para software quando possível, visita para ambiente e bancada para desmontagem ou teste prolongado.",
    ],
    operacaoLocal: [
      "Triagem antes do deslocamento",
      "Teste de desempenho antes de indicar upgrade",
      "Backup conferido antes de reinstalar",
      "Valor aprovado antes da execução",
    ],
    atendimentoLocal: [
      "Notebook lento",
      "PC doméstico travando",
      "Wi‑Fi com cobertura irregular",
      "Formatação e organização do sistema",
    ],
    coletaBancada: [
      "Upgrade de SSD e memória",
      "Limpeza interna de notebook",
      "Falhas físicas de tela, teclado ou energia",
    ],
    publicoAtendido: [
      "Famílias com computador compartilhado",
      "Home office",
      "Pequenos negócios operados com poucos equipamentos",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-notebook",
      "/servicos/manutencao-de-computador",
      "/servicos/redes-e-wifi",
      "/servicos/formatacao",
    ],
    problemasRelacionados: [
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "SSD, memória ou sistema: como diferenciar." },
      { to: "/problemas/wifi-instavel", label: "Wi‑Fi instável", desc: "O teste que separa link de cobertura." },
      { to: "/problemas/notebook-nao-carrega", label: "Notebook não carrega", desc: "Fonte, conector, bateria e placa." },
    ],
    faqLocal: [
      { question: "O atendimento no Parque da Fonte pode ser remoto?", answer: "Quando o equipamento liga e mantém internet, vários problemas de software podem começar remotamente." },
      { question: "Notebook lento sempre precisa formatar?", answer: "Não. Armazenamento, memória, temperatura e inicialização são avaliados antes." },
      { question: "Vocês verificam Wi‑Fi?", answer: "Sim. O teste compara sinal, dispositivos e conexão por cabo antes de indicar equipamento novo." },
      { question: "Quando o notebook vai para bancada?", answer: "Quando o caso exige desmontagem, troca de componente ou teste prolongado." },
    ],
  },

  "rio-pequeno-sjp": {
    slug: "rio-pequeno-sjp",
    nome: "Rio Pequeno",
    nomeLocativo: "no Rio Pequeno",
    cidade: "São José dos Pinhais",
    areaName: "Rio Pequeno, São José dos Pinhais",
    metaTitle: "Técnico de informática no Rio Pequeno | São José dos Pinhais",
    metaDescription:
      "Atendimento de informática no Rio Pequeno, SJP: PC, notebook, backup, Wi‑Fi, SSD, formatação e diagnóstico técnico.",
    h1: "Técnico de informática no Rio Pequeno – São José dos Pinhais",
    subtitulo:
      "Suporte para computador de casa, estudo e trabalho com preservação de dados e diagnóstico antes da troca de peças.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Rio Pequeno, em São José dos Pinhais. Pode me orientar?",
    introducaoLocal: [
      "No Rio Pequeno, um computador de uso diário pode acumular anos de arquivos e programas até começar a apresentar lentidão, travamento ou falha de inicialização. Nessa situação, o primeiro passo não é formatar: é conferir armazenamento, dados importantes e o padrão do defeito.",
      "A triagem também ajuda a decidir se o equipamento realmente precisa sair do endereço. Problemas de software podem começar remotamente; rede e periféricos pedem teste no ambiente; hardware físico segue para bancada quando necessário.",
    ],
    contextoLocal: [
      "Quando o disco está degradando, insistir em reinicializações e reinstalações pode reduzir a chance de recuperar arquivos. Ruídos, erros de leitura e desaparecimento do disco mudam a prioridade do atendimento.",
      "Para máquinas apenas antigas, SSD e memória podem ser alternativas à troca completa, desde que placa, tela e demais componentes estejam em estado compatível com o investimento.",
    ],
    logisticaLocal: [
      "Antes de coleta, combinamos o que acompanha o equipamento e qual é o objetivo do teste. Isso evita transportar periféricos desnecessários e mantém o diagnóstico focado.",
    ],
    operacaoLocal: [
      "Checagem dos dados antes de formatar",
      "Avaliação de disco, memória e temperatura",
      "Definição de remoto, visita ou bancada após triagem",
      "Aprovação do valor antes da execução",
    ],
    atendimentoLocal: [
      "PC lento ou com Windows instável",
      "Notebook usado para estudo e trabalho",
      "Backup e organização de arquivos",
      "Wi‑Fi e periféricos",
    ],
    coletaBancada: [
      "Disco com falha",
      "Upgrade de SSD e memória",
      "Problema físico de notebook",
    ],
    publicoAtendido: [
      "Famílias com arquivos importantes no computador",
      "Estudantes e profissionais",
      "Pequenos negócios com um ou poucos computadores",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-computador",
      "/servicos/recuperacao-de-dados",
      "/servicos/upgrade-ssd-ram",
      "/servicos/formatacao",
    ],
    problemasRelacionados: [
      { to: "/problemas/windows-nao-inicia", label: "Windows não inicia", desc: "Boot, disco e atualização: como separar." },
      { to: "/problemas/hd-fazendo-barulho", label: "HD fazendo barulho", desc: "Quando interromper o uso." },
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "O que medir antes de trocar peça." },
    ],
    faqLocal: [
      { question: "Computador antigo ainda compensa consertar?", answer: "Depende do estado geral e do custo do reparo. SSD e memória podem ajudar bastante, mas nem toda máquina justifica investimento." },
      { question: "Se o HD está com problema, posso formatar?", answer: "Não é o primeiro passo. Se há dados importantes, a prioridade é avaliar a mídia e preservar o que ainda pode ser lido." },
      { question: "O atendimento pode começar pelo WhatsApp?", answer: "Sim. Equipamento, sintoma, quando começou e se existem dados importantes já ajudam a escolher os próximos testes." },
      { question: "Fazem backup?", answer: "Sim, quando a mídia permite leitura e o escopo é combinado antes do serviço." },
    ],
  },

  "quississana-sjp": {
    slug: "quississana-sjp",
    nome: "Quississana",
    nomeLocativo: "no Quississana",
    cidade: "São José dos Pinhais",
    areaName: "Quississana, São José dos Pinhais",
    metaTitle: "Técnico de informática no Quississana | SJP",
    metaDescription:
      "Informática no Quississana, São José dos Pinhais: notebook, PC, Wi‑Fi, formatação, SSD e backup com diagnóstico antes do serviço.",
    h1: "Técnico de informática no Quississana – São José dos Pinhais",
    subtitulo:
      "Suporte para computador, notebook e conectividade com triagem antes de qualquer troca de componente.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Quississana, em São José dos Pinhais. Pode me orientar?",
    introducaoLocal: [
      "No Quississana, problemas de informática podem envolver tanto o computador quanto a rede usada por celulares, TV e notebook. Quando a internet parece ruim em apenas parte do imóvel, o diagnóstico precisa observar cobertura e interferência antes de culpar o provedor ou o aparelho.",
      "Em computador e notebook, a mesma regra vale: sintoma primeiro, peça depois. Lentidão, tela azul, aquecimento e falha de inicialização têm causas diferentes e não devem receber a mesma solução.",
    ],
    contextoLocal: [
      "Para Wi‑Fi, testamos perto do roteador, no ponto onde ocorre a falha e, quando possível, por cabo. Isso mostra se o limite está no link ou na distribuição interna.",
      "Para notebook, verificamos disco, memória, temperatura e bateria de acordo com o sintoma, evitando formatar quando a causa é física.",
    ],
    logisticaLocal: [
      "Rede e periféricos são avaliados no ambiente; software pode começar remotamente; hardware que exige desmontagem segue para bancada.",
    ],
    operacaoLocal: [
      "Teste da rede antes de indicar repetidor ou mesh",
      "Diagnóstico do computador baseado no sintoma",
      "Backup antes de reinstalar quando necessário",
      "Valor aprovado antes de executar",
    ],
    atendimentoLocal: [
      "Wi‑Fi com quedas",
      "PC lento",
      "Notebook aquecendo",
      "Formatação e remoção de programas indesejados",
    ],
    coletaBancada: [
      "Limpeza interna",
      "Troca de SSD, memória, tela ou teclado",
      "Falhas físicas e testes prolongados",
    ],
    publicoAtendido: [
      "Residências com vários dispositivos",
      "Home office",
      "Usuários de notebook e PC de uso diário",
    ],
    servicosPrioritarios: [
      "/servicos/redes-e-wifi",
      "/servicos/manutencao-de-notebook",
      "/servicos/manutencao-de-computador",
      "/servicos/formatacao",
    ],
    problemasRelacionados: [
      { to: "/problemas/wifi-instavel", label: "Wi‑Fi instável", desc: "Como testar cobertura e link." },
      { to: "/problemas/computador-esquentando", label: "Notebook aquecendo", desc: "Temperatura, ventilação e carga." },
      { to: "/problemas/tela-azul", label: "Tela azul", desc: "Memória, driver, armazenamento e sistema." },
    ],
    faqLocal: [
      { question: "Wi‑Fi ruim significa plano de internet fraco?", answer: "Não necessariamente. Se o link está bom perto do roteador, a limitação pode ser cobertura interna." },
      { question: "Notebook aquecendo precisa de limpeza?", answer: "Às vezes, mas primeiro é preciso observar temperatura, ventilação e comportamento sob carga." },
      { question: "Tela azul exige formatação?", answer: "Não automaticamente. Memória, driver, armazenamento e atualização podem gerar o mesmo sintoma." },
      { question: "Como escolher entre visita e bancada?", answer: "Problemas do ambiente pedem visita; desmontagem e teste físico normalmente pedem bancada." },
    ],
  },

  "pedro-moro-sjp": {
    slug: "pedro-moro-sjp",
    nome: "Pedro Moro",
    nomeLocativo: "no Pedro Moro",
    cidade: "São José dos Pinhais",
    areaName: "Pedro Moro, São José dos Pinhais",
    metaTitle: "Técnico de informática no Pedro Moro | PC e notebook em SJP",
    metaDescription:
      "Atendimento de informática no Pedro Moro, SJP: PC, notebook, impressora, Wi‑Fi, backup, SSD e formatação com triagem técnica.",
    h1: "Técnico de informática no Pedro Moro – São José dos Pinhais",
    subtitulo:
      "Atendimento para computador, notebook e periféricos com foco em reduzir tentativa e preservar configurações importantes.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Pedro Moro, em São José dos Pinhais. Pode me orientar?",
    introducaoLocal: [
      "No Pedro Moro, o suporte pode envolver desde um computador familiar até uma estação usada para atendimento, emissão de documentos ou trabalho remoto. Antes de mexer, identificamos quais programas, impressoras e arquivos fazem parte daquela rotina para não resolver o defeito criando outro problema depois.",
      "A triagem separa o que pode ser corrigido por software, o que depende de rede ou periférico e o que exige desmontagem. Essa divisão reduz deslocamentos desnecessários e ajuda a informar o escopo antes da execução.",
    ],
    contextoLocal: [
      "Impressora que para de responder depois de troca de roteador pode estar apenas com endereço diferente na rede. Já computador que congela sob carga pode envolver memória, disco, temperatura ou fonte. Os testes mudam conforme o padrão.",
      "Quando é preciso reinstalar Windows, registramos contas, programas essenciais e arquivos antes. O objetivo não é apenas fazer a máquina iniciar: é devolver o ambiente utilizável.",
    ],
    logisticaLocal: [
      "Configuração e software podem começar remotamente; rede e impressora são avaliadas no ambiente; hardware segue para bancada quando a desmontagem é necessária.",
    ],
    operacaoLocal: [
      "Mapeamento de programas, arquivos e periféricos importantes",
      "Diagnóstico antes de formatar ou trocar componente",
      "Preservação de configuração quando possível",
      "Valor e escopo aprovados antes do serviço",
    ],
    atendimentoLocal: [
      "PC de uso diário travando",
      "Impressora fora da rede",
      "Wi‑Fi e roteador",
      "Formatação com backup",
    ],
    coletaBancada: [
      "Notebook com falha física",
      "Upgrade de SSD e memória",
      "Teste de fonte, placa e armazenamento",
    ],
    publicoAtendido: [
      "Residências com computador compartilhado",
      "Profissionais em home office",
      "Pequenos negócios com impressora e PC de atendimento",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-computador",
      "/servicos/manutencao-de-notebook",
      "/servicos/redes-e-wifi",
      "/servicos/formatacao",
    ],
    problemasRelacionados: [
      { to: "/problemas/impressora-nao-imprime", label: "Impressora não imprime", desc: "Rede, fila e driver." },
      { to: "/problemas/computador-desliga-sozinho", label: "PC desliga sozinho", desc: "Energia, temperatura e estabilidade." },
      { to: "/problemas/computador-lento", label: "PC lento", desc: "Armazenamento, memória e sistema." },
    ],
    faqLocal: [
      { question: "Vocês ajudam com impressora no Pedro Moro?", answer: "Sim. A análise verifica rede, endereço, fila e driver antes de concluir defeito físico." },
      { question: "Formatação mantém meus programas?", answer: "Reinstalação remove programas. Antes do serviço, registramos o que é essencial e combinamos o que será reinstalado." },
      { question: "PC desligando sozinho pode ser fonte?", answer: "Pode, mas temperatura, tomada, placa e outros fatores também entram no diagnóstico." },
      { question: "Dá para resolver por acesso remoto?", answer: "Quando o computador liga, conecta e o problema é de software, sim. Hardware e ambiente exigem outra modalidade." },
    ],
  },
};
