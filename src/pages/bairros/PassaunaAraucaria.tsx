import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Revisão do Plano Diretor de Araucária: Passaúna é tratado como bairro formal, com zonas residenciais, industriais, comunitárias e de proteção ambiental.
// - Prefeitura de Araucária: CRAS Boqueirão — Rua Miguel Grabowski, 380, Passaúna.
const data = {
  nome: "Passaúna",
  slug: "passauna",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Passaúna, Araucária | Rede e Suporte",
  metaDescription: "Suporte de informática no Passaúna, Araucária. Triagem de Wi-Fi, rede, notebook e PC com definição entre suporte remoto, visita e bancada.",
  h1: "Técnico de Informática no Passaúna – Araucária",
  subtitulo: "Diagnóstico de conectividade e definição da modalidade certa antes do deslocamento.",
  descricaoLonga: `Passaúna é reconhecido no Plano Diretor de Araucária como bairro formal, com diferentes zonas de uso. A Prefeitura também mantém o CRAS Boqueirão na Rua Miguel Grabowski, em Passaúna. Essas referências permitem validar a localidade sem recorrer a descrições genéricas ou fronteiras inventadas.

Nesta página, o foco técnico está em conectividade e na decisão entre suporte remoto, visita e bancada. Se o computador ainda inicia e tem conexão disponível, erros de configuração, drivers, aplicativos e parte dos problemas de rede podem começar por triagem remota. Se há falha física, ausência de vídeo, energia ou necessidade de desmontagem, o atendimento precisa ser presencial.

Em Wi-Fi, o diagnóstico começa comparando dispositivos e pontos do imóvel. Se apenas um notebook apresenta queda, driver, adaptador ou configuração entram primeiro. Se todos os aparelhos falham, o foco muda para roteador, cobertura e conexão principal. Repetidor ou mesh só fazem sentido depois dessa separação.

Em redes cabeadas, também verificamos se a falha ocorre em uma única estação ou em vários equipamentos. Essa comparação ajuda a diferenciar problema de placa de rede, cabo, switch ou roteador. Quando a máquina precisa de bancada, dados importantes e backup são considerados antes da intervenção.

A página do Passaúna foi reescrita para explicar o fluxo entre remoto, visita e bancada e para tratar conectividade de forma específica. A localização organiza a logística; a modalidade é escolhida a partir do tipo de defeito.`,
  pontosReferencia: [
    "Passaúna – Araucária",
    "Rua Miguel Grabowski",
    "CRAS Boqueirão",
    "Perímetro urbano reconhecido no Plano Diretor"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem do endereço e do sintoma",
  servicosDestaque: [
    "Diagnóstico de Wi-Fi",
    "Configuração de rede cabeada",
    "Suporte remoto",
    "Notebook sem conexão",
    "PC sem acesso à rede",
    "Backup antes de bancada"
  ],
  conteudoExclusivo: `Rede ruim precisa ser localizada antes de ser corrigida

Se a falha aparece em um único computador, investigar o roteador primeiro pode ser perda de tempo. Se todos os dispositivos caem juntos, a situação muda. Em rede cabeada, comparar portas e máquinas ajuda a separar cabo, placa e infraestrutura.

Quando o computador ainda está online, parte dessa análise pode começar remotamente. Quando há falha física ou ausência de vídeo, a visita ou a bancada tornam-se necessárias.

No Passaúna, a página foi desenhada para orientar exatamente essa escolha e evitar promessas de deslocamento antes de saber o que realmente aconteceu.`,
  problemasComuns: [
    "Wi-Fi cai apenas em um notebook",
    "Vários dispositivos perdem conexão ao mesmo tempo",
    "PC não acessa rede cabeada",
    "Driver de rede apresenta erro",
    "Computador precisa de suporte remoto",
    "Máquina precisa ir para bancada com arquivos importantes"
  ],
  dicasLocais: `Ao solicitar atendimento no Passaúna, informe o endereço e uma referência como a Rua Miguel Grabowski ou o CRAS Boqueirão. Para rede, teste outro aparelho no mesmo ponto e, se possível, compare Wi-Fi e cabo antes do contato.`,
};

const PassaunaAraucaria = () => <BairroTemplate data={data} />;

export default PassaunaAraucaria;
