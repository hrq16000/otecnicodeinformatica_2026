import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de Colombo: Embú consta na lista oficial de bairros urbanos.
// - SEMAS: Vivencial do Bosque — Rua do Juazeiro, 328, Parque Embú.
// - Prefeitura de Colombo: obras recentes na Rua das Oliveiras e pavimentações nas ruas do Cedro e da Imbuia, Parque Embú.
const data = {
  nome: "Parque Embú",
  slug: "embu-colombo",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no Parque Embú, Colombo | Rede e Suporte",
  metaDescription: "Suporte de informática no Parque Embú, Colombo. Diagnóstico de Wi-Fi, rede cabeada, notebook e Windows com triagem antes da visita.",
  h1: "Técnico de Informática no Parque Embú – Colombo",
  subtitulo: "Diagnóstico de conectividade e computador para decidir o que pode ser remoto e o que exige visita ou bancada.",
  descricaoLonga: `O Embú aparece na lista oficial de bairros urbanos de Colombo e a Prefeitura utiliza a denominação Parque Embú em equipamentos e obras públicas. A Secretaria de Assistência Social mantém o Vivencial do Bosque na Rua do Juazeiro, e intervenções recentes de infraestrutura ocorreram na Rua das Oliveiras, além das ruas do Cedro e da Imbuia. Essas referências dão base local objetiva à página.

Nesta rota, o foco técnico está em conectividade e na separação entre falha de rede e falha do computador. Quando apenas um notebook perde acesso, driver, adaptador, configuração de energia ou sistema podem estar envolvidos. Quando vários dispositivos apresentam instabilidade ao mesmo tempo, a investigação passa para roteador, cabeamento, cobertura e conexão principal.

Antes de recomendar repetidor, mesh ou troca de roteador, verificamos onde a falha acontece e se a conexão por cabo permanece estável. Um sinal fraco em determinada área pede análise de cobertura; uma conexão lenta mesmo por cabo aponta para outro caminho.

Se o computador continua conectado, problemas de configuração, Windows, navegador e alguns periféricos podem começar por suporte remoto. Quando a máquina não liga, não dá vídeo, apresenta conector danificado, aquecimento ou precisa de desmontagem, a visita ou a bancada é mais adequada.

Em qualquer intervenção que possa afetar arquivos, a existência de backup é confirmada antes. A página do Parque Embú foi reescrita para explicar essa decisão entre rede, estação e modalidade de atendimento com conteúdo próprio e sem promessas genéricas de deslocamento.`,
  pontosReferencia: [
    "Rua do Juazeiro",
    "Vivencial do Bosque",
    "Rua das Oliveiras",
    "Rua do Cedro",
    "Rua da Imbuia",
    "Parque Embú – Colombo"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem da rede, do equipamento e do endereço",
  servicosDestaque: [
    "Diagnóstico de Wi-Fi",
    "Configuração de rede cabeada",
    "Triagem e suporte remoto",
    "Notebook com perda de conexão",
    "Correção de Windows e drivers",
    "Backup antes de manutenção"
  ],
  conteudoExclusivo: `Quando a internet falha, primeiro separamos rede de computador

Se apenas uma máquina perde conexão, trocar o roteador pode não resolver. Driver, adaptador e configuração precisam ser testados. Se todos os dispositivos falham, o foco muda para infraestrutura e conexão principal.

Testar cabo também ajuda: se a rede cabeada funciona e o Wi-Fi não, cobertura ou rádio ganham peso. Se ambos falham, o diagnóstico precisa olhar além do sinal sem fio.

Essa lógica dá à página do Parque Embú uma intenção própria voltada a conectividade e escolha da modalidade de atendimento.`,
  problemasComuns: [
    "Wi-Fi cai apenas em um notebook",
    "Todos os dispositivos perdem conexão",
    "Rede por cabo funciona e Wi-Fi falha",
    "Windows perde configuração de rede",
    "Notebook aquece ou reinicia durante uso",
    "Arquivos precisam de backup antes de manutenção"
  ],
  dicasLocais: `Ao pedir atendimento no Parque Embú, informe o endereço e uma referência como a Rua do Juazeiro, Rua das Oliveiras, Rua do Cedro ou Rua da Imbuia. Para rede, teste outro dispositivo e, se possível, uma conexão por cabo. Isso ajuda a separar cobertura de falha no computador.`,
};

const EmbuColombo = () => <BairroTemplate data={data} />;

export default EmbuColombo;
