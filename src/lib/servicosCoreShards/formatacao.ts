import type { ServicoLandingData } from "@/components/servico/ServicoLandingLayout";
import { PROCESSOS } from "@/lib/servicosProcessos";

const data: ServicoLandingData = {
    path: "formatacao",
    trackingKey: "formatacao",
    metaTitle: "Formatação de PC e Notebook em Curitiba | Windows",
    metaDescription:
      "Formatação de PC e notebook em Curitiba com backup, Windows original, drivers e programas essenciais. Diagnóstico a partir de R$ 99,99. Atendimento via WhatsApp.",
    serviceName: "Formatação de Computador e Notebook",
    serviceDescription:
      "Formatação com backup prévio, Windows 10/11 original, drivers atualizados e programas essenciais, com atendimento em Curitiba e região.",
    eyebrow: "Formatação em Curitiba",
    h1: "Formatação de computador e notebook em Curitiba",
    h1Accent: "com backup dos seus arquivos",
    intro:
      "Windows corrompido, cheio de erro ou que não inicia direito? A formatação reinstala o sistema do zero — com Windows original, drivers e programas essenciais. Antes de tudo fazemos o backup dos seus arquivos e, ao final, restauramos seus dados. Importante: lentidão nem sempre se resolve formatando; por isso avaliamos a causa antes. Você descreve o caso pelo WhatsApp e seguimos com o diagnóstico.",
    whatsappMessage: "Olá! Preciso formatar meu computador/notebook. Pode me orientar?",
    incluso: [
      { title: "Backup prévio", desc: "Salvamos documentos, fotos e arquivos importantes antes de formatar." },
      { title: "Windows original", desc: "Instalação limpa do Windows 10 ou 11, ativado e atualizado." },
      { title: "Drivers completos", desc: "Todos os drivers de hardware instalados e funcionando." },
      { title: "Programas essenciais", desc: "Navegador, pacote de produtividade, leitor de PDF e compactador." },
      { title: "Ajuste de desempenho", desc: "Inicialização enxuta e sistema configurado para o seu uso." },
      { title: "Restauração dos dados", desc: "Seus arquivos de volta e organizados após o procedimento." },
    ],
    sinais: [
      "Windows corrompido que não inicia corretamente",
      "Inicialização travando ou parando no logo do Windows",
      "Erros recorrentes do sistema mesmo após limpeza",
      "Vírus, pop-ups ou navegador que voltam sempre",
      "Acúmulo de programas e arquivos desnecessários",
      "Preparar a máquina para venda, repasse ou novo usuário",
      "Troca de HD por SSD com reinstalação ou clonagem do sistema",
    ],
    processo: PROCESSOS["formatacao"],
    fatoresValor: [
      { title: "Tipo de equipamento", desc: "Notebook, desktop, all-in-one e configurações antigas exigem etapas diferentes." },
      { title: "Volume de backup", desc: "Quanto mais dados a copiar e restaurar, maior o tempo envolvido." },
      { title: "Estado do sistema", desc: "Sistema muito corrompido ou com falhas pode demandar etapas extras." },
      { title: "Programas específicos", desc: "Softwares particulares (impressão fiscal, sistemas de trabalho) somam configuração." },
      { title: "Urgência", desc: "Prazos apertados podem influenciar o agendamento." },
      { title: "Modalidade", desc: "Remoto, visita, coleta ou bancada dependem do sintoma, do endereço e dos testes necessários." },
    ],
    atendimento: {
      residencial:
        "Formatação a domicílio ou por coleta e entrega em Curitiba e região, com backup dos seus arquivos antes de reinstalar e horário combinado com você.",
      empresarial:
        "Formatação e padronização de máquinas de escritório e estações de trabalho, com Windows, drivers e programas essenciais configurados para a rotina da equipe.",
    },
    faqs: [
      { question: "A formatação apaga meus arquivos?", answer: "A formatação reinstala o sistema do zero. Por isso fazemos backup dos seus dados antes e restauramos depois, sempre que o equipamento permite leitura das informações." },
      { question: "Vocês instalam Office, antivírus e drivers?", answer: "Sim. Entregamos com Windows ativado, drivers atualizados, navegador, antivírus e pacote de produtividade configurados conforme o seu uso." },
      { question: "Formatar sempre deixa o computador rápido?", answer: "Nem sempre. Formatar resolve problemas de software, mas lentidão também pode vir de HD antigo, pouca memória ou superaquecimento. Por isso avaliamos a causa antes: às vezes um SSD resolve mais que formatar." },
      { question: "Em quanto tempo fica pronto?", answer: "Em geral de 2 a 4 horas, variando conforme o hardware e o volume de dados a copiar e restaurar." },
      { question: "Atendem em domicílio ou por coleta?", answer: "Atendemos em Curitiba e região, com opção de atendimento em domicílio ou coleta e entrega do equipamento." },
      { question: "O backup está incluído?", answer: "A cópia dos seus arquivos faz parte do procedimento sempre que o armazenamento permite leitura. Volumes muito grandes, discos com falha ou pedidos de mídia adicional são tratados como escopo à parte e informados antes da execução." },
      { question: "A licença do Windows está incluída?", answer: "Não fornecemos ativação irregular. Máquinas com licença de fábrica normalmente reativam pela chave gravada na placa; quando não existe licença válida, explicamos como regularizar antes de concluir a instalação." },
      { question: "Quais programas são instalados?", answer: "Navegador, leitor de PDF, compactador, antivírus e o pacote de produtividade compatível com o seu uso. Programas específicos de trabalho podem ser instalados desde que você forneça instalador e licença." },
      { question: "É possível recuperar arquivos antes da formatação?", answer: "Na maioria dos casos, sim, e essa é a primeira etapa. Quando o disco apresenta setores defeituosos ou falha de leitura, a prioridade passa a ser preservar os dados, e a reinstalação só é discutida depois disso." },
      { question: "A formatação tem garantia?", answer: "Sim, conforme o serviço executado e as condições publicadas na página de preços e políticas. A garantia cobre o serviço realizado, não novas infecções ou alterações feitas depois da entrega." },
    ],
    relacionados: [
      { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
      { label: "Manutenção de notebook", to: "/servicos/manutencao-de-notebook" },
      { label: "Upgrade de SSD e RAM", to: "/servicos/upgrade-ssd-ram" },
      { label: "Remoção de vírus", to: "/servicos/remocao-de-virus" },
      { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
      { label: "Computador lento: investigar o sintoma", to: "/problemas/computador-lento" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
    ],
    blocoLocal: [
      {
        titulo: "Quando formatar resolve e quando é só desperdício",
        paragrafos: [
          "Formatar corrige o que é software: sistema corrompido, atualização malsucedida, perfil de usuário quebrado, infecção persistente, acúmulo de anos de instalações e serviços disputando a inicialização. Nesses cenários a máquina volta previsível já no primeiro boot.",
          "Formatar não corrige hardware. Se o gargalo é HD mecânico, memória insuficiente ou superaquecimento, a máquina fica boa por alguns dias e volta a arrastar — porque a causa continua no lugar. Por isso avaliamos antes: em boa parte dos atendimentos, migrar para SSD entrega mais resultado do que reinstalar o Windows.",
          "Há ainda o caso em que formatar é arriscado: disco com setores defeituosos ou com arquivos importantes sem cópia. Nessa situação a prioridade é preservar os dados primeiro, e só depois decidir o que fazer com o sistema.",
        ],
      },
      {
        titulo: "Instalação limpa, restauração e o que pode ser preservado",
        paragrafos: [
          "A instalação limpa apaga a partição do sistema e recria tudo do zero: é o caminho quando o Windows está corrompido, quando houve infecção persistente ou quando anos de instalações deixaram a máquina imprevisível. A restauração do próprio fabricante devolve o estado de fábrica, mas traz de volta o conjunto original de programas e nem sempre resolve o problema que motivou o atendimento.",
          "O que costuma ser preservado com a cópia prévia: documentos, fotos, downloads, área de trabalho, favoritos e, quando aplicável, perfis de programas usados no dia a dia. O que não retorna sozinho: programas instalados, configurações internas de sistema e licenças que dependem de chave própria.",
          "Preparação do disco também entra no escopo: verificação da saúde do armazenamento, particionamento adequado e, quando indicado, migração do sistema para SSD. Se o disco estiver com falha de leitura, a reinstalação é interrompida e o assunto passa a ser preservação de dados.",
        ],
      },
      {
        titulo: "Backup, licença e o que você precisa separar antes",
        paragrafos: [
          "Antes de reinstalar, copiamos documentos, fotos, downloads e área de trabalho. Vale avisar sobre o que costuma escapar: e-mails configurados em programa local, favoritos e senhas do navegador, arquivos de sistemas de trabalho e licenças de softwares pagos. Se existir algo assim, avise na triagem para incluirmos na cópia.",
          "Sobre licença: máquinas com Windows de fábrica normalmente reativam sozinhas pela chave gravada na placa. Quando não há licença válida, explicamos como regularizar — não entregamos ativação irregular.",
          "Você também recebe orientação de senhas: contas do navegador, e-mail e serviços precisam ser acessíveis depois da reinstalação. Perder acesso à conta principal costuma dar mais trabalho do que a própria formatação.",
        ],
      },
      {
        titulo: "Nem todo computador lento precisa ser formatado",
        paragrafos: [
          "Antes de recomendar a reinstalação do sistema, é necessário diferenciar falhas de software, armazenamento, memória, aquecimento e outros problemas físicos. Formatar um equipamento cujo gargalo é disco no fim da vida ou memória insuficiente devolve alguns dias de melhora e o problema retorna, porque a causa continua no lugar.",
          "Formatação também não corrige fonte defeituosa, bateria, tela, teclado, conector, memória com defeito, armazenamento fisicamente danificado, placa-mãe ou desligamentos por temperatura. Esses cenários pertencem à manutenção de computador ou à manutenção de notebook, conforme o equipamento.",
          "Quando o diagnóstico indica origem física, dizemos isso mesmo que o pedido inicial tenha sido formatar. Reinstalar sistema em máquina com hardware comprometido é o tipo de serviço que gera retrabalho e desconfiança — e não é assim que trabalhamos.",
        ],
      },
      {
        titulo: "Como fica a máquina na entrega",
        paragrafos: [
          "Entregamos com Windows atualizado, drivers corretos do modelo, navegador, leitor de PDF, compactador e antivírus ativos, inicialização enxuta e os arquivos restaurados nas pastas originais. Programas específicos do seu trabalho podem ser instalados se você fornecer instalador e licença.",
          "O tempo típico é de algumas horas e varia com o volume de dados. Se a máquina for antiga e o disco estiver lento, avisamos: a formatação vai demorar mais e o resultado será limitado pelo hardware — cenário em que o upgrade de SSD e memória costuma ser o passo mais inteligente.",
        ],
      },
    ],
    linksLocais: [
      { label: "Atendimento técnico em Curitiba", to: "/tecnico-informatica-curitiba" },
      { label: "Técnico no seu endereço", to: "/atendimento-domicilio" },
      { label: "Coleta e entrega do equipamento", to: "/coleta-e-entrega" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
    ],
    dateModified: "2026-08-05",
  };

export default data;
