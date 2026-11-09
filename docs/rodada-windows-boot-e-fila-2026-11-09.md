# Windows: No bootable device e próximo lote — 09/11/2026

Issue #397 / PR #398. Revisão de conteúdo na URL já existente `/blog/erro-no-bootable-device-como-resolver`. Nenhuma rota nova, promoção editorial ou mudança comercial.

## O que mudou

A versão suplementar é a que vence na rota. O corpo já evitava formatar a EFI por tentativa, mas continha uma FAQ própria, além do componente global. A FAQ global ainda usava tamanho e FAT32 como confirmação de partição EFI e explicava o erro de fixboot de forma absoluta. A revisão removeu a duplicação e atualizou as cinco perguntas do componente que também gera FAQPage.

O roteiro agora separa detecção, inventário de discos, recuperação BitLocker e eventual escrita. O exemplo do DiskPart só lista discos e volumes. Tamanho, letra e FAT32 não confirmam o destino. Em UEFI, BCDBoot com /s copia para a partição indicada sem cadastrar a entrada NVRAM: copiar arquivos e recuperar o Windows Boot Manager não são a mesma ação. Sem identificação, chave necessária ou cópia de dados importantes, a prioridade é preservar dados. Nenhuma receita de formatação ou limpeza do TPM foi adicionada.

URL, canonical, capa, data exibida (2026-10-01) e aprovação anterior foram preservados. A data da revisão material é 2026-11-09; a data de aprovação não foi reescrita. As referências antigas foram mantidas; duas novas fontes oficiais foram acrescentadas e BCDBoot reconferido:

- https://learn.microsoft.com/pt-br/windows-server/administration/windows-commands/list
- https://support.microsoft.com/pt-br/windows/experience/startup-boot/startup-repair
- https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/bcdboot-command-line-options-techref-di

## Próximos recortes prioritários

Ordem por risco ao leitor e distinção de intenção, não por volume de busca suposto. Antes de escrever, verificar a versão efetiva e se a lacuna ainda existe. Os slugs abaixo já existem; não abrir páginas concorrentes.

| Ordem | Pilar | Guia existente | Recorte de utilidade |
| --- | --- | --- | --- |
| 1 — revisado | Windows | erro-no-bootable-device-como-resolver | Inventário sem escrita, identificação BitLocker e distinção EFI/NVRAM |
| 2 | Segurança | como-remover-virus-windows-iniciantes | Extensão ou redirecionamento que volta: separar sincronização, política legítima e infecção; preservar sessão/contas quando houver suspeita |
| 3 | Hardware | teclado-de-notebook-nao-funciona-o-que-verificar | Teste com teclado externo, comparação de layout e parada após líquido; sem induzir desmontagem |
| 4 | Redes | computador-nao-conecta-na-internet-por-cabo | Diagnóstico por camada e registro do que cada teste comprova; não repetir o guia de SSID ausente |
| 5 | Produtividade | arquivo-corrompido-nao-abre-o-que-fazer | Recuperar versão ou trabalhar em cópia antes de reparo; não repetir a migração de PC |

## Validação

- 23/23 testes editoriais offline e 15/15 testes Node (catálogo e contratos HTML).
- Build direto Vite cliente/SSR aprovado; não equivale a pre/postbuild completo.
- Seis guias passaram no gate SSR + Chromium, com paridade integral de FAQPage e 404 real para slug ausente.
- Intenção, links internos, revisão técnica e inventário de afirmações aprovados nos comandos pontuais.
- Nenhum acesso ao backend anteriormente bloqueado foi repetido. Sem aprovação declarada de verify global, deploy:check ou CI remoto. Sem merge ou deploy nesta rodada.
