import React from "react";
import type { BlogPostContent } from "@/data/blogPostsContent";
import { EditorialReferences } from "@/components/BlogPostFAQ";

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
    title: "Clonar HD para SSD: como decidir, preparar e validar a migração",
    excerpt:
      "Quando vale clonar, quando reinstalar, como conferir espaço, partições e BitLocker, validar o boot no SSD e saber quando parar porque o HD de origem está falhando.",
    date: "2026-08-12",
    readTime: "14 min",
    category: "Manutenção",
    content: (
      <>
        <p className="lead">Clonar um HD para SSD pode preservar Windows, programas, arquivos e configurações, mas só é uma boa estratégia quando a origem está suficientemente saudável e a estrutura de inicialização pode ser reproduzida no destino. Antes de copiar, separe quatro perguntas: <strong>os dados estão protegidos, o conteúdo cabe no SSD, o disco de origem aguenta uma leitura extensa e a máquina conseguirá iniciar pela estrutura clonada?</strong></p>

        <h2>Resposta direta: quando vale clonar o HD para o SSD?</h2>
        <p>Vale clonar quando o sistema atual está funcional, os dados importantes já têm uma cópia independente e você quer manter o ambiente como está. Reinstalar tende a ser mais coerente quando o Windows já apresenta corrupção, travamentos persistentes ou uma configuração que você pretende reconstruir. Se o HD faz ruído, desaparece, congela durante leitura ou acumula erros, a prioridade muda: <strong>preservar os dados vem antes de tentar uma clonagem longa</strong>.</p>

        <aside className="not-prose my-8 rounded-2xl border border-accent/25 bg-accent/[0.04] p-5 md:p-6" aria-labelledby="decisao-clonagem-ssd">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Matriz de decisão</span>
          <h2 id="decisao-clonagem-ssd" className="mt-2 text-xl font-heading font-bold text-foreground">Clonar, reinstalar ou primeiro salvar os dados?</h2>
          <div className="mt-5 overflow-x-auto rounded-xl border border-border bg-background">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-muted/60 text-foreground">
                <tr>
                  <th className="p-3 font-semibold">Cenário</th>
                  <th className="p-3 font-semibold">Prioridade</th>
                  <th className="p-3 font-semibold">Por quê</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                <tr><td className="p-3">Windows estável e disco legível</td><td className="p-3">Clonagem pode fazer sentido</td><td className="p-3">Preserva ambiente e reduz reinstalação de programas.</td></tr>
                <tr><td className="p-3">Windows corrompido ou muito instável</td><td className="p-3">Avaliar instalação limpa</td><td className="p-3">A clonagem também preserva problemas lógicos existentes.</td></tr>
                <tr><td className="p-3">HD com ruído, sumiços ou leitura travando</td><td className="p-3">Preservar dados primeiro</td><td className="p-3">Uma leitura extensa pode piorar a situação de uma unidade fisicamente degradada.</td></tr>
                <tr><td className="p-3">SSD é menor que o HD original</td><td className="p-3">Comparar dados usados e layout</td><td className="p-3">Capacidade nominal do HD não basta; partições e espaço ocupado precisam caber no destino.</td></tr>
                <tr><td className="p-3">Após clonar, o PC abre a BIOS</td><td className="p-3">Não apagar a origem</td><td className="p-3">É preciso separar boot, firmware e estrutura de partições antes de concluir que a cópia falhou.</td></tr>
              </tbody>
            </table>
          </div>
        </aside>

        <h2>Antes de clonar: cinco verificações que evitam perda de tempo e dados</h2>
        <ol>
          <li><strong>Tenha um backup independente e verificado.</strong> Abra alguns arquivos diretamente na cópia. Clonagem é migração, não substituto de backup.</li>
          <li><strong>Avalie sinais de falha da origem.</strong> Ruído mecânico, desaparecimentos, congelamentos e erros de leitura mudam a estratégia. Nesse caso, consulte <a href="/blog/como-recuperar-dados-hd-com-defeito">recuperação de dados em HD com defeito</a> antes de insistir.</li>
          <li><strong>Compare espaço usado e layout de partições.</strong> Um SSD menor pode receber a instalação somente se o conteúdo e as partições puderem ser acomodados com segurança. Não basta comparar “1 TB” com “500 GB”.</li>
          <li><strong>Confirme compatibilidade física e lógica.</strong> SATA, M.2 SATA e NVMe não são equivalentes. Verifique o slot e o padrão aceitos pelo equipamento antes de comprar ou desmontar.</li>
          <li><strong>Se houver BitLocker ou criptografia do dispositivo, confirme a chave de recuperação.</strong> Alterações de armazenamento, boot ou firmware podem exigir essa chave. Guarde-a fora do computador antes de começar.</li>
        </ol>

        <h2>SSD menor que o HD: o que realmente precisa caber</h2>
        <p>O tamanho impresso no disco antigo não define sozinho se a clonagem é possível. O que interessa é a quantidade de dados usada <strong>e</strong> a forma como as partições estão distribuídas. Um HD de 1 TB com pouco espaço ocupado pode caber em um SSD menor, mas a ferramenta ainda precisa conseguir redimensionar as partições sem excluir dados ou estruturas necessárias ao boot.</p>
        <p>Antes de iniciar, compare o espaço efetivamente ocupado, reserve margem livre no destino e confirme se existem partições de sistema, recuperação ou fabricante que a ferramenta pretende copiar. Se a origem estiver praticamente cheia, primeiro organize os dados e valide o backup; não conte com um redimensionamento no limite exato.</p>

        <h2>Clonar não é copiar apenas a unidade C:</h2>
        <p>Em uma instalação moderna do Windows, a inicialização pode depender de pequenas partições que não aparecem como uma letra no Explorador. Copiar apenas a partição principal pode deixar o SSD com todos os arquivos visíveis, mas sem uma estrutura de boot funcional.</p>
        <p>Por isso, uma migração de sistema deve tratar o <strong>disco e suas partições de inicialização</strong> como um conjunto. Em máquinas UEFI, a coerência entre firmware, tabela de partições e arquivos de boot importa. O BCDBoot, documentado pela Microsoft, existe para configurar ou reparar o ambiente de inicialização; ele não é um motivo para apagar ou recriar partições às cegas.</p>

        <h2>Como preparar o destino sem criar um problema novo</h2>
        <p>Conecte o SSD pelo método compatível com o equipamento e com a ferramenta escolhida. Alguns fluxos de clonagem trabalham diretamente com um disco ainda sem volume; outros exigem que o sistema o reconheça previamente. <strong>Não inicialize, formate ou apague por reflexo sem confirmar qual disco está selecionado e o que a ferramenta de clonagem pede.</strong></p>
        <p>Em notebook, a conexão temporária pode exigir adaptador ou gabinete USB; em desktop, pode existir uma porta interna disponível. Isso depende do hardware. Mantenha alimentação estável durante a cópia e evite outras tarefas pesadas enquanto a origem está sendo lida.</p>

        <h2>Onde a clonagem costuma falhar</h2>
        <ul>
          <li><strong>Erro de leitura na origem:</strong> a cópia trava ou repete falhas no mesmo ponto. Não transforme várias tentativas em teste de resistência de um HD degradado.</li>
          <li><strong>Destino sem espaço suficiente:</strong> os dados até parecem caber, mas o layout completo não cabe ou não consegue ser reduzido.</li>
          <li><strong>Partição de boot ficou de fora:</strong> o SSD contém o Windows, mas não aparece como opção de inicialização válida.</li>
          <li><strong>Firmware e estrutura clonada não combinam:</strong> mudar UEFI/Legacy, CSM ou modo do controlador sem entender a instalação pode gerar um segundo problema.</li>
          <li><strong>O computador continua iniciando pelo disco antigo:</strong> com os dois conectados, a ordem de boot pode mascarar se o SSD realmente é autônomo.</li>
          <li><strong>Criptografia não foi considerada:</strong> BitLocker pode solicitar recuperação depois de mudanças relevantes de hardware ou boot.</li>
        </ul>

        <h2>Primeiro boot no SSD: valide antes de apagar qualquer coisa</h2>
        <ol>
          <li><strong>Quando a arquitetura permitir, valide o SSD sem depender do disco antigo.</strong> Isso ajuda a provar que o sistema novo consegue iniciar sozinho.</li>
          <li><strong>Confirme qual unidade está realmente dando boot.</strong> Não use apenas a aparência do Windows como evidência; dois discos clonados podem parecer idênticos.</li>
          <li><strong>Abra arquivos e programas importantes.</strong> Verifique documentos, área de trabalho, aplicações e perfis que você realmente usa.</li>
          <li><strong>Confira o espaço do SSD.</strong> Se houver área não alocada, expanda somente depois de confirmar que a estrutura está estável e que você está alterando o disco correto.</li>
          <li><strong>Mantenha o disco antigo intacto por um período de validação.</strong> Não formate a única cópia anterior no mesmo dia em que concluiu a migração.</li>
        </ol>

        <h2>Clonou e agora só abre a BIOS?</h2>
        <p>Esse sintoma não prova que “a clonagem deu errado”. Primeiro confirme se o SSD é detectado pelo firmware, se existe uma entrada de boot coerente com a instalação e se a cópia incluiu a estrutura necessária. Não comece mudando várias opções de firmware ao mesmo tempo e não formate o HD antigo.</p>
        <p>O roteiro específico está em <a href="/blog/troquei-o-ssd-e-o-pc-so-abre-a-bios">troquei o SSD e o PC só abre a BIOS</a>. Se o ambiente de inicialização precisar de reparo, use o procedimento compatível com a instalação e preserve a chave do BitLocker antes de qualquer intervenção.</p>

        <h2>O que o SSD melhora — e o que ele não corrige</h2>
        <p>Migrar de HD mecânico para SSD pode reduzir muito a espera associada ao armazenamento, mas não corrige falta de memória, superaquecimento, processador limitado, malware ou um Windows logicamente degradado. Se a máquina continua lenta depois da troca, volte ao diagnóstico do gargalo em <a href="/blog/computador-lento-causas-solucoes">computador lento: causas e como decidir</a>.</p>
        <p>Também não há obrigação de clonar só porque o SSD é novo. Em uma máquina com histórico de problemas, começar com uma instalação limpa pode ser uma escolha melhor do que transportar anos de configuração acumulada.</p>

        <h2>Quando interromper e levar para avaliação</h2>
        <p>Pare quando a origem faz ruído anormal, some durante a leitura, a clonagem trava repetidamente no mesmo ponto, surgem dados inacessíveis ou o backup dos arquivos importantes ainda não foi validado. Se a máquina não inicia pelo SSD depois da cópia, preserve os dois discos como estão até separar detecção, partições e boot.</p>
        <p>O processo de verificação está em <a href="/diagnostico-tecnico">diagnóstico técnico</a>, e a migração de armazenamento faz parte de <a href="/servicos/upgrade-ssd-ram">upgrade de SSD e memória</a>.</p>

        <h2>Perguntas frequentes</h2>
        <h3>Posso clonar um HD de 1 TB para um SSD de 500 GB?</h3>
        <p>Pode ser possível se os dados usados e o layout de partições couberem no SSD e a ferramenta conseguir redimensionar o que for necessário. A capacidade nominal do HD, sozinha, não responde à pergunta.</p>

        <h3>Preciso formatar o SSD antes da clonagem?</h3>
        <p>Não existe uma regra universal. O fluxo depende da ferramenta e do estado do destino. O ponto crítico é selecionar corretamente origem e destino e não apagar um disco por engano.</p>

        <h3>Clonar também leva programas e configurações?</h3>
        <p>Uma clonagem de sistema bem-sucedida busca preservar o ambiente existente, incluindo programas e configurações, mas isso depende de a cópia incluir as partições necessárias e de o sistema conseguir inicializar no novo hardware de armazenamento.</p>

        <h3>Depois de clonar posso apagar o HD antigo imediatamente?</h3>
        <p>Não é uma boa validação. Primeiro confirme boot autônomo pelo SSD, arquivos, programas e espaço; mantenha a origem intacta até ter confiança de que a migração está completa e que existe backup independente.</p>

        <h3>Se o HD está falhando, devo cloná-lo várias vezes até dar certo?</h3>
        <p>Não. Falhas repetidas de leitura e sintomas físicos pedem uma estratégia de preservação de dados, não tentativas indefinidas de cópia integral.</p>

        <h2>Resumo prático</h2>
        <p>Clonar é uma ferramenta de migração, não uma garantia. Proteja os dados primeiro, confirme saúde da origem, espaço e estrutura do destino, trate criptografia e boot como parte da migração e valide o SSD antes de apagar qualquer coisa. Se o HD está fisicamente instável, pare de tentar “forçar” a clonagem e priorize a recuperação do que é importante.</p>

        <EditorialReferences slug="como-clonar-hd-para-ssd" />
      </>
    ),
  },
  "notebook-nao-liga-o-que-fazer": {
    title: "Notebook não liga: como separar energia, POST, vídeo e boot sem piorar o defeito",
    excerpt:
      "Sem luz, liga sem imagem, bipa, desliga sozinho ou só funciona na tomada? Use uma triagem segura para separar carregador, bateria, POST, tela e inicialização antes de abrir o notebook.",
    date: "2026-09-30",
    readTime: "15 min",
    category: "Manutenção",
    content: (
      <>
        <p className="lead">“Notebook não liga” pode descrever pelo menos quatro falhas diferentes: <strong>sem energia</strong>, <strong>sem POST</strong>, <strong>sem vídeo</strong> ou <strong>sem boot do sistema</strong>. Tratar tudo como “placa-mãe” ou “bateria” leva a troca de peça por tentativa. A primeira etapa é registrar exatamente o que o equipamento ainda consegue fazer.</p>

        <h2>Resposta direta: qual é o seu sintoma?</h2>
        <table>
          <thead><tr><th>Sintoma</th><th>Camada provável</th><th>Primeira verificação</th></tr></thead>
          <tbody>
            <tr><td>Nenhuma luz, som ou ventoinha</td><td>Entrada de energia / circuito de power</td><td>Tomada, carregador correto, conector e sinais visíveis.</td></tr>
            <tr><td>LED ou ventoinha reage, mas não aparece imagem</td><td>POST ou vídeo</td><td>Observe códigos de LED/bipe e se há imagem externa.</td></tr>
            <tr><td>Mostra logo do fabricante e para</td><td>POST concluído parcialmente ou boot</td><td>Registre mensagem/código antes de reiniciar.</td></tr>
            <tr><td>Chega à BIOS/UEFI, mas não ao Windows</td><td>Armazenamento / boot</td><td>Confirme se SSD/HD é detectado e se existe entrada de boot.</td></tr>
            <tr><td>Funciona só com carregador</td><td>Bateria / alimentação</td><td>Separe “bateria não mantém carga” de “notebook não liga”.</td></tr>
          </tbody>
        </table>
        <p>HP e Dell também estruturam a triagem separando ausência de energia, ausência de POST, ausência de boot e ausência de vídeo. Essa divisão é mais útil do que começar por uma peça específica.</p>

        <h2>1. Se não há nenhum sinal de vida</h2>
        <p>Comece do lado de fora do notebook. Use uma tomada que você sabe que funciona, retire réguas ou extensões suspeitas e confirme que o carregador é compatível com o modelo. Conector fisicamente igual não garante tensão, potência ou protocolo corretos.</p>
        <ul>
          <li>Observe cabo cortado, pino torto, plástico derretido ou aquecimento anormal.</li>
          <li>Se o carregador possui LED, registre se ele permanece aceso antes e depois de conectar ao notebook.</li>
          <li>Se o notebook usa USB-C, confirme no manual qual porta aceita carga e qual potência é exigida; nem toda porta USB-C necessariamente recebe energia.</li>
          <li>Não abra o carregador nem improvise adaptadores.</li>
        </ul>
        <p>Se houver outro carregador <strong>oficialmente compatível</strong> disponível, uma comparação controlada pode separar carregador de notebook. Não use fonte “parecida” apenas porque encaixa.</p>

        <h2>2. Remova periféricos antes de aprofundar</h2>
        <p>Desconecte pendrives, HDs externos, hubs, impressoras, cartões de memória e acessórios não essenciais. HP inclui a remoção de dispositivos externos no seu procedimento básico de triagem, justamente para eliminar um ramo de falha sem abrir o equipamento.</p>
        <p>Depois, tente uma única partida e registre o resultado. Se o comportamento mudou, reconecte um item por vez; isso preserva a evidência.</p>

        <h2>3. Reset elétrico: só como procedimento documentado</h2>
        <p>Fabricantes como HP e Dell documentam procedimentos de descarga/reset de energia para determinados notebooks, normalmente com o equipamento desligado, adaptador desconectado e botão power mantido pressionado por alguns segundos. <strong>O procedimento e o tempo variam</strong>; siga o manual ou suporte oficial do modelo em vez de transformar “segurar power” em regra universal.</p>
        <p>Esse reset não repara bateria, placa ou carregador. Ele apenas elimina alguns estados de energia residual/controlador antes de repetir o teste.</p>

        <h2>4. LED acende ou ventoinha gira, mas não há imagem</h2>
        <p>Nesse ponto o notebook já não está em “sem energia”. A investigação passa a ser <strong>sem POST ou sem vídeo</strong>. Registre qualquer padrão de LED ou bipe; muitos fabricantes usam códigos próprios e a tabela precisa ser a do modelo/família correta.</p>
        <p>Se o equipamento parece iniciar, testar uma saída externa pode ajudar a separar tela/cabo de vídeo de um problema mais amplo, mas ausência de imagem externa também não condena a placa-mãe automaticamente. Veja <a href="/problemas/computador-nao-da-imagem">computador liga mas não dá imagem</a> para a lógica de vídeo/POST.</p>

        <h2>5. Mostra logo, BIOS ou mensagem? Então ele está avançando mais</h2>
        <p>Se aparece logo do fabricante, tela de diagnóstico, BIOS/UEFI ou mensagem de erro, fotografe antes de reiniciar. O equipamento já passou de uma falha de “nenhuma energia” e está oferecendo informação útil.</p>
        <ul>
          <li><strong>Entra direto na BIOS:</strong> confira detecção do SSD e entrada de boot em <a href="/blog/computador-entra-direto-na-bios">computador entra direto na BIOS</a>.</li>
          <li><strong>No Bootable Device:</strong> siga <a href="/blog/erro-no-bootable-device-como-resolver">erro No Bootable Device</a>.</li>
          <li><strong>Reparo automático em loop:</strong> use <a href="/blog/windows-reparo-automatico-em-loop">Windows em reparo automático</a>.</li>
        </ul>
        <p>Não formate nem inicialize disco apenas porque o Windows não abriu. A prioridade é preservar dados e identificar a camada da falha.</p>

        <h2>6. Liga apenas conectado à tomada</h2>
        <p>Esse sintoma é diferente de “notebook não liga”. Se o notebook funciona normalmente com o adaptador, a investigação se concentra em bateria, conexão da bateria, gerenciamento de carga e, conforme o projeto, circuito de alimentação.</p>
        <p>Quando o Windows ainda inicia, o comando oficial <code>powercfg /batteryreport</code> gera um relatório de histórico e características de uso da bateria. Ele é útil para contexto, mas <strong>não transforma sozinho uma bateria em “boa” ou “ruim”</strong> e não substitui diagnóstico elétrico.</p>

        <h2>7. Bateria estufada, líquido, cheiro ou calor anormal: pare</h2>
        <p>Não continue tentando ligar um notebook com bateria deformando a carcaça, líquido derramado, cheiro de queimado, fumaça, estalos ou aquecimento concentrado no conector/carregador. Desconecte da energia quando for seguro fazê-lo e não perfure, pressione ou tente “desinchar” uma bateria.</p>
        <p>Após contato com líquido, não use secador, forno, arroz ou calor para acelerar secagem. Energizar repetidamente aumenta a chance de corrosão ativa e dano elétrico.</p>

        <h2>8. O que códigos de LED e bipes realmente significam</h2>
        <p>Padrões de piscadas e bipes são úteis quando o fabricante documenta o código para aquela plataforma. Eles indicam a etapa em que o equipamento encontrou uma condição, mas não devem ser traduzidos por tabelas genéricas da internet.</p>
        <p>Procure o manual de serviço ou a página de suporte pelo modelo exato. Se o código aponta para memória, por exemplo, ainda pode ser necessário separar módulo, slot e controlador antes de condenar a RAM.</p>

        <h2>9. O que evitar porque apaga evidência ou cria risco</h2>
        <ul>
          <li>Abrir carregador ou bateria.</li>
          <li>Usar fonte incompatível “só para testar”.</li>
          <li>Fazer ponte em pads ou conectores internos sem documentação do modelo.</li>
          <li>Remover memória, SSD, bateria interna e cabo de tela todos de uma vez.</li>
          <li>Atualizar BIOS/UEFI como tentativa genérica em uma máquina instável.</li>
          <li>Formatar o SSD antes de confirmar se os dados estão seguros.</li>
          <li>Insistir em dezenas de partidas quando há cheiro, calor anormal ou líquido.</li>
        </ul>

        <h2>10. Se você tiver experiência para abrir o notebook</h2>
        <p>A desmontagem deve seguir o manual de serviço do modelo. A ordem segura costuma começar por desligar energia externa e isolar a bateria interna antes de tocar em memória, SSD ou cabos, mas o acesso e a sequência variam. Alguns modelos exigem remover tampa, blindagem ou conectores delicados.</p>
        <p>Se a máquina está em garantia, confirme antes as regras de serviço. Se você não tem ferramenta adequada ou experiência com flats e travas, parar antes da abertura preserva o equipamento.</p>

        <h2>11. Como organizar o diagnóstico sem trocar peças</h2>
        <ol>
          <li>Classifique: sem energia, sem POST, sem vídeo ou sem boot.</li>
          <li>Registre LEDs, bipes, mensagens e o que aconteceu antes da falha.</li>
          <li>Elimine tomada, carregador compatível e periféricos externos.</li>
          <li>Siga o reset de energia oficial do fabricante quando aplicável.</li>
          <li>Se há sinais de vida, mude para a trilha de POST/vídeo.</li>
          <li>Se chega à BIOS ou mostra mensagens, investigue boot/armazenamento sem apagar dados.</li>
          <li>Faça apenas uma alteração por vez.</li>
        </ol>

        <h2>Quando procurar diagnóstico técnico</h2>
        <p>Procure avaliação quando não há resposta com carregador compatível conhecido, quando existe dano físico, líquido, bateria deformada, conector aquecendo, código de diagnóstico recorrente, desligamento imediato ou necessidade de abrir o equipamento para medir linhas internas. Nessa etapa, o objetivo é localizar a falha antes de comprar bateria, carregador ou placa.</p>
        <p>Veja <a href="/diagnostico-tecnico">como funciona o diagnóstico técnico</a> e <a href="/servicos/manutencao-de-notebook">manutenção de notebook</a>.</p>

        <h2>Perguntas frequentes</h2>
        <h3>Notebook sem luz nenhuma é sempre carregador?</h3>
        <p>Não. Carregador é uma hipótese, mas conector, bateria, circuito de entrada e placa também podem produzir ausência total de sinais.</p>

        <h3>Se a luz acende, a placa-mãe está boa?</h3>
        <p>Não. Um LED mostra apenas que algum circuito recebeu energia. POST, memória, CPU, vídeo e outras linhas ainda podem falhar.</p>

        <h3>Posso testar com qualquer carregador que encaixe?</h3>
        <p>Não. Confirme compatibilidade elétrica e de protocolo pelo fabricante. Conector parecido não garante segurança.</p>

        <h3>Notebook liga só na tomada: preciso trocar bateria?</h3>
        <p>A bateria fica mais suspeita, mas conexão, gerenciamento de carga e circuito interno ainda precisam ser considerados. Se o Windows inicia, o battery report ajuda a registrar histórico, não a fechar o diagnóstico sozinho.</p>

        <h3>Segurar o botão power por 20 segundos resolve?</h3>
        <p>Alguns fabricantes documentam procedimentos semelhantes para modelos compatíveis. Use a orientação oficial do seu modelo; não trate duração e sequência como regra universal.</p>

        <h2>Resumo prático</h2>
        <p>Quando um notebook “não liga”, primeiro descubra <strong>em que etapa ele para</strong>. Elimine energia externa e periféricos, use apenas procedimentos oficiais do modelo e não confunda ausência de vídeo ou boot com ausência de energia. Pare diante de líquido, bateria deformada, cheiro ou calor anormal e preserve os dados antes de qualquer ação destrutiva.</p>

        <EditorialReferences slug="notebook-nao-liga-o-que-fazer" />
      </>
    ),
  },

  "computador-entra-direto-na-bios": {
    title: "Computador entra direto na BIOS: como separar disco, boot e firmware",
    excerpt:
      "PC abre a BIOS/UEFI em vez do Windows? Veja como verificar detecção do SSD, Windows Boot Manager, UEFI/Legacy, configurações perdidas e falha de boot sem apagar dados.",
    date: "2026-09-29",
    readTime: "15 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Um computador que abre direto o Setup da BIOS/UEFI está mostrando que o processo normal de inicialização não seguiu até o sistema operacional. Isso <strong>não prova que a BIOS esteja defeituosa</strong> e também não prova, sozinho, que o SSD morreu ou que o Windows foi apagado. O diagnóstico melhora quando você separa três perguntas: <strong>o firmware detecta o disco?</strong>, <strong>existe uma entrada de boot válida?</strong> e <strong>o modo/configuração do firmware combina com a instalação?</strong></p>

        <h2>Resposta direta: por que o PC entra direto na BIOS?</h2>
        <p>As causas possíveis ficam em camadas. O armazenamento pode não ser detectado; o disco pode aparecer sem uma entrada de inicialização utilizável; a ordem de boot pode ter mudado; o modo UEFI/Legacy pode não corresponder ao estado da instalação; uma alteração de hardware/firmware pode ter afetado a cadeia de boot; ou a própria configuração do firmware pode estar sendo perdida. Tecla pressionada, dispositivo externo e falhas de POST também podem levar ao Setup em determinados modelos.</p>
        <p>Por isso, não comece alterando CSM, Secure Boot, SATA/AHCI, VMD, RAID ou partições. Primeiro registre o estado atual e identifique em qual camada o processo parou.</p>

        <h2>Mapa rápido de decisão</h2>
        <table>
          <thead><tr><th>O que você observa</th><th>O que isso indica</th><th>Próximo passo seguro</th></tr></thead>
          <tbody>
            <tr><td>SSD/HD não aparece no firmware</td><td>O problema está antes do carregador do Windows.</td><td>Verificar conexão, slot, alimentação e compatibilidade; preservar dados se a detecção é intermitente.</td></tr>
            <tr><td>Disco aparece, mas não há Windows Boot Manager</td><td>Detecção física existe, mas a cadeia de boot precisa ser investigada.</td><td>Confirmar UEFI/Legacy, estrutura de boot e mudanças recentes.</td></tr>
            <tr><td>Windows Boot Manager aparece, mas o PC volta ao Setup</td><td>A entrada existe, porém a tentativa de boot não conclui.</td><td>Confirmar prioridade, estado do disco e integridade do boot sem apagar partições.</td></tr>
            <tr><td>Data/hora e opções voltam ao padrão</td><td>Configurações do firmware podem não estar sendo retidas.</td><td>Investigar RTC/bateria/configuração conforme o manual do equipamento.</td></tr>
            <tr><td>Problema começou após trocar/clonar SSD</td><td>A mudança recente é a principal evidência.</td><td>Separar detecção do novo SSD, estrutura clonada e entrada de boot.</td></tr>
          </tbody>
        </table>

        <h2>1. Antes de mudar qualquer opção, registre o estado atual</h2>
        <p>Fotografe as telas de <strong>Boot</strong>, armazenamento, modo UEFI/Legacy/CSM e qualquer configuração de controlador que você pretenda tocar. Se houver BitLocker ou criptografia do dispositivo, confirme a chave de recuperação antes de mudanças relevantes de firmware ou boot.</p>
        <p>Essa etapa parece simples, mas evita transformar um defeito único em dois. Quando várias opções são alteradas ao mesmo tempo, fica difícil saber qual mudança ajudou ou piorou.</p>

        <h2>2. O firmware detecta fisicamente o SSD ou HD?</h2>
        <p>Procure o modelo da unidade em áreas como Storage, NVMe, SATA Information ou equivalentes. Os nomes variam por fabricante. Se a unidade <strong>não aparece</strong>, o Windows e o BCD ainda não são a prioridade: o firmware precisa primeiro enxergar o dispositivo.</p>
        <ul>
          <li>Em SATA, confirme alimentação, cabo e porta com o equipamento desligado.</li>
          <li>Em M.2, confirme protocolo aceito pelo slot, formato físico e encaixe.</li>
          <li>Consulte o manual quando houver mais de um M.2 ou compartilhamento de recursos com portas SATA/PCIe.</li>
          <li>Se a unidade some e volta, aquece de forma anormal ou contém dados importantes sem backup, pare antes de escrever, formatar ou reinstalar.</li>
        </ul>
        <p>Para esse cenário, use <a href="/blog/hd-nao-e-reconhecido-na-bios-o-que-fazer">HD ou SSD não reconhecido na BIOS</a>. M.2 é formato físico e não garante, sozinho, compatibilidade SATA ou NVMe.</p>

        <h2>3. O disco aparece: existe uma entrada de boot coerente?</h2>
        <p>Em instalações modernas do Windows em UEFI, é comum existir uma entrada chamada <strong>Windows Boot Manager</strong>. O disco aparecer na lista de armazenamento e a entrada de boot existir são evidências diferentes: a primeira confirma detecção física; a segunda indica que o firmware conhece um caminho de inicialização.</p>
        <p>Se o disco aparece, mas o Windows Boot Manager não, não conclua que “o SSD está bom” nem que “o Windows sumiu”. A estrutura EFI/BCD, o modo de firmware, a clonagem e outras alterações podem estar envolvidos.</p>

        <h2>4. UEFI, Legacy e CSM: não altere por tentativa</h2>
        <p>A Microsoft documenta que uma instalação normalmente continua inicializando no mesmo modo usado quando foi preparada. Alternar UEFI e Legacy/CSM sem entender o disco pode fazer uma instalação existente deixar de aparecer como opção inicializável.</p>
        <p>O roteiro para identificar o estado atual está em <a href="/blog/boot-uefi-ou-legacy-como-identificar">UEFI ou Legacy: como identificar o boot mode</a>. Use o estilo GPT/MBR como parte da evidência, não como regra para converter o disco no escuro.</p>

        <h2>5. Windows Boot Manager existe, mas a máquina volta para o Setup</h2>
        <p>Confirme primeiro se a entrada correta está selecionada como prioridade e se a tentativa de inicialização gera alguma mensagem. Se o firmware oferece um menu temporário de boot, usá-lo para selecionar a entrada existente é mais reversível do que alterar várias opções permanentes de uma vez.</p>
        <p>Se a entrada é escolhida e o boot falha, a investigação passa para estrutura de inicialização e sistema. O BCDBoot é uma ferramenta oficial da Microsoft para configurar/reparar arquivos de boot em cenários apropriados, mas não deve ser usado como comando genérico sem antes identificar corretamente volumes e criptografia.</p>
        <p>Para esse caminho, veja <a href="/blog/erro-no-bootable-device-como-resolver">No Bootable Device: como diagnosticar</a>.</p>

        <h2>6. Se começou depois de trocar ou clonar o SSD</h2>
        <p>Preserve o disco antigo e trate a mudança como evidência principal. Confirme:</p>
        <ol>
          <li>se o SSD novo aparece no firmware;</li>
          <li>se a clonagem incluiu as partições necessárias;</li>
          <li>se existe uma entrada de boot coerente;</li>
          <li>se o firmware continua no mesmo modo usado pela instalação;</li>
          <li>se o computador está realmente tentando iniciar pelo SSD novo.</li>
        </ol>
        <p>O roteiro específico está em <a href="/blog/troquei-o-ssd-e-o-pc-so-abre-a-bios">troquei o SSD e o PC só abre a BIOS</a> e o planejamento da migração em <a href="/blog/como-clonar-hd-para-ssd">como clonar HD para SSD</a>.</p>

        <h2>7. Dispositivos USB e ordem de boot</h2>
        <p>Desconectar temporariamente pendrives, HDs externos e cartões é uma comparação simples e reversível. Alguns firmwares podem priorizar mídia removível ou alterar a sequência quando um dispositivo inicializável é conectado. Se o comportamento muda sem esses dispositivos, revise a ordem de boot em vez de formatar qualquer unidade.</p>
        <p>Não considere “pendrive conectado” uma causa automática. Ele só é relevante se o firmware realmente tentar usá-lo ou se a prioridade mudar.</p>

        <h2>8. Data, hora e configurações voltam sozinhas?</h2>
        <p>Se relógio e opções do firmware não permanecem depois de desligar completamente o equipamento, investigue o circuito de retenção/RTC e a bateria de firmware conforme o projeto do modelo. Desktops frequentemente usam bateria removível; notebooks podem usar soluções e acessos diferentes.</p>
        <p>Não troque bateria apenas porque o PC entrou uma vez no Setup. A evidência mais útil é a <strong>perda repetida de data/configurações</strong>.</p>

        <h2>9. Secure Boot e Fast Boot não são correções universais</h2>
        <p><strong>Secure Boot</strong> faz parte da cadeia de confiança do UEFI. Desabilitá-lo como primeira tentativa reduz proteção e pode não ter relação com o problema. Quando houver mídia ou carregador específico envolvido, confirme compatibilidade e assinatura antes de mudar a política.</p>
        <p><strong>Fast Boot</strong> também varia por firmware. Se há suspeita de que uma otimização de inicialização está interferindo na detecção, registre o valor atual e faça uma única comparação reversível. Não misture Fast Boot do firmware com Inicialização Rápida do Windows como se fossem o mesmo mecanismo.</p>

        <h2>10. E se o Setup abrir por tecla ou botão?</h2>
        <p>Teclas como Del, F2 ou Esc podem abrir o firmware em muitos equipamentos, mas o atalho varia. Um teclado defeituoso, tecla presa ou botão dedicado do fabricante pode influenciar a entrada no Setup. Teste sem periféricos externos desnecessários e observe o comportamento antes de desmontar armazenamento.</p>

        <h2>11. Como entrar na BIOS/UEFI a partir do Windows</h2>
        <p>Se o seu objetivo não é corrigir um PC que entra sozinho no Setup, mas <strong>abrir o firmware com o Windows funcionando</strong>, versões suportadas do Windows oferecem acesso às <strong>Configurações de Firmware UEFI</strong> pela Inicialização Avançada quando o equipamento expõe essa opção. Isso evita depender de acertar uma tecla durante os primeiros segundos da partida.</p>
        <p>Essa é uma intenção diferente do defeito tratado no restante do artigo, mas responde à dúvida sem misturar os dois cenários.</p>

        <h2>Sequência recomendada</h2>
        <ol>
          <li>Fotografe as configurações atuais e confirme a chave BitLocker quando aplicável.</li>
          <li>Remova temporariamente mídia USB desnecessária.</li>
          <li>Confirme se o SSD/HD aparece fisicamente no firmware.</li>
          <li>Se aparece, procure a entrada de boot correspondente, como Windows Boot Manager.</li>
          <li>Confirme UEFI/Legacy sem alternar por tentativa.</li>
          <li>Revise a última mudança de SSD, clonagem, firmware ou controlador.</li>
          <li>Observe se data/hora e configurações estão sendo perdidas.</li>
          <li>Se a unidade está instável, pare e preserve os dados antes de reparar o boot.</li>
        </ol>

        <h2>O que não fazer</h2>
        <ul>
          <li>Inicializar, formatar ou converter o disco apenas porque ele não aparece como opção de boot.</li>
          <li>Alternar UEFI, CSM, Secure Boot, AHCI/RAID/VMD e ordem de boot todos de uma vez.</li>
          <li>Apagar partições EFI para “recriar do zero” sem backup e identificação correta dos volumes.</li>
          <li>Atualizar BIOS em uma máquina eletricamente instável como tentativa genérica de correção.</li>
          <li>Continuar ligando repetidamente um disco que desaparece, faz ruído ou contém a única cópia dos dados.</li>
        </ul>

        <h2>Quando parar e levar para avaliação</h2>
        <p>Pare quando o disco some de forma intermitente, quando há ruído mecânico, quando o firmware trava, quando o computador desliga durante o POST, quando BitLocker está ativo sem chave disponível ou quando você não consegue identificar com segurança o disco/partições de boot. Nesses casos, preservar dados e estado do defeito é mais importante do que insistir em uma inicialização.</p>

        <h2>Perguntas frequentes</h2>
        <h3>Entrar direto na BIOS significa que o SSD queimou?</h3>
        <p>Não. Primeiro confirme se o SSD aparece no firmware. Mesmo quando aparece, entrada de boot, modo UEFI/Legacy e estrutura do carregador ainda podem impedir o Windows de iniciar.</p>

        <h3>Se o SSD aparece na BIOS, ele está saudável?</h3>
        <p>A detecção é uma evidência básica de comunicação, não um teste de saúde. Um disco com falha pode ser detectado e ainda apresentar erros ou desaparecer depois.</p>

        <h3>Devo ativar CSM para o Windows voltar a iniciar?</h3>
        <p>Não sem saber em que modo a instalação foi preparada. Alterar CSM/Legacy pode esconder uma entrada UEFI válida ou criar outro problema de boot.</p>

        <h3>Posso desativar Secure Boot para testar?</h3>
        <p>Somente quando existe uma hipótese concreta ligada ao carregador/mídia e você sabe como restaurar a configuração. Não é uma correção genérica para “entra direto na BIOS”.</p>

        <h3>Windows Boot Manager sumiu. Preciso formatar?</h3>
        <p>Não automaticamente. Primeiro confirme detecção do disco, modo de firmware e estrutura de boot. Reparar a inicialização é diferente de reinstalar ou apagar dados.</p>

        <h2>Resumo prático</h2>
        <p>Quando o computador entra direto na BIOS, siga a cadeia: <strong>disco detectado → entrada de boot → modo UEFI/Legacy → estrutura de inicialização → retenção de configurações</strong>. Faça uma mudança por vez, preserve BitLocker e dados e não transforme opções de firmware em tentativa e erro.</p>

        <EditorialReferences slug="computador-entra-direto-na-bios" />
      </>
    ),
  },

  "botao-power-nao-funciona-jump-start-placa-mae": {
    title: "Botão power não funciona: como testar o PWR_SW sem condenar fonte ou placa",
    excerpt:
      "Como separar botão, cabo e conector frontal de uma falha real de alimentação, identificar o PWR_SW pelo manual e interpretar corretamente o teste de partida pela placa-mãe.",
    date: "2026-09-29",
    readTime: "13 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Quando o botão do gabinete não produz nenhuma reação, o circuito do painel frontal é apenas uma das hipóteses. Em desktops, o botão de power normalmente aciona um par específico do header frontal da placa-mãe. Fazer um contato momentâneo <strong>nos pinos corretos e identificados pelo manual</strong> pode retirar botão e cabo da equação — mas o resultado precisa ser interpretado com cuidado.</p>

        <h2>Resposta direta: o que o teste no PWR_SW realmente prova?</h2>
        <p>Se o computador não responde ao botão, mas inicia de forma repetível quando o par <strong>Power Switch/PWR_SW</strong> correto é acionado diretamente, o circuito do botão, o cabo ou o encaixe no header passa a ser a hipótese principal. Isso <strong>não prova que toda a placa-mãe ou a fonte estejam perfeitas</strong>; apenas mostra que o pedido de partida chegou por outro caminho e foi aceito naquele teste.</p>
        <p>Se o computador também não reage ao acionamento direto, o botão deixa de ser a explicação principal e a investigação volta para alimentação, conectores ATX/EPS, fonte, placa-mãe e demais condições de partida.</p>

        <h2>Antes de abrir: “não liga” é diferente de “liga sem vídeo”</h2>
        <table>
          <thead><tr><th>Sintoma</th><th>O que significa para o diagnóstico</th></tr></thead>
          <tbody>
            <tr><td>Nenhum LED, nenhuma ventoinha, nenhuma reação</td><td>Comece por energia, fonte, conexões e circuito de acionamento.</td></tr>
            <tr><td>Ventoinhas giram, mas não há imagem</td><td>O botão já cumpriu a função de iniciar; siga para POST/vídeo, não para PWR_SW.</td></tr>
            <tr><td>Liga e desliga logo depois</td><td>Há uma tentativa de partida; botão travado é possível, mas proteção, montagem, fonte e placa também entram.</td></tr>
            <tr><td>Só funciona ao movimentar o botão/cabo</td><td>Aumenta a suspeita de mau contato mecânico ou cabo, mas confirme antes de substituir.</td></tr>
          </tbody>
        </table>
        <p>Se as ventoinhas já giram e o problema é imagem, use <a href="/problemas/computador-nao-da-imagem">computador liga mas não dá imagem</a>. O artigo atual é para o cenário em que o comando de ligar não produz a resposta esperada.</p>

        <h2>O que é o conector do painel frontal</h2>
        <p>Placas de desktop costumam reunir botão power, reset e LEDs do gabinete em um header identificado por nomes como <code>F_PANEL</code>, <code>JFP1</code> ou equivalentes. A posição e o pinout mudam conforme o fabricante e o modelo. Por isso, a serigrafia da placa ajuda, mas o <strong>manual do modelo exato</strong> é a referência principal.</p>
        <p>Manuais da MSI, por exemplo, mostram no JFP1 conexões distintas para Power Switch, Reset Switch, Power LED e HDD LED. Os LEDs têm polaridade indicada; os pares de chave correspondem ao acionamento dos botões. Esse exemplo serve para entender o conceito, não para copiar a posição dos pinos para outra placa.</p>

        <h2>1. Verifique o básico sem energizar a placa aberta</h2>
        <ol>
          <li>Desligue o computador e retire o cabo da tomada antes de mexer em conectores internos.</li>
          <li>Confirme tomada, cabo de força e chave traseira da fonte quando existir.</li>
          <li>Confira se o conector ATX principal e o conector de alimentação da CPU estão totalmente assentados.</li>
          <li>Localize no manual o header frontal e o par de <strong>Power Switch</strong>.</li>
          <li>Confira se o plugue do gabinete está exatamente nesse par, sem deslocamento lateral.</li>
        </ol>
        <p>Não remova bateria CMOS, não troque cabos modulares da fonte e não faça contato entre pinos desconhecidos como primeira tentativa.</p>

        <h2>2. Inspecione botão, cabo e conector</h2>
        <p>Procure cabo prensado, fio rompido perto do botão, conector solto, plugue deslocado e botão mecanicamente preso. Em gabinetes com pequena placa frontal, observe também conectores intermediários. Não é necessário desmontar o próprio mecanismo do botão se o teste no header já consegue isolá-lo.</p>
        <p>Um botão preso pode manter o sinal de power acionado por mais tempo que o esperado e alterar o comportamento da máquina. Se a haste não retorna normalmente, desconecte o plugue do PWR_SW antes de continuar o diagnóstico.</p>

        <h2>3. Como fazer o teste de acionamento direto com segurança</h2>
        <p>Esse teste é apropriado apenas para um <strong>desktop</strong> em que você identificou com certeza o par Power Switch pelo manual. Fabricantes como a MSI usam o mesmo princípio em seus próprios roteiros de diagnóstico: retirar o cabo frontal e acionar momentaneamente o par de power para verificar se a máquina inicia.</p>
        <ol>
          <li>Com o cabo de energia removido, identifique e fotografe a posição do conector PWR_SW.</li>
          <li>Retire somente o plugue do botão power, sem mexer nos demais headers.</li>
          <li>Confirme mais uma vez no manual quais são exatamente os dois pinos de Power Switch.</li>
          <li>Reconecte o cabo de força e coloque a fonte em condição normal de uso.</li>
          <li>Com uma ferramenta de cabo isolado, faça <strong>contato momentâneo apenas entre os dois pinos identificados</strong> e afaste imediatamente.</li>
          <li>Observe a resposta sem tocar em outros pontos da placa.</li>
        </ol>
        <aside className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 not-prose my-6">
          <p className="m-0 text-sm"><strong>Segurança:</strong> não faça esse teste se você não consegue identificar o par correto. Não deslize ferramenta sobre outros pinos, não toque em áreas energizadas da placa e nunca abra a fonte de alimentação. Notebook, all-in-one e equipamentos com placa de botão própria não devem ser tratados como um desktop com header frontal.</p>
        </aside>

        <h2>Como interpretar o resultado</h2>
        <table>
          <thead><tr><th>Resultado</th><th>Leitura correta</th><th>Próximo passo</th></tr></thead>
          <tbody>
            <tr><td>Liga pelo PWR_SW direto e não liga pelo botão</td><td>Botão, cabo ou conexão frontal ficam fortemente implicados.</td><td>Inspecione continuidade/encaixe ou substitua o conjunto frontal compatível.</td></tr>
            <tr><td>Liga por ambos depois de reencaixar</td><td>Pode ter havido mau contato no conector.</td><td>Valide várias partidas; não conclua defeito de peça por um evento isolado.</td></tr>
            <tr><td>Não reage nem pelo PWR_SW direto</td><td>O teste não encontrou um atalho para o botão.</td><td>Volte para alimentação, ATX/EPS, fonte, montagem e placa-mãe.</td></tr>
            <tr><td>Energiza, mas não conclui POST</td><td>O comando de power foi aceito; o defeito está em outra etapa.</td><td>Siga memória, vídeo, CPU, firmware e placa.</td></tr>
            <tr><td>Liga e desliga rapidamente</td><td>Há tentativa de partida, mas o sintoma não aponta uma causa única.</td><td>Separe fonte, montagem, periféricos e placa em configuração mínima.</td></tr>
          </tbody>
        </table>

        <h2>Se ligou pelo header, o que ainda pode estar errado?</h2>
        <p>O teste confirma que a placa respondeu ao acionamento direto naquela condição. Ele não valida estabilidade da fonte sob carga, todas as linhas de alimentação, memória, CPU, vídeo ou demais circuitos da placa. Se a máquina parte e depois reinicia, trava ou não dá vídeo, siga o sintoma novo em vez de considerar o computador “aprovado”.</p>
        <p>Para alimentação, use <a href="/blog/como-testar-fonte-de-alimentacao-pc">como testar a fonte do PC com critérios seguros</a>. Para placa, veja <a href="/blog/como-diagnosticar-placa-mae-defeituosa">como diagnosticar placa-mãe sem trocar peça por tentativa</a>.</p>

        <h2>Se não ligou pelo header, o botão está descartado?</h2>
        <p>O botão deixa de ser a explicação suficiente para o sintoma, mas o teste ainda depende de os pinos estarem corretos e de a placa receber alimentação adequada. Confirme ATX principal, alimentação da CPU e a própria fonte antes de concluir placa-mãe.</p>
        <p>Se existe LED de standby, ele mostra que algum circuito de espera está alimentado; não é certificação da fonte inteira. Se não existe LED no modelo, a ausência de luz também não é evidência por si só.</p>

        <h2>Reset switch pode ser usado para testar?</h2>
        <p>Em muitos gabinetes de desktop, power e reset são chaves momentâneas do mesmo tipo e um técnico pode usar o botão reset como comparação temporária, conectando-o ao par PWR_SW correto. Faça isso apenas quando o manual/pinout estiver claro e como teste reversível, não como modificação permanente improvisada.</p>

        <h2>Notebook e all-in-one são outro diagnóstico</h2>
        <p>Notebooks podem usar botão soldado, placa auxiliar, flat cable, teclado ou circuito dedicado de power. Não procure um “JFP1” genérico nem tente curto em pads desconhecidos. Para esse cenário, use <a href="/blog/notebook-nao-liga-o-que-fazer">notebook não liga: como separar alimentação, bateria e placa</a>.</p>

        <h2>Quando parar</h2>
        <ul>
          <li>Você não encontra o manual ou não consegue identificar com certeza o par Power Switch.</li>
          <li>Há cheiro de queimado, plástico derretido, corrosão ou líquido.</li>
          <li>O equipamento desliga repetidamente por proteção.</li>
          <li>O conector ATX/EPS apresenta aquecimento ou dano visível.</li>
          <li>O PC está em garantia e a abertura pode afetar o atendimento do fabricante.</li>
          <li>O teste exigiria tocar em pads, trilhas ou pontos não documentados.</li>
        </ul>

        <h2>Perguntas frequentes</h2>
        <h3>Se o PC liga ao encostar nos pinos, a placa-mãe está boa?</h3>
        <p>Isso mostra que a placa aceitou o comando de partida naquele teste. É uma evidência útil contra o circuito do botão, mas não valida todas as funções da placa.</p>

        <h3>O Power Switch tem lado positivo e negativo?</h3>
        <p>Nos headers de desktop em que o fabricante documenta o par como chave momentânea, o conector do switch não depende da polaridade como os LEDs. Sempre siga o manual do modelo, porque a posição dos pinos muda.</p>

        <h3>Posso encostar qualquer dois pinos do F_PANEL para testar?</h3>
        <p>Não. Identifique exatamente o par Power Switch. O mesmo header pode conter LEDs, reset e pinos reservados.</p>

        <h3>Se não liga pelo botão nem pelos pinos, é a fonte?</h3>
        <p>Não necessariamente. Fonte é uma hipótese importante, mas alimentação da CPU, conectores, montagem e placa-mãe também podem impedir a partida.</p>

        <h3>Posso fazer esse teste em notebook?</h3>
        <p>Não como regra. A arquitetura do botão em notebook varia muito e frequentemente não usa um header frontal de desktop acessível. Use documentação específica do modelo ou diagnóstico de bancada.</p>

        <h2>Resumo prático</h2>
        <p>O acionamento direto do PWR_SW serve para <strong>isolar o botão e o cabo frontal</strong>. Identifique o par pelo manual, mude uma variável por vez e interprete a resposta sem extrapolar: ligar pelo header aponta para o circuito do botão; não ligar mantém abertas as hipóteses de alimentação e placa. O teste é diagnóstico, não atalho para concluir que o restante do computador está saudável.</p>

        <EditorialReferences slug="botao-power-nao-funciona-jump-start-placa-mae" />
      </>
    ),
  },

  "codigos-de-erro-tela-azul-windows": {
    title: "Códigos da tela azul do Windows: como interpretar stop codes sem adivinhar a causa",
    excerpt:
      "Aprenda o que um stop code realmente indica, como usar contexto, parâmetros e arquivos de despejo e por que MEMORY_MANAGEMENT, WHEA e outros códigos não condenam uma peça sozinhos.",
    date: "2026-09-29",
    readTime: "15 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">O código da tela azul é uma pista estruturada sobre o ponto em que o Windows decidiu interromper o sistema, não um laudo automático da peça culpada. O mesmo stop code pode aparecer por caminhos diferentes, e um driver citado no travamento pode estar apenas envolvido na pilha naquele momento. O diagnóstico melhora quando você combina <strong>código exato, contexto, mudanças recentes, parâmetros e arquivo de despejo</strong>.</p>

        <h2>Resposta direta: o que fazer quando aparece um código de tela azul?</h2>
        <ol>
          <li>Anote ou fotografe o <strong>stop code</strong> e qualquer código hexadecimal exibido.</li>
          <li>Registre o que estava acontecendo: inicialização, jogo, cópia de arquivos, suspensão, atualização, periférico novo ou troca de hardware.</li>
          <li>Se o erro se repetir, compare o padrão em vez de concluir pela primeira tela.</li>
          <li>Verifique se o Windows gerou um arquivo de despejo e consulte os eventos do mesmo horário.</li>
          <li>Use o código para escolher a próxima hipótese a testar — não para comprar uma peça.</li>
        </ol>
        <p>A referência oficial da Microsoft lista os bug checks e seus parâmetros. Para casos recorrentes ou ambíguos, um dump analisado com WinDbg fornece muito mais contexto do que apenas o texto mostrado na tela.</p>

        <h2>O stop code informa uma classe de falha, não a causa final</h2>
        <p>Uma verificação de bug acontece quando o Windows encontra uma condição grave o suficiente para interromper a execução. O código identifica o tipo dessa condição. Os quatro parâmetros associados ao bug check podem acrescentar detalhes específicos, e o dump registra parte do estado do sistema no instante da falha.</p>
        <p>Isso muda a forma de ler a tela azul: <strong>MEMORY_MANAGEMENT</strong> não significa automaticamente “RAM defeituosa”; <strong>IRQL_NOT_LESS_OR_EQUAL</strong> não significa automaticamente “driver X”; <strong>WHEA_UNCORRECTABLE_ERROR</strong> não significa automaticamente “processador queimado”. Cada um reduz o espaço de investigação, mas ainda precisa de evidência complementar.</p>

        <h2>Como interpretar os códigos mais conhecidos</h2>
        <table>
          <thead>
            <tr><th>Stop code</th><th>O que ele sinaliza</th><th>O que ainda precisa ser separado</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>MEMORY_MANAGEMENT</code></td>
              <td>O gerenciador de memória detectou uma inconsistência grave.</td>
              <td>RAM, controlador de memória, configuração/overclock, driver e corrupção de dados ainda são hipóteses.</td>
            </tr>
            <tr>
              <td><code>IRQL_NOT_LESS_OR_EQUAL</code></td>
              <td>Código de kernel relacionado a acesso inválido em determinado nível de prioridade.</td>
              <td>Driver é uma hipótese importante, mas parâmetros, pilha e mudanças recentes precisam ser analisados.</td>
            </tr>
            <tr>
              <td><code>PAGE_FAULT_IN_NONPAGED_AREA</code></td>
              <td>O kernel tentou acessar uma região que deveria estar disponível e encontrou uma condição inválida.</td>
              <td>Memória física, driver, arquivo/sistema corrompido e outros caminhos de kernel podem participar.</td>
            </tr>
            <tr>
              <td><code>CRITICAL_PROCESS_DIED</code></td>
              <td>Um componente essencial do Windows encerrou em condição que o sistema não conseguiu tolerar.</td>
              <td>Integridade do sistema, armazenamento, atualização e drivers devem ser investigados pelo contexto.</td>
            </tr>
            <tr>
              <td><code>DPC_WATCHDOG_VIOLATION</code></td>
              <td>O mecanismo watchdog detectou execução que excedeu o comportamento esperado em contexto de kernel.</td>
              <td>Drivers, armazenamento, firmware e outros componentes de kernel entram na análise; o código sozinho não identifica qual.</td>
            </tr>
            <tr>
              <td><code>SYSTEM_SERVICE_EXCEPTION</code> / <code>KMODE_EXCEPTION_NOT_HANDLED</code></td>
              <td>Uma exceção ocorreu em caminho de sistema/kernel.</td>
              <td>O dump e a pilha ajudam a separar driver, corrupção e outras condições do sistema.</td>
            </tr>
            <tr>
              <td><code>INACCESSIBLE_BOOT_DEVICE</code></td>
              <td>O Windows perdeu acesso ao dispositivo necessário para continuar o boot.</td>
              <td>Detecção do disco, controlador, modo de armazenamento, boot e alterações recentes precisam ser conferidos.</td>
            </tr>
            <tr>
              <td><code>WHEA_UNCORRECTABLE_ERROR</code></td>
              <td>O Windows recebeu um erro de hardware não corrigido pela infraestrutura WHEA.</td>
              <td>Processador, cache, memória, barramento, PCIe, energia e outros componentes podem estar envolvidos; o registro WHEA é mais útil que o nome isolado.</td>
            </tr>
          </tbody>
        </table>

        <h2>Um arquivo .sys citado não é automaticamente o culpado</h2>
        <p>O nome de um módulo pode ser extremamente útil, mas precisa ser lido no contexto da pilha e dos parâmetros do bug check. Um driver pode ter causado o acesso inválido; também pode ter recebido dados já corrompidos por outra origem ou simplesmente estar executando quando o erro ficou visível.</p>
        <p>Por isso, evite pesquisar apenas o nome do arquivo e remover drivers ao acaso. Primeiro confirme se o mesmo módulo reaparece em dumps diferentes, se houve atualização recente e se existe versão oficial adequada ao equipamento.</p>

        <h2>Código repetido versus códigos diferentes: use como padrão, não como regra</h2>
        <p>Repetir o mesmo stop code sob a mesma condição aumenta o valor daquele padrão, mas não prova uma causa única. Da mesma forma, códigos diferentes não provam automaticamente RAM, fonte ou temperatura. Corrupção de memória, instabilidade de hardware e drivers podem produzir sintomas variados, mas a conclusão exige teste controlado.</p>
        <p>O melhor registro inclui: horário, stop code, atividade em andamento, mudanças recentes, temperatura quando relevante, periféricos conectados e se o travamento ocorreu antes ou depois do Windows carregar completamente.</p>

        <h2>Onde encontrar evidência depois que a tela desaparece</h2>
        <p>O Windows pode registrar os parâmetros do bug check no log do sistema. No <strong>Visualizador de Eventos</strong>, procure eventos próximos do horário exato do travamento e compare com o código registrado. O evento ajuda a confirmar o que aconteceu, mas eventos genéricos de “desligamento inesperado” não substituem o bug check nem identificam a causa.</p>
        <p>Quando a configuração de despejo está habilitada e o sistema consegue gravá-lo, arquivos de memória podem conter o código, parâmetros, pilha e módulos carregados. Pequenos despejos são normalmente mantidos em <code>%SystemRoot%\Minidump</code>. A ausência de um arquivo nessa pasta não prova que não houve tela azul: configuração, espaço, falha de gravação ou tipo de dump podem alterar o resultado.</p>

        <h2>Como um dump melhora o diagnóstico</h2>
        <p>A documentação de depuração da Microsoft recomenda começar a análise de dumps de kernel com ferramentas como <strong>WinDbg</strong> e a extensão <code>!analyze</code>. O objetivo não é transformar qualquer usuário em depurador de kernel, mas mostrar por que um arquivo de despejo vale mais que uma lista de “causas comuns”: ele preserva dados do estado real do sistema na falha.</p>
        <p>Em suporte técnico, o dump é especialmente útil quando o erro é recorrente, quando um driver específico reaparece ou quando o código é amplo demais para apontar a próxima ação sozinho.</p>

        <h2>WHEA_UNCORRECTABLE_ERROR: hardware sim, peça específica não</h2>
        <p>A WHEA é a arquitetura do Windows para receber e registrar erros de hardware reportados pela plataforma. Ela pode lidar com diferentes fontes, incluindo processador, cache, memória, barramentos e dispositivos de E/S. Portanto, <code>WHEA_UNCORRECTABLE_ERROR</code> merece investigação de hardware e estabilidade, mas não autoriza substituir CPU ou placa-mãe sem ler a evidência.</p>
        <p>Procure eventos WHEA no log do sistema, reverta overclock/undervolt experimental, valide temperatura e energia e compare componentes quando houver método seguro. Se a máquina apresenta desligamentos, cheiro de queimado ou instabilidade elétrica, pare antes de insistir em carga.</p>

        <h2>MEMORY_MANAGEMENT e erros parecidos: teste antes de comprar RAM</h2>
        <p>Quando os sintomas envolvem memória, comece por uma linha de base estável e teste controlado. Um teste com erro precisa ser isolado entre módulo, slot e plataforma; um teste sem erros reduz a suspeita nas condições testadas, mas não garante ausência de falha intermitente.</p>
        <p>O roteiro completo está em <a href="/blog/testar-memoria-ram-memtest86">como testar memória RAM com Memtest86+</a>. Ele evita transformar o stop code em compra automática de memória.</p>

        <h2>INACCESSIBLE_BOOT_DEVICE pede outra trilha</h2>
        <p>Se a tela azul apareceu após clonagem, troca de SSD, alteração de controlador ou mudança de firmware, preserve o estado atual e separe <strong>detecção do disco</strong> de <strong>estrutura de boot</strong>. Não altere AHCI/RAID/VMD, UEFI/Legacy ou partições em sequência apenas para tentar voltar ao Windows.</p>
        <p>Para falha de inicialização, veja <a href="/blog/erro-no-bootable-device-como-resolver">No Bootable Device: como diagnosticar</a> e <a href="/blog/boot-uefi-ou-legacy-como-identificar">UEFI ou Legacy: como identificar o boot mode</a>.</p>

        <h2>Sequência prática para investigar sem piorar o problema</h2>
        <ol>
          <li><strong>Registre o erro.</strong> Código, horário e contexto antes de reiniciar a investigação.</li>
          <li><strong>Proteja dados importantes.</strong> Se há sinais de disco instável, backup vem antes de testes pesados.</li>
          <li><strong>Revise a última mudança.</strong> Driver, atualização, RAM, SSD, GPU, periférico, BIOS ou software de baixo nível.</li>
          <li><strong>Volte para configuração estável.</strong> Remova overclock/undervolt e perfis experimentais quando fizer sentido.</li>
          <li><strong>Use o stop code para escolher o teste.</strong> Memória, armazenamento, driver, temperatura ou hardware devem ser avaliados por evidência, não todos de uma vez.</li>
          <li><strong>Compare os dumps.</strong> Recorrência de parâmetros/módulos é mais informativa que uma única tela.</li>
          <li><strong>Mude uma variável por vez.</strong> Assim você sabe o que realmente alterou o comportamento.</li>
        </ol>

        <h2>O que evitar</h2>
        <ul>
          <li>Reinstalar o Windows como primeira reação sem preservar dados ou identificar o padrão.</li>
          <li>Baixar “corretores de tela azul” e pacotes de driver de origem desconhecida.</li>
          <li>Apagar dumps e logs antes de registrar o problema.</li>
          <li>Trocar RAM, SSD, fonte e placa em sequência sem teste controlado.</li>
          <li>Tratar qualquer módulo citado pelo debugger como culpado confirmado.</li>
          <li>Continuar submetendo o computador a carga quando há cheiro, superaquecimento severo ou falha elétrica.</li>
        </ul>

        <h2>Quando parar e procurar diagnóstico técnico</h2>
        <p>Pare quando os travamentos impedem backup, quando o disco apresenta ruído ou desaparece, quando há WHEA recorrente junto de instabilidade física, quando a máquina reinicia antes de gerar evidência ou quando a análise exige comparação de hardware e instrumentação que você não possui. Nesses casos, preservar os dados e o estado do defeito vale mais do que acumular novas tentativas.</p>
        <p>Para uma triagem mais ampla, use <a href="/blog/como-resolver-tela-azul-windows">como resolver tela azul no Windows</a>. O fluxo presencial está em <a href="/diagnostico-tecnico">diagnóstico técnico</a>.</p>

        <h2>Perguntas frequentes</h2>
        <h3>MEMORY_MANAGEMENT significa memória RAM com defeito?</h3>
        <p>Não necessariamente. O código aponta para uma inconsistência no gerenciamento de memória. RAM é uma hipótese relevante, mas controlador, configuração e software de kernel também precisam ser separados.</p>

        <h3>Se aparece o nome de um driver .sys, posso removê-lo?</h3>
        <p>Não como regra. O módulo é uma pista. Confirme recorrência, versão, origem e contexto antes de atualizar, reverter ou remover um driver.</p>

        <h3>WHEA_UNCORRECTABLE_ERROR quer dizer processador defeituoso?</h3>
        <p>Não. WHEA registra erros de hardware de diferentes fontes. A análise precisa do registro, do contexto e de testes de estabilidade para estreitar a origem.</p>

        <h3>Onde ficam os arquivos de minidump?</h3>
        <p>Quando o Windows está configurado para gerar pequenos despejos e consegue gravá-los, eles são mantidos em <code>%SystemRoot%\Minidump</code>. Outros tipos de dump podem usar outro arquivo/local.</p>

        <h3>Uma tela azul isolada exige formatar o computador?</h3>
        <p>Não. Primeiro registre o evento, observe se existe recorrência e investigue mudanças recentes. Reinstalação é uma decisão posterior quando as evidências apontam para corrupção de sistema que não foi resolvida por métodos menos destrutivos.</p>

        <h2>Resumo prático</h2>
        <p>Stop code é ponto de partida, não veredito. Registre o código e o contexto, preserve dumps e logs, use os parâmetros e a recorrência para escolher o próximo teste e não condene driver ou hardware por uma única tela. Quanto mais reproduzível e documentada a falha, menor a chance de trocar a peça errada.</p>

        <EditorialReferences slug="codigos-de-erro-tela-azul-windows" />
      </>
    ),
  },

  "como-instalar-segundo-ssd-notebook": {
    title: "Como instalar um segundo SSD no notebook: compatibilidade, montagem e configuração",
    excerpt:
      "Como confirmar slot, interface e formato antes da compra, instalar um segundo SSD com segurança e fazê-lo aparecer no Windows sem apagar o disco errado.",
    date: "2026-09-29",
    readTime: "14 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Adicionar um segundo SSD ao notebook pode aumentar o espaço sem mexer no sistema atual, mas a parte mais importante acontece antes da compra: confirmar se o equipamento realmente possui um segundo caminho de armazenamento e qual padrão ele aceita. M.2 é apenas o formato físico; o slot pode aceitar SATA, PCIe/NVMe ou uma combinação específica definida pelo fabricante.</p>

        <h2>Resposta direta: dá para colocar dois SSDs no notebook?</h2>
        <p>Depende do projeto do modelo exato. Alguns notebooks têm um slot M.2 e um compartimento SATA de 2,5 polegadas; outros têm dois slots M.2; outros oferecem apenas uma posição de armazenamento. Antes de comprar, consulte o manual de serviço ou a especificação oficial do equipamento e confirme <strong>quantidade de slots, interface suportada, comprimento do módulo e limitações de compartilhamento</strong>.</p>
        <p>Não use apenas a aparência do conector como prova. A documentação do NVM Express e de fabricantes de SSD reforça que <strong>M.2 descreve o formato</strong>, não garante que qualquer M.2 seja NVMe nem que todo módulo M.2 funcione naquele slot.</p>

        <h2>1. Descubra que tipo de expansão o seu notebook oferece</h2>
        <table>
          <thead><tr><th>Possibilidade</th><th>O que conferir</th><th>Erro comum</th></tr></thead>
          <tbody>
            <tr><td>Segundo slot M.2</td><td>Protocolo SATA ou PCIe/NVMe, chaveamento, tamanho físico e geração suportada</td><td>Comprar NVMe para slot M.2 que aceita apenas SATA, ou o inverso.</td></tr>
            <tr><td>Baia SATA de 2,5"</td><td>Espessura disponível, cabo/flex e suporte físico do modelo</td><td>Assumir que a baia vazia já inclui cabo e caddy.</td></tr>
            <tr><td>Substituição do leitor óptico por caddy</td><td>Se o modelo possui unidade óptica removível e qual interface ela usa</td><td>Tratar essa solução como universal; muitos notebooks atuais nem possuem essa baia.</td></tr>
            <tr><td>Apenas um slot</td><td>Capacidade máxima e compatibilidade do SSD maior</td><td>Comprar um segundo SSD sem existir conexão física para ele.</td></tr>
          </tbody>
        </table>

        <h2>2. M.2, SATA e NVMe não são sinônimos</h2>
        <p>Um SSD M.2 pode usar interfaces diferentes. NVMe é um protocolo associado a armazenamento sobre PCI Express; M.2 é o formato do módulo. Por isso, dois SSDs com o mesmo tamanho externo podem não ser intercambiáveis no mesmo notebook.</p>
        <p>Além da interface, confira o comprimento físico indicado pelo fabricante. O número do formato, como 2230, 2242 ou 2280, representa dimensões do módulo; o notebook precisa ter espaço e ponto de fixação compatíveis.</p>

        <h2>3. Antes de abrir: preserve energia, dados e garantia</h2>
        <ul>
          <li>Desligue completamente o notebook e retire o carregador.</li>
          <li>Se a bateria interna tiver procedimento de desconexão previsto no manual, siga esse procedimento antes de tocar no armazenamento.</li>
          <li>Não force a tampa, travas ou parafusos que não correspondem ao modelo.</li>
          <li>Se o equipamento está em garantia ou possui lacres/regras de serviço, confirme o procedimento autorizado antes de abrir.</li>
          <li>Tenha backup dos dados importantes do SSD principal antes de qualquer intervenção física.</li>
        </ul>
        <p>O objetivo é adicionar armazenamento sem transformar uma expansão simples em perda de dados ou dano mecânico.</p>

        <h2>4. Instalação física: uma variável por vez</h2>
        <p>Para um SSD M.2, alinhe o conector sem forçar, insira o módulo no ângulo previsto pelo projeto e fixe-o no ponto correto. Para uma unidade SATA de 2,5 polegadas, use o cabo e suporte próprios do modelo. Não improvise isolamento, parafuso ou pressão sobre a carcaça.</p>
        <p>Depois da montagem, feche o equipamento o suficiente para um teste seguro e ligue uma vez. Antes de alterar partições, confirme se o firmware ou o sistema operacional detecta a nova unidade.</p>

        <h2>5. Se o SSD aparece no firmware, mas não no Explorador de Arquivos</h2>
        <p>Isso pode ser normal em um SSD novo. O Windows pode enxergar o dispositivo fisicamente sem ainda existir um volume utilizável. Abra o <strong>Gerenciamento de Disco</strong> e identifique a unidade pela capacidade e pelo modelo, sem se basear apenas em “Disco 0” ou “Disco 1”.</p>
        <p>A documentação da Microsoft orienta que um disco novo pode precisar ser colocado online e inicializado antes da criação de um volume. O ponto crítico é confirmar que você selecionou o <strong>SSD novo</strong>, não o disco que já contém o Windows.</p>
        <ol>
          <li>Compare capacidade e modelo do novo SSD.</li>
          <li>Se ele estiver offline, coloque-o online apenas depois de confirmar a identidade.</li>
          <li>Inicialize o disco quando necessário.</li>
          <li>Crie um volume no espaço não alocado e escolha a letra desejada.</li>
          <li>Formate apenas a nova unidade vazia — nunca use formatação como “teste” em um disco com dados.</li>
        </ol>

        <h2>6. GPT ou MBR para o segundo SSD?</h2>
        <p>Em máquinas modernas, GPT costuma ser a escolha adequada para um disco novo, mas o ponto principal é separar <strong>disco de dados</strong> de <strong>disco de boot</strong>. Um segundo SSD usado apenas para arquivos e programas não precisa reproduzir a estrutura de boot do SSD principal.</p>
        <p>Não converta o disco antigo nem altere UEFI/Legacy apenas porque adicionou um segundo SSD. Se a dúvida for sobre o modo de inicialização, consulte <a href="/blog/boot-uefi-ou-legacy-como-identificar">UEFI ou Legacy: como identificar o boot mode</a>.</p>

        <h2>7. Segundo SSD para arquivos ou para migrar o Windows?</h2>
        <table>
          <thead><tr><th>Objetivo</th><th>Caminho</th><th>Principal cuidado</th></tr></thead>
          <tbody>
            <tr><td>Aumentar espaço</td><td>Manter Windows no SSD atual e usar o novo como dados</td><td>Configurar pastas e bibliotecas sem apagar o disco do sistema.</td></tr>
            <tr><td>Migrar para SSD maior/mais rápido</td><td>Clonar ou reinstalar conforme o estado do sistema</td><td>Validar boot no novo SSD antes de apagar a origem.</td></tr>
            <tr><td>Separar sistema e arquivos</td><td>Windows em um SSD, dados em outro</td><td>Definir onde documentos, downloads e projetos serão salvos.</td></tr>
            <tr><td>Dual boot</td><td>Cada sistema pode usar sua própria unidade</td><td>Planejar boot e criptografia; não improvisar ordem de firmware.</td></tr>
          </tbody>
        </table>
        <p>Se a intenção é migrar o sistema, use <a href="/blog/como-clonar-hd-para-ssd">como clonar HD para SSD</a>. Esse processo é diferente de simplesmente adicionar um segundo disco de dados.</p>

        <h2>8. O SSD novo não aparece nem na BIOS/UEFI</h2>
        <p>Nesse cenário, o Windows ainda não é o problema. Revise compatibilidade do slot, protocolo, encaixe e eventuais regras do fabricante para compartilhamento de interfaces. Alguns projetos desabilitam uma porta ou reduzem opções quando determinados slots são usados; isso precisa ser confirmado no manual do equipamento, não presumido.</p>
        <p>Se a unidade não aparece de forma consistente no firmware, não inicialize, não formate e não comece a trocar configurações do Windows. Veja também <a href="/blog/hd-nao-e-reconhecido-na-bios-o-que-fazer">HD ou SSD não reconhecido na BIOS</a>.</p>

        <h2>9. O SSD aparece no Windows, mas some depois</h2>
        <p>Detecção intermitente pede investigação antes de gravar dados importantes. Reencaixe só com o equipamento desligado, confirme fixação e compatibilidade e observe se o comportamento muda com temperatura ou movimento. Uma unidade que some repetidamente não deve virar destino único de arquivos importantes.</p>

        <h2>10. BitLocker e mudança de armazenamento</h2>
        <p>Adicionar um disco de dados normalmente não exige mexer no SSD de sistema. Mesmo assim, antes de mudanças de hardware ou firmware relevantes, confirme a chave de recuperação do BitLocker se o dispositivo usa criptografia. Isso evita ficar sem acesso ao sistema caso o Windows solicite recuperação depois de uma alteração maior.</p>

        <h2>11. Depois da instalação: valide antes de confiar</h2>
        <ul>
          <li>Confirme que os dois SSDs aparecem de forma estável após reiniciar.</li>
          <li>Verifique qual unidade contém o Windows e não altere a ordem de boot sem necessidade.</li>
          <li>Copie alguns arquivos de teste para o novo SSD e abra-os novamente.</li>
          <li>Confira capacidade disponível e sistema de arquivos.</li>
          <li>Se o novo SSD será usado para dados importantes, mantenha backup independente; segundo SSD não é backup por si só.</li>
        </ul>

        <h2>Quando parar</h2>
        <p>Interrompa a instalação se o manual não confirma compatibilidade, se o conector exige força, se falta cabo/suporte próprio, se a bateria não pode ser isolada com segurança, se o SSD some do firmware ou se você não consegue distinguir o disco novo do disco que contém o Windows. Nessas situações, preservar o estado atual é melhor do que testar formatação, conversão ou firmware por tentativa.</p>

        <h2>Perguntas frequentes</h2>
        <h3>Todo notebook aceita dois SSDs?</h3>
        <p>Não. A quantidade e o tipo de conexões dependem do modelo. Confirme a especificação ou o manual de serviço antes da compra.</p>

        <h3>Posso ter um SSD SATA e um NVMe no mesmo notebook?</h3>
        <p>Pode ser possível quando o equipamento oferece interfaces separadas compatíveis, por exemplo um slot M.2 PCIe/NVMe e uma baia SATA. Isso não é uma regra universal.</p>

        <h3>O segundo SSD precisa ter Windows?</h3>
        <p>Não. Se ele será usado apenas para dados ou programas, pode funcionar como volume secundário enquanto o Windows continua no SSD principal.</p>

        <h3>O SSD novo apareceu na BIOS, mas não em “Este Computador”. Está com defeito?</h3>
        <p>Não necessariamente. Um SSD novo pode precisar ser inicializado e receber um volume no Gerenciamento de Disco antes de aparecer no Explorador de Arquivos.</p>

        <h3>Posso formatar o disco que aparece como não inicializado?</h3>
        <p>Somente depois de confirmar que é realmente o SSD novo e vazio. Se houver qualquer possibilidade de ser um disco com dados, pare antes de inicializar ou formatar.</p>

        <h2>Resumo prático</h2>
        <p>Para instalar um segundo SSD no notebook, confirme primeiro <strong>se existe um segundo caminho de armazenamento e qual padrão ele aceita</strong>. Depois faça a montagem sem forçar conectores, confirme a detecção no firmware, identifique corretamente o novo disco no Windows e só então inicialize/crie volume. Não altere boot, UEFI/Legacy ou o SSD principal sem um objetivo específico.</p>

        <EditorialReferences slug="como-instalar-segundo-ssd-notebook" />
      </>
    ),
  },

  "como-diagnosticar-placa-mae-defeituosa": {
    title: "Placa-mãe com defeito: como diagnosticar sem trocar peça por tentativa",
    excerpt:
      "Separe alimentação, POST, memória, vídeo, firmware e defeito físico antes de condenar a placa-mãe. Veja testes controlados, limites e critérios para parar.",
    date: "2026-09-29",
    readTime: "15 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Placa-mãe raramente deve ser o primeiro diagnóstico. O mesmo sintoma — não ligar, reiniciar, ficar sem vídeo ou travar no POST — pode nascer na fonte, memória, processador, placa de vídeo, periférico, montagem, firmware ou na própria placa. O diagnóstico mais confiável reduz variáveis, registra o que muda e só aumenta a suspeita da placa quando alternativas compatíveis foram eliminadas de forma controlada.</p>

        <h2>Resposta direta: quando a placa-mãe vira suspeita forte?</h2>
        <p>A suspeita fica forte quando o defeito permanece reproduzível em uma configuração mínima, com alimentação e memória verificadas por comparação controlada, compatibilidade confirmada e sem periféricos desnecessários; ou quando existe evidência física direta, como carbonização, corrosão, trilha rompida, conector danificado ou pinos do soquete deformados.</p>
        <p>Mesmo assim, “liga mas não dá vídeo” ou “reinicia sozinho” não são provas de placa-mãe. Eles apenas mostram em qual etapa o computador parou. O trabalho é descobrir se a falha ocorre antes da alimentação estabilizar, durante o POST, na inicialização de vídeo/memória ou depois que o firmware já entregou o controle ao sistema.</p>

        <h2>Mapa rápido: sintoma não é diagnóstico</h2>
        <table>
          <thead>
            <tr><th>O que acontece</th><th>Hipóteses que ainda precisam ser separadas</th><th>Próxima comparação útil</th></tr>
          </thead>
          <tbody>
            <tr><td>Nenhum sinal de energia</td><td>Tomada, cabo, fonte, botão/painel frontal, curto de montagem, placa</td><td>Confirmar alimentação e acionamento antes de memória ou sistema.</td></tr>
            <tr><td>Ventoinhas giram, sem vídeo</td><td>POST, memória, CPU, GPU, monitor/cabo, firmware, placa</td><td>Separar “sem imagem” de “não conclui POST”.</td></tr>
            <tr><td>Liga e desliga rapidamente</td><td>Proteção da fonte, curto, alimentação de CPU, montagem, placa</td><td>Reduzir a configuração e revisar conexões sem insistir em ciclos repetidos.</td></tr>
            <tr><td>Falha só em uma porta ou slot</td><td>Periférico, cabo, compatibilidade, slot, controlador, placa</td><td>Comparar com componente conhecido como funcional e outra interface compatível.</td></tr>
            <tr><td>Trava ou reinicia sob carga</td><td>Fonte, temperatura, memória, CPU, GPU, placa</td><td>Reproduzir uma variável por vez e registrar temperatura/alimentação.</td></tr>
          </tbody>
        </table>

        <h2>1. Comece com inspeção desligada e sem energia</h2>
        <p>Retire o cabo de força antes de tocar em componentes internos. Use boa iluminação e procure sinais que mudam a prioridade do diagnóstico:</p>
        <ul>
          <li><strong>Carbonização ou cheiro de queimado:</strong> interrompa novas tentativas até localizar a área afetada.</li>
          <li><strong>Corrosão ou resíduo de líquido:</strong> a extensão pode ir além do ponto visível; limpeza superficial não comprova recuperação.</li>
          <li><strong>Pinos tortos no soquete:</strong> podem afetar memória, PCIe, vídeo ou inicialização e não devem ser “endireitados por tentativa”.</li>
          <li><strong>Conectores ATX/EPS danificados:</strong> escurecimento, plástico deformado ou folga mudam a investigação para alimentação e contato.</li>
          <li><strong>Parafuso, espaçador ou objeto metálico fora de posição:</strong> pode criar contato indevido com o gabinete.</li>
        </ul>
        <p>Poeira e pasta térmica envelhecida merecem correção quando afetam refrigeração, mas não devem ser tratadas como prova de defeito eletrônico da placa.</p>

        <h2>2. Separe alimentação de placa antes de culpar a placa</h2>
        <p>Uma fonte pode acionar ventoinhas e ainda assim não manter as saídas dentro das condições exigidas sob carga. O guia ATX define faixas de regulação e proteções, portanto uma observação isolada em repouso não basta para declarar a fonte saudável. Quando houver suspeita de alimentação, use medição adequada ou uma fonte conhecida, compatível e em boas condições como comparação controlada.</p>
        <p>O procedimento e seus limites estão em <a href="/blog/como-testar-fonte-de-alimentacao-pc">como testar a fonte de alimentação do PC</a>. Se o computador desliga imediatamente, consulte também <a href="/blog/curto-circuito-placa-mae-como-identificar">como separar curto de outros desligamentos de proteção</a>. Proteção acionada não identifica sozinha qual peça originou a condição.</p>

        <h2>3. Faça uma configuração mínima — mas entenda o que ela prova</h2>
        <p>O objetivo da configuração mínima é retirar variáveis, não “provar” automaticamente que a placa está boa ou ruim. Em um desktop típico, permanecem placa-mãe, processador com refrigeração, alimentação necessária e um módulo de memória na posição indicada pelo manual. Placa de vídeo dedicada só permanece quando a plataforma não oferece outro caminho de vídeo utilizável.</p>
        <ol>
          <li>Desconecte armazenamento, USBs, placas adicionais e acessórios não essenciais.</li>
          <li>Confirme ATX principal e alimentação do processador; conectores visualmente parecidos não devem ser trocados entre si.</li>
          <li>Use um módulo de memória conhecido como funcional e o slot recomendado pelo manual para configuração com um módulo.</li>
          <li>Ligue uma vez e observe LEDs de diagnóstico, bipes, códigos de POST e comportamento das ventoinhas.</li>
          <li>Altere uma única variável por vez. Se trocar memória e fonte ao mesmo tempo, você perde a evidência de qual mudança alterou o sintoma.</li>
        </ol>
        <p>Se a máquina alcança o firmware na configuração mínima, isso mostra que o caminho básico de inicialização funcionou naquele teste. Não prova que todas as portas, slots e controladores da placa estejam saudáveis.</p>

        <h2>4. Memória: erro pode vir do módulo, slot, CPU ou placa</h2>
        <p>Teste um módulo por vez e siga a ordem de slots indicada no manual. Um módulo que falha em diferentes slots enquanto outro funciona nas mesmas condições aponta mais para o módulo. Já diferentes módulos conhecidos como bons falhando repetidamente no mesmo slot aumentam a suspeita daquele caminho, mas ainda podem existir dependências do soquete, do controlador de memória integrado ao processador ou das regras de população da plataforma.</p>
        <p>Ferramentas de teste de memória ajudam a detectar erro, mas não identificam automaticamente a peça causadora. A própria documentação do Memtest86+ ressalta que erros podem envolver memória, processador, caches ou placa-mãe. Por isso, resultado de teste deve ser combinado com isolamento físico e repetibilidade.</p>
        <p>Se precisar aprofundar essa etapa, use <a href="/blog/testar-memoria-ram-memtest86">como testar memória RAM sem confundir erro com peça culpada</a>.</p>

        <h2>5. LEDs, bipes e códigos de POST indicam estágio, não sentença</h2>
        <p>Muitas placas oferecem LEDs CPU/DRAM/VGA/BOOT, alto-falante para bipes ou visor de código. Esses recursos são úteis para descobrir <em>onde</em> a inicialização parou. O significado exato depende do fabricante, modelo e versão do firmware.</p>
        <p>Se o LED DRAM permanece aceso, por exemplo, isso orienta a investigação para treinamento de memória, módulo, slot, controlador e compatibilidade — não autoriza concluir “memória queimada” nem “placa queimada”. Consulte o manual do modelo exato e compare o comportamento depois de uma única mudança controlada.</p>

        <h2>6. Sem vídeo não significa automaticamente defeito de placa-mãe</h2>
        <p>Antes de atribuir ausência de imagem à placa, confirme onde o monitor está conectado, se o processador realmente possui vídeo integrado, se existe placa de vídeo dedicada e se o sistema aparenta completar o POST. Um computador que inicializa, responde ao teclado ou chega ao sistema sem imagem segue um caminho diferente de uma máquina que nunca conclui POST.</p>
        <p>O roteiro específico está em <a href="/problemas/computador-nao-da-imagem">computador liga mas não dá imagem</a>. A separação entre POST e vídeo evita substituir placa-mãe por um problema de GPU, cabo, monitor ou configuração.</p>

        <h2>7. Firmware e CMOS: não transforme reset em receita universal</h2>
        <p>Resetar configurações pode ajudar quando a hipótese é uma configuração incompatível, overclock, treinamento de memória ou alteração de firmware. Mas isso também apaga ajustes e pode mudar comportamento de boot. Registre a configuração atual antes de qualquer reset e confirme a chave de recuperação se houver criptografia sensível a mudanças de firmware.</p>
        <p>Atualização de BIOS/UEFI também não deve ser usada como “teste” em uma máquina instável. Primeiro confirme o motivo da atualização, o modelo exato, a versão e o procedimento de recuperação disponível. Interromper uma gravação de firmware pode adicionar uma falha que não existia.</p>

        <h2>8. Quando uma porta ou slot isolado falha</h2>
        <p>Uma placa pode funcionar parcialmente. USB, áudio, Ethernet, SATA, M.2, PCIe ou um slot de memória podem apresentar falha localizada enquanto o restante do computador inicializa normalmente. Para sustentar esse diagnóstico:</p>
        <ul>
          <li>repita com outro cabo ou periférico conhecido como funcional;</li>
          <li>compare com outra porta equivalente quando existir;</li>
          <li>confirme no manual se a interface é compartilhada ou desabilitada por outra configuração;</li>
          <li>elimine driver e sistema operacional quando a função também puder ser observada no firmware ou em outro ambiente compatível;</li>
          <li>registre se a falha acompanha o periférico ou permanece na mesma interface.</li>
        </ul>

        <h2>9. Evidências que aumentam de verdade a probabilidade de defeito na placa</h2>
        <ul>
          <li>Dano físico ou corrosão na própria placa, especialmente quando coincide com a área funcional que falhou.</li>
          <li>Configuração mínima não conclui POST com fonte e memória verificadas por comparação controlada e CPU compatível.</li>
          <li>Uma interface específica falha com diferentes componentes conhecidos como bons enquanto outra interface equivalente funciona.</li>
          <li>O defeito muda ao aplicar leve pressão ou movimentação em área danificada — situação que deve interromper uso, não virar técnica de reparo.</li>
          <li>Instrumentação de bancada localiza alimentação ausente, componente em curto ou sinal que não progride, dentro de um procedimento técnico documentado.</li>
        </ul>

        <h2>10. Evidências que ainda não bastam para condenar a placa</h2>
        <ul>
          <li>Ventoinha girar sem vídeo.</li>
          <li>Um único erro de memória sem isolamento de módulo e slot.</li>
          <li>Um dispositivo USB deixar de funcionar.</li>
          <li>O PC desligar imediatamente sem separar fonte, cabeamento e montagem.</li>
          <li>O Windows travar ou reiniciar sem reproduzir o problema fora do sistema.</li>
          <li>Um código de POST consultado em tabela genérica da internet, sem o manual do modelo.</li>
        </ul>

        <h2>Reparar a placa ou substituir?</h2>
        <p>Depois de confirmar a placa como origem provável, a decisão passa a ser econômica e técnica. Um conector, componente discreto ou trilha acessível pode ser reparável em bancada. Corrosão extensa, dano em múltiplas camadas, falhas recorrentes em diferentes circuitos ou indisponibilidade de componentes podem tornar a substituição mais racional.</p>
        <p>Também avalie a plataforma inteira. Em gerações antigas, uma placa compatível usada pode custar perto de uma migração que já troca placa, processador e memória. O diagnóstico deve informar o defeito e as opções; a decisão de investimento vem depois.</p>

        <h2>Depois de reparar ou trocar, valide antes de encerrar</h2>
        <ul>
          <li>Confirme POST e inicialização repetível a frio e a quente.</li>
          <li>Teste memória nas condições suportadas pela plataforma.</li>
          <li>Valide armazenamento, rede, USB, áudio e demais interfaces realmente usadas.</li>
          <li>Observe temperatura e estabilidade sob carga compatível com o uso do equipamento.</li>
          <li>Se houve troca de placa, confira boot, drivers, ativação e criptografia antes de apagar qualquer estado anterior.</li>
        </ul>

        <h2>Quando parar e levar para bancada</h2>
        <p>Interrompa testes domésticos se houver cheiro de queimado, carbonização, corrosão relevante, líquido, conector derretido, pinos danificados, desligamento repetido por proteção ou necessidade de medir circuitos energizados. Não abra a fonte de alimentação e não use calor doméstico, “reflow” improvisado ou curto entre pontos da placa como tentativa de recuperação.</p>
        <p>Se a causa ainda estiver aberta, veja <a href="/diagnostico-tecnico">como funciona o diagnóstico técnico</a>. Para falha eletrônica confirmada, o fluxo está em <a href="/servicos/conserto-placa">conserto de placa</a>.</p>

        <h2>Perguntas frequentes</h2>
        <h3>Se o computador liga mas não dá vídeo, a placa-mãe está com defeito?</h3>
        <p>Não necessariamente. Memória, CPU, GPU, monitor, cabo, firmware e alimentação ainda podem produzir o mesmo sintoma. Primeiro separe POST de caminho de vídeo.</p>

        <h3>LED de DRAM aceso significa memória RAM ruim?</h3>
        <p>Ele mostra que a inicialização parou na etapa relacionada à memória. Módulo, slot, controlador de memória, soquete, compatibilidade e configuração ainda precisam ser separados.</p>

        <h3>Resetar CMOS confirma defeito de BIOS?</h3>
        <p>Não. Reset restaura configurações; ele não regrava automaticamente o firmware nem prova que o chip de firmware esteja defeituoso.</p>

        <h3>Posso testar a placa-mãe com outra fonte?</h3>
        <p>Uma fonte conhecida, compatível e em boas condições é uma comparação útil quando a alimentação é suspeita. Ela precisa ter conectores e capacidade apropriados e nunca deve misturar cabos modulares de fontes diferentes.</p>

        <h3>Um teste de memória com erro condena a placa?</h3>
        <p>Não. O erro precisa ser reproduzido e isolado entre módulo, slot e plataforma; ferramentas de memória não identificam sozinhas qual componente físico é o causador.</p>

        <h2>Resumo prático</h2>
        <p>Diagnosticar placa-mãe é um processo de exclusão documentada. Separe alimentação, POST, memória, vídeo, firmware e interfaces; use comparação controlada, mude uma variável por vez e trate códigos como pistas de estágio. Só condene a placa quando as alternativas relevantes tiverem sido eliminadas ou houver evidência física/eletrônica direta.</p>

        <EditorialReferences slug="como-diagnosticar-placa-mae-defeituosa" />
      </>
    ),
  },

  "boot-uefi-ou-legacy-como-identificar": {
    title: "UEFI ou Legacy: como identificar o boot mode e saber quando mudar",
    excerpt:
      "Veja como descobrir se o Windows iniciou em UEFI ou Legacy, conferir GPT/MBR, entender CSM e Secure Boot e evitar perder o boot ao mudar o firmware.",
    date: "2026-09-29",
    readTime: "14 min",
    category: "Diagnóstico",
    content: (
      <>
        <p className="lead">“UEFI ou Legacy?” é uma pergunta sobre o caminho usado para iniciar o computador, não apenas sobre uma opção visual da BIOS. No Windows, o dado mais direto é o campo <strong>Modo da BIOS</strong> em Informações do Sistema. Depois, confirme o estilo de partição do disco do sistema e o objetivo da mudança. Alterar UEFI, Legacy ou CSM por tentativa pode fazer uma instalação que funcionava deixar de iniciar.</p>

        <h2>Resposta direta: como saber se o boot mode é UEFI ou Legacy?</h2>
        <ol>
          <li>Abra <strong>Informações do Sistema</strong> executando <strong>msinfo32</strong>.</li>
          <li>Em <strong>Resumo do Sistema</strong>, localize <strong>Modo da BIOS</strong>.</li>
          <li>Se aparecer <strong>UEFI</strong>, esta sessão do Windows foi iniciada em UEFI.</li>
          <li>Se aparecer <strong>Legacy/Herdado</strong>, a sessão foi iniciada pelo caminho legado.</li>
          <li>Depois confira se o <strong>disco do sistema</strong> usa GPT ou MBR; isso ajuda a entender a instalação, mas não substitui o campo Modo da BIOS.</li>
        </ol>
        <p>A documentação da Microsoft usa o próprio <code>msinfo32</code> para verificar se a máquina está iniciando em BIOS legado ou UEFI. Para a pergunta “qual modo está ativo agora?”, esse é o ponto de partida mais útil no Windows.</p>

        <h2>UEFI, Legacy e CSM: o que cada nome significa</h2>
        <table>
          <thead><tr><th>Termo</th><th>O que representa</th><th>Como tratar no diagnóstico</th></tr></thead>
          <tbody>
            <tr><td>UEFI</td><td>Interface de firmware moderna usada no processo de inicialização</td><td>É o caminho esperado em instalações modernas suportadas do Windows.</td></tr>
            <tr><td>Legacy / BIOS herdado</td><td>Caminho de inicialização compatível com o modelo tradicional de BIOS</td><td>Pode existir em instalações antigas; não deve ser trocado sem verificar a instalação atual.</td></tr>
            <tr><td>CSM</td><td>Módulo de compatibilidade que permite ao firmware UEFI oferecer comportamento de boot legado</td><td>Estar disponível no menu não prova que o Windows atual esteja usando Legacy.</td></tr>
            <tr><td>Secure Boot</td><td>Recurso de segurança do ecossistema UEFI para o processo de inicialização</td><td>Não é um “modo rápido” e não deve ser desabilitado como solução genérica para erro de boot.</td></tr>
          </tbody>
        </table>

        <h2>1. Confirme o modo pelo Windows, não pela aparência da tela</h2>
        <p>Uma tela gráfica de firmware não prova UEFI e uma tela simples não prova Legacy. Fabricantes podem apresentar interfaces muito diferentes. O que interessa é como a sessão atual foi inicializada. No Windows funcionando, <strong>msinfo32 → Modo da BIOS</strong> responde isso diretamente.</p>
        <p>Se o Windows não inicia, registre as opções atuais do firmware e procure entradas como <strong>Windows Boot Manager</strong>, UEFI, CSM ou Legacy. Esses nomes são pistas. O manual do equipamento e a estrutura de boot do disco completam a investigação.</p>

        <h2>2. GPT ou MBR ajuda a entender o disco do sistema</h2>
        <p>No Gerenciamento de Disco, abra as propriedades do disco que contém o Windows e veja o estilo de partição. Em PowerShell, <code>Get-Disk</code> também mostra <code>Partition Style</code>. Confirme o disco correto: um mesmo computador pode ter um disco GPT e outro MBR.</p>
        <p>Em uma instalação moderna do Windows iniciada em UEFI, GPT é a estrutura esperada. Instalações legadas podem usar MBR. Mas “o disco é GPT” não deve virar atalho para concluir como qualquer outro sistema do computador está inicializando; use o estado do sistema e do disco de boot em conjunto.</p>

        <h2>3. Como interpretar combinações comuns</h2>
        <table>
          <thead><tr><th>O que você encontrou</th><th>Leitura provável</th><th>Conduta segura</th></tr></thead>
          <tbody>
            <tr><td>Modo da BIOS = UEFI + disco do sistema GPT</td><td>Instalação moderna coerente</td><td>Preserve o modo, a menos que exista um motivo documentado para mudança.</td></tr>
            <tr><td>Modo da BIOS = Legacy + disco do sistema MBR</td><td>Instalação herdada coerente</td><td>Não troque apenas para “ver se melhora”.</td></tr>
            <tr><td>Firmware oferece UEFI e Legacy/CSM</td><td>O equipamento suporta caminhos diferentes</td><td>Descubra qual caminho o sistema instalado usa antes de alterar.</td></tr>
            <tr><td>Disco secundário é GPT</td><td>Informa o estilo daquele disco</td><td>Não use isso para inferir sozinho o boot do Windows.</td></tr>
            <tr><td>Secure Boot está desligado</td><td>O recurso não está ativo</td><td>Isso, sozinho, não prova que o boot atual seja Legacy.</td></tr>
          </tbody>
        </table>

        <h2>4. Devo usar UEFI ou Legacy?</h2>
        <p>Para uma instalação nova e suportada do Windows em hardware moderno, UEFI é o caminho recomendado pela documentação atual da Microsoft e integra recursos de segurança da plataforma. Isso não significa que toda máquina antiga em Legacy deva ser convertida imediatamente.</p>
        <p>Se o computador já funciona em Legacy, a pergunta correta é “o que eu ganho e o que preciso alterar para migrar?”. Converter apenas por estética do menu não traz benefício. A migração passa por compatibilidade do firmware, estrutura GPT, carregador de boot, criptografia e validação posterior.</p>

        <h2>5. Trocar UEFI/Legacy depois da instalação pode quebrar o boot</h2>
        <p>O Windows normalmente continua iniciando no mesmo modo em que foi instalado. Se você apenas mudar o firmware de Legacy para UEFI — ou o contrário — o carregador esperado pode deixar de ser encontrado. Isso não significa que o SSD ou o Windows foram apagados; significa que firmware e estrutura de inicialização deixaram de combinar.</p>
        <p>Se a máquina passou a abrir direto no Setup depois de uma troca de SSD, use o roteiro <a href="/blog/troquei-o-ssd-e-o-pc-so-abre-a-bios">troquei o SSD e o PC só abre a BIOS</a>. Se o disco nem aparece no firmware, investigue <a href="/blog/hd-nao-e-reconhecido-na-bios-o-que-fazer">HD ou SSD não reconhecido na BIOS</a> antes de mudar o boot mode.</p>

        <h2>6. Quando MBR2GPT entra na conversa</h2>
        <p>Em cenários suportados, a Microsoft fornece o <strong>MBR2GPT</strong> para validar e converter o disco do sistema de MBR para GPT sem usar a reformatação como caminho obrigatório. A ferramenta possui pré-requisitos e faz alterações reais na estrutura de boot; depois da conversão, o firmware precisa ser configurado para UEFI.</p>
        <p>Isso não deve ser usado como “tentativa de conserto”. Antes de qualquer conversão, confirme backup, BitLocker, suporte UEFI do equipamento e a razão da mudança. Se a validação da ferramenta não aprovar o layout, não force a conversão apagando partições para encaixar o disco em uma receita.</p>

        <h2>7. Secure Boot não é sinônimo de UEFI ligado</h2>
        <p>Secure Boot funciona dentro do ecossistema UEFI, mas o estado dele é uma informação diferente do modo em que o Windows iniciou. Um equipamento pode estar em UEFI com Secure Boot desabilitado. Portanto, “Secure Boot off” não basta para diagnosticar “Legacy”.</p>
        <p>Se uma mídia externa não inicializa, confirme procedência, forma de criação e compatibilidade antes de reduzir a proteção do firmware. Desabilitar Secure Boot permanentemente apenas para fazer uma mídia desconhecida iniciar troca um problema de diagnóstico por um problema de segurança.</p>

        <h2>8. BitLocker: confirme a recuperação antes de mudar firmware</h2>
        <p>Mudanças relevantes em firmware, TPM, Secure Boot e caminho de inicialização podem levar um dispositivo criptografado a solicitar a chave de recuperação. Antes de alterar esse conjunto, confirme que a chave está acessível fora do computador. Em máquina corporativa, preserve também as políticas definidas pela organização.</p>

        <h2>9. Quando o problema não é UEFI versus Legacy</h2>
        <ul>
          <li><strong>SSD não detectado:</strong> boot mode não corrige unidade fisicamente ausente ou incompatível.</li>
          <li><strong>Windows Boot Manager ausente:</strong> investigue entrada de boot, partição EFI e BCD antes de trocar o modo inteiro.</li>
          <li><strong>SSD novo sem sistema:</strong> não existir entrada inicializável pode ser normal até haver um carregador válido.</li>
          <li><strong>Pendrive não aparece:</strong> confirme como a mídia foi criada, a porta e o modo suportado pela própria mídia.</li>
          <li><strong>PC entra direto na BIOS:</strong> veja primeiro <a href="/blog/computador-entra-direto-na-bios">computador entra direto na BIOS</a>, pois detecção do disco e ordem de boot também podem ser a causa.</li>
        </ul>

        <h2>10. Sequência que preserva reversibilidade</h2>
        <ol>
          <li>Fotografe ou anote o estado atual do firmware.</li>
          <li>No Windows, registre <strong>Modo da BIOS</strong> em msinfo32.</li>
          <li>Confirme qual disco contém o sistema e se ele usa GPT ou MBR.</li>
          <li>Confirme BitLocker e a chave de recuperação.</li>
          <li>Defina o objetivo: instalação nova, migração Legacy→UEFI, recuperação de boot ou apenas escolher outro dispositivo.</li>
          <li>Consulte o procedimento suportado para esse objetivo.</li>
          <li>Faça uma mudança por vez e valide novamente o boot.</li>
        </ol>

        <h2>Quando parar antes de alterar mais opções</h2>
        <ul>
          <li>Você não consegue identificar o disco do sistema.</li>
          <li>Há criptografia e a chave de recuperação não está disponível.</li>
          <li>O PC é corporativo e firmware/TPM/Secure Boot podem ser gerenciados.</li>
          <li>O disco começou a desaparecer do firmware.</li>
          <li>A máquina tem mais de um sistema e você não sabe qual carregador pertence a cada instalação.</li>
          <li>Você pretende converter ou apagar partições sem backup verificado.</li>
        </ul>

        <h2>Perguntas frequentes</h2>
        <h3>Boot mode UEFI ou Legacy: onde vejo no Windows?</h3>
        <p>Abra <strong>msinfo32</strong> e confira <strong>Modo da BIOS</strong>. Esse campo informa como a sessão atual do Windows foi inicializada.</p>

        <h3>GPT significa que o PC está obrigatoriamente em UEFI?</h3>
        <p>GPT é o estilo de partição do disco. Em instalações modernas do Windows ele normalmente acompanha UEFI, mas o diagnóstico deve confirmar o modo real do sistema, não inferi-lo apenas por outro disco ou por uma única propriedade.</p>

        <h3>Posso mudar Legacy para UEFI sem formatar?</h3>
        <p>Há cenários suportados em que o MBR2GPT permite migrar o disco do sistema sem reformatação, mas a ferramenta tem pré-requisitos e a mudança exige reconfiguração posterior do firmware. Faça backup e valide o cenário antes de converter.</p>

        <h3>CSM e Legacy são a mesma coisa?</h3>
        <p>CSM é um módulo de compatibilidade oferecido por alguns firmwares UEFI para suportar comportamento de inicialização legado. A presença da opção CSM não prova que o Windows esteja usando esse modo.</p>

        <h3>Secure Boot desligado quer dizer que estou em Legacy?</h3>
        <p>Não. Um sistema pode iniciar em UEFI com Secure Boot desabilitado. Verifique o Modo da BIOS no Windows.</p>

        <h2>Resumo prático</h2>
        <p>Para descobrir UEFI ou Legacy, comece pelo <strong>Modo da BIOS</strong> do Windows, confirme GPT/MBR no disco do sistema e entenda o objetivo antes de tocar no firmware. Para instalações modernas suportadas, UEFI é o caminho esperado; para uma instalação Legacy já funcional, migrar exige planejamento, não um simples toggle. Preserve backup, BitLocker e a configuração original antes de qualquer conversão.</p>

        <EditorialReferences slug="boot-uefi-ou-legacy-como-identificar" />
      </>
    ),
  },
};

export default blogSupplementalPosts;
