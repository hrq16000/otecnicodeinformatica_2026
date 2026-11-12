import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Araucária: UBS Boqueirão — Av. Independência, 1256, Jardim Castanheiras.
// - Prefeitura de Araucária: Cemitério Municipal Jardim Independência — Av. Independência, 1203, Boqueirão.
const data = {
  nome: "Boqueirão",
  slug: "boqueirao-araucaria",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Boqueirão, Araucária | Diagnóstico",
  metaDescription: "Assistência de informática no Boqueirão, Araucária. Diagnóstico de PC sem vídeo, falha de energia, notebook e hardware com triagem antes do reparo.",
  h1: "Técnico de Informática no Boqueirão – Araucária",
  subtitulo: "Triagem de falhas físicas, alimentação e vídeo antes de formatar ou trocar componentes.",
  descricaoLonga: `O Boqueirão aparece em registros oficiais de Araucária e possui referências municipais na Avenida Independência, como a UBS Boqueirão e o Cemitério Municipal Jardim Independência. Essas referências ajudam a confirmar a localidade sem depender de descrições genéricas ou promessas de chegada em minutos.

Nesta página, o foco técnico está em falhas físicas de computador e notebook. Uma máquina que não liga, liga sem vídeo, reinicia sozinha ou apresenta cheiro anormal precisa de uma sequência diferente de um problema apenas de Windows. Antes de qualquer formatação, observamos alimentação, sinais de partida, memória, vídeo, fonte e temperatura.

Quando o PC liga sem imagem, verificamos se existem bipes, LEDs, rotação de ventoinhas e mudanças depois de remover periféricos. Em notebook, fonte, bateria, conector e comportamento dos indicadores ajudam a separar falha de energia de defeito de tela ou placa. Se o equipamento desliga sob carga, temperatura e alimentação precisam ser avaliadas juntas.

Se há arquivos importantes, a análise considera o armazenamento antes de intervenções invasivas. Mesmo quando a falha parece física, o SSD ou HD pode conter dados que precisam ser preservados. Em situações em que a máquina ainda inicia, parte da triagem pode ser remota; ausência de vídeo, energia ou necessidade de medição exigem presença física ou bancada.

A página do Boqueirão foi reescrita para explicar esse roteiro de diagnóstico de hardware. A localização organiza o atendimento, mas a decisão técnica parte dos sinais do equipamento e não de uma solução pré-definida.`,
  pontosReferencia: [
    "Avenida Independência",
    "UBS Boqueirão",
    "Cemitério Municipal Jardim Independência",
    "Boqueirão – Araucária"
  ],
  tempoDeslocamento: "Agenda definida após triagem do sintoma e endereço",
  servicosDestaque: [
    "PC que não liga",
    "Computador liga sem vídeo",
    "Notebook com falha de energia",
    "Diagnóstico de fonte e memória",
    "Análise de aquecimento",
    "Preservação de dados antes do reparo"
  ],
  conteudoExclusivo: `Sem vídeo não é sinônimo de placa-mãe queimada

Um computador pode ligar sem mostrar imagem por memória mal encaixada, falha de vídeo, alimentação, monitor ou outros componentes. Por isso, o diagnóstico começa pelos sinais de partida e pela sequência de testes, não pela troca da placa.

Em notebook, ausência de carga pode envolver fonte, bateria, conector ou circuito interno. Se a máquina desliga sob uso pesado, temperatura e alimentação entram no mesmo raciocínio.

No Boqueirão, esta página é específica para falhas físicas e de energia, mantendo uma intenção diferente das páginas focadas em software, rede ou armazenamento.`,
  problemasComuns: [
    "Computador não liga",
    "PC liga mas não apresenta imagem",
    "Notebook não reconhece a fonte",
    "Máquina reinicia sob carga",
    "Equipamento aquece e desliga",
    "Arquivos importantes em equipamento com falha física"
  ],
  dicasLocais: `Ao solicitar atendimento no Boqueirão, informe o endereço e uma referência como a Avenida Independência. Para PC sem vídeo, diga se ventoinhas, LEDs ou bipes aparecem. Para notebook sem carga, informe se a fonte e os indicadores acendem. Evite insistir em ligações repetidas se houver cheiro de queimado.`,
};

const BoqueiraoAraucaria = () => <BairroTemplate data={data} />;

export default BoqueiraoAraucaria;
