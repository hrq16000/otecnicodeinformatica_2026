import { BairroTemplate } from "./BairroTemplate";

// Fontes locais verificadas em 27/09/2026:
// - Prefeitura de Curitiba: Administração Regional Cajuru (Uberaba na abrangência).
// - Secretaria Municipal da Saúde: US/CEM Salgado Filho, US São Paulo e US Uberaba de Cima.
const data = {
  nome: "Uberaba",
  slug: "uberaba",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Uberaba, Curitiba | Diagnóstico",
  metaDescription: "Técnico de informática no Uberaba, Curitiba. Triagem pelo WhatsApp, atendimento agendado conforme endereço e coleta quando o reparo exige bancada.",
  h1: "Técnico de Informática no Uberaba – Curitiba",
  subtitulo: "Atendimento organizado pelo endereço exato, com triagem antes do deslocamento e bancada quando o reparo não cabe no local.",
  descricaoLonga: `O Uberaba integra a Regional Cajuru e tem referências municipais distribuídas por diferentes vias do bairro. A rede pública de saúde registra equipamentos na Avenida Senador Salgado Filho, na Rua Canal Belém e na Rua Capitão Leônidas Marques, pontos úteis para localizar o chamado sem depender de uma descrição genérica de “perto do centro”. A Avenida Senador Salgado Filho, por exemplo, concentra a Unidade de Saúde Salgado Filho e o Centro de Especialidades Médicas no número 5265; a Prefeitura também lista a Unidade de Saúde São Paulo na Rua Canal Belém e a Unidade Uberaba de Cima na Rua Capitão Leônidas Marques.

Para assistência de informática, isso reforça uma regra prática: a agenda é definida pelo endereço informado na triagem, não por uma promessa fixa de minutos. Antes de sair para uma visita, confirmamos equipamento, sintoma, rua e referência. Se o problema for de software e a máquina ainda conectar à internet, a avaliação pode começar remotamente. Se houver falha física, superaquecimento, conector danificado, tela quebrada ou necessidade de desmontagem prolongada, a coleta para bancada pode ser mais adequada.

Formatação não é usada como resposta automática para lentidão. Primeiro verificamos armazenamento, memória, temperatura, integridade do sistema e o que precisa ser preservado. Em rede Wi-Fi, o diagnóstico considera posição do roteador, distância, obstáculos e comportamento real do sinal. Para recuperação de dados, a orientação inicial é evitar novas gravações quando houver suspeita de falha no disco. O cliente recebe a indicação da modalidade e do escopo antes da execução.`,
  pontosReferencia: [
    "Av. Senador Salgado Filho",
    "US/CEM Salgado Filho",
    "Rua Canal Belém",
    "Rua Capitão Leônidas Marques",
    "US Uberaba de Cima"
  ],
  tempoDeslocamento: "Atendimento agendado conforme endereço e modalidade",
  servicosDestaque: [
    "Diagnóstico de computador e notebook",
    "Formatação com preservação de dados",
    "Upgrade de SSD e memória",
    "Remoção de vírus e ajustes de Windows",
    "Diagnóstico e configuração de Wi-Fi",
    "Backup e recuperação de arquivos"
  ],
  conteudoExclusivo: `Como organizamos o atendimento de informática no Uberaba

O primeiro passo é localizar corretamente o chamado. Em vez de assumir que todos os endereços do Uberaba têm a mesma logística, pedimos rua e referência ainda no WhatsApp. Referências como Avenida Senador Salgado Filho, Rua Canal Belém e Rua Capitão Leônidas Marques ajudam a organizar a rota e a confirmar se o serviço deve começar remoto, em visita ou por coleta.

A modalidade depende do defeito. Windows lento com o computador ainda funcional pode ser triado à distância. Desktop que não liga, notebook com falha física ou equipamento que precisa de desmontagem exige avaliação presencial ou bancada. Em cada cenário, o objetivo é chegar ao diagnóstico com o menor número possível de tentativas e sem trocar peça antes de medir.

Quando a queixa é Wi-Fi, não partimos diretamente para a compra de repetidor. Primeiro é preciso saber onde o roteador está, em quais cômodos o sinal cai e se a lentidão acontece também por cabo. Quando a queixa é desempenho, SSD e memória só entram na recomendação depois de verificar qual recurso está realmente limitando a máquina. Esse processo deixa a página local útil sem inventar “problemas típicos do bairro” que não tenham comprovação.`,
  problemasComuns: [
    "PC ou notebook com lentidão persistente",
    "Máquina que não liga ou reinicia sozinha",
    "Notebook aquecendo ou com ventilação ruidosa",
    "Wi-Fi com queda, baixa velocidade ou área sem cobertura",
    "Sistema infectado por adware, extensões ou programas indesejados",
    "Arquivos apagados ou disco com comportamento anormal"
  ],
  dicasLocais: `Ao chamar pelo Uberaba, informe sua rua e uma referência próxima. Endereços no eixo da Av. Senador Salgado Filho, Rua Canal Belém ou Rua Capitão Leônidas Marques podem ser identificados com facilidade já na triagem. Envie também marca/modelo e o sintoma principal. Se houver arquivos sem backup, informe antes de reiniciar, formatar ou continuar usando um disco que esteja apresentando falha.`,
};

const Uberaba = () => <BairroTemplate data={data} />;

export default Uberaba;
