import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de Colombo: Unidade de Saúde Atuba — Rua Ludovico Klindinger, 150.
// - Prefeitura de Colombo: serviços municipais listam atendimento próprio da US Atuba.
const data = {
  nome: "Atuba",
  slug: "atuba-colombo",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no Atuba, Colombo | Rede e Suporte",
  metaDescription: "Suporte de informática no Atuba, Colombo. Diagnóstico de rede, Wi-Fi, notebook e Windows com triagem antes da execução.",
  h1: "Técnico de Informática no Atuba – Colombo",
  subtitulo: "Triagem de conectividade e computador antes de trocar roteador, formatar ou substituir componentes.",
  descricaoLonga: `O Atuba possui referência municipal própria em Colombo. A Prefeitura mantém a Unidade de Saúde Atuba na Rua Ludovico Klindinger, o que ajuda a confirmar a localização do atendimento com base em informação pública verificável.

Nesta página, o foco técnico está em rede e conectividade. Quando o Wi-Fi cai, fica lento ou funciona apenas em alguns equipamentos, o primeiro passo é separar falha do computador de problema na infraestrutura. Se apenas um notebook perde conexão, adaptador, driver e configuração entram primeiro. Se todos os dispositivos falham ao mesmo tempo, o foco muda para roteador, cabeamento e conexão principal.

Também observamos o comportamento por ambiente. Se a conexão funciona perto do roteador e piora em outro ponto, cobertura e obstáculos ganham peso. Se a conexão por cabo também apresenta instabilidade, a causa provavelmente não está apenas no Wi-Fi. Repetidor ou mesh só fazem sentido depois dessa leitura.

Em notebook, fonte, bateria e temperatura entram quando a conectividade piora junto com queda de desempenho ou desligamento. Se o Windows ainda inicia, parte da triagem pode começar remotamente; falhas físicas, ausência de vídeo ou necessidade de desmontagem exigem visita ou bancada.

Quando existem arquivos importantes, backup entra antes de qualquer reinstalação. A página do Atuba foi reescrita para explicar esse diagnóstico de conectividade com conteúdo próprio, sem promessa fixa de chegada e sem tratar troca de roteador como solução automática.`,
  pontosReferencia: [
    "Rua Ludovico Klindinger",
    "Unidade de Saúde Atuba",
    "Atuba – Colombo"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem do problema e do endereço",
  servicosDestaque: [
    "Diagnóstico de Wi-Fi",
    "Configuração de rede",
    "Notebook com falha de conectividade",
    "Correção de Windows e drivers",
    "Backup antes de reinstalação",
    "Avaliação de hardware"
  ],
  conteudoExclusivo: `Wi-Fi ruim não significa automaticamente roteador ruim

Se apenas um computador perde conexão, a causa pode estar na máquina. Se vários dispositivos apresentam a mesma falha, a infraestrutura ganha peso. Se o problema aparece apenas longe do roteador, cobertura e posicionamento precisam ser avaliados.

Essa separação evita comprar equipamento sem necessidade e dá à página do Atuba uma função própria voltada a conectividade e diagnóstico de rede.`,
  problemasComuns: [
    "Wi-Fi cai apenas em um notebook",
    "Todos os dispositivos perdem conexão",
    "Rede funciona por cabo mas falha no Wi-Fi",
    "Windows perde configuração de rede",
    "Notebook aquece e perde desempenho",
    "Arquivos precisam de backup antes de reinstalar"
  ],
  dicasLocais: `Ao pedir atendimento no Atuba, informe o endereço e uma referência como a Rua Ludovico Klindinger ou a Unidade de Saúde Atuba. Para rede, teste outro aparelho no mesmo ponto. Se houver cabo disponível, compare a conexão por cabo com o Wi-Fi antes da triagem.`,
};

const AtubaColombo = () => <BairroTemplate data={data} />;

export default AtubaColombo;
