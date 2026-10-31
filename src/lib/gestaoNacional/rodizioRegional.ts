/**
 * Rodada 3 — seleção impessoal para EXIBIÇÃO de técnicos (modelo em rascunho).
 *
 * Funções puras e isoladas: não importam backend, não acionam/despacham técnico,
 * não criam pedido, não armazenam dados e não intermediam aceite ou pagamento.
 * Sem lista real de profissionais: o cadastro e as provas de comunidade são
 * fornecidos por uma futura camada autenticada, nunca pelo print de WhatsApp.
 *
 * INTEGRAÇÃO FUTURA: manter o cursor por região + serviço em transação atômica,
 * com auditoria de apresentação, recusa, disponibilidade e concorrência.
 * Chamar esta função repetidamente sem persistir cursor NÃO é rodízio real.
 */

/** Não incluir nome, telefone, documento nem endereço do profissional nesta camada. */
export interface TecnicoElegibilidadeNacional {
  /** ID interno estável e não identificador pessoal público. */
  id: string;
  comunidadeWhatsapp: "confirmada" | "pendente" | "nao_confirmada";
  cadastroPlataforma: "validado" | "pendente" | "suspenso";
  habilitacao: "habilitado" | "pendente" | "suspenso";
  disponibilidade: "disponivel" | "ocupado" | "indisponivel";
  uf: string;
  municipiosAtendidos: readonly string[];
  servicosHabilitados: readonly string[];
  /** Distância computada internamente, sem divulgar endereço do técnico. */
  distanciaIdaMetros: number | null;
  /** Limite que o profissional aceitou atender. */
  raioAtendimentoMetros: number | null;
}

export interface ConsultaRodizioRegional {
  uf: string;
  municipio: string;
  servico: string;
  /** Último profissional apresentado nesta região/serviço, armazenado pelo servidor. */
  ultimoApresentadoId: string | null;
}

export type ResultadoRodizioRegional =
  | { disponivel: false; tecnicoId: null; proximoCursorId: null; quantidadeElegiveis: 0 }
  | { disponivel: true; tecnicoId: string; proximoCursorId: string; quantidadeElegiveis: number };

function chaveTerritorial(valor: string): string {
  return typeof valor === "string"
    ? valor.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR")
    : "";
}

function chaveUf(valor: string): string {
  return typeof valor === "string" ? valor.trim().toUpperCase() : "";
}

function distanciaValida(metros: number | null): metros is number {
  return typeof metros === "number" && Number.isSafeInteger(metros) && metros >= 0;
}

function textoValido(valor: string): boolean {
  return typeof valor === "string" && valor.trim().length > 0;
}

/** Filtro fechado: desconhecido, pendente, suspenso, ocupado = não elegível. */
export function tecnicoElegivelParaConsulta(
  tecnico: TecnicoElegibilidadeNacional,
  consulta: Pick<ConsultaRodizioRegional, "uf" | "municipio" | "servico">,
): boolean {
  if (!tecnico || !consulta) return false;
  if (
    tecnico.comunidadeWhatsapp !== "confirmada" ||
    tecnico.cadastroPlataforma !== "validado" ||
    tecnico.habilitacao !== "habilitado" ||
    tecnico.disponibilidade !== "disponivel"
  ) return false;
  if (!textoValido(tecnico.id) || !textoValido(consulta.municipio) || !textoValido(consulta.servico)) {
    return false;
  }
  const uf = chaveUf(consulta.uf);
  if (!/^[A-Z]{2}$/.test(uf) || chaveUf(tecnico.uf) !== uf) return false;
  if (
    !Array.isArray(tecnico.municipiosAtendidos) ||
    !tecnico.municipiosAtendidos.some(
      (municipio) => chaveTerritorial(municipio) === chaveTerritorial(consulta.municipio),
    )
  ) return false;
  if (
    !Array.isArray(tecnico.servicosHabilitados) ||
    !tecnico.servicosHabilitados.some(
      (servico) => chaveTerritorial(servico) === chaveTerritorial(consulta.servico),
    )
  ) return false;
  if (
    !distanciaValida(tecnico.distanciaIdaMetros) ||
    !distanciaValida(tecnico.raioAtendimentoMetros) ||
    tecnico.distanciaIdaMetros > tecnico.raioAtendimentoMetros
  ) return false;
  return true;
}

/**
 * Retorna somente ID interno e cursor. O servidor decide se/como mostrar
 * o perfil ao cliente, após regras de autorização. Sem preferência pessoal,
 * lance, posição paga, ordem de inscrição ou classificação por menor preço.
 */
export function proximoTecnicoRegional(
  tecnicos: readonly TecnicoElegibilidadeNacional[],
  consulta: ConsultaRodizioRegional,
): ResultadoRodizioRegional {
  if (!Array.isArray(tecnicos) || !consulta) {
    throw new TypeError("Consulta/rol de profissionais inválido.");
  }
  if (
    !/^[A-Z]{2}$/.test(chaveUf(consulta.uf)) ||
    !textoValido(consulta.municipio) ||
    !textoValido(consulta.servico) ||
    !(consulta.ultimoApresentadoId === null || textoValido(consulta.ultimoApresentadoId))
  ) {
    throw new RangeError("Dados regionais ou cursor inválidos.");
  }

  // Não permitir o mesmo ID duas vezes — fail-closed evita prioridade implícita.
  const ids = new Set<string>();
  for (const tecnico of tecnicos) {
    if (!tecnico || !textoValido(tecnico.id) || ids.has(tecnico.id)) {
      throw new Error("Cadastro duplicado ou inválido: rodízio bloqueado.");
    }
    ids.add(tecnico.id);
  }

  const elegiveis = tecnicos
    .filter((tecnico) => tecnicoElegivelParaConsulta(tecnico, consulta))
    .map((tecnico) => tecnico.id)
    .sort((a, b) => a < b ? -1 : a > b ? 1 : 0);

  if (elegiveis.length === 0) {
    return { disponivel: false, tecnicoId: null, proximoCursorId: null, quantidadeElegiveis: 0 };
  }

  // Caso o antigo profissional saia da elegibilidade, seguir para o próximo ID
  // lexicográfico sem resetar a preferência ao primeiro.
  const indice = consulta.ultimoApresentadoId === null
    ? 0
    : elegiveis.findIndex((id) => id > consulta.ultimoApresentadoId!);
  const tecnicoId = elegiveis[indice === -1 ? 0 : indice];
  return {
    disponivel: true,
    tecnicoId,
    proximoCursorId: tecnicoId,
    quantidadeElegiveis: elegiveis.length,
  };
}
