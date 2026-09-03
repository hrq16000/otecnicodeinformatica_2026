import { useMemo } from "react";
import { isEditorialApproved } from "@/lib/blogEditorialRegistry";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import { getArticleSources } from "@/lib/blogEditorialSources";
import { SITE_BASE_URL } from "@/lib/siteConfig";


type FAQItem = { q: string; a: string };

const BASE_FAQ: FAQItem[] = [
  {
    q: "Quanto custa o atendimento em Curitiba?",
    a: "A visita técnica em Curitiba começa em R$ 99,99 e o valor do atendimento do serviço é apresentado antes da execução. Você só aprova se concordar.",
  },
  {
    q: "Em quanto tempo o técnico atende?",
    a: "Atendemos conforme a disponibilidade da agenda em Curitiba e região metropolitana, conforme disponibilidade da agenda. Confirme o horário pelo WhatsApp.",
  },
  {
    q: "Atende em domicílio ou só na bancada?",
    a: "Atendemos a domicílio em Curitiba e região, com opção de coleta e entrega quando o serviço exigir bancada.",
  },
  {
    q: "Quais formas de pagamento são aceitas?",
    a: "Aceitamos PIX, dinheiro e cartão. Pagamento somente após o serviço entregue e aprovado.",
  },
];

const CATEGORY_EXTRA: Record<string, FAQItem[]> = {
  CFTV: [
    {
      q: "Vocês instalam câmeras em residência e comércio?",
      a: "Sim. Fazemos projeto, passagem de cabos, instalação de DVR/NVR e configuração de acesso remoto pelo celular.",
    },
  ],
  Formatação: [
    {
      q: "A formatação apaga meus arquivos?",
      a: "Antes da formatação fazemos backup dos seus arquivos importantes. Você aprova o que deve ser preservado.",
    },
  ],
  Vírus: [
    {
      q: "Vocês removem vírus sem perder meus arquivos?",
      a: "Na maioria dos casos sim. Avaliamos o tipo de infecção e priorizamos preservar seus dados.",
    },
  ],
  Notebook: [
    {
      q: "Vocês consertam qualquer marca de notebook?",
      a: "Atendemos as principais marcas: Dell, Lenovo, Acer, HP, Samsung, Asus, Positivo, Apple e outras.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// FAQ EDITORIAL POR ARTIGO (pilotos em revisão).
// Perguntas específicas por tema, distintas entre si, sem preço,
// sem prazo prometido e sem promessa de resultado. Quando um slug
// tem override aqui, ele NÃO usa o BASE_FAQ nem os extras de
// categoria (que contêm valores comerciais).
// ─────────────────────────────────────────────────────────────
const PILOT_FAQ: Record<string, FAQItem[]> = {
  // ── Onda 10D — satélites de partida, curto e BIOS (sem preço, sem prazo).
  "botao-power-nao-funciona-jump-start-placa-mae": [
    {
      q: "Como saber se o problema é o botão de ligar e não a fonte?",
      a: "Desconecte o plugue do par PWR_SW do painel frontal e, com a fonte ligada, encoste rapidamente uma chave de fenda nos dois pinos. Se a máquina partir sem o botão e não partir com ele, o defeito está no botão ou no cabo dele.",
    },
    {
      q: "Encostar a chave nos pinos pode danificar a placa?",
      a: "O par de partida não tem polaridade e trabalha com sinal, não com corrente de carga. O risco está em tocar o par errado ou trilhas vizinhas. Confirme a identificação pela serigrafia ou pelo manual do modelo, use chave com cabo isolado e mantenha o contato por menos de um segundo.",
    },
    {
      q: "Dá para usar o botão de reiniciar no lugar do de ligar?",
      a: "Sim, como solução provisória. Eletricamente as duas são chaves momentâneas iguais: basta mover o conector do reset para o par de partida. O botão frontal correto continua sendo a substituição adequada.",
    },
    {
      q: "Esse teste vale para notebook?",
      a: "Não. Em notebooks e all-in-one o botão fica em uma placa auxiliar ligada por cabo flat, sem par de pinos acessível. A verificação exige desmontagem e medição de bancada.",
    },
    {
      q: "Se nem pelos pinos liga, qual é o próximo passo?",
      a: "O botão está descartado. A sequência passa a ser verificar a fonte de alimentação e, persistindo o quadro, avaliar a placa-mãe com teste de bancada mínima, fora do gabinete.",
    },
  ],
  "curto-circuito-placa-mae-como-identificar": [
    {
      q: "Ventoinha gira meio segundo e desliga: é curto?",
      a: "É o padrão típico de proteção da fonte disparando por consumo fora do esperado, o que inclui curto na placa ou em algum componente ligado a ela. Também pode ocorrer por fonte em degradação, por isso o teste com outra fonte comprovadamente boa faz parte do roteiro.",
    },
    {
      q: "O que é o teste de bancada mínima?",
      a: "É ligar a placa fora do gabinete, apoiada sobre material não condutivo, apenas com processador, cooler, um módulo de memória e a fonte. Se assim ela liga, o curto vinha do contato com o gabinete ou de um periférico, que devem ser reintroduzidos um por vez.",
    },
    {
      q: "Capacitor estufado significa placa perdida?",
      a: "Não necessariamente. A substituição é possível em nível de componente, com peça de mesma especificação e ferro de solda adequado. A decisão costuma ser econômica: em placas comuns o custo do reparo pode se aproximar do de uma placa nova.",
    },
    {
      q: "Parafuso solto pode causar isso?",
      a: "Pode, e é uma das causas mais frequentes. Espaçador metálico em posição sem furo correspondente, parafuso extra ou chapa tocando a solda criam caminho de corrente indevido e derrubam a alimentação na partida.",
    },
    {
      q: "Posso medir com multímetro em casa?",
      a: "Medição de continuidade só é válida com o equipamento desligado e o cabo removido. Sem prática de leitura, o resultado leva a troca de peças boas. Havendo cheiro de queimado, marca escura ou líquido derramado, interrompa e leve para avaliação de bancada.",
    },
  ],
  // ── Onda 10C / Lote 2 — internet/Wi-Fi (triagem) e impressoras.
  "internet-lenta-provedor-ou-roteador": [
    {
      q: "Como saber se a internet lenta é culpa do provedor?",
      a: "Meça a velocidade com o computador ligado por cabo direto no roteador, três vezes, em horários diferentes. Se o resultado por cabo ficar muito abaixo do contratado em todas as medições, a suspeita é da entrega da operadora. Se o cabo entrega bem, o gargalo está dentro de casa.",
    },
    {
      q: "Por que o Wi-Fi é mais lento que o cabo?",
      a: "O sinal sem fio perde intensidade com distância, paredes, laje e concorrência de redes vizinhas. Uma diferença existe sempre; o que indica problema é o Wi-Fi entregar muito pouco mesmo a um ou dois metros do roteador.",
    },
    {
      q: "Trocar por um plano mais rápido resolve?",
      a: "Não, quando o limite é a rede interna. Se o Wi-Fi já não entrega a velocidade atual, ele não entregará o dobro. Vale contratar mais velocidade só depois de confirmar, por cabo, que a entrega atual está sendo consumida por inteiro.",
    },
    {
      q: "Repetidor de sinal melhora a velocidade?",
      a: "Só quando instalado em um ponto que ainda recebe sinal bom. Colocado onde o sinal já está fraco, ele repete um sinal ruim e costuma piorar a experiência.",
    },
    {
      q: "O que registrar antes de abrir chamado com a operadora?",
      a: "Data, hora e resultado das medições feitas por cabo, com os demais aparelhos parados. Esse histórico sustenta o pedido de verificação do enlace, em vez de apenas um reinício remoto.",
    },
  ],
  "impressora-offline-como-resolver": [
    {
      q: "O que significa a impressora aparecer offline?",
      a: "Significa que o Windows tentou falar com a impressora e não obteve resposta. Em rede, a causa mais comum é o aparelho ter voltado com outro endereço IP; por cabo, costuma ser porta, cabo ou serviço de impressão parado.",
    },
    {
      q: "Por que a impressora some depois de ficar desligada alguns dias?",
      a: "O roteador entrega endereços por empréstimo e com prazo. Passado o prazo, a impressora pode voltar com um endereço diferente enquanto o computador continua chamando o antigo. Criar uma reserva de endereço no roteador evita a repetição.",
    },
    {
      q: "Como descubro o endereço atual da impressora?",
      a: "Pelo menu do próprio aparelho, imprimindo a página de configuração de rede. Ela mostra o endereço em uso e se o Wi-Fi está realmente conectado.",
    },
    {
      q: "Preciso reinstalar a impressora para resolver?",
      a: "Na maioria dos casos não. Corrigir a porta cadastrada para o endereço atual e desmarcar as opções de pausa e de uso offline resolve sem remover nada.",
    },
    {
      q: "A impressora está offline só em um computador. O que muda?",
      a: "Indica configuração local desse computador, normalmente porta antiga cadastrada. Se estivesse offline em todos, a suspeita passaria para a conexão de rede do próprio aparelho.",
    },
  ],
  "fila-de-impressao-travada-spooler-windows": [
    {
      q: "O que é o spooler de impressão?",
      a: "É o serviço do Windows que grava o documento em um arquivo temporário e cuida do envio para a impressora. Quando esse arquivo corrompe, o serviço trava e a fila congela.",
    },
    {
      q: "Como limpar a fila de impressão travada?",
      a: "Pare o serviço Spooler de Impressão em services.msc, apague todo o conteúdo da pasta C:\\Windows\\System32\\spool\\PRINTERS e inicie o serviço novamente. Depois reenvie um documento de uma página para confirmar.",
    },
    {
      q: "Apagar os arquivos dessa pasta remove minhas impressoras?",
      a: "Não. Aqueles arquivos são apenas trabalhos pendentes. As impressoras cadastradas e os drivers permanecem instalados.",
    },
    {
      q: "Por que o documento fica preso em \"excluindo\"?",
      a: "Porque o serviço não consegue concluir nem descartar o trabalho corrompido enquanto estiver em execução. Por isso o procedimento exige parar o serviço antes de limpar a pasta.",
    },
    {
      q: "O spooler cai toda hora. É driver?",
      a: "Provavelmente sim, quando o serviço para logo após cada envio. Remova a impressora, reinicie e instale o pacote oficial do modelo exato baixado do fabricante, em vez de um driver genérico.",
    },
  ],
  "bios-corrompida-reset-cmos-atualizacao": [
    {
      q: "Qual a diferença entre limpar o CMOS e regravar a BIOS?",
      a: "Limpar o CMOS apaga apenas as configurações guardadas, alimentadas pela bateria de lítio. Regravar a BIOS substitui o firmware gravado no chip da placa. O primeiro é procedimento de dois minutos; o segundo só é necessário quando o firmware corrompeu de fato.",
    },
    {
      q: "Como faço o reset de CMOS corretamente?",
      a: "Com a máquina desligada, chave da fonte em O e cabo removido, segure o botão de ligar por dez segundos para descarregar. Depois mova o jumper CLR_CMOS para a posição adjacente por dez segundos e devolva, ou retire a bateria de lítio por cerca de cinco minutos.",
    },
    {
      q: "Como sei que o firmware corrompeu de verdade?",
      a: "Quando o Setup não abre em nenhuma condição: tela permanece preta, sem imagem, ainda que ventoinhas girem. Se o Setup abre, o firmware está íntegro e o caso é de configuração.",
    },
    {
      q: "O reset apaga alguma coisa importante?",
      a: "Apaga senha de Setup, perfis de memória XMP/EXPO e ajustes personalizados. Em máquinas com criptografia de disco ativa, a alteração pode exigir a chave de recuperação na próxima partida — confirme que você tem essa chave antes.",
    },
    {
      q: "Vale a pena atualizar a BIOS por precaução?",
      a: "Não. Atualização de firmware não é manutenção de rotina e não melhora desempenho. Faça apenas com motivo declarado, como suporte a um processador novo, correção de segurança divulgada ou incompatibilidade documentada, sempre com o arquivo do modelo e revisão exatos.",
    },
  ],
  // ── Onda 10C — Lote 3: armazenamento não detectado e áudio.
  "hd-nao-e-reconhecido-na-bios-o-que-fazer": [
    {
      q: "O que fazer quando o HD não aparece na BIOS?",
      a: "Desligue pela chave da fonte, reassente o disco, troque o cabo de dados e a porta SATA e teste o disco sozinho. Se ele continuar sem ser listado em outra porta e em outra máquina, a falha é do próprio disco.",
    },
    {
      q: "Por que o HD antigo sumiu depois que instalei um SSD M.2?",
      a: "Em muitas placas-mãe, ocupar um slot M.2 desabilita portas SATA específicas por compartilhamento de faixas. A tabela de compatibilidade está no manual da placa.",
    },
    {
      q: "Disco que faz clique pode ser testado?",
      a: "Não. Ruído repetitivo indica falha mecânica e cada nova tentativa de leitura reduz a chance de recuperação. Desligue e trate o caso como recuperação de dados, não como reparo.",
    },
    {
      q: "O disco aparece na BIOS, mas não no Windows. É o mesmo problema?",
      a: "Não. Se a BIOS lista o disco, o hardware foi reconhecido e falta apenas inicializar, particionar e atribuir letra no Gerenciamento de Disco.",
    },
    {
      q: "Trocar o cabo SATA faz diferença?",
      a: "Faz. Cabo dobrado ou com mau contato é uma das causas mais comuns de disco intermitente e de erros de CRC no SMART, e é o componente mais barato de substituir.",
    },
  ],
  "ssd-nvme-nao-aparece-no-gerenciador-de-discos": [
    {
      q: "Como fazer o SSD novo aparecer no Windows?",
      a: "Abra o Gerenciamento de Disco, inicialize o disco em GPT, crie um Novo Volume Simples com o tamanho total, formate em NTFS e atribua uma letra. Depois disso ele aparece no Explorador.",
    },
    {
      q: "Devo escolher GPT ou MBR?",
      a: "GPT em qualquer máquina moderna com UEFI. MBR só faz sentido em equipamentos antigos ou em compatibilidade específica declarada.",
    },
    {
      q: "O disco aparece como RAW. Posso formatar?",
      a: "Só se não houver dados que você precise. RAW significa sistema de arquivos ilegível: formatar resolve o sintoma e destrói o conteúdo. Com arquivos importantes, o caminho é recuperação de dados.",
    },
    {
      q: "Meu SSD M.2 não aparece nem no Gerenciamento de Disco. O que houve?",
      a: "Ele não foi enumerado. Verifique se o slot aceita o tipo da placa (NVMe ou SATA M.2), se o encaixe está firme e se o slot não está desabilitado pela configuração do firmware.",
    },
    {
      q: "Depois de clonar, o Windows mostra dois discos iguais. É problema?",
      a: "É esperado logo após a clonagem. Mantenha um deles desconectado no primeiro boot para evitar confusão de assinatura e de ordem de partida.",
    },
  ],
  "disco-com-setores-defeituosos-smart-o-que-fazer": [
    {
      q: "Devo rodar CHKDSK quando o SMART acusa problema?",
      a: "Não como primeira ação. Em disco com ruído, SMART crítico, desconexões ou dados sem cópia, o CHKDSK força leituras e escritas em áreas frágeis e pode inviabilizar a recuperação. Copie os arquivos primeiro; o CHKDSK só cabe em disco saudável com corrupção lógica.",
    },
    {
      q: "O que significa setor realocado?",
      a: "É um setor que o disco marcou como ruim e substituiu por outro da reserva interna. Qualquer valor acima de zero pede backup imediato, e um contador que cresce indica degradação em curso.",
    },
    {
      q: "O SMART diz OK. Posso confiar?",
      a: "Nem sempre. O veredito geral costuma continuar aprovado mesmo com contadores críticos subindo. Observe a tendência dos indicadores em duas leituras separadas por alguns dias.",
    },
    {
      q: "Qual é a ordem correta de trabalho?",
      a: "Parar de usar o disco, copiar primeiro o que é essencial para outra unidade, fazer imagem bit a bit quando a leitura falhar, e só então investigar a mídia e decidir a substituição.",
    },
    {
      q: "Erro de CRC no SMART significa disco ruim?",
      a: "Normalmente não. Esse contador aponta erros no enlace de dados, quase sempre cabo ou porta. Troque o cabo, zere a observação e reavalie.",
    },
  ],
  "computador-sem-som-o-que-verificar": [
    {
      q: "Por que meu computador ficou sem som de repente?",
      a: "Na maioria das vezes o Windows passou a entregar o áudio para outra saída — monitor por HDMI, headset Bluetooth ou placa de captura. Confira o dispositivo de saída ativo antes de mexer em driver.",
    },
    {
      q: "O que significa \"nenhum dispositivo de saída de áudio encontrado\"?",
      a: "Que o sistema não enxerga nenhum controlador de som utilizável, normalmente por driver ausente ou dispositivo desabilitado no Gerenciador de Dispositivos.",
    },
    {
      q: "O som some só em um programa. É defeito?",
      a: "Não. É o Mixer de volume: um aplicativo pode ficar mudo isoladamente enquanto o restante do sistema toca normalmente.",
    },
    {
      q: "Preciso formatar para recuperar o áudio?",
      a: "Raramente. Formatação só entra quando o sistema já apresenta instabilidade em várias frentes; para o áudio isolado, a correção está na saída padrão, no serviço ou no driver.",
    },
    {
      q: "Como sei que o problema é hardware?",
      a: "Quando um canal falha de forma consistente com cabos e fones diferentes, quando houve queda ou líquido, ou quando o conector está folgado. Nesses casos a avaliação é presencial.",
    },
  ],
  "fone-de-ouvido-nao-e-reconhecido-no-pc": [
    {
      q: "Por que o fone funciona atrás e não na entrada da frente?",
      a: "Porque o painel frontal depende de um cabo interno ligado à placa-mãe. Quando esse cabo está solto ou não foi conectado na montagem, a entrada frontal não recebe sinal nem detecção.",
    },
    {
      q: "Meu headset toca som, mas o microfone não capta. O que é?",
      a: "Provavelmente plugue combinado em computador com entradas separadas de fone e microfone. Um adaptador em Y ou um headset USB resolve.",
    },
    {
      q: "O fone não aparece na lista de dispositivos ao plugar. O que verifico?",
      a: "A detecção de conector: confira a configuração do painel frontal no utilitário do áudio, o driver instalado e a limpeza do conector, que acumula poeira compactada.",
    },
    {
      q: "Por que o áudio do headset Bluetooth piora nas reuniões?",
      a: "Porque o sistema troca o perfil estéreo pelo perfil de comunicação, que habilita o microfone e reduz a qualidade do som. É comportamento normal do Bluetooth.",
    },
    {
      q: "Só um lado do fone toca. É o computador?",
      a: "Quase sempre é o plugue mal inserido ou o cabo do fone rompido. Teste o mesmo fone em outro aparelho antes de suspeitar da placa.",
    },
  ],
  "servico-de-audio-do-windows-nao-esta-em-execucao": [
    {
      q: "Como reativar o serviço de áudio do Windows?",
      a: "Em services.msc, deixe o Construtor de Ponto de Extremidade de Áudio do Windows em Automático e em execução e, depois, faça o mesmo com o Windows Audio. A ordem importa: o construtor enumera as saídas que o outro serviço usa.",
    },
    {
      q: "O serviço para toda vez que ligo o computador. O que fazer?",
      a: "Isso aponta para driver incompatível. Desinstale o dispositivo em Controladores de som, reinicie e instale o pacote oficial do modelo, baixado do fabricante do notebook ou da placa-mãe.",
    },
    {
      q: "Aparece erro ao tentar iniciar o serviço. Por quê?",
      a: "Porque alguma dependência está parada, normalmente a Chamada de Procedimento Remoto (RPC) ou o agendador multimídia. Inicie as dependências primeiro.",
    },
    {
      q: "O serviço está rodando e mesmo assim não há som. E agora?",
      a: "O problema passa a ser de saída padrão, mixer por aplicativo ou conector. A sequência completa está no artigo sobre computador sem som.",
    },
    {
      q: "Programas que atualizam drivers automaticamente ajudam?",
      a: "Não recomendamos. Eles costumam instalar versões genéricas que recriam o problema. Prefira sempre o pacote específico do modelo, obtido no site do fabricante.",
    },
  ],
  // ── Onda 10C — Lote 4: webcam e Windows Update.
  "webcam-nao-funciona-o-que-verificar": [
    {
      q: "Por que a webcam funciona no Zoom e não no Teams?",
      a: "Porque a permissão e a seleção de dispositivo são configuradas dentro de cada programa. Se um funciona, o hardware e o driver estão bem: verifique a permissão do outro programa e qual câmera ele tem selecionada nas configurações de vídeo.",
    },
    {
      q: "Como saber se a câmera está bloqueada pelo Windows?",
      a: "Abra o aplicativo Câmera do Windows. Se ele exibir aviso de acesso bloqueado, o bloqueio é do sistema. Se a imagem aparecer normalmente, o bloqueio está no programa que falha.",
    },
    {
      q: "Por que a webcam não aparece no Gerenciador de Dispositivos?",
      a: "Porque o Windows não conseguiu enumerar o dispositivo. Em câmera integrada isso aponta para driver, dispositivo desabilitado, cabo interno ou módulo. Em câmera USB, aponta primeiro para porta, hub ou cabo.",
    },
    {
      q: "A imagem fica preta, mas a câmera é reconhecida. É defeito?",
      a: "Não necessariamente. Verifique obturador ou adesivo sobre a lente, feche outros programas que possam estar usando a câmera e teste em ambiente iluminado antes de suspeitar do módulo.",
    },
    {
      q: "Como saber se a câmera do notebook queimou?",
      a: "Quando ela não aparece em nenhuma condição, mesmo após reinstalar o driver oficial do modelo, e o comportamento não muda em outro sistema. Queda, líquido ou desmontagem recente reforçam a suspeita de cabo ou módulo.",
    },
  ],
  "permissoes-de-camera-no-windows": [
    {
      q: "Onde ficam as permissões de câmera no Windows?",
      a: "Em Configurações → Privacidade e segurança → Câmera. Ali existem o acesso à câmera do dispositivo, o acesso de aplicativos, a lista de aplicativos individuais e um item separado para programas de área de trabalho.",
    },
    {
      q: "Liberei tudo e o navegador continua sem imagem. Por quê?",
      a: "Provavelmente falta a permissão do próprio navegador ou a permissão daquele site específico. São camadas independentes do Windows e cada site guarda a própria decisão.",
    },
    {
      q: "Devo deixar o acesso à câmera sempre ligado?",
      a: "Não é obrigatório. Cada permissão concedida é uma decisão de privacidade real. Autorize por aplicativo e por site, e revogue quando não usar mais.",
    },
    {
      q: "As permissões voltam sozinhas depois que eu mudo. O que está acontecendo?",
      a: "Em computador gerenciado por empresa, política de grupo ou software de segurança pode reverter a configuração. Nesse caso, quem administra o parque precisa liberar.",
    },
    {
      q: "Preciso desinstalar o antivírus para a câmera funcionar?",
      a: "Não. Se houver módulo de proteção de câmera, suspenda apenas esse recurso pelo tempo do teste e reative em seguida.",
    },
  ],
  "webcam-usb-nao-e-detectada": [
    {
      q: "Webcam USB precisa de driver?",
      a: "Na maioria dos casos não: o Windows usa um driver de classe genérico. Quando o modelo exige, o pacote correto vem do site do fabricante da câmera, nunca de agregadores de driver.",
    },
    {
      q: "Por que a câmera funciona na porta de trás e não na da frente?",
      a: "Porque as portas frontais dependem de um cabo interno ligado à placa, que pode estar solto ou mal conectado. A porta traseira é ligada diretamente ao controlador e serve como referência de teste.",
    },
    {
      q: "Posso usar a webcam em um hub USB?",
      a: "Pode, desde que o hub tenha fonte própria. Em hub passivo compartilhado com outros periféricos, a câmera costuma desconectar durante a transmissão.",
    },
    {
      q: "Aparece dispositivo desconhecido ao conectar. O que significa?",
      a: "Que o Windows detectou algo na porta, mas não conseguiu identificar o dispositivo. Teste outro cabo e outra porta; se persistir, instale o driver oficial do modelo.",
    },
    {
      q: "Como sei se o problema é da câmera ou do computador?",
      a: "Pelo teste cruzado: conecte a mesma câmera em outro computador. Se funcionar lá, o problema é da sua máquina; se não funcionar em lugar nenhum, é da câmera ou do cabo.",
    },
  ],
  "windows-update-nao-funciona-o-que-verificar": [
    {
      q: "Por que o Windows Update fica em 0%?",
      a: "Normalmente porque a fila de download ficou inconsistente, porque falta espaço em disco ou porque a conexão caiu durante uma transferência anterior. Verifique espaço e rede antes de mexer no cache.",
    },
    {
      q: "DISM e SFC fazem a mesma coisa?",
      a: "Não. A verificação de arquivos do sistema repara arquivos protegidos usando a cópia local de componentes. A ferramenta de manutenção de imagem repara essa própria loja de componentes. Quando a loja está danificada, o reparo da imagem precisa vir antes.",
    },
    {
      q: "É seguro reiniciar o PC durante uma atualização?",
      a: "Não durante a fase de instalação, enquanto houver atividade de disco. Reiniciar nesse momento pode deixar componentes pela metade e provocar reversão ou falha de inicialização.",
    },
    {
      q: "Posso desativar o Windows Update para parar os erros?",
      a: "Não recomendamos. Desativar remove correções de segurança e apenas esconde o sintoma. O mesmo vale para desabilitar o serviço de reparo do Update, que existe justamente para recolocar componentes no lugar.",
    },
    {
      q: "Formatar resolve problema de Windows Update?",
      a: "É o último recurso, não o primeiro. A maior parte dos casos se resolve com triagem, solução de problemas do sistema, tratamento reversível do cache e reparo de componentes.",
    },
    {
      q: "Windows 10 e Windows 11 usam o mesmo procedimento?",
      a: "Os estágios são os mesmos, mas telas e nomes de opções mudam. Confirme sua versão antes de seguir qualquer roteiro, porque instruções de uma versão citam telas que a outra não tem.",
    },
  ],
  "limpar-cache-do-windows-update-softwaredistribution": [
    {
      q: "Posso limpar a SoftwareDistribution?",
      a: "Pode, com cautela e na ordem certa: pare os serviços de atualização e de transferência em segundo plano, renomeie a pasta em vez de apagá-la e reinicie os serviços. O Windows recria a estrutura sozinho.",
    },
    {
      q: "Por que renomear em vez de apagar?",
      a: "Porque renomear é reversível. Se o comportamento piorar, basta restaurar o nome original. Apagar é definitivo, costuma esbarrar em arquivos em uso e deixa o estado pela metade quando feito com os serviços rodando.",
    },
    {
      q: "O que eu perco ao recriar a pasta?",
      a: "Os pacotes já baixados, que serão baixados novamente, e parte do histórico de atualizações. Nenhum arquivo pessoal é afetado.",
    },
    {
      q: "Isso resolve qualquer erro do Windows Update?",
      a: "Não. Ajuda principalmente em download travado e fila corrompida. Falha após 100%, reversão pós-reinício e componentes danificados exigem outro caminho.",
    },
    {
      q: "Posso usar um script pronto de reset do Windows Update?",
      a: "Evite scripts de origem desconhecida. Eles alteram serviços, permissões e registro de uma vez, sem deixar registro do que mudaram, e dificultam voltar atrás.",
    },
  ],
  "windows-update-travado-desfazendo-alteracoes": [
    {
      q: "O que significa a mensagem de desfazendo alterações?",
      a: "Significa que a instalação encontrou um obstáculo depois da reinicialização e o Windows restaurou o estado anterior. É mecanismo de proteção: você perde a atualização, não o sistema.",
    },
    {
      q: "Como saber se a atualização travou de verdade?",
      a: "Observe atividade de disco, variação de rotação das ventoinhas e tempo total. Porcentagem congelada com disco ativo indica etapa demorada, não travamento. Horas sem nenhuma atividade, com a máquina fria, sugerem processo parado.",
    },
    {
      q: "Por que a atualização instala e depois volta atrás?",
      a: "As causas mais comuns são driver incompatível, falta de espaço, componentes do sistema danificados, software de segurança bloqueando alterações profundas e periféricos conectados durante a instalação.",
    },
    {
      q: "Posso desligar no botão quando parece travado?",
      a: "É a última alternativa, e só depois de horas sem qualquer atividade. Interromper à força durante a aplicação aumenta a chance de deixar componentes incompletos.",
    },
    {
      q: "O mesmo código de erro sempre indica a mesma causa?",
      a: "Não. Códigos como os das famílias 0x80070000 e 0x80240000 aparecem em contextos diferentes; o significado depende do estágio em que surgiram. Anote o código e o momento exato.",
    },
    {
      q: "Quando devo parar e pedir ajuda?",
      a: "Diante de reinício em laço, falha de inicialização, pedido de chave de recuperação de criptografia de disco ou dados importantes sem cópia. A prioridade passa a ser preservar os arquivos.",
    },
  ],
  // ── Onda 9C — cluster BIOS (sem preço, sem prazo, sem promessa).
  "computador-entra-direto-na-bios": [
    {
      q: "Por que o computador abre a BIOS em vez do Windows?",
      a: "Porque o firmware não encontrou um carregador de inicialização válido em nenhum dispositivo da lista de prioridade. Em vez de travar com tela preta, ele abre o Setup. As causas mais comuns são disco não detectado, modo de boot trocado entre UEFI e Legacy/CSM, configurações perdidas por bateria CMOS descarregada e tecla presa no teclado.",
    },
    {
      q: "Entrar direto na BIOS significa que o SSD queimou?",
      a: "Não necessariamente. Se o modelo do disco aparece na aba de informações do Setup, o hardware está sendo reconhecido e o problema tende a ser de configuração ou do carregador de inicialização. Se o disco não aparece, ou aparece de forma intermitente, aí sim há suspeita de falha física ou de conexão.",
    },
    {
      q: "Devo desligar o CSM ou deixar ligado?",
      a: "Depende de como o disco foi preparado. Sistema instalado em disco GPT precisa de UEFI, com CSM desabilitado. Sistema instalado em disco MBR precisa de Legacy, com CSM habilitado. Anote o valor atual antes de alterar e teste o modo oposto se a entrada Windows Boot Manager não aparecer.",
    },
    {
      q: "Trocar a bateria da placa-mãe resolve?",
      a: "Resolve quando o sintoma inclui data e hora sempre erradas, mensagem de erro de checksum do CMOS ou configurações que voltam sozinhas ao padrão a cada partida. Depois da troca é necessário reconfigurar modo de boot e ordem de inicialização no Setup.",
    },
    {
      q: "Mexer nas configurações da BIOS apaga meus arquivos?",
      a: "Alterar modo de boot, ordem de prioridade ou carregar os padrões otimizados não apaga arquivos. O que apaga dados são operações feitas dentro do sistema ou de ferramentas de particionamento, como formatar, criar ou excluir partições.",
    },
  ],
  "erro-no-bootable-device-como-resolver": [
    {
      q: "O que significa a mensagem No bootable device?",
      a: "Significa que o firmware procurou um carregador de inicialização e não encontrou nenhum válido. As variações Boot device not found, Operating system not found e Reboot and select proper boot device indicam a mesma condição.",
    },
    {
      q: "Preciso formatar para resolver esse erro?",
      a: "Não na maioria dos casos. Quando o disco é reconhecido, o reparo do carregador com o ambiente de recuperação do Windows costuma resolver preservando os arquivos. Formatar só deve ser considerado depois de confirmada a cópia dos dados.",
    },
    {
      q: "Por que o comando bootrec /fixboot devolve acesso negado?",
      a: "Porque esse comando pertence ao modelo antigo de inicialização, baseado em MBR. Em discos GPT com UEFI, a ferramenta correta é o bcdboot, que recria os arquivos de inicialização dentro da partição de sistema EFI.",
    },
    {
      q: "Como sei se meu disco é GPT ou MBR?",
      a: "No prompt de comando do ambiente de recuperação, execute diskpart e depois list disk. Um asterisco na coluna GPT indica disco GPT. A presença de um volume pequeno em FAT32, de cerca de 100 MB, confirma a partição de sistema EFI.",
    },
    {
      q: "O reparo funcionou e o erro voltou no dia seguinte. O que houve?",
      a: "Reparo que se desfaz costuma indicar setores defeituosos na área de inicialização, disco em degradação ou divergência entre o modo usado no reparo e o modo configurado no Setup. Nesse cenário, o passo seguinte é avaliar a saúde do disco antes de repetir o procedimento.",
    },
  ],
  "troquei-o-ssd-e-o-pc-so-abre-a-bios": [
    {
      q: "SSD novo já vem com Windows instalado?",
      a: "Não. Um SSD de fábrica sai vazio, sem tabela de partições e sem sistema operacional. Por isso o computador para no Setup até que o sistema seja instalado ou clonado a partir do disco anterior.",
    },
    {
      q: "Instalei um SSD M.2 e o HD antigo sumiu. Por quê?",
      a: "Em muitas placas-mãe e notebooks, ativar determinado slot M.2 desabilita automaticamente portas SATA específicas, porque ambos compartilham as mesmas linhas do chipset. O manual da placa indica qual porta é desativada por qual slot.",
    },
    {
      q: "Preciso formatar o SSD antes de instalar o Windows?",
      a: "Não. O instalador do Windows inicializa, particiona e formata o disco durante a instalação. Basta selecionar o espaço não alocado do SSD novo na etapa de escolha do disco.",
    },
    {
      q: "Devo deixar o disco antigo conectado durante a instalação?",
      a: "O recomendado é manter apenas o disco novo conectado. Com dois discos presentes, o instalador pode gravar a partição de inicialização no disco antigo, e a máquina deixa de iniciar quando ele for removido.",
    },
    {
      q: "É melhor clonar ou instalar do zero?",
      a: "Instalar do zero é preferível quando o sistema anterior estava lento, instável ou infectado. Clonar faz sentido quando o sistema funciona bem e há muitos programas configurados, desde que a cópia inclua as partições de inicialização.",
    },
  ],
  // ── Rodada 9B — pilares nacionais (conteúdo educacional, sem preço,
  // sem localidade e sem promessa comercial).
  "o-que-e-informatica": [
    {
      q: "Informática e computação são a mesma coisa?",
      a: "Não exatamente. Computação enfatiza a base científica — algoritmos, teoria e construção de sistemas. Informática é usada com mais frequência para o campo aplicado: usar, configurar, manter e ensinar tecnologia. Na prática, os dois termos têm fronteiras variáveis conforme o contexto.",
    },
    {
      q: "Quem trabalha com informática faz o quê?",
      a: "Depende da trilha. Suporte atende usuários e resolve problemas de hardware, software e rede; infraestrutura cuida de servidores e backups; desenvolvimento escreve software; segurança protege sistemas e dados; a área de dados organiza e interpreta informação. Todas partem dos mesmos fundamentos.",
    },
    {
      q: "Informática básica ensina o quê?",
      a: "Ensina o uso seguro e produtivo do computador: sistema operacional, arquivos e pastas, internet, e-mail, editor de texto, planilhas, impressão, segurança digital e backup. Programação não faz parte desse escopo.",
    },
    {
      q: "Preciso saber programação para entender informática?",
      a: "Não. Programação é uma das áreas da informática, não o requisito de entrada. É possível dominar hardware, redes, suporte e segurança sem escrever código, embora noções de lógica ajudem em qualquer trilha.",
    },
    {
      q: "Qual é a diferença entre informática e tecnologia?",
      a: "Tecnologia é qualquer aplicação de conhecimento para resolver problemas, incluindo áreas sem relação com computadores. Informática é o recorte que trata do processamento automático da informação. Toda informática é tecnologia; nem toda tecnologia é informática.",
    },
  ],

  "informatica-basica": [
    {
      q: "Informática básica dá emprego?",
      a: "Costuma ser pré-requisito e não especialização. Somada a outra competência — administração, atendimento, vendas — amplia as possibilidades. Para cargos técnicos é necessário aprofundar em suporte, redes, segurança ou desenvolvimento.",
    },
    {
      q: "Preciso saber inglês para aprender informática básica?",
      a: "Não. Todos os conceitos fundamentais podem ser aprendidos em português. O inglês ajuda depois, para ler documentação oficial e termos técnicos, mas não é obrigatório no nível básico.",
    },
    {
      q: "Curso presencial ou on-line de informática básica?",
      a: "Os dois funcionam. O presencial oferece acompanhamento próximo e correção imediata; o on-line é mais flexível. Quem ainda tem insegurança com o equipamento tende a avançar mais rápido com acompanhamento presencial.",
    },
    {
      q: "Informática básica inclui programação?",
      a: "Não. O escopo básico pode explicar o que é programação, mas não ensina a programar. Quem quer seguir por esse caminho procura conteúdos específicos de lógica e linguagens.",
    },
    {
      q: "Quanto tempo leva para aprender informática básica?",
      a: "Com prática regular, algumas semanas costumam bastar para autonomia no uso cotidiano. O tempo varia com a frequência de estudo e com a familiaridade prévia com o equipamento; não existe prazo único.",
    },
    {
      q: "O que colocar no currículo?",
      a: "Descreva o que você sabe executar, não um rótulo genérico. Exemplos: edição de documentos, planilhas com fórmulas simples, e-mail corporativo, organização de arquivos, videoconferência e uso de serviços de nuvem.",
    },
  ],

  "como-aprender-informatica": [
    {
      q: "Posso aprender informática sozinho?",
      a: "Sim. A área tem documentação oficial gratuita e permite praticar no próprio computador. Estudar sozinho exige mais disciplina e um roteiro claro — sem isso, é comum pular fundamentos e travar mais adiante.",
    },
    {
      q: "Preciso de um computador potente para começar?",
      a: "Não. Qualquer computador que ligue, abra o navegador e um editor de texto permite cobrir todas as fases iniciais. Equipamento mais potente só se torna relevante em trilhas específicas, como edição de vídeo ou virtualização.",
    },
    {
      q: "Inglês é obrigatório para aprender informática?",
      a: "Não para começar. Há material oficial em português suficiente para os fundamentos. O inglês passa a fazer diferença em documentação técnica avançada e certificações.",
    },
    {
      q: "Qual curso fazer primeiro?",
      a: "O que cobrir fundamentos: uso do sistema operacional, arquivos, internet, e-mail, texto e planilha. Especializações fazem sentido depois que essa base está firme.",
    },
    {
      q: "Quanto tempo demora para aprender informática?",
      a: "Para uso cotidiano com autonomia, algumas semanas de prática regular costumam bastar. Para atuação profissional, o aprendizado é contínuo. Promessas de domínio total em prazo fixo não se sustentam.",
    },
    {
      q: "É tarde para começar?",
      a: "Não existe idade limite para aprender a usar tecnologia. O que muda é o método: mais repetição, anotações e foco no uso real que interessa a cada pessoa.",
    },
    {
      q: "Preciso aprender programação?",
      a: "Só se a trilha escolhida exigir. Suporte, infraestrutura, redes e segurança funcionam com pouca ou nenhuma programação, ainda que automação básica seja um diferencial crescente.",
    },
  ],


  // ── Cluster piloto de formatação (Rodada 8E/8F) ──────────────
  // O guia informacional responde "como fazer sem perder nada".
  // Nenhuma pergunta aqui repete as do guia comercial de custo.
  "como-formatar-pc-sem-perder-arquivos": [
    {
      q: "O que exatamente a formatação apaga?",
      a: "Apaga o disco onde o sistema está instalado: programas, configurações, contas salvas no navegador e os arquivos que estiverem nas pastas do usuário. Um segundo disco de dados, quando existe e não é formatado, permanece intacto.",
    },
    {
      q: "Copiar as pastas Documentos e Imagens é backup suficiente?",
      a: "Normalmente não. Ficam de fora e-mails configurados no aplicativo, senhas do navegador, licenças de programas, perfis de jogos e arquivos que ficaram na Área de Trabalho ou em pastas fora do padrão. A conferência item a item antes da formatação é o que evita a perda.",
    },
    {
      q: "Como conferir se o backup realmente funcionou?",
      a: "Abrindo os arquivos a partir da cópia, e não apenas olhando o tamanho da pasta. Um arquivo corrompido ou uma cópia interrompida só aparecem quando você tenta abrir o conteúdo.",
    },
    {
      q: "Dá para formatar mantendo os arquivos no mesmo computador?",
      a: "Existe a opção de reinstalar preservando arquivos pessoais, mas ela não recupera programas nem configurações e depende de o sistema estar íntegro. Quando o disco apresenta falha, essa opção deixa de ser confiável e a cópia externa passa a ser obrigatória.",
    },
    {
      q: "Depois de formatar, o que precisa ser reinstalado?",
      a: "Drivers do equipamento, os programas que você usa, o navegador com suas contas e as licenças. Ter a lista pronta antes reduz bastante o tempo em que o computador fica inutilizável.",
    },
  ],

  // O guia comercial explica composição de valor sem virar tabela de preço.
  "quanto-custa-formatar-um-computador": [
    {
      q: "Por que o valor de uma formatação varia entre equipamentos?",
      a: "Porque o tempo técnico varia. Um equipamento com disco saudável e poucos programas é diferente de um com disco lento, muitos dados a preservar e drivers antigos. O que muda o valor é o trabalho envolvido, não o modelo do aparelho.",
    },
    {
      q: "O backup está incluído na formatação?",
      a: "A separação e a cópia dos dados fazem parte do serviço quando combinadas antes. O que é tratado à parte é recuperação de dados de disco com falha, que é outro procedimento e tem outro grau de dificuldade.",
    },
    {
      q: "A licença do Windows entra no valor?",
      a: "Não. Licença é produto, não mão de obra. Quando o equipamento já tem licença vinculada, ela é reaproveitada; quando não tem, o custo da licença é informado separadamente antes de qualquer execução.",
    },
    {
      q: "E se durante a formatação aparecer um problema de hardware?",
      a: "O trabalho é interrompido e a situação é apresentada antes de continuar. Peça é sempre item separado da mão de obra, com aprovação explícita antes da troca.",
    },
    {
      q: "Atendimento remoto sai diferente do atendimento presencial?",
      a: "Sim, porque a modalidade muda o tempo e o deslocamento envolvidos. Nem toda formatação pode ser feita remotamente: quando o sistema não inicia, o atendimento presencial ou a bancada passam a ser necessários.",
    },
  ],

  "notebook-nao-liga-o-que-fazer": [
    {
      q: "O notebook não dá nenhum sinal ao ligar. O que pode ser?",
      a: "Pode estar relacionado à alimentação (tomada, cabo, carregador), à bateria, à memória, ao armazenamento ou à placa. As verificações seguras ajudam a estreitar, mas a causa só se confirma no diagnóstico.",
    },
    {
      q: "O notebook liga, mas a tela fica preta. É a tela?",
      a: "Nem sempre. Ligar o notebook a um monitor externo ajuda a saber se o problema é da tela ou da parte que gera a imagem.",
    },
    {
      q: "Posso abrir o notebook para verificar?",
      a: "Verificações externas (tomada, cabo, carregador, periféricos, monitor externo) são seguras. Abrir o carregador, a bateria ou desmontar o notebook sem preparo pode piorar o quadro e é melhor evitar.",
    },
    {
      q: "O notebook parou depois de uma queda de energia. Tem solução?",
      a: "É preciso avaliar. Oscilações podem afetar o carregador, o conector, a bateria ou a placa; o diagnóstico define quais são as opções antes de qualquer troca.",
    },
  ],

  "computador-lento-causas-solucoes": [
    {
      q: "Formatar resolve a lentidão?",
      a: "Só quando a causa é software acumulado ou corrompido. Não resolve lentidão por HD desgastado, pouca memória, superaquecimento ou hardware antigo.",
    },
    {
      q: "Trocar por SSD deixa o computador rápido?",
      a: "Costuma ajudar bastante na inicialização e na abertura de programas, mas o ganho depende do restante do hardware.",
    },
    {
      q: "Como sei se a lentidão é vírus?",
      a: "Lentidão acompanhada de pop-ups, navegador alterado ou uso alto de recursos sem motivo são sinais. A confirmação exige análise.",
    },
    {
      q: "Vale a pena investir num computador antigo?",
      a: "Depende do uso e do estado do equipamento. Às vezes um upgrade simples compensa; em outros casos, não.",
    },
    {
      q: "Limpar arquivos temporários deixa o computador mais rápido?",
      a: "Só faz diferença perceptível quando o disco do sistema está quase cheio. Nesse caso o Windows perde espaço para memória virtual e atualização, e liberar espaço devolve desempenho.",
    },
  ],

  "como-resolver-tela-azul-windows": [
    {
      q: "A tela azul significa que o computador está com defeito de hardware?",
      a: "Nem sempre. Driver incompatível, atualização mal aplicada e disco com falha causam tela azul tanto quanto memória ou fonte defeituosa. O código do erro e o arquivo de despejo indicam por onde começar.",
    },
    {
      q: "O que fazer na primeira vez que a tela azul aparece?",
      a: "Anote o código exibido, desfaça a última mudança (driver, atualização ou peça instalada) e observe se o erro se repete. Um episódio isolado após uma atualização costuma não voltar.",
    },
    {
      q: "Telas azuis com códigos diferentes a cada travamento indicam o quê?",
      a: "Códigos que mudam a cada ocorrência apontam com mais frequência para memória defeituosa, fonte instável ou superaquecimento, e não para um driver específico.",
    },
    {
      q: "Preciso formatar para resolver a tela azul?",
      a: "Raramente. A formatação só faz sentido quando o sistema está corrompido; se a causa for hardware, o erro volta no sistema novo.",
    },
    {
      q: "Dá para recuperar os arquivos se o computador só entra em tela azul?",
      a: "Na maioria dos casos sim, desde que o disco esteja íntegro. A cópia dos dados deve ser feita antes de qualquer tentativa de reinstalação.",
    },
  ],

  "como-instalar-windows-11-do-zero": [
    {
      q: "Qual a diferença entre atualizar e fazer instalação limpa?",
      a: "Atualizar mantém arquivos, programas e configurações; a instalação limpa apaga o disco do sistema e instala o Windows 11 do zero, exigindo backup antes.",
    },
    {
      q: "A instalação limpa apaga meus arquivos?",
      a: "Sim, o disco do sistema é apagado. Por isso o backup conferido dos dados vem antes de qualquer instalação limpa.",
    },
    {
      q: "Preciso baixar o Windows 11 de onde?",
      a: "Apenas das ferramentas e downloads oficiais da Microsoft. Imagens modificadas, ativadores e downloads de terceiros trazem risco de segurança e problemas de licença.",
    },
    {
      q: "Vocês fornecem chave, ativador ou bypass de requisitos?",
      a: "Não. Trabalhamos apenas com licenças legítimas e não orientamos ativadores, cracks ou formas de contornar os requisitos do Windows 11.",
    },
  ],

  "quando-trocar-hd-por-ssd": [
    {
      q: "O SSD deixa qualquer computador rápido?",
      a: "Ele acelera bastante o armazenamento, mas não substitui memória ou processador limitados.",
    },
    {
      q: "Qualquer computador aceita qualquer SSD?",
      a: "Não. É preciso conferir a interface (SATA ou NVMe) e o espaço físico disponível no equipamento.",
    },
    {
      q: "É melhor clonar o sistema ou instalar do zero?",
      a: "Clonar mantém tudo, inclusive problemas do sistema atual; a instalação limpa costuma ser mais estável. Em qualquer caso, backup antes é indispensável.",
    },
    {
      q: "Preciso trocar o computador todo ou só o disco?",
      a: "Depende do estado do equipamento. A avaliação do hardware ajuda a decidir se o SSD sozinho resolve.",
    },
  ],
  "notebook-superaquecendo-o-que-fazer": [
    {
      q: "Meu notebook esquenta muito. É normal?",
      a: "Em tarefas pesadas o calor sobe. Desligamentos, base muito quente em uso leve ou queda de desempenho já são sinais de alerta.",
    },
    {
      q: "Posso fazer a limpeza interna sozinho?",
      a: "A limpeza externa das saídas de ar é segura. Abrir para limpeza interna e trocar a pasta térmica exige prática para não danificar peças.",
    },
    {
      q: "A bateria está estufada. O que faço?",
      a: "Pare de usar, não fure nem pressione a bateria e procure um técnico. Bateria deformada é sinal de risco.",
    },
    {
      q: "De quanto em quanto tempo trocar a pasta térmica?",
      a: "Varia conforme o equipamento e o uso. Não existe um prazo único que sirva para todos os casos.",
    },
  ],
  "backup-como-proteger-seus-arquivos": [
    {
      q: "Copiar para outra pasta do mesmo disco é backup?",
      a: "Não. Se o disco falhar, a cópia na mesma unidade se perde junto com o original.",
    },
    {
      q: "Sincronizar com a nuvem é backup?",
      a: "Ajuda, mas se um arquivo é apagado ou criptografado a mudança pode se espalhar. Backup guarda versões que não são sobrescritas automaticamente.",
    },
    {
      q: "Com que frequência devo fazer backup?",
      a: "Conforme o quanto os dados mudam e o quanto você não pode perdê-los. O essencial é manter uma rotina.",
    },
    {
      q: "Já perdi arquivos. Ainda dá para recuperar?",
      a: "Às vezes sim, mas não há garantia. Por isso o backup preventivo é sempre mais seguro do que depender de recuperação.",
    },
  ],
  "como-saber-se-pc-tem-virus-malware": [
    {
      q: "Todo computador lento está com vírus?",
      a: "Não. Lentidão tem várias causas possíveis; vírus é uma delas e precisa ser confirmado por análise.",
    },
    {
      q: "Apareceu um alerta com telefone de suporte. Devo ligar?",
      a: "Não. É um golpe de falso suporte. Feche a janela, não ligue para o número e não instale nada que a tela pedir.",
    },
    {
      q: "Dá para remover vírus sem perder arquivos?",
      a: "Em muitos casos sim, mas depende do tipo de ameaça. Não é possível prometer que nunca haverá perda de dados.",
    },
    {
      q: "Meus arquivos ficaram bloqueados ou criptografados. O que faço?",
      a: "Pode ser ransomware. Desconecte da internet, não pague o resgate e busque avaliação antes de mexer nos arquivos.",
    },
  ],
  "como-melhorar-sinal-wifi-em-casa": [
    {
      q: "Como sei se o problema é do roteador ou da operadora?",
      a: "Se todos os aparelhos ficam sem internet ao mesmo tempo e o problema persiste após reiniciar, tende a ser a operadora. Se cai só longe do roteador, é alcance da rede local.",
    },
    {
      q: "Trocar de roteador resolve?",
      a: "Nem sempre. Se a causa é a operadora, o cabeamento ou o posicionamento, o aparelho novo repete o mesmo problema.",
    },
    {
      q: "Repetidor ou sistema mesh?",
      a: "Depende do tamanho e do layout do imóvel. Casas grandes com pontos cegos costumam se beneficiar de mesh.",
    },
    {
      q: "O Wi-Fi cai só em um aparelho. É a rede?",
      a: "Provavelmente não. Quando o problema é isolado em um dispositivo, a causa costuma estar no próprio aparelho.",
    },
  ],

  // ── Rodada 3O — conteúdos educacionais empresariais.
  "organizacao-de-ti-para-pequenos-escritorios": [
    {
      q: "Uma empresa pequena precisa de inventário de computadores?",
      a: "Sim. Sem a lista do que existe, cada compra vira palpite e cada parada vira urgência. O inventário mostra a máquina mais antiga, quem depende de qual programa e o que não pode ficar fora do ar.",
    },
    {
      q: "Quais informações devem ser registradas?",
      a: "Equipamento, categoria, usuário, local interno, configuração relevante, sistema operacional, programas principais, data aproximada de compra, garantia, problema conhecido e importância operacional.",
    },
    {
      q: "Preciso guardar senhas junto com o inventário?",
      a: "Não. Senhas, códigos de autenticação, dados bancários e dados de clientes não devem ficar no inventário. Credenciais compartilhadas ficam em um gerenciador de senhas com acesso controlado.",
    },
    {
      q: "Backup em nuvem é suficiente?",
      a: "Depende do que é sincronização e do que é cópia recuperável. Sincronização propaga exclusão e corrupção. O que define a proteção é ter versões anteriores, cópia separada e teste de restauração.",
    },
    {
      q: "Quem deve ser responsável pela informática?",
      a: "Alguém interno precisa responder pelas decisões — autorizar acessos, acionar fornecedores e acompanhar as rotinas — mesmo quando a execução técnica é externa.",
    },
    {
      q: "Atendimento avulso é suficiente?",
      a: "Para ambientes pequenos e estáveis, muitas vezes sim. O atendimento avulso resolve o caso pontual, sem acompanhamento contínuo entre os chamados.",
    },
    {
      q: "Quando vale considerar suporte recorrente?",
      a: "Quando os chamados se repetem, há mais estações do que consegue acompanhar, o histórico se perde entre atendimentos ou a operação depende de rotinas preventivas com data.",
    },
    {
      q: "Como registrar um problema antes de pedir suporte?",
      a: "Anote equipamento, usuário, horário de início, mensagem de erro exata, programa envolvido, alteração recente, quantas pessoas estão paradas e se o acesso remoto é possível. Nunca envie senhas por mensagem.",
    },
  ],
  "como-escolher-uma-workstation": [
    {
      q: "Qual é a diferença entre workstation e PC gamer?",
      a: "A carga de trabalho. Uma estação profissional costuma rodar horas seguidas, com arquivos grandes e prioridade em estabilidade, memória e armazenamento. O foco de um PC de jogos é outro.",
    },
    {
      q: "Toda workstation precisa de placa de vídeo dedicada?",
      a: "Não. A placa só é decisiva quando a aplicação usa aceleração gráfica compatível. Consulte os requisitos oficiais do programa antes de investir nesse componente.",
    },
    {
      q: "Quanta memória RAM é necessária?",
      a: "Não existe número universal. A quantidade depende do tamanho dos projetos, das aplicações abertas ao mesmo tempo e do limite da plataforma escolhida.",
    },
    {
      q: "É melhor usar um ou mais SSDs?",
      a: "Depende da separação desejada entre sistema, projetos ativos e cache. Unidades separadas ajudam na organização e no espaço livre; uma única unidade bem dimensionada também pode atender.",
    },
    {
      q: "É possível aproveitar componentes antigos?",
      a: "Em alguns casos sim, quando há compatibilidade de plataforma e o componente não é o gargalo. Isso é avaliado peça a peça, não por regra geral.",
    },
    {
      q: "Como saber se as peças são compatíveis?",
      a: "Pela verificação de plataforma, encaixe, alimentação, dimensões do gabinete e requisitos de cada componente. A conferência é feita antes da compra, com a lista em mãos.",
    },
    {
      q: "O desempenho em um programa pode ser garantido?",
      a: "Não. A montagem correta reduz gargalos, mas o resultado depende da versão do software, do tipo de projeto, dos plugins e dos requisitos oficiais da aplicação.",
    },
    {
      q: "É possível fazer upgrade futuramente?",
      a: "Quando a plataforma e o gabinete preveem expansão, sim. Deixar encaixes livres e espaço físico disponível na escolha inicial é o que mantém essa possibilidade.",
    },
    {
      q: "Os testes estão incluídos?",
      a: "O escopo de testes é confirmado antes da execução e pode incluir reconhecimento dos componentes, inicialização, memória, armazenamento, temperatura, estabilidade, portas, vídeo e rede.",
    },
    {
      q: "O valor pode ser informado sem conhecer os requisitos?",
      a: "Não de forma responsável. Sem saber o que roda, o tamanho dos arquivos e o uso diário, qualquer número é chute. O levantamento vem antes.",
    },
  ],
  // ── Onda 11F — teclado de notebook, desligamento espontâneo e link cabeado.
  "teclado-de-notebook-nao-funciona-o-que-verificar": [
    {
      q: "Como saber se o problema é do teclado ou do sistema?",
      a: "Conecte um teclado USB externo. Se ele digita normalmente, o sistema e o campo de digitação estão íntegros e a suspeita fica no teclado interno ou no cabo flat dele. Se nem o externo digita, o caminho passa a ser sistema, perfil de usuário ou driver.",
    },
    {
      q: "Só algumas teclas falham. Isso muda o diagnóstico?",
      a: "Muda. Falha em teclas isoladas e vizinhas costuma indicar sujeira, resíduo de líquido ou trilha rompida na membrana. Falha em bloco inteiro, especialmente uma linha ou uma coluna completa, aponta para a matriz do teclado ou para o contato do cabo flat.",
    },
    {
      q: "O teclado numérico parou. É defeito?",
      a: "Nem sempre. Em muitos notebooks o bloco numérico depende da tecla Num Lock ou da combinação com Fn. Vale confirmar esse estado antes de considerar defeito físico.",
    },
    {
      q: "Caiu líquido no teclado. O que fazer primeiro?",
      a: "Desligue imediatamente pelo botão de ligar, desconecte a fonte e não tente ligar de novo para testar. Manter a máquina energizada com líquido dentro é o que costuma transformar um teclado danificado em placa danificada.",
    },
    {
      q: "Trocar o teclado interno resolve sempre?",
      a: "Não. A troca resolve quando o defeito está na peça. Quando o problema é o conector do cabo flat na placa ou o controlador, o teclado novo apresenta o mesmo comportamento — por isso o teste com teclado externo e a inspeção do encaixe vêm antes da compra da peça.",
    },
  ],
  "computador-desliga-sozinho-o-que-verificar": [
    {
      q: "Desligar sozinho é sempre superaquecimento?",
      a: "Não. Superaquecimento é uma das causas mais comuns, mas fonte em degradação, memória instável, mau contato de alimentação e falha na rede elétrica produzem o mesmo sintoma. A diferenciação vem do padrão: desligamento sob carga sugere temperatura ou fonte; desligamento aleatório mesmo em repouso amplia a suspeita.",
    },
    {
      q: "Como verificar se é temperatura sem abrir a máquina?",
      a: "Acompanhe a temperatura do processador em repouso e sob uso com um monitor de hardware. Desligamento que acontece sempre depois de alguns minutos de esforço, com temperatura subindo até o corte, é comportamento de proteção térmica.",
    },
    {
      q: "Reiniciar sozinho é o mesmo problema que desligar sozinho?",
      a: "São sintomas próximos, mas não iguais. Reinício costuma acompanhar erro de sistema ou de memória e deixa registro no Visualizador de Eventos. Corte seco, sem aviso e sem registro, é mais compatível com alimentação ou proteção de hardware.",
    },
    {
      q: "Limpar o computador resolve?",
      a: "Resolve quando a causa é acúmulo de poeira obstruindo dissipador e ventoinha. Limpeza e reaplicação de pasta térmica são procedimentos legítimos de manutenção, mas não corrigem fonte degradada nem memória instável.",
    },
    {
      q: "Posso continuar usando enquanto investigo?",
      a: "Desligamentos abruptos repetidos aumentam o risco de corromper arquivos e o sistema. Antes de qualquer teste mais longo, priorize a cópia dos arquivos importantes para outro destino.",
    },
  ],
  "computador-nao-conecta-na-internet-por-cabo": [
    {
      q: "A luz do conector de rede apagada indica o quê?",
      a: "Indica que não há enlace físico entre a placa de rede e o equipamento do outro lado. Nesse estado o problema está no cabo, no conector, na porta do roteador ou na própria placa — configuração de rede ainda nem entra na conta.",
    },
    {
      q: "Como testar o cabo sem equipamento próprio?",
      a: "Por substituição e por troca de ponta. Use outro cabo comprovadamente bom no mesmo par de portas e, depois, o cabo original em outra porta do roteador. Se o enlace aparece com o outro cabo, o cabo original é o suspeito.",
    },
    {
      q: "O cabo conecta mas aparece 'sem acesso à internet'. O que muda?",
      a: "Muda a camada do problema. Com enlace ativo, a falha passa a ser de endereçamento ou de saída: endereço não recebido do roteador, DNS não respondendo ou o próprio enlace do provedor fora do ar.",
    },
    {
      q: "Wi-Fi funciona e o cabo não. Isso descarta o provedor?",
      a: "Descarta, sim. Se o Wi-Fi do mesmo roteador navega, a saída para a internet está ativa e o problema fica restrito ao caminho cabeado: porta, cabo, placa ou configuração da conexão cabeada.",
    },
    {
      q: "Vale trocar a placa de rede?",
      a: "Só depois de esgotar cabo, porta e configuração. Quando a placa integrada realmente falha, uma placa de rede adicional em slot PCIe ou um adaptador USB de rede restabelece a conexão sem substituir a placa-mãe.",
    },
  ],
  // ── Onda 11G — ruído de ventoinha, rede Wi-Fi invisível e arquivo corrompido.
  "ventoinha-do-computador-fazendo-barulho-o-que-verificar": [
    {
      q: "Ventoinha barulhenta significa defeito?",
      a: "Nem sempre. Som alto porém constante costuma indicar rotação elevada por temperatura, o que é o comportamento esperado sob esforço. Ruído irregular, com estalo, chiado agudo ou rangido, é que aponta para desgaste mecânico ou obstrução.",
    },
    {
      q: "Como saber se o barulho é do rolamento?",
      a: "Rolamento em fim de vida produz chiado ou rangido que persiste mesmo com a máquina fria e ociosa, e frequentemente piora nos primeiros minutos após ligar. Ruído que sobe e desce conforme a carga de trabalho tem origem térmica, não mecânica.",
    },
    {
      q: "Limpar o computador reduz o ruído?",
      a: "Reduz quando a causa é poeira compactada no dissipador ou grade obstruída: com a troca de calor restabelecida, a rotação cai e o som diminui. Limpeza não corrige rolamento gasto nem hélice desbalanceada.",
    },
    {
      q: "Posso reduzir a rotação para silenciar?",
      a: "Só com acompanhamento de temperatura. Limitar a rotação sem verificar o calor gerado troca ruído por risco térmico, que costuma aparecer depois como travamento, queda de desempenho ou desligamento.",
    },
    {
      q: "A ventoinha parou de girar. É urgente?",
      a: "Sim. Ventoinha parada com o equipamento aquecendo é motivo para desligar e não continuar usando. O funcionamento sem dissipação ativa expõe processador e componentes próximos a temperaturas fora da faixa de projeto.",
    },
  ],
  "rede-wifi-nao-aparece-na-lista-o-que-verificar": [
    {
      q: "Nenhuma rede aparece. Por onde começar?",
      a: "Pelo dispositivo. Verifique o atalho físico de Wi-Fi do notebook, o modo avião e se o adaptador está habilitado nas configurações de rede. Se o adaptador nem consta na lista do sistema, a suspeita passa a ser driver ou hardware.",
    },
    {
      q: "As redes dos vizinhos aparecem e a minha não. O que isso indica?",
      a: "Indica que o rádio do dispositivo está funcionando e a investigação se desloca para o roteador: equipamento fora do ar, nome de rede oculto, mudança recente de canal ou rede transmitindo apenas em 5 GHz.",
    },
    {
      q: "Por que a rede de 5 GHz não aparece no computador antigo?",
      a: "Porque adaptadores que operam somente em 2,4 GHz não conseguem listar redes de 5 GHz. Não é defeito, é limitação de banda do adaptador — um adaptador USB compatível resolve sem trocar o roteador.",
    },
    {
      q: "Ocultar o nome da rede deixa a conexão mais segura?",
      a: "Não de forma relevante. A rede continua detectável por ferramentas comuns e a ocultação atrapalha a conexão de dispositivos legítimos, que passam a exigir cadastro manual de nome e senha.",
    },
    {
      q: "A rede aparece, some e volta. É o mesmo problema?",
      a: "Não. Rede intermitente é questão de cobertura ou interferência: distância, paredes, posicionamento do roteador e concorrência de canal. Rede que nunca aparece é questão de visibilidade, que tem verificações próprias.",
    },
  ],
  "arquivo-corrompido-nao-abre-o-que-fazer": [
    {
      q: "Qual é o primeiro passo com um arquivo que não abre?",
      a: "Copiar o arquivo para outra unidade e trabalhar apenas sobre a cópia. Tentativas de reparo podem reescrever o conteúdo, e o original preservado mantém disponíveis as alternativas que uma segunda tentativa eliminaria.",
    },
    {
      q: "Como saber se o arquivo está corrompido ou se é o programa?",
      a: "Tente abrir a cópia em outro programa capaz de ler o formato e em outro computador. Se abrir em algum deles, o conteúdo está íntegro e o problema é da instalação local. Se falhar em todos, o dano é no arquivo.",
    },
    {
      q: "Arquivo com tamanho zero tem recuperação?",
      a: "Não pelo próprio arquivo: sem bytes gravados, não há conteúdo a reconstruir. O caminho passa a ser versão anterior, backup, arquivo temporário do programa ou tentativa de recuperação na mídia onde ele estava.",
    },
    {
      q: "Vários arquivos da mesma pasta pararam de abrir. O que mudou?",
      a: "O escopo. Falha simultânea em muitos arquivos aponta para a mídia de armazenamento, não para os documentos. A conduta correta é parar de gravar naquela unidade e verificar a saúde do disco antes de novas tentativas.",
    },
    {
      q: "Programas de reparo automático funcionam?",
      a: "Às vezes recuperam parte do conteúdo, sempre dependendo de quanto foi gravado corretamente. Devem ser apontados para a cópia, nunca para o original, e nenhuma ferramenta reconstrói dado que jamais chegou a ser escrito na mídia.",
    },
  ],
};


export const BlogPostFAQ = ({ category, slug }: { category: string; slug: string }) => {
  const override = PILOT_FAQ[slug];
  const extras = CATEGORY_EXTRA[category] ?? [];
  const items = override ?? [...extras, ...BASE_FAQ].slice(0, 5);

  // O schema da FAQ é construído DURANTE O RENDER e registrado no slot, para
  // aparecer no HTML servido. A versão anterior injetava <script> no document
  // dentro de um useEffect — invisível para o SSR e para os crawlers.
  // Fail-closed: FAQPage (rich result) apenas para conteúdo aprovado.
  const faqSchema = useMemo(() => {
    if (!slug || !isEditorialApproved(slug)) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE_BASE_URL}/blog/${slug}#faq`,
      mainEntity: items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    };
  }, [slug, items]);
  useJsonLdSlot(SCHEMA_SLOTS.faq, faqSchema, SLOT_PRIORITY.page);

  return (
    <section className="not-prose mt-12" data-faq-visivel>

      <h2 className="font-heading font-bold text-primary text-xl md:text-2xl mb-4">
        Perguntas frequentes
      </h2>
      <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
        {items.map((it, i) => (
          <details key={i} className="group">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-4 md:p-5 font-semibold text-foreground hover:bg-muted/40 transition-colors">
              <span>{it.q}</span>
              <span className="text-accent text-xl leading-none group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
            </summary>
            <div className="px-4 md:px-5 pb-4 md:pb-5 text-sm md:text-base text-muted-foreground leading-relaxed">
              {it.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// FONTES E REFERÊNCIAS TÉCNICAS (visíveis) — pilotos em revisão.
//
// Renderiza APENAS as fontes realmente registradas no manifesto
// (src/lib/blogEditorialSources.ts) para o slug. Sem fonte registrada,
// não renderiza nada (artigos baseados em conhecimento técnico estável,
// justificados no manifesto). Nunca expõe status interno, factChecked,
// classificação ou notas privadas. Âncora descritiva, publisher visível,
// rel="noopener noreferrer" e target de nova aba.
// ─────────────────────────────────────────────────────────────
export const EditorialReferences = ({ slug }: { slug: string }) => {
  const sources = getArticleSources(slug);
  if (sources.length === 0) return null;

  return (
    <section className="not-prose mt-12">
      <h2 className="font-heading font-bold text-primary text-xl md:text-2xl mb-4">
        Fontes e referências técnicas
      </h2>
      <ul className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden m-0 list-none p-0">
        {sources.map((s) => (
          <li key={s.id} className="p-4 md:p-5">
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent hover:underline"
            >
              {s.title}
            </a>
            <span className="block text-sm text-muted-foreground mt-1">{s.publisher}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BlogPostFAQ;

