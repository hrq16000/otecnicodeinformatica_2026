# Rodada editorial — boot, BitLocker e preservação de dados

Data da validação: 5 de setembro de 2026.

## Escopo

Esta rodada revisa materialmente o guia `erro-no-bootable-device-como-resolver`, sem criar URL, alterar slug ou modificar canonical. O trabalho foi reconciliado com o `main` já atualizado até a Onda 11G.

Também foram ajustados, sem mudança de rota, o título do guia `windows-update-travado-desfazendo-alteracoes` e os resumos editoriais de `impressora-offline-como-resolver` e `erro-no-bootable-device-como-resolver`.

## Alterações editoriais

- removidas conclusões absolutas que confundiam detecção do disco com saúde do hardware e presença do Windows Boot Manager com integridade da partição EFI;
- inserida verificação explícita do BitLocker antes de abrir o prompt de reparo;
- esclarecido que o resultado zero do `bootrec /scanos` não prova perda de arquivos;
- removido o bloco copiável de criação e formatação da partição EFI;
- estabelecido um limite seguro antes de comandos que escrevem na estrutura do disco;
- incluídas referências visíveis às documentações oficiais do BCDBoot e da recuperação do BitLocker;
- mantida a orientação comercial somente depois do diagnóstico e da preservação dos dados.

## Fontes verificadas

As duas fontes oficiais responderam com HTTP 200 durante a revisão:

- Microsoft Learn — BCDBoot command-line options: <https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/bcdboot-command-line-options-techref-di>
- Microsoft Support — Find your BitLocker recovery key: <https://support.microsoft.com/en-us/windows/find-your-bitlocker-recovery-key-6b71ad27-0b89-ea08-f143-056f5ab347d6>

## Validações

- `npm run build`: aprovado;
- `npm run verify`: 35 de 35 etapas aprovadas;
- suíte automatizada: 46 arquivos e 860 testes aprovados;
- árvore de rotas: 481 arquivos reconhecidos;
- governança editorial: 204 artigos únicos, 78 aprovados;
- links internos: 255 URLs e 527 destinos, sem links quebrados;
- páginas órfãs: nenhuma;
- mapa de autoridade nacional: válido;
- `git diff --check`: aprovado antes do fechamento.

O auditor de SEO ainda registra 48 avisos preexistentes fora do escopo desta alteração. Eles não foram mascarados nem tratados como falhas novas.

## Publicação

O `deploy:check` não pode validar o ambiente público neste executor: o contrato atual do comando procura `dist/index.html` e `dist/route-manifest.json`, enquanto o build TanStack/Nitro produz a saída do servidor em outro formato. A compilação e os gates de conteúdo passaram, mas isso não constitui evidência de atualização do domínio. O estado público deve ser confirmado separadamente depois do merge e do deploy do ambiente conectado.
