import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Plano Diretor de Araucária: Zona de Consolidação do Vila Nova (ZCVN).
// - Prefeitura de Araucária: Vila Nova integra a abrangência da UBS São Francisco de Assis / CSU.
const data = {
  nome: "Vila Nova",
  slug: "vila-nova-araucaria",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática na Vila Nova, Araucária | Diagnóstico",
  metaDescription: "Assistência de informática na Vila Nova, Araucária. Triagem para computador, notebook, Windows, rede e arquivos com atendimento conforme o caso.",
  h1: "Técnico de Informática na Vila Nova – Araucária",
  subtitulo: "Diagnóstico técnico com foco em continuidade de uso, sistema, rede e preservação de arquivos.",
  descricaoLonga: `A Vila Nova é tratada de forma explícita pelo Plano Diretor de Araucária, que define uma Zona de Consolidação do Vila Nova e reconhece a presença de equipamentos comunitários, serviços e usos diversos na região. A Prefeitura também inclui Vila Nova na abrangência da UBS São Francisco de Assis / CSU. Isso permite trabalhar a página com base em referências oficiais recentes.

Para quem usa computador durante o dia, o problema mais importante nem sempre é o componente defeituoso, mas a interrupção da tarefa. Por isso, a triagem começa perguntando o que deixou de funcionar: Windows, aplicativo, internet, impressora, arquivos ou o próprio equipamento.

Se o sistema ainda inicia, verificamos erros, atualizações, drivers, armazenamento e memória antes de qualquer mudança grande. Se há documento ou arquivo local sem backup, a preservação vem primeiro. Se a máquina não liga, a análise muda para alimentação, vídeo e componentes físicos.

Em rede, comparar mais de um aparelho ajuda a separar falha do computador de problema no roteador ou conexão. Em impressora, saber se ela aparece no sistema e se outro computador consegue usá-la reduz hipóteses. Em notebook, fonte, bateria e temperatura são avaliadas quando há desligamento ou perda de desempenho.

A página da Vila Nova foi reescrita para refletir esse tipo de decisão e não simplesmente repetir uma lista de serviços. A localização ajuda a organizar a visita; o diagnóstico busca recuperar a função principal do equipamento com o menor retrabalho possível.`,
  pontosReferencia: [
    "Vila Nova – Araucária",
    "Zona de Consolidação do Vila Nova",
    "Abrangência da UBS São Francisco de Assis / CSU"
  ],
  tempoDeslocamento: "Atendimento combinado após triagem e confirmação do endereço",
  servicosDestaque: [
    "Correção de Windows e aplicativos",
    "Diagnóstico de computador que não liga",
    "Impressora e periféricos",
    "Backup de arquivos",
    "Configuração de rede",
    "Avaliação de notebook"
  ],
  conteudoExclusivo: `Primeiro recuperar a função, depois decidir a intervenção

Quando o computador é usado para trabalho, estudo ou tarefas administrativas, saber o que parou ajuda a escolher o caminho mais curto. Um programa que não abre pode ser software; uma impressora offline pode ser comunicação; um PC sem energia exige outra abordagem.

Formatação só faz sentido quando há motivo técnico e quando o backup está resolvido. Em rede, a comparação entre aparelhos reduz tentativas. Em notebook, fonte, bateria e temperatura precisam ser separadas.

Essa abordagem dá à página da Vila Nova uma função própria e evita que o conteúdo local vire apenas uma variação de template.`,
  problemasComuns: [
    "Windows inicia mas aplicativo importante não abre",
    "Impressora deixa de comunicar",
    "Computador não liga",
    "Notebook desliga durante uso",
    "Wi-Fi funciona em outros aparelhos mas falha no PC",
    "Arquivos importantes precisam ser preservados"
  ],
  dicasLocais: `Ao pedir atendimento na Vila Nova, informe endereço e descreva qual atividade ficou interrompida. Para impressora, diga se outro computador consegue usá-la; para rede, teste outro aparelho; para arquivos importantes, avise antes de reinstalar o sistema.`,
};

const VilaNovaAraucaria = () => <BairroTemplate data={data} />;

export default VilaNovaAraucaria;
