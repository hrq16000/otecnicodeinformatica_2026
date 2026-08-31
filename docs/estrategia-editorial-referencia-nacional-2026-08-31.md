# Estratégia editorial: referência técnica nacional

## Leitura da referência

O App Dicas oferece uma navegação simples: categorias, busca e uma sequência de posts recentes. É um padrão útil para descoberta, mas não deve ser copiado como estratégia editorial do portal. Os temas são amplos e muitos textos têm vocação de lista; isso não responde com segurança à pergunta que chega à bancada: **o que este sintoma permite testar, o que não permite concluir e quando é preciso parar?**

O diferencial de O Técnico de Informática deve ser decisão verificável, não quantidade de URLs.

## O que já pode ser adotado

1. **Busca como porta de entrada para o conhecimento.** A busca passa a sugerir somente guias aprovados editorialmente, além das páginas de serviço. Um usuário que procura "tela azul", "atualização" ou "SSD" chega primeiro a uma explicação revisada.
2. **Série “Veredito técnico”.** Cada página deve abrir com um rótulo claro: `funciona em casos específicos`, `não é manutenção de rotina`, `não resolve esta causa` ou `não faça sem cópia/diagnóstico`.
3. **Formato fixo de artigo.** Resposta curta; sintoma e evidência; o que é seguro testar; o que o teste não prova; erros comuns/boatos; critério de parada; fontes; data da revisão. Esse formato é mais útil para pessoas e mais difícil de confundir com conteúdo genérico.
4. **Fila baseada em falha real, não em palavra-chave.** Priorizar o mapa existente: BIOS/UEFI, inicialização do Windows, RAM/MemTest, USB e segurança. Cada candidato precisa passar pelo gate anti-canibalização antes de ganhar URL.

## Primeira pauta “veredito técnico”

| Tema | Veredito editorial | Tratamento correto |
| --- | --- | --- |
| “Limpador de registro acelera o PC” | Não é procedimento de manutenção; não há causa diagnosticada nem benefício mensurável universal. | Medir espaço, inicialização, memória, disco e processos antes de qualquer mudança. |
| “Desfragmentar SSD estraga ou acelera tudo” | A frase é imprecisa. O Windows identifica o tipo de mídia e executa rotinas de otimização próprias; não vender desfragmentação manual como cura de lentidão. | Usar **Otimizar Unidades** do Windows e investigar o gargalo real. |
| “Apagar qualquer cache do Windows resolve atualização” | Só pode ajudar quando o problema está no download/fila; não corrige falha de instalação, driver ou componente. | Triar o estágio e preferir ação reversível — já coberto pelo guia SoftwareDistribution. |
| “Desativar o Windows Update deixa o PC mais rápido” | Não é otimização sustentável: remove correções e só adia a investigação. | Identificar o processo, horário e causa da carga; atualizar de modo controlado. |
| “Antivírus pago é obrigatório” | Não como regra. O Defender é uma camada ativa do Windows; o risco e a necessidade adicional dependem de cenário e gestão. | Atualizações, proteção ativa, navegador e hábitos seguros vêm antes de comprar software. |
| “Pasta sincronizada é backup” | Boato perigoso: exclusão e corrupção podem sincronizar. | Versões recuperáveis, cópia independente e teste de restauração. |

## Fontes de revisão obrigatórias para a primeira pauta

- Microsoft Support — [Storage Sense e espaço em disco](https://support.microsoft.com/en-us/windows/experience/storage-filemanagement/manage-drive-space-with-storage-sense), consultada em 2026-08-31.
- Microsoft Learn — [comportamento do Optimize Drives/defrag em SSD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/defrag), consultada em 2026-08-31.
- Microsoft Learn — [proteções do Windows 11 e Microsoft Defender](https://learn.microsoft.com/en-us/windows/security/book/operating-system-security-virus-and-threat-protection), consultada em 2026-08-31.
- CISA — [prevenção e resposta a ransomware](https://www.cisa.gov/stopransomware/ransomware-guide), consultada em 2026-08-31.

## Regra contra material obsoleto

- Afirmação ligada a versão, preço, suporte, firmware, aplicativo ou política deve ter fonte primária, URL e data de consulta.
- Artigo sem fonte primária só pode tratar conhecimento estável e precisa explicitar esse limite.
- Mudança de versão relevante, alerta de segurança ou fonte removida rebaixa o artigo para revisão: não fica indexável até nova verificação.
- Não publicar números de ganho, prazos universais, temperatura “ideal”, marca recomendada ou passo destrutivo sem condição e evidência.

## Próximo ciclo

Antes de redigir nova URL, rodar o gate de canibalização da pauta e registrar fonte, revisão, capa e autoria no mesmo fluxo fail-closed já aplicado ao acervo. A prioridade é aprofundar os guias aprovados e seus vereditos, não expandir a quantidade de páginas.
