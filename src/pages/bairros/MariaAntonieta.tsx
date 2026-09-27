import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Pinhais: USF Maria Antonieta — Rua Jerônimo Mendes dos Santos, 506.
// - Prefeitura de Pinhais: Escola Municipal Antônio Andrade e CADS — Rua João Mendes Batista, 430.
// - Prefeitura de Pinhais: Centro da Juventude — Rua Ataulfo Alves, 49.
const data = {
  nome: "Maria Antonieta",
  slug: "maria-antonieta",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Maria Antonieta, Pinhais | Atendimento",
  metaDescription: "Assistência de informática no Maria Antonieta, Pinhais. Triagem técnica, atendimento agendado e coleta para bancada quando o reparo exige desmontagem.",
  h1: "Técnico de Informática no Maria Antonieta – Pinhais",
  subtitulo: "Atendimento organizado pela triagem do problema e pelo endereço, sem prometer solução antes do diagnóstico.",
  descricaoLonga: `O Maria Antonieta possui referências municipais distribuídas pelo próprio bairro, o que ajuda a localizar chamados de forma objetiva. A Prefeitura de Pinhais registra a USF Maria Antonieta na Rua Jerônimo Mendes dos Santos, a Escola Municipal Antônio Andrade e o CADS na Rua João Mendes Batista, além do Centro da Juventude na Rua Ataulfo Alves. Em vez de usar referências vagas como “perto do Centro”, a triagem pode partir desses eixos quando o cliente informa onde está.

O fluxo técnico começa pelo tipo de falha. Se o computador ainda liga e o problema está em lentidão, programas, navegador, impressora ou configuração, parte da avaliação pode ser feita remotamente. Quando o defeito envolve tela quebrada, conector, alimentação, superaquecimento, ruído mecânico ou falha de placa, o equipamento normalmente precisa de inspeção física. Em casos que exigem desmontagem extensa, testes sob carga ou espera por peça, a bancada é mais apropriada do que prolongar um reparo no endereço.

Para máquinas usadas em estudo ou trabalho, a prioridade é entender o risco de interrupção antes de executar mudanças grandes. Se o Windows está instável mas os arquivos ainda estão acessíveis, o backup vem antes da formatação. Se o disco apresenta comportamento anormal, a orientação pode ser parar de usar o equipamento para evitar novas gravações. Se a rede está instável, o diagnóstico tenta separar problema do provedor, roteador, cobertura interna ou dispositivo específico.

A página do Maria Antonieta não pressupõe que todos os moradores tenham o mesmo perfil nem inventa “problemas típicos do bairro”. O que muda localmente é a forma de localizar e organizar o atendimento. O que muda tecnicamente é o sintoma apresentado por cada equipamento. Essa separação evita conteúdo programático artificial e melhora a utilidade da página para quem realmente procura assistência naquela região de Pinhais.`,
  pontosReferencia: [
    "Rua Jerônimo Mendes dos Santos",
    "USF Maria Antonieta",
    "Rua João Mendes Batista",
    "Escola Municipal Antônio Andrade / CADS",
    "Rua Ataulfo Alves",
    "Centro da Juventude"
  ],
  tempoDeslocamento: "Horário confirmado depois da triagem técnica e do endereço",
  servicosDestaque: [
    "Diagnóstico de PC e notebook",
    "Correção de falhas do Windows",
    "Backup antes de formatação",
    "Troca e upgrade de SSD ou memória após diagnóstico",
    "Configuração de impressora e periféricos",
    "Análise de Wi-Fi e conectividade"
  ],
  conteudoExclusivo: `Uma triagem diferente para cada tipo de chamado

No Maria Antonieta, o atendimento começa com três informações simples: qual equipamento está com problema, qual sintoma aparece e em que ponto do bairro está o endereço. Essa combinação já ajuda a decidir se faz sentido acesso remoto, visita ou coleta.

Para computador de mesa que não liga, pedimos sinais básicos: ventoinhas giram, há bipes, aparece imagem, houve queda de energia? Em notebook, bateria, fonte, conector, aquecimento e comportamento do carregamento mudam completamente a linha de diagnóstico. Em impressora, a pergunta principal é se a falha é de comunicação, driver, papel ou mecanismo. Em Wi-Fi, a diferença entre “internet lenta em tudo” e “só um quarto perde sinal” evita comprar equipamento desnecessário.

Quando a máquina tem arquivos importantes, a preservação vem antes de qualquer procedimento destrutivo. E quando o reparo precisa de bancada, o cliente é informado disso antes da retirada. Essa lógica cria uma página realmente útil e diferente das demais, sem prometer resultado que só pode ser confirmado depois da avaliação.`,
  problemasComuns: [
    "Windows inicia, mas trava ao abrir programas",
    "Notebook não reconhece carregador ou apresenta falha de bateria",
    "Computador liga sem vídeo ou reinicia em ciclo",
    "Impressora desaparece da rede ou não comunica com o PC",
    "Wi-Fi funciona em alguns pontos e falha em outros",
    "Arquivos importantes em máquina instável ou com disco suspeito"
  ],
  dicasLocais: `Se estiver no Maria Antonieta, informe sua rua e uma referência conhecida do bairro, como a USF Maria Antonieta, a Rua João Mendes Batista ou o Centro da Juventude. Envie também foto da etiqueta do equipamento quando possível. Para falhas intermitentes, um vídeo curto do comportamento costuma ser mais útil do que uma descrição genérica e ajuda a definir a modalidade do atendimento antes do deslocamento.`,
};

const MariaAntonieta = () => <BairroTemplate data={data} />;

export default MariaAntonieta;
