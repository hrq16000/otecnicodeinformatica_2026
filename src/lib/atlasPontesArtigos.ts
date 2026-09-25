/**
 * PONTES ARTIGO-PILAR → ATLAS (rodada incremental).
 *
 * Fecha o grafo no sentido inverso: o Atlas já aponta para o blog (via
 * `proximosPassos` em `atlasAprofundamento.ts`); aqui cada artigo-pilar
 * estratégico declara a qual tema do Atlas pertence e por quê.
 *
 * Regras:
 *  - fail-closed: sem entrada curada, nada renderiza (nunca template genérico);
 *  - texto próprio por artigo — repetição criaria bloco boilerplate;
 *  - nenhuma URL nova: todo destino já existe no portal;
 *  - conteúdo informativo, sem CTA comercial.
 */
import { ATLAS_TEMAS, type AtlasTema } from "@/lib/atlasInformatica";

export interface AtlasPonteArtigo {
  temaId: string;
  porQue: string;
  /** Passo seguinte natural depois da leitura (rota existente). */
  proximoPasso: { rotulo: string; to: string; contexto: string };
}

export const ATLAS_PONTES_ARTIGOS: Record<string, AtlasPonteArtigo> = {
  "hd-nao-e-reconhecido-na-bios-o-que-fazer": {
    temaId: "dados-backup",
    porQue:
      "Disco que some da BIOS não é só um problema de inicialização: pode envolver energia, conexão, controladora ou falha da própria mídia. O Atlas coloca preservação de dados antes de qualquer tentativa que escreva no disco.",
    proximoPasso: {
      rotulo: "SMART e setores defeituosos",
      to: "/blog/disco-com-setores-defeituosos-smart-o-que-fazer",
      contexto:
        "Entenda quais sinais de saúde do disco ajudam a separar falha lógica de degradação física.",
    },
  },
  "o-que-e-informatica": {
    temaId: "fundamentos",
    porQue:
      "Entender o que é informática vem antes de escolher ferramenta, curso ou serviço. O Atlas organiza esse campo amplo em fundamentos, sistemas, hardware, redes, segurança, dados e decisões práticas, sem misturar definição com atendimento.",
    proximoPasso: {
      rotulo: "Informática básica",
      to: "/blog/informatica-basica",
      contexto:
        "Transforme a definição geral em conceitos e habilidades que aparecem no uso diário do computador.",
    },
  },
  "informatica-basica": {
    temaId: "fundamentos",
    porQue:
      "Informática básica é a camada de vocabulário e operação que sustenta todo o restante: arquivos, sistema, programas, armazenamento e rede. O Atlas conecta esses fundamentos aos sintomas reais e às verificações seguras.",
    proximoPasso: {
      rotulo: "Como aprender informática",
      to: "/blog/como-aprender-informatica",
      contexto:
        "Organize uma sequência de estudo em vez de acumular dicas isoladas.",
    },
  },
  "como-aprender-informatica": {
    temaId: "fundamentos",
    porQue:
      "Aprender informática fica mais eficiente quando o estudo segue uma ordem: conceito, uso, sintoma, verificação e decisão. O Atlas oferece essa estrutura e evita que a aprendizagem vire uma coleção de tutoriais desconectados.",
    proximoPasso: {
      rotulo: "Guia do técnico de informática",
      to: "/guia-tecnico-informatica#profissao",
      contexto:
        "Veja como os fundamentos se relacionam com a atuação profissional, suporte e diagnóstico técnico.",
    },
  },
  "manutencao-preventiva-de-computador-guia-completo": {
    temaId: "manutencao-preventiva",
    porQue:
      "Prevenção só funciona como rotina com frequência definida: o que é mensal, o que é anual e o que nunca deveria ser feito por reflexo. A trilha de manutenção preventiva organiza essa cadência e evita a intervenção sem sintoma, que introduz risco em vez de eliminar causa.",
    proximoPasso: {
      rotulo: "Backup antes da manutenção",
      to: "/decisoes/backup-antes-da-manutencao",
      contexto:
        "Critério para decidir o que copiar antes de abrir ou reinstalar o equipamento.",
    },
  },
  "dispositivo-usb-nao-reconhecido-o-que-fazer": {
    temaId: "fundamentos",
    porQue:
      "A falha de reconhecimento acontece antes de qualquer driver entrar em cena: o aparelho precisa se apresentar ao sistema e informar o consumo de energia. A trilha de fundamentos mostra por que porta, cabo e alimentação vêm antes de software na ordem de investigação.",
    proximoPasso: {
      rotulo: "Diagnóstico técnico",
      to: "/diagnostico-tecnico",
      contexto:
        "Quando os testes de isolamento não fecham a causa e a avaliação precisa ser presencial.",
    },
  },
  "como-testar-restauracao-de-backup": {
    temaId: "dados-backup",
    porQue:
      "Ter cópia e conseguir restaurar são coisas diferentes: mídia falha em silêncio, rotina para sem aviso e sincronização propaga o estado ruim. A trilha de dados e backup trata a verificação periódica como parte da própria estratégia de cópia.",
    proximoPasso: {
      rotulo: "Nuvem ou HD externo",
      to: "/decisoes/nuvem-ou-hd-externo",
      contexto:
        "Onde guardar cada cópia, com o critério de risco de cada destino.",
    },
  },
  "como-monitorar-temperatura-do-computador": {
    temaId: "manutencao-preventiva",
    porQue:
      "Temperatura só significa alguma coisa quando é medida do mesmo jeito, em datas diferentes, com o ambiente anotado. A trilha de manutenção preventiva usa a tendência — e não o número isolado — para decidir quando intervir.",
    proximoPasso: {
      rotulo: "Backup antes da manutenção",
      to: "/decisoes/backup-antes-da-manutencao",
      contexto:
        "O que copiar antes de abrir o equipamento para limpeza ou troca de peça.",
    },
  },
  "pendrive-somente-leitura-protegido-contra-gravacao": {
    temaId: "fundamentos",
    porQue:
      "Mídia flash envelhece por escrita e avisa entrando em somente leitura. A trilha de fundamentos explica por que a ordem correta é preservar o conteúdo primeiro e só depois tentar corrigir a estrutura.",
    proximoPasso: {
      rotulo: "Diagnóstico técnico",
      to: "/diagnostico-tecnico",
      contexto:
        "Quando há arquivo insubstituível e a tentativa doméstica passa a ser risco.",
    },
  },
  "historico-de-arquivos-windows-como-configurar": {
    temaId: "dados-backup",
    porQue:
      "Versionar é diferente de espelhar: guardar o estado anterior é o que salva um documento sobrescrito. A trilha de dados e backup posiciona o versionamento como camada, não como estratégia completa.",
    proximoPasso: {
      rotulo: "Nuvem ou HD externo",
      to: "/decisoes/nuvem-ou-hd-externo",
      contexto:
        "Onde manter a cópia fora do local, complementando as versões locais.",
    },
  },
  "teclado-de-notebook-nao-funciona-o-que-verificar": {
    temaId: "fundamentos",
    porQue:
      "Teclado parado parece defeito único, mas há quatro sintomas com causas diferentes. Os fundamentos ensinam a separar hardware interno de configuração do sistema antes de encomendar peça.",
    proximoPasso: {
      rotulo: "Diagnóstico técnico",
      to: "/diagnostico-tecnico",
      contexto:
        "Quando o teclado externo funciona, o interno não responde e a troca do módulo passa a ser a decisão.",
    },
  },
  "computador-desliga-sozinho-o-que-verificar": {
    temaId: "manutencao-preventiva",
    porQue:
      "Desligamento repentino costuma ter origem térmica ou elétrica — exatamente o que a manutenção preventiva evita. Ler o padrão do desligamento vale mais que trocar peça por eliminação.",
    proximoPasso: {
      rotulo: "Backup antes da manutenção",
      to: "/decisoes/backup-antes-da-manutencao",
      contexto:
        "Antes de abrir a máquina ou testar fonte, garanta que os dados estejam copiados.",
    },
  },
  "computador-nao-conecta-na-internet-por-cabo": {
    temaId: "redes-wifi",
    porQue:
      "Cabo ligado sem internet é um problema de cadeia: enlace físico, endereçamento e provedor. A trilha de redes mostra por que testar na ordem evita trocar o que está bom.",
    proximoPasso: {
      rotulo: "Redes e Wi-Fi",
      to: "/servicos/redes-e-wifi",
      contexto:
        "Quando o problema é o cabeamento da casa ou do escritório e exige intervenção no ponto de rede.",
    },
  },
  "ventoinha-do-computador-fazendo-barulho-o-que-verificar": {
    temaId: "manutencao-preventiva",
    porQue:
      "Ruído é informação: a ventoinha acelera porque precisa dissipar mais calor, ou range porque o rolamento chegou ao fim. A trilha de manutenção preventiva mostra por que ouvir o equipamento antecipa a falha.",
    proximoPasso: {
      rotulo: "Diagnóstico técnico",
      to: "/diagnostico-tecnico",
      contexto:
        "Quando o ruído persiste após limpeza ou vem acompanhado de temperatura alta e desligamentos.",
    },
  },
  "rede-wifi-nao-aparece-na-lista-o-que-verificar": {
    temaId: "redes-wifi",
    porQue:
      "Não enxergar a rede é diferente de enxergar e não navegar. A trilha de redes explica banda, canal e alcance — o que decide se o problema é do adaptador, do roteador ou da distância.",
    proximoPasso: {
      rotulo: "Redes e Wi-Fi",
      to: "/servicos/redes-e-wifi",
      contexto:
        "Quando a rede some para todos os dispositivos ou o ponto de acesso precisa de reconfiguração.",
    },
  },
  "arquivo-corrompido-nao-abre-o-que-fazer": {
    temaId: "dados-backup",
    porQue:
      "Arquivo que não abre é um teste prático da estratégia de dados: quem tem versões guardadas resolve em minutos; quem não tem depende de tentativa. A trilha mostra por que a cópia vem antes da tentativa.",
    proximoPasso: {
      rotulo: "Backup antes da manutenção",
      to: "/decisoes/backup-antes-da-manutencao",
      contexto:
        "Antes de qualquer tentativa de reparo, preserve o original e trabalhe sobre uma cópia.",
    },
  },
  "monitor-sem-sinal-o-que-verificar": {
    temaId: "fundamentos",
    porQue:
      "Uma mensagem na tela já é informação: monitor que exibe o próprio aviso está funcionando. A trilha de fundamentos ensina a ler o sintoma antes de eleger um culpado e trocar peça no escuro.",
    proximoPasso: {
      rotulo: "Diagnóstico técnico",
      to: "/diagnostico-tecnico",
      contexto:
        "Quando nenhuma saída de vídeo responde e o teste com peça sobressalente vira necessidade.",
    },
  },
  "bateria-de-notebook-nao-carrega-o-que-verificar": {
    temaId: "manutencao-preventiva",
    porQue:
      "Bateria de íon-lítio perde capacidade por ciclo e por calor — e isso é medível, não é impressão. A trilha de manutenção preventiva trata autonomia como indicador acompanhado ao longo do tempo.",
    proximoPasso: {
      rotulo: "Backup antes da manutenção",
      to: "/decisoes/backup-antes-da-manutencao",
      contexto:
        "O que copiar antes de abrir o notebook para troca de bateria ou de conector.",
    },
  },
  "como-migrar-arquivos-para-um-computador-novo": {
    temaId: "dados-backup",
    porQue:
      "Migração é o momento em que os dados existem em dois lugares e ninguém confere nenhum. A trilha de dados e backup transforma a troca de equipamento em oportunidade de montar rotina, não em risco pontual.",
    proximoPasso: {
      rotulo: "Nuvem ou HD externo",
      to: "/decisoes/nuvem-ou-hd-externo",
      contexto:
        "Onde manter a cópia depois que o equipamento novo já é o principal.",
    },
  },
  "computador-lento-causas-solucoes": {
    temaId: "hardware-upgrades",
    porQue:
      "Lentidão raramente tem uma causa única: pode ser disco mecânico no limite, memória insuficiente, temperatura alta ou inicialização cheia. A trilha de hardware e upgrades organiza essa separação antes de qualquer compra de peça.",
    proximoPasso: {
      rotulo: "SSD ou memória RAM: por onde começar",
      to: "/decisoes/ssd-ou-memoria-ram",
      contexto:
        "Guia de decisão independente, com o critério para cada cenário de uso.",
    },
  },
  "notebook-nao-liga-o-que-fazer": {
    temaId: "windows-inicializacao",
    porQue:
      '"Não liga" descreve estados muito diferentes: sem reação nenhuma, liga e apaga, liga sem imagem. A trilha de Windows e inicialização mostra como identificar o estágio exato em que a partida para — o dado que muda o diagnóstico inteiro.',
    proximoPasso: {
      rotulo: "Roteiro de falha de inicialização",
      to: "/ferramentas/roteiro-falha-de-inicializacao",
      contexto: "Checklist de verificação segura, sem abrir o equipamento.",
    },
  },
  "como-resolver-tela-azul-windows": {
    temaId: "windows-inicializacao",
    porQue:
      "O código da tela azul é a pista principal: repetir sempre igual aponta driver ou componente definido; variar a cada ocorrência aponta memória ou alimentação. A trilha de inicialização explica como usar essa leitura em vez de formatar por reflexo.",
    proximoPasso: {
      rotulo: "Tela azul: entrada pelo sintoma",
      to: "/problemas/tela-azul",
      contexto:
        "Verificações seguras e o ponto em que insistir agrava o quadro.",
    },
  },
  "como-recuperar-dados-hd-com-defeito": {
    temaId: "dados-backup",
    porQue:
      "Recuperação de dados é uma corrida contra o próprio uso do disco: cada gravação nova reduz a chance de resgate. A trilha de dados e backup trata disso como disciplina permanente, não como reação à perda.",
    proximoPasso: {
      rotulo: "Verificador de backup",
      to: "/ferramentas/verificador-de-backup",
      contexto: "Confere se a cópia que você tem é realmente restaurável.",
    },
  },
  "backup-como-proteger-seus-arquivos": {
    temaId: "dados-backup",
    porQue:
      "Backup só existe quando a restauração foi testada. A trilha de dados e backup conecta a rotina doméstica ao que muda em ambiente de escritório, onde a perda tem custo operacional.",
    proximoPasso: {
      rotulo: "Backup antes da manutenção",
      to: "/decisoes/backup-antes-da-manutencao",
      contexto:
        "O que copiar antes de entregar o equipamento para qualquer serviço.",
    },
  },
  "como-melhorar-sinal-wifi-em-casa": {
    temaId: "redes-wifi",
    porQue:
      "Sinal fraco costuma ser propagação e canal, não defeito de aparelho. A trilha de redes e Wi-Fi ensina a separar o que é do provedor, do roteador e do dispositivo antes de trocar equipamento.",
    proximoPasso: {
      rotulo: "Roteiro de Wi-Fi instável",
      to: "/ferramentas/roteiro-wifi-instavel",
      contexto:
        "Sequência de testes que isola a camada responsável pela queda.",
    },
  },
  "como-saber-se-pc-tem-virus-malware": {
    temaId: "seguranca-privacidade",
    porQue:
      "Nem toda lentidão é infecção e nem toda infecção deixa sinal visível. A trilha de segurança e privacidade estabelece o que é verificável pelo usuário e onde a investigação passa a exigir ferramenta específica.",
    proximoPasso: {
      rotulo: "Segurança dos dados",
      to: "/seguranca-dos-dados",
      contexto: "Como o portal trata dados durante um atendimento técnico.",
    },
  },
  "notebook-superaquecendo-o-que-fazer": {
    temaId: "manutencao-preventiva",
    porQue:
      "Superaquecimento é o sintoma preventivo por excelência: aparece muito antes do desligamento e da perda de desempenho. A trilha de manutenção preventiva mostra o que observar em intervalos regulares.",
    proximoPasso: {
      rotulo: "Computador esquentando",
      to: "/problemas/computador-esquentando",
      contexto:
        "Verificações seguras e o limite a partir do qual desligar é o correto.",
    },
  },
  "organizacao-de-ti-para-pequenos-escritorios": {
    temaId: "informatica-empresas",
    porQue:
      "Em escritório pequeno o problema técnico vira parada operacional. A trilha de informática para empresas organiza inventário, backup e padronização como base — antes de discutir contrato de suporte.",
    proximoPasso: {
      rotulo: "Empresa de TI em Curitiba",
      to: "/empresa-de-ti-curitiba",
      contexto:
        "Escopo, modalidades e o que fica definido antes de qualquer execução.",
    },
  },
  "quando-trocar-hd-por-ssd": {
    temaId: "decisoes-compra-reparo",
    porQue:
      "A troca de disco é o caso mais claro em que reparar e substituir competem pelo mesmo orçamento. A trilha de decisões entre compra e reparo dá o critério para os dois lados da conta.",
    proximoPasso: {
      rotulo: "Consertar ou substituir",
      to: "/decisoes/consertar-ou-substituir",
      contexto:
        "Critério de decisão por idade, uso e custo real do equipamento.",
    },
  },
  "como-configurar-2fa-em-tudo": {
    temaId: "seguranca-privacidade",
    porQue:
      "Autenticação multifator é a camada que limita o dano quando uma senha vaza. A trilha de segurança organiza senha exclusiva, fator resistente a phishing, recuperação e revisão de sessões como partes do mesmo controle de identidade.",
    proximoPasso: {
      rotulo: "Proteção contra golpes e phishing",
      to: "/blog/como-proteger-computador-golpes-internet",
      contexto:
        "Aprenda a reconhecer o golpe que tenta capturar senha e segundo fator antes de qualquer alteração na conta.",
    },
  },
  "como-proteger-rede-wifi-empresa": {
    temaId: "redes-wifi",
    porQue:
      "Wi-Fi empresarial é infraestrutura de acesso: criptografia, segmentação, administração e ciclo de firmware precisam funcionar juntos. A trilha de redes separa cobertura, desempenho e segurança para evitar que uma correção esconda outro problema.",
    proximoPasso: {
      rotulo: "Redes e Wi-Fi",
      to: "/servicos/redes-e-wifi",
      contexto:
        "Quando o desenho exige medição no local, cabeamento, novos pontos de acesso ou segmentação aplicada.",
    },
  },
  "como-configurar-firewall-pfsense": {
    temaId: "redes-wifi",
    porQue:
      "Firewall transforma o desenho lógico da rede em regras verificáveis: quem inicia tráfego, para onde e por qual serviço. A trilha de redes ajuda a definir segmentos antes de escrever regras e NAT.",
    proximoPasso: {
      rotulo: "Proteger o Wi-Fi da empresa",
      to: "/blog/como-proteger-rede-wifi-empresa",
      contexto:
        "Organize SSIDs, visitantes, IoT e administração antes de aplicar o controle entre redes no firewall.",
    },
  },
  "como-configurar-active-directory": {
    temaId: "informatica-empresas",
    porQue:
      "Active Directory só entrega controle quando identidade, DNS, privilégio, políticas e recuperação são operados como uma rotina. A trilha empresarial coloca o diretório dentro da organização de TI, em vez de tratá-lo como instalação isolada de servidor.",
    proximoPasso: {
      rotulo: "Organização de TI para pequenos escritórios",
      to: "/blog/organizacao-de-ti-para-pequenos-escritorios",
      contexto:
        "Conecte identidade e políticas ao inventário, dados, responsáveis e continuidade do ambiente.",
    },
  },
  "como-deixar-celular-android-mais-rapido": {
    temaId: "fundamentos",
    porQue:
      "Lentidão em Android também exige separar armazenamento, aplicativo, conexão, temperatura e limite do hardware. A trilha de fundamentos aplica o mesmo princípio de diagnóstico: observar a camada responsável antes de instalar ferramenta de limpeza.",
    proximoPasso: {
      rotulo: "Diagnóstico técnico",
      to: "/diagnostico-tecnico",
      contexto:
        "Quando há aquecimento, reinicialização, risco para dados ou o teste por eliminação não identifica a causa.",
    },
  },

  "como-configurar-repetidor-wifi": {
    temaId: "redes-wifi",
    porQue:
      "Extensor de alcance só ajuda quando o problema real é cobertura e o ponto escolhido ainda recebe um sinal útil. A trilha de redes ensina a separar provedor, roteador, interferência, cobertura e arquitetura antes de adicionar equipamentos.",
    proximoPasso: {
      rotulo: "Internet lenta: provedor ou roteador",
      to: "/blog/internet-lenta-provedor-ou-roteador",
      contexto:
        "Confirme se a origem da lentidão está na cobertura Wi-Fi ou já existe perto do roteador.",
    },
  },
  "trocar-windows-por-linux-vale-a-pena": {
    temaId: "sistemas-operacionais",
    porQue:
      "Migrar de sistema operacional é uma decisão de compatibilidade: aplicativos, hardware, boot, criptografia e recuperação precisam ser testados antes de alterar o disco.",
    proximoPasso: {
      rotulo: "Checklist antes de formatar",
      to: "/ferramentas/checklist-antes-de-formatar",
      contexto:
        "Garanta dados, contas e chaves antes de instalar outro sistema ou reparticionar.",
    },
  },
  "erros-comuns-upgrade-computador": {
    temaId: "hardware-upgrades",
    porQue:
      "Upgrade seguro começa por compatibilidade elétrica, física, lógica e de firmware. A trilha de hardware ajuda a decidir se RAM, SSD, GPU ou fonte resolvem o gargalo real.",
    proximoPasso: {
      rotulo: "Upgrade de SSD e RAM",
      to: "/servicos/upgrade-ssd-ram",
      contexto:
        "Quando a compatibilidade está confirmada e o objetivo é executar a troca com validação.",
    },
  },
  "como-configurar-vpn-empresarial": {
    temaId: "redes-wifi",
    porQue:
      "VPN cria um caminho autenticado para dentro da rede; identidade, rotas, DNS, segmentação, firewall e revogação precisam ser planejados juntos.",
    proximoPasso: {
      rotulo: "Firewall pfSense",
      to: "/blog/como-configurar-firewall-pfsense",
      contexto:
        "Defina regras e segmentação do gateway antes de ampliar acesso remoto.",
    },
  },
  "como-recuperar-conta-hackeada": {
    temaId: "seguranca-privacidade",
    porQue:
      "Recuperar uma conta é só a primeira parte. A trilha de segurança conecta sessão, dispositivo, senha, MFA, recuperação e prevenção de phishing para impedir reentrada.",
    proximoPasso: {
      rotulo: "Configurar 2FA/MFA",
      to: "/blog/como-configurar-2fa-em-tudo",
      contexto:
        "Depois de retomar controle, fortaleça autenticação e prepare métodos de recuperação.",
    },
  },

  "como-deixar-windows-11-mais-rapido-iniciantes": {
    temaId: "hardware-upgrades",
    porQue:
      "Desempenho no Windows precisa ser medido por recurso: CPU, memória, disco, inicialização e temperatura. A trilha de hardware evita transformar toda lentidão em formatação ou compra de peça.",
    proximoPasso: {
      rotulo: "SSD ou memória RAM",
      to: "/decisoes/ssd-ou-memoria-ram",
      contexto: "Compare o gargalo real antes de decidir qual upgrade faz sentido.",
    },
  },
  "como-fazer-backup-fotos-windows-iniciantes": {
    temaId: "dados-backup",
    porQue:
      "Fotos precisam sobreviver à falha do computador, à exclusão e à perda física. A trilha de dados separa cópia, sincronização, versionamento e restauração.",
    proximoPasso: {
      rotulo: "Testar restauração de backup",
      to: "/blog/como-testar-restauracao-de-backup",
      contexto: "Comprove que a cópia abre e pode ser restaurada antes de depender dela.",
    },
  },
  "como-atualizar-windows-corretamente": {
    temaId: "sistemas-operacionais",
    porQue:
      "Atualização é manutenção do sistema operacional: preparação, canal oficial, reinício e validação reduzem risco e tornam falhas reproduzíveis.",
    proximoPasso: {
      rotulo: "Windows Update não funciona",
      to: "/blog/windows-update-nao-funciona-o-que-verificar",
      contexto: "Use a trilha de diagnóstico quando a atualização falha ou retorna código de erro.",
    },
  },
  "como-recuperar-arquivos-apagados-windows": {
    temaId: "dados-backup",
    porQue:
      "Recuperação depende de preservar a mídia e reduzir novas gravações. A trilha de dados mostra quando restaurar backup, quando tentar recuperação lógica e quando parar.",
    proximoPasso: {
      rotulo: "Recuperação de dados",
      to: "/servicos/recuperacao-de-dados",
      contexto: "Entenda o limite entre exclusão lógica, mídia instável e defeito físico.",
    },
  },
  "como-fazer-teste-velocidade-internet": {
    temaId: "redes-wifi",
    porQue:
      "Velocidade é só uma parte da experiência de rede. A trilha de redes conecta download, upload, latência, jitter, perda, Ethernet e Wi-Fi ao ponto real da falha.",
    proximoPasso: {
      rotulo: "Internet lenta: provedor ou roteador",
      to: "/blog/internet-lenta-provedor-ou-roteador",
      contexto: "Transforme os resultados do teste em diagnóstico de provedor versus rede interna.",
    },
  },


  "como-resetar-senha-windows": {
    temaId: "sistemas-operacionais",
    porQue:
      "Recuperação de acesso exige identificar a credencial certa antes de alterar qualquer coisa. A trilha de sistemas conecta conta, Windows Hello, recuperação, BitLocker e preservação de dados.",
    proximoPasso: {
      rotulo: "Segurança dos dados",
      to: "/seguranca-dos-dados",
      contexto: "Revise credenciais, chaves de recuperação e cópias antes de qualquer reinstalação.",
    },
  },
  "como-organizar-arquivos-windows-iniciantes": {
    temaId: "dados-backup",
    porQue:
      "Organização só é confiável quando localização, sincronização e recuperação são entendidas juntas. A trilha de dados separa estrutura de pastas, nuvem e backup.",
    proximoPasso: {
      rotulo: "Testar restauração de backup",
      to: "/blog/como-testar-restauracao-de-backup",
      contexto: "Confirme que os arquivos organizados podem ser recuperados se o computador falhar.",
    },
  },
  "como-trocar-senha-wifi": {
    temaId: "redes-wifi",
    porQue:
      "A senha é uma das camadas da rede. A trilha de redes conecta autenticação, firmware, segmentação, cobertura e diagnóstico sem transformar reset de fábrica em rotina.",
    proximoPasso: {
      rotulo: "Proteger o Wi-Fi da empresa",
      to: "/blog/como-proteger-rede-wifi-empresa",
      contexto: "Avance de uma credencial doméstica para segmentação, administração e ciclo de firmware.",
    },
  },


};

export interface AtlasPonteArtigoResolvida extends AtlasPonteArtigo {
  tema: AtlasTema;
  hubHref: string;
}

/** Resolve a ponte de um artigo. Sem ponte declarada, retorna null (fail-closed). */
export function atlasPonteDoArtigo(
  slug: string,
): AtlasPonteArtigoResolvida | null {
  const ponte = ATLAS_PONTES_ARTIGOS[slug];
  if (!ponte) return null;
  const tema = ATLAS_TEMAS.find((t) => t.id === ponte.temaId);
  if (!tema) return null;
  return {
    ...ponte,
    tema,
    hubHref: `/guia-tecnico-informatica#tema-${tema.id}`,
  };
}
