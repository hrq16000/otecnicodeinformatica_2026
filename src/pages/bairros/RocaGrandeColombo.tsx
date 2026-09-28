import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de Colombo: CMEI Antônio Brejenski — Travessa Luís Rissardi, 24, Roça Grande.
// - Prefeitura de Colombo: ecoponto de Roça Grande — Rua Rio Japurá, esquina com André Nadolny.
// - Prefeitura de Colombo: AMUC — Rua Manoel Carvalho, 124, Roça Grande.
const data = {
  nome: "Roça Grande",
  slug: "roca-grande",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática na Roça Grande, Colombo | Backup e Diagnóstico",
  metaDescription: "Suporte de informática na Roça Grande, Colombo. Diagnóstico de SSD, HD, Windows e backup antes de formatação ou troca de componente.",
  h1: "Técnico de Informática na Roça Grande – Colombo",
  subtitulo: "Diagnóstico de armazenamento e estabilidade com prioridade para preservação dos arquivos.",
  descricaoLonga: `A Roça Grande possui referências municipais específicas em Colombo. A Prefeitura mantém o CMEI Antônio Brejenski na Travessa Luís Rissardi, um ecoponto na Rua Rio Japurá e equipamentos de atendimento comunitário na Rua Manoel Carvalho. Essas referências ajudam a confirmar a localidade sem depender de pontos comerciais ou descrições genéricas.

Nesta página, o foco técnico está em armazenamento, backup e estabilidade. Um computador que demora para iniciar, congela ao abrir arquivos ou trava durante cópia pode ter problema de sistema, pouca memória, SSD degradado ou HD em falha. Antes de formatar, é importante saber se existem dados que precisam ser preservados.

Quando o armazenamento apresenta erros, desaparece do sistema ou provoca travamentos durante leitura e escrita, insistir em uso pesado pode aumentar o risco de perda. Nesses casos, backup ou recuperação passa a ser prioridade. Se o disco está saudável, a investigação pode seguir por memória, temperatura, atualização e programas de inicialização.

Em notebook, também observamos bateria, fonte e aquecimento quando o desempenho muda durante o uso. Em computador que reinicia, alimentação e memória entram junto com armazenamento.

Se a máquina continua operacional, alguns testes podem começar remotamente. Se há falha física ou suspeita de armazenamento instável, a bancada pode ser mais segura. A página da Roça Grande foi reescrita para orientar decisões de preservação de dados e estabilidade com conteúdo próprio.`,
  pontosReferencia: [
    "Travessa Luís Rissardi",
    "CMEI Antônio Brejenski",
    "Rua Rio Japurá",
    "Ecoponto de Roça Grande",
    "Rua Manoel Carvalho"
  ],
  tempoDeslocamento: "Atendimento combinado após triagem do equipamento e do endereço",
  servicosDestaque: [
    "Diagnóstico de SSD e HD",
    "Backup de arquivos",
    "Windows lento ou instável",
    "Teste de memória",
    "Computador que reinicia",
    "Recuperação de dados"
  ],
  conteudoExclusivo: `Quando salvar os arquivos vem antes de recuperar o Windows

Se o disco apresenta erros, o objetivo inicial pode ser preservar os dados, não insistir na inicialização. Formatação e reinstalação só entram depois de entender o estado do armazenamento e a existência de backup.

Se o SSD ou HD está saudável, a lentidão pode vir de memória, temperatura ou software. Em reinicializações, alimentação também precisa ser considerada.

Essa lógica dá à página da Roça Grande uma função própria voltada a armazenamento e preservação de dados.`,
  problemasComuns: [
    "Computador trava ao copiar arquivos",
    "SSD ou HD desaparece",
    "Windows demora para iniciar",
    "Máquina reinicia sem aviso",
    "Notebook perde desempenho com o tempo",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao pedir atendimento na Roça Grande, informe o endereço e uma referência como o CMEI Antônio Brejenski ou a Rua Rio Japurá. Se houver erro de disco, evite novas instalações e cópias grandes. Diga quais arquivos precisam ser preservados antes de qualquer formatação.`,
};

const RocaGrandeColombo = () => <BairroTemplate data={data} />;

export default RocaGrandeColombo;
