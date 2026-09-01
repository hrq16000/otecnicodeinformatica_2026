import type { FontePrimaria } from "@/lib/enriquecimento";
import type { LinkContextual, RiscoNivel } from "@/lib/glossarioTecnico";

/**
 * FASE 3 — BIBLIOTECA TÉCNICA · FERRAMENTAS ORIENTATIVAS
 *
 * Fonte única das ferramentas/checklists (/ferramentas e /ferramentas/<slug>).
 * Contrato editorial:
 *  - Cada ferramenta é ORIENTATIVA: organiza observações seguras, nunca dá
 *    diagnóstico absoluto nem promete resultado.
 *  - A versão textual completa é renderizada no SSR — todos os passos,
 *    interpretações, condições de parada e avisos ficam legíveis SEM
 *    JavaScript. O JavaScript apenas adiciona o progresso interativo
 *    (checkboxes) por cima do texto.
 *  - Nenhum passo instrui abrir equipamento, desativar proteção permanente
 *    ou executar operação destrutiva.
 *  - Sem cadastro, sem coleta de dados: o progresso vive só na sessão local.
 */

export type PassoFerramenta = {
  id: string;
  titulo: string;
  descricao: string;
  /** Sinal de alerta observável neste passo — quando presente, orienta parada. */
  alerta?: string;
};

export type InterpretacaoFerramenta = {
  /** O padrão observado ao percorrer os passos. */
  cenario: string;
  /** O que esse padrão costuma indicar — linguagem probabilística, nunca absoluta. */
  leitura: string;
  /** Próximo passo recomendado. */
  proximoPasso: string;
  to?: string;
};

export type FerramentaTecnica = {
  slug: string;
  nome: string;
  /** Nome curto para cards e breadcrumb. */
  nomeCurto: string;
  /** 1–2 frases para o hub e meta description. */
  resumo: string;
  /** O que a ferramenta faz E o que ela não faz — sempre visível. */
  objetivo: string;
  limites: string;
  /** Aviso de segurança fixo, exibido antes dos passos. */
  avisoSeguranca: string;
  risco: RiscoNivel;
  passos: PassoFerramenta[];
  /** Leituras possíveis do resultado — o "estado de conclusão" textual. */
  interpretacoes: InterpretacaoFerramenta[];
  /** Condições de parada imediata — o "estado de erro" textual. */
  quandoParar: string[];
  /** Fecho: o que fazer com o resultado. */
  conclusao: string;
  links: LinkContextual[];
  /** Slugs de termos do glossário citados. */
  termos: string[];
  fontes: FontePrimaria[];
};

export const FERRAMENTAS_REVISADO_EM = "2026-09-02";

export const FERRAMENTAS_TECNICAS: FerramentaTecnica[] = [
  {
    slug: "checklist-computador-lento",
    nome: "Checklist de computador lento",
    nomeCurto: "Computador lento",
    resumo:
      "Sequência de 7 observações seguras para descobrir DE ONDE vem a lentidão — disco, memória, temperatura ou software — antes de gastar com qualquer upgrade.",
    objetivo:
      "Organizar a observação da lentidão em passos que qualquer pessoa consegue fazer, usando apenas ferramentas nativas do Windows, para chegar a uma hipótese fundamentada sobre o gargalo.",
    limites:
      "Este checklist não mede hardware em profundidade nem substitui diagnóstico de bancada. Ele aponta a direção mais provável — a confirmação exige testes que só fazem sentido com o equipamento em mãos.",
    avisoSeguranca:
      "Todos os passos são de observação: nenhum altera configurações, apaga arquivos ou exige instalar programas. Se em qualquer momento o computador exibir tela azul ou o disco fizer ruídos de clique, pare no ato e leia as condições de parada abaixo.",
    risco: "Seguro de fazer sozinho",
    passos: [
      {
        id: "padrao",
        titulo: "Identifique QUANDO a lentidão aparece",
        descricao:
          "Desde que liga? Só depois de horas de uso? Só em programas específicos? Anote o padrão — ele vale mais que qualquer medição isolada. Lentidão desde o boot aponta para disco ou inicialização carregada; lentidão que cresce com o tempo aponta para memória ou temperatura.",
      },
      {
        id: "disco",
        titulo: "Observe o disco no Gerenciador de Tarefas",
        descricao:
          "Ctrl+Shift+Esc → aba Processos → coluna Disco. Logo após ligar, com o sistema 'parado', o disco deveria baixar de 10% em alguns minutos. Disco pregado em 100% por longos períodos, principalmente em HD mecânico, é o sinal clássico de gargalo de armazenamento.",
        alerta:
          "Se além do 100% houver travamentos com congelamento total e ruídos do disco, pare: pode ser disco em degradação física.",
      },
      {
        id: "memoria",
        titulo: "Observe a memória no mesmo Gerenciador",
        descricao:
          "Aba Desempenho → Memória. Reproduza seu uso normal (abas, programas do dia a dia) e veja o percentual. Acima de 90% constante, o sistema está paginando para o disco — a lentidão 'de tarde' costuma nascer aqui.",
      },
      {
        id: "temperatura",
        titulo: "Verifique o padrão térmico",
        descricao:
          "O desempenho cai depois que o equipamento esquenta? A ventoinha fica no máximo? As saídas de ar estão quentes demais ou bloqueadas? Lentidão com assinatura térmica (boa ao ligar, ruim depois de 20–30 min de uso) indica thermal throttling — poeira e pasta térmica, não software.",
      },
      {
        id: "inicializacao",
        titulo: "Revise os programas de inicialização",
        descricao:
          "Gerenciador de Tarefas → aba Aplicativos de inicialização. Conte quantos itens estão 'Habilitado' com impacto Alto. Uma dúzia de programas subindo com o Windows atrasa qualquer máquina — anote os que você nem reconhece (sem desabilitar nada ainda).",
      },
      {
        id: "software",
        titulo: "Cheque sinais de software problemático",
        descricao:
          "Barras de ferramentas que você não instalou, pop-ups, 'otimizadores' e antivírus duplicados consomem máquina. Dois antivírus ativos ao mesmo tempo é situação clássica de lentidão severa.",
      },
      {
        id: "cruzamento",
        titulo: "Cruze as observações",
        descricao:
          "Junte o que anotou: QUANDO a lentidão aparece + QUAL recurso satura + padrão térmico. As interpretações abaixo traduzem as combinações mais comuns.",
      },
    ],
    interpretacoes: [
      {
        cenario: "Disco em 100% constante, em HD mecânico, com memória folgada",
        leitura: "O gargalo mais provável é o próprio HD — o cenário onde a troca por SSD tem o maior impacto perceptível.",
        proximoPasso: "Entenda a troca no serviço de upgrade, que inclui verificação da saúde do disco atual antes de clonar.",
        to: "/servicos/upgrade-ssd-ram",
      },
      {
        cenario: "Memória acima de 90% no seu uso normal, disco saturando junto",
        leitura: "A RAM não comporta sua carga de trabalho e o sistema está paginando — mais RAM tende a resolver, SSD sozinho não.",
        proximoPasso: "Confirme com o roteiro SSD ou RAM antes de comprar qualquer módulo.",
        to: "/ferramentas/ssd-ou-ram",
      },
      {
        cenario: "Desempenho bom ao ligar, degradando com o aquecimento, ventoinha no máximo",
        leitura: "Assinatura de thermal throttling — a causa costuma ser física (poeira, pasta térmica), e nenhuma formatação resolve.",
        proximoPasso: "Leia o diagnóstico completo de superaquecimento antes de decidir a limpeza.",
        to: "/problemas/computador-esquentando",
      },
      {
        cenario: "Lentidão com pop-ups, barras estranhas ou dois antivírus",
        leitura: "Software indesejado consumindo a máquina — o hardware pode estar perfeito.",
        proximoPasso: "O serviço de remoção de vírus limpa preservando arquivos e programas legítimos.",
        to: "/servicos/remocao-de-virus",
      },
    ],
    quandoParar: [
      "Tela azul durante os testes: anote o código de parada e interrompa o checklist — o cenário mudou de lentidão para instabilidade.",
      "Cliques, estalos ou zumbidos rítmicos vindos do disco: desligue e não insista — disco possivelmente em falha física com seus dados dentro.",
      "Cheiro de queimado ou desligamento súbito: pare imediatamente; o problema é elétrico/térmico, não de desempenho.",
    ],
    conclusao:
      "Com o padrão identificado, você já sabe o que NÃO comprar — e essa é metade da economia. Se quiser confirmação antes de investir, descreva pelo WhatsApp o resultado dos passos (qual recurso satura e quando): a triagem fica muito mais precisa com essas observações em mãos.",
    links: [
      {
        rotulo: "Computador lento: diagnóstico completo",
        to: "/problemas/computador-lento",
        contexto: "A página diagnóstica aprofunda cada causa que o checklist aponta.",
      },
      {
        rotulo: "SSD ou RAM: orientação inicial",
        to: "/ferramentas/ssd-ou-ram",
        contexto: "Sequência específica para decidir entre os dois upgrades.",
      },
      {
        rotulo: "Atlas de Informática",
        to: "/guia-tecnico-informatica",
        contexto: "Fundamentos de desempenho na trilha de hardware do Atlas.",
      },
    ],
    termos: ["ssd", "memoria-ram", "thermal-throttling", "smart"],
    fontes: [
      {
        titulo: "Suporte oficial do Windows",
        url: "https://support.microsoft.com/pt-br/windows",
        nota: "orientações nativas de desempenho — busque 'dicas para melhorar o desempenho'",
      },
    ],
  },
  {
    slug: "checklist-antes-de-formatar",
    nome: "Checklist antes de formatar",
    nomeCurto: "Antes de formatar",
    resumo:
      "8 verificações obrigatórias antes de qualquer formatação — do backup testado às licenças e senhas — para que 'recomeçar do zero' não vire perda irreversível.",
    objetivo:
      "Garantir que nada insubstituível se perca na formatação: arquivos, senhas, licenças, programas e a própria capacidade de reinstalar o sistema.",
    limites:
      "O checklist prepara a formatação, mas não decide se ela é o caminho certo — lentidão e travamentos muitas vezes têm causa física que a formatação não toca. Na dúvida sobre a causa, diagnostique antes.",
    avisoSeguranca:
      "Formatação apaga TUDO do disco do sistema, sem lixeira e sem desfazer. Nenhum item deste checklist é opcional se os dados importam. Disco com BitLocker ativo exige atenção redobrada: sem a chave de recuperação salva, uma imagem de backup criptografada pode ficar ilegível.",
    risco: "Exige atenção",
    passos: [
      {
        id: "motivo",
        titulo: "Confirme que formatar resolve o SEU problema",
        descricao:
          "Formatação resolve problemas de software: sistema corrompido, infecção persistente, acúmulo de anos. Não resolve disco degradado, RAM defeituosa nem superaquecimento — nesses casos o sintoma volta em dias. Se a causa não está clara, o diagnóstico vem antes.",
      },
      {
        id: "inventario",
        titulo: "Faça o inventário do que existe no computador",
        descricao:
          "Percorra Documentos, Desktop, Downloads, Imagens e Vídeos — e as pastas fora do padrão (raiz do C:, pastas de programas específicos). Anote também: favoritos do navegador, arquivos de e-mail local (PST/OST), planilhas de trabalho, projetos, certificados digitais (A1) e saves de jogos.",
      },
      {
        id: "backup",
        titulo: "Copie tudo para FORA do computador",
        descricao:
          "HD externo ou nuvem — nunca outra partição do mesmo disco, que também será afetada ou se perde junto numa falha. Para a segurança máxima, uma imagem do sistema preserva o estado completo atual como plano B.",
      },
      {
        id: "teste",
        titulo: "TESTE o backup antes de prosseguir",
        descricao:
          "Abra ao acaso alguns arquivos copiados — fotos, um PDF, uma planilha — direto do destino do backup, em outro computador se possível. Backup não testado não é backup: é esperança.",
        alerta: "Se qualquer arquivo do backup abrir corrompido, PARE. Refaça a cópia e investigue o disco de origem antes de formatar.",
      },
      {
        id: "senhas",
        titulo: "Garanta acesso às contas e senhas",
        descricao:
          "Conta Microsoft/Google (com acesso ao e-mail de recuperação e ao celular do 2FA), senha do e-mail, senhas salvas no navegador (exporte ou confirme a sincronização). Depois de formatar não haverá 'esqueci a senha' salvo no computador.",
      },
      {
        id: "licencas",
        titulo: "Levante licenças e instaladores",
        descricao:
          "Programas pagos (Office, AutoCAD, ERPs) têm chave ou conta vinculada? Certificado digital A1 tem cópia com senha? Programas de nicho ainda têm instalador disponível? Alguns fornecedores exigem DESATIVAR a licença na máquina antiga antes de reinstalar.",
      },
      {
        id: "bitlocker",
        titulo: "Verifique criptografia do disco",
        descricao:
          "Configurações → Privacidade e segurança → Criptografia de dispositivo (ou Painel de Controle → BitLocker). Se ativa, salve a chave de recuperação fora do computador ANTES de mexer em qualquer coisa.",
      },
      {
        id: "midia",
        titulo: "Prepare a mídia de reinstalação e os drivers",
        descricao:
          "Pendrive de instalação criado pela ferramenta oficial da Microsoft (em outro computador, se o seu não estiver confiável) e, para notebooks, a página de drivers do fabricante localizada pelo modelo exato. Sem isso, o computador formatado pode ficar sem Wi-Fi para baixar o resto.",
      },
    ],
    interpretacoes: [
      {
        cenario: "Todos os 8 itens confirmados",
        leitura: "A formatação pode ser executada com risco mínimo de perda — o caminho de volta existe e foi testado.",
        proximoPasso: "Se preferir que a execução (com backup verificado e drivers) seja profissional, o serviço de formatação cobre o processo completo.",
        to: "/servicos/formatacao",
      },
      {
        cenario: "Backup impossível: o disco falha ao copiar, trava ou faz ruído",
        leitura: "O cenário mudou: há indício de falha física, e formatar pode destruir o que ainda é recuperável.",
        proximoPasso: "Pare e leia sobre recuperação de dados antes de qualquer outro passo.",
        to: "/servicos/recuperacao-de-dados",
      },
      {
        cenario: "O motivo da formatação é lentidão ou travamento sem causa conhecida",
        leitura: "Metade dessas formatações não resolve, porque a causa é física (disco, RAM, temperatura).",
        proximoPasso: "Rode primeiro o checklist de computador lento para fundamentar a decisão.",
        to: "/ferramentas/checklist-computador-lento",
      },
    ],
    quandoParar: [
      "Arquivos corrompidos ao copiar ou ler no backup: investigue o disco antes de formatar.",
      "Disco com BitLocker e chave de recuperação em lugar nenhum: resolva o acesso à chave primeiro.",
      "Licença de programa essencial de trabalho sem chave/conta localizável: contate o fornecedor antes.",
    ],
    conclusao:
      "Formatar com este checklist completo transforma um salto no escuro em procedimento controlado. Guarde o backup por pelo menos algumas semanas após a formatação — é comum lembrar de um arquivo 'sem importância' só quando ele faz falta.",
    links: [
      {
        rotulo: "Formatação: serviço completo",
        to: "/servicos/formatacao",
        contexto: "Execução profissional com backup conferido e drivers corretos.",
      },
      {
        rotulo: "Como formatar sem perder arquivos",
        to: "/blog/como-formatar-pc-sem-perder-arquivos",
        contexto: "O tutorial completo por trás deste checklist.",
      },
      {
        rotulo: "Glossário: imagem do sistema",
        to: "/glossario/imagem-do-sistema",
        contexto: "O plano B que preserva o estado completo do computador.",
      },
    ],
    termos: ["imagem-do-sistema", "bitlocker", "backup-incremental", "smart"],
    fontes: [
      {
        titulo: "Suporte oficial do Windows",
        url: "https://support.microsoft.com/pt-br/windows",
        nota: "criação de mídia de instalação e opções de restauração oficiais",
      },
    ],
  },
  {
    slug: "roteiro-falha-de-inicializacao",
    nome: "Roteiro de falha de inicialização",
    nomeCurto: "Falha de inicialização",
    resumo:
      "Observação em 6 etapas do caminho entre o botão de ligar e o Windows — para descobrir ONDE a inicialização quebra e o que cada ponto de parada significa.",
    objetivo:
      "Mapear até onde o computador chega ao ligar (energia → firmware → disco → Windows) e transformar 'não liga' — a descrição mais vaga da informática — em uma observação precisa.",
    limites:
      "O roteiro identifica o ESTÁGIO da falha, não o componente exato. Ele não inclui nenhuma intervenção: é só observação, na ordem certa. A confirmação da causa exige testes de bancada.",
    avisoSeguranca:
      "Nenhum passo envolve abrir o equipamento. Se houver cheiro de queimado, estalos ou fumaça, desligue da tomada imediatamente e não religue — siga direto para as condições de parada.",
    risco: "Seguro de fazer sozinho",
    passos: [
      {
        id: "energia",
        titulo: "Etapa 1 — Sinais de energia",
        descricao:
          "Ao apertar o botão: algum LED acende? Ventoinha gira, mesmo que por um segundo? Algum som? NADA acontecendo aponta para fonte, carregador, bateria ou botão — o problema está antes de qualquer software. Em notebook, confira também o LED do carregador conectado.",
        alerta: "Cheiro de queimado ou estalo: desligue da tomada e não religue.",
      },
      {
        id: "video",
        titulo: "Etapa 2 — Sinais de vídeo",
        descricao:
          "Liga (LEDs, ventoinha) mas a tela fica preta? Observe: o logotipo do fabricante chega a aparecer? Há bipes? Em desktop, confira se o cabo de vídeo está na saída certa (placa de vídeo vs placa-mãe). Logotipo que aparece e some indica que o firmware executou — a falha está adiante.",
      },
      {
        id: "firmware",
        titulo: "Etapa 3 — Mensagens do firmware",
        descricao:
          "Mensagens como 'No bootable device', 'Boot device not found' ou entrada direta na tela de configuração indicam que o firmware (BIOS/UEFI) roda, mas não encontra o disco de inicialização. Anote a mensagem EXATA — cada uma delimita causas diferentes.",
      },
      {
        id: "windows-inicio",
        titulo: "Etapa 4 — O Windows começa a carregar?",
        descricao:
          "O círculo de carregamento do Windows aparece? Se sim, o firmware encontrou o disco e o carregador do sistema funciona. Reinicializações em loop neste ponto, ou tela azul com código, indicam problema no sistema ou em driver — anote qualquer código exibido.",
      },
      {
        id: "reparo",
        titulo: "Etapa 5 — Ambiente de recuperação",
        descricao:
          "Após 2–3 falhas seguidas, o Windows costuma abrir o 'Reparo Automático'. Se abrir, o disco responde e boa parte do sistema está lá. Registre as opções oferecidas SEM executar restaurações ou reverter atualizações ainda — algumas ações têm efeitos difíceis de desfazer.",
      },
      {
        id: "bitlocker-tela",
        titulo: "Etapa 6 — Tela de chave de recuperação?",
        descricao:
          "Tela azul-clara pedindo chave de 48 dígitos é o BitLocker protegendo o disco após uma mudança no ambiente de inicialização. Não é defeito: é criptografia funcionando. A chave costuma estar na conta Microsoft vinculada.",
      },
    ],
    interpretacoes: [
      {
        cenario: "Parou na etapa 1 — nenhum sinal de vida",
        leitura: "Energia: fonte, carregador, bateria ou circuito de alimentação. Software não participa deste cenário.",
        proximoPasso: "O diagnóstico de notebook que não liga cobre as verificações seguras de energia.",
        to: "/problemas/notebook-nao-liga",
      },
      {
        cenario: "Liga mas sem imagem (etapa 2), com ou sem bipes",
        leitura: "Vídeo, memória ou placa — os bipes (se houver) são o código do firmware para o componente.",
        proximoPasso: "A página de 'computador não dá imagem' traduz os padrões mais comuns.",
        to: "/problemas/computador-nao-da-imagem",
      },
      {
        cenario: "'No bootable device' ou equivalente (etapa 3)",
        leitura: "O firmware roda mas não vê o disco: cabo, ordem de boot alterada ou — o caso sério — disco em falha.",
        proximoPasso: "Se houver dados importantes no disco, leia sobre recuperação antes de insistir em reinicializações.",
        to: "/servicos/recuperacao-de-dados",
      },
      {
        cenario: "Windows começa e falha (etapas 4–5), com ou sem tela azul",
        leitura: "Sistema, driver ou atualização problemática — com o hardware provavelmente respondendo.",
        proximoPasso: "O diagnóstico de 'Windows não inicia' detalha cada ramificação deste cenário.",
        to: "/problemas/windows-nao-inicia",
      },
      {
        cenario: "Tela pedindo chave de recuperação (etapa 6)",
        leitura: "BitLocker ativo reagindo a uma mudança de ambiente — os dados estão protegidos, não perdidos.",
        proximoPasso: "Entenda o mecanismo no glossário antes de qualquer decisão.",
        to: "/glossario/bitlocker",
      },
    ],
    quandoParar: [
      "Cheiro de queimado, fumaça ou estalos: desligue da tomada, não religue, e descreva o ocorrido na triagem.",
      "Disco fazendo cliques rítmicos: cada religada reduz as chances dos dados — pare de religar.",
      "Notebook que molhou: não ligue 'para testar' — a corrente em placa úmida multiplica o dano.",
    ],
    conclusao:
      "Com a etapa de parada identificada, a conversa técnica muda de 'não liga' para 'para na etapa X com o sinal Y' — e isso encurta o diagnóstico real em dias. Envie sua observação pelo WhatsApp para uma triagem já direcionada.",
    links: [
      {
        rotulo: "Notebook não liga: diagnóstico",
        to: "/problemas/notebook-nao-liga",
        contexto: "Aprofundamento do cenário de energia em notebooks.",
      },
      {
        rotulo: "Windows não inicia: diagnóstico",
        to: "/problemas/windows-nao-inicia",
        contexto: "Aprofundamento das falhas de sistema e carregador.",
      },
      {
        rotulo: "Glossário: UEFI",
        to: "/glossario/uefi",
        contexto: "O papel do firmware nas etapas 2 e 3 do roteiro.",
      },
    ],
    termos: ["uefi", "bios", "bsod", "bitlocker"],
    fontes: [
      {
        titulo: "Microsoft Learn — Bug Check Code Reference",
        url: "https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-code-reference2",
        nota: "referência dos códigos exibidos quando a falha ocorre nas etapas 4–5",
      },
    ],
  },
  {
    slug: "verificador-de-backup",
    nome: "Verificador orientativo de backup",
    nomeCurto: "Verificador de backup",
    resumo:
      "6 perguntas honestas sobre a sua rotina de backup — cobertura, frequência, isolamento e teste — para descobrir se ela sobreviveria a uma perda real.",
    objetivo:
      "Avaliar a rotina de backup existente contra os cenários reais de perda: falha de disco, roubo, ransomware e erro humano. O resultado é um mapa do que está coberto e do que está exposto.",
    limites:
      "O verificador avalia a ESTRATÉGIA, não a integridade técnica de cada arquivo — isso só um teste real de restauração revela. Ele não substitui a implantação assistida em ambiente com dados críticos de trabalho.",
    avisoSeguranca:
      "Nenhuma pergunta exige mexer nos backups existentes. O único passo prático — restaurar UM arquivo de teste — deve ser feito em pasta separada, nunca por cima do original.",
    risco: "Seguro de fazer sozinho",
    passos: [
      {
        id: "existencia",
        titulo: "Existe backup — de verdade?",
        descricao:
          "'Os arquivos estão no computador' não é backup. 'Estão num HD externo que fica na gaveta' é backup. 'Sincronizam com a nuvem' é meio backup (sincronização replica exclusões e arquivos sequestrados). Backup real = cópia independente, em outro lugar, que não morre junto com o original.",
      },
      {
        id: "cobertura",
        titulo: "O backup cobre o que realmente importa?",
        descricao:
          "Liste as 5 coisas cuja perda seria pior: fotos de família? Documentos de trabalho? Certificado digital? E-mails locais? Agora confira: TODAS estão dentro do backup? A pasta que mais importa costuma ser justamente a que ficou fora.",
      },
      {
        id: "frequencia",
        titulo: "Qual a idade do backup mais recente?",
        descricao:
          "A pergunta prática: se o disco morresse AGORA, quanto trabalho você perderia? Uma semana? Seis meses? A frequência certa depende do quanto seus dados mudam — quem trabalha no computador todo dia não pode depender de backup semestral.",
      },
      {
        id: "isolamento",
        titulo: "Alguma cópia fica desconectada e fora do local?",
        descricao:
          "Ransomware criptografa tudo que está conectado, incêndio e furto levam o que está no mesmo endereço. A regra 3-2-1 existe por isso: 3 cópias, 2 tipos de mídia, 1 fora do local (nuvem de backup real ou disco guardado em outro endereço).",
      },
      {
        id: "teste-restauracao",
        titulo: "A restauração já foi testada?",
        descricao:
          "Escolha um arquivo qualquer do backup e restaure-o numa pasta de teste. Abra. Funcionou? Esse teste de 5 minutos é o que separa backup de esperança — cadeias incrementais corrompidas e HDs externos mortos são descobertos assim, no ensaio e não na emergência.",
        alerta: "Se o arquivo de teste não abrir ou o destino do backup não responder, trate como incidente: seu backup atual pode não existir de fato.",
      },
      {
        id: "automacao",
        titulo: "O backup depende de você lembrar?",
        descricao:
          "Backup manual falha no mês mais ocupado — exatamente quando mais dados novos existem. Rotina automática com verificação ocasional bate rotina manual perfeita, porque a manual perfeita não existe.",
      },
    ],
    interpretacoes: [
      {
        cenario: "As 6 respostas confortáveis: cobertura completa, cópia isolada, teste feito",
        leitura: "Sua rotina está acima da imensa maioria — o risco residual é baixo e conhecido.",
        proximoPasso: "Mantenha o teste de restauração na agenda (a cada poucos meses) e siga em frente.",
      },
      {
        cenario: "Backup existe, mas nunca foi testado ou vive permanentemente conectado",
        leitura: "Os dois modos de falha mais comuns na prática: a cópia que não restaura e a cópia que o ransomware alcança.",
        proximoPasso: "Teste um arquivo hoje e desconecte a mídia; a página de backup mostra como estruturar o isolamento.",
        to: "/solucoes/backup",
      },
      {
        cenario: "Não existe backup do que mais importa",
        leitura: "Cada dia é uma aposta contra falha de disco, roubo e golpe — e discos falham sem aviso prévio.",
        proximoPasso: "Comece hoje pela cópia simples em HD externo; a estruturação completa pode vir depois.",
        to: "/solucoes/backup",
      },
      {
        cenario: "Dados de empresa (financeiro, clientes, fiscal) sem rotina verificada",
        leitura: "Aqui a perda tem consequência legal e operacional — o padrão exigido é outro.",
        proximoPasso: "O serviço de backup empresarial implanta rotina com verificação periódica.",
        to: "/servicos/backup-para-empresas",
      },
    ],
    quandoParar: [
      "O disco onde vivem os originais mostra qualquer sintoma (lentidão súbita, ruído, arquivos corrompidos): priorize copiar o essencial AGORA, antes de reorganizar qualquer rotina.",
      "O arquivo de teste restaurado veio corrompido: não sobrescreva nada e investigue a mídia de backup antes de confiar nela de novo.",
    ],
    conclusao:
      "Backup é o único assunto desta biblioteca em que o atraso não perdoa: discos falham sem aviso e golpes não marcam hora. Se o verificador expôs lacunas, a correção mais barata é a que começa hoje.",
    links: [
      {
        rotulo: "Backup e recuperação: solução completa",
        to: "/solucoes/backup",
        contexto: "Estruturação da rotina 3-2-1 para casa e escritório.",
      },
      {
        rotulo: "Glossário: backup incremental",
        to: "/glossario/backup-incremental",
        contexto: "Como funciona a cadeia incremental que o teste de restauração valida.",
      },
      {
        rotulo: "Recuperação de dados: quando não houve backup",
        to: "/servicos/recuperacao-de-dados",
        contexto: "O plano B — mais caro e sem garantia — que o backup evita.",
      },
    ],
    termos: ["backup-incremental", "imagem-do-sistema", "recuperacao-de-dados", "smart"],
    fontes: [
      {
        titulo: "CERT.br — Cartilha de Segurança para Internet",
        url: "https://cartilha.cert.br/",
        nota: "fascículo oficial sobre backup",
      },
      {
        titulo: "StopRansomware (CISA)",
        url: "https://www.stopransomware.gov/",
        nota: "backups isolados como defesa central contra ransomware",
      },
    ],
  },
  {
    slug: "ssd-ou-ram",
    nome: "SSD ou RAM: orientação inicial",
    nomeCurto: "SSD ou RAM",
    resumo:
      "Roteiro de observação em 5 passos para identificar qual upgrade o SEU uso realmente pede — antes de gastar com o componente errado.",
    objetivo:
      "Usar o Gerenciador de Tarefas — sem instalar nada — para observar qual recurso satura no seu uso real e apontar o upgrade com maior chance de resolver.",
    limites:
      "Orientação inicial, não laudo: casos mistos (disco E memória no limite), disco degradado e superaquecimento mudam a recomendação. O roteiro indica a direção; o diagnóstico presencial confirma compatibilidade e prioridade.",
    avisoSeguranca:
      "Todos os passos são de leitura. Nenhum exige compra, desmontagem ou alteração de configuração. Observe durante o seu uso REAL — medição com o computador ocioso não representa nada.",
    risco: "Seguro de fazer sozinho",
    passos: [
      {
        id: "tipo-disco",
        titulo: "Descubra se o disco atual é HD ou SSD",
        descricao:
          "Gerenciador de Tarefas (Ctrl+Shift+Esc) → aba Desempenho: o disco aparece identificado como HDD ou SSD. Este único dado já reordena tudo: com HD mecânico, o SSD quase sempre é o primeiro upgrade; com SSD instalado, a investigação vira para a memória.",
      },
      {
        id: "medir-uso",
        titulo: "Reproduza seu uso pesado típico",
        descricao:
          "Abra o que você normalmente abre junto: navegador com as abas de sempre, planilha, reunião, sistema da empresa. A medição vale para o SEU padrão — o gargalo de quem edita vídeo não é o de quem usa 40 abas.",
      },
      {
        id: "ler-memoria",
        titulo: "Leia a memória sob carga",
        descricao:
          "Aba Desempenho → Memória, com tudo aberto: uso consistente acima de ~90% significa RAM saturada e sistema paginando para o disco. Entre 50–70%, a RAM está folgada — e comprar mais não mudará nada perceptível.",
      },
      {
        id: "ler-disco",
        titulo: "Leia o disco sob carga",
        descricao:
          "Aba Processos → coluna Disco: 100% constante (não só picos ao abrir programas) indica gargalo de armazenamento. Combine com o passo 1: HD a 100% é o cenário clássico de troca por SSD; SSD a 100% constante merece investigação (saúde do disco, software).",
        alerta: "SSD constantemente em 100% sem carga que justifique pode indicar problema de saúde do disco ou software fora de controle — verifique o S.M.A.R.T. antes de comprar qualquer coisa.",
      },
      {
        id: "cruzar",
        titulo: "Cruze as duas leituras",
        descricao:
          "Quatro combinações possíveis: disco saturado + memória folgada → SSD. Memória saturada + disco acompanhando → RAM. Ambos saturados → provavelmente os dois (e o SSD costuma vir primeiro pela percepção). Nenhum saturado → o gargalo é outro: temperatura, software, processador.",
      },
    ],
    interpretacoes: [
      {
        cenario: "HD mecânico + disco em 100% + memória abaixo de 80%",
        leitura: "Cenário clássico de SSD: a troca tende a transformar a experiência — boot, aberturas e resposta geral.",
        proximoPasso: "O serviço de upgrade cobre clonagem e verificação do disco de origem.",
        to: "/servicos/upgrade-ssd-ram",
      },
      {
        cenario: "Memória acima de 90% no uso normal + disco paginando",
        leitura: "RAM insuficiente para a sua carga: mais memória resolve a degradação 'ao longo do dia'.",
        proximoPasso: "Antes de comprar, confirme tipo e máximo suportado — o upgrade errado não encaixa ou não estabiliza.",
        to: "/servicos/upgrade-ssd-ram",
      },
      {
        cenario: "Nenhum recurso satura, mas a lentidão existe",
        leitura: "O gargalo está fora do par SSD/RAM: temperatura (throttling), software problemático ou processador no limite.",
        proximoPasso: "Rode o checklist completo de computador lento para capturar o padrão.",
        to: "/ferramentas/checklist-computador-lento",
      },
    ],
    quandoParar: [
      "S.M.A.R.T. do disco atual com atributos críticos alterados: a prioridade deixa de ser desempenho e vira preservação dos dados.",
      "Lentidão acompanhada de tela azul ou congelamentos totais: o cenário é de instabilidade, não de upgrade.",
    ],
    conclusao:
      "O upgrade certo se paga na primeira semana; o errado vira gaveta. Leve as duas leituras (memória e disco sob carga) para a triagem via WhatsApp e a recomendação já sai calibrada para o seu equipamento e orçamento.",
    links: [
      {
        rotulo: "Guia de decisão no Atlas: SSD ou RAM",
        to: "/guia-tecnico-informatica",
        contexto: "A versão de decisão com sinais observáveis na trilha do Atlas.",
      },
      {
        rotulo: "Glossário: SSD",
        to: "/glossario/ssd",
        contexto: "O que a troca resolve — e o que ela não resolve.",
      },
      {
        rotulo: "Glossário: memória RAM",
        to: "/glossario/memoria-ram",
        contexto: "Como a paginação transforma falta de RAM em disco a 100%.",
      },
    ],
    termos: ["ssd", "memoria-ram", "nvme", "smart"],
    fontes: [
      {
        titulo: "smartmontools — documentação oficial",
        url: "https://www.smartmontools.org/",
        nota: "verificação da saúde do disco citada no passo 4",
      },
    ],
  },
  // ── ONDA 11B ──────────────────────────────────────────────────────────────
  {
    slug: "roteiro-wifi-instavel",
    nome: "Wi-Fi instável: roteiro de observação",
    nomeCurto: "Wi-Fi instável",
    resumo:
      "Roteiro em 6 passos para separar o que é do provedor, do roteador e do seu computador — antes de trocar aparelho ou contratar plano maior.",
    objetivo:
      "Organizar observações simples, feitas sem instalar nada, que localizam em qual trecho da conexão a instabilidade acontece: link do provedor, roteador e ambiente, ou o dispositivo específico.",
    limites:
      "Roteiro orientativo, não medição de rede profissional. Ele indica o trecho provável; problemas intermitentes de cabeamento, interferência industrial e configuração de provedor exigem verificação presencial com equipamento adequado.",
    avisoSeguranca:
      "Todos os passos são de observação e de reinício de equipamento. Nenhum exige alterar a senha da rede, redefinir o roteador para padrão de fábrica ou mexer em configuração do provedor — redefinição apaga a configuração e costuma deixar a casa sem internet.",
    risco: "Seguro de fazer sozinho",
    passos: [
      {
        id: "quem-cai",
        titulo: "Descubra se cai para todos ou só para um aparelho",
        descricao:
          "Com a instabilidade acontecendo, teste em outro dispositivo conectado à mesma rede: celular, TV, segundo computador. Se só um aparelho perde conexão, a investigação vira para o adaptador e o driver dele; se todos caem juntos, o trecho é roteador ou provedor.",
      },
      {
        id: "cabo-vs-sem-fio",
        titulo: "Compare cabo e sem fio",
        descricao:
          "Se houver possibilidade de ligar um cabo de rede direto no roteador, observe se a queda continua. Estabilidade no cabo e instabilidade no sem fio isola o problema na propagação do sinal, não no link contratado.",
      },
      {
        id: "distancia-obstaculo",
        titulo: "Observe distância e obstáculos",
        descricao:
          "Fique perto do roteador, na mesma sala, e repita o uso que falhava. Se a queda desaparece, o problema é alcance: parede de concreto, caixa de metal, roteador dentro de armário ou no chão são as causas comuns.",
      },
      {
        id: "faixa",
        titulo: "Verifique em qual faixa você está conectado",
        descricao:
          "Redes de 5 GHz entregam mais velocidade e alcançam menos; as de 2,4 GHz alcançam mais e sofrem mais interferência. Se as duas aparecem com nomes diferentes, teste a mesma tarefa em cada uma e anote o comportamento.",
        alerta: "Queda que só acontece quando o micro-ondas ou o telefone sem fio está em uso é interferência clássica na faixa de 2,4 GHz.",
      },
      {
        id: "horario",
        titulo: "Anote horário e padrão de uso",
        descricao:
          "Registre por dois ou três dias quando a queda acontece: sempre no mesmo horário, sempre em chamada de vídeo, sempre quando alguém liga a TV. Padrão repetido é a informação mais valiosa para quem for atender — inclusive para o suporte do provedor.",
      },
      {
        id: "reiniciar",
        titulo: "Reinicie na ordem correta e reobserve",
        descricao:
          "Desligue o modem/roteador da tomada, aguarde os equipamentos apagarem por completo, religue e espere a sincronização terminar antes de reconectar os aparelhos. Reinício resolve estados travados; se o padrão voltar no mesmo dia, o problema é estrutural.",
      },
    ],
    interpretacoes: [
      {
        cenario: "Só um computador cai; os demais aparelhos permanecem conectados",
        leitura:
          "Aponta para o adaptador de rede desse computador ou para o driver dele — não para o roteador nem para o provedor.",
        proximoPasso: "Verifique o driver do adaptador pelos caminhos oficiais antes de qualquer troca de equipamento.",
        to: "/glossario/driver",
      },
      {
        cenario: "Todos os aparelhos caem juntos, e o cabo também",
        leitura:
          "Aponta para o link do provedor ou para o próprio roteador. O registro de horários feito no passo 5 é o que sustenta a abertura de chamado.",
        proximoPasso: "Reúna as anotações de horário e acione o provedor com evidência de padrão.",
      },
      {
        cenario: "Cabo estável, sem fio instável, e melhora perto do roteador",
        leitura: "Propagação de sinal: posição do roteador, obstáculos ou cobertura insuficiente para a área usada.",
        proximoPasso: "Avalie reposicionamento e cobertura antes de contratar plano maior — velocidade contratada não atravessa parede.",
        to: "/servicos/redes-e-wifi",
      },
      {
        cenario: "Queda em horários fixos, coincidindo com aparelhos ligados",
        leitura: "Interferência ou congestionamento de canal, típico da faixa de 2,4 GHz em prédios e regiões densas.",
        proximoPasso: "Registre o padrão e trate como ajuste de canal e faixa, não como defeito do computador.",
        to: "/problemas/wifi-instavel",
      },
    ],
    quandoParar: [
      "Cheiro de queimado, aquecimento anormal ou deformação na fonte do roteador — desligue da tomada e não religue.",
      "Cabo de rede ou conector visivelmente danificado: pare de forçar o encaixe.",
      "Equipamento do provedor lacrado: não abra e não redefina; a intervenção é do prestador.",
      "Rede de empresa com servidor, firewall ou sistema de gestão envolvido — a observação doméstica não cobre esse cenário.",
    ],
    conclusao:
      "Ao final você terá três informações objetivas: quem cai, em que trecho e com qual padrão de horário. Com isso, a conversa deixa de ser 'a internet está ruim' e passa a ser um chamado com evidência — seja para o provedor, seja para o atendimento técnico.",
    links: [
      {
        rotulo: "Wi-Fi instável: diagnóstico do sintoma",
        to: "/problemas/wifi-instavel",
        contexto: "Página diagnóstica com as causas mais comuns e o que cada uma exige.",
      },
      {
        rotulo: "Redes e Wi-Fi",
        to: "/servicos/redes-e-wifi",
        contexto: "Quando a cobertura ou o cabeamento precisam de intervenção presencial.",
      },
      {
        rotulo: "DNS no glossário",
        to: "/glossario/dns",
        contexto: "Por que 'a internet caiu' às vezes é só a tradução de nomes falhando.",
      },
    ],
    termos: ["dns", "nat", "driver"],
    fontes: [
      {
        titulo: "Anatel — Qualidade da banda larga fixa",
        url: "https://www.gov.br/anatel/pt-br/assuntos/noticias",
        nota: "referência oficial sobre direitos e qualidade do serviço contratado",
      },
      {
        titulo: "CERT.br — Cartilha de Segurança para Internet",
        url: "https://cartilha.cert.br/",
        nota: "boas práticas de configuração segura de rede doméstica",
      },
    ],
  },
];


export const ferramentaPorSlug = (slug: string): FerramentaTecnica | undefined =>
  FERRAMENTAS_TECNICAS.find((f) => f.slug === slug);
