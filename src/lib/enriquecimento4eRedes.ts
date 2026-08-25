/**
 * Rodada 4E — Wi-Fi, redes e suporte remoto.
 *
 * Fonte ÚNICA do conteúdo 4E. Nenhuma URL nova: apenas owners já publicados
 * recebem blocos autorais. Fora do mapa, o componente não renderiza nada
 * (fail-closed) — isso impede que a seção vire template geolocalizado
 * (regra anti-doorway) e mantém a similaridade entre owners abaixo de 0,40.
 *
 * Um owner por intenção. `INTENCOES_4E` registra PRIMARY_INTENT,
 * SECONDARY_ALLOWED e OWNED_ELSEWHERE para auditoria de canibalização.
 */
import type { EnriquecimentoConteudo } from "./enriquecimento";

export const OWNERS_4E = [
  "/problemas/wifi-instavel",
  "/solucoes/diagnostico",
  "/equipamentos/roteador",
  "/servicos/redes-e-wifi",
  "/atendimento-remoto",
] as const;

export type Owner4e = (typeof OWNERS_4E)[number];

export interface Intencao4e {
  primary: string;
  secondary: string[];
  ownedElsewhere: { intencao: string; owner: string }[];
}

export const INTENCOES_4E: Record<Owner4e, Intencao4e> = {
  "/problemas/wifi-instavel": {
    primary: "Wi-Fi que cai sozinho, reconecta toda hora ou não conecta em um aparelho",
    secondary: [
      "wifi cai toda hora",
      "wifi nao conecta notebook",
      "rede some e volta",
      "problema de rede windows",
    ],
    ownedElsewhere: [
      { intencao: "internet lenta × Wi-Fi lento", owner: "/solucoes/diagnostico" },
      { intencao: "computador lento (máquina, não rede)", owner: "/problemas/computador-lento" },
      { intencao: "configurar roteador e cobertura", owner: "/equipamentos/roteador" },
    ],
  },
  "/solucoes/diagnostico": {
    primary: "Medir e diferenciar internet lenta de Wi-Fi lento antes de trocar qualquer coisa",
    secondary: [
      "internet lenta no computador",
      "wifi lento",
      "teste de velocidade cabo x wifi",
      "latencia alta em chamada de video",
    ],
    ownedElsewhere: [
      { intencao: "quedas e falha de conexão", owner: "/problemas/wifi-instavel" },
      { intencao: "cobertura, repetidor e mesh", owner: "/equipamentos/roteador" },
      { intencao: "máquina lenta por disco/memória", owner: "/solucoes/ssd" },
    ],
  },
  "/equipamentos/roteador": {
    primary: "Configuração, segurança e cobertura do roteador (sinal fraco em cômodo específico)",
    secondary: [
      "sinal wifi fraco",
      "melhorar wifi em casa",
      "repetidor ou mesh",
      "configurar roteador com seguranca",
    ],
    ownedElsewhere: [
      { intencao: "medição de velocidade", owner: "/solucoes/diagnostico" },
      { intencao: "conexão que cai", owner: "/problemas/wifi-instavel" },
      { intencao: "contratar técnico de rede", owner: "/servicos/redes-e-wifi" },
    ],
  },
  "/servicos/redes-e-wifi": {
    primary: "Contratar técnico de rede em Curitiba e São José dos Pinhais, incluindo o caso 'conectado, mas sem internet'",
    secondary: [
      "tecnico de rede curitiba",
      "conectado sem internet",
      "problema de internet no escritorio",
      "rede residencial x empresarial",
    ],
    ownedElsewhere: [
      { intencao: "suporte remoto e sessão segura", owner: "/atendimento-remoto" },
      { intencao: "contrato de TI empresarial", owner: "/servicos/suporte-tecnico-empresarial" },
      { intencao: "ajuste do próprio roteador", owner: "/equipamentos/roteador" },
    ],
  },
  "/atendimento-remoto": {
    primary: "Decidir entre suporte remoto e atendimento presencial, com sessão remota segura",
    secondary: [
      "suporte remoto computador",
      "suporte tecnico remoto e seguro",
      "tecnico remoto ou presencial",
      "golpe de falso suporte",
    ],
    ownedElsewhere: [
      { intencao: "diagnóstico de rede local", owner: "/servicos/redes-e-wifi" },
      { intencao: "atendimento no endereço do cliente", owner: "/atendimento-domicilio" },
      { intencao: "suporte contratado por empresa", owner: "/empresas" },
    ],
  },
};

/** FAQ visível — perguntas distintas por owner, sem repetição entre eles. */
export interface Faq4e {
  pergunta: string;
  resposta: string;
}

export const FAQ_4E: Record<Owner4e, Faq4e[]> = {
  "/problemas/wifi-instavel": [
    {
      pergunta: "A conexão some ou só fica sem internet?",
      resposta:
        "São sintomas diferentes. Quando a rede desaparece da lista, o problema está no enlace sem fio: sinal, canal, firmware ou o próprio adaptador. Quando o aparelho continua conectado e apenas para de navegar, a falha costuma estar depois do roteador — DNS, modem ou provedor. Vale anotar qual dos dois acontece antes de mexer em qualquer configuração.",
    },
    {
      pergunta: "Cai em todos os aparelhos ou só em um?",
      resposta:
        "Se cai em todos ao mesmo tempo, o suspeito é o roteador, a alimentação elétrica dele ou o provedor. Se cai só em um notebook, o caminho é driver do adaptador, perfil de rede salvo com senha antiga e modo de economia de energia da placa Wi-Fi.",
    },
    {
      pergunta: "Reiniciar o roteador todo dia resolve?",
      resposta:
        "Reiniciar mascara o sintoma. Se o equipamento só funciona bem depois de reiniciar, ele está travando por firmware antigo, superaquecimento ou fonte já cansada — e isso volta. Reinício diário é sinal de troca ou de atualização pendente, não de solução.",
    },
    {
      pergunta: "Horário influencia?",
      resposta:
        "Sim, e isso é uma pista útil. Queda concentrada em horários de pico costuma indicar saturação do provedor ou disputa de canal com redes vizinhas. Queda espalhada pelo dia inteiro aponta para o equipamento local.",
    },
  ],
  "/solucoes/diagnostico": [
    {
      pergunta: "Por que o teste de velocidade dá resultado diferente a cada vez?",
      resposta:
        "Porque o teste mede o caminho inteiro naquele instante: aparelho, Wi-Fi, roteador, enlace do provedor e servidor de destino. Medir uma vez, do sofá, no horário de pico, não descreve a conexão. O que gera conclusão é comparar duas medições no mesmo minuto — uma por cabo e outra por Wi-Fi.",
    },
    {
      pergunta: "Mbps e MB/s são a mesma coisa?",
      resposta:
        "Não. Mbps é megabit por segundo, unidade do plano contratado. MB/s é megabyte por segundo, unidade que o navegador mostra ao baixar arquivo. Um é aproximadamente oito vezes o outro, e é por isso que um plano de 400 Mbps baixa arquivo perto de 50 MB/s no melhor cenário.",
    },
    {
      pergunta: "Velocidade alta e chamada de vídeo ruim: faz sentido?",
      resposta:
        "Faz. Chamada de vídeo, jogo e acesso remoto sofrem mais com latência e variação do que com banda. Uma conexão rápida com atraso instável trava a chamada mesmo marcando número alto no teste.",
    },
    {
      pergunta: "Trocar o DNS acelera a internet?",
      resposta:
        "Não acelera a banda. O DNS traduz nomes em endereços; quando está lento ou fora do ar, os sites demoram a abrir e a impressão é de queda geral. Trocar DNS ajuda nesse cenário específico e não substitui diagnóstico quando o problema é de enlace.",
    },
  ],
  "/equipamentos/roteador": [
    {
      pergunta: "Por que o Wi-Fi é fraco só em um cômodo?",
      resposta:
        "Alcance depende de distância e de obstáculo. Parede de concreto, caixa d'água, espelho e armário metálico atenuam muito mais que parede de gesso. Roteador dentro de rack fechado, atrás da TV ou no canto da casa perde metade da cobertura útil antes de qualquer configuração.",
    },
    {
      pergunta: "Repetidor ou mesh: qual escolher?",
      resposta:
        "Repetidor é barato e resolve pouco: ele repete o que recebe, então sinal ruim de entrada vira sinal ruim ampliado, e normalmente corta a velocidade pela metade. Mesh mantém a mesma rede entre pontos e faz a transição melhor, mas continua dependendo da qualidade do enlace entre os nós. Nenhum dos dois substitui um cabo até o ponto distante quando existe a possibilidade de passar cabo.",
    },
    {
      pergunta: "2,4 GHz ou 5 GHz?",
      resposta:
        "2,4 GHz alcança mais longe e atravessa mais parede, com menos velocidade e mais interferência. 5 GHz entrega mais velocidade perto do roteador e perde força rápido com obstáculo. Casa com cômodo distante costuma precisar das duas faixas ativas, não de uma só.",
    },
    {
      pergunta: "Preciso mesmo atualizar o firmware?",
      resposta:
        "Sim. Firmware antigo é a causa mais comum de travamento periódico e de falhas de segurança já corrigidas pelo fabricante. A atualização é feita pelo painel do próprio equipamento ou pelo aplicativo oficial — nunca por arquivo baixado de site de terceiros.",
    },
  ],
  "/servicos/redes-e-wifi": [
    {
      pergunta: "Está conectado mas sem internet. Por onde começar?",
      resposta:
        "Pela camada. Primeiro confirma-se se o aparelho recebeu endereço válido do roteador; depois se o roteador responde; depois se o modem tem enlace com o provedor; só então DNS e serviço externo. Pular etapa é o que faz alguém formatar um computador para resolver um problema que estava no modem.",
    },
    {
      pergunta: "Vocês atendem em São José dos Pinhais além de Curitiba?",
      resposta:
        "Sim. Curitiba e São José dos Pinhais fazem parte da área presencial. Casos de configuração e diagnóstico inicial podem ser resolvidos remotamente; cabeamento, ponto de acesso e substituição de equipamento exigem visita, e o deslocamento é informado antes do aceite.",
    },
    {
      pergunta: "Rede de escritório é diferente de rede de casa?",
      resposta:
        "É. Em casa, um roteador cobre bem a maior parte das situações. Em escritório, o número de aparelhos simultâneos, a impressora compartilhada e a necessidade de continuidade mudam o projeto: normalmente entram pontos de acesso separados e cabeamento, porque cobertura por repetidor não sustenta uso profissional.",
    },
    {
      pergunta: "O problema pode ser do provedor?",
      resposta:
        "Pode, e faz parte do diagnóstico descobrir isso. Quando o teste por cabo direto no modem também falha, o caso é de abertura de chamado na operadora. Nesse cenário informamos o que foi verificado para você não pagar por um serviço que não é seu.",
    },
  ],
  "/atendimento-remoto": [
    {
      pergunta: "Suporte remoto é seguro?",
      resposta:
        "É, quando a sessão obedece a três regras: você autoriza a entrada informando um código gerado na hora, acompanha a tela durante todo o atendimento e a sessão é encerrada ao final, sem deixar acesso permanente instalado. Nenhum técnico precisa de senha bancária, código de autenticação ou acesso ao seu aplicativo do banco para configurar Windows, e-mail ou impressora.",
    },
    {
      pergunta: "O que não dá para resolver remotamente?",
      resposta:
        "Tudo que exige mão no equipamento: computador que não liga, tela sem imagem, troca de peça, cabo rompido, ponto de rede e defeito elétrico. Também não faz sentido remoto quando o próprio acesso à internet está caindo — sem enlace estável, a sessão cai junto.",
    },
    {
      pergunta: "Recebi uma ligação oferecendo suporte. É golpe?",
      resposta:
        "Desconfie sempre que o contato não partiu de você. Atendimento legítimo não começa com ligação inesperada pedindo instalação de programa, número de cartão, transferência ou código recebido por mensagem. Encerre e procure o canal oficial da empresa por conta própria.",
    },
    {
      pergunta: "Como sei se meu caso começa remoto?",
      resposta:
        "Se o computador liga, entra no Windows e tem internet, quase sempre vale iniciar remoto: o diagnóstico sai no mesmo dia e, se for hardware, você já sabe o que precisa antes de agendar visita.",
    },
  ],
};

export const CIDADES_4E = ["Curitiba", "São José dos Pinhais"] as const;
export type Cidade4e = (typeof CIDADES_4E)[number];

/** Abertura da mensagem do funil, por owner — carrega problema e modalidade. */
const ABERTURA_4E: Record<Owner4e, string> = {
  "/problemas/wifi-instavel": "Meu Wi-Fi cai ou não conecta e quero ajuda para identificar a origem",
  "/solucoes/diagnostico": "Quero um diagnóstico para saber se a lentidão é da internet, do Wi-Fi ou do equipamento",
  "/equipamentos/roteador": "Preciso melhorar a cobertura e a configuração do meu roteador",
  "/servicos/redes-e-wifi": "Preciso de um técnico de rede para resolver um problema de internet",
  "/atendimento-remoto": "Quero saber se meu caso resolve por suporte remoto ou precisa de visita",
};

/** Modalidade sugerida por owner — vai no contexto do CTA, sem PII. */
export const MODALIDADE_4E: Record<Owner4e, "remoto" | "presencial" | "hibrido"> = {
  "/problemas/wifi-instavel": "hibrido",
  "/solucoes/diagnostico": "remoto",
  "/equipamentos/roteador": "presencial",
  "/servicos/redes-e-wifi": "presencial",
  "/atendimento-remoto": "remoto",
};

export function mensagemWhatsapp4e(path: string, cidade: Cidade4e = "Curitiba"): string | null {
  const abertura = ABERTURA_4E[path as Owner4e];
  if (!abertura) return null;
  const slug = path.replace(/^\//, "").replace(/\//g, "-");
  const modalidade = MODALIDADE_4E[path as Owner4e];
  return `Olá! ${abertura}. Estou em ${cidade}.\n\n_[cat=redes · owner=${slug} · modalidade=${modalidade} · cidade=${cidade
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]+/g, "-")}]_`;
}

export const ENRIQUECIMENTO_4E: Record<Owner4e, EnriquecimentoConteudo> = {
  "/problemas/wifi-instavel": {
    respostaRapida:
      "Antes de trocar roteador, separe dois sintomas que costumam ser confundidos: a rede sumir da lista e a rede continuar conectada sem navegar. No primeiro caso o enlace sem fio está falhando — sinal fraco no cômodo, canal disputado com vizinhos, firmware travando, adaptador entrando em economia de energia ou perfil de rede salvo com senha antiga. No segundo, o Wi-Fi está de pé e a falha está adiante: modem, provedor ou resolução de nomes. Três observações resolvem a maior parte da triagem: acontece em todos os aparelhos ao mesmo tempo, também acontece por cabo e acontece em um cômodo específico. Se cai por cabo também, o Wi-Fi está inocente. Se cai só longe do roteador, é cobertura. Se cai só em um notebook enquanto os outros seguem conectados, o problema é daquele aparelho.",
    tabelaDiagnostica: {
      titulo: "Quedas de Wi-Fi: o que cada padrão indica",
      colunas: { sintoma: "Como a queda acontece", causa: "Origem provável", verificar: "Como confirmar", acao: "Próximo passo" },
      linhas: [
        {
          sintoma: "Some em todos os aparelhos ao mesmo tempo",
          causa: "Roteador travando, fonte instável ou queda do provedor",
          verificar: "Luz do modem e do roteador no momento da queda",
          acao: "Atualizar firmware; se o modem também perde enlace, abrir chamado na operadora",
        },
        {
          sintoma: "Cai só em um notebook",
          causa: "Driver, economia de energia do adaptador ou perfil salvo corrompido",
          verificar: "Outro aparelho no mesmo cômodo mantém conexão",
          acao: "Esquecer a rede, reconectar e desativar suspensão do adaptador",
        },
        {
          sintoma: "Cai apenas em um cômodo",
          causa: "Cobertura insuficiente; aparelho insiste em ficar preso ao sinal fraco",
          verificar: "Mesma tarefa perto do roteador funciona sem queda",
          acao: "Reposicionar o roteador ou avaliar ponto de acesso com cabo",
        },
        {
          sintoma: "Conectado, mas sem navegar",
          causa: "Falha depois do Wi-Fi: modem, provedor ou resolução de nomes",
          verificar: "Cabo direto no modem repete o problema",
          acao: "Tratar como falha de enlace, não de rede sem fio",
        },
        {
          sintoma: "Piora sempre no mesmo horário",
          causa: "Saturação do provedor ou disputa de canal com redes vizinhas",
          verificar: "Repetir o teste em horário vazio",
          acao: "Fixar canal menos concorrido; se persistir, registrar com a operadora",
        },
        {
          sintoma: "Volta ao normal só depois de reiniciar",
          causa: "Equipamento travando por firmware, calor ou fonte cansada",
          verificar: "Intervalo entre reinícios encurtando com o tempo",
          acao: "Atualizar firmware; recorrência indica substituição",
        },
      ],
    },
    blocos: [
      {
        id: "4e-observar-antes",
        titulo: "O que observar antes de chamar suporte",
        intro:
          "Cinco respostas anotadas encurtam o atendimento e evitam troca de equipamento sem necessidade.",
        itens: [
          { titulo: "Acontece em todos os aparelhos?", desc: "Queda simultânea aponta para roteador ou provedor. Queda isolada aponta para o aparelho." },
          { titulo: "Também acontece por cabo?", desc: "Se o cabo cai junto, o problema não é o sinal sem fio — é o enlace ou o equipamento à frente." },
          { titulo: "É sempre no mesmo cômodo?", desc: "Restrição geográfica dentro da casa é cobertura, e cobertura não se resolve trocando de plano." },
          { titulo: "O roteador reinicia sozinho?", desc: "Luzes que apagam e voltam indicam travamento ou alimentação, não configuração." },
          { titulo: "A rede some ou fica sem internet?", desc: "Sumir é enlace sem fio. Ficar sem internet mantendo conexão é camada seguinte." },
        ],
        fecho: {
          antes: "Se a conexão se mantém e o incômodo é a velocidade, o caminho certo é ",
          to: "/solucoes/diagnostico",
          anchor: "medir cabo contra Wi-Fi antes de concluir qualquer coisa",
          depois: ".",
        },
      },
      {
        id: "4e-nao-conecta",
        titulo: "Quando o notebook simplesmente não conecta",
        intro: "Aqui a pergunta não é velocidade: é por que a associação com a rede falha.",
        itens: [
          { titulo: "Outros aparelhos conectam?", desc: "Se sim, o roteador está publicando a rede e o problema é local: adaptador, driver ou perfil salvo." },
          { titulo: "A rede aparece na lista?", desc: "Rede invisível pode estar oculta, em faixa que o adaptador não enxerga ou com o rádio desligado no próprio notebook." },
          { titulo: "Pede senha e recusa?", desc: "Perfil antigo guardado depois de troca de senha é a causa mais comum. Remover a rede salva e reconectar resolve." },
          { titulo: "Conecta e cai em segundos?", desc: "Costuma ser gerenciamento de energia da placa ou driver genérico instalado pelo próprio Windows." },
          { titulo: "Nenhuma rede aparece?", desc: "Adaptador desabilitado, tecla de rádio desligada ou hardware com defeito — nesse ponto o caso deixa de ser configuração." },
        ],
        fecho: {
          antes: "Quando o aparelho conecta mas nada abre, o diagnóstico continua em ",
          to: "/servicos/redes-e-wifi",
          anchor: "verificação por camadas da rede",
          depois: ".",
        },
      },
    ],
    fontes: [
      {
        titulo: "Microsoft — Corrigir problemas de conexão Wi-Fi no Windows",
        url: "https://support.microsoft.com/pt-br/windows/corrigir-problemas-de-conex%C3%A3o-wi-fi-no-windows-9424a1f7-6a3b-65a6-4d78-7f07eee84d2c",
        nota: "Procedimento oficial para perfil de rede, driver e adaptador.",
      },
      {
        titulo: "Wi-Fi Alliance — Como o Wi-Fi funciona",
        url: "https://www.wi-fi.org/discover-wi-fi",
        nota: "Referência do consórcio que define o padrão.",
      },
    ],
  },

  "/solucoes/diagnostico": {
    respostaRapida:
      "Internet lenta e Wi-Fi lento não são a mesma coisa, e confundir as duas custa dinheiro: gente aumenta o plano quando o gargalo era o cômodo, e troca o roteador quando o gargalo era o provedor. A medição que separa uma coisa da outra é simples e leva minutos: faça o mesmo teste duas vezes no mesmo horário, uma vez com o computador ligado por cabo no roteador e outra por Wi-Fi, no lugar onde você realmente usa. Cabo rápido e Wi-Fi lento fecham o caso na rede sem fio. Os dois lentos empurram a investigação para o roteador, o modem ou o provedor. Só um aparelho lento, com os outros normais, aponta para aquele equipamento — driver, disco cheio, atualização em segundo plano ou programa consumindo banda.",
    tabelaDiagnostica: {
      titulo: "Duas medições que decidem onde está o gargalo",
      colunas: { sintoma: "Resultado da medição", causa: "Leitura provável", verificar: "Confirmação", acao: "Encaminhamento" },
      linhas: [
        {
          sintoma: "Cabo rápido, Wi-Fi lento",
          causa: "Enlace sem fio: distância, obstáculo, faixa ou canal",
          verificar: "Repetir o Wi-Fi ao lado do roteador",
          acao: "Tratar cobertura antes de pensar em plano maior",
        },
        {
          sintoma: "Cabo e Wi-Fi lentos",
          causa: "Roteador, modem ou entrega do provedor",
          verificar: "Teste com o computador ligado direto no modem",
          acao: "Se persistir no modem, registrar com a operadora",
        },
        {
          sintoma: "Só um aparelho lento",
          causa: "Equipamento: driver, disco, atualização ou programa em segundo plano",
          verificar: "Segundo aparelho no mesmo ponto e horário",
          acao: "Diagnóstico da máquina, não da rede",
        },
        {
          sintoma: "Número alto e chamada travando",
          causa: "Latência e variação, não falta de banda",
          verificar: "Observar atraso e estabilidade durante a chamada",
          acao: "Priorizar cabo ou aproximar do roteador nas reuniões",
        },
        {
          sintoma: "Lento só no fim do dia",
          causa: "Saturação no horário de pico",
          verificar: "Mesmo teste de manhã cedo",
          acao: "Comparar histórico antes de trocar equipamento",
        },
      ],
    },
    tabelaExtra: {
      titulo: "Unidades e sinais que costumam ser mal lidos",
      colunas: { sintoma: "O que você vê", causa: "O que significa", verificar: "Comparação correta", acao: "Conclusão possível" },
      linhas: [
        {
          sintoma: "Plano de 400 Mbps",
          causa: "Megabits por segundo, unidade contratual",
          verificar: "Dividir por oito para estimar MB/s",
          acao: "Download perto de 50 MB/s já é coerente com o plano",
        },
        {
          sintoma: "Download em MB/s no navegador",
          causa: "Megabytes por segundo, unidade de arquivo",
          verificar: "Multiplicar por oito para comparar com o plano",
          acao: "Evita concluir que o plano não entrega o contratado",
        },
        {
          sintoma: "Latência alta com banda folgada",
          causa: "Tempo de resposta ruim, capacidade sobrando",
          verificar: "Testar chamada e navegação simples lado a lado",
          acao: "Aumentar plano não muda esse sintoma",
        },
        {
          sintoma: "Site não abre, aplicativo funciona",
          causa: "Resolução de nomes falhando com conexão ativa",
          verificar: "Abrir o mesmo endereço em outra rede",
          acao: "Investigar DNS pontualmente, sem tratá-lo como cura geral",
        },
      ],
    },
    blocos: [
      {
        id: "4e-medicao-correta",
        titulo: "Como medir sem tirar conclusão errada",
        itens: [
          { titulo: "Meça duas vezes, no mesmo minuto", desc: "Cabo e Wi-Fi separados por poucos minutos comparam o mesmo estado da rede. Testes em dias diferentes não comparam nada." },
          { titulo: "Meça onde você usa", desc: "Teste feito ao lado do roteador descreve o roteador, não a sua mesa. Repita no ponto real de trabalho." },
          { titulo: "Use mais de um aparelho", desc: "Um único aparelho lento pode ser problema dele. Dois aparelhos lentos no mesmo ponto já é rede." },
          { titulo: "Olhe latência, não só velocidade", desc: "Reunião, jogo e acesso remoto dependem de resposta rápida e estável, e isso não aparece no número grande do teste." },
          { titulo: "Repita em horários diferentes", desc: "Pico e madrugada expõem saturação. Sem essa comparação, sobra impressão e falta evidência." },
        ],
        fecho: {
          antes: "Se a medição apontar cobertura, o passo seguinte é ",
          to: "/equipamentos/roteador",
          anchor: "ajustar posição, faixa e canal do roteador",
          depois: ".",
        },
      },
      {
        id: "4e-camadas",
        titulo: "Diagnóstico por camadas, na ordem que economiza tempo",
        intro: "A ordem importa: cada etapa elimina um conjunto inteiro de suspeitas.",
        itens: [
          { titulo: "1. Equipamento", desc: "Só aquele aparelho falha? Então a rede não é o assunto." },
          { titulo: "2. Conexão local", desc: "Ele recebeu endereço do roteador ou está com configuração inválida?" },
          { titulo: "3. Wi-Fi ou cabo", desc: "Trocar o meio de conexão separa enlace sem fio de tudo o mais." },
          { titulo: "4. Roteador", desc: "Painel responde, firmware atual, quantos aparelhos disputando." },
          { titulo: "5. Modem e provedor", desc: "Teste direto no modem tira o roteador da equação." },
          { titulo: "6. Serviço externo", desc: "Um site fora do ar não é a sua internet caindo." },
        ],
      },
    ],
    fontes: [
      {
        titulo: "Anatel — Brasileirão da Banda Larga e medição de qualidade",
        url: "https://www.gov.br/anatel/pt-br",
        nota: "Órgão regulador brasileiro; referência para reclamação de entrega do plano.",
      },
      {
        titulo: "Wi-Fi Alliance — Wi-Fi CERTIFIED e desempenho",
        url: "https://www.wi-fi.org/discover-wi-fi",
      },
    ],
  },

  "/equipamentos/roteador": {
    respostaRapida:
      "Cobertura ruim quase nunca se resolve pelo plano contratado: resolve-se por posição, faixa e caminho até o ponto distante. Roteador no canto da casa, dentro de rack fechado, atrás da televisão ou no chão perde parte do alcance útil antes de qualquer ajuste. Depois vem a escolha de faixa: 2,4 GHz atravessa mais parede com menos velocidade e mais interferência; 5 GHz entrega mais velocidade e perde força rápido com obstáculo. Quando reposicionar não basta, existe uma hierarquia honesta de soluções — cabo até o ponto distante funciona melhor que qualquer sistema sem fio, ponto de acesso alimentado por cabo vem em seguida, mesh resolve bem quando não há como passar cabo, e repetidor é o último recurso porque amplifica também a limitação do sinal que recebeu. Segurança entra no mesmo ajuste: senha exclusiva, WPA2 ou WPA3 conforme o equipamento suportar, firmware atualizado e rede de convidados separada para visitas e aparelhos de automação.",
    tabelaDiagnostica: {
      titulo: "Soluções de cobertura: quando ajudam e onde param",
      colunas: { sintoma: "Solução", causa: "Quando ajuda", verificar: "Limitação real", acao: "Recomendação" },
      linhas: [
        {
          sintoma: "Reposicionar o roteador",
          causa: "Equipamento em canto, no chão ou dentro de móvel fechado",
          verificar: "Nenhuma; é o primeiro teste e não custa nada",
          acao: "Sempre tentar antes de comprar equipamento",
        },
        {
          sintoma: "Ativar e separar as faixas",
          causa: "Aparelhos próximos travados em 2,4 GHz",
          verificar: "Não cria alcance onde não há sinal",
          acao: "Ajuste de configuração, sem custo",
        },
        {
          sintoma: "Cabo até o ponto distante",
          causa: "Cômodo com uso pesado e obra possível",
          verificar: "Exige passagem de cabo",
          acao: "Melhor resultado por real investido",
        },
        {
          sintoma: "Ponto de acesso com cabo",
          causa: "Segundo andar ou área externa",
          verificar: "Depende do cabo até ele",
          acao: "Indicado para escritório e casa grande",
        },
        {
          sintoma: "Sistema mesh",
          causa: "Sem possibilidade de passar cabo",
          verificar: "Enlace entre nós consome banda; nó longe do principal repete o problema",
          acao: "Funciona bem com nós bem posicionados, não em qualquer lugar",
        },
        {
          sintoma: "Repetidor simples",
          causa: "Área pequena com sinal ainda razoável",
          verificar: "Costuma reduzir a velocidade e herda o sinal fraco de entrada",
          acao: "Último recurso, nunca a primeira compra",
        },
      ],
    },
    blocos: [
      {
        id: "4e-config-segura",
        titulo: "Configuração que não abre porta desnecessária",
        intro: "Ajustes que aumentam estabilidade sem enfraquecer a rede.",
        itens: [
          { titulo: "Senha exclusiva da rede", desc: "Senha do Wi-Fi não deve repetir senha de e-mail ou banco. Vazamento de uma não pode entregar as outras." },
          { titulo: "WPA2 ou WPA3", desc: "Use o mais recente que o roteador e os aparelhos suportarem. Modos abertos ou antigos só entram como diagnóstico temporário, nunca como solução." },
          { titulo: "Firmware em dia", desc: "Atualize pelo painel oficial do equipamento. Correções de estabilidade e de segurança chegam por aí." },
          { titulo: "Rede de convidados", desc: "Visitas, câmeras e automação em rede separada reduzem o alcance de um aparelho comprometido." },
          { titulo: "Troca do nome padrão", desc: "Nome que revela modelo facilita ataque dirigido. Trocar leva um minuto." },
          { titulo: "Acesso administrativo", desc: "Senha do painel diferente da senha do Wi-Fi, e administração remota desligada quando não for usada." },
        ],
        fecho: {
          antes: "Se depois de ajustar tudo a rede continuar caindo, o sintoma pertence a ",
          to: "/problemas/wifi-instavel",
          anchor: "quedas recorrentes de conexão",
          depois: ".",
        },
      },
      {
        id: "4e-posicao",
        titulo: "Posição: o ajuste mais barato e o mais ignorado",
        itens: [
          { titulo: "Altura", desc: "Equipamento acima da altura dos móveis distribui melhor do que no chão ou embaixo da mesa." },
          { titulo: "Centro da área usada", desc: "Sinal se espalha em todas as direções; roteador na parede da frente joga metade da cobertura para a rua." },
          { titulo: "Longe de metal e água", desc: "Espelho, armário metálico, caixa d'água e eletrodomésticos são as piores vizinhanças possíveis." },
          { titulo: "Fora de rack fechado", desc: "Rack e nicho de alvenaria abafam o sinal e ainda esquentam o equipamento, o que gera travamento." },
        ],
      },
    ],
    fontes: [
      {
        titulo: "CISA — Home Network Security",
        url: "https://www.cisa.gov/news-events/news/home-network-security",
        nota: "Recomendações oficiais de segurança para rede doméstica.",
      },
      {
        titulo: "Wi-Fi Alliance — WPA3",
        url: "https://www.wi-fi.org/discover-wi-fi/security",
      },
    ],
  },

  "/servicos/redes-e-wifi": {
    respostaRapida:
      "Quando o aparelho mostra conectado e nada abre, o Wi-Fi já fez o trabalho dele: a falha está em alguma camada adiante. O atendimento começa exatamente aí, verificando na ordem se o aparelho recebeu endereço válido, se o roteador responde, se o modem mantém enlace com o provedor e se a resolução de nomes está respondendo. Essa sequência evita o desperdício clássico de formatar um computador por causa de um modem sem sincronismo. Em Curitiba e São José dos Pinhais, parte disso é resolvida sem visita — configuração, ajuste de faixa, perfil de rede e verificação inicial. Cabeamento, ponto de acesso, tomada de rede e substituição de equipamento exigem presença, e o escopo com o custo de deslocamento é informado antes de qualquer execução.",
    tabelaDiagnostica: {
      titulo: "Conectado, mas sem internet: o que cada estado significa",
      colunas: { sintoma: "Estado observado", causa: "Significado provável", verificar: "Próxima verificação", acao: "Encaminhamento" },
      linhas: [
        {
          sintoma: "Sem endereço válido do roteador",
          causa: "Distribuição automática de endereços falhando",
          verificar: "Outro aparelho recebe endereço normalmente?",
          acao: "Ajuste no roteador; se geral, reinício controlado do equipamento",
        },
        {
          sintoma: "Endereço válido, roteador não responde",
          causa: "Roteador travado ou rota interna quebrada",
          verificar: "Painel do roteador abre pelo navegador?",
          acao: "Firmware e, se recorrente, substituição",
        },
        {
          sintoma: "Roteador responde, modem sem enlace",
          causa: "Falha entre modem e provedor",
          verificar: "Luz de sinal do modem estável?",
          acao: "Chamado na operadora com evidência do que já foi testado",
        },
        {
          sintoma: "Tudo responde, sites não abrem",
          causa: "Resolução de nomes indisponível",
          verificar: "Mesmo site abre em rede móvel?",
          acao: "Ajuste pontual de DNS, sem generalizar",
        },
        {
          sintoma: "Só um serviço fora",
          causa: "Indisponibilidade do serviço externo",
          verificar: "Outros sites e aplicativos funcionam",
          acao: "Nada a corrigir na rede local",
        },
        {
          sintoma: "Falha ao entrar em rede de hotel ou café",
          causa: "Página de autenticação não carregou",
          verificar: "Abrir um endereço simples para forçar a tela de login",
          acao: "Autenticar antes de concluir que a rede está com defeito",
        },
      ],
    },
    blocos: [
      {
        id: "4e-residencial-empresarial",
        titulo: "Rede residencial e rede de escritório pedem projetos diferentes",
        intro: "Não é questão de marca: é quantidade de aparelhos e exigência de continuidade.",
        itens: [
          { titulo: "Residencial", desc: "Um roteador bem posicionado cobre a maior parte dos casos: streaming, home office e uma impressora compartilhada." },
          { titulo: "Escritório", desc: "Muitos aparelhos simultâneos saturam um roteador doméstico. A saída é dividir cobertura em pontos de acesso alimentados por cabo." },
          { titulo: "Impressora compartilhada", desc: "Impressora que some da rede quase sempre está com endereço variável. Endereço fixo resolve um chamado recorrente." },
          { titulo: "Continuidade", desc: "Onde parada custa faturamento, vale prever caminho alternativo de conexão — e isso é decisão de negócio, não de equipamento." },
        ],
        fecho: {
          antes: "Empresas com parque maior costumam tratar isso dentro de ",
          to: "/servicos/suporte-tecnico-empresarial",
          anchor: "suporte técnico empresarial contínuo",
          depois: ".",
        },
      },
      {
        id: "4e-atendimento-local",
        titulo: "Como o atendimento acontece em Curitiba e São José dos Pinhais",
        itens: [
          { titulo: "Triagem primeiro", desc: "Descrever o sintoma e responder três perguntas de contexto costuma reduzir o tempo de visita pela metade." },
          { titulo: "Remoto quando é configuração", desc: "Perfil de rede, faixa, DNS e impressora podem ser tratados sem deslocamento." },
          { titulo: "Presencial quando é físico", desc: "Cabo, tomada de rede, ponto de acesso e troca de equipamento exigem alguém no local." },
          { titulo: "Escopo antes da execução", desc: "Valor de mão de obra, deslocamento e peça são apresentados antes; nada é executado por suposição." },
        ],
        fecho: {
          antes: "Para entender o que vale começar sem visita, veja ",
          to: "/atendimento-remoto",
          anchor: "como funciona o suporte remoto",
          depois: ".",
        },
      },
    ],
    fontes: [
      {
        titulo: "Microsoft — Solucionar problemas de conexão de rede no Windows",
        url: "https://support.microsoft.com/pt-br/windows/corrigir-problemas-de-conex%C3%A3o-wi-fi-no-windows-9424a1f7-6a3b-65a6-4d78-7f07eee84d2c",
      },
      {
        titulo: "CISA — Securing Network Infrastructure Devices",
        url: "https://www.cisa.gov/news-events/news/securing-network-infrastructure-devices",
      },
    ],
  },

  "/atendimento-remoto": {
    respostaRapida:
      "A decisão entre remoto e presencial não é preferência: é o tipo de falha que define. Se o computador liga, entra no sistema e tem conexão, quase tudo que é software resolve à distância — Windows, driver, e-mail, navegador, impressora, configuração e diagnóstico inicial. Se a falha é física, remoto não alcança: máquina que não liga, tela sem imagem, peça com defeito, cabo rompido, ponto de rede e problema elétrico exigem alguém no local. Existe também o caso intermediário, e ele é o mais comum: começa remoto para descobrir o que está acontecendo e, se for hardware, você já chega ao agendamento sabendo o que precisa. Sessão remota segura tem regra: você autoriza informando um código gerado na hora, acompanha a tela do início ao fim e o acesso é encerrado ao final, sem programa deixado ativo esperando conexão futura.",
    tabelaDiagnostica: {
      titulo: "Remoto ou presencial: decisão por tipo de problema",
      colunas: { sintoma: "Problema", causa: "Remoto", verificar: "Presencial", acao: "Motivo" },
      linhas: [
        { sintoma: "Windows travando ou com erro", causa: "Sim", verificar: "Raramente", acao: "É software; a sessão alcança o sistema inteiro" },
        { sintoma: "E-mail ou navegador com falha", causa: "Sim", verificar: "Não", acao: "Configuração e perfil se ajustam à distância" },
        { sintoma: "Impressora não imprime", causa: "Na maior parte", verificar: "Se for cabo ou peça", acao: "Driver e fila resolvem remoto; mecânica não" },
        { sintoma: "Computador não liga", causa: "Não", verificar: "Sim", acao: "Sem sistema no ar não há sessão possível" },
        { sintoma: "Sem imagem na tela", causa: "Não", verificar: "Sim", acao: "Exige teste com outro monitor e outra peça" },
        { sintoma: "Troca de SSD ou memória", causa: "Não", verificar: "Sim", acao: "Intervenção física obrigatória" },
        { sintoma: "Internet caindo", causa: "Limitado", verificar: "Frequente", acao: "Sessão remota cai junto com a conexão" },
        { sintoma: "Ponto de rede ou cabeamento", causa: "Não", verificar: "Sim", acao: "Depende de infraestrutura no local" },
      ],
    },
    blocos: [
      {
        id: "4e-sessao-segura",
        titulo: "Como uma sessão remota legítima funciona",
        intro: "Cinco condições que separam atendimento sério de acesso indevido.",
        itens: [
          { titulo: "Autorização explícita", desc: "O acesso só começa quando você informa um código gerado no momento, no seu computador. Ninguém entra sem esse passo." },
          { titulo: "Ferramenta conhecida", desc: "Programa de suporte legítimo, baixado do site oficial do fabricante — nunca um arquivo enviado por mensagem de origem desconhecida." },
          { titulo: "Você acompanha a tela", desc: "Tudo o que é feito aparece no seu monitor. Sessão que pede para você se afastar ou desligar a tela não é atendimento." },
          { titulo: "Sessão temporária", desc: "O acesso vale para aquele atendimento. Ao encerrar, o código deixa de funcionar." },
          { titulo: "Nada de senha desnecessária", desc: "Configuração de sistema não exige senha de banco, código de autenticação nem acesso a aplicativo financeiro." },
        ],
      },
      {
        id: "4e-falso-suporte",
        titulo: "Como reconhecer um golpe de falso suporte",
        intro: "O sinal mais confiável é simples: o contato não partiu de você.",
        itens: [
          { titulo: "Ligação que você não pediu", desc: "Empresa legítima não liga avisando que seu computador está infectado. Esse é o roteiro clássico da fraude." },
          { titulo: "Pedido de código recebido por mensagem", desc: "Código de verificação é seu e de mais ninguém. Repassar entrega a conta." },
          { titulo: "Instalação sob pressão", desc: "Urgência artificial existe para impedir você de conferir. Desligue e procure o canal oficial por conta própria." },
          { titulo: "Qualquer assunto financeiro", desc: "Transferência, cartão ou acesso ao banco jamais fazem parte de um atendimento técnico." },
        ],
        fecho: {
          antes: "Quando a origem do problema é a própria conexão, o caminho começa em ",
          to: "/problemas/wifi-instavel",
          anchor: "instabilidade de rede",
          depois: ".",
        },
      },
    ],
    fontes: [
      {
        titulo: "CISA — Avoiding Social Engineering and Phishing Attacks",
        url: "https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks",
      },
      {
        titulo: "Microsoft — Proteja-se contra golpes de suporte técnico",
        url: "https://support.microsoft.com/pt-br/windows/proteja-se-contra-golpes-de-suporte-t%C3%A9cnico-2ebf91bd-f94c-2a8a-e541-f5c800d18435",
      },
    ],
  },
};

/** Conteúdo 4E de um caminho, ou null (fail-closed) quando não é owner. */
export const enriquecimento4e = (path: string): EnriquecimentoConteudo | null =>
  ENRIQUECIMENTO_4E[path as Owner4e] ?? null;

export const faq4e = (path: string): Faq4e[] | null => FAQ_4E[path as Owner4e] ?? null;

export const intencao4e = (path: string): Intencao4e | null =>
  INTENCOES_4E[path as Owner4e] ?? null;

export const isOwner4e = (path: string): path is Owner4e =>
  (OWNERS_4E as readonly string[]).includes(path);
