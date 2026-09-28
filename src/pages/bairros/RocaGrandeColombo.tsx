import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de Colombo: ação DEPAC em Roça Grande — Rua Manoel Carvalho, 124.
// - Prefeitura de Colombo: ecoponto de Roça Grande — Rua Rio Japurá, esquina com André Nadolny.
// - Programa Colombo Mais Limpa inclui Roça Grande no cronograma municipal de 2026.
const data = {
  nome: "Roça Grande",
  slug: "roca-grande",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática na Roça Grande, Colombo | Diagnóstico de Hardware",
  metaDescription: "Assistência de informática na Roça Grande, Colombo. Diagnóstico de PC sem vídeo, falha de energia, notebook e hardware antes do reparo.",
  h1: "Técnico de Informática na Roça Grande – Colombo",
  subtitulo: "Triagem de falhas físicas, alimentação e vídeo antes de formatar ou trocar componentes.",
  descricaoLonga: `Roça Grande aparece de forma clara nas ações municipais de Colombo. A Prefeitura já realizou atendimento comunitário na Rua Manoel Carvalho e mantém ecoponto na Rua Rio Japurá, esquina com André Nadolny. O bairro também integra o cronograma de serviços do programa Colombo Mais Limpa em 2026. Essas referências ajudam a localizar o atendimento sem depender de descrições genéricas.

Nesta página, o foco técnico está em falhas físicas de computador e notebook. Uma máquina que não liga, liga sem vídeo, reinicia sozinha ou apresenta cheiro anormal precisa de uma sequência diferente de um problema apenas de Windows. Antes de qualquer formatação, observamos alimentação, sinais de partida, memória, vídeo, fonte e temperatura.

Quando o PC liga sem imagem, verificamos se existem bipes, LEDs, rotação de ventoinhas e mudanças depois de remover periféricos. Em notebook, fonte, bateria, conector e comportamento dos indicadores ajudam a separar falha de energia de defeito de tela ou placa. Se o equipamento desliga sob carga, temperatura e alimentação precisam ser avaliadas juntas.

Se há arquivos importantes, a análise considera o armazenamento antes de intervenções invasivas. Mesmo quando a falha parece física, o SSD ou HD pode conter dados que precisam ser preservados. Em situações em que a máquina ainda inicia, parte da triagem pode começar remotamente; ausência de vídeo, energia ou necessidade de medição exigem presença física ou bancada.

A página da Roça Grande foi reescrita para explicar esse roteiro de diagnóstico de hardware com referências locais verificáveis, sem promessa fixa de chegada e sem tratar formatação como resposta para defeito físico.`,
  pontosReferencia: [
    "Rua Manoel Carvalho",
    "Rua Rio Japurá",
    "Esquina com André Nadolny",
    "Roça Grande – Colombo"
  ],
  tempoDeslocamento: "Agenda definida após triagem do sintoma e do endereço",
  servicosDestaque: [
    "PC que não liga",
    "Computador liga sem vídeo",
    "Notebook com falha de energia",
    "Diagnóstico de fonte e memória",
    "Análise de aquecimento",
    "Preservação de dados antes do reparo"
  ],
  conteudoExclusivo: `Sem vídeo não é sinônimo de placa-mãe queimada

Um computador pode ligar sem mostrar imagem por memória, vídeo, alimentação, monitor ou outros componentes. Por isso, o diagnóstico começa pelos sinais de partida e pela sequência de testes, não pela troca da placa.

Em notebook, ausência de carga pode envolver fonte, bateria, conector ou circuito interno. Se a máquina desliga sob uso pesado, temperatura e alimentação entram no mesmo raciocínio.

Essa abordagem dá à página da Roça Grande uma função própria voltada a falhas físicas, energia e vídeo.`,
  problemasComuns: [
    "Computador não liga",
    "PC liga mas não apresenta imagem",
    "Notebook não reconhece a fonte",
    "Máquina reinicia sob carga",
    "Equipamento aquece e desliga",
    "Arquivos importantes em equipamento com falha física"
  ],
  dicasLocais: `Ao solicitar atendimento na Roça Grande, informe o endereço e uma referência como a Rua Manoel Carvalho ou a Rua Rio Japurá. Para PC sem vídeo, diga se ventoinhas, LEDs ou bipes aparecem. Evite insistir em ligações repetidas se houver cheiro de queimado.`,
};

const RocaGrandeColombo = () => <BairroTemplate data={data} />;

export default RocaGrandeColombo;
