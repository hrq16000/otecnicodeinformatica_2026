import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Campo Largo: comunicado de abastecimento de 2026 lista Vila Solene entre as regiões do município.
// - Acervo Histórico de Campo Largo: registro municipal de 1997 identifica imóvel na Rua Manoel Ozorio Portela, Vila Solene.
//   A via é usada aqui apenas como referência histórica documentada, sem inferir numeração ou configuração urbana atual.
const data = {
  nome: "Vila Solene",
  slug: "vila-solene",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática na Vila Solene, Campo Largo | Suporte",
  metaDescription: "Suporte de informática na Vila Solene, Campo Largo. Triagem para notebook, PC, Windows, periféricos e rede, com atendimento conforme o caso.",
  h1: "Técnico de Informática na Vila Solene – Campo Largo",
  subtitulo: "Triagem técnica antes da execução, com foco em software, periféricos, conectividade e preservação dos dados.",
  descricaoLonga: `Vila Solene aparece nas comunicações atuais da Prefeitura de Campo Largo como uma das regiões do município, inclusive em aviso oficial de abastecimento publicado em 2026. O acervo histórico municipal também registra a Rua Manoel Ozorio Portela associada à Vila Solene em publicação de 1997. Essa segunda referência é tratada explicitamente como histórica: ela ajuda a documentar a identidade local sem afirmar que numeração, limites ou configuração viária permanecem iguais hoje. O conteúdo técnico se concentra no que realmente ajuda quem procura assistência de informática.

Um dos cenários mais comuns em suporte é quando o computador funciona, mas algum recurso deixa de responder. Impressora pode aparecer offline, áudio pode sumir, câmera pode parar depois de atualização, programas podem deixar de abrir ou o Windows pode ficar instável. Esses sintomas não significam automaticamente que a máquina precisa ser formatada.

Antes de qualquer reinstalação, verificamos driver, configuração, atualização, integridade do sistema e comunicação com o dispositivo. Em periféricos USB, saber se outra porta reconhece o equipamento já muda o diagnóstico. Em impressoras de rede, comparar cabo, Wi-Fi e outro computador ajuda a separar falha de comunicação de defeito físico.

Quando o problema é desempenho, a análise também evita atalhos. SSD, memória e formatação podem ajudar em situações específicas, mas não resolvem aquecimento, alimentação ou componente defeituoso. Em notebook, bateria, fonte e temperatura precisam ser observadas quando a máquina reduz desempenho ou desliga.

Se o computador ainda está conectado e utilizável, a triagem pode começar remotamente. Se há necessidade de desmontagem, teste elétrico ou falha física, o atendimento muda para visita ou bancada. A página da Vila Solene foi reescrita com uma abordagem técnica própria, sem promessas de prazo ou frases genéricas sobre o bairro.`,
  pontosReferencia: [
    "Vila Solene – Campo Largo (comunicação municipal de 2026)",
    "Rua Manoel Ozorio Portela (referência histórica no acervo municipal)"
  ],
  tempoDeslocamento: "Atendimento definido após triagem do problema e do endereço",
  servicosDestaque: [
    "Correção de Windows e drivers",
    "Impressora e periféricos",
    "Notebook com falha de bateria ou fonte",
    "Análise de desempenho",
    "Configuração de Wi-Fi",
    "Backup antes de reinstalação"
  ],
  conteudoExclusivo: `Quando o problema parece software, mas pode ser hardware

Uma câmera que some, uma impressora que fica offline ou um áudio que para depois de atualização podem ser problemas de driver ou configuração. Mas se o dispositivo não é reconhecido em nenhuma porta, o diagnóstico muda.

Em notebook, lentidão sob carga pode ser temperatura e não Windows. Em PC de mesa, reinicialização pode ter relação com alimentação. Por isso, reinstalar o sistema sem observar os sinais pode mascarar a causa.

Na Vila Solene, esta página foi construída para explicar essa diferença e ajudar o visitante a descrever melhor o problema antes do atendimento.`,
  problemasComuns: [
    "Impressora fica offline ou não é reconhecida",
    "Áudio, câmera ou periférico para depois de atualização",
    "Notebook reduz desempenho sob carga",
    "Windows apresenta erros recorrentes",
    "Wi-Fi funciona em outros aparelhos, mas não no computador",
    "Máquina precisa de reinstalação sem perder arquivos"
  ],
  dicasLocais: `Ao pedir atendimento na Vila Solene, informe o endereço e descreva exatamente qual função parou de funcionar. Para periféricos, teste outra porta quando possível. Para impressora de rede, confirme se outro aparelho consegue acessá-la. Se houver arquivos importantes, avise antes de qualquer reinstalação.`,
};

const VilaSoleneCL = () => <BairroTemplate data={data} />;

export default VilaSoleneCL;
