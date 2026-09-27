import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Araucária: UBS Santa Mônica — Rua Maria Kaminski Moll, 44, Jardim Iguaçu.
// - Prefeitura de Araucária: estruturas municipais atuais na Rua Ceará, 79, Jardim Iguaçu / Parque Cachoeira.
const data = {
  nome: "Jardim Iguaçu",
  slug: "jardim-iguacu-araucaria",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Jardim Iguaçu, Araucária | Diagnóstico",
  metaDescription: "Assistência de informática no Jardim Iguaçu, Araucária. Triagem para PC, notebook, Wi-Fi e arquivos, com atendimento conforme a falha.",
  h1: "Técnico de Informática no Jardim Iguaçu – Araucária",
  subtitulo: "Diagnóstico antes da execução, com foco em armazenamento, dados e conectividade.",
  descricaoLonga: `O Jardim Iguaçu aparece de forma clara nas estruturas oficiais de Araucária. A Prefeitura registra a UBS Santa Mônica na Rua Maria Kaminski Moll e mantém equipamentos municipais na Rua Ceará, dentro da referência Jardim Iguaçu / Parque Cachoeira. Esses pontos ajudam a confirmar o atendimento sem recorrer a descrições genéricas de localização.

No suporte de informática, uma das decisões mais importantes é saber quando a lentidão vem do sistema e quando o armazenamento está envolvido. Computador que demora para iniciar, congela ao abrir arquivos ou trava durante cópia pode ter excesso de programas, pouco espaço, SSD degradado ou HD com falhas. Formatar antes de avaliar o estado do disco pode apagar sinais importantes e aumentar o risco quando há dados sem backup.

Se a máquina ainda inicia, verificamos uso de armazenamento, memória, temperatura e eventos do Windows. Em notebook, também observamos comportamento da bateria e da fonte quando o desempenho muda fora da tomada. Se o problema é físico ou o armazenamento apresenta sintomas de falha, a avaliação passa para visita ou bancada.

Em Wi-Fi, o diagnóstico começa comparando dispositivos e ambientes. Se apenas um notebook perde conexão, driver ou adaptador podem estar envolvidos. Se todos os aparelhos apresentam lentidão, o foco muda para roteador, conexão principal e cobertura do imóvel. Repetidor ou mesh só fazem sentido depois dessa separação.

A página do Jardim Iguaçu foi reescrita para explicar esse processo com conteúdo técnico próprio. A referência local organiza a logística; os sintomas e os testes determinam a solução.`,
  pontosReferencia: [
    "Rua Maria Kaminski Moll",
    "UBS Santa Mônica",
    "Rua Ceará",
    "Jardim Iguaçu / Parque Cachoeira",
    "Jardim Iguaçu – Araucária"
  ],
  tempoDeslocamento: "Horário confirmado após triagem e endereço",
  servicosDestaque: [
    "Diagnóstico de HD e SSD",
    "Backup e preservação de arquivos",
    "Correção de Windows lento",
    "Avaliação de memória",
    "Configuração de Wi-Fi",
    "Notebook com falha de desempenho"
  ],
  conteudoExclusivo: `Quando a lentidão aponta para armazenamento

Um computador pode parecer “só lento” quando, na verdade, o disco está começando a falhar. Travamentos ao copiar arquivos, demora excessiva para abrir pastas ou desaparecimento intermitente do armazenamento exigem cautela.

Quando o disco está saudável, o problema pode ser memória, inicialização ou software em segundo plano. Quando não está, backup ou recuperação passa a ser prioridade. Essa diferença evita formatar por tentativa.

No Jardim Iguaçu, esta página concentra a orientação em armazenamento e preservação de dados justamente para ser diferente das demais páginas locais e útil antes do primeiro contato.`,
  problemasComuns: [
    "Computador demora muito para iniciar",
    "HD ou SSD trava ao copiar arquivos",
    "Armazenamento desaparece de forma intermitente",
    "Notebook perde desempenho fora da tomada",
    "Wi-Fi falha apenas em um equipamento",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao pedir atendimento no Jardim Iguaçu, envie rua, número e uma referência como a UBS Santa Mônica ou a Rua Ceará. Para falhas de armazenamento, evite formatar ou copiar grandes volumes antes da triagem. Para Wi-Fi, informe se outros aparelhos apresentam o mesmo problema.`,
};

const JardimIguacuAraucaria = () => <BairroTemplate data={data} />;

export default JardimIguacuAraucaria;
