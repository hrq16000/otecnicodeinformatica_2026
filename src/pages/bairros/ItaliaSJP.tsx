import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de São José dos Pinhais: UBS Moradias Trevisan fica no Jardim Itália e foi reaberta após reforma em 2026.
// - Prefeitura de São José dos Pinhais: CRAS José Zen — Rua Rodolfo Scherner, Jardim Itália.
// - Secretaria Municipal de Educação: Escola Municipal Leonilda Ravaglio Trevisan — Rua Quirino Zagonel, 1260, Jardim Itália.
// - Prefeitura de São José dos Pinhais: Rua Guilherme Otto Sell recebeu obras de infraestrutura em 2026.
const data = {
  nome: "Jardim Itália",
  slug: "italia-sjp",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Jardim Itália, SJP | Suporte",
  metaDescription: "Suporte de informática no Jardim Itália, São José dos Pinhais. Diagnóstico de Windows, impressora, rede e notebook com foco em continuidade de uso.",
  h1: "Técnico de Informática no Jardim Itália – São José dos Pinhais",
  subtitulo: "Triagem para Windows, rede e periféricos antes de formatar ou substituir equipamentos.",
  descricaoLonga: `O Jardim Itália possui referências municipais atuais e bem definidas em São José dos Pinhais. A Prefeitura mantém a UBS Moradias Trevisan e o CRAS José Zen na região, enquanto a Secretaria de Educação registra a Escola Municipal Leonilda Ravaglio Trevisan na Rua Quirino Zagonel. Em 2026, a Rua Guilherme Otto Sell também recebeu melhorias de infraestrutura municipal.

Nesta página, o foco técnico está em continuidade de uso, rede e periféricos. Um computador pode ligar normalmente e ainda assim impedir uma tarefa quando a impressora fica offline, um aplicativo deixa de abrir, o áudio desaparece ou a conexão cai. Esses sintomas não justificam formatação automática; primeiro é preciso identificar qual função parou e em qual camada está a falha.

Quando o Windows ainda inicia, verificamos atualizações, drivers, eventos do sistema, memória e armazenamento. Em impressoras, comparamos fila, driver, cabo ou Wi-Fi e funcionamento em outro equipamento. Em rede, testamos outro dispositivo antes de concluir que o roteador precisa ser substituído.

Em notebook, bateria, fonte e temperatura entram na análise quando há desligamento ou queda de desempenho. Se a máquina não liga ou não apresenta vídeo, o diagnóstico muda para hardware. Se existem arquivos importantes, backup e estado do armazenamento são considerados antes de reinstalar o sistema.

A página do Jardim Itália foi reescrita para orientar a recuperação da função que realmente ficou indisponível. As referências locais confirmam a geografia; a intervenção é escolhida pelo diagnóstico, com foco em reduzir retrabalho e preservar dados.`,
  pontosReferencia: [
    "UBS Moradias Trevisan",
    "Rua Rodolfo Scherner",
    "CRAS José Zen",
    "Rua Quirino Zagonel",
    "Escola Municipal Leonilda Ravaglio Trevisan",
    "Rua Guilherme Otto Sell"
  ],
  tempoDeslocamento: "Atendimento confirmado após triagem do problema e do endereço",
  servicosDestaque: [
    "Correção de Windows e aplicativos",
    "Impressora e periféricos",
    "Diagnóstico de rede e Wi-Fi",
    "Notebook com falha de desempenho",
    "Backup antes de reinstalação",
    "Avaliação de SSD e memória"
  ],
  conteudoExclusivo: `Quando o computador funciona, mas uma tarefa deixa de funcionar

Impressora offline, aplicativo com erro ou Wi-Fi instável podem parar uma rotina sem que o computador esteja fisicamente defeituoso. O diagnóstico começa pela função afetada.

Se apenas uma máquina perde rede, investigamos o próprio equipamento. Se várias falham, infraestrutura ganha peso. Em impressora, outro computador ajuda a separar dispositivo e sistema. Em Windows, reinstalação só entra depois de entender o erro e proteger os arquivos.

No Jardim Itália, esta página concentra essa orientação em continuidade de uso, rede e periféricos, mantendo uma intenção técnica diferente das páginas de armazenamento ou hardware.`,
  problemasComuns: [
    "Impressora fica offline",
    "Aplicativo deixa de abrir",
    "Wi-Fi funciona em outros aparelhos mas falha no computador",
    "Windows apresenta erro após atualização",
    "Notebook perde desempenho durante uso",
    "Arquivos importantes precisam de backup"
  ],
  dicasLocais: `Ao solicitar atendimento no Jardim Itália, informe o endereço e uma referência como a UBS Moradias Trevisan, CRAS José Zen, Rua Quirino Zagonel ou Rua Guilherme Otto Sell. Diga qual função parou e se outros equipamentos apresentam o mesmo problema.`,
};

const ItaliaSJP = () => <BairroTemplate data={data} />;

export default ItaliaSJP;
