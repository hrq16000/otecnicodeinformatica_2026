import type { ReactNode } from "react";
import { Link } from "@/lib/router-compat";
import { EditorialReferences } from "@/components/BlogPostFAQ";
import windowsKb5074105Image from "@/assets/blog/windows-11-kb5074105-update.jpg";
import { BRAND_NAME } from "@/lib/siteConfig";


export type BlogPostContent = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
  content: ReactNode;
};

export const blogPostsContentBase: Record<string, BlogPostContent> = {

  "organizacao-de-ti-para-pequenos-escritorios": {
    title: "OrganizaÃ§Ã£o de TI para pequenos escritÃ³rios: o guia prÃ¡tico",
    excerpt: "Como organizar equipamentos, arquivos, acessos e rotina de manutenÃ§Ã£o em um escritÃ³rio pequeno, sem contratar estrutura de TI que nÃ£o cabe no negÃ³cio.",
    date: "2026-08-06",
    readTime: "10 min",
    category: "Empresas",
    content: (
      <>
        <p className="lead">EscritÃ³rio pequeno raramente tem alguÃ©m dedicado a TI. Na prÃ¡tica, o computador Ã© problema de quem senta nele â€” atÃ© o dia em que a mÃ¡quina do fechamento para, o arquivo some ou ninguÃ©m sabe a senha do sistema. Organizar TI num escritÃ³rio de 3 a 20 pessoas nÃ£o exige contratar departamento: exige inventÃ¡rio, rotina e decisÃµes escritas.</p>

        <h2>Resposta curta</h2>
        <p>Comece pelo inventÃ¡rio dos equipamentos, defina onde os arquivos de trabalho ficam, estabeleÃ§a quem autoriza acessos, crie uma rotina simples de cÃ³pia de seguranÃ§a e registre por escrito quem responde por cada sistema contratado. Esses cinco pontos resolvem a maior parte das paradas evitÃ¡veis.</p>

        <h2>1. InventÃ¡rio: vocÃª nÃ£o protege o que nÃ£o conhece</h2>
        <p>Antes de qualquer decisÃ£o, liste o que existe. Uma planilha simples basta: identificaÃ§Ã£o da mÃ¡quina, quem usa, tipo (desktop ou notebook), idade aproximada, tipo de armazenamento, quantidade de memÃ³ria, sistema operacional, se estÃ¡ na garantia e quais programas crÃ­ticos rodam nela. Some os perifÃ©ricos que param a operaÃ§Ã£o quando falham â€” impressora, leitor, roteador, nobreak.</p>
        <p>O inventÃ¡rio responde perguntas que costumam travar decisÃµes: qual mÃ¡quina Ã© a mais antiga, quantas ainda usam disco mecÃ¢nico, quem depende de um programa especÃ­fico e qual equipamento nÃ£o pode ficar fora do ar por um dia inteiro. Sem essa lista, toda compra vira palpite e toda parada vira urgÃªncia.</p>

        <h2>2. Onde os arquivos moram</h2>
        <p>O padrÃ£o silencioso da maioria dos escritÃ³rios Ã© o pior possÃ­vel: cada pessoa guarda o que produz na prÃ³pria Ã¡rea de trabalho. Quando a mÃ¡quina falha, o trabalho vai junto. Defina um Ãºnico lugar oficial para arquivos de trabalho â€” uma pasta sincronizada em nuvem, um armazenamento em rede ou uma combinaÃ§Ã£o dos dois â€” e trate a Ã¡rea de trabalho como espaÃ§o temporÃ¡rio.</p>
        <p>Combine tambÃ©m nomes de pastas e de arquivos. PadrÃ£o de nomenclatura parece burocracia atÃ© o dia em que trÃªs versÃµes do mesmo documento circulam por e-mail. Ano, cliente ou projeto, tipo de documento e versÃ£o resolvem quase tudo.</p>

        <h2>3. CÃ³pia de seguranÃ§a que alguÃ©m realmente confere</h2>
        <p>SincronizaÃ§Ã£o em nuvem nÃ£o Ã© cÃ³pia de seguranÃ§a: se um arquivo Ã© apagado ou corrompido, a alteraÃ§Ã£o se propaga. CÃ³pia de seguranÃ§a Ã© ter uma versÃ£o anterior recuperÃ¡vel. A regra prÃ¡tica mais usada Ã© manter trÃªs cÃ³pias dos dados importantes, em dois tipos de mÃ­dia diferentes, com uma delas fora do local de trabalho.</p>
        <p>Mais importante do que a ferramenta escolhida Ã© o teste. Defina uma data no mÃªs para restaurar um arquivo qualquer e confirmar que a cÃ³pia funciona. CÃ³pia nunca testada Ã© suposiÃ§Ã£o. O detalhamento dessa rotina estÃ¡ em <Link to="/servicos/backup-para-empresas" className="text-accent">backup para empresas</Link>.</p>

        <h2>4. Acessos, senhas e quem autoriza o quÃª</h2>
        <p>EscritÃ³rio pequeno costuma operar com uma senha compartilhada por todo mundo. Funciona atÃ© alguÃ©m sair da equipe. Organize em trÃªs camadas: contas individuais para cada pessoa, um gerenciador de senhas para credenciais compartilhadas de sistemas e uma lista de quem pode autorizar alteraÃ§Ãµes, compras e liberaÃ§Ãµes.</p>
        <p>Registre por escrito qual pessoa Ã© a responsÃ¡vel administrativa de cada sistema contratado, qual e-mail recebe a recuperaÃ§Ã£o de conta e onde ficam guardados os cÃ³digos de autenticaÃ§Ã£o em duas etapas. Perder acesso ao e-mail de recuperaÃ§Ã£o costuma custar mais tempo do que qualquer defeito de hardware. As responsabilidades entre empresa, tÃ©cnico e fornecedor estÃ£o detalhadas em <Link to="/seguranca-dos-dados" className="text-accent">seguranÃ§a dos dados</Link>.</p>

        <h2>5. Rede, energia e o que ninguÃ©m olha</h2>
        <p>Boa parte das reclamaÃ§Ãµes de â€œinternet lentaâ€ em escritÃ³rio Ã© distribuiÃ§Ã£o interna, nÃ£o plano contratado: roteador no lugar errado, cabo antigo, equipamento domÃ©stico atendendo vinte dispositivos ou rede sem separaÃ§Ã£o entre uso interno e visitantes. Vale mapear onde estÃ£o os pontos de rede, quais mÃ¡quinas usam cabo e quais dependem de sinal sem fio.</p>
        <p>Se o sinal sem fio nÃ£o cobre a sala inteira ou a rede cai em horÃ¡rio de pico, a avaliaÃ§Ã£o da estrutura interna estÃ¡ descrita em <Link to="/servicos/redes-e-wifi" className="text-accent">redes e Wi-Fi</Link>.</p>
        <p>Energia Ã© o item mais esquecido. MÃ¡quina que guarda arquivos, servidor local, roteador e a estaÃ§Ã£o do fechamento merecem proteÃ§Ã£o contra queda. Desligamento abrupto durante gravaÃ§Ã£o de arquivo Ã© uma das causas mais comuns de corrupÃ§Ã£o de dados.</p>

        <h2>6. Rotina de manutenÃ§Ã£o em vez de urgÃªncia</h2>
        <p>ManutenÃ§Ã£o sÃ³ acontece quando entra no calendÃ¡rio. Um ciclo simples funciona bem: verificaÃ§Ã£o mensal de espaÃ§o em disco e de atualizaÃ§Ãµes pendentes, revisÃ£o trimestral de limpeza fÃ­sica e de temperatura, conferÃªncia semestral do estado de armazenamento e da idade das mÃ¡quinas, e planejamento anual de substituiÃ§Ã£o do que jÃ¡ passou da vida Ãºtil confortÃ¡vel.</p>
        <p>Essa lÃ³gica Ã© a mesma da <Link to="/servicos/manutencao-preventiva-empresas" className="text-accent">manutenÃ§Ã£o preventiva para empresas</Link>: a troca de um armazenamento que dÃ¡ sinais de falha custa muito menos que a tentativa de recuperar dados depois.</p>

        <h2>7. O que registrar antes de pedir suporte</h2>
        <p>Chamado bem descrito reduz ida e volta. Antes de acionar suporte, anote qual equipamento e qual pessoa foram afetados, o horÃ¡rio aproximado do inÃ­cio, a mensagem de erro exata, o programa envolvido, qualquer alteraÃ§Ã£o recente, quantas pessoas estÃ£o paradas e se o acesso remoto Ã© possÃ­vel. Nunca envie senhas ou cÃ³digos de autenticaÃ§Ã£o por mensagem.</p>

        <h2>8. Onde termina o computador e comeÃ§a o fornecedor</h2>
        <p>Sistema contratado â€” contÃ¡bil, jurÃ­dico, de gestÃ£o, e-mail corporativo, certificado digital â€” Ã© mantido por terceiros. O suporte tÃ©cnico atua na camada da mÃ¡quina, da rede e do acesso: instalar, conectar, corrigir sessÃ£o, ajustar permissÃ£o e perifÃ©rico. Erro interno do sistema, licenÃ§a, indisponibilidade do servidor e recuperaÃ§Ã£o de conta sÃ£o do fornecedor. Deixar isso claro por escrito evita expectativa errada nos dois lados. O escopo completo estÃ¡ em <Link to="/servicos/suporte-tecnico-empresarial" className="text-accent">suporte tÃ©cnico empresarial</Link>.</p>

        <h2>Checklist de organizaÃ§Ã£o</h2>
        <ul>
          <li>InventÃ¡rio atualizado de mÃ¡quinas, perifÃ©ricos e programas crÃ­ticos</li>
          <li>Local Ãºnico e conhecido para os arquivos de trabalho</li>
          <li>PadrÃ£o de nomes de pastas e documentos</li>
          <li>CÃ³pia de seguranÃ§a com teste de restauraÃ§Ã£o agendado</li>
          <li>Contas individuais e gerenciador para senhas compartilhadas</li>
          <li>Lista de quem autoriza acessos, alteraÃ§Ãµes e compras</li>
          <li>ResponsÃ¡vel administrativo definido para cada sistema contratado</li>
          <li>ProteÃ§Ã£o de energia nos equipamentos que nÃ£o podem cair</li>
          <li>CalendÃ¡rio de manutenÃ§Ã£o mensal, trimestral e anual</li>
          <li>Plano de substituiÃ§Ã£o das mÃ¡quinas mais antigas</li>
        </ul>

        <h2>Por onde comeÃ§ar se estiver tudo desorganizado</h2>
        <p>NÃ£o tente resolver os dez itens ao mesmo tempo. FaÃ§a o inventÃ¡rio na primeira semana, resolva a cÃ³pia de seguranÃ§a na segunda, organize acessos na terceira e coloque a manutenÃ§Ã£o no calendÃ¡rio na quarta. Em um mÃªs o escritÃ³rio sai do modo urgÃªncia. O diagnÃ³stico do ambiente e o acompanhamento contÃ­nuo estÃ£o descritos em <Link to="/empresa-de-ti-curitiba" className="text-accent">empresa de TI em Curitiba</Link>.</p>
      </>
    ),
  },

  "como-escolher-uma-workstation": {
    title: "Como escolher uma workstation: checklist de requisitos",
    excerpt: "Checklist prÃ¡tico para dimensionar uma estaÃ§Ã£o de trabalho profissional: o que levantar antes de comprar peÃ§a.",
    date: "2026-08-06",
    readTime: "11 min",
    category: "Hardware",
    content: (
      <>
        <p className="lead">Workstation nÃ£o Ã© â€œo computador mais caro da lojaâ€. Ã‰ um conjunto dimensionado para uma carga de trabalho especÃ­fica, que roda horas seguidas, com arquivos grandes e pouca tolerÃ¢ncia a parada. Escolher errado custa dos dois lados: gastar demais em um componente que a aplicaÃ§Ã£o nÃ£o usa, ou economizar exatamente onde o trabalho trava.</p>

        <h2>Resposta curta</h2>
        <p>Antes de escolher peÃ§a, levante o que roda, o tamanho dos arquivos, quantas aplicaÃ§Ãµes ficam abertas ao mesmo tempo, quantos monitores e em que resoluÃ§Ã£o, quanto tempo a mÃ¡quina fica sob carga e quanto hÃ¡ disponÃ­vel para investir. A configuraÃ§Ã£o Ã© consequÃªncia desse levantamento â€” nunca o contrÃ¡rio.</p>

        <h2>Checklist de requisitos</h2>
        <ul>
          <li>Programas efetivamente utilizados no dia a dia, com versÃ£o</li>
          <li>Requisitos oficiais publicados pelo fabricante de cada programa</li>
          <li>Tamanho tÃ­pico dos arquivos e dos projetos abertos</li>
          <li>Quantidade de aplicaÃ§Ãµes simultÃ¢neas em um dia comum</li>
          <li>Quantidade de monitores e resoluÃ§Ã£o de cada um</li>
          <li>Tempo diÃ¡rio sob carga contÃ­nua</li>
          <li>Volume de armazenamento para sistema, projetos e cache</li>
          <li>Necessidade de expansÃ£o nos prÃ³ximos dois a trÃªs anos</li>
          <li>Vida Ãºtil esperada da mÃ¡quina</li>
          <li>Compatibilidade com o que jÃ¡ existe no ambiente</li>
          <li>Rotina de cÃ³pia de seguranÃ§a dos projetos</li>
          <li>Faixa de investimento disponÃ­vel</li>
        </ul>

        <h2>O papel real de cada componente</h2>
        <h3>Processador</h3>
        <p>Relaciona-se ao tipo e Ã  duraÃ§Ã£o da carga. Tarefas longas e contÃ­nuas â€” exportaÃ§Ã£o, compilaÃ§Ã£o, processamento em lote â€” pedem um conjunto diferente de tarefas curtas e intercaladas. Contagem alta de nÃºcleos ajuda quando o programa distribui o trabalho; quando nÃ£o distribui, o ganho Ã© bem menor do que a diferenÃ§a de preÃ§o sugere.</p>
        <h3>MemÃ³ria</h3>
        <p>Relaciona-se ao volume dos projetos e Ã  quantidade de aplicaÃ§Ãµes abertas ao mesmo tempo. MemÃ³ria insuficiente Ã© o gargalo mais comum e o mais fÃ¡cil de identificar: a mÃ¡quina comeÃ§a bem e degrada conforme o dia avanÃ§a. Deixar espaÃ§o para expansÃ£o futura costuma valer mais do que preencher todos os encaixes na compra inicial.</p>
        <h3>Placa de vÃ­deo</h3>
        <p>SÃ³ Ã© decisiva quando a aplicaÃ§Ã£o usa aceleraÃ§Ã£o grÃ¡fica compatÃ­vel. Muita carga profissional depende mais de processador, memÃ³ria e armazenamento do que de uma placa cara. Verifique nos requisitos oficiais do programa se a aceleraÃ§Ã£o existe e qual tipo Ã© suportado antes de investir nesse componente.</p>
        <h3>Armazenamento</h3>
        <p>Dimensione trÃªs coisas separadas: sistema e programas, projetos ativos e arquivos de cache. Trabalhar direto em unidade quase cheia degrada o desempenho e aumenta o risco. Reserve tambÃ©m espaÃ§o para a rotina de cÃ³pia â€” a estaÃ§Ã£o nÃ£o substitui a cÃ³pia de seguranÃ§a.</p>
        <h3>Fonte e refrigeraÃ§Ã£o</h3>
        <p>Devem ser compatÃ­veis com o conjunto e com a carga prevista, nÃ£o com o pico de um teste rÃ¡pido. MÃ¡quina que trabalha horas seguidas depende de dissipaÃ§Ã£o estÃ¡vel. Fonte subdimensionada Ã© causa frequente de desligamento sob carga e de instabilidade difÃ­cil de diagnosticar.</p>

        <h2>Limites operacionais: o que nenhuma montagem garante</h2>
        <p>Este Ã© o ponto que quase nenhuma loja diz em voz alta: <strong>a montagem correta nÃ£o garante desempenho especÃ­fico dentro de um programa</strong>. Desempenho depende da versÃ£o do software, do tipo de projeto, dos plugins usados, do formato dos arquivos e das prÃ³prias limitaÃ§Ãµes da aplicaÃ§Ã£o. ConfiguraÃ§Ã£o dimensionada reduz gargalos â€” nÃ£o promete nÃºmero.</p>
        <p>Por isso, desconfie de promessa de quadros por segundo, de tempo de renderizaÃ§Ã£o, de resultado de teste comparativo sem mediÃ§Ã£o na sua prÃ³pria mÃ¡quina e de selo de homologaÃ§Ã£o que o fabricante do software nÃ£o publica. Quando o desempenho Ã© crÃ­tico, o caminho honesto Ã© testar com um projeto real antes de padronizar a compra para a equipe.</p>

        <h2>Comprar pronta, montar sob medida ou fazer melhoria</h2>
        <p>MÃ¡quina pronta de fabricante traz garantia unificada e menos decisÃµes, com menos flexibilidade de peÃ§a. Montagem sob medida permite dimensionar cada componente para a carga e planejar expansÃ£o, exigindo critÃ©rio na escolha. Melhoria de uma mÃ¡quina existente costuma ser a melhor relaÃ§Ã£o custo-benefÃ­cio quando o gargalo Ã© isolado â€” memÃ³ria insuficiente ou armazenamento lento â€” e o restante do conjunto ainda atende.</p>
        <p>Quando o gargalo Ã© isolado, a intervenÃ§Ã£o pontual estÃ¡ descrita em <Link to="/servicos/upgrade-ssd-ram" className="text-accent">upgrade de SSD e memÃ³ria</Link>. Os tipos de equipamento avaliados estÃ£o em <Link to="/equipamentos-atendidos" className="text-accent">equipamentos atendidos</Link>, e as condiÃ§Ãµes de execuÃ§Ã£o em <Link to="/precos-e-politicas" className="text-accent">preÃ§os e polÃ­ticas</Link>.</p>
        <p>Antes de decidir, vale medir onde o trabalho realmente trava hoje. Trocar tudo por causa de um gargalo pontual Ã© o erro mais caro dessa categoria. Os critÃ©rios de peÃ§as, garantia e execuÃ§Ã£o estÃ£o em <Link to="/servicos/montagem-de-pc" className="text-accent">montagem de PC</Link> e em <Link to="/politica-de-pecas-do-cliente" className="text-accent">polÃ­tica de peÃ§as do cliente</Link>.</p>

        <h2>A estaÃ§Ã£o dentro do ambiente da empresa</h2>
        <p>EstaÃ§Ã£o nova raramente vive isolada: entra numa rede, imprime, guarda arquivos, depende de acesso a sistemas e precisa de rotina de cÃ³pia. Planeje a entrada da mÃ¡quina no ambiente junto com a compra â€” perfil de usuÃ¡rio, permissÃµes, acesso aos arquivos compartilhados e inclusÃ£o na rotina de manutenÃ§Ã£o. Esse acompanhamento Ã© descrito em <Link to="/servicos/suporte-tecnico-empresarial" className="text-accent">suporte tÃ©cnico empresarial</Link>. A rotina de cÃ³pia dos projetos da equipe Ã© tratada em <Link to="/servicos/backup-para-empresas" className="text-accent">backup para empresas</Link>.</p>

        <h2>Erros mais comuns na escolha</h2>
        <ul>
          <li>Copiar configuraÃ§Ã£o pronta da internet sem checar os requisitos do prÃ³prio programa</li>
          <li>Investir em placa de vÃ­deo cara para aplicaÃ§Ã£o que nÃ£o usa aceleraÃ§Ã£o</li>
          <li>Economizar em memÃ³ria e comprometer todo o conjunto</li>
          <li>Ignorar o espaÃ§o necessÃ¡rio para cache e projetos ativos</li>
          <li>Escolher fonte pelo preÃ§o, sem considerar a carga contÃ­nua</li>
          <li>NÃ£o prever expansÃ£o e travar a mÃ¡quina no primeiro upgrade</li>
          <li>Tratar a estaÃ§Ã£o como cÃ³pia de seguranÃ§a dos projetos</li>
        </ul>

        <h2>Como conduzir a decisÃ£o</h2>
        <p>Levante os requisitos, confronte com os requisitos oficiais das aplicaÃ§Ãµes, defina a faixa de investimento, dimensione o conjunto a partir do gargalo real e sÃ³ entÃ£o escolha as peÃ§as. Se o uso for crÃ­tico, teste com um projeto verdadeiro antes de repetir a configuraÃ§Ã£o para a equipe inteira. Uma decisÃ£o documentada hoje evita a discussÃ£o de â€œpor que essa mÃ¡quina nÃ£o dÃ¡ contaâ€ daqui a seis meses.</p>
      </>
    ),
  },

  "linux-vs-windows-diferencas-qual-escolher": {
    title: "Linux vs Windows: DiferenÃ§as Reais e Qual Escolher em 2026",
    excerpt: "Comparativo tÃ©cnico completo entre Linux e Windows.",
    date: "2026-04-13",
    readTime: "14 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">A eterna batalha entre Linux e Windows nÃ£o Ã© sobre qual Ã© "melhor" â€” Ã© sobre <strong>qual Ã© melhor para o seu caso</strong>. Neste comparativo tÃ©cnico, analisamos desempenho, seguranÃ§a, compatibilidade, custo e facilidade de uso para ajudÃ¡-lo a decidir.</p>

        <h2>O Que Ã© Linux, Afinal?</h2>
        <p>Linux nÃ£o Ã© um sistema operacional Ãºnico â€” Ã© um <strong>kernel</strong> (nÃºcleo) sobre o qual centenas de distribuiÃ§Ãµes foram criadas. Ubuntu, Mint, Fedora, Debian, Arch â€” todas usam o kernel Linux, mas oferecem experiÃªncias diferentes. Ã‰ como dizer que "Android Ã© Linux" â€” tecnicamente correto, mas a experiÃªncia Ã© completamente diferente de um desktop Ubuntu.</p>

        <h2>Desempenho: Linux Leva Vantagem</h2>
        <p>Em hardware idÃªntico, o Linux geralmente Ã© mais rÃ¡pido que o Windows. Motivos:</p>
        <ul>
          <li><strong>Menos processos em segundo plano</strong> â€” o Windows roda dezenas de serviÃ§os de telemetria, Cortana, indexaÃ§Ã£o, etc.</li>
          <li><strong>Menos consumo de RAM</strong> â€” Ubuntu com GNOME usa ~1.2 GB de RAM; Windows 11 usa ~3-4 GB em repouso</li>
          <li><strong>Melhor gerenciamento de I/O</strong> â€” o sistema de arquivos ext4/btrfs Ã© mais eficiente que NTFS para leitura/escrita intensiva</li>
          <li><strong>Sem antivÃ­rus pesado</strong> â€” o modelo de seguranÃ§a do Linux dispensa antivÃ­rus na maioria dos cenÃ¡rios</li>
        </ul>
        <p>Para PCs antigos, a diferenÃ§a Ã© brutal: um Celeron com 2 GB de RAM roda Lubuntu fluentemente, mas mal consegue iniciar o Windows 10.</p>

        <h2>SeguranÃ§a: Linux Ã© Mais Seguro (Mas NÃ£o InvulnerÃ¡vel)</h2>
        <p>O modelo de permissÃµes do Linux Ã© mais robusto por design:</p>
        <ul>
          <li>UsuÃ¡rio comum <strong>nunca tem acesso root</strong> por padrÃ£o</li>
          <li>InstalaÃ§Ã£o de software via repositÃ³rios oficiais verificados</li>
          <li>Menos de 1% dos malwares no mundo sÃ£o feitos para Linux desktop</li>
          <li>AtualizaÃ§Ãµes de seguranÃ§a geralmente sÃ£o mais rÃ¡pidas no ecossistema open-source</li>
        </ul>
        <p>No entanto, servidores Linux sÃ£o alvos frequentes. A seguranÃ§a depende sempre de configuraÃ§Ã£o adequada.</p>

        <h2>Compatibilidade de Software</h2>
        <p>Aqui o Windows ainda domina:</p>
        <ul>
          <li><strong>Jogos:</strong> Steam Proton melhorou muito, mas nem todos os tÃ­tulos AAA rodam perfeitamente no Linux</li>
          <li><strong>Adobe Suite:</strong> Photoshop, Premiere, Illustrator â€” nÃ£o hÃ¡ versÃ£o nativa para Linux. Alternativas como GIMP e DaVinci Resolve existem, mas a curva de aprendizado Ã© real</li>
          <li><strong>Microsoft Office:</strong> LibreOffice Ã© compatÃ­vel, mas formataÃ§Ã£o avanÃ§ada pode quebrar. Office 365 Web funciona em qualquer navegador</li>
          <li><strong>Drivers:</strong> impressoras e perifÃ©ricos nem sempre tÃªm driver Linux. Antes de migrar, verifique compatibilidade</li>
        </ul>

        <h2>Custo: Linux Ã© Gratuito</h2>
        <p>Uma licenÃ§a do Windows 11 Pro custa R$ 1.099 (preÃ§o oficial). O Linux Ã© <strong>100% gratuito</strong> â€” sistema, atualizaÃ§Ãµes e a maioria dos softwares. Para empresas com dezenas de mÃ¡quinas, a economia Ã© significativa.</p>

        <h2>Facilidade de Uso em 2026</h2>
        <p>O mito de que "Linux Ã© difÃ­cil" estÃ¡ desatualizado. DistribuiÃ§Ãµes como <strong>Linux Mint</strong> e <strong>Ubuntu</strong> oferecem experiÃªncia tÃ£o intuitiva quanto o Windows. A instalaÃ§Ã£o leva 15 minutos, o gerenciador de software Ã© uma "loja de apps" e a maioria das tarefas nÃ£o exige terminal.</p>

        <h2>Tabela Comparativa</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr><th className="text-left p-2 border-b">CritÃ©rio</th><th className="text-left p-2 border-b">Windows</th><th className="text-left p-2 border-b">Linux</th></tr></thead>
            <tbody>
              <tr><td className="p-2 border-b">Custo</td><td className="p-2 border-b">R$ 1.099+</td><td className="p-2 border-b">Gratuito</td></tr>
              <tr><td className="p-2 border-b">Desempenho</td><td className="p-2 border-b">Bom</td><td className="p-2 border-b">Excelente</td></tr>
              <tr><td className="p-2 border-b">SeguranÃ§a</td><td className="p-2 border-b">Requer antivÃ­rus</td><td className="p-2 border-b">Nativo robusto</td></tr>
              <tr><td className="p-2 border-b">Jogos</td><td className="p-2 border-b">Excelente</td><td className="p-2 border-b">Bom (Proton)</td></tr>
              <tr><td className="p-2 border-b">Software profissional</td><td className="p-2 border-b">Excelente</td><td className="p-2 border-b">Limitado</td></tr>
              <tr><td className="p-2 border-b">PC antigo</td><td className="p-2 border-b">Pesado</td><td className="p-2 border-b">Ideal</td></tr>
              <tr><td className="p-2 border-b">Privacidade</td><td className="p-2 border-b">Telemetria ativa</td><td className="p-2 border-b">Total controle</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Quando Usar Windows?</h2>
        <ul>
          <li>Jogos AAA com anti-cheat (Valorant, Fortnite)</li>
          <li>Adobe Creative Suite</li>
          <li>Softwares empresariais especÃ­ficos (SAP, AutoCAD)</li>
          <li>UsuÃ¡rios que nÃ£o querem aprender nada novo</li>
        </ul>

        <h2>Quando Usar Linux?</h2>
        <ul>
          <li>Servidores e infraestrutura</li>
          <li>Desenvolvimento e programaÃ§Ã£o</li>
          <li>PCs antigos que precisam "renascer"</li>
          <li>Quem prioriza privacidade e controle total</li>
          <li>Empresas que querem reduzir custos com licenÃ§as</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Quer Instalar Linux ou Dual Boot?</h3>
          <p className="text-muted-foreground mb-0">Nosso tÃ©cnico configura Linux, dual boot ou migraÃ§Ã£o completa no seu computador. Atendemos em Curitiba e regiÃ£o metropolitana.</p>
        </div>
      </>
    ),
  },
  "comandos-linux-essenciais-iniciantes": {
    title: "50 Comandos Linux Essenciais Para Iniciantes e TÃ©cnicos",
    excerpt: "Guia definitivo de comandos do terminal.",
    date: "2026-04-13",
    readTime: "16 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">O terminal do Linux pode parecer intimidador, mas dominar os comandos bÃ¡sicos transforma sua produtividade. Este guia reÃºne <strong>50 comandos essenciais</strong> organizados por categoria, com exemplos prÃ¡ticos.</p>

        <h2>NavegaÃ§Ã£o e Arquivos</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`pwd          # Mostra o diretÃ³rio atual
ls           # Lista arquivos e pastas
ls -la       # Lista com detalhes e ocultos
cd /caminho  # Navega para um diretÃ³rio
cd ..        # Volta um nÃ­vel
cd ~         # Vai para o home do usuÃ¡rio
mkdir pasta  # Cria diretÃ³rio
rmdir pasta  # Remove diretÃ³rio vazio
rm arquivo   # Remove arquivo
rm -rf pasta # Remove pasta e conteÃºdo (CUIDADO!)
cp orig dest # Copia arquivo
mv orig dest # Move ou renomeia
touch arq    # Cria arquivo vazio
cat arquivo  # Mostra conteÃºdo do arquivo
less arquivo # Mostra com paginaÃ§Ã£o
head -n 20 arq # Primeiras 20 linhas
tail -f log  # Acompanha arquivo em tempo real`}</code></pre>

        <h2>Busca e Filtros</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`find / -name "*.log"        # Busca arquivos por nome
find . -size +100M          # Arquivos maiores que 100MB
grep "texto" arquivo        # Busca texto em arquivo
grep -r "texto" /pasta/     # Busca recursiva
grep -i "texto" arq         # Ignora maiÃºsculas
wc -l arquivo               # Conta linhas
sort arquivo                # Ordena conteÃºdo
uniq                        # Remove duplicatas
diff arq1 arq2              # Compara dois arquivos`}</code></pre>

        <h2>PermissÃµes e UsuÃ¡rios</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`chmod 755 arquivo    # Define permissÃµes (rwxr-xr-x)
chmod +x script.sh   # Torna executÃ¡vel
chown user:grupo arq # Altera dono do arquivo
sudo comando         # Executa como root
whoami               # Mostra usuÃ¡rio atual
id                   # Mostra UID, GID e grupos
passwd               # Altera senha
adduser nome         # Cria novo usuÃ¡rio
usermod -aG grupo user # Adiciona user ao grupo`}</code></pre>

        <h2>Processos e Sistema</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`ps aux           # Lista todos os processos
top              # Monitor em tempo real
htop             # Monitor interativo (instalar)
kill PID         # Encerra processo por PID
kill -9 PID      # ForÃ§a encerramento
systemctl status serviÃ§o  # Status de serviÃ§o
systemctl restart serviÃ§o # Reinicia serviÃ§o
df -h            # EspaÃ§o em disco
du -sh /pasta    # Tamanho de uma pasta
free -h          # Uso de memÃ³ria RAM
uname -a         # Info do kernel
uptime           # Tempo ligado`}</code></pre>

        <h2>Rede</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`ip a             # Mostra interfaces de rede
ping google.com  # Testa conectividade
curl url         # Faz requisiÃ§Ã£o HTTP
wget url         # Baixa arquivo da web
ss -tulnp        # Portas em uso
traceroute host  # Rota atÃ© o destino
nslookup domÃ­nio # Consulta DNS
scp arq user@host:/path  # Copia via SSH
ssh user@host    # Acesso remoto seguro`}</code></pre>

        <h2>CompactaÃ§Ã£o</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`tar -czf backup.tar.gz /pasta  # Compacta com gzip
tar -xzf backup.tar.gz        # Descompacta
zip -r backup.zip /pasta       # Compacta em ZIP
unzip backup.zip               # Descompacta ZIP`}</code></pre>

        <h2>Dicas de Produtividade no Terminal</h2>
        <ul>
          <li><strong>Tab</strong> â€” autocompleta comandos e caminhos</li>
          <li><strong>Ctrl+R</strong> â€” busca no histÃ³rico de comandos</li>
          <li><strong>!!</strong> â€” repete o Ãºltimo comando (Ãºtil: <code>sudo !!</code>)</li>
          <li><strong>Ctrl+C</strong> â€” cancela comando em execuÃ§Ã£o</li>
          <li><strong>Ctrl+L</strong> â€” limpa a tela</li>
          <li><strong>comando1 | comando2</strong> â€” pipe: saÃ­da de um vira entrada do outro</li>
          <li><strong>comando &gt; arquivo</strong> â€” redireciona saÃ­da para arquivo</li>
          <li><strong>comando &gt;&gt; arquivo</strong> â€” adiciona ao final do arquivo</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Precisa de Ajuda com Linux?</h3>
          <p className="text-muted-foreground mb-0">Instalamos, configuramos e damos suporte a Linux em Curitiba e regiÃ£o. De servidores a desktops.</p>
        </div>
      </>
    ),
  },
  "como-instalar-ubuntu-do-zero": {
    title: "Como Instalar Ubuntu do Zero: Guia Completo 2026",
    excerpt: "Passo a passo desde o pendrive bootÃ¡vel atÃ© a configuraÃ§Ã£o pÃ³s-instalaÃ§Ã£o.",
    date: "2026-04-13",
    readTime: "12 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">O Ubuntu Ã© a distribuiÃ§Ã£o Linux mais popular do mundo â€” e por bons motivos. Ã‰ gratuito, seguro, leve e fÃ¡cil de usar. Este guia mostra <strong>como instalar o Ubuntu do zero</strong>, desde a criaÃ§Ã£o do pendrive bootÃ¡vel atÃ© as configuraÃ§Ãµes essenciais pÃ³s-instalaÃ§Ã£o.</p>

        <h2>Requisitos MÃ­nimos</h2>
        <ul>
          <li>Processador dual-core de 2 GHz ou superior</li>
          <li>4 GB de RAM (recomendado 8 GB)</li>
          <li>25 GB de espaÃ§o em disco (recomendado 50 GB)</li>
          <li>Pendrive USB de 4 GB ou mais</li>
          <li>ConexÃ£o com internet (recomendado)</li>
        </ul>

        <h2>Passo 1: Baixar a ISO do Ubuntu</h2>
        <p>Acesse <strong>ubuntu.com/download</strong> e baixe a versÃ£o LTS mais recente (Ubuntu 24.04 LTS). A versÃ£o LTS tem suporte de 5 anos â€” ideal para estabilidade.</p>

        <h2>Passo 2: Criar Pendrive BootÃ¡vel</h2>
        <p>No Windows, use o <strong>Rufus</strong> (gratuito):</p>
        <ol>
          <li>Baixe e abra o Rufus</li>
          <li>Selecione o pendrive USB</li>
          <li>Em "SeleÃ§Ã£o de Boot", escolha a ISO do Ubuntu</li>
          <li>PartiÃ§Ã£o: GPT (para UEFI) ou MBR (para BIOS legado)</li>
          <li>Clique em "Iniciar" e aguarde</li>
        </ol>

        <h2>Passo 3: Configurar Boot pelo Pendrive</h2>
        <p>Reinicie o computador e acesse o menu de boot:</p>
        <ul>
          <li><strong>Dell/Lenovo:</strong> F12</li>
          <li><strong>HP:</strong> F9</li>
          <li><strong>ASUS/Acer:</strong> F2 ou ESC</li>
          <li><strong>MSI:</strong> F11</li>
        </ul>
        <p>Selecione o pendrive USB na lista de dispositivos de boot.</p>

        <h2>Passo 4: InstalaÃ§Ã£o</h2>
        <ol>
          <li>Selecione "Instalar Ubuntu" (nÃ£o "Experimentar")</li>
          <li>Escolha o idioma: <strong>PortuguÃªs do Brasil</strong></li>
          <li>Marque "Instalar software de terceiros" (codecs, drivers Wi-Fi)</li>
          <li>Tipo de instalaÃ§Ã£o: "Apagar disco e instalar Ubuntu" (para instalaÃ§Ã£o limpa)</li>
          <li>Selecione fuso horÃ¡rio: <strong>SÃ£o Paulo</strong></li>
          <li>Crie seu usuÃ¡rio e senha</li>
          <li>Aguarde a instalaÃ§Ã£o (10-20 minutos)</li>
          <li>Reinicie e remova o pendrive quando solicitado</li>
        </ol>

        <h2>Passo 5: ConfiguraÃ§Ãµes PÃ³s-InstalaÃ§Ã£o</h2>
        <p>ApÃ³s o primeiro boot, execute no terminal:</p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Atualizar tudo
sudo apt update && sudo apt upgrade -y

# Instalar codecs multimÃ­dia
sudo apt install ubuntu-restricted-extras -y

# Instalar ferramentas essenciais
sudo apt install git curl wget htop neofetch -y

# Instalar navegador alternativo (ex: Chrome)
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb

# Instalar Flatpak (mais apps)
sudo apt install flatpak gnome-software-plugin-flatpak -y
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo`}</code></pre>

        <h2>Softwares Essenciais Para Instalar</h2>
        <ul>
          <li><strong>LibreOffice</strong> â€” jÃ¡ vem instalado (equivalente ao Office)</li>
          <li><strong>VLC</strong> â€” player de mÃ­dia universal</li>
          <li><strong>GIMP</strong> â€” editor de imagens (alternativa ao Photoshop)</li>
          <li><strong>Visual Studio Code</strong> â€” editor de cÃ³digo</li>
          <li><strong>Timeshift</strong> â€” backup/restauraÃ§Ã£o do sistema</li>
          <li><strong>Flameshot</strong> â€” captura de tela avanÃ§ada</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">InstalaÃ§Ã£o Profissional de Linux</h3>
          <p className="text-muted-foreground mb-0">Nosso tÃ©cnico instala Ubuntu, Mint ou qualquer distribuiÃ§Ã£o no seu computador com todos os drivers e softwares configurados. Atendemos em Curitiba e regiÃ£o.</p>
        </div>
      </>
    ),
  },
  "distribuicoes-linux-qual-melhor-para-voce": {
    title: "DistribuiÃ§Ãµes Linux: Qual a Melhor Para VocÃª?",
    excerpt: "Comparativo entre as principais distros.",
    date: "2026-04-13",
    readTime: "11 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">Existem centenas de distribuiÃ§Ãµes Linux, mas <strong>5-6 dominam o mercado desktop</strong>. Cada uma tem um foco diferente. Veja qual combina com seu perfil.</p>

        <h2>Ubuntu â€” O Mais Popular</h2>
        <p><strong>Para quem:</strong> iniciantes, escritÃ³rio, uso geral.</p>
        <ul>
          <li>Interface GNOME moderna e polida</li>
          <li>Maior comunidade e mais tutoriais em portuguÃªs</li>
          <li>Loja de apps com milhares de opÃ§Ãµes</li>
          <li>VersÃ£o LTS com 5 anos de suporte</li>
          <li><strong>Requisitos:</strong> 4 GB RAM, 25 GB disco</li>
        </ul>

        <h2>Linux Mint â€” O Mais Parecido com Windows</h2>
        <p><strong>Para quem:</strong> quem vem do Windows e quer transiÃ§Ã£o suave.</p>
        <ul>
          <li>Interface Cinnamon: barra de tarefas, menu Iniciar, desktop familiar</li>
          <li>Tudo funciona "out of the box" (codecs, drivers)</li>
          <li>Baseado no Ubuntu, mas sem as polÃªmicas (Snap)</li>
          <li><strong>Requisitos:</strong> 2 GB RAM, 20 GB disco</li>
        </ul>

        <h2>Fedora â€” O Mais Atualizado</h2>
        <p><strong>Para quem:</strong> desenvolvedores e entusiastas.</p>
        <ul>
          <li>Sempre com as versÃµes mais recentes do kernel e GNOME</li>
          <li>Patrocinado pela Red Hat (lÃ­der em servidores)</li>
          <li>Excelente para desenvolvimento de software</li>
          <li><strong>Requisitos:</strong> 4 GB RAM, 20 GB disco</li>
        </ul>

        <h2>Debian â€” O Mais EstÃ¡vel</h2>
        <p><strong>Para quem:</strong> servidores e quem prioriza estabilidade absoluta.</p>
        <ul>
          <li>Base do Ubuntu e dezenas de outras distros</li>
          <li>Testes rigorosos antes de cada release</li>
          <li>Ideal para servidores que nÃ£o podem falhar</li>
          <li><strong>Requisitos:</strong> 1 GB RAM, 10 GB disco</li>
        </ul>

        <h2>Arch Linux â€” Para AvanÃ§ados</h2>
        <p><strong>Para quem:</strong> quem quer controle total e aprender Linux a fundo.</p>
        <ul>
          <li>InstalaÃ§Ã£o manual via terminal (sem interface grÃ¡fica por padrÃ£o)</li>
          <li>Rolling release: sempre na Ãºltima versÃ£o</li>
          <li>AUR: o maior repositÃ³rio de pacotes do mundo Linux</li>
          <li>DocumentaÃ§Ã£o (Arch Wiki) considerada a melhor da comunidade Linux</li>
        </ul>

        <h2>Tabela Comparativa</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr><th className="text-left p-2 border-b">Distro</th><th className="text-left p-2 border-b">NÃ­vel</th><th className="text-left p-2 border-b">RAM MÃ­n.</th><th className="text-left p-2 border-b">Melhor Para</th></tr></thead>
            <tbody>
              <tr><td className="p-2 border-b">Ubuntu</td><td className="p-2 border-b">Iniciante</td><td className="p-2 border-b">4 GB</td><td className="p-2 border-b">Uso geral</td></tr>
              <tr><td className="p-2 border-b">Mint</td><td className="p-2 border-b">Iniciante</td><td className="p-2 border-b">2 GB</td><td className="p-2 border-b">Ex-Windows</td></tr>
              <tr><td className="p-2 border-b">Fedora</td><td className="p-2 border-b">IntermediÃ¡rio</td><td className="p-2 border-b">4 GB</td><td className="p-2 border-b">Desenvolvimento</td></tr>
              <tr><td className="p-2 border-b">Debian</td><td className="p-2 border-b">IntermediÃ¡rio</td><td className="p-2 border-b">1 GB</td><td className="p-2 border-b">Servidores</td></tr>
              <tr><td className="p-2 border-b">Arch</td><td className="p-2 border-b">AvanÃ§ado</td><td className="p-2 border-b">512 MB</td><td className="p-2 border-b">Controle total</td></tr>
            </tbody>
          </table>
        </div>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">NÃ£o Sabe Qual Escolher?</h3>
          <p className="text-muted-foreground mb-0">Nosso tÃ©cnico avalia seu hardware e necessidades para recomendar e instalar a melhor distribuiÃ§Ã£o. Atendemos em Curitiba e regiÃ£o.</p>
        </div>
      </>
    ),
  },
  "trocar-windows-por-linux-vale-a-pena": {
    title: "Trocar Windows por Linux vale a pena? Checklist de compatibilidade antes de migrar",
    excerpt:
      "Decida com base em aplicativos, perifÃ©ricos, arquivos, jogos e suporte do hardware. Veja como testar Linux por USB antes de alterar o disco.",
    date: "2026-09-25",
    readTime: "11 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">Trocar Windows por Linux pode ser uma Ã³tima decisÃ£o â€” ou pode quebrar justamente o programa que sustenta seu trabalho. A pergunta correta nÃ£o Ã© â€œLinux Ã© melhor?â€, e sim: <strong>meus aplicativos, arquivos, perifÃ©ricos e rotina funcionam na distribuiÃ§Ã£o que pretendo usar?</strong> A vantagem Ã© que distribuiÃ§Ãµes como Ubuntu permitem testar o sistema por USB antes de fazer mudanÃ§as permanentes no computador.</p>

        <h2>Resposta curta</h2>
        <p>Vale considerar Linux quando suas tarefas dependem principalmente de navegador, ferramentas multiplataforma, desenvolvimento ou softwares com versÃ£o nativa para Linux. Mantenha Windows â€” ou teste dual boot/virtualizaÃ§Ã£o â€” quando vocÃª depende de aplicativo proprietÃ¡rio, perifÃ©rico com driver especÃ­fico, jogo com mecanismo anti-cheat incompatÃ­vel ou integraÃ§Ã£o corporativa que sÃ³ foi homologada no Windows.</p>

        <h2>1. FaÃ§a um inventÃ¡rio do que precisa continuar funcionando</h2>
        <p>Liste programas usados semanalmente, arquivos crÃ­ticos, impressoras/scanners, VPN, certificado digital, sincronizaÃ§Ã£o em nuvem, jogos e acessÃ³rios. Para cada item, classifique: versÃ£o Linux oficial, equivalente aceitÃ¡vel, funciona via navegador, depende de compatibilidade adicional ou nÃ£o tem alternativa prÃ¡tica.</p>
        <p>Evite decidir pela existÃªncia de um â€œprograma parecidoâ€. Se vocÃª troca arquivos com clientes em formatos especÃ­ficos, usa macros, plugins, drivers ou recursos avanÃ§ados, teste o fluxo real â€” abrir, editar, exportar, imprimir e compartilhar â€” antes da migraÃ§Ã£o.</p>

        <h2>2. Teste o hardware com um sistema live</h2>
        <p>A documentaÃ§Ã£o atual do Ubuntu recomenda experimentar o sistema diretamente por USB antes da instalaÃ§Ã£o. Essa sessÃ£o de teste nÃ£o altera o disco por padrÃ£o e permite verificar teclado, touchpad, Wi-Fi, Bluetooth, Ã¡udio, vÃ­deo, webcam, suspensÃ£o e perifÃ©ricos.</p>
        <p>Alguns drivers proprietÃ¡rios podem nÃ£o estar ativos na sessÃ£o live; portanto, ausÃªncia de um recurso ali nÃ£o prova incompatibilidade definitiva. Ainda assim, o teste revela problemas bÃ¡sicos antes de vocÃª reparticionar ou apagar o sistema atual.</p>

        <h2>3. Compare seu hardware com os requisitos e a realidade atual</h2>
        <p>Linux pode dar nova utilidade a mÃ¡quinas que nÃ£o atendem aos requisitos oficiais do Windows 11, mas isso nÃ£o significa que â€œqualquer Linux roda bem com 2 GB de RAMâ€. Ambiente grÃ¡fico, navegador moderno e quantidade de abas ainda consomem memÃ³ria e CPU. Escolha distribuiÃ§Ã£o/desktop compatÃ­veis com a capacidade real e com o suporte que vocÃª precisa.</p>
        <p>Os requisitos oficiais do Windows 11 incluem CPU compatÃ­vel de 64 bits, 4 GB de RAM, 64 GB de armazenamento, UEFI/Secure Boot e TPM 2.0. Se uma mÃ¡quina ficou fora dessa linha, migrar para Linux pode ser uma opÃ§Ã£o legÃ­tima â€” desde que os aplicativos e perifÃ©ricos necessÃ¡rios sejam compatÃ­veis.</p>

        <h2>4. Aplicativos: nativo, web, equivalente ou sem substituto?</h2>
        <table>
          <thead><tr><th>SituaÃ§Ã£o</th><th>Como decidir</th></tr></thead>
          <tbody>
            <tr><td>Aplicativo tem versÃ£o Linux oficial</td><td>Instale em live/VM ou consulte requisitos da versÃ£o usada</td></tr>
            <tr><td>Trabalho Ã© feito no navegador</td><td>Teste navegador, impressÃ£o, cÃ¢mera, certificado e upload/download</td></tr>
            <tr><td>HÃ¡ equivalente livre</td><td>Teste compatibilidade de arquivos e recursos, nÃ£o apenas aparÃªncia</td></tr>
            <tr><td>Software Ã© exclusivo do Windows</td><td>Avalie manter Windows, dual boot, VM ou estaÃ§Ã£o separada</td></tr>
          </tbody>
        </table>
        <p>Camadas de compatibilidade podem funcionar em alguns programas, mas nÃ£o devem ser tratadas como garantia para software crÃ­tico. Se o fornecedor nÃ£o dÃ¡ suporte ao cenÃ¡rio, documente o risco antes de depender dele em produÃ§Ã£o.</p>

        <h2>5. Jogos e GPU exigem teste especÃ­fico</h2>
        <p>A compatibilidade de jogos muda com frequÃªncia e depende do tÃ­tulo, anti-cheat, driver e GPU. Pesquise o jogo atual, nÃ£o uma lista antiga. Para placas de vÃ­deo que usam driver proprietÃ¡rio, confira a documentaÃ§Ã£o da distribuiÃ§Ã£o e do fabricante. A prÃ³pria documentaÃ§Ã£o do Ubuntu observa que a sessÃ£o live pode nÃ£o incluir todos os drivers proprietÃ¡rios disponÃ­veis apÃ³s a instalaÃ§Ã£o.</p>

        <h2>6. Backup antes de qualquer alteraÃ§Ã£o no disco</h2>
        <p>A documentaÃ§Ã£o do Ubuntu recomenda backup antes da instalaÃ§Ã£o. FaÃ§a uma cÃ³pia independente dos arquivos e confirme que consegue abri-la. Se Windows usa BitLocker e vocÃª pretende instalar lado a lado no mesmo disco, guarde a chave de recuperaÃ§Ã£o e leia o aviso do instalador: o Ubuntu nÃ£o consegue manipular com seguranÃ§a uma instalaÃ§Ã£o Windows criptografada por BitLocker sem os passos apropriados.</p>
        <p>Use o <Link to="/ferramentas/checklist-antes-de-formatar" className="text-accent">checklist antes de formatar</Link> para nÃ£o esquecer arquivos, contas e chaves.</p>

        <h2>7. Dual boot, mÃ¡quina virtual ou migraÃ§Ã£o total?</h2>
        <ul>
          <li><strong>MigraÃ§Ã£o total:</strong> melhor quando todo o fluxo jÃ¡ foi validado e vocÃª quer simplificar manutenÃ§Ã£o.</li>
          <li><strong>Dual boot:</strong> Ãºtil quando precisa de desempenho nativo nos dois sistemas, mas aumenta complexidade de partiÃ§Ãµes e boot.</li>
          <li><strong>MÃ¡quina virtual:</strong> boa para uso ocasional de outro sistema quando hardware tem recursos suficientes e o aplicativo funciona virtualizado.</li>
          <li><strong>WSL:</strong> alternativa para quem quer ferramentas Linux mantendo Windows como sistema principal; nÃ£o substitui um desktop Linux completo.</li>
        </ul>

        <h2>8. Plano de teste em 30â€“60 minutos</h2>
        <ol>
          <li>Inicialize uma distribuiÃ§Ã£o suportada por USB no modo de teste.</li>
          <li>Conecte Wi-Fi/Ethernet e teste Ã¡udio, cÃ¢mera, Bluetooth e suspensÃ£o.</li>
          <li>Abra os principais formatos de arquivo que vocÃª usa.</li>
          <li>Valide impressora/scanner e perifÃ©ricos essenciais.</li>
          <li>Confira se seus serviÃ§os web e autenticaÃ§Ã£o funcionam.</li>
          <li>Liste o que ainda depende do Windows antes de decidir instalar.</li>
        </ol>

        <h2>Quando nÃ£o migrar ainda</h2>
        <p>Adie a troca se vocÃª nÃ£o tem backup, depende de software sem alternativa validada, precisa de suporte oficial do fornecedor apenas no Windows ou nÃ£o consegue testar um perifÃ©rico crÃ­tico. MigraÃ§Ã£o Ã© uma decisÃ£o de compatibilidade e continuidade, nÃ£o um exercÃ­cio de preferÃªncia.</p>

        <h2>Quando procurar ajuda</h2>
        <p>PeÃ§a apoio antes de reparticionar se o computador usa BitLocker, RAID, mÃºltiplos discos, boot corporativo, criptografia ou dados sem cÃ³pia. TambÃ©m vale revisÃ£o quando vocÃª quer dual boot e nÃ£o entende a diferenÃ§a entre partiÃ§Ã£o de sistema, partiÃ§Ã£o de dados e boot UEFI.</p>

        <p>Para entender o que cada sistema faz e como o hardware participa da decisÃ£o, continue no <Link to="/guia-tecnico-informatica#tema-sistemas-operacionais" className="text-accent">Atlas de sistemas operacionais</Link>.</p>
        <EditorialReferences slug="trocar-windows-por-linux-vale-a-pena" />
      </>
    ),
  },

  "linux-para-pc-antigo-leve-rapido": {
    title: "Linux Para PC Antigo: 5 Distros Leves Que Ressuscitam Seu Computador",
    excerpt: "Distros leves para mÃ¡quinas com pouca RAM.",
    date: "2026-04-13",
    readTime: "9 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">Seu computador antigo estÃ¡ jogado no canto porque "nÃ£o roda mais nada"? Antes de jogÃ¡-lo fora, experimente <strong>instalar Linux</strong>. Com a distribuiÃ§Ã£o certa, mÃ¡quinas com 1-2 GB de RAM voltam a funcionar perfeitamente para tarefas do dia a dia.</p>

        <h2>1. Lubuntu â€” O Ubuntu Ultraleve</h2>
        <ul>
          <li><strong>Interface:</strong> LXQt (leve e funcional)</li>
          <li><strong>RAM mÃ­nima:</strong> 1 GB (recomendado 2 GB)</li>
          <li><strong>Disco mÃ­nimo:</strong> 8 GB</li>
          <li>Baseado no Ubuntu â€” mesmos repositÃ³rios e suporte</li>
          <li>Ideal para netbooks e PCs com Celeron/Atom</li>
        </ul>

        <h2>2. Linux Lite â€” Feito Para Ex-UsuÃ¡rios Windows</h2>
        <ul>
          <li><strong>Interface:</strong> Xfce customizada (parece Windows)</li>
          <li><strong>RAM mÃ­nima:</strong> 1 GB (recomendado 2 GB)</li>
          <li>JÃ¡ vem com Chrome, LibreOffice e VLC</li>
          <li>AtualizaÃ§Ãµes simples com interface grÃ¡fica</li>
          <li>DocumentaÃ§Ã£o toda em linguagem acessÃ­vel</li>
        </ul>

        <h2>3. Xubuntu â€” EquilÃ­brio Perfeito</h2>
        <ul>
          <li><strong>Interface:</strong> Xfce (leve mas bonita)</li>
          <li><strong>RAM mÃ­nima:</strong> 1.5 GB (recomendado 2 GB)</li>
          <li>Mais bonito que Lubuntu, mais leve que Ubuntu</li>
          <li>Excelente para escritÃ³rio e navegaÃ§Ã£o</li>
        </ul>

        <h2>4. Peppermint OS â€” Focado em Web Apps</h2>
        <ul>
          <li><strong>Interface:</strong> Xfce com integraÃ§Ã£o web</li>
          <li><strong>RAM mÃ­nima:</strong> 1 GB</li>
          <li>Transforma sites em "apps" (Gmail, Google Docs, etc.)</li>
          <li>Ideal para quem usa tudo no navegador</li>
        </ul>

        <h2>5. antiX â€” O Mais Leve de Todos</h2>
        <ul>
          <li><strong>Interface:</strong> IceWM / Fluxbox</li>
          <li><strong>RAM mÃ­nima:</strong> 256 MB (!)</li>
          <li><strong>Disco mÃ­nimo:</strong> 3 GB</li>
          <li>Roda em Pentium III e Pentium 4</li>
          <li>Interface minimalista, mas totalmente funcional</li>
        </ul>

        <h2>Comparativo de Consumo de RAM</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr><th className="text-left p-2 border-b">Sistema</th><th className="text-left p-2 border-b">RAM em Repouso</th></tr></thead>
            <tbody>
              <tr><td className="p-2 border-b">Windows 11</td><td className="p-2 border-b">3.5 - 4.5 GB</td></tr>
              <tr><td className="p-2 border-b">Windows 10</td><td className="p-2 border-b">2.5 - 3.5 GB</td></tr>
              <tr><td className="p-2 border-b">Ubuntu (GNOME)</td><td className="p-2 border-b">1.2 - 1.8 GB</td></tr>
              <tr><td className="p-2 border-b">Xubuntu (Xfce)</td><td className="p-2 border-b">600 - 900 MB</td></tr>
              <tr><td className="p-2 border-b">Lubuntu (LXQt)</td><td className="p-2 border-b">400 - 600 MB</td></tr>
              <tr><td className="p-2 border-b">antiX (IceWM)</td><td className="p-2 border-b">150 - 250 MB</td></tr>
            </tbody>
          </table>
        </div>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Ressuscite Seu PC Antigo</h3>
          <p className="text-muted-foreground mb-0">Instalamos a melhor distro Linux para o seu hardware antigo. Seu computador volta a funcionar sem gastar com equipamento novo.</p>
        </div>
      </>
    ),
  },
  "como-configurar-servidor-web-apache-nginx-linux": {
    title: "Como Configurar Servidor Web Apache e Nginx no Linux: Guia Completo",
    excerpt: "Passo a passo para instalar e configurar Apache e Nginx no Ubuntu/Debian e CentOS/Fedora.",
    date: "2026-04-13",
    readTime: "15 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">Hospedar sites e aplicaÃ§Ãµes web no Linux Ã© uma das tarefas mais comuns para administradores de sistemas. Neste guia, cobrimos <strong>Apache e Nginx</strong> â€” os dois servidores web mais usados no mundo â€” com instalaÃ§Ã£o, configuraÃ§Ã£o, virtual hosts, SSL e otimizaÃ§Ã£o de performance.</p>

        <h2>Apache vs Nginx: Qual Escolher?</h2>
        <p>Ambos sÃ£o excelentes, mas tÃªm perfis diferentes:</p>
        <ul>
          <li><strong>Apache:</strong> Mais antigo, altamente configurÃ¡vel via .htaccess, ideal para hospedagem compartilhada e aplicaÃ§Ãµes PHP tradicionais (WordPress, Laravel)</li>
          <li><strong>Nginx:</strong> Mais leve, orientado a eventos, excelente como proxy reverso e para servir conteÃºdo estÃ¡tico. Usado por Netflix, Cloudflare e WordPress.com</li>
          <li><strong>RecomendaÃ§Ã£o:</strong> para sites PHP simples, Apache. Para alta performance e proxy reverso, Nginx. Para o melhor dos dois mundos, Nginx como proxy + Apache como backend</li>
        </ul>

        <h2>Instalando Apache no Ubuntu/Debian</h2>
        <pre><code>{`sudo apt update
sudo apt install apache2 -y
sudo systemctl enable apache2
sudo systemctl start apache2

# Verificar status
sudo systemctl status apache2

# Testar no navegador: http://IP-DO-SERVIDOR
# Deve aparecer a pÃ¡gina padrÃ£o do Apache`}</code></pre>

        <h2>Configurando Virtual Hosts no Apache</h2>
        <p>Virtual Hosts permitem hospedar mÃºltiplos sites no mesmo servidor:</p>
        <pre><code>{`# Criar diretÃ³rio do site
sudo mkdir -p /var/www/meusite.com.br/html
sudo chown -R $USER:$USER /var/www/meusite.com.br

# Criar arquivo de configuraÃ§Ã£o
sudo nano /etc/apache2/sites-available/meusite.com.br.conf`}</code></pre>
        <pre><code>{`<VirtualHost *:80>
    ServerName meusite.com.br
    ServerAlias www.meusite.com.br
    DocumentRoot /var/www/meusite.com.br/html
    ErrorLog \${APACHE_LOG_DIR}/meusite-error.log
    CustomLog \${APACHE_LOG_DIR}/meusite-access.log combined
    
    <Directory /var/www/meusite.com.br/html>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>`}</code></pre>
        <pre><code>{`# Ativar o site e desativar o padrÃ£o
sudo a2ensite meusite.com.br.conf
sudo a2dissite 000-default.conf
sudo a2enmod rewrite
sudo systemctl reload apache2`}</code></pre>

        <h2>Instalando Nginx no Ubuntu/Debian</h2>
        <pre><code>{`sudo apt update
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx

# Verificar: http://IP-DO-SERVIDOR
# PÃ¡gina "Welcome to nginx!" deve aparecer`}</code></pre>

        <h2>Configurando Server Blocks no Nginx</h2>
        <pre><code>{`sudo mkdir -p /var/www/meusite.com.br/html
sudo nano /etc/nginx/sites-available/meusite.com.br`}</code></pre>
        <pre><code>{`server {
    listen 80;
    server_name meusite.com.br www.meusite.com.br;
    root /var/www/meusite.com.br/html;
    index index.html index.php;

    location / {
        try_files $uri $uri/ =404;
    }

    # Para PHP (com php-fpm)
    location ~ \\.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
    }

    # Bloquear acesso a .htaccess
    location ~ /\\.ht {
        deny all;
    }
}`}</code></pre>
        <pre><code>{`sudo ln -s /etc/nginx/sites-available/meusite.com.br /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx`}</code></pre>

        <h2>SSL Gratuito com Let's Encrypt</h2>
        <pre><code>{`# Instalar Certbot
sudo apt install certbot python3-certbot-apache -y  # Para Apache
sudo apt install certbot python3-certbot-nginx -y   # Para Nginx

# Gerar certificado
sudo certbot --apache -d meusite.com.br -d www.meusite.com.br
# ou
sudo certbot --nginx -d meusite.com.br -d www.meusite.com.br

# RenovaÃ§Ã£o automÃ¡tica (jÃ¡ configurada via cron/timer)
sudo certbot renew --dry-run`}</code></pre>

        <h2>Nginx como Proxy Reverso (Node.js, Python, etc.)</h2>
        <pre><code>{`server {
    listen 80;
    server_name app.meusite.com.br;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}`}</code></pre>

        <h2>OtimizaÃ§Ã£o de Performance</h2>
        <ul>
          <li><strong>Gzip:</strong> comprima respostas para reduzir trÃ¡fego em 60-80%</li>
          <li><strong>Cache de arquivos estÃ¡ticos:</strong> configure headers Expires e Cache-Control</li>
          <li><strong>Worker processes (Nginx):</strong> ajuste para o nÃºmero de cores da CPU</li>
          <li><strong>KeepAlive:</strong> mantenha conexÃµes abertas para mÃºltiplas requisiÃ§Ãµes</li>
          <li><strong>HTTP/2:</strong> ative para multiplexaÃ§Ã£o e melhor performance</li>
        </ul>

        <h2>SeguranÃ§a Essencial</h2>
        <ul>
          <li>Desabilite listagem de diretÃ³rios (<code>Options -Indexes</code> no Apache)</li>
          <li>Oculte a versÃ£o do servidor (<code>ServerTokens Prod</code> / <code>server_tokens off</code>)</li>
          <li>Configure headers de seguranÃ§a: X-Frame-Options, X-Content-Type-Options, CSP</li>
          <li>Use fail2ban para proteger contra brute-force</li>
          <li>Mantenha tudo atualizado: <code>sudo apt update && sudo apt upgrade</code></li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Precisa Configurar um Servidor Web?</h3>
          <p className="text-muted-foreground mb-0">Configuramos servidores Apache e Nginx para empresas em Curitiba e regiÃ£o. Desde a instalaÃ§Ã£o atÃ© SSL, proxy reverso e otimizaÃ§Ã£o de performance.</p>
        </div>
      </>
    ),
  },
  "como-gerenciar-pacotes-apt-dnf-linux": {
    title: "Como Gerenciar Pacotes no Linux com APT e DNF: Guia Completo",
    excerpt: "Domine os gerenciadores de pacotes APT (Debian/Ubuntu) e DNF (Fedora/RHEL) com exemplos prÃ¡ticos.",
    date: "2026-04-13",
    readTime: "12 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">No Linux, instalar, atualizar e remover programas Ã© feito pelo <strong>gerenciador de pacotes</strong>. Entender APT e DNF Ã© fundamental para qualquer administrador Linux. Neste guia, cobrimos desde o bÃ¡sico atÃ© tÃ©cnicas avanÃ§adas como pinning, repositÃ³rios de terceiros e resoluÃ§Ã£o de dependÃªncias.</p>

        <h2>APT â€” Debian, Ubuntu, Mint e Derivados</h2>
        <p>O APT (Advanced Package Tool) Ã© o gerenciador padrÃ£o das distribuiÃ§Ãµes baseadas em Debian â€” as mais populares do mundo.</p>

        <h3>Comandos Essenciais do APT</h3>
        <pre><code>{`# Atualizar lista de pacotes disponÃ­veis
sudo apt update

# Atualizar todos os pacotes instalados
sudo apt upgrade -y

# AtualizaÃ§Ã£o completa (inclui remoÃ§Ã£o de pacotes obsoletos)
sudo apt full-upgrade -y

# Instalar um pacote
sudo apt install nome-do-pacote -y

# Instalar mÃºltiplos pacotes
sudo apt install nginx php mysql-server -y

# Remover pacote (mantÃ©m configs)
sudo apt remove nome-do-pacote

# Remover pacote + configuraÃ§Ãµes
sudo apt purge nome-do-pacote

# Remover dependÃªncias Ã³rfÃ£s
sudo apt autoremove -y

# Buscar pacotes
apt search "servidor web"

# Ver informaÃ§Ãµes de um pacote
apt show nginx

# Listar pacotes instalados
apt list --installed

# Ver pacotes atualizÃ¡veis
apt list --upgradable`}</code></pre>

        <h3>Gerenciando RepositÃ³rios</h3>
        <pre><code>{`# Adicionar repositÃ³rio PPA (Ubuntu)
sudo add-apt-repository ppa:ondrej/php
sudo apt update

# Adicionar repositÃ³rio manualmente
echo "deb http://repo.exemplo.com/ubuntu jammy main" | sudo tee /etc/apt/sources.list.d/exemplo.list

# Adicionar chave GPG do repositÃ³rio
curl -fsSL https://repo.exemplo.com/key.gpg | sudo gpg --dearmor -o /etc/apt/keyrings/exemplo.gpg

# Remover PPA
sudo add-apt-repository --remove ppa:ondrej/php`}</code></pre>

        <h3>APT Pinning â€” Prioridade de VersÃµes</h3>
        <pre><code>{`# /etc/apt/preferences.d/firefox
Package: firefox
Pin: release a=jammy-security
Pin-Priority: 1000`}</code></pre>
        <p>O pinning permite favaliar o valor uma versÃ£o especÃ­fica de um pacote, Ãºtil quando vocÃª precisa manter uma versÃ£o estÃ¡vel mesmo com repositÃ³rios mais novos adicionados.</p>

        <h2>DNF â€” Fedora, RHEL, CentOS Stream, AlmaLinux</h2>
        <p>O DNF (Dandified YUM) Ã© o gerenciador padrÃ£o da famÃ­lia Red Hat â€” dominante em servidores corporativos.</p>

        <h3>Comandos Essenciais do DNF</h3>
        <pre><code>{`# Atualizar lista + instalar atualizaÃ§Ãµes
sudo dnf upgrade -y

# Instalar pacote
sudo dnf install nginx -y

# Remover pacote
sudo dnf remove nginx

# Buscar pacotes
dnf search "servidor web"

# Ver informaÃ§Ãµes
dnf info nginx

# Listar instalados
dnf list installed

# Ver histÃ³rico de transaÃ§Ãµes
dnf history

# Desfazer Ãºltima transaÃ§Ã£o
sudo dnf history undo last

# Limpar cache
sudo dnf clean all

# Instalar grupo de pacotes
sudo dnf groupinstall "Development Tools"

# Listar grupos disponÃ­veis
dnf grouplist`}</code></pre>

        <h3>RepositÃ³rios no DNF</h3>
        <pre><code>{`# Habilitar repositÃ³rio EPEL (Enterprise Linux)
sudo dnf install epel-release -y

# Adicionar RPM Fusion (codecs e drivers)
sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm

# Listar repositÃ³rios
dnf repolist

# Desabilitar um repositÃ³rio temporariamente
sudo dnf --disablerepo=epel install pacote`}</code></pre>

        <h2>Comparativo APT vs DNF</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr><th className="text-left p-2 border-b">AÃ§Ã£o</th><th className="text-left p-2 border-b">APT</th><th className="text-left p-2 border-b">DNF</th></tr></thead>
            <tbody>
              <tr><td className="p-2 border-b">Atualizar lista</td><td className="p-2 border-b">apt update</td><td className="p-2 border-b">(automÃ¡tico)</td></tr>
              <tr><td className="p-2 border-b">Atualizar tudo</td><td className="p-2 border-b">apt upgrade</td><td className="p-2 border-b">dnf upgrade</td></tr>
              <tr><td className="p-2 border-b">Instalar</td><td className="p-2 border-b">apt install pkg</td><td className="p-2 border-b">dnf install pkg</td></tr>
              <tr><td className="p-2 border-b">Remover</td><td className="p-2 border-b">apt remove pkg</td><td className="p-2 border-b">dnf remove pkg</td></tr>
              <tr><td className="p-2 border-b">Buscar</td><td className="p-2 border-b">apt search</td><td className="p-2 border-b">dnf search</td></tr>
              <tr><td className="p-2 border-b">Desfazer</td><td className="p-2 border-b">âŒ</td><td className="p-2 border-b">dnf history undo</td></tr>
              <tr><td className="p-2 border-b">Formato</td><td className="p-2 border-b">.deb</td><td className="p-2 border-b">.rpm</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Flatpak e Snap â€” Alternativas Universais</h2>
        <p>AlÃ©m de APT e DNF, existem formatos universais que funcionam em qualquer distro:</p>
        <ul>
          <li><strong>Flatpak:</strong> sandbox seguro, usado pelo GNOME Software. Ideal para apps desktop (Firefox, LibreOffice, VLC)</li>
          <li><strong>Snap:</strong> desenvolvido pela Canonical. AtualizaÃ§Ãµes automÃ¡ticas, mas mais pesado que Flatpak</li>
          <li><strong>AppImage:</strong> executÃ¡vel portÃ¡til sem instalaÃ§Ã£o. Basta dar permissÃ£o e executar</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Suporte Linux Para Sua Empresa</h3>
          <p className="text-muted-foreground mb-0">Gerenciamos servidores Linux, configuramos repositÃ³rios e mantemos seus sistemas atualizados e seguros. Atendimento em Curitiba e regiÃ£o.</p>
        </div>
      </>
    ),
  },
  "como-configurar-ssh-seguro-linux": {
    title: "Como Configurar SSH Seguro no Linux: Guia Anti-InvasÃ£o",
    excerpt: "Hardening completo do SSH: chaves, fail2ban, porta customizada e autenticaÃ§Ã£o de dois fatores.",
    date: "2026-04-13",
    readTime: "13 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">O SSH (Secure Shell) Ã© a porta de entrada para administrar servidores Linux remotamente â€” e tambÃ©m o alvo nÃºmero 1 de atacantes. Neste guia, mostramos como configurar o SSH de forma <strong>realmente segura</strong>, com autenticaÃ§Ã£o por chaves, fail2ban, porta customizada e MFA.</p>

        <h2>Por Que a ConfiguraÃ§Ã£o PadrÃ£o do SSH Ã© Insegura?</h2>
        <ul>
          <li>Porta 22 Ã© escaneada automaticamente por bots 24/7</li>
          <li>Login por senha permite ataques de forÃ§a bruta</li>
          <li>Root com acesso direto Ã© um risco crÃ­tico</li>
          <li>Sem rate-limiting, um bot pode testar milhares de senhas por minuto</li>
        </ul>
        <p>Um servidor na internet sem hardening recebe <strong>centenas de tentativas de login por hora</strong>. Veja como se proteger:</p>

        <h2>Passo 1: Gerar Par de Chaves SSH</h2>
        <p>AutenticaÃ§Ã£o por chaves Ã© infinitamente mais segura que senhas:</p>
        <pre><code>{`# No seu computador local (nÃ£o no servidor!)
ssh-keygen -t ed25519 -C "seu-email@exemplo.com"

# Vai gerar:
# ~/.ssh/id_ed25519       (chave privada - NUNCA compartilhe!)
# ~/.ssh/id_ed25519.pub   (chave pÃºblica - copie para o servidor)

# Copiar chave pÃºblica para o servidor
ssh-copy-id usuario@IP-DO-SERVIDOR

# Testar conexÃ£o com chave
ssh usuario@IP-DO-SERVIDOR
# Deve conectar sem pedir senha`}</code></pre>

        <h2>Passo 2: Hardening do sshd_config</h2>
        <pre><code>{`sudo nano /etc/ssh/sshd_config

# Altere as seguintes linhas:
Port 2222                          # Porta customizada (evita 99% dos bots)
PermitRootLogin no                 # Bloqueia login como root
PasswordAuthentication no          # Desabilita login por senha
PubkeyAuthentication yes           # Somente chaves SSH
MaxAuthTries 3                     # MÃ¡ximo de tentativas
LoginGraceTime 30                  # Tempo mÃ¡ximo para autenticar
ClientAliveInterval 300            # Desconecta sessÃµes ociosas
ClientAliveCountMax 2              # ApÃ³s 2 pings sem resposta
AllowUsers seuusuario              # Somente usuÃ¡rios especÃ­ficos
Protocol 2                         # Somente protocolo SSH2
X11Forwarding no                   # Desabilita X11 (desnecessÃ¡rio)
PermitEmptyPasswords no            # Bloqueia senhas vazias

# Reiniciar SSH (mantenha a sessÃ£o atual aberta!)
sudo systemctl restart sshd`}</code></pre>
        <p className="text-sm text-muted-foreground"><strong>âš ï¸ IMPORTANTE:</strong> Antes de reiniciar o SSH, abra uma segunda sessÃ£o SSH para testar. Se algo der errado, vocÃª ainda terÃ¡ acesso pela sessÃ£o original.</p>

        <h2>Passo 3: Instalar fail2ban</h2>
        <p>O fail2ban monitora logs e bane IPs que tentam forÃ§a bruta:</p>
        <pre><code>{`sudo apt install fail2ban -y  # Debian/Ubuntu
sudo dnf install fail2ban -y  # Fedora/RHEL

# Criar configuraÃ§Ã£o local
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local`}</code></pre>
        <pre><code>{`[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
findtime = 600`}</code></pre>
        <pre><code>{`sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Ver IPs banidos
sudo fail2ban-client status sshd`}</code></pre>

        <h2>Passo 4: Firewall (UFW)</h2>
        <pre><code>{`# Permitir apenas a porta SSH customizada
sudo ufw allow 2222/tcp
sudo ufw enable

# Verificar regras
sudo ufw status verbose`}</code></pre>

        <h2>Passo 5: AutenticaÃ§Ã£o de Dois Fatores (MFA)</h2>
        <pre><code>{`sudo apt install libpam-google-authenticator -y

# Configurar para seu usuÃ¡rio
google-authenticator
# Responda: y, y, y, n, y
# Escaneie o QR code com Google Authenticator ou Authy

# Editar PAM
sudo nano /etc/pam.d/sshd
# Adicionar no final:
auth required pam_google_authenticator.so

# Editar sshd_config
sudo nano /etc/ssh/sshd_config
# Alterar:
ChallengeResponseAuthentication yes
AuthenticationMethods publickey,keyboard-interactive

sudo systemctl restart sshd`}</code></pre>

        <h2>Checklist de SeguranÃ§a SSH</h2>
        <ul>
          <li>âœ… Porta customizada (nÃ£o 22)</li>
          <li>âœ… AutenticaÃ§Ã£o somente por chaves</li>
          <li>âœ… Root login desabilitado</li>
          <li>âœ… fail2ban ativo e configurado</li>
          <li>âœ… Firewall permitindo apenas portas necessÃ¡rias</li>
          <li>âœ… MFA habilitado (para ambientes crÃ­ticos)</li>
          <li>âœ… Logs monitorados regularmente</li>
          <li>âœ… AtualizaÃ§Ãµes de seguranÃ§a automÃ¡ticas</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Precisa Proteger Seu Servidor?</h3>
          <p className="text-muted-foreground mb-0">Fazemos hardening completo de servidores Linux: SSH, firewall, fail2ban, atualizaÃ§Ãµes automÃ¡ticas e monitoramento. Consultoria tÃ©cnica em Curitiba e remoto.</p>
        </div>
      </>
    ),
  },
  "como-usar-docker-linux-guia-completo": {
    title: "Como Usar Docker no Linux: Guia Completo Para Iniciantes e TÃ©cnicos",
    excerpt: "InstalaÃ§Ã£o, containers, Docker Compose, volumes, redes e boas prÃ¡ticas para ambientes de produÃ§Ã£o.",
    date: "2026-04-13",
    readTime: "16 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">O Docker revolucionou a forma como deployamos aplicaÃ§Ãµes. Em vez de instalar tudo diretamente no servidor, vocÃª empacota a aplicaÃ§Ã£o + dependÃªncias em um <strong>container</strong> isolado e portÃ¡til. Neste guia, cobrimos desde a instalaÃ§Ã£o atÃ© Docker Compose para ambientes de produÃ§Ã£o.</p>

        <h2>O Que Ã© Docker e Por Que Usar?</h2>
        <ul>
          <li><strong>Isolamento:</strong> cada container tem seu prÃ³prio sistema de arquivos, rede e processos</li>
          <li><strong>Portabilidade:</strong> "funciona na minha mÃ¡quina" vira "funciona em qualquer lugar"</li>
          <li><strong>Reprodutibilidade:</strong> Dockerfile define exatamente o ambiente necessÃ¡rio</li>
          <li><strong>EficiÃªncia:</strong> containers sÃ£o mais leves que VMs â€” inicializam em segundos</li>
          <li><strong>Versionamento:</strong> imagens tÃªm tags, permitindo rollback fÃ¡cil</li>
        </ul>

        <h2>Instalando Docker no Ubuntu/Debian</h2>
        <pre><code>{`# Remover versÃµes antigas
sudo apt remove docker docker-engine docker.io containerd runc

# Instalar dependÃªncias
sudo apt update
sudo apt install ca-certificates curl gnupg -y

# Adicionar repositÃ³rio oficial Docker
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

# Adicionar usuÃ¡rio ao grupo docker (evita sudo)
sudo usermod -aG docker $USER
newgrp docker

# Verificar instalaÃ§Ã£o
docker --version
docker run hello-world`}</code></pre>

        <h2>Instalando Docker no Fedora/RHEL</h2>
        <pre><code>{`sudo dnf install dnf-plugins-core -y
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
sudo dnf install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER`}</code></pre>

        <h2>Comandos Essenciais do Docker</h2>
        <pre><code>{`# Baixar imagem
docker pull nginx:latest

# Listar imagens
docker images

# Rodar container
docker run -d --name meu-nginx -p 8080:80 nginx

# Listar containers rodando
docker ps

# Listar todos (incluindo parados)
docker ps -a

# Ver logs do container
docker logs meu-nginx

# Acessar terminal do container
docker exec -it meu-nginx bash

# Parar container
docker stop meu-nginx

# Remover container
docker rm meu-nginx

# Remover imagem
docker rmi nginx

# Limpar tudo nÃ£o utilizado
docker system prune -a`}</code></pre>

        <h2>Criando Seu PrÃ³prio Dockerfile</h2>
        <pre><code>{`# Dockerfile para aplicaÃ§Ã£o Node.js
FROM node:20-alpine

WORKDIR /app

# Copiar package.json primeiro (cache de camadas)
COPY package*.json ./
RUN npm ci --production

# Copiar cÃ³digo
COPY . .

# Expor porta
EXPOSE 3000

# Comando de inicializaÃ§Ã£o
CMD ["node", "server.js"]`}</code></pre>
        <pre><code>{`# Buildar a imagem
docker build -t minha-app:1.0 .

# Rodar
docker run -d -p 3000:3000 --name app minha-app:1.0`}</code></pre>

        <h2>Docker Compose â€” MÃºltiplos Containers</h2>
        <p>Docker Compose orquestra mÃºltiplos containers com um Ãºnico arquivo:</p>
        <pre><code>{`# docker-compose.yml
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./site:/usr/share/nginx/html
    depends_on:
      - app
    restart: unless-stopped

  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    restart: unless-stopped

volumes:
  postgres_data:`}</code></pre>
        <pre><code>{`# Subir todos os serviÃ§os
docker compose up -d

# Ver status
docker compose ps

# Ver logs
docker compose logs -f

# Parar tudo
docker compose down

# Parar e remover volumes (âš ï¸ apaga dados)
docker compose down -v`}</code></pre>

        <h2>Volumes â€” PersistÃªncia de Dados</h2>
        <pre><code>{`# Volume nomeado (gerenciado pelo Docker)
docker run -d -v meus-dados:/var/lib/mysql mysql

# Bind mount (mapeamento direto)
docker run -d -v /home/user/site:/usr/share/nginx/html nginx

# Listar volumes
docker volume ls

# Inspecionar volume
docker volume inspect meus-dados`}</code></pre>

        <h2>Redes no Docker</h2>
        <pre><code>{`# Criar rede customizada
docker network create minha-rede

# Rodar containers na mesma rede
docker run -d --name app --network minha-rede minha-app
docker run -d --name db --network minha-rede postgres

# Containers na mesma rede se comunicam pelo nome!
# app pode acessar db via: postgresql://db:5432`}</code></pre>

        <h2>Boas PrÃ¡ticas Para ProduÃ§Ã£o</h2>
        <ul>
          <li><strong>Use imagens Alpine:</strong> muito menores (5 MB vs 100+ MB)</li>
          <li><strong>Multi-stage build:</strong> compile em uma imagem, rode em outra menor</li>
          <li><strong>NÃ£o rode como root:</strong> use <code>USER</code> no Dockerfile</li>
          <li><strong>Limite recursos:</strong> <code>--memory=512m --cpus=1</code></li>
          <li><strong>Use .dockerignore:</strong> evite copiar node_modules, .git, etc.</li>
          <li><strong>Tags especÃ­ficas:</strong> use <code>nginx:1.25-alpine</code> em vez de <code>nginx:latest</code></li>
          <li><strong>Health checks:</strong> configure <code>HEALTHCHECK</code> no Dockerfile</li>
          <li><strong>Logs centralizados:</strong> use driver de log do Docker ou ferramenta externa</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Precisa de Ajuda com Docker?</h3>
          <p className="text-muted-foreground mb-0">Configuramos ambientes Docker para empresas em Curitiba: desde a instalaÃ§Ã£o atÃ© orquestraÃ§Ã£o com Compose, redes customizadas e deploy em produÃ§Ã£o.</p>
        </div>
      </>
    ),
  },
  "inteligencia-artificial-evolucao-historia": {
    title: "A EvoluÃ§Ã£o da InteligÃªncia Artificial: De Turing ao ChatGPT",
    excerpt: "Uma jornada pela histÃ³ria da IA.",
    date: "2026-04-13",
    readTime: "13 min",
    category: "InteligÃªncia Artificial",
    content: (
      <>
        <p className="lead">A InteligÃªncia Artificial nÃ£o nasceu com o ChatGPT. SÃ£o <strong>mais de 70 anos de pesquisa</strong>, desde os primeiros conceitos teÃ³ricos atÃ© os modelos generativos que transformam o mundo em 2026. ConheÃ§a essa histÃ³ria fascinante.</p>

        <h2>1950 â€” O Teste de Turing</h2>
        <p>Alan Turing publicou o artigo "Computing Machinery and Intelligence", propondo a pergunta: <strong>"As mÃ¡quinas podem pensar?"</strong>. O Teste de Turing propÃµe que uma mÃ¡quina Ã© "inteligente" se um humano nÃ£o conseguir distinguir suas respostas das de outro humano. Esse conceito guia a pesquisa em IA atÃ© hoje.</p>

        <h2>1956 â€” Nasce o Termo "InteligÃªncia Artificial"</h2>
        <p>Na conferÃªncia de Dartmouth, John McCarthy cunhou oficialmente o termo. Pesquisadores acreditavam que em 20 anos terÃ­amos mÃ¡quinas tÃ£o inteligentes quanto humanos. Estavam otimistas demais â€” mas a semente foi plantada.</p>

        <h2>1960-1970 â€” Primeiros Sistemas Especialistas</h2>
        <p>Programas como ELIZA (1966) simulavam conversas terapÃªuticas. DENDRAL (1969) analisava estruturas moleculares. Eram sistemas baseados em regras â€” "se X, entÃ£o Y" â€” sem aprendizado real.</p>

        <h2>1980-1990 â€” O Inverno da IA</h2>
        <p>Expectativas irreais levaram a cortes de financiamento. A IA ficou "adormecida" por quase duas dÃ©cadas, com avanÃ§os lentos em redes neurais e processamento de linguagem natural.</p>

        <h2>1997 â€” Deep Blue Vence Kasparov</h2>
        <p>O computador da IBM derrotou o campeÃ£o mundial de xadrez Garry Kasparov. NÃ£o era IA no sentido moderno (era forÃ§a bruta computacional), mas mostrou ao mundo que <strong>mÃ¡quinas podiam superar humanos em tarefas complexas</strong>.</p>

        <h2>2012 â€” A RevoluÃ§Ã£o do Deep Learning</h2>
        <p>A rede neural AlexNet venceu a competiÃ§Ã£o ImageNet com precisÃ£o inÃ©dita. Isso inaugurou a era do <strong>deep learning</strong> â€” redes neurais profundas treinadas com grandes volumes de dados. GPU (placas de vÃ­deo) se tornaram essenciais para treinar modelos.</p>

        <h2>2017 â€” Transformers Mudam Tudo</h2>
        <p>O artigo "Attention Is All You Need" do Google introduziu a arquitetura <strong>Transformer</strong>, base de todos os grandes modelos de linguagem atuais: GPT, BERT, LLaMA, Gemini. Essa arquitetura permitiu processar texto de forma paralela, acelerando o treinamento exponencialmente.</p>

        <h2>2022-2026 â€” A Era Generativa</h2>
        <ul>
          <li><strong>ChatGPT (2022)</strong> â€” democratizou o acesso Ã  IA conversacional</li>
          <li><strong>GPT-4 (2023)</strong> â€” multimodal (texto + imagem), raciocÃ­nio avanÃ§ado</li>
          <li><strong>Midjourney / DALL-E</strong> â€” geraÃ§Ã£o de imagens por texto</li>
          <li><strong>GPT-5 (2025)</strong> â€” agentes autÃ´nomos, raciocÃ­nio longo</li>
          <li><strong>Gemini 2.5 (2026)</strong> â€” contexto de 1 milhÃ£o de tokens, multimodal nativo</li>
          <li><strong>IA em dispositivos</strong> â€” modelos rodando localmente em celulares e PCs</li>
        </ul>

        <h2>O Que Vem Pela Frente</h2>
        <p>A tendÃªncia aponta para <strong>agentes de IA</strong> que executam tarefas complexas de forma autÃ´noma: navegar na web, escrever cÃ³digo, gerenciar e-mails. A IA estÃ¡ saindo do "responder perguntas" para "executar aÃ§Ãµes no mundo real".</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Quer Usar IA no Seu NegÃ³cio?</h3>
          <p className="text-muted-foreground mb-0">Ajudamos empresas de Curitiba a implementar ferramentas de IA para produtividade, atendimento e automaÃ§Ã£o.</p>
        </div>
      </>
    ),
  },
  "como-usar-ia-no-dia-a-dia-dicas-praticas": {
    title: "Como Usar IA no Dia a Dia: 15 Dicas PrÃ¡ticas Para Trabalho e Estudo",
    excerpt: "Dicas prÃ¡ticas de IA para o cotidiano.",
    date: "2026-04-13",
    readTime: "12 min",
    category: "InteligÃªncia Artificial",
    content: (
      <>
        <p className="lead">A IA jÃ¡ nÃ£o Ã© coisa do futuro â€” Ã© ferramenta do presente. <strong>Quem nÃ£o usa, estÃ¡ ficando para trÃ¡s.</strong> Veja 15 formas prÃ¡ticas de usar inteligÃªncia artificial no trabalho, nos estudos e no dia a dia.</p>

        <h2>No Trabalho</h2>
        <h3>1. Resumir Documentos Longos</h3>
        <p>Cole um PDF, relatÃ³rio ou artigo no ChatGPT ou Gemini e peÃ§a: "Resuma este documento em 5 pontos principais". Economiza horas de leitura.</p>

        <h3>2. Escrever E-mails Profissionais</h3>
        <p>"Escreva um e-mail educado recusando uma proposta comercial, agradecendo o interesse." A IA ajusta tom, formalidade e estrutura.</p>

        <h3>3. Criar Planilhas e FÃ³rmulas</h3>
        <p>"Crie uma fÃ³rmula Excel que calcule a comissÃ£o de 5% sobre vendas acima de R$ 10.000." Funciona com PROCV, SE, SOMASES e qualquer complexidade.</p>

        <h3>4. Analisar Dados</h3>
        <p>O ChatGPT com Code Interpreter analisa arquivos CSV, cria grÃ¡ficos e identifica tendÃªncias. "Analise esta planilha de vendas e mostre os 3 melhores meses."</p>

        <h3>5. Automatizar Tarefas Repetitivas</h3>
        <p>Use o Microsoft Copilot no Word, Excel e PowerPoint para gerar conteÃºdo, formatar documentos e criar apresentaÃ§Ãµes com um clique.</p>

        <h2>Nos Estudos</h2>
        <h3>6. Explicar Conceitos DifÃ­ceis</h3>
        <p>"Explique cÃ¡lculo integral como se eu tivesse 15 anos." A IA adapta a explicaÃ§Ã£o ao seu nÃ­vel de conhecimento.</p>

        <h3>7. Criar Flashcards e Resumos</h3>
        <p>"Crie 20 flashcards sobre a Segunda Guerra Mundial para vestibular." Perfeito para revisÃ£o rÃ¡pida.</p>

        <h3>8. Corrigir e Melhorar Textos</h3>
        <p>Cole sua redaÃ§Ã£o e peÃ§a: "Corrija erros gramaticais, melhore a coesÃ£o e sugira vocabulÃ¡rio mais sofisticado."</p>

        <h3>9. Simular Entrevistas e Provas</h3>
        <p>"FaÃ§a 10 perguntas de entrevista para vaga de analista financeiro." Ou: "Crie uma prova de biologia sobre genÃ©tica."</p>

        <h2>No Dia a Dia</h2>
        <h3>10. Planejar Viagens</h3>
        <p>"Monte um roteiro de 5 dias em Lisboa com valor do atendimento de R$ 5.000 incluindo passagens." A IA sugere voos, hotÃ©is, restaurantes e pontos turÃ­sticos.</p>

        <h3>11. Receitas com o Que Tem na Geladeira</h3>
        <p>"Tenho frango, batata, cebola e creme de leite. Qual receita posso fazer?" Personalizado e instantÃ¢neo.</p>

        <h3>12. TraduÃ§Ã£o Contextual</h3>
        <p>Muito superior ao Google Tradutor para textos longos. A IA entende contexto, gÃ­rias e expressÃµes idiomÃ¡ticas.</p>

        <h3>13. Gerar Imagens</h3>
        <p>DALL-E, Midjourney e Gemini geram imagens a partir de descriÃ§Ãµes textuais. Ãštil para posts de redes sociais, apresentaÃ§Ãµes e projetos criativos.</p>

        <h3>14. Assistente de SaÃºde (Informativo)</h3>
        <p>"Quais alimentos ajudam a reduzir colesterol?" A IA nÃ£o substitui mÃ©dico, mas Ã© excelente para informaÃ§Ã£o inicial e educaÃ§Ã£o em saÃºde.</p>

        <h3>15. ProgramaÃ§Ã£o e AutomaÃ§Ã£o</h3>
        <p>Mesmo sem saber programar, vocÃª pode pedir: "Crie um script Python que renomeie todos os arquivos de uma pasta adicionando a data." A IA gera cÃ³digo funcional em segundos.</p>

        <h2>Melhores Ferramentas Gratuitas</h2>
        <ul>
          <li><strong>ChatGPT</strong> â€” versÃ£o gratuita com GPT-4o mini</li>
          <li><strong>Google Gemini</strong> â€” integrado ao Google Workspace</li>
          <li><strong>Microsoft Copilot</strong> â€” integrado ao Edge e Office</li>
          <li><strong>Claude</strong> â€” excelente para textos longos e anÃ¡lise</li>
          <li><strong>Perplexity</strong> â€” pesquisa com fontes citadas</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Treinamento de IA Para Empresas</h3>
          <p className="text-muted-foreground mb-0">Oferecemos consultoria e treinamento para equipes que querem integrar IA na rotina de trabalho. Presencial em Curitiba ou remoto.</p>
        </div>
      </>
    ),
  },
  "melhores-ferramentas-ia-gratuitas-2026": {
    title: "Melhores Ferramentas de IA Gratuitas em 2026",
    excerpt: "Lista curada de IAs gratuitas.",
    date: "2026-04-13",
    readTime: "10 min",
    category: "InteligÃªncia Artificial",
    content: (
      <>
        <p className="lead">VocÃª nÃ£o precisa pagar para usar IA de qualidade. Em 2026, as melhores ferramentas oferecem planos gratuitos surpreendentemente capazes. Aqui estÃ¡ a <strong>lista definitiva organizada por categoria</strong>.</p>

        <h2>Texto e ConversaÃ§Ã£o</h2>
        <ul>
          <li><strong>ChatGPT (OpenAI)</strong> â€” GPT-4o mini gratuito, com limite generoso. O mais versÃ¡til.</li>
          <li><strong>Google Gemini</strong> â€” Gemini 2.5 Flash gratuito. Excelente para pesquisa e textos longos.</li>
          <li><strong>Microsoft Copilot</strong> â€” Baseado em GPT-4, gratuito no Edge. Gera imagens tambÃ©m.</li>
          <li><strong>Claude (Anthropic)</strong> â€” Janela de contexto enorme. Melhor para anÃ¡lise de documentos longos.</li>
          <li><strong>Perplexity AI</strong> â€” Pesquisa com IA que cita fontes. Substitui o Google para pesquisas complexas.</li>
        </ul>

        <h2>GeraÃ§Ã£o de Imagens</h2>
        <ul>
          <li><strong>Microsoft Designer (DALL-E 3)</strong> â€” Gratuito via Copilot. Qualidade profissional.</li>
          <li><strong>Leonardo.ai</strong> â€” 150 crÃ©ditos/dia gratuitos. Modelos diversos.</li>
          <li><strong>Ideogram</strong> â€” Excelente para texto em imagens (logotipos, banners).</li>
          <li><strong>Stable Diffusion (local)</strong> â€” 100% gratuito, roda no seu PC com GPU.</li>
        </ul>

        <h2>CÃ³digo e ProgramaÃ§Ã£o</h2>
        <ul>
          <li><strong>GitHub Copilot Free</strong> â€” Autocomplete de cÃ³digo em VS Code. Gratuito para uso pessoal.</li>
          <li><strong>Codeium</strong> â€” Alternativa gratuita ao Copilot, sem limitaÃ§Ãµes.</li>
          <li><strong>Replit AI</strong> â€” IDE online com IA integrada para prototipar rÃ¡pido.</li>
          <li><strong>ChatGPT / Claude</strong> â€” Excelentes para explicar cÃ³digo, debugar e converter entre linguagens.</li>
        </ul>

        <h2>Ãudio e VÃ­deo</h2>
        <ul>
          <li><strong>ElevenLabs</strong> â€” SÃ­ntese de voz com qualidade humana. 10.000 caracteres/mÃªs grÃ¡tis.</li>
          <li><strong>Whisper (OpenAI)</strong> â€” TranscriÃ§Ã£o de Ã¡udio para texto. Open source e gratuito.</li>
          <li><strong>CapCut</strong> â€” EdiÃ§Ã£o de vÃ­deo com legendas automÃ¡ticas por IA.</li>
          <li><strong>Suno.ai</strong> â€” GeraÃ§Ã£o de mÃºsicas com IA a partir de texto.</li>
        </ul>

        <h2>Produtividade</h2>
        <ul>
          <li><strong>Notion AI</strong> â€” Resumos, brainstorm e organizaÃ§Ã£o integrados ao Notion.</li>
          <li><strong>Gamma.app</strong> â€” Gera apresentaÃ§Ãµes profissionais a partir de um prompt.</li>
          <li><strong>Canva Magic</strong> â€” IA integrada para design (remover fundo, gerar imagens, redimensionar).</li>
          <li><strong>Otter.ai</strong> â€” Transcreve reuniÃµes em tempo real.</li>
        </ul>

        <h2>Tabela Resumo</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr><th className="text-left p-2 border-b">Ferramenta</th><th className="text-left p-2 border-b">Categoria</th><th className="text-left p-2 border-b">Limite Gratuito</th></tr></thead>
            <tbody>
              <tr><td className="p-2 border-b">ChatGPT</td><td className="p-2 border-b">Texto</td><td className="p-2 border-b">Ilimitado (GPT-4o mini)</td></tr>
              <tr><td className="p-2 border-b">Gemini</td><td className="p-2 border-b">Texto</td><td className="p-2 border-b">Ilimitado (Flash)</td></tr>
              <tr><td className="p-2 border-b">Leonardo.ai</td><td className="p-2 border-b">Imagem</td><td className="p-2 border-b">150 crÃ©ditos/dia</td></tr>
              <tr><td className="p-2 border-b">Copilot Free</td><td className="p-2 border-b">CÃ³digo</td><td className="p-2 border-b">2000 completions/mÃªs</td></tr>
              <tr><td className="p-2 border-b">ElevenLabs</td><td className="p-2 border-b">Ãudio</td><td className="p-2 border-b">10k chars/mÃªs</td></tr>
              <tr><td className="p-2 border-b">Gamma.app</td><td className="p-2 border-b">ApresentaÃ§Ã£o</td><td className="p-2 border-b">10 decks</td></tr>
            </tbody>
          </table>
        </div>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">ConfiguraÃ§Ã£o de IA no Seu Computador</h3>
          <p className="text-muted-foreground mb-0">Instalamos e configuramos ferramentas de IA no seu PC, incluindo modelos locais como Stable Diffusion e LLMs via Ollama.</p>
        </div>
      </>
    ),
  },
  "ia-para-pequenas-empresas-como-comecar": {
    title: "IA Para Pequenas Empresas: Como ComeÃ§ar Sem Gastar Muito",
    excerpt: "AutomaÃ§Ã£o e IA acessÃ­vel para pequenos negÃ³cios.",
    date: "2026-04-13",
    readTime: "11 min",
    category: "InteligÃªncia Artificial",
    content: (
      <>
        <p className="lead">VocÃª nÃ£o precisa ser uma big tech para usar IA. <strong>Pequenas empresas de Curitiba</strong> jÃ¡ estÃ£o usando inteligÃªncia artificial para atender clientes, criar conteÃºdo e analisar dados â€” muitas vezes de graÃ§a.</p>

        <h2>1. Atendimento ao Cliente com Chatbots</h2>
        <p>Ferramentas como <strong>Tidio</strong>, <strong>ManyChat</strong> e <strong>Chatfuel</strong> permitem criar chatbots para WhatsApp e Instagram que respondem perguntas frequentes 24/7. Resultado: menos tempo respondendo as mesmas perguntas, mais tempo vendendo.</p>
        <p><strong>Custo:</strong> Gratuito atÃ© certo volume, planos a partir de R$ 50/mÃªs.</p>

        <h2>2. GeraÃ§Ã£o de ConteÃºdo Para Redes Sociais</h2>
        <p>Use ChatGPT ou Gemini para criar legendas, carrossÃ©is e ideias de posts. Combine com Canva (que tem IA integrada) para gerar artes profissionais em minutos. Uma semana de conteÃºdo que levava 8 horas agora leva 2.</p>

        <h2>3. E-mail Marketing Inteligente</h2>
        <p>Plataformas como <strong>Mailchimp</strong> e <strong>Brevo</strong> usam IA para otimizar horÃ¡rios de envio, segmentar listas e escrever assuntos que aumentam a taxa de abertura.</p>

        <h2>4. AnÃ¡lise de Dados e RelatÃ³rios</h2>
        <p>Cole sua planilha de vendas no ChatGPT e peÃ§a: "Identifique os 5 produtos mais vendidos, o mÃªs com maior faturamento e a tendÃªncia dos Ãºltimos 6 meses." Insights que custariam horas com um analista.</p>

        <h2>5. TranscriÃ§Ã£o de ReuniÃµes</h2>
        <p><strong>Otter.ai</strong> e <strong>Fireflies.ai</strong> transcrevem reuniÃµes do Zoom/Google Meet automaticamente, geram resumos e listam tarefas pendentes.</p>

        <h2>6. AutomatizaÃ§Ã£o de Processos</h2>
        <p>Use <strong>Zapier</strong> ou <strong>Make</strong> com mÃ³dulos de IA para automatizar fluxos: "Quando receber um e-mail com fatura, extraia o valor e adicione Ã  planilha automaticamente."</p>

        <h2>Quanto Custa Implementar IA?</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr><th className="text-left p-2 border-b">SoluÃ§Ã£o</th><th className="text-left p-2 border-b">Investimento</th><th className="text-left p-2 border-b">Economia Estimada</th></tr></thead>
            <tbody>
              <tr><td className="p-2 border-b">Chatbot WhatsApp</td><td className="p-2 border-b">R$ 0-150/mÃªs</td><td className="p-2 border-b">4-6h/semana</td></tr>
              <tr><td className="p-2 border-b">IA para conteÃºdo</td><td className="p-2 border-b">R$ 0-100/mÃªs</td><td className="p-2 border-b">6-10h/semana</td></tr>
              <tr><td className="p-2 border-b">TranscriÃ§Ã£o de reuniÃµes</td><td className="p-2 border-b">R$ 0-80/mÃªs</td><td className="p-2 border-b">2-3h/semana</td></tr>
              <tr><td className="p-2 border-b">AutomaÃ§Ã£o (Zapier)</td><td className="p-2 border-b">R$ 0-200/mÃªs</td><td className="p-2 border-b">5-8h/semana</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Por Onde ComeÃ§ar?</h2>
        <ol>
          <li><strong>Identifique tarefas repetitivas</strong> â€” o que consome mais tempo da equipe?</li>
          <li><strong>Comece com gratuitos</strong> â€” ChatGPT, Gemini, Canva Free</li>
          <li><strong>MeÃ§a resultados</strong> â€” horas economizadas, leads gerados, satisfaÃ§Ã£o do cliente</li>
          <li><strong>Escale gradualmente</strong> â€” invista em planos pagos apenas quando o ROI for claro</li>
        </ol>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Consultoria de IA Para Sua Empresa</h3>
          <p className="text-muted-foreground mb-0">Ajudamos pequenas empresas de Curitiba a implementar IA de forma prÃ¡tica e acessÃ­vel. Do diagnÃ³stico Ã  execuÃ§Ã£o.</p>
        </div>
      </>
    ),
  },
  "ia-substituir-empregos-mitos-verdades": {
    title: "A IA Vai Substituir Empregos? Mitos, Verdades e Como Se Preparar",
    excerpt: "O que a pesquisa mostra sobre IA e empregos.",
    date: "2026-04-13",
    readTime: "10 min",
    category: "InteligÃªncia Artificial",
    content: (
      <>
        <p className="lead">"A IA vai tirar meu emprego?" Ã© a pergunta mais comum de 2026. A resposta honesta: <strong>depende</strong>. Alguns empregos vÃ£o desaparecer, outros vÃ£o se transformar, e muitos novos serÃ£o criados. Veja o que sabemos.</p>

        <h2>O Que a IA JÃ¡ Substituiu</h2>
        <ul>
          <li><strong>Atendentes de telemarketing</strong> â€” chatbots e URAs inteligentes jÃ¡ lidam com 60-80% dos chamados</li>
          <li><strong>Tradutores de textos simples</strong> â€” DeepL e Google Tradutor sÃ£o suficientes para documentos padrÃ£o</li>
          <li><strong>Digitadores e data entry</strong> â€” OCR e automaÃ§Ã£o eliminaram boa parte dessas funÃ§Ãµes</li>
          <li><strong>Caixas de supermercado</strong> â€” self-checkout e apps de compra</li>
        </ul>

        <h2>O Que a IA NÃƒO Vai Substituir (TÃ£o Cedo)</h2>
        <ul>
          <li><strong>Trabalhos manuais especializados</strong> â€” eletricistas, encanadores, tÃ©cnicos de manutenÃ§Ã£o</li>
          <li><strong>ProfissÃµes de empatia</strong> â€” enfermeiros, psicÃ³logos, assistentes sociais</li>
          <li><strong>Criatividade estratÃ©gica</strong> â€” diretores criativos, designers de experiÃªncia, estrategistas</li>
          <li><strong>Tomada de decisÃ£o complexa</strong> â€” gestores, advogados, mÃ©dicos (IA ajuda, mas nÃ£o decide)</li>
          <li><strong>Trabalhos fÃ­sicos nÃ£o-padronizados</strong> â€” construÃ§Ã£o civil, jardinagem, manutenÃ§Ã£o predial</li>
        </ul>

        <h2>O Que EstÃ¡ se Transformando</h2>
        <p>A maioria das profissÃµes nÃ£o serÃ¡ substituÃ­da â€” serÃ¡ <strong>aumentada</strong> pela IA:</p>
        <ul>
          <li><strong>Programadores</strong> â€” Copilot gera cÃ³digo, mas o desenvolvedor ainda arquiteta, revisa e decide</li>
          <li><strong>Designers</strong> â€” IA gera rascunhos, mas o designer refina, ajusta e cria identidade</li>
          <li><strong>Contadores</strong> â€” IA automatiza lanÃ§amentos, mas o contador interpreta, planeja e orienta</li>
          <li><strong>Jornalistas</strong> â€” IA redige notÃ­cias factuais, mas investigaÃ§Ã£o e anÃ¡lise permanecem humanas</li>
        </ul>

        <h2>Novas ProfissÃµes Criadas pela IA</h2>
        <ul>
          <li><strong>Engenheiro de Prompts</strong> â€” especialista em extrair o melhor das IAs</li>
          <li><strong>Treinador de IA</strong> â€” prepara e valida dados para modelos</li>
          <li><strong>Auditor de IA</strong> â€” verifica viÃ©s, Ã©tica e conformidade</li>
          <li><strong>Consultor de AutomaÃ§Ã£o com IA</strong> â€” implementa soluÃ§Ãµes em empresas</li>
          <li><strong>Curador de ConteÃºdo IA</strong> â€” edita e valida conteÃºdo gerado por IA</li>
        </ul>

        <h2>Como Se Preparar</h2>
        <ol>
          <li><strong>Aprenda a usar IA como ferramenta</strong> â€” quem usa IA produz 2-3x mais que quem nÃ£o usa</li>
          <li><strong>Desenvolva habilidades complementares</strong> â€” pensamento crÃ­tico, comunicaÃ§Ã£o, lideranÃ§a</li>
          <li><strong>Especialize-se</strong> â€” conhecimento profundo Ã© mais difÃ­cil de automatizar que tarefas genÃ©ricas</li>
          <li><strong>Fique atualizado</strong> â€” a tecnologia muda rÃ¡pido, quem para de aprender fica para trÃ¡s</li>
          <li><strong>Foque em resolver problemas</strong> â€” a IA executa tarefas, mas entender o problema ainda Ã© humano</li>
        </ol>

        <h2>A Perspectiva Realista</h2>
        <p>A cada revoluÃ§Ã£o tecnolÃ³gica (mÃ¡quina a vapor, eletricidade, internet), empregos desapareceram e novos surgiram. Com a IA nÃ£o serÃ¡ diferente. A diferenÃ§a Ã© a <strong>velocidade</strong> â€” a adaptaÃ§Ã£o precisa ser mais rÃ¡pida do que nunca.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Atualize Seus Conhecimentos</h3>
          <p className="text-muted-foreground mb-0">Oferecemos treinamentos prÃ¡ticos de IA para profissionais e empresas em Curitiba. Aprenda a usar as ferramentas que estÃ£o transformando o mercado.</p>
        </div>
      </>
    ),
  },
  "computador-lento-causas-solucoes": {
    title: "Computador lento: causas possÃ­veis e como decidir o prÃ³ximo passo",
    excerpt: "Entenda por que um computador fica lento, o que dÃ¡ para verificar com seguranÃ§a e quando formatar, fazer upgrade ou buscar manutenÃ§Ã£o realmente faz diferenÃ§a.",
    date: "2026-04-06",
    readTime: "11 min",
    category: "ManutenÃ§Ã£o",
    content: (
      <>
        <p className="lead">Um computador lento quase nunca tem uma causa Ãºnica. Costuma ser uma soma de fatores â€” disco antigo, pouca memÃ³ria, programas em segundo plano ou o sistema jÃ¡ desgastado pelo tempo. Antes de formatar ou gastar com peÃ§as, vale entender o que a lentidÃ£o pode indicar e o que vocÃª mesmo consegue verificar com seguranÃ§a.</p>

        <h2>O que a lentidÃ£o costuma indicar</h2>
        <p>Repare em <strong>quando</strong> a lentidÃ£o aparece, porque isso ajuda a separar as possibilidades:</p>
        <ul>
          <li>Demora sÃ³ para ligar e chegar atÃ© a Ã¡rea de trabalho.</li>
          <li>Demora para abrir programas depois que o sistema jÃ¡ iniciou.</li>
          <li>Travamentos e congelamentos no meio do uso.</li>
          <li>LentidÃ£o apenas no navegador ou em um programa especÃ­fico.</li>
          <li>LentidÃ£o que piora com o tempo de uso, acompanhada de aquecimento.</li>
        </ul>
        <p>Cada padrÃ£o aponta para grupos de causas diferentes. Nenhum diagnÃ³stico Ã  distÃ¢ncia Ã© definitivo: aqui o objetivo Ã© entender a situaÃ§Ã£o, nÃ£o confirmar a causa sem verificar.</p>

        <h2>VerificaÃ§Ãµes seguras que vocÃª pode fazer</h2>
        <ul>
          <li>Reinicie o computador por completo â€” muita coisa acumulada some com um reinÃ­cio.</li>
          <li>Veja quanto espaÃ§o livre resta no disco do sistema; discos quase cheios deixam tudo lento.</li>
          <li>Abra o Gerenciador de Tarefas (Ctrl + Shift + Esc) e observe o que consome disco, memÃ³ria e processador.</li>
          <li>Revise os programas que iniciam junto com o sistema e desative os que vocÃª nÃ£o usa.</li>
          <li>Confira se hÃ¡ atualizaÃ§Ãµes do sistema pendentes.</li>
        </ul>
        <p>Essas aÃ§Ãµes nÃ£o apagam dados e nÃ£o exigem abrir o equipamento. Se a lentidÃ£o continuar, a causa provavelmente Ã© mais profunda.</p>

        <h2>Causas possÃ­veis, por grupo</h2>
        <h3>Armazenamento</h3>
        <p>Um disco rÃ­gido mecÃ¢nico (HD) antigo Ã© uma das razÃµes mais frequentes de lentidÃ£o geral. HDs tambÃ©m se desgastam e podem apresentar setores com falha, o que trava a leitura. Migrar para um SSD costuma trazer o ganho mais perceptÃ­vel â€” mas isso <Link to="/blog/quando-trocar-hd-por-ssd" className="text-accent">precisa ser avaliado caso a caso</Link>.</p>
        <h3>MemÃ³ria (RAM)</h3>
        <p>Pouca memÃ³ria faz o sistema recorrer ao disco como memÃ³ria virtual, e tudo fica arrastado, principalmente com vÃ¡rias abas ou programas abertos.</p>
        <h3>Software e inicializaÃ§Ã£o</h3>
        <p>Programas que iniciam sozinhos, atualizadores e serviÃ§os em segundo plano consomem recursos o tempo todo. Um navegador cheio de extensÃµes tambÃ©m pesa bastante.</p>
        <h3>Temperatura</h3>
        <p>Quando o processador aquece demais, ele reduz a velocidade para se proteger. Poeira e ventilaÃ§Ã£o obstruÃ­da sÃ£o causas comuns de aquecimento.</p>
        <h3>SeguranÃ§a</h3>
        <p>Alguns programas maliciosos consomem processamento e rede em silÃªncio. Se a lentidÃ£o veio junto com comportamento estranho, vale <Link to="/blog/como-saber-se-pc-tem-virus-malware" className="text-accent">investigar sinais de vÃ­rus</Link> e considerar a <Link to="/servicos/remocao-de-virus" className="text-accent">remoÃ§Ã£o profissional</Link>.</p>
        <h3>Sistema desgastado</h3>
        <p>Com o tempo, o sistema acumula configuraÃ§Ãµes, restos de programas e arquivos que degradam o desempenho.</p>
        <h3>Hardware limitado para o uso atual</h3>
        <p>Equipamentos muito antigos podem simplesmente nÃ£o dar conta de programas e sistemas atuais, mesmo apÃ³s ajustes.</p>

        <h2>Formatar nem sempre resolve</h2>
        <p>Formatar reinstala o sistema do zero e pode ajudar quando o problema Ã© de software acumulado ou corrompido. Mas nÃ£o resolve lentidÃ£o causada por HD desgastado, pouca memÃ³ria, superaquecimento ou hardware defasado. Formatar sem entender a causa costuma dar um alÃ­vio temporÃ¡rio â€” e o problema volta. Veja <Link to="/servicos/formatacao" className="text-accent">como avaliamos quando a formataÃ§Ã£o faz sentido</Link>.</p>

        <h2>Sinais de que Ã© melhor nÃ£o insistir</h2>
        <ul>
          <li>RuÃ­dos, cliques ou estalos vindos do disco.</li>
          <li>Arquivos que somem ou ficam corrompidos.</li>
          <li>Aquecimento excessivo e desligamentos repentinos.</li>
          <li>ReinicializaÃ§Ãµes constantes ou tela azul recorrente.</li>
        </ul>
        <p>Nesses casos, continuar usando pode aumentar o risco de perda de dados. Fazer um backup dos arquivos importantes Ã© a primeira medida antes de qualquer tentativa.</p>

        <h2>Quando procurar atendimento tÃ©cnico</h2>
        <p>Se as verificaÃ§Ãµes seguras nÃ£o resolveram, ou se hÃ¡ sinais de falha fÃ­sica, um diagnÃ³stico presencial identifica a causa real antes de qualquer troca de peÃ§a ou formataÃ§Ã£o. Assim vocÃª evita pagar por uma soluÃ§Ã£o que nÃ£o ataca o problema certo.</p>

        <h2>Limpeza, upgrade ou formataÃ§Ã£o: o que cada caminho resolve</h2>
        <p>Os trÃªs caminhos costumam ser tratados como sinÃ´nimos, mas atacam problemas diferentes. A limpeza (fÃ­sica e de software) devolve estabilidade quando o computador acumulou poeira, pasta tÃ©rmica ressecada ou dezenas de programas iniciando junto com o sistema. O upgrade muda o teto de desempenho: sÃ³ faz sentido quando o gargalo real Ã© disco mecÃ¢nico ou memÃ³ria insuficiente para o uso atual. A formataÃ§Ã£o zera o sistema e Ã© Ãºtil quando hÃ¡ corrupÃ§Ã£o de arquivos do Windows ou resÃ­duos de infecÃ§Ã£o â€” e inÃºtil quando o problema Ã© hardware.</p>
        <p>Na prÃ¡tica, a ordem importa. Trocar o disco de uma mÃ¡quina que superaquece sÃ³ transfere a frustraÃ§Ã£o: o computador continuarÃ¡ reduzindo desempenho para se proteger do calor. Do mesmo modo, formatar um notebook com HD com setores defeituosos costuma resultar em uma instalaÃ§Ã£o lenta desde o primeiro dia. Por isso o diagnÃ³stico vem antes: ele diz qual dos trÃªs caminhos muda o resultado percebido no dia a dia.</p>
        <ul>
          <li><strong>Ficou lento de forma gradual, ao longo de meses:</strong> normalmente software acumulado, disco cheio ou disco mecÃ¢nico no limite.</li>
          <li><strong>Piorou de repente:</strong> investigar atualizaÃ§Ã£o recente, infecÃ§Ã£o, falha de disco ou superaquecimento.</li>
          <li><strong>Lento sÃ³ em tarefas especÃ­ficas:</strong> pode ser falta de memÃ³ria para aquele uso, nÃ£o lentidÃ£o geral.</li>
          <li><strong>Trava com barulho ou desliga sozinho:</strong> parar de insistir e priorizar avaliaÃ§Ã£o tÃ©cnica antes de perder dados.</li>
        </ul>

        <h2>LentidÃ£o em mÃ¡quinas de trabalho e home office</h2>
        <p>Em computadores usados para trabalho, o custo da lentidÃ£o raramente estÃ¡ no equipamento: estÃ¡ nas horas paradas. Quem trabalha com planilhas grandes, videochamadas simultÃ¢neas, sistemas de gestÃ£o no navegador e vÃ¡rios aplicativos abertos ao mesmo tempo sente primeiro a falta de memÃ³ria â€” o sistema passa a usar o disco como memÃ³ria auxiliar e tudo fica arrastado, mesmo com processador razoÃ¡vel.</p>
        <p>Um segundo padrÃ£o comum em home office Ã© o acÃºmulo de agentes em segundo plano: antivÃ­rus duplicados, clientes de sincronizaÃ§Ã£o de nuvem, atualizadores de fabricantes e aplicativos de reuniÃ£o que iniciam junto com o sistema. Cada um consome pouco; somados, competem por disco e memÃ³ria exatamente nos primeiros minutos do expediente, quando vocÃª mais precisa da mÃ¡quina pronta. Documentar o que estÃ¡ ativo antes de mexer evita desligar algo essencial para o trabalho.</p>
        <p>Se o computador Ã© a ferramenta principal de renda, vale tratar a lentidÃ£o como manutenÃ§Ã£o preventiva e nÃ£o como emergÃªncia: uma avaliaÃ§Ã£o com o equipamento ainda funcionando permite planejar troca de disco, ampliaÃ§Ã£o de memÃ³ria ou reinstalaÃ§Ã£o em um horÃ¡rio que nÃ£o interrompa entregas.</p>

        <h2>Guias detalhados deste cluster</h2>
        <p>Esta pÃ¡gina Ã© o ponto de partida. Cada causa provÃ¡vel tem um guia prÃ³prio, com o passo a passo completo:</p>
        <ul>
          <li><Link to="/blog/limpar-arquivos-temporarios-windows" className="text-accent">Limpar arquivos temporÃ¡rios e liberar espaÃ§o no Windows</Link> â€” quando o disco do sistema estÃ¡ quase cheio.</li>
          <li><Link to="/blog/memoria-ram-insuficiente-sintomas" className="text-accent">MemÃ³ria RAM insuficiente: sintomas reais</Link> â€” como confirmar antes de comprar pente.</li>
          <li><Link to="/blog/testar-memoria-ram-memtest86" className="text-accent">Testar a memÃ³ria RAM com Memtest86+</Link> â€” quando a lentidÃ£o vem junto com travamentos.</li>
        </ul>

        <h2>Quando chamar um tÃ©cnico</h2>
        <p>Procure ajuda profissional se: o equipamento ainda estÃ¡ na garantia (abrir pode anular), vocÃª nÃ£o tem experiÃªncia com hardware interno, hÃ¡ risco de perda de dados importantes ou a lentidÃ£o continua depois de liberar espaÃ§o e revisar os programas de inicializaÃ§Ã£o.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Quer descobrir a causa real da lentidÃ£o?</h3>
          <p className="text-muted-foreground mb-3">Um diagnÃ³stico tÃ©cnico mostra se o caso pede limpeza, upgrade, formataÃ§Ã£o ou reparo â€” sem chute. OrÃ§amento pelo WhatsApp, sem compromisso.</p>
          <ul className="mb-0">
            <li><Link to="/servicos/manutencao-de-computador" className="text-accent">ManutenÃ§Ã£o de computador</Link></li>
            <li><Link to="/servicos/upgrade-ssd-ram" className="text-accent">Upgrade de SSD e memÃ³ria</Link></li>
            <li><Link to="/servicos/formatacao" className="text-accent">FormataÃ§Ã£o e reinstalaÃ§Ã£o do Windows</Link></li>
            <li><Link to="/diagnostico-tecnico" className="text-accent">Como funciona o diagnÃ³stico tÃ©cnico</Link></li>
          </ul>
        </div>

      </>
    ),
  },
  "como-saber-se-pc-tem-virus-malware": {
    title: "Como saber se o computador estÃ¡ com vÃ­rus ou malware",
    excerpt: "Pop-ups, navegador alterado, lentidÃ£o repentina ou arquivos bloqueados? Veja os sinais de infecÃ§Ã£o.",
    date: "2026-04-05",
    readTime: "10 min",
    category: "SeguranÃ§a",
    content: (
      <>
        <p className="lead">Muitos programas maliciosos sÃ£o silenciosos: nÃ£o travam a tela nem exibem avisos Ã³bvios. Outros sÃ£o barulhentos, cheios de pop-ups e alertas falsos. Este guia ajuda a diferenciar <strong>sintoma</strong> de <strong>confirmaÃ§Ã£o</strong> e a agir com seguranÃ§a â€” sem cair em golpes que se disfarÃ§am de soluÃ§Ã£o.</p>

        <h2>Resposta rÃ¡pida</h2>
        <p>Sintoma nÃ£o Ã© confirmaÃ§Ã£o. Pop-ups fora do navegador, pÃ¡gina inicial trocada, programas desconhecidos instalados e antivÃ­rus desativado sozinho, quando aparecem juntos, indicam infecÃ§Ã£o com alta probabilidade. Arquivos renomeados ou inacessÃ­veis exigem parar o uso imediatamente e desconectar o equipamento da rede. Nunca ligue para nÃºmeros exibidos em telas de alerta nem instale "limpadores" sugeridos por elas: essa Ã© a prÃ³pria fraude. Troque senhas crÃ­ticas a partir de outro dispositivo confiÃ¡vel.</p>

        <h2>Sinais que merecem atenÃ§Ã£o</h2>
        <ul>
          <li>Pop-ups e propagandas abrindo sozinhos, inclusive fora do navegador.</li>
          <li>PÃ¡gina inicial, buscador ou extensÃµes do navegador alterados sem sua aÃ§Ã£o.</li>
          <li>Programas que vocÃª nÃ£o instalou aparecendo na lista de aplicativos.</li>
          <li>LentidÃ£o repentina e uso alto de processador mesmo sem programas abertos.</li>
          <li>Alertas dizendo que o computador estÃ¡ infectado e mandando ligar para um nÃºmero ou instalar algo.</li>
          <li>Redirecionamentos de sites e resultados de busca estranhos.</li>
          <li>Contas acessadas sem autorizaÃ§Ã£o ou mensagens enviadas sem vocÃª saber.</li>
          <li>Arquivos renomeados, com extensÃ£o trocada ou inacessÃ­veis (possÃ­vel ransomware).</li>
          <li>AntivÃ­rus desativado sozinho e sem permitir reativar.</li>
        </ul>
        <p>Um sinal isolado nem sempre significa infecÃ§Ã£o â€” pode ser configuraÃ§Ã£o, extensÃ£o indesejada ou atÃ© hardware. A confirmaÃ§Ã£o depende de anÃ¡lise; o importante Ã© nÃ£o ignorar vÃ¡rios sinais juntos.</p>

        <h2>O que fazer com seguranÃ§a</h2>
        <ul>
          <li>Em um incidente grave (arquivos bloqueados, conta invadida), desconecte o equipamento da internet para conter o problema.</li>
          <li>NÃ£o pague nem siga instruÃ§Ãµes de alertas de "suporte tÃ©cnico" â€” sÃ£o tÃ¡ticas de golpe.</li>
          <li>NÃ£o instale "limpadores" ou "aceleradores" aleatÃ³rios; muitos trazem mais malware.</li>
          <li>Se houver suspeita de senhas comprometidas, troque-as a partir de outro dispositivo confiÃ¡vel.</li>
          <li>Em ambiente empresarial, preserve as evidÃªncias e evite mexer antes de orientar a equipe responsÃ¡vel.</li>
        </ul>

        <h2>O que evitar</h2>
        <ul>
          <li>Formatar por conta prÃ³pria sem backup â€” vocÃª pode perder dados que ainda dariam para preservar.</li>
          <li>Desativar a seguranÃ§a do sistema de forma permanente.</li>
          <li>Compartilhar senhas ou dar acesso remoto a quem entrou em contato do nada.</li>
          <li>Confiar em promessas de remoÃ§Ã£o "sem risco nenhum": dependendo da ameaÃ§a, hÃ¡ chance de perda de dados, e isso precisa ser avaliado.</li>
        </ul>

        <h2>Golpe de falso suporte</h2>
        <p>Uma das fraudes mais comuns exibe uma tela de alerta assustadora com um telefone para "ajuda". NinguÃ©m sÃ©rio trabalha assim. Feche a janela, nÃ£o ligue para o nÃºmero e nÃ£o instale nada que essa tela peÃ§a. Se nÃ£o conseguir fechar, desligue o computador.</p>

        <h2>Quando procurar atendimento tÃ©cnico</h2>
        <p>Se hÃ¡ sinais de ransomware, invasÃ£o de contas ou infecÃ§Ã£o que volta sempre, a remoÃ§Ã£o profissional avalia o tipo de ameaÃ§a e prioriza preservar seus dados. Em muitos casos dÃ¡ para orientar por <Link to="/atendimento-remoto" className="text-accent">atendimento remoto</Link>, e o <Link to="/diagnostico-tecnico" className="text-accent">diagnÃ³stico</Link> define o caminho mais seguro.</p>

        <h2>Como reduzir o risco de reinfecÃ§Ã£o</h2>
        <p>Remover a ameaÃ§a Ã© metade do trabalho: se o caminho de entrada continuar aberto, o problema volta. Na maioria dos casos domÃ©sticos o vetor Ã© previsÃ­vel â€” instalador baixado de site de terceiros, extensÃ£o de navegador instalada sem atenÃ§Ã£o, arquivo recebido por mensagem ou reaproveitamento da mesma senha em vÃ¡rios serviÃ§os. Corrigir o hÃ¡bito vale mais do que trocar de antivÃ­rus.</p>
        <ul>
          <li>Baixe programas apenas do site oficial do fabricante ou da loja do prÃ³prio sistema.</li>
          <li>Revise as extensÃµes do navegador e remova o que vocÃª nÃ£o reconhece ou nÃ£o usa hÃ¡ meses.</li>
          <li>Mantenha o sistema e o navegador atualizados: boa parte das infecÃ§Ãµes explora falhas jÃ¡ corrigidas.</li>
          <li>Troque as senhas dos serviÃ§os crÃ­ticos depois da limpeza, preferencialmente de outro dispositivo confiÃ¡vel.</li>
          <li>Ative a verificaÃ§Ã£o em duas etapas em e-mail e banco â€” Ã© a barreira que impede o dano maior.</li>
        </ul>
        <p>Depois de uma limpeza, observe o comportamento por alguns dias: reaparecimento de pÃ¡ginas iniciais alteradas, novos Ã­cones ou consumo de rede sem motivo indica que algo persistiu ou que o mesmo caminho foi usado de novo.</p>

        <h2>Quando a suspeita envolve uma rede com vÃ¡rios computadores</h2>
        <p>Em escritÃ³rios e pequenas empresas, tratar apenas a mÃ¡quina que apresentou sintoma costuma ser insuficiente. Compartilhamentos de arquivos, pendrives que circulam entre estaÃ§Ãµes e credenciais reutilizadas fazem com que uma infecÃ§Ã£o se espalhe silenciosamente. O sinal de alerta mais comum Ã© a repetiÃ§Ã£o: dois ou trÃªs computadores apresentando o mesmo comportamento estranho na mesma semana.</p>
        <p>Nesses casos, a prioridade muda de ordem. Antes de limpar, Ã© importante isolar a estaÃ§Ã£o suspeita da rede, verificar se hÃ¡ backup Ã­ntegro e recente e confirmar quem tem acesso administrativo. Arquivos que ficaram inacessÃ­veis ou renomeados exigem cuidado redobrado: continuar usando o equipamento pode reduzir as chances de recuperaÃ§Ã£o. Se o ambiente tem servidor, sistema de gestÃ£o ou dados de clientes, a avaliaÃ§Ã£o deve considerar a rede inteira, e nÃ£o apenas o computador que reclamou primeiro.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Suspeita de vÃ­rus no computador?</h3>
          <p className="text-muted-foreground mb-3">Avaliamos o tipo de infecÃ§Ã£o e agimos priorizando a preservaÃ§Ã£o dos seus arquivos.</p>
          <ul className="mb-0">
            <li><Link to="/servicos/remocao-de-virus" className="text-accent">RemoÃ§Ã£o de vÃ­rus e malware</Link></li>
            <li><Link to="/servicos/recuperacao-de-dados" className="text-accent">RecuperaÃ§Ã£o de dados</Link></li>
            <li><Link to="/blog/backup-como-proteger-seus-arquivos" className="text-accent">Como manter um backup preventivo</Link></li>
          </ul>
        </div>

        <EditorialReferences slug="como-saber-se-pc-tem-virus-malware" />
        <h2>Sintoma, causa provÃ¡vel e verificaÃ§Ã£o</h2>
        <p>Boa parte dos sintomas atribuÃ­dos a vÃ­rus tem explicaÃ§Ã£o mais simples. A tabela separa o que exige verificaÃ§Ã£o tÃ©cnica do que costuma ser configuraÃ§Ã£o ou hardware.</p>
        <div className="not-prose my-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead><tr><th className="text-left p-2 border-b">Sintoma</th><th className="text-left p-2 border-b">Causa provÃ¡vel</th><th className="text-left p-2 border-b">VerificaÃ§Ã£o</th></tr></thead>
            <tbody>
              <tr><td className="p-2 border-b">Pop-ups fora do navegador</td><td className="p-2 border-b">Adware instalado junto de outro programa</td><td className="p-2 border-b">Revisar a lista de aplicativos instalados por data de instalaÃ§Ã£o</td></tr>
              <tr><td className="p-2 border-b">Busca e pÃ¡gina inicial alteradas</td><td className="p-2 border-b">ExtensÃ£o de navegador indesejada</td><td className="p-2 border-b">Desativar as extensÃµes e reabrir o navegador</td></tr>
              <tr><td className="p-2 border-b">LentidÃ£o com uso alto de processador</td><td className="p-2 border-b">Processo em segundo plano â€” de mineraÃ§Ã£o a indexaÃ§Ã£o legÃ­tima</td><td className="p-2 border-b">Abrir o gerenciador de tarefas e identificar o processo dominante</td></tr>
              <tr><td className="p-2 border-b">Arquivos renomeados ou inacessÃ­veis</td><td className="p-2 border-b">Ransomware</td><td className="p-2 border-b">Parar o uso, desconectar da rede e preservar o estado do disco</td></tr>
              <tr><td className="p-2 border-b">AntivÃ­rus desativado sozinho</td><td className="p-2 border-b">AmeaÃ§a com privilÃ©gio administrativo</td><td className="p-2 border-b">Verificar se a reativaÃ§Ã£o Ã© bloqueada; se for, tratar como comprometimento</td></tr>
              <tr><td className="p-2 border-b">Tela de alerta com telefone de suporte</td><td className="p-2 border-b">Golpe de falso suporte, nÃ£o infecÃ§Ã£o</td><td className="p-2 border-b">Fechar a janela ou desligar o equipamento; nunca ligar para o nÃºmero</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Ãrvore de decisÃ£o</h2>
        <ol>
          <li>HÃ¡ arquivos bloqueados, renomeados ou pedido de resgate? Pare tudo, desconecte da rede e nÃ£o formate: existem chances de preservaÃ§Ã£o que a formataÃ§Ã£o elimina.</li>
          <li>NÃ£o hÃ¡ bloqueio, mas contas foram acessadas sem autorizaÃ§Ã£o? A prioridade Ã© troca de senhas e verificaÃ§Ã£o em duas etapas, em outro dispositivo.</li>
          <li>SÃ³ hÃ¡ sintomas de navegador (busca trocada, propaganda)? Comece por extensÃµes e programas instalados recentemente.</li>
          <li>Os sintomas voltam depois da limpeza? O caminho de entrada continua aberto â€” instalador de terceiros, senha reutilizada ou dispositivo compartilhado.</li>
          <li>Mais de um computador da mesma rede apresenta o comportamento na mesma semana? Trate como incidente de rede e isole antes de limpar.</li>
        </ol>

        <h2>Erros comuns</h2>
        <ul>
          <li>Instalar vÃ¡rios antivÃ­rus ao mesmo tempo: eles se bloqueiam e o resultado fica pior.</li>
          <li>Formatar por impulso sem backup, perdendo dados que ainda seriam preservÃ¡veis.</li>
          <li>Trocar senhas a partir do computador possivelmente comprometido.</li>
          <li>Pagar resgate em caso de ransomware: nÃ£o hÃ¡ garantia de devoluÃ§Ã£o e o pagamento financia o ataque.</li>
          <li>Conceder acesso remoto a quem entrou em contato por telefone ou mensagem sem solicitaÃ§Ã£o.</li>
        </ul>

        <h2>Limites de seguranÃ§a</h2>
        <p>Nenhuma verificaÃ§Ã£o garante ausÃªncia de infecÃ§Ã£o: ameaÃ§as recentes podem nÃ£o ser reconhecidas na hora, e a limpeza depende do tipo de ameaÃ§a encontrada. TambÃ©m nÃ£o Ã© honesto prometer remoÃ§Ã£o sem risco algum â€” dependendo do caso, hÃ¡ chance de perda de dados, e isso precisa ser avaliado antes, nÃ£o depois. Em ambiente empresarial, mexer no equipamento antes de preservar evidÃªncias pode inviabilizar a investigaÃ§Ã£o e o acionamento de seguro. Ransomware, especificamente, nÃ£o tem soluÃ§Ã£o universal: sem backup Ã­ntegro, muitas vezes nÃ£o hÃ¡ caminho tÃ©cnico de recuperaÃ§Ã£o.</p>

        <h2>Termos que aparecem no diagnÃ³stico</h2>
        <ul>
          <li><strong>Adware:</strong> programa que exibe propaganda e costuma vir embutido em instaladores.</li>
          <li><strong>Ransomware:</strong> ameaÃ§a que criptografa arquivos e exige pagamento.</li>
          <li><strong>Vetor de entrada:</strong> o caminho pelo qual a ameaÃ§a chegou ao equipamento.</li>
          <li><strong>PersistÃªncia:</strong> mecanismo que faz a ameaÃ§a voltar apÃ³s reinÃ­cio ou limpeza parcial.</li>
          <li><strong>VerificaÃ§Ã£o em duas etapas:</strong> segundo fator que impede o uso da senha vazada.</li>
        </ul>

      </>

    ),
  },
  "notebook-nao-liga-o-que-fazer": {
    title: "Notebook nÃ£o liga: o que verificar antes da assistÃªncia",
    excerpt: "Veja verificaÃ§Ãµes seguras para um notebook que nÃ£o liga, liga sem imagem ou desliga sozinho e saiba quando interromper os testes.",
    date: "2026-04-04",
    readTime: "10 min",
    category: "ManutenÃ§Ã£o",
    content: (
      <>
        <p className="lead">VocÃª aperta o botÃ£o do notebook e nÃ£o acontece nada â€” ou ele reage, mas nÃ£o chega ao sistema. "NÃ£o liga" pode significar coisas bem diferentes, de um carregador com defeito a uma falha interna. Observar <strong>o comportamento exato</strong> ajuda a entender a situaÃ§Ã£o e evita medidas que podem piorar o quadro.</p>

        <h2>Identifique o comportamento do notebook</h2>
        <ul>
          <li><strong>Nenhum sinal:</strong> nenhuma luz, nenhum som, nenhuma ventoinha.</li>
          <li><strong>LED acende, mas nÃ£o inicia:</strong> a luz de energia acende, mas nada aparece na tela.</li>
          <li><strong>Liga sem imagem:</strong> ventoinha gira e hÃ¡ sinais de atividade, mas a tela fica preta.</li>
          <li><strong>Inicia e desliga:</strong> liga por alguns segundos e apaga sozinho.</li>
          <li><strong>NÃ£o carrega:</strong> conectado ao carregador, a bateria nÃ£o indica carregamento.</li>
          <li><strong>Liga sÃ³ na tomada:</strong> funciona com o carregador, mas nÃ£o segura a bateria.</li>
          <li><strong>LED pisca ou hÃ¡ bipes</strong> em sequÃªncia ao tentar ligar.</li>
          <li><strong>Desligou apÃ³s aquecimento ou queda de energia</strong> e nÃ£o voltou.</li>
        </ul>
        <p>Cada comportamento aponta para grupos diferentes de possÃ­veis causas. Nada disso confirma a causa sozinho; o diagnÃ³stico Ã© o que fecha o quadro.</p>

        <h2>VerificaÃ§Ãµes seguras (sem abrir o notebook)</h2>
        <ul>
          <li>Teste o carregador em uma tomada que vocÃª sabe que funciona e observe se o LED do carregador acende.</li>
          <li>Confira o cabo e o conector do carregador externamente, procurando por danos visÃ­veis.</li>
          <li>Com o notebook conectado ao carregador, aguarde alguns minutos antes de tentar ligar.</li>
          <li>Remova perifÃ©ricos externos (pendrives, HD externo, impressora) e tente ligar sÃ³ com o essencial.</li>
          <li>Se liga sem imagem, conecte um monitor ou TV externa por HDMI para ver se a imagem aparece.</li>
          <li>Observe e anote o padrÃ£o de luzes e bipes â€” isso ajuda muito no diagnÃ³stico.</li>
          <li>Siga apenas procedimentos oficiais do fabricante quando eles estiverem claramente identificados para o seu modelo.</li>
        </ul>
        <p>SÃ£o checagens de baixo risco. A partir daÃ­, mexer no interior exige preparo.</p>

        <h2>O que nÃ£o fazer</h2>
        <ul>
          <li>NÃ£o abra o carregador nem a bateria.</li>
          <li>NÃ£o faÃ§a "ponte" nem improvise ligaÃ§Ãµes elÃ©tricas.</li>
          <li>NÃ£o desmonte o notebook nem remova componentes internos sem experiÃªncia.</li>
          <li>NÃ£o use carregador incompatÃ­vel â€” tensÃ£o ou conector errados podem causar dano.</li>
          <li>Se caiu lÃ­quido, nÃ£o use secador nem calor: isso espalha o lÃ­quido e piora a corrosÃ£o. Desligue e nÃ£o tente ligar.</li>
          <li>NÃ£o insista em ligar diante de cheiro, fumaÃ§a ou calor anormal.</li>
        </ul>

        <h2>Sinais para parar na hora</h2>
        <p>Pare de tentar ligar se houver <strong>cheiro de queimado, fumaÃ§a, estalos, aquecimento anormal, lÃ­quido no equipamento ou carregador danificado</strong>. Nesses casos, continuar tentando aumenta o risco de dano maior.</p>

        <h2>Os limites das verificaÃ§Ãµes caseiras</h2>
        <p>Sintomas parecidos podem envolver o carregador, o conector de energia, a bateria, a memÃ³ria, a tela, o armazenamento, o sistema, a placa ou uma proteÃ§Ã£o tÃ©rmica que interrompeu o funcionamento. NÃ£o dÃ¡ para afirmar qual Ã© a causa sem diagnÃ³stico â€” testar Ã s cegas troca peÃ§as boas e nÃ£o resolve o problema real. Em desktops o roteiro Ã© diferente e envolve outros componentes; aqui o foco Ã© o notebook.</p>

        <h2>Quando procurar atendimento tÃ©cnico</h2>
        <p>Se as verificaÃ§Ãµes bÃ¡sicas nÃ£o resolveram, o prÃ³ximo passo Ã© um diagnÃ³stico: ele identifica onde estÃ¡ o problema antes de qualquer troca. Tentar abrir o notebook sem conhecimento pode transformar um problema simples em um prejuÃ­zo maior.</p>

        <h2>Erros comuns que pioram o quadro</h2>
        <p>Boa parte dos danos que chegam Ã  bancada nÃ£o vem do defeito original, e sim da tentativa de resolvÃª-lo Ã s pressas. Um notebook que nÃ£o liga geralmente tolera espera; o que ele nÃ£o tolera Ã© improviso elÃ©trico e abertura sem ferramenta adequada.</p>
        <ul>
          <li><strong>Usar carregador de outro aparelho</strong> com conector parecido, mas tensÃ£o ou amperagem diferentes.</li>
          <li><strong>Insistir no botÃ£o de energia dezenas de vezes</strong> quando jÃ¡ hÃ¡ sinal de curto ou cheiro de queimado.</li>
          <li><strong>Abrir a base com chave de fenda comum</strong>, danificando presilhas e o cabo flexÃ­vel do teclado ou do touchpad.</li>
          <li><strong>Ligar depois de contato com lÃ­quido</strong> â€” energizar uma placa molhada costuma transformar um caso recuperÃ¡vel em perda de placa.</li>
          <li><strong>Aplicar produto de limpeza</strong> ou secador quente diretamente nos componentes internos.</li>
        </ul>
        <p>Se em algum momento aparecer cheiro forte, estalo, aquecimento anormal no carregador ou o aparelho tiver sofrido queda, o passo mais seguro Ã© desconectar da tomada, remover a bateria quando ela for removÃ­vel e parar os testes ali.</p>

        <h2>O que informar ao acionar o tÃ©cnico</h2>
        <p>Um relato preciso encurta o diagnÃ³stico e reduz a chance de troca desnecessÃ¡ria de peÃ§as. Antes do atendimento, reÃºna as informaÃ§Ãµes que sÃ³ vocÃª tem: elas descrevem o histÃ³rico que nenhum teste de bancada reconstrÃ³i sozinho.</p>
        <ul>
          <li>Marca, modelo e, se souber, o ano aproximado do equipamento.</li>
          <li>O que aconteceu imediatamente antes da falha: queda, oscilaÃ§Ã£o de energia, atualizaÃ§Ã£o, lÃ­quido, calor excessivo.</li>
          <li>O comportamento exato hoje: LED aceso ou apagado, ventoinha girando, bipes, tela preta com luz de fundo.</li>
          <li>Se jÃ¡ houve reparo anterior, e o que foi trocado.</li>
          <li>Se existem dados importantes sem backup â€” isso muda a ordem das etapas do serviÃ§o.</li>
        </ul>
        <p>Vale tambÃ©m combinar antes como o equipamento serÃ¡ transportado. Levar o carregador original junto Ã© essencial: sem ele, parte dos testes de energia fica inconclusiva e o diagnÃ³stico pode precisar de uma segunda etapa.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Notebook que nÃ£o liga?</h3>
          <p className="text-muted-foreground mb-3">O diagnÃ³stico mostra a causa real e as opÃ§Ãµes antes de vocÃª decidir.</p>
          <ul className="mb-0">
            <li><Link to="/servicos/manutencao-de-notebook" className="text-accent">ManutenÃ§Ã£o de notebook</Link></li>
            <li><Link to="/diagnostico-tecnico" className="text-accent">Como funciona o diagnÃ³stico tÃ©cnico</Link></li>
            <li><Link to="/precos-e-politicas" className="text-accent">PreÃ§os e polÃ­ticas de atendimento</Link></li>
          </ul>

        </div>

        <EditorialReferences slug="notebook-nao-liga-o-que-fazer" />
      </>
    ),

  },
  "diferenca-camera-wifi-dvr-qual-escolher": {
    title: "CÃ¢mera Wi-Fi ou DVR: Qual a DiferenÃ§a e Qual Escolher?",
    excerpt: "Entenda as diferenÃ§as tÃ©cnicas entre cÃ¢meras Wi-Fi e sistemas DVR.",
    date: "2026-02-14",
    readTime: "8 min",
    category: "CFTV",
    content: (
      <>
        <p className="lead">Na hora de instalar cÃ¢meras de seguranÃ§a, a dÃºvida mais comum Ã©: <strong>cÃ¢mera Wi-Fi ou sistema DVR com cabo?</strong> Cada tecnologia tem vantagens e limitaÃ§Ãµes. Neste guia, explicamos tudo de forma clara para vocÃª decidir com seguranÃ§a.</p>

        <h2>CÃ¢mera Wi-Fi: Praticidade com Ressalvas</h2>
        <p>CÃ¢meras Wi-Fi se conectam Ã  internet sem fio e sÃ£o fÃ¡ceis de instalar. SÃ£o populares para uso domÃ©stico simples, mas possuem limitaÃ§Ãµes importantes:</p>
        <ul>
          <li><strong>Dependem 100% da internet:</strong> se o Wi-Fi cair, a cÃ¢mera para de funcionar</li>
          <li><strong>InterferÃªncia de sinal:</strong> paredes, distÃ¢ncia e outros dispositivos podem prejudicar a qualidade</li>
          <li><strong>Vulnerabilidade:</strong> invasores podem usar inibidores de sinal para desativar as cÃ¢meras</li>
          <li><strong>Armazenamento limitado:</strong> muitas dependem de nuvem com mensalidade</li>
        </ul>

        <h2>Sistema DVR com Cabo: Estabilidade e ConfianÃ§a</h2>
        <p>O sistema DVR (Digital Video Recorder) utiliza cÃ¢meras conectadas por cabo coaxial ou UTP diretamente ao gravador. Ã‰ a escolha profissional para seguranÃ§a real:</p>
        <ul>
          <li><strong>Funciona sem internet:</strong> grava localmente no HD mesmo se a internet cair</li>
          <li><strong>Sem interferÃªncia:</strong> conexÃ£o por cabo Ã© 100% estÃ¡vel</li>
          <li><strong>Imune a inibidores:</strong> nÃ£o pode ser desativado por equipamentos de bloqueio</li>
          <li><strong>GravaÃ§Ã£o contÃ­nua 24h:</strong> HD local armazena dias de gravaÃ§Ã£o sem custo mensal</li>
          <li><strong>Acesso remoto:</strong> vocÃª ainda vÃª pelo celular quando tem internet no local</li>
        </ul>

        <h2>Comparativo Direto</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg">
            <thead><tr className="bg-muted"><th className="p-3 text-left">CaracterÃ­stica</th><th className="p-3 text-left">Wi-Fi</th><th className="p-3 text-left">DVR (Cabo)</th></tr></thead>
            <tbody>
              <tr><td className="p-3 border-t">Estabilidade</td><td className="p-3 border-t">MÃ©dia</td><td className="p-3 border-t">Alta</td></tr>
              <tr><td className="p-3 border-t">Funciona sem internet</td><td className="p-3 border-t">NÃ£o</td><td className="p-3 border-t">Sim</td></tr>
              <tr><td className="p-3 border-t">VulnerÃ¡vel a inibidor</td><td className="p-3 border-t">Sim</td><td className="p-3 border-t">NÃ£o</td></tr>
              <tr><td className="p-3 border-t">GravaÃ§Ã£o local</td><td className="p-3 border-t">Limitada</td><td className="p-3 border-t">ContÃ­nua 24h</td></tr>
              <tr><td className="p-3 border-t">Mensalidade</td><td className="p-3 border-t">Geralmente sim</td><td className="p-3 border-t">NÃ£o</td></tr>
              <tr><td className="p-3 border-t">IndicaÃ§Ã£o</td><td className="p-3 border-t">Uso casual</td><td className="p-3 border-t">SeguranÃ§a real</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Qual Escolher?</h2>
        <p>Para <strong>seguranÃ§a real e profissional</strong>, o sistema DVR com cÃ¢meras Intelbras Ã© a escolha certa. Funciona independente da internet, nÃ£o pode ser desativado remotamente e grava continuamente sem custo mensal.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Kit 4 CÃ¢meras Intelbras com InstalaÃ§Ã£o</h3>
          <p className="text-muted-foreground mb-0">Sistema DVR profissional completo com 4 cÃ¢meras HD, DVR, HD de gravaÃ§Ã£o e instalaÃ§Ã£o inclusa por <strong>R$ 1.350</strong>. Atendemos Curitiba, SÃ£o JosÃ© dos Pinhais e Litoral do PR.</p>
        </div>
      </>
    ),
  },
  "seguranca-casas-praia-itapoa-guaratuba": {
    title: "SeguranÃ§a em Casas de Praia: Como Proteger Seu ImÃ³vel em ItapoÃ¡ e Guaratuba",
    excerpt: "ImÃ³veis de veraneio ficam meses desocupados e sÃ£o alvos fÃ¡ceis.",
    date: "2026-02-12",
    readTime: "7 min",
    category: "CFTV",
    content: (
      <>
        <p className="lead">Quem tem casa de praia no litoral do ParanÃ¡ conhece a preocupaÃ§Ã£o: <strong>o imÃ³vel fica vazio durante 9 meses do ano</strong>. Sem vigilÃ¢ncia, se torna alvo fÃ¡cil para furtos, vandalismo e invasÃµes. Veja como resolver isso de forma definitiva.</p>

        <h2>O Problema: ImÃ³vel Vazio = Alvo FÃ¡cil</h2>
        <p>Cidades como <strong>ItapoÃ¡</strong> e <strong>Guaratuba</strong> recebem turistas no verÃ£o, mas fora da temporada as ruas ficam vazias. Criminosos sabem disso e aproveitam a baixa movimentaÃ§Ã£o para agir:</p>
        <ul>
          <li>Furto de eletrodomÃ©sticos e mÃ³veis</li>
          <li>Vandalismo e depredaÃ§Ã£o</li>
          <li>InvasÃ£o para uso irregular do imÃ³vel</li>
          <li>Danos na rede elÃ©trica e hidrÃ¡ulica</li>
        </ul>

        <h2>A SoluÃ§Ã£o: Monitoramento Remoto 24h</h2>
        <p>Com cÃ¢meras de seguranÃ§a e acesso remoto, vocÃª transforma seu celular em uma central de monitoramento. Funciona assim:</p>
        <ul>
          <li><strong>CÃ¢meras com visÃ£o noturna</strong> captam tudo, mesmo no escuro</li>
          <li><strong>DVR grava continuamente</strong> no HD local, sem depender de internet estÃ¡vel</li>
          <li><strong>App no celular</strong> permite ver ao vivo de Curitiba ou qualquer cidade</li>
          <li><strong>Alerta de movimento</strong> avisa quando alguÃ©m se aproxima</li>
        </ul>

        <h2>Casos Reais no Litoral</h2>
        <p>ProprietÃ¡rios que instalaram cÃ¢meras em casas de praia relatam resultados imediatos: identificaÃ§Ã£o de invasores, acionamento da PM em tempo real e <strong>reduÃ§Ã£o total de ocorrÃªncias</strong> apÃ³s a instalaÃ§Ã£o visÃ­vel das cÃ¢meras.</p>

        <h2>Dicas Extras de SeguranÃ§a</h2>
        <ul>
          <li>Mantenha a vegetaÃ§Ã£o do terreno aparada (mato alto indica casa vazia)</li>
          <li>Use timer em lÃ¢mpadas para simular presenÃ§a</li>
          <li>PeÃ§a a um vizinho de confianÃ§a para verificar periodicamente</li>
          <li>Instale cÃ¢meras visÃ­veis na fachada (efeito deterrente)</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Proteja Sua Casa de Praia</h3>
          <p className="text-muted-foreground mb-0">O TÃ©cnico de InformÃ¡tica instala cÃ¢meras Intelbras em <strong>ItapoÃ¡, Guaratuba e todo o litoral do PR</strong>. Kit completo com 4 cÃ¢meras, DVR e acesso remoto por R$ 1.350. InstalaÃ§Ã£o executada por tÃ©cnico prÃ³prio, com garantia conforme o serviÃ§o executado.</p>
        </div>
      </>
    ),
  },
  "como-escolher-melhor-kit-cameras-seguranca": {
    title: "Como Escolher o Melhor Kit de CÃ¢meras de SeguranÃ§a Para Sua Casa ou ComÃ©rcio",
    excerpt: "Guia completo para escolher o kit ideal de CFTV.",
    date: "2026-02-10",
    readTime: "9 min",
    category: "CFTV",
    content: (
      <>
        <p className="lead">Comprar cÃ¢meras de seguranÃ§a pode parecer simples, mas <strong>escolher errado significa jogar dinheiro fora</strong>. Neste guia, explicamos os critÃ©rios tÃ©cnicos que realmente importam para proteger seu imÃ³vel.</p>

        <h2>1. Quantas CÃ¢meras VocÃª Precisa?</h2>
        <p>A regra geral Ã© cobrir todos os acessos e pontos vulnerÃ¡veis:</p>
        <ul>
          <li><strong>Casa pequena/apartamento:</strong> 2 a 4 cÃ¢meras (entrada, garagem, quintal)</li>
          <li><strong>Casa grande:</strong> 4 a 8 cÃ¢meras (perÃ­metro completo)</li>
          <li><strong>ComÃ©rcio:</strong> 4 a 16 cÃ¢meras (caixa, estoque, entrada, corredor)</li>
          <li><strong>CondomÃ­nio:</strong> 8+ cÃ¢meras (portaria, garagem, Ã¡reas comuns)</li>
        </ul>

        <h2>2. ResoluÃ§Ã£o: HD, Full HD ou 4K?</h2>
        <p>Para a maioria dos casos, <strong>cÃ¢meras HD (720p) ou Full HD (1080p)</strong> sÃ£o suficientes e oferecem excelente custo-benefÃ­cio. CÃ¢meras 4K sÃ£o indicadas para grandes Ã¡reas onde Ã© necessÃ¡rio dar zoom nas imagens.</p>

        <h2>3. VisÃ£o Noturna</h2>
        <p>Essencial. A maioria dos crimes acontece Ã  noite. Procure cÃ¢meras com <strong>infravermelho (IR)</strong> que captam imagens em atÃ© 20-30 metros de distÃ¢ncia no escuro total.</p>

        <h2>4. Armazenamento</h2>
        <ul>
          <li><strong>HD 1TB:</strong> armazena aproximadamente 7-10 dias com 4 cÃ¢meras</li>
          <li><strong>HD 2TB:</strong> aproximadamente 15-20 dias</li>
          <li>A gravaÃ§Ã£o Ã© contÃ­nua e quando o HD enche, sobrescreve as mais antigas</li>
        </ul>

        <h2>5. Marca do Equipamento</h2>
        <p>No Brasil, a <strong>Intelbras</strong> Ã© lÃ­der absoluta em CFTV. Oferece equipamentos de qualidade, suporte nacional, garantia real e app de acesso remoto estÃ¡vel. Evite marcas desconhecidas â€” economia no equipamento pode sair caro na seguranÃ§a.</p>

        <h2>6. InstalaÃ§Ã£o: Profissional ou FaÃ§a VocÃª Mesmo?</h2>
        <p>InstalaÃ§Ã£o amadora Ã© a principal causa de sistemas que nÃ£o funcionam corretamente. Um tÃ©cnico profissional garante:</p>
        <ul>
          <li>Posicionamento correto das cÃ¢meras</li>
          <li>Passagem adequada dos cabos</li>
          <li>ConfiguraÃ§Ã£o correta do DVR e acesso remoto</li>
          <li>Teste completo de todas as cÃ¢meras</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Kit Recomendado: 4 CÃ¢meras Intelbras</h3>
          <p className="text-muted-foreground mb-0">Kit completo com 4 cÃ¢meras HD, DVR 4 canais, HD de gravaÃ§Ã£o, cabos, conectores e <strong>instalaÃ§Ã£o profissional inclusa</strong> por R$ 1.350. Garantia de 1 ano. Atendemos Curitiba e regiÃ£o.</p>
        </div>
      </>
    ),
  },
  "monitoramento-24-horas-como-funciona": {
    title: "Monitoramento 24 Horas: Como Funciona e Por Que VocÃª Precisa",
    excerpt: "Saiba como funciona a gravaÃ§Ã£o contÃ­nua e o acesso remoto.",
    date: "2026-02-08",
    readTime: "6 min",
    category: "CFTV",
    content: (
      <>
        <p className="lead">Monitoramento 24 horas nÃ£o Ã© mais exclusividade de grandes empresas. Com um kit de cÃ¢meras Intelbras e um celular, <strong>qualquer pessoa pode vigiar seu imÃ³vel em tempo real</strong>, de qualquer lugar do mundo.</p>

        <h2>Como Funciona na PrÃ¡tica</h2>
        <p>O sistema Ã© composto por cÃ¢meras conectadas a um DVR (gravador digital) que registra tudo continuamente em um HD interno. Ao mesmo tempo, o DVR se conecta Ã  internet e transmite as imagens para o app no seu celular.</p>
        <ul>
          <li><strong>GravaÃ§Ã£o local:</strong> funciona 24h, mesmo sem internet</li>
          <li><strong>Acesso remoto:</strong> veja ao vivo pelo app (Android/iPhone)</li>
          <li><strong>Playback:</strong> volte e reveja gravaÃ§Ãµes passadas</li>
          <li><strong>Alertas:</strong> notificaÃ§Ã£o quando detecta movimento</li>
        </ul>

        <h2>Por Que o Monitoramento ContÃ­nuo Ã© Essencial?</h2>
        <p>A maioria dos crimes Ã© planejada. Criminosos observam rotinas e escolhem momentos de vulnerabilidade. Com monitoramento 24h:</p>
        <ul>
          <li>Toda atividade suspeita Ã© registrada como prova</li>
          <li>CÃ¢meras visÃ­veis inibem aÃ§Ãµes criminosas</li>
          <li>VocÃª pode acionar a polÃ­cia em tempo real</li>
          <li>FuncionÃ¡rios sabem que estÃ£o sendo monitorados</li>
        </ul>

        <h2>Precisa Pagar Mensalidade?</h2>
        <p><strong>NÃ£o!</strong> Diferente de serviÃ§os de monitoramento terceirizados, o sistema com DVR Ã© 100% seu. NÃ£o hÃ¡ mensalidade, nÃ£o hÃ¡ contrato. VocÃª paga uma vez e usa para sempre.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Monte Seu Sistema de Monitoramento</h3>
          <p className="text-muted-foreground mb-0">Kit 4 cÃ¢meras Intelbras com DVR, HD e instalaÃ§Ã£o profissional por <strong>R$ 1.350</strong>. Configuramos o app no seu celular na hora. Sem mensalidade, sem burocracia.</p>
        </div>
      </>
    ),
  },
  "equipe-especializada-cftv-litoral-parana": {
    title: "Equipe Especializada em CFTV no Litoral do ParanÃ¡: Por Que Contratar Profissionais",
    excerpt: "InstalaÃ§Ã£o amadora pode comprometer toda a seguranÃ§a.",
    date: "2026-02-06",
    readTime: "7 min",
    category: "CFTV",
    content: (
      <>
        <p className="lead">Comprar cÃ¢meras de seguranÃ§a Ã© apenas metade do trabalho. A <strong>instalaÃ§Ã£o profissional Ã© o que diferencia um sistema funcional de um equipamento inÃºtil</strong>. No litoral do ParanÃ¡, onde as condiÃ§Ãµes sÃ£o mais desafiadoras, isso Ã© ainda mais crÃ­tico.</p>

        <h2>Os Riscos da InstalaÃ§Ã£o Amadora</h2>
        <ul>
          <li><strong>Posicionamento errado:</strong> cÃ¢meras que nÃ£o cobrem os pontos vulnerÃ¡veis</li>
          <li><strong>Cabos expostos:</strong> fÃ¡ceis de cortar por invasores</li>
          <li><strong>ConfiguraÃ§Ã£o incorreta:</strong> gravaÃ§Ã£o que nÃ£o funciona ou acesso remoto instÃ¡vel</li>
          <li><strong>Falta de proteÃ§Ã£o contra intempÃ©ries:</strong> no litoral, a maresia e umidade destroem equipamentos mal instalados</li>
        </ul>

        <h2>O Que Uma Equipe Especializada Faz de Diferente</h2>
        <ul>
          <li><strong>AnÃ¡lise do local:</strong> identificaÃ§Ã£o de todos os pontos vulnerÃ¡veis antes da instalaÃ§Ã£o</li>
          <li><strong>Passagem protegida dos cabos:</strong> dentro de conduÃ­tes, protegidos e invisÃ­veis</li>
          <li><strong>ConfiguraÃ§Ã£o completa:</strong> DVR, gravaÃ§Ã£o, acesso remoto e alertas no celular</li>
          <li><strong>ProteÃ§Ã£o contra maresia:</strong> selagem adequada dos conectores e escolha de pontos protegidos</li>
          <li><strong>Teste completo:</strong> verificaÃ§Ã£o de cada cÃ¢mera, visÃ£o noturna e gravaÃ§Ã£o antes de entregar</li>
        </ul>

        <h2>Por que o TÃ©cnico de InformÃ¡tica no Litoral?</h2>
        <p>O atendimento no litoral considera as condiÃ§Ãµes locais: maresia, oscilaÃ§Ã£o de energia, imÃ³veis fechados por longos perÃ­odos e internet instÃ¡vel fora da temporada. Cada um desses fatores muda a escolha de equipamento, o ponto de instalaÃ§Ã£o e a forma de acesso remoto â€” e Ã© avaliado antes da proposta.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">InstalaÃ§Ã£o Profissional no Litoral do PR</h3>
          <p className="text-muted-foreground mb-0">Kit 4 cÃ¢meras Intelbras com instalaÃ§Ã£o especializada por <strong>R$ 1.350</strong>. Atendimento no litoral do ParanÃ¡ conforme disponibilidade de agenda. Garantia conforme o serviÃ§o executado e o equipamento instalado.</p>
        </div>
      </>
    ),
  },
  "windows-11-atualizacao-kb5074105-novidades": {
    title: "Windows 11 KB5074105: Todas as Novidades da AtualizaÃ§Ã£o de Janeiro 2026",
    excerpt: "A Microsoft liberou a atualizaÃ§Ã£o KB5074105 para Windows 11 25H2 e 24H2 com recursos inÃ©ditos: Smart App Control configurÃ¡vel, sincronizaÃ§Ã£o celular-PC, melhorias no Windows Hello e correÃ§Ãµes crÃ­ticas.",
    date: "2026-01-30",
    readTime: "10 min",
    category: "Windows 11",
    image: windowsKb5074105Image,
    content: (
      <>
        <p className="lead">
          A <strong>Microsoft</strong> comeÃ§ou a liberar a atualizaÃ§Ã£o <strong>KB5074105</strong> para o <strong>Windows 11</strong>, 
          e desta vez nÃ£o Ã© sÃ³ mais um pacote de correÃ§Ãµes pontuais. O update opcional de janeiro de 2026 traz mudanÃ§as importantes 
          tanto para a versÃ£o <strong>25H2 quanto para a 24H2</strong>, incluindo algo que usuÃ¡rios pediam hÃ¡ tempos: a possibilidade 
          de ativar ou desativar o Controle de Aplicativos Inteligentes sem precisar reinstalar o sistema.
        </p>

        <h2>Onde Baixar o Patch KB5074105</h2>
        <p>
          A atualizaÃ§Ã£o jÃ¡ estÃ¡ disponÃ­vel via <strong>Windows Update</strong> e tambÃ©m pode ser baixada manualmente por meio dos 
          instaladores offline (.msu). Por padrÃ£o, ela nÃ£o Ã© instalada automaticamente, a menos que o usuÃ¡rio ative a opÃ§Ã£o de 
          receber atualizaÃ§Ãµes assim que elas ficarem disponÃ­veis.
        </p>
        <p>
          Nos testes, o pacote aparece identificado como <strong>2026-01 Update (KB5074105)</strong> e leva o sistema para a 
          <strong> build 26200.7705 no Windows 11 25H2</strong> ou <strong>26100.7705 no 24H2</strong>.
        </p>
        <p>
          <strong>AtenÃ§Ã£o:</strong> Apesar de opcional, trata-se de um update grande. Os instaladores passam facilmente dos 4 GB, 
          algo que jÃ¡ virou motivo de crÃ­tica. O motivo para um arquivo desse tamanho Ã© a inclusÃ£o de modelos de IA no pacote, 
          mesmo em PCs que nÃ£o possuem NPU ou qualquer recurso de aceleraÃ§Ã£o para inteligÃªncia artificial.
        </p>
        <p>
          Em uma conexÃ£o de 200 Mbps, o download e a instalaÃ§Ã£o levam cerca de 15 minutos, seguidos por um reinÃ­cio obrigatÃ³rio. 
          A boa notÃ­cia Ã© que, diferente das atualizaÃ§Ãµes do Patch Tuesday, essa <strong>pode ser desinstalada</strong> a qualquer momento.
        </p>

        <h2>Principais Novidades da KB5074105</h2>
        
        <h3>1. Retomar Tarefas Entre Celular e PC</h3>
        <p>
          Um dos destaques da KB5074105 Ã© a evoluÃ§Ã£o do recurso <strong>Retomar</strong>, que funciona como uma espÃ©cie de Handoff do Windows. 
          O sistema permite iniciar uma tarefa no celular e continuar exatamente de onde parou ao desbloquear o PC.
        </p>
        <p>
          Antes, o recurso era bastante limitado e funcionava basicamente com o OneDrive. Com essa atualizaÃ§Ã£o, o suporte foi ampliado para 
          aplicativos populares, como o <strong>Spotify</strong>. Se vocÃª estiver ouvindo uma mÃºsica no celular, por exemplo, o Windows passa 
          a exibir um aviso na barra de tarefas para retomar a reproduÃ§Ã£o instantaneamente no desktop.
        </p>
        <p>
          O mesmo vale para documentos do Word, Excel e PowerPoint, alÃ©m de navegadores de terceiros e atÃ© do Microsoft 365 Copilot.
        </p>

        <h3>2. Smart App Control Finalmente ConfigurÃ¡vel</h3>
        <p>
          Outro avanÃ§o muito aguardado envolve o <strong>Smart App Control</strong>, recurso de seguranÃ§a que bloqueia aplicativos 
          considerados nÃ£o confiÃ¡veis. Embora a proposta seja proteger o usuÃ¡rio, na prÃ¡tica ele acabava barrando softwares legÃ­timos 
          e criava uma situaÃ§Ã£o absurda: <strong>para desativar o recurso, era necessÃ¡rio reinstalar o Windows</strong>.
        </p>
        <p>
          Com a KB5074105, isso finalmente muda. Agora Ã© possÃ­vel ativar ou desativar o Controle de Aplicativos Inteligentes 
          diretamente pelo app de SeguranÃ§a do Windows, sem instalaÃ§Ã£o limpa e sem gambiarras.
        </p>

        <h3>3. Melhorias no Windows MIDI</h3>
        <p>
          Quem trabalha com mÃºsica tambÃ©m ganha melhorias importantes. O <strong>Windows MIDI Services</strong> recebeu ajustes que 
          tornam o funcionamento mais estÃ¡vel e rÃ¡pido tanto no MIDI 1.0 quanto no MIDI 2.0. Isso significa menos conflitos e 
          possibilidade de compartilhar portas MIDI entre aplicativos.
        </p>

        <h3>4. Windows Hello Mais Seguro</h3>
        <p>
          A atualizaÃ§Ã£o tambÃ©m amplia o suporte ao <strong>Windows Hello Enhanced Sign-in Security (ESS)</strong>. AtÃ© agora, 
          o nÃ­vel extra de seguranÃ§a sÃ³ funcionava com sensores de impressÃ£o digital integrados ao notebook. Com a KB5074105, 
          sensores perifÃ©ricos passam a ser compatÃ­veis.
        </p>

        <h3>5. Novo CartÃ£o de Dispositivo nas ConfiguraÃ§Ãµes</h3>
        <p>
          A pÃ¡gina inicial do aplicativo ConfiguraÃ§Ãµes tambÃ©m recebeu ajustes. Um novo <strong>cartÃ£o de Dispositivo</strong> passa 
          a exibir informaÃ§Ãµes bÃ¡sicas sobre o computador, como armazenamento e uso geral, facilitando o acesso rÃ¡pido Ã s informaÃ§Ãµes 
          mais importantes.
        </p>

        <h2>CorreÃ§Ãµes de Bugs Importantes</h2>
        <p>
          AlÃ©m dos novos recursos, a Microsoft corrigiu uma sÃ©rie de problemas que vinham incomodando usuÃ¡rios:
        </p>
        <ul>
          <li>Travamentos do explorer.exe</li>
          <li>SumiÃ§o da barra de tarefas</li>
          <li>Erros de personalizaÃ§Ã£o no Explorador de Arquivos</li>
          <li>Casos raros de tela preta apÃ³s a atualizaÃ§Ã£o</li>
          <li>Erros de BSOD relacionados Ã  dxgmms2.sys em algumas GPUs</li>
          <li>Problemas no menu Iniciar</li>
          <li>Falhas na tela de bloqueio</li>
          <li>MovimentaÃ§Ã£o inesperada de Ã­cones na Ã¡rea de trabalho</li>
          <li>Erros no Windows Sandbox</li>
        </ul>

        <h2>Problemas Conhecidos</h2>
        <div className="bg-destructive/10 rounded-xl p-6 my-8 border border-destructive/20">
          <h3 className="text-destructive font-bold mb-2">âš ï¸ AtenÃ§Ã£o: Bug da Tela Preta</h3>
          <p className="text-muted-foreground mb-4">
            A atualizaÃ§Ã£o obrigatÃ³ria do Windows 11 liberada em janeiro de 2026 ainda apresenta problemas para alguns usuÃ¡rios. 
            Mesmo apÃ³s a Microsoft liberar um patch emergencial (KB5078127), alguns usuÃ¡rios seguem enfrentando <strong>tela preta, 
            travamentos e falhas de inicializaÃ§Ã£o</strong>.
          </p>
          <p className="text-muted-foreground mb-0">
            Os sistemas afetados podem exibir o erro <strong>UNMOUNTABLE_BOOT_VOLUME</strong> ou <strong>UNEXPECTED_KERNEL_MODE_TRAP</strong>. 
            Em alguns casos, o caminho mais consistente Ã© <strong>formatar e reinstalar o Windows</strong>.
          </p>
        </div>

        <p>
          A Microsoft tambÃ©m confirmou que ainda investiga um bug antigo em que o <strong>Ã­cone de senha desaparece da tela de login</strong>, 
          um problema detectado desde 2025. A empresa afirma estar trabalhando em uma correÃ§Ã£o, mas ainda nÃ£o divulgou prazo.
        </p>

        <h2>Vale a Pena Instalar a KB5074105?</h2>
        <p>
          Se vocÃª nÃ£o estÃ¡ enfrentando problemas com o Windows 11 atual, pode esperar alguns dias para ver se novos bugs sÃ£o reportados. 
          PorÃ©m, se vocÃª precisa dos novos recursos (especialmente a possibilidade de desativar o Smart App Control), a atualizaÃ§Ã£o 
          traz melhorias significativas.
        </p>
        <p>
          <strong>RecomendaÃ§Ã£o:</strong> FaÃ§a um backup completo antes de instalar qualquer atualizaÃ§Ã£o major. Se algo der errado, 
          vocÃª poderÃ¡ restaurar o sistema ou seus arquivos.
        </p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Problemas com AtualizaÃ§Ã£o do Windows 11?</h3>
          <p className="text-muted-foreground mb-0">
            Se vocÃª instalou a atualizaÃ§Ã£o e estÃ¡ enfrentando tela preta, travamentos ou erros de inicializaÃ§Ã£o, 
            um <strong>tÃ©cnico especializado em Windows 11</strong> pode ajudar a recuperar seu sistema ou fazer uma 
            <strong> formataÃ§Ã£o segura</strong> preservando seus arquivos. Atendimento em Curitiba e regiÃ£o conforme a agenda disponÃ­vel.
          </p>
        </div>
      </>
    ),
  },
  "como-escolher-um-bom-antivirus": {
    title: "Como escolher um antivÃ­rus: o que muda de verdade na proteÃ§Ã£o",
    excerpt:
      "CritÃ©rios tÃ©cnicos para escolher a proteÃ§Ã£o do Windows: o que o antivÃ­rus do sistema jÃ¡ cobre, quando um pago faz diferenÃ§a, o que Ã© sÃ³ marketing e como reconhecer falso antivÃ­rus.",
    date: "2026-08-12",
    readTime: "11 min",
    category: "SeguranÃ§a",
    content: (
      <>
        <p className="lead">A pergunta que chega na bancada quase sempre Ã© "qual Ã© o melhor antivÃ­rus?". A resposta honesta Ã© que o programa importa menos do que a combinaÃ§Ã£o entre sistema atualizado, hÃ¡bitos de download e uma conta de usuÃ¡rio que nÃ£o seja administradora o tempo todo. Ainda assim, a escolha da ferramenta faz diferenÃ§a â€” e hÃ¡ critÃ©rios objetivos para decidir.</p>

        <h2>O que jÃ¡ vem instalado no Windows</h2>
        <p>O Windows 10 e o Windows 11 incluem o aplicativo SeguranÃ§a do Windows, que reÃºne o Microsoft Defender Antivirus, firewall e outros controles. Quando outro antivÃ­rus compatÃ­vel estÃ¡ instalado, ativo e registrado no sistema, o Defender deixa de ser o antivÃ­rus principal; se esse produto for removido, a proteÃ§Ã£o nativa pode voltar a ser ativada.</p>
        <p>Isso muda o ponto de partida: antes de comprar uma licenÃ§a, abra <em>SeguranÃ§a do Windows â†’ ProteÃ§Ã£o contra vÃ­rus e ameaÃ§as</em> e confirme qual provedor estÃ¡ ativo, se a proteÃ§Ã£o em tempo real estÃ¡ ligada e se as definiÃ§Ãµes foram atualizadas. O nome do produto importa menos do que a proteÃ§Ã£o estar realmente operante.</p>

        <h2>Os quatro critÃ©rios que realmente pesam</h2>
        <h3>1. DetecÃ§Ã£o por comportamento, nÃ£o sÃ³ por assinatura</h3>
        <p>Assinatura Ã© o "retrato falado" de um arquivo jÃ¡ conhecido. Como ameaÃ§as podem mudar para escapar desse reconhecimento, vale verificar se o produto tambÃ©m monitora comportamentos suspeitos. Esse recurso acrescenta uma camada de detecÃ§Ã£o, mas nÃ£o garante que toda ameaÃ§a nova serÃ¡ bloqueada.</p>

        <h3>2. ProteÃ§Ã£o contra ransomware com controle de pastas</h3>
        <p>No Windows, o acesso controlado a pastas pode impedir que aplicativos nÃ£o autorizados alterem arquivos em locais protegidos. Programas legÃ­timos tambÃ©m podem ser bloqueados e precisam ser permitidos de forma explÃ­cita. Ã‰ uma camada Ãºtil contra ransomware, mas nÃ£o substitui backup desconectado e restauraÃ§Ã£o testada.</p>

        <h3>3. Impacto no desempenho</h3>
        <p>Uma suÃ­te pesada em um computador com disco mecÃ¢nico e 4 GB de memÃ³ria transforma seguranÃ§a em lentidÃ£o, e o desfecho previsÃ­vel Ã© o usuÃ¡rio desativando tudo. Em mÃ¡quinas antigas, uma proteÃ§Ã£o leve que permanece ligada vale mais do que uma completa que serÃ¡ desligada na primeira semana.</p>

        <h3>4. TransparÃªncia de quem publica</h3>
        <p>Fabricante identificÃ¡vel, polÃ­tica de privacidade legÃ­vel, canal de suporte e presenÃ§a em testes independentes de laboratÃ³rios reconhecidos. Programa distribuÃ­do por site de download genÃ©rico, sem pÃ¡gina oficial prÃ³pria, nÃ£o entra na lista de candidatos.</p>

        <h2>Gratuito ou pago: onde estÃ¡ a fronteira</h2>
        <p>Para uso domÃ©stico comum â€” navegaÃ§Ã£o, streaming, banco, estudo e documentos â€”, comece avaliando a proteÃ§Ã£o nativa ativa, o sistema atualizado e os hÃ¡bitos de download. Uma licenÃ§a adicional nÃ£o deve ser tratada como requisito automÃ¡tico nem como substituta dessas camadas.</p>
        <p>A versÃ£o paga passa a fazer sentido em situaÃ§Ãµes especÃ­ficas:</p>
        <ul>
          <li>VÃ¡rios computadores para administrar, com necessidade de visÃ£o central do que estÃ¡ acontecendo.</li>
          <li>Uso profissional com dados de terceiros, em que a indisponibilidade tem custo direto.</li>
          <li>Ambiente com muitos usuÃ¡rios no mesmo equipamento, inclusive crianÃ§as e adolescentes.</li>
          <li>HistÃ³rico de infecÃ§Ãµes repetidas, que indica necessidade de camadas extras enquanto os hÃ¡bitos mudam.</li>
        </ul>
        <p>NÃ£o existe licenÃ§a que compense sistema desatualizado, senha repetida em todos os serviÃ§os e download de instalador "ativado" de origem desconhecida. Essa Ã© a ordem de prioridade â€” ferramenta depois de hÃ¡bito.</p>

        <h2>Checklist antes de comprar</h2>
        <ol>
          <li><strong>Confirme o provedor ativo:</strong> verifique no SeguranÃ§a do Windows se hÃ¡ proteÃ§Ã£o em tempo real e quando ocorreu a Ãºltima atualizaÃ§Ã£o.</li>
          <li><strong>Defina a necessidade:</strong> anote se vocÃª precisa de gestÃ£o de vÃ¡rios dispositivos, suporte, controle parental ou proteÃ§Ã£o corporativa. Sem necessidade concreta, recursos extras viram custo e complexidade.</li>
          <li><strong>Confira compatibilidade:</strong> valide a versÃ£o do Windows e os requisitos do produto no site oficial. Em equipamento antigo, observe consumo de memÃ³ria e disco durante o perÃ­odo de avaliaÃ§Ã£o.</li>
          <li><strong>Leia renovaÃ§Ã£o e cancelamento:</strong> preÃ§o promocional inicial nÃ£o informa necessariamente o custo do prÃ³ximo perÃ­odo.</li>
          <li><strong>Planeje a troca:</strong> remova o produto anterior pelo procedimento oficial, reinicie e confirme de novo qual provedor ficou ativo. NÃ£o deixe o computador entre duas instalaÃ§Ãµes sem verificar o estado final.</li>
        </ol>

        <h2>Recursos que soam bem e merecem leitura atenta</h2>
        <ul>
          <li><strong>Otimizador e limpador de registro:</strong> costuma entregar ganho imperceptÃ­vel e, em alguns casos, remove entradas Ãºteis. NÃ£o Ã© motivo para escolher um pacote.</li>
          <li><strong>VPN inclusa:</strong> Ãºtil em rede pÃºblica, mas a qualidade varia muito entre fabricantes e o limite de trÃ¡fego do plano bÃ¡sico costuma ser baixo.</li>
          <li><strong>Gerenciador de senhas:</strong> pode ser um bom recurso, desde que vocÃª saiba como exportar os dados caso decida trocar de fornecedor.</li>
          <li><strong>ExtensÃµes de navegador:</strong> instale apenas a oficial do fabricante e apenas se for usar. Cada extensÃ£o amplia a superfÃ­cie de acesso ao que vocÃª digita.</li>
        </ul>

        <h2>Como reconhecer um falso antivÃ­rus</h2>
        <p>O golpe mais comum nÃ£o invade o computador: ele convence o usuÃ¡rio a instalar. A imagem de capa deste guia mostra exatamente esse padrÃ£o â€” uma tela alarmante afirmando que a mÃ¡quina estÃ¡ infectada. Os sinais que se repetem:</p>
        <ul>
          <li>Janela do navegador em tela cheia dizendo que "vÃ­rus foram detectados agora" e exibindo contagem regressiva.</li>
          <li>NÃºmero de telefone para "suporte imediato" em um alerta inesperado â€” trate como sinal de golpe e nÃ£o ligue.</li>
          <li>VerificaÃ§Ã£o que "roda" dentro de uma pÃ¡gina web. Nenhum site consegue varrer o seu disco.</li>
          <li>Pedido de pagamento por link para "liberar a limpeza".</li>
          <li>Programa que se instala sem pedir confirmaÃ§Ã£o e depois resiste Ã  desinstalaÃ§Ã£o.</li>
        </ul>
        <p>Se a tela apareceu no navegador, feche a janela pelo Gerenciador de Tarefas e nÃ£o clique em nada dentro dela. Se um programa jÃ¡ foi instalado, o caminho Ã© remoÃ§Ã£o assistida e verificaÃ§Ã£o do que mais entrou junto â€” normalmente vem acompanhado de adware e de sequestro da pÃ¡gina inicial.</p>

        <h2>Erros de instalaÃ§Ã£o que enfraquecem a proteÃ§Ã£o</h2>
        <ol>
          <li><strong>Tentar forÃ§ar dois antivÃ­rus como proteÃ§Ã£o principal.</strong> O Windows gerencia o provedor registrado e pode colocar a proteÃ§Ã£o nativa em outro modo quando um produto compatÃ­vel assume. Confirme o estado no SeguranÃ§a do Windows em vez de ativar componentes manualmente.</li>
          <li><strong>Baixar de site agregador.</strong> Sempre pelo domÃ­nio oficial do fabricante, digitado Ã  mÃ£o ou vindo de resultado orgÃ¢nico verificado.</li>
          <li><strong>Aceitar o instalador completo sem ler.</strong> Ã‰ onde entram barras de ferramentas e trocas de buscador padrÃ£o.</li>
          <li><strong>Desligar a proteÃ§Ã£o para instalar algo que ela bloqueou.</strong> Se foi bloqueado, o motivo merece verificaÃ§Ã£o antes da exceÃ§Ã£o.</li>
          <li><strong>Ignorar atualizaÃ§Ãµes do sistema e do navegador.</strong> O antivÃ­rus Ã© apenas uma camada; correÃ§Ãµes fecham falhas que poderiam ser exploradas antes mesmo da anÃ¡lise do arquivo.</li>
        </ol>

        <h2>O que fazer quando a suspeita jÃ¡ existe</h2>
        <p>Se o computador apresenta comportamento estranho, o primeiro passo Ã© diagnÃ³stico, nÃ£o instalaÃ§Ã£o de mais programas. Vale conferir os sinais reunidos em <Link to="/blog/como-saber-se-pc-tem-virus-malware">como saber se o PC tem vÃ­rus ou malware</Link> e, se houver arquivos importantes envolvidos, garantir cÃ³pia antes de qualquer limpeza â€” o roteiro estÃ¡ em <Link to="/blog/backup-como-proteger-seus-arquivos">backup: como proteger seus arquivos</Link>.</p>
        <p>Quando a infecÃ§Ã£o jÃ¡ alterou navegador, tarefas agendadas ou serviÃ§os do sistema, a remoÃ§Ã£o manual passa a exigir mÃ©todo. Nesses casos, a <Link to="/servicos/remocao-de-virus">remoÃ§Ã£o de vÃ­rus e malware</Link> inclui verificaÃ§Ã£o do que ficou para trÃ¡s, e a <Link to="/servicos/formatacao">formataÃ§Ã£o com reinstalaÃ§Ã£o do sistema</Link> entra em cena quando o estrago compromete componentes do prÃ³prio Windows. Antes de decidir, entenda o critÃ©rio em <Link to="/diagnostico-tecnico">como funciona o diagnÃ³stico tÃ©cnico</Link>.</p>

        <h2>Resumo prÃ¡tico</h2>
        <p>Mantenha o sistema atualizado, confirme qual proteÃ§Ã£o estÃ¡ ativa, avalie uma soluÃ§Ã£o paga apenas diante de necessidade concreta e desconfie de alertas alarmistas no navegador. Nenhum antivÃ­rus substitui backup, autenticaÃ§Ã£o multifator, senhas exclusivas e cuidado com downloads.</p>
        <EditorialReferences slug="como-escolher-um-bom-antivirus" />
        <p className="text-sm text-muted-foreground">ConteÃºdo produzido e revisado pela equipe editorial de O TÃ©cnico de InformÃ¡tica. Revisado em 6 de setembro de 2026.</p>
      </>
    ),
  },
  "dicas-manter-notebook-funcionando-bem": {
    title: "Dicas Para Manter o Notebook Funcionando Bem (E Evitar AssistÃªncia)",
    excerpt:
      "Cuidados simples que aumentam a vida Ãºtil do notebook: limpeza, bateria, armazenamento, temperaturas, atualizaÃ§Ãµes e hÃ¡bitos que evitam travamentos.",
    date: "2024-02-01",
    readTime: "6 min",
    category: "ManutenÃ§Ã£o",
    content: (
      <>
        <p className="lead">
          Notebook Ã© prÃ¡tico, mas sofre com calor, poeira e falta de manutenÃ§Ã£o. Com alguns hÃ¡bitos simples
          vocÃª reduz travamentos, aumenta a vida Ãºtil e evita gastos com conserto.
        </p>

        <h2>1) Use em superfÃ­cie rÃ­gida (cama e sofÃ¡ sÃ£o vilÃµes)</h2>
        <p>
          Quando vocÃª usa o notebook em tecido, as entradas/saÃ­das de ar ficam bloqueadas e a temperatura
          sobe. Calor constante causa queda de desempenho e pode danificar componentes.
        </p>

        <h2>2) Controle o armazenamento (disco cheio deixa tudo lento)</h2>
        <ul>
          <li>Mantenha pelo menos <strong>15â€“20%</strong> do disco livre</li>
          <li>Remova programas que vocÃª nÃ£o usa</li>
          <li>Organize downloads e mova arquivos pesados para nuvem/HD externo</li>
        </ul>

        <h2>3) Atualize Windows, drivers e navegador</h2>
        <p>
          AtualizaÃ§Ãµes corrigem falhas e melhoram estabilidade. Navegador atualizado reduz risco de golpes e
          melhora performance.
        </p>

        <h2>4) Cuidado com carregador e bateria</h2>
        <ul>
          <li>Use carregador original ou compatÃ­vel de boa procedÃªncia</li>
          <li>Evite aquecer a bateria (deixe o notebook ventilado)</li>
          <li>Se a bateria estufar, pare de usar e procure assistÃªncia imediatamente</li>
        </ul>

        <h2>5) Limpeza preventiva e pasta tÃ©rmica (quando faz sentido)</h2>
        <p>
          Se a ventoinha fica muito barulhenta ou o notebook esquenta demais, pode ser hora de
          <strong> limpeza interna</strong> e, dependendo do caso, troca de pasta tÃ©rmica.
        </p>

        <h2>6) A melhor melhoria custo-benefÃ­cio: SSD</h2>
        <p>
          Se o notebook ainda usa HD, trocar por SSD costuma dar o maior ganho de velocidade.
          O sistema inicia mais rÃ¡pido e programas abrem quase instantaneamente.
        </p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Seu notebook estÃ¡ lento ou esquentando?</h3>
          <p className="text-muted-foreground mb-0">
            A gente faz diagnÃ³stico, limpeza preventiva, upgrade (SSD/RAM) e ajustes para deixar o notebook
            estÃ¡vel e rÃ¡pido â€” com orientaÃ§Ã£o clara do que vale a pena fazer.
          </p>
        </div>
      </>
    ),
  },
  "como-deixar-computador-mais-rapido": {
    title: "Como Deixar o Computador Mais RÃ¡pido: 7 Dicas PrÃ¡ticas",
    excerpt: "Seu PC estÃ¡ lento? Descubra 7 tÃ©cnicas simples que vocÃª pode aplicar hoje mesmo para melhorar a velocidade do seu computador sem gastar nada.",
    date: "2024-01-10",
    readTime: "5 min",
    category: "Dicas",
    content: (
      <>
        <p className="lead">Se vocÃª estÃ¡ cansado de esperar o computador ligar ou programas demorarem para abrir, este artigo Ã© para vocÃª. Veja 7 dicas prÃ¡ticas que podem ser aplicadas hoje mesmo.</p>
        
        <h2>1. Desative Programas na InicializaÃ§Ã£o</h2>
        <p>Muitos programas se configuram para iniciar junto com o Windows, deixando o boot mais lento. Abra o Gerenciador de Tarefas (Ctrl+Shift+Esc), vÃ¡ em "Inicializar" e desative os programas que nÃ£o precisa abrir automaticamente.</p>
        
        <h2>2. Limpe Arquivos TemporÃ¡rios</h2>
        <p>O Windows acumula arquivos temporÃ¡rios que ocupam espaÃ§o e podem deixar o sistema lento. Use o "Limpeza de Disco" (digite na busca do Windows) para remover esses arquivos com seguranÃ§a.</p>
        
        <h2>3. Desinstale Programas que NÃ£o Usa</h2>
        <p>VÃ¡ em ConfiguraÃ§Ãµes {'>'} Aplicativos e remova programas que vocÃª nÃ£o utiliza mais. AlÃ©m de liberar espaÃ§o, alguns podem estar rodando processos em segundo plano.</p>
        
        <h2>4. Verifique se HÃ¡ VÃ­rus</h2>
        <p>Malwares consomem recursos do computador. Execute uma verificaÃ§Ã£o completa com o Windows Defender ou um antivÃ­rus de sua confianÃ§a.</p>
        
        <h2>5. Atualize Drivers e Windows</h2>
        <p>Drivers desatualizados podem causar problemas de desempenho. Mantenha o Windows e os drivers sempre atualizados atravÃ©s do Windows Update.</p>
        
        <h2>6. Verifique o EspaÃ§o em Disco</h2>
        <p>Um disco muito cheio prejudica a performance. Idealmente, mantenha pelo menos 15-20% do disco livre. Se necessÃ¡rio, mova arquivos para um HD externo ou nuvem.</p>
        
        <h2>7. Considere um Upgrade de Hardware</h2>
        <p>Se seu computador tem mais de 5 anos, pode ser hora de um upgrade. Adicionar mais memÃ³ria RAM ou trocar o HD por um SSD pode fazer seu PC parecer novo.</p>
        
        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Ainda estÃ¡ lento?</h3>
          <p className="text-muted-foreground mb-0">Se apÃ³s seguir essas dicas o computador continuar lento, pode haver um problema mais sÃ©rio. Um tÃ©cnico especializado pode fazer um diagnÃ³stico completo e identificar a causa.</p>
        </div>
      </>
    ),
  },
  "sinais-computador-com-virus": {
    title: "5 Sinais de Que Seu Computador EstÃ¡ com VÃ­rus",
    excerpt: "Aprenda a identificar os principais sintomas de uma infecÃ§Ã£o por vÃ­rus ou malware e saiba quando Ã© hora de procurar um tÃ©cnico especializado.",
    date: "2024-01-08",
    readTime: "4 min",
    category: "SeguranÃ§a",
    content: (
      <>
        <p className="lead">VÃ­rus e malwares evoluem constantemente, mas alguns sintomas clÃ¡ssicos continuam sendo bons indicadores de infecÃ§Ã£o. ConheÃ§a os principais sinais.</p>
        
        <h2>1. LentidÃ£o Repentina</h2>
        <p>Se o computador que funcionava bem comeÃ§ou a ficar lento do dia para a noite, pode ser sinal de malware consumindo recursos do sistema em segundo plano.</p>
        
        <h2>2. Pop-ups e Propagandas Estranhas</h2>
        <p>Janelas de propaganda aparecendo mesmo quando vocÃª nÃ£o estÃ¡ navegando, ou anÃºncios diferentes dos habituais em sites conhecidos, sÃ£o sinais clÃ¡ssicos de adware.</p>
        
        <h2>3. Programas Desconhecidos</h2>
        <p>Note programas que vocÃª nÃ£o lembra de ter instalado? Barras de ferramentas no navegador? Isso indica que algum software malicioso pode ter se instalado sem seu conhecimento.</p>
        
        <h2>4. Redirecionamentos no Navegador</h2>
        <p>Ao pesquisar no Google vocÃª Ã© redirecionado para sites estranhos? Sua pÃ¡gina inicial mudou sozinha? Esses sÃ£o sinais de sequestro de navegador.</p>
        
        <h2>5. Arquivos Desaparecendo ou Criptografados</h2>
        <p>Este Ã© o sinal mais grave. Se seus arquivos sumiram ou aparece uma mensagem pedindo pagamento para recuperÃ¡-los, vocÃª pode ter sido vÃ­tima de ransomware.</p>
        
        <div className="bg-destructive/10 rounded-xl p-6 my-8 border border-destructive/20">
          <h3 className="text-destructive font-bold mb-2">âš ï¸ AtenÃ§Ã£o</h3>
          <p className="text-muted-foreground mb-0">Se vocÃª identificou algum desses sinais, evite fazer transaÃ§Ãµes bancÃ¡rias ou digitar senhas importantes atÃ© resolver o problema. Um tÃ©cnico pode remover as ameaÃ§as e garantir que seus dados estejam seguros.</p>
        </div>
      </>
    ),
  },
  "quando-trocar-hd-por-ssd": {
    title: "Vale a pena trocar o HD por SSD? Como avaliar o upgrade",
    excerpt: "O SSD acelera a inicializaÃ§Ã£o e a abertura de programas, mas nÃ£o resolve tudo. Veja o que muda.",
    date: "2024-01-05",
    readTime: "9 min",
    category: "Hardware",
    content: (
      <>
        <p className="lead">Trocar o HD por um SSD Ã© um dos upgrades mais perceptÃ­veis em computadores mais antigos. Ainda assim, nÃ£o Ã© uma soluÃ§Ã£o para qualquer problema. Vale entender o que realmente muda, o que continua limitado e o que precisa ser avaliado antes de investir.</p>

        <h2>Resposta rÃ¡pida</h2>
        <p>Trocar o HD por SSD compensa quando a lentidÃ£o aparece na inicializaÃ§Ã£o, na abertura de programas e no uso simultÃ¢neo de arquivos â€” sinal de que o armazenamento Ã© o gargalo. NÃ£o compensa como soluÃ§Ã£o isolada quando falta memÃ³ria, quando o processador Ã© o limite ou quando o sistema estÃ¡ corrompido ou infectado. Antes de comprar, confirme a interface aceita pelo equipamento (SATA 2,5" ou NVMe M.2) e o espaÃ§o fÃ­sico disponÃ­vel. Com o disco atual apresentando ruÃ­do ou erro de leitura, o backup vem antes de qualquer upgrade.</p>

        <h2>O que muda com o SSD</h2>
        <p>O SSD guarda dados em memÃ³ria flash, sem partes mÃ³veis. Na prÃ¡tica, o que mais se sente:</p>
        <ul>
          <li>InicializaÃ§Ã£o do sistema mais rÃ¡pida.</li>
          <li>Programas e arquivos abrindo mais rÃ¡pido.</li>
          <li>Menos travamentos ligados Ã  leitura lenta do disco.</li>
          <li>Funcionamento silencioso e mais resistente a solavancos.</li>
        </ul>

        <h2>O que o SSD nÃ£o muda</h2>
        <p>O SSD acelera o armazenamento, mas nÃ£o substitui outros componentes:</p>
        <ul>
          <li>Se falta memÃ³ria (RAM), o sistema ainda vai sofrer com muitos programas abertos.</li>
          <li>Um processador muito antigo continua sendo o limite em tarefas pesadas.</li>
          <li>LentidÃ£o por malware ou sistema corrompido nÃ£o some sÃ³ com o disco novo.</li>
          <li>NÃ£o Ã© realista esperar que qualquer equipamento fique como um modelo atual.</li>
        </ul>

        <h2>Compatibilidade: o que verificar</h2>
        <ul>
          <li><strong>Interface:</strong> hÃ¡ SSDs SATA (formato 2,5") e SSDs NVMe (formato M.2). Nem todo computador aceita NVMe.</li>
          <li><strong>EspaÃ§o fÃ­sico:</strong> notebooks finos podem ter sÃ³ um slot; alguns aceitam SSD e HD juntos.</li>
          <li><strong>Capacidade:</strong> escolha conforme o volume dos seus arquivos, nÃ£o sÃ³ pelo preÃ§o.</li>
        </ul>
        <p>Essa checagem depende do modelo. Quando hÃ¡ dÃºvida, confirmar o slot e a interface antes de comprar evita frustraÃ§Ã£o.</p>

        <h2>Clonar ou instalar do zero?</h2>
        <p>Ã‰ possÃ­vel clonar o sistema atual para o SSD ou fazer uma instalaÃ§Ã£o limpa. Clonar mantÃ©m tudo como estÃ¡ â€” inclusive eventuais problemas de um sistema jÃ¡ corrompido. A instalaÃ§Ã£o limpa costuma deixar o funcionamento mais estÃ¡vel, mas exige reinstalar programas. Em ambos os casos, o disco antigo pode estar desgastado, entÃ£o <strong>fazer backup antes Ã© indispensÃ¡vel</strong>.</p>

        <h2>Antes de decidir</h2>
        <p>Se o HD atual apresenta ruÃ­dos, cliques ou erros de leitura, trate isso como sinal de alerta e priorize o backup dos dados. Avaliar o estado do disco atual e o restante do hardware ajuda a decidir se o SSD sozinho resolve ou se faz mais sentido dentro de uma manutenÃ§Ã£o completa.</p>

        <h2>SATA, M.2 e NVMe: o que muda na prÃ¡tica</h2>
        <p>Nem todo SSD se conecta da mesma forma, e essa diferenÃ§a define tanto a compatibilidade quanto o ganho percebido. O SSD SATA de 2,5" usa o mesmo cabo e o mesmo encaixe de um HD de notebook, o que o torna a troca mais direta em mÃ¡quinas antigas. O formato M.2 dispensa cabos e Ã© parafusado direto na placa â€” mas exige que a placa tenha o slot correspondente. Dentro do M.2 ainda existem dois padrÃµes distintos de comunicaÃ§Ã£o: SATA e NVMe.</p>
        <p>Para uso domÃ©stico e de escritÃ³rio, a diferenÃ§a mais sentida Ã© a primeira: sair de HD mecÃ¢nico para qualquer SSD. A troca de um SSD SATA por um NVMe entrega nÃºmeros melhores em transferÃªncias grandes, mas o ganho Ã© discreto em tarefas cotidianas como abrir o sistema, o navegador e um editor de textos. Vale conferir antes:</p>
        <ul>
          <li>Se a placa possui slot M.2 e qual padrÃ£o ele aceita (SATA, NVMe ou ambos).</li>
          <li>Se hÃ¡ espaÃ§o fÃ­sico e suporte para manter o disco antigo como armazenamento secundÃ¡rio.</li>
          <li>Se a mÃ¡quina tem limitaÃ§Ãµes de firmware que impedem inicializar por NVMe.</li>
          <li>Se o objetivo Ã© desempenho ou apenas mais espaÃ§o â€” as duas metas pedem escolhas diferentes.</li>
        </ul>

        <h2>Sinais de que o disco atual jÃ¡ estÃ¡ falhando</h2>
        <p>Existe uma diferenÃ§a importante entre "quero mais desempenho" e "meu disco estÃ¡ morrendo". No segundo caso, o upgrade deixa de ser opcional e vira urgÃªncia de preservaÃ§Ã£o de dados, porque a janela para copiar arquivos com seguranÃ§a pode ser curta.</p>
        <ul>
          <li>RuÃ­dos repetitivos de clique ou zumbido vindos do disco mecÃ¢nico.</li>
          <li>Travamentos longos com o cursor parado ao abrir pastas especÃ­ficas.</li>
          <li>Arquivos que somem, abrem corrompidos ou nÃ£o copiam atÃ© o fim.</li>
          <li>ReinicializaÃ§Ãµes inesperadas e mensagens do sistema sobre erro de disco.</li>
          <li>VerificaÃ§Ãµes de integridade que ficam cada vez mais frequentes ao ligar o computador.</li>
        </ul>
        <p>Diante desses sinais, o passo mais seguro Ã© reduzir o uso do equipamento e priorizar a cÃ³pia dos dados antes de qualquer clonagem. Clonar um disco jÃ¡ com setores defeituosos pode transportar o problema para o SSD novo â€” ou interromper a cÃ³pia no meio, deixando o sistema inutilizÃ¡vel. Em casos assim, instalar o sistema do zero no SSD e recuperar os arquivos em separado costuma ser mais previsÃ­vel.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Quer avaliar se o upgrade compensa?</h3>
          <p className="text-muted-foreground mb-3">Verificamos a compatibilidade, o estado do disco atual e o restante do hardware antes de qualquer troca.</p>
          <ul className="mb-0">
            <li><Link to="/servicos/upgrade-ssd-ram" className="text-accent">Upgrade de SSD e memÃ³ria</Link></li>
            <li><Link to="/servicos/manutencao-de-notebook" className="text-accent">ManutenÃ§Ã£o de notebook</Link></li>
            <li><Link to="/servicos/manutencao-de-computador" className="text-accent">ManutenÃ§Ã£o de computador</Link></li>
            <li><Link to="/servicos/formatacao" className="text-accent">FormataÃ§Ã£o e instalaÃ§Ã£o do sistema</Link></li>
          </ul>
        </div>
        <h2>Sintoma, gargalo provÃ¡vel e teste</h2>
        <p>O mesmo sintoma de "computador lento" tem causas distintas. A tabela ajuda a decidir se o SSD resolve o caso ou se o dinheiro deveria ir para outro componente.</p>
        <div className="not-prose my-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead><tr><th className="text-left p-2 border-b">Sintoma</th><th className="text-left p-2 border-b">Gargalo provÃ¡vel</th><th className="text-left p-2 border-b">Teste antes de comprar</th></tr></thead>
            <tbody>
              <tr><td className="p-2 border-b">Demora longa para chegar Ã  Ã¡rea de trabalho</td><td className="p-2 border-b">Armazenamento</td><td className="p-2 border-b">Observar o uso do disco em 100% durante a inicializaÃ§Ã£o</td></tr>
              <tr><td className="p-2 border-b">Travamento ao abrir muitos programas</td><td className="p-2 border-b">MemÃ³ria insuficiente</td><td className="p-2 border-b">Verificar o consumo de memÃ³ria com o uso habitual aberto</td></tr>
              <tr><td className="p-2 border-b">LentidÃ£o em ediÃ§Ã£o de vÃ­deo, planilha pesada ou compilaÃ§Ã£o</td><td className="p-2 border-b">Processador</td><td className="p-2 border-b">Observar o processador constante em uso mÃ¡ximo na tarefa</td></tr>
              <tr><td className="p-2 border-b">LentidÃ£o que surgiu de repente</td><td className="p-2 border-b">Sistema corrompido ou infecÃ§Ã£o</td><td className="p-2 border-b">Checar programas iniciados automaticamente e fazer verificaÃ§Ã£o de seguranÃ§a</td></tr>
              <tr><td className="p-2 border-b">Cliques, ruÃ­dos ou erro de leitura</td><td className="p-2 border-b">Disco em falha</td><td className="p-2 border-b">Priorizar backup imediato; o upgrade vira consequÃªncia, nÃ£o causa</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Ãrvore de decisÃ£o</h2>
        <ol>
          <li>O disco atual dÃ¡ sinais de falha (ruÃ­do, travamento ao ler arquivo, erro de leitura)? FaÃ§a backup antes de qualquer coisa e nÃ£o clone um disco com defeito.</li>
          <li>O equipamento aceita NVMe? Se aceitar e houver slot livre, o SSD NVMe Ã© o caminho; se sÃ³ houver interface SATA, o SSD SATA ainda representa ganho grande sobre o HD.</li>
          <li>HÃ¡ apenas um slot ocupado pelo HD? Verifique se a mÃ¡quina permite manter os dois discos â€” muitos notebooks aceitam SSD no M.2 e HD na baia de 2,5".</li>
          <li>O sistema atual estÃ¡ estÃ¡vel? Se estiver, clonar economiza tempo. Se estiver instÃ¡vel ou infectado, instalaÃ§Ã£o limpa evita levar o problema junto.</li>
          <li>A queixa continua depois do SSD? O gargalo era outro: memÃ³ria, processador ou software.</li>
        </ol>

        <h2>Erros comuns</h2>
        <ul>
          <li>Comprar SSD M.2 sem confirmar se o slot da mÃ¡quina Ã© NVMe ou apenas SATA: o formato Ã© o mesmo, a compatibilidade nÃ£o.</li>
          <li>Clonar um sistema jÃ¡ corrompido e esperar que o disco novo resolva a instabilidade.</li>
          <li>Escolher a menor capacidade disponÃ­vel e ficar sem espaÃ§o em poucos meses.</li>
          <li>Descartar o HD antigo sem apagar os dados com seguranÃ§a.</li>
          <li>Tratar o SSD como backup: ele Ã© o novo original, nÃ£o uma cÃ³pia.</li>
        </ul>

        <h2>Limites de seguranÃ§a</h2>
        <p>Nenhum upgrade transforma um equipamento antigo em um modelo atual, e nÃ£o existe nÃºmero universal de ganho: o resultado depende do conjunto. A clonagem exige que o destino comporte os dados em uso e pode falhar quando o disco de origem jÃ¡ apresenta setores com erro â€” nesse cenÃ¡rio, tentar clonar repetidamente aumenta o desgaste e reduz a chance de recuperar arquivos. Em notebooks com disco criptografado, Ã© indispensÃ¡vel ter a chave de recuperaÃ§Ã£o antes de mover o sistema: sem ela, o acesso aos dados pode ser perdido de forma definitiva.</p>

        <h2>Termos que aparecem na compra</h2>
        <ul>
          <li><strong>SATA:</strong> interface mais antiga, usada por HDs e por SSDs de 2,5".</li>
          <li><strong>NVMe:</strong> protocolo de alto desempenho para SSDs conectados diretamente Ã  placa.</li>
          <li><strong>M.2:</strong> formato fÃ­sico do mÃ³dulo; pode ser SATA ou NVMe, e isso muda a compatibilidade.</li>
          <li><strong>Clonagem:</strong> cÃ³pia integral do disco atual para o novo, mantendo sistema e programas.</li>
          <li><strong>InstalaÃ§Ã£o limpa:</strong> sistema instalado do zero, sem herdar configuraÃ§Ãµes e falhas anteriores.</li>
        </ul>

        <p>Para avaliar o estado do disco atual e definir entre clonagem e instalaÃ§Ã£o limpa com atendimento presencial em Curitiba e SÃ£o JosÃ© dos Pinhais, veja <Link to="/servicos/upgrade-ssd-ram" className="text-accent">upgrade de SSD e memÃ³ria</Link>.</p>

        <EditorialReferences slug="quando-trocar-hd-por-ssd" />

      </>
    ),
  },
  "backup-como-proteger-seus-arquivos": {
    title: "Como evitar perder arquivos: guia de backup preventivo",
    excerpt: "Backup nÃ£o Ã© copiar arquivos para outra pasta do mesmo disco. Entenda cÃ³pias local, externa e em nuvem.",
    date: "2024-01-02",
    readTime: "9 min",
    category: "SeguranÃ§a",
    content: (
      <>
        <p className="lead">Fotos, documentos e trabalho podem sumir em segundos por falha de disco, vÃ­rus ou descuido. Backup preventivo Ã© o que separa um susto de um prejuÃ­zo. E, ao contrÃ¡rio do que muita gente pensa, mover arquivos para outra pasta do mesmo disco <strong>nÃ£o Ã© backup</strong> â€” se o disco falhar, tudo vai junto.</p>

        <h2>Resposta rÃ¡pida</h2>
        <p>Backup Ã© ter cÃ³pias independentes do original, em lugares que nÃ£o falham juntos. A referÃªncia prÃ¡tica mais usada mantÃ©m trÃªs cÃ³pias do que importa, em dois tipos diferentes de mÃ­dia, com uma delas fora do local do computador. SincronizaÃ§Ã£o em nuvem sozinha nÃ£o cumpre esse papel: exclusÃ£o e criptografia se propagam para as cÃ³pias sincronizadas. E backup sÃ³ existe de verdade depois que uma restauraÃ§Ã£o foi testada â€” abrir um arquivo restaurado Ã© o Ãºnico teste que vale.</p>

        <h2>O que conta como backup de verdade</h2>
        <p>Backup Ã© ter cÃ³pias em lugares independentes do original. Quanto mais separados os riscos, melhor:</p>
        <ul>
          <li><strong>CÃ³pia local:</strong> em outro disco do mesmo computador â€” protege de erro humano, mas nÃ£o de furto ou incÃªndio.</li>
          <li><strong>CÃ³pia externa:</strong> em HD ou SSD externo guardado desconectado, fora do computador.</li>
          <li><strong>CÃ³pia em nuvem:</strong> acessÃ­vel de qualquer lugar e fora de casa fisicamente.</li>
        </ul>
        <p>Manter cÃ³pias em mÃ­dias diferentes, com pelo menos uma fora do local, reduz bastante o risco de perder tudo de uma vez. Trate isso como orientaÃ§Ã£o, nÃ£o como regra rÃ­gida â€” o essencial Ã© ter mais de uma cÃ³pia independente.</p>

        <h2>SincronizaÃ§Ã£o nÃ£o Ã© sempre backup</h2>
        <p>Pastas sincronizadas com a nuvem sÃ£o Ãºteis, mas se um arquivo Ã© apagado ou criptografado, a alteraÃ§Ã£o pode se espalhar para todas as cÃ³pias sincronizadas. Um backup real guarda versÃµes que nÃ£o sÃ£o sobrescritas automaticamente.</p>

        <h2>Com que frequÃªncia</h2>
        <p>Depende de quanto os dados mudam e do quanto vocÃª nÃ£o pode perdÃª-los. Arquivos de trabalho que mudam todo dia pedem cÃ³pias frequentes; fotos que raramente mudam podem ser copiadas de tempos em tempos. O que importa Ã© a rotina existir.</p>

        <h2>Teste de restauraÃ§Ã£o</h2>
        <p>Backup que nunca foi testado pode nÃ£o servir na hora da emergÃªncia. De tempos em tempos, abra um arquivo restaurado da cÃ³pia para confirmar que ela realmente funciona.</p>

        <h2>Cuidados de seguranÃ§a</h2>
        <ul>
          <li>Um disco externo permanentemente conectado tambÃ©m pode ser atingido por ransomware â€” mantenha ao menos uma cÃ³pia desconectada.</li>
          <li>Para dados sensÃ­veis, considere criptografia e cuidado com onde as cÃ³pias ficam guardadas.</li>
          <li>Guarde senhas e acessos em um gerenciador confiÃ¡vel, nÃ£o em arquivos soltos.</li>
          <li>Dados empresariais costumam ter exigÃªncias prÃ³prias de retenÃ§Ã£o e privacidade.</li>
        </ul>

        <h2>Backup preventivo x recuperaÃ§Ã£o de dados</h2>
        <p>SÃ£o coisas diferentes. Backup Ã© o que vocÃª faz <strong>antes</strong> de qualquer problema. RecuperaÃ§Ã£o Ã© tentar resgatar dados <strong>depois</strong> de uma falha â€” um processo mais incerto, que nem sempre traz tudo de volta. Por isso o backup preventivo Ã© sempre o caminho mais seguro.</p>

        <h2>A regra 3-2-1 aplicada Ã  rotina de casa</h2>
        <p>A referÃªncia mais usada em proteÃ§Ã£o de dados resume trÃªs exigÃªncias simples: manter trÃªs cÃ³pias do que importa, em dois tipos diferentes de mÃ­dia, com uma delas fora do local onde estÃ¡ o computador. Em casa, isso nÃ£o exige estrutura corporativa. Uma configuraÃ§Ã£o comum Ã© o arquivo original no computador, uma cÃ³pia em disco externo guardado em outro cÃ´modo e uma terceira em nuvem confiÃ¡vel.</p>
        <p>O ponto que costuma falhar Ã© o "fora do local". Um disco externo permanentemente conectado ao mesmo computador estÃ¡ exposto aos mesmos riscos do original: sobretensÃ£o elÃ©trica, furto, incÃªndio e criptografia por ransomware. Desconectar o disco apÃ³s a cÃ³pia Ã© uma medida barata e eficaz.</p>
        <ul>
          <li>Defina o que Ã© insubstituÃ­vel: documentos, fotos, trabalhos, arquivos de projetos.</li>
          <li>Separe o que pode ser rebaixado a "recuperÃ¡vel": instaladores, filmes, arquivos temporÃ¡rios.</li>
          <li>Registre onde cada cÃ³pia estÃ¡ â€” um backup que ninguÃ©m encontra nÃ£o Ã© backup.</li>
          <li>Verifique o espaÃ§o livre antes de cada rodada para nÃ£o gerar cÃ³pias incompletas.</li>
        </ul>

        <h2>Backup em pequenos negÃ³cios: onde a rotina costuma quebrar</h2>
        <p>Em escritÃ³rios pequenos, o backup normalmente existe no papel e falha em trÃªs pontos previsÃ­veis: depende de uma pessoa lembrar, cobre sÃ³ uma mÃ¡quina e nunca foi testado. Quando o sistema de gestÃ£o, as notas fiscais e a base de clientes estÃ£o em um Ãºnico computador, a interrupÃ§Ã£o deixa de ser inconveniente e passa a impedir o faturamento.</p>
        <p>Uma rotina mÃ­nima e realista costuma incluir cÃ³pia automÃ¡tica diÃ¡ria dos dados do sistema de gestÃ£o, cÃ³pia semanal completa em mÃ­dia que fica desconectada e um responsÃ¡vel nomeado por conferir o resultado. TambÃ©m Ã© importante considerar quem tem acesso: credenciais compartilhadas entre toda a equipe tornam impossÃ­vel saber o que foi alterado ou apagado, e ampliam o estrago de uma infecÃ§Ã£o.</p>
        <p>Se o negÃ³cio depende de dados que nÃ£o podem ser reconstruÃ­dos manualmente, o teste de restauraÃ§Ã£o deveria acontecer em intervalo definido â€” restaurar um arquivo aleatÃ³rio e confirmar que ele abre Ã© o que transforma uma pasta de cÃ³pias em um plano de continuidade.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Precisa organizar um backup confiÃ¡vel?</h3>
          <p className="text-muted-foreground mb-3">Ajudamos a montar uma rotina adequada ao seu uso e a avaliar riscos de perda de dados.</p>
          <ul className="mb-0">
            <li><Link to="/servicos/recuperacao-de-dados" className="text-accent">RecuperaÃ§Ã£o de dados</Link></li>
            <li><Link to="/servicos/remocao-de-virus" className="text-accent">RemoÃ§Ã£o de vÃ­rus e malware</Link></li>
            <li><Link to="/diagnostico-tecnico" className="text-accent">Como funciona o diagnÃ³stico tÃ©cnico</Link></li>
          </ul>
        </div>

        <EditorialReferences slug="backup-como-proteger-seus-arquivos" />
        <h2>Risco, o que ele atinge e qual cÃ³pia protege</h2>
        <p>Escolher onde guardar a cÃ³pia depende do risco que se quer cobrir. A tabela mostra por que uma Ãºnica cÃ³pia, por melhor que seja, deixa cenÃ¡rios descobertos.</p>
        <div className="not-prose my-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead><tr><th className="text-left p-2 border-b">Risco</th><th className="text-left p-2 border-b">O que ele atinge</th><th className="text-left p-2 border-b">CÃ³pia que protege</th></tr></thead>
            <tbody>
              <tr><td className="p-2 border-b">Falha do disco</td><td className="p-2 border-b">Somente o disco original</td><td className="p-2 border-b">Qualquer cÃ³pia fora daquele disco</td></tr>
              <tr><td className="p-2 border-b">ExclusÃ£o ou sobrescrita acidental</td><td className="p-2 border-b">Original e cÃ³pias sincronizadas</td><td className="p-2 border-b">CÃ³pia com versÃµes anteriores retidas</td></tr>
              <tr><td className="p-2 border-b">Ransomware</td><td className="p-2 border-b">Tudo que estiver acessÃ­vel no momento do ataque</td><td className="p-2 border-b">CÃ³pia desconectada ou com retenÃ§Ã£o imutÃ¡vel</td></tr>
              <tr><td className="p-2 border-b">Furto, incÃªndio ou alagamento</td><td className="p-2 border-b">Todos os equipamentos do mesmo local</td><td className="p-2 border-b">CÃ³pia fora do local (nuvem ou mÃ­dia guardada em outro endereÃ§o)</td></tr>
              <tr><td className="p-2 border-b">Surto elÃ©trico</td><td className="p-2 border-b">Equipamentos ligados na mesma instalaÃ§Ã£o</td><td className="p-2 border-b">MÃ­dia desconectada da tomada e da mÃ¡quina</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Ãrvore de decisÃ£o</h2>
        <ol>
          <li>Existe alguma cÃ³pia fora do disco original? Se nÃ£o, comece por aÃ­ â€” Ã© a lacuna que causa a maior parte das perdas domÃ©sticas.</li>
          <li>Existe cÃ³pia que nÃ£o Ã© sobrescrita automaticamente quando o original muda? Se nÃ£o existir, o cenÃ¡rio de exclusÃ£o e de ransomware continua descoberto.</li>
          <li>Existe cÃ³pia fora do local fÃ­sico? Se nÃ£o, furto e incÃªndio levam tudo de uma vez.</li>
          <li>A Ãºltima restauraÃ§Ã£o foi testada nos Ãºltimos meses? Se nunca foi, trate a cÃ³pia como nÃ£o confirmada.</li>
          <li>Se um dos itens acima falhar durante um incidente em curso â€” arquivos jÃ¡ inacessÃ­veis ou disco com ruÃ­do â€” pare de usar o equipamento: cada nova gravaÃ§Ã£o reduz a chance de recuperaÃ§Ã£o.</li>
        </ol>

        <h2>Erros comuns</h2>
        <ul>
          <li>Copiar arquivos para outra pasta ou outra partiÃ§Ã£o do mesmo disco e chamar isso de backup.</li>
          <li>Manter o disco externo permanentemente conectado, exposto aos mesmos riscos do original.</li>
          <li>Confiar na sincronizaÃ§Ã£o de nuvem sem verificar se o serviÃ§o mantÃ©m versÃµes anteriores e por quanto tempo.</li>
          <li>Fazer backup do que Ã© facilmente recuperÃ¡vel (instaladores, filmes) e esquecer documentos e fotos insubstituÃ­veis.</li>
          <li>NÃ£o registrar onde as cÃ³pias estÃ£o nem como acessÃ¡-las â€” backup que ninguÃ©m encontra nÃ£o Ã© backup.</li>
        </ul>

        <h2>Limites de seguranÃ§a</h2>
        <p>Backup previne perda; nÃ£o recupera o que jÃ¡ sumiu. Depois de uma falha, a tentativa de resgate Ã© um processo incerto, mais caro e sem garantia de trazer tudo de volta. TambÃ©m nÃ£o existe cÃ³pia que dispense verificaÃ§Ã£o: mÃ­dia externa envelhece, serviÃ§o de nuvem muda de polÃ­tica de retenÃ§Ã£o e conta pode ser perdida por falha no acesso. Para dados sensÃ­veis, a cÃ³pia herda as mesmas exigÃªncias de privacidade do original â€” guardar sem criptografia move o risco de lugar em vez de eliminÃ¡-lo.</p>

        <h2>Termos que ajudam a decidir</h2>
        <ul>
          <li><strong>RetenÃ§Ã£o:</strong> por quanto tempo versÃµes antigas continuam disponÃ­veis.</li>
          <li><strong>Versionamento:</strong> capacidade de voltar a um estado anterior do arquivo.</li>
          <li><strong>CÃ³pia fora do local:</strong> cÃ³pia mantida em endereÃ§o diferente do equipamento original.</li>
          <li><strong>RestauraÃ§Ã£o testada:</strong> arquivo efetivamente recuperado e aberto a partir da cÃ³pia.</li>
          <li><strong>Imutabilidade:</strong> propriedade que impede alterar ou apagar a cÃ³pia durante um perÃ­odo definido.</li>
        </ul>

        <p>Se os arquivos jÃ¡ estÃ£o inacessÃ­veis, o caminho deixa de ser preventivo: veja <Link to="/servicos/recuperacao-de-dados" className="text-accent">recuperaÃ§Ã£o de dados</Link>. Para montar a rotina antes do problema, com atendimento em Curitiba e regiÃ£o metropolitana, a avaliaÃ§Ã£o do equipamento estÃ¡ em <Link to="/servicos/manutencao-de-computador" className="text-accent">manutenÃ§Ã£o de computador</Link>.</p>

      </>

    ),
  },
  "notebook-superaquecendo-o-que-fazer": {
    title: "Notebook superaquecendo: sinais, prevenÃ§Ã£o e o que fazer",
    excerpt: "Aquecimento normal ou comportamento de risco? Veja o que observar no superaquecimento, o que fazer com seguranÃ§a e os sinais que pedem desligar o equipamento.",
    date: "2023-12-28",
    readTime: "9 min",
    category: "ManutenÃ§Ã£o",
    content: (
      <>
        <p className="lead">Todo computador esquenta â€” o problema Ã© quando o calor deixa de ser normal e vira queda de desempenho, desligamento repentino ou risco para os componentes. Este guia ajuda a separar aquecimento esperado de superaquecimento real, mostra o que dÃ¡ para observar em casa com seguranÃ§a e indica o momento em que insistir no uso sai mais caro do que parar.</p>

        <h2>Resposta curta</h2>
        <p>Aquecimento com ventoinha acelerada durante tarefas pesadas Ã© esperado. Preocupe-se quando o calor aparece em tarefas leves, quando o desempenho cai poucos minutos depois de ligar, quando o equipamento desliga sozinho ou quando surge cheiro, ruÃ­do estranho, bateria deformada ou calor que impede o toque. Nesses casos, o caminho Ã© parar o uso e pedir avaliaÃ§Ã£o â€” nÃ£o Ã© ajuste de configuraÃ§Ã£o.</p>

        <h2>Como o calor Ã© dissipado (e onde o processo falha)</h2>
        <p>O calor gerado pelo processador e pela placa de vÃ­deo passa por uma interface tÃ©rmica, segue por tubos de cobre atÃ© um radiador e Ã© expulso pela ventoinha atravÃ©s das grades de saÃ­da. Basta um elo dessa cadeia perder eficiÃªncia para a temperatura subir: interface ressecada transfere pior, radiador entupido por poeira e fiapos reduz o fluxo, ventoinha com rolamento gasto gira menos do que deveria e grade obstruÃ­da faz o ar quente circular dentro do gabinete.</p>
        <p>Quando o sensor interno detecta temperatura alta demais, o prÃ³prio sistema reduz a frequÃªncia de trabalho para se proteger. Ã‰ por isso que muita gente descreve o sintoma como â€œficou lentoâ€, sem associar ao calor: a mÃ¡quina nÃ£o travou, ela se limitou. Se a temperatura continua subindo, o desligamento abrupto Ã© o Ãºltimo recurso de proteÃ§Ã£o.</p>

        <h2>Aquecimento normal x superaquecimento</h2>
        <ul>
          <li>Normal: ventoinha acelera em jogos, ediÃ§Ã£o de vÃ­deo, renderizaÃ§Ã£o, videochamada longa ou atualizaÃ§Ã£o do sistema, e volta ao ritmo comum depois.</li>
          <li>Normal: base morna no notebook, com o ar saindo quente pela lateral ou pelo fundo.</li>
          <li>Anormal: queda de desempenho depois de alguns minutos ligado, mesmo com poucos programas abertos.</li>
          <li>Anormal: desligamento repentino durante o uso, sem tela de erro.</li>
          <li>Anormal: base muito quente em tarefas leves, como navegar ou digitar.</li>
          <li>Anormal: ventoinha sempre no mÃ¡ximo â€” ou silÃªncio total, quando antes havia ruÃ­do.</li>
          <li>Anormal: travamento de imagem, artefatos na tela ou reinÃ­cio em ciclos.</li>
        </ul>

        <h2>Causas mais comuns no dia a dia</h2>
        <p>Poeira acumulada no radiador Ã© a campeÃ£, principalmente em casas com animais, obra por perto ou uso do notebook direto no chÃ£o. Depois vem o bloqueio de fluxo: usar o equipamento sobre cama, sofÃ¡, almofada ou colo fecha justamente as entradas de ar do fundo. Interface tÃ©rmica ressecada aparece em mÃ¡quinas com anos de uso â€” nÃ£o existe um intervalo universal para a troca, ela depende do modelo, do ambiente e da carga.</p>
        <p>HÃ¡ ainda causas de software: um processo travado consumindo processador o tempo todo, atualizaÃ§Ã£o rodando em segundo plano, extensÃ£o de navegador problemÃ¡tica ou infecÃ§Ã£o ativa mantendo o equipamento em carga mÃ¡xima sem que vocÃª perceba. Nesses casos o calor Ã© consequÃªncia, e limpar o hardware resolve pouco enquanto a origem continuar rodando.</p>
        <p>Ambiente tambÃ©m pesa: verÃ£o curitibano, cÃ´modo abafado, mÃ³vel fechado sem circulaÃ§Ã£o ou luz do sol batendo direto no equipamento elevam a temperatura de partida e reduzem a margem de trabalho.</p>

        <h2>O que vocÃª pode verificar com seguranÃ§a</h2>
        <ul>
          <li>Use o equipamento sobre superfÃ­cie dura e plana, com as saÃ­das de ar livres.</li>
          <li>Um suporte que eleve a traseira do notebook melhora a entrada de ar.</li>
          <li>Observe as grades: se estiverem visivelmente cobertas de poeira, Ã© sinal de manutenÃ§Ã£o pendente.</li>
          <li>Repare quando o calor aparece â€” em tarefas pesadas ou jÃ¡ no uso comum â€” e anote o comportamento.</li>
          <li>Feche programas pesados que ficaram abertos e verifique se algum processo mantÃ©m o uso alto sem motivo.</li>
          <li>Registre mensagens de erro e o horÃ¡rio dos desligamentos; isso encurta o diagnÃ³stico depois.</li>
        </ul>

        <h2>O que nÃ£o fazer</h2>
        <p>NÃ£o abra o equipamento ligado ou conectado Ã  tomada. NÃ£o use secador, ar comprimido em jato forte direto na ventoinha travada, gelo, freezer ou qualquer fonte de calor ou frio externa. NÃ£o fure, dobre nem pressione bateria estufada. NÃ£o retire a proteÃ§Ã£o tÃ©rmica de fÃ¡brica achando que â€œvai ventilar melhorâ€ e nÃ£o deixe o equipamento rodando em carga mÃ¡xima esperando que o problema se resolva sozinho.</p>
        <p>Limpeza interna e troca de interface tÃ©rmica exigem desmontagem, torque correto e recolocaÃ§Ã£o de conectores frÃ¡geis. Feito sem prÃ¡tica, o conserto vira dano â€” flat de tela partido, parafuso perdido e trilha rompida sÃ£o acidentes comuns nesse tipo de tentativa.</p>

        <div className="bg-destructive/10 rounded-xl p-6 my-8 border border-destructive/20">
          <h3 className="text-destructive font-bold mb-2">Desligue imediatamente se notar</h3>
          <ul className="text-muted-foreground mb-0">
            <li>Cheiro de queimado, fumaÃ§a ou estalos.</li>
            <li>Bateria estufada, deformada ou empurrando o teclado / a base.</li>
            <li>Aquecimento extremo que impede o toque.</li>
          </ul>
          <p className="text-muted-foreground mt-3 mb-0">Nesses casos: desconecte da tomada, nÃ£o tente resfriar por fora e nÃ£o abra o equipamento. Procure avaliaÃ§Ã£o tÃ©cnica antes de voltar a usar.</p>
        </div>

        <h2>Limites deste guia</h2>
        <p>NÃ£o existe temperatura Ãºnica de risco vÃ¡lida para todos os modelos, e leitura de sensor isolada nÃ£o fecha diagnÃ³stico: dois equipamentos com o mesmo nÃºmero na tela podem ter estados internos completamente diferentes. SÃ³ a avaliaÃ§Ã£o presencial mostra o estado do radiador, da ventoinha e da interface tÃ©rmica, e sÃ³ ela indica se o problema Ã© tÃ©rmico, de alimentaÃ§Ã£o ou de placa. Este conteÃºdo orienta a observaÃ§Ã£o â€” ele nÃ£o substitui o diagnÃ³stico do equipamento.</p>

        <h2>Quando procurar atendimento tÃ©cnico</h2>
        <p>Se o cuidado com ventilaÃ§Ã£o e o encerramento de programas pesados nÃ£o mudaram nada, se hÃ¡ desligamento por calor ou se a queda de desempenho jÃ¡ atrapalha o trabalho, Ã© hora de avaliaÃ§Ã£o. Adiar costuma sair mais caro: calor constante castiga bateria, armazenamento e solda, e transforma uma limpeza simples em troca de peÃ§a. Se o equipamento guarda arquivos sem cÃ³pia, mantenha o backup em dia antes de qualquer intervenÃ§Ã£o.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Equipamento esquentando demais?</h3>
          <p className="text-muted-foreground mb-3">Avaliamos ventilaÃ§Ã£o, comportamento tÃ©rmico e estado interno antes de recomendar qualquer serviÃ§o.</p>
          <ul className="mb-0">
            <li><Link to="/servicos/manutencao-de-notebook" className="text-accent">ManutenÃ§Ã£o de notebook: limpeza interna e avaliaÃ§Ã£o tÃ©rmica</Link></li>
            <li><Link to="/servicos/manutencao-de-computador" className="text-accent">ManutenÃ§Ã£o de computador de mesa</Link></li>
            <li><Link to="/problemas/computador-lento" className="text-accent">Quando a lentidÃ£o vem do calor: investigar o sintoma</Link></li>
            <li><Link to="/atendimento-domicilio" className="text-accent">Atendimento tÃ©cnico no endereÃ§o</Link></li>
            <li><Link to="/como-funciona" className="text-accent">Como funciona o atendimento, do diagnÃ³stico Ã  entrega</Link></li>
          </ul>
        </div>
      </>
    ),
  },

  "wifi-lento-como-melhorar": {
    title: "Wi-Fi Lento em Casa? Veja Como Melhorar o Sinal",
    excerpt: "Dicas prÃ¡ticas para melhorar a cobertura e velocidade da sua internet sem fio. Do posicionamento do roteador Ã s configuraÃ§Ãµes ideais.",
    date: "2023-12-25",
    readTime: "5 min",
    category: "Redes",
    content: (
      <>
        <p className="lead">A internet funciona bem perto do roteador, mas some em outros cÃ´modos? Veja como resolver problemas de cobertura Wi-Fi.</p>
        
        <h2>1. Posicione o Roteador Corretamente</h2>
        <p>O lugar onde o roteador estÃ¡ faz toda diferenÃ§a:</p>
        <ul>
          <li>Coloque no centro da casa, nÃ£o em um canto</li>
          <li>Deixe em local alto (prateleira ou parede)</li>
          <li>Evite colocar dentro de armÃ¡rios ou atrÃ¡s de mÃ³veis</li>
          <li>Mantenha longe de micro-ondas, telefones sem fio e outros equipamentos que causam interferÃªncia</li>
        </ul>
        
        <h2>2. Escolha o Canal Certo</h2>
        <p>Se muitos vizinhos usam o mesmo canal Wi-Fi, hÃ¡ congestionamento. Acesse as configuraÃ§Ãµes do roteador e troque para um canal menos usado. Aplicativos como "WiFi Analyzer" ajudam a identificar o melhor canal.</p>
        
        <h2>3. Use a FrequÃªncia 5GHz</h2>
        <p>Roteadores modernos oferecem duas frequÃªncias:</p>
        <ul>
          <li><strong>2.4GHz:</strong> AlcanÃ§a mais longe, mas Ã© mais lenta e sofre mais interferÃªncia</li>
          <li><strong>5GHz:</strong> Mais rÃ¡pida, menos interferÃªncia, mas alcance menor</li>
        </ul>
        <p>Use 5GHz onde o sinal chega bem e 2.4GHz nos cÃ´modos mais distantes.</p>
        
        <h2>4. Considere um Repetidor ou Mesh</h2>
        <p>Se a casa Ã© grande ou tem muitas paredes, um repetidor Wi-Fi ou sistema mesh pode ser necessÃ¡rio para cobrir todos os ambientes.</p>
        
        <h2>5. Atualize o Roteador</h2>
        <p>Roteadores muito antigos podem nÃ£o suportar velocidades altas ou ter tecnologia ultrapassada. Se seu roteador tem mais de 4-5 anos, considere trocar por um modelo mais moderno.</p>
        
        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Precisa de ajuda com a rede?</h3>
          <p className="text-muted-foreground mb-0">Um tÃ©cnico pode analisar a cobertura da sua casa, configurar o roteador corretamente e instalar equipamentos adicionais se necessÃ¡rio.</p>
        </div>
      </>
    ),
  },

  "erros-comuns-upgrade-computador": {
    title: "Upgrade de PC ou notebook: checklist de compatibilidade antes de comprar peÃ§as",
    excerpt:
      "Evite RAM, SSD e fonte incompatÃ­veis. Um checklist tÃ©cnico para confirmar interface, geraÃ§Ã£o, capacidade, firmware, energia e plano de backup antes do upgrade.",
    date: "2026-09-25",
    readTime: "11 min",
    category: "Hardware e ManutenÃ§Ã£o",
    content: (
      <>
        <p className="lead">O erro mais caro em um upgrade geralmente acontece antes de abrir o gabinete: comprar pela aparÃªncia ou pelo nome comercial sem verificar o modelo exato do computador/placa-mÃ£e e as interfaces suportadas. M.2 Ã© formato fÃ­sico e pode usar protocolos diferentes; mÃ³dulos de memÃ³ria da mesma famÃ­lia podem ter limitaÃ§Ãµes de densidade, capacidade e BIOS. O procedimento seguro comeÃ§a pelo manual e termina com um plano de retorno.</p>

        <h2>Resposta curta</h2>
        <p>Antes de comprar, anote modelo exato do equipamento/placa-mÃ£e, CPU, memÃ³ria instalada, slots livres, tipo de armazenamento, fonte e versÃ£o de BIOS. Consulte o manual do fabricante e, quando possÃ­vel, uma lista/configurador de compatibilidade. FaÃ§a backup antes de mexer em armazenamento e confirme a chave BitLocker quando houver criptografia. NÃ£o force conector que nÃ£o encaixa.</p>

        <h2>1. RAM: geraÃ§Ã£o Ã© sÃ³ o primeiro filtro</h2>
        <p>DDR4 e DDR5 usam caracterÃ­sticas elÃ©tricas e encaixes diferentes, mas compatibilidade nÃ£o termina no nome da geraÃ§Ã£o. Fabricantes de memÃ³ria documentam que densidade dos chips, topologia de bancos, combinaÃ§Ã£o de mÃ³dulos e versÃ£o de BIOS tambÃ©m podem afetar POST e estabilidade. A Kingston, por exemplo, orienta conferir a compatibilidade do sistema e manter BIOS atualizada quando necessÃ¡rio.</p>
        <p>Cheque: DIMM ou SODIMM, geraÃ§Ã£o, capacidade mÃ¡xima por slot e total, nÃºmero de slots, ECC ou nÃ£o-ECC quando aplicÃ¡vel, velocidade suportada e regras do fabricante para combinaÃ§Ã£o de mÃ³dulos.</p>

        <h2>2. M.2 nÃ£o significa automaticamente NVMe</h2>
        <p>M.2 Ã© um formato. Um SSD M.2 pode usar SATA ou PCIe/NVMe conforme o dispositivo e o slot. A documentaÃ§Ã£o da Kingston e a especificaÃ§Ã£o NVMe deixam claro que aparÃªncia fÃ­sica nÃ£o prova protocolo. Em alguns sistemas, o slot compartilha lanes/portas e pode desativar outro conector quando ocupado.</p>
        <p>Antes da compra, confirme no manual: chave/formato fÃ­sico, comprimentos aceitos (como 2280), protocolo suportado, geraÃ§Ã£o/largura PCIe e eventuais compartilhamentos de portas.</p>

        <h2>3. SATA de 2,5" ainda exige energia e espaÃ§o</h2>
        <p>Em desktop, um SSD SATA precisa de porta SATA de dados e alimentaÃ§Ã£o. Em notebook, pode existir baia fÃ­sica sem cabo ou adaptador instalado. â€œTem espaÃ§oâ€ nÃ£o significa que todos os conectores necessÃ¡rios estÃ£o presentes. Verifique kit/cabo/caddy especÃ­fico do modelo antes de comprar.</p>

        <h2>4. GPU: slot nÃ£o Ã© o Ãºnico requisito</h2>
        <p>Uma placa de vÃ­deo pode encaixar em PCIe e ainda assim nÃ£o ser uma boa combinaÃ§Ã£o. Confira dimensÃµes do gabinete, potÃªncia e conectores da fonte, ventilaÃ§Ã£o, compatibilidade de firmware e se a CPU/uso justificam o investimento. NÃ£o use apenas uma calculadora genÃ©rica de watts; siga a recomendaÃ§Ã£o do fabricante da GPU e da fonte para o modelo real.</p>

        <h2>5. Fonte: potÃªncia nominal nÃ£o substitui compatibilidade</h2>
        <p>AlÃ©m da potÃªncia, confirme conectores, padrÃ£o/formato, capacidade disponÃ­vel nas saÃ­das necessÃ¡rias e qualidade/proteÃ§Ãµes do modelo. Adaptadores improvisados em alimentaÃ§Ã£o de GPU podem transformar um upgrade simples em risco tÃ©rmico e elÃ©trico. Se a fonte nÃ£o possui o conector exigido pelo hardware, investigue o motivo antes de adaptar.</p>

        <h2>6. BIOS/UEFI: atualize sÃ³ quando houver motivo</h2>
        <p>Uma BIOS mais nova pode adicionar compatibilidade de CPU, memÃ³ria ou armazenamento, mas atualizaÃ§Ã£o de firmware tambÃ©m tem risco. Leia as notas da versÃ£o, confirme revisÃ£o exata da placa e siga o mÃ©todo do fabricante. NÃ£o atualize â€œporque Ã© mais novoâ€ no meio de uma mÃ¡quina instÃ¡vel ou sem alimentaÃ§Ã£o confiÃ¡vel.</p>

        <h2>7. Clonar ou instalar do zero?</h2>
        <p>Trocar HD por SSD nÃ£o exige automaticamente instalaÃ§Ã£o limpa. Clonagem pode preservar sistema e aplicativos quando origem estÃ¡ saudÃ¡vel, espaÃ§o cabe no destino e a ferramenta suporta o layout. InstalaÃ§Ã£o limpa faz sentido quando hÃ¡ corrupÃ§Ã£o, mudanÃ§a de ediÃ§Ã£o/arquitetura ou quando vocÃª quer recomeÃ§ar conscientemente. A decisÃ£o deve considerar backup e licenÃ§a, nÃ£o uma regra absoluta.</p>

        <h2>8. Windows 11 tambÃ©m entra na compatibilidade</h2>
        <p>Se o objetivo do upgrade Ã© migrar para Windows 11, verifique requisitos oficiais antes de gastar: CPU suportada, 4 GB de RAM, armazenamento de 64 GB ou mais, UEFI/Secure Boot e TPM 2.0 fazem parte dos requisitos mÃ­nimos. Colocar mais RAM ou SSD nÃ£o resolve sozinho uma plataforma fora dos requisitos de firmware/CPU.</p>

        <h2>Checklist antes da compra</h2>
        <ul>
          <li>Modelo exato do PC/notebook/placa-mÃ£e registrado.</li>
          <li>Manual e especificaÃ§Ãµes oficiais consultados.</li>
          <li>RAM: formato, geraÃ§Ã£o, capacidade, densidade/combinaÃ§Ã£o e slots conferidos.</li>
          <li>SSD: protocolo, formato, comprimento e compartilhamento de portas conferidos.</li>
          <li>GPU: espaÃ§o fÃ­sico, fonte, conectores e ventilaÃ§Ã£o conferidos.</li>
          <li>Backup feito e testado; chave BitLocker salva se aplicÃ¡vel.</li>
          <li>Plano de teste e retorno definido antes de desmontar.</li>
        </ul>

        <h2>Depois do upgrade: valide antes de fechar tudo</h2>
        <p>Entre na BIOS/UEFI e confirme detecÃ§Ã£o, depois inicialize o sistema e verifique capacidade, temperaturas e estabilidade. Em RAM, teste carga e, se houver comportamento estranho, use diagnÃ³stico de memÃ³ria. Em armazenamento, confirme SMART/estado, partiÃ§Ãµes e boot. SÃ³ descarte ou apague o disco antigo depois de conferir os arquivos no novo ambiente.</p>

        <h2>Quando parar</h2>
        <p>NÃ£o force peÃ§a, conector ou tampa. Pare se o equipamento nÃ£o liga apÃ³s a troca, apresenta cheiro de aquecimento, exige atualizaÃ§Ã£o de BIOS que vocÃª nÃ£o consegue validar ou possui dados sem backup. Em notebook soldado/ultrafino, confirme primeiro se memÃ³ria e armazenamento sÃ£o realmente substituÃ­veis.</p>

        <p>Para upgrades de armazenamento e RAM, veja <Link to="/servicos/upgrade-ssd-ram" className="text-accent">upgrade de SSD e memÃ³ria</Link> e, se a decisÃ£o Ã© econÃ´mica, <Link to="/quando-nao-compensa" className="text-accent">quando nÃ£o compensa reparar ou investir</Link>.</p>
        <EditorialReferences slug="erros-comuns-upgrade-computador" />
      </>
    ),
  },

  "quando-trocar-computador-ou-reparar": {
    title: "Quando Trocar o Computador e Quando Vale a Pena Reparar (Guia TÃ©cnico)",
    excerpt: "PC antigo, lento ou com defeito? Descubra os critÃ©rios tÃ©cnicos que definem se vale investir no reparo ou se Ã© hora de partir para um equipamento novo.",
    date: "2026-04-06",
    readTime: "11 min",
    category: "ManutenÃ§Ã£o",
    content: (
      <>
        <p className="lead">Essa Ã© a dÃºvida mais comum dos nossos clientes: <strong>"Vale a pena consertar ou Ã© melhor comprar outro?"</strong>. A resposta depende de critÃ©rios tÃ©cnicos e financeiros que vamos detalhar neste guia.</p>

        <h2>Quando Vale a Pena Reparar</h2>
        <ul>
          <li><strong>Processador de atÃ© 5 anos:</strong> Intel Core i3/i5/i7 de 8Âª geraÃ§Ã£o pra cima ainda sÃ£o muito Ãºteis</li>
          <li><strong>Custo do reparo atÃ© 40% do valor de um novo:</strong> Se o conserto fica abaixo desse limite, compensa</li>
          <li><strong>Problema Ã© especÃ­fico:</strong> Tela, teclado, SSD, RAM â€” peÃ§as que se trocam facilmente</li>
          <li><strong>O equipamento atende suas necessidades:</strong> Se faz o que vocÃª precisa, nÃ£o hÃ¡ motivo para trocar</li>
        </ul>

        <h2>Quando NÃƒO Compensa Reparar</h2>
        <ul>
          <li><strong>Processador muito antigo:</strong> Celeron, Pentium ou Core de 2Âª/3Âª geraÃ§Ã£o</li>
          <li><strong>Placa-mÃ£e com defeito em equipamento antigo:</strong> Placa-mÃ£e nova pode nÃ£o existir para modelos descontinuados</li>
          <li><strong>Custo do reparo acima de 50-60% do novo:</strong> O investimento nÃ£o se justifica</li>
          <li><strong>MÃºltiplos problemas simultÃ¢neos:</strong> Placa-mÃ£e + tela + bateria = melhor trocar</li>
        </ul>

        <h2>AnÃ¡lise Custo-BenefÃ­cio na PrÃ¡tica</h2>
        <p>Notebook i5 de 2019 com HD lento e 4 GB de RAM: trocar por SSD (R$ 200) + 8 GB de RAM (R$ 150) = R$ 350 + mÃ£o de obra. Resultado: notebook rodando como novo por menos de R$ 500. <strong>Compensa muito.</strong></p>
        <p>Notebook Celeron de 2015 com tela quebrada: tela nova R$ 400 + mÃ£o de obra R$ 150 = R$ 550. E o desempenho continuarÃ¡ ruim. <strong>NÃ£o compensa.</strong></p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">DÃºvida Se Vale Reparar?</h3>
          <p className="text-muted-foreground mb-0">Nosso tÃ©cnico faz o diagnÃ³stico e dÃ¡ a opiniÃ£o honesta: se nÃ£o compensa, a gente avisa. DiagnÃ³stico a partir de R$ 99,99.</p>
        </div>
      </>
    ),
  },

  "manutencao-preventiva-computador-guia": {
    title: "ManutenÃ§Ã£o Preventiva do Computador: O Guia Que Evita 80% dos Problemas",
    excerpt: "Rotinas simples que prolongam a vida Ãºtil do seu PC e evitam chamados tÃ©cnicos.",
    date: "2026-04-06",
    readTime: "9 min",
    category: "ManutenÃ§Ã£o",
    content: (
      <>
        <p className="lead">A maioria dos problemas que resolvemos diariamente poderiam ter sido evitados com <strong>manutenÃ§Ã£o preventiva simples</strong>. Veja o que fazer para manter seu computador funcionando bem por anos.</p>

        <h2>1. Limpeza FÃ­sica (a cada 6 meses)</h2>
        <p>Poeira acumulada causa superaquecimento, travamentos e reduz a vida Ãºtil dos componentes. Use ar comprimido para limpar as saÃ­das de ar e ventoinhas. Em notebooks, uma limpeza interna profissional a cada 1-2 anos Ã© ideal.</p>

        <h2>2. Mantenha o Windows Atualizado</h2>
        <p>AtualizaÃ§Ãµes corrigem falhas de seguranÃ§a e melhoram o desempenho. Configure para atualizar automaticamente, mas evite versÃµes major no primeiro mÃªs (espere a estabilizaÃ§Ã£o).</p>

        <h2>3. FaÃ§a Backup Regularmente</h2>
        <p>HD externo, nuvem (OneDrive, Google Drive) ou ambos. A regra 3-2-1: 3 cÃ³pias, em 2 mÃ­dias diferentes, 1 fora de casa. <strong>Sem backup, qualquer problema vira catÃ¡strofe.</strong></p>

        <h2>4. Use AntivÃ­rus ConfiÃ¡vel</h2>
        <p>O Windows Defender jÃ¡ Ã© suficiente para a maioria. Mantenha-o ativo e atualizado. Evite instalar dois antivÃ­rus ao mesmo tempo â€” eles conflitam.</p>

        <h2>5. Desinstale Programas NÃ£o Usados</h2>
        <p>Programas desnecessÃ¡rios ocupam espaÃ§o, consomem recursos e podem ter vulnerabilidades. Remova pelo Painel de Controle o que nÃ£o usa hÃ¡ mais de 3 meses.</p>

        <h2>6. Monitore a Temperatura</h2>
        <p>Programas como HWMonitor mostram a temperatura em tempo real. CPU acima de 85Â°C sob carga Ã© preocupante. Acima de 95Â°C, desligue e procure um tÃ©cnico.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">ManutenÃ§Ã£o Preventiva Profissional</h3>
          <p className="text-muted-foreground mb-0">Fazemos limpeza interna, troca de pasta tÃ©rmica, otimizaÃ§Ã£o do sistema e verificaÃ§Ã£o completa. Atendimento a domicÃ­lio em Curitiba e regiÃ£o.</p>
        </div>
      </>
    ),
  },

  "diagnostico-tecnico-por-que-e-pago": {
    title: "Por Que o DiagnÃ³stico TÃ©cnico Ã© Pago? Entenda de Uma Vez",
    excerpt: "Explicamos por que o diagnÃ³stico tem custo, o que ele envolve e como evita prejuÃ­zos maiores.",
    date: "2026-04-05",
    readTime: "7 min",
    category: "Atendimento",
    content: (
      <>
        <p className="lead">Muitos clientes perguntam: <strong>"Por que cobram pelo diagnÃ³stico?"</strong>. A resposta Ã© simples: diagnÃ³stico tÃ©cnico Ã© um serviÃ§o especializado que exige conhecimento, ferramentas e tempo.</p>

        <h2>O Que Envolve um DiagnÃ³stico</h2>
        <ul>
          <li>Testes de hardware: memÃ³ria, HD/SSD, processador, placa de vÃ­deo</li>
          <li>AnÃ¡lise de software: sistema operacional, drivers, malwares</li>
          <li>VerificaÃ§Ã£o de temperatura e voltagem</li>
          <li>IdentificaÃ§Ã£o da causa raiz, nÃ£o apenas do sintoma</li>
          <li>Valor detalhado com opÃ§Ãµes de soluÃ§Ã£o</li>
        </ul>

        <h2>Por Que NÃ£o Ã© GrÃ¡tis?</h2>
        <p>O diagnÃ³stico Ã© a parte mais importante do atendimento. Um diagnÃ³stico errado leva a reparos desnecessÃ¡rios e prejuÃ­zo. O tÃ©cnico usa anos de experiÃªncia e ferramentas especializadas para chegar Ã  causa correta.</p>
        <p><strong>Analogia:</strong> VocÃª nÃ£o espera que um mÃ©dico faÃ§a exames de graÃ§a. O diagnÃ³stico tÃ©cnico segue a mesma lÃ³gica.</p>

        <h2>E Se Eu Aprovar o ServiÃ§o?</h2>
        <p>Na maioria dos casos, <strong>o valor do diagnÃ³stico Ã© abatido do serviÃ§o</strong>. Ou seja, se vocÃª aprovar o reparo, o diagnÃ³stico sai "grÃ¡tis" na prÃ¡tica.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">DiagnÃ³stico Profissional</h3>
          <p className="text-muted-foreground mb-0">A partir de R$ 99,99. Atendimento a domicÃ­lio em Curitiba e regiÃ£o metropolitana. Valor abatido em caso de aprovaÃ§Ã£o do serviÃ§o.</p>
        </div>
      </>
    ),
  },

  "como-proteger-computador-golpes-internet": {
    title: "Como se proteger de golpes na internet: o que checar antes de clicar",
    excerpt:
      "Phishing, sites clonados, falso suporte tÃ©cnico e extensÃµes maliciosas: como reconhecer cada padrÃ£o, o que verificar antes de clicar e o que fazer nas primeiras horas depois de cair em um golpe.",
    date: "2026-08-12",
    readTime: "14 min",
    category: "SeguranÃ§a",
    content: (
      <>
        <p className="lead">Golpes digitais costumam explorar pressa, medo e distraÃ§Ã£o. A resposta correta depende do que realmente aconteceu: receber uma mensagem nÃ£o Ã© o mesmo que digitar uma senha, instalar um programa ou autorizar uma transferÃªncia. Primeiro identifique a exposiÃ§Ã£o; depois contenha o risco sem apagar evidÃªncias.</p>

        <h2>Os quatro formatos que mais aparecem</h2>
        <h3>Phishing por e-mail, SMS ou aplicativo de mensagem</h3>
        <p>Mensagem que imita banco, operadora, loja ou Ã³rgÃ£o pÃºblico, com aviso de dÃ­vida, entrega pendente, benefÃ­cio disponÃ­vel ou bloqueio de conta. O objetivo pode ser levar a um formulÃ¡rio de login parecido com o real. NÃ£o use o link recebido para informar senha, cÃ³digo de verificaÃ§Ã£o ou dados de cartÃ£o: abra o aplicativo ou o endereÃ§o oficial por conta prÃ³pria.</p>

        <h3>Falso suporte tÃ©cnico</h3>
        <p>Pop-up ou ligaÃ§Ã£o nÃ£o solicitada afirma que o computador estÃ¡ infectado e oferece ajuda imediata, geralmente pedindo a instalaÃ§Ã£o de um programa de acesso remoto. Esse pedido permite que outra pessoa veja a tela e opere a sessÃ£o. Encerre o contato e procure o suporte pelo canal publicado no produto ou no site oficial.</p>

        <h3>Site clonado em anÃºncio de busca</h3>
        <p>O endereÃ§o pode aparecer como anÃºncio, com visual parecido com o original e domÃ­nio levemente diferente. PosiÃ§Ã£o no resultado nÃ£o comprova identidade. Para serviÃ§os sensÃ­veis, abra o aplicativo oficial, use um favorito conferido anteriormente ou digite o endereÃ§o conhecido.</p>

        <h3>ExtensÃ£o e programa "gratuito"</h3>
        <p>Conversor de arquivos, acelerador de downloads, tradutor ou cupom automÃ¡tico pode pedir permissÃµes muito maiores do que sua funÃ§Ã£o exige. Uma extensÃ£o autorizada a ler e alterar dados em todos os sites tem acesso amplo ao conteÃºdo das pÃ¡ginas; confira desenvolvedor, permissÃµes e necessidade antes de instalar.</p>

        <h2>Primeiro descubra o que foi exposto</h2>
        <p>Uma mensagem suspeita Ã© um alerta, nÃ£o prova de invasÃ£o. Use o evento mais grave que realmente ocorreu para escolher a resposta:</p>
        <table>
          <thead>
            <tr><th>O que aconteceu</th><th>Risco principal</th><th>PrÃ³xima aÃ§Ã£o</th></tr>
          </thead>
          <tbody>
            <tr><td>SÃ³ recebeu ou abriu a mensagem</td><td>Engano ainda nÃ£o consumado</td><td>NÃ£o responda nem use os contatos da mensagem; registre o remetente e reporte como fraude</td></tr>
            <tr><td>Clicou, mas nÃ£o baixou nem informou dados</td><td>Redirecionamento, download ou permissÃ£o inesperada</td><td>Feche a pÃ¡gina e confira downloads, extensÃµes e permissÃµes concedidas; mantenha navegador e sistema atualizados</td></tr>
            <tr><td>Digitou senha ou cÃ³digo</td><td>Tomada da conta</td><td>Em outro dispositivo confiÃ¡vel, troque a senha, encerre sessÃµes e revise recuperaÃ§Ã£o e autenticaÃ§Ã£o</td></tr>
            <tr><td>Instalou programa ou concedeu acesso remoto</td><td>AlteraÃ§Ã£o do computador e observaÃ§Ã£o da sessÃ£o</td><td>Desconecte a rede, pare de usar contas sensÃ­veis nessa mÃ¡quina e faÃ§a uma avaliaÃ§Ã£o do que foi instalado ou alterado</td></tr>
            <tr><td>Pagou ou enviou dados bancÃ¡rios/documentos</td><td>Fraude financeira ou de identidade</td><td>Contate imediatamente a instituiÃ§Ã£o pelo canal oficial e preserve mensagens, recibos, horÃ¡rios e destinatÃ¡rios</td></tr>
          </tbody>
        </table>

        <h2>O que verificar antes de clicar</h2>
        <ol>
          <li><strong>Leia o domÃ­nio de trÃ¡s para frente.</strong> O que vale Ã© o que estÃ¡ imediatamente antes da primeira barra. Em <code>banco.com.br.seguro-acesso.net</code>, o site Ã© <code>seguro-acesso.net</code>.</li>
          <li><strong>Passe o cursor sobre o link antes de clicar.</strong> No computador, o endereÃ§o real aparece no canto da tela; no celular, um toque longo mostra o destino.</li>
          <li><strong>Ignore o cadeado como prova de idoneidade.</strong> Ele indica conexÃ£o criptografada, nÃ£o que o site seja legÃ­timo. PÃ¡ginas de golpe tambÃ©m tÃªm cadeado.</li>
          <li><strong>Estranhe a urgÃªncia.</strong> Prazo de poucos minutos, ameaÃ§a de bloqueio e pedido de sigilo sÃ£o sinais de engenharia social, nÃ£o de processo real.</li>
          <li><strong>Confirme por outro canal.</strong> Feche a mensagem e procure o telefone no cartÃ£o, no aplicativo ou no site digitado por vocÃª. NÃ£o use o nÃºmero exibido no alerta.</li>
        </ol>

        <h2>As proteÃ§Ãµes que mais reduzem o estrago</h2>
        <h3>Senha Ãºnica por serviÃ§o</h3>
        <p>Senha repetida amplia o dano: a credencial capturada em um serviÃ§o pode ser testada em outros. Um gerenciador ajuda a criar uma senha diferente para cada conta; a senha mestra tambÃ©m precisa ser longa, exclusiva e protegida.</p>

        <h3>VerificaÃ§Ã£o em duas etapas onde ela importa</h3>
        <p>Comece pelo e-mail principal, porque ele costuma recuperar outras contas. Ative o mÃ©todo mais forte oferecido pelo serviÃ§o e guarde os meios de recuperaÃ§Ã£o. NÃ£o compartilhe cÃ³digos nem aprove solicitaÃ§Ãµes inesperadas: o segundo fator tambÃ©m pode ser capturado por uma pÃ¡gina falsa ou por pressÃ£o durante uma ligaÃ§Ã£o.</p>

        <h3>Conta de uso diÃ¡rio sem privilÃ©gio de administrador</h3>
        <p>Separar a conta administrativa da conta usada no dia a dia adiciona uma confirmaÃ§Ã£o para alteraÃ§Ãµes que exigem privilÃ©gio. Isso reduz a superfÃ­cie de dano, mas nÃ£o impede que o prÃ³prio usuÃ¡rio autorize uma instalaÃ§Ã£o maliciosa.</p>

        <h3>Sistema, navegador e roteador atualizados</h3>
        <p>AtualizaÃ§Ãµes corrigem falhas conhecidas e reduzem o risco de uma pÃ¡gina explorar software desatualizado. Inclua navegador, sistema e roteador; troque a senha administrativa padrÃ£o do equipamento. O procedimento estÃ¡ em <Link to="/blog/como-configurar-roteador-wifi-iniciantes">como configurar um roteador do zero</Link>.</p>

        <h3>Backup em cÃ³pia separada</h3>
        <p>Uma cÃ³pia separada e testada limita a perda quando arquivos sÃ£o apagados ou criptografados. Um disco sempre conectado pode ser alcanÃ§ado pelo mesmo incidente; mantenha pelo menos uma cÃ³pia isolada e confirme periodicamente que ela pode ser restaurada.</p>

        <h2>Se houve exposiÃ§Ã£o: as primeiras horas</h2>
        <ol>
          <li><strong>Preserve os dados do incidente.</strong> Antes de apagar a conversa, guarde capturas, endereÃ§o do site, remetente, horÃ¡rio, comprovante e nome do programa instalado. NÃ£o inclua senhas nem publique documentos pessoais.</li>
          <li><strong>Desconecte da rede</strong> se houve acesso remoto, instalaÃ§Ã£o desconhecida ou atividade ainda em andamento. SÃ³ clicar em uma pÃ¡gina, sem baixar ou autorizar nada, nÃ£o exige desligar toda a rede.</li>
          <li><strong>Troque as senhas de outro dispositivo confiÃ¡vel</strong>, comeÃ§ando pelo e-mail e depois pelos serviÃ§os financeiros. Trocar senha na mÃ¡quina possivelmente comprometida apenas entrega a nova.</li>
          <li><strong>Encerre as sessÃµes ativas</strong> nas contas afetadas, revise dispositivos e mÃ©todos de recuperaÃ§Ã£o e troque a mesma senha onde ela tiver sido reutilizada.</li>
          <li><strong>Comunique o banco imediatamente</strong> pelo aplicativo, nÃºmero do cartÃ£o ou outro canal oficial se houve pagamento, entrega de dados financeiros ou acesso ao internet banking.</li>
          <li><strong>Revise o e-mail afetado.</strong> Confira encaminhamento, filtros, aplicativos conectados, dispositivos e alteraÃ§Ãµes nos dados de recuperaÃ§Ã£o.</li>
          <li><strong>Verifique o computador antes de voltar a usÃ¡-lo para assuntos sensÃ­veis.</strong> Programa de acesso remoto instalado por terceiros precisa ser localizado e removido.</li>
        </ol>

        <h2>Quando interromper o procedimento por conta prÃ³pria</h2>
        <p>Pare se a outra pessoa ainda controla a tela, se surgiram transaÃ§Ãµes desconhecidas, se a conta Ã© corporativa, se arquivos foram criptografados ou se vocÃª nÃ£o consegue determinar o que foi instalado. NÃ£o continue entrando em banco ou e-mail pelo computador suspeito. Preserve as evidÃªncias, use um dispositivo confiÃ¡vel para os contatos urgentes e envolva a instituiÃ§Ã£o financeira ou o responsÃ¡vel de TI conforme o caso.</p>

        <h2>O que nÃ£o ajuda</h2>
        <ul>
          <li>Instalar vÃ¡rios antivÃ­rus ao mesmo tempo depois do susto â€” eles conflitam e nÃ£o desfazem o acesso jÃ¡ concedido.</li>
          <li>Confiar em "limpeza" oferecida pelo mesmo pop-up que gerou o problema.</li>
          <li>Formatar imediatamente sem preservar arquivos e sem entender o que aconteceu; parte da evidÃªncia se perde.</li>
          <li>Trocar apenas a senha do serviÃ§o afetado e manter a mesma combinaÃ§Ã£o nos demais.</li>
        </ul>

        <EditorialReferences slug="como-proteger-computador-golpes-internet" />

        <h2>Quando pedir ajuda tÃ©cnica</h2>
        <p>Acesso remoto concedido a desconhecido, arquivos que passaram a abrir com extensÃ£o estranha, navegador redirecionando sozinho e programas que reaparecem depois de removidos sÃ£o cenÃ¡rios em que a limpeza superficial nÃ£o resolve. Nesses casos, a <Link to="/servicos/remocao-de-virus">remoÃ§Ã£o de vÃ­rus e malware</Link> parte de uma varredura do que foi alterado no sistema; se houver arquivos criptografados ou apagados, vale verificar antes o que ainda pode ser preservado em <Link to="/servicos/recuperacao-de-dados">recuperaÃ§Ã£o de dados</Link>. Para escolher a proteÃ§Ã£o que fica no computador depois da limpeza, veja <Link to="/blog/como-escolher-um-bom-antivirus">como escolher um antivÃ­rus</Link>.</p>
      </>
    ),
  },

  "como-instalar-windows-11-pc-antigo": {
    title: "Como Instalar Windows 11 em PC Antigo Sem TPM 2.0",
    excerpt: "MÃ©todo seguro e testado por tÃ©cnicos.",
    date: "2024-01-14",
    readTime: "10 min",
    category: "Windows 11",
    content: (
      <>
        <p className="lead">O Windows 11 exige TPM 2.0 e Secure Boot, mas muitos PCs bons nÃ£o tÃªm esses recursos. Veja como instalar mesmo assim, <strong>de forma segura e testada</strong>.</p>

        <h2>Por Que o Windows 11 Exige TPM 2.0?</h2>
        <p>A Microsoft quer garantir seguranÃ§a mÃ­nima no hardware. O TPM (Trusted Platform Module) Ã© um chip de seguranÃ§a que protege chaves de criptografia. Mas muitos processadores de 6Âª e 7Âª geraÃ§Ã£o Intel rodam Windows 11 perfeitamente â€” sÃ³ nÃ£o tÃªm TPM 2.0.</p>

        <h2>MÃ©todo Oficial (ModificaÃ§Ã£o no Registro)</h2>
        <p>A prÃ³pria Microsoft disponibiliza uma forma de contornar a verificaÃ§Ã£o:</p>
        <ul>
          <li>Abra o Regedit e navegue atÃ© <code>HKEY_LOCAL_MACHINE\SYSTEM\Setup\MoSetup</code></li>
          <li>Crie um valor DWORD chamado <code>AllowUpgradesWithUnsupportedTPMOrCPU</code> = 1</li>
          <li>Execute a instalaÃ§Ã£o normalmente pela ISO montada</li>
        </ul>

        <h2>MÃ©todo via Rufus (InstalaÃ§Ã£o Limpa)</h2>
        <p>O programa Rufus permite criar um pendrive de instalaÃ§Ã£o que jÃ¡ remove as verificaÃ§Ãµes de TPM, Secure Boot e RAM. Ã‰ o mÃ©todo mais usado por tÃ©cnicos.</p>

        <h2>Riscos e ConsideraÃ§Ãµes</h2>
        <p>A Microsoft alerta que PCs sem TPM 2.0 podem nÃ£o receber todas as atualizaÃ§Ãµes futuras. Na prÃ¡tica, atÃ© o momento todas as atualizaÃ§Ãµes funcionam normalmente. O risco Ã© baixo, mas existe.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Quer Atualizar Para o Windows 11?</h3>
          <p className="text-muted-foreground mb-0">Nosso tÃ©cnico verifica se seu PC Ã© compatÃ­vel, faz a instalaÃ§Ã£o segura e configura tudo. Atendimento a domicÃ­lio.</p>
        </div>
      </>
    ),
  },

  "windows-11-lento-como-resolver": {
    title: "Windows 11 lento: como descobrir a causa antes de sair otimizando",
    excerpt:
      "LentidÃ£o no Windows 11 quase nunca tem uma causa Ãºnica. Como ler os sinais, separar limite de hardware de software mal configurado e decidir entre ajuste, upgrade e reinstalaÃ§Ã£o.",
    date: "2026-08-12",
    readTime: "11 min",
    category: "Procedimentos TÃ©cnicos",
    content: (
      <>
        <p className="lead">A maior parte das listas de "otimizaÃ§Ã£o" trata sintoma. Elas desativam animaÃ§Ã£o, limpam pasta temporÃ¡ria e prometem velocidade â€” sem nunca perguntar por que a mÃ¡quina ficou lenta. Aqui o caminho Ã© o contrÃ¡rio: primeiro identificar qual recurso estÃ¡ saturado, depois agir sÃ³ onde faz diferenÃ§a.</p>

        <h2>LentidÃ£o nÃ£o Ã© um sintoma sÃ³</h2>
        <p>Antes de qualquer ajuste, descreva com precisÃ£o o que estÃ¡ lento. Demora para chegar Ã  Ã¡rea de trabalho Ã© um problema. Travamento momentÃ¢neo ao abrir programas Ã© outro. Interface que engasga ao rolar pÃ¡gina Ã© outro ainda. Cada um aponta para um recurso diferente e exige decisÃ£o diferente.</p>
        <ul>
          <li><strong>Demora na inicializaÃ§Ã£o:</strong> disco lento ou fila grande de programas iniciando junto com o sistema.</li>
          <li><strong>Travadas curtas e repetidas:</strong> falta de memÃ³ria â€” o sistema passa a usar o disco como memÃ³ria de apoio.</li>
          <li><strong>LentidÃ£o constante em tudo:</strong> processador saturado por algum processo em segundo plano ou por limite tÃ©rmico.</li>
          <li><strong>SÃ³ o navegador pesa:</strong> excesso de abas, extensÃµes e cache â€” nÃ£o Ã© o Windows.</li>
          <li><strong>Piorou de repente:</strong> atualizaÃ§Ã£o mal aplicada, driver trocado ou software indesejado instalado.</li>
        </ul>

        <h2>Leia o Gerenciador de Tarefas antes de mexer</h2>
        <p>Abra o Gerenciador de Tarefas e observe a aba de desempenho durante alguns minutos de uso normal, nÃ£o com a mÃ¡quina parada. O que interessa Ã© qual coluna encosta no teto:</p>
        <ol>
          <li><strong>Disco em 100% de forma contÃ­nua:</strong> gargalo clÃ¡ssico de disco mecÃ¢nico com Windows 11. Nenhum ajuste de software resolve de forma duradoura.</li>
          <li><strong>MemÃ³ria acima de 80% em uso comum:</strong> a mÃ¡quina estÃ¡ trabalhando no limite; qualquer programa a mais gera engasgo.</li>
          <li><strong>Processador alto sem vocÃª fazer nada:</strong> vale identificar o processo. IndexaÃ§Ã£o e atualizaÃ§Ã£o em andamento sÃ£o temporÃ¡rios; mineraÃ§Ã£o, adware e antivÃ­rus duplicado nÃ£o sÃ£o.</li>
          <li><strong>Tudo baixo e mesmo assim lento:</strong> suspeite de disco com setores em falha ou de queda de desempenho por temperatura.</li>
        </ol>
        <p>Essa leitura de dois minutos evita horas de ajustes inÃºteis, porque troca palpite por evidÃªncia.</p>

        <h2>Limite de hardware nÃ£o se resolve com ajuste</h2>
        <p>O Windows 11 assume armazenamento de estado sÃ³lido e folga de memÃ³ria. Em disco mecÃ¢nico, o sistema fica preso na fila de leitura mesmo com processador sobrando: Ã© por isso que a mÃ¡quina demora para abrir a Ã¡rea de trabalho e trava por alguns segundos ao clicar em qualquer coisa. Trocar para SSD Ã© a mudanÃ§a com maior efeito perceptÃ­vel, e nenhum ajuste de configuraÃ§Ã£o substitui isso.</p>
        <p>MemÃ³ria Ã© a segunda barreira. Com pouca RAM, o sistema empurra parte do conteÃºdo para o arquivo de paginaÃ§Ã£o no disco, e a lentidÃ£o vira ciclo: falta memÃ³ria, sobra acesso a disco, tudo engasga. Antes de comprar mÃ³dulo, porÃ©m, confirme a leitura no Gerenciador de Tarefas â€” mÃ¡quina com memÃ³ria sobrando nÃ£o melhora nada com mais memÃ³ria.</p>
        <p>Existe ainda o caso do notebook que comeÃ§a rÃ¡pido e vai perdendo desempenho depois de alguns minutos. Isso nÃ£o Ã© software: Ã© refrigeraÃ§Ã£o saturada reduzindo a frequÃªncia do processador para conter temperatura. O tratamento estÃ¡ em <Link to="/blog/como-limpar-notebook-por-dentro">limpeza interna e manutenÃ§Ã£o da refrigeraÃ§Ã£o</Link>, nÃ£o em configuraÃ§Ã£o do Windows.</p>

        <h2>O que ajustar quando o gargalo Ã© software</h2>
        <p>Quando o hardware Ã© compatÃ­vel e a mÃ¡quina ainda arrasta, os ajustes que realmente pesam sÃ£o poucos:</p>
        <ul>
          <li><strong>Programas na inicializaÃ§Ã£o:</strong> tudo que sobe junto com o sistema disputa disco e memÃ³ria no pior momento. Mantenha sÃ³ o necessÃ¡rio.</li>
          <li><strong>AntivÃ­rus duplicado:</strong> duas soluÃ§Ãµes de proteÃ§Ã£o ativas ao mesmo tempo verificam o mesmo arquivo duas vezes e brigam entre si. Uma Ã© o bastante.</li>
          <li><strong>SincronizaÃ§Ã£o de nuvem:</strong> pastas grandes sincronizando em segundo plano consomem disco e rede continuamente. Vale limitar as pastas envolvidas.</li>
          <li><strong>Driver de vÃ­deo e chipset:</strong> instalados pelo fabricante do equipamento, resolvem travamento de interface que nenhuma limpeza corrige.</li>
          <li><strong>EspaÃ§o livre no disco do sistema:</strong> disco quase cheio degrada desempenho de forma real. Deixe folga de trabalho.</li>
        </ul>
        <p>Efeitos visuais e "dicas do sistema" entram por Ãºltimo, e com expectativa modesta: mudam a sensaÃ§Ã£o de resposta, nÃ£o a capacidade da mÃ¡quina.</p>

        <h2>Quando desconfiar de infecÃ§Ã£o</h2>
        <p>LentidÃ£o que aparece de um dia para o outro, junto com anÃºncios fora do lugar, pÃ¡gina inicial trocada ou processos desconhecidos consumindo processador, tem cara de software indesejado. Nesse caso, otimizar nÃ£o adianta â€” o consumo volta. O caminho estÃ¡ em <Link to="/blog/como-remover-virus-windows-iniciantes">como remover vÃ­rus e adware do Windows</Link>, e sÃ³ depois vale reavaliar o desempenho.</p>

        <h2>Reinstalar: quando faz sentido e quando Ã© atalho errado</h2>
        <p>ReinstalaÃ§Ã£o limpa resolve acÃºmulo de configuraÃ§Ã£o quebrada, software residual e perfil corrompido. Ã‰ a saÃ­da correta quando a mÃ¡quina foi usada por anos, passou por vÃ¡rias instalaÃ§Ãµes e continua lenta mesmo com hardware adequado.</p>
        <p>NÃ£o Ã© a saÃ­da quando o gargalo Ã© disco mecÃ¢nico ou pouca memÃ³ria: nesses casos o sistema fica rÃ¡pido por alguns dias e volta ao mesmo ponto. Reinstalar tambÃ©m exige backup verificado antes â€” arquivo copiado e conferido, nÃ£o presumido. O procedimento de resguardo estÃ¡ em <Link to="/servicos/recuperacao-de-dados">recuperaÃ§Ã£o e proteÃ§Ã£o de dados</Link>.</p>

        <h2>Ordem de trabalho que usamos na bancada</h2>
        <ol>
          <li>Reproduzir a lentidÃ£o descrita pelo cliente, no mesmo cenÃ¡rio de uso.</li>
          <li>Medir qual recurso satura durante essa reproduÃ§Ã£o.</li>
          <li>Verificar saÃºde do disco e temperatura sob carga.</li>
          <li>Descartar software indesejado e proteÃ§Ã£o duplicada.</li>
          <li>Ajustar inicializaÃ§Ã£o, drivers e sincronizaÃ§Ã£o.</li>
          <li>SÃ³ entÃ£o propor upgrade ou reinstalaÃ§Ã£o, com o motivo medido registrado.</li>
        </ol>
        <p>Essa ordem existe para nÃ£o vender peÃ§a antes de provar necessidade. O critÃ©rio de verificaÃ§Ã£o e cobranÃ§a estÃ¡ em <Link to="/diagnostico-tecnico">como funciona o diagnÃ³stico tÃ©cnico</Link>; quando o desfecho Ã© troca de armazenamento, o passo a passo estÃ¡ em <Link to="/blog/como-clonar-hd-para-ssd">como clonar o HD para SSD sem perder nada</Link>.</p>

        <h2>Resumo prÃ¡tico</h2>
        <p>Descreva o tipo de lentidÃ£o, meÃ§a qual recurso satura, elimine causas externas (infecÃ§Ã£o, proteÃ§Ã£o duplicada, temperatura) e trate o gargalo real. Ajuste de sistema muda sensaÃ§Ã£o; disco, memÃ³ria e refrigeraÃ§Ã£o mudam capacidade. Quando a mÃ¡quina estÃ¡ lenta em Curitiba e vocÃª nÃ£o quer trocar peÃ§a no escuro, o atendimento comeÃ§a pela mediÃ§Ã£o â€” nÃ£o pela venda.</p>
      </>
    ),
  },



  "windows-11-vale-a-pena-atualizar": {
    title: "Windows 11: Vale a Pena Atualizar?",
    excerpt: "Requisitos, novidades, vantagens e desvantagens.",
    date: "2026-01-15",
    readTime: "8 min",
    category: "Windows 11",
    content: (
      <>
        <p className="lead">O Windows 11 jÃ¡ estÃ¡ maduro e estÃ¡vel. Mas <strong>serÃ¡ que vale a pena atualizar?</strong> Depende do seu hardware e do que vocÃª faz no computador.</p>

        <h2>Vantagens do Windows 11</h2>
        <ul>
          <li>Interface moderna e mais organizada</li>
          <li>Melhor gerenciamento de mÃºltiplas janelas (Snap Layouts)</li>
          <li>Desempenho superior em jogos (DirectStorage, Auto HDR)</li>
          <li>IntegraÃ§Ã£o com Android (apps no PC)</li>
          <li>SeguranÃ§a aprimorada com TPM 2.0</li>
        </ul>

        <h2>Desvantagens</h2>
        <ul>
          <li>Requisitos de hardware mais exigentes</li>
          <li>Barra de tarefas com menos opÃ§Ãµes de personalizaÃ§Ã£o</li>
          <li>Alguns programas antigos podem ter incompatibilidade</li>
          <li>Menu Iniciar centralizado (nem todos gostam)</li>
        </ul>

        <h2>Quando Atualizar</h2>
        <p>Se seu PC atende os requisitos e vocÃª usa Windows 10, <strong>vale atualizar</strong>. O Windows 10 perde suporte em outubro de 2025. ApÃ³s isso, nÃ£o recebe mais atualizaÃ§Ãµes de seguranÃ§a.</p>

        <h2>Quando NÃƒO Atualizar</h2>
        <p>Se seu PC nÃ£o tem TPM 2.0 nativamente, se vocÃª usa softwares especÃ­ficos que podem nÃ£o ser compatÃ­veis, ou se estÃ¡ satisfeito e nÃ£o quer arriscar instabilidades.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Quer Atualizar Com SeguranÃ§a?</h3>
          <p className="text-muted-foreground mb-0">Nosso tÃ©cnico verifica compatibilidade, faz backup e atualiza sem risco de perder dados.</p>
        </div>
      </>
    ),
  },

  "office-365-guia-completo-empresas": {
    title: "Office 365 Para Empresas: Guia Completo",
    excerpt: "Teams, SharePoint, OneDrive e todas as ferramentas.",
    date: "2024-01-11",
    readTime: "12 min",
    category: "Office 365",
    content: (
      <>
        <p className="lead">O Microsoft 365 (antigo Office 365) Ã© muito mais do que Word, Excel e PowerPoint. Ã‰ uma plataforma completa de produtividade e colaboraÃ§Ã£o. Veja como aproveitar ao mÃ¡ximo.</p>

        <h2>O Que Inclui o Microsoft 365 Business</h2>
        <ul>
          <li><strong>Word, Excel, PowerPoint, Outlook:</strong> Aplicativos clÃ¡ssicos, sempre atualizados</li>
          <li><strong>Teams:</strong> VideoconferÃªncia, chat e colaboraÃ§Ã£o</li>
          <li><strong>OneDrive:</strong> 1 TB de armazenamento na nuvem por usuÃ¡rio</li>
          <li><strong>SharePoint:</strong> Intranet e compartilhamento de documentos</li>
          <li><strong>Exchange:</strong> E-mail profissional com seu domÃ­nio</li>
        </ul>

        <h2>Planos e PreÃ§os</h2>
        <p>O plano Business Basic (sÃ³ web + Teams) comeÃ§a em torno de R$ 30/mÃªs por usuÃ¡rio. O Business Standard (apps desktop + web) fica em torno de R$ 60/mÃªs. Para a maioria das empresas pequenas, o Standard Ã© a melhor escolha.</p>

        <h2>BenefÃ­cios Para Empresas</h2>
        <ul>
          <li>Sempre atualizado â€” sem precisar comprar nova versÃ£o</li>
          <li>Acesso de qualquer lugar (web, celular, tablet)</li>
          <li>Backup automÃ¡tico na nuvem</li>
          <li>Controle administrativo centralizado</li>
          <li>Conformidade e seguranÃ§a corporativa</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">ImplantaÃ§Ã£o de Microsoft 365</h3>
          <p className="text-muted-foreground mb-0">Configuramos e-mails, Teams, OneDrive e treinamos sua equipe. Suporte tÃ©cnico para empresas em Curitiba.</p>
        </div>
      </>
    ),
  },

  "office-365-vs-office-tradicional": {
    title: "Office 365 vs Office Tradicional: Qual Escolher?",
    excerpt: "Comparativo completo entre assinatura e licenÃ§a perpÃ©tua.",
    date: "2024-01-10",
    readTime: "6 min",
    category: "Office 365",
    content: (
      <>
        <p className="lead"><strong>Assinatura mensal ou licenÃ§a vitalÃ­cia?</strong> Essa Ã© a dÃºvida de muitos. Vamos comparar os dois modelos.</p>

        <h2>Office 365 (Assinatura)</h2>
        <ul>
          <li>Pagamento mensal ou anual</li>
          <li>Sempre na Ãºltima versÃ£o</li>
          <li>Inclui 1 TB de OneDrive</li>
          <li>Inclui Teams, SharePoint e mais</li>
          <li>Suporte da Microsoft incluso</li>
        </ul>

        <h2>Office Tradicional (LicenÃ§a PerpÃ©tua)</h2>
        <ul>
          <li>Pagamento Ãºnico</li>
          <li>VersÃ£o fixa â€” nÃ£o recebe novos recursos</li>
          <li>Sem armazenamento na nuvem incluso</li>
          <li>Suporte limitado (5 anos de atualizaÃ§Ãµes)</li>
          <li>NÃ£o inclui Teams e serviÃ§os online</li>
        </ul>

        <h2>Qual Escolher?</h2>
        <p><strong>Para empresas:</strong> Microsoft 365 sem dÃºvida. A colaboraÃ§Ã£o em tempo real, backup na nuvem e e-mail profissional justificam o custo mensal.</p>
        <p><strong>Para uso pessoal bÃ¡sico:</strong> Se vocÃª sÃ³ precisa de Word e Excel esporadicamente, a licenÃ§a perpÃ©tua pode bastar. Mas considere que ela fica desatualizada.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Precisa de Ajuda Para Decidir?</h3>
          <p className="text-muted-foreground mb-0">Analisamos seu uso e indicamos o melhor plano. InstalaÃ§Ã£o e configuraÃ§Ã£o profissional.</p>
        </div>
      </>
    ),
  },

  "configurar-email-outlook-office-365": {
    title: "Como Configurar Email Empresarial no Outlook 365",
    excerpt: "Tutorial com sincronizaÃ§Ã£o celular e backup automÃ¡tico.",
    date: "2024-01-09",
    readTime: "5 min",
    category: "Office 365",
    content: (
      <>
        <p className="lead">E-mail com domÃ­nio prÃ³prio (seunome@suaempresa.com.br) transmite profissionalismo. Veja como configurar no Outlook 365.</p>

        <h2>1. Configure o DomÃ­nio no Microsoft 365</h2>
        <p>Acesse o painel administrativo do Microsoft 365, adicione seu domÃ­nio e configure os registros DNS (MX, CNAME, TXT) no seu provedor de hospedagem.</p>

        <h2>2. Crie as Caixas de E-mail</h2>
        <p>No painel admin, crie os usuÃ¡rios e atribua licenÃ§as. Cada usuÃ¡rio recebe 50 GB de caixa postal e 1 TB de OneDrive.</p>

        <h2>3. Configure o Outlook no PC</h2>
        <p>Abra o Outlook, faÃ§a login com o e-mail corporativo. O Outlook detecta automaticamente as configuraÃ§Ãµes do Exchange Online. Em segundos, tudo estÃ¡ sincronizado.</p>

        <h2>4. Sincronize no Celular</h2>
        <p>Instale o app Outlook no celular (iOS ou Android), faÃ§a login e pronto. E-mails, calendÃ¡rio e contatos sincronizados em tempo real.</p>

        <h2>5. Configure Assinaturas</h2>
        <p>Crie uma assinatura profissional com logo, cargo e telefone. No Outlook: Arquivo â†’ OpÃ§Ãµes â†’ Email â†’ Assinaturas.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">ConfiguraÃ§Ã£o Profissional de E-mail</h3>
          <p className="text-muted-foreground mb-0">Configuramos tudo para vocÃª: domÃ­nio, DNS, Outlook no PC e celular, assinaturas e backup. Suporte para empresas em Curitiba.</p>
        </div>
      </>
    ),
  },

  "seguranca-digital-empresas-guia-2024": {
    title: "SeguranÃ§a Digital Para Empresas: Guia Essencial",
    excerpt: "Firewall, antivÃ­rus corporativo, backup e polÃ­ticas.",
    date: "2024-01-08",
    readTime: "15 min",
    category: "SeguranÃ§a",
    content: (
      <>
        <p className="lead">Empresas sÃ£o alvos cada vez mais frequentes de ataques cibernÃ©ticos. <strong>PMEs sÃ£o as mais vulnerÃ¡veis</strong> porque geralmente nÃ£o investem em seguranÃ§a. Veja o mÃ­nimo necessÃ¡rio.</p>

        <h2>1. Firewall Configurado</h2>
        <p>O firewall do Windows deve estar ativo em todos os computadores. Para empresas maiores, um firewall dedicado (hardware) no roteador Ã© recomendado.</p>

        <h2>2. AntivÃ­rus Corporativo</h2>
        <p>O Windows Defender Ã© bom para uso pessoal, mas empresas se beneficiam de soluÃ§Ãµes como Bitdefender GravityZone ou Kaspersky Small Office, que oferecem gestÃ£o centralizada.</p>

        <h2>3. Backup Automatizado</h2>
        <p>Regra 3-2-1: 3 cÃ³pias, 2 mÃ­dias diferentes, 1 fora do local. Use backup na nuvem (OneDrive, Google Workspace) + backup local em HD externo ou NAS.</p>

        <h2>4. Senhas e AutenticaÃ§Ã£o</h2>
        <p>PolÃ­tica de senhas fortes + autenticaÃ§Ã£o em dois fatores (2FA) em todos os acessos crÃ­ticos. Use gerenciadores de senha corporativos.</p>

        <h2>5. Treinamento da Equipe</h2>
        <p>O maior risco Ã© o fator humano. Treine funcionÃ¡rios para reconhecer phishing, nÃ£o usar pen drives desconhecidos e nÃ£o compartilhar senhas.</p>

        <h2>6. AtualizaÃ§Ãµes em Dia</h2>
        <p>Mantenha Windows, Office, navegadores e todos os softwares atualizados. Vulnerabilidades conhecidas sÃ£o as mais exploradas.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">SeguranÃ§a Para Sua Empresa</h3>
          <p className="text-muted-foreground mb-0">Fazemos auditoria de seguranÃ§a, configuraÃ§Ã£o de backup, antivÃ­rus e polÃ­ticas. Suporte empresarial em Curitiba.</p>
        </div>
      </>
    ),
  },

  "ransomware-como-proteger-empresa": {
    title: "Ransomware em pequenas empresas: como o ataque entra e o que realmente segura o prejuÃ­zo",
    excerpt:
      "Por onde o ransomware entra numa empresa pequena, por que o backup comum costuma ser criptografado junto, o que fazer nas primeiras horas e quais medidas realmente reduzem o risco.",
    date: "2026-08-12",
    readTime: "12 min",
    category: "SeguranÃ§a",
    content: (
      <>
        <p className="lead">Ransomware criptografa os arquivos da empresa e cobra resgate para devolvÃª-los. O que quase ninguÃ©m explica Ã© a parte que decide o desfecho: na maioria dos casos que chegam Ã  bancada, o backup existia â€” e foi criptografado junto, porque estava conectado Ã  mesma rede.</p>

        <h2>Por onde o ataque entra</h2>
        <p>Em empresa pequena, o caminho raramente Ã© sofisticado. SÃ£o quatro portas recorrentes:</p>
        <ul>
          <li><strong>Anexo ou link em e-mail.</strong> CobranÃ§a falsa, boleto, currÃ­culo, nota fiscal. O remetente pode ser um contato real cuja conta foi invadida â€” por isso "conheÃ§o quem mandou" nÃ£o Ã© critÃ©rio de seguranÃ§a.</li>
          <li><strong>Acesso remoto exposto na internet.</strong> Ãrea de trabalho remota liberada para fora com senha fraca Ã© o vetor mais explorado em escritÃ³rios que precisaram improvisar trabalho fora da empresa.</li>
          <li><strong>Programa desatualizado.</strong> Falhas conhecidas em sistema operacional, navegador e utilitÃ¡rios de rede continuam sendo exploradas anos depois da correÃ§Ã£o existir.</li>
          <li><strong>Credencial reaproveitada.</strong> Senha de administrador repetida entre mÃ¡quinas transforma uma infecÃ§Ã£o isolada em ataque a toda a rede.</li>
        </ul>

        <h2>Por que o backup normalmente falha justamente na hora</h2>
        <p>O ransomware nÃ£o ataca sÃ³ o computador onde foi executado. Ele procura tudo que estiver acessÃ­vel a partir dali: pastas compartilhadas, unidades mapeadas, servidor de arquivos, HD externo plugado e, em vÃ¡rios casos, a pasta sincronizada com a nuvem.</p>
        <p>Isso significa que backup em HD externo permanentemente conectado nÃ£o Ã© proteÃ§Ã£o contra ransomware â€” Ã© mais um alvo. O mesmo vale para a pasta sincronizada: se a versÃ£o criptografada sobe para a nuvem, o arquivo bom Ã© substituÃ­do.</p>
        <p>O que resiste tem trÃªs caracterÃ­sticas:</p>
        <ul>
          <li><strong>CÃ³pia desconectada</strong>, que sÃ³ Ã© ligada durante a rotina de backup e depois removida.</li>
          <li><strong>Versionamento</strong>, que permite voltar a um estado anterior Ã  criptografia mesmo depois da sincronizaÃ§Ã£o.</li>
          <li><strong>Credencial separada</strong>, para que o usuÃ¡rio infectado nÃ£o tenha permissÃ£o de apagar o destino do backup.</li>
        </ul>
        <p>O critÃ©rio prÃ¡tico de teste Ã© simples e vale mais que qualquer plano no papel: se a empresa nÃ£o consegue restaurar um arquivo de duas semanas atrÃ¡s em poucos minutos, o backup ainda nÃ£o foi validado. O desenho dessa rotina estÃ¡ em <Link to="/servicos/backup-para-empresas">backup para empresas</Link>.</p>

        <h2>Primeiras horas depois do ataque</h2>
        <ol>
          <li><strong>Isolar, nÃ£o desligar Ã s pressas.</strong> Tire as mÃ¡quinas afetadas da rede â€” cabo e Wi-Fi. Isso interrompe a propagaÃ§Ã£o sem destruir informaÃ§Ã£o que ainda pode ajudar a identificar o que aconteceu.</li>
          <li><strong>Desconectar os destinos de backup</strong> antes que sejam alcanÃ§ados, se ainda nÃ£o foram.</li>
          <li><strong>NÃ£o formatar nada</strong> enquanto o cenÃ¡rio nÃ£o estiver mapeado. FormataÃ§Ã£o apressada elimina a chance de recuperar o que sobrou.</li>
          <li><strong>Levantar o alcance real:</strong> quais mÃ¡quinas, quais pastas de rede, qual servidor e desde quando.</li>
          <li><strong>Preservar os arquivos criptografados.</strong> Em parte dos casos existe ferramenta de decriptaÃ§Ã£o pÃºblica para a variante especÃ­fica, publicada depois do ataque.</li>
        </ol>

        <h2>Sobre pagar o resgate</h2>
        <p>Pagar nÃ£o garante devoluÃ§Ã£o, nÃ£o garante que a chave funcione em todos os arquivos e nÃ£o impede um segundo ataque â€” pelo contrÃ¡rio, marca a empresa como pagadora. AlÃ©m disso, o acesso que permitiu a entrada continua aberto enquanto nÃ£o for fechado. A decisÃ£o Ã© da empresa, mas ela precisa ser tomada sabendo que o pagamento nÃ£o resolve a causa.</p>

        <h2>O que reduz risco de verdade em empresa pequena</h2>
        <ul>
          <li><strong>Fechar o acesso remoto exposto.</strong> Se Ã© necessÃ¡rio acesso de fora, ele deve passar por um tÃºnel autenticado, nunca por porta aberta na internet.</li>
          <li><strong>Contas de trabalho sem privilÃ©gio de administrador.</strong> Grande parte dos ataques depende do usuÃ¡rio poder instalar o que aparecer.</li>
          <li><strong>Senhas distintas por mÃ¡quina e segundo fator no e-mail.</strong> E-mail comprometido Ã© a origem de boa parte das fraudes que vÃªm depois.</li>
          <li><strong>AtualizaÃ§Ãµes em rotina definida</strong>, nÃ£o quando alguÃ©m lembra.</li>
          <li><strong>Filtro de e-mail e bloqueio de anexos executÃ¡veis.</strong></li>
          <li><strong>Rotina de restauraÃ§Ã£o testada por amostragem</strong>, com registro de quem testou e quando.</li>
        </ul>
        <p>Essas verificaÃ§Ãµes fazem parte da rotina descrita em <Link to="/servicos/manutencao-preventiva-empresas">manutenÃ§Ã£o preventiva para empresas</Link> e do acompanhamento em <Link to="/servicos/suporte-tecnico-empresarial">suporte tÃ©cnico empresarial</Link>.</p>

        <h2>O erro mais caro: tratar como incidente de uma mÃ¡quina</h2>
        <p>Quando a empresa limpa apenas o computador que apareceu com a mensagem de resgate e volta a operar, o acesso original continua disponÃ­vel. ReinfecÃ§Ã£o em poucas semanas Ã© o desfecho comum. O encerramento correto envolve identificar a porta de entrada, trocar credenciais, revisar o que era acessÃ­vel a partir da mÃ¡quina afetada e sÃ³ entÃ£o restaurar.</p>

        <h2>Quando chamar atendimento</h2>
        <p>Vale acionar suporte imediatamente quando arquivos passaram a abrir com extensÃ£o estranha, quando surgiu arquivo de texto pedindo resgate nas pastas, quando o servidor de arquivos ficou inacessÃ­vel ou quando mais de uma mÃ¡quina apresentou o mesmo comportamento. O critÃ©rio de verificaÃ§Ã£o e cobranÃ§a estÃ¡ em <Link to="/diagnostico-tecnico">como funciona o diagnÃ³stico tÃ©cnico</Link>, e a avaliaÃ§Ã£o de dados jÃ¡ atingidos aparece em <Link to="/servicos/recuperacao-de-dados">recuperaÃ§Ã£o de dados</Link>.</p>

        <h2>Resumo prÃ¡tico</h2>
        <p>Ransomware entra por e-mail, acesso remoto exposto, software desatualizado ou senha reaproveitada. Backup sÃ³ protege se estiver desconectado ou versionado e se a restauraÃ§Ã£o jÃ¡ tiver sido testada. Diante do ataque, isole a rede, preserve os arquivos, mapeie o alcance e feche a porta de entrada antes de restaurar â€” limpar sÃ³ a mÃ¡quina visÃ­vel costuma resultar em reinfecÃ§Ã£o.</p>
      </>
    ),
  },

  "phishing-como-identificar-golpes": {
    title: "Phishing: Como Identificar e Evitar Golpes por Email",
    excerpt: "ReconheÃ§a tentativas de phishing e proteja seus dados.",
    date: "2024-01-06",
    readTime: "7 min",
    category: "SeguranÃ§a",
    content: (
      <>
        <p className="lead">Phishing Ã© a tÃ©cnica de golpe mais comum na internet. O criminoso se passa por uma empresa ou pessoa confiÃ¡vel para <strong>roubar seus dados</strong>. Veja como identificar.</p>

        <h2>Sinais de Um E-mail de Phishing</h2>
        <ul>
          <li><strong>UrgÃªncia exagerada:</strong> "Sua conta serÃ¡ bloqueada em 24 horas!"</li>
          <li><strong>Erros de portuguÃªs:</strong> Empresas grandes revisam seus textos</li>
          <li><strong>Remetente suspeito:</strong> banco@seguranca-atualizar.com nÃ£o Ã© do banco</li>
          <li><strong>Links estranhos:</strong> Passe o mouse sobre o link (sem clicar) e veja o endereÃ§o real</li>
          <li><strong>Pedido de dados pessoais:</strong> Bancos nunca pedem senha por e-mail</li>
        </ul>

        <h2>O Que Fazer Se Receber</h2>
        <ul>
          <li>NÃ£o clique em nenhum link</li>
          <li>NÃ£o baixe anexos</li>
          <li>Marque como spam/phishing no seu e-mail</li>
          <li>Se tiver dÃºvida, acesse o site oficial digitando o endereÃ§o no navegador</li>
        </ul>

        <h2>CaÃ­ No Golpe. E Agora?</h2>
        <p>Troque imediatamente a senha da conta comprometida. Ative 2FA. Se informou dados bancÃ¡rios, entre em contato com o banco. Se instalou algum programa, procure um tÃ©cnico para limpar o computador.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Caiu em Um Golpe?</h3>
          <p className="text-muted-foreground mb-0">Nosso tÃ©cnico verifica se seu computador foi comprometido, remove ameaÃ§as e configura proteÃ§Ã£o adequada.</p>
        </div>
      </>
    ),
  },

  "backup-nuvem-empresas-qual-escolher": {
    title: "Backup em nuvem para empresas: o que diferencia sincronizaÃ§Ã£o de backup de verdade",
    excerpt:
      "Por que pasta sincronizada nÃ£o Ã© backup, quais critÃ©rios comparar antes de contratar, como estruturar cÃ³pias em camadas e o teste que revela se a rotina realmente funciona.",
    date: "2026-08-12",
    readTime: "11 min",
    category: "SeguranÃ§a",
    content: (
      <>
        <p className="lead">A maioria das empresas pequenas acredita ter backup porque os arquivos ficam em uma pasta na nuvem. SincronizaÃ§Ã£o e backup, porÃ©m, resolvem problemas diferentes â€” e a confusÃ£o entre os dois sÃ³ aparece no dia em que algo precisa ser restaurado.</p>

        <h2>Resposta rÃ¡pida</h2>
        <p>Para empresa, o critÃ©rio de escolha nÃ£o Ã© preÃ§o por gigabyte: Ã© retenÃ§Ã£o, granularidade de restauraÃ§Ã£o, escopo do que entra na cÃ³pia, imutabilidade e tempo real para voltar a operar. Armazenamento sincronizado nÃ£o atende sozinho, porque exclusÃ£o e criptografia se propagam. O serviÃ§o adequado permite recuperar um arquivo especÃ­fico de uma data especÃ­fica, mantÃ©m cÃ³pias que nÃ£o podem ser apagadas durante um perÃ­odo definido e Ã© testado em restauraÃ§Ã£o periÃ³dica â€” nÃ£o apenas configurado uma vez.</p>

        <h2>A diferenÃ§a que decide tudo</h2>
        <p><strong>SincronizaÃ§Ã£o</strong> mantÃ©m o mesmo conteÃºdo em vÃ¡rios lugares. Se o arquivo Ã© apagado, corrompido ou criptografado, a alteraÃ§Ã£o se propaga para todas as cÃ³pias â€” foi exatamente o que se pediu que ela fizesse.</p>
        <p><strong>Backup</strong> guarda estados anteriores, independentes do arquivo atual. Ele responde a uma pergunta que a sincronizaÃ§Ã£o nÃ£o responde: como estava esse arquivo na semana passada, antes do erro.</p>
        <p>ServiÃ§os de nuvem corporativa costumam oferecer histÃ³rico de versÃµes e lixeira com prazo, o que aproxima o comportamento de um backup â€” desde que o prazo de retenÃ§Ã£o seja maior que o tempo tÃ­pico entre o problema e a descoberta dele. Erro percebido depois do prazo Ã© erro sem volta.</p>

        <h2>CritÃ©rios que realmente importam na comparaÃ§Ã£o</h2>
        <p>EspaÃ§o em disco Ã© o critÃ©rio menos relevante e o mais usado em propaganda. Antes de olhar preÃ§o por terabyte, compare:</p>
        <ul>
          <li><strong>RetenÃ§Ã£o.</strong> Por quantos dias Ã© possÃ­vel voltar? Trinta dias resolve erro humano; incidente descoberto tarde exige mais.</li>
          <li><strong>Granularidade da restauraÃ§Ã£o.</strong> DÃ¡ para recuperar um arquivo sÃ³, uma pasta inteira ou apenas tudo de uma vez?</li>
          <li><strong>Escopo.</strong> A ferramenta copia sÃ³ documentos, ou tambÃ©m bancos de dados, e-mail, configuraÃ§Ãµes e sistema completo?</li>
          <li><strong>Imutabilidade.</strong> Uma conta comprometida consegue apagar as cÃ³pias? Se consegue, o backup nÃ£o protege contra ataque, sÃ³ contra defeito de disco.</li>
          <li><strong>Tempo de restauraÃ§Ã£o.</strong> Baixar centenas de gigabytes por link comum leva horas. Isso precisa ser conhecido antes, nÃ£o durante a emergÃªncia.</li>
          <li><strong>Onde os dados ficam</strong> e o que o contrato diz sobre acesso, em especial para empresas que tratam dados pessoais de clientes.</li>
        </ul>

        <h2>Estrutura em camadas que funciona em empresa pequena</h2>
        <ol>
          <li><strong>CÃ³pia operacional.</strong> Arquivos do dia a dia em nuvem corporativa com histÃ³rico de versÃµes ativo â€” resolve exclusÃ£o acidental e ediÃ§Ã£o errada, que sÃ£o a maioria dos incidentes.</li>
          <li><strong>CÃ³pia local rÃ¡pida.</strong> Servidor ou disco dedicado dentro da empresa, para restauraÃ§Ãµes grandes sem depender da internet.</li>
          <li><strong>CÃ³pia isolada.</strong> Destino desconectado ou com escrita protegida, fora do alcance de qualquer credencial de usuÃ¡rio comum. Ã‰ a camada que sobrevive a ransomware, conforme detalhado em <Link to="/blog/ransomware-como-proteger-empresa">ransomware em pequenas empresas</Link>.</li>
        </ol>
        <p>Nem toda empresa precisa das trÃªs de imediato. O que nÃ£o pode faltar Ã© uma camada que nÃ£o seja alcanÃ§Ã¡vel a partir da estaÃ§Ã£o de trabalho comum.</p>

        <h2>O que costuma ficar de fora â€” e faz falta</h2>
        <ul>
          <li><strong>E-mail.</strong> Muita gente assume que a caixa corporativa estÃ¡ coberta. A retenÃ§Ã£o padrÃ£o da plataforma pode ser bem menor que a necessidade da empresa.</li>
          <li><strong>Sistema de gestÃ£o e banco de dados.</strong> Copiar o arquivo do banco com ele em uso pode gerar cÃ³pia inconsistente, que sÃ³ falha na hora de restaurar.</li>
          <li><strong>MÃ¡quinas individuais.</strong> Se o time salva no computador local, o backup do servidor nÃ£o cobre esse conteÃºdo.</li>
          <li><strong>ConfiguraÃ§Ãµes e licenÃ§as.</strong> Restaurar arquivos Ã© rÃ¡pido; reconstruir a configuraÃ§Ã£o de todos os postos Ã© o que costuma tomar dias.</li>
        </ul>

        <h2>O teste que separa rotina real de rotina no papel</h2>
        <p>Uma vez por mÃªs, escolha um arquivo aleatÃ³rio e tente restaurÃ¡-lo em uma versÃ£o de duas ou trÃªs semanas atrÃ¡s. Cronometre. Registre quem fez e o resultado.</p>
        <p>Esse teste revela, sem custo, os trÃªs problemas mais comuns: rotina interrompida hÃ¡ meses sem ninguÃ©m perceber, retenÃ§Ã£o menor do que se imaginava e ausÃªncia da senha ou da permissÃ£o necessÃ¡ria para restaurar. Backup nunca testado Ã© uma expectativa, nÃ£o uma garantia.</p>

        <h2>Como decidir sem depender de marca</h2>
        <p>Comece pela pergunta inversa: quanto tempo a empresa aguenta parada e quanto trabalho ela pode perder. Uma empresa que aceita perder um dia de trabalho e ficar meio dia parada precisa de uma estrutura muito mais simples â€” e mais barata â€” do que uma que nÃ£o pode perder uma hora. Definidos esses dois nÃºmeros, a escolha de ferramenta vira consequÃªncia tÃ©cnica, nÃ£o preferÃªncia de fornecedor.</p>
        <p>A implantaÃ§Ã£o, o monitoramento das rotinas e o teste periÃ³dico fazem parte de <Link to="/servicos/backup-para-empresas">backup para empresas</Link>, acompanhados dentro de <Link to="/servicos/suporte-tecnico-empresarial">suporte tÃ©cnico empresarial</Link>. Quando a perda jÃ¡ ocorreu e nÃ£o hÃ¡ cÃ³pia utilizÃ¡vel, o caminho passa por <Link to="/servicos/recuperacao-de-dados">recuperaÃ§Ã£o de dados</Link>.</p>

        <h2>Resumo prÃ¡tico</h2>
        <p>Pasta sincronizada nÃ£o Ã© backup. Compare retenÃ§Ã£o, granularidade, escopo, imutabilidade e tempo de restauraÃ§Ã£o antes de comparar preÃ§o. Mantenha ao menos uma camada fora do alcance das estaÃ§Ãµes de trabalho, inclua e-mail e bancos de dados no escopo e teste a restauraÃ§Ã£o todo mÃªs â€” o teste Ã© a Ãºnica evidÃªncia de que a rotina existe.</p>
        <h2>CritÃ©rio, pergunta objetiva e evidÃªncia</h2>
        <p>Contrato de backup se avalia por respostas verificÃ¡veis, nÃ£o por descriÃ§Ã£o comercial. A tabela traduz cada critÃ©rio em uma pergunta e na evidÃªncia que a comprova.</p>
        <div className="not-prose my-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead><tr><th className="text-left p-2 border-b">CritÃ©rio</th><th className="text-left p-2 border-b">Pergunta ao fornecedor</th><th className="text-left p-2 border-b">EvidÃªncia que comprova</th></tr></thead>
            <tbody>
              <tr><td className="p-2 border-b">RetenÃ§Ã£o</td><td className="p-2 border-b">Por quanto tempo as versÃµes antigas ficam disponÃ­veis?</td><td className="p-2 border-b">PolÃ­tica escrita com prazo em dias, nÃ£o "histÃ³rico recente"</td></tr>
              <tr><td className="p-2 border-b">Granularidade</td><td className="p-2 border-b">Ã‰ possÃ­vel restaurar um Ãºnico arquivo de uma data especÃ­fica?</td><td className="p-2 border-b">RestauraÃ§Ã£o de teste executada e registrada</td></tr>
              <tr><td className="p-2 border-b">Escopo</td><td className="p-2 border-b">O que exatamente entra na cÃ³pia: estaÃ§Ãµes, servidor, e-mail, sistema de gestÃ£o?</td><td className="p-2 border-b">Lista dos itens protegidos, com o que ficou de fora</td></tr>
              <tr><td className="p-2 border-b">Imutabilidade</td><td className="p-2 border-b">A cÃ³pia pode ser apagada por quem tem acesso administrativo?</td><td className="p-2 border-b">Recurso de retenÃ§Ã£o imutÃ¡vel habilitado e demonstrado</td></tr>
              <tr><td className="p-2 border-b">Tempo de restauraÃ§Ã£o</td><td className="p-2 border-b">Em quanto tempo a operaÃ§Ã£o volta depois de uma perda total?</td><td className="p-2 border-b">Teste cronometrado, com nÃºmero real</td></tr>
              <tr><td className="p-2 border-b">Responsabilidade</td><td className="p-2 border-b">Quem responde pela cÃ³pia e quem confere o resultado?</td><td className="p-2 border-b">Nome do responsÃ¡vel e periodicidade da conferÃªncia por escrito</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Ãrvore de decisÃ£o</h2>
        <ol>
          <li>O que a empresa nÃ£o pode perder estÃ¡ identificado (fiscal, contratos, base de clientes, projetos)? Sem esse inventÃ¡rio, qualquer contrataÃ§Ã£o Ã© palpite.</li>
          <li>Existe cÃ³pia que nÃ£o Ã© apagada quando o original Ã© apagado? Se nÃ£o existir, sincronizaÃ§Ã£o estÃ¡ sendo confundida com backup.</li>
          <li>A restauraÃ§Ã£o jÃ¡ foi testada com um arquivo real? Se nunca foi, o serviÃ§o estÃ¡ configurado, nÃ£o comprovado.</li>
          <li>HÃ¡ cÃ³pia fora do provedor principal? Depender de um Ãºnico fornecedor concentra o risco de indisponibilidade e de conta perdida.</li>
          <li>Existe responsÃ¡vel nomeado por conferir a cÃ³pia todo mÃªs? Rotina sem dono deixa de acontecer no primeiro mÃªs corrido.</li>
        </ol>

        <h2>Erros comuns</h2>
        <ul>
          <li>Proteger o servidor e esquecer as estaÃ§Ãµes onde o trabalho realmente Ã© produzido.</li>
          <li>Contratar espaÃ§o em nuvem e nÃ£o configurar retenÃ§Ã£o, ficando apenas com a Ãºltima versÃ£o.</li>
          <li>Deixar as credenciais de administraÃ§Ã£o da cÃ³pia nas mesmas contas que um ataque comprometeria primeiro.</li>
          <li>Escolher pelo custo mensal sem calcular o custo de uma hora de operaÃ§Ã£o parada.</li>
          <li>Nunca testar a restauraÃ§Ã£o e descobrir a falha durante o incidente.</li>
        </ul>

        <h2>Limites de seguranÃ§a</h2>
        <p>Backup em nuvem nÃ£o elimina indisponibilidade: durante uma restauraÃ§Ã£o grande, a operaÃ§Ã£o depende da banda disponÃ­vel e pode levar horas ou dias, o que precisa entrar no planejamento. TambÃ©m nÃ£o substitui obrigaÃ§Ãµes legais prÃ³prias de cada setor sobre guarda e privacidade de dados â€” a cÃ³pia herda as mesmas exigÃªncias do original. E nenhum fornecedor pode garantir recuperaÃ§Ã£o integral quando a cÃ³pia nÃ£o abrange o dado perdido: o escopo contratado define o limite real, nÃ£o a expectativa da empresa.</p>

        <h2>Termos de contrato que mudam o resultado</h2>
        <ul>
          <li><strong>RetenÃ§Ã£o:</strong> prazo em que versÃµes antigas permanecem recuperÃ¡veis.</li>
          <li><strong>Imutabilidade:</strong> impossibilidade de alterar ou excluir a cÃ³pia durante o perÃ­odo definido.</li>
          <li><strong>Ponto de recuperaÃ§Ã£o:</strong> quanto de trabalho se aceita perder entre uma cÃ³pia e a seguinte.</li>
          <li><strong>Tempo de recuperaÃ§Ã£o:</strong> prazo aceitÃ¡vel para voltar a operar depois da falha.</li>
          <li><strong>Escopo:</strong> conjunto exato de equipamentos e sistemas cobertos pelo contrato.</li>
        </ul>

        <p>Para desenhar o escopo, testar a restauraÃ§Ã£o e definir responsÃ¡veis com acompanhamento presencial em Curitiba e regiÃ£o, o serviÃ§o estÃ¡ em <Link to="/servicos/backup-para-empresas" className="text-accent">backup para empresas</Link>.</p>

        <EditorialReferences slug="backup-nuvem-empresas-qual-escolher" />

      </>
    ),
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // ARTIGOS â€” PLATAFORMA PRECISO DE UM
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  "preciso-de-um-plataforma-prestadores": {
    title: "Preciso de Um: A Plataforma Que Conecta Prestadores de ServiÃ§os a Clientes",
    excerpt: "ConheÃ§a a plataforma que estÃ¡ revolucionando a forma como profissionais autÃ´nomos encontram clientes em todo o Brasil.",
    date: "2026-04-08",
    readTime: "8 min",
    category: "Plataformas",
    content: (
      <>
        <p className="lead">Se vocÃª Ã© profissional autÃ´nomo ou prestador de serviÃ§o, sabe como Ã© difÃ­cil conseguir clientes de forma constante. O <strong><a href="https://precisodeum.com.br" target="_blank" rel="noopener noreferrer" className="text-accent">Preciso de Um</a></strong> surgiu exatamente para resolver esse problema: <strong>conectar quem precisa de um serviÃ§o ao profissional certo, de forma rÃ¡pida e gratuita</strong>.</p>

        <h2>O Que Ã© o Preciso de Um?</h2>
        <p>O <strong>Preciso de Um</strong> Ã© uma plataforma digital que funciona como um marketplace de serviÃ§os. Clientes buscam profissionais por categoria e localizaÃ§Ã£o, comparam perfis, avaliaÃ§Ãµes e portfÃ³lios, e entram em contato direto â€” sem intermediÃ¡rios, sem comissÃ£o e sem burocracia.</p>
        <p>A plataforma jÃ¡ conta com <strong>mais de 2.800 serviÃ§os cadastrados</strong> e atende profissionais de diversas cidades do Brasil, com destaque para Curitiba e regiÃ£o metropolitana, SÃ£o Paulo, Rio de Janeiro e BelÃ©m.</p>

        <h2>Como Funciona na PrÃ¡tica?</h2>
        <p>O processo Ã© simples e transparente, tanto para clientes quanto para profissionais:</p>
        <ol>
          <li><strong>ðŸ” Busca:</strong> O cliente digita o serviÃ§o que precisa (ex: "eletricista", "pintor", "tÃ©cnico em informÃ¡tica") e sua localizaÃ§Ã£o.</li>
          <li><strong>â­ ComparaÃ§Ã£o:</strong> A plataforma exibe profissionais verificados com avaliaÃ§Ãµes, experiÃªncia e faixas de preÃ§o.</li>
          <li><strong>ðŸ’¬ Contato direto:</strong> O cliente fala diretamente com o profissional via WhatsApp ou formulÃ¡rio â€” sem taxas.</li>
        </ol>

        <h2>Quem Pode Participar?</h2>
        <p>A grande forÃ§a do Preciso de Um Ã© a <strong>diversidade de categorias</strong>. A plataforma aceita profissionais de praticamente qualquer ramo:</p>
        <ul>
          <li>âš¡ Eletricistas</li>
          <li>ðŸ—ï¸ ConstruÃ§Ã£o Civil (pedreiros, mestres de obras)</li>
          <li>ðŸŽ¨ Pintores</li>
          <li>ðŸ› ï¸ Marido de Aluguel</li>
          <li>ðŸ’» TÃ©cnicos em InformÃ¡tica</li>
          <li>ðŸ§¹ Diaristas e serviÃ§os de limpeza</li>
          <li>ðŸŽ‰ Profissionais de eventos</li>
          <li>ðŸ“² Social Media e marketing digital</li>
          <li>ðŸ“¦ Fretistas e mudanÃ§as</li>
          <li>â„ï¸ InstalaÃ§Ã£o e manutenÃ§Ã£o de ar-condicionado</li>
          <li>E muito mais...</li>
        </ul>

        <h2>Parceiros de Peso</h2>
        <p>O Preciso de Um jÃ¡ conta com parceiros e patrocinadores de renome como <strong>Balaroti Home Center</strong>, <strong>Philips do Brasil</strong> e <strong>Leroy Merlin</strong>. Isso comprova a credibilidade e o potencial de crescimento da plataforma.</p>

        <h2>Quanto Custa?</h2>
        <p><strong>O cadastro Ã© 100% gratuito.</strong> O profissional cria seu perfil, adiciona seus serviÃ§os, define sua Ã¡rea de atuaÃ§Ã£o e comeÃ§a a receber contatos. NÃ£o hÃ¡ comissÃ£o sobre os serviÃ§os fechados.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Cadastre-se Agora no Preciso de Um</h3>
          <p className="text-muted-foreground mb-4">Crie seu perfil gratuitamente e comece a receber clientes na sua regiÃ£o. Ã‰ rÃ¡pido, gratuito e sem comissÃ£o.</p>
          <a href="https://precisodeum.com.br/cadastro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
            FaÃ§a seu cadastro grÃ¡tis â†’
          </a>
        </div>
      </>
    ),
  },

  "como-cadastrar-preciso-de-um": {
    title: "Como Se Cadastrar no Preciso de Um e ComeÃ§ar a Receber Clientes Hoje",
    excerpt: "Passo a passo completo para profissionais de qualquer ramo se cadastrarem gratuitamente na plataforma.",
    date: "2026-04-08",
    readTime: "6 min",
    category: "Plataformas",
    content: (
      <>
        <p className="lead">Se vocÃª Ã© prestador de serviÃ§o e quer ampliar sua carteira de clientes, <strong>cadastrar-se no <a href="https://precisodeum.com.br" target="_blank" rel="noopener noreferrer" className="text-accent">Preciso de Um</a> Ã© o primeiro passo</strong>. O processo Ã© simples, leva poucos minutos e Ã© completamente gratuito.</p>

        <h2>Passo 1: Acesse a Plataforma</h2>
        <p>Entre em <a href="https://precisodeum.com.br/cadastro" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold">precisodeum.com.br/cadastro</a>. VocÃª pode acessar pelo celular ou computador â€” a plataforma Ã© responsiva e funciona como um app instalÃ¡vel.</p>

        <h2>Passo 2: Crie Seu Perfil Profissional</h2>
        <p>Preencha seus dados bÃ¡sicos:</p>
        <ul>
          <li><strong>Nome completo ou nome da empresa</strong></li>
          <li><strong>Categoria de serviÃ§o</strong> (eletricista, pintor, tÃ©cnico, diarista, etc.)</li>
          <li><strong>Cidade e regiÃ£o de atuaÃ§Ã£o</strong></li>
          <li><strong>Anos de experiÃªncia</strong></li>
          <li><strong>Foto de perfil</strong> (profissionais com foto recebem atÃ© 3x mais contatos)</li>
          <li><strong>WhatsApp para contato direto</strong></li>
        </ul>

        <h2>Passo 3: Adicione Seus ServiÃ§os</h2>
        <p>Descreva os serviÃ§os que vocÃª oferece. Quanto mais detalhado, melhor sua visibilidade nas buscas. VocÃª pode incluir:</p>
        <ul>
          <li>DescriÃ§Ã£o do serviÃ§o</li>
          <li>Faixa de preÃ§o estimada</li>
          <li>Fotos de trabalhos realizados (portfÃ³lio)</li>
          <li>Ãrea de atendimento</li>
        </ul>

        <h2>Passo 4: Comece a Receber Clientes</h2>
        <p>Assim que seu perfil estiver ativo, clientes da sua regiÃ£o poderÃ£o encontrÃ¡-lo ao buscar pelo serviÃ§o que vocÃª oferece. O contato Ã© feito diretamente via WhatsApp â€” <strong>sem intermediÃ¡rios e sem comissÃ£o</strong>.</p>

        <h2>Dicas Para Se Destacar</h2>
        <ol>
          <li><strong>Use foto profissional:</strong> Perfis com foto transmitem mais confianÃ§a.</li>
          <li><strong>Descreva seus diferenciais:</strong> ExperiÃªncia, certificaÃ§Ãµes, garantia de serviÃ§o.</li>
          <li><strong>Mantenha o perfil atualizado:</strong> Adicione novos trabalhos e atualize preÃ§os.</li>
          <li><strong>Responda rÃ¡pido:</strong> Clientes priorizam profissionais que respondem com agilidade.</li>
          <li><strong>PeÃ§a avaliaÃ§Ãµes:</strong> Boas avaliaÃ§Ãµes sÃ£o seu melhor marketing na plataforma.</li>
        </ol>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Comece Agora â€” Ã‰ GrÃ¡tis!</h3>
          <p className="text-muted-foreground mb-4">NÃ£o perca mais tempo esperando clientes. Cadastre-se no Preciso de Um e seja encontrado por quem precisa do seu serviÃ§o.</p>
          <a href="https://precisodeum.com.br/cadastro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
            Criar meu perfil grÃ¡tis â†’
          </a>
        </div>
      </>
    ),
  },

  "preciso-de-um-todos-os-ramos": {
    title: "Preciso de Um Aceita Todos os Ramos: Eletricista, Pintor, Diarista e Muito Mais",
    excerpt: "De construÃ§Ã£o civil a eventos, veja como profissionais de qualquer Ã¡rea podem participar e lucrar.",
    date: "2026-04-08",
    readTime: "7 min",
    category: "Plataformas",
    content: (
      <>
        <p className="lead">Uma dÃºvida comum entre prestadores de serviÃ§o Ã©: <strong>"Minha Ã¡rea de atuaÃ§Ã£o Ã© aceita na plataforma?"</strong>. A resposta Ã© simples: <strong>sim</strong>. O <a href="https://precisodeum.com.br" target="_blank" rel="noopener noreferrer" className="text-accent">Preciso de Um</a> foi criado para abranger todos os ramos profissionais.</p>

        <h2>Categorias DisponÃ­veis na Plataforma</h2>
        <p>Atualmente, o Preciso de Um jÃ¡ possui profissionais cadastrados em dezenas de categorias. Veja algumas:</p>

        <h3>ðŸ  ServiÃ§os Residenciais</h3>
        <ul>
          <li><strong>Eletricista:</strong> InstalaÃ§Ãµes elÃ©tricas, troca de fiaÃ§Ã£o, disjuntores</li>
          <li><strong>Encanador:</strong> Vazamentos, desentupimento, instalaÃ§Ã£o hidrÃ¡ulica</li>
          <li><strong>Pintor:</strong> Pintura residencial e comercial</li>
          <li><strong>Marido de Aluguel:</strong> Pequenos reparos, montagem de mÃ³veis</li>
          <li><strong>Diarista:</strong> Limpeza residencial e comercial</li>
          <li><strong>Ar-condicionado:</strong> InstalaÃ§Ã£o, limpeza e manutenÃ§Ã£o</li>
        </ul>

        <h3>ðŸ—ï¸ ConstruÃ§Ã£o e Reformas</h3>
        <ul>
          <li><strong>ConstruÃ§Ã£o Civil:</strong> Pedreiros, mestres de obras, reformas</li>
          <li><strong>Serralheiro:</strong> PortÃµes, grades, estruturas metÃ¡licas</li>
          <li><strong>Drywall:</strong> DivisÃ³rias, forros, acabamentos</li>
          <li><strong>Montagem de MÃ³veis:</strong> Planejados e modulados</li>
        </ul>

        <h3>ðŸ’» Tecnologia</h3>
        <ul>
          <li><strong>TÃ©cnico em InformÃ¡tica:</strong> ManutenÃ§Ã£o de PCs, notebooks, redes</li>
          <li><strong>Suporte TÃ©cnico:</strong> ConfiguraÃ§Ã£o, instalaÃ§Ã£o de software</li>
          <li><strong>Social Media:</strong> GestÃ£o de redes sociais, marketing digital</li>
        </ul>

        <h3>ðŸŽ‰ Outros</h3>
        <ul>
          <li><strong>Eventos:</strong> DecoraÃ§Ã£o, buffet, animaÃ§Ã£o</li>
          <li><strong>Fretista:</strong> MudanÃ§as e transporte</li>
          <li><strong>ProduÃ§Ã£o Musical:</strong> GravaÃ§Ã£o, mixagem, masterizaÃ§Ã£o</li>
        </ul>

        <h2>NÃ£o Encontrou Sua Categoria?</h2>
        <p>Novas categorias sÃ£o adicionadas constantemente. Se a sua Ã¡rea ainda nÃ£o aparece na lista, basta se cadastrar e solicitar a inclusÃ£o. A plataforma estÃ¡ em constante expansÃ£o para atender todos os tipos de profissionais.</p>

        <h2>Por Que a Diversidade Importa?</h2>
        <p>Quanto mais categorias a plataforma oferece, mais clientes ela atrai. E quanto mais clientes buscam serviÃ§os, <strong>mais oportunidades surgem para todos os profissionais cadastrados</strong>. Ã‰ um ciclo virtuoso onde todos ganham.</p>

        <h2>Exemplos Reais de Profissionais na Plataforma</h2>
        <ul>
          <li><strong>Eletricistas em Curitiba e AraucÃ¡ria</strong> com 6 a 20+ anos de experiÃªncia</li>
          <li><strong>Pintores em Curitiba</strong> com 21+ anos de experiÃªncia</li>
          <li><strong>Construtores em Fazenda Rio Grande</strong> com 10+ anos no mercado</li>
          <li><strong>Serralheiros em AraucÃ¡ria</strong> com 31+ anos de experiÃªncia</li>
          <li><strong>Diaristas, fretistas, profissionais de eventos</strong> e muito mais</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Seu Ramo TambÃ©m Tem EspaÃ§o!</h3>
          <p className="text-muted-foreground mb-4">NÃ£o importa qual seja seu serviÃ§o â€” o Preciso de Um Ã© para vocÃª. Cadastre-se gratuitamente e amplie seus clientes.</p>
          <a href="https://precisodeum.com.br/cadastro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
            Cadastrar meu serviÃ§o â†’
          </a>
        </div>
      </>
    ),
  },

  "preciso-de-um-vagas-oportunidades": {
    title: "Vagas e Oportunidades no Preciso de Um: Como Encontrar Trabalho RÃ¡pido",
    excerpt: "A plataforma tambÃ©m oferece vagas de emprego e oportunidades de serviÃ§o. Veja como aproveitar.",
    date: "2026-04-08",
    readTime: "5 min",
    category: "Plataformas",
    content: (
      <>
        <p className="lead">AlÃ©m de conectar prestadores a clientes, o <a href="https://precisodeum.com.br" target="_blank" rel="noopener noreferrer" className="text-accent">Preciso de Um</a> tambÃ©m funciona como um <strong>painel de vagas e oportunidades de serviÃ§o</strong>. Empresas e particulares podem publicar vagas gratuitamente, e profissionais podem se candidatar com um clique.</p>

        <h2>Como Funciona o Painel de Vagas?</h2>
        <p>O Preciso de Um possui uma seÃ§Ã£o dedicada a vagas, onde empregadores publicam oportunidades e profissionais podem encontrÃ¡-las filtradas por:</p>
        <ul>
          <li><strong>Tipo:</strong> ServiÃ§o avulso, emprego presencial, freelance</li>
          <li><strong>LocalizaÃ§Ã£o:</strong> Cidade e bairro</li>
          <li><strong>Categoria:</strong> Ãrea profissional</li>
          <li><strong>UrgÃªncia:</strong> Vagas recentes com destaque</li>
        </ul>

        <h2>Exemplos de Vagas Publicadas</h2>
        <p>Veja alguns exemplos reais de vagas disponÃ­veis na plataforma:</p>
        <ul>
          <li>ðŸ“Œ <strong>Assistente Administrativo</strong> â€” Curitiba</li>
          <li>ðŸ“Œ <strong>Operador de Empilhadeira</strong> â€” Curitiba, Bairro Xaxim</li>
          <li>ðŸ“Œ <strong>Representante Comercial</strong> â€” Toledo/PR</li>
        </ul>
        <p>As vagas sÃ£o atualizadas diariamente e os profissionais recebem notificaÃ§Ãµes de novas oportunidades na sua Ã¡rea.</p>

        <h2>Como Publicar Uma Vaga</h2>
        <p>Se vocÃª Ã© empresÃ¡rio ou precisa contratar alguÃ©m rapidamente:</p>
        <ol>
          <li>Acesse <a href="https://precisodeum.com.br/dashboard/vagas" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold">precisodeum.com.br/dashboard/vagas</a></li>
          <li>Descreva a vaga (cargo, requisitos, localizaÃ§Ã£o)</li>
          <li>Publique gratuitamente</li>
          <li>Receba candidatos diretamente no WhatsApp</li>
        </ol>

        <h2>Vantagens Para Quem Busca Trabalho</h2>
        <ul>
          <li>âœ… Vagas verificadas e atualizadas</li>
          <li>âœ… Contato direto com o contratante</li>
          <li>âœ… Sem intermediÃ¡rios ou taxas</li>
          <li>âœ… Vagas de serviÃ§o avulso e emprego formal</li>
          <li>âœ… Filtros por regiÃ£o para encontrar oportunidades perto de vocÃª</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Encontre Vagas Agora</h3>
          <p className="text-muted-foreground mb-4">Acesse o painel de vagas do Preciso de Um e encontre oportunidades na sua regiÃ£o.</p>
          <a href="https://precisodeum.com.br/vagas" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
            Ver vagas disponÃ­veis â†’
          </a>
        </div>
      </>
    ),
  },

  "por-que-todo-prestador-deve-estar-preciso-de-um": {
    title: "Por Que Todo Prestador de ServiÃ§o Deve Estar no Preciso de Um",
    excerpt: "Visibilidade, credibilidade e clientes: os motivos para todo profissional se cadastrar agora.",
    date: "2026-04-07",
    readTime: "9 min",
    category: "Plataformas",
    content: (
      <>
        <p className="lead">O mercado de prestaÃ§Ã£o de serviÃ§os Ã© competitivo. <strong>Depender apenas de indicaÃ§Ã£o boca a boca nÃ£o Ã© mais suficiente.</strong> Profissionais que investem em presenÃ§a digital conseguem mais clientes, cobram melhor e crescem mais rÃ¡pido. O <a href="https://precisodeum.com.br" target="_blank" rel="noopener noreferrer" className="text-accent">Preciso de Um</a> Ã© a ferramenta ideal para essa transformaÃ§Ã£o.</p>

        <h2>1. Visibilidade Imediata</h2>
        <p>Ao se cadastrar, seu perfil aparece nas buscas da plataforma. Clientes que precisam exatamente do seu serviÃ§o na sua regiÃ£o <strong>vÃ£o te encontrar</strong>. Sem precisar gastar com anÃºncios ou ter um site prÃ³prio.</p>

        <h2>2. Credibilidade Profissional</h2>
        <p>Ter um perfil verificado em uma plataforma com parceiros como <strong>Balaroti, Philips e Leroy Merlin</strong> transmite confianÃ§a. Clientes preferem contratar profissionais que estÃ£o em plataformas organizadas â€” parece mais seguro do que um anÃºncio aleatÃ³rio no Facebook.</p>

        <h2>3. Zero Custo Para ComeÃ§ar</h2>
        <p>Diferente de outras plataformas que cobram mensalidade ou comissÃ£o, o <strong>Preciso de Um permite cadastro gratuito</strong>. VocÃª cria seu perfil, adiciona seus serviÃ§os e comeÃ§a a receber contatos sem pagar nada.</p>

        <h2>4. Contato Direto Via WhatsApp</h2>
        <p>O cliente fala diretamente com vocÃª pelo WhatsApp. <strong>Sem intermediÃ¡rios, sem chat da plataforma, sem espera.</strong> Isso agiliza o fechamento e permite um atendimento personalizado.</p>

        <h2>5. Vagas e Oportunidades Extra</h2>
        <p>AlÃ©m dos clientes que buscam serviÃ§os, a plataforma tem um <strong>painel de vagas</strong> onde empresas e particulares publicam oportunidades. Ã‰ uma fonte adicional de trabalho para quem estÃ¡ cadastrado.</p>

        <h2>6. App DisponÃ­vel (PWA)</h2>
        <p>O Preciso de Um pode ser instalado no celular como um app â€” sem ocupar espaÃ§o. Assim vocÃª recebe notificaÃ§Ãµes e acessa seu perfil de qualquer lugar, com avaliaÃ§Ã£o de <strong>4.8 estrelas</strong>.</p>

        <h2>7. Presente em Diversas Cidades</h2>
        <p>A plataforma jÃ¡ atende profissionais em Curitiba, SÃ£o JosÃ© dos Pinhais, AraucÃ¡ria, Pinhais, Campo Largo, Fazenda Rio Grande, SÃ£o Paulo, Rio de Janeiro, BelÃ©m e outras cidades. <strong>E estÃ¡ em constante expansÃ£o.</strong></p>

        <h2>O Que VocÃª Perde ao NÃƒO Estar na Plataforma?</h2>
        <ul>
          <li>âŒ Clientes que estÃ£o buscando exatamente o seu serviÃ§o â€” e encontrando o concorrente</li>
          <li>âŒ Oportunidade de construir reputaÃ§Ã£o online com avaliaÃ§Ãµes</li>
          <li>âŒ Vagas de serviÃ§o publicadas na sua regiÃ£o</li>
          <li>âŒ PresenÃ§a digital sem investimento</li>
        </ul>

        <h2>NÃ£o Importa Seu Ramo</h2>
        <p>Eletricista, pintor, pedreiro, tÃ©cnico em informÃ¡tica, diarista, fretista, profissional de eventos, social media, serralheiro, montador de mÃ³veis, instalador de ar-condicionado â€” <strong>a plataforma Ã© para todos</strong>.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">NÃ£o Fique de Fora</h3>
          <p className="text-muted-foreground mb-4">Enquanto vocÃª nÃ£o estÃ¡ na plataforma, seus concorrentes estÃ£o recebendo os clientes que poderiam ser seus. Cadastre-se agora â€” Ã© grÃ¡tis e leva 5 minutos.</p>
          <a href="https://precisodeum.com.br/cadastro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
            Quero me cadastrar â†’
          </a>
        </div>

        <p><strong>Leia tambÃ©m:</strong></p>
        <ul>
          <li><Link to="/blog/preciso-de-um-plataforma-prestadores" className="text-accent">O que Ã© o Preciso de Um?</Link></li>
          <li><Link to="/blog/como-cadastrar-preciso-de-um" className="text-accent">Como se cadastrar passo a passo</Link></li>
          <li><Link to="/blog/preciso-de-um-todos-os-ramos" className="text-accent">Quais ramos sÃ£o aceitos?</Link></li>
          <li><Link to="/blog/preciso-de-um-vagas-oportunidades" className="text-accent">Vagas e oportunidades na plataforma</Link></li>
          <li><Link to="/seja-parceiro" className="text-accent">Seja parceiro da O TÃ©cnico de InformÃ¡tica</Link></li>
        </ul>
      </>
    ),
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // ARTIGOS â€” PROCEDIMENTOS TÃ‰CNICOS
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  "como-trocar-pasta-termica-notebook": {
    title: "Como trocar pasta tÃ©rmica do notebook com seguranÃ§a: passo a passo",
    excerpt:
      "Como trocar pasta tÃ©rmica do notebook: quando a troca faz sentido, como seguir o procedimento do fabricante e quais sinais exigem parar antes de abrir.",
    date: "2026-08-12",
    readTime: "13 min",
    category: "ManutenÃ§Ã£o",
    content: (
      <>
        <p className="lead">Trocar pasta tÃ©rmica do notebook sÃ³ faz sentido depois de separar interface tÃ©rmica de outras causas de aquecimento. Confirme fluxo de ar, ventoinha e comportamento sob a mesma carga; consulte o manual de serviÃ§o do modelo antes de abrir; desligue o equipamento e isole a bateria conforme o procedimento do fabricante. A pasta melhora o contato tÃ©rmico entre chip e dissipador, mas nÃ£o corrige ventoinha defeituosa, heatpipe danificado, montagem incorreta ou radiador obstruÃ­do.</p>

        <aside className="rounded-lg border border-border bg-muted/40 p-4 not-prose my-6">
          <p className="m-0 text-sm"><strong>CritÃ©rio de seguranÃ§a:</strong> nÃ£o abra o equipamento se houver bateria inchada, cheiro de queimado, fumaÃ§a, lÃ­quido recente ou ausÃªncia de procedimento confiÃ¡vel para o modelo. Nesses cenÃ¡rios, a prioridade deixa de ser temperatura e passa a ser seguranÃ§a e preservaÃ§Ã£o do equipamento.</p>
        </aside>

        <h2>Como trocar pasta tÃ©rmica: sequÃªncia segura</h2>
        <ol>
          <li><strong>Identifique o modelo exato</strong> e consulte o manual de serviÃ§o ou procedimento do fabricante. A ordem de desmontagem e o acesso Ã  bateria variam entre notebooks.</li>
          <li><strong>Desligue totalmente e retire o carregador.</strong> Depois de abrir, isole a bateria interna somente pelo mÃ©todo previsto para o equipamento.</li>
          <li><strong>Registre parafusos, cabos e pads tÃ©rmicos</strong> antes de remover o conjunto. Espessura e posiÃ§Ã£o dos pads fazem parte do projeto tÃ©rmico.</li>
          <li><strong>Solte o dissipador gradualmente</strong>, respeitando marcaÃ§Ãµes ou sequÃªncia do fabricante quando existirem; nÃ£o invente uma ordem universal.</li>
          <li><strong>Limpe e reaplique o material tÃ©rmico</strong> conforme a orientaÃ§Ã£o do fabricante do equipamento ou do composto. NÃ£o misture pasta com pads nem improvise espessuras.</li>
          <li><strong>Remonte e compare a mesma carga</strong> observando temperatura, frequÃªncia, ventoinha e estabilidade. A melhora precisa aparecer no comportamento, nÃ£o sÃ³ na sensaÃ§Ã£o ao tocar a carcaÃ§a.</li>
        </ol>

        <h2>O que a troca resolve â€” e o que nÃ£o resolve</h2>
        <p>O material de interface tÃ©rmica preenche irregularidades microscÃ³picas entre as superfÃ­cies de contato e ajuda a transferir calor para o dissipador. A troca Ã© uma hipÃ³tese de manutenÃ§Ã£o quando o conjunto foi removido, quando o fabricante determina reaplicaÃ§Ã£o ou quando hÃ¡ evidÃªncia de contato tÃ©rmico inadequado.</p>
        <p>Ela nÃ£o substitui diagnÃ³stico de radiador obstruÃ­do, ventoinha com falha, dissipador mal assentado, heatpipe danificado ou carga anormal de software. Antes de abrir, compare tambÃ©m <Link to="/problemas/computador-esquentando">computador esquentando: causas e testes seguros</Link> e a orientaÃ§Ã£o de <Link to="/blog/como-limpar-notebook-por-dentro">limpeza interna de notebook</Link>.</p>

        <h2>Sinais que justificam investigar a interface tÃ©rmica</h2>
        <ul>
          <li>O equipamento apresenta <Link to="/glossario/thermal-throttling">thermal throttling</Link> repetÃ­vel sob a mesma carga, mesmo depois de confirmar entradas, saÃ­das de ar e ventoinha.</li>
          <li>O dissipador foi removido anteriormente ou hÃ¡ suspeita de assentamento inadequado.</li>
          <li>A ventoinha responde Ã  carga e existe fluxo de ar, mas a transferÃªncia de calor continua inconsistente quando comparada ao comportamento esperado para o modelo.</li>
          <li>O manual de serviÃ§o prevÃª inspeÃ§Ã£o ou reaplicaÃ§Ã£o do material ao remover o conjunto tÃ©rmico.</li>
        </ul>
        <p>Nenhum desses sinais, isoladamente, prova que a pasta Ã© a causa. Fluxo de ar fraco, ruÃ­do mecÃ¢nico, desligamento sÃºbito ou bateria deformada mudam o roteiro de diagnÃ³stico.</p>

        <h2>PreparaÃ§Ã£o: onde a maioria dos danos acontece</h2>
        <p>Antes de qualquer ferramenta encostar no equipamento:</p>
        <ul>
          <li>Desligue por completo â€” desligar nÃ£o Ã© suspender nem fechar a tampa.</li>
          <li>Retire o carregador. Em modelos com bateria interna, desconecte o conector da bateria assim que a tampa sair, antes de mexer em qualquer outra coisa.</li>
          <li>Descarregue a estÃ¡tica do corpo tocando uma superfÃ­cie metÃ¡lica aterrada, ou use pulseira antiestÃ¡tica.</li>
          <li>Registre a posiÃ§Ã£o dos parafusos. Comprimentos diferentes em posiÃ§Ãµes diferentes sÃ£o regra; trocar dois de lugar pode perfurar a placa.</li>
          <li>Use ferramenta plÃ¡stica para as travas da carcaÃ§a. Chave metÃ¡lica quebra presilha que costuma nÃ£o ter reposiÃ§Ã£o avulsa.</li>
        </ul>

        <h2>RemoÃ§Ã£o do dissipador</h2>
        <p>Alguns conjuntos trazem parafusos numerados ou instruÃ§Ãµes de aperto e soltura; outros dependem do manual de serviÃ§o. O objetivo Ã© retirar e reassentar o conjunto sem concentrar esforÃ§o nem danificar conectores, pads ou a placa.</p>
        <ol>
          <li>Quando houver sequÃªncia indicada no dissipador ou no manual, siga-a e solte os pontos gradualmente. Sem indicaÃ§Ã£o, nÃ£o presuma que a ordem de outro modelo serve para o seu.</li>
          <li>Desconecte a ventoinha pelo corpo do conector, sem tracionar a fiaÃ§Ã£o.</li>
          <li>Se o conjunto estiver aderido, nÃ£o force com ferramenta metÃ¡lica nem faÃ§a alavanca sobre a placa. Consulte o procedimento do fabricante antes de continuar.</li>
        </ol>

        <h2>Limpeza das superfÃ­cies</h2>
        <p>O composto antigo precisa sair por inteiro, tanto do chip quanto da base do dissipador. ResÃ­duo endurecido misturado com pasta nova mantÃ©m o problema. Use Ã¡lcool isopropÃ­lico de alta concentraÃ§Ã£o e material que nÃ£o solte fibras; Ã¡lcool comum contÃ©m Ã¡gua e deixa resÃ­duo. Trabalhe atÃ© a superfÃ­cie ficar espelhada e seca, sem lÃ­quido escorrendo para as trilhas ao redor.</p>
        <p>Se houver almofada tÃ©rmica sobre chips vizinhos â€” memÃ³ria de vÃ­deo ou controlador â€”, ela nÃ£o Ã© substituÃ­da por pasta. Ã‰ outro material, com espessura prÃ³pria; comprimir a peÃ§a sem essa almofada cria folga e piora o resfriamento daquele componente.</p>

        <h2>AplicaÃ§Ã£o do composto</h2>
        <p>NÃ£o existe um desenho ou volume universal de pasta para todo notebook. Processador, dissipador, material tÃ©rmico original e orientaÃ§Ã£o do fabricante mudam o procedimento. Use a quantidade e o mÃ©todo previstos pelo fabricante do equipamento ou do TIM e evite adicionar material sobre uma camada prÃ©-aplicada.</p>
        <ul>
          <li>NÃ£o use o dedo nem objetos contaminados para espalhar material tÃ©rmico.</li>
          <li>NÃ£o substitua pad tÃ©rmico por pasta: o pad tambÃ©m compensa distÃ¢ncia fÃ­sica e sua espessura faz parte da montagem.</li>
          <li>Materiais eletricamente condutivos e metal lÃ­quido exigem controle de compatibilidade e isolamento; nÃ£o devem ser improvisados em equipamento que nÃ£o foi projetado para eles.</li>
          <li>Se a superfÃ­cie, o pad ou o mÃ©todo de aplicaÃ§Ã£o do modelo nÃ£o estiverem claros, pare e consulte a documentaÃ§Ã£o tÃ©cnica antes de energizar.</li>
        </ul>
        <p>A Intel tambÃ©m orienta que material prÃ©-aplicado nÃ£o receba uma camada extra e que a reaplicaÃ§Ã£o seja feita quando o conjunto tÃ©rmico Ã© reinstalado, respeitando o procedimento correspondente ao hardware.</p>

        <h2>Remontagem e verificaÃ§Ã£o</h2>
        <ol>
          <li>Posicione o dissipador de uma vez, sem arrastar sobre o chip â€” arrastar espalha a pasta para fora da Ã¡rea Ãºtil.</li>
          <li>Aperte os parafusos na ordem numerada, em passes leves e alternados, atÃ© a pressÃ£o ficar uniforme. Nada de apertar um atÃ© o fim antes dos demais.</li>
          <li>Reconecte a ventoinha e confira o encaixe do conector.</li>
          <li>Feche a carcaÃ§a sÃ³ depois de conferir que nenhum cabo ficou preso entre a tampa e a placa.</li>
          <li>Ligue e acompanhe o comportamento sob carga real por alguns minutos, comparando com o que acontecia antes.</li>
        </ol>
        <p>Sem essa comparaÃ§Ã£o nÃ£o hÃ¡ como afirmar que a troca funcionou. Se o comportamento tÃ©rmico continuar anormal, volte ao diagnÃ³stico: montagem, dissipador, ventoinha, firmware, carga e limites especÃ­ficos do processador ainda precisam ser considerados.</p>

        <h2>CritÃ©rios de parada</h2>
        <table>
          <thead>
            <tr><th>Sinal</th><th>O que significa para o procedimento</th><th>DecisÃ£o</th></tr>
          </thead>
          <tbody>
            <tr><td>Bateria inchada, cheiro, fumaÃ§a ou lÃ­quido</td><td>HÃ¡ risco alÃ©m da interface tÃ©rmica</td><td>NÃ£o abrir para â€œtrocar pastaâ€; priorizar seguranÃ§a</td></tr>
            <tr><td>Pad rasgado, deslocado ou sem espessura identificada</td><td>A montagem tÃ©rmica nÃ£o pode ser recomposta por tentativa</td><td>Parar e identificar a peÃ§a correta</td></tr>
            <tr><td>Sem manual e desmontagem exige placa, tela ou muitos flats</td><td>Risco de dano supera o benefÃ­cio do teste caseiro</td><td>Encaminhar para bancada</td></tr>
            <tr><td>Temperatura alta sem throttling ou instabilidade</td><td>O nÃºmero isolado nÃ£o prova defeito</td><td>Comparar com limite do processador/OEM antes de intervir</td></tr>
          </tbody>
        </table>

        <h2>Erros que custam caro</h2>
        <ul>
          <li>Abrir sem desconectar a bateria interna e provocar curto com a ferramenta.</li>
          <li>Soltar os parafusos do dissipador em ordem aleatÃ³ria e empenar a base.</li>
          <li>Usar quantidade excessiva de composto, especialmente do tipo condutivo.</li>
          <li>Limpar com Ã¡lcool diluÃ­do e deixar umidade sobre a placa.</li>
          <li>Esquecer de reconectar a ventoinha â€” a mÃ¡quina liga, aquece e desliga sozinha em poucos minutos.</li>
          <li>Aquecer a regiÃ£o com secador para soltar o dissipador, deformando peÃ§as plÃ¡sticas prÃ³ximas.</li>
        </ul>
        <p>Em equipamentos dentro da garantia de fÃ¡brica, confira as condiÃ§Ãµes do fabricante antes de abrir: a abertura por terceiro pode afetar a cobertura.</p>

        <h2>Fontes primÃ¡rias para conferir o procedimento</h2>
        <ul>
          <li><a href="https://www.intel.com/content/www/us/en/support/articles/000005576/processors.html" target="_blank" rel="noreferrer" className="text-accent">Intel Support â€” aplicaÃ§Ã£o e remoÃ§Ã£o de Thermal Interface Material (TIM)</a>: mostra que a orientaÃ§Ã£o depende da soluÃ§Ã£o tÃ©rmica e que material prÃ©-aplicado nÃ£o deve receber pasta adicional.</li>
          <li><a href="https://www.intel.com/content/www/us/en/support/articles/000088048/processors.html" target="_blank" rel="noreferrer" className="text-accent">Intel Support â€” throttling e soluÃ§Ã£o de refrigeraÃ§Ã£o</a>: referÃªncia para separar limite tÃ©rmico de simples sensaÃ§Ã£o de calor.</li>
        </ul>

        <h2>Quando nÃ£o fazer sozinho</h2>
        <p>Modelos em que o dissipador sÃ³ Ã© alcanÃ§ado apÃ³s remover teclado, placa e cabos de tela concentram risco maior do que ganho. O mesmo vale para mÃ¡quinas com bateria inchada, lÃ­quido derramado, cheiro de queimado ou desligamento imediato ao ligar â€” nesses casos o aquecimento Ã© sintoma, nÃ£o o problema principal.</p>
        <p>O critÃ©rio de verificaÃ§Ã£o e cobranÃ§a estÃ¡ em <Link to="/diagnostico-tecnico">como funciona o diagnÃ³stico tÃ©cnico</Link>. O procedimento completo de refrigeraÃ§Ã£o faz parte da <Link to="/servicos/manutencao-de-notebook">manutenÃ§Ã£o de notebook</Link>, e quando o equipamento nÃ£o pode sair do lugar existe o <Link to="/atendimento-domicilio">atendimento no endereÃ§o</Link>. Se o quadro for de calor recorrente, comece por <Link to="/blog/notebook-superaquecendo-o-que-fazer">notebook superaquecendo: o que fazer</Link>.</p>

        <h2>Resumo prÃ¡tico</h2>
        <p>NÃ£o troque pasta tÃ©rmica por calendÃ¡rio nem por um nÃºmero isolado de temperatura. Primeiro confirme o comportamento tÃ©rmico, consulte o procedimento do modelo e elimine obstruÃ§Ã£o e falha de ventoinha. Se o dissipador precisar ser removido, preserve pads, siga a sequÃªncia do fabricante, reaplique o TIM pelo mÃ©todo indicado e compare a mesma carga depois da montagem. Se surgir sinal elÃ©trico, bateria deformada ou dÃºvida sobre a desmontagem, pare.</p>
      </>
    ),
  },

  "como-clonar-hd-para-ssd": {
    title: "Clonar HD para SSD: quando clonar, quando reinstalar e onde o processo falha",
    excerpt:
      "A diferenÃ§a real entre clonar e reinstalar, como saber se o disco de origem aguenta a clonagem, os pontos em que o processo trava e o que conferir antes de apagar o disco antigo.",
    date: "2026-08-12",
    readTime: "11 min",
    category: "ManutenÃ§Ã£o",
    content: (
      <>
        <p className="lead">Clonar copia o disco inteiro para outro: sistema, programas, arquivos e configuraÃ§Ãµes. A mÃ¡quina volta igual, sÃ³ que em um disco mais rÃ¡pido. Ã‰ prÃ¡tico â€” mas nem sempre Ã© a melhor decisÃ£o, e hÃ¡ pontos em que a clonagem falha de forma previsÃ­vel.</p>

        <h2>Clonar ou reinstalar</h2>
        <p>Clonar preserva tudo, inclusive o que estava errado. Reinstalar limpa tudo, inclusive o que estava certo. A escolha depende do estado atual do sistema.</p>
        <ul>
          <li><strong>Clonagem faz sentido</strong> quando o sistema estÃ¡ saudÃ¡vel, com programas licenciados difÃ­ceis de reinstalar e configuraÃ§Ãµes que levariam horas para refazer.</li>
          <li><strong>ReinstalaÃ§Ã£o faz sentido</strong> quando hÃ¡ travamentos, erros recorrentes, infecÃ§Ã£o recente ou histÃ³rico longo de instalaÃ§Ãµes e desinstalaÃ§Ãµes. Clonar um sistema problemÃ¡tico apenas leva o problema para o disco novo, mais rÃ¡pido.</li>
        </ul>

        <h2>Antes de comeÃ§ar: a origem aguenta?</h2>
        <p>Clonagem lÃª o disco inteiro de ponta a ponta â€” Ã© a leitura mais exigente que um disco recebe. Se o HD jÃ¡ apresenta setores defeituosos, ruÃ­do mecÃ¢nico ou travamentos, esse esforÃ§o pode ser o empurrÃ£o final.</p>
        <p>Nesse cenÃ¡rio, a ordem correta se inverte: primeiro copia-se os arquivos pessoais para outro lugar, depois se avalia a clonagem. Disco com sinal de falha fÃ­sica nÃ£o Ã© caso de clonagem domÃ©stica; Ã© caso de recuperaÃ§Ã£o, tratado em <Link to="/blog/como-recuperar-dados-hd-com-defeito">recuperaÃ§Ã£o de dados em HD com defeito</Link>.</p>
        <p>Existe ainda o requisito de espaÃ§o: o que importa nÃ£o Ã© a capacidade do disco antigo, e sim o volume realmente ocupado. Um HD de 1 TB com 180 GB usados cabe em um SSD de 240 GB, desde que a ferramenta consiga redimensionar as partiÃ§Ãµes.</p>

        <h2>PreparaÃ§Ã£o que evita retrabalho</h2>
        <ol>
          <li><strong>Backup separado dos arquivos que nÃ£o podem sumir.</strong> Clonagem nÃ£o Ã© backup: se algo der errado no meio, vocÃª precisa de uma cÃ³pia independente.</li>
          <li><strong>Liberar espaÃ§o antes.</strong> Arquivos temporÃ¡rios e downloads antigos ocupam tempo de cÃ³pia sem servir para nada.</li>
          <li><strong>Conferir como o disco serÃ¡ conectado.</strong> Em desktop, sobra porta interna. Em notebook, quase sempre Ã© preciso um adaptador USB para conectar o disco novo durante o processo.</li>
          <li><strong>AlimentaÃ§Ã£o estÃ¡vel.</strong> Queda de energia no meio da cÃ³pia deixa o destino inconsistente. Em notebook, com carregador ligado.</li>
        </ol>

        <h2>Onde o processo costuma falhar</h2>
        <ul>
          <li><strong>Erro de leitura na origem.</strong> A ferramenta para em determinada porcentagem e nÃ£o avanÃ§a: sÃ£o setores ilegÃ­veis. Insistir castiga o disco.</li>
          <li><strong>PartiÃ§Ã£o de inicializaÃ§Ã£o ausente.</strong> Copiar apenas a partiÃ§Ã£o visÃ­vel do sistema deixa de fora a partiÃ§Ã£o de boot, e o computador nÃ£o inicia. A cÃ³pia precisa incluir todas as partiÃ§Ãµes do disco, nÃ£o sÃ³ a maior.</li>
          <li><strong>Destino menor que o ocupado.</strong> A cÃ³pia nem comeÃ§a, ou comeÃ§a e para no fim.</li>
          <li><strong>Disco antigo ainda conectado no primeiro boot.</strong> Dois discos com o mesmo identificador de sistema geram confusÃ£o de inicializaÃ§Ã£o. O primeiro boot deve ser feito sÃ³ com o disco novo.</li>
          <li><strong>Modo de inicializaÃ§Ã£o divergente.</strong> Se o firmware estÃ¡ configurado de um jeito e o disco clonado espera outro, a mÃ¡quina nÃ£o encontra sistema â€” e o sintoma engana, parecendo clonagem malfeita.</li>
        </ul>

        <h2>Depois da clonagem</h2>
        <ol>
          <li>Inicie apenas com o disco novo instalado e confirme que o sistema sobe normalmente.</li>
          <li>Confira se os arquivos pessoais estÃ£o todos lÃ¡ â€” pastas de documentos, imagens e Ã¡rea de trabalho.</li>
          <li>Verifique se o espaÃ§o total do novo disco aparece disponÃ­vel. Sobra nÃ£o alocada significa que a partiÃ§Ã£o nÃ£o foi expandida e precisa ser ajustada.</li>
          <li>Use a mÃ¡quina alguns dias antes de apagar o disco antigo. Ele Ã© a sua rede de seguranÃ§a nesse intervalo.</li>
        </ol>
        <p>SÃ³ depois desse perÃ­odo faz sentido reaproveitar o disco antigo como armazenamento secundÃ¡rio â€” procedimento descrito em <Link to="/blog/como-instalar-segundo-ssd-notebook">segundo SSD no notebook</Link>.</p>

        <h2>O que a troca de disco resolve â€” e o que nÃ£o resolve</h2>
        <p>Sair de HD mecÃ¢nico para SSD muda a percepÃ§Ã£o de velocidade de forma clara: o sistema inicia mais rÃ¡pido, programas abrem quase imediatamente e a mÃ¡quina para de travar durante tarefas simples. Esse ganho Ã© real e nÃ£o depende de configuraÃ§Ã£o.</p>
        <p>O que nÃ£o muda: pouca memÃ³ria continua limitando quem trabalha com muitas abas e programas simultÃ¢neos; processador antigo continua sendo o limite em tarefas pesadas; e sistema cheio de programas iniciando junto continua demorando a ficar utilizÃ¡vel. Esses fatores estÃ£o separados em <Link to="/blog/computador-lento-causas-solucoes">computador lento: causas e como decidir</Link>.</p>

        <h2>Quando levar para a bancada</h2>
        <p>Faz sentido buscar atendimento quando o disco de origem faz ruÃ­do, quando a clonagem trava sempre no mesmo ponto, quando a mÃ¡quina nÃ£o inicia depois da cÃ³pia ou quando os dados envolvidos nÃ£o tÃªm backup nenhum. Nesses casos, cada tentativa adicional por conta prÃ³pria reduz a chance de recuperar o que ainda estÃ¡ lÃ¡.</p>
        <p>O critÃ©rio de verificaÃ§Ã£o e cobranÃ§a estÃ¡ em <Link to="/diagnostico-tecnico">como funciona o diagnÃ³stico tÃ©cnico</Link>, e a migraÃ§Ã£o completa faz parte do <Link to="/servicos/upgrade-ssd-ram">upgrade de SSD e memÃ³ria</Link>.</p>

        <h2>Resumo prÃ¡tico</h2>
        <p>Clone quando o sistema estÃ¡ saudÃ¡vel e reinstale quando nÃ£o estÃ¡. Confira a saÃºde do disco de origem antes, tenha backup independente dos arquivos essenciais, copie o disco inteiro e nÃ£o apenas a partiÃ§Ã£o visÃ­vel, inicie com um disco sÃ³ e mantenha o antigo intacto por alguns dias antes de apagar qualquer coisa.</p>
      </>
    ),
  },
  "como-testar-fonte-de-alimentacao-pc": {
    title: "Testar a fonte do PC: o que o teste prova, o que ele nÃ£o prova e quando trocar",
    excerpt:
      "Como separar defeito de fonte de defeito de placa antes de comprar peÃ§a: o que cada teste mede, por que fonte que liga pode estar ruim e quais sinais fecham a decisÃ£o de troca.",
    date: "2026-08-12",
    readTime: "10 min",
    category: "Procedimentos TÃ©cnicos",
    content: (
      <>
        <p className="lead">A fonte Ã© o componente que mais leva a culpa e o que menos Ã© testado direito. Ela alimenta tudo, entÃ£o qualquer falha estranha parece "problema de fonte". O objetivo aqui nÃ£o Ã© decorar valores: Ã© entender o que cada teste realmente prova, para nÃ£o trocar peÃ§a boa nem insistir em peÃ§a ruim.</p>

        <h2>Por que a fonte engana o diagnÃ³stico</h2>
        <p>Uma fonte nÃ£o falha sÃ³ de um jeito. Ela pode nÃ£o ligar, pode ligar e entregar tensÃ£o fora de faixa, pode entregar tensÃ£o certa em repouso e afundar quando o processador e a placa de vÃ­deo puxam corrente ao mesmo tempo, ou pode entregar tensÃ£o mÃ©dia correta com ruÃ­do elÃ©trico alto o suficiente para reiniciar o sistema. SÃ³ o primeiro caso Ã© Ã³bvio.</p>
        <p>Por isso o padrÃ£o de sintomas importa mais do que qualquer leitura isolada. Falha que aparece sÃ³ sob carga, sÃ³ depois de aquecer, ou sÃ³ ao ligar o computador com tudo conectado aponta para regulaÃ§Ã£o sob demanda â€” exatamente o que um teste rÃ¡pido de bancada nÃ£o vÃª.</p>

        <h2>Sintomas que combinam com fonte</h2>
        <ul>
          <li>Nada acende: sem LED, sem giro de ventoinha, sem reaÃ§Ã£o ao botÃ£o.</li>
          <li>Liga por um instante e desliga sozinho, em ciclo repetido.</li>
          <li>ReinÃ­cio sÃºbito sob esforÃ§o â€” jogo, renderizaÃ§Ã£o, cÃ³pia grande de arquivos.</li>
          <li>Desligamentos que aumentam quando a mÃ¡quina jÃ¡ estÃ¡ quente.</li>
          <li>Cheiro de queimado ou ruÃ­do elÃ©trico agudo vindo do gabinete.</li>
        </ul>
        <p>Os mesmos sintomas aparecem em memÃ³ria com contato sujo, em refrigeraÃ§Ã£o saturada e em placa-mÃ£e com regulagem defeituosa. Nenhum deles fecha diagnÃ³stico sozinho: eles apenas colocam a fonte na lista de suspeitos.</p>

        <h2>SeguranÃ§a antes de qualquer teste</h2>
        <p>Fonte de computador guarda energia em capacitores mesmo depois de desligada da tomada. Isso muda as regras:</p>
        <ul>
          <li>NÃ£o abra a caixa metÃ¡lica da fonte. NÃ£o hÃ¡ manutenÃ§Ã£o domÃ©stica ali dentro.</li>
          <li>Trabalhe sempre com o cabo de forÃ§a retirado ao conectar ou desconectar qualquer coisa.</li>
          <li>Nunca teste com o gabinete apoiado em superfÃ­cie metÃ¡lica ou Ãºmida.</li>
          <li>Se houver marca de queimado, estufamento visÃ­vel ou cheiro forte, o teste acabou: a peÃ§a Ã© descartada, nÃ£o investigada.</li>
        </ul>

        <h2>Teste 1 â€” a fonte reage sozinha?</h2>
        <p>Existe um teste clÃ¡ssico que forÃ§a a fonte a ligar fora da placa-mÃ£e, curtocircuitando o sinal de acionamento a um terra do conector principal. Ele responde uma Ãºnica pergunta: a fonte reage ao comando de ligar.</p>
        <p>Ã‰ um teste de exclusÃ£o, nÃ£o de aprovaÃ§Ã£o. Fonte que gira a ventoinha nesse teste pode continuar entregando tensÃ£o errada. E fonte que nÃ£o reage tambÃ©m pode estar apenas em proteÃ§Ã£o por causa de curto em outro componente ligado a ela. Por isso o teste vale com todos os cabos de perifÃ©rico desconectados.</p>

        <h2>Teste 2 â€” medir com o multÃ­metro</h2>
        <p>Medir tensÃ£o contÃ­nua nos conectores mostra se a saÃ­da estÃ¡ dentro das faixas previstas pelo padrÃ£o de fonte do PC. As linhas principais toleram cerca de 5% de variaÃ§Ã£o; a linha auxiliar de standby permanece ativa mesmo com a mÃ¡quina desligada, o que explica placa com LED aceso e computador que nÃ£o liga.</p>
        <ol>
          <li>Ajuste o instrumento para tensÃ£o contÃ­nua, em escala compatÃ­vel.</li>
          <li>Fixe a ponta de referÃªncia em um terra do prÃ³prio conector.</li>
          <li>Toque as linhas positivas uma a uma e anote cada leitura em vez de decidir na hora.</li>
          <li>Repita a mediÃ§Ã£o com a mÃ¡quina montada e ligada, nÃ£o apenas em teste isolado.</li>
        </ol>
        <p>Leitura estÃ¡vel dentro da faixa em repouso nÃ£o aprova a fonte. Aprova sÃ³ aquele momento, naquela demanda.</p>

        <h2>Teste 3 â€” o Ãºnico que vale a decisÃ£o: sob carga</h2>
        <p>A prova real Ã© medir enquanto o computador trabalha. Se a linha de 12 V cai abaixo da faixa quando o processador e o vÃ­deo puxam junto, ou se a leitura oscila de forma visÃ­vel, a fonte nÃ£o estÃ¡ regulando. Ã‰ esse comportamento que derruba a mÃ¡quina no meio de um jogo e volta a "funcionar perfeitamente" no teste seguinte em repouso.</p>
        <p>O mesmo raciocÃ­nio vale para a temperatura: fonte que sÃ³ falha depois de meia hora ligada precisa ser testada depois de meia hora ligada. Teste de dois minutos aprova defeito tÃ©rmico.</p>

        <h2>SubstituiÃ§Ã£o controlada: o teste mais confiÃ¡vel</h2>
        <p>Em bancada, o mÃ©todo que menos erra nÃ£o Ã© mediÃ§Ã£o â€” Ã© troca por uma fonte sabidamente boa e de capacidade adequada. Se o sintoma some, a peÃ§a estava ruim. Se o sintoma continua idÃªntico, a fonte foi descartada como causa e o prÃ³ximo suspeito Ã© a placa, a memÃ³ria ou a refrigeraÃ§Ã£o. Esse cruzamento evita comprar peÃ§a por eliminaÃ§Ã£o errada.</p>

        <h2>Quando trocar sem hesitar</h2>
        <ul>
          <li>TensÃ£o fora de faixa em qualquer linha principal, mesmo que sÃ³ sob carga.</li>
          <li>OscilaÃ§Ã£o perceptÃ­vel durante a mediÃ§Ã£o.</li>
          <li>Sem reaÃ§Ã£o no teste de acionamento com tudo desconectado.</li>
          <li>Sinais fÃ­sicos: estufamento, vazamento, marca de queimado, ruÃ­do elÃ©trico.</li>
          <li>Fonte genÃ©rica sem especificaÃ§Ã£o clara em mÃ¡quina que ganhou placa de vÃ­deo dedicada.</li>
        </ul>
        <p>NÃ£o trocamos fonte por idade. Trocamos por comportamento medido ou por evidÃªncia fÃ­sica â€” e registramos qual dos dois motivou a decisÃ£o.</p>

        <h2>Quando o caso deixa de ser domÃ©stico</h2>
        <p>Se a mÃ¡quina jÃ¡ queimou fonte mais de uma vez, se houve surto elÃ©trico, se hÃ¡ marca de carbonizaÃ§Ã£o na placa ou se o computador desliga tambÃ©m com fonte boa, o problema saiu da fonte. Nesse ponto o caminho Ã© diagnÃ³stico de placa, nÃ£o substituiÃ§Ã£o repetida de peÃ§a.</p>
        <p>O critÃ©rio de verificaÃ§Ã£o e cobranÃ§a estÃ¡ em <Link to="/diagnostico-tecnico">como funciona o diagnÃ³stico tÃ©cnico</Link>. Quando o quadro Ã© de mÃ¡quina que nÃ£o dÃ¡ sinal, comece por <Link to="/servicos/computador-nao-liga">computador nÃ£o liga</Link>; se a suspeita passa para a eletrÃ´nica, o procedimento estÃ¡ em <Link to="/servicos/conserto-placa">conserto de placa</Link>. Para separar os dois casos, veja <Link to="/blog/como-diagnosticar-placa-mae-defeituosa">como diagnosticar placa-mÃ£e defeituosa</Link>.</p>

        <h2>Resumo prÃ¡tico</h2>
        <p>Comece pelos sintomas e pelo padrÃ£o em que eles aparecem. Confirme reaÃ§Ã£o da fonte com tudo desconectado, meÃ§a as linhas em repouso, repita sob carga real e, se ainda houver dÃºvida, troque por uma fonte boa para cruzar o resultado. DecisÃ£o de troca vem de mediÃ§Ã£o fora de faixa, oscilaÃ§Ã£o ou dano fÃ­sico â€” nunca de suposiÃ§Ã£o.</p>
      </>
    ),
  },

  "como-limpar-notebook-por-dentro": {
    title: "Limpeza interna de notebook: o que muda de verdade e onde estÃ£o os riscos",
    excerpt:
      "Como a poeira compromete a refrigeraÃ§Ã£o de um notebook, o que dÃ¡ para verificar sem abrir o equipamento, o que a limpeza interna resolve, o que ela nÃ£o resolve e quais erros custam caro na bancada.",
    date: "2026-08-12",
    readTime: "11 min",
    category: "ManutenÃ§Ã£o",
    content: (
      <>
        <p className="lead">Boa parte dos notebooks que chegam com queixa de aquecimento nÃ£o tem defeito eletrÃ´nico: tem um caminho de ar obstruÃ­do. A limpeza interna corrige exatamente esse ponto â€” e apenas esse. Entender o limite do procedimento evita frustraÃ§Ã£o depois, porque nem todo aquecimento vem de poeira.</p>

        <h2>Por que a poeira derruba a refrigeraÃ§Ã£o</h2>
        <p>O calor gerado pelo processador e pelo chip de vÃ­deo Ã© conduzido por tubos de cobre atÃ© um bloco de aletas metÃ¡licas, e uma ventoinha empurra ar por esse bloco para jogar o calor para fora. Ã‰ um circuito fechado: entrada de ar, aletas, saÃ­da de ar.</p>
        <p>A poeira nÃ£o se espalha por igual. Ela se compacta em uma manta fina bem na face das aletas, no ponto exato onde o ar deveria atravessar. O resultado Ã© contraintuitivo: a ventoinha gira mais rÃ¡pido e faz mais barulho justamente porque estÃ¡ movendo menos ar Ãºtil. O usuÃ¡rio escuta esforÃ§o e sente a base quente enquanto a saÃ­da de ar sopra fraco.</p>
        <p>Quando a temperatura passa de um limite definido pelo prÃ³prio fabricante, o sistema reduz a frequÃªncia de trabalho para se proteger. Ã‰ por isso que a mÃ¡quina comeÃ§a rÃ¡pida e vai ficando lenta depois de alguns minutos â€” o desempenho estÃ¡ sendo cortado de propÃ³sito para evitar dano.</p>

        <h2>Sinais que apontam para obstruÃ§Ã£o</h2>
        <ul>
          <li>Ventoinha acelerada em tarefas leves, como navegador e editor de texto.</li>
          <li>Ar quente saindo fraco pela grade lateral ou traseira, mesmo com a ventoinha audÃ­vel.</li>
          <li>Base muito quente na regiÃ£o prÃ³xima Ã  saÃ­da de ar.</li>
          <li>Queda de desempenho progressiva durante o uso, e nÃ£o desde o primeiro minuto.</li>
          <li>Desligamento repentino em tarefas pesadas, sem tela de erro.</li>
        </ul>
        <p>Nenhum desses sinais isolado fecha diagnÃ³stico. Ventoinha barulhenta tambÃ©m aparece em rolamento gasto; queda de desempenho tambÃ©m aparece em disco mecÃ¢nico saturado; desligamento sÃºbito tambÃ©m aparece em falha de energia. Por isso a verificaÃ§Ã£o vem antes da desmontagem.</p>

        <h2>O que dÃ¡ para verificar antes de abrir</h2>
        <ul>
          <li>Observe a saÃ­da de ar contra a luz: aletas visivelmente cinzentas ou cobertas indicam obstruÃ§Ã£o.</li>
          <li>Use o notebook sobre superfÃ­cie rÃ­gida por alguns minutos. Se o comportamento muda bastante, parte do problema Ã© bloqueio das entradas inferiores por cama, sofÃ¡ ou colo.</li>
          <li>Acompanhe se a lentidÃ£o aparece sÃ³ depois de aquecer. LentidÃ£o desde o boot costuma ser disco ou memÃ³ria, nÃ£o temperatura.</li>
          <li>Confira se a ventoinha realmente gira em algum momento. SilÃªncio absoluto sob carga Ã© outro problema â€” pode ser ventoinha travada ou desconectada.</li>
        </ul>

        <h2>Por que ar comprimido "por fora" resolve pouco</h2>
        <p>Soprar ar pela grade externa costuma empurrar a poeira para dentro do gabinete em vez de retirÃ¡-la, e ela se realoja sobre a placa. Pior: quando a ventoinha Ã© girada em alta rotaÃ§Ã£o pelo jato de ar, ela funciona como gerador e pode enviar corrente para a placa, alÃ©m de castigar o rolamento.</p>
        <p>Aspirador domÃ©stico tambÃ©m nÃ£o Ã© o caminho. AlÃ©m de nÃ£o ter forÃ§a direcionada onde interessa, o atrito do fluxo de ar em bico plÃ¡stico gera carga estÃ¡tica perto de componentes sensÃ­veis.</p>
        <p>A limpeza que muda o quadro Ã© a que remove a manta compactada das aletas com o conjunto acessÃ­vel, retirando a sujeira do equipamento em vez de redistribuÃ­-la.</p>

        <h2>O procedimento como Ã© feito na bancada</h2>
        <ol>
          <li><strong>Desligar por completo e cortar a energia.</strong> NÃ£o Ã© suspender: Ã© desligar, retirar o carregador e, em modelos com bateria interna, desconectar o conector da bateria antes de qualquer outro passo.</li>
          <li><strong>Abrir com registro de posiÃ§Ã£o.</strong> Parafusos de comprimentos diferentes em posiÃ§Ãµes diferentes sÃ£o regra, nÃ£o exceÃ§Ã£o. Trocar dois deles de lugar pode perfurar a placa ou impedir o fechamento.</li>
          <li><strong>Soltar as travas plÃ¡sticas com ferramenta plÃ¡stica.</strong> Chave metÃ¡lica marca a carcaÃ§a e quebra presilhas que raramente tÃªm reposiÃ§Ã£o avulsa.</li>
          <li><strong>Retirar a poeira das aletas com a ventoinha imobilizada.</strong> A manta sai inteira quando Ã© solta pela face correta; jogar ar contra ela sÃ³ a compacta mais.</li>
          <li><strong>Verificar o rolamento da ventoinha.</strong> RuÃ­do metÃ¡lico ou folga axial indicam desgaste que a limpeza nÃ£o corrige â€” Ã© peÃ§a, e isso muda o orÃ§amento.</li>
          <li><strong>Avaliar a interface tÃ©rmica.</strong> Com o dissipador removido, faz sentido renovar o composto tÃ©rmico; recolocar um dissipador sobre pasta ressecada devolve o problema em poucas semanas.</li>
          <li><strong>Remontar e testar sob carga.</strong> Fechar sem testar Ã© adivinhaÃ§Ã£o: o comportamento tem que ser comparado antes e depois, com o equipamento trabalhando de verdade.</li>
        </ol>
        <p>O detalhe do composto tÃ©rmico tem regras prÃ³prias â€” quantidade, ordem de aperto e limpeza das superfÃ­cies. Elas estÃ£o em <Link to="/blog/como-trocar-pasta-termica-notebook">como trocar a pasta tÃ©rmica do notebook</Link>.</p>

        <h2>O que a limpeza nÃ£o resolve</h2>
        <ul>
          <li><strong>Rolamento de ventoinha gasto.</strong> O barulho volta porque a peÃ§a estÃ¡ no fim.</li>
          <li><strong>Heatpipe amassado ou saturado.</strong> A conduÃ§Ã£o cai e nenhuma limpeza recupera.</li>
          <li><strong>Projeto tÃ©rmico apertado.</strong> Modelos finos com processador potente aquecem por concepÃ§Ã£o; a limpeza devolve o normal do aparelho, nÃ£o um patamar melhor do que ele nunca teve.</li>
          <li><strong>LentidÃ£o de origem lÃ³gica.</strong> Disco mecÃ¢nico, pouca memÃ³ria e sistema saturado continuam iguais depois da limpeza. Esse caminho estÃ¡ descrito em <Link to="/blog/computador-lento-causas-solucoes">computador lento: causas e como decidir</Link>.</li>
          <li><strong>Aquecimento por bateria inchada.</strong> Aqui hÃ¡ risco fÃ­sico e a prioridade deixa de ser temperatura.</li>
        </ul>

        <h2>Erros que transformam manutenÃ§Ã£o em conserto</h2>
        <ul>
          <li>Abrir com a bateria interna ainda conectada e provocar curto ao encostar a ferramenta na placa.</li>
          <li>ForÃ§ar a tampa em um ponto ainda parafusado e trincar a carcaÃ§a.</li>
          <li>Puxar o cabo flat da ventoinha pela fiaÃ§Ã£o em vez de soltar o conector.</li>
          <li>Aplicar produto de limpeza domÃ©stico sobre a placa.</li>
          <li>Fechar sem reconectar a ventoinha â€” a mÃ¡quina liga, aquece e desliga em minutos.</li>
        </ul>
        <p>Se o notebook ainda estÃ¡ em garantia de fÃ¡brica, verifique as condiÃ§Ãµes do fabricante antes de abrir: em muitos casos a abertura por terceiro afeta a cobertura.</p>

        <h2>De quanto em quanto tempo</h2>
        <p>NÃ£o existe intervalo universal, porque o que define Ã© o ambiente. MÃ¡quina usada sobre mesa, em local sem carpete e sem animais, acumula pouco. Notebook usado na cama, em obra, em cozinha ou em casa com pets acumula muito mais rÃ¡pido. O critÃ©rio prÃ¡tico Ã© o comportamento: quando a ventoinha passa a trabalhar acelerada em tarefas leves e a saÃ­da de ar enfraquece, chegou a hora â€” independentemente do calendÃ¡rio.</p>

        <h2>Quando levar para a bancada</h2>
        <p>Faz sentido buscar atendimento quando hÃ¡ ruÃ­do metÃ¡lico na ventoinha, desligamento sob carga, cheiro de queimado, lÃ­quido derramado ou quando o modelo exige remoÃ§Ã£o do teclado e da placa para chegar ao conjunto de refrigeraÃ§Ã£o. Nesses casos o risco de dano na desmontagem Ã© maior do que o ganho de fazer sozinho.</p>
        <p>Na prÃ¡tica, o roteiro Ã©: entender o sintoma, confirmar se Ã© tÃ©rmico e sÃ³ entÃ£o abrir. O critÃ©rio de cobranÃ§a e o que Ã© verificado estÃ£o em <Link to="/diagnostico-tecnico">como funciona o diagnÃ³stico tÃ©cnico</Link>, e o procedimento completo de refrigeraÃ§Ã£o faz parte da <Link to="/servicos/manutencao-de-notebook">manutenÃ§Ã£o de notebook</Link>. Quando o equipamento nÃ£o pode sair do lugar, o <Link to="/atendimento-domicilio">atendimento no endereÃ§o</Link> cobre parte desses casos. Se o quadro for de calor recorrente, vale ler antes <Link to="/blog/notebook-superaquecendo-o-que-fazer">notebook superaquecendo: o que fazer</Link>.</p>

        <h2>Resumo prÃ¡tico</h2>
        <p>Poeira compactada nas aletas Ã© a causa mais comum de aquecimento em notebook com alguns anos de uso, e a limpeza interna bem feita devolve o comportamento original do aparelho. Ela nÃ£o corrige ventoinha gasta, projeto tÃ©rmico limitado nem lentidÃ£o de origem lÃ³gica. Antes de abrir, confirme que o sintoma Ã© realmente tÃ©rmico; ao abrir, corte a energia da bateria e trate parafuso, trava plÃ¡stica e conector com o cuidado que eles exigem.</p>
      </>
    ),
  },

  "como-recuperar-dados-hd-defeituoso": {
    title: "Como Recuperar Dados de HD Defeituoso: MÃ©todos e Ferramentas",
    excerpt: "TÃ©cnicas profissionais para recuperar arquivos de discos com setores defeituosos.",
    date: "2026-04-07",
    readTime: "13 min",
    category: "Procedimentos TÃ©cnicos",
    content: (
      <>
        <p className="lead">Um HD pode falhar sem aviso. Cliques, travamentos, arquivos corrompidos â€” quando isso acontece, a prioridade Ã© <strong>recuperar os dados antes que o disco pare de vez</strong>. Este guia cobre os mÃ©todos tÃ©cnicos que usamos para recuperar dados em diferentes cenÃ¡rios de falha.</p>

        <h2>Tipos de Falha em HDs</h2>

        <h3>Falha LÃ³gica (Software)</h3>
        <p>O disco funciona fisicamente, mas os dados estÃ£o inacessÃ­veis por corrupÃ§Ã£o do sistema de arquivos, formataÃ§Ã£o acidental, exclusÃ£o de partiÃ§Ã£o ou ataque de vÃ­rus/ransomware. <strong>Taxa de recuperaÃ§Ã£o: 80-95%.</strong></p>

        <h3>Falha FÃ­sica (Hardware)</h3>
        <p>Componentes internos do disco estÃ£o danificados: cabeÃ§as de leitura, motor do spindle, placa controladora ou superfÃ­cie magnÃ©tica. Sintomas: cliques rÃ­tmicos, HD nÃ£o gira, nÃ£o Ã© reconhecido na BIOS. <strong>Taxa de recuperaÃ§Ã£o: 40-70%</strong> (requer sala limpa em casos graves).</p>

        <h3>Setores Defeituosos (Bad Sectors)</h3>
        <p>Ãreas do disco que nÃ£o conseguem mais ser lidas. O HD ainda funciona, mas fica lento e alguns arquivos ficam inacessÃ­veis. <strong>Taxa de recuperaÃ§Ã£o: 70-90%.</strong></p>

        <h2>Procedimento de RecuperaÃ§Ã£o â€” Falha LÃ³gica</h2>

        <h3>MÃ©todo 1: Recuva (Gratuito)</h3>
        <ol>
          <li>Conecte o HD como disco secundÃ¡rio (nunca instale programas no disco defeituoso)</li>
          <li>Instale o Recuva em outro disco</li>
          <li>Execute varredura profunda na partiÃ§Ã£o afetada</li>
          <li>Selecione os arquivos encontrados e recupere para outro disco</li>
        </ol>

        <h3>MÃ©todo 2: TestDisk + PhotoRec (Gratuito, Open Source)</h3>
        <p>Para casos mais complexos como partiÃ§Ã£o excluÃ­da:</p>
        <ol>
          <li><strong>TestDisk:</strong> Analisa e reconstrÃ³i a tabela de partiÃ§Ãµes</li>
          <li><strong>PhotoRec:</strong> Recupera arquivos por assinatura (file carving), ignorando o sistema de arquivos</li>
        </ol>

        <h3>MÃ©todo 3: R-Studio (Profissional)</h3>
        <p>Ferramenta profissional que suporta reconstruÃ§Ã£o de RAID, recuperaÃ§Ã£o de partiÃ§Ãµes formatadas e varredura por assinatura de arquivo. Ã‰ o software que usamos para casos complexos.</p>

        <h2>Procedimento de RecuperaÃ§Ã£o â€” Setores Defeituosos</h2>

        <h3>Clonagem com ddrescue</h3>
        <p>Antes de tentar recuperar dados de um HD com bad sectors, <strong>clone-o primeiro</strong> usando ddrescue (Linux):</p>
        <ol>
          <li>Crie um boot USB com Linux</li>
          <li>Execute: <code>ddrescue /dev/sdX /dev/sdY rescue.log</code></li>
          <li>O ddrescue faz mÃºltiplas passagens, priorizando Ã¡reas legÃ­veis e retornando Ã s Ã¡reas difÃ­ceis depois</li>
          <li>Trabalhe a recuperaÃ§Ã£o de dados sobre o clone, nÃ£o sobre o disco original</li>
        </ol>

        <h2>O Que NÃƒO Fazer</h2>
        <ul>
          <li>âŒ <strong>NÃ£o formate o disco</strong> achando que vai resolver</li>
          <li>âŒ <strong>NÃ£o instale programas no disco defeituoso</strong> â€” pode sobrescrever dados recuperÃ¡veis</li>
          <li>âŒ <strong>NÃ£o abra o HD</strong> â€” a contaminaÃ§Ã£o por poeira destrÃ³i a superfÃ­cie</li>
          <li>âŒ <strong>NÃ£o coloque no freezer</strong> â€” mito que causa condensaÃ§Ã£o e mais danos</li>
          <li>âŒ <strong>NÃ£o continue usando o disco</strong> se ouvir cliques â€” cada hora de uso reduz as chances de recuperaÃ§Ã£o</li>
        </ul>

        <h2>Quando Procurar Ajuda Profissional</h2>
        <ul>
          <li>HD fazendo cliques ou nÃ£o sendo reconhecido</li>
          <li>Dados crÃ­ticos (fotos de famÃ­lia, documentos empresariais)</li>
          <li>Tentativas iniciais de recuperaÃ§Ã£o falharam</li>
          <li>Suspeita de ransomware</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Perdeu Dados? Podemos Ajudar</h3>
          <p className="text-muted-foreground mb-0">Fazemos diagnÃ³stico e recuperaÃ§Ã£o de dados em HD, SSD e pen drives. Atendimento em Curitiba e regiÃ£o com valor prÃ©vio.</p>
        </div>

        <p><strong>Leia tambÃ©m:</strong></p>
        <ul>
          <li><Link to="/blog/backup-como-proteger-seus-arquivos" className="text-accent">Backup: como proteger seus arquivos</Link></li>
          <li><Link to="/servicos/recuperacao-de-dados" className="text-accent">RecuperaÃ§Ã£o de dados e backup</Link></li>
        </ul>
      </>
    ),
  },

  "como-configurar-rede-wifi-empresarial": {
    title: "Como Configurar Rede Wi-Fi Empresarial: VLANs, QoS e SeguranÃ§a",
    excerpt: "Procedimento tÃ©cnico para montar rede corporativa com segmentaÃ§Ã£o e priorizaÃ§Ã£o de trÃ¡fego.",
    date: "2026-04-07",
    readTime: "14 min",
    category: "Procedimentos TÃ©cnicos",
    content: (
      <>
        <p className="lead">Uma rede Wi-Fi empresarial Ã© completamente diferente de uma rede domÃ©stica. NÃ£o basta colocar um roteador potente â€” Ã© preciso <strong>segmentaÃ§Ã£o, seguranÃ§a, priorizaÃ§Ã£o de trÃ¡fego e escalabilidade</strong>. Este guia cobre o procedimento tÃ©cnico que aplicamos em empresas de 5 a 200 funcionÃ¡rios.</p>

        <h2>Planejamento: Antes de Instalar Qualquer Coisa</h2>

        <h3>1. Levantamento de Requisitos</h3>
        <ul>
          <li><strong>Quantidade de dispositivos simultÃ¢neos</strong> (computadores, celulares, impressoras, cÃ¢meras)</li>
          <li><strong>Tipos de uso:</strong> NavegaÃ§Ã£o, VoIP, videoconferÃªncia, transferÃªncia de arquivos</li>
          <li><strong>Ãrea de cobertura:</strong> Planta do imÃ³vel, nÃºmero de andares, paredes</li>
          <li><strong>Rede de visitantes:</strong> Necessidade de rede separada para clientes</li>
          <li><strong>Largura de banda contratada</strong> do provedor</li>
        </ul>

        <h3>2. Site Survey (AnÃ¡lise do Local)</h3>
        <p>Antes de posicionar access points, fazemos um site survey para mapear:</p>
        <ul>
          <li>InterferÃªncias de redes vizinhas (canais congestionados)</li>
          <li>ObstÃ¡culos fÃ­sicos (paredes de concreto, vidro, metal)</li>
          <li>Pontos ideais para instalaÃ§Ã£o de APs</li>
          <li>Necessidade de cabeamento estruturado</li>
        </ul>

        <h2>Arquitetura Recomendada</h2>

        <h3>Equipamentos</h3>
        <ul>
          <li><strong>Firewall/Router:</strong> pfSense, MikroTik ou Ubiquiti EdgeRouter</li>
          <li><strong>Switch gerenciÃ¡vel:</strong> TP-Link JetStream, Ubiquiti USW ou MikroTik CRS</li>
          <li><strong>Access Points:</strong> Ubiquiti UniFi, TP-Link Omada ou Aruba Instant On</li>
          <li><strong>Controlador:</strong> UniFi Controller ou Omada Controller (centraliza configuraÃ§Ã£o)</li>
        </ul>

        <h3>VLANs (SegmentaÃ§Ã£o de Rede)</h3>
        <p>VLANs separam o trÃ¡fego em redes virtuais independentes:</p>
        <ul>
          <li><strong>VLAN 10 â€” Corporativa:</strong> Computadores e servidores da empresa</li>
          <li><strong>VLAN 20 â€” VoIP:</strong> Telefones IP com prioridade de trÃ¡fego</li>
          <li><strong>VLAN 30 â€” Visitantes:</strong> Acesso limitado Ã  internet (sem acesso Ã  rede interna)</li>
          <li><strong>VLAN 40 â€” IoT/CÃ¢meras:</strong> Dispositivos IoT isolados por seguranÃ§a</li>
        </ul>

        <h3>QoS (Quality of Service)</h3>
        <p>PriorizaÃ§Ã£o de trÃ¡fego para evitar que downloads pesados prejudiquem videoconferÃªncias:</p>
        <ul>
          <li><strong>Prioridade Alta:</strong> VoIP, videoconferÃªncia (Zoom, Teams, Meet)</li>
          <li><strong>Prioridade MÃ©dia:</strong> NavegaÃ§Ã£o web, email, ERP</li>
          <li><strong>Prioridade Baixa:</strong> Downloads, atualizaÃ§Ãµes, streaming</li>
        </ul>

        <h2>SeguranÃ§a</h2>
        <ul>
          <li><strong>WPA3-Enterprise</strong> com autenticaÃ§Ã£o RADIUS (ou WPA2-Enterprise como mÃ­nimo)</li>
          <li><strong>Portal Captive</strong> para rede de visitantes (aceite de termos de uso)</li>
          <li><strong>Firewall rules</strong> entre VLANs (visitantes nÃ£o acessam rede corporativa)</li>
          <li><strong>DNS filtering</strong> (bloqueio de sites maliciosos via Pi-hole ou OpenDNS)</li>
          <li><strong>AtualizaÃ§Ã£o de firmware</strong> em todos os equipamentos de rede</li>
        </ul>

        <h2>Monitoramento</h2>
        <p>ApÃ³s a instalaÃ§Ã£o, configuramos monitoramento contÃ­nuo:</p>
        <ul>
          <li>Dashboard centralizado (UniFi Controller / Omada)</li>
          <li>Alertas de dispositivos offline</li>
          <li>GrÃ¡ficos de uso de banda por VLAN</li>
          <li>Logs de seguranÃ§a e tentativas de acesso</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Rede Wi-Fi Empresarial em Curitiba</h3>
          <p className="text-muted-foreground mb-0">Projetamos, instalamos e configuramos redes empresariais com VLANs, QoS e seguranÃ§a. Atendemos empresas de 5 a 200 funcionÃ¡rios em Curitiba e regiÃ£o.</p>
        </div>

        <p><strong>Leia tambÃ©m:</strong></p>
        <ul>
          <li><Link to="/blog/wifi-lento-como-melhorar" className="text-accent">Wi-Fi lento: como melhorar o sinal</Link></li>
          <li><Link to="/servicos/redes-e-wifi" className="text-accent">Redes e Wi-Fi</Link></li>
          <li><Link to="/servicos/suporte-tecnico-empresarial" className="text-accent">Suporte tÃ©cnico empresarial</Link></li>
        </ul>
      </>
    ),
  },

  "como-diagnosticar-placa-mae-defeituosa": {
    title: "Placa-mÃ£e defeituosa: como confirmar antes de trocar a peÃ§a errada",
    excerpt:
      "InspeÃ§Ã£o visual, teste mÃ­nimo e eliminaÃ§Ã£o sistemÃ¡tica para distinguir falha de placa-mÃ£e de falha de memÃ³ria, fonte ou refrigeraÃ§Ã£o â€” e quando reparo eletrÃ´nico ainda faz sentido.",
    date: "2026-08-12",
    readTime: "11 min",
    category: "Procedimentos TÃ©cnicos",
    content: (
      <>
        <p className="lead">Placa-mÃ£e Ã© o diagnÃ³stico que mais se conclui por eliminaÃ§Ã£o e o que mais se erra por pressa. Ela nÃ£o costuma dar um sintoma prÃ³prio: ela faz outro componente parecer defeituoso. Confirmar exige mÃ©todo, e o mÃ©todo Ã© sempre reduzir a mÃ¡quina atÃ© sobrar uma variÃ¡vel.</p>

        <h2>Por que o sintoma engana</h2>
        <p>A placa distribui energia, comanda o vÃ­deo integrado, controla memÃ³ria, armazenamento e portas. Quando um desses caminhos falha na prÃ³pria placa, o efeito aparece no perifÃ©rico ligado ali. Um slot de memÃ³ria com contato ruim gera erro que parece pente defeituoso; uma regulagem instÃ¡vel na placa gera reinÃ­cio que parece fonte fraca; um controlador de USB travado parece cabo ou dispositivo.</p>
        <p>Por isso a regra Ã© simples: nunca se conclui placa por sintoma. Conclui-se placa quando todo o resto jÃ¡ foi testado e o comportamento nÃ£o mudou.</p>

        <h2>InspeÃ§Ã£o visual â€” o passo que resolve muitos casos</h2>
        <p>Antes de qualquer teste, com o cabo de forÃ§a retirado, observe a placa com boa luz:</p>
        <ul>
          <li><strong>Capacitores deformados ou com resÃ­duo:</strong> topo abaulado, aberto ou com crosta escura indicam peÃ§a no fim.</li>
          <li><strong>Escurecimento e carbonizaÃ§Ã£o:</strong> trilha ou componente queimado Ã© evidÃªncia direta.</li>
          <li><strong>CorrosÃ£o:</strong> manchas esverdeadas ou esbranquiÃ§adas indicam umidade ou lÃ­quido derramado, comum em mÃ¡quinas guardadas.</li>
          <li><strong>Dano mecÃ¢nico:</strong> pino torto no soquete, trava de slot quebrada, trilha rompida perto de furo de parafuso.</li>
          <li><strong>Poeira compactada e pasta tÃ©rmica ressecada:</strong> nÃ£o Ã© defeito de placa, mas muda o comportamento tÃ©rmico e precisa ser corrigido antes de qualquer conclusÃ£o.</li>
        </ul>

        <h2>Teste mÃ­nimo: reduzir atÃ© sobrar o essencial</h2>
        <p>A montagem mÃ­nima existe para eliminar interferÃªncia. Ficam apenas placa, processador com refrigeraÃ§Ã£o, um mÃ³dulo de memÃ³ria e a fonte. Saem armazenamento, placa de vÃ­deo dedicada, perifÃ©ricos e cabos de painel frontal que nÃ£o sejam necessÃ¡rios.</p>
        <ol>
          <li>Monte sÃ³ o essencial e tente ligar usando o vÃ­deo integrado, quando existir.</li>
          <li>Se chegar Ã  tela de configuraÃ§Ã£o da BIOS, a placa responde no nÃ­vel bÃ¡sico â€” o defeito estÃ¡ no que foi removido.</li>
          <li>Se nÃ£o chegar, devolva um componente por vez e observe em qual deles o comportamento muda.</li>
          <li>Anote cada passo. DiagnÃ³stico de placa se perde quando se troca duas coisas ao mesmo tempo.</li>
        </ol>

        <h2>Isolando memÃ³ria e slots</h2>
        <p>Teste um mÃ³dulo por vez, e cada mÃ³dulo em cada slot. Se um mÃ³dulo especÃ­fico falha em todos os slots, o mÃ³dulo Ã© o problema. Se qualquer mÃ³dulo falha sempre no mesmo slot, o defeito Ã© do slot â€” e slot Ã© placa. Antes de concluir, limpe os contatos e verifique se o mÃ³dulo estÃ¡ travado atÃ© o fim, porque encaixe parcial produz exatamente o mesmo sintoma.</p>

        <h2>Descartando a fonte antes de acusar a placa</h2>
        <p>Metade dos casos de "placa morta" Ã© energia. Confirme a fonte com mediÃ§Ã£o sob carga ou, melhor, com substituiÃ§Ã£o por uma fonte sabidamente boa. O procedimento completo estÃ¡ em <Link to="/blog/como-testar-fonte-de-alimentacao-pc">como testar a fonte de alimentaÃ§Ã£o</Link>. SÃ³ depois desse descarte o diagnÃ³stico de placa comeÃ§a a ter valor.</p>

        <h2>Sinais de diagnÃ³stico da prÃ³pria placa</h2>
        <p>Muitas placas indicam onde o processo parou: sequÃªncia sonora quando existe alto-falante interno, LEDs de estÃ¡gio identificando processador, memÃ³ria, vÃ­deo ou inicializaÃ§Ã£o, e visor de cÃ³digo em modelos mais completos. Esses cÃ³digos variam por fabricante â€” o valor deles Ã© apontar a etapa que travou, nÃ£o entregar a peÃ§a culpada. Confira o significado no manual do modelo exato, nunca em tabela genÃ©rica.</p>

        <h2>Quando a placa Ã© o veredito</h2>
        <ul>
          <li>Montagem mÃ­nima nÃ£o inicia mesmo com fonte, memÃ³ria e processador comprovados em outra mÃ¡quina.</li>
          <li>Slot ou porta especÃ­fica falha de forma reproduzÃ­vel com qualquer peÃ§a.</li>
          <li>Dano fÃ­sico visÃ­vel: queimado, corrosÃ£o, trilha rompida, pino do soquete danificado.</li>
          <li>Instabilidade persistente apÃ³s descartar energia, memÃ³ria e temperatura.</li>
        </ul>

        <h2>Reparar ou substituir</h2>
        <p>Nem todo defeito de placa Ã© fim de linha. Capacitor deformado, conector de energia danificado e trilha rompida em regiÃ£o acessÃ­vel costumam ter reparo eletrÃ´nico viÃ¡vel. JÃ¡ falha de chipset, corrosÃ£o espalhada por lÃ­quido e dano apÃ³s surto elÃ©trico com marcas em vÃ¡rios pontos raramente compensam o reparo â€” o custo se aproxima do de uma placa compatÃ­vel, e a confiabilidade nÃ£o volta.</p>
        <p>A decisÃ£o tambÃ©m depende da plataforma: placa antiga exige processador e memÃ³ria da mesma geraÃ§Ã£o, entÃ£o trocar a placa Ã s vezes puxa dois componentes junto. Esse cÃ¡lculo Ã© apresentado antes de qualquer autorizaÃ§Ã£o, com peÃ§a e mÃ£o de obra separadas.</p>

        <h2>O que nÃ£o fazer</h2>
        <ul>
          <li>Insistir em ligar repetidamente uma mÃ¡quina com cheiro de queimado.</li>
          <li>Aquecer a placa com fonte de calor domÃ©stica na esperanÃ§a de reativar solda.</li>
          <li>Trocar processador por suspeita, sem descarte prÃ©vio de fonte e memÃ³ria.</li>
          <li>Comprar placa antes de confirmar compatibilidade com o processador e a memÃ³ria que jÃ¡ existem.</li>
        </ul>

        <h2>PrÃ³ximo passo</h2>
        <p>Se a mÃ¡quina nÃ£o dÃ¡ nenhum sinal, comece por <Link to="/servicos/computador-nao-liga">computador nÃ£o liga</Link>. Quando a suspeita se firma na eletrÃ´nica, o procedimento de bancada estÃ¡ em <Link to="/servicos/conserto-placa">conserto de placa</Link>, e o critÃ©rio de verificaÃ§Ã£o e cobranÃ§a em <Link to="/diagnostico-tecnico">como funciona o diagnÃ³stico tÃ©cnico</Link>.</p>

        <h2>Resumo prÃ¡tico</h2>
        <p>Inspecione antes de testar, reduza a mÃ¡quina ao mÃ­nimo, isole memÃ³ria por slot, descarte a fonte com substituiÃ§Ã£o e sÃ³ entÃ£o trate a placa como responsÃ¡vel. Com dano fÃ­sico evidente, o veredito Ã© imediato; sem ele, Ã© a eliminaÃ§Ã£o registrada passo a passo que sustenta a decisÃ£o de reparar ou substituir.</p>
      </>
    ),
  },

  "como-instalar-segundo-ssd-notebook": {
    title: "Segundo SSD no notebook: quando cabe, quando nÃ£o cabe e o que muda",
    excerpt:
      "Como descobrir se o notebook aceita um segundo disco, a diferenÃ§a entre slot M.2 livre e caddy no lugar do leitor Ã³ptico, os limites de cada caminho e o que fazer depois da instalaÃ§Ã£o.",
    date: "2026-08-12",
    readTime: "10 min",
    category: "ManutenÃ§Ã£o",
    content: (
      <>
        <p className="lead">Adicionar um segundo disco Ã© a saÃ­da para quem jÃ¡ tem SSD rÃ¡pido de pouca capacidade e nÃ£o quer trocar tudo de novo. SÃ³ que nem todo notebook aceita â€” e os dois caminhos possÃ­veis, slot M.2 livre e caddy no lugar do leitor Ã³ptico, entregam resultados bem diferentes.</p>

        <h2>Antes de comprar qualquer peÃ§a</h2>
        <p>A pergunta certa nÃ£o Ã© "qual SSD comprar", Ã© "o que este modelo aceita". Comprar antes de conferir Ã© o erro mais caro dessa histÃ³ria, porque peÃ§a de armazenamento aberta raramente volta.</p>
        <ul>
          <li><strong>Existe slot M.2 livre?</strong> Muitos notebooks finos tÃªm apenas um, jÃ¡ ocupado. Outros tÃªm dois, sendo o segundo com comprimento limitado.</li>
          <li><strong>O slot Ã© NVMe, SATA ou aceita os dois?</strong> SÃ£o conectores parecidos com chaveamento diferente. Um disco NVMe em slot sÃ³ SATA simplesmente nÃ£o Ã© reconhecido.</li>
          <li><strong>Existe baia de 2,5 polegadas?</strong> Comum em modelos com alguns anos, rara em ultrafinos.</li>
          <li><strong>Ainda existe leitor Ã³ptico?</strong> Se sim, o caddy vira alternativa. Se nÃ£o, esse caminho estÃ¡ fechado.</li>
        </ul>
        <p>A resposta estÃ¡ no manual de serviÃ§o do fabricante para o nÃºmero exato do modelo, nÃ£o para a linha comercial. Dois notebooks com o mesmo nome de famÃ­lia podem ter placas diferentes.</p>

        <h2>Caminho 1 â€” slot M.2 livre</h2>
        <p>Ã‰ o melhor cenÃ¡rio: o disco entra direto na placa, sem cabo, sem adaptador e sem perda de desempenho. Pontos que costumam travar a instalaÃ§Ã£o:</p>
        <ul>
          <li><strong>Comprimento.</strong> O formato mais comum Ã© 2280 (80 mm), mas hÃ¡ slots que sÃ³ comportam 2242 ou 2230. O parafuso de fixaÃ§Ã£o indica o tamanho previsto.</li>
          <li><strong>Chaveamento do conector.</strong> A posiÃ§Ã£o do recorte diferencia mÃ³dulos SATA de NVMe. Se nÃ£o encaixa sem esforÃ§o, Ã© incompatibilidade â€” forÃ§ar quebra o slot.</li>
          <li><strong>EspaÃ§o de dissipaÃ§Ã£o.</strong> Modelos com pouco espaÃ§o interno esquentam; disco quente reduz a velocidade para se proteger.</li>
        </ul>

        <h2>Caminho 2 â€” caddy no lugar do leitor Ã³ptico</h2>
        <p>O caddy Ã© um adaptador que ocupa a baia do leitor de DVD e recebe um disco de 2,5 polegadas. Funciona, mas com ressalvas que precisam ficar claras antes:</p>
        <ul>
          <li>A porta do leitor Ã³ptico costuma ser mais lenta que a porta principal. Colocar ali o disco do sistema Ã© desperdÃ­cio â€” o caddy serve para armazenamento, nÃ£o para boot rÃ¡pido.</li>
          <li>A espessura importa: caddies de 9,5 mm e de 12,7 mm nÃ£o sÃ£o intercambiÃ¡veis. Medir o leitor antes evita a peÃ§a errada.</li>
          <li>Alguns modelos deixam de reconhecer o disco quando a bateria estÃ¡ muito baixa ou em modos de economia agressivos.</li>
          <li>O acabamento frontal nem sempre encaixa bem; a tampa original do leitor Ã s vezes precisa ser transferida para o caddy.</li>
        </ul>

        <h2>InstalaÃ§Ã£o com seguranÃ§a</h2>
        <ol>
          <li>Desligue por completo, retire o carregador e desconecte o conector da bateria interna antes de tocar na placa.</li>
          <li>Descarregue a estÃ¡tica do corpo antes de manusear o disco. Segure o mÃ³dulo pelas bordas, nunca pelos contatos.</li>
          <li>Registre a posiÃ§Ã£o de cada parafuso; comprimentos diferentes em posiÃ§Ãµes diferentes sÃ£o regra.</li>
          <li>No M.2, encaixe em Ã¢ngulo atÃ© o mÃ³dulo assentar e sÃ³ entÃ£o aperte o parafuso â€” sem pressionar o mÃ³dulo para baixo antes do encaixe.</li>
          <li>Feche a mÃ¡quina somente depois de conferir que nenhum cabo ficou preso.</li>
        </ol>

        <h2>Depois de instalar: o disco nÃ£o aparece sozinho</h2>
        <p>Disco novo vem sem partiÃ§Ã£o. Ele nÃ£o surge no explorador de arquivos atÃ© ser inicializado e formatado pela ferramenta de gerenciamento de discos do sistema. Se nem lÃ¡ ele aparece, o problema Ã© anterior: encaixe, chaveamento incompatÃ­vel ou slot desabilitado no firmware.</p>
        <p>Um cuidado extra vale para quem move as pastas pessoais para o disco novo: mover a pasta de perfil inteira por caminhos improvisados costuma quebrar atualizaÃ§Ãµes do sistema. Redirecionar apenas as bibliotecas de documentos, imagens e vÃ­deos Ã© o caminho estÃ¡vel.</p>
        <p>Se a intenÃ§Ã£o Ã© migrar o sistema atual para o disco novo em vez de apenas ampliar espaÃ§o, o procedimento Ã© outro â€” estÃ¡ em <Link to="/blog/como-clonar-hd-para-ssd">clonagem de HD para SSD</Link>.</p>

        <h2>O que esperar de ganho</h2>
        <p>Um segundo disco amplia espaÃ§o; ele nÃ£o deixa o sistema mais rÃ¡pido por si sÃ³. A percepÃ§Ã£o de velocidade vem de onde o sistema estÃ¡ instalado e de quanta memÃ³ria a mÃ¡quina tem. Notebook com sistema em HD mecÃ¢nico continua lento mesmo com um SSD adicional guardando arquivos.</p>

        <h2>Quando nÃ£o vale a pena fazer sozinho</h2>
        <ul>
          <li>Modelos que exigem remover teclado, placa ou tela para chegar ao slot.</li>
          <li>Equipamento na garantia de fÃ¡brica â€” confira as condiÃ§Ãµes antes de abrir.</li>
          <li>Notebook com bateria inchada: a prioridade passa a ser a bateria, nÃ£o o armazenamento.</li>
          <li>DÃºvida sobre compatibilidade do slot: uma peÃ§a errada custa mais do que a verificaÃ§Ã£o.</li>
        </ul>
        <p>O critÃ©rio de verificaÃ§Ã£o e cobranÃ§a estÃ¡ em <Link to="/diagnostico-tecnico">como funciona o diagnÃ³stico tÃ©cnico</Link>. A instalaÃ§Ã£o e a migraÃ§Ã£o fazem parte do <Link to="/servicos/upgrade-ssd-ram">upgrade de SSD e memÃ³ria</Link>, e o roteiro de escolha entre SATA e NVMe estÃ¡ em <Link to="/blog/como-fazer-upgrade-ssd-nvme">upgrade para SSD NVMe</Link>.</p>

        <h2>Resumo prÃ¡tico</h2>
        <p>Confirme no manual de serviÃ§o do modelo exato se existe slot M.2 livre, qual o comprimento aceito e qual o tipo suportado. Havendo slot, ele Ã© sempre o melhor caminho. O caddy resolve armazenamento, nÃ£o desempenho. Corte a energia da bateria antes de abrir, inicialize o disco depois da montagem e nÃ£o espere ganho de velocidade em uma mÃ¡quina cujo sistema continua em disco mecÃ¢nico.</p>
      </>
    ),
  },
  "como-crimpar-cabo-de-rede-rj45": {
    title: "Como Crimpar Cabo de Rede RJ45: PadrÃ£o T568A e T568B",
    excerpt: "Procedimento tÃ©cnico completo para crimpar cabos de rede Cat5e e Cat6 com testagem.",
    date: "2026-04-08",
    readTime: "8 min",
    category: "Procedimentos TÃ©cnicos",
    content: (
      <>
        <p className="lead">Crimpar cabos de rede Ã© uma habilidade fundamental para qualquer tÃ©cnico. Um cabo mal crimpado causa conexÃ£o intermitente, lentidÃ£o e perda de pacotes. Este guia cobre o procedimento correto com os padrÃµes <strong>T568A e T568B</strong>.</p>

        <h2>Material NecessÃ¡rio</h2>
        <ul>
          <li><strong>Cabo UTP Cat5e ou Cat6</strong> (na metragem desejada, mÃ¡ximo 100m por trecho)</li>
          <li><strong>Conectores RJ45</strong> (use Cat6 se o cabo for Cat6)</li>
          <li><strong>Alicate de crimpagem RJ45</strong></li>
          <li><strong>Decapador de cabo</strong> (ou estilete com cuidado)</li>
          <li><strong>Testador de cabo de rede</strong></li>
        </ul>

        <h2>PadrÃµes de Cores</h2>
        <h3>T568B (Mais Usado no Brasil)</h3>
        <ol>
          <li>Branco/Laranja</li>
          <li>Laranja</li>
          <li>Branco/Verde</li>
          <li>Azul</li>
          <li>Branco/Azul</li>
          <li>Verde</li>
          <li>Branco/Marrom</li>
          <li>Marrom</li>
        </ol>

        <h3>T568A</h3>
        <ol>
          <li>Branco/Verde</li>
          <li>Verde</li>
          <li>Branco/Laranja</li>
          <li>Azul</li>
          <li>Branco/Azul</li>
          <li>Laranja</li>
          <li>Branco/Marrom</li>
          <li>Marrom</li>
        </ol>

        <p><strong>Cabo direto (patch cable):</strong> Use o mesmo padrÃ£o nas duas pontas (B-B ou A-A).<br />
        <strong>Cabo crossover:</strong> Use T568A em uma ponta e T568B na outra (raramente necessÃ¡rio hoje).</p>

        <h2>Procedimento Passo a Passo</h2>

        <h3>1. Decape o Cabo</h3>
        <p>Remova cerca de <strong>3 cm da capa externa</strong>, tomando cuidado para nÃ£o cortar os fios internos. Gire o decapador ao redor do cabo sem pressionar demais.</p>

        <h3>2. Separe e Organize os Pares</h3>
        <p>DestranÃ§a cada par e organize os 8 fios na ordem correta do padrÃ£o escolhido. Mantenha-os paralelos e retos â€” <strong>nÃ£o cruze os fios</strong>.</p>

        <h3>3. Corte Reto</h3>
        <p>Com o alicate, corte os fios retos a aproximadamente <strong>12-14mm</strong> de comprimento. Todos devem ter o mesmo tamanho. A capa do cabo deve entrar pelo menos 5mm dentro do conector.</p>

        <h3>4. Insira no Conector RJ45</h3>
        <p>Segure o conector com a trava para baixo e o lado dos contatos de cobre para cima. Insira os fios mantendo a ordem. <strong>Empurre atÃ© que todos os fios toquem a parede frontal do conector</strong> â€” se algum ficar curto, nÃ£o haverÃ¡ contato.</p>

        <h3>5. Crimpe</h3>
        <p>Insira o conector no alicate de crimpagem e pressione com firmeza. Os pinos de cobre devem perfurar o isolamento de cada fio, criando contato elÃ©trico.</p>

        <h3>6. Teste</h3>
        <p>Use o testador de cabo. Todos os 8 LEDs devem acender em sequÃªncia (1-8). Se algum nÃ£o acender ou acender fora de ordem, recorte e refaÃ§a.</p>

        <h2>Erros Comuns</h2>
        <ul>
          <li>âŒ Fios nÃ£o encostam no fundo do conector</li>
          <li>âŒ Capa do cabo nÃ£o entra no conector (cabo solto com o tempo)</li>
          <li>âŒ Ordem dos fios trocada</li>
          <li>âŒ Usar conector Cat5e em cabo Cat6 (diÃ¢metro diferente)</li>
          <li>âŒ Decapar demais (fios expostos fora do conector)</li>
        </ul>

        <h2>Cat5e vs Cat6: Qual Usar?</h2>
        <ul>
          <li><strong>Cat5e:</strong> Suporta atÃ© 1 Gbps, frequÃªncia de 100 MHz. Suficiente para 90% das instalaÃ§Ãµes residenciais e pequenas empresas.</li>
          <li><strong>Cat6:</strong> Suporta atÃ© 10 Gbps (em atÃ© 55m), frequÃªncia de 250 MHz. Recomendado para instalaÃ§Ãµes novas e redes empresariais.</li>
          <li><strong>Cat6a:</strong> 10 Gbps em atÃ© 100m. Para data centers e instalaÃ§Ãµes de alta performance.</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">InstalaÃ§Ã£o de Rede em Curitiba</h3>
          <p className="text-muted-foreground mb-0">Fazemos cabeamento estruturado, crimpagem, certificaÃ§Ã£o e passagem de cabos em residÃªncias e empresas. atendimento sem compromisso.</p>
        </div>

        <p><strong>Leia tambÃ©m:</strong></p>
        <ul>
          <li><Link to="/blog/como-configurar-rede-wifi-empresarial" className="text-accent">Como configurar rede Wi-Fi empresarial</Link></li>
          <li><Link to="/servicos/redes-e-wifi" className="text-accent">Redes e Wi-Fi</Link></li>
        </ul>
      </>
    ),
  },

  "como-configurar-bios-uefi-corretamente": {
    title: "BIOS/UEFI: como configurar sem perder o boot, o BitLocker ou a estabilidade",
    excerpt: "Guia tÃ©cnico para identificar UEFI, Secure Boot, TPM, ordem de boot, modo de armazenamento e perfis de memÃ³ria sem aplicar receitas universais nem arriscar os dados.",
    date: "2026-09-25",
    readTime: "15 min",
    category: "Hardware e Windows",
    content: (
      <>
        <p className="lead">Configurar BIOS/UEFI com seguranÃ§a nÃ£o Ã© â€œativar tudo que parece modernoâ€. O firmware controla a inicializaÃ§Ã£o, recursos de seguranÃ§a, armazenamento e parte do comportamento do hardware. Uma alteraÃ§Ã£o incompatÃ­vel pode impedir o Windows de iniciar, acionar a recuperaÃ§Ã£o do BitLocker ou tornar uma mÃ¡quina antes estÃ¡vel em uma mÃ¡quina instÃ¡vel.</p>
        <h2>Resposta direta</h2>
        <p>Antes de mudar qualquer opÃ§Ã£o, registre o estado atual, confirme o modelo exato do computador ou placa-mÃ£e e descubra qual problema vocÃª estÃ¡ tentando resolver. Em Windows 11, os pontos que mais exigem cuidado sÃ£o <strong>UEFI/Legacy, Secure Boot, TPM 2.0, modo do controlador de armazenamento e ordem de boot</strong>. Mude uma coisa por vez, salve, reinicie e valide. Se surgir pedido de chave BitLocker, disco desaparecer, Windows parar de iniciar ou vocÃª nÃ£o souber por que uma opÃ§Ã£o precisa mudar, pare e volte ao Ãºltimo estado conhecido.</p>
        <h2>1. BIOS e UEFI nÃ£o sÃ£o sinÃ´nimos perfeitos</h2>
        <p>BIOS Ã© o nome histÃ³rico do firmware de PCs; UEFI Ã© a arquitetura moderna usada pela maioria dos equipamentos atuais. Na prÃ¡tica, fabricantes ainda chamam a tela de configuraÃ§Ã£o de â€œBIOS Setupâ€, mesmo quando o equipamento usa UEFI. Para diagnÃ³stico, o que importa Ã© identificar o modo de inicializaÃ§Ã£o e nÃ£o presumir pela aparÃªncia da tela.</p>
        <p>No Windows, vocÃª pode comeÃ§ar pelo <strong>InformaÃ§Ãµes do Sistema</strong> e pela documentaÃ§Ã£o do fabricante. Se precisar entrar no firmware sem adivinhar teclas, o prÃ³prio Windows oferece o caminho <strong>ConfiguraÃ§Ãµes â†’ Sistema â†’ RecuperaÃ§Ã£o â†’ InicializaÃ§Ã£o avanÃ§ada â†’ SoluÃ§Ã£o de problemas â†’ OpÃ§Ãµes avanÃ§adas â†’ ConfiguraÃ§Ãµes de Firmware UEFI</strong> quando o equipamento expÃµe essa opÃ§Ã£o.</p>
        <p>Veja tambÃ©m <Link to="/blog/boot-uefi-ou-legacy-como-identificar" className="text-accent">como identificar UEFI ou Legacy</Link> e o glossÃ¡rio de <Link to="/glossario/uefi" className="text-accent">UEFI</Link>.</p>
        <h2>2. FaÃ§a um baseline antes de tocar</h2>
        <ul>
          <li>Fotografe as telas que pretende alterar.</li>
          <li>Anote modelo da placa-mÃ£e ou notebook e a versÃ£o atual do firmware.</li>
          <li>Confirme se o Windows inicia normalmente antes da intervenÃ§Ã£o.</li>
          <li>Verifique se o disco do sistema usa BitLocker ou criptografia do dispositivo e localize a chave de recuperaÃ§Ã£o.</li>
          <li>Se a mÃ¡quina usa RAID, Intel RST, VMD, Optane ou configuraÃ§Ã£o corporativa, documente isso antes de alterar armazenamento.</li>
          <li>Em equipamento de empresa, confirme se hÃ¡ polÃ­tica de TI para Secure Boot, TPM e atualizaÃ§Ã£o de firmware.</li>
        </ul>
        <h2>3. Secure Boot: seguranÃ§a de inicializaÃ§Ã£o, nÃ£o â€œmodo de desempenhoâ€</h2>
        <p>Secure Boot ajuda a impedir que software nÃ£o confiÃ¡vel seja carregado no processo de inicializaÃ§Ã£o. No Windows 11, o equipamento precisa ser compatÃ­vel com Secure Boot em modo UEFI; a Microsoft recomenda mantÃª-lo habilitado quando nÃ£o existe uma necessidade tÃ©cnica legÃ­tima de desativaÃ§Ã£o temporÃ¡ria.</p>
        <p>NÃ£o desative Secure Boot sÃ³ porque um tutorial mandou. Antes, identifique o erro que vocÃª estÃ¡ tentando resolver. MudanÃ§as entre Legacy/CSM e UEFI podem alterar a forma como o disco de sistema Ã© inicializado e nÃ£o devem ser feitas como tentativa aleatÃ³ria.</p>
        <h2>4. TPM 2.0: confirme antes de habilitar ou limpar</h2>
        <p>TPM 2.0 Ã© requisito do Windows 11 e participa de recursos de seguranÃ§a como Windows Hello e BitLocker. Dependendo do fabricante, a opÃ§Ã£o pode aparecer como TPM, Security Device, Intel PTT, AMD fTPM ou outro rÃ³tulo semelhante.</p>
        <p><strong>Habilitar</strong> um TPM disponÃ­vel Ã© diferente de <strong>limpar</strong> o TPM. NÃ£o use opÃ§Ãµes como Clear TPM por impulso: elas podem invalidar chaves protegidas pelo mÃ³dulo e exigir recuperaÃ§Ã£o. Para entender a funÃ§Ã£o, veja o glossÃ¡rio de <Link to="/glossario/tpm" className="text-accent">TPM</Link> e de <Link to="/glossario/bitlocker" className="text-accent">BitLocker</Link>.</p>
        <h2>5. Ordem de boot: mude o destino, nÃ£o o modo inteiro</h2>
        <p>Se o objetivo Ã© iniciar por um pendrive de instalaÃ§Ã£o ou diagnÃ³stico, normalmente basta usar o menu de boot temporÃ¡rio ou ajustar a prioridade do dispositivo. Isso Ã© diferente de trocar UEFI por Legacy/CSM. Depois do teste, confirme que o Windows Boot Manager ou o disco correto voltou a ser a primeira opÃ§Ã£o.</p>
        <p>O passo a passo especÃ­fico estÃ¡ em <Link to="/blog/ordem-de-boot-na-bios-como-configurar" className="text-accent">ordem de boot na BIOS/UEFI</Link>.</p>
        <h2>6. AHCI, RAID, VMD e RST: nÃ£o troque por regra de internet</h2>
        <p>O modo de armazenamento precisa ser compatÃ­vel com a instalaÃ§Ã£o atual e com o controlador do equipamento. Trocar AHCI, RAID, VMD ou RST depois que o sistema foi instalado pode fazer o Windows perder acesso ao volume de inicializaÃ§Ã£o. NÃ£o existe uma regra segura de â€œsempre use AHCIâ€.</p>
        <p>Se um SSD â€œsumiuâ€, confirme primeiro se ele aparece no firmware, no controlador correto e na documentaÃ§Ã£o do modelo. Para falhas de detecÃ§Ã£o, use o guia <Link to="/blog/ssd-nvme-nao-aparece-no-gerenciador-de-discos" className="text-accent">SSD/NVMe nÃ£o aparece no Windows</Link>.</p>
        <h2>7. XMP/EXPO e memÃ³ria: perfil anunciado nÃ£o Ã© garantia de estabilidade</h2>
        <p>Perfis de memÃ³ria como XMP ou EXPO aplicam parÃ¢metros definidos para o kit e a plataforma. Eles podem melhorar a operaÃ§Ã£o em relaÃ§Ã£o ao perfil bÃ¡sico, mas a estabilidade depende de processador, placa-mÃ£e, BIOS e combinaÃ§Ã£o dos mÃ³dulos. Se o objetivo Ã© diagnosticar travamentos, reinÃ­cios ou erros de memÃ³ria, o primeiro passo Ã© testar uma configuraÃ§Ã£o conhecida e estÃ¡vel â€” nÃ£o aumentar frequÃªncia.</p>
        <p>ApÃ³s qualquer mudanÃ§a, valide com uso real e, quando necessÃ¡rio, teste de memÃ³ria. Consulte <Link to="/blog/testar-memoria-ram-memtest86" className="text-accent">como testar memÃ³ria RAM</Link>.</p>
        <h2>8. AtualizaÃ§Ã£o de BIOS/UEFI: sÃ³ com motivo e procedimento do fabricante</h2>
        <p>AtualizaÃ§Ã£o de firmware pode corrigir compatibilidade, seguranÃ§a ou suporte a hardware, mas nÃ£o deve ser tratada como â€œotimizaÃ§Ã£o automÃ¡ticaâ€. Use exclusivamente o arquivo e o mÃ©todo do fabricante para o modelo exato, mantenha alimentaÃ§Ã£o estÃ¡vel e leia as notas da versÃ£o.</p>
        <p>Antes de atualizar, confirme a chave de recuperaÃ§Ã£o do BitLocker e qualquer requisito especÃ­fico do fabricante. Uma interrupÃ§Ã£o ou imagem incompatÃ­vel pode deixar a placa sem inicializaÃ§Ã£o.</p>
        <h2>Quando parar imediatamente</h2>
        <ul>
          <li>O firmware ou a recuperaÃ§Ã£o do Windows pede uma chave BitLocker que vocÃª nÃ£o possui.</li>
          <li>O disco do sistema deixou de aparecer depois de alterar AHCI/RAID/VMD/RST.</li>
          <li>O equipamento Ã© corporativo e vocÃª nÃ£o sabe se Secure Boot/TPM sÃ£o gerenciados.</li>
          <li>VocÃª estÃ¡ prestes a usar Clear TPM, Secure Erase, apagar chaves ou atualizar firmware sem backup e sem documentaÃ§Ã£o.</li>
          <li>Depois de uma alteraÃ§Ã£o o PC entra em loop, nÃ£o dÃ¡ vÃ­deo ou nÃ£o encontra o Windows.</li>
        </ul>
        <h2>O que nÃ£o fazer</h2>
        <ul>
          <li>NÃ£o copie valores de tensÃ£o, clock ou timings de outro computador.</li>
          <li>NÃ£o altere vÃ¡rias opÃ§Ãµes ao mesmo tempo: vocÃª perde a capacidade de identificar a causa.</li>
          <li>NÃ£o trate â€œLoad Defaultsâ€ como soluÃ§Ã£o neutra em mÃ¡quina com RAID, BitLocker ou configuraÃ§Ã£o especial.</li>
          <li>NÃ£o desative Secure Boot, TPM ou recursos de seguranÃ§a sÃ³ para â€œfazer funcionarâ€ sem entender a dependÃªncia.</li>
          <li>NÃ£o atualize firmware durante instabilidade elÃ©trica ou com arquivo de outro modelo.</li>
        </ul>
        <h2>Checklist de validaÃ§Ã£o</h2>
        <ul>
          <li>Windows Boot Manager continua visÃ­vel e o sistema inicia.</li>
          <li>SSD/HD aparecem com a mesma topologia esperada.</li>
          <li>Secure Boot e TPM estÃ£o no estado planejado, sem alertas inesperados.</li>
          <li>BitLocker nÃ£o entrou em recuperaÃ§Ã£o sem que a chave esteja disponÃ­vel.</li>
          <li>Data/hora, rede, USB e perifÃ©ricos essenciais continuam funcionando.</li>
          <li>Se houve alteraÃ§Ã£o de memÃ³ria, a mÃ¡quina passou por teste de estabilidade.</li>
        </ul>
        <h2>DecisÃ£o: qual ajuste realmente faz sentido?</h2>
        <p>Se o problema Ã© apenas escolher um dispositivo de inicializaÃ§Ã£o, mexa na ordem de boot. Se Ã© requisito do Windows 11, trate UEFI, Secure Boot e TPM separadamente. Se o disco nÃ£o aparece, diagnostique controlador e armazenamento antes de trocar o modo. Se o problema Ã© instabilidade, volte ao baseline antes de ativar perfis de desempenho.</p>
        <h2>DÃºvidas rÃ¡pidas antes de comeÃ§ar</h2>
        <h3>Preciso ativar Secure Boot para usar Windows 11?</h3>
        <p>O Windows 11 exige que o computador seja compatÃ­vel com Secure Boot em UEFI; manter o recurso habilitado melhora a proteÃ§Ã£o de inicializaÃ§Ã£o e Ã© a recomendaÃ§Ã£o geral da Microsoft.</p>
        <h3>Ativar TPM apaga meus arquivos?</h3>
        <p>Habilitar um TPM disponÃ­vel nÃ£o Ã© o mesmo que limpÃ¡-lo. O risco maior estÃ¡ em operaÃ§Ãµes de limpeza/redefiniÃ§Ã£o de chaves e em mudanÃ§as que acionem recuperaÃ§Ã£o de criptografia. Tenha a chave BitLocker antes de intervenÃ§Ãµes.</p>
        <h3>Posso ativar XMP/EXPO em qualquer PC?</h3>
        <p>NÃ£o como regra universal. Compatibilidade e estabilidade dependem do conjunto CPU, placa-mÃ£e, firmware e mÃ³dulos. Em diagnÃ³stico, priorize um baseline estÃ¡vel.</p>
        <h3>BIOS desatualizada deixa o PC lento?</h3>
        <p>NÃ£o Ã© um diagnÃ³stico suficiente. Atualize firmware quando houver correÃ§Ã£o, requisito ou suporte relevante documentado pelo fabricante â€” nÃ£o como ritual de limpeza.</p>
        <h2>GlossÃ¡rio rÃ¡pido</h2>
        <dl>
          <dt>UEFI</dt><dd>Interface de firmware moderna responsÃ¡vel por inicializar o hardware e entregar o controle ao sistema operacional.</dd>
          <dt>Secure Boot</dt><dd>Mecanismo que verifica componentes confiÃ¡veis durante a inicializaÃ§Ã£o.</dd>
          <dt>TPM</dt><dd>MÃ³dulo ou implementaÃ§Ã£o de firmware usada para proteger chaves e recursos de seguranÃ§a.</dd>
          <dt>CSM/Legacy</dt><dd>Modo de compatibilidade com formas antigas de inicializaÃ§Ã£o.</dd>
          <dt>BitLocker</dt><dd>Criptografia de volume do Windows que pode exigir chave de recuperaÃ§Ã£o apÃ³s mudanÃ§as relevantes.</dd>
        </dl>
        <p>Para organizar o diagnÃ³stico como um tÃ©cnico de informÃ¡tica â€” firmware, armazenamento, Windows e seguranÃ§a â€” siga o <Link to="/guia-tecnico-informatica#tema-sistemas-operacionais" className="text-accent">Atlas de sistemas operacionais</Link>.</p>
        <EditorialReferences slug="como-configurar-bios-uefi-corretamente" />
      </>
    ),
  },

  "como-montar-pc-do-zero-guia-completo": {
    title: "Como Montar um PC do Zero: Guia TÃ©cnico Passo a Passo",
    excerpt: "Da escolha de componentes Ã  primeira inicializaÃ§Ã£o, com dicas para evitar erros comuns.",
    date: "2026-04-08",
    readTime: "15 min",
    category: "Procedimentos TÃ©cnicos",
    content: (
      <>
        <p className="lead">Montar um PC Ã© mais simples do que parece â€” mas <strong>erros na montagem podem custar caro</strong>. Um componente incompatÃ­vel, um cabo esquecido ou um cooler mal instalado podem causar desde mau desempenho atÃ© danos permanentes. Este guia cobre todo o processo do zero.</p>

        <h2>1. Compatibilidade de Componentes</h2>
        <p>Antes de comprar qualquer peÃ§a, verifique a compatibilidade:</p>
        <ul>
          <li><strong>CPU + Placa-mÃ£e:</strong> O soquete deve ser compatÃ­vel (ex: Intel LGA 1700, AMD AM5)</li>
          <li><strong>RAM + Placa-mÃ£e:</strong> DDR4 nÃ£o encaixa em slot DDR5 e vice-versa</li>
          <li><strong>Fonte + GPU:</strong> A fonte precisa ter potÃªncia e conectores suficientes</li>
          <li><strong>Gabinete + Placa-mÃ£e:</strong> ATX, Micro-ATX ou Mini-ITX devem combinar</li>
          <li><strong>Cooler + Soquete:</strong> Verifique se o cooler suporta o soquete da CPU</li>
        </ul>

        <h2>2. PreparaÃ§Ã£o do Ambiente</h2>
        <ul>
          <li>SuperfÃ­cie limpa, ampla e bem iluminada</li>
          <li>Pulseira antiestÃ¡tica (ou toque no gabinete frequentemente)</li>
          <li>Chave Phillips #1 e #2</li>
          <li>Manuais das peÃ§as abertos para consulta</li>
        </ul>

        <h2>3. Ordem de Montagem</h2>

        <h3>Passo 1: Instalar CPU na Placa-MÃ£e</h3>
        <p>Abra o mecanismo de retenÃ§Ã£o do soquete. Alinhe o triÃ¢ngulo dourado da CPU com a marca no soquete. <strong>NÃ£o force â€” a CPU encaixa por gravidade.</strong> Feche a trava.</p>

        <h3>Passo 2: Instalar a RAM</h3>
        <p>Abra as travas dos slots. Alinhe o encaixe (notch) do pente com o slot. Pressione firmemente atÃ© ouvir o clique nas duas extremidades. <strong>Para 2 pentes, use os slots alternados</strong> (geralmente 2 e 4) para ativar dual-channel.</p>

        <h3>Passo 3: Instalar o SSD M.2 (se aplicÃ¡vel)</h3>
        <p>Localize o slot M.2 na placa-mÃ£e. Insira em Ã¢ngulo de 30Â°, pressione e fixe com o parafuso.</p>

        <h3>Passo 4: Instalar o Cooler</h3>
        <p>Aplique pasta tÃ©rmica (grÃ£o de arroz no centro). Monte o cooler seguindo as instruÃ§Ãµes do fabricante. <strong>Conecte o cabo do fan no header CPU_FAN</strong> â€” sem isso, o PC pode nÃ£o ligar.</p>

        <h3>Passo 5: Instalar Placa-MÃ£e no Gabinete</h3>
        <p>Coloque o I/O shield (espelho traseiro). Posicione a placa sobre os standoffs (espaÃ§adores). Parafuse sem apertar demais.</p>

        <h3>Passo 6: Instalar a Fonte</h3>
        <p>Fixe a fonte no gabinete. Conecte os cabos: ATX 24 pinos (placa-mÃ£e), EPS 8 pinos (CPU), SATA power (HDs/SSDs).</p>

        <h3>Passo 7: Instalar a Placa de VÃ­deo</h3>
        <p>Remova as tampas traseiras necessÃ¡rias. Insira no slot PCIe x16 atÃ© ouvir o clique. Conecte os cabos de energia (6+2 pinos). <strong>NÃ£o use adaptadores Molex â†’ PCIe</strong>.</p>

        <h3>Passo 8: Conectar Cabos do Painel Frontal</h3>
        <p>Power SW, Reset SW, Power LED, HDD LED â€” consulte o manual da placa-mÃ£e para a posiÃ§Ã£o exata dos pinos. USB 3.0 frontal conecta no header interno.</p>

        <h3>Passo 9: Gerenciamento de Cabos</h3>
        <p>Organize os cabos atrÃ¡s da bandeja do gabinete para melhor fluxo de ar.</p>

        <h2>4. Primeira InicializaÃ§Ã£o</h2>
        <ol>
          <li>Conecte monitor, teclado e mouse</li>
          <li>Ligue a fonte (chave traseira)</li>
          <li>Pressione o botÃ£o power</li>
          <li>Entre na BIOS e verifique se CPU, RAM e discos sÃ£o reconhecidos</li>
          <li>Configure boot order para USB e instale o Windows</li>
        </ol>

        <h2>Checklist de Problemas Comuns</h2>
        <ul>
          <li><strong>PC nÃ£o liga:</strong> Verifique cabo ATX 24 pinos e EPS 8 pinos. Chave da fonte estÃ¡ ligada?</li>
          <li><strong>Sem imagem:</strong> RAM encaixada corretamente? GPU com energia? Monitor no cabo certo?</li>
          <li><strong>Apenas ventiladores giram:</strong> RAM incompatÃ­vel ou mal encaixada Ã© a causa mais comum</li>
          <li><strong>Reinicia em loop:</strong> CPU sem cooler ou pasta tÃ©rmica</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Montagem de PC em Curitiba</h3>
          <p className="text-muted-foreground mb-0">Montamos seu PC gamer, workstation ou escritÃ³rio com componentes de sua escolha. Teste de estresse incluso. Atendimento em Curitiba.</p>
        </div>

        <p><strong>Leia tambÃ©m:</strong></p>
        <ul>
          <li><Link to="/blog/como-configurar-bios-uefi-corretamente" className="text-accent">Como configurar BIOS/UEFI corretamente</Link></li>
          <li><Link to="/blog/erros-comuns-upgrade-computador" className="text-accent">5 erros comuns ao fazer upgrade</Link></li>
          <li><Link to="/servicos/montagem-pc" className="text-accent">ServiÃ§o de Montagem de PC</Link></li>
        </ul>
      </>
    ),
  },

  "como-instalar-linux-dual-boot-windows": {
    title: "Como Instalar Linux em Dual Boot com Windows: Procedimento Seguro",
    excerpt: "Ubuntu, Mint ou Fedora ao lado do Windows sem perder dados. Procedimento passo a passo.",
    date: "2026-04-08",
    readTime: "10 min",
    category: "Procedimentos TÃ©cnicos",
    content: (
      <>
        <p className="lead">Dual boot permite ter <strong>Windows e Linux no mesmo computador</strong>, escolhendo qual sistema usar a cada inicializaÃ§Ã£o. Ã‰ ideal para quem quer experimentar Linux sem abandonar o Windows. O procedimento exige cuidado para nÃ£o perder dados.</p>

        <h2>PrÃ©-Requisitos</h2>
        <ul>
          <li><strong>Backup completo dos dados importantes</strong> (essencial!)</li>
          <li>Pen drive de 8 GB ou mais</li>
          <li>Pelo menos 50 GB de espaÃ§o livre no disco</li>
          <li>DistribuiÃ§Ã£o Linux escolhida (Ubuntu, Linux Mint, Fedora)</li>
          <li>Software para criar USB bootÃ¡vel: <strong>Rufus</strong> (Windows) ou <strong>Balena Etcher</strong></li>
        </ul>

        <h2>Passo 1: Escolha a DistribuiÃ§Ã£o</h2>
        <ul>
          <li><strong>Ubuntu:</strong> Mais popular, maior comunidade, ideal para iniciantes</li>
          <li><strong>Linux Mint:</strong> Interface similar ao Windows, muito amigÃ¡vel</li>
          <li><strong>Fedora:</strong> Mais atual, bom para desenvolvedores</li>
          <li><strong>Pop!_OS:</strong> Excelente para hardware NVIDIA</li>
        </ul>

        <h2>Passo 2: Criar EspaÃ§o no Disco</h2>
        <p>No Windows, abra <strong>Gerenciamento de Disco</strong> (diskmgmt.msc):</p>
        <ol>
          <li>Clique com botÃ£o direito na partiÃ§Ã£o do Windows (geralmente C:)</li>
          <li>Selecione "Diminuir Volume"</li>
          <li>Insira o tamanho a reduzir (mÃ­nimo 50.000 MB = 50 GB)</li>
          <li>O espaÃ§o ficarÃ¡ como "NÃ£o Alocado" â€” deixe assim</li>
        </ol>

        <h2>Passo 3: Criar USB BootÃ¡vel</h2>
        <ol>
          <li>Baixe a ISO da distribuiÃ§Ã£o escolhida (site oficial)</li>
          <li>Abra o Rufus, selecione o pen drive e a ISO</li>
          <li>Esquema de partiÃ§Ã£o: <strong>GPT</strong> (para UEFI)</li>
          <li>Clique em Iniciar e aguarde</li>
        </ol>

        <h2>Passo 4: Desativar Fast Startup e Secure Boot</h2>
        <ul>
          <li><strong>Fast Startup:</strong> Painel de Controle â†’ OpÃ§Ãµes de Energia â†’ "Alterar o que os botÃµes de energia fazem" â†’ Desmarque "Ligar inicializaÃ§Ã£o rÃ¡pida"</li>
          <li><strong>Secure Boot:</strong> Desative na BIOS (pode ser reativado depois em algumas distros)</li>
          <li><strong>BitLocker:</strong> Se ativo, suspenda antes de mexer nas partiÃ§Ãµes</li>
        </ul>

        <h2>Passo 5: Boot pelo Pen Drive</h2>
        <p>Reinicie e entre no menu de boot (geralmente F12, F8 ou ESC). Selecione o pen drive USB UEFI.</p>

        <h2>Passo 6: InstalaÃ§Ã£o do Linux</h2>
        <ol>
          <li>Escolha "Instalar ao lado do Windows" (opÃ§Ã£o mais segura)</li>
          <li>O instalador reconhece o espaÃ§o nÃ£o alocado automaticamente</li>
          <li>Se preferir particionamento manual: crie partiÃ§Ã£o <strong>EXT4</strong> para / (raiz) e opcionalmente uma partiÃ§Ã£o <strong>swap</strong> (igual Ã  RAM)</li>
          <li>Selecione o bootloader no disco principal (sda ou nvme0n1)</li>
          <li>Prossiga com a instalaÃ§Ã£o normalmente</li>
        </ol>

        <h2>Passo 7: GRUB (Menu de Boot)</h2>
        <p>ApÃ³s reiniciar, o <strong>GRUB</strong> aparecerÃ¡ oferecendo a escolha entre Linux e Windows. Se o GRUB nÃ£o aparecer, entre na BIOS e altere a ordem de boot para o Linux primeiro.</p>

        <h2>Problemas Comuns</h2>
        <ul>
          <li><strong>Windows nÃ£o aparece no GRUB:</strong> Execute <code>sudo update-grub</code> no Linux</li>
          <li><strong>HorÃ¡rio errado alternando entre sistemas:</strong> No Linux, execute <code>timedatectl set-local-rtc 1</code></li>
          <li><strong>Wi-Fi nÃ£o funciona no Linux:</strong> Alguns chips Realtek e Broadcom precisam de drivers adicionais</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">InstalaÃ§Ã£o de Linux em Curitiba</h3>
          <p className="text-muted-foreground mb-0">Instalamos e configuramos Linux (Ubuntu, Mint, Fedora) em dual boot com Windows, com drivers e aplicativos. Atendimento em domicÃ­lio.</p>
        </div>
      </>
    ),
  },

  "como-configurar-backup-automatizado": {
    title: "Como Configurar Backup Automatizado: Local e Nuvem",
    excerpt: "Procedimento tÃ©cnico para implementar backup 3-2-1 com agendamento automÃ¡tico.",
    date: "2026-04-08",
    readTime: "9 min",
    category: "Procedimentos TÃ©cnicos",
    content: (
      <>
        <p className="lead">A regra de ouro do backup Ã© a <strong>estratÃ©gia 3-2-1</strong>: 3 cÃ³pias dos dados, em 2 tipos de mÃ­dia diferentes, com 1 cÃ³pia off-site (fora do local). Este guia mostra como implementar backup automatizado para residÃªncias e empresas.</p>

        <h2>A Regra 3-2-1 Na PrÃ¡tica</h2>
        <ul>
          <li><strong>CÃ³pia 1:</strong> Dados originais no computador (SSD/HD principal)</li>
          <li><strong>CÃ³pia 2:</strong> Backup local â€” HD externo, NAS ou outro disco</li>
          <li><strong>CÃ³pia 3:</strong> Backup na nuvem â€” Google Drive, OneDrive, Backblaze, etc.</li>
        </ul>

        <h2>Backup Local Automatizado no Windows</h2>

        <h3>MÃ©todo 1: HistÃ³rico de Arquivos (Windows 10/11)</h3>
        <ol>
          <li>Conecte um HD externo</li>
          <li>ConfiguraÃ§Ãµes â†’ AtualizaÃ§Ã£o e SeguranÃ§a â†’ Backup</li>
          <li>Ative "Fazer backup automaticamente dos meus arquivos"</li>
          <li>Em "Mais opÃ§Ãµes", configure intervalo (a cada 1 hora Ã© ideal) e quais pastas incluir</li>
        </ol>

        <h3>MÃ©todo 2: Imagem do Sistema (Backup Completo)</h3>
        <ol>
          <li>Painel de Controle â†’ Backup e RestauraÃ§Ã£o (Windows 7)</li>
          <li>Clique em "Criar uma imagem do sistema"</li>
          <li>Selecione o disco de destino</li>
          <li>Inclua todas as partiÃ§Ãµes do sistema</li>
          <li>Para automatizar, crie uma tarefa no <strong>Agendador de Tarefas</strong> usando <code>wbAdmin</code></li>
        </ol>

        <h3>MÃ©todo 3: Robocopy (Para TÃ©cnicos)</h3>
        <p>Script batch automatizado com Robocopy para backup incremental:</p>
        <p><code>robocopy "C:\Users\Dados" "D:\Backup" /MIR /R:3 /W:10 /LOG:D:\backup.log</code></p>
        <p>Agende no <strong>Agendador de Tarefas</strong> para rodar diariamente Ã s 2h da manhÃ£.</p>

        <h2>Backup na Nuvem</h2>

        <h3>OpÃ§Ãµes Gratuitas</h3>
        <ul>
          <li><strong>Google Drive:</strong> 15 GB grÃ¡tis. App Desktop sincroniza pastas automaticamente</li>
          <li><strong>OneDrive:</strong> 5 GB grÃ¡tis (15 GB com Microsoft 365). Integrado ao Windows</li>
          <li><strong>Mega:</strong> 20 GB grÃ¡tis com criptografia de ponta a ponta</li>
        </ul>

        <h3>OpÃ§Ãµes Profissionais (Ilimitado)</h3>
        <ul>
          <li><strong>Backblaze:</strong> US$ 7/mÃªs, backup ilimitado, ideal para empresas pequenas</li>
          <li><strong>Acronis Cyber Protect:</strong> Backup + antivÃ­rus + anti-ransomware integrado</li>
          <li><strong>Veeam:</strong> SoluÃ§Ã£o empresarial, suporta servidores e mÃ¡quinas virtuais</li>
        </ul>

        <h2>Backup Para Empresas (NAS)</h2>
        <p>Para empresas com mÃºltiplos computadores, o ideal Ã© um <strong>NAS (Network Attached Storage)</strong>:</p>
        <ul>
          <li><strong>Synology DS220+:</strong> 2 baias, interface web intuitiva, apps de backup automÃ¡tico</li>
          <li><strong>QNAP TS-251D:</strong> 2 baias, suporte a RAID 1 (espelhamento)</li>
          <li>Configure <strong>RAID 1</strong> para que se um HD falhar, o outro mantÃ©m os dados</li>
          <li>Sincronize o NAS com nuvem (Synology C2 ou Backblaze B2) para backup off-site</li>
        </ul>

        <h2>Testando o Backup</h2>
        <p><strong>Um backup que nunca foi testado nÃ£o Ã© um backup.</strong> Periodicamente:</p>
        <ul>
          <li>Tente restaurar um arquivo aleatÃ³rio do backup</li>
          <li>Verifique se o backup mais recente estÃ¡ sendo feito (veja data e hora)</li>
          <li>Teste a restauraÃ§Ã£o completa do sistema em uma mÃ¡quina separada</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">ConfiguraÃ§Ã£o de Backup em Curitiba</h3>
          <p className="text-muted-foreground mb-0">Implementamos backup automatizado para sua casa ou empresa. Local + nuvem com monitoramento. Nunca mais perca arquivos importantes.</p>
        </div>

        <p><strong>Leia tambÃ©m:</strong></p>
        <ul>
          <li><Link to="/blog/backup-como-proteger-seus-arquivos" className="text-accent">Backup: como proteger seus arquivos</Link></li>
          <li><Link to="/blog/backup-nuvem-empresas-qual-escolher" className="text-accent">Backup na nuvem para empresas</Link></li>
          <li><Link to="/servicos/recuperacao-de-dados" className="text-accent">RecuperaÃ§Ã£o de dados e backup</Link></li>
        </ul>
      </>
    ),
  },

  "preciso-de-um-para-eletricistas": {
    title: "Preciso de Um Para Eletricistas: Como Conseguir Mais Clientes",
    excerpt: "Guia completo para eletricistas se cadastrarem e se destacarem na plataforma.",
    date: "2026-04-08",
    readTime: "7 min",
    category: "Plataformas",
    content: (
      <>
        <p className="lead">Se vocÃª Ã© eletricista e ainda depende sÃ³ de indicaÃ§Ã£o, estÃ¡ perdendo clientes para colegas que jÃ¡ estÃ£o online. O <a href="https://precisodeum.com.br" target="_blank" rel="noopener noreferrer" className="text-accent">Preciso de Um</a> Ã© a plataforma onde clientes buscam eletricistas por regiÃ£o â€” e <strong>os profissionais cadastrados recebem contatos diretos via WhatsApp</strong>.</p>

        <h2>Por Que Eletricistas Devem Estar na Plataforma?</h2>
        <p>Eletricista Ã© uma das <strong>categorias mais procuradas</strong> no Preciso de Um. ServiÃ§os elÃ©tricos sÃ£o urgentes por natureza â€” quando uma tomada para de funcionar ou um curto-circuito acontece, o cliente precisa de alguÃ©m <strong>agora</strong>. Quem aparece primeiro, fecha o serviÃ§o.</p>

        <h2>ServiÃ§os Que VocÃª Pode Oferecer</h2>
        <ul>
          <li>âš¡ InstalaÃ§Ã£o e troca de fiaÃ§Ã£o elÃ©trica</li>
          <li>âš¡ Troca de disjuntores e quadro de distribuiÃ§Ã£o</li>
          <li>âš¡ InstalaÃ§Ã£o de tomadas, interruptores e luminÃ¡rias</li>
          <li>âš¡ InstalaÃ§Ã£o de chuveiro elÃ©trico</li>
          <li>âš¡ Laudo tÃ©cnico e adequaÃ§Ã£o de instalaÃ§Ãµes</li>
          <li>âš¡ InstalaÃ§Ã£o de geradores e nobreaks</li>
          <li>âš¡ Projetos elÃ©tricos residenciais e comerciais</li>
        </ul>

        <h2>Faixa de PreÃ§o na Plataforma</h2>
        <p>ServiÃ§os elÃ©tricos no Preciso de Um tÃªm faixa de <strong>R$ 120 a R$ 216</strong> para serviÃ§os bÃ¡sicos. Projetos maiores como adequaÃ§Ã£o de quadro ou troca completa de fiaÃ§Ã£o podem chegar a R$ 2.000+. VocÃª define seus preÃ§os.</p>

        <h2>Como Se Destacar Como Eletricista</h2>
        <ol>
          <li><strong>Destaque certificaÃ§Ãµes:</strong> NR-10, NR-35, CREA se tiver</li>
          <li><strong>Fotos de trabalhos:</strong> Quadros organizados, instalaÃ§Ãµes limpas</li>
          <li><strong>Resposta rÃ¡pida:</strong> Clientes com problema elÃ©trico nÃ£o esperam</li>
          <li><strong>Ãrea de atendimento clara:</strong> Defina bairros e cidades que atende</li>
          <li><strong>OfereÃ§a garantia:</strong> Diferencial que transmite seguranÃ§a</li>
        </ol>

        <h2>Exemplo de Sucesso</h2>
        <p>Eletricistas como <strong>Angel Americo</strong> (AraucÃ¡ria, 6+ anos de experiÃªncia) e <strong>Eloiza Kirach</strong> (Pinhais) jÃ¡ estÃ£o na plataforma recebendo contatos diÃ¡rios. VocÃª pode ser o prÃ³ximo.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Cadastre-se Como Eletricista</h3>
          <p className="text-muted-foreground mb-4">Crie seu perfil gratuito no Preciso de Um e comece a receber clientes que precisam de serviÃ§os elÃ©tricos na sua regiÃ£o.</p>
          <a href="https://precisodeum.com.br/cadastro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
            Cadastrar agora â†’
          </a>
        </div>
      </>
    ),
  },

  "preciso-de-um-para-pintores-pedreiros": {
    title: "Preciso de Um Para Pintores e Pedreiros: Sua Vitrine Digital",
    excerpt: "Como profissionais de construÃ§Ã£o e pintura podem atrair clientes pela plataforma.",
    date: "2026-04-08",
    readTime: "7 min",
    category: "Plataformas",
    content: (
      <>
        <p className="lead">Pintores e pedreiros sÃ£o profissionais com altÃ­ssima demanda â€” mas que frequentemente dependem apenas do boca a boca. O <a href="https://precisodeum.com.br" target="_blank" rel="noopener noreferrer" className="text-accent">Preciso de Um</a> funciona como sua <strong>vitrine digital</strong>: clientes buscam profissionais de construÃ§Ã£o e pintura, veem seu portfÃ³lio e entram em contato direto.</p>

        <h2>ConstruÃ§Ã£o Civil: A Categoria Mais Forte</h2>
        <p><strong>ConstruÃ§Ã£o Civil Ã© a categoria com mais profissionais</strong> no Preciso de Um â€” o que comprova a demanda. Profissionais como <strong>Rodrigo Macariu</strong> (Fazenda Rio Grande, 10+ anos) e <strong>Sidnei Santos de Paula</strong> (AraucÃ¡ria, serralheiro com 31+ anos) jÃ¡ estÃ£o presentes e recebendo contatos.</p>

        <h2>ServiÃ§os de Pintura</h2>
        <ul>
          <li>ðŸŽ¨ Pintura residencial interna e externa</li>
          <li>ðŸŽ¨ Pintura comercial</li>
          <li>ðŸŽ¨ Textura e efeitos decorativos</li>
          <li>ðŸŽ¨ Pintura de fachadas</li>
          <li>ðŸŽ¨ ImpermeabilizaÃ§Ã£o</li>
          <li>ðŸŽ¨ Pintura epÃ³xi para pisos</li>
        </ul>

        <h2>ServiÃ§os de ConstruÃ§Ã£o</h2>
        <ul>
          <li>ðŸ—ï¸ Reformas residenciais e comerciais</li>
          <li>ðŸ—ï¸ Alvenaria e reboco</li>
          <li>ðŸ—ï¸ Pisos e revestimentos</li>
          <li>ðŸ—ï¸ ConstruÃ§Ã£o de muros e portÃµes</li>
          <li>ðŸ—ï¸ Telhados e coberturas</li>
          <li>ðŸ—ï¸ Acabamento e gesso</li>
        </ul>

        <h2>O Poder do PortfÃ³lio Visual</h2>
        <p>Para pintores e pedreiros, <strong>fotos de trabalhos anteriores sÃ£o o melhor argumento de venda</strong>. Na plataforma, vocÃª pode adicionar fotos do antes e depois, mostrando a qualidade do seu trabalho.</p>

        <h3>Dicas Para Fotos de PortfÃ³lio</h3>
        <ul>
          <li>ðŸ“¸ Tire fotos do <strong>antes e depois</strong></li>
          <li>ðŸ“¸ Fotografe com boa iluminaÃ§Ã£o (luz natural)</li>
          <li>ðŸ“¸ Mostre detalhes de acabamento</li>
          <li>ðŸ“¸ Inclua obras de diferentes tamanhos (apartamento, casa, comercial)</li>
        </ul>

        <h2>Por Que o Digital Ã© Essencial</h2>
        <p>O cliente moderno pesquisa antes de contratar. Se vocÃª nÃ£o estÃ¡ online, ele vai contratar quem estÃ¡. Com um perfil no Preciso de Um, vocÃª:</p>
        <ul>
          <li>âœ… Ã‰ encontrado por clientes que precisam do seu serviÃ§o AGORA</li>
          <li>âœ… Mostra experiÃªncia e portfÃ³lio</li>
          <li>âœ… Recebe contato direto no WhatsApp</li>
          <li>âœ… NÃ£o paga nada â€” o cadastro Ã© gratuito</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Mostre Seu Trabalho ao Mundo</h3>
          <p className="text-muted-foreground mb-4">Cadastre-se no Preciso de Um, monte seu portfÃ³lio e receba clientes que precisam de pintores e pedreiros na sua regiÃ£o.</p>
          <a href="https://precisodeum.com.br/cadastro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
            Criar meu perfil grÃ¡tis â†’
          </a>
        </div>
      </>
    ),
  },

  "preciso-de-um-para-tecnicos-informatica": {
    title: "Preciso de Um Para TÃ©cnicos em InformÃ¡tica: Amplie Sua AtuaÃ§Ã£o",
    excerpt: "Como tÃ©cnicos de TI podem usar a plataforma para expandir a carteira de clientes.",
    date: "2026-04-08",
    readTime: "7 min",
    category: "Plataformas",
    content: (
      <>
        <p className="lead">O mercado de assistÃªncia tÃ©cnica em informÃ¡tica Ã© competitivo â€” e a maioria dos tÃ©cnicos depende apenas de indicaÃ§Ã£o e redes sociais. O <a href="https://precisodeum.com.br" target="_blank" rel="noopener noreferrer" className="text-accent">Preciso de Um</a> oferece um canal adicional de captaÃ§Ã£o de clientes que <strong>funciona 24 horas, Ã© gratuito e traz clientes que jÃ¡ estÃ£o procurando exatamente o que vocÃª faz</strong>.</p>

        <h2>Por Que TÃ©cnicos de InformÃ¡tica SÃ£o Essenciais na Plataforma</h2>
        <p><strong>"TÃ©cnico em InformÃ¡tica"</strong> estÃ¡ entre as categorias mais buscadas no Preciso de Um, com profissionais cadastrados em Curitiba, SÃ£o Paulo, Rio de Janeiro e BelÃ©m. A demanda Ã© constante porque computadores quebram todos os dias.</p>

        <h2>ServiÃ§os Que VocÃª Pode Anunciar</h2>
        <ul>
          <li>ðŸ’» FormataÃ§Ã£o de computador e notebook</li>
          <li>ðŸ’» RemoÃ§Ã£o de vÃ­rus e malware</li>
          <li>ðŸ’» Upgrade de SSD e memÃ³ria RAM</li>
          <li>ðŸ’» Conserto de hardware (tela, teclado, placa-mÃ£e)</li>
          <li>ðŸ’» ConfiguraÃ§Ã£o de redes Wi-Fi</li>
          <li>ðŸ’» Backup e recuperaÃ§Ã£o de dados</li>
          <li>ðŸ’» Montagem de PC gamer e workstation</li>
          <li>ðŸ’» Suporte remoto para empresas</li>
          <li>ðŸ’» InstalaÃ§Ã£o de cÃ¢meras CFTV</li>
        </ul>

        <h2>EstratÃ©gia Para Se Destacar</h2>
        <ol>
          <li><strong>Especialize-se:</strong> "TÃ©cnico em informÃ¡tica" Ã© genÃ©rico. Destaque especialidades: "Especialista em notebook", "RecuperaÃ§Ã£o de dados", "Redes empresariais"</li>
          <li><strong>Defina sua regiÃ£o:</strong> Clientes buscam por proximidade. Quanto mais especÃ­fico, melhor</li>
          <li><strong>PreÃ§o transparente:</strong> Indique faixas de preÃ§o. Clientes nÃ£o gostam de surpresas</li>
          <li><strong>Tempo de resposta:</strong> Seja rÃ¡pido no WhatsApp. O primeiro que responde geralmente fecha</li>
          <li><strong>PeÃ§a avaliaÃ§Ãµes:</strong> ApÃ³s cada serviÃ§o, peÃ§a ao cliente para avaliar na plataforma</li>
        </ol>

        <h2>Vantagem Sobre Outras Plataformas</h2>
        <ul>
          <li>âœ… <strong>Sem comissÃ£o:</strong> VocÃª recebe 100% do valor do serviÃ§o</li>
          <li>âœ… <strong>Contato direto:</strong> WhatsApp, sem chat intermediÃ¡rio</li>
          <li>âœ… <strong>Cadastro gratuito:</strong> Sem mensalidade ou taxa de adesÃ£o</li>
          <li>âœ… <strong>Parceiros de peso:</strong> Balaroti, Philips e Leroy Merlin validam a credibilidade</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Expanda Sua Carteira de Clientes</h3>
          <p className="text-muted-foreground mb-4">Cadastre-se gratuitamente no Preciso de Um e comece a receber chamados de clientes que precisam de tÃ©cnico em informÃ¡tica na sua regiÃ£o.</p>
          <a href="https://precisodeum.com.br/cadastro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
            Quero me cadastrar â†’
          </a>
        </div>

        <p><strong>Leia tambÃ©m:</strong></p>
        <ul>
          <li><Link to="/blog/preciso-de-um-plataforma-prestadores" className="text-accent">O que Ã© o Preciso de Um?</Link></li>
          <li><Link to="/blog/como-cadastrar-preciso-de-um" className="text-accent">Como se cadastrar passo a passo</Link></li>
          <li><Link to="/seja-parceiro" className="text-accent">Seja parceiro da O TÃ©cnico de InformÃ¡tica</Link></li>
        </ul>
      </>
    ),
  },

  "como-configurar-servidor-de-arquivos": {
    title: "Servidor de arquivos: como planejar SMB no Windows ou Samba sem expor dados",
    excerpt: "Guia tÃ©cnico para decidir arquitetura, usuÃ¡rios, grupos, permissÃµes, compartilhamentos SMB, Samba, firewall, backup e restauraÃ§Ã£o sem senha em script nem acesso convidado por padrÃ£o.",
    date: "2026-09-25",
    readTime: "17 min",
    category: "Redes e Infraestrutura",
    content: (
      <>
        <p className="lead">Um servidor de arquivos nÃ£o Ã© apenas â€œuma pasta compartilhadaâ€. Ele centraliza dados que vÃ¡rias pessoas podem ler, alterar e apagar; por isso, identidade, permissÃµes, rede, backup e restauraÃ§Ã£o precisam ser planejados juntos. Este guia cobre Windows e Samba em Linux sem presëÝüÓFòµë(š+myÕ&7&–ì:v3Â÷7G&öæsãÂöÆ“à¢ÆÆ“åf–æ7VÆR2GV26öçF26VwV–æFò÷276÷3ÂöÆ“à¢ÆÆ“äæò6WRÂFVf–æFV×òFRFVÆR†÷,:&–òFRFW66ç6óÂöÆ“à¢ÆÆ“åöFR&÷f"öæVv"6FÂfW"Æö6Æ—¦:|:6òRÖ—3ÂöÆ“à¢ÂööÃà ¢Æƒ#äæò•†öæR…FV×òFRW6ò“Âöƒ#à¢ÆöÃà¢ÆÆ“ä6öæf–wW&:|;VW2(i"FV×òFRW6ò(i"6öæf–wW&"6öÖòFV×òFRW6òFR—2Rf–Æ†÷3ÂöÆ“à¢ÆÆ“äFVf–æFV×òW&Ö—F–Fò÷"6FVv÷&–†¦öv÷2Â&VFW26ö6–—2“ÂöÆ“à¢ÆÆ“äFVf–æ†÷,:&–òFRFW66ç6óÂöÆ“à¢ÆÆ“ä&Æ÷VV–R6ö×&2R–ç7FÆ:|:6òFR3ÂöÆ“à¢ÂööÃà ¢Æƒ#å&&Æ÷VV"6—FW2GVÇF÷3Âöƒ#à¢Çäæò–æVÂFò&÷FVF÷"Â&ö7W&RÇ7G&öæsäf–ÇG&òFR6—FW3Â÷7G&öæsâ÷RÇ7G&öæsä&Æ÷VV–ò÷"Då3Â÷7G&öæsââW6RòDå2FòÇ7G&öæsä÷VäDå2fÖ–Ç’6†–VÆCÂ÷7G&öæsâƒ#‚ãcrã##"ã#2R#‚ãcrã##ã#2’(	B&Æ÷VV–6öçF\;¦FòGVÇFòWFöÖF–6ÖVçFRãÂ÷à ¢Æƒ#ä6öæf–wW&:|:6ò6ö×ÆWFÂöƒ#à¢Çä6öæf–wW&"GVFò—76ò:’G&&Æ†÷6òâòL:–6æ–6òFR–æf÷&Ü:F–66öæf–wW&6öçG&öÆR&VçFÂ6ö×ÆWFòÂf–ÇG&òFR6öçF\;¦FòR†÷,:&–÷2æò&÷FVF÷"Âæò6VÇVÆ"Ræò6ö×WFF÷"(	BFVæFVÖ÷27W&—F–&R&Vvœ:6òãÂ÷à ¢Âóà¢’À¢ÒÀ¢&6öÖòÖ×VF"ÖæöÖR×&VFR×v–f’#¢°¢F—FÆS¢$6öÖò×VF"òæöÖRF&VFRv’Ôf’…54”B“¢76ò76ò##b"À¢W†6W'C¢$&VæF6öÖòG&ö6"òæöÖRF7V&VFRv’Ôf’…54”B’VÒVÇVW"&÷FVF÷"(	BEÔÆ–æ²Â–çFVÆ'&2Âf—fòÂ6Æ&òÂö’âGWF÷&–ÂVÒRÖ–çWF÷2â"À¢FFS¢###bÓBÓ#’"À¢&VEF–ÖS¢#BÖ–â"À¢6FVv÷'“¢%GWF÷&–—2FöÜ:—7F–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#ä×VF"òæöÖRF&VFR…54”B’:’6–×ÆW2R;§F–Â&–FVçF–f–6"f6–ÆÖVçFR6WRv’Ôf’VçG&Rl:&–÷2Ff—¦–æ†ì:vãÂ÷à ¢Æƒ#å÷"VR×VF#Âöƒ#à¢ÇVÃà¢ÆÆ“ä–FVçF–f–6"l:6–ÂVçG&R&VFW2f—¦–æ†3ÂöÆ“à¢ÆÆ“åW'6öæÆ—¦"6öÒ7&–F—f–FFSÂöÆ“à¢ÆÆ“äì:6ò&WfVÆ"Ö&6Fò&÷FVF÷"‡6VwW&ì:v“ÂöÆ“à¢ÆÆ“äF–fW&Væ6–""ãDt‡¢RTt‡¢6Rf÷"GVÂ&æCÂöÆ“à¢Â÷VÃà ¢Æƒ#ä6öÖò×VF#Âöƒ#à¢ÆöÃà¢ÆÆ“ä6W76Rò–æVÂFò&÷FVF÷"ƒ“"ãc‚ãã÷R“"ãc‚ãã“ÂöÆ“à¢ÆÆ“äf:vÆöv–ãÂöÆ“à¢ÆÆ“ål:VÒÇ7G&öæsåv—&VÆW73Â÷7G&öæsâÂÇ7G&öæsåv’Ôf“Â÷7G&öæsâ÷RÇ7G&öæså6VÒf–óÂ÷7G&öæsãÂöÆ“à¢ÆÆ“å&ö7W&Rò6×òÇ7G&öæså54”CÂ÷7G&öæsâ÷RÇ7G&öæsäæöÖRF&VFSÂ÷7G&öæsãÂöÆ“à¢ÆÆ“äF–v—FRòæ÷fòæöÖR†L:’3"6&7FW&W2“ÂöÆ“à¢ÆÆ“å6Rf÷"GVÂ&æBÂ×VFR6W&Fòò"ãDt‡¢RòTt‡£ÂöÆ“à¢ÆÆ“å6ÇfSÂöÆ“à¢ÂööÃà ¢Æƒ#äòVR6öçFV6RFWö—3Âöƒ#à¢ÇåFöF÷2÷2F—7÷6—F—f÷26W,:6òFW66öæV7FF÷2âVÆW2ì:6òl:6ò&V6öæV7F"6÷¦–æ†÷2÷'VRòvæ÷fòrv’Ôf’&V6R÷WG&òâ6öæV7FR6FVÒÖçVÆÖVçFR6öÒòæöÖRæ÷fòRÖW6Ö6Væ†ãÂ÷à ¢Æƒ#äF–62FRæöÖW3Âöƒ#à¢ÇVÃà¢ÆÆ“äWf—FRæöÖW2öfVç6—f÷2‡f—¦–æ†÷2fVVÒ“ÂöÆ“à¢ÆÆ“äì:6ò6öÆ÷VRì;¦ÖW&òF66æVÒ6ö'&VæöÖR‡6VwW&ì:v“ÂöÆ“à¢ÆÆ“åöFR6W"Væw&:vFó¢tæõ6÷U6WUf—¦–æ†òrÂuv–f•G&æ6FòrÂuVwVRvò"CsÂöÆ“à¢ÆÆ“å&GVÂ&æC¢t666–ÇfrRt666–ÇfóTrsÂöÆ“à¢Â÷VÃà ¢Æƒ#äW66öæFW"òæöÖRF&VFSÂöƒ#à¢ÇäW†—7FR÷:|:6òÇ7G&öæsäö7VÇF"54”CÂ÷7G&öæsââì:6ò&V6öÖVæFÖ÷3¢G&¢Ö—2&ö&ÆVÖ2VR6VwW&ì:v&VÂâW6R6Væ†f÷'FRVÒfW¢F—76òãÂ÷à ¢Âóà¢’À¢ÒÀ ¢òò)H)HöæF„R(	B6ÇW7FW"–Æ÷Fòdõ$ÔD8|84òòÄTåD”L84òòD”tì955D”4òà¢òò–çFVì:|:6ò–æf÷&Ö6–öæÂâì:6òÆö6Æ—¦:v–æ¢öçFR6öÖW&6–ÂRÆö6À¢òò6öçFV6R÷"Æ–æ·26öçFW‡GV—2ÂçVæ6÷"&WWFœ:|:6òFR6–FFRæòFW‡Fòà¢&6öÖòÖf÷&ÖF"×2×6VÒ×W&FW"Ö'V—f÷2#¢°¢F—FÆS¢$6öÖòf÷&ÖF"ò2÷Ræ÷FV&öö²6VÒW&FW"'V—f÷2"À¢W†6W'C ¢$òVRFV6–F—"çFW2FRf÷&ÖF#¢VæFò&V–ç7FÆ:|:6ò&W6öÇfRÂVæFòì:6ò&W6öÇfRÂ6öÖò&W6W'f"'V—f÷2Â6öçF2RÆ–6Vì:v2ÂRF–fW&Vì:vVçG&R&VFVf–æ—"ò6—7FVÖR–ç7FÆ"Fò¦W&òâ"À¢FFS¢###bÓ‚ÓB"À¢&VEF–ÖS¢#"Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#äf÷&ÖF":’VÖFV6—<:6òÂì:6òVÒ&÷L:6òâfV—Fæ†÷&6W'FÂFWföÇfRVÖÜ:V–æ&Wf—<:×fVÂâfV—F6öÖòÇ—FRÂvæ÷2FR'V—fòRFWföÇfRòÖW6Öò&ö&ÆVÖVÒGV26VÖæ2âW7FRwV–Ö÷7G&6öÖòFV6–F—"R6öÖòW†V7WF"6VÒW&FW"òVR–×÷'FãÂ÷à ¢Æƒ#äçFW3¢f÷&ÖF"&W6öÇfRò6WR66óóÂöƒ#à¢Çå&V–ç7FÆ"ò6—7FVÖ&W6öÇfRòVR:’6ögGv&S¢6öæf–wW&:|:6òVV'&FÂW&f–Â6÷'&ö×–FòÂ&W<:ÖGVòFR&öw&Ö2FW6–ç7FÆF÷2VÆÖWFFRÂGVÆ—¦:|:6òÖÂÆ–6FÂ–æfV<:|:6òW'6—7FVçFRâì:6ò&W6öÇfRòVR:’l:×6–6òæVÒòVR:’Æ–Ö—FRFR†&Gv&RãÂ÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsäF—66òÖV<:&æ–6ò6öÒv–æF÷w2ó£Â÷7G&öæsâÜ:V–æföÇF,:–F÷"÷V6÷2F–2R&Vw&–FRâòv&vÆò:’f–ÆFRÆV—GW&FòF—66òÂì:6òò6—7FVÖãÂöÆ“à¢ÆÆ“ãÇ7G&öæså÷V6ÖVÜ;7&–£Â÷7G&öæsâò6—7FVÖ&V<:–ÒÖ–ç7FÆFò'&RÖVæ÷26ö—62òÖW6ÖòFV×ò(	B—76òì:6ò:’væ†òFRFW6V×Væ†òÂ:’W6òÖVæ÷"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså7WW&VV6–ÖVçFó£Â÷7G&öæsâVVFFRfVÆö6–FFRFWö—2FRÆwVç2Ö–çWF÷2:’FV×W&GW&Âì:6ò6ögGv&RãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäF—66ò6öÒ6WF÷&W2VÒfÆ†£Â÷7G&öæsâf÷&ÖF"6ö'&RVÒF—66òfÆ†æFò6÷7GVÖG&f"æòÖV–òF–ç7FÆ:|:6òRöFR–çf–&–Æ—¦"&V7WW&:|:6òFWö—2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåG&fÖVçFòòÆ–v"Â6VÒ6†Vv"ò6—7FVÖ£Â÷7G&öæsâ–çfW7F–wVR†&Gv&RçFW3²f÷&ÖF:|:6òì:6ò:’F–vì;77F–6òãÂöÆ“à¢Â÷VÃà¢Çå6RVV—†:’ÆVçF–L:6òRfö<:¢–æFì:6ò6&R6W6Âò6Ö–æ†ò†öæW7Fò:’ÖVF—"çFW2FRv#¢fV¦ÄÆ–æ²FóÒ"÷&ö&ÆVÖ2ö6ö×WFF÷"ÖÆVçFò#æ6öÖò–FVçF–f–6"÷"VRò6ö×WFF÷"W7L:ÆVçFóÂôÆ–æ³âR<;2FWö—2FV6–FãÂ÷à ¢Æƒ#ä&6·W¢ò76òVRì:6òöFR6W"&W7VÖ–FóÂöƒ#à¢Çä&6·W<;2W†—7FRVæFòfö’6öæfW&–Fòâ6÷–"7FRì:6ò'&—"æVæ‡VÒ'V—fòFWö—2ì:6ò:’&6·W(	B:’W7W&ì:vâòÜ:Öæ–ÖòçFW2FRVÇVW"f÷&ÖF:|:6ó£Â÷à¢ÆöÃà¢ÆÆ“ä6÷–RFö7VÖVçF÷2Â–ÖvVç2Âl:ÖFV÷2ÂF÷væÆöG2R8&VFRG&&Æ†ò&VÒF—66òW‡FW&æò÷RçWfVÒãÂöÆ“à¢ÆÆ“ä'&VÆòÖVæ÷2VÒ'V—fòFR6F7F6÷–FÂæòFW7F–æòÂ&6öæf—&Ö"–çFVw&–FFRãÂöÆ“à¢ÆÆ“äW‡÷'FRff÷&—F÷2R6Væ†2FòæfVvF÷"†÷R6öæf—&ÖRVR6öçF6–æ7&öæ—¦’ãÂöÆ“à¢ÆÆ“äÆö6Æ—¦R÷2FF÷2FRRÖÖ–Ã¢6öçF26öæf–wW&F2VÒ&öw&ÖÆö6ÂwV&FÒÖVç6vVç2VÒ'V—fò,;7&–òÂVR&V6—66W"6÷–FòãÂöÆ“à¢ÆÆ“äæ÷FRÆ–6Vì:v2FR&öw&Ö2v÷2RöæFRf÷&Ò6ö×&F2ãÂöÆ“à¢ÆÆ“å6RòF—66òW7F—fW"7&—Föw&fFòÂ6ÇfR6†fRFR&V7WW&:|:6òçFW2(	B6VÒVÆÂò6öçF\;¦Fò:’—'&V7WW,:fVÂãÂöÆ“à¢ÂööÃà¢Çä'V—f÷2VRì:6ò'&VÒÂÜ:ÖF–VR6öÖRFòW‡Æ÷&F÷"÷R7FVRG&f<;7–<:6ò6–æÂFRF—66òFöVçFRâæW76R66ò&S¢6öçF–çV"FVçFæFò&VGW¢26†æ6W2FRÄÆ–æ²FóÒ"÷6W'f–6÷2÷&V7WW&6òÖFRÖFF÷2#ç&V7WW&:|:6òFRFF÷3ÂôÆ–æ³âãÂ÷à ¢Æƒ#å&VFVf–æ—"ò6—7FVÖ‚–ç7FÆ"Fò¦W&óÂöƒ#à¢Çå<:6ò&ö6VF–ÖVçF÷2F–fW&VçFW26öÒ&W7VÇFF÷2F–fW&VçFW3£Â÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæså&VFVf–æ—"ÖçFVæFò'V—f÷3£Â÷7G&öæsâòv–æF÷w2&V–ç7FÆ6’ÖW6ÖòR&W6W'f27F2FòW7\:&–òâ&VÖ÷fR&öw&Ö2–ç7FÆF÷2â8’ò6Ö–æ†òÖ—2,:–Fò&6öæf–wW&:|:6òVV'&FãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&V–ç7FÆ:|:6ò÷"6–Ö†ÖçFVæFòGVFò“£Â÷7G&öæsâ&W&6ö×öæVçFW2Fò6—7FVÖ&W6W'fæFò&öw&Ö2R'V—f÷2â9§F–ÂVæFòòv–æF÷w2fÆ†VÒGVÆ—¦"÷R&W6VçFW'&ò&V6÷'&VçFRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä–ç7FÆ:|:6òÆ–×£Â÷7G&öæsâv'Fœ:|:6òFò6—7FVÖR6öÖ\:vFò¦W&òâ8’;¦æ–6÷:|:6ò6öæfœ:fVÂVæFò†÷WfR–æfV<:|:6ò<:—&–÷RVæFòÜ:V–æ7V×VÆ÷Ræ÷2FR–ç7FÆ:|:6òãÂöÆ“à¢Â÷VÃà¢Çäò76ò76òFWFÆ†FòF–ç7FÆ:|:6òÆ–×Â–æ6ÇV–æFòÜ:ÖF–FR–ç7FÆ:|:6òR'F–6–öæÖVçFòÂW7L:VÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖ–ç7FÆ"×v–æF÷w2ÓÖFò×¦W&ò#æ6öÖò–ç7FÆ"òv–æF÷w2Fò¦W&óÂôÆ–æ³ââ6RÖ÷F—f:|:6òf÷"–æfV<:|:6òÂÆV–çFW2ÄÆ–æ²FóÒ"ö&Æörö6öÖò×&VÖ÷fW"×f—'W2×v–æF÷w2Ö–æ–6–çFW2#æ6öÖò&VÖ÷fW"l:×'W2RGv&SÂôÆ–æ³ã¢VÒ&ö'FRF÷266÷2Æ–×W¦F—&–v–F&W6öÇfR6VÒv"æFãÂ÷à ¢Æƒ#äÆ–6Vì:vÂ6öçF2RG&—fW'3Âöƒ#à¢ÇäVÒÜ:V–æ2FRl:'&–6ÂÆ–6Vì:væ÷&ÖÆÖVçFRW7L:f–æ7VÆFòWV—ÖVçFòR:’&V6öæ†V6–FWFöÖF–6ÖVçFR;72–ç7FÆ:|:6òâVÒÜ:V–æ2ÖöçFF2ÂÆ–6Vì:v6÷7GVÖW7F"f–æ7VÆFVÖ6öçF(	BVçG&"6öÒÖW6Ö6öçFWf—FW&FW"F—f:|:6òâ&öw&Ö2v÷2W†–vVÒò&Vv—7G&ò÷&–v–æÃ²6VÒVÆRÂ&V–ç7FÆ"6–væ–f–66ö×&"FRæ÷fòãÂ÷à¢ÇäFWö—2F–ç7FÆ:|:6òÂ÷&FVÒF÷2G&—fW'2–×÷'F¢6†—6WB&–ÖV—&òÂFWö—2l:ÖFVòÂ&VFRÂ:VF–òRW&–l:—&–6÷2â&Vf—&6V×&Rò6—FRFòf'&–6çFRFòWV—ÖVçFòâ6÷FW2vVì:—&–6÷2FR&GVÆ—¦F÷"FRG&—fW'2"<:6òVÖF26W62Ö—26ö×Vç2FR–ç7F&–Æ–FFRVÒÜ:V–æ&V<:–ÒÖf÷&ÖFFãÂ÷à ¢Æƒ#äòVR6÷7GVÖF"W'&FóÂöƒ#à¢ÇVÃà¢ÆÆ“äFW66ö'&—"ÂæòÖV–òF–ç7FÆ:|:6òÂVR6†fRFR7&—Föw&f–ì:6òfö’6ÇfãÂöÆ“à¢ÆÆ“äf÷&ÖF"'Fœ:|:6òW'&FVÒÜ:V–æ6öÒFö—2F—66÷2ãÂöÆ“à¢ÆÆ“åW&FW"RÖÖ–Ç2VRW7FfÒVæ2æò&öw&ÖÆö6ÂãÂöÆ“à¢ÆÆ“å&V–ç7FÆ"6VÒFW"&VFRgVæ6–öææFó¢6VÒG&—fW"FR&VFRÂì:6òŒ:6öÖò&—†"÷2÷WG&÷2ãÂöÆ“à¢ÆÆ“å&V–ç7FÆ"6ö'&RF—66ò6öÒfÆ†RG&f"æòÖV–òÂ6VÒ&6·WfW&–f–6FòãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFòf¢6VçF–Fò6†Ö"Æw\:–ÓÂöƒ#à¢Çäì:6ò÷'VRò&ö6VF–ÖVçFò:’6V7&WFò(	BVÆRW7L:–çFV—&ò:ÒVÒ6–Öâf¢6VçF–FòVæFòò7W7FòFRW'&":’ÇFó¢'V—fòFRG&&Æ†ò6VÒ<;7–ÂRÖÖ–ÂFRæ÷2Â6—7FVÖFRvW7L:6ò–ç7FÆFòÆö6ÆÖVçFRÂF—66ò6öÒ6–æ—2FRfÆ†÷RÜ:V–æVR&V6—6föÇF"gVæ6–öæ"6öÒW&|:¦æ6–ãÂ÷à¢Çå6Rfö<:¢ì:6òFVÒ6W'FW¦FRVRf÷&ÖF":’ò6Ö–æ†òÂò76òçFW&–÷":’òÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³ââR6R¬:FV6–F—RÂòW66÷òÂ26öæFœ:|;VW2RòVRW7L:–æ6ÇW6òW7L:6òVÒÄÆ–æ²FóÒ"÷6W'f–6÷2öf÷&ÖF6ò#æf÷&ÖF:|:6òR–ç7FÆ:|:6òFò6—7FVÖÂôÆ–æ³â(	Bò7W7FòFW76RF2FVÖ—2ÖöFÆ–FFW2W7L:FWFÆ†FòVÒÄÆ–æ²FóÒ"ö&Æör÷VçFòÖ7W7FÖf÷&ÖF"×VÒÖ6ö×WFF÷"#çVçFò7W7Ff÷&ÖF"VÒ6ö×WFF÷#ÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢òò)H)HöæF„R(	B–çFVì:|:6ò4ôÔU$4”Â†fÆ–:|:6òFR7W7Fò’âì:6ò&WWFRò76ò¢òò76òFòwV––æf÷&Ö6–öæÂRW6W†6ÇW6—fÖVçFRF&VÆFò&ö¦WFòà¢'VçFòÖ7W7FÖf÷&ÖF"×VÒÖ6ö×WFF÷"#¢°¢F—FÆS¢%VçFò7W7Ff÷&ÖF"VÒ6ö×WFF÷#ò"À¢W†6W'C ¢$òVRVçG&æòfÆ÷"FRVÖf÷&ÖF:|:6ó¢FV×òL:–6æ–6òÂÖöFÆ–FFRFRFVæF–ÖVçFòÂ&6·WÂÆ–6Vì:vR\:v2â÷2fÆ÷&W2&F–6F÷2V’RòVRì:6òW7L:–æ6ÇW6òâ"À¢FFS¢###bÓ‚ÓB"À¢&VEF–ÖS¢#‚Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#äf÷&ÖF:|:6òì:6òFVÒ&\:vò;¦æ–6ò÷'VRì:6ò:’VÒ6W'fœ:vò;¦æ–6òâòVR×VFòfÆ÷":’ÖöFÆ–FFRFRFVæF–ÖVçFòÂòFV×òL:–6æ–6òVçföÇf–FòRòVR&V6—66W"&W6W'fFòâ&—†òW7L:6öÖòò7W7Fò6Rf÷&ÖRV—2<:6ò÷2fÆ÷&W2&F–6F÷2÷"´%$äEôäÔWÒãÂ÷à ¢Æƒ#äòVRfö<:¢W7L:væFóÂöƒ#à¢Çå&V–ç7FÆ"ò6—7FVÖ:’'FR7W'FâòVR6öç6öÖRFV×òL:–6æ–6ò:’òVçF÷&æó£Â÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsä6öæfW,:¦æ6–Fò&6·W£Â÷7G&öæsâ6÷–"RfW&–f–6"'V—f÷2ÂRÖÖ–Ç2Æö6—2Âff÷&—F÷2R6†fW2FR7&—Föw&f–ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåfW&–f–6:|:6òFòF—66ó£Â÷7G&öæsâ&V–ç7FÆ"6ö'&RF—66òVÒfÆ†FVæFRf—&"&WG&&Æ†òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä–ç7FÆ:|:6òRG&—fW'3£Â÷7G&öæsâ6†—6WBÂl:ÖFVòÂ&VFRÂ:VF–òRW&–l:—&–6÷2Âæ÷&FVÒ6÷'&WFãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&W7FW&:|:6ó£Â÷7G&öæsâFWföÇfW"'V—f÷2Â6öçF2Â–×&W76÷&R&öw&Ö2W76Væ6–—2òW7FFòFRG&&Æ†òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäF—f:|:6òRÆ–6Vì:v3£Â÷7G&öæsâ6öæf—&Ö"6—7FVÖF—fFòR&öw&Ö2v÷2l:Æ–F÷2ãÂöÆ“à¢Â÷VÃà ¢Æƒ#åfÆ÷&W2&F–6F÷3Âöƒ#à¢Çä÷2fÆ÷&W2&—†ò<:6ò÷2Fò&ö¦WFòRfÆVÒ&VÇVW"6W'fœ:vòÂ–æ6ÇW6—fRf÷&ÖF:|:6òâF&VÆ6ö×ÆWFÂ6öÒ&Vw&2R6öæFœ:|;VW2ÂW7L:VÒÄÆ–æ²FóÒ"÷&V6÷2ÖR×öÆ—F–62#ç&\:v÷2RöÌ:×F–63ÂôÆ–æ³âãÂ÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsåf—6—FL:–6æ–6FR–ç7\:|:6ò†gVÇ6“£Â÷7G&öæsâ'F—"FR"B“’Ã“’÷"L:’3Ö–çWF÷2FRFVæF–ÖVçFò(	BR6F3Ö–çWF÷2F–6–öæ—2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6÷FRFRf—6—FFRL:’"†÷&3£Â÷7G&öæsâ"B#s’Ã“’Â,:’Ö6÷&FFòçFW2FòFW6Æö6ÖVçFòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäF–vì;77F–6ò6öÒ6ö×&öÖ—76òÂ6öÒ6öÆWFRVçG&Vv–æ6ÇW63£Â÷7G&öæsâÜ:Öæ–Öò,:’Ö&÷fFòFR"B#“’Ã“’ãÂöÆ“à¢Â÷VÃà¢Çå\:v2Â6ö×öæVçFW2ÂÆ–6Vì:v2RÖFW&–—2ì:6òW7L:6ò–æ6ÇW6÷2VÒæVæ‡VÖÖöFÆ–FFRâ&W&÷26–ÖFòÜ:Öæ–Öò,:’Ö&÷fFòFWVæFVÒFRWF÷&—¦:|:6ò÷"W67&—FòãÂ÷à ¢Æƒ#äòVRöFRVÖVçF"òfÆ÷#Âöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsåföÇVÖRFRFF÷3£Â÷7G&öæsâ6VçFVæ2FRv–v'—FW2&6÷–"R6öæfW&—"6öç6öÖVÒFV×ò&VÂÂì:6ò:’WF6–Ö,;6Æ–6ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäF—66òVÒfÆ†£Â÷7G&öæsâVæFòŒ:7W7V—FFRfÆ†l:×6–6Âò6Ö–æ†òFV—†FR6W"f÷&ÖF:|:6òR766W"&W6W'f:|:6òFRFF÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÆ–6Vì:v2R6—7FVÖ2FRG&&Æ†ó£Â÷7G&öæsâ&öw&Ö2FRvW7L:6òÂ6W'F–f–6FòF–v—FÂR6öæf–wW&:|;VW2f—66—2W†–vVÒ&V–ç7FÆ:|:6ò76—7F–FãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFW6Æö6ÖVçFó£Â÷7G&öæsâòfÆ÷"Ü:Öæ–ÖòöFRf&–"6öæf÷&ÖR&Vvœ:6òãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFòf÷&ÖF":’òv7FòW'&FóÂöƒ#à¢Çå6RÜ:V–æW6F—66òÖV<:&æ–6ò÷RFVÒ÷V6ÖVÜ;7&–Âf÷&ÖF:|:6òVçG&VvÌ:×f–òFV×÷,:&–òRòF–æ†V—&ò&VæFRÖ—2VÒÄÆ–æ²FóÒ"÷6W'f–6÷2÷Ww&FR×76B×&Ò#çWw&FRFR54BRÖVÜ;7&–ÂôÆ–æ³ââ6Rò&ö&ÆVÖ:’–æfV<:|:6òÆö6Æ—¦FÂ×V—F2fW¦W2ÄÆ–æ²FóÒ"÷6W'f–6÷2÷&VÖö6òÖFR×f—'W2#ç&VÖü:|:6òFRl:×'W3ÂôÆ–æ³â&W6öÇfR6VÒv"æFâR6Ræ–æw\:–Ò6&R–æFVÂ:’6W6Âò76ò6÷'&WFò:’òÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³â(	Bf÷&ÖF"6VÒF–vì;77F–6ò:’v"GV2fW¦W2ãÂ÷à ¢Æƒ#å&VfW&Rf¦W"fö<:¢ÖW6ÖóóÂöƒ#à¢Çì8’W&fV—FÖVçFR÷7<:×fVÂÂRò&ö6VF–ÖVçFòW7L:FW67&—FòVÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖf÷&ÖF"×2×6VÒ×W&FW"Ö'V—f÷2#æ6öÖòf÷&ÖF"ò2÷Ræ÷FV&öö²6VÒW&FW"'V—f÷3ÂôÆ–æ³ââò6W'fœ:vòW†—7FR&VVÒì:6òöFR'&—66"÷2FF÷2÷Rì:6òöFRf–6"6VÒÜ:V–æ¢W66÷òR6öæFœ:|;VW2VÒÄÆ–æ²FóÒ"÷6W'f–6÷2öf÷&ÖF6ò#æf÷&ÖF:|:6òR–ç7FÆ:|:6òFò6—7FVÖÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&ò×VRÖRÖ–æf÷&ÖF–6#¢°¢F—FÆS¢$òVR:’–æf÷&Ü:F–6òFVf–æœ:|:6ò6ö×ÆWFVÒ÷'GVw\:§2"À¢W†6W'C¢$VçFVæFòVR:’–æf÷&Ü:F–6Â&VR6W'fRÂöæFR:’Æ–6FRVÂF–fW&Vì:vVçG&R–æf÷&Ü:F–6Â6ö×WF:|:6òRD’âwV–æ6–öæÂVÒ÷'GVw\:§2â"À¢FFS¢###bÓ‚ÓR"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢$gVæFÖVçF÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#ä–æf÷&Ü:F–6:’VÖÆg&VR&V6RVÒVF—F—2FR6öæ7W'6òÂ7W',:Ö7VÆ÷2FR7W'6÷2Âì;¦æ6–÷2FRV×&VvòR6öçfW'62FòF–F–â–æF76–ÒÂFVf–æœ:|:6ò6÷7GVÖ6W"fv¢ÆwVç2W6Ò6öÖò6–ì;Fæ–ÖòFR'6&W"W6"6ö×WFF÷""Â÷WG&÷26öÖò6–ì;Fæ–ÖòFR&öw&Ö:|:6òâ–æf÷&Ü:F–6:’Ö—2×ÆFòVR—76ò(	BRVçFVæFW"òVRVÆ&VÆÖVçFR'&ævR§VFW66öÆ†W"òVRW7GVF"ÂòVR6öçG&F"RòVRW7W&"FRVÒ&öf—76–öæÂF:&VãÂ÷à ¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"Ö&÷&FW"&rÖ×WFVBóCÓBæ÷B×&÷6R×’Ób#à¢Æƒ"6Æ74æÖSÒ'FW‡BÖ&6RföçB×6VÖ–&öÆBÒÓ#å&W7VÖòVÒÖ–çWFóÂöƒ#à¢ÇVÂ6Æ74æÖSÒ&×BÓ"Ö"ÓÆ—7BÖF—62ÂÓRFW‡B×6Ò#à¢ÆÆ“ä–æf÷&Ü:F–6:’òG&FÖVçFòWFöÜ:F–6òF–æf÷&Ö:|:6ò6öÒö–òFRÜ:V–æ2ãÂöÆ“à¢ÆÆ“äVÆ'&ævR†&Gv&RÂ6ögGv&RÂ&VFW2ÂFF÷2Â6VwW&ì:vRFW6VçföÇf–ÖVçFòFR6—7FVÖ2ãÂöÆ“à¢ÆÆ“ä6ö×WF:|:6òVæfF—¦FV÷&–RÆv÷&—FÖ÷3²D’VæfF—¦–æg&W7G'WGW&RvW7L:6ó²–æf÷&Ü:F–66ö'&RòW6òRÆ–6:|:6ò,:F–6ãÂöÆ“à¢ÆÆ“ä:&V:’Æ–6FVÒV×&W62Â6;¦FRÂVGV6:|:6òÂv÷fW&æòÂ6œ:¦æ6–Rf–FFöÜ:—7F–6ãÂöÆ“à¢ÆÆ“å&W7GVF"Â6öÖV6RVÆ÷2gVæFÖVçF÷3¢†&Gv&RÂ6ögGv&RÂ6—7FVÖ÷W&6–öæÂÂ'V—f÷2Â–çFW&æWBR6VwW&ì:vãÂöÆ“à¢Â÷VÃà¢Âö6–FSà ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çä–æf÷&Ü:F–6:’6œ:¦æ6–R,:F–6FR&ö6W76"–æf÷&Ö:|:6òFRf÷&ÖWFöÜ:F–6âVÆ'&ævRòW7GVFòÂòFW6VçföÇf–ÖVçFòRòW6òFR6ö×WFF÷&W2Â6ögGv&RÂ&VFW2Â&æ6÷2FRFF÷2R6—7FVÖ2&&Ö¦Væ"Â÷&væ—¦"ÂG&ç6Ö—F—"RG&ç6f÷&Ö"FF÷2VÒ6öæ†V6–ÖVçFò;§F–ÂâVÖ&÷&W7FV¦Æ–vF:6ö×WF:|:6òR:FV6æöÆöv–F–æf÷&Ö:|:6ò…D’’Â6FVÖFW762:&V2FVÒVÒW66÷ò,;7&–òãÂ÷à ¢Æƒ#ãâòVRÆg&–æf÷&Ü:F–66–væ–f–6Âöƒ#à¢ÇäòFW&ÖòfVÒF§Vì:|:6òFR&–æf÷&Ö:|:6ò"R&WFöÜ:F–6"â7W&v—Ræg&ì:væL:–6FFR“cƒÆVÓæ–æf÷&ÖF—VSÂöVÓâ’Rfö’FFFò&ò÷'GVw\:§2&FW67&WfW"òG&FÖVçFòWFöÜ:F–6òF–æf÷&Ö:|:6òâ–FV–6VçG&Âì:6ò:’ò6ö×WFF÷"VÒ6’ÂÖ2–æf÷&Ö:|:6ó¢6öÖòVÆ:’&W&W6VçFFÂ&ö6W76FÂ&Ö¦VæFR6ö×Væ–6F6öÒWŒ:ÖÆ–òFRÜ:V–æ2ãÂ÷à¢Çå÷"—76òÂ–æf÷&Ü:F–6ì:6ò6R&W7VÖR6&W"Æ–v"VÒ6ö×WFF÷"÷RæfVv"æ–çFW&æWBâVÆ–æ6ÇV’òVçFVæF–ÖVçFòFR6öÖò÷26—7FVÖ2gVæ6–öæÒÂ6öÖò÷2FF÷26—&7VÆÒR6öÖò2FV6—<;VW2‡VÖæ2<:6òö–F2(	B÷RWFöÖF—¦F2(	B÷"FV6æöÆöv–ãÂ÷à ¢Æƒ#ã"âòVR–æf÷&Ü:F–6W7GVFÂöƒ#à¢Çä–æf÷&Ü:F–6W7GVF÷2&–æ<:×–÷2R2L:–6æ–62VRW&Ö—FVÒò&ö6W76ÖVçFòWFöÜ:F–6òF–æf÷&Ö:|:6òâ—76òVçföÇfRFW6FR'FRl:×6–6F÷2WV—ÖVçF÷2L:’Ì;6v–6F÷2&öw&Ö2R÷&væ—¦:|:6òF÷2FF÷2â÷2&–æ6——2ö&¦WF÷2FRW7GVFò<:6ó£Â÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsä†&Gv&S£Â÷7G&öæsâ÷26ö×öæVçFW2l:×6–6÷2(	B&ö6W76F÷"ÂÖVÜ;7&–Â&Ö¦VæÖVçFòÂÆ6ÖÜ:6RÂW&–l:—&–6÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6ögGv&S£Â÷7G&öæsâ÷2&öw&Ö2R6—7FVÖ2÷W&6–öæ—2VRf¦VÒò†&Gv&RW†V7WF"F&Vf2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&VFW2FR6ö×WFF÷&W3£Â÷7G&öæsâ6öÖòÜ:V–æ26R6öæV7FÒRG&ö6Ò–æf÷&Ö:|;VW2Æö6ÆÖVçFRRVÆ–çFW&æWBãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä&æ6òFRFF÷3£Â÷7G&öæsâ6öÖòw&æFW2föÇVÖW2FRFF÷2<:6ò÷&væ—¦F÷2Â6öç7VÇFF÷2R&÷FVv–F÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6VwW&ì:vF–æf÷&Ö:|:6ó£Â÷7G&öæsâ6öÖò&÷FVvW"FF÷26öçG&6W76÷2–æFWf–F÷2ÂfÆ†2RFVW2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä–çFVÆ–|:¦æ6–'F–f–6–ÂR6œ:¦æ6–FRFF÷3£Â÷7G&öæsâ6öÖòW‡G&—"G,;VW2Â&Wf—<;VW2RFV6—<;VW2'F—"FRFF÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFW6VçföÇf–ÖVçFòFR6—7FVÖ3£Â÷7G&öæsâ6öÖò&ö¦WF"Â6öç7G'V—"RÖçFW"Æ–6:|;VW2ãÂöÆ“à¢Â÷VÃà¢ÇäW762:&V26R6ö×Væ–6Òâì:6òL:&fÆ"FR6ögGv&R6VÒ†&Gv&RÂæVÒFR6VwW&ì:v6VÒ&VFW2R&æ6÷2FRFF÷2â–æf÷&Ü:F–6:’Â6–ÖFRGVFòÂVÒ6×ò–çFVw&FòãÂ÷à ¢Æƒ#ä†&Gv&RR6ögGv&S¢F—f—<:6ògVæFÖVçFÃÂöƒ#à¢Çä†&Gv&R:’FöF'FRl:×6–6Fò6ö×WFF÷#¢V–ÆòVRöFR6W"Fö6Fòâ6ögGv&R:’ò6öæ§VçFòFR–ç7G'\:|;VW2VRF—¢ò†&Gv&RòVRf¦W"âæVæ‡VÒF÷2Fö—2gVæ6–öæ6÷¦–æ†ò(	BVÒ6ö×WFF÷"6VÒ6ögGv&R:’VÒ6öæ§VçFòFR\:v3²VÒ6ögGv&R6VÒ†&Gv&R:’Væ2VÒ'V—fòãÂ÷à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#à¢ÇFƒä7V7FóÂ÷Fƒà¢ÇFƒä†&Gv&SÂ÷Fƒà¢ÇFƒå6ögGv&SÂ÷Fƒà¢Â÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#à¢ÇFCäæGW&W¦Â÷FCà¢ÇFCäl:×6–6óÂ÷FCà¢ÇFCäÌ;6v–6ò†–ç7G'\:|;VW2RFF÷2“Â÷FCà¢Â÷G#à¢ÇG#à¢ÇFCäW†V×Æ÷3Â÷FCà¢ÇFCå&ö6W76F÷"ÂÖVÜ;7&–$ÒÂ54BÂFV6ÆFòÂÖöæ—F÷#Â÷FCà¢ÇFCåv–æF÷w2ÂæfVvF÷"ÂVF—F÷"FRFW‡FòÂçF—l:×'W3Â÷FCà¢Â÷G#à¢ÇG#à¢ÇFCä6öÖòfÆ†Â÷FCà¢ÇFCäFW6v7FRÂFVfV—FòVÌ:—G&–6òÂFæòl:×6–6óÂ÷FCà¢ÇFCäW'&òFR&öw&Ö:|:6òÂ6öæf–wW&:|:6ò–æ6÷'&WFÂ'V—fò6÷'&ö×–FóÂ÷FCà¢Â÷G#à¢ÇG#à¢ÇFCä6öÖò6R&W6öÇfSÂ÷FCà¢ÇFCåG&ö6÷R&W&òFR6ö×öæVçFSÂ÷FCà¢ÇFCäGVÆ—¦:|:6òÂ&V–ç7FÆ:|:6òÂ6÷'&\:|:6òFR6öæf–wW&:|:6óÂ÷FCà¢Â÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà¢ÇåVÒW†V×Æò6öæ7&WFó¢VæFòò6ö×WFF÷"FVÖ÷&'&—"&öw&Ö2Â6W6öFR6W"†&Gv&R†F—66òÖV<:&æ–6òÆVçFòÂÖVÜ;7&––ç7Vf–6–VçFR’÷R6ögGv&R‡&öw&Ö2VÒW†6W76òæ–æ–6–Æ—¦:|:6òÂ6—7FVÖFW6GVÆ—¦Fò’â6&W"6W&"2GV2æGW&W¦2:’&–ÖV—&6ö×WL:¦æ6–FRF–vì;77F–6òFRVÇVW"W76öVRG&&Æ†6öÒ–æf÷&Ü:F–6ãÂ÷à¢ÇäW†—7FR–æFVÖ6ÖF–çFW&ÖVFœ:&–¢òÇ7G&öæsæf—&×v&SÂ÷7G&öæsâÂVÒ6ögGv&Rw&fFòæò,;7&–ò6ö×öæVçFR(	B6öÖòòTTd’ô$”õ2FÆ6ÖÜ:6RâVÆR–æ–6–ò†&Gv&RçFW2Fò6—7FVÖ÷W&6–öæÂ77VÖ—"ò6öçG&öÆRãÂ÷à ¢Æƒ#ã2â–æf÷&Ü:F–6Â6ö×WF:|:6òRD“¢VÂF–fW&Vì:vÂöƒ#à¢Çä÷2G,:§2FW&Ö÷2<:6òW6F÷26öÖò6–ì;Fæ–Ö÷2ÂÖ2L:¦Ò:¦æf6W2F–fW&VçFW3£Â÷à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#à¢ÇFƒåFW&ÖóÂ÷Fƒà¢ÇFƒì8¦æf6R&–æ6—ÃÂ÷Fƒà¢ÇFƒäW†V×ÆòFRGV:|:6óÂ÷Fƒà¢Â÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#à¢ÇFCä–æf÷&Ü:F–6Â÷FCà¢ÇFCåW6ò,:F–6òFFV6æöÆöv–&&ö6W76"–æf÷&Ö:|:6óÂ÷FCà¢ÇFCäÖöçF"VÖ&VFRÂ6öæf–wW&"VÒ6—7FVÖÂVç6–æ"W6òFRfW'&ÖVçF3Â÷FCà¢Â÷G#à¢ÇG#à¢ÇFCä6ö×WF:|:6óÂ÷FCà¢ÇFCåFV÷&–ÂÆv÷&—FÖ÷2RgVæFÖVçF÷26–VçL:Öf–6÷3Â÷FCà¢ÇFCåW7V—6VÒ–çFVÆ–|:¦æ6–'F–f–6–ÂÂFV÷&–F6ö×ÆW†–FFSÂ÷FCà¢Â÷G#à¢ÇG#à¢ÇFCåD’…FV6æöÆöv–F–æf÷&Ö:|:6ò“Â÷FCà¢ÇFCävW7L:6òR÷W&:|:6òFR–æg&W7G'WGW&FV6æöÌ;6v–6æ2÷&væ—¦:|;VW3Â÷FCà¢ÇFCå7W÷'FRL:–6æ–6òÂvW7L:6òFR6W'f–F÷&W2Â6VwW&ì:v6÷'÷&F—fÂ÷FCà¢Â÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà¢Çäæ,:F–6ÂVÒ&öf—76–öæÂöFRGV"æ2G,:§2:&V2òÖW6ÖòFV×òâVÒL:–6æ–6òFR–æf÷&Ü:F–6&W6öÇfR&ö&ÆVÖ2,:F–6÷3²VÒ6–VçF—7FF6ö×WF:|:6òFW6VçföÇfRæ÷f÷2Ü:—FöF÷3²VÒ&öf—76–öæÂFRD’vW&Væ6–FV6æöÆöv–FVçG&òFRVÖV×&W6â÷26×÷26RÖ—7GW&ÒÂÖ22f÷&Ö:|;VW2R÷2ö&¦WF—f÷2<:6òF—7F–çF÷2ãÂ÷à ¢Æƒ#ãBâ&VR6W'fR–æf÷&Ü:F–6Âöƒ#à¢Çä–æf÷&Ü:F–66W'fR&WFöÖF—¦"F&Vf2&WWF—F—f2Â&Ö¦Væ"R&V7WW&"FF÷26öÒ&–FW¢Â6ö×Væ–6"W76ö2:F—7L:&æ6–Âö–"FV6—<;VW26öÒ–æf÷&Ö:|;VW2÷&væ—¦F2R7&–"æ÷f÷2&öGWF÷2R6W'fœ:v÷2âæòF–F–Â—76ò6RG&GW¢VÓ£Â÷à¢ÇVÃà¢ÆÆ“äW67&WfW"Fö7VÖVçF÷2RÆæ–Æ†3³ÂöÆ“à¢ÆÆ“äVçf–"RÖÖ–Ç2RÖVç6vVç3³ÂöÆ“à¢ÆÆ“ä&Ö¦Væ"f÷F÷2Âl:ÖFV÷2R'V—f÷3³ÂöÆ“à¢ÆÆ“ä6W76"6W'fœ:v÷2&æ<:&–÷2Rv÷fW&æÖVçF—3³ÂöÆ“à¢ÆÆ“ä6öçG&öÆ"W7F÷VRRfVæF2FRVÖV×&W6³ÂöÆ“à¢ÆÆ“äF–væ÷7F–6"FöVì:v2RvW&Væ6–"&öçG\:&–÷2æ6;¦FS³ÂöÆ“à¢ÆÆ“å6–×VÆ"&ö¦WF÷2FRVævVæ†&–R'V—FWGW&ãÂöÆ“à¢Â÷VÃà¢ÇåV6RFöFF—f–FFR‡VÖæ†ö¦RVçföÇfR–æf÷&Ü:F–6FRÆwVÖf÷&Öâ÷"—76òÂÆf&WF—¦:|:6òF–v—FÂFV—†÷RFR6W"VÒF–fW&Væ6–ÂRf—&÷RVÖ6ö×WL:¦æ6–,:6–6ãÂ÷à ¢Æƒ#ãRâöæFR–æf÷&Ü:F–6:’Æ–6FÂöƒ#à¢Çä–æf÷&Ü:F–6W7L:&W6VçFRVÒ6WF÷&W26öÖòVGV6:|:6òÂ6;¦FRÂ–æL;§7G&–Â6öÜ:—&6–òÂv÷fW&æòÂ6ö×Væ–6:|:6òRVçG&WFVæ–ÖVçFòâÆwVç2W†V×Æ÷26öæ7&WF÷3£Â÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsäVGV6:|:6ó£Â÷7G&öæsâÆFf÷&Ö2FRVç6–æòF—7L:&æ6–Â6–×VÆF÷&W2ÂvW7L:6ò6L:¦Ö–6ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6;¦FS£Â÷7G&öæsâ&öçG\:&–÷2VÆWG,;Fæ–6÷2ÂW†ÖW2FR–ÖvVÒÂFVÆVÖVF–6–æãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä–æL;§7G&–£Â÷7G&öæsâWFöÖ:|:6òFRÜ:V–æ2Â6öçG&öÆRFRVÆ–FFRÂÆö|:×7F–6ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6öÜ:—&6–ó£Â÷7G&öæsâRÖ6öÖÖW&6RÂ6öçG&öÆRFRW7F÷VRÂÖV–÷2FRvÖVçFòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäv÷fW&æó£Â÷7G&öæsâ6W'fœ:v÷2F–v—F—2Â&6W2FRFF÷2;¦&Æ–62Â6VwW&ì:v6–&W&ì:—F–6ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6ö×Væ–6:|:6ó£Â÷7G&öæsâ&VFW26ö6–—2Â7G&VÖ–ærÂ¦÷&æÆ—6ÖòFRFF÷2ãÂöÆ“à¢Â÷VÃà¢Çäì:6òW†—7FR6WF÷"–×VæR:–æf÷&Ü:F–6âF—f–FFW2VRçFW2W&ÒÖçV—2(	B6öÖòVÖ—7<:6òFRæ÷F2f—66—2÷R6öçG&öÆRFRöçFò(	B†ö¦RFWVæFVÒFR6—7FVÖ2ãÂ÷à ¢Æƒ#ãbâ–æf÷&Ü:F–6:’6œ:¦æ6–óÂöƒ#à¢Çå6–ÒÂVÒ'FRâ–æf÷&Ü:F–6FVÒVÒÆFò6–VçL:Öf–6òf÷'FRÂW7V6–ÆÖVçFRVæFò6RW7GVF6ö×WF:|:6òF\;7&–6¢Æv÷&—FÖ÷2Â6ö×ÆW†–FFRÂÌ;6v–6ÂFV÷&–F÷2w&f÷2R–çFVÆ–|:¦æ6–'F–f–6–ÂâÖ2VÆFÖ,:–ÒFVÒVÒÆFòÆ–6FòRL:–6æ–6ó¢ÖöçF"VÖ&VFRÂ6öæf–wW&"VÒ6W'f–F÷"Â&W6öÇfW"VÒ&ö&ÆVÖFR†&Gv&RãÂ÷à¢ÇäW76GWÆæGW&W¦f¢F–æf÷&Ü:F–6VÖ:&VŒ:Ö'&–FâVÆW6Ü:—FöFò6–VçL:Öf–6ò&&W6öÇfW"&ö&ÆVÖ2ÂÖ2×V—F2FR7V2,:F–62l:¦ÒFW‡W&œ:¦æ6–÷W&6–öæÂRFVævVæ†&–ãÂ÷à ¢Æƒ#ãrâ–æf÷&Ü:F–6:’W†F3óÂöƒ#à¢Çä–æf÷&Ü:F–6W7L:,;7†–ÖF26œ:¦æ6–2W†F2÷'VRW6Ì;6v–6ÂÖFVÜ:F–6R&6–ö<:Öæ–òW7G'WGW&FòâæòVçFçFòÂVÆFÖ,:–ÒW†–vR7&–F—f–FFRÂ6ö×Væ–6:|:6òR6ö×&VVç<:6òFR6öçFW‡F÷2‡VÖæ÷2â&W6öÇfW"VÒ&ö&ÆVÖFR–æf÷&Ü:F–6æVÒ6V×&R:’Væ2&f¦W"6öçF#¢×V—F2fW¦W2VçföÇfRVçFVæFW"òVRW76ö&V6—6ÂG&GW¦—"—76ò&VÖ6öÇ\:|:6òL:–6æ–6RFW7F"6R6öÇ\:|:6ògVæ6–öææ,:F–6ãÂ÷à¢ÇåVVÒW7GVF–æf÷&Ü:F–6Væ6öçG&ÖFVÜ:F–6ÂW7V6–ÆÖVçFRVÒ:&V26öÖò7&—Föw&f–Â6ö×WF:|:6òw,:f–6R–çFVÆ–|:¦æ6–'F–f–6–ÂâÖ2òì:×fVÂFRÖFVÜ:F–6FWVæFRFW7V6–Æ—¦:|:6òâ&W6ò,:6–6òR7W÷'FRL:–6æ–6òÂòæV6W7<:&–ò:’&VÒÖ—26W7<:×fVÂFòVR×V—F÷2–Öv–æÒãÂ÷à ¢Æƒ#ã‚â'&WfR†—7L;7&–F–æf÷&Ü:F–6Âöƒ#à¢Çä–æf÷&Ü:F–66öÖò6öæ†V6VÖ÷2†ö¦RFVÒ&:×¦W2æò<:–7VÆò„•‚Â6öÒÜ:V–æ2ÖV<:&æ–62FR6Æ7VÆ"ÂRvæ†÷Rf÷&Öæò<:–7VÆò…‚6öÒ÷26ö×WFF÷&W2VÆWG,;Fæ–6÷2âÆ–æ†FòFV×ò&W7VÖ–F£Â÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæså,:’ÖVÆWG,;Fæ–6£Â÷7G&öæsâ:&6òÂ,:–wVFR<:Æ7VÆòÂÜ:V–æ2ÖV<:&æ–62FR66ÂR&&&vRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsã“CÓ“S£Â÷7G&öæsâ7W&vVÒ÷2&–ÖV—&÷26ö×WFF÷&W2VÆWG,;Fæ–6÷2ÂVæ÷&ÖW2RW6F÷2&–æ6—ÆÖVçFR&<:Æ7VÆ÷2Ö–Æ—F&W2R6–VçL:Öf–6÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsã“cÓ“s£Â÷7G&öæsâ6ö×WFF÷&W276Ò6W"W6F÷2÷"V×&W62Rv÷fW&æ÷3²7W&vVÒ÷2&–ÖV—&÷26—7FVÖ2÷W&6–öæ—2R&æ6÷2FRFF÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsã“ƒÓ““£Â÷7G&öæsâ6ö×WFF÷&W2W76ö—2÷VÆ&—¦Òò6W76ó²–çFW&æWB6öÖ\:v6RW‡æF—"f÷&F÷2Ö&–VçFW26L:¦Ö–6÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsã#Ó#£Â÷7G&öæsâÖö&–Æ–FFRÂ&VFW26ö6–—2R6ö×WF:|:6òVÒçWfVÒG&ç6f÷&ÖÒf÷&Ö6öÖò2W76ö2W6ÒFV6æöÆöv–ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsã#VÒF–çFS£Â÷7G&öæsâ–çFVÆ–|:¦æ6–'F–f–6–ÂÂ&–rFFÂ–çFW&æWBF26ö—62R6ö×WF:|:6òV,:×V6RF÷&æÒ'FRF&÷F–æãÂöÆ“à¢Â÷VÃà¢Çä–æf÷&Ü:F–66öçF–çV×VFæFòâòVR†ö¦R:’æ÷f–FFRÖæŒ:26W,:6öÖÖöF—G’â÷"—76òÂW7GVF"–æf÷&Ü:F–6:’ÂVÒw&æFR'FRÂ&VæFW"&VæFW"FV6æöÆöv–ãÂ÷à ¢Æƒ#ã’â÷"öæFR6öÖ\:v"W7GVF"–æf÷&Ü:F–6Âöƒ#à¢Çå6Rfö<:¢W7L:6öÖ\:væFòFò¦W&òÂò6Ö–æ†òÖ—2Vf–6–VçFR:’6öÖ\:v"VÆ÷2gVæFÖVçF÷3¢òVR:’†&Gv&RÂòVR:’6ögGv&RÂ6öÖògVæ6–öæVÒ6—7FVÖ÷W&6–öæÂÂ6öÖòæfVv"æ–çFW&æWB6öÒ6VwW&ì:vR6öÖò÷&væ—¦"'V—f÷2âFWö—2ÂW66öÆ†VÖW7V6–Æ—¦:|:6ò6öæf÷&ÖR6WRö&¦WF—fòãÂ÷à¢ÇåVVÒVW"W6"ò6ö×WFF÷"6öÒÖ—26VwW&ì:vR&öGWF—f–FFRöFR6VwV—"&ÄÆ–æ²FóÒ"ö&Æörö–æf÷&ÖF–6Ö&6–6"6Æ74æÖSÒ'FW‡BÖ66VçB#æ–æf÷&Ü:F–6,:6–6ÂôÆ–æ³ââVVÒVW"VÒÆæòFRW7GVFò6ö×ÆWFòVæ6öçG&VÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖ&VæFW"Ö–æf÷&ÖF–6"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖò&VæFW"–æf÷&Ü:F–6ÂôÆ–æ³ââ&6öçF\;¦F÷2,:F–6÷26ö'&RÖçWFVì:|:6òRF–vì;77F–6òÂfV¦ÄÆ–æ²FóÒ"ö&Æörö6ö×WFF÷"ÖÆVçFòÖ6W62×6öÇV6öW2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6ö×WFF÷"ÆVçFó¢6W62R6öÇ\:|;VW3ÂôÆ–æ³âãÂ÷à ¢Æƒ#ävÆ÷7<:&–òW76Væ6–ÂFR–æf÷&Ü:F–6Âöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#à¢ÇFƒåFW&ÖóÂ÷Fƒà¢ÇFƒäW‡Æ–6:|:6ò6–×ÆW3Â÷Fƒà¢Â÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCä†&Gv&SÂ÷FCãÇFCå'FRl:×6–6Fò6ö×WFF÷#¢\:v2RW&–l:—&–6÷2ãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCå6ögGv&SÂ÷FCãÇFCå&öw&Ö2R–ç7G'\:|;VW2VRf¦VÒò†&Gv&RW†V7WF"F&Vf2ãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCå6—7FVÖ÷W&6–öæÃÂ÷FCãÇFCå6ögGv&R&–æ6—ÂVRvW&Væ6–ò†&Gv&RRW&Ö—FRW†V7WF"÷WG&÷2&öw&Ö2…v–æF÷w2ÂÆ–çW‚ÂÖ4õ2ÂæG&ö–B’ãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä5SÂ÷FCãÇFCåVæ–FFR6VçG&ÂFR&ö6W76ÖVçFò(	Bò&ö6W76F÷"Â&W7öç<:fVÂ÷"W†V7WF"2–ç7G'\:|;VW2ãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCå$ÓÂ÷FCãÇFCäÖVÜ;7&–FR6W76òÆVL;7&–ó¢W7:vòFV×÷,:&–òR,:–FòöæFR÷2&öw&Ö2VÒW6òf–6Ò6'&VvF÷2âòFW6Æ–v"Âò6öçF\;¦Fò6RW&FRãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä&Ö¦VæÖVçFóÂ÷FCãÇFCäöæFR÷2'V—f÷2f–6ÒwV&FF÷2FRf÷&ÖW&ÖæVçFR„„BÂ54BÂ6'L:6òÂçWfVÒ’ãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä'V—fóÂ÷FCãÇFCä6öæ§VçFòFRFF÷26Çfò6öÒVÒæöÖRRVÖW‡FVç<:6ò†Fö7VÖVçFòÂf÷FòÂÆæ–Æ†’ãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCå&öw&ÖÂ÷FCãÇFCå6ögGv&R7&–Fò&VÖf–æÆ–FFRW7V<:Öf–6Â6öÖòW67&WfW"FW‡F÷2÷RVF—F"–ÖvVç2ãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCå&VFSÂ÷FCãÇFCä6öæ§VçFòFRF—7÷6—F—f÷26öæV7FF÷2VRG&ö6ÒFF÷2VçG&R6’ãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä–çFW&æWCÂ÷FCãÇFCå&VFR×VæF–ÂVR–çFW&Æ–v&VFW2ÖVæ÷&W2W6æFò&÷Fö6öÆ÷26ö×Vç2ãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäFF÷3Â÷FCãÇFCåfÆ÷&W2''WF÷2†ì;¦ÖW&÷2ÂFW‡F÷2Â–ÖvVç2’VRÂ–çFW'&WFF÷2Âf—&Ò–æf÷&Ö:|:6òãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä&6·WÂ÷FCãÇFCä<;7–FR6VwW&ì:vF÷2FF÷2ÂwV&FFVÒ÷WG&òÇVv"ãÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#ä6†V6¶Æ—7C¢òVR–æf÷&Ü:F–6'&ævSÂöƒ#à¢ÇVÃà¢ÆÆ“å&ö6W76ÖVçFòWFöÜ:F–6òFR–æf÷&Ö:|:6óÂöÆ“à¢ÆÆ“ä†&Gv&RR6ögGv&SÂöÆ“à¢ÆÆ“å&VFW2R–çFW&æWCÂöÆ“à¢ÆÆ“ä&æ6òFRFF÷3ÂöÆ“à¢ÆÆ“å6VwW&ì:vF–æf÷&Ö:|:6óÂöÆ“à¢ÆÆ“ä–çFVÆ–|:¦æ6–'F–f–6–ÂR6œ:¦æ6–FRFF÷3ÂöÆ“à¢ÆÆ“äFW6VçföÇf–ÖVçFòFR6—7FVÖ3ÂöÆ“à¢ÆÆ“äÆ–6:|:6òVÒ&F–6ÖVçFRFöF÷2÷26WF÷&W2F6ö6–VFFSÂöÆ“à¢Â÷VÃà ¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"Ö&÷&FW"&rÖ×WFVBóCÓBæ÷B×&÷6R×’Ób#à¢Æƒ"6Æ74æÖSÒ'FW‡BÖ&6RföçB×6VÖ–&öÆBÒÓ#äÆV–FÖ,:–ÓÂöƒ#à¢ÇVÂ6Æ74æÖSÒ&×BÓ"Ö"ÓÆ—7BÖF—62ÂÓRFW‡B×6Ò#à¢ÆÆ“ãÄÆ–æ²FóÒ"ö&Æörö–æf÷&ÖF–6Ö&6–6"6Æ74æÖSÒ'FW‡BÖ66VçB#ä–æf÷&Ü:F–6,:6–6ÂôÆ–æ³â(	BòVR6R&VæFRæò&–ÖV—&òì:×fVÂR÷"öæFR6öÖ\:v"ãÂöÆ“à¢ÆÆ“ãÄÆ–æ²FóÒ"ö&Æörö6öÖòÖ&VæFW"Ö–æf÷&ÖF–6"6Æ74æÖSÒ'FW‡BÖ66VçB#ä6öÖò&VæFW"–æf÷&Ü:F–6ÂôÆ–æ³â(	B&÷FV—&òFRW7GVFòVÒVG&òf6W2ãÂöÆ“à¢ÆÆ“ãÄÆ–æ²FóÒ"ö&Æör÷6VwW&æ6ÖF–v—FÂÖV×&W62ÖwV–Ó##B"6Æ74æÖSÒ'FW‡BÖ66VçB#å6VwW&ì:vF–v—FÂ&V×&W63ÂôÆ–æ³â(	B6öÖò÷26öæ6V—F÷2FR6VwW&ì:v&V6VÒæòÖ&–VçFR&öf—76–öæÂãÂöÆ“à¢ÆÆ“ãÄÆ–æ²FóÒ"ö&Æörö6ö×WFF÷"ÖÆVçFòÖ6W62×6öÇV6öW2"6Æ74æÖSÒ'FW‡BÖ66VçB#ä6ö×WFF÷"ÆVçFó¢6W62R6öÇ\:|;VW3ÂôÆ–æ³â(	B†&Gv&RR6ögGv&RW‡Æ–6F÷2æ,:F–6ãÂöÆ“à¢Â÷VÃà¢Âö6–FSà ¢Æƒ#å&VfW,:¦æ6–2RföçFW3Âöƒ#à¢ÇVÃà¢ÆÆ“ãÆ‡&VcÒ&‡GG3¢òöÆV&âæÖ–7&÷6ögBæ6öÒ÷BÖ'"ò"&VÃÒ&æöföÆÆ÷ræö÷VæW""F&vWCÒ%ö&Ææ²#äÖ–7&÷6ögBÆV&ãÂöâ(	BFö7VÖVçF:|:6òöf–6–Â6ö'&R6—7FVÖ2÷W&6–öæ—2Â&VFW2R6öæ6V—F÷2FR6ö×WF:|:6òãÂöÆ“à¢ÆÆ“ãÆ‡&VcÒ&‡GG3¢ò÷wwræ6ö×WFW"æ÷&rò"&VÃÒ&æöföÆÆ÷ræö÷VæW""F&vWCÒ%ö&Ææ²#ä”TTR6ö×WFW"6ö6–WG“Âöâ(	B&VfW,:¦æ6––çFW&æ6–öæÂ6ö'&R2F—66—Æ–æ2F6ö×WF:|:6òãÂöÆ“à¢ÆÆ“ãÆ‡&VcÒ&‡GG3¢òö6'F–Æ†æ6W'Bæ'"ò"&VÃÒ&æöföÆÆ÷ræö÷VæW""F&vWCÒ%ö&Ææ²#ä6'F–Æ†FR6VwW&ì:v&–çFW&æWB„4U%Bæ'"“Âöâ(	BÖFW&–Â;¦&Æ–6ò'&6–ÆV—&ò6ö'&R6VwW&ì:vF–æf÷&Ö:|:6òãÂöÆ“à¢ÆÆ“ãÆ‡&VcÒ&‡GG3¢ò÷wwræv÷bæ'"öÖV2÷BÖ'""&VÃÒ&æöföÆÆ÷ræö÷VæW""F&vWCÒ%ö&Ææ²#äÖ–æ—7L:—&–òFVGV6:|:6ò„ÔT2“Âöâ(	B&VfW,:¦æ6–27W'&–7VÆ&W2F÷27W'6÷2L:–6æ–6÷2F:&VãÂöÆ“à¢Â÷VÃà¢Ç6Æ74æÖSÒ'FW‡B×6ÒFW‡BÖ×WFVBÖf÷&Vw&÷VæB#ä6öçF\;¦Fò&öGW¦–FòR&Wf—6FòVÆWV—RVF—F÷&–ÂFRòL:–6æ–6òFR–æf÷&Ü:F–6â&Wf—6FòVÒRFRv÷7FòFR##bãÂ÷à ¢Æƒ#ä6öæ6ÇW<:6óÂöƒ#à¢Çä–æf÷&Ü:F–6:’ò6×òVRW7GVFRÆ–6ò&ö6W76ÖVçFòWFöÜ:F–6òF–æf÷&Ö:|:6òâVÆf’×V—FòÌ:–ÒFR'6&W"W6"6ö×WFF÷"#¢VçföÇfR†&Gv&RÂ6ögGv&RÂ&VFW2ÂFF÷2Â6VwW&ì:vRFW6VçföÇf–ÖVçFòFR6—7FVÖ2âF–fW&VçFRF6ö×WF:|:6òÂVRFVÒ:¦æf6RF\;7&–6ÂRFD’ÂVRFVÒ:¦æf6RVÒvW7L:6òFR–æg&W7G'WGW&Â–æf÷&Ü:F–6W7L:æò6VçG&ó¢6öæV7FFV÷&–Â,:F–6RW6ò6÷F–F–æòãÂ÷à¢ÇäVçFVæFW"W76FVf–æœ:|:6ò:’ò&–ÖV—&ò76ò&W7GVF":&VÂ6öçG&F"6W'fœ:v÷2÷RFöÖ"FV6—<;VW2FV6æöÌ;6v–626öÒÖ—26Æ&W¦â6öçF–çVRÆVæFò÷2wV–2L:–6æ–6÷2FòÄÆ–æ²FóÒ"ö&Æör"6Æ74æÖSÒ'FW‡BÖ66VçB#æ&ÆösÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&–æf÷&ÖF–6Ö&6–6#¢°¢F—FÆS¢$–æf÷&Ü:F–6,:6–6¢òVR8’ÂòVRVç6–æR÷"öæFR6öÖ\:v""À¢W†6W'C¢%6–&òVR:’–æf÷&Ü:F–6,:6–6ÂòVR6R&VæFRÂ&VR6W'fRR6öÖòW7GVF"Fò¦W&òâ6öçF\;¦Fòæ6–öæÂVÒ÷'GVw\:§2Â6VÒf–ÆÆW"â"À¢FFS¢###bÓ‚ÓR"À¢&VEF–ÖS¢#"Ö–â"À¢6FVv÷'“¢$gVæFÖVçF÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#ä–æf÷&Ü:F–6,:6–6:’ò6öæ§VçFòFR6öæ†V6–ÖVçF÷2W76Væ6–—2&W6"VÒ6ö×WFF÷"R2fW'&ÖVçF2F–v—F—2FòF–F–6öÒ6VwW&ì:vR&öGWF—f–FFRâì:6òW†–vRW‡W&œ:¦æ6–,:—f–Âì:6òVçföÇfR&öw&Ö:|:6òR6W'fR&VVÒVW"W7GVF"ÂG&&Æ†"÷R6–×ÆW6ÖVçFR&"FRFWVæFW"F÷2÷WG&÷2&&W6öÇfW"F&Vf26–×ÆW2ãÂ÷à ¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"Ö&÷&FW"&rÖ×WFVBóCÓBæ÷B×&÷6R×’Ób#à¢Æƒ"6Æ74æÖSÒ'FW‡BÖ&6RföçB×6VÖ–&öÆBÒÓ#å&W7VÖòVÒÖ–çWFóÂöƒ#à¢ÇVÂ6Æ74æÖSÒ&×BÓ"Ö"ÓÆ—7BÖF—62ÂÓRFW‡B×6Ò#à¢ÆÆ“ä–æf÷&Ü:F–6,:6–66ö'&RòW6ò6÷F–F–æòFò6ö×WFF÷"ÂF–çFW&æWBRF2fW'&ÖVçF2FRW67&—L;7&–òãÂöÆ“à¢ÆÆ“äòì;¦6ÆVò:“¢6—7FVÖ÷W&6–öæÂÂ'V—f÷2R7F2ÂæfVvF÷"ÂRÖÖ–ÂÂFW‡FòÂÆæ–Æ†Â–×&W7<:6òÂ6VwW&ì:vR&6·WãÂöÆ“à¢ÆÆ“å&öw&Ö:|:6òì:6òf¢'FRFòW66÷ò,:6–6òãÂöÆ“à¢ÆÆ“äVÒ6öæ7W'6÷2Âò6öçF\;¦Fò6ö'&Fò:’FVf–æ–FòVÆòVF—FÂRf&–÷"&æ6ãÂöÆ“à¢ÆÆ“ä6ö×WL:¦æ6–6R6ö×&÷fæ,:F–6Âì:6òVÒ6W'F–f–6Fó¢6&W"&W6öÇfW"F&Vf2&V—26VÒFWVæFW"FRFW&6V—&÷2ãÂöÆ“à¢Â÷VÃà¢Âö6–FSà ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çä–æf÷&Ü:F–6,:6–6Vç6–æW6"ò6ö×WFF÷"Âò6—7FVÖ÷W&6–öæÂÂ–çFW&æWBÂòRÖÖ–ÂÂVF—F÷&W2FRFW‡FòÂÆæ–Æ†2RfW'&ÖVçF2FR6VwW&ì:vF–v—FÂâ8’–æF–6F&–æ–6–çFW2Â6æF–FF÷26öæ7W'6÷2R&öf—76–öæ—2VR&V6—6Ò&Vf÷,:v"6ö×WL:¦æ6–2gVæFÖVçF—2çFW2FRfì:v"&W7V6–Æ—¦:|;VW2ãÂ÷à ¢Æƒ#ãâòVR:’–æf÷&Ü:F–6,:6–6Âöƒ#à¢Çä–æf÷&Ü:F–6,:6–6:’'FRF–æf÷&Ü:F–6föÇFF&òW6ò6÷F–F–æòFFV6æöÆöv–âòfö6òì:6ò:’6öç7G'V—"&öw&Ö2÷R6öæf–wW&"6W'f–F÷&W2ÂÖ26–Ò&VÆ—¦"F&Vf26ö×Vç2FRf÷&ÖVf–6–VçFS¢Æ–v"RFW6Æ–v"ò6ö×WFF÷"Â÷&væ—¦"'V—f÷2ÂæfVv"æ–çFW&æWBÂW67&WfW"Fö7VÖVçF÷2ÂVçf–"RÖÖ–Ç2R&÷FVvW"FF÷2ãÂ÷à¢ÇåVVÒ6öæ6ÇV’VÒ7W'6òFR–æf÷&Ü:F–6,:6–66öç6VwVR÷W&"VÒ6ö×WFF÷"6÷¦–æ†òÂVçFVæFW"ÖVç6vVç2FRW'&ò6–×ÆW2ÂW6"fW'&ÖVçF2FRW67&—L;7&–òRWf—F"÷2&–æ6——2&—66÷2F–v—F—2â8’&6R6ö'&RVÂ6R6öç7G&öVÒ†&–Æ–FFW2Ö—2fì:vF2Â6öÖòVFœ:|:6òFR–ÖvVç2ÂvW7L:6òFRÆæ–Æ†26ö×ÆW†2÷RL:’&öw&Ö:|:6òãÂ÷à ¢Æƒ#ã"âòVR6R&VæFRVÒ–æf÷&Ü:F–6,:6–6Âöƒ#à¢Çäw&FRf&–6öæf÷&ÖRò7W'6òÂÖ2÷2L;7–6÷26VçG&—26÷7GVÖÒ6W"÷2ÖW6Ö÷2âVÒ&öÒ7W'6òFR–æf÷&Ü:F–6,:6–6FWfR6ö'&—"VÆòÖVæ÷3£Â÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsåW6òFò6ö×WFF÷#£Â÷7G&öæsâÆ–v"ÂFW6Æ–v"Â&V–æ–6–"Â6öæV7F"Ö÷W6RÂFV6ÆFòRÖöæ—F÷"ÂW6"÷'F2U4"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6—7FVÖ÷W&6–öæÃ£Â÷7G&öæsâ:&VFRG&&Æ†òÂÖVçR–æ–6–"ÂvW&Væ6–F÷"FR'V—f÷2Â6öæf–wW&:|;VW2,:6–62Fòv–æF÷w2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäæfVv:|:6òæ–çFW&æWC£Â÷7G&öæsâW6òFòæfVvF÷"Â'W66ÂF÷væÆöB6VwW&òÂæü:|;VW2FR&—f6–FFRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäRÖÖ–Ã£Â÷7G&öæsâ7&–"6öçFÂVçf–"Â&V6V&W"ÂæW†"'V—f÷2Â–FVçF–f–6"7ÒãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäVF—F÷"FRFW‡Fó£Â÷7G&öæsâF–v—F:|:6òÂf÷&ÖF:|:6òÂÆ—7F2Â6&\:vÆ†òR&öF:’ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåÆæ–Æ†2VÆWG,;Fæ–63£Â÷7G&öæsâ<:–ÇVÆ2Âl;7&×VÆ26–×ÆW2Â6öÖÂÜ:–F–Âf÷&ÖF:|:6òFRì;¦ÖW&÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsävW&Væ6–ÖVçFòFR'V—f÷2R7F3£Â÷7G&öæsâ7&–"Â&VæöÖV"ÂÖ÷fW"Â6÷–"Âf¦W"&6·WVÒçWfVÒ÷RVæG&—fRãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6VwW&ì:vF–v—FÃ£Â÷7G&öæsâçF—l:×'W2Â6Væ†2f÷'FW2ÂWFVçF–6:|:6òVÒFö—2fF÷&W2Â&V6öæ†V6–ÖVçFòFRvöÇW2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäæü:|;VW2FR†&Gv&S£Â÷7G&öæsâ–FVçF–f–6"FV6ÆFòÂÖ÷W6RÂÖöæ—F÷"Â–×&W76÷&Â6—†2FR6öÒÂvV&6ÒãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä–×&W7<:6ó£Â÷7G&öæsâ–ç7FÆ"–×&W76÷&ÂW66öÆ†W"F—òFR–×&W7<:6òÂV6öæöÖ–FRF–çFRVÂãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåf–FVö6öæfW,:¦æ6–£Â÷7G&öæsâW6"Æ–6F—f÷2FR&WVæœ:6òÂ6ö×'F–Æ†"FVÆRVçf–"ÖVç6vVç2ãÂöÆ“à¢Â÷VÃà¢ÇäW76R6öæ§VçFò6ö'&RÖ–÷"'FRFòVRVÒW7\:&–ò6ö×VÒ&V6—6&W7GVF"ÂG&&Æ†"R6R6ö×Væ–6"ãÂ÷à ¢Æƒ#ä6ö×öæVçFW2Fò6ö×WFF÷"VRFöFò–æ–6–çFRFWfR&V6öæ†V6W#Âöƒ#à¢Çäì:6ò:’&V6—6ò6W"L:–6æ–6ò&&V6öæ†V6W"2\:v2&–æ6——2âW76Rfö6'VÌ:&–òÜ:Öæ–ÖòWf—FÖÂÖVçFVæF–F÷2æ†÷&FR6ö×&"ÂVF—"7W÷'FR÷RVçFVæFW"VÒ÷,:vÖVçFòãÂ÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæså&ö6W76F÷"„5R“£Â÷7G&öæsâW†V7WF2–ç7G'\:|;VW2âFWFW&Ö–æ&ö'FRFfVÆö6–FFRvW&ÂãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÖVÜ;7&–$Ó£Â÷7G&öæsâW7:vòFV×÷,:&–ò&÷2&öw&Ö2&W'F÷2â÷V6$Ò6W6G&fÖVçF÷2ò'&—"×V—F2&2÷R&öw&Ö2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä&Ö¦VæÖVçFò…54B÷R„B“£Â÷7G&öæsâöæFRf–6Ò6—7FVÖÂ&öw&Ö2R'V—f÷2âò54B:’&VÒÖ—2,:–FòVRò„BÖV<:&æ–6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåÆ6ÖÜ:6S£Â÷7G&öæsâ&6RVR6öæV7FFöF÷2÷26ö×öæVçFW2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäföçFRFRÆ–ÖVçF:|:6ó£Â÷7G&öæsâ6öçfW'FRVæW&v–FFöÖF&÷26ö×öæVçFW2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÖöæ—F÷"ÂFV6ÆFòRÖ÷W6S£Â÷7G&öæsâ÷2W&–l:—&–6÷2FRVçG&FR6:ÖFFòF–F–ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåÆ6FR&VFRRv’Ôf“£Â÷7G&öæsâ&W7öç<:fV—2VÆ6öæWŒ:6ò6öÒ&VFRÆö6ÂR–çFW&æWBãÂöÆ“à¢Â÷VÃà¢ÇåVÒ6–çFöÖ6ö×VÒ§VFf—†"F–fW&Vì:v¢6ö×WFF÷"ÆVçFòò'&—"l:&–÷2&öw&Ö26÷7GVÖ–æF–6"$Ò–ç7Vf–6–VçFS²6ö×WFF÷"ÆVçFò&Æ–v"R'&—"'V—f÷26÷7GVÖ–æF–6"F—66òÖV<:&æ–6òâò77VçFò:’&ögVæFFòVÒÄÆ–æ²FóÒ"ö&Æörö6ö×WFF÷"ÖÆVçFòÖ6W62×6öÇV6öW2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6ö×WFF÷"ÆVçFó¢6W62R6öÇ\:|;VW3ÂôÆ–æ³âãÂ÷à ¢Æƒ#ä'V—f÷2R7F3¢ò6öæ6V—FòVR&W6öÇfRÖWFFRF÷2&ö&ÆVÖ3Âöƒ#à¢Çä'V—fò:’VÒ6öæ§VçFòFRFF÷26Çfò6öÒæöÖRRW‡FVç<:6ò(	BÆVÓç&VÆF÷&–òæFö7ƒÂöVÓâÂÆVÓæf÷Fòæ§sÂöVÓâÂÆVÓæ6öçF2ç†Ç7ƒÂöVÓââW‡FVç<:6ò–æF–6òF—òFò6öçF\;¦FòRVÂ&öw&Ö'&Rò'V—fòâ7F:’VÒ&V6—–VçFRVRw'W'V—f÷2R÷WG&27F2â6Ö–æ†ò:’òVæFW&\:vò6ö×ÆWFòL:’ò'V—fòÂ6öÖòÆVÓä3¥ÅW7V&–÷5ÄæÄFö7VÖVçF÷5Æ6öçF2ç†Ç7ƒÂöVÓâãÂ÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæså6Çf"9r6Çf"6öÖó£Â÷7G&öæsâ%6Çf""w&f÷"6–ÖFò'V—fòGVÃ²%6Çf"6öÖò"7&–VÖ<;7–æ÷fÂW&Ö—F–æFòW66öÆ†W"æöÖRÂ7FRf÷&ÖFòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6÷–"9r&V6÷'F#£Â÷7G&öæsâ6÷–"GWÆ–6ò'V—fó²&V6÷'F"Ö÷fRÂ&VÖ÷fVæFòF÷&–vVÒò6öÆ"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäW†6ÇV—"R&W7FW&#£Â÷7G&öæsâ'V—f÷2vF÷2l:6ò&Æ—†V—&RöFVÒ6W"&W7FW&F÷2VçVçFòVÆì:6òf÷"W7f¦–FâVÒVæG&—fW2R&VFW2ÂvW&ÆÖVçFRW†6ÇW<:6ò:’FVf–æ—F—fãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&VæöÖV#£Â÷7G&öæsâ×VFRòæöÖRÂì:6òW‡FVç<:6òâG&ö6"ÆVÓâæFö7ƒÂöVÓâ÷"ÆVÓâçFcÂöVÓâì:6ò6öçfW'FRò'V—fò(	BVæ2–×VFRVRVÆR'&6÷'&WFÖVçFRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÆö6Æ—¦"òVRfö’&—†Fó£Â÷7G&öæsâ÷"G,:6òÂF÷væÆöG2l:6ò&7F$F÷væÆöG2"FòW7\:&–òãÂöÆ“à¢Â÷VÃà¢ÇåVÖ÷&væ—¦:|:6ò6–×ÆW2&W6öÇfRòF–F–¢VÖ7F÷"77VçFòÂæöÖW2FW67&—F—f÷2RVÖFFæòf÷&ÖFòæòÖÜ:§2ÖF–æò–ì:Ö6–òFòæöÖRVæFò÷&FVÒ7&öæöÌ;6v–6–×÷'F"Â6öÖòÆVÓã##bÓ‚ÓRÖ6öçG&FòçFcÂöVÓâãÂ÷à ¢Æƒ#ä–çFW&æWBÂæfVvF÷"RvV#¢òVR:’6F6ö—6Âöƒ#à¢Çä–çFW&æWB:’–æg&W7G'WGW&×VæF–ÂVR6öæV7F&VFW2âæfVvF÷":’ò&öw&ÖVRW†–&R:v–æ2(	B6‡&öÖRÂVFvRÂf—&Vf÷‚Â6f&’âì:6ò<:6ò6–ì;Fæ–Ö÷3¢òæfVvF÷":’VÖ¦æVÆ&–çFW&æWBÂ76–Ò6öÖòFVÆWf—<:6òì:6ò:’VÖ—76÷&ãÂ÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsåU$Ã£Â÷7G&öæsâòVæFW&\:vòFRVÖ:v–æâVÒÆVÓæ‡GG3¢òöW†V×Æòæ6öÒæ'"ö6öçFFóÂöVÓâÂÆVÓæW†V×Æòæ6öÒæ'#ÂöVÓâ:’òFöÜ:Öæ–òRÆVÓâö6öçFFóÂöVÓâ:’ò6Ö–æ†òFVçG&òFò6—FRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÆ–æ³£Â÷7G&öæsâVÒFW‡Fò÷R–ÖvVÒVRÆWf÷WG&òVæFW&\:vòâ76"ò7W'6÷"6ö'&RVÆRÖ÷7G&òFW7F–æò&VÂãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäF÷væÆöBRWÆöC£Â÷7G&öæsâ&—†"G&¢VÒ'V—fòF–çFW&æWB&òF—7÷6—F—fó²Vçf–"f¢ò6Ö–æ†ò–çfW'6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä&2R†—7L;7&–6ó£Â÷7G&öæsâ&2W&Ö—FVÒl:&–2:v–æ2æÖW6Ö¦æVÆ²ò†—7L;7&–6ò&Vv—7G&òVRfö’f—6—FFòR§VF&VVæ6öçG&"6öçF\;¦FòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6FVFòR…EE3£Â÷7G&öæsâ–æF–6Ò6öæWŒ:6ò7&—Föw&fFâì:6òv&çFVÒVRò6—FR6V¦–L;FæVò(	BVæ2VRòG,:fVvòW7L:&÷FVv–FòãÂöÆ“à¢Â÷VÃà¢Çå6&W"ÆW"VÒFöÜ:Öæ–ò:’VÖFVfW6,:F–66öçG&g&VFW3¢vöÇ—7F2W6ÒVæFW&\:v÷2&V6–F÷26öÒ÷2fW&FFV—&÷2Â6öÖòÆVÓæ&æ6ò×6VwW&òÖFVæF–ÖVçFòæ6öÓÂöVÓââòFöÜ:Öæ–ò:’6V×&R'FR–ÖVF–FÖVçFRçFW2F&–ÖV—&&'&ãÂ÷à ¢Æƒ#å6VwW&ì:vF–v—FÂ,:6–6Âöƒ#à¢Çå6VwW&ì:v,:6–6ì:6ò:’77VçFòFRW7V6–Æ—7Fâ<:6ò÷V6÷2Œ:&—F÷2ÂRVÆW2Wf—FÒÖ–÷"'FRF÷2–æ6–FVçFW2FöÜ:—7F–6÷2ãÂ÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæså6Væ†2W†6ÇW6—f3£Â÷7G&öæsâVÖ6Væ†F–fW&VçFR÷"6W'fœ:vòÂÆöævR6VÒFF÷2W76ö—2âVÒvW&Væ6–F÷"FR6Væ†2&W6öÇfRÖVÖ÷&—¦:|:6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåfW&–f–6:|:6òVÒGV2WF2ƒ$dôÔd“£Â÷7G&öæsâF—fRVÒRÖÖ–ÂÂ&æ6òR&VFW26ö6–—2â8’&÷F\:|:6òVR6ö'&Wf—fRòf¦ÖVçFòF6Væ†ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså†—6†–æs£Â÷7G&öæsâÖVç6vVç2VR–Ö—FÒV×&W62&&÷V&"FF÷2âFW66öæf–RFRW&|:¦æ6–ÂW'&÷2FRW67&—FRÆ–æ·2Væ7W'FF÷3²6W76Rò6W'fœ:vòF–v—FæFòòVæFW&\:vòÂçVæ6VÆòÆ–æ²&V6V&–FòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäGVÆ—¦:|;VW3£Â÷7G&öæsâÆ—VR2Fò6—7FVÖRFòæfVvF÷"âÖ–÷"'FR6÷'&–vRfÆ†2¬:6öæ†V6–F2÷"7&–Ö–æ÷6÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäF÷væÆöG3£Â÷7G&öæsâ&—†R&öw&Ö2Fò6—FRöf–6–ÂFòf'&–6çFR÷RFÆö¦Fò6—7FVÖãÂöÆ“à¢ÆÆ“ãÇ7G&öæsävöÇRFR7W÷'FRL:–6æ–6òfÇ6ó£Â÷7G&öæsâæ–æw\:–ÒÆV|:×F–ÖòÆ–v÷RW†–&RÆW'FVÒFVÆVF–æFò6W76ò&VÖ÷Fòò6WR6ö×WFF÷"&'&VÖ÷fW"l:×'W2"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä&6·W£Â÷7G&öæsâÖçFVæ†<;7–F÷2'V—f÷2–×÷'FçFW2VÒ÷WG&òF—7÷6—F—fò÷RæçWfVÒâFWFÆ†W2VÒÄÆ–æ²FóÒ"ö&Æörö&6·WÖ6öÖò×&÷FVvW"×6WW2Ö'V—f÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ&6·W¢6öÖò&÷FVvW"6WW2'V—f÷3ÂôÆ–æ³âãÂöÆ“à¢Â÷VÃà ¢Æƒ#å&öGWF—f–FFS¢FW‡FòÂÆæ–Æ†ÂDbR&WVæœ;VW3Âöƒ#à¢Çäò&Æö6òFR&öGWF—f–FFR:’òVRÖ—2&V6RæòG&&Æ†òâòö&¦WF—fòV’ì:6ò:’FöÖ–æ"FöF÷2÷2&V7W'6÷2ÂR6–ÒW†V7WF"F&Vf26ö×Vç26VÒG&f"ãÂ÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsäVF—F÷"FRFW‡Fó£Â÷7G&öæsâf÷&ÖF",:w&f÷2ÂÆ–6"L:×GVÆ÷2Â–ç6W&—"F&VÆ2R–ÖvVç2Â&Wf—6"÷'Föw&f–RW‡÷'F"VÒDbãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåÆæ–Æ†£Â÷7G&öæsâVçFVæFW"<:–ÇVÆ2ÂÆ–æ†2R6öÇVæ3²W6"6öÖ2RÜ:–F–26–×ÆW3²÷&FVæ"Rf–ÇG&"FF÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä&W6VçF:|:6ó£Â÷7G&öæsâÖöçF"6Æ–FW2ö&¦WF—f÷2Â6öÒ÷V6òFW‡FòRÆV—GW&l:6–Â:F—7L:&æ6–ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåDc£Â÷7G&öæsâ'&—"ÂvW&"'F—"FRVÇVW"Fö7VÖVçFòÂ§VçF":v–æ2R76–æ"VæFòò6W'fœ:vòW†–v—"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäRÖÖ–Ã£Â÷7G&öæsâW67&WfW"6öÒ77VçFò6Æ&òÂæW†"'V—f÷2Â&W7öæFW"RVæ6Ö–æ†"6VÒW&FW"ò†—7L;7&–6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåf–FVö6öæfW,:¦æ6–£Â÷7G&öæsâFW7F"<:&ÖW&RÖ–7&öföæRçFW2Â6ö×'F–Æ†"FVÆR6–ÆVæ6–"VæFòì:6òW7F—fW"fÆæFòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäçWfVÓ£Â÷7G&öæsâ6Çf"'V—f÷2VÒ6W'fœ:v÷2öâÖÆ–æRÂ6ö×'F–Æ†"÷"Æ–æ²R6öçG&öÆ"VVÒöFRVF—F"ãÂöÆ“à¢Â÷VÃà ¢Æƒ#ã2â–æf÷&Ü:F–6,:6–6&6öæ7W'6óÂöƒ#à¢ÇäVÒ6öæ7W'6÷2;¦&Æ–6÷2Â–æf÷&Ü:F–6,:6–66÷7GVÖ&V6W"6öÖòF—66—Æ–æö'&–vL;7&–â2&æ62Ö—26ö×Vç2Â6öÖò4U5Rô4T%$5RÂd42ÂgVæW7RdubÂ6÷7GVÖÒ6ö'&#£Â÷à¢ÇVÃà¢ÆÆ“ä6öæ6V—F÷2FR†&Gv&RR6ögGv&S³ÂöÆ“à¢ÆÆ“å6—7FVÖ2÷W&6–öæ—2v–æF÷w2RÆ–çWƒ³ÂöÆ“à¢ÆÆ“å6÷FRöff–6R÷RÆ–'&Töff–6S³ÂöÆ“à¢ÆÆ“ä–çFW&æWBÂ–çG&æWBÂW‡G&æWBR6öæ6V—F÷2FR&VFS³ÂöÆ“à¢ÆÆ“å6VwW&ì:vF–æf÷&Ö:|:6òÂl:×'W2ÂÖÇv&RR†—6†–æs³ÂöÆ“à¢ÆÆ“ä&6·WRf÷&Ö2FR&Ö¦VæÖVçFó³ÂöÆ“à¢ÆÆ“äæü:|;VW2FR&æ6òFRFF÷2R6—7FVÖ2FR–æf÷&Ö:|:6ó³ÂöÆ“à¢ÆÆ“äçWfVÒ6ö×WF6–öæÂR6W'fœ:v÷26öÖòRÖÖ–ÂR&Ö¦VæÖVçFòöæÆ–æRãÂöÆ“à¢Â÷VÃà¢ÇåVVÒf’&W7F"6öæ7W'6òFWfRG&V–æ"6öÒ&÷f2çFW&–÷&W2Â÷'VR6ö'&ì:v6÷7GVÖ6W"Ö—2F\;7&–6RFWFÆ†FFòVRFRVÒ7W'6ò6ö×VÒâÆwVç2VF—F—2VFVÒæü:|;VW2FRÄÆ–æ²FóÒ"ö&Æörö6öÖò×&÷FVvW"Ö6ö×WFF÷"ÖvöÇW2Ö–çFW&æWB"6Æ74æÖSÒ'FW‡BÖ66VçB#ç6VwW&ì:vF–v—FÃÂôÆ–æ³âRFRÄÆ–æ²FóÒ"ö&Æörö&6·WÖ6öÖò×&÷FVvW"×6WW2Ö'V—f÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ&6·WÂôÆ–æ³âÂFVÖ2VRFÖ,:–Òf¦VÒ'FRFò6÷F–F–æò&öf—76–öæÂãÂ÷à ¢Æƒ#ãBâ–æf÷&Ü:F–6,:6–6&G&&Æ†óÂöƒ#à¢ÇäæòÖW&6FòFRG&&Æ†òÂ–æf÷&Ü:F–6,:6–6:’g&WVVçFVÖVçFRVÒ,:’×&WV—6—FòÂÖW6Öò&fv2VRì:6ò<:6òFRFV6æöÆöv–â26ö×WL:¦æ6–2W7W&F2–æ6ÇVVÓ£Â÷à¢ÇVÃà¢ÆÆ“äF–v—F:|:6òfÇVVçFS³ÂöÆ“à¢ÆÆ“åW6òFRRÖÖ–Â6÷'÷&F—fò6öÒWF—VWF&öf—76–öæÃ³ÂöÆ“à¢ÆÆ“ä7&–:|:6òRf÷&ÖF:|:6òFRFö7VÖVçF÷3³ÂöÆ“à¢ÆÆ“åÆæ–Æ†26öÒ<:Æ7VÆ÷26–×ÆW2R÷&væ—¦:|:6òFRFF÷3³ÂöÆ“à¢ÆÆ“ä÷&væ—¦:|:6òFR'V—f÷2÷"7F2RæöÖVæ6ÆGW&6Æ&³ÂöÆ“à¢ÆÆ“å'F–6—:|:6òVÒf–FVö6öæfW,:¦æ6–2R&WVæœ;VW2öæÆ–æS³ÂöÆ“à¢ÆÆ“åW6ò6VwW&òFR6Væ†2R'V—f÷26öæf–FVæ6–—2ãÂöÆ“à¢Â÷VÃà¢ÇåVVÒFöÖ–æW76W2öçF÷26öç6VwVR6R6æF–FF"VÖvÖÖ–÷"FRfv2FÖ–æ—7G&F—f2Â÷W&6–öæ—2RFRFVæF–ÖVçFòâ–æf÷&Ü:F–6,:6–6&&ÖVçFR:’7Vf–6–VçFR&6&v÷2L:–6æ–6÷2ÂÖ2:’V6R6V×&RæV6W7<:&–6öÖòöçFòFR'F–FãÂ÷à ¢Æƒ#ãRâ–æf÷&Ü:F–6,:6–6&–æ–6–çFW3¢÷"öæFR6öÖ\:v#Âöƒ#à¢Çå6Rfö<:¢W7L:6öÖ\:væFòFò¦W&òÂò6Ö–æ†òÖ—2Vf–6–VçFR:“£Â÷à¢ÆöÃà¢ÆÆ“ãÇ7G&öæsä&VæFò6ö×WFF÷"l:×6–6ó£Â÷7G&öæsâ6öæ†\:vFV6ÆFòÂÖ÷W6RÂÖöæ—F÷"Â&÷L;VW2R÷'F2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFöÖ–æRò6—7FVÖ÷W&6–öæÃ£Â÷7G&öæsâ&VæF'&—"&öw&Ö2Â7&–"7F2ÂÖ÷fW"'V—f÷2R§W7F"6öæf–wW&:|;VW2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåW6R–çFW&æWB6öÒ&÷;76—Fó£Â÷7G&öæsâ&F—VR'W662ÂÆV–æ÷L:Ö6–2Â6W76R6W'fœ:v÷2;¦&Æ–6÷2R&VæF–FVçF–f–6"6—FW27W7V—F÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä7&–RVÒRÖÖ–ÂRW6RÖó£Â÷7G&öæsâVçf–RÖVç6vVç2ÂæW†R'V—f÷2R÷&væ—¦R6—†FRVçG&FãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäf:vVÒFW‡FòRVÖÆæ–Æ†£Â÷7G&öæsâ7&–RVÒFö7VÖVçFò6öÒVF—F÷"FRFW‡FòRVÖÆæ–Æ†6öÒ6öÖ26–×ÆW2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä&VæF6VwW&ì:v,:6–6£Â÷7G&öæsâW6R6Væ†2F–fW&VçFW2ÂF—fRfW&–f–6:|:6òVÒGV2WF2Rf:v&6·WF÷2'V—f÷2–×÷'FçFW2ãÂöÆ“à¢ÂööÃà¢ÇäFWö—2F—76òÂfö<:¢öFR6VwV—"&6öçF\;¦F÷2Ö—2W7V<:Öf–6÷2â&VçFVæFW"ÖVÆ†÷"÷2gVæFÖVçF÷2F:&VÂÆV–ÄÆ–æ²FóÒ"ö&Æöröò×VRÖRÖ–æf÷&ÖF–6"6Æ74æÖSÒ'FW‡BÖ66VçB#æòVR:’–æf÷&Ü:F–6ÂôÆ–æ³ââ&ÖöçF"VÒÆæòFRW7GVFò6ö×ÆWFòÂfV¦ÄÆ–æ²FóÒ"ö&Æörö6öÖòÖ&VæFW"Ö–æf÷&ÖF–6"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖò&VæFW"–æf÷&Ü:F–6ÂôÆ–æ³âãÂ÷à ¢Æƒ#ãbâ–æf÷&Ü:F–6,:6–6g2â–æf÷&Ü:F–6fì:vFÂöƒ#à¢ÇäF–fW&Vì:vì:6ò:’Væ2FRF–f–7VÆFFRÂÖ2FRö&¦WF—fó£Â÷à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#à¢ÇFƒä7V7FóÂ÷Fƒà¢ÇFƒä–æf÷&Ü:F–6,:6–6Â÷Fƒà¢ÇFƒä–æf÷&Ü:F–6fì:vFÂ÷Fƒà¢Â÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#à¢ÇFCäö&¦WF—fóÂ÷FCà¢ÇFCåW6"ò6ö×WFF÷"RfW'&ÖVçF26ö×Vç3Â÷FCà¢ÇFCä7&–"Â6öæf–wW&"÷RvW&Væ6–"6—7FVÖ3Â÷FCà¢Â÷G#à¢ÇG#à¢ÇFCäW†V×Æ÷3Â÷FCà¢ÇFCäæfVv"ÂVçf–"RÖÖ–ÂÂVF—F"FW‡FóÂ÷FCà¢ÇFCå&öw&Ö"ÂFÖ–æ—7G&"&VFW2ÂÖöçF"6W'f–F÷&W3Â÷FCà¢Â÷G#à¢ÇG#à¢ÇFCä6öæ†V6–ÖVçFòFR†&Gv&SÂ÷FCà¢ÇFCå&V6öæ†V6W"\:v2R6öæV7F"W&–l:—&–6÷3Â÷FCà¢ÇFCäÖöçF"ÂF–væ÷7F–6"R7V'7F—GV—"6ö×öæVçFW3Â÷FCà¢Â÷G#à¢ÇG#à¢ÇFCå6ögGv&SÂ÷FCà¢ÇFCäÆ–6F—f÷2FRW67&—L;7&–òRæfVvF÷#Â÷FCà¢ÇFCå6—7FVÖ2÷W&6–öæ—2fì:vF÷2Â&æ6÷2FRFF÷2Â”DW3Â÷FCà¢Â÷G#à¢ÇG#à¢ÇFCåFV×òL:×–6óÂ÷FCà¢ÇFCå6VÖæ2÷V6÷2ÖW6W3Â÷FCà¢ÇFCäÖW6W2æ÷3Â÷FCà¢Â÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà¢Çä–æf÷&Ü:F–6fì:vF6öç7G,;6’6ö'&R,:6–6âì:6òW†—7FRFÆ†ó¢VVÒVÆ÷2gVæFÖVçF÷26÷7GVÖW&FW"FV×òFWö—26öÒW'&÷26–×ÆW2VRVÖ&6R<;6Æ–FFW&–Wf—FFòãÂ÷à ¢Æƒ#ãrâVçFòFV×òÆWf&&VæFW"–æf÷&Ü:F–6,:6–6Âöƒ#à¢ÇäòFV×òFWVæFRFFVF–6:|:6òRFòö&¦WF—fó£Â÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsã"†÷&2÷"F–£Â÷7G&öæsâVÒ"ÖW6W2:’÷7<:×fVÂFöÖ–æ"òW6ò6÷F–F–æòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä7W'6ò–çFVç6—fó£Â÷7G&öæsâÆwVç27W'6÷26ö'&VÒ&6RVÒ#C†÷&2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäW7GVFò&6öæ7W'6ó£Â÷7G&öæsâFR"BÖW6W2ÂFWVæFVæFòF&ögVæF–FFRFòVF—FÂãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä&VæF—¦Fò6öçL:ÖçVó£Â÷7G&öæsâFV6æöÆöv–×VFÂVçL:6òGVÆ—¦:|:6ò:’W&ÖæVçFRãÂöÆ“à¢Â÷VÃà¢Çäò–×÷'FçFRì:6ò:’fVÆö6–FFRÂÖ2,:F–6&VwVÆ"âW6"ò6ö×WFF÷"&&W6öÇfW"&ö&ÆVÖ2&V—2f—†ò6öæ†V6–ÖVçFòÖVÆ†÷"FòVRVæ276—7F—"VÆ2ãÂ÷à ¢Æƒ#äÖ–æ’W†W&<:Ö6–÷2&&F–6"†ö¦SÂöƒ#à¢ÇäÆV—GW&6÷¦–æ†ì:6òf—†6ö×WL:¦æ6–FR–æf÷&Ü:F–6âW7FW2W†W&<:Ö6–÷2ÆWfÒ÷V6÷2Ö–çWF÷26FR6ö'&VÒòW76Væ6–Ã£Â÷à¢ÆöÃà¢ÆÆ“ä7&–RVÖ7F6†ÖF$W7GVF÷2"æ:&VFRG&&Æ†òRÂFVçG&òFVÆÂVÖ7V'7F6öÒòÜ:§2GVÂãÂöÆ“à¢ÆÆ“å6ÇfRVÒFö7VÖVçFòFRFW‡FòæW767V'7FRFWö—2W6R%6Çf"6öÖò"&vW&"VÖfW'<:6òVÒDbãÂöÆ“à¢ÆÆ“å&VæöÖV–Rò'V—fòÖçFVæFòW‡FVç<:6ò÷&–v–æÂãÂöÆ“à¢ÆÆ“äVçf–RVÒRÖÖ–Â&fö<:¢ÖW6Öò6öÒW76RDbæW†FòR77VçFòFW67&—F—fòãÂöÆ“à¢ÆÆ“ä&—†RVÒ'V—fòVÇVW"RÆö6Æ—¦RÖòæ7FF÷væÆöG26VÒW6"òæfVvF÷"ãÂöÆ“à¢ÆÆ“ä'&VÒ6—FR6öæ†V6–FòR–FVçF–f—VRòFöÜ:Öæ–ò&VÂæ&'&FRVæFW&\:v÷2ãÂöÆ“à¢ÆÆ“ä7&–RVÖ6Væ†ÆöævRW†6ÇW6—f&VÒ6W'fœ:vòRF—fRfW&–f–6:|:6òVÒGV2WF2æVÆRãÂöÆ“à¢ÆÆ“äÖöçFRVÖÆæ–Æ†6öÒ6–æ6òFW7W62R6Æ7VÆRòF÷FÂ6öÒVÖl;7&×VÆFR6öÖãÂöÆ“à¢ÆÆ“ä6÷–R7F$W7GVF÷2"&VÒVæG&—fR÷R6W'fœ:vòFRçWfVÒ(	BW76R:’ò6WR&–ÖV—&ò&6·WãÂöÆ“à¢ÂööÃà ¢Æƒ#ä6†V6¶Æ—7C¢òVRW7GVF"VÒ–æf÷&Ü:F–6,:6–6Âöƒ#à¢ÇVÃà¢ÆÆ“åW6òFò6ö×WFF÷"RW&–l:—&–6÷3ÂöÆ“à¢ÆÆ“å6—7FVÖ÷W&6–öæÂRvW&Væ6–ÖVçFòFR'V—f÷3ÂöÆ“à¢ÆÆ“ä–çFW&æWBÂ'W66R6VwW&ì:vöæÆ–æSÂöÆ“à¢ÆÆ“äRÖÖ–ÂR6ö×Væ–6:|:6òF–v—FÃÂöÆ“à¢ÆÆ“äVF—F÷"FRFW‡FòRÆæ–Æ†3ÂöÆ“à¢ÆÆ“å6VwW&ì:vF–v—FÂR&6·WÂöÆ“à¢ÆÆ“ä–×&W7<:6òRf–FVö6öæfW,:¦æ6–ÂöÆ“à¢ÆÆ“äæü:|;VW2FR†&Gv&RRÖçWFVì:|:6ò&WfVçF—fÂöÆ“à¢Â÷VÃà ¢Æƒ#ävÆ÷7<:&–òFR–æf÷&Ü:F–6,:6–6Âöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒåFW&ÖóÂ÷FƒãÇFƒäW‡Æ–6:|:6ò6–×ÆW3Â÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCå6—7FVÖ÷W&6–öæÃÂ÷FCãÇFCå&öw&Ö&–æ6—ÂVR6öçG&öÆò6ö×WFF÷"…v–æF÷w2ÂÆ–çW‚ÂÖ4õ2’ãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä'V—fóÂ÷FCãÇFCåVæ–FFRFR–æf÷&Ö:|:6ò6Çf¢VÒFö7VÖVçFòÂVÖf÷FòÂVÖÆæ–Æ†ãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCå7F†F—&WL;7&–ò“Â÷FCãÇFCä6—†VRw'W'V—f÷2&ÖçFW"÷&væ—¦:|:6òãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäW‡FVç<:6óÂ÷FCãÇFCäf–æÂFòæöÖRFò'V—fò‚çFbÂæFö7‚’VR–æF–6òF—òFR6öçF\;¦FòãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäæfVvF÷#Â÷FCãÇFCå&öw&ÖW6Fò&6W76"6—FW2„6‡&öÖRÂf—&Vf÷‚ÂVFvR’ãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäçWfVÓÂ÷FCãÇFCä&Ö¦VæÖVçFòVÒ6W'f–F÷&W26W76F÷2VÆ–çFW&æWBãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCå†—6†–æsÂ÷FCãÇFCäÖVç6vVÒfÇ6VR–Ö—FV×&W66öæ†V6–F&&÷V&"FF÷2ãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäFÆ†òFRFV6ÆFóÂ÷FCãÇFCä6öÖ&–æ:|:6òFRFV6Æ2VRW†V7WFVÖ:|:6ò6VÒW6"òÖ÷W6RãÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"Ö&÷&FW"&rÖ×WFVBóCÓBæ÷B×&÷6R×’Ób#à¢Æƒ"6Æ74æÖSÒ'FW‡BÖ&6RföçB×6VÖ–&öÆBÒÓ#äÆV–FÖ,:–ÓÂöƒ#à¢ÇVÂ6Æ74æÖSÒ&×BÓ"Ö"ÓÆ—7BÖF—62ÂÓRFW‡B×6Ò#à¢ÆÆ“ãÄÆ–æ²FóÒ"ö&Æöröò×VRÖRÖ–æf÷&ÖF–6"6Æ74æÖSÒ'FW‡BÖ66VçB#äòVR:’–æf÷&Ü:F–6ÂôÆ–æ³â(	BFVf–æœ:|:6ò6ö×ÆWFF:&VR7V2F—f—<;VW2ãÂöÆ“à¢ÆÆ“ãÄÆ–æ²FóÒ"ö&Æörö6öÖòÖ&VæFW"Ö–æf÷&ÖF–6"6Æ74æÖSÒ'FW‡BÖ66VçB#ä6öÖò&VæFW"–æf÷&Ü:F–6ÂôÆ–æ³â(	B&÷FV—&òFRW7GVFòVÒf6W2Â6öÒ7&öæöw&ÖãÂöÆ“à¢ÆÆ“ãÄÆ–æ²FóÒ"ö&Æörö6ö×WFF÷"ÖÆVçFòÖ6W62×6öÇV6öW2"6Æ74æÖSÒ'FW‡BÖ66VçB#ä6ö×WFF÷"ÆVçFó¢6W62R6öÇ\:|;VW3ÂôÆ–æ³â(	BÆ–6:|:6ò,:F–6FòVRfö<:¢&VæFWR6ö'&R6—7FVÖR'V—f÷2ãÂöÆ“à¢ÆÆ“ãÄÆ–æ²FóÒ"ö&Æörö6öÖòÖÖVÆ†÷&"×6–æÂ×v–f’ÖVÒÖ66"6Æ74æÖSÒ'FW‡BÖ66VçB#ä6öÖòÖVÆ†÷&"ò6–æÂFRv’Ôf’VÒ66ÂôÆ–æ³â(	Bæü:|;VW2FR&VFRæòF–F–ãÂöÆ“à¢Â÷VÃà¢Âö6–FSà ¢Æƒ#å&VfW,:¦æ6–2RföçFW3Âöƒ#à¢ÇVÃà¢ÆÆ“ãÆ‡&VcÒ&‡GG3¢òöÆV&âæÖ–7&÷6ögBæ6öÒ÷BÖ'"÷v–æF÷w2ò"&VÃÒ&æöföÆÆ÷ræö÷VæW""F&vWCÒ%ö&Ææ²#äÖ–7&÷6ögBÆV&â(	Bv–æF÷w3Âöâ(	BFö7VÖVçF:|:6òöf–6–Â6ö'&R6—7FVÖ÷W&6–öæÂÂ'V—f÷2R6öæf–wW&:|;VW2ãÂöÆ“à¢ÆÆ“ãÆ‡&VcÒ&‡GG3¢òöFö7VÖVçFF–öâæÆ–'&Vöff–6Ræ÷&r÷BÖ'"ò"&VÃÒ&æöföÆÆ÷ræö÷VæW""F&vWCÒ%ö&Ææ²#äFö7VÖVçF:|:6òFòÆ–'&Töff–6SÂöâ(	BwV–2Æ—g&W2FRFW‡FòÂÆæ–Æ†R&W6VçF:|:6òãÂöÆ“à¢ÆÆ“ãÆ‡&VcÒ&‡GG3¢òö6'F–Æ†æ6W'Bæ'"ò"&VÃÒ&æöföÆÆ÷ræö÷VæW""F&vWCÒ%ö&Ææ²#ä6'F–Æ†FR6VwW&ì:v&–çFW&æWB„4U%Bæ'"“Âöâ(	B&V6öÖVæF:|;VW2;¦&Æ–62FR6Væ†2Â†—6†–ærR&6·WãÂöÆ“à¢ÆÆ“ãÆ‡&VcÒ&‡GG3¢ò÷wwræv÷bæ'"öÖV2÷BÖ'""&VÃÒ&æöföÆÆ÷ræö÷VæW""F&vWCÒ%ö&Ææ²#äÖ–æ—7L:—&–òFVGV6:|:6ò„ÔT2“Âöâ(	B&VfW,:¦æ6–27W'&–7VÆ&W2&7W'6÷2L:–6æ–6÷2RFRVÆ–f–6:|:6òãÂöÆ“à¢Â÷VÃà¢Ç6Æ74æÖSÒ'FW‡B×6ÒFW‡BÖ×WFVBÖf÷&Vw&÷VæB#ä6öçF\;¦Fò&öGW¦–FòR&Wf—6FòVÆWV—RVF—F÷&–ÂFRòL:–6æ–6òFR–æf÷&Ü:F–6â&Wf—6FòVÒRFRv÷7FòFR##bãÂ÷à ¢Æƒ#ä6öæ6ÇW<:6óÂöƒ#à¢Çä–æf÷&Ü:F–6,:6–6:’÷'FFRVçG&F&ò×VæFòF–v—FÂâVÆVç6–æW6"ò6ö×WFF÷"Â–çFW&æWBR2fW'&ÖVçF2FR&öGWF—f–FFRFRf÷&Ö6VwW&RVf–6–VçFRâ6W'fR&–æ–6–çFW2Â6æF–FF÷26öæ7W'6÷2R&öf—76–öæ—2VR&V6—6Ò&Vf÷,:v"6ö×WL:¦æ6–2W76Væ6–—2ãÂ÷à¢Çä&VæFW"–æf÷&Ü:F–6,:6–6ì:6òG&ç6f÷&Öæ–æw\:–ÒVÒW7V6–Æ—7FFæö—FR&òF–ÂÖ27&–&6RæV6W7<:&–&fì:v"6öÒ6öæf–ì:vâVVÒFöÖ–æ÷2gVæFÖVçF÷2V6öæöÖ—¦FV×òÂWf—FW'&÷26ö×Vç2RW7L:ÖVÆ†÷"&W&Fò&&÷fV—F"÷÷'GVæ–FFW2æòG&&Æ†òRæ÷2W7GVF÷2âfV¦÷WG&÷2wV–2L:–6æ–6÷2æòÄÆ–æ²FóÒ"ö&Æör"6Æ74æÖSÒ'FW‡BÖ66VçB#æ&ÆösÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&6öÖòÖ&VæFW"Ö–æf÷&ÖF–6#¢°¢F—FÆS¢$6öÖò&VæFW"–æf÷&Ü:F–6Fò¦W&ó¢wV–,:F–6ò&–æ–6–çFW2"À¢W†6W'C¢$FW67V'&6öÖò&VæFW"–æf÷&Ü:F–6Fò¦W&òÂVÒ66Â&6öæ7W'6ò÷RG&&Æ†òâ&÷FV—&ò,:F–6òÂ&V7W'6÷2w&GV—F÷2RF–62FRW7GVFòâ"À¢FFS¢###bÓ‚ÓR"À¢&VEF–ÖS¢#2Ö–â"À¢6FVv÷'“¢$gVæFÖVçF÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#ä&VæFW"–æf÷&Ü:F–6Fò¦W&òöFR&V6W"f7FòFVÖ—2â†&Gv&RÂ6ögGv&RÂ–çFW&æWBÂ6VwW&ì:vÂ&öw&Ö:|:6òRÖ–Â7W'6÷2&öÖWFVæFò&W7VÇFF÷2,:–F÷26ö×WFVÒVÆFVì:|:6òâfW&FFR:’VRæ–æw\:–Ò&VæFR–æf÷&Ü:F–6Fæö—FR&òF–ÂÖ2VÇVW"W76ö6öç6VwVRWföÇV—"6öÒVÒ&÷FV—&ò6Æ&òÂ,:F–66öç7FçFRRW‡V7FF—f6W'FãÂ÷à ¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"Ö&÷&FW"&rÖ×WFVBóCÓBæ÷B×&÷6R×’Ób#à¢Æƒ"6Æ74æÖSÒ'FW‡BÖ&6RföçB×6VÖ–&öÆBÒÓ#å&W7VÖòVÒÖ–çWFóÂöƒ#à¢ÇVÂ6Æ74æÖSÒ&×BÓ"Ö"ÓÆ—7BÖF—62ÂÓRFW‡B×6Ò#à¢ÆÆ“ä6öÖV6RFVf–æ–æFòòö&¦WF—fó¢W6òW76öÂÂG&&Æ†òÂ6öæ7W'6ò÷R6'&V—&VÒFV6æöÆöv–ãÂöÆ“à¢ÆÆ“äF–væ÷7F—VR6WRì:×fVÂGVÂçFW2FRW66öÆ†W"ÖFW&–ÂãÂöÆ“à¢ÆÆ“äfæ6R÷"f6W3¢fÖ–Æ–&—¦:|:6òÂ'V—f÷2R–çFW&æWBÂ&öGWF—f–FFRÂ6VwW&ì:vÂ†&Gv&RR&VFW2ÂW7V6–Æ—¦:|:6òãÂöÆ“à¢ÆÆ“å&F—VRF&Vf2&V—2FöF6VÖæ(	B,:F–6fÆRÖ—2VRf–FVöVÆ76—7F–FãÂöÆ“à¢ÆÆ“åW6RföçFW2öf–6–—2Rw&GV—F3²&Wf—6RòVR¬:W7GVF÷RçFW2FR7&W66VçF"77VçFòæ÷fòãÂöÆ“à¢Â÷VÃà¢Âö6–FSà ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çå&&VæFW"–æf÷&Ü:F–6Fò¦W&òÂFVf–æ6WRö&¦WF—fòÂFöÖ–æR÷2gVæFÖVçF÷2Â&F—VRFöF÷2÷2F–2R<;2FWö—2W66öÆ†VÖW7V6–Æ—¦:|:6òâò6Ö–æ†òöFR6W"F—f–F–FòVÒVG&òf6W3¢fÖ–Æ–&—¦:|:6ò6öÒò6ö×WFF÷"Â&öGWF—f–FFRF–v—FÂÂ&ögVæFÖVçFòRW7V6–Æ—¦:|:6òâ6öÒFVF–6:|:6ò&VwVÆ"Âòì:×fVÂ,:6–6ò:’Æ6ì:vFòVÒÆwVÖ26VÖæ3²òì:×fVÂ&öf—76–öæÂW†–vRÖW6W2÷Ræ÷2ãÂ÷à ¢Æƒ#ãâçFW2FR6öÖ\:v#¢FVf–æ6WRö&¦WF—fóÂöƒ#à¢ÇäòW7GVFòFR–æf÷&Ü:F–6×VFFRf÷&ÖFWVæFVæFòFòVRfö<:¢VW"âçFW2FRW66öÆ†W"VÒ7W'6ò÷RGWF÷&–ÂÂ&W7öæF¢&VR&V6—6òF—76óóÂ÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsåW6òW76öÃ£Â÷7G&öæsâæfVv"ÂW6"RÖÖ–ÂÂ÷&væ—¦"f÷F÷2R6W76"6W'fœ:v÷2F–v—F—2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåG&&Æ†òöW67&—L;7&–ó£Â÷7G&öæsâF–v—F"&VÒÂW6"Ææ–Æ†2Â'F–6—"FR&WVæœ;VW2öæÆ–æRR÷&væ—¦"'V—f÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6öæ7W'6ò;¦&Æ–6ó£Â÷7G&öæsâFöÖ–æ"òVF—FÂÂ&W6öÇfW"VW7L;VW2R6öæ†V6W"FW&Ö–æöÆöv–ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&öf—76–öæÆ—¦:|:6ó£Â÷7G&öæsâ6VwV—"&7W÷'FRL:–6æ–6òÂ&VFW2Â&öw&Ö:|:6òÂ6VwW&ì:v÷R&æ6òFRFF÷2ãÂöÆ“à¢Â÷VÃà¢ÇåVVÒW7GVF6VÒö&¦WF—fò6÷7GVÖVÆ"FR77VçFòVÒ77VçFòRì:6ò6öç6öÆ–F"æFâVVÒFVÒö&¦WF—fò6öç6VwVRf–ÇG&"òVR:’W76Væ6–ÂFòVR:’F—7G&:|:6òãÂ÷à ¢Æƒ#äF–vì;77F–6ó¢VÒVRì:×fVÂfö<:¢W7L:Âöƒ#à¢ÇäW66öÆ†W"ÖFW&–Â6VÒ6öæ†V6W"ò,;7&–òì:×fVÂ:’òW'&òÖ—26&òFRVVÒW7GVF6÷¦–æ†òâÖ'VRÖVçFÆÖVçFRòVRfö<:¢¬:f¢6VÒ§VF£Â÷à¢ÇVÃà¢ÆÆ“äÆ–v"ÂFW6Æ–v"R&V–æ–6–"ò6ö×WFF÷"6öÒ6VwW&ì:vãÂöÆ“à¢ÆÆ“äæfVv"æ–çFW&æWBRW7V—6"–æf÷&Ö:|:6ò6öæfœ:fVÂãÂöÆ“à¢ÆÆ“ä7&–"Â&VæöÖV"ÂÖ÷fW"RÆö6Æ—¦"'V—f÷2R7F2ãÂöÆ“à¢ÆÆ“äVçf–"R&V6V&W"RÖÖ–Ç26öÒæW†òãÂöÆ“à¢ÆÆ“å&öGW¦—"VÒFö7VÖVçFòFRFW‡FòRVÖÆæ–Æ†6–×ÆW2ãÂöÆ“à¢ÆÆ“ä–ç7FÆ"RFW6–ç7FÆ"&öw&Ö2ãÂöÆ“à¢ÆÆ“äf¦W"&6·WF÷2'V—f÷2–×÷'FçFW2ãÂöÆ“à¢ÆÆ“å&V6öæ†V6W"÷26ö×öæVçFW2,:6–6÷2Fò6ö×WFF÷"ãÂöÆ“à¢ÆÆ“å&W6öÇfW"&ö&ÆVÖ26–×ÆW2Â6öÖò–×&W76÷&VRì:6ò–×&–ÖR÷Rv’Ôf’VR6—RãÂöÆ“à¢Â÷VÃà¢Çå¦W&òFö—2—FVç3¢6öÖV6RVÆf6RâG,:§26–æ6ó¢6öÖV6RVÆf6R"R&Wf—6RòVRf–6÷R&G,:2â6V—2ö—Fó¢l:F—&WFò&6VwW&ì:vÂ†&Gv&RR&VFW2âæ÷fR—FVç3¢6WR,;7†–Öò76ò:’W66öÆ†W"VÖW7V6–Æ—¦:|:6òãÂ÷à ¢Æƒ#ã"â&÷FV—&òFR&VæF—¦FòVÒBf6W3Âöƒ#à ¢Æƒ3äf6R(	BfÖ–Æ–&—¦:|:6òƒ"6VÖæ2“Âöƒ3à¢Çäö&¦WF—fó¢W&FW"òÖVFòFò6ö×WFF÷"R&VæFW"÷W,:ÖÆòãÂ÷à¢ÇVÃà¢ÆÆ“å&V6öæ†V6W"òv&–æWFRÂÖöæ—F÷"ÂFV6ÆFòÂÖ÷W6RR6&÷2ãÂöÆ“à¢ÆÆ“äÆ–v"ÂFW6Æ–v"R&V–æ–6–"6÷'&WFÖVçFRãÂöÆ“à¢ÆÆ“åW6"òÖ÷W6RRòFV6ÆFò6öÒfÇV–FW¢ãÂöÆ“à¢ÆÆ“äæfVv"VÆ–çFW&f6RFòv–æF÷w2ãÂöÆ“à¢ÆÆ“ä7&–"7F2Â6Çf"'V—f÷2RVæ6öçG,:ÖÆ÷2FWö—2ãÂöÆ“à¢Â÷VÃà¢Çå6Rfö<:¢çVæ6W6÷RVÒ6ö×WFF÷"ÂW76f6R:’Ö—2–×÷'FçFRâì:6òVÆRâFöÜ:Öæ–òl:×6–6òvW&6öæf–ì:v&GVFòòVRfVÒFWö—2ãÂ÷à ¢Æƒ3äf6R"(	B&öGWF—f–FFRF–v—FÂƒ"B6VÖæ2“Âöƒ3à¢Çäö&¦WF—fó¢W6"ò6ö×WFF÷"&&W6öÇfW"F&Vf2&V—2ãÂ÷à¢ÇVÃà¢ÆÆ“äæfVv"æ–çFW&æWB6öÒ6VwW&ì:vãÂöÆ“à¢ÆÆ“ä7&–"R÷&væ—¦"VÒRÖÖ–ÂãÂöÆ“à¢ÆÆ“äW67&WfW"Rf÷&ÖF"Fö7VÖVçF÷2ãÂöÆ“à¢ÆÆ“ä7&–"Ææ–Æ†26öÒ<:Æ7VÆ÷26–×ÆW2ãÂöÆ“à¢ÆÆ“äÆ–6"æü:|;VW2FR6VwW&ì:vF–v—FÂãÂöÆ“à¢Â÷VÃà¢ÇäV’ò6öçF\;¦FòFRÄÆ–æ²FóÒ"ö&Æörö–æf÷&ÖF–6Ö&6–6"6Æ74æÖSÒ'FW‡BÖ66VçB#æ–æf÷&Ü:F–6,:6–6ÂôÆ–æ³â6ö'&RV6RGVFòòVRfö<:¢&V6—6âW6Rò6ö×WFF÷"&&W6öÇfW"VÖF&Vf&VÂFöF6VÖæ¢Vçf–"VÒRÖÖ–Âf÷&ÖÂÂ÷&væ—¦"6öçF2VÒVÖÆæ–Æ†Âf¦W"VÖW7V—66öæfœ:fVÂãÂ÷à ¢Æƒ3äf6R2(	B&ögVæFÖVçFòƒ2ÖW6W2“Âöƒ3à¢Çäö&¦WF—fó¢VçFVæFW"6öÖò26ö—62gVæ6–öæÒR&W6öÇfW"&ö&ÆVÖ26ö×Vç2ãÂ÷à¢ÇVÃà¢ÆÆ“ä6öæf–wW&:|;VW2Fò6—7FVÖ÷W&6–öæÂãÂöÆ“à¢ÆÆ“å&VFW2FöÜ:—7F–62Âv’Ôf’R6öÇ\:|:6òFRfÆ†2ãÂöÆ“à¢ÆÆ“ä&6·WFR'V—f÷2R÷&væ—¦:|:6òFRFF÷2ãÂöÆ“à¢ÆÆ“äÖçWFVì:|:6ò&WfVçF—f¢Æ–×W¦ÂGVÆ—¦:|;VW2ÂçF—l:×'W2ãÂöÆ“à¢ÆÆ“äF–vì;77F–6òFR&ö&ÆVÖ26–×ÆW2ãÂöÆ“à¢Â÷VÃà¢ÇäwV–2,:F–6÷26öÖòÄÆ–æ²FóÒ"ö&Æörö6öÖòÖÖVÆ†÷&"×6–æÂ×v–f’ÖVÒÖ66"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòÖVÆ†÷&"ò6–æÂv’Ôf’VÒ66ÂôÆ–æ³âÂÄÆ–æ²FóÒ"ö&Æörö&6·WÖ6öÖò×&÷FVvW"×6WW2Ö'V—f÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ&6·WFR'V—f÷3ÂôÆ–æ³âRÄÆ–æ²FóÒ"ö&Æörö6öÖò×&÷FVvW"Ö6ö×WFF÷"ÖvöÇW2Ö–çFW&æWB"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&÷F\:|:6ò6öçG&vöÇW2æ–çFW&æWCÂôÆ–æ³â§VFÒf—†"W76W26öæ6V—F÷26öÒ6—GV:|;VW2&V—2ãÂ÷à ¢Æƒ3äf6RB(	BW7V6–Æ—¦:|:6ò†6öçL:ÖçVò“Âöƒ3à¢Çäö&¦WF—fó¢W66öÆ†W"VÒ6Ö–æ†òL:–6æ–6òR&ögVæF"ãÂ÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæså7W÷'FRL:–6æ–6ó£Â÷7G&öæsâÖçWFVì:|:6òÂf÷&ÖF:|:6òÂ&W&òFR†&Gv&RãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&VFW3£Â÷7G&öæsâ6öæf–wW&:|:6òFR&÷FVF÷&W2Â6&VÖVçFòÂ&÷Fö6öÆ÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6VwW&ì:v£Â÷7G&öæsâFVfW6FRVæGö–çG2Âì:Æ—6RFRÖV:v2Â6öæf÷&Ö–FFRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä&æ6òFRFF÷3£Â÷7G&öæsâÖöFVÆvVÒÂ5ÂÂFÖ–æ—7G&:|:6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&öw&Ö:|:6ó£Â÷7G&öæsâÌ;6v–6ÂÆ–æwVvVç2ÂFW6VçföÇf–ÖVçFòFR6—7FVÖ2ãÂöÆ“à¢Â÷VÃà¢Çä6FVÖFW762:&V2W†–vRÖW6W2÷Ræ÷2FRW7GVFòâW66öÆ†VÖÂf:v&ö¦WF÷2WVVæ÷2Rl:VÖVçFæFò6ö×ÆW†–FFRãÂ÷à ¢Æƒ#ä7&öæöw&ÖFRW†V×Æò&3F–3Âöƒ#à¢ÇäòÆæò&—†ò:’VÒW†V×Æò§W7L:fVÂÂì:6òVÖ&öÖW76FRFöÜ:Öæ–ò6ö×ÆWFòâVÆR77VÖR6W&6FRCÖ–çWF÷2÷"F–Â6–æ6òF–2÷"6VÖæãÂ÷à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#à¢ÇFƒå6VÖæÂ÷Fƒà¢ÇFƒäfö6óÂ÷Fƒà¢ÇFƒäVçG&Vv,:F–6Â÷Fƒà¢Â÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#à¢ÇFCãÂ÷FCà¢ÇFCä6ö×WFF÷"Â6—7FVÖ÷W&6–öæÂÂ'V—f÷2R7F3Â÷FCà¢ÇFCäW7G'WGW&FR7F2÷&væ—¦FRVÒFö7VÖVçFò6ÇfòVÒDcÂ÷FCà¢Â÷G#à¢ÇG#à¢ÇFCã#Â÷FCà¢ÇFCä–çFW&æWBÂ'W66ÂæfVvF÷"ÂRÖÖ–ÃÂ÷FCà¢ÇFCåVÒRÖÖ–Âf÷&ÖÂVçf–Fò6öÒæW†òRVÒ'V—fò&—†FòRÆö6Æ—¦FóÂ÷FCà¢Â÷G#à¢ÇG#à¢ÇFCã3Â÷FCà¢ÇFCåFW‡FòÂÆæ–Æ†Â&W6VçF:|:6òÂçWfVÓÂ÷FCà¢ÇFCåÆæ–Æ†FR6öçG&öÆR6öÒl;7&×VÆ26–×ÆW2R6ö×'F–Æ†F÷"Æ–æ³Â÷FCà¢Â÷G#à¢ÇG#à¢ÇFCãCÂ÷FCà¢ÇFCå6VwW&ì:vÂ&6·WÂÖçWFVì:|:6ò,:6–6Â÷FCà¢ÇFCåfW&–f–6:|:6òVÒGV2WF2F—fFR&6·WF÷2'V—f÷2–×÷'FçFW3Â÷FCà¢Â÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà¢Çå6RVÖ6VÖæì:6òfV6†"Â&W—F6VÖæVÒfW¢FRfì:v"â&6RÖÆfV—F6ö'&§W&÷2æ2f6W26VwV–çFW2ãÂ÷à ¢Æƒ#ä6öÖò&F–6#¢F&Vf26öæ7&WF3Âöƒ#à¢Çå,:F–66–væ–f–6&öGW¦—"ÆvòÂì:6òVæ2&WWF—"6Æ—VW2â7VvW7L;VW2VR6&VÒVÒVÖ6W7<:6ò7W'F£Â÷à¢ÇVÃà¢ÆÆ“ä7&–"VÖW7G'WGW&FR7F2&Fö7VÖVçF÷2W76ö—2Â6öÒæöÖW2G&öæ—¦F÷2ãÂöÆ“à¢ÆÆ“äW67&WfW"VÒFö7VÖVçFòFRVÖ:v–æ6öÒL:×GVÆòÂ7V'L:×GVÆ÷2RVÖF&VÆãÂöÆ“à¢ÆÆ“äÖöçF"VÖÆæ–Æ†FRv7F÷26öÒ6öÖÂÜ:–F–Rf–ÇG&òãÂöÆ“à¢ÆÆ“ä6öçfW'FW"VÒFö7VÖVçFò&DbR§VçL:ÖÆò÷WG&òãÂöÆ“à¢ÆÆ“ä–ç7FÆ"VÖGVÆ—¦:|:6òVæFVçFRFò6—7FVÖR&V–æ–6–"6÷'&WFÖVçFRãÂöÆ“à¢ÆÆ“äf¦W"VÒ&6·W6ö×ÆWFòF÷2'V—f÷2–×÷'FçFW2VÒ÷WG&òF—7÷6—F—fòãÂöÆ“à¢ÆÆ“å&V6öæf–wW&"6öæWŒ:6òv’Ôf’RFW7F"fVÆö6–FFR(	Bò76ò76òW7L:VÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖ6öæf–wW&"×&÷FVF÷"×v–f’Ö–æ–6–çFW2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖò6öæf–wW&"ò&÷FVF÷"v’Ôf“ÂôÆ–æ³âãÂöÆ“à¢ÆÆ“äæÆ—6"VÖÖVç6vVÒ7W7V—FR–FVçF–f–6"÷26–æ—2FRvöÇRãÂöÆ“à¢Â÷VÃà ¢Æƒ#ä6öÖò&VæFW"–æf÷&Ü:F–6VÒ66Âöƒ#à¢ÇäW7GVF"VÒ66gVæ6–öæVæFòòÖ&–VçFRR&÷F–æ6ö÷W&ÒâòWV—ÖVçFòöFR6W"ÖöFW7Fó¢VÇVW"6ö×WFF÷"VRÆ–wVRÂ'&òæfVvF÷"RVÒVF—F÷"FRFW‡Fò¬:W&Ö—FR6ö'&—"FöF22f6W2–æ–6–—2â6VÇVÆ"§VF&6öç7VÖòFR6öçF\;¦FòÂÖ2ì:6ò7V'7F—GV’FV6ÆFòÂÖ÷W6RRvW&Væ6–ÖVçFòFR'V—f÷2ãÂ÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæså&÷F–æ£Â÷7G&öæsâ6W7<;VW27W'F2Rg&WVVçFW2&VæFVÒÖ—2FòVRÖ&Föæ2FRf–ÒFR6VÖæãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&Vv—7G&ó£Â÷7G&öæsâÖçFVæ†VÒ6FW&æò(	Bl:×6–6ò÷RF–v—FÂ(	B6öÒò76ò76òFòVRfö<:¢&VæFWRf¦W"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäW'&÷3£Â÷7G&öæsâFW7F"VÒVÖ7FFR&67Væ†òWf—FòÖVFòFRW7G&v"Ævò–×÷'FçFRãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6VwW&ì:v£Â÷7G&öæsâ&—†R&öw&Ö2Væ2FRföçFW2öf–6–—2VçVçFò–æFì:6ò6&RfÆ–"&—66÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä&6·WçFW2FRW‡W&–ÖVçF#£Â÷7G&öæsâVÇVW"FW7FRÖ—2÷W6Fò6öÖ\:v÷"VÖ<;7–F÷2'V—f÷2ãÂöÆ“à¢Â÷VÃà ¢Æƒ#ã2â&V7W'6÷2w&GV—F÷2&&VæFW"–æf÷&Ü:F–6Âöƒ#à¢ÇäW†—7FVÒ×V—F2÷:|;VW2w&GV—F2RFRVÆ–FFRâò–×÷'FçFR:’W66öÆ†W"VÖR6VwV—"L:’òf–Ó£Â÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsäÖ–7&÷6ögBÆV&ã£Â÷7G&öæsâ7W'6÷2öf–6–—26ö'&Rv–æF÷w2Âöff–6RRgVæFÖVçF÷2FRçWfVÒãÂöÆ“à¢ÆÆ“ãÇ7G&öæsävöövÆRF–v—FÂv&vS£Â÷7G&öæsâ6öçF\;¦F÷2FRÖ&¶WF–ærF–v—FÂÂ&öGWF—f–FFRR†&–Æ–FFW2&öf—76–öæ—2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsägVæF:|:6ò'&FW66ó£Â÷7G&öæsâ7W'6÷2w&GV—F÷2FR–æf÷&Ü:F–6,:6–6Âv–æF÷w2Âv÷&BÂW†6VÂRæü:|;VW2FR–çFW&æWBãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä7W'6òVÒl:ÖFVó£Â÷7G&öæsâVÆ2w&GV—F2VÒ÷'GVw\:§26ö'&R–æf÷&Ü:F–6Â†&Gv&RR&öw&Ö:|:6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÆ–'&Töff–6RFö7VÖVçFF–öã£Â÷7G&öæsâFö7VÖVçF:|:6òöf–6–ÂF7\:×FRFRW67&—L;7&–òÆ—g&RãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä¶†â6FV×“£Â÷7G&öæsâgVæFÖVçF÷2FR6ö×WF:|:6òRVç6ÖVçFò6ö×WF6–öæÂãÂöÆ“à¢Â÷VÃà¢Çå&V7W'6÷2w&GV—F÷2&W6öÇfVÒ'FRF\;7&–6ÂÖ2,:F–6FWVæFRFRfö<:¢âì:6òF–çF76—7F—"FW¦Væ2FRVÆ26VÒ&WWF—"òVRfö’Vç6–æFòãÂ÷à ¢Æƒ#ãBâ–æf÷&Ü:F–6&7&–ì:v3Âöƒ#à¢Çä7&–ì:v2&VæFVÒÖVÆ†÷"VæFòò&ö6W76ò:’Ì;¦F–6òRw&GVÂâÌ;6v–66ö×WF6–öæÂöFR6W"Vç6–æFçFW2ÖW6ÖòFÆV—GW&ÆVæÂ÷"ÖV–òFR¦öv÷2RÆFf÷&Ö2f—7V—2ãÂ÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæså67&F6ƒ£Â÷7G&öæsâ&öw&Ö:|:6òVÒ&Æö6÷2VRVç6–æÌ;6v–6FRf÷&Ö7&–F—fãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6öFRæ÷&s£Â÷7G&öæsâF—f–FFW2vÖ–f–6F2RFFF2÷"f—†WL:&–ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä¦öv÷2VGV6F—f÷3£Â÷7G&öæsâVV'&Ö6&\:v2ÂÆ&—&–çF÷2RFW6f–÷2FR6W\:¦æ6–ãÂöÆ“à¢Â÷VÃà¢Çäòfö6òFWfR6W"W7F–×VÆ"ò&6–ö<:Öæ–òÌ;6v–6òÂ6œ:¦æ6–&&W6öÇfW"&ö&ÆVÖ2RòW6ò&W7öç<:fVÂFFV6æöÆöv–ãÂ÷à ¢Æƒ#ãRâ–æf÷&Ü:F–6&–F÷6÷3Âöƒ#à¢Çä–F÷6÷2öFVÒ&VæFW"–æf÷&Ü:F–6&VÒÂFW6FRVRò&—FÖò6V¦&W7V—FFòâÖVÜ;7&–×W67VÆ"R6öæf–ì:vÆWfÒÖ—2FV×ò&6R6öç6öÆ–F"ÂVçL:6ò&WWFœ:|:6ò:’W76Væ6–ÂãÂ÷à¢ÇVÃà¢ÆÆ“ä6öÖV6RVÆòW76Væ6–Ã¢Æ–v"ÂFW6Æ–v"Â'&—"òæfVvF÷"RW6"òRÖÖ–ÂãÂöÆ“à¢ÆÆ“å&–÷&—¦RF&Vf2VRL:¦Ò6–væ–f–6FòW76öÃ¢fW"f÷F÷2ÂfÆ"6öÒfÜ:ÖÆ–÷"f–FVö6†ÖFãÂöÆ“à¢ÆÆ“å&Vf÷&6R6VwW&ì:v¢vöÇW2Â6Væ†2RÆ–æ·27W7V—F÷2ãÂöÆ“à¢ÆÆ“å&W—FòÖW6ÖòW†W&<:Ö6–òl:&–2fW¦W2VÒF–2F–fW&VçFW2ãÂöÆ“à¢Â÷VÃà¢Çä6œ:¦æ6–Fò–ç7G'WF÷":’L:6ò–×÷'FçFRVçFòò6öçF\;¦FòâWVVæ26öçV—7F2Fœ:&–2vW&ÒWFöæöÖ–ãÂ÷à ¢Æƒ#ãbâ–æf÷&Ü:F–6&6öæ7W'6óÂöƒ#à¢ÇäW7GVF"&6öæ7W'6òW†–vRF—66—Æ–æRfö6òæòVF—FÂâ–æf÷&Ü:F–6VÒ6öæ7W'6÷26÷7GVÖ6W"F\;7&–6R6ö'&FW&Ö–æöÆöv–W7V<:Öf–6ãÂ÷à¢ÆöÃà¢ÆÆ“ãÇ7G&öæsåVwVRòVF—FÃ£Â÷7G&öæsâ–FVçF–f—VR÷2L;7–6÷2W†–v–F÷2R&æ6÷&væ—¦F÷&ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåW6RÖFW&–—2fö6F÷3£Â÷7G&öæsâ÷7F–Æ2R7W'6÷2VR6–vÒòVF—FÂãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&W6öÇf&÷f2çFW&–÷&W3£Â÷7G&öæsâ:’f÷&ÖÖ—2Vf–6–VçFRFRVçFVæFW"òW7F–ÆòF&æ6ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäf:v6–×VÆF÷3£Â÷7G&öæsâG&V–æRFV×òR&V6—<:6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&Wf—6R6öç7FçFVÖVçFS£Â÷7G&öæsâÖVÜ;7&–FV6’6Rò6öçF\;¦Fòì:6òf÷"&Wf—6—FFòãÂöÆ“à¢ÂööÃà¢Çå&'FR,:F–6R6öæ6V—GVÂÂò'F–vòÄÆ–æ²FóÒ"ö&Æörö–æf÷&ÖF–6Ö&6–6"6Æ74æÖSÒ'FW‡BÖ66VçB#æ–æf÷&Ü:F–6,:6–6ÂôÆ–æ³âgVæ6–öæ6öÖò&6R6ö×ÆVÖVçF"ãÂ÷à ¢Æƒ#åG&–Æ†2&VçG&"&öf—76–öæÆÖVçFRVÒFV6æöÆöv–Âöƒ#à¢ÇåVVÒ&WFVæFRG&&Æ†"æ:&V&V6—6W66öÆ†W"VÖF—&\:|:6òFWö—2F&6Râ2G&–Æ†2Ö—26ö×Vç3£Â÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæså7W÷'FRL:–6æ–6ó£Â÷7G&öæsâFVæF–ÖVçFòW7\:&–÷2ÂÖçWFVì:|:6òÂ–ç7FÆ:|:6òRF–vì;77F–6òâ8’÷'FFRVçG&FÖ—26ö×VÒãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä–æg&W7G'WGW&£Â÷7G&öæsâ6W'f–F÷&W2Âf—'GVÆ—¦:|:6òÂ&6·WR6öçF–çV–FFRãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&VFW3£Â÷7G&öæsâ6&VÖVçFòÂ&÷FVÖVçFòÂv’Ôf’6÷'÷&F—fòRÖöæ—F÷&ÖVçFòãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6VwW&ì:vF–æf÷&Ö:|:6ó£Â÷7G&öæsâ&÷F\:|:6òFR6—7FVÖ2Â&W7÷7F–æ6–FVçFW2RöÌ:×F–62FR6W76òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFW6VçföÇf–ÖVçFó£Â÷7G&öæsâ7&–:|:6òFR6—7FVÖ2Â6—FW2RÆ–6F—f÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFF÷3£Â÷7G&öæsâ÷&væ—¦:|:6òÂì:Æ—6RRf—7VÆ—¦:|:6òFR–æf÷&Ö:|;VW2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäçWfVÓ£Â÷7G&öæsâ÷W&:|:6òFR6W'fœ:v÷2†÷7VFF÷2VÒ&÷fVF÷&W26öÖòÆFf÷&Ö2;¦&Æ–62FRçWfVÒãÂöÆ“à¢Â÷VÃà¢ÇäæVæ‡VÖFW762G&–Æ†2F—7Vç6÷2gVæFÖVçF÷2FW67&—F÷2VÒÄÆ–æ²FóÒ"ö&Æöröò×VRÖRÖ–æf÷&ÖF–6"6Æ74æÖSÒ'FW‡BÖ66VçB#æòVR:’–æf÷&Ü:F–6ÂôÆ–æ³ââW66öÆ†öFR×VF"6öÒòFV×òÂR×VF"FRG&–Æ†ì:6ò:’&V6öÖ\:v"Fò¦W&òãÂ÷à ¢Æƒ#ãrâW'&÷26ö×Vç2FRVVÒW7GVF6÷¦–æ†óÂöƒ#à¢Çä&VæFW"6÷¦–æ†ò:’÷7<:×fVÂÂÖ2ÆwVç2W'&÷2G&6Ò×V—Fòò&öw&W76ó£Â÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsåVÆ"&6RF\;7&–6£Â÷7G&öæsâVW&W"—"F—&WFò&&öw&Ö:|:6ò6VÒVçFVæFW"6—7FVÖ÷W&6–öæÂRÌ;6v–6vW&'W&6÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäì:6ò&F–6#£Â÷7G&öæsâ76—7F—"VÆ26VÒW†V7WF"òVRfö’Vç6–æFòì:6òf—†6öæ†V6–ÖVçFòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6öç7VÖ—"<;26öçF\;¦Fò76—fó£Â÷7G&öæsâf–FVöVÆ2<:6ò;§FV—2ÂÖ2&V6—6Ò6W"ÇFW&æF26öÒÆV—GW&ÂW†W&<:Ö6–÷2R&ö¦WF÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäì:6ò&Wf—6#£Â÷7G&öæsâW7VV6W"òVRfö’W7GVFFòGV26VÖæ2G,:2:’æ÷&ÖÂ6VÒ&Wf—<:6òW7:vFãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäf–6"G&ö6æFòFR7W'6ó£Â÷7G&öæsâ6öÖ\:v"l:&–÷2RFW&Ö–æ"æVæ‡VÒvW&g&vÖVçF:|:6òãÂöÆ“à¢Â÷VÃà¢Çä&Vw&,:F–6:“¢&6F†÷&FRVÆÂFVF—VRVÆòÖVæ÷2VÖ†÷&FR,:F–6ãÂ÷à ¢Æƒ#ä6†V6¶Æ—7B&6öÖ\:v"&VæFW"–æf÷&Ü:F–6Âöƒ#à¢ÇVÃà¢ÆÆ“äFVf–æ6WRö&¦WF—fòçFW2FRW66öÆ†W"6öçF\;¦F÷3ÂöÆ“à¢ÆÆ“äFöÖ–æRò6ö×WFF÷"l:×6–6òRò6—7FVÖ÷W&6–öæÃÂöÆ“à¢ÆÆ“å&F—VRæfVv:|:6òÂRÖÖ–ÂRfW'&ÖVçF2FRW67&—L;7&–óÂöÆ“à¢ÆÆ“äW7GVFR6VwW&ì:vF–v—FÂR&6·WFW6FRò–ì:Ö6–óÂöÆ“à¢ÆÆ“åW6R&V7W'6÷2w&GV—F÷2FRföçFW26öæfœ:fV—3ÂöÆ“à¢ÆÆ“å&F—VRVÆòÖVæ÷2òÖW6ÖòFV×òVRW7GVFFV÷&–ÂöÆ“à¢ÆÆ“å&W6öÇfW†W&<:Ö6–÷2R&÷f26Rf÷"W7GVF"&6öæ7W'6óÂöÆ“à¢ÆÆ“äW66öÆ†VÖW7V6–Æ—¦:|:6ò<;2FWö—2FR6öç6öÆ–F"&6SÂöÆ“à¢Â÷VÃà ¢Æƒ#ävÆ÷7<:&–òFòW7GVFòFR–æf÷&Ü:F–6Âöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒåFW&ÖóÂ÷FƒãÇFƒäW‡Æ–6:|:6ò6–×ÆW3Â÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCåG&–Æ†FR&VæF—¦FóÂ÷FCãÇFCå6W\:¦æ6–÷&FVæFFR77VçF÷2ÂFòÖ—26–×ÆW2òÖ—26ö×ÆW†òãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCå,:F–6FVÆ–&W&FÂ÷FCãÇFCåG&V–æò6öÒö&¦WF—fòFVf–æ–FòR6÷'&\:|:6òFRW'&òÂì:6ò&WWFœ:|:6òÆVL;7&–ãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä6W'F–f–6:|:6óÂ÷FCãÇFCå&÷fÆ–6F÷"VÖ–ç7F—GVœ:|:6òVRFW7FVÒ6öæ§VçFòFR6ö×WL:¦æ6–2ãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäÖ&–VçFRFRFW7FSÂ÷FCãÇFCäÜ:V–æÂ7F÷RÜ:V–æf—'GVÂW6F&W'&"6VÒ&V§\:×¦ò&VÂãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäÜ:V–æf—'GVÃÂ÷FCãÇFCä6ö×WFF÷"6–×VÆFò÷"6ögGv&RFVçG&òFò6WR6ö×WFF÷"ãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä&6·WÂ÷FCãÇFCä<;7–FR6VwW&ì:vF÷2'V—f÷2wV&FFVÒ÷WG&òÇVv"ãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä7W'fFR&WFVì:|:6óÂ÷FCãÇFCäVfV—FòFRW7VV6W"òVRì:6ò:’&Wf—6Fó²÷"—76ò&Wf—<:6òW7:vFW†—7FRãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäW7V6–Æ—¦:|:6óÂ÷FCãÇFCäW66öÆ†FRVÒ6×ò‡&VFW2Â7W÷'FRÂFF÷2ÂFW6VçföÇf–ÖVçFò’;72&6RãÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"Ö&÷&FW"&rÖ×WFVBóCÓBæ÷B×&÷6R×’Ób#à¢Æƒ"6Æ74æÖSÒ'FW‡BÖ&6RföçB×6VÖ–&öÆBÒÓ#äÆV–FÖ,:–ÓÂöƒ#à¢ÇVÂ6Æ74æÖSÒ&×BÓ"Ö"ÓÆ—7BÖF—62ÂÓRFW‡B×6Ò#à¢ÆÆ“ãÄÆ–æ²FóÒ"ö&Æöröò×VRÖRÖ–æf÷&ÖF–6"6Æ74æÖSÒ'FW‡BÖ66VçB#äòVR:’–æf÷&Ü:F–6ÂôÆ–æ³â(	BFVf–æœ:|:6òRòÖF:&VçFW2FRW66öÆ†W"òVRW7GVF"ãÂöÆ“à¢ÆÆ“ãÄÆ–æ²FóÒ"ö&Æörö–æf÷&ÖF–6Ö&6–6"6Æ74æÖSÒ'FW‡BÖ66VçB#ä–æf÷&Ü:F–6,:6–6ÂôÆ–æ³â(	Bò6öçF\;¦FòW†FòF&–ÖV—&f6RFW7FR&÷FV—&òãÂöÆ“à¢ÆÆ“ãÄÆ–æ²FóÒ"ö&Æörö6öÖòÖf÷&ÖF"×2×6VÒ×W&FW"Ö'V—f÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#ä6öÖòf÷&ÖF"ò26VÒW&FW"'V—f÷3ÂôÆ–æ³â(	BW†W&<:Ö6–ò,:F–6òFR6—7FVÖ÷W&6–öæÂR&6·WãÂöÆ“à¢ÆÆ“ãÄÆ–æ²FóÒ"ö&Æörö6öÖòÖ6öæf–wW&"×&÷FVF÷"×v–f’Ö–æ–6–çFW2"6Æ74æÖSÒ'FW‡BÖ66VçB#ä6öÖò6öæf–wW&"VÒ&÷FVF÷"v’Ôf“ÂôÆ–æ³â(	BW†W&<:Ö6–ò,:F–6òFòÜ;6GVÆòFR&VFW2ãÂöÆ“à¢Â÷VÃà¢Âö6–FSà ¢Æƒ#å&VfW,:¦æ6–2RföçFW3Âöƒ#à¢ÇVÃà¢ÆÆ“ãÆ‡&VcÒ&‡GG3¢òöÆV&âæÖ–7&÷6ögBæ6öÒ÷BÖ'"÷G&–æ–ærò"&VÃÒ&æöföÆÆ÷ræö÷VæW""F&vWCÒ%ö&Ææ²#äÖ–7&÷6ögBÆV&â(	BG&–Æ†2FRG&V–æÖVçFóÂöâ(	B7W'6÷2w&GV—F÷2öf–6–—26ö'&R6—7FVÖ2ÂçWfVÒR6VwW&ì:vãÂöÆ“à¢ÆÆ“ãÆ‡&VcÒ&‡GG3¢ò÷wwrægVæF6ö'&FW66òæ÷&ræ'"ò"&VÃÒ&æöföÆÆ÷ræö÷VæW""F&vWCÒ%ö&Ææ²#ägVæF:|:6ò'&FW66ò(	BW66öÆf—'GVÃÂöâ(	B7W'6÷2w&GV—F÷2FR–æf÷&Ü:F–6VÒ÷'GVw\:§2ãÂöÆ“à¢ÆÆ“ãÆ‡&VcÒ&‡GG3¢ò÷Bæ¶†æ6FV×’æ÷&rö6ö×WF–ær"&VÃÒ&æöföÆÆ÷ræö÷VæW""F&vWCÒ%ö&Ææ²#ä¶†â6FV×’(	B6ö×WF:|:6óÂöâ(	B6öçF\;¦Fò–çG&öGWL;7&–òw&GV—FòãÂöÆ“à¢ÆÆ“ãÆ‡&VcÒ&‡GG3¢òö6öFRæ÷&rò"&VÃÒ&æöföÆÆ÷ræö÷VæW""F&vWCÒ%ö&Ææ²#ä6öFRæ÷&sÂöâ(	BF—f–FFW2FR–çG&öG\:|:6ò:Ì;6v–6R:&öw&Ö:|:6òÂ;§FV—26öÒ7&–ì:v2ãÂöÆ“à¢ÆÆ“ãÆ‡&VcÒ&‡GG3¢òö6'F–Æ†æ6W'Bæ'"ò"&VÃÒ&æöföÆÆ÷ræö÷VæW""F&vWCÒ%ö&Ææ²#ä6'F–Æ†FR6VwW&ì:v&–çFW&æWB„4U%Bæ'"“Âöâ(	B&6R&òÜ;6GVÆòFR6VwW&ì:vFò&÷FV—&òãÂöÆ“à¢Â÷VÃà¢Ç6Æ74æÖSÒ'FW‡B×6ÒFW‡BÖ×WFVBÖf÷&Vw&÷VæB#ä6öçF\;¦Fò&öGW¦–FòR&Wf—6FòVÆWV—RVF—F÷&–ÂFRòL:–6æ–6òFR–æf÷&Ü:F–6â&Wf—6FòVÒRFRv÷7FòFR##bâ÷2&V7W'6÷26—FF÷2f÷&ÒfW&–f–6F÷2æW7FFFãÂ÷à ¢Æƒ#ä6öæ6ÇW<:6óÂöƒ#à¢Çä&VæFW"–æf÷&Ü:F–6Fò¦W&òW†–vRÖ—26öç6—7L:¦æ6–FòVRFÆVçFòâò6Ö–æ†ò:’F—f–F–FòVÒf6W26Æ&3¢fÖ–Æ–&—¦:|:6òÂ&öGWF—f–FFRÂ&ögVæFÖVçFòRW7V6–Æ—¦:|:6òâ6öÒVÒö&¦WF—fòFVf–æ–FòÂ&V7W'6÷2FWVF÷2R,:F–6&VwVÆ"ÂVÇVW"W76ö6öç6VwVR6—"Fò¦W&òR6†Vv"VÒì:×fVÂgVæ6–öæÂVÒ÷V626VÖæ2ãÂ÷à¢Çäì:6òW†—7FRl;7&×VÆÜ:v–6âò6Vw&VFò:’6öÖ\:v"6–×ÆW2Â&WWF—"×V—FòR<;2fì:v"VæFòò,:6–6òW7F—fW"f—&ÖRâçFW2FRW66öÆ†W"VÖW7V6–Æ—¦:|:6òÂVçFVæFÄÆ–æ²FóÒ"ö&Æöröò×VRÖRÖ–æf÷&ÖF–6"6Æ74æÖSÒ'FW‡BÖ66VçB#æòVR:’–æf÷&Ü:F–6ÂôÆ–æ³âR6öæf—&÷WG&÷2wV–2L:–6æ–6÷2æòÄÆ–æ²FóÒ"ö&Æör"6Æ74æÖSÒ'FW‡BÖ66VçB#æ&ÆösÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ  ¢òò)H)HöæF”2(	B6ÇW7FW"&6ö×WFF÷"VçG&F—&WFòæ$”õ2"‡–Æ"²"6L:–Æ—FW2’à¢&6ö×WFF÷"ÖVçG&ÖF—&WFòÖæÖ&–÷2#¢°¢F—FÆS¢$ÖWR6ö×WFF÷"VçG&F—&WFòæ$”õ3¢wV–FRF–vì;77F–6òR6öÇ\:|:6ò"À¢W†6W'C ¢%÷"VRò2'&RFVÆFR6öæf–wW&:|:6òVÒfW¢Fòv–æF÷w3¢F—66òì:6òFWFV7FFòÂ6öæfÆ—FòTTd’ôÆVv7’„54Ò’Â&FW&–4Ôõ2Rf7B&ö÷BâF–vì;77F–6òVÒ÷&FVÒâ"À¢FFS¢###bÓ‚Ó#R"À¢&VEF–ÖS¢#BÖ–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#åVæFòò6ö×WFF÷"Æ–vR&æFVÆFR6öæf–wW&:|:6ò(	BòÇ7G&öæså6WGWÂ÷7G&öæsâFÆ6ÖÜ:6RÂ6†ÖFòFR$”õ2÷RTTd’(	BVÆRì:6òW7L:6öÒFVfV—Fòæ$”õ2âVÆRW7L:f—6æFòVRÇ7G&öæsæì:6òVæ6öçG&÷RVÒ6—7FVÖ&–æ–6–#Â÷7G&öæsââ$”õ2:’ò;¦ÇF–ÖòÇVv"öæFRòWV—ÖVçFò6öç6VwVR&"6VÒG&f"ÂVçL:6ò:’Æ’VRVÆRFRFV—†ãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢ÇäæW6ÖvF÷&Ö–÷&–F÷266÷2W†—7FVÒVG&ò6W63¢òF—66òì:6ò:’FWFV7FFòÂòÖöFòFR&ö÷Bfö’G&ö6Fò…TTd’9rÆVv7’ô54Ò’Â&FW&–4Ôõ2FW66'&Vv÷RRv÷R26öæf–wW&:|;VW2Â÷RVÖFV6Æ&W6öFÆ†òW7L:f÷,:væFòVçG&Fæò6WGWâFW66ö'&—"VÂFVÆ2:’ÆWfÖVæ÷2FRFW¢Ö–çWF÷2ÂFW6FRVRfW&–f–6:|:6ò6–vVÖ÷&FVÒãÂ÷à ¢Æƒ#äòVR6öçFV6RçFW2Fòv–æF÷w2&V6W#Âöƒ#à¢ÇäòÆ–v"ÂÆ6ÖÜ:6RW†V7WFòÇ7G&öæsåõ5CÂ÷7G&öæsâ…÷vW"Ôöâ6VÆbÕFW7B“¢6öæfW&R&ö6W76F÷"ÂÖVÜ;7&–Âl:ÖFVòRF—7÷6—F—f÷2Æ–vF÷2:2÷'F2â6Ròõ5B76Âòf—&×v&R6öç7VÇFÆ—7FFR&–÷&–FFRFR–æ–6–Æ—¦:|:6òR&ö7W&ÂVÒ6FF—7÷6—F—fòÂVÒ6'&VvF÷"FR–æ–6–Æ—¦:|:6òl:Æ–FòãÂ÷à¢Çå6RæVæ‡VÒF—7÷6—F—fòFÆ—7F&W7öæFR6öÒVÒ6'&VvF÷"l:Æ–FòÂòf—&×v&Rì:6òFVÒ&öæFR—"âVÒfW¢FRÖ÷7G&"VÖFVÆ&WFÂVÆR'&Rò6WGWâ8’÷"—76òVRò6–çFöÖ:’6V×&RòÖW6Öò(	B&VçG&F—&WFòæ$”õ2"(	B&6W626ö×ÆWFÖVçFRF–fW&VçFW2ãÂ÷à¢ÇåVÖæÆöv–§VF¢$”õ2õTTd’:’ò÷'FV—&òFò,:–F–òâVÆì:6òwV&Fò6WR6—7FVÖ²VÆ<;26&RVÒVÂ÷'F&FW"âVæFòæ–æw\:–ÒFVæFRVÒæVæ‡VÖ÷'FFÆ—7FÂò÷'FV—&òföÇF&÷'F&–Rf–6FRöÆ†æFòãÂ÷à ¢Æƒ#äF–vì;77F–6ò,:–Fó¢òG&œ:&æwVÆòFò&ö÷CÂöƒ#à¢ÇäçFW2FRÖW†W"VÒVÇVW"6öæf–wW&:|:6òÂ&W7öæFG,:§2W&wVçF2æW7F÷&FVÒâVÆ26W&Ò&ö&ÆVÖl:×6–6òFR&ö&ÆVÖFR6öæf–wW&:|:6òRWf—FÒVRfö<:¢×VFR÷:|;VW26VÒæV6W76–FFRãÂ÷à¢ÆöÃà¢ÆÆ“ãÇ7G&öæsäòF—66ò&V6SóÂ÷7G&öæsâVçG&Ræò6WGWR&ö7W&R&FR–æf÷&Ö:|;VW2†æ÷&ÖÆÖVçFRÆVÓäÖ–ãÂöVÓâÂÆVÓä–æf÷&ÖF–öãÂöVÓâ÷RÆVÓå7F÷&vSÂöVÓâ’â6Rò54Bô„Bì:6òW7L:Æ—7FFòÆ’Âò&ö&ÆVÖ:’l:×6–6ò÷RFR6öæWŒ:6ò(	Bì:6òF–çFÖW†W"VÒ÷&FVÒFR&ö÷BãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäòF—66ò&V6RÂÖ2ì:6òŒ:VçG&FFR–æ–6–Æ—¦:|:6óóÂ÷7G&öæsâòF—66òW7L:f—fòRò6'&VvF÷"Fò6—7FVÖ:’VR7VÖ—R÷RW7L:æòÖöFòW'&Fòâ8’6öæf–wW&:|:6ò÷R&W&òFR–æ–6–Æ—¦:|:6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåGVFò&V6RRÖW6Öò76–ÒföÇFò6WGWóÂ÷7G&öæsâ7W7V—FRFR6öæf–wW&:|:6òW&F–F†&FW&–4Ôõ2’Âf7B&ö÷BÖÂ&W6öÇf–Fò÷RFV6Æ&W6æòFV6ÆFòãÂöÆ“à¢ÂööÃà¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"Ö&÷&FW"&rÖ×WFVBóCÓBæ÷B×&÷6R×’Ób#à¢Ç6Æ74æÖSÒ&ÒÓFW‡B×6Ò#ãÇ7G&öæsäçFW2FRGVFó£Â÷7G&öæsâFW66öæV7FRVæG&—fW2Â„G2W‡FW&æ÷2ÂÆV—F÷&W2FR6'L:6òR6VÇVÆ&W2VÒÖöFòFRG&ç6fW,:¦æ6–âVÒVæG&—fRçF–vòæ÷'FU4":’VÖF26W62Ö—2&æ—2(	BRÖ—2g&WVVçFW2(	BFRò6ö×WFF÷"FVçF"–æ–6–"VÆòÇVv"W'&FòãÂ÷à¢Âö6–FSà ¢Æƒ#ä6W6(	BòF—66òì:6ò:’FWFV7FFóÂöƒ#à¢Çì8’6W6Ö—26ö×VÒVÒÜ:V–æ26öÒÆwVç2æ÷2FRW6òRÖ—2<:—&–VÒFW&Ö÷2FRFF÷2â6Rò54B÷R„Bì:6ò&V6RæÆ—7FFRF—7÷6—F—f÷2Fò6WGWÂòf—&×v&R6WVW"6†Vv&ö7W&"ò6—7FVÖãÂ÷à ¢Æƒ3äVÒFW6·F÷6öÒF—66ò4DÂöƒ3à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsä6&òFRFF÷3£Â÷7G&öæsâ&VVæ6—†R2GV2öçF2Fò6&ò4D†F—66òRÆ6ÖÜ:6R’â6&÷26öÒG&fVV'&F6öÇFÒ6öÒf–'&:|:6òR6öÒòFV×òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6&òFRVæW&v–£Â÷7G&öæsâG&÷VRò6öæV7F÷"f–æFòFföçFR÷"÷WG&òFòÖW6Öò6†–6÷FRâVÒ6öæV7F÷"÷†–FFòÆ–ÖVçF&6–ÆÖVçFRRòF—66òæVÒv—&ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså÷'FFÆ6£Â÷7G&öæsâ×VFRò6&ò&÷WG&÷'F4Dâ÷'F2–æF—f–GV—2fÆ†ÒÂ&–æ6—ÆÖVçFR;72FW66&vVÌ:—G&–6ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså'\:ÖFó£Â÷7G&öæsâVÒF—66òÖV<:&æ–6òÂ6Æ—VW2&WWF–F÷2÷Rv—&òVR&R&V6öÖ\:v–æF–6ÒfÆ†l:×6–6âæW76R66òÂ&RãÂöÆ“à¢Â÷VÃà ¢Æƒ3äVÒæ÷FV&öö²÷RFW6·F÷6öÒådÖR„Òã"“Âöƒ3à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsäVæ6—†S£Â÷7G&öæsâòÜ;6GVÆòÒã"VçG&VÒ:&æwVÆòR<;2FWö—2:’&W6òVÆò&gW6òâÜ;6GVÆòÖÂ76VçFFò:’FWFV7FFòFRf÷&Ö–çFW&Ö—FVçFRãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6Æ÷B6ö×'F–Æ†Fó£Â÷7G&öæsâVÒ×V—F2Æ62ÂF—f"ò6VwVæFò6Æ÷BÒã"FW6Æ–vWFöÖF–6ÖVçFR÷'F24D†÷Rf–6R×fW'6’â6RòF—66òçF–vò7VÖ—RFWö—2FR–ç7FÆ"VÒådÖRÂ:’V6R6V×&R—76òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6ö×F–&–Æ–FFRFò6Æ÷C£Â÷7G&öæsâW†—7FVÒ6Æ÷G2Òã"VR6V—FÒVæ24DR÷WG&÷2Væ2ådÖR…4–R’âVÒÜ;6GVÆòådÖRVÒ6Æ÷BW†6ÇW6—fÖVçFR4D6–×ÆW6ÖVçFRì:6ò&V6RãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6öçFF÷3£Â÷7G&öæsâVÒÜ;6GVÆ÷2&VÖæV¦F÷2VçG&RÜ:V–æ2ÂÆ–×R÷26öçFF÷2F÷W&F÷26öÒ:Æ6ööÂ—6÷&÷:ÖÆ–6òRæòVRì:6ò6öÇFRf–÷2ãÂöÆ“à¢Â÷VÃà¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"ÖFW7G'V7F—fRóC&rÖFW7G'V7F—fRóRÓBæ÷B×&÷6R×’Ób#à¢Ç6Æ74æÖSÒ&ÒÓFW‡B×6Ò#ãÇ7G&öæsäFVì:|:6ò÷2FF÷3£Â÷7G&öæsâ6RòF—66òFW6&V6RR&V&V6RÂ6öÖRFWö—2FRW7VVçF"÷Rf¢&'VÆ†òÂ6Fæ÷fFVçFF—fFRÆ–v"&VGW¢6†æ6RFR&V7WW&:|:6òâæW76R6Vì:&–òò6Ö–æ†ò6÷'&WFò:’&W6W'f"÷2FF÷2çFW2FRVÇVW"&V–ç7FÆ:|:6ò(	Bò&ö6VF–ÖVçFòW7L:VÒÄÆ–æ²FóÒ"ö&Æörö6öÖò×&V7WW&"ÖFF÷2Ö†BÖ6öÒÖFVfV—Fò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖò&V7WW&"FF÷2FR„B6öÒFVfV—FóÂôÆ–æ³âãÂ÷à¢Âö6–FSà ¢Æƒ#ä6W6"(	B6öæfÆ—FòFRÖöFòFR&ö÷B…TTd’9rÆVv7’ô54Ò“Âöƒ#à¢ÇäW7F:’6W6VRÖ—26öægVæFRÂ÷'VRòF—66ò&V6Ræ÷&ÖÆÖVçFRRÖW6Öò76–Òì:6òW†—7FRVçG&FFR–æ–6–Æ—¦:|:6òâòÖ÷F—fò:’VRòf—&×v&RW7L:&ö7W&æFòò6—7FVÖFRVÒ¦V—FòRòF—66òfö’&W&FòFR÷WG&òãÂ÷à ¢Æƒ3äF–fW&Vì:vVÒVÖg&6SÂöƒ3à¢ÇäæòÖöFòÇ7G&öæsäÆVv7“Â÷7G&öæsâ†6ö×F–&–Æ–FFRÂF—fFòVÆòÇ7G&öæsä54ÓÂ÷7G&öæsâ’Âòf—&×v&RÌ:¢ò&–ÖV—&ò6WF÷"FòF—66ò(	BòÇ7G&öæsäÔ%#Â÷7G&öæsâ(	BRW†V7WFòVRW7F—fW"Æ’âæòÖöFòÇ7G&öæsåTTd“Â÷7G&öæsâÂVÆR–væ÷&W76R6WF÷"R&ö7W&VÖÇ7G&öæsç'Fœ:|:6òFR6—7FVÖTd“Â÷7G&öæsâÂf÷&ÖFFVÒdC3"Â6öçFVæFòVÒ'V—fò6'&VvF÷"â<:6òFö—2–F–öÖ3¢6RòF—66òfÆVÒRòf—&×v&RW67WFò÷WG&òÂæ–æw\:–Ò6RVçFVæFRãÂ÷à¢Çä6öÖò&Vw&,:F–6¢F—66ò'F–6–öæFòVÒÇ7G&öæsäuCÂ÷7G&öæsâVFR&ö÷BVÒTTd“²F—66òVÒÇ7G&öæsäÔ%#Â÷7G&öæsâVFRÆVv7’ô54Òâv–æF÷w2W†–vRTTd’6öÒuBãÂ÷à ¢Æƒ3ä6öÖòfW&–f–6"R6÷'&–v—#Âöƒ3à¢ÆöÃà¢ÆÆ“äæò6WGWÂ'&&ÆVÓä&ö÷CÂöVÓâRÆö6Æ—¦RÇ7G&öæsä54ÓÂ÷7G&öæsâ÷RÇ7G&öæsä&ö÷BFWf–6R6öçG&öÃÂ÷7G&öæsââæ÷FRòfÆ÷"GVÂçFW2FR×VF"VÇVW"6ö—6ãÂöÆ“à¢ÆÆ“å6RÜ:V–æfV–ò6öÒv–æF÷w2÷RFRl:'&–6Âò6÷'&WFòV6R6V×&R:’Ç7G&öæsåTTd“Â÷7G&öæsâ„54ÒFW6&–Æ—FFò’â§W7FRÂ6ÇfRR&V–æ–6–RãÂöÆ“à¢ÆÆ“å6RFWö—2F—76ò7W&v—"VÖVçG&F6†ÖFÆVÓåv–æF÷w2&ö÷BÖævW#ÂöVÓâæÆ—7FFR&–÷&–FFRÂ6öÆ÷VRÖVÒ&–ÖV—&òÇVv"âòæöÖRFVçG&F:’6öæf—&Ö:|:6òFRVRò6'&VvF÷"fö’Væ6öçG&FòãÂöÆ“à¢ÆÆ“å6RæF7W&v—"ÂföÇFRòfÆ÷"çFW&–÷"RFW7FRòÖöFò÷÷7Fò(	BVÒÜ:V–æ2ÖöçFF2÷R&V–ç7FÆF2÷"FW&6V—&÷2ÂòF—66òöFRW7F"VÒÔ%"ãÂöÆ“à¢ÂööÃà¢Çä×VF"FRÖöFòÆVÓæì:6òvÂöVÓâFF÷2ÂÖ2VÒ6—7FVÖ–ç7FÆFòVÒÔ%"ì:6ò–æ–6–VÒTTd’W&ò†Rf–6R×fW'6’6VÒ6öçfW'<:6òâVæFòòF—66ò&V6RÂòÖöFòW7L:6W'FòR–æF76–ÒfÇFò6'&VvF÷"Âò&ö&ÆVÖ:’ò6WF÷"FR–æ–6–Æ—¦:|:6ò(	BG&FFòVÒÄÆ–æ²FóÒ"ö&ÆöröW'&òÖæòÖ&ö÷F&ÆRÖFWf–6RÖ6öÖò×&W6öÇfW""6Æ74æÖSÒ'FW‡BÖ66VçB#æW'&ò$æò&ö÷F&ÆRFWf–6R#ÂôÆ–æ³âãÂ÷à ¢Æƒ3å6V7W&R&ö÷BVçG&æW766öçFÂöƒ3à¢ÇäòÇ7G&öæså6V7W&R&ö÷CÂ÷7G&öæsâ<;2gVæ6–öæVÒTTd’R&V7W66'&VvF÷&W26VÒ76–æGW&&V6öæ†V6–Fâ6Rfö<:¢W6Æ–çW‚VÒGVÂ&ö÷BÂÜ:ÖF–FR&V7WW&:|:6òçF–v÷RfW¢ÇFW&:|;VW2æò6'&VvF÷"ÂVÆRöFR&Æ÷VV"–æ–6–Æ—¦:|:6ò6–ÆVæ6–÷6ÖVçFRRFWföÇfW"fö<:¢ò6WGWâFW6Æ–v"ò6V7W&R&ö÷B:’VÒFW7FRl:Æ–FòFRF–vì;77F–6ò(	BRFWfR6W"&VÆ–vFòFWö—2VRò6—7FVÖföÇF"ãÂ÷à ¢Æƒ#ä6W62(	B&FW&–4Ôõ2R6öæf–wW&:|;VW2W&F–F3Âöƒ#à¢Çä&FW&–FRÌ:×F–òFÆ6ÖÜ:6R†ÖöFVÆò5##3"ÂFòFÖæ†òFRVÖÖöVF’ÖçL:–Ò&VÌ;6v–òR6öæf–wW&:|;VW2VçVçFòò6ö×WFF÷"W7L:FW6Æ–vFòFFöÖFâVæFòVÆ6†Vvòf–Ò(	Bæ÷&ÖÆÖVçFRVçG&R6–æ6òRFW¢æ÷2(	BÂòf—&×v&RföÇFòG,:6òFRl:'&–66FFW6Æ–vÖVçFòãÂ÷à¢Çå6–æ—2L:×–6÷3¢Ç7G&öæsæFFR†÷&6V×&RW'&F3Â÷7G&öæsâÂÖVç6vVÒFR$4Ôõ26†V6·7VÒW'&÷""ÂVF–Fò&&W76–öæ"c6F'F–FR÷&FVÒFR&ö÷BVRföÇF6÷¦–æ†ò÷&–v–æÂãÂ÷à¢ÆöÃà¢ÆÆ“ä6öæf—&ÖRVÆFF¢6RVÆföÇF&VÖFFçF–vFöFfW¢Â&FW&–:’7W7V—F&–æ6—ÂãÂöÆ“à¢ÆÆ“å7V'7F—GV&FW&–6öÒòWV—ÖVçFòFW6Æ–vFòR6VÒVæW&v–†VÒæ÷FV&öö²Â—76òW†–vR'&—"òWV—ÖVçFòRÂVÒ×V—F÷2ÖöFVÆ÷2ÂFW66öæV7F"&FW&––çFW&æ’ãÂöÆ“à¢ÆÆ“äFWö—2FG&ö6ÂVçG&Ræò6WGWÂ6'&VwVR÷2G,;VW2÷F–Ö—¦F÷2Â&V6öæf–wW&RÖöFòFR&ö÷BR÷&FVÒFR–æ–6–Æ—¦:|:6òÂ6ÇfRR6–ãÂöÆ“à¢ÂööÃà¢ÇåVÒÇ7G&öæsç&W6WBF26öæf–wW&:|;VW3Â÷7G&öæsâ„ÆöB÷F–Ö—¦VBFVfVÇG2’FÖ,:–Ò&W6öÇfR66÷2VÒVRÆw\:–ÒÖW†WRæò6WGW6VÒæ÷F"òVR×VF÷R(	B–æ6ÇW6—fRW&f—2FR÷fW&6Æö6²–ç7L:fV—2VR–×VFVÒòõ5BFRFW&Ö–æ"ãÂ÷à ¢Æƒ#ä6W6B(	Bf7B&ö÷BRFV6Æ2V×W'&F3Âöƒ#à¢ÇäòÇ7G&öæsäf7B&ö÷CÂ÷7G&öæsâ&VGW¢òFV×òFR–æ–6–Æ—¦:|:6òVÆæFò'FRF6†V6vVÒFRF—7÷6—F—f÷2âòVfV—Fò6öÆFW&Â:’6öæ†V6–Fó¢F—66÷2VRFVÖ÷&ÒÆwVç26VwVæF÷2Ö—2&&W7öæFW"f–6ÒFRf÷&F6†V6vVÒRòf—&×v&R6öæ6ÇV’VRì:6òŒ:6—7FVÖâVÒÆ626öÒW76R&V7W'6òw&W76—fòÂFW6F—l:ÖÆò&W6öÇfRò66òæ&–ÖV—&FVçFF—fãÂ÷à¢ÇäŒ:–æFòÇ7G&öæsäf7B7F'GWÂ÷7G&öæsâFòv–æF÷w2ÂVR:’÷WG&6ö—6¢VÆRw&fVÒW7FFòFR†–&W&æ:|:6ò&6–ÂâFWö—2FRVÖVVFFRVæW&v–ÂW76RW7FFòöFRf–6"–æ6öç6—7FVçFRR&÷fö6"VÖföÇFò6WGWâFW6Æ–v"6ö×ÆWFÖVçFR†ÖçFVæFò6†–gBò6Æ–6"VÒFW6Æ–v"’Æ–×W76RW7FFòãÂ÷à¢Çå÷";¦ÇF–ÖòÂòG&—f–ÂVRæ–æw\:–Ò6†V6¢Ç7G&öæsçFV6Æ&W6Â÷7G&öæsââFVÂÂc"Âc÷RW62V×W'&F2(	B÷"7V¦V—&ÂÌ:×V–FòFW'&ÖFò÷RÖVÖ'&æFæ–f–6F(	B6öÆö6Òò6ö×WFF÷"æò6WGW6F'F–FâFW7FR6öÒ÷WG&òFV6ÆFó²VÒæ÷FV&öö²ÂW6RVÒFV6ÆFòU4"Rö'6W'fR6Rò6ö×÷'FÖVçFò×VFãÂ÷à ¢Æƒ#ä÷&FVÒFRfW&–f–6:|:6ò&V6öÖVæFFÂöƒ#à¢ÆöÃà¢ÆÆ“å&VÖ÷fW"FöF÷2÷2F—7÷6—F—f÷2U4"R6'L;VW2FRÖVÜ;7&–ãÂöÆ“à¢ÆÆ“åfW&–f–6"6RòF—66ò&V6RæÆ—7FFRF—7÷6—F—f÷2Fò6WGWãÂöÆ“à¢ÆÆ“ä6öæfW&—"ÖöFòFR&ö÷B…TTd’9rÆVv7’ô54Ò’R&W6Vì:vFòv–æF÷w2&ö÷BÖævW"ãÂöÆ“à¢ÆÆ“ä6†V6"FFR†÷&(	B6RW7F—fW&VÒW'&F2ÂG&F"&FW&–4Ôõ2ãÂöÆ“à¢ÆÆ“äFW6F—f"f7B&ö÷BRFW7F"6öÒ÷WG&òFV6ÆFòãÂöÆ“à¢ÆÆ“å6RòF—66òì:6ò&V6R÷Rf¢'\:ÖFòÂ&"R&–÷&—¦"÷2FF÷2ãÂöÆ“à¢ÂööÃà ¢Æƒ#åVæFòò&ö&ÆVÖì:6ò:’6öæf–wW&:|:6óÂöƒ#à¢ÇäÆwVç26–æ—2–æF–6ÒfÆ†FR†&Gv&RRì:6òFR§W7FS¢ò6WGW'&RÖ2G&fÂÜ:V–æFW6Æ–v6÷¦–æ†GW&çFRòõ5BÂÆ—7FFRF—7÷6—F—f÷2×VF6F'F–FÂ÷RòWV—ÖVçFò<;2Æ–vFWö—2FRl:&–2FVçFF—f2âæW76W266÷2–çfW7F–v:|:6ò76÷"föçFRÂÖVÜ;7&–RÆ6ÖÜ:6R(	Bò&÷FV—&òW7L:VÒÄÆ–æ²FóÒ"ö&Æörö6öÖò×FW7F"ÖföçFRÖFRÖÆ–ÖVçF6ò×2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòFW7F"föçFRFRÆ–ÖVçF:|:6óÂôÆ–æ³âRVÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖF–væ÷7F–6"×Æ6ÖÖRÖFVfV—GV÷6"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòF–væ÷7F–6"Æ6ÖÜ:6RFVfV—GV÷6ÂôÆ–æ³âãÂ÷à¢Çå6RòWV—ÖVçFòæVÒ6†VvÖ÷7G&"–ÖvVÒVÒÆwVç2ÖöÖVçF÷2ÂòöçFòFR'F–F:’÷WG&ó¢ÄÆ–æ²FóÒ"ö&Æöröæ÷FV&öö²ÖæòÖÆ–vÖò×VRÖf¦W""6Æ74æÖSÒ'FW‡BÖ66VçB#ææ÷FV&öö²ì:6òÆ–vÂôÆ–æ³âãÂ÷à ¢Æƒ#ä6öæ6ÇW<:6òR,;7†–Ö÷276÷3Âöƒ#à¢Çâ$VçG&"F—&WFòæ$”õ2":’VÒ6–çFöÖFR6ö×Væ–6:|:6ò–çFW'&ö×–FVçG&Rf—&×v&RRF—66ò(	Bì:6òVÒFVfV—FòF$”õ2âfW&–f–6æFòFWFV<:|:6òÂÖöFòFR&ö÷BÂ&FW&–Rf7B&ö÷BæW76÷&FVÒÂ6W6&V6R,:–FòR6VÒFVçFF—fRW'&òãÂ÷à¢Çå6RòF—66ò:’&V6öæ†V6–FòÖ2ò6—7FVÖì:6ò–æ–6–Â6–v&ÄÆ–æ²FóÒ"ö&ÆöröW'&òÖæòÖ&ö÷F&ÆRÖFWf–6RÖ6öÖò×&W6öÇfW""6Æ74æÖSÒ'FW‡BÖ66VçB#æW'&ò$æò&ö÷F&ÆRFWf–6R#ÂôÆ–æ³ââ6Rò&ö&ÆVÖ6öÖ\:v÷RFWö—2FRG&ö6"ò&Ö¦VæÖVçFòÂò66òW7L:VÒÄÆ–æ²FóÒ"ö&Æör÷G&÷VV’Öò×76BÖRÖò×2×6òÖ'&RÖÖ&–÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#çG&÷VV’ò54BRò2<;2'&R$”õ3ÂôÆ–æ³ââVæFò6öæ6ÇW<:6òf÷"&V–ç7FÆ"Âò76ò76ò6ö×ÆWFòW7L:VÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖ–ç7FÆ"×v–æF÷w2ÓÖFò×¦W&ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖò–ç7FÆ"òv–æF÷w2Fò¦W&óÂôÆ–æ³âãÂ÷à¢Çå&VfW&Rì:6ò'&—"òWV—ÖVçFóòfÆ–:|:6ò6öÒW66÷òFVf–æ–FòW7L:VÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âÂRò6W'fœ:vò6÷'&W7öæFVçFRVÒÄÆ–æ²FóÒ"÷6W'f–6÷2öÖçWFVæ6òÖFRÖ6ö×WFF÷""6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6òFR6ö×WFF÷#ÂôÆ–æ³âãÂ÷à ¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"Ö&÷&FW"&rÖ×WFVBóCÓBæ÷B×&÷6R×’Ób#à¢Æƒ"6Æ74æÖSÒ'FW‡BÖ&6RföçB×6VÖ–&öÆBÒÓ#äÆV–FÖ,:–ÓÂöƒ#à¢ÇVÂ6Æ74æÖSÒ&×BÓ"Ö"ÓÆ—7BÖF—62ÂÓRFW‡B×6Ò#à¢ÆÆ“ãÄÆ–æ²FóÒ"ö&ÆöröW'&òÖæòÖ&ö÷F&ÆRÖFWf–6RÖ6öÖò×&W6öÇfW""6Æ74æÖSÒ'FW‡BÖ66VçB#äW'&ò$æò&ö÷F&ÆRFWf–6R#ÂôÆ–æ³â(	BVæFò$”õ2l:¢òF—66òÂÖ2ì:6ò6†ò6—7FVÖãÂöÆ“à¢ÆÆ“ãÄÆ–æ²FóÒ"ö&Æör÷G&÷VV’Öò×76BÖRÖò×2×6òÖ'&RÖÖ&–÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#åG&÷VV’ò54BRò2<;2'&R$”õ3ÂôÆ–æ³â(	Bò6Vì:&–òFRF—66òæ÷fòRf¦–òãÂöÆ“à¢ÆÆ“ãÄÆ–æ²FóÒ"ö&Æörö6öÖòÖ6Æöæ"Ö†B×&×76B"6Æ74æÖSÒ'FW‡BÖ66VçB#ä6Æöæ"„B&54CÂôÆ–æ³â(	B÷"VR<;7–:2fW¦W2ì:6ò–æ–6–Æ—¦ãÂöÆ“à¢ÆÆ“ãÄÆ–æ²FóÒ"ö&Æörö6öÖòÖf¦W"×Ww&FR×76BÖçfÖR"6Æ74æÖSÒ'FW‡BÖ66VçB#åWw&FR&54BådÖSÂôÆ–æ³â(	B6ö×F–&–Æ–FFRFR6Æ÷BçFW2FR6ö×&"ãÂöÆ“à¢Â÷VÃà¢Âö6–FSà ¢Ç6Æ74æÖSÒ'FW‡B×6ÒFW‡BÖ×WFVBÖf÷&Vw&÷VæB#ä6öçF\;¦Fò&öGW¦–FòR&Wf—6FòVÆWV—RVF—F÷&–ÂFRòL:–6æ–6òFR–æf÷&Ü:F–6â&Wf—6FòVÒ#RFRv÷7FòFR##bãÂ÷à¢Âóà¢’À¢ÒÀ ¢&W'&òÖæòÖ&ö÷F&ÆRÖFWf–6RÖ6öÖò×&W6öÇfW"#¢°¢F—FÆS¢tW'&ò$æò&ö÷F&ÆRFWf–6R#¢6öÖòfW&–f–6"6VÒf÷&ÖF"rÀ¢W†6W'C ¢$6öÖò6öæfW&—"FWFV<:|:6òÂ÷&FVÒFR&ö÷BÂ&—DÆö6¶W"R'Fœ:|:6òTd’çFW2FR&W&"–æ–6–Æ—¦:|:6òFòv–æF÷w2÷RVç6"VÒf÷&ÖF"â"À¢FFS¢###bÓ‚Ó#R"À¢&VEF–ÖS¢#"Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#ä2ÖVç6vVç2Ç7G&öæsâ$æò&ö÷F&ÆRFWf–6R#Â÷7G&öæsâÂÇ7G&öæsâ$&ö÷BFWf–6Ræ÷Bf÷VæB#Â÷7G&öæsâÂÇ7G&öæsâ$÷W&F–ær7—7FVÒæ÷Bf÷VæB#Â÷7G&öæsâRÇ7G&öæsâ%&V&ö÷BæB6VÆV7B&÷W"&ö÷BFWf–6R#Â÷7G&öæsâ–æF–6ÒVRòf—&×v&Rì:6òVæ6öçG&÷RVÒFW7F–æòFR–æ–6–Æ—¦:|:6òl:Æ–FòâVÆ2ì:6ò&÷fÒÂ6÷¦–æ†2Â6R6W6W7L:æòF—66òÂæ6öæf–wW&:|:6òFòÄÆ–æ²FóÒ"övÆ÷76&–ò÷VVf’"6Æ74æÖSÒ'FW‡BÖ66VçB#åTTd“ÂôÆ–æ³â÷Ræ÷2'V—f÷2FR&ö÷BãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çå&–ÖV—&ò6öæf—&ÖR6Rò54B÷R„B&V6Ræò6WGWâ6R&V6RÂ–æF:’&V6—6ò6W&"÷&FVÒFR&ö÷BÂÖöFòTTd’ôÆVv7’Â'Fœ:|:6òTd’Â$4BR6;¦FRFò&Ö¦VæÖVçFòâ6öÖV6RVÆ2fW&–f–6:|;VW2&WfW'<:×fV—3²6öÖæF÷2FR&W&ò<;2VçG&ÒFWö—2FR–FVçF–f–6"6÷'&WFÖVçFR–ç7FÆ:|:6òR&÷FVvW"÷2FF÷2ãÂ÷à ¢Æƒ#äòVRW7L:VV'&FòÂW†FÖVçFSÂöƒ#à¢ÇåVÒF—66ò6öÒv–æF÷w2wV&FFö—26öæ§VçF÷2FR6ö—63¢÷26WW2'V—f÷2R2–ç7G'\:|;VW2FR'F–FâVÒÜ:V–æ2ÖöFW&æ2…TTd’²uB’ÂW762–ç7G'\:|;VW2f–6ÒçVÖ'Fœ:|:6òWVVæf÷&ÖFFVÒdC3"ÂÇ7G&öæsç'Fœ:|:6òFR6—7FVÖTd“Â÷7G&öæsâ„U5’Â6öÒ6W&6FRÔ"âVÒÜ:V–æ2çF–v2„ÆVv7’²Ô%"’Âf–6Òæò&–ÖV—&ò6WF÷"FòF—66òRçVÖ'Fœ:|:6ò&W6W'fFãÂ÷à¢ÇäW76:&V:’vF÷R6÷'&ö×–F6öÒÖ—2g&W\:¦æ6–FòVR6R–Öv–æ¢–ç7FÆ:|:6òFRVÒ6VwVæFò6—7FVÖÂvW&Væ6–F÷"FR'Fœ:|;VW2–çFW'&ö×–FòÂ6ÆöævVÒ–æ6ö×ÆWFÂVVFFRVæW&v–GW&çFRGVÆ—¦:|:6òÂ&Æ–×W¦"FR'Fœ:|;VW2VR&V6–Ò–ì;§FV—2â÷26WW2'V—f÷26öçF–çVÒÌ:(	BfÇFòÖFR6öÖò6öÖ\:v"ãÂ÷à¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"Ö&÷&FW"&rÖ×WFVBóCÓBæ÷B×&÷6R×’Ób#à¢Ç6Æ74æÖSÒ&ÒÓFW‡B×6Ò#ãÇ7G&öæsä6öæf—&ÖR&–ÖV—&ó£Â÷7G&öæsâ6RòF—66òÆVÓæì:6óÂöVÓâ&V6Ræò6WGWÂW7FR'F–vòì:6ò:’ò6WR66ò(	Bl:&ÄÆ–æ²FóÒ"ö&Æörö6ö×WFF÷"ÖVçG&ÖF—&WFòÖæÖ&–÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#æÖWR6ö×WFF÷"VçG&F—&WFòæ$”õ3ÂôÆ–æ³âRG&FRFWFV<:|:6òçFW2FRFVçF"&W&òãÂ÷à¢Âö6–FSà ¢Æƒ#å76ò(	B6öæfW&—"÷&FVÒFR&–÷&–FFRFR&ö÷CÂöƒ#à¢ÆöÃà¢ÆÆ“äVçG&Ræò6WGW„FVÂÂc"÷RcÂ6öæf÷&ÖRòf'&–6çFR’R'&&ÆVÓä&ö÷CÂöVÓâãÂöÆ“à¢ÆÆ“å&ö7W&RÆ—7FÇ7G&öæsä&ö÷B&–÷&—G“Â÷7G&öæsâ÷RÇ7G&öæsä&ö÷B÷F–öâ3Â÷7G&öæsâãÂöÆ“à¢ÆÆ“å6RW†—7F—"VÖVçG&FÇ7G&öæsåv–æF÷w2&ö÷BÖævW#Â÷7G&öæsâÂ6öÆ÷VRÖVÒ&–ÖV—&òÇVv"âVçG&FÖ÷7G&VRòf—&×v&R6öæ†V6RVÒ6'&VvF÷#²–çFVw&–FFRFVÆR<;2f–66öæf—&ÖF6Ròv–æF÷w2–æ–6–"ãÂöÆ“à¢ÆÆ“å6R<;2&V6W"òæöÖRFòF—66ò‡÷"W†V×ÆòÂ%4D¢tD2tCâââ"’Âòf—&×v&Rl:¢ò†&Gv&RÖ2ì:6ò6†÷R6'&VvF÷"â6–v&ò76ò"ãÂöÆ“à¢ÆÆ“ä6öæf—&FÖ,:–Ò6RòÇ7G&öæsä54ÓÂ÷7G&öæsâì:6òfö’Æ–vFò÷RFW6Æ–vFò&V6VçFVÖVçFS¢ÇFW&æ"W76RÖöFòW66öæFRVçG&F2VRW†—7FVÒãÂöÆ“à¢ÆÆ“å6ÇfR6öÒcR&V–æ–6–Râ6RföÇF"fÆ†"Âì:6ò&W—FFVçFF—f(	B×VFRFRWFãÂöÆ“à¢ÂööÃà ¢Æƒ#å76ò"(	B–æ–6–Æ—¦"VÆÜ:ÖF–FR–ç7FÆ:|:6óÂöƒ#à¢Çäò&W&ò:’fV—Fò'F—"FRVÒVæG&—fR6öÒòv–æF÷w2â7&–:|:6òFÜ:ÖF–R÷2&WV—6—F÷2W7L:6òFW67&—F÷2VÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖ–ç7FÆ"×v–æF÷w2ÓÖFò×¦W&ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖò–ç7FÆ"òv–æF÷w2Fò¦W&óÂôÆ–æ³â(	BW6RWFFR7&–:|:6òFÜ:ÖF–RÇ7G&öæsæì:6ò&÷76–v&–ç7FÆ:|:6óÂ÷7G&öæsâãÂ÷à¢ÆöÃà¢ÆÆ“äÆ–wVRò6ö×WFF÷"6öÒòVæG&—fR6öæV7FFòRW66öÆ†òÖVçRFR–æ–6–Æ—¦:|:6ò†æ÷&ÖÆÖVçFRc"Âc÷Rc‚’ãÂöÆ“à¢ÆÆ“å6VÆV6–öæRòVæG&—fRæf&–çFR6ö×L:×fVÂ6öÒò6WRÖöFòFR&ö÷B(	BVçG&F26öÒ&Vf—†òÆVÓåTTd“£ÂöVÓâ&TTd’Â6VÒ&Vf—†ò&ÆVv7’ãÂöÆ“à¢ÆÆ“äæ&–ÖV—&FVÆÂfæ6RR6Æ—VRVÒÇ7G&öæså&W&"ò6ö×WFF÷#Â÷7G&öæsâÂì:6òVÒ–ç7FÆ"ãÂöÆ“à¢ÆÆ“å6–v÷"ÆVÓå6öÇ\:|:6òFR&ö&ÆVÖ3ÂöVÓâ(i"ÆVÓå&ö×BFR6öÖæFóÂöVÓâãÂöÆ“à¢ÂööÃà ¢Æƒ#å76ò2(	B&W&òWFöÜ:F–6òçFW2FòÖçVÃÂöƒ#à¢ÇäçFW2FRF–v—F"6öÖæF÷2ÂFVçFRÆVÓå6öÇ\:|:6òFR&ö&ÆVÖ3ÂöVÓâ(i"ÆVÓå&W&òFR–æ–6–Æ—¦:|:6óÂöVÓââVÒfÆ†26–×ÆW2FR$4BVÆR&W6öÇfR6÷¦–æ†òâ6RfÆ†"GV2fW¦W26VwV–F2Â76Rò&W&òÖçVÂ(	B–ç6—7F—"ì:6ò×VFò&W7VÇFFòãÂ÷à ¢Æƒ#äçFW2Fò&ö×C¢6öæf—&ÖRò&—DÆö6¶W#Âöƒ#à¢ÇäòÖ&–VçFRFR&V7WW&:|:6òöFRVF—"VÖ6†fRFRC‚L:Öv—F÷2&'&—"VÒföÇVÖR&÷FVv–Fòâ6ö×&Rò–FVçF–f–6F÷"W†–&–FòæFVÆ6öÒ6†fRwV&FFæ6öçFÖ–7&÷6ögBÂæ÷&væ—¦:|:6òVRFÖ–æ—7G&ò6ö×WFF÷"ÂVÒ'V—fò÷RVÒ–×&W7<:6òâ6†fRFRVçG&FFòv–æF÷w2ì:6ò7V'7F—GV’6†fRFR&V7WW&:|:6òãÂ÷à¢Çå6VÒ6†fR6÷'&W7öæFVçFRÂì:6òÆ–×RòEÒÂì:6òf÷&ÖFRRì:6ò&W7VÖVR&V–ç7FÆ"FWföÇfW,:6W76ò÷2'V—f÷2âòF—66òöFRW7F"6VL:fVÂR6öçF–çV"–ÆV|:×fVÂ÷"FW6–vââVçFVæFF–fW&Vì:væòÄÆ–æ²FóÒ"övÆ÷76&–òö&—FÆö6¶W""6Æ74æÖSÒ'FW‡BÖ66VçB#æwV–Fò&—DÆö6¶W#ÂôÆ–æ³âãÂ÷à ¢Æƒ#å76òB(	B&W&òÖçVÂVÆò&ö×BFR6öÖæFóÂöƒ#à¢Çä6öÖV6R–FVçF–f–6æFòò6Vì:&–òâæò&ö×BÂW†V7WFS£Â÷à¢Ç&SãÆ6öFR6Æ74æÖSÒ&ÆæwVvRÖ6ÖB#ç¶F—6·'@¦Æ—7BF—6°§6VÆV7BF—6² ¦Æ—7BföÇVÖVÓÂö6öFSãÂ÷&Sà¢Çäö'6W'fRGV2–æf÷&Ö:|;VW3¢6RòF—66òW7L:Ö&6Fò6öÒÇ7G&öæsæ7FW&—66òæ6öÇVæuCÂ÷7G&öæsâ†VçL:6ò:’TTd’’R6RW†—7FRVÒföÇVÖRWVVæòVÒÇ7G&öæsädC3#Â÷7G&öæsâ6öÒ6W&6FRÔ"†'Fœ:|:6òTd’’â6–6öÒÆ6öFSæW†—CÂö6öFSâãÂ÷à ¢Æƒ3ä6Vì:&–ò(	BF—66òÔ%"„ÆVv7’“Âöƒ3à¢Ç&SãÆ6öFR6Æ74æÖSÒ&ÆæwVvRÖ6ÖB#ç¶&ö÷G&V2öf—†Ö' ¦&ö÷G&V2öf—†&ö÷@¦&ö÷G&V2÷66æ÷0¦&ö÷G&V2÷&V'V–ÆF&6FÓÂö6öFSãÂ÷&Sà¢ÇäòÆ6öFSâ÷66æ÷3Âö6öFSâöFRVæ6öçG&"–ç7FÆ:|:6òFòv–æF÷w2â6RVÆR&W7öæFR%F÷FÂFR–ç7FÆ:|;VW2–FVçF–f–6F3¢"Â—76òì:6ò&÷fW&FF÷2'V—f÷3¢–ç7FÆ:|:6òöFRW7F"VÒ÷WG&ÆWG&Â&Æ÷VVFVÆò&—DÆö6¶W"Âf÷&FòG,:6òW7W&Fò÷R&VÆÖVçFRFæ–f–6Fâ&RFR&WWF—"6öÖæF÷2R–FVçF–f—VRòföÇVÖRçFW2FRW67&WfW"æòF—66òãÂ÷à ¢Æƒ3ä6Vì:&–ò"(	BF—66òuB…TTd’’6öÒ'Fœ:|:6òTd’&W6VçFSÂöƒ3à¢ÇäG&–'VVÖÆWG&:'Fœ:|:6òTd’R&V6öç7G'V÷2'V—f÷2FR–æ–6–Æ—¦:|:6ó£Â÷à¢Ç&SãÆ6öFR6Æ74æÖSÒ&ÆæwVvRÖ6ÖB#ç¶F—6·'@¦Æ—7BföÇVÖP§6VÆV7BföÇVÖR0¦76–vâÆWGFW#Õ0¦W†—@¦&6F&ö÷B3¥ÅÅv–æF÷w2÷23¢öbTTd–ÓÂö6öFSãÂ÷&Sà¢ÇåG&÷VRÆ6öFSçföÇVÖR3Âö6öFSâVÆòì;¦ÖW&ò&VÂFòföÇVÖRdC3"RÆ6öFSä3£Âö6öFSâVÆÆWG&öæFRW7L:7Fv–æF÷w2†æòÖ&–VçFRFR&V7WW&:|:6òÆWG&g&WVVçFVÖVçFR×VF(	B6öæf—&ÖR6öÒÆ6öFSæF—"3¥Åv–æF÷w3Âö6öFSâ’ãÂ÷à ¢Æƒ3ä6Vì:&–ò2(	B'Fœ:|:6òTd’W6VçFSÂöƒ3à¢Çå6Rì:6ò&V6RVÒföÇVÖRdC3"WVVæòÂì:6ò6öæ6ÇV–ÖVF–FÖVçFRVR'Fœ:|:6òfö’vF¢6öæf—&ÖRòF—66ò6VÆV6–öæFòÂòW7F–ÆòuBR6RFöF÷2÷2föÇVÖW2f÷&ÒÆ—7FF÷2â7&–"÷Rf÷&ÖF"VÖ'Fœ:|:6òÖöF–f–6W7G'WGW&FòF—66òRì:6ò:’VÖWF6VwW&&W†V7WF"÷"FVçFF—fãÂ÷à¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"ÖFW7G'V7F—fRóC&rÖFW7G'V7F—fRóRÓBæ÷B×&÷6R×’Ób#à¢Ç6Æ74æÖSÒ&ÒÓFW‡B×6Ò#ãÇ7G&öæsäÆ–Ö—FR6VwW&ó£Â÷7G&öæsâ6R'Fœ:|:6òTd’&VÆÖVçFRì:6òW†—7FRÂf:vVÖ–ÖvVÒ÷R<;7–F÷2FF÷2çFW2FR&V7&œ:ÖÆâ6R†÷WfW"L;§f–F6ö'&RòF—66òÂÆWG&F–ç7FÆ:|:6òÂW7:vòì:6òÆö6Fò÷R&—DÆö6¶W"Â–çFW'&ö×âò,;7†–Öò76ò:’F–vì;77F–6òFò&Ö¦VæÖVçFòÂì:6ò6÷–"VÒ&Æö6òFR6öÖæF÷2âfV¦ÄÆ–æ²FóÒ"ö&Æörö6öÖò×&V7WW&"ÖFF÷2Ö†BÖ6öÒÖFVfV—Fò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖò&W6W'f"FF÷2FRVÒF—66ò6öÒFVfV—FóÂôÆ–æ³âãÂ÷à¢Âö6–FSà ¢Æƒ3ä6Vì:&–òB(	B$6W76òæVvFò"æò&ö÷G&V2öf—†&ö÷CÂöƒ3à¢ÇäVÒTTd’ÂW76RW'&ò:’W7W&Fó¢ò6öÖæFò:’FR×VæFòÔ%"âW6R6W\:¦æ6–Fò6Vì:&–ò"6öÒÆ6öFSæ&6F&ö÷CÂö6öFSâÂVR:’fW'&ÖVçF6÷'&WF&&V7&–"÷2'V—f÷2FR–æ–6–Æ—¦:|:6òVÒF—66òuBãÂ÷à ¢Æƒ#å76òR(	BVæFòò&W&òì:6òVvÂöƒ#à¢Çå6R;72Æ6öFSæ&6F&ö÷CÂö6öFSâÜ:V–æföÇFòÖW6ÖòW'&òÂfW&–f—VRæW7F÷&FVÓ£Â÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæså'Fœ:|:6òF—f£Â÷7G&öæsâVÒÔ%"Â'Fœ:|:6òFò6—7FVÖ&V6—6W7F"Ö&6F6öÖòF—fƒÆ6öFSæ7F—fSÂö6öFSâæòF—6·'B’ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÖöFòFR&ö÷BÇFW&æFó£Â÷7G&öæsâ&W&òfV—FòVÒTTd’R6WGWVÒÆVv7’†÷Rò–çfW'6ò’ì:6ò–æ–6–â÷2Fö—2&V6—6Ò6öÖ&–æ"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6;¦FRFòF—66ó£Â÷7G&öæsâ6WF÷&W2FVfV—GV÷6÷2æ:&VFR–æ–6–Æ—¦:|:6òf¦VÒò&W&ò&gVæ6–öæ""RfÆ†"FRæ÷fòæò&V–ì:Ö6–ò6VwV–çFRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6ÆöævVÒ–æ6ö×ÆWF£Â÷7G&öæsâ<;7–2fV—F26VÒ–æ6ÇV—"2'Fœ:|;VW2FR6—7FVÖ–æ–6–ÒVÖfW¢R&ÒFWö—2(	Bò7&—L:—&–òW7L:VÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖ6Æöæ"Ö†B×&×76B"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6Æöæ"„B&54CÂôÆ–æ³âãÂöÆ“à¢Â÷VÃà¢Çå&V–ç7FÆ"ò6—7FVÖ&W6öÇfRò6–çFöÖÂÖ2vòVRW7F—fW"æòF—66òâ<;26–v÷"W76R6Ö–æ†òFWö—2FR6öæf—&Ö"<;7–F÷2'V—f÷2(	BR6&VæFòòVR&V–ç7FÆ:|:6òVçföÇfRÂ6öÖòFW67&—FòVÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖf÷&ÖF"×2×6VÒ×W&FW"Ö'V—f÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòf÷&ÖF"ò26VÒW&FW"'V—f÷3ÂôÆ–æ³âãÂ÷à ¢Æƒ#ä6öæ6ÇW<:6óÂöƒ#à¢Çâ$æò&ö÷F&ÆRFWf–6R"ì:6òWF÷&—¦6öæ6ÇV—"VRòF—66òÖ÷'&WRæVÒVR&7F&V7&–"ò6'&VvF÷"â6W\:¦æ6–6VwW&:“¢6öæf—&Ö"FWFV<:|:6òR6;¦FRÂ6öæfW&—"÷&FVÒRÖöFòFR&ö÷BÂÆö6Æ—¦"6†fRFò&—DÆö6¶W"ÂFVçF"ò&W&òWFöÜ:F–6òR<;2VçL:6òfÆ–"òÆ6öFSæ&6F&ö÷CÂö6öFSâ6öÒ÷&–vVÒRFW7F–æò–FVçF–f–6F÷2ãÂ÷à¢Çå6RòF—66ò6WVW"&V6RÂföÇFRòwV–&–æ6—Ã¢ÄÆ–æ²FóÒ"ö&Æörö6ö×WFF÷"ÖVçG&ÖF—&WFòÖæÖ&–÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#æÖWR6ö×WFF÷"VçG&F—&WFòæ$”õ3ÂôÆ–æ³ââ&VfW&RVRÆw\:–ÒW†V7WFRò&W&ò6öÒ÷2FF÷2&W6W'fF÷3òòW66÷òW7L:VÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âãÂ÷à ¢ÄVF—F÷&–Å&VfW&Væ6W26ÇVsÒ&W'&òÖæòÖ&ö÷F&ÆRÖFWf–6RÖ6öÖò×&W6öÇfW""óà¢Ç6Æ74æÖSÒ'FW‡B×6ÒFW‡BÖ×WFVBÖf÷&Vw&÷VæB#ä6öçF\;¦Fò&öGW¦–FòR&Wf—6FòVÆWV—RVF—F÷&–ÂFRòL:–6æ–6òFR–æf÷&Ü:F–6â&Wf—6FòVÒ"FR6WFVÖ'&òFR##bãÂ÷à¢Âóà¢’À¢ÒÀ ¢'G&÷VV’Öò×76BÖRÖò×2×6òÖ'&RÖÖ&–÷2#¢°¢F—FÆS¢%G&÷VV’ò„Bõ54BRò2<;2'&R$”õ3¢òVRf¦W""À¢W†6W'C ¢$F—66òæ÷fòfVÒf¦–ó¢6VÒ6—7FVÖ–ç7FÆFòÂò6ö×WFF÷"&æò6WGWâ6öÖò6öæf—&Ö"FWFV<:|:6òFòÒã"Â&W6öÇfW"6öæfÆ—FòFR÷'F2R–ç7FÆ"òv–æF÷w2Fò¦W&òâ"À¢FFS¢###bÓ‚Ó#R"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#ä–ç7FÆ"VÒ54Bæ÷fòRfW"Ü:V–æ&"æFVÆFR6öæf–wW&:|:6òì:6ò:’6–æÂFRFVfV—Fòâ8’ò6ö×÷'FÖVçFòW7W&Fó¢Ç7G&öæsæF—66òæ÷fò6’FRl:'&–6f¦–óÂ÷7G&öæsâÂ6VÒ6—7FVÖ÷W&6–öæÂR6VÒ6'&VvF÷"FR–æ–6–Æ—¦:|:6òâì:6òW†—7FRæF&òf—&×v&R–æ–6–"ãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çä6öæf—&ÖRVRòF—66òæ÷fò&V6RæÆ—7FFRF—7÷6—F—f÷2Fò6WGWÂfW&–f—VR6Rò6Æ÷BÒã"W6Fòì:6òFW6F—f÷RVÖ÷'F4DÂR–ç7FÆRò6—7FVÖ'F—"FRVÒVæG&—fR(	B÷RÂ6R–çFVì:|:6òW&ÖçFW"GVFò6öÖòW7FfÂf:v6ÆöævVÒ6÷'&WFÖVçFRVÒfW¢FR–ç7FÆ"Fò¦W&òãÂ÷à ¢Æƒ#å÷"VRòF—66òæ÷fòì:6ò–æ–6–6÷¦–æ†óÂöƒ#à¢ÇåVÒ54B&V<:–ÒÖ6ö×&Fòæ÷&ÖÆÖVçFRæVÒFVÒF&VÆFR'Fœ:|;VW2âVÆR:’VÒW7:vò''WFòâ&f—&"VÒF—66òFR6—7FVÖVÆR&V6—66W"Ç7G&öæsæ–æ–6–Æ—¦FóÂ÷7G&öæsâ‡&V6V&W"VÖF&VÆuB÷RÔ%"’ÂÇ7G&öæsç'F–6–öæFóÂ÷7G&öæsâÂÇ7G&öæsæf÷&ÖFFóÂ÷7G&öæsâRf–æÆÖVçFR&V6V&W"–ç7FÆ:|:6òâò–ç7FÆF÷"Fòv–æF÷w2f¢2VG&òWF2ÂVçL:6òì:6ò:’æV6W7<:&–ò&W&"òF—66òçFW2ãÂ÷à¢ÇäW†—7FRVÖW†6\:|:6òVR6W66öægW<:6ó¢54G2fVæF–F÷26öÖò&6öÒv–æF÷w2–ç7FÆFò"÷"Æö¦2–æFWVæFVçFW2âæW76W266÷2Â–ç7FÆ:|:6ò6÷7GVÖW7F"f–æ7VÆFò†&Gv&RFR÷&–vVÒRfÆ†"æò&–ÖV—&ò&ö÷BãÂ÷à ¢Æƒ#å76ò(	BòF—66ò&V6Ræò6WGWóÂöƒ#à¢ÇäVçG&Ræò6WGWR&ö7W&R&FR–æf÷&Ö:|;VW2Fò6—7FVÖ÷RFR&Ö¦VæÖVçFòâòÖöFVÆòFòF—66òæ÷fò&V6—6W7F"Æ—7FFòâ6Rì:6òW7F—fW#£Â÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsäÒã"ÖÂVæ6—†Fó£Â÷7G&öæsâòÜ;6GVÆòVçG&–æ6Æ–æFòÂVæ6÷7Fæòf–ÒFò6öæV7F÷"R<;2VçL:6ò:’&W6òVÆò&gW6òâ6VÒò&gW6òÂVÆRf–6ÆWfçFFòRW&FR6öçFFòãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6Æ÷B–æ6ö×L:×fVÃ£Â÷7G&öæsâŒ:6Æ÷G2Òã"Væ24DÂVæ2ådÖR…4–R’RŒ:Ö'&–F÷2â6öæf—&æòÖçVÂFÆ6÷RFòæ÷FV&öö²VÂ:’òFò6WRÖöFVÆòâ6†fR"ÂÒ÷R"´Òæò6öæV7F÷"FòÜ;6GVÆò:’ò&–ÖV—&ò–æL:Ö6–òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6öæfÆ—FòFR÷'F3£Â÷7G&öæsâF—f"ò6VwVæFòÒã"FW6&–Æ—F÷'F24DW7V<:Öf–62VÒ×V—F2Æ62â8’÷"—76òVRÂò–ç7FÆ"ò54Bæ÷fòÂò„BçF–vò:2fW¦W2'6öÖR"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså4DVÒÖöFòW'&Fó£Â÷7G&öæsâò6öçG&öÆF÷"&V6—6W7F"VÒÇ7G&öæsä„4“Â÷7G&öæsââÖöFò$”B÷R–çFVÂ%5BW66öæFRF—66÷2Fò–ç7FÆF÷"Fòv–æF÷w2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFFF÷"÷R6FG“£Â÷7G&öæsâFFF÷&W2&&F÷2FR&–;7F–6fÆ†Ò6öÒg&W\:¦æ6–âFW7FRòF—66òF—&WFòæÆ6çFW2FR7VÇ"òF—66òãÂöÆ“à¢Â÷VÃà¢ÇäFWFÆ†W2FR6ö×F–&–Æ–FFRçFW2F6ö×&W7L:6òVÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖf¦W"×Ww&FR×76BÖçfÖR"6Æ74æÖSÒ'FW‡BÖ66VçB#çWw&FR&54BådÖSÂôÆ–æ³âÂRò66òW7V<:Öf–6òFRæ÷FV&öö·26öÒFö—2&Ö¦VæÖVçF÷2VÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖ–ç7FÆ"×6VwVæFò×76BÖæ÷FV&öö²"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖò–ç7FÆ"VÒ6VwVæFò54Bæòæ÷FV&öö³ÂôÆ–æ³âãÂ÷à ¢Æƒ#å76ò"(	B6öæf–wW&"ò6Æ÷BÒã"æ$”õ3Âöƒ#à¢ÇåÆ626öÒl:&–÷26Æ÷G2Òã"6÷7GVÖÒW‡÷"÷:|;VW2VR&V6—6Ò&FW"6öÒò†&Gv&R–ç7FÆFó£Â÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsäÒã"ÖöFRòÒã"6öæf–wW&F–öã£Â÷7G&öæsâÇFW&æVçG&R4DR4–R&ò6Æ÷BâVÒÆVÓäWFóÂöVÓâvW&ÆÖVçFRgVæ6–öæ²VÒÖöFòf—†òW'&FòÂòF—66òFW6&V6RãÂöÆ“à¢ÆÆ“ãÇ7G&öæsävW&:|:6ò4–R„vVã29rvVãB“£Â÷7G&öæsâFV—†"VÒÆVÓäWFóÂöVÓâ:’ò&V6öÖVæFFòâf÷,:v"vVãBVÒÆ6÷RF—66òVRì:6ò7W÷'FÒ&öGW¢–ç7F&–Æ–FFRRFWFV<:|:6ò–çFW&Ö—FVçFS²f÷,:v"vVã2çVÒF—66òvVãBVæ2Æ–Ö—FfVÆö6–FFRÂ6VÒ–×VF—"ògVæ6–öæÖVçFòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäF—f—<:6òFRÆ–æ†24–S£Â÷7G&öæsâVÒÆwVÖ2Æ62Âö7W"ò6VwVæFòÒã"&VGW¢2Æ–æ†2FÆ6FRl:ÖFVòâì:6ò–×VFRò&ö÷BÂÖ2W‡Æ–6VVFFRFW6V×Væ†òFWö—2FòWw&FRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä&ö÷BÖöFS£Â÷7G&öæsâ&–ç7FÆ"v–æF÷w2ÂÖçFVæ†Ç7G&öæsåTTd“Â÷7G&öæsâ6öÒ54ÒFW6&–Æ—FFòR6V7W&R&ö÷BÆ–vFòãÂöÆ“à¢Â÷VÃà ¢Æƒ#å76ò2(	B–ç7FÆ"òv–æF÷w2'F—"Fò6WGWÂöƒ#à¢ÆöÃà¢ÆÆ“ä7&–RÜ:ÖF–FR–ç7FÆ:|:6òVÒ÷WG&ò6ö×WFF÷"(	BWFW7L:FWFÆ†FVÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖ–ç7FÆ"×v–æF÷w2ÓÖFò×¦W&ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖò–ç7FÆ"òv–æF÷w2Fò¦W&óÂôÆ–æ³âãÂöÆ“à¢ÆÆ“ä6öæV7FRòVæG&—fRÂÆ–wVRR'&òÖVçRFR–æ–6–Æ—¦:|:6ò„c"Âc÷Rc‚’÷R6öÆ÷VRòVæG&—fRVÒ&–ÖV—&òÇVv"æÆ—7FFR&–÷&–FFRãÂöÆ“à¢ÆÆ“äW66öÆ†VçG&F6öÒ&Vf—†òÇ7G&öæsåTTd“£Â÷7G&öæsâ&VR–ç7FÆ:|:6òW6RuBãÂöÆ“à¢ÆÆ“äò6†Vv"æW66öÆ†FòF—66òÂ6VÆV6–öæRòÇ7G&öæsæW7:vòì:6òÆö6FóÂ÷7G&öæsâFò54Bæ÷fòRfæ6Râò–ç7FÆF÷"7&–WFöÖF–6ÖVçFR'Fœ:|:6òTd’Â&W6W'fFRFò6—7FVÖãÂöÆ“à¢ÆÆ“å6Rò–ç7FÆF÷"–æf÷&Ö"VRì:6ò:’÷7<:×fVÂ–ç7FÆ"æVVÆRF—66òÂV6R6V×&R:’6öæfÆ—FòFRÖöFò„Ô%"9ruB’÷R6öçG&öÆF÷"VÒ$”B(	B§W7FRæò6WGWR&V6öÖV6RãÂöÆ“à¢ÆÆ“äFWö—2F–ç7FÆ:|:6òÂVçG&Ræò6WGWR6öæf—&ÖRVRÇ7G&öæsåv–æF÷w2&ö÷BÖævW#Â÷7G&öæsâf–6÷R6öÖò&–ÖV—&÷:|:6òãÂöÆ“à¢ÂööÃà¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"Ö&÷&FW"&rÖ×WFVBóCÓBæ÷B×&÷6R×’Ób#à¢Ç6Æ74æÖSÒ&ÒÓFW‡B×6Ò#ãÇ7G&öæsäF—66òçF–vò6öæV7FFóóÂ÷7G&öæsâGW&çFR–ç7FÆ:|:6òÂFV—†RVæ2ò54Bæ÷fòÆ–vFòâ6öÒFö—2F—66÷2&W6VçFW2Âò–ç7FÆF÷"öFRw&f"'Fœ:|:6òFR–æ–6–Æ—¦:|:6òæòF—66òW'&Fò(	BRÜ:V–æFV—†FR–æ–6–"VæFòòçF–vòf÷"&VÖ÷f–FòãÂ÷à¢Âö6–FSà ¢Æƒ#å76òB(	B&V7WW&"÷2'V—f÷2FòF—66òçF–vóÂöƒ#à¢ÇäFWö—2VRò6—7FVÖæ÷fòW7F—fW"gVæ6–öææFòÂ&V6öæV7FRòF—66òçF–vò6öÖò6V7VæL:&–ò†–çFW&æò÷R÷"FFF÷"U4"’âVÆR&V6W,:6öÖòVÖVæ–FFR6ö×VÒR÷2Fö7VÖVçF÷2Âf÷F÷2RF÷væÆöG26öçF–çVÒ6W7<:×fV—2æ27F2FRW7\:&–òãÂ÷à¢Çå&öw&Ö2ì:6òÖ–w&ÒFW76f÷&Ö¢&V6—6Ò6W"&V–ç7FÆF÷2â6öçF2FRRÖÖ–Â6öæf–wW&F2Æö6ÆÖVçFRW†–vVÒW‡÷'F:|:6ò,:—f–(	B6RW76RW&ò6WR66òRòF—66òçF–vò¬:fö’vFòÂò6Ö–æ†ò:’òFRÄÆ–æ²FóÒ"ö&Æörö6öÖò×&V7WW&"ÖFF÷2Ö†BÖ6öÒÖFVfV—Fò"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&V7WW&:|:6òFRFF÷3ÂôÆ–æ³âãÂ÷à ¢Æƒ#ä–ç7FÆ"Fò¦W&ò÷R6Æöæ#óÂöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsä–ç7FÆ"Fò¦W&óÂ÷7G&öæsâVæFòò6—7FVÖçF–vòW7FfÆVçFòÂ–ç7L:fVÂÂ–æfV7FFò÷R×V—FòçF–vòâfö<:¢W&FR6öæf–wW&:|:6òÂÖ2væ†VÒÖ&–VçFRÆ–×òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6Æöæ#Â÷7G&öæsâVæFòò6—7FVÖgVæ6–öæ&VÒRŒ:×V—F÷2&öw&Ö26öæf–wW&F÷2âò7&—L:—&–òÂ÷2&—66÷2RòÖ÷F—fòFRVÖ<;7–:2fW¦W2ì:6ò–æ–6–Æ—¦"W7L:6òVÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖ6Æöæ"Ö†B×&×76B"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6Æöæ"„B&54CÂôÆ–æ³âãÂöÆ“à¢Â÷VÃà¢Çå6Rfö<:¢6Æöæ÷RRÜ:V–æ&÷Ræò6WGWÂò&ö&ÆVÖì:6ò:’òF—66òæ÷fó¢:’ò6'&VvF÷"VRì:6òfV–ò§VçFò(	Bò&W&òW7L:VÒÄÆ–æ²FóÒ"ö&ÆöröW'&òÖæòÖ&ö÷F&ÆRÖFWf–6RÖ6öÖò×&W6öÇfW""6Æ74æÖSÒ'FW‡BÖ66VçB#æW'&ò$æò&ö÷F&ÆRFWf–6R#ÂôÆ–æ³âãÂ÷à ¢Æƒ#ä6öæ6ÇW<:6óÂöƒ#à¢ÇäF—66òæ÷fò6V×&R&æ$”õ2L:’&V6V&W"VÒ6—7FVÖâ6W\:¦æ6–6÷'&WF:’6öæf—&Ö"FWFV<:|:6òÂ§W7F"ò6Æ÷BRòÖöFòFR&ö÷BÂ–ç7FÆ"6öÒVæ2òF—66òæ÷fò6öæV7FFòR<;2FWö—2&V6öæV7F"òçF–vò&6÷–"÷2'V—f÷2ãÂ÷à¢Çå&òVG&ò6ö×ÆWFòFR6W62FR&Fæò6WGWÂföÇFRòwV–&–æ6—Ã¢ÄÆ–æ²FóÒ"ö&Æörö6ö×WFF÷"ÖVçG&ÖF—&WFòÖæÖ&–÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#æÖWR6ö×WFF÷"VçG&F—&WFòæ$”õ3ÂôÆ–æ³ââ&W†V7WF"òWw&FR6öÒFF÷2&W6W'fF÷2RFW7FRFR6;¦FRFòF—66òÂfV¦ÄÆ–æ²FóÒ"÷6W'f–6÷2÷Ww&FR×76B×&Ò"6Æ74æÖSÒ'FW‡BÖ66VçB#çWw&FRFR54BRÖVÜ;7&–ÂôÆ–æ³âãÂ÷à ¢Ç6Æ74æÖSÒ'FW‡B×6ÒFW‡BÖ×WFVBÖf÷&Vw&÷VæB#ä6öçF\;¦Fò&öGW¦–FòR&Wf—6FòVÆWV—RVF—F÷&–ÂFRòL:–6æ–6òFR–æf÷&Ü:F–6â&Wf—6FòVÒ#RFRv÷7FòFR##bãÂ÷à¢Âóà¢’À¢ÒÀ ¢òò)H)HôäD2(	B6L:–Æ—FW2Fò6ÇW7FW"&ÆVçF–L:6òW‡G&VÖ"à¢&Æ–×"Ö'V—f÷2×FV×÷&&–÷2×v–æF÷w2#¢°¢F—FÆS¢$6öÖòÆ–×"'V—f÷2FV×÷,:&–÷2RÆ–&W&"W7:vòæòv–æF÷w2"À¢W†6W'C ¢$öæFRòv–æF÷w2wV&F'V—f÷2FV×÷,:&–÷2ÂVçFò—76ò&VÆÖVçFRW6æòFW6V×Væ†òR6öÖòÆ–×"6öÒ6VwW&ì:v(	B6VÒ&öw&Ö2FRf†–æR6VÒv"òVRf¢fÇFâ"À¢FFS¢###bÓ‚Ó#R"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#äÆ–×"'V—f÷2FV×÷,:&–÷2ì:6òG&ç6f÷&ÖVÒ6ö×WFF÷"çF–vòVÒVÒ6ö×WFF÷",:–FòâÖ2VæFòòF—66òFò6—7FVÖW7L:V6R6†V–òÂÆ–×W¦FV—†FR6W"6÷6Ü:—F–6¢òv–æF÷w2W&FRW7:vò&ÖVÜ;7&–f—'GVÂÂGVÆ—¦:|:6òR66†RÂRÜ:V–æf–6ÆVçFFRVÒ¦V—FòVRæVæ‡VÖG&ö6FR\:v&W6öÇfRãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢ÇåW6RòÇ7G&öæså6Vç6÷"FR&Ö¦VæÖVçFóÂ÷7G&öæsâRÇ7G&öæsäÆ–×W¦FRF—66óÂ÷7G&öæsâFò,;7&–òv–æF÷w2âVÆW2vÒ66†RFRGVÆ—¦:|:6òÂÖ–æ–GW&2Â&VÆL;7&–÷2FRW'&òR7FÆ6öFSåFV×Âö6öFSâ6VÒFö6"æ÷26WW2'V—f÷2â&öw&Ö2FR&÷F–Ö—¦:|:6ò"VR&öÖWFVÒvæ†òFRfVÆö6–FFRì:6òf¦VÒæFÌ:–ÒF—76ò(	BRÆwVç2ÖW†VÒæò&Vv—7G&ò6VÒæV6W76–FFRãÂ÷à ¢Æƒ#äòVR<:6ò'V—f÷2FV×÷,:&–÷2ÂFRfW&FFSÂöƒ#à¢Çä'V—fòFV×÷,:&–ò:’VÇVW"6ö—6VRVÒ&öw&Öw&f&W6ò–ÖVF–FòRFWfW&–v"FWö—3¢VÒ–ç7FÆF÷"FW66ö×7FFòÂVÖ,:—f–FR–ÖvVÒÂVÒ6÷FRFRGVÆ—¦:|:6ò¬:Æ–6FòÂVÒFW7V¦òFRÖVÜ;7&–FRVÒG&fÖVçFòâò&ö&ÆVÖì:6ò:’ò'V—fò(	B:’ò&öw&ÖVRfV6†6VÒÆ–×"òVR7&–÷RãÂ÷à¢Çä6öÒòFV×òÂ6ö'&ÒG,:§2<;¦×VÆ÷2&–æ6——3£Â÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæså7FFV×FòW7\:&–òRFò6—7FVÖ£Â÷7G&öæsâ&W7F÷2FR–ç7FÆF÷&W2RFR6W7<;VW2Væ6W'&F2FRf÷&Öæ÷&ÖÂãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä66†RFRGVÆ—¦:|:6òFòv–æF÷w3£Â÷7G&öæsâ6÷FW2¬:–ç7FÆF÷2VR6öçF–çVÒwV&FF÷2&W&Ö—F—"FW6–ç7FÆ:|:6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæså7Fv–æF÷w2æöÆC£Â÷7G&öæsâ<;7–Fò6—7FVÖçFW&–÷";72VÖGVÆ—¦:|:6òw&æFR(	B6÷7GVÖö7W"FW¦Væ2FRv–v'—FW2ãÂöÆ“à¢Â÷VÃà ¢Æƒ#å÷"VRW7:vòÆ—g&RfWFfVÆö6–FFSÂöƒ#à¢Çäòv–æF÷w2W6òF—66òFò6—7FVÖ6öÖòW‡FVç<:6òFÖVÜ;7&–ƒÇ7G&öæsæ'V—fòFRv–æ:|:6óÂ÷7G&öæsâ’R6öÖò:&VFRG&&Æ†ò&GVÆ—¦:|:6òÂ–æFW†:|:6òR66†RFRÆ–6F—f÷2âVæFòòW7:vòÆ—g&Rf–6×V—Fò&—†òÂW762÷W&:|;VW276Ò6ö×WF—"÷"VÒVæ†FòFR&Æö6÷2Æ—g&W2ãÂ÷à¢ÇäVÒ54BÂW†—7FRVÒw&fçFRL:–6æ–6ó¢ò6öçG&öÆF÷"&V6—6FR&Æö6÷2Æ—g&W2&W67&WfW"R&V÷&væ—¦"FF÷2âVÒ54B&F–6ÖVçFR6†V–òw&fÖ—2FWfv"FòVRòÖW6Öò54B6öÒföÆv(	BòVfV—Fò&V6R6öÖòG&fF–æ†2ò6Çf"'V—f÷2R'&—"&öw&Ö2â6öÖò&Vw&,:F–6ÂÖçFVæ†VÆòÖVæ÷2Ç7G&öæsãRRRFòF—66òÆ—g&SÂ÷7G&öæsâãÂ÷à¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"Ö&÷&FW"&rÖ×WFVBóCÓBæ÷B×&÷6R×’Ób#à¢Ç6Æ74æÖSÒ&ÒÓFW‡B×6Ò#ãÇ7G&öæsäF–vì;77F–6ò†öæW7Fó£Â÷7G&öæsâ6RòF—66òFVÒ&7FçFRW7:vòÆ—g&RRÜ:V–æ6öçF–çVÆVçFÂòv&vÆòì:6ò:’Æ—†òF–v—FÂâföÇFR:G&–vVÒ6ö×ÆWFVÒÄÆ–æ²FóÒ"ö&Æörö6ö×WFF÷"ÖÆVçFòÖ6W62×6öÇV6öW2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6ö×WFF÷"ÆVçFó¢6W62R6öÇ\:|;VW3ÂôÆ–æ³âçFW2FRW&FW"FV×ò6öÒf†–æãÂ÷à¢Âö6–FSà ¢Æƒ#å76ò76ó¢Æ–×W¦6VwW&Âöƒ#à¢ÆöÃà¢ÆÆ“ãÇ7G&öæsåfV¦&öæFRfö’òW7:vòãÂ÷7G&öæsâ'&ÆVÓä6öæf–wW&:|;VW2(i"6—7FVÖ(i"&Ö¦VæÖVçFóÂöVÓââòv–æF÷w2Ö÷7G&F—f—<:6ò÷"6FVv÷&–†Æ–6F—f÷2Â'V—f÷2FV×÷,:&–÷2ÂFö7VÖVçF÷2’â6öÖV6RVÆ6FVv÷&–Ö–÷"Âì:6òVÆÖ—2l:6–ÂãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÆ–×R÷2FV×÷,:&–÷2VÆ,;7&–FVÆãÂ÷7G&öæsâVÒÆVÓä'V—f÷2FV×÷,:&–÷3ÂöVÓâÂÖ'VR66†RFRGVÆ—¦:|:6òÂÖ–æ–GW&2Â&VÆL;7&–÷2FRW'&òRÆ—†V—&â6öæf—&òVRW7L:Ö&6FòçFW2FR6öæf—&Ö#¢$F÷væÆöG2"&V6RæÆ—7FR6öçL:–Ò'V—f÷26WW2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäF—fRò6Vç6÷"FR&Ö¦VæÖVçFòãÂ÷7G&öæsâVÆR&WWFRW76Æ–×W¦6÷¦–æ†òRW7f¦–Æ—†V—&FWö—2FRVÒW,:ÖöFòVRfö<:¢FVf–æRâ8’F–fW&Vì:vVçG&RÆ–×"VÖfW¢Rì:6ò&V6—6"Ö—2Vç6"æ—76òãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&VÖ÷f–ç7FÆ:|:6òçFW&–÷"Â6RW†—7F—"ãÂ÷7G&öæsâ÷:|:6ò$–ç7FÆ:|;VW2çFW&–÷&W2Fòv–æF÷w2"v7FÆ6öFSåv–æF÷w2æöÆCÂö6öFSââFWö—2F—76òfö<:¢ì:6ò6öç6VwVRÖ—2&WfW'FW"GVÆ—¦:|:6ò(	B<;2Ö'VR6Rò6—7FVÖGVÂW7L:W7L:fVÂŒ:6VÖæ2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFW6–ç7FÆRòVRì:6ò:’W6FòãÂ÷7G&öæsâVÒÆVÓäÆ–6F—f÷2–ç7FÆF÷3ÂöVÓâÂ÷&FVæR÷"FÖæ†òâ&öw&Ö2w&æFW2W7VV6–F÷26÷7GVÖÒÆ–&W&"Ö—2W7:vòFòVRVÇVW"Æ–×W¦FR66†RãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&V–æ–6–RR6öæf—&ãÂ÷7G&öæsâ'FRFòW7:vò<;2:’FWföÇf–FFWö—2Fò&V–ì:Ö6–òÂVæFò'V—f÷2VÒW6ò<:6òf–æÆÖVçFRÆ–&W&F÷2ãÂöÆ“à¢ÂööÃà ¢Æƒ#äòVRì:6òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsäv"7FFV×æVæ†Â6öÒò6—7FVÖVÒW6ó£Â÷7G&öæsâ'V—f÷2&W'F÷2÷"&öw&Ö2VÒW†V7\:|:6òl:6òF"W'&òRÂVÒÆwVç266÷2ÂFW''V&"òÆ–6F—fòâW6RfW'&ÖVçFFò6—7FVÖãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÆ–×F÷&W2FR&Vv—7G&ó£Â÷7G&öæsâòvæ†òFRFW6V×Væ†ò:’–×W&6WL:×fVÂRò&—66òFR&VÖ÷fW"VÖ6†fRW6F÷"VÒG&—fW":’&VÂãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFW6F—f"ò'V—fòFRv–æ:|:6ò&&væ†"W7:vò#£Â÷7G&öæsâVÒÜ:V–æ26öÒ÷V6ÖVÜ;7&–Â—76òG&ö6ÆVçF–L:6ò÷"W'&òFRÖVÜ;7&––ç7Vf–6–VçFRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFW6g&vÖVçF"54C£Â÷7G&öæsâFW6æV6W7<:&–òRFW6v7FòF—66òâòv–æF÷w2¬:W†V7WFE$”ÒWFöÖF–6ÖVçFRãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFòÆ–×W¦ì:6ò:’&W7÷7FÂöƒ#à¢Çå6RòF—66òVæ6†RFRæ÷fòVÒ÷V6÷2F–2ÂW†—7FRVÖ6W6F—f¢6–æ7&öæ—¦:|:6òFRçWfVÒGWÆ–6æFò7F2Â&6·WFR–ÖvVç2Fò6VÇVÆ"ÂÆöw2FRVÒÆ–6F—fò6öÒFVfV—Fò÷RVÖ7FFRFW7V¦òFRG&fÖVçF÷2VR6R&V7&–6FFVÆ§VÂâæW76R;¦ÇF–Öò66òÂò77VçFòì:6ò:’W7:vò(	B:’W7F&–Æ–FFRÂRò6Ö–æ†òW7L:VÒÄÆ–æ²FóÒ"ö&Æörö6öÖò×&W6öÇfW"×FVÆÖ§VÂ×v–æF÷w2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖò&W6öÇfW"FVÆ§VÂFòv–æF÷w3ÂôÆ–æ³âãÂ÷à¢ÇäR6RÜ:V–æ–æFW6„BÖV<:&æ–6òÂæVæ‡VÖÆ–×W¦f’&÷†–Ö"òFW6V×Væ†òFòFRVÒ54Bâ6ö×&:|:6òFRvæ†ò&VÂRFRVæFò6ö×Vç6G&ö6"W7L:VÒÄÆ–æ²FóÒ"ö&Æör÷VæFò×G&ö6"Ö†B×÷"×76B"6Æ74æÖSÒ'FW‡BÖ66VçB#çVæFòG&ö6"„B÷"54CÂôÆ–æ³âãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢ÇåfÆRVF—"§VFVæFòòW7:vò6öÖR6VÒW‡Æ–6:|:6òFWö—2FÆ–×W¦ÂVæFòòv–æF÷w2&V7W6GVÆ—¦"÷"fÇFFRW7:vòÖW6Öò6öÒF—66òÆ–&W&FòÂ÷RVæFòÆVçF–L:6òfVÒ6ö×æ†FFR&'VÆ†òæòF—66òÂG&fÖVçF÷2R&V–ì:Ö6–÷2âæW76W266÷2òFW6V×Væ†ò:’6–çFöÖÂì:6ò6W6âòW66÷òFRfW&–f–6:|:6òW7L:VÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³ã²W†V7\:|:6òVÒ&æ6F÷Ræò6WRVæFW&\:vòÂVÒÄÆ–æ²FóÒ"÷6W'f–6÷2öÖçWFVæ6òÖFRÖ6ö×WFF÷""6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6òFR6ö×WFF÷#ÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&ÖVÖ÷&–×&ÒÖ–ç7Vf–6–VçFR×6–çFöÖ2#¢°¢F—FÆS¢$ÖVÜ;7&–$Ò–ç7Vf–6–VçFS¢6–çFöÖ2Â6öÖò6öæf—&Ö"RVæFòf¦W"Ww&FR"À¢W†6W'C ¢$6öÖòF—7F–æwV—"fÇFFRÖVÜ;7&–FRF—66òÆVçFò÷Rl:×'W2ÂÆW"òvW&Væ6–F÷"FRF&Vf26VÒ6RVævæ"RFV6–F—"6RòWw&FRFR$Ò&W6öÇfRò6WR66òâ"À¢FFS¢###bÓ‚Ó#R"À¢&VEF–ÖS¢#"Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#äfÇFFRÖVÜ;7&–FVÒVÖ76–æGW&,;7&–¢Ü:V–æ&W7öæFR&VÒ6öÒFö—2÷RG,:§2&öw&Ö2&W'F÷2RFW6ÖöçFVæFòfö<:¢'&RòV'Fòâì:6ò:’VÖÆVçF–L:6ò6öç7FçFR(	B:’VÖÆVçF–L:6òVR&V6RVæFòfö<:¢G&&Æ†FRfW&FFRãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çå6RòW6òFRÖVÜ;7&–f–6,;7†–ÖòFRRVçVçFòò&ö6W76F÷"W7L:G&çV–ÆòÂRòF—66òF—7&§VçFòÂò6ö×WFF÷"W7L:6ö×Vç6æFòfÇFFR$Ò6öÒò'V—fòFRv–æ:|:6òâæW76R6Vì:&–òÂVÖVçF"ÖVÜ;7&–:’òWw&FRVR×VFW‡W&œ:¦æ6–â6RÖVÜ;7&–6ö'&RòF—66òf—fRVÒRÂòv&vÆò:’òF—66ò(	Bì:6ò$ÒãÂ÷à ¢Æƒ#å6–çFöÖ2L:×–6÷3Âöƒ#à¢ÇVÃà¢ÆÆ“åG&ö6"FR&FòæfVvF÷"&V6'&Vv:v–æÂ6öÖò6RVÆF—fW76R6–FòFW66'FFãÂöÆ“à¢ÆÆ“äÇFW&æ"VçG&R&öw&Ö2&W'F÷2FVÖ÷&ÂÖW6ÖòVR6FVÒFVÆW2'&,:–Fò—6öÆFÖVçFRãÂöÆ“à¢ÆÆ“äòÖ÷W6R6öçF–çV&W7öæFVæFòÂÖ22¦æVÆ2FVÖ÷&Ò&VFW6Væ†"ãÂöÆ“à¢ÆÆ“äÖVç6vVç2FR&ÖVÜ;7&––ç7Vf–6–VçFR"ò'&—"'V—f÷2w&æFW2÷Rl:&–2–ÖvVç2ãÂöÆ“à¢ÆÆ“äòFW6V×Væ†ò–÷&òÆöævòFòF–RföÇFòæ÷&ÖÂFWö—2FR&V–æ–6–"ãÂöÆ“à¢Â÷VÃà¢ÇäW76R;¦ÇF–Öò—FVÒ:’òÖ—2&WfVÆF÷#¢&V–æ–6–"FWföÇfRÖVÜ;7&–Âì:6òFWföÇfRF—66òæVÒ&ö6W76F÷"ãÂ÷à ¢Æƒ#ä6öÖò6öæf—&Ö"6VÒ6‡WF#Âöƒ#à¢ÆöÃà¢ÆÆ“ä'&òÇ7G&öæsävW&Væ6–F÷"FRF&Vf3Â÷7G&öæsâ„7G&Âµ6†–gB´W62’Rl:VÒÆVÓäFW6V×Væ†ò(i"ÖVÜ;7&–ÂöVÓâãÂöÆ“à¢ÆÆ“åG&&Æ†Ræ÷&ÖÆÖVçFR÷"ÆwVç2Ö–çWF÷2Â6öÒòVRfö<:¢6÷7GVÖÖçFW"&W'FòãÂöÆ“à¢ÆÆ“äö'6W'fRG,:§2ì;¦ÖW&÷3¢Ç7G&öæsäVÒW6óÂ÷7G&öæsâÂÇ7G&öæsä6öæf—&ÖFóÂ÷7G&öæsâRÇ7G&öæsäVÒ66†SÂ÷7G&öæsâãÂöÆ“à¢ÂööÃà¢Çäò6×òÇ7G&öæsä6öæf—&ÖFóÂ÷7G&öæsâ&V6R6öÖò#"ÃóbÃt""R:’òÖ—2†öæW7Fó¢VÆRÖ÷7G&VçFÖVÜ;7&–÷2&öw&Ö2VF—&ÒÂ6öÖæFò$ÒRv–æ:|:6òâVæFòò&–ÖV—&òì;¦ÖW&òVæ6÷7Fæò6VwVæFò6öÒg&W\:¦æ6–ÂÜ:V–æW7L:æòÆ–Ö—FRÖW6ÖòVRòw,:f–6òì:6òÖ'VRRãÂ÷à¢ÇåVÒW'&ò6ö×VÓ¢77W7F"×6R6öÒÖVÜ;7&–&VÒ66†R"âòv–æF÷w2W6ÖVÜ;7&–Æ—g&R6öÖò66†RFRF—66òFR&÷;76—Fò(	BÖVÜ;7&–&Fì:6ò6VÆW&æFâ66†RÇFòì:6ò:’&ö&ÆVÖãÂ÷à¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"Ö&÷&FW"&rÖ×WFVBóCÓBæ÷B×&÷6R×’Ób#à¢Ç6Æ74æÖSÒ&ÒÓFW‡B×6Ò#ãÇ7G&öæsåFW7FR7'W¦Fó£Â÷7G&öæsâæ&ÆVÓäFW6V×Væ†óÂöVÓâÂöÆ†RòF—66òòÖW6ÖòFV×òâÖVÜ;7&–æòFÆòÆVÓæ6öÓÂöVÓâF—66òæòFÆò:’v–æ:|:6ò(	BfÇF$ÒâÖVÜ;7&–G&çV–ÆÆVÓæ6öÓÂöVÓâF—66òæòFÆò:’v&vÆòFR&Ö¦VæÖVçFòÂG&FFòVÒÄÆ–æ²FóÒ"ö&Æör÷VæFò×G&ö6"Ö†B×÷"×76B"6Æ74æÖSÒ'FW‡BÖ66VçB#çVæFòG&ö6"„B÷"54CÂôÆ–æ³âãÂ÷à¢Âö6–FSà ¢Æƒ#åVçFÖVÜ;7&–:’7Vf–6–VçFR†ö¦SÂöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsãBt#£Â÷7G&öæsâ–ç7Vf–6–VçFR&v–æF÷w26öÒæfVvF÷"ÖöFW&æòâVÇVW"W6òÌ:–ÒFRVÖ&G&fãÂöÆ“à¢ÆÆ“ãÇ7G&öæsã‚t#£Â÷7G&öæsâgVæ6–öæ&æfVv:|:6òÂ6÷FRFRW67&—L;7&–òRf–FVö6öæfW,:¦æ6–ÂFW6FRVRfö<:¢ì:6ò7V×VÆRFW¦Væ2FR&2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsãbt#£Â÷7G&öæsâ6öæf÷'L:fVÂ&W6òÖ—7FòÂ×V—F2&2ÂÆæ–Æ†2w&æFW2ÂVFœ:|:6òÆWfRR¦öv÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsã3"t"÷RÖ—3£Â÷7G&öæsâf¢F–fW&Vì:vVÒVFœ:|:6òFRl:ÖFVòÂÜ:V–æ2f—'GV—2Â4BRFW6VçföÇf–ÖVçFòW6FòãÂöÆ“à¢Â÷VÃà¢Çäì;¦ÖW&÷2Ö–÷&W2ì:6òFV—†ÒÜ:V–æÖ—2,:–F6RVÆçVæ66†VvW'FòFòÆ–Ö—FRGVÂâÖVÜ;7&–6ö'&æFò:’ÖVÜ;7&–&FãÂ÷à ¢Æƒ#äçFW2FR6ö×&#¢òVR&V6—6&FW#Âöƒ#à¢ÆöÃà¢ÆÆ“ãÇ7G&öæsåF—ó£Â÷7G&öæsâDE#2ÂDE#BRDE#Rì:6ò<:6ò–çFW&6Ö&œ:fV—2(	BæVÒf—6–6ÖVçFRâòF—ò&V6Ræò,;7&–òvW&Væ6–F÷"FRF&Vf2ÂVÒÆVÓäFW6V×Væ†ò(i"ÖVÜ;7&–ÂöVÓâãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäf÷&ÖFó£Â÷7G&öæsâFW6·F÷W6D”ÔÓ²æ÷FV&öö²W64òÔD”ÔÒÂÖVæ÷"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6Æ÷G2Æ—g&W3£Â÷7G&öæsâÖW6ÖFVÆÖ÷7G&%6Æ÷G2W6F÷3¢FR""â6VÒ6Æ÷BÆ—g&RÂWw&FR6–væ–f–67V'7F—GV—"òÜ;6GVÆòW†—7FVçFRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÆ–Ö—FRFÆ6£Â÷7G&öæsâ6FÖöFVÆò6V—FVÒÜ:†–Öò÷"6Æ÷BRæòF÷FÂâ6öç7VÇFRòÖçVÂFòf'&–6çFRVÆòÖöFVÆòW†FòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÖVÜ;7&–6öÆFF£Â÷7G&öæsâ×V—F÷2æ÷FV&öö·2f–æ÷2L:¦Ò'FR÷RFöFÖVÜ;7&–6öÆFF:Æ6âæW76W2ÂòWw&FRöFR6W"&6–Â÷R–×÷7<:×fVÂãÂöÆ“à¢ÂööÃà¢ÇåVæFò÷7<:×fVÂÂW6RFö—2Ü;6GVÆ÷2–wV—3¢Ö–÷&–F2Æ62G&&Æ†VÒÇ7G&öæsæGVÂ6†ææVÃÂ÷7G&öæsâRvæ†&æF6öÒò"âÜ;6GVÆ÷2F–fW&VçFW2æ÷&ÖÆÖVçFRgVæ6–öæÒÂÖ2Æ–æ†F÷2VÆfVÆö6–FFRFòÖ—2ÆVçFòãÂ÷à ¢Æƒ#äfÇFFRÖVÜ;7&–÷RFVfV—FòFRÖVÜ;7&–óÂöƒ#à¢Çå<:6ò6ö—62F–fW&VçFW2Rò6–çFöÖVævæâfÇFFRÖVÜ;7&–6W6ÆVçF–L:6ò&Wf—<:×fVÂ6ö"6&vâÇ7G&öæsäFVfV—FóÂ÷7G&öæsâFRÖVÜ;7&–6W6G&fÖVçF÷2ÆVL;7&–÷2Â6÷''W:|:6òFR'V—f÷2RFVÆ2§V—26VÒG,:6òFRW6òâ6Rò6WR66òFVÒFVÆ§VÂæòÖV–òÂòFW7FR6÷'&WFòfVÒçFW2F6ö×&¢ÄÆ–æ²FóÒ"ö&Æör÷FW7F"ÖÖVÖ÷&–×&ÒÖÖV×FW7Cƒb"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòFW7F"ÖVÜ;7&–$Ò6öÒÖV×FW7Cƒb³ÂôÆ–æ³âãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòòæ÷FV&öö²FVÒÖVÜ;7&–6öÆFFÂVæFòÜ:V–æì:6òÆ–vFWö—2FG&ö6ÂVæFòòv–æF÷w2&V6öæ†V6RÖVæ÷2ÖVÜ;7&–FòVRfö’–ç7FÆFÂ÷RVæFòfö<:¢&VfW&RVRÆw\:–Ò6öæf—&ÖR6ö×F–&–Æ–FFRçFW2F6ö×&(	BÜ;6GVÆòW'&Fò6÷7GVÖ7W7F"Ö—26&òVRÜ:6òFRö'&âòW66÷òFòWw&FRW7L:VÒÄÆ–æ²FóÒ"÷6W'f–6÷2÷Ww&FR×76B×&Ò"6Æ74æÖSÒ'FW‡BÖ66VçB#çWw&FRFR54BRÖVÜ;7&–ÂôÆ–æ³âÂRG&–vVÒvW&ÂFRÆVçF–L:6òVÒÄÆ–æ²FóÒ"ö&Æörö6ö×WFF÷"ÖÆVçFòÖ6W62×6öÇV6öW2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6ö×WFF÷"ÆVçFó¢6W62R6öÇ\:|;VW3ÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢òò)H)HôäD2(	B6L:–Æ—FW2Fò6ÇW7FW"'FVÆ§VÂ"à¢&6öF–v÷2ÖFRÖW'&ò×FVÆÖ§VÂ×v–æF÷w2#¢°¢F—FÆS¢$<;6F–v÷2FRW'&òFFVÆ§VÃ¢6öÖòÆW"RòVR6FVÒ–æF–6"À¢W†6W'C ¢$òVR6–væ–f–6ÒÔTÔõ%•ôÔätTÔTåBÂ•%ÅôäõEôÄU55ôõ%ôUTÂÂ5$•D”4Åõ$ô4U55ôD”TBR÷WG&÷2<;6F–v÷2(	BR6öÖòW<:ÖÆ÷2&6W&"FVfV—FòFRG&—fW"ÂÖVÜ;7&–÷RF—66òâ"À¢FFS¢###bÓ‚Ó#R"À¢&VEF–ÖS¢#2Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#äò<;6F–vòæFVÆ§VÂì:6ò:’FV6÷&:|:6òæVÒì;¦ÖW&òFR&÷Fö6öÆòâVÆR:’;¦æ–6—7FVRòv–æF÷w26öç6VwVRFV—†"çFW2FRFW6Æ–v"ÂRF—¢VÒVRöçFòFò6—7FVÖfÆ†6öçFV6WRâÆW"W76R<;6F–vò×VF–çfW7F–v:|:6òFR'f÷R&V–ç7FÆ"GVFò"&'f÷RFW7F"—7Fò&–ÖV—&ò"ãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çäæ÷FRòFW‡FòVÒÖœ;§67VÆ2‡÷"W†V×ÆòÂÆ6öFSäÔTÔõ%•ôÔätTÔTåCÂö6öFSâ’RÂVæFò&V6W"ÂòæöÖRFò'V—fò6—FFòÆövò&—†òâòFW‡Fò–æF–6ÆVÓæ6FVv÷&–ÂöVÓâFfÆ†²ò'V—fò–æF–6òÆVÓæ7VÇFò&÷l:fVÃÂöVÓââ<;6F–v÷2VR&WWFVÒ6V×&R–wV—2öçFÒ&VÖ6W6W7V<:Öf–6²<;6F–v÷2VR×VFÒ6FG&fÖVçFòöçFÒ&ÖVÜ;7&–ÂVæW&v–÷R7WW&VV6–ÖVçFòãÂ÷à ¢Æƒ#äöæFRVæ6öçG&"ò<;6F–vòFWö—2VRFVÆ6öÖSÂöƒ#à¢Çå6RÜ:V–æ&V–æ–6–,:–FòFVÖ—2&fö<:¢ÆW"Â÷2&Vv—7G&÷2f–6Ò6Çf÷2â'&òÇ7G&öæsåf—7VÆ—¦F÷"FRWfVçF÷3Â÷7G&öæsâ(i"ÆVÓäÆöw2Fòv–æF÷w2(i"6—7FVÖÂöVÓâR&ö7W&RWfVçF÷2FR÷&–vVÒÆVÓä'Vt6†V6³ÂöVÓâ6öÒì:×fVÂ7,:×F–6òÂæò†÷,:&–òFòG&fÖVçFòâFW67&œ:|:6òG&¢ò<;6F–vòR÷2,:&ÖWG&÷2ãÂ÷à¢Çä÷2FW7V¦÷2FRÖVÜ;7&–f–6ÒVÒÆ6öFSä3¥Åv–æF÷w5ÄÖ–æ–GV×Âö6öFSââ6F'V—fò6÷'&W7öæFRVÒG&fÖVçFòRwV&FòW7FFòFò6—7FVÖæò–ç7FçFRF&F(	B:’òVRVÒL:–6æ–6òW6&–FVçF–f–6"òG&—fW"&W7öç<:fVÂãÂ÷à¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"Ö&÷&FW"&rÖ×WFVBóCÓBæ÷B×&÷6R×’Ób#à¢Ç6Æ74æÖSÒ&ÒÓFW‡B×6Ò#ãÇ7G&öæsäçFW2FR–çfW7F–v#£Â÷7G&öæsâæ÷FRòVRW7Ff6öçFV6VæFòâG&f÷R¦övæFóòò6öæV7F"VÒF—7÷6—F—fóòò6—"F7W7Vç<:6óòò6öçFW‡FòfÆRFçFòVçFòò<;6F–vò(	BRWf—FFW7F":26Vv2ãÂ÷à¢Âö6–FSà ¢Æƒ#ä÷2<;6F–v÷2Ö—2g&WVVçFW2RòVR6FVÒ7VvW&SÂöƒ#à ¢Æƒ3äÔTÔõ%•ôÔätTÔTåCÂöƒ3à¢ÇäòvW&Væ6–F÷"FRÖVÜ;7&–Væ6öçG&÷RVÖ–æ6öç6—7L:¦æ6–âæ,:F–6Â6–væ–f–6ÖVÜ;7&–6öÒFVfV—FòÂÖVÜ;7&––ç7L:fVÂ÷"W&f–ÂFR÷fW&6Æö6²…„ÕôU…ò’÷RG&—fW"W67&WfVæFòöæFRì:6òFWf–â8’ò<;6F–vòVRÖ—2§W7F–f–6VÒFW7FRFVF–6FòFRÖVÜ;7&–çFW2FRVÇVW"÷WG&6ö—6ãÂ÷à ¢Æƒ3ä•%ÅôäõEôÄU55ôõ%ôUTÃÂöƒ3à¢ÇåVÒ6ö×öæVçFRVÒÖöFòì;¦6ÆVòFVçF÷R6W76"ÖVÜ;7&–VÒVÒì:×fVÂFR&–÷&–FFR–æFWf–Fòâ8’V6R6V×&RÇ7G&öæsæG&—fW#Â÷7G&öæsâ(	BFR&VFRÂl:ÖFVòÂ:VF–ò÷RFRÆwVÒW&–l:—&–6ò&V<:–ÒÖ–ç7FÆFòâVæFòòæöÖRFRVÒ'V—fòÆ6öFSâç7—3Âö6öFSâ&V6RæFVÆÂVÆR:’òöçFòFR'F–FãÂ÷à ¢Æƒ3åtUôdTÅEô”åôäôåtTEô$TÂöƒ3à¢Çäò6—7FVÖVF—RVÒFFòVRFWfW&–W7F"6V×&RF—7öì:×fVÂæÖVÜ;7&–Rì:6òVæ6öçG&÷RâF—f–FR×6RVçG&RÖVÜ;7&–FVfV—GV÷6RG&—fW"ÖÂ6ö×÷'FFòÂ6öÒW6òÖ–÷"&ÖVÜ;7&–VæFòö6÷'&RVÒÖöÖVçF÷2ÆVL;7&–÷2ãÂ÷à ¢Æƒ3ä5$•D”4Åõ$ô4U55ôD”TCÂöƒ3à¢ÇåVÒ&ö6W76òW76Væ6–ÂFòv–æF÷w2Væ6W'&÷Râ6÷7GVÖf—"FR'V—f÷2FR6—7FVÖ6÷'&ö×–F÷2ÂGVÆ—¦:|:6ò–çFW'&ö×–F÷RF—66ò6öÒ6WF÷&W2FVfV—GV÷6÷2âV’fW&–f–6:|:6òFR–çFVw&–FFRFò6—7FVÖR6;¦FRFòF—66òl:¦ÒçFW2FR7W7V—F"FR†&Gv&Ræö'&RãÂ÷à ¢Æƒ3äE5õtD4„Dôuõd”ôÄD”ôãÂöƒ3à¢ÇåVÒG&—fW"FVÖ÷&÷RFVÖ—2&FWföÇfW"ò6öçG&öÆRâ&V6R6öÒg&W\:¦æ6–VÒÜ:V–æ26öÒG&—fW"FR6öçG&öÆF÷&FRF—66òçF–vò†òvVì:—&–6òæòÇVv"Fò6÷'&WFò’÷Rf—&×v&RFR54BFW6GVÆ—¦FòãÂ÷à ¢Æƒ3å5•5DTÕõ4U%d”4UôU„4UD”ôâR´ÔôDUôU„4UD”ôåôäõEô„äDÄTCÂöƒ3à¢ÇäW†6\:|:6òì:6òG&FFVÒ<;6F–vòFòì;¦6ÆVòâ6FVv÷&–×Æ¢G&—fW"ÂçF—l:×'W2FRFW&6V—&÷26öÒf–ÇG&òFR6—7FVÖRÂ6öÒÖVæ÷2g&W\:¦æ6–ÂÖVÜ;7&–âò'V—fò6—FFòæFVÆ:’òVRW7G&V—F'W66ãÂ÷à ¢Æƒ3ä”ä44U54”$ÄUô$ôõEôDUd”4SÂöƒ3à¢Çäòv–æF÷w2ì:6ò6öç6VwV—R6W76"òF—66òFR–æ–6–Æ—¦:|:6òâ&V6R;726ÆöævVÒÂG&ö6FRÖöFòF6öçG&öÆF÷&æò6WGW÷RGVÆ—¦:|:6ò–çFW'&ö×–Fâ6RÜ:V–æ6WVW"6†Vvòv–æF÷w2Âò6Ö–æ†ò:’÷WG&ó¢ÄÆ–æ²FóÒ"ö&ÆöröW'&òÖæòÖ&ö÷F&ÆRÖFWf–6RÖ6öÖò×&W6öÇfW""6Æ74æÖSÒ'FW‡BÖ66VçB#æW'&ò$æò&ö÷F&ÆRFWf–6R#ÂôÆ–æ³âãÂ÷à ¢Æƒ3åt„TõTä4õ%$T5D$ÄUôU%$õ#Âöƒ3à¢ÇäW'&òFR†&Gv&R&VÆFFòVÆò,;7&–ò&ö6W76F÷"â8’ò<;6F–vòÖ—2&l:×6–6ò"FÆ—7F¢–ç7F&–Æ–FFRFRVæW&v–Â7WW&VV6–ÖVçFòÂ÷fW&6Æö6²÷RfÆ†FR6ö×öæVçFRâ6R6ö×æ†FW6Æ–vÖVçF÷2R&'VÆ†òFR6ööÆW"ÂG&FRFV×W&GW&çFW2FRGVFòãÂ÷à ¢Æƒ#ä6öÖòW6"ò<;6F–vòæ,:F–6Âöƒ#à¢ÆöÃà¢ÆÆ“ãÇ7G&öæså&Vv—7G&RòG,:6ó£Â÷7G&öæsâG,:§2G&fÖVçF÷26öÒòÖW6Öò<;6F–vòöçFÒ6W6;¦æ–6²G,:§2<;6F–v÷2F–fW&VçFW2öçFÒ6W66ö×VÒFR&—†òì:×fVÂ†ÖVÜ;7&–ÂföçFRÂFV×W&GW&’ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFW6f:v;¦ÇF–Ö×VFì:v£Â÷7G&öæsâG&—fW"GVÆ—¦FòÂW&–l:—&–6òæ÷fòÂ&öw&Ö6öÒf–ÇG&òFR6—7FVÖâ÷&FVÒ7&öæöÌ;6v–6&W6öÇfR&ö'FRF÷266÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåFW7FRÖVÜ;7&–Â÷7G&öæsâVæFòò<;6F–vòf÷"FRÖVÜ;7&–÷RVæFò÷2<;6F–v÷2f&–&VÒ(	B&ö6VF–ÖVçFòVÒÄÆ–æ²FóÒ"ö&Æör÷FW7F"ÖÖVÖ÷&–×&ÒÖÖV×FW7Cƒb"6Æ74æÖSÒ'FW‡BÖ66VçB#çFW7F"$Ò6öÒÖV×FW7Cƒb³ÂôÆ–æ³âãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåfW&–f—VR6;¦FRFòF—66óÂ÷7G&öæsâVæFò†÷WfW"6÷''W:|:6òFR'V—f÷2ÂG&fÖVçFòò'&—"&öw&Ö2÷RÆ6öFSä5$•D”4Åõ$ô4U55ôD”TCÂö6öFSâãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåföÇFRòwV–vW&ÃÂ÷7G&öæsâ&6W\:¦æ6–6ö×ÆWFFRVÆ–Ö–æ:|:6ó¢ÄÆ–æ²FóÒ"ö&Æörö6öÖò×&W6öÇfW"×FVÆÖ§VÂ×v–æF÷w2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖò&W6öÇfW"FVÆ§VÂFòv–æF÷w3ÂôÆ–æ³âãÂöÆ“à¢ÂööÃà ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢ÇåVæFò÷2G&fÖVçF÷2–×VFVÒòW6òæ÷&ÖÂÂVæFòòv–æF÷w2ì:6ò6ö×ÆWF–æ–6–Æ—¦:|:6ò&fö<:¢–çfW7F–v"ÂVæFòŒ:7W7V—FFRF—66òVÒfÆ††ò&—66òFRW&FW"FF÷27&W66R6FFVçFF—f’÷RVæFòfö<:¢&VfW&RVRÆw\:–ÒÆV–÷2FW7V¦÷2FRÖVÜ;7&–VÒfW¢FRG&ö6"\:v2÷"FVçFF—fâòW66÷òFRfW&–f–6:|:6òW7L:VÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢'FW7F"ÖÖVÖ÷&–×&ÒÖÖV×FW7Cƒb#¢°¢F—FÆS¢$6öÖòFW7F"ÖVÜ;7&–$Ò6öÒÖV×FW7Cƒb²‡76ò76ò’"À¢W†6W'C ¢%VæFòFW7F"ÖVÜ;7&–Â6öÖò7&–"Ü:ÖF–FR–æ–6–Æ—¦:|:6òR6öÖò—6öÆ"Ü;6GVÆòÂ6Æ÷BR6öæf–wW&:|:6ò6VÒG&ö6"\:v2÷"FVçFF—fâ"À¢FFS¢###bÓ‚Ó#R"À¢&VEF–ÖS¢#2Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#äÖVÜ;7&–6öÒFVfV—Fò:’VÖF26W62Ö—2g'W7G&çFW2FR–ç7F&–Æ–FFS¢ò6ö×WFF÷"gVæ6–öæ&VÒ÷"†÷&2RFWö—2G&fÂ6÷'&ö×RVÒ'V—fò÷RÖ÷7G&VÖFVÆ§VÂF–fW&VçFRFçFW&–÷"âFW7F"ÖVÜ;7&–7W7FFV×òRì:6ò7W7F\:v(	B÷"—76òfVÒçFW2FR6ö×&"VÇVW"6ö—6ãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢ÇäW†V7WFRòÇ7G&öæsäÖV×FW7Cƒb³Â÷7G&öæsâ÷"VÖ6W\:¦æ6–6ö×ÆWFÂ&Vv—7G&Rò&W7VÇFFòRÂ6R&V6W"VÇVW"W'&òÂ&W—FVÒ6öæf–wW&:|:6òG,:6ò&—6öÆ"Ü;6GVÆòÂ6Æ÷BRW&f–ÂFRÖVÜ;7&–âVÒW'&òì:6òFWfR6W"–væ÷&FòÂÖ2FÖ,:–Òì:6ò&÷f6÷¦–æ†òVRòÜ;6GVÆòW7L:FVfV—GV÷6ó¢òFW7FRVçföÇfR&ö6W76F÷"Â66†W2Â6öçG&öÆF÷&RÆ6ÖÜ:6Râ¦W&òW'&÷2:’VÒ&W7VÇFFòff÷,:fVÂæ26öæFœ:|;VW2FW7FF2Âì:6òVÖv&çF–6öçG&fÆ†2–çFW&Ö—FVçFW2ãÂ÷à ¢Æƒ#åVæFòfÆRFW7F#Âöƒ#à¢ÇVÃà¢ÆÆ“åFVÆ2§V—26öÒ<;6F–v÷2VR×VFÒ6FG&fÖVçFòãÂöÆ“à¢ÆÆ“ãÆ6öFSäÔTÔõ%•ôÔätTÔTåCÂö6öFSâ÷RÆ6öFSåtUôdTÅEô”åôäôåtTEô$TÂö6öFSâ&V6÷'&VçFW2ãÂöÆ“à¢ÆÆ“ä'V—f÷2VR6÷'&ö×VÒ6÷¦–æ†÷2Â–ç7FÆF÷&W2VRfÆ†ÒVÒöçF÷2F–fW&VçFW2ãÂöÆ“à¢ÆÆ“åG&fÖVçF÷2ÆVL;7&–÷26VÒ&VÆ:|:6ò6öÒò&öw&ÖVÒW6òãÂöÆ“à¢ÆÆ“äFWö—2FR–ç7FÆ"ÖVÜ;7&–æ÷f÷RF—f"W&f–Â„ÕôU…òæò6WGWãÂöÆ“à¢Â÷VÃà¢ÇäÆVçF–L:6ò6öç7FçFR6ö"6&vÂ6VÒG&fÖVçF÷2÷R6÷''W:|:6òÂ6÷7GVÖöçF"&–ÖV—&ò&66–FFR–ç7Vf–6–VçFRÂ&Ö¦VæÖVçFò÷R÷WG&òv&vÆòâò7&—L:—&–òW7L:VÒÄÆ–æ²FóÒ"ö&ÆöröÖVÖ÷&–×&ÒÖ–ç7Vf–6–VçFR×6–çFöÖ2"6Æ74æÖSÒ'FW‡BÖ66VçB#æÖVÜ;7&–$Ò–ç7Vf–6–VçFS¢6–çFöÖ3ÂôÆ–æ³ââ–æF76–ÒÂ6–çFöÖ2ì:6òfV6†ÒF–vì;77F–6ó¢FW7FRVæFò†÷WfW"–ç7F&–Æ–FFR÷R×VFì:v&V6VçFRæÖVÜ;7&–ãÂ÷à ¢Æƒ#å÷"VRFW7F"f÷&Fòv–æF÷w3Âöƒ#à¢ÇäfW'&ÖVçF2FVçG&òFò6—7FVÖì:6ò6öç6VwVVÒö7W"2&Vvœ;VW2VRò,;7&–ò6—7FVÖR6WW2&öw&Ö2W7L:6òW6æFòâòÖV×FW7Cƒb²:’–æFWVæFVçFRFòv–æF÷w2R–æ–6–÷"$”õ2÷RTTd’ÂòVRW&Ö—FRÆ–6"G,;VW2FRW67&—FRÆV—GW&VÖ&6VÆ×V—FòÖ–÷"FÖVÜ;7&–âòæöÖRFW7FRwV–6R&VfW&RòÇ7G&öæsäÖV×FW7Cƒb³Â÷7G&öæsâÂ&ö¦WFòw&GV—FòRFR<;6F–vò&W'Fó²VÆRì:6ò:’òÖW6Öò&öGWFòVRòÖVÕFW7CƒbÖçF–FòVÆ74Ö&²ãÂ÷à ¢Æƒ#äçFW2FR6öÖ\:v#¢&W6W'fRFF÷2R7&–RVÖÆ–æ†FR&6SÂöƒ#à¢ÆöÃà¢ÆÆ“ãÇ7G&öæsä6÷–R'V—f÷2–ç7V'7F—G\:×fV—2ãÂ÷7G&öæsâÖVÜ;7&––ç7L:fVÂöFR6÷'&ö×W"FF÷2GW&çFRòW6òæ÷&ÖÃ²òFW7FRì:6ò&W&'V—f÷2¬:fWFF÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäf÷Föw&fR26öæf–wW&:|;VW2Fòf—&×v&RãÂ÷7G&öæsâ&Vv—7G&Rg&W\:¦æ6–ÂFVç<:6òRW&f–ÂF—fòçFW2FRÇFW&"VÇVW"÷:|:6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFW6F—fRFV×÷&&–ÖVçFR„ÕÂU…òR÷fW&6Æö6²ãÂ÷7G&öæsâò&–ÖV—&ò&W7VÇFFòFWfR6W"ö'F–Fòæ26öæf–wW&:|;VW2G,:6òâFWö—2ÂòW&f–ÂöFR6W"FW7FFò6W&FÖVçFRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåW6RÆ–ÖVçF:|:6òW7L:fVÂãÂ÷7G&öæsâì:6òf:vVÒFW7FR&öÆöævFòGW&çFRFV×W7FFR÷RVÒWV—ÖVçFò6öÒ6†V—&òFRVV–ÖFòÂ7WW&VV6–ÖVçFò6WfW&ò÷RFW6Æ–vÖVçF÷2''WF÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä–FVçF–f—VRÜ;6GVÆ÷2R6Æ÷G2ãÂ÷7G&öæsâW6R,;7GVÆ÷26öÖòÂ"Â#R#"6öæf÷&ÖRòÖçVÂFÆ6²—76òWf—F6ö×&"&W7VÇFF÷2FR6öÖ&–æ:|;VW2FW66öæ†V6–F2ãÂöÆ“à¢ÂööÃà ¢Æƒ#å76ò76óÂöƒ#à¢ÆöÃà¢ÆÆ“ãÇ7G&öæsä&—†R–ÖvVÒöf–6–ÃÂ÷7G&öæsâFòÖV×FW7Cƒb²æò6—FRFò&ö¦WFòÂVÒVÒ6ö×WFF÷"VRgVæ6–öæRâ&Vf—&fW'<:6ò&TTd’6RÜ:V–æ:’GVÂãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäw&fRVÒVÒVæG&—fSÂ÷7G&öæsâ6öÒVÖfW'&ÖVçFFRw&f:|:6òFR–ÖvVÒâò&ö6W76òvòVæG&—fR(	BW6RVÒf¦–òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä–æ–6–RVÆòVæG&—fS£Â÷7G&öæsâÆ–wVRÜ:V–æ&W76–öææFòFV6ÆFRÖVçRFR–æ–6–Æ—¦:|:6ò†æ÷&ÖÆÖVçFRc"ÂcÂc’÷RW62Â6öæf÷&ÖRòf'&–6çFR’RW66öÆ†òF—7÷6—F—fòU4"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6ö×ÆWFR6W\:¦æ6–ãÂ÷7G&öæsâVÖ76vVÒFW&Ö–æVæ2FWö—2VRFöF÷2÷2FW7FW26VÆV6–öæF÷2f÷&ÒW†V7WFF÷2âòFV×òf&–×V—Fò6öÒ&ö6W76F÷"ÂfVÆö6–FFRR66–FFR–ç7FÆFãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&Vv—7G&RçFW2FR×VF"ãÂ÷7G&öæsâf÷Föw&fRFVÆÂfW'<:6òÂ76vVÒÂVæFW&\:vòÂFW7FRÂÜ;6GVÆòÂ6Æ÷BÂg&W\:¦æ6–RW&f–ÂâVÒ&W7VÇFFò6VÒ6öçFW‡Fò:’F–l:Ö6–ÂFR&W&öGW¦—"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6R†÷WfW"W'&òÂföÇFRòG,:6òãÂ÷7G&öæsâ6'&VwVR26öæf–wW&:|;VW2G,:6òFòf—&×v&RÂÖçFVæ†„Õ÷RU…òFW6Æ–vFòR&W—Fâ6RòW'&òFW6&V6W"6öÖVçFR76–ÒÂ–çfW7F–wVRW7F&–Æ–FFRR6ö×F–&–Æ–FFRF6öæf–wW&:|:6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä—6öÆRVÒÜ;6GVÆò÷"fW¢ãÂ÷7G&öæsâFW6Æ–wVRò6ö×WFF÷"Â&WF—&Rò6&òFRVæW&v–RwV&FRçFW2FRÖ÷fW"\:v2âFW7FR6FÜ;6GVÆò6W&FÖVçFRæòÖW6Öò6Æ÷BFR&VfW,:¦æ6–ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäf:vòFW7FR7'W¦FòFR6Æ÷BãÂ÷7G&öæsâFWö—2ÂW6RVÒÜ;6GVÆòVR76÷RR6ö×&R÷26Æ÷G2&V6öÖVæFF÷2VÆòÖçVÂâÖçFVæ†FöF22÷WG&26öæFœ:|;VW2–wV—2ãÂöÆ“à¢ÂööÃà¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"ÖFW7G'V7F—fRóC&rÖFW7G'V7F—fRóRÓBæ÷B×&÷6R×’Ób#à¢Ç6Æ74æÖSÒ&ÒÓFW‡B×6Ò#ãÇ7G&öæså6VwW&ì:v£Â÷7G&öæsâÖæ—VÆRÜ;6GVÆ÷26öÒò6ö×WFF÷"FW6Æ–vFòÂ6&ò&VÖ÷f–FòRVæW&v–&W6–GVÂFW66'&VvFÂ6VwW&æFòVÆ2&÷&F2âì:6òf÷&6RG&f2Âì:6òF÷VRæ÷26öçFF÷2Rì:6ò'&WV—ÖVçFòÆ7&Fò÷RVÒv&çF–6VÒ6öæf—&Ö"26öæFœ:|;VW2Fòf'&–6çFRâÖVÜ;7&–6öÆFFVÒæ÷FV&öö²ì:6òFWfR6W"—6öÆF÷"FW6ÖöçFvVÒFöÜ:—7F–6ãÂ÷à¢Âö6–FSà ¢Æƒ#åVçF276vVç2<:6ò7Vf–6–VçFW3óÂöƒ#à¢ÇåVÖ6W\:¦æ6–6ö×ÆWF:’VÖG&–vVÒ–æ–6–Â;§F–Â&W'&÷26öç6—7FVçFW2âVæFòfÆ†:’&&Â&V6RFWö—2FRVV6W"÷RFWVæFRFRVÖ6&vW7V<:Öf–6Â&öÆöæwVRòFW7FRR&W—FFWö—2FR6F×VFì:v6öçG&öÆFâò7&—L:—&–òÖ—2–×÷'FçFRì:6ò:’(	Ç76"æö—F^(	ÒÂR6–Ò6&W"W†FÖVçFRÇ7G&öæsçVÂÜ;6GVÆòÂ6Æ÷BÂg&W\:¦æ6–RW&f–ÃÂ÷7G&öæsâW7FfÒVÒW6òãÂ÷à¢Çä–çFW'&ö×&&Vv—7G&"ò6Vì:&–òVæFò7W&v—&VÒW'&÷2çVÖW&÷6÷2R&WWL:×fV—3²6öçF–çV"÷"†÷&2ì:6ò–FVçF–f–6ÖVÆ†÷"\:vâ6Rò&W7VÇFFòf–W"6VÒW'&÷2ÂÖ2ò6–çFöÖ&VÂ6öçF–çV"Â&W&öGW¦òW6òVR6W6fÆ†R×Æ–R–çfW7F–v:|:6òâæVæ‡VÖVçF–FFRf—†FR76vVç2G&ç6f÷&ÖVÒFW7FR6–çL:—F–6òVÒv&çF–'6öÇWFãÂ÷à ¢Æƒ#ä6öÖò–çFW'&WF"ò&W7VÇFFóÂöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæså¦W&òW'&òÂÖ2G&fÖVçF÷26öçF–çVÓ£Â÷7G&öæsâÖçFVæ†$Ò6öÖò†—;7FW6Rì:6ò6öæf—&ÖFâföÇFR:ÆV—GW&F÷2ÄÆ–æ²FóÒ"ö&Æörö6öF–v÷2ÖFRÖW'&ò×FVÆÖ§VÂ×v–æF÷w2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ<;6F–v÷2FRW'&òFFVÆ§VÃÂôÆ–æ³âR6÷'&VÆ6–öæRG&—fW"Â&Ö¦VæÖVçFòÂföçFRRFV×W&GW&ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåVÒÜ;6GVÆòfÆ†VÒ6Æ÷G2F–fW&VçFW3£Â÷7G&öæsâ7W7V—F6R6öæ6VçG&æòÜ;6GVÆòÂFW6FRVRg&W\:¦æ6–RFVÖ—26öæFœ:|;VW2FVæ†Ò6–FòÖçF–F2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÜ;6GVÆ÷2F–fW&VçFW2fÆ†ÒæòÖW6Öò6Æ÷C£Â÷7G&öæsâ–çfW7F–wVR6Æ÷BÂ6öçFFòÂÆ6ÖÜ:6RÂVæ6—†RFò&ö6W76F÷"R6öçG&öÆF÷&FRÖVÜ;7&–ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåFöF÷276Ò6÷¦–æ†÷2RfÆ†Ò§VçF÷3£Â÷7G&öæsâ6öæf—&÷26Æ÷G2–æF–6F÷2æòÖçVÂÂ6öÖ&–æ:|:6ò7W÷'FFÂg&W\:¦æ6–RòW&f–Â„Õ÷RU…òãÂöÆ“à¢ÆÆ“ãÇ7G&öæså<;2fÆ†6öÒ„Õ÷RU…ó£Â÷7G&öæsâŒ:–ç7F&–Æ–FFRæVVÆ6öæf–wW&:|:6ó²—76òì:6ò6ö×&÷f—6öÆFÖVçFRFVfV—Fòl:×6–6òF$ÒãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäW'&÷27W&vVÒVæ2FWö—2FRVV6W#£Â÷7G&öæsâ&Vv—7G&RFV×W&GW&RFV×òL:’fÆ†âì:6òW6Rv&–æWFR&W'Fò6öÖòfW&VF—FòÂö—2—76ò×VF26öæFœ:|;VW2FòFW7FR6VÒÆö6Æ—¦"6W6ãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&RRì:6ò6öçF–çVRÇFW&ææFò\:v26R†÷WfW"6†V—&òFRVV–ÖFòÂVV6–ÖVçFòæ÷&ÖÂÂÌ:×V–FòÂ6–æ—2FR÷†–F:|:6òÂG&f2VV'&F2ÂÖVÜ;7&–6öÆFF÷RWV—ÖVçFòVÒv&çF–â&RFÖ,:–ÒVæFòì:6ò6öç6VwV—"&W&öGW¦—"òFW7FRÖçFVæFòVÖf&œ:fVÂ÷"fW£¢G&ö6"Ü;6GVÆòÂ6Æ÷BÂW&f–ÂRf—&×v&RòÖW6ÖòFV×òvWf–L:¦æ6–RG&ç6f÷&ÖF–vì;77F–6òVÒFVçFF—fãÂ÷à ¢ÄVF—F÷&–Å&VfW&Væ6W26ÇVsÒ'FW7F"ÖÖVÖ÷&–×&ÒÖÖV×FW7Cƒb"óà ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢ÇåVæFòÜ:V–æì:6ò–æ–6–VÆòVæG&—fRÂVæFòfö<:¢ì:6òFVÒÜ;6GVÆò&W6W'f&6ö×&"ÂVæFòòæ÷FV&öö²FVÒÖVÜ;7&–6öÆFF÷RVæFòòW'&òW'6—7FRFWö—2FG&ö6(	BæW76RöçFò7W7V—F76&Æ6ÖÜ:6RRòFW7FR6÷'&WFò:’FR&æ6FâG&ö6FRÜ;6GVÆ÷26öÒfW&–f–6:|:6òFR6ö×F–&–Æ–FFRW7L:VÒÄÆ–æ²FóÒ"÷6W'f–6÷2÷Ww&FR×76B×&Ò"6Æ74æÖSÒ'FW‡BÖ66VçB#çWw&FRFR54BRÖVÜ;7&–ÂôÆ–æ³ã²G&–vVÒ6ö×ÆWFÂVÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢òò)H)HöæFB(	B6L:–Æ—FW2F÷26ÇW7FW'2%2ì:6òÆ–v"R&Æ–vRFW6Æ–v6÷¦–æ†ò"à¢&&÷Fò×÷vW"ÖæòÖgVæ6–öæÖ§V××7F'B×Æ6ÖÖR#¢°¢F—FÆS¢$&÷L:6ò÷vW"ì:6ògVæ6–öæ¢6öÖòÆ–v"ò2VÆò6öæV7F÷"FÆ6ÖÜ:6R"À¢W†6W'C ¢$6öÖò6W&"FVfV—FòFò&÷L:6òg&öçFÂFRfÆ†FRföçFR÷RÆ6ÂR6öÖò6–öæ"'F–FVÆò6öæV7F÷"Fò–æVÂg&öçFÂ&6öæf—&Ö"òF–vì;77F–6òâ"À¢FFS¢###bÓ‚Ó#b"À¢&VEF–ÖS¢#’Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#åfö<:¢W'Fò&÷L:6òRæF6öçFV6S¢6VÒÇW¢Â6VÒfVçFö–æ†Â6VÒ6–æÂæòÖöæ—F÷"âçFW2FR6öæ6ÇV—"VRÆ6ÖÜ:6RÖ÷'&WRÂfÆR6&W"VRò&÷L:6òg&öçFÂ:’VÖF2\:v2Ö—26–×ÆW2RÖ—2g,:vV—2Fòv&–æWFR(	BRVRW†—7FRVÒFW7FRF—&WFò&F—,:ÖÆòFWV:|:6òãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çäò&÷L:6òg&öçFÂVæ2fV6†VÒ6öçFFòVçG&RFö—2–æ÷2FÆ6ÖÜ:6Râ6RÂ6öÒföçFRÆ–vFRò6ö×WFF÷"VÒ&W÷W6òÂfö<:¢Fö6"&–FÖVçFRW76W2Fö—2–æ÷26öÒVÖ6†fRFRfVæFRÜ:V–æ'F—"ÂòFVfV—FòW7L:æò&÷L:6ò÷Ræò6&òFVÆR(	Bì:6òæÆ6æVÒæföçFRãÂ÷à ¢Æƒ#äòVR:’ò6öæV7F÷"Fò–æVÂg&öçFÃÂöƒ#à¢Çäò&Æö6òFR–æ÷2öæFRòv&–æWFR6R6öæV7F6†Ö×6R–æVÂg&öçFÂ†–×&W76òæÆ66öÖòÆ6öFSäeõäTÃÂö6öFSâÂÆ6öFSä¤eÂö6öFSâÂÆ6öFSåäTÃÂö6öFSâ÷RæöÖRWV—fÆVçFR’âFVÆR6VÒVG&ògVì:|;VW3¢Æ–v"Â&V–æ–6–"ÂÄTBFRVæW&v–RÄTBFRF—f–FFRFòF—66òâò"FRÆ–v"6÷7GVÖf—"–FVçF–f–6Fò6öÖòÆ6öFSåu%õ5sÂö6öFSâÂÆ6öFSåu$%DãÂö6öFSâ÷RÆ6öFSåõtU"5sÂö6öFSâãÂ÷à¢ÇäW76R"ì:6òFVÒöÆ&–FFRRì:6ò6'&Vv6÷'&VçFRFRG&&Æ†òâVÆR<;26–æÆ—¦ò6—&7V—FòFRvW&Væ6–ÖVçFòFRVæW&v–VR†÷WfRVÒVF–FòFR'F–F(	B÷"—76òVÒ6–×ÆW2Væ6÷7FòÖWL:Æ–6òVçG&R÷2Fö—2–æ÷2f¢òÖW6ÖòVÂFò&÷L:6òãÂ÷à ¢Æƒ#å÷"VRò&÷L:6òfÆ†Âöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsäFW6v7FRÖV<:&æ–6ó£Â÷7G&öæsâò6öçFFò–çFW&æò÷†–F÷RW&FR&W7<:6òFWö—2FRÖ–Æ†&W2FR6–öæÖVçF÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä&÷L:6ò&W6ó£Â÷7G&öæsâ†7FRV×W'&FÖçL:–Òò6öçFFòfV6†FòÂòVR–×VFR'F–F÷RFW6Æ–vÜ:V–æVÒFö—26VwVæF÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6&ò&ö×–Fó£Â÷7G&öæsâf–÷2f–æ÷2VR76Ò÷"Fö'&2Fòv&–æWFRVV'&Ò÷"fF–vÂ6ö'&WGVFòFWö—2FRÖçWFVì:|:6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6öæV7F÷"æò–æòW'&Fó£Â÷7G&öæsâ×V—Fò6ö×VÒ;72Æ–×W¦(	BòÇVwVRföÇFFW6Æö6FòVÖ÷6œ:|:6òæò&Æö6òãÂöÆ“à¢Â÷VÃà ¢Æƒ#äöæFR—76ò&V6SÂöƒ#à¢ÇäVÒFW6·F÷2:’VÒFVfV—Fòg&WVVçFRR&&FòâVÒæ÷FV&öö·2RÆÂÖ–âÖöæRò&÷L:6òf¢'FRFRVÖÆ6W†–Æ–"6öÒ6&òfÆBÂRòFW7FR÷"Væ6÷7Fòì:6ò6RÆ–6¢æW76W266÷2fW&–f–6:|:6ò:’FR&æ6Fâ6Rò6WR66ò:’æ÷FV&öö²Âò&÷FV—&ò6÷'&WFòW7L:VÒÄÆ–æ²FóÒ"ö&Æöröæ÷FV&öö²ÖæòÖÆ–vÖò×VRÖf¦W""6Æ74æÖSÒ'FW‡BÖ66VçB#ææ÷FV&öö²ì:6òÆ–v¢òVRf¦W#ÂôÆ–æ³âãÂ÷à ¢Æƒ#äòVRf¦W"çFW2FR'&—"òv&–æWFSÂöƒ#à¢ÆöÃà¢ÆÆ“ãÇ7G&öæsä6öæf—&ÖRVæW&v–£Â÷7G&öæsâFöÖFÂ6&òÂ6†fRG&6V—&FföçFRæ÷6œ:|:6ò’RÂ6R†÷WfW"Âòf–ÇG&òFRÆ–æ†Æ–vFòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFW66'&VwVRò6—&7V—Fó£Â÷7G&öæsâFW6Æ–wVR6†fRFföçFRÂ6VwW&Rò&÷L:6òFRÆ–v"÷"FW¢6VwVæF÷2RÆ–wVR6†fRFRæ÷fòâ—76ò&W6öÇfRG&f2FR&÷F\:|:6ò6öÒg&W\:¦æ6–7W'&VVæFVçFRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäö'6W'fRVÇVW"6–æÂFRf–F£Â÷7G&öæsâÄTBFÆ66W6òÂfVçFö–æ†v—&æFòÖV–ò6VwVæFòÂ&—Râ6–æÂ&6–Â×VFòF–vì;77F–6òRöçF&föçFR÷RÆ6Âì:6ò&ò&÷L:6òãÂöÆ“à¢ÂööÃà ¢Æƒ#ä6öÖòf¦W"'F–FVÆò6öæV7F÷#Âöƒ#à¢ÇåG&&Æ†R6öÒÜ:V–æFW6Æ–vFæ6†fRFföçFRRò6&òFRVæW&v–&VÖ÷f–FòL:’òÖöÖVçFò–æF–6FòãÂ÷à¢ÆöÃà¢ÆÆ“ãÇ7G&öæsä'&ÆFW&ÃÂ÷7G&öæsâRÆö6Æ—¦Rò&Æö6òFò–æVÂg&öçFÂÂæ÷&ÖÆÖVçFRæ&÷&F–æfW&–÷"FÆ6ÂW'FòF2÷'F24DãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä–FVçF–f—VRò"FRÆ–v#Â÷7G&öæsâVÆ6W&–w&f–FÆ6÷RVÆòÖçVÂFòÖöFVÆòâçVæ66‡WFS¢Væ6÷7F"æò"W'&FòöFR6–öæ"ò&W6WB÷RFö6"VÒVÖÆ–ÖVçF:|:6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&WF—&RòÇVwVRFò&÷L:6óÂ÷7G&öæsâFW76R"&—6öÆ"òv&–æWFRFòFW7FRãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&V6öæV7FRVæW&v–Â÷7G&öæsâRÆ–wVR6†fRG&6V—&FföçFRâÆ6VçG&VÒ&W÷W6ò(	B×V—F26VæFVÒVÒÄTB–æF–6æFòVæW&v–FRW7W&ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåF÷VR÷2Fö—2–æ÷3Â÷7G&öæsâ6öÒöçFFRVÖ6†fRFRfVæF÷"ÖVæ÷2FRVÒ6VwVæFòRf7FRâ6RÜ:V–æ'F—"Âò&ö&ÆVÖ:’ò&÷L:6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&W—F6öÒò&÷L:6ò&V6öæV7FFòãÂ÷7G&öæsâ6R6VÒò&÷L:6òÆ–vR6öÒò&÷L:6òì:6òÆ–vÂòfW&VF—FòW7L:fV6†FòãÂöÆ“à¢ÂööÃà¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"ÖFW7G'V7F—fRóC&rÖFW7G'V7F—fRóRÓBæ÷B×&÷6R×’Ób#à¢Ç6Æ74æÖSÒ&ÒÓFW‡B×6Ò#ãÇ7G&öæså6VwW&ì:v£Â÷7G&öæsâçVæ6'&föçFRFRÆ–ÖVçF:|:6ò(	BVÆ&WL:–Ò6&vÖW6ÖòFW66öæV7FFâæòFW7FR6–ÖÂF÷VRVæ2÷2Fö—2–æ÷2Fò"FRÆ–v"ÂW6RVÖ6†fR6öÒ6&ò—6öÆFòRWf—FRVæ6÷7F"VÒ÷WG&2G&–Æ†2â6RÜ:V–æW7L:æv&çF–Â'&—"òv&–æWFRöFRçVÌ:ÖÆãÂ÷à¢Âö6–FSà ¢Æƒ#åF&VÆF–vì;77F–6¢òVR6F&W7÷7F6–væ–f–6Âöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#à¢ÇFƒå&W7÷7FòW'F"ò&÷L:6óÂ÷Fƒà¢ÇFƒä6W6&÷l:fVÃÂ÷Fƒà¢ÇFƒäòVRfW&–f–6#Â÷Fƒà¢Â÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCäæF6öçFV6RÂæVÒÄTBFRW7W&æÆ6Â÷FCãÇFCäfÇFFRVæW&v–÷RföçFR–æF—fÂ÷FCãÇFCä6†fRG&6V—&Â6&òÂFöÖFRFW7FRFföçFSÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäÄTBFRW7W&6W6òÂÖ2æFòW'F#Â÷FCãÇFCä&÷L:6òg&öçFÂÂ6&ò÷R6öæV7F÷"FW6Æö6FóÂ÷FCãÇFCå'F–FF—&WFVÆò"FRÆ–v#Â÷FCãÂ÷G#à¢ÇG#ãÇFCäÆ–vVÆò6öæV7F÷"Rì:6òÆ–vVÆò&÷L:6óÂ÷FCãÇFCä6†fRFR'F–F6öÒFVfV—FóÂ÷FCãÇFCåG&ö6Fò&÷L:6ò÷RW6ò&÷f—<;7&–òFò"FR&V–æ–6–#Â÷FCãÂ÷G#à¢ÇG#ãÇFCäÆ–vRFW6Æ–vVÒVÒ÷RFö—26VwVæF÷3Â÷FCãÇFCä&÷L:6ò&W6òÂ7W'Fò÷R&÷F\:|:6òFföçFSÂ÷FCãÇFCä†7FRFò&÷L:6òRFW7FRFR&æ6FÜ:Öæ–ÖÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäì:6òÆ–væVÒVÆò6öæV7F÷#Â÷FCãÇFCäföçFR÷RÆ6Â÷FCãÇFCå6W\:¦æ6–föçFR(i"Æ6ÂæW76÷&FVÓÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#ä6öÖò&W6öÇfW"FWö—2FòF–vì;77F–6óÂöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsä&÷L:6òFVfV—GV÷6ó£Â÷7G&öæsâ\:v:’fVæF–F6öÖò6†fRFR'F–F6öÒ6&òR6öæV7F÷"ÂRG&ö6:’Væ6—†RF—&WFòâ6öÇ\:|:6ò&÷f—<;7&–6V—L:fVÃ¢W6"ò"Fò&÷L:6òFR&V–æ–6–"æòÇVv"FòFRÆ–v"Â¬:VRVÆWG&–6ÖVçFR<:6ò6†fW2–wV—2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6öæV7F÷"FW6Æö6Fó£Â÷7G&öæsâ&VVæ6—†R6VwV–æFò6W&–w&f–²ÄTG2L:¦ÒöÆ&–FFRÂ26†fW2ì:6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäæVÒVÆò6öæV7F÷"Æ–v£Â÷7G&öæsâò&÷L:6òW7L:FW66'FFòâ–çfW7F–v:|:6ò76&föçFRÂ6öÒò&÷FV—&òFRÄÆ–æ²FóÒ"ö&Æörö6öÖò×FW7F"ÖföçFRÖFRÖÆ–ÖVçF6ò×2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòFW7F"föçFRFRÆ–ÖVçF:|:6óÂôÆ–æ³âÂRFWö—2&Æ6ÂVÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖF–væ÷7F–6"×Æ6ÖÖRÖFVfV—GV÷6"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòF–væ÷7F–6"Æ6ÖÜ:6RFVfV—GV÷6ÂôÆ–æ³âãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÆ–vRFW6Æ–vVÒ6VwV–F£Â÷7G&öæsâì:6ò:’&÷L:6òâW76RG,:6òöçF&&÷F\:|:6òFföçFRÂ7W'Fò÷RFV×W&GW&(	BfV¦ÄÆ–æ²FóÒ"ö&Æörö7W'FòÖ6—&7V—Fò×Æ6ÖÖRÖ6öÖòÖ–FVçF–f–6""6Æ74æÖSÒ'FW‡BÖ66VçB#æ7W'FòÖ6—&7V—FòæÆ6ÖÜ:6S¢6öÖò–FVçF–f–6#ÂôÆ–æ³âãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòòWV—ÖVçFòW7F—fW"æv&çF–ÂVæFòì:6ò6öç6VwV—"–FVçF–f–6"ò"6÷'&WFòæòÖçVÂÂVæFò†÷WfW"6†V—&òFRVV–ÖFò÷RÖ&6W67W&æÆ6ÂVæFòòv&–æWFRf÷"FRæ÷FV&öö²÷RÆÂÖ–âÖöæRÂRVæFòÜ:V–æì:6ò'F—"æVÒVÆò6öæV7F÷"âæW76RöçFòòFW7FR6VwV–çFRW†–vRföçFRFR&æ6FRÖVFœ:|:6ò(	BFVæF–ÖVçFòVÒÄÆ–æ²FóÒ"÷6W'f–6÷2öÖçWFVæ6òÖFRÖ6ö×WFF÷""6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6òFR6ö×WFF÷#ÂôÆ–æ³â÷RG&–vVÒVÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&7W'FòÖ6—&7V—Fò×Æ6ÖÖRÖ6öÖòÖ–FVçF–f–6"#¢°¢F—FÆS¢$7W'FòÖ6—&7V—FòæÆ6ÖÜ:6S¢6öÖò–FVçF–f–6"R—6öÆ"ò&ö&ÆVÖ"À¢W†6W'C ¢$6öÖò&V6öæ†V6W"VÒ7W'FòFRÆ–ÖVçF:|:6òÂ—6öÆ"6ö×öæVçFR÷"6ö×öæVçFR6öÒòFW7FRf÷&Fòv&–æWFRR6&W"VæFòò&W&òFV—†FR6W"fœ:fVÂâ"À¢FFS¢###bÓ‚Ó#b"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#äW†—7FRVÖF–fW&Vì:v6Æ&VçG&RVÒ6ö×WFF÷"VRì:6òÆ–vRVÒ6ö×WFF÷"VRFVçFÆ–v"RFW6—7FRâò6VwVæFò66òV6R6V×&R6–væ–f–6VR&÷F\:|:6òFföçFRVæ6öçG&÷R6öç7VÖòf÷&FòW7W&Fò(	Bò6ö×÷'FÖVçFòL:×–6òFRVÒ7W'FòæÆ–ÖVçF:|:6òFÆ6÷RFRÆwVÒ6ö×öæVçFRÆ–vFòVÆãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çå6R2fVçFö–æ†2v—&Ò÷"VÖg&:|:6òFR6VwVæFòRGVFòFW6Æ–vÂ&WWF–FÖVçFRÂG&FR6öÖò7W7V—FFR7W'Fòâò6Ö–æ†ò:’&VÖ÷fW"GVFòòVRì:6ò:’W76Væ6–ÂRFW7F"Æ6f÷&Fòv&–æWFR6öÒ&ö6W76F÷"ÂVÒÜ;6GVÆòFRÖVÜ;7&–RföçFR(	Bò6†ÖFòFW7FRFR&æ6FÜ:Öæ–ÖâòVR&V–çG&öGW¦—"R&÷fö6"òFW6Æ–vÖVçFò:’ò7VÇFòãÂ÷à ¢Æƒ#äòVR:’VÒ7W'FòFRÆ–ÖVçF:|:6óÂöƒ#à¢ÇäföçFRVçG&VvFVç<;VW2f—†2ƒ"bÂRbÂ2Ã2b’RÖöæ—F÷&VçFòW7L:6VæFò6öç7VÖ–FòâVæFòVÒ6Ö–æ†òFR6÷'&VçFR–æFWf–Fò&V6R(	BVÒ6ö×öæVçFR&ö×–Fò–çFW&æÖVçFRÂVÒ&gW6ò6öÇFòVæ6÷7FæFòæÆ6ÂVÒ6&ò–ì:vFò(	Bò6öç7VÖòF—7&âVÒfW¢FRVV–Ö"ÂföçFR6÷'F6:ÖFVÒÖ–Æ—76VwVæF÷2â8’÷"—76òVRò6–çFöÖ&V6R6öÖòVÖ'F–F&÷'FFÂRì:6ò6öÖògVÖ:vãÂ÷à ¢Æƒ#å÷"VR6öçFV6SÂöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsä66—F÷"VÆWG&öÌ:×F–6òFVw&FFó£Â÷7G&öæsâF÷ò&VÆFòÂ&6R7V¦÷RVÆWG,;6Æ—Fò6V6òâVÒF÷2Ö÷F—f÷2Ö—26ö×Vç2VÒÆ626öÒÖ—2FR6–æ6òæ÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÖöçFvVÒ–æ6÷'&WF£Â÷7G&öæsâW7:vF÷"ÖWL:Æ–6òVÒgW&ò6VÒgW&ò6÷'&W7öæFVçFRæÆ6Â&gW6òW‡G&Â6†Fòv&–æWFRFö6æFò6öÆFãÂöÆ“à¢ÆÆ“ãÇ7G&öæså7W'FòVÌ:—G&–6ó£Â÷7G&öæsâFW66&væ&VFRVR6ö×&öÖWFRòW7L:v–òFRVçG&FFÆ6÷RFRVÒW&–l:—&–6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÌ:×V–FòR6÷'&÷<:6ó£Â÷7G&öæsâ&W<:ÖGVò6öæGWF—fòVçG&RG&–Æ†2Âg&WVVçFR;72Æ–×W¦ÖÆfV—F÷RVÖ–FFRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåW&–l:—&–6ò6öÒFVfV—Fó£Â÷7G&öæsâF—66òÂÆ6FRl:ÖFVòÂ6ööÆW"÷R÷'FU4"6öÒ7W'FòFW''V&Æ–ÖVçF:|:6ò–çFV—&ÂRÆ6ÆWf7VÇ–æ§W7FÖVçFRãÂöÆ“à¢Â÷VÃà ¢Æƒ#äöæFR&ö7W&#Âöƒ#à¢Çä6öæ6VçG&R–ç7\:|:6òf—7VÂVÒVG&ò&Vvœ;VW3¢:&VFR&VwVÆvVÒVÒföÇFFò6÷VWFRFò&ö6W76F÷"ÂöæFRf–6Ò&ö&–æ2R66—F÷&W3²òVçF÷&æòF÷26öæV7F÷&W2FRVæW&v–FR#BR‚–æ÷3²f6RG&6V—&FÆ6Â6ö"÷2öçF÷2FRf—†:|:6ó²R&Vvœ:6òF2÷'F2U4"ÂVR6ög&R6öÒ6öæWŒ;VW2f÷,:vF2â&ö7W&R&VÆÖVçFòÂ&W<:ÖGVòW6'&çVœ:vFòÂÖ&6W67W&R6†V—&ò6&7FW,:×7F–6òãÂ÷à ¢Æƒ#äòVRf¦W#¢—6öÆÖVçFòVÒWF3Âöƒ#à¢ÆöÃà¢ÆÆ“ãÇ7G&öæså&Vv—7G&RòW7FFòGVÂãÂ÷7G&öæsâf÷Föw&fR26öæWŒ;VW2çFW2FRFW6ÖöçF"(	B—76òWf—FW'&òæ&VÖöçFvVÒãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFW66öæV7FRGVFòòVRì:6ò:’W76Væ6–Ã£Â÷7G&öæsâF—66÷2ÂÆ6FRl:ÖFVòFVF–6FÂÆV—F÷&W2Â6&÷2g&öçF—2FRU4"R:VF–òÂfVçFö–æ†2W‡G&2âFV—†RÆ6Â&ö6W76F÷"6öÒò6ööÆW"ÂVÒÜ;6GVÆòFRÖVÜ;7&–RföçFRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåFW7FRf÷&Fòv&–æWFRãÂ÷7G&öæsâö–RÆ66ö'&R,;7&–6—†FRVÌ:6òFVÆÂçVæ66ö'&R7WW&l:Ö6–RÖWL:Æ–6â6R76–ÒVÆÆ–vÂò7W'FòW&6öçFFò6öÒòv&–æWFR(	BV6R6V×&RVÒW7:vF÷"f÷&FRÇVv"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&V–çG&öGW¦VÒ—FVÒ÷"fW£Â÷7G&öæsâÂÆ–væFòRFW6Æ–væFò6F76òâò6ö×öæVçFRVR&W&öGW¦—"òFW6Æ–vÖVçFò–ÖVF–Fò:’ò&W7öç<:fVÂãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåG&÷VRföçFR÷"÷WG&6ö×&÷fFÖVçFR&öãÂ÷7G&öæsâ&÷F\:|:6òF—7&æFòFÖ,:–Ò:’6–çFöÖFRföçFRVÒFVw&F:|:6òÂRò&÷FV—&òFRfW&–f–6:|:6òW7L:VÒÄÆ–æ²FóÒ"ö&Æörö6öÖò×FW7F"ÖföçFRÖFRÖÆ–ÖVçF6ò×2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòFW7F"föçFRFRÆ–ÖVçF:|:6óÂôÆ–æ³âãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäö'6W'fRòÄTBFRF–vì;77F–6óÂ÷7G&öæsâ÷RòF—7Æ’FR<;6F–vòÂVæFòÆ6F—fW"âVÆRF–fW&Væ6–fÆ†FRÆ–ÖVçF:|:6òFRfÆ†FRÖVÜ;7&–÷RFRl:ÖFVòãÂöÆ“à¢ÂööÃà¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"ÖFW7G'V7F—fRóC&rÖFW7G'V7F—fRóRÓBæ÷B×&÷6R×’Ób#à¢Ç6Æ74æÖSÒ&ÒÓFW‡B×6Ò#ãÇ7G&öæså6VwW&ì:v£Â÷7G&öæsâFW6Æ–wVR6†fRFföçFRR&WF—&Rò6&òçFW2FRVÇVW"Öæ—VÆ:|:6òâì:6ò'&föçFRFRÆ–ÖVçF:|:6òâì:6òf:vÖVFœ:|;VW26öÒòWV—ÖVçFòVæW&v—¦Fò6Rfö<:¢ì:6òFVÒ,:F–6(	BÖVFœ:|:6ò6÷'&WFFR7W'Fò:’fV—F6öÒò&VÆ†òFW6Æ–vFòÂVÒÖöFòFR6öçF–çV–FFR÷R&W6—7L:¦æ6–ÂR6öæ6ÇW<;VW2W'&F2ÆWfÒ:G&ö6FR\:v2&ö2ãÂ÷à¢Âö6–FSà ¢Æƒ#åF&VÆF–vì;77F–6¢òVRò6ö×÷'FÖVçFò–æF–6Âöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#à¢ÇFƒä6ö×÷'FÖVçFòö'6W'fFóÂ÷Fƒà¢ÇFƒä6W6&÷l:fVÃÂ÷Fƒà¢ÇFƒäòVRfW&–f–6#Â÷Fƒà¢Â÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCåfVçFö–æ†2v—&ÒÖV–ò6VwVæFòRGVFòFW6Æ–vÂVÒ6–6ÆóÂ÷FCãÇFCå&÷F\:|:6òFföçFR6öçG&6öç7VÖòW†6W76—fóÂ÷FCãÇFCä&æ6FÜ:Öæ–Öf÷&Fòv&–æWFSÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäf÷&Fòv&–æWFRÆ–vÂFVçG&òì:6óÂ÷FCãÇFCä6öçFFòÖWL:Æ–6ò–æFWf–FóÂ÷FCãÇFCäW7:vF÷&W2Â&gW6÷2W‡G&2R6†G&6V—&Â÷FCãÂ÷G#à¢ÇG#ãÇFCå<;2FW6Æ–vVæFòVÒF—66ò÷RÆ6FRl:ÖFVòW7L:6öæV7FFÂ÷FCãÇFCåW&–l:—&–6òVÒ7W'FóÂ÷FCãÇFCå&V–çG&öG\:|:6òVÒ—FVÒ÷"fW£Â÷FCãÂ÷G#à¢ÇG#ãÇFCä66—F÷"&VÆFò÷R&W<:ÖGVòW6'&çVœ:vFòf—<:×fVÃÂ÷FCãÇFCä6ö×öæVçFRFVw&FFò÷R6÷'&÷<:6óÂ÷FCãÇFCä–ç7\:|:6òæ2GV2f6W2FÆ6Â÷FCãÂ÷G#à¢ÇG#ãÇFCäì:6òÆ–væVÒ6öÒ÷WG&föçFR6ö×&÷fFÖVçFR&öÂ÷FCãÇFCäfÆ†æò6—&7V—FòFR&VwVÆvVÒFÆ6Â÷FCãÇFCäfÆ–:|:6òFR&æ6FRFV6—<:6òV6öì;FÖ–6Â÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#ä6öÖò&W6öÇfW#Âöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsä7W'Fò÷"ÖöçFvVÓ£Â÷7G&öæsâ&VÖöçF"6öÒ÷2W7:vF÷&W26÷'&WF÷2&W6öÇfRFVf–æ—F—fÖVçFRR6VÒ7W7FòFR\:vãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåW&–l:—&–6òVÒ7W'Fó£Â÷7G&öæsâ7V'7F—GV—"ò—FVÒ–FVçF–f–6FòFWföÇfRÜ:V–æòæ÷&ÖÃ²Æ6W7Ff:ÖçFVw&ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä66—F÷&W2FVw&FF÷3£Â÷7G&öæsâ7V'7F—GVœ:|:6ò:’&W&òVÒì:×fVÂFR6ö×öæVçFRÂ6öÒfW'&òFR6öÆFFWVFòR\:vFRÖW6ÖW7V6–f–6:|:6òâì:6ò:’6W'fœ:vò&–×&÷f—6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä7W'Fòæò6—&7V—FòFR&VwVÆvVÓ£Â÷7G&öæsâW†–vR–ç7G'VÖVçF:|:6òFR&æ6FâVÒÆ626ö×Vç2Âò7W7FòFò&W&ò6÷7GVÖ6R&÷†–Ö"FòfÆ÷"FRVÖÆ6æ÷f(	BFV6—<:6ò766W"V6öì;FÖ–6ãÂöÆ“à¢Â÷VÃà¢ÇäFWö—2VRÜ:V–æföÇFÆ–v"Â6öæf—&ÖRW7F&–Æ–FFR6ö"6&vRFV×W&GW&çFW2FRfV6†"ò66ó¢òG,:6òFRÆ–v"RFW6Æ–v"FÖ,:–Ò&V6R÷"VV6–ÖVçFòÂ6öÒ6–çFöÖ&V6–FòÖ26W6F–fW&VçFRãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFò†÷WfW"6†V—&òFRVV–ÖFòÂÖ&6FR6&&öæ—¦:|:6òÂÌ:×V–FòFW'&ÖFò÷R66—F÷"W7GVfFó²VæFòòFW6Æ–vÖVçFòW'6—7F—"6öÒ&æ6FÜ:Öæ–ÖR÷WG&föçFS²VæFòW†—7F—&VÒFF÷2–×÷'FçFW2æòF—66ó²R6V×&RVRò&W&òVçföÇfW"6öÆFâòF–vì;77F–6ò6öÒ–ç7G'VÖVçF÷2W7L:VÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âÂRòFVæF–ÖVçFòFR&æ6FVÒÄÆ–æ²FóÒ"÷6W'f–6÷2öÖçWFVæ6òÖFRÖ6ö×WFF÷""6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6òFR6ö×WFF÷#ÂôÆ–æ³ââ6Rò,;7†–Öò76òf÷"VÆ–Ö–æ"L;§f–F6ö'&RÆ6Âò&÷FV—&ò6ö×ÆVÖVçF"W7L:VÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖF–væ÷7F–6"×Æ6ÖÖRÖFVfV—GV÷6"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòF–væ÷7F–6"Æ6ÖÜ:6RFVfV—GV÷6ÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&&–÷2Ö6÷'&ö×–F×&W6WBÖ6Ö÷2ÖGVÆ—¦6ò#¢°¢F—FÆS¢$$”õ26÷'&ö×–F¢&W6WBFR4Ôõ2R&V7WW&:|:6òFRf—&×v&R"À¢W†6W'C ¢%VæFòò&W6WBFR4Ôõ2&W6öÇfRÂ6öÖòf¦W"VÆò§V×W"÷RVÆ&FW&–RòVR×VFVæFòòf—&×v&R&VÆÖVçFR6÷'&ö×WRGW&çFRVÖGVÆ—¦:|:6òâ"À¢FFS¢###bÓ‚Ó#b"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#â$$”õ26÷'&ö×–F":’VÒF–vì;77F–6òFFò6öÒ×V—FòÖ—2g&W\:¦æ6–FòVR6öçFV6RFRfW&FFRâæÖ–÷&–F÷266÷2òf—&×v&RW7L::ÖçFVw&òRòVRW7L:W'&Fò<:6ò26öæf–wW&:|;VW2wV&FF2(	BR—76ò6R&W6öÇfR6öÒVÒ&ö6VF–ÖVçFòFRFö—2Ö–çWF÷2Â6VÒw&f"æFãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çä6öæf–wW&:|:6òW&F–F÷R–çl:Æ–F6R&W6öÇfR6öÒÇ7G&öæsç&W6WBFR4Ôõ3Â÷7G&öæsã¢VÆò§V×W"FRÆ–×W¦ÂVÆ&VÖü:|:6òF&FW&–÷RVÆ÷:|:6òFR6'&Vv"G,;VW2FVçG&òFò6WGWâf—&×v&R&VÆÖVçFR6÷'&ö×–Fòì:6ò'&Rò6WGW(	BFVÆW&ÖæV6R&WFÂR&V7WW&:|:6òFWVæFRFò&V7W'6òW7V<:Öf–6òFòf'&–6çFRãÂ÷à ¢Æƒ#äF–fW&Vì:vVçG&R4Ôõ2Rf—&×v&SÂöƒ#à¢Çäòf—&×v&R:’ò&öw&Öw&fFòVÒVÒ6†—FRÖVÜ;7&–ì:6òföÌ:F–ÂæÆ6²VÆR:’òVRFW6Væ†FVÆFò6WGWR–æ–6–ò†&Gv&Râò4Ôõ2:’WVVæ:&VFR6öæf–wW&:|:6ò(	BÖöFòFR–æ–6–Æ—¦:|:6òÂ÷&FVÒFRF—7÷6—F—f÷2ÂW&f–ÂFRÖVÜ;7&–Â&VÌ;6v–ò(	BÖçF–FVæW&v—¦FVÆ&FW&–FRÌ:×F–òâv"ò4Ôõ2ì:6òvòf—&×v&S²:’òWV—fÆVçFR&W7FW&"26öæf–wW&:|;VW2FRl:'&–6Âì:6ò&V–ç7FÆ"ò&öw&ÖãÂ÷à ¢Æƒ#å÷"VR6öæf–wW&:|:6ò6RW&FSÂöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsä&FW&–FW66'&VvF£Â÷7G&öæsâFRÖöFVÆò5##3"GW&VÒÜ:–F–FRG,:§26WFRæ÷2âò6–æÂ6Ì:76–6ò:’FFR†÷&6V×&RW'&F2Rf—6òFRW'&òFR6†V6·7VÒ6F'F–FãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåW&f–ÂFRÖVÜ;7&–w&W76—fó£Â÷7G&öæsâ„ÕôU…òf÷&FòVRò6öæ§VçFò7W÷'F–×VFR'F–F²×V—F2Æ62&WfW'FVÒ6÷¦–æ†2FWö—2FRFVçFF—f26VwV–F2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåVVFFRVæW&v–GW&çFRw&f:|:6óÂ÷7G&öæsâFRVÖÇFW&:|:6òæò6WGWãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåG&ö6FR&ö6W76F÷"÷RÖVÜ;7&–Â÷7G&öæsâVR–çfÆ–F,:&ÖWG&÷2wV&FF÷2ãÂöÆ“à¢Â÷VÃà ¢Æƒ#ä6öÖò–FVçF–f–6"6F6Vì:&–óÂöƒ#à¢ÇäÆ–wVRÜ:V–æRö'6W'fRâ6Rò6WGW'&RÂòf—&×v&RW7L:&öÒ(	Bò66ò:’FR6öæf–wW&:|:6òÂRò&÷FV—&òFR6÷'&\:|:6òW7L:VÒÄÆ–æ²FóÒ"ö&Æörö6ö×WFF÷"ÖVçG&ÖF—&WFòÖæÖ&–÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6ö×WFF÷"VçG&F—&WFòæ$”õ3ÂôÆ–æ³ââ6R&V6RÖ&6Fòf'&–6çFRRÜ:V–æ&V–æ–6–VÒ6–6ÆòÂ7W7V—FRFRÖVÜ;7&–÷RW&f–Ââ6RFVÆçVæ66VæFRÂÖ2fVçFö–æ†2v—&ÒRòÄTBFRF–vì;77F–6ò7W6WF–æ–6–ÂÂ:Ò7W7V—FFRf—&×v&R766W"ÆV|:×F–ÖãÂ÷à ¢Æƒ#ä6öÖòf¦W"ò&W6WBFR4Ôõ3Âöƒ#à¢ÆöÃà¢ÆÆ“ãÇ7G&öæsäFW6Æ–wVRGVFó£Â÷7G&öæsâ6—7FVÖVæ6W'&FòÂ6†fRFföçFRVÒòÂ6&òFRVæW&v–&VÖ÷f–FòâVÒæ÷FV&öö²Â&VÖ÷fFÖ,:–Ò&FW&–VæFòf÷"&VÖ÷l:×fVÂãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFW66'&VwVRÆ6Â÷7G&öæsâ6VwW&æFòò&÷L:6òFRÆ–v"÷"FW¢V–ç¦R6VwVæF÷26öÒò6&òf÷&ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåVÆò§V×W#£Â÷7G&öæsâÆö6Æ—¦R÷2–æ÷2Ö&6F÷2Æ6öFSä4Å%ô4Ôõ3Âö6öFSâÂÆ6öFSä¤$CÂö6öFSâ÷RÆ6öFSä4Å%D3Âö6öFSââÖ÷f6&÷6œ:|:6òF¦6VçFR÷"FW¢6VwVæF÷2RFWföÇf:÷6œ:|:6ò÷&–v–æÂâÆ626öÒ&÷L:6òG&6V—&òFRÆ–×W¦F—7Vç6Òò§V×W"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåVÆ&FW&–£Â÷7G&öæsâæW<:¦æ6–FR§V×W"Â6öÇFRG&fR&WF—&R&FW&–FRÌ:×F–ò÷"6W&6FR6–æ6òÖ–çWF÷2â&V6öÆ÷VR6öÒòÆFò÷6—F—fò&6–ÖãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&VÆ–wVRRVçG&Ræò6WGWÂ÷7G&öæsâ–ÖVF–FÖVçFRâ§W7FRFFR†÷&ÂÖöFòFR–æ–6–Æ—¦:|:6ò…TTd’÷RÆVv7’Â6öæf÷&ÖRòF—66ò’R÷&FVÒFRF—7÷6—F—f÷2â6ÇfRR6–ãÂöÆ“à¢ÂööÃà¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"ÖFW7G'V7F—fRóC&rÖFW7G'V7F—fRóRÓBæ÷B×&÷6R×’Ób#à¢Ç6Æ74æÖSÒ&ÒÓFW‡B×6Ò#ãÇ7G&öæsäFVì:|:6ó£Â÷7G&öæsâò&W6WBv6Væ†FR6WGWÂW&f—2FRÖVÜ;7&–R§W7FW2W'6öæÆ—¦F÷2(	Bæ÷FRòVRW7F—fW"6öæf–wW&FòçFW2âVÒÜ:V–æ26÷'÷&F—f26öÒ7&—Föw&f–FRF—66òF—fÂÇFW&"6öæf–wW&:|;VW2FRf—&×v&RöFRW†–v—"6†fRFR&V7WW&:|:6òæ,;7†–Ö'F–Fâ6öæf—&ÖRVRfö<:¢FVÒW766†fRçFW2FR&÷76VwV—"ãÂ÷à¢Âö6–FSà ¢Æƒ#åF&VÆFRFV6—<:6ó¢6–çFöÖÂ6W6&÷l:fVÂR,;7†–Öò76óÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#à¢ÇFƒå6–çFöÖæ'F–FÂ÷Fƒà¢ÇFƒä6W6&÷l:fVÃÂ÷Fƒà¢ÇFƒå,;7†–Öò76óÂ÷Fƒà¢Â÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCäFFR†÷&6V×&RW'&F2Âf—6òFR6†V6·7VÓÂ÷FCãÇFCä&FW&–FRÌ:×F–òæòf–ÒFf–FÂ÷FCãÇFCåG&ö6"5##3"R&V6öæf–wW&"ò6WGWÂ÷FCãÂ÷G#à¢ÇG#ãÇFCå6WGW'&RÂÖ2ò6—7FVÖì:6ò:’Væ6öçG&FóÂ÷FCãÇFCä÷&FVÒFR–æ–6–Æ—¦:|:6ò÷RÖöFòTTd’ôÆVv7’–æ6÷'&WFóÂ÷FCãÇFCä§W7F"æò6WGWÂ6VÒv"æFÂ÷FCãÂ÷G#à¢ÇG#ãÇFCå&V–æ–6–VÒ6–6Æò;72F—f"W&f–ÂFRÖVÜ;7&–Â÷FCãÇFCå„ÕôU…ò6–ÖFòVRò6öæ§VçFò7W÷'FÂ÷FCãÇFCå&W6WBFR4Ôõ2VÆò§V×W"R'F–FVÒW&f–ÂG,:6óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCåFVÆ&WFÂfVçFö–æ†2v—&æFòÂ6VÒ&—R;§F–ÃÂ÷FCãÇFCäf—&×v&R÷76—fVÆÖVçFR6÷'&ö×–FóÂ÷FCãÇFCå&V7WW&:|:6òVÆò&V7W'6òFòf'&–6çFR÷R&æ6FÂ÷FCãÂ÷G#à¢ÇG#ãÇFCåFVÆ&WFÖW6Öò;72&W6WBR6öÒVÒ<;2Ü;6GVÆòFRÖVÜ;7&–Â÷FCãÇFCäfÆ†FR†&Gv&RÌ:–ÒFòf—&×v&SÂ÷FCãÇFCäF–vì;77F–6ò6öÒ–ç7G'VÖVçF÷2Âì:6ò&Vw&f":26Vv3Â÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#åVæFòòf—&×v&R6÷'&ö×WRFRfW&FFSÂöƒ#à¢Çä6öçFV6R&–æ6—ÆÖVçFRVæFòVÖGVÆ—¦:|:6ò:’–çFW'&ö×–F÷"VVFFRVæW&v–÷RVæFòò'V—fòÆ–6Fòì:6ò6÷'&W7öæFRW†FÖVçFRòÖöFVÆòR:&Wf—<:6òFÆ6â6–çFöÖ¢6VÒ–ÖvVÒÂ6VÒ6WGWÂ6VÒ&—W2;§FV—2â÷26Ö–æ†÷2÷7<:×fV—2FWVæFVÒFòf'&–6çFS£Â÷à¢ÇVÃà¢ÆÆ“ãÇ7G&öæså&V7WW&:|:6ò÷"U4"6VÒ&ö6W76F÷"÷R6VÒl:ÖFVó£Â÷7G&öæsâ&V7W'6ò&W6VçFRVÒ×V—F2Æ62GV—2ÂVÒVRò'V—fò:’w&fFòVÒVÒVæG&—fR6öÒæöÖRW7V<:Öf–6òRVÒ&÷L:6òFVF–6Fò–æ–6–&Vw&f:|:6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6†—GWÆó£Â÷7G&öæsâÆ626öÒFö—26†—2W&Ö—FVÒÇFW&æ"&<;7–:ÖçFVw&R&Vw&f"FVfV—GV÷6ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&Vw&f:|:6òW‡FW&æ£Â÷7G&öæsâVæFòì:6òŒ:&V7W'6òæF—fòÂw&f:|:6ò:’fV—F6öÒ&öw&ÖF÷"Æ–vFòò6†—(	B6W'fœ:vòFR&æ6FÂì:6òFöÜ:—7F–6òãÂöÆ“à¢Â÷VÃà ¢Æƒ#äGVÆ—¦"÷Rì:6òGVÆ—¦#Âöƒ#à¢ÇäGVÆ—¦:|:6òFRf—&×v&Rì:6ò:’ÖçWFVì:|:6òFR&÷F–æRì:6òFV—†Ü:V–æÖ—2,:–Fâf:vVæ2VæFò†÷WfW"Ö÷F—fòFV6Æ&Fó¢7W÷'FRVÒ&ö6W76F÷"æ÷fòÂ6÷'&\:|:6òFRfÆ†FR6VwW&ì:vF—gVÆvF÷R–æ6ö×F–&–Æ–FFRFö7VÖVçFFFRÖVÜ;7&–â&—†Rò'V—fò6öÖVçFRæ:v–æFòÖöFVÆòW†Fòæò6—FRFòf'&–6çFRÂ6öæf—&&Wf—<:6òFÆ6–×&W76æVÆÂW6RfW'&ÖVçFæF—fFò,;7&–ò6WGWRì:6òFW6Æ–wVRGW&çFRò&ö6W76òâöæFR†÷WfW"&—66òFRVVFFRVæW&v–ÂW6RVÒæö'&V²ãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòFVÆ6öçF–çV"&WF;72ò&W6WBÂVæFòÜ:V–æf÷"æ÷FV&öö²RW†–v—"FW6ÖöçFvVÒ&Æ6ì:v"&FW&–FR4Ôõ2ÂVæFò†÷WfW"7&—Föw&f–FRF—66òRfö<:¢ì:6òF—fW"6†fRÂR6V×&RVRGVÆ—¦:|:6òF—fW"6–Fò–çFW'&ö×–FæòÖV–òâ&Vw&f:|:6òFR6†—:’&ö6VF–ÖVçFòFR&æ6F(	BfÆ–:|:6òW7L:VÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âRòFVæF–ÖVçFòVÒÄÆ–æ²FóÒ"÷6W'f–6÷2öÖçWFVæ6òÖFRÖ6ö×WFF÷""6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6òFR6ö×WFF÷#ÂôÆ–æ³ââ6RòVG&ò–æ6ÇV—"'F–F2&÷'FF2ÂfW&–f—VRçFW2ÄÆ–æ²FóÒ"ö&Æörö7W'FòÖ6—&7V—Fò×Æ6ÖÖRÖ6öÖòÖ–FVçF–f–6""6Æ74æÖSÒ'FW‡BÖ66VçB#æ7W'FòÖ6—&7V—FòæÆ6ÖÜ:6SÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&–çFW&æWBÖÆVçF×&÷fVF÷"Ö÷R×&÷FVF÷"#¢°¢F—FÆS¢$–çFW&æWBÆVçF¢:’ò&÷fVF÷"÷Rò6WR&÷FVF÷#ò"À¢W†6W'C ¢$6öÖò6W&"Â6öÒFö—2FW7FW2ö&¦WF—f÷2ÂÆVçF–L:6òVRfVÒF÷W&F÷&FÆVçF–L:6òVRæ66RFVçG&òFR66(	BRòVRf¦W"VÒ6F66òâ"À¢FFS¢###bÓ‚Ó#b"À¢&VEF–ÖS¢#’Ö–â"À¢6FVv÷'“¢%&VFW2Rv’Ôf’"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#äçFW2FRG&ö6"FRÆæò÷R6ö×&"VÒ&÷FVF÷"æ÷fòÂ6W&RVçG&VvVR6†Vvò&÷FVF÷"FòFW6V×Væ†òFVçG&òF&VFRâVÒFW7FR—6öÆFòæò6VÇVÆ"ì:6òf¢—76òâò&÷FV—&ò&—†ò7&–VÖ&VfW,:¦æ6–÷"6&òÂ6ö×&òv’Ôf’W'FòRÆöævRR&Vv—7G&–æF–6F÷&W2F–fW&VçFW26VÒG&ç6f÷&Ö"VÒ;¦æ–6òì;¦ÖW&òVÒF–vì;77F–6òãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çäf:v&–ÖV—&ÖVFœ:|:6ò6öÒVÒ6ö×WFF÷"Æ–vFò÷"Ç7G&öæsæ6&óÂ÷7G&öæsâF—&WFòò&÷FVF÷"ÂÖ26öæf—&ÖRçFW2VR÷'FÂòFFF÷"Rò6&òæVvö6–&ÒVÖfVÆö6–FFR6ö×L:×fVÂ6öÒòÆæòâ6RW76&VfW,:¦æ6–f–6W7L:fVÂRòv’Ôf’FVw&FÂ–çfW7F–v:|:6ò:’–çFW&æâ6Rò6&òFÖ,:–Ò&W6VçFFVw&F:|:6ò&V6÷'&VçFRÂò†—7L;7&–6ò767W7FVçF"fW&–f–6:|:6òFò&÷fVF÷"ãÂ÷à ¢Æƒ#å&W&RVÒFW7FRVR÷766W"&WWF–FóÂöƒ#à¢ÆöÃà¢ÆÆ“ãÇ7G&öæsäæ÷FR&VfW,:¦æ6–£Â÷7G&öæsâ&Vv—7G&RÆæò6öçG&FFòÂWV—ÖVçFòF÷W&F÷&R†÷,:&–òâì:6òG&FRfVÆö6–FFRçVæ6–F6öÖò&W7VÇFFò6öç7FçFRVÒFöF6öæFœ:|:6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&RG,:fVvò6öæ6÷'&VçFS£Â÷7G&öæsâW6R&6·W2ÂGVÆ—¦:|;VW2Â7G&VÖ–ærÂ<:&ÖW&2RF÷væÆöG2æ÷2FVÖ—2&VÆ†÷2GW&çFRÖ÷7G&ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6öæf—&òVæÆ6RFò6ö×WFF÷#£Â÷7G&öæsâfV¦æò6—7FVÖfVÆö6–FFRæVvö6–FVÆÆ6FR&VFRâVÒVæÆ6RFRÖ'2ì:6ò6öç6VwVRÖVF—"6÷'&WFÖVçFRVÒÆæò6–ÖFW76RÆ–Ö—FRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåW6RòÖW6Öò6W'f–F÷"R&VÆ†ó£Â÷7G&öæsâ×VF"GVFòVçG&R2Ö÷7G&2–×VFR6ö×&"÷2&W7VÇFF÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&W—F£Â÷7G&öæsâf:vG,:§2ÖVFœ:|;VW2÷"6Vì:&–òR&W—Fò6öæ§VçFòVÒ÷WG&ò†÷,:&–òâwV&FR6GW&26öÒFFR†÷&ãÂöÆ“à¢ÂööÃà¢Çäòö&¦WF—fòì:6ò:’&öGW¦—"VÒÆVFò&VwVÆL;7&–òÂÖ2&WF—&"f&œ:fV—2;6'f–2çFW2FRFV6–F—"VçG&R7W÷'FRF÷W&F÷&Â§W7FRF&VFR÷R6ö×&FRWV—ÖVçFòãÂ÷à ¢Æƒ#ä÷2Fö—2FW7FW2VR6W&Ò÷&–vVÓÂöƒ#à¢ÆöÃà¢ÆÆ“ãÇ7G&öæså&VfW,:¦æ6–÷"6&ó£Â÷7G&öæsâ6öÒòÆ–æ²æVvö6–Fò6÷'&WFÖVçFRR÷2FVÖ—2W6÷2W6F÷2Âf:v2G,:§2Ö÷7G&2R&Vv—7G&RFöF÷2÷2–æF–6F÷&W2F—7öì:×fV—2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåv’Ôf’W'Fó£Â÷7G&öæsâæòÖW6Öò&VÆ†òÂFW66öæV7FRò6&òR&W—F,;7†–Öòò&÷FVF÷"Â6VÒö'7L:7VÆ÷2&VÆWfçFW2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåv’Ôf’æòÆö6ÂFò&ö&ÆVÖ£Â÷7G&öæsâ&W—FW†FÖVçFRæò<;FÖöFòR÷6œ:|:6òVÒVRfÆ†6öçFV6RãÂöÆ“à¢ÂööÃà¢Çä6öÒ6&òÂv’Ôf’W'FòRv’Ôf’æòöçFò'V–ÒÂ6öçfW'6FV—†FR6W"÷–æœ:6òâ6R6&òRv’Ôf’W'FòW&ÖæV6VÒ6öW&VçFW2RVæ2òöçFòF—7FçFR–÷&Âò&ö&ÆVÖ:’6ö&W'GW&²W6Rò&÷FV—&òFRÄÆ–æ²FóÒ"ö&Æörö6öÖòÖÖVÆ†÷&"×6–æÂ×v–f’ÖVÒÖ66"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòÖVÆ†÷&"ò6–æÂFRv’Ôf’VÒ66ÂôÆ–æ³âãÂ÷à ¢Æƒ#äì:6òöÆ†RVæ2òF÷væÆöCÂöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsäF÷væÆöC£Â÷7G&öæsâfWF&V6V&–ÖVçFòFR'V—f÷2Â:v–æ2W6F2Rl:ÖFVòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåWÆöC£Â÷7G&öæsâW6VÒVçf–òFR'V—f÷2Â&6·WVÒçWfVÒRVÆ–FFRF7V–ÖvVÒVÒ6†ÖF2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÆL:¦æ6–£Â÷7G&öæsâ:’òFV×òFR&W7÷7F²¦öv÷2ÂFVÆVföæ–R6W76ò&VÖ÷FòW&6V&VÒG&6òÖW6Öò6öÒF÷væÆöBÇFòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä¦—GFW#£Â÷7G&öæsâ:’f&–:|:6òFW76RG&6ó²VæFò÷66–ÆÂ:VF–òRl:ÖFVòöFVÒf–6"VçG&V6÷'FF÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåW&FFR6÷FW3£Â÷7G&öæsâ–æF–6FF÷2VR&V6—6Ò6W"&VVçf–F÷2R§VFW‡Æ–6"6÷'FW2RFW66öæWŒ;VW2ãÂöÆ“à¢Â÷VÃà¢Çäì:6òW†—7FRVÒ;¦æ–6òÆ–Ö—FRVæ—fW'6ÂVR6—'f&FöFò6W'fœ:vòâ6ö×&R÷26Vì:&–÷2R&WWFœ:|:6òæòFV×ó¢W7F&–Æ–FFRöFR–×÷'F"Ö—2VRòÖ–÷"fÆ÷"FRF÷væÆöBW†–&–FòãÂ÷à ¢Æƒ#åF&VÆFRFV6—<:6ó¢òVR6F6öÖ&–æ:|:6ò6–væ–f–6Âöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#à¢ÇFƒä6&óÂ÷Fƒà¢ÇFƒåv’Ôf’W'FòFò&÷FVF÷#Â÷Fƒà¢ÇFƒä–çFW'&WF:|:6óÂ÷Fƒà¢ÇFƒå,;7†–Öò76óÂ÷Fƒà¢Â÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCä6öW&VçFRRW7L:fVÃÂ÷FCãÇFCä6öW&VçFRW'FóÂ÷FCãÇFCå&VfW,:¦æ6–FRVçG&FR,:F–ò,;7†–Ö÷2gVæ6–öæÓÂ÷FCãÇFCä6ö×&"ò<;FÖöFò'V–ÒRò&VÆ†òfWFFóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä6öW&VçFRRW7L:fVÃÂ÷FCãÇFCäFVw&FW'FóÂ÷FCãÇFCå&VFR6VÒf–ò÷R6Æ–VçFRÆ–Ö—FæFóÂ÷FCãÇFCä6ö×&"÷WG&ò&VÆ†òÂf—†Â6æÂR÷6–6–öæÖVçFóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäFVw&F&WWF–FÖVçFSÂ÷FCãÇFCäFVw&F§VçFóÂ÷FCãÇFCäVçG&VvÂ&÷FVF÷"÷RÆ–Ö—FRFòVæÆ6R6&VFóÂ÷FCãÇFCä6öæf—&Ö"æVvö6–:|:6òFòÆ–æ²R'&—"6†ÖFò6öÒ†—7L;7&–6óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä÷66–Æ×V—FòVçG&RÖVFœ:|;VW3Â÷FCãÇFCä÷66–Æ§VçFóÂ÷FCãÇFCä–ç7F&–Æ–FFRæòVæÆ6R÷R6GW&:|:6óÂ÷FCãÇFCå&Vv—7G&"†÷,:&–÷2R&V6ÆÖ"6öÒ†—7L;7&–6óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä&öÒÂÖ26öÒÆL:¦æ6–ÇFVÒ¦öv÷2R6†ÖF3Â÷FCãÇFCä–wVÃÂ÷FCãÇFCä6öævW7F–öæÖVçFòÂì:6òfÇFFRfVÆö6–FFSÂ÷FCãÇFCåfW&–f–6"VVÒ6öç6öÖR&æFR&–÷&—¦#Â÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#å6–æ—2FRVRò&ö&ÆVÖ:’Fò&÷fVF÷#Âöƒ#à¢ÇVÃà¢ÆÆ“åfVÆö6–FFR÷"6&ò6öç6—7FVçFVÖVçFR×V—Fò&—†òFò6öçG&FFòVÒl:&–÷2†÷,:&–÷2ãÂöÆ“à¢ÆÆ“åVVF27W'F2R&WWF–F2ÖW6Öò6öÒFöF÷2÷2&VÆ†÷2FW6Æ–vF÷2ãÂöÆ“à¢ÆÆ“åf—¦–æ†÷2æòÖW6Öò,:–F–ò÷R'V&VÆFæFòòÖW6Öò6ö×÷'FÖVçFòæòÖW6ÖòW,:ÖöFòãÂöÆ“à¢ÆÆ“äÇW¢FR6–æÂFòÖöFVÒÇFW&ææFòFRW7FFò6VÒ–çFW'fVì:|:6òãÂöÆ“à¢Â÷VÃà¢ÇäæW76W266÷2Âò&Vv—7G&òF÷2FW7FW2÷"6&òÂ6öÒFFR†÷&Â:’òVR7W7FVçFò6†ÖFòâ\:vì;¦ÖW&òFR&÷Fö6öÆòRfW&–f–6:|:6òFòVæÆ6RÂì:6òVæ2&V–ì:Ö6–ò&VÖ÷FòãÂ÷à ¢Æƒ#å6–æ—2FRVRò&ö&ÆVÖ:’–çFW&æóÂöƒ#à¢ÇVÃà¢ÆÆ“ä6&òVçG&Vv&VÒÂv’Ôf’ì:6ò(	B6Ì:76–6òFR6ö&W'GW&÷RFR&÷FVF÷"6öÒ÷V6÷2æ÷2FR&ö¦WFòãÂöÆ“à¢ÆÆ“äÆVçF–L:6ò<;2VÒVÒ<;FÖöFòÂG,:2FR&VFRw&÷76ÂÆ¦R÷R6—†B|:wVãÂöÆ“à¢ÆÆ“åVÒ;¦æ–6ò&VÆ†òÆVçFòVçVçFò÷2FVÖ—2æfVvÒæ÷&ÖÆÖVçFS¢òv&vÆò:’Fò&VÆ†òãÂöÆ“à¢ÆÆ“äÆVçF–L:6òVR6öÖ\:v6V×&RæòÖW6Öò†÷,:&–ò(	BÆw\:–Ò&—†æFòÂGVÆ—¦æFò÷Rf¦VæFò&6·WãÂöÆ“à¢Â÷VÃà ¢Æƒ#äòVRì:6ò&W6öÇfSÂöƒ#à¢ÇåG&ö6"òÆæò÷"VÒÖ—2,:–Fòì:6ò6÷'&–vR&VFR–çFW&æ¢6Ròv’Ôf’¬:ì:6òVçG&VvòVRW†—7FR†ö¦RÂVÆRì:6òVçG&Vv,:òFö'&òÖæŒ:2â&WWF–F÷"ÖÂ÷6–6–öæFò6÷7GVÖ–÷&"Â÷'VR&WWFRVÒ6–æÂg&6òâR&Æ–×"66†R"÷R&V–ç7FÆ"òæfVvF÷"ì:6òFVÒ&VÆ:|:6ò6öÒfVÆö6–FFRFòVæÆ6RãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çäf¢6VçF–Fò6†Ö"VæFò÷2FW7FW2–æF–6Ò&VFR–çFW&æR66W†–vR6&VÖVçFòÂöçFòF–6–öæÂ÷R7V'7F—GVœ:|:6òFRWV—ÖVçFò(	BÆæV¦ÖVçFòVRWf—F6ö×&"&VÆ†òW'&Fòâò6W'fœ:vòW7L:VÒÄÆ–æ²FóÒ"÷6W'f–6÷2÷&VFW2ÖR×v–f’"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&VFW2Rv’Ôf“ÂôÆ–æ³âÂRòFVæF–ÖVçFòæòVæFW&\:vòVÒÄÆ–æ²FóÒ"öFVæF–ÖVçFòÖFöÖ–6–Æ–ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æFVæF–ÖVçFòFöÖ–<:ÖÆ–óÂôÆ–æ³ââ6R–ç7F&–Æ–FFRf÷"W&ÖæVçFRÂ6öÖV6RVÆÆV—GW&FRÄÆ–æ²FóÒ"÷&ö&ÆVÖ2÷v–f’Ö–ç7FfVÂ"6Æ74æÖSÒ'FW‡BÖ66VçB#åv’Ôf’–ç7L:fVÃÂôÆ–æ³âãÂ÷à ¢ÄVF—F÷&–Å&VfW&Væ6W26ÇVsÒ&–çFW&æWBÖÆVçF×&÷fVF÷"Ö÷R×&÷FVF÷""óà¢Âóà¢’À¢ÒÀ ¢&–×&W76÷&ÖöffÆ–æRÖ6öÖò×&W6öÇfW"#¢°¢F—FÆS¢$–×&W76÷&öffÆ–æS¢÷"VR&V6R76–ÒR6öÖò&W6öÇfW""À¢W†6W'C ¢$òVRò7FGW2öffÆ–æR6–væ–f–6æòv–æF÷w2R6öÖò6W&"VæFW&\:vòFR&VFRW&F–FòÂf–ÆW6FRfÆ†FR6öæWŒ:6òçFW2FR&V–ç7FÆ"â"À¢FFS¢###bÓ‚Ó#b"À¢&VEF–ÖS¢#’Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#â$–×&W76÷&öffÆ–æR"V6RçVæ6VW"F—¦W"VR–×&W76÷&W7L:FW6Æ–vFâæÖ–÷&–F2fW¦W2VÆW7L:Æ–vFÂ6W6R6öæV7FF(	BòVR6RW&FWRfö’ò6Ö–æ†òL:’VÆãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çäò7FGW2öffÆ–æR6–væ–f–6VRòv–æF÷w2FVçF÷RfÆ"6öÒ–×&W76÷&Rì:6òö'FWfR&W7÷7FâVÒ&VFRÂ6W6Ö—26ö×VÒ:’Ç7G&öæsçG&ö6FòVæFW&\:vò•Â÷7G&öæsâFò&VÆ†ó²÷"6&òÂ:’÷'FÂ6&ò÷R6W'fœ:vòFR–×&W7<:6ò&FòâfW&–f—VRæW76÷&FVÓ¢&VÆ†ò6W6òR6VÒW'&òæò–æVÂÂVæFW&\:vòGVÂÂR<;2FWö—2ò6ögGv&RãÂ÷à ¢Æƒ#å÷"VRòVæFW&\:vò6RW&FSÂöƒ#à¢Çäò&÷FVF÷"VçG&VvVæFW&\:v÷2÷"V×,:—7F–ÖòR6öÒ&¦òâVæFò–×&W76÷&f–6FW6Æ–vFÌ:–ÒFò&¦òÂ÷RVæFòfÇFVæW&v–ÂVÆöFRföÇF"6öÒ÷WG&òVæFW&\:vòâòv–æF÷w26öçF–çV6†ÖæFòòVæFW&\:vòçF–vòÂì:6òVæ6öçG&æ–æw\:–ÒRÖ&6f–Æ6öÖòöffÆ–æRâ8’òÖW6ÖòÖ÷F—fòVÆòVÂ–×&W76÷&'6öÖR"FWö—2FRVÒf–ÒFR6VÖæãÂ÷à ¢Æƒ#å6W\:¦æ6–FRfW&–f–6:|:6óÂöƒ#à¢ÆöÃà¢ÆÆ“ãÇ7G&öæsäæò–æVÂF–×&W76÷&£Â÷7G&öæsâ6öæf—&ÖRVRì:6òŒ:f—6òFRVÂÂF×&W'FÂ6'GV6†ò÷RFöæW"â&VÆ†òVÒW'&òì:6ò&W7öæFR:&VFRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä–×&–Ö:v–æFR6öæf–wW&:|:6òFR&VFSÂ÷7G&öæsâVÆòÖVçRFò,;7&–ò&VÆ†òâVÆÖ÷7G&òVæFW&\:vòGVÂR6Ròv’Ôf’W7L:ÖW6Öò6öæV7FFòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6ö×&R6öÒ÷'F6F7G&Fæòv–æF÷w3Â÷7G&öæsâVÒ6öæf–wW&:|;VW2(i"&ÇVWFö÷F‚RF—7÷6—F—f÷2(i"–×&W76÷&2R66ææW'2(i"&÷&–VFFW2F–×&W76÷&(i"÷'F2âVæFW&\:v÷2F–fW&VçFW2W‡Æ–6ÒGVFòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6÷'&–¦÷'FÂ÷7G&öæsâöçFæFò&òVæFW&\:vòGVÂÂ÷R&V6F7G&RVÆ÷:|:6òFRF–6–öæ"÷"VæFW&\:vòD5ô•ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFW6Ö'VRòÖöFòöffÆ–æS£Â÷7G&öæsâ'&f–ÆR6öæf—&ÖRVR%W6"–×&W76÷&öffÆ–æR"R%W6"–×&W7<:6ò"W7L:6òFW6Ö&6F÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäf—†RòVæFW&\:vòæò&÷FVF÷#Â÷7G&öæsâ‡&W6W'f÷"VæFW&\:vòl:×6–6ò’&ò&ö&ÆVÖì:6òföÇF"ãÂöÆ“à¢ÂööÃà¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"Ö&÷&FW"&rÖ×WFVBóCÓBæ÷B×&÷6R×’Ób#à¢Ç6Æ74æÖSÒ&ÒÓFW‡B×6Ò#ãÇ7G&öæså&VFRFRf—6—FçFW2R—6öÆÖVçFó£Â÷7G&öæsâ×V—F÷2&÷FVF÷&W2–×VFVÒVR&VÆ†÷26öçfW'6VÒVçG&R6’æ&VFRFRf—6—FçFW2â–×&W76÷&æW76&VFR&V6RöffÆ–æRÖW6ÖògVæ6–öææFòâ6öÆ÷VR6ö×WFF÷"R–×&W76÷&æÖW6Ö&VFR&–æ6—ÂãÂ÷à¢Âö6–FSà ¢Æƒ#åF&VÆFRFV6—<:6ó¢6–çFöÖÂ6W6&÷l:fVÂR,;7†–Öò76óÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#à¢ÇFƒå6–çFöÖÂ÷Fƒà¢ÇFƒä6W6&÷l:fVÃÂ÷Fƒà¢ÇFƒå,;7†–Öò76óÂ÷Fƒà¢Â÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCäöffÆ–æR;72F–2FW6Æ–vFÂ÷FCãÇFCäVæFW&\:vòV×&W7FFòW‡—&÷SÂ÷FCãÇFCä6öæfW&—"VæFW&\:vòGVÂR7&–"&W6W'fæò&÷FVF÷#Â÷FCãÂ÷G#à¢ÇG#ãÇFCäöffÆ–æR<;2VÒVÒ6ö×WFF÷#Â÷FCãÇFCå÷'FçF–v6F7G&FæW76R6ö×WFF÷#Â÷FCãÇFCä6÷'&–v—"÷'FVæ2æVÆSÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäöffÆ–æRVÒFöF÷2Â&VÆ†ò6W6óÂ÷FCãÇFCä–×&W76÷&6—RFòv’Ôf“Â÷FCãÇFCå&V6öæV7F"VÆò–æVÂR6öæfW&—"&VFRW66öÆ†–FÂ÷FCãÂ÷G#à¢ÇG#ãÇFCåG&&Æ†÷2VçG&ÒRì:6ò6VÓÂ÷FCãÇFCäf–Æ÷R6W'fœ:vòFR–×&W7<:6òG&fFóÂ÷FCãÇFCåfW"ÄÆ–æ²FóÒ"ö&Æöröf–ÆÖFRÖ–×&W76ò×G&fF×7ööÆW"×v–æF÷w2"6Æ74æÖSÒ'FW‡BÖ66VçB#æf–ÆG&fFR7ööÆW#ÂôÆ–æ³ãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäöffÆ–æR÷"6&òU4#Â÷FCãÇFCä6&òÂ÷'F÷RVæW&v–Â÷FCãÇFCåG&ö6"÷'FR6&òÂFW7F"VÒ÷WG&ò6ö×WFF÷#Â÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#ä66÷2VÒVRò6ögGv&Rì:6ò:’ò7VÇFóÂöƒ#à¢Çä–×&W76÷&6öÒ6&\:vFR–×&W7<:6òVçGW–FÂVæw&VævVÒVV'&FÂ6Vç6÷"FRVÂ7V¦ò÷RföçFR6öÒFVfV—FòFÖ,:–ÒFV—†FR&W7öæFW"(	BÖ2Â:ÒÂò–æVÂ6÷7GVÖÖ÷7G&"W'&òl:×6–6òRò&VÆ†òf¢&'VÆ†òæ÷&ÖÂ÷RæVÒ–æ–6–Æ—¦â&V–ç7FÆ"G&—fW"æW76R6Vì:&–ò<;26öç6öÖRFV×òãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòòVæFW&\:vòW7F—fW"6÷'&WFòRò&VÆ†ò6öçF–çV"×VFòÂVæFò†÷WfW"l:&–2Ü:V–æ2–×&–Ö–æFòVÒVÒ6W'f–F÷"FR–×&W7<:6òÂVæFò&VFRF—fW"6VvÖVçF:|:6òVçG&R6WF÷&W2Â÷RVæFòò–æVÂ–æF–6"fÆ†ÖV<:&æ–6â6öæf–wW&:|:6ò–æ–6–ÂR6F7G&ò6÷'&WFòW7L:6òFW67&—F÷2VÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖ–ç7FÆ"Ö–×&W76÷&×v–æF÷w2×76òÖ×76ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖò–ç7FÆ"–×&W76÷&æòv–æF÷w3ÂôÆ–æ³ã²òFVæF–ÖVçFòf–6VÒÄÆ–æ²FóÒ"÷6W'f–6÷2÷&VFW2ÖR×v–f’"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&VFW2Rv’Ôf“ÂôÆ–æ³âRfÆ–:|:6òVÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&f–ÆÖFRÖ–×&W76ò×G&fF×7ööÆW"×v–æF÷w2#¢°¢F—FÆS¢$f–ÆFR–×&W7<:6òG&fF¢6öÖòFW7G&f"ò7ööÆW"Fòv–æF÷w2"À¢W†6W'C ¢$òVR:’ò6W'fœ:vòFR7ööÆW"Â÷"VRf–ÆG&f6öÒFö7VÖVçF÷2&W6÷2VÒÂ&W†6ÇV–æFõÂ"Rò&ö6VF–ÖVçFò6÷'&WFò&Æ–×"6VÒ&V–ç7FÆ"–×&W76÷&â"À¢FFS¢###bÓ‚Ó#b"À¢&VEF–ÖS¢#‚Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#äFö7VÖVçFò&Fòæf–ÆÂ&÷L:6òFR6æ6VÆ"6VÒVfV—FòRÖVç6vVÒ&W†6ÇV–æFò"VRçVæ6FW&Ö–æ¢W76R:’ò6ö×÷'FÖVçFò6Ì:76–6òFR7ööÆW"G&fFòâò&ö6VF–ÖVçFò&&W6öÇfW":’7W'Fò(	BRì:6ò76÷"&V–ç7FÆ"–×&W76÷&ãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çäòv–æF÷w2ì:6òVçf–òFö7VÖVçFòF—&WFòò&VÆ†ó¢VÆRw&fVÒ'V—fòFV×÷,:&–òRVÒ6W'fœ:vò6†ÖFòÇ7G&öæsç7ööÆW"FR–×&W7<:6óÂ÷7G&öæsâ7V–FFòVçf–òâVæFòW76R'V—fò6÷'&ö×RÂò6W'fœ:vòG&fRf–Æ6öævVÆâ6÷'&\:|:6ò:’&"ò6W'fœ:vòÂv"÷2'V—f÷2FV×÷,:&–÷2FR–×&W7<:6òR–æ–6–"ò6W'fœ:vòFRæ÷fòãÂ÷à ¢Æƒ#å÷"VRf–ÆG&fÂöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsåG&&Æ†ò6÷'&ö×–Fó£Â÷7G&öæsâFö7VÖVçFòW6FòÂ–×&W7<:6ò–çFW'&ö×–FæòÖV–ò÷RFW6Æ–vÖVçFòGW&çFRòVçf–òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä–×&W76÷&–æÆ6ì:|:fVÃ£Â÷7G&öæsâòG&&Æ†òf–6&W6òW7W&æFòVÒ&VÆ†òVR×VF÷RFRVæFW&\:vò(	BæW76R66òòVG&ò:’òFRÄÆ–æ²FóÒ"ö&Æörö–×&W76÷&ÖöffÆ–æRÖ6öÖò×&W6öÇfW""6Æ74æÖSÒ'FW‡BÖ66VçB#æ–×&W76÷&öffÆ–æSÂôÆ–æ³âãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäG&—fW"–æ6ö×L:×fVÃÂ÷7G&öæsâ;72GVÆ—¦:|:6òFò6—7FVÖãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäfÇFFRW7:vòVÒF—66óÂ÷7G&öæsâæVæ–FFRFò6—7FVÖÂöæFR÷2'V—f÷2FV×÷,:&–÷2<:6òw&fF÷2ãÂöÆ“à¢Â÷VÃà ¢Æƒ#å&ö6VF–ÖVçFòFRÆ–×W¦Âöƒ#à¢ÆöÃà¢ÆÆ“ãÇ7G&öæsä'&÷26W'fœ:v÷3Â÷7G&öæsâ‡FV6Æv–æF÷w2²"ÂF–v—FRÆ6öFSç6W'f–6W2æ×63Âö6öFSâ’âÆö6Æ—¦RÇ7G&öæså7ööÆW"FR–×&W7<:6óÂ÷7G&öæsâR6Æ—VRVÒ&"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6öÒò6W'fœ:vò&FóÂ÷7G&öæsâÂ'&Æ6öFSä3¥Åv–æF÷w5Å7—7FVÓ3%Ç7ööÅÅ$”åDU%3Âö6öFSâRwVRFöFòò6öçF\;¦FòF7Fâv"W76W2'V—f÷2ì:6ò&VÖ÷fR–×&W76÷&2æVÒG&—fW'2(	B<:6òVæ2G&&Æ†÷2VæFVçFW2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåföÇFR÷26W'fœ:v÷3Â÷7G&öæsâR6Æ—VRVÒ–æ–6–"æò7ööÆW"FR–×&W7<:6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&VVçf–RVÒFö7VÖVçFò6–×ÆW3Â÷7G&öæsâÂFRVÖ:v–æÂ&6öæf—&Ö"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6RG&f"FRæ÷fòæòÖW6ÖòFö7VÖVçFóÂ÷7G&öæsâÂò'V—fò:’6W6¢W‡÷'FR&DbR–×&–Ö'F—"FòDbãÂöÆ“à¢ÂööÃà¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"Ö&÷&FW"&rÖ×WFVBóCÓBæ÷B×&÷6R×’Ób#à¢Ç6Æ74æÖSÒ&ÒÓFW‡B×6Ò#ãÇ7G&öæsäÖ&–VçFR6÷'÷&F—fó£Â÷7G&öæsâVÒ6ö×WFF÷&W2vW&Væ6–F÷2Â&"6W'fœ:v÷2Rv"7F2Fò6—7FVÖöFRW†–v—"W&Ö—7<:6òFÖ–æ—7G&F—fR6öçG&&–"öÌ:×F–6–çFW&æâG&FR6öÒVVÒFÖ–æ—7G&&VFRçFW2ãÂ÷à¢Âö6–FSà ¢Æƒ#åF&VÆFRFV6—<:6ó¢6–çFöÖÂ6W6&÷l:fVÂR,;7†–Öò76óÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#à¢ÇFƒå6–çFöÖÂ÷Fƒà¢ÇFƒä6W6&÷l:fVÃÂ÷Fƒà¢ÇFƒå,;7†–Öò76óÂ÷Fƒà¢Â÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCäFö7VÖVçFò&W6òVÒ&W†6ÇV–æFò#Â÷FCãÇFCä'V—fòFRG&&Æ†ò6÷'&ö×–FóÂ÷FCãÇFCå&"ò7ööÆW"ÂÆ–×"7FR–æ–6–"FRæ÷fóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäf–ÆVæ6†RRæF6’Â–×&W76÷&6W6Â÷FCãÇFCä&VÆ†ò–æÆ6ì:|:fVÂæ&VFSÂ÷FCãÇFCä6öæfW&—"VæFW&\:vòR÷'FçFW2FRÖW†W"æò7ööÆW#Â÷FCãÂ÷G#à¢ÇG#ãÇFCåG&f6V×&RæòÖW6Öò'V—fóÂ÷FCãÇFCäFö7VÖVçFò&ö&ÆVÜ:F–6óÂ÷FCãÇFCäW‡÷'F"&DbR–×&–Ö—"'F—"FVÆSÂ÷FCãÂ÷G#à¢ÇG#ãÇFCå7ööÆW"&6÷¦–æ†òFöF†÷&Â÷FCãÇFCäG&—fW"–æ6ö×L:×fVÂ;72GVÆ—¦:|:6óÂ÷FCãÇFCå&V–ç7FÆ"òG&—fW"öf–6–ÂFòÖöFVÆóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäW'&òòw&f"G&&Æ†óÂ÷FCãÇFCäF—66òFò6—7FVÖ6VÒW7:vóÂ÷FCãÇFCäÆ–&W&"W7:vòR&WWF—"–×&W7<:6óÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#åVæFòòG&—fW":’ò&ö&ÆVÖÂöƒ#à¢Çå6Rò7ööÆW"6—"&WWF–FÖVçFRÆövò;726FVçf–òÂ7W7V—F76&òG&—fW"â&VÖ÷f–×&W76÷&Â&V–æ–6–RR–ç7FÆRò6÷FRöf–6–ÂFòÖöFVÆòW†FòÂ&—†FòFòf'&–6çFR(	B6÷FW2vVì:—&–6÷26÷7GVÖÒ–×&–Ö—"ÂÖ2fÆ†ÒVÒ&V7W'6÷2FRGWÆW‚Â&æFV¦R6&ÖVçFòâ6W\:¦æ6–6ö×ÆWFFR6F7G&òW7L:VÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖ–ç7FÆ"Ö–×&W76÷&×v–æF÷w2×76òÖ×76ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖò–ç7FÆ"–×&W76÷&æòv–æF÷w3ÂôÆ–æ³âãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòò7ööÆW"G&f"VÒl:&–÷26ö×WFF÷&W2òÖW6ÖòFV×ò†–æL:Ö6–òFR6W'f–F÷"FR–×&W7<:6ò÷RG&—fW"6ö×'F–Æ†Fò6öÒFVfV—Fò’ÂVæFòò6ö×WFF÷"f÷"vW&Væ6–Fò÷"VÖV×&W6Â÷RVæFò–×&W7<:6ò&"§VçFò6öÒ÷WG&÷26–çFöÖ2FR6—7FVÖâò7W÷'FRW7F:|;VW2R&VFRW7L:VÒÄÆ–æ²FóÒ"÷6W'f–6÷2÷&VFW2ÖR×v–f’"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&VFW2Rv’Ôf“ÂôÆ–æ³âÂRfÆ–:|:6òVÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢òò)H)HöæF2(	BÆ÷FR3¢&Ö¦VæÖVçFòì:6òFWFV7FFò†6ÇW7FW"r’à¢&†BÖæòÖR×&V6öæ†V6–FòÖæÖ&–÷2Öò×VRÖf¦W"#¢°¢F—FÆS¢$6ö×WFF÷"ì:6ò&V6öæ†V6R„B÷R54C¢$”õ2Âv–æF÷w2RòVRfW&–f–6""À¢W†6W'C ¢%2ì:6ò&V6öæ†V6R„B÷R54Cò6W&R$”õ2õTTd’FRv–æF÷w2Â&÷FV¦FF÷2W†—7FVçFW2RFW7FR6öæWŒ:6òÂ6ö×F–&–Æ–FFRRFWFV<:|:6ò6VÒ–æ–6–Æ—¦"Væ–FFR÷"Vævæòâ"À¢FFS¢###bÓ‚Ó#b"À¢&VEF–ÖS¢#"Ö–â"À¢6FVv÷'“¢$F–vì;77F–6ò"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#åVæFòò6ö×WFF÷"ì:6ò&V6öæ†V6R„B÷R54BÂf:v&–ÖV—&òVÖ6W&:|:6òVR&÷FVvR÷2FF÷3¢Væ–FFR&V6Ræ$”õ2õTTd’ÂæòvW&Væ6–ÖVçFòFRF—66òFòv–æF÷w2Âæ÷2Fö—2÷RVÒæVæ‡VÓò6RòF—66ò¬:F–æ†'V—f÷2Âì:6ò–æ–6–Æ—¦RÂì:6òf÷&ÖFRRì:6ò7&–R'Fœ:|:6òVæ2÷'VRòv–æF÷w2öfW&V6WRW76÷:|:6òâ'F—"FW76ÆV—GW&Â–çfW7F–wVR6öæf–wW&:|:6òÂ6ö×F–&–Æ–FFRÂÆ–ÖVçF:|:6òÂ6&òÂ÷'FÂ6Æ÷BR,;7&–Væ–FFR6VÒW67&WfW"æVÆ÷"FVçFF—fãÂ÷à ¢Æƒ#å2ì:6ò&V6öæ†V6R„C¢$”õ2÷Rv–æF÷w3óÂöƒ#à¢Çä'&FVÆFR&Ö¦VæÖVçFòF$”õ2õTTd’R&ö7W&RòÖöFVÆòFòF—66òâW76fW&–f–6:|:6ò×VFFöFòòF–vì;77F–6ó¢Ç7G&öæsç&W6VçFRæ$”õ2RW6VçFRæòv–æF÷w3Â÷7G&öæsâöçF&6öæf–wW&:|:6òFò6—7FVÖ²Ç7G&öæsæW6VçFRæ÷2Fö—3Â÷7G&öæsâöçF&6öæWŒ:6òÂ6ö×F–&–Æ–FFRÂÆ–ÖVçF:|:6ò÷RfÆ†l:×6–6âVÒÜ:ÖF–6öÒ'V—f÷2–×÷'FçFW2Âì:6ò–æ–6–Æ—¦RæVÒf÷&ÖFR&(	ÇfW"6RföÇF(	ÒãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çå6RVæ–FFRì:6ò&V6Ræ$”õ2õTTd’Âòf—&×v&Rì:6ò6öç6VwV—RVçVÖW,:ÖÆæVVÆR6Ö–æ†òâ—76òöFRVçföÇfW"6öæf–wW&:|:6òFòf—&×v&RÂ6ö×F–&–Æ–FFRFò6Æ÷BÂ6ö×'F–Æ†ÖVçFòFR÷'F2ÂÆ–ÖVçF:|:6òÂ6öæWŒ:6ò÷RfÆ†F,;7&–Væ–FFRâ6R&V6Ræòf—&×v&RR6öÖRVæ2æòv–æF÷w2ÂòF–vì;77F–6ò×VF&W7FFòFòF—66òÂ'Fœ:|;VW2ÂÆWG&FRVæ–FFRÂG&—fW"ö6öçG&öÆF÷"R6öæf–wW&:|:6òFò6—7FVÖâòö&¦WF—fò:’Æö6Æ—¦"VÒVÂ6ÖFFWFV<:|:6ò&(	B6VÒG&ç6f÷&Ö"VÒ&ö&ÆVÖFRÆV—GW&VÒW&FFRFF÷2ãÂ÷à ¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"Ö&÷&FW"&rÖ×WFVBóCÓBæ÷B×&÷6R×’Ób#à¢Ç6Æ74æÖSÒ&ÒÓFW‡B×6Ò#ãÇ7G&öæsäçFW2FRVÇVW"6ö—6£Â÷7G&öæsâ6RVæ–FFRFVÒ'V—f÷26VÒ<;7–Â&W6VçFFW66öæWŒ;VW2&WWF–F2Â'\:ÖFòæ÷&ÖÂVÒ„BÖV<:&æ–6ò÷RFW6&V6RGW&çFRÆV—GW&Â&R÷2FW7FW2FW7G'WF—f÷2âì:6ò–æ–6–Æ—¦RÂì:6òf÷&ÖFRÂì:6ò&V–ç7FÆRò6—7FVÖRì:6ò&öFRfW'&ÖVçF2FR(	Ç&W&þ(	ÒVRw&fVÒæÜ:ÖF–âòö&¦WF—fò766W"&W6W'f"òW7FFò&ÄÆ–æ²FóÒ"÷6W'f–6÷2÷&V7WW&6òÖFRÖFF÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#æfÆ–:|:6òFR&V7WW&:|:6òFRFF÷3ÂôÆ–æ³âãÂ÷à¢Âö6–FSà ¢Æƒ#å6W\:¦æ6–FRfW&–f–6:|:6óÂöƒ#à¢ÆöÃà¢ÆÆ“ãÇ7G&öæsä6öæf—&ÖR6ÖFFfÆ†ãÂ÷7G&öæsâ&ö7W&RVæ–FFRæ$”õ2õTTd’RFWö—2æòvW&Væ6–ÖVçFòFRF—66òâÆwVç2f—&×v&W26W&Ò4DÂådÖRRÒã"VÒFVÆ2F–fW&VçFW2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä–FVçF–f—VR–çFW&f6RR6ö×F–&–Æ–FFRãÂ÷7G&öæsâÒã":’f÷&ÖFòl:×6–6ó²ò6Æ÷BöFR6V—F"ådÖRÂ4D÷RÖ&÷2â6öç7VÇFRòÖçVÂFÆ6÷RFòæ÷FV&öö²çFW2FRÖ÷fW"Væ–FFRVçG&R6Æ÷G2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6Rf÷"'&—"òWV—ÖVçFòÂFW6Æ–wVRRFW66öæV7FRÆ–ÖVçF:|:6òãÂ÷7G&öæsâVÒæ÷FV&öö²6öÒ&FW&––çFW&æÂ6–vò&ö6VF–ÖVçFòFR—6öÆÖVçFòFòf'&–6çFS²6VÒÖçVÂ÷R6W76ò6VwW&òÂì:6ò–×&÷f—6RãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäVÒFW6·F÷4DÃÂ÷7G&öæsâfW&–f—VRVæ6—†RFò6&òFRFF÷2RÆ–ÖVçF:|:6òRÂVæFò†÷WfW"6VwW&ì:v&—76òÂFW7FR6&òR÷'F6öæ†V6–F÷26öÖògVæ6–öæ—2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäVÒÒã"ÃÂ÷7G&öæsâ6öæf—&ÖRF—òÂ6†fRÂ6ö×&–ÖVçFòÂ6Æ÷B6÷'&WFòRWfVçGV—2&Vw&2FR6ö×'F–Æ†ÖVçFò6öÒ÷'F24DæòÖçVÂFÆ6ÖÜ:6RãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6Ròf—&×v&RFWFV7FRòv–æF÷w2ì:6òÖ÷7G&æòW‡Æ÷&F÷"ÃÂ÷7G&öæsâ'&òvW&Væ6–ÖVçFòFRF—66òçFW2FRÖW†W"VÒ†&Gv&RâVÒF—66òöFRW7F"öffÆ–æRÂ6VÒÆWG&÷R6VÒföÇVÖRÖöçFFòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä÷WG&ò6ö×WFF÷"÷RFFF÷":’Væ2Wf–L:¦æ6–F–6–öæÂãÂ÷7G&öæsâ6RVæ–FFR6öçF–çV"W6VçFRÂ—76òVÖVçF7W7V—F6ö'&RVÆÂÖ26ö×F–&–Æ–FFRFòFFF÷"RFò&÷Fö6öÆòFÖ,:–Ò&V6—6Ò6W"6öç6–FW&F2ãÂöÆ“à¢ÂööÃà ¢Æƒ#åF&VÆFRFV6—<:6óÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#à¢ÇFƒå6–æÂö'6W'fFóÂ÷Fƒà¢ÇFƒä6W6&÷l:fVÃÂ÷Fƒà¢ÇFƒå,;7†–Öò76óÂ÷Fƒà¢Â÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCä„Bì:6òv—&÷Rì:6òL:6–æ—2FRÆ–ÖVçF:|:6óÂ÷FCãÇFCäÆ–ÖVçF:|:6òÂ6öæWŒ:6ò÷RVÆWG,;Fæ–6FVæ–FFSÂ÷FCãÇFCäì:6ò6öæ6ÇV—"FVfV—Fò<;2VÆòF÷VS²fW&–f–6"Æ–ÖVçF:|:6òFRf÷&Ö6VwW&Â÷FCãÂ÷G#à¢ÇG#ãÇFCåVæ–FFR6öÖRF$”õ2õTTd’RFòv–æF÷w3Â÷FCãÇFCä6öæf–wW&:|:6òÂ6ö×F–&–Æ–FFRÂ÷'FÂ6&òÂÆ–ÖVçF:|:6ò÷RVæ–FFSÂ÷FCãÇFCä6öÖ\:v"VÆòÖçVÂRVÆò6Ö–æ†òl:×6–6òÂ6VÒ–æ–6–Æ—¦"Ü:ÖF–Â÷FCãÂ÷G#à¢ÇG#ãÇFCä&V6RR6öÖRVçG&R&V–ì:Ö6–÷3Â÷FCãÇFCä6öæWŒ:6òÂÆ–ÖVçF:|:6òÂ6öçG&öÆF÷"÷RVæ–FFR–ç7L:fVÃÂ÷FCãÇFCä–çFW'&ö×W"w&f:|;VW2R&Vv—7G&"VÒVÂ6ÖFVæ–FFRFW6&V6SÂ÷FCãÂ÷G#à¢ÇG#ãÇFCå54BÒã"æ÷fò6ö–æ6–FR6öÒ÷'F4DVRFV—†÷RFR&V6W#Â÷FCãÇFCå÷7<:×fVÂ6ö×'F–Æ†ÖVçFòFR&V7W'6÷3Â÷FCãÇFCä6öç7VÇF"F&VÆFR6Æ÷G2÷÷'F2Fòf'&–6çFSÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä„BÖV<:&æ–6òf¢6Æ—VRÂ&7vVÒ÷R'\:ÖFòæ÷fòR&WWF—F—fóÂ÷FCãÇFCå÷7<:×fVÂfÆ†l:×6–6Â÷FCãÇFCå&"FW7FW2FRW67&—FR&–÷&—¦"÷2FF÷3Â÷FCãÂ÷G#à¢ÇG#ãÇFCä&V6Ræ$”õ2ÂÖ2ò6—7FVÖì:6ò–æ–6–Â÷FCãÇFCä&ö÷BÂ'Fœ:|:6òÂ6'&VvF÷"FR–æ–6–Æ—¦:|:6ò÷R6—7FVÖÂ÷FCãÇFCåfW"ÄÆ–æ²FóÒ"ö&ÆöröW'&òÖæòÖ&ö÷F&ÆRÖFWf–6RÖ6öÖò×&W6öÇfW""6Æ74æÖSÒ'FW‡BÖ66VçB#ææò&ö÷F&ÆRFWf–6SÂôÆ–æ³ãÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#åVæFòòF—66ò&V6Ræ$”õ2ÂÖ2ì:6òæòv–æF÷w3Âöƒ#à¢Çä'&òvW&Væ6–ÖVçFòFRF—66òRö'6W'fRòW7FFòçFW2FR6Æ–6"VÒVÇVW"÷:|:6òâVÖVæ–FFRÇ7G&öæsææ÷fRf¦–Â÷7G&öæsâöFR&V6—6"6W"–æ–6–Æ—¦F&W6ó²VÖVæ–FFRVR¬:F–æ†FF÷2ì:6òFWfR6W"G&FF6öÖò(	Ææ÷f(	Ò<;2÷'VRòv–æF÷w2Ö÷7G&6öÖòFW66öæ†V6–F÷Rì:6ò–æ–6–Æ—¦Fâ,;7&–Fö7VÖVçF:|:6òFÖ–7&÷6ögBÆ–Ö—Fò&ö6VF–ÖVçFòFR–æ–6–Æ—¦:|:6òòF—66òæ÷fò6VÒFF÷2W†—7FVçFW2âfV¦FÖ,:–ÒÄÆ–æ²FóÒ"ö&Æör÷76BÖçfÖRÖæòÖ&V6RÖæòÖvW&Væ6–F÷"ÖFRÖF—66÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#å54Bì:6ò&V6RæòvW&Væ6–F÷"FRF—66÷3ÂôÆ–æ³âãÂ÷à ¢Æƒ#åVæFòò6WGW'&RæòÇVv"Fò6—7FVÖÂöƒ#à¢Çå6RÜ:V–æVçG&F—&WFòæFVÆFR6öæf–wW&:|:6ò6V×&RVRÆ–vÂòF—66òöFRL:’W7F":ÖçFVw&ò(	Bòf—&×v&R:’VRì:6òVæ6öçG&÷RVÒÇfòFR'F–Fl:Æ–Fòâò6Ö–æ†òW7L:VÒÄÆ–æ²FóÒ"ö&Æörö6ö×WFF÷"ÖVçG&ÖF—&WFòÖæÖ&–÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6ö×WFF÷"VçG&F—&WFòæ$”õ3ÂôÆ–æ³âRÂVÒ66òFRG&ö6&V6VçFRÂVÒÄÆ–æ²FóÒ"ö&Æör÷G&÷VV’Öò×76BÖRÖò×2×6òÖ'&RÖÖ&–÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#çG&÷VV’ò54BRò2<;2'&R$”õ3ÂôÆ–æ³âãÂ÷à ¢Æƒ#ä7&—L:—&–÷2FR&FÂöƒ#à¢ÇVÃà¢ÆÆ“äVæ–FFR6öçL:–ÒFF÷2;¦æ–6÷2Ròv–æF÷w2VFR–æ–6–Æ—¦:|:6ò÷Rf÷&ÖF:|:6òãÂöÆ“à¢ÆÆ“äò„BÖV<:&æ–6ò76÷RVÖ—F—"'\:ÖFòæ÷&ÖÂ÷RVæ–FFRFW66öæV7FGW&çFRÆV—GW&ãÂöÆ“à¢ÆÆ“äòWV—ÖVçFòFVÒ6†V—&òÂVV6–ÖVçFòæ÷&ÖÂ÷RFW6Æ–vGW&çFRòFW7FRãÂöÆ“à¢ÆÆ“ä&W'GW&W†–vR&VÖ÷fW"&FW&––çFW&æ÷R6ö×öæVçFW26VÒ&ö6VF–ÖVçFò6öæfœ:fVÂFòf'&–6çFRãÂöÆ“à¢Â÷VÃà ¢Æƒ#äföçFW2&–Ü:&–3Âöƒ#à¢ÇVÃà¢ÆÆ“ãÆ‡&VcÒ&‡GG3¢òöÆV&âæÖ–7&÷6ögBæ6öÒ÷BÖ'"÷v–æF÷w2×6W'fW"÷7F÷&vRöF—6²ÖÖævVÖVçBö÷fW'f–WrÖöbÖF—6²ÖÖævVÖVçB"F&vWCÒ%ö&Ææ²"&VÃÒ&æ÷&VfW'&W""6Æ74æÖSÒ'FW‡BÖ66VçB#äÖ–7&÷6ögBÆV&â(	Bf—<:6òvW&ÂFòvW&Væ6–ÖVçFòFRF—66óÂöã¢&VfW,:¦æ6–&–FVçF–f–6"F—66÷2ÂföÇVÖW2R'Fœ:|;VW2æòv–æF÷w2ãÂöÆ“à¢ÆÆ“ãÆ‡&VcÒ&‡GG3¢òöÆV&âæÖ–7&÷6ögBæ6öÒ÷BÖ'"÷v–æF÷w2×6W'fW"÷7F÷&vRöF—6²ÖÖævVÖVçBö–æ—F–Æ—¦RÖæWrÖF—6·2"F&vWCÒ%ö&Ææ²"&VÃÒ&æ÷&VfW'&W""6Æ74æÖSÒ'FW‡BÖ66VçB#äÖ–7&÷6ögBÆV&â(	B–æ–6–Æ—¦"æ÷f÷2F—66÷3Âöã¢ò&ö6VF–ÖVçFò:’FW67&—Fò&F—66òæ÷fò6VÒFF÷2W†—7FVçFW2RG&¢ÆW'F&&W6W'f"FF÷2FRVæ–FFW2¬:W6F2ãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFò†÷WfW"FF÷26VÒ<;7–Â'\:ÖFòæ÷&ÖÂÂFW66öæWŒ:6ò–çFW&Ö—FVçFR÷RL;§f–F6RVæ–FFRFVÒ–æf÷&Ö:|:6òVR&V6—66W"&W6W'fFâVÒ&V7WW&:|:6òÂò&–ÖV—&òö&¦WF—fò:’Wf—F"W67&—FFW6æV6W7<:&–RW66öÆ†W"VÖW7G&L:–v–FRV—6œ:|:6òFWVFòW7FFòFÜ:ÖF–(	Bì:6ò(	Æ6öç6W'F.(	ÒW7G'WGW&÷"FVçFF—fâ6ö×&RÄÆ–æ²FóÒ"ö&Æörö6öÖò×&V7WW&"ÖFF÷2Ö†BÖ6öÒÖFVfV—Fò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖò&V7WW&"FF÷2FR„B6öÒFVfV—FóÂôÆ–æ³âRÂ6R&VfW&—"fÆ–:|:6ò&W6Væ6–ÂÂÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢'76BÖçfÖRÖæòÖ&V6RÖæòÖvW&Væ6–F÷"ÖFRÖF—66÷2#¢°¢F—FÆS¢%54B&V6Ræ$”õ2Ö2ì:6òæòv–æF÷w3¢6öÖò–æ–6–Æ—¦"òF—66ò"À¢W†6W'C ¢$F—66òæ÷fò6†Vv6VÒ–æ–6–Æ—¦:|:6òÂ6VÒ'Fœ:|:6òR6VÒÆWG&âòVRf¦W"æòvW&Væ6–ÖVçFòFRF—66òÂ6öÖòW66öÆ†W"uB÷RÔ%"Rò7V–FFòçFW2FRÖW†W"VÒF—66ò6öÒFF÷2â"À¢FFS¢###bÓ‚Ó#b"À¢&VEF–ÖS¢#’Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#åVæFòòF—66ò:’Æ—7FFòæò6WGWÖ2ì:6ò&V6RVÒ$W7FR6ö×WFF÷""Âò†&Gv&R¬:W7L:&W6öÇf–FòâfÇFVæ2ò76òVRòv–æF÷w2ì:6òf¢6÷¦–æ†ó¢–æ–6–Æ—¦"Â'F–6–öæ"RG&–'V—"VÖÆWG&ãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢ÇäòW‡Æ÷&F÷"FR'V—f÷2<;2Ö÷7G&föÇVÖW2f÷&ÖFF÷2R6öÒÆWG&âF—66òFRl:'&–66†Vvf¦–òÂ6VÒF&VÆFR'Fœ:|:6ò(	B÷"—76òVÆRW†—7FR&$”õ2R&òvW&Væ6–ÖVçFòFRF—66òÂÖ2ì:6ò&:&VFRG&&Æ†òâò&ö6VF–ÖVçFòÆWf÷V6÷2Ö–çWF÷2Rì:6òW†–vR&öw&ÖW‡G&ãÂ÷à ¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"Ö&÷&FW"&rÖ×WFVBóCÓBæ÷B×&÷6R×’Ób#à¢Ç6Æ74æÖSÒ&ÒÓFW‡B×6Ò#ãÇ7G&öæsä7V–FFòVR×VFGVFó£Â÷7G&öæsâ–æ–6–Æ—¦"Â'F–6–öæ"Rf÷&ÖF"<:6ò÷W&:|;VW2FRW67&—FâVÒF—66òæ÷fòÂ6VÒ6öçF\;¦FòÂì:6òŒ:&—66òâVÒF—66òW6FòVR'7VÖ—R"6öÒ'V—f÷2FVçG&òÂW762ÖW6Ö2÷W&:|;VW2FW7G&öVÒòVR–æFöF–6W"&V7WW&Fòâ6RŒ:FF÷2–×÷'FçFW2Âì:6ò6V—FR7VvW7L:6òFRf÷&ÖF#¢G&FR6öÖòÄÆ–æ²FóÒ"÷6W'f–6÷2÷&V7WW&6òÖFRÖFF÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&V7WW&:|:6òFRFF÷3ÂôÆ–æ³âãÂ÷à¢Âö6–FSà ¢Æƒ#å76ò76òæòvW&Væ6–ÖVçFòFRF—66óÂöƒ#à¢ÆöÃà¢ÆÆ“ãÇ7G&öæsä'&Â÷7G&öæsâ6öÒv–æF÷w2²‚(i"vW&Væ6–ÖVçFòFRF—66ò†÷RFV6Æv–æF÷w2²"RÆ6öFSæF—6¶Öv×Bæ×63Âö6öFSâ’ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÆö6Æ—¦RòF—66óÂ÷7G&öæsâæÆ—7F–æfW&–÷"â6öæf—&òFÖæ†ò&ì:6ò6öægVæF—"6öÒVæ–FFRFò6—7FVÖãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6R&V6W"$ì:6ò–æ–6–Æ—¦Fò#Â÷7G&öæsâÂ6Æ—VR6öÒò&÷L:6òF—&V—FòæòæöÖRFòF—66ò(i"–æ–6–Æ—¦"F—66òâW66öÆ†Ç7G&öæsäuCÂ÷7G&öæsâVÒÜ:V–æ2ÖöFW&æ26öÒTTd“²Ô%"<;2f¢6VçF–FòVÒWV—ÖVçF÷2çF–v÷2÷R6ö×F–&–Æ–FFRW7V<:Öf–6ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6R&V6W"$ì:6òÆö6Fò#Â÷7G&öæsâÂ6Æ—VR6öÒò&÷L:6òF—&V—Fòæf—†(i"æ÷fòföÇVÖR6–×ÆW2â6V—FRòFÖæ†òF÷FÂÂW66öÆ†VÖÆWG&Rf÷&ÖFRVÒåDe26öÒÆö6:|:6òG,:6òâW6R,;7GVÆòFW67&—F—fò‚$FF÷2"Â$&6·W"’ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6RòföÇVÖRW†—7FRÖ2W7L:6VÒÆWG&Â÷7G&öæsâÂW6RÇFW&"ÆWG&FVæ–FFRR6Ö–æ†÷2(i"F–6–öæ"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6öæf—&ÖSÂ÷7G&öæsâ'&–æFòòW‡Æ÷&F÷"R6÷–æFòVÒ'V—fòWVVæòãÂöÆ“à¢ÂööÃà ¢Æƒ#åF&VÆFRW7FF÷2æòvW&Væ6–ÖVçFòFRF—66óÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#à¢ÇFƒäW7FFòÖ÷7G&FóÂ÷Fƒà¢ÇFƒå6–væ–f–6FóÂ÷Fƒà¢ÇFƒå,;7†–Öò76óÂ÷Fƒà¢Â÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCäì:6ò–æ–6–Æ—¦FóÂ÷FCãÇFCå6VÒF&VÆFR'Fœ:|:6óÂ÷FCãÇFCä–æ–6–Æ—¦"VÒuB†F—66òæ÷fò“Â÷FCãÂ÷G#à¢ÇG#ãÇFCäì:6òÆö6FóÂ÷FCãÇFCä–æ–6–Æ—¦FòÂ6VÒföÇVÖSÂ÷FCãÇFCä7&–"æ÷fòföÇVÖR6–×ÆW2Rf÷&ÖF#Â÷FCãÂ÷G#à¢ÇG#ãÇFCì8ÖçFVw&òÂ6VÒÆWG&Â÷FCãÇFCåföÇVÖRW†—7FRÂì:6òÖöçFFóÂ÷FCãÇFCäG&–'V—"ÆWG&FRVæ–FFSÂ÷FCãÂ÷G#à¢ÇG#ãÇFCå$sÂ÷FCãÇFCå6—7FVÖFR'V—f÷2–ÆV|:×fVÃÂ÷FCãÇFCäì:6òf÷&ÖF"6R†÷WfW"FF÷3¢fÆ–"&V7WW&:|:6óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäöffÆ–æSÂ÷FCãÇFCäF—66òÖ&6Fò6öÖòöfbÖÆ–æSÂ÷FCãÇFCä&÷L:6òF—&V—Fò(i"öæÆ–æS²6RföÇF"6—"Â7W7V—F"FòVæÆ6SÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäì:6ò&V6RæÆ—7FÂ÷FCãÇFCäì:6òfö’VçVÖW&FóÂ÷FCãÇFCåfW"ÄÆ–æ²FóÒ"ö&Æörö†BÖæòÖR×&V6öæ†V6–FòÖæÖ&–÷2Öò×VRÖf¦W""6Æ74æÖSÒ'FW‡BÖ66VçB#æF—66òì:6ò&V6öæ†V6–Fòæ$”õ3ÂôÆ–æ³ãÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#ä66÷2W7V<:Öf–6÷2FR54BÒã#Âöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsäÖöFòFò6Æ÷C£Â÷7G&öæsâ6Æ÷G2Òã"öFVÒ6V—F"ådÖRÂ4D÷RÖ&÷2âVÖÆ64DÒã"VÒ6Æ÷BW†6ÇW6—fÖVçFRådÖRì:6ò:’VçVÖW&F(	BòÖçVÂFÆ6G&¢6ö×F–&–Æ–FFR÷"6Æ÷BãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäf—&×v&RçF–vó£Â÷7G&öæsâÆ62FRvW&:|;VW2çFW&–÷&W2öFVÒ&V6—6"FRGVÆ—¦:|:6ò&&V6öæ†V6W"ÖöFVÆ÷2&V6VçFW2âGVÆ—¦:|:6òFRf—&×v&Rì:6ò:’&÷F–æ²<;26öÒÖ÷F—fòFV6Æ&FòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäF—66ò6ÆöæFó£Â÷7G&öæsâ;726ÆöævVÒÂ:’6ö×VÒ†fW"Fö—2föÇVÖW26öÒÖW6Ö76–æGW&âÖçFVæ†VÒFVÆW2FW66öæV7FFòæò&–ÖV—&ò&ö÷BãÂöÆ“à¢Â÷VÃà¢Çä7&—L:—&–÷2FR6ö×F–&–Æ–FFRRvæ†ò&VÂFG&ö66öçF–çVÒVÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖf¦W"×Ww&FR×76BÖçfÖR"6Æ74æÖSÒ'FW‡BÖ66VçB#çWw&FR&54BådÖSÂôÆ–æ³âRò6W'fœ:vò6÷'&W7öæFVçFRVÒÄÆ–æ²FóÒ"÷6W'f–6÷2÷Ww&FR×76B×&Ò"6Æ74æÖSÒ'FW‡BÖ66VçB#çWw&FRFR54BRÖVÜ;7&–ÂôÆ–æ³âãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòòF—66òÇFW&æ"VçG&R:ÖçFVw&òRöfbÖÆ–æRÂVæFòòföÇVÖRf–6"$r6öÒ'V—f÷2FVçG&òÂ÷RVæFòò6—7FVÖG&f"GW&çFRf÷&ÖF:|:6ò(	B6ö×÷'FÖVçFòVR6÷7GVÖ–æF–6"Ü:ÖF–6öÒFVfV—FòÂRì:6ò6öæf–wW&:|:6òâfÆ–:|:6òVÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&F—66òÖ6öÒ×6WF÷&W2ÖFVfV—GV÷6÷2×6Ö'BÖò×VRÖf¦W"#¢°¢F—FÆS¢%6WF÷&W2FVfV—GV÷6÷2R4Ô%B6öÒÆW'F¢òVRf¦W"†RòVRì:6òf¦W"’"À¢W†6W'C ¢$6öÖòÆW"÷2–æF–6F÷&W24Ô%BÂ÷"VR4„´E4²ì:6ò:’&W7÷7FG,:6ò&F—66ò7W7V—FòFRfÆ†l:×6–6RVÂ:’÷&FVÒ6÷'&WF¢6÷–"&–ÖV—&òÂ–çfW7F–v"FWö—2â"À¢FFS¢###bÓ‚Ó#b"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢$F–vì;77F–6ò"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#äÆW'FFR4Ô%BÂÆVçF–L:6òVÒ&¦F2ÂG&fÖVçF÷2ò'&—"7F2w&æFW2R'V—f÷2VR6öÖVÓ¢òG,:6ò7VvW&RÜ:ÖF–FVw&FæFòâFV6—<:6òÖ—2–×÷'FçFRæW76RÖöÖVçFòì:6ò:’VÂfW'&ÖVçF&öF"(	B:’÷&FVÒF2:|;VW2ãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢ÇäVÒF—66ò7W7V—FòFRfÆ†l:×6–6Â&–÷&–FFR:’Ç7G&öæsç&W6W'f"÷2FF÷3Â÷7G&öæsâÂæW76÷&FVÓ¢6÷–"òVR–×÷'F†÷Rf¦W"–ÖvVÒ&—B&—B’Â<;2VçL:6ò–çfW7F–v"Ü:ÖF–RÂ÷";¦ÇF–ÖòÂFV6–F—"VçG&R7V'7F—GV—"÷RFW66'F"â&öF"WF–Æ—L:&–òFR6÷'&\:|:6òçFW2F<;7––çfW'FR&–÷&–FFRRöFR7W7F"÷2'V—f÷2ãÂ÷à ¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"Ö&÷&FW"&rÖ×WFVBóCÓBæ÷B×&÷6R×’Ób#à¢Ç6Æ74æÖSÒ&ÒÓFW‡B×6Ò#ãÇ7G&öæså÷"VR4„´E4²ì:6ò:’&V6V—FG,:6ó£Â÷7G&öæsâò4„´E4²6÷'&–vRW7G'WGW&2Fò6—7FVÖFR'V—f÷2RÂ6öÒ÷:|:6òFR&W&òFR6WF÷&W2Âf÷,:vÆV—GW&2&WWF–F2RW67&—F2VÒ:&V2¬:g,:vV—2âVÒÜ:ÖF–6öÒ'\:ÖFòÖV<:&æ–6òÂ4Ô%B7,:×F–6òÂFW66öæWŒ;VW2÷R'V—f÷2–ç7V'7F—G\:×fV—2Â—76òöFRG&ç6f÷&Ö"VÒF—66ò&6–ÆÖVçFRÆV|:×fVÂVÒF—66ò—'&V7WW,:fVÂâæW76W266÷2Âì:6ò&öFRâVÆRf¢6VçF–FòVÒF—66ò6VL:fVÂ7V¦ò&ö&ÆVÖ:’6÷''W:|:6òÌ;6v–6;72VVFFRVæW&v–÷RFW6Æ–vÖVçFòf÷,:vFò(	Bì:6òVÒF—66òÖ÷'&VæFòãÂ÷à¢Âö6–FSà ¢Æƒ#ä6öÖòÆW"ò4Ô%B6VÒ6RVævæ#Âöƒ#à¢Çäò4Ô%B:’VÒ6öæ§VçFòFR6öçFF÷&W2ÖçF–F÷2VÆò,;7&–òF—66òâfÆRÖ—2ö'6W'f"Ç7G&öæsçFVæL:¦æ6–Â÷7G&öæsâF÷26öçFF÷&W2VÒGV2ÆV—GW&26W&F2÷"ÆwVç2F–2FòVRòfW&VF—FòFR$ô²"VR×V—F÷2&öw&Ö2W†–&VÒ(	BF—66òVÒfÆ†g&WVVçFVÖVçFR–æF&W÷'F7FGW2vW&Â&÷fFòãÂ÷à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#à¢ÇFƒä–æF–6F÷#Â÷Fƒà¢ÇFƒäòVR&W&W6VçFÂ÷Fƒà¢ÇFƒäÆV—GW&,:F–6Â÷Fƒà¢Â÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCå&VÆÆö6FVB6V7F÷'2„„B“Â÷FCãÇFCå6WF÷&W2&VÆö6F÷2VÆ&W6W'f–çFW&æÂ÷FCãÇFCåVÇVW"fÆ÷"6–ÖFR¦W&òVFR&6·W–ÖVF–Fó²fÆ÷"VR7&W66R–æF–6FVw&F:|:6òF—fÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä7W'&VçBVæF–ær6V7F÷#Â÷FCãÇFCå6WF÷&W2–ç7L:fV—2wV&FæFòFV6—<:6óÂ÷FCãÇFCå6–æÂf÷'FRFRÜ:ÖF–VÒfÆ†²ì:6ò&öF"6÷'&\:|:6òçFW2FR6÷–#Â÷FCãÂ÷G#à¢ÇG#ãÇFCåVæ6÷'&V7F&ÆR6V7F÷"6÷VçCÂ÷FCãÇFCäÆV—GW&2VRfÆ†&ÒFVf–æ—F—fÖVçFSÂ÷FCãÇFCäFF÷2æW762:&V2¬:öFVÒW7F"W&F–F÷3Â÷FCãÂ÷G#à¢ÇG#ãÇFCåVÇG&DÔ5$2W'&÷#Â÷FCãÇFCäW'&÷2æòVæÆ6RFRFF÷3Â÷FCãÇFCäæ÷&ÖÆÖVçFR6&ò÷R÷'FÂì:6òÜ:ÖF–¢G&ö6"6&òR&VfÆ–#Â÷FCãÂ÷G#à¢ÇG#ãÇFCåW&6VçFvRW6VBòÖVF–vV&÷WB…54B“Â÷FCãÇFCäFW6v7FRF2<:–ÇVÆ3Â÷FCãÇFCä6–ÖFR“RÆæV¦R7V'7F—GVœ:|:6òÂÖW6Öò6VÒ6–çFöÖÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäf–Æ&ÆR7&R…54B“Â÷FCãÇFCå&W6W'fFR&Æö6÷2Æ—g&SÂ÷FCãÇFCåVVF&—†òFòÆ–Ö–"Fòf'&–6çFR:’f—6òFRf–ÒFRf–FÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#ä÷&FVÒ6÷'&WFFRG&&Æ†óÂöƒ#à¢ÆöÃà¢ÆÆ“ãÇ7G&öæså&RFRW6"òF—66óÂ÷7G&öæsâ&F&Vf26ö×Vç2â6F†÷&Æ–vFVÒÜ:ÖF–FVw&FæFò6öç6öÖR6†æ6RFRÆV—GW&ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6÷–RòW76Væ6–Â&–ÖV—&óÂ÷7G&öæsâ(	BFö7VÖVçF÷2Âf÷F÷2R&ö¦WF÷2(	BÂFòÖVæ÷"&òÖ–÷"Â&VÒFW7F–æòF–fW&VçFRâçVæ66÷–R&ò,;7&–òF—66ò7W7V—FòãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6RòföÇVÖRFRFF÷2f÷"w&æFR÷RÆV—GW&fÆ†#Â÷7G&öæsâÂò76ò6W'Fò:’–ÖvVÒ&—B&—BVÒVÖVæ–FFR6F–ÂRG&&Æ†"6ö'&R<;7–ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså<;2FWö—3Â÷7G&öæsâfÆ–RÜ:ÖF–¢ÆV—GW&FR4Ô%BÂFW7FRFR7WW&l:Ö6–R6öÖVçFRÆV—GW&ÂFW7FRW7FVæF–FòFòf'&–6çFRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFV6–F7V'7F—GVœ:|:6óÂ÷7G&öæsâ6öÒòFFòVÒÜ:6÷2âF—66ò6öÒ6WF÷&W2VæFVçFW2÷R&VÆö6F÷27&W66VæFòì:6òföÇF6W"6öæfœ:fVÂ(	BÖW6ÖòVRò6—7FVÖ&\:væ÷&ÖÂãÂöÆ“à¢ÂööÃà ¢Æƒ#åVæFòò4„´E4²6&SÂöƒ#à¢Çä6&RVæFòòF—66òW7L:6VL:fVÂæò4Ô%BÂ6VÒ'\:ÖFòÂ6VÒFW66öæWŒ;VW2ÂRò6–çFöÖ:’6Æ&ÖVçFRÌ;6v–6ó¢7F26öÒæöÖW2G'Væ6F÷2;72VVFFRVæW&v–ÂföÇVÖRÖ&6Fò6öÖò7V¦òÂW'&òFR6—7FVÖFR'V—f÷2VÒVæ–FFR6V7VæL:&–6VÒFF÷27,:×F–6÷2âÖW6Öò:ÒÂf:v&6·WçFW2â6RVÇVW"6–æÂl:×6–6òW7F—fW"&W6VçFRÂVÆRf–6FRf÷&ãÂ÷à ¢Æƒ#å'\:ÖFòÖV<:&æ–6ò:’66ò:'FSÂöƒ#à¢Çä6Æ—VR&WWF—F—fòÂW7FÆò6FVæ6–Fò÷R'&æ†Fò–æF–6Ò&ö&ÆVÖÖV<:&æ–6òâæW76W266÷2ÂÆ–v"òF—66òFRæ÷fò&'FVçF"Ö—2VÖfW¢":’ò6ö×÷'FÖVçFòÖ—26&ò÷7<:×fVÂâòFWFÆ†ÖVçFòW7L:VÒÄÆ–æ²FóÒ"÷&ö&ÆVÖ2ö†BÖf¦VæFòÖ&'VÆ†ò"6Æ74æÖSÒ'FW‡BÖ66VçB#ä„Bf¦VæFò&'VÆ†óÂôÆ–æ³âRò&ö6VF–ÖVçFò6VwW&òVÒÄÆ–æ²FóÒ"ö&Æörö6öÖò×&V7WW&"ÖFF÷2Ö†BÖ6öÒÖFVfV—Fò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖò&V7WW&"FF÷2FR„B6öÒFVfV—FóÂôÆ–æ³âãÂ÷à ¢Æƒ#äFWö—2FG&ö6Âöƒ#à¢Çå7V'7F—G\:ÖFòòF—66òÂò76òVRWf—F&WWFœ:|:6òFòW—<;6F–ò:’&÷F–æFR<;7–(	BFW67&—FVÒÄÆ–æ²FóÒ"ö&Æörö&6·WÖ6öÖò×&÷FVvW"×6WW2Ö'V—f÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ&6·W¢6öÖò&÷FVvW"6WW2'V—f÷3ÂôÆ–æ³ââ6ö'&RVæFòG&ö66ö×Vç6VÒ&VÆ:|:6òòWV—ÖVçFòÂfV¦ÄÆ–æ²FóÒ"ö&Æör÷VæFò×G&ö6"Ö†B×÷"×76B"6Æ74æÖSÒ'FW‡BÖ66VçB#çVæFòG&ö6"ò„B÷"54CÂôÆ–æ³âãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRçFW2FR&öF"VÇVW"WF–Æ—L:&–ò6R÷2'V—f÷2ì:6òW†—7F—&VÒVÒ÷WG&òÇVv"â6W'fœ:vò6÷'&W7öæFVçFRVÒÄÆ–æ²FóÒ"÷6W'f–6÷2÷&V7WW&6òÖFRÖFF÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&V7WW&:|:6òFRFF÷3ÂôÆ–æ³ã²fÆ–:|:6òFò6öæ§VçFòVÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢òò)H)HöæF2(	BÆ÷FR3¢:VF–ò6VÒgVæ6–öæ"†6ÇW7FW"‚’à¢&6ö×WFF÷"×6VÒ×6öÒÖò×VR×fW&–f–6"#¢°¢F—FÆS¢$6ö×WFF÷"6VÒ6öÓ¢6W\:¦æ6–FRfW&–f–6:|:6òFòÇFòÖfÆçFRòG&—fW""À¢W†6W'C ¢$FòföÇVÖRRFòF—7÷6—F—fòFR6:ÖFW'&FòL:’G&—fW"R6öæV7F÷#¢6öÖò—6öÆ"6W6Fò6–Ì:¦æ6–òæòv–æF÷w26VÒ&V–ç7FÆ"ò6—7FVÖâ"À¢FFS¢###bÓ‚Ó#b"À¢&VEF–ÖS¢#’Ö–â"À¢6FVv÷'“¢$F–vì;77F–6ò"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#å6öÒVR7VÖ—R&&ÖVçFR:’FVfV—FòFR†&Gv&RâæÖ–÷&–F÷266÷2Âòv–æF÷w2W7L:VçG&VvæFòò:VF–ò&VÖ6:ÖFF–fW&VçFRFVVÆVRfö<:¢W7L:÷Wf–æFò(	BR6÷'&\:|:6òÆWfÖVæ÷2FRVÒÖ–çWFòVæFòfW&–f–6:|:6ò6VwVR÷&FVÒ6W'FãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢ÇåfW&–f—VRæW7F÷&FVÓ¢Ç7G&öæsæF—7÷6—F—fòFR6:ÖF6VÆV6–öæFóÂ÷7G&öæsâÂÇ7G&öæsçföÇVÖR÷"Æ–6F—fóÂ÷7G&öæsâÂÇ7G&öæsæ6öæV7F÷"l:×6–6óÂ÷7G&öæsâÂÇ7G&öæsç6W'fœ:vòFR:VF–óÂ÷7G&öæsâRÂ÷";¦ÇF–ÖòÂÇ7G&öæsæG&—fW#Â÷7G&öæsââVÆ"F—&WFò&&V–ç7FÆ"G&—fW":’òW'&òÖ—26ö×VÒ(	BRòVRÖVæ÷2&W6öÇfRãÂ÷à ¢Æƒ#å6W\:¦æ6–FRfW&–f–6:|:6óÂöƒ#à¢ÆöÃà¢ÆÆ“ãÇ7G&öæsäF—7÷6—F—fòFR6:ÖF£Â÷7G&öæsâ6Æ—VRæò:Ö6öæRFR6öÒæ&'&FRF&Vf2R6öæf—&VÂ6:ÖFW7L:F—fâÖöæ—F÷"÷"„DÔ’Â†VG6WB&ÇVWFö÷F‚–æF&VFòRÆ62FR6GW&6÷7GVÖÒ&÷V&"6:ÖFG,:6ò6VÒf—6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåföÇVÖR÷"Æ–6F—fó£Â÷7G&öæsâVÒ6öæf–wW&:|;VW2(i"6—7FVÖ(i"6öÒ(i"Ö—†W"FRföÇVÖRÂVÒ&öw&ÖöFRW7F"×VFò6÷¦–æ†òVçVçFòò6—7FVÖFö6æ÷&ÖÆÖVçFRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåFW7FR7'W¦Fó£Â÷7G&öæsâ&W&öGW¦VÒl:ÖFVòÆö6ÂRVÒ6—FRâ6RVÒFö6Rò÷WG&òì:6òÂò&ö&ÆVÖ:’FòÆ–6F—fò÷RFòæfVvF÷"Âì:6òFò6ö×WFF÷"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6öæV7F÷"l:×6–6ó£Â÷7G&öæsâVÒFW6·F÷Â6:ÖFFRÇFòÖfÆçFW2:’fW&FRFò–æVÂG&6V—&òâVçG&F2g&öçF—2FWVæFVÒFR6&ò–çFW&æòÆ–vFò:Æ6Rg&WVVçFVÖVçFRì:6ògVæ6–öæÒ6VÒVÆRãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6W'fœ:vòFR:VF–ó£Â÷7G&öæsâ6RæVæ‡VÒÆ–6F—fòVÖ—FR6öÒRò:Ö6öæRÖ÷7G&'‚"fW&ÖVÆ†òÂò6W'fœ:vòöFRFW"&Fò(	B66òFW67&—FòVÒÄÆ–æ²FóÒ"ö&Æör÷6W'f–6òÖFRÖVF–òÖFò×v–æF÷w2ÖæòÖW7FÖVÒÖW†V7V6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#ç6W'fœ:vòFR:VF–òFòv–æF÷w2ì:6òW7L:VÒW†V7\:|:6óÂôÆ–æ³âãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäG&—fW#£Â÷7G&öæsâ÷";¦ÇF–ÖòÂæòvW&Væ6–F÷"FRF—7÷6—F—f÷2Â6öæf—&6RŒ:f—6òæ6\:|:6òFR6öçG&öÆF÷&W2FR6öÒâ&Vf—&ò6÷FRFòf'&–6çFRFòæ÷FV&öö²÷RFÆ6ÖÜ:6RòG&—fW"vVì:—&–6òãÂöÆ“à¢ÂööÃà ¢Æƒ#åF&VÆFRFV6—<:6óÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#à¢ÇFƒå6–çFöÖÂ÷Fƒà¢ÇFƒä6W6&÷l:fVÃÂ÷Fƒà¢ÇFƒå,;7†–Öò76óÂ÷Fƒà¢Â÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCì8Ö6öæRFR6öÒæ÷&ÖÂÂæFFö6Â÷FCãÇFCå6:ÖFG,:6òöçFæFò&÷WG&òF—7÷6—F—fóÂ÷FCãÇFCå6VÆV6–öæ"6:ÖF6÷'&WFæÆ—7FÂ÷FCãÂ÷G#à¢ÇG#ãÇFCâ$æVæ‡VÒF—7÷6—F—fòFR6:ÖFFR:VF–òVæ6öçG&Fò#Â÷FCãÇFCäG&—fW"W6VçFR÷R6öçG&öÆF÷"FW6&–Æ—FFóÂ÷FCãÇFCå&V–ç7FÆ"òG&—fW"Fòf'&–6çFRFòÖöFVÆóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCå6öÒ<;2æòæfVvF÷"÷R<;2VÒVÒ&öw&ÖÂ÷FCãÇFCäÖ—†W"FRföÇVÖR÷R6:ÖF÷"Æ–6F—fóÂ÷FCãÇFCä§W7F"æòÖ—†W"FRföÇVÖSÂ÷FCãÂ÷G#à¢ÇG#ãÇFCå6öÒ6’VÆòÖöæ—F÷"Âì:6òVÆ6—†Â÷FCãÇFCä„DÔ’77VÖ—R6:ÖFG,:6óÂ÷FCãÇFCäFVf–æ—"ÇFòÖfÆçFW26öÖòG,:6óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä6†–FòÂW7F÷W&ò÷R6öÒ6÷'FFóÂ÷FCãÇFCä6öæV7F÷"Â6&ò÷RFW'&ÖVçFóÂ÷FCãÇFCåFW7F"÷WG&ò6&òR÷WG&6:ÖFçFW2FRÖW†W"VÒ6ögGv&SÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäföæRFö6Â6—†ì:6ò†÷Rò–çfW'6ò“Â÷FCãÇFCäFWFV<:|:6òFR6öæV7F÷#Â÷FCãÇFCåfW"ÄÆ–æ²FóÒ"ö&ÆöröföæRÖFRÖ÷Wf–FòÖæòÖR×&V6öæ†V6–FòÖæò×2"6Æ74æÖSÒ'FW‡BÖ66VçB#æföæRì:6ò&V6öæ†V6–FóÂôÆ–æ³ãÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#äæ÷FV&öö³¢Fö—2FWFÆ†W2VRVævæÓÂöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsåFV6ÆFR×VFò÷"†&Gv&S£Â÷7G&öæsâ×V—F÷2ÖöFVÆ÷2L:¦ÒFÆ†òæf–ÆV—&FRgVì:|:6ò6öÒ–æF–6F÷"ÇVÖ–æ÷6ó²òv–æF÷w26öçF–çVÖ÷7G&æFòföÇVÖRæ÷&ÖÂãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä&ÇVWFö÷F‚&VFó£Â÷7G&öæsâ6—†÷R†VG6WBÆ–vFòVÒ÷WG&ò<;FÖöFò6öçF–çV6VæFò6:ÖFl:Æ–FâFW6F—fRò&ÇVWFö÷F‚&VÆ–Ö–æ"†—;7FW6RVÒFö—26VwVæF÷2ãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò:’†&Gv&RFRfFóÂöƒ#à¢Çå7W7V—FRFR†&Gv&RVæFòò6öÒfÆ†FÖ,:–Òf÷&Fòv–æF÷w2‡÷"W†V×ÆòÂæòf—6ò6öæ÷&òFR'F–FVÒÆ62VRòVÖ—FVÒ’ÂVæFòVÒ;¦æ–6ò6æÂFö6FRf÷&Ö6öç6—7FVçFR6öÒ6&÷2F–fW&VçFW2Â÷RVæFò†÷WfRVVFÂÌ:×V–Fò÷RFW6ÖöçFvVÒ&V6VçFRâ&W&òFR6öæV7F÷"RFRÆ6VçG&VÒÄÆ–æ²FóÒ"÷6W'f–6÷2öÖçWFVæ6òÖFRÖæ÷FV&öö²"6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6òFRæ÷FV&öö³ÂôÆ–æ³â÷RÄÆ–æ²FóÒ"÷6W'f–6÷2öÖçWFVæ6òÖFRÖ6ö×WFF÷""6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6òFR6ö×WFF÷#ÂôÆ–æ³âãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòòG&—fW"ì:6ò–ç7FÆ"ÂVæFòòF—7÷6—F—fò7VÖ—"FòvW&Væ6–F÷"FRF—7÷6—F—f÷2FRf÷&Ö–çFW&Ö—FVçFR÷RVæFòò6–Ì:¦æ6–ò6öÖ\:v"§VçFò6öÒ÷WG&÷26–çFöÖ2FR6—7FVÖâfÆ–:|:6òVÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&föæRÖFRÖ÷Wf–FòÖæòÖR×&V6öæ†V6–FòÖæò×2#¢°¢F—FÆS¢$föæRFR÷Wf–Fòì:6ògVæ6–öææò2÷Ræ÷FV&öö³¢òVRfW&–f–6""À¢W†6W'C ¢$föæRì:6ò&V6öæ†V6–Fòæò2÷Ræ÷FV&öö³ò—6öÆRò,;7&–òföæRÂ6:ÖFFòv–æF÷w2Âò6öæV7F÷"ÂòÖ–7&öföæRÂU4"R&ÇVWFö÷F‚çFW2FRG&ö6"G&—fW"÷R'&—"Ü:V–æâ"À¢FFS¢###bÓ‚Ó#b"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#å6RòföæRFR÷Wf–Fòì:6ògVæ6–öææò2÷Ræ÷FV&öö²Â6öÖV6R—6öÆæFòG,:§26ÖF3¢ò,;7&–òföæRÂ6:ÖFW66öÆ†–Fæòv–æF÷w2Rò6Ö–æ†òl:×6–6ò÷R6VÒf–òW6Fò&6öæV7F"âFW7FRòföæRVÒ÷WG&ò&VÆ†ò6ö×L:×fVÂÂ6öæf—&ÖR6:ÖFRòföÇVÖRæò6—7FVÖR<;2FWö—2–çfW7F–wVR6öæV7F÷"ÂVçG&FFòÖ–7&öföæRÂG&—fW"ÂU4"÷R&ÇVWFö÷F‚âVÒFW7FR—6öÆFò§VF&VGW¦—"†—;7FW6W2ÂÖ2ì:6ò&÷f6÷¦–æ†òVÂ\:vfÆ†÷RãÂ÷à ¢Æƒ#äföæRì:6ògVæ6–öææòæ÷FV&öö³¢6öÖV6R÷"W7FW2FW7FW3Âöƒ#à¢Çä'&6öæf–wW&:|;VW2(i"6—7FVÖ(i"6öÒR6öæf—&ÖR6:ÖFF—fçFW2FR&V–ç7FÆ"VÇVW"G&—fW"âVÒ6öæV7F÷"æÌ;6v–6òÂfW&–f—VR6RòÇVwVRR÷'F<:6ò6ö×L:×fV—26öÒòFW6Væ†òFòWV—ÖVçFó²VÒU4"÷R&ÇVWFö÷F‚Âò†VG6WB&V6R6öÖòF—7÷6—F—fò6W&Fòâ6Rò:VF–ògVæ6–öæRVæ2òÖ–7&öföæRfÆ†Â6öæf—&FÖ,:–ÒVçG&F6VÆV6–öæFR2W&Ö—7<;VW2FRÖ–7&öföæRFòv–æF÷w2RFòÆ–6F—fòãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢ÇäföæR6VÒ6öÒöFR6W"VÖ6VÆ\:|:6òFR6:ÖFÂföÇVÖR÷"Æ–6F—fòÂ6öæV7F÷"æÌ;6v–6òÂ–æVÂg&öçFÂÂG&—fW"ÂF—7÷6—F—fòU4"÷R6öæWŒ:6ò&ÇVWFö÷F‚âòF–vì;77F–6òf–6Ö—2,:–FòVæFòfö<:¢×VFVÖf&œ:fVÂ÷"fW£¢&–ÖV—&ò÷WG&ò&VÆ†ò&fÆ–F"òföæRÂFWö—2÷WG&6:ÖFæò2ÂFWö—226öæf–wW&:|;VW2Fòv–æF÷w2âWf—FR6öÖ\:v"÷"(	ÆGVÆ—¦F÷"FRG&—fW.(	ÒFR÷&–vVÒFW66öæ†V6–FãÂ÷à ¢Æƒ#åfW&–f–6:|:6òVÒ÷&FVÓÂöƒ#à¢ÆöÃà¢ÆÆ“ãÇ7G&öæsåfÆ–FRòföæRVÒ÷WG&òWV—ÖVçFò6ö×L:×fVÂãÂ÷7G&öæsâ6RFÖ,:–ÒfÆ†"Â–çfW7F–wVRò,;7&–òföæRçFW2Fò6ö×WFF÷"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6öæf—&6:ÖFFòv–æF÷w3£Â÷7G&öæsâ6öæf–wW&:|;VW2(i"6—7FVÖ(i"6öÒâ6VÆV6–öæRòF—7÷6—F—fòFW6V¦FòRfW&–f—VRföÇVÖRvW&ÂRföÇVÖRFòÆ–6F—fòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäVÒFW6·F÷Â6ö×&R–æVÂg&öçFÂRG&6V—&óÂ÷7G&öæsâVæFò2GV26öæWŒ;VW2f÷&VÒ6ö×L:×fV—2â6RVÖgVæ6–öæR÷WG&ì:6òÂ—76ò—6öÆò6Ö–æ†òFò6öæV7F÷"ÂÖ2ì:6ò&÷f6÷¦–æ†ò6&òFW66öæV7FFòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6öæf—&òG,:6òFòÇVwVRRF2÷'F2ãÂ÷7G&öæsâVÒ†VG6WB6öÖ&–æFòöFR&V6—6"FRFFF÷"&÷&–FòVæFòò6ö×WFF÷"W66öæV7F÷&W26W&F÷2&:VF–òRÖ–7&öföæRãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&Ö–7&öföæRÃÂ÷7G&öæsâ6öæf—&ÖRVçG&F6VÆV6–öæFR2W&Ö—7<;VW2FR&—f6–FFRFòv–æF÷w2RFòÆ–6F—fòFR6†ÖFãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäVÒU4"÷R&ÇVWFö÷F‚ÃÂ÷7G&öæsâ6öæf—&ÖRVRòF—7÷6—F—fòW7L:6öæV7FFòÂ6VÆV6–öæFò6öÖò6:ÖFöVçG&FR6VÒW'&òæòvW&Væ6–F÷"FRF—7÷6—F—f÷2çFW2FR&VÖ÷fW"÷R&V–ç7FÆ"6ögGv&RãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6R†÷WfW"7V¦V—&f—<:×fVÂæò6öæV7F÷"ÃÂ÷7G&öæsâFW6Æ–wVRòWV—ÖVçFòR6–v÷&–VçF:|:6òFRÆ–×W¦Fòf'&–6çFRâì:6ò–çG&öGW¦ö&¦WFòÖWL:Æ–6òæVÒÌ:×V–Fòæ÷'FãÂöÆ“à¢ÂööÃà ¢Æƒ#åF&VÆFRFV6—<:6óÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#à¢ÇFƒå6–çFöÖÂ÷Fƒà¢ÇFƒä6W6&÷l:fVÃÂ÷Fƒà¢ÇFƒå,;7†–Öò76óÂ÷Fƒà¢Â÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCägVæ6–öæG,:2Âì:6ògVæ6–öææg&VçFSÂ÷FCãÇFCä6Ö–æ†òFò–æVÂg&öçFÂÂ6öæf–wW&:|:6ò÷R6öæV7F÷#Â÷FCãÇFCåfW&–f–6"FWFV<:|:6òRÆ–v:|:6òFò–æVÂçFW2FR'&—#Â÷FCãÂ÷G#à¢ÇG#ãÇFCäF—7÷6—F—fò&V6RÂÖ2ì:6ò6’6öÓÂ÷FCãÇFCå6:ÖFW'&FÂföÇVÖRÂÖ—†W"Âf÷&ÖFò÷RG&—fW#Â÷FCãÇFCå6VwV—"ò6öÇV6–öæF÷"R6öæfW&—"6:ÖFF—fÂ÷FCãÂ÷G#à¢ÇG#ãÇFCå6öÒgVæ6–öæÂÖ–7&öföæRì:6óÂ÷FCãÇFCäVçG&FW'&FÂW&Ö—7<:6òÂG,:6òFòÇVwVR÷RÆ–6F—fóÂ÷FCãÇFCä6öæfW&—"VçG&FR&—f6–FFRçFW2FR6ö×&"FFF÷#Â÷FCãÂ÷G#à¢ÇG#ãÇFCå'\:ÖFò×VFòÖ÷f–ÖVçF"ò6&óÂ÷FCãÇFCå÷7<:×fVÂÖR6öçFFòl:×6–6óÂ÷FCãÇFCåFW7F"÷WG&òföæRRWf—F"f÷,:v"ò6öæV7F÷#Â÷FCãÂ÷G#à¢ÇG#ãÇFCå<;2VÒ6æÂFö6VÒÖ—2FRVÒF—7÷6—F—fóÂ÷FCãÇFCå÷7<:×fVÂfÆ†æòföæRö6&óÂ÷FCãÇFCä6ö×&"6öÒ÷WG&òföæR6öæ†V6–Fò6öÖògVæ6–öæÃÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäæVæ‡VÖ6:ÖF&W&öGW¢:VF–óÂ÷FCãÇFCå&ö&ÆVÖÖ—2×ÆòFR:VF–òæòv–æF÷w2÷R†&Gv&SÂ÷FCãÇFCåfW"ÄÆ–æ²FóÒ"ö&Æörö6ö×WFF÷"×6VÒ×6öÒÖò×VR×fW&–f–6""6Æ74æÖSÒ'FW‡BÖ66VçB#æ6ö×WFF÷"6VÒ6öÓÂôÆ–æ³ãÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#ä†VG6WBU4"R&ÇVWFö÷FƒÂöƒ#à¢Çä†VG6WG2U4"æ÷&ÖÆÖVçFR&V6VÒ6öÖòVÒF—7÷6—F—fòFR:VF–ò6W&FòÂ÷"—76òfÆR6öæf—&Ö"6:ÖFRVçG&Fæòv–æF÷w2RæòÆ–6F—fòâVÒ&ÇVWFö÷F‚Â&V7W'6÷2RVÆ–FFRGW&çFR6†ÖF2FWVæFVÒFò†VG6WBÂFfW'<:6òFòv–æF÷w2ÂFò6öFV2RFòÖöFòFR6ö×Væ–6:|:6òæVvö6–Fòâ6RVÆ–FFR×VFò'&—"VÖ&WVæœ:6òÂ6öæf—&ÖRVÂ6:ÖFRVÂÖ–7&öföæRòÆ–6F—fò76÷RW6"çFW2FRG&F"—76ò6öÖòFVfV—FòãÂ÷à ¢Æƒ#ä7&—L:—&–÷2FR&FÂöƒ#à¢ÇVÃà¢ÆÆ“å÷'FgVæFFÂVV'&F÷RVV6VæFòãÂöÆ“à¢ÆÆ“äfÆ†6öÖ\:v÷R;72Ì:×V–FòÂVVF÷R&W'GW&&V6VçFRFòWV—ÖVçFòãÂöÆ“à¢ÆÆ“ì8’&V6—6òFW6ÖöçF"æ÷FV&öö²÷RÆ6g&öçFÂ6VÒFö7VÖVçF:|:6òFòÖöFVÆòãÂöÆ“à¢ÆÆ“äò&ö&ÆVÖFR:VF–òfVÒ6ö×æ†FòFR6†V—&òÂW7FÆòVÌ:—G&–6ò÷RFW6Æ–vÖVçFòãÂöÆ“à¢Â÷VÃà ¢Æƒ#äföçFW2&–Ü:&–3Âöƒ#à¢ÇVÃà¢ÆÆ“ãÆ‡&VcÒ&‡GG3¢ò÷7W÷'BæÖ–7&÷6ögBæ6öÒ÷BÖ'"÷v–æF÷w2ö†&Gv&RöVF–òöf—‚×6÷VæBÖ÷"ÖVF–ò×&ö&ÆV×2Ö–â×v–æF÷w2"F&vWCÒ%ö&Ææ²"&VÃÒ&æ÷&VfW'&W""6Æ74æÖSÒ'FW‡BÖ66VçB#äÖ–7&÷6ögB7W÷'B(	B6÷'&–v—"&ö&ÆVÖ2FR6öÒ÷R:VF–òæòv–æF÷w3Âöã¢6W\:¦æ6–öf–6–Â&6:ÖFÂföÇVÖRÂ6öÇV6–öæF÷"ÂG&—fW"R6W'fœ:v÷2FR:VF–òãÂöÆ“à¢ÆÆ“ãÆ‡&VcÒ&‡GG3¢ò÷7W÷'BæÖ–7&÷6ögBæ6öÒ÷BÖ'"÷v–æF÷w2ö†&Gv&RöVF–òöf—‚ÖVF–òÖ—77VW2×v†VâÖæò×6÷VæB×Æ—2Ög&öÒ×7V¶W'2Ö÷"Ö†VG†öæW2Ö–â×v–æF÷w2"F&vWCÒ%ö&Ææ²"&VÃÒ&æ÷&VfW'&W""6Æ74æÖSÒ'FW‡BÖ66VçB#äÖ–7&÷6ögB7W÷'B(	B6VÒ6öÒVÒÇFòÖfÆçFW2÷RföæW3Âöã¢fW&–f–6:|;VW2W7V<:Öf–62VæFòòF—7÷6—F—fòW7L:6öæV7FFòÂÖ2ì:6ò&W&öGW¢:VF–òãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòò6öæV7F÷"W7F—fW"föÆvFòÂgVæFFò÷R–çFW&Ö—FVçFRÂVæFòò–æVÂg&öçFÂ&";72ÖöçFvVÒÂ÷RVæFò÷2FW7FW2FR6ögGv&RRFR÷WG&òföæR—6öÆ&VÒfÆ†æò6Ö–æ†òl:×6–6òâ&W&òFR6öæV7F÷"R&Wf—<:6òFò–æVÂVçG&ÒVÒÄÆ–æ²FóÒ"÷6W'f–6÷2öÖçWFVæ6òÖFRÖ6ö×WFF÷""6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6òFR6ö×WFF÷#ÂôÆ–æ³ã²VÒ÷'L:FV—2ÂÄÆ–æ²FóÒ"÷6W'f–6÷2öÖçWFVæ6òÖFRÖæ÷FV&öö²"6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6òFRæ÷FV&öö³ÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢'6W'f–6òÖFRÖVF–òÖFò×v–æF÷w2ÖæòÖW7FÖVÒÖW†V7V6ò#¢°¢F—FÆS¢%6W'fœ:vòFR:VF–òFòv–æF÷w2ì:6òW7L:VÒW†V7\:|:6ó¢6öÖò&VF—f""À¢W†6W'C ¢$òVR<:6ò÷26W'fœ:v÷2v–æF÷w2VF–òRVF–òVæGö–çB'V–ÆFW"Â6öÖò&V–æ–6œ:ÖÆ÷2æ÷&FVÒ6÷'&WFÂVæFò&V–ç7FÆ"òG&—fW"R6öÖòF—7F–æwV—"fÆ†FR6W'fœ:vòFRfÆ†FR†&Gv&Râ"À¢FFS¢###bÓ‚Ó#b"À¢&VEF–ÖS¢#‚Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#äÖVç6vVÒ&ò6W'fœ:vòFR:VF–òì:6òW7L:VÒW†V7\:|:6ò"Rò:Ö6öæRFR6öÒ6öÒVÒ'‚"fW&ÖVÆ†òöçFÒ&VÒ6ö×öæVçFR&FòFò,;7&–òv–æF÷w2âò&ö6VF–ÖVçFò:’7W'FòÂ&WfW'<:×fVÂRì:6òW†–vRf÷&ÖF"ãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çäò:VF–òFòv–æF÷w2FWVæFRFRFö—26W'fœ:v÷2VÒ6FV–¢Ç7G&öæsåv–æF÷w2VF–óÂ÷7G&öæsâRÇ7G&öæsä6öç7G'WF÷"FRöçFòFRW‡G&VÖ–FFRFR8VF–òFòv–æF÷w3Â÷7G&öæsââò6VwVæFòVçVÖW&26:ÖF3²ò&–ÖV—&òVçG&Vvò6öÒâ6Rò6öç7G'WF÷"ì:6òW7F—fW"F—fòÂ&V–æ–6–"Væ2òv–æF÷w2VF–òì:6ò&W6öÇfR(	B÷&FVÒ–×÷'FãÂ÷à ¢Æƒ#å&ö6VF–ÖVçFóÂöƒ#à¢ÆöÃà¢ÆÆ“ãÇ7G&öæsä'&÷26W'fœ:v÷3Â÷7G&öæsâ‡FV6Æv–æF÷w2²"ÂÆ6öFSç6W'f–6W2æ×63Âö6öFSâ’ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÆö6Æ—¦R$6öç7G'WF÷"FRöçFòFRW‡G&VÖ–FFRFR8VF–òFòv–æF÷w2#Â÷7G&öæsââF—òFR–æ–6–Æ—¦:|:6òFWfR6W"WFöÜ:F–6òRòW7FFòÂVÒW†V7\:|:6òâ§W7FRR–æ–6–R6RæV6W7<:&–òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÆö6Æ—¦R%v–æF÷w2VF–ò#Â÷7G&öæsââÖW6Öò§W7FS¢WFöÜ:F–6òRVÒW†V7\:|:6òâ6R¬:W7F—fW"&öFæFòÂW6R&V–æ–6–"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6öæf—&2FWVæL:¦æ6–3Â÷7G&öæsâæ&FWVæL:¦æ6–2Fòv–æF÷w2VF–ó¢6†ÖFFR&ö6VF–ÖVçFò&VÖ÷Fò…%2’RòvVæFF÷"×VÇF–Ü:ÖF–&V6—6ÒW7F"F—f÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&V–æ–6–Rò6ö×WFF÷#Â÷7G&öæsâRFW7FR6öÒVÒl:ÖFVòÆö6ÂãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6Rò6W'fœ:vò&"FRæ÷fò6÷¦–æ†óÂ÷7G&öæsâÂ7W7V—F76&òG&—fW"FR:VF–ò÷R&VÒÆ–6F—fòVR77VÖRòF—7÷6—F—fòVÒÖöFòW†6ÇW6—fòãÂöÆ“à¢ÂööÃà¢Æ6–FR6Æ74æÖSÒ'&÷VæFVBÖÆr&÷&FW"&÷&FW"Ö&÷&FW"&rÖ×WFVBóCÓBæ÷B×&÷6R×’Ób#à¢Ç6Æ74æÖSÒ&ÒÓFW‡B×6Ò#ãÇ7G&öæsä6ö×WFF÷"FRV×&W6£Â÷7G&öæsâVÒÜ:V–æ2vW&Væ6–F2Â6W'fœ:v÷2öFVÒ6W"6öçG&öÆF÷2÷"öÌ:×F–6RföÇF"òW7FFòçFW&–÷"6FÆöv–ââG&FR6öÒVVÒFÖ–æ—7G&&VFRVÒfW¢FR–ç6—7F—"æÇFW&:|:6òÆö6ÂãÂ÷à¢Âö6–FSà ¢Æƒ#åF&VÆFRFV6—<:6óÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#à¢ÇFƒå6—GV:|:6óÂ÷Fƒà¢ÇFƒä6W6&÷l:fVÃÂ÷Fƒà¢ÇFƒå,;7†–Öò76óÂ÷Fƒà¢Â÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCå6W'fœ:vò&FòÂ–æ–6–RgVæ6–öæÂ÷FCãÇFCäfÆ†öçGVÂ;72GVÆ—¦:|:6ò÷RFW6Æ–vÖVçFòf÷,:vFóÂ÷FCãÇFCäFV—†"VÒWFöÜ:F–6òRö'6W'f#Â÷FCãÂ÷G#à¢ÇG#ãÇFCå6W'fœ:vò&FöFfW¢VRò2Æ–vÂ÷FCãÇFCäG&—fW"–æ6ö×L:×fVÃÂ÷FCãÇFCå&V–ç7FÆ"òG&—fW"Fòf'&–6çFRFòÖöFVÆóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäW'&òòFVçF"–æ–6–"ò6W'fœ:vóÂ÷FCãÇFCäFWVæL:¦æ6–&FÂ÷FCãÇFCä–æ–6–"%2RòvVæFF÷"×VÇF–Ü:ÖF–çFW3Â÷FCãÂ÷G#à¢ÇG#ãÇFCå6W'fœ:vòVÒW†V7\:|:6òRÖW6Öò76–Ò6VÒ6öÓÂ÷FCãÇFCå6:ÖFG,:6ò÷RÖ—†W#Â÷FCãÇFCåfW"ÄÆ–æ²FóÒ"ö&Æörö6ö×WFF÷"×6VÒ×6öÒÖò×VR×fW&–f–6""6Æ74æÖSÒ'FW‡BÖ66VçB#æ6ö×WFF÷"6VÒ6öÓÂôÆ–æ³ãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäF—7÷6—F—fò6öÖRFòvW&Væ6–F÷"FRF—7÷6—F—f÷3Â÷FCãÇFCä6öçG&öÆF÷"–çFVw&Fò6öÒfÆ†Â÷FCãÇFCäfÆ–:|:6òL:–6æ–6&W6Væ6–ÃÂ÷FCãÂ÷G#à¢ÇG#ãÇFCåföÇF÷RFWö—2FRVÖGVÆ—¦:|:6òFòv–æF÷w3Â÷FCãÇFCäG&—fW"7V'7F—G\:ÖFòVÆòvVì:—&–6óÂ÷FCãÇFCå&V–ç7FÆ"ò6÷FRöf–6–ÂFòÖöFVÆóÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#å&V–ç7FÆ:|:6òFRG&—fW"6VÒG&ÖÂöƒ#à¢ÇäæòvW&Væ6–F÷"FRF—7÷6—F—f÷2ÂFW6–ç7FÆRòF—7÷6—F—fòVÒ6öçG&öÆF÷&W2FR6öÒÂl:ÖFVòR¦öv÷2Ö&6æFò&VÖü:|:6òFòG&—fW"VæFò÷:|:6òW†—7F—"Â&V–æ–6–RR–ç7FÆRò6÷FR&—†FòFò6—FRFòf'&–6çFRFòæ÷FV&öö²÷RFÆ6ÖÜ:6RÂW7V<:Öf–6ò&òÖöFVÆòâWf—FR&öw&Ö2VR&öÖWFVÒGVÆ—¦"G&—fW'2WFöÖF–6ÖVçFS¢VÆW2–ç7FÆÒfW'<;VW2vVì:—&–62R&V7&–Òò&ö&ÆVÖâ6Ròv–æF÷w2¬:W7F—fW"–ç7L:fVÂVÒ÷WG&2g&VçFW2Â&V–ç7FÆ:|:6òÆ–×öFR6W"Ö—2,:–F(	BfV¦ÄÆ–æ²FóÒ"÷6W'f–6÷2öf÷&ÖF6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æf÷&ÖF:|:6òR–ç7FÆ:|:6òFò6—7FVÖÂôÆ–æ³âãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòò6W'fœ:vòì:6ò–æ–6–"ÖW6Öò6öÒFWVæL:¦æ6–2F—f2ÂVæFòò6öçG&öÆF÷"FW6&V6W"Fò6—7FVÖ÷RVæFòò&ö&ÆVÖf–W"6ö×æ†FòFRG&fÖVçF÷2R&V–ì:Ö6–÷2âfÆ–:|:6òVÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âRW†V7\:|:6òVÒÄÆ–æ²FóÒ"÷6W'f–6÷2öÖçWFVæ6òÖFRÖ6ö×WFF÷""6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6òFR6ö×WFF÷#ÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ  ¢òò)H)HöæF2(	BÆ÷FRC¢vV&6Ò†6ÇW7FW"’’Rv–æF÷w2WFFR†6ÇW7FW"’à¢'vV&6ÒÖæòÖgVæ6–öæÖò×VR×fW&–f–6"#¢°¢F—FÆS¢%vV&6Òì:6ògVæ6–öæ¢6öÖò6W&"&—f6–FFRÂÆ–6F—fòÂG&—fW"R†&Gv&R"À¢W†6W'C ¢$6–æ6òW&wVçF2—6öÆÒ6W6VæFò<:&ÖW&ì:6ògVæ6–öæ¢VÆW†—7FRæò6—7FVÖÂòv–æF÷w2Æ–&W&ÂòÆ–6F—fòFVÒW&Ö—7<:6òÂòG&—fW"W7L:6F–ò÷RòÜ;6GVÆòfÆ†÷Râ"À¢FFS¢###bÓ‚Ó#b"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢$F–vì;77F–6ò"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#ä<:&ÖW&VRì:6ògVæ6–öæV6RçVæ6:’<:&ÖW&VV–ÖFâæÖ–÷"'FRF÷2FVæF–ÖVçF÷2ÂòÜ;6GVÆòW7L:–çF7FòR–ÖvVÒ&VÒVÖF26ÖF2VçG&Rò6Vç6÷"RòÆ–6F—fò(	BF×l:×6–6ÂW&Ö—7<:6òFòv–æF÷w2ÂW&Ö—7<:6òFò&öw&ÖÂG&—fW"÷R6öæWŒ:6ò–çFW&æâ÷&FVÒVÒVRfö<:¢FW7FFV6–FR6Rò&ö&ÆVÖÆWfFö—2Ö–çWF÷2÷RVÖF&FRãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çä'&òÆ–6F—fò<:&ÖW&Fòv–æF÷w2â6R–ÖvVÒ&V6RÆ’RfÆ†<;2VÒVÒ&öw&ÖÂò&ö&ÆVÖ:’FRW&Ö—7<:6ò÷RFR6öæf–wW&:|:6òFVVÆR&öw&Öâ6RòÆ–6F—fò<:&ÖW&FÖ,:–ÒfÆ†ÂfW&–f—VRò6W76ò:<:&ÖW&æ26öæf–wW&:|;VW2FR&—f6–FFRR&W6Vì:vFòF—7÷6—F—fòæòvW&Væ6–F÷"FRF—7÷6—F—f÷2â<:&ÖW&W6VçFRFòvW&Væ6–F÷"öçF&G&—fW"Â6öæWŒ:6ò–çFW&æ÷R†&Gv&R(	BæW76÷&FVÒãÂ÷à ¢Æƒ#äòVR:’VÖvV&6ÒVR&ì:6ògVæ6–öæ#Âöƒ#à¢Æƒ3äVÒFW&Ö÷26–×ÆW3Âöƒ3à¢ÇäW†—7FVÒ6–æ6òfÆ†2F–fW&VçFW2W66öæF–F2æÖW6Ög&6S¢<:&ÖW&ì:6òW†—7FRæò6—7FVÖ²VÆW†—7FRÖ2òv–æF÷w2&Æ÷VV–²VÆW†—7FRRòv–æF÷w2Æ–&W&Ö2òÆ–6F—fòì:6òVFR÷Rì:6ò&V6V&RW&Ö—7<:6ó²–ÖvVÒ'&R&WF²÷RòF—7÷6—F—fò&V6RR6öÖR6÷¦–æ†òâ6FVÖFVÒ6W6R6öÇ\:|:6òF—7F–çF2ãÂ÷à¢Æƒ3äòVR6öçFV6RFV6æ–6ÖVçFSÂöƒ3à¢Çä–ÖvVÒW&6÷'&RVÖ6FV–¢6Vç6÷"(i"6öæWŒ:6ò–çFW&æ÷R6&òU4"(i"f—&×v&RFòÜ;6GVÆò(i"VçVÖW&:|:6òVÆòv–æF÷w2(i"G&—fW"(i"W&Ö—7<:6òFò6—7FVÖ(i"W&Ö—7<:6òFòÆ–6F—fò(i"Æ–6F—fò÷RæfVvF÷"(i"l:ÖFVòæFVÆâ–çFW'&ö×W"VÇVW"VÆò&öGW¢6–çFöÖ&V6–Fò&VVÒöÆ†FVÆÂÖ2òöçFòFR&F×VF6ö×ÆWFÖVçFRòF–vì;77F–6òãÂ÷à¢Æƒ3ä6öÖòòW7\:&–òW&6V&SÂöƒ3à¢ÇåFVÆ&WFæ&WVæœ:6òÂÖVç6vVÒFR<:&ÖW&ì:6òVæ6öçG&FÂÆ—7FFRF—7÷6—F—f÷2f¦–FVçG&òFò&öw&ÖÂ÷Rf—6òFRVR÷WG&òÆ–6F—fòW7L:W6æFò<:&ÖW&ãÂ÷à ¢Æƒ#å÷"VR6öçFV6SóÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒä6W6Â÷FƒãÇFƒå6–çFöÖL:×–6óÂ÷FƒãÇFƒä6öÖòF–fW&Væ6–#Â÷FƒãÇFƒå&—66òFRÖW†W#Â÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCåF×l:×6–6÷Rö'GW&F÷"fV6†FóÂ÷FCãÇFCä–ÖvVÒ&WFÂ<:&ÖW&gVæ6–öææò6—7FVÖÂ÷FCãÇFCäÆ–6F—fò<:&ÖW&'&RÂÖ2<;2Ö÷7G&&WFóÂ÷FCãÇFCäæVæ‡VÓÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä6W76ò:<:&ÖW&FW6Æ–vFòæòv–æF÷w3Â÷FCãÇFCåFöF÷2÷2&öw&Ö2fÆ†ÓÂ÷FCãÇFCäf—6òFR6W76ò&Æ÷VVFòæ26öæf–wW&:|;VW2FR&—f6–FFSÂ÷FCãÇFCä&—†ò(	B×VFì:v&WfW'<:×fVÃÂ÷FCãÂ÷G#à¢ÇG#ãÇFCåW&Ö—7<:6òFòÆ–6F—fóÂ÷FCãÇFCägVæ6–öæVÒVÒ&öw&ÖRfÆ†VÒ÷WG&óÂ÷FCãÇFCåFW7FR7'W¦FòVçG&R<:&ÖW&Rò&öw&Ö&ö&ÆVÜ:F–6óÂ÷FCãÇFCä&—†óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä<:&ÖW&ö7WF÷"÷WG&ò&ö6W76óÂ÷FCãÇFCäW'&òFRF—7÷6—F—fòVÒW6óÂ÷FCãÇFCäfV6†"ò÷WG&ò&öw&ÖFWföÇfR–ÖvVÓÂ÷FCãÇFCäæVæ‡VÓÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäG&—fW"W6VçFRÂ6÷'&ö×–Fò÷RFW6&–Æ—FFóÂ÷FCãÇFCäF—7÷6—F—fò6öÒf—6òæòvW&Væ6–F÷#Â÷FCãÇFCì8Ö6öæRFRÆW'F÷R&F—7÷6—F—fòFW66öæ†V6–Fò#Â÷FCãÇFCäÜ:–F–ò(	B&Vf—&G&—fW"öf–6–ÃÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä6&ò–çFW&æò÷R6öæV7F÷"6öÇFóÂ÷FCãÇFCä<:&ÖW&6öÖRRföÇFÂ6öÖR;72'&—"F×Â÷FCãÇFCä6÷7GVÖf—"FWö—2FRVVF÷RFW6ÖöçFvVÓÂ÷FCãÇFCäÇFò(	BW†–vRFW6ÖöçFvVÓÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäÜ;6GVÆò6öÒFVfV—FóÂ÷FCãÇFCäW6VçFRFò6—7FVÖVÒFöF226öæFœ:|;VW3Â÷FCãÇFCåW'6—7FR;72&V–ç7FÆ"G&—fW"RFW7F"÷WG&ò6—7FVÖÂ÷FCãÇFCäÇFóÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#ì8'f÷&RFRFV6—<:6óÂöƒ#à¢ÆöÃà¢ÆÆ“ãÇ7G&öæsäòÆ–6F—fò<:&ÖW&'&R–ÖvVÓóÂ÷7G&öæsâ6–Ò(i"l:&ò76òBâì:6ò(i"76ò"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä<:&ÖW&&V6RæòvW&Væ6–F÷"FRF—7÷6—F—f÷3óÂ÷7G&öæsâ6–Ò(i":’W&Ö—7<:6òFò6—7FVÖ÷RG&—fW#¢fV¦ÄÆ–æ²FóÒ"ö&Æör÷W&Ö—76öW2ÖFRÖ6ÖW&Öæò×v–æF÷w2"6Æ74æÖSÒ'FW‡BÖ66VçB#çW&Ö—7<;VW2FR<:&ÖW&æòv–æF÷w3ÂôÆ–æ³ââì:6ò(i"76ò2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsì8’vV&6ÒU4#óÂ÷7G&öæsâ6–Ò(i"6–vò&÷FV—&òFRÄÆ–æ²FóÒ"ö&Æör÷vV&6Ò×W6"ÖæòÖRÖFWFV7FF"6Æ74æÖSÒ'FW‡BÖ66VçB#çvV&6ÒU4"ì:6òFWFV7FFÂôÆ–æ³ââì:6ò†<:&ÖW&–çFVw&F’(i"76òRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäfÆ†<;2VÒVÒ&öw&ÖóÂ÷7G&öæsâ6–Ò(i"W&Ö—7<:6ò÷R6VÆ\:|:6òFRF—7÷6—F—fòFVçG&òFVÆRâì:6ò(i"föÇFRò76ò"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä†÷WfRVVFÂÌ:×V–Fò÷RFW6ÖöçFvVÒ&V6VçFSóÂ÷7G&öæsâ6–Ò(i"7W7V—FFR6&ò÷RÜ;6GVÆó²&RV’âì:6ò(i"&V–ç7FÆRòG&—fW"öf–6–ÂFòÖöFVÆòR&VfÆ–RãÂöÆ“à¢ÂööÃà ¢Æƒ#ä<:&ÖW&–çFVw&FFRæ÷FV&öö³Âöƒ#à¢ÇäVÒæ÷FV&öö²ÂòÜ;6GVÆòf–6æÖöÆGW&7WW&–÷"FFVÆR6R6öæV7F:Æ6÷"VÒ6&òf–æòVR76VÆFö'&Fœ:vâÆwVç2f'&–6çFW2öfW&V6VÒö'GW&F÷"FW6Æ—¦çFRÂ&÷L:6òl:×6–6òFR&—f6–FFRÂFÆ†òæf–ÆV—&FRFV6Æ2FRgVì:|:6ò÷R÷:|:6òFRFW6&–Æ—F"<:&ÖW&æò6WGW(	BÖ2æVæ‡VÒFW76W2&V7W'6÷2:’Væ—fW'6ÂâçFW2FR&ö7W&"FV6ÆÜ:v–6Â6öæf—&ÖRæòÖçVÂFò6WRÖöFVÆò6RVÆW†—7FRâ6ögGv&R,;7&–òFòf'&–6çFRFÖ,:–ÒöFRÖçFW"<:&ÖW&&Æ÷VVF÷"öÌ:×F–6FR&—f6–FFRÂÖW6Öò6öÒòv–æF÷w2Æ–&W&FòãÂ÷à ¢Æƒ#ä–ÖvVÒ&WF6öÒ<:&ÖW&&V6öæ†V6–FÂöƒ#à¢ÇåVæFòòF—7÷6—F—fò&V6RÂòÆ–6F—fò'&RR–ÖvVÒ6öçF–çV&WFÂ2†—;7FW6W2×VFÓ¢ö'GW&F÷"fV6†FòÂFW6—fòW7VV6–Fò6ö'&RÆVçFRÂ÷WG&ò&öw&Ö6VwW&æFòòF—7÷6—F—fòVÒ6VwVæFòÆæòÂW‡÷6œ:|:6òWFöÜ:F–6VÒÖ&–VçFR×V—FòW67W&òÂG&—fW"6öÒFVfV—Fò;72GVÆ—¦:|:6ò÷RÂ÷";¦ÇF–ÖòÂfÆ†FòÜ;6GVÆòâfV6†R÷2&öw&Ö2FR&WVæœ:6òÂ&V–æ–6–RRFW7FRæ÷fÖVçFRçFW2FR6öæ6ÇV—"VÇVW"6ö—66ö'&R†&Gv&RãÂ÷à ¢Æƒ#åF&VÆFRFV6—<:6ò,:–FÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒå6—GV:|:6óÂ÷FƒãÇFƒä6ÖF&÷l:fVÃÂ÷FƒãÇFƒå&–ÖV—&:|:6óÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCäæVæ‡VÒ&öw&Öl:¢<:&ÖW&Â÷FCãÇFCå6—7FVÖ÷RG&—fW#Â÷FCãÇFCä6öæfW&—"&—f6–FFRRvW&Væ6–F÷"FRF—7÷6—F—f÷3Â÷FCãÂ÷G#à¢ÇG#ãÇFCä<:&ÖW&gVæ6–öæÂ&WVæœ:6òì:6óÂ÷FCãÇFCäÆ–6F—fò÷RæfVvF÷#Â÷FCãÇFCå&Wf—6"W&Ö—7<:6òRF—7÷6—F—fò6VÆV6–öæFòæò&öw&ÖÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä–ÖvVÒ&WFVÒGVFóÂ÷FCãÇFCäö'GW&F÷"ÂW‡÷6œ:|:6ò÷RG&—fW#Â÷FCãÇFCåfW&–f–6"F×l:×6–6R&V–æ–6–"6VÒ÷WG&÷2&öw&Ö2&W'F÷3Â÷FCãÂ÷G#à¢ÇG#ãÇFCä<:&ÖW&6öÖRRföÇFÂ÷FCãÇFCä6öæWŒ:6òl:×6–6÷R÷'FÂ÷FCãÇFCåFW7F"÷WG&÷'F÷R÷WG&ò6ö×WFF÷#Â÷FCãÂ÷G#à¢ÇG#ãÇFCäF—7÷6—F—fòFW66öæ†V6–FòæòvW&Væ6–F÷#Â÷FCãÇFCäG&—fW#Â÷FCãÇFCä–ç7FÆ"6÷FRöf–6–ÂFòf'&–6çFRFòÖöFVÆóÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“ä&—†"G&—fW"FR6—FRw&VvF÷"FW66öæ†V6–Fó¢:’÷&–vVÒÖ—26ö×VÒFR&öw&Ö–æFW6V¦FòæW762Ü:V–æ2ãÂöÆ“à¢ÆÆ“äFW6ÖöçF"FVÆ&'fW&–f–6"ò6&ò"çFW2FRW6v÷F"÷2FW7FW2FR6ögGv&RãÂöÆ“à¢ÆÆ“äÆ–&W&"<:&ÖW&&FöF÷2÷26—FW2FòæfVvF÷"FRf÷&ÖW&ÖæVçFR<;2&FW7G&f"VÖ&WVæœ:6òãÂöÆ“à¢ÆÆ“ä6öæ6ÇV—"VRòÜ;6GVÆòVV–Ö÷R6VÒFW7FR7'W¦FòVÒ÷WG&òÆ–6F—fòRÂ6R÷7<:×fVÂÂVÒ÷WG&ò6—7FVÖãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&RF–çFRFR6–æÂFRFæòl:×6–6ó¢VVF&V6VçFRÂ6öçFFò6öÒÌ:×V–FòÂÖöÆGW&FFVÆFW6Æö6FÂ<:&ÖW&VR6öÖRòÖ÷fW"F×â6&òFR<:&ÖW&76VÆFö'&Fœ:vR7V'7F—GVœ:|:6òW†–vRFW6ÖöçFvVÒFFVÆ(	B&ö6VF–ÖVçFòVRì:6òfÆR–×&÷f—6òãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFò<:&ÖW&ì:6ò&V6W"VÒæVæ‡VÖ6öæFœ:|:6òÂVæFò7VÖ—"FRf÷&Ö–çFW&Ö—FVçFR÷RVæFòòG&—fW"öf–6–Âì:6ò–ç7FÆ"âfÆ–:|:6ò6öÖ\:vVÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âRò&W&òFòÜ;6GVÆòVçG&VÒÄÆ–æ²FóÒ"÷6W'f–6÷2öÖçWFVæ6òÖFRÖæ÷FV&öö²"6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6òFRæ÷FV&öö³ÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢'W&Ö—76öW2ÖFRÖ6ÖW&Öæò×v–æF÷w2#¢°¢F—FÆS¢%W&Ö—7<;VW2FR<:&ÖW&æòv–æF÷w3¢VæFò:’ò6—7FVÖVR&Æ÷VV–RVæFò:’òÆ–6F—fò"À¢W†6W'C ¢$6W76òvÆö&ÂÂ6W76ò÷"Æ–6F—fòÂ&öw&Ö2FR:&VFRG&&Æ†òRW&Ö—7<:6òFR6—FRæòæfVvF÷"<:6ò6ÖF2F–fW&VçFW2âVçFVæFW"VÂW7L:fV6†F&W6öÇfRÖ–÷&–F÷266÷2FR<:&ÖW&&Æ÷VVFâ"À¢FFS¢###bÓ‚Ó#b"À¢&VEF–ÖS¢#‚Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#åVæFò<:&ÖW&gVæ6–öæVÒVÒ&öw&ÖRfÆ†VÒ÷WG&òÂò†&Gv&RW7L:f÷&FR7W7V—FâòVR×VFVçG&R÷2Fö—2:’W&Ö—7<:6ò(	BRòv–æF÷w2FVÒÖ—2FRVÖÂV×–Æ†FÂ6FVÖ6¢FR&Æ÷VV"6÷¦–æ†ãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢ÇäVÒ6öæf–wW&:|;VW2(i"&—f6–FFRR6VwW&ì:v(i"<:&ÖW&W†—7FVÒG,:§26†fW2–æFWVæFVçFW3¢ò6W76ò:<:&ÖW&FòF—7÷6—F—fòÂò6W76òFRÆ–6F—f÷2:<:&ÖW&RW&Ö—7<:6ò–æF—f–GVÂFR6FÆ–6F—fòâ&öw&Ö2FR:&VFRG&&Æ†òÂ6öÖòæfVvF÷&W2R6Æ–VçFW2FR&WVæœ:6òÂVçG&Ò÷"VÖV'F6†fR:'FRâ6RFR6–ÖW7F—fW"FW6Æ–vFÂÆ–v"2FR&—†òì:6òF–çFãÂ÷à ¢Æƒ#äòVR:’W&Ö—7<:6òFR<:&ÖW&Âöƒ#à¢Æƒ3äVÒFW&Ö÷26–×ÆW3Âöƒ3à¢Çì8’VÒ6öæ§VçFòFR–çFW''WF÷&W2VÒ<:—&–Râò6—7FVÖFV6–FR6R<:&ÖW&öFR6W"W6F÷"VÇVW"6ö—6²FWö—2FV6–FR6RÆ–6F—f÷2öFVÓ²FWö—2FV6–FRV—2Æ–6F—f÷2öFVÓ²RòæfVvF÷"–æFFV6–FRV—26—FW2öFVÒãÂ÷à¢Æƒ3äòVR6öçFV6RFV6æ–6ÖVçFSÂöƒ3à¢Çäòv–æF÷w2–çFW&ÖVFV–ò6W76òòF—7÷6—F—fòFR6GW&âò&öw&ÖVFR<:&ÖW&ò6—7FVÖÂRò6—7FVÖ6öç7VÇFöÌ:×F–6f–vVçFRçFW2FRVçG&Vv"òfÇW†òFRl:ÖFVòâVæFòöÌ:×F–6æVvÂò&öw&Ö&V6V&RVÒW'&òvVì:—&–6ò(	Bæ÷&ÖÆÖVçFRG&GW¦–Fò6öÖò&<:&ÖW&ì:6òVæ6öçG&F"÷R&ì:6òfö’÷7<:×fVÂ–æ–6–"òl:ÖFVò"ÂòVR6öægVæFRòW7\:&–òRf¢&V6W"FVfV—FòãÂ÷à¢Æƒ3ä6öÖòòW7\:&–òW&6V&SÂöƒ3à¢Çä<:&ÖW&W&fV—FVÒVÒÆ–6F—fòÂ–æW†—7FVçFRVÒ÷WG&òâ÷RgVæ6–öæÖVçFòæ÷&ÖÂL:’VÖGVÆ—¦:|:6òFR6—7FVÖ÷RVÖöÌ:×F–6FòG&&Æ†ò&WfW'FW"6öæf–wW&:|:6òãÂ÷à ¢Æƒ#ä2VG&ò6ÖF2Âæ÷&FVÒVÒVRFWfVÒ6W"fW&–f–6F3Âöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒä6ÖFÂ÷FƒãÇFƒäöæFRf–6Â÷FƒãÇFƒäVfV—FòVæFòFW6Æ–vFÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCä6W76ò:<:&ÖW&†F—7÷6—F—fò“Â÷FCãÇFCå&—f6–FFRR6VwW&ì:v(i"<:&ÖW&Â÷FCãÇFCäæFæò6ö×WFF÷"6W76<:&ÖW&Â÷FCãÂ÷G#à¢ÇG#ãÇFCä6W76òFRÆ–6F—f÷3Â÷FCãÇFCäÖW6ÖFVÆÂ6†fRÆövò&—†óÂ÷FCãÇFCäÆ–6F—f÷2FÆö¦W&FVÒ6W76óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCåW&Ö—7<:6ò–æF—f–GVÃÂ÷FCãÇFCäÆ—7FFRÆ–6F—f÷2FÖW6ÖFVÆÂ÷FCãÇFCå<;2ò&öw&ÖÆ—7FFò:’&Æ÷VVFóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäÆ–6F—f÷2FR:&VFRG&&Æ†óÂ÷FCãÇFCä—FVÒ6W&Fòæòf–ÒFÆ—7FÂ÷FCãÇFCäæfVvF÷&W2R6Æ–VçFW2–ç7FÆF÷2f÷&FÆö¦&ÓÂ÷FCãÂ÷G#à¢ÇG#ãÇFCåW&Ö—7<:6òFR6—FSÂ÷FCãÇFCä6öæf–wW&:|;VW2FòæfVvF÷#Â÷FCãÇFCå<;2VVÆR6—FRf–66VÒ–ÖvVÓÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#åv–æF÷w2&Æ÷VV–÷RòÆ–6F—fò&Æ÷VV–óÂöƒ#à¢ÇäòFW7FR:’6–×ÆW2Rì:6ò7W7FæF¢'&òÆ–6F—fò<:&ÖW&Fòv–æF÷w2â6R–ÖvVÒ&V6RÂò6—7FVÖW7L:Æ–&W&æFòòF—7÷6—F—fòR–çfW7F–v:|:6ò6RFW6Æö6&ò&öw&Ö(	BW&Ö—7<:6òFVÆRÂF—7÷6—F—fò6VÆV6–öæFòæ26öæf–wW&:|;VW2FRl:ÖFVòÂ÷RfW'<:6òFW6GVÆ—¦Fâ6Rò,;7&–òÆ–6F—fò<:&ÖW&fÆ†6öÒf—6òFR6W76ò&Æ÷VVFòÂò&ö&ÆVÖ:’FRöÌ:×F–6Fò6—7FVÖãÂ÷à ¢Æƒ#äæfVvF÷#¢G,:§2W&Ö—7<;VW26öÖF3Âöƒ#à¢ÇåVÖ&WVæœ:6òVÆòæfVvF÷"<;2gVæ6–öæVæFò2G,:§2&W7÷7F2<:6ò6–Ó¢òv–æF÷w2Æ–&W&Æ–6F—f÷2FR:&VFRG&&Æ†òÂòæfVvF÷"FVÒW&Ö—7<:6òFR<:&ÖW&Rò6—FRW7V<:Öf–6òfö’WF÷&—¦Fòâ÷"—76ò:’6ö×VÒVRVÖÆFf÷&ÖFR&WVæœ:6ògVæ6–öæRR÷WG&ì:6òÂæòÖW6ÖòæfVvF÷"ÂæòÖW6ÖòÖ–çWFòâ6F6—FRwV&F,;7&–FV6—<:6òÂRVÒ&&Æ÷VV""6Æ–6Fò÷"VævæòW&ÖæV6R6ÇfòãÂ÷à ¢Æƒ#ì8'f÷&RFRFV6—<:6óÂöƒ#à¢ÆöÃà¢ÆÆ“ä<:&ÖW&'&R–ÖvVÓòì:6ò(i"fW&–f—VRò6W76ò:<:&ÖW&FòF—7÷6—F—fòRò6W76òFRÆ–6F—f÷2ãÂöÆ“à¢ÆÆ“ä'&RÂÖ2ò&öw&ÖFÆö¦fÆ†ò(i"W&Ö—7<:6ò–æF—f–GVÂFVVÆRÆ–6F—fòãÂöÆ“à¢ÆÆ“ä'&RÂÖ2òæfVvF÷"fÆ†VÒFöF÷2÷26—FW3ò(i"6†fRFRÆ–6F—f÷2FR:&VFRG&&Æ†òRW&Ö—7<:6òFR<:&ÖW&FòæfVvF÷"ãÂöÆ“à¢ÆÆ“ä'&RÂòæfVvF÷"gVæ6–öæVÒVÒ6—FRRfÆ†VÒ÷WG&óò(i"W&Ö—7<:6òFVVÆR6—FRãÂöÆ“à¢ÆÆ“åFöF2Æ–&W&F2R–æFfÆ†ò(i"föÇFRòF–vì;77F–6òFRÄÆ–æ²FóÒ"ö&Æör÷vV&6ÒÖæòÖgVæ6–öæÖò×VR×fW&–f–6""6Æ74æÖSÒ'FW‡BÖ66VçB#çvV&6Òì:6ògVæ6–öæÂôÆ–æ³âÂ&ÖòFRG&—fW"R†&Gv&RãÂöÆ“à¢ÂööÃà ¢Æƒ#äÜ:V–æFòG&&Æ†óÂöƒ#à¢ÇäVÒ6ö×WFF÷"vW&Væ6–FòVÆV×&W6ÂW7626†fW2öFVÒW7F"6öçG&öÆF2÷"öÌ:×F–6RföÇF"6÷¦–æ†2òW7FFòçFW&–÷"FWö—2FRVÇVW"ÇFW&:|:6òâ6R26öæf–wW&:|;VW2&V6VÒW6ÖV6–F2÷R&WfW'FVÒ;72&V–æ–6–"Âì:6ò–ç6—7F¢VVÒFÖ–æ—7G&ò'VR&V6—6Æ–&W&"âòÖW6ÖòfÆR&6ögGv&RFR6VwW&ì:v6÷'÷&F—f6öÒ6öçG&öÆR,;7&–òFR<:&ÖW&ãÂ÷à ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“äÆ–&W&"<:&ÖW&&FöF÷2÷26—FW2FRVÖfW¢âWF÷&—¦R÷"6—FRÂR&WföwVRVæFòì:6òW6"Ö—2ãÂöÆ“à¢ÆÆ“äFW6–ç7FÆ"òçF—l:×'W2&'FW7F""â7W7VæFòÜ;6GVÆòW7V<:Öf–6òÂ6RW†—7F—"ÂR&VF—fRVÒ6VwV–FãÂöÆ“à¢ÆÆ“äVF—F"ò&Vv—7G&òFòv–æF÷w2&f÷,:v"W&Ö—7<:6ò6VÒVçFVæFW"VÂ6ÖFW7L:æVvæFòãÂöÆ“à¢ÆÆ“äFV—†"ò6W76òvÆö&ÂÆ–vFò6†æFòVR—76ò:’ö'&–vL;7&–ó¢6FW&Ö—7<:6ò6öæ6VF–F:’VÖFV6—<:6òFR&—f6–FFR&VÂÂ6öÒ–×7FòVæFòVÒ6—FRFW66öæ†V6–FòVFR<:&ÖW&ãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFò2W&Ö—7<;VW2föÇF&VÒ6÷¦–æ†2ÂVæFòFVÆFR&—f6–FFRW7F—fW"&Æ÷VVF÷"öÌ:×F–6VÒÜ:V–æW76öÂ÷RVæFòò6ö×÷'FÖVçFòf–W"6ö×æ†FòFR÷WG&2ÇFW&:|;VW2ì:6ò6öÆ–6—FF2(	B6Vì:&–òVRÖW&V6RÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢'vV&6Ò×W6"ÖæòÖRÖFWFV7FF#¢°¢F—FÆS¢%vV&6ÒU4"ì:6ò:’FWFV7FF¢÷'FÂ6&òÂÆ–ÖVçF:|:6òRG&—fW""À¢W†6W'C ¢%&÷FV—&òFRVÆ–Ö–æ:|:6ò&vV&6ÒW‡FW&æVRòv–æF÷w2ì:6òVç†W&v¢FW7FRFR÷'FÂ‡V"6VÒÆ–ÖVçF:|:6òÂ6&òÂF—7÷6—F—fòFW66öæ†V6–FòæòvW&Væ6–F÷"RFW7FR7'W¦FòVÒ÷WG&ò6ö×WFF÷"â"À¢FFS¢###bÓ‚Ó#b"À¢&VEF–ÖS¢#‚Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#åvV&6ÒU4"VRì:6ò&V6R:’ÂæÖ–÷&–F2fW¦W2ÂVÒ&ö&ÆVÖFR÷'FÂ6&ò÷RÆ–ÖVçF:|:6ò(	Bì:6òF<:&ÖW&âò6Ö–æ†òÖ—27W'Fò:’VÆ–Ö–æ"W762G,:§2f&œ:fV—2çFW2FRFö6"VÒG&—fW"ãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çä6öæV7FR<:&ÖW&F—&WFòVÒVÖ÷'FG&6V—&Fò6ö×WFF÷"Â6VÒ‡V"R6VÒW‡FVç<:6òâ6Ròv–æF÷w2VÖ—F—"ò6öÒFR6öæWŒ:6òRòF—7÷6—F—fò7W&v—"æòvW&Væ6–F÷"FRF—7÷6—F—f÷2Âò&ö&ÆVÖW7Ffæò6Ö–æ†òçFW&–÷"â6RæF6öçFV6RVÒæVæ‡VÖ÷'FÂFW7FRòÖW6Öò6&òRÖW6Ö<:&ÖW&VÒ÷WG&ò6ö×WFF÷"çFW2FR6öæ6ÇV—"VÇVW"6ö—6ãÂ÷à ¢Æƒ#å÷"VR6öçFV6SóÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒä6W6Â÷FƒãÇFƒå6–çFöÖÂ÷FƒãÇFƒä6öÖòF–fW&Væ6–#Â÷FƒãÇFƒå&—66óÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCä‡V"6VÒföçFR,;7&–Â÷FCãÇFCä<:&ÖW&ì:6òÆ–v÷RFW66öæV7Fòw&f#Â÷FCãÇFCägVæ6–öæÆ–vFF—&WFòæÜ:V–æÂ÷FCãÇFCäæVæ‡VÓÂ÷FCãÂ÷G#à¢ÇG#ãÇFCå÷'Fg&öçFÂ6öÒ6&ò–çFW&æòg&÷W†óÂ÷FCãÇFCäfÆ†<;2æ2÷'F2Fg&VçFSÂ÷FCãÇFCå÷'FG&6V—&gVæ6–öææ÷&ÖÆÖVçFSÂ÷FCãÇFCä&—†óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä6&ò&ö×–Fò÷RW‡FVç<:6òÆöævFVÖ—3Â÷FCãÇFCä6öæWŒ:6ò–çFW&Ö—FVçFRòÖ÷fW"ò6&óÂ÷FCãÇFCä÷WG&ò6&ò&W6öÇfSÂ÷FCãÇFCäæVæ‡VÓÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäG&—fW"ì:6ò–ç7FÆFóÂ÷FCãÇFCäF—7÷6—F—fòFW66öæ†V6–FòæòvW&Væ6–F÷#Â÷FCãÇFCä&V6R6öÒÆW'FÖ&VÆóÂ÷FCãÇFCäÜ:–F–óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä6öæfÆ—Fò6öÒ÷WG&<:&ÖW&Â÷FCãÇFCå&öw&ÖW66öÆ†RòF—7÷6—F—fòW'&FóÂ÷FCãÇFCäGV2<:&ÖW&2Æ—7FF2æò&öw&ÖÂ÷FCãÇFCäæVæ‡VÓÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä<:&ÖW&6öÒFVfV—FóÂ÷FCãÇFCäæFVÒæVæ‡VÖ÷'FRVÒ÷WG&ò6ö×WFF÷#Â÷FCãÇFCåFW7FR7'W¦FòæVvF—fóÂ÷FCãÇFCî(	CÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#ì8'f÷&RFRVÆ–Ö–æ:|:6óÂöƒ#à¢ÆöÃà¢ÆÆ“ãÇ7G&öæsì8’FWFV7FFóÂ÷7G&öæsâò6öæV7F"Âòv–æF÷w2VÖ—FR6öÒRÖ÷7G&æ÷F–f–6:|:6óòì:6ò(i"G&÷VRFR÷'FÂFR&VfW,:¦æ6–G&6V—&ÂR&VÖ÷f‡V"RW‡FVç<:6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä&V6RæòvW&Væ6–F÷"FRF—7÷6—F—f÷3óÂ÷7G&öæsâ&ö7W&RVÒ<:&ÖW&2ÂVÒF—7÷6—F—f÷2FR–ÖvVÒRFÖ,:–ÒVÒ6öçG&öÆF÷&W2U4"âVÒ—FVÒ$F—7÷6—F—fòFW66öæ†V6–Fò"¬::’&W7÷7F¢fÇFG&—fW"÷RòF—7÷6—F—fòì:6òW7L:6R–FVçF–f–6æFòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäòÆ–6F—fò<:&ÖW&'&R–ÖvVÓóÂ÷7G&öæsâ6–Ò(i"†&Gv&RRG&—fW"W7L:6ò&VÓ²ò&W7Fò:’W&Ö—7<:6ò÷R6VÆ\:|:6òFRF—7÷6—F—fòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä÷WG&÷2&öw&Ö26W76ÓóÂ÷7G&öæsâ6R<;2VÒfÆ†Âò77VçFò:’ÄÆ–æ²FóÒ"ö&Æör÷W&Ö—76öW2ÖFRÖ6ÖW&Öæò×v–æF÷w2"6Æ74æÖSÒ'FW‡BÖ66VçB#çW&Ö—7<:6òFR<:&ÖW&ÂôÆ–æ³âãÂöÆ“à¢ÆÆ“ãÇ7G&öæsägVæ6–öæVÒ÷WG&ò6ö×WFF÷#óÂ÷7G&öæsâ6–Ò(i"ò&ö&ÆVÖ:’FÜ:V–æâì:6ò(i":’F<:&ÖW&÷RFò6&òãÂöÆ“à¢ÂööÃà ¢Æƒ#åU4""ÂU4"2RÆ–ÖVçF:|:6óÂöƒ#à¢Çä<:&ÖW&2FR&W6öÇ\:|:6òÖ—2ÇF6öç6öÖVÒ&æFRVæW&v–âÆ–vF2VÒ‡V"76—fò6ö×'F–Æ†Fò6öÒFV6ÆFòÂÖ÷W6RÂF—66òW‡FW&æòR÷WG&÷2W&–l:—&–6÷2ÂVÆ26–×ÆW6ÖVçFR6öÖVÒ÷RG&fÒGW&çFRG&ç6Ö—7<:6òâ÷'F2G&6V—&26÷7GVÖÒ6W"Æ–vF2F—&WFÖVçFR÷26öçG&öÆF÷&W2FÆ6R<:6ò&VfW,:¦æ6–FRFW7FRâ6R<:&ÖW&W†–vRU4"2R÷'F:’U4""Â–ÖvVÒöFR'&—"VÒ&W6öÇ\:|:6ò&VGW¦–F÷RæVÒ'&—"ãÂ÷à ¢Æƒ#äG&—fW#¢VæFòRFRöæFSÂöƒ#à¢ÇäÖ–÷&–F2vV&6×2GV—2W6òG&—fW"FR6Æ76RvVì:—&–6òFò,;7&–òv–æF÷w2Rì:6òW†–vR–ç7FÆ:|:6òâVæFòW†–vRÂò6÷FR6÷'&WFòfVÒFò6—FRFòf'&–6çFRF<:&ÖW&Â&òÖöFVÆòW†FòâfÆRFÖ,:–ÒFV—†"òv–æF÷w2WFFR&ö7W&"G&—fW'2÷6–öæ—2çFW2FRVÇVW"6ö—6â&öw&Ö2VR&öÖWFVÒ&GVÆ—¦"FöF÷2÷2G&—fW'2"R6—FW2w&VvF÷&W2FRG&—fW"<:6òFW6æV6W7<:&–÷2Rg&WVVçFVÖVçFR–ç7FÆÒÆvò–÷"FòVRò&ö&ÆVÖ÷&–v–æÂãÂ÷à ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“ä–ç7FÆ"WF–Æ—L:&–òFRG&—fW"FR÷&–vVÒFW66öæ†V6–F&&W6öÇfW"VÖvV&6ÒFR&—†ò7W7FòãÂöÆ“à¢ÆÆ“åFW7F"Væ2æ2÷'F2g&öçF—2R6öæ6ÇV—"VR<:&ÖW&Ö÷'&WRãÂöÆ“à¢ÆÆ“äV×–Æ†"‡V"VÒ‡V"&væ†"÷'F26öÒW&–l:—&–6÷2FRl:ÖFVòãÂöÆ“à¢ÆÆ“ä'&—"6&6:vF<:&ÖW&çFW2FòFW7FR7'W¦FòVÒ÷WG&ò6ö×WFF÷"ãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòòvW&Væ6–F÷"7W6"W'&òFR6öçG&öÆF÷"U4"ÂVæFòl:&–2÷'F2&&VÒFRgVæ6–öæ"òÖW6ÖòFV×ò÷RVæFòò6ö×WFF÷"&V–æ–6–"ò6öæV7F"òW&–l:—&–6òâW76W26–æ—2öçFÒ&Æ6Âì:6ò&<:&ÖW&(	BfÆ–:|:6òVÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âR&W&òVÒÄÆ–æ²FóÒ"÷6W'f–6÷2öÖçWFVæ6òÖFRÖ6ö×WFF÷""6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6òFR6ö×WFF÷#ÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢'v–æF÷w2×WFFRÖæòÖgVæ6–öæÖò×VR×fW&–f–6"#¢°¢F—FÆS¢%v–æF÷w2WFFRì:6ògVæ6–öæ¢6öÖòFW66ö'&—"VÒVÂW7L:v–òGVÆ—¦:|:6òfÆ†"À¢W†6W'C ¢%fW&–f–6:|:6òÂF÷væÆöBÂ&W&:|:6òÂ–ç7FÆ:|:6òR&V–æ–6–Æ—¦:|:6ò<:6òW7L:v–÷2F—7F–çF÷2â–FVçF–f–6"öæFRGVÆ—¦:|:6ò&VÆ–Ö–æÖWFFRF÷2&ö6VF–ÖVçF÷2–ì;§FV—2â"À¢FFS¢###bÓ‚Ó#b"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢$F–vì;77F–6ò"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#â%v–æF÷w2WFFRì:6ògVæ6–öæ"FW67&WfRVÆòÖVæ÷26V—2fÆ†2F–fW&VçFW2âVÖ'W66–æf–æ—F÷"GVÆ—¦:|;VW2ì:6òFVÒæFfW"6öÒF÷væÆöB&FòVÒRÂVR÷"7VfW¢ì:6òFVÒæFfW"6öÒ–ç7FÆ:|:6òVR&WfW'FRæ&V–æ–6–Æ—¦:|:6òâò&–ÖV—&ò76ò:’FW66ö'&—"òW7L:v–òãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢ÇäçFW2FRVÇVW"6öÖæFòÂ6öæf—&ò,:6–6ó¢6öæWŒ:6òW7L:fVÂÂFFR†÷&6÷'&WF2ÂW7:vòÆ—g&RVÒF—66òÂ&V–æ–6–Æ—¦:|:6òVæFVçFRRGVÆ—¦:|;VW2W6F2âFWö—2–FVçF–f—VRòW7L:v–òFfÆ†(	BfW&–f–6:|:6òÂF÷væÆöBÂ&W&:|:6òÂ–ç7FÆ:|:6ò÷R&V–æ–6–Æ—¦:|:6òâ<;2VçL:6òfæ6R&F–vì;77F–6òFòv–æF÷w2Â6W'fœ:v÷2Â66†RR&W&òFR6ö×öæVçFW2ÂæW76÷&FVÒâv"7F2Fò6—7FVÖì:6ò:’&–ÖV—&ò76òãÂ÷à ¢Æƒ#äòVR:’òv–æF÷w2WFFSÂöƒ#à¢Æƒ3äVÒFW&Ö÷26–×ÆW3Âöƒ3à¢Çì8’ò6W'fœ:vòVR6öç7VÇFò6L:ÆövòFÖ–7&÷6ögBÂFW66ö'&RòVRfÇFæ7VÜ:V–æÂ&—†÷26÷FW2Â&W&–ç7FÆ:|:6òR6öæ6ÇV’ò&ö6W76òVÒVÖ&V–æ–6–Æ—¦:|:6ò6öçG&öÆFãÂ÷à¢Æƒ3äòVR6öçFV6RFV6æ–6ÖVçFSÂöƒ3à¢ÇäòfÇW†òFVÒWF26Æ&3¢fW&–f–6:|:6òR6ö×&:|:6òFRÖWFFF÷2(i"F÷væÆöBF÷26÷FW2(i"&W&:|:6ò‡7Fv–ær’(i"–ç7FÆ:|:6ò(i"&V–æ–6–Æ—¦:|:6ò(i"Æ–6:|:6òf–æÂVÆòÖV6æ—6ÖòFRÖçWFVì:|:6òFR6ö×öæVçFW2(i"6öæ6ÇW<:6ò÷R&WfW'<:6òâ6FWFFWVæFRFR6W'fœ:v÷2ÂW7:vòR–çFVw&–FFRF÷26ö×öæVçFW2Fò6—7FVÖãÂ÷à¢Æƒ3ä6öÖòòW7\:&–òW&6V&SÂöƒ3à¢Çä&'&VRì:6òæFÂ÷&6VçFvVÒ6öævVÆFÂ<;6F–vòFRW'&òÂ÷RVVÆÖVç6vVÒFR&FW6f¦VæFòÇFW&:|;VW2"FWö—2FRW7W&"ÖV–†÷&ãÂ÷à ¢Æƒ#åF&VÆ÷"W7L:v–óÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒå6–çFöÖÂ÷FƒãÇFƒäW7L:v–ò&÷l:fVÃÂ÷FƒãÇFƒå&–ÖV—&fW&–f–6:|:6óÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCâ%&ö7W&æFòGVÆ—¦:|;VW2"6VÒf–ÓÂ÷FCãÇFCåfW&–f–6:|:6óÂ÷FCãÇFCä6öæWŒ:6òÂFFö†÷&R6W'fœ:vòVÒW†V7\:|:6óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäF÷væÆöB&FòVÒSÂ÷FCãÇFCäF÷væÆöCÂ÷FCãÇFCäW7:vòÆ—g&RÂ&VFRRf–ÆFR66†SÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäF÷væÆöBVÒRVRì:6ò–ç7FÆÂ÷FCãÇFCå&W&:|:6óÂ÷FCãÇFCå&V–æ–6–Æ—¦:|:6òVæFVçFRR–çFVw&–FFRF÷26ö×öæVçFW3Â÷FCãÂ÷G#à¢ÇG#ãÇFCä–ç7FÆ:|:6òG&fFVÒ÷&6VçFvVÒf—†Â÷FCãÇFCä–ç7FÆ:|:6óÂ÷FCãÇFCäF—f–FFR&VÂFRF—66òR5RçFW2FR–çFW'f—#Â÷FCãÂ÷G#à¢ÇG#ãÇFCâ$FW6f¦VæFòÇFW&:|;VW2#Â÷FCãÇFCå&WfW'<:6ò;72×&V–ì:Ö6–óÂ÷FCãÇFCäG&—fW"&V6VçFRÂW7:vòR6ö×öæVçFW3Â÷FCãÂ÷G#à¢ÇG#ãÇFCä<;6F–vòFRW'&òW7V<:Öf–6óÂ÷FCãÇFCäFWVæFRFòW7L:v–óÂ÷FCãÇFCäæ÷F"<;6F–vòRÖöÖVçFòW†FòVÒVR&V6WSÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäGVÆ—¦:|:6ò&V&V6RFöF6VÖæÂ÷FCãÇFCä6öæ6ÇW<:6ò&6–ÃÂ÷FCãÇFCä†—7L;7&–6òFRGVÆ—¦:|;VW2R&W&òFR6ö×öæVçFW3Â÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#åG&–vVÒ–æ–6–Â(	BçFW2F÷26öÖæF÷3Âöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsä6öæWŒ:6ó£Â÷7G&öæsâ&VFR–ç7L:fVÂ÷RÆ–Ö—FF–çFW'&ö×RF÷væÆöBFR6÷FW2w&æFW2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFFR†÷&£Â÷7G&öæsâ&VÌ;6v–ò×V—Fòf÷&FR6–æ7&öæ–VV'&fÆ–F:|:6òFR6W'F–f–6F÷2RFW''V&fW&–f–6:|:6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäW7:vòÆ—g&S£Â÷7G&öæsâGVÆ—¦:|;VW2FR&V7W'6ò&V6—6ÒFRl:&–÷2v–v'—FW2Æ—g&W2ÂÌ:–ÒFòVR¬:W7L:ö7WFòâW7:vò7W'Fò&öGW¢W'&òVÒVÇVW"W7L:v–òãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&V–æ–6–Æ—¦:|:6òVæFVçFS£Â÷7G&öæsâVÖGVÆ—¦:|:6òçFW&–÷"wV&FæFò&V–ì:Ö6–ò&Æ÷VV–,;7†–ÖãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåW6F—f£Â÷7G&öæsâ,;7&–FVÆFòv–æF÷w2WFFRöFRW7F"6öÒGVÆ—¦:|;VW2W6F2÷R6öÒ†÷,:&–òF—fò&W7G&–æv–æFòò&V–ì:Ö6–òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåfW'<:6òR6ö×F–&–Æ–FFS£Â÷7G&öæsâÆwVÖ2GVÆ—¦:|;VW2ì:6ò<:6òöfW&V6–F2FWFW&Ö–æF÷2WV—ÖVçF÷2ÂR—76òì:6ò:’FVfV—FòãÂöÆ“à¢Â÷VÃà ¢Æƒ#å&öw&W7<:6òFR&W&óÂöƒ#à¢ÆöÃà¢ÆÆ“ä§W7F"6öæf–wW&:|:6ò,:6–6FG&–vVÒ6–ÖãÂöÆ“à¢ÆÆ“å&V–æ–6–"Ü:V–æFRf÷&Ö6ö×ÆWFRFVçF"FRæ÷fòãÂöÆ“à¢ÆÆ“äW†V7WF"6öÇ\:|:6òFR&ö&ÆVÖ2Fòv–æF÷w2WFFRÂF—7öì:×fVÂæ26öæf–wW&:|;VW2Fò6—7FVÖãÂöÆ“à¢ÆÆ“ä6öæfW&—"÷26W'fœ:v÷2VçföÇf–F÷2(	B6VÒFW6&–Æ—F"æFãÂöÆ“à¢ÆÆ“å<;2VçL:6òG&F"ò66†RÂFRf÷&Ö&WfW'<:×fVÃ¢fV¦ÄÆ–æ²FóÒ"ö&ÆöröÆ–×"Ö66†RÖFò×v–æF÷w2×WFFR×6ögGv&VF—7G&–'WF–öâ"6Æ74æÖSÒ'FW‡BÖ66VçB#æ66†RFòv–æF÷w2WFFSÂôÆ–æ³âãÂöÆ“à¢ÆÆ“åfW&–f–6"'V—f÷2FR6—7FVÖR–ÖvVÒFR6ö×öæVçFW2ãÂöÆ“à¢ÆÆ“å&W&òfì:vFò6öÒ&W6W'f:|:6òFR'V—f÷2ÂVæFòæF6–Ö&W6öÇfWRãÂöÆ“à¢ÂööÃà¢Çå6RfÆ†&V6W"<;2FWö—2F&V–æ–6–Æ—¦:|:6òÂ6öÒÖVç6vVÒFR&WfW'<:6òÂò6Ö–æ†ò:’÷WG&ó¢fV¦ÄÆ–æ²FóÒ"ö&Æör÷v–æF÷w2×WFFR×G&fFòÖFW6f¦VæFòÖÇFW&6öW2"6Æ74æÖSÒ'FW‡BÖ66VçB#æGVÆ—¦:|:6òG&fFRFW6f¦VæFòÇFW&:|;VW3ÂôÆ–æ³âãÂ÷à  ¢Æƒ#åfW&–f–6:|:6òFR'V—f÷2RFR6ö×öæVçFW3Âöƒ#à¢Çå<:6òGV2fW'&ÖVçF2F–fW&VçFW2R÷&FVÒ–×÷'FâfW&–f–6:|:6òFR'V—f÷2Fò6—7FVÖW†Ö–æR&W7FW&'V—f÷2&÷FVv–F÷2W6æFò<;7–Æö6ÂFR6ö×öæVçFW2âfW'&ÖVçFFRÖçWFVì:|:6òFR–ÖvVÒG&&Æ†æ,;7&–Æö¦FR6ö×öæVçFW2Fòv–æF÷w2ÂVR:’föçFRW6FVÆ&–ÖV—&âVæFòÆö¦W7L:Fæ–f–6FÂfW&–f–6:|:6òFR'V—f÷2ì:6òFVÒFRöæFR&W7FW&"(	B÷"—76òò&W&òF–ÖvVÒfVÒçFW2FRVÖæ÷f76FFRfW&–f–6:|:6òâÖ&2W†–vVÒ&ö×B6öÒ&—f–Ì:–v–òFÖ–æ—7G&F—fòÂFV×òRæVæ‡VÖ–çFW''W:|:6òâ6–v6V×&RFö7VÖVçF:|:6òGVÂFÖ–7&÷6ögB&6–çF†RW†FF7VfW'<:6òãÂ÷à ¢Æƒ#å6W'fœ:v÷2VçföÇf–F÷3Âöƒ#à¢ÇäòV6÷76—7FVÖ–æ6ÇV’ò6W'fœ:vòFòv–æF÷w2WFFRÂò6W'fœ:vòFRG&ç6fW,:¦æ6––çFVÆ–vVçFRVÒ6VwVæFòÆæòÂ÷26W'fœ:v÷27&—Föw,:f–6÷2Âò÷'VW7G&F÷"FRGVÆ—¦:|;VW2Rò6W'fœ:vòFR&W&òFò,;7&–òWFFRâfÆR6öæf—&Ö"VRW7L:6òVÒW†V7\:|:6òâì:6òfÆRFW6&–Æ—F"æVæ‡VÒFVÆW3¢ò6W'fœ:vòFR&W&òÂVÒW7V6–ÂÂW†—7FR§W7FÖVçFR&&V6öÆö6"6ö×öæVçFW2VV'&F÷2æòÇVv"ÂRFW6Æ–|:ÖÆò&VÖ÷fRVÖ&÷F\:|:6ò6VÒ&W6öÇfW"6W6ãÂ÷à ¢Æƒ#åv–æF÷w2Rv–æF÷w2Âöƒ#à¢Çä÷2W7L:v–÷2<:6ò÷2ÖW6Ö÷2ÂÖ2÷26Ö–æ†÷2F2FVÆ2RòæöÖRFRÆwVÖ2÷:|;VW2×VFÒVçG&R2fW'<;VW2â6öæf—&ÖR7VfW'<:6òçFW2FR6VwV—"VÇVW"&÷FV—&òVæ6öçG&Fòæ–çFW&æWB(	B–ç7G'\:|;VW2W67&—F2&VÖfW'<:6òg&WVVçFVÖVçFR6—FÒFVÆ2VR÷WG&ì:6òFVÒãÂ÷à ¢Æƒ#äGVÆ—¦:|:6òRG&—fW'3Âöƒ#à¢Çå'FRF2GVÆ—¦:|;VW2VçG&VvG&—fW'2âVÖ&WfW'<:6òÆövò;72&V–æ–6–Æ—¦:|:6ò6÷7GVÖöçF"&G&—fW"&V6VçFR–æ6ö×L:×fVÂÂRì:6ò&òv–æF÷w2VÒ6’âVæFòò&ö&ÆVÖ6öÖ\:v÷R§VçFò6öÒVÖGVÆ—¦:|:6òFRl:ÖFVòÂ&VFR÷R&Ö¦VæÖVçFòÂfÆ–RòG&—fW"çFW2FR'F—"&&W&òW6Fò(	BR6öç6–FW&Rò†—7L;7&–6òFRÄÆ–æ²FóÒ"ö&Æörö6öF–v÷2ÖFRÖW'&ò×FVÆÖ§VÂ×v–æF÷w2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ<;6F–v÷2FRW'&òFRFVÆ§VÃÂôÆ–æ³â6R†÷WfW"G&fÖVçFò76ö6–FòãÂ÷à ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“äv"7F2Fòv–æF÷w2÷"6öçF,;7&–6öÖò&–ÖV—&FVçFF—fãÂöÆ“à¢ÆÆ“äW†V7WF"67&—G2FRFW&6V—&÷2VR&öÖWFVÒ'&W6WF"GVFò"6VÒVRfö<:¢6–&òVRVÆW2ÇFW&ÒãÂöÆ“à¢ÆÆ“äFW6F—f"òv–æF÷w2WFFRW&ÖæVçFVÖVçFR&6Æ"ò6–çFöÖãÂöÆ“à¢ÆÆ“äFW6&–Æ—F"ò6W'fœ:vòFR&W&òFòWFFR÷RÇFW&"W&Ö—7<;VW2FVÆR÷"–ç7G'\:|:6òFRl;7'VÒãÂöÆ“à¢ÆÆ“äÖW†W"æò&Vv—7G&ò6VÒF–vì;77F–6òR6VÒöçFòFR&WF÷&æòãÂöÆ“à¢ÆÆ“äFW6Æ–v"Ü:V–ææò&÷L:6òGW&çFRVÖ–ç7FÆ:|:6òVR–æFÖ÷7G&F—f–FFRFRF—66òãÂöÆ“à¢ÆÆ“äf÷&ÖF"6öÖò&–ÖV—&6öÇ\:|:6òãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&RF–çFRFR&V–ì:Ö6–÷2VÒÆ:vòÂfÆ†FR–æ–6–Æ—¦:|:6òÂVF–Fò–æW7W&FòFR6†fRFR&V7WW&:|:6òFR7&—Föw&f–FRF—66ò÷R6÷''W:|:6òVR&WF÷&æ6FFVçFF—fâçFW2FRVÇVW"&W&ò&ögVæFòÂv&çF<;7–F÷2'V—f÷2–×÷'FçFW2(	BfV¦ÄÆ–æ²FóÒ"÷6W'f–6÷2ö&6·W×&ÖV×&W62"6Æ74æÖSÒ'FW‡BÖ66VçB#æ&6·WFRFF÷3ÂôÆ–æ³âãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòòÖW6ÖòW'&òW'6—7F—"FWö—2F&öw&W7<:6ò6ö×ÆWFÂVæFòÜ:V–æì:6ò6öæ6ÇV—"–æ–6–Æ—¦:|:6ò÷RVæFò†÷WfW"FF÷26VÒ<;7–âfÆ–:|:6òVÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³ã²&V–ç7FÆ:|:6òÂVæ26öÖò;¦ÇF–Öò76òÂVÒÄÆ–æ²FóÒ"÷6W'f–6÷2öf÷&ÖF6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æf÷&ÖF:|:6òR–ç7FÆ:|:6òFò6—7FVÖÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&Æ–×"Ö66†RÖFò×v–æF÷w2×WFFR×6ögGv&VF—7G&–'WF–öâ#¢°¢F—FÆS¢$66†RFòv–æF÷w2WFFS¢òVR:’6ögGv&TF—7G&–'WF–öâR6öÖòG&L:ÖÆ6VÒ&—66ò"À¢W†6W'C ¢$7FwV&FF÷væÆöG2R†—7L;7&–6òFòWFFRâ&VæöÖV":’&WfW'<:×fVÂÂv"ì:6ò:’âVæFòò&ö6VF–ÖVçFò§VFÂòVRVÆR7W7FR÷"VRì:6ò:’6öÇ\:|:6òVæ—fW'6Ââ"À¢FFS¢###bÓ‚Ó#b"À¢&VEF–ÖS¢#’Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#ä–ç7G'\:|:6ò&wVR6ögGv&TF—7G&–'WF–öâ"6—&7VÆVÒFöFòl;7'VÒFR7W÷'FRâVÆ:2fW¦W2gVæ6–öæÂ×V—F2fW¦W2ì:6ò×VFæFRÂfV—Ff÷&FR÷&FVÒÂ7&–VÒ6VwVæFò&ö&ÆVÖâfÆRVçFVæFW"òVR7Ff¢çFW2FRÖW†W"æVÆãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çä6ögGv&TF—7G&–'WF–öâ:’:&VFRG&&Æ†òFòv–æF÷w2WFFS¢wV&F÷26÷FW2&—†F÷2R÷2FF÷2Ff–ÆâG&L:ÖÆ<;2f¢6VçF–FòVæFòò6–çFöÖ:’FRF÷væÆöBG&fFò÷RFRf–Æ6÷'&ö×–Fâò&ö6VF–ÖVçFò6÷'&WFò:’&"÷26W'fœ:v÷2ÂÇ7G&öæsç&VæöÖV#Â÷7G&öæsâ7FVÒfW¢FR|:ÖÆR&V–æ–6–"÷26W'fœ:v÷2(	B76–Òòv–æF÷w2&V7&–W7G'WGW&Rfö<:¢ÖçL:–ÒVÒ6Ö–æ†òFRföÇFâ—76òì:6ò6öç6W'FW'&òFR–ç7FÆ:|:6òæVÒ6ö×öæVçFRFæ–f–6FòãÂ÷à ¢Æƒ#äòVR7Ff£Âöƒ#à¢Æƒ3äVÒFW&Ö÷26–×ÆW3Âöƒ3à¢Çì8’òFW;76—FòFV×÷,:&–òFòWFFS¢òVRfö’&—†FòÂòVRW7L:æf–ÆR'FRFò&Vv—7G&òFòVR¬:76÷R÷"Æ’ãÂ÷à¢Æƒ3äòVR6öçFV6RFV6æ–6ÖVçFSÂöƒ3à¢Çä÷26W'fœ:v÷2FRGVÆ—¦:|:6òRFRG&ç6fW,:¦æ6–VÒ6VwVæFòÆæòW67&WfVÒÆ’÷26÷FW2RòW7FFòFf–Æâ6RVÒF÷væÆöB:’–çFW'&ö×–FòFRf÷&Ö7V¦ÂòW7FFòöFRf–6"–æ6öç6—7FVçFRRòv–æF÷w2–ç6—7FRVÒ&WFöÖ"ÆvòVRì:6òW†—7FRÖ—2(	BF:ÒòF÷væÆöBWFW&æòVÒRãÂ÷à¢Æƒ3äòVRfö<:¢W&FRò&V7&–#Âöƒ3à¢Çä÷2F÷væÆöG2¬:fV—F÷2ÂVR6W,:6ò&—†F÷2FRæ÷fòÂR'FRFò†—7L;7&–6òFRGVÆ—¦:|;VW2W†–&–Fòæ26öæf–wW&:|;VW2âæVæ‡VÒ'V—fòW76öÂ:’fWFFòÂÖ2,;7†–ÖfW&–f–6:|:6ò6W,:Ö—2FVÖ÷&FãÂ÷à ¢Æƒ#åVæFòò&ö6VF–ÖVçFò§VF(	BRVæFòì:6ò§VFÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒå6–çFöÖÂ÷FƒãÇFƒåG&F"ò66†R§VFóÂ÷FƒãÇFƒäÖ÷F—fóÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCäF÷væÆöB&FòVÒR÷"†÷&3Â÷FCãÇFCå&÷ffVÆÖVçFR6–ÓÂ÷FCãÇFCäf–Æ–æ6öç6—7FVçFSÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäW'&ò&WWF–Fò6V×&RæòÖW6Öò6÷FSÂ÷FCãÇFCåFÇfW£Â÷FCãÇFCå6÷FR6÷'&ö×–Fòæò66†SÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä–ç7FÆ:|:6òVRfÆ†;72SÂ÷FCãÇFCå÷V6ò&÷l:fVÃÂ÷FCãÇFCå&ö&ÆVÖ:’FR6ö×öæVçFW2Âì:6òFRF÷væÆöCÂ÷FCãÂ÷G#à¢ÇG#ãÇFCâ$FW6f¦VæFòÇFW&:|;VW2";72&V–æ–6–#Â÷FCãÇFCäì:6óÂ÷FCãÇFCå&WfW'<:6òö6÷'&RFWö—2FòF÷væÆöCÂ÷FCãÂ÷G#à¢ÇG#ãÇFCåfW&–f–6:|:6ò–æf–æ—FÂ÷FCãÇFCì82fW¦W3Â÷FCãÇFCåöFR6W"&VFRÂ†÷&Fò6—7FVÖ÷R6W'fœ:vò&FóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäfÇFFRW7:vòVÒF—66óÂ÷FCãÇFCäÌ:×f–òFV×÷,:&–óÂ÷FCãÇFCäÆ–&W&W7:vòÂÖ26W66öçF–çVÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#å&ö6VF–ÖVçFò&WfW'<:×fVÂÂæ÷&FVÓÂöƒ#à¢ÆöÃà¢ÆÆ“äf:vG&–vVÒFW67&—FVÒÄÆ–æ²FóÒ"ö&Æör÷v–æF÷w2×WFFRÖæòÖgVæ6–öæÖò×VR×fW&–f–6""6Æ74æÖSÒ'FW‡BÖ66VçB#åv–æF÷w2WFFRì:6ògVæ6–öæÂôÆ–æ³âRW†V7WFRçFW26öÇ\:|:6òFR&ö&ÆVÖ2Fò,;7&–ò6—7FVÖãÂöÆ“à¢ÆÆ“ä'&ò&ö×BFR6öÖæFò6öÖòFÖ–æ—7G&F÷"ãÂöÆ“à¢ÆÆ“å&R÷26W'fœ:v÷2FRGVÆ—¦:|:6òRFRG&ç6fW,:¦æ6–VÒ6VwVæFòÆæòâ6RÆwVÒ&V7W6"&"Â&V–æ–6–RÜ:V–æRFVçFRFRæ÷fò(	Bì:6òf÷&6RãÂöÆ“à¢ÆÆ“å&VæöÖV–R7F3¥Åv–æF÷w5Å6ögGv&TF—7G&–'WF–öâ&6ögGv&TF—7G&–'WF–öâæöÆBâ&VæöÖV"&W6W'fGVFó²v"VÆ–Ö–æ÷76–&–Æ–FFRFR&V7WW&"ò†—7L;7&–6òãÂöÆ“à¢ÆÆ“ä–æ–6–Ræ÷fÖVçFR÷26W'fœ:v÷2&F÷2ãÂöÆ“à¢ÆÆ“åfW&–f—VRGVÆ—¦:|;VW2âòv–æF÷w2&V7&–7FWFöÖF–6ÖVçFRãÂöÆ“à¢ÆÆ“å6Rò&ö&ÆVÖì:6ò×VF÷RÂ&W7FW&RòæöÖR÷&–v–æÂR6–v&ò&W&òFR6ö×öæVçFW2â6R&W6öÇfWRRÜ:V–æ76÷RF–2W7L:fVÂÂfö<:¢öFR&VÖ÷fW"7FçF–v&Æ–&W&"W7:vòãÂöÆ“à¢ÂööÃà ¢Æƒ#å&VæöÖV"9rv#Âöƒ#à¢Çå&VæöÖV"FWföÇfRò6öçG&öÆS¢6Rò6ö×÷'FÖVçFò–÷&"Â&7F&W7FW&"òæöÖRâv":’FVf–æ—F—fòÂ6÷7GVÖW6&'&"VÒ'V—f÷2VÒW6òRÂVæFòfV—Fò6öÒ÷26W'fœ:v÷2&öFæFòÂFV—†òW7FFòVÆÖWFFRâFÖ,:–ÒW†—7FR7FFR66†RF÷26W'fœ:v÷27&—Föw,:f–6÷2Âg&WVVçFVÖVçFR6—FFVÒ6öæ§VçFò(	BòÖW6Öò&–æ<:×–ò6RÆ–6¢&VæöÖV–RÂì:6òwVRÂR<;26Rò6–çFöÖ§W7F–f–6"ãÂ÷à ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“äv"7F6öÒ÷26W'fœ:v÷2VÒW†V7\:|:6òãÂöÆ“à¢ÆÆ“åG&F"ò66†R6öÖòÖçWFVì:|:6ò&WfVçF—fFR&÷F–æâì:6ò:’ãÂöÆ“à¢ÆÆ“å&öF"67&—G2&öçF÷2FR'&W6WB6ö×ÆWFòFòv–æF÷w2WFFR"&—†F÷2FR6—FW2FW66öæ†V6–F÷3¢VÆW2ÇFW&Ò6W'fœ:v÷2ÂW&Ö—7<;VW2R&Vv—7G&òFRVÖfW¢Â6VÒ&Vv—7G&òFòVR×VF&ÒãÂöÆ“à¢ÆÆ“äFW6&–Æ—F"6W'fœ:v÷2FòWFFRFWö—2Fò&ö6VF–ÖVçFò'&ì:6òföÇF"6öçFV6W""ãÂöÆ“à¢ÆÆ“äÇFW&"W&Ö—7<;VW2FR7F2Fò6—7FVÖ&6öç6VwV—"v"ÆvòVRW7L:VÒW6òãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFò÷26W'fœ:v÷2ì:6ò&&VÒÂVæFòòW'&ò&WF÷&æ"–L:¦çF–6òFWö—2F&V7&–:|:6òFò66†R÷RVæFòÜ:V–æ6öÖ\:v"&W6VçF"ÆVçF–L:6òRG&fÖVçFò§VçFò6öÒfÆ†(	B6–æÂFRVRò77VçFò:’Ö–÷"VRòWFFRâfÆ–:|:6òVÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢'v–æF÷w2×WFFR×G&fFòÖFW6f¦VæFòÖÇFW&6öW2#¢°¢F—FÆS¢uv–æF÷w2WFFRG&fFò÷R&FW6f¦VæFòÇFW&:|;VW2"rÀ¢W†6W'C ¢$6öÖòF—7F–æwV—"–çFW&f6R&FFR&ö6W76ò&VÆÖVçFR&FòÂ÷"VRòv–æF÷w2&WfW'FRVÖGVÆ—¦:|:6òRòVRf¦W"çFW2FRFW6Æ–v"Ü:V–ææò&÷L:6òâ"À¢FFS¢###bÓ‚Ó#b"À¢&VEF–ÖS¢#’Ö–â"À¢6FVv÷'“¢$F–vì;77F–6ò"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#åFVÆ§VÂÖW67W&6öÒ&ì:6òFW6Æ–wVRò6ö×WFF÷""&FæÖW6Ö÷&6VçFvVÒ÷"VÖ†÷&:’òÖöÖVçFòVÒVRÖ—2vVçFRW7G&v,;7&–Ü:V–æâçFW2FR6VwW&"ò&÷L:6òFRVæW&v–Â:’&V6—6ò6&W"6Rò&ö6W76òW7L:&VÆÖVçFR&FòãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çå÷&6VçFvVÒ6öævVÆFì:6ò6–væ–f–6&ö6W76ò&Fòâö'6W'fRò–æF–6F÷"FRF—f–FFRFòF—66òÂò'\:ÖFòFòWV—ÖVçFòRòFV×òF÷FÃ¢GVÆ—¦:|;VW2FR&V7W'6òöFVÒÆWf"&7FçFRFV×òÂW7V6–ÆÖVçFRVÒF—66òÖV<:&æ–6òâÖVç6vVÒ&FW6f¦VæFòÇFW&:|;VW2"–æF–6&WfW'<:6òWFöÜ:F–6(	BVÒÖV6æ—6ÖòFR&÷F\:|:6òVRFWföÇfRò6—7FVÖòW7FFòçFW&–÷"ÂRì:6ò6–æÂFRVRòv–æF÷w26÷'&ö×WRãÂ÷à ¢Æƒ#äòVR:’&WfW'<:6óÂöƒ#à¢Æƒ3äVÒFW&Ö÷26–×ÆW3Âöƒ3à¢ÇåVæFò–ç7FÆ:|:6òVæ6öçG&VÒö'7L:7VÆòFWö—2F&V–æ–6–Æ—¦:|:6òÂòv–æF÷w2FW6f¢òVRÆ–6÷RRföÇFòW7FFòVRgVæ6–öæfâfö<:¢W&FRGVÆ—¦:|:6òÂì:6òò6—7FVÖãÂ÷à¢Æƒ3äòVR6öçFV6RFV6æ–6ÖVçFSÂöƒ3à¢ÇäÆ–6:|:6òf–æÂ6öçFV6Rf÷&F6W7<:6òFòW7\:&–òÂ6öÒò6—7FVÖVÒÖöFòFRÖçWFVì:|:6òâ6RVÒ6ö×öæVçFRì:6òöFR6W"7V'7F—G\:ÖFòÂVÒG&—fW"&V7W66'&Vv"÷RfÇFW7:vòÂòÖV6æ—6Öò–çFW'&ö×RR&W7FW&÷2'V—f÷2çFW&–÷&W2â÷"—76òÖVç6vVÒ&V6RFWö—2(	BRì:6òGW&çFR(	BòF÷væÆöBãÂ÷à¢Æƒ3ä6öÖòòW7\:&–òW&6V&SÂöƒ3à¢ÇäÜ:V–æVR&V–æ–6–ÂÖ÷7G&&öw&W76òÂföÇFG,:2R&WF÷&æ::&VFRG&&Æ†ò6öÒÖW6ÖfW'<:6òFRçFW2â82fW¦W26öÒVÒ<;6F–vòFRW'&òæò†—7L;7&–6òÂ:2fW¦W26VÒæVæ‡VÒãÂ÷à ¢Æƒ#ä–çFW&f6R&F9r&ö6W76ò&FóÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒäö'6W'f:|:6óÂ÷FƒãÇFƒä–çFW'&WF:|:6óÂ÷FƒãÇFƒä:|:6óÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCäÇW¢FRF—f–FFRFòF—66ò—66æFóÂ÷FCãÇFCå&ö6W76òF—fóÂ÷FCãÇFCäwV&F#Â÷FCãÂ÷G#à¢ÇG#ãÇFCåfVçFö–æ†f&–æFòFR&÷F:|:6óÂ÷FCãÇFCä6&v&VÂFR&ö6W76ÖVçFóÂ÷FCãÇFCäwV&F#Â÷FCãÂ÷G#à¢ÇG#ãÇFCå÷&6VçFvVÒ&FŒ:#Ö–çWF÷26öÒF—66òF—fóÂ÷FCãÇFCäWFFVÖ÷&Fæ÷&ÖÃÂ÷FCãÇFCäwV&F#Â÷FCãÂ÷G#à¢ÇG#ãÇFCäæVæ‡VÖF—f–FFR÷"l:&–2†÷&2ÂÜ:V–æg&–Â÷FCãÇFCå&÷l:fVÂG&fÖVçFóÂ÷FCãÇFCä6öç6–FW&"–çFW'fVì:|:6ò6öÒ6WFVÆÂ÷FCãÂ÷G#à¢ÇG#ãÇFCåFVÆ&WF6öÒ7W'6÷";72&V–æ–6–#Â÷FCãÇFCå6W7<:6ò6VÒ–çFW&f6SÂ÷FCãÇFCäwV&F"çFW2FRf÷,:v#Â÷FCãÂ÷G#à¢ÇG#ãÇFCå&V–ì:Ö6–òVÒÆ:vò&WWF–æFòÖW6ÖWFÂ÷FCãÇFCäfÆ†W'6—7FVçFSÂ÷FCãÇFCå&"RfÆ–"&V7WW&:|:6óÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#ì8'f÷&RFRFV6—<:6óÂöƒ#à¢ÆöÃà¢ÆÆ“äŒ:F—f–FFRFRF—66ò÷Rf&–:|:6òFRfVçFö–æ†ò6–Ò(i"W7W&S²GVÆ—¦:|;VW2w&æFW2VÒF—66òÖV<:&æ–6òFVÖ÷&Ò×V—FòãÂöÆ“à¢ÆÆ“å6VÒF—f–FFR÷"†÷&3ò(i"FW6Æ–vÖVçFòVÆò&÷L:6ò766W";¦ÇF–ÖÇFW&æF—fÂ6–VçFRFò&—66òFRFV—†"–ç7FÆ:|:6òVÆÖWFFRãÂöÆ“à¢ÆÆ“äÜ:V–æ&WfW'FWRRföÇF÷Ròæ÷&ÖÃò(i"–çfW7F–wVR6W6çFW2FRFVçF"FRæ÷fó¢W7:vòÂG&—fW"&V6VçFRÂW&–l:—&–6ò6öæV7FFòÂ&öw&ÖFR6VwW&ì:vãÂöÆ“à¢ÆÆ“å&WfW'FR6V×&RæòÖW6ÖòöçFóò(i":’fÆ†&W&öGWL:×fVÃ²6–v&öw&W7<:6òFR&W&òVÒÄÆ–æ²FóÒ"ö&Æör÷v–æF÷w2×WFFRÖæòÖgVæ6–öæÖò×VR×fW&–f–6""6Æ74æÖSÒ'FW‡BÖ66VçB#åv–æF÷w2WFFRì:6ògVæ6–öæÂôÆ–æ³âãÂöÆ“à¢ÆÆ“äì:6ò6öæ6ÇV’–æ–6–Æ—¦:|:6ò÷RVFR6†fRFR&V7WW&:|:6óò(i"&RRG&FR6öÖò&V7WW&:|:6òÂì:6ò6öÖòGVÆ—¦:|:6òãÂöÆ“à¢ÂööÃà ¢Æƒ#ä6W626ö×Vç2F&WfW'<:6óÂöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsäG&—fW"–æ6ö×L:×fVÃ£Â÷7G&öæsâl:ÖFVòÂ&VFRR&Ö¦VæÖVçFòÆ–FW&ÒÆ—7FâVÒG&—fW"×V—FòçF–vò(	B÷R×V—Fòæ÷fò(	BöFR&'&"GVÆ—¦:|:6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäW7:vò–ç7Vf–6–VçFS£Â÷7G&öæsâfÇFFRW7:vòæòÖV–òFÆ–6:|:6òf–æÂFW''V&GVFòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6ö×öæVçFW2Fæ–f–6F÷3£Â÷7G&öæsâVæFòÆö¦FR6ö×öæVçFW2W7L:–æ6öç6—7FVçFRÂ7V'7F—GVœ:|:6òFR'V—f÷2fÆ†ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&öw&ÖFR6VwW&ì:vFRFW&6V—&÷3£Â÷7G&öæsâÆwVç2&Æ÷VV–ÒÇFW&:|;VW2&ögVæF2Fò6—7FVÖãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåW&–l:—&–6÷3£Â÷7G&öæsâF—66÷2W‡FW&æ÷2ÂÆV—F÷&W2RFFF÷&W2öFVÒ–çFW&fW&—#²FW66öæV7FRòVRì:6òf÷"W76Væ6–ÂçFW2FR&WWF—"ãÂöÆ“à¢Â÷VÃà ¢Æƒ#äFWö—2FR&WfW'FW"ÂçFW2FRFVçF"FRæ÷fóÂöƒ#à¢ÇäÆ–&W&RW7:vòÂGVÆ—¦RòG&—fW"FRl:ÖFVòVÆò6—FRFòf'&–6çFRÂFW66öæV7FRW&–l:—&–6÷2Â&V–æ–6–RRFVçFRVÖ;¦æ–6fW¢â&WWF—"ÖW6ÖFVçFF—f6VÒ×VF"æF<;2&W&öGW¢ÖW6Ö&WfW'<:6òâ6Rò†—7L;7&–6òÖ÷7G&<;6F–vòFRW'&òÂæ÷FRÖò6öÒò†÷,:&–ó¢VÆR÷&–VçFò,;7†–Öò76òâ<;6F–v÷26öÖò÷2F2fÜ:ÖÆ–2ƒƒsRƒƒ#C&V6VÒVÒ6öçFW‡F÷2F–fW&VçFW2Rì:6òL:¦Ò6öÇ\:|:6ò;¦æ–6(	BòÖW6Öòì;¦ÖW&òöFR–æF–6",:&ÖWG&ò–çl:Æ–FòÂfÇFFRW7:vò÷RfÆ†FR6ö×Væ–6:|:6ò6öÒò6W'fœ:vòÂFWVæFVæFòFòW7L:v–òVÒVR7W&v—RãÂ÷à ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“äFW6Æ–v"æò&÷L:6òVçVçFò†÷WfW"F—f–FFRFRF—66òãÂöÆ“à¢ÆÆ“ä–çFW'&ö×W"&WWF–FÖVçFRÖW6Ö–ç7FÆ:|:6ó¢6F6÷'FRVÖVçF6†æ6RFRFV—†"6ö×öæVçFW2VÆÖWFFRãÂöÆ“à¢ÆÆ“äFW6F—f"òv–æF÷w2WFFR&'&"FRFVçF""ãÂöÆ“à¢ÆÆ“äFW6&–Æ—F"ò6W'fœ:vòFR&W&òFòWFFR(	BVÆRW†—7FR&&V6öÆö6"6ö×öæVçFW2æòÇVv"ãÂöÆ“à¢ÆÆ“å&öF"67&—G2FW66öæ†V6–F÷2FR&W&òVçVçFòÜ:V–æW7L:–ç7L:fVÂãÂöÆ“à¢ÆÆ“äf÷&ÖF"çFW2FRv&çF—"<;7–F÷2'V—f÷2ãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&RVæFòÜ:V–æVçG&"VÒÆ:vòFR&V–ì:Ö6–òÂVæFò–æ–6–Æ—¦:|:6òfÆ†"ÂVæFò7W&v—"VF–FòFR6†fRFR&V7WW&:|:6òFR7&—Föw&f–FRF—66ò÷RVæFòW†—7F—&VÒFF÷2–×÷'FçFW26VÒ<;7–â&–÷&–FFR766W"&W6W'f"÷2'V—f÷2(	BfV¦ÄÆ–æ²FóÒ"÷6W'f–6÷2ö&6·W×&ÖV×&W62"6Æ74æÖSÒ'FW‡BÖ66VçB#æ&6·WFRFF÷3ÂôÆ–æ³âRÄÆ–æ²FóÒ"÷6W'f–6÷2÷&V7WW&6òÖFRÖFF÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&V7WW&:|:6òFRFF÷3ÂôÆ–æ³âãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFò&WfW'<:6ò6R&WWF—"FWö—2F26÷'&\:|;VW26–ÖÂVæFòò6—7FVÖì:6ò–æ–6–"÷RVæFòfö<:¢ì:6òF—fW"6†fRFR&V7WW&:|:6òVÒÜ:6÷2âfÆ–:|:6òVÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢òò)H)HöæFòÆ÷FRB(	B$”õ2ÂTTd’R–æ–6–Æ—¦:|:6òFòv–æF÷w2à¢òò&67Væ†÷3¢6VÒ&÷f:|:6òVF—F÷&–ÂVçVçFòòvFRFöæF2ì:6ò6öç6öÆ–F ¢òò†æö–æFW‚Âf÷&Fò6—FVÖRf÷&FÆ—7FvVÒ;¦&Æ–6(	Bf–ÂÖ6Æ÷6VB’à ¢&&ö÷B×VVf’Ö÷RÖÆVv7’Ö6öÖòÖ–FVçF–f–6"#¢°¢F—FÆS¢%TTd’÷RÆVv7“¢6öÖò–FVçF–f–6"òÖöFòFR–æ–6–Æ—¦:|:6òFò6WR2"À¢W†6W'C ¢$6öÖòFW66ö'&—"VÒVÂÖöFòòv–æF÷w2fö’–ç7FÆFòÂ÷"VRuBRÔ%"–×÷'FÒRòVR×VFòÇFW&æ"VçG&RTTd’RÆVv7’6VÒ&W&"òF—66òâ"À¢FFS¢###bÓ‚Ó3"À¢&VEF–ÖS¢#’Ö–â"À¢6FVv÷'“¢$F–vì;77F–6ò"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#åG&ö6"òÖöFòFR–æ–6–Æ—¦:|:6ò:26Vv2:’VÖF2f÷&Ö2Ö—2,:–F2FRG&ç6f÷&Ö"VÖÜ:V–æVRÆ–vfVÒVÖÜ:V–æVR<;2'&RFVÆFR6öæf–wW&:|:6òâçFW2FRÖW†W"ÂfÆR6&W"VÒVRÖöFòò6—7FVÖfö’–ç7FÆFòãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢ÇäòÖöFòFR–æ–6–Æ—¦:|:6ò&V6—66öÖ&–æ"6öÒòf÷&ÖFòFF&VÆFR'Fœ:|;VW2FòF—66òVÒVRòv–æF÷w2fö’–ç7FÆFó¢TTd’G&&Æ†6öÒuBÂÆVv7’ô54ÒG&&Æ†6öÒÔ%"â6Rfö<:¢ÇFW&æ"òÖöFò6VÒ6öçfW'FW"òF—66òÂòf—&×v&RFV—†FRVæ6öçG&"ò6'&VvF÷"Fò6—7FVÖRÜ:V–æ&æ6öæf–wW&:|:6ò÷RW†–&RÖVç6vVÒFRF—7÷6—F—fòFR–æ–6–Æ—¦:|:6òW6VçFRãÂ÷à ¢Æƒ#ä6öÖò–FVçF–f–6"6VÒ'&—"Ü:V–æÂöƒ#à¢Æƒ3åVÆò,;7&–òv–æF÷w3Âöƒ3à¢Çäæ2–æf÷&Ö:|;VW2Fò6—7FVÖÂò6×òFRÖöFòFR$”õ2Ö÷7G&%TTd’"÷R$ÆVv7’"âæòvW&Væ6–F÷"FRF—66÷2Â2&÷&–VFFW2FòF—66ò–æF–6Ò6RòW7F–ÆòFR'Fœ:|:6ò:’uB÷RÔ%"â÷2Fö—2&V6—6Ò6W"6öW&VçFW2VçG&R6’ãÂ÷à¢Æƒ3åVÆòf—&×v&SÂöƒ3à¢ÇäæFVÆFR6öæf–wW&:|:6òÂÆ—7FFRF—7÷6—F—f÷2FR–æ–6–Æ—¦:|:6òVçG&Vv&W7÷7F¢VçG&F26öÒò&Vf—†ò%TTd’"çFW2FòæöÖRFòF—66ò–æF–6ÒÖöFòTTd“²VçG&F2Væ26öÒòæöÖRFòF—66ò6÷7GVÖÒ–æF–6"ÆVv7’â&W6Vì:vFR÷:|;VW26öÖò54ÒÂ6V7W&R&ö÷BR%v–æF÷w2TTd’ÖöFR"FÖ,:–Ò6–æÆ—¦òÖöFòF—fòãÂ÷à¢Æƒ3åVÆò6ö×÷'FÖVçFóÂöƒ3à¢Çä–ç7FÆ:|;VW2TTd’æ÷&ÖÆÖVçFR–æ–6–ÒÖ—2,:–FòÂW†–&VÒòÆöv÷F—òFòf'&–6çFRRW6ÒVÖ'Fœ:|:6òFR6—7FVÖ6W&Fâ–ç7FÆ:|;VW2ÆVv7’FVæFVÒÖ÷7G&"Ö—2FW‡FòGW&çFRòõ5BãÂ÷à ¢Æƒ#åF&VÆFR6öÖ&–æ:|;VW3Âöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒäÖöFòFòf—&×v&SÂ÷FƒãÇFƒå'Fœ:|:6òFòF—66óÂ÷FƒãÇFƒå&W7VÇFFóÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCåTTd“Â÷FCãÇFCäuCÂ÷FCãÇFCä–æ–6–Æ—¦æ÷&ÖÆÖVçFSÂ÷FCãÂ÷G#à¢ÇG#ãÇFCåTTd“Â÷FCãÇFCäÔ%#Â÷FCãÇFCäF—66òì:6ò&V6R6öÖò÷:|:6òFR&ö÷CÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäÆVv7’ô54ÓÂ÷FCãÇFCäÔ%#Â÷FCãÇFCä–æ–6–Æ—¦æ÷&ÖÆÖVçFSÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäÆVv7’ô54ÓÂ÷FCãÇFCäuCÂ÷FCãÇFCäf—&×v&R–væ÷&ò6'&VvF÷#Â÷FCãÂ÷G#à¢ÇG#ãÇFCåTTd’6öÒ6V7W&R&ö÷CÂ÷FCãÇFCäuBÂÜ:ÖF–ì:6ò76–æFÂ÷FCãÇFCåVæG&—fRFR–ç7FÆ:|:6ò&V7W6FóÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#åVæFò—76ò&V6Ræ,:F–6Âöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsäFWö—2FRÆ–×"ò4Ôõ3£Â÷7G&öæsâòf—&×v&RföÇFòG,:6òFRl:'&–6RöFR&VF—f"54Ò÷RFW6Æ–v"TTd’ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFWö—2FRG&ö6"òF—66ó£Â÷7G&öæsâòæ÷fòF—66òöFRW7F"VÒ÷WG&òW7F–ÆòFR'Fœ:|:6òâò6Vì:&–ò6ö×ÆWFòW7L:VÒÄÆ–æ²FóÒ"ö&Æör÷G&÷VV’Öò×76BÖRÖò×2×6òÖ'&RÖÖ&–÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#çG&÷VV’ò54BRò2<;2'&R$”õ3ÂôÆ–æ³âãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäæ–ç7FÆ:|:6òFòv–æF÷w3£Â÷7G&öæsâÜ:ÖF–7&–FVÒÔ%"ì:6ò–æ–6–VÒÖöFòTTd’W&òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFWö—2FRGVÆ—¦"òf—&×v&S£Â÷7G&öæsâ6öæf–wW&:|:6òöFR6W"&VFVf–æ–F(	BfV¦ÄÆ–æ²FóÒ"ö&Æörö&–÷2Ö6÷'&ö×–F×&W6WBÖ6Ö÷2ÖGVÆ—¦6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#ä$”õ26÷'&ö×–FÂ&W6WBFR4Ôõ2RGVÆ—¦:|:6óÂôÆ–æ³âãÂöÆ“à¢Â÷VÃà ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“äÇFW&æ"TTd’(iBÆVv7’'&FW7F""6VÒ6&W"òW7F–ÆòFR'Fœ:|:6òFòF—66òãÂöÆ“à¢ÆÆ“ä6öçfW'FW"òF—66òFRÔ%"&uB6VÒ<;7–F÷2'V—f÷2ãÂöÆ“à¢ÆÆ“äFW6F—f"6V7W&R&ö÷BW&ÖæVçFVÖVçFR6VÒæV6W76–FFRãÂöÆ“à¢ÆÆ“å&V–ç7FÆ"ò6—7FVÖçFW2FR6öæf—&Ö"VRò&ö&ÆVÖ:’<;2FRÖöFòFR–æ–6–Æ—¦:|:6òãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&RVæFòòF—66òì:6ò&V6W"VÒæVæ‡VÒF÷2ÖöF÷3¢:Òò77VçFòFV—†FR6W"6öæf–wW&:|:6òR766W"FWFV<:|:6òFR†&Gv&R(	Bò6Ö–æ†ò:’ÄÆ–æ²FóÒ"ö&Æörö†BÖæòÖR×&V6öæ†V6–FòÖæÖ&–÷2Öò×VRÖf¦W""6Æ74æÖSÒ'FW‡BÖ66VçB#ä„Bì:6ò&V6öæ†V6–Fòæ$”õ3ÂôÆ–æ³ââ6R†÷WfW"'V—f÷2–×÷'FçFW26VÒ<;7–Â&–÷&—¦RÄÆ–æ²FóÒ"÷6W'f–6÷2÷&V7WW&6òÖFRÖFF÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&V7WW&:|:6òFRFF÷3ÂôÆ–æ³âãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòÜ:V–æ<;2–æ–6–"VÒVÒÖöFòW7V<:Öf–6òFWö—2FRVÖG&ö6FR\:vÂVæFò†÷WfW"7&—Föw&f–FRF—66òF—f÷RVæFò6öçfW'<:6òFR'Fœ:|:6òVçföÇfW"FF÷26VÒ&6·WâfÆ–:|:6òVÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&÷&FVÒÖFRÖ&ö÷BÖæÖ&–÷2Ö6öÖòÖ6öæf–wW&"#¢°¢F—FÆS¢$÷&FVÒFR&ö÷Bæ$”õ3¢6öÖò6öæf–wW&"6VÒVV'&"–æ–6–Æ—¦:|:6ò"À¢W†6W'C ¢%&VR6W'fR&–÷&–FFRFR–æ–6–Æ—¦:|:6òÂVæFòW6"òÖVçRFR&ö÷BFV×÷,:&–òR÷"VRf7B&ö÷BR÷'F2U4"G&Æ†Òò&V6öæ†V6–ÖVçFòFòVæG&—fRâ"À¢FFS¢###bÓ‚Ó3"À¢&VEF–ÖS¢#‚Ö–â"À¢6FVv÷'“¢$F–vì;77F–6ò"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#ä×V—FvVçFRVçG&æ6öæf–wW&:|:6òFòf—&×v&R&&''VÖ"ò&ö÷B"R6’FRÌ:6öÒVÖÜ:V–æ–÷"â÷&FVÒFR–æ–6–Æ—¦:|:6ò&W6öÇfR÷V6÷2&ö&ÆVÖ2(	BR:’W†FÖVçFR÷"—76òVR&V6—66W"ÖW†–F6öÒ7&—L:—&–òãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çä÷&FVÒFR&ö÷B<;2FVf–æRVÒVR6W\:¦æ6–òf—&×v&R&ö7W&VÒ6—7FVÖâVÆ&W6öÇfR66÷2FRVæG&—fR–væ÷&Fò÷RF—66òçF–vò77VÖ–æFò–æ–6–Æ—¦:|:6òâVÆì:6ò6öç6W'FF—66òì:6òFWFV7FFòÂ6—7FVÖ6÷'&ö×–FòæVÒ6'&VvF÷"W6VçFRãÂ÷à ¢Æƒ#äÖVçRFV×÷,:&–ò9r÷&FVÒW&ÖæVçFSÂöƒ#à¢Æƒ3äÖVçRFR&ö÷CÂöƒ3à¢ÇåV6RFöF÷2÷2WV—ÖVçF÷2öfW&V6VÒVÒÖVçR6–öæFò÷"VÖFV6Ææòõ5BVRW&Ö—FRW66öÆ†W"òF—7÷6—F—fòVæ2&VVÆ–æ–6–Æ—¦:|:6òâ8’ò6Ö–æ†ò6÷'&WFò&–ç7FÆ"6—7FVÖ÷RW6"Ü:ÖF–FRF–vì;77F–6òÂ÷'VRì:6òÇFW&æFFRf÷&ÖW&ÖæVçFRãÂ÷à¢Æƒ3ä÷&FVÒW&ÖæVçFSÂöƒ3à¢Çå<;2f:vÇFW&:|:6òW&ÖæVçFRVæFòòWV—ÖVçFò&VÆÖVçFR&V6—6R–æ–6–"6V×&R÷"÷WG&òF—7÷6—F—fòâæ÷FR6öæf–wW&:|:6ò÷&–v–æÂçFW2FR×VF"ãÂ÷à ¢Æƒ#å76ò76ò6VwW&óÂöƒ#à¢ÆöÃà¢ÆÆ“äæ÷FR†÷Rf÷Föw&fR’FVÆFR&–÷&–FFRGVÂçFW2FRVÇVW"×VFì:vãÂöÆ“à¢ÆÆ“å&Vf—&òÖVçRFV×÷,:&–òVæFòæV6W76–FFRf÷"öçGVÂãÂöÆ“à¢ÆÆ“å6RòVæG&—fRì:6ò&V6W"ÂFW6Æ–wVRf7B&ö÷BRFW7FRVÖ÷'FU4"G&6V—&ÂÆ–vFF—&WFÖVçFR:Æ6ãÂöÆ“à¢ÆÆ“ä6öæf—&6RVçG&F&V6R6öÒ&Vf—†òTTd’÷R6VÒVÆR(	BòÖöFò&V6—66öÖ&–æ"6öÒÜ:ÖF–ãÂöÆ“à¢ÆÆ“å6ÇfRÂ&V–æ–6–RRfW&–f—VRò&W7VÇFFòçFW2FR×VF"Ö—2ÆwVÖ6ö—6ãÂöÆ“à¢ÆÆ“å6RæF×VF"ÂföÇFR6öæf–wW&:|:6òçFW&–÷"VÒfW¢FR7V×VÆ"ÇFW&:|;VW2ãÂöÆ“à¢ÂööÃà ¢Æƒ#å÷"VRòVæG&—fRì:6ò&V6SÂöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsäf7B&ö÷BF—fó£Â÷7G&öæsâòf—&×v&RVÆf'&VGW&FRF—7÷6—F—f÷2U4"&væ†"FV×òãÂöÆ“à¢ÆÆ“ãÇ7G&öæså÷'FFòv&–æWFRg&öçFÃ£Â÷7G&öæsâW‡FVç<;VW2–çFW&æ2:2fW¦W2ì:6ò<:6ò–æ–6–Æ—¦F2FV×òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÜ:ÖF–w&fFæòW7VVÖW'&Fó£Â÷7G&öæsâÔ%"VÒÖöFòTTd’W&òÂ÷Rò–çfW'6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6V7W&R&ö÷C£Â÷7G&öæsâÜ:ÖF–2ì:6ò76–æF2<:6ò&V7W6F2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåVæG&—fR6öÒFVfV—Fó£Â÷7G&öæsâFW7FRVÒ÷WG&ò6ö×WFF÷"çFW2FR7VÇ"Æ6ãÂöÆ“à¢Â÷VÃà ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“ä×VF"l:&–2÷:|;VW2æÖW6Öf—6—FRW&FW"&VfW,:¦æ6–FòVR6W6÷Rò\:¢ãÂöÆ“à¢ÆÆ“äF—f"÷RFW6F—f"54Ò6VÒ6&W"òÖöFòFR–ç7FÆ:|:6ò(	BfV¦ÄÆ–æ²FóÒ"ö&Æörö&ö÷B×VVf’Ö÷RÖÆVv7’Ö6öÖòÖ–FVçF–f–6""6Æ74æÖSÒ'FW‡BÖ66VçB#åTTd’÷RÆVv7“ÂôÆ–æ³âãÂöÆ“à¢ÆÆ“å&W7FW&"G,;VW2FRl:'&–66VÒæ÷F"6öæf–wW&:|:6òGVÂãÂöÆ“à¢ÆÆ“äÇFW&"FVç<;VW2Âg&W\:¦æ6–2÷RW&f—2FRÖVÜ;7&–VçVçFò–çfW7F–v&ö÷BãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&RVæFòòF—66òFò6—7FVÖì:6ò&V6W"æÆ—7FFRF—7÷6—F—f÷3¢æW76R66òì:6òŒ:÷&FVÒVR&W6öÇfâò6Ö–æ†ò766W"FWFV<:|:6ò(	BÄÆ–æ²FóÒ"ö&Æörö†BÖæòÖR×&V6öæ†V6–FòÖæÖ&–÷2Öò×VRÖf¦W""6Æ74æÖSÒ'FW‡BÖ66VçB#ä„Bì:6ò&V6öæ†V6–Fòæ$”õ3ÂôÆ–æ³â(	B÷R&W&òFR–æ–6–Æ—¦:|:6òÂVÒÄÆ–æ²FóÒ"ö&Æör÷v–æF÷w2×&W&òÖWFöÖF–6òÖVÒÖÆö÷"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&W&òWFöÜ:F–6òVÒÆ:vóÂôÆ–æ³âãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFò6öæf–wW&:|:6òì:6òf÷"6ÇfVçG&R&V–æ–6–Æ—¦:|;VW2ÂVæFòÜ:V–æföÇF"6V×&RòÖW6ÖòW7FFò÷RVæFò†÷WfW"6Væ†FRf—&×v&RFW66öæ†V6–FâfÆ–:|:6òVÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢'v–æF÷w2×&W&òÖWFöÖF–6òÖVÒÖÆö÷#¢°¢F—FÆS¢%&W&òWFöÜ:F–6òVÒÆ:vó¢òVRf¦W"VæFòòv–æF÷w2ì:6ò6’FW76FVÆ"À¢W†6W'C ¢%÷"VRòv–æF÷w2VçG&VÒ&W&òWFöÜ:F–6ò&WWF–FòÂòVRö'6W'f"çFW2FRFVçF"VÇVW"6öÖæFòRVÒVRöçFò&–÷&–FFR766W"6Çf"÷2'V—f÷2â"À¢FFS¢###bÓ‚Ó3"À¢&VEF–ÖS¢#"Ö–â"À¢6FVv÷'“¢$F–vì;77F–6ò"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#â%&W&æFò&W&òWFöÜ:F–6ò"6VwV–FòFR&ò2ì:6ò–æ–6–÷R6÷'&WFÖVçFR"R÷WG&ò&V–ì:Ö6–ò:’VÒÆ:vòâFVÆ–æf÷&ÖVRòv–æF÷w2fÆ†÷Rò–æ–6–#²VÆì:6ò&÷fÂ6÷¦–æ†ÂVRò6—7FVÖW7L:6÷'&ö×–FòæVÒVRò54BÖ÷'&WRãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çäò&W&òWFöÜ:F–6òÆWfòÖ&–VçFRFR&V7WW&:|:6òFòv–æF÷w2…v–æF÷w2$R’FWö—2FRfÆ†2&WWF–F2âò6Ö–æ†ò6VwW&ò:’&Vv—7G&"ò6–çFöÖÂ&÷FVvW"÷2FF÷2Rfì:v"F÷:|:6òÖVæ÷2F—7'WF—f&Ö—2F—7'WF—fâ6öÖæF÷26÷–F÷2FRl;7'Vç2ì:6ò<:6òò&–ÖV—&ò76òãÂ÷à ¢Æƒ#äçFW2FRFVçF"VÇVW"&W&óÂöƒ#à¢ÆöÃà¢ÆÆ“ä6öæf—&ÖR6RòF—66ò&V6Ræ6öæf–wW&:|:6òFòf—&×v&Râ6Rì:6ò&V6W"Âò&ö&ÆVÖì:6ò:’Fòv–æF÷w2ãÂöÆ“à¢ÆÆ“äFW66öæV7FRW&–l:—&–6÷2ì:6òW76Væ6–—3¢VæG&—fW2Â„G2W‡FW&æ÷2ÂFFF÷&W2RÆV—F÷&W2ãÂöÆ“à¢ÆÆ“äæ÷FRò<;6F–vòFRW'&òW†–&–FòæFVÆFR÷:|;VW2fì:vF2Â6R†÷WfW"ãÂöÆ“à¢ÆÆ“åfW&–f—VR6RŒ:7&—Föw&f–FRF—66òF—fR6öæf—&ÖRÂVÒ÷WG&òF—7÷6—F—fòÂ6Rfö<:¢FVÒ6†fRFR&V7WW&:|:6ò&—DÆö6¶W"FVVÆR6ö×WFF÷"ãÂöÆ“à¢ÆÆ“äÆ—7FR÷2'V—f÷2–ç7V'7F—G\:×fV—2â6Rì:6òŒ:<;7–6öæf—&ÖFÂ&W6W'f"÷2FF÷2fVÒçFW2FR&VFVf–æ—"Â&V–ç7FÆ"÷RÇFW&"'Fœ:|;VW2ãÂöÆ“à¢ÂööÃà ¢Æƒ#ä6öÖò–çFW'&WF"òVR6öçFV6WRçFW2FòÆ:vóÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒäòVRö6÷'&WRçFW3Â÷FƒãÇFƒä†—;7FW6R–æ–6–ÃÂ÷FƒãÇFƒå&–ÖV—&:|:6ò6öW&VçFSÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCäGVÆ—¦:|:6òFòv–æF÷w3Â÷FCãÇFCä–ç7FÆ:|:6ò–æ6ö×ÆWF÷R–æ6ö×L:×fVÃÂ÷FCãÇFCäFW6–ç7FÆ"GVÆ—¦:|:6ò&V6VçFRVÆòv–æF÷w2$SÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäG&—fW"÷RW&–l:—&–6òæ÷fóÂ÷FCãÇFCäG&—fW"fÆ†æFòGW&çFR'F–FÂ÷FCãÇFCå&VÖ÷fW"òW&–l:—&–6òRFVçF"ÖöFòFR6VwW&ì:vÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä6ÆöævVÒ÷R×VFì:vFR'Fœ:|;VW3Â÷FCãÇFCäVçG&FFR&ö÷B÷R'Fœ:|:6òFR6—7FVÖ–æ6öç6—7FVçFSÂ÷FCãÇFCä–FVçF–f–6"ÖöFòFR&ö÷BÂföÇVÖW2R7&—Föw&f–çFW2FRVÇVW"6öÖæFóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCåVVFFRVæW&v–÷RFW6Æ–vÖVçFòf÷,:vFóÂ÷FCãÇFCå6—7FVÖFR'V—f÷2÷RGVÆ—¦:|:6ò–çFW'&ö×–FÂ÷FCãÇFCå&W&òFR–æ–6–Æ—¦:|:6òÂFWö—2fÆ–:|:6òFVæ–FFSÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäÆVçF–L:6òÂG&fÖVçF÷2÷R'\:ÖFò,:—f–÷3Â÷FCãÇFCä&Ö¦VæÖVçFòVÒFVw&F:|:6óÂ÷FCãÇFCå&"&W&÷2&WWF–F÷2R&–÷&—¦"÷2FF÷3Â÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#ä6W62Ö—26ö×Vç3Âöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒä6W6Â÷FƒãÇFƒå—7FL:×–6Â÷FƒãÇFƒå&—66òFR–÷&#Â÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCäFW6Æ–vÖVçFò''WFòGW&çFRGVÆ—¦:|:6óÂ÷FCãÇFCäö6÷'&WRÆövò;72–ç7FÆ"GVÆ—¦:|;VW3Â÷FCãÇFCä&—†óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäF—66ò6öÒ6WF÷&W2FVfV—GV÷6÷3Â÷FCãÇFCäÆVçF–L:6òRG&fÖVçF÷2,:—f–÷3Â÷FCãÇFCäÇFóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäG&—fW"&V<:–ÒÖ–ç7FÆFóÂ÷FCãÇFCä6öÖ\:v÷R;72–ç7FÆ"G&—fW"÷RW&–l:—&–6óÂ÷FCãÇFCäÜ:–F–óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä6'&VvF÷"÷R'Fœ:|:6òFR6—7FVÖÇFW&FÂ÷FCãÇFCäö6÷'&WR;72'F–6–öæ"÷R6Æöæ#Â÷FCãÇFCäÇFóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäÖVÜ;7&––ç7L:fVÃÂ÷FCãÇFCäW'&÷2ÆVL;7&–÷2RFVÆ2§V—2çFW&–÷&W3Â÷FCãÇFCäÜ:–F–óÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà¢ÇåVæFò7W7V—Ff÷"F—66òÂò6Ö–æ†ò:’ÄÆ–æ²FóÒ"ö&ÆöröF—66òÖ6öÒ×6WF÷&W2ÖFVfV—GV÷6÷2×6Ö'BÖò×VRÖf¦W""6Æ74æÖSÒ'FW‡BÖ66VçB#ç6WF÷&W2FVfV—GV÷6÷2R4Ô%CÂôÆ–æ³ââVæFòf÷"ÖVÜ;7&–ÂÄÆ–æ²FóÒ"ö&Æör÷FW7F"ÖÖVÖ÷&–×&ÒÖÖV×FW7Cƒb"6Æ74æÖSÒ'FW‡BÖ66VçB#çFW7FRFRÖVÜ;7&–ÂôÆ–æ³âãÂ÷à ¢Æƒ#å6W\:¦æ6–6VwW&æòv–æF÷w2$SÂöƒ#à¢ÇäVÒÇ7G&öæsä÷:|;VW2fì:vF3Â÷7G&öæsâÂW66öÆ†fW'&ÖVçFVR6÷'&W7öæFR:—7FVæ6öçG&Fâì:6òW†V7WFRFöF2VÒ<:—&–R6VÒö'6W'f"ò&W7VÇFFòãÂ÷à¢ÆöÃà¢ÆÆ“ãÇ7G&öæså&W&òFR–æ–6–Æ—¦:|:6ó£Â÷7G&öæsâ:’FVçFF—fWFöÜ:F–6&&ö&ÆVÖ26ö×Vç2FR'F–Fâ6RfÆ†"Â&Vv—7G&RÖVç6vVÓ²&WWF—"–æFVf–æ–FÖVçFRì:6ò&öGW¢F–vì;77F–6òæ÷fòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFW6–ç7FÆ"GVÆ—¦:|;VW3£Â÷7G&öæsâf¢6VçF–FòVæFòòÆ:vò6öÖ\:v÷RÆövò;72VÖGVÆ—¦:|:6òâ6öÖV6RVÆGVÆ—¦:|:6òFRVÆ–FFRÖ—2&V6VçFRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6öæf–wW&:|;VW2FR–æ–6–Æ—¦:|:6òòÖöFòFR6VwW&ì:v£Â÷7G&öæsâW6RVæFò—7Ff÷"G&—fW"Â6ögGv&R÷R6W'fœ:vò&V6VçFRâ6R6öç6VwV—"VçG&"Â&VÖ÷fVæ2×VFì:v76ö6–Fò–ì:Ö6–òFò&ö&ÆVÖãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&W7FW&:|:6òFò6—7FVÖ£Â÷7G&öæsâ&WfW'FR'V—f÷2R6öæf–wW&:|;VW2Fò6—7FVÖ&VÒöçFòçFW&–÷"6VÒ6W"VÖ<;7–F÷2Fö7VÖVçF÷2W76ö—2âfW&–f—VRòöçFòR÷2&öw&Ö2fWFF÷2çFW2FR6öæf—&Ö"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså&VFVf–æ—"÷R&V–ç7FÆ#£Â÷7G&öæsâFV—†R&FWö—2FR&W6W'f"÷2FF÷2âÖW6Öò÷:|:6òFRÖçFW"'V—f÷2&VÖ÷fRÆ–6F—f÷2Rì:6ò7V'7F—GV’VÒ&6·WfW&–f–6FòãÂöÆ“à¢ÂööÃà¢Çå6RòÆ:vò6öÖ\:v÷RFWö—2FRVÖGVÆ—¦:|:6ò&WfW'F–FÂfV¦FÖ,:–ÒÄÆ–æ²FóÒ"ö&Æör÷v–æF÷w2×WFFR×G&fFòÖFW6f¦VæFòÖÇFW&6öW2"6Æ74æÖSÒ'FW‡BÖ66VçB#æGVÆ—¦:|:6òG&fFRFW6f¦VæFòÇFW&:|;VW3ÂôÆ–æ³âãÂ÷à ¢Æƒ#ä&—DÆö6¶W#¢6öæf—&6†fRçFW2FRfì:v#Âöƒ#à¢Çäòv–æF÷w2$RöFR6öÆ–6—F"6†fRFR&V7WW&:|:6ò&6W76"VÖVæ–FFR7&—Föw&fFâò–FVçF–f–6F÷"W†–&–FòæFVÆ§VF6öæfW&—"6R6†fRVæ6öçG&F6÷'&W7öæFRòWV—ÖVçFòâ6VÒ6†fR6÷'&WFÂì:6òf÷&ÖFRVæ–FFRRì:6òW6RW<:¦æ6–FR6W76ò6öÖò&÷fFR6÷''W:|:6ó¢òFFòöFRW7F":ÖçFVw&òÂVæ2&÷FVv–FòãÂ÷à¢ÇäVÒ6ö×WFF÷"6÷'÷&F—fò÷RW66öÆ"Â6†fRöFRW7F"6ö"6öçF÷RvW7L:6òF÷&væ—¦:|:6òâæW76R66òÂVçföÇfò&W7öç<:fVÂFRD’çFW2FRÇFW&"f—&×v&RÂEÒ÷R6öæf–wW&:|:6òFR–æ–6–Æ—¦:|:6òãÂ÷à ¢Æƒ#å÷"VRì:6ò6öÖ\:v"÷"&ö÷G&V2Â&6FVF—B÷R&6F&ö÷CÂöƒ#à¢ÇäW76W26öÖæF÷2G&FÒ6öæf–wW&:|:6òFR–æ–6–Æ—¦:|:6ó²VÆW2ì:6ò&W&Ò54BFVfV—GV÷6òÂÖVÜ;7&––ç7L:fVÂÂG&—fW"–æ6ö×L:×fVÂ÷RGVÆ—¦:|:6ò–çFW'&ö×–FâVÒÜ:V–æ2TTd’ÂÆWG&2FRVæ–FFRf—7F2æòv–æF÷w2$RöFVÒ6W"F–fW&VçFW2F2W6F2æòv–æF÷w2æ÷&ÖÂÂRW66öÆ†W"'Fœ:|:6òW'&F7&–VÖ6VwVæFfÆ†ãÂ÷à¢Çä6öç6–FW&R6öÖæFòÖçVÂ6öÖVçFRFWö—2FR6öæf—&Ö"ÂòÖW6ÖòFV×ó¢òF—66òW7L:6VL:fVÂRFWFV7FFó²Væ–FFRfö’FW6&Æ÷VVF²–ç7FÆ:|:6ò6÷'&WFFòv–æF÷w2fö’Æö6Æ—¦F²òÖöFòTTd’÷RÆVv7’fö’–FVçF–f–6Fó²RŒ:VÖ<;7–F÷2FF÷2–×÷'FçFW2â6RVÇVW"—FVÒW7F—fW"–æ6W'FòÂ&RæòF–vì;77F–6òãÂ÷à ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“äW†V7WF"6öÖæF÷2FR&V6öç7G'\:|:6òFR6'&VvF÷"6÷–F÷2FRl;7'VÒ6VÒVçFVæFW"òVRf¦VÒ(	BVÒF—66ò6öÒFF÷26VÒ<;7–Â—76òöFR–çf–&–Æ—¦"&V7WW&:|:6òãÂöÆ“à¢ÆÆ“ä7&–"Âv"÷Rf÷&ÖF"VÖ'Fœ:|:6òTd’6öÖòFVçFF—fFR&÷F–æãÂöÆ“à¢ÆÆ“äFW6F—f"6V7W&R&ö÷B÷RÆ–×"òEÒ6VÒ&Vv—7G&"6öæf–wW&:|:6òR6öæf—&Ö"6†fR&—DÆö6¶W"ãÂöÆ“à¢ÆÆ“äf÷&ÖF"÷R'&W6WF"W7FR2"çFW2FR6Çf"÷2'V—f÷2ãÂöÆ“à¢ÆÆ“å&V–ç7FÆ"ò6—7FVÖ÷"6–Ö6öÒòF—66ò&W6VçFæFò'\:ÖFò÷RÆVçF–L:6òW‡G&VÖãÂöÆ“à¢ÆÆ“ä–ç6—7F—"VÒFW¦Væ2FR&V–æ–6–Æ—¦:|;VW26VwV–F3¢6FFVçFF—fVÒF—66òVÒfÆ†&VGW¢6†æ6RFR&V7WW&"FF÷2ãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&R–ÖVF–FÖVçFR6RòF—66òf—¦W"'\:ÖFò–æ6ö×VÒÂ6R7VÖ—"R&V&V6W"VçG&R&V–æ–6–Æ—¦:|;VW2÷R6R†÷WfW"'V—f÷2–ç7V'7F—G\:×fV—26VÒ<;7–â&–÷&–FFR766W"ÄÆ–æ²FóÒ"÷6W'f–6÷2÷&V7WW&6òÖFRÖFF÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&V7WW&:|:6òFRFF÷3ÂôÆ–æ³âÂRì:6ò&W&òFò6—7FVÖãÂ÷à ¢ÄVF—F÷&–Å&VfW&Væ6W26ÇVsÒ'v–æF÷w2×&W&òÖWFöÖF–6òÖVÒÖÆö÷"óà ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòòÆ:vòW'6—7F—";72&VÖ÷fW"W&–l:—&–6÷2RFW6f¦W"ÇFW&:|;VW2&V6VçFW2ÂVæFòò6—7FVÖVF—"6†fRFR&V7WW&:|:6òFR7&—Föw&f–÷RVæFòòF—66ò¬:F—fW"FFò6–æ—2FRfÆ†â6öçFW‡Fò6ö×ÆWFòFò6–çFöÖVÒÄÆ–æ²FóÒ"÷&ö&ÆVÖ2÷v–æF÷w2ÖæòÖ–æ–6–"6Æ74æÖSÒ'FW‡BÖ66VçB#åv–æF÷w2ì:6ò–æ–6–ÂôÆ–æ³âRfÆ–:|:6òVÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&ÖçWFVæ6ò×&WfVçF—fÖFRÖ6ö×WFF÷"ÖwV–Ö6ö×ÆWFò#¢°¢F—FÆS¢$ÖçWFVì:|:6ò&WfVçF—fFR6ö×WFF÷#¢òwV–6ö×ÆWFò"À¢W†6W'C ¢$òVR&VÆÖVçFR&V6—66W"fW&–f–6FòÂ6öÒVRg&W\:¦æ6–RVÒVR÷&FVÒ(	BFò6Æ÷"RFöV—&òW7FFòFò&Ö¦VæÖVçFò(	B6VÒG&ö6"\:v÷"&V6\:|:6òâ"À¢FFS¢###bÓ’Ó2"À¢&VEF–ÖS¢#"Ö–â"À¢6FVv÷'“¢$ÖçWFVì:|:6ò"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#äÖçWFVì:|:6ò&WfVçF—fì:6ò:’'&—"Ü:V–æFRFV×÷2VÒFV×÷2R76""6ö×&–Ö–Fòâ8’VÖ&÷F–æ7W'FFRfW&–f–6:|;VW2VR&WfVÆFW6v7FRçFW2FRVÆRf—&"&F(	BRVRÂæÖ–÷"'FRF÷266÷2Â:’fV—F6VÒ'&—"æFãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢ÇåVÖ&÷F–æ&WfVçF—f;§F–ÂFVÒVG&òg&VçFW3¢FV×W&GW&RfÇW†òFR"ÂW7FFòFò&Ö¦VæÖVçFòÂW7:vòÆ—g&RRGVÆ—¦:|;VW2ÂR<;7–FR6VwW&ì:vFW7FFâfW&–f–6:|:6òÖVç6ÂÆWf÷V6÷2Ö–çWF÷2R:’fV—F÷"6ögGv&S²Æ–×W¦l:×6–6–çFW&æ:’çVÂæÖ–÷&–F÷2Ö&–VçFW2FöÜ:—7F–6÷2RÖ—2g&WVVçFRVÒÆö6Â6öÒöV—&Âö'&ÂVÆ÷2FRæ–Ö—2÷RgVÖ:vãÂ÷à ¢Æƒ#å÷"VR&WfVçF—f6ö×Vç6Âöƒ#à¢ÇåV6RFöFfÆ†6&6öÖ\:v6öÒVÒ6–æÂ&&FòâF—66òVR&W6VçF6WF÷&W2&VÆö6F÷2f—66VÖæ2çFW2FR&"âæ÷FV&öö²VR766VÆW&"fVçFö–æ†VÒF&Vf26–×ÆW2f—6VRF—76—:|:6ò–÷&÷Râ6—7FVÖ6VÒW7:vòÆ—g&Rf—6VR,;7†–ÖGVÆ—¦:|:6òf’fÆ†"âòVRG&ç6f÷&ÖW76W2f—6÷2VÒ&V§\:×¦ò:’W<:¦æ6–FRÆw\:–ÒöÆ†æFòãÂ÷à¢Çäò÷WG&òÆFòFÖ,:–Ò:’fW&FFV—&ó¢ÖçWFVì:|:6òVÒW†6W76ò7&–&ö&ÆVÖâ'&—"WV—ÖVçFò6VÒæV6W76–FFRÂG&ö6"7FL:—&Ö–6FöFò6VÖW7G&R÷R&V–ç7FÆ"ò6—7FVÖ'&Æ–×""<:6ò–çFW'fVì:|;VW2VR–çG&öGW¦VÒ&—66ò6VÒVÆ–Ö–æ"6W6ÆwVÖãÂ÷à ¢Æƒ#ä6ÆVæL:&–òFRfW&–f–6:|:6óÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒäg&W\:¦æ6–Â÷FƒãÇFƒäòVRfW&–f–6#Â÷FƒãÇFƒå÷"\:£Â÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCäÖVç6ÃÂ÷FCãÇFCäW7:vòÆ—g&RVÒF—66òÂGVÆ—¦:|;VW2VæFVçFW2Â&öw&Ö2VR–æ–6–Ò§VçFò6öÒò6—7FVÖÂ÷FCãÇFCäfÇFFRW7:vòRGVÆ—¦:|:6ò7V×VÆF<:6ò6W66ö×VÒFRG&fÖVçFòRFRW'&òVÒGVÆ—¦:|:6óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCåG&–ÖW7G&ÃÂ÷FCãÇFCåFV×W&GW&VÒW6òæ÷&ÖÂÂ'\:ÖFòF2fVçFö–æ†2ÂöV—&f—<:×fVÂæ2w&FW3Â÷FCãÇFCäW&FFRF—76—:|:6ò:’w&GVÂR&V6RçFW26öÖò'\:ÖFòRÆVçF–L:6ò6ö"6&vÂ÷FCãÂ÷G#à¢ÇG#ãÇFCå6VÖW7G&ÃÂ÷FCãÇFCäW7FFòFR6;¦FRFò&Ö¦VæÖVçFò…4Ô%B’Â–çFVw&–FFRF<;7–FR6VwW&ì:vÂ÷FCãÇFCäF—66òVÒFVw&F:|:6òR&6·WçVæ6FW7FFò<:6ò2GV2Ö–÷&W26W62FRW&FFRFF÷3Â÷FCãÂ÷G#à¢ÇG#ãÇFCäçVÃÂ÷FCãÇFCäÆ–×W¦l:×6–6–çFW&æÂ&Wf—<:6òFR6&÷2RFRÆ–ÖVçF:|:6òÂfÆ–:|:6òFR–FFRFòWV—ÖVçFóÂ÷FCãÇFCåöV—&7V×VÆFRföçFRæòÆ–Ö—FR&VGW¦VÒW7F&–Æ–FFRçFW2FR6W6"FW6Æ–vÖVçFóÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#ãâFV×W&GW&RfÇW†òFR#Âöƒ#à¢Çä&VfW,:¦æ6–ì:6ò:’VÒì;¦ÖW&òVæ—fW'6Â(	B6FÆFf÷&ÖFVÒ6WRÆ–Ö—FRâòVR–çFW&W76:’ò6ö×÷'FÖVçFó¢6RÜ:V–æVR&öFfÆæ–Æ†VÒ6–Ì:¦æ6–ò76÷R6VÆW&"2fVçFö–æ†2æÖW6ÖF&VfÂÆvò×VF÷RâVÒæ÷FV&öö²Â6:ÖFFR"VVçFRVÆÆFW&Â6÷7GVÖ6W"ò&–ÖV—&ò–æF–6F÷"Â§VçFò6öÒ&6RÖ—2VVçFRFòVRò†&—GVÂãÂ÷à¢ÇäçFW2FRVç6"VÒ7FL:—&Ö–6ÂfW&–f—VRò;6'f–ó¢w&FW2ö'7G'\:ÖF2ÂW6ò6ö'&R6Ö÷R6öl:Â&6R6VÒW7:vòFRVçG&FFR"R<;¦×VÆòf—<:×fVÂFRöV—&â<;2FWö—2F—76òF—67W7<:6ò76&ò6öæ§VçFòFRF—76—:|:6òâÆ–×W¦–çFW&æW7L:FW67&—FVÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖÆ–×"Öæ÷FV&öö²×÷"ÖFVçG&ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòÆ–×"òæ÷FV&öö²÷"FVçG&óÂôÆ–æ³âÂRG&ö6FR6ö×÷7FòL:—&Ö–6òVÒÄÆ–æ²FóÒ"ö&Æörö6öÖò×G&ö6"×7F×FW&Ö–6Öæ÷FV&öö²"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòG&ö6"7FL:—&Ö–6ÂôÆ–æ³âãÂ÷à ¢Æƒ#ã"âW7FFòFò&Ö¦VæÖVçFóÂöƒ#à¢ÇäW7F:’fW&–f–6:|:6òÖ—2–×÷'FçFRFÆ—7FÂ÷'VR:’;¦æ–6VÒVRfÆ†FW7G,;6’FF÷2VÒfW¢FR6W6"–æ6öçfVæœ:¦æ6–âF—66÷2ÖöFW&æ÷2ÖçL:¦ÒVÒ&Vv—7G&ò–çFW&æòFR6;¦FR6öÒ6öçFF÷&W2FR6WF÷&W2&VÆö6F÷2ÂFVçFF—f2FRÆV—GW&&WWF–F2R†÷&2FRW6òâ6öçFF÷&W27V&–æFòòÆöævòF÷2ÖW6W2–æF–6ÒFW6v7FRÂÖW6Öò6öÒò6—7FVÖgVæ6–öææFòæ÷&ÖÆÖVçFRãÂ÷à¢ÇäVÒF—66òÖV<:&æ–6òÂò6–æÂÖ—2w&fRì:6ò:’F–v—FÃ¢:’6öæ÷&òâ'\:ÖFò<:Ö6Æ–6òÂ6Æ—VR&WWF–Fò÷Rv—&òVR&R&V6öÖ\:vVFVÒFW6Æ–vÖVçFò–ÖVF–FòâòFWFÆ†ÖVçFòW7L:VÒÄÆ–æ²FóÒ"ö&ÆöröF—66òÖ6öÒ×6WF÷&W2ÖFVfV—GV÷6÷2×6Ö'BÖò×VRÖf¦W""6Æ74æÖSÒ'FW‡BÖ66VçB#ç6WF÷&W2FVfV—GV÷6÷2RÆV—GW&Fò4Ô%CÂôÆ–æ³âãÂ÷à ¢Æƒ#ã2âW7:vòÆ—g&RÂGVÆ—¦:|;VW2R–æ–6–Æ—¦:|:6óÂöƒ#à¢ÇäF—66òFR6—7FVÖ×V—Fò6†V–òFVw&FòFW6V×Væ†òR–×VFRGVÆ—¦:|:6òâ6öÖò&Vw&,:F–6FRG&&Æ†òÂÖçFW"föÆv6öæf÷'L:fVÂæ'Fœ:|:6òFò6—7FVÖWf—FÖ–÷"'FRF÷2W'&÷2FRGVÆ—¦:|:6òRFR'V—fòFV×÷,:&–òâÆ–×W¦6VwW&FRFV×÷,:&–÷2W7L:VÒÄÆ–æ²FóÒ"ö&ÆöröÆ–×"Ö'V—f÷2×FV×÷&&–÷2×v–æF÷w2"6Æ74æÖSÒ'FW‡BÖ66VçB#æÆ–×"'V—f÷2FV×÷,:&–÷2æòv–æF÷w3ÂôÆ–æ³âãÂ÷à¢Çå&Wf—6RFÖ,:–ÒòVR–æ–6–§VçFò6öÒò6—7FVÖâ&öw&Ö2FRf'&–6çFRÂGVÆ—¦F÷&W2RWF–Æ—L:&–÷2&VGVæFçFW26ö×WFVÒ÷"F—66òRÖVÜ;7&–W†FÖVçFRæòÖöÖVçFòVÒVRÜ:V–æ&V6—6&W7öæFW"â6RÆVçF–L:6òW'6—7FRFWö—2F—76òÂò6Ö–æ†òFR–çfW7F–v:|:6ò:’ÄÆ–æ²FóÒ"÷&ö&ÆVÖ2ö6ö×WFF÷"ÖÆVçFò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6ö×WFF÷"ÆVçFóÂôÆ–æ³âãÂ÷à ¢Æƒ#ãBâ<;7–FR6VwW&ì:v(	BR&÷fFRVRVÆgVæ6–öæÂöƒ#à¢Çå&WfVì:|:6ò6VÒ&6·W:’÷7FâR&6·W6VÒFW7FRFR&W7FW&:|:6ò:’7W÷6œ:|:6ó¢ò'V—fòöFRW7F"6÷'&ö×–FòÂÜ:ÖF–öFRFW"fÆ†FòVÒ6–Ì:¦æ6–òÂ&÷F–æöFRFW"&FòÖW6W2G,:2âò&ö6VF–ÖVçFòFR6öæfW,:¦æ6–W7L:VÒÄÆ–æ²FóÒ"ö&Æörö6öÖò×FW7F"×&W7FW&6òÖFRÖ&6·W"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòFW7F"&W7FW&:|:6òFò&6·WÂôÆ–æ³âãÂ÷à¢Çå6RL;§f–Ff÷"öæFRwV&F"<;7–Âò7&—L:—&–òW7L:VÒÄÆ–æ²FóÒ"öFV6—6öW2öçWfVÒÖ÷RÖ†BÖW‡FW&æò"6Æ74æÖSÒ'FW‡BÖ66VçB#æçWfVÒ÷R„BW‡FW&æóÂôÆ–æ³âãÂ÷à ¢Æƒ#äÖ&–VçFW2VRW†–vVÒ6–6ÆòÖ—27W'FóÂöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsåöV—&Rö'&£Â÷7G&öæsâf–ÇG&÷2Rw&FW26GW&ÒVÒ6VÖæ2Âì:6òVÒÖW6W2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäæ–Ö—2VÒ66£Â÷7G&öæsâVÆ÷2f÷&ÖÒÖçF6ö'&RòF—76—F÷"R&Æ÷VV–ÒòfÇW†òFR"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6÷¦–æ†RgVÖ:v£Â÷7G&öæsâv÷&GW&VÒ7W7Vç<:6òFW&R:öV—&Rf÷&Ö7&÷7FF–l:Ö6–ÂFR&VÖ÷fW"6V6òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåW6ò6öçL:ÖçVó£Â÷7G&öæsâÜ:V–æÆ–vF#B†÷&2VçfVÆ†V6R&Ö¦VæÖVçFòRföçFRÖ—2,:–FòFòVRW6ò6öÖW&6–ÂFRö—Fò†÷&2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäW67&—L;7&–ò6VÒ&W7öç<:fVÂFRD“£Â÷7G&öæsâ&÷F–æ&V6—6W7F"æò6ÆVæL:&–òFRÆw\:–ÒâòÖöFVÆòÆ–6FòV×&W62W7L:VÒÄÆ–æ²FóÒ"÷6W'f–6÷2öÖçWFVæ6ò×&WfVçF—fÖV×&W62"6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6ò&WfVçF—f&V×&W63ÂôÆ–æ³âãÂöÆ“à¢Â÷VÃà ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“åW6"6ö×&W76÷"FR"FRöf–6–æ¢&W7<:6òRVÖ–FFRFæ–f–6ÒfVçFö–æ†2R6ö×öæVçFW2ãÂöÆ“à¢ÆÆ“äv—&"fVçFö–æ†6öÒ¦FòFR"6VÒG&l:ÖÆ(	Bòv—&òf÷,:vFòöFRvW&"6÷'&VçFR&WfW'6æòÖ÷F÷"ãÂöÆ“à¢ÆÆ“åG&ö6"7FL:—&Ö–6÷"&÷F–æÂ6VÒ6–çFöÖR6VÒÖVFœ:|:6òãÂöÆ“à¢ÆÆ“ä–ç7FÆ"&÷F–Ö—¦F÷&W2"RÆ–×F÷&W2FR&Vv—7G&òVR&öÖWFVÒ6VÆW&"ò6—7FVÖãÂöÆ“à¢ÆÆ“å&V–ç7FÆ"ò6—7FVÖ6öÖòÖçWFVì:|:6ò&WfVçF—fãÂöÆ“à¢ÆÆ“äF–"7V'7F—GVœ:|:6òFRVÒF—66òVR¬:&W6VçF6öçFF÷&W2FRW'&ò7V&–æFòãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&R–çFW'fVì:|:6òR&–÷&—¦R÷2FF÷2VæFòòF—66òf—¦W"'\:ÖFò–æ6ö×VÒÂVæFòòWV—ÖVçFòFW6Æ–v"6÷¦–æ†ò6ö"6&vÂVæFò†÷WfW"6†V—&òFRVV–ÖFò÷RVæFòÜ:V–æì:6òföÇF"Æ–v"FWö—2FRVÖÆ–×W¦âæW76W266÷2Â–ç6—7F—"7W7FÖ—26&òFòVR&#¢òVæ6Ö–æ†ÖVçFò:’ÄÆ–æ²FóÒ"÷6W'f–6÷2÷&V7WW&6òÖFRÖFF÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&V7WW&:|:6òFRFF÷3ÂôÆ–æ³â÷RfÆ–:|:6ò&W6Væ6–Ââ÷&FVÒ6÷'&WFVçG&R&6·WRÖçWFVì:|:6òW7L:VÒÄÆ–æ²FóÒ"öFV6—6öW2ö&6·WÖçFW2ÖFÖÖçWFVæ6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ&6·WçFW2FÖçWFVì:|:6óÂôÆ–æ³âãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòFV×W&GW&6öçF–çV"ÇFFWö—2FÆ–×W¦W‡FW&æÂVæFòòWV—ÖVçFòW7F—fW"VÒv&çF–†'&—"öFRVæ6W',:ÖÆ’ÂVæFò†÷WfW"FW6Æ–vÖVçFò6ö"6&vÂVæFòò&Ö¦VæÖVçFò–æF–6"FW6v7FR÷RVæFòò'VRFRÜ:V–æ2f÷"FRW6ò&öf—76–öæÂR&FF—fW"7W7FòâfÆ–:|:6ò–æ–6–ÂW7L:VÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âRW†V7\:|:6òVÒÄÆ–æ²FóÒ"÷6W'f–6÷2öÖçWFVæ6òÖFRÖ6ö×WFF÷""6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6òFR6ö×WFF÷#ÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&F—7÷6—F—fò×W6"Öæò×&V6öæ†V6–FòÖò×VRÖf¦W"#¢°¢F—FÆS¢$F—7÷6—F—fòU4"ì:6ò&V6öæ†V6–Fó¢6öÖòFW66ö'&—"6W6"À¢W†6W'C ¢$6öÖò6W&"FVfV—FòFò&VÆ†òÂF÷'FÂFò6&òÂFÆ–ÖVçF:|:6òRFòG&—fW"(	BVÒVÖ6W\:¦æ6–FRFW7FW2VRì:6òW†–vR'&—"ò6ö×WFF÷"â"À¢FFS¢###bÓ’Ó2"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢$F–vì;77F–6ò"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#â$F—7÷6—F—fòU4"ì:6ò&V6öæ†V6–Fò":’VÖÖVç6vVÒvVì:—&–6¢VÆF—¢VR6ö×Væ–6:|:6òfÆ†÷RÂì:6òöæFRâ6W6öFRW7F"æò&VÆ†òÂæò6&òÂæ÷'FÂæÆ–ÖVçF:|:6ò÷RæòG&—fW"(	BR6FVÖFW762†—;7FW6W2FVÒVÒFW7FR,;7&–òÂ,:–FòRì:6òFW7G'WF—fòãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢ÇåFW7FRVÒ÷&FVÓ¢÷WG&÷'F†FR&VfW,:¦æ6–G&6V—&ÂæòFW6·F÷’Â÷WG&ò6&òÂòÖW6ÖòF—7÷6—F—fòVÒ÷WG&ò6ö×WFF÷"R÷WG&òF—7÷6—F—fòæÖW6Ö÷'FâW76W2VG&òFW7FW2—6öÆÒÂæÖ–÷&–F÷266÷2Â6Rò&ö&ÆVÖ:’Fò&VÆ†òÂFòÖV–òFR6öæWŒ:6ò÷RFÜ:V–æ(	BçFW2FRVÇVW"ÇFW&:|:6òFRG&—fW"ãÂ÷à ¢Æƒ#äòVRÖVç6vVÒ&VÆÖVçFR6–væ–f–6Âöƒ#à¢ÇåVæFòVÒF—7÷6—F—fò:’6öæV7FFòÂVÆR6R&W6VçFò6—7FVÖ–æf÷&ÖæFòF—òÂf'&–6çFRRæV6W76–FFRFRVæW&v–â6RW76&W6VçF:|:6òfÆ†"÷Rf–W"–æ6ö×ÆWFÂò6—7FVÖ&Vv—7G&òF—7÷6—F—fò6öÖòFW66öæ†V6–FòâfÆ†FR&W6VçF:|:6ò6öçFV6R÷"FVfV—Fòæò6öçG&öÆF÷"Fò,;7&–ò&VÆ†òÂ÷"VVFFRFVç<:6òÂ÷"6&ò6öÒ6öæGWF÷"&ö×–Fò÷R÷"6öæV7F÷"6öÒ6öçFFò'V–ÒãÂ÷à¢Çì8’÷"—76òVRG&ö6"G&—fW"6÷7GVÖì:6ò&W6öÇfW#¢VæFò&W6VçF:|:6òæVÒ6öçFV6RÂì:6òW†—7FRG&—fW"Æ–6"ãÂ÷à ¢Æƒ#å6W\:¦æ6–FRFW7FW3Âöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒåFW7FSÂ÷FƒãÇFƒå6RgVæ6–öæ#Â÷FƒãÇFƒå6RfÆ†#Â÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCä÷WG&÷'FFòÖW6Öò6ö×WFF÷#Â÷FCãÇFCå÷'F÷&–v–æÂ6öÒFVfV—Fò÷RFW6F—fFÂ÷FCãÇFCå6VwVR–çfW7F–v:|:6óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä÷WG&ò6&ò†ÖW6ÖòF—7÷6—F—fò“Â÷FCãÇFCä6&ò&ö×–Fò÷RVæ2FR6&vÂ6VÒFF÷3Â÷FCãÇFCå6VwVR–çfW7F–v:|:6óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäÖW6ÖòF—7÷6—F—fòVÒ÷WG&ò6ö×WFF÷#Â÷FCãÇFCå&ö&ÆVÖ:’Fò6ö×WFF÷"†G&—fW"ÂVæW&v–÷R÷'F“Â÷FCãÇFCå&ö&ÆVÖ:’FòF—7÷6—F—fóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä÷WG&òF—7÷6—F—fòæ÷'F÷&–v–æÃÂ÷FCãÇFCå÷'FgVæ6–öæ²7W7V—F&V6’æò&VÆ†óÂ÷FCãÇFCå÷'F÷R6öçG&öÆF÷"6öÒfÆ†Â÷FCãÂ÷G#à¢ÇG#ãÇFCä6öæWŒ:6òF—&WFÂ6VÒ‡V#Â÷FCãÇFCä‡V"6VÒÆ–ÖVçF:|:6ò,;7&–ì:6ò7W7FVçFò6öç7VÖóÂ÷FCãÇFCå6VwVR–çfW7F–v:|:6óÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#ä6&ó¢6W6Ö—27V&W7F–ÖFÂöƒ#à¢Çä&ö'FRF÷26&÷2VR6ö×æ†Ò&VÆ†÷2WVVæ÷2:’FR6&vVæ3¢G&ç6Ö—FRVæW&v–Rì:6òFF÷2â÷WG&'FRFVÒ÷26öæGWF÷&W2FRFF÷2&ö×–F÷2÷"Fö'&,;7†–Öò6öæV7F÷"Â6VÒ6–æÂW‡FW&æòf—<:×fVÂâ6RòF—7÷6—F—fò6'&VvÖ2ì:6ò&V6RÂò6&ò:’ò&–ÖV—&ò7W7V—Fò(	Bì:6òò6—7FVÖãÂ÷à ¢Æƒ#äÆ–ÖVçF:|:6ó¢VæFòfÇFVæW&v–Âì:6òfÇFG&—fW#Âöƒ#à¢ÇäF—66òW‡FW&æòÂw&fF÷&Â‡V"6öÒl:&–÷2&VÆ†÷2RÆwVç2WV—ÖVçF÷2FR:VF–ò6öç6öÖVÒÖ—2FòVRVÖ;¦æ–6÷'FVçG&Vv6öÒföÆvâò6–çFöÖL:×–6ò:’&V6W"RFW6&V6W"ÂgVæ6–öæ"÷"ÆwVç26VwVæF÷2÷RVÖ—F—"'\:ÖFòFR&V6öæWŒ:6ò&WWF–FòâFW7FW2l:Æ–F÷3¢6öæV7F"VÒ÷'FG&6V—&FòFW6·F÷ÂW6"6&òVÒ’VæFòòf'&–6çFR&Wl:¢Â÷RW6"‡V"6öÒföçFR,;7&–ãÂ÷à¢Çå6Rò6ö×÷'FÖVçFò6R&WWFRVÒVÇVW"÷'FR6öÒl:&–÷2F—7÷6—F—f÷2Â7W7V—F76&Æ–ÖVçF:|:6òF,;7&–Ü:V–æ(	B77VçFòFRÄÆ–æ²FóÒ"ö&Æörö6öÖò×FW7F"ÖföçFRÖFRÖÆ–ÖVçF6ò×2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòFW7F"föçFRFRÆ–ÖVçF:|:6óÂôÆ–æ³âãÂ÷à ¢Æƒ#å÷'FR6öçG&öÆF÷#Âöƒ#à¢Çå÷'F2g&öçF—2FRv&–æWFR<:6ò2VRÖ—2fÆ†Ó¢FWVæFVÒFRVÒ6&ò–çFW&æòL:’Æ6Â6ög&VÒW6f÷,:vòÖV<:&æ–6òR:2fW¦W2W7L:6òVæ26öÇF2âVÒæ÷FV&öö²Â÷'F6ög&R6öÒòW6òFòVæG&—fRR6öÒWŒ;VW2æò6&òÂòVR6öÇF6öÆF6öÒòFV×òâ6–æÂ6&7FW,:×7F–6ó¢òF—7÷6—F—fò<;2gVæ6–öæ6Rfö<:¢6VwW&"ò6öæV7F÷"VÒFWFW&Ö–æF÷6œ:|:6òãÂ÷à¢ÇåVæFòæVæ‡VÖ÷'F&W7öæFRRò&ö&ÆVÖ&V6RFÖ,:–Òæ26öæf–wW&:|;VW2Fò6—7FVÖÂ7W7V—F6ö&R&ò6öçG&öÆF÷"FÆ6âW76R6Vì:&–ò6R&÷†–ÖFRÄÆ–æ²FóÒ"ö&Æörö6öÖòÖF–væ÷7F–6"×Æ6ÖÖRÖFVfV—GV÷6"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òFRÆ6ÖÜ:6SÂôÆ–æ³âãÂ÷à ¢Æƒ#åfW&–f–6:|;VW2æòv–æF÷w2Â6VÒ&—66óÂöƒ#à¢ÇVÃà¢ÆÆ“ä6öæfW&—"6RòF—7÷6—F—fò&V6RæÆ—7FFR†&Gv&R6öÒf—6òFRW'&ò(	B6R&V6RÂ†÷WfR&W6VçF:|:6òR†—;7FW6RFRG&—fW"föÇF6W"l:Æ–FãÂöÆ“à¢ÆÆ“äFW6Æ–v"7W7Vç<:6òWFöÜ:F–6F2÷'F2æòÆæòFRVæW&v–ÂW7V6–ÆÖVçFRVÒæ÷FV&öö²ãÂöÆ“à¢ÆÆ“äFW6Æ–v"ò6ö×WFF÷"FFöÖF÷"ÆwVç2Ö–çWF÷3¢—76òFW66'&Vv÷26öçG&öÆF÷&W2R&W6öÇfR66÷2FR÷'F'G&fF"ãÂöÆ“à¢ÆÆ“åFW7F"6öÒòWV—ÖVçFòVÒ÷WG&FöÖFÂ6VÒf–ÇG&òFRÆ–æ†6ö×'F–Æ†FòÂVæFò†÷WfW"'\:ÖFòVÌ:—G&–6òãÂöÆ“à¢ÆÆ“ä66÷2W7V<:Öf–6÷2FR<:&ÖW&FWVæFVÒFRW&Ö—7<:6òÂRì:6òFR†&Gv&R(	BfV¦ÄÆ–æ²FóÒ"ö&Æör÷W&Ö—76öW2ÖFRÖ6ÖW&Öæò×v–æF÷w2"6Æ74æÖSÒ'FW‡BÖ66VçB#çW&Ö—7<;VW2FR<:&ÖW&æòv–æF÷w3ÂôÆ–æ³âãÂöÆ“à¢Â÷VÃà¢Çå6Rò&VÆ†òVçföÇf–Fòf÷"VÖvV&6ÒÂò&÷FV—&òFVF–6FòW7L:VÒÄÆ–æ²FóÒ"ö&Æör÷vV&6Ò×W6"ÖæòÖRÖFWFV7FF"6Æ74æÖSÒ'FW‡BÖ66VçB#çvV&6ÒU4"ì:6ò:’FWFV7FFÂôÆ–æ³âãÂ÷à ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“äFW6–ç7FÆ"VÒ<:—&–RFöF÷2÷26öçG&öÆF÷&W2U4"FÆ—7FFR†&Gv&R6VÒ6&W"&W7FW,:ÖÆ÷2(	BòFV6ÆFòRòÖ÷W6RöFVÒ&"FR&W7öæFW"ãÂöÆ“à¢ÆÆ“ä–ç7FÆ"&GVÆ—¦F÷&W2FRG&—fW""FRFW&6V—&÷2ãÂöÆ“à¢ÆÆ“äf÷,:v"ò6öæV7F÷"VÒ:&æwVÆò&&f¦W"6öçFFò"ãÂöÆ“à¢ÆÆ“äf÷&ÖF"VÒVæG&—fRVR6öçL:–Ò'V—f÷2–×÷'FçFW2<;2÷'VRò6—7FVÖ7VvW&—Rf÷&ÖF:|:6òãÂöÆ“à¢ÆÆ“ä6öæ6ÇV—"FVfV—FòFò&VÆ†ò6VÒFW"FW7FFò÷WG&ò6&òãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&R6RòF—7÷6—F—fòf÷"VÒF—66òW‡FW&æò6öÒ'V—f÷26VÒ<;7–RVÆR76"6W"&V6öæ†V6–FòFRf÷&Ö–çFW&Ö—FVçFRÂVÖ—F—"'\:ÖFò÷RVF—"f÷&ÖF:|:6òâ6Fæ÷fFVçFF—fFRÖöçFvVÒ&VGW¢6†æ6RFR&W6vFR(	Bò6Ö–æ†ò:’ÄÆ–æ²FóÒ"÷6W'f–6÷2÷&V7WW&6òÖFRÖFF÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&V7WW&:|:6òFRFF÷3ÂôÆ–æ³âÂì:6ò–ç6—7L:¦æ6–ãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòæVæ‡VÖ÷'F&W7öæFW"ÂVæFòò6öæV7F÷"W7F—fW"ÖV6æ–6ÖVçFR6öÇFòÂVæFò†÷WfW"†—7L;7&–6òFRVVF÷RÌ:×V–FòÂ÷RVæFòòF—7÷6—F—fòf÷"W76Væ6–Â&òG&&Æ†òR÷2FW7FW26–Öì:6ò—6öÆ&VÒ6W6âfÆ–:|:6ò–æ–6–ÂW7L:VÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³ã²ò&W&òFR÷'FR&Wf—<:6òFòWV—ÖVçFòÂVÒÄÆ–æ²FóÒ"÷6W'f–6÷2öÖçWFVæ6òÖFRÖ6ö×WFF÷""6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6òFR6ö×WFF÷#ÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&6öÖò×FW7F"×&W7FW&6òÖFRÖ&6·W#¢°¢F—FÆS¢$6öÖòFW7F"6Rò&6·W&VÆÖVçFRgVæ6–öæ"À¢W†6W'C ¢$<;7–çVæ6&W7FW&F:’7W÷6œ:|:6òâò&÷FV—&òFRFW7FRFR&W7FW&:|:6òÂòVR&Vv—7G&"R÷2W'&÷2VR<;2&V6VÒæòF–VÒVRò'V—fòf¢fÇFâ"À¢FFS¢###bÓ’Ó2"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#äW&wVçFVRFV6–FR6Rfö<:¢FVÒ&6·Wì:6ò:’&W7L:f¦VæFò<;7–ò"ÂR6–Ò&òVR¬:fö’&W7FW&FòÂFRVÂfW'<:6òRVÒVçFòFV×óò"âòFW7FRG&ç6f÷&ÖVÖ&÷F–æ6–ÆVæ6–÷6VÒWf–L:¦æ6–¢Ö÷7G&6ö&W'GW&Â–çFVw&–FFRR6R&V7WW&:|:6ò6&RææV6W76–FFR&VÂãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢ÇäW66öÆ†VÖÖ÷7G&&W&W6VçFF—fÂ&W7FW&RÖVÒVÒÆö6Â6W&FòÂ'&÷2'V—f÷2R6öæf—&fW'<:6òÂ6öçF\;¦FòÂW&Ö—7<;VW2RFV×òv7Fòâ&Vv—7G&Rò&W7VÇFFòR&W—F;72×VFì:v2&VÆWfçFW2âg&W\:¦æ6–FWfR6ö×æ†"ò–×7FòFW&FRfVÆö6–FFR6öÒVR÷2FF÷2×VFÓ²ì:6òW†—7FR6ÆVæL:&–òVæ—fW'6ÂãÂ÷à ¢Æƒ#äFVf–æòVRòFW7FR&V6—6&÷f#Âöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsäW66÷ó£Â÷7G&öæsâV—27F2Â6—7FVÖ2Â6öçF2RF—7÷6—F—f÷2FWfW&–ÒW7F"&÷FVv–F÷2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåöçFòFR&V7WW&:|:6ó£Â÷7G&öæsâL:’VÂFFR†÷&fö<:¢&V6—6föÇF"6VÒW&FW"G&&Æ†òFVÖ—2ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåFV×òFR&V7WW&:|:6ó£Â÷7G&öæsâVçFòFV×òF—f–FFRöFRf–6"&FVçVçFò÷2FF÷2&WF÷&æÒãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä7&—L:—&–òFR&÷f:|:6ó£Â÷7G&öæsâfW'<:6òW7W&F&V6RÂ'&R6÷'&WFÖVçFRÂ&W6W'fòæV6W7<:&–òR6†VvFVçG&òFòFV×ò&Vv—7G&FòãÂöÆ“à¢Â÷VÃà¢ÇäVÒV×&W62ÂW76W2Fö—2;¦ÇF–Ö÷2Æ–Ö—FW26÷7GVÖÒ6W"6†ÖF÷2FR%òR%DòâòæöÖR:’ÖVæ÷2–×÷'FçFRVRFV6—<:6ò6öæ7&WF¢VçFòG&&Æ†òöFR6W"&VfV—FòRVçFòFV×òFR&F÷W&:|:6òFöÆW&ãÂ÷à ¢Æƒ#å÷"VR<;7–2fÆ†ÒVÒ6–Ì:¦æ6–óÂöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsä&÷F–æ&÷RãÂ÷7G&öæsâ6W'fœ:vòFW6F—fFòÂ6Væ†ÇFW&FÂ76–æGW&fVæ6–F÷RF—66òFW66öæV7FFò(	BRæ–æw\:–Òfö’f—6FòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä7F6W'FçVæ6VçG&÷RãÂ÷7G&öæsâ8’6ö×VÒ&÷F–æ6ö'&—"$Fö7VÖVçF÷2"R–væ÷&":&VFRG&&Æ†òÂ7FFò6—7FVÖFRvW7L:6ò÷R÷2'V—f÷2FRRÖÖ–ÂãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÜ:ÖF–fÆ†÷RãÂ÷7G&öæsâ„BW‡FW&æòwV&FFò÷"æ÷2FVÒfÆ†,;7&–²VæG&—fRì:6ò:’Ü:ÖF–FR&6·WãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä<;7–fö’6öçFÖ–æFãÂ÷7G&öæsâVÒ6–æ7&öæ—¦:|:6òWFöÜ:F–6Â'V—fò7&—Föw&fFò÷"&ç6ö×v&R÷RvFò÷"Vævæò6R&÷v&çWfVÒãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäò'V—fòW7L:Ì:ÂÖ26÷'&ö×–FòãÂ÷7G&öæsâ<;2&W'GW&&VÂ&WfVÆ—76òãÂöÆ“à¢Â÷VÃà¢Çì8’÷"W76R;¦ÇF–ÖòöçFòVR6–æ7&öæ—¦:|:6òVÒçWfVÒì:6ò7V'7F—GV’&6·W¢6–æ7&öæ—¦":’W7VÆ†"òW7FFòGVÂÂ–æ6ÇW6—fRòW7FFò'V–Òâ&6·W:’FW"fW'<;VW2çFW&–÷&W2&V7WW,:fV—2ãÂ÷à ¢Æƒ#å&÷FV—&òFRFW7FRFR&W7FW&:|:6óÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒå76óÂ÷FƒãÇFƒäòVRf¦W#Â÷FƒãÇFƒäòVR6öæf—&ÖÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCãÂ÷FCãÇFCäW66öÆ†W"'V—f÷2FR7F2ÂFF2ÂFÖæ†÷2Rf÷&ÖF÷2F–fW&VçFW3Â÷FCãÇFCåVRÖ÷7G&&W&W6VçFòW66÷óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCã#Â÷FCãÇFCå&W7FW&"VÒVÖ7Fæ÷fÂçVæ6÷"6–ÖFò÷&–v–æÃÂ÷FCãÇFCåVR&W7FW&:|:6òì:6òFW7G,;6’òFFò&öÓÂ÷FCãÂ÷G#à¢ÇG#ãÇFCã3Â÷FCãÇFCä'&—"ò'V—fòæò&öw&Ö6÷'&W7öæFVçFSÂ÷FCãÇFCä–çFVw&–FFR&VÂÂì:6òVæ2&W6Vì:vÂ÷FCãÂ÷G#à¢ÇG#ãÇFCãCÂ÷FCãÇFCä6öæfW&—"FFFfW'<:6ò&W7FW&FÂ÷FCãÇFCåVR&÷F–æW7L:&öFæFòv÷&Âì:6ò&÷RÖW6W2G,:3Â÷FCãÂ÷G#à¢ÇG#ãÇFCãSÂ÷FCãÇFCå&W7FW&"VÖfW'<:6òçFW&–÷"FVçG&òF&WFVì:|:6òW7W&FÂ÷FCãÇFCåVRW†—7FR†—7L;7&–6ò&V7WW,:fVÂÂì:6ò<;2òW7FFòGVÃÂ÷FCãÂ÷G#à¢ÇG#ãÇFCãcÂ÷FCãÇFCå&Vv—7G&"GW&:|:6òÂ&W7VÇFFòRVÇVW"W†6\:|:6óÂ÷FCãÇFCåVRWf–L:¦æ6–öFR6W"6ö×&Fæò,;7†–ÖòFW7FSÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#åFW7FRæ&ögVæF–FFR6ö×L:×fVÂ6öÒò&—66óÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒäì:×fVÃÂ÷FƒãÇFƒäòVR&W7FW&Â÷FƒãÇFƒäòVR–æFì:6ò&÷fÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCäÖ÷7G&FR'V—f÷3Â÷FCãÇFCä'V—f÷2f&–F÷2VÒ7F6W&FÂ÷FCãÇFCåVRFöF227F2RW&Ö—7<;VW2W7L:6ò6ö&W'F3Â÷FCãÂ÷G#à¢ÇG#ãÇFCå7F÷R6öæ§VçFòFRG&&Æ†óÂ÷FCãÇFCåVÒ&ö¦WFòÂW7\:&–ò÷RW,:ÖöFò6ö×ÆWFóÂ÷FCãÇFCåVRò6—7FVÖ–çFV—&òöFRföÇF"÷W&#Â÷FCãÂ÷G#à¢ÇG#ãÇFCå&V7WW&:|:6ò×ÆÂ÷FCãÇFCäFF÷2R6öæf–wW&:|;VW2VÒÖ&–VçFR—6öÆFóÂ÷FCãÇFCäFWVæFRFÖ,:–ÒFRÆ–6Vì:v2Â7&VFVæ6–—2R–æg&W7G'WGW&Â÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà¢Çä'&—"VÒ'V—fò:’VÒ&öÒFW7FR–æ–6–ÂÂì:6òVÖ6W'F–f–6:|:6òFò6öæ§VçFòâVçFòÖ–÷"ò–×7FòF&FÂÖ—2&W&W6VçFF—f&V6—66W"&W7FW&:|:6òãÂ÷à ¢Æƒ#äòVR&Vv—7G&#Âöƒ#à¢Çå&Vv—7G&RFFÂ&W7öç<:fVÂÂ÷&–vVÒF<;7–ÂfW'<:6òW66öÆ†–FÂFW7F–æòF&W7FW&:|:6òÂ'V—f÷2Ö÷7G&F÷2ÂGW&:|:6òÂ&W7VÇFFòRW†6\:|;VW2âòFV×ò–×÷'F¢&W7FW&"VÖ7FWVVæ:’F–fW&VçFRFR&W7FW&"GVFòâ6RòFW7FRfÆ†"Â&Vv—7G&R6W6Â6÷'&–¦&÷F–æRf:væ÷f&W7FW&:|:6ó²òÆW'F6÷¦–æ†òì:6òVæ6W'&ò&ö6W76òãÂ÷à¢ÇäVÒV×&W6ÂW76R&Vv—7G&ò:’òVR7W7FVçF6öçfW'66ö'&R6öçF–çV–FFS¢VçFòFV×ò÷W&:|:6ò7W÷'Ff–6"&FRVçFòG&&Æ†òöFR6W"W&F–FòVçG&RVÖ<;7–R÷WG&âòFW6Fö'&ÖVçFòV×&W6&–ÂW7L:VÒÄÆ–æ²FóÒ"ö&Æörö&6·WÖçWfVÒÖV×&W62×VÂÖW66öÆ†W""6Æ74æÖSÒ'FW‡BÖ66VçB#æ&6·WVÒçWfVÒ&V×&W63ÂôÆ–æ³âRVÒÄÆ–æ²FóÒ"÷6W'f–6÷2ö&6·W×&ÖV×&W62"6Æ74æÖSÒ'FW‡BÖ66VçB#æ&6·W&V×&W63ÂôÆ–æ³âãÂ÷à ¢Æƒ#åG,:§2<;7–2ÂFö—2F—÷2FRÜ:ÖF–ÂVÖf÷&FòÆö6ÃÂöƒ#à¢ÇåVÖ&VfW,:¦æ6–;§F–Â:’ÖçFW"G,:§2<;7–2F÷2FF÷2–×÷'FçFW2ÂVÒFö—2F—÷2F–fW&VçFW2FRÜ:ÖF–Â6öÒVÖFVÆ2f÷&FòÖ&–VçFRl:×6–6ò&–æ6—Ââì:6ò:’l;7&×VÆ7Vf–6–VçFR÷"6’<;3¢&WFVì:|:6òÂ6W76òÂ7&—Föw&f–RFW7FR6öçF–çVÒæV6W7<:&–÷2â6W&:|:6ò&VGW¢6†æ6RFR–æ<:¦æF–òÂgW'FòÂ7W'FòVÌ:—G&–6ò÷R&ç6ö×v&RF–æv—"GVFòòÖW6ÖòFV×òâW66öÆ†VçG&RçWfVÒRF—66òW‡FW&æòW7L:FWFÆ†FVÒÄÆ–æ²FóÒ"öFV6—6öW2öçWfVÒÖ÷RÖ†BÖW‡FW&æò"6Æ74æÖSÒ'FW‡BÖ66VçB#æçWfVÒ÷R„BW‡FW&æóÂôÆ–æ³âãÂ÷à¢ÇåVÖ<;7–öffÆ–æR÷R—6öÆF&VGW¢W‡÷6œ:|:6ò:7&—Föw&f–ÖÆ–6–÷6ÂFW6FRVR6V¦GVÆ—¦FRFW7FFâVÆ6ö×ÆVÖVçFfW'<;VW2&÷FVv–F2R6öçG&öÆRFR6W76ó²ì:6ò7V'7F—GV’W7626ÖF2âò6öçFW‡FòFRFVRW7L:VÒÄÆ–æ²FóÒ"ö&Æör÷&ç6ö×v&RÖ6öÖò×&÷FVvW"ÖV×&W6"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&ç6ö×v&RVÒV×&W63ÂôÆ–æ³âãÂ÷à ¢Æƒ#åVæFò&WWF—"òFW7FSÂöƒ#à¢ÇäÌ:–ÒF6L:¦æ6–FVf–æ–FVÆò&—66òÂ&W—F;72G&ö6"fW'&ÖVçF÷RFW7F–æòÂÇFW&"6Væ†÷R6öçFFR6W'fœ:vòÂ–æ6ÇV—"VÖ7F7,:×F–6Â×VF"&WFVì:|:6òÂÖ–w&"6ö×WFF÷"÷R&V6V&W"VÒÆW'FFRfÆ†âVÖ&÷F–æVRgVæ6–öæ÷RçFW2F×VFì:vì:6ò6ö×&÷f6öæf–wW&:|:6òGVÂãÂ÷à ¢Æƒ#äçFW2FRVÇVW"ÖçWFVì:|:6óÂöƒ#à¢Çäf÷&ÖF:|:6òÂG&ö6FRF—66òÂWw&FRR&V–ç7FÆ:|:6ò<:6òÖöÖVçF÷2VÒVR<;7–FV—†FR6W"&V6\:|:6òRf—&,:’×&WV—6—Fòâò7&—L:—&–òFRFV6—<:6òW7L:VÒÄÆ–æ²FóÒ"öFV6—6öW2ö&6·WÖçFW2ÖFÖÖçWFVæ6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ&6·WçFW2FÖçWFVì:|:6óÂôÆ–æ³ââ6RòF—66ò¬:&W6VçF6–æ—2FRfÆ†Â<;7–6ö×VÒöFRì:6ò6W"÷7<:×fVÂ(	BæW76R6Vì:&–òÂò6Ö–æ†ò:’ÄÆ–æ²FóÒ"ö&Æörö6öÖò×&V7WW&"ÖFF÷2Ö†BÖ6öÒÖFVfV—Fò"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&V7WW&:|:6òFRFF÷2VÒ„B6öÒFVfV—FóÂôÆ–æ³âãÂ÷à ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“å&W7FW&"÷"6–ÖFò'V—fò÷&–v–æÃ¢6R<;7–W7F—fW"6÷'&ö×–FÂfö<:¢W&FR÷2Fö—2ãÂöÆ“à¢ÆÆ“ä6öæf–"VÒVæG&—fR6öÖòÜ:ÖF–;¦æ–6FR&6·WãÂöÆ“à¢ÆÆ“äFV—†"òF—66òFR&6·WW&ÖæVçFVÖVçFR6öæV7FFòVæFòò&—66ò&–æ6—Â:’&ç6ö×v&RãÂöÆ“à¢ÆÆ“ä6öç6–FW&"'6–æ7&öæ—¦Fò"6öÖò6–ì;Fæ–ÖòFR&6÷–Fò"ãÂöÆ“à¢ÆÆ“åFW7F"6V×&RòÖW6Öò'V—fòÖ–ì;§67VÆò(	BòFW7FR&V6—6&W&W6VçF"òW6ò&VÂãÂöÆ“à¢ÆÆ“äwV&F";¦æ–6<;7–æòÖW6Öò<;FÖöFòFò6ö×WFF÷"ãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&R6RòFW7FRVçföÇfW";¦æ–6<;7–F—7öì:×fVÂÂ6RòF—66òVÖ—F—"'\:ÖFòÂ6Rò6—7FVÖVF—"f÷&ÖF:|:6òFÜ:ÖF–÷R6R7W&v—&VÒW'&÷2FRÆV—GW&&V6÷'&VçFW2âì:6òf÷&ÖFRæVÒW†V7WFR&W&÷26ö'&R;¦æ–6föçFS²&W6W'fRòW7FFòRfÆ–Rò6Ö–æ†òFRÄÆ–æ²FóÒ"÷6W'f–6÷2÷&V7WW&6òÖFRÖFF÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&V7WW&:|:6òFRFF÷3ÂôÆ–æ³âãÂ÷à ¢ÄVF—F÷&–Å&VfW&Væ6W26ÇVsÒ&6öÖò×FW7F"×&W7FW&6òÖFRÖ&6·W"óà ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFò&÷F–æì:6òVFW"6W"–çFW'&ö×–F&FW7FRÂVæFò†÷WfW"FF÷27,:×F–6÷2FR÷W&:|:6òVçföÇf–F÷2ÂVæFò&W7FW&:|:6ò6ö×ÆWFçVæ6F—fW"6–Fò7&öæöÖWG&F÷RVæFòòFW7FR&WfVÆ"6ö&W'GW&–æ6ö×ÆWFRf÷"æV6W7<:&–ò&VFW6Væ†"òW7VVÖFR<;7–2âfÆ–:|:6òW7L:VÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&6öÖòÖÖöæ—F÷&"×FV×W&GW&ÖFòÖ6ö×WFF÷"#¢°¢F—FÆS¢$6öÖòÖöæ—F÷&"FV×W&GW&Fò6ö×WFF÷"†RVæFòVÆ:’&ö&ÆVÖ’"À¢W†6W'C ¢%V—2FV×W&GW&2ÖVF—"ÂòVR:’æ÷&ÖÂ6ö"6&vÂ6öÖò&V6öæ†V6W"F‡&÷GFÆ–ærRVÒVRöçFòò6Æ÷"FV—†FR6W"6&7FW,:×7F–6Rf—&FVfV—Fòâ"À¢FFS¢###bÓ’Ó2"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢$ÖçWFVì:|:6ò"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#ä6ö×WFF÷"VVçFRì:6ò:’Â÷"6’<;2Â6ö×WFF÷"6öÒFVfV—FòâòVR–×÷'Fì:6ò:’òì;¦ÖW&ò—6öÆFòÂR6–Òò6ö×÷'FÖVçFó¢VçFòFV×òÆWf&7V&—"ÂL:’öæFR6†Vv6ö"6&vÂ6R6’VæFò6&v6&R6RòFW6V×Væ†òFW7Væ6§VçFòãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢ÇäÖöæ—F÷&RG,:§2öçF÷2(	B&ö6W76F÷"ÂÆ6FRl:ÖFVòR&Ö¦VæÖVçFò(	BVÒ&W÷W6òR6ö"6&vâ&Vö7WR×6RVæFòFV×W&GW&6ö"6&v6R&÷†–Ö"FòÆ–Ö—FRFV6Æ&FòVÆòf'&–6çFRFò6ö×öæVçFRÂVæFòòFW6V×Væ†ò6—"FRf÷&Ö''WFòVV6W"÷RVæFòòfÆ÷"VÒ&W÷W6ò¬:f÷"ÇFò6VÒæF&öFæFòãÂ÷à ¢Æƒ#äòVRÖVF—"ÂR÷"\:£Âöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæså&ö6W76F÷"„5R’ãÂ÷7G&öæsâ8’ò6Vç6÷"Ö—26Vç<:×fVÂRòVR&–ÖV—&ò&VGW¢g&W\:¦æ6–&6R&÷FVvW"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåÆ6FRl:ÖFVò„uR’ãÂ÷7G&öæsâVÒ¦öv÷2RVFœ:|:6òÂ:’öæFRò6Æ÷"6R6öæ6VçG&²6÷7GVÖFW"ò,;7&–òfVçF–ÆF÷"R,;7&–7W'fãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä&Ö¦VæÖVçFòãÂ÷7G&öæsâ54BådÖRVV6R&7FçFRVÒ<;7–2Æöæv2R&VGW¢fVÆö6–FFR&6R&÷FVvW"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåFV×W&GW&Ö&–VçFRãÂ÷7G&öæsâæVæ‡VÒfÆ÷"f¢6VçF–Fò6VÒVÆ¢‚+2Ö—2æò<;FÖöFò&V6VÒV6R–çFVw&ÆÖVçFRæ÷26Vç6÷&W2ãÂöÆ“à¢Â÷VÃà¢Çä6ö×&"6WRì;¦ÖW&ò6öÒòFR÷WG&W76öæ–çFW&æWBV6RçVæ6§VF¢ÖöFVÆòÂF—76—F÷"Âv&–æWFRÂfVçF–Æ:|:6òRÖ&–VçFR×VFÒGVFòâò6ö×&F—fò;§F–Â:’6öÒò,;7&–òWV—ÖVçFòÂÖVF–FòVÒFF2F–fW&VçFW2ãÂ÷à ¢Æƒ#ä6öÖòÖVF—"FRf÷&Ö†öæW7FÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒäWFÂ÷FƒãÇFƒäòVRf¦W#Â÷FƒãÇFƒäòVRö'6W'fÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCãÂ÷FCãÇFCäÖVF—"VÒ&W÷W6òÂÖ–çWF÷2;72Æ–v"Â6VÒ&öw&Ö2&W'F÷3Â÷FCãÇFCä&6R&VÂFòWV—ÖVçFóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCã#Â÷FCãÇFCäÖVF—"6ö"6&v7W7FVçFFFRR#Ö–çWF÷2æòW6òVR6÷7GVÖG&f#Â÷FCãÇFCå–6òRW7F&–Æ–FFSÂ÷FCãÂ÷G#à¢ÇG#ãÇFCã3Â÷FCãÇFCäö'6W'f"7W'fFRVVFòVæ6W'&"6&vÂ÷FCãÇFCä66–FFRFRF—76—"6Æ÷#Â÷FCãÂ÷G#à¢ÇG#ãÇFCãCÂ÷FCãÇFCäæ÷F"FV×W&GW&Ö&–VçFR§VçFò6öÒ6FÖVFœ:|:6óÂ÷FCãÇFCä6ö×&&–Æ–FFRVçG&RFF3Â÷FCãÂ÷G#à¢ÇG#ãÇFCãSÂ÷FCãÇFCå&WWF—"ÖW6ÖÖVFœ:|:6ò6FG&–ÖW7G&SÂ÷FCãÇFCåFVæL:¦æ6–FR–÷&÷"öV—&÷R7F6V6Â÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà¢ÇäÆV—GW&öFRf—"FRWF–Æ—L:&–÷2Fò,;7&–òf'&–6çFRFÆ6ÖÜ:6R÷RFòæ÷FV&öö²ÂRFÖ,:–ÒFFVÆFR6öæf–wW&:|:6òFòf—&×v&RÂVRÖ÷7G&FV×W&GW&6VÒ6—7FVÖ÷W&6–öæÂ6'&VvFò(	B;§F–Â&6W&"6Æ÷"FR†&Gv&RFR6Æ÷"6W6Fò÷"&ö6W76òVÒ6VwVæFòÆæòãÂ÷à ¢Æƒ#åF‡&÷GFÆ–æs¢VæFòò6Æ÷"f—&ÆVçF–L:6óÂöƒ#à¢Çäò6†Vv"W'FòFòÆ–Ö—FRL:—&Ö–6òÂò6ö×öæVçFR&VGW¢,;7&–g&W\:¦æ6–âò6–çFöÖW&6V&–Fòì:6ò:’&W7L:VVçFR#¢:’ò6ö×WFF÷"f–6",:–Fòæ÷2&–ÖV—&÷2Ö–çWF÷2RÆVçFòFWö—2Â6V×&RæòÖW6ÖòöçFòFòW6òâ6RVVFFRFW6V×Væ†ò6ö×æ†"òVV6–ÖVçFòÂò&ö&ÆVÖ:’L:—&Ö–6ó²6Rf÷"6öç7FçFRFW6FRò–ì:Ö6–òÂfÆRöÆ†"26W62FW67&—F2VÒÄÆ–æ²FóÒ"ö&Æörö6ö×WFF÷"ÖÆVçFòÖ6W62×6öÇV6öW2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6ö×WFF÷"ÆVçFó¢6W62R6öÇ\:|;VW3ÂôÆ–æ³âRVÒÄÆ–æ²FóÒ"ö&ÆöröÖVÖ÷&–×&ÒÖ–ç7Vf–6–VçFR×6–çFöÖ2"6Æ74æÖSÒ'FW‡BÖ66VçB#ç6–çFöÖ2FRÖVÜ;7&–$Ò–ç7Vf–6–VçFSÂôÆ–æ³âãÂ÷à ¢Æƒ#ä6W626ö×Vç2FRFV×W&GW&ÇFÂöƒ#à¢ÇVÃà¢ÆÆ“åöV—&7V×VÆFæòF—76—F÷"Ræ2w&FW2FR6:ÖFFR"ÂVR:’6W6Ö—2g&WVVçFRRÖ—26–×ÆW2FR6÷'&–v—"(	Bò&ö6VF–ÖVçFòW7L:VÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖÆ–×"Öæ÷FV&öö²×÷"ÖFVçG&ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòÆ–×"òæ÷FV&öö²÷"FVçG&óÂôÆ–æ³âãÂöÆ“à¢ÆÆ“å7FL:—&Ö–6&W76V6FVÒWV—ÖVçFòçF–vòÂG&FFVÒÄÆ–æ²FóÒ"ö&Æörö6öÖò×G&ö6"×7F×FW&Ö–6Öæ÷FV&öö²"6Æ74æÖSÒ'FW‡BÖ66VçB#çG&ö6FR7FL:—&Ö–6ÂôÆ–æ³âãÂöÆ“à¢ÆÆ“åW6ò6ö'&R6ÖÂ6öl:÷RÆÖöfFÂVR&Æ÷VV–VçG&FFR"Fòæ÷FV&öö²ãÂöÆ“à¢ÆÆ“åfVçFö–æ†G&fFÂ6öÒ&öÆÖVçFòv7Fò÷RFW66öæV7FFãÂöÆ“à¢ÆÆ“å&ö6W76òVÒ6VwVæFòÆæò6öç7VÖ–æFòò&ö6W76F÷"6VÒVRòW7\:&–òW&6V&Â–æ6ÇV–æFò6ögGv&RÖÆ–6–÷6ò(	BòVG&òW7L:VÒÄÆ–æ²FóÒ"ö&Æörö6öÖò×6&W"×6R×2×FVÒ×f—'W2ÖÖÇv&R"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖò6&W"6Rò2FVÒl:×'W3ÂôÆ–æ³âãÂöÆ“à¢ÆÆ“äfÇW†òFR"'V–Òæòv&–æWFRÂ6öÒ6&÷2ö'7G'V–æFò76vVÒ÷RfVçFö–æ†2–çfW'F–F2ãÂöÆ“à¢Â÷VÃà¢ÇåVæFòò7WW&VV6–ÖVçFò¬:&÷fö6FW6Æ–vÖVçFòÂòVæ6Ö–æ†ÖVçFòW7V<:Öf–6òW7L:VÒÄÆ–æ²FóÒ"ö&Æöröæ÷FV&öö²×7WW&VV6VæFòÖò×VRÖf¦W""6Æ74æÖSÒ'FW‡BÖ66VçB#ææ÷FV&öö²7WW&VV6VæFóÂôÆ–æ³ââ6L:¦æ6–FRfW&–f–6:|:6òVRWf—F6†Vv"W76RöçFòW7L:VÒÄÆ–æ²FóÒ"ö&ÆöröÖçWFVæ6ò×&WfVçF—fÖFRÖ6ö×WFF÷"ÖwV–Ö6ö×ÆWFò"6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6ò&WfVçF—fFR6ö×WFF÷#ÂôÆ–æ³âãÂ÷à ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“åG&ö6"7FL:—&Ö–6÷"&÷F–æÂ6VÒ–æL:Ö6–òFR&ö&ÆVÖL:—&Ö–6òR6VÒÖVF—"çFW2RFWö—2ãÂöÆ“à¢ÆÆ“äf÷,:v"2fVçFö–æ†2òÜ:†–ÖòW&ÖæVçFVÖVçFR&Ö66&"7V¦V—&7V×VÆFãÂöÆ“à¢ÆÆ“åW6""6ö×&–Ö–Fòv—&æFòfVçFö–æ†Æ—g&VÖVçFRÂòVRöFRFæ–f–<:ÖÆãÂöÆ“à¢ÆÆ“ä6ö×&"7VFV×W&GW&6öÒFR÷WG&òÖöFVÆòR6öæ6ÇV—"FVfV—Fò'F—"F—76òãÂöÆ“à¢ÆÆ“äFW6F—f"&÷F\:|;VW2L:—&Ö–62÷RÆ–Ö—FW2Fòf—&×v&R&væ†"FW6V×Væ†òãÂöÆ“à¢ÆÆ“ä–væ÷&"&Ö¦VæÖVçFó¢54BVVçFRVR&VGW¢fVÆö6–FFR&V6R'6—7FVÖG&fæFò"ãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&R6RòWV—ÖVçFòFW6Æ–v"6÷¦–æ†ò6ö"6&vÂ6R†÷WfW"6†V—&òFRVV–ÖFòÂ6RfVçFö–æ†ì:6òv—&"÷R6RFV×W&GW&VÒ&W÷W6ò¬:f÷"ÇF6öÒòÖ&–VçFRg&W66òâ6öçF–çV"W6æFòæW7626öæFœ:|;VW26VÆW&òFW6v7FRFò6ö×öæVçFRRöFRG&ç6f÷&Ö"VÒ&W&ò6–×ÆW2VÒ7V'7F—GVœ:|:6òFR\:vãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòÆ–×W¦ì:6ò&VGW¦—"FV×W&GW&ÂVæFòfVçFö–æ†&V6—6"6W"7V'7F—G\:ÖFÂVæFò†÷WfW"7W7V—FFRF—76—F÷"ÖÂf—†Fò;72VÒ&W&òçFW&–÷"÷RVæFòòFW6Æ–vÖVçFò÷"6Æ÷"¬:W7F—fW"–çFW'&ö×VæFòòG&&Æ†òâfÆ–:|:6òW7L:VÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âÂRò6W'fœ:vò6÷'&W7öæFVçFRVÒÄÆ–æ²FóÒ"÷6W'f–6÷2öÖçWFVæ6òÖFRÖ6ö×WFF÷""6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6òFR6ö×WFF÷#ÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢'VæG&—fR×6öÖVçFRÖÆV—GW&×&÷FVv–FòÖ6öçG&Öw&f6ò#¢°¢F—FÆS¢%VæG&—fR6öÖVçFRÆV—GW&¢÷"VR&V6RÂ'&÷FVv–Fò6öçG&w&f:|:6õÂ""À¢W†6W'C ¢$6öÖò6W&"G&fl:×6–6ÂöÌ:×F–6Fò6—7FVÖÂ6—7FVÖFR'V—f÷2Fæ–f–6FòRÖVÜ;7&–VÒf–ÒFRf–F(	BR÷"VR6÷–"÷2'V—f÷2fVÒçFW2FRVÇVW"FVçFF—fFR6öç6W'Fòâ"À¢FFS¢###bÓ’Ó2"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢$F–vì;77F–6ò"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#åVæFòò6—7FVÖ&V7W6w&f"VÒVÒVæG&—fR÷R6'L:6òRf—6VRÜ:ÖF–W7L:&÷FVv–F6öçG&w&f:|:6òÂW†—7FVÒVG&ò÷&–vVç2÷7<:×fV—2(	BRVæ2VÖFVÆ2FVÒ6öç6W'Fò6–×ÆW2â÷&FVÒVÒVRfö<:¢FW7FFV6–FR6R÷2'V—f÷2<:6ò&W6W'fF÷2÷RW&F–F÷2ãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢ÇåfW&–f—VRæW7F÷&FVÓ¢G&fl:×6–6æò6÷'òFòF—7÷6—F—fòÂ&W7G&œ:|:6ò6öæf–wW&Fæò6—7FVÖÂ6—7FVÖFR'V—f÷2Fæ–f–6FòRÂ÷";¦ÇF–ÖòÂÖVÜ;7&–VÒf–ÒFRf–FâçFW2FRVÇVW"FVçFF—fFR6÷'&\:|:6òÂ6÷–RòVR–æFf÷"ÆV|:×fVÂ(	BÜ:ÖF–VRVçG&÷RVÒ6öÖVçFRÆV—GW&×V—F2fW¦W2W7L:&÷FVvVæFòò,;7&–ò6öçF\;¦FòVÆ;¦ÇF–ÖfW¢ãÂ÷à ¢Æƒ#ä2VG&ò÷&–vVç3Âöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsåG&fl:×6–6ãÂ÷7G&öæsâ6'L;VW24BRÆwVç2VæG&—fW2L:¦ÒVÖ6†fRÆFW&ÂâVÆ:’ÖV<:&æ–6RöFRf–6"VÒ÷6œ:|:6ò–çFW&ÖVFœ:&–÷Rg&÷W†ÂÖW6Öò&V6VæFòFW7G&fFãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåöÌ:×F–6Fò6—7FVÖãÂ÷7G&öæsâ6öæf–wW&:|;VW2FR6VwW&ì:vVÒÖ&–VçFR6÷'÷&F—fòÂ÷RVÖ&W7G&œ:|:6òÆ–6FçFW2æ,;7&–Ü:V–æÂöFVÒ&Æ÷VV"W67&—FVÒÜ:ÖF–&VÖ÷l:×fVÂ(	BæW76R66òÂòÖW6ÖòVæG&—fRw&fæ÷&ÖÆÖVçFRVÒ÷WG&ò6ö×WFF÷"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæså6—7FVÖFR'V—f÷2Fæ–f–6FòãÂ÷7G&öæsâ&VÖü:|:6òGW&çFRw&f:|:6òÂVVFFRVæW&v–÷RFW6Æ–vÖVçFò''WFòFV—†ÒW7G'WGW&–æ6öç6—7FVçFRÂRò6—7FVÖÖöçFVÒÖöFò&÷FVv–Fò&Wf—F"–÷&"ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÖVÜ;7&–VÒf–ÒFRf–FãÂ÷7G&öæsâÖVÜ;7&–fÆ6‚FVÒì;¦ÖW&òf–æ—FòFR6–6Æ÷2FRW67&—FâòW6v÷F"2<:–ÇVÆ2&W6W'fÂò6öçG&öÆF÷"76Ü:ÖF–&6öÖVçFRÆV—GW&FRf÷&ÖFVf–æ—F—fãÂöÆ“à¢Â÷VÃà¢ÇäòV'Fò66òì:6òFVÒ&W&ó¢Ü:ÖF–6öçF–çVÆV|:×fVÂ÷"VÒFV×òRFWö—2FV—†FR6W"&V6öæ†V6–FâVæFòòF—7÷6—F—fò6WVW"&V6RÂò&÷FV—&ò:’÷WG&ò(	BW7L:VÒÄÆ–æ²FóÒ"ö&ÆöröF—7÷6—F—fò×W6"Öæò×&V6öæ†V6–FòÖò×VRÖf¦W""6Æ74æÖSÒ'FW‡BÖ66VçB#æF—7÷6—F—fòU4"ì:6ò&V6öæ†V6–FóÂôÆ–æ³âãÂ÷à ¢Æƒ#å6W\:¦æ6–FR—6öÆÖVçFóÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒåFW7FSÂ÷FƒãÇFƒä6öÖòf¦W#Â÷FƒãÇFƒä6öæ6ÇW<:6óÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCä6÷–"&–ÖV—&óÂ÷FCãÇFCå6Çf"FöFòò6öçF\;¦FòÆV|:×fVÂVÒF—66ò–çFW&æòçFW2FRFVçF"6÷'&–v—#Â÷FCãÇFCå&W6W'f÷2FF÷2–æFWVæFVçFVÖVçFRFò&W7VÇFFóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCåG&fl:×6–6Â÷FCãÇFCäÇFW&æ"6†fRÆFW&ÂÂ6RW†—7F—"ÂR&V–ç6W&—#Â÷FCãÇFCåföÇFw&f#¢W&ÖV<:&æ–6óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä÷WG&ò6ö×WFF÷#Â÷FCãÇFCåFW7F"ÖW6ÖÜ:ÖF–VÒÜ:V–æF–fW&VçFSÂ÷FCãÇFCäw&fÌ:¢&W7G&œ:|:6ò:’Fò6—7FVÖÂì:6òFÜ:ÖF–Â÷FCãÂ÷G#à¢ÇG#ãÇFCä÷WG&÷'FR÷WG&ò6&óÂ÷FCãÇFCåG&ö6"÷'FG&6V—&ÂWf—F"‡V"RW‡FVç<:6óÂ÷FCãÇFCäVÆ–Ö–æ6öçFFòRÆ–ÖVçF:|:6ò–ç7L:fVÃÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä÷WG&Ü:ÖF–æÖW6Ö÷'FÂ÷FCãÇFCä–ç6W&—"÷WG&òVæG&—fR6ö×&÷fFÖVçFR&öÓÂ÷FCãÇFCåFÖ,:–Ò&Æ÷VV–¢ò&ö&ÆVÖW7L:æò6ö×WFF÷#Â÷FCãÂ÷G#à¢ÇG#ãÇFCåfW&–f–6:|:6òFRW'&÷3Â÷FCãÇFCå&öF"6†V6vVÒFRF—66òFò6—7FVÖÂ6öÖVçFRFWö—2F<;7–Â÷FCãÇFCä6÷'&–vRW7G'WGW&–æ6öç6—7FVçFSÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#äf÷&ÖF"&W6öÇfSóÂöƒ#à¢Çäf÷&ÖF"6÷'&–vRòFW&6V—&ò66ò(	BW7G'WGW&Fæ–f–6F(	BRvFöFòò6öçF\;¦Fòâì:6ò6÷'&–vRG&fl:×6–6æVÒÖVÜ;7&–W6v÷FF¢6RÜ:ÖF–W7F—fW"&VÆÖVçFRVÒf–ÒFRf–FÂf÷&ÖF:|:6òfÆ†æòÖV–ò÷R&V6R6öæ6ÇV—"RföÇF6öÖVçFRÆV—GW&æò&–ÖV—&òW6òâ÷"—76ò<;7–fVÒçFW2Â6V×&Râ6RÜ:ÖF–wV&Ff;¦æ–6fW'<:6òFRÆwVÒ'V—fòÂò6Vì:&–ò766W"FR&W6vFRÂG&FFòVÒÄÆ–æ²FóÒ"ö&Æörö6öÖò×&V7WW&"ÖFF÷2Ö†BÖ6öÒÖFVfV—Fò"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&V7WW&:|:6òFRFF÷2VÒF—66ò6öÒFVfV—FóÂôÆ–æ³âãÂ÷à ¢Æƒ#å÷"VR—76òf—&&ö&ÆVÖ&V6÷'&VçFSÂöƒ#à¢ÇåVæG&—fRR6'L:6ò<:6òÜ:ÖF–2FRG&ç7÷'FRÂì:6òFRwV&Fâ<:6òWVVæ÷2Â6ög&VÒ–×7FòÂf–6ÒVÒ&öÇ6òR6†fV—&òRVçfVÆ†V6VÒ÷"W67&—FâW6"VÒFVÆW26öÖò<;7–;¦æ–6:’÷&–vVÒFÖ–÷"'FRF2W&F2Wf—L:fV—2VR6†VvÒ:&æ6FâÇFW&æF—fW7L:VÒÄÆ–æ²FóÒ"öFV6—6öW2öçWfVÒÖ÷RÖ†BÖW‡FW&æò"6Æ74æÖSÒ'FW‡BÖ66VçB#æçWfVÒ÷R„BW‡FW&æóÂôÆ–æ³âÂRfW&–f–6:|:6òF<;7–VÒÄÆ–æ²FóÒ"ö&Æörö6öÖò×FW7F"×&W7FW&6òÖFRÖ&6·W"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòFW7F"6Rò&6·WgVæ6–öæÂôÆ–æ³âãÂ÷à ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“äf÷&ÖF"çFW2FR6÷–"òVR–æF:’ÆV|:×fVÂãÂöÆ“à¢ÆÆ“å&öF"WF–Æ—L:&–÷2FR&FW6&Æ÷VV–ò"FR÷&–vVÒGWf–F÷6ÂVR6÷7GVÖÒv"Ü:ÖF–6VÒf—6òãÂöÆ“à¢ÆÆ“äÇFW&"6öæf–wW&:|;VW2FR6VwW&ì:vFò6—7FVÖ÷"FVçFF—fRW'&òVÒ6ö×WFF÷"6÷'÷&F—fòãÂöÆ“à¢ÆÆ“ä–ç6—7F—"VÒw&f:|;VW2&WWF–F2VÒÜ:ÖF–VR¬:fÆ†÷S¢6FFVçFF—f6öç6öÖR6–6Æ÷2ãÂöÆ“à¢ÆÆ“ä6öæf–"æ÷fÖVçFRæÜ:ÖF–VRföÇF÷RgVæ6–öæ"FWö—2FRVÒW—<;6F–òFW76W2ãÂöÆ“à¢ÆÆ“äwV&F"Fö7VÖVçFò–×÷'FçFRVæ2VÒVæG&—fRãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&R6RÜ:ÖF–VV6W"×V—FòÂ6R<;7–G&f"VÒFWFW&Ö–æFò'V—fòÂ6RòF—7÷6—F—fòFW6&V6W"GW&çFRÆV—GW&÷R6R&V6W"6öÒ66–FFRW'&Fâ<:6ò6–æ—2FR6öçG&öÆF÷"÷RÖVÜ;7&–VÒfÆ†ÂRæ÷f2FVçFF—f2&VGW¦VÒ6†æ6RFR&W6vFRãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFò†÷WfW"'V—fò–ç7V'7F—G\:×fVÂæÜ:ÖF–ÂVæFòòÖW6Öò6ö×÷'FÖVçFò6R&WWF—"VÒl:&–÷2VæG&—fW2æòÖW6Öò6ö×WFF÷"(	BòVRöçF&ò6—7FVÖ÷R&2÷'F2(	B÷RVæFòòF—7÷6—F—fò76"ì:6ò6W"&V6öæ†V6–FòâòVæ6Ö–æ†ÖVçFòW7L:VÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âRÂ†fVæFòFF÷2VÒ&—66òÂVÒÄÆ–æ²FóÒ"÷6W'f–6÷2÷&V7WW&6òÖFRÖFF÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&V7WW&:|:6òFRFF÷3ÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&†—7F÷&–6òÖFRÖ'V—f÷2×v–æF÷w2Ö6öÖòÖ6öæf–wW&"#¢°¢F—FÆS¢$†—7L;7&–6òFR'V—f÷2Fòv–æF÷w3¢6öÖò6öæf–wW&"fW'<;VW2FRfW&FFR"À¢W†6W'C ¢$ò&V7W'6òæF—fòVRwV&FfW'<;VW2çFW&–÷&W2F÷26WW2'V—f÷3¢òVRVÆR6ö'&RÂòVRVÆRì:6ò6ö'&RR6öÖò6öæf–wW,:ÖÆò6VÒ6öægVæF—"fW'6–öæÖVçFò6öÒ&6·W6ö×ÆWFòâ"À¢FFS¢###bÓ’Ó2"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#ä&ö'FRF2W&F2FR'V—fòì:6òfVÒFRF—66òVV–ÖFó¢fVÒFR6ö'&W67&WfW"fW'<:6ò&öÂ6Çf"VÒ6–ÖFòFö7VÖVçFòW'&Fò÷Rv"6VÒW&6V&W"â6öçG&—76òÂ<;7–;¦æ–6ì:6ò§VF(	BòVR&W6öÇfR:’FW"fW'<;VW2çFW&–÷&W2&V7WW,:fV—2ãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çäò†—7L;7&–6òFR'V—f÷2Fòv–æF÷w26÷–W&–öF–6ÖVçFR27F2FRW7\:&–ò&VÒF—66òW‡FW&æò÷R7FFR&VFRRÖçL:–ÒfW'<;VW2çF–v2âVÆR6W'fR&&V7WW&"'V—f÷2RfW'<;VW2Âì:6ò&&W7FW&"ò6—7FVÖ–çFV—&òâ6öæf–wW&R6öÒF—66òFVF–6FòÂ6öæf—&V—27F2VçG&&ÒRFW7FR&W7FW&:|:6òFWö—2ãÂ÷à ¢Æƒ#äòVRVÆR6ö'&R(	BRòVRì:6ò6ö'&SÂöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsä6ö'&S£Â÷7G&öæsâ7F2FRW7\:&–ò6öÖòFö7VÖVçF÷2Â–ÖvVç2Â:&VFRG&&Æ†òRff÷&—F÷2Â6öÒfW'<;VW27V6W76—f2òÆöævòFòFV×òãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6ö'&S£Â÷7G&öæsâ&V7WW&:|:6òöçGVÂFR&fW'<:6òFRöçFVÒ"6VÒFW6f¦W"æFFò&W7FòFò6—7FVÖãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäì:6ò6ö'&S£Â÷7G&öæsâò6—7FVÖ÷W&6–öæÂÂ÷2&öw&Ö2–ç7FÆF÷2R26öæf–wW&:|;VW2(	B—76ò:’–ÖvVÒFò6—7FVÖÂ÷WG&6ö—6ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäì:6ò6ö'&S£Â÷7G&öæsâ7F2f÷&FòW&f–ÂFòW7\:&–òÂ6Çfò6R–æ6Ç\:ÖF2ÖçVÆÖVçFRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäì:6ò6ö'&S£Â÷7G&öæsâ&÷F\:|:6ò6öçG&–æ<:¦æF–ò÷RgW'FòÂ÷'VRòF—66ò6÷7GVÖf–6"æÖW6Ö6ÆãÂöÆ“à¢Â÷VÃà¢Çå÷"—76òVÆR:’VÖ6ÖFÂì:6òW7G&L:–v––çFV—&âò6öæ§VçFò6ö×ÆWFò(	BG,:§2<;7–2ÂFö—2F—÷2FRÜ:ÖF–ÂVÖf÷&FòÆö6Â(	BW7L:FW67&—FòVÒÄÆ–æ²FóÒ"ö&Æörö&6·WÖ6öÖò×&÷FVvW"×6WW2Ö'V—f÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖò&÷FVvW"6WW2'V—f÷3ÂôÆ–æ³âãÂ÷à ¢Æƒ#ä6öæf–wW&:|:6òVÒ÷&FVÓÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒäWFÂ÷FƒãÇFƒäFV6—<:6óÂ÷FƒãÇFƒä7&—L:—&–óÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCãÂ÷FCãÇFCäW66öÆ†W"òFW7F–æóÂ÷FCãÇFCäF—66òW‡FW&æòFVF–6Fò÷R7FFR&VFS²çVæ6÷WG&'Fœ:|:6òFòÖW6ÖòF—66óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCã#Â÷FCãÇFCäF–ÖVç6–öæ"òW7:vóÂ÷FCãÇFCåVÆòÖVæ÷2GV2G,:§2fW¦W2òföÇVÖRF÷2'V—f÷2Â÷'VRfW'<;VW2ö7WÓÂ÷FCãÂ÷G#à¢ÇG#ãÇFCã3Â÷FCãÇFCå&Wf—6"27F2–æ6Ç\:ÖF3Â÷FCãÇFCä6öæfW&—"6R:&VFRG&&Æ†òÂF÷væÆöG2R7F2FRG&&Æ†òVçG&&ÓÂ÷FCãÂ÷G#à¢ÇG#ãÇFCãCÂ÷FCãÇFCäW†6ÇV—"òVRì:6òfÆRfW'6–öæ#Â÷FCãÇFCål:ÖFV÷2''WF÷2Â¦öv÷2R7F2FR66†R6öç6öÖVÒW7:vò6VÒ&WF÷&æóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCãSÂ÷FCãÇFCäFVf–æ—"g&W\:¦æ6–Â÷FCãÇFCåVçFòÖ—27W'FÂÖVæ÷2G&&Æ†òW&F–FòVçG&RVÖ<;7–R÷WG&Â÷FCãÂ÷G#à¢ÇG#ãÇFCãcÂ÷FCãÇFCäFVf–æ—"÷"VçFòFV×òÖçFW#Â÷FCãÇFCå&WFVì:|:6ò7W'FV6öæöÖ—¦W7:vòÂÖ2Væ7W'F¦æVÆFR&V7WW&:|:6óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCãsÂ÷FCãÇFCåFW7F"&W7FW&:|:6óÂ÷FCãÇFCå&V7WW&"VÒ'V—fòVÒ7F6W&FR'&’ÖÆóÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà¢ÇäWFr:’;¦æ–6VR&÷fVR6öæf–wW&:|:6ògVæ6–öæâò&÷FV—&ò6ö×ÆWFòFRfW&–f–6:|:6òW7L:VÒÄÆ–æ²FóÒ"ö&Æörö6öÖò×FW7F"×&W7FW&6òÖFRÖ&6·W"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòFW7F"6Rò&6·W&VÆÖVçFRgVæ6–öæÂôÆ–æ³âãÂ÷à ¢Æƒ#åfW'6–öæÖVçFòì:6ò:’6–æ7&öæ—¦:|:6óÂöƒ#à¢Çå6W'fœ:vòFR6–æ7&öæ—¦:|:6òW7VÆ†òW7FFòGVÃ¢6Rò'V—fòfö’6÷'&ö×–Fò÷R7&—Föw&fFòÂòW7VÆ†ò&V6V&RòW7FFò'V–ÒâfW'6–öæÖVçFòwV&FòçFW2â8’W†FÖVçFRW76F–fW&Vì:vVR6ÇfVÒFö7VÖVçFò6ö'&W67&—FòRÆ–Ö—FòW7G&vòFRVÖ7&—Föw&f–ÖÆ–6–÷6(	B6öçFW‡FòFWFÆ†FòVÒÄÆ–æ²FóÒ"ö&Æör÷&ç6ö×v&RÖ6öÖò×&÷FVvW"ÖV×&W6"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&ç6ö×v&S¢6öÖò&÷FVvW"V×&W6ÂôÆ–æ³ââ&&VGW¦—"ò&—66òÂòF—66òFRfW'<;VW2<;2FWfRf–6"6öæV7FFòGW&çFR<;7–ãÂ÷à ¢Æƒ#åVæFòòF—66òFRFW7F–æò:’ò&ö&ÆVÖÂöƒ#à¢Çå&÷F–æVR'&6÷¦–æ†"V6R6V×&R:’FW7F–æòW6VçFRÂ6†V–ò÷R6öÒfÆ†âfÆR6†V6"òW7FFòFòF—66òçFW2FR7VÇ"ò&V7W'6ò(	Bò6Ö–æ†òW7L:VÒÄÆ–æ²FóÒ"ö&ÆöröF—66òÖ6öÒ×6WF÷&W2ÖFVfV—GV÷6÷2×6Ö'BÖò×VRÖf¦W""6Æ74æÖSÒ'FW‡BÖ66VçB#æF—66ò6öÒ6WF÷&W2FVfV—GV÷6÷3ÂôÆ–æ³ââ6RÜ:ÖF–W‡FW&æVçG&÷RVÒ6öÖVçFRÆV—GW&ÂòF–vì;77F–6òW7L:VÒÄÆ–æ²FóÒ"ö&Æör÷VæG&—fR×6öÖVçFRÖÆV—GW&×&÷FVv–FòÖ6öçG&Öw&f6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æÜ:ÖF–&÷FVv–F6öçG&w&f:|:6óÂôÆ–æ³âãÂ÷à ¢Æƒ#äçFW2FRf÷&ÖF"÷RG&ö6"FRF—66óÂöƒ#à¢ÇåfW'<;VW2wV&FF2ì:6ò7V'7F—GVVÒ<;7–fV—FW7V6–f–6ÖVçFRçFW2FRVÖ–çFW'fVì:|:6òâò7&—L:—&–òW7L:VÒÄÆ–æ²FóÒ"öFV6—6öW2ö&6·WÖçFW2ÖFÖÖçWFVæ6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ&6·WçFW2FÖçWFVì:|:6óÂôÆ–æ³âÂRò&ö6VF–ÖVçFòFR&V–ç7FÆ:|:6ò&W6W'fæFòFF÷2VÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖf÷&ÖF"×2×6VÒ×W&FW"Ö'V—f÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòf÷&ÖF"ò26VÒW&FW"'V—f÷3ÂôÆ–æ³âãÂ÷à ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“äöçF"òFW7F–æò&÷WG&'Fœ:|:6òFòÖW6ÖòF—66òl:×6–6òãÂöÆ“à¢ÆÆ“äFV—†"òF—66òFRfW'<;VW2W&ÖæVçFVÖVçFR6öæV7FFòVæFòò&—66ò&–æ6—Â:’7&—Föw&f–ÖÆ–6–÷6ãÂöÆ“à¢ÆÆ“ä6öæf–"VR27F26W'F2VçG&&Ò6VÒ6öæfW&—"Æ—7FãÂöÆ“à¢ÆÆ“åG&F"fW'6–öæÖVçFò6öÖò7V'7F—GWFòFR–ÖvVÒFò6—7FVÖãÂöÆ“à¢ÆÆ“äF—f"RçVæ6Ö—2öÆ†#¢&÷F–æ6VÒfW&–f–6:|:6ò:’7W÷6œ:|:6òãÂöÆ“à¢ÆÆ“å&VGW¦—"&WFVì:|:6òòÜ:Öæ–Öò&V6öæöÖ—¦"W7:vòVÒF—66òWVVæòãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&R6RòFW7F–æò&W6VçF"W'&òFRw&f:|:6òÂ6RòF—66òVÖ—F—"'\:ÖFò–æ6ö×VÒ÷R6Rò6—7FVÖVF—"f÷&ÖF:|:6òFÜ:ÖF–FRfW'<;VW2â–ç6—7F—"w&f÷"6–ÖFRW7:vòVR–æFöFR6öçFW"FFò&V7WW,:fVÂãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFò†÷WfW"FF÷2FRG&&Æ†òVçföÇf–F÷2ÂVæFò&÷F–æfÆ†"FRf÷&Ö&V6÷'&VçFR6VÒ6W6&VçFRÂVæFòf÷"&V6—6òFW6Væ†"6ö&W'GW&&Ö—2FRVÒ6ö×WFF÷"÷RVæFò&W7FW&:|:6ò6ö×ÆWFçVæ6F—fW"6–Fò7&öæöÖWG&Fâ&Ö&–VçFR6öÒWV—RÂòFW6Fö'&ÖVçFòW7L:VÒÄÆ–æ²FóÒ"÷6W'f–6÷2ö&6·W×&ÖV×&W62"6Æ74æÖSÒ'FW‡BÖ66VçB#æ&6·W&V×&W63ÂôÆ–æ³ã²fÆ–:|:6ò–æF—f–GVÂÂVÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&Ööæ—F÷"×6VÒ×6–æÂÖò×VR×fW&–f–6"#¢°¢F—FÆS¢$Ööæ—F÷"6VÒ6–æÃ¢òVRfW&–f–6"çFW2FRG&ö6"FR\:v"À¢W†6W'C ¢%Â%6VÒ6–æÅÂ"æFVÆì:6òVW"F—¦W"Ööæ—F÷"VV–ÖFòâ6W\:¦æ6–&6W&"6&òÂVçG&FW'&FÂ6:ÖFFRl:ÖFVòR6ö×WFF÷"VRæVÒ6†Vv÷R–æ–6–"â"À¢FFS¢###bÓ’Ó2"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢$F–vì;77F–6ò"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#äÖVç6vVÒ'6VÒ6–æÂ"†÷R&æò6–væÂ"’6–væ–f–6Væ2VÖ6ö—6¢òÖöæ—F÷"W7L:Æ–vFòRì:6ò&V6V&R–ÖvVÒVÆVçG&F6VÆV6–öæFâVÆì:6òF—¢FRVVÒ:’7VÇ(	BR:’÷"—76òVRFçFvVçFRG&ö66&òÂÖöæ—F÷"RÆ6FRl:ÖFVò6VÒ&W6öÇfW"æFãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çå6RòÖöæ—F÷"Ö÷7G&,;7&–ÖVç6vVÒæFVÆÂVÆRW7L:f—fòâfW&–f—VRæW7F÷&FVÓ¢VçG&F6VÆV6–öæFÂ6&òR6öæV7F÷"Â6:ÖFFRl:ÖFVòW6F‡Æ6FVF–6F÷R–çFVw&F’RÂ÷";¦ÇF–ÖòÂ6Rò6ö×WFF÷"&VÆÖVçFR–æ–6–÷Râ<;2FWö—2F—76ò7W7V—F766W"FR\:vFVfV—GV÷6ãÂ÷à ¢Æƒ#å&–ÖV—&ó¢òÖöæ—F÷"Ö÷7G&ÆwVÖ6ö—6óÂöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsäÖ÷7G&'6VÒ6–æÂ"÷RòÖVçRFò,;7&–òÖöæ—F÷#£Â÷7G&öæsâFVÆRföçFRFVÆgVæ6–öæÓ²ò&ö&ÆVÖW7L:çFW2Âæò6Ö–æ†òFòl:ÖFVòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåFVÆF÷FÆÖVçFRvFÂ6VÒÄTBR6VÒÖVçS£Â÷7G&öæsâò7W7V—Fò:’Æ–ÖVçF:|:6òFòÖöæ—F÷"(	B6&òFRf÷,:vÂFöÖF÷RföçFRW‡FW&æãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä–ÖvVÒ&V6R÷"–ç7FçFW2R6öÖS£Â÷7G&öæsâ6÷7GVÖ6W"6öæWŒ:6ò–ç7L:fVÂÂFFF÷"FRÜ:VÆ–FFR÷R&W6öÇ\:|:6ò–æ6ö×L:×fVÂãÂöÆ“à¢Â÷VÃà¢ÇäW766W&:|:6òWf—FòW'&òÖ—26ö×VÒFòFVæF–ÖVçFó¢G&F"6öÖòfÆ†FRl:ÖFVòòVRæfW&FFR:’VÒ6ö×WFF÷"VRì:6ò6ö×ÆWF÷R–æ–6–Æ—¦:|:6òÂ6Vì:&–òFW67&—FòVÒÄÆ–æ²FóÒ"ö&Æöröæ÷FV&öö²ÖæòÖÆ–vÖò×VRÖf¦W""6Æ74æÖSÒ'FW‡BÖ66VçB#ææ÷FV&öö²VRì:6òÆ–vÂôÆ–æ³âãÂ÷à ¢Æƒ#ä6W\:¦æ6–FRfW&–f–6:|:6óÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒä÷&FVÓÂ÷FƒãÇFƒåfW&–f–6:|:6óÂ÷FƒãÇFƒäòVRVÆVÆ–Ö–æÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCãÂ÷FCãÇFCåG&ö6"VçG&FæòÖVçRFòÖöæ—F÷"„„DÔ’Â„DÔ’"ÂF—7Æ•÷'BÂdt“Â÷FCãÇFCäVçG&F6VÆV6–öæFF–fW&VçFRFVRW7L:VÒW6óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCã#Â÷FCãÇFCå&VVæ6—†"2GV2öçF2Fò6&ò6öÒòWV—ÖVçFòFW6Æ–vFóÂ÷FCãÇFCä6öæV7F÷"ÖÂVæ6—†Fò÷R&6–ÆÖVçFR6öÇFóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCã3Â÷FCãÇFCåFW7F"÷WG&ò6&òRÂ6R÷7<:×fVÂÂ÷WG&òG,:6òFR6öæWŒ:6óÂ÷FCãÇFCä6&ò&ö×–Fò–çFW&æÖVçFR÷RFFF÷"'V–ÓÂ÷FCãÂ÷G#à¢ÇG#ãÇFCãCÂ÷FCãÇFCäÆ–v"òÖöæ—F÷"VÒ÷WG&ò6ö×WFF÷"÷Ræ÷FV&öö³Â÷FCãÇFCäFVfV—FòFò,;7&–òÖöæ—F÷#Â÷FCãÂ÷G#à¢ÇG#ãÇFCãSÂ÷FCãÇFCåG&ö6"6:ÖFW6F¢FÆ6FVF–6F&–çFVw&FFÆ6ÖÜ:6SÂ÷FCãÇFCåÆ6FRl:ÖFVòÖÂVæ6—†FÂ6VÒVæW&v–÷RFVfV—GV÷6Â÷FCãÂ÷G#à¢ÇG#ãÇFCãcÂ÷FCãÇFCäö'6W'f"fVçFö–æ†2ÂÄTG2R6öç2òÆ–v"òv&–æWFSÂ÷FCãÇFCä6ö×WFF÷"VR6WVW"–æ–6–†ì:6ò:’&ö&ÆVÖFRl:ÖFVò“Â÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà¢Çä6F76ò<;2f¢6VçF–FòFWö—2FòçFW&–÷"âVÆ"F—&WFò&ò—FVÒR:’òÖ÷F—fòFRFçFÆ6FRl:ÖFVò6W"G&ö6F6VÒæV6W76–FFRãÂ÷à ¢Æƒ#äFWFÆ†RVRVævæVÒ2FRÖW6Âöƒ#à¢ÇåVæFòW†—7FRÆ6FRl:ÖFVòFVF–6FÂ26:ÖF2FÆ6ÖÜ:6RvW&ÆÖVçFRf–6ÒFW6F—fF2â6&òÆ–vFòæ6:ÖFFR6–Ö‡Æ6ÖÜ:6R’6öÒÆ6FVF–6F–ç7FÆF&W7VÇFW†FÖVçFRVÒ'6VÒ6–æÂ"Â6öÒò6ö×WFF÷"gVæ6–öææFòW&fV—FÖVçFRâò–çfW'6òFÖ,:–Ò6öçFV6S¢Æ6FVF–6FÖÂVæ6—†F÷R6VÒò6öæV7F÷"FRVæW&v–FW''V&6:ÖFFRl:ÖFVò6VÒv"ò&W7FòFÜ:V–æãÂ÷à ¢Æƒ#åVæFòò&ö&ÆVÖ:’çFW&–÷"òl:ÖFVóÂöƒ#à¢Çå6R2fVçFö–æ†2v—&ÒÖ2æF&V6RVÒæVæ‡VÖ6:ÖFÂò6ö×WFF÷"öFRW7F"&æFòçFW2FòFW7FR–æ–6–ÂFR†&Gv&Râ:Ò–çfW7F–v:|:6ò×VFFR77VçFó¢ÖVÜ;7&–ÖÂVæ6—†FÂÆ–ÖVçF:|:6ò–ç7Vf–6–VçFR÷RfÆ†æÆ6â÷26Ö–æ†÷2W7L:6òVÒÄÆ–æ²FóÒ"ö&Æörö6öÖò×FW7F"ÖföçFRÖFRÖÆ–ÖVçF6ò×2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòFW7F"föçFRFRÆ–ÖVçF:|:6óÂôÆ–æ³âÂÄÆ–æ²FóÒ"ö&ÆöröÖVÖ÷&–×&ÒÖ–ç7Vf–6–VçFR×6–çFöÖ2"6Æ74æÖSÒ'FW‡BÖ66VçB#ç6–çFöÖ2FRÖVÜ;7&–ÂôÆ–æ³âRÄÆ–æ²FóÒ"ö&Æörö6öÖòÖF–væ÷7F–6"×Æ6ÖÖRÖFVfV—GV÷6"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òFRÆ6ÖÜ:6SÂôÆ–æ³ââ6RòWV—ÖVçFò–æ–6–Ö2&æFVÆF$”õ2Âò66ò:’÷WG&òRW7L:FW67&—FòVÒÄÆ–æ²FóÒ"ö&Æörö6ö×WFF÷"ÖVçG&ÖF—&WFòÖæÖ&–÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6ö×WFF÷"VRVçG&F—&WFòæ$”õ3ÂôÆ–æ³âãÂ÷à ¢Æƒ#äæ÷FV&öö²6öÒFVÆvFÂöƒ#à¢ÇäVÒæ÷FV&öö²ÂòFW7FRWV—fÆVçFR:’Æ–v"VÒÖöæ—F÷"W‡FW&æòâ6R–ÖvVÒ&V6Rf÷&Rì:6òæò–æVÂ–çFW&æòÂò&ö&ÆVÖW7L:æFVÆÂæò6&òfÆB÷Ræ–ÇVÖ–æ:|:6ò(	BRì:6òæò&W7FçFRFòWV—ÖVçFòâW76R:’òÖöÖVçFòFRfÆ–"ÄÆ–æ²FóÒ"ö&Æörö6öÖò×G&ö6"×FVÆÖæ÷FV&öö²×76òÖ×76ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æG&ö6FFVÆÂôÆ–æ³â6öÒ\:v6ö×L:×fVÂãÂ÷à ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“ä6ö×&"Æ6FRl:ÖFVòçFW2FRFW7F"òÖöæ—F÷"VÒ÷WG&ò6ö×WFF÷"ãÂöÆ“à¢ÆÆ“äf÷,:v"6öæV7F÷"F÷'Fò÷RV×W'&"–æòFW6Æ–æ†FòãÂöÆ“à¢ÆÆ“äV×–Æ†"FFF÷&W2„„DÔ’&dt&Ed’’&&&÷fV—F""ò6&òçF–vòãÂöÆ“à¢ÆÆ“ä6öæ6ÇV—"VRòÖöæ—F÷"Ö÷'&WRVæFòVÆR–æFÖ÷7G&ò,;7&–òÖVçRãÂöÆ“à¢ÆÆ“ä'&—"òÖöæ—F÷#¢föçFR–çFW&æwV&F6&vÖW6ÖòFW6Æ–vFFFöÖFãÂöÆ“à¢ÆÆ“åG&ö6"\:v2VÒ6W\:¦æ6–6VÒæ÷F"òVR¬:fö’FW7FFòãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&R6R6VçF—"6†V—&òFRVV–ÖFòÂ6R†÷WfW"W7FÆòòÆ–v"Â6Ròv&–æWFRFW6Æ–v"6÷¦–æ†òGW&çFRòFW7FR÷R6RòÖöæ—F÷"&W6VçF"Öæ6†RG&–æ6æò–æVÂâFÖ,:–Ò&RVæFò2fW&–f–6:|;VW2FF&VÆFW&Ö–æ&VÒ6VÒ6öæ6ÇW<:6ó¢&WWF—"òÖW6ÖòFW7FRì:6òvW&–æf÷&Ö:|:6òæ÷fãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòæVæ‡VÖ6:ÖFFRl:ÖFVò&öGW¦—"–ÖvVÒÂVæFòòWV—ÖVçFòì:6ò6ö×ÆWF"–æ–6–Æ—¦:|:6ò÷RVæFò†÷WfW"7W7V—FFRfÆ†VÒÆ6ÖÜ:6R÷RföçFRâfÆ–:|:6ò6öÒ–ç7G'VÖVçFòR\:vFRFW7FRW7L:VÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³ã²ÖçWFVì:|:6òFò6öæ§VçFòÂVÒÄÆ–æ²FóÒ"÷6W'f–6÷2öÖçWFVæ6òÖFRÖ6ö×WFF÷""6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6òFR6ö×WFF÷#ÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&&FW&–ÖFRÖæ÷FV&öö²ÖæòÖ6'&VvÖò×VR×fW&–f–6"#¢°¢F—FÆS¢$&FW&–FRæ÷FV&öö²ì:6ò6'&Vv¢òVRfW&–f–6"çFW2FR6ö×&"÷WG&"À¢W†6W'C ¢%Â$6öæV7FFòÂì:6ò6'&VvæFõÂ"FVÒÖ—2FRVÖ6W6â6öÖò6W&"föçFRÂ6öæV7F÷"Â&FW&–VÒf–ÒFRf–FRÆ–Ö—FRFR6&v6öæf–wW&Fò(	B6VÒG&ö6"\:væòW67W&òâ"À¢FFS¢###bÓ’Ó2"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢$ÖçWFVì:|:6ò"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#ä&FW&–VRì:6ò6'&Vv:’VÒF÷2÷V6÷26–çFöÖ2VÒVR\:v7W6FV6RçVæ6:’;¦æ–67W7V—FâçFW2FR6ö×&"VÖ&FW&–æ÷fÂfÆR6&W"6RVÆ&VÆÖVçFR6†Vv÷Ròf–Ò÷R6Rò&ö&ÆVÖW7L:æVæW&v–VRFWfW&–6†Vv"L:’VÆãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çå6W&RG,:§26ö—63¢6Ròæ÷FV&öö²Æ–v6VÒ&FW&–†föçFRgVæ6–öææFò’Â6RòW&6VçGVÂ6ö&R6öÒò6'&VvF÷"6öæV7FFò†6&v6öçFV6VæFò’R6R66–FFRGVÂ–æF:’,;7†–ÖF÷&–v–æÂ†&FW&–6VL:fVÂ’âG&ö6<;26R§W7F–f–6VæFòföçFRW7L:&öR&FW&–W&FWR66–FFR÷R&÷RFR6W"&V6öæ†V6–FãÂ÷à ¢Æƒ#ä÷2VG&ò6Vì:&–÷2Ö—26ö×Vç3Âöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsâ$6öæV7FFòÂì:6ò6'&VvæFò"6öÒW&6VçGVÂW7L:fVÃ£Â÷7G&öæsâ×V—F2fW¦W2:’Æ–Ö—FRFR6&v6öæf–wW&FòVÆòf'&–6çFR&&W6W'f"&FW&–(	B6ö×÷'FÖVçFòæ÷&ÖÂÂì:6òFVfV—FòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåW&6VçGVÂ6’ÖW6Öò6öÒföçFRÆ–vF£Â÷7G&öæsâföçFRì:6òVçG&Vv÷L:¦æ6–7Vf–6–VçFR÷Rò6öçFFòW7L:–çFW&Ö—FVçFRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä&FW&–ì:6ò:’&V6öæ†V6–F£Â÷7G&öæsâ&V6R&&FW&–ì:6òFWFV7FF"÷Rò:Ö6öæR6öÖS²7W7V—FFR6öçFFò7V¦òÂ<:–ÇVÆFW6Æ–vF÷"&÷F\:|:6ò÷R6öçG&öÆF÷"6öÒfÆ†ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6'&VvL:’VÒfÆ÷"&—†òR&£Â÷7G&öæsâL:×–6òFR&FW&–VÒf–ÒFRf–FÂ6öÒ66–FFR&VÂ&VÒ&—†òFæöÖ–æÂãÂöÆ“à¢Â÷VÃà ¢Æƒ#å6W\:¦æ6–FRfW&–f–6:|:6óÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒä÷&FVÓÂ÷FƒãÇFƒåfW&–f–6:|:6óÂ÷FƒãÇFƒäÆV—GW&Fò&W7VÇFFóÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCãÂ÷FCãÇFCåG&ö6"FöÖFR6öæfW&—"6RòÄTBFò6'&VvF÷"6VæFSÂ÷FCãÇFCäVÆ–Ö–æW‡FVç<:6òÂf–ÇG&òRFöÖF6öÖò6W6Â÷FCãÂ÷G#à¢ÇG#ãÇFCã#Â÷FCãÇFCä6öæfW&—"6Rò6'&VvF÷":’ò÷&–v–æÂ÷RFVÒÖW6ÖFVç<:6òR6÷'&VçFSÂ÷FCãÇFCäföçFRFRÖVæ÷"÷L:¦æ6–öFRÖçFW"Æ–vFò6VÒ6'&Vv#Â÷FCãÂ÷G#à¢ÇG#ãÇFCã3Â÷FCãÇFCåfW&–f–6"ò6öæV7F÷"Rò6&òVÒFöFW‡FVç<:6óÂ÷FCãÇFCå&ö×–ÖVçFòW'FòFòÇVwVR:’fÆ†Ö—2g&WVVçFSÂ÷FCãÂ÷G#à¢ÇG#ãÇFCãCÂ÷FCãÇFCäÆ–v"òæ÷FV&öö²<;2æföçFRÂ6VÒ&FW&–‡VæFò&VÖ÷l:×fVÂ“Â÷FCãÇFCå6RgVæ6–öæÂÆ–ÖVçF:|:6òW‡FW&æW7L:&öÂ÷FCãÂ÷G#à¢ÇG#ãÇFCãSÂ÷FCãÇFCä6öç7VÇF"66–FFRGVÂæò&VÆL;7&–òFR&FW&–Fò6—7FVÖÂ÷FCãÇFCä6ö×&6&v&VÂ6öÒ66–FFRFRl:'&–6Â÷FCãÂ÷G#à¢ÇG#ãÇFCãcÂ÷FCãÇFCå&Wf—6"òÆ–Ö—FRFR6&væòWF–Æ—L:&–òFòf'&–6çFR÷Ræ6öæf–wW&:|:6òFRf—&×v&SÂ÷FCãÇFCäW‡Æ–6&FVÒcRÂƒR÷RfÆ÷"6VÖVÆ†çFSÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà¢Çäæ÷FRò&W7VÇFFòFR6FÆ–æ†âVÒFW7FRfV—FòæòÖV–òF6W\:¦æ6–Â6VÒ÷2çFW&–÷&W2Âì:6òVÆ–Ö–ææF(	B<;2G&ö6VÖ7W7V—F÷"÷WG&ãÂ÷à ¢Æƒ#äòVR:’FW6v7FRæ÷&ÖÃÂöƒ#à¢Çä&FW&–FR:ÖöâÖÌ:×F–òW&FR66–FFR6öÒòì;¦ÖW&òFR6–6Æ÷2R6öÒòFV×òÂÖW6ÖòVÒW6òÆWfRâWFöæöÖ–ÖVæ÷"6Fæò:’W7W&Fó²VVF''WFVÒ÷V626VÖæ2Âì:6òâò6–æÂFRFVì:|:6ò:’F–fW&Vì:vVçG&R66–FFRFR&ö¦WFòR66–FFRGVÂ&Vv—7G&FVÆò,;7&–ò6—7FVÖÂVR:’FFòÖVF–Fò(	Bì:6òW7F–ÖF—ff—7VÂãÂ÷à ¢Æƒ#ä6Æ÷"6VÆW&W&FÂöƒ#à¢ÇåG&&Æ†ò6öç7FçFRVÒFV×W&GW&ÇF&VGW¢f–F;§F–ÂF<:–ÇVÆR–æFFW''V&òFW6V×Væ†òFò&W7FçFRFòWV—ÖVçFòâ6Ròæ÷FV&öö²W7VVçF6öÒf6–Æ–FFRÂò6ö×æ†ÖVçFòW7L:VÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖÖöæ—F÷&"×FV×W&GW&ÖFòÖ6ö×WFF÷""6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòÖöæ—F÷&"FV×W&GW&ÂôÆ–æ³âÂò6–çFöÖVÒÄÆ–æ²FóÒ"ö&Æöröæ÷FV&öö²×7WW&VV6VæFòÖò×VRÖf¦W""6Æ74æÖSÒ'FW‡BÖ66VçB#ææ÷FV&öö²7WW&VV6VæFóÂôÆ–æ³âR&÷F–æ&WfVçF—fVÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖÆ–×"Öæ÷FV&öö²×÷"ÖFVçG&ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æÆ–×W¦–çFW&æÂôÆ–æ³âãÂ÷à ¢Æƒ#å6–æ—2VR×VFÒ&–÷&–FFSÂöƒ#à¢Çä&FW&–W7GVfF(	BFV6ÆFòÆWfçFFòÂF÷V6‡BG&fFòÂF×VRì:6òfV6†(	BFV—†FR6W"VW7L:6òFRWFöæöÖ–R766W"6VwW&ì:vâæW76R66òòWV—ÖVçFòì:6òFWfR6W"6'&VvFòæVÒG&ç7÷'FFòVÒÖö6†–ÆfV6†FL:’&VÖü:|:6òF<:–ÇVÆâòÖW6ÖòfÆR&6†V—&òFö6–6FòÂVV6–ÖVçFòÆö6Æ—¦Fòæ&6R÷RFVf÷&Ö:|:6òf—<:×fVÂãÂ÷à ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“ä6ö×&"&FW&–vVì:—&–66VÒ6öæfW&—"ÖöFVÆòÂFVç<:6òR66–FFRãÂöÆ“à¢ÆÆ“åW&gW&"ÂFö'&"÷R&W76–öæ"&FW&–W7GVfF&&6öÖöF""æ6&6:vãÂöÆ“à¢ÆÆ“äFV—†"6'&VvæFò6ö'&R6ÖÂ6öl:÷R7WW&l:Ö6–RVR&Æ÷VV–fVçF–Æ:|:6òãÂöÆ“à¢ÆÆ“äÖçFW"6'&VvF÷"Væ—fW'6ÂFR÷L:¦æ6–ÖVæ÷"6öÖò7V'7F—GWFòW&ÖæVçFRFò÷&–v–æÂãÂöÆ“à¢ÆÆ“äFW66'F"&FW&–çF–væòÆ—†ò6ö×VÒãÂöÆ“à¢ÆÆ“ä6öæ6ÇV—"VR&FW&–Ö÷'&WR6VÒçFW2fW&–f–6"föçFRRòÆ–Ö—FRFR6&vãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&R–ÖVF–FÖVçFRF–çFRFRW7GVfÖVçFòÂf¦ÖVçFòÂ6†V—&òf÷'FR÷RVV6–ÖVçFòæ÷&ÖÂ6öÒòWV—ÖVçFòö6–÷6òâ&RFÖ,:–Ò6Ròæ÷FV&öö²FW6Æ–v"6÷¦–æ†òGW&çFR6&v¢6VwV—"FW7FæFò6öÒ<:–ÇVÆ–ç7L:fVÂ:’&—66òÂì:6òF–vì;77F–6òãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòò6öæV7F÷"FRVæW&v–W7F—fW"6öÇFò÷R6öÒföÆvæÆ6ÂVæFò&FW&–ì:6òf÷"&V6öæ†V6–FÖW6Öò6öÒföçFR6ö×&÷fFÖVçFR&ö÷RVæFò†÷WfW"VÇVW"6–æÂl:×6–6òFRFæòæ<:–ÇVÆâfÆ–:|:6òW7L:VÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âRò6W'fœ:vòVÒÄÆ–æ²FóÒ"÷6W'f–6÷2öÖçWFVæ6òÖFRÖ6ö×WFF÷""6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6òFR6ö×WFF÷#ÂôÆ–æ³ââçFW2FRVÇVW"–çFW'fVì:|:6òVR'&òWV—ÖVçFòÂò7&—L:—&–òFR<;7–F÷2FF÷2W7L:VÒÄÆ–æ²FóÒ"öFV6—6öW2ö&6·WÖçFW2ÖFÖÖçWFVæ6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ&6·WçFW2FÖçWFVì:|:6óÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&6öÖòÖÖ–w&"Ö'V—f÷2×&×VÒÖ6ö×WFF÷"Öæ÷fò#¢°¢F—FÆS¢$6öÖòÖ–w&"'V—f÷2&VÒ6ö×WFF÷"æ÷fò6VÒW&FW"æF"À¢W†6W'C ¢$–çfVçL:&–òÂÜ:—FöFòFRG&ç6fW,:¦æ6–Â6öæfW,:¦æ6–R<;2VçL:6òòFW66'FRFòWV—ÖVçFòçF–vòâò&÷FV—&òVRWf—FFW66ö&W'FF&F–FRVRfÇF÷RÆwVÖ6ö—6â"À¢FFS¢###bÓ’Ó2"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢%&ö6VF–ÖVçF÷2L:–6æ–6÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#äW&FFR'V—fòæG&ö6FR6ö×WFF÷"&&ÖVçFR6öçFV6Ræ<;7–â6öçFV6RçFW2Âæò–çfVçL:&–ò–æ6ö×ÆWFòÂRFWö—2ÂVæFòòWV—ÖVçFòçF–vò:’f÷&ÖFFò÷RfVæF–Fò6VÒVRæ–æw\:–ÒFVæ†6öæfW&–FòòVR&VÆÖVçFRfö’&òæ÷fòãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢ÇäÆ—7FRòVR&V6—6—"Â6÷–R÷"VÒ6Ö–æ†ò<;2Â6öæf—&'V—fò÷"7F6ö×&æFòVçF–FFRRFÖæ†òÂW6Rò6ö×WFF÷"æ÷fò÷"ÆwVç2F–26öÒòçF–vò–æF–çF7FòR<;2VçL:6òwVRÜ:V–æçFW&–÷"âÖ–w&:|:6òì:6òFW&Ö–ææ<;7–¢FW&Ö–ææ6öæfW,:¦æ6–ãÂ÷à ¢Æƒ#äò–çfVçL:&–òVRV6R6V×&RfÇFÂöƒ#à¢ÇVÃà¢ÆÆ“å7F2f÷&FRFö7VÖVçF÷3¢:&VFRG&&Æ†òÂF÷væÆöG2R7F27&–F2æ&—¢FòF—66òãÂöÆ“à¢ÆÆ“ä'V—f÷2FR&öw&Ö2W7V<:Öf–6÷3¢ÖöFVÆ÷2ÂÆæ–Æ†2FR6öæf–wW&:|:6òÂ&æ6÷2Æö6—2FR6—7FVÖ2FRvW7L:6òãÂöÆ“à¢ÆÆ“äRÖÖ–Ç2wV&FF÷2Æö6ÆÖVçFRÂVæFòò&öw&Öì:6òW6<;7–æò6W'f–F÷"ãÂöÆ“à¢ÆÆ“äff÷&—F÷2Â6Væ†26Çf2æòæfVvF÷"RW&f—2FRÆ–6F—f÷2ãÂöÆ“à¢ÆÆ“äÆ–6Vì:v2Â6†fW2FRF—f:|:6òR–ç7FÆF÷&W2VRì:6òW7L:6òÖ—2F—7öì:×fV—2&F÷væÆöBãÂöÆ“à¢ÆÆ“äf÷F÷2Rl:ÖFV÷2VÒ6'L;VW2Â6VÇVÆ&W2RF—66÷2W‡FW&æ÷2VR÷&&—FÒòÖW6Öò6ö×WFF÷"ãÂöÆ“à¢Â÷VÃà¢ÇäW67&WfW76Æ—7FçFW2FR6öÖ\:v"âVÆ:’ò7&—L:—&–òFR6öæfW,:¦æ6–æòf–Ò(	B6VÒVÆÂ&6†òVRfV–òGVFò":’;¦æ–6&W7÷7F÷7<:×fVÂãÂ÷à ¢Æƒ#äÜ:—FöF÷2RVæFò6FVÒ6W'fSÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒäÜ:—FöFóÂ÷FƒãÇFƒå6W'fR&VÒVæFóÂ÷FƒãÇFƒäÆ–Ö—FSÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCäF—66òW‡FW&æò÷RVæG&—fSÂ÷FCãÇFCåföÇVÖRÖöFW&FòR6VÒ&VFR6öæfœ:fVÂVçG&R2Ü:V–æ3Â÷FCãÇFCäFWVæFRFRW7:vòÆ—g&RRFRÜ:ÖF–VÒ&öÒW7FFóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCå&VFRÆö6Â‡7F6ö×'F–Æ†F“Â÷FCãÇFCä÷2Fö—26ö×WFF÷&W2f–6ÒæòÖW6ÖòÆö6ÂRÆ–vF÷3Â÷FCãÇFCåfVÆö6–FFR6’×V—FòVÒv’Ôf’g&6óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäçWfVÓÂ÷FCãÇFCå÷V6÷2v–v'—FW2RæV6W76–FFRFR6W76ò–ÖVF–Fòæòæ÷fòWV—ÖVçFóÂ÷FCãÇFCåWÆöBÆöævòRÆ–Ö—FRFRW7:vòFòÆæóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäÆ–v"òF—66òçF–vòF—&WFòæò6ö×WFF÷"æ÷fóÂ÷FCãÇFCäòWV—ÖVçFòçF–vòì:6òÆ–vÖ—2ÂÖ2òF—66òW7L::ÖçFVw&óÂ÷FCãÇFCäW†–vR'&—"Ü:V–æ÷RW6"vfWF6ö×L:×fVÃÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà¢ÇäW66öÆ†W"VÒ6Ö–æ†òRÖçL:¢ÖÆòWf—Fò–÷"6Vì:&–òFÖ–w&:|:6ó¢ÖWFFRF÷2'V—f÷2VÒVÒVæG&—fRÂÖWFFRæçWfVÒRæVæ‡VÖÆ—7FFòVRW7L:öæFRâ6RòF—66òçF–vò&W6VçF"ÆVçF–L:6òW‡G&VÖ÷R'\:ÖFòGW&çFR<;7–Âò77VçFò766W"ÄÆ–æ²FóÒ"ö&ÆöröF—66òÖ6öÒ×6WF÷&W2ÖFVfV—GV÷6÷2×6Ö'BÖò×VRÖf¦W""6Æ74æÖSÒ'FW‡BÖ66VçB#æF—66ò6öÒ6WF÷&W2FVfV—GV÷6÷3ÂôÆ–æ³âãÂ÷à ¢Æƒ#ä6öæfW,:¦æ6–çFW2FòFW66'FSÂöƒ#à¢Çä6ö×&RÂ7F7FÂVçF–FFRFR—FVç2RòFÖæ†òF÷FÂVçG&R÷&–vVÒRFW7F–æòâ'&ÆwVç2'V—f÷2w&æFW2RÆwVç2çF–v÷2(	B6÷''W:|:6ò6–ÆVæ6–÷66÷7GVÖ&V6W"§W7FÖVçFRæVÆW2â<;2FWö—2F—76òò6ö×WFF÷"çF–vòöFR6W"f÷&ÖFFòÂFöFò÷RfVæF–FòâÖçFW"Ü:V–æçF–v–çF7F÷"VÖ÷RGV26VÖæ27W7FæFR&W6öÇfRòW7VV6–ÖVçFòF&F–òãÂ÷à ¢Æƒ#ä<;7–FÖ–w&:|:6òì:6ò:’ò&6·WÂöƒ#à¢ÇåFW&Ö–æFG&ç6fW,:¦æ6–Âò6ö×WFF÷"æ÷fòf–66öÒVÖ<;7–;¦æ–6F÷2FF÷2(	BW†FÖVçFR6—GV:|:6òVR&÷F–æFR&6·WW†—7FR&Wf—F"âò76ò6VwV–çFR:’6öæf–wW&"fW'<;VW2Æö6—2ÂFW67&—FòVÒÄÆ–æ²FóÒ"ö&Æörö†—7F÷&–6òÖFRÖ'V—f÷2×v–æF÷w2Ö6öÖòÖ6öæf–wW&""6Æ74æÖSÒ'FW‡BÖ66VçB#ä†—7L;7&–6òFR'V—f÷2Fòv–æF÷w3ÂôÆ–æ³âÂRfW&–f–6"ò&W7VÇFFò6öæf÷&ÖRÄÆ–æ²FóÒ"ö&Æörö6öÖò×FW7F"×&W7FW&6òÖFRÖ&6·W"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòFW7F"6Rò&6·W&VÆÖVçFRgVæ6–öæÂôÆ–æ³ââW66öÆ†FòFW7F–æòW7L:VÒÄÆ–æ²FóÒ"öFV6—6öW2öçWfVÒÖ÷RÖ†BÖW‡FW&æò"6Æ74æÖSÒ'FW‡BÖ66VçB#æçWfVÒ÷R„BW‡FW&æóÂôÆ–æ³âãÂ÷à ¢Æƒ#äçFW2FR&W76"òWV—ÖVçFòçF–vóÂöƒ#à¢Çäv"'V—f÷2RW7f¦–"Æ—†V—&ì:6ò&VÖ÷fRò6öçF\;¦FòFòF—66òâ&Fö:|:6ò÷RfVæFÂò&ö6VF–ÖVçFò6÷'&WFò:’Æ–×W¦6ö×ÆWFFVæ–FFRÂRì:6òW†6ÇW<:6òÖçVÂF27F2â&Ü:V–æ2VR6W,:6ò&V&÷fV—FF2æ66÷RæòW67&—L;7&–òÂò6Ö–æ†òFR&V–ç7FÆ:|:6ò&W6W'fæFòFF÷2W7L:VÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖf÷&ÖF"×2×6VÒ×W&FW"Ö'V—f÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòf÷&ÖF"ò26VÒW&FW"'V—f÷3ÂôÆ–æ³âãÂ÷à ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“äf÷&ÖF"ò6ö×WFF÷"çF–vòçFW2FR6öæfW&—"GVFòòVRfö’6÷–FòãÂöÆ“à¢ÆÆ“ä6öæf–"VÒ&6÷–"R6öÆ""6VÒ6öæfW&—"VçF–FFRRFÖæ†òæòFW7F–æòãÂöÆ“à¢ÆÆ“åW6"VæG&—fRçF–vòR6VÒW7:vò6öÖòÜ:ÖF–;¦æ–6FRG&ç6fW,:¦æ6–ãÂöÆ“à¢ÆÆ“äW7VV6W"W&f—2FRRÖÖ–ÂÂff÷&—F÷2RÆ–6Vì:v2÷"fö6"<;2VÒFö7VÖVçF÷2ãÂöÆ“à¢ÆÆ“ä–çFW'&ö×W"<;7–æÖWFFRR&V6öÖ\:v"÷"÷WG&ò6Ö–æ†òãÂöÆ“à¢ÆÆ“åfVæFW"÷RFö"òWV—ÖVçFò6VÒÆ–×W¦6ö×ÆWFFVæ–FFRãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&R6R<;7–7W6"W'&òFRÆV—GW&&WWF–FòÂ6RòF—66òFR÷&–vVÒVÖ—F—"'\:ÖFò–æ6ö×VÒ÷R6Rò6—7FVÖVF—"f÷&ÖF:|:6òFÜ:ÖF–â–ç6—7F—"VÒ6÷–"FRVÒF—66ò6öÒfÆ†&VGW¢6†æ6RFR&V7WW&:|:6ò÷7FW&–÷"ãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòò6ö×WFF÷"çF–vòì:6òÆ–v"Ö—2ÂVæFò†÷WfW"W'&òFRÆV—GW&VÒ'V—f÷2–×÷'FçFW2÷RVæFòÖ–w&:|:6òVçföÇfW"6—7FVÖ2FRG&&Æ†òÂRÖÖ–Ç2Æö6—2Rl:&–÷2WV—ÖVçF÷2âFVçFF—fVÒF—66ò6öÒfÆ†W7L:FW67&—FVÒÄÆ–æ²FóÒ"ö&Æörö6öÖò×&V7WW&"ÖFF÷2Ö†BÖ6öÒÖFVfV—Fò"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&V7WW&:|:6òFRFF÷2VÒ„B6öÒFVfV—FóÂôÆ–æ³âRò6W'fœ:vòVÒÄÆ–æ²FóÒ"÷6W'f–6÷2÷&V7WW&6òÖFRÖFF÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&V7WW&:|:6òFRFF÷3ÂôÆ–æ³ââ&Ö&–VçFR6öÒWV—RÂòFW6Fö'&ÖVçFò:’ÄÆ–æ²FóÒ"÷6W'f–6÷2ö&6·W×&ÖV×&W62"6Æ74æÖSÒ'FW‡BÖ66VçB#æ&6·W&V×&W63ÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢'FV6ÆFòÖFRÖæ÷FV&öö²ÖæòÖgVæ6–öæÖò×VR×fW&–f–6"#¢°¢F—FÆS¢%FV6ÆFòFRæ÷FV&öö²ì:6ògVæ6–öæ¢òVRfW&–f–6"çFW2FRG&ö6""À¢W†6W'C ¢%FV6Æ2Ö÷'F2ÂFV6ÆFò–çFV—&ò&Fò÷R6&7FW&W2G&ö6F÷2<:6ò&ö&ÆVÖ2F–fW&VçFW2â6öÖò6W&"7V¦V—&Â6öæf–wW&:|:6òÂ6&òfÆBRFæò÷"Ì:×V–FòçFW2FR6ö×&"\:vâ"À¢FFS¢###bÓ’Ó2"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢$F–vì;77F–6ò"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#â$òFV6ÆFò&÷R"FW67&WfRVÆòÖVæ÷2VG&ò6—GV:|;VW2F—7F–çF2ÂR6FVÖÆWfVÒ6Ö–æ†òF–fW&VçFRâG&ö6"òFV6ÆFò6VÒ6W,:ÖÆ2:’f÷&ÖÖ—26&FRFW66ö'&—"VRò&ö&ÆVÖW&6öæf–wW&:|:6òFR–F–öÖ÷RVÒ6öæV7F÷"6öÇFòãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢ÇäÆ–wVRVÒFV6ÆFòU4"W‡FW&æòâ6RVÆRgVæ6–öæÂò&W7FçFRFò6ö×WFF÷"W7L:&VÒR–çfW7F–v:|:6òf–6&W7G&—FòFV6ÆFò–çFW&æòÂò6&òfÆBR:7V¦V—&â6RæVÒòW‡FW&æò&W7öæFRÂò77VçFòFV—†FR6W"FV6ÆFòR766W"6—7FVÖÂ÷'F÷R–æ–6–Æ—¦:|:6òãÂ÷à ¢Æƒ#åVG&ò6–çFöÖ2ÂVG&ò6W62&÷l:fV—3Âöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsåFV6ÆFò–çFV—&ò6VÒ&W7÷7F£Â÷7G&öæsâ6öæV7F÷"fÆB6öÇFòÂ6&òFæ–f–6Fò÷RfÆ†;72&W'GW&&V6VçFRFòWV—ÖVçFòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäÆwVÖ2FV6Æ2ì:6ò&W7öæFVÓ£Â÷7G&öæsâ7V¦V—&6ö"ÖVÖ'&æÂ&W<:ÖGVòFRÌ:×V–Fò÷RG&–Æ†–çFW'&ö×–FVÒVÖÆ–æ†W7V<:Öf–6ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä6&7FW&W26VÒG&ö6F÷3£Â÷7G&öæsâÆ–÷WBFRFV6ÆFòW'&Fòæò6—7FVÖ(	BæFFR†&Gv&Râ6VçFòwVFòf—&æFò72:’ò66ò6Ì:76–6òFR$åC"6öæf–wW&Fò6öÖò–çFW&æ6–öæÂãÂöÆ“à¢ÆÆ“ãÇ7G&öæsåFV6Æ2&WWFVÒ6÷¦–æ†2÷RG&fÓ£Â÷7G&öæsâÖVÖ'&æ&W76–öæFÂ6†76’V×VæFò÷RFV6Æ&W6÷"&W<:ÖGVòãÂöÆ“à¢Â÷VÃà¢Çäæ÷F"VÂF÷2VG&ò:’ò6WRWf—FW&6÷'&W"FW7FW2VRì:6òL:¦Ò&VÆ:|:6ò6öÒò6–çFöÖãÂ÷à ¢Æƒ#ä6W\:¦æ6–FRfW&–f–6:|:6óÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒä÷&FVÓÂ÷FƒãÇFƒåfW&–f–6:|:6óÂ÷FƒãÇFƒäòVRVÆVÆ–Ö–æÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCãÂ÷FCãÇFCä6öæV7F"VÒFV6ÆFòU4"RF–v—F#Â÷FCãÇFCäfÆ†Fò6—7FVÖÂFòW7\:&–òÆövFò÷RF–æ–6–Æ—¦:|:6óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCã#Â÷FCãÇFCåFW7F"2ÖW6Ö2FV6Æ2æFVÆFR6Væ†Fò6—7FVÖÂ÷FCãÇFCå&öw&Ö&W'FòG&fFò÷RW&f–Â6öÒ6öæf–wW&:|:6ò,;7&–Â÷FCãÂ÷G#à¢ÇG#ãÇFCã3Â÷FCãÇFCä6öæfW&—"òÆ–÷WBFRFV6ÆFò6öæf–wW&FóÂ÷FCãÇFCä6&7FW&W2G&ö6F÷26VÒFVfV—Fòl:×6–6óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCãCÂ÷FCãÇFCåfW&–f–6"FV6Æ2FR&Æ÷VV–òçVÜ:—&–6òRgVì:|:6ò„fâ“Â÷FCãÇFCä&Æö6òçVÜ:—&–6ò6ö'&W÷7Fò:2ÆWG&2VÒFV6ÆFò6ö×7FóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCãSÂ÷FCãÇFCäFW6Æ–v"Â&VÖ÷fW"Æ–ÖVçF:|:6òR&V–æ–6–"6VÒW&–l:—&–6÷3Â÷FCãÇFCäW7FFòG&fFòFò6öçG&öÆF÷"FRVçG&FÂ÷FCãÂ÷G#à¢ÇG#ãÇFCãcÂ÷FCãÇFCäö'6W'f"6RòFV6ÆFò&W7öæFRçFW2Fò6—7FVÖ6'&Vv"‡FVÆF$”õ2“Â÷FCãÇFCäG&—fW"÷R6—7FVÖ(	B6R&W7öæFRÆ’Âò†&Gv&RW7L:f—fóÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà¢Çå6RòFV6ÆFògVæ6–öææFVÆF$”õ2RfÆ†FWö—2Âò&ö&ÆVÖ:’FR6ögGv&Râ6Rì:6ògVæ6–öæVÒÇVv"æVæ‡VÒRòW‡FW&æògVæ6–öæÂ:’òFV6ÆFò–çFW&æò÷Rò6&òFVÆRãÂ÷à ¢Æƒ#åVæFò†÷WfRÌ:×V–FóÂöƒ#à¢ÇäÌ:×V–FòFW'&ÖFòW†–vR6öæGWFF–fW&VçFRFò&W7FçFS¢FW6Æ–wVR–ÖVF–FÖVçFRÂFW66öæV7FRföçFRÂì:6òFVçFR6V6"6öÒ6V6F÷"VVçFRRì:6òÆ–wVR'<;2&FW7F""âW&|:¦æ6–ì:6ò:’òFV6ÆFò(	B:’–×VF—"VRòÌ:×V–FòÆ6æ6RÆ6&–æ6—ÂâæW76W266÷2Â&W'GW&&6V6vVÒRÆ–×W¦FWfR6W"fV—FòVçFòçFW2ÂRò7W7FòFRW7W&"6÷7GVÖ6W"&VÒÖ–÷"VRòFRVÖ\:vãÂ÷à ¢Æƒ#å7V¦V—&ÂöV—&RW6óÂöƒ#à¢ÇåFV6ÆFòVRfÆ†÷2÷V6÷2ÂVÒFV6Æ2W7V<:Öf–62RW6F26öÒg&W\:¦æ6–Â6÷7GVÖ7V×VÆ"&W<:ÖGVò6ö"ÖVÖ'&æâÆ–×W¦–çFW&æFòWV—ÖVçFòÂFW67&—FVÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖÆ–×"Öæ÷FV&öö²×÷"ÖFVçG&ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòÆ–×"òæ÷FV&öö²÷"FVçG&óÂôÆ–æ³âÂ&W6öÇfR'FRF÷266÷2Rf¢'FRFÄÆ–æ²FóÒ"ö&ÆöröÖçWFVæ6ò×&WfVçF—fÖFRÖ6ö×WFF÷"ÖwV–Ö6ö×ÆWFò"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&÷F–æFRÖçWFVì:|:6ò&WfVçF—fÂôÆ–æ³ââòVRì:6ò&W6öÇfR:’òFV6ÆFò6öÒG&–Æ†&ö×–F¢æVÆRÂ\:v&V6—66W"7V'7F—G\:ÖFãÂ÷à ¢Æƒ#åVæFòòFV6ÆFòW‡FW&æòFÖ,:–Òì:6ò&W7öæFSÂöƒ#à¢Çä:Òò&ö&ÆVÖFV—†÷RFR6W"òFV6ÆFòâfÆRfW&–f–6"6R÷'F&V6öæ†V6R÷WG&÷2F—7÷6—F—f÷2Â6Ö–æ†òFW67&—FòVÒÄÆ–æ²FóÒ"ö&ÆöröF—7÷6—F—fò×W6"Öæò×&V6öæ†V6–FòÖò×VRÖf¦W""6Æ74æÖSÒ'FW‡BÖ66VçB#æF—7÷6—F—fòU4"ì:6ò&V6öæ†V6–FóÂôÆ–æ³âÂR6RòWV—ÖVçFò&VÆÖVçFR6öæ6ÇV—R–æ–6–Æ—¦:|:6òÂ6öæf÷&ÖRÄÆ–æ²FóÒ"ö&Æöröæ÷FV&öö²ÖæòÖÆ–vÖò×VRÖf¦W""6Æ74æÖSÒ'FW‡BÖ66VçB#ææ÷FV&öö²VRì:6òÆ–vÂôÆ–æ³ââFV6ÆFòÖ÷'FòVÒ6öæ§VçFò6öÒF÷V6‡BÖ÷'FòöçF&ò6öçG&öÆF÷"FRVçG&FÂì:6ò&GV2\:v2VRfÆ†&ÒòÖW6ÖòFV×òãÂ÷à ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“ä6ö×&"FV6ÆFòæ÷fòçFW2FRFW7F"VÒFV6ÆFòU4"W‡FW&æòãÂöÆ“à¢ÆÆ“äÆf"òFV6ÆFò÷RÆ–6"Ì:×V–FòFRÆ–×W¦F—&WFòæ2FV6Æ2ãÂöÆ“à¢ÆÆ“ä'&æ6"FV6Æ26öÒf÷,:v&&Æ–×"VÖ&—†ò"(	Bò6Æ—RÌ:7F–6òVV'&ãÂöÆ“à¢ÆÆ“äÆ–v"òWV—ÖVçFòÆövò;72FW'&ÖÖVçFòFRÌ:×V–FòãÂöÆ“à¢ÆÆ“å&V–ç7FÆ"ò6—7FVÖ÷"6W6FR6&7FW&W2G&ö6F÷2ãÂöÆ“à¢ÆÆ“äf÷,:v"ò6&òfÆBæò6öæV7F÷#¢VÆRVçG&6VÒ&W6—7L:¦æ6–VæFòÆ–æ†FòãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&R6R†÷WfW"6†V—&òFRVV–ÖFòÂ6RòWV—ÖVçFòVV6W"FRf÷&Öæ÷&ÖÂÂ6R†÷WfW"÷†–F:|:6òf—<:×fVÂ÷R6RòFV6ÆFòF—fW"&V6V&–FòÌ:×V–Fòâ&RFÖ,:–ÒVæFò&W'GW&W†–v—"FW6ÖöçFvVÒ6ö×ÆWFFò6†76“¢&WF—&"FW¦Væ2FR&gW6÷26VÒ&VfW,:¦æ6–6÷7GVÖ7&–"VÒ6VwVæFò&ö&ÆVÖãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòòFV6ÆFò–çFW&æòW7F—fW"6öæf—&ÖFò6öÖòÖ÷'FòÂVæFò†÷WfW"6öçFFò6öÒÌ:×V–Fò÷RVæFòFV6ÆFòRF÷V6‡BfÆ†&VÒ§VçF÷2âfÆ–:|:6ò6öÒ\:vFRFW7FRW7L:VÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³ã²7V'7F—GVœ:|:6òRÆ–×W¦–çFW&æÂVÒÄÆ–æ²FóÒ"÷6W'f–6÷2öÖçWFVæ6òÖFRÖæ÷FV&öö²"6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6òFRæ÷FV&öö³ÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&6ö×WFF÷"ÖFW6Æ–v×6÷¦–æ†òÖò×VR×fW&–f–6"#¢°¢F—FÆS¢$6ö×WFF÷"FW6Æ–v6÷¦–æ†ó¢òVRfW&–f–6"çFW2FRG&ö6"\:v"À¢W†6W'C ¢$FW6Æ–vÖVçFò&WVçF–æòFVÒ6W62&VÒF—7F–çF3¢FV×W&GW&ÂföçFRÂVæW&v–VÌ:—G&–6RÖVÜ;7&–â6öÖò–FVçF–f–6"VÂFVÆ2:’7V6VÒ6—"G&ö6æFò6ö×öæVçFW2â"À¢FFS¢###bÓ’Ó2"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢$F–vì;77F–6ò"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#åVÒ6ö×WFF÷"VRFW6Æ–v6÷¦–æ†òÂ6VÒf—6òR6VÒFVÆFRW'&òÂW7L:6VæFò–çFW'&ö×–Fò(	Bì:6òW7L:G&fæFòâW76F–fW&Vì:v–×÷'F¢G&fÖVçFòöçF&6ögGv&RÂ6÷'FR–ÖVF–FòFRVæW&v–öçF&&÷F\:|:6òL:—&Ö–6ÂÆ–ÖVçF:|:6ò÷R–ç7F&–Æ–FFRVÌ:—G&–6ãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çäö'6W'fRÆVÓçVæFóÂöVÓâòFW6Æ–vÖVçFò6öçFV6Râ6ö"W6f÷,:vò†¦övòÂVFœ:|:6òÂW‡÷'F:|:6ò’7VvW&RFV×W&GW&÷RföçFRæòÆ–Ö—FRâÆVF÷&–ÖVçFRÂ–æ6ÇW6—fR&FòÂ7VvW&RÆ–ÖVçF:|:6òVÌ:—G&–6÷R6öçFFòâ÷V6÷26VwVæF÷2FWö—2FRÆ–v"7VvW&R&÷F\:|:6òFò6—7FVÖâòG,:6òFV×÷&Â&VGW¢Æ—7FFR7W7V—F÷2çFW2FRVÇVW"FW7FRãÂ÷à ¢Æƒ#äòG,:6òF—¢Ö—2VRò6–çFöÖÂöƒ#à¢ÇVÃà¢ÆÆ“ãÇ7G&öæsäFW6Æ–v6V×&R6ö"6&v£Â÷7G&öæsâF—76—:|:6ò–ç7Vf–6–VçFR÷RföçFR6VÒföÆv&ò–6òFR6öç7VÖòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFW6Æ–vVÒ†÷,:&–÷2R6—GV:|;VW2ÆVL;7&–3£Â÷7G&öæsâ÷66–Æ:|:6òæ&VFRVÌ:—G&–6Â6&òFRf÷,:vÖÂVæ6—†Fò÷R,:–wV6ö'&V6'&VvFãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFW6Æ–vR&VÆ–v6÷¦–æ†ó£Â÷7G&öæsâ6öæf–wW&:|:6òFR&V–ì:Ö6–òWFöÜ:F–6ò;72fÆ†ÂvW&ÆÖVçFRW66öæFVæFòVÒW'&òFR6—7FVÖãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFW6Æ–v6öÒFVÆ§VÂçFW3£Â÷7G&öæsâì:6ò:’W7FR'F–vò(	Bò<;6F–vòFR&FöçF6W6Â6öæf÷&ÖRÄÆ–æ²FóÒ"ö&Æörö6öF–v÷2ÖFRÖW'&ò×FVÆÖ§VÂ×v–æF÷w2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ<;6F–v÷2FRW'&òFRFVÆ§VÃÂôÆ–æ³âãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäFW6Æ–vÆövò;72Æ–v"Â6VÒ6†Vv"ò6—7FVÖ£Â÷7G&öæsâ7W7V—FFR7W'FòÂÖVÜ;7&–ÖÂVæ6—†F÷R&÷F\:|:6òFföçFRãÂöÆ“à¢Â÷VÃà ¢Æƒ#åFV×W&GW&¢ò7W7V—FòÖ—26ö×VÓÂöƒ#à¢Çä&÷F\:|:6òL:—&Ö–66÷'FVæW&v–§W7FÖVçFR&Wf—F"FæòW&ÖæVçFRâVæFòòFW6Æ–vÖVçFò6öçFV6RÖ–çWF÷2FWö—2FòW6f÷,:vò6öÖ\:v"ÂRòWV—ÖVçFò<;2föÇFgVæ6–öæ"FWö—2FRW6g&–"ÂòF–vì;77F–6ò:’&F–6ÖVçFRW76Râò6Ö–æ†ò:’ÖVF—"çFW2FRv—#¢ÄÆ–æ²FóÒ"ö&Æörö6öÖòÖÖöæ—F÷&"×FV×W&GW&ÖFòÖ6ö×WFF÷""6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòÖöæ—F÷&"FV×W&GW&Fò6ö×WFF÷#ÂôÆ–æ³âÖ÷7G&6öÖò6ö×&"ÆV—GW&2VÒFF2F–fW&VçFW2âVÒæ÷FV&öö²Â÷2FW6Fö'&ÖVçF÷2W7L:6òVÒÄÆ–æ²FóÒ"ö&Æöröæ÷FV&öö²×7WW&VV6VæFòÖò×VRÖf¦W""6Æ74æÖSÒ'FW‡BÖ66VçB#ææ÷FV&öö²7WW&VV6VæFóÂôÆ–æ³âÂÄÆ–æ²FóÒ"ö&Æörö6öÖòÖÆ–×"Öæ÷FV&öö²×÷"ÖFVçG&ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æÆ–×W¦–çFW&æÂôÆ–æ³âRÄÆ–æ²FóÒ"ö&Æörö6öÖò×G&ö6"×7F×FW&Ö–6Öæ÷FV&öö²"6Æ74æÖSÒ'FW‡BÖ66VçB#çG&ö6FR7FL:—&Ö–6ÂôÆ–æ³âãÂ÷à ¢Æƒ#äföçFRRVæW&v–VÌ:—G&–6Âöƒ#à¢ÇäföçFRVÒf–ÒFRf–FVçG&VvFVç<:6ò–ç7L:fVÂW†FÖVçFRVæFòò6öç7VÖò6ö&RâòFW7FRFR&æ6FR÷26–æ—2FRfÆ†W7L:6òVÒÄÆ–æ²FóÒ"ö&Æörö6öÖò×FW7F"ÖföçFRÖFRÖÆ–ÖVçF6ò×2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòFW7F"föçFRFRÆ–ÖVçF:|:6óÂôÆ–æ³ââçFW2F—76òÂVÆ–Ö–æRòÖ—2&&Fó¢FöÖFF–fW&VçFRÂ6VÒW‡FVç<:6òR6VÒ,:–wV6ö×'F–Æ†F6öÒWV—ÖVçF÷2FRÇFò6öç7VÖòâVVF'&WfRæ&VFRVÌ:—G&–6FW''V&ò6ö×WFF÷"6VÒFV—†"&Vv—7G&òæVæ‡VÒæò6—7FVÖãÂ÷à ¢Æƒ#ä6W\:¦æ6–FRfW&–f–6:|:6óÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒä÷&FVÓÂ÷FƒãÇFƒåfW&–f–6:|:6óÂ÷FƒãÇFƒäòVRVÆVÆ–Ö–æÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCãÂ÷FCãÇFCäæ÷F"FFÂ†÷&RòVRW7FfVÒW6ò6FFW6Æ–vÖVçFóÂ÷FCãÇFCä–×&W7<:6ò7V&¦WF—fFR&ÆVL;7&–ò#Â÷FCãÂ÷G#à¢ÇG#ãÇFCã#Â÷FCãÇFCäÆ–v"F—&WFòæFöÖFÂ6VÒ,:–wVæVÒW‡FVç<:6óÂ÷FCãÇFCä6öçFFò'V–ÒR6ö'&V6&vFòöçFòVÌ:—G&–6óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCã3Â÷FCãÇFCäÖVF—"FV×W&GW&VÒ&W÷W6òR6ö"W6f÷,:vóÂ÷FCãÇFCå&÷F\:|:6òL:—&Ö–6Â÷FCãÂ÷G#à¢ÇG#ãÇFCãCÂ÷FCãÇFCäÆ–×"VçG&F2R6:ÖF2FR"ö'7G'\:ÖF3Â÷FCãÇFCäF—76—:|:6ò&VGW¦–F÷"öV—&Â÷FCãÂ÷G#à¢ÇG#ãÇFCãSÂ÷FCãÇFCåFW7F"ÖVÜ;7&–6öÒfW'&ÖVçFFVF–6FÂ÷FCãÇFCäÜ;6GVÆò–ç7L:fVÂ6W6æFò&F''WFÂ÷FCãÂ÷G#à¢ÇG#ãÇFCãcÂ÷FCãÇFCäö'6W'f"6RòFW6Æ–vÖVçFòW'6—7FR6öÒòÜ:Öæ–ÖòFRW&–l:—&–6÷26öæV7FF÷3Â÷FCãÇFCäF—7÷6—F—fòW‡FW&æòW†æFò6÷'&VçFRFVÖ—3Â÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà¢ÇäòFW7FRFRÖVÜ;7&–6—FFòæò—FVÒRW7L:FWFÆ†FòVÒÄÆ–æ²FóÒ"ö&Æör÷FW7F"ÖÖVÖ÷&–×&ÒÖÖV×FW7Cƒb"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòFW7F"ÖVÜ;7&–$ÓÂôÆ–æ³ââVÆR:’ÆVçFòÂÖ2:’ò;¦æ–6òVRL:&W7÷7Fö&¦WF—f6ö'&RòÜ;6GVÆòãÂ÷à ¢Æƒ#åVæFòò&Vv—7G&òFò6—7FVÖ§VFÂöƒ#à¢ÇäFW6Æ–vÖVçFò÷"6÷'FRFRVæW&v–6÷7GVÖ&V6W"æòf—7VÆ—¦F÷"FRWfVçF÷26öÖòVæ6W'&ÖVçFò–æW7W&FòÂ6VÒW'&òçFW&–÷"â¬:VÒFW6Æ–vÖVçFò&V6VF–FòFRfÆ†7,:×F–6–æF–6&ö&ÆVÖFRG&—fW"÷R6—7FVÖÂRò&7G&òW7L:æò<;6F–vò&Vv—7G&FòâW<:¦æ6–F÷FÂFR&Vv—7G&ò&Vf÷,:v†—;7FW6RVÌ:—G&–6¢ò6ö×WFF÷"ì:6òFWfRFV×òFRW67&WfW"æFãÂ÷à ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“åG&ö6"föçFR÷"VÖÖ—2÷FVçFR6VÒ6öæf—&Ö"VRò&ö&ÆVÖ:’FRÆ–ÖVçF:|:6òãÂöÆ“à¢ÆÆ“äÆ–6"7FL:—&Ö–66VÒçFW2ÖVF—"FV×W&GW&RfW&–f–6"öV—&ãÂöÆ“à¢ÆÆ“äFW6F—f"&÷F\:|:6òL:—&Ö–6÷RòFW6Æ–vÖVçFòWFöÜ:F–6òæ26öæf–wW&:|;VW2ãÂöÆ“à¢ÆÆ“ä–ç6—7F—"VÒW6"òWV—ÖVçFòVRFW6Æ–v6ö"6&v¢6F6–6Æò''WFò67F–vòF—66òãÂöÆ“à¢ÆÆ“å&V–ç7FÆ"ò6—7FVÖ&&W6öÇfW"6÷'FR–ÖVF–FòFRVæW&v–ãÂöÆ“à¢ÆÆ“äÆ–v"òv&–æWFRVÒ,:–wV6ö×'F–Æ†F6öÒ&VÆ†÷2FRÇFò6öç7VÖòãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&R–ÖVF–FÖVçFRF–çFRFR6†V—&òFRVV–ÖFòÂW7FÆòÂf:×66æFöÖF÷RVV6–ÖVçFòæ÷&ÖÂFò6&òFRf÷,:vâ&RFÖ,:–Ò6RòWV—ÖVçFò76"FW6Æ–v"6FfW¢Ö—2,:–Fó¢–ç6—7F—"VÖVçFò&—66òFRW&FFRFF÷2RFRFæòÖ—2FRVÒ6ö×öæVçFRãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòòFW6Æ–vÖVçFòW'6—7F—"FWö—2FRVÆ–Ö–æ"FV×W&GW&ÂFöÖFRW&–l:—&–6÷2ÂVæFò†÷WfW"7W7V—FFRföçFR÷RÆ6RVæFòòWV—ÖVçFòf÷"FRG&&Æ†òR&FW7F—fW"7W7FæFòFV×òâfÆ–:|:6ò6öÒ–ç7G'VÖVçFòR\:vFRFW7FRW7L:VÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³ã²–çFW'fVì:|:6òÂVÒÄÆ–æ²FóÒ"÷6W'f–6÷2öÖçWFVæ6òÖFRÖ6ö×WFF÷""6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6òFR6ö×WFF÷#ÂôÆ–æ³ââçFW2FRVÇVW"&W'GW&Âv&çF<;7–F÷2'V—f÷26öæf÷&ÖRÄÆ–æ²FóÒ"öFV6—6öW2ö&6·WÖçFW2ÖFÖÖçWFVæ6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ&6·WçFW2FÖçWFVì:|:6óÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&6ö×WFF÷"ÖæòÖ6öæV7FÖæÖ–çFW&æWB×÷"Ö6&ò#¢°¢F—FÆS¢$6ö×WFF÷"ì:6ò6öæV7Fæ–çFW&æWB÷"6&ó¢òVRfW&–f–6""À¢W†6W'C ¢$6&òÆ–vFòRæFFR–çFW&æWBâ6öÖò6W&"6&ò&ö×–FòÂ÷'FFò&÷FVF÷"ÂÆ6FR&VFRRfÆ†Fò&÷fVF÷"(	B6öÒFW7FW2æ÷&FVÒ6W'Fâ"À¢FFS¢###bÓ’ÓB"À¢&VEF–ÖS¢#2Ö–â"À¢6FVv÷'“¢%&VFW2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#î(	Å6VÒ–çFW&æWN(	ÒöFR6–væ–f–6"6–æ6òfÆ†2F–fW&VçFW3¢W<:¦æ6–FRVæÆ6Rl:×6–6òÂVæFW&\:vò•ì:6ò&V6V&–FòÂ&÷FVF÷"–æ6W7<:×fVÂÂDå2–æF—7öì:×fVÂ÷R6:ÖFW‡FW&æ–çFW'&ö×–Fâ6W&"W7626ÖF2Wf—FG&ö6"6&òÂÆ6÷R&÷FVF÷"÷"Ç—FR(	BRWf—F&VFVf–æ—"VÖ&VFRVR<;2&V6—6fFRVÒFW7FRãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çä6öÖV6RVÆòW7FFòFWF†W&æWBæòv–æF÷w2RVÆòVæ6—†RFò6&òâ6R&V6R(	Æ6&òFR&VFRFW66öæV7FFþ(	ÒÂFW7FR÷WG&ò6&ò6öæ†V6–FòR÷WG&÷'FFò&÷FVF÷"â6R6öæWŒ:6ò&V6RF—fÂ&Vv—7G&RVæFW&\:vò•cBÂvFWv’RDå26öÒÆ6öFSæ—6öæf–röÆÃÂö6öFSâçFW2FRÇFW&"VÇVW"6ö—6âW76W2FF÷2Ö÷7G&ÒVÒVÂ6ÖF6öçF–çV#²æVæ‡VÖÇW¢÷R6öÖæFòÂ6÷¦–æ†òÂ–FVçF–f–6\:vFVfV—GV÷6ãÂ÷à ¢Æƒ#ägVæFÖVçFó¢26–æ6ò6ÖF2FòFW7FSÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒä6ÖFÂ÷FƒãÇFƒåW&wVçFÂ÷FƒãÇFƒäö'6W'f:|:6ò;§F–ÃÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCãâVæÆ6SÂ÷FCãÇFCäòFFF÷"&V6öæ†V6Rò6&óóÂ÷FCãÇFCå7FGW2FWF†W&æWBÂVæ6—†RRÇW¦W2VæFòW†—7F—&VÓÂ÷FCãÂ÷G#à¢ÇG#ãÇFCã"âVæFW&\:vóÂ÷FCãÇFCäò6ö×WFF÷"&V6V&WR6öæf–wW&:|:6òF&VFSóÂ÷FCãÇFCä•cBÂvFWv’RDå2VÒÆ6öFSæ—6öæf–röÆÃÂö6öFSãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCã2â&VFRÆö6ÃÂ÷FCãÇFCäòvFWv’W7L:6W7<:×fVÃóÂ÷FCãÇFCåFW7FRòVæFW&\:vòFòvFWv’Â6VÒ6öæ6ÇV—"÷"VÖ&W7÷7F—6öÆFÂ÷FCãÂ÷G#à¢ÇG#ãÇFCãBâDå3Â÷FCãÇFCäæöÖW2FR6—FW2<:6ò&W6öÇf–F÷3óÂ÷FCãÇFCãÆ6öFSæç6Æöö·WW†×ÆRæ6öÓÂö6öFSãÂ÷FCãÂ÷G#à¢ÇG#ãÇFCãRâ–çFW&æWCÂ÷FCãÇFCä÷WG&÷2F—7÷6—F—f÷2R6Ö–æ†÷2W‡FW&æ÷2gVæ6–öæÓóÂ÷FCãÇFCä6ö×&:|:6ò6öçG&öÆFæòÖW6Öò&÷FVF÷#Â÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà¢ÇäVæÆ6RF—fòVæ26öæf—&ÖVR†÷WfRæVvö6–:|:6òl:×6–6VçG&R2öçF2âVÆRì:6ò&÷fVRD„5ÂvFWv’ÂDå2÷R–çFW&æWBgVæ6–öæÒâFÖW6Öf÷&ÖÂÇW¢vF&Vf÷,:v7W7V—Fl:×6–6ÂÖ2FÖ,:–ÒöFRö6÷'&W"6öÒFFF÷"FW6&–Æ—FFòÂG&—fW"W6VçFR÷RWV—ÖVçFòFW6Æ–vFòãÂ÷à ¢Æƒ#ãâ6öæf—&ÖRòVæÆ6Rl:×6–6óÂöƒ#à¢Çäf:v÷2FW7FW2÷"7V'7F—GVœ:|:6òÂ×VFæFòVÖf&œ:fVÂ÷"fW££Â÷à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒä÷&FVÓÂ÷FƒãÇFƒåfW&–f–6:|:6óÂ÷FƒãÇFƒäòVRVÆVÆ–Ö–æÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCãÂ÷FCãÇFCå&VVæ6—†"ò6&òæ2GV2öçF3Â÷FCãÇFCä6öæV7F÷"&6–ÆÖVçFR6öÇFóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCã#Â÷FCãÇFCåW6"÷WG&ò6&ò6ö×&÷fFÖVçFRgVæ6–öæÃÂ÷FCãÇFCäfÆ†&÷l:fVÂFò6&ò÷&–v–æÃÂ÷FCãÂ÷G#à¢ÇG#ãÇFCã3Â÷FCãÇFCäÖçFW"ò6&ò&öÒR×VF"÷'FFò&÷FVF÷#Â÷FCãÇFCäfÆ†&÷l:fVÂFRVÖ÷'FW7V<:Öf–6Â÷FCãÂ÷G#à¢ÇG#ãÇFCãCÂ÷FCãÇFCåFW7F"÷WG&òWV—ÖVçFòæòÖW6Öò6&òR÷'FÂ÷FCãÇFCå6RgVæ6–öæÂ–çfW7F–v:|:6òföÇFò6ö×WFF÷#Â÷FCãÂ÷G#à¢ÇG#ãÇFCãSÂ÷FCãÇFCåfW&–f–6"òFFF÷"æòv–æF÷w3Â÷FCãÇFCäFFF÷"FW6&–Æ—FFòÂW6VçFR÷R6öÒW'&òFRG&—fW#Â÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà¢Çäö'6W'fRFÖ,:–ÒFFF÷&W2U4"ÂFö6·2R6öçfW'6÷&W3¢FW7F"÷WG&÷'FU4"÷RÆ–v"ò6&òF—&WFÖVçFRÂVæFò÷7<:×fVÂÂ6W&fÆ†Fò6W7<;7&–òFRfÆ†FWF†W&æWB–çFVw&FãÂ÷à ¢Æƒ#ã"âÆV–6öæf–wW&:|:6ò6VÒÖöF–f–<:ÖÆÂöƒ#à¢Çä'&òFW&Ö–æÂ÷R&ö×BFR6öÖæFòRW†V7WFS£Â÷à¢Ç&SãÆ6öFSç¶—6öæf–röÆÆÓÂö6öFSãÂ÷&Sà¢ÇäÆö6Æ—¦RòFFF÷"WF†W&æWB6÷'&WFòRæ÷FRòW7FFòFÜ:ÖF–ÂòVæFW&\:vò•cBÂòvFWv’G,:6òR÷26W'f–F÷&W2Då2âVÒVæFW&\:vòWFöÜ:F–6òæf—†Æ6öFSãc’ã#SBç‚çƒÂö6öFSâÂ6ö×æ†FòFW<:¦æ6–FRvFWv’Â–æF–6VRòv–æF÷w2ì:6ò&V6V&WRVÖ6öæ6W7<:6ò•cB÷"D„5â—76òöçF&ò6Ö–æ†òVçG&R6ö×WFF÷"R6W'f–F÷"D„5²ì:6ò&÷fÂ÷"6’<;2ÂFVfV—FòFò&÷FVF÷"÷RFò&÷fVF÷"ãÂ÷à¢Çäì:6òF–v—FRVæFW&\:vò•ÂÜ:66&ÂvFWv’÷RDå2Væ6öçG&F÷2VÒGWF÷&–ÂâVÒ&VFW2V×&W6&–—2ÂdÄç2ÂWFVçF–6:|:6òÂ•f—†òRöÌ:×F–62öFVÒ6W"–çFVæ6–öæ—2âf÷Föw&fR÷RW‡÷'FR6öæf–wW&:|:6òçFW2FRVÇVW"ÇFW&:|:6òR6öç7VÇFRVVÒFÖ–æ—7G&&VFRãÂ÷à ¢Æƒ#ã2â6W&R&VFRÆö6ÂÂDå2R–çFW&æWCÂöƒ#à¢Çå6RW†—7FRvFWv’ÂFW7FRòVæFW&\:vòÖ÷7G&FòVÆò,;7&–òÆ6öFSæ—6öæf–sÂö6öFSã£Â÷à¢Ç&SãÆ6öFSç¶–ærTäDU$T4õôDõôtDUt–ÓÂö6öFSãÂ÷&Sà¢Çå&W7÷7F6öç6—7FVçFR&Vf÷,:vVRò6Ö–æ†òÆö6ÂÆ6ì:vò&÷FVF÷"âfÇFFR&W7÷7F:’VÒ–æL:Ö6–òÂì:6òVÖ6VçFVì:v¢f—&WvÆÂ÷RöÌ:×F–6FòWV—ÖVçFòöFR&Æ÷VV"”4Õâ6öæf—&ÖR6öÒò–æVÂFò&÷FVF÷"Â÷WG&òF—7÷6—F—fò÷RWV—R&W7öç<:fVÂVÆ&VFRçFW2FR6öæ6ÇV—"ãÂ÷à¢ÇäFWö—2Â6öç7VÇFRVÒæöÖR;¦&Æ–6ó£Â÷à¢Ç&SãÆ6öFSç¶ç6Æöö·WW†×ÆRæ6öÖÓÂö6öFSãÂ÷&Sà¢ÇäòÆ6öFSæç6Æöö·WÂö6öFSâÖ÷7G&VÂ6W'f–F÷"Då2fö’6öç7VÇFFòR6R†÷WfR&W7÷7Fâ6R&VFRÆö6ÂgVæ6–öæÂÖ26öç7VÇFfÆ†Â–çfW7F–wVRDå3²6R6öç7VÇF&W7öæFRRòæfVvF÷"ì:6ò'&R:v–æ2ÂW†Ö–æR&÷‡’ÂeâÂf—&WvÆÂÂFFR†÷&Fò6—7FVÖRò,;7&–òæfVvF÷"âì:6ò(	Æ6÷'&–¦(	ÒVÖfÆ†FRDå2G&ö6æFò6&òæVÒG&–'VFöFfÆ†FRæfVv:|:6òò&÷fVF÷"ãÂ÷à ¢Æƒ#ãBâW6Rv’Ôf’R÷WG&÷2F—7÷6—F—f÷26öÖò6ö×&:|:6óÂöƒ#à¢Çåv’Ôf’gVæ6–öææFòæòÖW6Öò&÷FVF÷"F÷&æÖ—2&÷l:fVÂVÖfÆ†&W7G&—Fò6Ö–æ†òWF†W&æWBÂÖ2ì:6òW†6ÇV’FöF226W62W‡FW&æ2â2–çFW&f6W2öFVÒ&V6V&W"Då2ÂVæFW&\:vòÂdÄâÂ&Vw&2÷R&÷F2F–fW&VçFW3²ò&÷FVF÷"FÖ,:–ÒöFRG&F"÷'F26W&FÖVçFRâ¬:6&òRv’Ôf’fÆ†æFòVÒl:&–÷2F—7÷6—F—f÷2òÖW6ÖòFV×òFW6Æö6Ò7W7V—F&&÷FVF÷"ÂÖöFVÒ÷R6W'fœ:vòW‡FW&æòãÂ÷à¢Çå&Vv—7G&R†÷,:&–òÂF—7÷6—F—f÷2fWFF÷2R&W7VÇFFòFR6F6ÖFâ6RŒ:æfVv:|:6òÂÖ2òFW6V×Væ†ò:’'V–ÒÂW6Rò&÷Fö6öÆòFRÄÆ–æ²FóÒ"ö&Æörö–çFW&æWBÖÆVçF×&÷fVF÷"Ö÷R×&÷FVF÷""6Æ74æÖSÒ'FW‡BÖ66VçB#æ–çFW&æWBÆVçF¢&÷fVF÷"÷R&÷FVF÷#ÂôÆ–æ³ââ&&WfW"D„5ÂæöÖRR÷'F2FòWV—ÖVçFòFöÜ:—7F–6òÂ6öç7VÇFRÄÆ–æ²FóÒ"ö&Æörö6öÖòÖ6öæf–wW&"×&÷FVF÷"×v–f’Ö–æ–6–çFW2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖò6öæf–wW&"ò&÷FVF÷#ÂôÆ–æ³âãÂ÷à ¢Æƒ#ãRâG&—fW"R&VFVf–æœ:|:6òl:¦ÒFWö—3Âöƒ#à¢Çå6RòFFF÷"7VÖ—RÂW7L:FW6&–Æ—FFò÷R&W6VçFW'&òæòvW&Væ6–F÷"FRF—7÷6—F—f÷2Â6öæf—&ÖR&–ÖV—&òòÖöFVÆòRö'FVæ†òG&—fW"æòf'&–6çFRFò6ö×WFF÷"÷RFÆ6âVÒFFF÷"W‡FW&æòÂ6–vFÖ,:–ÒòF–vì;77F–6òFRÄÆ–æ²FóÒ"ö&ÆöröF—7÷6—F—fò×W6"Öæò×&V6öæ†V6–FòÖò×VRÖf¦W""6Æ74æÖSÒ'FW‡BÖ66VçB#æF—7÷6—F—fòU4"ì:6ò&V6öæ†V6–FóÂôÆ–æ³âãÂ÷à¢Çä&VFVf–æœ:|:6òFR&VFRFòv–æF÷w2FWfRf–6"W'FòFòf–ÒÂFWö—2VR6&òÂ÷'FÂVæFW&\:vòÂvFWv’ÂDå2RG&—fW"f÷&ÒFö7VÖVçFF÷2âVÆ&VÖ÷fRR&V–ç7FÆFFF÷&W2R&W7FW&6öæf–wW&:|;VW2G,:6ó²eç2ÂFFF÷&W2f—'GV—2R,:&ÖWG&÷2V×&W6&–—2öFVÒ&V6—6"FRæ÷f6öæf–wW&:|:6òâVÒÖ&–VçFRFRG&&Æ†òÂö'FVæ†WF÷&—¦:|:6òçFW2ãÂ÷à ¢Æƒ#äÖG&—¢FRFV6—<:6óÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒäö'6W'f:|:6ò6öæ§VçFÂ÷FƒãÇFƒå,;7†–Öòfö6óÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCå6VÒVæÆ6R6öÒFö—26&÷2RGV2÷'F26öæ†V6–F3Â÷FCãÇFCäFFF÷"ÂG&—fW"ÂFö6²÷R†&Gv&RFò6ö×WFF÷#Â÷FCãÂ÷G#à¢ÇG#ãÇFCäVæÆ6RF—fòÂ•cBc’ã#SBç‚ç‚R6VÒvFWv“Â÷FCãÇFCäD„5Â÷'FÂdÄâ÷R6öæf–wW&:|:6òFò&÷FVF÷"÷&VFSÂ÷FCãÂ÷G#à¢ÇG#ãÇFCävFWv’6W7<:×fVÂÂÖ26öç7VÇFDå2fÆ†Â÷FCãÇFCå6W'f–F÷"ö6öæf–wW&:|:6òDå2ÂeâÂ&÷‡’÷RöÌ:×F–6Â÷FCãÂ÷G#à¢ÇG#ãÇFCäWF†W&æWBfÆ†Rv’Ôf’gVæ6–öææòÖW6ÖòF—7÷6—F—fóÂ÷FCãÇFCä6Ö–æ†òR6öæf–wW&:|:6òW7V<:Öf–6÷2FWF†W&æWCÂ÷FCãÂ÷G#à¢ÇG#ãÇFCål:&–÷2F—7÷6—F—f÷2R–çFW&f6W2fÆ†Ò§VçF÷3Â÷FCãÇFCå&÷FVF÷"ÂÖöFVÒÂVæW&v–÷R&÷fVF÷#Â÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“åG&ö6"FR&÷FVF÷"çFW2FRFW7F"÷WG&ò6&òR÷WG&÷'FãÂöÆ“à¢ÆÆ“äFVf–æ—"•ÂvFWv’÷RDå2ÖçVÆÖVçFR6VÒ6öæ†V6W"òÆæòF&VFRãÂöÆ“à¢ÆÆ“ä7&–×"6öæV7F÷"æ÷fò6VÒfW'&ÖVçF&÷&–FR6VÒFW7FF÷"ãÂöÆ“à¢ÆÆ“äVÖVæF"6&÷2&fVæ6W"F—7L:&æ6–VÒfW¢FRW6"VÒÆæ6R;¦æ–6òãÂöÆ“à¢ÆÆ“å&V–ç7FÆ"ò6—7FVÖ÷"6W6FR6öæWŒ:6òVRì:6ò6ö&RãÂöÆ“à¢ÆÆ“äW†V7WF"6W\:¦æ6–2FRÆ6öFSææWG6ƒÂö6öFSâÂ&VÖ÷fW"G&—fW'2÷R&VFVf–æ—"&VFRçFW2FR&Vv—7G&"òW7FFòãÂöÆ“à¢ÆÆ“ä6öæ6ÇV—"VÆ&W7÷7FFRVÒ;¦æ–6òÆ6öFSç–æsÂö6öFSã²”4ÕöFRW7F"&Æ÷VVFòãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&RF–çFRFR6öæV7F÷"VV–ÖFòÂ6†V—&òFRVV–ÖFòÂFæò÷"FW66&vVÌ:—G&–6÷R6&ò–ç7FÆFò,;7†–ÖòVæW&v–6VÒfÆ–:|:6òFWVFâVÒ&VFRV×&W6&–ÂÂ&RçFW2FRÇFW&"dÄâÂ•f—†òÂ&÷‡’ÂeâÂG&—fW"†öÖöÆövFò÷R6öæf–wW&:|:6òFòWV—ÖVçFòvW&Væ6–Fòâ6Rl:&–÷2F—7÷6—F—f÷2W&FW&Ò6W76òòÖW6ÖòFV×òÂ&W6W'fR÷2FW7FW2R6–öæRò&W7öç<:fVÂVÆ&VFR÷Rò&÷fVF÷"ãÂ÷à ¢ÄVF—F÷&–Å&VfW&Væ6W26ÇVsÒ&6ö×WFF÷"ÖæòÖ6öæV7FÖæÖ–çFW&æWB×÷"Ö6&ò"óà ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFò†÷WfW"6&VÖVçFòVÒ&VFR÷R6æÆWFÂVæFòl:&–÷2öçF÷2FR&VFRfÆ†&VÒ÷RVæFò&VFRf÷"FRÖ&–VçFRFRG&&Æ†ò6öÒWV—ÖVçF÷26ö×'F–Æ†F÷2âò6W'fœ:vòW7L:VÒÄÆ–æ²FóÒ"÷6W'f–6÷2÷&VFW2ÖR×v–f’"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&VFW2Rv’Ôf“ÂôÆ–æ³âÂRfÆ–:|:6ò&W6Væ6–ÂVÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³ââ&W67&—L;7&–ò6öÒl:&–÷2W7\:&–÷2ÂòFW6Fö'&ÖVçFò:’ÄÆ–æ²FóÒ"÷6W'f–6÷2÷7W÷'FR×FV6æ–6òÖV×&W6&–Â"6Æ74æÖSÒ'FW‡BÖ66VçB#ç7W÷'FRL:–6æ–6òV×&W6&–ÃÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢'fVçFö–æ†ÖFòÖ6ö×WFF÷"Öf¦VæFòÖ&'VÆ†òÖò×VR×fW&–f–6"#¢°¢F—FÆS¢%fVçFö–æ†f¦VæFò&'VÆ†ó¢òVRò6öÒ–æF–6çFW2FRG&ö6"\:v"À¢W†6W'C ¢$6†–FòÂW7FÆòÂ§VÖ&–Fòw&fR÷R&æv–Fò<:6ò'\:ÖF÷26öÒ6W62F–fW&VçFW2â6öÖòW6"òF—òFR6öÒRòÖöÖVçFòVÒVRVÆR&V6R&FW66ö'&—"÷&–vVÒ6VÒG&ö6"6ö×öæVçFR:Föâ"À¢FFS¢###bÓ’Ó2"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢$F–vì;77F–6ò"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#åfVçFö–æ†&'VÆ†VçFV6RçVæ6:’VÒFVfV—Fò—6öÆFó¢VÆ:’òf—6òFRVRò6—7FVÖW7L:FVçFæFòF—76—"Ö—26Æ÷"ÂFRVRÆwVÖ6ö—6W7L:Væ6÷7FæFòæŒ:–Æ–6R÷RFRVRò&öÆÖVçFò6†Vv÷Ròf–ÒFf–Fâò6öÒRòÖöÖVçFòVÒVRVÆR&V6RF—¦VÒVÂF÷2G,:§2:’ò6WR66òãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çå6Rò&'VÆ†ò:’Ç7G&öæsæÇFò÷,:–Ò6öç7FçFRRÆ–×óÂ÷7G&öæsâÂfVçFö–æ†W7L:v—&æFò,:–Fò÷'VRFV×W&GW&VFR(	Bò&ö&ÆVÖ:’L:—&Ö–6òÂì:6òÖV<:&æ–6òâ6Rò&'VÆ†ò:’Ç7G&öæsæ—'&VwVÆ#Â÷7G&öæsâÂ6öÒW7FÆòÂ&æv–Fò÷R6†–FòVRf&–Âò&ö&ÆVÖW7L:æ,;7&–\:v÷RVÒÆvòFö6æFòæVÆãÂ÷à ¢Æƒ#ägVæFÖVçFó¢&÷F:|:6ò:’6öç6W\:¦æ6–Âì:6ò6W6Âöƒ#à¢Çä&÷F:|:6òFfVçFö–æ†:’6öçG&öÆFVÆFV×W&GW&ÖVF–FVÒ6Vç6÷&W2Fò&ö6W76F÷"ÂFÆ6FRl:ÖFVòRÂVÒÆwVç2WV—ÖVçF÷2ÂFòv&–æWFRâVæFòFV×W&GW&6ö&RÂ&÷F:|:6ò6ö&R§VçFòâ÷"—76òG&ö6"fVçFö–æ†÷"VÒÖöFVÆò&Ö—26–ÆVæ6–÷6ò"6VÒG&F"6W6L:—&Ö–66÷7GVÖ–÷&#¢ÖVæ÷2"Ö÷f–ÖVçFFò6–væ–f–6Ö—26Æ÷"7V×VÆFòãÂ÷à ¢Æƒ#ä6Æ76–f–6æFòò'\:ÖFóÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒå6öÓÂ÷FƒãÇFƒä÷&–vVÒ&÷l:fVÃÂ÷FƒãÇFƒäòVRö'6W'f#Â÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCå6÷&òÇFòR6öç7FçFRÂ6öÖò6V6F÷#Â÷FCãÇFCå&÷F:|:6òÜ:†–Ö÷"FV×W&GW&Â÷FCãÇFCä&V6R6ö"W6f÷,:vòR&VGW¢VæFòÜ:V–æW6g&–Â÷FCãÂ÷G#à¢ÇG#ãÇFCä6†–FòwVFò6öçL:ÖçVóÂ÷FCãÇFCå&öÆÖVçFò6V6ò÷RFW6v7FFóÂ÷FCãÇFCäW†—7FRÖW6Öò6öÒÜ:V–æö6–÷6Rg&–Â÷FCãÂ÷G#à¢ÇG#ãÇFCäW7FÆò÷RF—VR&WWF–FóÂ÷FCãÇFCä6&òÂWF—VWF÷Rf–òVæ6÷7FæFòæŒ:–Æ–6SÂ÷FCãÇFCä×VFFR&—FÖò6öæf÷&ÖR&÷F:|:6óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCå§VÖ&–Fòw&fR6öÒf–'&:|:6óÂ÷FCãÇFCäf—†:|:6òg&÷W†÷RŒ:–Æ–6RFW6&Ææ6VFÂ÷FCãÇFCå6öÖRò&W76–öæ"ÆWfVÖVçFRòv&–æWFSÂ÷FCãÂ÷G#à¢ÇG#ãÇFCå&æv–Fò–çFW&Ö—FVçFSÂ÷FCãÇFCå&öÆÖVçFòVÒf–ÒFRf–FÂ÷FCãÇFCä6÷7GVÖ–÷&"6öÒòWV—ÖVçFòg&–òÂòÆ–v#Â÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#ä6W\:¦æ6–FRfW&–f–6:|:6ò6VwW&Âöƒ#à¢ÆöÃà¢ÆÆ“ä6öÒòWV—ÖVçFòÆ–vFòÂ–FVçF–f—VRÇ7G&öæsæFRöæFSÂ÷7G&öæsâfVÒò6öÓ¢föçFRÂv&–æWFRÂF—76—F÷"Fò&ö6W76F÷"÷RÆ6FRl:ÖFVòâVÒæ÷FV&öö²ÂV6R6V×&RŒ:VÖfVçFö–æ†<;2ãÂöÆ“à¢ÆÆ“äö'6W'fR6Rò'\:ÖFò6ö×æ†òW6òâ'&VÒ&öw&ÖW6FòRæ÷FR6Rò6öÒ6ö&R§VçFò(	B6R6ö&RRFW66R6öÒ6&vÂò6ö×÷'FÖVçFò:’æ÷&ÖÂRò77VçFò:’FV×W&GW&ãÂöÆ“à¢ÆÆ“äÖ\:vFV×W&GW&VÒ&W÷W6òR6ö"W6ò6öÒVÒÖöæ—F÷"FR†&Gv&RÂ6öÖòFW67&—FòVÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖÖöæ—F÷&"×FV×W&GW&ÖFòÖ6ö×WFF÷""6Æ74æÖSÒ'FW‡BÖ66VçB#æÖöæ—F÷&ÖVçFòFRFV×W&GW&ÂôÆ–æ³âãÂöÆ“à¢ÆÆ“äFW6Æ–wVRÂFW66öæV7FRFFöÖFRfW&–f—VR6öÒòWV—ÖVçFò&W'Fò6RŒ:öV—&6ö×7FFæòF—76—F÷"Â6&ò6öÇFò,;7†–Öò:Œ:–Æ–6R÷Rw&FRö'7G'\:ÖFãÂöÆ“à¢ÆÆ“ä6öæf—&f—†:|:6ó¢&gW6òg&÷W†òG&ç6f÷&Öf–'&:|:6òæ÷&ÖÂVÒ§VÖ&–FòVL:×fVÂãÂöÆ“à¢ÂööÃà¢Çä&ö'FRF÷266÷2FW&Ö–ææò76òBâò<;¦×VÆòFRöV—&æòF—76—F÷"&VGW¢G&ö6FR6Æ÷"ÂFV×W&GW&6ö&RRfVçFö–æ†&W7öæFRv—&æFòÖ—2(	Bò&'VÆ†ò:’6–çFöÖÂòVçGW–ÖVçFò:’6W6ãÂ÷à ¢Æƒ#äÆ–×W¦&W6öÇfRò\:£Âöƒ#à¢ÇäÆ–×W¦–çFW&æ&W6öÇfR'\:ÖFò6W6Fò÷"ö'7G'\:|:6òR÷"&÷F:|:6òW†–v–FVÒW†6W76òâò&ö6VF–ÖVçFòW7L:FW67&—FòVÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖÆ–×"Öæ÷FV&öö²×÷"ÖFVçG&ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖòÆ–×"òæ÷FV&öö²÷"FVçG&óÂôÆ–æ³âRf¢'FRFÄÆ–æ²FóÒ"ö&ÆöröÖçWFVæ6ò×&WfVçF—fÖFRÖ6ö×WFF÷"ÖwV–Ö6ö×ÆWFò"6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6ò&WfVçF—fÂôÆ–æ³ââVæFò7FL:—&Ö–6¬:W&FWRVf–6œ:¦æ6–ÂÆ–×W¦6÷¦–æ†&VGW¢÷V6ó¢ò6Ö–æ†ò:’òFW67&—FòVÒÄÆ–æ²FóÒ"ö&Æörö6öÖò×G&ö6"×7F×FW&Ö–6Öæ÷FV&öö²"6Æ74æÖSÒ'FW‡BÖ66VçB#çG&ö6FR7FL:—&Ö–6ÂôÆ–æ³âãÂ÷à¢ÇäòVRÆ–×W¦ì:6ò&W6öÇfR:’&öÆÖVçFòv7Fòâ6†–FòwVFòVRW'6—7FR6öÒÜ:V–æg&–RÆ–×–æF–6\:væòf–ÒFf–F;§F–Â(	BRfVçFö–æ†:’—FVÒ7V'7F—G\:×fVÂãÂ÷à ¢Æƒ#åVæFòò'\:ÖFòfVÒ6ö×æ†FóÂöƒ#à¢Çä&'VÆ†ò§VçFò6öÒG&fÖVçF÷2÷RVVFFRFW6V×Væ†òöçF&Æ–Ö—F:|:6òL:—&Ö–6¢òWV—ÖVçFò&VGW¢fVÆö6–FFR&ì:6ò7WW&VV6W"âVÒæ÷FV&öö²ÂòVG&ò6ö×ÆWFòW7L:VÒÄÆ–æ²FóÒ"ö&Æöröæ÷FV&öö²×7WW&VV6VæFòÖò×VRÖf¦W""6Æ74æÖSÒ'FW‡BÖ66VçB#ææ÷FV&öö²7WW&VV6VæFóÂôÆ–æ³ââ6RÌ:–ÒFò'\:ÖFòÜ:V–æFW6Æ–v6÷¦–æ†Âò&÷FV—&ò6÷'&WFò:’òFRÄÆ–æ²FóÒ"ö&Æörö6ö×WFF÷"ÖFW6Æ–v×6÷¦–æ†òÖò×VR×fW&–f–6""6Æ74æÖSÒ'FW‡BÖ66VçB#æFW6Æ–vÖVçFò&WVçF–æóÂôÆ–æ³âÂ÷'VRÆ’&÷F\:|:6òL:—&Ö–6¬:W7L:GVæFòãÂ÷à ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“äFW66öæV7F"fVçFö–æ†&6–ÆVæ6–"òWV—ÖVçFòãÂöÆ“à¢ÆÆ“äf÷,:v"&÷F:|:6òÜ:Öæ–Öf—†æò&öw&ÖFR6öçG&öÆR6VÒ6ö×æ†"FV×W&GW&ãÂöÆ“à¢ÆÆ“äÇV'&–f–6"ò&öÆÖVçFò6öÒ;6ÆVò6ö×VÓ¢Æ—f–÷"F–2RFWö—2G&’öV—&ãÂöÆ“à¢ÆÆ“å6VwW&"Œ:–Æ–6R6öÒòFVFò&'FW7F""VçVçFòv—&ãÂöÆ“à¢ÆÆ“åW6"7—&F÷"FöÜ:—7F–6òF—&WFòæÆ6ÂvW&æFòVÆWG&–6–FFRW7L:F–6ãÂöÆ“à¢ÆÆ“å6÷&""6ö×&–Ö–Fòv—&æFòŒ:–Æ–6RVÒÇF&÷F:|:6òÂòVRFæ–f–6òÖæ6ÂãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&R6R†÷WfW"6†V—&òFRVV–ÖFòÂ6RfVçFö–æ†&"6ö×ÆWFÖVçFR6öÒÜ:V–æVVçFRÂ6R†÷WfW"Ö&6FR6Æ÷"æÆ6÷R6R&W'GW&W†–v—"FW6ÖöçFvVÒ6ö×ÆWFFòWV—ÖVçFòâfVçFö–æ†&F6öÒFV×W&GW&ÇF:’Ö÷F—fò&FW6Æ–v"–ÖVF–FÖVçFRÂì:6ò&6öçF–çV"W6æFòãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòò'\:ÖFòW'6—7F—"FWö—2FÆ–×W¦ÂVæFòFV×W&GW&6öçF–çV"ÇFVÒ&W÷W6ò÷RVæFòfVçFö–æ†&V6—6"FR7V'7F—GVœ:|:6òVÒæ÷FV&öö²ÂöæFR\:v6÷7GVÖ6W"W7V<:Öf–6FòÖöFVÆòâfÆ–:|:6òW7L:VÒÄÆ–æ²FóÒ"öF–væ÷7F–6ò×FV6æ–6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æF–vì;77F–6òL:–6æ–6óÂôÆ–æ³âRW†V7\:|:6òVÒÄÆ–æ²FóÒ"÷6W'f–6÷2öÖçWFVæ6òÖFRÖ6ö×WFF÷""6Æ74æÖSÒ'FW‡BÖ66VçB#æÖçWFVì:|:6òFR6ö×WFF÷#ÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢'&VFR×v–f’ÖæòÖ&V6RÖæÖÆ—7FÖò×VR×fW&–f–6"#¢°¢F—FÆS¢%&VFRv’Ôf’ì:6ò&V6RæÆ—7F¢òVRfW&–f–6"çFW2FRG&ö6"ò&÷FVF÷""À¢W†6W'C ¢%7VÖ—"FÆ—7F:’F–fW&VçFRFR6öæV7F"Rì:6òæfVv"â6öÖò6W&"FFF÷"FW6Æ–vFòÂ&æFFRRt‡¢Â&VFRö7VÇFR&÷FVF÷"f÷&Fò"VÒ÷V6÷2FW7FW2â"À¢FFS¢###bÓ’Ó2"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢%&VFW2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#åVÖ&VFRVRì:6ò&V6RæÆ—7F:’VÒ&ö&ÆVÖFRf—6–&–Æ–FFRFò6–æÂÂì:6òFRfVÆö6–FFRâçFW2FR&V–æ–6–"GVFò÷R6ö×&"WV—ÖVçFòæ÷fòÂfÆR&W7öæFW"VÖW&wVçF¢7VÖ—RÇ7G&öæsç<;27V&VFSÂ÷7G&öæsâ÷R7VÖ—&ÒÇ7G&öæsçFöF3Â÷7G&öæsãóÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çå6RæVæ‡VÖ&VFR&V6RÂò&ö&ÆVÖW7L:æòF—7÷6—F—fò(	BFFF÷"FW6Æ–vFòÂÖöFòfœ:6òF—fò÷RG&—fW"6öÒfÆ†â6R2&VFW2F÷2f—¦–æ†÷2&V6VÒR7Vì:6òÂò&ö&ÆVÖW7L:æò&÷FVF÷"Âæ&æFVÒVRVÆRG&ç6Ö—FR÷RæòfFòFRòæöÖRF&VFRW7F"ö7VÇFòãÂ÷à ¢Æƒ#äFö—26Vì:&–÷2ÂFö—26Ö–æ†÷3Âöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒå6—GV:|:6óÂ÷FƒãÇFƒäöæFR–çfW7F–v#Â÷FƒãÇFƒå&–ÖV—&òFW7FSÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCäæVæ‡VÖ&VFRæÆ—7FÂ÷FCãÇFCäF—7÷6—F—fóÂ÷FCãÇFCåfW&–f–6"ò&÷L:6ò÷RFÆ†òFRv’Ôf’RòÖöFòfœ:6óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä÷WG&2&VFW26–ÒÂ7Vì:6óÂ÷FCãÇFCå&÷FVF÷#Â÷FCãÇFCåfW&–f–6"6R÷WG&òF—7÷6—F—fòVç†W&v&VFSÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä&V6RR6öÖRÇFW&æFÖVçFSÂ÷FCãÇFCäÆ6æ6R÷R–çFW&fW,:¦æ6–Â÷FCãÇFCä&÷†–Ö"×6RFò&÷FVF÷"Rö'6W'f#Â÷FCãÂ÷G#à¢ÇG#ãÇFCå6öÖR<;2æò6ö×WFF÷"æ÷fóÂ÷FCãÇFCä&æF÷R6æÃÂ÷FCãÇFCåfW&–f–6"6R&VFR:’FRRt‡£Â÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#åVæFòæVæ‡VÖ&VFR&V6SÂöƒ#à¢Çä6öÖV6RVÆòÖ—26–×ÆW3¢×V—F÷2æ÷FV&öö·2L:¦ÒVÒFÆ†òFRFV6ÆFòVRFW6Æ–vò,:F–òv’Ôf’ÂRòÖöFòfœ:6òf¢òÖW6ÖòVÆò6—7FVÖâVÒ6VwV–FÂ6öæf—&ÖR6RòFFF÷"W7L:†&–Æ—FFòæ26öæf–wW&:|;VW2FR&VFRâ6RVÆRæVÒ&V6RæÆ—7FFRFFF÷&W2Âò6Ö–æ†ò766W"G&—fW"÷R†&Gv&RãÂ÷à¢ÇåVÒFW7FR,:–Fò6W&6öæf–wW&:|:6òFRFVfV—Fó¢6öæV7FRVÒFFF÷"v’Ôf’U4"â6R2&VFW27W&vVÒ6öÒVÆRÂò,:F–ò–çFW&æò:’ò7W7V—Fòâ6RæF&V6RæVÒ76–ÒÂò&ö&ÆVÖW7L:æò6—7FVÖâVæFòW†—7FR6&òF—7öì:×fVÂÂfÆRfÆ–F"6öæWŒ:6òVÆò6Ö–æ†òFW67&—FòVÒÄÆ–æ²FóÒ"ö&Æörö6ö×WFF÷"ÖæòÖ6öæV7FÖæÖ–çFW&æWB×÷"Ö6&ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6ö×WFF÷"VRì:6ò6öæV7F÷"6&óÂôÆ–æ³âÂv&çF–æFòVR–çFW&æWBVÒ6’W7L:gVæ6–öææFòãÂ÷à ¢Æƒ#åVæFò<;27V&VFR7VÖ—SÂöƒ#à¢ÇåfW&–f—VRæW7F÷&FVÓ£Â÷à¢ÆöÃà¢ÆÆ“ãÇ7G&öæsä÷WG&òF—7÷6—F—fòVç†W&v&VFSóÂ÷7G&öæsâ6Rò6VÇVÆ"l:¢Rò6ö×WFF÷"ì:6òÂò&÷FVF÷"W7L:G&ç6Ö—F–æFò(	BÆ–Ö—F:|:6ò:’FòF—7÷6—F—fòãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä&VFR:’FRRt‡£óÂ÷7G&öæsâFFF÷&W2çF–v÷2÷W&ÒVæ2VÒ"ÃBt‡¢R6–×ÆW6ÖVçFRì:6òÆ—7FÒ&VFW2FRRt‡¢âì:6ò:’FVfV—Fó¢:’–æ6ö×F–&–Æ–FFRFR&æFãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäòæöÖRF&VFRW7L:ö7VÇFóóÂ÷7G&öæsâ&VFW26öÒF–gW<:6òFRæöÖRFW6F—fFì:6ò&V6VÒæÆ—7FR&V6—6Ò6W"F–6–öæF2ÖçVÆÖVçFRÂ–æf÷&ÖæFòæöÖRR6Væ†ãÂöÆ“à¢ÆÆ“ãÇ7G&öæsäò&÷FVF÷"W7L:Æ–vFòR6öÒ2ÇW¦W2æ÷&Ö—3óÂ÷7G&öæsâVVFFRVæW&v–:2fW¦W2FV—†òWV—ÖVçFòVÒW7FFò–æ6öç6—7FVçFRãÂöÆ“à¢ÆÆ“ãÇ7G&öæsä†÷WfR×VFì:v&V6VçFRFR6æÃóÂ÷7G&öæsâÆwVç26æ—2Ff—†FRRt‡¢W†–vVÒfW&–f–6:|:6òFR&F"Rf–6Ò–æF—7öì:×fV—2÷"ÆwVç2Ö–çWF÷2;72Æ–v"ãÂöÆ“à¢ÂööÃà¢Çä6öæf–wW&:|:6òFRæöÖRÂ6Væ†Â&æFR6æÂW7L:FWFÆ†FVÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖ6öæf–wW&"×&÷FVF÷"×v–f’Ö–æ–6–çFW2"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖò6öæf–wW&"ò&÷FVF÷"v’Ôf“ÂôÆ–æ³âãÂ÷à ¢Æƒ#äÆ6æ6Rì:6ò:’òÖW6ÖòVRW<:¦æ6–Âöƒ#à¢Çå&VFRVR&V6Rg&6Â6öÖRRföÇF:’VÒ&ö&ÆVÖFR6ö&W'GW&Âì:6òFRf—6–&–Æ–FFRâæW76R66òÂò77VçFò:’÷6–6–öæÖVçFòÂö'7L:7VÆ÷2RWfVçGVÂ×Æ–:|:6òÂG&FFòVÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖ6öæf–wW&"×&WWF–F÷"×v–f’"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öæf–wW&:|:6òFR&WWF–F÷#ÂôÆ–æ³ââ&VFRf—<:×fVÂVR6öæV7FÖ2æfVvÖÂ:’÷WG&ò&ö&ÆVÖ–æF¢6W&:|:6òVçG&R&÷fVF÷"RWV—ÖVçFòW7L:VÒÄÆ–æ²FóÒ"ö&Æörö–çFW&æWBÖÆVçF×&÷fVF÷"Ö÷R×&÷FVF÷""6Æ74æÖSÒ'FW‡BÖ66VçB#æ–çFW&æWBÆVçF¢&÷fVF÷"÷R&÷FVF÷#ÂôÆ–æ³âãÂ÷à ¢Æƒ#å&VFRW7VV6–FRW&f–Â6÷'&ö×–FóÂöƒ#à¢ÇåVæFò&VFR&V6R&÷WG&÷2F—7÷6—F—f÷2Rò6ö×WFF÷"–ç6—7FRVÒ–væ÷,:ÖÆÂ&VÖ÷fW"òW&f–Â6ÇfòR6öæV7F"FRæ÷fò6÷7GVÖ&W6öÇfW"âòW&f–ÂwV&F&æFÂ6VwW&ì:vR6Væ†²6RVÇVW"VÒFW76W2,:&ÖWG&÷2×VF÷Ræò&÷FVF÷"ÂòF—7÷6—F—fòöFR6R6ö×÷'F"FRf÷&ÖW7G&æ†L:’VRò&Vv—7G&òçF–vò6V¦vFòãÂ÷à ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“å&W7FW&"ò&÷FVF÷"FRl:'&–66öÖò&–ÖV—&ò76ó¢fö<:¢W&FR6öæf–wW&:|:6òFò&÷fVF÷"ãÂöÆ“à¢ÆÆ“åG&ö6"ò&÷FVF÷"çFW2FR6öæf—&Ö"VR÷WG&òF—7÷6—F—fòFÖ,:–Òì:6òVç†W&v&VFRãÂöÆ“à¢ÆÆ“ä–ç7FÆ"G&—fW"FR÷&–vVÒGWf–F÷6öfW&V6–Fò÷"6—FRFR'W66ãÂöÆ“à¢ÆÆ“äFW6F—f"6VwW&ì:vF&VFR&&f6–Æ—F""6öæWŒ:6òãÂöÆ“à¢ÆÆ“äf—†"VÒ6æÂÆVL;7&–ò6VÒfW&–f–6"òÖ&–VçFRãÂöÆ“à¢ÆÆ“äFV—†"&VFRö7VÇF6†æFòVR—76òVÖVçF6VwW&ì:v(	BG&Æ†Ö—2FòVR&÷FVvRãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&RçFW2FRÇFW&"6öæf–wW&:|;VW2FR&÷fVF÷"ÂFRÖW†W"VÒWV—ÖVçFòf÷&æV6–FòVÆ÷W&F÷&VÒ&Vv–ÖRFR6öÖöFFò÷RFRG&ö6"7&VFVæ6–—2FR6öæWŒ:6ò6VÒL:¢ÖÆ2æ÷FF2âFÖ,:–Ò&R6Rò&÷FVF÷"W7F—fW"VVçFRFVÖ—2Â6öÒÇW¦W2vF2÷R&V–æ–6–æFò6÷¦–æ†ó¢—76ò:’fÆ†FRWV—ÖVçFòãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFò&VFR7VÖ—"&FöF÷2÷2F—7÷6—F—f÷2ÂVæFò†÷WfW"æV6W76–FFRFR&V6öæf–wW&"òWV—ÖVçFòFò&÷fVF÷"÷RVæFòòÖ&–VçFRW†–v—"6ö&W'GW&ÆæV¦FVÒÖ—2FRVÒöçFòâò6W'fœ:vò6÷'&W7öæFVçFR:’ÄÆ–æ²FóÒ"÷6W'f–6÷2÷&VFW2ÖR×v–f’"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&VFW2Rv’Ôf“ÂôÆ–æ³ã²&Ö&–VçFR6öÒWV—RRl:&–÷2WV—ÖVçF÷2ÂòFW6Fö'&ÖVçFò:’ÄÆ–æ²FóÒ"÷6W'f–6÷2÷7W÷'FR×FV6æ–6òÖV×&W6&–Â"6Æ74æÖSÒ'FW‡BÖ66VçB#ç7W÷'FRL:–6æ–6òV×&W6&–ÃÂôÆ–æ³âãÂ÷à¢Âóà¢’À¢ÒÀ ¢&'V—fòÖ6÷'&ö×–FòÖæòÖ'&RÖò×VRÖf¦W"#¢°¢F—FÆS¢$'V—fò6÷'&ö×–Fòì:6ò'&S¢òVRf¦W"6VÒ–÷&"ò66ò"À¢W†6W'C ¢$çFW2FRFVçF"VÇVW"&W&òÂ&W6W'fRò÷&–v–æÂâ6öÖò6W&"'V—fò&VÆÖVçFRFæ–f–6FòFR&öw&Ö–æ6ö×L:×fVÂRVæFòò66òf—&&V7WW&:|:6òFRFF÷2â"À¢FFS¢###bÓ’Ó2"À¢&VEF–ÖS¢#Ö–â"À¢6FVv÷'“¢$FF÷2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#ä&–ÖV—&&Vw&òÆ–F"6öÒVÒ'V—fòVRì:6ò'&R:’6–×ÆW2RV6R6V×&R–væ÷&F¢Ç7G&öæsçG&&Æ†R6ö'&RVÖ<;7–Â÷7G&öæsââFöFFVçFF—fFR&W&òöFR&VW67&WfW"ò'V—fòÂRVÒ÷&–v–æÂ&W6W'fFòÖçL:–Ò&W'F22÷:|;VW2VR6VwVæFFVçFF—ffV6†&–ãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çä6÷–Rò'V—fò&÷WG&Væ–FFRÂFVçFR'&—"<;7–VÒ÷WG&ò&öw&ÖRVÒ÷WG&ò6ö×WFF÷"â6R'&—"VÒÆwVÒÇVv"Âò'V—fòW7L::ÖçFVw&òRò&ö&ÆVÖ:’FòÆ–6F—fòâ6Rì:6ò'&—"VÒÇVv"æVæ‡VÒÂò6öçF\;¦FòW7L:Fæ–f–6FòRò6Ö–æ†ò766W"fW'<:6òçFW&–÷"Â&6·W÷R&V7WW&:|:6òãÂ÷à ¢Æƒ#ä6÷'&ö×–Fò÷RVæ2–æ6ö×L:×fVÃóÂöƒ#à¢ÇF&ÆSà¢ÇF†VCà¢ÇG#ãÇFƒå6–æÃÂ÷FƒãÇFƒä–çFW'&WF:|:6ò&÷l:fVÃÂ÷FƒãÂ÷G#à¢Â÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCäÖVç6vVÒFRf÷&ÖFòì:6ò7W÷'FFóÂ÷FCãÇFCå&öw&Ö÷RfW'<:6ò–æ6ö×L:×fVÂÂ'V—fò&÷ffVÆÖVçFR:ÖçFVw&óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä'&RVÒ÷WG&ò6ö×WFF÷#Â÷FCãÇFCä–ç7FÆ:|:6òÆö6Â6öÒ&ö&ÆVÖÂ÷FCãÂ÷G#à¢ÇG#ãÇFCåFÖæ†ò¦W&ò÷R×V—FòÖVæ÷"VRòW7W&FóÂ÷FCãÇFCäw&f:|:6ò–çFW'&ö×–F(	B6öçF\;¦FòW&F–FóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä'&R&6–ÆÖVçFRÂ6öÒG&V6†÷2–ÆV|:×fV—3Â÷FCãÇFCäFæò&6–Âæò6öçF\;¦FóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCål:&–÷2'V—f÷2FÖW6Ö7FfÆ†ÓÂ÷FCãÇFCå7W7V—FFRÜ:ÖF–6öÒfÆ†Âì:6òFR'V—fò—6öÆFóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCäW‡FVç<:6òG&ö6FÖçVÆÖVçFSÂ÷FCãÇFCå&VæöÖV"ì:6ò6öçfW'FRf÷&ÖFó¢&WfW'FW"òæöÖR&W6öÇfSÂ÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà¢ÇåVæFòl:&–÷2'V—f÷2fÆ†ÒòÖW6ÖòFV×òÂò&ö&ÆVÖFV—†÷RFR6W"òFö7VÖVçFòâ:Òò&÷FV—&ò:’òFRÜ:ÖF–¢fW&–f–6:|:6òFR–çFVw&–FFRFòF—66òRÆV—GW&FR–æF–6F÷&W2FR6;¦FRÂG&FF÷2VÒÄÆ–æ²FóÒ"ö&ÆöröF—66òÖ6öÒ×6WF÷&W2ÖFVfV—GV÷6÷2×6Ö'BÖò×VRÖf¦W""6Æ74æÖSÒ'FW‡BÖ66VçB#ç6WF÷&W2FVfV—GV÷6÷2R4Ô%CÂôÆ–æ³âãÂ÷à ¢Æƒ#ä6W\:¦æ6–6VwW&Âöƒ#à¢ÆöÃà¢ÆÆ“ä6÷–Rò'V—fò&÷WG&Væ–FFRRì:6òÖW†Ö—2æò÷&–v–æÂãÂöÆ“à¢ÆÆ“ä6öæf—&òFÖæ†òâ'V—fò6öÒ¦W&ò'—FRì:6òFVÒ6öçF\;¦Fò&V7WW&"ãÂöÆ“à¢ÆÆ“ä'&<;7–VÒ÷WG&ò&öw&Ö6¢FRÆW"òf÷&ÖFòãÂöÆ“à¢ÆÆ“åFW7FR<;7–VÒ÷WG&ò6ö×WFF÷"ÂVÆ–Ö–ææFò–ç7FÆ:|:6òÆö6ÂãÂöÆ“à¢ÆÆ“å&ö7W&RfW'<;VW2çFW&–÷&W3¢6W'fœ:v÷2FRçWfVÒÖçL:¦Ò†—7L;7&–6òRòv–æF÷w2wV&F<;7–2VæFòò&V7W'6òW7L:F—fòÂ6öÖòFW67&—FòVÒÄÆ–æ²FóÒ"ö&Æörö†—7F÷&–6òÖFRÖ'V—f÷2×v–æF÷w2Ö6öÖòÖ6öæf–wW&""6Æ74æÖSÒ'FW‡BÖ66VçB#ä†—7L;7&–6òFR'V—f÷3ÂôÆ–æ³âãÂöÆ“à¢ÆÆ“å&ö7W&R'V—f÷2FV×÷,:&–÷2÷RFR&V7WW&:|:6òWFöÜ:F–6vW&F÷2VÆò,;7&–ò&öw&ÖæÖW6Ö7FãÂöÆ“à¢ÆÆ“å<;2VçL:6ò6öç6–FW&RVÖfW'&ÖVçFFR&W&ò(	B6V×&RöçFF&<;7–ãÂöÆ“à¢ÂööÃà¢Çå&V7WW&"FRVÒ&6·WW†—7FVçFR:’6V×&RÖVÆ†÷"VR&W&"â6Rfö<:¢ÖçL:–Ò&÷F–æFR<;7–2ÂW76R:’òÖöÖVçFòFRW<:ÖÆ(	BRFR6öæf—&Ö"VRVÆgVæ6–öæFRfW&FFRÂ6öæf÷&ÖRÄÆ–æ²FóÒ"ö&Æörö6öÖò×FW7F"×&W7FW&6òÖFRÖ&6·W"6Æ74æÖSÒ'FW‡BÖ66VçB#çFW7FRFR&W7FW&:|:6óÂôÆ–æ³âãÂ÷à ¢Æƒ#å÷"VR'V—f÷26÷'&ö×VÓÂöƒ#à¢ÇVÃà¢ÆÆ“äFW6Æ–vÖVçFò÷RVVFFRVæW&v–GW&çFRw&f:|:6òãÂöÆ“à¢ÆÆ“å&VÖü:|:6òFòVæG&—fR÷R„BW‡FW&æò6VÒV¦WF"6öÒò6—7FVÖ–æFW67&WfVæFòãÂöÆ“à¢ÆÆ“å6WF÷&W2FVfV—GV÷6÷2æÜ:ÖF–FR&Ö¦VæÖVçFòãÂöÆ“à¢ÆÆ“åG&ç6fW,:¦æ6––çFW'&ö×–FVÆ&VFR÷R÷"6&ò6öÒÖR6öçFFòãÂöÆ“à¢ÆÆ“äfÆ†Fò,;7&–ò&öw&Öò6Çf"Â6ö×VÒ6öÒ'V—f÷2w&æFW2ãÂöÆ“à¢ÆÆ“ä:|:6òFRÖÇv&RÂVRöFRFæ–f–6"÷R7&—Föw&f"6öçF\;¦FòãÂöÆ“à¢Â÷VÃà¢Çå&W&"ò'V—fò6VÒ6÷'&–v—"6W66÷7GVÖÆWf"òÖW6Öò&ö&ÆVÖæ6VÖæ6VwV–çFRâ6R÷&–vVÒf÷"Ü:ÖF–ÂFV6—<:6ò–×÷'FçFRì:6ò:’òFö7VÖVçFò(	B:’&"FRW6"VVÆVæ–FFRãÂ÷à ¢Æƒ#å6ö'&RfW'&ÖVçF2FR&W&óÂöƒ#à¢ÇäW†—7FVÒWF–Æ—L:&–÷2W7V<:Öf–6÷2÷"f÷&ÖFòRVÆW2:2fW¦W2&V7WW&Ò'FRFò6öçF\;¦FòâÖ2GV26WFVÆ2fÆVÒ6V×&S¢öçFRfW'&ÖVçF&<;7–RFW66öæf–RFR&öw&Ö2VR&öÖWFVÒ&V7WW&:|:6òv&çF–FÖVF–çFRvÖVçFòçFW2FRW†–&—"VÇVW"&W7VÇFFòâæVæ‡VÖfW'&ÖVçF&V6öç7G,;6’FFòVRì:6òfö’w&fFòãÂ÷à ¢Æƒ#äòVRì84òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“åFVçF"&W&"F—&WFÖVçFRò'V—fò÷&–v–æÂÂ6VÒ<;7–ãÂöÆ“à¢ÆÆ“ä6öçF–çV"W6æFòVæ–FFRVæFòl:&–÷2'V—f÷2&W6VçFÒfÆ†ãÂöÆ“à¢ÆÆ“å&öF"fW&–f–6:|:6òFRF—66ò6öÒ6÷'&\:|:6òWFöÜ:F–6çFW2FR6÷–"òVR–×÷'FãÂöÆ“à¢ÆÆ“äf÷&ÖF"Ü:ÖF–'&Æ–×""çFW2FRW6v÷F"2FVçFF—f2FRÆV—GW&ãÂöÆ“à¢ÆÆ“å&VæöÖV"W‡FVç<:6òW7W&æFò6öçfW'<:6òFRf÷&ÖFòãÂöÆ“à¢ÆÆ“ä–ç7FÆ"l:&–÷2&öw&Ö2FR&V7WW&:|:6òæÖW6ÖVæ–FFRöæFRW7L:6ò÷2FF÷2W&F–F÷2ãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò&#Âöƒ#à¢Çå&R6RVæ–FFRVÖ—F—"'\:ÖFò–æ6ö×VÒÂ6Rò6—7FVÖVF—"f÷&ÖF:|:6òFÜ:ÖF–Â6R<;7–7W6"W'&òFRÆV—GW&&WWF–Fò÷R6Rò'V—fòf÷"–ç7V'7F—G\:×fVÂRì:6ò†÷WfW"&6·Wâ6Fæ÷fFVçFF—fVÒF—66ò6öÒfÆ†l:×6–6&VGW¢6†æ6RFR&V7WW&:|:6ò&öf—76–öæÂâò7&—L:—&–òFR&W6W'f"FF÷2çFW2FRVÇVW"–çFW'fVì:|:6òW7L:VÒÄÆ–æ²FóÒ"öFV6—6öW2ö&6·WÖçFW2ÖFÖÖçWFVæ6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ&6·WçFW2FÖçWFVì:|:6óÂôÆ–æ³âãÂ÷à ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çä6†ÖRVæFòò'V—fòf÷"7,:×F–6òRì:6ò†÷WfW"<;7–ÂVæFòò&ö&ÆVÖF–æv—"VÖ7F–çFV—&÷RVæFò†÷WfW"7W7V—FFRfÆ†l:×6–6æÜ:ÖF–âò&÷FV—&òFRF—66ò6öÒFVfV—FòW7L:VÒÄÆ–æ²FóÒ"ö&Æörö6öÖò×&V7WW&"ÖFF÷2Ö†BÖ6öÒÖFVfV—Fò"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&V7WW&:|:6òFRFF÷2VÒ„B6öÒFVfV—FóÂôÆ–æ³âRò6W'fœ:vòVÒÄÆ–æ²FóÒ"÷6W'f–6÷2÷&V7WW&6òÖFRÖFF÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&V7WW&:|:6òFRFF÷3ÂôÆ–æ³ââfÆRÆVÖ'&"VR&V7WW&:|:6ò:’FVçFF—fL:–6æ–6Â6VÒv&çF–FR&W7VÇFFòãÂ÷à¢Âóà¢’À¢ÒÀ ¢'76BÖæòÖ&V6RÖæòÖ–ç7FÆF÷"ÖFò×v–æF÷w2#¢°¢F—FÆS¢%54Bì:6ò&V6Ræò–ç7FÆF÷"Fòv–æF÷w3¢6W62R6W\:¦æ6–6VwW&"À¢W†6W'C ¢$ò–ç7FÆF÷"'&—RÂÖ2Æ—7FFRF—66÷2W7L:f¦–ò6W&Rf—&×v&RÂ6öçG&öÆF÷"ÂG&—fW"RfÆ†l:×6–6çFW2FRVÇVW"6öÖæFòVR÷76v"FF÷2â"À¢FFS¢###bÓ’Ó#b"À¢&VEF–ÖS¢#"Ö–â"À¢6FVv÷'“¢%v–æF÷w2"À¢6öçFVçC¢€¢Ãà¢Ç6Æ74æÖSÒ&ÆVB#åVæFòFVÆÇ7G&öæsî(	ÄöæFRfö<:¢VW"–ç7FÆ"òv–æF÷w3þ(	ÓÂ÷7G&öæsâì:6òÖ÷7G&ò54BÂ—76òì:6ò&÷fVRVæ–FFRVV–Ö÷Râò–ç7FÆF÷"öFRW7F"6VÒòG&—fW"Fò6öçG&öÆF÷"Âòf—&×v&RöFRì:6òVçVÖW&"Væ–FFR÷RòÖöFòFR&Ö¦VæÖVçFòöFRFW"×VFFòâ÷&FVÒF–çfW7F–v:|:6ò–×÷'F÷'VR6öÖæF÷2FR'F–6–öæÖVçFòöFVÒv"FF÷2ãÂ÷à ¢Æƒ#å&W7÷7F7W'FÂöƒ#à¢Çå&–ÖV—&ò6öæf—&ÖR6Rò54B&V6Ræ$”õ2õTTd’â6Rì:6ò&V6RÆ’Â–çfW7F–wVR6öæWŒ:6òÂ6Æ÷BÂ6ö×F–&–Æ–FFRR†&Gv&Râ6R&V6Ræòf—&×v&RÂÖ2ì:6òæò–ç7FÆF÷"ÂfW&–f—VRÜ:ÖF–öf–6–ÂRòG&—fW"FR&Ö¦VæÖVçFòFòf'&–6çFR(	BW7V6–ÆÖVçFRVÒWV—ÖVçF÷26öÒdÔBÂ–çFVÂ%5B÷R$”Bâ<;2W6RòF—6µ'BFWö—2FR–FVçF–f–6"òF—66ò6W'FòR6öæf—&Ö"VRì:6òŒ:FF÷2&W6W'f"ãÂ÷à ¢Æƒ#äòVRFVÆf¦–&VÆÖVçFR–æF–6Âöƒ#à¢ÇF&ÆSà¢ÇF†VCãÇG#ãÇFƒäöæFRò54B&V6SóÂ÷FƒãÇFƒäÆV—GW&&÷l:fVÃÂ÷FƒãÇFƒå,;7†–ÖfW&–f–6:|:6óÂ÷FƒãÂ÷G#ãÂ÷F†VCà¢ÇF&öG“à¢ÇG#ãÇFCäì:6ò&V6Ræ$”õ2õTTd“Â÷FCãÇFCä6öæWŒ:6òÂ6Æ÷BÂ6ö×F–&–Æ–FFR÷RfÆ†l:×6–6Â÷FCãÇFCä–æf÷&Ö:|;VW2FR&Ö¦VæÖVçFòRFW7FRl:×6–6óÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä&V6Ræ$”õ2Âì:6òæò–ç7FÆF÷#Â÷FCãÇFCä6öçG&öÆF÷"6VÒG&—fW"6ö×L:×fVÂæÜ:ÖF–Â÷FCãÇFCäG&—fW"öf–6–ÂFòf'&–6çFRRÖöFòFö7VÖVçFFóÂ÷FCãÂ÷G#à¢ÇG#ãÇFCä&V6RÂÖ2–ç7FÆ:|:6ò:’&V7W6FÂ÷FCãÇFCäÖöFòFR&ö÷BÂF&VÆFR'Fœ:|;VW2÷RÜ:ÖF–Â÷FCãÇFCåTTd’ôuBRÖVç6vVÒW†FFò–ç7FÆF÷#Â÷FCãÂ÷G#à¢ÇG#ãÇFCä&V6RRFW6&V6SÂ÷FCãÇFCä–ç7F&–Æ–FFRFR6öæWŒ:6òÂf—&×v&R÷RVæ–FFSÂ÷FCãÇFCå&"–ç7FÆ:|:6òR&W6W'f"FF÷3Â÷FCãÂ÷G#à¢Â÷F&öG“à¢Â÷F&ÆSà ¢Æƒ#ãâfW&–f—VR$”õ2çFW2Fò–ç7FÆF÷#Âöƒ#à¢Çä'&ò6WGWVÆòFÆ†ò–æF–6FòVÆòf'&–6çFRR&ö7W&RòÖöFVÆòVÒ&Ö¦VæÖVçFòÂådÖRÂ4D÷RF—7÷6—F—f÷24–Râì:6ò6öægVæFòVæG&—fRFR–ç7FÆ:|:6ò6öÒò54C¢<:6òF—7÷6—F—f÷2F–fW&VçFW2â6RVæ–FFRì:6ò&V6Ræòf—&×v&RÂ6'&Vv"G&—fW"æò–ç7FÆF÷"ì:6ò&W6öÇfR6W6ãÂ÷à¢ÇäVÒæ÷FV&öö·2Â6öæf—&ÖRFÖ,:–Òò&÷Fö6öÆò6V—FòVÆò6Æ÷BâÒã"FW67&WfRVÒf÷&ÖFòl:×6–6ó²Œ:6Æ÷G2&ådÖRÂ&4D÷R6ö×L:×fV—26öÒÖ&÷2âòÖçVÂFòÖöFVÆò:’&VfW,:¦æ6–&W766ö×F–&–Æ–FFRãÂ÷à ¢Æƒ#ã"âVæFò$”õ2&V6öæ†V6RÂÖ2òv–æF÷w26WGWì:6óÂöƒ#à¢Çäò&Ö¦VæÖVçFòöFR÷W&"G,:2FRdÔBÂ–çFVÂ&–B7F÷&vRFV6†æöÆöw’÷R$”Bâòf—&×v&RVç†W&vVæ–FFR6öÒò7W÷'FRFòf'&–6çFRÂVçVçFòÜ:ÖF–vVì:—&–6Fòv–æF÷w2öFRì:6ò–æ6ÇV—"òG&—fW"æV6W7<:&–ò&&W6VçF"òFW7F–æòãÂ÷à¢ÆöÃà¢ÆÆ“ä&—†RòG&—fW"FR&Ö¦VæÖVçFòæ:v–æöf–6–ÂFòf'&–6çFRFòæ÷FV&öö²÷RFÆ6ÖÜ:6RãÂöÆ“à¢ÆÆ“äW‡G&–÷2'V—f÷2&÷WG&òVæG&—fS²ì:6òFV—†RVæ2VÒ–ç7FÆF÷"Æ6öFSâæW†SÂö6öFSâãÂöÆ“à¢ÆÆ“äæFVÆFRF—66÷2ÂW66öÆ†Ç7G&öæsä6'&Vv"G&—fW#Â÷7G&öæsâR6VÆV6–öæR7F6öÒò'V—fòÆ6öFSâæ–æcÂö6öFSâ6÷'&W7öæFVçFRãÂöÆ“à¢ÆÆ“ä6öæf—&ÖRÖöFVÆòR66–FFRFò54BçFW2FRfì:v"ãÂöÆ“à¢ÂööÃà¢Çäì:6òW6R6÷FRFRw&VvF÷"FRG&—fW'2æVÒ×VFRdÔBÂ$”B÷R„4’÷"FVçFF—fâÇFW&"òÖöFòöFR–×VF—"VÒv–æF÷w2W†—7FVçFRFR–æ–6–"RÂ6öÒ7&—Föw&f–F—fÂW†–v—"6†fRFR&V7WW&:|:6òFò&—DÆö6¶W"ãÂ÷à ¢Æƒ#ã2â6W&RFWFV<:|:6òFR6ö×F–&–Æ–FFRTTd’ôuCÂöƒ#à¢ÇåVÒ54BFWFV7FFòöFR–æF6W"&V7W6FòVÆ–ç7FÆ:|:6ò÷"–æ6ö×F–&–Æ–FFRVçG&RòÖöFòFR–æ–6–Æ—¦:|:6òRF&VÆFR'Fœ:|;VW2â—76ò:’F–fW&VçFRFRÆ—7Ff¦–âVÒÜ:V–æ2GV—2Â6öæf—&6RÜ:ÖF–öf–6–Âfö’–æ–6–FæòÖöFòTTd’RÆV–ÖVç6vVÒW†–&–FçFW2FRÇFW&"òF—66òãÂ÷à¢Çå6R†÷WfW"–ç7FÆ:|:6ò÷R'V—f÷2çF–v÷2Âì:6ò6öçfW'FÔ%"&uBæVÒW†6ÇV'Fœ:|;VW2çFW2FR6öæf—&Ö"&6·WR&—DÆö6¶W"âò&ö6VF–ÖVçFò6ö×ÆWFòW7L:VÒÄÆ–æ²FóÒ"ö&Æörö6öÖòÖ–ç7FÆ"×v–æF÷w2ÓÖFò×¦W&ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æ6öÖò–ç7FÆ"òv–æF÷w2Fò¦W&óÂôÆ–æ³âãÂ÷à ¢Æƒ#ãBâW6RòF—6µ'B&–ÖV—&ò6öÖòÆV—GW&Âöƒ#à¢ÇäòF—6µ'BöFRÖ÷7G&"6RòÖ&–VçFRFR–ç7FÆ:|:6òVç†W&vVæ–FFRÂÖ26öÖæF÷26öÖòÆ6öFSæ6ÆVãÂö6öFSâRÆ6öFSæ7&VFR'F—F–öãÂö6öFSâÖöF–f–6ÒòF—66òâ6öÖV6RVæ26öÒÆ6öFSæÆ—7BF—6³Âö6öFSâÂÆ6öFSæÆ—7BföÇVÖSÂö6öFSâRÂFWö—2FR6VÆV6–öæ"6öç66–VçFVÖVçFRVæ–FFR6÷'&WFÂÆ6öFSæFWF–ÂF—6³Âö6öFSââ6ö×&R66–FFRRÖöFVÆò6öÒ$”õ2ãÂ÷à¢Çå6RòF—6µ'BFÖ,:–Òì:6òÆ—7F"ò54BÂò&ö&ÆVÖ6öçF–çV&—†òFò'F–6–öæÖVçFó¢G&—fW"Â6öçG&öÆF÷"Âf—&×v&R÷R†&Gv&Râf÷&ÖF"ì:6òf¢VÖVæ–FFR–çf—<:×fVÂ&V6W"ãÂ÷à ¢Æƒ#ãRâVæFò&#Âöƒ#à¢Çå&R6Rò54BFW6&V6W"GW&çFR<;7–Â&÷fö6"6öævVÆÖVçF÷2Â&V6W"6öÒ66–FFR–æ6öW&VçFR÷R6öçF—fW"FF÷26VÒ&6·WâVÒFW7FR7'W¦FòVÒ÷WG&ò6Æ÷B6ö×L:×fVÂ÷RWV—ÖVçFòöFR6W&"fÆ†FÆFf÷&ÖRFVæ–FFRÂÖ2ì:6òW67&Wfæò54BVæ2&(	ÇFW7F.(	ÒãÂ÷à¢Çå6Rò54B&V6RFWö—2VRòv–æF÷w2–æ–6–ÂW6Rò&÷FV—&òW7V<:Öf–6òFRÄÆ–æ²FóÒ"ö&Æör÷76BÖçfÖRÖæòÖ&V6RÖæòÖvW&Væ6–F÷"ÖFRÖF—66÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#å54BW6VçFRæòvW&Væ6–ÖVçFòFRF—66óÂôÆ–æ³ââ6RæVÒ$”õ2ò&V6öæ†V6RÂ6–vÄÆ–æ²FóÒ"ö&Æörö†BÖæòÖR×&V6öæ†V6–FòÖæÖ&–÷2Öò×VRÖf¦W""6Æ74æÖSÒ'FW‡BÖ66VçB#æF—66òì:6ò&V6öæ†V6–Fòæ$”õ3ÂôÆ–æ³âãÂ÷à ¢Æƒ#äòVRì:6òf¦W#Âöƒ#à¢ÇVÃà¢ÆÆ“äW†V7WF"Æ6öFSæ6ÆVãÂö6öFSâÂf÷&ÖF"÷Rv"'Fœ:|;VW26VÒ–FVçF–f–6"òF—66òR6öæf—&Ö"&6·WãÂöÆ“à¢ÆÆ“åG&ö6"dÔBÂ$”B÷R„4’6VÒ&Vv—7G&"òW7FFò÷&–v–æÂRVçFVæFW"ò6—7FVÖW†—7FVçFRãÂöÆ“à¢ÆÆ“ä&—†"G&—fW"FR&Ö¦VæÖVçFòFR6—FRì:6òöf–6–ÂãÂöÆ“à¢ÆÆ“äGVÆ—¦"$”õ2æòÖV–òFòF–vì;77F–6ò6VÒ6VwV—"ò&ö6VF–ÖVçFòFòf'&–6çFRãÂöÆ“à¢ÆÆ“ä6öçF–çV"FVçFæFòVæFòVæ–FFRf–6–çFW&Ö—FVçFR÷RŒ:FF÷2–×÷'FçFW26VÒ<;7–ãÂöÆ“à¢Â÷VÃà ¢Æƒ#åVæFò6†Ö"VÒL:–6æ–6óÂöƒ#à¢Çå&ö7W&RfÆ–:|:6òVæFòVæ–FFRì:6ò&V6Ræòf—&×v&RÂ7&—Föw&f–W7L:F—fÂòG&—fW"öf–6–Âì:6ò&W6öÇfR÷RW†—7FVÒFF÷2–×÷'FçFW2æò54Bâ&–ç7FÆ"ò6—7FVÖÂfV¦ÄÆ–æ²FóÒ"÷6W'f–6÷2öf÷&ÖF6ò"6Æ74æÖSÒ'FW‡BÖ66VçB#æf÷&ÖF:|:6òR–ç7FÆ:|:6óÂôÆ–æ³ã²†fVæFò&—66ò÷2'V—f÷2Â&–÷&—¦RÄÆ–æ²FóÒ"÷6W'f–6÷2÷&V7WW&6òÖFRÖFF÷2"6Æ74æÖSÒ'FW‡BÖ66VçB#ç&V7WW&:|:6òFRFF÷3ÂôÆ–æ³âçFW2FRVÇVW"Æ–×W¦ãÂ÷à ¢ÄVF—F÷&–Å&VfW&Væ6W26ÇVsÒ'76BÖæòÖ&V6RÖæòÖ–ç7FÆF÷"ÖFò×v–æF÷w2"óà¢Âóà¢’À¢ÒÀ §Ó°