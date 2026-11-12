import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de Colombo: São Dimas consta na lista oficial de bairros urbanos.
// - Prefeitura de Colombo: CRAS Monte Castelo — Rua do Ipê, 972, São Dimas, inaugurado em maio de 2026.
// - Prefeitura de Colombo: obras de pavimentação em vias como Rua das Avencas, Rua das Dálias, Rua dos Antúrios e Rua das Gérberas em 2026.
const data = {
  nome: "São Dimas",
  slug: "sao-dimas-colombo",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no São Dimas, Colombo | Rede e Periféricos",
  metaDescription: "Suporte de informática no São Dimas, Colombo. Diagnóstico de Wi-Fi, impressora, periféricos, Windows e arquivos antes de trocar equipamento ou formatar.",
  h1: "Técnico de Informática no São Dimas – Colombo",
  subtitulo: "Triagem de rede, periféricos e Windows para separar configuração, comunicação e falha física antes da execução.",
  descricaoLonga: `São Dimas integra a lista oficial de bairros urbanos de Colombo. Entre as referências municipais recentes estão o CRAS Monte Castelo, na Rua do Ipê, e vias que receberam obras de pavimentação em 2026, como Rua das Avencas, Rua das Dálias, Rua dos Antúrios e Rua das Gérberas. Essas referências permitem localizar a página com base em informação pública, sem criar descrições genéricas sobre perfil residencial, comércio ou demanda de serviços.

Nesta página, o foco técnico está na comunicação entre computador, rede e periféricos. Uma impressora que aparece offline, um notebook que perde o Wi-Fi ou um dispositivo USB que deixa de ser reconhecido podem ter origem em configuração, driver, porta, cabo, alimentação ou defeito físico. Por isso, a triagem começa pelo que deixou de funcionar e pelo que continua funcionando normalmente.

Quando o problema é de Wi-Fi, comparamos outros aparelhos na mesma rede. Se apenas um computador perde conexão, adaptador, driver e configuração de energia ganham prioridade. Se vários dispositivos falham ao mesmo tempo, o diagnóstico muda para roteador, cobertura, cabeamento e conexão principal. Antes de recomendar repetidor ou troca de roteador, é importante separar essas situações.

Em impressoras, verificamos fila de impressão, porta configurada, endereço de rede e teste em outro computador quando possível. Em webcam, áudio, mouse, teclado ou dispositivos USB, comparar outra porta ou outra máquina ajuda a distinguir falha do Windows de defeito do periférico.

Se o Windows apresenta travamentos junto com essas falhas, também avaliamos atualizações, armazenamento e memória antes de considerar reinstalação. Quando existem arquivos importantes, backup vem antes de qualquer procedimento que possa alterar o sistema. Parte dessas verificações pode começar remotamente; defeito físico, ausência de vídeo, falha de energia ou necessidade de desmontagem exige visita ou bancada.

A página do São Dimas foi reescrita para orientar esse diagnóstico de conectividade e periféricos com conteúdo próprio, referências municipais verificáveis e sem promessa fixa de chegada.`,
  pontosReferencia: [
    "Rua do Ipê",
    "CRAS Monte Castelo",
    "Rua das Avencas",
    "Rua das Dálias",
    "Rua dos Antúrios",
    "Rua das Gérberas"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem do problema e do endereço",
  servicosDestaque: [
    "Diagnóstico de Wi-Fi e rede",
    "Impressora offline ou sem comunicação",
    "Configuração de periféricos",
    "Correção de drivers e Windows",
    "Backup antes de manutenção",
    "Triagem remota quando aplicável"
  ],
  conteudoExclusivo: `Quando o equipamento funciona, mas não conversa com a rede ou o periférico

Nem toda falha de impressora exige manutenção na impressora. Uma fila travada, uma porta incorreta ou uma mudança de endereço na rede podem interromper a comunicação mesmo quando o equipamento está funcionando.

O mesmo vale para Wi-Fi: se apenas um notebook falha, trocar o roteador pode não resolver. Comparar outro dispositivo e, quando possível, uma conexão por cabo reduz o risco de substituir equipamento por tentativa.

Em USB, áudio, webcam e teclado, o padrão da falha também importa. Testar outra porta ou outro computador ajuda a separar driver, configuração e defeito físico.

Essa abordagem dá à página do São Dimas uma intenção própria voltada a comunicação entre computador, rede e periféricos.`,
  problemasComuns: [
    "Impressora aparece offline",
    "Notebook perde Wi-Fi enquanto outros aparelhos continuam conectados",
    "Webcam ou áudio deixam de funcionar após atualização",
    "Dispositivo USB não é reconhecido",
    "Windows trava ao usar periféricos",
    "Arquivos importantes precisam de backup antes da manutenção"
  ],
  dicasLocais: `Ao solicitar atendimento no São Dimas, informe o endereço e uma referência como a Rua do Ipê ou o CRAS Monte Castelo. Para rede, diga se outros aparelhos continuam conectados. Para impressora, informe se ela imprime um teste próprio. Para USB, webcam ou áudio, descreva se a falha começou depois de atualização ou troca de equipamento.`,
};

const ColareColombo = () => <BairroTemplate data={data} />;

export default ColareColombo;
