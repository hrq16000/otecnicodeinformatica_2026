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
};

export default blogSupplementalPosts;
