// ─────────────────────────────────────────────────────────────
// BAIRROS CURADOS DE CURITIBA — 5 landings hiperlocais indexáveis.
// Conteúdo próprio por bairro, sem endereço/unidade física inventada,
// sem tempo de deslocamento prometido, sem avaliação inventada.
// Rota canônica: /bairros/<slug> (self-referente). Página-mãe:
// /tecnico-informatica-curitiba.
// ─────────────────────────────────────────────────────────────

import { SERVICOS_CANONICOS } from "@/lib/cidadesData";
import { BAIRROS_LOTE_2 } from "@/lib/bairrosLote2";
import { BAIRROS_LOTE_3 } from "@/lib/bairrosLote3";
import { BAIRROS_LOTE_4 } from "@/lib/bairrosLote4";
import { BAIRROS_LOTE_5 } from "@/lib/bairrosLote5";


export interface BairroFaq {
  question: string;
  answer: string;
}

export interface BairroLocalData {
  slug: string;
  /** Nome curto do bairro (CIC, Batel, Água Verde, Centro, Portão) */
  nome: string;
  /** Nome locativo para uso em frase: "no CIC", "no Centro de Curitiba" */
  nomeLocativo: string;
  cidade: string;
  /** Nome usado no areaServed do schema */
  areaName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitulo: string;
  /** Mensagem pré-preenchida do WhatsApp (inclui bairro + Curitiba) */
  whatsappMessage: string;
  /** Introdução local — parágrafos distintos por bairro */
  introducaoLocal: string[];
  /** Contexto técnico do bairro — parágrafos autorais, sem promessa nova */
  contextoLocal?: string[];
  /** Logística e acesso reais da localidade (conteúdo autoral) */
  logisticaLocal?: string[];
  /** Como a triagem e a operação funcionam naquele bairro */
  operacaoLocal: string[];
  /** Quando o atendimento no local pode ser indicado */
  atendimentoLocal: string[];
  /** Quando pode ser necessária coleta ou bancada */
  coletaBancada: string[];
  /** Públicos atendidos naquele recorte local (Rodada 5E, opcional) */
  publicoAtendido?: string[];
  /** Serviços prioritários — paths das 8 rotas curadas de /servicos */
  servicosPrioritarios: string[];
  /**
   * Landings serviço × cidade promovidas pela política local. O bairro aponta
   * para elas quando a intenção local for semanticamente melhor que o pai global.
   */
  servicosCidade?: { to: string; label: string; desc: string }[];
  /** Páginas de sintoma (/problemas/*) contextualmente pertinentes ao bairro */
  problemasRelacionados?: { to: string; label: string; desc: string }[];
  /**
   * Ponte editorial (Micro-Rodada Discovery 1): uma frase de continuidade real
   * ao fim da logística local, com um único link contextual para a página
   * serviço × bairro correspondente. Não é bloco de links: é texto corrido.
   */
  ponteLocal?: { antes: string; to: string; anchor: string; depois: string };
  /** FAQ local visível (espelhada em FAQPage) — distinta entre bairros */

  faqLocal: BairroFaq[];
}

// Resolve um path de /servicos para o item canônico (label + desc).
export function servicoByPath(to: string) {
  return SERVICOS_CANONICOS.find((s) => s.to === to);
}

export const BAIRROS: Record<string, BairroLocalData> = {
  // ── CIC ─────────────────────────────────────────────────────
  cic: {
    slug: "cic",
    nome: "CIC",
    nomeLocativo: "no CIC",
    cidade: "Curitiba",
    areaName: "Cidade Industrial de Curitiba (CIC)",
    metaTitle: "Técnico de Informática no CIC (Curitiba) | Notebook e PC",
    metaDescription:
      "Técnico de informática no CIC, Curitiba: conserto de notebook, manutenção de computador, formatação e suporte para empresas. Diagnóstico a partir de R$ 99,99.",
    h1: "Técnico de Informática no CIC – Curitiba",
    subtitulo:
      "Atendimento para residências e empresas no maior bairro de Curitiba, começando por triagem no WhatsApp e diagnóstico antes de informar o valor.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no CIC, em Curitiba. Pode me orientar?",
    contextoLocal: [
      "A CIC concentra galpões, pequenas fábricas e prestadores que trabalham com computadores ligados o dia inteiro, muitas vezes em ambientes com mais poeira em suspensão do que um escritório comum. Isso muda o padrão de defeito: dissipador saturado, ventoinha ruidosa, desligamento por temperatura e fonte que começa a falhar sob carga aparecem com mais frequência do que problemas puramente de software. Em máquinas assim, limpeza interna com troca de pasta térmica e teste de alimentação costumam ser verificados antes de qualquer formatação.",
      "Na parte residencial do bairro, a demanda é outra: notebook de estudo e trabalho remoto, computador de família com disco mecânico antigo e roteador posicionado longe dos cômodos onde o sinal é usado. Nesses casos, o ganho real quase sempre vem de três frentes — troca para SSD, reinstalação limpa do sistema com backup conferido antes e reposicionamento ou substituição do roteador. A triagem por WhatsApp serve justamente para separar qual dos dois cenários é o seu antes de deslocar equipe ou equipamento.",
    ],
    logisticaLocal: [
      "Deslocamento até a CIC é planejado por janela: as vias que cortam o bairro concentram caminhão e ônibus em horário de pico, e chegar às 8h ou depois das 14h costuma render mais tempo de bancada no local do que sair no meio da manhã. Quando o chamado é de empresa, combinamos o horário com quem opera a máquina, para que o equipamento esteja livre e o técnico não fique esperando a liberação do posto de trabalho.",
      "Em galpão e área industrial, a coleta é a modalidade mais frequente: o ambiente raramente tem bancada limpa, tomada estável e espaço para abrir um gabinete com segurança. Nesses casos retiramos o equipamento, executamos o serviço em bancada e devolvemos no mesmo endereço, com a peça substituída disponível para conferência na entrega. Para máquinas críticas de produção, a orientação é sempre programar a retirada fora do turno.",
      "Para chamados de empresa na CIC, o registro do atendimento inclui identificação da máquina, setor, sintoma relatado e o que foi efetivamente executado, de modo que o histórico fique com o cliente e não apenas com o técnico. Isso importa em ambiente industrial, onde o mesmo equipamento passa por turnos e operadores diferentes e a informação se perde entre um chamado e outro.",
    ],
    introducaoLocal: [
      "A Cidade Industrial de Curitiba (CIC) é o maior bairro da capital em extensão, com um perfil que mistura indústrias, comércios e muitas residências. Isso gera dois tipos de demanda: empresas que dependem de computadores e rede estáveis para não parar a operação e famílias que precisam do notebook do dia a dia funcionando.",
      "O contato começa pelo WhatsApp: você descreve o problema, recebe as primeiras orientações e, se fizer sentido, combinamos a avaliação do equipamento. A modalidade — no local, remoto ou por coleta — é definida conforme o problema, não prometida antes de entender o caso.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp para entender sintoma, uso e urgência",
      "Diagnóstico técnico antes de informar qualquer valor",
      "Valor aprovado por você antes da execução",
      "Manutenção preventiva sugerida para máquinas que rodam o dia inteiro",
    ],
    atendimentoLocal: [
      "Formatação com backup e reinstalação do sistema",
      "Limpeza interna e upgrade de SSD ou memória",
      "Configuração de rede e Wi-Fi em casa ou no comércio",
      "Suporte pontual a estações de trabalho de escritório",
    ],
    coletaBancada: [
      "Reparo de placa-mãe e falhas intermitentes de hardware",
      "Troca de tela ou teclado de notebook",
      "Tentativa de recuperação de dados em HD ou SSD com falha",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-computador",
      "/servicos/manutencao-de-notebook",
      "/servicos/formatacao",
      "/servicos/upgrade-ssd-ram",
      "/servicos/redes-e-wifi",
      "/servicos/suporte-tecnico-empresarial",
    ],
    faqLocal: [
      { question: "Vocês atendem empresas e comércios no CIC?", answer: "Sim. Como o CIC concentra muitas operações, damos suporte pontual ou recorrente sob consulta a estações de trabalho, rede e rotinas de backup. A avaliação começa pelo WhatsApp." },
      { question: "O atendimento no CIC é no local ou por coleta?", answer: "Depende do problema. Casos como formatação, upgrade e configuração de rede costumam ser resolvidos no local; reparos de bancada seguem por coleta e entrega, sempre com sua aprovação." },
      { question: "Quanto custa o diagnóstico no CIC?", answer: "A partir de R$ 99,99 quando aplicável. O valor final depende do equipamento, do deslocamento, da complexidade e de eventuais peças — e nada é executado sem aprovação." },
      { question: "Vale mais a pena consertar ou trocar o computador?", answer: "Em muitos casos, um upgrade de SSD e memória resolve a lentidão por um custo menor que a troca. Avaliamos o equipamento e explicamos com clareza antes de indicar qualquer caminho." },
    ],
  },

  // ── BATEL ───────────────────────────────────────────────────
  batel: {
    slug: "batel",
    nome: "Batel",
    nomeLocativo: "no Batel",
    cidade: "Curitiba",
    areaName: "Batel, Curitiba",
    metaTitle: "Técnico de Informática no Batel (Curitiba) | Notebook e PC",
    metaDescription:
      "Técnico de informática no Batel, Curitiba: conserto de notebook, manutenção de computador, formatação e suporte para home office.",
    h1: "Técnico de Informática no Batel – Curitiba",
    subtitulo:
      "Suporte para residências, home office e pequenos escritórios no Batel, com triagem por WhatsApp e diagnóstico antes de informar o valor.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no Batel, em Curitiba. Pode me orientar?",
    contextoLocal: [
      "O Batel é uma região de escritórios, consultórios, agências e apartamentos, com uso intenso de notebooks, monitores externos, docks e videoconferência. O que mais aparece por aqui não é máquina quebrada, e sim máquina lenta em horário de reunião: disco cheio, dezenas de abas e aplicativos carregando junto com o sistema, além de conflitos entre dock USB-C e drivers de vídeo. Boa parte disso é diagnosticável remotamente, sem parar o expediente.",
      "Prédios comerciais e residenciais verticais também trazem uma questão específica de rede: muitos roteadores concorrendo nos mesmos canais de 2,4 GHz, paredes de concreto e cabeamento antigo até o ponto de trabalho. A avaliação nesses casos mede o sinal onde ele é realmente usado, verifica se o problema está no link, no roteador ou no dispositivo, e só então indica troca de equipamento, ponto adicional ou cabeamento — nunca o contrário.",
    ],
    logisticaLocal: [
      "No Batel a logística é vertical, não horizontal: quase todo atendimento envolve prédio comercial ou residencial com portaria, autorização prévia e elevador de serviço. Por isso pedimos antecipadamente o nome do responsável, o andar e a regra de acesso do condomínio — é o que evita a visita perder trinta minutos na recepção. Estacionamento é limitado, então a janela de agendamento é combinada com folga.",
      "Boa parte dos chamados da região se resolve sem visita. Máquina que liga, conecta na internet e apenas está lenta ou com conflito de dock e vídeo é tratada por acesso remoto, com o usuário acompanhando a tela e sem sair do escritório. Quando a bancada é inevitável — tela, teclado, fonte ou armazenamento — a coleta é feita no próprio prédio, no horário comercial, e a devolução é combinada para não coincidir com reunião ou fechamento.",
      "Em atendimento corporativo no Batel, a máquina costuma ter perfil de domínio, VPN e políticas de segurança da empresa. Nada é alterado nessas configurações sem autorização de quem administra o ambiente: quando o ajuste depende de credencial administrativa do cliente, o passo é documentado e devolvido para aprovação em vez de contornado.",
    ],
    ponteLocal: {
      antes: "Quando o caminho escolhido é reinstalar o sistema em vez de ajustar o que já existe, o passo a passo do backup, das licenças e do tempo de parada está descrito em ",
      to: "/servicos/formatacao-computador/batel",
      anchor: "formatação de computador no Batel",
      depois: ".",
    },
    introducaoLocal: [
      "O Batel reúne muita gente que trabalha em casa e depende do computador o tempo todo. Por isso, os pedidos mais comuns na região envolvem notebook lento ou esquentando, necessidade de formatação com backup e Wi-Fi estável o suficiente para reuniões online.",
      "O atendimento começa por triagem no WhatsApp. A partir da descrição do problema, orientamos os primeiros passos e definimos se o caso pode ser resolvido no local, de forma remota ou se precisa seguir para bancada — sempre com diagnóstico antes de informar o valor.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp com foco em home office e residências",
      "Diagnóstico honesto antes de trocar qualquer peça",
      "Valor aprovado por você antes de executar",
      "Orientação sobre desempenho e estabilidade de rede",
    ],
    atendimentoLocal: [
      "Ajustes de desempenho e formatação com backup",
      "Upgrade de SSD e memória para ganho de velocidade",
      "Configuração de Wi-Fi e melhoria de cobertura em apartamentos",
      "Remoção de vírus e limpeza de programas indesejados",
    ],
    coletaBancada: [
      "Troca de tela, teclado ou bateria de notebook",
      "Reparos internos que exigem estrutura de oficina",
      "Diagnósticos mais longos de hardware instável",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-notebook",
      "/servicos/formatacao",
      "/servicos/upgrade-ssd-ram",
      "/servicos/remocao-de-virus",
      "/servicos/redes-e-wifi",
    ],
    faqLocal: [
      { question: "Fazem suporte para home office no Batel?", answer: "Sim. Ajustamos desempenho, organizamos programas e melhoramos a estabilidade do Wi-Fi para reuniões online. A avaliação do que é necessário é feita após a triagem pelo WhatsApp." },
      { question: "Atendem apartamentos e prédios no Batel?", answer: "Sim, atendemos residências e pequenos escritórios. Em prédios, basta liberar o acesso na portaria no horário combinado. A modalidade depende do tipo de serviço." },
      { question: "Meu notebook está lento — precisa trocar?", answer: "Nem sempre. Muitas vezes um upgrade de SSD e memória, somado a uma limpeza, devolve a agilidade. Avaliamos antes de indicar troca e explicamos o ganho realista." },
      { question: "Qual o valor do atendimento no Batel?", answer: "O diagnóstico começa em R$ 99,99 quando aplicável. O valor final depende do equipamento, da complexidade e de eventuais peças, sempre aprovado por você antes." },
    ],
  },

  // ── ÁGUA VERDE ──────────────────────────────────────────────
  "agua-verde": {
    slug: "agua-verde",
    nome: "Água Verde",
    nomeLocativo: "no Água Verde",
    cidade: "Curitiba",
    areaName: "Água Verde, Curitiba",
    metaTitle: "Técnico de informática no Água Verde | Notebook, PC e Wi‑Fi",
    metaDescription:
      "Técnico de informática no Água Verde, Curitiba: diagnóstico de notebook e PC, Wi‑Fi, SSD, backup e formatação. Triagem antes de trocar peça ou reinstalar.",
    h1: "Técnico de informática no Água Verde – Curitiba",
    subtitulo:
      "Diagnóstico de notebook, computador e rede para decidir entre ajuste remoto, visita e bancada antes de formatar ou comprar peça.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no Água Verde, em Curitiba. Pode me orientar?",
    contextoLocal: [
      "Quando notebook ou computador ficam lentos, o primeiro passo é separar armazenamento, memória, temperatura e software. SSD ou HD degradado, pouca memória e aquecimento podem produzir a mesma sensação de travamento. Medir antes evita formatar uma máquina com falha física ou comprar memória quando o gargalo está em outro componente.",
      "Em apartamento ou escritório, Wi‑Fi instável também exige comparação. Se apenas um computador perde conexão, adaptador, driver e configuração de energia desse dispositivo ganham prioridade. Se vários aparelhos falham no mesmo ponto, posição do roteador, obstáculos, banda utilizada e sobreposição de canais entram na investigação.",
      "Atualização do Windows que termina com impressora offline, webcam sem imagem ou áudio ausente nem sempre significa defeito do periférico. Nesses casos verificamos driver, porta, dispositivo padrão e comunicação antes de substituir equipamento.",
      "Formatação só entra como decisão depois de backup e diagnóstico. Se houver erro de leitura, lentidão extrema de disco ou outros sinais de armazenamento comprometido, a prioridade passa a ser preservar dados antes de reinstalar o sistema.",
    ],
    logisticaLocal: [
      "O Água Verde integra a Regional Fazendinha/Portão de Curitiba. A Administração Regional funciona na Rua Carlos Klemtz, 1700, ao lado do Terminal Fazendinha. Essa referência pública é usada apenas para situar a cobertura; não representa oficina ou unidade física da marca no bairro.",
      "O atendimento é definido pelo tipo de falha. Problemas de configuração, navegador, contas e parte dos erros do Windows podem começar remotamente. Rede do imóvel, cabeamento, impressora no ambiente e equipamentos que precisam ser testados juntos normalmente pedem visita. Falhas físicas, desmontagem e teste prolongado seguem para bancada.",
      "Em condomínio, acesso, portaria e disponibilidade do equipamento são confirmados antes da visita. Não existe promessa fixa de chegada associada ao bairro; agenda e prazo dependem do endereço, modalidade, complexidade e eventual necessidade de peça.",
    ],
    introducaoLocal: [
      "O Água Verde faz parte da área atendida pela Regional Fazendinha/Portão, junto com bairros como Portão, Vila Izabel, Seminário e Santa Quitéria. A região tem referências urbanas como a Avenida República Argentina e a Praça Monsenhor Francisco Starczinski, usadas aqui apenas para contextualizar a localização.",
      "Nesta página, o bairro organiza a cobertura. A solução continua sendo definida pelo sintoma e pelos testes: notebook lento, Wi‑Fi irregular, aquecimento, falha de impressão e arquivos em risco não devem receber a mesma intervenção automática.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp para registrar equipamento, sintoma e o que continua funcionando",
      "Separação entre software, armazenamento, memória, temperatura, rede e periféricos",
      "Backup conferido antes de formatação ou intervenção em armazenamento",
      "Escopo, modalidade e valor informados antes da execução",
    ],
    atendimentoLocal: [
      "Notebook ou PC lento, travando ou reiniciando",
      "Wi‑Fi com queda, baixa cobertura ou falha em um dispositivo específico",
      "Impressora, webcam, áudio e outros periféricos sem comunicação",
      "Windows, drivers, contas e programas com erro de configuração",
    ],
    coletaBancada: [
      "SSD, HD, memória, fonte ou outro componente que exija teste físico",
      "Notebook com superaquecimento, conector, teclado, dobradiça ou tela danificada",
      "Tentativa de recuperação de dados em mídia com falha",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-notebook",
      "/servicos/manutencao-de-computador",
      "/servicos/redes-e-wifi",
      "/servicos/upgrade-ssd-ram",
      "/servicos/formatacao",
      "/servicos/recuperacao-de-dados",
    ],
    problemasRelacionados: [
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como separar armazenamento, memória, software e temperatura antes de trocar peça." },
      { to: "/problemas/wifi-instavel", label: "Wi‑Fi instável", desc: "Como distinguir falha de dispositivo, cobertura ruim e problema no roteador ou no link." },
      { to: "/problemas/computador-esquentando", label: "Computador esquentando", desc: "Sinais que justificam inspeção de ventilação, poeira, ventoinha e temperatura." },
      { to: "/problemas/arquivos-apagados", label: "Arquivos apagados", desc: "O que evitar antes de tentar recuperar documentos importantes." },
    ],
    faqLocal: [
      { question: "Meu notebook está lento. Preciso formatar?", answer: "Não necessariamente. Primeiro verificamos armazenamento, memória, temperatura e carga de programas. Se o gargalo for físico, formatar não corrige a causa." },
      { question: "O Wi‑Fi cai só no meu computador. Preciso trocar o roteador?", answer: "Não é a primeira hipótese quando outros aparelhos continuam conectados. Nesse caso verificamos adaptador, driver e configuração do próprio computador antes de mexer no roteador." },
      { question: "Fazem upgrade de SSD no Água Verde?", answer: "Sim, quando o diagnóstico mostra que armazenamento é o gargalo e o equipamento é compatível. O estado do disco atual e o backup são avaliados antes da troca ou clonagem." },
      { question: "O atendimento pode começar remotamente?", answer: "Sim, quando a máquina liga e mantém conexão. Configuração, navegador, contas e parte dos erros do Windows podem ser triados remotamente; falhas físicas e problemas que dependem do ambiente exigem visita ou bancada." },
      { question: "Quais referências ajudam a localizar o atendimento no Água Verde?", answer: "O endereço completo é o principal dado. Como referências públicas, a Avenida República Argentina e a Praça Monsenhor Francisco Starczinski ajudam a confirmar a região do bairro." },
    ],
  },

  // ── CENTRO ──────────────────────────────────────────────────
  centro: {
    slug: "centro",
    nome: "Centro de Curitiba",
    nomeLocativo: "no Centro de Curitiba",
    cidade: "Curitiba",
    areaName: "Centro de Curitiba",
    metaTitle: "Técnico de Informática no Centro de Curitiba | Notebook e PC",
    metaDescription:
      "Técnico de informática no Centro de Curitiba: conserto de notebook, manutenção de computador, formatação e suporte para escritórios.",
    h1: "Técnico de Informática no Centro de Curitiba",
    subtitulo:
      "Atendimento ágil para lojas, consultórios e escritórios do Centro de Curitiba, com triagem por WhatsApp e diagnóstico antes de informar o valor.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no Centro de Curitiba. Pode me orientar?",
    contextoLocal: [
      "O Centro de Curitiba reúne comércio de rua, salas comerciais compactas e moradia, com um parque de equipamentos bastante heterogêneo: computadores de balcão com anos de uso ao lado de notebooks recentes. Em comércio, o que costuma parar a operação não é o computador em si, mas a cadeia em volta dele — impressora fiscal ou térmica sem comunicação, sistema de vendas travado após atualização e rede instável entre caixa e retaguarda.",
      "Como boa parte dos atendimentos no Centro acontece em horário comercial, a triagem prioriza o que pode ser feito remotamente e o que exige presença. Quando o reparo é mais longo — troca de peça interna, recuperação de dados ou reinstalação completa — a coleta evita que o equipamento fique inoperante no balcão durante horas de movimento, e o valor só é informado depois do diagnóstico.",
    ],
    logisticaLocal: [
      "No Centro a variável decisiva é acesso, não distância. Salas comerciais antigas, edifícios com elevador único, carga e descarga restrita e zona azul limitam o tempo que a equipe consegue permanecer no endereço. Agendamos preferencialmente no início da manhã ou no meio da tarde, e pedimos que o equipamento esteja desconectado e acessível quando o caso já foi triado como coleta.",
      "O perfil de chamado também é próprio da região: microempresa, escritório de serviços, comércio de rua e consultório com um ou dois computadores que sustentam a operação inteira, muitas vezes com sistema de gestão, impressora fiscal e leitor conectados ao mesmo aparelho. Antes de qualquer formatação, verificamos licenças, integrações e a existência de cópia dos dados — em máquina de comércio, perder a configuração do sistema costuma custar mais caro que a peça.",
      "Em máquina de comércio no Centro, antes de qualquer intervenção verificamos se existe certificado digital, sistema fiscal ou integração com maquininha instalada no aparelho. Esses itens exigem cuidado específico na reinstalação e, quando reconfigurá-los depende do fornecedor do sistema, isso é informado no orçamento para que a parada seja programada.",
    ],
    ponteLocal: {
      antes: "Quando o chamado é reparo do próprio aparelho e não configuração do ambiente, os prazos, a coleta e o que é avaliado na bancada estão detalhados em ",
      to: "/servicos/conserto-pc-notebook/centro",
      anchor: "conserto de PC e notebook no Centro",
      depois: ".",
    },
    introducaoLocal: [
      "No Centro de Curitiba, a informática costuma estar misturada à operação do negócio: o mesmo computador pode abrir o sistema de vendas, conversar com a impressora, acessar certificado digital e manter planilhas do dia. Quando algo falha, a primeira pergunta não é apenas “qual peça estragou?”, mas qual elo da operação deixou de funcionar e o que ainda está disponível para manter o atendimento enquanto a causa é investigada.",
      "A triagem considera esse cenário antes de sugerir qualquer intervenção. Um erro de impressão pode vir de porta, driver ou rede; uma lentidão pode estar no disco, na memória ou no próprio sistema usado pela empresa. A modalidade — remoto, visita ou coleta — é escolhida depois dessa separação, com preservação das configurações de trabalho e aprovação do valor antes da execução.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp pensando na rotina comercial",
      "Diagnóstico rápido para reduzir tempo de parada",
      "Backup antes de reinstalar sistemas de equipe",
      "Valor aprovado antes de qualquer serviço",
    ],
    atendimentoLocal: [
      "Reparo de PC de escritório que trava no expediente",
      "Formatação com backup em máquinas compartilhadas",
      "Configuração de rede e impressoras de escritório",
      "Remoção de vírus em computadores de equipe",
    ],
    coletaBancada: [
      "Reparos internos de hardware que exigem oficina",
      "Troca de componentes de notebook",
      "Diagnósticos prolongados de instabilidade",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-computador",
      "/servicos/manutencao-de-notebook",
      "/servicos/formatacao",
      "/servicos/remocao-de-virus",
      "/servicos/redes-e-wifi",
    ],
    faqLocal: [
      { question: "Atendem escritórios e lojas no Centro de Curitiba?", answer: "Sim. Boa parte da demanda no Centro é comercial: PCs de balcão, escritórios e consultórios. Fazemos suporte pontual ou recorrente sob consulta, começando pela triagem no WhatsApp." },
      { question: "Vocês têm loja física no Centro?", answer: "Não trabalhamos com loja de balcão. O atendimento é combinado por WhatsApp e realizado a domicílio, remotamente ou por coleta e entrega, conforme o tipo de serviço." },
      { question: "Dá para reduzir o tempo de parada da empresa?", answer: "Esse é o foco no Centro: triagem rápida e diagnóstico objetivo. Casos simples costumam ser resolvidos no local; quando é preciso bancada, informamos o prazo antes de retirar o equipamento." },
      { question: "Qual o valor da avaliação no Centro?", answer: "A partir de R$ 99,99 quando aplicável. O valor final depende do equipamento, da complexidade e de eventuais peças, e é sempre aprovado por você antes." },
    ],
  },

  // ── PORTÃO ──────────────────────────────────────────────────
  portao: {
    slug: "portao",
    nome: "Portão",
    nomeLocativo: "no Portão",
    cidade: "Curitiba",
    areaName: "Portão, Curitiba",
    metaTitle: "Técnico de Informática no Portão (Curitiba) | Notebook e PC",
    metaDescription:
      "Técnico de informática no Portão, Curitiba: conserto de notebook, manutenção de computador, formatação e upgrade de SSD.",
    h1: "Técnico de Informática no Portão – Curitiba",
    subtitulo:
      "Conserto de notebook, PC e redes para casas e comércios do Portão, com triagem por WhatsApp e valor aprovado por você.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no Portão, em Curitiba. Pode me orientar?",
    contextoLocal: [
      "Portão combina avenidas de comércio, edifícios residenciais e casas, e é um dos bairros onde mais aparecem equipamentos de uso doméstico prolongado: desktops de cinco a dez anos, notebooks com bateria já degradada e impressoras multifuncionais compartilhadas pela família. O diagnóstico nesses casos costuma separar três coisas que o usuário sente como uma só — lentidão por disco mecânico, travamento por superaquecimento e falha de software após atualização.",
      "Pequenos comércios da região trazem outro conjunto: rede Wi-Fi cobrindo loja e estoque, computador que não pode ficar fora do ar e backup inexistente. A recomendação padrão nesses atendimentos é sempre a mesma e é dita antes de qualquer serviço: garantir uma cópia dos arquivos críticos primeiro, depois tratar desempenho e, por último, discutir upgrade ou substituição do equipamento.",
    ],
    logisticaLocal: [
      "O Portão mistura casas, prédios e um corredor comercial movimentado, e isso divide os chamados em dois roteiros logísticos distintos. Nas residências, a visita no local resolve bem porque o equipamento é fixo e o ambiente permite abrir, limpar e testar com calma. No comércio da avenida, o atendimento precisa caber entre movimentos: agendamos em horário de menor fluxo e priorizamos o que devolve a operação ao ar mais rápido.",
      "Como o bairro tem muitos imóveis com computador antigo em uso diário, a decisão entre reparar e trocar aparece com frequência. A avaliação mede o que ainda faz sentido aproveitar — SSD, memória, monitor e periféricos — antes de recomendar equipamento novo, e o parecer é entregue por escrito no WhatsApp para que a decisão possa ser tomada com calma, inclusive a de não contratar serviço nenhum agora.",
      "Para o comércio da região, quando a peça necessária não está disponível de imediato, informamos o prazo estimado de chegada antes da aprovação e, sempre que possível, deixamos a operação rodando de forma provisória. Nenhum equipamento fica retido sem previsão: se o reparo não avança, o aparelho volta ao cliente sem cobrança de mão de obra não executada.",
    ],
    introducaoLocal: [
      "O Portão tem um perfil familiar e comercial ao mesmo tempo: casas com um ou mais computadores usados por toda a família e pequenos comércios que dependem de um PC estável para vender e emitir nota. Por isso aparecem muito computador lento e cheio de programas, notebook esquentando e Wi-Fi que não cobre a casa inteira.",
      "O atendimento começa pela triagem no WhatsApp. A partir do relato, orientamos os primeiros passos e definimos a melhor forma de resolver — no local, remotamente ou por coleta — com diagnóstico antes de informar o valor.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp para residências e comércio do bairro",
      "Diagnóstico antes de indicar troca de peças",
      "Foco em reduzir o tempo de parada do comércio",
      "Valor aprovado por você antes de executar",
    ],
    atendimentoLocal: [
      "Formatação com backup dos arquivos da família",
      "Upgrade de SSD e memória para ganho de desempenho",
      "Configuração de Wi-Fi para cobrir a casa toda",
      "Suporte ao PC do balcão do comércio",
    ],
    coletaBancada: [
      "Reparo de placa e falhas após queda de energia",
      "Troca de componentes internos de notebook",
      "Casos que exigem testes prolongados de bancada",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-notebook",
      "/servicos/manutencao-de-computador",
      "/servicos/formatacao",
      "/servicos/upgrade-ssd-ram",
      "/servicos/redes-e-wifi",
      "/servicos/remocao-de-virus",
    ],
    faqLocal: [
      { question: "Atendem o comércio do Portão?", answer: "Sim. Damos suporte ao PC do balcão, à impressora e à rede de pequenos comércios, com foco em reduzir o tempo de parada. A avaliação começa pela triagem no WhatsApp." },
      { question: "O Wi-Fi não cobre a casa toda — vocês resolvem?", answer: "Avaliamos o posicionamento do roteador e a necessidade de repetidor ou sistema mesh para melhorar a cobertura. A indicação depende do tamanho do imóvel e da estrutura." },
      { question: "Recebi um aviso pedindo pagamento para liberar o PC. É golpe?", answer: "Quase sempre é golpe. Não pague nada antes de uma avaliação. Fale conosco pelo WhatsApp que verificamos o caso com segurança antes de qualquer serviço." },
      { question: "Qual o valor do atendimento no Portão?", answer: "A partir de R$ 99,99 quando aplicável. O valor final depende do equipamento, do deslocamento, da complexidade e de eventuais peças, sempre aprovado por você antes." },
    ],
  },
};

// RODADA 5E — Lote 2 de bairros âncora (Curitiba + São José dos Pinhais).
Object.assign(BAIRROS, BAIRROS_LOTE_2);

// MICRO-RODADA LOCAL 1 — Lote 3 de bairros âncora (rotas já existentes).
Object.assign(BAIRROS, BAIRROS_LOTE_3);

// MICRO-RODADA LOCAL 2 — Lote 4 de bairros âncora (rotas já existentes).
Object.assign(BAIRROS, BAIRROS_LOTE_4);

// ONDA LOCAL 5 — 10 bairros adicionais com conteúdo autoral próprio.
Object.assign(BAIRROS, BAIRROS_LOTE_5);


export const BAIRRO_LIST = Object.values(BAIRROS);
