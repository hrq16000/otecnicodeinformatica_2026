import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Pinhais: USF Ana Nery — Rua Jacarezinho, 1945.
// - Prefeitura de Pinhais: Escola Felipe Zeni — Rua Corbélia, 1982.
// - Prefeitura de Pinhais: Escola Poty Lazzarotto — Rua Rolândia, 1655.
// - Prefeitura de Pinhais: Complexo Esportivo Aníbal Khury — Rua Floral, 2728.
const data = {
  nome: "Alto Tarumã",
  slug: "alto-taruma",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Alto Tarumã, Pinhais | Suporte Local",
  metaDescription: "Assistência de informática no Alto Tarumã, Pinhais. Triagem, suporte remoto quando possível e atendimento físico quando o equipamento exige testes.",
  h1: "Técnico de Informática no Alto Tarumã – Pinhais",
  subtitulo: "Atendimento técnico organizado pelo tipo de falha, com orientação antes do deslocamento e proteção dos dados.",
  descricaoLonga: `O Alto Tarumã possui referências municipais espalhadas por diferentes ruas do bairro. A USF Ana Nery fica na Rua Jacarezinho; a Escola Municipal Felipe Zeni está na Rua Corbélia; a Escola Municipal Poty Lazzarotto, na Rua Rolândia; e o Complexo Esportivo Aníbal Khury fica na Rua Floral. Para um atendimento de informática, essas referências ajudam a confirmar onde o chamado está sem criar uma falsa promessa de tempo de chegada.

A triagem começa pelo comportamento do equipamento. Um notebook que não carrega pode ter problema na fonte, bateria, conector ou circuito interno; não faz sentido começar formatando. Um desktop que liga sem imagem exige observar alimentação, memória, placa de vídeo e sinais sonoros. Já uma máquina que funciona, mas trava em tarefas pesadas, pode estar limitada por temperatura, memória ou armazenamento. Cada situação pede uma sequência distinta.

Também tratamos rede e conectividade como diagnóstico, não como venda automática de equipamento. Antes de recomendar mesh, repetidor ou novo roteador, perguntamos onde está o aparelho atual, em quais pontos a conexão cai e se a lentidão aparece por cabo. Em computadores usados para estudo, trabalho ou uso familiar, uma boa triagem evita interrupção desnecessária e reduz o risco de mexer no sistema sem backup.

Quando o defeito exige desmontagem, medição ou teste por mais tempo, a bancada pode ser a melhor opção. Quando é configuração de software ou periférico e a máquina está conectada, o suporte remoto pode ser suficiente. O objetivo desta página é explicar essa diferença e dar referências reais do Alto Tarumã, em vez de repetir um texto genérico usado em todos os bairros.`,
  pontosReferencia: [
    "Rua Jacarezinho",
    "USF Ana Nery",
    "Rua Corbélia",
    "Escola Municipal Felipe Zeni",
    "Rua Rolândia",
    "Escola Poty Lazzarotto",
    "Complexo Esportivo Aníbal Khury – Rua Floral"
  ],
  tempoDeslocamento: "Atendimento combinado após a triagem do equipamento e do endereço",
  servicosDestaque: [
    "Diagnóstico de notebook que não carrega",
    "Computador que liga sem imagem",
    "Análise de lentidão e travamentos",
    "Backup e migração de dados",
    "Configuração de rede Wi-Fi",
    "Reparo de Windows e drivers"
  ],
  conteudoExclusivo: `Roteiro técnico para não trocar peça por tentativa

No Alto Tarumã, o atendimento começa com perguntas que mudam o diagnóstico. Se um notebook não carrega, pedimos para observar LED, conector e comportamento da fonte. Se um desktop não apresenta vídeo, perguntamos se ventoinhas giram, se existem bipes e se houve alguma mudança de hardware. Se a máquina está lenta, verificamos consumo de memória, armazenamento e temperatura antes de recomendar upgrade.

Para Wi-Fi, medimos o problema pelo ambiente: uma conexão boa perto do roteador e ruim em outro ponto indica cenário diferente de internet lenta em todos os aparelhos. Para arquivos, a prioridade muda quando o disco apresenta falhas ou quando não existe backup recente.

Essa forma de trabalhar torna o conteúdo local útil: as referências do Alto Tarumã ajudam a localizar o atendimento, enquanto a parte técnica mostra o que realmente precisa ser observado antes de qualquer intervenção.`,
  problemasComuns: [
    "Notebook conectado à fonte mas sem carregar corretamente",
    "Desktop liga, porém não exibe imagem",
    "Travamentos durante aula, trabalho ou uso pesado",
    "Wi-Fi com alcance insuficiente dentro do imóvel",
    "SSD ou HD apresentando lentidão e erros",
    "Windows sem áudio, rede ou driver depois de atualização"
  ],
  dicasLocais: `Ao chamar no Alto Tarumã, envie rua, número e uma referência próxima, como a USF Ana Nery, a Escola Felipe Zeni, a Escola Poty Lazzarotto ou o Complexo Aníbal Khury. Diga também se o equipamento sofreu queda, pico de energia, atualização recente ou troca de componente; essa informação pode mudar completamente a primeira linha de diagnóstico.`,
};

const AltoTaruma = () => <BairroTemplate data={data} />;

export default AltoTaruma;
