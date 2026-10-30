# Continuidade editorial e CI — 30/10/2026

PR #398, issue #397. Esta rodada preserva a separação entre conteúdo pronto, validação e publicação pública.

## Fechamento confirmado

O commit remoto `d9d0e7506b991febacfad7a1582a81beb4f0dbc6` contém a inspeção do PDF MSI e as referências globais Seagate. Não há mais pendência de classificação nas sete URLs daquela auditoria. A rodada anterior permanece documentada em `docs/rodada-fontes-msi-seagate-2026-10-29.md`.

Em 30/10, `check:editorial-technical-review`, `check:content-intent` e os sete testes do leitor editorial foram reexecutados e aprovados a partir desse commit remoto.

## Bloqueio concreto do CI

Execução 40920169781, job build 123612307189: o pipeline parou antes do build porque `report:afirmacoes` atualizou `src/data/trustClaimsAudit.json`, e a checagem de reprodutibilidade detectou diferença. As 47 pontes deslocaram a linha de uma afirmação de 7996 para 8012. O relatório versionado ainda tinha a localização anterior.

Correção: regeneração pelo comando oficial e aprovação de `check:afirmacoes`, mantendo 272 ocorrências e suas classificações. A data de geração passou para 2026-10-30. Nenhuma classificação foi alterada para produzir um resultado verde.

No remoto anterior: unit, budgets e gates-locais aprovados; build e lint reprovados; etapas E2E/Lighthouse não executadas. Não foi declarado sucesso global. O problema de build observado era a divergência do inventário, não uma falha comprovada de compilação do guia.

## Próximos guias por pilar

Critério desta fila: risco para o leitor e lacuna observável no acervo, não volume de páginas ou promessa de demanda. Sem dados novos do Search Console, não atribuir potencial de tráfego a esses temas.

| Ordem | Pilar e rota existente | Escopo original da próxima revisão |
| --- | --- | --- |
| 1 | Windows — `/blog/windows-11-vale-a-pena-atualizar` | Decisão de migração por suporte, elegibilidade, dependências, backup e retorno. Reconstruir na fonte canônica; preservar data original. |
| 2 | Hardware — `/blog/disco-com-setores-defeituosos-smart-o-que-fazer` | Separar alerta SMART, falha observada e limites de teste; preservar dados antes de escrita ou teste prolongado. |
| 3 | Produtividade — `/blog/como-migrar-arquivos-para-um-computador-novo` | Inventário de dados e licenças, cópia, conferência e preservação do computador antigo até validação. |
| 4 | Redes — `/blog/rede-wifi-nao-aparece-na-lista-o-que-verificar` | Separar ausência do SSID, adaptador, banda/compatibilidade e configuração, com testes reversíveis. |
| 5 | Segurança — `/blog/como-configurar-2fa-em-tudo` | Conferir se perda do aparelho e recuperação de acesso já estão cobertas pelas revisões existentes; evitar reescrever ou duplicar o guia MFA concluído. Só expandir lacunas demonstradas. |

O texto atual de Windows 11 foi inspecionado na fonte base: ainda contém menção a apps Android como vantagem, fim do suporte do Windows 10 em tempo futuro e promessa de atualização sem risco de perder dados. Esses pontos justificam prioridade material. O commit local antigo `4a29ded7` não foi encontrado e não deve ser tratado como conteúdo recuperado.

## Contrato para cada guia

- Uma URL existente, uma intenção; não criar rota concorrente ou página local.
- Fontes primárias verificadas na data da revisão; distinguir fato documentado de inferência.
- Verificações seguras, critérios de parada, decisão e ferramenta antes de serviço opcional no fim.
- FAQ visível e FAQPage com o mesmo conteúdo; conferir Article, BreadcrumbList e canonical no HTML SSR.
- Não promover indexabilidade, incluir em sitemap ou declarar revisão humana sem cumprir os critérios do projeto.
- Aprovar os gates globais sobre a base atual antes de merge/deploy; não confundir envio ao GitHub com publicação no domínio.

Esta fila é priorização editorial, não cinco guias já entregues. O guia Windows 11 ainda precisa ser reconstruído e validado; não foi promovido a index nesta rodada.
