import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Pinhais: USF Maria Antonieta — Rua Jerônimo Mendes dos Santos, 506.
// - Prefeitura de Pinhais: Escola Municipal Antônio Andrade — Rua João Mendes Batista, 430.
// - Prefeitura de Pinhais: CADS Helen Keller — Rua João Mendes Batista, 430.
const data = {
  nome: "Maria Antonieta",
  slug: "maria-antonieta",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Maria Antonieta, Pinhais | Diagnóstico",
  metaDescription: "Técnico de informática no Maria Antonieta, Pinhais. Triagem pelo WhatsApp, diagnóstico conforme sintoma e coleta quando o equipamento exige bancada.",
  h1: "Técnico de Informática no Maria Antonieta – Pinhais",
  subtitulo: "Atendimento organizado pela triagem: remoto quando possível, visita quando necessária e bancada para reparos físicos.",
  descricaoLonga: `Maria Antonieta tem referências municipais claras para localizar o chamado. A Prefeitura de Pinhais registra a USF Maria Antonieta na Rua Jerônimo Mendes dos Santos e a Escola Municipal Antônio Andrade, junto do CADS Helen Keller, na Rua João Mendes Batista. Usamos esse tipo de referência apenas para confirmar a região e planejar o atendimento; o horário é combinado depois da triagem e não é prometido por distância estimada.

O diagnóstico começa antes da visita. Pedimos modelo do computador ou notebook, descrição do sintoma e, quando ajuda, foto ou vídeo curto da tela. Um equipamento que liga e trava exige uma sequência de testes diferente de outro que não dá sinal de energia. Tela azul, lentidão, superaquecimento, Wi-Fi instável e perda de arquivos também não devem ser tratados como o mesmo problema.

Quando o sistema ainda inicia, verificamos uso de disco, memória, inicialização, atualizações e integridade básica antes de sugerir formatação. Em notebook com falha física, bateria, carregador, conector, temperatura e armazenamento entram na avaliação. Em rede sem fio, primeiro confirmamos a velocidade junto ao roteador e depois comparamos os ambientes onde a conexão piora.

Se houver dados importantes, a preservação dos arquivos vem antes de reinstalar sistema ou substituir armazenamento. Quando o defeito precisa de desmontagem demorada, solda, troca de tela ou teste prolongado, a coleta para bancada pode ser mais segura e econômica do que manter o equipamento aberto no endereço.`,
  pontosReferencia: [
    "USF Maria Antonieta – Rua Jerônimo Mendes dos Santos",
    "Escola Municipal Antônio Andrade – Rua João Mendes Batista",
    "CADS Helen Keller – Rua João Mendes Batista",
    "Eixo da Rua Jerônimo Mendes dos Santos",
    "Eixo da Rua João Mendes Batista"
  ],
  tempoDeslocamento: "Atendimento agendado após triagem do endereço",
  servicosDestaque: [
    "Diagnóstico de PC e notebook",
    "Formatação com backup definido antes",
    "Remoção de vírus e adwares",
    "Upgrade de SSD e memória",
    "Configuração e diagnóstico de rede",
    "Backup e recuperação de dados"
  ],
  conteudoExclusivo: `Diagnóstico por sintoma no Maria Antonieta

A página do Maria Antonieta não presume um “problema típico do bairro”. O atendimento é organizado a partir do equipamento e do sintoma real. Quem está próximo à Rua Jerônimo Mendes dos Santos ou à Rua João Mendes Batista pode usar essas referências na triagem, mas o diagnóstico técnico continua sendo individual.

Se a máquina demora para abrir programas, medimos armazenamento e memória antes de recomendar upgrade. Se reinicia sozinha, observamos temperatura, fonte e eventos do sistema. Se não liga, a sequência começa pela alimentação e só depois avança para placa, memória ou armazenamento. Essa separação evita a prática de formatar por tentativa.

Em Wi-Fi, comparamos conexão por cabo e sem fio quando possível. Se o problema ocorre apenas em um cômodo, cobertura e posição do roteador entram na análise; se ocorre em todos os dispositivos, o diagnóstico muda para equipamento, operadora ou configuração.

Quando a solução exige bancada, o cliente recebe a indicação antes da retirada. A coleta não significa autorização automática de reparo: diagnóstico, peça e mão de obra continuam separados até a aprovação.`,
  problemasComuns: [
    "PC lento mesmo após reiniciar",
    "Notebook sem carregar ou com bateria instável",
    "Tela azul, travamento ou reinício inesperado",
    "Wi-Fi lento somente em alguns ambientes",
    "Pop-ups, extensões ou programas indesejados",
    "Arquivos apagados ou armazenamento com erro"
  ],
  dicasLocais: `Na primeira mensagem, envie a rua e uma referência do Maria Antonieta, além do modelo do equipamento. Se a tela mostra erro, fotografe a mensagem antes de reiniciar. Se o problema envolve perda de arquivos ou disco fazendo ruído, evite novas instalações e cópias até a avaliação, porque cada gravação pode reduzir as opções de recuperação.`,
};

const MariaAntonieta = () => <BairroTemplate data={data} />;

export default MariaAntonieta;
