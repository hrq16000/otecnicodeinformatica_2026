# Pontes editoriais e classificação de fontes — 29/10/2026

Continuação da issue #397 e do PR #398, sem merge ou deploy autorizado nesta etapa.

## Entrega

- 47/47 pontes declaradas restauradas no corpo vencedor de 20 artigos.
- Parágrafos contextuais próprios no fim dos artigos, com limites de intervenção e conteúdo educativo antes de serviço; nenhuma lista genérica de links foi inserida.
- Nenhuma FAQ ou fonte de FAQPage foi alterada.
- Nenhuma URL, canonical, política de indexação, preço ou threshold foi alterado.
- Novo teste verifica todas as pontes declaradas contra o catálogo real com a mesma precedência da página.
- Quatro hosts oficiais classificados na allowlist canônica: GNU, Seagate, AMD e MSI Brasil. Isso resolve seis das sete URLs anteriormente bloqueadas.

## Evidências de fontes

- GNU: manual oficial https://www.gnu.org/software/ddrescue/manual/ddrescue_manual.html, confirmado via busca no domínio oficial; abertura direta expirou.
- AMD: https://www.amd.com/pt/resources/support-articles/faqs/CPU-200.html, página oficial acessível.
- MSI Brasil: https://br.msi.com/support/technical_details/MB_Boot_No_Display, página oficial acessível.
- Seagate: artigos oficiais sobre SSD não detectado e ruído confirmados em https://www.seagate.com/support/kb/the-bios-does-not-detect-or-recognize-the-solid-state-drive-005707en/ e https://www.seagate.com/support/kb/what-should-i-do-for-a-noisy-disk-drive-193731en/. A central oficial de suporte também referencia o artigo ATA/SATA. As URLs regionais cadastradas apresentaram loop de redirect nesta consulta: a classificação do host não deve ser confundida com aprovação da disponibilidade dessas URLs.

Permanece bloqueada a URL `https://download-2.msi.com/archive/mnu_exe/mb/H610TI-S03_H610TI-S01.pdf`: a ferramenta de consulta recusou a leitura por tamanho (10.596.391 bytes). O host não foi liberado sem inspeção do documento. Não se trata de evidência de fonte falsa, mas de verificação incompleta.

## Validação

- Leitor editorial: 6/6 testes aprovados, incluindo integridade de todas as pontes do mapa real.
- Testes unitários: 49 arquivos, 885 testes aprovados.
- `check:content-intent`: aprovado, 36 URLs e 36 pares tema × intenção únicos.
- `check:internal-links`: aprovado, nenhum link quebrado.
- `check:trust-claims`: aprovado.
- `check:editorial-cluster`: aprovado.
- Build direto Vite cliente + SSR: aprovado.
- `git diff --check`: aprovado.
- `check:editorial-technical-review`: permanece bloqueado apenas pela URL do PDF MSI.

Não foi declarado `verify` ou `deploy:check` global aprovado; esses comandos completos, snapshots SSR e acessibilidade não foram reexecutados nesta rodada.

## Próximo

Inspecionar o PDF MSI com um leitor local, resolver os redirects regionais da Seagate, recuperar ou reconstruir o guia Windows 11 e validar o conjunto sobre a base técnica atual. A base remota avançou de `6bbcd0c8` para `786a63e8` com alterações de performance/dependências, sem mudanças nos arquivos editoriais tocados aqui.
