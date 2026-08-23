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
    q: "Quanto custa o serviço de técnico de informática em Curitiba?",
    a: "A visita técnica começa em R$ 99,99. O valor do atendimento é fechado no local e você só paga se aprovar. Aceitamos PIX, cartão e dinheiro.",
  },
  {
    q: "O técnico vai até minha casa ou empresa?",
    a: "Sim. Atendimento domiciliar em toda Curitiba e região metropolitana (São José dos Pinhais, Araucária, Campo Largo, Pinhais, Colombo). O técnico vai com todas as ferramentas.",
  },
  {
    q: "Quanto tempo demora para o técnico chegar?",
    a: "Na maioria dos casos atendemos conforme a disponibilidade da agenda, com deslocamento médio de 30 a 60 minutos. Para urgências há atendimento prioritário.",
  },
  {
    q: "Vocês consertam notebook de qualquer marca?",
    a: "Sim. Dell, HP, Lenovo, Acer, Asus, Samsung, LG, Positivo e outras. Limpeza, formatação, troca de tela, teclado, bateria e placa-mãe.",
  },
  {
    q: "Os serviços têm garantia?",
    a: "Sim. O serviço executado tem 90 dias de garantia sobre a mão de obra, registrada por escrito no valor aprovado. Peças e componentes seguem a garantia do fornecedor/fabricante.",
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
