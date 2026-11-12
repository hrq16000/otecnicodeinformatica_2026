import { BairroTemplate } from "./BairroTemplate";

// Fontes locais verificadas em 27/09/2026:
// - Prefeitura de Curitiba: histórico do Cristo Rei e eixo da Av. Presidente Affonso Camargo.
// - Prefeitura/URBS: Estação Tubo Hospital Cajuru.
// - Turismo Curitiba: Hospital Cajuru, Av. São José, 300.
const data = {
  nome: "Cristo Rei",
  slug: "cristo-rei",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Cristo Rei, Curitiba | Diagnóstico",
  metaDescription: "Técnico de informática no Cristo Rei, Curitiba. Triagem pelo WhatsApp, visita quando necessária e coleta para bancada. Diagnóstico antes da execução.",
  h1: "Técnico de Informática no Cristo Rei – Curitiba",
  subtitulo: "Triagem pelo WhatsApp, atendimento no local quando faz sentido e coleta para bancada quando o reparo exige.",
  descricaoLonga: `O Cristo Rei fica em um eixo urbano bem definido da região leste-central de Curitiba. A Prefeitura registra a Avenida Presidente Affonso Camargo como limite entre Cristo Rei e Jardim Botânico em parte do trajeto, com estações-tubo importantes no corredor, entre elas Hospital Cajuru e Viaduto do Capanema. O Hospital Cajuru, referência fácil para quem está no bairro, fica na Avenida São José. A história oficial do bairro também relaciona o nome atual à Igreja do Cristo Rei, na Rua Padre Germano Mayer.

Para o atendimento de informática, usamos essas referências somente para organizar a localização e a modalidade do chamado — não para prometer tempo fixo de chegada. Antes de qualquer deslocamento, pedimos pelo WhatsApp o modelo do equipamento, o sintoma, a rua e um ponto de referência. Problemas de software podem começar por triagem remota; falhas físicas de notebook, desktop ou periférico podem exigir visita, coleta ou bancada. Quando a máquina não liga, apresenta tela azul, perde conexão ou esquenta demais, a primeira etapa é separar sintoma de causa antes de indicar formatação ou troca de peça.

Em casos com dados importantes, o backup entra na conversa antes de qualquer reinstalação. Quando o defeito exige abertura profunda, solda, troca de tela ou medição prolongada, a bancada costuma ser mais adequada do que improvisar o reparo no endereço. O escopo, a modalidade e o valor são apresentados antes da execução.`,
  pontosReferencia: [
    "Av. Presidente Affonso Camargo",
    "Hospital Cajuru – Av. São José",
    "Estação Tubo Hospital Cajuru",
    "Rua Padre Germano Mayer",
    "Viaduto do Capanema"
  ],
  tempoDeslocamento: "Agenda confirmada após triagem do endereço",
  servicosDestaque: [
    "Diagnóstico de computador e notebook",
    "Formatação com backup combinado antes",
    "Remoção de vírus e programas indesejados",
    "Upgrade de SSD e memória",
    "Configuração e diagnóstico de rede Wi-Fi",
    "Backup e recuperação de dados"
  ],
  conteudoExclusivo: `Atendimento técnico no Cristo Rei sem transformar o nome do bairro em promessa genérica

A página do Cristo Rei usa referências públicas verificáveis para ajudar na triagem. Quem está próximo à Avenida Presidente Affonso Camargo ou à Estação Tubo Hospital Cajuru pode informar isso já na primeira mensagem. Em ruas internas, basta enviar o endereço aproximado e o ponto de referência; a confirmação da agenda acontece depois da triagem.

O diagnóstico muda conforme o sintoma. Computador que liga sem imagem pede verificação diferente de Windows que começa a carregar e trava. Notebook que desliga sob carga exige medir temperatura e alimentação antes de concluir que precisa ser formatado. Wi-Fi instável precisa ser testado no ambiente antes de indicar repetidor ou mesh. Esse roteiro evita substituir peça por tentativa.

Quando existe risco de perda de arquivos, perguntamos primeiro o que precisa ser preservado e onde há cópia. Só depois é definido se o serviço continua no endereço, por acesso remoto ou em bancada. A ideia é reduzir deslocamento e retrabalho, mantendo o cliente informado sobre o próximo passo.`,
  problemasComuns: [
    "Computador liga, mas não apresenta imagem",
    "Windows trava, reinicia ou entra em tela azul",
    "Notebook esquenta, faz ruído ou desliga sob carga",
    "Wi-Fi perde estabilidade em um ou mais ambientes",
    "Disco lento, cheio ou com sinais de falha",
    "Arquivos importantes sem backup confiável"
  ],
  dicasLocais: `Ao pedir atendimento no Cristo Rei, envie o modelo do equipamento, uma foto do sintoma quando possível e sua referência de localização — por exemplo Av. Presidente Affonso Camargo, Hospital Cajuru ou Rua Padre Germano Mayer. Isso ajuda a decidir a modalidade correta antes de qualquer deslocamento. Se houver arquivos importantes, avise já na primeira mensagem para que backup e preservação de dados façam parte do diagnóstico desde o início.`,
};

const CristoRei = () => <BairroTemplate data={data} />;

export default CristoRei;
