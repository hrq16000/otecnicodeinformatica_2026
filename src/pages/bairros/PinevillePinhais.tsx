import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Pinhais: USF Esplanada — Rua Gana, 126, Pineville.
// - Prefeitura de Pinhais: Escola Municipal José Brunetti Gugelmin — Rua Malásia, 181, Pineville.
const data = {
  nome: "Pineville",
  slug: "pineville",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Pineville, Pinhais | Diagnóstico",
  metaDescription: "Suporte de informática no Pineville, Pinhais. Triagem para PC, notebook, Wi-Fi e periféricos, com atendimento remoto, no local ou em bancada conforme o caso.",
  h1: "Técnico de Informática no Pineville – Pinhais",
  subtitulo: "Triagem antes do deslocamento, diagnóstico por sintoma e escolha da modalidade certa para cada equipamento.",
  descricaoLonga: `O Pineville aparece de forma clara nas bases municipais de Pinhais. A Prefeitura registra a USF Esplanada na Rua Gana, nº 126, e a Escola Municipal José Brunetti Gugelmin na Rua Malásia, nº 181. Essas referências ajudam a confirmar a localização de quem pede atendimento e tornam a página útil sem depender de descrições genéricas como “próximo ao Centro”.

No suporte de informática, o ponto de partida é o comportamento do equipamento. Um notebook que perde desempenho apenas quando aquece exige observação diferente de uma máquina que já inicia lenta. Um desktop que liga sem imagem precisa de testes de alimentação, memória e vídeo antes de qualquer formatação. Um computador que funciona normalmente, mas perde conexão, pode ter problema de driver, placa de rede, roteador ou cobertura do imóvel.

Quando a máquina está operacional, alguns diagnósticos podem começar remotamente. Isso vale para parte dos problemas de Windows, aplicativos, impressoras e configurações. Se há falha física, conector, tela, ventilação, alimentação ou necessidade de desmontagem, a avaliação passa a ser presencial ou em bancada. Essa separação evita deslocamento sem necessidade e também evita tentar corrigir hardware apenas com software.

Para Wi-Fi, perguntamos se a lentidão aparece em todos os dispositivos, se muda conforme o cômodo e se a conexão por cabo está normal. Para armazenamento, observamos espaço livre, integridade e sinais de falha antes de sugerir SSD. Para backup, perguntamos primeiro quais arquivos não podem ser perdidos e se existe uma cópia atual.

A página do Pineville foi escrita para orientar essa triagem com referências reais do bairro e conteúdo técnico próprio. Não presume que todo morador tenha o mesmo perfil e não usa frases sobre “demanda constante” sem prova. O objetivo é mostrar como o atendimento é decidido e o que vale informar antes da primeira visita.`,
  pontosReferencia: [
    "Rua Gana",
    "USF Esplanada",
    "Rua Malásia",
    "Escola Municipal José Brunetti Gugelmin",
    "Pineville – Pinhais"
  ],
  tempoDeslocamento: "Horário confirmado depois da triagem e do endereço",
  servicosDestaque: [
    "Diagnóstico de notebook com lentidão ou aquecimento",
    "Computador que liga sem imagem",
    "Correção de Windows e programas",
    "Configuração de impressora e periféricos",
    "Diagnóstico de Wi-Fi e rede",
    "Backup e migração de arquivos"
  ],
  conteudoExclusivo: `Como separar falha de rede de falha no computador

No Pineville, quando a queixa é internet lenta, não começamos indicando roteador novo. Primeiro perguntamos se outros aparelhos apresentam o mesmo problema, se a conexão cai perto do roteador e se o cabo de rede também fica lento. Se apenas um notebook perde conexão, driver, placa de rede ou economia de energia podem entrar no diagnóstico. Se todos os dispositivos falham ao mesmo tempo, o caminho é outro.

A mesma lógica vale para desempenho. Mais memória não resolve disco com erro; SSD não corrige superaquecimento; formatação não conserta fonte instável. Por isso a triagem procura sinais antes de escolher uma solução.

Quando o equipamento guarda documentos, fotos ou arquivos de trabalho, a segurança dos dados vem antes de procedimentos destrutivos. Se houver suspeita de falha no armazenamento, o uso contínuo da máquina pode ser evitado até a avaliação. Esse roteiro reduz tentativa e erro e deixa claro o que o cliente pode esperar do atendimento.`,
  problemasComuns: [
    "Notebook fica lento depois de alguns minutos de uso",
    "Computador liga, mas não mostra imagem",
    "Wi-Fi cai apenas em um notebook ou celular",
    "Impressora perde comunicação com o computador",
    "Windows apresenta erros depois de atualização",
    "HD ou SSD com travamentos e arquivos importantes"
  ],
  dicasLocais: `Ao pedir atendimento no Pineville, envie a rua e uma referência próxima, como a USF Esplanada ou a Escola José Brunetti Gugelmin. Para problema de rede, diga se outros dispositivos também falham; para lentidão, informe se começa já na inicialização ou só depois de abrir programas. Se houver arquivos importantes sem backup, avise antes de qualquer tentativa de formatação.`,
};

const PinevillePinhais = () => <BairroTemplate data={data} />;

export default PinevillePinhais;
