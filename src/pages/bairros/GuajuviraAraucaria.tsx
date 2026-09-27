import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Araucária: UBSF Guajuvira integra a rede municipal de saúde.
// - WebGeo municipal identifica perímetro urbano do Distrito de Guajuvira e eixos viários próprios.
const data = {
  nome: "Guajuvira",
  slug: "guajuvira",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Guajuvira, Araucária | Diagnóstico",
  metaDescription: "Assistência de informática no Guajuvira, Araucária. Triagem para rede, notebook, PC e arquivos, com definição entre suporte remoto, visita e bancada.",
  h1: "Técnico de Informática no Guajuvira – Araucária",
  subtitulo: "Diagnóstico antes do deslocamento, com foco em conectividade, acesso remoto e falhas que realmente exigem bancada.",
  descricaoLonga: `Guajuvira possui identidade territorial própria dentro de Araucária. A Prefeitura mantém UBSF Guajuvira na rede municipal e o WebGeo identifica perímetro urbano do Distrito de Guajuvira, com eixos e zoneamento específicos. Essas referências confirmam a localidade e ajudam a evitar uma landing genérica apenas com o nome trocado.

Nesta página, a prioridade é separar o que pode começar remotamente do que realmente exige presença física. Problemas de Windows, configuração, acesso a e-mail, impressora de rede, navegador e alguns erros de software podem ser investigados à distância quando o computador ainda funciona e há conexão disponível.

Já falhas de alimentação, tela, conector, aquecimento, ausência de vídeo ou armazenamento instável exigem outro caminho. Em notebook, se a máquina não liga ou desliga sob carga, fonte, bateria, temperatura e circuito precisam ser considerados. Em PC, sinais de energia e vídeo ajudam a decidir se a visita ou a bancada é a melhor opção.

A conectividade também merece diagnóstico próprio. Se o acesso cai apenas em um notebook, adaptador e driver entram primeiro. Se todos os dispositivos falham, o foco passa para roteador, conexão principal e infraestrutura. A compra de repetidor ou equipamento novo só faz sentido depois desses testes.

A página do Guajuvira foi reescrita para orientar essa decisão entre remoto, visita e bancada. A localização organiza o atendimento; o tipo de falha determina a modalidade mais adequada.`,
  pontosReferencia: [
    "Distrito de Guajuvira",
    "UBSF Guajuvira",
    "Perímetro urbano do Guajuvira"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem do endereço e do defeito",
  servicosDestaque: [
    "Triagem e suporte remoto",
    "Diagnóstico de rede e Wi-Fi",
    "Notebook que não liga",
    "Computador sem vídeo",
    "Correção de Windows",
    "Backup e recuperação de arquivos"
  ],
  conteudoExclusivo: `Nem todo chamado precisa começar com deslocamento

Se o computador ainda inicia e a falha está em configuração, programa, driver ou acesso, a triagem remota pode confirmar hipóteses e até resolver parte do problema. Isso evita deslocamento quando não há necessidade.

Se a máquina não liga, não dá vídeo, aquece demais ou apresenta falha física, o atendimento muda. Em rede, comparar outros dispositivos mostra se o defeito está na máquina ou na infraestrutura.

No Guajuvira, esta página foi desenhada justamente para explicar esse limite e evitar promessas genéricas de atendimento rápido sem saber o que aconteceu.`,
  problemasComuns: [
    "Notebook perde Wi-Fi",
    "Computador não liga",
    "PC liga sem apresentar vídeo",
    "Windows apresenta erro de configuração",
    "Roteador funciona para alguns dispositivos e falha para outros",
    "Arquivos importantes em máquina instável"
  ],
  dicasLocais: `Ao solicitar atendimento no Guajuvira, informe o endereço completo e uma referência local confiável. Diga se o computador ainda acessa a internet; isso ajuda a avaliar suporte remoto. Para máquina sem vídeo ou sem energia, informe LEDs, ventoinhas e bipes antes da visita.`,
};

const GuajuviraAraucaria = () => <BairroTemplate data={data} />;

export default GuajuviraAraucaria;
