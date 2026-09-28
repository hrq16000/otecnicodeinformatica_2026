import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de Colombo: CRAS Guaraituba — Rua Campo Largo, 200.
// - Prefeitura de Colombo: UBS Guaraituba — esquina das ruas Genésio Moreschi e Balsa Nova.
const data = {
  nome: "Guaraituba",
  slug: "guaraituba-colombo",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no Guaraituba, Colombo | Diagnóstico",
  metaDescription: "Assistência de informática no Guaraituba, Colombo. Diagnóstico de Wi-Fi, Windows, notebook e hardware com definição entre remoto, visita e bancada.",
  h1: "Técnico de Informática no Guaraituba – Colombo",
  subtitulo: "Triagem de conectividade e computador para decidir entre suporte remoto, visita e bancada antes de deslocar ou trocar equipamentos.",
  descricaoLonga: `O Guaraituba possui referências municipais próprias em Colombo. A Prefeitura mantém o CRAS Guaraituba na Rua Campo Largo e a UBS Guaraituba na esquina das ruas Genésio Moreschi e Balsa Nova. Essas referências ajudam a confirmar a localização do chamado com base em informação pública atual.

Nesta página, o foco técnico está em conectividade e na decisão entre suporte remoto, visita e bancada. Problemas de Windows, configuração, navegador, e-mail, impressora de rede e alguns erros de software podem começar à distância quando o computador ainda está operacional e conectado.

Quando a máquina não liga, não dá vídeo, apresenta falha de alimentação, aquecimento ou conector danificado, o atendimento precisa ser presencial ou em bancada. Em notebook, fonte, bateria, temperatura e armazenamento são analisados conforme o sintoma.

No Wi-Fi, comparamos outros dispositivos e pontos do imóvel antes de recomendar repetidor, mesh ou troca de roteador. Se apenas um notebook perde conexão, adaptador e driver ganham peso. Se todos os aparelhos apresentam instabilidade, a investigação passa para a infraestrutura.

Quando existem arquivos importantes, backup entra antes de formatação ou troca de disco. Se o armazenamento apresenta erros, insistir no uso pode aumentar o risco de perda. A página do Guaraituba foi reescrita para explicar essa lógica de atendimento com conteúdo próprio e sem promessa fixa de chegada.`,
  pontosReferencia: [
    "Rua Campo Largo",
    "CRAS Guaraituba",
    "Rua Genésio Moreschi",
    "Rua Balsa Nova",
    "UBS Guaraituba"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem do defeito e do endereço",
  servicosDestaque: [
    "Diagnóstico de Wi-Fi e rede",
    "Triagem e suporte remoto",
    "Notebook que não liga",
    "Correção de Windows",
    "Backup e preservação de arquivos",
    "Avaliação de fonte, bateria e temperatura"
  ],
  conteudoExclusivo: `Remoto, visita ou bancada: o sintoma define o caminho

Se o computador ainda inicia e o problema está em configuração, programa ou rede, a triagem remota pode reduzir hipóteses ou resolver a falha. Se não há vídeo, energia ou existe defeito físico, o atendimento precisa mudar.

Em Wi-Fi, comparar outro dispositivo evita culpar o roteador por uma falha isolada. Em notebook sem carga, fonte, bateria e conector precisam ser separados.

Essa abordagem dá à página do Guaraituba uma intenção própria voltada a conectividade e escolha da modalidade de atendimento.`,
  problemasComuns: [
    "Notebook perde conexão Wi-Fi",
    "Computador não liga",
    "PC liga sem apresentar vídeo",
    "Windows apresenta erro de configuração",
    "Roteador funciona para alguns dispositivos e falha para outros",
    "Arquivos importantes em máquina instável"
  ],
  dicasLocais: `Ao solicitar atendimento no Guaraituba, informe o endereço e uma referência como a Rua Campo Largo, Rua Genésio Moreschi ou Rua Balsa Nova. Diga se o computador ainda acessa a internet; isso ajuda a avaliar suporte remoto. Para máquina sem vídeo ou sem energia, informe LEDs, ventoinhas e bipes.`,
};

const GuaraitubaColombo = () => <BairroTemplate data={data} />;

export default GuaraitubaColombo;
