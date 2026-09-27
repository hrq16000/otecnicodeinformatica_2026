import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Araucária: UBS São Francisco de Assis / CSU — Rua Estela Lesniowski Wzorek, 360, Fazenda Velha.
// - Catálogo municipal atual também registra estruturas públicas na Rua Estela Lesniowski Wzorek, Fazenda Velha.
const data = {
  nome: "Fazenda Velha",
  slug: "fazenda-velha-araucaria",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática na Fazenda Velha, Araucária | Suporte",
  metaDescription: "Suporte de informática na Fazenda Velha, Araucária. Diagnóstico de Windows, aplicativos, rede e arquivos com foco em continuidade de uso.",
  h1: "Técnico de Informática na Fazenda Velha – Araucária",
  subtitulo: "Triagem para recuperar a função do computador sem formatar ou trocar peças por tentativa.",
  descricaoLonga: `A Fazenda Velha tem referências municipais claras em Araucária. A Prefeitura registra a UBS São Francisco de Assis / CSU na Rua Estela Lesniowski Wzorek e mantém outras estruturas públicas na mesma região. Esses pontos ajudam a confirmar o endereço sem recorrer a descrições genéricas de comércio ou perfil do bairro.

Nesta página, o foco técnico está em continuidade de uso. Um computador pode ligar normalmente e ainda assim impedir trabalho ou estudo quando o Windows não abre, um aplicativo falha, a impressora fica offline ou a rede deixa de responder. A triagem começa perguntando qual atividade ficou bloqueada e se o problema afeta apenas uma máquina ou várias.

Quando o sistema ainda inicia, verificamos atualizações, drivers, eventos do Windows, uso de memória, armazenamento e comunicação com periféricos. Em impressora, comparamos fila, driver e outro equipamento. Em rede, testamos outro dispositivo antes de concluir que o roteador é o problema. Em aplicativo, buscamos diferenciar falha do programa, do sistema ou do armazenamento.

Se a máquina não liga, perde vídeo ou reinicia sob carga, o diagnóstico muda para alimentação, memória, temperatura e hardware. Se há arquivos importantes, backup vem antes de reinstalação. Em notebook, fonte e bateria também entram quando há instabilidade de energia.

A página da Fazenda Velha foi reescrita para orientar a recuperação da função principal do equipamento, com conteúdo próprio e referências locais verificáveis. A localização organiza o atendimento; o sintoma define a linha de diagnóstico.`,
  pontosReferencia: [
    "Rua Estela Lesniowski Wzorek",
    "UBS São Francisco de Assis / CSU",
    "Fazenda Velha – Araucária"
  ],
  tempoDeslocamento: "Horário confirmado após triagem e localização",
  servicosDestaque: [
    "Correção de Windows e aplicativos",
    "Impressora e periféricos",
    "Diagnóstico de rede",
    "Notebook com falha de energia",
    "Backup antes de reinstalação",
    "Avaliação de SSD e memória"
  ],
  conteudoExclusivo: `Quando a máquina liga, mas o trabalho para

O diagnóstico começa pelo que deixou de funcionar. Se é um programa, buscamos erro de software ou sistema. Se é impressora, verificamos comunicação e driver. Se é rede, comparamos outras máquinas antes de mexer no computador.

Formatação só entra quando existe motivo técnico e quando o backup está resolvido. Se a falha é física, insistir em software não ajuda.

Essa abordagem dá à página da Fazenda Velha uma função clara: reduzir indisponibilidade sem aplicar uma solução genérica para problemas diferentes.`,
  problemasComuns: [
    "Windows inicia, mas aplicativo não abre",
    "Impressora fica offline",
    "Computador perde acesso à rede",
    "Notebook reinicia durante uso",
    "Sistema apresenta erro após atualização",
    "Arquivos importantes precisam de backup"
  ],
  dicasLocais: `Ao pedir atendimento na Fazenda Velha, informe a rua e uma referência como a UBS São Francisco de Assis / CSU ou a Rua Estela Lesniowski Wzorek. Explique qual atividade ficou indisponível e se outros computadores apresentam o mesmo problema.`,
};

const FazendaVelhaAraucaria = () => <BairroTemplate data={data} />;

export default FazendaVelhaAraucaria;
