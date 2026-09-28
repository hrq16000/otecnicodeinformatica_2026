import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Secretaria Municipal de Educação: CMEI Bem-Te-Vi Crescer — Rua João Maria Alves de Souza, 155, São Marcos.
// - Secretaria Municipal de Educação: Escola Municipal Professora Ezaltina Camargo Meiga — Rua Marlene Veiga Rosa, 562, São Marcos.
// - Secretaria Municipal de Educação: Escola Municipal Eugênia da Cruz Santos Talamini — Rua Manoel Marcílio de Oliveira, 330, São Marcos.
// - Prefeitura de São José dos Pinhais: consultas públicas de 2025 incluem São Marcos como região própria.
const data = {
  nome: "São Marcos",
  slug: "sao-marcos",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática em São Marcos, SJP | Diagnóstico",
  metaDescription: "Assistência de informática em São Marcos, São José dos Pinhais. Diagnóstico de notebook, PC, rede, armazenamento e Windows com triagem antes do reparo.",
  h1: "Técnico de Informática em São Marcos – São José dos Pinhais",
  subtitulo: "Diagnóstico de estabilidade, armazenamento e rede antes de trocar peças ou reinstalar o sistema.",
  descricaoLonga: `São Marcos é uma localidade reconhecida e atendida pela estrutura municipal de São José dos Pinhais. A Secretaria de Educação mantém unidades como o CMEI Bem-Te-Vi Crescer, na Rua João Maria Alves de Souza, a Escola Professora Ezaltina Camargo Meiga, na Rua Marlene Veiga Rosa, e a Escola Eugênia da Cruz Santos Talamini, na Rua Manoel Marcílio de Oliveira. A Prefeitura também trata São Marcos como região própria em suas consultas públicas.

Nesta página, o foco técnico está em estabilidade e armazenamento. Computador que reinicia, congela sob carga, demora para iniciar ou apresenta tela preta pode ter causas diferentes: Windows, memória, temperatura, alimentação ou SSD/HD. Formatar sem separar essas hipóteses pode criar retrabalho.

Quando o sistema ainda inicia, verificamos eventos, espaço livre, uso de memória, comportamento do armazenamento e sinais de aquecimento. Se o disco apresenta erros, desaparece ou trava durante cópia, a prioridade passa a ser backup e preservação de dados. Se a máquina reinicia durante uso intenso, temperatura e alimentação entram no diagnóstico.

Em rede, comparamos outros dispositivos para saber se a falha é da estação ou da infraestrutura. Se apenas um computador perde conexão, driver e adaptador ganham peso. Se vários aparelhos falham juntos, o foco muda para roteador, cabeamento e conexão principal.

Se a máquina ainda está operacional, parte da triagem pode começar remotamente. Ausência de vídeo, energia, falha física ou armazenamento instável normalmente exigem visita ou bancada. A página de São Marcos foi reescrita para explicar essa diferença com conteúdo técnico próprio, sem prometer solução ou prazo antes do diagnóstico.`,
  pontosReferencia: [
    "Rua João Maria Alves de Souza",
    "CMEI Bem-Te-Vi Crescer",
    "Rua Marlene Veiga Rosa",
    "Escola Municipal Professora Ezaltina Camargo Meiga",
    "Rua Manoel Marcílio de Oliveira",
    "Escola Municipal Eugênia da Cruz Santos Talamini"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem do sintoma e endereço",
  servicosDestaque: [
    "Diagnóstico de reinicializações",
    "Análise de SSD e HD",
    "Teste de memória",
    "Notebook com aquecimento",
    "Diagnóstico de Wi-Fi",
    "Backup e recuperação de dados"
  ],
  conteudoExclusivo: `Travamento, tela preta e reinicialização pedem testes diferentes

Se o computador reinicia sob carga, temperatura e alimentação precisam ser consideradas. Se demora para iniciar, armazenamento e sistema entram primeiro. Se liga sem vídeo, memória, vídeo e energia mudam a linha de investigação.

Em armazenamento com sinais de falha, preservar arquivos vem antes de reinstalar. Em rede, comparar outros dispositivos reduz hipóteses.

Essa abordagem dá à página de São Marcos uma função própria voltada a estabilidade, armazenamento e diagnóstico por sintoma.`,
  problemasComuns: [
    "Computador reinicia durante uso",
    "Notebook aquece e perde desempenho",
    "SSD ou HD apresenta erros",
    "PC liga sem imagem",
    "Wi-Fi falha apenas em uma máquina",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao pedir atendimento em São Marcos, informe o endereço e uma referência como uma das escolas municipais do bairro. Para reinicialização, diga em qual tarefa ocorre; para disco, evite formatar se houver arquivos importantes; para rede, teste outro dispositivo no mesmo ponto.`,
};

const SaoMarcos = () => <BairroTemplate data={data} />;

export default SaoMarcos;
