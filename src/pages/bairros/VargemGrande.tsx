import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Pinhais: USF Vargem Grande — Rua Guilherme Ceolin, 551.
// - Prefeitura de Pinhais: Escola Municipal Guilherme Ceolin — Rua Cassiano Ricardo, 520.
// - Prefeitura de Pinhais: Secretaria Municipal de Obras Públicas — Rua Carlos Drummond de Andrade, 166.
const data = {
  nome: "Vargem Grande",
  slug: "vargem-grande",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Vargem Grande, Pinhais | Diagnóstico",
  metaDescription: "Técnico de informática no Vargem Grande, Pinhais. Triagem pelo WhatsApp, visita conforme necessidade e bancada para reparos que exigem desmontagem.",
  h1: "Técnico de Informática no Vargem Grande – Pinhais",
  subtitulo: "Diagnóstico antes da execução, atendimento combinado pelo endereço e coleta quando o serviço precisa de bancada.",
  descricaoLonga: `Vargem Grande reúne referências municipais úteis para a organização do atendimento. A USF Vargem Grande fica na Rua Guilherme Ceolin, a Escola Municipal Guilherme Ceolin na Rua Cassiano Ricardo e a Secretaria Municipal de Obras Públicas na Rua Carlos Drummond de Andrade. Esses endereços ajudam a localizar a região durante a triagem, sem substituir a confirmação do endereço exato nem criar promessa automática de chegada.

O atendimento de informática é definido pelo tipo de falha. Computador lento, notebook aquecendo, máquina sem imagem, Windows em tela azul, Wi-Fi instável e perda de arquivos exigem diagnósticos diferentes. Antes de indicar peça ou formatação, tentamos identificar onde está o gargalo: sistema, armazenamento, memória, temperatura, alimentação ou rede.

Em desktop sem vídeo, verificamos alimentação, memória e saída de vídeo antes de concluir que o defeito está no sistema. Em notebook lento, armazenamento e temperatura costumam ser medidos antes de recomendar SSD, memória ou reinstalação. Em rede Wi-Fi, observamos a conexão perto do roteador e nos pontos de uso para separar limitação de cobertura de problema da internet contratada.

Quando existe informação importante no equipamento, o plano de backup é definido antes da execução. Se o reparo exige desmontagem profunda, troca de tela, solda ou teste prolongado, a coleta para bancada pode ser indicada. O cliente recebe diagnóstico, modalidade e valor antes de autorizar o serviço.`,
  pontosReferencia: [
    "USF Vargem Grande – Rua Guilherme Ceolin",
    "Escola Municipal Guilherme Ceolin – Rua Cassiano Ricardo",
    "Secretaria Municipal de Obras Públicas – Rua Carlos Drummond de Andrade",
    "Eixo da Rua Guilherme Ceolin",
    "Eixo da Rua Cassiano Ricardo"
  ],
  tempoDeslocamento: "Agenda definida após triagem e confirmação do endereço",
  servicosDestaque: [
    "Diagnóstico de computador e notebook",
    "Formatação e reinstalação com backup",
    "Upgrade de SSD e memória",
    "Remoção de vírus e adwares",
    "Diagnóstico de Wi-Fi e rede",
    "Recuperação e proteção de dados"
  ],
  conteudoExclusivo: `Atendimento técnico no Vargem Grande com escopo definido antes

Quem está no entorno da Rua Guilherme Ceolin, Rua Cassiano Ricardo ou Rua Carlos Drummond de Andrade pode usar uma dessas referências já na primeira mensagem. A localização serve para montar a agenda; a modalidade técnica depende do defeito.

Computador que fica lento só depois de alguns minutos pode estar limitado por temperatura, não por Windows. Máquina que trava ao copiar arquivos pode ter problema de armazenamento. Wi-Fi que funciona bem perto do roteador e cai nos quartos aponta para cobertura; Wi-Fi ruim até ao lado do equipamento exige outra investigação. Essas diferenças são verificadas antes de indicar compra de peça.

Para formatação, a pergunta inicial não é “qual Windows instalar?”, mas “quais dados, contas e programas precisam continuar funcionando?”. Backup, licenças e acessos entram na preparação antes da reinstalação. Em caso de disco com falha, priorizamos leitura e preservação em vez de insistir em uso normal.

Se o equipamento precisa de bancada, a retirada é combinada com registro do estado do aparelho e o reparo só começa depois da apresentação do diagnóstico e da aprovação do escopo.`,
  problemasComuns: [
    "Computador lento ou com disco em uso constante",
    "Notebook aquecendo e perdendo desempenho",
    "PC que liga sem exibir imagem",
    "Wi-Fi com cobertura irregular",
    "Windows com tela azul ou travamentos",
    "Dados importantes sem cópia de segurança"
  ],
  dicasLocais: `Ao solicitar atendimento no Vargem Grande, envie sua rua e uma referência próxima, como Rua Guilherme Ceolin, Rua Cassiano Ricardo ou Rua Carlos Drummond de Andrade. Inclua marca/modelo e descreva quando o problema começou. Se houver perda de arquivos, ruído de disco ou falha intermitente, informe isso antes de continuar usando a máquina.`,
};

const VargemGrande = () => <BairroTemplate data={data} />;

export default VargemGrande;
