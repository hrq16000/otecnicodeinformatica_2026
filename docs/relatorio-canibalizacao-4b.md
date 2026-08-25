# Auditoria de canibalização e sobreposição de intenção — Rodada 4B

Gerado em 2026-08-25T01:15:04.178Z · fonte: HTML SSR em `dist/` (não o código-fonte).
Tetos: texto Jaccard ≤ 0.34 · title/description Jaccard ≤ 0.6.

## Páginas auditadas

| URL | Papel | H1 | Palavras | Links internos |
| --- | --- | --- | ---: | ---: |
| `/problemas/notebook-nao-liga` | owner-4b | Notebook não liga: o que pode estar acontecendo e como é feito o diagnóstico | 2318 | 35 |
| `/problemas/computador-nao-da-imagem` | owner-4b | Computador liga mas não aparece imagem no monitor | 1915 | 40 |
| `/problemas/computador-lento` | owner-4b | Computador lento: sintomas, causas possíveis e o que realmente resolve | 2514 | 39 |
| `/solucoes/backup` | owner-4b | Backup: cópia conferida, não pasta copiada às pressas | 1423 | 36 |
| `/solucoes/formatacao` | owner-4b | Formatação e reinstalação de sistema sem perder o que importa | 1109 | 36 |
| `/servicos/formatacao` | frozen-4a | Formatação de computador e notebook em Curitiba com backup dos seus arquivos | 2592 | 72 |

## Pares

| A | B | Texto | Title | Desc | A→B | B→A | Veredito |
| --- | --- | ---: | ---: | ---: | :-: | :-: | --- |
| `/problemas/notebook-nao-liga` | `/problemas/computador-nao-da-imagem` | 0.082 | 0.154 | 0.086 | — | — | OK |
| `/problemas/notebook-nao-liga` | `/problemas/computador-lento` | 0.093 | 0 | 0.103 | ✅ | ✅ | OK |
| `/problemas/notebook-nao-liga` | `/solucoes/backup` | 0.071 | 0 | 0 | — | — | OK |
| `/problemas/notebook-nao-liga` | `/solucoes/formatacao` | 0.078 | 0 | 0.028 | — | — | OK |
| `/problemas/notebook-nao-liga` | `/servicos/formatacao` | 0.059 | 0.25 | 0.103 | ✅ | — | OK |
| `/problemas/computador-nao-da-imagem` | `/problemas/computador-lento` | 0.078 | 0.273 | 0.059 | — | — | OK |
| `/problemas/computador-nao-da-imagem` | `/solucoes/backup` | 0.082 | 0.143 | 0.027 | — | — | OK |
| `/problemas/computador-nao-da-imagem` | `/solucoes/formatacao` | 0.091 | 0.143 | 0.025 | — | — | OK |
| `/problemas/computador-nao-da-imagem` | `/servicos/formatacao` | 0.058 | 0 | 0 | ✅ | — | OK |
| `/problemas/computador-lento` | `/solucoes/backup` | 0.067 | 0.2 | 0.032 | — | — | OK |
| `/problemas/computador-lento` | `/solucoes/formatacao` | 0.073 | 0.2 | 0.094 | — | — | OK |
| `/problemas/computador-lento` | `/servicos/formatacao` | 0.056 | 0 | 0.071 | ✅ | ✅ | OK |
| `/solucoes/backup` | `/solucoes/formatacao` | 0.128 | 0.273 | 0.088 | ✅ | ✅ | OK |
| `/solucoes/backup` | `/servicos/formatacao` | 0.065 | 0 | 0.103 | ✅ | ✅ | OK |
| `/solucoes/formatacao` | `/servicos/formatacao` | 0.072 | 0.222 | 0.129 | ✅ | — | OK |

## Recomendações

- **Interlinking** — faltando: `/servicos/formatacao → /solucoes/formatacao`. intenções complementares: o leitor que chega numa delas costuma precisar da outra como próximo passo.
- **Interlinking** — faltando: `/problemas/computador-lento → /solucoes/formatacao`, `/solucoes/formatacao → /problemas/computador-lento`. intenções complementares: o leitor que chega numa delas costuma precisar da outra como próximo passo.
- **Interlinking** — faltando: `/problemas/notebook-nao-liga → /problemas/computador-nao-da-imagem`, `/problemas/computador-nao-da-imagem → /problemas/notebook-nao-liga`. intenções complementares: o leitor que chega numa delas costuma precisar da outra como próximo passo.
- **Interlinking** — faltando: `/problemas/computador-lento → /solucoes/backup`, `/solucoes/backup → /problemas/computador-lento`. intenções complementares: o leitor que chega numa delas costuma precisar da outra como próximo passo.

**Veredito: OK** — 0 par(es) acima do teto de texto.

