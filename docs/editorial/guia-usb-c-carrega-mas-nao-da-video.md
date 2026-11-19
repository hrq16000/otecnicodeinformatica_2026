# USB-C carrega, mas não dá vídeo: o que verificar antes de trocar o cabo

> Rascunho editorial — Hardware. Revisão documental em 19/11/2026; sem teste físico nesta rodada, aprovação de publicação ou nova URL. Refs #49 e #429. Retoma o texto preparado em 15/11, com fontes reconferidas e critérios explícitos de integração.

Se o notebook carrega pelo cabo USB-C, você confirmou a passagem de energia, não a saída de vídeo. Antes de comprar um cabo ou adaptador, confira o que a porta do computador, o cabo e a entrada do monitor suportam. Se houver um dock no meio, ele e o cabo que o liga ao computador também entram no teste.

## 1. Confira a porta certa nos dois aparelhos

No manual do notebook, procure a descrição da porta exata. Termos como DisplayPort Alt Mode ou saída de vídeo por USB-C identificam um caminho de vídeo para a configuração descrita pelo fabricante. Se o manual mencionar Thunderbolt ou USB4, confira as conexões de tela e os acessórios que o modelo aceita. Não presuma que todas as portas USB-C do equipamento sejam iguais.

No monitor, confirme que a porta escolhida aceita entrada de vídeo, e não apenas energia, dados ou manutenção. Se houver seletor de entradas, escolha a ligação real: USB-C, HDMI ou DisplayPort. A VESA explica que uma porta sem DisplayPort sobre USB-C não fornece imagem para uma tela que depende desse recurso. Trocar apenas o cabo não acrescenta essa capacidade à porta.

## 2. Teste a ligação mais simples

1. Salve o trabalho aberto. Ligue a fonte do monitor, quando o modelo exigir. Retire hubs, extensões e docks do caminho, e use somente uma tela.
2. Se a tela aceita vídeo por USB-C e o computador é compatível, teste a ligação direta com cabo declarado para vídeo. Para USB-C para HDMI, confirme o sentido indicado: computador USB-C para monitor HDMI.
3. Selecione a entrada correta no monitor. No Windows, use **Win + P** e escolha **Duplicar** ou **Estender**. Procure também **Detectar** em **Configurações → Sistema → Tela → Várias telas**. Essas opções não criam suporte a vídeo em uma porta incompatível.
4. Compare com uma saída HDMI que funciona ou com cabo e monitor já testados em outro computador compatível. Troque um componente por vez. HDMI funcionando não confirma a capacidade de vídeo da USB-C.

## 3. Use o resultado para decidir

| Resultado | Próxima verificação | Limite da conclusão |
| --- | --- | --- |
| Carrega, mas o manual só declara dados ou energia naquela porta | Procure outra saída de vídeo documentada | Falta de informação no anúncio não comprova defeito; consulte o manual exato |
| Funciona direto, mas não pelo dock | Confira alimentação, conexão ao computador, compatibilidade e cabo entre os dois | Se também mudou a entrada do monitor, o teste ainda não isolou o dock |
| Um cabo dá vídeo e outro só carrega nas mesmas portas | Compare especificações e repita o teste controlado | O resultado não distingue sozinho limitação de defeito no cabo |
| A tela aparece, mas apaga ao aumentar resolução ou frequência | Retorne à configuração conhecida e consulte os limites do conjunto | Não atribua a falha automaticamente ao monitor |
| A ligação direta documentada como compatível continua sem imagem | Registre modelos, portas, cabo e resultado de cada tentativa | Driver, firmware e possível falha física ainda precisam ser separados |

Exemplo: o monitor funciona direto por USB-C, mas falha com o dock. Mantenha a mesma tela e confira primeiro o cabo entre notebook e dock e a saída utilizada no dock. Se o teste indireto também usa HDMI, esse cabo e essa entrada são variáveis novas: não compre outro dock antes de verificá-las.

## 4. Quando parar e o que registrar

Não force conector frouxo ou torto. Em caso de aquecimento anormal, cheiro de queimado ou dano visível, interrompa o uso e desconecte o conjunto somente se for seguro. Não abra o monitor nem faça limpeza interna energizada.

Antes de procurar suporte, anote os modelos completos do notebook, monitor e dock; a porta utilizada; a especificação do cabo; a mensagem exibida; e quais combinações funcionaram. Não publique números de série ou dados pessoais. Em equipamento corporativo, consulte a TI antes de instalar drivers ou firmware. Use os canais oficiais do fabricante, não atualizadores genéricos.

Se outros dispositivos USB também não aparecem, siga o roteiro de [dispositivo USB não reconhecido](/blog/dispositivo-usb-nao-reconhecido-o-que-fazer). Se o computador nem chega a exibir imagem nas saídas documentadas, o [guia geral de monitor sem sinal](/blog/monitor-sem-sinal-o-que-verificar) trata de uma intenção mais ampla.

## Perguntas frequentes

### Meu notebook carrega pela USB-C. A porta também envia vídeo?

Não necessariamente. Energia e vídeo são recursos diferentes. Confira no manual do modelo se aquela porta oferece saída de vídeo, como DisplayPort Alt Mode.

### Como saber se o cabo USB-C serve para o monitor?

Confira se o fabricante declara suporte a vídeo para o tipo de conexão e a resolução desejada. A potência de carregamento anunciada não comprova compatibilidade com vídeo.

### Comprar um adaptador USB-C para HDMI resolve?

Não se ele depender de DisplayPort Alt Mode e a porta não oferecer esse recurso. Confira os requisitos do modelo antes da compra; o formato do conector, sozinho, não demonstra compatibilidade.

### Funcionou direto, mas não pelo dock. O que testar?

Confirme a alimentação, a porta do dock que liga ao computador e o cabo entre os dois. Teste com uma tela só e mude um componente por vez, sem concluir que o dock está defeituoso apenas por essa diferença.

## Fontes primárias

Consultadas em 19/11/2026. São referências técnicas, não relatos de testes deste portal.

- [VESA — FAQ DisplayPort](https://www.displayport.org/faq/): capacidade de vídeo, sentido dos conversores e requisitos do conector.
- [VESA — DisplayPort em USB-C](https://vesa.org/dp-usb-type-c/): ausência de suporte na porta e ligação direta sem hub intermediário.
- [Microsoft — corrigir problemas de USB-C](https://support.microsoft.com/pt-br/windows/hardware/usb/fix-usb-c-problems-in-windows): compatibilidade entre computador, cabo, dispositivo e porta.
- [Microsoft — conexões de monitor externo](https://support.microsoft.com/pt-br/windows/hardware/display-graphics/troubleshoot-external-monitor-connections-in-windows): projeção, cabos e isolamento das conexões.
- [Dell — guia DisplayPort por USB-C](https://www.dell.com/support/kbdoc/pt-br/000141328/guia-para-displayport-via-usb-c): confirmação pelas especificações do equipamento e adaptação para entradas de monitor.

---

## Ficha de integração — não publicar esta seção

- **Intenção única:** vídeo por USB-C quando energia funciona. O guia de USB existente aborda enumeração e armazenamento; o de monitor cobre ausência geral de sinal. Há proximidade temática: revisar a sobreposição antes de decidir entre URL própria e seção no artigo existente. Nenhum slug foi reservado.
- **Descrição proposta:** A USB-C carrega o notebook, mas o monitor não dá imagem? Confira porta, cabo, entrada e dock com testes em ordem antes de trocar peças.
- **Revisão realizada:** documental, com fontes primárias e leitura das duas páginas relacionadas no código da branch. Sem afirmar validação em bancada ou aprovação por responsável técnico.
- **Dados estruturados:** ao integrar uma página aprovada, usar o gerador existente de Article, BreadcrumbList e FAQPage; as quatro perguntas acima são a única fonte do FAQ. Não inserir marcação duplicada nem datas, autor ou imagem fictícios. Validar paridade no HTML SSR. Este documento não ativa schema no portal.
- **Indexação:** sem alteração de registro editorial, sitemap, canonical ou rotas. Se houver preview de página ainda não aprovada, manter noindex e fora do sitemap curado.
- **Pendências bloqueantes:** decisão sobre intenção/URL; revisão técnica responsável; teste físico documentado em conjunto compatível; capa real licenciada; interlinks bidirecionais; validação SSR, acessibilidade e paridade de FAQ; verify, build e deploy:check aprovados antes de merge/publicação.
- **Próximo item editorial:** recuperação de arquivo no OneDrive (apagado versus sobrescrito), verificando a relação com o guia de arquivo corrompido. Windows e Redes devem começar por complementos nas URLs existentes, sem criar artigos concorrentes. Segurança: não repetir a seção de recuperação da Conta Google já integrada.

## Validação desta micro-rodada

- Escopo: somente este arquivo Markdown em docs; sem código de execução, imagem, preço ou CTA comercial.
- Verificações locais: espaços no diff, quatro FAQs não vazias, fontes HTTPS e caminhos internos presentes no inventário do código.
- Não executados nesta rodada documental: verify, build, deploy:check e testes de navegador. Nenhum resultado anterior foi reaproveitado como homologação deste commit.
- O PR #429 continua em rascunho; este material não resolve os conflitos nem os gates técnicos pendentes. Sem merge e sem deploy nesta rodada.
