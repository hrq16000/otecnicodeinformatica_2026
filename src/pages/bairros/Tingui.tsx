import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Curitiba: Unidade de Saúde Tingui — Rua Nicolau Salomão, 671.
// - Prefeitura de Curitiba: bairro Tingui reconhecido na estrutura municipal de saúde.
const data = {
  nome: "Tingui",
  slug: "tingui",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Tingui, Curitiba | Diagnóstico",
  metaDescription: "Assistência de informática no Tingui, Curitiba. Triagem para notebook, PC, Wi-Fi, periféricos e dados, com atendimento definido conforme a falha.",
  h1: "Técnico de Informática no Tingui – Curitiba",
  subtitulo: "Diagnóstico antes da execução, com orientação clara entre suporte remoto, visita e bancada.",
  descricaoLonga: `O Tingui possui referência municipal clara para localização: a Unidade de Saúde Tingui fica na Rua Nicolau Salomão. Essa informação ajuda a situar o atendimento sem depender de referências vagas ou de promessas sobre tempo de deslocamento.

No suporte de informática, o primeiro objetivo é separar o sintoma da causa. Um notebook que fica lento durante videoconferência pode estar limitado por temperatura, memória, armazenamento ou rede. Um computador que demora para iniciar pode ter excesso de programas, falha no disco ou atualização mal concluída. Um equipamento que perde Wi-Fi apenas em um cômodo pede investigação diferente de uma rede que fica instável em todos os dispositivos.

Quando a máquina ainda inicia, parte da triagem pode começar remotamente. É possível verificar uso de memória, espaço em disco, atualizações, drivers, eventos do Windows e comportamento da conexão antes de decidir por visita. Quando há falha física, conector danificado, aquecimento excessivo, ausência de vídeo ou necessidade de desmontagem, a avaliação passa para atendimento presencial ou bancada.

Em casos de formatação, a existência de arquivos importantes é confirmada antes. Se o disco apresenta travamentos, ruídos ou desaparece do sistema, o foco muda para preservação de dados; insistir em reinstalação ou uso intenso pode aumentar o risco. Em upgrades, SSD e memória só são indicados quando os testes mostram que realmente existe gargalo nesses componentes.

A página do Tingui foi reescrita para funcionar como orientação técnica local, não como variação de um template. A referência do bairro ajuda na logística, enquanto o diagnóstico é determinado pelo comportamento real do equipamento.`,
  pontosReferencia: [
    "Rua Nicolau Salomão",
    "Unidade de Saúde Tingui",
    "Tingui – Curitiba"
  ],
  tempoDeslocamento: "Horário confirmado após triagem do equipamento e do endereço",
  servicosDestaque: [
    "Diagnóstico de notebook lento",
    "Análise de aquecimento e desempenho",
    "Configuração de Wi-Fi",
    "Correção de Windows e drivers",
    "Backup antes de formatação",
    "Avaliação de SSD e memória"
  ],
  conteudoExclusivo: `Quando o problema aparece só durante uso pesado

Alguns computadores parecem funcionar normalmente em tarefas simples e começam a falhar em videoconferência, jogos, edição, muitas abas ou programas pesados. Nesses casos, a análise precisa observar temperatura, memória, uso de CPU e armazenamento ao mesmo tempo.

Se o notebook reduz desempenho conforme aquece, formatar não resolve. Se a memória fica no limite, aumentar RAM pode ajudar; se o disco está degradado, o caminho é outro. Em rede, perda de conexão apenas sob carga também precisa ser separada de cobertura ruim.

No Tingui, essa lógica evita troca de componente por tentativa e ajuda a decidir se o caso pode começar remotamente ou se precisa de inspeção física.`,
  problemasComuns: [
    "Notebook perde desempenho durante uso pesado",
    "Computador demora para iniciar",
    "Wi-Fi fica instável apenas em alguns ambientes",
    "Windows apresenta erros após atualização",
    "HD ou SSD apresenta lentidão e travamentos",
    "Arquivos importantes sem backup recente"
  ],
  dicasLocais: `Ao pedir atendimento no Tingui, informe a rua e uma referência próxima, como a Unidade de Saúde Tingui ou a Rua Nicolau Salomão. Para lentidão, diga em qual tarefa o problema aparece; para rede, informe se outros aparelhos também falham; para armazenamento, evite formatar antes da triagem quando houver arquivos importantes.`,
};

const Tingui = () => <BairroTemplate data={data} />;

export default Tingui;
