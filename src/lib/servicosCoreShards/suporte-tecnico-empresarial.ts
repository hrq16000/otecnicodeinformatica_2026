import type { ServicoLandingData } from "@/components/servico/ServicoLandingLayout";
import { PROCESSOS } from "@/lib/servicosProcessos";

const data: ServicoLandingData = {
    path: "suporte-tecnico-empresarial",
    trackingKey: "suporte-empresarial",
    metaTitle: "Suporte Técnico Empresarial | Help Desk e Assistência de TI",
    metaDescription:
      "Suporte técnico empresarial e help desk: estações, usuários, rede, impressoras, backup, acesso remoto e atendimento avulso ou recorrente com escopo definido.",
    serviceName: "Suporte Técnico Empresarial",
    serviceDescription:
      "Suporte de informática para empresas: estações, rede, impressoras, backups e manutenção preventiva, com atendimento pontual ou recorrente conforme escopo e modalidade.",
    eyebrow: "Suporte para empresas",
    h1: "Suporte técnico empresarial e help desk para empresas",
    h1Accent: "menos paradas, mais previsibilidade",
    intro:
      "Suporte técnico empresarial organiza incidentes de estações, usuários, rede, impressão, backup e acesso a sistemas sem confundir help desk avulso com contrato recorrente. Esta página explica escopo, modalidades, limites e triagem; a contratação local por cidade permanece nas páginas específicas.",
    whatsappMessage: "Olá! Preciso de suporte técnico de informática para uma empresa.",
    incluso: [
      { title: "Estações de trabalho", desc: "Manutenção e configuração dos computadores da equipe." },
      { title: "Rede e conectividade", desc: "Estabilidade, segurança e organização da rede interna." },
      { title: "Impressoras", desc: "Instalação, compartilhamento e solução de problemas de impressão." },
      { title: "Rotinas de backup", desc: "Estruturação de backup para reduzir risco de perda de dados." },
      { title: "Manutenção preventiva", desc: "Rotinas para evitar falhas e paradas inesperadas." },
      { title: "Atendimento recorrente", desc: "Planos de acompanhamento sob consulta, conforme a necessidade." },
    ],
    sinais: [
      "Estações de trabalho lentas ou instáveis",
      "Falhas recorrentes que atrapalham a operação",
      "Usuários sem acesso a arquivos, rede ou impressão",
      "Rede interna caindo e afetando o trabalho",
      "Computadores sem manutenção preventiva",
      "Necessidade de suporte remoto ou presencial recorrente",
    ],
    processo: PROCESSOS["suporte-tecnico-empresarial"],
    fatoresValor: [
      { title: "Quantidade de estações", desc: "Número de computadores e usuários atendidos." },
      { title: "Complexidade da rede", desc: "Infraestrutura, servidores locais e segmentação." },
      { title: "Escopo do serviço", desc: "Atendimento pontual, projeto específico ou acompanhamento recorrente." },
      { title: "Rotinas de backup", desc: "Estruturar e manter backups influencia o escopo." },
      { title: "Impacto operacional", desc: "Chamados que bloqueiam faturamento, acesso ou trabalho de várias pessoas recebem prioridade conforme agenda e escopo contratado." },
      { title: "Deslocamento", desc: "Quando o atendimento é presencial, localização e modalidade são consideradas antes do agendamento." },
    ],
    atendimento: {
      residencial:
        "Também atendemos profissionais autônomos e home office que dependem do computador para trabalhar, com o mesmo cuidado de diagnóstico e prevenção.",
      empresarial:
        "Suporte a micro e pequenas empresas: estações, rede, impressoras, backups e manutenção preventiva, com atendimento pontual ou recorrente sob consulta.",
    },
    faqs: [
      { question: "O suporte pode ser contratado uma única vez?", answer: "Sim. O atendimento avulso resolve uma demanda específica — máquina parada, usuário sem acesso, impressora fora do ar — sem exigir qualquer vínculo recorrente." },
      { question: "Vocês atendem remotamente?", answer: "Sim, para o que não depende de intervenção física: sistema, configuração, acessos, programas, impressão e boa parte dos incidentes de usuário. Falhas de hardware, rede e infraestrutura exigem visita." },
      { question: "O atendimento inclui programas?", answer: "Inclui instalação, configuração e correção de programas compatíveis, desde que a empresa forneça instalador e licença. Não damos suporte ao funcionamento interno de sistemas de terceiros que possuem fabricante próprio." },
      { question: "Peças e componentes estão incluídos no atendimento empresarial?", answer: "Não. Componentes e materiais são tratados à parte, informados antes e substituídos apenas mediante a sua autorização." },
      { question: "Existe prazo garantido?", answer: "Não trabalhamos com prazo de resposta garantido nem plantão. O atendimento é agendado conforme a disponibilidade, e prioridades e prazos, quando aplicáveis, são definidos na contratação do atendimento recorrente." },
      { question: "É possível atender vários computadores?", answer: "Sim. Atendimentos com várias estações são organizados por lote e por prioridade, para que a operação não pare inteira durante o serviço." },
      { question: "Como funciona o faturamento?", answer: "O escopo é definido após o diagnóstico e o valor é apresentado e aprovado antes da execução. As formas de pagamento e as condições aplicáveis estão descritas na página de preços e políticas." },
      { question: "O atendimento empresarial tem garantia?", answer: "Sim, conforme o serviço executado e as condições publicadas em preços e políticas. A garantia cobre o serviço realizado, não novas falhas de causa diferente nem alterações feitas depois da entrega." },
      { question: "Vocês atendem empresas de qual porte?", answer: "Atendemos principalmente autônomos, escritórios, comércios e micro e pequenas empresas, de forma avulsa ou recorrente, dentro da nossa capacidade operacional." },
      { question: "Como funciona o atendimento recorrente?", answer: "Definimos escopo, itens acompanhados e periodicidade conforme a necessidade da empresa. Não é suporte ilimitado: o que está incluído e o que é cobrado à parte fica registrado antes de começar." },
      { question: "Fazem atendimento de emergência?", answer: "Avaliamos situações com operação parada e priorizamos o restabelecimento conforme a disponibilidade da agenda. Não mantemos plantão em regime ininterrupto." },
      { question: "Resolvem problemas de rede e impressão?", answer: "Sim, esses estão entre os chamados mais comuns. Casos que envolvem cobertura, cabeamento ou reestruturação da conectividade são conduzidos pela página de redes e Wi-Fi." },
      { question: "Vocês acessam sistemas e contas de terceiros da empresa?", answer: "Somente quando a empresa autoriza, com credenciais fornecidas por quem tem poder para isso e apenas pelo tempo do atendimento. Atuamos na camada de acesso e configuração local: instalar, conectar, corrigir sessão, ajustar navegador, impressora ou permissão do sistema operacional. Não administramos a conta, não respondemos pelo funcionamento interno da plataforma e não substituímos o suporte do fornecedor dela." },
      { question: "Quem responde quando o problema está no sistema do fornecedor?", answer: "O fornecedor. Nós identificamos e registramos que a falha está fora do computador — servidor do fabricante fora do ar, atualização do sistema, licença vencida, regra de acesso alterada — e entregamos essa constatação por escrito para você acionar quem mantém a plataforma. Não abrimos chamado em nome da empresa sem autorização expressa." },
      { question: "Qual é a diferença entre atendimento avulso e recorrente?", answer: "No avulso o escopo é definido a cada solicitação, a prioridade segue a agenda disponível e o valor é apresentado após o diagnóstico. No recorrente combinamos previamente escopo, itens acompanhados, frequência, horários e regra de prioridade, a partir de um levantamento inicial do ambiente. Nenhum dos dois é automaticamente melhor: depende da quantidade de equipamentos e de quanto a parada custa." },
      { question: "Atendimento recorrente significa suporte ilimitado?", answer: "Não. O recorrente é um acordo delimitado: o que entra no escopo, com que frequência e em quais horários fica registrado antes de começar, e o que fica de fora é tratado à parte. Não trabalhamos com suporte ilimitado, plantão permanente, prazo de resposta garantido nem monitoramento contínuo." },
      { question: "Vocês corrigem problemas dentro de sistemas de terceiros?", answer: "Não. Verificamos o computador, validamos a conectividade, registramos o erro por escrito, executamos procedimentos autorizados e ajudamos na comunicação técnica com o fornecedor. Corrigir código do sistema, liberar licença, redefinir credencial mantida por terceiro ou responder pela indisponibilidade da plataforma externa é responsabilidade de quem mantém o sistema." },
      { question: "Vocês guardam senhas da empresa?", answer: "Não mantemos credenciais depois do atendimento. Recomendamos que a empresa troque a senha usada em qualquer acesso pontual e que credenciais administrativas fiquem sob controle de um responsável interno. Trabalhamos com o mínimo de acesso necessário para resolver o chamado." },
    ],

    relacionados: [
      { label: "Suporte empresarial em Curitiba", to: "/servicos/suporte-tecnico-empresarial/curitiba" },
      { label: "Empresa de TI em Curitiba", to: "/empresa-de-ti-curitiba" },
      { label: "Manutenção preventiva para empresas", to: "/servicos/manutencao-preventiva-empresas" },
      { label: "Backup para empresas", to: "/servicos/backup-para-empresas" },
      { label: "Montagem de PC e workstation", to: "/servicos/montagem-de-pc" },
      { label: "Segurança dos dados", to: "/seguranca-dos-dados" },
      { label: "Redes e Wi-Fi", to: "/servicos/redes-e-wifi" },
      { label: "Suporte remoto", to: "/atendimento-remoto" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
      { label: "Como funciona", to: "/como-funciona" },
    ],
    blocoLocal: [
      {
        titulo: "Avulso, recorrente, remoto e presencial: qual formato resolve o seu caso",
        paragrafos: [
          "O chamado avulso existe para o incidente isolado: uma estação que não inicia, um usuário sem acesso à pasta compartilhada, a impressora que sumiu da rede, o sistema de gestão que parou de abrir em uma máquina. Você descreve o caso na triagem, avaliamos, informamos o valor e executamos após a sua aprovação — sem vínculo posterior.",
          "O atendimento recorrente faz sentido quando a empresa já percebeu que o mesmo tipo de chamado se repete todo mês e que a parada custa mais que a manutenção. Nesse formato combinamos escopo, itens acompanhados, periodicidade e prioridades na contratação. É um acordo delimitado, não suporte ilimitado.",
          "O atendimento remoto resolve o que é software, configuração, acesso e usuário, e costuma ser o caminho mais rápido para desbloquear alguém no meio do expediente. O presencial entra quando a causa é física ou está na infraestrutura: hardware, rede, cabeamento, periférico ou equipamento que sequer inicia.",
          "Na prática as empresas alternam entre os quatro. O que evitamos é vender formato: depois do diagnóstico dizemos qual modalidade resolve a sua demanda, mesmo quando a resposta é a mais barata.",
        ],
      },
      {
        titulo: "Do chamado à entrega: autorização, registro e prioridade",
        paragrafos: [
          "Todo atendimento empresarial começa por uma descrição objetiva do incidente: qual máquina, qual usuário, o que mudou, desde quando e o que já foi tentado. Essa triagem reduz tempo perdido e evita deslocamento que não resolve nada.",
          "Nenhum serviço é executado sem autorização. Apresentamos o que foi encontrado, o que precisa ser feito, o que fica fora do escopo e o valor correspondente. Só depois da sua aprovação a execução começa, e o que foi feito é registrado para consulta futura.",
          "Quando existem vários chamados ao mesmo tempo, a prioridade segue o impacto na operação: máquina que trava o faturamento vem antes de ajuste de conforto. Em atendimento recorrente, essa ordem de prioridade é acordada previamente, para não depender de improviso no dia da urgência.",
          "Sobre dados: durante o suporte trabalhamos com o mínimo de acesso necessário, orientamos sobre cópias antes de intervenções de risco e não movimentamos arquivos da empresa sem alinhamento. Não assumimos responsabilidade sobre dados que já estavam sem cópia antes do atendimento, e o tratamento de informações segue o combinado com a empresa.",
        ],
      },
      {
        titulo: "Sistemas, acessos e contas de terceiros: até onde vai a nossa responsabilidade",
        paragrafos: [
          "Boa parte dos chamados empresariais esbarra em algo que não é do computador: o sistema de gestão hospedado pelo fornecedor, o e-mail contratado de outra empresa, o certificado digital emitido por uma autoridade certificadora, o portal do banco, a plataforma fiscal, o armazenamento em nuvem da equipe. Esses ambientes têm dono, contrato e suporte próprios — e é importante deixar claro onde a nossa atuação começa e onde ela termina.",
          "O que fazemos: instalar e configurar o cliente ou o acesso na estação, corrigir sessão que não abre, ajustar navegador e certificados locais, resolver impressão a partir do sistema, tratar permissão do Windows, conectividade e conflito com programas instalados, e orientar o usuário sobre o uso correto. Quando o acesso exige credencial, ela é fornecida por quem tem poder para autorizar, usada apenas durante o atendimento e não fica guardada conosco. Recomendamos a troca da senha após qualquer acesso pontual.",
          "O que não fazemos: administrar contas de terceiros como se fôssemos o responsável delas, responder pelo funcionamento interno da plataforma, garantir disponibilidade de serviço que não é nosso, abrir chamado em nome da empresa sem autorização expressa ou assumir a gestão de licenças, renovações e faturas do fornecedor. Também não emitimos, renovamos nem validamos certificado digital — a emissão pertence à autoridade certificadora; nós tratamos apenas a instalação e o reconhecimento do dispositivo na máquina.",
          "Quando o diagnóstico aponta que a falha está fora do computador, entregamos essa constatação por escrito, com o que foi verificado e descartado, para que a empresa acione o fornecedor com informação técnica em mãos. Isso costuma encurtar o atendimento do outro lado e evita que o chamado fique circulando entre partes sem responsável definido.",
        ],
      },
      {
        titulo: "O que este suporte cobre e o que pertence a outra página",
        paragrafos: [
          "Esta página trata da execução do suporte: computadores, usuários, sistemas operacionais, programas compatíveis, periféricos, acessos, impressão, incidentes do dia a dia e manutenção corretiva das estações da equipe.",
          "Reestruturar cobertura de Wi-Fi, cabeamento e segmentação é escopo de redes e Wi-Fi. Organizar rotina de inspeção, inventário e relatório de riscos é escopo de manutenção preventiva para empresas. Estruturar cópias, retenção e teste de restauração é escopo de backup para empresas. E o panorama institucional da nossa atuação com empresas fica no hub Empresa de TI em Curitiba.",
          "Fora da nossa capacidade operacional ficam: administração de infraestrutura corporativa de grande porte, monitoramento contínuo sem contratação específica, atendimento em regime ininterrupto e suporte a plataformas que não conseguimos sustentar com qualidade. Quando a demanda passa desse limite, dizemos na avaliação.",
        ],
      },
    ],

    linksLocais: [
      { label: "Suporte empresarial em Curitiba", to: "/servicos/suporte-tecnico-empresarial/curitiba" },
      { label: "Empresa de TI em Curitiba", to: "/empresa-de-ti-curitiba" },
      { label: "Atendimento técnico em Curitiba", to: "/tecnico-informatica-curitiba" },
      { label: "Atendimento remoto", to: "/atendimento-remoto" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
    ],
    dateModified: "2026-09-26",
  };

export default data;
