import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Pinhais: Escola Municipal Dona Maria Chalcoski — Rua América do Sul, 989, Centro.
// - Prefeitura de Pinhais: SIC presencial — Rua Renato Nunes Ribas, 543, Centro.
// - Prefeitura de Pinhais: protocolo descentralizado — Av. Camilo Di Lellis, 453, Centro.
const data = {
  nome: "Centro de Pinhais",
  slug: "centro-pinhais",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Centro de Pinhais | Diagnóstico",
  metaDescription: "Técnico de informática no Centro de Pinhais. Triagem para computador, notebook, rede e periféricos, com atendimento conforme a natureza do problema.",
  h1: "Técnico de Informática no Centro de Pinhais",
  subtitulo: "Atendimento técnico organizado pelo sintoma e pelo endereço, sem prometer solução antes do diagnóstico.",
  descricaoLonga: `O Centro de Pinhais possui referências municipais claras para localizar um atendimento. A Escola Municipal Dona Maria Chalcoski fica na Rua América do Sul. O atendimento presencial do Serviço de Informação ao Cidadão da Prefeitura funciona na Rua Renato Nunes Ribas, e a Avenida Camilo Di Lellis concentra um dos protocolos descentralizados do município. Essas referências são mais úteis do que descrições vagas sobre “região central” ou “acesso rápido”.

Em informática, o Centro não recebe um roteiro diferente por ser uma área mais movimentada; o que muda é a logística. O diagnóstico continua dependendo do sintoma. Um notebook de trabalho que perde desempenho pode estar com falta de memória, temperatura elevada, armazenamento lento ou excesso de programas. Um desktop que não liga pede verificação de alimentação, memória e placa antes de qualquer reinstalação. Uma máquina que perdeu internet pode ter problema local mesmo quando a rede do imóvel está funcionando.

Para quem depende do equipamento durante o expediente, a triagem busca reduzir o tempo de indisponibilidade. Perguntamos qual tarefa foi interrompida, se existe outro computador disponível, se os arquivos estão sincronizados e se o problema pode ser reproduzido. Parte dos erros de software, configuração, e-mail e periféricos pode ser analisada remotamente. Defeitos físicos ou casos que exigem abertura da máquina vão para visita ou bancada.

Quando há necessidade de formatação, o backup é discutido antes. Quando a queixa é Wi-Fi, verificamos comportamento por dispositivo e por local. Quando a queixa é lentidão, não recomendamos SSD apenas pelo tempo de uso do computador; primeiro verificamos se o armazenamento realmente é o gargalo.

A página do Centro de Pinhais foi reescrita para servir como orientação de entrada: referências reais do município, perguntas úteis para a triagem e explicação clara sobre quando cada modalidade de atendimento faz sentido.`,
  pontosReferencia: [
    "Rua América do Sul",
    "Escola Municipal Dona Maria Chalcoski",
    "Rua Renato Nunes Ribas",
    "SIC presencial da Prefeitura",
    "Avenida Camilo Di Lellis"
  ],
  tempoDeslocamento: "Horário confirmado conforme endereço e modalidade necessária",
  servicosDestaque: [
    "Diagnóstico de computador usado para trabalho",
    "Notebook lento ou com travamentos",
    "Correção de Windows, e-mail e programas",
    "Configuração de impressora e periféricos",
    "Backup antes de formatação",
    "Diagnóstico de rede e Wi-Fi"
  ],
  conteudoExclusivo: `Como reduzir a indisponibilidade quando o computador é ferramenta de trabalho

No Centro de Pinhais, muitos chamados podem chegar de pessoas que precisam recuperar o uso da máquina sem perder arquivos ou configurações. A primeira pergunta, por isso, é o que parou: sistema, internet, programa específico, impressora ou o próprio equipamento.

Se o Windows ainda inicia, podemos coletar informações antes de qualquer alteração grande. Se o computador não liga, a triagem muda para energia, imagem e sinais físicos. Se o problema é rede, testamos outro equipamento para separar a conexão do defeito local. Se há arquivo importante sem cópia, backup entra na frente de formatação.

Essa forma de atendimento evita escolher uma solução antes de entender o impacto e a causa provável. A referência do endereço organiza a agenda; o objetivo é preservar dados e recuperar a função principal do equipamento com o menor retrabalho possível.`,
  problemasComuns: [
    "Computador de trabalho fica lento ou trava",
    "Notebook não inicia normalmente depois de atualização",
    "E-mail ou aplicativo profissional deixa de abrir",
    "Impressora ou scanner perde comunicação",
    "Wi-Fi funciona no celular, mas falha no computador",
    "Máquina precisa de reparo sem perder documentos locais"
  ],
  dicasLocais: `Ao pedir atendimento no Centro de Pinhais, informe a rua e uma referência como Avenida Camilo Di Lellis, Rua Renato Nunes Ribas ou Rua América do Sul. Explique qual atividade ficou bloqueada e se existe backup dos arquivos. Em falha de internet, diga se outros aparelhos continuam conectados; em tela azul ou erro de programa, envie uma foto da mensagem.`,
};

const PinhaisCentro = () => <BairroTemplate data={data} />;

export default PinhaisCentro;
