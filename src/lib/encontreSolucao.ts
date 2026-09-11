/**
 * ETAPA — "Encontre sua solução": exploração guiada na Home.
 *
 * Percurso: PROBLEMA → EQUIPAMENTO → SOLUÇÃO → ATENDIMENTO.
 *
 * Regras:
 * - Nenhuma URL nova é inventada: todos os `href` apontam para páginas que
 *   já existem no portal (serviços core, páginas de problema e modalidades).
 * - Nenhum preço, prazo ou garantia é redigitado aqui — a política comercial
 *   continua sendo lida de `src/lib/config/commercial.ts` na camada de UI.
 * - A modalidade é uma RECOMENDAÇÃO derivada da natureza da falha, nunca uma
 *   promessa de atendimento imediato.
 */

export type ModalidadeId = "remoto" | "domicilio" | "coleta";

export type Modalidade = {
  id: ModalidadeId;
  label: string;
  /** Por que essa modalidade costuma ser a adequada para o caso. */
  motivo: string;
  href: string;
};

export const MODALIDADES: Record<ModalidadeId, Modalidade> = {
  remoto: {
    id: "remoto",
    label: "Atendimento remoto",
    motivo: "A causa é de sistema ou configuração e costuma ser tratada com acesso à distância.",
    href: "/atendimento-remoto",
  },
  domicilio: {
    id: "domicilio",
    label: "Visita técnica",
    motivo: "O diagnóstico depende do ambiente ou do equipamento no lugar em que ele é usado.",
    href: "/atendimento-domicilio",
  },
  coleta: {
    id: "coleta",
    label: "Coleta para bancada",
    motivo: "A verificação exige abrir o equipamento e usar instrumentos de bancada.",
    href: "/coleta-e-entrega",
  },
};

export type Solucao = {
  titulo: string;
  resumo: string;
  href: string;
  modalidade: ModalidadeId;
};

export type EquipamentoOpcao = {
  id: string;
  label: string;
  solucao: Solucao;
};

export type ProblemaOpcao = {
  id: string;
  label: string;
  /** Como o visitante costuma descrever o caso. */
  descricao: string;
  equipamentos: EquipamentoOpcao[];
};

export const PROBLEMAS_EXPLORACAO: ProblemaOpcao[] = [
  {
    id: "lentidao",
    label: "Está lento ou travando",
    descricao: "Demora para abrir programas, engasga no uso comum ou trava sem motivo aparente.",
    equipamentos: [
      {
        id: "notebook",
        label: "Notebook",
        solucao: {
          titulo: "Manutenção de notebook",
          resumo:
            "Lentidão em notebook costuma somar acúmulo de software com aquecimento e disco antigo. A avaliação separa o que é sistema do que é hardware antes de indicar peça.",
          href: "/servicos/manutencao-de-notebook",
          modalidade: "coleta",
        },
      },
      {
        id: "desktop",
        label: "Computador de mesa",
        solucao: {
          titulo: "Manutenção de computador",
          resumo:
            "No desktop, a verificação passa por armazenamento, memória, temperatura e fonte antes de qualquer conclusão sobre desempenho.",
          href: "/servicos/manutencao-de-computador",
          modalidade: "domicilio",
        },
      },
      {
        id: "sistema",
        label: "Acho que é o Windows",
        solucao: {
          titulo: "Computador lento: causas reais",
          resumo:
            "Nem toda lentidão se resolve formatando. A página explica as causas mais frequentes e o que muda de verdade o desempenho.",
          href: "/problemas/computador-lento",
          modalidade: "remoto",
        },
      },
    ],
  },
  {
    id: "nao-liga",
    label: "Não liga ou desliga sozinho",
    descricao: "Sem reação ao ligar, tela apagada, reinício repentino ou desligamento em uso.",
    equipamentos: [
      {
        id: "notebook",
        label: "Notebook",
        solucao: {
          titulo: "Notebook não liga: o que verificar",
          resumo:
            "Antes de falar em placa, a checagem cobre energia, bateria, carregador e sinais de tela. A página mostra o que dá para conferir com segurança em casa.",
          href: "/problemas/notebook-nao-liga",
          modalidade: "coleta",
        },
      },
      {
        id: "desktop",
        label: "Computador de mesa",
        solucao: {
          titulo: "Manutenção de computador",
          resumo:
            "Falha ao ligar em desktop envolve fonte, memória, placa-mãe e conexões de vídeo — avaliadas na ordem, sem troca por tentativa.",
          href: "/servicos/manutencao-de-computador",
          modalidade: "coleta",
        },
      },
      {
        id: "monitor",
        label: "Monitor ou TV",
        solucao: {
          titulo: "Conserto de monitor",
          resumo:
            "Monitor sem imagem, piscando ou que não liga passa por fonte, backlight e placa em bancada. Painel trincado tem recusa declarada.",
          href: "/servicos/conserto-monitor",
          modalidade: "coleta",
        },
      },
    ],
  },
  {
    id: "erro-sistema",
    label: "Erro, tela azul ou vírus",
    descricao: "Mensagens de erro, reinício com tela azul, propaganda estranha ou navegador tomado.",
    equipamentos: [
      {
        id: "tela-azul",
        label: "Tela azul do Windows",
        solucao: {
          titulo: "Tela azul: por onde começar",
          resumo:
            "O código do erro e o momento em que ele aparece orientam a causa. A página organiza a leitura antes de qualquer reinstalação.",
          href: "/problemas/tela-azul",
          modalidade: "remoto",
        },
      },
      {
        id: "virus",
        label: "Suspeita de vírus",
        solucao: {
          titulo: "Remoção de vírus",
          resumo:
            "Limpeza com atenção aos seus dados e verificação do que voltou a se instalar sozinho, em vez de só rodar um antivírus.",
          href: "/servicos/remocao-de-virus",
          modalidade: "remoto",
        },
      },
      {
        id: "formatacao",
        label: "Sistema não inicia",
        solucao: {
          titulo: "Formatação com backup",
          resumo:
            "Reinstalação limpa com salvamento prévio dos arquivos, drivers e programas essenciais — quando o reparo do sistema já não compensa.",
          href: "/servicos/formatacao",
          modalidade: "coleta",
        },
      },
    ],
  },
  {
    id: "rede",
    label: "Internet, Wi-Fi ou impressora",
    descricao: "Sinal fraco em parte do imóvel, conexão caindo ou impressora que some da rede.",
    equipamentos: [
      {
        id: "casa",
        label: "Rede em casa",
        solucao: {
          titulo: "Wi-Fi instável: o que verificar",
          resumo:
            "Posição do roteador, interferência e cobertura explicam a maioria dos casos domésticos antes de qualquer compra de equipamento.",
          href: "/problemas/wifi-instavel",
          modalidade: "domicilio",
        },
      },
      {
        id: "empresa",
        label: "Rede na empresa",
        solucao: {
          titulo: "Redes e Wi-Fi",
          resumo:
            "Cobertura, cabeamento e estabilidade para o escritório, com o mapeamento do que trava a operação hoje.",
          href: "/servicos/redes-e-wifi",
          modalidade: "domicilio",
        },
      },
    ],
  },
  {
    id: "dados",
    label: "Perdi arquivos ou preciso de backup",
    descricao: "Arquivos apagados, disco que não é reconhecido ou vontade de proteger o que importa.",
    equipamentos: [
      {
        id: "apagados",
        label: "Arquivos sumiram",
        solucao: {
          titulo: "Arquivos apagados: o que é possível",
          resumo:
            "O primeiro passo é parar de usar a mídia. A página explica os limites reais de uma tentativa de recuperação.",
          href: "/problemas/arquivos-apagados",
          modalidade: "coleta",
        },
      },
      {
        id: "midia",
        label: "HD, SSD ou pendrive com falha",
        solucao: {
          titulo: "Recuperação de dados",
          resumo:
            "Avaliação primeiro, tentativa depois. Recuperação de dados não é garantida — e dizemos isso antes, não depois.",
          href: "/servicos/recuperacao-de-dados",
          modalidade: "coleta",
        },
      },
    ],
  },
  {
    id: "desempenho",
    label: "Quero mais desempenho",
    descricao: "A máquina funciona, mas já não acompanha o uso atual de trabalho ou de jogo.",
    equipamentos: [
      {
        id: "upgrade",
        label: "SSD ou memória",
        solucao: {
          titulo: "Upgrade de SSD e memória",
          resumo:
            "Ganho real medido antes da compra, respeitando a compatibilidade da placa e o uso que você faz da máquina.",
          href: "/servicos/upgrade-ssd-ram",
          modalidade: "domicilio",
        },
      },
      {
        id: "gamer",
        label: "PC gamer",
        solucao: {
          titulo: "PC gamer",
          resumo:
            "Queda de FPS, aquecimento e desligamento em jogo são medidos antes de indicar qualquer peça nova.",
          href: "/servicos/pc-gamer",
          modalidade: "coleta",
        },
      },
      {
        id: "montagem",
        label: "Montar um computador",
        solucao: {
          titulo: "Montagem de PC",
          resumo:
            "Peças novas ou já compradas: compatibilidade verificada, montagem e testes antes da entrega.",
          href: "/servicos/montagem-de-pc",
          modalidade: "coleta",
        },
      },
    ],
  },
  {
    id: "empresa",
    label: "Minha empresa está parada",
    descricao: "Estação fora do ar, equipe sem conseguir trabalhar ou suporte inexistente.",
    equipamentos: [
      {
        id: "suporte",
        label: "Suporte contínuo",
        solucao: {
          titulo: "Suporte técnico empresarial",
          resumo:
            "Estações, rede, impressoras e rotinas de backup — de forma pontual ou recorrente, com prioridade para o que impede a equipe de trabalhar.",
          href: "/servicos/suporte-tecnico-empresarial",
          modalidade: "domicilio",
        },
      },
      {
        id: "ambiente",
        label: "Organizar o ambiente de TI",
        solucao: {
          titulo: "Empresa de TI em Curitiba",
          resumo:
            "Diagnóstico do ambiente atual e organização do suporte, com o retrato do que está improvisado hoje.",
          href: "/empresa-de-ti-curitiba",
          modalidade: "domicilio",
        },
      },
    ],
  },
];

/**
 * ETAPA — ecossistemas de serviço.
 * Agrupa o catálogo existente em quatro famílias nomeadas. Informática
 * aparece primeiro; "além da informática" fecha, em peso secundário.
 */
export type Ecossistema = {
  id: string;
  titulo: string;
  descricao: string;
  slugs: string[];
};

export const ECOSSISTEMAS: Ecossistema[] = [
  {
    id: "informatica",
    titulo: "Informática e computadores",
    descricao:
      "Núcleo da marca: hardware, sistema, manutenção, segurança, dados e desempenho de PCs e notebooks.",
    slugs: [
      "manutencao-de-notebook",
      "manutencao-de-computador",
      "formatacao",
      "remocao-de-virus",
      "upgrade-ssd-ram",
      "recuperacao-de-dados",
      "montagem-de-pc",
      "pc-gamer",
    ],
  },
  {
    id: "conectividade",
    titulo: "Conectividade e infraestrutura",
    descricao:
      "Wi-Fi, roteadores, cabeamento e impressoras em rede, em casa e em pequenas estruturas empresariais.",
    slugs: ["redes-e-wifi"],
  },
  {
    id: "empresas",
    titulo: "Empresas e profissionais",
    descricao:
      "Suporte recorrente, manutenção preventiva, visita técnica e atendimento a home office.",
    slugs: ["suporte-tecnico-empresarial"],
  },
  {
    id: "alem",
    titulo: "Além da informática",
    descricao:
      "Eletrônicos e reparos correlatos atendidos em bancada, sem competir com o núcleo da marca.",
    slugs: ["conserto-tv", "conserto-monitor", "conserto-placa", "conserto-impressora-3d"],
  },
];
