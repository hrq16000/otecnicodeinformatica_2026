import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Campo Largo: Unidade de Saúde da Mulher e da Criança — Rua Barão do Rio Branco, 2112, Centro.
// - Prefeitura de Campo Largo: equipamentos e atendimento municipal concentrados na região central.
const data = {
  nome: "Centro de Campo Largo",
  slug: "centro-campo-largo",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática no Centro de Campo Largo | Suporte",
  metaDescription: "Suporte de informática no Centro de Campo Largo. Diagnóstico de Windows, rede, impressora, notebook e arquivos com triagem antes da execução.",
  h1: "Técnico de Informática no Centro de Campo Largo",
  subtitulo: "Triagem para recuperar a função do computador, da rede ou dos periféricos sem recorrer a formatação automática.",
  descricaoLonga: `O Centro de Campo Largo reúne equipamentos públicos e serviços municipais, e a Prefeitura mantém na região a Unidade de Saúde da Mulher e da Criança, na Rua Barão do Rio Branco. Essa referência ajuda a localizar o atendimento de forma objetiva, sem depender de descrições genéricas como “próximo ao comércio” ou “área de grande circulação”.

Nesta página, o foco técnico está em continuidade de uso. Um computador pode continuar ligando e ainda assim impedir trabalho ou estudo se perde acesso à internet, impressora, scanner, aplicativo ou arquivos. Por isso, a triagem começa pela função que deixou de funcionar.

Quando o Windows ainda inicia, verificamos eventos, drivers, atualizações, memória, armazenamento e comunicação com periféricos. Em impressoras, testamos fila, conexão e funcionamento em outro computador. Em rede, comparamos outros dispositivos antes de atribuir a falha ao roteador ou à conexão principal.

Se o equipamento não liga, perde vídeo ou reinicia sob carga, o diagnóstico muda para alimentação, memória, temperatura e hardware. Em notebook, fonte e bateria entram quando há desligamento ou perda de desempenho. Se existem arquivos importantes, backup vem antes de reinstalação.

Parte dos problemas de software e configuração pode começar remotamente. Falhas físicas, desmontagem e testes prolongados exigem visita ou bancada. A página do Centro de Campo Largo foi reescrita para orientar esse processo com conteúdo próprio e sem promessa fixa de prazo.`,
  pontosReferencia: [
    "Rua Barão do Rio Branco",
    "Unidade de Saúde da Mulher e da Criança",
    "Centro – Campo Largo"
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
  conteudoExclusivo: `O que parou de funcionar define o diagnóstico

Quando a máquina ainda liga, saber se o problema está no programa, na impressora, na internet ou nos arquivos reduz muito as hipóteses. Em rede, comparar outras estações ajuda a separar falha local de infraestrutura. Em impressora, testar outro computador mostra se a causa está na estação ou no equipamento.

Formatação só entra quando existe justificativa e backup resolvido. Se há sinal de falha física, a investigação muda.

Essa abordagem dá à página do Centro de Campo Largo uma função própria voltada a continuidade de uso, rede e periféricos.`,
  problemasComuns: [
    "Aplicativo importante deixa de abrir",
    "Impressora fica offline",
    "Computador perde acesso à rede",
    "Windows apresenta erro após atualização",
    "Notebook reinicia durante uso",
    "Arquivos importantes precisam de backup"
  ],
  dicasLocais: `Ao pedir atendimento no Centro de Campo Largo, informe o endereço e uma referência como a Rua Barão do Rio Branco. Diga qual função ficou indisponível e se outros computadores apresentam o mesmo problema. Isso ajuda a decidir entre suporte remoto, visita e bancada.`,
};

const CampoLargoCentro = () => <BairroTemplate data={data} />;

export default CampoLargoCentro;
