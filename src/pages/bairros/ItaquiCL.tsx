import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Campo Largo: o bairro Itaqui mantém unidade do programa municipal Casa ECO.
// - Prefeitura de Campo Largo: acessos e intervenções viárias recentes citam a saída para o bairro Itaqui.
const data = {
  nome: "Itaqui",
  slug: "itaqui",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática no Itaqui, Campo Largo | Diagnóstico",
  metaDescription: "Assistência de informática no Itaqui, Campo Largo. Triagem para PC, notebook, Wi-Fi, impressora e arquivos, com atendimento conforme o defeito.",
  h1: "Técnico de Informática no Itaqui – Campo Largo",
  subtitulo: "Diagnóstico antes da solução, com definição clara entre suporte remoto, visita e bancada.",
  descricaoLonga: `O Itaqui é citado atualmente pela Prefeitura de Campo Largo como bairro do município e conta com unidade do programa Casa ECO. A região também aparece em comunicações recentes sobre acessos viários. Essas referências são suficientes para validar a localidade sem inventar equipamentos públicos, ruas específicas ou características comerciais que não estejam confirmadas.

No atendimento técnico, o primeiro passo é entender se a falha está no computador, no sistema ou na rede. Um PC que não liga exige verificar alimentação e componentes. Uma máquina que inicia, mas fica lenta, pede análise de armazenamento, memória, temperatura e programas. Um notebook que perde conexão pode ter problema no adaptador, no driver ou apenas na cobertura Wi-Fi.

Quando a queixa envolve rede, não recomendamos equipamento novo antes de comparar aparelhos e ambientes. Se todos os dispositivos falham ao mesmo tempo, o problema pode estar no roteador ou na conexão. Se apenas um notebook apresenta queda, a investigação muda para o próprio equipamento. Essa distinção evita comprar repetidor, mesh ou roteador sem necessidade.

Em computadores com arquivos importantes, backup entra antes de formatação ou troca de disco. Se o armazenamento apresenta erros, lentidão extrema ou desaparece do sistema, insistir no uso pode aumentar o risco de perda. Nesses casos, a prioridade passa a ser preservar os dados e avaliar o estado do dispositivo.

Se a máquina continua operacional, alguns testes podem começar remotamente. Falhas físicas, superaquecimento, conector, tela ou ausência de vídeo normalmente exigem avaliação presencial ou bancada. A página do Itaqui foi reescrita para explicar esse fluxo de forma própria e útil, sem repetir o antigo texto programático.`,
  pontosReferencia: [
    "Itaqui – Campo Largo",
    "Unidade municipal Casa ECO no Itaqui"
  ],
  tempoDeslocamento: "Horário confirmado após triagem e localização",
  servicosDestaque: [
    "Diagnóstico de computador que não liga",
    "Análise de lentidão e travamentos",
    "Configuração de Wi-Fi",
    "Impressora e periféricos",
    "Backup e recuperação de arquivos",
    "Avaliação de SSD e memória"
  ],
  conteudoExclusivo: `Rede lenta ou computador com problema: como separar

Quando apenas um equipamento fica sem internet, a causa pode estar no próprio computador. Quando todos os aparelhos apresentam falha, o foco muda para roteador ou conexão. Esse teste simples reduz bastante as hipóteses.

Para lentidão, a lógica é semelhante: verificamos armazenamento, memória, temperatura e sistema antes de indicar upgrade. Em falhas de inicialização, alimentação e componentes físicos entram antes de qualquer formatação.

No Itaqui, a página usa a localização para organizar o atendimento, mas mantém o diagnóstico baseado no comportamento real do equipamento.`,
  problemasComuns: [
    "Computador não liga ou liga sem imagem",
    "Notebook perde conexão Wi-Fi",
    "PC fica lento depois de algum tempo",
    "Impressora some da rede",
    "HD ou SSD apresenta erros",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao pedir atendimento no Itaqui, informe endereço e uma referência local confiável. Para rede, teste se outros aparelhos apresentam a mesma falha. Para computador que não liga, informe se existem LEDs, ventoinhas ou bipes. Se houver arquivos importantes, evite formatar antes da triagem.`,
};

const ItaquiCL = () => <BairroTemplate data={data} />;

export default ItaquiCL;
