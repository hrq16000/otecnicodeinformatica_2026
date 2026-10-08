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
    metaTitle: "Técnico de informática no CIC | PC, notebook, rede e empresas",
    metaDescription:
      "Técnico de informática no CIC, Curitiba: diagnóstico de PC e notebook, rede, Wi-Fi, SSD, backup e suporte a pequenas operações. Triagem antes da execução.",
    h1: "Técnico de informática no CIC – Curitiba",
    subtitulo:
      "Diagnóstico de computador, notebook e rede com triagem para definir se o caso é remoto, no local ou de bancada antes de indicar peça ou formatação.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no CIC, em Curitiba. Pode me orientar?",
    contextoLocal: [
      "Em computador que perde desempenho ao longo do expediente, o diagnóstico não começa pela formatação. Primeiro observamos armazenamento, memória, temperatura e carga de programas. SSD degradado, pouca memória e superaquecimento podem produzir a mesma sensação de máquina lenta, mas exigem soluções diferentes.",
      "Em rede e Wi-Fi, a triagem compara o que funciona e o que falha. Se apenas um computador perde conexão, adaptador, driver e configuração desse equipamento entram primeiro. Se vários dispositivos apresentam a mesma falha, a investigação muda para roteador, cabeamento, cobertura e conexão principal. Essa separação evita comprar repetidor ou trocar roteador por tentativa.",
      "Para pequenas empresas e operações que dependem de computador, impressora e compartilhamentos, o objetivo é preservar continuidade. Antes de qualquer alteração mais invasiva, registramos o sintoma, verificamos backup e identificamos se existe dependência de software, impressora, pasta compartilhada, credencial ou dispositivo de rede que precise ser mantida.",
      "Quando há travamento, tela azul ou desligamento, a sequência de diagnóstico muda conforme o sinal observado. Erro reproduzível em software pode ser investigado remotamente; falha de energia, ausência de vídeo, temperatura elevada, ruído mecânico ou armazenamento suspeito pedem inspeção física e, quando necessário, bancada.",
    ],
    logisticaLocal: [
      "A Regional CIC abrange CIC, Augusta, Riviera e São Miguel. A atual Rua da Cidadania CIC fica na Rua Orlando Luís Lamarca, 458, próxima ao Terminal CIC. Essas referências oficiais são usadas apenas para localizar a região atendida; não representam endereço operacional, oficina ou ponto físico da marca.",
      "A modalidade é definida pelo problema. Configuração, navegador, parte dos erros do Windows e algumas falhas de impressão podem começar por acesso remoto. Rede do local, cabeamento e dispositivos que precisam ser testados no ambiente pedem visita. Desmontagem, falha física e teste prolongado seguem para bancada.",
      "O endereço completo é confirmado antes do agendamento. Não existe promessa fixa de chegada vinculada ao bairro: agenda, deslocamento e prazo dependem do endereço, da modalidade, da complexidade e de eventual necessidade de peça.",
    ],
    introducaoLocal: [
      "A Cidade Industrial de Curitiba integra a Regional CIC, que também atende Augusta, Riviera e São Miguel. A Prefeitura informa que a regional atende cerca de 187 mil habitantes, com base no Censo 2022, e concentra serviços públicos na Rua da Cidadania CIC, inaugurada em 2025.",
      "Nesta página, o recorte local serve para organizar cobertura e referências. A causa do defeito continua sendo determinada pelo equipamento e pelo sintoma: lentidão, queda de rede, falha de impressão, aquecimento, ausência de vídeo e perda de arquivos não devem receber a mesma solução automática.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp para registrar equipamento, sintoma e impacto",
      "Separação entre software, armazenamento, memória, temperatura, rede e periféricos",
      "Conferência de backup antes de reinstalação ou intervenção em armazenamento",
      "Escopo, modalidade e valor informados antes da execução",
    ],
    atendimentoLocal: [
      "Computador ou notebook lento, travando ou reiniciando",
      "Rede e Wi-Fi com perda de conexão ou cobertura irregular",
      "Impressora, compartilhamento e periféricos sem comunicação",
      "Windows, drivers, contas e programas com erro de configuração",
    ],
    coletaBancada: [
      "Falhas de energia, ausência de vídeo e defeitos intermitentes",
      "SSD, HD, memória, fonte ou outro componente que exija teste físico",
      "Notebook com superaquecimento, conector, teclado, tela ou necessidade de desmontagem",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-computador",
      "/servicos/manutencao-de-notebook",
      "/servicos/redes-e-wifi",
      "/servicos/upgrade-ssd-ram",
      "/servicos/formatacao",
      "/servicos/suporte-tecnico-empresarial",
    ],
    problemasRelacionados: [
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como separar armazenamento, memória, software e temperatura antes de decidir por upgrade ou formatação." },
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável", desc: "Como distinguir falha de um dispositivo, cobertura ruim e problema no roteador ou no link." },
      { to: "/problemas/impressora-nao-imprime", label: "Impressora não imprime", desc: "O que verificar em fila, porta, driver e rede antes de substituir equipamento." },
      { to: "/problemas/computador-esquentando", label: "Computador esquentando", desc: "Quando temperatura e ventilação passam a exigir inspeção física." },
    ],
    faqLocal: [
      { question: "Vocês atendem o CIC, em Curitiba?", answer: "Sim, mediante disponibilidade e confirmação do endereço. A modalidade pode ser remota, no local ou por coleta para bancada, conforme o tipo de falha identificado na triagem." },
      { question: "O computador da empresa está lento. Precisa formatar?", answer: "Não necessariamente. Primeiro avaliamos armazenamento, memória, temperatura e carga de programas. Formatação só faz sentido quando o diagnóstico aponta benefício e o backup está conferido." },
      { question: "A rede caiu só em um computador. O roteador pode estar com defeito?", answer: "Pode, mas não é a primeira hipótese quando os demais dispositivos continuam conectados. Nesse cenário verificamos adaptador, driver, configuração e conexão desse computador antes de trocar o roteador." },
      { question: "Dá para começar o atendimento remotamente?", answer: "Sim, quando o equipamento liga e mantém conexão. Configuração, navegador, parte dos erros do Windows e algumas falhas de impressão podem ser triadas remotamente. Defeito físico e problemas que dependem do ambiente exigem visita ou bancada." },
      { question: "Quais referências ajudam a localizar o atendimento no CIC?", answer: "O endereço completo é sempre o principal dado. Como referências públicas da região, a Rua da Cidadania CIC, a Rua Orlando Luís Lamarca e o Terminal CIC ajudam a confirmar a localização." },
    ],
  },

  // ── BATEL ───────────────────────────────────────────────────
  batel: {
    slug: "batel",
    nome: "Batel",
    nomeLocativo: "no Batel",
    cidade: "Curitiba",
    areaName: "Batel, Curitiba",
    metaTitle: "Técnico de informática no Batel | Notebook, home office e Wi‑Fi",
    metaDescription:
      "Técnico de informática no Batel, Curitiba: diagnóstico de notebook, PC, Wi‑Fi, dock, monitor, backup e Windows. Triagem antes de trocar equipamento.",
    h1: "Técnico de informática no Batel – Curitiba",
    subtitulo:
      "Diagnóstico de notebook, home office e rede para separar configuração, conectividade e falha física antes de formatar ou substituir equipamento.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no Batel, em Curitiba. Pode me orientar?",
    contextoLocal: [
      "Em notebook usado para trabalho, lentidão precisa ser separada entre armazenamento, memória, temperatura e carga de programas. SSD degradado, pouca RAM, sistema sobrecarregado e superaquecimento podem produzir sintomas parecidos; a medição evita trocar peça sem atacar a causa.",
      "Monitor externo e dock também precisam ser testados por camadas. Verificamos cabo, porta, alimentação do acessório, driver de vídeo e comportamento do notebook sem o dock antes de concluir por defeito do monitor ou da placa.",
      "Em Wi‑Fi de apartamento ou escritório, comparamos outros dispositivos e pontos do imóvel. Se apenas um notebook perde conexão, adaptador e driver entram primeiro. Se vários aparelhos falham no mesmo ponto, posição do roteador, interferência, banda e distribuição do sinal passam a ter mais peso.",
      "Backup é conferido antes de reinstalação ou migração. Em máquina de trabalho, também verificamos se existem VPN, certificado, software corporativo ou credenciais que precisam ser preservados antes de qualquer alteração invasiva.",
    ],
    logisticaLocal: [
      "O Batel integra a Regional Matriz de Curitiba, cuja Administração Regional funciona na Praça Rui Barbosa, 101, no Centro. Essa referência pública serve para situar a cobertura e não representa oficina ou unidade física da marca no bairro.",
      "Em condomínio ou edifício comercial, endereço completo, sala/apartamento e regras de acesso são confirmados antes da visita. Configuração, drivers e parte das falhas de software podem começar remotamente; rede do ambiente e falhas físicas exigem visita ou bancada.",
      "Não há promessa fixa de chegada ou conclusão vinculada ao bairro. Agenda, modalidade e prazo são definidos após a triagem conforme endereço, acesso, complexidade e eventual necessidade de peça.",
    ],
    ponteLocal: {
      antes: "Quando o caminho escolhido é reinstalar o sistema em vez de ajustar o que já existe, o passo a passo do backup, das licenças e do tempo de parada está descrito em ",
      to: "/servicos/formatacao-computador/batel",
      anchor: "formatação de computador no Batel",
      depois: ".",
    },
    introducaoLocal: [
      "O Batel integra a área atendida pela Regional Matriz, junto com bairros como Bigorrilho, Cabral, Centro, Juvevê e Mercês. Nesta página, o bairro organiza a cobertura; a solução continua sendo definida pelo sintoma e pelos testes.",
      "A triagem começa pelo equipamento, pelo que deixou de funcionar e pelo que precisa ser preservado. A partir disso, definimos se o caso pode começar remotamente, precisa de visita ao ambiente ou exige bancada.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp registrando notebook, periféricos, rede e impacto",
      "Teste isolado de dock, monitor, cabo e driver antes de substituir acessórios",
      "Medição de armazenamento, memória e temperatura antes de indicar upgrade",
      "Escopo, modalidade e valor informados antes da execução",
    ],
    atendimentoLocal: [
      "Notebook ou PC lento, travando ou reiniciando",
      "Monitor, dock, webcam, áudio e periféricos com falha",
      "Wi‑Fi com queda ou desempenho irregular",
      "Windows, drivers, contas e programas com erro",
    ],
    coletaBancada: [
      "SSD, memória, bateria, teclado ou tela que exijam desmontagem",
      "Notebook com aquecimento, falha de energia ou conector danificado",
      "Tentativa de recuperação de dados em armazenamento com falha",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-notebook",
      "/servicos/manutencao-de-computador",
      "/servicos/redes-e-wifi",
      "/servicos/upgrade-ssd-ram",
      "/servicos/formatacao",
    ],
    problemasRelacionados: [
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como separar armazenamento, memória, software e temperatura antes de fazer upgrade." },
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável", desc: "Como distinguir falha de dispositivo, interferência e problema no roteador ou no link." },
      { to: "/problemas/computador-esquentando", label: "Computador esquentando", desc: "Sinais que justificam inspeção de ventilação, poeira e ventoinha." },
      { to: "/problemas/arquivos-apagados", label: "Arquivos apagados", desc: "O que evitar antes de tentar recuperar documentos importantes." },
    ],
    faqLocal: [
      { question: "Meu notebook está lento no trabalho. Preciso formatar?", answer: "Não necessariamente. Primeiro verificamos armazenamento, memória, temperatura e carga de programas. Se o gargalo for físico, formatar não corrige a causa." },
      { question: "Meu monitor falha só quando uso o dock. O monitor está com defeito?", answer: "Não necessariamente. Testamos cabo, porta, alimentação do dock, driver e conexão direta antes de concluir por defeito do monitor." },
      { question: "O Wi‑Fi cai no escritório. Preciso trocar o roteador?", answer: "Depende dos testes. Comparamos outros aparelhos, pontos do ambiente e conexão próxima ao roteador antes de decidir por troca, reposicionamento ou expansão da rede." },
      { question: "O atendimento pode começar remotamente?", answer: "Sim, quando o equipamento liga e mantém conexão. Configuração, drivers e parte das falhas de software podem ser triados remotamente; defeitos físicos e problemas da rede do ambiente exigem visita ou bancada." },
      { question: "Qual regional atende o Batel?", answer: "O Batel integra a Regional Matriz de Curitiba. A Administração Regional Matriz funciona na Praça Rui Barbosa, 101, no Centro." },
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
    metaTitle: "Técnico de informática no Centro de Curitiba | PC, notebook e rede",
    metaDescription:
      "Técnico de informática no Centro de Curitiba: diagnóstico de PC e notebook, impressora, rede, backup, certificado e Windows. Triagem antes da execução.",
    h1: "Técnico de informática no Centro de Curitiba",
    subtitulo:
      "Diagnóstico de computador, notebook e ambiente de trabalho com foco em continuidade, dados e periféricos antes de formatar ou trocar equipamento.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no Centro de Curitiba. Pode me orientar?",
    contextoLocal: [
      "Em computador usado para atendimento, a triagem começa pela função que parou: sistema, arquivo, impressão, internet, certificado ou acesso a uma pasta compartilhada. Essa separação ajuda a restaurar a operação sem fazer alterações invasivas antes de entender a causa.",
      "Em impressora de rede, verificamos teste interno, endereço recebido, porta configurada e fila. Quando vários computadores perdem o mesmo dispositivo ao mesmo tempo, rede e comunicação ganham prioridade sobre substituição do equipamento.",
      "Quando há certificado digital, software fiscal ou sistema de terceiros, registramos essas dependências antes de reinstalar o Windows. Parte da configuração pode exigir credencial, licença ou suporte do fornecedor e precisa ser preservada ou documentada.",
      "Backup é conferido antes de formatação ou intervenção em armazenamento. Se o disco apresenta erro de leitura, travamento durante cópia ou outros sinais de falha, a prioridade passa a ser preservar dados antes de reinstalar o sistema.",
    ],
    logisticaLocal: [
      "O Centro integra a Regional Matriz. A Administração Regional Matriz funciona na Praça Rui Barbosa, 101, e a própria Praça Rui Barbosa é um ponto de transporte coletivo gerido pela URBS. Essas referências públicas ajudam a situar a cobertura e não representam oficina ou unidade física da marca.",
      "Configuração, navegador, contas, certificado e parte das falhas de software podem começar remotamente. Rede do local, impressora e dispositivos que precisam ser testados juntos normalmente pedem visita. Falhas físicas e testes prolongados seguem para bancada.",
      "Não há promessa fixa de chegada ou conclusão associada ao Centro. Agenda, modalidade e prazo são definidos após a triagem conforme endereço, acesso ao edifício, complexidade e eventual necessidade de peça.",
    ],
    ponteLocal: {
      antes: "Quando o chamado é reparo do próprio aparelho e não configuração do ambiente, os prazos, a coleta e o que é avaliado na bancada estão detalhados em ",
      to: "/servicos/conserto-pc-notebook/centro",
      anchor: "conserto de PC e notebook no Centro",
      depois: ".",
    },
    introducaoLocal: [
      "A Regional Matriz atende oficialmente o Centro e outros bairros da região central. Nesta página, o recorte local organiza a cobertura; o diagnóstico continua sendo guiado pelo sintoma, pelas dependências do equipamento e pelos dados que precisam ser preservados.",
      "A modalidade é definida depois dessa triagem: acesso remoto quando o equipamento liga e mantém conexão, visita quando o problema depende do ambiente e bancada quando há desmontagem, falha física ou teste prolongado.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp começando pela função que ficou indisponível",
      "Mapeamento de certificado, software e periféricos antes de reinstalar",
      "Conferência de backup antes de formatação ou intervenção em disco",
      "Escopo, modalidade e valor informados antes da execução",
    ],
    atendimentoLocal: [
      "PC ou notebook que trava durante o expediente",
      "Impressora, scanner e compartilhamentos sem comunicação",
      "Windows, certificado, drivers e programas com erro",
      "Backup e organização de cópias antes de manutenção",
    ],
    coletaBancada: [
      "SSD, HD, memória, fonte ou outro componente que exija teste físico",
      "Notebook com falha de energia, tela, teclado ou conector",
      "Tentativa de recuperação de dados em armazenamento com falha",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-computador",
      "/servicos/manutencao-de-notebook",
      "/servicos/redes-e-wifi",
      "/servicos/formatacao",
      "/servicos/recuperacao-de-dados",
    ],
    problemasRelacionados: [
      { to: "/problemas/impressora-nao-imprime", label: "Impressora não imprime", desc: "O que verificar em fila, porta, driver e rede antes de substituir equipamento." },
      { to: "/problemas/windows-nao-inicia", label: "Windows não inicia", desc: "Como separar inicialização do sistema, armazenamento e ausência de vídeo antes de formatar." },
      { to: "/problemas/arquivos-apagados", label: "Arquivos apagados", desc: "O que evitar antes de tentar recuperar documentos importantes." },
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como separar armazenamento, memória, software e temperatura antes de fazer upgrade." },
    ],
    faqLocal: [
      { question: "O computador do trabalho parou de imprimir. Precisa formatar?", answer: "Não é o primeiro passo. Verificamos teste da impressora, endereço, porta, fila, driver e rede antes de considerar reinstalação do sistema." },
      { question: "Tenho certificado digital e sistema fiscal. Isso é preservado?", answer: "Essas dependências são mapeadas antes de qualquer reinstalação. Quando a reconfiguração depende de licença, credencial ou fornecedor, isso é informado antes da execução." },
      { question: "Vocês conferem o backup antes de mexer no sistema?", answer: "Sim. Confirmamos o que precisa ser preservado, onde está a cópia e se ela pode ser acessada antes de uma intervenção invasiva." },
      { question: "O atendimento pode começar remotamente?", answer: "Sim, quando o equipamento liga e mantém conexão. Configuração, certificado e parte das falhas de software podem ser triados remotamente; rede do ambiente e defeitos físicos exigem visita ou bancada." },
      { question: "Qual regional atende o Centro?", answer: "O Centro integra a Regional Matriz de Curitiba. A Administração Regional Matriz funciona na Praça Rui Barbosa, 101." },
    ],
  },

  // ── PORTÃO ──────────────────────────────────────────────────
  portao: {
    slug: "portao",
    nome: "Portão",
    nomeLocativo: "no Portão",
    cidade: "Curitiba",
    areaName: "Portão, Curitiba",
    metaTitle: "Técnico de informática no Portão | PC, notebook, Wi‑Fi e backup",
    metaDescription:
      "Técnico de informática no Portão, Curitiba: diagnóstico de PC e notebook, Wi‑Fi, impressora, backup, SSD e Windows. Triagem antes da execução.",
    h1: "Técnico de informática no Portão – Curitiba",
    subtitulo:
      "Diagnóstico de computador, notebook e rede para preservar dados e separar software, hardware e conectividade antes de formatar ou trocar peça.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no Portão, em Curitiba. Pode me orientar?",
    contextoLocal: [
      "Em computador ou notebook lento, armazenamento, memória, temperatura e carga de programas são avaliados separadamente. Um disco degradado, pouca RAM, excesso de inicialização ou aquecimento podem produzir sintomas parecidos; a medição evita trocar peça por tentativa.",
      "Em Wi‑Fi, comparamos outros aparelhos e pontos do imóvel. Se apenas um computador perde conexão, adaptador, driver e configuração desse dispositivo entram primeiro. Se vários aparelhos falham no mesmo trecho, posição do roteador, obstáculos, banda e distribuição do sinal passam a ser investigados.",
      "Quando a impressora some da rede, verificamos teste interno, endereço recebido, porta configurada e fila. Quando vários computadores perdem o mesmo equipamento, rede e comunicação ganham prioridade sobre substituição de hardware.",
      "Backup é conferido antes de reinstalação ou intervenção em armazenamento. Se houver erro de leitura ou travamento durante cópia, a prioridade passa a ser preservar os dados antes de insistir em clonagem ou formatação.",
    ],
    logisticaLocal: [
      "O Portão integra a Administração Regional Portão, cuja sede funciona na Rua da Cidadania Fazendinha/Portão, na Rua Carlos Klemtz, 1700, Fazendinha. Essa referência pública serve apenas para situar a cobertura e não representa oficina ou unidade física da marca.",
      "Configuração, navegador, contas e parte dos erros do Windows podem começar remotamente. Rede do imóvel, impressora e dispositivos que precisam ser testados juntos normalmente pedem visita. Falhas físicas, desmontagem e testes prolongados seguem para bancada.",
      "Não há promessa fixa de chegada ou conclusão associada ao bairro. Agenda, modalidade e prazo são definidos após a triagem conforme endereço, complexidade e eventual necessidade de peça.",
    ],
    introducaoLocal: [
      "O Portão faz parte da Regional Portão, que também abrange Água Verde, Fazendinha, Guaíra, Parolin, Santa Quitéria, Seminário, Vila Izabel e parte sul do Campo Comprido. A sede regional fica na Rua da Cidadania Fazendinha/Portão.",
      "Nesta página, o bairro organiza a cobertura. A solução continua sendo determinada pelo sintoma e pelos testes: lentidão, falha de impressão, Wi‑Fi irregular e arquivos em risco exigem decisões técnicas diferentes.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp registrando equipamento, sintoma e arquivos importantes",
      "Separação entre software, armazenamento, memória, temperatura, rede e periféricos",
      "Conferência de backup antes de formatação ou intervenção em disco",
      "Escopo, modalidade e valor informados antes da execução",
    ],
    atendimentoLocal: [
      "Computador ou notebook lento, travando ou reiniciando",
      "Wi‑Fi com queda, baixa cobertura ou falha em um dispositivo",
      "Impressora e periféricos sem comunicação",
      "Windows, drivers, contas e programas com erro",
    ],
    coletaBancada: [
      "SSD, HD, memória, fonte ou outro componente que exija teste físico",
      "Notebook com aquecimento, falha de energia, tela ou conector",
      "Tentativa de recuperação de dados em armazenamento com falha",
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
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como separar armazenamento, memória, software e temperatura antes de fazer upgrade." },
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável", desc: "Como distinguir falha de dispositivo, cobertura ruim e problema no roteador ou no link." },
      { to: "/problemas/impressora-nao-imprime", label: "Impressora não imprime", desc: "O que verificar em fila, porta, driver e rede antes de substituir equipamento." },
      { to: "/problemas/arquivos-apagados", label: "Arquivos apagados", desc: "O que evitar antes de tentar recuperar documentos importantes." },
    ],
    faqLocal: [
      { question: "Meu computador está lento. Preciso formatar?", answer: "Depende da causa. Armazenamento degradado, pouca memória e superaquecimento podem continuar causando lentidão depois da formatação. Por isso medimos o equipamento antes de decidir." },
      { question: "O Wi‑Fi cai só em um computador. Preciso trocar o roteador?", answer: "Não é a primeira hipótese se os demais aparelhos continuam conectados. Nesse caso verificamos adaptador, driver e configuração do próprio computador antes de alterar o roteador." },
      { question: "A impressora sumiu de todos os computadores. Pode ser rede?", answer: "Sim. Quando vários computadores perdem o mesmo dispositivo, verificamos endereço, porta, fila e comunicação de rede antes de concluir por falha física." },
      { question: "O atendimento pode começar remotamente?", answer: "Sim, quando o equipamento liga e mantém conexão. Configuração, navegador e parte dos erros do Windows podem ser triados remotamente; rede do ambiente e falhas físicas exigem visita ou bancada." },
      { question: "Qual regional atende o Portão?", answer: "O Portão integra a Administração Regional Portão. A sede funciona na Rua da Cidadania Fazendinha/Portão, na Rua Carlos Klemtz, 1700, Fazendinha." },
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
