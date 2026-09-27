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
};

export default blogSupplementalPosts;
