import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de Pinhais: USF Perneta — Rua Maximiliano Rohrsetzer, 983.
// - Prefeitura de Pinhais: Escola Municipal Aroldo de Freitas — Rua Pedro Fanor, 165.
// - Prefeitura de Pinhais: Vigilância Ambiental — Rua Mandaguaçu, 566.
const data = {
  nome: "Emiliano Perneta",
  slug: "emiliano-perneta",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Emiliano Perneta, Pinhais | Diagnóstico",
  metaDescription: "Técnico de informática no Emiliano Perneta, Pinhais. Triagem pelo WhatsApp, atendimento conforme endereço e coleta quando o reparo exige bancada.",
  h1: "Técnico de Informática no Emiliano Perneta – Pinhais",
  subtitulo: "Triagem técnica antes do deslocamento, atendimento no endereço quando adequado e coleta para bancada quando o reparo exige.",
  descricaoLonga: `Emiliano Perneta é um bairro de Pinhais com referências públicas bem distribuídas. A Prefeitura mantém a USF Perneta na Rua Maximiliano Rohrsetzer, a Escola Municipal Aroldo de Freitas na Rua Pedro Fanor e a Vigilância Ambiental na Rua Mandaguaçu. Esses pontos são úteis para confirmar a região do chamado, mas não servem como promessa de tempo fixo de chegada: a agenda depende do endereço, da modalidade do serviço e da disponibilidade informada na triagem.

O atendimento começa pelo WhatsApp com três informações: equipamento, sintoma e localização aproximada. Se o computador ainda liga e acessa a internet, problemas de software podem começar por avaliação remota. Quando há falha física, superaquecimento, conector danificado, tela quebrada, desktop sem imagem ou necessidade de desmontagem prolongada, a visita ou a coleta para bancada pode ser mais adequada.

A lentidão não é tratada automaticamente como “precisa formatar”. Primeiro separamos sistema, armazenamento, memória, temperatura e programas em segundo plano. Em notebook, observamos bateria, carregador, ventilação e comportamento sob carga antes de indicar troca de peça. Em desktop, fonte, memória, vídeo e armazenamento seguem uma sequência própria de teste.

Quando existem arquivos importantes, o diagnóstico inclui a pergunta mais importante antes de qualquer reinstalação: o que precisa ser preservado e onde existe cópia. Se o disco apresenta sinais de falha, evitamos continuar gravando dados sem necessidade. O objetivo é definir a rota técnica correta antes da execução, com escopo e valor apresentados previamente.`,
  pontosReferencia: [
    "USF Perneta – Rua Maximiliano Rohrsetzer",
    "Escola Municipal Aroldo de Freitas – Rua Pedro Fanor",
    "Vigilância Ambiental – Rua Mandaguaçu",
    "Vila União II",
    "Eixo da Rua Maximiliano Rohrsetzer"
  ],
  tempoDeslocamento: "Agenda confirmada após triagem do endereço",
  servicosDestaque: [
    "Diagnóstico de computador e notebook",
    "Formatação com preservação de dados",
    "Remoção de vírus e programas indesejados",
    "Upgrade de SSD e memória",
    "Diagnóstico e configuração de Wi-Fi",
    "Backup e recuperação de arquivos"
  ],
  conteudoExclusivo: `Como organizamos o atendimento no Emiliano Perneta

A localização é confirmada antes do deslocamento. Referências como a USF Perneta, a Escola Municipal Aroldo de Freitas e a Rua Mandaguaçu ajudam a identificar a área do chamado, mas o endereço exato continua sendo necessário para montar a agenda.

Cada sintoma segue um roteiro diferente. Computador que liga sem vídeo exige verificar alimentação, memória, cabo e vídeo antes de mexer no Windows. Notebook que perde desempenho depois de aquecer pede medição de temperatura e ventilação. Máquina que ficou lenta ao longo dos meses precisa ter disco, memória e inicialização analisados antes de qualquer decisão sobre formatação.

Para Wi-Fi, a primeira pergunta é onde o roteador está e em quais ambientes a conexão piora. Repetidor ou mesh só entra na recomendação depois de entender cobertura, obstáculos e velocidade disponível no ponto principal. Em equipamentos com dados importantes, a preservação dos arquivos é discutida antes de reinstalação, clonagem ou troca de disco.

Se o reparo exige bancada — desmontagem profunda, troca de tela, conector, solda ou teste prolongado — a coleta pode ser combinada em vez de transformar a visita em horas de espera no endereço.`,
  problemasComuns: [
    "Computador liga, mas não apresenta imagem",
    "Windows fica lento, trava ou reinicia",
    "Notebook aquece ou desliga sob carga",
    "Disco apresenta lentidão ou falhas de leitura",
    "Wi-Fi não cobre todos os ambientes",
    "Arquivos importantes estão sem backup confiável"
  ],
  dicasLocais: `Ao chamar pelo Emiliano Perneta, envie sua rua e uma referência próxima, como USF Perneta, Rua Pedro Fanor ou Rua Mandaguaçu. Informe também marca/modelo e descreva o que acontece desde o momento em que o equipamento é ligado. Se houver arquivos importantes, avise antes de tentar formatar ou continuar usando um disco que esteja apresentando falha.`,
};

const EmilianoPerneta = () => <BairroTemplate data={data} />;

export default EmilianoPerneta;
