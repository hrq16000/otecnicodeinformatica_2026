INSERT INTO public.paginas_editoriais (slug, tipo, titulo, meta_description, palavras_chave, resumo, conteudo, publicado, indexavel) VALUES
('dobradica-do-notebook-quebrada','sintoma','Dobradiça do notebook quebrada: o que fazer antes que a tela solte','A tela do notebook range, fica bamba ou a carcaça abriu perto da dobradiça? Entenda a causa, o risco de continuar usando e como é feito o reparo.',ARRAY['dobradica do notebook quebrada','tela do notebook bamba','carcaca do notebook rachada'],'Dobradiça bamba ou estalando quase sempre vem do parafuso que solta da carcaça plástica. Continuar abrindo e fechando rompe o cabo de vídeo e trinca a tela — o reparo é muito mais barato antes disso.','## O que está acontecendo

A dobradiça prende a tampa à base e é presa por buchas metálicas fixadas no plástico. Com o tempo, o plástico ao redor dessas buchas racha. O resultado é a tela que fica bamba, cai sozinha, estala ao abrir ou faz a carcaça "inchar" perto do canto.

## Como reconhecer o estágio

- **Inicial**: estalo ao abrir, tela um pouco solta. Só a dobradiça.
- **Médio**: plástico levantando perto do canto, parafusos aparecendo. Dobradiça mais reparo da base.
- **Avançado**: imagem piscando ao mover a tampa, linhas na tela ou tela trincada. O cabo de vídeo ou o display já foram atingidos.

## Verificação segura

Abra o notebook devagar, segurando os dois cantos da tela ao mesmo tempo. Observe se o plástico se afasta da base num dos lados. Não force, não use cola instantânea e não tente apertar os parafusos visíveis: eles giram em falso justamente porque a bucha soltou do plástico.

## O risco de esperar

Cada abertura com a dobradiça travada puxa o cabo flat que leva imagem à tela. É por isso que o custo cresce em etapas: dobradiça, depois carcaça, depois cabo, depois display. O item mais caro do notebook é a tela.

## Decisão

Se o notebook ainda abre e a imagem está estável, o reparo é mecânico e o equipamento continua em uso. Se já há linhas, piscadas ao mover a tampa ou trinca, a avaliação precisa incluir cabo e display.

## Como é feito

O reparo envolve abrir a tampa, recolocar ou reforçar as buchas, substituir a dobradiça quando empenada e recompor a carcaça. É serviço de bancada — não há solução remota. Peça e prazo dependem do modelo e são informados após a avaliação; a garantia cobre a mão de obra do serviço executado.',true,true),
('mouse-sem-fio-falhando','sintoma','Mouse sem fio falhando: travando, pulando ou parando sozinho','O cursor trava, pula ou some por segundos? Descubra se é pilha, receptor, interferência, superfície ou defeito, com testes que você faz em minutos.',ARRAY['mouse sem fio falhando','cursor do mouse travando','mouse bluetooth desconectando'],'Mouse sem fio que trava raramente está quebrado: na maioria dos casos é pilha fraca, receptor mal posicionado, interferência de USB 3.0 ou superfície inadequada. Quatro testes rápidos separam cada causa.','## Os quatro suspeitos

Um mouse sem fio depende de energia, rádio, sensor e sistema. A falha vem quase sempre de um desses quatro pontos — nessa ordem de probabilidade.

## Testes, do mais simples ao mais decisivo

1. **Energia.** Troque a pilha por uma nova (não recarregada pela metade). Pilha caindo causa exatamente o sintoma de travar por instantes e voltar.
2. **Rádio.** Mude o receptor USB para uma porta da frente do gabinete ou use um cabo extensor. Receptor atrás do gabinete metálico e portas USB 3.0 azuis ao lado geram interferência documentada na faixa de 2,4 GHz.
3. **Sensor.** Teste sobre papel branco fosco. Vidro, superfície espelhada e mesa muito escura confundem o sensor óptico. Confira se há fiapo na lente.
4. **Sistema.** Teste o mouse em outro computador. Se falha nos dois, é o mouse. Se funciona no outro, o problema é do computador: driver, porta ou economia de energia USB.

## Quando é Bluetooth

Em modelos Bluetooth, acrescente dois pontos: remover o dispositivo e parear de novo, e desativar a opção que permite ao Windows desligar o adaptador para economizar energia. Desconexões que acontecem sempre após alguns minutos parado apontam para essa configuração.

## Limite

Se o cursor some junto com teclado, rede ou som, o problema não é do mouse: é do sistema ou da alimentação USB da placa. Nesse caso, o diagnóstico é do computador, não do periférico.

## Decisão

Mouse é item de baixo custo: se os quatro testes apontam defeito do próprio mouse, a troca costuma custar menos que o reparo. Se o defeito acompanha outros periféricos, vale diagnóstico do computador — em muitos casos possível de forma remota, com o sistema iniciando.',true,true),
('outlook-nao-sincroniza-emails','sintoma','Outlook não sincroniza e-mails: causas reais e o que testar','O Outlook não recebe mensagens novas, trava em "Atualizando caixa de entrada" ou pede a senha o tempo todo? Veja como separar problema de conta, rede e arquivo local.',ARRAY['outlook nao sincroniza','outlook nao recebe emails','outlook pedindo senha'],'Outlook parado quase sempre é um destes três: autenticação da conta, arquivo de dados local danificado ou bloqueio de rede. O teste no webmail separa os três em dois minutos.','## O teste que decide tudo

Abra o e-mail pelo navegador, no webmail do provedor. Se as mensagens novas estão lá, o servidor está certo e o problema é do Outlook no computador. Se também não chegam, o problema é da conta ou do provedor — e nenhum ajuste no programa resolve.

## Os três cenários

**1. Autenticação.** Janela de senha repetida, mesmo digitando a correta, indica método de login desatualizado. Provedores migraram para autenticação moderna e desativaram o login simples; contas antigas param de funcionar sem aviso.

**2. Arquivo de dados local.** O Outlook guarda tudo em um arquivo .pst ou .ost. Quando ele cresce demais ou é interrompido durante gravação, a sincronização trava. O sintoma clássico é o programa abrir, mostrar mensagens antigas e ficar preso em "Atualizando".

**3. Rede.** Antivírus com verificação de e-mail, VPN corporativa e firewall podem bloquear as portas de envio e recebimento. Aqui o sintoma costuma alternar: funciona em casa, não funciona no escritório.

## Verificação segura

- Confira o espaço livre no disco. Caixa grande em disco cheio trava a sincronização.
- Veja se o modo offline está ativado na faixa de opções.
- Anote a mensagem de erro completa, incluindo o código. Ele direciona o reparo.
- Antes de qualquer reparo do arquivo de dados, faça cópia dele. Reparo mal conduzido perde mensagens.

## Limite

Não desative o antivírus de forma permanente para "resolver" a sincronização, e não apague o arquivo de dados sem cópia. E-mail configurado em POP guarda as mensagens só no computador: apagar o perfil pode significar perder tudo.

## Decisão

Se o webmail funciona e o Outlook não, o reparo é no computador — normalmente possível por suporte remoto, com o sistema iniciando e a internet ativa. Se nem o webmail recebe, o caminho é com o provedor da conta.',true,true),
('cartao-de-memoria-nao-e-lido','sintoma','Cartão de memória não é lido: como agir sem perder as fotos','O computador ou a câmera não reconhece o cartão SD ou micro SD? Veja o que testar, o que nunca fazer e quando ainda dá para recuperar os arquivos.',ARRAY['cartao de memoria nao e lido','cartao sd nao reconhece','recuperar fotos do cartao'],'Cartão que não abre pode ser leitor, contato, sistema de arquivos ou falha da memória. A regra principal: não formatar antes de tentar recuperar, porque a formatação reduz muito a chance de recuperar as fotos.','## A regra que vem antes de tudo

Quando o sistema pergunta "deseja formatar o disco?", a resposta é não. Formatar reescreve a tabela de arquivos e é o que mais atrapalha a recuperação de fotos e vídeos. Só formate depois que os arquivos estiverem salvos em outro lugar.

## Separando as causas

- **Leitor.** Teste o cartão em outro leitor e em outro computador. Leitor de notebook com pino torto é causa comum.
- **Contato.** Observe sujeira ou oxidação nos contatos dourados. Limpeza a seco, sem líquido, resolve parte dos casos.
- **Trava física.** No cartão SD grande, a chave lateral em "lock" impede a gravação e confunde alguns programas.
- **Sistema de arquivos.** O cartão aparece com capacidade errada, pede formatação ou abre vazio. A memória está viva; o índice, não.
- **Falha da memória.** O cartão não aparece em lugar nenhum, esquenta ou some no meio do uso.

## Verificação segura

Conecte o cartão e olhe o gerenciador de discos do sistema: se o dispositivo aparece ali, mesmo sem letra de unidade, há chance real de recuperar. Não instale vários programas de recuperação em sequência — cada gravação no cartão diminui a chance. E não continue fotografando com o cartão suspeito.

## Limite honesto

Cartão de memória é mídia de consumo, com número limitado de gravações. Não existe garantia de recuperação: o que existe é tentativa, com resultado informado depois do exame. Quando a controladora falha, nenhum programa comum resolve.

## Decisão

Se o cartão aparece no sistema, a tentativa de recuperação é feita com cópia de imagem do cartão, sem escrever nele. Se não aparece em nenhum leitor, o caminho é avaliação em bancada. Depois de recuperado o conteúdo, o cartão deve ser aposentado — não vale confiar nele de novo.',true,true),
('bateria-do-notebook-dura-pouco','sintoma','Bateria do notebook dura pouco: desgaste, configuração ou defeito?','O notebook desliga com 30%, dura poucos minutos ou só funciona na tomada? Entenda a diferença entre desgaste natural, ajuste de energia e defeito real.',ARRAY['bateria do notebook dura pouco','notebook so funciona na tomada','bateria viciada notebook'],'Bateria com autonomia curta pode ser desgaste normal de ciclos, configuração de energia ou defeito de célula. O relatório de bateria do Windows mostra a capacidade real e separa os casos.','## Desgaste é esperado, queda súbita não

Baterias de íon-lítio perdem capacidade com o número de ciclos de carga. Uma perda gradual ao longo de anos é normal. O que não é normal: cair de horas para minutos em poucas semanas, desligar de repente com carga indicada alta ou inchar.

## O dado objetivo

O Windows gera um relatório de bateria que compara a capacidade projetada de fábrica com a capacidade atual. Ele mostra, em número, quanto restou. Com esse dado a conversa deixa de ser opinião: 60% da capacidade original com quatro anos de uso é desgaste; 40% em um ano é defeito.

## Antes de concluir que é a bateria

- Verifique o plano de energia e o brilho da tela. Tela em brilho máximo consome mais que qualquer outro componente.
- Veja quais programas iniciam junto com o sistema e quais rodam em segundo plano.
- Confira se o carregador é o original ou equivalente em potência. Fonte fraca carrega devagar e desliga sob carga.
- Compare a autonomia com e sem programas pesados abertos.

## Sinal de parar imediatamente

Bateria estufada — teclado levantando, base empenada, touchpad travado pelo inchaço — deve ser retirada de uso. Não perfure, não pressione e não continue carregando. É risco físico, não só de desempenho.

## Decisão

Desgaste natural resolve-se com substituição da bateria, respeitando o modelo. Autonomia baixa por configuração resolve-se por ajuste, muitas vezes remoto. Desligamento súbito com carga alta pode ser a bateria ou o circuito de carga da placa, e isso só a avaliação distingue. Peça, prazo e escopo são informados após o diagnóstico; a garantia cobre a mão de obra do serviço executado e a peça segue a garantia do fornecedor.',true,true);