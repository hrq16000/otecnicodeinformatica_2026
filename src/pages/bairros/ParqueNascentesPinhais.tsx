import { BairroTemplate } from "./BairroTemplate";

// Referência local verificada em 27/09/2026:
// - Prefeitura de Pinhais: Parque das Nascentes é listado entre os bairros atendidos pelo novo CRAS Norte.
const data = {
  nome: "Parque das Nascentes",
  slug: "parque-nascentes-pinhais",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Parque das Nascentes, Pinhais | Suporte",
  metaDescription: "Suporte de informática no Parque das Nascentes, Pinhais. Triagem técnica para PC, notebook, Wi-Fi e arquivos, com atendimento conforme o tipo de falha.",
  h1: "Técnico de Informática no Parque das Nascentes – Pinhais",
  subtitulo: "Atendimento definido pelo sintoma, com orientação sobre remoto, visita ou bancada antes da execução.",
  descricaoLonga: `O Parque das Nascentes é reconhecido pela Prefeitura de Pinhais como bairro do município e aparece entre as regiões previstas para atendimento do novo CRAS Norte. Essa confirmação é importante porque evita tratar nomes informais ou loteamentos como se fossem bairros oficiais apenas para gerar páginas de busca.

Na assistência de informática, a página não tenta atribuir ao bairro “problemas típicos” sem evidência. O conteúdo parte de situações técnicas que realmente mudam o diagnóstico. Um notebook que perde conexão apenas em determinados pontos pode ter uma causa diferente de uma rede que fica lenta em todos os aparelhos. Um computador que trava depois de alguns minutos pode estar limitado por temperatura, armazenamento ou memória, enquanto uma máquina que nem inicia exige outro roteiro.

Antes de qualquer formatação, verificamos se existem dados que precisam ser preservados. Antes de sugerir SSD ou memória, buscamos identificar se esses componentes são de fato o gargalo. Antes de recomendar repetidor ou mesh, perguntamos onde o roteador está, quais ambientes têm sinal e se a conexão por cabo apresenta o mesmo problema.

Se o computador ainda funciona e o defeito é de software, configuração ou periférico, parte da avaliação pode começar remotamente. Quando há falha física, tela, conector, alimentação, aquecimento ou necessidade de desmontagem, a visita ou a bancada tende a ser mais adequada. O cliente recebe essa orientação antes da execução.

A página do Parque das Nascentes foi escrita para explicar esse processo de forma própria e transparente. A geografia local organiza o atendimento; o sintoma do equipamento define o diagnóstico. Essa separação evita repetir textos programáticos e ajuda quem chega pela busca a entender o que informar antes do primeiro contato.`,
  pontosReferencia: [
    "Parque das Nascentes – Pinhais",
    "Área de atendimento prevista do CRAS Norte"
  ],
  tempoDeslocamento: "Agenda confirmada após triagem do endereço e do equipamento",
  servicosDestaque: [
    "Diagnóstico de notebook e computador",
    "Análise de lentidão e travamentos",
    "Configuração e diagnóstico de Wi-Fi",
    "Backup antes de formatação",
    "Avaliação de SSD e memória",
    "Correção de Windows e periféricos"
  ],
  conteudoExclusivo: `Como saber se o problema é do computador ou da rede

Quando a queixa é internet instável, o primeiro teste é comparar aparelhos. Se celular e notebook falham juntos, o foco pode estar no roteador ou na conexão. Se apenas um computador apresenta queda, driver, adaptador ou configuração entram na investigação. Se o problema ocorre apenas longe do roteador, cobertura passa a ser uma hipótese mais forte.

Para lentidão, fazemos o mesmo raciocínio por exclusão. Armazenamento cheio, memória insuficiente, temperatura e programas em segundo plano podem produzir sintomas parecidos. O objetivo é medir antes de trocar.

Em qualquer cenário com arquivos importantes, a proteção dos dados entra primeiro. Essa lógica torna a página útil sem recorrer a promessas ou generalizações sobre o bairro.`,
  problemasComuns: [
    "Wi-Fi cai apenas em determinados ambientes",
    "Notebook fica lento depois de algum tempo ligado",
    "Computador demora para iniciar",
    "Windows apresenta erros depois de atualização",
    "HD ou SSD com comportamento instável",
    "Máquina possui arquivos importantes sem backup"
  ],
  dicasLocais: `Ao pedir atendimento no Parque das Nascentes, informe a rua, o número e uma referência de localização. Para Wi-Fi, diga em quais cômodos o sinal funciona e onde ele falha. Para lentidão, informe se começa já na inicialização ou depois de algum tempo. Se houver arquivos importantes, avise antes de formatar ou continuar usando um disco com sinais de falha.`,
};

const ParqueNascentesPinhais = () => <BairroTemplate data={data} />;

export default ParqueNascentesPinhais;
