-- Issue #32: revisão editorial do guia de bateria, sem alterar slug ou canonical.
UPDATE public.paginas_editoriais
SET
  titulo = 'Bateria do notebook dura pouco: como medir desgaste e consumo',
  meta_description = 'Aprenda a separar desgaste da bateria, consumo do Windows e falha de carregamento com um diagnóstico seguro e reproduzível.',
  palavras_chave = ARRAY[
    'bateria do notebook dura pouco',
    'relatório de bateria Windows',
    'powercfg batteryreport',
    'saúde da bateria do notebook'
  ],
  resumo = 'Autonomia curta não prova, sozinha, que a bateria precisa ser trocada. Compare capacidade, uso e comportamento do carregamento antes de decidir.',
  conteudo = $conteudo$
Quando a bateria dura pouco, há três grupos de causas principais: **capacidade reduzida pelo envelhecimento**, **consumo elevado durante o uso** e **problemas de carregamento ou medição**. O objetivo deste guia é separar esses cenários sem comprar uma bateria por tentativa.

## Antes de testar: verifique sinais de risco

Desligue o notebook e interrompa o uso se houver **inchaço**, abertura da carcaça, touchpad levantado, cheiro incomum ou aquecimento localizado anormal. Não pressione, perfure nem tente retirar uma bateria deformada sem procedimento adequado. A Microsoft orienta interromper imediatamente o uso quando a bateria expandida ultrapassa o compartimento do equipamento.

Sem esses sinais, faça o diagnóstico com o notebook em uma superfície firme e ventilada.

## 1. Gere o relatório de bateria do Windows

No Windows 11, abra o **Prompt de Comando como administrador** e execute:

`powercfg /batteryreport`

O Windows informa o caminho do arquivo HTML criado. Abra o relatório e observe principalmente:

- **Design capacity:** capacidade para a qual a bateria foi projetada;
- **Full charge capacity:** estimativa atual de carga completa;
- **Cycle count:** ciclos registrados, quando o fabricante disponibiliza esse dado;
- **Recent usage** e **Battery usage:** histórico recente de descarga e uso.

A diferença entre a capacidade de projeto e a capacidade de carga completa indica perda estimada de capacidade, mas **não existe um percentual universal que, sozinho, determine defeito ou troca**. Idade, temperatura, ciclos, firmware, forma de uso e precisão da medição também importam. Compare relatórios ao longo do tempo e o comportamento real do equipamento.

## 2. Faça uma comparação controlada

Para descobrir se a autonomia curta vem do consumo, compare dois períodos semelhantes:

1. carregue o notebook e anote horário, percentual e tarefa realizada;
2. use brilho moderado e uma tarefa leve, como edição de texto;
3. repita em outro momento com a tarefa que costuma causar a descarga rápida;
4. compare a queda percentual, o aquecimento e os aplicativos mostrados em **Configurações > Sistema > Energia e bateria > Uso da bateria**.

Vídeo, jogos, videoconferência, sincronização, atualização, brilho alto e sinal sem fio fraco podem elevar o consumo. Se a descarga cresce apenas com uma tarefa específica, investigue o aplicativo ou a carga de trabalho antes de concluir que a bateria falhou.

## 3. Diferencie bateria, carregador e sistema

- **Desliga ao retirar o carregador:** pode haver bateria profundamente degradada, desconectada ou falha no circuito; requer inspeção.
- **Percentual não sobe ou oscila:** teste tomada, conector e carregador compatível. Não improvise fonte com tensão, conector ou potência inadequados.
- **Drena durante suspensão:** verifique atualizações, dispositivos que despertam o sistema e relatórios de energia; não é prova isolada de bateria defeituosa.
- **Autonomia caiu depois de uma atualização ou aplicativo novo:** compare o uso por aplicativo e conclua atualizações pendentes antes de medir novamente.
- **Relatório e autonomia pioram de forma consistente:** a substituição pode ser indicada, depois de confirmar compatibilidade e segurança.

## 4. Reduza desgaste sem promessas irreais

Baterias de íons de lítio perdem capacidade com o tempo. A Microsoft recomenda evitar calor excessivo e descargas profundas frequentes. Quando o equipamento oferecer carregamento inteligente ou limite de carga do fabricante, use o recurso conforme o manual do modelo.

Essas práticas podem desacelerar a degradação, mas não recuperam capacidade química já perdida. Calibrar o indicador pode corrigir uma leitura imprecisa em alguns casos; não rejuvenesce as células.

## Quando parar o diagnóstico caseiro

Procure avaliação técnica se houver inchaço, aquecimento anormal, desligamentos repentinos, conector frouxo, carregador danificado, líquido, cheiro incomum ou necessidade de abrir um equipamento com bateria interna. Preserve seus arquivos antes de qualquer intervenção que possa interromper o uso do notebook.

## Perguntas frequentes

### Qual percentual de saúde significa que a bateria precisa ser trocada?

Não há um limite universal aplicável a todo notebook. Considere a autonomia necessária, a tendência da capacidade, sintomas de segurança, ciclos e o diagnóstico do carregamento.

### O comando powercfg /batteryreport repara a bateria?

Não. Ele gera um relatório de uso e capacidade para apoiar o diagnóstico; não altera a bateria nem recupera capacidade perdida.

### Deixar o notebook sempre conectado estraga a bateria?

O impacto depende do projeto térmico e do gerenciamento do fabricante. Evite calor excessivo e, quando disponível, use carregamento inteligente ou limite de carga indicado para o modelo.

### Calibrar a bateria aumenta sua capacidade?

Não. Uma calibração pode melhorar a estimativa exibida pelo sistema em alguns cenários, mas não restaura a capacidade química das células.

### Uma bateria inchada pode continuar em uso até a troca?

Não. Desligue o equipamento, interrompa o uso e evite pressionar ou perfurar a bateria. A remoção deve seguir o procedimento seguro do fabricante ou de assistência qualificada.

## Fontes oficiais

- [Microsoft Support — Caring for your battery in Windows](https://support.microsoft.com/en-us/windows/experience/power-battery/caring-for-your-battery-in-windows)
- [Microsoft Learn — Powercfg command-line options](https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/powercfg-command-line-options)

## Se ainda houver dúvida

Se os testes não separarem desgaste, consumo e falha de carregamento, uma avaliação pode medir o comportamento do conjunto e verificar a compatibilidade da peça. Leve o relatório e descreva quando a descarga acontece; isso reduz tentativa e erro antes de qualquer orçamento.
$conteudo$,
  updated_at = now()
WHERE slug = 'bateria-do-notebook-dura-pouco';
