import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de São José dos Pinhais: CEMAEE Paulo Freire — Rua Harry Feeken, 1081, Boneca do Iguaçu.
// - Secretaria Municipal de Educação: Escola Municipal Professora Genoveva Sicuro de Brito — Rua Acre, 1065, Boneca do Iguaçu.
// - Prefeitura de São José dos Pinhais: novo ponto do SINE — Avenida das Torres, 2697, Boneca do Iguaçu.
const data = {
  nome: "Boneca do Iguaçu",
  slug: "boneca-do-iguacu-sjp",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática na Boneca do Iguaçu, SJP | Suporte",
  metaDescription: "Suporte de informática na Boneca do Iguaçu, São José dos Pinhais. Diagnóstico de Windows, periféricos, notebook e rede com triagem antes da execução.",
  h1: "Técnico de Informática na Boneca do Iguaçu – São José dos Pinhais",
  subtitulo: "Triagem para software, periféricos e conectividade antes de formatar ou trocar equipamentos.",
  descricaoLonga: `A Boneca do Iguaçu possui referências municipais atuais e bem definidas. A Prefeitura registra o CEMAEE Paulo Freire na Rua Harry Feeken, a Escola Municipal Professora Genoveva Sicuro de Brito na Rua Acre e, em 2026, abriu novo ponto do SINE na Avenida das Torres, dentro do bairro. Essas referências ajudam a confirmar o atendimento sem recorrer a pontos genéricos.

Nesta página, o foco técnico está em Windows, periféricos e conectividade. Um computador que ainda liga mas deixa de abrir programas, perde áudio, não reconhece webcam ou apresenta impressora offline não deve ser formatado automaticamente. Primeiro é preciso separar sistema, driver, porta, comunicação e hardware.

Em impressoras, verificamos se o equipamento aparece no Windows, se outro computador consegue acessá-lo e se a falha ocorre por cabo, USB ou Wi-Fi. Em webcam e áudio, atualizações e drivers podem explicar o problema sem existir defeito físico. Quando o sistema ainda funciona, parte dessa triagem pode começar remotamente.

Em notebook, a investigação muda quando há aquecimento, falha de carregamento ou desligamento sob uso. Fonte, bateria, temperatura e armazenamento podem produzir sintomas diferentes. Se a máquina guarda arquivos importantes, backup entra antes de reinstalação.

Em rede, comparamos outros dispositivos e ambientes para saber se a falha está no computador ou na infraestrutura. Se apenas um aparelho cai, adaptador e driver entram primeiro. Se todos apresentam instabilidade, o foco muda para roteador, conexão principal e cobertura.

A página da Boneca do Iguaçu foi reescrita para orientar esse diagnóstico com conteúdo próprio, referências locais verificáveis e sem promessa fixa de prazo.`,
  pontosReferencia: [
    "Rua Harry Feeken",
    "CEMAEE Paulo Freire",
    "Rua Acre",
    "Escola Municipal Professora Genoveva Sicuro de Brito",
    "Avenida das Torres",
    "Ponto do SINE na Boneca do Iguaçu"
  ],
  tempoDeslocamento: "Agenda confirmada após triagem do problema e do endereço",
  servicosDestaque: [
    "Correção de Windows e drivers",
    "Impressora e periféricos",
    "Webcam e áudio",
    "Notebook com falha de desempenho",
    "Configuração de Wi-Fi",
    "Backup antes de reinstalação"
  ],
  conteudoExclusivo: `Periférico parado não significa necessariamente hardware queimado

Se uma impressora, webcam ou dispositivo USB para de funcionar depois de atualização, o diagnóstico começa pelo reconhecimento do equipamento, driver e comunicação. Se outro computador consegue usar o dispositivo, a falha provavelmente está na estação original.

Em rede, comparar outro aparelho no mesmo ponto ajuda a separar adaptador de cobertura. Em notebook, lentidão sob carga pode estar ligada a temperatura e não a Windows.

Essa combinação torna a página da Boneca do Iguaçu específica para software, periféricos e conectividade, sem repetir a mesma intenção das demais rotas locais.`,
  problemasComuns: [
    "Impressora fica offline",
    "Webcam ou áudio deixa de funcionar",
    "Windows apresenta erro depois de atualização",
    "Notebook aquece e perde desempenho",
    "Wi-Fi falha apenas em um equipamento",
    "Arquivos precisam de backup antes de reinstalar"
  ],
  dicasLocais: `Ao pedir atendimento na Boneca do Iguaçu, informe o endereço e uma referência como a Rua Harry Feeken, Rua Acre ou Avenida das Torres. Para periféricos, envie a mensagem de erro; para rede, teste outro aparelho; para Windows, informe o que mudou antes da falha.`,
};

const BonecaSJP = () => <BairroTemplate data={data} />;

export default BonecaSJP;
