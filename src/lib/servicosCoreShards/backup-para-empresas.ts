// Extraído do catálogo de serviços para carregar somente os dados desta rota.
// Manter em paridade editorial com SERVICOS_CORE["backup-para-empresas"].
import type { ServicoLandingData } from "@/components/servico/ServicoLandingLayout";
import { PROCESSOS } from "@/lib/servicosProcessos";

const data: ServicoLandingData = {
    path: "backup-para-empresas",
    trackingKey: "backup-empresarial",
    metaTitle: "Backup para Empresas em Curitiba | Proteção de Arquivos",
    metaDescription:
      "Backup para empresas em Curitiba: avaliação do que existe hoje, cópia local, cópia externa, nuvem, retenção, versionamento e teste de restauração.",
    serviceName: "Backup para Empresas",
    serviceDescription:
      "Avaliação, configuração e orientação de rotinas de backup para empresas de Curitiba e região: cópia local, cópia externa, nuvem, retenção, versionamento e teste de restauração.",
    eyebrow: "Empresas em Curitiba",
    h1: "Backup para empresas em Curitiba",
    h1Accent: "cópia separada e restauração testada",
    intro:
      "Perder o arquivo de contabilidade, a base do sistema de gestão ou anos de documentos é o tipo de acidente que fecha a semana de uma empresa. Avaliamos o que já existe, apontamos as falhas do processo atual e ajudamos a estruturar cópias em camadas — local, externa e em nuvem — com frequência, retenção e teste de restauração. A regra que orienta todo o serviço é simples: um backup só pode ser considerado confiável quando existe cópia separada e o processo de restauração é testado. Descreva o cenário pela triagem para avaliarmos.",
    whatsappMessage: "Olá! Quero avaliar o backup dos arquivos da minha empresa em Curitiba.",
    incluso: [
      { title: "Diagnóstico do que existe", desc: "Levantamento de onde os arquivos críticos estão hoje e que cópia realmente existe." },
      { title: "Mapa dos dados críticos", desc: "Identificação do que a empresa não pode perder: sistema de gestão, fiscal, contratos e projetos." },
      { title: "Cópia local", desc: "Configuração de rotina em disco ou dispositivo separado da máquina de origem." },
      { title: "Cópia externa", desc: "Orientação para manter uma cópia fora do mesmo ambiente físico da empresa." },
      { title: "Backup em nuvem", desc: "Configuração de rotina em serviço de nuvem compatível, com escopo e responsáveis definidos." },
      { title: "Frequência e retenção", desc: "Definição de quantas vezes copiar e por quanto tempo manter versões anteriores." },
      { title: "Teste de restauração", desc: "Restauração de amostra para confirmar que os arquivos voltam íntegros e utilizáveis." },
      { title: "Registro do processo", desc: "Documento simples com o que é copiado, para onde, com que frequência e quem é o responsável." },
    ],
    sinais: [
      "Arquivos importantes salvos apenas no computador de um usuário",
      "Backup que ninguém restaurou desde que foi criado",
      "Cópia gravada no mesmo disco ou no mesmo computador dos arquivos originais",
      "HD externo que fica permanentemente conectado à mesma máquina",
      "Uso de sincronização em nuvem como se fosse backup",
      "Ninguém sabe dizer quem é o responsável pela rotina de cópia",
      "Empresa já perdeu arquivo por exclusão acidental, falha de disco ou infecção",
      "Base do sistema de gestão sem cópia fora do servidor local",
    ],
    processo: PROCESSOS["backup-para-empresas"],
    fatoresValor: [
      { title: "Volume de dados", desc: "Quantidade de arquivos e o tamanho total a copiar influenciam tempo e estrutura." },
      { title: "Número de origens", desc: "Estações, servidor local e pastas compartilhadas envolvidas na rotina." },
      { title: "Camadas escolhidas", desc: "Somente cópia local, local mais externa ou combinação com nuvem." },
      { title: "Frequência e retenção", desc: "Cópias diárias com histórico longo exigem mais espaço e mais planejamento." },
      { title: "Recursos já existentes", desc: "Aproveitar dispositivos e contas que a empresa já possui reduz o escopo do serviço." },
      { title: "Teste e acompanhamento", desc: "Verificação periódica da rotina é definida na contratação, conforme o escopo acordado." },
    ],
    atendimento: {
      residencial:
        "Profissionais autônomos que guardam trabalho no próprio notebook seguem a mesma lógica em escala menor: uma cópia local, uma cópia fora do equipamento e uma restauração de teste.",
      empresarial:
        "Escritórios, comércios e pequenas empresas de Curitiba e região: avaliação do processo atual, estruturação das cópias em camadas, definição de responsáveis e teste de restauração.",
    },
    faqs: [
      { question: "Google Drive ou OneDrive já são backup?", answer: "Não por si só. Esses serviços são de sincronização: se um arquivo é apagado, corrompido ou criptografado por um vírus na máquina, a alteração se propaga para a nuvem. Eles ajudam quando o versionamento e a lixeira estão configurados e conhecidos, mas continuam sendo uma camada, não o backup completo." },
      { question: "Quantas cópias a empresa deve ter?", answer: "A prática mais aceita é manter pelo menos duas cópias além do original, em mídias ou serviços diferentes, e uma delas fora do ambiente físico da empresa. Adaptamos essa regra ao volume, aa verba disponível para infraestrutura e à criticidade dos arquivos." },
      { question: "O backup precisa ficar fora da empresa?", answer: "Uma das cópias sim. Incêndio, furto, dano elétrico e infecção que se espalha pela rede atingem tudo que está no mesmo local e conectado. A cópia externa é justamente o que sobra quando o pior acontece no endereço." },
      { question: "Como saber se a restauração funciona?", answer: "Testando. Selecionamos uma amostra representativa, restauramos em local separado e conferimos se os arquivos abrem íntegros. Backup nunca testado é apenas uma suposição, e é assim que a maioria das empresas descobre o problema no pior momento." },
      { question: "Backup protege contra ransomware?", answer: "Ajuda, e é a defesa mais efetiva na prática, desde que exista cópia desconectada ou com versionamento que o ataque não consiga alterar. Cópia permanentemente conectada à mesma rede pode ser criptografada junto. Não prometemos proteção absoluta contra ataque." },
      { question: "Quem deve ter acesso?", answer: "O menor número possível de pessoas, com responsável nomeado e substituto definido. Acesso amplo à rotina de cópia aumenta o risco de exclusão acidental e de exposição de dados sensíveis." },
      { question: "O serviço inclui armazenamento?", answer: "Não. Discos, dispositivos e planos de nuvem são contratados pela empresa. Indicamos o que é compatível com o volume e o uso, e configuramos a rotina sobre o recurso escolhido, sem oferecer armazenamento ilimitado." },
      { question: "Vocês garantem que os arquivos sempre voltam?", answer: "Não. Backup reduz o risco de perda, mas nenhuma rotina elimina totalmente a possibilidade de falha. Quando o arquivo já foi perdido e não existe cópia, o caminho é a avaliação de recuperação de dados, que também não tem resultado assegurado." },
      { question: "Backup atende às exigências da LGPD?", answer: "Backup é uma das medidas técnicas que apoiam a proteção de dados, mas conformidade não é automática: depende de políticas internas, base legal, controle de acesso e tratamento adequado dos dados pessoais pela própria empresa. Não emitimos declaração de conformidade." },
      { question: "Com que frequência a cópia deve ser feita?", answer: "Pela pergunta inversa: quanto trabalho a empresa aceita refazer. Se refazer um dia inteiro é inviável, a rotina precisa ser diária ou mais frequente. Definimos frequência e retenção junto com você, em vez de aplicar um padrão único." },
    ],
    relacionados: [
      { label: "Suporte técnico empresarial", to: "/servicos/suporte-tecnico-empresarial" },
      { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
      { label: "Manutenção preventiva para empresas", to: "/servicos/manutencao-preventiva-empresas" },
      { label: "Empresa de TI em Curitiba", to: "/empresa-de-ti-curitiba" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
      { label: "Como funciona", to: "/como-funciona" },
    ],
    blocoLocal: [
      {
        titulo: "Sincronizar não é copiar: a confusão que mais causa perda de arquivo",
        paragrafos: [
          "A empresa instala uma pasta sincronizada, vê o ícone verde e considera o assunto resolvido. O problema é que sincronização replica o estado atual: se alguém apaga a pasta de contratos, a exclusão sobe para a nuvem em segundos. Se um ransomware criptografa os arquivos da estação, a versão criptografada substitui a boa no serviço.",
          "Backup verdadeiro guarda cópias em pontos diferentes no tempo, em local separado, com histórico que permite voltar ao dia anterior à falha. Versionamento é o que transforma uma pasta em nuvem em algo próximo de backup — e, mesmo assim, precisa estar ativado, com prazo de retenção conhecido e alguém sabendo como recuperar.",
          "A régua que usamos é objetiva: um backup só pode ser considerado confiável quando existe cópia separada e o processo de restauração é testado. Enquanto essas duas condições não estiverem atendidas, a empresa tem sensação de segurança, não segurança.",
        ],
      },
      {
        titulo: "Camadas de cópia, frequência e retenção no cenário de uma pequena empresa",
        paragrafos: [
          "A cópia local é a mais rápida para restaurar e resolve os incidentes mais comuns: exclusão acidental, arquivo corrompido, falha de uma estação. Ela precisa ficar em disco ou dispositivo diferente do que guarda os originais — cópia na mesma máquina desaparece junto com ela.",
          "A cópia externa é a que sobrevive ao incidente do endereço: furto, incêndio, dano elétrico, infecção que se espalha pela rede. Pode ser um disco que sai da empresa em rodízio ou um serviço em nuvem contratado, desde que a rotina seja verificada e não dependa de alguém lembrar de executar manualmente.",
          "Frequência e retenção saem de duas perguntas: quanto trabalho a empresa aceita refazer se perder o dia, e por quanto tempo pode precisar de uma versão antiga. Fiscal e contábil normalmente exigem histórico longo; arquivos operacionais do dia a dia costumam pedir alta frequência com retenção mais curta.",
          "Fecha o desenho a definição de responsáveis: quem executa, quem confere, quem é avisado se a rotina falhar e quem tem acesso aos dados sensíveis. Rotina sem dono é rotina que para sem ninguém perceber, e só aparece no dia da emergência.",
        ],
      },
      {
        titulo: "Backup previne, recuperação de dados é a tentativa depois da perda",
        paragrafos: [
          "São serviços diferentes e é importante não confundir. Backup atua antes: organiza cópias para que a perda tenha um custo pequeno e previsível. Recuperação de dados atua depois, quando o disco falhou, o arquivo sumiu ou o sistema não inicia, e o resultado nunca é garantido — depende do estado físico e lógico da mídia.",
          "Toda empresa que passa por uma recuperação bem-sucedida faz a mesma pergunta ao final: como evitar isso de novo. A resposta é sempre a rotina de cópia. Toda empresa que passa por uma recuperação sem sucesso descobre o custo real de não ter tido essa rotina.",
          "Também deixamos claro o que não fazemos: não prometemos proteção absoluta, resultado assegurado na recuperação de arquivos, conformidade automática com a LGPD, armazenamento ilimitado nem monitoramento contínuo da rotina sem contratação específica. O escopo é definido após o diagnóstico e executado mediante a sua autorização.",
        ],
      },
    ],
    linksLocais: [
      { label: "Empresa de TI em Curitiba", to: "/empresa-de-ti-curitiba" },
      { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
      { label: "Atendimento remoto", to: "/atendimento-remoto" },
      { label: "Como funciona o atendimento", to: "/como-funciona" },
    ],
    dateModified: "2026-08-06",
  };

export default data;
