import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de Colombo: Unidade de Saúde da Mulher — Avenida Marginal Direita, 218, Santa Terezinha.
// - Prefeitura de Colombo: Escola Municipal Parque Santa Terezinha — Rua Maria Francelina da Silva, 160.
// - Prefeitura de Colombo: Delegacia Cidadã — Rua João Maria dos Santos, 320, Santa Terezinha, inaugurada em 2026.
const data = {
  nome: "Santa Terezinha",
  slug: "santa-terezinha-colombo",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática em Santa Terezinha, Colombo | Diagnóstico",
  metaDescription: "Assistência de informática em Santa Terezinha, Colombo. Diagnóstico de PC, notebook, armazenamento e segurança do Windows com triagem antes da execução.",
  h1: "Técnico de Informática em Santa Terezinha – Colombo",
  subtitulo: "Triagem para estabilidade, armazenamento e segurança do sistema antes de formatar ou substituir componentes.",
  descricaoLonga: `Santa Terezinha possui referências municipais bem definidas em Colombo. A Unidade de Saúde da Mulher funciona na Avenida Marginal Direita, a Escola Municipal Parque Santa Terezinha fica na Rua Maria Francelina da Silva e, em 2026, a Prefeitura inaugurou a Delegacia Cidadã na Rua João Maria dos Santos. Essas referências confirmam a localidade sem depender de pontos comerciais ou descrições vagas.

Nesta página, o foco técnico está em estabilidade do sistema, armazenamento e segurança do Windows. Um computador que fica lento, mostra avisos inesperados, abre páginas sozinho ou perde desempenho depois de instalar programas precisa ser diagnosticado antes de qualquer formatação. A causa pode estar em software indesejado, arquivos do sistema, armazenamento, memória ou até aquecimento.

Quando o Windows ainda inicia, verificamos programas carregados com o sistema, atualizações, integridade do armazenamento, uso de memória e sinais de software potencialmente indesejado. Se o SSD ou HD apresenta erros, trava durante cópia ou desaparece do sistema, a prioridade muda para backup e preservação dos dados.

Em casos de suspeita de malware, o objetivo é entender o impacto: navegador alterado, pop-ups, contas expostas, lentidão ou arquivos afetados. A remoção precisa ser acompanhada de revisão das configurações e, quando necessário, orientação para troca de senhas em dispositivo confiável. Formatar sem saber o que aconteceu pode apagar evidências e não resolve credenciais comprometidas.

Se a máquina está operacional, parte da triagem pode começar remotamente. Falhas físicas, armazenamento instável ou necessidade de desmontagem exigem visita ou bancada. A página de Santa Terezinha foi reescrita para oferecer orientação própria sobre estabilidade, dados e segurança, sem promessas de prazo ou soluções automáticas.`,
  pontosReferencia: [
    "Avenida Marginal Direita",
    "Unidade de Saúde da Mulher",
    "Rua Maria Francelina da Silva",
    "Escola Municipal Parque Santa Terezinha",
    "Rua João Maria dos Santos",
    "Delegacia Cidadã de Colombo"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem do equipamento e do endereço",
  servicosDestaque: [
    "Diagnóstico de Windows lento ou instável",
    "Remoção de software indesejado",
    "Análise de SSD e HD",
    "Backup e preservação de arquivos",
    "Avaliação de memória e temperatura",
    "Orientação após suspeita de malware"
  ],
  conteudoExclusivo: `Lentidão e pop-ups podem ter causas diferentes

Quando o computador abre anúncios sozinho, muda a página inicial ou instala extensões sem autorização, software indesejado entra na investigação. Se a lentidão acontece mesmo com o sistema limpo, armazenamento, memória e temperatura precisam ser avaliados.

Em suspeita de malware, também é importante separar a limpeza da máquina da segurança das contas. Se houve exposição de senha, a troca deve ser feita em ambiente confiável e não apenas depois de uma formatação.

Essa lógica dá à página de Santa Terezinha uma intenção própria voltada a estabilidade, armazenamento e segurança do sistema.`,
  problemasComuns: [
    "Windows fica lento depois de instalar programas",
    "Navegador abre anúncios ou páginas inesperadas",
    "SSD ou HD apresenta erros",
    "Computador trava durante cópia de arquivos",
    "Máquina perde desempenho quando aquece",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao pedir atendimento em Santa Terezinha, informe o endereço e uma referência como a Escola Parque Santa Terezinha, a Unidade de Saúde da Mulher ou a Delegacia Cidadã. Para suspeita de malware, descreva o que mudou no navegador ou no Windows. Se houver erro de disco, evite formatar antes da triagem.`,
};

const SantaTerezinhaColombo = () => <BairroTemplate data={data} />;

export default SantaTerezinhaColombo;
