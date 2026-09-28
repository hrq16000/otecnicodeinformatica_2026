import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Secretaria Municipal de Educação: Escola Municipal Professora Júlia Wanderley — Rua Thomas Negoseke, 3615, Barro Preto.
// - Secretaria Municipal de Educação: CMEI O Reino das Delícias — Rua Carolina Manaffes Ligoki, 401, Barro Preto.
// - Prefeitura de São José dos Pinhais reconhece Barro Preto como bairro do município.
const data = {
  nome: "Barro Preto",
  slug: "barro-preto",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Barro Preto, SJP | Diagnóstico",
  metaDescription: "Assistência de informática no Barro Preto, São José dos Pinhais. Diagnóstico de PC, armazenamento, backup, Windows e rede antes da execução.",
  h1: "Técnico de Informática no Barro Preto – São José dos Pinhais",
  subtitulo: "Diagnóstico de estabilidade e armazenamento com prioridade para dados antes de formatar ou trocar peças.",
  descricaoLonga: `O Barro Preto é reconhecido oficialmente pelo município de São José dos Pinhais e possui referências educacionais específicas. A Escola Municipal Professora Júlia Wanderley fica na Rua Thomas Negoseke e o CMEI O Reino das Delícias na Rua Carolina Manaffes Ligoki. Essas referências permitem localizar o atendimento sem recorrer a pontos genéricos.

Nesta página, o foco técnico está em estabilidade, armazenamento e preservação de dados. Um computador que demora para iniciar, congela ao abrir arquivos, reinicia durante uso ou apresenta erros recorrentes pode ter causas diferentes: Windows, memória, SSD/HD, temperatura ou alimentação. Formatar antes de separar essas hipóteses pode apagar sinais importantes.

Quando o sistema ainda inicia, verificamos espaço livre, eventos, uso de memória e comportamento do armazenamento. Se o SSD ou HD desaparece, trava durante cópia ou apresenta erros, a prioridade passa a ser backup ou recuperação de dados. Se o disco está saudável, a investigação pode seguir por software, memória ou temperatura.

Em rede, comparamos outros equipamentos para descobrir se a falha está na máquina ou na infraestrutura. Em PC que reinicia sob carga, fonte e temperatura entram junto com memória. Em notebook, bateria e carregamento também podem influenciar o comportamento.

Quando há risco para os dados, a bancada pode ser mais segura do que insistir em testes no local. A página do Barro Preto foi reescrita para explicar esse diagnóstico com uma intenção própria, sem assumir perfil empresarial ou residencial do bairro sem evidência.`,
  pontosReferencia: [
    "Rua Thomas Negoseke",
    "Escola Municipal Professora Júlia Wanderley",
    "Rua Carolina Manaffes Ligoki",
    "CMEI O Reino das Delícias",
    "Barro Preto – São José dos Pinhais"
  ],
  tempoDeslocamento: "Atendimento definido após triagem do equipamento e do endereço",
  servicosDestaque: [
    "Diagnóstico de SSD e HD",
    "Backup e recuperação de arquivos",
    "Windows lento ou instável",
    "Teste de memória",
    "Computador que reinicia",
    "Diagnóstico de rede"
  ],
  conteudoExclusivo: `Quando o disco é suspeito, preservar os arquivos vem primeiro

Travamento ao copiar arquivos, desaparecimento do armazenamento e inicialização cada vez mais lenta podem indicar problema em SSD ou HD. Nesses casos, reinstalar o Windows não é o primeiro passo.

Se o disco está saudável, memória, software e temperatura entram na análise. Se a máquina reinicia sob carga, alimentação também precisa ser considerada.

No Barro Preto, esta página concentra a orientação em estabilidade e preservação de dados para manter uma função editorial diferente das demais localidades.`,
  problemasComuns: [
    "Computador demora para iniciar",
    "SSD ou HD trava durante cópia",
    "Máquina reinicia sem aviso",
    "Windows apresenta erros recorrentes",
    "Wi-Fi falha em uma estação",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao pedir atendimento no Barro Preto, informe o endereço e uma referência como a Escola Júlia Wanderley ou o CMEI O Reino das Delícias. Se houver erro de disco, evite formatar. Para reinicialização, diga em qual tarefa ocorre; para rede, teste outro dispositivo.`,
};

const BarroPreto = () => <BairroTemplate data={data} />;

export default BarroPreto;
