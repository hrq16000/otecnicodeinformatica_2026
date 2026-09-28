import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Prefeitura de São José dos Pinhais: a UBS CAIC atende as regiões de Costeira, Barro Preto, Del Rey, Arujá e São Francisco.
// - Secretaria Municipal de Cultura: São Francisco recebe atividades descentralizadas na Escola Municipal Emílio de Menezes.
const data = {
  nome: "São Francisco",
  slug: "sao-francisco",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática em São Francisco, SJP | Diagnóstico",
  metaDescription: "Assistência de informática em São Francisco, São José dos Pinhais. Migração de arquivos, backup, configuração de computador novo e transferência de dados com diagnóstico prévio.",
  h1: "Técnico de Informática em São Francisco – São José dos Pinhais",
  subtitulo: "Migração e organização de dados com conferência de backup antes de trocar computador, SSD ou reinstalar o sistema.",
  descricaoLonga: `São Francisco aparece de forma explícita nas estruturas municipais de São José dos Pinhais. A Prefeitura inclui a região na abrangência da UBS CAIC, e a Secretaria de Cultura utiliza a Escola Municipal Emílio de Menezes como polo descentralizado de atividades. Essas referências dão base local à página sem depender de descrições genéricas.

Nesta rota, o foco técnico está em migração de dados e continuidade entre um equipamento antigo e outro. Trocar de notebook, instalar um SSD novo ou reinstalar o Windows não é apenas copiar pastas: é preciso identificar onde estão documentos, fotos, arquivos de trabalho, perfis de navegador, favoritos, e-mails locais e outros dados que não podem ser perdidos.

Antes de qualquer migração, verificamos a saúde do armazenamento de origem e o volume real de dados. Se o SSD ou HD apresenta erros, a estratégia muda: preservar o que ainda pode ser lido passa à frente da velocidade da transferência. Se o disco está saudável, organizamos a cópia e conferimos os arquivos antes de apagar ou reutilizar o equipamento antigo.

Na configuração de uma máquina nova, drivers, atualizações, navegador, impressora e aplicativos são tratados depois que os dados essenciais estão seguros. Quando existe sincronização em nuvem, confirmamos o que realmente está sincronizado — ícone de nuvem não substitui uma verificação do conteúdo disponível.

Parte desse trabalho pode ser orientada remotamente, mas migração entre dispositivos, disco instável ou grande volume de dados costuma exigir bancada ou presença física. A página de São Francisco foi reescrita para ter uma função própria: transferência segura, backup conferido e continuidade entre equipamentos.`,
  pontosReferencia: [
    "São Francisco – São José dos Pinhais",
    "Área atendida pela UBS CAIC",
    "Escola Municipal Emílio de Menezes",
    "Polo descentralizado da Escola da Cultura"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem do equipamento e do endereço",
  tituloSecaoPrincipal: "Migração e continuidade de dados em São Francisco",
  tituloSecaoContexto: "Migração segura: o que conferir antes de apagar o computador antigo",
  triagemResumo: "Em São Francisco, a triagem começa pelo inventário dos dados e pela saúde do disco de origem. Documentos, fotos, perfis, favoritos e arquivos locais precisam ser conferidos no destino antes de apagar, formatar ou reutilizar a máquina antiga.",
  faqTitulo: "Dúvidas sobre migração e backup em São Francisco",
  faqsCustom: [
    { question: "Posso apagar o computador antigo assim que os arquivos forem copiados?", answer: "Não é recomendável. Primeiro conferimos se as pastas essenciais, perfis e arquivos fora dos diretórios padrão realmente chegaram ao destino." },
    { question: "A sincronização em nuvem substitui a conferência do backup?", answer: "Não. A nuvem ajuda, mas é preciso confirmar quais pastas estavam sincronizadas e se os arquivos podem ser abertos no novo equipamento." },
    { question: "Dá para migrar dados de um disco que apresenta erros?", answer: "Em alguns casos, sim, mas a estratégia muda. A prioridade passa a ser preservar o que ainda está legível antes de insistir em uma cópia completa." },
    { question: "Vocês configuram Windows e programas depois da migração?", answer: "Sim, conforme a necessidade. A prioridade é garantir os dados essenciais; depois entram drivers, atualizações, navegador, impressora e aplicativos." },
  ],
  servicosDestaque: [
    "Migração de arquivos para computador novo",
    "Backup antes de formatação",
    "Transferência de perfil e documentos",
    "Avaliação do disco de origem",
    "Configuração inicial de Windows",
    "Conferência de dados após migração"
  ],
  conteudoExclusivo: `Copiar arquivos não é o mesmo que concluir uma migração

Antes de desligar o computador antigo, é preciso conferir se documentos, fotos e pastas de trabalho realmente chegaram ao destino. Favoritos, perfis de navegador, arquivos locais de e-mail e pastas fora dos diretórios padrão podem ficar para trás.

Se o disco de origem apresenta erros, a prioridade muda para leitura segura e preservação do que ainda está acessível. Se está saudável, a transferência pode ser organizada e conferida com mais tranquilidade.

Essa abordagem torna a página de São Francisco específica para migração, backup e continuidade entre computadores.`,
  problemasComuns: [
    "Computador novo precisa receber arquivos do antigo",
    "SSD será trocado sem perder documentos",
    "Backup não foi conferido antes da formatação",
    "Arquivos estão espalhados em várias pastas",
    "Disco antigo apresenta erros durante a cópia",
    "Nuvem está configurada, mas nem tudo está sincronizado"
  ],
  dicasLocais: `Ao pedir atendimento em São Francisco, informe o endereço e diga se a necessidade é migrar para outra máquina, trocar o SSD ou reinstalar o sistema. Separe quais pastas e contas são essenciais e não apague o equipamento antigo até a conferência final dos dados.`,
};

const SaoFrancisco = () => <BairroTemplate data={data} />;

export default SaoFrancisco;
