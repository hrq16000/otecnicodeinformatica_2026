import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Araucária: Thomaz Coelho é bairro formal no Plano Diretor.
// - Escola Municipal Arnaldo Maia — Rua Dom Manoel da Silveira D'Elboux, 1005, Thomaz Coelho.
// - UBSF Padre Francisco Belinowski — Parque Thomaz Coelho.
// - Plano Diretor registra presença de usos industriais e de serviços de grande porte na região.
const data = {
  nome: "Thomaz Coelho",
  slug: "thomaz-coelho",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Thomaz Coelho, Araucária | Suporte",
  metaDescription: "Suporte de informática no Thomaz Coelho, Araucária. Diagnóstico de estações, rede, Windows e periféricos com foco em continuidade de uso.",
  h1: "Técnico de Informática no Thomaz Coelho – Araucária",
  subtitulo: "Triagem de computadores e rede com foco em continuidade operacional e redução de retrabalho.",
  descricaoLonga: `Thomaz Coelho é reconhecido oficialmente pelo município de Araucária. A Prefeitura registra a Escola Municipal Arnaldo Maia na Rua Dom Manoel da Silveira D'Elboux, e a UBSF Padre Francisco Belinowski atende a região de Parque Thomaz Coelho. O Plano Diretor também identifica presença de usos industriais e de serviços de maior porte no bairro.

Por isso, esta página prioriza problemas de estações de trabalho, rede e periféricos. Quando um computador deixa de acessar arquivos compartilhados, impressora ou internet, o diagnóstico começa separando a máquina da infraestrutura. Se apenas uma estação falha, adaptador, driver e configuração entram primeiro. Se várias falham juntas, o foco passa para rede, roteador, switch, cabeamento ou conexão principal.

Quando o Windows ainda inicia, é possível verificar eventos, atualizações, drivers e uso de recursos antes de qualquer reinstalação. Se a máquina não liga ou não apresenta vídeo, a linha de diagnóstico muda para alimentação, memória e componentes físicos. Em equipamentos usados durante a rotina de trabalho, também perguntamos o que precisa continuar funcionando e quais dados locais não podem ser perdidos.

Impressoras e periféricos recebem o mesmo cuidado. Antes de substituir equipamento, verificamos comunicação, fila, driver e disponibilidade em outro computador. Em desempenho, SSD e memória só entram quando os testes mostram gargalo real.

A página do Thomaz Coelho foi reescrita para refletir essa necessidade de continuidade e diagnóstico por impacto. A referência local organiza o atendimento; a solução é escolhida pela falha comprovada, não pelo nome do bairro.`,
  pontosReferencia: [
    "Rua Dom Manoel da Silveira D'Elboux",
    "Escola Municipal Arnaldo Maia",
    "Parque Thomaz Coelho",
    "UBSF Padre Francisco Belinowski",
    "Thomaz Coelho – Araucária"
  ],
  tempoDeslocamento: "Agenda definida após triagem da falha e localização",
  servicosDestaque: [
    "Diagnóstico de estação de trabalho",
    "Configuração de rede e compartilhamento",
    "Impressora e periféricos",
    "Correção de Windows e drivers",
    "Backup de arquivos",
    "Avaliação de hardware"
  ],
  conteudoExclusivo: `Quando uma estação para, o problema pode estar fora dela

Uma máquina sem acesso à rede pode ter falha local, mas também pode estar reagindo a problema de infraestrutura. Comparar outras estações, testar cabo e observar o gateway ajuda a reduzir hipóteses.

O mesmo vale para impressora e compartilhamento: se apenas um computador falha, o diagnóstico é diferente de uma indisponibilidade geral. Antes de reinstalar o Windows, buscamos entender a camada que realmente parou.

Essa lógica torna a página do Thomaz Coelho específica para continuidade de uso e rede, sem repetir uma landing residencial genérica.`,
  problemasComuns: [
    "Estação perde acesso à rede",
    "Computador não abre compartilhamentos",
    "Impressora some de uma ou várias máquinas",
    "Windows apresenta erro de driver",
    "PC não liga ou não dá vídeo",
    "Arquivos locais precisam ser preservados"
  ],
  dicasLocais: `Ao pedir atendimento no Thomaz Coelho, informe o endereço e uma referência como a Escola Arnaldo Maia ou o Parque Thomaz Coelho. Diga se o problema afeta uma ou várias máquinas. Em falha de rede ou impressora, essa comparação reduz bastante as hipóteses antes da visita.`,
};

const ThomazCoelhoAraucaria = () => <BairroTemplate data={data} />;

export default ThomazCoelhoAraucaria;
