/**
 * ============================================================================
 * INTENÇÃO CONVERSACIONAL — "o que / como / por que / onde"
 * ============================================================================
 * Blocos de resposta direta para as perguntas que as pessoas realmente
 * digitam em buscadores e assistentes (ChatGPT, Gemini, Copilot).
 *
 * Governança:
 *  - Conteúdo INFORMATIVO é nacional: diagnóstico, causa-raiz e verificações
 *    seguras valem para o Brasil inteiro. Nada de cidade no texto informativo.
 *  - Conteúdo de CONVERSÃO (preço, visita, agendamento) continua restrito às
 *    localidades atendidas e vive fora deste arquivo (CTA da página).
 *  - Resposta curta, direta e verificável. Proibido inventar número, prazo,
 *    nota, garantia ou estatística.
 *  - Nenhuma URL nova: estes blocos enriquecem páginas que já existem.
 *
 * O gate `npm run check:conversational-intent` valida tudo isso.
 */

export type TipoPergunta = "o-que" | "como" | "por-que" | "onde";

export type PerguntaConversacional = {
  tipo: TipoPergunta;
  /** Pergunta exata, como o usuário escreve. Vira <h2> e entra no FAQPage. */
  pergunta: string;
  /** Resposta direta em uma ou duas frases — é o trecho extraído por LLMs. */
  resposta: string;
  /** Passos ou detalhes opcionais renderizados como <h3> + lista. */
  detalhes?: { titulo: string; itens: string[] };
};

export type AlertaRisco = {
  nivel: "atencao" | "critico";
  titulo: string;
  texto: string;
};

export type BlocoConversacional = {
  /** Caminho canônico da página que recebe o bloco (nunca cria URL nova). */
  path: string;
  /** H2 introdutório da seção — varia por página, de propósito. */
  titulo: string;
  intro: string;
  perguntas: PerguntaConversacional[];
  alertas?: AlertaRisco[];
};

const BLOCOS: BlocoConversacional[] = [
  {
    path: "/problemas/tela-azul",
    titulo: "Tela azul: as dúvidas mais comuns respondidas direto",
    intro:
      "As respostas abaixo valem para qualquer computador com Windows, em qualquer cidade do país. O atendimento presencial é que depende da região.",
    perguntas: [
      {
        tipo: "o-que",
        pergunta: "O que significa tela azul no Windows?",
        resposta:
          "Tela azul é a parada de emergência do Windows: o sistema encontrou uma falha que não consegue tratar com segurança e desliga para não corromper dados. O código exibido (ex.: CRITICAL_PROCESS_DIED, MEMORY_MANAGEMENT) indica qual camada falhou, não necessariamente qual peça está com defeito.",
        detalhes: {
          titulo: "O que o código de erro costuma apontar",
          itens: [
            "Erros de MEMORY: memória RAM, encaixe do pente ou configuração de frequência.",
            "Erros de DRIVER e SYSTEM_SERVICE: driver recém-instalado, atualização interrompida ou software de baixo nível.",
            "Erros de DISK e INACCESSIBLE_BOOT_DEVICE: disco, cabo SATA/NVMe ou sistema de arquivos danificado.",
          ],
        },
      },
      {
        tipo: "como",
        pergunta: "Como saber se a tela azul é problema de hardware ou de software?",
        resposta:
          "Observe a repetição: se o mesmo código aparece sempre e volta mesmo após uma restauração do sistema, a suspeita passa para hardware (memória, disco ou alimentação). Se o erro começou logo depois de uma atualização, driver novo ou programa instalado, a origem é quase sempre software.",
        detalhes: {
          titulo: "Verificações seguras que você mesmo pode fazer",
          itens: [
            "Anote o código exato e em que momento a tela azul aparece (ao ligar, ao jogar, ao abrir um programa).",
            "Rode a Verificação de Memória do Windows (mdsched.exe) e anote o resultado.",
            "Confira em Confiabilidade do Windows se o erro coincide com uma atualização recente.",
            "Faça cópia dos arquivos importantes antes de qualquer tentativa de reparo.",
          ],
        },
      },
      {
        tipo: "por-que",
        pergunta: "Por que a tela azul aparece sempre que o computador esquenta?",
        resposta:
          "Calor alto reduz a estabilidade da memória e do processador: o sistema começa a receber dados inconsistentes e aborta. Nesse cenário a tela azul é sintoma, e a causa está na dissipação — pasta térmica ressecada, cooler travado ou saída de ar obstruída.",
      },
      {
        tipo: "onde",
        pergunta: "Onde levar um computador que fica dando tela azul?",
        resposta:
          "Escolha uma bancada que faça diagnóstico antes de orçar, teste memória e disco com equipamento próprio e informe mão de obra e peça separadamente. Na nossa área de atendimento fazemos essa triagem antes de qualquer execução; fora dela, use as verificações acima para conversar de igual para igual com o técnico local.",
      },
    ],
    alertas: [
      {
        nivel: "critico",
        titulo: "Pare se a tela azul citar o disco",
        texto:
          "Erros de disco combinados com lentidão ou barulho indicam mídia em falha. Cada nova tentativa de boot reduz a chance de recuperar arquivos: desligue o equipamento e trate a cópia dos dados como prioridade.",
      },
      {
        nivel: "atencao",
        titulo: "Não reinstale o Windows por tentativa",
        texto:
          "Formatar apaga a evidência do diagnóstico e não corrige defeito físico. Se o erro voltar depois da reinstalação, o problema estava no hardware o tempo todo.",
      },
    ],
  },
  {
    path: "/problemas/computador-desliga-sozinho",
    titulo: "Desligamento repentino: perguntas diretas, respostas objetivas",
    intro:
      "A parte técnica desta página vale para qualquer PC ou notebook. Só o bloco de atendimento é regional.",
    perguntas: [
      {
        tipo: "o-que",
        pergunta: "O que faz um computador desligar sozinho sem aviso?",
        resposta:
          "Desligamento instantâneo, sem tela de erro, é proteção de hardware: temperatura acima do limite, queda de tensão na fonte ou curto em algum componente. O sistema operacional nem chega a ser avisado, por isso não existe mensagem.",
      },
      {
        tipo: "por-que",
        pergunta: "Por que meu computador desliga sozinho quando abro jogos?",
        resposta:
          "Jogos exigem picos simultâneos de processador e placa de vídeo. Uma fonte no limite ou com capacitores gastos não sustenta esse pico e corta a energia; dissipação insuficiente produz o mesmo efeito por temperatura.",
        detalhes: {
          titulo: "Como diferenciar fonte de superaquecimento",
          itens: [
            "Se desliga em segundos ao carregar o jogo, a suspeita principal é fonte.",
            "Se roda alguns minutos e vai ficando lento antes de desligar, a suspeita principal é temperatura.",
            "Se desliga também em repouso, investigue alimentação, botão liga/desliga e placa-mãe.",
          ],
        },
      },
      {
        tipo: "como",
        pergunta: "Como testar se o problema é a fonte de alimentação?",
        resposta:
          "Sem instrumentos, o teste possível é de exclusão: use o equipamento em outra tomada e circuito, remova periféricos, e observe se o desligamento acompanha a carga. Medição real de tensão sob carga é feita em bancada — improvisar com jumper na fonte não prova estabilidade.",
      },
      {
        tipo: "onde",
        pergunta: "Onde consertar um PC que desliga sozinho?",
        resposta:
          "Procure quem teste fonte sob carga e meça temperatura antes de trocar peça. Dentro da nossa área de cobertura esse teste faz parte da triagem; fora dela, exija do técnico o mesmo critério antes de aprovar troca de componente.",
      },
    ],
    alertas: [
      {
        nivel: "critico",
        titulo: "Cheiro de queimado encerra o teste",
        texto:
          "Se houver cheiro de queimado, estalo ou fumaça, desconecte da tomada e não religue. Insistir pode levar a dano na placa-mãe, que costuma custar mais que o restante do reparo.",
      },
    ],
  },
  {
    path: "/problemas/computador-esquentando",
    titulo: "Superaquecimento: o que perguntar antes de trocar qualquer peça",
    intro:
      "Conteúdo técnico de abrangência nacional. A parte de visita e bancada segue a cobertura de atendimento.",
    perguntas: [
      {
        tipo: "por-que",
        pergunta: "Por que meu notebook esquenta tanto e fica lento?",
        resposta:
          "Quando a temperatura chega ao limite do processador, ele reduz a frequência para se proteger — o efeito prático é lentidão. As causas usuais são pasta térmica ressecada, dissipador obstruído por poeira e cooler girando abaixo do esperado.",
      },
      {
        tipo: "o-que",
        pergunta: "O que é thermal throttling?",
        resposta:
          "É a redução automática de desempenho que o processador aplica quando atinge a temperatura de proteção. Não é defeito: é o mecanismo que evita dano permanente enquanto a refrigeração não dá conta.",
      },
      {
        tipo: "como",
        pergunta: "Como saber se a pasta térmica precisa ser trocada?",
        resposta:
          "Compare comportamento, não número isolado: se o equipamento atinge a temperatura máxima em poucos minutos de uso comum e o ventilador fica no máximo o tempo todo, a dissipação está comprometida. Em uso intenso é normal aquecer; anormal é aquecer parado.",
        detalhes: {
          titulo: "Verificações seguras antes de abrir o equipamento",
          itens: [
            "Use o notebook em superfície rígida, nunca sobre cama ou sofá.",
            "Confira se as saídas de ar estão livres e se sai fluxo de ar quente.",
            "Observe se o ruído do cooler mudou (chiado, arranhado ou silêncio total).",
          ],
        },
      },
      {
        tipo: "onde",
        pergunta: "Onde fazer limpeza interna e troca de pasta térmica?",
        resposta:
          "Deve ser feito em bancada, com desmontagem controlada e teste de temperatura antes e depois. Atendemos essa demanda na nossa região; fora dela, verifique se o serviço inclui medição comparativa — sem isso não há como comprovar o resultado.",
      },
    ],
    alertas: [
      {
        nivel: "atencao",
        titulo: "Ar comprimido doméstico pode piorar",
        texto:
          "Soprar ar dentro do notebook empurra poeira para dentro do dissipador e pode girar o cooler acima do limite mecânico. Limpeza eficaz exige desmontagem.",
      },
    ],
  },
  {
    path: "/problemas/windows-nao-inicia",
    titulo: "Windows não inicia: respostas diretas sobre 0xc0000428 e recuperação",
    intro:
      "Diagnóstico técnico válido em qualquer lugar do Brasil. O código orienta a investigação, mas não substitui a identificação do arquivo citado, do estado da unidade e da mudança que aconteceu antes da falha.",
    perguntas: [
      {
        tipo: "o-que",
        pergunta: "O que significa o erro 0xc0000428 no Windows?",
        resposta:
          "O erro 0xc0000428 corresponde a STATUS_INVALID_IMAGE_HASH: durante a partida, o Windows não encontrou nos catálogos do sistema o hash necessário para validar uma imagem executável. Arquivo corrompido, catálogo incoerente e driver crítico incompatível são causas possíveis; o código não prova sozinho vírus ou SSD defeituoso.",
        detalhes: {
          titulo: "As três evidências que tornam o código útil",
          itens: [
            "O caminho completo do arquivo mostrado na tela, quando houver.",
            "A alteração anterior ao erro: atualização, driver, queda de energia, clonagem ou ajuste de UEFI.",
            "O comportamento da unidade: reconhecida de modo estável, lenta, intermitente ou com alerta de saúde.",
          ],
        },
      },
      {
        tipo: "como",
        pergunta: "Como corrigir o Windows que não inicia sem formatar?",
        resposta:
          "Comece pelas opções reversíveis do Ambiente de Recuperação: guarde a mensagem exata, localize a chave do BitLocker, execute o Reparo de Inicialização uma vez e, se houver relação temporal, desinstale a atualização recente ou use um ponto de restauração. Comandos offline só entram depois de identificar a instalação, a partição EFI e a saúde do disco.",
        detalhes: {
          titulo: "Ordem segura antes de qualquer reinstalação",
          itens: [
            "Remova mídias externas e apenas confirme no UEFI se a unidade interna aparece.",
            "Use Reparo de Inicialização e registre o resultado, sem repetir o mesmo ciclo indefinidamente.",
            "Use Modo de Segurança ou log de boot para isolar driver, se essas opções abrirem.",
            "Se houver falha de leitura, preserve ou clone os dados antes de reparar estruturas.",
          ],
        },
      },
      {
        tipo: "por-que",
        pergunta: "Por que o Windows diz que não foi possível verificar a assinatura digital?",
        resposta:
          "Porque o conteúdo carregado no boot não correspondeu à evidência de integridade e confiança esperada pelo Windows. Isso pode acontecer quando uma atualização deixa arquivo e catálogo fora de sincronia, quando o arquivo se corrompe, quando um driver crítico é inadequado ou quando a leitura da unidade devolve dados inconsistentes.",
      },
      {
        tipo: "onde",
        pergunta: "Onde levar um PC que liga, mas não entra no Windows?",
        resposta:
          "Procure uma assistência que registre o código e o arquivo citado, confira BitLocker e saúde da unidade antes de escrever no disco e diferencie reparo de boot de recuperação de dados. Na nossa área de atendimento fazemos a triagem nessa ordem; fora dela, use esses critérios para avaliar o procedimento proposto pelo técnico local.",
      },
    ],
    alertas: [
      {
        nivel: "critico",
        titulo: "Unidade lenta, ausente ou com ruído muda a prioridade",
        texto: "Pare os reinícios e não execute varredura pesada. Se o SSD ou HD está instável, a prioridade é preservar ou clonar o que ainda pode ser lido; reparar o boot antes disso pode consumir as últimas leituras úteis.",
      },
      {
        nivel: "atencao",
        titulo: "A chave do BitLocker vem antes das alterações",
        texto: "Algumas ferramentas do WinRE precisam desbloquear o volume. Sem a chave correspondente, não limpe TPM, não formate e não presuma que uma reinstalação permitirá acessar os dados cifrados.",
      },
      {
        nivel: "atencao",
        titulo: "Bypass de assinatura é teste, não conserto",
        texto: "A opção temporária das Configurações de Inicialização pode confirmar a participação de um driver. Manter Secure Boot ou imposição de assinatura desligados reduz a segurança e deixa a causa original sem correção.",
      },
    ],
  },
  {
    path: "/problemas/wifi-instavel",
    titulo: "Wi-Fi caindo: respostas diretas antes de trocar de operadora",
    intro:
      "Diagnóstico de rede válido em qualquer lugar do Brasil; a visita técnica segue a área atendida.",
    perguntas: [
      {
        tipo: "o-que",
        pergunta: "O que faz o Wi-Fi cair sozinho várias vezes por dia?",
        resposta:
          "Queda intermitente quase sempre vem de interferência de canal, distância com parede de concreto no caminho, roteador sobrecarregado de dispositivos ou adaptador de rede do computador entrando em economia de energia.",
      },
      {
        tipo: "como",
        pergunta: "Como saber se o problema é o roteador ou o computador?",
        resposta:
          "Teste com um segundo dispositivo no mesmo lugar e no mesmo horário. Se só um computador cai, investigue o adaptador e o driver dele; se todos caem juntos, o foco é roteador, cabeamento ou o link da operadora.",
        detalhes: {
          titulo: "Verificações seguras em ordem",
          itens: [
            "Aproxime-se do roteador e repita o teste — descarta cobertura antes de qualquer troca.",
            "Compare as faixas de 2,4 GHz e 5 GHz: alcance maior contra velocidade maior.",
            "Desative a economia de energia do adaptador Wi-Fi nas configurações do Windows.",
            "Anote horários das quedas: padrão no mesmo horário costuma indicar interferência de vizinhança.",
          ],
        },
      },
      {
        tipo: "por-que",
        pergunta: "Por que o Wi-Fi fica lento só em alguns cômodos?",
        resposta:
          "O sinal perde intensidade ao atravessar concreto, espelho e caixa d'água. A faixa de 5 GHz é mais rápida e sofre mais com obstáculos, então o mesmo roteador entrega experiências diferentes conforme o cômodo.",
      },
      {
        tipo: "onde",
        pergunta: "Onde resolver rede Wi-Fi instável em casa ou no escritório?",
        resposta:
          "O ajuste começa por medição de sinal por ambiente e revisão de canal, antes de comprar repetidor. Fazemos esse levantamento presencial na área que atendemos; fora dela, as verificações acima já eliminam boa parte das causas.",
      },
    ],
  },
];

const POR_PATH = new Map(BLOCOS.map((b) => [b.path, b]));

/** Bloco conversacional de uma página, quando existir. */
export const blocoConversacional = (path: string): BlocoConversacional | undefined =>
  POR_PATH.get(path);

/** Todos os blocos — usado por gates e relatórios. */
export const blocosConversacionais = (): BlocoConversacional[] => BLOCOS;

/**
 * Perguntas prontas para entrar no FAQPage da página.
 * A página deve MESCLAR com a FAQ existente (um único FAQPage por URL).
 */
export const faqConversacional = (path: string): { q: string; a: string }[] =>
  (POR_PATH.get(path)?.perguntas ?? []).map((p) => ({ q: p.pergunta, a: p.resposta }));
