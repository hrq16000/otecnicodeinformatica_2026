/**
 * PONTES ARTIGO-PILAR → ATLAS (rodada incremental).
 *
 * Fecha o grafo no sentido inverso: o Atlas já aponta para o blog (via
 * `proximosPassos` em `atlasAprofundamento.ts`); aqui cada artigo-pilar
 * estratégico declara a qual tema do Atlas pertence e por quê.
 *
 * Regras:
 *  - fail-closed: sem entrada curada, nada renderiza (nunca template genérico);
 *  - texto próprio por artigo — repetição criaria bloco boilerplate;
 *  - nenhuma URL nova: todo destino já existe no portal;
 *  - conteúdo informativo, sem CTA comercial.
 */
import { ATLAS_TEMAS, type AtlasTema } from "@/lib/atlasInformatica";

export interface AtlasPonteArtigo {
  temaId: string;
  porQue: string;
  /** Passo seguinte natural depois da leitura (rota existente). */
  proximoPasso: { rotulo: string; to: string; contexto: string };
}

export const ATLAS_PONTES_ARTIGOS: Record<string, AtlasPonteArtigo> = {
  "manutencao-preventiva-de-computador-guia-completo": {
    temaId: "manutencao-preventiva",
    porQue:
      "Prevenção só funciona como rotina com frequência definida: o que é mensal, o que é anual e o que nunca deveria ser feito por reflexo. A trilha de manutenção preventiva organiza essa cadência e evita a intervenção sem sintoma, que introduz risco em vez de eliminar causa.",
    proximoPasso: {
      rotulo: "Backup antes da manutenção",
      to: "/decisoes/backup-antes-da-manutencao",
      contexto:
        "Critério para decidir o que copiar antes de abrir ou reinstalar o equipamento.",
    },
  },
  "dispositivo-usb-nao-reconhecido-o-que-fazer": {
    temaId: "fundamentos",
    porQue:
      "A falha de reconhecimento acontece antes de qualquer driver entrar em cena: o aparelho precisa se apresentar ao sistema e informar o consumo de energia. A trilha de fundamentos mostra por que porta, cabo e alimentação vêm antes de software na ordem de investigação.",
    proximoPasso: {
      rotulo: "Diagnóstico técnico",
      to: "/diagnostico-tecnico",
      contexto:
        "Quando os testes de isolamento não fecham a causa e a avaliação precisa ser presencial.",
    },
  },
  "como-testar-restauracao-de-backup": {
    temaId: "dados-backup",
    porQue:
      "Ter cópia e conseguir restaurar são coisas diferentes: mídia falha em silêncio, rotina para sem aviso e sincronização propaga o estado ruim. A trilha de dados e backup trata a verificação periódica como parte da própria estratégia de cópia.",
    proximoPasso: {
      rotulo: "Nuvem ou HD externo",
      to: "/decisoes/nuvem-ou-hd-externo",
      contexto:
        "Onde guardar cada cópia, com o critério de risco de cada destino.",
    },
  },
  "computador-lento-causas-solucoes": {
    temaId: "hardware-upgrades",
    porQue:
      "Lentidão raramente tem uma causa única: pode ser disco mecânico no limite, memória insuficiente, temperatura alta ou inicialização cheia. A trilha de hardware e upgrades organiza essa separação antes de qualquer compra de peça.",
    proximoPasso: {
      rotulo: "SSD ou memória RAM: por onde começar",
      to: "/decisoes/ssd-ou-memoria-ram",
      contexto:
        "Guia de decisão independente, com o critério para cada cenário de uso.",
    },
  },
  "notebook-nao-liga-o-que-fazer": {
    temaId: "windows-inicializacao",
    porQue:
      '"Não liga" descreve estados muito diferentes: sem reação nenhuma, liga e apaga, liga sem imagem. A trilha de Windows e inicialização mostra como identificar o estágio exato em que a partida para — o dado que muda o diagnóstico inteiro.',
    proximoPasso: {
      rotulo: "Roteiro de falha de inicialização",
      to: "/ferramentas/roteiro-falha-de-inicializacao",
      contexto: "Checklist de verificação segura, sem abrir o equipamento.",
    },
  },
  "como-resolver-tela-azul-windows": {
    temaId: "windows-inicializacao",
    porQue:
      "O código da tela azul é a pista principal: repetir sempre igual aponta driver ou componente definido; variar a cada ocorrência aponta memória ou alimentação. A trilha de inicialização explica como usar essa leitura em vez de formatar por reflexo.",
    proximoPasso: {
      rotulo: "Tela azul: entrada pelo sintoma",
      to: "/problemas/tela-azul",
      contexto:
        "Verificações seguras e o ponto em que insistir agrava o quadro.",
    },
  },
  "como-recuperar-dados-hd-com-defeito": {
    temaId: "dados-backup",
    porQue:
      "Recuperação de dados é uma corrida contra o próprio uso do disco: cada gravação nova reduz a chance de resgate. A trilha de dados e backup trata disso como disciplina permanente, não como reação à perda.",
    proximoPasso: {
      rotulo: "Verificador de backup",
      to: "/ferramentas/verificador-de-backup",
      contexto: "Confere se a cópia que você tem é realmente restaurável.",
    },
  },
  "backup-como-proteger-seus-arquivos": {
    temaId: "dados-backup",
    porQue:
      "Backup só existe quando a restauração foi testada. A trilha de dados e backup conecta a rotina doméstica ao que muda em ambiente de escritório, onde a perda tem custo operacional.",
    proximoPasso: {
      rotulo: "Backup antes da manutenção",
      to: "/decisoes/backup-antes-da-manutencao",
      contexto:
        "O que copiar antes de entregar o equipamento para qualquer serviço.",
    },
  },
  "como-melhorar-sinal-wifi-em-casa": {
    temaId: "redes-wifi",
    porQue:
      "Sinal fraco costuma ser propagação e canal, não defeito de aparelho. A trilha de redes e Wi-Fi ensina a separar o que é do provedor, do roteador e do dispositivo antes de trocar equipamento.",
    proximoPasso: {
      rotulo: "Roteiro de Wi-Fi instável",
      to: "/ferramentas/roteiro-wifi-instavel",
      contexto:
        "Sequência de testes que isola a camada responsável pela queda.",
    },
  },
  "como-saber-se-pc-tem-virus-malware": {
    temaId: "seguranca-privacidade",
    porQue:
      "Nem toda lentidão é infecção e nem toda infecção deixa sinal visível. A trilha de segurança e privacidade estabelece o que é verificável pelo usuário e onde a investigação passa a exigir ferramenta específica.",
    proximoPasso: {
      rotulo: "Segurança dos dados",
      to: "/seguranca-dos-dados",
      contexto: "Como o portal trata dados durante um atendimento técnico.",
    },
  },
  "notebook-superaquecendo-o-que-fazer": {
    temaId: "manutencao-preventiva",
    porQue:
      "Superaquecimento é o sintoma preventivo por excelência: aparece muito antes do desligamento e da perda de desempenho. A trilha de manutenção preventiva mostra o que observar em intervalos regulares.",
    proximoPasso: {
      rotulo: "Computador esquentando",
      to: "/problemas/computador-esquentando",
      contexto:
        "Verificações seguras e o limite a partir do qual desligar é o correto.",
    },
  },
  "organizacao-de-ti-para-pequenos-escritorios": {
    temaId: "informatica-empresas",
    porQue:
      "Em escritório pequeno o problema técnico vira parada operacional. A trilha de informática para empresas organiza inventário, backup e padronização como base — antes de discutir contrato de suporte.",
    proximoPasso: {
      rotulo: "Empresa de TI em Curitiba",
      to: "/empresa-de-ti-curitiba",
      contexto:
        "Escopo, modalidades e o que fica definido antes de qualquer execução.",
    },
  },
  "quando-trocar-hd-por-ssd": {
    temaId: "decisoes-compra-reparo",
    porQue:
      "A troca de disco é o caso mais claro em que reparar e substituir competem pelo mesmo orçamento. A trilha de decisões entre compra e reparo dá o critério para os dois lados da conta.",
    proximoPasso: {
      rotulo: "Consertar ou substituir",
      to: "/decisoes/consertar-ou-substituir",
      contexto:
        "Critério de decisão por idade, uso e custo real do equipamento.",
    },
  },
};

export interface AtlasPonteArtigoResolvida extends AtlasPonteArtigo {
  tema: AtlasTema;
  hubHref: string;
}

/** Resolve a ponte de um artigo. Sem ponte declarada, retorna null (fail-closed). */
export function atlasPonteDoArtigo(
  slug: string,
): AtlasPonteArtigoResolvida | null {
  const ponte = ATLAS_PONTES_ARTIGOS[slug];
  if (!ponte) return null;
  const tema = ATLAS_TEMAS.find((t) => t.id === ponte.temaId);
  if (!tema) return null;
  return {
    ...ponte,
    tema,
    hubHref: `/guia-tecnico-informatica#tema-${tema.id}`,
  };
}
