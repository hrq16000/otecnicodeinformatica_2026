import React from "react";
import { Link } from "@/lib/router-compat";
import type { BlogPostContent } from "@/data/blogPostsContent";

/**
 * Owners editoriais recuperadas.
 *
 * Este módulo existe para preservar artigos aprovados que perderam o corpo
 * renderizável do acervo monolítico. A decisão de indexabilidade continua
 * exclusivamente no registro editorial; este arquivo só restitui o conteúdo.
 */
export const blogRecoveredPosts: Record<string, BlogPostContent> = {
  "como-clonar-hd-para-ssd": {
    title: "Clonar HD para SSD: quando clonar, quando reinstalar e como evitar perda de dados",
    excerpt:
      "Como decidir entre clonagem e instalação limpa, verificar a origem, preservar dados, copiar as partições de inicialização e validar o primeiro boot sem apagar o disco antigo cedo demais.",
    date: "2026-08-12",
    readTime: "13 min",
    category: "Manutenção",
    content: (
      <>
        <p className="lead">
          Clonar um HD para SSD pode preservar Windows, programas, arquivos e configurações,
          mas a clonagem não é automaticamente a melhor escolha. O ponto principal é confirmar
          se o sistema de origem está saudável e se a unidade antiga pode ser lida com segurança
          antes de submetê-la a uma leitura prolongada.
        </p>

        <h2>Resposta direta: quando clonar e quando reinstalar</h2>
        <p>
          Clonar faz sentido quando o sistema está funcional, os programas estão configurados e
          você quer trocar apenas o armazenamento. Instalação limpa tende a ser mais adequada
          quando há corrupção persistente do sistema, infecção recente, erros recorrentes ou uma
          instalação muito degradada. Clonar preserva o que está funcionando — e também preserva
          problemas lógicos existentes.
        </p>

        <h2>Antes de qualquer clonagem, preserve o que é insubstituível</h2>
        <ul>
          <li>Faça uma cópia independente dos arquivos que não podem ser perdidos.</li>
          <li>Se o disco antigo faz ruído, some do sistema ou trava durante leitura, pare a clonagem comum e priorize preservação.</li>
          <li>Confirme a quantidade de dados realmente usada; a capacidade nominal do disco antigo não é o único critério.</li>
          <li>Se houver BitLocker ou outra criptografia, confirme que você tem a chave de recuperação antes de alterar boot ou partições.</li>
        </ul>
        <p>
          Se a origem já apresenta sinais de falha física, consulte
          {" "}<Link to="/blog/como-recuperar-dados-hd-com-defeito">como recuperar dados de HD com defeito</Link>
          {" "}antes de repetir tentativas.
        </p>

        <h2>O que precisa ser copiado</h2>
        <p>
          Uma migração inicializável não é só copiar a partição C:. O processo precisa preservar
          as estruturas de boot compatíveis com a instalação existente. Em máquinas modernas isso
          normalmente inclui a partição EFI e outras partições auxiliares; em cenários legados a
          estrutura é diferente.
        </p>
        <p>
          Copiar apenas a partição visível pode resultar em um SSD cheio de arquivos que não inicia.
          A ferramenta usada deve tratar o disco de origem como conjunto e permitir redimensionar
          partições quando o destino tiver tamanho diferente.
        </p>

        <h2>Roteiro seguro de migração</h2>
        <ol>
          <li>Verifique a saúde do disco de origem e faça backup separado dos arquivos críticos.</li>
          <li>Conecte o SSD de forma compatível com o equipamento e confirme que ele é reconhecido.</li>
          <li>Execute a clonagem incluindo as partições necessárias ao boot.</li>
          <li>Ao final, desligue por completo antes de trocar fisicamente as unidades.</li>
          <li>Quando a arquitetura permitir, faça o primeiro boot apenas com o SSD novo para eliminar ambiguidade.</li>
          <li>Confirme Windows, arquivos, programas e espaço disponível antes de apagar qualquer dado da unidade antiga.</li>
        </ol>

        <h2>Se o SSD clonado não inicia</h2>
        <p>
          Não conclua imediatamente que a clonagem falhou. Verifique se o SSD aparece no firmware,
          se a ordem de boot aponta para a entrada correta e se o modo de inicialização corresponde
          à instalação existente. Mudanças aleatórias entre UEFI e Legacy/CSM podem transformar um
          problema simples em um segundo problema.
        </p>
        <p>
          Para separar esses cenários, use
          {" "}<Link to="/blog/boot-uefi-ou-legacy-como-identificar">UEFI ou Legacy: como identificar</Link>
          {" "}e <Link to="/blog/troquei-o-ssd-e-o-pc-so-abre-a-bios">troquei o SSD e o PC só abre a BIOS</Link>.
        </p>

        <h2>O que a troca por SSD realmente melhora</h2>
        <p>
          SSD reduz latência de armazenamento e costuma melhorar inicialização, abertura de programas
          e tarefas que dependem muito de leitura e gravação. O ganho percebido depende do restante da
          máquina: pouca RAM, processador limitado, temperatura alta ou sistema carregado continuam
          sendo gargalos possíveis.
        </p>

        <h2>Quando interromper</h2>
        <ul>
          <li>O disco de origem começa a desaparecer, fazer ruído ou gerar erros de leitura repetidos.</li>
          <li>Há dados importantes sem uma cópia independente.</li>
          <li>O volume está criptografado e a chave de recuperação não está disponível.</li>
          <li>Você não consegue identificar com segurança qual disco é origem e qual é destino.</li>
        </ul>

        <h2>Próximo passo técnico</h2>
        <p>
          Se a intenção for melhorar desempenho, a clonagem pode fazer parte de
          {" "}<Link to="/servicos/upgrade-ssd-ram">upgrade de SSD e memória</Link>.
          Quando o computador já apresenta lentidão ou erros, comece pelo
          {" "}<Link to="/diagnostico-tecnico">diagnóstico técnico</Link> antes de decidir entre clonar, reinstalar ou substituir hardware.
        </p>
      </>
    ),
  },

  "como-diagnosticar-placa-mae-defeituosa": {
    title: "Placa-mãe defeituosa: como confirmar antes de trocar a peça errada",
    excerpt:
      "Roteiro de eliminação para separar placa-mãe, fonte, memória, vídeo e periféricos antes de condenar a placa, com critérios seguros de parada.",
    date: "2026-08-12",
    readTime: "12 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">
          Placa-mãe é uma das peças mais fáceis de condenar por engano. Ela participa de energia,
          memória, armazenamento, vídeo, USB e inicialização, então defeitos em outras peças podem
          produzir sintomas muito parecidos. O diagnóstico útil reduz variáveis antes de concluir.
        </p>

        <h2>Não existe um sintoma único de placa-mãe</h2>
        <p>
          Reinício, ausência de vídeo, porta que não funciona, memória que parece defeituosa ou PC
          que não liga podem ter várias causas. A hipótese de placa ganha força quando testes
          controlados eliminam fonte, memória, periféricos e configuração sem alterar o sintoma.
        </p>

        <h2>Comece pela inspeção visual e pelo histórico</h2>
        <ul>
          <li>Procure carbonização, corrosão, conector danificado, pino torto ou componente visivelmente quebrado.</li>
          <li>Considere queda, líquido, surto elétrico, troca recente de peça ou intervenção anterior.</li>
          <li>Não use sujeira ou pasta térmica ressecada como prova de defeito eletrônico da placa.</li>
        </ul>

        <h2>Monte o cenário mínimo</h2>
        <p>
          Para reduzir interferências, mantenha apenas o essencial compatível com o equipamento:
          placa, processador com refrigeração, um módulo de memória e fonte. Remova armazenamento,
          periféricos USB e placa de vídeo dedicada quando houver vídeo integrado disponível.
        </p>
        <ol>
          <li>Teste uma configuração por vez e registre o resultado.</li>
          <li>Evite trocar duas peças simultaneamente; isso destrói a evidência de causa.</li>
          <li>Se o sistema chegar ao firmware, reintroduza os componentes aos poucos.</li>
        </ol>

        <h2>Memória: módulo ruim ou slot ruim?</h2>
        <p>
          Teste um módulo conhecido em slots diferentes e, quando possível, módulos diferentes no
          mesmo slot. Se a falha acompanha um módulo, suspeite do módulo. Se qualquer módulo falha
          sempre no mesmo slot e o encaixe está correto, a hipótese de defeito na placa fica mais forte.
        </p>

        <h2>Descartar a fonte vem antes de condenar a placa</h2>
        <p>
          Falha de alimentação pode imitar defeito de placa-mãe. Uma fonte que liga ventoinha não
          está automaticamente aprovada. Use medição adequada ou comparação com fonte conhecida e
          compatível quando houver recurso técnico.
        </p>
        <p>
          O raciocínio está detalhado em
          {" "}<Link to="/blog/como-testar-fonte-de-alimentacao-pc">como testar a fonte do PC</Link>.
        </p>

        <h2>Use indicadores da própria placa com contexto</h2>
        <p>
          LEDs de estágio, códigos de POST e sinais sonoros podem indicar em qual etapa a inicialização
          parou. O significado varia por modelo, então use o manual da placa exata. Tabela genérica de
          bipes não substitui documentação do fabricante.
        </p>

        <h2>Quando a hipótese de placa-mãe ganha força</h2>
        <ul>
          <li>Montagem mínima repete o mesmo defeito com fonte e memória já validadas.</li>
          <li>Uma porta ou slot específico falha de forma reproduzível com diferentes componentes.</li>
          <li>Há dano físico localizado ou corrosão compatível com a área afetada.</li>
          <li>O sintoma persiste depois de descartar energia, memória, temperatura e periféricos.</li>
        </ul>

        <h2>Reparar ou substituir</h2>
        <p>
          Defeito localizado pode permitir reparo eletrônico; dano em chipset, corrosão extensa ou
          falha em múltiplas áreas pode tornar a substituição mais previsível. A decisão também depende
          da plataforma: trocar a placa pode exigir processador ou memória compatíveis.
        </p>

        <h2>O que não fazer</h2>
        <ul>
          <li>Não aqueça a placa com secador, soprador doméstico ou “reflow” improvisado.</li>
          <li>Não abra a fonte de alimentação para investigar junto.</li>
          <li>Não compre placa substituta antes de confirmar soquete, memória, gabinete e conectores.</li>
          <li>Não continue energizando se houver cheiro de queimado, líquido ou componente carbonizado.</li>
        </ul>

        <h2>Próximo passo</h2>
        <p>
          Se o computador não dá imagem, comece também por
          {" "}<Link to="/problemas/computador-nao-da-imagem">computador não dá imagem</Link>.
          Se a suspeita permanecer na placa, veja
          {" "}<Link to="/servicos/conserto-placa">conserto de placa</Link> e
          {" "}<Link to="/diagnostico-tecnico">diagnóstico técnico</Link>.
        </p>
      </>
    ),
  },

  "boot-uefi-ou-legacy-como-identificar": {
    title: "UEFI ou Legacy: como identificar o modo de inicialização do PC sem quebrar o boot",
    excerpt:
      "Como conferir o modo de firmware, entender GPT e MBR e evitar mudanças arriscadas entre UEFI e Legacy/CSM antes de mexer em boot ou partições.",
    date: "2026-08-31",
    readTime: "11 min",
    category: "Diagnóstico",
    content: (
      <>
        <p className="lead">
          Trocar UEFI por Legacy/CSM “para testar” pode transformar uma máquina que inicia em uma
          máquina que não encontra mais o Windows. Antes de alterar firmware, confirme em qual modo
          o sistema está inicializando e como o disco foi preparado.
        </p>

        <h2>Resposta direta</h2>
        <p>
          Em instalações modernas do Windows, UEFI normalmente é usado com GPT; instalações Legacy
          costumam aparecer associadas a MBR. O ponto importante é não alterar o modo do firmware sem
          confirmar a instalação existente e sem plano de retorno.
        </p>

        <h2>Como conferir no Windows</h2>
        <p>
          Abra <strong>Informações do Sistema</strong> (<code>msinfo32</code>) e confira o campo de modo
          da BIOS. Para o disco, use o Gerenciamento de Disco ou outra ferramenta nativa que mostre o
          estilo de partição. Interprete as duas informações em conjunto.
        </p>

        <h2>O que observar no firmware</h2>
        <p>
          Menus e nomes variam por fabricante. Entradas com “UEFI”, opções de Secure Boot e CSM ajudam
          a entender o cenário, mas a aparência da tela não é prova. O dado mais confiável é o modo em
          que o sistema efetivamente inicia.
        </p>

        <h2>GPT, MBR e modo de boot</h2>
        <table>
          <thead>
            <tr>
              <th>Modo</th>
              <th>Particionamento comum</th>
              <th>Leitura correta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>UEFI</td>
              <td>GPT</td>
              <td>Combinação comum em instalações atuais do Windows; ainda depende de carregador válido.</td>
            </tr>
            <tr>
              <td>Legacy/CSM</td>
              <td>MBR</td>
              <td>Combinação típica de instalações antigas; não deve ser alterada por tentativa.</td>
            </tr>
            <tr>
              <td>Modo alterado sem preparar o disco</td>
              <td>Qualquer</td>
              <td>O firmware pode deixar de localizar o carregador existente.</td>
            </tr>
          </tbody>
        </table>

        <h2>Quando o problema costuma aparecer</h2>
        <ul>
          <li>Depois de reset de CMOS ou restauração dos padrões do firmware.</li>
          <li>Depois de trocar, clonar ou converter o disco do sistema.</li>
          <li>Durante instalação ou reinstalação do Windows por mídia USB.</li>
          <li>Depois de atualizar o firmware e perder configurações anteriores.</li>
        </ul>

        <h2>Não use velocidade ou aparência como diagnóstico</h2>
        <p>
          Tempo de boot, logotipo e quantidade de texto na tela variam por fabricante e configuração.
          Eles não confirmam sozinhos UEFI ou Legacy. Use informações do sistema e do disco.
        </p>

        <h2>Conversão não é a mesma coisa que trocar uma opção</h2>
        <p>
          Converter um sistema entre MBR e GPT exige compatibilidade, backup e procedimento próprio.
          A Microsoft fornece a ferramenta MBR2GPT para cenários suportados; depois da conversão,
          o firmware precisa ser reconfigurado para iniciar em UEFI.
        </p>
        <p>
          Fontes oficiais:
          {" "}<a href="https://learn.microsoft.com/pt-br/windows/deployment/mbr-to-gpt" target="_blank" rel="noopener noreferrer">MBR2GPT — Microsoft Learn</a>
          {" "}e
          {" "}<a href="https://learn.microsoft.com/pt-br/windows-hardware/manufacture/desktop/boot-to-uefi-mode-or-legacy-bios-mode?view=windows-11" target="_blank" rel="noopener noreferrer">inicializar em UEFI ou BIOS herdado — Microsoft Learn</a>.
        </p>

        <h2>Quando parar</h2>
        <ul>
          <li>O Windows pede chave BitLocker e você não a possui.</li>
          <li>O disco deixou de aparecer depois de uma mudança de firmware.</li>
          <li>Você não sabe se o equipamento usa RAID, RST, VMD ou política corporativa.</li>
          <li>Há dados importantes sem backup e a próxima etapa envolveria converter ou recriar partições.</li>
        </ul>

        <h2>Próximo passo</h2>
        <p>
          Se a máquina entra direto no setup, consulte
          {" "}<Link to="/blog/computador-entra-direto-na-bios">computador entra direto na BIOS</Link>.
          Se a dúvida é apenas escolher o dispositivo de inicialização, veja
          {" "}<Link to="/blog/ordem-de-boot-na-bios-como-configurar">ordem de boot na BIOS/UEFI</Link>.
        </p>
      </>
    ),
  },
};
