import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Campo Largo: Unidade de Saúde da Ferraria — Rua Isídio Cruzara, 1750, Jardim Boa Vista.
// - Prefeitura de Campo Largo: CIAC Ferraria — Avenida Mato Grosso, 8100.
// - Prefeitura de Campo Largo: CEU da Cultura da Ferraria em implantação próximo à Rua Mato Grosso.
const data = {
  nome: "Ferraria",
  slug: "ferraria",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática na Ferraria, Campo Largo | Diagnóstico",
  metaDescription: "Assistência de informática na Ferraria, Campo Largo. Diagnóstico de notebook, Wi-Fi, Windows e hardware com definição entre remoto, visita e bancada.",
  h1: "Técnico de Informática na Ferraria – Campo Largo",
  subtitulo: "Triagem para conectividade, notebook e falhas físicas antes de deslocar, formatar ou substituir componentes.",
  descricaoLonga: `A Ferraria possui referências municipais próprias em Campo Largo. A Prefeitura mantém a Unidade de Saúde da Ferraria na Rua Isídio Cruzara e o Centro Integrado de Atendimento ao Cidadão na Avenida Mato Grosso. Em 2026, o município também avançou com a implantação do CEU da Cultura na região. Essas referências ajudam a situar o atendimento com base em informação pública atual.

Nesta página, o foco técnico está em conectividade e na decisão entre suporte remoto, visita e bancada. Problemas de Windows, configuração, navegador, e-mail, impressora de rede e alguns erros de software podem começar à distância quando o computador ainda está operacional e conectado.

Quando a máquina não liga, não dá vídeo, apresenta falha de alimentação, aquecimento ou conector danificado, o atendimento precisa ser presencial ou em bancada. Em notebook, fonte, bateria, temperatura e armazenamento são analisados conforme o sintoma.

No Wi-Fi, comparamos outros dispositivos e pontos do imóvel antes de recomendar repetidor, mesh ou troca de roteador. Se apenas um notebook perde conexão, adaptador e driver ganham peso. Se todos os aparelhos apresentam instabilidade, a investigação passa para a infraestrutura.

Quando existem arquivos importantes, backup entra antes de formatação ou troca de disco. Se o armazenamento apresenta erros, insistir no uso pode aumentar o risco de perda. A página da Ferraria foi reescrita para explicar essa lógica de atendimento com conteúdo próprio e sem promessa fixa de chegada.`,
  pontosReferencia: [
    "Rua Isídio Cruzara",
    "Unidade de Saúde da Ferraria",
    "Avenida Mato Grosso",
    "CIAC Ferraria",
    "CEU da Cultura da Ferraria"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem do defeito e do endereço",
  tituloSecaoPrincipal: "Suporte remoto, visita e hardware na Ferraria",
  tituloSecaoContexto: "O sintoma define se o atendimento começa à distância ou em bancada",
  triagemResumo: "Na Ferraria, primeiro verificamos se a máquina ainda inicia, mantém conexão e permite testes remotos. Erros de software e configuração podem começar à distância; ausência de energia, vídeo, conector danificado ou aquecimento exigem avaliação física.",
  faqTitulo: "Dúvidas sobre modalidade de atendimento na Ferraria",
  faqsCustom: [
    { question: "Quando um chamado na Ferraria pode começar por suporte remoto?", answer: "Quando o computador ainda inicia, possui conexão estável e a falha está em software, configuração ou acesso. Isso permite reduzir hipóteses antes de qualquer deslocamento." },
    { question: "PC sem vídeo pode ser resolvido remotamente?", answer: "Não de forma confiável. Sem imagem, o diagnóstico depende de sinais de energia, memória, vídeo e alimentação, o que normalmente exige avaliação física." },
    { question: "Notebook sem carga deve ser tratado como problema de bateria?", answer: "Não automaticamente. Fonte, conector, bateria e circuito interno podem produzir sintomas parecidos e precisam ser separados por teste." },
    { question: "Como vocês decidem entre visita e bancada?", answer: "A decisão depende de desmontagem, tempo de teste, necessidade de medição e risco para os dados. Casos simples podem ficar no local; falhas físicas mais complexas seguem para bancada." },
  ],
  servicosDestaque: [
    "Diagnóstico de Wi-Fi e rede",
    "Triagem e suporte remoto",
    "Notebook que não liga",
    "Correção de Windows",
    "Backup e preservação de arquivos",
    "Avaliação de fonte, bateria e temperatura"
  ],
  conteudoExclusivo: `Remoto, visita ou bancada: o sintoma define o caminho

Se o computador ainda inicia e o problema está em configuração, programa ou rede, a triagem remota pode reduzir hipóteses ou resolver a falha. Se não há vídeo, energia ou existe defeito físico, o atendimento precisa mudar.

Em Wi-Fi, comparar outro dispositivo evita culpar o roteador por uma falha isolada. Em notebook sem carga, fonte, bateria e conector precisam ser separados.

Essa abordagem dá à página da Ferraria uma intenção própria voltada a conectividade e escolha da modalidade de atendimento.`,
  problemasComuns: [
    "Notebook perde conexão Wi-Fi",
    "Computador não liga",
    "PC liga sem apresentar vídeo",
    "Windows apresenta erro de configuração",
    "Roteador funciona para alguns dispositivos e falha para outros",
    "Arquivos importantes em máquina instável"
  ],
  dicasLocais: `Ao solicitar atendimento na Ferraria, informe o endereço e uma referência como a Rua Isídio Cruzara ou Avenida Mato Grosso. Diga se o computador ainda acessa a internet; isso ajuda a avaliar suporte remoto. Para máquina sem vídeo ou sem energia, informe LEDs, ventoinhas e bipes.`,
};

const FerrariaCampoLargo = () => <BairroTemplate data={data} />;

export default FerrariaCampoLargo;
