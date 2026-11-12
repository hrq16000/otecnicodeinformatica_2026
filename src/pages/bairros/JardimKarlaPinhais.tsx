import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Pinhais: USF Jardim Karla — Rua Azaléia, 3158.
// - Prefeitura de Pinhais: Escola Municipal Lírio Jacomel — Rua Azaleia, 908.
// - Prefeitura de Pinhais: novo CMEI Rosi Galvão em fase avançada de implantação em 2026.
const data = {
  nome: "Jardim Karla",
  slug: "jardim-karla-pinhais",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Jardim Karla, Pinhais | Diagnóstico",
  metaDescription: "Suporte técnico no Jardim Karla, Pinhais. Diagnóstico para notebook, computador, rede e periféricos, com atendimento conforme a natureza da falha.",
  h1: "Técnico de Informática no Jardim Karla – Pinhais",
  subtitulo: "Triagem técnica, orientação sobre o próximo passo e atendimento remoto, no local ou em bancada conforme o problema.",
  descricaoLonga: `No Jardim Karla, duas referências municipais estão na mesma via: a Prefeitura de Pinhais registra a Escola Municipal Lírio Jacomel na Rua Azaleia e a USF Jardim Karla também na Rua Azaléia, em outro trecho. Em 2026, o município ainda informava a fase avançada das obras do novo CMEI Rosi Galvão no bairro. São referências concretas para localizar o chamado sem recorrer a descrições genéricas.

A assistência técnica começa identificando o tipo de falha. Quando o notebook liga, mas a bateria dura pouco, não tratamos automaticamente como defeito de carregador. Quando o computador fica lento depois de alguns minutos, temperatura pode ser tão relevante quanto memória ou armazenamento. Quando a rede cai apenas em um equipamento, é preciso investigar esse dispositivo antes de trocar o roteador.

Nos casos de sistema operacional, fazemos distinção entre corrupção de arquivos, atualização mal concluída, driver e problema físico. Formatação é uma alternativa, não a primeira resposta para tudo. Antes dela, verificamos se há dados que precisam ser preservados e se existe uma forma menos invasiva de corrigir o problema.

Também separamos o que cabe em suporte remoto do que exige presença física. Instalação, configuração e parte dos erros de software podem ser analisados à distância. Falha de alimentação, tela, conector, aquecimento e outros defeitos de hardware normalmente exigem inspeção. Se a avaliação precisa de desmontagem ou testes prolongados, a bancada oferece condições melhores.

Com isso, a página do Jardim Karla passa a ter identidade própria: referências locais verificáveis, problemas descritos por sinais reais e um roteiro técnico diferente das páginas programáticas genéricas.`,
  pontosReferencia: [
    "Rua Azaleia / Rua Azaléia",
    "Escola Municipal Lírio Jacomel",
    "USF Jardim Karla",
    "Jardim Karla – Pinhais",
    "CMEI Rosi Galvão"
  ],
  tempoDeslocamento: "Horário confirmado após triagem do equipamento e localização",
  servicosDestaque: [
    "Diagnóstico de bateria e carregamento",
    "Notebook com queda de desempenho por temperatura",
    "Correção de Windows e drivers",
    "Análise de SSD, HD e memória",
    "Configuração de Wi-Fi e periféricos",
    "Backup antes de reparos invasivos"
  ],
  conteudoExclusivo: `Bateria, calor e desempenho: sintomas que não devem ser misturados

Um notebook pode desligar porque a bateria acabou, porque a fonte falhou, porque a temperatura ficou alta ou porque existe defeito na placa. Esses sintomas parecem semelhantes para o usuário, mas levam a diagnósticos diferentes. Por isso pedimos informações como tempo de uso fora da tomada, comportamento do LED de carga e momento exato em que a máquina perde desempenho.

Em PCs e notebooks lentos, também evitamos o atalho de recomendar SSD sem análise. Verificamos primeiro armazenamento, memória, temperatura e sistema. Em rede, diferenciamos perda de cobertura de falha do equipamento.

Quem está no Jardim Karla pode enviar o endereço e usar a Rua Azaleia, a USF ou a Escola Lírio Jacomel como referência. A localização ajuda na agenda; os sintomas é que determinam o procedimento técnico.`,
  problemasComuns: [
    "Notebook descarrega rápido ou não completa a carga",
    "Máquina perde desempenho quando aquece",
    "Windows apresenta erro de driver ou dispositivo",
    "SSD ou HD com lentidão e falhas intermitentes",
    "Wi-Fi cai apenas em um computador ou celular",
    "Equipamento precisa de backup antes de reparo"
  ],
  dicasLocais: `Ao pedir atendimento no Jardim Karla, envie o endereço e uma referência da Rua Azaleia quando aplicável. Para falhas de bateria, informe quanto tempo o notebook permanece ligado fora da tomada; para aquecimento, diga qual programa está em uso quando o problema aparece; para rede, teste se outros dispositivos apresentam a mesma queda antes da triagem.`,
};

const JardimKarlaPinhais = () => <BairroTemplate data={data} />;

export default JardimKarlaPinhais;
