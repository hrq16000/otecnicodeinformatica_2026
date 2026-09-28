import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Secretaria Municipal de Educação: CEMAEE Hellen Keller — Rua Zacarias Alves Pereira, 92, Aristocrata.
// - Secretaria Municipal de Educação: Escola Municipal Professora Ernestina Macedo de Souza Côrtes — Rua André Zen, 122, Jardim Aristocrata.
// - Prefeitura de São José dos Pinhais: UPA Rui Barbosa — Av. Rui Barbosa, 10471, Aristocrata.
const data = {
  nome: "Aristocrata",
  slug: "aristocrata",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Aristocrata, SJP | Suporte",
  metaDescription: "Suporte de informática no Aristocrata, São José dos Pinhais. Diagnóstico de notebook, Windows, periféricos e rede com triagem antes da execução.",
  h1: "Técnico de Informática no Aristocrata – São José dos Pinhais",
  subtitulo: "Triagem técnica para notebook, software e periféricos antes de formatar ou trocar componentes.",
  descricaoLonga: `O Aristocrata possui referências municipais bem definidas em São José dos Pinhais. A rede pública mantém o CEMAEE Hellen Keller na Rua Zacarias Alves Pereira e a Escola Municipal Professora Ernestina Macedo de Souza Côrtes na Rua André Zen. A Prefeitura também identifica a UPA Rui Barbosa na Avenida Rui Barbosa, dentro do bairro. Essas referências tornam a localização objetiva e verificável.

Nesta página, o foco técnico está em notebook, Windows e periféricos. Quando a máquina continua ligando, mas um aplicativo deixa de abrir, o áudio some, a webcam para ou uma impressora fica offline, a causa pode estar em atualização, driver, configuração ou comunicação. Formatar o computador sem separar essas hipóteses pode gerar retrabalho.

Em notebook, a análise muda quando há perda de desempenho, falha de carregamento ou aquecimento. Fonte, bateria, temperatura, memória e armazenamento precisam ser avaliados conforme o sintoma. Se a máquina guarda arquivos importantes, backup entra antes de reinstalação ou troca de disco.

Em rede, comparamos outros dispositivos e pontos do imóvel antes de indicar roteador, repetidor ou mesh. Se apenas um notebook perde conexão, adaptador e driver ganham peso. Se todos os aparelhos falham juntos, a investigação passa para a infraestrutura.

Quando o equipamento ainda está operacional, parte da triagem pode começar remotamente. Falhas físicas, necessidade de desmontagem ou testes prolongados passam para visita ou bancada. A página do Aristocrata foi reescrita para explicar esse fluxo com conteúdo próprio, sem promessa fixa de prazo e sem generalizações sobre o bairro.`,
  pontosReferencia: [
    "Rua Zacarias Alves Pereira",
    "CEMAEE Hellen Keller",
    "Rua André Zen",
    "Escola Municipal Professora Ernestina Macedo de Souza Côrtes",
    "Avenida Rui Barbosa",
    "UPA Rui Barbosa"
  ],
  tempoDeslocamento: "Agenda definida após triagem do sintoma e do endereço",
  servicosDestaque: [
    "Correção de Windows e drivers",
    "Notebook com falha de desempenho",
    "Impressora e periféricos",
    "Webcam e áudio",
    "Diagnóstico de Wi-Fi",
    "Backup antes de reinstalação"
  ],
  conteudoExclusivo: `Software, periférico ou hardware: como separar

Se a impressora ou webcam deixa de funcionar depois de uma atualização, o primeiro passo é verificar se o sistema ainda reconhece o dispositivo. Se reconhece, driver e configuração entram antes de qualquer troca. Se não aparece em nenhuma porta ou computador, hardware passa a ser mais provável.

Em notebook, queda de desempenho sob carga pode ser temperatura, memória ou armazenamento. Em Wi-Fi, testar outro aparelho no mesmo ponto ajuda a separar a estação da rede.

Essa abordagem dá à página do Aristocrata uma função própria voltada a notebook, sistema e periféricos.`,
  problemasComuns: [
    "Aplicativo deixa de abrir",
    "Impressora fica offline",
    "Webcam ou áudio para depois de atualização",
    "Notebook aquece e perde desempenho",
    "Wi-Fi falha apenas em um equipamento",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao pedir atendimento no Aristocrata, informe o endereço e uma referência como a Rua André Zen, Rua Zacarias Alves Pereira ou Avenida Rui Barbosa. Para periféricos, envie a mensagem de erro; para notebook, diga quando o problema aparece; para rede, teste outro dispositivo no mesmo ponto.`,
};

const Aristocrata = () => <BairroTemplate data={data} />;

export default Aristocrata;
