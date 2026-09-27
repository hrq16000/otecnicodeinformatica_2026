import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Araucária: Escola Municipal General Celso de Azevedo Daltro Santos — Rua José Bonvim, s/n, Tindiquera.
// - Catálogo municipal atual registra estruturas administrativas na Rua Marcelino Jasinski, Tindiquera.
const data = {
  nome: "Tindiquera",
  slug: "tindiquera",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Tindiquera, Araucária | Rede e Wi-Fi",
  metaDescription: "Suporte de informática no Tindiquera, Araucária. Diagnóstico de Wi-Fi, rede cabeada, notebook e PC com triagem antes de trocar roteador ou peças.",
  h1: "Técnico de Informática no Tindiquera – Araucária",
  subtitulo: "Diagnóstico de conectividade antes de indicar roteador, repetidor ou troca de adaptador.",
  descricaoLonga: `Tindiquera aparece de forma explícita nas estruturas municipais de Araucária. A Prefeitura registra a Escola Municipal General Celso de Azevedo Daltro Santos na Rua José Bonvim e mantém setores administrativos na Rua Marcelino Jasinski. Essas referências confirmam a localidade e permitem abandonar a antiga landing genérica.

Nesta página, o foco técnico está em conectividade. Wi-Fi lento ou instável não significa automaticamente roteador defeituoso. Se apenas um notebook perde conexão, driver, adaptador ou configuração entram primeiro. Se todos os dispositivos falham ao mesmo tempo, a análise muda para roteador, cobertura ou conexão principal.

Em rede cabeada, a comparação também ajuda. Se um único computador não acessa a rede, placa, cabo ou configuração podem estar envolvidos. Se várias estações perdem conexão, o problema pode estar em switch, roteador ou infraestrutura. A compra de repetidor, mesh ou roteador novo só faz sentido depois dessa separação.

Quando o computador ainda está conectado, parte da triagem pode começar remotamente. É possível verificar driver, configuração IP, DNS e comportamento do sistema antes de deslocamento. Se há falha física, conector de rede danificado, ausência de vídeo ou necessidade de desmontagem, o atendimento passa para visita ou bancada.

A página do Tindiquera foi reescrita para orientar diagnóstico de rede com conteúdo próprio. A referência local serve para localizar o chamado; a recomendação técnica vem de testes que diferenciam falha do dispositivo, da rede interna e da conexão principal.`,
  pontosReferencia: [
    "Rua José Bonvim",
    "Escola Municipal General Celso de Azevedo Daltro Santos",
    "Rua Marcelino Jasinski",
    "Tindiquera – Araucária"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem da rede e do endereço",
  servicosDestaque: [
    "Diagnóstico de Wi-Fi",
    "Configuração de rede cabeada",
    "Correção de drivers de rede",
    "Notebook sem conexão",
    "PC sem acesso à internet",
    "Suporte remoto para configuração"
  ],
  conteudoExclusivo: `Antes de trocar o roteador, descubra onde a conexão falha

Se um único equipamento perde Wi-Fi, a investigação começa nele. Se todos falham, o foco muda para a rede. Se o problema aparece apenas em determinado ponto do imóvel, cobertura e obstáculos ganham peso.

Na rede cabeada, testar outro cabo ou porta ajuda a separar placa de rede e infraestrutura. Em alguns casos, a triagem remota consegue identificar driver ou configuração sem visita.

Essa lógica dá ao Tindiquera uma página específica para conectividade e impede que a solução seja escolhida apenas pelo sintoma “internet ruim”.`,
  problemasComuns: [
    "Wi-Fi cai apenas em um notebook",
    "Vários dispositivos perdem conexão",
    "PC não acessa rede cabeada",
    "Driver de rede apresenta erro",
    "Internet funciona no celular mas não no computador",
    "Rede precisa ser analisada antes de comprar repetidor"
  ],
  dicasLocais: `Ao pedir atendimento no Tindiquera, informe o endereço e uma referência como a Rua José Bonvim ou a Rua Marcelino Jasinski. Para Wi-Fi, teste outro aparelho no mesmo ponto; para rede cabeada, informe se outra porta ou cabo já foi testado.`,
};

const Tindiquera = () => <BairroTemplate data={data} />;

export default Tindiquera;
