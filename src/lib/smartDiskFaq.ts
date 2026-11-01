/** Lista única para FAQ visível e FAQPage do guia SMART. */
export const SMART_DISK_FAQ = [
  { q: "Devo rodar CHKDSK quando o SMART acusa problema?", a: "Não como primeira ação. Preserve os dados e diferencie falha física de inconsistência lógica. Opções de reparo alteram o volume; CHKDSK não conserta eletrônica, cabeças ou células." },
  { q: "SMART aprovado garante que o disco está saudável?", a: "Não. O resultado não certifica todos os dados nem exclui falha de comunicação. Combine o relatório com modelo, sintomas e cópia recuperável; não espere dias para confirmar uma falha ativa." },
  { q: "Um contador de CRC confirma defeito na mídia?", a: "Não sozinho. Ele pode apontar problemas de enlace, como cabo ou porta. Registre o total anterior e observe novos erros após uma correção segura; o histórico pode continuar diferente de zero." },
  { q: "Existe uma porcentagem universal para substituir SSD?", a: "Não use um corte genérico. Porcentagem usada, vida restante e reserva são campos diferentes. Consulte a documentação do modelo e associe alertas a sintomas, carga de trabalho e política de backup." },
  { q: "Devo tentar clonar qualquer disco que está falhando?", a: "Não automaticamente. Uma imagem também lê o original e pode agravar uma situação instável ou sobrescrever o destino errado. Com dados únicos, ruído preocupante ou perda de detecção, interrompa as tentativas e avalie recuperação especializada." },
];
