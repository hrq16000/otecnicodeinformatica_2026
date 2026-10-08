// ─────────────────────────────────────────────────────────────
// RODADA 5E — LOTE 2 DE BAIRROS ÂNCORA (Curitiba + São José dos Pinhais).
// Nenhuma rota nova: todos os slugs abaixo já existiam em /bairros/*.
// Conteúdo autoral por bairro. Proibido nesta camada: unidade/oficina no
// bairro, técnico residente, tempo de deslocamento, distância em km,
// volume de clientes, avaliação ou SLA específico.
// A indexabilidade é decidida exclusivamente por src/lib/localIndexPolicy.json.
// ─────────────────────────────────────────────────────────────
import type { BairroLocalData } from "@/lib/bairrosData";

export const BAIRROS_LOTE_2: Record<string, BairroLocalData> = {
  // ── SANTA FELICIDADE (Curitiba) ─────────────────────────────
  "santa-felicidade": {
    slug: "santa-felicidade",
    nome: "Santa Felicidade",
    nomeLocativo: "em Santa Felicidade",
    cidade: "Curitiba",
    areaName: "Santa Felicidade, Curitiba",
    metaTitle: "Técnico de informática em Santa Felicidade | Wi‑Fi, PC e notebook",
    metaDescription:
      "Técnico de informática em Santa Felicidade, Curitiba: diagnóstico de Wi‑Fi, PC e notebook, backup, SSD e formatação. Triagem antes de indicar equipamento.",
    h1: "Técnico de informática em Santa Felicidade – Curitiba",
    subtitulo:
      "Diagnóstico de computador, notebook e rede para decidir entre suporte remoto, visita e bancada antes de comprar equipamento ou formatar.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática em Santa Felicidade, Curitiba. Pode me orientar?",
    introducaoLocal: [
      "Santa Felicidade integra a regional homônima de Curitiba. A Administração Regional funciona na Rua Santa Bertila Boscardin, 213, ao lado do Terminal Santa Felicidade, dentro da Rua da Cidadania. A Prefeitura lista ainda Butiatuvinha, Campina do Siqueira, Cascatinha, Lamenha Pequena, Mossunguê, Orleans, Santo Inácio, São Braz, São João, Vista Alegre e parte norte do Campo Comprido na mesma regional.",
      "Nesta página, o recorte local serve para organizar a cobertura e facilitar a identificação do endereço. O diagnóstico continua sendo guiado pelo sintoma: Wi‑Fi fraco, computador lento, notebook aquecendo e impressora sem comunicação são problemas diferentes e não devem receber a mesma solução automática.",
    ],
    contextoLocal: [
      "Em Wi‑Fi, o primeiro teste é comparar dispositivos e pontos do imóvel. Se o sinal cai apenas em um notebook, adaptador, driver e configuração desse equipamento ganham prioridade. Se vários aparelhos perdem qualidade no mesmo ponto, posição do roteador, obstáculos, banda utilizada e distribuição do sinal passam a ser mais relevantes.",
      "Repetidor, mesh e segundo ponto cabeado resolvem cenários diferentes. Repetidor precisa receber sinal utilizável para retransmitir; mesh depende de posicionamento adequado entre os nós; cabeamento elimina parte da incerteza do rádio quando existe caminho viável. A escolha deve vir depois da medição, não antes.",
      "Em PC ou notebook lento, verificamos armazenamento, memória, temperatura e carga de programas antes de sugerir formatação ou upgrade. Um SSD degradado, pouca RAM ou superaquecimento podem produzir a mesma sensação de lentidão. Trocar peça sem separar essas hipóteses aumenta custo sem garantir resultado.",
      "Quando existem arquivos importantes, backup é tratado antes de reinstalação ou intervenção em armazenamento. Se houver ruído, erro de leitura ou falha intermitente de HD/SSD, insistir no uso pode reduzir a chance de recuperação. Nesse caso, a prioridade deixa de ser desempenho e passa a ser preservação dos dados.",
    ],
    logisticaLocal: [
      "O endereço completo é confirmado antes do atendimento. Como referências públicas da região, a Rua da Cidadania Santa Felicidade, a Rua Santa Bertila Boscardin e o Terminal Santa Felicidade ajudam a localizar o ponto, mas não são endereço operacional ou oficina da marca.",
      "Configuração, navegador, contas, parte dos erros do Windows e algumas falhas de impressão podem começar por acesso remoto. Problemas que dependem da cobertura da rede, cabeamento, posição do roteador ou periféricos no ambiente exigem visita. Desmontagem, falha física e testes prolongados seguem para bancada.",
      "Não há promessa fixa de chegada associada ao bairro. Modalidade, agenda, deslocamento e prazo são definidos após a triagem conforme endereço, tipo de falha, complexidade e eventual necessidade de peça.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp para separar rede, sistema, armazenamento, temperatura e periféricos",
      "Teste de cobertura antes de indicar repetidor, mesh ou novo roteador",
      "Backup conferido antes de formatação ou intervenção em disco",
      "Escopo, modalidade e valor informados antes da execução",
    ],
    atendimentoLocal: [
      "Wi‑Fi com baixa cobertura, queda ou desempenho irregular",
      "Computador ou notebook lento, travando ou reiniciando",
      "Windows, drivers, contas e programas com falha de configuração",
      "Impressora e periféricos sem comunicação",
    ],
    coletaBancada: [
      "SSD, HD, memória, fonte ou outro componente que exija teste físico",
      "Notebook com superaquecimento, conector, teclado ou tela danificada",
      "Tentativa de recuperação de arquivos em armazenamento com falha",
    ],
    publicoAtendido: [
      "Residências com computador, notebook e múltiplos dispositivos na rede",
      "Home office dependente de Wi‑Fi, webcam, áudio e periféricos",
      "Pequenos negócios com computador, impressora e rede local",
    ],
    servicosPrioritarios: [
      "/servicos/redes-e-wifi",
      "/servicos/manutencao-de-computador",
      "/servicos/manutencao-de-notebook",
      "/servicos/upgrade-ssd-ram",
      "/servicos/formatacao",
    ],
    servicosCidade: [
      {
        to: "/servicos/redes-wifi/curitiba",
        label: "Redes e Wi-Fi em Curitiba",
        desc: "Como funciona a avaliação de rede e Wi-Fi na cidade.",
      },
    ],
    problemasRelacionados: [
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável", desc: "Como diferenciar cobertura ruim, falha do dispositivo e problema no roteador ou no link." },
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "O que medir em armazenamento, memória, software e temperatura antes de fazer upgrade." },
      { to: "/problemas/computador-esquentando", label: "Computador esquentando", desc: "Quando temperatura e ventilação passam a exigir inspeção física." },
      { to: "/problemas/arquivos-apagados", label: "Arquivos apagados", desc: "O que evitar antes de tentar recuperar dados importantes." },
    ],
    faqLocal: [
      {
        question: "Meu Wi‑Fi não chega bem a todos os cômodos. Preciso comprar mesh?",
        answer:
          "Não necessariamente. Primeiro verificamos posição do roteador, qualidade do sinal nos pontos de uso e comportamento de outros dispositivos. Repetidor, mesh, segundo ponto cabeado ou simples reposicionamento resolvem situações diferentes.",
      },
      {
        question: "Dá para diagnosticar a rede sem visita?",
        answer:
          "Parte da triagem pode ser feita remotamente, mas cobertura, interferência, posição do roteador e cabeamento precisam ser avaliados no ambiente quando os testes iniciais não isolam a causa.",
      },
      {
        question: "Meu notebook está lento. Formatar é o primeiro passo?",
        answer:
          "Não. Antes medimos armazenamento, memória, temperatura e carga de programas. Se o gargalo for físico, formatar não resolve a causa e pode apenas atrasar o diagnóstico.",
      },
      {
        question: "Vocês atendem Santa Felicidade no local?",
        answer:
          "Sim, mediante disponibilidade e confirmação do endereço. A modalidade pode ser remota, no local ou por coleta para bancada, conforme o tipo de falha identificado na triagem.",
      },
      {
        question: "Qual referência ajuda a localizar o atendimento em Santa Felicidade?",
        answer:
          "O endereço completo é sempre o principal dado. Como referências públicas, a Rua da Cidadania Santa Felicidade, a Rua Santa Bertila Boscardin e o Terminal Santa Felicidade ajudam a confirmar a região.",
      },
    ],
  },

  // ── BOA VISTA (Curitiba) ────────────────────────────────────
  "boa-vista": {
    slug: "boa-vista",
    nome: "Boa Vista",
    nomeLocativo: "na Boa Vista",
    cidade: "Curitiba",
    areaName: "Boa Vista, Curitiba",
    metaTitle: "Técnico de informática na Boa Vista | PC, notebook, backup e rede",
    metaDescription:
      "Técnico de informática na Boa Vista, Curitiba: diagnóstico de PC e notebook, backup, impressora, rede e formatação. Triagem antes da execução.",
    h1: "Técnico de informática na Boa Vista – Curitiba",
    subtitulo:
      "Diagnóstico de computador, notebook e ambiente de trabalho com foco em dados, rede e continuidade antes de formatar ou trocar equipamento.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática na Boa Vista, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "Boa Vista integra a Regional Boa Vista de Curitiba, que também abrange Abranches, Atuba, Bacacheri, Bairro Alto, Barreirinha, Cachoeira, Pilarzinho, Santa Cândida, São Lourenço, Taboão e Tingui. A Administração Regional e a Rua da Cidadania Boa Vista ficam na Avenida Paraná, 3600. Essas referências públicas servem para situar a cobertura e não representam oficina ou unidade física da marca.",
      "Nesta página, o foco é separar falha de sistema, armazenamento, rede, periféricos e backup antes de indicar solução. Computador lento, impressora offline, Windows com erro e arquivos sem cópia exigem verificações diferentes e não devem receber a mesma resposta automática.",
    ],
    contextoLocal: [
      "Quando o computador fica lento, verificamos uso de disco, memória, temperatura e programas em inicialização. Um SSD degradado, pouca RAM, software consumindo recursos ou superaquecimento podem produzir sintomas parecidos. O diagnóstico evita trocar peça por tentativa ou formatar uma máquina com falha física.",
      "Em impressora de rede, o primeiro passo é confirmar se o próprio equipamento conclui um teste interno, qual endereço recebeu e se a porta configurada no computador continua correta. Quando vários computadores perdem a mesma impressora ao mesmo tempo, a investigação muda para rede, endereço e fila compartilhada.",
      "Backup não é tratado como simples cópia de arquivos. Conferimos origem, destino, data da última cópia e, quando aplicável, teste de restauração. Uma rotina que nunca foi validada pode falhar justamente quando a máquina precisa ser formatada ou o armazenamento apresenta defeito.",
      "Em Windows que parou de iniciar ou começou a apresentar erros após atualização, a triagem separa inicialização do sistema, armazenamento e ausência de vídeo. Reinstalar o sistema sem verificar a causa pode apagar o contexto do problema e aumentar o risco para os dados.",
    ],
    logisticaLocal: [
      "O endereço completo é confirmado antes do atendimento. Como referência pública, a Rua da Cidadania Boa Vista fica na Avenida Paraná, 3600, sede da Administração Regional.",
      "Configuração, navegador, contas e parte dos erros do Windows podem começar remotamente. Rede do local, impressora, cabeamento e dispositivos que precisam ser testados juntos normalmente pedem visita. Falhas físicas, desmontagem e testes prolongados seguem para bancada.",
      "Não há promessa fixa de chegada ou conclusão vinculada ao bairro. Modalidade, agenda e prazo são definidos após a triagem conforme endereço, complexidade e eventual necessidade de peça.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp registrando equipamento, sintoma e impacto",
      "Separação entre software, armazenamento, memória, temperatura, rede e periféricos",
      "Conferência de backup antes de formatação ou intervenção em disco",
      "Escopo, modalidade e valor informados antes da execução",
    ],
    atendimentoLocal: [
      "Computador ou notebook lento, travando ou reiniciando",
      "Impressora e scanner sem comunicação na rede",
      "Windows, drivers, contas e programas com erro",
      "Backup, sincronização e organização de cópias",
    ],
    coletaBancada: [
      "SSD, HD, memória, fonte ou outro componente que exija teste físico",
      "Notebook com aquecimento, falha de energia, tela ou conector",
      "Tentativa de recuperação de dados em armazenamento com falha",
    ],
    publicoAtendido: [
      "Residências com computador ou notebook de uso diário",
      "Home office dependente de rede, webcam, áudio e periféricos",
      "Pequenos escritórios que precisam preservar arquivos e continuidade de trabalho",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-computador",
      "/servicos/manutencao-de-notebook",
      "/servicos/redes-e-wifi",
      "/servicos/formatacao",
      "/servicos/recuperacao-de-dados",
    ],
    servicosCidade: [
      {
        to: "/servicos/remocao-virus/curitiba",
        label: "Remoção de vírus em Curitiba",
        desc: "Como funciona a triagem de segurança e software na cidade.",
      },
    ],
    problemasRelacionados: [
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como separar armazenamento, memória, software e temperatura antes de fazer upgrade." },
      { to: "/problemas/impressora-nao-imprime", label: "Impressora não imprime", desc: "O que verificar em fila, porta, driver e rede antes de substituir equipamento." },
      { to: "/problemas/windows-nao-inicia", label: "Windows não inicia", desc: "Como diferenciar inicialização, armazenamento e ausência de vídeo antes de formatar." },
      { to: "/problemas/arquivos-apagados", label: "Arquivos apagados", desc: "O que evitar antes de tentar recuperar documentos importantes." },
    ],
    faqLocal: [
      { question: "Meu computador ficou lento de repente. É vírus?", answer: "Pode ser, mas também pode haver problema de armazenamento, memória, atualização ou temperatura. O diagnóstico mede essas hipóteses antes de indicar remoção de malware, upgrade ou formatação." },
      { question: "A impressora sumiu da rede. Preciso reinstalar tudo?", answer: "Nem sempre. Primeiro verificamos se a impressora funciona sozinha, qual endereço recebeu, qual porta está configurada e se a fila está bloqueada." },
      { question: "Vocês conferem o backup antes de formatar?", answer: "Sim. Antes de reinstalar o sistema, verificamos onde estão os arquivos, se a cópia está atualizada e se pode ser acessada." },
      { question: "O atendimento pode começar remotamente?", answer: "Sim, quando o equipamento liga e mantém conexão. Configuração, navegador e parte dos erros do Windows podem ser triados remotamente; falhas físicas e problemas de rede do ambiente exigem visita ou bancada." },
      { question: "Qual referência ajuda a localizar o atendimento na Boa Vista?", answer: "O endereço completo é sempre o principal dado. Como referência pública, a Rua da Cidadania Boa Vista fica na Avenida Paraná, 3600." },
    ],
  },

  // ── BIGORRILHO (Curitiba) ───────────────────────────────────
  bigorrilho: {
    slug: "bigorrilho",
    nome: "Bigorrilho",
    nomeLocativo: "no Bigorrilho",
    cidade: "Curitiba",
    areaName: "Bigorrilho, Curitiba",
    metaTitle: "Técnico de informática no Bigorrilho | Notebook, Wi‑Fi e home office",
    metaDescription:
      "Técnico de informática no Bigorrilho, Curitiba: diagnóstico de notebook, Wi‑Fi, dock, monitor, SSD e backup. Triagem antes de trocar equipamento.",
    h1: "Técnico de informática no Bigorrilho – Curitiba",
    subtitulo:
      "Diagnóstico de notebook, home office e rede para separar configuração, interferência e falha física antes de comprar equipamento ou formatar.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Bigorrilho, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "O Bigorrilho integra a Regional Matriz de Curitiba, que também atende bairros como Batel, Cabral, Centro, Mercês e São Francisco. A Administração Regional Matriz funciona na Praça Rui Barbosa, 101. Essa referência pública serve apenas para situar a cobertura e não representa oficina ou unidade física da marca.",
      "Nesta página, o foco técnico está no conjunto notebook + periféricos + rede. Monitor externo sem imagem, dock instável, bateria degradada e Wi‑Fi irregular podem interromper o home office de maneiras diferentes e precisam ser separados antes de formatar ou substituir equipamento.",
    ],
    contextoLocal: [
      "Quando monitor ou dock apresentam falha, verificamos cabo, porta, fonte do acessório, driver de vídeo e comportamento sem o dock. Esse teste reduz o risco de trocar o monitor quando a origem está na conexão USB-C, no adaptador ou no software.",
      "Em Wi‑Fi de apartamento, comparamos bandas, canais e dispositivos. Se apenas um notebook perde conexão, adaptador e driver desse equipamento entram primeiro. Se vários aparelhos sofrem no mesmo ponto ou horário, posição do roteador, interferência e distribuição do sinal passam a ter mais peso.",
      "Em notebook lento, armazenamento, memória e temperatura são medidos antes de recomendar SSD, RAM ou reinstalação. O ganho real depende de qual recurso está limitando o uso; fazer upgrade sem medir pode aumentar custo sem resolver a causa.",
      "Backup é conferido antes de qualquer reinstalação ou migração de armazenamento. Quando o disco apresenta erro de leitura ou travamento durante cópia, a prioridade passa a ser preservação dos dados antes de insistir em clonagem.",
    ],
    logisticaLocal: [
      "O endereço completo é confirmado antes do atendimento. Em condomínio, nome para liberação, apartamento e regras de acesso são combinados antes da visita para evitar deslocamento improdutivo.",
      "Configuração, navegador, contas, dock e parte dos erros do Windows podem começar remotamente. Rede do imóvel e periféricos que precisam ser testados no ambiente normalmente pedem visita. Falhas físicas e desmontagem seguem para bancada.",
      "Não existe promessa fixa de chegada associada ao bairro. Agenda, modalidade e prazo são definidos após a triagem conforme endereço, acesso, complexidade e eventual necessidade de peça.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp registrando notebook, periféricos e sintoma",
      "Teste isolado de monitor, dock, cabo, porta e driver antes de substituir acessórios",
      "Medição de armazenamento, memória e temperatura antes de indicar upgrade",
      "Escopo, modalidade e valor informados antes da execução",
    ],
    atendimentoLocal: [
      "Notebook lento, travando ou reiniciando",
      "Monitor, dock, webcam, áudio e periféricos com falha",
      "Wi‑Fi com queda ou desempenho irregular",
      "Windows, drivers, contas e programas com erro",
    ],
    coletaBancada: [
      "SSD, memória, bateria, teclado ou tela que exijam desmontagem",
      "Notebook com aquecimento, falha de energia ou conector danificado",
      "Tentativa de recuperação de dados em armazenamento com falha",
    ],
    publicoAtendido: [
      "Home office e trabalho híbrido com notebook e periféricos",
      "Profissionais que usam monitor externo, dock e videochamada",
      "Residências que precisam preservar arquivos antes da manutenção",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-notebook",
      "/servicos/redes-e-wifi",
      "/servicos/upgrade-ssd-ram",
      "/servicos/formatacao",
      "/servicos/recuperacao-de-dados",
    ],
    servicosCidade: [
      {
        to: "/servicos/conserto-notebook/curitiba",
        label: "Conserto de notebook em Curitiba",
        desc: "Como funciona diagnóstico, visita e bancada na cidade.",
      },
      {
        to: "/servicos/upgrade-ssd/curitiba",
        label: "Upgrade de SSD em Curitiba",
        desc: "Quando clonagem, instalação limpa e backup fazem sentido.",
      },
    ],
    problemasRelacionados: [
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como separar armazenamento, memória, software e temperatura antes de fazer upgrade." },
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável", desc: "Como distinguir falha de dispositivo, interferência e problema no roteador ou no link." },
      { to: "/problemas/computador-esquentando", label: "Computador esquentando", desc: "Sinais que justificam inspeção de ventilação, poeira e ventoinha." },
      { to: "/problemas/arquivos-apagados", label: "Arquivos apagados", desc: "O que evitar antes de tentar recuperar documentos importantes." },
    ],
    faqLocal: [
      { question: "Meu monitor externo falha só quando uso o dock. O monitor está com defeito?", answer: "Não necessariamente. Testamos cabo, porta, alimentação do dock, driver de vídeo e conexão direta antes de concluir por defeito do monitor." },
      { question: "Minha internet cai mais à noite. Preciso trocar o plano?", answer: "Não é possível concluir só pelo horário. Em apartamento, interferência e ocupação dos canais também podem pesar. Comparamos sinal, outros dispositivos e conexão próxima ao roteador antes de decidir." },
      { question: "Vale fazer upgrade de SSD ou memória?", answer: "Depende do gargalo medido. Armazenamento lento e pouca memória causam sintomas diferentes, e o upgrade é indicado somente depois de verificar o uso real." },
      { question: "O atendimento pode começar remotamente?", answer: "Sim, quando o notebook liga e mantém conexão. Configuração, drivers e parte das falhas de periféricos podem ser triados remotamente; defeitos físicos e rede do ambiente exigem visita ou bancada." },
      { question: "Qual referência administrativa atende o Bigorrilho?", answer: "O Bigorrilho integra a Regional Matriz. A Administração Regional Matriz funciona na Praça Rui Barbosa, 101, no Centro." },
    ],
  },

  // ── CABRAL (Curitiba) ───────────────────────────────────────
  cabral: {
    slug: "cabral",
    nome: "Cabral",
    nomeLocativo: "no Cabral",
    cidade: "Curitiba",
    areaName: "Cabral, Curitiba",
    metaTitle: "Técnico de informática no Cabral | PC, notebook, backup e rede",
    metaDescription:
      "Técnico de informática no Cabral, Curitiba: diagnóstico de PC e notebook, backup, rede, impressora e certificado digital. Triagem antes da execução.",
    h1: "Técnico de informática no Cabral – Curitiba",
    subtitulo:
      "Diagnóstico para computador, notebook e ambiente de trabalho com foco em continuidade, dados e comunicação antes de formatar ou trocar equipamento.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Cabral, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "O Cabral integra a Regional Matriz de Curitiba. Entre as referências públicas do bairro está o Terminal Cabral, na Avenida Paraná, entre as ruas Chichorro Júnior e dos Funcionários. A Administração Regional Matriz funciona na Praça Rui Barbosa, no Centro. Essas referências servem apenas para localizar a cobertura; não representam oficina ou unidade física da marca.",
      "Nesta página, o foco técnico é continuidade de trabalho e preservação de dados. Quando um computador usado para atendimento, documentos, certificado digital ou impressão apresenta falha, a prioridade é identificar o que deixou de funcionar e o que ainda pode ser preservado antes de qualquer reinstalação.",
    ],
    contextoLocal: [
      "Em certificado digital, token ou assinatura que deixa de funcionar após atualização, o diagnóstico passa por driver, reconhecimento USB, navegador, cadeia de certificados e software do fornecedor. Reinstalar o Windows antes de testar essas camadas pode aumentar a indisponibilidade sem resolver a causa.",
      "Em impressora ou scanner de rede, verificamos se o próprio equipamento funciona, qual endereço recebeu, se a porta configurada no computador continua correta e se a fila está bloqueada. Quando vários computadores perdem o mesmo dispositivo ao mesmo tempo, a investigação muda para rede e configuração compartilhada.",
      "Backup também precisa ser testado, não apenas configurado. Uma cópia automática que não conclui, sincroniza pasta errada ou nunca foi restaurada pode transmitir uma falsa sensação de segurança. Antes de manutenção invasiva, confirmamos onde estão os arquivos, quando foi a última cópia e se ela pode ser aberta.",
      "Em computador lento ou instável, armazenamento, memória, temperatura e software são separados antes de decidir por upgrade ou formatação. Se houver erro de leitura ou travamento durante cópia, a prioridade passa a ser preservação dos dados antes de insistir no uso.",
    ],
    logisticaLocal: [
      "O endereço completo é confirmado antes do atendimento. Como referências públicas do bairro, a Avenida Paraná e o Terminal Cabral ajudam a situar a região, enquanto a Regional Matriz organiza o atendimento municipal da área.",
      "Problemas de configuração, certificado, navegador, contas e parte das falhas de software podem começar remotamente. Rede, impressora, scanner e dispositivos que precisam ser testados no ambiente normalmente exigem visita. Falha física, desmontagem ou teste prolongado seguem para bancada.",
      "Não há promessa fixa de chegada ou conclusão associada ao bairro. Agenda, modalidade e prazo são definidos após a triagem, conforme endereço, impacto da falha, complexidade e eventual necessidade de peça.",
    ],
    operacaoLocal: [
      "Triagem começa pelo que está bloqueando a operação e pelos dados que precisam ser preservados",
      "Verificação de backup antes de reinstalação, migração ou intervenção em armazenamento",
      "Separação entre software, certificado, rede, periféricos e falha física",
      "Escopo, modalidade e valor informados antes da execução",
    ],
    atendimentoLocal: [
      "Certificado digital, token e assinatura eletrônica sem funcionamento",
      "Impressora, scanner e compartilhamentos de rede sem comunicação",
      "Computador ou notebook lento, travando ou reiniciando",
      "Backup, sincronização e organização de cópias de trabalho",
    ],
    coletaBancada: [
      "SSD, HD, memória, fonte ou outro componente que exija teste físico",
      "Notebook com falha de energia, aquecimento, tela ou conector",
      "Tentativa de recuperação de dados em armazenamento com falha",
    ],
    publicoAtendido: [
      "Profissionais que dependem de computador, certificado e documentos digitais",
      "Pequenos escritórios com impressora, scanner e arquivos compartilhados",
      "Residências com notebook ou PC que precisam preservar dados antes da manutenção",
    ],
    servicosPrioritarios: [
      "/servicos/suporte-tecnico-empresarial",
      "/servicos/manutencao-de-computador",
      "/servicos/manutencao-de-notebook",
      "/servicos/recuperacao-de-dados",
      "/servicos/redes-e-wifi",
      "/servicos/upgrade-ssd-ram",
    ],
    servicosCidade: [
      {
        to: "/servicos/backup-recuperacao/curitiba",
        label: "Backup e recuperação em Curitiba",
        desc: "Como funciona a avaliação de cópias e recuperação na cidade.",
      },
    ],
    problemasRelacionados: [
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como separar armazenamento, memória, software e temperatura antes de fazer upgrade." },
      { to: "/problemas/impressora-nao-imprime", label: "Impressora não imprime", desc: "O que verificar em fila, porta, driver e rede antes de substituir equipamento." },
      { to: "/problemas/arquivos-apagados", label: "Arquivos apagados", desc: "O que evitar antes de tentar recuperar documentos importantes." },
      { to: "/problemas/windows-nao-inicia", label: "Windows não inicia", desc: "Como diferenciar falha de inicialização, armazenamento e ausência de vídeo antes de formatar." },
    ],
    faqLocal: [
      {
        question: "O certificado digital parou de funcionar depois de uma atualização. Precisa formatar?",
        answer:
          "Não é o primeiro passo. Verificamos reconhecimento do token, driver, navegador, cadeia de certificados e software do fornecedor antes de considerar reinstalação do sistema.",
      },
      {
        question: "Vocês configuram backup para computador de trabalho?",
        answer:
          "Sim. O objetivo é definir o que precisa de cópia, onde ela fica e se a restauração funciona. Antes de manutenção invasiva, confirmamos que a cópia existe e pode ser acessada.",
      },
      {
        question: "A impressora sumiu de todos os computadores. Pode ser defeito dela?",
        answer:
          "Pode, mas quando vários computadores perdem o mesmo dispositivo ao mesmo tempo também verificamos rede, endereço, porta e configuração compartilhada antes de concluir por falha física.",
      },
      {
        question: "O atendimento pode começar remotamente?",
        answer:
          "Sim, quando o computador liga e mantém conexão. Configuração, certificado, navegador e parte das falhas de software podem ser triados remotamente; rede local e defeitos físicos podem exigir visita ou bancada.",
      },
      {
        question: "Qual referência ajuda a localizar o atendimento no Cabral?",
        answer:
          "O endereço completo é sempre o principal dado. Como referência pública do bairro, o Terminal Cabral fica na Avenida Paraná, entre as ruas Chichorro Júnior e dos Funcionários.",
      },
    ],
  },

  // ── AFONSO PENA (São José dos Pinhais) ──────────────────────
  "afonso-pena": {
    slug: "afonso-pena",
    nome: "Afonso Pena",
    nomeLocativo: "no Afonso Pena",
    cidade: "São José dos Pinhais",
    areaName: "Afonso Pena, São José dos Pinhais",
    metaTitle: "Técnico de informática no Afonso Pena | PC, notebook, rede e backup",
    metaDescription:
      "Técnico de informática no Afonso Pena, São José dos Pinhais: diagnóstico de PC e notebook, rede, backup, impressora e Windows. Triagem antes da execução.",
    h1: "Técnico de informática no Afonso Pena – São José dos Pinhais",
    subtitulo:
      "Diagnóstico de computador, notebook e rede para preservar dados e continuidade antes de formatar, trocar peça ou alterar o ambiente.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Afonso Pena, em São José dos Pinhais. Pode me orientar?",
    introducaoLocal: [
      "Afonso Pena possui estrutura administrativa própria no município. A Subprefeitura Afonso Pena funciona na Rua Professora Lourdes Grutter Bonin, 100, esquina com a Almirante Alexandrino. O bairro também tem como referência o Centro de Esporte e Lazer Max Rosenmann, na Avenida Rui Barbosa, 5151. Essas referências públicas são usadas apenas para situar a cobertura; não representam oficina ou unidade física da marca.",
      "Nesta página, o foco é continuidade de operação e preservação de dados. Computador compartilhado, notebook de trabalho, impressora de rede e conexão instável exigem diagnóstico por camadas para evitar formatação ou troca de equipamento sem causa definida.",
    ],
    contextoLocal: [
      "Em máquina usada por mais de uma pessoa, contas separadas ajudam a isolar configurações, arquivos e permissões. Quando todos usam o mesmo perfil, uma extensão, programa ou alteração de navegador afeta todos ao mesmo tempo e dificulta identificar a origem da falha.",
      "Em rede e Wi‑Fi, comparamos outros dispositivos antes de culpar o roteador. Se apenas um computador perde conexão, adaptador, driver e configuração desse equipamento entram primeiro. Se vários aparelhos falham juntos, roteador, cabeamento, cobertura e conexão principal passam a ser investigados.",
      "Em impressora ou scanner de rede, verificamos teste interno, endereço recebido, porta configurada e fila. Quando o equipamento funciona sozinho, mas some dos computadores, a hipótese principal deixa de ser defeito físico e passa a ser comunicação.",
      "Backup é conferido antes de reinstalação, migração ou intervenção em armazenamento. Se o HD ou SSD apresenta erro de leitura, ruído ou travamento durante cópia, a prioridade passa a ser preservar os dados antes de insistir no uso.",
    ],
    logisticaLocal: [
      "O endereço completo é confirmado antes do atendimento. Como referências públicas, a Subprefeitura Afonso Pena, a Avenida Rui Barbosa e o Centro de Esporte e Lazer Max Rosenmann ajudam a localizar a região.",
      "Configuração, navegador, contas e parte dos erros do Windows podem começar remotamente. Rede do local, impressora compartilhada e dispositivos que precisam ser testados no ambiente normalmente pedem visita. Falha física, desmontagem e testes prolongados seguem para bancada.",
      "Não existe promessa fixa de chegada vinculada ao bairro. Agenda, deslocamento e prazo são definidos após a triagem conforme endereço, impacto da falha, complexidade e eventual necessidade de peça.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp identificando equipamento, sintoma e impacto",
      "Separação entre software, armazenamento, rede, periféricos e falha física",
      "Conferência de backup antes de formatação, migração ou intervenção em disco",
      "Escopo, modalidade e valor informados antes da execução",
    ],
    atendimentoLocal: [
      "Computador ou notebook lento, travando ou reiniciando",
      "Impressora e scanner sem comunicação na rede",
      "Wi‑Fi com queda, baixa cobertura ou falha em um dispositivo",
      "Windows, drivers, contas e programas com erro",
    ],
    coletaBancada: [
      "SSD, HD, memória, fonte ou outro componente que exija teste físico",
      "Notebook com aquecimento, falha de energia, tela ou conector",
      "Tentativa de recuperação de dados em armazenamento com falha",
    ],
    publicoAtendido: [
      "Residências com computador ou notebook de uso diário",
      "Home office dependente de rede, periféricos e arquivos locais",
      "Pequenos negócios com computador, impressora e dados de operação",
    ],
    servicosPrioritarios: [
      "/servicos/suporte-tecnico-empresarial",
      "/servicos/manutencao-de-computador",
      "/servicos/manutencao-de-notebook",
      "/servicos/redes-e-wifi",
      "/servicos/formatacao",
    ],
    problemasRelacionados: [
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como separar armazenamento, memória, software e temperatura antes de fazer upgrade." },
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável", desc: "Como distinguir falha de dispositivo, cobertura ruim e problema no roteador ou no link." },
      { to: "/problemas/impressora-nao-imprime", label: "Impressora não imprime", desc: "O que verificar em fila, porta, driver e rede antes de substituir equipamento." },
      { to: "/problemas/arquivos-apagados", label: "Arquivos apagados", desc: "O que evitar antes de tentar recuperar documentos importantes." },
    ],
    faqLocal: [
      { question: "Vocês atendem o Afonso Pena, em São José dos Pinhais?", answer: "Sim, mediante disponibilidade e confirmação do endereço. A modalidade pode ser remota, no local ou por coleta para bancada, conforme o tipo de falha identificado na triagem." },
      { question: "A rede caiu só em um computador. Preciso trocar o roteador?", answer: "Não é a primeira hipótese quando os demais dispositivos continuam conectados. Nesse caso verificamos adaptador, driver e configuração do próprio computador antes de alterar o roteador." },
      { question: "A impressora está offline em todos os computadores. Pode ser rede?", answer: "Sim. Quando vários computadores perdem o mesmo dispositivo, verificamos endereço, porta, fila e comunicação de rede antes de concluir por falha física." },
      { question: "Como o backup é tratado antes da formatação?", answer: "Confirmamos o que precisa ser preservado, onde está a cópia e se ela pode ser acessada. Se o armazenamento apresenta sinais de falha, a prioridade passa a ser preservar os dados antes de reinstalar." },
      { question: "Qual referência ajuda a localizar o atendimento no Afonso Pena?", answer: "O endereço completo é sempre o principal dado. Como referências públicas, a Subprefeitura Afonso Pena e o Centro de Esporte e Lazer Max Rosenmann ajudam a confirmar a região." },
    ],
  },

  // ── CRUZEIRO (São José dos Pinhais) ─────────────────────────
  cruzeiro: {
    slug: "cruzeiro",
    nome: "Cruzeiro",
    nomeLocativo: "no Cruzeiro",
    cidade: "São José dos Pinhais",
    areaName: "Cruzeiro, São José dos Pinhais",
    metaTitle: "Técnico de informática no Cruzeiro | Notebook, PC, Wi‑Fi e backup",
    metaDescription:
      "Técnico de informática no Cruzeiro, São José dos Pinhais: diagnóstico de notebook e PC, Wi‑Fi, impressora, backup e Windows. Triagem antes da execução.",
    h1: "Técnico de informática no Cruzeiro – São José dos Pinhais",
    subtitulo:
      "Diagnóstico de notebook, computador e rede para preservar dados e separar software, hardware e conectividade antes de formatar ou trocar peça.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Cruzeiro, em São José dos Pinhais. Pode me orientar?",
    introducaoLocal: [
      "O Cruzeiro é um bairro oficialmente mapeado por São José dos Pinhais. Entre as referências públicas locais estão a UBS Xingu, na Rua Ilhio Pedro Gasparelo, 854, e o CMEI Quero-Quero Aprender, na Rua Rubens Huergo, 130. Essas referências servem apenas para situar a cobertura e não representam oficina ou unidade física da marca.",
      "Nesta página, o foco técnico é separar problemas de notebook, Windows, Wi‑Fi e periféricos antes de sugerir formatação ou troca de equipamento. Lentidão, aquecimento, aviso falso e impressora offline podem exigir caminhos completamente diferentes.",
    ],
    contextoLocal: [
      "Quando o notebook trava ou fica lento, verificamos armazenamento, memória, temperatura e programas em segundo plano. Se o disco apresenta erro de leitura ou travamento durante cópia, a prioridade passa a ser preservar os dados antes de reinstalar o sistema.",
      "Avisos que pedem pagamento, bloqueio de tela ou instalação imediata de programas precisam ser tratados como suspeitos até verificação. A orientação é não pagar, não fornecer credenciais e não instalar software indicado pela própria mensagem.",
      "Em Wi‑Fi, comparamos outros dispositivos. Se apenas um computador perde conexão, adaptador e driver desse equipamento entram primeiro. Se vários aparelhos falham no mesmo trecho, roteador, cobertura, banda e conexão principal passam a ser investigados.",
      "Quando a impressora deixa de responder depois de atualização, verificamos teste interno, porta configurada, endereço na rede e fila antes de concluir por defeito físico.",
    ],
    logisticaLocal: [
      "O endereço completo é confirmado antes do atendimento. Como referências públicas do bairro, a UBS Xingu e o CMEI Quero-Quero Aprender ajudam a situar a região.",
      "Configuração, navegador, contas e parte dos erros do Windows podem começar remotamente. Rede do imóvel, impressora e equipamentos que precisam ser testados juntos normalmente pedem visita. Falhas físicas e desmontagem seguem para bancada.",
      "Não existe promessa fixa de chegada ou conclusão vinculada ao bairro. Agenda, modalidade e prazo são definidos após a triagem conforme endereço, complexidade e eventual necessidade de peça.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp registrando equipamento, sintoma e arquivos importantes",
      "Separação entre software, armazenamento, temperatura, rede e periféricos",
      "Conferência de backup antes de formatação ou intervenção em disco",
      "Escopo, modalidade e valor informados antes da execução",
    ],
    atendimentoLocal: [
      "Notebook ou PC lento, travando ou reiniciando",
      "Windows, navegador, contas e programas com erro",
      "Wi‑Fi com queda ou falha em um dispositivo específico",
      "Impressora e periféricos sem comunicação",
    ],
    coletaBancada: [
      "SSD, HD, memória, bateria, teclado ou tela que exijam teste físico",
      "Notebook com aquecimento, falha de energia ou conector danificado",
      "Tentativa de recuperação de dados em armazenamento com falha",
    ],
    publicoAtendido: [
      "Residências com computador ou notebook de uso diário",
      "Home office dependente de Wi‑Fi, arquivos e periféricos",
      "Usuários que precisam preservar dados antes da manutenção",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-notebook",
      "/servicos/manutencao-de-computador",
      "/servicos/redes-e-wifi",
      "/servicos/formatacao",
      "/servicos/recuperacao-de-dados",
    ],
    problemasRelacionados: [
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como separar armazenamento, memória, software e temperatura antes de fazer upgrade." },
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável", desc: "Como distinguir falha de dispositivo, cobertura ruim e problema no roteador ou no link." },
      { to: "/problemas/impressora-nao-imprime", label: "Impressora não imprime", desc: "O que verificar em fila, porta, driver e rede antes de substituir equipamento." },
      { to: "/problemas/arquivos-apagados", label: "Arquivos apagados", desc: "O que evitar antes de tentar recuperar documentos importantes." },
    ],
    faqLocal: [
      { question: "Apareceu um aviso pedindo pagamento para desbloquear o PC. O que faço?", answer: "Não pague, não informe credenciais e não instale programas indicados pela mensagem. Primeiro verificamos se é golpe, malware ou apenas uma notificação falsa." },
      { question: "Meu notebook esquenta e fica lento. Formatar resolve?", answer: "Não se a causa for térmica. Verificamos temperatura, ventilação, armazenamento e memória antes de decidir por limpeza interna, upgrade ou reinstalação." },
      { question: "A impressora parou depois de uma atualização. Preciso trocar?", answer: "Não necessariamente. Primeiro verificamos porta, driver, endereço de rede e fila de impressão antes de concluir por defeito físico." },
      { question: "O atendimento pode começar remotamente?", answer: "Sim, quando o equipamento liga e mantém conexão. Configuração, navegador e parte dos erros do Windows podem ser triados remotamente; falhas físicas e problemas que dependem do ambiente exigem visita ou bancada." },
      { question: "Qual referência ajuda a localizar o atendimento no Cruzeiro?", answer: "O endereço completo é sempre o principal dado. Como referências públicas, a UBS Xingu e o CMEI Quero-Quero Aprender ajudam a confirmar a região." },
    ],
  },

  // ── COSTEIRA (São José dos Pinhais) ─────────────────────────
  costeira: {
    slug: "costeira",
    nome: "Costeira",
    nomeLocativo: "na Costeira",
    cidade: "São José dos Pinhais",
    areaName: "Costeira, São José dos Pinhais",
    metaTitle: "Técnico de informática na Costeira | PC, notebook, SSD e backup",
    metaDescription:
      "Técnico de informática na Costeira, São José dos Pinhais: diagnóstico de PC e notebook, SSD, backup, Wi‑Fi e formatação. Triagem antes de trocar peça.",
    h1: "Técnico de informática na Costeira – São José dos Pinhais",
    subtitulo:
      "Diagnóstico de computador, notebook e rede para separar armazenamento, memória, temperatura e configuração antes de investir em peça ou formatação.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática na Costeira, em São José dos Pinhais. Pode me orientar?",
    introducaoLocal: [
      "A Costeira conta com uma referência administrativa municipal importante: a Subprefeitura Murici funciona na Rua Dr. Murici, no próprio bairro. Essa referência pública é usada apenas para situar a cobertura e não representa oficina ou unidade física da marca.",
      "Nesta página, o foco é prolongar a vida útil do equipamento quando isso faz sentido técnico. Computador lento, notebook aquecendo, armazenamento antigo e Wi‑Fi irregular precisam ser medidos antes de decidir entre ajuste, upgrade, formatação ou substituição.",
    ],
    contextoLocal: [
      "Em desktop ou notebook lento, o diagnóstico começa por armazenamento, memória, temperatura e carga de programas. HD degradado, SSD próximo do fim da vida útil, pouca RAM e superaquecimento podem produzir sintomas semelhantes. A medição evita trocar peça sem atacar a causa.",
      "Antes de instalar SSD ou migrar sistema, verificamos o estado do armazenamento atual e a existência de backup. Se houver erro de leitura ou travamento durante cópia, a prioridade muda para preservação dos dados antes de tentar clonagem ou reinstalação.",
      "Em Wi‑Fi, comparamos outros aparelhos e pontos do imóvel. Se só um computador falha, adaptador e driver desse dispositivo entram primeiro. Se vários aparelhos perdem conexão no mesmo trecho, posição do roteador, obstáculos, banda e distribuição do sinal passam a ser investigados.",
      "Desligamento sob carga exige olhar alimentação e temperatura antes de qualquer upgrade. Fonte instável, ventoinha com problema ou dissipador saturado podem tornar inútil a troca de armazenamento ou memória até que a causa elétrica ou térmica seja resolvida.",
    ],
    logisticaLocal: [
      "O endereço completo é confirmado antes do atendimento. Como referência pública, a Subprefeitura Murici fica na Rua Dr. Murici, na Costeira, e ajuda a localizar a região.",
      "Configuração, navegador, contas e parte dos erros do Windows podem começar remotamente. Rede do imóvel e periféricos no ambiente normalmente exigem visita. Falhas físicas, desmontagem e testes prolongados seguem para bancada.",
      "Não há promessa fixa de chegada ou conclusão associada ao bairro. Agenda, modalidade e prazo são definidos após a triagem conforme endereço, complexidade e eventual necessidade de peça.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp para registrar equipamento, sintoma e arquivos importantes",
      "Medição de armazenamento, memória e temperatura antes de indicar upgrade",
      "Conferência de backup antes de clonagem, formatação ou intervenção em disco",
      "Escopo, modalidade e valor informados antes da execução",
    ],
    atendimentoLocal: [
      "Computador ou notebook lento, travando ou reiniciando",
      "Wi‑Fi com queda, baixa cobertura ou falha em um dispositivo",
      "Windows, drivers e programas com erro de configuração",
      "Backup e preparação para migração de armazenamento",
    ],
    coletaBancada: [
      "SSD, HD, memória, fonte ou outro componente que exija teste físico",
      "Notebook com aquecimento, falha de energia, tela ou conector",
      "Tentativa de recuperação de dados em armazenamento com falha",
    ],
    publicoAtendido: [
      "Residências com computador ou notebook de uso diário",
      "Home office que precisa preservar arquivos e conectividade",
      "Usuários avaliando se vale fazer upgrade antes de trocar de equipamento",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-computador",
      "/servicos/manutencao-de-notebook",
      "/servicos/upgrade-ssd-ram",
      "/servicos/redes-e-wifi",
      "/servicos/formatacao",
      "/servicos/recuperacao-de-dados",
    ],
    problemasRelacionados: [
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como separar armazenamento, memória, software e temperatura antes de fazer upgrade." },
      { to: "/problemas/hd-fazendo-barulho", label: "HD fazendo barulho", desc: "Quando o sinal físico muda a prioridade para preservação de dados." },
      { to: "/problemas/computador-esquentando", label: "Computador esquentando", desc: "Sinais que justificam inspeção de ventilação, poeira e ventoinha." },
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável", desc: "Como distinguir falha de dispositivo, cobertura ruim e problema no roteador ou no link." },
    ],
    faqLocal: [
      { question: "Meu computador é antigo. Vale colocar SSD?", answer: "Depende do estado do restante do equipamento e do gargalo real. Verificamos armazenamento, memória, temperatura e alimentação antes de recomendar o upgrade." },
      { question: "Dá para migrar o sistema sem formatar?", answer: "Quando o sistema e o disco de origem estão íntegros, a clonagem pode preservar programas e configurações. Se houver erro de leitura ou corrupção, a prioridade passa a ser backup e avaliação da mídia." },
      { question: "O Wi‑Fi cai só no notebook. Preciso trocar o roteador?", answer: "Não é a primeira hipótese se os demais aparelhos continuam conectados. Nesse caso verificamos adaptador, driver e configuração do próprio notebook antes de alterar o roteador." },
      { question: "O atendimento pode começar remotamente?", answer: "Sim, quando o equipamento liga e mantém conexão. Configuração e parte dos erros do Windows podem ser triados remotamente; falhas físicas e problemas que dependem do ambiente exigem visita ou bancada." },
      { question: "Qual referência ajuda a localizar o atendimento na Costeira?", answer: "O endereço completo é sempre o principal dado. Como referência pública, a Subprefeitura Murici fica na Rua Dr. Murici, no bairro Costeira." },
    ],
  },

  // ── GUATUPÊ (São José dos Pinhais) ──────────────────────────
  guatupe: {
    slug: "guatupe",
    nome: "Guatupê",
    nomeLocativo: "no Guatupê",
    cidade: "São José dos Pinhais",
    areaName: "Guatupê, São José dos Pinhais",
    metaTitle: "Técnico de informática no Guatupê | PC, notebook, rede e backup",
    metaDescription:
      "Técnico de informática no Guatupê, São José dos Pinhais: diagnóstico de PC e notebook, rede, impressora, backup e Windows. Triagem antes da execução.",
    h1: "Técnico de informática no Guatupê – São José dos Pinhais",
    subtitulo:
      "Diagnóstico de computador, notebook e rede com foco em continuidade, comunicação e preservação de dados antes de formatar ou trocar equipamento.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Guatupê, em São José dos Pinhais. Pode me orientar?",
    introducaoLocal: [
      "O Guatupê possui atendimento descentralizado da Prefeitura na Subprefeitura Guatupê, localizada na Praça da Juventude. Essa referência pública serve apenas como marco geográfico e não identifica endereço operacional ou oficina da marca.",
      "Nesta página, a prioridade técnica é separar falha do computador, da rede e dos periféricos. Uma máquina de trabalho que não imprime, um notebook que perde Wi‑Fi e um Windows que trava podem interromper a rotina pelo mesmo motivo aparente, mas exigem testes diferentes.",
    ],
    contextoLocal: [
      "Em computador usado para trabalho, registramos primeiro o que ficou indisponível: sistema, arquivos, impressão, internet ou acesso a um compartilhamento. Essa sequência ajuda a restaurar a função essencial sem fazer alterações invasivas antes de entender a causa.",
      "Em impressora ou scanner de rede, verificamos se o equipamento funciona sozinho, qual endereço recebeu, qual porta está configurada e se a fila está presa. Quando vários computadores perdem o mesmo dispositivo, rede e comunicação ganham prioridade sobre troca de hardware.",
      "Em Wi‑Fi, comparamos outros dispositivos. Se apenas um notebook falha, adaptador, driver e configuração de energia entram primeiro. Se vários aparelhos apresentam a mesma queda, roteador, cobertura, cabeamento e conexão principal passam a ser investigados.",
      "Backup é verificado antes de formatação ou intervenção em armazenamento. Uma cópia precisa estar atualizada e acessível; quando o disco apresenta erro de leitura ou travamento durante cópia, preservar os dados vem antes de reinstalar o sistema.",
    ],
    logisticaLocal: [
      "O endereço completo é confirmado antes do atendimento. Como referência pública, a Subprefeitura Guatupê fica na Praça da Juventude, no próprio bairro.",
      "Configuração, navegador, contas e parte dos erros do Windows podem começar remotamente. Rede do local, impressora, scanner e dispositivos que precisam ser testados juntos normalmente pedem visita. Falhas físicas e testes prolongados seguem para bancada.",
      "Não existe promessa fixa de chegada ou conclusão vinculada ao bairro. Agenda, modalidade e prazo são definidos após a triagem conforme endereço, impacto da falha, complexidade e eventual necessidade de peça.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp registrando equipamento, sintoma e função que ficou indisponível",
      "Separação entre software, armazenamento, rede, periféricos e falha física",
      "Conferência de backup antes de formatação ou intervenção em disco",
      "Escopo, modalidade e valor informados antes da execução",
    ],
    atendimentoLocal: [
      "Computador ou notebook lento, travando ou reiniciando",
      "Impressora e scanner sem comunicação na rede",
      "Wi‑Fi com queda, baixa cobertura ou falha em um dispositivo",
      "Windows, drivers, contas e programas com erro",
    ],
    coletaBancada: [
      "SSD, HD, memória, fonte ou outro componente que exija teste físico",
      "Notebook com aquecimento, falha de energia, tela ou conector",
      "Tentativa de recuperação de dados em armazenamento com falha",
    ],
    publicoAtendido: [
      "Residências com computador ou notebook de uso diário",
      "Home office dependente de rede, arquivos e periféricos",
      "Pequenos negócios com computador, impressora e dados de operação",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-computador",
      "/servicos/manutencao-de-notebook",
      "/servicos/redes-e-wifi",
      "/servicos/recuperacao-de-dados",
      "/servicos/formatacao",
    ],
    problemasRelacionados: [
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como separar armazenamento, memória, software e temperatura antes de fazer upgrade." },
      { to: "/problemas/impressora-nao-imprime", label: "Impressora não imprime", desc: "O que verificar em fila, porta, driver e rede antes de substituir equipamento." },
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável", desc: "Como distinguir falha de dispositivo, cobertura ruim e problema no roteador ou no link." },
      { to: "/problemas/arquivos-apagados", label: "Arquivos apagados", desc: "O que evitar antes de tentar recuperar documentos importantes." },
    ],
    faqLocal: [
      { question: "Vocês atendem o Guatupê, em São José dos Pinhais?", answer: "Sim, mediante disponibilidade e confirmação do endereço. A modalidade pode ser remota, no local ou por coleta para bancada, conforme o tipo de falha identificado na triagem." },
      { question: "A impressora está offline em todos os computadores. Pode ser rede?", answer: "Sim. Quando vários computadores perdem o mesmo dispositivo, verificamos endereço, porta, fila e comunicação de rede antes de concluir por falha física." },
      { question: "O Wi‑Fi cai só em um notebook. Preciso trocar o roteador?", answer: "Não é a primeira hipótese quando os outros aparelhos continuam conectados. Nesse caso verificamos adaptador, driver e configuração do próprio notebook antes de alterar o roteador." },
      { question: "Como vocês conferem o backup antes de formatar?", answer: "Confirmamos o que precisa ser preservado, onde está a cópia e se ela pode ser acessada. Se o armazenamento apresenta sinais de falha, a prioridade passa a ser preservar os dados." },
      { question: "Qual referência ajuda a localizar o atendimento no Guatupê?", answer: "O endereço completo é sempre o principal dado. Como referência pública, a Subprefeitura Guatupê fica na Praça da Juventude, no próprio bairro." },
    ],
  },

};
