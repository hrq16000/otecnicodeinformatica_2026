/**
 * ============================================================================
 * MÓDULO ORDEM DE SERVIÇO — ROTEAMENTO DE MODALIDADE E TERMOS
 * ============================================================================
 * Fonte única da lógica que decide entre:
 *   A) Visita técnica / inspeção (R$ 99,99 · até 30 min · item ligando)
 *   B) Coleta, entrega e laboratório (mínimo pré-aprovado R$ 299,99)
 *
 * Regras puras e testáveis — a página só apresenta o resultado.
 * Nenhum dado de contato (telefone, e-mail, CNPJ) é publicado aqui: o
 * pagamento e o canal seguem exclusivamente pelo atendimento no WhatsApp.
 */

export type ModalidadeOsId = "visita" | "laboratorio";

export interface ModalidadeOs {
  id: ModalidadeOsId;
  titulo: string;
  valorLabel: string;
  valorNota: string;
  prazo: string;
  escopo: string;
  itens: string[];
}

export const MODALIDADE_VISITA: ModalidadeOs = {
  id: "visita",
  titulo: "Visita técnica de inspeção",
  valorLabel: "R$ 99,99",
  valorNota: "cada 30 minutos de atendimento no local",
  prazo: "Agendamento conforme disponibilidade da agenda e da região.",
  escopo:
    "Serviços rápidos, upgrades, atualização de sistema, montagem, configuração e inspeção técnica de até 30 minutos — válido apenas para equipamentos que ligam e funcionam.",
  itens: [
    "A inspeção serve para entender o problema no local e montar o orçamento.",
    "Inspeção não tem garantia e não há compromisso de reparo imediato.",
    "Peças, componentes e licenças não estão inclusos.",
    "Se o caso exigir bancada, o atendimento migra para coleta e laboratório.",
  ],
};

export const MODALIDADE_LABORATORIO: ModalidadeOs = {
  id: "laboratorio",
  titulo: "Coleta, entrega e laboratório",
  valorLabel: "Mínimo pré-aprovado R$ 299,99",
  valorNota: "com garantia de 90 dias sobre o reparo executado",
  prazo: "Coleta e entrega entre 2 e 90 dias úteis, conforme fila e complexidade.",
  escopo:
    "Eletrônicos que exigem bancada (TV, computador, notebook, Surface, monitor, som, placas) ou problemas que não se resolvem em visita.",
  itens: [
    "Diagnóstico inicial de R$ 99,99, abatido do reparo se o orçamento for aprovado.",
    "Cancelamento sem ônus apenas se manifestado em até 24 horas após a coleta.",
    "Peças e componentes não estão inclusos no valor mínimo.",
    "Reparo executado após aprovação do orçamento final.",
  ],
};

export const MODALIDADES_OS: ModalidadeOs[] = [MODALIDADE_VISITA, MODALIDADE_LABORATORIO];

/** Equipamentos que sempre vão para bancada. */
const EQUIPAMENTOS_LABORATORIO =
  /(\btv\b|televis|smart ?tv|monitor|surface|caixa de som|som\b|soundbar|r[áa]dio|placa|placa[- ]m[ãa]e|celular|smartphone|tablet|console|playstation|xbox|impressora t[ée]rmica)/i;

/** Sintomas que impedem inspeção rápida no local. */
const SINTOMAS_LABORATORIO =
  /(n[ãa]o liga|nao liga|sem imagem|imagem falha|molh|caiu na [áa]gua|queim|curto|cheiro de queimado|tela (quebrad|trincad|rachad)|n[ãa]o carrega|superaquec|desliga sozinho|reballing|chip|bga|solda|circuito|placa danificad)/i;

/** Serviços tipicamente resolvidos em até 30 minutos no local. */
const SINTOMAS_VISITA =
  /(upgrade|mem[óo]ria|ssd|hd\b|formata|instal|atualiza|configur|montagem|montar|rede|wi-?fi|roteador|internet|impressora|backup|lentid|lento|v[íi]rus|senha|windows)/i;

export interface EntradaModalidade {
  equipamento: string;
  problema: string;
  /** O equipamento liga e funciona? `false` força laboratório. */
  liga: boolean;
}

export interface DecisaoModalidade {
  modalidade: ModalidadeOs;
  /** Motivo legível, exibido ao cliente e enviado no resumo. */
  motivo: string;
  /** `true` quando a regra é obrigatória e o cliente não pode trocar. */
  travada: boolean;
}

/**
 * Decide a modalidade a partir do equipamento, do defeito e do estado do item.
 * Fail-safe: na dúvida, encaminha para laboratório (nunca promete visita
 * resolutiva para um caso que exige bancada).
 */
export function decidirModalidadeOs(entrada: EntradaModalidade): DecisaoModalidade {
  const equipamento = entrada.equipamento.trim();
  const problema = entrada.problema.trim();
  const texto = `${equipamento} ${problema}`;

  if (!entrada.liga) {
    return {
      modalidade: MODALIDADE_LABORATORIO,
      motivo: "O equipamento não está ligando ou não funciona — o diagnóstico precisa de bancada.",
      travada: true,
    };
  }

  if (EQUIPAMENTOS_LABORATORIO.test(equipamento)) {
    return {
      modalidade: MODALIDADE_LABORATORIO,
      motivo: `Equipamentos como "${equipamento}" são atendidos em laboratório, com coleta e entrega.`,
      travada: true,
    };
  }

  if (SINTOMAS_LABORATORIO.test(texto)) {
    return {
      modalidade: MODALIDADE_LABORATORIO,
      motivo: "O defeito relatado indica reparo de circuito, que só é feito em bancada.",
      travada: true,
    };
  }

  if (SINTOMAS_VISITA.test(texto)) {
    return {
      modalidade: MODALIDADE_VISITA,
      motivo: "Serviço compatível com inspeção ou execução rápida no local, com o equipamento ligando.",
      travada: false,
    };
  }

  return {
    modalidade: MODALIDADE_LABORATORIO,
    motivo:
      "Sem sinal claro de serviço rápido, o caso entra como laboratório para não prometer solução em visita.",
    travada: false,
  };
}

// ── TERMOS ───────────────────────────────────────────────────────────────

export interface BlocoTermos {
  id: string;
  titulo: string;
  /** Aceite obrigatório com este rótulo. */
  aceite: string;
  paragrafos: string[];
}

export const TERMOS_VISITA: BlocoTermos[] = [
  {
    id: "visita-escopo",
    titulo: "Escopo e expectativa da inspeção",
    aceite: "Entendi que a inspeção é diagnóstica, não tem garantia e serve para montar o orçamento.",
    paragrafos: [
      "A visita técnica de inspeção custa R$ 99,99 a cada 30 minutos e é válida apenas para equipamentos que estão ligando e funcionando.",
      "Serviços cobertos: upgrades, atualização de sistema, montagem, configuração e inspeção técnica.",
      "A inspeção não possui garantia e não há compromisso de reparo no mesmo atendimento. O objetivo é entender o problema para montar o orçamento.",
      "Peças, componentes e licenças não estão inclusos.",
    ],
  },
  {
    id: "visita-conduta",
    titulo: "Regras de conduta no local (obrigatórias)",
    aceite: "Concordo com as regras de estacionamento, segurança, ambiente e foco durante o atendimento.",
    paragrafos: [
      "Estacionamento: é responsabilidade do solicitante fornecer vaga ou reembolsar o custo do estacionamento.",
      "Segurança e foco: manter distância segura da bancada improvisada. Cães e crianças devem ficar isolados da área de trabalho.",
      "Ambiente: não é permitido fumar no interior ou próximo do local do atendimento. Sem barulhos (TV, rádio, celular alto) e sem odores fortes.",
      "Interação: evite diálogos e perguntas durante a execução. Toda dúvida deve ser esclarecida antes do agendamento.",
    ],
  },
];

export const TERMOS_LABORATORIO: BlocoTermos[] = [
  {
    id: "lab-procedimentos",
    titulo: "Procedimentos inclusos na tentativa de reparo",
    aceite: "Li e entendi os procedimentos aplicados na tentativa de reparo.",
    paragrafos: [
      "No processo de reparo são executados os seguintes procedimentos como tentativa de sanar o defeito: reparo no circuito.",
      "Processos inclusos em todos os reparos: banho químico, limpeza completa e troca de pasta térmica (12.8 W/mK, alta performance).",
    ],
  },
  {
    id: "lab-valores",
    titulo: "Valores, diagnóstico e garantia",
    aceite: "Aceito o valor mínimo pré-aprovado de R$ 299,99 e o diagnóstico de R$ 99,99.",
    paragrafos: [
      "Valor mínimo pré-aprovado: R$ 299,99, com garantia de 90 dias sobre o reparo executado.",
      "Se aprovado, é pago o valor inicial de R$ 99,99, abatido do valor do reparo. Se o problema não for sanado, esse valor cobre o custo da tentativa e do diagnóstico.",
      "O pagamento (PIX) é combinado no atendimento pelo WhatsApp, com os dados enviados no momento da aprovação.",
      "Após o diagnóstico, o valor final é informado antes de qualquer execução.",
      "Este é um orçamento. Trabalhamos com prestadores especializados em várias regiões do Brasil; conforme a fila, o equipamento pode ser direcionado a laboratório especializado. Peças não inclusas.",
    ],
  },
  {
    id: "lab-reballing",
    titulo: "Aviso importante — reballing e risco de dano",
    aceite: "Estou ciente do risco de dano irreversível quando o reballing for necessário.",
    paragrafos: [
      "Caso seja necessário realizar reballing, o equipamento será submetido a altas temperaturas — etapa indispensável ao procedimento.",
      "Devido ao estado prévio da placa, podem ocorrer danos irreversíveis.",
      "O procedimento é realizado com equipamento profissional Honton R690, com controle e precisão de temperatura.",
    ],
  },
  {
    id: "lab-taxas",
    titulo: "Taxas, cancelamento, prazos e abandono",
    aceite: "Aceito as taxas de tentativa e cancelamento, os prazos e a regra de equipamento abandonado.",
    paragrafos: [
      "1. Taxa de tentativa de reparo: se os processos não resolverem o problema ou mudarem o defeito, é cobrada uma taxa fixa por modelo, à vista ou PIX, referente a insumos e tempo dedicado.",
      "2. Taxa de cancelamento: após a aprovação do orçamento, ou após 24 horas úteis da coleta, é cobrado R$ 299,99 (taxa mínima). Caso o orçamento não seja aprovado, a retirada do equipamento é feita via coleta. Não realizamos entregas em casos de desistência, cancelamento ou orçamento não aprovado.",
      "3. Equipamentos abandonados: se não retirados após notificação pelos canais de atendimento, serão reciclados ao exceder 90 dias de armazenamento.",
      "4. Tempo de reparo: após a aprovação do orçamento, de 15 a 45 dias.",
      "Coleta e entrega ocorrem entre 2 e 90 dias úteis. Desistência sem ônus somente em até 24 horas após a coleta.",
    ],
  },
];

export function termosDaModalidade(id: ModalidadeOsId): BlocoTermos[] {
  return id === "visita" ? TERMOS_VISITA : TERMOS_LABORATORIO;
}

// ── CÓDIGO ÚNICO E MENSAGEM ──────────────────────────────────────────────

const OS_PREFIXO = "OS-OTI";

/** Código único no formato OS-OTI-AAAAMMDD-0000. */
export function gerarCodigoOs(agora: Date = new Date()): string {
  const p = (n: number) => String(n).padStart(2, "0");
  const data = `${agora.getFullYear()}${p(agora.getMonth() + 1)}${p(agora.getDate())}`;
  const seq = String(Math.floor(Math.random() * 9000) + 1000);
  return `${OS_PREFIXO}-${data}-${seq}`;
}

export interface DadosOs {
  codigo: string;
  nome: string;
  local: string;
  equipamento: string;
  marcaModelo: string;
  acessorios: string;
  problema: string;
  liga: boolean;
  decisao: DecisaoModalidade;
  aceites: string[];
}

/**
 * Mensagem de WhatsApp: enxuta, organizada e sem PII além do que o próprio
 * cliente digitou. Sem linhas vazias duplicadas e sem placeholders soltos.
 */
export function montarMensagemOs(dados: DadosOs): string {
  const m = dados.decisao.modalidade;
  const linhas: string[] = [
    `*Ordem de serviço ${dados.codigo}*`,
    `Modalidade: ${m.titulo}`,
    `Valor: ${m.valorLabel} — ${m.valorNota}`,
    "",
    "*Equipamento*",
    `• Item: ${dados.equipamento}${dados.marcaModelo ? ` (${dados.marcaModelo})` : ""}`,
    `• Estado: ${dados.liga ? "liga e funciona" : "não liga / não funciona"}`,
    `• Defeito: ${dados.problema}`,
    dados.acessorios ? `• Acessórios: ${dados.acessorios}` : "",
    "",
    "*Cliente*",
    `• Nome: ${dados.nome}`,
    dados.local ? `• Bairro/cidade: ${dados.local}` : "",
    "",
    "*Condições aceitas*",
    ...dados.aceites.map((a) => `• ${a}`),
    "",
    `Motivo da modalidade: ${dados.decisao.motivo}`,
    m.id === "laboratorio"
      ? "Ciente do mínimo pré-aprovado de R$ 299,99, do diagnóstico de R$ 99,99 abatido e da desistência sem ônus em até 24h após a coleta."
      : "Ciente de que a inspeção é diagnóstica, sem garantia, cobrada a cada 30 minutos.",
  ];

  return linhas
    .filter((l, i, arr) => l !== "" || (i > 0 && arr[i - 1] !== ""))
    .join("\n")
    .trim();
}
