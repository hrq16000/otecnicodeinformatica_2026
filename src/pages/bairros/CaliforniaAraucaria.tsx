import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Araucária: UBS Califórnia — Rua Tesoureiro, 1957, Jardim Califórnia / Capela Velha.
// - Registros municipais anteriores também identificam a UBSF Califórnia na região.
const data = {
  nome: "Jardim Califórnia",
  slug: "california-araucaria",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Jardim Califórnia, Araucária | Diagnóstico",
  metaDescription: "Assistência de informática no Jardim Califórnia, Araucária. Triagem para notebook, bateria, fonte, Wi-Fi e Windows com atendimento conforme o caso.",
  h1: "Técnico de Informática no Jardim Califórnia – Araucária",
  subtitulo: "Diagnóstico de notebook e conectividade antes de trocar peças ou formatar.",
  descricaoLonga: `O Jardim Califórnia aparece nas estruturas municipais de Araucária e conta com UBS Califórnia na Rua Tesoureiro. A referência oficial é suficiente para situar o atendimento sem inventar características comerciais ou promessas de deslocamento.

Nesta página, o foco técnico está em notebooks, alimentação e conectividade. Um notebook que não carrega pode ter problema na fonte, bateria, conector ou circuito interno. Um equipamento que desliga quando sai da tomada pode indicar desgaste da bateria, enquanto perda de desempenho durante uso pesado pode estar ligada a temperatura ou energia.

Antes de trocar bateria ou fonte, observamos LEDs, comportamento do carregamento, autonomia e estabilidade. Se o sistema ainda inicia, também verificamos temperatura, memória e armazenamento. Se há conector frouxo, aquecimento anormal ou falha física, a avaliação precisa ser presencial ou em bancada.

Em Wi-Fi, a triagem compara outros aparelhos e pontos do imóvel. Se apenas o notebook falha, driver, adaptador ou configuração entram na análise. Se todos os dispositivos apresentam instabilidade, o foco muda para roteador, cobertura e conexão principal.

Formatação não é usada como resposta automática. Quando há arquivos importantes, backup é discutido antes. Quando o problema é de hardware, reinstalar o sistema não resolve. A página do Jardim Califórnia foi criada para explicar essas diferenças e oferecer conteúdo técnico próprio.`,
  pontosReferencia: [
    "Rua Tesoureiro",
    "UBS Califórnia",
    "Jardim Califórnia – Araucária",
    "Capela Velha"
  ],
  tempoDeslocamento: "Horário confirmado após triagem do notebook e localização",
  servicosDestaque: [
    "Notebook que não carrega",
    "Diagnóstico de bateria e fonte",
    "Análise de aquecimento",
    "Configuração de Wi-Fi",
    "Correção de Windows",
    "Backup antes de reparo"
  ],
  conteudoExclusivo: `Bateria, fonte e conector podem produzir sintomas parecidos

Quando o notebook não carrega, trocar a bateria sem testar a alimentação pode não resolver. Fonte com queda de tensão, conector intermitente e circuito interno também podem causar o mesmo sintoma.

Se a autonomia caiu, verificamos comportamento fora da tomada. Se a máquina perde desempenho quando aquece, temperatura entra no diagnóstico. Se a falha aparece apenas no Wi-Fi, comparamos o notebook com outros dispositivos.

Essa separação evita troca de peça por tentativa e dá à página do Jardim Califórnia uma função própria.`,
  problemasComuns: [
    "Notebook não carrega",
    "Bateria dura muito pouco",
    "Conector de energia falha",
    "Máquina perde desempenho quando aquece",
    "Wi-Fi cai apenas no notebook",
    "Windows apresenta erros de driver"
  ],
  dicasLocais: `Ao solicitar atendimento no Jardim Califórnia, informe o endereço e uma referência como a UBS Califórnia ou a Rua Tesoureiro. Para falha de carga, diga se os LEDs acendem e se outra fonte já foi testada. Para Wi-Fi, confirme se outros aparelhos funcionam normalmente.`,
};

const CaliforniaAraucaria = () => <BairroTemplate data={data} />;

export default CaliforniaAraucaria;
