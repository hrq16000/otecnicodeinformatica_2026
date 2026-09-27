import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Pinhais: Secretaria Municipal de Saúde — Rua Guilherme Weiss, 320.
// - Prefeitura de Pinhais: USF Tarumã — Rua Guilherme Weiss, 500.
const data = {
  nome: "Estância Pinhais",
  slug: "estancia-pinhais",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática na Estância Pinhais | Diagnóstico",
  metaDescription: "Técnico de informática na Estância Pinhais. Triagem pelo WhatsApp, diagnóstico por sintoma e atendimento conforme endereço e modalidade.",
  h1: "Técnico de Informática na Estância Pinhais – Pinhais",
  subtitulo: "Diagnóstico antes da execução, com atendimento remoto, visita ou bancada conforme o tipo de falha.",
  descricaoLonga: `A Estância Pinhais tem referências municipais concentradas no eixo da Rua Guilherme Weiss. A Secretaria Municipal de Saúde funciona no número 320 e a USF Tarumã no número 500. Esses pontos ajudam a confirmar a região durante a triagem, mas o atendimento não é organizado por promessa automática de minutos: o endereço exato, o tipo de equipamento e a modalidade necessária definem a agenda.

Quando o computador ainda liga, a triagem pode começar por mensagem, foto da tela ou acesso remoto, conforme o caso. Lentidão, falha de atualização, erro de inicialização e programas indesejados podem ser investigados antes de qualquer deslocamento. Se o defeito envolve fonte, memória, conector, tela, superaquecimento ou desmontagem, a avaliação presencial ou a bancada passa a fazer mais sentido.

A análise de desempenho procura separar causa de sintoma. Disco com leitura irregular, memória insuficiente, excesso de processos na inicialização e temperatura alta podem produzir a mesma sensação de “PC lento”, mas exigem soluções diferentes. Por isso formatação, SSD ou memória só entram na recomendação depois de medir o comportamento da máquina.

Em problemas de Wi-Fi, verificamos primeiro se a internet está lenta no ponto principal ou apenas em determinados ambientes. Essa diferença define se a investigação deve olhar para operadora, roteador, posição do equipamento, interferência ou cobertura.

Quando existem arquivos importantes, backup e preservação são tratados antes de reinstalação ou troca de armazenamento. Se for necessário levar o equipamento para bancada, a coleta é combinada com o cliente e o reparo só segue depois do diagnóstico e da aprovação do escopo.`,
  pontosReferencia: [
    "Secretaria Municipal de Saúde – Rua Guilherme Weiss",
    "USF Tarumã – Rua Guilherme Weiss",
    "Eixo da Rua Guilherme Weiss",
    "Estância Pinhais",
    "Acesso pela região central de Pinhais"
  ],
  tempoDeslocamento: "Agenda confirmada após triagem do endereço",
  servicosDestaque: [
    "Diagnóstico de computador e notebook",
    "Formatação com preservação de dados",
    "Remoção de vírus e programas indesejados",
    "Upgrade de SSD e memória",
    "Diagnóstico de Wi-Fi e rede",
    "Backup e recuperação de arquivos"
  ],
  conteudoExclusivo: `Como funciona a triagem na Estância Pinhais

Quem está no eixo da Rua Guilherme Weiss pode informar esse ponto logo na primeira mensagem. A referência ajuda na logística, mas a decisão técnica vem do sintoma. Computador que demora para iniciar pede leitura de disco e serviços de inicialização; notebook que perde desempenho após alguns minutos exige conferir temperatura; máquina que não liga segue uma sequência de alimentação, memória e placa antes de qualquer intervenção no sistema.

Quando o caso é de software, tentamos reduzir o número de etapas desnecessárias. Em vez de reinstalar o Windows por padrão, verificamos se o problema está em atualização, perfil de usuário, armazenamento ou aplicativo específico. Quando o caso é físico, informamos se a inspeção pode ser feita no local ou se o equipamento precisa de bancada.

Em rede, a posição do roteador e o comportamento do sinal em diferentes cômodos são parte do diagnóstico. Mesh, repetidor ou passagem de cabo só são sugeridos depois de identificar a limitação real.

O objetivo da página local é facilitar a triagem e explicar o processo, sem inventar características do bairro que não tenham comprovação.`,
  problemasComuns: [
    "Computador lento na inicialização",
    "Notebook que esquenta e perde desempenho",
    "Windows com erro de atualização ou inicialização",
    "Wi-Fi com diferença grande entre ambientes",
    "Disco apresentando falhas ou lentidão",
    "Arquivos importantes sem cópia de segurança"
  ],
  dicasLocais: `Ao solicitar atendimento na Estância Pinhais, informe a rua e, se fizer sentido, a proximidade com o eixo da Rua Guilherme Weiss. Envie também o modelo do equipamento e o sintoma principal. Se houver dados importantes, avise antes de formatar, trocar o disco ou insistir no uso de um armazenamento com falha.`,
};

const EstanciaPinhais = () => <BairroTemplate data={data} />;

export default EstanciaPinhais;
