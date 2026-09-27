import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Câmara Municipal de Campo Largo: documentação oficial identifica a localidade Timbotuva e a Rua Germânia, iniciando na BR-277, km 108.
// - A documentação cita coordenadas e participação da Secretaria Municipal de Desenvolvimento Urbano/Econômico na definição da via.
const data = {
  nome: "Timbotuva",
  slug: "timbotuva-cl",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática no Timbotuva, Campo Largo | Suporte",
  metaDescription: "Suporte de informática no Timbotuva, Campo Largo. Triagem para Wi-Fi, notebook, Windows e hardware com definição entre remoto, visita e bancada.",
  h1: "Técnico de Informática no Timbotuva – Campo Largo",
  subtitulo: "Triagem de conectividade e equipamento para decidir entre suporte remoto, visita e bancada.",
  descricaoLonga: `Timbotuva aparece em documentação oficial da Câmara Municipal de Campo Largo, inclusive em projetos de denominação de vias e referências urbanísticas. A Rua Germânia, por exemplo, é descrita como localizada em Timbotuva e com início na BR-277, km 108. Essa documentação confirma a localidade e permite manter a página ancorada em informação pública verificável.

Nesta página, o foco técnico está em conectividade e na escolha correta da modalidade de atendimento. Problemas de Windows, configuração, navegador, e-mail, impressora de rede e alguns erros de software podem começar por triagem remota quando o computador ainda funciona e possui conexão estável.

Quando a máquina não liga, não apresenta vídeo, aquece demais ou possui falha de alimentação, o atendimento precisa ser presencial ou em bancada. Em notebook, fonte, bateria, temperatura e armazenamento são avaliados conforme o sintoma.

No Wi-Fi, comparar outros dispositivos e pontos do imóvel ajuda a separar falha do computador de problema na infraestrutura. Se apenas um notebook perde conexão, adaptador e driver entram primeiro. Se todos os aparelhos falham, o foco muda para roteador, cobertura ou conexão principal.

Quando existem arquivos importantes, backup entra antes de formatação ou troca de disco. Se o armazenamento apresenta sinais de falha, insistir em uso pode aumentar o risco de perda. A página de Timbotuva foi reescrita para explicar esse fluxo com conteúdo próprio, sem prometer tempo de chegada e sem atribuir características locais não comprovadas.`,
  pontosReferencia: [
    "Timbotuva – Campo Largo",
    "Rua Germânia",
    "BR-277, km 108"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem do endereço e do defeito",
  servicosDestaque: [
    "Diagnóstico de Wi-Fi e rede",
    "Triagem e suporte remoto",
    "Notebook que não liga",
    "Correção de Windows",
    "Backup e preservação de arquivos",
    "Avaliação de fonte e bateria"
  ],
  conteudoExclusivo: `Nem todo chamado precisa começar com deslocamento

Se o computador ainda inicia e a falha está em configuração, programa, driver ou acesso, a triagem remota pode reduzir hipóteses ou resolver parte do problema. Se não há vídeo, energia ou existe defeito físico, o atendimento precisa mudar.

Em Wi-Fi, comparar outro dispositivo evita culpar o roteador por uma falha isolada. Em notebook sem carga, fonte, bateria e conector precisam ser separados.

Essa abordagem dá à página de Timbotuva uma função própria voltada à decisão entre remoto, visita e bancada, sem transformar a localização em promessa de velocidade.`,
  problemasComuns: [
    "Notebook perde conexão Wi-Fi",
    "Computador não liga",
    "PC liga sem apresentar vídeo",
    "Windows apresenta erro de configuração",
    "Roteador funciona para alguns dispositivos e falha para outros",
    "Arquivos importantes em máquina instável"
  ],
  dicasLocais: `Ao pedir atendimento no Timbotuva, informe o endereço e uma referência local confiável, como a Rua Germânia ou o acesso pela BR-277. Diga se o computador ainda acessa a internet; isso ajuda a avaliar suporte remoto. Para máquina sem vídeo ou sem energia, informe LEDs, ventoinhas e bipes.`,
};

const TimbotuvaCL = () => <BairroTemplate data={data} />;

export default TimbotuvaCL;
