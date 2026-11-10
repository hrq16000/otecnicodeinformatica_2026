/**
 * Localidades informadas pelo responsável pelo portal em 10/11/2026.
 * A inclusão indica apenas uma referência de contato/atuação informada:
 * NÃO é prova de cadastro aprovado, disponibilidade atual, SLA ou cobertura.
 * Verificação individual obrigatória antes de qualquer oferta presencial.
 */
export const CAPITAIS_BRASIL = [
  { uf: "AC", cidade: "Rio Branco" },
  { uf: "AL", cidade: "Maceió" },
  { uf: "AP", cidade: "Macapá" },
  { uf: "AM", cidade: "Manaus" },
  { uf: "BA", cidade: "Salvador" },
  { uf: "CE", cidade: "Fortaleza" },
  { uf: "DF", cidade: "Brasília" },
  { uf: "ES", cidade: "Vitória" },
  { uf: "GO", cidade: "Goiânia" },
  { uf: "MA", cidade: "São Luís" },
  { uf: "MT", cidade: "Cuiabá" },
  { uf: "MS", cidade: "Campo Grande" },
  { uf: "MG", cidade: "Belo Horizonte" },
  { uf: "PA", cidade: "Belém" },
  { uf: "PB", cidade: "João Pessoa" },
  { uf: "PR", cidade: "Curitiba" },
  { uf: "PE", cidade: "Recife" },
  { uf: "PI", cidade: "Teresina" },
  { uf: "RJ", cidade: "Rio de Janeiro" },
  { uf: "RN", cidade: "Natal" },
  { uf: "RS", cidade: "Porto Alegre" },
  { uf: "RO", cidade: "Porto Velho" },
  { uf: "RR", cidade: "Boa Vista" },
  { uf: "SC", cidade: "Florianópolis" },
  { uf: "SP", cidade: "São Paulo" },
  { uf: "SE", cidade: "Aracaju" },
  { uf: "TO", cidade: "Palmas" },
] as const;

/** Cidades com presença de parceiros informada, sujeita a confirmação operacional. */
export const LOCALIDADES_PARCEIRAS_INFORMADAS = [
  { uf: "AC", estado: "Acre", cidades: ["Rio Branco"] },
  { uf: "AL", estado: "Alagoas", cidades: ["Coruripe"] },
  { uf: "AM", estado: "Amazonas", cidades: ["Itacoatiara"] },
  { uf: "BA", estado: "Bahia", cidades: ["Bom Jesus da Lapa", "Tucano", "Poções", "Conceição do Coité", "Jequié", "Santo Antônio de Jesus", "Valença", "Cruz das Almas"] },
  { uf: "CE", estado: "Ceará", cidades: ["Aracati", "Tianguá", "Maracanaú"] },
  { uf: "ES", estado: "Espírito Santo", cidades: ["Nova Venécia", "Colatina", "São Mateus"] },
  { uf: "GO", estado: "Goiás", cidades: ["Rio Verde", "Mineiros"] },
  { uf: "MA", estado: "Maranhão", cidades: ["Barreirinhas", "Imperatriz"] },
  { uf: "MG", estado: "Minas Gerais", cidades: ["Juiz de Fora", "Poços de Caldas", "Muriaé", "Três Corações", "Além Paraíba", "Salinas", "Visconde do Rio Branco"] },
  { uf: "MS", estado: "Mato Grosso do Sul", cidades: ["Dourados", "Sidrolândia", "Naviraí"] },
  { uf: "MT", estado: "Mato Grosso", cidades: ["Cuiabá"] },
  { uf: "PA", estado: "Pará", cidades: ["Abaetetuba", "Paragominas", "Santarém", "Cametá", "Barcarena", "Altamira", "Bragança"] },
  { uf: "PB", estado: "Paraíba", cidades: ["Campina Grande"] },
  { uf: "PE", estado: "Pernambuco", cidades: ["Araripina", "Salgueiro"] },
  { uf: "PI", estado: "Piauí", cidades: ["Campo Maior", "Altos"] },
  { uf: "PR", estado: "Paraná", cidades: ["Medianeira", "Londrina", "Cascavel", "Paranaguá", "Arapongas", "Cambé", "Francisco Beltrão", "Marechal Cândido Rondon"] },
  { uf: "RJ", estado: "Rio de Janeiro", cidades: ["Magé", "Resende", "Saquarema", "Três Rios", "Barra do Piraí", "Seropédica", "Campos dos Goytacazes", "Mangaratiba", "Volta Redonda", "Macaé"] },
  { uf: "RO", estado: "Rondônia", cidades: ["Porto Velho", "Vilhena"] },
  { uf: "RR", estado: "Roraima", cidades: ["Boa Vista"] },
  { uf: "RS", estado: "Rio Grande do Sul", cidades: ["Gravataí", "Santa Maria", "Rio Grande", "Santa Cruz do Sul", "Tramandaí", "Pelotas", "Vacaria"] },
  { uf: "SC", estado: "Santa Catarina", cidades: ["Tubarão", "Canoinhas"] },
  { uf: "SP", estado: "São Paulo", cidades: ["Presidente Venceslau", "Nova Odessa", "São Manuel", "Lins", "Andradina"] },
] as const;

export const TOTAL_LOCALIDADES_INFORMADAS = LOCALIDADES_PARCEIRAS_INFORMADAS.reduce(
  (total, grupo) => total + grupo.cidades.length,
  0,
);
