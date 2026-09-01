/**
 * PONTES SINTOMA → ATLAS — arquitetura de conteúdo em grafo.
 *
 * Cada cluster de /problemas passa a declarar explicitamente a QUAL tema do
 * Atlas de Informática ele pertence e POR QUE. O texto é curado, um por
 * sintoma: nunca template repetido — a repetição criaria bloco genérico e
 * canibalização entre páginas.
 *
 * A ponte fecha o percurso editorial do portal:
 *   sintoma (o que o cliente vê) → trilha do tema (aprender/verificar/parar)
 *   → serviço (quando resolver deixa de ser tarefa do usuário).
 */
import { ATLAS_TEMAS, type AtlasTema } from "@/lib/atlasInformatica";

export interface AtlasPonte {
  /** id do tema em ATLAS_TEMAS. */
  temaId: string;
  /** Por que este sintoma pertence a este tema — texto próprio do sintoma. */
  porQue: string;
}

export const ATLAS_PONTES: Record<string, AtlasPonte> = {
  "wifi-instavel": {
    temaId: "redes-wifi",
    porQue:
      "Queda de conexão quase nunca é defeito do computador: é propagação de sinal, canal congestionado ou roteador mal posicionado. A trilha de redes ensina a separar o que é do provedor, do roteador e do aparelho antes de trocar qualquer equipamento.",
  },
  "tela-azul": {
    temaId: "windows-inicializacao",
    porQue:
      "A tela azul carrega um código que aponta driver, memória ou disco. A trilha de Windows e inicialização mostra como ler esse código, o que verificar com segurança e em que ponto continuar tentando só piora o quadro.",
  },
  "arquivos-apagados": {
    temaId: "dados-backup",
    porQue:
      "Arquivo apagado é assunto de dados, não de manutenção. A trilha de dados e backup explica por que cada minuto de uso reduz a chance de recuperação e como montar uma rotina que evita a próxima perda.",
  },
  "computador-desliga-sozinho": {
    temaId: "manutencao-preventiva",
    porQue:
      "Desligamento sob carga costuma ser proteção térmica ou fonte degradada — os dois se antecipam com manutenção. A trilha preventiva mostra o que medir antes que o desligamento vire dano permanente.",
  },
  "notebook-nao-carrega": {
    temaId: "hardware-upgrades",
    porQue:
      "Carga envolve fonte, conector, bateria e circuito da placa. A trilha de hardware ajuda a identificar qual peça está na cadeia de falha e evita a troca de bateria que não resolve nada.",
  },
  "hd-fazendo-barulho": {
    temaId: "dados-backup",
    porQue:
      "Ruído mecânico é aviso de disco morrendo com os dados dentro. A trilha de dados e backup trata a prioridade correta: copiar primeiro, diagnosticar depois — nunca o contrário.",
  },
  "notebook-molhado": {
    temaId: "manutencao-preventiva",
    porQue:
      "Líquido inicia corrosão que avança por dias mesmo com o aparelho aparentando normalidade. A trilha preventiva explica o que fazer nas primeiras horas e por que ligar para testar é o erro mais caro.",
  },
  "computador-nao-da-imagem": {
    temaId: "hardware-upgrades",
    porQue:
      "Sem imagem, a investigação percorre memória, vídeo, fonte e monitor nessa ordem. A trilha de hardware descreve os testes de substituição que fazem sentido e os que só perdem tempo.",
  },
  "cheiro-de-queimado": {
    temaId: "manutencao-preventiva",
    porQue:
      "Odor de queimado é o único sintoma desta lista em que a orientação é desligar e parar. A trilha preventiva explica o risco elétrico e por que religar para conferir costuma transformar reparo em substituição.",
  },
  "windows-nao-inicia": {
    temaId: "windows-inicializacao",
    porQue:
      "O ponto em que a partida trava — firmware, gerenciador de boot ou área de trabalho — muda completamente o diagnóstico. A trilha de inicialização ensina a localizar esse estágio antes de cogitar formatação.",
  },
  "computador-esquentando": {
    temaId: "manutencao-preventiva",
    porQue:
      "Temperatura alta degrada desempenho antes de causar desligamento. A trilha preventiva mostra como medir, o que a limpeza resolve de fato e quando o problema é projeto de refrigeração, não sujeira.",
  },
  "impressora-nao-imprime": {
    temaId: "redes-wifi",
    porQue:
      "Impressora parada em escritório costuma ser endereço de rede que mudou, não defeito do equipamento. A trilha de redes cobre endereçamento estável, faixa correta e fila travada no sistema.",
  },
  "teclado-notebook-nao-funciona": {
    temaId: "hardware-upgrades",
    porQue:
      "Teclado que falha pode ser flat solto, membrana danificada ou controlador na placa. A trilha de hardware separa o que é peça substituível do que exige bancada.",
  },
  // Fase 2 do Atlas — pilares dedicados (páginas próprias, fora do cluster).
  "computador-lento": {
    temaId: "hardware-upgrades",
    porQue:
      "Lentidão persistente quase sempre é gargalo físico — disco mecânico no limite, memória saturada, temperatura alta — e não sujeira de sistema. A trilha de hardware mostra como confirmar qual componente limita a máquina antes de pagar por upgrade ou formatação que não resolve.",
  },
  "notebook-nao-liga": {
    temaId: "hardware-upgrades",
    porQue:
      "Não ligar é sintoma da cadeia de energia: fonte, conector, bateria e circuito da placa falham de formas diferentes. A trilha de hardware ensina a observar LEDs e o comportamento dos primeiros segundos — e em que ponto insistir em ligar começa a causar dano.",
  },
};

export interface AtlasPonteResolvida {
  tema: AtlasTema;
  porQue: string;
  /** Passo "verificar" da trilha: o que dá para conferir com segurança. */
  verificar: AtlasTema["trilha"][number] | undefined;
  /** Passo "parar": limite claro de atuação do usuário. */
  parar: AtlasTema["trilha"][number] | undefined;
  hubHref: string;
}

/** Resolve a ponte de um sintoma. Sem ponte declarada, retorna null (fail-closed). */
export function atlasPonteDoSintoma(slug: string): AtlasPonteResolvida | null {
  const ponte = ATLAS_PONTES[slug];
  if (!ponte) return null;
  const tema = ATLAS_TEMAS.find((t) => t.id === ponte.temaId);
  if (!tema) return null;
  return {
    tema,
    porQue: ponte.porQue,
    verificar: tema.trilha.find((p) => p.etapa === "verificar"),
    parar: tema.trilha.find((p) => p.etapa === "parar"),
    hubHref: `/guia-tecnico-informatica#tema-${tema.id}`,
  };
}

/**
 * FASE 4 — ponte sintoma → guia de decisão independente (/decisoes/<slug>).
 *
 * Fail-closed e curada: só entra o par em que a decisão realmente aparece no
 * atendimento daquele sintoma. Texto próprio por sintoma — nunca template.
 */
export const DECISAO_POR_SINTOMA: Record<string, { slug: string; porQue: string }> = {
  "computador-lento": {
    slug: "ssd-ou-memoria-ram",
    porQue:
      "Na lentidão, o dinheiro se decide entre disco e memória. O guia cruza os sinais observáveis para indicar qual dos dois limita a sua máquina — e quando nenhum upgrade resolve.",
  },
  "windows-nao-inicia": {
    slug: "formatar-ou-reparar",
    porQue:
      "Quando o sistema não sobe, a pergunta imediata é se vale reparar a instalação atual ou reinstalar do zero. O guia mostra o que cada caminho preserva e o que apaga.",
  },
  "tela-azul": {
    slug: "formatar-ou-reparar",
    porQue:
      "Tela azul recorrente pode ser software ou hardware. O guia separa os casos em que formatar resolve dos casos em que formatar só reinicia a contagem até o próximo travamento.",
  },
  "hd-fazendo-barulho": {
    slug: "hd-com-ruido",
    porQue:
      "Ruído mecânico muda a ordem das prioridades: copiar antes, diagnosticar depois. O guia explica por que cada nova tentativa de ligar reduz a chance de recuperar os dados.",
  },
  "notebook-nao-liga": {
    slug: "consertar-ou-substituir",
    porQue:
      "Falha de energia em notebook vai de conector barato a placa cara. O guia dá o critério de quando o reparo ainda vale frente ao valor atual do equipamento.",
  },
  "computador-esquentando": {
    slug: "consertar-ou-substituir",
    porQue:
      "Superaquecimento crônico às vezes é limite de projeto, não sujeira. O guia ajuda a decidir entre insistir na manutenção e trocar de equipamento.",
  },
};

/** Resolve a ponte de decisão de um sintoma; sem par curado, retorna null. */
export function decisaoDoSintoma(slug: string): { slug: string; porQue: string } | null {
  return DECISAO_POR_SINTOMA[slug] ?? null;
}
