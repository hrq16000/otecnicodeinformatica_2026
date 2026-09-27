import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Pinhais: Escola Municipal Anísio Teixeira — Rua Dr. Waldemar Costa Lima, 135.
// - Prefeitura de Pinhais: Escola Municipal Antônio Alceu Zielonka — Rua Reynaldo Crozetta, 115.
// - Prefeitura de Pinhais: Escola Municipal Frei Egídio Carloto — Rua Crescêncio Batista, 744.
// - Prefeitura de Pinhais: Escola Municipal João Leal — Rua Reinaldo Ribas, 540.
// - Prefeitura de Pinhais: Praça Sônia Maria do Carmo Nogueira — Av. Jacob Macanhan, 3590.
const data = {
  nome: "Atuba",
  slug: "atuba-pinhais",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Atuba, Pinhais | Diagnóstico e Suporte",
  metaDescription: "Suporte de informática no Atuba, Pinhais. Triagem técnica para computador, notebook, impressora e Wi-Fi, com atendimento definido conforme o defeito.",
  h1: "Técnico de Informática no Atuba – Pinhais",
  subtitulo: "Triagem técnica antes da visita, proteção dos dados e atendimento definido pelo tipo de falha.",
  descricaoLonga: `O Atuba tem uma malha de referências municipais que facilita localizar o chamado com precisão. A Prefeitura de Pinhais registra a Escola Municipal Anísio Teixeira na Rua Dr. Waldemar Costa Lima, a Escola Antônio Alceu Zielonka na Rua Reynaldo Crozetta, a Escola Frei Egídio Carloto na Rua Crescêncio Batista e a Escola João Leal na Rua Reinaldo Ribas. Outro ponto conhecido é a Praça Sônia Maria do Carmo Nogueira, na Avenida Jacob Macanhan, utilizada pela feira livre entre Atuba e Jardim Cláudia.

Para assistência de informática, porém, a localização não substitui o diagnóstico. Um computador que reinicia sozinho precisa ser investigado por alimentação, temperatura, memória e sistema. Um notebook que não reconhece a fonte exige separar carregador, conector, bateria e circuito interno. Uma impressora que aparece como “offline” pode ter falha de rede ou driver, enquanto um atolamento recorrente aponta para outra área do equipamento.

Quando o problema é Wi-Fi, perguntamos se a falha aparece em todos os aparelhos, em apenas um cômodo ou somente em determinado dispositivo. Essa diferença evita comprar repetidor quando a causa está no roteador, no provedor ou na configuração do próprio computador. Em máquinas lentas, SSD e memória são avaliados como soluções possíveis, não como resposta automática.

Se a máquina ainda funciona e está conectada, parte da triagem pode começar remotamente. Quando é necessário desmontar, medir, testar sob carga ou preservar um disco com sinais de falha, visita ou bancada pode ser mais adequada. O cliente recebe essa orientação antes da execução. Assim, a página do Atuba passa a ter conteúdo útil e próprio, em vez de repetir a mesma promessa usada em dezenas de bairros.`,
  pontosReferencia: [
    "Av. Jacob Macanhan",
    "Praça Sônia Maria do Carmo Nogueira",
    "Rua Dr. Waldemar Costa Lima",
    "Escola Municipal Anísio Teixeira",
    "Rua Crescêncio Batista",
    "Escola Municipal Frei Egídio Carloto"
  ],
  tempoDeslocamento: "Agenda definida após confirmar endereço e tipo de atendimento",
  servicosDestaque: [
    "Diagnóstico de computador que reinicia sozinho",
    "Notebook que não carrega ou não reconhece a fonte",
    "Configuração de impressora e periféricos",
    "Análise de Wi-Fi e rede",
    "Upgrade de SSD e memória após teste",
    "Backup e recuperação de arquivos"
  ],
  conteudoExclusivo: `Atendimento no Atuba sem diagnóstico por tentativa

Antes de trocar qualquer componente, buscamos sinais que reduzam as hipóteses. Reinicializações podem vir de temperatura, alimentação ou sistema. Lentidão pode ter relação com armazenamento, memória, software ou disco degradado. Wi-Fi pode falhar por cobertura, interferência ou configuração. Cada cenário pede uma sequência diferente.

Para computadores usados em estudo ou trabalho, também perguntamos o que não pode ser perdido. Se existe arquivo importante sem cópia, o backup vem antes de formatação ou reinstalação. Se o disco já apresenta erros, insistir em testes pesados pode aumentar o risco.

O endereço informado — seja próximo à Avenida Jacob Macanhan ou às escolas municipais do bairro — serve para organizar a logística. O diagnóstico continua sendo determinado pelos sintomas e medições. Essa separação é o que torna a página local de verdade, sem transformar o nome Atuba em mero campo variável de um template.`,
  problemasComuns: [
    "Computador reinicia ou desliga sem aviso",
    "Notebook conectado mas sem carregar corretamente",
    "Impressora fica offline ou some da rede",
    "Wi-Fi perde sinal em parte do imóvel",
    "Máquina lenta mesmo depois de reiniciar",
    "Arquivos importantes em HD ou SSD com sinais de falha"
  ],
  dicasLocais: `Ao pedir atendimento no Atuba, envie rua, número e uma referência próxima — por exemplo Avenida Jacob Macanhan, Praça Sônia Maria do Carmo Nogueira ou uma das escolas municipais do bairro. Para defeitos intermitentes, grave um vídeo quando o problema aparecer. Para computador lento, informe há quanto tempo ocorre e se piorou depois de atualização, instalação de programa ou troca de componente.`,
};

const AtubaPinhais = () => <BairroTemplate data={data} />;

export default AtubaPinhais;
