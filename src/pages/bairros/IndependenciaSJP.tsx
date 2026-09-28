import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 28/09/2026:
// - Prefeitura de São José dos Pinhais: Projeto Parque Linear Jardim Independência, aprovado em acelerador global em 2025.
// - Prefeitura de São José dos Pinhais: Estádio Municipal Moacir Tomelin — Rua Leonir Ludgero Schreber, 100, Jardim Independência.
// - Prefeitura de São José dos Pinhais: ações do SINE nos Bairros realizadas no Jardim Independência, com atendimento na Rua Divonsir Luciano.
const data = {
  nome: "Independência",
  slug: "independencia-sjp",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Jardim Independência, SJP | Suporte",
  metaDescription: "Suporte de informática no Jardim Independência, São José dos Pinhais. Windows, impressora, periféricos, programas e acesso remoto com diagnóstico antes da execução.",
  h1: "Técnico de Informática no Jardim Independência – São José dos Pinhais",
  subtitulo: "Suporte para Windows, programas e periféricos com triagem remota quando possível e visita quando o problema exige presença física.",
  descricaoLonga: `O Jardim Independência aparece em ações e projetos recentes da Prefeitura de São José dos Pinhais. Em 2025, o município teve aprovado o projeto Parque Linear Jardim Independência em uma iniciativa internacional de aceleração de projetos socioambientais. A região também possui o Estádio Municipal Moacir Tomelin, na Rua Leonir Ludgero Schreber, e já recebeu ações do SINE nos Bairros. Essas referências ajudam a confirmar a localização sem recorrer a descrições genéricas.

Nesta página, a orientação técnica parte de uma pergunta prática: qual função deixou de funcionar? Um computador pode ligar normalmente e ainda impedir trabalho ou estudo porque a impressora ficou offline, o navegador deixou de acessar um sistema, a webcam sumiu, o áudio parou ou um programa passou a fechar sozinho. Nesses casos, formatar o computador inteiro antes de investigar a função afetada costuma ser um atalho ruim.

Quando o Windows ainda inicia, a triagem pode começar verificando atualizações recentes, drivers, dispositivos reconhecidos, fila de impressão, permissões, inicialização de programas e comunicação de rede. Em impressoras, por exemplo, saber se outro computador consegue imprimir ajuda a separar falha do equipamento, da rede ou daquela estação específica.

Webcam, microfone e áudio também podem parar depois de atualização, mudança de porta USB ou alteração de configuração. Se o dispositivo aparece no sistema, a investigação segue por software e permissões; se não aparece em nenhuma porta ou em outro computador, a hipótese física ganha peso.

Parte desses casos pode ser avaliada por suporte remoto quando a máquina está funcionando e conectada. Se há conector danificado, falha de energia, tela sem imagem ou necessidade de abrir o equipamento, a visita ou a bancada passam a ser mais adequadas.

A página do Jardim Independência foi reescrita para ter uma função editorial própria: orientar problemas de Windows, programas e periféricos, deixando claro quando vale tentar remoto e quando o defeito exige avaliação física.`,
  pontosReferencia: [
    "Jardim Independência – São José dos Pinhais",
    "Rua Leonir Ludgero Schreber",
    "Estádio Municipal Moacir Tomelin",
    "Rua Divonsir Luciano",
    "Projeto Parque Linear Jardim Independência"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem do endereço e da função afetada",
  servicosDestaque: [
    "Correção de Windows e atualizações",
    "Impressora e fila de impressão",
    "Webcam, microfone e áudio",
    "Programas que deixam de abrir",
    "Suporte remoto",
    "Configuração de rede e periféricos"
  ],
  conteudoExclusivo: `Quando o computador liga, mas uma função específica para

Uma impressora offline não exige o mesmo diagnóstico de um Windows que não inicia. Uma webcam ausente pode ser driver, permissão ou conexão USB. Um programa que fecha sozinho pode estar relacionado a atualização, perfil do usuário ou arquivos do próprio aplicativo.

O objetivo da triagem é isolar a função afetada antes de alterar o restante do sistema. Se o problema puder ser reproduzido com o computador conectado, o suporte remoto pode ser suficiente para verificar configuração e software. Se houver falha física, a modalidade muda.

No Jardim Independência, essa abordagem evita transformar qualquer erro de software em formatação completa e dá à página uma intenção técnica diferente das rotas focadas em armazenamento ou hardware.`,
  problemasComuns: [
    "Impressora aparece offline",
    "Webcam ou microfone deixa de funcionar",
    "Programa fecha depois de atualização",
    "Windows perde configuração de áudio",
    "Computador acessa internet, mas não um sistema específico",
    "Periférico USB não é reconhecido"
  ],
  dicasLocais: `Ao pedir atendimento no Jardim Independência, informe o endereço e uma referência como o Estádio Municipal Moacir Tomelin ou a Rua Leonir Ludgero Schreber. Para impressora, diga se outro computador consegue usá-la; para webcam ou áudio, informe se o dispositivo aparece no Windows; para programas, envie a mensagem de erro exibida.`,
};

const IndependenciaSJP = () => <BairroTemplate data={data} />;

export default IndependenciaSJP;
