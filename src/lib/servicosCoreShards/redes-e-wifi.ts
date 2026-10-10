// Extraído do catálogo de serviços para carregar somente os dados desta rota.
// Manter em paridade editorial com SERVICOS_CORE["redes-e-wifi"].
import type { ServicoLandingData } from "@/components/servico/ServicoLandingLayout";
import { PROCESSOS } from "@/lib/servicosProcessos";

const data: ServicoLandingData = {
    path: "redes-e-wifi",
    trackingKey: "redes-wifi",
    metaTitle: "Wi-Fi e Redes em Curitiba | Mesh, Roteador e Cabeamento",
    metaDescription:
      "Wi-Fi e redes em Curitiba: diagnóstico de sinal, roteador, mesh, repetidor, cabeamento e impressora em rede. Medição antes de indicar equipamento.",
    serviceName: "Redes e Wi-Fi",
    serviceDescription:
      "Instalação e configuração de redes e Wi-Fi residenciais e empresariais: roteador, repetidor, cabeamento e estabilidade, em Curitiba e região.",
    eyebrow: "Conectividade em Curitiba",
    h1: "Wi-Fi e redes em Curitiba: diagnóstico, cobertura e cabeamento",
    h1Accent: "internet estável em casa e na empresa",
    intro:
      "Wi-Fi que cai, sinal fraco em alguns cômodos ou rede instável no trabalho? Primeiro separamos cobertura, interferência, roteador, dispositivo e link do provedor. Só depois dessa medição indicamos reposicionamento, mesh, repetidor, cabeamento ou troca de equipamento. Fale pelo WhatsApp para descrever o ambiente e o sintoma.",
    whatsappMessage: "Olá! Preciso melhorar minha rede/Wi-Fi. Podem avaliar?",
    incluso: [
      { title: "Análise do ambiente", desc: "Avaliação de cobertura, interferências e pontos críticos." },
      { title: "Configuração de roteador", desc: "Ajuste de canais, senha, banda e segurança da rede." },
      { title: "Repetidores e mesh", desc: "Ampliação de cobertura para áreas com sinal fraco." },
      { title: "Cabeamento", desc: "Passagem e organização de cabos quando faz sentido." },
      { title: "Rede empresarial", desc: "Segmentação, estabilidade e prioridade de tráfego sob avaliação." },
      { title: "Impressora e periféricos em rede", desc: "Driver oficial, IP fixo, compartilhamento e fila — apenas conectividade, sem reparo do aparelho." },
      { title: "Testes de estabilidade", desc: "Validação de sinal e velocidade nos ambientes de uso." },
    ],
    sinais: [
      "Wi-Fi que cai ou oscila com frequência",
      "Sinal fraco em cômodos ou setores específicos",
      "Dispositivos que não conectam ou conflito de IP",
      "Impressora de rede que some ou não é encontrada",
      "Muitos dispositivos e a rede não aguenta",
      "Rede da empresa instável, insegura ou desorganizada",
    ],
    processo: PROCESSOS["redes-e-wifi"],
    fatoresValor: [
      { title: "Tamanho do ambiente", desc: "Área a cobrir e número de cômodos ou setores." },
      { title: "Equipamentos necessários", desc: "Roteador, repetidores, mesh ou switches conforme o caso." },
      { title: "Cabeamento", desc: "Passagem de cabos e infraestrutura influenciam o serviço." },
      { title: "Complexidade da rede", desc: "Redes empresariais com segmentação exigem mais planejamento." },
      { title: "Urgência", desc: "Prazos curtos podem alterar o agendamento." },
      { title: "Deslocamento", desc: "Atendimento considera a localização em Curitiba e região." },
    ],
    atendimento: {
      residencial:
        "Wi-Fi de casas e apartamentos em Curitiba e região: posicionamento de roteador, repetidores ou mesh para cobrir todos os cômodos com estabilidade.",
      empresarial:
        "Redes de escritórios e pequenas empresas: cabeamento, segmentação simples, impressoras em rede e estabilidade para o trabalho, sob avaliação.",
    },
    faqs: [
      { question: "Meu Wi-Fi não pega em todos os cômodos, o que fazer?", answer: "Avaliamos o ambiente e indicamos posicionamento do roteador, repetidores ou sistema mesh para ampliar a cobertura de forma estável." },
      { question: "Repetidor ou mesh, qual é melhor?", answer: "Depende do ambiente. O mesh costuma oferecer transição mais suave; o repetidor pode resolver casos pontuais. Indicamos o adequado após avaliar." },
      { question: "Vocês configuram a rede da minha empresa?", answer: "Sim. Trabalhamos estabilidade, segurança e organização de redes empresariais, com atendimento pontual ou recorrente conforme o escopo definido após a avaliação." },
      { question: "Por que o Wi-Fi cai em alguns ambientes do escritório?", answer: "Normalmente por distância, parede de concreto, divisórias metálicas, excesso de redes vizinhas na faixa de 2,4 GHz ou por um único roteador tentando cobrir toda a área. A medição no local mostra onde o sinal deixa de ser utilizável." },
      { question: "Um roteador mais potente resolve?", answer: "Nem sempre. Potência não vence obstrução física nem congestionamento de canal. Em escritórios, dois pontos bem posicionados costumam entregar mais estabilidade do que um equipamento isolado mais caro." },
      { question: "É necessário instalar cabeamento?", answer: "Depende do layout e do uso. Quando existe passagem viável, levar cabo até o ponto distante é a solução mais estável para setores fixos. Onde não há infraestrutura, avaliamos alternativas sem prometer obra civil." },
      { question: "É possível separar redes de funcionários e visitantes?", answer: "Sim, quando o equipamento suporta rede de visitantes ou segmentação básica. É uma separação de uso, não uma solução completa de segurança corporativa." },
      { question: "Vocês configuram impressoras de rede?", answer: "Sim, dentro do escopo de conectividade: instalação do driver oficial, endereço IP fixo, compartilhamento entre as estações, fila de impressão, descoberta na rede, digitalização em rede quando o modelo suporta e reconexão após troca de roteador. O atendimento de impressoras e periféricos nesta página se limita à configuração, comunicação e compartilhamento em rede. Defeitos mecânicos ou eletrônicos dependem de assistência específica para o equipamento." },
      { question: "Vocês consertam impressora com defeito?", answer: "Não. Reparo mecânico, troca de cabeçote, recarga, manutenção de fusor, reparo eletrônico, conserto de placa e manutenção de plotter estão fora do escopo, assim como o fornecimento de toner e tinta. Se a avaliação apontar falha física do aparelho, informamos e orientamos a assistência do fabricante." },
      { question: "Dá para compartilhar uma pasta ou um disco na rede?", answer: "Sim, para compartilhamento simples entre os computadores do ambiente ou disco ligado ao roteador, dentro do que a estrutura atual permite. Servidor de arquivos com permissões por setor é escopo do suporte técnico empresarial." },
      { question: "Passam cabo de rede?", answer: "Quando faz sentido para estabilidade, avaliamos e realizamos o cabeamento e a organização dos pontos." },
      { question: "O valor pode ser definido sem avaliar o local?", answer: "Não para ambientes empresariais. Cobertura, número de pontos e infraestrutura existente só ficam claros com levantamento no local ou com informações detalhadas da planta e do uso." },
      { question: "Equipamentos estão incluídos?", answer: "Roteadores, access points, switches e cabos são tratados como material à parte. Informamos o que é necessário antes da execução e você decide se fornece ou se compramos conforme autorização." },
      { question: "A internet continua lenta, é problema de Wi-Fi?", answer: "Pode ser Wi-Fi, roteador, quantidade de dispositivos ou o próprio plano. O diagnóstico separa o que é rede local do que é o provedor — falhas da operadora fogem ao nosso reparo." },
      { question: "Scanner, leitor e outros periféricos em rede entram no escopo?", answer: "Entram como dispositivos em rede: reconhecimento pelas estações, driver oficial do fabricante, endereço fixo quando o modelo permite, compartilhamento e digitalização em rede. Não fazemos reparo mecânico nem eletrônico desses aparelhos, e limpeza interna, troca de peça, correia, sensor ou placa seguem para a assistência do próprio fabricante." },
      { question: "Câmeras IP e NAS podem ser configurados junto com a rede?", answer: "Sim, na parte de rede: endereçamento, acesso na rede local, separação do tráfego quando o equipamento suporta e ajuste do roteador para que os dispositivos se enxerguem. Instalação física, infraestrutura de energia, suporte de fixação e reparo do aparelho não fazem parte deste serviço." },
      { question: "Por que a impressora some da rede depois de trocar o roteador?", answer: "Quase sempre porque o endereço do aparelho mudou ou a rede recebeu outro nome e senha. A correção é reservar um endereço fixo para a impressora e reapontar as estações — é configuração de rede, não defeito do equipamento." },
    ],
    relacionados: [
      { label: "Suporte técnico empresarial", to: "/servicos/suporte-tecnico-empresarial" },
      { label: "Suporte para home office", to: "/servicos/suporte-home-office" },
      { label: "Equipamentos atendidos", to: "/equipamentos-atendidos" },
      { label: "Empresa de TI em Curitiba", to: "/empresa-de-ti-curitiba" },
      { label: "Manutenção preventiva para empresas", to: "/servicos/manutencao-preventiva-empresas" },
      { label: "Backup para empresas", to: "/servicos/backup-para-empresas" },
      { label: "Atendimento em domicílio", to: "/atendimento-domicilio" },
      { label: "Atendimento remoto", to: "/atendimento-remoto" },
      ...[
  { label: "Preços e políticas", to: "/precos-e-politicas" },
  { label: "Como funciona", to: "/como-funciona" },
  { label: "Dúvidas frequentes", to: "/faq" },
],
    ],
    blocoLocal: [
      {
        titulo: "Por que o Wi-Fi cai em parte da casa (e o repetidor nem sempre resolve)",
        paragrafos: [
          "A queixa mais comum não é falta de internet, é falta de cobertura. O roteador costuma ficar onde o cabo da operadora entrou — hall, área de serviço, atrás da TV — e o sinal ainda precisa atravessar parede de concreto, laje, caixa d'água e espelho. Em imóveis alongados ou sobrados de Curitiba, o resultado é sempre o mesmo: sala com sinal cheio e quarto dos fundos com conexão que cai na videochamada.",
          "Repetidor pode reduzir o throughput disponível quando usa o mesmo rádio para receber e retransmitir, e o resultado piora se ele for instalado onde o sinal de origem já chega fraco. Por isso medimos antes de indicar equipamento — em alguns cenários, reposicionar o roteador ou ajustar canal e banda resolve sem adicionar hardware.",
          "Em prédios com muitas redes vizinhas, a faixa de 2,4 GHz pode ficar congestionada. Separar bandas, revisar canais e priorizar 5 GHz para dispositivos compatíveis e próximos pode melhorar estabilidade sem exigir troca imediata de equipamento.",
        ],
      },
      {
        titulo: "Quando mesh e cabo valem o investimento",
        paragrafos: [
          "Mesh faz sentido quando existem dois ou três ambientes distantes com uso pesado ao mesmo tempo: home office com reunião por vídeo, TV em streaming e alguém jogando. Os nós conversam entre si e o aparelho troca de ponto sem derrubar a chamada.",
          "Quando há passagem de cabo possível — conduíte livre, forro acessível, canaleta discreta — levar um ponto cabeado até o nó distante é a melhor decisão de custo-benefício: a rede fica estável mesmo com a casa cheia de dispositivos. Explicamos essa alternativa antes de vender equipamento a mais.",
          "Também deixamos claro o limite honesto: se o plano contratado entrega pouca banda ou a fibra chega instável, nenhum roteador conserta. Nesse caso o problema é da operadora e orientamos como registrar a reclamação com medição em mãos.",
        ],
      },
      {
        titulo: "Rede de escritório: cobertura, compartilhamento e continuidade do trabalho",
        paragrafos: [
          "Em empresa o sintoma muda de figura. Não é uma videochamada travando: é o sistema de gestão perdendo conexão no meio do lançamento, a impressora sumindo da lista de dispositivos, o arquivo compartilhado abrindo lento e cinco pessoas paradas ao mesmo tempo. Por isso o levantamento em escritório começa pelo mapa de uso — quantos usuários, onde ficam, quais aplicações dependem da rede e quais setores não podem parar.",
          "Divisórias metálicas, forro técnico, salas de reunião fechadas e vizinhança densa de redes fazem o ponto único de Wi-Fi entregar bem apenas no raio próximo. A saída realista costuma ser distribuir cobertura em dois ou três pontos, cabear os setores fixos e reservar o Wi-Fi para notebooks e celulares, mantendo caixa, servidor local e impressora principal em conexão cabeada.",
          "Também tratamos a parte esquecida: rede de visitantes separada da rede de trabalho, senha de administração dos equipamentos alterada, firmware atualizado, endereços fixos para impressoras e um registro simples do que existe — modelo dos equipamentos, onde está cada ponto e como a rede foi configurada. Sem essa documentação básica, todo atendimento futuro recomeça do zero.",
          "O limite fica explícito antes de começar: não prometemos cobertura perfeita em toda a área, disponibilidade ininterrupta, certificação de cabeamento que não executamos nem administração de equipamentos corporativos fora do que conseguimos suportar. Projetos de maior porte só são discutidos após vistoria no local.",
        ],
      },
      {
        titulo: "Impressoras e periféricos conectados à rede",
        paragrafos: [
          "O atendimento de impressoras e periféricos nesta página se limita à configuração, comunicação e compartilhamento em rede. Defeitos mecânicos ou eletrônicos dependem de assistência específica para o equipamento. Isso significa que trabalhamos com o aparelho que já funciona e precisa ser encontrado, compartilhado ou reconectado — não com reparo do equipamento em si.",
          "O que resolvemos: impressora já funcional que sumiu da rede, compartilhamento entre os computadores da casa ou do escritório, instalação do driver oficial do fabricante, fila de impressão travada, endereço IP fixo para o aparelho parar de trocar de número, descoberta na rede quando um computador enxerga e o outro não, comunicação entre dispositivos e reconexão depois da troca de roteador ou de senha do Wi-Fi. Quando o modelo suporta, também configuramos a conexão Wi-Fi do próprio aparelho e a digitalização em rede.",
          "Armazenamento simples em rede — uma pasta compartilhada entre as estações ou um disco ligado ao roteador — entra no mesmo escopo de conectividade, dentro do que a estrutura atual permite. Estruturas maiores, com servidor de arquivos e controle de permissões por setor, são avaliadas no suporte técnico empresarial.",
          "O que está fora, sem exceção: reparo mecânico, troca de cabeçote, recarga, manutenção de fusor, reparo eletrônico, conserto de placa, manutenção de plotter, suporte universal a equipamento antigo e fornecimento de toner ou tinta. Se a avaliação indicar falha física do aparelho, dizemos isso com clareza e orientamos a procurar a assistência do fabricante, em vez de cobrar por uma tentativa que não resolve.",
        ],
      },
      {
        titulo: "O que fica configurado e o que não está incluído",
        paragrafos: [
          "Entregamos senha forte com WPA2/WPA3, nome de rede padronizado, bandas organizadas, canal escolhido por medição, rede de visitantes separada dos dispositivos da casa, firmware atualizado e senha de administração do roteador alterada — este último ponto é o mais esquecido e o mais explorado por invasores.",
          "Não está incluído: obra civil, quebra de parede, instalação de infraestrutura nova de conduíte, contrato com a operadora e suporte a equipamento em falha de fábrica. Câmeras, automação e servidores entram como escopo à parte, avaliado na triagem.",
        ],
      },
    ],
    linksLocais: [
      { label: "Atendimento técnico em Curitiba", to: "/tecnico-informatica-curitiba" },
      { label: "Técnico no seu endereço", to: "/atendimento-domicilio" },
      { label: "Suporte para empresas", to: "/empresa-de-ti-curitiba" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
    ],
    dateModified: "2026-09-26",
  };

export default data;
