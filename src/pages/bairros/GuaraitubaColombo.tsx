import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de Colombo: UBS Guaraituba — Rua Genésio Moreschi, 632.
// - Prefeitura de Colombo: nova UBS implantada na esquina da Rua Genésio Moreschi com a Rua Balsa Nova.
const data = {
  nome: "Guaraituba",
  slug: "guaraituba-colombo",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no Guaraituba, Colombo | Rede e Suporte",
  metaDescription: "Suporte de informática no Guaraituba, Colombo. Diagnóstico de Wi-Fi, rede, notebook e Windows com definição entre remoto, visita e bancada.",
  h1: "Técnico de Informática no Guaraituba – Colombo",
  subtitulo: "Triagem de conectividade e computador para decidir entre suporte remoto, visita e bancada.",
  descricaoLonga: `O Guaraituba possui referência municipal própria em Colombo. A Prefeitura mantém a Unidade Básica de Saúde do Guaraituba na Rua Genésio Moreschi, próxima à Rua Balsa Nova. Essa identificação oficial permite trabalhar a página com contexto local real sem depender de frases genéricas sobre o bairro.

Nesta rota, o foco técnico está em conectividade e na escolha da modalidade de atendimento. Problemas de Windows, navegador, e-mail, impressora de rede e algumas configurações podem começar por suporte remoto quando o computador ainda funciona e tem acesso à internet.

Quando a máquina não liga, não dá vídeo, apresenta falha de energia, conector danificado ou aquecimento, o atendimento precisa ser presencial ou em bancada. Em notebook, fonte, bateria, temperatura e armazenamento entram no diagnóstico conforme o sintoma.

Para Wi-Fi, a primeira comparação é entre dispositivos. Se apenas um notebook perde conexão, driver, adaptador ou configuração podem estar envolvidos. Se todos os aparelhos apresentam instabilidade, a investigação passa para roteador, cobertura, cabeamento e conexão principal. A recomendação de repetidor ou mesh só vem depois dessa separação.

Quando há arquivos importantes, backup entra antes de formatação. Se o armazenamento apresenta erros ou trava durante leitura, insistir no uso pode aumentar o risco de perda. A página do Guaraituba foi reescrita para orientar essa decisão entre remoto, visita e bancada com conteúdo técnico próprio e sem prometer prazo antes da triagem.`,
  pontosReferencia: [
    "Rua Genésio Moreschi",
    "UBS Guaraituba",
    "Rua Balsa Nova",
    "Guaraituba – Colombo"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem do endereço e da falha",
  servicosDestaque: [
    "Diagnóstico de Wi-Fi",
    "Configuração de rede",
    "Triagem e suporte remoto",
    "Notebook que não liga",
    "Correção de Windows",
    "Backup e preservação de arquivos"
  ],
  conteudoExclusivo: `Nem todo chamado precisa começar com deslocamento

Se o computador ainda inicia e a falha está em configuração, programa, driver ou rede, a triagem remota pode reduzir as hipóteses antes da visita. Se não há vídeo, energia ou existe defeito físico, o atendimento muda.

Em Wi-Fi, testar outro aparelho evita culpar o roteador por uma falha isolada. Em notebook sem carga, fonte, bateria e conector precisam ser separados.

Essa lógica dá à página do Guaraituba uma função própria voltada a conectividade e escolha da modalidade de atendimento.`,
  problemasComuns: [
    "Notebook perde conexão Wi-Fi",
    "Computador não liga",
    "PC liga sem apresentar vídeo",
    "Windows perde configuração de rede",
    "Roteador funciona para alguns dispositivos e falha para outros",
    "Arquivos importantes em máquina instável"
  ],
  dicasLocais: `Ao solicitar atendimento no Guaraituba, informe o endereço e uma referência como a UBS Guaraituba ou a Rua Genésio Moreschi. Diga se o computador ainda acessa a internet; isso ajuda a avaliar suporte remoto. Para rede, teste outro dispositivo no mesmo ponto.`,
};

const GuaraitubaColombo = () => <BairroTemplate data={data} />;

export default GuaraitubaColombo;
