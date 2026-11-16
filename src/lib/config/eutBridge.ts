/**
 * Ponte comercial explícita entre O Técnico de Informática e Encontre um Técnico.
 * As URLs foram conferidas nas rotas públicas do projeto de destino.
 *
 * O telefone informado pelo proprietário é usado APENAS no link de triagem
 * para WhatsApp; não é exibido como texto nem transmitido por analytics.
 */
export const eutBridgeConfig = {
  cadastro: "https://www.encontreumtecnico.com.br/cadastro",
  tecnicos: "https://www.encontreumtecnico.com.br/tecnicos",
  tecnicosCuritiba: "https://www.encontreumtecnico.com.br/tecnicos?uf=PR&cidade=Curitiba",
  triagemWhatsApp: "5541997452053",
} as const;

export function abrirTriagemWhatsApp(mensagem: string): string {
  return `https://wa.me/${eutBridgeConfig.triagemWhatsApp}?text=${encodeURIComponent(mensagem)}`;
}
