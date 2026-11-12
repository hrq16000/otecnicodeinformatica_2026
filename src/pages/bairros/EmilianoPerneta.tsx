import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Pinhais: USF Perneta — Rua Maximiliano Rohrsetzer, 983.
// - Prefeitura de Pinhais: Escola Municipal Aroldo de Freitas — Rua Pedro Fanor, 165.
const data = {
  nome: "Emiliano Perneta",
  slug: "emiliano-perneta",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Emiliano Perneta, Pinhais | Diagnóstico",
  metaDescription: "Atendimento de informática no Emiliano Perneta, Pinhais. Triagem pelo WhatsApp, visita quando necessária e bancada para reparos que exigem desmontagem.",
  h1: "Técnico de Informática no Emiliano Perneta – Pinhais",
  subtitulo: "Triagem antes do deslocamento, atendimento no endereço quando adequado e bancada para reparos que exigem testes prolongados.",
  descricaoLonga: `O Emiliano Perneta tem referências públicas fáceis de confirmar e usar na triagem de um chamado. A Prefeitura de Pinhais mantém a USF Perneta na Rua Maximiliano Rohrsetzer e a Escola Municipal Aroldo de Freitas na Rua Pedro Fanor. Esses pontos ajudam a localizar o atendimento com mais precisão sem transformar a página em uma promessa genérica de “chegar rápido”.

Quando alguém chama para um computador ou notebook no Emiliano Perneta, a primeira etapa é entender o sintoma. Uma máquina que ficou lenta de forma gradual pede verificação diferente de um equipamento que parou de ligar de repente. Travamentos depois de uma atualização, ruído de ventoinha, temperatura alta, falha de carregamento, tela sem imagem e Wi-Fi instável não devem receber a mesma solução automática. Antes de recomendar formatação, troca de SSD ou substituição de peça, é preciso separar causa provável de efeito.

Se o equipamento ainda inicia e possui conexão estável, alguns diagnósticos podem começar remotamente. Quando há falha física, conector quebrado, problema de alimentação, superaquecimento severo ou necessidade de abrir o equipamento por mais tempo, a visita ou a bancada tende a ser mais apropriada. O mesmo vale para recuperação de arquivos: quando existe suspeita de falha no disco, continuar usando a máquina pode piorar a situação, então a prioridade passa a ser preservar os dados.

No atendimento local, o endereço exato é confirmado antes de definir a modalidade. Referências como Rua Maximiliano Rohrsetzer e Rua Pedro Fanor ajudam a organizar a rota, mas não substituem rua e número. O cliente recebe a orientação do próximo passo antes da execução, com indicação clara de quando o serviço pode ser feito no local e quando faz mais sentido retirar o equipamento para bancada.`,
  pontosReferencia: [
    "Rua Maximiliano Rohrsetzer",
    "USF Perneta",
    "Rua Pedro Fanor",
    "Escola Municipal Aroldo de Freitas",
    "Emiliano Perneta – Pinhais"
  ],
  tempoDeslocamento: "Agenda definida após triagem do endereço",
  servicosDestaque: [
    "Diagnóstico de notebook e computador",
    "Formatação com preservação de dados combinada",
    "Upgrade de SSD e memória",
    "Correção de Windows lento ou instável",
    "Diagnóstico de Wi-Fi e rede doméstica",
    "Backup e recuperação de arquivos"
  ],
  conteudoExclusivo: `Como o atendimento no Emiliano Perneta é decidido

O objetivo da triagem é evitar deslocamento desnecessário e evitar que o diagnóstico seja reduzido a “formatar para ver se resolve”. Primeiro pedimos modelo do equipamento, comportamento do defeito e, quando possível, foto ou vídeo. Depois definimos se o caso deve começar por acesso remoto, visita técnica ou bancada.

Notebook com bateria estufada, dobradiça rompida, conector de energia intermitente ou temperatura muito alta não é tratado como problema de software. Da mesma forma, computador que ficou lento depois de anos de uso não recebe automaticamente indicação de SSD: verificamos espaço livre, saúde do armazenamento, memória disponível, temperatura e processos em segundo plano antes de sugerir upgrade.

Em rede Wi-Fi, a recomendação também parte do ambiente. É preciso saber onde está o roteador, quais cômodos apresentam perda e se a lentidão acontece também por cabo. Repetidor, mesh ou troca de roteador só entram depois dessa leitura. Essa lógica deixa a página útil para quem realmente está no Emiliano Perneta sem repetir um texto genérico usado em outros bairros.`,
  problemasComuns: [
    "Notebook que liga e desliga ou não carrega corretamente",
    "Computador lento mesmo após reiniciar",
    "Tela azul, congelamentos ou reinicializações inesperadas",
    "SSD ou HD com sinais de falha e arquivos importantes",
    "Wi-Fi com boa velocidade perto do roteador e queda em outros cômodos",
    "Máquina aquecendo demais ou fazendo ruído excessivo"
  ],
  dicasLocais: `Ao pedir atendimento no Emiliano Perneta, envie o endereço e uma referência próxima, como a USF Perneta ou a Rua Pedro Fanor. Informe também marca e modelo do equipamento e descreva o que aconteceu imediatamente antes do defeito. Se houver arquivos importantes sem backup, avise isso na primeira mensagem para que preservação de dados seja considerada antes de qualquer reinstalação ou teste invasivo.`,
};

const EmilianoPerneta = () => <BairroTemplate data={data} />;

export default EmilianoPerneta;
