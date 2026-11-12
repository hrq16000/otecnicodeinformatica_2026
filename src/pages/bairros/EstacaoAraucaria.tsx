import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Araucária: UBS Paulo Reis Teixeira — Rua Natália Campanholo, 347-201, Estação.
// - Catálogo municipal atual mantém a unidade identificada como UBS Paulo Reis Teixeira - Estação.
const data = {
  nome: "Estação",
  slug: "estacao-araucaria",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Estação, Araucária | Suporte",
  metaDescription: "Suporte de informática no Estação, Araucária. Diagnóstico de Windows, periféricos, notebook, rede e arquivos com triagem antes da execução.",
  h1: "Técnico de Informática no Estação – Araucária",
  subtitulo: "Triagem técnica para recuperar a função do computador sem formatar ou trocar peças por tentativa.",
  descricaoLonga: `O bairro Estação tem referência municipal clara em Araucária: a Prefeitura mantém a UBS Paulo Reis Teixeira na Rua Natália Campanholo e identifica a unidade como pertencente à região Estação. Isso permite situar o atendimento com base em informação pública verificável, sem depender de referências vagas.

Nesta página, o foco técnico está em problemas que interrompem o uso diário do computador mesmo quando a máquina ainda liga. Windows que deixa de abrir um programa, impressora que fica offline, webcam que some depois de atualização, áudio que para de funcionar ou computador que perde acesso à rede podem ter causas diferentes e não justificam formatação automática.

Quando o sistema ainda inicia, a triagem verifica eventos do Windows, atualizações, drivers, espaço livre, uso de memória e comunicação com periféricos. Em impressoras, comparamos fila, driver, conexão e disponibilidade em outro dispositivo. Em webcam e áudio, verificamos se o hardware continua reconhecido antes de considerar defeito físico.

Se o computador passa a reiniciar, perde vídeo ou apresenta falha de alimentação, o caminho muda para hardware. Em notebook, fonte, bateria e temperatura também são observadas quando o desempenho cai ou a máquina desliga. Arquivos importantes entram no diagnóstico antes de qualquer reinstalação.

A página do Estação foi reescrita para responder a uma intenção própria: recuperar funções do sistema e dos periféricos com o menor retrabalho possível. A referência do bairro organiza a logística; o diagnóstico é guiado pelo que efetivamente parou de funcionar.`,
  pontosReferencia: [
    "Rua Natália Campanholo",
    "UBS Paulo Reis Teixeira",
    "Estação – Araucária"
  ],
  tempoDeslocamento: "Agenda confirmada após triagem do problema e do endereço",
  servicosDestaque: [
    "Correção de Windows e aplicativos",
    "Impressora e periféricos",
    "Webcam e áudio",
    "Notebook com falha de desempenho",
    "Configuração de rede",
    "Backup antes de reinstalação"
  ],
  conteudoExclusivo: `Quando o computador liga, mas a função principal para

Uma máquina pode iniciar normalmente e ainda assim ficar inutilizável para a tarefa que importa. Impressora offline, sistema sem áudio, webcam ausente ou aplicativo que não abre precisam ser tratados pelo componente que falhou, não com uma solução genérica.

Se o dispositivo aparece no sistema, driver e configuração entram primeiro. Se não aparece em nenhuma porta ou em outro computador, hardware ganha peso. Em rede, comparar outra estação no mesmo ponto ajuda a separar falha local de infraestrutura.

Essa abordagem torna a página do Estação específica para continuidade de uso e periféricos, sem repetir a copy de outras localidades.`,
  problemasComuns: [
    "Impressora fica offline",
    "Aplicativo importante deixa de abrir",
    "Webcam ou áudio some após atualização",
    "Computador perde acesso à rede",
    "Notebook reinicia durante uso",
    "Arquivos precisam ser preservados antes de reinstalar"
  ],
  dicasLocais: `Ao pedir atendimento no Estação, informe o endereço e uma referência como a UBS Paulo Reis Teixeira ou a Rua Natália Campanholo. Para periféricos, envie a mensagem de erro; para rede, diga se outra máquina funciona; para Windows, informe o que mudou antes do problema.`,
};

const EstacaoAraucaria = () => <BairroTemplate data={data} />;

export default EstacaoAraucaria;
