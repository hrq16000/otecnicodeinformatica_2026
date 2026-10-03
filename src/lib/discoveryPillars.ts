export const DISCOVERY_PILLAR_LINKS = [
  {
    title: "Diagnóstico técnico",
    description: "Entenda como a causa da falha é confirmada antes de trocar peças.",
    to: "/diagnostico-tecnico",
  },
  {
    title: "Equipamentos atendidos",
    description: "Veja o que atendemos, modalidades indicadas e limites de cada categoria.",
    to: "/equipamentos-atendidos",
  },
  {
    title: "Áreas atendidas",
    description: "Consulte bairros, cidades e como a modalidade varia conforme a região.",
    to: "/areas-atendidas",
  },
  {
    title: "Coleta e entrega",
    description: "Saiba quando o equipamento precisa de bancada e como a logística funciona.",
    to: "/coleta-e-entrega",
  },
] as const;

export const DISCOVERY_PILLAR_PATHS = DISCOVERY_PILLAR_LINKS.map((item) => item.to);
