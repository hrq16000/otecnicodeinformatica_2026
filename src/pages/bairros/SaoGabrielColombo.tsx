import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de Colombo: US São Gabriel — Rua José Dalpra, 545.
// - Prefeitura de Colombo: nova US do CAIC em construção no bairro São Gabriel.
// - Prefeitura de Colombo: CEU da Cultura em implantação na Rua Osvaldo Strapasson Vicentin.
const data = {
  nome: "São Gabriel",
  slug: "sao-gabriel-colombo",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no São Gabriel, Colombo | Diagnóstico",
  metaDescription: "Assistência de informática no São Gabriel, Colombo. Diagnóstico de PC sem vídeo, notebook, armazenamento e backup com triagem antes do reparo.",
  h1: "Técnico de Informática no São Gabriel – Colombo",
  subtitulo: "Diagnóstico de hardware, energia e armazenamento antes de formatar ou substituir componentes.",
  descricaoLonga: `O São Gabriel possui referências municipais claras em Colombo. A Prefeitura mantém a Unidade de Saúde São Gabriel na Rua José Dalpra e, em 2026, avançou com a nova unidade do CAIC e com a implantação do CEU da Cultura na Rua Osvaldo Strapasson Vicentin. Essas referências permitem situar o atendimento com base em equipamentos públicos reais.

Nesta página, o foco técnico está em falhas físicas, energia e armazenamento. Um computador que não liga, liga sem vídeo, reinicia sozinho ou apresenta tela preta precisa de uma sequência diferente de um problema apenas de Windows. Antes de qualquer formatação, observamos alimentação, sinais de partida, memória, vídeo, fonte e temperatura.

Quando o PC liga sem imagem, verificamos LEDs, ventoinhas, bipes e comportamento com periféricos desconectados. Em notebook, fonte, bateria, conector e temperatura ajudam a separar falha de energia de problema de tela ou placa. Se a máquina desliga sob carga, temperatura e alimentação precisam ser avaliadas juntas.

Se existem arquivos importantes, o estado do SSD ou HD entra no diagnóstico antes de procedimentos invasivos. Um disco que apresenta erros, desaparece do sistema ou trava durante cópia pode exigir backup ou recuperação antes de qualquer reinstalação.

Quando a máquina ainda inicia e a falha é de software, parte da triagem pode começar remotamente. Ausência de vídeo, energia, armazenamento instável ou necessidade de medição exigem visita ou bancada. A página do São Gabriel foi reescrita para explicar esse roteiro com conteúdo próprio e sem prometer solução antes dos testes.`,
  pontosReferencia: [
    "Rua José Dalpra",
    "US São Gabriel",
    "Rua Osvaldo Strapasson Vicentin",
    "CEU da Cultura do São Gabriel",
    "Nova US do CAIC"
  ],
  tempoDeslocamento: "Agenda definida após triagem do sintoma e do endereço",
  servicosDestaque: [
    "PC que não liga",
    "Computador liga sem vídeo",
    "Diagnóstico de fonte e memória",
    "Análise de SSD e HD",
    "Backup e recuperação de arquivos",
    "Notebook com falha de energia"
  ],
  conteudoExclusivo: `Tela preta e ausência de energia pedem diagnósticos diferentes

Um computador sem vídeo pode ter memória, vídeo, monitor ou alimentação envolvidos. Uma máquina completamente sem sinais de energia exige outra linha de investigação. Em notebook, fonte, bateria e conector também precisam ser separados.

Se o armazenamento apresenta erro, preservar os dados vem antes de reinstalar o sistema. Essa lógica evita trocar placa ou formatar por tentativa.

A página do São Gabriel concentra esse roteiro de hardware e preservação de dados para ter uma intenção técnica própria.`,
  problemasComuns: [
    "Computador não liga",
    "PC liga mas não mostra imagem",
    "Notebook não reconhece a fonte",
    "Máquina reinicia sob carga",
    "SSD ou HD apresenta erros",
    "Arquivos importantes em equipamento instável"
  ],
  dicasLocais: `Ao pedir atendimento no São Gabriel, informe o endereço e uma referência como a US São Gabriel ou a Rua Osvaldo Strapasson Vicentin. Para PC sem vídeo, diga se há LEDs, ventoinhas ou bipes. Se houver erro de disco, evite formatar antes da triagem.`,
};

const SaoGabrielColombo = () => <BairroTemplate data={data} />;

export default SaoGabrielColombo;
