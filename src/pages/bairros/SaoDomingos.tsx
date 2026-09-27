import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Secretaria Municipal de Educação: CMEI Maria Scanhusso Vidolim — Rua Pernambuco, 20, São Domingos.
// - Prefeitura de São José dos Pinhais: CRAS Francisco Quirino dos Santos — Rua Goiás, 236, São Domingos.
// - Prefeitura de São José dos Pinhais: canalização do Rio Lava Pés concluída em 2026 no trecho do bairro São Domingos até a Rua Zacarias Alves Pereira.
const data = {
  nome: "São Domingos",
  slug: "sao-domingos",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática em São Domingos, SJP | Rede e Suporte",
  metaDescription: "Suporte de informática em São Domingos, São José dos Pinhais. Diagnóstico de rede, Wi-Fi, notebook e Windows com triagem antes da visita.",
  h1: "Técnico de Informática em São Domingos – São José dos Pinhais",
  subtitulo: "Triagem de conectividade e computador para decidir entre suporte remoto, visita e bancada.",
  descricaoLonga: `São Domingos possui referências municipais atuais e específicas em São José dos Pinhais. A rede de educação mantém o CMEI Maria Scanhusso Vidolim na Rua Pernambuco, enquanto o CRAS Francisco Quirino dos Santos funciona na Rua Goiás. Em 2026, a Prefeitura também concluiu a primeira fase da canalização do Rio Lava Pés no trecho do bairro São Domingos até a Rua Zacarias Alves Pereira.

Nesta página, o foco técnico está em conectividade e na decisão entre suporte remoto e presencial. Wi-Fi instável pode ter origem no computador, no roteador, na cobertura, no cabeamento ou na conexão principal. Antes de recomendar equipamento novo, comparamos outros dispositivos e ambientes.

Se apenas um notebook perde conexão, adaptador, driver e configuração entram primeiro. Se todos os aparelhos apresentam falha, o diagnóstico passa para infraestrutura. Se a conexão por cabo funciona e o Wi-Fi não, cobertura e rádio ganham peso.

Problemas de Windows, navegador, e-mail, impressora de rede e configurações podem começar por triagem remota quando o computador ainda está operacional. Já falhas de energia, tela, conector, aquecimento ou ausência de vídeo exigem presença física ou bancada.

Em notebook, também verificamos bateria e temperatura quando a conectividade ou o desempenho pioram sob carga. Se houver arquivos importantes, backup entra antes de reinstalação. A página de São Domingos foi reescrita para orientar esse fluxo com conteúdo próprio e referências locais verificáveis.`,
  pontosReferencia: [
    "Rua Pernambuco",
    "CMEI Maria Scanhusso Vidolim",
    "Rua Goiás",
    "CRAS Francisco Quirino dos Santos",
    "Trecho municipal do Rio Lava Pés em São Domingos"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem do endereço e da falha",
  servicosDestaque: [
    "Diagnóstico de Wi-Fi",
    "Configuração de rede",
    "Suporte remoto",
    "Correção de Windows",
    "Notebook com falha de conectividade",
    "Backup antes de manutenção"
  ],
  conteudoExclusivo: `Wi-Fi ruim pode estar no computador ou fora dele

Se apenas uma máquina perde conexão, trocar o roteador pode não resolver. Driver, adaptador e configuração precisam ser testados. Se todos os aparelhos falham, a análise muda para infraestrutura e conexão principal.

Quando o computador ainda está conectado, parte do diagnóstico pode ser feita remotamente. Se não liga, não dá vídeo ou apresenta falha física, o atendimento precisa ser presencial.

Essa separação dá à página de São Domingos uma função própria voltada a conectividade e escolha da modalidade de atendimento.`,
  problemasComuns: [
    "Wi-Fi cai apenas em um notebook",
    "Todos os dispositivos perdem conexão",
    "Impressora de rede fica offline",
    "Windows perde configuração de rede",
    "Notebook aquece e perde desempenho",
    "Arquivos precisam de backup antes de reinstalar"
  ],
  dicasLocais: `Ao solicitar atendimento em São Domingos, informe o endereço e uma referência como a Rua Goiás, o CRAS ou o CMEI da Rua Pernambuco. Para rede, teste outro aparelho no mesmo ponto; para notebook, informe se o problema aparece sob carga; para Windows, envie a mensagem de erro.`,
};

const SaoDomingos = () => <BairroTemplate data={data} />;

export default SaoDomingos;
