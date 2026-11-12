import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de Colombo: Regional Osasco — Rua Santo Pascoal Franceschi, 248.
// - Prefeitura de Colombo: Ouvidoria Geral — Rua Pio Alberti, 450, Jardim Osasco.
// - Prefeitura de Colombo: UBS Jardim Osasco — Rua Prefeito Pio Alberti, 1037, Jardim Cruzeiro.
const data = {
  nome: "Jardim Osasco",
  slug: "jardim-osasco",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no Jardim Osasco, Colombo | Backup e Diagnóstico",
  metaDescription: "Suporte de informática no Jardim Osasco, Colombo. Diagnóstico de SSD, HD, Windows, backup e estabilidade antes de formatar ou trocar peças.",
  h1: "Técnico de Informática no Jardim Osasco – Colombo",
  subtitulo: "Diagnóstico de armazenamento e estabilidade com prioridade para preservação de arquivos.",
  descricaoLonga: `O Jardim Osasco possui referências municipais claras em Colombo. A Regional Osasco funciona na Rua Santo Pascoal Franceschi, enquanto a Ouvidoria Geral do Município mantém atendimento na Rua Pio Alberti. A rede municipal também possui UBS Jardim Osasco na região de referência do bairro.

Nesta página, o foco técnico está em armazenamento, backup e estabilidade. Um computador que demora para iniciar, trava ao abrir pastas, congela durante cópia de arquivos ou reinicia sem aviso pode ter causas diferentes: Windows, SSD ou HD, memória, temperatura ou alimentação.

Quando o sistema ainda inicia, verificamos espaço livre, eventos, uso de memória e comportamento do armazenamento. Se o SSD ou HD apresenta erros, desaparece do sistema ou trava durante leitura e escrita, a prioridade pode mudar para backup ou recuperação de dados antes de qualquer reinstalação.

Se o disco está saudável, a investigação passa para memória, temperatura, atualização e programas de inicialização. Em notebook, bateria e fonte também entram quando há queda de desempenho ou desligamento. Em PC que reinicia sob carga, alimentação precisa ser considerada junto com memória e temperatura.

Se a máquina ainda está operacional, alguns testes podem começar remotamente. Se há suspeita de falha física ou disco instável, a bancada pode ser a opção mais segura. A página do Jardim Osasco foi reescrita para orientar decisões de preservação de dados e estabilidade sem transformar formatação em resposta automática.`,
  pontosReferencia: [
    "Rua Santo Pascoal Franceschi",
    "Regional Osasco",
    "Rua Pio Alberti",
    "Ouvidoria Geral do Município",
    "Jardim Osasco – Colombo"
  ],
  tempoDeslocamento: "Atendimento combinado após triagem do equipamento e da localização",
  servicosDestaque: [
    "Diagnóstico de SSD e HD",
    "Backup de arquivos",
    "Windows lento ou instável",
    "Teste de memória",
    "Notebook com queda de desempenho",
    "Recuperação de dados"
  ],
  conteudoExclusivo: `Quando salvar os arquivos vem antes de fazer o Windows voltar

Se o disco apresenta erros, o objetivo inicial pode ser preservar os dados, não insistir na inicialização. Formatação e reinstalação só entram depois de entender o estado do armazenamento e a existência de backup.

Se o SSD ou HD está saudável, a lentidão pode vir de memória, temperatura ou software. Em reinicializações, alimentação também precisa ser considerada.

Essa lógica dá à página do Jardim Osasco uma função própria voltada a armazenamento, backup e estabilidade.`,
  problemasComuns: [
    "Computador trava ao copiar arquivos",
    "SSD ou HD desaparece",
    "Windows demora para iniciar",
    "Máquina reinicia sem aviso",
    "Notebook perde desempenho com o tempo",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao pedir atendimento no Jardim Osasco, informe o endereço e uma referência como a Rua Santo Pascoal Franceschi ou Rua Pio Alberti. Se houver erro de disco, evite novas instalações e cópias grandes. Diga quais arquivos precisam ser preservados antes de qualquer formatação.`,
};

const JardimOsascoColombo = () => <BairroTemplate data={data} />;

export default JardimOsascoColombo;
