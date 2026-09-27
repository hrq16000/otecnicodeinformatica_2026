import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Pinhais: Escola Cândido Portinari — Rua Norberto Ribeiro da Motta, 480.
// - Prefeitura de Pinhais: Escola Marins de Souza Santos — Av. Cotinga, 2449.
// - Prefeitura de Pinhais: Escola Odile Charlotte Bruinjé — Rua Luiz Vasselai, 224.
// - Prefeitura de Pinhais: obras de revitalização nas ruas Cotovia e Tico-Tico em 2026.
// - Prefeitura de Pinhais: nova USF Jardim Claudia em implantação para substituir a USF Tebas.
const data = {
  nome: "Jardim Cláudia",
  slug: "jardim-claudia",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Jardim Cláudia, Pinhais | Diagnóstico",
  metaDescription: "Suporte de informática no Jardim Cláudia, Pinhais. Diagnóstico para PC, notebook e Wi-Fi, com atendimento definido após triagem do problema.",
  h1: "Técnico de Informática no Jardim Cláudia – Pinhais",
  subtitulo: "Atendimento técnico com triagem prévia, proteção dos dados e escolha da modalidade conforme o defeito.",
  descricaoLonga: `O Jardim Cláudia conta com várias referências oficiais que permitem localizar o chamado sem recorrer a descrições genéricas. A Prefeitura de Pinhais registra a Escola Municipal Cândido Portinari na Rua Norberto Ribeiro da Motta, a Escola Marins de Souza Santos na Avenida Cotinga e a Escola Odile Charlotte Bruinjé na Rua Luiz Vasselai. Em 2026, as ruas Cotovia e Tico-Tico também receberam obras de revitalização e novo asfaltamento. O município ainda informa a implantação de uma nova USF Jardim Claudia para substituir a atual USF Tebas.

Na assistência técnica, o endereço é só uma parte da triagem. O defeito define o procedimento. Um computador com tela azul após atualização precisa ter códigos e histórico analisados; um notebook que cai de desempenho ao esquentar pede medição de temperatura; um PC que não liga exige teste de alimentação e componentes. Formatação só entra quando existe motivo técnico e quando a situação dos arquivos está clara.

O mesmo vale para rede Wi-Fi. Uma casa com perda de sinal em um ponto específico não recebe a mesma recomendação de um imóvel em que todos os aparelhos apresentam lentidão. Antes de indicar mesh, repetidor ou troca de roteador, verificamos posição do equipamento, obstáculos, banda utilizada e comportamento por cabo. Em impressoras, a análise separa falha de driver, comunicação, fila e mecanismo.

Quando o equipamento precisa de abertura demorada ou testes de bancada, isso é explicado antes da retirada. Se o problema puder ser resolvido remotamente, evitamos deslocamento desnecessário. Essa combinação de referências reais do Jardim Cláudia com um roteiro técnico próprio transforma a página em conteúdo local de fato, e não em uma cópia produzida apenas pela troca do nome do bairro.`,
  pontosReferencia: [
    "Rua Norberto Ribeiro da Motta",
    "Escola Municipal Cândido Portinari",
    "Avenida Cotinga",
    "Escola Marins de Souza Santos",
    "Rua Luiz Vasselai",
    "Escola Odile Charlotte Bruinjé",
    "Ruas Cotovia e Tico-Tico"
  ],
  tempoDeslocamento: "Horário definido após confirmar endereço, equipamento e sintoma",
  servicosDestaque: [
    "Diagnóstico de tela azul e travamentos",
    "Notebook com aquecimento ou queda de desempenho",
    "Computador que não liga",
    "Configuração e diagnóstico de Wi-Fi",
    "Backup antes de formatação",
    "Impressora, drivers e periféricos"
  ],
  conteudoExclusivo: `O que observar antes de pedir o atendimento no Jardim Cláudia

Para tela azul, uma foto do código de erro vale mais do que a frase “o computador travou”. Para superaquecimento, informe em qual tarefa a temperatura sobe e se a ventoinha muda de ruído. Para Wi-Fi, diga quais cômodos funcionam bem e quais apresentam falha. Para impressora, informe se ela aparece no computador e se o erro ocorre ao enviar ou ao puxar papel.

Esses detalhes reduzem tentativas desnecessárias. Também ajudam a decidir se o atendimento deve começar por acesso remoto ou se o equipamento precisa de visita e bancada. Quando há dados importantes, avisar isso antes de qualquer reinstalação é essencial.

O Jardim Cláudia ganha assim uma página própria: referências locais específicas, conteúdo técnico diferente dos outros bairros e uma orientação prática que o visitante consegue usar antes mesmo de iniciar o chamado.`,
  problemasComuns: [
    "Tela azul com código recorrente depois de atualização",
    "Notebook perde desempenho quando aquece",
    "Computador não liga ou liga sem vídeo",
    "Wi-Fi funciona em parte do imóvel e cai em outros pontos",
    "Impressora aparece offline ou não recebe trabalhos",
    "Máquina precisa ser formatada, mas possui arquivos sem backup"
  ],
  dicasLocais: `Ao solicitar atendimento no Jardim Cláudia, envie sua rua e uma referência próxima, como Avenida Cotinga, Rua Norberto Ribeiro da Motta, Rua Luiz Vasselai, Cotovia ou Tico-Tico. Fotos do erro, da etiqueta do equipamento e do roteador ajudam na triagem. Se o problema começou depois de obra, mudança de ponto elétrico, atualização ou troca de equipamento de rede, informe isso também.`,
};

const JardimClaudia = () => <BairroTemplate data={data} />;

export default JardimClaudia;
