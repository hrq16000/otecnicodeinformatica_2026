import type { ServicoLandingData } from "@/components/servico/ServicoLandingLayout";
import { PROCESSOS } from "@/lib/servicosProcessos";

const LINKS_BASE = [
  { label: "Preços e políticas", to: "/precos-e-politicas" },
  { label: "Como funciona", to: "/como-funciona" },
  { label: "Dúvidas frequentes", to: "/faq" },
];

const data: ServicoLandingData = {
    path: "recuperacao-de-dados",
    trackingKey: "recuperacao-dados",
    metaTitle: "Recuperação de Dados em Curitiba | HD, SSD e Pendrive",
    metaDescription:
      "Recuperação de dados em Curitiba de HD, SSD, pendrive e cartão. Exclusão acidental, sistema que não inicia e falhas.",
    serviceName: "Recuperação de Dados",
    serviceDescription:
      "Tentativa de recuperação de dados em HD, SSD, pendrive e cartão de memória, com avaliação inicial e transparência sobre as chances, em Curitiba e região.",
    eyebrow: "Recuperação em Curitiba",
    h1: "Recuperação de dados de HD, SSD e pendrive em Curitiba",
    h1Accent: "avaliação antes de qualquer promessa",
    intro:
      "Apagou arquivos por engano, o sistema não inicia ou o disco parou de ser reconhecido? Avaliamos HD, SSD, pendrive e cartão e explicamos as chances reais antes de qualquer tentativa. Isto não é o mesmo que backup preventivo: aqui tentamos resgatar o que já foi perdido. Importante: recuperação de dados não é garantida, e continuar usando o dispositivo pode sobrescrever ou piorar a falha. Se houver risco, pare de usar e fale pelo WhatsApp.",
    whatsappMessage: "Olá! Preciso avaliar uma possível recuperação de dados de um HD/SSD/pendrive.",
    incluso: [
      { title: "Avaliação do dispositivo", desc: "Análise inicial de HD, SSD, pendrive ou cartão." },
      { title: "Diagnóstico de causa", desc: "Exclusão acidental, corrupção lógica ou falha física." },
      { title: "Chances reais", desc: "Explicamos com honestidade a probabilidade de recuperação." },
      { title: "Cópia segura", desc: "Trabalhamos para não agravar o estado do dispositivo." },
      { title: "Entrega dos dados", desc: "Quando recuperados, entregamos em mídia segura." },
      { title: "Orientação", desc: "Recomendações de backup para evitar novas perdas." },
    ],
    sinais: [
      "Arquivos apagados por engano ou partição inacessível",
      "Sistema que não inicia mais",
      "HD ou SSD não reconhecido pelo computador",
      "Pendrive ou cartão pedindo formatação",
      "Ruídos anormais vindos do HD (possível falha física)",
      "Perda de fotos, documentos ou trabalhos importantes",
    ],
    processo: PROCESSOS["recuperacao-de-dados"],
    fatoresValor: [
      { title: "Tipo de falha", desc: "Falha lógica e falha física exigem procedimentos muito diferentes." },
      { title: "Dispositivo", desc: "HD, SSD, pendrive e cartão têm complexidades distintas." },
      { title: "Volume e prioridade", desc: "Quantidade de dados e quais arquivos são prioritários." },
      { title: "Estado físico", desc: "Dispositivos com dano físico demandam mais cuidado e tempo." },
      { title: "Urgência", desc: "Prazos curtos podem influenciar o processo." },
      { title: "Necessidade de mídia", desc: "Fornecimento de novo disco/mídia para entrega dos dados." },
    ],
    atendimento: {
      residencial:
        "Avaliação de recuperação de dados de HD, SSD, pendrive e cartão de uso pessoal em Curitiba e região, com transparência sobre as chances reais.",
      empresarial:
        "Tentativa de recuperação de dados de máquinas e servidores locais de empresas, sempre com avaliação prévia — a recuperação não é garantida.",
    },
    faqs: [
      { question: "A recuperação de dados é garantida?", answer: "Não. Nenhum serviço sério garante resultado. Fazemos a avaliação, explicamos as chances reais do seu caso e trabalhamos para não piorar o estado do dispositivo. Quando não há perspectiva técnica, dizemos antes de executar qualquer tentativa." },
      { question: "Apaguei arquivos, o que devo fazer agora?", answer: "Pare de usar o dispositivo imediatamente e não instale programas de recuperação nele. Cada nova gravação pode sobrescrever justamente o que você quer de volta. Desligue, guarde e traga para avaliação o quanto antes." },
      { question: "Meu HD faz barulho, tem solução?", answer: "Ruído repetitivo costuma indicar falha física, que é o cenário mais delicado. Não insista em ligar e desligar: cada tentativa força um hardware já comprometido. A avaliação define se o caso é tratável aqui ou se exige ambiente de laboratório especializado." },
      { question: "Recuperação em SSD é diferente de HD?", answer: "Sim. O SSD gerencia os blocos internamente e descarta dados apagados de forma automática, o que reduz a janela de recuperação em comparação com o HD. Falha de controladora frequentemente encerra o caso. Preferimos explicar esse limite antes de qualquer tentativa." },
      { question: "Vocês veem o conteúdo dos meus arquivos?", answer: "O acesso é limitado ao necessário para confirmar integridade e organizar a entrega, sempre com sua autorização. Não copiamos, divulgamos nem utilizamos conteúdo pessoal, e o material recuperado é entregue em mídia combinada com você." },
      { question: "Quanto tempo leva uma tentativa de recuperação?", answer: "Depende do tipo de falha, do tamanho da mídia e do estado do dispositivo. Casos lógicos simples costumam ser mais rápidos; mídias com dano físico exigem cópia cuidadosa e podem levar bem mais tempo. O prazo estimado é informado após a avaliação, não antes." },
      { question: "Recuperação é a mesma coisa que backup?", answer: "Não. Recuperação tenta resgatar dados já perdidos e não tem garantia. Backup é preventivo, feito antes de qualquer problema, e custa muito menos. Orientamos uma rotina de backup para você não depender de recuperação." },
      { question: "Como evitar perder dados de novo?", answer: "Mantenha cópia em mais de um lugar — disco externo e nuvem, por exemplo — e confira periodicamente se a cópia realmente abre. Também vale trocar o armazenamento quando ele já mostra sinal de desgaste, em vez de esperar a falha." },
    ],
    relacionados: [
      { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
      { label: "Manutenção de notebook", to: "/servicos/manutencao-de-notebook" },
      { label: "Formatação", to: "/servicos/formatacao" },
      { label: "Upgrade de SSD e RAM", to: "/servicos/upgrade-ssd-ram" },
      { label: "Notebook não liga: por onde começar", to: "/problemas/notebook-nao-liga" },
      { label: "Coleta e entrega", to: "/coleta-e-entrega" },
      ...LINKS_BASE,
    ],
    blocoLocal: [
      {
        titulo: "Perda lógica x perda física: por que a diferença muda tudo",
        paragrafos: [
          "Na perda lógica o dispositivo continua sendo reconhecido: houve exclusão acidental, formatação, corrupção de partição ou falha do sistema de arquivos. O conteúdo em geral ainda está gravado, e a chance depende de quanto foi escrito por cima desde o incidente. Por isso o pedido mais importante é parar de usar o aparelho imediatamente.",
          "Na perda física o dispositivo apresenta comportamento anormal: ruído, aquecimento incomum, sumiço intermitente ou capacidade errada. Aqui não se roda software de recuperação sobre o disco original, porque cada tentativa força um hardware já comprometido. O caminho é avaliar e, quando viável, trabalhar sobre uma cópia de imagem em vez do disco doente.",
          "SSD merece um parágrafo próprio: como o controlador gerencia os blocos internamente e há descarte automático de dados apagados, a recuperação em SSD tem limite técnico maior do que em HD, e falha de controladora frequentemente encerra o caso. Preferimos dizer isso na primeira conversa a cobrar por uma tentativa sem perspectiva.",
        ],
      },
      {
        titulo: "O que precisa ficar claro antes de começar",
        paragrafos: [
          "Recuperação de dados é tentativa técnica, não resultado garantido. Existem mídias cujo conteúdo não retorna, e isso é dito antes da execução, nunca depois. Também não usamos percentual de sucesso: cada caso depende do tipo de falha e do histórico do dispositivo.",
          "Tentativas anteriores atrapalham. Mídia já aberta, congelada, ligada repetidamente ou submetida a programas de recuperação chega em condição pior. Parte dos casos que não avançam tinham chance antes da improvisação em casa.",
          "Alguns cenários exigem terceiros: falha mecânica interna pode demandar ambiente controlado e peças doadoras de laboratório especializado, com prazo e custo próprios. O valor sempre depende do estado real da mídia, avaliado antes, e o acesso ao conteúdo respeita a autorização do cliente e a política de privacidade publicada no site.",
        ],
      },
      {
        titulo: "Backup é mais barato do que tentar recuperar",
        paragrafos: [
          "A maior parte das perdas que chegam até nós teria sido evitada por uma rotina simples: uma cópia local em disco externo e outra fora de casa, em nuvem. Configuramos essa rotina, testamos a restauração — backup que nunca foi restaurado não é backup — e explicamos o que costuma ficar de fora, como caixas de e-mail e pastas de programas.",
          "Quando o disco ainda funciona mas dá sinais de desgaste, a ordem é copiar tudo primeiro e só depois planejar a troca por SSD. Se o equipamento sequer inicia, a avaliação começa pela manutenção do computador, porque o problema pode estar fora do disco.",
        ],
      },
    ],
    linksLocais: [
      { label: "Atendimento técnico em Curitiba", to: "/tecnico-informatica-curitiba" },
      { label: "Coleta e entrega do equipamento", to: "/coleta-e-entrega" },
      { label: "Política de privacidade", to: "/politica-de-privacidade" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
    ],
    dateModified: "2026-08-05",
  };

export default data;
