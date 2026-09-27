import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Pinhais: USF Tebas — Av. Juriti, 132, Jardim Cláudia.
// - Prefeitura de Pinhais: Escola Municipal Odile Charlotte Bruinjé — Rua Luiz Vasselai, 224.
// - Prefeitura de Pinhais: obras de infraestrutura na Rua Tico-Tico em 2026.
const data = {
  nome: "Jardim Cláudia",
  slug: "jardim-claudia",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Jardim Cláudia, Pinhais | Diagnóstico",
  metaDescription: "Técnico de informática no Jardim Cláudia, Pinhais. Triagem pelo WhatsApp, atendimento conforme o defeito e coleta quando a bancada é necessária.",
  h1: "Técnico de Informática no Jardim Cláudia – Pinhais",
  subtitulo: "Triagem antes do deslocamento, diagnóstico por sintoma e execução somente depois da definição do escopo.",
  descricaoLonga: `O Jardim Cláudia possui referências municipais úteis para a localização do chamado. A USF Tebas fica na Avenida Juriti, a Escola Municipal Odile Charlotte Bruinjé na Rua Luiz Vasselai e a Prefeitura realizou em 2026 obras de drenagem e pavimentação na Rua Tico-Tico. Esses pontos ajudam a confirmar a área do atendimento, sem criar promessa de chegada com base apenas no nome do bairro.

O atendimento de informática começa pela triagem. Perguntamos qual é o equipamento, qual sintoma aparece e se a máquina ainda inicia. Computador que não liga, notebook que aquece, Windows em tela azul, Wi-Fi instável e arquivos apagados exigem procedimentos diferentes.

Quando a queixa é lentidão, observamos armazenamento, memória, temperatura e programas de inicialização antes de sugerir formatação ou upgrade. Em notebook, a condição do carregador, bateria e conector também pode alterar o diagnóstico. Em desktop, alimentação, memória e vídeo entram na sequência de teste quando não há imagem.

Em Wi-Fi, medimos o comportamento no ponto principal e nos ambientes onde ocorre a falha. Isso evita comprar repetidor para um problema que pode estar no roteador, na configuração ou na conexão de entrada.

Quando existem dados importantes, a preservação vem antes da reinstalação. Se o serviço exige abertura profunda, solda, troca de tela ou teste prolongado, a coleta para bancada pode ser indicada. O cliente recebe o diagnóstico e aprova o escopo antes da execução.`,
  pontosReferencia: [
    "USF Tebas – Av. Juriti",
    "Escola Municipal Odile Charlotte Bruinjé – Rua Luiz Vasselai",
    "Rua Tico-Tico",
    "Eixo da Avenida Juriti",
    "Eixo da Rua Luiz Vasselai"
  ],
  tempoDeslocamento: "Agenda confirmada após endereço e triagem",
  servicosDestaque: [
    "Diagnóstico de computador e notebook",
    "Formatação com preservação de arquivos",
    "Upgrade de SSD e memória",
    "Remoção de vírus e programas indesejados",
    "Diagnóstico e configuração de Wi-Fi",
    "Backup e recuperação de dados"
  ],
  conteudoExclusivo: `Atendimento no Jardim Cláudia com diagnóstico antes da execução

Na primeira mensagem, o cliente pode informar referências como Avenida Juriti, Rua Luiz Vasselai ou Rua Tico-Tico. A localização serve para organizar a agenda; não define o diagnóstico.

Em máquina lenta, o teste procura descobrir se o limite está no disco, memória, temperatura ou sistema. Em computador sem vídeo, verificamos primeiro os componentes responsáveis por inicialização e imagem. Em notebook que não carrega, diferenciamos carregador, conector, bateria e circuito de alimentação. Cada hipótese tem verificação própria.

Para rede Wi-Fi, o atendimento começa pela medição no local de uso. Uma área sem sinal e uma conexão lenta em todos os cômodos não são o mesmo problema. O primeiro pode exigir cobertura; o segundo pode exigir investigação do roteador ou da conexão principal.

Em serviços que envolvem formatação, listamos previamente arquivos, contas e programas que precisam continuar funcionando. Esse inventário reduz retrabalho e evita descobrir depois da reinstalação que uma licença ou dado não foi preservado.

A página continua fora do índice nesta etapa; o enriquecimento vem antes de qualquer decisão futura de promoção.`,
  problemasComuns: [
    "Computador muito lento para tarefas comuns",
    "Notebook não carrega ou desliga",
    "PC liga sem imagem",
    "Wi-Fi cai em determinados ambientes",
    "Windows entra em tela azul ou reinicia",
    "Arquivos importantes estão sem backup"
  ],
  dicasLocais: `Ao chamar no Jardim Cláudia, informe a rua e uma referência local como Av. Juriti, Rua Luiz Vasselai ou Rua Tico-Tico. Envie também marca/modelo e descreva exatamente em que momento ocorre o defeito. Em caso de perda de arquivos ou suspeita de falha no disco, evite novas instalações antes da avaliação.`,
};

const JardimClaudia = () => <BairroTemplate data={data} />;

export default JardimClaudia;
