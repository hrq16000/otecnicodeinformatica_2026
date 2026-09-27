import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Pinhais: USF Ana Nery — Rua Jacarezinho, 1945.
// - Prefeitura de Pinhais: Escola Municipal Felipe Zeni — Rua Corbélia, 1982.
// - Prefeitura de Pinhais: Escola Municipal Poty Lazzarotto — Rua Rolândia, 1655.
const data = {
  nome: "Alto Tarumã",
  slug: "alto-taruma",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Alto Tarumã, Pinhais | Diagnóstico",
  metaDescription: "Técnico de informática no Alto Tarumã, Pinhais. Triagem pelo WhatsApp, diagnóstico técnico e visita ou bancada conforme a falha.",
  h1: "Técnico de Informática no Alto Tarumã – Pinhais",
  subtitulo: "Atendimento definido pelo sintoma real do equipamento, sem formatação ou troca de peça por tentativa.",
  descricaoLonga: `O Alto Tarumã tem referências públicas espalhadas por vias diferentes do bairro. A Prefeitura de Pinhais registra a USF Ana Nery na Rua Jacarezinho, a Escola Municipal Felipe Zeni na Rua Corbélia e a Escola Municipal Poty Lazzarotto na Rua Rolândia. Essas referências ajudam a localizar o chamado durante a triagem, sem substituir a confirmação do endereço nem criar promessa fixa de chegada.

O primeiro passo do atendimento é entender o que a máquina faz — e o que deixou de fazer. Computador que liga sem imagem, notebook que desliga sob carga, Windows que trava depois de atualizar e Wi-Fi que cai em um cômodo específico pertencem a diagnósticos diferentes. A descrição correta do sintoma evita deslocamento e troca de peça por tentativa.

Para lentidão, medimos armazenamento, memória e processos de inicialização. Para superaquecimento, verificamos temperatura, ventilação e comportamento sob carga. Em falha de energia, carregador, fonte, conector e placa são avaliados numa sequência própria. Formatação só é indicada quando existe motivo técnico para reinstalar o sistema.

Em rede sem fio, comparamos a conexão perto do roteador e nos locais de uso. Quando a velocidade está normal no ponto principal e cai em outras áreas, cobertura e obstáculos entram na investigação. Se a lentidão aparece em todos os dispositivos, a causa pode estar em outro ponto e não deve ser tratada automaticamente com repetidor.

Quando o reparo precisa de desmontagem profunda ou teste prolongado, a bancada é preferível. Em serviços com dados, a preservação dos arquivos é discutida antes de reinstalação, clonagem ou troca de disco.`,
  pontosReferencia: [
    "USF Ana Nery – Rua Jacarezinho",
    "Escola Municipal Felipe Zeni – Rua Corbélia",
    "Escola Municipal Poty Lazzarotto – Rua Rolândia",
    "Eixo da Rua Jacarezinho",
    "Eixo da Rua Rolândia"
  ],
  tempoDeslocamento: "Atendimento agendado após triagem",
  servicosDestaque: [
    "Diagnóstico de PC e notebook",
    "Formatação com backup combinado",
    "Upgrade de SSD e memória",
    "Remoção de vírus e adwares",
    "Diagnóstico de rede e Wi-Fi",
    "Backup e recuperação de dados"
  ],
  conteudoExclusivo: `Diagnóstico técnico no Alto Tarumã

A triagem começa com informação objetiva: modelo, sintoma e localização. Quem está próximo à Rua Jacarezinho, Rua Corbélia ou Rua Rolândia pode usar essas referências para facilitar a agenda.

Um PC que leva vários minutos para iniciar pode estar limitado pelo armazenamento; uma máquina que abre rápido e trava com várias abas pode estar limitada por memória; um notebook que funciona bem frio e cai de desempenho depois pode estar limitado por temperatura. Separar esses cenários antes de comprar peça é parte do serviço.

O mesmo vale para problemas de rede. Antes de indicar mesh ou repetidor, precisamos saber se o sinal está fraco, se a velocidade contratada chega ao roteador e se a queda afeta apenas Wi-Fi ou também cabo.

Quando há suspeita de falha no disco, a prioridade muda: preservar os dados antes de testar repetidamente o sistema. Quando a falha é física, a bancada permite desmontagem, medição e teste sem improviso no endereço.

Essa abordagem torna a página útil para o bairro sem transformar referências locais em afirmações sobre hábitos ou “problemas típicos” que não tenham evidência.`,
  problemasComuns: [
    "PC demora para iniciar ou abrir programas",
    "Notebook desliga ou perde desempenho por temperatura",
    "Computador liga sem apresentar vídeo",
    "Wi-Fi fica fraco em parte do imóvel",
    "Windows trava após atualização",
    "Disco apresenta erro ou arquivos inacessíveis"
  ],
  dicasLocais: `Na triagem do Alto Tarumã, envie sua rua e uma referência próxima, além do modelo do equipamento. Se houver mensagem de erro, fotografe antes de reiniciar. Se o disco fizer ruído, desaparecer do sistema ou apresentar arquivos corrompidos, evite continuar gravando dados até a avaliação.`,
};

const AltoTaruma = () => <BairroTemplate data={data} />;

export default AltoTaruma;
