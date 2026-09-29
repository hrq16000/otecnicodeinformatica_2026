import React from "react";
import type { BlogPostContent } from "@/data/blogPostsContent";

/**
 * Conteúdos editoriais suplementares.
 *
 * Mantidos fora do arquivo monolítico blogPostsContent.tsx para reduzir o
 * risco de corrupção/edições acidentais no acervo histórico. A rota e a página
 * do blog compõem base + suplementares + programáticos.
 */
export const blogSupplementalPosts: Record<string, BlogPostContent> = {
  "ssd-nao-aparece-no-instalador-do-windows": {
    title: "SSD não aparece no instalador do Windows: como diagnosticar sem apagar dados",
    excerpt:
      "A BIOS reconhece o SSD, mas o Windows Setup não mostra nenhuma unidade? Separe firmware, controlador, driver e compatibilidade antes de mudar VMD, RAID ou apagar partições.",
    date: "2026-09-26",
    readTime: "12 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">
          Quando o SSD aparece na BIOS/UEFI, mas não aparece na tela de escolha de disco do instalador do Windows,
          o problema não deve ser tratado como “SSD queimado” nem como convite para apagar partições. O caminho
          correto é descobrir em qual camada a unidade deixa de ser reconhecida: firmware, controlador de
          armazenamento, driver do Windows Setup, compatibilidade do slot ou mídia de instalação.
        </p>

        <h2>Resposta curta: primeiro descubra onde o SSD desaparece</h2>
        <p>
          O teste mais importante acontece antes do instalador. Entre na BIOS/UEFI e confirme se o modelo do SSD é
          listado. Se ele não aparece ali, o Windows ainda não participa do problema: verifique encaixe, slot,
          alimentação, protocolo SATA/NVMe e compatibilidade da placa. Se o firmware reconhece a unidade e apenas o
          Windows Setup não a mostra, controlador e driver passam a ser hipóteses fortes.
        </p>

        <h2>1. Se a BIOS/UEFI não reconhece o SSD</h2>
        <ul>
          <li>Desligue o equipamento antes de reposicionar um SSD M.2 ou revisar cabos SATA e alimentação.</li>
          <li>Confirme no manual do equipamento se o slot aceita o protocolo da unidade. M.2 é formato físico; pode existir slot M.2 SATA, PCIe/NVMe ou suporte parcial.</li>
          <li>Se houver outro slot compatível, teste apenas quando o fabricante permitir e sem alterar outras variáveis ao mesmo tempo.</li>
          <li>Quando a unidade some e volta no firmware, apresenta aquecimento anormal ou falha também em outro equipamento compatível, a hipótese de hardware ganha força.</li>
        </ul>
        <p>
          Para um disco que nem o firmware detecta, veja também{" "}
          <a href="/blog/hd-nao-e-reconhecido-na-bios-o-que-fazer">
            HD ou SSD não reconhecido na BIOS
          </a>.
        </p>

        <h2>2. Se a BIOS reconhece, mas o instalador não mostra a unidade</h2>
        <p>
          Nesse cenário, o SSD existe para o firmware, mas o ambiente de instalação ainda pode não ter o driver
          necessário para conversar com o controlador. Isso aparece em equipamentos configurados com tecnologias
          como VMD, Intel RST ou RAID, entre outras soluções de fabricante.
        </p>
        <p>
          Na tela de seleção de disco, use a opção de <strong>carregar driver</strong> quando o fabricante do
          notebook, placa-mãe ou controlador fornecer um pacote específico para instalação do Windows. Prefira o
          pacote oficial do modelo exato do equipamento; não baixe “drivers universais” de sites de terceiros.
        </p>

        <h2>3. Não mude VMD, RST, RAID ou AHCI por tentativa</h2>
        <p>
          Alterar o modo do controlador pode fazer a unidade aparecer no instalador, mas também pode impedir uma
          instalação existente de iniciar. Em máquinas com BitLocker, uma mudança de firmware/controlador também
          pode exigir a chave de recuperação. Antes de modificar qualquer opção, fotografe ou anote o estado
          original e confirme o procedimento recomendado pelo fabricante.
        </p>
        <p>
          Se existe Windows funcionando nesse mesmo SSD ou há arquivos importantes, a prioridade é preservar os
          dados e confirmar a chave BitLocker antes de qualquer alteração.
        </p>

        <h2>4. M.2 não significa automaticamente NVMe</h2>
        <p>
          Dois SSDs com aparência física parecida podem usar interfaces diferentes. Um módulo M.2 SATA não é a
          mesma coisa que um M.2 NVMe/PCIe. A chave do conector, o comprimento da placa e o formato não bastam para
          provar compatibilidade elétrica e de protocolo. Use o manual da placa-mãe ou do notebook e a
          especificação do SSD para confirmar o suporte.
        </p>

        <h2>5. Confirme a mídia oficial do Windows</h2>
        <p>
          Se o controlador e o SSD estão corretos, recrie a mídia de instalação com a ferramenta oficial da
          Microsoft quando houver suspeita de pendrive corrompido, imagem antiga ou preparação feita por método
          desconhecido. Isso evita investigar driver e hardware com uma mídia defeituosa no meio do caminho.
        </p>
        <p>
          O guia{" "}
          <a href="/blog/como-instalar-windows-11-do-zero">
            como preparar uma instalação limpa do Windows 11
          </a>{" "}
          cobre backup, mídia oficial, licença e requisitos antes da reinstalação.
        </p>

        <h2>6. Use o DiskPart primeiro apenas para leitura</h2>
        <p>
          No ambiente de instalação, o Prompt de Comando pode ajudar a descobrir se o Windows já enxerga o disco
          mesmo quando a interface gráfica não o apresenta como destino esperado. Comece somente com comandos de
          leitura:
        </p>
        <pre><code>{"diskpart\nlist disk\nlist volume\nexit"}</code></pre>
        <p>
          Se a unidade aparece no <code>list disk</code>, o ambiente do Windows já conseguiu enumerá-la. Isso muda
          a investigação para partições, seleção do destino e estado do disco. Não use <code>clean</code>,
          <code>convert</code> ou exclusão de partições como “teste”: esses comandos podem destruir a estrutura de
          dados.
        </p>

        <h2>7. Antes de apagar partições, responda três perguntas</h2>
        <ul>
          <li><strong>Há arquivos importantes?</strong> Se sim, pare e faça backup ou recuperação antes de instalar.</li>
          <li><strong>Existe Windows antigo nesse disco?</strong> Se sim, confirme se a intenção é realmente uma instalação limpa.</li>
          <li><strong>Há BitLocker?</strong> Confirme e guarde a chave de recuperação fora do equipamento.</li>
        </ul>

        <h2>Mapa de decisão</h2>
        <table>
          <thead>
            <tr><th>O que você observa</th><th>Próxima verificação</th></tr>
          </thead>
          <tbody>
            <tr><td>SSD não aparece na BIOS/UEFI</td><td>Encaixe, slot, protocolo, alimentação e compatibilidade.</td></tr>
            <tr><td>SSD aparece na BIOS, mas não no Windows Setup</td><td>Driver oficial do controlador e configuração VMD/RST/RAID/AHCI.</td></tr>
            <tr><td>SSD aparece no DiskPart</td><td>Partições, destino escolhido e preservação de dados antes de qualquer ação destrutiva.</td></tr>
            <tr><td>SSD aparece de forma intermitente</td><td>Interrompa a instalação e investigue hardware/contato/temperatura antes de gravar dados.</td></tr>
          </tbody>
        </table>

        <h2>Não confunda com “SSD não aparece no Gerenciamento de Disco”</h2>
        <p>
          Depois que o Windows já está iniciado, um SSD novo sem partição ou sem letra é outro problema. Nesse caso,
          use o guia{" "}
          <a href="/blog/ssd-nvme-nao-aparece-no-gerenciador-de-discos">
            SSD aparece na BIOS mas não no Windows
          </a>. O artigo atual trata especificamente da etapa de instalação do Windows, antes do sistema iniciar.
        </p>

        <h2>Quando interromper e procurar avaliação técnica</h2>
        <p>
          Pare antes de continuar se o SSD contém dados importantes, se a unidade some do firmware, se o computador
          usa BitLocker sem chave disponível, se a mudança do controlador afeta um Windows existente ou se você não
          consegue confirmar a compatibilidade do slot. O objetivo é identificar a camada que falhou antes de
          formatar, trocar SSD ou alterar firmware.
        </p>
      </>
    ),
  },

  "como-instalar-ubuntu-do-zero": {
    title: "Como instalar Ubuntu do zero: guia seguro para PC e notebook",
    excerpt:
      "Instale Ubuntu por pendrive com backup, escolha correta do disco, dual boot, BitLocker e atualização pós-instalação — sem apagar dados por engano.",
    date: "2026-09-26",
    readTime: "13 min",
    category: "Linux e Sistemas Operacionais",
    content: (
      <>
        <p className="lead">
          Instalar Ubuntu não é apenas clicar em “avançar”. A parte que merece atenção acontece antes da cópia dos
          arquivos: confirmar o backup, criar a mídia corretamente, identificar o disco certo e decidir se o
          computador ficará só com Ubuntu ou continuará com outro sistema. Este guia segue a documentação oficial
          atual do Ubuntu e prioriza decisões reversíveis antes de qualquer etapa destrutiva.
        </p>

        <h2>Resposta curta: a ordem segura da instalação</h2>
        <ol>
          <li>Faça backup dos arquivos importantes e confirme que a cópia abre.</li>
          <li>Baixe a imagem do Ubuntu no site oficial.</li>
          <li>Grave a imagem em um pendrive próprio para instalação; copiar o arquivo ISO não basta.</li>
          <li>Inicialize pelo pendrive e teste o ambiente antes de instalar quando houver dúvida de compatibilidade.</li>
          <li>Escolha conscientemente entre apagar o disco, instalar ao lado de outro sistema ou particionar manualmente.</li>
          <li>Revise o resumo final antes de confirmar qualquer alteração no armazenamento.</li>
          <li>Depois da instalação, aplique as atualizações e valide rede, áudio, vídeo e periféricos.</li>
        </ol>

        <h2>1. Antes de começar: defina o que deve sobreviver à instalação</h2>
        <p>
          Se o computador já tem Windows, outro Linux ou arquivos pessoais, comece pelo inventário: documentos,
          fotos, perfis de navegador, chaves de recuperação, arquivos de trabalho e qualquer configuração que não
          possa ser recriada. Backup não é “copiei uma pasta e acho que foi”; abra alguns arquivos diretamente na
          cópia e confirme que o destino está acessível sem depender do computador que será alterado.
        </p>
        <p>
          Se houver Windows com BitLocker, confirme a chave de recuperação antes de mexer em partições ou firmware.
          A própria documentação do Ubuntu informa que o instalador não consegue instalar com segurança ao lado de
          uma instalação Windows que permaneça inacessível por BitLocker. Se essa situação aparecer, pare e resolva
          a criptografia pelo procedimento oficial antes de insistir.
        </p>

        <h2>2. Baixe a imagem do Ubuntu pela fonte oficial</h2>
        <p>
          Use a página oficial de download do Ubuntu Desktop. Evite imagens modificadas, torrents sem origem
          confirmada e arquivos hospedados em sites de terceiros. Uma imagem de instalação é código que terá acesso
          total ao disco; a procedência faz parte da segurança da instalação.
        </p>
        <p>
          A versão exata muda com o ciclo de lançamentos. Por isso, este guia não depende de um número específico:
          siga a versão suportada apresentada pela Canonical para o seu equipamento e confirme requisitos e notas
          da versão antes de instalar em uma máquina de produção.
        </p>

        <h2>3. Criar pendrive bootável não é copiar o ISO</h2>
        <p>
          O pendrive precisa ser gravado como mídia de instalação. A documentação atual do Ubuntu recomenda um
          pendrive de pelo menos 8 GB e alerta que o processo apaga o conteúdo do dispositivo. Separe um pendrive
          sem arquivos importantes e confira duas vezes qual unidade foi selecionada antes de iniciar a gravação.
        </p>
        <p>
          No Windows, o guia oficial apresenta uma ferramenta de gravação de imagem; no Ubuntu, as opções incluem
          Discos e Startup Disk Creator. Se você estiver no Linux e pensar em usar <code>dd</code>, trate esse
          caminho como avançado: escolher o dispositivo de saída errado pode sobrescrever o disco do sistema.
        </p>

        <h2>4. Inicialize pelo USB e teste o hardware antes de alterar o disco</h2>
        <p>
          Muitos computadores abrem o menu de boot por uma tecla exibida logo ao ligar. A tecla varia por
          fabricante, então prefira a indicação da tela ou o manual do equipamento em vez de uma lista genérica.
          Se o pendrive não aparece, confirme primeiro se a mídia foi gravada corretamente e se o firmware detecta
          o dispositivo.
        </p>
        <p>
          Quando o instalador oferece a opção de experimentar o Ubuntu, use esse ambiente para uma verificação
          rápida: teclado, touchpad, Wi-Fi, áudio, vídeo, brilho e detecção dos discos. Esse teste não prova que
          todo hardware terá suporte perfeito em qualquer cenário, mas ajuda a descobrir incompatibilidades óbvias
          antes de escrever no armazenamento.
        </p>

        <h2>5. Escolha o tipo de instalação pelo objetivo, não por hábito</h2>
        <table>
          <thead>
            <tr><th>Objetivo</th><th>Opção adequada</th><th>Principal cuidado</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Ubuntu será o único sistema</td>
              <td>Apagar o disco e instalar Ubuntu</td>
              <td>Apaga os dados do disco selecionado; confirme backup e unidade correta.</td>
            </tr>
            <tr>
              <td>Manter Windows e Ubuntu</td>
              <td>Instalar ao lado, quando o instalador oferecer essa opção</td>
              <td>Confirme espaço, backup e estado do BitLocker antes de prosseguir.</td>
            </tr>
            <tr>
              <td>Layout específico de partições</td>
              <td>Particionamento manual</td>
              <td>É opção avançada; não improvise tamanhos ou pontos de montagem sem entender o layout.</td>
            </tr>
          </tbody>
        </table>
        <p>
          A opção “apagar o disco” significa exatamente isso: o Ubuntu passa a ocupar o armazenamento selecionado.
          Em computadores com mais de um disco, confirme modelo e capacidade antes de continuar. Nunca use apagar,
          formatar ou recriar tabela de partição como teste para descobrir “se funciona”.
        </p>

        <h2>6. Dual boot: preserve o sistema existente antes de criar espaço</h2>
        <p>
          Se o objetivo é manter Windows e Ubuntu, o cenário mais simples é quando o instalador reconhece o outro
          sistema e oferece instalação ao lado. Mesmo assim, backup continua obrigatório. Se a opção não aparece,
          não transforme particionamento manual em tentativa e erro: primeiro descubra por que o sistema existente
          ou o espaço disponível não foram reconhecidos.
        </p>
        <p>
          BitLocker merece atenção especial. Quando o instalador alerta que a instalação Windows está criptografada,
          a documentação oficial orienta resolver essa condição antes da instalação lado a lado ou usar outro disco
          não criptografado. Não desative criptografia sem ter a chave de recuperação e uma cópia dos dados.
        </p>

        <h2>7. Criptografia do Ubuntu: guarde a credencial fora do computador</h2>
        <p>
          O instalador oferece opções de criptografia de disco em cenários compatíveis. Se você escolher criptografia
          com senha, guarde essa senha fora do próprio computador. A documentação do Ubuntu alerta que perder a
          credencial pode impedir a recuperação dos dados. Criptografia protege o armazenamento; ela não substitui
          backup.
        </p>

        <h2>8. Revise o resumo antes de instalar</h2>
        <p>
          Antes da confirmação final, leia o resumo como se fosse um orçamento de serviço: qual disco será alterado,
          qual tipo de instalação foi escolhido e quais opções adicionais serão aplicadas. Se qualquer item estiver
          diferente do planejado, volte. Depois que a escrita de partições começa, a reversão pode exigir restauração
          de backup ou recuperação de dados.
        </p>

        <h2>9. Depois do primeiro boot: atualize antes de personalizar</h2>
        <p>
          Após entrar no novo sistema, conecte à internet e aplique as atualizações. O Ubuntu oferece atualização
          pela interface gráfica e também pelo terminal. Para quem prefere terminal, a documentação oficial usa:
        </p>
        <pre><code>{"sudo apt update\nsudo apt upgrade"}</code></pre>
        <p>
          Depois, reinicie se solicitado e valide novamente Wi-Fi, áudio, vídeo, suspensão, webcam, Bluetooth e
          periféricos que realmente fazem parte do seu uso. Só então vale instalar aplicativos e migrar os arquivos
          do backup.
        </p>

        <h2>10. O que não fazer durante uma instalação</h2>
        <ul>
          <li>Não apague partições para “ver se o instalador reconhece depois”.</li>
          <li>Não escolha um disco apenas pela letra que ele tinha no Windows; o instalador usa outra identificação.</li>
          <li>Não use imagem modificada ou script de pós-instalação sem entender a origem.</li>
          <li>Não desative BitLocker ou altere firmware sem confirmar chaves e backup.</li>
          <li>Não use particionamento manual se você não consegue explicar o que será criado, mantido e apagado.</li>
          <li>Não trate a conclusão do instalador como fim do trabalho: atualizações e validação fazem parte da instalação.</li>
        </ul>

        <h2>Quando parar e pedir ajuda</h2>
        <p>
          Interrompa antes de escrever no disco se houver dados sem backup, BitLocker sem chave disponível, disco
          ausente no firmware, partições que você não reconhece, erro de armazenamento, instalação corporativa com
          políticas próprias ou dúvida sobre qual unidade será apagada. Nesses cenários, preservar o estado atual é
          mais importante do que concluir a instalação na mesma hora.
        </p>
        <p>
          Se o objetivo for apenas aprender Linux sem alterar a máquina principal, considere primeiro testar pelo
          ambiente do pendrive ou usar uma máquina virtual. Para decidir se vale migrar de sistema, veja também{" "}
          <a href="/blog/trocar-windows-por-linux-vale-a-pena">trocar Windows por Linux: quando faz sentido</a>.
        </p>

        <h2>Fontes oficiais consultadas</h2>
        <ul>
          <li>
            <a href="https://ubuntu.com/desktop/docs/en/26.04/tutorial/install-ubuntu-desktop/" rel="nofollow noopener" target="_blank">
              Ubuntu Desktop — Install Ubuntu Desktop
            </a>
          </li>
          <li>
            <a href="https://documentation.ubuntu.com/desktop/en/latest/how-to/create-a-bootable-usb-stick/" rel="nofollow noopener" target="_blank">
              Ubuntu Desktop — Create a bootable USB stick
            </a>
          </li>
        </ul>
      </>
    ),
  },

  "como-usar-rsync-backup-linux": {
    title: "Como usar rsync para backup no Linux sem apagar arquivos por engano",
    excerpt:
      "Use rsync para cópias locais e remotas no Linux, entenda a diferença entre sincronização e backup, teste com --dry-run e trate --delete como operação destrutiva.",
    date: "2026-09-27",
    readTime: "13 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">
          O <code>rsync</code> é uma ferramenta de cópia e sincronização de arquivos. Ele pode reduzir transferências
          repetidas porque compara origem e destino, funciona localmente ou por conexão remota e preserva metadados
          quando as opções corretas são usadas. Mas existe uma diferença importante: <strong>sincronizar não é,
          sozinho, ter backup</strong>. Se o destino apenas reproduz o estado atual da origem, exclusões e arquivos
          corrompidos podem ser propagados. Um backup de verdade precisa considerar independência, retenção e teste
          de restauração.
        </p>

        <h2>Resposta curta: use rsync como ferramenta de cópia, não como garantia de backup</h2>
        <p>
          Para uma primeira cópia local, comece sem exclusões e faça um ensaio antes de escrever. O manual oficial
          documenta <code>--dry-run</code> (<code>-n</code>) justamente para mostrar o que seria alterado sem
          executar a transferência. Quando a lista estiver correta, rode o comando real. Só considere
          <code>--delete</code> depois de entender exatamente qual é a origem, qual é o destino e qual diretório
          será sincronizado.
        </p>
        <pre><code>{"rsync -ani /dados/origem/ /mnt/backup/origem/\nrsync -ai  /dados/origem/ /mnt/backup/origem/"}</code></pre>
        <p>
          No exemplo, <code>-a</code> ativa o modo de arquivamento, <code>-n</code> faz o ensaio e <code>-i</code>
          detalha as mudanças. O segundo comando é executado somente depois de conferir o resultado do primeiro.
        </p>

        <h2>1. O que o rsync faz e o que ele não faz</h2>
        <p>
          O rsync copia arquivos entre diretórios locais ou entre máquinas. Ele é útil para replicar uma árvore de
          arquivos, atualizar apenas o que mudou e automatizar transferências previsíveis. Isso não significa que
          ele mantenha versões históricas por padrão. Se um documento foi sobrescrito na origem e a sincronização
          atualizar o destino, a versão anterior pode deixar de existir também.
        </p>
        <p>
          Por isso, trate o rsync como uma <strong>ferramenta dentro da estratégia de backup</strong>. O destino
          deve ser independente o suficiente para sobreviver ao problema da origem, e a estratégia precisa dizer
          como recuperar uma versão anterior quando isso for necessário. Para a visão geral, consulte{" "}
          <a href="/blog/backup-como-proteger-seus-arquivos">backup: como proteger seus arquivos</a>.
        </p>

        <h2>2. Antes do primeiro comando: identifique origem e destino</h2>
        <p>
          O erro mais perigoso em uma cópia automatizada é inverter os lados. Antes de usar rsync, liste os dois
          caminhos e confirme o conteúdo. Em um disco externo, valide também se o ponto de montagem é realmente o
          esperado; um diretório vazio criado porque o disco não montou não é o mesmo destino.
        </p>
        <pre><code>{"ls -lah /dados/origem/\nfindmnt /mnt/backup\nls -lah /mnt/backup/"}</code></pre>
        <p>
          Se houver dados insubstituíveis, faça a primeira execução sem <code>--delete</code>. O objetivo inicial é
          provar que o comando copia na direção correta e que o destino possui espaço e permissões adequados.
        </p>

        <h2>3. A barra final na origem muda o resultado</h2>
        <p>
          O manual do rsync chama atenção para a barra final no caminho de origem. Com
          <code>/dados/fotos/</code>, o conteúdo de <code>fotos</code> é copiado para o destino. Sem a barra final,
          o diretório <code>fotos</code> pode ser criado como um nível adicional no destino. Essa diferença parece
          pequena no terminal, mas muda a árvore resultante.
        </p>
        <pre><code>{"rsync -ani /dados/fotos/ /mnt/backup/fotos/\nrsync -ani /dados/fotos  /mnt/backup/"}</code></pre>
        <p>
          Faça o ensaio das duas formas se estiver em dúvida e confira os caminhos exibidos antes da transferência
          real.
        </p>

        <h2>4. O que o modo archive preserva</h2>
        <p>
          A opção <code>-a</code> é uma forma compacta de ativar o modo de arquivamento do rsync. Ela é adequada
          quando você quer preservar uma árvore de arquivos com atributos relevantes, mas não deve ser tratada
          como sinônimo de “backup completo do sistema”. Sistemas de arquivos, ACLs, atributos estendidos,
          snapshots, bancos de dados em uso e aplicações com estado podem exigir opções ou procedimentos próprios.
        </p>
        <p>
          Para documentos, fotos e diretórios de projeto, <code>-a</code> costuma ser um ponto de partida claro.
          Para servidores e aplicações, primeiro descubra como a própria aplicação recomenda realizar cópia
          consistente.
        </p>

        <h2>5. Exclusões: reduza o escopo de forma explícita</h2>
        <p>
          Arquivos temporários, caches ou diretórios reconstruíveis podem ser excluídos quando isso fizer parte do
          plano. Prefira regras visíveis e revisáveis em vez de uma sequência longa de opções improvisadas.
        </p>
        <pre><code>{"rsync -ani --exclude='cache/' --exclude='*.tmp' /dados/origem/ /mnt/backup/origem/"}</code></pre>
        <p>
          Uma exclusão é uma decisão de retenção: tudo que não é copiado precisa ser dispensável ou estar protegido
          por outro mecanismo. Não copie uma lista pronta da internet sem comparar com a estrutura real dos seus
          dados.
        </p>

        <h2>6. Por que --delete exige uma etapa separada de validação</h2>
        <p>
          <code>--delete</code> remove do destino itens que não existem mais na origem dentro do escopo
          sincronizado. O próprio manual oficial recomenda testar primeiro com <code>--dry-run</code>, porque uma
          origem errada, um ponto de montagem ausente ou uma regra de exclusão mal definida pode transformar uma
          sincronização em perda de arquivos.
        </p>
        <pre><code>{"rsync -ani --delete /dados/origem/ /mnt/espelho/origem/"}</code></pre>
        <p>
          Só execute a versão sem <code>-n</code> quando as exclusões listadas forem exatamente as esperadas.
          Mesmo assim, um espelho com <code>--delete</code> continua não substituindo retenção histórica: se você
          precisa recuperar o estado de ontem ou da semana passada, use snapshots, versionamento ou cópias
          independentes além do espelho.
        </p>

        <h2>7. Cópia remota por SSH</h2>
        <p>
          O rsync pode usar um host remoto como origem ou destino. Antes de automatizar, faça a conexão SSH
          funcionar separadamente, confirme o usuário e teste o caminho remoto com uma cópia pequena.
        </p>
        <pre><code>{"rsync -ani /dados/projeto/ usuario@servidor:/srv/backup/projeto/\nrsync -ai  /dados/projeto/ usuario@servidor:/srv/backup/projeto/"}</code></pre>
        <p>
          Não coloque senha em texto puro dentro de script ou cron. Quando autenticação por chave for apropriada,
          proteja a chave, limite permissões e mantenha um caminho de recuperação. O guia de SSH fica em uma URL
          separada justamente porque autenticação remota é outra decisão técnica.
        </p>

        <h2>8. Automatize só depois de validar uma execução manual</h2>
        <p>
          Agendamento transforma um erro ocasional em erro recorrente. Antes de usar cron ou timer do systemd,
          valide manualmente a origem, o destino, as exclusões e o resultado da restauração. Registre saída e código
          de retorno para perceber quando a tarefa deixou de funcionar.
        </p>
        <p>
          Uma rotina automática também precisa verificar se o destino está disponível. Em discos removíveis e
          montagens de rede, não assuma que o caminho existe só porque o diretório existe no sistema.
        </p>

        <h2>9. Como verificar se a cópia pode ser restaurada</h2>
        <p>
          Backup não termina quando o comando retorna sem erro. Escolha uma amostra representativa: arquivo pequeno,
          documento grande, diretório com subpastas e, quando aplicável, permissões importantes. Restaure para um
          local temporário e abra os arquivos a partir da cópia restaurada.
        </p>
        <p>
          Para uma rotina mais completa, veja{" "}
          <a href="/blog/como-testar-restauracao-de-backup">como testar a restauração de um backup</a>. O teste
          periódico é o que separa uma cópia presumida de uma recuperação demonstrada.
        </p>

        <h2>10. Rsync, snapshot e sincronização em nuvem não são a mesma coisa</h2>
        <table>
          <thead>
            <tr><th>Ferramenta</th><th>Função principal</th><th>Limite típico</th></tr>
          </thead>
          <tbody>
            <tr><td>rsync</td><td>Copiar e sincronizar arquivos e diretórios</td><td>Não cria histórico de versões por padrão</td></tr>
            <tr><td>Snapshot</td><td>Registrar estados de um volume ou conjunto de dados</td><td>Pode depender do mesmo armazenamento físico</td></tr>
            <tr><td>Sincronização em nuvem</td><td>Replicar estado entre dispositivos/serviço</td><td>Pode propagar alteração ou exclusão</td></tr>
            <tr><td>Backup com retenção</td><td>Manter cópias recuperáveis em pontos diferentes do tempo</td><td>Exige política, capacidade e teste de restauração</td></tr>
          </tbody>
        </table>

        <h2>Quando parar antes de continuar</h2>
        <p>
          Interrompa a automação se você não consegue explicar qual diretório é a origem, qual é o destino, se o
          destino está realmente montado, o que será excluído ou como restaurar um arquivo. Pare também diante de
          erros de entrada/saída, disco com sinais de falha ou dados únicos sem outra cópia. Nessas situações, a
          prioridade é preservar o estado existente antes de sincronizar novamente.
        </p>

        <h2>Checklist de decisão</h2>
        <ul>
          <li>Origem e destino foram conferidos separadamente.</li>
          <li>O primeiro ensaio usa <code>--dry-run</code> e saída detalhada.</li>
          <li>A barra final da origem produz a árvore desejada.</li>
          <li>Exclusões foram justificadas item por item.</li>
          <li><code>--delete</code> não entra antes de um ensaio específico para exclusões.</li>
          <li>Existe uma cópia ou retenção independente do espelho.</li>
          <li>Uma restauração de teste foi executada e validada.</li>
          <li>A automação registra falha em vez de assumir que sempre funcionou.</li>
        </ul>

        <h2>Fontes oficiais consultadas</h2>
        <ul>
          <li>
            <a href="https://rsync.samba.org/ftp/rsync/rsync.1" rel="nofollow noopener" target="_blank">
              rsync(1) manpage — projeto rsync / Samba
            </a>
          </li>
        </ul>
        <p>
          Para escolher onde manter uma cópia independente, veja também{" "}
          <a href="/decisoes/nuvem-ou-hd-externo">nuvem ou HD externo</a>.
        </p>
      </>
    ),
  },

  "como-configurar-ssh-seguro-linux": {
    title: "Como configurar SSH com segurança no Linux sem perder acesso",
    excerpt:
      "Configure OpenSSH com chaves, validação do sshd_config e rollback: teste o acesso antes de desativar senha, trate porta customizada como ruído e evite lockout.",
    date: "2026-09-27",
    readTime: "13 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">
          Proteger SSH não é empilhar opções de hardening até o servidor “parecer seguro”. O objetivo é reduzir
          formas desnecessárias de autenticação e privilégio <strong>sem perder o caminho legítimo de
          administração</strong>. A sequência segura é: entender como o servidor está acessível hoje, preparar uma
          chave, testar a chave em uma segunda sessão, validar a configuração do daemon e só então remover o método
          antigo de acesso.
        </p>

        <h2>Resposta curta: endureça o acesso em etapas reversíveis</h2>
        <ol>
          <li>Confirme um caminho de recuperação: console, painel da VM, acesso físico ou sessão já aberta.</li>
          <li>Instale/valide o OpenSSH Server pela documentação da sua distribuição.</li>
          <li>Crie uma chave no cliente e teste o login por chave em uma nova sessão.</li>
          <li>Revise a configuração efetiva antes de mudar autenticação ou usuários permitidos.</li>
          <li>Teste a sintaxe do <code>sshd</code> antes de recarregar o serviço.</li>
          <li>Só depois desative autenticação por senha, se o ambiente realmente permitir.</li>
          <li>Mantenha a sessão antiga aberta até confirmar um novo login completo.</li>
        </ol>

        <h2>1. Antes de editar: descubra como você recupera o servidor</h2>
        <p>
          Se o SSH é o único caminho de administração, uma configuração incorreta pode bloquear o próprio
          administrador. Em servidor virtual, confirme antes se existe console pelo provedor ou modo de recuperação.
          Em máquina local, confirme acesso físico. Em qualquer cenário, mantenha uma sessão SSH atual aberta durante
          os testes e use uma segunda sessão para validar o novo caminho.
        </p>
        <p>
          Esse cuidado vem antes de “desativar senha”, trocar porta ou restringir usuários. Segurança que elimina o
          caminho de recuperação pode transformar uma correção simples em indisponibilidade.
        </p>

        <h2>2. Instale e confira o OpenSSH Server</h2>
        <p>
          No Ubuntu Server, a documentação oficial usa o pacote <code>openssh-server</code>. Depois da instalação,
          confirme que o serviço está ativo e que o equipamento está escutando antes de alterar qualquer diretiva.
        </p>
        <pre><code>{"sudo apt update\nsudo apt install openssh-server\nsystemctl status ssh\nss -tlnp | grep ssh"}</code></pre>
        <p>
          O nome do pacote e do serviço pode mudar em outras distribuições. Não copie comandos de Ubuntu para Fedora,
          RHEL ou outra família sem consultar a documentação correspondente.
        </p>

        <h2>3. Gere a chave no cliente, não no servidor</h2>
        <p>
          A chave privada deve permanecer no dispositivo cliente. Para uma chave Ed25519, um exemplo comum é:
        </p>
        <pre><code>{"ssh-keygen -t ed25519 -C \"administracao-servidor\""}</code></pre>
        <p>
          Proteja a chave privada com permissões adequadas e, quando fizer sentido para o uso, com frase secreta.
          A parte pública pode ser adicionada ao <code>authorized_keys</code> do usuário remoto. O utilitário
          <code>ssh-copy-id</code> pode ajudar quando a distribuição o disponibiliza:
        </p>
        <pre><code>{"ssh-copy-id usuario@servidor\nssh usuario@servidor"}</code></pre>
        <p>
          O ponto decisivo é abrir <strong>uma nova conexão</strong> e confirmar que ela usa a chave esperada antes
          de desligar qualquer método anterior de autenticação.
        </p>

        <h2>4. Veja a configuração efetiva antes de concluir o que está ativo</h2>
        <p>
          OpenSSH pode ler o arquivo principal e arquivos adicionais de configuração. Em Ubuntu, a documentação
          atual descreve o uso de snippets em <code>/etc/ssh/sshd_config.d/</code>. Antes de editar, descubra de
          onde a diretiva está vindo e evite manter valores contraditórios em mais de um arquivo.
        </p>
        <pre><code>{"sudo sshd -T | less\nsudo grep -R \"^[[:space:]]*PasswordAuthentication\\|^[[:space:]]*PermitRootLogin\\|^[[:space:]]*PubkeyAuthentication\" /etc/ssh/sshd_config /etc/ssh/sshd_config.d 2>/dev/null"}</code></pre>
        <p>
          A saída efetiva é mais útil do que assumir que uma linha comentada representa o valor ativo.
        </p>

        <h2>5. Chaves primeiro; senha só é removida depois do teste</h2>
        <p>
          Uma política comum é permitir autenticação por chave e impedir login remoto direto como root. Em um
          ambiente onde todos os administradores já conseguem entrar por chave e existe recuperação fora do SSH,
          também pode fazer sentido desativar senha.
        </p>
        <pre><code>{"PubkeyAuthentication yes\nPermitRootLogin no\nPasswordAuthentication no"}</code></pre>
        <p>
          Não cole essas três linhas e recarregue imediatamente. A ordem segura é testar a chave, validar a
          configuração, manter a sessão atual aberta, recarregar e então testar uma nova conexão. Se existem
          automações, appliances, contas legadas ou acesso de emergência dependentes de senha, inventarie-os antes.
        </p>

        <h2>6. Valide a sintaxe antes de recarregar o daemon</h2>
        <p>
          O OpenSSH oferece teste de configuração. Use-o antes de aplicar uma alteração:
        </p>
        <pre><code>{"sudo sshd -t"}</code></pre>
        <p>
          Sem saída de erro, recarregue o serviço conforme a sua distribuição. No Ubuntu, o serviço normalmente é
          <code>ssh</code>:
        </p>
        <pre><code>{"sudo systemctl reload ssh"}</code></pre>
        <p>
          Depois do reload, abra uma nova sessão do zero. Só feche a sessão antiga quando o login novo estiver
          confirmado.
        </p>

        <h2>7. Restringir usuários pode ajudar — se a lista estiver correta</h2>
        <p>
          Diretivas como <code>AllowUsers</code> e <code>AllowGroups</code> podem reduzir quem tem permissão para
          autenticar via SSH. Elas também podem bloquear toda a equipe se um usuário ou grupo for omitido. Use-as
          apenas quando houver inventário claro de administradores e outro caminho de recuperação.
        </p>
        <pre><code>{"AllowGroups ssh-admins"}</code></pre>
        <p>
          Em ambientes gerenciados por diretório, automação ou configuração central, confirme primeiro como os
          usuários e grupos chegam ao sistema.
        </p>

        <h2>8. Trocar a porta não substitui autenticação forte</h2>
        <p>
          Mudar a porta padrão pode reduzir ruído de varreduras oportunistas e volume de logs, mas não corrige senha
          fraca, chave vazada, usuário privilegiado ou software desatualizado. Trate a troca de porta como decisão
          operacional, não como o núcleo da segurança.
        </p>
        <p>
          Se a porta mudar, atualize firewall, automações, monitoramento e clientes antes de remover a regra antiga.
          Faça a mudança em duas etapas e teste a nova porta com a antiga ainda disponível quando a arquitetura
          permitir.
        </p>

        <h2>9. Firewall, bloqueio de tentativas e MFA são camadas separadas</h2>
        <p>
          Firewall pode limitar de onde o serviço é alcançável; ferramentas de bloqueio por log podem reagir a
          tentativas repetidas; autenticação multifator adiciona outra exigência ao login. Nenhuma dessas camadas
          deve ser instalada por receita genérica sem considerar a distribuição, o provedor, o método de
          autenticação e a forma de recuperação.
        </p>
        <p>
          Por isso, este guia não prescreve valores universais de banimento, uma porta específica nem um módulo PAM
          de terceiros. Para firewall, siga a trilha específica em{" "}
          <a href="/blog/como-configurar-firewall-ufw-linux">como configurar firewall UFW no Linux</a>.
        </p>

        <h2>10. O que revisar depois da mudança</h2>
        <ul>
          <li>Uma nova sessão autentica pelo método esperado.</li>
          <li>O usuário administrativo tem apenas o privilégio necessário.</li>
          <li>O login direto como root está coerente com a política definida.</li>
          <li>Firewall e monitoramento conhecem a porta realmente usada.</li>
          <li>Logs de autenticação estão sendo coletados e revisados.</li>
          <li>Existe processo para revogar uma chave perdida ou de ex-funcionário.</li>
          <li>Existe acesso de recuperação independente do mesmo arquivo de configuração.</li>
        </ul>

        <h2>Quando parar e não aplicar a alteração</h2>
        <p>
          Pare antes de desativar senha ou recarregar o serviço se você não tem uma segunda sessão funcionando por
          chave, não tem console de recuperação, não sabe quais automações dependem do SSH, não consegue explicar a
          configuração efetiva ou encontrou erro em <code>sshd -t</code>. Em servidor remoto, preservar um acesso
          conhecido é mais importante do que concluir o hardening na mesma sessão.
        </p>

        <h2>Fontes oficiais consultadas</h2>
        <ul>
          <li>
            <a href="https://ubuntu.com/server/docs/how-to/security/openssh-server/" rel="nofollow noopener" target="_blank">
              Ubuntu Server — OpenSSH server
            </a>
          </li>
          <li>
            <a href="https://man.openbsd.org/sshd_config" rel="nofollow noopener" target="_blank">
              OpenSSH — sshd_config(5)
            </a>
          </li>
        </ul>
      </>
    ),
  },

  "como-gerenciar-pacotes-apt-dnf-linux": {
    title: "APT e DNF no Linux: instalar, atualizar e remover pacotes com segurança",
    excerpt:
      "Aprenda a usar APT e DNF/DNF5 sem misturar distribuições: identificar a família do sistema, revisar mudanças, lidar com repositórios e automatizar sem apagar pacotes por engano.",
    date: "2026-09-27",
    readTime: "13 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">
          APT e DNF resolvem o mesmo tipo de problema em famílias diferentes de Linux: localizar pacotes em
          repositórios, instalar dependências, aplicar atualizações e remover software. O erro comum é tratar os
          comandos como equivalentes linha por linha ou copiar receitas de uma distribuição para outra. A sequência
          segura começa identificando o sistema, entendendo a transação proposta e só então confirmando a mudança.
        </p>

        <h2>Resposta curta: descubra a distribuição antes de escolher o comando</h2>
        <pre><code>{"cat /etc/os-release\ncommand -v apt\ncommand -v apt-get\ncommand -v dnf5\ncommand -v dnf"}</code></pre>
        <p>
          Em Debian/Ubuntu e derivados, APT é a família esperada. Em sistemas RPM modernos, DNF ou DNF5 pode ser a
          interface disponível. Não force um gerenciador que não pertence à distribuição e não misture
          repositórios de famílias diferentes.
        </p>

        <h2>1. APT: atualizar o índice não é a mesma coisa que atualizar pacotes</h2>
        <p>
          <code>apt update</code> atualiza os metadados dos repositórios configurados. Ele não instala as novas
          versões por si só. Depois disso, use <code>apt list --upgradable</code> para revisar o que está disponível
          antes de decidir pela atualização.
        </p>
        <pre><code>{"sudo apt update\napt list --upgradable"}</code></pre>
        <p>
          Para aplicar atualizações, <code>apt upgrade</code> é a operação interativa comum. Leia a lista de pacotes,
          o espaço necessário e qualquer aviso antes de confirmar:
        </p>
        <pre><code>{"sudo apt upgrade"}</code></pre>

        <h2>2. Instalar, consultar e remover com APT</h2>
        <p>
          Instalação e consulta devem usar o nome real do pacote oferecido pelos repositórios configurados.
        </p>
        <pre><code>{"apt search rsync\napt show rsync\nsudo apt install rsync"}</code></pre>
        <p>
          Para remover, diferencie o pacote da configuração local. <code>apt remove</code> remove o pacote mas pode
          preservar arquivos de configuração; <code>apt purge</code> também remove configurações gerenciadas pelo
          pacote. Antes de usar <code>autoremove</code>, leia a lista proposta:
        </p>
        <pre><code>{"sudo apt remove nome-do-pacote\nsudo apt purge nome-do-pacote\nsudo apt autoremove"}</code></pre>
        <p>
          Não transforme <code>autoremove</code> em rotina cega. Dependências marcadas como automáticas podem ser
          importantes para uma aplicação que você ainda usa.
        </p>

        <h2>3. full-upgrade pode alterar mais do que upgrade</h2>
        <p>
          A documentação do APT diferencia operações que apenas atualizam pacotes daquelas que podem instalar ou
          remover dependências para resolver a transação. Em máquina de produção, não trate
          <code>full-upgrade</code> como substituto automático de <code>upgrade</code>. Revise cuidadosamente a
          proposta antes de confirmar.
        </p>
        <pre><code>{"sudo apt full-upgrade"}</code></pre>
        <p>
          Se a proposta inclui remoção de componente crítico, biblioteca central ou serviço que você não esperava
          alterar, pare e investigue a dependência antes de continuar.
        </p>

        <h2>4. apt e apt-get têm papéis diferentes em automação</h2>
        <p>
          A documentação do Ubuntu recomenda APT para uso interativo e <code>apt-get</code> para scripts
          não interativos, porque a interface de script precisa de comportamento mais estável. Isso não significa
          adicionar <code>-y</code> a toda operação: automação deve definir claramente o que pode mudar e registrar
          falhas.
        </p>
        <pre><code>{"sudo apt-get update\nsudo apt-get install nome-do-pacote"}</code></pre>
        <p>
          Em servidor, prefira automação declarativa ou uma janela de manutenção a comandos que aceitam qualquer
          alteração sem revisão.
        </p>

        <h2>5. DNF e DNF5: confira qual geração existe no sistema</h2>
        <p>
          A família Fedora/RHEL evoluiu de DNF para DNF5. Algumas distribuições expõem <code>dnf5</code>
          explicitamente; outras mantêm <code>dnf</code> como comando principal. Descubra o binário real e consulte
          sua documentação local:
        </p>
        <pre><code>{"command -v dnf5 || command -v dnf\ndnf5 --version 2>/dev/null || dnf --version\nman dnf5 2>/dev/null || man dnf"}</code></pre>
        <p>
          O restante deste guia usa <code>dnf5</code> como referência da geração atual. Se seu sistema oferece
          apenas <code>dnf</code>, confirme a sintaxe correspondente antes de copiar comandos.
        </p>

        <h2>6. Operações básicas com DNF5</h2>
        <pre><code>{"dnf5 search rsync\ndnf5 info rsync\nsudo dnf5 install rsync\nsudo dnf5 upgrade\nsudo dnf5 remove rsync"}</code></pre>
        <p>
          Como no APT, a parte importante não é decorar verbos: é revisar a transação antes de confirmar. Uma
          remoção pode levar dependências junto; uma atualização pode trocar bibliotecas usadas por serviços em
          execução.
        </p>

        <h2>7. Repositórios de terceiros precisam de origem e assinatura verificáveis</h2>
        <p>
          O gerenciador de pacotes confia nos repositórios configurados. Adicionar uma fonte de terceiros amplia a
          cadeia de confiança do sistema. Use somente instruções oficiais do fornecedor ou projeto, confirme a
          distribuição e versão suportadas e valide a chave/assinatura conforme a documentação do repositório.
        </p>
        <p>
          Evite receitas genéricas que mandam baixar uma chave de domínio fictício, copiar um
          <code>sources.list</code> pronto ou instalar um arquivo RPM aleatório. A URL e a chave precisam pertencer
          ao fornecedor real que você decidiu confiar.
        </p>

        <h2>8. Erro de repositório não é motivo para desativar verificação de assinatura</h2>
        <p>
          Falha de assinatura, chave expirada, metadado inválido ou repositório incompatível deve interromper a
          atualização até a origem ser entendida. Não contorne a verificação de assinatura para “fazer funcionar”.
          Isso remove justamente a proteção que permite ao gerenciador verificar procedência e integridade.
        </p>

        <h2>9. Não apague arquivos de lock por reflexo</h2>
        <p>
          Se APT, dpkg ou DNF informa que outra transação está em andamento, primeiro descubra se existe um processo
          legítimo trabalhando. Remover arquivos de lock enquanto o gerenciador ainda escreve no banco de pacotes
          pode deixar o estado inconsistente.
        </p>
        <pre><code>{"ps aux | grep -E 'apt|dpkg|dnf' | grep -v grep"}</code></pre>
        <p>
          Em máquinas com atualização automática, aguarde o processo terminar ou investigue o serviço responsável.
          Só faça recuperação de estado depois de confirmar que não existe uma transação ativa.
        </p>

        <h2>10. Atualização em produção exige plano de retorno</h2>
        <p>
          Antes de atualizar um servidor importante, saiba quais serviços dependem dos pacotes, como validar a
          aplicação depois da mudança e como restaurar configuração ou dados. O histórico de transações pode ajudar
          no diagnóstico, mas não trate “undo” como garantia de rollback completo: dados, migrações e formatos de
          arquivo podem não voltar junto com o pacote.
        </p>
        <p>
          Para sistemas críticos, snapshot ou backup testado antes da janela de manutenção é uma proteção mais
          sólida do que confiar em reversão automática do gerenciador.
        </p>

        <h2>Quando parar antes de confirmar a transação</h2>
        <p>
          Pare se a operação propõe remover muitos pacotes, substituir componentes centrais, usar repositório que
          você não reconhece, ignorar assinatura, alterar uma versão crítica fora da janela de manutenção ou se você
          não sabe como validar o serviço depois. Em servidor remoto, também pare se não existe acesso de recuperação
          caso rede ou SSH deixem de subir após a atualização.
        </p>

        <h2>Checklist prático</h2>
        <ul>
          <li>Distribuição e gerenciador foram identificados em <code>/etc/os-release</code>.</li>
          <li>Repositórios configurados são conhecidos e compatíveis com a versão do sistema.</li>
          <li>A lista de instalação, atualização ou remoção foi revisada antes da confirmação.</li>
          <li>Operações destrutivas não usam confirmação automática sem necessidade.</li>
          <li>Scripts usam a interface indicada pela documentação da distribuição.</li>
          <li>Falhas de assinatura não são ignoradas.</li>
          <li>Existe backup/snapshot e método de validação para mudanças críticas.</li>
        </ul>

        <h2>Fontes oficiais consultadas</h2>
        <ul>
          <li>
            <a href="https://ubuntu.com/server/docs/how-to/software/package-management/" rel="nofollow noopener" target="_blank">
              Ubuntu Server — Install and manage packages
            </a>
          </li>
          <li>
            <a href="https://dnf5.readthedocs.io/en/latest/dnf5.8.html" rel="nofollow noopener" target="_blank">
              DNF5 — Package Management Utility
            </a>
          </li>
        </ul>
      </>
    ),
  },

  "comandos-linux-essenciais-iniciantes": {
    title: "Comandos Linux para iniciantes: terminal seguro sem decorar uma lista",
    excerpt:
      "Aprenda pwd, ls, cd, cp, mv, rm, grep, pipes, permissões e processos entendendo o efeito de cada comando — com cuidados para sudo, exclusão recursiva e redirecionamento.",
    date: "2026-09-27",
    readTime: "12 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">
          Aprender terminal não é memorizar cinquenta comandos. O mais útil é entender três coisas antes de executar:
          <strong> onde você está, qual caminho será afetado e se a operação altera ou apenas lê dados</strong>.
          Com essa base, poucos comandos já resolvem navegação, cópia, busca, diagnóstico e leitura de arquivos sem
          transformar o terminal em tentativa e erro.
        </p>

        <h2>Resposta curta: comece por comandos de leitura antes dos comandos que alteram</h2>
        <p>
          Para treinar com segurança, crie um diretório de laboratório dentro da sua pasta pessoal e trabalhe apenas
          nele:
        </p>
        <pre><code>{"mkdir -p ~/laboratorio-terminal\ncd ~/laboratorio-terminal\npwd\nls -la"}</code></pre>
        <p>
          <code>pwd</code> confirma o diretório atual; <code>ls -la</code> mostra o conteúdo, inclusive arquivos
          ocultos. Antes de copiar, mover ou apagar, confira novamente o caminho.
        </p>

        <h2>1. Caminho absoluto e caminho relativo</h2>
        <p>
          Um caminho que começa com <code>/</code> é absoluto. Um caminho como <code>documentos/arquivo.txt</code>
          é relativo ao diretório atual. O atalho <code>~</code> representa a pasta pessoal do usuário.
        </p>
        <pre><code>{"pwd\ncd ~\ncd ~/laboratorio-terminal\ncd .."}</code></pre>
        <p>
          Se um diretório contém espaços, use aspas: <code>cd "Meus Arquivos"</code>. Evite adivinhar caminhos;
          use a tecla Tab para completar nomes quando possível.
        </p>

        <h2>2. Liste antes de modificar</h2>
        <pre><code>{"ls\nls -la\nls -lh"}</code></pre>
        <p>
          <code>-l</code> adiciona detalhes; <code>-a</code> inclui nomes iniciados por ponto; <code>-h</code>
          torna tamanhos mais legíveis quando usado com listagens que mostram tamanho. Essa inspeção simples reduz
          erros de caminho antes de operações destrutivas.
        </p>

        <h2>3. Criar arquivos e diretórios de teste</h2>
        <pre><code>{"mkdir projeto\ntouch projeto/notas.txt\nprintf '%s\\n' 'primeira linha' > projeto/notas.txt\ncat projeto/notas.txt"}</code></pre>
        <p>
          O operador <code>&gt;</code> sobrescreve o arquivo de destino. Para acrescentar conteúdo ao final, use
          <code>&gt;&gt;</code>. Essa diferença é importante: redirecionamento pode destruir conteúdo existente tão
          facilmente quanto um comando de remoção.
        </p>

        <h2>4. Copiar e mover: valide o destino</h2>
        <pre><code>{"cp projeto/notas.txt projeto/notas-copia.txt\nmv projeto/notas-copia.txt projeto/notas-antigas.txt\nls -la projeto"}</code></pre>
        <p>
          Para iniciantes, opções interativas podem ajudar em operações que substituem um arquivo existente, mas não
          trate confirmação interativa como única proteção. A defesa principal continua sendo conferir origem e
          destino antes de executar.
        </p>

        <h2>5. Remover: comece pelo menor escopo possível</h2>
        <p>
          <code>rm</code> não envia arquivos para uma lixeira universal. Ao remover um arquivo de teste, confirme
          primeiro o nome:
        </p>
        <pre><code>{"ls -l projeto/notas-antigas.txt\nrm projeto/notas-antigas.txt"}</code></pre>
        <p>
          Evite usar <code>rm -rf</code> como atalho. A combinação é recursiva e não interativa; um caminho digitado
          incorretamente pode apagar uma árvore inteira. Para diretório vazio, <code>rmdir</code> é uma opção mais
          restritiva porque falha quando ainda existe conteúdo.
        </p>

        <h2>6. Ler arquivos sem abrir editor</h2>
        <pre><code>{"cat projeto/notas.txt\nless projeto/notas.txt\nhead -n 20 projeto/notas.txt\ntail -n 20 projeto/notas.txt"}</code></pre>
        <p>
          <code>cat</code> funciona bem para conteúdo curto. <code>less</code> é melhor para arquivos longos porque
          permite navegar sem despejar tudo de uma vez no terminal.
        </p>

        <h2>7. Buscar texto e arquivos em um escopo conhecido</h2>
        <pre><code>{"grep -n \"linha\" projeto/notas.txt\ngrep -R \"linha\" projeto/\nfind projeto -type f -name '*.txt'"}</code></pre>
        <p>
          Prefira começar a busca em um diretório específico em vez de procurar no sistema inteiro. Buscas a partir
          de <code>/</code> podem ser lentas, produzir muitos erros de permissão e incentivar uso desnecessário de
          <code>sudo</code>.
        </p>

        <h2>8. Pipes conectam saída e entrada</h2>
        <p>
          O operador <code>|</code> envia a saída de um comando para outro. Um exemplo simples:
        </p>
        <pre><code>{"ls -la | less\nprintf '%s\\n' alpha beta gamma | grep beta"}</code></pre>
        <p>
          Antes de usar um pipeline longo, execute cada parte separadamente e observe a saída. Não conecte um
          download da internet diretamente a um shell só porque uma página mandou copiar e colar.
        </p>

        <h2>9. Permissões: leia antes de alterar</h2>
        <pre><code>{"ls -l projeto/notas.txt\nid\nwhoami"}</code></pre>
        <p>
          A listagem mostra permissões e proprietário. Para tornar um script próprio executável, uma alteração
          explícita é mais fácil de entender do que permissões amplas:
        </p>
        <pre><code>{"chmod u+x script.sh"}</code></pre>
        <p>
          Evite receitas como <code>chmod 777</code>. Elas concedem permissões muito amplas e normalmente escondem
          o problema real de proprietário, grupo ou necessidade de acesso.
        </p>

        <h2>10. sudo não é “modo administrador permanente”</h2>
        <p>
          <code>sudo</code> eleva um comando específico conforme a política do sistema. Antes de acrescentá-lo a
          uma linha que falhou, descubra por que a permissão foi negada. Um caminho errado executado com privilégio
          elevado aumenta o impacto do erro.
        </p>
        <p>
          Para instalação e remoção de pacotes, use o guia separado de{" "}
          <a href="/blog/como-gerenciar-pacotes-apt-dnf-linux">APT e DNF no Linux</a>, porque atualizar software é
          uma transação diferente de manipular arquivos.
        </p>

        <h2>11. Processos: tente encerrar normalmente antes de forçar</h2>
        <pre><code>{"ps aux | less\ntop\nkill PID"}</code></pre>
        <p>
          <code>kill</code> sem sinal explícito solicita encerramento normal. Não use <code>kill -9</code> como
          primeira tentativa: o sinal forçado impede o processo de executar rotinas normais de encerramento e pode
          deixar arquivos temporários ou estado incompleto.
        </p>

        <h2>12. Espaço em disco e tamanho de diretórios</h2>
        <pre><code>{"df -h\ndu -sh ~/laboratorio-terminal"}</code></pre>
        <p>
          <code>df</code> mostra uso dos sistemas de arquivos montados; <code>du</code> mede o espaço usado por um
          caminho. Essa distinção ajuda a investigar “disco cheio” sem começar apagando arquivos aleatoriamente.
        </p>

        <h2>13. Rede: observe antes de mudar</h2>
        <pre><code>{"ip address\nip route\nping -c 4 1.1.1.1\nss -tln"}</code></pre>
        <p>
          Esses comandos ajudam a observar interfaces, rota e portas em escuta. O resultado não fecha diagnóstico
          sozinho: ausência de resposta a ping, por exemplo, não prova que a internet está indisponível porque o
          destino pode filtrar ICMP.
        </p>

        <h2>14. Use a ajuda local como fonte primária do comando instalado</h2>
        <pre><code>{"man ls\nman rm\nls --help\nrm --help"}</code></pre>
        <p>
          A página de manual corresponde ao software instalado naquela máquina. Quando um tutorial externo e o
          <code>man</code> local divergem, pare e confirme a versão antes de executar a opção.
        </p>

        <h2>Quando parar antes de apertar Enter</h2>
        <p>
          Pare se o comando usa <code>sudo</code>, exclusão recursiva, redirecionamento para arquivo importante,
          mudança de proprietário/permissões ou pipeline que executa conteúdo baixado e você não consegue explicar
          cada parte. Copiar uma linha sem entender o caminho afetado é o principal sinal de que ainda falta uma
          etapa de leitura.
        </p>

        <h2>Checklist para aprender terminal sem criar hábito perigoso</h2>
        <ul>
          <li>Confirmo o diretório atual com <code>pwd</code> quando o caminho importa.</li>
          <li>Uso <code>ls</code> antes de copiar, mover ou remover.</li>
          <li>Treino primeiro dentro da minha pasta pessoal.</li>
          <li>Distingo operações de leitura de operações que escrevem ou apagam.</li>
          <li>Não acrescento <code>sudo</code> automaticamente quando aparece “permissão negada”.</li>
          <li>Não uso <code>rm -rf</code>, <code>kill -9</code> ou <code>chmod 777</code> como solução padrão.</li>
          <li>Leio <code>man</code> ou <code>--help</code> antes de usar opção desconhecida.</li>
        </ul>

        <h2>Fonte oficial consultada</h2>
        <ul>
          <li>
            <a href="https://ubuntu.com/tutorials/command-line-for-beginners" rel="nofollow noopener" target="_blank">
              Ubuntu — The Linux command line for beginners
            </a>
          </li>
        </ul>
      </>
    ),
  },

  "como-clonar-hd-para-ssd": {
    title: "Clonar HD para SSD: quando clonar, quando reinstalar e onde o processo falha",
    excerpt:
      "A diferença real entre clonar e reinstalar, como saber se o disco de origem aguenta a clonagem, os pontos em que o processo trava e o que conferir antes de apagar o disco antigo.",
    date: "2026-08-12",
    readTime: "11 min",
    category: "Manutenção",
    content: (
      <>
        <p className="lead">Clonar busca reproduzir no disco novo as partições, o sistema, os programas, os arquivos e as configurações necessários para manter o ambiente de trabalho. É útil quando a origem está saudável, mas não substitui backup e nem garante inicialização automática em todo hardware: o estado do disco, o esquema de partições e o modo de boot precisam ser conferidos.</p>

        <h2>Resposta direta: dá para clonar HD para SSD?</h2>
        <p>Sim — desde que o disco de origem esteja legível, o volume ocupado caiba no SSD e a clonagem inclua as partições necessárias para inicialização. Se o HD apresenta ruído, erros de leitura ou desaparece do sistema, a prioridade deixa de ser clonar e passa a ser preservar os dados. Se o Windows já está instável, reinstalar costuma ser mais coerente do que copiar o problema para o SSD novo.</p>

        <h2>Clonar ou reinstalar</h2>
        <p>Clonar preserva tudo, inclusive o que estava errado. Reinstalar limpa tudo, inclusive o que estava certo. A escolha depende do estado atual do sistema.</p>
        <ul>
          <li><strong>Clonagem faz sentido</strong> quando o sistema está saudável, com programas licenciados difíceis de reinstalar e configurações que levariam horas para refazer.</li>
          <li><strong>Reinstalação faz sentido</strong> quando há travamentos, erros recorrentes, infecção recente ou histórico longo de instalações e desinstalações. Clonar um sistema problemático apenas leva o problema para o disco novo, mais rápido.</li>
        </ul>

        <h2>Antes de começar: a origem aguenta?</h2>
        <p>Uma clonagem pode exigir leitura extensa e contínua da origem. Se o HD já apresenta erros de leitura, ruído mecânico, desaparecimentos ou travamentos, insistir em uma cópia longa pode aumentar o risco de a unidade piorar durante o processo.</p>
        <p>Nesse cenário, a ordem correta se inverte: primeiro copia-se os arquivos pessoais para outro lugar, depois se avalia a clonagem. Disco com sinal de falha física não é caso de clonagem doméstica; é caso de recuperação, tratado em <a href="/blog/como-recuperar-dados-hd-com-defeito">recuperação de dados em HD com defeito</a>.</p>
        <p>Existe ainda o requisito de espaço: o que importa não é a capacidade do disco antigo, e sim o volume realmente ocupado. Um HD de 1 TB com 180 GB usados cabe em um SSD de 240 GB, desde que a ferramenta consiga redimensionar as partições.</p>

        <h2>Preparação que evita retrabalho</h2>
        <ol>
          <li><strong>Backup separado dos arquivos que não podem sumir.</strong> Clonagem não é backup: se algo der errado no meio, você precisa de uma cópia independente.</li>
          <li><strong>Liberar espaço antes.</strong> Arquivos temporários e downloads antigos ocupam tempo de cópia sem servir para nada.</li>
          <li><strong>Conferir como o disco será conectado.</strong> Em desktop, sobra porta interna. Em notebook, quase sempre é preciso um adaptador USB para conectar o disco novo durante o processo.</li>
          <li><strong>Alimentação estável.</strong> Queda de energia no meio da cópia deixa o destino inconsistente. Em notebook, com carregador ligado.</li>
        </ol>

        <h2>Onde o processo costuma falhar</h2>
        <ul>
          <li><strong>Erro de leitura na origem.</strong> A ferramenta para em determinada porcentagem e não avança: são setores ilegíveis. Insistir castiga o disco.</li>
          <li><strong>Partição de inicialização ausente.</strong> Copiar apenas a partição visível do sistema deixa de fora a partição de boot, e o computador não inicia. A cópia precisa incluir todas as partições do disco, não só a maior.</li>
          <li><strong>Destino menor que o ocupado.</strong> A cópia nem começa, ou começa e para no fim.</li>
          <li><strong>Origem e destino conectados na primeira validação.</strong> Dependendo do firmware e de como a clonagem preservou identificadores e partições de boot, a máquina pode escolher o disco antigo. Quando a arquitetura permitir, valide primeiro o disco novo isoladamente e só reconecte a origem depois de confirmar que o sistema inicia por ele.</li>
          <li><strong>Inicialização incompatível com a cópia.</strong> Modo de firmware, esquema de partições e carregador de boot precisam permanecer coerentes com a instalação clonada. Uma mudança de UEFI/Legacy, controlador ou ordem de boot pode produzir sintoma parecido com clonagem incompleta.</li>
        </ul>

        <h2>Depois da clonagem</h2>
        <ol>
          <li>Quando a troca física permitir, faça a primeira validação com o disco novo como único candidato de boot e confirme que o sistema inicia normalmente.</li>
          <li>Confira se os arquivos pessoais estão todos lá — pastas de documentos, imagens e área de trabalho.</li>
          <li>Verifique se o espaço total do novo disco aparece disponível. Sobra não alocada significa que a partição não foi expandida e precisa ser ajustada.</li>
          <li>Use a máquina alguns dias antes de apagar o disco antigo. Ele é a sua rede de segurança nesse intervalo.</li>
        </ol>
        <p>Só depois desse período faz sentido reaproveitar o disco antigo como armazenamento secundário — procedimento descrito em <a href="/blog/como-instalar-segundo-ssd-notebook">segundo SSD no notebook</a>.</p>

        <h2>O que a troca de disco resolve — e o que não resolve</h2>
        <p>Quando o gargalo está no acesso ao disco, migrar de um HD mecânico saudável para SSD tende a reduzir bastante o tempo de inicialização e de abertura de programas. O ganho percebido varia com processador, memória, estado do sistema e padrão de uso; SSD não corrige sozinho outras causas de lentidão.</p>
        <p>O que não muda: pouca memória continua limitando quem trabalha com muitas abas e programas simultâneos; processador antigo continua sendo o limite em tarefas pesadas; e sistema cheio de programas iniciando junto continua demorando a ficar utilizável. Esses fatores estão separados em <a href="/blog/computador-lento-causas-solucoes">computador lento: causas e como decidir</a>.</p>

        <h2>Quando levar para a bancada</h2>
        <p>Faz sentido interromper e buscar avaliação quando o disco de origem faz ruído, a clonagem trava repetidamente no mesmo ponto, a máquina não inicia depois da cópia ou os dados importantes não têm backup. Em unidades com sinais de falha física, novas tentativas de leitura podem aumentar desgaste e complicar a recuperação.</p>
        <p>O critério de verificação e cobrança está em <a href="/diagnostico-tecnico">como funciona o diagnóstico técnico</a>, e a migração completa faz parte do <a href="/servicos/upgrade-ssd-ram">upgrade de SSD e memória</a>.</p>

        <h2>Resumo prático</h2>
        <p>Clone quando o sistema está saudável e reinstale quando não está. Confira a saúde do disco de origem antes, tenha backup independente dos arquivos essenciais, copie o disco inteiro e não apenas a partição visível, inicie com um disco só e mantenha o antigo intacto por alguns dias antes de apagar qualquer coisa.</p>
      </>
    ),
  },
  "como-diagnosticar-placa-mae-defeituosa": {
    title: "Placa-mãe defeituosa: como confirmar antes de trocar a peça errada",
    excerpt:
      "Inspeção visual, teste mínimo e eliminação sistemática para distinguir falha de placa-mãe de falha de memória, fonte ou refrigeração — e quando reparo eletrônico ainda faz sentido.",
    date: "2026-08-12",
    readTime: "11 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Placa-mãe é o diagnóstico que mais se conclui por eliminação e o que mais se erra por pressa. Ela não costuma dar um sintoma próprio: ela faz outro componente parecer defeituoso. Confirmar exige método, e o método é sempre reduzir a máquina até sobrar uma variável.</p>

        <h2>Resposta direta: como saber se a placa-mãe está com defeito?</h2>
        <p>Não existe um teste único que confirme placa-mãe defeituosa em todos os casos. A suspeita fica consistente quando o defeito continua reproduzível depois de verificar alimentação, memória, periféricos, temperatura e compatibilidade, ou quando existe evidência física direta como queimado, corrosão, trilha rompida ou soquete danificado. Trocar a placa antes dessa eliminação é uma das formas mais comuns de gastar com a peça errada.</p>

        <h2>Por que o sintoma engana</h2>
        <p>A placa distribui energia, comanda o vídeo integrado, controla memória, armazenamento e portas. Quando um desses caminhos falha na própria placa, o efeito aparece no periférico ligado ali. Um slot de memória com contato ruim gera erro que parece pente defeituoso; uma regulagem instável na placa gera reinício que parece fonte fraca; um controlador de USB travado parece cabo ou dispositivo.</p>
        <p>Por isso, não é seguro concluir “placa-mãe” apenas pelo sintoma. A hipótese ganha força quando alimentação, memória, periféricos, temperatura e configuração foram isolados de forma controlada e o comportamento permanece reproduzível.</p>

        <h2>Inspeção visual — o passo que resolve muitos casos</h2>
        <p>Antes de qualquer teste, com o cabo de força retirado, observe a placa com boa luz:</p>
        <ul>
          <li><strong>Capacitores deformados ou com resíduo:</strong> topo abaulado, aberto ou com crosta escura indicam peça no fim.</li>
          <li><strong>Escurecimento e carbonização:</strong> trilha ou componente queimado é evidência direta.</li>
          <li><strong>Corrosão:</strong> manchas esverdeadas ou esbranquiçadas indicam umidade ou líquido derramado, comum em máquinas guardadas.</li>
          <li><strong>Dano mecânico:</strong> pino torto no soquete, trava de slot quebrada, trilha rompida perto de furo de parafuso.</li>
          <li><strong>Poeira compactada e pasta térmica ressecada:</strong> não é defeito de placa, mas muda o comportamento térmico e precisa ser corrigido antes de qualquer conclusão.</li>
        </ul>

        <h2>Teste mínimo: reduzir até sobrar o essencial</h2>
        <p>A montagem mínima existe para eliminar interferência. Ficam apenas placa, processador com refrigeração, um módulo de memória e a fonte. Saem armazenamento, placa de vídeo dedicada, periféricos e cabos de painel frontal que não sejam necessários.</p>
        <ol>
          <li>Monte só o essencial e tente ligar usando o vídeo integrado, quando existir.</li>
          <li>Se chegar à tela de configuração da BIOS, a placa responde no nível básico — o defeito está no que foi removido.</li>
          <li>Se não chegar, devolva um componente por vez e observe em qual deles o comportamento muda.</li>
          <li>Anote cada passo. Diagnóstico de placa se perde quando se troca duas coisas ao mesmo tempo.</li>
        </ol>

        <h2>Isolando memória e slots</h2>
        <p>Teste um módulo por vez e, quando o manual permitir, compare os slots. Se um módulo específico falha em diferentes posições enquanto outro funciona, a memória vira suspeita forte. Se módulos conhecidos como bons falham de forma repetível na mesma posição, investigue o slot e a placa, mas considere também controlador de memória, soquete/processador e regras de população da plataforma antes de fechar diagnóstico. Encaixe parcial e contato ruim também podem imitar esse quadro.</p>

        <h2>Descartando a fonte antes de acusar a placa</h2>
        <p>Falhas de alimentação podem imitar uma placa sem resposta. Confirme a fonte por método adequado ao caso — incluindo medição e, quando disponível, comparação com uma fonte conhecida e compatível. O procedimento completo está em <a href="/blog/como-testar-fonte-de-alimentacao-pc">como testar a fonte de alimentação</a>. Esse descarte aumenta a qualidade do diagnóstico antes de atribuir a causa à placa.</p>

        <h2>Sinais de diagnóstico da própria placa</h2>
        <p>Muitas placas indicam onde o processo parou: sequência sonora quando existe alto-falante interno, LEDs de estágio identificando processador, memória, vídeo ou inicialização, e visor de código em modelos mais completos. Esses códigos variam por fabricante — o valor deles é apontar a etapa que travou, não entregar a peça culpada. Confira o significado no manual do modelo exato, nunca em tabela genérica.</p>

        <h2>Quando as evidências passam a apontar para a placa</h2>
        <ul>
          <li>Montagem mínima continua sem inicializar depois de fonte e memória serem verificadas por comparação controlada e a compatibilidade do processador ser confirmada.</li>
          <li>Uma porta, slot ou função da placa falha de forma reproduzível com componentes compatíveis e conhecidos como funcionais, depois de descartadas as dependências daquela interface.</li>
          <li>Dano físico visível: queimado, corrosão, trilha rompida, pino do soquete danificado.</li>
          <li>Instabilidade persistente após descartar energia, memória e temperatura.</li>
        </ul>

        <h2>Reparar ou substituir</h2>
        <p>Nem todo defeito de placa exige substituição completa. Conector danificado, componente discreto ou trilha acessível podem ter reparo viável depois de medição em bancada. Já corrosão extensa, dano em múltiplas áreas ou falhas em componentes complexos podem tornar o reparo técnica ou economicamente desfavorável. A decisão depende do modelo, disponibilidade de peças, extensão do dano e custo de uma placa compatível.</p>
        <p>A decisão também depende da plataforma: placa antiga exige processador e memória da mesma geração, então trocar a placa às vezes puxa dois componentes junto. Esse cálculo é apresentado antes de qualquer autorização, com peça e mão de obra separadas.</p>

        <h2>O que não fazer</h2>
        <ul>
          <li>Insistir em ligar repetidamente uma máquina com cheiro de queimado.</li>
          <li>Aquecer a placa com fonte de calor doméstica na esperança de reativar solda.</li>
          <li>Trocar processador por suspeita, sem descarte prévio de fonte e memória.</li>
          <li>Comprar placa antes de confirmar compatibilidade com o processador e a memória que já existem.</li>
        </ul>

        <h2>Próximo passo</h2>
        <p>Se a máquina não dá nenhum sinal, comece por <a href="/servicos/computador-nao-liga">computador não liga</a>. Quando a suspeita se firma na eletrônica, o procedimento de bancada está em <a href="/servicos/conserto-placa">conserto de placa</a>, e o critério de verificação e cobrança em <a href="/diagnostico-tecnico">como funciona o diagnóstico técnico</a>.</p>

        <h2>Resumo prático</h2>
        <p>Inspecione antes de testar, reduza a máquina ao mínimo, compare memória e alimentação de forma controlada e registre o que muda a cada etapa. Dano físico visível aumenta a suspeita, mas o escopo do defeito ainda precisa ser medido. Sem evidência direta, é a eliminação documentada das outras hipóteses que sustenta a decisão de reparar ou substituir.</p>
      </>
    ),
  },

  "boot-uefi-ou-legacy-como-identificar": {
    title: "UEFI ou Legacy: como saber qual está ativo e quando mudar",
    excerpt:
      "Veja como identificar UEFI ou Legacy no Windows, conferir GPT/MBR com segurança e entender quando não alterar firmware, Secure Boot ou partições.",
    date: "2026-08-31",
    readTime: "11 min",
    category: "Diagnóstico",
    content: (
      <>
        <p className="lead">Antes de trocar UEFI, Legacy ou CSM, descubra como o Windows atual está iniciando. O modo de firmware, o carregador de boot e o esquema de partições fazem parte do mesmo caminho de inicialização; alterar apenas uma dessas peças pode deixar uma instalação existente sem boot ou acionar recuperação de criptografia.</p>

        <h2>Resposta curta</h2>
        <p>No Windows, comece por <strong>Informações do Sistema (msinfo32)</strong> e confira o campo <strong>Modo da BIOS</strong>. Ele informa se aquela instalação foi iniciada em UEFI ou em modo herdado. Depois identifique o estilo de partição do <strong>disco do sistema</strong> como GPT ou MBR. Essa combinação ajuda a entender a instalação atual, mas não deve ser transformada em uma regra universal para qualquer disco, firmware ou outro sistema operacional.</p>
        <p>Em equipamentos modernos compatíveis com Windows 11, UEFI é o caminho esperado e o Secure Boot faz parte dos requisitos de plataforma. Em instalações antigas, Legacy/CSM e MBR ainda podem aparecer. O ponto importante é preservar o estado conhecido antes de alterar o firmware.</p>

        <h2>1. Identifique o modo em que o Windows realmente iniciou</h2>
        <p>Abra <strong>Informações do Sistema</strong> e procure por “Modo da BIOS”. Se o valor for UEFI, o Windows desta sessão foi iniciado nesse modo. Se aparecer Legacy ou Herdado, a sessão foi iniciada pelo caminho legado. Esse dado é mais útil do que deduzir o modo apenas pela aparência da tela de firmware.</p>
        <p>Se o Windows não inicia, a investigação muda: registre as opções atuais do firmware e procure entradas como <strong>Windows Boot Manager</strong>, UEFI, CSM ou Legacy, lembrando que os nomes variam por fabricante. Uma etiqueta no menu de boot é indício, não prova isolada de como o sistema instalado foi preparado.</p>

        <h2>2. Confira GPT ou MBR no disco do sistema</h2>
        <p>No Gerenciamento de Disco, abra as propriedades do disco que contém o Windows e verifique o estilo de partição. Em PowerShell, <code>Get-Disk</code> também mostra a coluna <code>Partition Style</code>. Confirme que está olhando o disco do sistema: um computador pode ter discos GPT e MBR ao mesmo tempo.</p>
        <p>Para instalações suportadas do Windows em modo UEFI, GPT é o esquema esperado. Instalações legadas mais antigas normalmente usam MBR. Encontrar uma combinação diferente não é motivo para converter ou apagar o disco por tentativa: primeiro confirme qual volume contém o boot e como o firmware está iniciando a máquina.</p>

        <h2>3. Como interpretar os sinais sem simplificar demais</h2>
        <table>
          <thead><tr><th>O que você observa</th><th>O que isso sugere no Windows</th><th>Próximo passo seguro</th></tr></thead>
          <tbody>
            <tr><td>Modo da BIOS = UEFI e disco do sistema = GPT</td><td>Configuração comum em instalações modernas do Windows</td><td>Preserve o modo; altere apenas se houver motivo documentado.</td></tr>
            <tr><td>Modo da BIOS = Legacy/Herdado e disco do sistema = MBR</td><td>Instalação legada coerente com PCs ou instalações mais antigas</td><td>Não troque para UEFI apenas para testar.</td></tr>
            <tr><td>Firmware oferece UEFI e Legacy/CSM</td><td>O equipamento suporta mais de um caminho de boot</td><td>Descubra qual deles o sistema atual usa antes de mudar.</td></tr>
            <tr><td>Disco secundário é GPT ou MBR</td><td>Isso não prova o modo de boot do Windows</td><td>Verifique o disco do sistema e o campo Modo da BIOS.</td></tr>
            <tr><td>Secure Boot está desligado</td><td>Não basta, sozinho, para concluir que o Windows está em Legacy</td><td>Confirme o modo real no sistema e a política do equipamento.</td></tr>
          </tbody>
        </table>

        <h2>4. Trocar UEFI e Legacy depois da instalação exige preparação</h2>
        <p>A documentação da Microsoft orienta que, depois que o Windows é instalado, o equipamento normalmente continua iniciando no mesmo modo usado durante a instalação. Apenas alternar UEFI/Legacy no Setup pode fazer o firmware deixar de encontrar o carregador esperado.</p>
        <p>Quando uma migração de BIOS legado/MBR para UEFI/GPT é realmente necessária, o Windows fornece o <strong>MBR2GPT</strong> em cenários suportados. A ferramenta valida o disco antes da conversão e modifica estruturas de boot; depois, o firmware ainda precisa ser configurado para UEFI. Isso não transforma conversão em procedimento de tentativa: backup, validação e chave de recuperação continuam importantes.</p>

        <h2>5. Secure Boot é uma camada de confiança do boot</h2>
        <p>Secure Boot é um recurso do ecossistema UEFI que verifica componentes do processo de inicialização conforme políticas de confiança. Ele não é um “modo de desempenho” e não deve ser ligado ou desligado para tentar corrigir qualquer erro de boot sem entender a causa.</p>
        <p>Se uma mídia externa não inicializa, confirme origem, assinatura, forma como foi criada e compatibilidade com o firmware. Desabilitar Secure Boot permanentemente apenas para contornar uma mídia desconhecida troca diagnóstico por redução de proteção.</p>

        <h2>6. BitLocker muda o nível de cuidado</h2>
        <p>Mudanças em firmware, TPM, Secure Boot ou caminho de inicialização podem levar o BitLocker a pedir a chave de recuperação. Antes de converter o disco, atualizar firmware ou alterar configurações relevantes, confirme que a chave está disponível e siga o procedimento da Microsoft para o cenário específico. Em ambiente corporativo, preserve também as políticas definidas pela equipe de TI.</p>

        <h2>7. Situações em que o problema não é “UEFI versus Legacy”</h2>
        <ul>
          <li><strong>Disco não aparece no firmware:</strong> investigue detecção, alimentação, slot e compatibilidade; trocar modo de boot não faz um dispositivo fisicamente ausente aparecer.</li>
          <li><strong>Windows Boot Manager desapareceu:</strong> confirme se a partição EFI e o BCD estão íntegros antes de mudar o modo inteiro do firmware.</li>
          <li><strong>SSD novo sem sistema:</strong> não haver entrada de boot é esperado até existir um carregador válido.</li>
          <li><strong>Pendrive não aparece:</strong> confirme como a mídia foi criada, a porta usada e o modo suportado pela mídia.</li>
        </ul>
        <p>Se o armazenamento não é reconhecido pelo firmware, use <a href="/blog/hd-nao-e-reconhecido-na-bios-o-que-fazer">HD ou SSD não reconhecido na BIOS</a>. Se a máquina passou a abrir apenas a tela de firmware depois de uma troca de SSD, veja <a href="/blog/troquei-o-ssd-e-o-pc-so-abre-a-bios">troquei o SSD e o PC só abre a BIOS</a>.</p>

        <h2>8. Quando parar antes de alterar mais opções</h2>
        <ul>
          <li>Você não sabe se o disco do sistema está em GPT ou MBR.</li>
          <li>Há BitLocker ou criptografia do dispositivo e a chave de recuperação não está disponível.</li>
          <li>O PC é corporativo e você não sabe se Secure Boot, TPM ou firmware são gerenciados.</li>
          <li>O disco deixou de aparecer depois de uma mudança de controlador ou firmware.</li>
          <li>Você pretende converter partições sem backup verificado dos dados importantes.</li>
        </ul>

        <h2>9. Sequência de diagnóstico que preserva reversibilidade</h2>
        <ol>
          <li>Registre com foto as opções atuais do firmware.</li>
          <li>No Windows, anote o campo Modo da BIOS.</li>
          <li>Confirme qual é o disco do sistema e se ele usa GPT ou MBR.</li>
          <li>Verifique BitLocker e guarde a chave de recuperação fora do equipamento.</li>
          <li>Defina o objetivo: instalar outro sistema, converter uma instalação existente ou apenas escolher um dispositivo de boot.</li>
          <li>Faça uma alteração por vez e valide se o Windows continua iniciando.</li>
        </ol>

        <h2>Fontes primárias Microsoft</h2>
        <ul>
          <li><a href="https://learn.microsoft.com/pt-br/windows-hardware/manufacture/desktop/boot-to-uefi-mode-or-legacy-bios-mode?view=windows-11" rel="nofollow noopener" target="_blank">Microsoft Learn — Inicializar no modo UEFI ou no modo BIOS herdado</a></li>
          <li><a href="https://learn.microsoft.com/pt-br/windows-hardware/drivers/bringup/switch-legacy-bios-boot-and-csm-to-uefi-and-gpt" rel="nofollow noopener" target="_blank">Microsoft Learn — Alternar BIOS legado/CSM para UEFI e GPT</a></li>
          <li><a href="https://learn.microsoft.com/pt-br/windows/deployment/mbr-to-gpt" rel="nofollow noopener" target="_blank">Microsoft Learn — MBR2GPT</a></li>
          <li><a href="https://learn.microsoft.com/pt-br/windows-hardware/drivers/bringup/secure-boot" rel="nofollow noopener" target="_blank">Microsoft Learn — Secure Boot</a></li>
        </ul>

        <h2>Resumo prático</h2>
        <p>Use o Modo da BIOS do Windows para identificar como a sessão atual iniciou, confirme GPT/MBR no disco do sistema e trate menus do firmware como evidência complementar. Não converta partições nem altere UEFI/Legacy, Secure Boot ou TPM por tentativa. Quando uma migração for necessária, siga o procedimento documentado para o Windows instalado, com backup e recuperação do BitLocker disponíveis.</p>
      </>
    ),
  },
};

export default blogSupplementalPosts;
