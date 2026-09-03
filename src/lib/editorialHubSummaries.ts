/**
 * Índice leve do hub editorial. Mantém título, resumo e tema no HTML inicial
 * de /blog sem transferir o corpo completo de cada artigo para a página-hub.
 * Atualizar junto de blogPostsContent.tsx e do registro editorial.
 */
export type EditorialHubSummary = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
};

const rows: Array<EditorialHubSummary & { slug: string }> = [
  {
    "slug": "organizacao-de-ti-para-pequenos-escritorios",
    "title": "Organização de TI para pequenos escritórios: o guia prático",
    "excerpt": "Como organizar equipamentos, arquivos, acessos e rotina de manutenção em um escritório pequeno, sem contratar estrutura de TI que não cabe no negócio.",
    "date": "2026-08-06",
    "readTime": "10 min",
    "category": "Empresas"
  },
  {
    "slug": "como-escolher-uma-workstation",
    "title": "Como escolher uma workstation: checklist de requisitos",
    "excerpt": "Checklist prático para dimensionar uma estação de trabalho profissional: o que levantar antes de comprar peça.",
    "date": "2026-08-06",
    "readTime": "11 min",
    "category": "Hardware"
  },
  {
    "slug": "linux-vs-windows-diferencas-qual-escolher",
    "title": "Linux vs Windows: Diferenças Reais e Qual Escolher em 2026",
    "excerpt": "Comparativo técnico completo entre Linux e Windows.",
    "date": "2026-04-13",
    "readTime": "14 min",
    "category": "Linux"
  },
  {
    "slug": "comandos-linux-essenciais-iniciantes",
    "title": "50 Comandos Linux Essenciais Para Iniciantes e Técnicos",
    "excerpt": "Guia definitivo de comandos do terminal.",
    "date": "2026-04-13",
    "readTime": "16 min",
    "category": "Linux"
  },
  {
    "slug": "como-instalar-ubuntu-do-zero",
    "title": "Como Instalar Ubuntu do Zero: Guia Completo 2026",
    "excerpt": "Passo a passo desde o pendrive bootável até a configuração pós-instalação.",
    "date": "2026-04-13",
    "readTime": "12 min",
    "category": "Linux"
  },
  {
    "slug": "distribuicoes-linux-qual-melhor-para-voce",
    "title": "Distribuições Linux: Qual a Melhor Para Você?",
    "excerpt": "Comparativo entre as principais distros.",
    "date": "2026-04-13",
    "readTime": "11 min",
    "category": "Linux"
  },
  {
    "slug": "trocar-windows-por-linux-vale-a-pena",
    "title": "Trocar o Windows Por Linux: Vale a Pena?",
    "excerpt": "O que funciona, o que não funciona e como migrar.",
    "date": "2026-04-13",
    "readTime": "10 min",
    "category": "Linux"
  },
  {
    "slug": "linux-para-pc-antigo-leve-rapido",
    "title": "Linux Para PC Antigo: 5 Distros Leves Que Ressuscitam Seu Computador",
    "excerpt": "Distros leves para máquinas com pouca RAM.",
    "date": "2026-04-13",
    "readTime": "9 min",
    "category": "Linux"
  },
  {
    "slug": "como-configurar-servidor-web-apache-nginx-linux",
    "title": "Como Configurar Servidor Web Apache e Nginx no Linux: Guia Completo",
    "excerpt": "Passo a passo para instalar e configurar Apache e Nginx no Ubuntu/Debian e CentOS/Fedora.",
    "date": "2026-04-13",
    "readTime": "15 min",
    "category": "Linux"
  },
  {
    "slug": "como-gerenciar-pacotes-apt-dnf-linux",
    "title": "Como Gerenciar Pacotes no Linux com APT e DNF: Guia Completo",
    "excerpt": "Domine os gerenciadores de pacotes APT (Debian/Ubuntu) e DNF (Fedora/RHEL) com exemplos práticos.",
    "date": "2026-04-13",
    "readTime": "12 min",
    "category": "Linux"
  },
  {
    "slug": "como-configurar-ssh-seguro-linux",
    "title": "Como Configurar SSH Seguro no Linux: Guia Anti-Invasão",
    "excerpt": "Hardening completo do SSH: chaves, fail2ban, porta customizada e autenticação de dois fatores.",
    "date": "2026-04-13",
    "readTime": "13 min",
    "category": "Linux"
  },
  {
    "slug": "como-usar-docker-linux-guia-completo",
    "title": "Como Usar Docker no Linux: Guia Completo Para Iniciantes e Técnicos",
    "excerpt": "Instalação, containers, Docker Compose, volumes, redes e boas práticas para ambientes de produção.",
    "date": "2026-04-13",
    "readTime": "16 min",
    "category": "Linux"
  },
  {
    "slug": "inteligencia-artificial-evolucao-historia",
    "title": "A Evolução da Inteligência Artificial: De Turing ao ChatGPT",
    "excerpt": "Uma jornada pela história da IA.",
    "date": "2026-04-13",
    "readTime": "13 min",
    "category": "Inteligência Artificial"
  },
  {
    "slug": "como-usar-ia-no-dia-a-dia-dicas-praticas",
    "title": "Como Usar IA no Dia a Dia: 15 Dicas Práticas Para Trabalho e Estudo",
    "excerpt": "Dicas práticas de IA para o cotidiano.",
    "date": "2026-04-13",
    "readTime": "12 min",
    "category": "Inteligência Artificial"
  },
  {
    "slug": "melhores-ferramentas-ia-gratuitas-2026",
    "title": "Melhores Ferramentas de IA Gratuitas em 2026",
    "excerpt": "Lista curada de IAs gratuitas.",
    "date": "2026-04-13",
    "readTime": "10 min",
    "category": "Inteligência Artificial"
  },
  {
    "slug": "ia-para-pequenas-empresas-como-comecar",
    "title": "IA Para Pequenas Empresas: Como Começar Sem Gastar Muito",
    "excerpt": "Automação e IA acessível para pequenos negócios.",
    "date": "2026-04-13",
    "readTime": "11 min",
    "category": "Inteligência Artificial"
  },
  {
    "slug": "ia-substituir-empregos-mitos-verdades",
    "title": "A IA Vai Substituir Empregos? Mitos, Verdades e Como Se Preparar",
    "excerpt": "O que a pesquisa mostra sobre IA e empregos.",
    "date": "2026-04-13",
    "readTime": "10 min",
    "category": "Inteligência Artificial"
  },
  {
    "slug": "computador-lento-causas-solucoes",
    "title": "Computador lento: causas possíveis e como decidir o próximo passo",
    "excerpt": "Entenda por que um computador fica lento, o que dá para verificar com segurança e quando formatar, fazer upgrade ou buscar manutenção realmente faz diferença.",
    "date": "2026-04-06",
    "readTime": "11 min",
    "category": "Manutenção"
  },
  {
    "slug": "como-saber-se-pc-tem-virus-malware",
    "title": "Como saber se o computador está com vírus ou malware",
    "excerpt": "Pop-ups, navegador alterado, lentidão repentina ou arquivos bloqueados? Veja os sinais de infecção.",
    "date": "2026-04-05",
    "readTime": "10 min",
    "category": "Segurança"
  },
  {
    "slug": "notebook-nao-liga-o-que-fazer",
    "title": "Notebook não liga: o que verificar antes da assistência",
    "excerpt": "Veja verificações seguras para um notebook que não liga, liga sem imagem ou desliga sozinho e saiba quando interromper os testes.",
    "date": "2026-04-04",
    "readTime": "10 min",
    "category": "Manutenção"
  },
  {
    "slug": "diferenca-camera-wifi-dvr-qual-escolher",
    "title": "Câmera Wi-Fi ou DVR: Qual a Diferença e Qual Escolher?",
    "excerpt": "Entenda as diferenças técnicas entre câmeras Wi-Fi e sistemas DVR.",
    "date": "2026-02-14",
    "readTime": "8 min",
    "category": "CFTV"
  },
  {
    "slug": "seguranca-casas-praia-itapoa-guaratuba",
    "title": "Segurança em Casas de Praia: Como Proteger Seu Imóvel em Itapoá e Guaratuba",
    "excerpt": "Imóveis de veraneio ficam meses desocupados e são alvos fáceis.",
    "date": "2026-02-12",
    "readTime": "7 min",
    "category": "CFTV"
  },
  {
    "slug": "como-escolher-melhor-kit-cameras-seguranca",
    "title": "Como Escolher o Melhor Kit de Câmeras de Segurança Para Sua Casa ou Comércio",
    "excerpt": "Guia completo para escolher o kit ideal de CFTV.",
    "date": "2026-02-10",
    "readTime": "9 min",
    "category": "CFTV"
  },
  {
    "slug": "monitoramento-24-horas-como-funciona",
    "title": "Monitoramento 24 Horas: Como Funciona e Por Que Você Precisa",
    "excerpt": "Saiba como funciona a gravação contínua e o acesso remoto.",
    "date": "2026-02-08",
    "readTime": "6 min",
    "category": "CFTV"
  },
  {
    "slug": "equipe-especializada-cftv-litoral-parana",
    "title": "Equipe Especializada em CFTV no Litoral do Paraná: Por Que Contratar Profissionais",
    "excerpt": "Instalação amadora pode comprometer toda a segurança.",
    "date": "2026-02-06",
    "readTime": "7 min",
    "category": "CFTV"
  },
  {
    "slug": "windows-11-atualizacao-kb5074105-novidades",
    "title": "Windows 11 KB5074105: Todas as Novidades da Atualização de Janeiro 2026",
    "excerpt": "A Microsoft liberou a atualização KB5074105 para Windows 11 25H2 e 24H2 com recursos inéditos: Smart App Control configurável, sincronização celular-PC, melhorias no Windows Hello e correções críticas.",
    "date": "2026-01-30",
    "readTime": "10 min",
    "category": "Windows 11"
  },
  {
    "slug": "como-escolher-um-bom-antivirus",
    "title": "Como escolher um antivírus: o que muda de verdade na proteção",
    "excerpt": "Critérios técnicos para escolher a proteção do Windows: o que o antivírus do sistema já cobre, quando um pago faz diferença, o que é só marketing e como reconhecer falso antivírus.",
    "date": "2026-08-12",
    "readTime": "11 min",
    "category": "Segurança"
  },
  {
    "slug": "dicas-manter-notebook-funcionando-bem",
    "title": "Dicas Para Manter o Notebook Funcionando Bem (E Evitar Assistência)",
    "excerpt": "Cuidados simples que aumentam a vida útil do notebook: limpeza, bateria, armazenamento, temperaturas, atualizações e hábitos que evitam travamentos.",
    "date": "2024-02-01",
    "readTime": "6 min",
    "category": "Manutenção"
  },
  {
    "slug": "como-deixar-computador-mais-rapido",
    "title": "Como Deixar o Computador Mais Rápido: 7 Dicas Práticas",
    "excerpt": "Seu PC está lento? Descubra 7 técnicas simples que você pode aplicar hoje mesmo para melhorar a velocidade do seu computador sem gastar nada.",
    "date": "2024-01-10",
    "readTime": "5 min",
    "category": "Dicas"
  },
  {
    "slug": "sinais-computador-com-virus",
    "title": "5 Sinais de Que Seu Computador Está com Vírus",
    "excerpt": "Aprenda a identificar os principais sintomas de uma infecção por vírus ou malware e saiba quando é hora de procurar um técnico especializado.",
    "date": "2024-01-08",
    "readTime": "4 min",
    "category": "Segurança"
  },
  {
    "slug": "quando-trocar-hd-por-ssd",
    "title": "Vale a pena trocar o HD por SSD? Como avaliar o upgrade",
    "excerpt": "O SSD acelera a inicialização e a abertura de programas, mas não resolve tudo. Veja o que muda.",
    "date": "2024-01-05",
    "readTime": "9 min",
    "category": "Hardware"
  },
  {
    "slug": "backup-como-proteger-seus-arquivos",
    "title": "Como evitar perder arquivos: guia de backup preventivo",
    "excerpt": "Backup não é copiar arquivos para outra pasta do mesmo disco. Entenda cópias local, externa e em nuvem.",
    "date": "2024-01-02",
    "readTime": "9 min",
    "category": "Segurança"
  },
  {
    "slug": "notebook-superaquecendo-o-que-fazer",
    "title": "Notebook superaquecendo: sinais, prevenção e o que fazer",
    "excerpt": "Aquecimento normal ou comportamento de risco? Veja o que observar no superaquecimento, o que fazer com segurança e os sinais que pedem desligar o equipamento.",
    "date": "2023-12-28",
    "readTime": "9 min",
    "category": "Manutenção"
  },
  {
    "slug": "wifi-lento-como-melhorar",
    "title": "Wi-Fi Lento em Casa? Veja Como Melhorar o Sinal",
    "excerpt": "Dicas práticas para melhorar a cobertura e velocidade da sua internet sem fio. Do posicionamento do roteador às configurações ideais.",
    "date": "2023-12-25",
    "readTime": "5 min",
    "category": "Redes"
  },
  {
    "slug": "erros-comuns-upgrade-computador",
    "title": "5 Erros Comuns ao Fazer Upgrade no Computador (e Como Evitar Prejuízo)",
    "excerpt": "Comprar RAM incompatível, instalar SSD errado, favaliar o valor peças no slot — veja os erros que causam prejuízo.",
    "date": "2026-04-06",
    "readTime": "8 min",
    "category": "Manutenção"
  },
  {
    "slug": "quando-trocar-computador-ou-reparar",
    "title": "Quando Trocar o Computador e Quando Vale a Pena Reparar (Guia Técnico)",
    "excerpt": "PC antigo, lento ou com defeito? Descubra os critérios técnicos que definem se vale investir no reparo ou se é hora de partir para um equipamento novo.",
    "date": "2026-04-06",
    "readTime": "11 min",
    "category": "Manutenção"
  },
  {
    "slug": "manutencao-preventiva-computador-guia",
    "title": "Manutenção Preventiva do Computador: O Guia Que Evita 80% dos Problemas",
    "excerpt": "Rotinas simples que prolongam a vida útil do seu PC e evitam chamados técnicos.",
    "date": "2026-04-06",
    "readTime": "9 min",
    "category": "Manutenção"
  },
  {
    "slug": "diagnostico-tecnico-por-que-e-pago",
    "title": "Por Que o Diagnóstico Técnico é Pago? Entenda de Uma Vez",
    "excerpt": "Explicamos por que o diagnóstico tem custo, o que ele envolve e como evita prejuízos maiores.",
    "date": "2026-04-05",
    "readTime": "7 min",
    "category": "Atendimento"
  },
  {
    "slug": "como-proteger-computador-golpes-internet",
    "title": "Como se proteger de golpes na internet: o que checar antes de clicar",
    "excerpt": "Phishing, sites clonados, falso suporte técnico e extensões maliciosas: como reconhecer cada padrão, o que verificar antes de clicar e o que fazer nas primeiras horas depois de cair em um golpe.",
    "date": "2026-08-12",
    "readTime": "12 min",
    "category": "Segurança"
  },
  {
    "slug": "como-instalar-windows-11-pc-antigo",
    "title": "Como Instalar Windows 11 em PC Antigo Sem TPM 2.0",
    "excerpt": "Método seguro e testado por técnicos.",
    "date": "2024-01-14",
    "readTime": "10 min",
    "category": "Windows 11"
  },
  {
    "slug": "windows-11-lento-como-resolver",
    "title": "Windows 11 lento: como descobrir a causa antes de sair otimizando",
    "excerpt": "Lentidão no Windows 11 quase nunca tem uma causa única. Como ler os sinais, separar limite de hardware de software mal configurado e decidir entre ajuste, upgrade e reinstalação.",
    "date": "2026-08-12",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "windows-11-vale-a-pena-atualizar",
    "title": "Windows 11: Vale a Pena Atualizar?",
    "excerpt": "Requisitos, novidades, vantagens e desvantagens.",
    "date": "2026-01-15",
    "readTime": "8 min",
    "category": "Windows 11"
  },
  {
    "slug": "office-365-guia-completo-empresas",
    "title": "Office 365 Para Empresas: Guia Completo",
    "excerpt": "Teams, SharePoint, OneDrive e todas as ferramentas.",
    "date": "2024-01-11",
    "readTime": "12 min",
    "category": "Office 365"
  },
  {
    "slug": "office-365-vs-office-tradicional",
    "title": "Office 365 vs Office Tradicional: Qual Escolher?",
    "excerpt": "Comparativo completo entre assinatura e licença perpétua.",
    "date": "2024-01-10",
    "readTime": "6 min",
    "category": "Office 365"
  },
  {
    "slug": "configurar-email-outlook-office-365",
    "title": "Como Configurar Email Empresarial no Outlook 365",
    "excerpt": "Tutorial com sincronização celular e backup automático.",
    "date": "2024-01-09",
    "readTime": "5 min",
    "category": "Office 365"
  },
  {
    "slug": "seguranca-digital-empresas-guia-2024",
    "title": "Segurança Digital Para Empresas: Guia Essencial",
    "excerpt": "Firewall, antivírus corporativo, backup e políticas.",
    "date": "2024-01-08",
    "readTime": "15 min",
    "category": "Segurança"
  },
  {
    "slug": "ransomware-como-proteger-empresa",
    "title": "Ransomware em pequenas empresas: como o ataque entra e o que realmente segura o prejuízo",
    "excerpt": "Por onde o ransomware entra numa empresa pequena, por que o backup comum costuma ser criptografado junto, o que fazer nas primeiras horas e quais medidas realmente reduzem o risco.",
    "date": "2026-08-12",
    "readTime": "12 min",
    "category": "Segurança"
  },
  {
    "slug": "phishing-como-identificar-golpes",
    "title": "Phishing: Como Identificar e Evitar Golpes por Email",
    "excerpt": "Reconheça tentativas de phishing e proteja seus dados.",
    "date": "2024-01-06",
    "readTime": "7 min",
    "category": "Segurança"
  },
  {
    "slug": "backup-nuvem-empresas-qual-escolher",
    "title": "Backup em nuvem para empresas: o que diferencia sincronização de backup de verdade",
    "excerpt": "Por que pasta sincronizada não é backup, quais critérios comparar antes de contratar, como estruturar cópias em camadas e o teste que revela se a rotina realmente funciona.",
    "date": "2026-08-12",
    "readTime": "11 min",
    "category": "Segurança"
  },
  {
    "slug": "preciso-de-um-plataforma-prestadores",
    "title": "Preciso de Um: A Plataforma Que Conecta Prestadores de Serviços a Clientes",
    "excerpt": "Conheça a plataforma que está revolucionando a forma como profissionais autônomos encontram clientes em todo o Brasil.",
    "date": "2026-04-08",
    "readTime": "8 min",
    "category": "Plataformas"
  },
  {
    "slug": "como-cadastrar-preciso-de-um",
    "title": "Como Se Cadastrar no Preciso de Um e Começar a Receber Clientes Hoje",
    "excerpt": "Passo a passo completo para profissionais de qualquer ramo se cadastrarem gratuitamente na plataforma.",
    "date": "2026-04-08",
    "readTime": "6 min",
    "category": "Plataformas"
  },
  {
    "slug": "preciso-de-um-todos-os-ramos",
    "title": "Preciso de Um Aceita Todos os Ramos: Eletricista, Pintor, Diarista e Muito Mais",
    "excerpt": "De construção civil a eventos, veja como profissionais de qualquer área podem participar e lucrar.",
    "date": "2026-04-08",
    "readTime": "7 min",
    "category": "Plataformas"
  },
  {
    "slug": "preciso-de-um-vagas-oportunidades",
    "title": "Vagas e Oportunidades no Preciso de Um: Como Encontrar Trabalho Rápido",
    "excerpt": "A plataforma também oferece vagas de emprego e oportunidades de serviço. Veja como aproveitar.",
    "date": "2026-04-08",
    "readTime": "5 min",
    "category": "Plataformas"
  },
  {
    "slug": "por-que-todo-prestador-deve-estar-preciso-de-um",
    "title": "Por Que Todo Prestador de Serviço Deve Estar no Preciso de Um",
    "excerpt": "Visibilidade, credibilidade e clientes: os motivos para todo profissional se cadastrar agora.",
    "date": "2026-04-07",
    "readTime": "9 min",
    "category": "Plataformas"
  },
  {
    "slug": "como-trocar-pasta-termica-notebook",
    "title": "Troca de pasta térmica no notebook: quando faz sentido e como não errar",
    "excerpt": "O que a pasta térmica faz, como saber se ela é mesmo a causa do aquecimento, a sequência correta de remoção e aperto do dissipador e os erros que danificam a placa.",
    "date": "2026-08-12",
    "readTime": "11 min",
    "category": "Manutenção"
  },
  {
    "slug": "como-clonar-hd-para-ssd",
    "title": "Clonar HD para SSD: quando clonar, quando reinstalar e onde o processo falha",
    "excerpt": "A diferença real entre clonar e reinstalar, como saber se o disco de origem aguenta a clonagem, os pontos em que o processo trava e o que conferir antes de apagar o disco antigo.",
    "date": "2026-08-12",
    "readTime": "11 min",
    "category": "Manutenção"
  },
  {
    "slug": "como-testar-fonte-de-alimentacao-pc",
    "title": "Testar a fonte do PC: o que o teste prova, o que ele não prova e quando trocar",
    "excerpt": "Como separar defeito de fonte de defeito de placa antes de comprar peça: o que cada teste mede, por que fonte que liga pode estar ruim e quais sinais fecham a decisão de troca.",
    "date": "2026-08-12",
    "readTime": "10 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-limpar-notebook-por-dentro",
    "title": "Limpeza interna de notebook: o que muda de verdade e onde estão os riscos",
    "excerpt": "Como a poeira compromete a refrigeração de um notebook, o que dá para verificar sem abrir o equipamento, o que a limpeza interna resolve, o que ela não resolve e quais erros custam caro na bancada.",
    "date": "2026-08-12",
    "readTime": "11 min",
    "category": "Manutenção"
  },
  {
    "slug": "como-recuperar-dados-hd-defeituoso",
    "title": "Como Recuperar Dados de HD Defeituoso: Métodos e Ferramentas",
    "excerpt": "Técnicas profissionais para recuperar arquivos de discos com setores defeituosos.",
    "date": "2026-04-07",
    "readTime": "13 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-configurar-rede-wifi-empresarial",
    "title": "Como Configurar Rede Wi-Fi Empresarial: VLANs, QoS e Segurança",
    "excerpt": "Procedimento técnico para montar rede corporativa com segmentação e priorização de tráfego.",
    "date": "2026-04-07",
    "readTime": "14 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-diagnosticar-placa-mae-defeituosa",
    "title": "Placa-mãe defeituosa: como confirmar antes de trocar a peça errada",
    "excerpt": "Inspeção visual, teste mínimo e eliminação sistemática para distinguir falha de placa-mãe de falha de memória, fonte ou refrigeração — e quando reparo eletrônico ainda faz sentido.",
    "date": "2026-08-12",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-instalar-segundo-ssd-notebook",
    "title": "Segundo SSD no notebook: quando cabe, quando não cabe e o que muda",
    "excerpt": "Como descobrir se o notebook aceita um segundo disco, a diferença entre slot M.2 livre e caddy no lugar do leitor óptico, os limites de cada caminho e o que fazer depois da instalação.",
    "date": "2026-08-12",
    "readTime": "10 min",
    "category": "Manutenção"
  },
  {
    "slug": "como-crimpar-cabo-de-rede-rj45",
    "title": "Como Crimpar Cabo de Rede RJ45: Padrão T568A e T568B",
    "excerpt": "Procedimento técnico completo para crimpar cabos de rede Cat5e e Cat6 com testagem.",
    "date": "2026-04-08",
    "readTime": "8 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-configurar-bios-uefi-corretamente",
    "title": "Como Configurar BIOS/UEFI Corretamente: Guia Para Técnicos",
    "excerpt": "Boot order, XMP, Secure Boot, CSM, TPM — todas as configurações essenciais explicadas.",
    "date": "2026-04-08",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-montar-pc-do-zero-guia-completo",
    "title": "Como Montar um PC do Zero: Guia Técnico Passo a Passo",
    "excerpt": "Da escolha de componentes à primeira inicialização, com dicas para evitar erros comuns.",
    "date": "2026-04-08",
    "readTime": "15 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-instalar-linux-dual-boot-windows",
    "title": "Como Instalar Linux em Dual Boot com Windows: Procedimento Seguro",
    "excerpt": "Ubuntu, Mint ou Fedora ao lado do Windows sem perder dados. Procedimento passo a passo.",
    "date": "2026-04-08",
    "readTime": "10 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-configurar-backup-automatizado",
    "title": "Como Configurar Backup Automatizado: Local e Nuvem",
    "excerpt": "Procedimento técnico para implementar backup 3-2-1 com agendamento automático.",
    "date": "2026-04-08",
    "readTime": "9 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "preciso-de-um-para-eletricistas",
    "title": "Preciso de Um Para Eletricistas: Como Conseguir Mais Clientes",
    "excerpt": "Guia completo para eletricistas se cadastrarem e se destacarem na plataforma.",
    "date": "2026-04-08",
    "readTime": "7 min",
    "category": "Plataformas"
  },
  {
    "slug": "preciso-de-um-para-pintores-pedreiros",
    "title": "Preciso de Um Para Pintores e Pedreiros: Sua Vitrine Digital",
    "excerpt": "Como profissionais de construção e pintura podem atrair clientes pela plataforma.",
    "date": "2026-04-08",
    "readTime": "7 min",
    "category": "Plataformas"
  },
  {
    "slug": "preciso-de-um-para-tecnicos-informatica",
    "title": "Preciso de Um Para Técnicos em Informática: Amplie Sua Atuação",
    "excerpt": "Como técnicos de TI podem usar a plataforma para expandir a carteira de clientes.",
    "date": "2026-04-08",
    "readTime": "7 min",
    "category": "Plataformas"
  },
  {
    "slug": "como-configurar-servidor-de-arquivos",
    "title": "Como Configurar Servidor de Arquivos em Rede Local (Windows e Linux)",
    "excerpt": "Procedimento técnico completo para montar um file server com permissões, mapeamento e backup.",
    "date": "2026-04-13",
    "readTime": "14 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-fazer-manutencao-impressora",
    "title": "Como Fazer Manutenção em Impressora: Jato de Tinta e Laser",
    "excerpt": "Limpeza de cabeçote, troca de toner, reset de contador e diagnóstico de falhas comuns.",
    "date": "2026-04-13",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-configurar-vpn-empresarial",
    "title": "Como Configurar VPN Empresarial: Acesso Remoto Seguro",
    "excerpt": "Procedimento técnico para implementar VPN com WireGuard, OpenVPN e Windows Server.",
    "date": "2026-04-13",
    "readTime": "13 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-configurar-firewall-pfsense",
    "title": "Como Configurar Firewall pfSense: Guia Completo Para Redes Empresariais",
    "excerpt": "Instalação, regras de firewall, NAT, VPN e monitoramento com pfSense.",
    "date": "2026-04-13",
    "readTime": "16 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-montar-rack-de-rede",
    "title": "Como Montar um Rack de Rede Profissional: Guia Técnico Completo",
    "excerpt": "Escolha do rack, organização de cabos, patch panel, switch e ventilação.",
    "date": "2026-04-13",
    "readTime": "14 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-configurar-active-directory",
    "title": "Como Configurar Active Directory no Windows Server: Passo a Passo",
    "excerpt": "Instalação do AD DS, criação de domínio, GPOs e integração com estações.",
    "date": "2026-04-13",
    "readTime": "15 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-fazer-manutencao-nobreak",
    "title": "Como Fazer Manutenção em Nobreak: Testes, Troca de Bateria e Calibração",
    "excerpt": "Procedimento para manter nobreaks funcionando: testes, troca de bateria e calibração.",
    "date": "2026-04-13",
    "readTime": "12 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-fazer-upgrade-ssd-nvme",
    "title": "Upgrade para SSD NVMe: quando compensa e como é feito",
    "excerpt": "Como saber se a sua placa aceita NVMe, o que muda de verdade no uso diário e quais são as etapas do serviço feito em bancada.",
    "date": "2026-04-20",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-recuperar-dados-hd-com-defeito",
    "title": "Recuperação de dados de HD com defeito: o que é possível",
    "excerpt": "Como diferenciar falha lógica de falha mecânica, o que fazer nos primeiros minutos e por que insistir em ligar o disco reduz a chance de recuperar.",
    "date": "2026-04-20",
    "readTime": "12 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-trocar-tela-notebook-passo-a-passo",
    "title": "Como Trocar a Tela do Notebook: Passo a Passo Profissional",
    "excerpt": "Guia técnico para identificar a tela correta, desmontar com segurança e instalar a nova sem danificar o flat cable.",
    "date": "2026-04-20",
    "readTime": "10 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-fazer-backup-completo-windows-11",
    "title": "Como Fazer Backup Completo do Windows 11: Imagem do Sistema e Arquivos",
    "excerpt": "Procedimento técnico para backup de imagem (Acronis, Macrium) e backup incremental de arquivos críticos.",
    "date": "2026-04-20",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-instalar-windows-11-do-zero",
    "title": "Como preparar uma instalação limpa do Windows 11",
    "excerpt": "Entenda backup, requisitos, mídia oficial, licença, drivers e riscos antes de fazer uma instalação limpa do Windows 11.",
    "date": "2026-04-20",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-resolver-tela-azul-windows",
    "title": "Como Resolver Tela Azul do Windows (BSOD): Diagnóstico e Solução",
    "excerpt": "Análise de códigos de erro, dump de memória, drivers problemáticos e procedimento profissional de correção.",
    "date": "2026-04-20",
    "readTime": "10 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-fazer-overclock-cpu-com-seguranca",
    "title": "Como Fazer Overclock de CPU com Segurança: Procedimento Técnico",
    "excerpt": "Passo a passo para overclock estável: voltagem, temperatura, stress test e estabilidade de longo prazo.",
    "date": "2026-04-20",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-montar-pc-gamer-2026",
    "title": "Como Montar um PC Gamer em 2026: Guia Técnico Completo",
    "excerpt": "Escolha de componentes, montagem física, cable management, instalação de SO e otimização para jogos.",
    "date": "2026-04-20",
    "readTime": "13 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-criar-script-bash-iniciantes",
    "title": "Como Criar Scripts Bash no Linux: Guia Para Iniciantes e Técnicos",
    "excerpt": "Variáveis, loops, condicionais e funções em Bash — automatize tarefas repetitivas no servidor ou desktop.",
    "date": "2026-04-20",
    "readTime": "11 min",
    "category": "Linux"
  },
  {
    "slug": "como-monitorar-servidor-linux",
    "title": "Como Monitorar Servidor Linux: htop, Glances, Netdata e Prometheus",
    "excerpt": "Ferramentas profissionais de monitoramento de CPU, memória, disco, rede e processos em servidores Linux.",
    "date": "2026-04-20",
    "readTime": "12 min",
    "category": "Linux"
  },
  {
    "slug": "como-configurar-cron-jobs-linux",
    "title": "Como Configurar Cron Jobs no Linux: Agendamento de Tarefas",
    "excerpt": "Sintaxe do crontab, exemplos práticos, debug e boas práticas para agendar backups, scripts e manutenção.",
    "date": "2026-04-20",
    "readTime": "10 min",
    "category": "Linux"
  },
  {
    "slug": "como-instalar-postgresql-linux",
    "title": "Como Instalar e Configurar PostgreSQL no Linux: Guia Profissional",
    "excerpt": "Instalação, criação de usuários, permissões, backup, restore e tuning básico do PostgreSQL no Ubuntu/Debian.",
    "date": "2026-04-20",
    "readTime": "12 min",
    "category": "Linux"
  },
  {
    "slug": "como-usar-systemd-linux",
    "title": "Como Usar systemd no Linux: Serviços, Logs e Boot Otimizado",
    "excerpt": "Criar serviços customizados, gerenciar logs com journalctl e otimizar o tempo de boot do Linux.",
    "date": "2026-04-20",
    "readTime": "11 min",
    "category": "Linux"
  },
  {
    "slug": "como-configurar-rede-linux-netplan",
    "title": "Como Configurar Rede no Linux com Netplan: Guia Completo",
    "excerpt": "IP estático, DHCP, múltiplas interfaces, bridge, bonding e VLAN em servidores Ubuntu/Debian modernos.",
    "date": "2026-04-20",
    "readTime": "10 min",
    "category": "Linux"
  },
  {
    "slug": "como-instalar-lamp-stack-ubuntu",
    "title": "Como Instalar LAMP Stack no Ubuntu: Apache, MySQL e PHP",
    "excerpt": "Procedimento técnico completo para configurar stack LAMP em servidor Ubuntu de produção com segurança.",
    "date": "2026-04-20",
    "readTime": "12 min",
    "category": "Linux"
  },
  {
    "slug": "como-usar-rsync-backup-linux",
    "title": "Como Usar rsync Para Backup no Linux: Guia Definitivo",
    "excerpt": "Sincronização local e remota, backup incremental, exclusões e automação com cron — o canivete suíço do sysadmin.",
    "date": "2026-04-20",
    "readTime": "11 min",
    "category": "Linux"
  },
  {
    "slug": "como-criar-prompts-eficazes-chatgpt",
    "title": "Como Criar Prompts Eficazes Para ChatGPT: Guia Profissional",
    "excerpt": "Técnicas avançadas de engenharia de prompt: contexto, persona, exemplos e refinamento iterativo de respostas.",
    "date": "2026-04-20",
    "readTime": "11 min",
    "category": "Inteligência Artificial"
  },
  {
    "slug": "melhores-ias-para-programacao-2026",
    "title": "Melhores IAs Para Programação em 2026: Copilot, Cursor, Claude e Mais",
    "excerpt": "Comparativo das principais IAs para desenvolvedores: assistentes de código, geração de testes e refatoração.",
    "date": "2026-04-20",
    "readTime": "12 min",
    "category": "Inteligência Artificial"
  },
  {
    "slug": "como-rodar-ia-localmente-no-pc",
    "title": "Como Rodar IA Localmente no PC: Ollama, LM Studio e LLMs Open Source",
    "excerpt": "Procedimento técnico para executar modelos de linguagem (Llama, Mistral, Phi) localmente sem depender da nuvem.",
    "date": "2026-04-20",
    "readTime": "12 min",
    "category": "Inteligência Artificial"
  },
  {
    "slug": "como-criar-imagens-com-stable-diffusion",
    "title": "Como Criar Imagens com Stable Diffusion: Instalação e Prompts",
    "excerpt": "Guia técnico para instalar Stable Diffusion (Automatic1111, ComfyUI) e gerar imagens profissionais localmente.",
    "date": "2026-04-20",
    "readTime": "11 min",
    "category": "Inteligência Artificial"
  },
  {
    "slug": "automatizar-tarefas-com-ia-n8n-make",
    "title": "Como Automatizar Tarefas com IA: n8n, Make e Zapier",
    "excerpt": "Crie automações poderosas conectando IA a planilhas, e-mails, WhatsApp e CRMs sem precisar programar.",
    "date": "2026-04-20",
    "readTime": "11 min",
    "category": "Inteligência Artificial"
  },
  {
    "slug": "ia-para-criacao-conteudo-profissional",
    "title": "Como Usar IA Para Criação de Conteúdo Profissional",
    "excerpt": "Workflow real de criação de textos, imagens, vídeos e áudios com IA mantendo qualidade e originalidade.",
    "date": "2026-04-20",
    "readTime": "10 min",
    "category": "Inteligência Artificial"
  },
  {
    "slug": "diferenca-llm-machine-learning-deep-learning",
    "title": "Diferença Entre LLM, Machine Learning e Deep Learning Explicada",
    "excerpt": "Entenda os fundamentos técnicos por trás da IA moderna sem complicação — conceitos, exemplos e aplicações reais.",
    "date": "2026-04-20",
    "readTime": "10 min",
    "category": "Inteligência Artificial"
  },
  {
    "slug": "como-treinar-ia-customizada-fine-tuning",
    "title": "Como Treinar uma IA Customizada: Fine-Tuning e RAG Explicados",
    "excerpt": "Procedimento técnico para customizar modelos de IA com seus próprios dados via fine-tuning ou retrieval augmented generation.",
    "date": "2026-04-20",
    "readTime": "12 min",
    "category": "Inteligência Artificial"
  },
  {
    "slug": "como-configurar-firewall-ufw-linux",
    "title": "Como Configurar Firewall UFW no Linux: Guia Definitivo",
    "excerpt": "Configuração de regras, portas, serviços e logs do UFW para proteger servidores e desktops Linux.",
    "date": "2026-04-20",
    "readTime": "10 min",
    "category": "Segurança e Redes"
  },
  {
    "slug": "como-proteger-rede-wifi-empresa",
    "title": "Como Proteger a Rede Wi-Fi da Sua Empresa: Guia Técnico",
    "excerpt": "WPA3, segregação de redes (VLAN), captive portal, RADIUS e monitoramento — segurança real para SMB.",
    "date": "2026-04-20",
    "readTime": "12 min",
    "category": "Segurança e Redes"
  },
  {
    "slug": "como-detectar-invasao-rede",
    "title": "Como Detectar Invasão na Rede: IDS/IPS, Logs e Análise de Tráfego",
    "excerpt": "Ferramentas e procedimentos para identificar atividades suspeitas: Suricata, Wireshark, fail2ban e análise forense.",
    "date": "2026-04-20",
    "readTime": "12 min",
    "category": "Segurança e Redes"
  },
  {
    "slug": "como-configurar-2fa-em-tudo",
    "title": "Como Configurar 2FA (Autenticação de Dois Fatores) em Tudo",
    "excerpt": "Guia prático para ativar 2FA em e-mail, redes sociais, bancos, servidores e aplicações empresariais.",
    "date": "2026-04-20",
    "readTime": "10 min",
    "category": "Segurança e Redes"
  },
  {
    "slug": "melhores-antivirus-2026-comparativo",
    "title": "Melhores Antivírus em 2026: Comparativo Real Para Casa e Empresa",
    "excerpt": "Análise técnica de Bitdefender, Kaspersky, ESET, Windows Defender e mais — qual realmente protege.",
    "date": "2026-04-20",
    "readTime": "11 min",
    "category": "Segurança e Redes"
  },
  {
    "slug": "como-configurar-vlan-rede-corporativa",
    "title": "Como Configurar VLAN em Rede Corporativa: Guia Profissional",
    "excerpt": "Segmentação de rede com VLAN: configuração em switches gerenciáveis, trunking e roteamento entre VLANs.",
    "date": "2026-04-20",
    "readTime": "12 min",
    "category": "Segurança e Redes"
  },
  {
    "slug": "como-fazer-pentest-basico-rede",
    "title": "Como Fazer Pentest Básico na Sua Rede: Ferramentas e Procedimento",
    "excerpt": "Introdução prática a nmap, Nessus, OpenVAS e Metasploit para testar a segurança da própria infraestrutura.",
    "date": "2026-04-20",
    "readTime": "13 min",
    "category": "Segurança e Redes"
  },
  {
    "slug": "como-recuperar-conta-hackeada",
    "title": "Como Recuperar Conta Hackeada: Procedimento de Emergência",
    "excerpt": "Passo a passo profissional para recuperar contas de Gmail, Instagram, WhatsApp e bancos comprometidas.",
    "date": "2026-04-20",
    "readTime": "10 min",
    "category": "Segurança e Redes"
  },
  {
    "slug": "como-deixar-windows-11-mais-rapido-iniciantes",
    "title": "Como Deixar o Windows 11 Mais Rápido em 2026: Guia Passo a Passo (Curitiba)",
    "excerpt": "PC lento em Curitiba? Aprenda como acelerar o Windows 11 com 5 passos simples — sem instalar nada e sem risco de quebrar o computador.",
    "date": "2026-04-29",
    "readTime": "8 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-fazer-backup-fotos-windows-iniciantes",
    "title": "Como Fazer Backup de Fotos no Windows 11: 3 Métodos Seguros (Guia 2026)",
    "excerpt": "Aprenda como fazer backup das suas fotos no Windows usando pendrive, OneDrive ou Google Fotos. Atendimento técnico em Curitiba se precisar de ajuda.",
    "date": "2026-04-29",
    "readTime": "7 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-instalar-impressora-windows-passo-a-passo",
    "title": "Instalar impressora no Windows: por que ela some da rede e como deixar a instalação estável",
    "excerpt": "O que muda entre instalar por cabo e instalar em rede, por que a impressora desaparece depois de reiniciar o roteador e como fixar o endereço para a instalação parar de se perder.",
    "date": "2026-08-12",
    "readTime": "11 min",
    "category": "Redes"
  },
  {
    "slug": "como-remover-virus-windows-iniciantes",
    "title": "Remover vírus e adware do Windows: o que funciona, o que só disfarça",
    "excerpt": "Como reconhecer infecção de verdade, limpar sem quebrar o sistema, entender por que o problema volta e saber a hora em que remoção deixa de ser a resposta certa.",
    "date": "2026-08-12",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-organizar-arquivos-windows-iniciantes",
    "title": "Como Organizar Arquivos no Windows 11: Método Simples Para Achar Tudo Rápido",
    "excerpt": "Aprenda como organizar pastas, documentos e fotos no Windows 11 com um método prático que nunca mais vai te deixar perder arquivos.",
    "date": "2026-04-29",
    "readTime": "6 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-atualizar-windows-corretamente",
    "title": "Como Atualizar o Windows 11 Sem Travar: Guia Seguro 2026",
    "excerpt": "Atualização do Windows travando ou dando erro? Aprenda como atualizar o Windows 11 corretamente. Suporte técnico em Curitiba se precisar.",
    "date": "2026-04-29",
    "readTime": "6 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-recuperar-arquivos-apagados-windows",
    "title": "Como Recuperar Arquivos Apagados no Windows 11: 3 Métodos Que Funcionam",
    "excerpt": "Apagou um arquivo importante? Aprenda como recuperar arquivos deletados no Windows com Recuva, lixeira e histórico. Recuperação profissional em Curitiba.",
    "date": "2026-04-29",
    "readTime": "7 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-trocar-papel-de-parede-tela-bloqueio-windows",
    "title": "Como Trocar Papel de Parede e Tela de Bloqueio no Windows 11 (2026)",
    "excerpt": "Personalize seu Windows 11 com fotos suas. Veja como trocar o papel de parede e a tela de bloqueio em 3 cliques.",
    "date": "2026-04-29",
    "readTime": "4 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-criar-conta-usuario-windows-criancas",
    "title": "Como Criar Conta de Usuário Para Crianças no Windows 11 (Controle Parental)",
    "excerpt": "Aprenda como criar uma conta infantil no Windows 11 com controle parental, limite de tempo e bloqueio de sites. Configuração ajudada em Curitiba.",
    "date": "2026-04-29",
    "readTime": "7 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-imprimir-pdf-windows",
    "title": "Como Salvar em PDF no Windows 11 Sem Programa: Guia Completo 2026",
    "excerpt": "Aprenda como salvar qualquer página, e-mail ou documento em PDF no Windows 11 sem instalar nada. Funciona em qualquer impressora virtual.",
    "date": "2026-04-29",
    "readTime": "5 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-deixar-celular-android-mais-rapido",
    "title": "Celular Android lento: o que realmente testar antes de instalar um app de limpeza",
    "excerpt": "Apps de limpeza não consertam todo tipo de lentidão. Veja como separar falta de espaço, aplicativo com falha, atualização pendente e limite do aparelho sem apagar dados por impulso.",
    "date": "2026-08-31",
    "readTime": "10 min",
    "category": "Celular e aplicativos"
  },
  {
    "slug": "como-economizar-bateria-celular",
    "title": "Como Economizar Bateria do Celular: 12 Ajustes Reais (Android e iPhone 2026)",
    "excerpt": "Bateria do celular acabando rápido? Aprenda como economizar bateria com 12 ajustes que dobram a autonomia — Android e iPhone.",
    "date": "2026-04-29",
    "readTime": "8 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-fazer-backup-celular-android",
    "title": "Como Fazer Backup do Celular Android Completo: Fotos, Contatos e WhatsApp (2026)",
    "excerpt": "Aprenda como fazer backup do Android em 15 minutos: fotos, contatos, WhatsApp e configurações. Ajuda profissional em Curitiba se precisar.",
    "date": "2026-04-29",
    "readTime": "8 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-conectar-celular-tv",
    "title": "Como Conectar o Celular na TV: 4 Formas Que Funcionam em 2026 (Com e Sem Cabo)",
    "excerpt": "Aprenda como espelhar o celular na Smart TV usando Chromecast, HDMI, Miracast ou AirPlay. Funciona com Android e iPhone.",
    "date": "2026-04-29",
    "readTime": "6 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-bloquear-numero-celular",
    "title": "Como Bloquear Número de Telemarketing no Celular: Android e iPhone (2026)",
    "excerpt": "Cansado de ligações de telemarketing e spam? Aprenda como bloquear números no celular um a um ou em lista. Funciona em qualquer aparelho.",
    "date": "2026-04-29",
    "readTime": "5 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-usar-google-fotos-iniciantes",
    "title": "Como Usar o Google Fotos em 2026: Guia Completo Para Iniciantes",
    "excerpt": "Aprenda como usar o Google Fotos para fazer backup automático, organizar e editar fotos do celular. Tutorial passo a passo para qualquer idade.",
    "date": "2026-04-29",
    "readTime": "8 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-instalar-aplicativos-celular-com-seguranca",
    "title": "Como Instalar Aplicativos no Celular Com Segurança: Evite Vírus e Golpes (2026)",
    "excerpt": "Aprenda como instalar apps no Android e iPhone com segurança, evitando vírus, apps falsos e golpes. Atendimento de suporte em Curitiba.",
    "date": "2026-04-29",
    "readTime": "6 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-transferir-dados-celular-novo",
    "title": "Como Transferir Dados Para Celular Novo: Android e iPhone (Guia 2026)",
    "excerpt": "Comprou celular novo? Aprenda como transferir contatos, fotos, WhatsApp e apps do celular antigo para o novo, sem perder nada.",
    "date": "2026-04-29",
    "readTime": "8 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-fazer-print-tela-celular",
    "title": "Como Tirar Print no Celular: Android, iPhone e Print Rolando (Guia 2026)",
    "excerpt": "Aprenda como tirar screenshot no celular Android e iPhone, incluindo print de página inteira (rolando). Atalhos de todas as marcas.",
    "date": "2026-04-29",
    "readTime": "4 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-recuperar-conta-google-bloqueada",
    "title": "Como Recuperar Conta Google Bloqueada ou Esquecida: Guia Oficial 2026",
    "excerpt": "Esqueceu a senha do Gmail ou conta foi hackeada? Veja o passo a passo oficial para recuperar a conta Google. Suporte técnico em Curitiba.",
    "date": "2026-04-29",
    "readTime": "7 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-melhorar-sinal-wifi-em-casa",
    "title": "Wi-Fi caindo ou com sinal fraco: como diagnosticar",
    "excerpt": "Wi-Fi que cai, fica lento ou não chega em alguns cômodos? Veja como separar problema da rede local e falha da operadora.",
    "date": "2026-04-29",
    "readTime": "9 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-configurar-roteador-wifi-iniciantes",
    "title": "Como configurar um roteador Wi-Fi do zero, sem complicação",
    "excerpt": "Ordem correta das etapas, o que mudar na primeira configuração e os ajustes que evitam a maior parte dos problemas de sinal depois.",
    "date": "2026-04-22",
    "readTime": "11 min",
    "category": "Redes e Wi-Fi"
  },
  {
    "slug": "como-trocar-senha-wifi",
    "title": "Como Trocar a Senha do Wi-Fi: Passo a Passo Para Qualquer Roteador (2026)",
    "excerpt": "Vizinho usando seu Wi-Fi? Aprenda como trocar a senha do Wi-Fi em 5 minutos em qualquer roteador (TP-Link, Intelbras, Vivo, Claro).",
    "date": "2026-04-29",
    "readTime": "5 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-usar-rede-wifi-para-visitas",
    "title": "Como Criar Rede Wi-Fi de Visitantes: Proteja Sua Senha Principal (2026)",
    "excerpt": "Aprenda como criar uma rede Wi-Fi separada para visitas em qualquer roteador, sem dar a senha principal. Configuração ajudada em Curitiba.",
    "date": "2026-04-29",
    "readTime": "5 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-configurar-repetidor-wifi",
    "title": "Como Configurar Repetidor de Wi-Fi: Passo a Passo Simples (Guia 2026)",
    "excerpt": "Comprou um repetidor de Wi-Fi mas não sabe instalar? Aprenda como configurar em 10 minutos. Instalação profissional em Curitiba se preferir.",
    "date": "2026-04-29",
    "readTime": "6 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-saber-quem-esta-usando-meu-wifi",
    "title": "Como saber quem está usando o seu Wi-Fi (e o que fazer)",
    "excerpt": "Como listar os dispositivos conectados, identificar cada um pelo nome e pelo endereço físico e retomar o controle da rede sem quebrar o que funciona.",
    "date": "2026-04-22",
    "readTime": "10 min",
    "category": "Redes e Wi-Fi"
  },
  {
    "slug": "como-conectar-wifi-tv-nao-conecta",
    "title": "Smart TV não conecta no Wi-Fi: como separar problema de rede de defeito da TV",
    "excerpt": "Como descobrir se a Smart TV não conecta por causa da rede, da faixa de 5 GHz, do isolamento do roteador ou de falha no módulo Wi-Fi do aparelho — e o que fazer em cada caso.",
    "date": "2026-08-12",
    "readTime": "11 min",
    "category": "Redes"
  },
  {
    "slug": "como-fazer-teste-velocidade-internet",
    "title": "Como Testar a Velocidade da Internet Corretamente: Guia 2026",
    "excerpt": "Internet lenta em Curitiba? Aprenda como fazer um teste de velocidade confiável e descobrir se o problema é da operadora ou do seu Wi-Fi.",
    "date": "2026-04-29",
    "readTime": "5 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-bloquear-acesso-internet-criancas",
    "title": "Como Bloquear Internet em Horários Específicos: Controle Parental no Roteador (2026)",
    "excerpt": "Filhos online o dia inteiro? Aprenda como bloquear o Wi-Fi em horários no próprio roteador, sem instalar app. Configuração ajudada em Curitiba.",
    "date": "2026-04-29",
    "readTime": "6 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-mudar-nome-rede-wifi",
    "title": "Como Mudar o Nome da Rede Wi-Fi (SSID): Passo a Passo 2026",
    "excerpt": "Aprenda como trocar o nome da sua rede Wi-Fi (SSID) em qualquer roteador — TP-Link, Intelbras, Vivo, Claro, Oi. Tutorial em 5 minutos.",
    "date": "2026-04-29",
    "readTime": "4 min",
    "category": "Tutoriais Domésticos"
  },
  {
    "slug": "como-formatar-pc-sem-perder-arquivos",
    "title": "Como formatar o PC ou notebook sem perder arquivos",
    "excerpt": "O que decidir antes de formatar: quando a reinstalação resolve, quando não resolve, como preservar arquivos, contas e licenças, e a diferença entre redefinir o sistema e instalar do zero.",
    "date": "2026-08-14",
    "readTime": "12 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "quanto-custa-formatar-um-computador",
    "title": "Quanto custa formatar um computador?",
    "excerpt": "O que entra no valor de uma formatação: tempo técnico, modalidade de atendimento, backup, licença e peças. Os valores praticados aqui e o que não está incluso.",
    "date": "2026-08-14",
    "readTime": "8 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "o-que-e-informatica",
    "title": "O que é informática? Definição completa em português",
    "excerpt": "Entenda o que é informática, para que serve, onde é aplicada e qual a diferença entre informática, computação e TI. Guia nacional em português.",
    "date": "2026-08-15",
    "readTime": "10 min",
    "category": "Fundamentos"
  },
  {
    "slug": "informatica-basica",
    "title": "Informática Básica: O Que É, O Que Ensina e Por Onde Começar",
    "excerpt": "Saiba o que é informática básica, o que se aprende, para que serve e como estudar do zero. Conteúdo nacional em português, sem filler.",
    "date": "2026-08-15",
    "readTime": "12 min",
    "category": "Fundamentos"
  },
  {
    "slug": "como-aprender-informatica",
    "title": "Como Aprender Informática do Zero: Guia Prático para Iniciantes",
    "excerpt": "Descubra como aprender informática do zero, em casa, para concurso ou trabalho. Roteiro prático, recursos gratuitos e dicas de estudo.",
    "date": "2026-08-15",
    "readTime": "13 min",
    "category": "Fundamentos"
  },
  {
    "slug": "computador-entra-direto-na-bios",
    "title": "Meu computador entra direto na BIOS: guia de diagnóstico e solução",
    "excerpt": "Por que o PC abre a tela de configuração em vez do Windows: disco não detectado, conflito UEFI/Legacy (CSM), bateria CMOS e Fast Boot. Diagnóstico em ordem.",
    "date": "2026-08-25",
    "readTime": "14 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "erro-no-bootable-device-como-resolver",
    "title": "Erro \"No Bootable Device\" ou \"Boot Device Not Found\": como resolver",
    "excerpt": "A BIOS reconhece o disco, mas o sistema não inicia. Como conferir a ordem de prioridade, identificar partição EFI ausente e reparar o boot do Windows pelo CMD.",
    "date": "2026-08-25",
    "readTime": "12 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "troquei-o-ssd-e-o-pc-so-abre-a-bios",
    "title": "Troquei o HD/SSD e o PC só abre a BIOS: o que fazer",
    "excerpt": "Disco novo vem vazio: sem sistema instalado, o computador para no Setup. Como confirmar a detecção do M.2, resolver conflito de portas e instalar o Windows do zero.",
    "date": "2026-08-25",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "limpar-arquivos-temporarios-windows",
    "title": "Como limpar arquivos temporários e liberar espaço no Windows",
    "excerpt": "Onde o Windows guarda arquivos temporários, quanto isso realmente pesa no desempenho e como limpar com segurança — sem programas de faxina e sem apagar o que faz falta.",
    "date": "2026-08-25",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "memoria-ram-insuficiente-sintomas",
    "title": "Memória RAM insuficiente: sintomas, como confirmar e quando fazer upgrade",
    "excerpt": "Como distinguir falta de memória de disco lento ou vírus, ler o Gerenciador de Tarefas sem se enganar e decidir se o upgrade de RAM resolve o seu caso.",
    "date": "2026-08-25",
    "readTime": "12 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "codigos-de-erro-tela-azul-windows",
    "title": "Códigos de erro da tela azul: como ler e o que cada um indica",
    "excerpt": "O que significam MEMORY_MANAGEMENT, IRQL_NOT_LESS_OR_EQUAL, CRITICAL_PROCESS_DIED e outros códigos — e como usá-los para separar defeito de driver, memória ou disco.",
    "date": "2026-08-25",
    "readTime": "13 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "testar-memoria-ram-memtest86",
    "title": "Como testar a memória RAM com Memtest86+ (passo a passo)",
    "excerpt": "Quando testar a memória, como criar a mídia de inicialização, quantas passagens fazer e como interpretar erros para saber qual módulo trocar.",
    "date": "2026-08-25",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "botao-power-nao-funciona-jump-start-placa-mae",
    "title": "Botão power não funciona: como ligar o PC pelo conector da placa-mãe",
    "excerpt": "Como separar defeito do botão frontal de falha de fonte ou placa, e como acionar a partida pelo conector do painel frontal para confirmar o diagnóstico.",
    "date": "2026-08-26",
    "readTime": "9 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "curto-circuito-placa-mae-como-identificar",
    "title": "Curto-circuito na placa-mãe: como identificar e isolar o problema",
    "excerpt": "Como reconhecer um curto de alimentação, isolar componente por componente com o teste fora do gabinete e saber quando o reparo deixa de ser viável.",
    "date": "2026-08-26",
    "readTime": "10 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "bios-corrompida-reset-cmos-atualizacao",
    "title": "BIOS corrompida: reset de CMOS e recuperação de firmware",
    "excerpt": "Quando o reset de CMOS resolve, como fazer pelo jumper ou pela bateria e o que muda quando o firmware realmente corrompeu durante uma atualização.",
    "date": "2026-08-26",
    "readTime": "10 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "internet-lenta-provedor-ou-roteador",
    "title": "Internet lenta: é o provedor ou o seu roteador?",
    "excerpt": "Como separar, com dois testes objetivos, a lentidão que vem da operadora da lentidão que nasce dentro de casa — e o que fazer em cada caso.",
    "date": "2026-08-26",
    "readTime": "9 min",
    "category": "Redes e Wi-Fi"
  },
  {
    "slug": "impressora-offline-como-resolver",
    "title": "Impressora offline: por que aparece assim e como resolver",
    "excerpt": "O que o status \"offline\" realmente significa no Windows, a diferença entre endereço perdido e fila travada e a sequência de verificação que resolve sem reinstalar nada.",
    "date": "2026-08-26",
    "readTime": "9 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "fila-de-impressao-travada-spooler-windows",
    "title": "Fila de impressão travada: como destravar o spooler do Windows",
    "excerpt": "O que é o serviço de spooler, por que a fila trava com documentos presos em \"excluindo\" e o procedimento correto para limpar sem reinstalar a impressora.",
    "date": "2026-08-26",
    "readTime": "8 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "hd-nao-e-reconhecido-na-bios-o-que-fazer",
    "title": "HD ou SSD não é reconhecido na BIOS: o que verificar antes de trocar",
    "excerpt": "Quando o disco some do Setup, o problema quase nunca é o Windows. Sequência de verificação por energia, cabo, porta e detecção — e o que NÃO fazer quando há dados importantes.",
    "date": "2026-08-26",
    "readTime": "10 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "ssd-nvme-nao-aparece-no-gerenciador-de-discos",
    "title": "SSD aparece na BIOS mas não no Windows: como inicializar o disco",
    "excerpt": "Disco novo chega sem inicialização, sem partição e sem letra. O que fazer no Gerenciamento de Disco, como escolher GPT ou MBR e o cuidado antes de mexer em disco com dados.",
    "date": "2026-08-26",
    "readTime": "9 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "disco-com-setores-defeituosos-smart-o-que-fazer",
    "title": "Setores defeituosos e SMART com alerta: o que fazer (e o que não fazer)",
    "excerpt": "Como ler os indicadores SMART, por que CHKDSK não é a resposta padrão para disco suspeito de falha física e qual é a ordem correta: copiar primeiro, investigar depois.",
    "date": "2026-08-26",
    "readTime": "10 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "computador-sem-som-o-que-verificar",
    "title": "Computador sem som: sequência de verificação do alto-falante ao driver",
    "excerpt": "Do volume e do dispositivo de saída errado até driver e conector: como isolar a causa do silêncio no Windows sem reinstalar o sistema.",
    "date": "2026-08-26",
    "readTime": "9 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "fone-de-ouvido-nao-e-reconhecido-no-pc",
    "title": "Fone de ouvido não é reconhecido no PC: entrada frontal, detecção e microfone",
    "excerpt": "Por que o fone toca na entrada de trás e não na da frente, o que é detecção de conector, a diferença entre P2 combo e duas entradas e como resolver o microfone mudo.",
    "date": "2026-08-26",
    "readTime": "8 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "servico-de-audio-do-windows-nao-esta-em-execucao",
    "title": "Serviço de áudio do Windows não está em execução: como reativar",
    "excerpt": "O que são os serviços Windows Audio e Audio Endpoint Builder, como reiniciá-los na ordem correta, quando reinstalar o driver e como distinguir falha de serviço de falha de hardware.",
    "date": "2026-08-26",
    "readTime": "8 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "webcam-nao-funciona-o-que-verificar",
    "title": "Webcam não funciona: como separar privacidade, aplicativo, driver e hardware",
    "excerpt": "Cinco perguntas isolam a causa quando a câmera não funciona: ela existe no sistema, o Windows libera, o aplicativo tem permissão, o driver está sadio ou o módulo falhou.",
    "date": "2026-08-26",
    "readTime": "10 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "permissoes-de-camera-no-windows",
    "title": "Permissões de câmera no Windows: quando é o sistema que bloqueia e quando é o aplicativo",
    "excerpt": "Acesso global, acesso por aplicativo, programas de área de trabalho e permissão de site no navegador são camadas diferentes. Entender qual está fechada resolve a maioria dos casos de câmera bloqueada.",
    "date": "2026-08-26",
    "readTime": "8 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "webcam-usb-nao-e-detectada",
    "title": "Webcam USB não é detectada: porta, cabo, alimentação e driver",
    "excerpt": "Roteiro de eliminação para webcam externa que o Windows não enxerga: teste de porta, hub sem alimentação, cabo, dispositivo desconhecido no Gerenciador e teste cruzado em outro computador.",
    "date": "2026-08-26",
    "readTime": "8 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "windows-update-nao-funciona-o-que-verificar",
    "title": "Windows Update não funciona: como descobrir em qual estágio a atualização falha",
    "excerpt": "Verificação, download, preparação, instalação e reinicialização são estágios distintos. Identificar onde a atualização para elimina metade dos procedimentos inúteis.",
    "date": "2026-08-26",
    "readTime": "11 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "limpar-cache-do-windows-update-softwaredistribution",
    "title": "Cache do Windows Update: o que é a SoftwareDistribution e como tratá-la sem risco",
    "excerpt": "A pasta guarda downloads e histórico do Update. Renomear é reversível, apagar não é. Quando o procedimento ajuda, o que ele custa e por que não é solução universal.",
    "date": "2026-08-26",
    "readTime": "9 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "windows-update-travado-desfazendo-alteracoes",
    "title": "Atualização travada e \"desfazendo alterações\": o que é reversão e o que fazer",
    "excerpt": "Como distinguir interface parada de processo realmente parado, por que o Windows reverte uma atualização e o que fazer antes de desligar a máquina no botão.",
    "date": "2026-08-26",
    "readTime": "9 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "boot-uefi-ou-legacy-como-identificar",
    "title": "UEFI ou Legacy: como identificar o modo de inicialização do seu PC",
    "excerpt": "Como descobrir em qual modo o Windows foi instalado, por que GPT e MBR importam e o que muda ao alternar entre UEFI e Legacy sem preparar o disco.",
    "date": "2026-08-31",
    "readTime": "9 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "ordem-de-boot-na-bios-como-configurar",
    "title": "Ordem de boot na BIOS: como configurar sem quebrar a inicialização",
    "excerpt": "Para que serve a prioridade de inicialização, quando usar o menu de boot temporário e por que Fast Boot e portas USB atrapalham o reconhecimento do pendrive.",
    "date": "2026-08-31",
    "readTime": "8 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "windows-reparo-automatico-em-loop",
    "title": "Reparo automático em laço: o que fazer quando o Windows não sai dessa tela",
    "excerpt": "Por que o Windows entra em reparo automático repetido, o que observar antes de tentar qualquer comando e em que ponto a prioridade passa a ser salvar os arquivos.",
    "date": "2026-08-31",
    "readTime": "10 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "manutencao-preventiva-de-computador-guia-completo",
    "title": "Manutenção preventiva de computador: o guia completo",
    "excerpt": "O que realmente precisa ser verificado, com que frequência e em que ordem — do calor e da poeira ao estado do armazenamento — sem trocar peça por precaução.",
    "date": "2026-09-03",
    "readTime": "12 min",
    "category": "Manutenção"
  },
  {
    "slug": "dispositivo-usb-nao-reconhecido-o-que-fazer",
    "title": "Dispositivo USB não reconhecido: como descobrir a causa",
    "excerpt": "Como separar defeito do aparelho, da porta, do cabo, da alimentação e do driver — em uma sequência de testes que não exige abrir o computador.",
    "date": "2026-09-03",
    "readTime": "11 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "como-testar-restauracao-de-backup",
    "title": "Como testar se o backup realmente funciona",
    "excerpt": "Cópia nunca restaurada é suposição. O roteiro de teste de restauração, o que registrar e os erros que só aparecem no dia em que o arquivo faz falta.",
    "date": "2026-09-03",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "como-monitorar-temperatura-do-computador",
    "title": "Como monitorar a temperatura do computador (e quando ela é problema)",
    "excerpt": "Quais temperaturas medir, o que é normal sob carga, como reconhecer throttling e em que ponto o calor deixa de ser característica e vira defeito.",
    "date": "2026-09-03",
    "readTime": "11 min",
    "category": "Manutenção"
  },
  {
    "slug": "pendrive-somente-leitura-protegido-contra-gravacao",
    "title": "Pendrive somente leitura: por que aparece \"protegido contra gravação\"",
    "excerpt": "Como separar trava física, política do sistema, sistema de arquivos danificado e memória em fim de vida — e por que copiar os arquivos vem antes de qualquer tentativa de conserto.",
    "date": "2026-09-03",
    "readTime": "10 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "historico-de-arquivos-windows-como-configurar",
    "title": "Histórico de Arquivos do Windows: como configurar versões de verdade",
    "excerpt": "O recurso nativo que guarda versões anteriores dos seus arquivos: o que ele cobre, o que ele não cobre e como configurá-lo sem confundir versionamento com backup completo.",
    "date": "2026-09-03",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "monitor-sem-sinal-o-que-verificar",
    "title": "Monitor sem sinal: o que verificar antes de trocar de peça",
    "excerpt": "\"Sem sinal\" na tela não quer dizer monitor queimado. A sequência para separar cabo, entrada errada, saída de vídeo e computador que nem chegou a iniciar.",
    "date": "2026-09-03",
    "readTime": "10 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "bateria-de-notebook-nao-carrega-o-que-verificar",
    "title": "Bateria de notebook não carrega: o que verificar antes de comprar outra",
    "excerpt": "\"Conectado, não carregando\" tem mais de uma causa. Como separar fonte, conector, bateria em fim de vida e limite de carga configurado — sem trocar peça no escuro.",
    "date": "2026-09-03",
    "readTime": "11 min",
    "category": "Manutenção"
  },
  {
    "slug": "como-migrar-arquivos-para-um-computador-novo",
    "title": "Como migrar arquivos para um computador novo sem perder nada",
    "excerpt": "Inventário, método de transferência, conferência e só então o descarte do equipamento antigo. O roteiro que evita a descoberta tardia de que faltou alguma coisa.",
    "date": "2026-09-03",
    "readTime": "11 min",
    "category": "Procedimentos Técnicos"
  },
  {
    "slug": "teclado-de-notebook-nao-funciona-o-que-verificar",
    "title": "Teclado de notebook não funciona: o que verificar antes de trocar",
    "excerpt": "Teclas mortas, teclado inteiro parado ou caracteres trocados são problemas diferentes. Como separar sujeira, configuração, cabo flat e dano por líquido antes de comprar peça.",
    "date": "2026-09-03",
    "readTime": "10 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "computador-desliga-sozinho-o-que-verificar",
    "title": "Computador desliga sozinho: o que verificar antes de trocar peça",
    "excerpt": "Desligamento repentino tem causas bem distintas: temperatura, fonte, energia elétrica e memória. Como identificar qual delas é a sua sem sair trocando componentes.",
    "date": "2026-09-03",
    "readTime": "11 min",
    "category": "Diagnóstico"
  },
  {
    "slug": "computador-nao-conecta-na-internet-por-cabo",
    "title": "Computador não conecta na internet por cabo: o que verificar",
    "excerpt": "Cabo ligado e nada de internet. Como separar cabo rompido, porta do roteador, placa de rede e falha do provedor — com testes na ordem certa.",
    "date": "2026-09-03",
    "readTime": "10 min",
    "category": "Redes"
  }
];

export const EDITORIAL_HUB_SUMMARIES: Record<string, EditorialHubSummary> = Object.fromEntries(
  rows.map(({ slug, ...summary }) => [slug, summary]),
);
