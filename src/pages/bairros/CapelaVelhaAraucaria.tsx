import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Araucária: Capela Velha é bairro formal no Plano Diretor.
// - WebGeo municipal: consultas urbanísticas atuais identificam imóveis no bairro Capela Velha.
// - UBS Califórnia atende parte da região de Capela Velha.
const data = {
  nome: "Capela Velha",
  slug: "capela-velha",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática na Capela Velha, Araucária | Diagnóstico",
  metaDescription: "Assistência de informática na Capela Velha, Araucária. Diagnóstico de Windows, notebook, backup, Wi-Fi e periféricos antes da execução.",
  h1: "Técnico de Informática na Capela Velha – Araucária",
  subtitulo: "Triagem técnica com foco em sistema, dados e conectividade, sem formatar ou trocar peças por tentativa.",
  descricaoLonga: `Capela Velha é reconhecida oficialmente pelo município de Araucária e aparece de forma explícita no Plano Diretor e no cadastro urbanístico municipal. A região também está vinculada à rede pública de saúde por unidades que atendem áreas do bairro. Essas referências permitem identificar a localidade sem transformar a página em uma coleção de pontos genéricos.

Nesta página, o foco técnico é separar problemas do Windows, armazenamento e dados antes de qualquer reinstalação. Um computador que ficou lento pode estar com programas em excesso, memória insuficiente, disco degradado ou temperatura elevada. Uma máquina que entra em reparo automático pode ter falha de sistema, mas também pode estar reagindo a um problema no SSD ou HD.

Quando há arquivos importantes, o primeiro passo é saber se existe backup. Se o armazenamento apresenta erros, travamentos ao copiar arquivos ou desaparece do sistema, insistir em formatação pode piorar o cenário. Se o disco está saudável e o problema é de software, a correção pode ser menos invasiva.

Em Wi-Fi, comparamos outros dispositivos e ambientes antes de indicar repetidor ou roteador. Em notebook, fonte, bateria e temperatura entram na triagem quando há queda de desempenho ou desligamento. Se a máquina continua operacional, parte da avaliação pode começar remotamente; falha física, desmontagem e medição exigem atendimento presencial ou bancada.

A página da Capela Velha foi reescrita para oferecer orientação própria sobre sistema, backup e conectividade. A localização organiza a visita; a decisão técnica vem dos sintomas e dos testes.`,
  pontosReferencia: [
    "Capela Velha – Araucária",
    "Cadastro urbanístico municipal de Capela Velha",
    "Área atendida pela rede municipal de saúde"
  ],
  tempoDeslocamento: "Horário confirmado após triagem e localização",
  servicosDestaque: [
    "Correção de Windows e inicialização",
    "Backup antes de formatação",
    "Análise de SSD e HD",
    "Notebook com falha de desempenho",
    "Configuração de Wi-Fi",
    "Impressora e periféricos"
  ],
  conteudoExclusivo: `Formatar é uma solução, não um diagnóstico

Quando o Windows apresenta erro, primeiro verificamos se a origem está no próprio sistema ou no hardware. Um SSD instável pode provocar sintomas parecidos com arquivos corrompidos; memória defeituosa também pode gerar travamentos.

Se houver dados importantes, a prioridade é preservá-los antes de qualquer procedimento destrutivo. Em rede, a comparação entre aparelhos ajuda a evitar troca de equipamento sem necessidade.

Na Capela Velha, esta página concentra essa orientação para que o visitante consiga descrever melhor o problema e entender por que a triagem vem antes da execução.`,
  problemasComuns: [
    "Windows entra em reparo automático",
    "Computador fica lento depois de iniciar",
    "SSD ou HD apresenta erros",
    "Notebook desliga ou reduz desempenho",
    "Wi-Fi falha em alguns aparelhos",
    "Arquivos importantes sem backup"
  ],
  dicasLocais: `Ao pedir atendimento na Capela Velha, informe rua, número e uma referência confiável do endereço. Para erros do Windows, envie foto da mensagem; para armazenamento, evite formatar se houver arquivos importantes; para Wi-Fi, confirme se outros aparelhos apresentam a mesma falha.`,
};

const CapelaVelhaAraucaria = () => <BairroTemplate data={data} />;

export default CapelaVelhaAraucaria;
