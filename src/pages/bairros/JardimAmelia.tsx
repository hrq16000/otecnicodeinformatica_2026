import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Pinhais: Escola Municipal Chafic Smaka — Rua Costa e Silva, 765.
// - Prefeitura de Pinhais: CRAS Norte em implantação para atender, entre outros, moradores do Jardim Amélia.
// - Prefeitura de Pinhais: dados municipais tratam Jardim Amélia como bairro próprio.
const data = {
  nome: "Jardim Amélia",
  slug: "jardim-amelia",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Jardim Amélia, Pinhais | Atendimento",
  metaDescription: "Assistência de informática no Jardim Amélia, Pinhais. Diagnóstico de PC, notebook e Wi-Fi, com suporte remoto, visita ou bancada conforme o caso.",
  h1: "Técnico de Informática no Jardim Amélia – Pinhais",
  subtitulo: "Diagnóstico antes da execução, escolha da modalidade certa e cuidado com arquivos importantes.",
  descricaoLonga: `O Jardim Amélia é identificado pela própria Prefeitura de Pinhais como bairro do município. Entre as referências públicas locais está a Escola Municipal Chafic Smaka, na Rua Costa e Silva. O município também inclui moradores do Jardim Amélia na área prevista de atendimento do novo CRAS Norte. Essas referências servem para situar a página em fatos concretos, sem inventar características comerciais ou “demandas típicas” sem comprovação.

Em informática, dois chamados aparentemente iguais podem ter causas completamente diferentes. Um notebook lento pode estar limitado por memória, armazenamento, temperatura ou excesso de processos. Um computador que demora para iniciar pode ter SSD degradado, atualização problemática ou programas carregando em segundo plano. Por isso, o atendimento não começa escolhendo a solução; começa verificando o comportamento.

Em casos de Wi-Fi, perguntamos onde o roteador está instalado, onde o sinal funciona bem e onde começa a falhar. Se todos os equipamentos ficam lentos ao mesmo tempo, o caminho de diagnóstico é diferente de um único notebook que perde conexão. Para backup, a urgência também muda quando o armazenamento apresenta erros, ruído ou desaparece de forma intermitente.

Se o equipamento está operacional e o problema é software, configuração ou periférico, o suporte remoto pode ser suficiente. Se há falha física, aquecimento, dobradiça, conector, tela ou necessidade de abrir a máquina, a avaliação passa a ser presencial ou em bancada. O cliente recebe a indicação dessa modalidade antes da execução.

A página do Jardim Amélia foi estruturada para explicar esse processo com referências locais verificáveis e texto técnico próprio. O objetivo não é encher uma landing page com palavras, mas fazer com que quem chega por uma busca local encontre orientação diferente da oferecida em outros bairros.`,
  pontosReferencia: [
    "Rua Costa e Silva",
    "Escola Municipal Chafic Smaka",
    "Jardim Amélia – Pinhais",
    "Área de atendimento prevista do CRAS Norte"
  ],
  tempoDeslocamento: "Atendimento combinado conforme endereço, sintoma e modalidade",
  servicosDestaque: [
    "Notebook lento ou com travamentos",
    "Computador demorando para iniciar",
    "Diagnóstico de SSD e memória",
    "Configuração e análise de Wi-Fi",
    "Backup e migração de arquivos",
    "Correção de programas, drivers e Windows"
  ],
  conteudoExclusivo: `Como evitamos upgrade desnecessário no Jardim Amélia

SSD e memória podem transformar uma máquina, mas só quando são o gargalo real. Antes de sugerir compra, verificamos espaço livre, saúde do armazenamento, memória em uso, temperatura e comportamento do sistema. Um SSD novo não corrige superaquecimento; mais memória não resolve um disco com falha; formatação não conserta conector ou bateria.

Em Wi-Fi, seguimos a mesma lógica: o equipamento novo só entra depois de entender o problema atual. Uma rede pode estar lenta por canal congestionado, posicionamento ruim, limite do plano ou falha em um único dispositivo.

Quando há documentos, fotos ou trabalho armazenados sem cópia, a preservação dos dados passa a ser prioridade. Esse roteiro técnico diferencia a página do Jardim Amélia das antigas páginas programáticas que apenas repetiam a mesma lista de serviços.`,
  problemasComuns: [
    "Notebook lento mesmo com poucos programas abertos",
    "PC demora muito para iniciar o Windows",
    "SSD ou HD com erros, travamentos ou pouco espaço",
    "Wi-Fi instável em parte da casa",
    "Aplicativos deixam de abrir depois de atualização",
    "Arquivos importantes sem backup recente"
  ],
  dicasLocais: `Se estiver no Jardim Amélia, informe rua e uma referência próxima, como a Rua Costa e Silva ou a Escola Chafic Smaka. Envie marca/modelo do equipamento e descreva em qual tarefa a falha aparece. Para lentidão, diga se o problema acontece desde a inicialização ou apenas ao abrir programas; para Wi-Fi, informe se outros aparelhos apresentam o mesmo comportamento.`,
};

const JardimAmelia = () => <BairroTemplate data={data} />;

export default JardimAmelia;
