import React from "react";

export type ProgrammaticPost = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
  content: React.ReactNode;
};

type Section = { h: string; p?: string; list?: string[] };
type PostDef = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date?: string;
  readTime?: string;
  lead: string;
  sections: Section[];
  whenToCall: string;
};

const renderPost = (d: PostDef): React.ReactNode => (
  <>
    <p className="lead">{d.lead}</p>
    {d.sections.map((s, i) => (
      <React.Fragment key={i}>
        <h2>{s.h}</h2>
        {s.p && <p>{s.p}</p>}
        {s.list && (
          <ul>
            {s.list.map((li, j) => (
              <li key={j} dangerouslySetInnerHTML={{ __html: li }} />
            ))}
          </ul>
        )}
      </React.Fragment>
    ))}
    <h2>Quando procurar avaliação técnica</h2>
    <p>{d.whenToCall}</p>
    <p>
      Se o sintoma persistir depois das verificações seguras acima, interrompa os testes:
      insistir pode agravar o defeito ou colocar os seus arquivos em risco. O passo seguinte é
      uma avaliação técnica, que identifica a causa antes de qualquer reparo — o valor só é
      informado depois dessa avaliação.
    </p>
  </>
);

const defs: PostDef[] = [
  {
    slug: "pc-nao-liga-o-que-fazer",
    title: "PC não liga: como separar energia, vídeo e inicialização com segurança",
    excerpt:
      "PC sem sinal, com ventoinha sem vídeo ou reiniciando? Separe energia, POST e imagem antes de abrir a máquina ou trocar peças.",
    category: "Problemas de Computador",
    readTime: "10 min",
    lead:
      "“PC não liga” pode descrever situações diferentes: nenhuma energia, ventoinhas girando sem imagem, liga e desliga, ou sistema que não inicia. Antes de qualquer desmontagem, identifique em qual etapa o computador para. Essa separação evita trocar fonte, memória ou placa-mãe por tentativa.",
    sections: [
      {
        h: "1. Comece pelo que pode ser verificado sem abrir o gabinete",
        list: [
          "Teste a tomada com outro aparelho e, se houver régua ou filtro antigo, compare diretamente em uma tomada conhecida como funcional.",
          "Confira o cabo de força e a chave traseira da fonte, quando o modelo tiver essa chave.",
          "Desconecte periféricos USB e acessórios externos e tente uma única inicialização de comparação.",
          "Observe LEDs, ventoinhas, bipes e se o monitor chega a indicar mudança de sinal; anote o comportamento em vez de repetir tentativas em sequência.",
        ],
      },
      {
        h: "2. “Sem energia” é diferente de “liga, mas não dá vídeo”",
        list: [
          "<strong>Nenhum LED e nenhuma ventoinha:</strong> o caminho de alimentação precisa ser verificado antes de memória ou sistema.",
          "<strong>Ventoinhas giram, mas não há imagem:</strong> trate como falha de POST/vídeo; consulte <a href=\"/problemas/computador-nao-da-imagem\">computador liga mas não dá imagem</a>.",
          "<strong>Liga e desliga sozinho:</strong> alimentação, proteção térmica e placa podem estar envolvidas; veja <a href=\"/problemas/computador-desliga-sozinho\">computador desliga sozinho</a>.",
          "<strong>Chega ao logotipo e trava:</strong> o problema já saiu da etapa de energia e entra em boot/sistema.",
        ],
      },
      {
        h: "3. Depois de queda de energia, upgrade ou manutenção recente",
        p:
          "Se a falha começou imediatamente após trocar memória, placa de vídeo, SSD ou mexer em cabos internos, essa mudança é a evidência mais importante. Desligue da tomada antes de qualquer inspeção e não continue desmontando se não souber identificar conectores e travas do seu hardware.",
      },
      {
        h: "4. O que não usar como teste rápido",
        list: [
          "Não abra a carcaça da fonte de alimentação: capacitores internos podem manter energia mesmo fora da tomada.",
          "Não use ponte com clipe no conector ATX como diagnóstico de usuário. Fazer a ventoinha girar não comprova tensões corretas sob carga e o procedimento adiciona risco desnecessário.",
          "Não limpe contatos com abrasivos e não remova bateria CMOS como receita universal. Reset de firmware apaga configurações e só faz sentido quando há hipótese concreta ligada à configuração.",
          "Não substitua peças em sequência para “ver se pega”. O diagnóstico deve reduzir hipóteses antes da compra.",
        ],
      },
      {
        h: "5. Próximos caminhos de diagnóstico",
        list: [
          "Suspeita de fonte: <a href=\"/blog/como-testar-fonte-de-alimentacao-pc\">como testar a fonte do PC com critérios seguros</a>.",
          "Sinais de placa-mãe: <a href=\"/blog/como-diagnosticar-placa-mae-defeituosa\">como diagnosticar placa-mãe defeituosa</a>.",
          "Botão frontal ou ligação do gabinete: <a href=\"/blog/botao-power-nao-funciona-jump-start-placa-mae\">botão power não funciona</a>.",
          "Se a causa ainda estiver aberta, veja <a href=\"/diagnostico-tecnico\">como funciona o diagnóstico técnico</a> antes de autorizar troca de peça.",
        ],
      },
    ],
    whenToCall:
      "Interrompa as tentativas e procure avaliação quando houver cheiro de queimado, estalo elétrico, líquido, componente visivelmente danificado, fonte que arma e desarma repetidamente ou quando o equipamento contiver dados importantes e o comportamento mudar a cada tentativa. Esses sinais pedem medição e inspeção controlada, não troca de peça por tentativa.",
  },

  {
    slug: "tela-azul-windows-como-resolver",
    title: "Tela Azul no Windows: Como Resolver de Verdade (BSOD 2026)",
    excerpt: "Aprenda a interpretar os códigos de tela azul (BSOD) e resolva travamentos do Windows 10/11 com método profissional.",
    category: "Problemas de Computador",
    lead: "Tela azul (BSOD) no Windows é o sistema avisando que encontrou algo que não consegue tratar. O código de erro é a chave para resolver.",
    sections: [
      {
        h: "Códigos mais comuns e o que significam",
        list: [
          "<strong>DRIVER_IRQL_NOT_LESS_OR_EQUAL</strong>: driver corrompido ou incompatível",
          "<strong>PAGE_FAULT_IN_NONPAGED_AREA</strong>: memória RAM com defeito",
          "<strong>SYSTEM_SERVICE_EXCEPTION</strong>: serviço do Windows ou driver",
          "<strong>WHEA_UNCORRECTABLE_ERROR</strong>: hardware (CPU, RAM ou placa-mãe)",
          "<strong>CRITICAL_PROCESS_DIED</strong>: arquivo de sistema corrompido",
        ],
      },
      {
        h: "Passo 1 — Verifique atualizações recentes",
        p: "Se a tela azul começou após um Windows Update, vá em Configurações → Windows Update → Histórico → Desinstalar atualizações. Remova a última.",
      },
      {
        h: "Passo 2 — Teste a memória RAM",
        p: "Pressione Windows+R, digite mdsched.exe e reinicie. O teste pode demorar 30 minutos. Se aparecer erro, pelo menos um pente está com defeito.",
      },
      {
        h: "Passo 3 — Verifique arquivos de sistema",
        p: "Abra o Prompt de Comando como administrador e rode: sfc /scannow seguido de DISM /Online /Cleanup-Image /RestoreHealth.",
      },
      {
        h: "Passo 4 — Atualize drivers",
        p: "Drivers de placa de vídeo, chipset e rede são os maiores causadores. Baixe sempre do site do fabricante, nunca de sites genéricos.",
      },
    ],
    whenToCall: "Se a tela azul persiste após esses passos, há indícios de defeito em hardware. Um diagnóstico profissional identifica em minutos se é memória, SSD ou placa-mãe.",
  },
  {
    slug: "notebook-superaquecendo-solucoes",
    title: "Notebook Esquentando Muito: 7 Causas e Como Resolver",
    excerpt: "Notebook quente demais derrete componentes e perde desempenho. Veja as causas reais e as soluções definitivas.",
    category: "Notebook",
    lead: "Notebook quente perde 30-50% de desempenho automaticamente (thermal throttling) e tem vida útil reduzida. A boa notícia: 90% dos casos são resolvidos com limpeza interna.",
    sections: [
      {
        h: "Por que esquenta",
        list: [
          "Pasta térmica ressecada (acontece em 2-3 anos)",
          "Cooler entupido com poeira e pelos",
          "Uso em superfícies macias (cama, sofá) bloqueia entradas de ar",
          "Programas pesados rodando em segundo plano",
          "Drivers de GPU desatualizados",
          "BIOS antiga sem otimização térmica",
          "Bateria inchada empurrando o teclado",
        ],
      },
      { h: "Sinal de alerta — use um monitor", p: "Instale o HWMonitor (gratuito). Temperatura saudável: CPU abaixo de 80°C em uso pesado. Acima de 90°C é crítico." },
      { h: "Limpeza externa imediata", p: "Use ar comprimido nas saídas laterais e traseiras. Faça em curtos jatos, segurando a ventoinha com um palito para não girá-la." },
      { h: "Limpeza interna (faz diferença real)", p: "Desmontar o notebook, retirar o cooler, limpar com pincel macio e trocar a pasta térmica. Reduz a temperatura em 10-20°C." },
      { h: "Base refrigerada ajuda?", p: "Em parte. Reduz 3-5°C. Não substitui a limpeza interna." },
    ],
    whenToCall: "Se a temperatura passa de 90°C mesmo após limpeza superficial, a pasta térmica precisa ser trocada e o cooler aberto. É um serviço delicado que pede técnico experiente.",
  },
  {
    slug: "wifi-caindo-toda-hora",
    title: "Wi-Fi caindo toda hora: como descobrir se é sinal, roteador ou provedor",
    excerpt:
      "Wi-Fi desconecta em um aparelho ou na casa inteira? Compare cabo, distância, banda e dispositivos antes de trocar roteador ou culpar o provedor.",
    category: "Redes",
    readTime: "10 min",
    lead:
      "Quando o Wi-Fi cai, primeiro descubra qual camada falhou: um único dispositivo, somente a rede sem fio, o roteador inteiro ou também a conexão cabeada. Essa comparação é mais útil do que trocar canal, repetidor ou roteador sem evidência.",
    sections: [
      {
        h: "1. Isole a queda em quatro perguntas",
        list: [
          "<strong>Só um dispositivo cai?</strong> O problema pode estar no adaptador, driver, economia de energia ou configuração daquele aparelho.",
          "<strong>Todos perdem Wi-Fi, mas um computador no cabo continua online?</strong> A investigação fica concentrada na rede sem fio e no roteador.",
          "<strong>Cabo e Wi-Fi caem juntos?</strong> O problema pode estar no roteador, modem/ONT ou no link do provedor.",
          "<strong>Só acontece longe do roteador?</strong> Trate primeiro como cobertura e obstáculos, não como velocidade contratada.",
        ],
      },
      {
        h: "2. Faça comparações simples antes de alterar a configuração",
        list: [
          "Teste perto do roteador e depois no ponto onde a queda costuma acontecer, usando o mesmo dispositivo.",
          "Compare, no mesmo horário, um equipamento no cabo e outro no Wi-Fi quando isso for possível.",
          "Reinicie modem/roteador uma vez para comparação; reiniciar todo dia não é solução e pode esconder a recorrência.",
          "Se a falha começou após atualização ou troca de roteador, registre essa mudança antes de restaurar configurações de fábrica.",
        ],
      },
      {
        h: "3. 2,4 GHz, 5 GHz e canal: não existe ajuste universal",
        p:
          "Bandas e canais têm comportamentos diferentes conforme distância, obstáculos, vizinhança e capacidade do equipamento. Forçar um canal fixo ou separar nomes de rede pode ajudar em alguns ambientes, mas também pode piorar outros. Antes de alterar, registre a configuração atual e compare o resultado no mesmo local e horário.",
      },
      {
        h: "4. Posicionamento e interferência",
        list: [
          "Evite esconder o roteador dentro de armário fechado, atrás de grandes superfícies metálicas ou no chão quando houver alternativa.",
          "Paredes densas, lajes e distância reduzem sinal; um repetidor não corrige automaticamente um ponto em que o próprio repetidor já recebe sinal ruim.",
          "Número de dispositivos, capacidade de rádio e firmware variam muito entre modelos; não use um limite universal de conexões como diagnóstico.",
          "Atualize firmware apenas pela interface ou página oficial do fabricante e confirme o modelo/revisão de hardware antes de aplicar arquivo.",
        ],
      },
      {
        h: "5. Use o sintoma para seguir a trilha correta",
        list: [
          "Quedas intermitentes: <a href=\"/problemas/wifi-instavel\">Wi-Fi instável — causas e testes seguros</a>.",
          "Dúvida entre operadora e rede local: <a href=\"/blog/internet-lenta-provedor-ou-roteador\">internet lenta: provedor ou roteador?</a>.",
          "Roteiro passo a passo: <a href=\"/ferramentas/roteiro-wifi-instavel\">ferramenta de diagnóstico de Wi-Fi instável</a>.",
          "Cobertura, configuração e rede local: <a href=\"/servicos/redes-e-wifi\">serviço de redes e Wi-Fi</a>.",
        ],
      },
    ],
    whenToCall:
      "Vale partir para avaliação quando cabo e Wi-Fi caem juntos sem explicação do provedor, o roteador reinicia sozinho, a falha aparece em vários dispositivos mesmo perto dele, ou quando a solução exige reposicionar pontos, trocar equipamento ou revisar cabeamento. O objetivo é medir qual camada falha antes de comprar repetidor, mesh ou roteador novo.",
  },

  {
    slug: "pc-muito-lento-como-acelerar",
    title: "PC Muito Lento: Como Acelerar em 30 Minutos (Sem Formatar)",
    excerpt: "Aprenda o método dos técnicos para deixar o PC mais rápido sem precisar formatar. Funciona em Windows 10 e 11.",
    category: "Software / Sistema",
    lead: "PC lento raramente é 'velho demais' — geralmente está sobrecarregado de programas em background, disco fragmentado ou com pouca RAM livre. Dá para acelerar muito sem formatar.",
    sections: [
      { h: "1. Limpe a inicialização", p: "Ctrl+Shift+Esc → aba Inicializar. Desative tudo que não for essencial (Spotify, Steam, Adobe, OneDrive se não usa). Reduz o tempo de boot em até 70%." },
      { h: "2. Desinstale o que não usa", p: "Configurações → Apps → ordene por tamanho. Toolbars, antivírus duplicados e jogos esquecidos consomem disco e CPU em segundo plano." },
      { h: "3. Use o SSD que você já tem", p: "Se ainda usa HD mecânico, esse é o gargalo. Um SSD básico de 240GB transforma qualquer PC em ~10x mais rápido na inicialização e abertura de programas." },
      { h: "4. Aumente a RAM se possível", p: "Abaixo de 8GB no Windows 10/11 é sofrimento. Em notebooks, verifique slots livres com o CPU-Z." },
      { h: "5. Limpe arquivos temporários", p: "Windows+R → digite %temp% → Delete tudo. Faça também 'Limpeza de Disco' como administrador." },
      { h: "6. Verifique vírus e mineradores", p: "Use Malwarebytes (gratuito). Mineradores escondidos podem consumir 80% da CPU sem você perceber." },
    ],
    whenToCall: "Se mesmo após esses passos o PC continua arrastado, vale o diagnóstico para ver se há problema de hardware (HD com bad blocks, RAM com defeito) ou se é caso de formatação limpa.",
  },
  {
    slug: "como-remover-virus-sem-formatar",
    title: "Como Remover Vírus do PC Sem Formatar (Guia Profissional 2026)",
    excerpt: "Aprenda a remover vírus, trojans, ransomware e adware sem perder seus arquivos. Método usado por técnicos profissionais.",
    category: "Segurança",
    lead: "Em 95% dos casos, dá para remover vírus sem formatar e sem perder arquivos. O segredo é a ordem correta das ferramentas.",
    sections: [
      {
        h: "Sinais de infecção",
        list: [
          "Anúncios pop-up mesmo com navegador fechado",
          "Página inicial mudou sozinha",
          "PC muito lento e ventoinha sempre máxima",
          "Programas abrindo sozinhos",
          "Antivírus desativado e não liga mais",
          "Arquivos com extensão estranha (.locky, .crypto) — sinal de ransomware",
        ],
      },
      { h: "Passo 1 — Entre em Modo de Segurança", p: "No Windows 11: Configurações → Sistema → Recuperação → Inicialização Avançada → Reiniciar. Escolha 'Modo de Segurança com Rede'." },
      { h: "Passo 2 — Rode Malwarebytes", p: "Baixe e instale o Malwarebytes Free. Faça verificação completa (não a rápida). Remove tudo que encontrar e reinicie." },
      { h: "Passo 3 — Rode AdwCleaner", p: "Mesma fabricante. Especialista em adware, sequestradores de navegador e PUPs. Gratuito." },
      { h: "Passo 4 — Limpe os navegadores", p: "Resete Chrome/Edge/Firefox. Remova todas as extensões que você não reconhece. Limpe DNS local: ipconfig /flushdns no cmd." },
      { h: "Passo 5 — Verifique inicialização e tarefas agendadas", p: "Muitos malwares se recolocam via Agendador de Tarefas. Use Autoruns (Sysinternals) para auditar." },
    ],
    whenToCall: "Se for ransomware (arquivos criptografados pedindo resgate), NÃO pague e NÃO formate ainda. Em alguns casos é possível recuperar com ferramentas específicas — chame um técnico antes.",
  },
  {
    slug: "windows-nao-atualiza-erros",
    title: "Windows Não Atualiza: Como Resolver Erros do Windows Update",
    excerpt: "Erro 0x80070002, 0x8024a105, atualização travada em 0%? Veja como resolver de forma definitiva.",
    category: "Software / Sistema",
    lead: "Windows Update travado é um dos problemas mais frequentes — e a Microsoft só piorou com o Windows 11. Veja o passo a passo profissional.",
    sections: [
      { h: "Solução 1: o reset clássico", p: "Pare os serviços (Windows Update, BITS, Cryptographic), apague a pasta C:\\Windows\\SoftwareDistribution e reinicie os serviços. Resolve 60% dos casos." },
      { h: "Solução 2: solucionador de problemas", p: "Configurações → Sistema → Solução de Problemas → Outros Solucionadores → Windows Update → Executar." },
      { h: "Solução 3: DISM + SFC", p: "Prompt como admin: DISM /Online /Cleanup-Image /RestoreHealth seguido de sfc /scannow. Repara componentes corrompidos." },
      { h: "Solução 4: instale manualmente", p: "Vá no Catálogo do Microsoft Update, busque pelo número da KB que está falhando e baixe o .msu manualmente." },
      { h: "Solução 5: in-place upgrade", p: "Última cartada não destrutiva: baixe a ISO oficial do Windows, monte e rode setup.exe escolhendo 'Manter tudo'. Reinstala o sistema preservando arquivos e programas." },
    ],
    whenToCall: "Quando nenhum dos passos resolve, geralmente há corrupção profunda. O in-place upgrade remoto, feito por um técnico, salva sem perder nada.",
  },
  {
    slug: "impressora-nao-imprime-solucoes",
    title: "Impressora Não Imprime: 8 Soluções (HP, Epson, Brother, Canon)",
    excerpt: "Impressora aparece offline, na fila ou simplesmente ignora seus comandos? Veja como resolver em minutos.",
    category: "Problemas de Impressora",
    lead: "Impressora 'offline' é quase sempre problema de comunicação, não de hardware. Veja como diagnosticar rapidamente.",
    sections: [
      { h: "1. Reinicie tudo (regra de ouro)", p: "Desligue impressora da tomada por 30 segundos. Reinicie o roteador. Reinicie o PC. Resolve 40% dos casos." },
      { h: "2. Defina como padrão", p: "Configurações → Bluetooth e Dispositivos → Impressoras → escolha a sua → Definir como padrão. Desative 'Permitir que o Windows gerencie a impressora padrão'." },
      { h: "3. Limpe a fila", p: "Configurações → abrir a impressora → 'Abrir fila de impressão' → cancele todos os documentos travados." },
      { h: "4. Reinstale o driver", p: "Remova a impressora, baixe o driver oficial do site do fabricante (HP/Epson/Brother/Canon) e reinstale. Drivers genéricos do Windows costumam falhar." },
      { h: "5. Verifique o IP", p: "Em impressoras de rede, o IP pode mudar se o roteador reiniciar. Imprima o relatório de configuração da impressora para confirmar." },
      { h: "6. Spooler de impressão", p: "Win+R → services.msc → Spooler de Impressão → Reiniciar." },
      { h: "7. Firewall e antivírus", p: "Antivírus de terceiros (especialmente Avast e McAfee) bloqueiam comunicação com impressoras. Teste desativando temporariamente." },
      { h: "8. Cartucho ou toner", p: "Algumas impressoras bloqueiam a impressão se um único cartucho colorido estiver vazio, mesmo imprimindo em preto. Troque ou reset." },
    ],
    whenToCall: "Quando o problema persiste, geralmente é incompatibilidade entre versão do Windows e driver, ou configuração de rede. Resolvo remotamente em minutos.",
  },
  {
    slug: "ssd-vs-hd-vale-a-pena-upgrade",
    title: "SSD vs HD: Vale a Pena o Upgrade em 2026? (Resposta Honesta)",
    excerpt: "Comparativo real entre SSD e HD mecânico: velocidade, preço, durabilidade. Veja se o upgrade compensa para o seu uso.",
    category: "Hardware",
    lead: "Sim — em 99% dos casos vale a pena trocar HD por SSD. É o upgrade com melhor custo-benefício da história da computação pessoal.",
    sections: [
      {
        h: "Velocidade na vida real",
        list: [
          "<strong>Boot do Windows</strong>: HD ~90s / SSD SATA ~15s / SSD NVMe ~8s",
          "<strong>Abrir Chrome</strong>: HD 5s / SSD instantâneo",
          "<strong>Abrir Photoshop</strong>: HD 25s / SSD 4s",
          "<strong>Copiar 10GB</strong>: HD 4 min / SSD 30s / NVMe 5s",
        ],
      },
      { h: "Tipos de SSD", p: "SATA: o básico, conecta como HD comum. NVMe: 5x mais rápido, conecta direto na placa-mãe (slot M.2). Verifique no manual da sua placa." },
      { h: "Tamanho ideal", p: "240GB para uso básico, 480GB para uso comum, 1TB se tem muitos jogos. Não economize muito: ficar com 90% cheio reduz a vida útil do SSD." },
      { h: "Marcas confiáveis", p: "Kingston, Samsung, Crucial, WD. Evite marcas desconhecidas com preço muito abaixo do mercado — costumam ter 1/3 da vida útil." },
      { h: "Posso reaproveitar o HD?", p: "Sim, ótima ideia: SSD para sistema + programas; HD antigo para arquivos, fotos e backup." },
    ],
    whenToCall: "Faço migração completa remoto: clono o sistema do HD para o SSD sem perder nada (programas, arquivos, senhas). Em notebooks, oriento a troca física por vídeo-chamada.",
  },
  {
    slug: "como-fazer-backup-na-nuvem",
    title: "Backup na nuvem: como montar uma cópia que você consegue restaurar",
    excerpt:
      "Sincronizar não basta: organize arquivos, mantenha cópia independente, confirme versionamento e teste a restauração antes de confiar no backup.",
    category: "Segurança",
    readTime: "11 min",
    lead:
      "Backup na nuvem não é apenas colocar arquivos em uma pasta sincronizada. Uma estratégia útil precisa responder a três perguntas: o que está protegido, quantas cópias independentes existem e se uma restauração já foi testada. O provedor pode mudar; esses critérios continuam válidos.",
    sections: [
      {
        h: "1. Separe sincronização de backup",
        list: [
          "<strong>Sincronização</strong> mantém arquivos alinhados entre dispositivos, mas uma exclusão ou alteração pode se propagar.",
          "<strong>Versionamento e lixeira do provedor</strong> ajudam a recuperar estados anteriores, mas retenção e limites dependem do serviço e do plano.",
          "<strong>Cópia independente</strong> fica fora do caminho normal de sincronização e reduz o risco de uma ação errada afetar tudo ao mesmo tempo.",
          "Veja o conceito completo em <a href=\"/blog/backup-como-proteger-seus-arquivos\">backup: como proteger seus arquivos</a>.",
        ],
      },
      {
        h: "2. Defina primeiro o que não pode ser perdido",
        list: [
          "Documentos de trabalho, fotos originais, projetos, arquivos financeiros e chaves de recuperação merecem prioridade.",
          "Não presuma que Área de Trabalho, Downloads, e-mail local ou pastas de aplicativos entram automaticamente na nuvem; confirme o escopo configurado.",
          "Antes de migrar ou formatar, faça um inventário do que precisa existir depois da restauração.",
        ],
      },
      {
        h: "3. Use múltiplas cópias como estratégia, não como número mágico",
        p:
          "A regra 3-2-1 é uma referência conhecida: múltiplas cópias, em meios diferentes, com pelo menos uma fora do equipamento principal. O ponto importante não é decorar a fórmula, mas evitar que falha do computador, ransomware, exclusão acidental ou problema de conta atinja todas as cópias ao mesmo tempo.",
      },
      {
        h: "4. Configure a nuvem sem depender de preços ou franquias que mudam",
        list: [
          "Escolha um serviço que ofereça autenticação forte, histórico/versionamento compatível com a sua necessidade e exportação dos arquivos.",
          "Ative autenticação em dois fatores e guarde os meios de recuperação da conta em local separado.",
          "Não baseie a decisão em uma franquia gratuita citada em um artigo: capacidade, preço e política de retenção mudam. Confira sempre a página oficial do provedor.",
          "Para comparar nuvem e armazenamento local, use <a href=\"/decisoes/nuvem-ou-hd-externo\">nuvem ou HD externo?</a>.",
        ],
      },
      {
        h: "5. Teste a restauração antes de considerar o trabalho concluído",
        list: [
          "Escolha uma pequena amostra representativa: documento, foto, pasta e arquivo grande.",
          "Restaure para um local diferente do original e abra os arquivos, em vez de apenas verificar se aparecem na interface.",
          "Registre qual conta, dispositivo e método foram usados para restaurar; isso reduz improviso quando houver uma perda real.",
          "Use também o roteiro <a href=\"/blog/como-testar-restauracao-de-backup\">como testar a restauração de um backup</a>.",
        ],
      },
    ],
    whenToCall:
      "Procure ajuda quando os dados existem em vários serviços sem uma cópia claramente restaurável, quando a conta foi bloqueada ou comprometida, quando há grande volume para migrar, ou antes de formatar um computador que contém arquivos únicos. O objetivo é provar a restauração antes de apagar a origem.",
  },

  {
    slug: "como-recuperar-arquivos-apagados",
    title: "Arquivos apagados: o que fazer antes de tentar recuperar",
    excerpt:
      "Apagou um arquivo ou esvaziou a lixeira? Pare de gravar no mesmo disco, procure cópias existentes e só então escolha um método de recuperação.",
    category: "Procedimentos Técnicos",
    readTime: "11 min",
    lead:
      "Ao apagar um arquivo, a prioridade não é instalar várias ferramentas: é evitar novas gravações na mesma mídia. O resultado depende do tipo de armazenamento, do que aconteceu depois da exclusão e de existirem versões, lixeira, backup ou dados ainda não sobrescritos.",
    sections: [
      {
        h: "1. Pare de escrever no local onde o arquivo estava",
        list: [
          "Não baixe ferramenta de recuperação no mesmo disco que continha o arquivo perdido.",
          "Evite instalar programas, copiar arquivos grandes ou executar limpeza/otimização nessa unidade.",
          "Se for cartão, pendrive ou disco externo, desconecte depois de identificar o problema e preserve a mídia até decidir o próximo passo.",
          "Se o disco também apresenta ruído, desconexões ou lentidão severa, trate primeiro como possível falha física.",
        ],
      },
      {
        h: "2. Procure cópias antes de fazer varredura de recuperação",
        list: [
          "Confira Lixeira, histórico/versionamento do serviço de nuvem e outras máquinas sincronizadas.",
          "Verifique backups externos e pontos de restauração de arquivos que você já tenha configurado.",
          "Em ambientes corporativos, confirme se existe backup central antes de manipular a estação.",
          "O guia <a href=\"/problemas/arquivos-apagados\">arquivos apagados: primeiros passos</a> organiza essa triagem.",
        ],
      },
      {
        h: "3. HD, SSD, pendrive e cartão não se comportam do mesmo jeito",
        p:
          "Em discos magnéticos, um arquivo excluído pode continuar recuperável até que seus blocos sejam sobrescritos. Em SSDs, recursos como TRIM e rotinas internas do controlador podem reduzir a possibilidade de recuperação, mas o comportamento depende do sistema, da unidade e do momento em que os comandos foram processados. Não trate “SSD = impossível” como regra absoluta.",
      },
      {
        h: "4. Ferramentas de recuperação não devem escrever na origem",
        list: [
          "Quando uma ferramenta for apropriada, execute a partir de outra unidade e salve os arquivos recuperados em destino diferente.",
          "Não formate uma mídia apenas porque o sistema pede formatação; isso altera estruturas que podem ser úteis à recuperação.",
          "Não rode reparo de sistema de arquivos por tentativa em unidade com dados únicos sem antes avaliar o risco.",
          "Se houver falha física ou setores instáveis, a abordagem muda para aquisição/imagem controlada; consulte <a href=\"/blog/como-recuperar-dados-hd-com-defeito\">recuperação de dados de HD com defeito</a>.",
        ],
      },
      {
        h: "5. Critérios de parada",
        list: [
          "HD com clique, raspagem, rotação irregular ou desaparecendo da BIOS/UEFI.",
          "Unidade que desconecta durante leitura ou deixa o sistema travado.",
          "Arquivos empresariais, fiscais, jurídicos ou pessoais sem nenhuma outra cópia.",
          "Ransomware ou suspeita de invasão: preserve evidências e não misture recuperação de arquivo com limpeza do incidente.",
        ],
      },
    ],
    whenToCall:
      "A avaliação especializada é indicada quando a mídia apresenta sinais físicos, quando os dados são insubstituíveis ou quando tentativas anteriores já alteraram partições e sistema de arquivos. Em recuperação, reduzir novas escritas costuma ser mais importante do que tentar mais uma ferramenta.",
  },

  {
    slug: "como-aumentar-velocidade-internet",
    title: "Como Aumentar a Velocidade da Internet em Casa (Sem Mudar de Plano)",
    excerpt: "Internet contratada de 300MB e só chega 50? Veja como recuperar a velocidade real sem pagar mais à operadora.",
    category: "Redes",
    lead: "Em 80% dos casos, a internet 'lenta' não é da operadora — é do seu Wi-Fi, do roteador ou de algum dispositivo sugando banda em segundo plano.",
    sections: [
      { h: "1. Teste com cabo", p: "Conecte um notebook direto no modem com cabo. Se a velocidade chega correta, o problema é o Wi-Fi. Se não chega, é a operadora." },
      { h: "2. Posicione o roteador corretamente", p: "Centro da casa, alto, longe de eletrodomésticos, paredes de concreto e aquários (água absorve sinal de Wi-Fi)." },
      { h: "3. Use 5GHz sempre que possível", p: "5GHz é até 3x mais rápido que 2.4GHz em curtas distâncias. Configure SSIDs separados para escolher quando quiser." },
      { h: "4. Atualize o firmware do roteador", p: "Roteadores fornecidos por operadora costumam ficar anos sem atualização. Verifique no painel administrativo." },
      { h: "5. Mude os DNS", p: "Use 1.1.1.1 (Cloudflare) ou 8.8.8.8 (Google). Costuma deixar a navegação 20-30% mais rápida que os DNS da operadora." },
      { h: "6. Limite dispositivos pesados", p: "Smart TVs em 4K, downloads automáticos do Steam/Xbox e backups de celular podem consumir toda a banda. Configure horários." },
      { h: "7. Considere mesh ou repetidor", p: "Casas com mais de 80m² ou 2 andares precisam de mais de um ponto de Wi-Fi. Mesh é melhor que repetidor." },
    ],
    whenToCall: "Configuro otimização completa de rede (roteador, mesh, DNS, QoS) remotamente. Tipicamente recupero 50-70% da velocidade que estava sendo desperdiçada.",
  },
  {
    slug: "como-saber-se-pc-tem-virus",
    title: "Como Saber Se Meu PC Tem Vírus: 10 Sinais Reais (2026)",
    excerpt: "Aprenda os sinais reais de infecção por vírus, trojan ou minerador de criptomoeda — e como confirmar sem pânico.",
    category: "Segurança",
    lead: "Nem todo PC lento tem vírus, e nem todo vírus deixa o PC lento. Veja os sinais reais de infecção que técnicos identificam.",
    sections: [
      {
        h: "Sinais de infecção comum",
        list: [
          "Anúncios pop-up mesmo com o navegador fechado",
          "Página inicial do navegador mudou sozinha",
          "Extensões novas no Chrome/Edge que você não instalou",
          "Antivírus desativado e não liga mais",
          "PC muito quente em uso leve (sinal de minerador)",
          "Ventoinha sempre máxima sem motivo",
          "Programas abrindo sozinhos",
          "Internet lenta mas sem download ativo",
          "Arquivos com extensão estranha (.locky, .crypted) — ransomware",
          "Amigos recebendo mensagens estranhas vindas de você",
        ],
      },
      { h: "Como confirmar", p: "Gerenciador de Tarefas (Ctrl+Shift+Esc) → ordene por CPU. Processos desconhecidos consumindo CPU em momento de ociosidade são suspeitos. Pesquise o nome no Google." },
      { h: "Faça uma varredura combinada", p: "Use Defender (já vem no Windows) + Malwarebytes + AdwCleaner, nessa ordem. Cada um pega coisas diferentes." },
      { h: "Verifique inicialização e tarefas agendadas", p: "Muitos malwares se recolocam após cada boot. Use Autoruns (Microsoft Sysinternals) — ferramenta gratuita e oficial." },
    ],
    whenToCall: "Se confirmou infecção, especialmente ransomware, NÃO formate por impulso. Faço análise remota e identifico se dá para limpar sem perder seus arquivos.",
  },
  {
    slug: "como-clonar-hd-para-ssd-passo-a-passo",
    title: "Como Clonar HD para SSD Sem Perder Nada (Guia Passo a Passo 2026)",
    excerpt: "Migre do HD para SSD mantendo Windows, programas e arquivos exatamente como estão. Sem reinstalar nada.",
    category: "Procedimentos Técnicos",
    lead: "Clonar é melhor que formatar quando você quer apenas trocar o disco e manter tudo funcionando — Windows, programas, drivers, configurações.",
    sections: [
      { h: "O que você precisa", p: "SSD novo (igual ou maior que os dados usados no HD), case USB para SSD (R$ 30-50) ou conexão SATA, ferramenta de clonagem." },
      {
        h: "Ferramentas gratuitas confiáveis",
        list: [
          "<strong>Macrium Reflect Free</strong>: o padrão profissional",
          "<strong>Samsung Data Migration</strong>: oficial Samsung, simples",
          "<strong>Acronis True Image WD/SanDisk</strong>: gratuito se você comprar SSD dessas marcas",
          "<strong>Clonezilla</strong>: open source, mais técnico",
        ],
      },
      { h: "Passo 1 — Conecte o SSD", p: "Use case USB para conectar o SSD novo. O Windows pode pedir para inicializar — apenas inicialize sem formatar." },
      { h: "Passo 2 — Faça a clonagem", p: "Abra o Macrium Reflect → 'Clone this disk' → selecione HD como origem e SSD como destino. Marque a opção de redimensionar partições para usar todo o espaço do SSD." },
      { h: "Passo 3 — Troque os discos", p: "Desligue o PC. Tire o HD e coloque o SSD no lugar. Em notebooks, o SSD geralmente vai onde estava o HD." },
      { h: "Passo 4 — Boot e otimização", p: "Ligue. Se não der boot, entre na BIOS e mude a ordem de boot para o SSD. Após o Windows carregar, ative o TRIM (rode 'fsutil behavior set DisableDeleteNotify 0' como admin)." },
    ],
    whenToCall: "Faço clonagem remota completa: oriento a conexão por vídeo, executo a clonagem, ajusto BIOS e otimizo o SSD. Tudo em 1-2 horas.",
  },
  {
    slug: "como-instalar-windows-11-do-zero-2026",
    title: "Como Instalar Windows 11 do Zero (Passo a Passo Atualizado 2026)",
    excerpt: "Instalação limpa do Windows 11 com pendrive bootável, drivers e ativação. Guia completo para iniciantes e técnicos.",
    category: "Procedimentos Técnicos",
    lead: "Instalação limpa do Windows 11 é mais simples do que parece — mas tem detalhes importantes em 2026 com os requisitos de TPM e Secure Boot.",
    sections: [
      { h: "Requisitos mínimos atualizados", p: "TPM 2.0 ativado na BIOS, Secure Boot habilitado, 4GB RAM, 64GB de disco, processador compatível (Intel 8ª gen+ ou Ryzen 2000+). PCs sem TPM podem instalar com truques de registro, mas perdem updates." },
      { h: "Passo 1 — Crie o pendrive bootável", p: "Baixe o Media Creation Tool no site oficial da Microsoft. Use pendrive de 8GB+. Aceite formatar." },
      { h: "Passo 2 — Faça backup", p: "Backup completo dos seus arquivos. Mesmo escolhendo formatar só uma partição, acidentes acontecem." },
      { h: "Passo 3 — Boot pelo pendrive", p: "Reinicie. Aperte a tecla de boot menu (F12 / F11 / Esc dependendo da marca). Escolha o pendrive." },
      { h: "Passo 4 — Instalação", p: "Idioma → Português Brasil. Escolha 'Instalação personalizada' → apague todas as partições antigas → instale na partição não alocada (Windows cria as 4 partições automáticas)." },
      { h: "Passo 5 — Conta local (se quiser)", p: "Windows 11 força conta Microsoft. Para usar conta local: na tela de internet, aperte Shift+F10 → digite 'oobe\\bypassnro' → reinicie → 'Não tenho internet' → 'Continuar com configuração limitada'." },
      { h: "Passo 6 — Drivers e ativação", p: "Instale drivers do site do fabricante. Ative com a sua chave (Configurações → Sistema → Ativação). Se for upgrade de Windows 10, geralmente ativa sozinho." },
    ],
    whenToCall: "Faço instalação remota completa: orientação para criar pendrive, instalação via vídeo-chamada, drivers, ativação e configurações personalizadas.",
  },
  {
    slug: "como-trocar-pasta-termica",
    title: "Como Trocar a Pasta Térmica do PC e Notebook (Guia 2026)",
    excerpt: "Aprenda quando trocar a pasta térmica e como aplicar corretamente para reduzir até 20°C de temperatura.",
    category: "Hardware",
    lead: "Pasta térmica ressecada é a causa #1 de superaquecimento em PCs e notebooks com mais de 2 anos. Trocar custa R$ 30 e devolve a performance.",
    sections: [
      { h: "Quando trocar", p: "PCs: a cada 3-4 anos. Notebooks: a cada 2 anos (térmicas mais críticas). Quando a temperatura passa de 85°C em uso normal, é hora." },
      { h: "Material necessário", p: "Pasta térmica (Cooler Master MasterGel, Arctic MX-4 ou Thermal Grizzly), pano de microfibra, álcool isopropílico 99%, chaves Philips." },
      { h: "Passo 1 — Acesse o cooler", p: "PC: abra a lateral, solte os 4 parafusos do cooler ou trava. Notebook: remova a tampa inferior, desconecte a bateria, solte os parafusos numerados do cooler." },
      { h: "Passo 2 — Remova a pasta antiga", p: "Com cotonete embebido em álcool isopropílico, limpe completamente o die da CPU/GPU e a base do cooler. Tem que ficar espelhado." },
      { h: "Passo 3 — Aplique a nova pasta", p: "Para CPUs pequenas: gota do tamanho de um grão de arroz no centro. Para CPUs grandes: linha fina ou método X. Nunca espalhe com o dedo — o cooler espalha sozinho." },
      { h: "Passo 4 — Reinstale o cooler", p: "Aperte os parafusos em X, gradualmente, sem favaliar o valor. Em notebooks, siga a ordem numerada estampada no cooler." },
      { h: "Passo 5 — Teste", p: "Após ligar, monitore com HWMonitor por 15 minutos. Em uso normal, a temperatura deve cair 10-20°C em relação ao que estava antes." },
    ],
    whenToCall: "Em notebooks modernos (especialmente gamer e Apple), a troca é delicada e exige desmontagem completa. Oriento por vídeo-chamada ou indico técnico próximo da sua cidade.",
  },

  {
    slug: "diferenca-windows-10-vs-11",
    title: "Windows 10 vs Windows 11: Devo Atualizar em 2026? (Análise Honesta)",
    excerpt: "Comparativo real entre Windows 10 e 11 em 2026: performance, recursos, problemas e quando vale (ou não) atualizar.",
    category: "Software / Sistema",
    lead: "Windows 10 perdeu suporte oficial em outubro de 2025. Em 2026, atualizar para o 11 deixou de ser opcional para a maioria dos usuários — mas tem ressalvas.",
    sections: [
      {
        h: "Por que migrar (lado bom)",
        list: [
          "Atualizações de segurança (Windows 10 não recebe mais)",
          "Suporte oficial a TPM 2.0 e Secure Boot",
          "Snap Layouts e desktops virtuais muito melhores",
          "Interface mais moderna e consistente",
          "Melhor desempenho em CPUs Intel 12ª gen+ (eficiência híbrida)",
          "Recursos de IA integrados (Copilot)",
        ],
      },
      {
        h: "Por que adiar (lado ruim)",
        list: [
          "Requisitos de hardware mais altos (TPM, Secure Boot)",
          "Menu Iniciar e barra de tarefas menos customizáveis",
          "Drivers antigos podem não ser compatíveis",
          "Programas legados podem ter problemas",
          "Curva de adaptação para usuários acostumados ao Win10",
        ],
      },
      { h: "Seu PC é compatível?", p: "Use o aplicativo 'PC Health Check' da Microsoft. Verifica TPM 2.0, Secure Boot, processador e memória." },
      { h: "PC não passa nos requisitos — e agora?", p: "Opção 1: instalar com bypass (perde updates). Opção 2: migrar para Linux Mint (interface familiar, leve, atualizado). Opção 3: trocar o PC." },
      { h: "Como atualizar com segurança", p: "Backup completo → desconecte periféricos não essenciais → use o assistente oficial → reserve 1-2 horas." },
    ],
    whenToCall: "Faço upgrade remoto do Windows 10 para 11 com backup, verificação de compatibilidade e validação de drivers — tudo em ~2 horas, sem perder seus arquivos.",
  },
  {
    slug: "melhores-antivirus-gratuitos-2026",
    title: "Melhores Antivírus Gratuitos em 2026: Comparativo Honesto",
    excerpt: "Veja quais antivírus gratuitos realmente protegem em 2026 — sem propaganda, baseado em testes de laboratório.",
    category: "Segurança",
    lead: "O Windows Defender (já incluso no Windows) virou um dos melhores antivírus do mundo. Mas existem casos onde vale combinar com outras ferramentas. Sem hype, veja a verdade.",
    sections: [
      {
        h: "Top 5 antivírus gratuitos (com base nos testes AV-Test e AV-Comparatives 2025-2026)",
        list: [
          "<strong>Microsoft Defender</strong> (já vem no Windows) — protege bem, não pesa, integrado",
          "<strong>Bitdefender Antivirus Free</strong> — leve, motor excelente, sem propagandas",
          "<strong>Avast Free</strong> — bom motor, mas mostra muitas propagandas e tenta vender extras",
          "<strong>Kaspersky Security Cloud Free</strong> — excelente detecção (avaliar implicações geopolíticas)",
          "<strong>AVG Antivirus Free</strong> — mesmo motor da Avast, mais simples",
        ],
      },
      { h: "A combinação que técnicos usam", p: "Microsoft Defender (sempre ativo) + Malwarebytes Free (varredura mensal) + AdwCleaner (quando suspeitar de adware). Cobertura praticamente total sem pagar nada." },
      { h: "Antivírus pagos valem a pena?", p: "Para usuários comuns: não. Para empresas, gamers e quem usa internet banking: vale o ESET, Bitdefender Total Security ou Norton 360 (~R$ 200/ano)." },
      { h: "Sinais de antivírus falso", p: "Pop-up agressivo dizendo 'seu PC tem 234 vírus, clique para limpar' — sempre fraude. Antivírus legítimo não usa esse tipo de marketing." },
      { h: "Boas práticas valem mais que antivírus", p: "Não baixar de sites suspeitos, não abrir anexos de e-mails desconhecidos, manter Windows atualizado, usar gerenciador de senhas, ativar 2FA em tudo." },
    ],
    whenToCall: "Configuro proteção em camadas (Defender + Malwarebytes + DNS seguro + backup) remotamente. Mais eficaz que qualquer antivírus pago sozinho.",
  },
];

const HOWTO_DEFAULT_DATE = "2026-06-14";

export const PROGRAMMATIC_POST_SLUGS = defs.map((d) => d.slug);

export const programmaticPosts: Record<string, ProgrammaticPost> = defs.reduce(
  (acc, d) => {
    acc[d.slug] = {
      title: d.title,
      excerpt: d.excerpt,
      date: d.date || HOWTO_DEFAULT_DATE,
      readTime: d.readTime || "8 min",
      category: d.category,
      content: renderPost(d),
    };
    return acc;
  },
  {} as Record<string, ProgrammaticPost>,
);

// Metadata only (for use in Blog listing)
export const programmaticPostsMeta = defs.map((d) => ({
  slug: d.slug,
  title: d.title,
  excerpt: d.excerpt,
  date: d.date || HOWTO_DEFAULT_DATE,
  readTime: d.readTime || "8 min",
  category: d.category,
}));
