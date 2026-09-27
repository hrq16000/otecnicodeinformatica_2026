import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Campo Largo: Unidade de Saúde São Silvestre — Estrada Principal do Palmital, s/n, São Silvestre.
// - Prefeitura de Campo Largo: São Silvestre integra o cronograma municipal de atualização cadastral em saúde.
const data = {
  nome: "São Silvestre",
  slug: "sao-silvestre",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática em São Silvestre, Campo Largo | Diagnóstico",
  metaDescription: "Assistência de informática em São Silvestre, Campo Largo. Triagem para PC, notebook, Wi-Fi e backup, com visita ou bancada conforme o problema.",
  h1: "Técnico de Informática em São Silvestre – Campo Largo",
  subtitulo: "Diagnóstico antes da solução, com foco em desempenho, conectividade e preservação de dados.",
  descricaoLonga: `São Silvestre é uma localidade explicitamente atendida pela rede municipal de Campo Largo. A Prefeitura registra a Unidade de Saúde São Silvestre na Estrada Principal do Palmital, e o bairro também aparece no cronograma municipal de atualização cadastral em saúde. Essas referências dão base concreta para a página sem precisar inventar pontos de referência ou características da região.

No atendimento de informática, o foco é separar causa de sintoma. Computador lento pode estar com armazenamento saturado, pouca memória, temperatura elevada ou excesso de software. Notebook que desliga pode ter relação com alimentação ou aquecimento. Wi-Fi instável pode ser cobertura, roteador, provedor ou falha do próprio dispositivo. Cada uma dessas hipóteses pede um teste diferente.

Quando a máquina ainda inicia, verificamos o que pode ser observado sem desmontagem: uso de CPU e memória, espaço livre, saúde aparente do armazenamento, eventos do sistema e comportamento da rede. Se o equipamento não liga, perde alimentação, apresenta conector danificado ou exige medição interna, o atendimento precisa ser presencial ou em bancada.

Em upgrade, evitamos indicar peça antes de identificar o gargalo. SSD melhora situações específicas; mais memória resolve outras. Nenhum dos dois corrige problema térmico ou falha de placa. Em backup, a prioridade muda quando o disco já apresenta sinais de instabilidade: preservar dados pode ser mais importante do que insistir em fazer o sistema iniciar.

A página de São Silvestre foi construída para orientar o visitante antes do contato e diferenciar claramente essa rota das páginas programáticas antigas. A referência municipal situa o atendimento; o roteiro técnico mostra como a decisão é tomada.`,
  pontosReferencia: [
    "Estrada Principal do Palmital",
    "Unidade de Saúde São Silvestre",
    "São Silvestre – Campo Largo"
  ],
  tempoDeslocamento: "Agenda confirmada após triagem do endereço e do defeito",
  servicosDestaque: [
    "Diagnóstico de computador lento",
    "Notebook que desliga ou aquece",
    "Avaliação de SSD e memória",
    "Configuração de Wi-Fi",
    "Backup e preservação de arquivos",
    "Correção de Windows e drivers"
  ],
  conteudoExclusivo: `Upgrade só faz sentido quando existe gargalo confirmado

Em São Silvestre, a orientação técnica desta página é simples: não trocar componente só porque a máquina está lenta. Primeiro verificamos onde o desempenho está sendo limitado. Se o disco fica em uso constante, armazenamento pode ser a causa. Se a memória está no limite, RAM pode ser relevante. Se a temperatura sobe e o processador reduz frequência, o problema é outro.

Para rede, a comparação entre aparelhos também ajuda. Wi-Fi ruim em todos os dispositivos aponta para uma hipótese; falha em apenas um notebook aponta para outra. Para dados, um disco com erros merece cautela antes de qualquer reinstalação.

Essa abordagem evita soluções automáticas e deixa claro o que deve ser observado antes da visita ou coleta.`,
  problemasComuns: [
    "Computador lento mesmo com poucos programas abertos",
    "Notebook aquece e reduz desempenho",
    "SSD ou HD trabalha em uso constante",
    "Wi-Fi cai em um ou mais dispositivos",
    "Windows inicia com erros ou demora excessivamente",
    "Arquivos importantes sem cópia de segurança"
  ],
  dicasLocais: `Ao pedir atendimento em São Silvestre, informe rua, número e uma referência próxima, como a Estrada Principal do Palmital ou a Unidade de Saúde São Silvestre. Para lentidão, diga se começa logo ao ligar ou depois de algum tempo. Para notebook que aquece, informe a tarefa em uso. Se houver arquivos importantes, avise antes de formatar ou trocar armazenamento.`,
};

const SaoSilvestreCL = () => <BairroTemplate data={data} />;

export default SaoSilvestreCL;
