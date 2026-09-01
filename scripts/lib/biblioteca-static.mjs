/**
 * Espelho estático da BIBLIOTECA TÉCNICA (Fase 3) para o prerender e os gates
 * pré-hidratação. Fontes de verdade: src/lib/glossarioTecnico.ts e
 * src/lib/ferramentasTecnicas.ts — os títulos/descrições abaixo replicam
 * exatamente o que PageSEO emite em runtime (mesma função de truncamento).
 *
 * GERADO a partir do TS; ao mudar o conteúdo lá, regenere aqui
 * (scripts/check-biblioteca-tecnica.ts valida a paridade).
 */
export const BIBLIOTECA_ROUTES = [
  {
    "path": "/glossario",
    "title": "Glossário Técnico de Informática | O Técnico de Informática",
    "description": "18 termos técnicos explicados sem jargão: BSOD, SMART, TPM, BitLocker, UEFI, DNS, NVMe e mais — com o que é seguro verificar e o que não fazer em cada um.",
    "h1": "Glossário técnico de informática"
  },
  {
    "path": "/glossario/bsod",
    "title": "O que é BSOD (tela azul)? | Glossário Técnico",
    "description": "Tela azul que o Windows exibe quando um erro crítico impede o sistema de continuar. O código de parada indica a família do problema, não a peça exata.",
    "h1": "BSOD (tela azul)"
  },
  {
    "path": "/glossario/uefi",
    "title": "O que é UEFI? | Glossário Técnico",
    "description": "Firmware moderno que liga o hardware e entrega o controle ao sistema operacional. Substituiu o BIOS tradicional e habilita Secure Boot, discos GPT e…",
    "h1": "UEFI"
  },
  {
    "path": "/glossario/bios",
    "title": "O que é BIOS? | Glossário Técnico",
    "description": "Firmware clássico das placas-mãe: testa o hardware ao ligar e inicia o sistema. Hoje o termo é usado no dia a dia para qualquer tela de configuração de…",
    "h1": "BIOS"
  },
  {
    "path": "/glossario/imagem-do-sistema",
    "title": "O que é Imagem do sistema? | Glossário Técnico",
    "description": "Cópia completa do disco — sistema, programas, configurações e arquivos — que permite restaurar o computador inteiro ao estado do momento da captura.",
    "h1": "Imagem do sistema"
  },
  {
    "path": "/glossario/smart",
    "title": "O que é S.M.A.R.T.? | Glossário Técnico",
    "description": "Sistema de automonitoramento embutido em HDs e SSDs que registra indicadores de desgaste e erros — o histórico médico do disco, legível por ferramentas de…",
    "h1": "S.M.A.R.T."
  },
  {
    "path": "/glossario/ssd",
    "title": "O que é SSD? | Glossário Técnico",
    "description": "Armazenamento em chips de memória flash, sem partes móveis. É o upgrade com maior impacto perceptível em computadores que ainda usam HD mecânico.",
    "h1": "SSD"
  },
  {
    "path": "/glossario/nvme",
    "title": "O que é NVMe? | Glossário Técnico",
    "description": "Protocolo de comunicação criado para SSDs conectados direto ao barramento PCIe — várias vezes mais rápido que o SATA herdado dos HDs mecânicos.",
    "h1": "NVMe"
  },
  {
    "path": "/glossario/backup-incremental",
    "title": "O que é Backup incremental? | Glossário Técnico",
    "description": "Estratégia que copia apenas o que mudou desde o último backup — rápida e econômica em espaço, mas dependente da integridade da cadeia completa de cópias.",
    "h1": "Backup incremental"
  },
  {
    "path": "/glossario/recuperacao-de-dados",
    "title": "O que é Recuperação de dados? | Glossário Técnico",
    "description": "Conjunto de técnicas para reaver arquivos de discos falhos, formatados ou corrompidos. A primeira regra é contraintuitiva: parar de usar o disco…",
    "h1": "Recuperação de dados"
  },
  {
    "path": "/glossario/tpm",
    "title": "O que é TPM? | Glossário Técnico",
    "description": "Chip (ou firmware) de segurança que guarda chaves criptográficas fora do alcance do sistema operacional. Requisito do Windows 11 e base do BitLocker.",
    "h1": "TPM"
  },
  {
    "path": "/glossario/bitlocker",
    "title": "O que é BitLocker? | Glossário Técnico",
    "description": "Criptografia de disco completo do Windows. Protege os dados se o equipamento for perdido ou roubado — e exige a chave de recuperação guardada em local seguro.",
    "h1": "BitLocker"
  },
  {
    "path": "/glossario/dns",
    "title": "O que é DNS? | Glossário Técnico",
    "description": "A 'agenda telefônica' da internet: traduz nomes como exemplo.com.br em endereços IP. Quando o DNS falha, o Wi-Fi conecta mas nenhum site abre.",
    "h1": "DNS"
  },
  {
    "path": "/glossario/nat",
    "title": "O que é NAT? | Glossário Técnico",
    "description": "Técnica que permite a todos os dispositivos da casa compartilharem um único endereço público de internet — feita pelo roteador, invisível no uso normal.",
    "h1": "NAT"
  },
  {
    "path": "/glossario/memoria-ram",
    "title": "O que é Memória RAM? | Glossário Técnico",
    "description": "Memória de trabalho do computador: guarda o que está em uso agora. Quando falta, o sistema recorre ao disco e tudo trava; quando falha, gera erros…",
    "h1": "Memória RAM"
  },
  {
    "path": "/glossario/thermal-throttling",
    "title": "O que é Thermal throttling? | Glossário Técnico",
    "description": "Autodefesa do processador: ao atingir o limite térmico, ele reduz a velocidade para não se danificar. O computador fica lento em vez de queimar — e a…",
    "h1": "Thermal throttling"
  },
  {
    "path": "/glossario/secure-boot",
    "title": "O que é Secure Boot? | Glossário Técnico",
    "description": "Recurso do firmware UEFI que só permite iniciar componentes assinados digitalmente. Bloqueia código malicioso que tentaria carregar antes do sistema…",
    "h1": "Secure Boot"
  },
  {
    "path": "/glossario/driver",
    "title": "O que é Driver? | Glossário Técnico",
    "description": "Software que traduz as ordens do sistema operacional para uma peça específica de hardware. Driver com defeito é uma das causas mais comuns de tela azul e…",
    "h1": "Driver"
  },
  {
    "path": "/glossario/particao",
    "title": "O que é Partição? | Glossário Técnico",
    "description": "Divisão lógica de um disco físico em áreas independentes. Entender as partições evita apagar a área de recuperação ou o carregador de inicialização por…",
    "h1": "Partição"
  },
  {
    "path": "/ferramentas",
    "title": "Checklists e Ferramentas Técnicas | O Técnico de Informática",
    "description": "5 roteiros seguros e gratuitos: computador lento, antes de formatar, falha de inicialização, verificação de backup e SSD ou RAM. Sem cadastro, direto ao ponto.",
    "h1": "Ferramentas e checklists técnicos"
  },
  {
    "path": "/ferramentas/checklist-computador-lento",
    "title": "Checklist de computador lento | Ferramenta gratuita",
    "description": "Sequência de 7 observações seguras para descobrir DE ONDE vem a lentidão — disco, memória, temperatura ou software — antes de gastar com qualquer upgrade.",
    "h1": "Checklist de computador lento"
  },
  {
    "path": "/ferramentas/checklist-antes-de-formatar",
    "title": "Checklist antes de formatar | Ferramenta gratuita",
    "description": "8 verificações obrigatórias antes de qualquer formatação — do backup testado às licenças e senhas — para que 'recomeçar do zero' não vire perda irreversível.",
    "h1": "Checklist antes de formatar"
  },
  {
    "path": "/ferramentas/roteiro-falha-de-inicializacao",
    "title": "Roteiro de falha de inicialização | Ferramenta gratuita",
    "description": "Observação em 6 etapas do caminho entre o botão de ligar e o Windows — para descobrir ONDE a inicialização quebra e o que cada ponto de parada significa.",
    "h1": "Roteiro de falha de inicialização"
  },
  {
    "path": "/ferramentas/verificador-de-backup",
    "title": "Verificador orientativo de backup | Ferramenta gratuita",
    "description": "6 perguntas honestas sobre a sua rotina de backup — cobertura, frequência, isolamento e teste — para descobrir se ela sobreviveria a uma perda real.",
    "h1": "Verificador orientativo de backup"
  },
  {
    "path": "/ferramentas/ssd-ou-ram",
    "title": "SSD ou RAM: orientação inicial | Ferramenta gratuita",
    "description": "Roteiro de observação em 5 passos para identificar qual upgrade o SEU uso realmente pede — antes de gastar com o componente errado.",
    "h1": "SSD ou RAM: orientação inicial"
  },
  {
    "path": "/ferramentas/roteiro-wifi-instavel",
    "title": "Wi-Fi instável: roteiro de observação | Ferramenta gratuita",
    "description": "Roteiro em 6 passos para separar o que é do provedor, do roteador e do seu computador — antes de trocar aparelho ou contratar plano maior.",
    "h1": "Wi-Fi instável: roteiro de observação"
  }
];
