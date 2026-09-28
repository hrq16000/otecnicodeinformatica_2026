import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de Colombo: US Atuba — Rua Ludovico Klindinger, 150.
// - Prefeitura de Colombo: US Atuba segue ativa nas ações municipais de saúde de 2025/2026.
const data = {
  nome: "Atuba",
  slug: "atuba-colombo",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no Atuba, Colombo | Wi-Fi e Suporte",
  metaDescription: "Assistência de informática no Atuba, Colombo. Diagnóstico de Wi-Fi, impressora, Windows e notebook com triagem antes da visita.",
  h1: "Técnico de Informática no Atuba – Colombo",
  subtitulo: "Diagnóstico de rede, periféricos e notebook antes de recomendar equipamento novo ou formatar.",
  descricaoLonga: `O Atuba possui referência municipal própria em Colombo. A Prefeitura mantém a Unidade de Saúde Atuba na Rua Ludovico Klindinger e a unidade segue presente nas ações atuais da rede municipal de saúde. Essa referência permite confirmar a localidade sem depender de pontos comerciais ou descrições genéricas.

Nesta página, o foco técnico está em rede, Wi-Fi e periféricos. Quando a internet funciona em alguns aparelhos e falha em apenas um notebook, a causa pode estar em driver, adaptador ou configuração. Se todos os dispositivos apresentam instabilidade, o diagnóstico muda para roteador, cobertura, cabeamento ou conexão principal.

Antes de indicar repetidor, mesh ou troca de roteador, comparamos comportamento por dispositivo e ambiente. Se a conexão por cabo está normal e o Wi-Fi falha somente em uma área, cobertura passa a ser uma hipótese mais forte. Se o cabo também apresenta problema, a investigação precisa olhar para a infraestrutura ou para o provedor.

Impressoras e outros periféricos seguem a mesma lógica. Se o dispositivo aparece no Windows, driver, fila e comunicação entram primeiro. Se não é reconhecido em nenhuma porta ou computador, hardware ganha peso.

Em notebook, temperatura, bateria e armazenamento também são avaliados quando a máquina perde desempenho. Se existem arquivos importantes, backup vem antes de reinstalação. A página do Atuba foi reescrita para oferecer uma orientação própria sobre conectividade e periféricos, sem prometer solução ou prazo antes da triagem.`,
  pontosReferencia: [
    "Rua Ludovico Klindinger",
    "US Atuba",
    "Atuba – Colombo"
  ],
  tempoDeslocamento: "Agenda definida após triagem da rede, do equipamento e do endereço",
  servicosDestaque: [
    "Diagnóstico de Wi-Fi",
    "Configuração de rede",
    "Impressora e periféricos",
    "Correção de drivers",
    "Notebook com falha de conectividade",
    "Backup antes de reinstalação"
  ],
  conteudoExclusivo: `Wi-Fi ruim pode estar no computador, não no roteador

Se apenas um notebook perde conexão, trocar o roteador pode não resolver. Driver, adaptador e configuração precisam ser testados. Se todos os aparelhos falham, a investigação passa para cobertura e infraestrutura.

Em impressoras, testar outro computador e outra conexão ajuda a separar software de hardware.

Essa lógica dá à página do Atuba uma intenção própria voltada a rede, Wi-Fi e periféricos.`,
  problemasComuns: [
    "Wi-Fi cai apenas em um notebook",
    "Todos os dispositivos perdem conexão",
    "Impressora fica offline",
    "Windows perde configuração de rede",
    "Notebook aquece e perde desempenho",
    "Arquivos precisam de backup antes de reinstalar"
  ],
  dicasLocais: `Ao pedir atendimento no Atuba, informe o endereço e uma referência como a US Atuba ou a Rua Ludovico Klindinger. Para rede, teste outro dispositivo no mesmo ponto; para impressora, tente outro computador quando possível; para notebook, informe se a falha aparece sob carga.`,
};

const AtubaColombo = () => <BairroTemplate data={data} />;

export default AtubaColombo;
