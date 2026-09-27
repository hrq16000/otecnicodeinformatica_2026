import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Pinhais: USF Weissópolis I — Rua Rio Trombetas, 888.
// - Prefeitura de Pinhais: USF Weissópolis II — Rua Rio Solimões, 710.
// - Prefeitura de Pinhais: Escolas João Leopoldo Jacomel, Thereza Corrêa Machado e Severino Massignan.
const data = {
  nome: "Weissópolis",
  slug: "weissopolis",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Weissópolis, Pinhais | Suporte",
  metaDescription: "Assistência de informática no Weissópolis, Pinhais. Diagnóstico de computador, notebook, Wi-Fi e periféricos com triagem antes da execução.",
  h1: "Técnico de Informática no Weissópolis – Pinhais",
  subtitulo: "Diagnóstico técnico antes da solução, com atendimento remoto, presencial ou em bancada conforme a falha.",
  descricaoLonga: `O Weissópolis possui referências municipais bem distribuídas e oficialmente identificadas. A Prefeitura de Pinhais mantém duas unidades de saúde da família no bairro: a USF Weissópolis I, na Rua Rio Trombetas, e a USF Weissópolis II, na Rua Rio Solimões. A rede municipal também registra escolas como João Leopoldo Jacomel, Thereza Corrêa Machado e Severino Massignan, todas no Weissópolis. Isso permite organizar a localização do chamado com pontos concretos, sem inventar características do bairro.

No diagnóstico de informática, buscamos primeiro identificar qual parte do sistema falha. Em um computador que congela, a causa pode estar em armazenamento, memória, temperatura, driver ou sistema operacional. Em um notebook que desliga sob carga, é necessário observar ventilação e alimentação antes de pensar em reinstalar o Windows. Em uma impressora que desaparece da rede, o problema pode estar no equipamento, no driver ou na comunicação local.

Em redes domésticas ou de pequeno escritório, a medição também precede a recomendação. A pergunta não é apenas “o Wi-Fi está ruim?”, mas onde, em quais aparelhos e em que momento. Se a velocidade está boa por cabo e cai apenas em um cômodo, cobertura é uma hipótese. Se tudo fica lento ao mesmo tempo, pode existir gargalo no roteador, no provedor ou em outro ponto da rede.

Para armazenamento, não recomendamos troca apenas porque o computador é antigo. Verificamos saúde do disco, uso real de memória e comportamento do sistema. Quando existem arquivos importantes, a prioridade pode passar para backup antes de qualquer intervenção. Se houver sinais de falha no disco, insistir em uso intenso ou reinstalação pode ser contraproducente.

A página do Weissópolis combina essas decisões técnicas com referências locais verdadeiras. O conteúdo não é uma variação automática de outra página: o visitante encontra um roteiro de diagnóstico, entende por que diferentes sintomas levam a procedimentos diferentes e sabe o que enviar na primeira mensagem.`,
  pontosReferencia: [
    "Rua Rio Trombetas",
    "USF Weissópolis I",
    "Rua Rio Solimões",
    "USF Weissópolis II",
    "Escola João Leopoldo Jacomel",
    "Escola Thereza Corrêa Machado",
    "Escola Severino Massignan"
  ],
  tempoDeslocamento: "Agenda definida depois da triagem do problema e do endereço",
  servicosDestaque: [
    "Diagnóstico de travamentos e tela azul",
    "Notebook desligando ou aquecendo",
    "Configuração de impressora e rede",
    "Análise de SSD, HD e memória",
    "Backup antes de reinstalação",
    "Correção de drivers e Windows"
  ],
  conteudoExclusivo: `Quando vale formatar e quando vale investigar primeiro

No Weissópolis, a formatação não é usada como resposta automática para computador lento. Se o sistema ainda abre, é possível verificar armazenamento, memória, inicialização, temperatura e erros antes de apagar tudo. Em muitos casos, essa análise mostra se existe problema físico, gargalo de hardware ou apenas excesso de software.

Para notebook que desliga, a pergunta principal é quando isso acontece: parado, carregando, em videoconferência ou sob uso pesado. Para tela azul, uma foto do código de erro ajuda a separar driver, sistema e hardware. Para rede, testes em mais de um aparelho evitam culpar o roteador por uma falha isolada do computador.

Esse roteiro deixa o atendimento mais previsível e reduz troca de peça por tentativa. A localização no Weissópolis serve para organizar a visita; o diagnóstico continua sendo determinado pelos sinais do equipamento.`,
  problemasComuns: [
    "Tela azul com código recorrente",
    "Notebook desliga quando esquenta",
    "Computador lento apesar de pouco uso",
    "Impressora fica offline na rede",
    "Wi-Fi varia entre cômodos ou dispositivos",
    "HD ou SSD apresenta erros e lentidão"
  ],
  dicasLocais: `Ao pedir atendimento no Weissópolis, envie rua e referência próxima, como uma das USFs ou escolas municipais do bairro. Para tela azul, fotografe o código; para rede, teste outro aparelho no mesmo ponto; para lentidão, informe se piorou depois de atualização ou instalação de programa. Esses detalhes ajudam a decidir se o caso começa remoto, em visita ou em bancada.`,
};

const WeissopolisPinhais = () => <BairroTemplate data={data} />;

export default WeissopolisPinhais;
