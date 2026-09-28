import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de Colombo: Regional Osasco/Roça Grande — Rua Pio Alberti, 450, Jardim Osasco.
// - Prefeitura de Colombo: US Osasco — Rua Prefeito Pio Alberti, 1037.
// - Prefeitura de Colombo: UPA Osasco — Rua Luis Gulin, 525.
const data = {
  nome: "Jardim Osasco",
  slug: "jardim-osasco",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no Jardim Osasco, Colombo | Suporte",
  metaDescription: "Assistência de informática no Jardim Osasco, Colombo. Diagnóstico de Windows, periféricos, rede, notebook e arquivos com triagem antes da execução.",
  h1: "Técnico de Informática no Jardim Osasco – Colombo",
  subtitulo: "Triagem para recuperar a função do computador, da rede e dos periféricos sem recorrer a formatação automática.",
  descricaoLonga: `O Jardim Osasco possui várias referências municipais bem definidas em Colombo. A Regional Osasco/Roça Grande funciona na Rua Pio Alberti, a Unidade de Saúde Osasco fica na Rua Prefeito Pio Alberti e a UPA Osasco está na Rua Luis Gulin. Essas referências permitem localizar o atendimento com precisão e sem inventar pontos de apoio.

Nesta página, o foco técnico está em continuidade de uso, Windows e periféricos. Um computador pode continuar ligando e ainda assim impedir trabalho ou estudo se perde acesso à internet, impressora, scanner, webcam ou aplicativo importante. Por isso, a triagem começa pela função que deixou de funcionar.

Quando o Windows ainda inicia, verificamos eventos, drivers, atualizações, memória, armazenamento e comunicação com dispositivos. Em impressoras, testamos fila, conexão e disponibilidade em outro computador. Em rede, comparamos outros aparelhos antes de atribuir a falha ao roteador.

Se o equipamento não liga, perde vídeo ou reinicia sob carga, o diagnóstico muda para alimentação, memória, temperatura e hardware. Em notebook, fonte e bateria entram quando há desligamento ou queda de desempenho. Se existem arquivos importantes, backup vem antes de qualquer reinstalação.

Parte dos problemas de software e configuração pode começar remotamente. Falhas físicas, desmontagem e testes prolongados exigem visita ou bancada. A página do Jardim Osasco foi reescrita para orientar esse processo com conteúdo próprio e sem generalizações sobre perfil residencial ou comercial.`,
  pontosReferencia: [
    "Rua Pio Alberti",
    "Regional Osasco/Roça Grande",
    "Rua Prefeito Pio Alberti",
    "US Osasco",
    "Rua Luis Gulin",
    "UPA Osasco"
  ],
  tempoDeslocamento: "Agenda definida após triagem do problema e do endereço",
  servicosDestaque: [
    "Correção de Windows e aplicativos",
    "Impressora e periféricos",
    "Diagnóstico de rede",
    "Notebook com falha de desempenho",
    "Backup antes de reinstalação",
    "Avaliação de hardware"
  ],
  conteudoExclusivo: `Quando a máquina liga, mas a tarefa principal para

Impressora offline, programa que não abre ou rede indisponível exigem diagnósticos diferentes. Se apenas um computador apresenta a falha, a análise é local; se vários dispositivos falham juntos, a infraestrutura ganha peso.

Formatação só faz sentido quando há justificativa e backup resolvido. Em periféricos, testar outro computador ou outra porta ajuda a separar software de hardware.

Essa abordagem dá à página do Jardim Osasco uma função própria voltada a continuidade de uso, sistema e periféricos.`,
  problemasComuns: [
    "Aplicativo importante deixa de abrir",
    "Impressora fica offline",
    "Computador perde acesso à rede",
    "Windows apresenta erro depois de atualização",
    "Notebook reinicia durante uso",
    "Arquivos importantes precisam de backup"
  ],
  dicasLocais: `Ao pedir atendimento no Jardim Osasco, informe o endereço e uma referência como a Regional Osasco, a US Osasco ou a UPA Osasco. Para rede, diga se outros equipamentos falham; para periféricos, envie a mensagem de erro; para Windows, informe o que mudou antes do problema.`,
};

const JardimOsascoColombo = () => <BairroTemplate data={data} />;

export default JardimOsascoColombo;
