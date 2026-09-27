import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Pinhais: USF Vargem Grande — Rua Guilherme Ceolin, 551.
// - Prefeitura de Pinhais: Secretaria Municipal de Obras Públicas — Rua Carlos Drummond de Andrade, 166.
// - Prefeitura de Pinhais: revitalização da Rua Fagundes Varela em 2026.
const data = {
  nome: "Vargem Grande",
  slug: "vargem-grande",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Vargem Grande, Pinhais | Diagnóstico",
  metaDescription: "Técnico de informática no Vargem Grande, Pinhais. Triagem pelo WhatsApp, atendimento conforme endereço e bancada para reparos que exigem testes.",
  h1: "Técnico de Informática no Vargem Grande – Pinhais",
  subtitulo: "Diagnóstico orientado pelo sintoma, com atendimento no local ou bancada conforme o tipo de reparo.",
  descricaoLonga: `O Vargem Grande tem referências municipais bem definidas para orientar a localização de um chamado. A USF Vargem Grande fica na Rua Guilherme Ceolin, enquanto a Secretaria Municipal de Obras Públicas funciona na Rua Carlos Drummond de Andrade. Em 2026, a Prefeitura também executou melhorias de infraestrutura na Rua Fagundes Varela, em trechos entre a Avenida Iraí, Rua Graça Aranha, Rua Henrique Coelho Neto e Rua Carlos Drummond de Andrade. Essas referências ajudam a confirmar a região do atendimento sem depender de pontos genéricos.

Para assistência de informática, a regra continua sendo técnica: endereço não determina diagnóstico. Um desktop que não dá vídeo precisa de um roteiro diferente de um notebook que aquece ou de um computador que apenas perdeu desempenho. Antes de recomendar peça nova, avaliamos sintomas, histórico do defeito e limitações atuais da máquina. Antes de formatar, verificamos dados e possibilidade de backup. Antes de instalar repetidor de Wi-Fi, é preciso entender se o problema está na cobertura interna, no roteador ou na própria conexão.

A modalidade do atendimento depende dessa triagem. Questões de software, configuração e algumas falhas de sistema podem começar remotamente. Problemas físicos, conectores, superaquecimento, componentes com defeito e máquinas que não iniciam podem exigir visita ou retirada. Bancada é indicada quando o serviço precisa de desmontagem, testes prolongados, medição ou espera por componente.

No Vargem Grande, a página foi escrita para funcionar como uma orientação de entrada, não como propaganda baseada em frases que poderiam servir para qualquer bairro. O usuário consegue entender o que informar, como o diagnóstico é separado por tipo de falha e por que algumas situações não devem ser resolvidas por tentativa.`,
  pontosReferencia: [
    "Rua Guilherme Ceolin",
    "USF Vargem Grande",
    "Rua Carlos Drummond de Andrade",
    "Secretaria Municipal de Obras Públicas",
    "Rua Fagundes Varela",
    "Avenida Iraí"
  ],
  tempoDeslocamento: "Atendimento programado após confirmação do endereço e do tipo de serviço",
  servicosDestaque: [
    "Diagnóstico de computador que não liga",
    "Reparo e avaliação de notebook",
    "Upgrade de SSD e memória quando indicado",
    "Backup e recuperação de arquivos",
    "Correção de Windows instável",
    "Diagnóstico de Wi-Fi e rede"
  ],
  conteudoExclusivo: `O que muda no diagnóstico antes de marcar a visita

Se o equipamento não liga, a triagem busca saber se há sinal de energia, imagem, ruído, LED ou tentativa de partida. Se a máquina liga mas está lenta, a análise muda para armazenamento, memória, processos, temperatura e sistema. Se o problema é Wi-Fi, perguntamos se outros aparelhos apresentam a mesma falha e se o problema ocorre perto ou longe do roteador.

Essas perguntas evitam duas práticas ruins: trocar componente sem testar e transformar qualquer lentidão em formatação. Em muitos casos, um disco quase cheio, memória insuficiente, aquecimento ou software em segundo plano explicam a queda de desempenho. Em outros, a causa é física e só aparece com medição.

Quando há dados importantes, o cliente precisa avisar isso antes de qualquer intervenção. Se o disco apresenta ruído, erros ou desaparece do sistema, insistir no uso pode reduzir a chance de recuperação. Quando a bancada é necessária, o motivo é explicado antes da retirada. O endereço no Vargem Grande organiza a logística; o sintoma do equipamento organiza o diagnóstico.`,
  problemasComuns: [
    "Computador não liga, liga sem vídeo ou desarma",
    "Notebook aquece muito ou desliga durante uso",
    "Máquina lenta mesmo com poucos programas abertos",
    "HD ou SSD some, fica lento ou apresenta erros",
    "Wi-Fi perde sinal em parte do imóvel",
    "Windows apresenta travamentos após atualização ou instalação de software"
  ],
  dicasLocais: `Ao solicitar atendimento no Vargem Grande, envie rua, número e uma referência próxima, como a USF Vargem Grande, Rua Carlos Drummond de Andrade ou Avenida Iraí. Descreva também o último momento em que o equipamento funcionou normalmente. Para falha de armazenamento, evite formatar ou continuar copiando arquivos antes da triagem; para Wi-Fi, informe em quais cômodos a conexão funciona e onde ela começa a falhar.`,
};

const VargemGrande = () => <BairroTemplate data={data} />;

export default VargemGrande;
