/**
 * Fonte única das perguntas frequentes da HOME.
 *
 * Regra de paridade (Rich Results): o mesmo texto precisa estar VISÍVEL no HTML
 * servido (SSR) e no FAQPage JSON-LD. Antes desta versão o schema saía no SSR,
 * mas o bloco visível vivia dentro do pacote lazy abaixo da dobra — o HTML
 * inicial tinha marcação sem conteúdo correspondente.
 *
 * Alterar aqui altera os dois lados ao mesmo tempo; nunca duplicar o texto.
 */
export interface HomeFaqItem {
  q: string;
  a: string;
}

export const HOME_FAQ: HomeFaqItem[] = [
  {
    q: "Quanto custa o atendimento?",
    a: "Os atendimentos começam a partir de R$ 99,99. Esse é um valor inicial, não um preço fechado: a modalidade (remoto, visita ou coleta), o equipamento e o problema mudam o total. Peças, componentes e licenças nunca estão inclusas.",
  },
  {
    q: "Preciso saber qual é o defeito antes de chamar?",
    a: "Não. Descrever o sintoma já basta: o que aparece na tela, quando começou, se cai energia, se faz barulho. Identificar a causa é parte do nosso trabalho, não do seu.",
  },
  {
    q: "Vocês atendem em casa?",
    a: "Sim, quando a visita é compatível com o caso. Ela funciona bem quando a máquina liga e a necessidade é configuração, sistema ou instalação de peça. Falha de hardware costuma exigir bancada, e aí o caminho é a coleta.",
  },
  {
    q: "Quanto tempo demora para o técnico chegar?",
    a: "Depende da agenda, da sua localização e do trânsito. Em atendimentos próximos o deslocamento costuma ficar entre 30 e 60 minutos, mas o horário só é confirmado na triagem — não prometemos prazo antes de checar a disponibilidade real.",
  },
  {
    q: "Atendem empresas?",
    a: "Sim. Estações de trabalho, rede, impressoras, incidentes que param o time e manutenção programada. A triagem empresarial prioriza o que impede as pessoas de trabalhar.",
  },
  {
    q: "Fazem atendimento remoto?",
    a: "Em parte dos casos de software — sistema, configuração, e-mail, programas — o acesso remoto resolve sem deslocamento. Problema físico não se resolve remotamente, e dizemos isso na triagem.",
  },
  {
    q: "Trabalham com notebook?",
    a: "Sim, é a maior parte da demanda: lentidão, superaquecimento, não liga, tela, teclado, bateria, carga e upgrades. Atendemos Dell, HP, Lenovo, Acer, Asus, Samsung, LG, Positivo e outras marcas.",
  },
  {
    q: "Fazem upgrade para SSD?",
    a: "Sim, com checagem de compatibilidade antes. Quando possível, o sistema é migrado para o SSD para você não perder programas e configurações. O SSD é peça e é cobrado à parte.",
  },
  {
    q: "Trabalham com computador gamer?",
    a: "Sim. Montagem, troca de plataforma, refrigeração, fonte e diagnóstico de instabilidade sob carga entram no mesmo escopo técnico.",
  },
  {
    q: "Recuperam arquivos?",
    a: "Fazemos a tentativa e explicamos o cenário real antes. Recuperação de dados não é garantida: depende do estado da mídia, e disco com falha mecânica interna exige laboratório especializado.",
  },
  {
    q: "O diagnóstico tem custo?",
    a: "Sim, o diagnóstico é trabalho técnico e está dentro do valor da modalidade escolhida. O que não acontece é execução de serviço sem você aprovar antes.",
  },
  {
    q: "Peças estão incluídas?",
    a: "Não. Peças, componentes, licenças e materiais são orçados separadamente e só são comprados depois da sua aprovação.",
  },
  {
    q: "Como funciona a coleta?",
    a: "Na modalidade de diagnóstico com compromisso, a coleta e a entrega estão inclusas no valor mínimo pré-aprovado de R$ 299,99. O cancelamento vale até 24 horas corridas após a coleta.",
  },
  {
    q: "Os serviços têm garantia?",
    a: "Sim. O serviço executado tem 90 dias de garantia sobre a mão de obra, registrada por escrito no valor aprovado. Peças e componentes seguem a garantia do fornecedor ou fabricante.",
  },
];

export const buildHomeFaqSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});
