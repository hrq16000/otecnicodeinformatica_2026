import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Campo Largo: Unidade de Saúde Três Córregos — Três Córregos, s/n.
// - Prefeitura de Campo Largo: Três Córregos integra o cronograma municipal de atualização cadastral em saúde.
const data = {
  nome: "Três Córregos",
  slug: "tres-corregos",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática em Três Córregos, Campo Largo | Diagnóstico",
  metaDescription: "Assistência de informática em Três Córregos, Campo Largo. Triagem para PC, notebook, rede e armazenamento, com atendimento conforme o caso.",
  h1: "Técnico de Informática em Três Córregos – Campo Largo",
  subtitulo: "Diagnóstico orientado pelo sintoma, com cuidado especial para armazenamento, inicialização e conectividade.",
  descricaoLonga: `Três Córregos é reconhecido oficialmente pela Prefeitura de Campo Largo e conta com unidade de saúde municipal própria. O bairro também aparece no cronograma de ações de atualização cadastral do município. A página usa essa referência para validar a localidade, mas evita extrapolar características que não estejam comprovadas.

No atendimento técnico, o foco desta rota é explicar como problemas de inicialização e armazenamento são separados. Um computador que demora para ligar pode ter excesso de programas, disco degradado ou atualização mal concluída. Uma máquina que não encontra o sistema pode ter falha de boot, armazenamento ou configuração. Um HD ou SSD que desaparece de forma intermitente exige cautela antes de qualquer reinstalação.

Quando há arquivos importantes, a primeira decisão pode ser interromper tentativas de uso e avaliar a preservação dos dados. Formatar uma máquina com disco instável pode piorar o cenário. Em casos menos críticos, verificamos saúde do armazenamento, espaço livre, memória e eventos do sistema para decidir se a correção pode ser feita por software.

Na rede, também evitamos diagnóstico por suposição. Se a conexão falha apenas em um equipamento, investigamos adaptador, driver e configuração. Se vários aparelhos sofrem ao mesmo tempo, o caminho passa por roteador e conexão principal.

Se o equipamento ainda funciona, a triagem pode começar remotamente. Se não inicia, apresenta falha física ou precisa de desmontagem, o atendimento passa para visita ou bancada. A página de Três Córregos deixa esse fluxo claro e elimina o antigo conteúdo genérico repetido em várias localidades.`,
  pontosReferencia: [
    "Unidade de Saúde Três Córregos",
    "Três Córregos – Campo Largo"
  ],
  tempoDeslocamento: "Atendimento programado após triagem e confirmação da localização",
  servicosDestaque: [
    "Diagnóstico de falha de inicialização",
    "Análise de HD e SSD",
    "Backup e recuperação de arquivos",
    "Correção de boot e Windows",
    "Diagnóstico de rede",
    "Avaliação de memória e desempenho"
  ],
  conteudoExclusivo: `Armazenamento instável pede cautela antes de formatar

Quando um HD ou SSD desaparece do sistema, trava ao copiar arquivos ou apresenta erros recorrentes, a prioridade muda. Em vez de insistir na inicialização, primeiro avaliamos o risco para os dados. Reinstalar o Windows não corrige falha física no armazenamento.

Se o problema está apenas no boot, a investigação pode seguir por configuração e arquivos do sistema. Se o disco está saudável, a correção pode ser menos invasiva. Se não está, backup ou recuperação passa a ser mais importante.

Essa diferença é central no atendimento de Três Córregos e torna a página tecnicamente útil, em vez de apenas listar serviços.`,
  problemasComuns: [
    "Computador demora muito para iniciar",
    "Sistema não encontra o disco de inicialização",
    "HD ou SSD desaparece ou apresenta erros",
    "Arquivos travam durante cópia",
    "Wi-Fi falha somente em um equipamento",
    "Windows entra em reparo automático"
  ],
  dicasLocais: `Ao pedir atendimento em Três Córregos, informe endereço e referência local. Se o computador não encontra o disco ou trava ao copiar arquivos, evite novas instalações e formatações antes da triagem. Para erro de inicialização, envie foto da mensagem ou tela exibida.`,
};

const TresCorregosCL = () => <BairroTemplate data={data} />;

export default TresCorregosCL;
