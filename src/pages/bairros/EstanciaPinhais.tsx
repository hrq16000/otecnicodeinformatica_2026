import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Pinhais: Secretaria Municipal de Saúde — Rua Guilherme Weiss, 320.
// - Prefeitura de Pinhais: USF Tarumã — Rua Guilherme Weiss, 500.
// - Prefeitura de Pinhais: Escola Municipal Clementina Cruz — Rua José Mariano dos Santos, 581.
const data = {
  nome: "Estância Pinhais",
  slug: "estancia-pinhais",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática na Estância Pinhais | Diagnóstico e Suporte",
  metaDescription: "Suporte de informática na Estância Pinhais. Triagem técnica, visita quando necessária e bancada para notebook ou computador que exige desmontagem.",
  h1: "Técnico de Informática na Estância Pinhais – Pinhais",
  subtitulo: "Diagnóstico orientado pelo sintoma, com definição clara entre suporte remoto, visita e bancada.",
  descricaoLonga: `A Estância Pinhais tem referências municipais concentradas em um eixo bem identificável. A Secretaria Municipal de Saúde funciona na Rua Guilherme Weiss, nº 320, e a USF Tarumã está na mesma via, no nº 500. A Prefeitura também registra a Escola Municipal Clementina Cruz na Rua José Mariano dos Santos. Esses pontos ajudam a localizar um chamado com precisão sem depender de expressões vagas como “perto do Centro”.

O atendimento de informática parte do defeito apresentado, não do bairro. Computador que parou de iniciar depois de uma queda de energia pede uma sequência de testes diferente de uma máquina que apenas ficou lenta com o tempo. Notebook que esquenta, desliga ou perde carga precisa ter alimentação, bateria, ventilação e temperatura avaliadas antes de qualquer decisão sobre formatação. Quando o problema é software, navegador, impressora ou configuração de sistema, a triagem pode começar remotamente se a máquina ainda estiver operacional.

Para defeitos físicos, a escolha entre visita e bancada depende do que precisa ser medido ou desmontado. Troca de tela, reparo em conector, limpeza interna profunda, teste prolongado de armazenamento e investigação de falha intermitente costumam exigir mais controle do que um atendimento rápido no endereço. Quando há arquivos importantes, a preservação entra antes de reinstalação ou troca de disco.

A Estância Pinhais não recebe uma página “espelhada” de outro bairro. A lógica aqui é usar referências locais verdadeiras para a logística e um roteiro técnico que explique por que cada sintoma leva a um caminho diferente. O cliente sabe quais informações enviar e entende quando uma solução remota é suficiente e quando a máquina precisa ser examinada fisicamente.`,
  pontosReferencia: [
    "Rua Guilherme Weiss",
    "Secretaria Municipal de Saúde de Pinhais",
    "USF Tarumã",
    "Rua José Mariano dos Santos",
    "Escola Municipal Clementina Cruz"
  ],
  tempoDeslocamento: "Agenda confirmada depois da triagem e do endereço",
  servicosDestaque: [
    "Diagnóstico de falha de inicialização",
    "Manutenção de notebook com aquecimento ou carga irregular",
    "Correção de Windows e programas",
    "Backup antes de reinstalação",
    "Upgrade de SSD e memória após avaliação",
    "Configuração de impressora e rede"
  ],
  conteudoExclusivo: `Como decidimos entre remoto, visita e bancada na Estância Pinhais

Nem todo chamado precisa começar com deslocamento. Se o Windows ainda abre e o defeito está em configuração, programas ou periféricos, o suporte remoto pode resolver ou pelo menos reduzir as hipóteses. Se a máquina não dá vídeo, não carrega, desliga ao aquecer ou apresenta ruído de componente, a avaliação física ganha prioridade.

Para lentidão, verificamos uso de armazenamento, memória, temperatura e processos antes de sugerir formatação. Para perda de conexão, separamos falha do provedor, roteador e dispositivo. Para arquivos apagados ou disco instável, orientamos interromper tentativas que possam sobrescrever dados.

Essa sequência evita três atalhos ruins: formatar por padrão, trocar peça por tentativa e indicar repetidor sem medir a rede. O endereço na Estância Pinhais organiza a logística; o sintoma e os testes organizam o diagnóstico.`,
  problemasComuns: [
    "Computador que parou de iniciar depois de queda ou desligamento",
    "Notebook com bateria, fonte ou conector apresentando falha",
    "Máquina lenta por armazenamento, memória ou temperatura",
    "Windows com erros depois de atualização",
    "Impressora instalada mas sem comunicação",
    "Wi-Fi funcionando em alguns equipamentos e falhando em outros"
  ],
  dicasLocais: `Ao solicitar atendimento na Estância Pinhais, informe a rua e uma referência próxima — por exemplo Rua Guilherme Weiss, USF Tarumã ou Escola Clementina Cruz. Envie o modelo do equipamento e descreva se o defeito é constante ou intermitente. Em caso de arquivos importantes, avise antes de formatar, restaurar ou instalar outro sistema.`,
};

const EstanciaPinhais = () => <BairroTemplate data={data} />;

export default EstanciaPinhais;
